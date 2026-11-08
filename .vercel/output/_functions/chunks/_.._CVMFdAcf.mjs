import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./route-wire-Ca_HWCZ5_Cu9YQK_s.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import "./scopes-DNaY7Ey0_hhUdItA7.mjs";
import { t as dispatchPluginApiRequest } from "./http-route-dispatch-rXKvTNm9_C0fPN842.mjs";
// node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs
var ____path__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	HEAD: () => HEAD,
	PATCH: () => PATCH,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Handle all methods by matching against plugin-defined routes
*/
var handleRequest = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const pluginId = params.pluginId;
	const path = params.path || "";
	if (!emdash?.handlePluginApiRoute) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	return dispatchPluginApiRequest({
		runtime: emdash,
		pluginId,
		path: `/${path}`,
		request,
		user,
		tokenScopes: locals.tokenScopes,
		invalidateContentCache: cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0
	});
};
var GET = handleRequest;
var HEAD = handleRequest;
var POST = handleRequest;
var PUT = handleRequest;
var PATCH = handleRequest;
var DELETE = handleRequest;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_@_@mjs
var page = () => ____path__exports;
export { page };
