import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { u as invalidateCommentObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
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
import { l as createReactionBody } from "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as extractRequestMeta } from "./request-meta-bwZ_NsvU_BYmTq3sa.mjs";
import { t as CommentReactionRepository } from "./comment-reaction-BScxIWUn_1updd8r_.mjs";
import { s as hashIp } from "./comments-Cor_zKml_DDIVg9Xx.mjs";
// node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs
var reactions_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/** Max reactions a single voter may register per window before throttling. */
var REACTION_RATE_LIMIT = 30;
var REACTION_RATE_WINDOW_MINUTES = 10;
/**
* Reactions the system accepts. Positive-only for now (matches the shipped
* widget); kept as an allowlist so a voter can't spam arbitrary reaction
* strings and bloat a comment's count map. Extend (or make configurable) as
* the UI grows.
*/
var ALLOWED_REACTIONS = /* @__PURE__ */ new Set(["like"]);
/**
* Toggle a reaction for a voter on an approved comment belonging to the given
* content item. Rate-limited per voter.
*/
async function handleReactionToggle(db, params) {
	try {
		const { collection, contentId, commentId, reaction, voterHash } = params;
		if (!ALLOWED_REACTIONS.has(reaction)) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Unsupported reaction"
			}
		};
		const comment = await db.selectFrom("_emdash_comments").select(["id", "status"]).where("id", "=", commentId).where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		if (!comment) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Comment not found"
			}
		};
		if (comment.status !== "approved") return {
			success: false,
			error: {
				code: "COMMENT_NOT_APPROVED",
				message: "Cannot react to this comment"
			}
		};
		const repo = new CommentReactionRepository(db);
		if (await repo.countRecentByVoter(voterHash, REACTION_RATE_WINDOW_MINUTES) >= REACTION_RATE_LIMIT) return {
			success: false,
			error: {
				code: "RATE_LIMITED",
				message: "Too many reactions. Please try again later."
			}
		};
		const { reacted } = await repo.toggle({
			commentId,
			reaction,
			voterHash
		});
		const countsMap = await repo.countsForComments([commentId]);
		invalidateCommentObjectCache();
		return {
			success: true,
			data: {
				commentId,
				reaction,
				reacted,
				counts: countsMap.get(commentId) ?? {}
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REACTION_TOGGLE_ERROR",
				message: "Failed to toggle reaction"
			}
		};
	}
}
/**
* Read aggregate reaction counts for every approved comment on a content item,
* plus (optionally) which reactions the current voter has active.
*/
async function handleReactionCounts(db, collection, contentId, voterHash) {
	try {
		const ids = (await db.selectFrom("_emdash_comments").select("id").where("collection", "=", collection).where("content_id", "=", contentId).where("status", "=", "approved").execute()).map((c) => c.id);
		const repo = new CommentReactionRepository(db);
		const countsMap = await repo.countsForComments(ids);
		const reactions = {};
		for (const [id, counts] of countsMap) reactions[id] = counts;
		const data = { reactions };
		if (voterHash) {
			const viewerMap = await repo.viewerReactions(ids, voterHash);
			const viewer = {};
			for (const [id, list] of viewerMap) viewer[id] = list;
			data.viewer = viewer;
		}
		return {
			success: true,
			data
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REACTION_COUNTS_ERROR",
				message: "Failed to read reactions"
			}
		};
	}
}
var GET = async ({ params, request, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	try {
		const meta = extractRequestMeta(request, emdash.config);
		let voterHash = "unknown";
		if (meta.ip) {
			const { ipSalt } = await resolveSecretsCached(emdash.db);
			voterHash = await hashIp(meta.ip, ipSalt);
		}
		return unwrapResult(await handleReactionCounts(emdash.db, collection, contentId, voterHash));
	} catch (error) {
		return handleError(error, "Failed to read reactions", "REACTION_COUNTS_ERROR");
	}
};
var POST = async ({ params, request, locals }) => {
	const { emdash } = locals;
	const { collection, contentId } = params;
	if (!collection || !contentId) return apiError("VALIDATION_ERROR", "Collection and content ID required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	try {
		const body = await parseBody(request, createReactionBody);
		if (isParseError(body)) return body;
		if (body.website_url) return apiSuccess({
			reacted: false,
			counts: {}
		});
		const meta = extractRequestMeta(request, emdash.config);
		let voterHash = "unknown";
		if (meta.ip) {
			const { ipSalt } = await resolveSecretsCached(emdash.db);
			voterHash = await hashIp(meta.ip, ipSalt);
		}
		return unwrapResult(await handleReactionToggle(emdash.db, {
			collection,
			contentId,
			commentId: body.commentId,
			reaction: body.reaction,
			voterHash
		}), 200);
	} catch (error) {
		return handleError(error, "Failed to toggle reaction", "REACTION_TOGGLE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions@_@mjs
var page = () => reactions_exports;
export { page };
