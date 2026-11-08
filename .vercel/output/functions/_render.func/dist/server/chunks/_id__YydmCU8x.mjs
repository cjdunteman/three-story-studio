import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as mapErrorStatus } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { F as contentUpdateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm, i as requireEntryEditPerm, n as entryEditAccess, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const locale = url.searchParams.get("locale") || void 0;
	const result = await emdash.handleContentGet(collection, id, locale, { includeDrafts: hasPermission(user, "content:read_drafts") });
	if (result.success && !hasPermission(user, "content:read_drafts")) {
		const data = result.data && typeof result.data === "object" ? result.data : void 0;
		const item = data?.item && typeof data.item === "object" ? data.item : void 0;
		if ((typeof item?.status === "string" ? item.status : null) !== "published") return apiError("NOT_FOUND", `Content item not found: ${id}`, 404);
		if (item) {
			if (item.liveData && typeof item.liveData === "object") item.data = item.liveData;
			delete item.liveData;
			delete item.draftRevisionId;
		}
	}
	return unwrapResult(result);
};
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	const locale = new URL(request.url).searchParams.get("locale") || void 0;
	const body = await parseBody(request, contentUpdateBody);
	if (isParseError(body)) return body;
	if (!emdash?.handleContentUpdate || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const entry = {
		authorId: typeof existingItem?.authorId === "string" ? existingItem.authorId : "",
		status: existingItem?.status
	};
	const editDenied = requireEntryEditPerm(user, entry);
	if (editDenied) return editDenied;
	const checkedRev = typeof existingData?._rev === "string" ? existingData._rev : void 0;
	const rev = entryEditAccess(user, entry) === "draft" ? body._rev ?? checkedRev : body._rev;
	if (body.publishedAt !== void 0 && !hasPermission(user, "content:publish_any")) return apiError("FORBIDDEN", "Writing publishedAt requires content:publish_any permission", 403);
	const resolvedId = typeof existingItem?.id === "string" ? existingItem.id : id;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId, user.id, { override: body.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const { overrideLock: _overrideLock, ...writeBody } = body.authorId !== void 0 && user && hasPermission(user, "content:edit_any") ? body : {
		...body,
		authorId: void 0
	};
	const actor = user ? {
		id: user.id,
		role: user.role
	} : void 0;
	const result = await emdash.handleContentUpdate(collection, resolvedId, {
		...writeBody,
		locale,
		_rev: rev,
		actor
	});
	if (!result.success) return unwrapResult(result);
	if (result.liveContentChanged !== false) await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
};
var DELETE = async ({ params, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentDelete || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const deleteData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const deleteItem = deleteData?.item && typeof deleteData.item === "object" ? deleteData.item : deleteData;
	const deleteDenied = requireOwnerPerm(user, typeof deleteItem?.authorId === "string" ? deleteItem.authorId : "", "content:delete_own", "content:delete_any");
	if (deleteDenied) return deleteDenied;
	const resolvedId = typeof deleteItem?.id === "string" ? deleteItem.id : id;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId, user.id, { override: url.searchParams.get("overrideLock") === "true" });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentDelete(collection, resolvedId);
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_@_@mjs
var page = () => _id__exports;
export { page };
