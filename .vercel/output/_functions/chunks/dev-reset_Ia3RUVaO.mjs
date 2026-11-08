import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs
var dev_reset_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	return apiError("FORBIDDEN", "Dev reset is only available in development mode", 403);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-reset@_@mjs
var page = () => dev_reset_exports;
export { page };
