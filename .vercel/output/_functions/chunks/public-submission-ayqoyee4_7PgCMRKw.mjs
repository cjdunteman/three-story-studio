import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import { t as CommentRepository } from "./comment-DB74Zpa4_Ce41HKnk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { c as createCommentBody } from "./comments-yiRFx3w5_D_KnyClv.mjs";
import { t as extractRequestMeta } from "./request-meta-bwZ_NsvU_BYmTq3sa.mjs";
import { n as getSiteBaseUrl } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { t as escapeHtml } from "./escape-lsNq38PP_CGNn35SJ.mjs";
import { s as hashIp } from "./comments-Cor_zKml_DDIVg9Xx.mjs";
import { t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import { n as createComment } from "./service-DpiUQVpp_DqxZyPjJ.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/public-submission-ayqoyee4.mjs
var NOTIFICATION_SOURCE = "emdash-comments";
var MAX_EXCERPT_LENGTH = 500;
var CRLF_RE = /[\r\n]/g;
/**
* Build an email notification for a new comment.
*/
function buildCommentNotificationEmail(to, data) {
	const title = data.contentTitle || `${data.collection} item`;
	const subject = `New comment on "${title}"`.replace(CRLF_RE, " ");
	const excerpt = data.commentBody.length > MAX_EXCERPT_LENGTH ? data.commentBody.slice(0, MAX_EXCERPT_LENGTH) + "..." : data.commentBody;
	const adminUrl = `${data.adminBaseUrl}/admin/comments`;
	return {
		to,
		subject,
		text: [
			`${data.commentAuthorName} commented on "${title}":`,
			"",
			excerpt,
			"",
			`View in admin: ${adminUrl}`
		].join("\n"),
		html: [
			`<p><strong>${escapeHtml(data.commentAuthorName)}</strong> commented on &ldquo;${escapeHtml(title)}&rdquo;:</p>`,
			`<blockquote style="border-left:3px solid #ccc;padding-left:12px;margin:12px 0;color:#555">${escapeHtml(excerpt)}</blockquote>`,
			`<p><a href="${escapeHtml(adminUrl)}">View in admin</a></p>`
		].join("\n")
	};
}
/**
* Send a comment notification to the content author if all conditions are met:
* 1. Comment status is "approved"
* 2. Content author exists and has an email
* 3. Email provider is configured
* 4. Commenter is not the content author (no self-notifications)
*
* Returns true if the email was sent, false if skipped.
*/
async function sendCommentNotification(params) {
	const { email, comment, contentAuthor, adminBaseUrl } = params;
	if (comment.status !== "approved") return false;
	if (!contentAuthor?.email) return false;
	if (!email.isAvailable()) return false;
	if (comment.authorEmail.toLowerCase() === contentAuthor.email.toLowerCase()) return false;
	const message = buildCommentNotificationEmail(contentAuthor.email, {
		commentAuthorName: comment.authorName,
		commentBody: comment.body,
		contentTitle: params.contentTitle || "",
		collection: comment.collection,
		adminBaseUrl
	});
	await email.send(message, NOTIFICATION_SOURCE);
	return true;
}
/**
* Look up a content item's author from the database.
*
* Used by the admin moderation route where content info isn't
* readily available (only the comment record is at hand).
*/
async function lookupContentAuthor(db, collection, contentId) {
	validateIdentifier(collection, "collection");
	const contentRow = await db.selectFrom(`ec_${collection}`).select(["slug", "author_id"]).where("id", "=", contentId).executeTakeFirst();
	if (!contentRow) return null;
	const typed = contentRow;
	let author;
	if (typed.author_id) {
		const userRow = await db.selectFrom("users").select([
			"id",
			"name",
			"email",
			"email_verified"
		]).where("id", "=", typed.author_id).executeTakeFirst();
		if (userRow && userRow.email_verified) author = {
			id: userRow.id,
			email: userRow.email,
			name: userRow.name
		};
	}
	return {
		slug: typed.slug,
		author
	};
}
function parseCommentModeration(value) {
	if (value === "all" || value === "first_time" || value === "none") return value;
	return "all";
}
function isModerationDecision(value) {
	if (typeof value !== "object" || value === null || !("status" in value)) return false;
	if (value.status !== "pending" && value.status !== "approved" && value.status !== "spam") return false;
	return !("reason" in value) || value.reason === void 0 || typeof value.reason === "string";
}
async function submitPublicComment(runtime, collection, contentId, request, user) {
	try {
		const body = await parseBody(request, createCommentBody);
		if (isParseError(body)) return body;
		const collectionRow = await runtime.db.selectFrom("_emdash_collections").select([
			"comments_enabled",
			"comments_moderation",
			"comments_closed_after_days",
			"comments_auto_approve_users"
		]).where("slug", "=", collection).executeTakeFirst();
		if (!collectionRow) return apiError("NOT_FOUND", `Collection '${collection}' not found`, 404);
		if (!collectionRow.comments_enabled) return apiError("COMMENTS_DISABLED", "Comments are not enabled for this collection", 403);
		validateIdentifier(collection, "collection");
		const contentRow = (await sql`
			SELECT id, slug, author_id, published_at
			FROM ${sql.ref(`ec_${collection}`)}
			WHERE id = ${contentId}
			AND status = 'published'
			AND deleted_at IS NULL
		`.execute(runtime.db)).rows[0];
		if (!contentRow) return apiError("NOT_FOUND", "Content not found", 404);
		if (collectionRow.comments_closed_after_days > 0) {
			const publishedAt = contentRow.published_at;
			if (publishedAt) {
				const closedDate = new Date(publishedAt);
				closedDate.setDate(closedDate.getDate() + collectionRow.comments_closed_after_days);
				if (/* @__PURE__ */ new Date() > closedDate) return apiError("COMMENTS_CLOSED", "Comments are closed for this content", 403);
			}
		}
		if (body.website_url) return apiSuccess({
			status: "pending",
			message: "Comment submitted for review"
		});
		const meta = extractRequestMeta(request, runtime.config);
		const { getTurnstileSecretKey, verifyTurnstileToken } = await import("./turnstile-Cs2wfkJG_D8jNLS0L.mjs");
		const turnstileSecretKey = getTurnstileSecretKey();
		if (turnstileSecretKey && !await verifyTurnstileToken(body.turnstileToken, turnstileSecretKey, meta.ip)) return apiError("TURNSTILE_FAILED", "CAPTCHA verification failed", 403);
		const { ipSalt } = await resolveSecretsCached(runtime.db);
		const ipHash = meta.ip ? await hashIp(meta.ip, ipSalt) : "unknown";
		if (!(await checkRateLimit(runtime.db, ipHash, "comments/submit", ipHash === "unknown" ? 20 : 5, 600)).allowed) {
			const response = apiError("RATE_LIMITED", "Too many comments. Please try again later.", 429);
			response.headers.set("Retry-After", "600");
			return response;
		}
		const settings = {
			commentsEnabled: true,
			commentsModeration: parseCommentModeration(collectionRow.comments_moderation),
			commentsClosedAfterDays: collectionRow.comments_closed_after_days,
			commentsAutoApproveUsers: collectionRow.comments_auto_approve_users === 1
		};
		const authorName = user?.name || body.authorName;
		const authorEmail = user?.email ?? body.authorEmail;
		let resolvedParentId = body.parentId ?? null;
		if (body.parentId) {
			const parent = await new CommentRepository(runtime.db).findById(body.parentId);
			if (!parent) return apiError("VALIDATION_ERROR", "Parent comment not found", 400);
			if (parent.collection !== collection || parent.contentId !== contentId) return apiError("VALIDATION_ERROR", "Parent comment belongs to different content", 400);
			resolvedParentId = parent.parentId ?? parent.id;
		}
		let contentAuthor;
		if (contentRow.author_id) {
			const authorRow = await runtime.db.selectFrom("users").select([
				"id",
				"name",
				"email",
				"email_verified"
			]).where("id", "=", contentRow.author_id).executeTakeFirst();
			if (authorRow?.email_verified) contentAuthor = {
				id: authorRow.id,
				name: authorRow.name,
				email: authorRow.email
			};
		}
		const result = await createComment(runtime.db, {
			collection,
			contentId,
			parentId: resolvedParentId,
			authorName,
			authorEmail,
			authorUserId: user?.id ?? null,
			body: body.body,
			ipHash,
			userAgent: meta.userAgent
		}, settings, {
			runBeforeCreate: (event) => runtime.hooks.runCommentBeforeCreate(event),
			runModerate: async (event) => {
				const result = await runtime.hooks.invokeExclusiveHook("comment:moderate", event);
				if (!result) return {
					status: "pending",
					reason: "No moderator configured"
				};
				if (result.error) {
					console.error(`[comments] Moderation error (${result.pluginId}):`, result.error.message);
					return {
						status: "pending",
						reason: "Moderation error"
					};
				}
				return isModerationDecision(result.result) ? result.result : {
					status: "pending",
					reason: "Invalid moderation result"
				};
			},
			fireAfterCreate: (event) => {
				after(() => runtime.hooks.runCommentAfterCreate(event).catch((error) => console.error("[comments] afterCreate error:", error instanceof Error ? error.message : error)));
			},
			fireAfterModerate: (event) => {
				return runtime.hooks.runCommentAfterModerate(event).catch((error) => console.error("[comments] afterModerate error:", error instanceof Error ? error.message : error));
			}
		}, {
			id: contentRow.id,
			collection,
			slug: contentRow.slug,
			author: contentAuthor
		});
		if (!result) return apiError("COMMENT_REJECTED", "Comment was rejected", 403);
		if (result.comment.status === "approved" && runtime.email && contentAuthor) try {
			const adminBaseUrl = await getSiteBaseUrl(runtime.db, request, runtime.config);
			await sendCommentNotification({
				email: runtime.email,
				comment: result.comment,
				contentAuthor,
				adminBaseUrl
			});
		} catch (error) {
			console.error("[comments] notification error:", error instanceof Error ? error.message : error);
		}
		return apiSuccess({
			id: result.comment.id,
			status: result.comment.status,
			message: result.comment.status === "approved" ? "Comment published" : "Comment submitted for review"
		}, 201);
	} catch (error) {
		return handleError(error, "Failed to submit comment", "COMMENT_CREATE_ERROR");
	}
}
export { sendCommentNotification as n, submitPublicComment as r, lookupContentAuthor as t };
