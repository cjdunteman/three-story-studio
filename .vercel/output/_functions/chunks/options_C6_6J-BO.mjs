import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { d as passkeyOptionsBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-BU3Nx9g1_1bp6on4H.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as createChallengeStore, t as cleanupExpiredChallenges } from "./challenge-store-B1C0V4b3_CteeVtPw.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D2Lua5___uPcaD1rQ.mjs";
import { s as generateAuthenticationOptions } from "./passkey_CpIENnGH.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		after(async () => {
			try {
				await cleanupExpiredChallenges(emdash.db);
			} catch (error) {
				console.error("[passkey] failed to delete expired challenges:", error);
			}
		});
		const body = await parseOptionalBody(request, passkeyOptionsBody, {});
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "passkey/options", 10, 60)).allowed) return rateLimitResponse(60);
		const url = new URL(request.url);
		return apiSuccess({
			success: true,
			options: await generateAuthenticationOptions(getPasskeyConfig(url, await new OptionsRepository(emdash.db).get("emdash:site_title") ?? void 0, getPublicOrigin(url, emdash?.config)), [], createChallengeStore(emdash.db))
		});
	} catch (error) {
		return handleError(error, "Failed to generate passkey options", "PASSKEY_OPTIONS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs
var page = () => options_exports;
export { page };
