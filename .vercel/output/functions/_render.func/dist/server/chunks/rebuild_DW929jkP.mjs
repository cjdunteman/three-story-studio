import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { ot as searchRebuildBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./search-BPWTnpnD_D9v_B9jB.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs
var rebuild_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Rebuild the search index for a collection
*
* Body:
* - collection: Collection slug to rebuild (required)
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchRebuildBody);
	if (isParseError(body)) return body;
	const ftsManager = new FTSManager(emdash.db);
	try {
		const config = await ftsManager.getSearchConfig(body.collection);
		if (!config?.enabled) return apiError("SEARCH_NOT_ENABLED", `Search is not enabled for collection "${body.collection}"`, 400);
		const searchableFields = await ftsManager.getSearchableFields(body.collection);
		if (searchableFields.length === 0) return apiError("NO_SEARCHABLE_FIELDS", `No searchable fields defined for collection "${body.collection}"`, 400);
		await ftsManager.rebuildIndex(body.collection, searchableFields, config.weights, config.tokenize);
		const stats = await ftsManager.getIndexStats(body.collection);
		return apiSuccess({
			collection: body.collection,
			indexed: stats?.indexed ?? 0
		});
	} catch (error) {
		return handleError(error, "Failed to rebuild index", "REBUILD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs
var page = () => rebuild_exports;
export { page };
