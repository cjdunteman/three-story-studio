import { u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/json-recordset-D0WhN2UA.mjs
function jsonTextValues(db, values) {
	const payload = JSON.stringify([...new Set(values)]);
	return isPostgres(db) ? sql`SELECT value::text AS value FROM jsonb_array_elements_text(${payload}::jsonb) AS value` : sql`SELECT value AS value FROM json_each(${payload})`;
}
export { jsonTextValues as t };
