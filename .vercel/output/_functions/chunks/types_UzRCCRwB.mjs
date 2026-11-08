import { PostgresAdapter, sql } from "kysely";
// node_modules/emdash/src/database/transaction.ts
/**
* Run a callback inside a transaction if supported, or directly if not.
*
* Probes the database once on first call to determine if transactions work.
* The result is cached for the lifetime of the process/worker.
*/
var transactionsSupported = null;
var TRANSACTIONS_NOT_SUPPORTED_RE = /transactions are not supported/i;
async function withTransaction(db, fn) {
	if (db.isTransaction) return fn(db);
	if (transactionsSupported === true) return db.transaction().execute(fn);
	if (transactionsSupported === false) return fn(db);
	try {
		const result = await db.transaction().execute(fn);
		transactionsSupported = true;
		return result;
	} catch (error) {
		if (error instanceof Error && TRANSACTIONS_NOT_SUPPORTED_RE.test(error.message)) {
			transactionsSupported = false;
			return fn(db);
		}
		throw error;
	}
}
// node_modules/emdash/src/database/dialect-helpers.ts
/**
* Detect dialect type from a Kysely instance via the adapter class.
*/
function detectDialect(db) {
	if (db.getExecutor().adapter instanceof PostgresAdapter) return "postgres";
	return "sqlite";
}
function isSqlite(db) {
	return detectDialect(db) === "sqlite";
}
function isPostgres(db) {
	return detectDialect(db) === "postgres";
}
function isAtomicBatchAdapter(adapter) {
	return "executeAtomicBatch" in adapter && typeof adapter.executeAtomicBatch === "function";
}
/**
* Execute a fixed statement list atomically when the active adapter supports
* it. Returns `null` for adapters that should use an ordinary transaction.
*/
async function executeAtomicBatchIfSupported(db, queries) {
	const adapter = db.getExecutor().adapter;
	if (!isAtomicBatchAdapter(adapter)) return null;
	return adapter.executeAtomicBatch(queries.map((query) => "isRawBuilder" in query ? query.compile(db) : query.compile()));
}
/**
* Default timestamp expression for column defaults.
* Wrapped in parens for use in CREATE TABLE ... DEFAULT (...).
*
* sqlite:   (datetime('now'))
* postgres: CURRENT_TIMESTAMP
*/
function currentTimestamp(db) {
	if (isPostgres(db)) return sql`CURRENT_TIMESTAMP`;
	return sql`(datetime('now'))`;
}
/**
* Check if a table exists in the database.
*/
async function tableExists(db, tableName) {
	if (isPostgres(db)) return (await sql`
			SELECT EXISTS(
				SELECT 1 FROM information_schema.tables
				WHERE table_schema = current_schema() AND table_name = ${tableName}
			) as exists
		`.execute(db)).rows[0]?.exists === true;
	return (await sql`
		SELECT name FROM sqlite_master
		WHERE type = 'table' AND name = ${tableName}
	`.execute(db)).rows.length > 0;
}
/**
* Check if a column exists in the database.
*/
async function columnExists(db, tableName, columnName) {
	if (isPostgres(db)) return (await sql`
			SELECT EXISTS(
				SELECT 1 FROM information_schema.columns
				WHERE table_schema = current_schema()
					AND table_name = ${tableName}
					AND column_name = ${columnName}
			) as exists
		`.execute(db)).rows[0]?.exists === true;
	return (await sql`
		SELECT name FROM pragma_table_info(${tableName})
		WHERE name = ${columnName}
	`.execute(db)).rows.length > 0;
}
/**
* List tables matching a LIKE pattern.
*/
async function listTablesLike(db, pattern) {
	if (isPostgres(db)) return (await sql`
			SELECT table_name FROM information_schema.tables
			WHERE table_schema = current_schema() AND table_name LIKE ${pattern}
			ORDER BY table_name
		`.execute(db)).rows.map((r) => r.table_name);
	return (await sql`
		SELECT name FROM sqlite_master
		WHERE type = 'table' AND name LIKE ${pattern}
		ORDER BY name
	`.execute(db)).rows.map((r) => r.name);
}
// node_modules/emdash/src/schema/types.ts
/** Scalar field types that can be backed by a content-list query index. */
var INDEXABLE_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"reference",
	"slug"
]);
function isIndexableFieldType(type) {
	return INDEXABLE_FIELD_TYPES.has(type);
}
/**
* Map field types to their SQLite column types
*/
var FIELD_TYPE_TO_COLUMN = {
	string: "TEXT",
	text: "TEXT",
	number: "REAL",
	integer: "INTEGER",
	boolean: "INTEGER",
	datetime: "TEXT",
	select: "TEXT",
	multiSelect: "JSON",
	portableText: "JSON",
	image: "TEXT",
	file: "TEXT",
	reference: "TEXT",
	json: "JSON",
	slug: "TEXT",
	url: "TEXT",
	repeater: "JSON",
	blocks: "JSON"
};
/**
* Field types that *can* persist no `ec_*` column — see `isStoragelessField`
* for whether a given row actually does. The `FIELD_TYPE_TO_COLUMN` entry above
* is retained deliberately: it doubles as the `isFieldType` guard.
*/
var STORAGELESS_FIELD_TYPES = /* @__PURE__ */ new Set(["reference"]);
/**
* Whether a field row keeps its values outside the content table.
*
* Storage-less is a property of the row, not of the type. A `reference` field
* is storage-less once it is bound to a relation: the selection lives as edges
* in `_emdash_content_references`. A reference field created before relations
* existed — or one whose target collection could not be resolved — still owns a
* TEXT column holding an entry id, and behaves like a string field until
* something wires it.
*/
function isStoragelessField(field) {
	if (!STORAGELESS_FIELD_TYPES.has(field.type)) return false;
	return typeof field.validation?.relation === "string" && field.validation.relation.length > 0;
}
/**
* `isStoragelessField` for a raw `_emdash_fields` row, whose `validation` is
* unparsed JSON. Malformed JSON reads as unwired: a field nothing can resolve a
* relation for keeps its column.
*/
function isStoragelessFieldRow(row) {
	if (!STORAGELESS_FIELD_TYPES.has(row.type) || !row.validation) return false;
	let parsed;
	try {
		parsed = JSON.parse(row.validation);
	} catch {
		return false;
	}
	if (typeof parsed !== "object" || parsed === null) return false;
	return isStoragelessField({
		type: row.type,
		validation: parsed
	});
}
/** Allowed types for repeater sub-fields (no nesting, no complex types) */
var REPEATER_SUB_FIELD_TYPES = [
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"image"
];
/**
* Reserved field slugs that cannot be used.
*
* Includes names reserved for runtime hydration (`terms`, `bylines`, `byline`)
* so user-defined fields never shadow the auto-hydrated values on entry.data.
*/
var RESERVED_FIELD_SLUGS = [
	"id",
	"slug",
	"status",
	"author_id",
	"primary_byline_id",
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at",
	"version",
	"live_revision_id",
	"draft_revision_id",
	"terms",
	"bylines",
	"byline"
];
/**
* Reserved collection slugs that cannot be used
*/
var RESERVED_COLLECTION_SLUGS = [
	"content",
	"media",
	"users",
	"revisions",
	"taxonomies",
	"options",
	"audit_logs",
	"reorder",
	"relations"
];
var BYLINE_FIELD_TYPES = [
	"string",
	"text",
	"url",
	"boolean",
	"select"
];
/**
* Reserved byline-field slugs. Two reasons a slug ends up here:
*
* 1. **Column collision.** Slugs that match a fixed column on
*    `_emdash_bylines` (migrations 031 + 040) would shadow that column
*    on hydration. The first 12 entries cover this.
* 2. **Route collision.** Static file routes under
*    `/_emdash/api/admin/byline-fields/` take precedence over the
*    `[slug].ts` dynamic route in Astro, so a custom field whose slug
*    matches a sibling static file (e.g. `reorder.ts`) is unreachable
*    via single-field CRUD — the static route handles only its own
*    method (POST for `reorder`) and 405s everything else.
*    `reorder` is the only such sibling today; new sibling routes
*    (e.g. a hypothetical `import.ts`) must be added here.
*    `[slug]/usage.ts` lives a level deeper so a slug of `usage` does
*    not collide — it resolves cleanly to `[slug].ts`.
*
* Enforced at the registry layer (Phase 2) and the admin API zod layer
* (Phase 4) so non-HTTP callers (seeds, scripts) get the same guarantee.
*/
var RESERVED_BYLINE_FIELD_SLUGS = [
	"id",
	"slug",
	"display_name",
	"bio",
	"avatar_media_id",
	"website_url",
	"user_id",
	"is_guest",
	"locale",
	"translation_group",
	"created_at",
	"updated_at",
	"reorder"
];
export { tableExists as _, RESERVED_COLLECTION_SLUGS as a, isStoragelessField as c, currentTimestamp as d, detectDialect as f, listTablesLike as g, isSqlite as h, RESERVED_BYLINE_FIELD_SLUGS as i, isStoragelessFieldRow as l, isPostgres as m, FIELD_TYPE_TO_COLUMN as n, RESERVED_FIELD_SLUGS as o, executeAtomicBatchIfSupported as p, REPEATER_SUB_FIELD_TYPES as r, isIndexableFieldType as s, BYLINE_FIELD_TYPES as t, columnExists as u, withTransaction as v };
