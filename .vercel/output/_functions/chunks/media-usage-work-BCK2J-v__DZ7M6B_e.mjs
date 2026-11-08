import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { n as verifyMediaUsageCaptureTriggers } from "./capture-triggers-BezAvWcB_DojFQM3C.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/media-usage-work-BCK2J-v_.mjs
/**
* Delete records in shared tables that belong to a given collection's entries.
*
* These tables are keyed by collection slug rather than by a foreign key to the
* content table, so dropping `ec_<slug>` or deleting the collection row does not
* remove them. The caller must run this before the collection identity
* disappears, otherwise the rows become orphans that nothing else sweeps.
*/
async function deleteSharedCollectionRecords(db, collectionSlug) {
	await db.deleteFrom("revisions").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_seo").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_comments").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_content_bylines").where("collection_slug", "=", collectionSlug).execute();
	await db.deleteFrom("content_taxonomies").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_entry_locks").where("collection", "=", collectionSlug).execute();
}
var ACTIVATION_KEY = "incremental_capture";
var VIRTUAL_DIALECT_ID = "virtual:emdash/dialect";
var MediaUsageCollectionDeletionRepository = class {
	constructor(db) {
		this.db = db;
	}
	async createTombstone(input) {
		assertIdentity$1(input);
		const now = timestampOffset(this.db, 0);
		await this.db.insertInto("_emdash_media_usage_collection_deletions").values({
			collection_id: input.collectionId,
			collection_slug: input.collectionSlug,
			force_delete: input.forceDelete ? 1 : 0,
			state: "pending",
			phase: "fence",
			next_attempt_at: now,
			updated_at: now
		}).onConflict((conflict) => conflict.column("collection_id").doNothing()).execute();
		const row = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_id", "=", input.collectionId).executeTakeFirstOrThrow();
		if (row.collection_slug !== input.collectionSlug || Boolean(row.force_delete) !== input.forceDelete) throw new Error("Collection deletion tombstone identity conflicts with existing work");
		return rowToRecord(row);
	}
	async claim(input) {
		if (!input.collectionId || !isPhase(input.phase)) throw new Error("Collection deletion claim requires an exact identity and phase");
		if (!Number.isSafeInteger(input.leaseDurationSeconds) || input.leaseDurationSeconds < 1) throw new Error("Collection deletion lease duration must be a positive whole number");
		const leaseToken = ulid();
		const row = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "leased",
			lease_token: leaseToken,
			lease_expires_at: timestampOffset(this.db, input.leaseDurationSeconds),
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("phase", "=", input.phase).where((eb) => eb.or([eb.and([eb("state", "in", ["pending", "retry"]), timestampIsDue(this.db, "next_attempt_at")]), eb.and([eb("state", "=", "leased"), timestampIsDue(this.db, "lease_expires_at")])])).returningAll().executeTakeFirst();
		if (!row) return null;
		return {
			...rowToRecord(row),
			leaseToken
		};
	}
	async findBySlug(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		try {
			const row = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_slug", "=", collectionSlug).executeTakeFirst();
			return row ? rowToRecord(row) : null;
		} catch (error) {
			if (isMissingTableError(error)) return null;
			throw error;
		}
	}
	async findDue(limit) {
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("Collection deletion candidate limit must be from 1 to 100");
		const nextAttemptIsDue = timestampIsDue(this.db, "next_attempt_at");
		return (await sql`
			WITH pending_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'pending' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), retry_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'retry' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), leased_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'leased' AND ${timestampIsDue(this.db, "lease_expires_at")}
				ORDER BY lease_expires_at, updated_at, collection_id
				LIMIT ${limit}
			), candidates AS (
				SELECT * FROM pending_candidates
				UNION ALL SELECT * FROM retry_candidates
				UNION ALL SELECT * FROM leased_candidates
			)
			SELECT * FROM candidates
			ORDER BY CASE WHEN state = 'leased' THEN lease_expires_at ELSE next_attempt_at END,
				updated_at,
				collection_id
			LIMIT ${limit}
		`.execute(this.db)).rows.map(rowToRecord);
	}
	async hasNonterminal() {
		return await this.db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("state", "in", [
			"pending",
			"retry",
			"leased"
		]).limit(1).executeTakeFirst() !== void 0;
	}
	async findOperatorPage(options) {
		const state = options.state ?? "failed";
		if (!isState(state)) throw new Error("Invalid collection deletion state");
		const limit = options.limit ?? 50;
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("Collection deletion operator limit must be from 1 to 100");
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		let query = this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("state", "=", state);
		if (cursor) query = query.where((eb) => eb.or([eb("updated_at", "<", cursor.orderValue), eb.and([eb("updated_at", "=", cursor.orderValue), eb("collection_id", "<", cursor.id)])]));
		const rows = await query.orderBy("updated_at", "desc").orderBy("collection_id", "desc").limit(limit + 1).execute();
		const items = rows.slice(0, limit).map(rowToOperatorItem);
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.updatedAt, last.collectionId);
		}
		return result;
	}
	async retryOperatorDeletion(input) {
		if (!input.collectionId) throw new Error("Collection deletion retry requires an ID");
		const observed = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_id", "=", input.collectionId).executeTakeFirst();
		if (!observed) return { outcome: "not_found" };
		if (observed.state === "leased" && observed.lease_expires_at) {
			const live = await this.db.selectFrom("_emdash_media_usage_collection_deletions").select("lease_expires_at").where("collection_id", "=", input.collectionId).where("state", "=", "leased").where(liveLease(this.db)).executeTakeFirst();
			if (live?.lease_expires_at) return {
				outcome: "lease_active",
				leaseExpiresAt: live.lease_expires_at
			};
		}
		const now = timestampOffset(this.db, 0);
		const reopened = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "pending",
			attempt_count: 0,
			next_attempt_at: now,
			lease_token: null,
			lease_expires_at: null,
			last_error_code: null,
			updated_at: now
		}).where("collection_id", "=", input.collectionId).where((eb) => eb.or([eb("state", "in", ["failed", "retry"]), eb.and([eb("state", "=", "leased"), timestampIsDue(this.db, "lease_expires_at")])])).returningAll().executeTakeFirst();
		if (reopened) return {
			outcome: "pending",
			changed: true,
			item: rowToOperatorItem(reopened)
		};
		return { outcome: "conflict" };
	}
	async checkpoint(input) {
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			phase: input.toPhase,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("phase", "=", input.fromPhase).where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async release(input) {
		const now = timestampOffset(this.db, 0);
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "pending",
			next_attempt_at: now,
			lease_token: null,
			lease_expires_at: null,
			attempt_count: 0,
			last_error_code: null,
			updated_at: now
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async cancelFence(input) {
		const result = await this.db.deleteFrom("_emdash_media_usage_collection_deletions").where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("phase", "=", "fence").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0) === 1;
	}
	async recordFailure(input) {
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: input.terminal ? "failed" : "retry",
			attempt_count: sql`attempt_count + 1`,
			next_attempt_at: timestampOffset(this.db, input.retryDelaySeconds),
			lease_token: null,
			lease_expires_at: null,
			last_error_code: input.errorCode,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async deleteRegistryAndCheckpoint(input) {
		return withTransaction(this.db, async (trx) => {
			await trx.deleteFrom("_emdash_collections").where("id", "=", input.collectionId).where("slug", "=", input.collectionSlug).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_collection_deletions as deletion").select("deletion.collection_id").where("deletion.collection_id", "=", input.collectionId).where("deletion.collection_slug", "=", input.collectionSlug).where("deletion.state", "=", "leased").where("deletion.phase", "=", "registry").where("deletion.lease_token", "=", input.leaseToken).where(liveLease(trx, "deletion.lease_expires_at")))).execute();
			const checkpoint = await trx.updateTable("_emdash_media_usage_collection_deletions").set({
				phase: "table",
				updated_at: timestampOffset(trx, 0)
			}).where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", "registry").where("lease_token", "=", input.leaseToken).where(liveLease(trx)).executeTakeFirst();
			return Number(checkpoint.numUpdatedRows ?? 0) === 1;
		});
	}
};
async function deleteActivatedMediaUsageCollection(db, input, options = {}) {
	const frontPhaseLimit = options.frontPhaseLimit ?? 3;
	if (!Number.isSafeInteger(frontPhaseLimit) || frontPhaseLimit < 1 || frontPhaseLimit > 3) throw new Error("Collection deletion front-phase limit must be from 1 to 3");
	validateIdentifier(input.collectionSlug, "collection slug");
	const repository = new MediaUsageCollectionDeletionRepository(db);
	let deletion = await repository.findBySlug(input.collectionSlug);
	if (deletion && input.collectionId && deletion.collectionId !== input.collectionId) throw new Error("Collection deletion tombstone identity conflict");
	if (!deletion) {
		let activation;
		try {
			activation = await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", ACTIVATION_KEY).executeTakeFirst();
		} catch (error) {
			if (!isMissingTableError(error)) throw error;
		}
		if (!activation || activation.state === "expanded") return "inactive";
		if (activation.state !== "active") throw new Error("Media usage activation must be active before collection deletion");
		if (!input.collectionId) return "not_found";
		await assertActivatedCollectionDeletionReady(db, {
			collectionId: input.collectionId,
			collectionSlug: input.collectionSlug
		});
		deletion = await repository.createTombstone({
			collectionId: input.collectionId,
			collectionSlug: input.collectionSlug,
			forceDelete: input.forceDelete
		});
	}
	if (deletion.phase !== "fence" && deletion.phase !== "registry" && deletion.phase !== "table") return "deleted";
	const claim = options.claimed ?? await repository.claim({
		collectionId: deletion.collectionId,
		phase: deletion.phase,
		leaseDurationSeconds: 300
	});
	if (!claim) return "in_progress";
	if (claim.collectionId !== deletion.collectionId || claim.phase !== deletion.phase) throw new Error("Collection deletion claim identity conflict");
	let phase = claim.phase;
	let processedFrontPhases = 0;
	const lease = {
		collectionId: claim.collectionId,
		leaseToken: claim.leaseToken
	};
	if (phase === "fence") {
		const captureState = await findCollectionCaptureState(db, claim);
		if (captureState !== "active" && captureState !== "deleting") throw new Error("Activated collection deletion requires a fenced capture lifecycle");
		if (!await verifyMediaUsageCaptureTriggers(db, claim)) throw new Error("Activated collection deletion requires the exact capture trigger set");
		if (captureState === "active") {
			const result = await executeCollectionDeletionGuard(db, {
				action: "fence",
				collectionId: claim.collectionId,
				collectionSlug: claim.collectionSlug,
				leaseToken: claim.leaseToken,
				forceDelete: claim.forceDelete
			});
			if (result.outcome === "has_content") {
				if (!await repository.cancelFence(lease)) throw new Error("Collection deletion lost its fence while preserving content");
				return "has_content";
			}
			if (result.outcome !== "fenced") throw new Error("Collection deletion lost its fence");
		}
		if (!await repository.checkpoint({
			...lease,
			fromPhase: "fence",
			toPhase: "registry"
		})) throw new Error("Collection deletion lost its fence checkpoint");
		phase = "registry";
		processedFrontPhases++;
		if (processedFrontPhases >= frontPhaseLimit) {
			if (!await repository.release(lease)) throw new Error("Collection deletion lost its handoff");
			return "advanced";
		}
	}
	if (phase === "registry") {
		if (!await repository.deleteRegistryAndCheckpoint({
			...lease,
			collectionSlug: claim.collectionSlug
		})) throw new Error("Collection deletion lost its registry checkpoint");
		phase = "table";
		processedFrontPhases++;
		if (processedFrontPhases >= frontPhaseLimit) {
			if (!await repository.release(lease)) throw new Error("Collection deletion lost its handoff");
			return "advanced";
		}
	}
	if (phase === "table") {
		if ((await executeCollectionDeletionGuard(db, {
			action: "drop",
			collectionId: claim.collectionId,
			collectionSlug: claim.collectionSlug,
			leaseToken: claim.leaseToken
		})).outcome !== "dropped") throw new Error("Collection deletion lost its table fence");
		await deleteSharedCollectionRecords(db, claim.collectionSlug);
		if (!await repository.checkpoint({
			...lease,
			fromPhase: "table",
			toPhase: "work"
		})) throw new Error("Collection deletion lost its table checkpoint");
	}
	if (!await repository.release(lease)) throw new Error("Collection deletion lost its cleanup handoff");
	return "deleted";
}
async function isMediaUsageCollectionSlugDeleting(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	try {
		return await db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("collection_slug", "=", collectionSlug).executeTakeFirst() !== void 0;
	} catch (error) {
		if (isMissingTableError(error)) return false;
		throw error;
	}
}
async function assertActivatedCollectionDeletionReady(db, identity) {
	if (await findCollectionCaptureState(db, identity) !== "active") throw new Error("Activated collection deletion requires an active capture lifecycle");
	if (!await verifyMediaUsageCaptureTriggers(db, identity)) throw new Error("Activated collection deletion requires the exact capture trigger set");
}
async function findCollectionCaptureState(db, identity) {
	return (await db.selectFrom("_emdash_media_usage_index_status").select("capture_state").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).executeTakeFirst())?.capture_state ?? null;
}
async function executeCollectionDeletionGuard(db, input) {
	const executeAdapterGuard = await loadAdapterCollectionDeletionGuard();
	if (executeAdapterGuard) {
		const { default: config } = await import("./config_rWUzgpIJ.mjs");
		return executeAdapterGuard(config.database?.config, input);
	}
	return executeLocalCollectionDeletionGuard(db, input);
}
async function loadAdapterCollectionDeletionGuard() {
	try {
		return (await import("./dialect_BQ6hoGf3.mjs")).executeCollectionDeletionGuard;
	} catch (error) {
		if (isVirtualDialectUnavailableError(error)) return void 0;
		throw error;
	}
}
function isVirtualDialectUnavailableError(error) {
	if (!(error instanceof Error) || !("code" in error)) return false;
	if (error.code === "ERR_MODULE_NOT_FOUND") return error.message.includes(VIRTUAL_DIALECT_ID);
	return error.code === "ERR_UNSUPPORTED_ESM_URL_SCHEME" && error.message.includes("Received protocol 'virtual:'");
}
async function executeLocalCollectionDeletionGuard(db, input) {
	assertGuardInput(input);
	return db.transaction().execute(async (trx) => {
		if (!await lockLiveTombstone(trx, input)) return { outcome: "stale" };
		if (input.action === "fence") return fenceCollection(trx, input);
		await new FTSManager(trx).dropFtsTable(input.collectionSlug);
		await sql`DROP TABLE IF EXISTS ${sql.ref(`ec_${input.collectionSlug}`)}`.execute(trx);
		return { outcome: "dropped" };
	});
}
async function fenceCollection(trx, input) {
	const tableName = `ec_${input.collectionSlug}`;
	validateIdentifier(tableName, "content table");
	if (isPostgres(trx)) await sql`LOCK TABLE ${sql.ref(tableName)} IN SHARE ROW EXCLUSIVE MODE`.execute(trx);
	if (!input.forceDelete) {
		if ((await sql`
			SELECT 1 AS present FROM ${sql.ref(tableName)}
			WHERE deleted_at IS NULL
			LIMIT 1
		`.execute(trx)).rows.length > 0) return { outcome: "has_content" };
	}
	const result = await trx.updateTable("_emdash_media_usage_index_status as status").set({
		capture_state: "deleting",
		updated_at: timestampOffset(trx, 0)
	}).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", input.collectionSlug).where("status.collection_id", "=", input.collectionId).where("status.capture_state", "=", "active").where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").select("collection.id").where("collection.id", "=", input.collectionId).where("collection.slug", "=", input.collectionSlug))).executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0) === 1 ? { outcome: "fenced" } : { outcome: "stale" };
}
async function lockLiveTombstone(trx, input) {
	const phase = input.action === "fence" ? "fence" : "table";
	if (isPostgres(trx)) return await trx.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", phase).where("lease_token", "=", input.leaseToken).where(liveLease(trx)).forUpdate().executeTakeFirst() !== void 0;
	const locked = await trx.updateTable("_emdash_media_usage_collection_deletions").set({ updated_at: sql`updated_at` }).where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", phase).where("lease_token", "=", input.leaseToken).where(liveLease(trx)).executeTakeFirst();
	return Number(locked.numUpdatedRows ?? 0) === 1;
}
function assertIdentity$1(input) {
	if (!input.collectionId) throw new Error("Collection deletion requires a collection ID");
	validateIdentifier(input.collectionSlug, "collection slug");
}
function assertGuardInput(input) {
	assertIdentity$1(input);
	if (!input.leaseToken) throw new Error("Collection deletion requires a lease token");
}
function liveLease(db, column = "lease_expires_at") {
	const leaseExpiresAt = sql.ref(column);
	return isPostgres(db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampIsDue(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)} <= to_char(
			statement_timestamp() AT TIME ZONE 'UTC',
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampOffset(db, offsetSeconds) {
	if (isPostgres(db)) return sql`to_char(
			(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime(
		'%Y-%m-%dT%H:%M:%fZ',
		'now',
		${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
	)`;
}
function collectionDeletionCurrentTimestamp(db) {
	return timestampOffset(db, 0);
}
function rowToRecord(row) {
	if (!isState(row.state) || !isPhase(row.phase)) throw new Error("Invalid media usage collection deletion lifecycle");
	return {
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		forceDelete: Boolean(row.force_delete),
		state: row.state,
		phase: row.phase,
		workCursor: row.work_cursor,
		sourceKey: row.source_key,
		occurrenceCursor: row.occurrence_cursor,
		attemptCount: row.attempt_count,
		nextAttemptAt: row.next_attempt_at,
		leaseToken: row.lease_token,
		leaseExpiresAt: row.lease_expires_at,
		lastErrorCode: row.last_error_code,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOperatorItem(row) {
	const deletion = rowToRecord(row);
	return {
		collectionId: deletion.collectionId,
		collectionSlug: deletion.collectionSlug,
		state: deletion.state,
		phase: deletion.phase,
		attemptCount: deletion.attemptCount,
		nextAttemptAt: deletion.nextAttemptAt,
		leaseExpiresAt: deletion.leaseExpiresAt,
		lastErrorCode: deletion.lastErrorCode,
		updatedAt: deletion.updatedAt
	};
}
function isState(value) {
	return value === "pending" || value === "retry" || value === "leased" || value === "failed";
}
function isPhase(value) {
	return value === "fence" || value === "registry" || value === "table" || value === "work" || value === "sources" || value === "status" || value === "finalize";
}
var MAX_PORTABLE_DURATION_SECONDS = 31536e3;
var MAX_WORK_SELECTION_LIMIT = 1e3;
var NON_NEGATIVE_DECIMAL_PATTERN = /^(?:0|[1-9][0-9]*)$/;
var POSITIVE_DECIMAL_PATTERN = /^[1-9][0-9]*$/;
var STABLE_ERROR_CODE_PATTERN = /^[A-Z][A-Z0-9_]{0,63}$/;
var MEDIA_USAGE_WORK_OPERATOR_DEFAULT_LIMIT = 50;
var MEDIA_USAGE_WORK_OPERATOR_MAX_LIMIT = 100;
var MEDIA_USAGE_RECONCILIATION_PAGE_LIMIT = 1e3;
var MEDIA_USAGE_WORK_STATES = [
	"pending",
	"retry",
	"leased",
	"failed"
];
var MediaUsageWorkRepository = class {
	constructor(db) {
		this.db = db;
	}
	async enqueueReconciliationPage(input) {
		if (!input.collectionId || !input.collectionSlug || !input.runToken || !input.leaseToken) throw new Error("Reconciliation enqueue requires exact collection and lease identity");
		assertNonNegativeDecimal(input.changeEpoch, "change epoch");
		const contentIds = [...new Set(input.contentIds)];
		if (contentIds.length < 1 || contentIds.length > MEDIA_USAGE_RECONCILIATION_PAGE_LIMIT) throw new Error("Reconciliation enqueue requires from 1 to 1000 content IDs");
		if (contentIds.some((contentId) => !contentId)) throw new Error("Reconciliation enqueue content IDs must not be empty");
		const now = this.timestampOffset(0);
		const contentIdsJson = JSON.stringify(contentIds);
		await sql`
			WITH page(content_id) AS (${isPostgres(this.db) ? sql`SELECT value::text AS content_id FROM jsonb_array_elements_text(${contentIdsJson}::jsonb) AS value` : sql`SELECT value AS content_id FROM json_each(${contentIdsJson})`})
			INSERT INTO _emdash_media_usage_work (
				collection_id, collection_slug, content_id, change_epoch, work_version,
				state, attempt_count, next_attempt_at, lease_token, lease_expires_at,
				last_attempted_at, last_error_code, created_at, updated_at
			)
			SELECT
				${input.collectionId}, ${input.collectionSlug}, page.content_id, ${input.changeEpoch}, 1,
				'pending', 0, ${now}, NULL, NULL, NULL, NULL, ${now}, ${now}
			FROM page
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_media_usage_reconciliations AS reconciliation
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = reconciliation.collection_id
					AND status.scope_key = reconciliation.collection_slug
				INNER JOIN _emdash_collections AS collection
					ON collection.id = reconciliation.collection_id
					AND collection.slug = reconciliation.collection_slug
				WHERE reconciliation.collection_id = ${input.collectionId}
					AND reconciliation.collection_slug = ${input.collectionSlug}
					AND reconciliation.run_token = ${input.runToken}
					AND reconciliation.target_epoch = ${input.changeEpoch}
					AND reconciliation.state = 'leased'
					AND reconciliation.phase = ${input.phase}
					AND reconciliation.lease_token = ${input.leaseToken}
					AND ${this.qualifiedLeaseIsLive("reconciliation.lease_expires_at")}
					AND status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.capture_state = 'active'
					AND status.reconciliation_required = 1
					AND status.status = 'running'
					AND status.cursor = ${input.runToken}
					AND status.change_epoch = ${input.changeEpoch}
					AND EXISTS (
						SELECT 1 FROM _emdash_media_usage_activation AS activation
						WHERE activation.task_key = 'incremental_capture'
							AND activation.state = 'active'
					)
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = reconciliation.collection_id
					)
			)
			ON CONFLICT (collection_id, content_id) DO UPDATE SET
				collection_slug = excluded.collection_slug,
				change_epoch = excluded.change_epoch,
				work_version = _emdash_media_usage_work.work_version + 1,
				state = 'pending',
				attempt_count = 0,
				next_attempt_at = excluded.next_attempt_at,
				lease_token = NULL,
				lease_expires_at = NULL,
				last_attempted_at = NULL,
				last_error_code = NULL,
				updated_at = excluded.updated_at
			WHERE _emdash_media_usage_work.change_epoch < excluded.change_epoch
		`.execute(this.db);
	}
	async findOperatorPage(options) {
		if (!options.collectionSlug) throw new Error("Media usage work listing requires a collection slug");
		if (options.state !== void 0 && !isMediaUsageWorkState(options.state)) throw new Error("Media usage work listing requires a valid state");
		const limit = operatorLimit(options.limit);
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		const collection = await this.db.selectFrom("_emdash_collections").select(["id", "slug"]).where("slug", "=", options.collectionSlug).executeTakeFirst();
		if (!collection) return null;
		const states = options.state ? [options.state] : MEDIA_USAGE_WORK_STATES;
		const candidates = [];
		for (const state of states) {
			const rows = await this.findOperatorRows({
				collectionId: collection.id,
				collectionSlug: collection.slug,
				state,
				limit: limit + 1,
				cursor
			});
			candidates.push(...rows.map(rowToOperatorWork));
		}
		const ordered = candidates.toSorted(compareOperatorWork);
		const items = ordered.slice(0, limit);
		const result = { items };
		if (ordered.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.updatedAt, last.contentId);
		}
		return result;
	}
	async findOperatorRows(input) {
		let query = this.db.selectFrom("_emdash_media_usage_work as work").innerJoin("_emdash_collections as current_collection", (join) => join.onRef("current_collection.id", "=", "work.collection_id").onRef("current_collection.slug", "=", "work.collection_slug")).selectAll("work").where("work.collection_id", "=", input.collectionId).where("work.collection_slug", "=", input.collectionSlug).where("work.state", "=", input.state);
		if (input.cursor) query = query.where((eb) => eb.or([eb("work.updated_at", "<", input.cursor.orderValue), eb.and([eb("work.updated_at", "=", input.cursor.orderValue), eb("work.content_id", "<", input.cursor.id)])]));
		return query.orderBy("work.updated_at", "desc").orderBy("work.content_id", "desc").limit(input.limit).execute();
	}
	async retryOperatorWork(input) {
		if (!input.collectionId || !input.contentId) throw new Error("Media usage operator retry requires collection and content IDs");
		const collection = await this.findActiveOperatorCollection(input.collectionId);
		if (!collection) return { outcome: "collection_not_found" };
		const observed = await this.findWorkByIdentity(input.collectionId, input.contentId);
		if (observed?.state === "pending" && observed.collection_slug === collection.slug) return {
			outcome: "pending",
			changed: false,
			work: rowToOperatorWork(observed)
		};
		const invalidated = await this.invalidateCoverageForOperatorRetry({
			...input,
			collectionSlug: collection.slug,
			observed
		});
		if (!invalidated) return this.operatorRetryLost(input);
		const reopened = observed ? await this.reopenObservedWork(observed, collection.slug, invalidated.change_epoch) : await this.createOperatorWork({
			...input,
			collectionSlug: collection.slug,
			changeEpoch: invalidated.change_epoch
		});
		if (reopened) return {
			outcome: "pending",
			changed: true,
			work: rowToOperatorWork(reopened)
		};
		return this.operatorRetryLost(input);
	}
	async findActiveOperatorCollection(collectionId) {
		return await this.db.selectFrom("_emdash_collections as collection").innerJoin("_emdash_media_usage_index_status as status", (join) => join.onRef("status.collection_id", "=", "collection.id").onRef("status.scope_key", "=", "collection.slug")).select(["collection.id", "collection.slug"]).where("collection.id", "=", collectionId).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.capture_state", "=", "active").executeTakeFirst() ?? null;
	}
	async findWorkByIdentity(collectionId, contentId) {
		return await this.db.selectFrom("_emdash_media_usage_work").selectAll().where("collection_id", "=", collectionId).where("content_id", "=", contentId).executeTakeFirst() ?? null;
	}
	async invalidateCoverageForOperatorRetry(input) {
		let query = this.db.updateTable("_emdash_media_usage_index_status as status").set({
			change_epoch: sql`change_epoch + 1`,
			status: sql`CASE WHEN status IN ('complete', 'partial', 'failed') THEN 'stale' ELSE status END`,
			completed_at: sql`CASE WHEN status IN ('complete', 'partial', 'failed') THEN NULL ELSE completed_at END`,
			last_error_code: null,
			updated_at: this.timestampOffset(0)
		}).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", input.collectionSlug).where("status.collection_id", "=", input.collectionId).where("status.capture_state", "=", "active").where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").select("collection.id").whereRef("collection.id", "=", "status.collection_id").whereRef("collection.slug", "=", "status.scope_key")));
		const observed = input.observed;
		if (observed) query = query.where((eb) => {
			let work = eb.selectFrom("_emdash_media_usage_work as work").select("work.content_id").whereRef("work.collection_id", "=", "status.collection_id").where("work.content_id", "=", input.contentId).where("work.work_version", "=", observed.work_version).where("work.state", "=", observed.state);
			if (observed.state === "leased") work = work.where("work.lease_expires_at", "is not", null).where(this.timestampIsDue("work.lease_expires_at"));
			return eb.exists(work);
		});
		else query = query.where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_work as work").select("work.content_id").whereRef("work.collection_id", "=", "status.collection_id").where("work.content_id", "=", input.contentId))));
		return await query.returning("change_epoch").executeTakeFirst() ?? null;
	}
	async reopenObservedWork(observed, collectionSlug, changeEpoch) {
		let query = this.db.updateTable("_emdash_media_usage_work").set({
			collection_slug: collectionSlug,
			change_epoch: changeEpoch,
			work_version: sql`work_version + 1`,
			state: "pending",
			attempt_count: 0,
			next_attempt_at: this.timestampOffset(0),
			lease_token: null,
			lease_expires_at: null,
			last_attempted_at: null,
			last_error_code: null,
			updated_at: this.timestampOffset(0)
		}).where("collection_id", "=", observed.collection_id).where("content_id", "=", observed.content_id).where("work_version", "=", observed.work_version).where("state", "=", observed.state).where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").innerJoin("_emdash_media_usage_index_status as status", (join) => join.onRef("status.collection_id", "=", "collection.id").onRef("status.scope_key", "=", "collection.slug")).select("collection.id").where("collection.id", "=", observed.collection_id).where("collection.slug", "=", collectionSlug).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.capture_state", "=", "active").where("status.change_epoch", "=", changeEpoch)));
		if (observed.state === "leased") query = query.where("lease_expires_at", "is not", null).where(this.timestampIsDue("lease_expires_at"));
		return await query.returningAll().executeTakeFirst() ?? null;
	}
	async createOperatorWork(input) {
		const now = this.timestampOffset(0);
		return await this.db.insertInto("_emdash_media_usage_work").columns([
			"collection_id",
			"collection_slug",
			"content_id",
			"change_epoch",
			"work_version",
			"state",
			"attempt_count",
			"next_attempt_at",
			"lease_token",
			"lease_expires_at",
			"last_attempted_at",
			"last_error_code",
			"created_at",
			"updated_at"
		]).expression((insert) => insert.selectFrom("_emdash_media_usage_index_status as status").innerJoin("_emdash_collections as collection", (join) => join.onRef("collection.id", "=", "status.collection_id").onRef("collection.slug", "=", "status.scope_key")).select((select) => [
			select.val(input.collectionId).as("collection_id"),
			"collection.slug as collection_slug",
			select.val(input.contentId).as("content_id"),
			"status.change_epoch as change_epoch",
			select.val(1).as("work_version"),
			select.val("pending").as("state"),
			select.val(0).as("attempt_count"),
			now.as("next_attempt_at"),
			sql`NULL`.as("lease_token"),
			sql`NULL`.as("lease_expires_at"),
			sql`NULL`.as("last_attempted_at"),
			sql`NULL`.as("last_error_code"),
			now.as("created_at"),
			now.as("updated_at")
		]).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", input.collectionSlug).where("status.collection_id", "=", input.collectionId).where("status.capture_state", "=", "active").where("status.change_epoch", "=", input.changeEpoch)).onConflict((conflict) => conflict.columns(["collection_id", "content_id"]).doNothing()).returningAll().executeTakeFirst() ?? null;
	}
	async operatorRetryLost(input) {
		if (!await this.findActiveOperatorCollection(input.collectionId)) return { outcome: "collection_not_found" };
		const current = await this.findWorkByIdentity(input.collectionId, input.contentId);
		if (current?.state === "pending") return {
			outcome: "pending",
			changed: false,
			work: rowToOperatorWork(current)
		};
		const liveLease = await this.findLiveLeaseExpiry(input.collectionId, input.contentId);
		if (liveLease) return {
			outcome: "lease_active",
			leaseExpiresAt: liveLease
		};
		return { outcome: "conflict" };
	}
	async findLiveLeaseExpiry(collectionId, contentId) {
		return (await this.db.selectFrom("_emdash_media_usage_work").select("lease_expires_at").where("collection_id", "=", collectionId).where("content_id", "=", contentId).where("state", "=", "leased").where("lease_expires_at", "is not", null).where(this.leaseIsLive()).executeTakeFirst())?.lease_expires_at ?? null;
	}
	async claimDueWorkBatch(input) {
		if (!Number.isSafeInteger(input.limit) || input.limit < 1 || input.limit > MAX_WORK_SELECTION_LIMIT) throw new Error(`Media usage due-work limit must be a whole number from 1 to ${MAX_WORK_SELECTION_LIMIT}`);
		const leaseDurationSeconds = durationSeconds(input.leaseDurationSeconds, "lease duration", false);
		const leaseToken = ulid();
		const now = this.timestampOffset(0);
		let candidates = this.db.selectFrom("_emdash_media_usage_work as due").select([
			"due.collection_id",
			"due.content_id",
			"due.work_version"
		]).where((eb) => eb.or([eb.and([eb("due.state", "in", ["pending", "retry"]), this.timestampIsDue("due.next_attempt_at")]), eb.and([
			eb("due.state", "=", "leased"),
			eb("due.lease_expires_at", "is not", null),
			this.timestampIsDue("due.lease_expires_at")
		])])).orderBy(sql`CASE
					WHEN due.state = 'leased' THEN due.lease_expires_at
					ELSE due.next_attempt_at
				END`, "asc").orderBy("due.updated_at", "asc").orderBy("due.collection_id", "asc").orderBy("due.content_id", "asc").limit(input.limit);
		if (isPostgres(this.db)) candidates = candidates.forUpdate().skipLocked();
		return (await this.db.with("due_media_usage_work", () => candidates).updateTable("_emdash_media_usage_work").set({
			state: "leased",
			lease_token: leaseToken,
			lease_expires_at: this.timestampOffset(leaseDurationSeconds),
			last_attempted_at: now,
			updated_at: now
		}).where((eb) => eb.and([eb.exists(eb.selectFrom("due_media_usage_work as due").select("due.content_id").whereRef("due.collection_id", "=", "_emdash_media_usage_work.collection_id").whereRef("due.content_id", "=", "_emdash_media_usage_work.content_id").whereRef("due.work_version", "=", "_emdash_media_usage_work.work_version")), eb.or([eb.and([eb("state", "in", ["pending", "retry"]), this.timestampIsDue("next_attempt_at")]), eb.and([
			eb("state", "=", "leased"),
			eb("lease_expires_at", "is not", null),
			this.timestampIsDue("lease_expires_at")
		])])])).returningAll().execute()).map(rowToWork);
	}
	async hasNonterminalWork() {
		return await this.db.selectFrom("_emdash_media_usage_work").select("content_id").where("state", "in", [
			"pending",
			"retry",
			"leased"
		]).limit(1).executeTakeFirst() !== void 0;
	}
	async findWorkForContent(collectionSlug, contentId) {
		if (!collectionSlug || !contentId) throw new Error("Media usage work lookup requires collection and content identity");
		const row = await this.db.selectFrom("_emdash_media_usage_work").innerJoin("_emdash_collections as current_collection", (join) => join.onRef("current_collection.id", "=", "_emdash_media_usage_work.collection_id").onRef("current_collection.slug", "=", "_emdash_media_usage_work.collection_slug")).selectAll("_emdash_media_usage_work").where("_emdash_media_usage_work.collection_slug", "=", collectionSlug).where("_emdash_media_usage_work.content_id", "=", contentId).executeTakeFirst();
		return row ? rowToWork(row) : null;
	}
	async claimWork(input) {
		assertIdentity(input);
		const leaseDurationSeconds = durationSeconds(input.leaseDurationSeconds, "lease duration", false);
		const leaseToken = ulid();
		const now = this.timestampOffset(0);
		const row = await this.db.updateTable("_emdash_media_usage_work").set({
			state: "leased",
			lease_token: leaseToken,
			lease_expires_at: this.timestampOffset(leaseDurationSeconds),
			last_attempted_at: now,
			updated_at: now
		}).where("collection_id", "=", input.collectionId).where("content_id", "=", input.contentId).where("work_version", "=", input.workVersion).where((eb) => eb.or([eb.and([eb("state", "in", ["pending", "retry"]), this.timestampIsDue("next_attempt_at")]), eb.and([
			eb("state", "=", "leased"),
			eb("lease_expires_at", "is not", null),
			this.timestampIsDue("lease_expires_at")
		])])).returningAll().executeTakeFirst();
		return row ? rowToWork(row) : null;
	}
	async completeWorkBatch(inputs) {
		const unique = [...new Map(inputs.map((input) => {
			assertLease(input);
			return [workIdentityKey(input), input];
		})).values()];
		const completed = /* @__PURE__ */ new Set();
		if (unique.length === 0) return completed;
		const payload = JSON.stringify(unique.map((input) => ({
			collection_id: input.collectionId,
			content_id: input.contentId,
			work_version: String(input.workVersion),
			lease_token: input.leaseToken
		})));
		const result = await sql`
			WITH claimed AS (${this.claimedWorkBatchInput(payload)})
			DELETE FROM _emdash_media_usage_work AS work
			WHERE work.state = 'leased'
				AND ${this.qualifiedLeaseIsLive("work.lease_expires_at")}
				AND EXISTS (
					SELECT 1
					FROM claimed
					WHERE claimed.collection_id = work.collection_id
						AND claimed.content_id = work.content_id
						AND claimed.work_version = work.work_version
						AND claimed.lease_token = work.lease_token
				)
			RETURNING collection_id, content_id, work_version
		`.execute(this.db);
		for (const row of result.rows) completed.add(workIdentityKey({
			collectionId: row.collection_id,
			contentId: row.content_id,
			workVersion: row.work_version
		}));
		return completed;
	}
	async lockClaimedWorkBatch(inputs) {
		const unique = [...new Map(inputs.map((input) => {
			assertLease(input);
			return [workIdentityKey(input), input];
		})).values()].toSorted((left, right) => workIdentityKey(left).localeCompare(workIdentityKey(right)));
		if (!isPostgres(this.db)) return new Set(unique.map(workIdentityKey));
		if (unique.length === 0) return /* @__PURE__ */ new Set();
		const payload = JSON.stringify(unique.map((input) => ({
			collection_id: input.collectionId,
			content_id: input.contentId,
			work_version: String(input.workVersion),
			lease_token: input.leaseToken
		})));
		const result = await sql`
			WITH claimed AS (${this.claimedWorkBatchInput(payload)})
			SELECT work.collection_id, work.content_id, work.work_version
			FROM _emdash_media_usage_work AS work
			INNER JOIN claimed
				ON claimed.collection_id = work.collection_id
				AND claimed.content_id = work.content_id
				AND claimed.work_version = work.work_version
				AND claimed.lease_token = work.lease_token
			WHERE work.state = 'leased'
				AND ${this.qualifiedLeaseIsLive("work.lease_expires_at")}
			ORDER BY work.collection_id, work.content_id
			FOR UPDATE
		`.execute(this.db);
		return new Set(result.rows.map((row) => workIdentityKey({
			collectionId: row.collection_id,
			contentId: row.content_id,
			workVersion: row.work_version
		})));
	}
	async retryClaimedWorkBatch(input) {
		assertErrorCode(input.errorCode);
		const retryDelaySeconds = durationSeconds(input.retryDelaySeconds, "retry delay", true);
		if (!Number.isSafeInteger(input.maxAttempts) || input.maxAttempts < 1) throw new Error("Media usage work max attempts must be a positive whole number");
		const unique = [...new Map(input.work.map((work) => {
			assertLease(work);
			return [workIdentityKey(work), work];
		})).values()];
		const transitioned = /* @__PURE__ */ new Map();
		if (unique.length === 0) return transitioned;
		const payload = JSON.stringify(unique.map((work) => ({
			collection_id: work.collectionId,
			content_id: work.contentId,
			work_version: String(work.workVersion),
			lease_token: work.leaseToken
		})));
		const result = await sql`
			WITH claimed AS (${this.claimedWorkBatchInput(payload)})
			UPDATE _emdash_media_usage_work AS work
			SET state = CASE WHEN work.attempt_count + 1 >= ${input.maxAttempts} THEN 'failed' ELSE 'retry' END,
				attempt_count = work.attempt_count + 1,
				next_attempt_at = ${this.timestampOffset(retryDelaySeconds)},
				lease_token = NULL,
				lease_expires_at = NULL,
				last_error_code = ${input.errorCode},
				updated_at = ${this.timestampOffset(0)}
			WHERE work.state = 'leased'
				AND ${this.qualifiedLeaseIsLive("work.lease_expires_at")}
				AND EXISTS (
					SELECT 1
					FROM claimed
					WHERE claimed.collection_id = work.collection_id
						AND claimed.content_id = work.content_id
						AND claimed.work_version = work.work_version
						AND claimed.lease_token = work.lease_token
				)
			RETURNING collection_id, content_id, work_version, state
		`.execute(this.db);
		for (const row of result.rows) transitioned.set(workIdentityKey({
			collectionId: row.collection_id,
			contentId: row.content_id,
			workVersion: row.work_version
		}), row.state);
		return transitioned;
	}
	async releaseClaimedWorkBatch(inputs) {
		const unique = [...new Map(inputs.map((input) => {
			assertLease(input);
			return [workIdentityKey(input), input];
		})).values()];
		const released = /* @__PURE__ */ new Set();
		if (unique.length === 0) return released;
		const payload = JSON.stringify(unique.map((input) => ({
			collection_id: input.collectionId,
			content_id: input.contentId,
			work_version: String(input.workVersion),
			lease_token: input.leaseToken
		})));
		const result = await sql`
			WITH claimed AS (${this.claimedWorkBatchInput(payload)})
			UPDATE _emdash_media_usage_work AS work
			SET state = 'pending',
				next_attempt_at = ${this.timestampOffset(0)},
				lease_token = NULL,
				lease_expires_at = NULL,
				updated_at = ${this.timestampOffset(0)}
			WHERE work.state = 'leased'
				AND ${this.qualifiedLeaseIsLive("work.lease_expires_at")}
				AND EXISTS (
					SELECT 1
					FROM claimed
					WHERE claimed.collection_id = work.collection_id
						AND claimed.content_id = work.content_id
						AND claimed.work_version = work.work_version
						AND claimed.lease_token = work.lease_token
				)
			RETURNING collection_id, content_id, work_version
		`.execute(this.db);
		for (const row of result.rows) released.add(workIdentityKey({
			collectionId: row.collection_id,
			contentId: row.content_id,
			workVersion: row.work_version
		}));
		return released;
	}
	async deleteWorkThroughEpoch(collectionId, maxChangeEpoch) {
		if (!collectionId) throw new Error("Media usage work cleanup requires a collection ID");
		assertNonNegativeDecimal(maxChangeEpoch, "change epoch");
		const result = await this.db.deleteFrom("_emdash_media_usage_work").where("collection_id", "=", collectionId).where("change_epoch", "<=", maxChangeEpoch).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async deleteObsoleteReconciliationWork(input) {
		assertNonNegativeDecimal(input.targetEpoch, "target epoch");
		const result = await this.db.deleteFrom("_emdash_media_usage_work as work").where("work.collection_id", "=", input.collectionId).where("work.change_epoch", "<", input.targetEpoch).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_reconciliations as reconciliation").innerJoin("_emdash_media_usage_index_status as status", (join) => join.onRef("status.collection_id", "=", "reconciliation.collection_id").onRef("status.scope_key", "=", "reconciliation.collection_slug")).innerJoin("_emdash_collections as collection", (join) => join.onRef("collection.id", "=", "reconciliation.collection_id").onRef("collection.slug", "=", "reconciliation.collection_slug")).select("reconciliation.collection_id").where("reconciliation.collection_id", "=", input.collectionId).where("reconciliation.collection_slug", "=", input.collectionSlug).where("reconciliation.run_token", "=", input.runToken).where("reconciliation.target_epoch", "=", input.targetEpoch).where("reconciliation.state", "=", "leased").where("reconciliation.lease_token", "=", input.leaseToken).where(this.qualifiedLeaseIsLive("reconciliation.lease_expires_at")).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1).where("status.status", "=", "running").where("status.cursor", "=", input.runToken).where("status.change_epoch", "=", input.targetEpoch))).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	leaseIsLive() {
		return isPostgres(this.db) ? sql`lease_expires_at::timestamptz > clock_timestamp()` : sql`lease_expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	qualifiedLeaseIsLive(column) {
		const expiry = sql.ref(column);
		return isPostgres(this.db) ? sql`${expiry} > to_char(statement_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')` : sql`${expiry} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	timestampIsDue(column) {
		return isPostgres(this.db) ? sql`${sql.ref(column)} <= to_char(
				statement_timestamp() AT TIME ZONE 'UTC',
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	timestampOffset(offsetSeconds) {
		if (isPostgres(this.db)) return sql`to_char(
				(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)`;
		return sql`strftime(
			'%Y-%m-%dT%H:%M:%fZ',
			'now',
			${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
		)`;
	}
	claimedWorkBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'collection_id' AS collection_id,
					entry.value ->> 'content_id' AS content_id,
					CAST(entry.value ->> 'work_version' AS bigint) AS work_version,
					entry.value ->> 'lease_token' AS lease_token
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.collection_id') AS collection_id,
				json_extract(entry.value, '$.content_id') AS content_id,
				CAST(json_extract(entry.value, '$.work_version') AS integer) AS work_version,
				json_extract(entry.value, '$.lease_token') AS lease_token
			FROM json_each(${payload}) AS entry
		`;
	}
};
function workIdentityKey(input) {
	return `${input.collectionId}\u0000${input.contentId}\u0000${String(input.workVersion)}`;
}
function operatorLimit(value) {
	if (value === void 0) return MEDIA_USAGE_WORK_OPERATOR_DEFAULT_LIMIT;
	if (!Number.isSafeInteger(value) || value < 1 || value > MEDIA_USAGE_WORK_OPERATOR_MAX_LIMIT) throw new Error(`Media usage operator limit must be a whole number from 1 to ${MEDIA_USAGE_WORK_OPERATOR_MAX_LIMIT}`);
	return value;
}
function durationSeconds(value, label, allowZero) {
	if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1) || value > MAX_PORTABLE_DURATION_SECONDS) throw new Error(`Media usage work ${label} must be ${allowZero ? "a non-negative" : "a positive"} whole number of seconds no greater than one year`);
	return value;
}
function assertIdentity(input) {
	if (!input.collectionId || !input.contentId) throw new Error("Media usage work identity must include collection and content IDs");
	if (!(typeof input.workVersion === "number" && Number.isSafeInteger(input.workVersion) && input.workVersion > 0 || typeof input.workVersion === "string" && POSITIVE_DECIMAL_PATTERN.test(input.workVersion))) throw new Error("Media usage work identity must include a work version");
}
function assertNonNegativeDecimal(value, label) {
	if (!(typeof value === "number" && Number.isSafeInteger(value) && value >= 0 || typeof value === "string" && NON_NEGATIVE_DECIMAL_PATTERN.test(value))) throw new Error(`Media usage work ${label} must be a non-negative whole number`);
}
function assertToken(value) {
	if (!value) throw new Error("Media usage work lease token must not be empty");
}
function assertLease(input) {
	assertIdentity(input);
	assertToken(input.leaseToken);
}
function assertErrorCode(value) {
	if (!STABLE_ERROR_CODE_PATTERN.test(value)) throw new Error("Media usage work error code must use a stable SCREAMING_SNAKE_CASE value");
}
function rowToWork(row) {
	if (!isMediaUsageWorkState(row.state)) throw new Error(`Invalid media usage work state: ${row.state}`);
	return {
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		contentId: row.content_id,
		changeEpoch: row.change_epoch,
		workVersion: row.work_version,
		state: row.state,
		attemptCount: row.attempt_count,
		nextAttemptAt: row.next_attempt_at,
		leaseToken: row.lease_token,
		leaseExpiresAt: row.lease_expires_at,
		lastAttemptedAt: row.last_attempted_at,
		lastErrorCode: row.last_error_code,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOperatorWork(row) {
	const work = "collection_id" in row ? rowToWork(row) : row;
	return {
		collectionId: work.collectionId,
		collectionSlug: work.collectionSlug,
		contentId: work.contentId,
		state: work.state,
		attemptCount: work.attemptCount,
		nextAttemptAt: work.nextAttemptAt,
		leaseExpiresAt: work.leaseExpiresAt,
		lastAttemptedAt: work.lastAttemptedAt,
		lastErrorCode: work.lastErrorCode,
		updatedAt: work.updatedAt
	};
}
function isMediaUsageWorkState(value) {
	return value === "pending" || value === "retry" || value === "leased" || value === "failed";
}
function compareOperatorWork(a, b) {
	const updated = b.updatedAt.localeCompare(a.updatedAt);
	return updated !== 0 ? updated : b.contentId.localeCompare(a.contentId);
}
export { deleteSharedCollectionRecords as a, deleteActivatedMediaUsageCollection as i, MediaUsageWorkRepository as n, isMediaUsageCollectionSlugDeleting as o, collectionDeletionCurrentTimestamp as r, MediaUsageCollectionDeletionRepository as t };
