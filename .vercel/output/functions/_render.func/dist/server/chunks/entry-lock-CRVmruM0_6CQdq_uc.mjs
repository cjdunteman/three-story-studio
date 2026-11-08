import "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { t as isValidFocalPointUpdate } from "./focal-point-CgCcr1Ca_d0laIeAH.mjs";
import { t as SEARCH_TOKENIZERS } from "./types-Cj0_yZkn_CPN4An3-.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
import { D as slugPattern$1, E as roleLevel, f as cursorPaginationQuery, h as localeCode, m as httpUrl } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { t as MEDIA_USAGE_SITE_SETTINGS } from "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { z } from "zod";
// node_modules/emdash/dist/media-BR4_t-Wd.mjs
var mediaUsageCoverageStatusSchema = z.enum([
	"complete",
	"never",
	"running",
	"partial",
	"failed",
	"stale",
	"unknown"
]).meta({ id: "MediaUsageCoverageStatus" });
var mediaUsageCoverageSchema = z.object({
	scope: z.literal("all_content_collections"),
	status: mediaUsageCoverageStatusSchema
}).meta({ id: "MediaUsageCoverage" });
var mediaUsageProgressSchema = z.object({
	status: z.enum([
		"indexing",
		"ready",
		"needs_attention"
	]),
	readyCollections: z.number().int().min(0),
	totalCollections: z.number().int().min(0)
}).meta({ id: "MediaUsageProgress" });
var mediaUsageSummarySchema = z.object({
	count: z.number().int().min(0).nullable(),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageSummary" });
var mediaUsageDetailsQuery = z.object({
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque content-entry-group cursor" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of content entry groups to return (1-100, default 50)" })
});
var mediaUsageOccurrenceDetailSchema = z.object({
	fieldSlug: z.string(),
	fieldPath: z.string(),
	occurrenceIndex: z.number().int().min(0),
	referenceType: z.enum([
		"image_field",
		"file_field",
		"portable_text_image",
		"portable_text_video",
		"unknown"
	])
}).meta({ id: "MediaUsageOccurrenceDetail" });
var mediaUsageSourceDetailSchema = z.object({
	variant: z.enum(["columns", "draft_overlay"]),
	occurrences: z.array(mediaUsageOccurrenceDetailSchema)
}).meta({ id: "MediaUsageSourceDetail" });
var mediaUsageEntryDetailSchema = z.object({
	collection: z.string(),
	contentId: z.string(),
	title: z.string().nullable(),
	slug: z.string().nullable(),
	locale: z.string().nullable(),
	status: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	deletedAt: z.string().nullable(),
	sources: z.array(mediaUsageSourceDetailSchema)
}).meta({ id: "MediaUsageEntryDetail" });
var mediaUsageSiteSettingDetailSchema = z.object({ setting: z.enum(MEDIA_USAGE_SITE_SETTINGS) }).meta({ id: "MediaUsageSiteSettingDetail" });
var mediaUsageDetailsResponseSchema = z.object({
	items: z.array(mediaUsageEntryDetailSchema),
	nextCursor: z.string().optional(),
	siteSettings: z.array(mediaUsageSiteSettingDetailSchema).meta({ description: "Site settings that select the media item, repeated on every page" }),
	coverage: mediaUsageCoverageSchema
}).meta({ id: "MediaUsageDetailsResponse" });
var mediaUsageRepairStatusSchema = z.enum([
	"complete",
	"partial",
	"failed",
	"stale"
]).meta({ id: "MediaUsageRepairStatus" });
var mediaUsageRepairCollectionBody = z.object({
	scope: z.literal("collection"),
	collection: z.string().min(1).max(63).regex(slugPattern$1, "Invalid collection slug")
}).strict();
var mediaUsageRepairAllBody = z.object({ scope: z.literal("all") }).strict();
var mediaUsageRepairBody = z.discriminatedUnion("scope", [mediaUsageRepairCollectionBody, mediaUsageRepairAllBody]).meta({ id: "MediaUsageRepairBody" });
var mediaUsageRepairCollectionSummarySchema = z.object({
	collection: z.string(),
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	lastErrorCode: z.string().nullable(),
	startedAt: z.string(),
	completedAt: z.string().nullable()
}).meta({ id: "MediaUsageRepairCollectionSummary" });
var mediaUsageRepairResponseSchema = z.object({
	status: mediaUsageRepairStatusSchema,
	indexedSourceCount: z.number().int().min(0),
	failedSourceCount: z.number().int().min(0),
	skippedSourceCount: z.number().int().min(0),
	deletedSourceCount: z.number().int().min(0),
	collections: z.array(mediaUsageRepairCollectionSummarySchema)
}).meta({ id: "MediaUsageRepairResponse" });
var mediaUsageWorkStateSchema = z.enum([
	"pending",
	"retry",
	"leased",
	"failed"
]).meta({ id: "MediaUsageWorkState" });
var mediaUsageWorkListQuery = z.object({
	collection: z.string().min(1).max(63).regex(slugPattern$1, "Invalid collection slug"),
	state: mediaUsageWorkStateSchema.optional(),
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque work-page cursor" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of work items to return (1-100, default 50)" })
});
var mediaUsageWorkItemSchema = z.object({
	collectionId: z.string(),
	collectionSlug: z.string(),
	contentId: z.string(),
	state: mediaUsageWorkStateSchema,
	attemptCount: z.number().int().min(0),
	nextAttemptAt: z.string(),
	leaseExpiresAt: z.string().nullable(),
	lastAttemptedAt: z.string().nullable(),
	lastErrorCode: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageWorkItem" });
var mediaUsageWorkListResponseSchema = z.object({
	items: z.array(mediaUsageWorkItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaUsageWorkListResponse" });
var boundedOpaqueMediaUsageId = z.string().min(1).max(2048);
var mediaUsageWorkRetryBody = z.object({
	collectionId: boundedOpaqueMediaUsageId.meta({ description: "Current immutable collection identity" }),
	contentId: boundedOpaqueMediaUsageId.meta({ description: "Content entry identity, including a deleted entry" })
}).strict().meta({ id: "MediaUsageWorkRetryBody" });
var mediaUsageWorkRetryResponseSchema = z.object({
	changed: z.boolean(),
	item: mediaUsageWorkItemSchema
}).meta({ id: "MediaUsageWorkRetryResponse" });
var mediaUsageWorkRetryConflictSchema = z.object({
	success: z.literal(false),
	error: z.discriminatedUnion("code", [z.object({
		code: z.literal("WORK_LEASE_ACTIVE"),
		message: z.string(),
		details: z.object({ leaseExpiresAt: z.string() })
	}), z.object({
		code: z.literal("WORK_CHANGED"),
		message: z.string()
	})])
});
var mediaUsageActivationStateSchema = z.enum([
	"expanded",
	"activating",
	"active"
]).meta({ id: "MediaUsageActivationState" });
var mediaUsageActivationStatusSchema = z.object({
	state: mediaUsageActivationStateSchema,
	collectionCursor: z.string().nullable(),
	attemptCount: z.number().int().min(0),
	drainConfirmedAt: z.string().nullable(),
	lastAttemptedAt: z.string().nullable(),
	lastErrorCode: z.literal("MEDIA_USAGE_ACTIVATION_FAILED").nullable(),
	leaseExpiresAt: z.string().nullable(),
	activatedAt: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageActivationStatus" });
var mediaUsageActivationAdvanceBody = z.object({ writersDrained: z.literal(true) }).strict().meta({ id: "MediaUsageActivationAdvanceBody" });
var mediaUsageActivationAdvanceResponseSchema = z.object({
	outcome: z.enum(["activating", "active"]),
	processedCollections: z.number().int().min(0).max(1),
	activation: mediaUsageActivationStatusSchema
}).meta({ id: "MediaUsageActivationAdvanceResponse" });
var mediaUsageProgressAdvanceResponseSchema = z.object({
	activation: mediaUsageActivationStatusSchema,
	progress: mediaUsageProgressSchema.nullable(),
	nextRequestInMs: z.union([
		z.literal(0),
		z.literal(3e4),
		z.null()
	])
}).meta({ id: "MediaUsageProgressAdvanceResponse" });
var mediaUsageActivationConflictSchema = z.object({
	success: z.literal(false),
	error: z.discriminatedUnion("code", [
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_BUSY"),
			message: z.string(),
			details: z.object({ leaseExpiresAt: z.string() })
		}),
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_CONFLICT"),
			message: z.string()
		}),
		z.object({
			code: z.literal("MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH"),
			message: z.string()
		})
	])
});
var mediaUsageCollectionDeletionStateSchema = z.enum([
	"pending",
	"retry",
	"leased",
	"failed"
]).meta({ id: "MediaUsageCollectionDeletionState" });
var mediaUsageCollectionDeletionPhaseSchema = z.enum([
	"fence",
	"registry",
	"table",
	"work",
	"sources",
	"status",
	"finalize"
]).meta({ id: "MediaUsageCollectionDeletionPhase" });
var mediaUsageCollectionDeletionListQuery = z.object({
	state: mediaUsageCollectionDeletionStateSchema.optional().default("failed"),
	cursor: z.string().min(1).max(2048).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50)
}).meta({ id: "MediaUsageCollectionDeletionListQuery" });
var mediaUsageCollectionDeletionItemSchema = z.object({
	collectionId: z.string(),
	collectionSlug: z.string(),
	state: mediaUsageCollectionDeletionStateSchema,
	phase: mediaUsageCollectionDeletionPhaseSchema,
	attemptCount: z.number().int().min(0),
	nextAttemptAt: z.string(),
	leaseExpiresAt: z.string().nullable(),
	lastErrorCode: z.string().nullable(),
	updatedAt: z.string()
}).meta({ id: "MediaUsageCollectionDeletionItem" });
var mediaUsageCollectionDeletionListResponseSchema = z.object({
	items: z.array(mediaUsageCollectionDeletionItemSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaUsageCollectionDeletionListResponse" });
var mediaUsageCollectionDeletionRetryBody = z.object({ collectionId: boundedOpaqueMediaUsageId }).strict().meta({ id: "MediaUsageCollectionDeletionRetryBody" });
var mediaUsageCollectionDeletionRetryResponseSchema = z.object({
	changed: z.boolean(),
	item: mediaUsageCollectionDeletionItemSchema
}).meta({ id: "MediaUsageCollectionDeletionRetryResponse" });
/**
* Accepts a comma-separated string (from URL query params) or an array of
* strings (from JSON body or programmatic use) and normalises to string[].
*/
var mimeTypeFilter = z.union([z.string(), z.array(z.string())]).transform((v) => {
	return (Array.isArray(v) ? v : v.split(",")).map((s) => s.trim()).filter((s) => s.length > 0);
}).optional();
var mediaListQuery = cursorPaginationQuery.extend({
	page: z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER).optional(),
	mimeType: mimeTypeFilter,
	folderId: z.union([z.literal("unfiled"), z.string().min(1).max(64)]).optional().meta({ description: "Filter by a media folder ID. Use `unfiled` for the Main library; omit for all media." }),
	q: z.string().trim().min(1).max(200).optional(),
	includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on each media item" })
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).meta({ id: "MediaListQuery" });
var mediaGetQuery = z.object({ includeUsage: z.literal("1").optional().meta({ description: "Include a coverage-aware usage summary on the media item" }) }).meta({ id: "MediaGetQuery" });
var mediaUpdateBody = z.object({
	alt: z.string().optional(),
	caption: z.string().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
	folderId: z.union([z.literal("unfiled"), z.string().min(1).max(64)]).nullable().optional().transform((value) => value === "unfiled" ? null : value).meta({ description: "Assign a media folder ID, or use null or `unfiled` to return the item to the Main library." }),
	focalX: z.number().min(0).max(1).nullable().optional(),
	focalY: z.number().min(0).max(1).nullable().optional()
}).superRefine((value, context) => {
	if (!isValidFocalPointUpdate(value)) context.addIssue({
		code: "custom",
		message: "focalX and focalY must both be numbers or both be null",
		path: ["focalX"]
	});
}).meta({ id: "MediaUpdateBody" });
var mediaFolderIdSchema = z.string().min(1).max(64);
var mediaFolderListQuery = cursorPaginationQuery.extend({ q: z.string().trim().min(1).max(200).optional() }).meta({ id: "MediaFolderListQuery" });
var mediaFolderNameSchema = z.string().refine((value) => {
	const length = value.trim().length;
	return length >= 1 && length <= 200;
}, { message: "Folder name must be between 1 and 200 characters" });
var mediaFolderBody = z.object({ name: mediaFolderNameSchema }).meta({ id: "MediaFolderBody" });
/** Default maximum allowed file upload size (50 MB). */
var DEFAULT_MAX_UPLOAD_SIZE = 52428800;
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1048576) return `${Math.floor(bytes / 1024)}KB`;
	return `${Math.floor(bytes / 1024 / 1024)}MB`;
}
var CONTENT_TYPE_RE = /^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]+(\s*;[^\r\n]*)?$/i;
function mediaUploadUrlBody(maxSize) {
	if (!Number.isFinite(maxSize) || maxSize <= 0) throw new Error(`EmDash: maxUploadSize must be a positive finite number, got ${maxSize}`);
	return z.object({
		filename: z.string().min(1, "filename is required"),
		contentType: z.string().min(1, "contentType is required").regex(CONTENT_TYPE_RE, "Invalid content type"),
		size: z.number().int().nonnegative().max(maxSize, `File size must not exceed ${formatFileSize(maxSize)}`),
		contentHash: z.string().optional(),
		fieldId: z.string().optional(),
		deduplicate: z.boolean().optional(),
		ensureUniqueFilename: z.boolean().optional(),
		folderId: mediaFolderIdSchema.nullable().optional()
	}).meta({ id: "MediaUploadUrlBody" });
}
var mediaUploadDeduplicateForm = z.enum(["true", "false"]).default("true").transform((value) => value === "true");
var mediaUploadEnsureUniqueFilenameForm = z.enum(["true", "false"]).default("false").transform((value) => value === "true");
var optionalMediaTextForm = z.string().optional().transform((value) => value === "" ? void 0 : value);
var mediaUploadMetadataForm = z.object({
	alt: optionalMediaTextForm,
	caption: optionalMediaTextForm
});
var mediaReplaceMetadataForm = z.object({
	width: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
	height: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER)
});
var binaryFileSchema = z.string().meta({ format: "binary" });
var mediaDirectUploadBody = z.object({
	file: binaryFileSchema,
	alt: z.string().optional(),
	caption: z.string().optional(),
	width: z.string().optional(),
	height: z.string().optional(),
	thumbnail: binaryFileSchema.optional(),
	fieldId: z.string().optional(),
	deduplicate: z.enum(["true", "false"]).optional(),
	ensureUniqueFilename: z.enum(["true", "false"]).optional(),
	folderId: z.union([mediaFolderIdSchema, z.literal("unfiled")]).optional()
}).meta({ id: "MediaDirectUploadBody" });
var mediaReplaceBody = z.object({
	file: binaryFileSchema,
	width: z.number().int().positive(),
	height: z.number().int().positive()
}).meta({ id: "MediaReplaceBody" });
var mediaConfirmBody = z.object({
	size: z.number().int().nonnegative().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional()
}).meta({ id: "MediaConfirmBody" });
cursorPaginationQuery.extend({
	query: z.string().optional(),
	mimeType: mimeTypeFilter
}).meta({ id: "MediaProviderListQuery" });
var mediaStatusSchema = z.enum([
	"pending",
	"ready",
	"failed"
]);
var mediaItemSchema = z.object({
	id: z.string(),
	filename: z.string(),
	mimeType: z.string(),
	size: z.number().nullable(),
	width: z.number().nullable(),
	height: z.number().nullable(),
	focalX: z.number().nullable(),
	focalY: z.number().nullable(),
	alt: z.string().nullable(),
	caption: z.string().nullable(),
	storageKey: z.string(),
	status: mediaStatusSchema,
	contentHash: z.string().nullable(),
	blurhash: z.string().nullable(),
	dominantColor: z.string().nullable(),
	createdAt: z.string(),
	authorId: z.string().nullable(),
	folderId: z.string().nullable()
}).meta({ id: "MediaItem" });
var mediaFolderSchema = z.object({
	id: z.string(),
	name: z.string()
}).meta({ id: "MediaFolder" });
var mediaFolderResponseSchema = z.object({ item: mediaFolderSchema }).meta({ id: "MediaFolderResponse" });
var mediaFolderListResponseSchema = z.object({
	items: z.array(mediaFolderSchema),
	nextCursor: z.string().optional()
}).meta({ id: "MediaFolderListResponse" });
var mediaResponseSchema = z.object({ item: mediaItemSchema }).meta({ id: "MediaResponse" });
var mediaReadItemSchema = mediaItemSchema.extend({ usage: mediaUsageSummarySchema.optional() }).meta({ id: "MediaReadItem" });
var mediaReadResponseSchema = z.object({ item: mediaReadItemSchema }).meta({ id: "MediaReadResponse" });
var mediaListReadItemSchema = mediaReadItemSchema.extend({ url: z.string() }).meta({ id: "MediaListReadItem" });
var mediaListReadResponseSchema = z.object({
	items: z.array(mediaListReadItemSchema),
	nextCursor: z.string().optional(),
	totalCount: z.number().int().nonnegative().optional()
}).meta({ id: "MediaListReadResponse" });
var mediaListResponseSchema = z.object({
	items: z.array(mediaItemSchema),
	nextCursor: z.string().optional(),
	totalCount: z.number().int().nonnegative().optional()
}).meta({ id: "MediaListResponse" });
var mediaUploadUrlResponseSchema = z.object({
	uploadUrl: z.string(),
	method: z.literal("PUT"),
	headers: z.record(z.string(), z.string()),
	mediaId: z.string(),
	storageKey: z.string(),
	expiresAt: z.string()
}).meta({ id: "MediaUploadUrlResponse" });
var mediaExistingResponseSchema = z.object({
	existing: z.literal(true),
	mediaId: z.string(),
	storageKey: z.string(),
	url: z.string()
}).meta({ id: "MediaExistingResponse" });
var mediaConfirmResponseSchema = z.object({ item: mediaItemSchema.extend({ url: z.string() }) }).meta({ id: "MediaConfirmResponse" });
var mediaUploadResponseSchema = z.object({
	item: mediaItemSchema.extend({ url: z.string() }),
	deduplicated: z.literal(true).optional()
}).meta({ id: "MediaUploadResponse" });
var mediaReplaceResponseSchema = z.object({ item: mediaItemSchema.extend({ url: z.string() }) }).meta({ id: "MediaReplaceResponse" });
var mediaStreamUploadResponseSchema = z.object({
	uploaded: z.literal(true),
	size: z.number().int().nonnegative()
}).meta({ id: "MediaStreamUploadResponse" });
// node_modules/emdash/dist/entry-lock-CRVmruM0.mjs
/** Slug pattern: lowercase letters, digits, and hyphens; must start with a letter */
var bylineSlugPattern = /^[a-z][a-z0-9-]*$/;
var bylineSummarySchema = z.object({
	id: z.string(),
	slug: z.string(),
	displayName: z.string(),
	bio: z.string().nullable(),
	avatarMediaId: z.string().nullable(),
	avatarStorageKey: z.string().nullish(),
	avatarAlt: z.string().nullish(),
	avatarBlurhash: z.string().nullish(),
	avatarDominantColor: z.string().nullish(),
	websiteUrl: z.string().nullable(),
	userId: z.string().nullable(),
	isGuest: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	locale: z.string(),
	translationGroup: z.string().nullable(),
	customFields: z.record(z.string(), z.union([
		z.string(),
		z.boolean(),
		z.null()
	])).optional()
}).meta({ id: "BylineSummary" });
var bylineCreditSchema = z.object({
	byline: bylineSummarySchema,
	sortOrder: z.number().int(),
	roleLabel: z.string().nullable(),
	source: z.enum(["explicit", "inferred"]).optional().meta({ description: "Whether this credit was explicitly assigned or inferred from authorId" })
}).meta({ id: "BylineCredit" });
var contentBylineInputSchema = z.object({
	bylineId: z.string().min(1),
	roleLabel: z.string().nullish()
}).meta({ id: "ContentBylineInput" });
var bylinesListQuery = cursorPaginationQuery.extend({
	search: z.string().optional(),
	isGuest: z.coerce.boolean().optional(),
	userId: z.string().optional(),
	locale: localeCode.optional()
}).meta({ id: "BylinesListQuery" });
var bylineCreateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens"),
	displayName: z.string().min(1),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineCreateBody" });
var bylineTranslationCreateBody = z.object({
	locale: localeCode,
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish()
}).meta({ id: "BylineTranslationCreateBody" });
z.object({ items: z.array(bylineSummarySchema) }).meta({ id: "BylineTranslationsResponse" });
var bylineUpdateBody = z.object({
	slug: z.string().min(1).regex(bylineSlugPattern, "Slug must contain only lowercase letters, digits, and hyphens").optional(),
	displayName: z.string().min(1).optional(),
	bio: z.string().nullish(),
	avatarMediaId: z.string().nullish(),
	websiteUrl: httpUrl.nullish(),
	userId: z.string().nullish(),
	isGuest: z.boolean().optional(),
	customFields: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "BylineUpdateBody" });
z.object({
	items: z.array(bylineSummarySchema),
	nextCursor: z.string().optional()
}).meta({ id: "BylineListResponse" });
var slugPattern = /^[a-z][a-z0-9_]*$/;
var collectionSlug$1 = z.string().min(1).max(63).regex(slugPattern, "Invalid collection slug format");
/** NULL means unlimited on that side. */
var roleLimit = z.number().int().positive().nullable().optional();
var roleLabelSingular = z.string().min(1).max(200).nullable().optional();
var createRelationBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern, "Slug must be lowercase alphanumeric with underscores"),
	parentCollection: collectionSlug$1,
	childCollection: collectionSlug$1,
	parentLabel: z.string().min(1).max(200),
	parentLabelSingular: roleLabelSingular,
	childLabel: z.string().min(1).max(200),
	childLabelSingular: roleLabelSingular,
	maxChildrenPerParent: roleLimit,
	maxParentsPerChild: roleLimit
}).meta({ id: "CreateRelationBody" });
var relationListQuery = z.object({ collection: collectionSlug$1.optional().meta({ description: "Only relations with this collection on one end" }) }).meta({ id: "RelationListQuery" });
var updateRelationBody = z.object({
	parentLabel: z.string().min(1).max(200).optional(),
	parentLabelSingular: roleLabelSingular,
	childLabel: z.string().min(1).max(200).optional(),
	childLabelSingular: roleLabelSingular,
	maxChildrenPerParent: roleLimit,
	maxParentsPerChild: roleLimit
}).refine((body) => Object.values(body).some((value) => value !== void 0), { message: "At least one field is required" }).meta({ id: "UpdateRelationBody" });
/** A relation plus what deleting it would take: the fields that view it and
* how many links it holds. */
var relationWithUsageSchema = z.object({
	id: z.string(),
	slug: z.string(),
	parentCollection: z.string(),
	childCollection: z.string(),
	parentLabel: z.string(),
	parentLabelSingular: z.string().nullable(),
	childLabel: z.string(),
	childLabelSingular: z.string().nullable(),
	maxChildrenPerParent: z.number().int().nullable(),
	maxParentsPerChild: z.number().int().nullable()
}).meta({ id: "RelationDef" }).extend({
	boundFields: z.array(z.object({
		collectionSlug: z.string(),
		fieldSlug: z.string(),
		side: z.enum(["parent", "child"])
	})),
	linkCount: z.number().int()
}).meta({ id: "RelationWithUsage" });
z.object({ relations: z.array(relationWithUsageSchema) }).meta({ id: "RelationListResponse" });
z.object({ relation: relationWithUsageSchema }).meta({ id: "RelationResponse" });
var entryRefSchema = z.object({
	id: z.string(),
	slug: z.string().nullable(),
	collection: z.string(),
	title: z.string().nullable(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	sortOrder: z.number().int().optional()
}).meta({ id: "ReferenceEntryRef" });
var referenceChildrenResponseSchema = z.object({
	children: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceChildrenResponse" });
z.object({
	parents: z.array(entryRefSchema),
	nextCursor: z.string().optional()
}).meta({ id: "ReferenceParentsResponse" });
var contentDateTime = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).or(z.iso.datetime({
	offset: true,
	precision: -1,
	message: "must be an ISO 8601 datetime"
}));
/** SEO input — per-content meta fields */
var contentSeoInput = z.object({
	title: z.string().max(200).nullish(),
	description: z.string().max(500).nullish(),
	image: z.string().nullish(),
	canonical: httpUrl.nullish(),
	noIndex: z.boolean().optional()
}).meta({ id: "ContentSeoInput" });
/** ISO 8601 date or datetime bound for the content-list date range filter. */
var contentDateBound = z.union([contentDateTime, z.iso.date({ message: "must be an ISO 8601 date" })]).optional();
/**
* Byline ids for the content-list filter: either the literal `none` or a
* comma-separated list, parsed into an array.
*
* The 25-id cap keeps the `IN (...)` clause clear of D1's bound-parameter
* ceiling once the rest of the list query's placeholders are counted
* (`SQL_BATCH_SIZE` is 50 for a query binding nothing else).
*/
var bylineFilterParam = z.string().trim().min(1).max(2e3).optional().transform((value) => value === void 0 ? void 0 : value === "none" ? "none" : [...new Set(value.split(",").map((id) => id.trim()))].filter((id) => id.length > 0)).refine((value) => value === void 0 || value === "none" || value.length <= 25, { message: "at most 25 bylines may be selected" }).refine((value) => value === void 0 || value === "none" || value.length > 0, { message: "must contain at least one byline id" });
/** Query-string boolean. Explicit values only — `z.coerce.boolean()` reads "false" as true. */
var booleanParam = z.enum([
	"1",
	"0",
	"true",
	"false"
]).optional().transform((value) => value === "1" || value === "true");
var contentFieldComparable = z.union([z.string().max(2048), z.number()]);
var contentFieldFilterScalar = z.union([
	contentFieldComparable,
	z.boolean(),
	z.null()
]);
var contentFieldFilterValue = z.union([
	contentFieldFilterScalar,
	z.object({ in: z.array(z.union([contentFieldComparable, z.boolean()])).min(1).max(50) }).strict(),
	z.object({
		gt: contentFieldComparable.optional(),
		gte: contentFieldComparable.optional(),
		lt: contentFieldComparable.optional(),
		lte: contentFieldComparable.optional()
	}).strict().refine((value) => Object.values(value).some((bound) => bound !== void 0), { message: "Range filter must include at least one bound" })
]);
function contentFieldFilterOperandCount(value) {
	if (value === null) return 0;
	if (!value || typeof value !== "object" || Array.isArray(value)) return 1;
	if ("in" in value && Array.isArray(value.in)) return value.in.length;
	return Object.values(value).filter((bound) => bound !== void 0).length;
}
/** AND-combined filters over custom fields explicitly marked as indexed. */
var contentFieldFiltersSchema = z.record(z.string().max(128).regex(/^[a-z][a-z0-9_]*$/, "must be a safe field identifier"), contentFieldFilterValue).refine((filters) => Object.keys(filters).length <= 20, { message: "At most 20 indexed field filters are allowed" }).refine((filters) => Object.values(filters).reduce((total, value) => total + contentFieldFilterOperandCount(value), 0) <= 50, { message: `Indexed field filters have a total operand budget of 50` });
var contentFieldFiltersQuery = z.string().max(8192).transform((value, ctx) => {
	try {
		return JSON.parse(value);
	} catch {
		ctx.addIssue({
			code: "custom",
			message: "must be valid JSON"
		});
		return z.NEVER;
	}
}).pipe(contentFieldFiltersSchema);
/** Statuses the content list can filter by. */
var CONTENT_STATUSES = [
	"draft",
	"published",
	"scheduled",
	"archived",
	"pending",
	"private",
	"future"
];
var pageParam = z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER).optional().meta({ description: "1-based page number, for numbered pages instead of a cursor" });
var contentListQuery = cursorPaginationQuery.extend({
	page: pageParam,
	status: z.enum([...CONTENT_STATUSES, "all"]).optional().transform((status) => status === "all" ? void 0 : status),
	orderBy: z.string().optional(),
	order: z.enum(["asc", "desc"]).optional(),
	locale: localeCode.optional(),
	q: z.string().trim().min(1).max(200).optional(),
	authorId: z.string().min(1).max(64).optional(),
	dateField: z.enum([
		"createdAt",
		"updatedAt",
		"publishedAt"
	]).optional(),
	dateFrom: contentDateBound,
	dateTo: contentDateBound,
	bylines: bylineFilterParam,
	includeInferredBylines: booleanParam,
	fieldFilters: contentFieldFiltersQuery.optional()
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).transform(({ bylines, ...rest }) => ({
	...rest,
	bylinesNone: bylines === "none",
	bylines: bylines === "none" ? void 0 : bylines
})).meta({ id: "ContentListQuery" });
var MAX_CALENDAR_RANGE_MS = 53568e5;
/** Canonical UTC form, so bounds compare as text against stored timestamps. */
var calendarBound = z.iso.datetime({
	offset: true,
	message: "must be an ISO 8601 datetime"
}).transform((value) => new Date(value).toISOString());
/** Calendar range: `from` inclusive, `to` exclusive, at most 62 days apart. */
var calendarQuery = cursorPaginationQuery.extend({
	from: calendarBound,
	to: calendarBound
}).refine((query) => query.from < query.to, {
	message: "to must be after from",
	path: ["to"]
}).refine((query) => Date.parse(query.to) - Date.parse(query.from) <= MAX_CALENDAR_RANGE_MS, {
	message: "the range can span at most 62 days",
	path: ["to"]
});
/** ISO 8601 datetime for `publishedAt` / `createdAt`. Routes gate writes behind `content:publish_any`. */
var contentDateOverride = contentDateTime.nullish();
var overrideLockFlag = z.boolean().optional().meta({ description: "Write even though another editor holds this entry's edit lock. Without it the write is refused with 409 ENTRY_LOCKED." });
var contentCreateBody = z.object({
	data: z.record(z.string(), z.unknown()),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	bylines: z.array(contentBylineInputSchema).optional(),
	locale: localeCode.optional(),
	translationOf: z.string().optional(),
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Taxonomy term assignments as { taxonomyName: [termSlug, ...] }, resolved in the entry's locale." }),
	references: z.record(z.string(), z.array(z.string()).max(1e3)).optional().meta({ description: "Reference selections as { fieldSlug: [entryId, ...] }, in display order. Written as content-reference links in the same transaction as the entry. A field bound to the child end of its relation selects the entries pointing at this one, which carry no order." }),
	publishedAt: contentDateOverride,
	createdAt: contentDateOverride,
	migrateBlocks: z.boolean().optional(),
	replaceBlocks: z.boolean().optional()
}).meta({ id: "ContentCreateBody" });
var contentUpdateBody = z.object({
	data: z.record(z.string(), z.unknown()).optional(),
	slug: z.string().nullish(),
	status: z.enum(["draft"]).optional(),
	authorId: z.string().nullish(),
	bylines: z.array(contentBylineInputSchema).optional(),
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" }),
	skipRevision: z.boolean().optional(),
	overrideLock: overrideLockFlag,
	seo: contentSeoInput.optional(),
	taxonomies: z.record(z.string(), z.array(z.string())).optional().meta({ description: "Replace taxonomy assignments as { taxonomyName: [termSlug, ...] }. Only named taxonomies are touched; pass an empty array to clear a taxonomy." }),
	references: z.record(z.string(), z.array(z.string()).max(1e3)).optional().meta({ description: "Reference selections as { fieldSlug: [entryId, ...] }, in display order. Written as content-reference links in the same transaction as the entry. A field bound to the child end of its relation selects the entries pointing at this one, which carry no order." }),
	publishedAt: contentDateOverride,
	migrateBlocks: z.boolean().optional(),
	replaceBlocks: z.boolean().optional()
}).meta({ id: "ContentUpdateBody" });
var contentScheduleBody = z.object({
	scheduledAt: contentDateTime.meta({
		description: "ISO 8601 datetime with Z or an explicit offset for scheduled publishing",
		examples: ["2025-06-15T09:00:00Z"]
	}),
	overrideLock: overrideLockFlag,
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentScheduleBody" });
var contentRevisionConditionBody = z.object({
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" }),
	overrideLock: overrideLockFlag
}).meta({ id: "ContentRevisionConditionBody" });
var revisionRestoreBody = z.object({ overrideLock: overrideLockFlag });
var contentPublishBody = contentRevisionConditionBody.extend({ publishedAt: contentDateTime.optional().meta({ description: "Optional ISO 8601 datetime to backdate the publish (e.g. when migrating content). Requires content:publish_any permission. Without this, existing published_at is preserved on re-publish." }) }).meta({ id: "ContentPublishBody" });
var contentPreviewUrlBody = z.object({
	expiresIn: z.union([z.string(), z.number()]).optional(),
	pathPattern: z.string().optional()
}).meta({ id: "ContentPreviewUrlBody" });
var contentTermsBody = z.object({ termIds: z.array(z.string()) }).meta({ id: "ContentTermsBody" });
/** A single term variant returned as part of an entry's term assignments. */
var contentEntryTermSchema = z.object({
	id: z.string(),
	name: z.string().meta({ description: "Taxonomy name" }),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	locale: localeCode,
	translationGroup: z.string().nullable()
}).meta({ id: "ContentEntryTerm" });
/** Term assignments response for the content terms endpoint. */
var contentTermsResponseSchema = z.object({
	terms: z.array(contentEntryTermSchema),
	unresolved: z.array(z.object({
		translationGroup: z.string(),
		availableLocales: z.array(localeCode),
		translations: z.array(z.object({
			id: z.string(),
			slug: z.string(),
			locale: localeCode
		}))
	})),
	entryLocale: localeCode,
	defaultLocale: localeCode,
	implicitDefaultLocale: z.boolean()
}).meta({ id: "ContentTermsResponse" });
var contentTrashQuery = cursorPaginationQuery.extend({
	page: pageParam,
	locale: localeCode.optional().meta({ description: "Restrict the trash listing to entries in this locale" })
}).refine(({ cursor, page }) => cursor === void 0 || page === void 0, {
	message: "cursor and page cannot be used together",
	path: ["page"]
}).meta({ id: "ContentTrashQuery" });
/** SEO metadata on a content item */
var contentSeoSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	canonical: z.string().nullable(),
	noIndex: z.boolean()
}).meta({ id: "ContentSeo" });
/** A single content item as returned by the API */
var contentItemSchema = z.object({
	id: z.string(),
	type: z.string().meta({ description: "Collection slug this item belongs to" }),
	slug: z.string().nullable(),
	status: z.string().meta({ description: "draft, published, or scheduled" }),
	data: z.record(z.string(), z.unknown()).meta({ description: "User-defined field values" }),
	authorId: z.string().nullable(),
	primaryBylineId: z.string().nullable(),
	byline: bylineSummarySchema.nullable().optional(),
	bylines: z.array(bylineCreditSchema).optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	scheduledAt: z.string().nullable(),
	liveRevisionId: z.string().nullable(),
	draftRevisionId: z.string().nullable(),
	version: z.number().int(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	seo: contentSeoSchema.optional(),
	references: z.record(z.string(), referenceChildrenResponseSchema).optional()
}).meta({ id: "ContentItem" });
/** Response for single content item endpoints (get, create, update) */
var contentResponseSchema = z.object({
	item: contentItemSchema,
	_rev: z.string().optional().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentResponse" });
/** Response for restoring an item from trash */
var contentRestoreResponseSchema = z.object({
	restored: z.literal(true),
	item: contentItemSchema,
	_rev: z.string().meta({ description: "Opaque revision token for optimistic concurrency" })
}).meta({ id: "ContentRestoreResponse" });
/** Response for content list endpoints */
var contentListResponseSchema = z.object({
	items: z.array(contentItemSchema),
	nextCursor: z.string().optional(),
	total: z.number().int().nonnegative().optional()
}).meta({ id: "ContentListResponse" });
/** A distinct content author for the admin author filter */
var contentAuthorSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.string(),
	avatarUrl: z.string().nullable()
}).meta({ id: "ContentAuthor" });
/** Response for the content authors endpoint */
var contentAuthorsResponseSchema = z.object({ items: z.array(contentAuthorSchema) }).meta({ id: "ContentAuthorsResponse" });
/** Trashed content item */
var trashedContentItemSchema = z.object({
	id: z.string(),
	type: z.string(),
	slug: z.string().nullable(),
	status: z.string(),
	locale: z.string().nullable(),
	translationGroup: z.string().nullable(),
	data: z.record(z.string(), z.unknown()),
	authorId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	deletedAt: z.string()
}).meta({ id: "TrashedContentItem" });
/** Response for trashed content list */
var trashedContentListResponseSchema = z.object({
	items: z.array(trashedContentItemSchema),
	nextCursor: z.string().optional(),
	total: z.number().int().nonnegative().optional()
}).meta({ id: "TrashedContentListResponse" });
/** Response for content compare (live vs draft) */
var contentCompareResponseSchema = z.object({
	hasChanges: z.boolean(),
	live: z.record(z.string(), z.unknown()).nullable(),
	draft: z.record(z.string(), z.unknown()).nullable()
}).meta({ id: "ContentCompareResponse" });
/** Translation summary for a content item */
var contentTranslationSchema = z.object({
	id: z.string(),
	locale: z.string().nullable(),
	slug: z.string().nullable(),
	status: z.string(),
	updatedAt: z.string()
});
/** Response for content translations endpoint */
var contentTranslationsResponseSchema = z.object({
	translationGroup: z.string(),
	translations: z.array(contentTranslationSchema)
}).meta({ id: "ContentTranslationsResponse" });
var collectionSupportValues = z.enum([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"search",
	"seo"
]);
var collectionSourcePattern = /^(template:.+|import:.+|manual|discovered|seed)$/;
var collectionListColumns = z.array(z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format"));
var collectionAdminInputConfig = z.object({
	listColumns: collectionListColumns.max(4, `At most 4 list columns are allowed`).optional(),
	quickCreate: z.boolean().optional()
});
var collectionAdminResponseConfig = z.object({
	listColumns: collectionListColumns.optional(),
	quickCreate: z.boolean().optional()
});
var fieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"reference",
	"json",
	"slug",
	"repeater",
	"blocks"
]);
var repeaterSubFieldSchema = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	type: z.enum([
		"string",
		"text",
		"url",
		"number",
		"integer",
		"boolean",
		"datetime",
		"select",
		"image"
	]),
	label: z.string().min(1),
	required: z.boolean().optional(),
	options: z.array(z.string()).optional()
});
var urlPatternValue = z.string().superRefine((pattern, ctx) => {
	try {
		compileUrlPattern(pattern);
	} catch (error) {
		ctx.addIssue({
			code: "custom",
			message: error instanceof Error ? error.message : "Invalid URL pattern"
		});
	}
});
var fieldValidation = z.object({
	required: z.boolean().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	minLength: z.number().int().min(0).optional(),
	maxLength: z.number().int().min(0).optional(),
	pattern: z.string().optional(),
	options: z.array(z.string()).optional(),
	subFields: z.array(repeaterSubFieldSchema).min(1).optional(),
	minItems: z.number().int().min(0).optional(),
	maxItems: z.number().int().min(1).optional(),
	allowedMimeTypes: z.array(z.string().regex(/^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]*$/i, "Invalid MIME type")).min(1, "allowedMimeTypes must not be empty — omit the field to allow all types").max(64, "allowedMimeTypes may contain at most 64 entries").optional(),
	targetCollection: z.string().min(1).optional(),
	multiple: z.boolean().optional(),
	relation: z.string().min(1).max(63).regex(slugPattern$1, "Invalid relation slug format").optional(),
	relationSide: z.enum(["parent", "child"]).optional(),
	allowedTypes: z.array(z.string().min(1).max(63).regex(slugPattern$1)).optional(),
	retiredTypes: z.array(z.string().min(1).max(63).regex(slugPattern$1)).optional()
}).superRefine((validation, ctx) => {
	for (const [minimum, maximum] of [
		["min", "max"],
		["minLength", "maxLength"],
		["minItems", "maxItems"]
	]) {
		const minimumValue = validation[minimum];
		const maximumValue = validation[maximum];
		if (minimumValue !== void 0 && maximumValue !== void 0 && minimumValue > maximumValue) ctx.addIssue({
			code: "custom",
			path: [maximum],
			message: `${maximum} must be greater than or equal to ${minimum}`
		});
	}
	if (validation.pattern !== void 0) try {
		RegExp(validation.pattern);
	} catch {
		ctx.addIssue({
			code: "custom",
			path: ["pattern"],
			message: "Invalid validation pattern"
		});
	}
}).optional();
var fieldWidgetOptions = z.record(z.string(), z.unknown()).optional();
/** Admin sidebar folder label; an empty string clears it like `null`. */
var navGroupValue = z.string().trim().max(100);
var createCollectionBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().trim().max(64).optional(),
	admin: collectionAdminInputConfig.optional(),
	supports: z.array(collectionSupportValues).optional(),
	source: z.string().regex(collectionSourcePattern).optional(),
	urlPattern: urlPatternValue.optional(),
	routable: z.boolean().optional(),
	hasSeo: z.boolean().optional(),
	hidden: z.boolean().optional(),
	sortOrder: z.number().int().nullish(),
	editLocking: z.boolean().optional(),
	group: navGroupValue.nullish()
}).meta({ id: "CreateCollectionBody" });
var updateCollectionBody = z.object({
	label: z.string().min(1).optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional(),
	icon: z.string().trim().max(64).optional(),
	admin: collectionAdminInputConfig.optional(),
	supports: z.array(collectionSupportValues).optional(),
	urlPattern: z.string().nullish(),
	routable: z.boolean().optional(),
	hasSeo: z.boolean().optional(),
	hidden: z.boolean().optional(),
	sortOrder: z.number().int().nullish(),
	group: navGroupValue.nullish(),
	commentsEnabled: z.boolean().optional(),
	commentsModeration: z.enum([
		"all",
		"first_time",
		"none"
	]).optional(),
	commentsClosedAfterDays: z.number().int().min(0).optional(),
	commentsAutoApproveUsers: z.boolean().optional(),
	editLocking: z.boolean().optional(),
	titleField: z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format").nullish(),
	dateField: z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format").nullish()
}).meta({ id: "UpdateCollectionBody" });
var createFieldBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid slug format"),
	label: z.string().min(1),
	type: fieldTypeValues,
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	indexed: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "CreateFieldBody" });
var updateFieldBody = z.object({
	label: z.string().min(1).optional(),
	type: fieldTypeValues.optional(),
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: fieldValidation.nullable(),
	widget: z.string().optional(),
	options: fieldWidgetOptions,
	sortOrder: z.number().int().min(0).optional(),
	searchable: z.boolean().optional(),
	indexed: z.boolean().optional(),
	translatable: z.boolean().optional()
}).meta({ id: "UpdateFieldBody" });
var fieldReorderBody = z.object({ fieldSlugs: z.array(z.string().min(1)) }).meta({ id: "FieldReorderBody" });
var collectionReorderBody = z.object({ slugs: z.array(z.string().min(1)) }).meta({ id: "CollectionReorderBody" });
var orphanRegisterBody = z.object({
	label: z.string().optional(),
	labelSingular: z.string().optional(),
	description: z.string().optional()
}).meta({ id: "OrphanRegisterBody" });
z.object({ format: z.string().optional() });
var blockFieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"repeater"
]);
var blockFieldValidation = z.object({
	min: z.number().optional(),
	max: z.number().optional(),
	minLength: z.number().int().min(0).optional(),
	maxLength: z.number().int().min(0).optional(),
	pattern: z.string().optional(),
	options: z.array(z.string()).optional(),
	subFields: z.array(repeaterSubFieldSchema).min(1).optional(),
	minItems: z.number().int().min(0).optional(),
	maxItems: z.number().int().min(1).optional(),
	allowedMimeTypes: z.array(z.string()).min(1).max(64).optional()
}).strict().optional();
var blockFieldDefinitionSchema = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid field slug format"),
	label: z.string().min(1).max(200),
	type: blockFieldTypeValues,
	required: z.boolean().optional(),
	defaultValue: z.unknown().optional(),
	validation: blockFieldValidation,
	options: z.object({ darkVariant: z.boolean().optional() }).strict().optional()
}).strict();
var createBlockTypeBody = z.object({
	slug: z.string().min(1).max(63).regex(slugPattern$1, "Invalid block type slug format"),
	label: z.string().min(1).max(200),
	description: z.string().optional(),
	icon: z.string().optional(),
	category: z.string().optional(),
	fields: z.array(blockFieldDefinitionSchema)
}).strict().meta({ id: "CreateBlockTypeBody" });
var updateBlockTypeBody = z.object({
	expectedFingerprint: z.string().min(1),
	label: z.string().min(1).max(200).optional(),
	description: z.string().nullish(),
	icon: z.string().nullish(),
	category: z.string().nullish(),
	fields: z.array(blockFieldDefinitionSchema).optional(),
	breaking: z.boolean().optional()
}).strict().meta({ id: "UpdateBlockTypeBody" });
var activateBlockTypeVersionBody = z.object({ expectedFingerprint: z.string().min(1) }).strict().meta({ id: "ActivateBlockTypeVersionBody" });
var collectionGetQuery = z.object({ includeFields: z.string().transform((v) => v === "true").optional() });
var collectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	labelSingular: z.string().nullable(),
	description: z.string().nullable(),
	icon: z.string().nullable(),
	admin: collectionAdminResponseConfig.optional(),
	supports: z.array(z.string()),
	source: z.string().nullable(),
	urlPattern: z.string().nullable(),
	routable: z.boolean(),
	hasSeo: z.boolean(),
	hidden: z.boolean(),
	sortOrder: z.number().int().nullable(),
	editLocking: z.boolean(),
	group: z.string().nullish(),
	createdAt: z.string(),
	updatedAt: z.string(),
	titleField: z.string().nullish(),
	dateField: z.string().nullish()
}).meta({ id: "Collection" });
var fieldSchema = z.object({
	id: z.string(),
	collectionId: z.string(),
	slug: z.string(),
	label: z.string(),
	type: fieldTypeValues,
	required: z.boolean(),
	unique: z.boolean(),
	defaultValue: z.unknown().nullable(),
	validation: z.record(z.string(), z.unknown()).nullable(),
	widget: z.string().nullable(),
	options: z.record(z.string(), z.unknown()).nullable(),
	blockTypes: z.array(z.lazy(() => blockTypeSchema)).optional(),
	blockTypeFingerprint: z.string().optional(),
	sortOrder: z.number().int(),
	searchable: z.boolean(),
	indexed: z.boolean(),
	translatable: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Field" });
var collectionResponseSchema = z.object({ item: collectionSchema }).meta({ id: "CollectionResponse" });
var collectionWithFieldsResponseSchema = z.object({ item: collectionSchema.extend({ fields: z.array(fieldSchema) }) }).meta({ id: "CollectionWithFieldsResponse" });
var collectionListResponseSchema = z.object({ items: z.array(collectionSchema) }).meta({ id: "CollectionListResponse" });
var fieldResponseSchema = z.object({ item: fieldSchema }).meta({ id: "FieldResponse" });
var fieldListResponseSchema = z.object({ items: z.array(fieldSchema) }).meta({ id: "FieldListResponse" });
var blockTypeVersionSchema = z.object({
	id: z.string(),
	blockTypeId: z.string(),
	version: z.number().int().positive(),
	fields: z.array(blockFieldDefinitionSchema),
	fingerprint: z.string(),
	active: z.boolean(),
	unsupportedTypes: z.array(z.object({
		type: z.string(),
		path: z.string()
	}).strict()).optional(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BlockTypeVersion" });
var blockTypeSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	description: z.string().optional(),
	icon: z.string().optional(),
	category: z.string().optional(),
	currentVersion: z.number().int().positive(),
	source: z.enum(["user", "seed"]),
	versions: z.array(blockTypeVersionSchema),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BlockType" });
var blockTypeResponseSchema = z.object({ item: blockTypeSchema }).meta({ id: "BlockTypeResponse" });
var blockTypeListResponseSchema = z.object({ items: z.array(blockTypeSchema) }).meta({ id: "BlockTypeListResponse" });
var orphanedTableSchema = z.object({
	slug: z.string(),
	tableName: z.string(),
	rowCount: z.number().int()
}).meta({ id: "OrphanedTable" });
var orphanedTableListResponseSchema = z.object({ items: z.array(orphanedTableSchema) }).meta({ id: "OrphanedTableListResponse" });
var collectionSlug = z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Invalid collection slug format");
var createTaxonomyDefBody = z.object({
	name: z.string().min(1).max(63).regex(/^[a-z][a-z0-9_]*$/, "Name must be lowercase alphanumeric with underscores"),
	label: z.string().min(1).max(200),
	labelSingular: z.string().min(1).max(200).optional(),
	hierarchical: z.boolean().optional(),
	collections: z.array(collectionSlug).max(100).optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTaxonomyDefBody" });
/**
* `name` and `locale` are absent on purpose: both identify the definition row
* being written, and `.strict()` turns an attempt to change either into a 400
* rather than a silently ignored field.
*/
var updateTaxonomyDefBody = z.object({
	label: z.string().min(1).max(200).optional(),
	labelSingular: z.string().min(1).max(200).nullish(),
	hierarchical: z.boolean().optional(),
	collections: z.array(collectionSlug).max(100).optional()
}).strict().meta({ id: "UpdateTaxonomyDefBody" });
var createTermBody = z.object({
	slug: z.string().min(1).optional().meta({ description: "Term slug. Omit to derive a unique slug from the label." }),
	label: z.string().min(1),
	parentId: z.string().nullish(),
	description: z.string().optional(),
	locale: localeCode.optional(),
	translationOf: z.string().min(1).optional()
}).meta({ id: "CreateTermBody" });
var bulkTagBody = z.object({
	termId: z.string().min(1),
	apply: z.boolean().default(false),
	refreshOnly: z.boolean().optional(),
	items: z.array(z.union([z.object({
		collection: collectionSlug,
		id: z.string().min(1)
	}).strict(), z.object({ url: z.string().min(1).max(2048) }).strict()])).min(1).max(50)
}).strict().meta({ id: "BulkTagBody" });
var updateTermBody = z.object({
	slug: z.string().min(1).optional(),
	label: z.string().min(1).optional(),
	parentId: z.string().nullish(),
	description: z.string().optional()
}).meta({ id: "UpdateTermBody" });
var reorderTermsBody = z.object({
	parentId: z.string().min(1).nullish().meta({ description: "Parent term whose children are being ordered (translation_group or row id). Omit or null for the top level, which for a flat taxonomy is every term." }),
	ids: z.array(z.string().min(1)).max(100).meta({ description: "Terms to move, in the desired order — each a row id or translation_group. May be a subset of the group: the listed terms are permuted within the positions they already occupy and every other member keeps its place. An id outside the group is rejected with REORDER_MISMATCH." })
}).strict().meta({ id: "ReorderTermsBody" });
var termListQuery = z.object({
	locale: localeCode.optional(),
	includeCounts: z.enum(["true", "false"]).transform((v) => v === "true").optional().default(true).meta({ description: "Include each term's visible-usage count. Pass false to skip the aggregate; `count` is then absent from every term." }),
	resolveFallback: z.enum(["true", "false"]).transform((value) => value === "true").optional().default(false).meta({ description: "Resolve one term per translation group, preferring the requested locale and then the configured default locale." })
}).meta({ id: "TermListQuery" });
var taxonomyDefSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	labelSingular: z.string().optional(),
	hierarchical: z.boolean(),
	collections: z.array(z.string()),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TaxonomyDef" });
var taxonomyDefTranslationsSchema = z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		name: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TaxonomyDefTranslations" });
var taxonomyListResponseSchema = z.object({ taxonomies: z.array(taxonomyDefSchema) }).meta({ id: "TaxonomyListResponse" });
var taxonomyResponseSchema = z.object({ taxonomy: taxonomyDefSchema }).meta({ id: "TaxonomyResponse" });
var termSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "Term" });
z.object({
	translationGroup: z.string().nullable(),
	translations: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string(),
		locale: z.string()
	}))
}).meta({ id: "TermTranslations" });
var termWithCountSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	label: z.string(),
	parentId: z.string().nullable(),
	description: z.string().optional(),
	count: z.number().int().optional(),
	children: z.array(z.lazy(() => termWithCountSchema)),
	locale: z.string(),
	translationGroup: z.string().nullable()
}).meta({ id: "TermWithCount" });
var termListResponseSchema = z.object({ terms: z.array(termWithCountSchema) }).meta({ id: "TermListResponse" });
var termResponseSchema = z.object({ term: termSchema }).meta({ id: "TermResponse" });
var termReorderResponseSchema = z.object({ reordered: z.literal(true) }).meta({ id: "TermReorderResponse" });
var termGetResponseSchema = z.object({ term: termSchema.extend({
	count: z.number().int(),
	children: z.array(z.object({
		id: z.string(),
		slug: z.string(),
		label: z.string()
	}))
}) }).meta({ id: "TermGetResponse" });
var sectionSource = z.enum([
	"theme",
	"user",
	"import"
]);
var sectionsListQuery = z.object({
	source: sectionSource.optional(),
	search: z.string().optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50),
	cursor: z.string().max(2048).optional()
}).meta({ id: "SectionsListQuery" });
var createSectionBody = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().optional(),
	source: z.enum(["user", "import"]).optional(),
	themeId: z.string().optional()
}).meta({ id: "CreateSectionBody" });
var updateSectionBody = z.object({
	slug: z.string().min(1).optional(),
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	previewMediaId: z.string().nullish()
}).meta({ id: "UpdateSectionBody" });
var sectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	keywords: z.array(z.string()).nullable(),
	content: z.array(z.record(z.string(), z.unknown())),
	previewMediaId: z.string().nullable(),
	source: z.string(),
	themeId: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "Section" });
var sectionListResponseSchema = z.object({
	items: z.array(sectionSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SectionListResponse" });
var mediaReferenceInput = z.object({
	mediaId: z.string(),
	alt: z.string().optional()
});
var socialSettings = z.object({
	twitter: z.string().optional(),
	github: z.string().optional(),
	facebook: z.string().optional(),
	instagram: z.string().optional(),
	linkedin: z.string().optional(),
	youtube: z.string().optional()
});
var seoSettingsInput = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceInput.nullable().optional(),
	robotsTxt: z.string().max(5e3).optional(),
	disallowAiTraining: z.boolean().optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
var settingsUpdateBody = z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceInput.nullable().optional(),
	favicon: mediaReferenceInput.nullable().optional(),
	url: z.union([httpUrl, z.literal("")]).optional(),
	postsPerPage: z.number().int().min(1).max(100).optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsInput.optional()
}).meta({ id: "SettingsUpdateBody" });
var mediaReferenceResponse = z.object({
	mediaId: z.string(),
	alt: z.string().optional(),
	url: z.string().optional(),
	contentType: z.string().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional()
});
var seoSettingsResponse = z.object({
	titleSeparator: z.string().max(10).optional(),
	defaultOgImage: mediaReferenceResponse.optional(),
	robotsTxt: z.string().max(5e3).optional(),
	disallowAiTraining: z.boolean().optional(),
	googleVerification: z.string().max(100).optional(),
	bingVerification: z.string().max(100).optional()
});
var siteSettingsSchema = z.object({
	title: z.string().optional(),
	tagline: z.string().optional(),
	logo: mediaReferenceResponse.optional(),
	favicon: mediaReferenceResponse.optional(),
	url: z.string().optional(),
	postsPerPage: z.number().int().optional(),
	dateFormat: z.string().optional(),
	timezone: z.string().optional(),
	social: socialSettings.optional(),
	seo: seoSettingsResponse.optional()
}).meta({ id: "SiteSettings" });
var searchQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	status: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	cursor: z.string().optional(),
	scope: z.enum(["all", "title"]).optional().meta({ description: "Which indexed fields to match against. 'title' matches only the collection's title field; collections without an indexed title field return no results. Defaults to 'all'." })
}).meta({ id: "SearchQuery" });
var searchSuggestQuery = z.object({
	q: z.string().min(1),
	collections: z.string().optional(),
	locale: localeCode.optional(),
	limit: z.coerce.number().int().min(1).max(20).optional()
}).meta({ id: "SearchSuggestQuery" });
var searchRebuildBody = z.object({ collection: z.string().min(1) }).meta({ id: "SearchRebuildBody" });
var searchEnableBody = z.object({
	collection: z.string().min(1),
	enabled: z.boolean(),
	weights: z.record(z.string(), z.number()).optional(),
	tokenize: z.enum(SEARCH_TOKENIZERS).optional()
}).meta({ id: "SearchEnableBody" });
var searchResultSchema = z.object({
	collection: z.string(),
	id: z.string(),
	slug: z.string().nullable(),
	locale: z.string(),
	title: z.string().optional(),
	snippet: z.string().optional(),
	score: z.number()
}).meta({ id: "SearchResult" });
var searchResponseSchema = z.object({
	items: z.array(searchResultSchema),
	nextCursor: z.string().optional()
}).meta({ id: "SearchResponse" });
var usersListQuery = z.object({
	search: z.string().optional(),
	role: z.string().optional(),
	cursor: z.string().max(2048).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50)
}).meta({ id: "UsersListQuery" });
var userUpdateBody = z.object({
	name: z.string().optional(),
	email: z.email().optional(),
	role: roleLevel.optional()
}).meta({ id: "UserUpdateBody" });
var allowedDomainCreateBody = z.object({
	domain: z.string().min(1),
	defaultRole: roleLevel
}).meta({ id: "AllowedDomainCreateBody" });
var allowedDomainUpdateBody = z.object({
	enabled: z.boolean().optional(),
	defaultRole: roleLevel.optional()
}).meta({ id: "AllowedDomainUpdateBody" });
var userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentialCount: z.number().int().optional(),
	oauthProviders: z.array(z.string()).optional()
}).meta({ id: "User" });
var userListResponseSchema = z.object({
	items: z.array(userSchema),
	nextCursor: z.string().optional()
}).meta({ id: "UserListResponse" });
var userDetailSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	avatarUrl: z.string().nullable(),
	role: z.number().int(),
	emailVerified: z.boolean(),
	disabled: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	lastLogin: z.string().nullable(),
	credentials: z.array(z.object({
		id: z.string(),
		name: z.string().nullable(),
		deviceType: z.string().nullable(),
		createdAt: z.string(),
		lastUsedAt: z.string()
	})),
	oauthAccounts: z.array(z.object({
		provider: z.string(),
		createdAt: z.string()
	}))
}).meta({ id: "UserDetail" });
var widgetType = z.enum([
	"content",
	"menu",
	"component"
]);
var createWidgetAreaBody = z.object({
	name: z.string().min(1),
	label: z.string().min(1),
	description: z.string().optional()
}).meta({ id: "CreateWidgetAreaBody" });
var createWidgetBody = z.object({
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "CreateWidgetBody" });
var updateWidgetBody = z.object({
	type: widgetType.optional(),
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "UpdateWidgetBody" });
var reorderWidgetsBody = z.object({ widgetIds: z.array(z.string().min(1)) }).meta({ id: "ReorderWidgetsBody" });
var widgetAreaSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	description: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string()
}).meta({ id: "WidgetArea" });
var widgetSchema = z.object({
	id: z.string(),
	type: widgetType,
	title: z.string().optional(),
	content: z.array(z.record(z.string(), z.unknown())).optional(),
	menuName: z.string().optional(),
	componentId: z.string().optional(),
	componentProps: z.record(z.string(), z.unknown()).optional()
}).meta({ id: "Widget" });
var widgetAreaWithWidgetsSchema = widgetAreaSchema.extend({ widgets: z.array(widgetSchema) }).meta({ id: "WidgetAreaWithWidgets" });
var widgetAreaWithWidgetsAndCountSchema = widgetAreaWithWidgetsSchema.extend({ widgetCount: z.number().int() }).meta({ id: "WidgetAreaWithWidgetsAndCount" });
var entryLockAcquireBody = z.object({
	takeover: z.boolean().optional().meta({ description: "Take the lock from whoever holds it. Their next heartbeat or save reports the new holder." }),
	token: z.string().min(1).max(128).optional().meta({ description: "Identifies the caller's editing session. Send the same value on DELETE so a release from one tab does not drop a lock another tab of the same account still relies on." })
}).meta({ id: "EntryLockAcquireBody" });
var entryLockHolderSchema = z.object({
	userId: z.string(),
	userName: z.string().nullable(),
	acquiredAt: z.string(),
	expiresAt: z.string()
}).meta({ id: "EntryLockHolder" });
var entryLockStatusSchema = z.object({
	enabled: z.boolean().meta({ description: "Whether the collection takes edit locks at all" }),
	holder: entryLockHolderSchema.nullable(),
	heldByCaller: z.boolean()
}).meta({ id: "EntryLockStatus" });
var entryLockReleaseResponseSchema = z.object({ released: z.boolean() }).meta({ id: "EntryLockReleaseResponse" });
z.object({
	success: z.literal(false),
	error: z.object({
		code: z.literal("ENTRY_LOCKED"),
		message: z.string(),
		details: entryLockHolderSchema
	})
});
var entryMutationConflictSchema = z.object({
	success: z.literal(false),
	error: z.object({
		code: z.string().meta({ examples: ["CONFLICT", "ENTRY_LOCKED"] }),
		message: z.string(),
		details: entryLockHolderSchema.optional()
	})
});
export { orphanedTableListResponseSchema as $, mediaListQuery as $t, contentSeoInput as A, mediaUsageWorkListResponseSchema as An, updateWidgetBody as At, createSectionBody as B, CONTENT_TYPE_RE as Bt, contentListResponseSchema as C, mediaUsageDetailsQuery as Cn, updateBlockTypeBody as Ct, contentRestoreResponseSchema as D, mediaUsageRepairBody as Dn, updateSectionBody as Dt, contentResponseSchema as E, mediaUsageProgressSchema as En, updateRelationBody as Et, contentUpdateBody as F, usersListQuery as Ft, entryLockAcquireBody as G, mediaDirectUploadBody as Gt, createTermBody as H, formatFileSize as Ht, createBlockTypeBody as I, widgetAreaSchema as It, entryMutationConflictSchema as J, mediaFolderIdSchema as Jt, entryLockReleaseResponseSchema as K, mediaExistingResponseSchema as Kt, createCollectionBody as L, widgetAreaWithWidgetsAndCountSchema as Lt, contentTermsResponseSchema as M, mediaUsageWorkRetryConflictSchema as Mn, userListResponseSchema as Mt, contentTranslationsResponseSchema as N, mediaUsageWorkRetryResponseSchema as Nn, userSchema as Nt, contentRevisionConditionBody as O, mediaUsageRepairResponseSchema as On, updateTaxonomyDefBody as Ot, contentTrashQuery as P, userUpdateBody as Pt, orphanRegisterBody as Q, mediaGetQuery as Qt, createFieldBody as R, widgetAreaWithWidgetsSchema as Rt, contentListQuery as S, mediaUsageCollectionDeletionRetryResponseSchema as Sn, trashedContentListResponseSchema as St, contentPublishBody as T, mediaUsageProgressAdvanceResponseSchema as Tn, updateFieldBody as Tt, createWidgetAreaBody as U, mediaConfirmBody as Ut, createTaxonomyDefBody as V, DEFAULT_MAX_UPLOAD_SIZE as Vt, createWidgetBody as W, mediaConfirmResponseSchema as Wt, fieldReorderBody as X, mediaFolderListResponseSchema as Xt, fieldListResponseSchema as Y, mediaFolderListQuery as Yt, fieldResponseSchema as Z, mediaFolderResponseSchema as Zt, contentAuthorsResponseSchema as _, mediaUsageActivationConflictSchema as _n, termGetResponseSchema as _t, blockTypeResponseSchema as a, mediaReplaceResponseSchema as an, searchQuery as at, contentCreateBody as b, mediaUsageCollectionDeletionListResponseSchema as bn, termReorderResponseSchema as bt, bylineTranslationCreateBody as c, mediaUpdateBody as cn, searchSuggestQuery as ct, calendarQuery as d, mediaUploadMetadataForm as dn, sectionsListQuery as dt, mediaListReadResponseSchema as en, relationListQuery as et, collectionGetQuery as f, mediaUploadResponseSchema as fn, settingsUpdateBody as ft, collectionWithFieldsResponseSchema as g, mediaUsageActivationAdvanceResponseSchema as gn, taxonomyResponseSchema as gt, collectionResponseSchema as h, mediaUsageActivationAdvanceBody as hn, taxonomyListResponseSchema as ht, blockTypeListResponseSchema as i, mediaReplaceMetadataForm as in, searchEnableBody as it, contentTermsBody as j, mediaUsageWorkRetryBody as jn, userDetailSchema as jt, contentScheduleBody as k, mediaUsageWorkListQuery as kn, updateTermBody as kt, bylineUpdateBody as l, mediaUploadDeduplicateForm as ln, sectionListResponseSchema as lt, collectionReorderBody as m, mediaUploadUrlResponseSchema as mn, taxonomyDefTranslationsSchema as mt, allowedDomainCreateBody as n, mediaReadResponseSchema as nn, reorderWidgetsBody as nt, bulkTagBody as o, mediaResponseSchema as on, searchRebuildBody as ot, collectionListResponseSchema as p, mediaUploadUrlBody as pn, siteSettingsSchema as pt, entryLockStatusSchema as q, mediaFolderBody as qt, allowedDomainUpdateBody as r, mediaReplaceBody as rn, revisionRestoreBody as rt, bylineCreateBody as s, mediaStreamUploadResponseSchema as sn, searchResponseSchema as st, activateBlockTypeVersionBody as t, mediaListResponseSchema as tn, reorderTermsBody as tt, bylinesListQuery as u, mediaUploadEnsureUniqueFilenameForm as un, sectionSchema as ut, contentBylineInputSchema as v, mediaUsageActivationStatusSchema as vn, termListQuery as vt, contentPreviewUrlBody as w, mediaUsageDetailsResponseSchema as wn, updateCollectionBody as wt, contentItemSchema as x, mediaUsageCollectionDeletionRetryBody as xn, termResponseSchema as xt, contentCompareResponseSchema as y, mediaUsageCollectionDeletionListQuery as yn, termListResponseSchema as yt, createRelationBody as z, widgetSchema as zt };
