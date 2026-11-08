import { b as tableExists, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { n as verifyMediaUsageCaptureTriggers, t as installMediaUsageCaptureTriggers } from "./capture-triggers-BezAvWcB_DojFQM3C.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/activation-CGlyigmg.mjs
var ACTIVATION_KEY = "incremental_capture";
var ACTIVATION_ERROR_CODE = "MEDIA_USAGE_ACTIVATION_FAILED";
var MediaUsageActivationVersionMismatchError = class extends Error {};
var MEDIA_USAGE_ACTIVATION_LIMITS = Object.freeze({
	collectionsPerCall: 1,
	leaseDurationSeconds: 300
});
async function getMediaUsageActivationStatus(db) {
	const activation = await db.selectFrom("_emdash_media_usage_activation").select([
		"state",
		"runtime_generation",
		"collection_cursor",
		"drain_confirmed_at",
		"lease_expires_at",
		"attempt_count",
		"last_attempted_at",
		"last_error_code",
		"activated_at",
		"updated_at"
	]).where("task_key", "=", ACTIVATION_KEY).executeTakeFirstOrThrow();
	assertRuntimeGeneration(activation);
	if (activation.state !== "expanded" && activation.state !== "activating" && activation.state !== "active") throw new Error("Invalid media usage activation state");
	if (!Number.isInteger(activation.attempt_count) || activation.attempt_count < 0) throw new Error("Invalid media usage activation attempt count");
	return {
		state: activation.state,
		collectionCursor: activation.collection_cursor,
		attemptCount: activation.attempt_count,
		drainConfirmedAt: activation.drain_confirmed_at,
		lastAttemptedAt: activation.last_attempted_at,
		lastErrorCode: activation.last_error_code === null ? null : ACTIVATION_ERROR_CODE,
		leaseExpiresAt: activation.lease_expires_at,
		activatedAt: activation.activated_at,
		updatedAt: activation.updated_at
	};
}
async function canResumeMediaUsageCollectionCapture(db, identity) {
	return await findResumableMediaUsageCollectionCaptureId(db, identity) === identity.collectionId;
}
async function findResumableMediaUsageCollectionCaptureId(db, identity) {
	const activation = await findActivationIfAvailable(db);
	if (!activation) return null;
	assertRuntimeGeneration(activation);
	if (activation.state !== "active") return null;
	const lifecycle = await db.selectFrom("_emdash_media_usage_index_status").select(["collection_id", "cursor"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("capture_state", "in", ["installing", "ready"]).executeTakeFirst();
	if (!lifecycle?.collection_id) return null;
	if (identity.creationFingerprint ? lifecycle.cursor !== identity.creationFingerprint : lifecycle.cursor !== null) return null;
	return lifecycle.collection_id;
}
async function prepareMediaUsageCollectionCapture(db, input) {
	const activation = await findActivationIfAvailable(db);
	if (!activation) return {
		captureRequired: false,
		collectionId: input.collectionId,
		registrationExists: input.registeredCollectionId !== void 0,
		resuming: false
	};
	assertRuntimeGeneration(activation);
	if (activation.state !== "active") return {
		captureRequired: false,
		collectionId: input.collectionId,
		registrationExists: input.registeredCollectionId !== void 0,
		resuming: false
	};
	const existing = await db.selectFrom("_emdash_media_usage_index_status").select([
		"collection_id",
		"capture_state",
		"cursor"
	]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).executeTakeFirst();
	if (existing) {
		if (existing.collection_id && (existing.capture_state === "installing" || existing.capture_state === "ready") && (input.creationFingerprint ? existing.cursor === input.creationFingerprint : existing.cursor === null) && (input.registeredCollectionId === void 0 || input.registeredCollectionId === existing.collection_id)) return {
			captureRequired: true,
			collectionId: existing.collection_id,
			registrationExists: input.registeredCollectionId !== void 0,
			resuming: true
		};
		throw new Error("Media usage collection lifecycle identity conflict");
	}
	if (input.registeredCollectionId !== void 0) throw new Error("Media usage collection lifecycle is missing");
	await db.insertInto("_emdash_media_usage_index_status").values({
		adapter_id: "content-media",
		scope_type: "collection",
		scope_key: input.collectionSlug,
		status: "never",
		collection_id: input.collectionId,
		reconciliation_required: 1,
		capture_state: "installing",
		cursor: input.creationFingerprint ?? null,
		updated_at: timestampOffset(db, 0)
	}).execute();
	return {
		captureRequired: true,
		collectionId: input.collectionId,
		registrationExists: false,
		resuming: false
	};
}
async function installPreparedMediaUsageCollectionCapture(db, identity) {
	await installMediaUsageCaptureTriggers(db, identity, { replaceExisting: false });
	if (!await verifyMediaUsageCaptureTriggers(db, identity)) throw new Error("Media usage capture trigger verification failed");
}
async function markMediaUsageCollectionCaptureReady(db, identity) {
	const result = await db.updateTable("_emdash_media_usage_index_status").set({
		capture_state: "ready",
		updated_at: timestampOffset(db, 0)
	}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).where("capture_state", "in", ["installing", "ready"]).where(sql`EXISTS (
				SELECT 1 FROM _emdash_media_usage_activation AS activation
				WHERE activation.task_key = ${ACTIVATION_KEY}
					AND activation.state = 'active'
					AND activation.runtime_generation = ${1}
			)`).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) === 0) throw new Error("Media usage collection readiness lost its fence");
}
async function finalizeMediaUsageCollectionCapture(db, identity) {
	const result = await db.updateTable("_emdash_media_usage_index_status").set({
		capture_state: "active",
		cursor: null,
		updated_at: timestampOffset(db, 0)
	}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).where("capture_state", "=", "ready").where(sql`EXISTS (
				SELECT 1 FROM _emdash_collections AS collection
				WHERE collection.id = ${identity.collectionId}
					AND collection.slug = ${identity.collectionSlug}
			)`).where(sql`EXISTS (
				SELECT 1 FROM _emdash_media_usage_activation AS activation
				WHERE activation.task_key = ${ACTIVATION_KEY}
					AND activation.state = 'active'
					AND activation.runtime_generation = ${1}
			)`).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) === 0) throw new Error("Media usage collection activation lost its fence");
}
async function activateMediaUsageCapture(db, input) {
	if (input.writersDrained !== true) throw new Error("Media usage activation requires confirmation that writers are drained");
	return advanceMediaUsageActivation(db, "confirmed");
}
async function continueMediaUsageActivation(db) {
	return advanceMediaUsageActivation(db, "background");
}
async function advanceMediaUsageActivation(db, mode) {
	const before = await findActivation(db);
	assertRuntimeGeneration(before);
	if (before.state === "active") return {
		outcome: "active",
		processedCollections: 0
	};
	if (mode === "background") {
		if (before.state === "expanded" || before.drain_confirmed_at === null) return { outcome: "inactive" };
		if (before.state !== "activating") throw new Error("Invalid media usage activation state");
		if (before.last_error_code !== null) return { outcome: "failed" };
	}
	const leaseToken = ulid();
	const lease = await claimActivation(db, leaseToken, mode);
	if (!lease) return activationClaimLoss(db, mode);
	let processedCollections = 0;
	try {
		const candidates = await findActivationCandidates(db, lease.collection_cursor);
		for (const collection of candidates.slice(0, MEDIA_USAGE_ACTIVATION_LIMITS.collectionsPerCall)) {
			await requireActivationLease(db, leaseToken);
			await prepareCollectionForActivation(db, collection, leaseToken);
			await requireActivationLease(db, leaseToken);
			await installMediaUsageCaptureTriggers(db, {
				collectionId: collection.id,
				collectionSlug: collection.slug
			}, { replaceExisting: false });
			await requireActivationLease(db, leaseToken);
			if (!await verifyMediaUsageCaptureTriggers(db, {
				collectionId: collection.id,
				collectionSlug: collection.slug
			})) throw new Error("Media usage capture trigger verification failed");
			if (!await activateCollectionLifecycle(db, collection, leaseToken)) throw new Error("Media usage collection activation lost its fence");
			processedCollections++;
		}
		const collectionCursor = candidates[Math.min(processedCollections, candidates.length) - 1]?.slug ?? lease.collection_cursor;
		if (candidates.length > MEDIA_USAGE_ACTIVATION_LIMITS.collectionsPerCall) {
			if (!await releaseActivationBatch(db, leaseToken, collectionCursor)) throw new Error("Media usage activation cursor lost its fence");
			return {
				outcome: "activating",
				processedCollections,
				collectionCursor
			};
		}
		if (await findIncompleteCollection(db)) {
			if (!await releaseActivationBatch(db, leaseToken, null)) throw new Error("Media usage activation restart lost its fence");
			return {
				outcome: "activating",
				processedCollections,
				collectionCursor: null
			};
		}
		if (!await finalizeActivation(db, leaseToken, collectionCursor)) throw new Error("Media usage activation finalization lost its fence");
		return {
			outcome: "active",
			processedCollections
		};
	} catch (error) {
		if (!await activationLeaseIsLive(db, leaseToken)) return {
			outcome: "conflict",
			processedCollections
		};
		await recordActivationFailure(db, leaseToken);
		throw new Error("Media usage activation failed", { cause: error });
	}
}
async function findActivation(db) {
	return db.selectFrom("_emdash_media_usage_activation").selectAll().where("task_key", "=", ACTIVATION_KEY).executeTakeFirstOrThrow();
}
async function findActivationIfAvailable(db) {
	if (!await tableExists(db, "_emdash_media_usage_activation")) return null;
	return findActivation(db);
}
function assertRuntimeGeneration(activation) {
	if (activation.runtime_generation !== 1) throw new MediaUsageActivationVersionMismatchError("Media usage activation runtime generation mismatch");
}
async function claimActivation(db, leaseToken, mode) {
	const now = timestampOffset(db, 0);
	const claimValues = {
		lease_token: leaseToken,
		lease_expires_at: timestampOffset(db, MEDIA_USAGE_ACTIVATION_LIMITS.leaseDurationSeconds),
		attempt_count: sql`attempt_count + 1`,
		last_attempted_at: now,
		updated_at: now
	};
	let claim = db.updateTable("_emdash_media_usage_activation").set(mode === "confirmed" ? {
		...claimValues,
		state: "activating",
		drain_confirmed_at: now,
		last_error_code: null
	} : claimValues).where("task_key", "=", ACTIVATION_KEY).where("runtime_generation", "=", 1);
	if (mode === "confirmed") claim = claim.where((eb) => eb.or([eb("state", "=", "expanded"), eb.and([eb("state", "=", "activating"), eb.or([eb("lease_token", "is", null), eb.and([eb("lease_expires_at", "is not", null), timestampIsDue(db, "lease_expires_at")])])])]));
	else claim = claim.where("state", "=", "activating").where("drain_confirmed_at", "is not", null).where("last_error_code", "is", null).where((eb) => eb.or([eb("lease_token", "is", null), eb.and([eb("lease_expires_at", "is not", null), timestampIsDue(db, "lease_expires_at")])]));
	return await claim.returningAll().executeTakeFirst() ?? null;
}
async function activationClaimLoss(db, mode) {
	const current = await findActivation(db);
	assertRuntimeGeneration(current);
	if (current.state === "active") return {
		outcome: "active",
		processedCollections: 0
	};
	if (mode === "background") {
		if (current.state === "expanded" || current.drain_confirmed_at === null) return { outcome: "inactive" };
		if (current.state === "activating" && current.last_error_code !== null) return { outcome: "failed" };
	}
	if (current.state === "activating" && current.lease_token && current.lease_expires_at && await activationLeaseIsLive(db, current.lease_token)) return {
		outcome: "lease_active",
		leaseExpiresAt: current.lease_expires_at
	};
	if (mode === "background" && current.state === "activating") return {
		outcome: "conflict",
		processedCollections: 0
	};
	throw new Error("Media usage activation state is not claimable");
}
async function activationLeaseIsLive(db, leaseToken) {
	return await db.selectFrom("_emdash_media_usage_activation").select("task_key").where("task_key", "=", ACTIVATION_KEY).where("state", "=", "activating").where("runtime_generation", "=", 1).where("lease_token", "=", leaseToken).where("lease_expires_at", "is not", null).where(timestampIsLive(db, "lease_expires_at")).executeTakeFirst() !== void 0;
}
async function findActivationCandidates(db, collectionCursor) {
	let query = db.selectFrom("_emdash_collections").select(["id", "slug"]);
	if (collectionCursor) query = query.where("slug", ">", collectionCursor);
	return query.orderBy("slug", "asc").limit(MEDIA_USAGE_ACTIVATION_LIMITS.collectionsPerCall + 1).execute();
}
async function prepareCollectionForActivation(db, collection, leaseToken) {
	const now = timestampOffset(db, 0);
	const existingStatus = sql.ref("_emdash_media_usage_index_status.status");
	const existingCompletedAt = sql.ref("_emdash_media_usage_index_status.completed_at");
	const existingCollectionId = sql.ref("_emdash_media_usage_index_status.collection_id");
	const existingCaptureState = sql.ref("_emdash_media_usage_index_status.capture_state");
	if ((await db.insertInto("_emdash_media_usage_index_status").values({
		adapter_id: "content-media",
		scope_type: "collection",
		scope_key: collection.slug,
		status: "never",
		collection_id: collection.id,
		reconciliation_required: 1,
		capture_state: "installing",
		updated_at: now
	}).onConflict((conflict) => conflict.columns([
		"adapter_id",
		"scope_type",
		"scope_key"
	]).doUpdateSet({
		status: sql`CASE WHEN ${existingStatus} IN ('complete', 'running') THEN 'stale' ELSE ${existingStatus} END`,
		completed_at: sql`CASE WHEN ${existingStatus} IN ('complete', 'running') THEN NULL ELSE ${existingCompletedAt} END`,
		cursor: null,
		collection_id: collection.id,
		reconciliation_required: 1,
		capture_state: "installing",
		updated_at: now
	}).where((eb) => eb.and([
		eb.or([eb(existingCollectionId, "is", null), eb(existingCollectionId, "=", collection.id)]),
		eb.or([eb(existingCaptureState, "is", null), eb(existingCaptureState, "!=", "deleting")]),
		activeActivationLease(db, leaseToken)
	]))).returning("collection_id").executeTakeFirst())?.collection_id !== collection.id) throw new Error("Media usage collection lifecycle identity conflict");
}
async function requireActivationLease(db, leaseToken) {
	if (!await activationLeaseIsLive(db, leaseToken)) throw new Error("Media usage activation lease is no longer live");
}
async function activateCollectionLifecycle(db, collection, leaseToken) {
	const result = await db.updateTable("_emdash_media_usage_index_status").set({
		capture_state: "active",
		updated_at: timestampOffset(db, 0)
	}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", collection.slug).where("collection_id", "=", collection.id).where("capture_state", "=", "installing").where(sql`EXISTS (
				SELECT 1 FROM _emdash_collections AS collection
				WHERE collection.id = ${collection.id}
					AND collection.slug = ${collection.slug}
			)`).where(activeActivationLease(db, leaseToken)).executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0) > 0;
}
async function releaseActivationBatch(db, leaseToken, collectionCursor) {
	const result = await db.updateTable("_emdash_media_usage_activation").set({
		collection_cursor: collectionCursor,
		lease_token: null,
		lease_expires_at: null,
		updated_at: timestampOffset(db, 0)
	}).where("task_key", "=", ACTIVATION_KEY).where("state", "=", "activating").where("runtime_generation", "=", 1).where("lease_token", "=", leaseToken).where("lease_expires_at", "is not", null).where(timestampIsLive(db, "lease_expires_at")).executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0) > 0;
}
async function findIncompleteCollection(db) {
	return await db.selectFrom("_emdash_collections as collection").select(["collection.id", "collection.slug"]).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_index_status as status").select("status.scope_key").where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").whereRef("status.scope_key", "=", "collection.slug").whereRef("status.collection_id", "=", "collection.id").where("status.capture_state", "=", "active")))).orderBy("collection.slug", "asc").limit(1).executeTakeFirst() ?? null;
}
async function finalizeActivation(db, leaseToken, collectionCursor) {
	const now = timestampOffset(db, 0);
	const result = await db.updateTable("_emdash_media_usage_activation").set({
		state: "active",
		collection_cursor: collectionCursor,
		lease_token: null,
		lease_expires_at: null,
		last_error_code: null,
		activated_at: now,
		updated_at: now
	}).where("task_key", "=", ACTIVATION_KEY).where("state", "=", "activating").where("runtime_generation", "=", 1).where("lease_token", "=", leaseToken).where("lease_expires_at", "is not", null).where(timestampIsLive(db, "lease_expires_at")).where(sql`NOT EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				WHERE NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_index_status AS status
					WHERE status.adapter_id = 'content-media'
						AND status.scope_type = 'collection'
						AND status.scope_key = collection.slug
						AND status.collection_id = collection.id
						AND status.capture_state = 'active'
				)
			)`).executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0) > 0;
}
async function recordActivationFailure(db, leaseToken) {
	await db.updateTable("_emdash_media_usage_activation").set({
		lease_token: null,
		lease_expires_at: null,
		last_error_code: ACTIVATION_ERROR_CODE,
		updated_at: timestampOffset(db, 0)
	}).where("task_key", "=", ACTIVATION_KEY).where("state", "=", "activating").where("runtime_generation", "=", 1).where("lease_token", "=", leaseToken).execute();
}
function activeActivationLease(db, leaseToken) {
	return sql`EXISTS (
		SELECT 1
		FROM _emdash_media_usage_activation AS activation
		WHERE activation.task_key = ${ACTIVATION_KEY}
			AND activation.state = 'activating'
			AND activation.runtime_generation = ${1}
			AND activation.lease_token = ${leaseToken}
			AND activation.lease_expires_at IS NOT NULL
			AND ${timestampIsLive(db, "activation.lease_expires_at")}
	)`;
}
function timestampIsDue(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)}::timestamptz <= clock_timestamp()` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampIsLive(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)}::timestamptz > clock_timestamp()` : sql`${sql.ref(column)} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampOffset(db, seconds) {
	if (isPostgres(db)) return sql`to_char(
			clock_timestamp() AT TIME ZONE 'UTC' + (${seconds} * interval '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ${`+${seconds} seconds`})`;
}
export { finalizeMediaUsageCollectionCapture as a, installPreparedMediaUsageCollectionCapture as c, continueMediaUsageActivation as i, markMediaUsageCollectionCaptureReady as l, activateMediaUsageCapture as n, findResumableMediaUsageCollectionCaptureId as o, canResumeMediaUsageCollectionCapture as r, getMediaUsageActivationStatus as s, MediaUsageActivationVersionMismatchError as t, prepareMediaUsageCollectionCapture as u };
