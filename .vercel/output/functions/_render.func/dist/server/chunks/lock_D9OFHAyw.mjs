import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as mapErrorStatus } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { G as entryLockAcquireBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { i as requireEntryEditPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { i as handleEntryLockRelease, n as handleEntryLockAcquire, r as handleEntryLockRead } from "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs
var lock_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* Resolves the entry the way every other single-entry route does, and applies
* the same edit permission, since holding a lock is the prelude to a write.
*/
async function resolveEntry(locals, collection, id, locale) {
	const { emdash, user } = locals;
	if (!emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const denied = requireEntryEditPerm(user, {
		authorId: typeof existingItem?.authorId === "string" ? existingItem.authorId : "",
		status: existingItem?.status
	});
	if (denied) return denied;
	return {
		resolvedId: typeof existingItem?.id === "string" ? existingItem.id : id,
		userId: user.id
	};
}
var GET = async ({ params, locals, url }) => {
	const collection = params.collection;
	const id = params.id;
	const resolved = await resolveEntry(locals, collection, id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockRead(locals.emdash.db, collection, resolved.resolvedId, resolved.userId));
};
var POST = async ({ params, request, locals, url }) => {
	const collection = params.collection;
	const id = params.id;
	const body = await parseOptionalBody(request, entryLockAcquireBody, {});
	if (isParseError(body)) return body;
	const resolved = await resolveEntry(locals, collection, id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockAcquire(locals.emdash.db, collection, resolved.resolvedId, resolved.userId, {
		takeover: body?.takeover,
		token: body?.token
	}));
};
var DELETE = async ({ params, locals, url }) => {
	const collection = params.collection;
	const id = params.id;
	const resolved = await resolveEntry(locals, collection, id, url.searchParams.get("locale") || void 0);
	if (resolved instanceof Response) return resolved;
	return unwrapResult(await handleEntryLockRelease(locals.emdash.db, collection, resolved.resolvedId, resolved.userId, { token: url.searchParams.get("token") ?? void 0 }));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock@_@mjs
var page = () => lock_exports;
export { page };
