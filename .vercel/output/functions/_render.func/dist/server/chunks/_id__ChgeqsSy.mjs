import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { r as handleApiTokenRevoke } from "./api-tokens-GNCsIegW_CkRWJi4k.mjs";
import "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
/**
* Revoke (delete) an API token.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const tokenId = params.id;
	if (!tokenId) return apiError("VALIDATION_ERROR", "Token ID is required", 400);
	try {
		return unwrapResult(await handleApiTokenRevoke(emdash.db, tokenId, user.id));
	} catch (error) {
		return handleError(error, "Failed to revoke API token", "TOKEN_REVOKE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs
var page = () => _id__exports;
export { page };
