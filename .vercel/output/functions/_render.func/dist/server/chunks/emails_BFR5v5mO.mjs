import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./email-console-FFVJWb9N_Dqp4pPnT.mjs";
// node_modules/emdash/dist/astro/routes/api/dev/emails.mjs
var emails_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
var DELETE = async () => {
	return apiError("FORBIDDEN", "Dev emails endpoint is only available in development mode", 403);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs
var page = () => emails_exports;
export { page };
