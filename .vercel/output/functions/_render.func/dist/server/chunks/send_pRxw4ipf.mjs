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
import { l as magicLinkSendBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-BU3Nx9g1_1bp6on4H.mjs";
import { n as getSiteBaseUrl } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import { t as resolveEmailLocale } from "./email-locale-Bs3HFdnq_B5SP5yI_.mjs";
import { v as sendMagicLink } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { r as getMagicLinkEmailStrings } from "./emails_CPIKNWAv.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs
var send_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, magicLinkSendBody);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "magic-link/send", 3, 300)).allowed) return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
		if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email is not configured. Magic link authentication requires an email provider.", 503);
		const options = new OptionsRepository(emdash.db);
		const baseUrl = await getSiteBaseUrl(emdash.db, request, emdash.config);
		const siteOptions = await options.getMany(["emdash:site_title", "emdash:locale"]);
		const siteName = siteOptions.get("emdash:site_title") ?? "EmDash";
		const emailLocale = resolveEmailLocale(siteOptions.get("emdash:locale"), request);
		await sendMagicLink({
			baseUrl,
			siteName,
			email: (message) => emdash.email.send(message, "system"),
			emailStrings: await getMagicLinkEmailStrings(emailLocale, siteName),
			emailLocale
		}, createKyselyAdapter(emdash.db), body.email.toLowerCase());
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	} catch (error) {
		console.error("Magic link send error:", error);
		return apiSuccess({
			success: true,
			message: "If an account exists for this email, a magic link has been sent."
		});
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs
var page = () => send_exports;
export { page };
