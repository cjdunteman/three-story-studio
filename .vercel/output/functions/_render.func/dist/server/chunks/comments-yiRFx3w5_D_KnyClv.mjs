import { z } from "zod";
// node_modules/emdash/dist/comments-yiRFx3w5.mjs
var createCommentBody = z.object({
	authorName: z.string().min(1).max(100),
	authorEmail: z.email(),
	body: z.string().min(1).max(5e3),
	parentId: z.string().optional(),
	website_url: z.string().optional(),
	turnstileToken: z.string().max(2048).optional()
}).meta({ id: "CreateCommentBody" });
var createReactionBody = z.object({
	commentId: z.string().min(1),
	reaction: z.string().min(1).max(20).default("like"),
	website_url: z.string().optional()
}).meta({ id: "CreateReactionBody" });
var commentStatusBody = z.object({ status: z.enum([
	"approved",
	"pending",
	"spam",
	"trash"
]) }).meta({ id: "CommentStatusBody" });
var commentBulkBody = z.object({
	ids: z.array(z.string().min(1)).min(1).max(100),
	action: z.enum([
		"approve",
		"spam",
		"trash",
		"delete"
	])
}).meta({ id: "CommentBulkBody" });
var commentListQuery = z.object({
	status: z.enum([
		"pending",
		"approved",
		"spam",
		"trash"
	]).optional(),
	collection: z.string().optional(),
	search: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	cursor: z.string().max(2048).optional()
}).meta({ id: "CommentListQuery" });
var commentStatusValues = z.enum([
	"pending",
	"approved",
	"spam",
	"trash"
]);
/**
* Public-facing comment (no email/IP).
*
* `replies` is recursive in practice (each reply can have replies), but we
* model it as a single level here to avoid circular type inference issues
* with tsgo. OpenAPI consumers should treat replies as the same shape.
*/
var publicCommentSchema = z.object({
	id: z.string(),
	authorName: z.string(),
	isRegisteredUser: z.boolean(),
	body: z.string(),
	parentId: z.string().nullable(),
	createdAt: z.string(),
	replies: z.array(z.any()).optional()
}).meta({ id: "PublicComment" });
/** Admin comment with full details */
var commentSchema = z.object({
	id: z.string(),
	collection: z.string(),
	contentId: z.string(),
	authorName: z.string(),
	authorEmail: z.string(),
	body: z.string(),
	status: commentStatusValues,
	parentId: z.string().nullable(),
	ipHash: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Comment" });
var publicCommentListResponseSchema = z.object({
	items: z.array(publicCommentSchema),
	nextCursor: z.string().optional(),
	total: z.number().int()
}).meta({ id: "PublicCommentListResponse" });
var adminCommentListResponseSchema = z.object({
	items: z.array(commentSchema),
	nextCursor: z.string().optional()
}).meta({ id: "AdminCommentListResponse" });
var commentCountsResponseSchema = z.object({
	pending: z.number().int(),
	approved: z.number().int(),
	spam: z.number().int(),
	trash: z.number().int()
}).meta({ id: "CommentCountsResponse" });
var commentBulkResponseSchema = z.object({ affected: z.number().int() }).meta({ id: "CommentBulkResponse" });
export { commentListQuery as a, createCommentBody as c, commentCountsResponseSchema as i, createReactionBody as l, commentBulkBody as n, commentSchema as o, commentBulkResponseSchema as r, commentStatusBody as s, adminCommentListResponseSchema as t, publicCommentListResponseSchema as u };
