import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import "./registry-B0-O575m_BFXFyFwY.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./content-repair-Ukdxoq-R_ntNtEF9u.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as handleMediaUsageSummaries } from "./media-usage-X1_20MY-_vcTBPz4d.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Qt as mediaGetQuery, cn as mediaUpdateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm, o as requirePerm, t as canReadMediaUsageCount } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
/**
* Get media item
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const readDenied = requirePerm(user, "media:read");
	if (readDenied) return readDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaGetQuery);
	if (isParseError(query)) return query;
	const result = await emdash.handleMediaGet(id);
	if (!result.success || query.includeUsage !== "1") return unwrapResult(result);
	const includeCount = canReadMediaUsageCount(user, locals.tokenScopes);
	const usageResult = await handleMediaUsageSummaries(emdash.db, [id], { includeCount });
	if (!usageResult.success) return unwrapResult(usageResult);
	const usage = usageResult.data[id];
	if (!usage) return apiError("MEDIA_USAGE_READ_ERROR", "Failed to read media usage", 500);
	return apiSuccess({ item: {
		...result.data.item,
		usage
	} });
};
/**
* Update media metadata
*
* Authors can edit their own media; editors+ can edit any.
*/
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const editDenied = requirePerm(user, "media:edit_own");
	if (editDenied) return editDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaUpdate) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId, "media:edit_own", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		const body = await parseBody(request, mediaUpdateBody);
		if (isParseError(body)) return body;
		return unwrapResult(await emdash.handleMediaUpdate(id, {
			alt: body.alt,
			caption: body.caption,
			width: body.width,
			height: body.height,
			folderId: body.folderId,
			focalX: body.focalX,
			focalY: body.focalY
		}));
	} catch (error) {
		return handleError(error, "Failed to update media", "MEDIA_UPDATE_ERROR");
	}
};
/**
* Delete media item
*
* Authors can delete their own media; editors+ can delete any.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const deleteDenied = requirePerm(user, "media:delete_own");
	if (deleteDenied) return deleteDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaDelete) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const getResult = await emdash.handleMediaGet(id);
		if (!getResult.success || !getResult.data?.item) return apiError("NOT_FOUND", "Media item not found", 404);
		const media = getResult.data.item;
		const ownerDenied = requireOwnerPerm(user, media.authorId, "media:delete_own", "media:delete_any");
		if (ownerDenied) return ownerDenied;
		const result = await emdash.handleMediaDelete(id);
		if (!result.success) return unwrapResult(result);
		if (typeof result.data !== "object" || result.data === null || !("storageDeleted" in result.data) || typeof result.data.storageDeleted !== "boolean") return apiError("MEDIA_DELETE_ERROR", "Failed to delete media", 500);
		return apiSuccess({
			deleted: true,
			storageDeleted: result.data.storageDeleted
		});
	} catch (error) {
		return handleError(error, "Failed to delete media", "MEDIA_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs
var page = () => _id__exports;
export { page };
