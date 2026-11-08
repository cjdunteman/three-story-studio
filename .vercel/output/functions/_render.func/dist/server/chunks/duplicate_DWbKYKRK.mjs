import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as mapErrorStatus } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs
var duplicate_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentDuplicate || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:create");
	if (denied) return denied;
	const existing = await emdash.handleContentGet(collection, id);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const readDenied = requireOwnerPerm(user, typeof existingItem?.authorId === "string" ? existingItem.authorId : "", "content:edit_own", "content:edit_any");
	if (readDenied) return readDenied;
	const resolvedId = typeof existingItem?.id === "string" ? existingItem.id : id;
	return unwrapResult(await emdash.handleContentDuplicate(collection, resolvedId, user?.id), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate@_@mjs
var page = () => duplicate_exports;
export { page };
