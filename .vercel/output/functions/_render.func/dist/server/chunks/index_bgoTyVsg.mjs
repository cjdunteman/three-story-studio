import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as mapErrorStatus } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { S as contentListQuery, b as contentCreateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs
var _collection__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	const collection = params.collection;
	const query = parseQuery(url, contentListQuery);
	if (isParseError(query)) return query;
	const params_ = hasPermission(user, "content:read_drafts") ? query : {
		...query,
		status: "published"
	};
	return unwrapResult(await emdash.handleContentList(collection, params_));
};
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.handleContentCreate || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:create");
	if (denied) return denied;
	const collection = params.collection;
	const body = await parseBody(request, contentCreateBody);
	if (isParseError(body)) return body;
	if (body.translationOf) {
		const source = await emdash.handleContentGet(collection, body.translationOf);
		if (!source.success) return apiError(source.error?.code ?? "NOT_FOUND", source.error?.message ?? "Translation source not found", mapErrorStatus(source.error?.code));
		const translationDenied = requireOwnerPerm(user, source.data.item.authorId ?? "", "content:edit_own", "content:edit_any");
		if (translationDenied) return translationDenied;
	}
	if ((body.publishedAt !== void 0 || body.createdAt !== void 0) && !hasPermission(user, "content:publish_any")) return apiError("FORBIDDEN", "Writing publishedAt or createdAt requires content:publish_any permission", 403);
	const actor = user ? {
		id: user.id,
		role: user.role
	} : void 0;
	return unwrapResult(await emdash.handleContentCreate(collection, {
		...body,
		authorId: user?.id,
		locale: body.locale,
		translationOf: body.translationOf,
		actor
	}), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/index@_@mjs
var page = () => _collection__exports;
export { page };
