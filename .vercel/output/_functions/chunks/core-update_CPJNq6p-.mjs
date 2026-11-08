import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as minimumReleaseAgeSeconds, t as handleCoreUpdateStatus } from "./update-check-ABBJgg6M_Cz1yLTWZ.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs
var core_update_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "updates:read");
	if (denied) return denied;
	const { updateCheck } = emdash.config;
	return unwrapResult(await handleCoreUpdateStatus(emdash.db, {
		enabled: updateCheck !== false,
		minimumReleaseAgeSeconds: minimumReleaseAgeSeconds(updateCheck)
	}));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/core-update@_@mjs
var page = () => core_update_exports;
export { page };
