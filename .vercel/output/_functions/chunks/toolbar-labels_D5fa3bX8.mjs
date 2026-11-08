import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as loadVisualEditingToolbarLabels } from "./server_CCgKnvEo.mjs";
// node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs
var toolbar_labels_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request }) => {
	const labels = await loadVisualEditingToolbarLabels(request);
	const response = apiSuccess({
		editMode: labels.editMode,
		hideToolbar: labels.hideToolbar
	});
	response.headers.set("Cache-Control", "private, no-store");
	return response;
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels@_@mjs
var page = () => toolbar_labels_exports;
export { page };
