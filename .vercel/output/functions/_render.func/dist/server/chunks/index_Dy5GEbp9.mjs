import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { s as inviteCreateBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as getSiteBaseUrl } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { t as resolveEmailLocale } from "./email-locale-Bs3HFdnq_B5SP5yI_.mjs";
import { d as createInvite, t as InviteError } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { n as getInviteEmailStrings } from "./emails_CPIKNWAv.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs
var invite_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const body = await parseBody(request, inviteCreateBody);
		if (isParseError(body)) return body;
		const role = body.role ?? Role.AUTHOR;
		const siteOptions = await new OptionsRepository(emdash.db).getMany(["emdash:site_title", "emdash:locale"]);
		const siteName = siteOptions.get("emdash:site_title") || "EmDash";
		const baseUrl = await getSiteBaseUrl(emdash.db, request, emdash.config);
		const emailSend = emdash.email?.isAvailable() ? (message) => emdash.email.send(message, "system") : void 0;
		const emailLocale = emailSend ? resolveEmailLocale(siteOptions.get("emdash:locale"), request) : void 0;
		const result = await createInvite({
			baseUrl,
			siteName,
			email: emailSend,
			emailStrings: emailLocale ? await getInviteEmailStrings(emailLocale, siteName) : void 0,
			emailLocale
		}, adapter, body.email, role, user.id);
		if (emailSend) return apiSuccess({
			success: true,
			message: `Invite sent to ${body.email}`
		});
		return apiSuccess({
			success: true,
			message: "Invite created. No email provider configured — share the link manually.",
			inviteUrl: result.url
		}, 200);
	} catch (error) {
		if (error instanceof InviteError) return apiError(error.code.toUpperCase(), error.message, {
			user_exists: 409,
			invalid_token: 400,
			token_expired: 400
		}[error.code] ?? 400);
		return handleError(error, "Failed to create invite", "INVITE_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/index@_@mjs
var page = () => invite_exports;
export { page };
