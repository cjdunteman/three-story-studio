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
import { T as contentPublishBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs
var publish_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false,
	publishContent: () => publishContent
});
async function publishContent({ params, request, locals, url, cache }, originSource) {
	const { emdash, user } = locals;
	const collection = params.collection;
	const id = params.id;
	if (!emdash?.handleContentPublish || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseOptionalBody(request, contentPublishBody, {});
	if (isParseError(body)) return body;
	const locale = url.searchParams.get("locale") || void 0;
	const existing = await emdash.handleContentGet(collection, id, locale);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Unknown error", mapErrorStatus(existing.error?.code));
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const denied = requireOwnerPerm(user, typeof existingItem?.authorId === "string" ? existingItem.authorId : "", "content:publish_own", "content:publish_any");
	if (denied) return denied;
	const publishedAt = body?.publishedAt;
	if (publishedAt !== void 0 && !hasPermission(user, "content:publish_any")) return apiError("FORBIDDEN", "Setting publishedAt requires content:publish_any permission", 403);
	const resolvedId = typeof existingItem?.id === "string" ? existingItem.id : id;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, resolvedId, user.id, { override: body?.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	const result = await emdash.handleContentPublish(collection, resolvedId, {
		publishedAt,
		_rev: body?._rev,
		actor: {
			id: user.id,
			role: user.role
		},
		origin: { source: originSource }
	});
	if (!result.success) return unwrapResult(result);
	await invalidateRouteCache(cache, [collection, resolvedId]);
	return unwrapResult(result);
}
var POST = (context) => publishContent(context, "api");
export { publish_exports as n, publishContent as t };
