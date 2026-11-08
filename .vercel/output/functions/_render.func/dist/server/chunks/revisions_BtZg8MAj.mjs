import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs
var revisions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleRevisionList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const limitParam = url.searchParams.get("limit");
	const parsedLimit = limitParam ? parseInt(limitParam, 10) : void 0;
	return unwrapResult(await emdash.handleRevisionList(collection, id, { limit: parsedLimit ? Math.max(1, Math.min(parsedLimit, 100)) : void 0 }));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions@_@mjs
var page = () => revisions_exports;
export { page };
