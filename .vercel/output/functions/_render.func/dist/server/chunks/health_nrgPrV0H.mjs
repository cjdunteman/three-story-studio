import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as getRegistryConfigInput } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import { n as VERSION } from "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess } from "./error-BCMgPxdn_BlGqXbZb.mjs";
// node_modules/emdash/dist/astro/routes/api/health.mjs
var health_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = ({ locals }) => {
	const response = apiSuccess({
		product: "emdash",
		version: VERSION,
		registry: Boolean(getRegistryConfigInput(locals.emdash?.config.registry))
	});
	response.headers.set("Access-Control-Allow-Origin", "*");
	return response;
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/health@_@mjs
var page = () => health_exports;
export { page };
