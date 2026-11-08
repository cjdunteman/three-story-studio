import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as handleMediaFolderUpdate, n as handleMediaFolderDelete, r as handleMediaFolderGet } from "./media-folders-CI0Wydfo_BhHIM6yh.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Jt as mediaFolderIdSchema, qt as mediaFolderBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
function parseFolderId(id) {
	const result = mediaFolderIdSchema.safeParse(id);
	return result.success ? result.data : apiError("VALIDATION_ERROR", "Invalid media folder ID", 400);
}
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	return unwrapResult(await handleMediaFolderGet(emdash.db, id));
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:edit_any");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	const body = await parseBody(request, mediaFolderBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleMediaFolderUpdate(emdash.db, id, body));
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:edit_any");
	if (denied) return denied;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const id = parseFolderId(params.id);
	if (id instanceof Response) return id;
	return unwrapResult(await handleMediaFolderDelete(emdash.db, id));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/_id_@_@mjs
var page = () => _id__exports;
export { page };
