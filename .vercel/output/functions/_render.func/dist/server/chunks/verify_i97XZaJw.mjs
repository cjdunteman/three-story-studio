import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
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
import { p as passkeyRegisterVerifyBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as validateAllowedOrigins, t as getConfiguredAllowedOrigins } from "./allowed-origins-CEug-p0t_BAZl-HbE.mjs";
import { n as createChallengeStore } from "./challenge-store-B1C0V4b3_CteeVtPw.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D2Lua5___uPcaD1rQ.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { g as registerPasskey, v as verifyRegistrationResponse } from "./passkey_CpIENnGH.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_PASSKEYS = 10;
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		if (await adapter.countCredentialsByUserId(user.id) >= MAX_PASSKEYS) return apiError("PASSKEY_LIMIT", `Maximum of ${MAX_PASSKEYS} passkeys allowed`, 400);
		const body = await parseBody(request, passkeyRegisterVerifyBody);
		if (isParseError(body)) return body;
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const siteName = await optionsRepo.get("emdash:site_title") ?? void 0;
		const siteUrl = getPublicOrigin(url, emdash?.config);
		const passkeyConfig = getPasskeyConfig(url, siteName, siteUrl, validateAllowedOrigins(siteUrl, getConfiguredAllowedOrigins(emdash?.config)));
		const challengeStore = createChallengeStore(emdash.db);
		const verified = await verifyRegistrationResponse(passkeyConfig, body.credential, challengeStore);
		let passKeyName = body.name ?? void 0;
		if (!passKeyName) {
			const pending = await optionsRepo.get(`emdash:passkey_pending:${user.id}`);
			if (pending?.name) passKeyName = pending.name;
		}
		await optionsRepo.delete(`emdash:passkey_pending:${user.id}`);
		const credential = await registerPasskey(adapter, user.id, verified, passKeyName);
		return apiSuccess({ passkey: {
			id: credential.id,
			name: credential.name,
			deviceType: credential.deviceType,
			backedUp: credential.backedUp,
			createdAt: credential.createdAt.toISOString(),
			lastUsedAt: credential.lastUsedAt.toISOString()
		} });
	} catch (error) {
		console.error("Passkey registration verify error:", error);
		const message = error instanceof Error ? error.message : "";
		if (message.includes("credential_exists") || message.includes("already")) return apiError("CREDENTIAL_EXISTS", "This passkey is already registered", 400);
		if (message.includes("challenge") || message.includes("expired")) return apiError("CHALLENGE_EXPIRED", "Registration expired. Please try again.", 400);
		return apiError("PASSKEY_REGISTER_ERROR", "Registration failed", 500);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs
var page = () => verify_exports;
export { page };
