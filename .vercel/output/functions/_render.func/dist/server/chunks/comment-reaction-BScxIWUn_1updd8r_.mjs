import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/comment-reaction-BScxIWUn.mjs
/**
* Repository for comment reactions (likes / emoji).
*
* Reactions are deduped per (comment, voter, reaction) by a unique index, so
* a second toggle of the same reaction by the same voter removes it.
*/
var CommentReactionRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Toggle a reaction for a voter on a comment.
	*
	* @returns `{ reacted: true }` if the reaction was added, `{ reacted: false }`
	*   if an existing reaction was removed.
	*/
	async toggle(input) {
		if (((await this.db.insertInto("_emdash_comment_reactions").values({
			id: ulid(),
			comment_id: input.commentId,
			reaction: input.reaction,
			voter_hash: input.voterHash,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}).onConflict((oc) => oc.columns([
			"comment_id",
			"voter_hash",
			"reaction"
		]).doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n) return { reacted: true };
		await this.db.deleteFrom("_emdash_comment_reactions").where("comment_id", "=", input.commentId).where("voter_hash", "=", input.voterHash).where("reaction", "=", input.reaction).execute();
		return { reacted: false };
	}
	/**
	* Aggregate reaction counts for a set of comments.
	*
	* @returns a Map keyed by comment id; comments with no reactions are absent.
	*/
	async countsForComments(commentIds) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).select((eb) => eb.fn.count("id").as("count")).where("comment_id", "in", batch).groupBy(["comment_id", "reaction"]).execute();
			for (const row of rows) {
				const counts = result.get(row.comment_id) ?? {};
				counts[row.reaction] = Number(row.count);
				result.set(row.comment_id, counts);
			}
		}
		return result;
	}
	/**
	* Which reactions a given voter has set, per comment.
	*
	* @returns a Map keyed by comment id whose values are the reaction names the
	*   voter has active on that comment.
	*/
	async viewerReactions(commentIds, voterHash) {
		const result = /* @__PURE__ */ new Map();
		if (commentIds.length === 0) return result;
		for (const batch of chunks(commentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_comment_reactions").select(["comment_id", "reaction"]).where("comment_id", "in", batch).where("voter_hash", "=", voterHash).execute();
			for (const row of rows) {
				const list = result.get(row.comment_id) ?? [];
				list.push(row.reaction);
				result.set(row.comment_id, list);
			}
		}
		return result;
	}
	/**
	* Count a voter's reactions within a recent time window (for rate limiting).
	*/
	async countRecentByVoter(voterHash, windowMinutes = 10) {
		const cutoff = (/* @__PURE__ */ new Date(Date.now() - windowMinutes * 60 * 1e3)).toISOString();
		const result = await this.db.selectFrom("_emdash_comment_reactions").select((eb) => eb.fn.count("id").as("count")).where("voter_hash", "=", voterHash).where("created_at", ">", cutoff).executeTakeFirst();
		return Number(result?.count ?? 0);
	}
};
export { CommentReactionRepository as t };
