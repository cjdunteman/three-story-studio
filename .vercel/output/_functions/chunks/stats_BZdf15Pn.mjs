import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as getSearchStats } from "./search-BPWTnpnD_D9v_B9jB.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/search/stats.mjs
var stats_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Get search index statistics
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	try {
		return apiSuccess(await getSearchStats(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to get stats", "STATS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs
var page = () => stats_exports;
export { page };
