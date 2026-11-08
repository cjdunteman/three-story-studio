import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./comment-DB74Zpa4_Ce41HKnk.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import { s as commentStatusBody } from "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { i as handleCommentGet } from "./comments-Cor_zKml_DDIVg9Xx.mjs";
import { t as CommentStatusConflictError } from "./service-DpiUQVpp_DqxZyPjJ.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs
var status_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!id) return apiError("VALIDATION_ERROR", "Comment ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "comments:moderate");
	if (denied) return denied;
	try {
		const body = await parseBody(request, commentStatusBody);
		if (isParseError(body)) return body;
		const newStatus = body.status;
		const existing = await handleCommentGet(emdash.db, id);
		if (!existing.success) return unwrapResult(existing);
		const previousStatus = existing.data.status;
		if (!emdash.handleCommentModerate) return apiError("COMMENT_MODERATION_UNAVAILABLE", "Comment moderation is unavailable", 500);
		const updated = await emdash.handleCommentModerate(id, newStatus, {
			id: user.id,
			name: user.name ?? null
		}, previousStatus, request);
		if (!updated) return apiError("NOT_FOUND", "Comment not found", 404);
		return apiSuccess(updated);
	} catch (error) {
		if (error instanceof CommentStatusConflictError) return apiError(error.code, error.message, 409, { currentStatus: error.currentStatus });
		if (typeof error === "object" && error !== null && "code" in error && error.code === "COMMENT_MODERATION_IN_PROGRESS") return apiError("COMMENT_MODERATION_IN_PROGRESS", "Comment moderation is already in progress", 409);
		return handleError(error, "Failed to update comment status", "COMMENT_STATUS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs
var page = () => status_exports;
export { page };
