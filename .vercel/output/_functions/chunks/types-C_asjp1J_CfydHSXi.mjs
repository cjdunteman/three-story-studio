// node_modules/emdash/dist/types-C_asjp1J.mjs
/**
* Array of all field types for validation
*/
var FIELD_TYPES = [
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"reference",
	"json",
	"slug",
	"repeater",
	"blocks"
];
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
export { RESERVED_BYLINE_FIELD_SLUGS as a, isIndexableFieldType as c, REPEATER_SUB_FIELD_TYPES as i, isStoragelessField as l, FIELD_TYPES as n, RESERVED_COLLECTION_SLUGS as o, FIELD_TYPE_TO_COLUMN as r, RESERVED_FIELD_SLUGS as s, BYLINE_FIELD_TYPES as t, isStoragelessFieldRow as u };
