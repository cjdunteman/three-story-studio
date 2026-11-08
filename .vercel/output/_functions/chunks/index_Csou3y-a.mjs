import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs
var _revisionId__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const revisionId = params.revisionId;
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	if (!emdash?.handleRevisionGet) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	return unwrapResult(await emdash.handleRevisionGet(revisionId));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index@_@mjs
var page = () => _revisionId__exports;
export { page };
