import { sql } from "kysely";
import { ulid } from "ulidx";
import { Cron } from "croner";
// node_modules/emdash/dist/cron-D7obTIfk.mjs
/**
* Plugin Cron System
*
* Provides scheduled task execution for plugins:
* - CronExecutor: claims overdue tasks, invokes per-plugin cron hook, updates next run.
* - CronAccessImpl: per-plugin API for schedule/cancel/list.
*
*/
/** Matches the Workers runtime, which always runs in UTC, so Node hosts fire at the same instant. */
var CRON_TIMEZONE = "UTC";
var ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$/;
var ISO_TIMEZONE_PATTERN = /(?:Z|[+-]\d{2}:?\d{2})$/;
/**
* Executes overdue cron tasks.
*
* Called by the platform driver: the NodeCronScheduler timer on Node, or the
* Worker's `scheduled()` handler (via runScheduledTasks) on Cloudflare.
* Stateless — all state lives in the database.
*/
var CronExecutor = class {
	/**
	* Resolves the database connection to use for this tick. A resolver (not a
	* captured instance) so connection-backed adapters work across events: on
	* Cloudflare the `scheduled()` handler installs an event-scoped connection
	* in ALS, and this resolves to it instead of the per-isolate singleton
	* whose socket belongs to an earlier request. Accepts a plain `Kysely` too
	* (wrapped in a constant resolver) for callers/tests that don't need ALS.
	*/
	resolveDb;
	constructor(db, invokeCronHook, now = () => /* @__PURE__ */ new Date()) {
		this.invokeCronHook = invokeCronHook;
		this.now = now;
		this.resolveDb = typeof db === "function" ? db : () => db;
	}
	get db() {
		return this.resolveDb();
	}
	/**
	* Process all overdue tasks.
	*
	* 1. Atomically claim tasks whose next_run_at <= now, status = idle, enabled = 1.
	* 2. For each claimed task, invoke the plugin's cron hook.
	* 3. On success: compute next_run_at and reset to idle, or delete one-shots.
	* 4. On failure: reset to idle (retry on next tick).
	*/
	async tick() {
		const currentTime = this.now();
		const now = currentTime.toISOString();
		let processed = 0;
		const claimed = await sql`
			UPDATE _emdash_cron_tasks
			SET status = 'running', locked_at = ${now}
			WHERE id IN (
				SELECT id FROM _emdash_cron_tasks
				WHERE next_run_at <= ${now}
				  AND status = 'idle'
				  AND enabled = 1
				ORDER BY next_run_at ASC
				LIMIT 10
			)
			RETURNING id, plugin_id, task_name, schedule, is_oneshot, data, next_run_at
		`.execute(this.db);
		for (const task of claimed.rows) {
			let parsedData;
			if (task.data) try {
				parsedData = JSON.parse(task.data);
			} catch {
				console.error(`[cron] Invalid JSON data for ${task.plugin_id}:${task.task_name}, skipping`);
				await sql`
						UPDATE _emdash_cron_tasks
						SET status = 'idle', locked_at = NULL, enabled = 0
						WHERE id = ${task.id}
					`.execute(this.db);
				continue;
			}
			const event = {
				name: task.task_name,
				data: parsedData,
				scheduledAt: task.next_run_at
			};
			let hookFailed = false;
			try {
				await this.invokeCronHook(task.plugin_id, event);
			} catch (error) {
				hookFailed = true;
				console.error(`[cron] Hook failed for ${task.plugin_id}:${task.task_name}:`, error);
			}
			if (task.is_oneshot) if (hookFailed) {
				const meta = parsedData?.__emdash != null && typeof parsedData.__emdash === "object" ? parsedData.__emdash : void 0;
				const raw = meta?.retryCount;
				const retryCount = typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
				const MAX_ONESHOT_RETRIES = 5;
				if (retryCount >= MAX_ONESHOT_RETRIES) {
					console.error(`[cron] One-shot task ${task.plugin_id}:${task.task_name} exceeded ${MAX_ONESHOT_RETRIES} retries, removing`);
					await sql`
						DELETE FROM _emdash_cron_tasks WHERE id = ${task.id}
					`.execute(this.db);
				} else {
					const backoffMs = 6e4 * Math.pow(2, retryCount);
					await sql`
						UPDATE _emdash_cron_tasks
						SET status = 'idle', locked_at = NULL, next_run_at = ${new Date(currentTime.getTime() + backoffMs).toISOString()}, data = ${JSON.stringify({
						...parsedData,
						__emdash: {
							...meta,
							retryCount: retryCount + 1
						}
					})}
						WHERE id = ${task.id}
					`.execute(this.db);
				}
			} else await sql`
						DELETE FROM _emdash_cron_tasks WHERE id = ${task.id}
					`.execute(this.db);
			else {
				let nextRun;
				try {
					nextRun = nextCronTime(task.schedule, currentTime);
				} catch (error) {
					console.error(`[cron] Disabling unsatisfiable schedule for ${task.plugin_id}:${task.task_name}:`, error);
					await sql`
						UPDATE _emdash_cron_tasks
						SET status = 'idle', locked_at = NULL, last_run_at = ${now}, enabled = 0
						WHERE id = ${task.id}
					`.execute(this.db);
					processed++;
					continue;
				}
				await sql`
					UPDATE _emdash_cron_tasks
					SET status = 'idle',
						locked_at = NULL,
						last_run_at = ${now},
						next_run_at = ${nextRun}
					WHERE id = ${task.id}
				`.execute(this.db);
			}
			processed++;
		}
		return processed;
	}
	/**
	* Recover tasks stuck in 'running' for more than STALE_LOCK_MINUTES.
	* These likely crashed mid-execution.
	*/
	async recoverStaleLocks() {
		const result = await sql`
			UPDATE _emdash_cron_tasks
			SET status = 'idle', locked_at = NULL
			WHERE status = 'running'
			  AND locked_at < ${(/* @__PURE__ */ new Date(this.now().getTime() - 6e5)).toISOString()}
		`.execute(this.db);
		return Number(result.numAffectedRows ?? 0);
	}
	/**
	* Get the next due time across all enabled tasks.
	* Returns null if no tasks are scheduled.
	*/
	async getNextDueTime() {
		return (await sql`
			SELECT MIN(next_run_at) as next
			FROM _emdash_cron_tasks
			WHERE status = 'idle' AND enabled = 1
		`.execute(this.db)).rows[0]?.next ?? null;
	}
};
/**
* Per-plugin cron API implementation.
* Scoped to a single plugin ID — plugins cannot see or modify other plugins' tasks.
*/
var CronAccessImpl = class {
	constructor(db, pluginId, reschedule, now = () => /* @__PURE__ */ new Date()) {
		this.db = db;
		this.pluginId = pluginId;
		this.reschedule = reschedule;
		this.now = now;
	}
	async schedule(name, opts) {
		validateTaskName(name);
		validateSchedule(opts.schedule);
		const oneshot = isOneShot(opts.schedule);
		const nextRun = oneshot ? oneShotTime(opts.schedule) : nextCronTime(opts.schedule, this.now());
		const dataJson = opts.data ? JSON.stringify(opts.data) : null;
		await sql`
			INSERT INTO _emdash_cron_tasks (id, plugin_id, task_name, schedule, is_oneshot, data, next_run_at, status, enabled)
			VALUES (${ulid()}, ${this.pluginId}, ${name}, ${opts.schedule}, ${oneshot ? 1 : 0}, ${dataJson}, ${nextRun}, 'idle', 1)
			ON CONFLICT (plugin_id, task_name) DO UPDATE SET
				schedule = ${opts.schedule},
				is_oneshot = ${oneshot ? 1 : 0},
				data = ${dataJson},
				next_run_at = ${nextRun},
				status = CASE WHEN _emdash_cron_tasks.status = 'running' THEN 'running' ELSE 'idle' END,
				locked_at = CASE WHEN _emdash_cron_tasks.status = 'running' THEN _emdash_cron_tasks.locked_at ELSE NULL END,
				enabled = 1
		`.execute(this.db);
		this.reschedule();
	}
	async cancel(name) {
		await sql`
			DELETE FROM _emdash_cron_tasks
			WHERE plugin_id = ${this.pluginId} AND task_name = ${name}
		`.execute(this.db);
		this.reschedule();
	}
	async list() {
		return (await sql`
			SELECT task_name, schedule, next_run_at, last_run_at
			FROM _emdash_cron_tasks
			WHERE plugin_id = ${this.pluginId} AND enabled = 1
			ORDER BY next_run_at ASC
		`.execute(this.db)).rows.map((row) => ({
			name: row.task_name,
			schedule: row.schedule,
			nextRunAt: row.next_run_at,
			lastRunAt: row.last_run_at
		}));
	}
};
/**
* Enable or disable all cron tasks for a plugin.
* Called by admin disable/enable endpoints and PluginManager lifecycle.
* Gracefully handles the cron table not existing yet (pre-migration).
*/
async function setCronTasksEnabled(db, pluginId, enabled) {
	try {
		await sql`
			UPDATE _emdash_cron_tasks
			SET enabled = ${enabled ? 1 : 0}
			WHERE plugin_id = ${pluginId}
		`.execute(db);
	} catch {}
}
/**
* Compute the next fire time for a cron expression, resolved in UTC.
* Supports standard cron (5-field), extended (6-field with seconds), and
* aliases like @daily, @weekly, @hourly, @monthly, @yearly.
*/
function nextCronTime(expression, currentTime = /* @__PURE__ */ new Date()) {
	const next = new Cron(expression, { timezone: CRON_TIMEZONE }).nextRun(currentTime);
	if (!next) throw new Error(`Invalid cron expression or no future run: "${expression}"`);
	return next.toISOString();
}
/**
* Check whether a string is a valid cron expression.
*/
function isCronExpression(schedule) {
	try {
		new Cron(schedule, { timezone: CRON_TIMEZONE });
		return true;
	} catch {
		return false;
	}
}
/**
* Check if a schedule string is a one-shot (ISO 8601 datetime) rather than
* a recurring cron expression.
*
* Recognizes the supported ISO date-time shape before consulting the cron
* parser, which also accepts ISO timestamps. Other values are parsed as cron
* first so expressions like "1-5 * * * *" are not misclassified as dates.
*/
function isOneShot(schedule) {
	if (schedule.startsWith("@")) return false;
	if (ISO_DATETIME_PATTERN.test(schedule)) return !isNaN(Date.parse(schedule));
	if (isCronExpression(schedule)) return false;
	return !isNaN(Date.parse(schedule));
}
function oneShotTime(schedule) {
	const withoutZone = ISO_DATETIME_PATTERN.test(schedule) && !ISO_TIMEZONE_PATTERN.test(schedule);
	const normalized = ISO_DATETIME_PATTERN.test(schedule) ? schedule.replace(" ", "T") : schedule;
	const input = withoutZone ? `${normalized}Z` : normalized;
	return new Date(input).toISOString();
}
/** Max length for a task name */
var MAX_TASK_NAME_LENGTH = 128;
/** Task name pattern: alphanumeric, dashes, underscores */
var TASK_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
/**
* Validate a cron task name.
* Must be non-empty, ≤128 chars, alphanumeric with dashes/underscores.
*/
function validateTaskName(name) {
	if (!name || name.length > MAX_TASK_NAME_LENGTH) throw new Error(`Invalid task name: must be 1-${MAX_TASK_NAME_LENGTH} characters, got ${name.length}`);
	if (!TASK_NAME_RE.test(name)) throw new Error(`Invalid task name "${name}": must start with a letter and contain only letters, numbers, dashes, or underscores`);
}
/**
* Validate a schedule string at registration time.
* Must be a valid cron expression or a parseable ISO 8601 datetime.
*/
function validateSchedule(schedule) {
	if (!schedule || schedule.length > 256) throw new Error(`Invalid schedule: must be 1-256 characters, got ${schedule.length}`);
	if (isCronExpression(schedule)) return;
	if (isNaN(Date.parse(schedule))) throw new Error(`Invalid schedule "${schedule}": must be a valid cron expression or ISO 8601 datetime`);
}
export { CronExecutor as n, setCronTasksEnabled as r, CronAccessImpl as t };
