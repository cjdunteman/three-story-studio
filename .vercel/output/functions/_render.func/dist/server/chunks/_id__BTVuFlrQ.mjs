import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
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
import { m as passkeyRenameBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	prerender: () => false
});
/**
* PATCH - Rename a passkey
*/
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (!id) return apiError("MISSING_PARAM", "Passkey ID is required", 400);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		const credential = await adapter.getCredentialById(id);
		if (!credential || credential.userId !== user.id) return apiError("NOT_FOUND", "Passkey not found", 404);
		const body = await parseBody(request, passkeyRenameBody);
		if (isParseError(body)) return body;
		const trimmedName = body.name.trim() || null;
		await adapter.updateCredentialName(id, trimmedName);
		return apiSuccess({ passkey: {
			id: credential.id,
			name: trimmedName,
			deviceType: credential.deviceType,
			backedUp: credential.backedUp,
			createdAt: credential.createdAt.toISOString(),
			lastUsedAt: credential.lastUsedAt.toISOString()
		} });
	} catch (error) {
		return handleError(error, "Failed to rename passkey", "PASSKEY_RENAME_ERROR");
	}
};
/**
* DELETE - Remove a passkey
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (!id) return apiError("MISSING_PARAM", "Passkey ID is required", 400);
	try {
		const adapter = createKyselyAdapter(emdash.db);
		const credential = await adapter.getCredentialById(id);
		if (!credential || credential.userId !== user.id) return apiError("NOT_FOUND", "Passkey not found", 404);
		if (await adapter.countCredentialsByUserId(user.id) <= 1) return apiError("LAST_PASSKEY", "Cannot remove your last passkey", 400);
		await adapter.deleteCredential(id);
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to delete passkey", "PASSKEY_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_@_@mjs
var page = () => _id__exports;
export { page };
