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
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { g as setupAdminBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as createChallengeStore } from "./challenge-store-B1C0V4b3_CteeVtPw.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D2Lua5___uPcaD1rQ.mjs";
import { n as SETUP_NONCE_MAX_AGE_SECONDS, t as SETUP_NONCE_COOKIE } from "./setup-nonce-CBFgUFXw_8iinrkYe.mjs";
import "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { l as generateRegistrationOptions, u as generateToken } from "./passkey_CpIENnGH.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/admin.mjs
var admin_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies, request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const options = new OptionsRepository(emdash.db);
		const setupComplete = await options.get("emdash:setup_complete");
		const isComplete = setupComplete === true || setupComplete === "true";
		if (await createKyselyAdapter(emdash.db).countUsers() > 0) {
			if (isComplete) return apiError("SETUP_COMPLETE", "Setup already complete", 400);
			return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		}
		const body = await parseBody(request, setupAdminBody);
		if (isParseError(body)) return body;
		const existingState = await options.get("emdash:setup_state");
		const nonce = generateToken();
		const url = new URL(request.url);
		const siteName = await options.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl);
		const challengeStore = createChallengeStore(emdash.db);
		const tempUser = {
			id: `setup-${Date.now()}`,
			email: body.email.toLowerCase(),
			name: body.name || null
		};
		const registrationOptions = await generateRegistrationOptions(passkeyConfig, tempUser, [], challengeStore);
		await options.set("emdash:setup_state", {
			...existingState,
			step: "admin",
			email: body.email.toLowerCase(),
			name: body.name || null,
			tempUserId: tempUser.id,
			nonce
		});
		const publicOrigin = new URL(siteUrl);
		cookies.set(SETUP_NONCE_COOKIE, nonce, {
			path: "/_emdash/",
			httpOnly: true,
			sameSite: "strict",
			secure: publicOrigin.protocol === "https:",
			maxAge: SETUP_NONCE_MAX_AGE_SECONDS
		});
		return apiSuccess({
			success: true,
			options: registrationOptions
		});
	} catch (error) {
		return handleError(error, "Failed to create admin", "SETUP_ADMIN_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin@_@mjs
var page = () => admin_exports;
export { page };
