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
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { _ as setupAdminVerifyBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CEug-p0t_BAZl-HbE.mjs";
import { n as createChallengeStore } from "./challenge-store-B1C0V4b3_CteeVtPw.mjs";
import { r as sessionUnavailableError } from "./session-user-DiE4JKPP_DXJYGG4m.mjs";
import { t as createFirstAdmin } from "./setup-complete-qsJYWutC_Co_sFil_.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D2Lua5___uPcaD1rQ.mjs";
import { t as SETUP_NONCE_COOKIE } from "./setup-nonce-CBFgUFXw_8iinrkYe.mjs";
import "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { _ as secureCompare, g as registerPasskey, v as verifyRegistrationResponse } from "./passkey_CpIENnGH.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs
var admin_verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies, request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!session) return sessionUnavailableError();
	try {
		const options = new OptionsRepository(emdash.db);
		const setupComplete = await options.get("emdash:setup_complete");
		const isComplete = setupComplete === true || setupComplete === "true";
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countUsers() > 0) {
			if (isComplete) return apiError("SETUP_COMPLETE", "Setup already complete", 400);
			return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		}
		const setupState = await options.get("emdash:setup_state");
		if (!setupState || setupState.step !== "admin") return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const cookieNonce = cookies.get(SETUP_NONCE_COOKIE)?.value;
		if (!setupState.nonce || !cookieNonce || !secureCompare(cookieNonce, setupState.nonce)) return apiError("INVALID_STATE", "Setup session expired or tampered with. Please restart the admin step.", 400);
		if (!setupState.email) return apiError("INVALID_STATE", "Invalid setup state. Please restart setup.", 400);
		const body = await parseBody(request, setupAdminVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const siteName = await options.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		const user = await createFirstAdmin(emdash.db, {
			email: setupState.email,
			name: setupState.name ?? null
		});
		if (!user) return apiError("ADMIN_EXISTS", "Admin user already exists", 400);
		await registerPasskey(adapter, user.id, verified, "Setup passkey");
		await options.set("emdash:setup_complete", true);
		session.set("user", { id: user.id });
		await options.delete("emdash:setup_state");
		cookies.delete(SETUP_NONCE_COOKIE, { path: "/_emdash/" });
		return apiSuccess({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			}
		});
	} catch (error) {
		return handleError(error, "Failed to verify admin setup", "SETUP_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs
var page = () => admin_verify_exports;
export { page };
