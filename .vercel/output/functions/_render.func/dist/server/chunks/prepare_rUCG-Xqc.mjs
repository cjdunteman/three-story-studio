import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { n as FIELD_TYPES } from "./types-C_asjp1J_CfydHSXi.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { w as wpPrepareBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { x as sanitizeCollectionSlug } from "./import-yVbfPyfd_CInIQiy6.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { n as capitalize, r as singularize } from "./analyze_FQV59a8B.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs
var prepare_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/** Validate that a string is a known FieldType, returning undefined if not */
function asFieldType(value) {
	return FIELD_TYPES.includes(value) ? value : void 0;
}
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpPrepareBody);
		if (isParseError(body)) return body;
		const result = await prepareImport(emdash.db, body);
		if (result.collectionsCreated.length > 0) emdash.invalidateUrlPatternCache();
		return apiSuccess(result, result.success ? 200 : 400);
	} catch (error) {
		return handleError(error, "Failed to prepare import", "WXR_PREPARE_ERROR");
	}
};
async function prepareImport(db, request) {
	const { SchemaRegistry } = await import("./registry-B0-O575m_B8jWSyfP.mjs").then((n) => n.r);
	const registry = new SchemaRegistry(db);
	const result = {
		success: true,
		collectionsCreated: [],
		fieldsCreated: [],
		errors: []
	};
	for (const postType of request.postTypes) {
		const collectionSlug = sanitizeCollectionSlug(postType.collection);
		try {
			let collection = await registry.getCollection(collectionSlug);
			if (!collection) {
				const label = capitalize(collectionSlug);
				const labelSingular = capitalize(singularize(collectionSlug));
				const isSearchable = [
					"posts",
					"pages",
					"post",
					"page"
				].includes(collectionSlug);
				const supports = ["revisions", "drafts"];
				if (isSearchable) supports.push("search");
				const urlPattern = collectionSlug === "pages" ? "/{slug}" : collectionSlug === "posts" ? "/blog/{slug}" : void 0;
				collection = await registry.createCollection({
					slug: collectionSlug,
					label,
					labelSingular,
					description: `Imported from WordPress post type: ${postType.name}`,
					supports,
					urlPattern
				});
				result.collectionsCreated.push(collectionSlug);
			}
			const existingFields = await registry.listFields(collection.id);
			const existingFieldSlugs = new Set(existingFields.map((f) => f.slug));
			for (const field of postType.fields) {
				if (existingFieldSlugs.has(field.slug)) continue;
				const fieldType = asFieldType(field.type);
				if (!fieldType) {
					result.errors.push({
						collection: collectionSlug,
						error: `Unknown field type "${field.type}" for field "${field.slug}"`
					});
					continue;
				}
				await registry.createField(collectionSlug, {
					slug: field.slug,
					label: field.label,
					type: fieldType,
					required: field.required,
					unique: false,
					searchable: field.searchable ?? false,
					sortOrder: existingFields.length + result.fieldsCreated.length
				});
				result.fieldsCreated.push({
					collection: collectionSlug,
					field: field.slug
				});
			}
			if ([
				"posts",
				"pages",
				"post",
				"page"
			].includes(collectionSlug)) {
				const { FTSManager } = await import("./fts-manager-6861qcwk_E5WqITwL.mjs").then((n) => n.n);
				const ftsManager = new FTSManager(db);
				if ((await ftsManager.getSearchableFields(collectionSlug)).length > 0) try {
					await ftsManager.enableSearch(collectionSlug);
				} catch {}
			}
		} catch (error) {
			console.error(`Prepare error for collection "${collectionSlug}":`, error);
			result.success = false;
			result.errors.push({
				collection: collectionSlug,
				error: "Failed to prepare collection"
			});
		}
	}
	return result;
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare@_@mjs
var page = () => prepare_exports;
export { page };
