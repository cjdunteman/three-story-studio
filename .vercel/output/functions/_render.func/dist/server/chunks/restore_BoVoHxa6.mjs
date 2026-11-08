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
import { rt as revisionRestoreBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as claimEntryLockForWrite } from "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
// node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs
var restore_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const revisionId = params.revisionId;
	const body = await parseOptionalBody(request, revisionRestoreBody, {});
	if (isParseError(body)) return body;
	if (!emdash?.handleRevisionRestore || !emdash?.handleRevisionGet || !emdash?.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	const revision = await emdash.handleRevisionGet(revisionId);
	if (!revision.success) return apiError(revision.error?.code ?? "UNKNOWN_ERROR", revision.error?.message ?? "Revision not found", mapErrorStatus(revision.error?.code));
	const collection = revision.data?.item?.collection;
	const entryId = revision.data?.item?.entryId;
	if (!collection || !entryId) return apiError("INVALID_REVISION", "Revision is missing collection or entry reference", 400);
	const existing = await emdash.handleContentGet(collection, entryId);
	if (!existing.success) return apiError(existing.error?.code ?? "UNKNOWN_ERROR", existing.error?.message ?? "Content not found", mapErrorStatus(existing.error?.code));
	const denied = requireOwnerPerm(user, existing.data?.item?.authorId ?? "", "content:edit_own", "content:edit_any");
	if (denied) return denied;
	const refusal = await claimEntryLockForWrite(emdash.db, collection, entryId, user.id, { override: body.overrideLock });
	if (refusal) return apiError(refusal.code, refusal.message, mapErrorStatus(refusal.code), { ...refusal.details });
	return unwrapResult(await emdash.handleRevisionRestore(revisionId, user.id));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs
var page = () => restore_exports;
export { page };
