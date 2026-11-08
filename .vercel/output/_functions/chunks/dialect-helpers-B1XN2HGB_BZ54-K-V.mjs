import { n as validateJsonFieldName, t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { PostgresAdapter, sql } from "kysely";
// node_modules/emdash/dist/dialect-helpers-B1XN2HGB.mjs
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
/** Whether `executeAtomicBatchIfSupported` runs a batch on this database. */
function supportsAtomicBatch(db) {
	return isAtomicBatchAdapter(db.getExecutor().adapter);
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
* The backend's compound-SELECT ceiling, or null when it has none worth
* splitting statements for. Only the adapter knows: the limit is a property of
* the SQLite build behind the dialect, not of the SQL flavour, so two "sqlite"
* dialects can answer differently.
*
* A declared ceiling must be a positive integer — callers batch by it, and
* every other value silently misbehaves rather than failing: 0 and negatives
* never advance the batch cursor, fractions overlap batches and double-count,
* NaN yields an empty batch. A malformed declaration throws here, where the
* message can name the adapter.
*/
function compoundSelectLimit(db) {
	const adapter = db.getExecutor().adapter;
	if (!("compoundSelectLimit" in adapter)) return null;
	const limit = adapter.compoundSelectLimit;
	if (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1) throw new Error(`${adapter.constructor.name} declares compoundSelectLimit ${String(limit)}; it must be a positive integer.`);
	return limit;
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
* Timestamp expression for use in WHERE clauses and SET expressions.
* No wrapping parens.
*
* sqlite:   datetime('now')
* postgres: CURRENT_TIMESTAMP
*/
function currentTimestampValue(db) {
	if (isPostgres(db)) return sql`CURRENT_TIMESTAMP`;
	return sql`datetime('now')`;
}
/**
* Build WHERE clause for status filtering on a content table.
* Scheduled content becomes public only after the publication sweep commits
* the row with a literal `published` status.
*/
function buildStatusCondition(_db, status, tablePrefix) {
	const statusField = tablePrefix ? `${tablePrefix}.status` : "status";
	return sql`${sql.ref(statusField)} = ${status}`;
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
* Check if an index exists in the database.
*/
async function indexExists(db, indexName) {
	if (isPostgres(db)) return (await sql`
			SELECT EXISTS(
				SELECT 1 FROM pg_indexes
				WHERE schemaname = current_schema() AND indexname = ${indexName}
			) as exists
		`.execute(db)).rows[0]?.exists === true;
	return (await sql`
		SELECT name FROM sqlite_master
		WHERE type = 'index' AND name = ${indexName}
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
/**
* List a table's columns in declaration order.
*/
async function listTableColumns(db, tableName) {
	if (isPostgres(db)) return (await sql`
			SELECT column_name, data_type
			FROM information_schema.columns
			WHERE table_schema = current_schema() AND table_name = ${tableName}
			ORDER BY ordinal_position
		`.execute(db)).rows.map((column) => ({
		name: column.column_name,
		type: column.data_type
	}));
	return (await sql`
		SELECT name, type
		FROM pragma_table_info(${tableName})
		ORDER BY cid
	`.execute(db)).rows;
}
/**
* Column type for binary data.
*
* sqlite:   blob
* postgres: bytea
*/
function binaryType(db) {
	if (isPostgres(db)) return "bytea";
	return "blob";
}
/**
* SQL expression for extracting a field from a JSON column stored as text.
*
* sqlite:   json_extract(column, '$.path')
* postgres: (column)::jsonb->>'path'
*
* The Postgres cast is required because JSON columns (e.g.
* `_plugin_storage.data`) are `text`, and `text ->> unknown` is not an
* operator. The cast is immutable, so the same expression works in
* expression indexes — queries and indexes must build it through this
* helper so the planner can match them.
*/
function jsonExtractExpr(db, column, path) {
	validateIdentifier(column, "JSON column name");
	validateJsonFieldName(path, "JSON path");
	if (isPostgres(db)) return `(${column})::jsonb->>'${path}'`;
	return `json_extract(${column}, '$.${path}')`;
}
/**
* SQL expression for extracting a queryable field from the plugin-storage
* `data` column.
*
* `_plugin_storage.data` is `text`, so Postgres extraction goes through the
* `(data)::jsonb->>'field'` cast (#1898) — otherwise `text ->> unknown` is not
* an operator. But the extracted value is still `text`, so a numeric comparison
* (`stock >= 10`) compares lexically (`'9' >= '10'` is TRUE) and silently
* over-counts / oversells; pass `{ numeric: true }` for a numeric comparison.
*
* The numeric form is a **type-guarded** cast, not a bare `::numeric`. A bare
* cast throws `invalid input syntax for type numeric` the moment a single
* scanned row stores a non-number in that field (documents are schemaless),
* aborting the whole query — and it would diverge from SQLite, which silently
* coerces. Guarding with `jsonb_typeof`/`json_type` makes the comparison total
* and parity-correct on both dialects: a non-number stored value yields `NULL`
* (no match) instead of an error.
*
* The field name is validated before interpolation, so the casts wrap only a
* safe identifier and add no injection surface.
*
* sqlite text:      json_extract(data, '$.field')
* sqlite numeric:   CASE WHEN json_type(data, '$.field') IN ('integer', 'real')
*                     THEN json_extract(data, '$.field') END
* postgres text:    (data)::jsonb->>'field'
* postgres numeric: CASE WHEN jsonb_typeof((data)::jsonb->'field') = 'number'
*                     THEN ((data)::jsonb->>'field')::numeric END
*/
function pluginDataExtractExpr(db, field, options) {
	validateJsonFieldName(field, "plugin storage field name");
	if (isPostgres(db)) {
		const text = `(data)::jsonb->>'${field}'`;
		if (!options?.numeric) return text;
		return `CASE WHEN jsonb_typeof((data)::jsonb->'${field}') = 'number' THEN (${text})::numeric END`;
	}
	const extract = `json_extract(data, '$.${field}')`;
	if (!options?.numeric) return extract;
	return `CASE WHEN json_type(data, '$.${field}') IN ('integer', 'real') THEN ${extract} END`;
}
/**
* Build the new value of the `_plugin_storage.data` (text-JSON) column for a
* guarded `updateIf`, composing wholesale `set` fields and integer `delta`
* fields into a SINGLE dialect-correct expression.
*
* Both branches go through `json_set` / `jsonb_set` so the write never rewrites
* the whole column from JS (which would require a read-then-write and break the
* single-statement atomicity that makes no-oversell hold):
*
* - **set** field → the value is stored via `json(?)` (SQLite) / `?::jsonb`
*   (Postgres) with `JSON.stringify(value)`, uniformly handling scalars,
*   objects, arrays, and `null` (stored as JSON `null`, never SQL `NULL` — a
*   SQL `NULL` in `jsonb_set` would null the entire `data` column and hit the
*   `NOT NULL` constraint).
* - **delta** field → `COALESCE(<numeric extract>, 0) + n`, where the extract
*   is the type-guarded numeric form from {@link pluginDataExtractExpr} so a
*   missing or null stored value coalesces to `0` on both dialects. The update
*   guard rejects invalid counters and unsafe results. Integer arithmetic stays
*   integer (Postgres `to_jsonb(numeric)` and SQLite integer `+` both round-trip
*   without a spurious `.0`).
*
* Field names are validated (`validateJsonFieldName` / `pluginDataExtractExpr`)
* before interpolation, so the JSON path is a safe identifier and values are
* bound parameters — no injection surface.
*
* SQLite:   json_set(json_set(data, '$.f1', json(?)), '$.f2', COALESCE(json_extract(...), 0) + ?)
* Postgres: (jsonb_set(jsonb_set(data::jsonb, '{f1}', ?::jsonb), '{f2}', to_jsonb(COALESCE(..., 0) + ?)))::text
*/
function pluginDataWriteExpr(db, setEntries, deltaEntries) {
	const pg = isPostgres(db);
	let expr = pg ? sql`data::jsonb` : sql`data`;
	for (const [field, value] of setEntries) {
		validateJsonFieldName(field, "plugin storage set field name");
		const json = JSON.stringify(value ?? null);
		if (pg) expr = sql`jsonb_set(${expr}, ${sql.lit(`{${field}}`)}, ${json}::jsonb)`;
		else expr = sql`json_set(${expr}, ${sql.lit(`$.${field}`)}, json(${json}))`;
	}
	for (const [field, n] of deltaEntries) {
		const numericExtract = pluginDataExtractExpr(db, field, { numeric: true });
		if (pg) expr = sql`jsonb_set(${expr}, ${sql.lit(`{${field}}`)}, to_jsonb(COALESCE(${sql.raw(numericExtract)}, 0) + ${n}))`;
		else expr = sql`json_set(${expr}, ${sql.lit(`$.${field}`)}, cast(COALESCE(${sql.raw(numericExtract)}, 0) as integer) + cast(${n} as integer))`;
	}
	if (pg) return sql`(${expr})::text`;
	return sql`${expr}`;
}
function pluginDataUpdateGuard(db, deltaEntries) {
	const pg = isPostgres(db);
	const conditions = [pg ? sql`jsonb_typeof(data::jsonb) = 'object'` : sql`json_type(data) = 'object'`];
	for (const [field, amount] of deltaEntries) {
		const numeric = sql.raw(pluginDataExtractExpr(db, field, { numeric: true }));
		const type = pg ? sql`jsonb_typeof(data::jsonb -> ${sql.lit(field)})` : sql`json_type(data, ${sql.lit(`$.${field}`)})`;
		const base = sql`coalesce(${numeric}, 0)`;
		const integral = pg ? sql`${base} = trunc(${base})` : sql`${base} = cast(${base} as integer)`;
		const lower = Math.max(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER - amount);
		const upper = Math.min(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER - amount);
		conditions.push(sql`((${type} is null or ${type} = 'null' or ${numeric} is not null)
			and ${integral} and ${base} >= ${lower} and ${base} <= ${upper})`);
	}
	return sql`(${sql.join(conditions, sql` and `)})`;
}
/**
* SQL expression for ordering plugin-storage rows by a `data` field.
*
* `ORDER BY` has no bound operand to infer numeric-vs-text from, so extracting
* as text (`->>'field'`) would sort a numeric field lexically on Postgres
* (`[10, 100, 9]`) while SQLite's `json_extract` sorts it numerically — a
* cross-dialect divergence. Ordering over the jsonb-native value (`->'field'`,
* single arrow) fixes this: jsonb btree ordering is numeric among numbers,
* lexical among strings, and total across heterogeneous values (never throws).
* SQLite's `json_extract` already orders numerically, so it is unchanged.
*
* sqlite:   json_extract(data, '$.field')
* postgres: (data)::jsonb->'field'
*/
function pluginDataOrderExpr(db, field) {
	validateJsonFieldName(field, "plugin storage order field name");
	if (isPostgres(db)) return `(data)::jsonb->'${field}'`;
	return `json_extract(data, '$.${field}')`;
}
export { pluginDataUpdateGuard as _, currentTimestamp as a, tableExists as b, executeAtomicBatchIfSupported as c, isSqlite as d, jsonExtractExpr as f, pluginDataOrderExpr as g, pluginDataExtractExpr as h, compoundSelectLimit as i, indexExists as l, listTablesLike as m, buildStatusCondition as n, currentTimestampValue as o, listTableColumns as p, columnExists as r, detectDialect as s, binaryType as t, isPostgres as u, pluginDataWriteExpr as v, supportsAtomicBatch as y };
