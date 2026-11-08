import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { at as searchQuery } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as searchWithDb } from "./search-BPWTnpnD_D9v_B9jB.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/search/index.mjs
var search_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Search content
*
* Query parameters:
* - q: Search query (required)
* - collections: Comma-separated list of collection slugs (optional, defaults to all)
* - status: Filter by status (optional, defaults to 'published')
* - limit: Maximum results (optional, defaults to 20)
*/
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const query = parseQuery(url, searchQuery);
	if (isParseError(query)) return query;
	const collections = query.collections ? query.collections.split(",").map((c) => c.trim()) : void 0;
	const status = query.status && query.status !== "published" && hasPermission(user, "content:read_drafts") ? query.status : "published";
	try {
		await emdash.ensureSearchHealthy?.();
		return apiSuccess(await searchWithDb(emdash.db, query.q, {
			collections,
			status,
			locale: query.locale,
			limit: query.limit,
			cursor: query.cursor,
			scope: query.scope
		}));
	} catch (error) {
		return handleError(error, "Search failed", "SEARCH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs
var page = () => search_exports;
export { page };
