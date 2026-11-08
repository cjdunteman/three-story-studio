import { u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { t as TransferError } from "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as TRANSFER_LIMITS } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { a as isSha256Digest } from "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./dist_BZHQodRU.mjs";
import { i as RECORD_KINDS } from "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import { sql } from "kysely";
import { z } from "zod";
import { ulid } from "ulidx";
// node_modules/emdash/dist/version-BZj18Q7G.mjs
var SITE_PACKAGE_FORMAT = "emdash-site-package";
var SITE_PACKAGE_PROFILE = "full-transfer";
var SUPPORTED_FORMAT_VERSIONS = Object.freeze(["1"]);
// node_modules/emdash/dist/approvals-DTtYSB27.mjs
Object.freeze({
	export: "transfer:export",
	analyze: "transfer:analyze",
	execute: "transfer:execute"
});
Object.freeze({
	export: "transfer:export",
	analyze: "transfer:import",
	execute: "transfer:import"
});
/** Actions an MCP approval grant can authorize. */
var TRANSFER_APPROVAL_ACTIONS = ["export", "import"];
var TRANSFER_OPERATION_KINDS = ["export", "import"];
var EXPORT_STATES = [
	"pending",
	"running",
	"complete",
	"failed",
	"expired"
];
var IMPORT_STATES = [
	"uploading",
	"analyzing",
	"planned",
	"running",
	"verifying",
	"complete",
	"failed",
	"cancelled",
	"abandoned",
	"expired"
];
var OPERATION_KINDS = new Set(TRANSFER_OPERATION_KINDS);
var OPERATION_STATES = /* @__PURE__ */ new Set([...EXPORT_STATES, ...IMPORT_STATES]);
function isTransferOperationKind(value) {
	return OPERATION_KINDS.has(value);
}
function isTransferOperationState(value) {
	return OPERATION_STATES.has(value);
}
/** Import states before execution starts; they expire after the pending TTL. */
var PRE_EXECUTION_IMPORT_STATES = [
	"uploading",
	"analyzing",
	"planned"
];
/** Import states in which the importer is writing to the target. */
var EXECUTING_IMPORT_STATES = ["running", "verifying"];
var TERMINAL_EXPORT_STATES = [
	"complete",
	"failed",
	"expired"
];
var TERMINAL_IMPORT_STATES = [
	"complete",
	"failed",
	"cancelled",
	"abandoned",
	"expired"
];
function isTerminalState(kind, state) {
	return kind === "export" ? TERMINAL_EXPORT_STATES.includes(state) : TERMINAL_IMPORT_STATES.includes(state);
}
/**
* Import stages in execution order. The record stages write the kinds listed
* in `IMPORT_STAGE_KINDS` (format/kinds.ts).
*/
var IMPORT_STAGES = [
	"reserve",
	"clear_scaffold",
	"schema",
	"media",
	"terms_bylines",
	"content",
	"relations",
	"presentation",
	"rebuild",
	"verify"
];
var REBUILD_STEPS = [
	"search",
	"media_usage",
	"options",
	"taxonomies",
	"caches"
];
var recordKindSchema = z.enum(RECORD_KINDS);
var nonNegativeInt = z.number().int().nonnegative();
/** Next record to process in a package stream: chunk `seq`, zero-based `line`. */
var streamPositionSchema = z.strictObject({
	kind: recordKindSchema,
	seq: nonNegativeInt,
	line: nonNegativeInt
});
/** Last stream-order key processed (`depth` only for topological kinds). */
var streamKeySchema = z.strictObject({
	id: z.string(),
	depth: nonNegativeInt.optional()
});
/**
* Optimistic-read fence captured before an export attempt and re-checked
* after it. `writeEpoch` is the export operation's `write_epoch` column,
* which fenced writes bump while the export runs.
*/
var exportFenceSchema = z.strictObject({
	writeEpoch: nonNegativeInt,
	tables: z.array(z.strictObject({
		table: z.string(),
		count: nonNegativeInt,
		maxChanged: z.string().optional(),
		maxId: z.string().optional()
	}))
});
var exportAttempt = z.number().int().min(1);
var exportCursorSchema = z.discriminatedUnion("stage", [
	z.strictObject({
		stage: z.literal("export_records"),
		attempt: exportAttempt,
		fence: exportFenceSchema,
		kind: recordKindSchema,
		collection: z.string().optional(),
		after: streamKeySchema.nullable(),
		nextSeq: nonNegativeInt,
		summary: z.json().optional()
	}),
	z.strictObject({
		stage: z.literal("export_media"),
		attempt: exportAttempt,
		fence: exportFenceSchema,
		afterMediaId: z.string().nullable(),
		summary: z.json().optional()
	}),
	z.strictObject({
		stage: z.literal("export_finalize"),
		attempt: exportAttempt,
		fence: exportFenceSchema,
		nextIndexSeq: nonNegativeInt,
		afterPath: z.string().nullable(),
		summary: z.json().optional()
	}),
	z.strictObject({
		stage: z.literal("export_validate"),
		position: streamPositionSchema.nullable(),
		validation: z.json().optional()
	})
]);
var analysisCursorSchema = z.discriminatedUnion("stage", [
	z.strictObject({
		stage: z.literal("analyze_structure"),
		nextIndexSeq: nonNegativeInt
	}),
	z.strictObject({
		stage: z.literal("analyze_records"),
		position: streamPositionSchema
	}),
	z.strictObject({
		stage: z.literal("analyze_references"),
		check: nonNegativeInt,
		after: z.string().nullable()
	}),
	z.strictObject({ stage: z.literal("analyze_target") })
]);
var recordStage = (stage) => z.strictObject({
	stage: z.literal(stage),
	position: streamPositionSchema
});
var importCursorSchema = z.discriminatedUnion("stage", [
	z.strictObject({ stage: z.literal("reserve") }),
	z.strictObject({
		stage: z.literal("clear_scaffold"),
		step: nonNegativeInt
	}),
	recordStage("schema"),
	recordStage("media"),
	recordStage("terms_bylines"),
	recordStage("content"),
	recordStage("relations"),
	recordStage("presentation"),
	z.strictObject({
		stage: z.literal("rebuild"),
		step: z.enum(REBUILD_STEPS),
		after: z.string().nullable()
	}),
	z.strictObject({
		stage: z.literal("verify"),
		position: streamPositionSchema.nullable(),
		mediaAfter: z.string().nullable(),
		mismatches: nonNegativeInt,
		verifier: z.json().optional()
	})
]);
var transferCursorSchema = z.union([
	exportCursorSchema,
	analysisCursorSchema,
	importCursorSchema
]);
/**
* Bounded progress summary shown by status endpoints. `done` of `total`
* counts stages (and, for an export, record kinds). `records` is the number
* of records an export has written so far; the byte counts cover package
* files once they are known.
*/
var transferProgressSchema = z.strictObject({
	done: nonNegativeInt,
	total: nonNegativeInt,
	records: nonNegativeInt.optional(),
	bytesDone: nonNegativeInt.optional(),
	bytesTotal: nonNegativeInt.optional()
});
/**
* Database-clock timestamps for transfer state. Every lease and expiry
* comparison runs in SQL against the database clock, never a worker clock,
* and every stored timestamp uses the sortable `YYYY-MM-DDTHH:MM:SS.sssZ`
* form so plain string comparison orders them.
*/
function timestampOffset(db, seconds) {
	if (!Number.isFinite(seconds)) throw new RangeError("Invalid timestamp offset");
	if (isPostgres(db)) return sql`to_char(
			clock_timestamp() AT TIME ZONE 'UTC' + (${seconds} * interval '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ${`${seconds >= 0 ? "+" : ""}${seconds} seconds`})`;
}
function timestampNow(db) {
	return timestampOffset(db, 0);
}
/** `column <= now` */
function timestampIsDue(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)}::timestamptz <= clock_timestamp()` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
/** `column > now` */
function timestampIsLive(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)}::timestamptz > clock_timestamp()` : sql`${sql.ref(column)} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
/** `column <= now - seconds` */
function timestampIsOlderThan(db, column, seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) throw new RangeError("Invalid timestamp age");
	return isPostgres(db) ? sql`${sql.ref(column)}::timestamptz <= clock_timestamp() - (${seconds} * interval '1 second')` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ${`-${seconds} seconds`})`;
}
var APPROVAL_STATUSES = [
	"pending",
	"approved",
	"denied",
	"consumed",
	"expired"
];
var STATUS_SET = new Set(APPROVAL_STATUSES);
var ACTION_SET = new Set(TRANSFER_APPROVAL_ACTIONS);
function isApprovalStatus(value) {
	return STATUS_SET.has(value);
}
function isApprovalAction(value) {
	return ACTION_SET.has(value);
}
function toApproval(row) {
	const { status, action } = row;
	if (!isApprovalStatus(status) || !isApprovalAction(action)) throw new TransferError("TRANSFER_APPROVAL_INVALID", "Unknown approval status or action");
	return {
		id: row.id,
		status,
		action,
		userId: row.user_id,
		requestedByTokenId: row.requested_by_token_id,
		approvedBy: row.approved_by,
		operationId: row.operation_id,
		paramsDigest: isSha256Digest(row.params_digest) ? row.params_digest : null,
		packageDigest: isSha256Digest(row.package_digest) ? row.package_digest : null,
		planDigest: isSha256Digest(row.plan_digest) ? row.plan_digest : null,
		expiresAt: row.expires_at,
		createdAt: row.created_at,
		decidedAt: row.decided_at,
		consumedAt: row.consumed_at
	};
}
/** Every column a grant binds besides user and action, with the value it must hold (undefined = NULL). */
function boundColumns(binding) {
	return [
		["operation_id", binding.operationId],
		["params_digest", binding.paramsDigest],
		["package_digest", binding.packageDigest],
		["plan_digest", binding.planDigest],
		["requested_by_token_id", binding.tokenId]
	];
}
function invalid() {
	return new TransferError("TRANSFER_APPROVAL_INVALID", "Approval is missing, expired, or does not match");
}
var TransferApprovalRepository = class {
	constructor(db) {
		this.db = db;
	}
	async createPending(input) {
		if (input.action === "import" && (!input.packageDigest || !input.planDigest)) throw new TransferError("TRANSFER_APPROVAL_INVALID", "An import approval must bind a package digest and a plan digest");
		return toApproval(await this.db.insertInto("_emdash_transfer_approvals").values({
			id: ulid(),
			status: "pending",
			action: input.action,
			user_id: input.userId,
			requested_by_token_id: input.requestedByTokenId ?? null,
			approved_by: null,
			operation_id: input.operationId ?? null,
			params_digest: input.paramsDigest ?? null,
			package_digest: input.packageDigest ?? null,
			plan_digest: input.planDigest ?? null,
			expires_at: timestampOffset(this.db, input.ttlSeconds ?? TRANSFER_LIMITS.approvalTtlSeconds),
			decided_at: null,
			consumed_at: null
		}).returningAll().executeTakeFirstOrThrow());
	}
	async get(id) {
		const row = await this.db.selectFrom("_emdash_transfer_approvals").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? toApproval(row) : null;
	}
	/**
	* Approve a pending, unexpired grant. The grant then stays usable for the
	* approval TTL from now.
	*/
	async approve(id, approvedBy, options = {}) {
		return this.decide(id, "approved", approvedBy, options.ttlSeconds);
	}
	async deny(id, deniedBy) {
		return this.decide(id, "denied", deniedBy);
	}
	async decide(id, status, decidedBy, ttlSeconds) {
		const now = timestampNow(this.db);
		const row = await this.db.updateTable("_emdash_transfer_approvals").set({
			status,
			approved_by: decidedBy,
			decided_at: now,
			...status === "approved" ? { expires_at: timestampOffset(this.db, ttlSeconds ?? TRANSFER_LIMITS.approvalTtlSeconds) } : {}
		}).where("id", "=", id).where("status", "=", "pending").where(timestampIsLive(this.db, "expires_at")).returningAll().executeTakeFirst();
		if (!row) throw invalid();
		return toApproval(row);
	}
	/**
	* Consume an approved grant in one statement. Every digest or operation id
	* the grant was created with must be supplied and equal; a grant created
	* without one must be consumed without it. The same holds for the token:
	* a grant requested by token `T` can only be consumed by a caller
	* authenticated with `T` (pass `tokenId`), and a grant requested without a
	* token only by a caller without one. Throws `TRANSFER_APPROVAL_INVALID`
	* otherwise.
	*/
	async consume(id, binding) {
		const now = timestampNow(this.db);
		let query = this.db.updateTable("_emdash_transfer_approvals").set({
			status: "consumed",
			consumed_at: now
		}).where("id", "=", id).where("status", "=", "approved").where(timestampIsLive(this.db, "expires_at")).where("user_id", "=", binding.userId).where("action", "=", binding.action);
		for (const [column, value] of boundColumns(binding)) query = value === void 0 ? query.where(column, "is", null) : query.where(column, "=", value);
		const row = await query.returningAll().executeTakeFirst();
		if (!row) throw invalid();
		return toApproval(row);
	}
	/**
	* Return a grant `consume` took back to `approved`, for when the
	* operation it was consumed for could not be started. Its expiry is
	* unchanged, so an expired grant stays unusable.
	*/
	async restore(id) {
		await this.db.updateTable("_emdash_transfer_approvals").set({
			status: "approved",
			consumed_at: null
		}).where("id", "=", id).where("status", "=", "consumed").execute();
	}
	/**
	* The newest pending, unexpired grant with exactly this binding, so a
	* caller retrying without an approval id reuses its open request instead
	* of adding another one for an admin to review.
	*/
	async findPending(binding) {
		let query = this.db.selectFrom("_emdash_transfer_approvals").selectAll().where("status", "=", "pending").where(timestampIsLive(this.db, "expires_at")).where("user_id", "=", binding.userId).where("action", "=", binding.action);
		for (const [column, value] of boundColumns(binding)) query = value === void 0 ? query.where(column, "is", null) : query.where(column, "=", value);
		const row = await query.orderBy("created_at", "desc").orderBy("id", "desc").executeTakeFirst();
		return row ? toApproval(row) : null;
	}
	/**
	* Whether a grant for `action` on `operationId` was consumed by this user
	* authenticated with this token (or, without `tokenId`, without a token).
	*/
	async hasConsumed(binding) {
		let query = this.db.selectFrom("_emdash_transfer_approvals").select("id").where("status", "=", "consumed").where("user_id", "=", binding.userId).where("action", "=", binding.action).where("operation_id", "=", binding.operationId);
		query = binding.tokenId === void 0 ? query.where("requested_by_token_id", "is", null) : query.where("requested_by_token_id", "=", binding.tokenId);
		return await query.executeTakeFirst() !== void 0;
	}
	/**
	* Record the operation a consumed export grant created. Export grants are
	* requested before the operation exists, so they bind no operation id
	* until they are used.
	*/
	async linkOperation(id, operationId) {
		await this.db.updateTable("_emdash_transfer_approvals").set({ operation_id: operationId }).where("id", "=", id).where("status", "=", "consumed").where("action", "=", "export").where("operation_id", "is", null).execute();
	}
	/** Approvals newest first. */
	async list(options = {}) {
		const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
		let query = this.db.selectFrom("_emdash_transfer_approvals").selectAll();
		if (options.userId) query = query.where("user_id", "=", options.userId);
		if (options.status) query = query.where("status", "=", options.status);
		const cursor = options.cursor;
		if (cursor) query = query.where((eb) => eb.or([eb("created_at", "<", cursor.createdAt), eb.and([eb("created_at", "=", cursor.createdAt), eb("id", "<", cursor.id)])]));
		const rows = await query.orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1).execute();
		const items = rows.slice(0, limit).map(toApproval);
		const last = items.at(-1);
		return rows.length > limit && last ? {
			items,
			next: {
				createdAt: last.createdAt,
				id: last.id
			}
		} : { items };
	}
	/** Mark pending and approved grants past their expiry as `expired`; returns how many. */
	async expireDue() {
		const result = await this.db.updateTable("_emdash_transfer_approvals").set({ status: "expired" }).where("status", "in", ["pending", "approved"]).where(timestampIsDue(this.db, "expires_at")).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0n);
	}
};
export { SUPPORTED_FORMAT_VERSIONS as C, SITE_PACKAGE_PROFILE as S, timestampNow as _, IMPORT_STATES as a, transferProgressSchema as b, TERMINAL_IMPORT_STATES as c, isTerminalState as d, isTransferOperationKind as f, timestampIsOlderThan as g, timestampIsLive as h, IMPORT_STAGES as i, TransferApprovalRepository as l, timestampIsDue as m, EXECUTING_IMPORT_STATES as n, PRE_EXECUTION_IMPORT_STATES as o, isTransferOperationState as p, EXPORT_STATES as r, REBUILD_STEPS as s, APPROVAL_STATUSES as t, analysisCursorSchema as u, timestampOffset as v, SITE_PACKAGE_FORMAT as x, transferCursorSchema as y };
