import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as handleMediaUsageCollectionDeletionRetry } from "./media-usage-work-B2RaoJIa_URCW5K2T.mjs";
import { a as unwrapResult, i as requireDb } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { xn as mediaUsageCollectionDeletionRetryBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { n as requireScope } from "./scopes-DNaY7Ey0_hhUdItA7.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs
var retry_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const dbErr = requireDb(locals.emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(locals.user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const body = await parseBody(request, mediaUsageCollectionDeletionRetryBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaUsageCollectionDeletionRetry(locals.emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry@_@mjs
var page = () => retry_exports;
export { page };
