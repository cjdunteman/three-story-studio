import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as getSiteBaseUrl } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { t as resolveEmailLocale } from "./email-locale-Bs3HFdnq_B5SP5yI_.mjs";
import { v as sendMagicLink } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { r as getMagicLinkEmailStrings } from "./emails_CPIKNWAv.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs
var send_recovery_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "User ID required", 400);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		const targetUser = await adapter.getUserById(id);
		if (!targetUser) return apiError("NOT_FOUND", "User not found", 404);
		if (!emdash.email?.isAvailable()) return apiError("EMAIL_NOT_CONFIGURED", "Email is not configured. Recovery links require an email provider.", 503);
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
		}, adapter, targetUser.email, "recovery");
		return apiSuccess({
			success: true,
			message: "Recovery link sent"
		});
	} catch (error) {
		return handleError(error, "Failed to send recovery link", "RECOVERY_SEND_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery@_@mjs
var page = () => send_recovery_exports;
export { page };
