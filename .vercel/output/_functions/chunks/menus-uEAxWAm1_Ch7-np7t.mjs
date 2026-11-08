import { t as isSafeHref } from "./url-DTfGDJhI_CrwsbJIk.mjs";
import { f as LOCALE_CODE_PATTERN } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { z } from "zod";
// node_modules/emdash/dist/status-BFNdxzKc.mjs
/**
* Redirect rule status codes.
*
* A redirect rule's `type` is either a *redirect* status (issues a `Location`
* header) or a *terminal* status (serves the status with no target). Terminal
* statuses let editors mark a URL as intentionally gone:
* - `410 Gone` — permanently and intentionally deleted (Google deindexes it
*   faster than a 404).
* - `451 Unavailable For Legal Reasons`.
*/
/** Statuses that issue an HTTP redirect (require a destination). */
var REDIRECT_STATUSES = [
	301,
	302,
	307,
	308
];
/** Terminal statuses that serve a status with no `Location` / no destination. */
var TERMINAL_STATUSES = [410, 451];
/** All values accepted as a redirect rule `type`. */
var REDIRECT_RULE_STATUSES = [...REDIRECT_STATUSES, ...TERMINAL_STATUSES];
/** True for terminal statuses (410/451) — served directly, with no target. */
function isTerminalStatus(type) {
	return TERMINAL_STATUSES.includes(type);
}
// node_modules/emdash/dist/redirects-CyvvZrCJ.mjs
/** Valid role level values */
var VALID_ROLE_LEVELS = /* @__PURE__ */ new Set([
	10,
	20,
	30,
	40,
	50
]);
/** Role level — coerces string/number to valid RoleLevel (10|20|30|40|50) */
var roleLevel = z.coerce.number().int().refine((n) => VALID_ROLE_LEVELS.has(n), { message: "Invalid role level. Must be 10, 20, 30, 40, or 50" });
/** Pagination query params — cursor-based */
var cursorPaginationQuery = z.object({
	cursor: z.string().max(2048).optional().meta({ description: "Opaque cursor for pagination" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of items to return (1-100, default 50)" })
}).meta({ id: "CursorPaginationQuery" });
z.object({
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	offset: z.coerce.number().int().min(0).optional().default(0)
}).meta({ id: "OffsetPaginationQuery" });
/** Slug pattern: lowercase letters, digits, underscores; starts with letter */
var slugPattern = /^[a-z][a-z0-9_]*$/;
/** Matches http(s) scheme at start of URL */
var HTTP_SCHEME_RE = /^https?:\/\//i;
/** Validates that a URL string uses http or https scheme. Rejects javascript:/data: URI XSS vectors. */
var httpUrl = z.url().refine((url) => HTTP_SCHEME_RE.test(url), "URL must use http or https");
/**
* BCP 47 locale code — language with optional script/region subtags (e.g. en, en-US, pt-BR, es-419, zh-Hant).
* Validation is case-insensitive, but the value is preserved verbatim because the site config, stored
* `locale` columns, and public query path all keep the raw BCP-47 casing.
*/
var localeCode = z.string().regex(LOCALE_CODE_PATTERN, "Invalid locale code");
/** Shared `?locale=xx` query shape for endpoints that filter by locale. */
var localeFilterQuery = z.object({ locale: localeCode.optional() }).meta({ id: "LocaleFilterQuery" });
/** Standard API error response */
var apiErrorSchema = z.object({
	success: z.literal(false).meta({ description: "Discriminant: always false for errors" }),
	error: z.object({
		code: z.string().meta({
			description: "Machine-readable error code",
			examples: ["NOT_FOUND"]
		}),
		message: z.string().meta({ description: "Human-readable error message" })
	})
}).meta({ id: "ApiError" });
/** Wrap a data schema in the standard success envelope: { success: true, data: T } */
function successEnvelope(dataSchema) {
	return z.object({
		success: z.literal(true).meta({ description: "Discriminant: always true for success" }),
		data: dataSchema
	});
}
/** Standard delete response */
var deleteResponseSchema = z.object({ deleted: z.literal(true) }).meta({ id: "DeleteResponse" });
/** Media delete response: `storageDeleted` is false when the stored file survived and is retried by cleanup */
var mediaDeleteResponseSchema = deleteResponseSchema.extend({ storageDeleted: z.boolean() }).meta({ id: "MediaDeleteResponse" });
z.object({ count: z.number().int().min(0) }).meta({ id: "CountResponse" });
var redirectType = z.coerce.number().int().refine((n) => REDIRECT_RULE_STATUSES.includes(n), { message: "Redirect type must be 301, 302, 307, 308, 410, or 451" });
/** Matches CR or LF characters */
var CRLF = /[\r\n]/;
/** Path must start with / and not be protocol-relative, contain no CRLF, and no path traversal */
var urlPath = z.string().min(1).refine((s) => s.startsWith("/") && !s.startsWith("//"), { message: "Must be a path starting with / (no protocol-relative URLs)" }).refine((s) => !CRLF.test(s), { message: "URL must not contain newline characters" }).refine((s) => {
	try {
		return !decodeURIComponent(s).split("/").includes("..");
	} catch {
		return false;
	}
}, { message: "URL must not contain path traversal segments" });
var createRedirectBody = z.object({
	source: urlPath,
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional().default(301),
	enabled: z.boolean().optional().default(true),
	groupName: z.string().nullish()
}).refine((o) => isTerminalStatus(o.type ?? 301) || !!o.destination, {
	message: "destination is required for redirect types (301, 302, 307, 308)",
	path: ["destination"]
}).meta({ id: "CreateRedirectBody" });
var updateRedirectBody = z.object({
	source: urlPath.optional(),
	destination: z.union([urlPath, z.literal("")]).optional(),
	type: redirectType.optional(),
	enabled: z.boolean().optional(),
	groupName: z.string().nullish()
}).refine((o) => Object.values(o).some((v) => v !== void 0), { message: "At least one field must be provided" }).meta({ id: "UpdateRedirectBody" });
var redirectsListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	group: z.string().optional(),
	enabled: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
	auto: z.enum(["true", "false"]).transform((v) => v === "true").optional()
}).meta({ id: "RedirectsListQuery" });
var notFoundListQuery = cursorPaginationQuery.extend({ search: z.string().optional() }).meta({ id: "NotFoundListQuery" });
var notFoundSummaryQuery = z.object({ limit: z.coerce.number().int().min(1).max(100).optional().default(50) });
var notFoundPruneBody = z.object({ olderThan: z.iso.datetime({ message: "olderThan must be an ISO 8601 datetime" }).or(z.iso.datetime({
	precision: -1,
	message: "olderThan must be an ISO 8601 datetime"
})) }).meta({ id: "NotFoundPruneBody" });
var redirectSchema = z.object({
	id: z.string(),
	source: z.string(),
	destination: z.string(),
	type: z.number().int(),
	isPattern: z.boolean(),
	enabled: z.boolean(),
	hits: z.number().int(),
	lastHitAt: z.string().nullable(),
	groupName: z.string().nullable(),
	auto: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Redirect" });
var redirectListResponseSchema = z.object({
	items: z.array(redirectSchema),
	nextCursor: z.string().optional(),
	loopRedirectIds: z.array(z.string()).optional()
}).meta({ id: "RedirectListResponse" });
var notFoundEntrySchema = z.object({
	id: z.string(),
	path: z.string(),
	referrer: z.string().nullable(),
	userAgent: z.string().nullable(),
	ip: z.string().nullable(),
	createdAt: z.string()
}).meta({ id: "NotFoundEntry" });
var notFoundListResponseSchema = z.object({
	items: z.array(notFoundEntrySchema),
	nextCursor: z.string().optional()
}).meta({ id: "NotFoundListResponse" });
var notFoundSummarySchema = z.object({
	path: z.string(),
	count: z.number().int(),
	lastSeen: z.string(),
	topReferrer: z.string().nullable()
}).meta({ id: "NotFoundSummary" });
var notFoundSummaryResponseSchema = z.object({ items: z.array(notFoundSummarySchema) }).meta({ id: "NotFoundSummaryResponse" });
// node_modules/emdash/dist/menus-uEAxWAm1.mjs
/**
* Allowed menu item types. `custom` uses `customUrl`; the others resolve a URL
* from `referenceCollection` + `referenceId` (a translation_group id).
*/
var menuItemTypeEnum = z.enum([
	"custom",
	"page",
	"post",
	"taxonomy",
	"collection"
]);
var safeHref = z.string().trim().refine(isSafeHref, "URL must use http, https, mailto, tel, a relative path, or a fragment identifier");
var createMenuBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).strict().meta({ id: "CreateMenuBody" });
var updateMenuBody = z.object({ label: z.string().min(1).optional() }).strict().meta({ id: "UpdateMenuBody" });
var createMenuItemBody = z.object({
	type: menuItemTypeEnum,
	label: z.string().min(1),
	referenceCollection: z.string().optional(),
	referenceId: z.string().optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "CreateMenuItemBody" });
var updateMenuItemBody = z.object({
	label: z.string().min(1).optional(),
	customUrl: safeHref.optional(),
	target: z.string().optional(),
	titleAttr: z.string().optional(),
	cssClasses: z.string().optional(),
	parentId: z.string().nullish(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "UpdateMenuItemBody" });
var reorderMenuItemsBody = z.object({ items: z.array(z.object({
	id: z.string().min(1),
	parentId: z.string().nullable(),
	sortOrder: z.number().int().min(0)
})) }).meta({ id: "ReorderMenuItemsBody" });
var menuSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Menu" });
var menuItemSchema = z.object({
	id: z.string(),
	menuId: z.string(),
	parentId: z.string().nullable(),
	sortOrder: z.number().int(),
	type: z.string(),
	referenceCollection: z.string().nullable(),
	referenceId: z.string().nullable(),
	customUrl: z.string().nullable(),
	label: z.string(),
	titleAttr: z.string().nullable(),
	target: z.string().nullable(),
	cssClasses: z.string().nullable(),
	createdAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "MenuItem" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string(),
		updatedAt: z.string()
	}))
}).meta({ id: "MenuTranslations" });
var menuListItemSchema = menuSchema.extend({ itemCount: z.number().int() }).meta({ id: "MenuListItem" });
var menuWithItemsSchema = menuSchema.extend({ items: z.array(menuItemSchema) }).meta({ id: "MenuWithItems" });
export { isTerminalStatus as A, redirectListResponseSchema as C, slugPattern as D, roleLevel as E, successEnvelope as O, notFoundSummaryResponseSchema as S, redirectsListQuery as T, mediaDeleteResponseSchema as _, menuWithItemsSchema as a, notFoundPruneBody as b, updateMenuBody as c, createRedirectBody as d, cursorPaginationQuery as f, localeFilterQuery as g, localeCode as h, menuListItemSchema as i, updateRedirectBody as k, updateMenuItemBody as l, httpUrl as m, createMenuItemBody as n, reorderMenuItemsBody as o, deleteResponseSchema as p, menuItemSchema as r, safeHref as s, createMenuBody as t, apiErrorSchema as u, notFoundListQuery as v, redirectSchema as w, notFoundSummaryQuery as x, notFoundListResponseSchema as y };
