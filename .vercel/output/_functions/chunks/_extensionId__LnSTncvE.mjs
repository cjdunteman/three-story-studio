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
import { n as dispatchPluginEditorExtensionApiRequest } from "./http-route-dispatch-rXKvTNm9_C0fPN842.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs
var _extensionId__exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const kind = params.kind;
	if (kind !== "panel" && kind !== "action") return apiError("NOT_FOUND", "Plugin editor extension not found", 404);
	return dispatchPluginEditorExtensionApiRequest({
		runtime: emdash,
		pluginId: params.pluginId,
		kind,
		extensionId: params.extensionId,
		collection: params.collection,
		entryId: params.id,
		request,
		user,
		tokenScopes: locals.tokenScopes,
		invalidateContentCache: cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_@_@mjs
var page = () => _extensionId__exports;
export { page };
