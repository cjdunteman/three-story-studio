import { t as CommentRepository } from "./comment-DB74Zpa4_Ce41HKnk.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/dist/service-DpiUQVpp.mjs
/**
* Comment Service
*
* Orchestrates comment creation through the hook pipeline:
*   1. Run comment:beforeCreate pipeline (transform/reject)
*   2. Query priorApprovedCount for first-time moderation
*   3. Invoke comment:moderate exclusive hook (or built-in fallback)
*   4. Save comment with determined status
*   5. Fire comment:afterCreate (fire-and-forget)
*
* Also handles admin moderation (status changes) with afterModerate hooks.
*/
var CommentStatusConflictError = class extends Error {
	code = "COMMENT_STATUS_CONFLICT";
	currentStatus;
	constructor(currentStatus) {
		super("Comment status changed; read the current comment before retrying");
		this.name = "CommentStatusConflictError";
		this.currentStatus = currentStatus;
	}
};
var commentModerationALS = new AsyncLocalStorage();
/**
* Create a comment through the full hook pipeline.
*
* Returns null if the comment was rejected by a beforeCreate handler.
*/
async function createComment(db, input, collectionSettings, hooks, contentInfo) {
	const repo = new CommentRepository(db);
	const beforeCreateEvent = {
		comment: {
			collection: input.collection,
			contentId: input.contentId,
			parentId: input.parentId ?? null,
			authorName: input.authorName,
			authorEmail: input.authorEmail,
			authorUserId: input.authorUserId ?? null,
			body: input.body,
			ipHash: input.ipHash ?? null,
			userAgent: input.userAgent ?? null
		},
		metadata: {}
	};
	const result = await hooks.runBeforeCreate(beforeCreateEvent);
	if (result === false) return null;
	const event = result;
	const priorApprovedCount = await repo.countApprovedByEmail(event.comment.authorEmail);
	const moderateEvent = {
		comment: event.comment,
		metadata: event.metadata,
		collectionSettings,
		priorApprovedCount
	};
	const decision = await hooks.runModerate(moderateEvent);
	const comment = await repo.create({
		collection: event.comment.collection,
		contentId: event.comment.contentId,
		parentId: event.comment.parentId,
		authorName: event.comment.authorName,
		authorEmail: event.comment.authorEmail,
		authorUserId: event.comment.authorUserId,
		body: event.comment.body,
		status: decision.status,
		ipHash: event.comment.ipHash,
		userAgent: event.comment.userAgent,
		moderationMetadata: Object.keys(event.metadata).length > 0 ? event.metadata : null
	});
	if (contentInfo) {
		const afterEvent = {
			comment: commentToStored(comment),
			metadata: event.metadata,
			content: {
				id: contentInfo.id,
				collection: contentInfo.collection,
				slug: contentInfo.slug,
				title: contentInfo.title
			},
			contentAuthor: contentInfo.author
		};
		hooks.fireAfterCreate(afterEvent);
	}
	return {
		comment,
		decision
	};
}
/**
* Admin moderation — change a comment's status.
* Fires comment:afterModerate hook.
*/
async function moderateComment(db, id, newStatus, expectedStatus, origin, hooks, onApproved) {
	const active = commentModerationALS.getStore();
	if (active?.has(id)) throw new Error("Recursive comment moderation is not allowed");
	const next = new Set(active);
	next.add(id);
	return commentModerationALS.run(next, () => moderateCommentWithinGuard(db, id, newStatus, expectedStatus, origin, hooks, onApproved));
}
async function moderateCommentWithinGuard(db, id, newStatus, expectedStatus, origin, hooks, onApproved) {
	const result = await new CommentRepository(db).updateStatusIf(id, newStatus, expectedStatus);
	if (result.state === "not_found") return null;
	if (result.state === "conflict") throw new CommentStatusConflictError(result.comment.status);
	if (result.state === "unchanged") return result.comment;
	const updated = result.comment;
	if (newStatus === "approved") await onApproved?.(updated);
	const afterEvent = {
		comment: commentToStored(updated),
		previousStatus: expectedStatus,
		newStatus,
		moderator: origin.source === "admin" ? {
			id: origin.userId,
			name: origin.name
		} : {
			id: origin.pluginId,
			name: null
		},
		origin: origin.source === "admin" ? {
			source: "admin",
			userId: origin.userId
		} : {
			source: "plugin",
			pluginId: origin.pluginId
		}
	};
	await hooks.fireAfterModerate(afterEvent);
	return updated;
}
function commentToStored(comment) {
	return {
		id: comment.id,
		collection: comment.collection,
		contentId: comment.contentId,
		parentId: comment.parentId,
		authorName: comment.authorName,
		authorEmail: comment.authorEmail,
		authorUserId: comment.authorUserId,
		body: comment.body,
		status: comment.status,
		moderationMetadata: comment.moderationMetadata,
		createdAt: comment.createdAt,
		updatedAt: comment.updatedAt
	};
}
export { createComment as n, moderateComment as r, CommentStatusConflictError as t };
