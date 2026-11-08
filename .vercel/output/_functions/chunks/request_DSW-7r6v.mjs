import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { b as signupRequestBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-BU3Nx9g1_1bp6on4H.mjs";
import { n as getSiteBaseUrl } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import { _ as requestSignup } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs
var request_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var GENERIC_SUCCESS = {
	success: true,
	message: "If your email domain is allowed, you'll receive a verification email."
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email not configured. Self-signup is unavailable.", 503);
	try {
		const body = await parseBody(request, signupRequestBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "signup/request", 3, 300)).allowed) return apiSuccess(GENERIC_SUCCESS);
		const adapter = createKyselyAdapter(emdash.db);
		const siteName = await new OptionsRepository(emdash.db).get("emdash:site_title") || "EmDash";
		await requestSignup({
			baseUrl: await getSiteBaseUrl(emdash.db, request, emdash.config),
			siteName,
			email: (message) => emdash.email.send(message, "system")
		}, adapter, body.email.toLowerCase().trim());
		return apiSuccess(GENERIC_SUCCESS);
	} catch (error) {
		console.error("Signup request error:", error);
		return apiSuccess(GENERIC_SUCCESS);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs
var page = () => request_exports;
export { page };
