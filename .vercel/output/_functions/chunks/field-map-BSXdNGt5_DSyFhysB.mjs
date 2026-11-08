import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { n as isMissingColumnError, r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { f as jsonExtractExpr } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { n as cachedQuery, t as CacheNamespace } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { f as getDb } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/field-map-BSXdNGt5.mjs
/**
* The reference fields a collection carries, for the public query path.
*
* `referenceFieldConstraints` (api/handlers) answers the write question — how
* many entries may a field select, and is it required. Rendering asks a
* different one: which collection do I load, and which end of the relation am I
* standing on. Both read the same rows; keeping them apart keeps the render
* path off the relation table, which the constraints map has to read for its
* limits.
*/
var field_map_exports = /* @__PURE__ */ __exportAll({ getReferenceFieldMap: () => getReferenceFieldMap });
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function loadBindings(db, collection) {
	const relationSlug = jsonExtractExpr(db, "validation", "relation");
	let rows;
	try {
		rows = (await sql`
			SELECT f.slug AS slug, f.validation AS validation, r.id AS relation_id
			FROM ${sql.ref("_emdash_fields")} AS f
			INNER JOIN ${sql.ref("_emdash_collections")} AS c ON c.id = f.collection_id
			LEFT JOIN ${sql.ref("_emdash_relations")} AS r ON r.slug = ${sql.raw(relationSlug)}
			WHERE c.slug = ${collection} AND f.type = 'reference'
		`.execute(db)).rows;
	} catch (error) {
		if (isMissingTableError(error) || isMissingColumnError(error)) return null;
		throw error;
	}
	const bindings = [];
	for (const row of rows) {
		if (!row.validation) continue;
		let parsed;
		try {
			parsed = JSON.parse(row.validation);
		} catch {
			continue;
		}
		if (!isRecord(parsed)) continue;
		const { relation, targetCollection } = parsed;
		if (typeof relation !== "string" || typeof targetCollection !== "string") continue;
		if (!row.relation_id) continue;
		bindings.push({
			slug: row.slug,
			relation,
			relationId: row.relation_id,
			targetCollection,
			side: parsed.relationSide === "child" ? "child" : "parent"
		});
	}
	return bindings;
}
/**
* Every bound reference field on `collection`, by field slug.
*
* Cached twice over: once per request, and once in the schema object-cache
* namespace, which a schema edit already bumps. A render that asks for
* references therefore pays for this lookup at most once per isolate between
* schema changes, and a render that asks for none never issues it.
*/
function getReferenceFieldMap(collection) {
	return requestCached(`reference-field-map:${collection}`, async () => {
		const bindings = await cachedQuery({
			namespace: CacheNamespace.SCHEMA,
			key: `reference-field-map:${collection}`,
			load: async () => loadBindings(await getDb(), collection),
			cacheable: (value) => value !== null
		});
		return new Map((bindings ?? []).map((binding) => [binding.slug, binding]));
	});
}
export { getReferenceFieldMap as n, field_map_exports as t };
