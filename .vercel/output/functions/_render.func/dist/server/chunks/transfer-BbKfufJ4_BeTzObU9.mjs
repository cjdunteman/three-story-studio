import { a as IMPORT_STATES, r as EXPORT_STATES, t as APPROVAL_STATUSES } from "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import { a as siteImportDecisionsInputSchema, o as siteImportPlanSchema } from "./plan-CCoqxNoU_DAWLQxcP.mjs";
import { z } from "zod";
// node_modules/emdash/dist/transfer-BbKfufJ4.mjs
var sha256DigestSchema = z.string().regex(/^sha256:[0-9a-f]{64}$/);
var transferPaginationQuery = z.object({
	cursor: z.string().min(1).max(2048).optional().meta({ description: "Opaque cursor from the previous page's `nextCursor`" }),
	limit: z.coerce.number().int().min(1).max(100).optional().default(50).meta({ description: "Maximum number of items to return (1-100, default 50)" })
});
var transferApprovalListQuery = transferPaginationQuery.extend({ status: z.enum(APPROVAL_STATUSES).optional().meta({ description: "Only approvals in this status" }) });
var transferImportAnalyzeBody = z.object({ decisions: siteImportDecisionsInputSchema.optional().meta({ description: "Principal mappings and site title/tagline choices. Applied once analysis has produced a plan; omitted values keep the plan's defaults." }) }).meta({ id: "TransferImportAnalyzeBody" });
var transferOperationSchema = z.object({
	id: z.string(),
	kind: z.enum(["export", "import"]),
	state: z.union([z.enum(EXPORT_STATES), z.enum(IMPORT_STATES)]),
	stage: z.string().nullable(),
	cursor: z.unknown().nullable(),
	progress: z.object({
		done: z.number().int().min(0),
		total: z.number().int().min(0),
		records: z.number().int().min(0).optional().meta({ description: "Records an export has written so far" }),
		bytesDone: z.number().int().min(0).optional(),
		bytesTotal: z.number().int().min(0).optional()
	}).nullable(),
	options: z.unknown(),
	idempotencyKey: z.string().nullable(),
	packageDigest: sha256DigestSchema.nullable(),
	planDigest: sha256DigestSchema.nullable(),
	originSiteId: z.string().nullable(),
	receipt: z.unknown().nullable(),
	errorCode: z.string().nullable(),
	errorDetail: z.record(z.string(), z.unknown()).nullable(),
	writeEpoch: z.number().int(),
	attemptCount: z.number().int(),
	leaseExpiresAt: z.string().nullable(),
	runtimeGeneration: z.number().int(),
	cancelRequestedAt: z.string().nullable(),
	mutationStartedAt: z.string().nullable(),
	createdBy: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	completedAt: z.string().nullable(),
	expiresAt: z.string().nullable(),
	stagingCollectedAt: z.string().nullable()
}).meta({ id: "TransferOperation" });
var transferOperationResponseSchema = z.object({ operation: transferOperationSchema }).meta({ id: "TransferOperationResponse" });
var transferOperationListResponseSchema = z.object({
	items: z.array(transferOperationSchema),
	nextCursor: z.string().optional()
}).meta({ id: "TransferOperationListResponse" });
var transferMissingFileSchema = z.object({
	path: z.string(),
	bytes: z.number().int().min(0),
	sha256: z.string().regex(/^[0-9a-f]{64}$/)
}).meta({ id: "TransferMissingFile" });
var transferMissingFilesResponseSchema = z.object({
	items: z.array(transferMissingFileSchema),
	nextCursor: z.string().optional()
}).meta({ id: "TransferMissingFilesResponse" });
var transferImportCreateResponseSchema = z.object({
	operation: transferOperationSchema,
	created: z.boolean(),
	missing: transferMissingFilesResponseSchema
}).meta({ id: "TransferImportCreateResponse" });
var transferImportStatusResponseSchema = z.object({
	operation: transferOperationSchema,
	files: z.object({
		declared: z.number().int().min(0),
		verified: z.number().int().min(0)
	})
}).meta({ id: "TransferImportStatusResponse" });
var transferFileUploadResponseSchema = z.object({
	path: z.string(),
	bytes: z.number().int().min(0),
	alreadyVerified: z.boolean(),
	remaining: z.number().int().min(0)
}).meta({ id: "TransferFileUploadResponse" });
var transferImportAnalyzeResponseSchema = z.object({
	operation: transferOperationSchema,
	plan: siteImportPlanSchema.optional(),
	planDigest: sha256DigestSchema.optional(),
	nextRequestInMs: z.number().int().min(0).nullable()
}).meta({ id: "TransferImportAnalyzeResponse" });
var transferImportPlanResponseSchema = z.object({
	plan: siteImportPlanSchema,
	planDigest: sha256DigestSchema
}).meta({ id: "TransferImportPlanResponse" });
var transferCapabilitiesSchema = z.object({
	formatVersions: z.array(z.string()),
	features: z.array(z.string()),
	optionalFeatures: z.array(z.string()),
	limits: z.object({
		manifestBytes: z.number().int(),
		recordLineBytes: z.number().int(),
		chunkBytes: z.number().int(),
		chunkRecords: z.number().int(),
		totalRecords: z.number().int(),
		totalFiles: z.number().int(),
		indexChunks: z.number().int(),
		jsonDepth: z.number().int(),
		maxBlobBytes: z.number().int()
	}),
	portableDomain: z.object({
		empty: z.boolean(),
		blockers: z.array(z.record(z.string(), z.string())),
		seededScaffold: z.array(z.record(z.string(), z.string()))
	})
}).meta({ id: "TransferCapabilities" });
var transferApprovalSchema = z.object({
	id: z.string(),
	status: z.enum(APPROVAL_STATUSES),
	action: z.enum(["export", "import"]),
	userId: z.string(),
	requestedByTokenId: z.string().nullable(),
	approvedBy: z.string().nullable(),
	operationId: z.string().nullable(),
	paramsDigest: sha256DigestSchema.nullable(),
	packageDigest: sha256DigestSchema.nullable(),
	planDigest: sha256DigestSchema.nullable(),
	expiresAt: z.string(),
	createdAt: z.string(),
	decidedAt: z.string().nullable(),
	consumedAt: z.string().nullable()
}).meta({ id: "TransferApproval" });
var transferApprovalResponseSchema = z.object({ approval: transferApprovalSchema }).meta({ id: "TransferApprovalResponse" });
var transferApprovalListResponseSchema = z.object({
	items: z.array(transferApprovalSchema),
	nextCursor: z.string().optional()
}).meta({ id: "TransferApprovalListResponse" });
var transferImportExecuteBody = z.object({
	packageDigest: sha256DigestSchema,
	planDigest: sha256DigestSchema
}).meta({ id: "TransferImportExecuteBody" });
var transferExportCreateBody = z.strictObject({ comments: z.boolean().optional().meta({ description: "Include comments and reactions (default true)" }) }).meta({ id: "TransferExportCreateBody" });
var transferExportCreateResponseSchema = z.object({
	operation: transferOperationSchema,
	created: z.boolean()
}).meta({ id: "TransferExportCreateResponse" });
var transferAdvanceResponseSchema = z.object({
	operation: transferOperationSchema,
	nextRequestInMs: z.number().int().min(0).nullable()
}).meta({ id: "TransferAdvanceResponse" });
var transferImportReceiptSchema = z.object({
	operationId: z.string(),
	packageDigest: sha256DigestSchema,
	planDigest: sha256DigestSchema,
	targetSiteId: z.string(),
	originSiteId: z.string(),
	formatVersion: z.string(),
	importerEmDashVersion: z.string(),
	completedAt: z.string(),
	logicalDigest: sha256DigestSchema,
	counts: z.record(z.string(), z.number().int().min(0)),
	warnings: z.array(z.object({
		code: z.string(),
		message: z.string()
	})),
	verification: z.literal("verified"),
	receiptDigest: sha256DigestSchema.meta({ description: "Digest of the canonical JSON of every other receipt field" })
}).meta({ id: "TransferImportReceipt" });
var transferImportReceiptResponseSchema = z.object({ receipt: transferImportReceiptSchema }).meta({ id: "TransferImportReceiptResponse" });
export { transferOperationListResponseSchema as _, transferCapabilitiesSchema as a, transferFileUploadResponseSchema as c, transferImportCreateResponseSchema as d, transferImportExecuteBody as f, transferMissingFilesResponseSchema as g, transferImportStatusResponseSchema as h, transferApprovalResponseSchema as i, transferImportAnalyzeBody as l, transferImportReceiptResponseSchema as m, transferApprovalListQuery as n, transferExportCreateBody as o, transferImportPlanResponseSchema as p, transferApprovalListResponseSchema as r, transferExportCreateResponseSchema as s, transferAdvanceResponseSchema as t, transferImportAnalyzeResponseSchema as u, transferOperationResponseSchema as v, transferPaginationQuery as y };
