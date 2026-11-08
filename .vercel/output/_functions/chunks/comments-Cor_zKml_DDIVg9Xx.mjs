import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as CommentRepository } from "./comment-DB74Zpa4_Ce41HKnk.mjs";
// node_modules/emdash/dist/comments-Cor_zKml.mjs
async function handleCommentList(db, collection, contentId, options = {}) {
	try {
		const repo = new CommentRepository(db);
		const total = await repo.countByContent(collection, contentId, "approved");
		let publicItems;
		let nextCursor;
		if (options.threaded) {
			const result = await repo.findByContent(collection, contentId, {
				status: "approved",
				limit: 500
			});
			publicItems = CommentRepository.assembleThreads(result.items).map((c) => CommentRepository.toPublicComment(c));
		} else {
			const result = await repo.findByContent(collection, contentId, {
				status: "approved",
				limit: options.limit,
				cursor: options.cursor
			});
			publicItems = result.items.map((c) => CommentRepository.toPublicComment(c));
			nextCursor = result.nextCursor;
		}
		return {
			success: true,
			data: {
				items: publicItems,
				nextCursor,
				total
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Comment list error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_LIST_ERROR",
				message: "Failed to list comments"
			}
		};
	}
}
async function handleCommentInbox(db, options = {}) {
	try {
		const repo = new CommentRepository(db);
		const status = options.status ?? "pending";
		const result = await repo.findByStatus(status, {
			collection: options.collection,
			search: options.search,
			limit: options.limit,
			cursor: options.cursor
		});
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Comment inbox error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_INBOX_ERROR",
				message: "Failed to list comments"
			}
		};
	}
}
async function handleCommentCounts(db) {
	try {
		return {
			success: true,
			data: await new CommentRepository(db).countByStatus()
		};
	} catch (error) {
		console.error("Comment counts error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_COUNTS_ERROR",
				message: "Failed to get comment counts"
			}
		};
	}
}
async function handleCommentGet(db, id) {
	try {
		const comment = await new CommentRepository(db).findById(id);
		if (!comment) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Comment not found: ${id}`
			}
		};
		return {
			success: true,
			data: comment
		};
	} catch (error) {
		console.error("Comment get error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_GET_ERROR",
				message: "Failed to get comment"
			}
		};
	}
}
async function handleCommentDelete(db, id) {
	try {
		if (!await new CommentRepository(db).delete(id)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Comment not found: ${id}`
			}
		};
		return {
			success: true,
			data: { deleted: true }
		};
	} catch (error) {
		console.error("Comment delete error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_DELETE_ERROR",
				message: "Failed to delete comment"
			}
		};
	}
}
async function handleCommentBulk(db, ids, action) {
	try {
		const repo = new CommentRepository(db);
		let affected;
		if (action === "delete") affected = await repo.bulkDelete(ids);
		else affected = await repo.bulkUpdateStatus(ids, {
			approve: "approved",
			spam: "spam",
			trash: "trash"
		}[action]);
		return {
			success: true,
			data: { affected }
		};
	} catch (error) {
		console.error("Comment bulk error:", error);
		return {
			success: false,
			error: {
				code: "COMMENT_BULK_ERROR",
				message: "Failed to perform bulk operation"
			}
		};
	}
}
/**
* Hash an IP address for storage (never store cleartext IPs).
*
* Uses full SHA-256 with a site-specific salt to prevent rainbow-table
* recovery of IPs. The salt must be provided by the caller — typically
* via `resolveSecretsCached(db).ipSalt` from `#config/secrets.js`. The
* salt is generated and persisted on first need so it's stable across
* requests within a deployment but unique per install.
*/
async function hashIp(ip, salt) {
	const data = `ip:${salt}:${ip}`;
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
	return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}
export { handleCommentInbox as a, handleCommentGet as i, handleCommentCounts as n, handleCommentList as o, handleCommentDelete as r, hashIp as s, handleCommentBulk as t };
