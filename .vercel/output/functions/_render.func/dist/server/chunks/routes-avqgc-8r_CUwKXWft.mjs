import { n as validateJsonFieldName, t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { _ as pluginDataUpdateGuard, g as pluginDataOrderExpr, h as pluginDataExtractExpr, u as isPostgres, v as pluginDataWriteExpr } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { m as getI18nConfig, x as resolveContentCreateLocale } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { i as serializeConditionalValue, n as assertStorageKey, r as assertStorageRevision, t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import { n as localeMatches } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { a as InvalidCursorError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { i as normalizeRevisionLimit, n as RevisionRepository } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as isValidFocalPointUpdate } from "./focal-point-CgCcr1Ca_d0laIeAH.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as UserRepository } from "./user-By8SzQxS_D4eC0D6b.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { t as CommentRepository } from "./comment-DB74Zpa4_Ce41HKnk.mjs";
import { a as resolveLocalizedContentRoutePath } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { t as RedirectRepository } from "./redirect-DjLdw427_BDBqyEyI.mjs";
import { n as normalizeMime, t as matchesMimeAllowlist } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { t as enrichImageMetadata } from "./enrich-DFlfnd3u_DIfIr-b4.mjs";
import { t as EntryLockRepository } from "./entry-locks-CJ9uhqg1_C8W-QuNA.mjs";
import { X as SeoRepository } from "./api--PYoyeTo_B51u3ELz.mjs";
import { d as findTaxonomyStructure, x as selectTaxonomyDefs } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { M as markContentMediaUsageCollectionStaleSafely, d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { n as handleMediaDelete } from "./media-CikS-q6E_DwICdYDo.mjs";
import { n as createSettingsAccess, s as invalidateSiteSettingsCache } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { s as handleTermCreate } from "./taxonomies-5SR76j11_BpsROtKh.mjs";
import { o as stripCredentialHeaders, r as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { d as createRedirectBody, k as updateRedirectBody } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Bt as CONTENT_TYPE_RE } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import { t as GLOBAL_UPLOAD_ALLOWLIST } from "./media-allowlist-BMBLqyWh_C2XgtjYy.mjs";
import { a as handleRedirectCreate, c as handleRedirectList, l as handleRedirectUpdate, o as handleRedirectDelete } from "./redirects-Cpq1catN_BZY6zK38.mjs";
import { t as resolveBylineCredits } from "./credits-BKREepht_BTl2HLL3.mjs";
import { t as CronAccessImpl } from "./cron-D7obTIfk_CTXHi0cN.mjs";
import { a as bufferPluginHttpRequest, c as pluginHttpResponseToWire, l as rewritePluginHttpRedirect, n as parseDeclaredPluginRouteInput, o as pluginHttpRedirectAction, s as pluginHttpResponseFromWire } from "./route-wire-Ca_HWCZ5_Cu9YQK_s.mjs";
import { t as SiteWriteBlockedError } from "./fence-Dagicj14_KC___fhN.mjs";
import { t as extractRequestMeta } from "./request-meta-bwZ_NsvU_BYmTq3sa.mjs";
import { sql } from "kysely";
import { z } from "zod";
import { ulid } from "ulidx";
import mime from "mime/lite";
import { routeNameSchema } from "@emdash-cms/plugin-types";
// node_modules/emdash/dist/plugins/secret-redactor.mjs
function createPluginSecretRedactor() {
	const secretsByKey = /* @__PURE__ */ new Map();
	const secretValues = () => [...new Set([...secretsByKey.values()].flat().filter((value) => value !== void 0))].toSorted((a, b) => b.length - a.length);
	const redactString = (value) => {
		let redacted = value;
		for (const secret of secretValues()) redacted = redacted.replaceAll(secret, "[REDACTED]");
		return redacted;
	};
	const redactValue = (value, seen) => {
		if (typeof value === "string") return redactString(value);
		if (typeof value !== "object" || value === null) return value;
		const existing = seen.get(value);
		if (existing !== void 0) return existing;
		if (value instanceof Error) {
			const redacted = new Error(redactString(value.message));
			redacted.name = value.name;
			redacted.stack = value.stack ? redactString(value.stack) : void 0;
			seen.set(value, redacted);
			return redacted;
		}
		if (Array.isArray(value)) {
			const redacted = [];
			seen.set(value, redacted);
			for (const entry of value) redacted.push(redactValue(entry, seen));
			return redacted;
		}
		if (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null) {
			const redacted = {};
			seen.set(value, redacted);
			for (const [key, entry] of Object.entries(value)) redacted[redactString(key)] = redactValue(entry, seen);
			return redacted;
		}
		return "[NonPlainObject]";
	};
	return {
		add(key, value) {
			if (value.length === 0) return;
			const current = secretsByKey.get(key)?.[0];
			if (current === value) return;
			secretsByKey.set(key, current ? [value, current] : [value]);
		},
		redact(value) {
			return redactValue(value, /* @__PURE__ */ new WeakMap());
		}
	};
}
// node_modules/emdash/dist/context-CzjejcsE.mjs
/**
* Error thrown when querying non-indexed fields
*/
var StorageQueryError = class extends Error {
	constructor(message, field, suggestion) {
		super(message);
		this.field = field;
		this.suggestion = suggestion;
		this.name = "StorageQueryError";
	}
};
/**
* Error thrown when a guarded `updateIf` loses a concurrent race by aborting
* rather than resolving to `{ applied: false }`.
*
* `updateIf`'s `{ applied: false }` contract (row absent OR guard failed)
* assumes READ COMMITTED — the default. There, a losing concurrent writer
* re-evaluates the guard against the winner's freshly committed row and
* cleanly resolves to `{ applied: false }`. Two aborts escape that contract:
*
* - `40001` (serialization_failure), only above READ COMMITTED, where the
*   loser cannot re-read against a newer snapshot.
* - `40P01` (deadlock_detected), at any isolation level, when transactions
*   take row locks in opposite order.
*
* This error surfaces either abort so the caller can retry the write.
*
* The no-oversell SAFETY invariant holds either way: a losing writer NEVER
* applies its update — it either sees `{ applied: false }` or throws here.
*/
var StorageSerializationError = class extends Error {
	code = "STORAGE_SERIALIZATION_FAILURE";
	retryable = true;
	/** The Postgres SQLSTATE that triggered this error (`40001` / `40P01`). */
	sqlState;
	constructor(message, options) {
		super(message, { cause: options?.cause });
		this.name = "StorageSerializationError";
		this.sqlState = options?.sqlState;
	}
};
/**
* Check if a value is a range filter
*/
function isRangeFilter(value) {
	if (typeof value !== "object" || value === null) return false;
	return "gt" in value || "gte" in value || "lt" in value || "lte" in value;
}
/**
* Check if a value is an IN filter
*/
function isInFilter(value) {
	if (typeof value !== "object" || value === null) return false;
	return "in" in value && Array.isArray(value.in);
}
/**
* Check if a value is a startsWith filter
*/
function isStartsWithFilter(value) {
	if (typeof value !== "object" || value === null) return false;
	return "startsWith" in value && typeof value.startsWith === "string";
}
/**
* Escape LIKE pattern metacharacters so a startsWith prefix matches
* literally. Without this, `%` and `_` in the prefix act as wildcards
* (e.g. `{ startsWith: "50%" }` would match "50x off").
*/
function escapeLikePattern(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Get the set of indexed fields from index declarations
*/
function getIndexedFields(indexes) {
	const fields = /* @__PURE__ */ new Set();
	for (const index of indexes) if (Array.isArray(index)) for (const field of index) fields.add(field);
	else fields.add(index);
	return fields;
}
/**
* Validate that all fields in a where clause are indexed
*/
function validateWhereClause(where, indexedFields, pluginId, collection) {
	for (const field of Object.keys(where)) if (!indexedFields.has(field)) throw new StorageQueryError(`Cannot query on non-indexed field '${field}'.`, field, `Add '${field}' to storage.${collection}.indexes in plugin '${pluginId}' to enable this query.`);
}
/**
* Validate orderBy fields are indexed
*/
function validateOrderByClause(orderBy, indexedFields, pluginId, collection) {
	for (const field of Object.keys(orderBy)) if (!indexedFields.has(field)) throw new StorageQueryError(`Cannot order by non-indexed field '${field}'.`, field, `Add '${field}' to storage.${collection}.indexes in plugin '${pluginId}' to enable ordering by this field.`);
}
/**
* SQL expression for extracting a queryable field from the `_plugin_storage.data`
* column.
*
* Delegates to `pluginDataExtractExpr`, which validates the field name before
* interpolation and applies the dialect-correct extraction: a `::jsonb` cast on
* Postgres (the `data` column is `text`) plus an optional type-guarded
* `::numeric` cast so numeric comparisons don't fall back to lexical text
* ordering.
*/
function jsonExtract(db, field, options) {
	return pluginDataExtractExpr(db, field, options);
}
/**
* SQL expression for ordering by a `_plugin_storage.data` field.
*
* Delegates to `pluginDataOrderExpr`, which orders over the jsonb-native value
* on Postgres so numeric fields sort numerically (not lexically) while staying
* total across heterogeneous data. SQLite keeps `json_extract` (already numeric).
*/
function jsonOrderExtract(db, field) {
	return pluginDataOrderExpr(db, field);
}
/**
* Build a WHERE clause condition for a single field
*/
function buildCondition(db, field, value) {
	const extractFor = (numeric) => jsonExtract(db, field, { numeric });
	if (value === null) return {
		sql: `${extractFor(false)} IS NULL`,
		params: []
	};
	if (typeof value === "number") return {
		sql: `${extractFor(true)} = ?`,
		params: [value]
	};
	if (typeof value === "string") return {
		sql: `${extractFor(false)} = ?`,
		params: [value]
	};
	if (typeof value === "boolean") return {
		sql: `${extractFor(false)} = ?`,
		params: [value]
	};
	if (isInFilter(value)) {
		const numeric = value.in.length > 0 && value.in.every((v) => typeof v === "number");
		const placeholders = value.in.map(() => "?").join(", ");
		return {
			sql: `${extractFor(numeric)} IN (${placeholders})`,
			params: value.in
		};
	}
	if (isStartsWithFilter(value)) return {
		sql: `${extractFor(false)} LIKE ? ESCAPE '\\'`,
		params: [`${escapeLikePattern(value.startsWith)}%`]
	};
	if (isRangeFilter(value)) {
		const conditions = [];
		const params = [];
		const pushBound = (op, bound) => {
			conditions.push(`${extractFor(typeof bound === "number")} ${op} ?`);
			params.push(bound);
		};
		if (value.gt !== void 0) pushBound(">", value.gt);
		if (value.gte !== void 0) pushBound(">=", value.gte);
		if (value.lt !== void 0) pushBound("<", value.lt);
		if (value.lte !== void 0) pushBound("<=", value.lte);
		if (conditions.length === 0) throw new StorageQueryError(`Range filter for field '${field}' has no defined bound`, field, "Provide at least one of gt, gte, lt, or lte, or omit the field.");
		return {
			sql: conditions.join(" AND "),
			params
		};
	}
	throw new StorageQueryError(`Unknown filter type for field '${field}'`);
}
/**
* Build a complete WHERE clause from a WhereClause object
*/
function buildWhereClause(db, where) {
	const conditions = [];
	const params = [];
	for (const [field, value] of Object.entries(where)) {
		const condition = buildCondition(db, field, value);
		if (!condition.sql) continue;
		conditions.push(condition.sql);
		params.push(...condition.params);
	}
	if (conditions.length === 0) return {
		sql: "",
		params: []
	};
	return {
		sql: conditions.join(" AND "),
		params
	};
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function requireRecord(value, label) {
	if (!isRecord$1(value)) throw new TypeError(`${label} must be an object`);
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object`);
	return value;
}
function operand(value) {
	if (typeof value === "string" || typeof value === "number" && Number.isFinite(value)) return value;
	throw new TypeError("Storage guard operands must be strings or finite numbers");
}
function normalizeFilter(value) {
	if (value === null || typeof value === "boolean") return value;
	if (typeof value === "string" || typeof value === "number") return operand(value);
	const filter = requireRecord(value, "Storage guard filter");
	const values = filter.in;
	if (Array.isArray(values)) return { in: Array.from(values, operand) };
	const prefix = filter.startsWith;
	if (typeof prefix === "string") return { startsWith: prefix };
	const range = {};
	for (const key of [
		"gt",
		"gte",
		"lt",
		"lte"
	]) if (key in filter) {
		const bound = filter[key];
		range[key] = bound === void 0 ? void 0 : operand(bound);
	}
	return range;
}
function parseStorageUpdate(value) {
	const args = requireRecord(value, "Storage update arguments");
	if (Object.keys(args).some((key) => key !== "where" && key !== "set" && key !== "delta")) throw new TypeError("Unknown storage update argument");
	const where = {};
	for (const [field, filter] of Object.entries(requireRecord(args.where, "Storage where guard"))) {
		validateJsonFieldName(field);
		where[field] = normalizeFilter(filter);
	}
	const set = args.set === void 0 ? {} : requireRecord(args.set, "Storage set");
	const delta = args.delta === void 0 ? {} : requireRecord(args.delta, "Storage delta");
	const setEntries = [];
	for (const [field, entry] of Object.entries(set)) {
		if (entry === void 0) continue;
		validateJsonFieldName(field);
		const serialized = JSON.stringify(entry);
		if (serialized === void 0) throw new TypeError("Storage set values must be JSON serializable");
		const normalized = JSON.parse(serialized);
		setEntries.push([field, normalized]);
	}
	const setFields = new Set(setEntries.map(([field]) => field));
	const deltaEntries = [];
	for (const [field, entry] of Object.entries(delta)) {
		if (entry === void 0) continue;
		validateJsonFieldName(field);
		if (setFields.has(field)) throw new TypeError("Storage field appears in both set and delta");
		const spec = requireRecord(entry, "Storage numeric delta");
		const keys = Object.keys(spec);
		const key = keys[0];
		if (keys.length !== 1 || key !== "inc" && key !== "dec") throw new TypeError("Storage delta must contain exactly one of inc or dec");
		const amount = spec[key];
		if (typeof amount !== "number" || !Number.isSafeInteger(amount)) throw new TypeError("Storage delta must be a safe integer");
		deltaEntries.push([field, key === "dec" ? -amount : amount]);
	}
	if (setEntries.length + deltaEntries.length === 0) throw new TypeError("Storage update requires at least one of set or delta");
	return {
		where,
		setEntries,
		deltaEntries
	};
}
/**
* SQLSTATEs a losing concurrent `updateIf` writer can abort with.
*
* `40001` (serialization_failure) is raised only above READ COMMITTED, where
* the loser cannot re-evaluate its guard against a newer snapshot. `40P01`
* (deadlock_detected) is not tied to isolation level: it needs only two
* transactions taking row locks in opposite order, which a caller reaches at
* READ COMMITTED by wrapping several `updateIf` calls in one transaction.
*/
var SERIALIZATION_SQLSTATES = /* @__PURE__ */ new Set(["40001", "40P01"]);
function errSqlState(err) {
	if (typeof err !== "object" || err === null) return void 0;
	const code = err.code;
	if (typeof code === "string") return code;
	const cause = err.cause;
	if (typeof cause === "object" && cause !== null) {
		const causeCode = cause.code;
		if (typeof causeCode === "string") return causeCode;
	}
}
function mapSerializationFailure(err) {
	const sqlState = errSqlState(err);
	if (sqlState !== void 0 && SERIALIZATION_SQLSTATES.has(sqlState)) return new StorageSerializationError("Storage write must be retried. Restart the transaction before retrying when using an explicit transaction.", {
		cause: err,
		sqlState
	});
	return err;
}
/**
* Interleave a `?`-placeholder SQL string with its params into a single
* boolean raw expression. Used as a WHERE predicate directly — wrapping it
* in `(...) = 1` breaks on Postgres, which has a strict boolean type (#920).
*/
function rawWhereExpr(sqlText, params) {
	const parts = [];
	let paramIndex = 0;
	const sqlParts = sqlText.split("?");
	for (let i = 0; i < sqlParts.length; i++) {
		if (i > 0) parts.push(sql`${params[paramIndex++]}`);
		if (sqlParts[i]) parts.push(sql.raw(sqlParts[i]));
	}
	return sql`(${sql.join(parts, sql.raw(""))})`;
}
/**
* Plugin Storage Repository
*
* Implements the StorageCollection interface for a specific plugin and collection.
*/
/**
* Rank a sort expression so NULLs get a deterministic position.
*
* A missing key in a schemaless document extracts as NULL, which sorts
* differently per dialect (SQLite first, Postgres last) and makes every
* comparison against it UNKNOWN. Sorting on this rank ahead of the value puts
* NULLs in the same place on both dialects and keeps the seek operands
* non-NULL.
*/
function nullRank(expr) {
	return sql`(case when ${expr} is null then 1 else 0 end)`;
}
/**
* Comparison value for an orderBy cursor, matching the type of the ordered
* JSON expression.
*
* On Postgres the order expression is jsonb, so non-missing cursor values are
* cast to jsonb. This is important for explicit JSON `null`: the bound value
* must be the jsonb `null` scalar, not SQL NULL, because Postgres
* `data::jsonb->'field'` returns jsonb `null` for an explicit null and SQL NULL
* for a missing key. SQLite extracts SQL NULL for both cases, so a missing
* boundary and an explicit null both bind SQL NULL.
*/
function cursorFieldValue(db, boundary) {
	if (boundary.missing) return sql`null`;
	if (isPostgres(db)) return sql`${sql.val(JSON.stringify(boundary.value))}::jsonb`;
	return sql.val(boundary.value);
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sortBoundaries(data, orderFields) {
	const record = isRecord(data) ? data : void 0;
	return orderFields.map((field) => {
		if (record !== void 0 && Object.hasOwn(record, field)) return {
			value: record[field],
			missing: false
		};
		return { missing: true };
	});
}
function isScalarSortBoundary(boundary) {
	if (boundary.missing) return true;
	const value = boundary.value;
	return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
var PluginStorageRepository = class {
	indexedFields;
	constructor(db, pluginId, collection, indexes) {
		this.db = db;
		this.pluginId = pluginId;
		this.collection = collection;
		this.indexedFields = getIndexedFields(indexes);
	}
	/**
	* Get a document by ID
	*/
	async get(id) {
		const row = await this.db.selectFrom("_plugin_storage").select("data").where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).executeTakeFirst();
		if (!row) return null;
		return JSON.parse(row.data);
	}
	/**
	* Store a document
	*/
	async put(id, data) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const jsonData = JSON.stringify(data);
		const revision = crypto.randomUUID();
		await this.db.insertInto("_plugin_storage").values({
			plugin_id: this.pluginId,
			collection: this.collection,
			id,
			data: jsonData,
			revision,
			created_at: now,
			updated_at: now
		}).onConflict((oc) => oc.columns([
			"plugin_id",
			"collection",
			"id"
		]).doUpdateSet({
			data: jsonData,
			revision,
			updated_at: now
		})).execute();
	}
	async getVersioned(id) {
		assertStorageKey(id);
		const row = await this.db.selectFrom("_plugin_storage").select(["data", "revision"]).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).executeTakeFirst();
		if (!row) return null;
		return {
			value: JSON.parse(row.data),
			revision: row.revision
		};
	}
	async compareAndSet(id, expectedRevision, data) {
		assertStorageKey(id);
		if (expectedRevision !== null) assertStorageRevision(expectedRevision);
		const jsonData = serializeConditionalValue(data);
		const revision = crypto.randomUUID();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = expectedRevision === null ? await this.db.insertInto("_plugin_storage").values({
			plugin_id: this.pluginId,
			collection: this.collection,
			id,
			data: jsonData,
			revision,
			created_at: now,
			updated_at: now
		}).onConflict((oc) => oc.columns([
			"plugin_id",
			"collection",
			"id"
		]).doNothing()).returning("revision").executeTakeFirst() : await this.db.updateTable("_plugin_storage").set({
			data: jsonData,
			revision,
			updated_at: now
		}).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).where("revision", "=", expectedRevision).returning("revision").executeTakeFirst();
		return row ? {
			applied: true,
			revision: row.revision
		} : { applied: false };
	}
	async compareAndDelete(id, expectedRevision) {
		assertStorageKey(id);
		assertStorageRevision(expectedRevision);
		return { applied: await this.db.deleteFrom("_plugin_storage").where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).where("revision", "=", expectedRevision).returning("id").executeTakeFirst() !== void 0 };
	}
	/**
	* Delete a document
	*/
	async delete(id) {
		return ((await this.db.deleteFrom("_plugin_storage").where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).executeTakeFirst()).numDeletedRows ?? 0) > 0;
	}
	/**
	* Check if a document exists
	*/
	async exists(id) {
		return !!await this.db.selectFrom("_plugin_storage").select("id").where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).executeTakeFirst();
	}
	/**
	* Get multiple documents by ID
	*/
	async getMany(ids) {
		if (ids.length === 0) return /* @__PURE__ */ new Map();
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks(ids, 50)) {
			const rows = await this.db.selectFrom("_plugin_storage").select(["id", "data"]).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "in", batch).execute();
			for (const row of rows) result.set(row.id, JSON.parse(row.data));
		}
		return result;
	}
	/**
	* Store multiple documents
	*/
	async putMany(items) {
		if (items.length === 0) return;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await withTransaction(this.db, async (trx) => {
			for (const item of items) {
				const jsonData = JSON.stringify(item.data);
				const revision = crypto.randomUUID();
				await trx.insertInto("_plugin_storage").values({
					plugin_id: this.pluginId,
					collection: this.collection,
					id: item.id,
					data: jsonData,
					revision,
					created_at: now,
					updated_at: now
				}).onConflict((oc) => oc.columns([
					"plugin_id",
					"collection",
					"id"
				]).doUpdateSet({
					data: jsonData,
					revision,
					updated_at: now
				})).execute();
			}
		});
	}
	/**
	* Delete multiple documents
	*/
	async deleteMany(ids) {
		if (ids.length === 0) return 0;
		return withTransaction(this.db, async (trx) => {
			let deleted = 0;
			for (const batch of chunks(ids, 50)) {
				const result = await trx.deleteFrom("_plugin_storage").where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "in", batch).executeTakeFirst();
				deleted += Number(result.numDeletedRows ?? 0);
			}
			return deleted;
		});
	}
	/**
	* Query documents with filters
	*/
	async query(options = {}) {
		const { where = {}, orderBy = {}, cursor } = options;
		const limit = Math.max(1, Math.min(options.limit ?? 50, 100));
		validateWhereClause(where, this.indexedFields, this.pluginId, this.collection);
		if (Object.keys(orderBy).length > 0) validateOrderByClause(orderBy, this.indexedFields, this.pluginId, this.collection);
		let query = this.db.selectFrom("_plugin_storage").select([
			"id",
			"data",
			"created_at"
		]).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection);
		const whereResult = buildWhereClause(this.db, where);
		if (whereResult.sql) query = query.where(rawWhereExpr(whereResult.sql, whereResult.params));
		const orderEntries = Object.entries(orderBy);
		const orderDirections = new Set(orderEntries.map(([, direction]) => direction));
		const descending = orderEntries.length > 0 && orderEntries[0][1] === "desc";
		const sortExpr = (field) => sql`${sql.raw(jsonOrderExtract(this.db, field))}`;
		if (cursor) {
			const decoded = decodeCursor(cursor);
			if (orderEntries.length === 0) query = query.where(({ eb }) => eb(sql`(created_at, id)`, ">", sql`(${decoded.orderValue}, ${decoded.id})`));
			else {
				if (orderDirections.size > 1) throw new StorageQueryError("Cursor pagination requires every orderBy field to share one direction.", Object.keys(orderBy).join(", "), "Sort every field the same way, or page without a cursor.");
				const op = descending ? sql`<` : sql`>`;
				const cursorSortValues = decoded.sortValues;
				const useCursorValues = cursorSortValues !== void 0 && cursorSortValues.length === orderEntries.length && (isPostgres(this.db) || cursorSortValues.every(isScalarSortBoundary));
				const cursorExpr = (field) => sql`(select ${sql.raw(jsonOrderExtract(this.db, field))} from _plugin_storage where plugin_id = ${this.pluginId} and collection = ${this.collection} and id = ${decoded.id})`;
				if (!useCursorValues) {
					if (!await this.db.selectFrom("_plugin_storage").select(sql`1`.as("one")).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", decoded.id).executeTakeFirst()) throw new InvalidCursorError(cursor);
				}
				const fields = orderEntries.map(([field], index) => {
					const own = sortExpr(field);
					const theirs = useCursorValues ? cursorFieldValue(this.db, cursorSortValues[index]) : cursorExpr(field);
					return {
						equal: sql`(${nullRank(own)} = ${nullRank(theirs)} and (${nullRank(own)} = 1 or ${own} = ${theirs}))`,
						after: sql`(${nullRank(own)} ${op} ${nullRank(theirs)} or (${nullRank(own)} = ${nullRank(theirs)} and ${nullRank(own)} = 0 and ${own} ${op} ${theirs}))`
					};
				});
				const terms = fields.map((_, k) => sql`(${sql.join([...fields.slice(0, k).map((f) => f.equal), fields[k].after], sql` and `)})`);
				terms.push(sql`(${sql.join([...fields.map((f) => f.equal), sql`id ${op} ${decoded.id}`], sql` and `)})`);
				query = query.where(sql`(${sql.join(terms, sql` or `)})`);
			}
		}
		if (orderEntries.length > 0) {
			for (const [field, direction] of orderEntries) {
				const dir = direction === "desc" ? sql`desc` : sql`asc`;
				const expr = sortExpr(field);
				query = query.orderBy(sql`${nullRank(expr)} ${dir}`);
				query = query.orderBy(sql`${expr} ${dir}`);
			}
			query = query.orderBy("id", descending ? "desc" : "asc");
		} else query = query.orderBy("created_at", "asc").orderBy("id", "asc");
		query = query.limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((row) => ({
			id: row.id,
			data: JSON.parse(row.data)
		}));
		let nextCursor;
		if (hasMore) {
			const lastItem = rows[limit - 1];
			if (lastItem) {
				let sortValues;
				if (orderEntries.length > 0) {
					const candidate = sortBoundaries(JSON.parse(lastItem.data), orderEntries.map(([field]) => field));
					if (candidate.every(isScalarSortBoundary)) sortValues = candidate;
				}
				nextCursor = encodeCursor(lastItem.created_at, lastItem.id, sortValues);
				if (nextCursor.length > 4096) nextCursor = encodeCursor(lastItem.created_at, lastItem.id, void 0);
			}
		}
		return {
			items,
			cursor: nextCursor,
			hasMore
		};
	}
	/**
	* Count documents matching a filter
	*/
	async count(where) {
		if (where && Object.keys(where).length > 0) validateWhereClause(where, this.indexedFields, this.pluginId, this.collection);
		let query = this.db.selectFrom("_plugin_storage").select(sql`COUNT(*)`.as("count")).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection);
		if (where && Object.keys(where).length > 0) {
			const whereResult = buildWhereClause(this.db, where);
			if (whereResult.sql) query = query.where(rawWhereExpr(whereResult.sql, whereResult.params));
		}
		const result = await query.executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	async updateIf(id, args) {
		if (typeof id !== "string") throw new TypeError("Storage ID must be a string");
		const { where, setEntries, deltaEntries } = parseStorageUpdate(args);
		for (const value of Object.values(where)) if (isInFilter(value) && value.in.length === 0) return { applied: false };
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const dataExpr = pluginDataWriteExpr(this.db, setEntries, deltaEntries);
		let query = this.db.updateTable("_plugin_storage").set({
			data: dataExpr,
			updated_at: now
		}).where("plugin_id", "=", this.pluginId).where("collection", "=", this.collection).where("id", "=", id).where(pluginDataUpdateGuard(this.db, deltaEntries));
		const whereResult = buildWhereClause(this.db, where);
		if (whereResult.sql) query = query.where(rawWhereExpr(whereResult.sql, whereResult.params));
		let row;
		try {
			row = await query.returning("data").executeTakeFirst();
		} catch (err) {
			throw mapSerializationFailure(err);
		}
		if (!row) return { applied: false };
		return {
			applied: true,
			data: JSON.parse(row.data)
		};
	}
};
var MAX_BYLINE_ENTRY_IDS = 100;
var DEFAULT_LIST_LIMIT = 50;
var MAX_LIST_LIMIT = 100;
function toBylineInfo(byline) {
	return {
		id: byline.id,
		slug: byline.slug,
		displayName: byline.displayName,
		bio: byline.bio,
		websiteUrl: byline.websiteUrl,
		avatarMediaId: byline.avatarMediaId,
		locale: byline.locale,
		translationGroup: byline.translationGroup ?? byline.id
	};
}
function toCreditInfo(credit) {
	return {
		byline: toBylineInfo(credit.byline),
		sortOrder: credit.sortOrder,
		roleLabel: credit.roleLabel,
		source: credit.source ?? "explicit"
	};
}
function clampListLimit(limit) {
	if (limit === void 0 || !Number.isFinite(limit)) return DEFAULT_LIST_LIMIT;
	return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIST_LIMIT);
}
function selectPublicBylines(db) {
	return db.selectFrom("_emdash_bylines").select([
		"id",
		"slug",
		"display_name as displayName",
		"bio",
		"website_url as websiteUrl",
		"avatar_media_id as avatarMediaId",
		"locale",
		"translation_group as translationGroup",
		"created_at as createdAt"
	]);
}
async function loadEntryRefs(db, collection, entryIds) {
	const tableName = `ec_${collection}`;
	const refs = [];
	for (const chunk of chunks(entryIds, 50)) {
		const result = await sql`
			SELECT id, author_id, primary_byline_id, locale FROM ${sql.ref(tableName)}
			WHERE id IN (${sql.join(chunk)})
			AND deleted_at IS NULL
		`.execute(db);
		for (const row of result.rows) refs.push({
			id: row.id,
			authorId: row.author_id,
			primaryBylineId: row.primary_byline_id,
			locale: row.locale
		});
	}
	return refs;
}
/**
* Create read-only byline access (gated on `bylines:read`).
*/
function createBylineAccess(db) {
	return {
		async get(id) {
			const row = await selectPublicBylines(db).where("id", "=", id).executeTakeFirst();
			return row ? toBylineInfo(row) : null;
		},
		async list(options) {
			const limit = clampListLimit(options?.limit);
			let query = selectPublicBylines(db).orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
			if (options?.locale !== void 0) query = query.where(localeMatches("locale", options.locale));
			if (options?.cursor) {
				const decoded = decodeCursor(options.cursor);
				query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
			}
			const rows = await query.execute();
			const pageRows = rows.slice(0, limit);
			const last = pageRows.at(-1);
			return {
				items: pageRows.map(toBylineInfo),
				hasMore: rows.length > limit,
				...rows.length > limit && last ? { cursor: encodeCursor(last.createdAt, last.id) } : {}
			};
		},
		async getEntriesBylines(collection, entryIds) {
			validateIdentifier(collection, "collection");
			const uniqueIds = [...new Set(entryIds)];
			if (uniqueIds.length > MAX_BYLINE_ENTRY_IDS) throw new Error(`Byline lookups accept at most ${MAX_BYLINE_ENTRY_IDS} entry IDs`);
			if (uniqueIds.length === 0) return [];
			const credits = await resolveBylineCredits(db, collection, await loadEntryRefs(db, collection, uniqueIds), { hydrateCustomFields: false });
			return uniqueIds.map((entryId) => ({
				entryId,
				bylines: (credits.get(entryId) ?? []).map(toCreditInfo)
			}));
		}
	};
}
function createContentAccess(db, accessOptions) {
	const contentRepo = new ContentRepository(db);
	const seoRepo = new SeoRepository(db);
	return {
		async get(collection, id) {
			const item = await contentRepo.findById(collection, id);
			if (!item) return null;
			const result = {
				id: item.id,
				type: item.type,
				slug: item.slug,
				status: item.status,
				data: item.data,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
				locale: item.locale,
				publishedAt: item.publishedAt,
				scheduledAt: item.scheduledAt,
				authorId: item.authorId,
				translationGroup: item.translationGroup,
				liveRevisionId: item.liveRevisionId,
				draftRevisionId: item.draftRevisionId,
				version: item.version
			};
			if (await seoRepo.isEnabled(collection)) result.seo = await seoRepo.get(collection, item.id);
			return result;
		},
		async list(collection, options) {
			let orderBy;
			if (options?.orderBy) {
				const first = Object.entries(options.orderBy)[0];
				if (first) orderBy = {
					field: first[0],
					direction: first[1]
				};
			}
			const result = await contentRepo.findMany(collection, {
				limit: options?.limit ?? 50,
				cursor: options?.cursor,
				orderBy,
				where: options?.where
			});
			const items = result.items.map((item) => ({
				id: item.id,
				type: item.type,
				slug: item.slug,
				status: item.status,
				data: item.data,
				createdAt: item.createdAt,
				updatedAt: item.updatedAt,
				locale: item.locale,
				publishedAt: item.publishedAt,
				scheduledAt: item.scheduledAt,
				authorId: item.authorId,
				translationGroup: item.translationGroup,
				liveRevisionId: item.liveRevisionId,
				draftRevisionId: item.draftRevisionId,
				version: item.version
			}));
			if (items.length > 0 && await seoRepo.isEnabled(collection)) {
				const seoMap = await seoRepo.getMany(collection, items.map((item) => item.id));
				for (const item of items) {
					const seo = seoMap.get(item.id);
					if (seo) item.seo = seo;
				}
			}
			return {
				items,
				cursor: result.nextCursor,
				hasMore: !!result.nextCursor
			};
		},
		async getTranslations(collection, id) {
			const item = await contentRepo.findById(collection, id);
			if (!item) throw new Error(`Content not found: ${collection}/${id}`);
			return {
				translationGroup: item.translationGroup || item.id,
				translations: (item.translationGroup ? await contentRepo.findTranslations(collection, item.translationGroup) : [item]).map((translation) => ({
					id: translation.id,
					locale: translation.locale,
					slug: translation.slug,
					status: translation.status,
					updatedAt: translation.updatedAt
				}))
			};
		},
		async getPublicUrl(collection, id) {
			const site = accessOptions?.site;
			if (!site?.url) return null;
			const [item, collectionInfo] = await Promise.all([contentRepo.findById(collection, id), new SchemaRegistry(db).getCollection(collection)]);
			if (!item || item.status !== "published" || !item.slug || !collectionInfo?.routable) return null;
			const path = await resolveLocalizedContentRoutePath({
				pattern: collectionInfo.urlPattern ?? null,
				collection,
				slug: item.slug,
				id: item.id,
				date: item.publishedAt,
				locale: item.locale || site.locale,
				trailingSlash: site.trailingSlash
			});
			return path === null ? null : `${site.url}${path}`;
		},
		...accessOptions?.revisions ? {
			async listRevisions(collection, id, revisionOptions) {
				return (await new RevisionRepository(db).findVisibleByEntry(collection, id, { limit: normalizeRevisionLimit(revisionOptions?.limit) })).map(({ authorId: _authorId, ...revision }) => revision);
			},
			async getRevision(collection, id, revisionId) {
				const revision = await new RevisionRepository(db).findVisibleById(collection, id, revisionId);
				if (!revision) return null;
				const { authorId: _authorId, ...safeRevision } = revision;
				return safeRevision;
			}
		} : {}
	};
}
var MAX_PLUGIN_MEDIA_READ_BYTES = 16777216;
function mediaUrl(item) {
	return `/_emdash/api/media/asset/${encodeURIComponent(item.id)}/${encodeURIComponent(item.filename)}`;
}
function toPluginMediaItem(item) {
	return {
		id: item.id,
		filename: item.filename,
		mimeType: item.mimeType,
		size: item.size,
		url: mediaUrl(item),
		createdAt: item.createdAt,
		width: item.width,
		height: item.height,
		alt: item.alt,
		caption: item.caption,
		focalX: item.focalX,
		focalY: item.focalY,
		blurhash: item.blurhash,
		dominantColor: item.dominantColor,
		folderId: item.folderId ?? null,
		status: "ready"
	};
}
function resolveByteLimit(maxBytes) {
	const limit = maxBytes ?? 10485760;
	if (!Number.isSafeInteger(limit) || limit <= 0 || limit > 16777216) throw new RangeError(`media.readBytes maxBytes must be a positive integer no greater than ${MAX_PLUGIN_MEDIA_READ_BYTES}`);
	return limit;
}
async function readStreamWithLimit(body, maxBytes) {
	const reader = body.getReader();
	const chunks = [];
	let size = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > maxBytes) {
				try {
					await reader.cancel();
				} catch {}
				throw new PluginMediaByteLimitError(`Media exceeds the requested ${maxBytes}-byte limit`);
			}
			chunks.push(value);
		}
	} finally {
		reader.releaseLock();
	}
	const bytes = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return bytes;
}
var PluginMediaByteLimitError = class extends RangeError {};
async function readPluginMediaBytes(db, storage, id, options) {
	if (!storage) throw new Error("Media storage is not configured");
	const limit = resolveByteLimit(options?.maxBytes);
	const item = await new MediaRepository(db).findById(id);
	if (!item || item.status !== "ready") throw new Error("Media item is not ready or does not exist");
	let bytes;
	try {
		bytes = await readStreamWithLimit((await storage.download(item.storageKey)).body, limit);
	} catch (error) {
		if (error instanceof PluginMediaByteLimitError) throw error;
		throw new Error("Failed to read media bytes");
	}
	return {
		bytes,
		filename: item.filename,
		mimeType: item.mimeType,
		size: bytes.byteLength,
		...item.contentHash ? { contentHash: item.contentHash } : {}
	};
}
async function updatePluginMediaMetadata(db, id, patch) {
	const parsed = parsePluginMediaMetadataPatch(patch);
	const item = await new MediaRepository(db).updateReadyMetadata(id, parsed);
	if (!item) throw new Error("Media item is not ready or does not exist");
	return toPluginMediaItem(item);
}
var MEDIA_METADATA_KEYS = /* @__PURE__ */ new Set([
	"alt",
	"caption",
	"focalX",
	"focalY"
]);
function parsePluginMediaMetadataPatch(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new TypeError("media.updateMetadata patch must be an object");
	const keys = Object.keys(value);
	if (keys.length === 0) throw new TypeError("media.updateMetadata must change at least one metadata field");
	for (const key of keys) if (!MEDIA_METADATA_KEYS.has(key)) throw new TypeError(`media.updateMetadata cannot change ${key}`);
	const alt = Reflect.get(value, "alt");
	const caption = Reflect.get(value, "caption");
	const focalX = Reflect.get(value, "focalX");
	const focalY = Reflect.get(value, "focalY");
	if (alt !== void 0 && alt !== null && typeof alt !== "string") throw new TypeError("media.updateMetadata alt must be a string or null");
	if (caption !== void 0 && caption !== null && typeof caption !== "string") throw new TypeError("media.updateMetadata caption must be a string or null");
	if (focalX !== void 0 && focalX !== null && typeof focalX !== "number") throw new TypeError("media.updateMetadata focalX must be a number or null");
	if (focalY !== void 0 && focalY !== null && typeof focalY !== "number") throw new TypeError("media.updateMetadata focalY must be a number or null");
	const patch = {};
	if (alt !== void 0) patch.alt = alt;
	if (caption !== void 0) patch.caption = caption;
	if (focalX !== void 0) patch.focalX = focalX;
	if (focalY !== void 0) patch.focalY = focalY;
	if (!isValidFocalPointUpdate(patch)) throw new TypeError("focalX and focalY must both be valid numbers or both be null");
	return patch;
}
/**
* Error class for plugin routes
* Allows plugins to return structured errors with specific HTTP status codes
*/
var PluginRouteError = class PluginRouteError extends Error {
	constructor(code, message, status = 400, details) {
		super(message);
		this.code = code;
		this.status = status;
		this.details = details;
		this.name = "PluginRouteError";
	}
	/**
	* Create a bad request error (400)
	*/
	static badRequest(message, details) {
		return new PluginRouteError("BAD_REQUEST", message, 400, details);
	}
	/**
	* Create an unauthorized error (401)
	*/
	static unauthorized(message = "Unauthorized") {
		return new PluginRouteError("UNAUTHORIZED", message, 401);
	}
	/**
	* Create a forbidden error (403)
	*/
	static forbidden(message = "Forbidden") {
		return new PluginRouteError("FORBIDDEN", message, 403);
	}
	/**
	* Create a not found error (404)
	*/
	static notFound(message = "Not found") {
		return new PluginRouteError("NOT_FOUND", message, 404);
	}
	/**
	* Create a conflict error (409)
	*/
	static conflict(message, details) {
		return new PluginRouteError("CONFLICT", message, 409, details);
	}
	/**
	* Create an internal error (500)
	*/
	static internal(message = "Internal error") {
		return new PluginRouteError("INTERNAL_ERROR", message, 500);
	}
};
/**
* Check whether a thrown value is a PluginRouteError.
*
* Also matches on shape, not just `instanceof`: under `astro dev`, Vite can load a
* plugin's `emdash` import as a separate module instance, so the error the plugin
* throws comes from a different copy of this class.
*/
function isPluginRouteError(error) {
	if (error instanceof PluginRouteError) return true;
	if (!(error instanceof Error) || error.name !== "PluginRouteError") return false;
	const { code, status } = error;
	return typeof code === "string" && typeof status === "number";
}
/**
* Create KV accessor for a plugin
* All keys are automatically prefixed with the plugin ID
*/
function createKVAccess(optionsRepo, pluginId, settings = createSettingsAccess(optionsRepo, pluginId)) {
	const prefix = `plugin:${pluginId}:`;
	return {
		async get(key) {
			if (key.startsWith("settings:")) return settings.get(key.slice(9));
			return optionsRepo.get(`${prefix}${key}`);
		},
		async getVersioned(key) {
			assertStorageKey(key);
			if (key.startsWith("settings:")) return settings.getVersioned(key.slice(9));
			return optionsRepo.getVersioned(`${prefix}${key}`);
		},
		async compareAndSet(key, expectedRevision, value) {
			assertStorageKey(key);
			if (key.startsWith("settings:")) return settings.compareAndSet(key.slice(9), expectedRevision, value);
			return optionsRepo.compareAndSet(`${prefix}${key}`, expectedRevision, value);
		},
		async compareAndDelete(key, expectedRevision) {
			assertStorageKey(key);
			if (key.startsWith("settings:")) return settings.compareAndDelete(key.slice(9), expectedRevision);
			return optionsRepo.compareAndDelete(`${prefix}${key}`, expectedRevision);
		},
		async set(key, value) {
			if (key.startsWith("settings:")) {
				await settings.set(key.slice(9), value);
				return;
			}
			await optionsRepo.set(`${prefix}${key}`, value);
		},
		async delete(key) {
			if (key.startsWith("settings:")) return settings.delete(key.slice(9));
			return optionsRepo.delete(`${prefix}${key}`);
		},
		async list(keyPrefix) {
			const requestedPrefix = keyPrefix ?? "";
			const includesSettings = "settings:".startsWith(requestedPrefix) || requestedPrefix.startsWith("settings:");
			const fullPrefix = `${prefix}${requestedPrefix}`;
			const entriesMap = requestedPrefix.startsWith("settings:") ? /* @__PURE__ */ new Map() : await optionsRepo.getByPrefix(fullPrefix);
			const result = [];
			for (const [fullKey, value] of entriesMap) {
				if (includesSettings && fullKey.startsWith(`${prefix}settings:`)) continue;
				result.push({
					key: fullKey.slice(prefix.length),
					value
				});
			}
			if (includesSettings) {
				const settingPrefix = requestedPrefix.startsWith("settings:") ? requestedPrefix.slice(9) : "";
				for (const entry of await settings.list(settingPrefix)) {
					const key = `settings:${entry.key}`;
					if (key.startsWith(requestedPrefix)) result.push({
						key,
						value: entry.value
					});
				}
			}
			return result;
		}
	};
}
/**
* Create storage collection accessor for a plugin
* Wraps PluginStorageRepository with the v2 interface (no async iterators)
*/
function createStorageCollection(db, pluginId, collectionName, indexes) {
	const repo = new PluginStorageRepository(db, pluginId, collectionName, indexes);
	return {
		get: (id) => repo.get(id),
		getVersioned: (id) => repo.getVersioned(id),
		compareAndSet: (id, expectedRevision, data) => repo.compareAndSet(id, expectedRevision, data),
		compareAndDelete: (id, expectedRevision) => repo.compareAndDelete(id, expectedRevision),
		put: (id, data) => repo.put(id, data),
		delete: (id) => repo.delete(id),
		exists: (id) => repo.exists(id),
		getMany: (ids) => repo.getMany(ids),
		putMany: (items) => repo.putMany(items),
		deleteMany: (ids) => repo.deleteMany(ids),
		count: (where) => repo.count(where),
		updateIf: (id, updateArgs) => repo.updateIf(id, updateArgs),
		async query(options) {
			const result = await repo.query({
				where: options?.where,
				orderBy: options?.orderBy,
				limit: options?.limit,
				cursor: options?.cursor
			});
			return {
				items: result.items,
				cursor: result.cursor,
				hasMore: result.hasMore
			};
		}
	};
}
/**
* Create storage accessor with all declared collections
*/
function createStorageAccess(db, pluginId, storageConfig) {
	const storage = {};
	for (const [collectionName, config] of Object.entries(storageConfig)) storage[collectionName] = createStorageCollection(db, pluginId, collectionName, [...config.indexes, ...config.uniqueIndexes ?? []]);
	return storage;
}
/**
* Extract `seo` from a plugin-supplied content write input and return both
* parts. Mutates nothing — returns a new field map without the `seo` key.
*/
function splitSeoFromInput(input) {
	const { seo, ...fields } = input;
	if (seo !== void 0 && (seo === null || typeof seo !== "object" || Array.isArray(seo))) throw new Error("content.seo must be an object");
	return {
		fields,
		seo
	};
}
/**
* Reject writing SEO to a collection that does not have it enabled.
* Matches the REST API behavior (VALIDATION_ERROR).
*/
async function assertSeoEnabled(seoRepo, collection, seo) {
	const hasSeo = await seoRepo.isEnabled(collection);
	if (seo !== void 0 && !hasSeo) throw new Error(`Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`);
	return hasSeo;
}
/**
* Parse the `collections` JSON column into a string array (`[]` on anything
* else). Mirrors the guards in the Cloudflare/workerd bridges so an
* in-process plugin degrades on malformed data instead of crashing.
*/
function parseCollectionsColumn(value) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
	} catch {
		return [];
	}
}
/** Map a repository `Taxonomy` row to the plugin-facing term shape. */
function taxonomyToTermInfo(term) {
	return {
		id: term.id,
		taxonomy: term.name,
		slug: term.slug,
		label: term.label,
		parentId: term.parentId,
		data: term.data,
		locale: term.locale,
		translationGroup: term.translationGroup
	};
}
function collectionToSchemaInfo(collection) {
	if (!collection) return null;
	return {
		slug: collection.slug,
		label: collection.label,
		labelSingular: collection.labelSingular ?? null,
		description: collection.description ?? null,
		supports: collection.supports,
		hasSeo: collection.hasSeo,
		titleField: collection.titleField ?? null,
		dateField: collection.dateField ?? null,
		urlPattern: collection.urlPattern ?? null,
		routable: collection.routable !== false,
		hidden: collection.hidden,
		fields: collection.fields.map((field) => ({
			slug: field.slug,
			label: field.label,
			type: field.type,
			required: field.required,
			unique: field.unique,
			...field.defaultValue === void 0 ? {} : { default: field.defaultValue },
			...field.validation === void 0 ? {} : { validation: field.validation },
			...field.widget === void 0 ? {} : { widget: field.widget },
			...field.options === void 0 ? {} : { options: field.options },
			searchable: field.searchable,
			indexed: field.indexed,
			translatable: field.translatable,
			sortOrder: field.sortOrder
		}))
	};
}
function createSchemaAccess(db) {
	const registry = new SchemaRegistry(db);
	return {
		async listCollections() {
			const collections = [];
			for (const collection of await registry.listCollectionsWithFields()) {
				const info = collectionToSchemaInfo(collection);
				if (info) collections.push(info);
			}
			return collections;
		},
		async getCollection(slug) {
			return collectionToSchemaInfo(await registry.getCollectionWithFields(slug));
		}
	};
}
/**
* Create read-only taxonomy access (gated on `taxonomies:read`).
*/
function createTaxonomyAccess(db) {
	const taxonomyRepo = new TaxonomyRepository(db);
	return {
		async getAll(options) {
			return (await selectTaxonomyDefs(db, options?.locale).orderBy("d.name", "asc").execute()).map((row) => ({
				name: row.name,
				label: row.label,
				labelSingular: row.label_singular,
				hierarchical: row.hierarchical === 1,
				collections: parseCollectionsColumn(row.collections),
				locale: row.locale
			}));
		},
		async getTerms(taxonomy, options) {
			return (await taxonomyRepo.findByName(taxonomy, { locale: options?.locale })).map(taxonomyToTermInfo);
		},
		async getEntryTerms(collection, entryId, options) {
			return (await taxonomyRepo.getTermsForEntry(collection, entryId, options?.taxonomy, options?.locale)).map(taxonomyToTermInfo);
		}
	};
}
function toPluginComment(comment) {
	if (comment.status === "trash") throw new Error("Trashed comments are not plugin-readable");
	return {
		id: comment.id,
		collection: comment.collection,
		contentId: comment.contentId,
		parentId: comment.parentId,
		authorName: comment.authorName,
		authorEmail: comment.authorEmail,
		body: comment.body,
		status: comment.status,
		ipHash: comment.ipHash,
		userAgent: comment.userAgent,
		moderationMetadata: comment.moderationMetadata,
		createdAt: comment.createdAt,
		updatedAt: comment.updatedAt
	};
}
function createCommentAccess(db, moderate) {
	const repo = new CommentRepository(db);
	return {
		async get(id) {
			const comment = await repo.findById(id);
			return !comment || comment.status === "trash" ? null : toPluginComment(comment);
		},
		async list(options = {}) {
			const result = await repo.findForPlugin(options);
			return {
				items: result.items.map(toPluginComment),
				cursor: result.nextCursor,
				hasMore: result.nextCursor !== void 0
			};
		},
		count: (options) => repo.countForPlugin(options),
		...moderate ? { setStatus: (id, status, options) => moderate(id, status, options.expectedStatus) } : {}
	};
}
var RedirectAccessError = class extends Error {
	name = "RedirectAccessError";
	constructor(code, message) {
		super(message);
		this.code = code;
	}
};
var REDIRECT_REVISION_PREFIX = "r1.";
var BASE64_PADDING_RE = /=+$/;
function encodeRedirectRevision(id, revision) {
	const payload = `${id}\0${revision}`;
	return `${REDIRECT_REVISION_PREFIX}${btoa(payload).replaceAll("+", "-").replaceAll("/", "_").replace(BASE64_PADDING_RE, "")}`;
}
function decodeRedirectRevision(id, revision) {
	if (typeof revision !== "string" || !revision.startsWith(REDIRECT_REVISION_PREFIX)) throw new RedirectAccessError("INVALID_PRECONDITION", "Invalid redirect revision");
	try {
		const encoded = revision.slice(3).replaceAll("-", "+").replaceAll("_", "/");
		const padded = encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=");
		const [revisionId, updatedAt, extra] = atob(padded).split("\0");
		if (revisionId !== id || !updatedAt || extra !== void 0) throw new Error("invalid");
		return updatedAt;
	} catch (error) {
		if (error instanceof RedirectAccessError) throw error;
		throw new RedirectAccessError("INVALID_PRECONDITION", "Invalid redirect revision");
	}
}
function toRedirectInfo(redirect) {
	return {
		...redirect,
		type: redirect.type
	};
}
function toVersionedRedirect(record) {
	return {
		redirect: toRedirectInfo(record.redirect),
		_rev: encodeRedirectRevision(record.redirect.id, record.configRevision)
	};
}
async function readVersionedRedirect(repo, id) {
	const record = await repo.findVersionedById(id);
	return record ? toVersionedRedirect(record) : null;
}
function throwRedirectResult(error) {
	throw new RedirectAccessError(error.code, error.message);
}
function assertNoAutomaticRedirectMarker(input) {
	if (typeof input !== "object" || input === null || Array.isArray(input)) throw new RedirectAccessError("VALIDATION_ERROR", "Redirect input must be an object");
	if (Object.hasOwn(input, "auto")) throw new RedirectAccessError("VALIDATION_ERROR", "The automatic redirect marker is managed by EmDash");
}
function createRedirectAccess(db, writable = false) {
	const repo = new RedirectRepository(db);
	const readAccess = {
		async list(options = {}) {
			const result = await handleRedirectList(db, options);
			if (!result.success) return throwRedirectResult(result.error);
			return {
				items: result.data.items.map(toRedirectInfo),
				cursor: result.data.nextCursor,
				hasMore: result.data.nextCursor !== void 0
			};
		},
		get: (id) => readVersionedRedirect(repo, id)
	};
	if (!writable) return readAccess;
	return {
		...readAccess,
		async create(input) {
			assertNoAutomaticRedirectMarker(input);
			const parsed = createRedirectBody.safeParse(input);
			if (!parsed.success) throw new RedirectAccessError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid redirect");
			const result = await handleRedirectCreate(db, parsed.data);
			if (!result.success) return throwRedirectResult(result.error);
			const current = await readVersionedRedirect(repo, result.data.id);
			if (!current) throw new RedirectAccessError("NOT_FOUND", "Created redirect not found");
			return current;
		},
		async update(id, input) {
			assertNoAutomaticRedirectMarker(input);
			const { _rev, ...patch } = input;
			const expectedRevision = decodeRedirectRevision(id, _rev);
			const parsed = updateRedirectBody.safeParse(patch);
			if (!parsed.success) throw new RedirectAccessError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Invalid redirect");
			const result = await handleRedirectUpdate(db, id, parsed.data, { expectedRevision });
			if (!result.success) return throwRedirectResult(result.error);
			const current = await readVersionedRedirect(repo, result.data.id);
			if (!current) throw new RedirectAccessError("NOT_FOUND", "Updated redirect not found");
			return current;
		},
		async delete(id, options) {
			if (typeof options !== "object" || options === null) throw new RedirectAccessError("INVALID_PRECONDITION", "Invalid redirect revision");
			const result = await handleRedirectDelete(db, id, { expectedRevision: decodeRedirectRevision(id, options._rev) });
			if (!result.success) return throwRedirectResult(result.error);
			return result.data.deleted;
		}
	};
}
var MAX_TAXONOMY_DELTA_TERMS = 64;
function taxonomyAccessError(code, message) {
	return Object.assign(new Error(message), { code });
}
async function resolveTaxonomyDelta(db, collection, entryId, taxonomy, termIds) {
	if (termIds.length > MAX_TAXONOMY_DELTA_TERMS) throw taxonomyAccessError("VALIDATION_ERROR", `A taxonomy assignment delta can contain at most ${MAX_TAXONOMY_DELTA_TERMS} term IDs`);
	if (termIds.some((id) => typeof id !== "string" || id.length === 0)) throw taxonomyAccessError("VALIDATION_ERROR", "Taxonomy term IDs must be non-empty strings");
	const structure = await findTaxonomyStructure(db, taxonomy);
	if (!structure) throw taxonomyAccessError("NOT_FOUND", `Taxonomy '${taxonomy}' not found`);
	if (!structure.collections.includes(collection)) throw taxonomyAccessError("VALIDATION_ERROR", `Taxonomy '${taxonomy}' is not attached to collection '${collection}'`);
	const entry = await new ContentRepository(db).findById(collection, entryId);
	if (!entry) throw taxonomyAccessError("NOT_FOUND", `Content entry '${entryId}' not found in '${collection}'`);
	const repo = new TaxonomyRepository(db);
	const groups = [];
	for (const id of new Set(termIds)) {
		const term = await repo.findByIdOrTranslationGroup(id);
		if (!term) throw taxonomyAccessError("NOT_FOUND", `Taxonomy term '${id}' not found`);
		if (term.name !== taxonomy) throw taxonomyAccessError("VALIDATION_ERROR", `Taxonomy term '${id}' belongs to '${term.name}', not '${taxonomy}'`);
		groups.push(term.translationGroup ?? term.id);
	}
	return {
		repo,
		groups,
		locale: entry.locale ?? getI18nConfig()?.defaultLocale ?? "en"
	};
}
async function readResolvedEntryTerms(repo, collection, entryId, taxonomy, locale) {
	const defaultLocale = getI18nConfig()?.defaultLocale ?? locale;
	return (await repo.getTermAssignmentsForEntry(collection, entryId, taxonomy, locale, defaultLocale)).flatMap(({ term }) => term ? [taxonomyToTermInfo(term)] : []);
}
function createTaxonomyAccessWithWrite(db) {
	return {
		...createTaxonomyAccess(db),
		async createTerm(taxonomy, input) {
			const result = await handleTermCreate(db, taxonomy, input);
			if (!result.success) throw taxonomyAccessError(result.error.code, result.error.message);
			const { term } = result.data;
			return {
				id: term.id,
				taxonomy: term.name,
				slug: term.slug,
				label: term.label,
				parentId: term.parentId,
				data: term.description ? { description: term.description } : null,
				locale: term.locale,
				translationGroup: term.translationGroup
			};
		},
		async addEntryTerms(collection, entryId, taxonomy, termIds) {
			const { repo, groups, locale } = await resolveTaxonomyDelta(db, collection, entryId, taxonomy, termIds);
			await repo.attachGroupsToEntry(collection, entryId, groups);
			return readResolvedEntryTerms(repo, collection, entryId, taxonomy, locale);
		},
		async removeEntryTerms(collection, entryId, taxonomy, termIds) {
			const { repo, groups, locale } = await resolveTaxonomyDelta(db, collection, entryId, taxonomy, termIds);
			await repo.detachGroupsFromEntry(collection, entryId, groups);
			return readResolvedEntryTerms(repo, collection, entryId, taxonomy, locale);
		}
	};
}
async function afterContentWrite(recordWrite) {
	if (typeof recordWrite === "function") await recordWrite();
}
/**
* Create full content access with write operations.
*
* `create` and `update` accept a reserved `seo` key in their `data`
* argument. When present, it is routed to the core SEO panel
* (`_emdash_seo`) via `SeoRepository.upsert`, in the same transaction as
* the content write. The returned `ContentItem.seo` reflects the resulting
* SEO state for SEO-enabled collections.
*/
function createContentAccessWithWrite(db, beforeContentWrite, accessOptions, contentCreate) {
	return {
		...createContentAccess(db, accessOptions),
		async create(collection, data, options) {
			const locale = resolveContentCreateLocale(options?.locale);
			const recordWrite = await beforeContentWrite?.();
			if (contentCreate) {
				const created = await contentCreate({
					collection,
					input: data,
					options: {
						...options,
						locale
					}
				});
				await afterContentWrite(recordWrite);
				return created;
			}
			const { fields, seo } = splitSeoFromInput(data);
			let contentMutated = false;
			try {
				const created = await withTransaction(db, async (trx) => {
					const trxContentRepo = new ContentRepository(trx);
					const trxSeoRepo = new SeoRepository(trx);
					const hasSeo = await assertSeoEnabled(trxSeoRepo, collection, seo);
					const item = await trxContentRepo.create({
						type: collection,
						data: fields,
						locale,
						translationOf: options?.translationOf
					});
					contentMutated = true;
					const result = {
						id: item.id,
						type: item.type,
						slug: item.slug,
						status: item.status,
						data: item.data,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
						locale: item.locale,
						publishedAt: item.publishedAt,
						scheduledAt: item.scheduledAt
					};
					if (hasSeo) result.seo = seo !== void 0 ? await trxSeoRepo.upsert(collection, item.id, seo) : await trxSeoRepo.get(collection, item.id);
					return result;
				});
				await markContentMediaUsageCollectionStaleSafely(db, collection, "CONTENT_USAGE_STALE");
				await afterContentWrite(recordWrite);
				return created;
			} catch (error) {
				if (contentMutated) await markContentMediaUsageCollectionStaleSafely(db, collection, "CONTENT_USAGE_STALE");
				throw error;
			}
		},
		async update(collection, id, data) {
			const recordWrite = await beforeContentWrite?.();
			const { fields, seo } = splitSeoFromInput(data);
			const hasFieldUpdates = Object.keys(fields).length > 0;
			let contentMutated = false;
			try {
				const updated = await withTransaction(db, async (trx) => {
					const trxContentRepo = new ContentRepository(trx);
					const trxSeoRepo = new SeoRepository(trx);
					const hasSeo = await assertSeoEnabled(trxSeoRepo, collection, seo);
					const item = hasFieldUpdates ? await trxContentRepo.updateDraftAware(collection, id, { data: fields }) : await (async () => {
						const existing = await trxContentRepo.findById(collection, id);
						if (!existing) throw new Error("Content not found");
						return existing;
					})();
					if (hasFieldUpdates) contentMutated = true;
					const result = {
						id: item.id,
						type: item.type,
						slug: item.slug,
						status: item.status,
						data: item.data,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
						locale: item.locale,
						publishedAt: item.publishedAt,
						scheduledAt: item.scheduledAt
					};
					if (hasSeo) result.seo = seo !== void 0 ? await trxSeoRepo.upsert(collection, item.id, seo) : await trxSeoRepo.get(collection, item.id);
					return result;
				});
				if (hasFieldUpdates) await markContentMediaUsageCollectionStaleSafely(db, collection, "CONTENT_USAGE_STALE");
				await afterContentWrite(recordWrite);
				return updated;
			} catch (error) {
				if (contentMutated) await markContentMediaUsageCollectionStaleSafely(db, collection, "CONTENT_USAGE_STALE");
				throw error;
			}
		},
		async delete(collection, id) {
			const recordWrite = await beforeContentWrite?.();
			const deleted = await new ContentRepository(db).delete(collection, id);
			if (deleted) {
				await new EntryLockRepository(db).releaseEntry(collection, id);
				await markContentMediaUsageCollectionStaleSafely(db, collection, "CONTENT_USAGE_STALE");
				await afterContentWrite(recordWrite);
			}
			return deleted;
		}
	};
}
/**
* Create read-only media access
*/
function createMediaAccess(db) {
	const mediaRepo = new MediaRepository(db);
	return {
		async get(id) {
			const item = await mediaRepo.findById(id);
			return item?.status === "ready" ? toPluginMediaItem(item) : null;
		},
		async list(options) {
			const result = await mediaRepo.findMany({
				limit: options?.limit ?? 50,
				cursor: options?.cursor,
				mimeType: options?.mimeType
			});
			return {
				items: result.items.map(toPluginMediaItem),
				cursor: result.nextCursor,
				hasMore: !!result.nextCursor
			};
		}
	};
}
function mediaReadDenied() {
	throw new Error("Missing capability: media:read");
}
function createBlockedMediaReadAccess() {
	return {
		get: async () => mediaReadDenied(),
		list: async () => mediaReadDenied()
	};
}
function allowedUploadType(contentType) {
	if (!CONTENT_TYPE_RE.test(contentType)) throw PluginRouteError.badRequest("Invalid content type");
	const mimeType = normalizeMime(contentType);
	if (!matchesMimeAllowlist(mimeType, GLOBAL_UPLOAD_ALLOWLIST)) throw new PluginRouteError("UNSUPPORTED_MEDIA_TYPE", "File type not allowed", 415);
	return mimeType;
}
function uploadStorageKey(filename, mimeType) {
	const keyPrefix = ulid();
	const basename = filename.split("/").pop() ?? filename;
	const dotIdx = basename.lastIndexOf(".");
	const nameExt = dotIdx > 0 ? basename.slice(dotIdx + 1).toLowerCase() : "";
	const nameType = mime.getType(nameExt);
	const nameExtAllowed = nameType !== null && matchesMimeAllowlist(nameType, GLOBAL_UPLOAD_ALLOWLIST);
	const ext = nameType === mimeType ? nameExt : mime.getExtension(mimeType) ?? (nameExtAllowed ? nameExt : null);
	return {
		basename,
		storageKey: ext ? `${keyPrefix}.${ext}` : keyPrefix
	};
}
/**
* Create full media access with write operations.
*
* `getUploadUrlFn` is optional: when omitted, `getUploadUrl()` is derived from
* `storage` (create a pending record + a signed PUT URL), mirroring the REST
* `/_emdash/api/media/upload-url` endpoint. `upload()` only needs `storage`.
* If storage is not provided, both throw at call time.
*/
function createMediaAccessWithWrite(db, getUploadUrlFn, storage) {
	const mediaRepo = new MediaRepository(db);
	const readAccess = createMediaAccess(db);
	const getUploadUrl = getUploadUrlFn ? async (filename, contentType) => getUploadUrlFn(filename, allowedUploadType(contentType)) : async (filename, contentType) => {
		if (!storage) throw new Error("Media getUploadUrl() requires a storage backend. Configure storage in PluginContextFactoryOptions.");
		const mimeType = allowedUploadType(contentType);
		const { basename, storageKey } = uploadStorageKey(filename, mimeType);
		const media = await mediaRepo.createPending({
			filename: basename,
			mimeType,
			storageKey
		});
		return {
			uploadUrl: (await storage.getSignedUploadUrl({
				key: storageKey,
				contentType: mimeType,
				expiresIn: 3600
			})).url,
			mediaId: media.id
		};
	};
	return {
		...readAccess,
		getUploadUrl,
		async upload(filename, contentType, bytes) {
			if (!storage) throw new Error("Media upload() requires a storage backend. Configure storage in PluginContextFactoryOptions.");
			const mimeType = allowedUploadType(contentType);
			const { basename, storageKey } = uploadStorageKey(filename, mimeType);
			await storage.upload({
				key: storageKey,
				body: new Uint8Array(bytes),
				contentType: mimeType
			});
			const enriched = await enrichImageMetadata(new Uint8Array(bytes), mimeType);
			let media;
			try {
				media = await mediaRepo.create({
					filename: basename,
					mimeType,
					size: bytes.byteLength,
					storageKey,
					status: "ready",
					width: enriched.width,
					height: enriched.height,
					blurhash: enriched.blurhash,
					dominantColor: enriched.dominantColor
				});
			} catch (error) {
				try {
					await storage.delete(storageKey);
				} catch {}
				throw error;
			}
			return {
				mediaId: media.id,
				storageKey,
				url: `/_emdash/api/media/file/${storageKey}`
			};
		},
		async delete(id) {
			const result = await handleMediaDelete(db, id, storage);
			if (!result.success) {
				if (result.error.code === "NOT_FOUND") return false;
				throw new Error(result.error.message);
			}
			invalidateSiteSettingsCache();
			return true;
		}
	};
}
/** Maximum number of redirects to follow in plugin HTTP access */
var MAX_PLUGIN_REDIRECTS = 5;
function stripTrailingDots(value) {
	let end = value.length;
	while (end > 0 && value.charCodeAt(end - 1) === 46) end--;
	return end === value.length ? value : value.slice(0, end);
}
/**
* Check if a hostname matches any pattern in the allowed list.
* Patterns: "*" matches all, "*.example.com" matches subdomains AND bare "example.com",
* "api.example.com" matches exactly.
*/
function isHostAllowed(host, allowedHosts) {
	const normalizedHost = stripTrailingDots(host.toLowerCase());
	return allowedHosts.some((pattern) => {
		const normalizedPattern = stripTrailingDots(pattern.toLowerCase());
		if (normalizedPattern === "*") return true;
		if (normalizedPattern.startsWith("*.")) {
			const suffix = normalizedPattern.slice(1);
			return normalizedHost.endsWith(suffix) || normalizedHost === normalizedPattern.slice(2);
		}
		return normalizedHost === normalizedPattern;
	});
}
function tryParsePluginHttpTarget(url) {
	try {
		return new URL(url);
	} catch {
		return null;
	}
}
async function validatePluginHttpTarget(pluginId, url) {
	try {
		return await resolveAndValidateExternalUrl(url);
	} catch (error) {
		const message = error instanceof SsrfError ? error.message : "SSRF validation failed";
		const target = tryParsePluginHttpTarget(url);
		throw new Error(`Plugin "${pluginId}": blocked fetch to "${target ? target.hostname : "invalid URL"}": ${message}`, { cause: error });
	}
}
/**
* Create HTTP access with host validation and SSRF protection.
*
* Uses redirect: "manual" to re-validate each redirect target before dispatch.
*/
function createHttpAccess(pluginId, allowedHosts, fetchImpl = globalThis.fetch) {
	return { async fetch(url, init) {
		if (allowedHosts.length === 0) throw new Error(`Plugin "${pluginId}" has no allowed hosts configured. Add hosts to the plugin's allowedHosts array to enable HTTP requests.`);
		let currentUrl = url;
		let currentInit = init;
		let requestBuffered = false;
		let redirected = false;
		for (let i = 0; i <= MAX_PLUGIN_REDIRECTS; i++) {
			const target = tryParsePluginHttpTarget(currentUrl);
			if (target && !isHostAllowed(target.hostname, allowedHosts)) throw new Error(`Plugin "${pluginId}" is not allowed to fetch from host "${target.hostname}". Allowed hosts: ${allowedHosts.join(", ")}`);
			await validatePluginHttpTarget(pluginId, currentUrl);
			if (!requestBuffered) {
				currentInit = await bufferPluginHttpRequest(currentInit);
				requestBuffered = true;
			}
			const response = await fetchImpl(currentUrl, {
				...currentInit,
				redirect: "manual"
			});
			const location = response.headers.get("Location");
			if (location === null) return pluginHttpResponseFromWire(await pluginHttpResponseToWire(response, currentUrl, redirected));
			const redirectAction = pluginHttpRedirectAction(response.status, true, currentInit);
			if (redirectAction === "return") return pluginHttpResponseFromWire(await pluginHttpResponseToWire(response, currentUrl, redirected));
			await response.body?.cancel();
			if (redirectAction === "error") throw new Error(`Plugin "${pluginId}": redirect mode is "error"`);
			const previousOrigin = new URL(currentUrl).origin;
			currentUrl = new URL(location, currentUrl).href;
			redirected = true;
			const nextOrigin = new URL(currentUrl).origin;
			currentInit = rewritePluginHttpRedirect(response.status, currentInit);
			if (previousOrigin !== nextOrigin && currentInit) currentInit = stripCredentialHeaders(currentInit);
		}
		throw new Error(`Plugin "${pluginId}": too many redirects (max ${MAX_PLUGIN_REDIRECTS})`);
	} };
}
/**
* Create unrestricted HTTP access (for plugins with network:request:unrestricted capability).
* No host validation, but applies SSRF protection on redirect targets to
* prevent plugins from being tricked into reaching internal services.
*/
function createUnrestrictedHttpAccess(pluginId, fetchImpl = globalThis.fetch) {
	return { async fetch(url, init) {
		let currentUrl = url;
		let currentInit = init;
		let requestBuffered = false;
		let redirected = false;
		for (let i = 0; i <= MAX_PLUGIN_REDIRECTS; i++) {
			await validatePluginHttpTarget(pluginId, currentUrl);
			if (!requestBuffered) {
				currentInit = await bufferPluginHttpRequest(currentInit);
				requestBuffered = true;
			}
			const response = await fetchImpl(currentUrl, {
				...currentInit,
				redirect: "manual"
			});
			const location = response.headers.get("Location");
			if (location === null) return pluginHttpResponseFromWire(await pluginHttpResponseToWire(response, currentUrl, redirected));
			const redirectAction = pluginHttpRedirectAction(response.status, true, currentInit);
			if (redirectAction === "return") return pluginHttpResponseFromWire(await pluginHttpResponseToWire(response, currentUrl, redirected));
			await response.body?.cancel();
			if (redirectAction === "error") throw new Error(`Plugin "${pluginId}": redirect mode is "error"`);
			const previousOrigin = new URL(currentUrl).origin;
			currentUrl = new URL(location, currentUrl).href;
			redirected = true;
			const nextOrigin = new URL(currentUrl).origin;
			currentInit = rewritePluginHttpRedirect(response.status, currentInit);
			if (previousOrigin !== nextOrigin && currentInit) currentInit = stripCredentialHeaders(currentInit);
		}
		throw new Error(`Plugin "${pluginId}": too many redirects (max ${MAX_PLUGIN_REDIRECTS})`);
	} };
}
/**
* Create logger for a plugin
*/
function createLogAccess(pluginId, redactor) {
	const prefix = `[plugin:${pluginId}]`;
	const redact = (value) => redactor?.redact(value) ?? value;
	return {
		debug(message, data) {
			if (data !== void 0) console.debug(prefix, redact(message), redact(data));
			else console.debug(prefix, redact(message));
		},
		info(message, data) {
			if (data !== void 0) console.info(prefix, redact(message), redact(data));
			else console.info(prefix, redact(message));
		},
		warn(message, data) {
			if (data !== void 0) console.warn(prefix, redact(message), redact(data));
			else console.warn(prefix, redact(message));
		},
		error(message, data) {
			if (data !== void 0) console.error(prefix, redact(message), redact(data));
			else console.error(prefix, redact(message));
		}
	};
}
var TRAILING_SLASH_RE = /\/$/;
/**
* Create site info from config and settings. A missing URL becomes an
* empty string.
*/
function createSiteInfo(options) {
	return {
		name: options.siteName ?? "",
		url: (options.siteUrl ?? "").replace(TRAILING_SLASH_RE, ""),
		locale: options.locale ?? "en",
		trailingSlash: options.trailingSlash ?? "ignore"
	};
}
/**
* Create a URL helper that generates absolute URLs from relative paths.
* Validates that path starts with "/" and rejects protocol-relative paths ("//").
*/
function createUrlHelper(siteUrl) {
	const base = siteUrl.replace(TRAILING_SLASH_RE, "");
	return (path) => {
		if (!path.startsWith("/")) throw new Error(`URL path must start with "/", got: "${path}"`);
		if (path.startsWith("//")) throw new Error(`URL path must not be protocol-relative, got: "${path}"`);
		return `${base}${path}`;
	};
}
/**
* Convert a UserRepository user to the plugin-facing UserInfo shape.
* Strips sensitive fields (avatarUrl, emailVerified, data).
*/
function toUserInfo(user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		createdAt: user.createdAt
	};
}
/**
* Create read-only user access for plugins.
* Excludes sensitive fields (password hashes, sessions, passkeys, avatar URL, data).
*/
function createUserAccess(db) {
	const userRepo = new UserRepository(db);
	return {
		async get(id) {
			const user = await userRepo.findById(id);
			if (!user) return null;
			return toUserInfo(user);
		},
		async getByEmail(email) {
			const user = await userRepo.findByEmail(email);
			if (!user) return null;
			return toUserInfo(user);
		},
		async list(opts) {
			const result = await userRepo.findMany({
				role: opts?.role,
				cursor: opts?.cursor,
				limit: opts?.limit
			});
			return {
				items: result.items.map(toUserInfo),
				nextCursor: result.nextCursor
			};
		}
	};
}
/**
* Factory for creating plugin contexts
*/
var PluginContextFactory = class {
	resolveDb;
	beforeContentWrite;
	contentCreate;
	contentActions;
	storage;
	getUploadUrl;
	site;
	urlHelper;
	cronReschedule;
	now;
	emailPipeline;
	commentModerate;
	/**
	* Plugin IDs already warned about a missing media-write backend, so the
	* warning fires once per factory instead of on every hook/route context
	* creation (which would spam logs for hook-participating plugins).
	*/
	warnedMissingMediaBackend = /* @__PURE__ */ new Set();
	constructor(options) {
		const fixedDb = options.db;
		this.resolveDb = options.getDb ?? (() => fixedDb);
		this.beforeContentWrite = options.beforeContentWrite;
		this.contentCreate = options.contentCreate;
		this.contentActions = options.contentActions;
		this.storage = options.storage;
		this.getUploadUrl = options.getUploadUrl;
		this.site = createSiteInfo(options.siteInfo ?? {});
		this.urlHelper = createUrlHelper(this.site.url);
		this.cronReschedule = options.cronReschedule;
		this.now = options.now ?? (() => /* @__PURE__ */ new Date());
		this.emailPipeline = options.emailPipeline;
		this.commentModerate = options.commentModerate;
	}
	/**
	* Create the unified plugin context
	*/
	createContext(plugin) {
		const capabilities = new Set(plugin.capabilities);
		const db = this.resolveDb();
		const optionsRepo = new OptionsRepository(db);
		const secretRedactor = createPluginSecretRedactor();
		const settings = createSettingsAccess(optionsRepo, plugin.id, plugin.admin.settingsSchema ?? {}, void 0, secretRedactor.add);
		const kv = createKVAccess(optionsRepo, plugin.id, settings);
		const log = createLogAccess(plugin.id, secretRedactor);
		const storage = createStorageAccess(db, plugin.id, plugin.storage);
		let content;
		if (capabilities.has("content:write")) content = createContentAccessWithWrite(db, this.beforeContentWrite, {
			site: this.site,
			revisions: capabilities.has("content:revisions:read")
		}, this.contentCreate ? (input) => this.contentCreate(plugin.id, input.collection, input.input, input.options) : void 0);
		else if (capabilities.has("content:read")) content = createContentAccess(db, {
			site: this.site,
			revisions: capabilities.has("content:revisions:read")
		});
		if (capabilities.has("content:publish") && this.contentActions) content = Object.assign(content ?? createContentAccess(db), {
			getVersioned: (collection, id) => this.contentActions.getVersioned(plugin.id, collection, id),
			publish: (collection, id, options) => this.contentActions.publish(plugin.id, collection, id, options),
			unpublish: (collection, id, options) => this.contentActions.unpublish(plugin.id, collection, id, options),
			schedule: (collection, id, options) => this.contentActions.schedule(plugin.id, collection, id, options),
			unschedule: (collection, id, options) => this.contentActions.unschedule(plugin.id, collection, id, options)
		});
		if (capabilities.has("content:restore") && this.contentActions) content = Object.assign(content ?? {
			get: async () => {
				throw new Error("Missing capability: content:read");
			},
			list: async () => {
				throw new Error("Missing capability: content:read");
			}
		}, {
			getTrashedVersioned: (collection, id) => this.contentActions.getTrashedVersioned(plugin.id, collection, id),
			restore: (collection, id, options) => this.contentActions.restore(plugin.id, collection, id, options)
		});
		const schema = capabilities.has("schema:read") ? createSchemaAccess(db) : void 0;
		let taxonomies;
		if (capabilities.has("taxonomies:write")) taxonomies = createTaxonomyAccessWithWrite(db);
		else if (capabilities.has("taxonomies:read")) taxonomies = createTaxonomyAccess(db);
		const bylines = capabilities.has("bylines:read") ? createBylineAccess(db) : void 0;
		let redirects;
		if (capabilities.has("redirects:write")) redirects = createRedirectAccess(db, true);
		else if (capabilities.has("redirects:read")) redirects = createRedirectAccess(db);
		let media;
		if (capabilities.has("media:read") || capabilities.has("media:write") || capabilities.has("media:bytes:read") || capabilities.has("media:metadata:write")) media = capabilities.has("media:read") || capabilities.has("media:write") ? createMediaAccess(db) : createBlockedMediaReadAccess();
		if (capabilities.has("media:write")) if (this.getUploadUrl || this.storage) media = createMediaAccessWithWrite(db, this.getUploadUrl, this.storage);
		else {
			if (!this.warnedMissingMediaBackend.has(plugin.id)) {
				this.warnedMissingMediaBackend.add(plugin.id);
				log.warn("declares the media:write capability but no storage backend is configured; upload() is unavailable.");
			}
			media ??= createMediaAccess(db);
		}
		if (capabilities.has("media:bytes:read") && media) media.readBytes = (id, options) => readPluginMediaBytes(db, this.storage, id, options);
		if (capabilities.has("media:metadata:write") && media) media.updateMetadata = (id, patch) => updatePluginMediaMetadata(db, id, patch);
		let http;
		if (capabilities.has("network:request:unrestricted")) http = createUnrestrictedHttpAccess(plugin.id);
		else if (capabilities.has("network:request")) http = createHttpAccess(plugin.id, plugin.allowedHosts);
		let users;
		if (capabilities.has("users:read")) users = createUserAccess(db);
		let comments;
		if (capabilities.has("comments:moderate")) comments = createCommentAccess(db, (id, status, expectedStatus) => {
			if (!this.commentModerate) throw new Error("Comment moderation is unavailable");
			return this.commentModerate(plugin.id, id, status, expectedStatus);
		});
		else if (capabilities.has("comments:read")) comments = createCommentAccess(db);
		let cron;
		if (this.cronReschedule) cron = new CronAccessImpl(db, plugin.id, this.cronReschedule, this.now);
		let email;
		if (capabilities.has("email:send") && this.emailPipeline?.isAvailable()) {
			const pipeline = this.emailPipeline;
			const pluginId = plugin.id;
			email = { send: (message) => pipeline.send(message, pluginId) };
		}
		return {
			plugin: {
				id: plugin.id,
				version: plugin.version
			},
			storage,
			kv,
			settings,
			content,
			schema,
			taxonomies,
			bylines,
			redirects,
			media,
			http,
			log,
			site: this.site,
			url: this.urlHelper,
			users,
			comments,
			cron,
			email
		};
	}
};
// node_modules/emdash/dist/routes-avqgc-8r.mjs
/**
* Body-reading methods on `Request`. EmDash parses the request body once before
* the handler runs and exposes the result as `ctx.input`, leaving the underlying
* stream consumed. Calling any of these on `ctx.request` would re-read a spent
* stream and throw an opaque platform error ("Body is unusable: Body has already
* been read") with no hint about `ctx.input` — so the guard replaces them with an
* actionable message instead.
*/
var CONSUMED_BODY_METHODS = /* @__PURE__ */ new Set([
	"json",
	"text",
	"arrayBuffer",
	"blob",
	"formData",
	"bytes"
]);
/**
* Wrap the request handed to a plugin route handler so an accidental
* `ctx.request.json()` (or `.text()`, `.formData()`, …) fails with a message
* pointing at `ctx.input` rather than the runtime's cryptic "body already read"
* error. Every non-body member passes through unchanged; function members are
* bound to the underlying request so methods like `clone()` don't throw an
* "Illegal invocation" when called on the proxy.
*/
function guardConsumedRequestBody(request) {
	return new Proxy(request, { get(target, prop) {
		if (typeof prop === "string" && CONSUMED_BODY_METHODS.has(prop)) return () => {
			throw new Error(`[emdash] ctx.request.${prop}() is not available inside a plugin route handler: EmDash has already parsed the request body and exposes it as ctx.input. Read ctx.input instead of ctx.request.${prop}().`);
		};
		const value = Reflect.get(target, prop, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
}
var pluginPublicRouteAcknowledgementSchema = z.array(routeNameSchema);
/**
* Build RouteMeta from a route's `public`/`cacheControl` flags. Single source
* of truth for the "cacheControl is only ever exposed on public routes"
* invariant — used for trusted routes and manifest-declared sandboxed routes.
*/
function buildRouteMeta(route) {
	const meta = { public: route.public === true };
	if (route.permission !== void 0) meta.permission = route.permission;
	if (route.methods !== void 0) meta.methods = [...route.methods];
	if (route.request !== void 0) meta.request = {
		...route.request,
		...route.request.headers ? { headers: [...route.request.headers] } : {}
	};
	if (route.response !== void 0) meta.response = route.response;
	if (meta.public && typeof route.cacheControl === "string" && route.cacheControl.length > 0) meta.cacheControl = route.cacheControl;
	return meta;
}
/**
* HTTP methods that carry a request body. Everything else (GET, HEAD, DELETE)
* takes its route input from the URL query string.
*/
var BODY_METHODS = /* @__PURE__ */ new Set([
	"POST",
	"PUT",
	"PATCH"
]);
/**
* Parse a plugin route's input from the request, by method.
*
* Body methods (POST/PUT/PATCH) parse the JSON body as before. Bodyless
* methods (GET/HEAD/DELETE) have no body, so `request.json()` resolves to
* undefined and fails schema validation, so parse the query string into
* an object instead. Repeated keys (`?tag=a&tag=b`) become an array so array
* schemas work; a single key stays a scalar.
*/
async function parseRouteInput(request, declaration) {
	if (declaration) return parseDeclaredPluginRouteInput(request, declaration);
	if (BODY_METHODS.has(request.method.toUpperCase())) try {
		return await request.json();
	} catch {
		return;
	}
	const params = new URL(request.url).searchParams;
	const input = {};
	for (const key of new Set(params.keys())) {
		const values = params.getAll(key);
		input[key] = values.length > 1 ? values : values[0];
	}
	return input;
}
/**
* Convert the host's authenticated user into the read-only `UserInfo` shape
* exposed to plugins as `ctx.user`. Strips sensitive/irrelevant fields and
* keeps the value structured-clone-safe for sandboxed plugins.
*/
function toRouteCallerInfo(user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt.toISOString()
	};
}
/**
* Route handler for a plugin
*/
var PluginRouteHandler = class {
	contextFactory;
	plugin;
	trustedProxyHeaders;
	constructor(plugin, factoryOptions) {
		this.plugin = plugin;
		this.contextFactory = new PluginContextFactory(factoryOptions);
		this.trustedProxyHeaders = factoryOptions.trustedProxyHeaders ?? [];
	}
	/**
	* Invoke a route by name
	*/
	async invoke(routeName, options) {
		const route = this.plugin.routes[routeName];
		if (!route) return {
			success: false,
			error: {
				code: "ROUTE_NOT_FOUND",
				message: `Route "${routeName}" not found in plugin "${this.plugin.id}"`
			},
			status: 404
		};
		let validatedInput;
		if (route.input) {
			const parseResult = route.input.safeParse(options.body);
			if (!parseResult.success) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid request body",
					details: z.formatError(parseResult.error)
				},
				status: 400
			};
			validatedInput = parseResult.data;
		} else validatedInput = options.body;
		const routeContext = {
			...this.contextFactory.createContext(this.plugin),
			input: validatedInput,
			request: guardConsumedRequestBody(options.request),
			requestMeta: extractRequestMeta(options.request, this.trustedProxyHeaders),
			user: options.user,
			ui: options.ui
		};
		try {
			return {
				success: true,
				data: await route.handler(routeContext),
				status: 200
			};
		} catch (error) {
			if (error instanceof SiteWriteBlockedError) return {
				success: false,
				error: {
					code: error.code,
					message: error.message
				},
				status: error.status
			};
			if (isPluginRouteError(error)) return {
				success: false,
				error: {
					code: error.code,
					message: error.message,
					details: error.details
				},
				status: error.status
			};
			console.error(`[plugin:${this.plugin.id}] Route handler failed:`, error);
			return {
				success: false,
				error: {
					code: "INTERNAL_ERROR",
					message: "An internal error occurred"
				},
				status: 500
			};
		}
	}
	/**
	* Get all route names
	*/
	getRouteNames() {
		return Object.keys(this.plugin.routes);
	}
	/**
	* Check if a route exists
	*/
	hasRoute(name) {
		return name in this.plugin.routes;
	}
	/**
	* Get route metadata without invoking the handler.
	* Returns null if the route doesn't exist.
	*/
	getRouteMeta(name) {
		const route = this.plugin.routes[name];
		if (!route) return null;
		return buildRouteMeta(route);
	}
};
/**
* Registry for all plugin route handlers
*/
var PluginRouteRegistry = class {
	handlers = /* @__PURE__ */ new Map();
	constructor(factoryOptions) {
		this.factoryOptions = factoryOptions;
	}
	/**
	* Register a plugin's routes
	*/
	register(plugin) {
		const handler = new PluginRouteHandler(plugin, this.factoryOptions);
		this.handlers.set(plugin.id, handler);
	}
	/**
	* Unregister a plugin's routes
	*/
	unregister(pluginId) {
		this.handlers.delete(pluginId);
	}
	/**
	* Invoke a plugin route
	*/
	async invoke(pluginId, routeName, options) {
		const handler = this.handlers.get(pluginId);
		if (!handler) return {
			success: false,
			error: {
				code: "PLUGIN_NOT_FOUND",
				message: `Plugin "${pluginId}" not found`
			},
			status: 404
		};
		return handler.invoke(routeName, options);
	}
	/**
	* Get all registered plugin IDs
	*/
	getPluginIds() {
		return [...this.handlers.keys()];
	}
	/**
	* Get routes for a plugin
	*/
	getRoutes(pluginId) {
		return this.handlers.get(pluginId)?.getRouteNames() ?? [];
	}
	/**
	* Get route metadata for a specific plugin route.
	* Returns null if the plugin or route doesn't exist.
	*/
	getRouteMeta(pluginId, routeName) {
		const handler = this.handlers.get(pluginId);
		if (!handler) return null;
		return handler.getRouteMeta(routeName);
	}
};
export { toRouteCallerInfo as a, createSiteInfo as c, updatePluginMediaMetadata as d, pluginPublicRouteAcknowledgementSchema as i, createTaxonomyAccessWithWrite as l, buildRouteMeta as n, PluginContextFactory as o, parseRouteInput as r, createCommentAccess as s, PluginRouteRegistry as t, toBylineInfo as u };
