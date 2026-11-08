import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as checkSiteWriteFence } from "./fence-Dagicj14_KC___fhN.mjs";
import "./cron-D7obTIfk_CTXHi0cN.mjs";
import { n as enableRuntimePlugin } from "./lifecycle-B8d7Rdqx_C_mrsdfz.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs
var enable_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	const writeFence = await checkSiteWriteFence(emdash.db);
	if (writeFence) return writeFence;
	if (!id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	return unwrapResult(await enableRuntimePlugin(emdash, id));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable@_@mjs
var page = () => enable_exports;
export { page };
