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
import { it as searchEnableBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./search-BPWTnpnD_D9v_B9jB.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/search/enable.mjs
var enable_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Enable or disable search for a collection
*
* Body:
* - collection: Collection slug (required)
* - enabled: boolean (required)
* - weights: Optional field weights for ranking
* - tokenize: Optional FTS5 tokenizer configuration
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	const body = await parseBody(request, searchEnableBody);
	if (isParseError(body)) return body;
	const ftsManager = new FTSManager(emdash.db);
	try {
		if (body.enabled) {
			await ftsManager.enableSearch(body.collection, {
				weights: body.weights,
				tokenize: body.tokenize
			});
			const stats = await ftsManager.getIndexStats(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: true,
				indexed: stats?.indexed ?? 0
			});
		} else {
			await ftsManager.disableSearch(body.collection);
			return apiSuccess({
				collection: body.collection,
				enabled: false
			});
		}
	} catch (error) {
		return handleError(error, "Failed to update search config", "SEARCH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs
var page = () => enable_exports;
export { page };
