import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { i as generateZodSchema } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/validation-Fc9ZSUS_.mjs
/**
* Field-level validation for content create / update.
*
* Wires the existing `generateZodSchema()` pipeline (`schema/zod-generator.ts`)
* into the handler boundary so REST and MCP both get the same enforcement:
*
*  - required fields must be present and non-empty
*  - select / multiSelect values must match the configured options
*  - reference fields must resolve to a real, non-trashed target
*
* Errors surface as `{ code: "VALIDATION_ERROR", message, details: { issues } }`.
* The message lists every offending field so callers can fix everything in a
* single round trip; `issues` carries the same failures one by one, with a
* code and any bound that failed, so the admin can word them for editors.
*/
/** Treat `undefined`, `null`, and `""` as "not set". */
function isMissing(value) {
	return value === void 0 || value === null || value === "";
}
/**
* Resolve the target collection slug for a reference field.
*
* Schema-defined reference fields (the static `reference()` factory in
* `fields/reference.ts`) put the target in `options.collection`. The MCP
* `schema_create_field` tool also puts it there. Tests and some admin paths
* stash it inside `validation.collection` directly; we accept both.
*/
function getReferenceTargetCollection(field) {
	const fromOptions = field.options?.collection;
	if (typeof fromOptions === "string" && fromOptions.length > 0) return fromOptions;
	const validation = field.validation;
	if (validation && "collection" in validation) {
		const fromValidation = validation.collection;
		if (typeof fromValidation === "string" && fromValidation.length > 0) return fromValidation;
	}
}
/**
* Format a Zod issue path into a human-readable field reference, e.g.
* `tags`, `tags.1`, `image.alt`.
*/
function formatIssuePath(path) {
	if (path.length === 0) return "(root)";
	return path.map((seg) => String(seg)).join(".");
}
function isSubFieldPath(path, fieldTypes) {
	return path.length === 3 && fieldTypes.get(String(path[0])) === "repeater";
}
function isFieldOrSubFieldPath(path, fieldTypes) {
	return path.length === 1 || isSubFieldPath(path, fieldTypes);
}
function fromZodIssue(issue, fieldTypes) {
	const result = {
		path: formatIssuePath(issue.path),
		code: issue.code,
		message: issue.message
	};
	switch (issue.code) {
		case "invalid_type":
		case "invalid_union":
		case "invalid_value":
			if (issue.input == null && isFieldOrSubFieldPath(issue.path, fieldTypes)) result.code = "required";
			break;
		case "too_small":
			result.origin = issue.origin;
			if (typeof issue.minimum === "number") result.minimum = issue.minimum;
			if (issue.input === "" && isSubFieldPath(issue.path, fieldTypes)) result.code = "required";
			break;
		case "too_big":
			result.origin = issue.origin;
			if (typeof issue.maximum === "number") result.maximum = issue.maximum;
			break;
		case "invalid_format": result.format = issue.format;
	}
	return result;
}
/**
* Validate `data` against the collection's field definitions.
*
* `partial: true` switches Zod into partial mode so updates can include
* only the fields being changed without tripping required-field errors on
* fields the caller didn't touch. Required fields that ARE present in
* partial-mode data still get the empty-string check below.
*/
async function validateContentData(db, collection, data, options = {}) {
	const collectionWithFields = await new SchemaRegistry(db).getCollectionWithFields(collection);
	if (!collectionWithFields) return {
		ok: false,
		error: {
			code: "COLLECTION_NOT_FOUND",
			message: `Collection '${collection}' not found`
		}
	};
	const issues = [];
	const unsupportedField = collectionWithFields.fields.find((field) => field.unsupportedType);
	if (unsupportedField?.unsupportedType) {
		const { type, path } = unsupportedField.unsupportedType;
		return {
			ok: false,
			error: {
				code: "UNSUPPORTED_FIELD_TYPE",
				message: `Collection '${collection}' field '${unsupportedField.slug}' uses unsupported field type '${type}' at '${path}'`
			}
		};
	}
	const knownFields = new Set(collectionWithFields.fields.map((f) => f.slug));
	for (const key of Object.keys(data)) {
		if (key.startsWith("_")) continue;
		if (!knownFields.has(key)) issues.push({
			path: key,
			code: "unknown_field",
			message: `unknown field on collection '${collection}'`
		});
	}
	const baseSchema = generateZodSchema(collectionWithFields);
	const parsed = (options.partial ? baseSchema.partial() : baseSchema).safeParse(data, { reportInput: true });
	if (!parsed.success) {
		const fieldTypes = new Map(collectionWithFields.fields.map((f) => [f.slug, f.type]));
		for (const issue of parsed.error.issues) issues.push(fromZodIssue(issue, fieldTypes));
	}
	for (const field of collectionWithFields.fields) {
		if (!field.required) continue;
		const present = Object.hasOwn(data, field.slug);
		if (options.partial && !present) continue;
		if (data[field.slug] === "") issues.push({
			path: field.slug,
			code: "required",
			message: "required (empty value not allowed)"
		});
	}
	const refsByTarget = /* @__PURE__ */ new Map();
	for (const field of collectionWithFields.fields) {
		if (field.type !== "reference") continue;
		if (options.partial && !Object.hasOwn(data, field.slug)) continue;
		const value = data[field.slug];
		if (isMissing(value)) continue;
		if (typeof value !== "string") continue;
		const target = getReferenceTargetCollection(field);
		if (!target) continue;
		const list = refsByTarget.get(target) ?? [];
		list.push({
			field: field.slug,
			id: value
		});
		refsByTarget.set(target, list);
	}
	for (const [target, refs] of refsByTarget) {
		try {
			validateIdentifier(target, "reference target collection");
		} catch {
			for (const ref of refs) issues.push({
				path: ref.field,
				code: "invalid_reference_target",
				message: `invalid reference target collection '${target}'`
			});
			continue;
		}
		const ids = [...new Set(refs.map((r) => r.id))];
		const tableName = `ec_${target}`;
		const found = /* @__PURE__ */ new Set();
		let targetTableMissing = false;
		for (const idChunk of chunks(ids, 50)) try {
			const rows = await sql`
					SELECT id FROM ${sql.ref(tableName)}
					WHERE id IN (${sql.join(idChunk)})
					AND deleted_at IS NULL
				`.execute(db);
			for (const row of rows.rows) found.add(row.id);
		} catch (error) {
			if (isMissingTableError(error)) {
				targetTableMissing = true;
				break;
			}
			throw error;
		}
		for (const ref of refs) if (targetTableMissing || !found.has(ref.id)) issues.push({
			path: ref.field,
			code: "reference_not_found",
			message: `target '${ref.id}' not found in collection '${target}'`
		});
	}
	if (issues.length === 0) return { ok: true };
	return {
		ok: false,
		error: {
			code: "VALIDATION_ERROR",
			message: issues.map((issue) => `${issue.path}: ${issue.message}`).join("; "),
			details: { issues }
		}
	};
}
export { validateContentData };
