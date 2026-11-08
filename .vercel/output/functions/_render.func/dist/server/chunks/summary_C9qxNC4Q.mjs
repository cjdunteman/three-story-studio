import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./redirect-DjLdw427_BDBqyEyI.mjs";
import "./cache-5DHbpEWu_CTsWW_zV.mjs";
import "./artifacts-Dvdp2KK-_D_x8kJT9.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, r as handleError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { x as notFoundSummaryQuery } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { i as handleNotFoundSummary } from "./redirects-Cpq1catN_BZY6zK38.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs
var summary_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	try {
		const query = parseQuery(url, notFoundSummaryQuery);
		if (isParseError(query)) return query;
		return unwrapResult(await handleNotFoundSummary(db, query.limit));
	} catch (error) {
		return handleError(error, "Failed to fetch 404 summary", "NOT_FOUND_SUMMARY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs
var page = () => summary_exports;
export { page };
