import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./comment-DB74Zpa4_Ce41HKnk.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { r as submitPublicComment } from "./public-submission-ayqoyee4_7PgCMRKw.mjs";
import { o as handleCommentList } from "./comments-Cor_zKml_DDIVg9Xx.mjs";
import "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import "./service-DpiUQVpp_DqxZyPjJ.mjs";
// node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs
var _contentId__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* List approved comments for a content item (public, no auth required)
*/
var GET = async ({ params, url, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	try {
		const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);
		const cursor = url.searchParams.get("cursor") ?? void 0;
		const threaded = url.searchParams.get("threaded") === "true";
		const collectionRow = await emdash.db.selectFrom("_emdash_collections").select(["comments_enabled"]).where("slug", "=", collection).executeTakeFirst();
		if (!collectionRow) return apiError("NOT_FOUND", `Collection '${collection}' not found`, 404);
		if (!collectionRow.comments_enabled) return apiError("COMMENTS_DISABLED", "Comments are not enabled for this collection", 403);
		return unwrapResult(await handleCommentList(emdash.db, collection, contentId, {
			limit,
			cursor,
			threaded
		}));
	} catch (error) {
		return handleError(error, "Failed to list comments", "COMMENT_LIST_ERROR");
	}
};
/**
* Submit a comment (public, gated by anti-spam checks)
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	return submitPublicComment(emdash, collection, contentId, request, user);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index@_@mjs
var page = () => _contentId__exports;
export { page };
