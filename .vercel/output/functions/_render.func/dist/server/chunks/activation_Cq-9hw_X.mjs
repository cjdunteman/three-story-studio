import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as handleMediaUsageActivationStatus, t as handleMediaUsageActivationAdvance } from "./media-usage-activation-bWusy3M2_UQZMHeM7.mjs";
import { a as unwrapResult, i as requireDb } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { hn as mediaUsageActivationAdvanceBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { n as requireScope } from "./scopes-DNaY7Ey0_hhUdItA7.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs
var activation_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	return unwrapResult(await handleMediaUsageActivationStatus(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const scopeDenied = requireScope(locals, "admin");
	if (scopeDenied) return scopeDenied;
	const body = await parseBody(request, mediaUsageActivationAdvanceBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaUsageActivationAdvance(emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation@_@mjs
var page = () => activation_exports;
export { page };
