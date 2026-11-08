import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { i as scheduledPolicyRejectionKey } from "./content-policy-BmE0MPZY_DwHUSBvD.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	prerender: () => false
});
var DELETE = async ({ params, locals, url }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:publish_any");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const revision = url.searchParams.get("rev");
		if (!revision) return apiError("INVALID_INPUT", "Rejection revision is required", 400);
		if (!(await new OptionsRepository(emdash.db).compareAndDelete(scheduledPolicyRejectionKey(params.collection, params.id), revision)).applied) return apiError("CONFLICT", "Scheduled publication rejection has changed", 409);
		return apiSuccess({ dismissed: true });
	} catch (error) {
		return handleError(error, "Failed to dismiss scheduled publication rejection", "POLICY_REJECTION_DISMISS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_@_@mjs
var page = () => _id__exports;
export { page };
