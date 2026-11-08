import { o as currentTimestampValue, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as interpolateUrlPattern } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { t as isSiteRelativeDestination } from "./destination-DR3IHjmy_oys7XJ91.mjs";
import { i as matchPattern, n as interpolateDestination, o as validatePattern, r as isPattern, t as compilePattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/redirect-DjLdw427.mjs
/**
* Hard cap on rows stored in `_emdash_404_log`. Scheduled maintenance evicts
* the oldest rows by `last_seen_at` without adding a read-amplifying count to
* the anonymous request path.
*/
var MAX_404_LOG_ROWS = 1e4;
/** Max stored length for the `Referer` header — truncated on insert. */
var REFERRER_MAX_LENGTH = 512;
/** Max stored length for the `User-Agent` header — truncated on insert. */
var USER_AGENT_MAX_LENGTH = 256;
/** Pattern to escape LIKE wildcards: %, _, and backslash */
var LIKE_ESCAPE_RE = /[\\%_]/g;
/**
* Truncate a header-derived string to `max` chars, preserving `null`/`undefined`
* as `null`. Empty strings stay empty (the caller decides whether to coerce).
*/
function truncateOrNull(value, max) {
	if (value === null || value === void 0) return null;
	return value.length > max ? value.slice(0, max) : value;
}
var RedirectWriteBusyError = class extends Error {
	name = "RedirectWriteBusyError";
};
var REDIRECT_WRITE_LOCK_ID = 1;
var REDIRECT_WRITE_LEASE_MS = 3e4;
var REDIRECT_WRITE_LOCK_ATTEMPTS = 5;
var POSTGRES_REDIRECT_LOCK_KEY = 1168624763;
function rowToRedirect(row) {
	return {
		id: row.id,
		source: row.source,
		destination: row.destination,
		type: row.type,
		isPattern: row.is_pattern === 1,
		enabled: row.enabled === 1,
		hits: row.hits,
		lastHitAt: row.last_hit_at,
		groupName: row.group_name,
		auto: row.auto === 1,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var RedirectRepository = class RedirectRepository {
	constructor(db) {
		this.db = db;
	}
	async findById(id) {
		return (await this.findVersionedById(id))?.redirect ?? null;
	}
	async findVersionedById(id) {
		const row = await this.db.selectFrom("_emdash_redirects").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? {
			redirect: rowToRedirect(row),
			configRevision: row.config_revision
		} : null;
	}
	async findBySource(source) {
		const row = await this.db.selectFrom("_emdash_redirects").selectAll().where("source", "=", source).executeTakeFirst();
		return row ? rowToRedirect(row) : null;
	}
	async findConfigRevision(id) {
		return (await this.db.selectFrom("_emdash_redirects").select("config_revision").where("id", "=", id).executeTakeFirst())?.config_revision ?? null;
	}
	async withWriteLock(action) {
		if (isPostgres(this.db)) {
			if (this.db.isTransaction) {
				await sql`SELECT pg_advisory_xact_lock(${POSTGRES_REDIRECT_LOCK_KEY})`.execute(this.db);
				return this.withLease(action);
			}
			return this.db.transaction().execute(async (transaction) => {
				await sql`SELECT pg_advisory_xact_lock(${POSTGRES_REDIRECT_LOCK_KEY})`.execute(transaction);
				return new RedirectRepository(transaction).withLease(action);
			});
		}
		return this.withLease(action);
	}
	async withLease(action) {
		const token = ulid();
		let fence;
		for (let attempt = 0; attempt < REDIRECT_WRITE_LOCK_ATTEMPTS; attempt++) {
			const now = Date.now();
			const result = await this.db.updateTable("_emdash_redirect_write_lock").set({
				token,
				expires_at: now + REDIRECT_WRITE_LEASE_MS,
				generation: sql`generation + 1`
			}).where("id", "=", REDIRECT_WRITE_LOCK_ID).where((eb) => eb.or([eb("token", "=", ""), eb("expires_at", "<", now)])).returning("generation").executeTakeFirst();
			if (result) {
				fence = {
					token,
					generation: result.generation
				};
				break;
			}
			await new Promise((resolve) => setTimeout(resolve, 10 * 2 ** attempt));
		}
		if (!fence) throw new RedirectWriteBusyError("Another redirect change is in progress");
		try {
			return await action(fence, this);
		} finally {
			try {
				await this.db.updateTable("_emdash_redirect_write_lock").set({
					token: "",
					expires_at: 0
				}).where("id", "=", REDIRECT_WRITE_LOCK_ID).where("token", "=", token).execute();
			} catch (error) {
				console.error("Failed to release redirect write lock:", error);
			}
		}
	}
	async findMany(opts) {
		const limit = Math.min(Math.max(opts.limit ?? 50, 1), 100);
		let query = this.db.selectFrom("_emdash_redirects").selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		if (opts.search) {
			const term = `%${opts.search.replace(LIKE_ESCAPE_RE, (c) => `\\${c}`)}%`;
			query = query.where((eb) => eb.or([sql`source LIKE ${term} ESCAPE '\\'`, sql`destination LIKE ${term} ESCAPE '\\'`]));
		}
		if (opts.group !== void 0) query = query.where("group_name", "=", opts.group);
		if (opts.enabled !== void 0) query = query.where("enabled", "=", opts.enabled ? 1 : 0);
		if (opts.auto !== void 0) query = query.where("auto", "=", opts.auto ? 1 : 0);
		if (opts.cursor) {
			const decoded = decodeCursor(opts.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		const rows = await query.execute();
		const items = rows.slice(0, limit).map(rowToRedirect);
		const result = { items };
		if (rows.length > limit) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	async create(input, fence) {
		if (!fence) return this.withWriteLock((currentFence, repository) => repository.create(input, currentFence));
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const patternFlag = input.isPattern ?? isPattern(input.source);
		await this.db.insertInto("_emdash_redirects").values({
			id,
			source: input.source,
			destination: input.destination,
			type: input.type ?? 301,
			is_pattern: patternFlag ? 1 : 0,
			enabled: input.enabled !== false ? 1 : 0,
			hits: 0,
			last_hit_at: null,
			group_name: input.groupName ?? null,
			auto: input.auto ? 1 : 0,
			config_revision: ulid(),
			source_guard: 1,
			write_generation: fence?.generation ?? 0,
			created_at: now,
			updated_at: now
		}).execute();
		return await this.findById(id);
	}
	async update(id, input, expectedRevision, fence) {
		if (!fence) return this.withWriteLock((currentFence, repository) => repository.update(id, input, expectedRevision, currentFence));
		const existing = await this.findById(id);
		if (!existing) return null;
		const values = {
			updated_at: new Date(Math.max(Date.now(), new Date(existing.updatedAt).getTime() + 1)).toISOString(),
			config_revision: ulid()
		};
		if (fence) values.write_generation = fence.generation;
		if (input.source !== void 0) {
			values.source = input.source;
			values.source_guard = 1;
			values.is_pattern = input.isPattern !== void 0 ? input.isPattern ? 1 : 0 : isPattern(input.source) ? 1 : 0;
		} else if (input.isPattern !== void 0) values.is_pattern = input.isPattern ? 1 : 0;
		if (input.destination !== void 0) values.destination = input.destination;
		if (input.type !== void 0) values.type = input.type;
		if (input.enabled !== void 0) values.enabled = input.enabled ? 1 : 0;
		if (input.groupName !== void 0) values.group_name = input.groupName;
		let query = this.db.updateTable("_emdash_redirects").set(values).where("id", "=", id);
		if (expectedRevision !== void 0) query = query.where("config_revision", "=", expectedRevision);
		if (fence) query = query.where((eb) => eb.exists(eb.selectFrom("_emdash_redirect_write_lock").select("id").where("id", "=", REDIRECT_WRITE_LOCK_ID).where("token", "=", fence.token).where("generation", "=", fence.generation)));
		const result = await query.executeTakeFirst();
		if (BigInt(result.numUpdatedRows) === 0n) return null;
		return await this.findById(id);
	}
	async delete(id, expectedRevision, fence) {
		if (!fence) return this.withWriteLock((currentFence, repository) => repository.delete(id, expectedRevision, currentFence));
		let query = this.db.deleteFrom("_emdash_redirects").where("id", "=", id);
		if (expectedRevision !== void 0) query = query.where("config_revision", "=", expectedRevision);
		if (fence) query = query.where((eb) => eb.exists(eb.selectFrom("_emdash_redirect_write_lock").select("id").where("id", "=", REDIRECT_WRITE_LOCK_ID).where("token", "=", fence.token).where("generation", "=", fence.generation)));
		const result = await query.executeTakeFirst();
		return BigInt(result.numDeletedRows) > 0n;
	}
	/**
	* Fetch all enabled redirects (for loop detection graph building).
	* Not paginated — returns the full set. Ordered oldest first: the earliest
	* matching pattern rule wins, so this order is match precedence.
	*/
	async findAllEnabled() {
		return (await this.db.selectFrom("_emdash_redirects").selectAll().where("enabled", "=", 1).orderBy("created_at", (order) => order.asc().nullsFirst()).orderBy("id", "asc").execute()).map(rowToRedirect);
	}
	async findExactMatch(path) {
		const row = await this.db.selectFrom("_emdash_redirects").selectAll().where("source", "=", path).where("enabled", "=", 1).where("is_pattern", "=", 0).executeTakeFirst();
		return row ? rowToRedirect(row) : null;
	}
	async findEnabledPatternRules() {
		return (await this.db.selectFrom("_emdash_redirects").selectAll().where("enabled", "=", 1).where("is_pattern", "=", 1).orderBy("created_at", (order) => order.asc().nullsFirst()).orderBy("id", "asc").execute()).map(rowToRedirect);
	}
	/**
	* Match a request path against all enabled redirect rules.
	* Checks exact matches first (indexed), then pattern rules.
	* Returns the matched redirect and the resolved destination URL.
	*/
	async matchPath(path) {
		let exact = await this.findExactMatch(path);
		if (!exact && path.length > 1) {
			const alt = path.endsWith("/") ? path.slice(0, -1) : `${path}/`;
			exact = await this.findExactMatch(alt);
		}
		if (exact && isSiteRelativeDestination(exact.destination)) return {
			redirect: exact,
			resolvedDestination: exact.destination
		};
		const patterns = await this.findEnabledPatternRules();
		for (const redirect of patterns) {
			if (validatePattern(redirect.source)) continue;
			const params = matchPattern(compilePattern(redirect.source), path);
			if (params) {
				const resolved = interpolateDestination(redirect.destination, params);
				if (isSiteRelativeDestination(resolved)) return {
					redirect,
					resolvedDestination: resolved
				};
			}
		}
		return null;
	}
	async recordHit(id) {
		await sql`
			UPDATE _emdash_redirects
			SET hits = hits + 1, last_hit_at = ${currentTimestampValue(this.db)}, updated_at = ${currentTimestampValue(this.db)}
			WHERE id = ${id}
		`.execute(this.db);
	}
	/**
	* Create an auto-redirect when a content slug changes.
	* Uses the collection's URL pattern to compute old/new URLs.
	* Collapses existing redirect chains pointing to the old URL and
	* removes redirects that would shadow the now-live new URL, so a
	* rename that is later reverted cannot form a loop (#1986).
	*
	* Returns null when old and new URL are identical (nothing to redirect).
	*/
	async createAutoRedirect(collection, oldSlug, newSlug, contentId, urlPattern, oldPublishedAt, newPublishedAt) {
		return this.withWriteLock(async (fence, repository) => {
			const oldUrl = interpolateUrlPattern({
				pattern: urlPattern,
				collection,
				slug: oldSlug,
				id: contentId,
				date: oldPublishedAt
			});
			const newUrl = interpolateUrlPattern({
				pattern: urlPattern,
				collection,
				slug: newSlug,
				id: contentId,
				date: newPublishedAt
			});
			if (oldUrl === newUrl) return null;
			await repository.db.deleteFrom("_emdash_redirects").where("source", "=", newUrl).where((eb) => eb.exists(eb.selectFrom("_emdash_redirect_write_lock").select("id").where("id", "=", REDIRECT_WRITE_LOCK_ID).where("token", "=", fence.token).where("generation", "=", fence.generation))).execute();
			await repository.collapseChains(oldUrl, newUrl, fence);
			const existing = await repository.findBySource(oldUrl);
			if (existing) return await repository.update(existing.id, { destination: newUrl }, void 0, fence);
			return repository.create({
				source: oldUrl,
				destination: newUrl,
				type: 301,
				isPattern: false,
				auto: true,
				groupName: "Auto: slug change"
			}, fence);
		});
	}
	/**
	* Update all redirects whose destination matches oldDestination
	* to point to newDestination instead. Prevents redirect chains.
	* Returns the number of updated rows.
	*/
	async collapseChains(oldDestination, newDestination, fence) {
		if (!fence) return this.withWriteLock((currentFence, repository) => repository.collapseChains(oldDestination, newDestination, currentFence));
		let query = this.db.updateTable("_emdash_redirects").set({
			destination: newDestination,
			updated_at: (/* @__PURE__ */ new Date()).toISOString(),
			config_revision: ulid(),
			...fence ? { write_generation: fence.generation } : {}
		}).where("destination", "=", oldDestination);
		if (fence) query = query.where((eb) => eb.exists(eb.selectFrom("_emdash_redirect_write_lock").select("id").where("id", "=", REDIRECT_WRITE_LOCK_ID).where("token", "=", fence.token).where("generation", "=", fence.generation)));
		const result = await query.executeTakeFirst();
		return Number(result.numUpdatedRows);
	}
	/**
	* Record a 404 hit for `entry.path`.
	*
	* Dedups by path: repeat hits increment `hits` and refresh `last_seen_at`
	* on the existing row instead of inserting a new one. Referrer and
	* user-agent are truncated to bounded lengths so a malicious client can't
	* blow up storage with huge headers. When the table would exceed
	* MAX_404_LOG_ROWS, the oldest entries (by `last_seen_at`) are evicted.
	*
	* This is called from the public redirect middleware on every 404 and
	* must never throw for an unauthenticated caller — failures bubble up to
	* the middleware, which catches and logs them.
	*/
	async log404(entry) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const referrer = truncateOrNull(entry.referrer, REFERRER_MAX_LENGTH);
		const userAgent = truncateOrNull(entry.userAgent, USER_AGENT_MAX_LENGTH);
		const ip = entry.ip ?? null;
		const id = ulid();
		await this.db.insertInto("_emdash_404_log").values({
			id,
			path: entry.path,
			referrer,
			user_agent: userAgent,
			ip,
			hits: 1,
			last_seen_at: now,
			created_at: now
		}).onConflict((oc) => oc.column("path").doUpdateSet({
			hits: sql`${sql.ref("_emdash_404_log.hits")} + 1`,
			last_seen_at: now,
			referrer,
			user_agent: userAgent,
			ip
		})).execute();
	}
	/**
	* Delete the oldest rows from `_emdash_404_log` if the row count exceeds
	* MAX_404_LOG_ROWS. "Oldest" is by `last_seen_at`, so a path that keeps
	* getting hit stays in the table even if it was first seen long ago.
	*
	* Called by scheduled system cleanup, never by the anonymous request path.
	*/
	async cleanup404Log() {
		const probe = await this.db.selectFrom(this.db.selectFrom("_emdash_404_log").select(sql`1`.as("one")).limit(10001).as("sample")).select(({ fn }) => fn.countAll().as("count")).executeTakeFirstOrThrow();
		if (Number(probe.count) <= MAX_404_LOG_ROWS) return 0;
		const result = await this.db.deleteFrom("_emdash_404_log").where("id", "not in", this.db.selectFrom("_emdash_404_log").select("id").orderBy("last_seen_at", "desc").orderBy("id", "desc").limit(MAX_404_LOG_ROWS)).executeTakeFirst();
		return Number(result.numDeletedRows);
	}
	async find404s(opts) {
		const limit = Math.min(Math.max(opts.limit ?? 50, 1), 100);
		let query = this.db.selectFrom("_emdash_404_log").selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		if (opts.search) {
			const term = `%${opts.search.replace(LIKE_ESCAPE_RE, (c) => `\\${c}`)}%`;
			query = query.where(sql`path LIKE ${term} ESCAPE '\\'`);
		}
		if (opts.cursor) {
			const decoded = decodeCursor(opts.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		const rows = await query.execute();
		const items = rows.slice(0, limit).map((row) => ({
			id: row.id,
			path: row.path,
			referrer: row.referrer,
			userAgent: row.user_agent,
			ip: row.ip,
			createdAt: row.created_at
		}));
		const result = { items };
		if (rows.length > limit) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	async get404Summary(limit = 50) {
		return (await sql`
			SELECT
				path,
				SUM(hits) as count,
				MAX(last_seen_at) as last_seen,
				(
					SELECT referrer FROM _emdash_404_log AS inner_log
					WHERE inner_log.path = _emdash_404_log.path
						AND referrer IS NOT NULL AND referrer != ''
					LIMIT 1
				) as top_referrer
			FROM _emdash_404_log
			GROUP BY path
			ORDER BY count DESC
			LIMIT ${limit}
		`.execute(this.db)).rows.map((row) => ({
			path: row.path,
			count: Number(row.count),
			lastSeen: row.last_seen,
			topReferrer: row.top_referrer
		}));
	}
	async delete404(id) {
		const result = await this.db.deleteFrom("_emdash_404_log").where("id", "=", id).executeTakeFirst();
		return BigInt(result.numDeletedRows) > 0n;
	}
	async clear404s() {
		const result = await this.db.deleteFrom("_emdash_404_log").executeTakeFirst();
		return Number(result.numDeletedRows);
	}
	async prune404s(olderThan) {
		const result = await this.db.deleteFrom("_emdash_404_log").where("created_at", "<", olderThan).executeTakeFirst();
		return Number(result.numDeletedRows);
	}
};
export { RedirectWriteBusyError as n, RedirectRepository as t };
