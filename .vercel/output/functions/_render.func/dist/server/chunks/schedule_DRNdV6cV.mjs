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
import { k as contentScheduleBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs
var schedule_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	prerender: () => false
});
/**
* Extract author ID from a content item response (shared by POST and DELETE).
*/
function extractOwnership(data) {
	const obj = data && typeof data === "object" ? data : void 0;
	const item = obj?.item && typeof obj.item === "object" ? obj.item : obj;
	return {
		authorId: typeof item?.authorId === "string" ? item.authorId : "",
		resolvedId: typeof item?.id === "string" ? item.id : void 0
	};
}
var POST = async ({ params, request, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	const body = await parseBody(request, contentScheduleBody);
	if (isParseError(body)) return body;
	if (!emdash?.handleContentSchedule || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const { authorId, resolvedId } = extractOwnership(existing.data);
	const denied = requireOwnerPerm(user, authorId, "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId ?? id, user.id, { override: body.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentSchedule(collection, resolvedId ?? id, body.scheduledAt, {
		_rev: body._rev,
		actor: {
			id: user.id,
			role: user.role
		},
		origin: { source: "api" }
	});
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId ?? id]);
	return unwrapResult(result);
};
var DELETE = async ({ params, locals, url, cache }) => {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentUnschedule || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const { authorId, resolvedId } = extractOwnership(existing.data);
	const denied = requireOwnerPerm(user, authorId, "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId ?? id, user.id, { override: url.searchParams.get("overrideLock") === "true" });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentUnschedule(collection, resolvedId ?? id);
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId ?? id]);
	return unwrapResult(result);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule@_@mjs
var page = () => schedule_exports;
export { page };
