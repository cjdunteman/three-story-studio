import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { r as taxonomyTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as handleTaxonomyGet, o as handleTaxonomyUpdate, r as handleTaxonomyDelete } from "./taxonomies-5SR76j11_BpsROtKh.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { g as localeFilterQuery } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Ot as updateTaxonomyDefBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs
var _name__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Get a single taxonomy definition
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { name } = params;
	if (!name) return apiError("VALIDATION_ERROR", "Taxonomy name required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleTaxonomyGet(emdash.db, name, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to get taxonomy", "TAXONOMY_GET_ERROR");
	}
};
/**
* Update a taxonomy definition
*/
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { name } = params;
	if (!name) return apiError("VALIDATION_ERROR", "Taxonomy name required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, updateTaxonomyDefBody);
		if (isParseError(body)) return body;
		const result = await handleTaxonomyUpdate(emdash.db, name, {
			...body,
			locale: query.locale
		});
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update taxonomy", "TAXONOMY_UPDATE_ERROR");
	}
};
/**
* Delete a taxonomy, its terms, and their content assignments
*/
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const { name } = params;
	if (!name) return apiError("VALIDATION_ERROR", "Taxonomy name required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	try {
		const result = await handleTaxonomyDelete(emdash.db, name);
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete taxonomy", "TAXONOMY_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_@_@mjs
var page = () => _name__exports;
export { page };
