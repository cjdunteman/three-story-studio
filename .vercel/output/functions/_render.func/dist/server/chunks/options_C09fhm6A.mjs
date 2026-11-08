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
import { r as parseOptionalBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { f as passkeyRegisterOptionsBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as createChallengeStore } from "./challenge-store-B1C0V4b3_CteeVtPw.mjs";
import { t as getPasskeyConfig } from "./passkey-config-D2Lua5___uPcaD1rQ.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
import { l as generateRegistrationOptions } from "./passkey_CpIENnGH.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs
var options_exports = /* @__PURE__ */ __exportAll({
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
		const body = await parseOptionalBody(request, passkeyRegisterOptionsBody, {});
		if (isParseError(body)) return body;
		const existingCredentials = await adapter.getCredentialsByUserId(user.id);
		const url = new URL(request.url);
		const optionsRepo = new OptionsRepository(emdash.db);
		const passkeyConfig = getPasskeyConfig(url, await optionsRepo.get("emdash:site_title") ?? void 0, getPublicOrigin(url, emdash?.config));
		const challengeStore = createChallengeStore(emdash.db);
		const registrationOptions = await generateRegistrationOptions(passkeyConfig, {
			id: user.id,
			email: user.email,
			name: user.name
		}, existingCredentials, challengeStore);
		if (body.name) await optionsRepo.set(`emdash:passkey_pending:${user.id}`, { name: body.name });
		return apiSuccess({ options: registrationOptions });
	} catch (error) {
		return handleError(error, "Failed to generate registration options", "PASSKEY_REGISTER_OPTIONS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs
var page = () => options_exports;
export { page };
