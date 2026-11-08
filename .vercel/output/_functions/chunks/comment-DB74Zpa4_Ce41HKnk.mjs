import { u as invalidateCommentObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/comment-DB74Zpa4.mjs
/** Matches LIKE wildcard characters and the escape character itself */
var LIKE_ESCAPE_RE = /[%_\\]/g;
var DEFAULT_COMMENT_LIMIT = 50;
var MAX_COMMENT_LIMIT = 100;
/**
* Normalize a caller-supplied page size to a whole number in [1, MAX].
* A fractional value reaching SQLite's `LIMIT` errors, and a negative one
* disables the cap; non-finite input falls back to the default.
*/
function clampLimit(limit) {
	const n = Math.floor(Number(limit));
	if (!Number.isFinite(n)) return DEFAULT_COMMENT_LIMIT;
	return Math.min(Math.max(n, 1), MAX_COMMENT_LIMIT);
}
var CommentRepository = class CommentRepository {
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new comment
	*/
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_comments").values({
			id,
			collection: input.collection,
			content_id: input.contentId,
			parent_id: input.parentId ?? null,
			author_name: input.authorName,
			author_email: input.authorEmail,
			author_user_id: input.authorUserId ?? null,
			body: input.body,
			status: input.status ?? "pending",
			ip_hash: input.ipHash ?? null,
			user_agent: input.userAgent ?? null,
			moderation_metadata: input.moderationMetadata ? JSON.stringify(input.moderationMetadata) : null,
			created_at: now,
			updated_at: now
		}).execute();
		invalidateCommentObjectCache();
		const comment = await this.findById(id);
		if (!comment) throw new Error("Failed to create comment");
		return comment;
	}
	/**
	* Find comment by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("_emdash_comments").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToComment(row) : null;
	}
	/**
	* Find comments for a content item with optional status filter.
	* Results are ordered by created_at ASC (oldest first) for display.
	*/
	async findByContent(collection, contentId, options = {}) {
		const limit = clampLimit(options.limit);
		let query = this.db.selectFrom("_emdash_comments").selectAll().where("collection", "=", collection).where("content_id", "=", contentId);
		if (options.status) query = query.where("status", "=", options.status);
		if (options.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", ">", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", ">", decoded.id)])]));
		}
		query = query.orderBy("created_at", "asc").orderBy("id", "asc").limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((r) => this.rowToComment(r));
		const result = { items };
		if (hasMore && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	/**
	* Find comments by status (moderation inbox).
	* Results are ordered by created_at DESC (newest first).
	*/
	async findByStatus(status, options = {}) {
		const limit = clampLimit(options.limit);
		let query = this.db.selectFrom("_emdash_comments").selectAll().where("status", "=", status);
		if (options.collection) query = query.where("collection", "=", options.collection);
		if (options.search) {
			const term = `%${options.search.replace(LIKE_ESCAPE_RE, (ch) => `\\${ch}`)}%`;
			query = query.where((eb) => eb.or([
				sql`author_name LIKE ${term} ESCAPE '\\'`,
				sql`author_email LIKE ${term} ESCAPE '\\'`,
				sql`body LIKE ${term} ESCAPE '\\'`
			]));
		}
		if (options.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		query = query.orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((r) => this.rowToComment(r));
		const result = { items };
		if (hasMore && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	/** List non-trashed comments for capability-gated plugin administration. */
	async findForPlugin(options = {}) {
		const limit = clampLimit(options.limit);
		let query = this.db.selectFrom("_emdash_comments").selectAll().where("status", "!=", "trash");
		if (options.status) query = query.where("status", "=", options.status);
		if (options.collection) query = query.where("collection", "=", options.collection);
		if (options.contentId) query = query.where("content_id", "=", options.contentId);
		if (options.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		const rows = await query.orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1).execute();
		const items = rows.slice(0, limit).map((row) => this.rowToComment(row));
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	async countForPlugin(options = {}) {
		let query = this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "!=", "trash");
		if (options.status) query = query.where("status", "=", options.status);
		if (options.collection) query = query.where("collection", "=", options.collection);
		if (options.contentId) query = query.where("content_id", "=", options.contentId);
		const result = await query.executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Update comment status
	*/
	async updateStatus(id, status) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.updateTable("_emdash_comments").set({
			status,
			updated_at: now
		}).where("id", "=", id).execute();
		invalidateCommentObjectCache();
		return this.findById(id);
	}
	/** Atomically change status only when the caller's observed state is current. */
	async updateStatusIf(id, status, expectedStatus) {
		const existing = await this.findById(id);
		if (!existing) return { state: "not_found" };
		if (existing.status !== expectedStatus) return {
			state: "conflict",
			comment: existing
		};
		if (status === expectedStatus) return {
			state: "unchanged",
			comment: existing
		};
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const result = await this.db.updateTable("_emdash_comments").set({
			status,
			updated_at: now
		}).where("id", "=", id).where("status", "=", expectedStatus).returningAll().executeTakeFirst();
		if (result) {
			invalidateCommentObjectCache();
			return {
				state: "updated",
				comment: this.rowToComment(result)
			};
		}
		const current = await this.findById(id);
		return !current ? { state: "not_found" } : {
			state: "conflict",
			comment: current
		};
	}
	/**
	* Bulk update comment statuses
	*/
	async bulkUpdateStatus(ids, status) {
		if (ids.length === 0) return 0;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const updatedCount = await withTransaction(this.db, async (db) => {
			let updated = 0;
			for (const batch of chunks([...new Set(ids)], 50)) {
				const result = await db.updateTable("_emdash_comments").set({
					status,
					updated_at: now
				}).where("id", "in", batch).executeTakeFirst();
				if (!db.isTransaction) invalidateCommentObjectCache();
				updated += Number(result.numUpdatedRows ?? 0);
			}
			return updated;
		});
		invalidateCommentObjectCache();
		return updatedCount;
	}
	/**
	* Hard-delete a single comment. Replies cascade via FK.
	*/
	async delete(id) {
		const result = await this.db.deleteFrom("_emdash_comments").where("id", "=", id).executeTakeFirst();
		invalidateCommentObjectCache();
		return (result.numDeletedRows ?? 0) > 0;
	}
	/**
	* Bulk hard-delete comments
	*/
	async bulkDelete(ids) {
		if (ids.length === 0) return 0;
		const result = await this.db.deleteFrom("_emdash_comments").where("id", "in", ids).executeTakeFirst();
		invalidateCommentObjectCache();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete all comments for a content item (cascade on content deletion)
	*/
	async deleteByContent(collection, contentId) {
		const result = await this.db.deleteFrom("_emdash_comments").where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		invalidateCommentObjectCache();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Count comments for a content item, optionally filtered by status
	*/
	async countByContent(collection, contentId, status) {
		let query = this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("content_id", "=", contentId);
		if (status) query = query.where("status", "=", status);
		const result = await query.executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Count comments grouped by status (for inbox badges)
	*
	* Uses four parallel COUNT queries with WHERE filters to leverage partial indexes
	* (idx_comments_pending, idx_comments_approved, idx_comments_spam, idx_comments_trash)
	* instead of a full table GROUP BY scan.
	*/
	async countByStatus() {
		const [pending, approved, spam, trash] = await Promise.all([
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "pending").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "approved").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "spam").executeTakeFirst(),
			this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("status", "=", "trash").executeTakeFirst()
		]);
		return {
			pending: Number(pending?.count ?? 0),
			approved: Number(approved?.count ?? 0),
			spam: Number(spam?.count ?? 0),
			trash: Number(trash?.count ?? 0)
		};
	}
	/**
	* Count approved comments from a given email address.
	* Used for "first time commenter" moderation logic.
	*/
	async countApprovedByEmail(email) {
		const result = await this.db.selectFrom("_emdash_comments").select((eb) => eb.fn.count("id").as("count")).where("author_email", "=", email).where("status", "=", "approved").executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Update the moderation metadata JSON on a comment
	*/
	async updateModerationMetadata(id, metadata) {
		await this.db.updateTable("_emdash_comments").set({ moderation_metadata: JSON.stringify(metadata) }).where("id", "=", id).execute();
	}
	/**
	* Assemble a flat list of comments into a threaded structure (1-level nesting)
	*/
	static assembleThreads(comments) {
		const roots = [];
		const childrenMap = /* @__PURE__ */ new Map();
		for (const comment of comments) if (comment.parentId) {
			const siblings = childrenMap.get(comment.parentId) ?? [];
			siblings.push(comment);
			childrenMap.set(comment.parentId, siblings);
		} else roots.push(comment);
		return roots.map((root) => ({
			...root,
			_replies: childrenMap.get(root.id) ?? []
		}));
	}
	/**
	* Convert a Comment to its public-facing shape
	*/
	static toPublicComment(comment) {
		const pub = {
			id: comment.id,
			parentId: comment.parentId,
			authorName: comment.authorName,
			isRegisteredUser: comment.authorUserId !== null,
			body: comment.body,
			createdAt: comment.createdAt
		};
		if (comment._replies && comment._replies.length > 0) pub.replies = comment._replies.map((r) => CommentRepository.toPublicComment(r));
		return pub;
	}
	rowToComment(row) {
		return {
			id: row.id,
			collection: row.collection,
			contentId: row.content_id,
			parentId: row.parent_id,
			authorName: row.author_name,
			authorEmail: row.author_email,
			authorUserId: row.author_user_id,
			body: row.body,
			status: row.status,
			ipHash: row.ip_hash,
			userAgent: row.user_agent,
			moderationMetadata: row.moderation_metadata ? safeJsonParse(row.moderation_metadata) : null,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	}
};
function safeJsonParse(value) {
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
}
export { CommentRepository as t };
