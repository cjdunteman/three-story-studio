import { i as transferErrorDetailSchema, r as isTransferError, t as TransferError } from "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as TRANSFER_LIMITS } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { a as isSha256Digest, i as createSha256, l as receiptDigest, r as createHashingStream } from "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import { r as bumpRunningExportWriteEpochs } from "./fence-Dagicj14_KC___fhN.mjs";
import { h as portableIdSchema } from "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import { _ as timestampNow, b as transferProgressSchema, c as TERMINAL_IMPORT_STATES, f as isTransferOperationKind, g as timestampIsOlderThan, h as timestampIsLive, m as timestampIsDue, n as EXECUTING_IMPORT_STATES, o as PRE_EXECUTION_IMPORT_STATES, p as isTransferOperationState, v as timestampOffset, y as transferCursorSchema } from "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import { n as stagingAuxKey, r as stagingKey } from "./keys-CifIkT0N_Cq2A0wmZ.mjs";
import { sql } from "kysely";
import { z } from "zod";
import { ulid } from "ulidx";
// node_modules/emdash/dist/receipt-BUsQCOeM.mjs
/**
* Import receipts. A receipt exists only for a verified import; its
* `receiptDigest` is the digest of the receipt without that property
* (see `format/digest.ts`), so anyone holding the JSON can check it.
*/
var digest = z.custom(isSha256Digest, "Expected a sha256: digest");
var siteImportReceiptSchema = z.strictObject({
	operationId: portableIdSchema,
	packageDigest: digest,
	planDigest: digest,
	targetSiteId: portableIdSchema,
	originSiteId: portableIdSchema,
	formatVersion: z.literal("1"),
	importerEmDashVersion: z.string().min(1).max(128),
	completedAt: z.string().min(1).max(64),
	logicalDigest: digest,
	counts: z.record(z.string().max(64), z.number().int().nonnegative()),
	warnings: z.array(z.strictObject({
		code: z.string().max(64),
		message: z.string().max(1024)
	})).max(500),
	verification: z.literal("verified"),
	receiptDigest: digest
});
async function sealReceipt(receipt) {
	return {
		...receipt,
		receiptDigest: await receiptDigest(receipt)
	};
}
// node_modules/emdash/dist/stage-CZQnXM_G.mjs
/**
* Transfer operation rows: creation, lease claims, and lease-fenced state
* writes.
*
* Every step of a running operation happens under a lease: `claim` is one
* `UPDATE … WHERE lease is free … RETURNING` statement that installs a fresh
* ULID lease token, and every later write is fenced on that token and on the
* lease still being live. A caller that loses its lease (expiry, another
* caller took over) gets `TRANSFER_LEASE_LOST` and must stop without writing.
*/
function toPublicOperation(operation) {
	const { stagingSecret: _secret, leaseToken: _lease, ...rest } = operation;
	return rest;
}
var MAX_IDEMPOTENCY_KEY_LENGTH = 255;
function parseJson(value) {
	if (value === null) return null;
	return JSON.parse(value);
}
function toOperation(row) {
	const { kind, state } = row;
	if (!isTransferOperationKind(kind) || !isTransferOperationState(state)) throw new TransferError("TRANSFER_INVALID_STATE", "Unknown transfer operation kind or state");
	const cursor = parseJson(row.cursor);
	const progress = parseJson(row.progress);
	const receipt = parseJson(row.receipt);
	const errorDetail = parseJson(row.error_detail);
	return {
		id: row.id,
		kind,
		state,
		stage: row.stage,
		cursor: cursor === null ? null : transferCursorSchema.parse(cursor),
		progress: progress === null ? null : transferProgressSchema.parse(progress),
		options: parseJson(row.options),
		idempotencyKey: row.idempotency_key,
		packageDigest: isSha256Digest(row.package_digest) ? row.package_digest : null,
		planDigest: isSha256Digest(row.plan_digest) ? row.plan_digest : null,
		originSiteId: row.origin_site_id,
		stagingSecret: row.staging_secret,
		receipt: receipt === null ? null : siteImportReceiptSchema.parse(receipt),
		errorCode: row.error_code,
		errorDetail: errorDetail === null ? null : transferErrorDetailSchema.parse(errorDetail),
		writeEpoch: Number(row.write_epoch),
		attemptCount: Number(row.attempt_count),
		leaseToken: row.lease_token,
		leaseExpiresAt: row.lease_expires_at,
		runtimeGeneration: Number(row.runtime_generation),
		cancelRequestedAt: row.cancel_requested_at,
		mutationStartedAt: row.mutation_started_at,
		createdBy: row.created_by,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		completedAt: row.completed_at,
		expiresAt: row.expires_at,
		stagingCollectedAt: row.staging_collected_at
	};
}
function createStagingSecret() {
	const bytes = /* @__PURE__ */ new Uint8Array(16);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
var TransferOperationRepository = class {
	constructor(db) {
		this.db = db;
	}
	async get(id) {
		const row = await this.db.selectFrom("_emdash_transfer_operations").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? toOperation(row) : null;
	}
	async require(id) {
		const operation = await this.get(id);
		if (!operation) throw new TransferError("TRANSFER_OPERATION_NOT_FOUND", "Transfer operation not found");
		return operation;
	}
	/**
	* Create an operation, or return the existing one for the same
	* `(createdBy, kind, idempotencyKey)`. Throws
	* `TRANSFER_IDEMPOTENCY_CONFLICT` when that key was used with a different
	* package digest, and `TRANSFER_IMPORT_IN_PROGRESS` when another import
	* already occupies the target.
	*/
	async create(input) {
		if (input.idempotencyKey !== void 0 && (input.idempotencyKey.length === 0 || input.idempotencyKey.length > MAX_IDEMPOTENCY_KEY_LENGTH)) throw new TransferError("TRANSFER_IDEMPOTENCY_CONFLICT", "Invalid idempotency key");
		if (input.idempotencyKey !== void 0) {
			const existing = await this.findByIdempotencyKey(input);
			if (existing) return {
				operation: existing,
				created: false
			};
		}
		const id = ulid();
		const inserted = await this.db.insertInto("_emdash_transfer_operations").values({
			id,
			kind: input.kind,
			state: input.kind === "export" ? "pending" : "uploading",
			idempotency_key: input.idempotencyKey ?? null,
			package_digest: input.packageDigest ?? null,
			origin_site_id: input.originSiteId ?? null,
			options: input.options === void 0 ? null : JSON.stringify(input.options),
			staging_secret: createStagingSecret(),
			runtime_generation: 1,
			created_by: input.createdBy,
			expires_at: timestampOffset(this.db, input.ttlSeconds ?? defaultTtl(input.kind)),
			stage: null,
			cursor: null,
			progress: null,
			plan_digest: null,
			receipt: null,
			error_code: null,
			error_detail: null,
			lease_token: null,
			lease_expires_at: null,
			cancel_requested_at: null,
			mutation_started_at: null,
			completed_at: null,
			staging_collected_at: null
		}).onConflict((conflict) => conflict.doNothing()).returningAll().executeTakeFirst();
		if (inserted) return {
			operation: toOperation(inserted),
			created: true
		};
		if (input.idempotencyKey !== void 0) {
			const existing = await this.findByIdempotencyKey(input);
			if (existing) return {
				operation: existing,
				created: false
			};
		}
		throw new TransferError("TRANSFER_IMPORT_IN_PROGRESS", "Another import is already in progress on this site");
	}
	async findByIdempotencyKey(input) {
		const row = await this.db.selectFrom("_emdash_transfer_operations").selectAll().where("created_by", "=", input.createdBy).where("kind", "=", input.kind).where("idempotency_key", "=", input.idempotencyKey ?? "").executeTakeFirst();
		if (!row) return null;
		if (input.packageDigest !== void 0 && row.package_digest !== null && row.package_digest !== input.packageDigest) throw new TransferError("TRANSFER_IDEMPOTENCY_CONFLICT", "Idempotency key was already used for a different package");
		return toOperation(row);
	}
	/** The import that currently occupies the target, if any. */
	async findOccupyingImport() {
		const row = await this.db.selectFrom("_emdash_transfer_operations").selectAll().where("kind", "=", "import").where((eb) => eb.or([eb("state", "in", [...PRE_EXECUTION_IMPORT_STATES, ...EXECUTING_IMPORT_STATES]), eb.and([eb("state", "in", ["failed", "cancelled"]), eb("mutation_started_at", "is not", null)])])).executeTakeFirst();
		return row ? toOperation(row) : null;
	}
	/**
	* Take the operation's lease if it is in one of `states` and no live lease
	* exists. Throws `TRANSFER_OPERATION_NOT_FOUND`, or
	* `TRANSFER_RUNTIME_MISMATCH` when the row was written by an incompatible
	* runtime generation.
	*/
	async claim(id, states, options = {}) {
		const leaseToken = ulid();
		const now = timestampNow(this.db);
		const row = await this.db.updateTable("_emdash_transfer_operations").set({
			lease_token: leaseToken,
			lease_expires_at: timestampOffset(this.db, options.leaseSeconds ?? TRANSFER_LIMITS.leaseSeconds),
			attempt_count: sql`attempt_count + 1`,
			updated_at: now
		}).where("id", "=", id).where("state", "in", [...states]).where("runtime_generation", "=", 1).where((eb) => eb.or([
			eb("lease_token", "is", null),
			eb("lease_expires_at", "is", null),
			timestampIsDue(this.db, "lease_expires_at")
		])).returningAll().executeTakeFirst();
		if (row) return {
			outcome: "claimed",
			operation: toOperation(row),
			leaseToken
		};
		const current = await this.require(id);
		if (current.runtimeGeneration !== 1) throw new TransferError("TRANSFER_RUNTIME_MISMATCH", "Transfer operation was created by an incompatible EmDash version");
		if (!states.includes(current.state)) return {
			outcome: "invalid_state",
			operation: current
		};
		return {
			outcome: "lease_active",
			operation: current
		};
	}
	/**
	* Write state under the lease and extend it. Throws `TRANSFER_LEASE_LOST`
	* when the lease is gone.
	*/
	async advance(id, leaseToken, patch) {
		return this.fencedUpdate(id, leaseToken, {
			...this.patchValues(patch),
			lease_expires_at: timestampOffset(this.db, TRANSFER_LIMITS.leaseSeconds)
		});
	}
	/** Write state and give up the lease so the next step can claim it. */
	async release(id, leaseToken, patch = {}) {
		return this.fencedUpdate(id, leaseToken, {
			...this.patchValues(patch),
			lease_token: null,
			lease_expires_at: null
		});
	}
	/**
	* Write `patch`, move to `state`, and give up the lease; when a cancel was
	* requested while the lease was held, move to `cancelled` instead. One
	* statement decides, so a cancel racing the release is never lost.
	*/
	async releaseUnlessCancelled(id, leaseToken, state, patch = {}) {
		const now = timestampNow(this.db);
		return this.fencedUpdate(id, leaseToken, {
			...this.patchValues(patch),
			state: sql`CASE WHEN cancel_requested_at IS NULL THEN ${state} ELSE 'cancelled' END`,
			completed_at: sql`CASE WHEN cancel_requested_at IS NULL THEN completed_at ELSE ${now} END`,
			lease_token: null,
			lease_expires_at: null
		});
	}
	async complete(id, leaseToken, result = {}) {
		return this.fencedUpdate(id, leaseToken, {
			state: "complete",
			receipt: result.receipt === void 0 ? void 0 : JSON.stringify(result.receipt),
			progress: result.progress === void 0 ? void 0 : JSON.stringify(result.progress),
			completed_at: timestampNow(this.db),
			expires_at: result.ttlSeconds === void 0 ? void 0 : timestampOffset(this.db, result.ttlSeconds),
			lease_token: null,
			lease_expires_at: null
		});
	}
	async fail(id, leaseToken, error) {
		return this.fencedUpdate(id, leaseToken, {
			state: "failed",
			error_code: error.code,
			error_detail: error.detail === void 0 ? null : JSON.stringify(error.detail),
			completed_at: timestampNow(this.db),
			lease_token: null,
			lease_expires_at: null
		});
	}
	/** Finish a cancellation the lease holder observed via `cancelRequestedAt`. */
	async finishCancelled(id, leaseToken) {
		return this.fencedUpdate(id, leaseToken, {
			state: "cancelled",
			completed_at: timestampNow(this.db),
			lease_token: null,
			lease_expires_at: null
		});
	}
	/**
	* Cancel an import. Without a live lease the operation becomes `cancelled`
	* immediately; otherwise `cancel_requested_at` is set and the lease holder
	* stops after its current batch. Returns the updated operation.
	*/
	async requestCancel(id) {
		const cancellable = [...PRE_EXECUTION_IMPORT_STATES, ...EXECUTING_IMPORT_STATES];
		const now = timestampNow(this.db);
		const immediate = await this.db.updateTable("_emdash_transfer_operations").set({
			state: "cancelled",
			cancel_requested_at: now,
			completed_at: now,
			updated_at: now,
			lease_token: null,
			lease_expires_at: null
		}).where("id", "=", id).where("kind", "=", "import").where("state", "in", cancellable).where((eb) => eb.or([
			eb("lease_token", "is", null),
			eb("lease_expires_at", "is", null),
			timestampIsDue(this.db, "lease_expires_at")
		])).returningAll().executeTakeFirst();
		if (immediate) return toOperation(immediate);
		const flagged = await this.db.updateTable("_emdash_transfer_operations").set({
			cancel_requested_at: now,
			updated_at: now
		}).where("id", "=", id).where("kind", "=", "import").where("state", "in", cancellable).returningAll().executeTakeFirst();
		if (flagged) return toOperation(flagged);
		await this.require(id);
		throw new TransferError("TRANSFER_INVALID_STATE", "Transfer operation cannot be cancelled");
	}
	/**
	* Mark a failed or cancelled import abandoned. Lifts the write fence; never
	* deletes imported data.
	*/
	async abandon(id) {
		const now = timestampNow(this.db);
		const row = await this.db.updateTable("_emdash_transfer_operations").set({
			state: "abandoned",
			updated_at: now
		}).where("id", "=", id).where("kind", "=", "import").where("state", "in", ["failed", "cancelled"]).where((eb) => eb.or([
			eb("lease_token", "is", null),
			eb("lease_expires_at", "is", null),
			timestampIsDue(this.db, "lease_expires_at")
		])).returningAll().executeTakeFirst();
		if (row) return toOperation(row);
		await this.require(id);
		throw new TransferError("TRANSFER_INVALID_STATE", "Only a failed or cancelled import can be abandoned");
	}
	/**
	* Move operations past their `expires_at` to `expired` (pre-execution
	* imports and every non-expired export) when no live lease holds them.
	* Returns the expired operations so their staging can be collected.
	*/
	async expireDue(limit = 50) {
		const candidates = await this.db.selectFrom("_emdash_transfer_operations").select("id").where("expires_at", "is not", null).where(timestampIsDue(this.db, "expires_at")).where((eb) => eb.or([eb.and([
			eb("kind", "=", "import"),
			eb("state", "in", [...PRE_EXECUTION_IMPORT_STATES]),
			eb("mutation_started_at", "is", null)
		]), eb.and([eb("kind", "=", "export"), eb("state", "in", [
			"pending",
			"running",
			"complete",
			"failed"
		])])])).where((eb) => eb.or([
			eb("lease_token", "is", null),
			eb("lease_expires_at", "is", null),
			timestampIsDue(this.db, "lease_expires_at")
		])).orderBy("expires_at").limit(limit).execute();
		if (candidates.length === 0) return [];
		const now = timestampNow(this.db);
		return (await this.db.updateTable("_emdash_transfer_operations").set({
			state: "expired",
			updated_at: now,
			lease_token: null,
			lease_expires_at: null
		}).where("id", "in", candidates.map((candidate) => candidate.id)).where(timestampIsDue(this.db, "expires_at")).where((eb) => eb.or([eb.and([
			eb("kind", "=", "import"),
			eb("state", "in", [...PRE_EXECUTION_IMPORT_STATES]),
			eb("mutation_started_at", "is", null)
		]), eb.and([eb("kind", "=", "export"), eb("state", "in", [
			"pending",
			"running",
			"complete",
			"failed"
		])])])).returning([
			"id",
			"kind",
			"staging_secret"
		]).execute()).flatMap((row) => isTransferOperationKind(row.kind) ? [{
			id: row.id,
			kind: row.kind,
			stagingSecret: row.staging_secret
		}] : []);
	}
	/**
	* Operations whose staging area can be collected and has not been yet:
	* imports in a terminal state, and exports that failed or expired
	* (complete exports stay downloadable until they expire). Oldest first.
	* A collector deletes staged objects with `TransferStage.deleteSome` until
	* it returns 0, deletes child rows with {@link deleteChildRows} until it
	* returns 0, then calls {@link markCollected}; a crash anywhere in between
	* leaves the operation listed here, so collection resumes.
	*
	* `importRetentionSeconds` keeps a finished import's staging for that long
	* after its last state change; expired imports are listed at once.
	*/
	async listUncollected(limit = 20, options = {}) {
		const retention = options.importRetentionSeconds ?? 0;
		const retainedStates = TERMINAL_IMPORT_STATES.filter((state) => state !== "expired");
		return (await this.db.selectFrom("_emdash_transfer_operations").select([
			"id",
			"kind",
			"state",
			"staging_secret"
		]).where("staging_collected_at", "is", null).where((eb) => eb.or([
			eb.and([eb("kind", "=", "import"), eb("state", "=", "expired")]),
			eb.and([
				eb("kind", "=", "import"),
				eb("state", "in", retainedStates),
				timestampIsOlderThan(this.db, "updated_at", retention)
			]),
			eb.and([eb("kind", "=", "export"), eb("state", "in", ["failed", "expired"])])
		])).where((eb) => eb.or([
			eb("lease_token", "is", null),
			eb("lease_expires_at", "is", null),
			timestampIsDue(this.db, "lease_expires_at")
		])).orderBy("updated_at").orderBy("id").limit(Math.min(Math.max(limit, 1), 100)).execute()).flatMap((row) => isTransferOperationKind(row.kind) && isTransferOperationState(row.state) ? [{
			id: row.id,
			kind: row.kind,
			state: row.state,
			stagingSecret: row.staging_secret
		}] : []);
	}
	/** Record that an operation's staging area and child rows are gone. */
	async markCollected(id) {
		await this.db.updateTable("_emdash_transfer_operations").set({ staging_collected_at: timestampNow(this.db) }).where("id", "=", id).where("staging_collected_at", "is", null).execute();
	}
	/**
	* Delete up to `limit` child rows of each child table of an operation
	* (staged files, package index, media blobs), one bounded statement per
	* table. Returns the number deleted; call until it returns 0. Always drain
	* children this way before deleting an operation row: an `ON DELETE
	* CASCADE` over millions of child rows in one statement exceeds D1's
	* limits.
	*/
	async deleteChildRows(operationId, limit = 500) {
		const bounded = Math.min(Math.max(Math.trunc(limit), 1), 5e3);
		return [
			await sql`
			DELETE FROM _emdash_transfer_staged_files
			WHERE operation_id = ${operationId}
				AND path IN (
					SELECT path FROM _emdash_transfer_staged_files
					WHERE operation_id = ${operationId}
					LIMIT ${bounded}
				)
		`.execute(this.db),
			await sql`
			DELETE FROM _emdash_transfer_package_index
			WHERE operation_id = ${operationId}
				AND (kind, id) IN (
					SELECT kind, id FROM _emdash_transfer_package_index
					WHERE operation_id = ${operationId}
					LIMIT ${bounded}
				)
		`.execute(this.db),
			await sql`
			DELETE FROM _emdash_transfer_media_blobs
			WHERE operation_id = ${operationId}
				AND media_id IN (
					SELECT media_id FROM _emdash_transfer_media_blobs
					WHERE operation_id = ${operationId}
					LIMIT ${bounded}
				)
		`.execute(this.db)
		].reduce((sum, result) => sum + Number(result.numAffectedRows ?? 0n), 0);
	}
	/**
	* Delete a collected operation row once it has no child rows left.
	* Returns false, deleting nothing, otherwise. Identity-map rows are kept.
	*/
	async deleteIfChildless(id) {
		const result = await this.db.deleteFrom("_emdash_transfer_operations").where("id", "=", id).where("staging_collected_at", "is not", null).where((eb) => eb.and([
			eb.not(eb.exists(eb.selectFrom("_emdash_transfer_staged_files").select("path").where("_emdash_transfer_staged_files.operation_id", "=", id))),
			eb.not(eb.exists(eb.selectFrom("_emdash_transfer_package_index").select("kind").where("_emdash_transfer_package_index.operation_id", "=", id))),
			eb.not(eb.exists(eb.selectFrom("_emdash_transfer_media_blobs").select("media_id").where("_emdash_transfer_media_blobs.operation_id", "=", id)))
		])).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0n) > 0;
	}
	/**
	* Bump `write_epoch` on every running export. Fenced write paths call this
	* so an export's consistency fence notices writes to tables that have no
	* `updated_at`. Returns the number of exports touched.
	*/
	async recordWriteForRunningExports() {
		return bumpRunningExportWriteEpochs(this.db);
	}
	/** Operations newest first, `{ items, nextCursor }` over `(created_at, id)`. */
	async list(options = {}) {
		const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
		let query = this.db.selectFrom("_emdash_transfer_operations").selectAll();
		if (options.kind) query = query.where("kind", "=", options.kind);
		if (options.createdBy) query = query.where("created_by", "=", options.createdBy);
		const cursor = options.cursor;
		if (cursor) query = query.where((eb) => eb.or([eb("created_at", "<", cursor.createdAt), eb.and([eb("created_at", "=", cursor.createdAt), eb("id", "<", cursor.id)])]));
		const rows = await query.orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1).execute();
		const items = rows.slice(0, limit).map((row) => toPublicOperation(toOperation(row)));
		const last = items.at(-1);
		return rows.length > limit && last ? {
			items,
			next: {
				createdAt: last.createdAt,
				id: last.id
			}
		} : { items };
	}
	patchValues(patch) {
		const values = {};
		if (patch.state !== void 0) values.state = patch.state;
		if (patch.stage !== void 0) values.stage = patch.stage;
		if (patch.cursor !== void 0) values.cursor = patch.cursor === null ? null : JSON.stringify(transferCursorSchema.parse(patch.cursor));
		if (patch.progress !== void 0) values.progress = patch.progress === null ? null : JSON.stringify(transferProgressSchema.parse(patch.progress));
		if (patch.packageDigest !== void 0) values.package_digest = patch.packageDigest;
		if (patch.planDigest !== void 0) values.plan_digest = patch.planDigest;
		if (patch.originSiteId !== void 0) values.origin_site_id = patch.originSiteId;
		if (patch.markMutationStarted) values.mutation_started_at = sql`COALESCE(mutation_started_at, ${timestampNow(this.db)})`;
		if (patch.ttlSeconds !== void 0) values.expires_at = timestampOffset(this.db, patch.ttlSeconds);
		if (patch.retryError !== void 0) {
			values.error_code = patch.retryError?.code ?? null;
			values.error_detail = patch.retryError?.detail === void 0 ? null : JSON.stringify(patch.retryError.detail);
		}
		return values;
	}
	async fencedUpdate(id, leaseToken, values) {
		const row = await this.db.updateTable("_emdash_transfer_operations").set({
			...values,
			updated_at: timestampNow(this.db)
		}).where("id", "=", id).where("lease_token", "=", leaseToken).where("lease_expires_at", "is not", null).where(timestampIsLive(this.db, "lease_expires_at")).returningAll().executeTakeFirst();
		if (!row) throw new TransferError("TRANSFER_LEASE_LOST", "Transfer operation lease was lost");
		return toOperation(row);
	}
};
function defaultTtl(kind) {
	return kind === "export" ? TRANSFER_LIMITS.exportTtlSeconds : TRANSFER_LIMITS.pendingImportTtlSeconds;
}
var PACKAGE_CONTENT_TYPE = "application/octet-stream";
function oversizeError() {
	return new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "File is larger than declared");
}
function toStream(body) {
	if (body instanceof Uint8Array) return new ReadableStream({ start(controller) {
		if (body.byteLength > 0) controller.enqueue(body);
		controller.close();
	} });
	return body;
}
/**
* Stream `body` into `key`, hashing and counting as it goes. The object is
* kept only if exactly `expected.bytes` bytes with digest `expected.sha256`
* were written; otherwise it is deleted and `TRANSFER_FILE_SIZE_MISMATCH` or
* `TRANSFER_FILE_DIGEST_MISMATCH` is thrown. Where the runtime provides
* `FixedLengthStream` (workerd), the upload is wrapped in one so R2 receives
* a known length.
*
* Callers staging a package file must check its staged-files row first and
* refuse the upload when it is already `verified` and its object still
* matches, and must pass `keepExistingOnFailure` returning true once the row
* is verified: a failed retry or concurrent upload of the same path must not
* delete the object a successful upload stored. A failing upload that
* already overwrote the object can still leave bad bytes behind a verified
* row, so readers verify sizes and digests again when they read staged
* files, and a later upload of that path replaces the bad object.
*/
async function putVerified(storage, key, body, expected, options = {}) {
	const discard = async () => {
		if (options.keepExistingOnFailure && await options.keepExistingOnFailure()) return;
		await storage.delete(key).catch(() => void 0);
	};
	if (!Number.isSafeInteger(expected.bytes) || expected.bytes < 0) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Invalid declared size");
	const hasher = await createSha256();
	const hashing = createHashingStream(hasher, {
		maxBytes: expected.bytes,
		onLimitExceeded: oversizeError
	});
	let stream = toStream(body).pipeThrough(hashing.stream);
	if (typeof FixedLengthStream !== "undefined") stream = stream.pipeThrough(new FixedLengthStream(expected.bytes));
	try {
		await storage.upload({
			key,
			body: stream,
			contentType: options.contentType ?? PACKAGE_CONTENT_TYPE
		});
	} catch (error) {
		await discard();
		if (isTransferError(error)) throw error;
		const cause = findTransferError(error);
		if (cause) throw cause;
		if (hashing.bytes() !== expected.bytes) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "File size does not match", { cause: error });
		throw new TransferError("TRANSFER_STORAGE_ERROR", "Failed to store file", { cause: error });
	}
	const digest = await hasher.digest();
	if (hashing.bytes() !== expected.bytes) {
		await discard();
		throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "File size does not match", { detail: {
			expected: expected.bytes,
			actual: hashing.bytes()
		} });
	}
	if (digest !== expected.sha256) {
		await discard();
		throw new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "File digest does not match");
	}
}
function findTransferError(error) {
	let current = error;
	for (let depth = 0; depth < 5 && current instanceof Error; depth++) {
		if (current instanceof TransferError) return current;
		current = current.cause;
	}
	return null;
}
/** Read a whole stream, failing once it exceeds `maxBytes`. */
async function readStreamBytes(stream, maxBytes) {
	const reader = stream.getReader();
	const parts = [];
	let total = 0;
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			total += value.byteLength;
			if (total > maxBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "File exceeds its size limit", { detail: { limit: maxBytes } });
			parts.push(value);
		}
	} catch (error) {
		await reader.cancel().catch(() => void 0);
		throw error;
	} finally {
		reader.releaseLock();
	}
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const part of parts) {
		bytes.set(part, offset);
		offset += part.byteLength;
	}
	return bytes;
}
/** One operation's staging area in `storage` under `prefix` (see keys.ts). */
var TransferStage = class {
	constructor(storage, prefix) {
		this.storage = storage;
		this.prefix = prefix;
	}
	keyFor(path) {
		return stagingKey(this.prefix, path);
	}
	async putVerified(path, body, bytes, sha256, options = {}) {
		await putVerified(this.storage, this.keyFor(path), body, {
			bytes,
			sha256
		}, options);
	}
	async exists(path) {
		return this.storage.exists(this.keyFor(path));
	}
	async open(path) {
		try {
			return await this.storage.download(this.keyFor(path));
		} catch (error) {
			throw new TransferError("TRANSFER_FILE_MISSING", "Staged file is missing", {
				detail: { path },
				cause: error
			});
		}
	}
	async readBytes(path, maxBytes) {
		return readStreamBytes((await this.open(path)).body, maxBytes);
	}
	async putAux(file, content) {
		await this.storage.upload({
			key: stagingAuxKey(this.prefix, file),
			body: new TextEncoder().encode(content),
			contentType: "application/json"
		});
	}
	async readAux(file, maxBytes) {
		const key = stagingAuxKey(this.prefix, file);
		if (!await this.storage.exists(key)) return null;
		const download = await this.storage.download(key);
		return new TextDecoder().decode(await readStreamBytes(download.body, maxBytes));
	}
	/**
	* Delete up to `limit` staged objects. Returns the number deleted; call
	* again until it returns 0.
	*/
	async deleteSome(limit = 100) {
		const listing = await this.storage.list({
			prefix: this.prefix,
			limit
		});
		for (const file of listing.files) await this.storage.delete(file.key);
		return listing.files.length;
	}
};
export { toPublicOperation as a, readStreamBytes as i, TransferStage as n, sealReceipt as o, putVerified as r, TransferOperationRepository as t };
