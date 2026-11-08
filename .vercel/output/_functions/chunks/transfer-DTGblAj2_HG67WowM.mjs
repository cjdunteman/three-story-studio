import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { d as isSqlite, p as listTableColumns, s as detectDialect, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { m as getI18nConfig, y as isValidLocaleCode } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { i as getRequestContext } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { d as invalidateMenuObjectCache, f as invalidateObjectCache, h as invalidateWidgetObjectCache, l as invalidateCollectionCache, t as CacheNamespace } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { n as FIELD_TYPES, r as FIELD_TYPE_TO_COLUMN, s as RESERVED_FIELD_SLUGS, t as BYLINE_FIELD_TYPES, u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { r as isSafeUrlFieldWriteValue } from "./url-DTfGDJhI_CrwsbJIk.mjs";
import { a as InvalidCursorError, i as EmDashValidationError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as AuditRepository } from "./audit-B8XE-0UV_BpitiP8H.mjs";
import { t as isSiteRelativeDestination } from "./destination-DR3IHjmy_oys7XJ91.mjs";
import { a as validateDestinationParams, o as validatePattern, r as isPattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import { r as coerceFieldValue } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import { t as SEARCH_TOKENIZERS } from "./types-Cj0_yZkn_CPN4An3-.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { g as parseTaxonomyCollections } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { i as resetRegisteredCollectionsCache } from "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { t as MediaUsageCollectionDeletionRepository } from "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import { B as selectByKeys, C as estimateStatements, D as getPortableTableSpecForKind, E as firstDifference, H as updateColumns, I as recordCodecs, N as processDueMediaUsageCollectionDeletions, O as insertRows, P as processMediaUsageCollectionDeletion, S as encodeValue, T as fingerprintBlockFields, U as validateBlockFields, V as selectExportedColumns, _ as decodeContentRow, b as encodeColumn, d as SchemaRegistry, f as assertColumnCoverage, g as contentColumnSpecs, h as codecForColumnType, i as CONTENT_TABLE_COLUMNS, j as markContentMediaUsageCollectionStale, l as PORTABLE_TABLES, p as assertLoadedColumnCoverage, u as SchemaError, v as decodeRow, x as encodeRecord } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { n as computeContentHash } from "./hash-BJaeek87_BXspnfEZ.mjs";
import { a as invalidateSchemaCache } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import { r as isTransferError, t as TransferError } from "./errors-B4f4It-2_rwT1g5LA.mjs";
import { a as measureJsonDepth, i as compareUtf16, n as TRANSFER_LIMITS, o as parseCanonicalJson, r as canonicalJson, s as rowsPerInsert, t as CanonicalJsonError } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { c as planDigest, d as sha256Hex$1, i as createSha256, n as chunkLogicalSha256, o as logicalDigest, r as createHashingStream, s as packageDigest, t as canonicalDigest, u as recordSha256 } from "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
import { n as VERSION } from "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import { i as settingMediaIds, n as PORTABLE_SETTING_NAMES, r as POST_IMPORT_OPTION_RESETS, t as DECIDED_SETTING_NAMES } from "./settings-Dd1uivmQ_8f9uEka3.mjs";
import { s as invalidateSiteSettingsCache } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { A as isTerminalStatus, d as createRedirectBody, m as httpUrl, s as safeHref } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { t as detectLoops } from "./loops-B2YS-Zzr_DzZyTeGu.mjs";
import { _ as streamOrderOf, a as SYNTHETIC_ID_KINDS, b as validateRecord, c as blocksFieldTypeSlugs, d as identityProperties, f as inferredCreditId, g as referenceFieldRelationSlugs, h as portableIdSchema, i as RECORD_KINDS, l as compareIds, m as isRecordOfKind, n as IMPORT_STAGE_KINDS, o as TOPOLOGICAL_PARENT_PROPERTY, p as isRecordKind, r as KIND_REFERENCES, s as blockTypeVersionKey, t as IMPORT_RECORD_STAGES, u as compareStreamOrder, v as summarizeSchemaIssue, y as syntheticId } from "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import { a as MANIFEST_PATH, c as parsePackagePath, i as stagingPrefix, l as recordChunkPath, o as indexChunkPath, s as mediaBlobPath } from "./keys-CifIkT0N_Cq2A0wmZ.mjs";
import { a as siteImportDecisionsInputSchema, c as IMPORT_TRANSFORMATION_CODES, i as planWarningSchema, l as applyTransformations, n as mergeDecisions, o as siteImportPlanSchema, r as planBlockerSchema, s as EXPORT_TRANSFORMATION_CODES, t as isPlanExecutable, u as exportTransformationSchema } from "./plan-CCoqxNoU_DAWLQxcP.mjs";
import { C as SUPPORTED_FORMAT_VERSIONS, S as SITE_PACKAGE_PROFILE, _ as timestampNow, d as isTerminalState, i as IMPORT_STAGES, l as TransferApprovalRepository, n as EXECUTING_IMPORT_STATES, s as REBUILD_STEPS, u as analysisCursorSchema, x as SITE_PACKAGE_FORMAT } from "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import { a as toPublicOperation, i as readStreamBytes, n as TransferStage, o as sealReceipt, r as putVerified, t as TransferOperationRepository } from "./stage-CZQnXM_G_B-A2wGAk.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
import { sql } from "kysely";
import { z } from "zod";
import { ulid } from "ulidx";
import mime from "mime/lite";
import { createTarPacker } from "modern-tar";
// node_modules/emdash/dist/tar-DFjExb9X.mjs
/**
* Site package feature registry.
*
* `manifest.features` lists every feature the package uses (sorted);
* `manifest.requiredFeatures` is the subset a reader must understand to import
* it. Readers reject a package whose required features include one they do not
* know. Every v1 feature is required when present except `comment_reactions`.
*/
var SITE_PACKAGE_FEATURES = [
	"bylines",
	"comment_reactions",
	"comments",
	"content",
	"i18n",
	"media",
	"menus",
	"principals",
	"redirects",
	"relations",
	"revisions",
	"schema",
	"sections",
	"seo",
	"settings",
	"taxonomies",
	"trash",
	"widgets"
];
var OPTIONAL_FEATURES = /* @__PURE__ */ new Set(["comment_reactions"]);
var FEATURE_SET = new Set(SITE_PACKAGE_FEATURES);
function isSitePackageFeature(value) {
	return FEATURE_SET.has(value);
}
/**
* The feature a record kind belongs to. A package may only contain records of
* a kind whose feature it declares. `i18n` (more than one locale in use) and
* `trash` (entries with `deletedAt`) have no kind of their own.
*/
var KIND_FEATURE = Object.freeze({
	principal: "principals",
	block_type: "schema",
	block_type_version: "schema",
	collection: "schema",
	field: "schema",
	taxonomy_def: "taxonomies",
	relation: "relations",
	byline_field: "bylines",
	media_folder: "media",
	media: "media",
	term: "taxonomies",
	byline: "bylines",
	byline_field_value: "bylines",
	byline_field_group_value: "bylines",
	revision: "revisions",
	entry: "content",
	content_term: "taxonomies",
	content_byline: "bylines",
	content_reference: "relations",
	seo: "seo",
	menu: "menus",
	menu_item: "menus",
	widget_area: "widgets",
	widget: "widgets",
	section: "sections",
	redirect: "redirects",
	comment: "comments",
	comment_reaction: "comment_reactions",
	setting: "settings"
});
/** Required features derived from a feature list (sorted). */
function requiredFeaturesFor(features) {
	return [...new Set(features)].filter((feature) => !OPTIONAL_FEATURES.has(feature)).toSorted(compareUtf16);
}
/** Required features this reader does not understand (empty when supported). */
function unsupportedRequiredFeatures(requiredFeatures) {
	return requiredFeatures.filter((feature) => !isSitePackageFeature(feature));
}
/**
* The package manifest and its file index.
*
* `manifest.json` is small: identity, features, locales, per-kind counts,
* totals, export transformations, and the list of index chunks with their
* sizes and digests. The complete file list (every record chunk and media
* blob with size and SHA-256) lives in the index chunks `index/<seq>.ndjson`,
* one {@link PackageFileEntry} per line, sorted by path across chunks. Because
* the manifest pins each index chunk's digest and each index entry pins its
* file's digest, `packageDigest` covers every byte of the package.
*/
var sha256Hex = z.string().regex(/^[0-9a-f]{64}$/);
var count$3 = z.number().int().nonnegative();
var featureName = z.string().min(1).max(64).regex(/^[a-z][a-z0-9_]*$/);
var localeSchema = z.string().min(1).max(64);
function isSortedUnique(values) {
	return values.every((value, index) => index === 0 || compareIds(values[index - 1] ?? "", value) < 0);
}
var indexChunkRefSchema = z.strictObject({
	path: z.string(),
	bytes: count$3.max(TRANSFER_LIMITS.chunkBytes),
	sha256: sha256Hex,
	entries: count$3.max(TRANSFER_LIMITS.chunkRecords)
});
var recordKindSummarySchema = z.strictObject({
	count: count$3.min(1),
	chunks: count$3.min(1)
});
var sitePackageManifestSchema = z.strictObject({
	format: z.literal(SITE_PACKAGE_FORMAT),
	formatVersion: z.literal("1"),
	packageId: portableIdSchema,
	originSiteId: portableIdSchema,
	createdAt: z.string().min(1).max(64),
	createdByEmDashVersion: z.string().min(1).max(128),
	profile: z.literal(SITE_PACKAGE_PROFILE),
	features: z.array(featureName).max(256),
	requiredFeatures: z.array(featureName).max(256),
	locales: z.strictObject({
		default: localeSchema,
		used: z.array(localeSchema).max(1e3)
	}),
	records: z.partialRecord(z.enum(RECORD_KINDS), recordKindSummarySchema),
	media: z.strictObject({
		count: count$3,
		totalBytes: count$3
	}),
	files: z.strictObject({
		count: count$3.max(TRANSFER_LIMITS.totalFiles),
		totalBytes: count$3
	}),
	index: z.array(indexChunkRefSchema).max(TRANSFER_LIMITS.indexChunks),
	transformations: z.array(exportTransformationSchema).max(RECORD_KINDS.length * 8),
	fence: z.strictObject({ attempts: z.number().int().min(1).max(TRANSFER_LIMITS.exportFenceAttempts) })
}).superRefine((manifest, ctx) => {
	const issue = (path, message) => ctx.addIssue({
		code: "custom",
		path,
		message
	});
	if (!isSortedUnique(manifest.features)) issue(["features"], "Features must be sorted and unique");
	if (!isSortedUnique(manifest.requiredFeatures)) issue(["requiredFeatures"], "Required features must be sorted and unique");
	const features = new Set(manifest.features);
	for (const feature of manifest.requiredFeatures) if (!features.has(feature)) issue(["requiredFeatures"], `${feature} is not in features`);
	for (const feature of manifest.features) if (isSitePackageFeature(feature) && !OPTIONAL_FEATURES.has(feature) && !manifest.requiredFeatures.includes(feature)) issue(["requiredFeatures"], `${feature} must be required`);
	if (!isSortedUnique(manifest.locales.used)) issue(["locales", "used"], "Locales must be sorted and unique");
	if (manifest.locales.used.length > 0 && !manifest.locales.used.includes(manifest.locales.default)) issue(["locales", "default"], "Default locale must be in use");
	let totalRecords = 0;
	for (const kind of RECORD_KINDS) {
		const summary = manifest.records[kind];
		if (!summary) continue;
		totalRecords += summary.count;
		if (!features.has(KIND_FEATURE[kind])) issue(["records", kind], `Kind ${kind} requires feature ${KIND_FEATURE[kind]}`);
		if (summary.chunks > summary.count || summary.count > summary.chunks * TRANSFER_LIMITS.chunkRecords) issue(["records", kind], "Chunk count does not fit the record count");
	}
	if (totalRecords > TRANSFER_LIMITS.totalRecords) issue(["records"], "Too many records");
	if (manifest.media.count > 0 && !features.has("media")) issue(["media"], "Media blobs require feature media");
	if (manifest.media.count > manifest.files.count) issue(["media"], "More blobs than files");
	if (manifest.media.totalBytes > manifest.files.totalBytes) issue(["media"], "Blob bytes exceed file bytes");
	manifest.index.forEach((chunk, seq) => {
		if (chunk.path !== indexChunkPath(seq)) issue([
			"index",
			seq,
			"path"
		], "Unexpected index path");
	});
	if (manifest.index.reduce((sum, chunk) => sum + chunk.entries, 0) !== manifest.files.count) issue(["index"], "Index entries do not match the file count");
	if (!isSortedUnique(manifest.transformations.map((t) => `${t.code}\u0000${t.kind}`))) issue(["transformations"], "Transformations must be sorted by code and kind and unique");
});
/** One line of an index chunk. `records` is present exactly for record chunks. */
var packageFileEntrySchema = z.strictObject({
	path: z.string().min(1).max(256),
	bytes: count$3,
	sha256: sha256Hex,
	records: count$3.min(1).max(TRANSFER_LIMITS.chunkRecords).optional()
}).superRefine((entry, ctx) => {
	const parsed = parsePackagePath(entry.path);
	if (!parsed || parsed.type !== "records" && parsed.type !== "media") {
		ctx.addIssue({
			code: "custom",
			path: ["path"],
			message: "Invalid package file path"
		});
		return;
	}
	if (parsed.type === "records") {
		if (entry.records === void 0) ctx.addIssue({
			code: "custom",
			path: ["records"],
			message: "Record count required"
		});
		if (entry.bytes > TRANSFER_LIMITS.chunkBytes) ctx.addIssue({
			code: "custom",
			path: ["bytes"],
			message: "Chunk too large"
		});
	} else {
		if (entry.records !== void 0) ctx.addIssue({
			code: "custom",
			path: ["records"],
			message: "Blobs have no records"
		});
		if (entry.sha256 !== parsed.sha256) ctx.addIssue({
			code: "custom",
			path: ["sha256"],
			message: "Blob path must be its digest"
		});
	}
});
/**
* Parse and validate `manifest.json` bytes. Throws a {@link TransferError}:
* `TRANSFER_LIMIT_EXCEEDED` when too large, `TRANSFER_UNSUPPORTED_FORMAT` for
* another format or version, `TRANSFER_UNSUPPORTED_FEATURE` for an unknown
* required feature, and `TRANSFER_MANIFEST_INVALID` otherwise.
*/
function parseManifest(input) {
	if ((typeof input === "string" ? new TextEncoder().encode(input).byteLength : input.byteLength) > TRANSFER_LIMITS.manifestBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Manifest is too large", { detail: { limit: TRANSFER_LIMITS.manifestBytes } });
	const text = typeof input === "string" ? input : decodeUtf8(input, "TRANSFER_MANIFEST_INVALID");
	let raw;
	try {
		raw = parseCanonicalJson(text);
	} catch (error) {
		throw new TransferError("TRANSFER_MANIFEST_INVALID", "Manifest is not canonical JSON", { detail: { reason: error instanceof CanonicalJsonError ? error.message : "invalid" } });
	}
	const envelope = z.looseObject({
		format: z.unknown(),
		formatVersion: z.unknown(),
		requiredFeatures: z.unknown()
	}).safeParse(raw);
	if (!envelope.success || envelope.data.format !== "emdash-site-package" || typeof envelope.data.formatVersion !== "string" || !SUPPORTED_FORMAT_VERSIONS.includes(envelope.data.formatVersion)) throw new TransferError("TRANSFER_UNSUPPORTED_FORMAT", "Unsupported package format or version");
	if (Array.isArray(envelope.data.requiredFeatures)) {
		const unsupported = unsupportedRequiredFeatures(envelope.data.requiredFeatures.filter((value) => typeof value === "string"));
		if (unsupported.length > 0) throw new TransferError("TRANSFER_UNSUPPORTED_FEATURE", "Package requires unsupported features", { detail: { features: unsupported.slice(0, 20).join(",") } });
	}
	const result = sitePackageManifestSchema.safeParse(raw);
	if (!result.success) {
		const first = result.error.issues[0];
		const summary = first ? summarizeSchemaIssue(first, sitePackageManifestSchema.shape) : null;
		throw new TransferError("TRANSFER_MANIFEST_INVALID", "Manifest failed validation", { detail: {
			path: summary?.path ?? "",
			reason: summary?.message ?? "invalid",
			issues: result.error.issues.length
		} });
	}
	return result.data;
}
function serializeManifest(manifest) {
	return canonicalJson(manifest);
}
/** Parse one index line (canonical JSON, without its newline). */
function parseIndexLine(line) {
	let raw;
	try {
		raw = parseCanonicalJson(line);
	} catch (error) {
		throw new TransferError("TRANSFER_MANIFEST_INVALID", "Index line is not canonical JSON", { detail: { reason: error instanceof CanonicalJsonError ? error.message : "invalid" } });
	}
	const result = packageFileEntrySchema.safeParse(raw);
	if (!result.success) {
		const first = result.error.issues[0];
		throw new TransferError("TRANSFER_MANIFEST_INVALID", "Index line failed validation", { detail: { reason: first ? summarizeSchemaIssue(first, packageFileEntrySchema.shape).message : "invalid" } });
	}
	return result.data;
}
function decodeUtf8(bytes, code) {
	try {
		return new TextDecoder("utf-8", {
			fatal: true,
			ignoreBOM: true
		}).decode(bytes);
	} catch {
		throw new TransferError(code, "File is not valid UTF-8");
	}
}
/**
* The `.emdash` single-file container: an uncompressed tar of the package
* files, `manifest.json` first. The container is transport only — the package
* digest covers the manifest, which pins every file — so these helpers never
* need to trust the archive: every entry must be a regular file at a valid
* package path, appear once, and carry exactly its declared size.
*
* Runs in browsers, Node, and Workers (web streams only).
*/
/** Upper bound on archive entries: every indexed file, the index chunks, and the manifest. */
var MAX_ENTRIES = TRANSFER_LIMITS.totalFiles + TRANSFER_LIMITS.indexChunks + 1;
var FIXED_MTIME = /* @__PURE__ */ new Date(0);
function containerError(message, detail) {
	return new TransferError("TRANSFER_CONTAINER_INVALID", message, detail ? { detail } : {});
}
function toStream(body) {
	if (!(body instanceof Uint8Array)) return body;
	return new ReadableStream({ start(controller) {
		if (body.byteLength > 0) controller.enqueue(body);
		controller.close();
	} });
}
function sizeGuard(path, expected) {
	let seen = 0;
	return new TransformStream({
		transform(chunk, controller) {
			seen += chunk.byteLength;
			if (seen > expected) throw containerError("Entry is larger than declared", { path });
			controller.enqueue(chunk);
		},
		flush() {
			if (seen !== expected) throw containerError("Entry is smaller than declared", { path });
		}
	});
}
/**
* Stream a container from package files. `manifest.json` must come first;
* every path must be a valid package path and appear once, and each body must
* produce exactly `bytes` bytes. Entries get a fixed mtime and mode so the
* same files always produce the same archive bytes.
*/
function packSitePackage(files) {
	const { readable, controller } = createTarPacker();
	(async () => {
		const seen = /* @__PURE__ */ new Set();
		try {
			for await (const file of files) {
				if (seen.size === 0 && file.path !== "manifest.json") throw containerError("The manifest must be the first entry");
				if (!parsePackagePath(file.path)) throw containerError("Invalid package path", { path: file.path });
				if (seen.has(file.path)) throw containerError("Duplicate package path", { path: file.path });
				if (seen.size >= MAX_ENTRIES) throw containerError("Too many entries");
				if (!Number.isSafeInteger(file.bytes) || file.bytes < 0) throw containerError("Invalid entry size", { path: file.path });
				seen.add(file.path);
				const entry = controller.add({
					name: file.path,
					size: file.bytes,
					type: "file",
					mode: 420,
					mtime: FIXED_MTIME
				});
				await toStream(await file.body()).pipeThrough(sizeGuard(file.path, file.bytes)).pipeTo(entry);
			}
			if (seen.size === 0) throw containerError("The manifest must be the first entry");
			controller.finalize();
		} catch (error) {
			controller.error(error);
		}
	})();
	return readable;
}
// node_modules/emdash/dist/transfer-DTGblAj2.mjs
/**
* A text column compared bytewise. Package ordering is by UTF-16 code unit
* and portable ids and paths are ASCII, so bytewise order is package order.
* SQLite compares TEXT with BINARY by default; Postgres needs `COLLATE "C"`
* because database collations are usually linguistic.
*/
function bytewise(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)} COLLATE "C"` : sql`${sql.ref(column)}`;
}
/** `LIKE` pattern matching values that start with `prefix` (use with `ESCAPE '\'`). */
function likePrefix(prefix) {
	return `${prefix.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_")}%`;
}
/**
* Files belonging to an operation's staged package.
*
* For an import, every file the manifest's index declares is `declared` with
* its expected size and digest, then becomes `verified` once `putVerified`
* stored exactly those bytes. For an export, each file the exporter writes is
* recorded `verified` as it is written; finalization streams them in path
* order into the index chunks. Verification stores each record chunk's
* logical hash in `logical_sha256`.
*/
function toStagedFile(row) {
	return {
		path: row.path,
		bytes: Number(row.bytes),
		sha256: row.sha256,
		state: row.state === "verified" ? "verified" : "declared",
		verifiedAt: row.verified_at,
		logicalSha256: row.logical_sha256
	};
}
/** Bound values per inserted row: six columns plus the timestamp offset in `verified_at`. */
var STAGED_FILE_BINDS = 7;
var TransferStagedFileRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Declare expected files. Re-declaring an identical file is a no-op; a
	* different size or digest for an existing path throws
	* `TRANSFER_FILE_DIGEST_MISMATCH`.
	*/
	async declareMany(operationId, files, state = "declared") {
		for (const batch of chunks([...files], rowsPerInsert(STAGED_FILE_BINDS))) await this.db.insertInto("_emdash_transfer_staged_files").values(batch.map((file) => ({
			operation_id: operationId,
			path: file.path,
			bytes: file.bytes,
			sha256: file.sha256,
			state,
			verified_at: state === "verified" ? timestampNow(this.db) : null,
			logical_sha256: null
		}))).onConflict((conflict) => conflict.columns(["operation_id", "path"]).doNothing()).execute();
		for (const batch of chunks([...files], 50)) {
			const stored = await this.getMany(operationId, batch.map((file) => file.path));
			for (const file of batch) {
				const existing = stored.get(file.path);
				if (!existing || existing.bytes !== file.bytes || existing.sha256 !== file.sha256) throw new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "File was already declared with a different size or digest", { detail: { path: file.path } });
			}
		}
	}
	/** Record that the declared bytes were stored and verified. Returns false if the declaration differs. */
	async markVerified(operationId, file) {
		const result = await this.db.updateTable("_emdash_transfer_staged_files").set({
			state: "verified",
			verified_at: timestampNow(this.db)
		}).where("operation_id", "=", operationId).where("path", "=", file.path).where("bytes", "=", file.bytes).where("sha256", "=", file.sha256).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0n) > 0;
	}
	/**
	* The size and digest each staged file of an operation was verified with,
	* or null for a file that is not verified. Readers check what they read
	* against these, since a later upload can replace a verified object.
	*/
	verifiedDigests(operationId) {
		return async (path) => {
			const file = await this.get(operationId, path);
			return file?.state === "verified" ? {
				bytes: file.bytes,
				sha256: file.sha256
			} : null;
		};
	}
	async isVerified(operationId, path) {
		return (await this.get(operationId, path))?.state === "verified";
	}
	async setLogicalSha256(operationId, path, logicalSha256) {
		await this.db.updateTable("_emdash_transfer_staged_files").set({ logical_sha256: logicalSha256 }).where("operation_id", "=", operationId).where("path", "=", path).execute();
	}
	async get(operationId, path) {
		const row = await this.db.selectFrom("_emdash_transfer_staged_files").select([
			"path",
			"bytes",
			"sha256",
			"state",
			"verified_at",
			"logical_sha256"
		]).where("operation_id", "=", operationId).where("path", "=", path).executeTakeFirst();
		return row ? toStagedFile(row) : null;
	}
	async getMany(operationId, paths) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(paths)], 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_staged_files").select([
				"path",
				"bytes",
				"sha256",
				"state",
				"verified_at",
				"logical_sha256"
			]).where("operation_id", "=", operationId).where("path", "in", batch).execute();
			for (const row of rows) result.set(row.path, toStagedFile(row));
		}
		return result;
	}
	/** Files in path order, optionally filtered by state or path prefix. */
	async list(operationId, options = {}) {
		let query = this.db.selectFrom("_emdash_transfer_staged_files").select([
			"path",
			"bytes",
			"sha256",
			"state",
			"verified_at",
			"logical_sha256"
		]).where("operation_id", "=", operationId);
		if (options.state) query = query.where("state", "=", options.state);
		if (options.prefix !== void 0) query = query.where(sql`path LIKE ${likePrefix(options.prefix)} ESCAPE '\\'`);
		const after = options.after;
		if (after !== void 0) query = query.where(sql`${bytewise(this.db, "path")} > ${after}`);
		return (await query.orderBy(bytewise(this.db, "path")).limit(Math.min(Math.max(options.limit ?? 500, 1), 1e3)).execute()).map(toStagedFile);
	}
	async countByState(operationId) {
		const rows = await this.db.selectFrom("_emdash_transfer_staged_files").select((eb) => ["state", eb.fn.countAll().as("count")]).where("operation_id", "=", operationId).groupBy("state").execute();
		const counts = {
			declared: 0,
			verified: 0
		};
		for (const row of rows) if (row.state === "declared" || row.state === "verified") counts[row.state] = Number(row.count);
		return counts;
	}
	/** Delete up to `limit` rows for an operation; returns how many were deleted. */
	async deleteForOperation(operationId, limit = 500) {
		const paths = await this.db.selectFrom("_emdash_transfer_staged_files").select("path").where("operation_id", "=", operationId).limit(limit).execute();
		let deleted = 0;
		for (const batch of chunks(paths.map((row) => row.path), 50)) {
			const result = await this.db.deleteFrom("_emdash_transfer_staged_files").where("operation_id", "=", operationId).where("path", "in", batch).executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0n);
		}
		return deleted;
	}
};
/**
* Option holding this installation's site id. Target-local: never exported
* and never overwritten by an import.
*/
var SITE_ID_OPTION = "emdash:site_id";
/**
* This installation's site id, created on first use. Concurrent first callers
* converge on one value: creation is an insert-if-absent, and a caller that
* loses the race reads the winner's value.
*/
async function getOrCreateSiteId(db) {
	const options = new OptionsRepository(db);
	const existing = await options.get(SITE_ID_OPTION);
	if (typeof existing === "string" && existing.length > 0) return existing;
	const candidate = ulid();
	if ((await options.compareAndSet(SITE_ID_OPTION, null, candidate)).applied) return candidate;
	const winner = await options.get(SITE_ID_OPTION);
	if (typeof winner === "string" && winner.length > 0) return winner;
	throw new Error("Site id option exists but is not a non-empty string");
}
/**
* NDJSON encoding of record and index chunks.
*
* A chunk is a sequence of lines, each the canonical JSON of one record (or
* index entry) followed by `\n`, with no blank lines. A chunk holds at most
* {@link TRANSFER_LIMITS.chunkRecords} lines and
* {@link TRANSFER_LIMITS.chunkBytes} bytes; a record line is at most
* {@link TRANSFER_LIMITS.recordLineBytes} bytes.
*/
var encoder$3 = new TextEncoder();
/** Canonical line (without newline) for a record; enforces the line limit. */
function encodeRecordLine(record) {
	const line = canonicalJson(record);
	const bytes = encoder$3.encode(line).byteLength;
	if (bytes > TRANSFER_LIMITS.recordLineBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Record exceeds the line size limit", { detail: {
		kind: record.kind,
		id: record.id,
		bytes,
		limit: TRANSFER_LIMITS.recordLineBytes
	} });
	return line;
}
/**
* Validate one line as a record of `kind`. Throws `TRANSFER_RECORD_INVALID`
* (with a location but never record content) or `TRANSFER_LIMIT_EXCEEDED`.
*/
function decodeRecordLine$1(kind, line, location) {
	if (encoder$3.encode(line).byteLength > TRANSFER_LIMITS.recordLineBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Record exceeds the line size limit", { detail: {
		path: location.path,
		line: location.line
	} });
	let raw;
	try {
		raw = parseCanonicalJson(line);
	} catch (error) {
		throw new TransferError("TRANSFER_RECORD_INVALID", "Record is not canonical JSON", { detail: {
			path: location.path,
			line: location.line,
			reason: error instanceof CanonicalJsonError ? error.message : "invalid"
		} });
	}
	const result = validateRecord(kind, raw);
	if (!result.success) {
		const first = result.issues[0];
		throw new TransferError("TRANSFER_RECORD_INVALID", "Record failed validation", { detail: {
			path: location.path,
			line: location.line,
			field: first?.path ?? "",
			reason: first?.message ?? "invalid"
		} });
	}
	return {
		record: result.record,
		line
	};
}
/**
* Split chunk text into lines, enforcing chunk limits and the trailing
* newline. Returns the lines without their newlines.
*/
function splitChunkLines(bytes, path) {
	if (bytes.byteLength > TRANSFER_LIMITS.chunkBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Chunk exceeds the size limit", { detail: {
		path,
		limit: TRANSFER_LIMITS.chunkBytes
	} });
	const text = decodeUtf8(bytes, "TRANSFER_RECORD_INVALID");
	if (text.length === 0) throw new TransferError("TRANSFER_RECORD_INVALID", "Chunk is empty", { detail: { path } });
	if (!text.endsWith("\n")) throw new TransferError("TRANSFER_RECORD_INVALID", "Chunk must end with a newline", { detail: { path } });
	const lines = text.slice(0, -1).split("\n");
	if (lines.length > TRANSFER_LIMITS.chunkRecords) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Chunk has too many lines", { detail: {
		path,
		limit: TRANSFER_LIMITS.chunkRecords
	} });
	lines.forEach((line, index) => {
		if (line.length === 0) throw new TransferError("TRANSFER_RECORD_INVALID", "Chunk contains a blank line", { detail: {
			path,
			line: index + 1
		} });
	});
	return lines;
}
/** Join canonical lines into chunk bytes, enforcing chunk limits. */
function encodeChunk(lines, path) {
	if (lines.length === 0 || lines.length > TRANSFER_LIMITS.chunkRecords) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Chunk line count out of range", { detail: {
		path,
		lines: lines.length
	} });
	const bytes = encoder$3.encode(`${lines.join("\n")}\n`);
	if (bytes.byteLength > TRANSFER_LIMITS.chunkBytes) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "Chunk exceeds the size limit", { detail: {
		path,
		bytes: bytes.byteLength
	} });
	return bytes;
}
/**
* Staged package reader and writer.
*
* The writer stores package files under a {@link TransferStage}, returning
* the index entry (size and digest) for each. The reader parses and validates
* what is staged: the manifest, index chunks (checked against the digests the
* manifest pins), record chunks (every line strictly validated), and blobs.
*/
var encoder$2 = new TextEncoder();
var StagedPackageWriter = class {
	constructor(stage) {
		this.stage = stage;
	}
	/** Store bytes at a package path; returns its index entry (without `records`). */
	async writeFile(path, bytes) {
		const sha256 = await sha256Hex$1(bytes);
		await this.stage.putVerified(path, bytes, bytes.byteLength, sha256);
		return {
			path,
			bytes: bytes.byteLength,
			sha256
		};
	}
	/** Encode and store one record chunk. Records must already be in stream order. */
	async writeRecordChunk(kind, seq, records) {
		const path = recordChunkPath(kind, seq);
		for (const record of records) if (record.kind !== kind) throw new TransferError("TRANSFER_RECORD_INVALID", "Record kind does not match its chunk", { detail: {
			path,
			id: record.id
		} });
		const lines = records.map((record) => encodeRecordLine(record));
		return {
			...await this.writeFile(path, encodeChunk(lines, path)),
			records: records.length
		};
	}
	/** Encode and store one index chunk. */
	async writeIndexChunk(seq, entries) {
		const path = indexChunkPath(seq);
		const lines = entries.map((entry) => canonicalJson(entry));
		const file = await this.writeFile(path, encodeChunk(lines, path));
		return {
			path,
			bytes: file.bytes,
			sha256: file.sha256,
			entries: entries.length
		};
	}
	/** Store a media blob, verifying the declared size and digest as it streams. */
	async writeBlob(sha256, body, bytes) {
		const path = mediaBlobPath(sha256);
		await this.stage.putVerified(path, body, bytes, sha256);
		return {
			path,
			bytes,
			sha256
		};
	}
	/** Store the manifest; returns its package digest. */
	async writeManifest(manifest) {
		const text = serializeManifest(parseManifest(serializeManifest(manifest)));
		const bytes = encoder$2.encode(text);
		await this.stage.putVerified(MANIFEST_PATH, bytes, bytes.byteLength, await sha256Hex$1(bytes));
		return packageDigest(manifest);
	}
};
var StagedPackageReader = class {
	#manifest;
	/**
	* With `digests`, every record chunk read is checked against the size and
	* digest it was verified with, and a chunk that is not verified is missing.
	*/
	constructor(stage, digests) {
		this.stage = stage;
		this.digests = digests;
	}
	/** The parsed, validated manifest (read once). */
	async manifest() {
		if (!this.#manifest) this.#manifest = parseManifest(await this.stage.readBytes(MANIFEST_PATH, TRANSFER_LIMITS.manifestBytes));
		return this.#manifest;
	}
	async digest() {
		return packageDigest(await this.manifest());
	}
	/** Entries of one index chunk, verified against the digest the manifest pins. */
	async indexChunk(seq) {
		const ref = (await this.manifest()).index[seq];
		if (!ref) throw new TransferError("TRANSFER_FILE_MISSING", "Index chunk is not declared", { detail: { seq } });
		const entries = splitChunkLines(await this.readVerified(ref.path, ref), ref.path).map((line) => parseIndexLine(line));
		if (entries.length !== ref.entries) throw new TransferError("TRANSFER_MANIFEST_INVALID", "Index chunk entry count mismatch", { detail: { path: ref.path } });
		return entries;
	}
	/** Every index entry in path order, starting at index chunk `fromSeq`. */
	async *index(fromSeq = 0) {
		const manifest = await this.manifest();
		for (let seq = fromSeq; seq < manifest.index.length; seq++) for (const entry of await this.indexChunk(seq)) yield {
			seq,
			entry
		};
	}
	/**
	* Records of one chunk, each strictly validated. Pass `expected` (from the
	* index) to also verify the chunk's size and digest; otherwise the reader's
	* `digests`, when it has them, supply it.
	*/
	async readChunk(kind, seq, expected) {
		const path = recordChunkPath(kind, seq);
		const file = expected ?? await this.expectedFile(path);
		return splitChunkLines(file ? await this.readVerified(path, file) : await this.stage.readBytes(path, TRANSFER_LIMITS.chunkBytes), path).map((line, index) => {
			const decoded = decodeRecordLine$1(kind, line, {
				path,
				line: index + 1
			});
			return {
				record: decoded.record,
				line: decoded.line,
				seq,
				index
			};
		});
	}
	/** Records of `kind` in stream order, starting at chunk `fromSeq`. */
	async *records(kind, fromSeq = 0) {
		const chunks = (await this.manifest()).records[kind]?.chunks ?? 0;
		for (let seq = fromSeq; seq < chunks; seq++) yield* await this.readChunk(kind, seq);
	}
	async blob(sha256) {
		return (await this.stage.open(mediaBlobPath(sha256))).body;
	}
	async expectedFile(path) {
		if (!this.digests) return void 0;
		const expected = await this.digests(path);
		if (!expected) throw new TransferError("TRANSFER_FILE_MISSING", "Staged file is not verified", { detail: { path } });
		return expected;
	}
	async readVerified(path, expected) {
		const file = await this.stage.open(path);
		let bytes;
		try {
			bytes = await readStreamBytes(file.body, Math.max(expected.bytes, 0));
		} catch (error) {
			if (error instanceof TransferError && error.code === "TRANSFER_LIMIT_EXCEEDED") throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Staged file size does not match", { detail: { path } });
			throw error;
		}
		if (bytes.byteLength !== expected.bytes) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Staged file size does not match", { detail: { path } });
		if (await sha256Hex$1(bytes) !== expected.sha256) throw new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "Staged file digest does not match", { detail: { path } });
		return bytes;
	}
};
/**
* Is the target's portable domain empty enough to import into?
*
* Setup always applies a seed (the project's seed file or the built-in
* default), so a brand-new site is never row-empty. The domain counts as
* empty when it holds no content and no user-made schema: no term
* assignments, relations, content references, bylines or byline fields,
* media or media folders, revisions, SEO rows, comments or reactions,
* redirects, or user sections, and only seeded collections and block types,
* no collection with a row in its content table (trash included). Everything
* else a seed leaves is scaffold:
* - the seeded collections;
* - the seeded block types (`source = 'seed'`) and their versions;
* - taxonomy definitions attached only to those collections or to
*   collections that do not exist, and their unassigned terms;
* - menus and their items, widget areas and their widgets;
* - sections with `source = 'theme'` (seeded theme sections).
*
* The importer's `clear_scaffold` stage deletes exactly the reported
* `seededScaffold` items, in order: terms before their definitions, menu
* items before menus, widgets before widget areas, and block types after the
* collections whose fields name them.
*/
/** Tables that must hold no rows at all (sections are checked separately). */
var MUST_BE_EMPTY = [
	"content_taxonomies",
	"_emdash_relations",
	"_emdash_content_references",
	"_emdash_bylines",
	"_emdash_byline_fields",
	"_emdash_byline_field_values",
	"_emdash_byline_field_group_values",
	"_emdash_content_bylines",
	"media",
	"media_folders",
	"revisions",
	"_emdash_seo",
	"_emdash_comments",
	"_emdash_comment_reactions",
	"_emdash_redirects"
];
function isSeededSource(source) {
	return source === "seed" || (source?.startsWith("template:") ?? false);
}
function parseCollections(value) {
	if (value === null) return [];
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return null;
		return parsed.every((item) => typeof item === "string") ? parsed : null;
	} catch {
		return null;
	}
}
async function inspectPortableDomain(db) {
	const blockers = [];
	const seededScaffold = [];
	const probes = MUST_BE_EMPTY.map((table, index) => sql`(SELECT 1 FROM ${sql.ref(table)} LIMIT 1) AS ${sql.ref(`t${index}`)}`);
	probes.push(sql`(SELECT 1 FROM _emdash_sections WHERE source <> 'theme' LIMIT 1) AS ${sql.ref("user_sections")}`);
	const flags = (await sql`SELECT ${sql.join(probes)}`.execute(db)).rows[0] ?? {};
	MUST_BE_EMPTY.forEach((table, index) => {
		if (flags[`t${index}`] != null) blockers.push({
			code: "table_not_empty",
			table
		});
	});
	if (flags.user_sections != null) blockers.push({
		code: "table_not_empty",
		table: "_emdash_sections"
	});
	const collections = await db.selectFrom("_emdash_collections").select([
		"id",
		"slug",
		"source"
	]).orderBy("slug").execute();
	const seeded = collections.filter((collection) => isSeededSource(collection.source));
	for (const collection of collections) if (!isSeededSource(collection.source)) blockers.push({
		code: "collection_not_seeded",
		id: collection.id,
		slug: collection.slug
	});
	if (seeded.length > 0) {
		const contentProbes = seeded.map((collection, index) => {
			validateIdentifier(collection.slug, "collection slug");
			return sql`(SELECT 1 FROM ${sql.ref(`ec_${collection.slug}`)} LIMIT 1) AS ${sql.ref(`c${index}`)}`;
		});
		const contentFlags = (await sql`SELECT ${sql.join(contentProbes)}`.execute(db)).rows[0] ?? {};
		seeded.forEach((collection, index) => {
			if (contentFlags[`c${index}`] != null) blockers.push({
				code: "collection_has_entries",
				id: collection.id,
				slug: collection.slug
			});
			else seededScaffold.push({
				type: "collection",
				id: collection.id,
				slug: collection.slug
			});
		});
	}
	const scaffoldSlugs = new Set(seededScaffold.flatMap((item) => item.type === "collection" ? [item.slug] : []));
	const existingSlugs = new Set(collections.map((collection) => collection.slug));
	const taxonomyDefs = await db.selectFrom("_emdash_taxonomy_defs").select([
		"id",
		"name",
		"locale",
		"collections"
	]).orderBy("id").execute();
	const scaffoldDefs = [];
	for (const def of taxonomyDefs) if (parseCollections(def.collections)?.every((slug) => scaffoldSlugs.has(slug) || !existingSlugs.has(slug))) scaffoldDefs.push({
		type: "taxonomy_def",
		id: def.id,
		name: def.name,
		locale: def.locale
	});
	else blockers.push({
		code: "taxonomy_def_not_scaffold",
		id: def.id,
		name: def.name
	});
	const blockTypes = await db.selectFrom("_emdash_block_types").select([
		"id",
		"slug",
		"source"
	]).orderBy("slug").execute();
	for (const blockType of blockTypes) if (blockType.source !== "seed") blockers.push({
		code: "block_type_not_seeded",
		id: blockType.id,
		slug: blockType.slug
	});
	if (blockers.length > 0) return {
		empty: false,
		seededScaffold,
		blockers
	};
	const terms = await db.selectFrom("taxonomies").select([
		"id",
		"name",
		"slug",
		"locale"
	]).orderBy("id").execute();
	for (const term of terms) seededScaffold.push({
		type: "term",
		id: term.id,
		name: term.name,
		slug: term.slug,
		locale: term.locale
	});
	seededScaffold.push(...scaffoldDefs);
	const menuItems = await db.selectFrom("_emdash_menu_items").select([
		"id",
		"menu_id",
		"label"
	]).orderBy("id").execute();
	for (const item of menuItems) seededScaffold.push({
		type: "menu_item",
		id: item.id,
		menuId: item.menu_id,
		label: item.label
	});
	const menus = await db.selectFrom("_emdash_menus").select([
		"id",
		"name",
		"locale"
	]).orderBy("id").execute();
	for (const menu of menus) seededScaffold.push({
		type: "menu",
		id: menu.id,
		name: menu.name,
		locale: menu.locale
	});
	const widgets = await db.selectFrom("_emdash_widgets").select([
		"id",
		"area_id",
		"type"
	]).orderBy("id").execute();
	for (const widget of widgets) seededScaffold.push({
		type: "widget",
		id: widget.id,
		areaId: widget.area_id,
		widgetType: widget.type
	});
	const areas = await db.selectFrom("_emdash_widget_areas").select(["id", "name"]).orderBy("id").execute();
	for (const area of areas) seededScaffold.push({
		type: "widget_area",
		id: area.id,
		name: area.name
	});
	const sections = await db.selectFrom("_emdash_sections").select(["id", "slug"]).where("source", "=", "theme").orderBy("id").execute();
	for (const section of sections) seededScaffold.push({
		type: "section",
		id: section.id,
		slug: section.slug
	});
	for (const blockType of blockTypes) seededScaffold.push({
		type: "block_type",
		id: blockType.id,
		slug: blockType.slug
	});
	return {
		empty: true,
		seededScaffold,
		blockers
	};
}
/**
* Reading staged record chunks for analysis, turning every failure into a
* blocker whose message and detail never include package content: only the
* error code of a read failure is used, with a fixed message.
*/
var encoder$1 = new TextEncoder();
var ERROR_BLOCKERS = {
	TRANSFER_LIMIT_EXCEEDED: {
		code: "limit_exceeded",
		message: "Package file exceeds a limit"
	},
	TRANSFER_FILE_MISSING: {
		code: "file_missing",
		message: "Package file is missing"
	},
	TRANSFER_FILE_SIZE_MISMATCH: {
		code: "file_mismatch",
		message: "Package file size does not match its declaration"
	},
	TRANSFER_FILE_DIGEST_MISMATCH: {
		code: "file_mismatch",
		message: "Package file digest does not match its declaration"
	},
	TRANSFER_UNSUPPORTED_FORMAT: {
		code: "unsupported_format",
		message: "Unsupported package format or version"
	},
	TRANSFER_UNSUPPORTED_FEATURE: {
		code: "unsupported_feature",
		message: "Package requires features this site does not support"
	},
	TRANSFER_RECORD_INVALID: {
		code: "record_invalid",
		message: "Package file is malformed"
	},
	TRANSFER_PATH_INVALID: {
		code: "package_invalid",
		message: "Package path is invalid"
	}
};
/**
* A blocker for a {@link TransferError} raised while reading package files.
* Only the error code is used; the location comes from the caller.
*/
function blockerForError(error, location = {}) {
	const mapped = ERROR_BLOCKERS[error.code] ?? {
		code: "package_invalid",
		message: "Package file failed validation"
	};
	const detail = {};
	if (location.path !== void 0) detail.path = location.path;
	if (location.line !== void 0) detail.line = location.line;
	return {
		code: mapped.code,
		message: mapped.message,
		detail
	};
}
/** Read one staged chunk, verifying size and digest, and split it into lines. */
async function readVerifiedChunk(stage, path, expected) {
	const file = await stage.open(path);
	let bytes;
	try {
		bytes = await readStreamBytes(file.body, expected.bytes);
	} catch (error) {
		if (error instanceof TransferError && error.code === "TRANSFER_LIMIT_EXCEEDED") throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Staged file size does not match");
		throw error;
	}
	if (bytes.byteLength !== expected.bytes) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Staged file size does not match");
	if (await sha256Hex$1(bytes) !== expected.sha256) throw new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "Staged file digest does not match");
	return splitChunkLines(bytes, path);
}
/**
* Decode and strictly validate one record line. A failure names the chunk,
* the one-based line, and at most a known top-level property of the kind.
*/
function decodeRecordLine(kind, line, location) {
	const detail = {
		path: location.path,
		line: location.line
	};
	if (encoder$1.encode(line).byteLength > TRANSFER_LIMITS.recordLineBytes) return {
		ok: false,
		blocker: {
			code: "limit_exceeded",
			message: "Record exceeds the line size limit",
			kind,
			detail
		}
	};
	let raw;
	try {
		raw = parseCanonicalJson(line);
	} catch {
		return {
			ok: false,
			blocker: {
				code: "record_invalid",
				message: "Record is not canonical JSON",
				kind,
				detail
			}
		};
	}
	const result = validateRecord(kind, raw);
	if (!result.success) {
		const field = result.issues[0]?.path || void 0;
		return {
			ok: false,
			blocker: {
				code: "record_invalid",
				message: "Record failed schema validation",
				kind,
				detail: field === void 0 ? detail : {
					...detail,
					field
				}
			}
		};
	}
	return {
		ok: true,
		record: result.record
	};
}
/**
* Values the site's own write paths refuse. The importer writes rows
* directly, so analysis applies the same validators the admin API does and
* blocks a package holding a value that API would reject.
*/
function rejected(property, message) {
	return {
		code: "value_constraint_violation",
		message,
		property
	};
}
var REDIRECT_BODY_MESSAGES = {
	source: "Redirect source is not a path on this site",
	destination: "Redirect destination is not a path on this site",
	type: "Redirect type is not supported"
};
function redirectIssues(record) {
	const issues = [];
	const body = createRedirectBody.safeParse({
		source: record.source,
		destination: record.destination,
		type: record.type
	});
	if (!body.success) {
		const properties = new Set(body.error.issues.map((issue) => String(issue.path[0])));
		for (const [property, message] of Object.entries(REDIRECT_BODY_MESSAGES)) if (properties.has(property)) issues.push(rejected(property, message));
	}
	if (!isTerminalStatus(record.type) && !isSiteRelativeDestination(record.destination) && !issues.some((issue) => issue.property === "destination")) issues.push(rejected("destination", REDIRECT_BODY_MESSAGES.destination));
	const pattern = isPattern(record.source);
	if (record.isPattern !== pattern) issues.push(rejected("isPattern", "Redirect pattern flag does not match its source"));
	if (pattern) {
		if (validatePattern(record.source) !== null) issues.push(rejected("source", "Redirect source is not a valid pattern"));
		else if (!isTerminalStatus(record.type) && validateDestinationParams(record.source, record.destination) !== null) issues.push(rejected("destination", "Redirect destination uses a parameter its source does not capture"));
	}
	return issues;
}
/** Whether the redirect API would accept this redirect; only these may be compiled. */
function isImportableRedirect(record) {
	return redirectIssues(record).length === 0;
}
var BYLINE_FIELD_VALUE_MESSAGES = {
	string: "Byline field value is not a string",
	text: "Byline field value is not a string",
	url: "Byline field value is not an http or https URL",
	boolean: "Byline field value is not a boolean",
	select: "Byline field value is not one of the field's choices"
};
function bylineFieldValueIssues(field, value) {
	if (!field) return [];
	try {
		coerceFieldValue({
			slug: "",
			type: field.type,
			validation: { options: field.options }
		}, value ?? null);
		return [];
	} catch (error) {
		if (error instanceof EmDashValidationError) return [rejected("value", BYLINE_FIELD_VALUE_MESSAGES[field.type])];
		throw error;
	}
}
function acceptsUrlPattern(pattern) {
	try {
		compileUrlPattern(pattern);
		return true;
	} catch {
		return false;
	}
}
var URL_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*:/;
/**
* The SEO API takes only http(s) canonical URLs, but stored canonicals may
* also be site paths, which the renderer resolves against the site URL.
*/
function acceptsCanonical(canonical) {
	if (URL_SCHEME.test(canonical) || canonical.startsWith("//")) return httpUrl.safeParse(canonical).success;
	return true;
}
var RESERVED_BLOCK_TYPE_SLUGS = new Set(RESERVED_FIELD_SLUGS);
var MAX_BLOCK_TYPE_LABEL = 200;
function blockTypeIssues(record) {
	const issues = [];
	if (RESERVED_BLOCK_TYPE_SLUGS.has(record.slug)) issues.push(rejected("slug", "Block type slug is reserved"));
	if (record.label.trim().length === 0 || record.label.length > MAX_BLOCK_TYPE_LABEL) issues.push(rejected("label", "Block type label is empty or too long"));
	if (record.source !== "user" && record.source !== "seed") issues.push(rejected("source", "Block type source is not supported"));
	return issues;
}
function blockTypeVersionIssues(record) {
	const issues = [];
	if (record.version < 1) issues.push(rejected("version", "Block type version is not positive"));
	try {
		validateBlockFields(record.fields);
	} catch (error) {
		if (!(error instanceof SchemaError)) throw error;
		issues.push(rejected("fields", "Block type fields are not valid on this site"));
	}
	return issues;
}
function writeRuleIssues(record, facts) {
	switch (record.kind) {
		case "block_type": return blockTypeIssues(record);
		case "block_type_version": return blockTypeVersionIssues(record);
		case "redirect": return redirectIssues(record);
		case "collection": return record.urlPattern !== void 0 && !acceptsUrlPattern(record.urlPattern) ? [rejected("urlPattern", "Collection URL pattern is invalid")] : [];
		case "byline": return record.websiteUrl !== void 0 && !httpUrl.safeParse(record.websiteUrl).success ? [rejected("websiteUrl", "Byline website is not an http or https URL")] : [];
		case "byline_field_value":
		case "byline_field_group_value": return bylineFieldValueIssues(facts.bylineFields.get(record.fieldId), record.value);
		case "seo": return record.seoCanonical !== void 0 && !acceptsCanonical(record.seoCanonical) ? [rejected("seoCanonical", "Canonical URL is not an http or https URL or a site path")] : [];
		case "menu_item": return record.customUrl !== void 0 && !safeHref.safeParse(record.customUrl).success ? [rejected("customUrl", "Menu item URL uses a scheme menus do not allow")] : [];
		default: return [];
	}
}
/**
* Target context from the site's configuration. A site without i18n config
* serves only the default locale `en`.
*/
function analysisTargetContext(config) {
	return {
		locales: config.i18n ? [...config.i18n.locales] : ["en"],
		maxUploadSize: config.maxUploadSize ?? TRANSFER_LIMITS.defaultMaxBlobBytes,
		emdashVersion: config.emdashVersion ?? "1.4.0"
	};
}
var DOMAIN_BLOCKER_MESSAGES = {
	table_not_empty: "The site already has content of this kind",
	collection_not_seeded: "The site has a collection that was not created by setup",
	collection_has_entries: "A collection on the site already has entries",
	taxonomy_def_not_scaffold: "The site has a taxonomy that was not created by setup",
	block_type_not_seeded: "The site has a block type that was not created by setup"
};
function domainBlocker(blocker) {
	const detail = { reason: blocker.code };
	if (blocker.code === "table_not_empty") detail.table = blocker.table;
	else if (blocker.code === "taxonomy_def_not_scaffold") detail.taxonomy = blocker.name;
	else if (blocker.code === "block_type_not_seeded") detail.blockType = blocker.slug;
	else detail.collection = blocker.slug;
	return {
		code: "target_not_empty",
		message: DOMAIN_BLOCKER_MESSAGES[blocker.code],
		detail
	};
}
/**
* Domain blockers and scaffold, plus a blocker for each `ec_*` table named
* for a package collection that has no collection row: the importer would
* reuse it as the collection's table.
*/
async function inspectTargetDomain(db, collectionSlugs) {
	const inspection = await inspectPortableDomain(db);
	const blockers = inspection.blockers.map(domainBlocker);
	const packaged = new Set(collectionSlugs);
	if (packaged.size > 0) for (const orphan of await new SchemaRegistry(db).discoverOrphanedTables()) {
		if (!packaged.has(orphan.slug)) continue;
		blockers.push({
			code: "target_not_empty",
			message: "The site has a leftover content table for a collection in the package",
			detail: {
				reason: "orphaned_table",
				table: orphan.tableName
			}
		});
	}
	return {
		blockers,
		scaffold: inspection.seededScaffold
	};
}
/** The target's spelling of `locale`: an exact match, else a case-insensitive one. */
function configuredLocale(locale, target) {
	if (target.locales.includes(locale)) return locale;
	const folded = locale.toLowerCase();
	return target.locales.find((candidate) => candidate.toLowerCase() === folded);
}
/**
* A blocker for each package locale the target is not configured for
* (case-insensitive), and for each that shares the target's spelling with
* another package locale, since their rows would collide once recased.
*/
function checkLocales(manifest, target) {
	const blockers = [];
	const claimed = new Set(manifest.locales.used.filter((locale) => target.locales.includes(locale)));
	for (const locale of manifest.locales.used) {
		if (target.locales.includes(locale)) continue;
		const configured = configuredLocale(locale, target);
		if (configured !== void 0 && !claimed.has(configured)) {
			claimed.add(configured);
			continue;
		}
		blockers.push({
			code: "locale_not_configured",
			message: configured === void 0 ? "The package uses a locale this site is not configured for" : "The package uses locales that differ only in case",
			...isValidLocaleCode(locale) ? { detail: { locale } } : {}
		});
	}
	return blockers;
}
/** Package locales the target configures with different casing, and the target's spelling. */
function localeRecasing(manifest, target) {
	return manifest.locales.used.flatMap((locale) => {
		const configured = configuredLocale(locale, target);
		return configured === void 0 || configured === locale ? [] : [{
			from: locale,
			to: configured
		}];
	});
}
/** Redirect packages above this size are not checked for loops. */
var MAX_LOOP_CHECKED_REDIRECTS = 1e4;
/**
* Ids of package redirects that take part in a loop, using the same detection
* the redirect admin uses. Reads every redirect chunk; unreadable chunks and
* redirects the redirect API would refuse were already reported by
* validation and are skipped, so no unvalidated pattern is compiled.
*/
async function findRedirectLoops(manifest, stage, stagedFiles, operationId) {
	const summary = manifest.records.redirect;
	if (!summary || summary.count > MAX_LOOP_CHECKED_REDIRECTS) return [];
	const edges = [];
	for (let seq = 0; seq < summary.chunks; seq++) {
		const path = recordChunkPath("redirect", seq);
		const file = await stagedFiles.get(operationId, path);
		if (!file || file.state !== "verified") continue;
		let lines;
		try {
			lines = await readVerifiedChunk(stage, path, file);
		} catch (error) {
			if (isTransferError(error)) continue;
			throw error;
		}
		lines.forEach((line, index) => {
			const decoded = decodeRecordLine("redirect", line, {
				path,
				line: index + 1
			});
			if (!decoded.ok || !isImportableRedirect(decoded.record)) return;
			const { record } = decoded;
			edges.push({
				id: record.id,
				source: record.source,
				destination: record.destination,
				enabled: record.enabled,
				isPattern: record.isPattern
			});
		});
	}
	return detectLoops(edges).toSorted(compareIds);
}
/** Target users read per query while matching principal emails. */
var USER_PAGE_SIZE = 500;
/**
* Email case folding for principal matching. SQL `lower()` folds only ASCII
* on SQLite, so folding happens here, identically on every dialect.
*/
function foldEmail(email) {
	return email.normalize("NFC").toLowerCase();
}
/**
* Target users whose email matches a principal's, case-insensitively. A
* principal gets a suggestion only when exactly one user matches. Reads the
* users table in id-ordered pages of {@link USER_PAGE_SIZE}.
*/
async function suggestPrincipalUsers(db, principals) {
	const wanted = new Set(principals.flatMap((principal) => principal.email ? [foldEmail(principal.email)] : []));
	const usersByEmail = /* @__PURE__ */ new Map();
	if (wanted.size > 0) {
		let after = null;
		for (;;) {
			let query = db.selectFrom("users").select(["id", "email"]).orderBy("id").limit(USER_PAGE_SIZE);
			if (after !== null) query = query.where("id", ">", after);
			const rows = await query.execute();
			for (const row of rows) {
				const folded = foldEmail(row.email);
				if (!wanted.has(folded)) continue;
				const list = usersByEmail.get(folded) ?? [];
				list.push(row.id);
				usersByEmail.set(folded, list);
			}
			const last = rows.at(-1);
			if (rows.length < USER_PAGE_SIZE || !last) break;
			after = last.id;
		}
	}
	const suggestions = /* @__PURE__ */ new Map();
	for (const principal of principals) {
		if (!principal.email) continue;
		const matches = usersByEmail.get(foldEmail(principal.email)) ?? [];
		const [only] = matches;
		if (matches.length === 1 && only !== void 0) suggestions.set(principal.id, only);
	}
	return suggestions;
}
/** Ids among `userIds` that are not target users. */
async function findMissingUsers(db, userIds) {
	const unique = [...new Set(userIds)];
	const found = /* @__PURE__ */ new Set();
	for (const batch of chunks(unique, 50)) {
		const rows = await db.selectFrom("users").select("id").where("id", "in", batch).execute();
		for (const row of rows) found.add(row.id);
	}
	return unique.filter((id) => !found.has(id)).toSorted(compareIds);
}
var MAX_LISTED_IDS = 1e4;
var MAX_PROVIDER_WARNINGS = 100;
/** Stages an import always runs besides its record chunks and media steps. */
var FIXED_IMPORT_STEPS = 10;
var DECISION_BLOCKER_CODES = /* @__PURE__ */ new Set(["principal_conflict"]);
var DECISION_TRANSFORMATION_CODES = /* @__PURE__ */ new Set(["principal_mapped", "principal_unmapped"]);
var TRANSFORMATION_ORDER = [...EXPORT_TRANSFORMATION_CODES, ...IMPORT_TRANSFORMATION_CODES];
/** Export transformations first, then import transformations; each in vocabulary order. */
function sortTransformations(transformations) {
	return transformations.toSorted((a, b) => TRANSFORMATION_ORDER.indexOf(a.code) - TRANSFORMATION_ORDER.indexOf(b.code));
}
function externalProviderWarnings(summary) {
	return [...summary.externalProviders].slice(0, MAX_PROVIDER_WARNINGS).map(([provider, uses]) => ({
		code: "media_provider_external",
		message: "Content uses media from an external provider, which is not copied",
		count: uses,
		detail: { provider }
	}));
}
function uncheckedRedirectWarnings(manifest) {
	const count = manifest.records.redirect?.count ?? 0;
	if (count <= MAX_LOOP_CHECKED_REDIRECTS) return [];
	return [{
		code: "redirect_loops_unchecked",
		message: "The package has too many redirects to check for loops before importing; a redirect that would close a loop is imported disabled",
		kind: "redirect",
		count
	}];
}
function estimateSteps(manifest) {
	let chunks = 0;
	for (const summary of Object.values(manifest.records)) chunks += summary?.chunks ?? 0;
	return FIXED_IMPORT_STEPS + chunks + Math.ceil(manifest.media.totalBytes / TRANSFER_LIMITS.stepBytes);
}
function defaultDecisions(principals) {
	return {
		principalMappings: Object.fromEntries(principals.map((principal) => [principal.id, principal.suggestedUserId ?? null])),
		siteTitle: "package",
		siteTagline: "package"
	};
}
function settingSummary(packageValue, targetValue) {
	return {
		...packageValue === void 0 ? {} : { package: packageValue },
		...targetValue === void 0 ? {} : { target: targetValue.slice(0, 4096) }
	};
}
/** Build the plan with default decisions applied. */
function buildPlan(inputs, bylines) {
	const { manifest, summary } = inputs;
	const principals = summary.principals.map((principal) => {
		const suggestedUserId = inputs.suggestions.get(principal.id);
		return {
			id: principal.id,
			displayName: principal.displayName,
			...principal.email === void 0 ? {} : { email: principal.email },
			references: summary.principalReferences.get(principal.id) ?? 0,
			...suggestedUserId === void 0 ? {} : { suggestedUserId }
		};
	});
	const transformations = [...manifest.transformations];
	if (inputs.scaffold.length > 0) transformations.push({
		code: "seeded_scaffold_removed",
		count: inputs.scaffold.length,
		items: inputs.scaffold.slice(0, MAX_LISTED_IDS).map((item) => ({
			type: item.type,
			id: item.id
		}))
	});
	if (inputs.redirectLoops.length > 0) transformations.push({
		code: "redirect_loop_disabled",
		kind: "redirect",
		ids: inputs.redirectLoops.slice(0, MAX_LISTED_IDS)
	});
	if (inputs.localeRecasing.length > 0) transformations.push({
		code: "locale_recased",
		locales: [...inputs.localeRecasing]
	});
	if (inputs.target.dialect === "postgres") {
		if (summary.searchEnabledCollections.length > 0) transformations.push({
			code: "search_unsupported",
			kind: "collection",
			ids: summary.searchEnabledCollections.slice(0, MAX_LISTED_IDS)
		});
		if (summary.float4Rounded > 0) transformations.push({
			code: "float4_rounded",
			count: summary.float4Rounded
		});
	}
	const plan = {
		formatVersion: "1",
		packageDigest: inputs.packageDigest,
		origin: {
			siteId: manifest.originSiteId,
			packageId: manifest.packageId,
			createdAt: manifest.createdAt,
			createdByEmDashVersion: manifest.createdByEmDashVersion
		},
		target: inputs.target,
		counts: Object.fromEntries(Object.entries(manifest.records).map(([kind, record]) => [kind, record.count])),
		bytes: {
			records: summary.recordBytes,
			media: manifest.media.totalBytes
		},
		principals,
		settings: {
			title: settingSummary(summary.settings.title, inputs.targetSettings.title),
			tagline: settingSummary(summary.settings.tagline, inputs.targetSettings.tagline)
		},
		decisions: defaultDecisions(principals),
		transformations,
		warnings: [
			...inputs.validationWarnings,
			...externalProviderWarnings(summary),
			...uncheckedRedirectWarnings(manifest)
		],
		blockers: [...inputs.validationBlockers, ...inputs.targetBlockers],
		estimatedSteps: estimateSteps(manifest)
	};
	return applyDecisions(plan, plan.decisions, bylines);
}
/**
* A plan for a package whose manifest could not be read: identity and
* blockers only.
*/
function buildBlockedPlan(input) {
	return siteImportPlanSchema.parse({
		formatVersion: "1",
		packageDigest: input.packageDigest,
		origin: input.origin,
		target: input.target,
		counts: {},
		bytes: {
			records: 0,
			media: 0
		},
		principals: [],
		settings: {
			title: {},
			tagline: {}
		},
		decisions: defaultDecisions([]),
		transformations: [],
		warnings: [...input.warnings],
		blockers: [...input.blockers],
		estimatedSteps: 0
	});
}
/**
* The plan with `decisions` in place and every decision-dependent
* transformation and blocker recomputed.
*/
function applyDecisions(plan, decisions, bylines) {
	let mappedReferences = 0;
	let unmappedReferences = 0;
	const principalsByUser = /* @__PURE__ */ new Map();
	const conflicts = [];
	for (const principal of plan.principals) {
		const userId = Object.hasOwn(decisions.principalMappings, principal.id) ? decisions.principalMappings[principal.id] : null;
		if (userId === null || userId === void 0) {
			unmappedReferences += principal.references;
			continue;
		}
		mappedReferences += principal.references;
		if (bylines.sharedLocale.has(principal.id)) conflicts.push({
			code: "principal_conflict",
			message: "A principal with several bylines in one locale is mapped to a user",
			kind: "principal",
			id: principal.id,
			detail: { user: userId }
		});
		const list = principalsByUser.get(userId) ?? [];
		list.push(principal.id);
		principalsByUser.set(userId, list);
	}
	for (const [userId, principalIds] of principalsByUser) for (let i = 0; i < principalIds.length; i++) for (let j = i + 1; j < principalIds.length; j++) {
		const first = principalIds[i];
		const second = principalIds[j];
		if (first === void 0 || second === void 0) continue;
		const firstLocales = bylines.locales.get(first);
		const secondLocales = bylines.locales.get(second);
		if (!firstLocales || !secondLocales) continue;
		if (![...firstLocales].some((locale) => secondLocales.has(locale))) continue;
		conflicts.push({
			code: "principal_conflict",
			message: "Two principals with bylines in the same locale are mapped to one user",
			kind: "principal",
			id: second,
			detail: {
				principal: first,
				user: userId
			}
		});
	}
	const transformations = plan.transformations.filter((transformation) => !DECISION_TRANSFORMATION_CODES.has(transformation.code));
	if (mappedReferences > 0) transformations.push({
		code: "principal_mapped",
		count: mappedReferences
	});
	if (unmappedReferences > 0) transformations.push({
		code: "principal_unmapped",
		count: unmappedReferences
	});
	return siteImportPlanSchema.parse({
		...plan,
		decisions,
		transformations: sortTransformations(transformations),
		blockers: [...plan.blockers.filter((blocker) => !DECISION_BLOCKER_CODES.has(blocker.code)), ...conflicts]
	});
}
/**
* Per-operation index of package records, filled while analysis parses the
* record streams, so cross-reference checks run as bounded SQL lookups
* instead of holding the package in memory.
*
* Conventions for what analysis stores:
* - `group_id`: the record's `translationGroup`, or its `id` when it has none
*   (what `by: "group"` references resolve against);
* - `name_key`: the collection, block type or relation `slug`, the menu `name`, or the
*   block type version's `blockTypeVersionKey` (what `by: "slug"` and
*   `by: "name"` references resolve against);
* - `parent_id` and `depth` for topological kinds.
*/
var KEY_COLUMN = {
	id: "id",
	group: "group_id",
	slug: "name_key",
	name: "name_key"
};
var TransferPackageIndexRepository = class {
	constructor(db, operationId) {
		this.db = db;
		this.operationId = operationId;
	}
	/** Insert entries; an entry already present (a retried batch) is left as is. */
	async insertMany(entries) {
		for (const batch of chunks([...entries], rowsPerInsert(7))) await this.db.insertInto("_emdash_transfer_package_index").values(batch.map((entry) => ({
			operation_id: this.operationId,
			kind: entry.kind,
			id: entry.id,
			group_id: entry.groupId ?? null,
			parent_id: entry.parentId ?? null,
			name_key: entry.nameKey ?? null,
			depth: entry.depth ?? 0
		}))).onConflict((conflict) => conflict.columns([
			"operation_id",
			"kind",
			"id"
		]).doNothing()).execute();
	}
	async get(kind, id) {
		const row = await this.db.selectFrom("_emdash_transfer_package_index").selectAll().where("operation_id", "=", this.operationId).where("kind", "=", kind).where("id", "=", id).executeTakeFirst();
		if (!row || !isRecordKind(row.kind)) return null;
		return {
			kind: row.kind,
			id: row.id,
			groupId: row.group_id,
			parentId: row.parent_id,
			nameKey: row.name_key,
			depth: Number(row.depth)
		};
	}
	/**
	* Values from `values` that no indexed record of any of `kinds` matches on
	* `key` (sorted, unique).
	*/
	async findMissing(kinds, key, values) {
		const column = KEY_COLUMN[key];
		const unique = [...new Set(values)];
		const found = /* @__PURE__ */ new Set();
		for (const batch of chunks(unique, 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_package_index").select(sql`${sql.ref(column)}`.as("value")).where("operation_id", "=", this.operationId).where("kind", "in", [...kinds]).where(sql.ref(column), "in", batch).execute();
			for (const row of rows) found.add(row.value);
		}
		return unique.filter((value) => !found.has(value)).toSorted(compareIds);
	}
	/** Depth of each indexed record of `kind` among `ids`. */
	async depths(kind, ids) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(ids)], 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_package_index").select(["id", "depth"]).where("operation_id", "=", this.operationId).where("kind", "=", kind).where("id", "in", batch).execute();
			for (const row of rows) result.set(row.id, Number(row.depth));
		}
		return result;
	}
	async count(kind) {
		let query = this.db.selectFrom("_emdash_transfer_package_index").select((eb) => eb.fn.countAll().as("count")).where("operation_id", "=", this.operationId);
		if (kind) query = query.where("kind", "=", kind);
		const row = await query.executeTakeFirstOrThrow();
		return Number(row.count);
	}
	/** Delete up to `limit` entries; returns how many were deleted. */
	async deleteSome(limit = 500) {
		const rows = await this.db.selectFrom("_emdash_transfer_package_index").select(["kind", "id"]).where("operation_id", "=", this.operationId).limit(limit).execute();
		let deleted = 0;
		const byKind = /* @__PURE__ */ new Map();
		for (const row of rows) byKind.set(row.kind, [...byKind.get(row.kind) ?? [], row.id]);
		for (const [kind, ids] of byKind) for (const batch of chunks(ids, 50)) {
			const result = await this.db.deleteFrom("_emdash_transfer_package_index").where("operation_id", "=", this.operationId).where("kind", "=", kind).where("id", "in", batch).executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0n);
		}
		return deleted;
	}
};
/**
* Bounded blocker and warning lists for analysis.
*
* Issue messages are fixed strings and details carry only locations (package
* paths, line numbers, property names, record kinds and ids) — never record
* values. Package content is untrusted and plans, errors, and logs are shown
* to people who did not necessarily write the package.
*/
var issueStateSchema = z.strictObject({
	blockers: z.array(planBlockerSchema),
	warnings: z.array(planWarningSchema),
	droppedBlockers: z.number().int().nonnegative(),
	droppedWarnings: z.number().int().nonnegative()
});
function emptyIssues() {
	return {
		blockers: [],
		warnings: [],
		droppedBlockers: 0,
		droppedWarnings: 0
	};
}
function addBlocker(issues, blocker) {
	if (issues.blockers.length < TRANSFER_LIMITS.planIssues) issues.blockers.push(blocker);
	else issues.droppedBlockers++;
}
function addWarning(issues, warning) {
	if (issues.warnings.length < TRANSFER_LIMITS.planIssues) issues.warnings.push(warning);
	else issues.droppedWarnings++;
}
/** The warnings plus an `issues_truncated` warning when either list overflowed. */
function finalWarnings(issues) {
	if (issues.droppedBlockers === 0 && issues.droppedWarnings === 0) return [...issues.warnings];
	return [...issues.warnings, {
		code: "issues_truncated",
		message: "More issues were found than the plan lists",
		count: issues.droppedBlockers + issues.droppedWarnings,
		detail: {
			blockers: issues.droppedBlockers,
			warnings: issues.droppedWarnings
		}
	}];
}
/** Key-row kind prefix; never a record kind, so record lookups ignore these rows. */
var KEY_KIND_PREFIX = "unique:";
function key(constraint, ...parts) {
	return {
		constraint,
		parts
	};
}
/**
* Postgres `lower()` folds the way JavaScript does for the locales EmDash
* accepts; SQLite's ASCII-only `lower()` agrees on ASCII locale codes.
*/
function lowerLocale(locale) {
	return locale.toLowerCase();
}
/** Keys a record occupies in the target's unique constraints. */
function uniqueKeysOf(record) {
	switch (record.kind) {
		case "block_type": return [key("block_type_slug", record.slug)];
		case "block_type_version": return [key("block_type_version", record.blockTypeId, String(record.version))];
		case "entry": {
			const keys = [];
			if (record.slug !== void 0) keys.push(key("entry_slug_locale", record.collection, record.slug, record.locale));
			if (record.deletedAt === void 0 && record.translationGroup !== void 0) keys.push(key("entry_active_group_locale", record.collection, record.translationGroup, lowerLocale(record.locale)));
			return keys;
		}
		case "term": {
			const keys = [key("term_name_slug_locale", record.name, record.slug, record.locale)];
			if (record.translationGroup !== void 0) keys.push(key("term_group_locale", record.translationGroup, record.locale));
			return keys;
		}
		case "taxonomy_def": return [key("taxonomy_def_name_locale", record.name, record.locale)];
		case "byline": {
			const keys = [key("byline_slug_locale", record.slug, record.locale)];
			if (record.translationGroup !== void 0) keys.push(key("byline_group_locale", record.translationGroup, record.locale));
			if (record.userPrincipal !== void 0) keys.push(key("byline_principal_locale", record.userPrincipal, record.locale));
			return keys;
		}
		case "byline_field": return [key("byline_field_slug", record.slug)];
		case "menu": return [key("menu_name_locale", record.name, record.locale)];
		case "relation": return [key("relation_slug", record.slug)];
		case "widget_area": return [key("widget_area_name", record.name)];
		case "section": return [key("section_slug", record.slug)];
		case "content_reference": return [key("content_reference_groups", record.relationId, record.parentGroup, record.childGroup)];
		case "content_byline": return [key("content_byline_entry_byline", record.collection, record.entryId, record.bylineGroup)];
		case "media_folder": return [key("media_folder_name_key", record.nameKey)];
		default: return [];
	}
}
/** Most key rows one records chunk can write (1000 records × at most 3 keys). */
var MAX_KEYS_PER_CHUNK = 3e3;
/** Upper bound on the queries {@link findUniqueCollisions} runs for one chunk. */
var UNIQUE_CHECK_QUERIES = Math.ceil(MAX_KEYS_PER_CHUNK / rowsPerInsert(4)) + Math.ceil(MAX_KEYS_PER_CHUNK / 50);
/**
* Record the keys of `records` and return every record whose key is already
* held by a different record of the package (earlier chunks included).
*/
async function findUniqueCollisions(db, operationId, records) {
	const rows = [];
	for (const record of records) for (const unique of record.keys) rows.push({
		kind: `${KEY_KIND_PREFIX}${unique.constraint}`,
		id: await sha256Hex$1(canonicalJson(unique.parts)),
		ownerId: record.ownerId,
		item: record.item,
		constraint: unique.constraint
	});
	if (rows.length === 0) return [];
	for (const batch of chunks(rows, rowsPerInsert(4))) await db.insertInto("_emdash_transfer_package_index").values(batch.map((row) => ({
		operation_id: operationId,
		kind: row.kind,
		id: row.id,
		group_id: row.ownerId
	}))).onConflict((conflict) => conflict.columns([
		"operation_id",
		"kind",
		"id"
	]).doNothing()).execute();
	const holders = /* @__PURE__ */ new Map();
	for (const batch of chunks([...new Set(rows.map((row) => row.id))], 50)) {
		const stored = await db.selectFrom("_emdash_transfer_package_index").select([
			"kind",
			"id",
			"group_id"
		]).where("operation_id", "=", operationId).where("kind", "like", `${KEY_KIND_PREFIX}%`).where("id", "in", batch).execute();
		for (const row of stored) if (row.group_id !== null) holders.set(`${row.kind}\u0000${row.id}`, row.group_id);
	}
	const collisions = [];
	for (const row of rows) {
		const holderId = holders.get(`${row.kind}\u0000${row.id}`);
		if (holderId !== void 0 && holderId !== row.ownerId) collisions.push({
			constraint: row.constraint,
			item: row.item,
			holderId
		});
	}
	return collisions;
}
/**
* Storage-key references inside records.
*
* Origin storage keys are deployment state and never appear in a package.
* The exporter replaces every reference to a local media object's storage key
* with the placeholder `emdash-media:<mediaId>`; the importer replaces each
* placeholder with the key it stored that media row's bytes under on the
* target; verification turns target keys back into placeholders.
*
* The walker is schema-agnostic. It visits every string of a record except
* the record's identity properties ({@link identityProperties}), including
* strings that hold JSON (image and file field values) which it parses,
* rewrites, and re-serializes with `JSON.stringify` only when something
* changed. It recognizes:
*
* - `/_emdash/api/media/file/<key>` anywhere in a string, relative or behind
*   any origin; only the key segment is replaced, unless the caller asks to
*   relativize, in which case an absolute URL's scheme and host are dropped
*   too so the importer resolves it against the target;
* - `meta.storageKey` of a media value object;
* - a local media value whose `id` is a storage key (a value stored without
*   `meta.storageKey`);
* - a bare storage key as the whole value of `seo.seoImage` or of a top-level
*   entry field.
*
* Text that already reads `emdash-media:` in an origin string is escaped as
* `emdash-media::` on export and unescaped on import, so every unescaped
* `emdash-media:` in a package is a placeholder and literal text round-trips
* exactly. Import and escaping work on each record string as text; a string
* holding JSON is re-serialized only when a storage key inside it was
* rewritten.
*
* A key that equals some media row's id is treated as that id (ids are
* portable) and left alone. When several media rows share a key, the smallest
* id wins. Keys that are not in the origin `media` table are left untouched
* and reported as `unknown_storage_key` warnings.
*/
var MEDIA_PLACEHOLDER_PREFIX = "emdash-media:";
var MEDIA_FILE_PATH = "/_emdash/api/media/file/";
var PLACEHOLDER_ID_PATTERN = /^[0-9A-Za-z_-]{1,128}$/;
var PLACEHOLDER_ESCAPE = `${MEDIA_PLACEHOLDER_PREFIX}:`;
var PERCENT_RUN = /(?:%[0-9A-Fa-f]{2})+/g;
var PERCENT_ESCAPE = /%[0-9A-F]{2}/g;
var HARD_SEGMENT_END = /[?#"'<>`\r\n\t]/g;
var SOFT_SEGMENT_END = /[\s)\]]/g;
var STORAGE_KEY_CHARS = /^[A-Za-z0-9._-]+$/;
var KEY_TOKEN_PATTERN = /[A-Za-z0-9._-]+/g;
var MAX_ISSUES_PER_RECORD = 20;
/** Characters before a media file path searched for the URL's scheme and host. */
var ORIGIN_WINDOW = 2048;
function isDigit(code) {
	return code >= 48 && code <= 57;
}
function isLetter(code) {
	const lower = code | 32;
	return lower >= 97 && lower <= 122;
}
/** `[A-Za-z0-9.-]` */
function isHostChar(code) {
	return isLetter(code) || isDigit(code) || code === 46 || code === 45;
}
/** `[A-Za-z0-9+.-]` */
function isSchemeChar(code) {
	return isHostChar(code) || code === 43;
}
/** `[0-9A-Za-z_-]` */
function isPlaceholderIdChar(code) {
	return isLetter(code) || isDigit(code) || code === 95 || code === 45;
}
/**
* One `emdash-media:` in a package string: group 1 is set for an escape
* (`emdash-media::`, standing for the text `emdash-media:`), group 2 holds
* the media id of a placeholder, and neither is set for a malformed one.
*/
var PLACEHOLDER_TOKEN = /emdash-media:(?:(:)|([0-9A-Za-z_-]{1,128}))?/g;
/** Escape every `emdash-media:` already in `value` (see {@link PLACEHOLDER_TOKEN}). */
function escapePlaceholderText(value) {
	return value.includes(MEDIA_PLACEHOLDER_PREFIX) ? value.replaceAll(MEDIA_PLACEHOLDER_PREFIX, PLACEHOLDER_ESCAPE) : value;
}
function canUsePlaceholder(mediaId) {
	return PLACEHOLDER_ID_PATTERN.test(mediaId);
}
function buildMediaKeyIndex(rows) {
	const keyToMediaId = /* @__PURE__ */ new Map();
	const mediaIds = /* @__PURE__ */ new Set();
	for (const row of rows) {
		mediaIds.add(row.id);
		const existing = keyToMediaId.get(row.storageKey);
		if (existing === void 0 || compareIds(row.id, existing) < 0) keyToMediaId.set(row.storageKey, row.id);
	}
	return {
		keyToMediaId,
		mediaIds
	};
}
/**
* Rewrite the storage-key references in one record. Returns the input object
* itself when nothing changed; never mutates it.
*/
function rewriteMediaRefs(record, options) {
	const context = {
		options,
		kind: record.kind,
		mediaIds: /* @__PURE__ */ new Set(),
		warnings: [],
		errors: [],
		relativized: 0,
		placeholders: 0
	};
	const skip = identityProperties(record.kind);
	const changes = {};
	let changed = false;
	for (const [property, value] of Object.entries(record)) {
		if (skip.has(property)) continue;
		const next = walk(value, context, property, [property]);
		if (next !== value) {
			changes[property] = next;
			changed = true;
		}
	}
	return {
		value: changed ? {
			...record,
			...changes
		} : record,
		changed,
		mediaIds: [...context.mediaIds].toSorted(compareIds),
		warnings: context.warnings,
		errors: context.errors,
		relativized: context.relativized
	};
}
function report(list, issue) {
	if (list.length < MAX_ISSUES_PER_RECORD) list.push(issue);
}
function isPlainObject$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isBareKeyPosition(kind, segments) {
	if (kind === "seo") return segments.length === 1 && segments[0] === "seoImage";
	if (kind === "entry") return segments.length === 2 && segments[0] === "fields";
	return false;
}
function walk(value, context, path, segments) {
	if (typeof value === "string") return rewriteString(value, context, path, segments);
	if (Array.isArray(value)) {
		let changed = false;
		const next = value.map((item, index) => {
			const rewritten = walk(item, context, `${path}[${index}]`, [...segments, String(index)]);
			if (rewritten !== item) changed = true;
			return rewritten;
		});
		return changed ? next : value;
	}
	if (isPlainObject$1(value)) return rewriteObject(value, context, path, segments);
	return value;
}
function rewriteObject(value, context, path, segments) {
	let changed = false;
	const next = {};
	for (const [key, child] of Object.entries(value)) {
		const rewritten = walk(child, context, `${path}.${key}`, [...segments, key]);
		if (rewritten !== child) changed = true;
		next[key] = rewritten;
	}
	if (context.options.mode !== "import") {
		const { keys } = context.options;
		const provider = value.provider;
		const isLocal = provider === void 0 || provider === null || provider === "local";
		const meta = value.meta;
		if (isLocal && isPlainObject$1(meta) && typeof meta.storageKey === "string") {
			const storageKey = meta.storageKey;
			const placeholder = placeholderForKey(storageKey, keys, context, `${path}.meta.storageKey`);
			if (placeholder !== null) {
				next.meta = {
					...isPlainObject$1(next.meta) ? next.meta : meta,
					storageKey: placeholder
				};
				changed = true;
			} else if (!keys.mediaIds.has(storageKey)) report(context.warnings, {
				code: "unknown_storage_key",
				path: `${path}.meta.storageKey`,
				value: storageKey
			});
		}
		const id = value.id;
		if (isLocal && typeof id === "string" && !keys.mediaIds.has(id)) {
			const placeholder = placeholderForKey(id, keys, context, `${path}.id`);
			if (placeholder !== null) {
				next.id = placeholder;
				changed = true;
			}
		}
	}
	return changed ? next : value;
}
/** Placeholder for a known storage key, or null when `key` is not a known key. */
function placeholderForKey(key, keys, context, path) {
	if (keys.mediaIds.has(key)) return null;
	const mediaId = keys.keyToMediaId.get(key);
	if (mediaId === void 0) return null;
	if (!canUsePlaceholder(mediaId)) {
		report(context.errors, {
			code: "media_id_not_placeholderable",
			path,
			value: mediaId
		});
		return null;
	}
	context.mediaIds.add(mediaId);
	context.placeholders++;
	return `${MEDIA_PLACEHOLDER_PREFIX}${mediaId}`;
}
function rewriteString(value, context, path, segments) {
	if (context.options.mode === "import") return resolvePlaceholders(value, context.options.mediaIdToKey, context, path);
	const { keys } = context.options;
	if (isBareKeyPosition(context.kind, segments)) {
		const placeholder = placeholderForKey(value, keys, context, path);
		if (placeholder !== null) return placeholder;
	}
	const trimmed = value.trimStart();
	if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
		const parsed = parseEmbeddedJson$1(value);
		if (parsed !== void 0) {
			const placeholders = context.placeholders;
			const rewritten = walk(parsed, context, path, segments);
			return context.placeholders === placeholders ? escapePlaceholderText(value) : JSON.stringify(rewritten);
		}
	}
	const escaped = escapePlaceholderText(value);
	if (!escaped.includes(MEDIA_FILE_PATH)) return escaped;
	return rewriteMediaFileUrls(escaped, keys, context, path, context.options.relativize === true);
}
function decodePercent(segment) {
	if (!segment.includes("%")) return null;
	try {
		return decodeURIComponent(segment);
	} catch {
		return null;
	}
}
/**
* Index of the first match of the global `pattern` at or after a start, for
* starts that never decrease: a match found earlier is reused while it is
* still ahead, so all calls together scan `value` once.
*/
function endFinder(value, pattern) {
	let found = -1;
	return (start) => {
		if (found >= start) return found;
		pattern.lastIndex = start;
		const match = pattern.exec(value);
		found = match ? match.index : value.length;
		return found;
	};
}
/**
* Start of the `scheme://host[:port]` or `//host[:port]` that ends at `at`,
* or -1. Only `value[from, at)` is examined; the scheme is the longest one
* that fits there.
*/
function originStart(value, from, at) {
	const floor = Math.max(from, at - ORIGIN_WINDOW);
	const is = (test, index) => index >= floor && test(value.charCodeAt(index));
	let end = at;
	let digits = end;
	while (is(isDigit, digits - 1)) digits--;
	if (digits < end && value[digits - 1] === ":" && digits - 1 >= floor) end = digits - 1;
	let host = end;
	while (is(isHostChar, host - 1)) host--;
	if (host === end || host - 2 < floor || value[host - 1] !== "/" || value[host - 2] !== "/") return -1;
	const slashes = host - 2;
	if (slashes - 1 < floor || value[slashes - 1] !== ":") return slashes;
	let scheme = slashes - 1;
	while (is(isSchemeChar, scheme - 1)) scheme--;
	for (let index = scheme; index < slashes - 1; index++) if (isLetter(value.charCodeAt(index))) return index;
	return slashes;
}
/**
* Replace the key segment of every `/_emdash/api/media/file/<key>` in
* `value`. The segment runs to the first `?#"'<>`, backtick, or line break.
* The longest prefix of the segment that is a known storage key, raw or
* percent-decoded, is replaced; this covers keys with spaces, parentheses,
* `+`, or non-ASCII characters, percent-encoded URLs, and keys followed by
* punctuation. A segment whose prefix up to whitespace, `)` or `]` is neither
* a key nor a media id is reported as `unknown_storage_key`. With
* `relativize`, a replaced URL also loses the scheme and host before it.
*/
function rewriteMediaFileUrls(value, keys, context, path, relativize) {
	const maxRawLength = maxKeyLength(keys) * MAX_ENCODED_CHARS_PER_CHAR;
	const hardEnd = endFinder(value, HARD_SEGMENT_END);
	const softEnd = endFinder(value, SOFT_SEGMENT_END);
	let output = "";
	let cursor = 0;
	let at = value.indexOf(MEDIA_FILE_PATH);
	while (at !== -1) {
		const start = at + 24;
		const match = longestKeyPrefix(value.slice(start, Math.min(hardEnd(start), start + maxRawLength)), keys);
		const placeholder = match ? placeholderForKey(match.key, keys, context, path) : null;
		if (match && placeholder !== null) {
			const origin = relativize ? originStart(value, cursor, at) : -1;
			if (origin !== -1) context.relativized++;
			output += value.slice(cursor, origin === -1 ? at : origin);
			output += MEDIA_FILE_PATH + placeholder;
			cursor = start + match.length;
		} else {
			output += value.slice(cursor, start);
			cursor = start;
		}
		if (!match && context.warnings.length < MAX_ISSUES_PER_RECORD) {
			const end = Math.min(hardEnd(start), softEnd(start), start + MAX_MEDIA_ID_SEGMENT);
			const segment = value.slice(start, end);
			const decoded = decodePercent(segment);
			if (segment.length > 0 && !keys.mediaIds.has(segment) && !(decoded !== null && keys.mediaIds.has(decoded))) report(context.warnings, {
				code: "unknown_storage_key",
				path,
				value: segment
			});
		}
		at = value.indexOf(MEDIA_FILE_PATH, Math.max(cursor, start));
	}
	return output + value.slice(cursor);
}
function longestKeyPrefix(remainder, keys) {
	const lengths = keyLengths(keys);
	const decodedEnds = decodedKeyLengthEnds(remainder, keys);
	const candidates = decodedEnds.size === 0 ? sortedKeyLengths(keys) : [.../* @__PURE__ */ new Set([...lengths, ...decodedEnds])].toSorted((a, b) => b - a);
	for (const length of candidates) {
		if (length > remainder.length || length === 0) continue;
		if (lengths.has(length)) {
			const prefix = remainder.slice(0, length);
			if (keys.keyToMediaId.has(prefix) && !keys.mediaIds.has(prefix)) return {
				key: prefix,
				length
			};
		}
		if (decodedEnds.has(length)) {
			const decoded = decodePercent(remainder.slice(0, length));
			if (decoded !== null && keys.keyToMediaId.has(decoded) && !keys.mediaIds.has(decoded)) return {
				key: decoded,
				length
			};
		}
	}
	return null;
}
function hexDigit(code) {
	if (code >= 48 && code <= 57) return code - 48;
	const lower = code | 32;
	return lower >= 97 && lower <= 102 ? lower - 87 : -1;
}
/**
* Lengths of the prefixes of `remainder` that contain a percent escape and
* would percent-decode to a string as long as some key, so only those are
* decoded. Stops at the first escape that cannot start or continue a UTF-8
* sequence, since no longer prefix decodes, and past the longest key.
*/
function decodedKeyLengthEnds(remainder, keys) {
	const lengths = keyLengths(keys);
	const ends = /* @__PURE__ */ new Set();
	let index = remainder.indexOf("%");
	if (index === -1) return ends;
	const longest = sortedKeyLengths(keys)[0] ?? 0;
	let decoded = index;
	let pending = 0;
	let units = 0;
	while (index < remainder.length && decoded <= longest) {
		if (remainder[index] === "%") {
			const high = hexDigit(remainder.charCodeAt(index + 1));
			const low = hexDigit(remainder.charCodeAt(index + 2));
			if (high === -1 || low === -1) break;
			const byte = high * 16 + low;
			index += 3;
			if (pending > 0) {
				if ((byte & 192) !== 128) break;
				pending--;
				if (pending === 0) decoded += units;
			} else if (byte < 128) decoded++;
			else if ((byte & 224) === 192) {
				pending = 1;
				units = 1;
			} else if ((byte & 240) === 224) {
				pending = 2;
				units = 1;
			} else if ((byte & 248) === 240) {
				pending = 3;
				units = 2;
			} else break;
		} else {
			if (pending > 0) break;
			decoded++;
			index++;
		}
		if (pending === 0 && lengths.has(decoded)) ends.add(index);
	}
	return ends;
}
/** A UTF-8 character percent-encodes to at most 12 characters (`%XX` × 4). */
var MAX_ENCODED_CHARS_PER_CHAR = 12;
/** Longest media file URL segment that can still spell a media id. */
var MAX_MEDIA_ID_SEGMENT = TRANSFER_LIMITS.idLength * MAX_ENCODED_CHARS_PER_CHAR;
var keyLengthsCache = /* @__PURE__ */ new WeakMap();
function keyLengths(keys) {
	let lengths = keyLengthsCache.get(keys);
	if (lengths === void 0) {
		lengths = new Set(Array.from(keys.keyToMediaId.keys(), (key) => key.length));
		keyLengthsCache.set(keys, lengths);
	}
	return lengths;
}
var sortedKeyLengthsCache = /* @__PURE__ */ new WeakMap();
/** Distinct key lengths, longest first. */
function sortedKeyLengths(keys) {
	let sorted = sortedKeyLengthsCache.get(keys);
	if (sorted === void 0) {
		sorted = [...keyLengths(keys)].toSorted((a, b) => b - a);
		sortedKeyLengthsCache.set(keys, sorted);
	}
	return sorted;
}
function maxKeyLength(keys) {
	return sortedKeyLengths(keys)[0] ?? 0;
}
function parseEmbeddedJson$1(value) {
	if (measureJsonDepth(value, TRANSFER_LIMITS.jsonDepth) > TRANSFER_LIMITS.jsonDepth) return;
	try {
		const parsed = JSON.parse(value);
		return typeof parsed === "object" && parsed !== null ? parsed : void 0;
	} catch {
		return;
	}
}
var PLACEHOLDER_FILE_PATH = `${MEDIA_FILE_PATH}${MEDIA_PLACEHOLDER_PREFIX}`;
/**
* Drop the scheme and host before every placeholder media file URL. A
* placeholder names media on the site that holds the package's data, so on
* import its URL is the target's own relative media file route. Verification
* applies the same normalization to package records before comparing.
*/
function relativizePlaceholderUrls(value) {
	let output = "";
	let cursor = 0;
	let at = value.indexOf(PLACEHOLDER_FILE_PATH);
	while (at !== -1) {
		const next = at + PLACEHOLDER_FILE_PATH.length;
		if (isPlaceholderIdChar(value.charCodeAt(next))) {
			const origin = originStart(value, cursor, at);
			if (origin !== -1) {
				output += value.slice(cursor, origin);
				cursor = at;
			}
		}
		at = value.indexOf(PLACEHOLDER_FILE_PATH, next);
	}
	return cursor === 0 ? value : output + value.slice(cursor);
}
function resolvePlaceholders(value, mediaIdToKey, context, path) {
	if (!value.includes(MEDIA_PLACEHOLDER_PREFIX)) return value;
	return relativizePlaceholderUrls(value).replace(PLACEHOLDER_TOKEN, (match, escape, mediaId) => {
		if (escape !== void 0) return MEDIA_PLACEHOLDER_PREFIX;
		if (mediaId === void 0) return match;
		const key = mediaIdToKey.get(mediaId);
		if (key === void 0) {
			report(context.errors, {
				code: "unresolved_placeholder",
				path,
				value: mediaId
			});
			return match;
		}
		context.mediaIds.add(mediaId);
		return key;
	});
}
/**
* Keys suitable for {@link scanForKeys}: every storage key except those equal
* to a media id (those are indistinguishable from the portable id).
*/
function scannableKeys(keys) {
	const result = /* @__PURE__ */ new Set();
	for (const key of keys.keyToMediaId.keys()) if (!keys.mediaIds.has(key)) result.add(key);
	return result;
}
/**
* Walker-independent check: every key from `keys` that occurs anywhere in
* `text` as a substring, raw, percent-encoded (either hex case), or with
* JSON string escaping (sorted, unique). Exporter self-validation runs it
* over every record line and fails the export if anything is found.
*/
function scanForKeys(text, keys) {
	if (keys.size === 0 || text.length === 0) return [];
	const found = /* @__PURE__ */ new Set();
	const lengths = /* @__PURE__ */ new Set();
	const irregular = [];
	for (const key of keys) if (STORAGE_KEY_CHARS.test(key)) lengths.add(key.length);
	else if (key.length > 0) irregular.push(key);
	const sortedLengths = [...lengths].toSorted((a, b) => a - b);
	const texts = text.includes("%") ? [text, decodePercentRuns(text)] : [text];
	for (const candidateText of texts) {
		for (const match of candidateText.matchAll(KEY_TOKEN_PATTERN)) {
			const token = match[0];
			for (const length of sortedLengths) {
				if (length > token.length) break;
				for (let start = 0; start + length <= token.length; start++) {
					const candidate = token.slice(start, start + length);
					if (keys.has(candidate)) found.add(candidate);
				}
			}
		}
		for (const key of irregular) if (keyForms(key).some((form) => candidateText.includes(form))) found.add(key);
	}
	return [...found].toSorted(compareIds);
}
function keyForms(key) {
	const encoded = encodeURIComponent(key);
	return [.../* @__PURE__ */ new Set([
		key,
		JSON.stringify(key).slice(1, -1),
		encoded,
		encoded.replace(PERCENT_ESCAPE, (escape) => escape.toLowerCase()),
		encodeURI(key)
	])];
}
/** Decode each run of `%XX` escapes that forms valid UTF-8; leave the rest. */
function decodePercentRuns(text) {
	return text.replace(PERCENT_RUN, (run) => {
		try {
			return decodeURIComponent(run);
		} catch {
			return run;
		}
	});
}
/**
* Per-record value checks: media placeholders and external media providers
* inside record values, and the constraints a target database puts on stored
* values (column types, NOT NULL, Postgres int4 / float4).
*/
var PROVIDER_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
/** Reported in place of a provider id that is not a plain identifier. */
var OTHER_PROVIDER = "other";
var INT4_MIN = -2147483648;
var INT4_MAX = 2147483647;
/**
* Top-level record properties stored in JSON (or JSON-shaped) columns. Numbers
* directly under them are JSON numbers, not integer columns.
*/
var JSON_PROPERTIES = /* @__PURE__ */ new Set([
	"adminConfig",
	"componentProps",
	"content",
	"data",
	"defaultValue",
	"fields",
	"keywords",
	"moderationMetadata",
	"options",
	"searchConfig",
	"validation",
	"value"
]);
/** Top-level properties stored in REAL columns. */
var REAL_PROPERTIES = /* @__PURE__ */ new Set(["focalX", "focalY"]);
function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseEmbeddedJson(value) {
	const trimmed = value.trimStart();
	if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return void 0;
	if (measureJsonDepth(value) > TRANSFER_LIMITS.jsonDepth) return void 0;
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
function scanValue(value, scan, embedded) {
	if (typeof value === "string") {
		if (!embedded) {
			for (const match of value.matchAll(PLACEHOLDER_TOKEN)) if (match[2] !== void 0) scan.placeholders.add(match[2]);
			else if (match[1] === void 0) scan.malformed++;
			const parsed = parseEmbeddedJson(value);
			if (parsed !== void 0) scanValue(parsed, scan, true);
		}
		return;
	}
	if (Array.isArray(value)) {
		for (const item of value) scanValue(item, scan, embedded);
		return;
	}
	if (!isPlainObject(value)) return;
	const provider = value.provider;
	if (typeof provider === "string" && provider !== "local" && typeof value.id === "string") {
		const key = PROVIDER_ID_PATTERN.test(provider) ? provider : OTHER_PROVIDER;
		scan.providers.set(key, (scan.providers.get(key) ?? 0) + 1);
	}
	for (const child of Object.values(value)) scanValue(child, scan, embedded);
}
/**
* Placeholders and external media values in every non-identity property of a
* record. Placeholders are read from each string as text, the way the
* importer resolves them, never from JSON parsed out of a string.
*/
function scanRecordValues(record) {
	const scan = {
		placeholders: /* @__PURE__ */ new Set(),
		malformed: 0,
		providers: /* @__PURE__ */ new Map()
	};
	const skip = identityProperties(record.kind);
	for (const [property, value] of Object.entries(record)) if (!skip.has(property)) scanValue(value, scan, false);
	return scan;
}
function isInt4(value) {
	return value >= INT4_MIN && value <= INT4_MAX;
}
function roundsInFloat4(value) {
	return Math.fround(value) !== value;
}
/**
* Top-level integer and real properties of any record against a Postgres
* target, where `integer` is int4 and `real` is float4.
*/
function checkRecordNumbers(record, dialect) {
	const result = {
		issues: [],
		float4Rounded: 0
	};
	if (dialect !== "postgres") return result;
	for (const [property, value] of Object.entries(record)) {
		if (typeof value !== "number" || JSON_PROPERTIES.has(property)) continue;
		if (REAL_PROPERTIES.has(property)) {
			if (roundsInFloat4(value)) result.float4Rounded++;
		} else if (!isInt4(value)) result.issues.push({
			code: "integer_out_of_range",
			message: "Integer is outside the target database's integer range",
			property
		});
	}
	return result;
}
function mismatch(field, message) {
	return {
		code: "value_constraint_violation",
		message,
		property: "fields",
		field
	};
}
function urlMismatch(property, field) {
	return {
		code: "value_constraint_violation",
		message: "URL field value is not safe to store",
		property,
		field
	};
}
function arrayValue(value) {
	if (Array.isArray(value)) return value;
	if (typeof value !== "string") return void 0;
	const parsed = parseEmbeddedJson(value);
	return Array.isArray(parsed) ? parsed : void 0;
}
function unsafeUrlFields(value, fields, path) {
	const issues = [];
	if (!isPlainObject(value)) return issues;
	for (const field of fields) {
		const fieldPath = `${path}.${field.slug}`;
		const fieldValue = value[field.slug];
		if (field.type === "url") {
			if (typeof fieldValue === "string" && !isSafeUrlFieldWriteValue(fieldValue)) issues.push(fieldPath);
			continue;
		}
		for (const [index, row] of (arrayValue(fieldValue) ?? []).entries()) {
			if (!isPlainObject(row)) continue;
			for (const slug of field.urlSubFields ?? []) {
				const nested = row[slug];
				if (typeof nested === "string" && !isSafeUrlFieldWriteValue(nested)) issues.push(`${fieldPath}.${index}.${slug}`);
			}
		}
	}
	return issues;
}
function checkContentUrlFields(values, fields, blockTypes, blockVersions, property) {
	const issues = [];
	for (const [slug, info] of fields) {
		const value = values[slug];
		if (info.type === "url") {
			if (typeof value === "string" && !isSafeUrlFieldWriteValue(value)) issues.push(urlMismatch(property, slug));
			continue;
		}
		if (info.type === "repeater") {
			const descriptors = [{
				slug,
				type: "repeater",
				urlSubFields: info.urlSubFields
			}];
			for (const path of unsafeUrlFields(values, descriptors, property)) issues.push(urlMismatch(property, path.slice(property.length + 1)));
			continue;
		}
		if (info.type !== "blocks") continue;
		for (const [index, block] of (arrayValue(value) ?? []).entries()) {
			if (!isPlainObject(block) || typeof block._type !== "string") continue;
			const type = blockTypes.get(block._type);
			if (!type) continue;
			const version = typeof block._version === "number" && Number.isInteger(block._version) ? block._version : type.currentVersion;
			const descriptors = blockVersions.get(`${type.id}:${version}`) ?? [];
			for (const path of unsafeUrlFields(block, descriptors, `${slug}.${index}`)) issues.push(urlMismatch(property, path));
		}
	}
	return issues;
}
/**
* Entry field values against the target column each field is stored in,
* through the shared column codec: a value the codec cannot encode for the
* column is an issue, as is a missing value in a NOT NULL (required) column
* other than a JSON one (which stores it as JSON `null`) and, on Postgres,
* an integer outside int4. Boolean fields are INTEGER
* columns, so their values are 0/1 numbers.
*/
function checkEntryFields(entry, fields, dialect, blockTypes = /* @__PURE__ */ new Map(), blockVersions = /* @__PURE__ */ new Map()) {
	const result = {
		issues: checkContentUrlFields(entry.fields, fields, blockTypes, blockVersions, "fields"),
		float4Rounded: 0
	};
	for (const [slug, value] of Object.entries(entry.fields)) {
		const info = fields.get(slug);
		if (!info) {
			result.issues.push(mismatch(slug, "Entry has a value for a field its collection lacks"));
			continue;
		}
		if (info.storageless) {
			result.issues.push(mismatch(slug, "Entry has a value for a field that stores no column"));
			continue;
		}
		try {
			encodeColumn(dialect, codecForColumnType(info.columnType), value);
		} catch (error) {
			if (!isTransferError(error)) throw error;
			result.issues.push(mismatch(slug, "Value does not fit the field's column type"));
			continue;
		}
		if (dialect !== "postgres" || typeof value !== "number") continue;
		if (info.columnType === "INTEGER" && !isInt4(value)) result.issues.push({
			code: "integer_out_of_range",
			message: "Integer is outside the target database's integer range",
			property: "fields",
			field: slug
		});
		else if (info.columnType === "REAL" && roundsInFloat4(value)) result.float4Rounded++;
	}
	for (const [slug, info] of fields) if (info.required && !info.storageless && info.columnType !== "JSON" && !Object.hasOwn(entry.fields, slug)) result.issues.push(mismatch(slug, "Required field has no value"));
	return result;
}
/** Kinds whose records carry a `locale`. */
function recordLocale(record) {
	const locale = Reflect.get(record, "locale");
	return typeof locale === "string" ? locale : void 0;
}
function recordStringProperty(record, property) {
	if (!Object.hasOwn(record, property)) return void 0;
	const value = Reflect.get(record, property);
	return typeof value === "string" ? value : void 0;
}
var count$2 = z.number().int().nonnegative();
var kindSchema = z.enum(RECORD_KINDS);
var kindCounts = z.array(z.tuple([kindSchema, count$2]));
var urlValueFieldSchema = z.strictObject({
	slug: z.string(),
	type: z.enum(["url", "repeater"]),
	urlSubFields: z.array(z.string()).optional()
});
/**
* Serialized validation progress. Maps are stored as entry lists: keys come
* from the package and must never become object properties.
*/
var validationStateSchema = z.strictObject({
	version: z.literal(1),
	phase: z.enum([
		"structure",
		"records",
		"references",
		"done"
	]),
	nextIndexSeq: count$2,
	lastIndexPath: z.string().nullable(),
	indexedChunks: kindCounts,
	indexedRecords: kindCounts,
	indexedFiles: count$2,
	indexedBytes: count$2,
	indexedBlobs: count$2,
	indexedBlobBytes: count$2,
	recordBytes: count$2,
	kindIndex: count$2,
	seq: count$2,
	lastKey: z.strictObject({
		id: z.string(),
		depth: count$2.optional()
	}).nullable(),
	seenRecords: kindCounts,
	unreadableKinds: z.array(kindSchema),
	collections: z.array(z.tuple([z.string(), z.strictObject({
		id: z.string(),
		searchEnabled: z.boolean()
	})])),
	fields: z.array(z.tuple([z.string(), z.array(z.tuple([z.string(), z.strictObject({
		columnType: z.enum([
			"TEXT",
			"REAL",
			"INTEGER",
			"JSON"
		]),
		required: z.boolean(),
		storageless: z.boolean().optional(),
		type: z.enum([
			"url",
			"repeater",
			"blocks"
		]).optional(),
		urlSubFields: z.array(z.string()).optional()
	})]))])),
	blockTypes: z.array(z.tuple([z.string(), z.strictObject({
		id: z.string(),
		currentVersion: z.number().int().positive()
	})])).default([]),
	blockVersions: z.array(z.tuple([z.string(), z.array(urlValueFieldSchema)])).default([]),
	principals: z.array(z.strictObject({
		id: z.string(),
		displayName: z.string(),
		email: z.string().optional()
	})),
	principalReferences: z.array(z.tuple([z.string(), count$2])),
	principalBylineLocales: z.array(z.tuple([z.string(), z.array(z.string())])),
	principalsWithSharedLocaleBylines: z.array(z.string()),
	settings: z.strictObject({
		title: z.string().optional(),
		tagline: z.string().optional()
	}),
	bylineFields: z.array(z.tuple([z.string(), z.strictObject({
		type: z.custom(isBylineFieldType),
		options: z.array(z.string()).optional()
	})])),
	float4Rounded: count$2,
	externalProviders: z.array(z.tuple([z.string(), count$2])),
	issues: issueStateSchema
});
function initialValidationState() {
	return serialize(initialWorkingState());
}
function initialWorkingState() {
	return {
		phase: "structure",
		nextIndexSeq: 0,
		lastIndexPath: null,
		indexedChunks: /* @__PURE__ */ new Map(),
		indexedRecords: /* @__PURE__ */ new Map(),
		indexedFiles: 0,
		indexedBytes: 0,
		indexedBlobs: 0,
		indexedBlobBytes: 0,
		recordBytes: 0,
		kindIndex: 0,
		seq: 0,
		lastKey: null,
		seenRecords: /* @__PURE__ */ new Map(),
		unreadableKinds: /* @__PURE__ */ new Set(),
		collections: /* @__PURE__ */ new Map(),
		fields: /* @__PURE__ */ new Map(),
		blockTypes: /* @__PURE__ */ new Map(),
		blockVersions: /* @__PURE__ */ new Map(),
		principals: [],
		principalReferences: /* @__PURE__ */ new Map(),
		principalBylineLocales: /* @__PURE__ */ new Map(),
		principalsWithSharedLocaleBylines: /* @__PURE__ */ new Set(),
		settings: {},
		bylineFields: /* @__PURE__ */ new Map(),
		float4Rounded: 0,
		externalProviders: /* @__PURE__ */ new Map(),
		issues: emptyIssues()
	};
}
function sortedEntries(map) {
	return [...map.entries()].toSorted(([a], [b]) => compareIds(a, b));
}
function serialize(state) {
	return {
		version: 1,
		phase: state.phase,
		nextIndexSeq: state.nextIndexSeq,
		lastIndexPath: state.lastIndexPath,
		indexedChunks: [...state.indexedChunks.entries()],
		indexedRecords: [...state.indexedRecords.entries()],
		indexedFiles: state.indexedFiles,
		indexedBytes: state.indexedBytes,
		indexedBlobs: state.indexedBlobs,
		indexedBlobBytes: state.indexedBlobBytes,
		recordBytes: state.recordBytes,
		kindIndex: state.kindIndex,
		seq: state.seq,
		lastKey: state.lastKey ? {
			id: state.lastKey.id,
			...state.lastKey.depth === void 0 ? {} : { depth: state.lastKey.depth }
		} : null,
		seenRecords: [...state.seenRecords.entries()],
		unreadableKinds: [...state.unreadableKinds],
		collections: sortedEntries(state.collections),
		fields: sortedEntries(state.fields).map(([slug, fields]) => [slug, sortedEntries(fields)]),
		blockTypes: sortedEntries(state.blockTypes),
		blockVersions: sortedEntries(state.blockVersions),
		principals: state.principals,
		principalReferences: sortedEntries(state.principalReferences),
		principalBylineLocales: sortedEntries(state.principalBylineLocales).map(([id, locales]) => [id, [...locales].toSorted(compareIds)]),
		principalsWithSharedLocaleBylines: [...state.principalsWithSharedLocaleBylines].toSorted(compareIds),
		settings: state.settings,
		bylineFields: sortedEntries(state.bylineFields),
		float4Rounded: state.float4Rounded,
		externalProviders: sortedEntries(state.externalProviders),
		issues: state.issues
	};
}
function deserialize(state) {
	return {
		phase: state.phase,
		nextIndexSeq: state.nextIndexSeq,
		lastIndexPath: state.lastIndexPath,
		indexedChunks: new Map(state.indexedChunks),
		indexedRecords: new Map(state.indexedRecords),
		indexedFiles: state.indexedFiles,
		indexedBytes: state.indexedBytes,
		indexedBlobs: state.indexedBlobs,
		indexedBlobBytes: state.indexedBlobBytes,
		recordBytes: state.recordBytes,
		kindIndex: state.kindIndex,
		seq: state.seq,
		lastKey: state.lastKey,
		seenRecords: new Map(state.seenRecords),
		unreadableKinds: new Set(state.unreadableKinds),
		collections: new Map(state.collections),
		fields: new Map(state.fields.map(([slug, fields]) => [slug, new Map(fields)])),
		blockTypes: new Map(state.blockTypes),
		blockVersions: new Map(state.blockVersions),
		principals: state.principals,
		principalReferences: new Map(state.principalReferences),
		principalBylineLocales: new Map(state.principalBylineLocales.map(([id, locales]) => [id, new Set(locales)])),
		principalsWithSharedLocaleBylines: new Set(state.principalsWithSharedLocaleBylines),
		settings: state.settings,
		bylineFields: new Map(state.bylineFields),
		float4Rounded: state.float4Rounded,
		externalProviders: new Map(state.externalProviders),
		issues: state.issues
	};
}
function parseValidationState(value) {
	const result = validationStateSchema.safeParse(value);
	if (!result.success) throw new TransferError("TRANSFER_ANALYZE_ERROR", "Validation state is invalid");
	return result.data;
}
/**
* Run one bounded validation step. Blockers and warnings in the result are
* cumulative; `done` is true once every pass has finished. Usable directly as
* the exporter's self-validation hook.
*/
async function validateStagedPackageStep(input) {
	return runValidationStep(input, {});
}
async function runValidationStep(input, options) {
	const state = deserialize(input.state === null || input.state === void 0 ? initialValidationState() : parseValidationState(input.state));
	let manifest = null;
	if (state.phase !== "done") try {
		manifest = await input.reader.manifest();
	} catch (error) {
		if (!isTransferError(error)) throw error;
		addBlocker(state.issues, blockerForError(error, { path: "manifest.json" }));
		state.phase = "done";
	}
	if (manifest && state.phase !== "done") {
		const context = {
			db: input.db,
			reader: input.reader,
			operationId: input.operationId,
			manifest,
			state,
			stagedFiles: new TransferStagedFileRepository(input.db),
			index: new TransferPackageIndexRepository(input.db, input.operationId),
			target: options.target
		};
		while (context.state.phase !== "done") {
			const bytes = await nextUnitBytes(context);
			if (!input.budget.canStart({
				bytes,
				queries: unitQueries(context.state.phase)
			})) break;
			input.budget.start(bytes);
			await runUnit$1(context);
		}
	}
	const serialized = serialize(state);
	return {
		done: state.phase === "done",
		state: serialized,
		blockers: [...state.issues.blockers],
		warnings: finalWarnings(state.issues)
	};
}
function kindAt(index) {
	return RECORD_KINDS[index];
}
/** Index of the first kind at or after `from` that the manifest declares, or -1. */
function nextDeclaredKind(manifest, from) {
	for (let index = from; index < RECORD_KINDS.length; index++) {
		const kind = kindAt(index);
		if (kind && manifest.records[kind]) return index;
	}
	return -1;
}
/**
* Upper bound on the queries one unit runs: a records chunk writes up to 1000
* index rows and their unique keys; a references chunk looks up each
* reference property of up to 1000 records.
*/
function unitQueries(phase) {
	switch (phase) {
		case "records": return Math.ceil(TRANSFER_LIMITS.chunkRecords / rowsPerInsert(7)) + 2 * Math.ceil(TRANSFER_LIMITS.chunkRecords / 50) + UNIQUE_CHECK_QUERIES + 2;
		case "references": return 6 * Math.ceil(TRANSFER_LIMITS.chunkRecords / 50) + 4;
		default: return 4;
	}
}
async function nextUnitBytes(context) {
	const { state, manifest } = context;
	if (state.phase === "structure") return manifest.index[state.nextIndexSeq]?.bytes ?? 0;
	if (state.phase === "records" || state.phase === "references") {
		const kind = kindAt(state.kindIndex);
		if (!kind) return 0;
		return (await context.stagedFiles.get(context.operationId, recordChunkPath(kind, state.seq)))?.bytes ?? 0;
	}
	return 0;
}
async function runUnit$1(context) {
	const { state, manifest } = context;
	switch (state.phase) {
		case "structure":
			if (state.nextIndexSeq < manifest.index.length) await structureChunk(context);
			else {
				await finishStructure(context);
				startPass(context, "records");
			}
			return;
		case "records":
		case "references": {
			const kind = kindAt(state.kindIndex);
			if (!kind) {
				state.phase = state.phase === "records" ? "references" : "done";
				if (state.phase === "references") startPass(context, "references");
				return;
			}
			if (state.phase === "records") await recordsChunk(context, kind);
			else await referencesChunk(context, kind);
			advanceChunk(context, kind);
			return;
		}
		case "done": return;
	}
}
function startPass(context, phase) {
	const { state, manifest } = context;
	const first = nextDeclaredKind(manifest, 0);
	state.phase = first === -1 ? phase === "records" ? "references" : "done" : phase;
	state.kindIndex = first === -1 ? RECORD_KINDS.length : first;
	state.seq = 0;
	state.lastKey = null;
	if (first === -1 && phase === "records") startPass(context, "references");
}
function advanceChunk(context, kind) {
	const { state, manifest } = context;
	state.seq++;
	if (state.seq < (manifest.records[kind]?.chunks ?? 0)) return;
	if (state.phase === "records") finishKindRecords(context, kind);
	const next = nextDeclaredKind(manifest, state.kindIndex + 1);
	state.kindIndex = next === -1 ? RECORD_KINDS.length : next;
	state.seq = 0;
	state.lastKey = null;
	if (next === -1) if (state.phase === "records") startPass(context, "references");
	else state.phase = "done";
}
function bumpCount(map, key, by = 1) {
	map.set(key, (map.get(key) ?? 0) + by);
}
async function structureChunk(context) {
	const { state, manifest } = context;
	const seq = state.nextIndexSeq;
	state.nextIndexSeq++;
	const indexPath = manifest.index[seq]?.path;
	let entries;
	try {
		entries = await context.reader.indexChunk(seq);
	} catch (error) {
		if (!isTransferError(error)) throw error;
		addBlocker(state.issues, blockerForError(error, { path: indexPath }));
		return;
	}
	for (const entry of entries) {
		if (state.lastIndexPath !== null && compareIds(state.lastIndexPath, entry.path) >= 0) addBlocker(state.issues, {
			code: "package_invalid",
			message: "Index entries are not sorted by path or repeat a path",
			detail: { path: entry.path }
		});
		state.lastIndexPath = entry.path;
		state.indexedFiles++;
		state.indexedBytes += entry.bytes;
		const parsed = parsePackagePath(entry.path);
		if (parsed?.type === "records") {
			const summary = manifest.records[parsed.kind];
			if (!summary || parsed.seq >= summary.chunks) addBlocker(state.issues, {
				code: "package_invalid",
				message: "Record chunk is not declared by the manifest",
				kind: parsed.kind,
				detail: { path: entry.path }
			});
			bumpCount(state.indexedChunks, parsed.kind);
			bumpCount(state.indexedRecords, parsed.kind, entry.records ?? 0);
			state.recordBytes += entry.bytes;
		} else if (parsed?.type === "media") {
			state.indexedBlobs++;
			state.indexedBlobBytes += entry.bytes;
			if (context.target && entry.bytes > context.target.maxBlobBytes) addBlocker(state.issues, {
				code: "media_blob_too_large",
				message: "Media file is larger than this site accepts",
				detail: {
					path: entry.path,
					bytes: entry.bytes,
					limit: context.target.maxBlobBytes
				}
			});
		}
	}
	const staged = await context.stagedFiles.getMany(context.operationId, entries.map((entry) => entry.path));
	for (const entry of entries) {
		const file = staged.get(entry.path);
		if (!file) addBlocker(state.issues, {
			code: "file_missing",
			message: "Package file has not been staged",
			detail: { path: entry.path }
		});
		else if (file.bytes !== entry.bytes || file.sha256 !== entry.sha256) addBlocker(state.issues, {
			code: "file_mismatch",
			message: "Staged file does not match its index entry",
			detail: { path: entry.path }
		});
		else if (file.state !== "verified") addBlocker(state.issues, {
			code: "file_missing",
			message: "Package file has not been uploaded",
			detail: { path: entry.path }
		});
	}
}
async function countStagedContentFiles(context) {
	const row = await context.db.selectFrom("_emdash_transfer_staged_files").select((eb) => eb.fn.countAll().as("count")).where("operation_id", "=", context.operationId).where((eb) => eb.or([eb("path", "like", "records/%"), eb("path", "like", "media/%")])).executeTakeFirstOrThrow();
	return Number(row.count);
}
async function finishStructure(context) {
	const { state, manifest } = context;
	for (const kind of RECORD_KINDS) {
		const summary = manifest.records[kind];
		const chunks = state.indexedChunks.get(kind) ?? 0;
		const records = state.indexedRecords.get(kind) ?? 0;
		if ((summary?.chunks ?? 0) !== chunks) addBlocker(state.issues, {
			code: "package_invalid",
			message: "Index does not list every record chunk the manifest declares",
			kind,
			detail: {
				declared: summary?.chunks ?? 0,
				indexed: chunks
			}
		});
		else if ((summary?.count ?? 0) !== records) addBlocker(state.issues, {
			code: "record_count_mismatch",
			message: "Index record counts do not match the manifest",
			kind,
			detail: {
				declared: summary?.count ?? 0,
				indexed: records
			}
		});
	}
	if (state.indexedBlobs !== manifest.media.count || state.indexedBlobBytes !== manifest.media.totalBytes) addBlocker(state.issues, {
		code: "package_invalid",
		message: "Indexed media does not match the manifest"
	});
	if (state.indexedFiles !== manifest.files.count || state.indexedBytes !== manifest.files.totalBytes) addBlocker(state.issues, {
		code: "package_invalid",
		message: "Indexed files do not match the manifest"
	});
	const staged = await countStagedContentFiles(context);
	if (staged > state.indexedFiles) addBlocker(state.issues, {
		code: "package_invalid",
		message: "Staged files are not listed in the package index",
		count: staged - state.indexedFiles
	});
}
/**
* Decode one record chunk. With `report`, read and decode failures become
* blockers; the references pass re-reads chunks the records pass already
* reported and stays quiet.
*/
async function loadChunk(context, kind, report) {
	const path = recordChunkPath(kind, context.state.seq);
	const file = await context.stagedFiles.get(context.operationId, path);
	if (!file || file.state !== "verified") return null;
	let lines;
	try {
		lines = await readVerifiedChunk(context.reader.stage, path, file);
	} catch (error) {
		if (!isTransferError(error)) throw error;
		if (report) addBlocker(context.state.issues, blockerForError(error, { path }));
		return null;
	}
	const records = [];
	lines.forEach((line, index) => {
		const decoded = decodeRecordLine(kind, line, {
			path,
			line: index + 1
		});
		if (decoded.ok) records.push({
			record: decoded.record,
			line: index + 1
		});
		else if (report) addBlocker(context.state.issues, decoded.blocker);
	});
	return {
		records,
		lines: lines.length,
		path
	};
}
function groupIdOf(record) {
	return recordStringProperty(record, "translationGroup") ?? record.id;
}
function nameKeyOf(record) {
	if (record.kind === "collection" || record.kind === "block_type" || record.kind === "relation") return record.slug;
	if (record.kind === "menu") return record.name;
	if (record.kind === "block_type_version") return blockTypeVersionKey(record.blockTypeId, record.version);
	return null;
}
function isTopologicalKind(kind) {
	return Object.hasOwn(TOPOLOGICAL_PARENT_PROPERTY, kind);
}
function parentOf(kind, record) {
	if (!isTopologicalKind(kind)) return void 0;
	return recordStringProperty(record, TOPOLOGICAL_PARENT_PROPERTY[kind]);
}
async function recordsChunk(context, kind) {
	const { state, manifest } = context;
	const chunk = await loadChunk(context, kind, true);
	if (!chunk) {
		state.unreadableKinds.add(kind);
		return;
	}
	bumpCount(state.seenRecords, kind, chunk.lines);
	const topological = streamOrderOf(kind) === "topological";
	const chunkDepths = /* @__PURE__ */ new Map();
	let knownDepths = /* @__PURE__ */ new Map();
	if (topological) {
		const lookups = /* @__PURE__ */ new Set();
		for (const { record } of chunk.records) {
			lookups.add(record.id);
			const parent = parentOf(kind, record);
			if (parent !== void 0) lookups.add(parent);
		}
		knownDepths = await context.index.depths(kind, [...lookups]);
	}
	const usedLocales = new Set(manifest.locales.used);
	const entries = [];
	for (const { record, line } of chunk.records) {
		const location = {
			path: chunk.path,
			line
		};
		let depth;
		if (topological) {
			depth = 0;
			const parent = parentOf(kind, record);
			if (parent === record.id) addBlocker(state.issues, {
				code: "reference_cycle",
				message: "Record is its own parent",
				kind,
				id: record.id,
				detail: location
			});
			else if (parent !== void 0) {
				const parentDepth = chunkDepths.get(parent) ?? knownDepths.get(parent);
				if (parentDepth === void 0) addBlocker(state.issues, {
					code: "record_order_invalid",
					message: "Parent does not appear before its child",
					kind,
					id: record.id,
					detail: location
				});
				else depth = parentDepth + 1;
			}
			const stored = knownDepths.get(record.id);
			if (chunkDepths.has(record.id) || stored !== void 0 && stored !== depth) addBlocker(state.issues, {
				code: "duplicate_id",
				message: "Record id appears more than once",
				kind,
				id: record.id,
				detail: location
			});
			chunkDepths.set(record.id, depth);
		}
		const key = depth === void 0 ? { id: record.id } : {
			id: record.id,
			depth
		};
		if (state.lastKey && compareStreamOrder(kind, state.lastKey, key) >= 0) {
			const duplicate = state.lastKey.id === record.id;
			addBlocker(state.issues, {
				code: duplicate ? "duplicate_id" : "record_order_invalid",
				message: duplicate ? "Record id appears more than once" : "Records are out of stream order",
				kind,
				id: record.id,
				detail: location
			});
		}
		state.lastKey = key;
		const locale = recordLocale(record);
		if (locale !== void 0 && !usedLocales.has(locale)) addBlocker(state.issues, {
			code: "package_invalid",
			message: "Record locale is not listed in the manifest",
			kind,
			id: record.id,
			detail: location
		});
		collectRecordFacts(context, record, location);
		const parent = parentOf(kind, record);
		entries.push({
			kind,
			id: record.id,
			groupId: groupIdOf(record),
			nameKey: nameKeyOf(record),
			parentId: parent ?? null,
			depth: depth ?? 0
		});
	}
	await context.index.insertMany(entries);
	await checkUniqueKeys(context, kind, chunk.records, chunk.path);
}
async function checkUniqueKeys(context, kind, records, path) {
	const keyed = records.map((item) => ({
		ownerId: item.record.id,
		keys: uniqueKeysOf(item.record),
		item
	}));
	const collisions = await findUniqueCollisions(context.db, context.operationId, keyed);
	for (const { constraint, item, holderId } of collisions) {
		if (constraint === "byline_principal_locale") {
			const principal = recordStringProperty(item.record, "userPrincipal");
			if (principal !== void 0) context.state.principalsWithSharedLocaleBylines.add(principal);
			continue;
		}
		addBlocker(context.state.issues, {
			code: "unique_violation",
			message: "Record would duplicate another record's unique key on the target",
			kind,
			id: item.record.id,
			detail: {
				constraint,
				conflictsWith: holderId,
				path,
				line: item.line
			}
		});
	}
}
var FIELD_TYPE_SET = new Set(FIELD_TYPES);
var BYLINE_FIELD_TYPE_SET = new Set(BYLINE_FIELD_TYPES);
function isBylineFieldType(type) {
	return BYLINE_FIELD_TYPE_SET.has(type);
}
/** The string choices in a select field's `validation.options`, as the write path reads them. */
function selectOptions(validation) {
	if (typeof validation !== "object" || validation === null || Array.isArray(validation)) return [];
	const options = Reflect.get(validation, "options");
	return Array.isArray(options) ? options.filter((option) => typeof option === "string") : [];
}
function repeaterUrlSubFields(validation) {
	if (typeof validation !== "object" || validation === null || Array.isArray(validation)) return [];
	const subFields = Reflect.get(validation, "subFields");
	if (!Array.isArray(subFields)) return [];
	return subFields.flatMap((field) => {
		if (typeof field !== "object" || field === null || Array.isArray(field)) return [];
		const slug = Reflect.get(field, "slug");
		return Reflect.get(field, "type") === "url" && typeof slug === "string" ? [slug] : [];
	});
}
function urlValueFields(fields) {
	const result = [];
	for (const field of fields) {
		if (typeof field !== "object" || field === null || Array.isArray(field)) continue;
		const slug = Reflect.get(field, "slug");
		const type = Reflect.get(field, "type");
		if (typeof slug !== "string") continue;
		if (type === "url") {
			result.push({
				slug,
				type
			});
			continue;
		}
		if (type !== "repeater") continue;
		const urlSubFields = repeaterUrlSubFields(Reflect.get(field, "validation"));
		if (urlSubFields.length > 0) result.push({
			slug,
			type,
			urlSubFields
		});
	}
	return result;
}
function isKnownFieldType(type) {
	return FIELD_TYPE_SET.has(type);
}
function isUrlRelevantFieldType(type) {
	return type === "url" || type === "repeater" || type === "blocks";
}
/**
* Records whose facts analysis keeps in its state. A package beyond these is
* rejected rather than letting per-step state grow with the package.
*/
var MAX_TRACKED = {
	principals: 1e4,
	collections: 1e3,
	fields: 2e4,
	blockTypes: 1e3,
	blockVersions: 2e4,
	bylineFields: 1e3,
	providers: 100
};
function countFields(state) {
	let total = 0;
	for (const fields of state.fields.values()) total += fields.size;
	return total;
}
function reportTrackingLimit(state, kind) {
	const message = "Package has more records of this kind than a site supports";
	if (!state.issues.blockers.some((blocker) => blocker.code === "limit_exceeded" && blocker.kind === kind && blocker.message === message)) addBlocker(state.issues, {
		code: "limit_exceeded",
		message,
		kind
	});
}
function collectRecordFacts(context, record, location) {
	const { state } = context;
	switch (record.kind) {
		case "block_type":
			if (state.blockTypes.size >= MAX_TRACKED.blockTypes) {
				reportTrackingLimit(state, record.kind);
				return;
			}
			state.blockTypes.set(record.slug, {
				id: record.id,
				currentVersion: record.currentVersion
			});
			return;
		case "block_type_version":
			if (state.blockVersions.size >= MAX_TRACKED.blockVersions) {
				reportTrackingLimit(state, record.kind);
				return;
			}
			state.blockVersions.set(blockTypeVersionKey(record.blockTypeId, record.version), urlValueFields(record.fields));
			return;
		case "principal":
			if (record.id === "__proto__") {
				addBlocker(state.issues, {
					code: "record_invalid",
					message: "Principal id is reserved",
					kind: "principal",
					detail: location
				});
				return;
			}
			if (state.principals.length >= MAX_TRACKED.principals) {
				reportTrackingLimit(state, "principal");
				return;
			}
			state.principals.push({
				id: record.id,
				displayName: record.displayName,
				...record.email === void 0 ? {} : { email: record.email }
			});
			return;
		case "collection": {
			const existing = state.collections.get(record.slug);
			if (existing && existing.id !== record.id) {
				addBlocker(state.issues, {
					code: "duplicate_id",
					message: "Collection slug appears more than once",
					kind: "collection",
					id: record.id,
					detail: location
				});
				return;
			}
			const config = record.searchConfig;
			const searchEnabled = typeof config === "object" && config !== null && !Array.isArray(config) && config.enabled === true;
			if (state.collections.size >= MAX_TRACKED.collections) {
				reportTrackingLimit(state, "collection");
				return;
			}
			state.collections.set(record.slug, {
				id: record.id,
				searchEnabled
			});
			return;
		}
		case "field": {
			if (!isKnownFieldType(record.type)) {
				addBlocker(state.issues, {
					code: "field_type_unknown",
					message: "Field type is not supported by this site",
					kind: "field",
					id: record.id,
					detail: location
				});
				return;
			}
			if (FIELD_TYPE_TO_COLUMN[record.type] !== record.columnType) {
				addBlocker(state.issues, {
					code: "record_invalid",
					message: "Field column type does not match its field type",
					kind: "field",
					id: record.id,
					detail: location
				});
				return;
			}
			let collectionSlug;
			for (const [slug, collection] of state.collections) if (collection.id === record.collectionId) collectionSlug = slug;
			if (collectionSlug === void 0) return;
			if (countFields(state) >= MAX_TRACKED.fields) {
				reportTrackingLimit(state, "field");
				return;
			}
			const fields = state.fields.get(collectionSlug) ?? /* @__PURE__ */ new Map();
			if (fields.has(record.slug)) {
				addBlocker(state.issues, {
					code: "duplicate_id",
					message: "Field slug appears more than once in its collection",
					kind: "field",
					id: record.id,
					detail: location
				});
				return;
			}
			fields.set(record.slug, {
				columnType: record.columnType,
				required: record.required === true,
				storageless: referenceFieldRelationSlugs(record).length > 0,
				...isUrlRelevantFieldType(record.type) ? { type: record.type } : {},
				...record.type === "repeater" ? { urlSubFields: repeaterUrlSubFields(record.validation) } : {}
			});
			state.fields.set(collectionSlug, fields);
			return;
		}
		case "byline_field": {
			if (!isBylineFieldType(record.type)) {
				addBlocker(state.issues, {
					code: "field_type_unknown",
					message: "Byline field type is not supported by this site",
					kind: "byline_field",
					id: record.id,
					detail: location
				});
				return;
			}
			const options = record.type === "select" ? selectOptions(record.validation) : void 0;
			if (options !== void 0 && options.length > 200) {
				addBlocker(state.issues, {
					code: "value_constraint_violation",
					message: "Byline field has more choices than a site supports",
					kind: "byline_field",
					id: record.id,
					detail: {
						...location,
						property: "validation"
					}
				});
				return;
			}
			if (state.bylineFields.size >= MAX_TRACKED.bylineFields) {
				reportTrackingLimit(state, "byline_field");
				return;
			}
			state.bylineFields.set(record.id, {
				type: record.type,
				...options === void 0 ? {} : { options }
			});
			return;
		}
		case "setting":
			if (typeof record.value === "string") {
				if (record.id === "site:title" || record.id === "emdash:site_title" && !state.settings.title) state.settings.title = record.value.slice(0, 4096);
				if (record.id === "site:tagline" || record.id === "emdash:site_tagline" && !state.settings.tagline) state.settings.tagline = record.value.slice(0, 4096);
			}
			return;
		default: return;
	}
}
function finishKindRecords(context, kind) {
	const { state, manifest } = context;
	const declared = manifest.records[kind]?.count ?? 0;
	const seen = state.seenRecords.get(kind) ?? 0;
	if (declared !== seen && !state.unreadableKinds.has(kind)) addBlocker(state.issues, {
		code: "record_count_mismatch",
		message: "Record count does not match the manifest",
		kind,
		detail: {
			declared,
			found: seen
		}
	});
}
function referenceValues(record, property, many) {
	if (!Object.hasOwn(record, property)) return [];
	const raw = Reflect.get(record, property);
	if (many) return Array.isArray(raw) ? raw.filter((value) => typeof value === "string") : [];
	return typeof raw === "string" ? [raw] : [];
}
async function referencesChunk(context, kind) {
	const { state } = context;
	const chunk = await loadChunk(context, kind, false);
	if (!chunk) return;
	const principalIds = new Set(state.principals.map((principal) => principal.id));
	for (const reference of KIND_REFERENCES[kind]) {
		const owners = /* @__PURE__ */ new Map();
		for (const item of chunk.records) for (const value of referenceValues(item.record, reference.property, reference.many === true)) {
			const list = owners.get(value) ?? [];
			list.push(item);
			owners.set(value, list);
			if (reference.targets.includes("principal") && principalIds.has(value)) bumpCount(state.principalReferences, value);
		}
		if (owners.size === 0) continue;
		const missing = await context.index.findMissing(reference.targets, reference.by, [...owners.keys()]);
		for (const value of missing) for (const item of owners.get(value) ?? []) {
			const detail = {
				property: reference.property,
				path: chunk.path,
				line: item.line
			};
			if (reference.soft) addWarning(state.issues, {
				code: "soft_reference_dangling",
				message: "Reference does not resolve to a record in the package",
				kind,
				id: item.record.id,
				detail
			});
			else addBlocker(state.issues, {
				code: "dangling_reference",
				message: "Reference does not resolve to a record in the package",
				kind,
				id: item.record.id,
				detail
			});
		}
	}
	await checkNestedReferences(context, kind, chunk.records, chunk.path);
	await checkMediaReferences(context, kind, chunk.records, chunk.path);
	if (kind === "media") await checkMediaBlobs(context, chunk.records, chunk.path);
	for (const { record, line } of chunk.records) {
		if (record.kind === "byline" && record.userPrincipal !== void 0 && principalIds.has(record.userPrincipal)) {
			const locales = state.principalBylineLocales.get(record.userPrincipal) ?? /* @__PURE__ */ new Set();
			locales.add(record.locale);
			state.principalBylineLocales.set(record.userPrincipal, locales);
		}
		if (context.target) checkTargetValues(context, record, {
			path: chunk.path,
			line
		});
	}
}
/**
* References that live inside a property rather than being one: the block
* types a `blocks` field names in `validation`, the relation a bound
* `reference` field names there, and the version a block type names as
* current.
*
* A bound field's relation is soft because the origin does not keep it
* resolvable: deleting a relation leaves the fields bound to it in place.
*/
var NESTED_REFERENCES = {
	field: [{
		property: "validation",
		targets: ["block_type"],
		by: "slug",
		values: (record) => record.kind === "field" ? blocksFieldTypeSlugs(record) : []
	}, {
		property: "validation",
		targets: ["relation"],
		by: "slug",
		values: (record) => record.kind === "field" ? referenceFieldRelationSlugs(record) : [],
		soft: true
	}],
	block_type: [{
		property: "currentVersion",
		targets: ["block_type_version"],
		by: "name",
		values: (record) => record.kind === "block_type" ? [blockTypeVersionKey(record.id, record.currentVersion)] : []
	}]
};
async function checkNestedReferences(context, kind, records, path) {
	for (const reference of NESTED_REFERENCES[kind] ?? []) {
		const owners = /* @__PURE__ */ new Map();
		for (const item of records) for (const value of reference.values(item.record)) {
			const list = owners.get(value) ?? [];
			list.push(item);
			owners.set(value, list);
		}
		if (owners.size === 0) continue;
		const missing = await context.index.findMissing(reference.targets, reference.by, [...owners.keys()]);
		for (const value of missing) for (const item of owners.get(value) ?? []) {
			const issue = {
				message: "Reference does not resolve to a record in the package",
				kind,
				id: item.record.id,
				detail: {
					property: reference.property,
					path,
					line: item.line
				}
			};
			if (reference.soft) addWarning(context.state.issues, {
				code: "soft_reference_dangling",
				...issue
			});
			else addBlocker(context.state.issues, {
				code: "dangling_reference",
				...issue
			});
		}
	}
}
async function checkMediaReferences(context, kind, records, path) {
	const { state } = context;
	const placeholderOwners = /* @__PURE__ */ new Map();
	const settingOwners = /* @__PURE__ */ new Map();
	for (const item of records) {
		const scan = scanRecordValues(item.record);
		if (scan.malformed > 0) addBlocker(state.issues, {
			code: "media_ref_invalid",
			message: "Record holds media placeholder text that is not a placeholder or an escape",
			kind,
			id: item.record.id,
			detail: {
				path,
				line: item.line
			}
		});
		for (const mediaId of scan.placeholders) {
			const list = placeholderOwners.get(mediaId) ?? [];
			list.push(item);
			placeholderOwners.set(mediaId, list);
		}
		for (const [provider, uses] of scan.providers) {
			const key = state.externalProviders.has(provider) || state.externalProviders.size < MAX_TRACKED.providers ? provider : OTHER_PROVIDER;
			bumpCount(state.externalProviders, key, uses);
		}
		if (item.record.kind === "setting") for (const mediaId of settingMediaIds(item.record.id, item.record.value)) {
			const list = settingOwners.get(mediaId) ?? [];
			list.push(item);
			settingOwners.set(mediaId, list);
		}
	}
	if (placeholderOwners.size > 0) {
		const missing = await context.index.findMissing(["media"], "id", [...placeholderOwners.keys()]);
		for (const mediaId of missing) for (const item of placeholderOwners.get(mediaId) ?? []) addBlocker(state.issues, {
			code: "media_ref_invalid",
			message: "Media placeholder does not name a media record in the package",
			kind,
			id: item.record.id,
			detail: {
				path,
				line: item.line
			}
		});
	}
	if (settingOwners.size > 0) {
		const missing = await context.index.findMissing(["media"], "id", [...settingOwners.keys()]);
		for (const mediaId of missing) for (const item of settingOwners.get(mediaId) ?? []) addWarning(state.issues, {
			code: "media_row_missing",
			message: "Setting refers to media that is not in the package",
			kind,
			id: item.record.id
		});
	}
}
async function checkMediaBlobs(context, records, path) {
	const blobPaths = /* @__PURE__ */ new Map();
	for (const item of records) {
		if (item.record.kind !== "media") continue;
		const blobPath = mediaBlobPath(item.record.blob);
		const list = blobPaths.get(blobPath) ?? [];
		list.push(item);
		blobPaths.set(blobPath, list);
	}
	if (blobPaths.size === 0) return;
	const staged = await context.stagedFiles.getMany(context.operationId, [...blobPaths.keys()]);
	for (const [blobPath, items] of blobPaths) {
		const file = staged.get(blobPath);
		if (file && file.state === "verified") continue;
		for (const item of items) addBlocker(context.state.issues, {
			code: "media_blob_missing",
			message: "Media record's file is not in the package",
			kind: "media",
			id: item.record.id,
			detail: {
				path,
				line: item.line
			}
		});
	}
}
function reportValueIssues(context, record, issues, location) {
	for (const issue of issues) addBlocker(context.state.issues, {
		code: issue.code,
		message: issue.message,
		kind: record.kind,
		id: record.id,
		detail: {
			...location,
			property: issue.property,
			...issue.field === void 0 ? {} : { field: issue.field }
		}
	});
}
function checkTargetValues(context, record, location) {
	const target = context.target;
	if (!target) return;
	const numbers = checkRecordNumbers(record, target.dialect);
	context.state.float4Rounded += numbers.float4Rounded;
	reportValueIssues(context, record, numbers.issues, location);
	reportValueIssues(context, record, writeRuleIssues(record, { bylineFields: context.state.bylineFields }), location);
	if (record.kind === "entry") {
		const fields = context.state.fields.get(record.collection);
		if (!fields) return;
		const values = checkEntryFields(record, fields, target.dialect, context.state.blockTypes, context.state.blockVersions);
		context.state.float4Rounded += values.float4Rounded;
		reportValueIssues(context, record, values.issues, location);
	} else if (record.kind === "revision" && typeof record.data === "object" && record.data !== null && !Array.isArray(record.data)) {
		const fields = context.state.fields.get(record.collection);
		if (!fields) return;
		reportValueIssues(context, record, checkContentUrlFields(record.data, fields, context.state.blockTypes, context.state.blockVersions, "data"), location);
	}
}
function summarizeValidation(state) {
	const working = deserialize(state);
	return {
		recordBytes: working.recordBytes,
		principals: working.principals,
		principalReferences: working.principalReferences,
		principalBylineLocales: working.principalBylineLocales,
		principalsWithSharedLocaleBylines: working.principalsWithSharedLocaleBylines,
		settings: working.settings,
		collectionSlugs: [...working.collections.keys()].toSorted(compareIds),
		searchEnabledCollections: [...working.collections.values()].filter((collection) => collection.searchEnabled).map((collection) => collection.id).toSorted(compareIds),
		float4Rounded: working.float4Rounded,
		externalProviders: working.externalProviders
	};
}
var ANALYSIS_DIRECTORY = "_analysis/";
var MAX_STATE_BYTES = 67108864;
var MAX_PLAN_BYTES = 67108864;
var ANALYZABLE_STATES = ["uploading", "analyzing"];
var analysisContextSchema = z.strictObject({
	version: z.literal(1),
	principalBylineLocales: z.array(z.tuple([z.string(), z.array(z.string())])),
	principalsWithSharedLocaleBylines: z.array(z.string())
});
function stageFor$1(storage, operation) {
	return new TransferStage(storage, stagingPrefix("import", operation.id, operation.stagingSecret));
}
async function stateKey(stage, cursor) {
	return `${stage.prefix}${ANALYSIS_DIRECTORY}state-${await sha256Hex$1(canonicalJson(cursor))}.json`;
}
function contextKey(stage) {
	return `${stage.prefix}${ANALYSIS_DIRECTORY}context.json`;
}
async function readJson(storage, key, maxBytes) {
	if (!await storage.exists(key)) return null;
	const download = await storage.download(key);
	return JSON.parse(new TextDecoder().decode(await readStreamBytes(download.body, maxBytes)));
}
async function writeJson(storage, key, value) {
	await storage.upload({
		key,
		body: new TextEncoder().encode(JSON.stringify(value)),
		contentType: "application/json"
	});
}
function cursorFor(state) {
	const kind = RECORD_KINDS[state.kindIndex];
	switch (state.phase) {
		case "structure": return {
			stage: "analyze_structure",
			nextIndexSeq: state.nextIndexSeq
		};
		case "records":
			if (kind) return {
				stage: "analyze_records",
				position: {
					kind,
					seq: state.seq,
					line: 0
				}
			};
			return {
				stage: "analyze_references",
				check: state.kindIndex,
				after: null
			};
		case "references": return {
			stage: "analyze_references",
			check: state.kindIndex,
			after: kind && state.seq > 0 ? recordChunkPath(kind, state.seq - 1) : null
		};
		case "done": return { stage: "analyze_target" };
	}
}
function chunksBefore(manifest, kindIndex, seq) {
	let before = 0;
	let total = 0;
	RECORD_KINDS.forEach((kind, index) => {
		const chunks = manifest?.records[kind]?.chunks ?? 0;
		total += chunks;
		if (index < kindIndex) before += chunks;
	});
	return {
		before: before + seq,
		total
	};
}
function progressFor(state, manifest) {
	const indexChunks = manifest?.index.length ?? 0;
	const { before, total: recordChunks } = chunksBefore(manifest, state.kindIndex, state.seq);
	const total = indexChunks + 2 * recordChunks + 1;
	switch (state.phase) {
		case "structure": return {
			done: Math.min(state.nextIndexSeq, indexChunks),
			total
		};
		case "records": return {
			done: indexChunks + before,
			total
		};
		case "references": return {
			done: indexChunks + recordChunks + before,
			total
		};
		case "done": return {
			done: total - 1,
			total
		};
	}
}
async function loadValidationState(stage, cursor) {
	const analysisCursor = analysisCursorSchema.safeParse(cursor);
	if (!analysisCursor.success) return initialValidationState();
	const raw = await readJson(stage.storage, await stateKey(stage, analysisCursor.data), MAX_STATE_BYTES);
	return raw === null ? initialValidationState() : parseValidationState(raw);
}
async function readManifestSafely(reader) {
	try {
		return await reader.manifest();
	} catch (error) {
		if (isTransferError(error)) return null;
		throw error;
	}
}
var looseIdentitySchema = z.looseObject({
	packageId: portableIdSchema,
	originSiteId: portableIdSchema,
	createdAt: z.string().min(1).max(64),
	createdByEmDashVersion: z.string().min(1).max(128)
});
/**
* Identity and digest of a manifest that failed full validation, when its
* identity fields are still well-formed.
*/
async function looseManifestIdentity(stage) {
	try {
		const bytes = await stage.readBytes(MANIFEST_PATH, TRANSFER_LIMITS.manifestBytes);
		const raw = parseCanonicalJson(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
		const identity = looseIdentitySchema.safeParse(raw);
		if (!identity.success) return null;
		return {
			digest: await canonicalDigest(raw),
			origin: identity.data
		};
	} catch {
		return null;
	}
}
async function readTargetSettings(db) {
	const options = new OptionsRepository(db);
	const title = await options.get("site:title");
	const tagline = await options.get("site:tagline");
	return {
		...typeof title === "string" ? { title } : {},
		...typeof tagline === "string" ? { tagline } : {}
	};
}
function principalBylinesFrom(file) {
	return {
		locales: new Map(file.principalBylineLocales.map(([id, locales]) => [id, new Set(locales)])),
		sharedLocale: new Set(file.principalsWithSharedLocaleBylines)
	};
}
async function storePlan(stage, plan, context) {
	await writeJson(stage.storage, contextKey(stage), context);
	await stage.putAux("plan", canonicalJson(plan));
	return planDigest(plan);
}
async function buildAnalysisPlan(input, stage, reader, validation) {
	const { db, targetContext } = input;
	const target = {
		siteId: await getOrCreateSiteId(db),
		dialect: detectDialect(db),
		emdashVersion: targetContext.emdashVersion
	};
	const manifest = await readManifestSafely(reader);
	if (!manifest) {
		const identity = await looseManifestIdentity(stage);
		if (!identity) return null;
		return {
			plan: buildBlockedPlan({
				packageDigest: identity.digest,
				origin: {
					siteId: identity.origin.originSiteId,
					packageId: identity.origin.packageId,
					createdAt: identity.origin.createdAt,
					createdByEmDashVersion: identity.origin.createdByEmDashVersion
				},
				target,
				blockers: validation.blockers,
				warnings: validation.warnings
			}),
			context: {
				version: 1,
				principalBylineLocales: [],
				principalsWithSharedLocaleBylines: []
			}
		};
	}
	const summary = summarizeValidation(validation.state);
	const domain = await inspectTargetDomain(db, summary.collectionSlugs);
	const redirectLoops = await findRedirectLoops(manifest, stage, new TransferStagedFileRepository(db), input.operationId);
	const context = {
		version: 1,
		principalBylineLocales: Array.from(summary.principalBylineLocales, ([id, locales]) => [id, [...locales].toSorted(compareIds)]).toSorted(([a], [b]) => compareIds(a, b)),
		principalsWithSharedLocaleBylines: [...summary.principalsWithSharedLocaleBylines].toSorted(compareIds)
	};
	return {
		plan: buildPlan({
			packageDigest: await reader.digest(),
			manifest,
			target,
			summary,
			validationBlockers: validation.blockers,
			validationWarnings: validation.warnings,
			targetBlockers: [...domain.blockers, ...checkLocales(manifest, targetContext)],
			scaffold: domain.scaffold,
			redirectLoops,
			localeRecasing: localeRecasing(manifest, targetContext),
			suggestions: await suggestPrincipalUsers(db, summary.principals),
			targetSettings: await readTargetSettings(db)
		}, principalBylinesFrom(context)),
		context
	};
}
async function claimForAnalysis(repo, input) {
	if (input.leaseToken !== void 0) {
		const operation = await repo.require(input.operationId);
		if (operation.leaseToken !== input.leaseToken) throw new TransferError("TRANSFER_LEASE_LOST", "Transfer operation lease was lost");
		if (operation.kind !== "import" || !isAnalyzable(operation.state)) throw new TransferError("TRANSFER_INVALID_STATE", "Import cannot be analyzed in this state");
		return {
			operation,
			leaseToken: input.leaseToken
		};
	}
	const claim = await repo.claim(input.operationId, ANALYZABLE_STATES);
	switch (claim.outcome) {
		case "claimed":
			if (claim.operation.kind !== "import") {
				await repo.release(claim.operation.id, claim.leaseToken);
				throw new TransferError("TRANSFER_INVALID_STATE", "Only imports can be analyzed");
			}
			return {
				operation: claim.operation,
				leaseToken: claim.leaseToken
			};
		case "lease_active": throw new TransferError("TRANSFER_LEASE_ACTIVE", "Another step is running");
		case "invalid_state":
			if (claim.operation.kind === "import" && claim.operation.state === "planned") return { planned: claim.operation };
			throw new TransferError("TRANSFER_INVALID_STATE", "Import cannot be analyzed in this state");
	}
}
function isAnalyzable(state) {
	return ANALYZABLE_STATES.includes(state);
}
/**
* Run one bounded analysis step. The final step stores the plan (default
* decisions) in staging as `_plan.json` and moves the operation to
* `planned`. Calling it on a planned operation returns the stored plan.
*/
async function analyzeImportStep(input) {
	const repo = new TransferOperationRepository(input.db);
	const claimed = await claimForAnalysis(repo, input);
	if ("planned" in claimed) {
		const plan = await loadImportPlan(input.storage, claimed.planned);
		return {
			operation: claimed.planned,
			done: true,
			plan,
			planDigest: plan ? await planDigest(plan) : null
		};
	}
	const { operation, leaseToken } = claimed;
	try {
		if (operation.cancelRequestedAt !== null) return {
			operation: await repo.finishCancelled(operation.id, leaseToken),
			done: true,
			plan: null,
			planDigest: null
		};
		const stage = stageFor$1(input.storage, operation);
		const reader = new StagedPackageReader(stage);
		const validationState = await loadValidationState(stage, operation.cursor);
		const validation = await runValidationStep({
			db: input.db,
			reader,
			operationId: operation.id,
			state: validationState,
			budget: input.budget
		}, { target: {
			dialect: detectDialect(input.db),
			maxBlobBytes: input.targetContext.maxUploadSize
		} });
		const manifest = await readManifestSafely(reader);
		const cursor = cursorFor(validation.state);
		if (!validation.done || !input.budget.canStart()) {
			await writeJson(input.storage, await stateKey(stage, cursor), validation.state);
			return {
				operation: await repo.release(operation.id, leaseToken, {
					state: "analyzing",
					stage: cursor.stage,
					cursor,
					progress: progressFor(validation.state, manifest)
				}),
				done: false,
				plan: null,
				planDigest: null
			};
		}
		input.budget.start();
		const built = await buildAnalysisPlan(input, stage, reader, validation);
		if (!built) {
			const first = validation.blockers[0];
			return {
				operation: await repo.fail(operation.id, leaseToken, {
					code: "TRANSFER_MANIFEST_INVALID",
					detail: first ? { blocker: first.code } : void 0
				}),
				done: true,
				plan: null,
				planDigest: null
			};
		}
		const digest = await storePlan(stage, built.plan, built.context);
		const progress = progressFor(validation.state, manifest);
		const updated = await repo.releaseUnlessCancelled(operation.id, leaseToken, "planned", {
			stage: null,
			cursor: null,
			planDigest: digest,
			progress: {
				done: progress.total,
				total: progress.total
			}
		});
		if (updated.state === "cancelled") return {
			operation: updated,
			done: true,
			plan: null,
			planDigest: null
		};
		return {
			operation: updated,
			done: true,
			plan: built.plan,
			planDigest: digest
		};
	} catch (error) {
		if (!(isTransferError(error) && error.code === "TRANSFER_LEASE_LOST")) await repo.release(operation.id, leaseToken).catch(() => void 0);
		throw error;
	}
}
/** The stored plan of an analyzed import, or null when none has been stored. */
async function loadImportPlan(storage, operation) {
	const text = await stageFor$1(storage, operation).readAux("plan", MAX_PLAN_BYTES);
	if (text === null) return null;
	return siteImportPlanSchema.parse(JSON.parse(text));
}
/**
* Apply submitted decisions to a planned import: validate them, recompute the
* decision-dependent blockers, warnings, and transformations, store the plan,
* and record its digest on the operation. Unknown principal ids and mappings
* to users that do not exist are rejected with `TRANSFER_DECISIONS_INVALID`.
* Once execution is requested the plan is frozen: `TRANSFER_INVALID_STATE`.
*/
async function finalizePlan(input) {
	const parsed = siteImportDecisionsInputSchema.safeParse(input.decisions);
	if (!parsed.success) throw new TransferError("TRANSFER_DECISIONS_INVALID", "Decisions are malformed");
	const repo = new TransferOperationRepository(input.db);
	const claim = await repo.claim(input.operationId, ["planned"]);
	if (claim.outcome === "lease_active") throw new TransferError("TRANSFER_LEASE_ACTIVE", "Another step is running");
	if (claim.outcome === "invalid_state" || claim.operation.kind !== "import") {
		if (claim.outcome === "claimed") await repo.release(claim.operation.id, claim.leaseToken);
		throw new TransferError("TRANSFER_INVALID_STATE", "Import has not been analyzed");
	}
	if (claim.operation.stage === "reserve") {
		await repo.release(claim.operation.id, claim.leaseToken);
		throw new TransferError("TRANSFER_INVALID_STATE", "Import execution was requested; its plan can no longer change");
	}
	const { operation, leaseToken } = claim;
	try {
		const stage = stageFor$1(input.storage, operation);
		const stored = await loadImportPlan(input.storage, operation);
		const contextRaw = await readJson(input.storage, contextKey(stage), MAX_STATE_BYTES);
		const context = analysisContextSchema.safeParse(contextRaw);
		if (!stored || !context.success) throw new TransferError("TRANSFER_INVALID_STATE", "Import has no stored plan");
		const known = new Set(stored.principals.map((principal) => principal.id));
		const submitted = Object.entries(parsed.data.principalMappings ?? {});
		const unknown = submitted.filter(([principalId]) => !known.has(principalId));
		if (unknown.length > 0) throw new TransferError("TRANSFER_DECISIONS_INVALID", "Decisions name unknown principals", { detail: { principals: unknown.length } });
		const missingUsers = await findMissingUsers(input.db, submitted.flatMap(([, userId]) => userId === null ? [] : [userId]));
		if (missingUsers.length > 0) throw new TransferError("TRANSFER_DECISIONS_INVALID", "Decisions name unknown users", { detail: { users: missingUsers.length } });
		const plan = applyDecisions(stored, mergeDecisions(defaultDecisions(stored.principals), parsed.data), principalBylinesFrom(context.data));
		const digest = await storePlan(stage, plan, context.data);
		await repo.release(operation.id, leaseToken, { planDigest: digest });
		return {
			plan,
			planDigest: digest
		};
	} catch (error) {
		if (!(isTransferError(error) && error.code === "TRANSFER_LEASE_LOST")) await repo.release(operation.id, leaseToken).catch(() => void 0);
		throw error;
	}
}
/**
* Write an audit entry for a transfer action that has already taken effect.
* A failed write is logged, not thrown, so it never reports a completed
* action as failed.
*/
async function recordTransferAudit(db, entry) {
	try {
		await new AuditRepository(db).log({
			status: "success",
			...entry
		});
	} catch (error) {
		console.error("[transfer] Failed to write an audit log entry:", error);
	}
}
/**
* Work budget for one `advance` step.
*
* Queries are counted by the request's `metrics.dbCount` (the Kysely log hook
* bumps it), so the budget also covers queries the request ran before the
* step. A unit of work may start only if its estimated query cost still fits
* under the ceiling with `stepClosingQueries` to spare for the writes that end
* the step, and only if its bytes fit the step's byte budget. The
* byte check skips the first unit of a step, so one blob larger than the byte
* budget gets a step of its own.
*/
var TransferStepBudget = class {
	#queryCeiling;
	#byteLimit;
	#metrics;
	#bytesUsed = 0;
	#units = 0;
	get #unitCeiling() {
		return this.#queryCeiling - TRANSFER_LIMITS.stepClosingQueries;
	}
	constructor(options = {}) {
		this.#queryCeiling = options.queryCeiling ?? TRANSFER_LIMITS.stepQueryCeiling;
		this.#byteLimit = options.bytes ?? TRANSFER_LIMITS.stepBytes;
		this.#metrics = options.metrics ?? getRequestContext()?.metrics;
	}
	/**
	* Whether a unit costing `cost` may start. Defaults to the standard unit
	* query cost and no bytes. Without request metrics only bytes are limited.
	*/
	canStart(cost = {}) {
		const queries = cost.queries ?? TRANSFER_LIMITS.stepQueries;
		const bytes = cost.bytes ?? 0;
		if (this.#metrics && this.#metrics.dbCount + queries > this.#unitCeiling) return false;
		if (this.#units === 0) return true;
		return bytes === 0 || this.#bytesUsed + bytes <= this.#byteLimit;
	}
	/** Record that a unit started, with the bytes it will move. */
	start(bytes = 0) {
		this.#units++;
		this.#bytesUsed += bytes;
	}
	get units() {
		return this.#units;
	}
	get bytesUsed() {
		return this.#bytesUsed;
	}
	/** Remaining budget, for display and for sizing batch reads. */
	remaining() {
		return {
			queries: this.#metrics ? Math.max(0, this.#unitCeiling - this.#metrics.dbCount) : Number.POSITIVE_INFINITY,
			bytes: Math.max(0, this.#byteLimit - this.#bytesUsed)
		};
	}
};
/**
* Export-side record of each exported media row's blob digest and size,
* computed by hashing the origin object during the export's media stage.
*/
var TransferMediaBlobRepository = class {
	constructor(db, operationId) {
		this.db = db;
		this.operationId = operationId;
	}
	/** Record blobs; re-recording a media id (retried batch) overwrites it with the new hash. */
	async putMany(entries) {
		for (const batch of chunks([...entries], rowsPerInsert(4))) await this.db.insertInto("_emdash_transfer_media_blobs").values(batch.map((entry) => ({
			operation_id: this.operationId,
			media_id: entry.mediaId,
			sha256: entry.sha256,
			bytes: entry.bytes
		}))).onConflict((conflict) => conflict.columns(["operation_id", "media_id"]).doUpdateSet({
			sha256: (eb) => eb.ref("excluded.sha256"),
			bytes: (eb) => eb.ref("excluded.bytes")
		})).execute();
	}
	async getMany(mediaIds) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(mediaIds)], 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_media_blobs").select([
				"media_id",
				"sha256",
				"bytes"
			]).where("operation_id", "=", this.operationId).where("media_id", "in", batch).execute();
			for (const row of rows) result.set(row.media_id, {
				mediaId: row.media_id,
				sha256: row.sha256,
				bytes: Number(row.bytes)
			});
		}
		return result;
	}
	/** Blob entries in media-id order. */
	async list(options = {}) {
		let query = this.db.selectFrom("_emdash_transfer_media_blobs").select([
			"media_id",
			"sha256",
			"bytes"
		]).where("operation_id", "=", this.operationId);
		const after = options.after;
		if (after !== void 0) query = query.where(sql`${bytewise(this.db, "media_id")} > ${after}`);
		return (await query.orderBy(bytewise(this.db, "media_id")).limit(Math.min(Math.max(options.limit ?? 500, 1), 1e3)).execute()).map((row) => ({
			mediaId: row.media_id,
			sha256: row.sha256,
			bytes: Number(row.bytes)
		}));
	}
	/** Distinct blobs (by digest) with their size, in digest order. */
	async listDistinctBlobs(options = {}) {
		let query = this.db.selectFrom("_emdash_transfer_media_blobs").select(["sha256", (eb) => eb.fn.max("bytes").as("bytes")]).where("operation_id", "=", this.operationId).groupBy("sha256");
		const after = options.after;
		if (after !== void 0) query = query.where(sql`${bytewise(this.db, "sha256")} > ${after}`);
		return (await query.orderBy(bytewise(this.db, "sha256")).limit(Math.min(Math.max(options.limit ?? 500, 1), 1e3)).execute()).map((row) => ({
			sha256: row.sha256,
			bytes: Number(row.bytes)
		}));
	}
	async totals() {
		const row = await this.db.selectFrom("_emdash_transfer_media_blobs").select((eb) => [eb.fn.countAll().as("media_rows"), eb.fn.count("sha256").distinct().as("blobs")]).where("operation_id", "=", this.operationId).executeTakeFirstOrThrow();
		const bytes = await this.db.selectFrom(this.db.selectFrom("_emdash_transfer_media_blobs").select(["sha256", (eb) => eb.fn.max("bytes").as("bytes")]).where("operation_id", "=", this.operationId).groupBy("sha256").as("blob")).select((eb) => eb.fn.sum("blob.bytes").as("total")).executeTakeFirstOrThrow();
		return {
			mediaRows: Number(row.media_rows),
			blobs: Number(row.blobs),
			blobBytes: Number(bytes.total ?? 0)
		};
	}
};
/**
* Optimistic-read fence for an export: per portable table, the row count,
* the latest `updated_at` (or `created_at`), and the largest id. A write that
* changes none of these (an in-place edit of a table without `updated_at`) is
* caught by the operation's `write_epoch`, which fenced writes bump.
*/
async function fencedTables(db) {
	const tables = PORTABLE_TABLES.map((spec) => ({
		table: spec.table,
		changed: Object.hasOwn(spec.columns, "updated_at") ? "updated_at" : Object.hasOwn(spec.columns, "created_at") ? "created_at" : null,
		id: Object.hasOwn(spec.columns, "id") ? "id" : null
	}));
	tables.push({
		table: "users",
		changed: "updated_at",
		id: "id"
	});
	const collections = await db.selectFrom("_emdash_collections").select("slug").orderBy("slug").execute();
	for (const { slug } of collections) {
		validateIdentifier(slug, "collection slug");
		tables.push({
			table: `ec_${slug}`,
			changed: "updated_at",
			id: "id"
		});
	}
	return tables.toSorted((a, b) => a.table < b.table ? -1 : a.table > b.table ? 1 : 0);
}
function optionalText(value) {
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "bigint") return String(value);
	if (value instanceof Date) return value.toISOString();
}
async function captureFence(db, writeEpoch) {
	const result = {
		writeEpoch,
		tables: []
	};
	for (const table of await fencedTables(db)) {
		const values = (await sql`
			SELECT COUNT(*) AS n, ${table.changed ? sql`MAX(${sql.ref(table.changed)})` : sql`NULL`} AS changed, ${table.id ? sql`MAX(${sql.ref(table.id)})` : sql`NULL`} AS id FROM ${sql.ref(table.table)}
		`.execute(db)).rows[0];
		result.tables.push({
			table: table.table,
			count: Number(values?.n ?? 0),
			maxChanged: optionalText(values?.changed),
			maxId: optionalText(values?.id)
		});
	}
	return result;
}
function fencesEqual(a, b) {
	if (a.writeEpoch !== b.writeEpoch || a.tables.length !== b.tables.length) return false;
	return a.tables.every((table, index) => {
		const other = b.tables[index];
		return other !== void 0 && other.table === table.table && other.count === table.count && other.maxChanged === table.maxChanged && other.maxId === table.maxId;
	});
}
/**
* Media for an export: which rows are exported, their blob digests, and the
* storage-key index the reference walker needs.
*
* A media row is exported when it is `ready`, or when a byline avatar or a
* section preview references it and its object exists. Its object is hashed
* once from the origin key; the bytes are never copied into staging.
*/
var KEY_INDEX_PAGE = 1e3;
/** Media rows eligible for export after `after`, in id order. */
async function listMediaCandidates(db, after, limit) {
	let query = db.selectFrom("media").select([
		"id",
		"storage_key",
		"status",
		"size"
	]).where((eb) => eb.or([
		eb("status", "=", "ready"),
		eb("id", "in", eb.selectFrom("_emdash_bylines").select("avatar_media_id").where("avatar_media_id", "is not", null).$castTo()),
		eb("id", "in", eb.selectFrom("_emdash_sections").select("preview_media_id").where("preview_media_id", "is not", null).$castTo())
	]));
	if (after !== null) query = query.where(sql`${bytewise(db, "id")} > ${after}`);
	return (await query.orderBy(bytewise(db, "id")).limit(limit).execute()).map((row) => ({
		id: row.id,
		storageKey: row.storage_key,
		status: row.status,
		size: row.size === null ? null : Number(row.size)
	}));
}
/**
* SHA-256 and size of a stored object, counted from the bytes actually
* streamed. Returns null when the object does not exist, and `"too_large"`
* (after cancelling the download) as soon as more than `maxBytes` arrive.
*/
async function hashStoredObject(storage, key, options = {}) {
	if (!await storage.exists(key)) return null;
	const download = await storage.download(key);
	const hasher = await createSha256();
	const reader = download.body.getReader();
	let bytes = 0;
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			bytes += value.byteLength;
			if (options.maxBytes !== void 0 && bytes > options.maxBytes) {
				await reader.cancel().catch(() => void 0);
				return "too_large";
			}
			hasher.update(value);
		}
	} finally {
		reader.releaseLock();
	}
	return {
		sha256: await hasher.digest(),
		bytes
	};
}
/** Every media row's id and storage key, in id order. */
async function loadMediaKeyRows(db) {
	const rows = [];
	let after = null;
	for (;;) {
		let query = db.selectFrom("media").select(["id", "storage_key"]);
		if (after !== null) query = query.where(sql`${bytewise(db, "id")} > ${after}`);
		const page = await query.orderBy(bytewise(db, "id")).limit(KEY_INDEX_PAGE).execute();
		for (const row of page) rows.push({
			id: row.id,
			storageKey: row.storage_key
		});
		const last = page.at(-1);
		if (page.length < KEY_INDEX_PAGE || !last) break;
		after = last.id;
	}
	return rows;
}
/** Every media row's storage key, for the reference walker and the key scan. */
async function loadMediaKeyIndex(db) {
	return buildMediaKeyIndex(await loadMediaKeyRows(db));
}
var PLACEHOLDER = new RegExp(`${MEDIA_PLACEHOLDER_PREFIX}([0-9A-Za-z_-]{1,128})`, "g");
function unlinkValue(value, drop, counter) {
	if (typeof value === "string") {
		if (!value.includes(MEDIA_PLACEHOLDER_PREFIX)) return value;
		return value.replace(PLACEHOLDER, (match, mediaId) => {
			if (!drop.has(mediaId)) return match;
			counter.count++;
			return "";
		});
	}
	if (Array.isArray(value)) return value.map((item) => unlinkValue(item, drop, counter));
	if (typeof value === "object" && value !== null) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, unlinkValue(item, drop, counter)]));
	return value;
}
/**
* Remove placeholders naming media that is not in the package, leaving the
* rest of each string. Returns the record unchanged when there are none.
*/
function unlinkMediaPlaceholders(record, drop) {
	if (drop.size === 0) return {
		record,
		count: 0
	};
	const counter = { count: 0 };
	const next = unlinkValue(record, drop, counter);
	return counter.count === 0 ? {
		record,
		count: 0
	} : {
		record: next,
		count: counter.count
	};
}
/**
* Per-kind readers: turn portable rows into strict package records.
*
* A reader pages through its kind in package stream order (`id` order, or
* `(depth, id)` for the tree kinds) and can also fetch rows by id. The
* exporter uses the paging side against the origin; import verification
* uses the same readers against the target, so any database works.
*
* When paging, rows a package must not contain are left out: rows whose
* reference (hard or soft) names a row that does not exist, tree rows below
* such a row, and (for an export) media rows that were not hashed. Optional
* references to missing rows are removed from the record instead and
* reported as adjustments. A real database can hold any of these orphans,
* because not every reference has a foreign key on every dialect and
* installation. The number of rows a reader leaves out of a kind is
* `countRows() - exported`. `byIds` never filters.
*/
function bytewiseExpr(db, expr) {
	return isPostgres(db) ? sql`(${expr}) COLLATE "C"` : sql`${expr}`;
}
function count$1(value) {
	return Number(value ?? 0);
}
function invalidRecord(kind, id, field, reason) {
	return new TransferError("TRANSFER_EXPORT_ERROR", "Stored row does not form a valid record", { detail: {
		kind,
		id,
		field,
		reason
	} });
}
function toRecord(kind, raw) {
	const result = validateRecord(kind, raw);
	if (!result.success) {
		const issue = result.issues[0];
		throw invalidRecord(kind, typeof raw.id === "string" ? raw.id : "", issue?.path ?? "", issue?.message ?? "invalid");
	}
	return result.record;
}
function stringOf(value) {
	return typeof value === "string" ? value : void 0;
}
/** Rows of `table` whose group (`translation_group`, else `id`) is one of `groups`. */
async function existingGroups(db, table, groups) {
	const found = /* @__PURE__ */ new Set();
	for (const batch of chunks([...new Set(groups)], Math.floor(25))) {
		const result = await sql`
			SELECT id, translation_group FROM ${sql.ref(table)}
			WHERE translation_group IN (${sql.join(batch)})
				OR (translation_group IS NULL AND id IN (${sql.join(batch)}))
		`.execute(db);
		for (const row of result.rows) found.add(row.translation_group ?? row.id);
	}
	return found;
}
async function collectionSlugs(db) {
	return (await db.selectFrom("_emdash_collections").select("slug").execute()).map((row) => row.slug).toSorted();
}
function contentTable$1(slug) {
	validateIdentifier(slug, "collection slug");
	return `ec_${slug}`;
}
/**
* A collection slug as an SQL literal. Filters compare against every
* collection slug; as bound parameters they exceed D1's 100-parameter limit
* on sites with many collections.
*/
function slugLiteral(slug) {
	validateIdentifier(slug, "collection slug");
	return sql.lit(slug);
}
var NEVER = sql`1 = 0`;
function anyOf(parts) {
	return parts.length === 0 ? NEVER : sql`(${sql.join(parts, sql` OR `)})`;
}
/** An entry with id `id` exists in the content table of collection `collection`. */
function entryExists(context, collection, id) {
	return anyOf(context.slugs.map((slug) => sql`(${collection} = ${slugLiteral(slug)} AND EXISTS (
				SELECT 1 FROM ${sql.ref(contentTable$1(slug))} AS __entry WHERE __entry.id = ${id}
			))`));
}
/** A row of `table` has translation group (or, without one, id) `group`. */
function groupExists(table, group) {
	return sql`EXISTS (
		SELECT 1 FROM ${sql.ref(table)} AS __grouped
		WHERE __grouped.translation_group = ${group}
			OR (__grouped.translation_group IS NULL AND __grouped.id = ${group})
	)`;
}
/** An entry of collection `collection` has translation group `group`. */
function entryGroupExists(context, collection, group) {
	return anyOf(context.slugs.map((slug) => sql`(${collection} = ${slugLiteral(slug)} AND ${groupExists(contentTable$1(slug), group)})`));
}
function col(table, column) {
	return sql`${sql.ref(`${table}.${column}`)}`;
}
/**
* Ids of `table` reachable from a root (`parentColumn IS NULL`) through rows
* that each satisfy `valid`: the tree rows an export keeps.
*/
function treeIds(table, parentColumn, valid) {
	return sql`(
		WITH RECURSIVE __kept(__node) AS (
			SELECT ${col(table, "id")} FROM ${sql.ref(table)}
			WHERE ${col(table, parentColumn)} IS NULL AND ${valid}
			UNION ALL
			SELECT ${col(table, "id")} FROM ${sql.ref(table)}
			INNER JOIN __kept ON ${col(table, parentColumn)} = __kept.__node
			WHERE ${valid}
		)
		SELECT __node FROM __kept
	)`;
}
function commentValid(context) {
	return entryExists(context, col("_emdash_comments", "collection"), col("_emdash_comments", "content_id"));
}
function revisionValid(context) {
	return entryExists(context, col("revisions", "collection"), col("revisions", "entry_id"));
}
/** Media ids among `ids` that the export operation hashed. */
async function exportedMediaIds(db, operationId, ids) {
	const found = /* @__PURE__ */ new Set();
	for (const batch of chunks([...new Set(ids)], 50)) {
		const rows = await db.selectFrom("_emdash_transfer_media_blobs").select("media_id").where("operation_id", "=", operationId).where("media_id", "in", batch).execute();
		for (const row of rows) found.add(row.media_id);
	}
	return found;
}
/** Adapt a transform written for one kind to the reader's record list. */
function forKind(kind, transform) {
	return (records, context) => {
		const typed = records.filter((record) => isRecordOfKind(record, kind));
		if (typed.length !== records.length) throw new Error(`Expected only ${kind} records`);
		return transform(typed, context);
	};
}
var TableReader = class {
	kind;
	#db;
	#config;
	#options;
	#columns;
	#covered = false;
	#slugs = [];
	constructor(db, config, options) {
		const spec = getPortableTableSpecForKind(config.kind);
		if (!spec) throw new Error(`No table for kind ${config.kind}`);
		this.kind = config.kind;
		this.#db = db;
		this.#config = config;
		this.#options = options;
		this.#columns = spec.columns;
	}
	async ensureCoverage() {
		if (this.#covered) return;
		await assertColumnCoverage(this.#db, this.#config.table);
		this.#slugs = await collectionSlugs(this.#db);
		this.#covered = true;
	}
	keyExpr() {
		return this.#config.key?.(this.#db) ?? sql`${sql.ref(`${this.#config.table}.id`)}`;
	}
	selectList() {
		return sql.join(selectExportedColumns(this.#db, this.#columns));
	}
	decodeRaw(row) {
		const properties = decodeRow(this.#db, this.#columns, row);
		const raw = {
			kind: this.kind,
			...properties
		};
		if (this.kind === "content_term" || this.kind === "seo" || this.kind === "byline_field_value" || this.kind === "byline_field_group_value") raw.id = syntheticId(toSyntheticParts(this.kind, raw));
		return raw;
	}
	async decode(rows) {
		const raws = rows.map((row) => this.decodeRaw(row));
		await this.#config.prepare?.(raws, this.#options);
		return raws.map((raw) => toRecord(this.kind, raw));
	}
	async finish(records, paging) {
		if (!this.#config.transform) return { records };
		return this.#config.transform(records, {
			db: this.#db,
			options: this.#options,
			paging
		});
	}
	async page(after, limit) {
		await this.ensureCoverage();
		const db = this.#db;
		const table = sql.ref(this.#config.table);
		const context = {
			db,
			options: this.#options,
			slugs: this.#slugs
		};
		const filter = this.#config.filter?.(context) ?? null;
		const conditions = [];
		if (filter) conditions.push(filter);
		let result;
		if (this.#config.parentColumn) {
			const parent = sql.ref(`${this.#config.table}.${this.#config.parentColumn}`);
			const idRef = sql.ref(`${this.#config.table}.id`);
			const valid = this.#config.treeValid?.(context) ?? sql`1 = 1`;
			if (after) {
				const depth = after.depth ?? 0;
				conditions.push(sql`(__tree.__level > ${depth} OR (__tree.__level = ${depth} AND ${bytewiseExpr(db, idRef)} > ${after.id}))`);
			}
			const where = conditions.length > 0 ? sql`WHERE ${sql.join(conditions, sql` AND `)}` : sql``;
			result = await sql`
				WITH RECURSIVE __tree(__node, __level) AS (
					SELECT ${idRef}, 0 FROM ${table} WHERE ${parent} IS NULL AND ${valid}
					UNION ALL
					SELECT ${idRef}, __tree.__level + 1 FROM ${table}
					INNER JOIN __tree ON ${parent} = __tree.__node
					WHERE ${valid}
				)
				SELECT ${this.selectList()}, __tree.__level AS __depth
				FROM ${table} INNER JOIN __tree ON __tree.__node = ${idRef}
				${where}
				ORDER BY __tree.__level, ${bytewiseExpr(db, idRef)}
				LIMIT ${limit + 1}
			`.execute(db);
		} else {
			const key = this.keyExpr();
			if (after) conditions.push(sql`${bytewiseExpr(db, key)} > ${after.id}`);
			const where = conditions.length > 0 ? sql`WHERE ${sql.join(conditions, sql` AND `)}` : sql``;
			result = await sql`
				SELECT ${this.selectList()}
				FROM ${table}
				${where}
				ORDER BY ${bytewiseExpr(db, key)}
				LIMIT ${limit + 1}
			`.execute(db);
		}
		const done = result.rows.length <= limit;
		const rows = result.rows.slice(0, limit);
		const records = await this.decode(rows);
		const keys = rows.map((row, index) => {
			const id = records[index]?.id ?? "";
			return this.#config.parentColumn ? {
				id,
				depth: count$1(row.__depth)
			} : { id };
		});
		const transformed = await this.finish(records, true);
		return {
			rows: keys.map((key, index) => ({
				key,
				record: transformed.records[index] ?? null,
				adjustments: transformed.adjustments?.[index] ?? []
			})),
			done
		};
	}
	async byIds(ids) {
		await this.ensureCoverage();
		const db = this.#db;
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(ids)], 50)) {
			const rows = await sql`
				SELECT ${this.selectList()}
				FROM ${sql.ref(this.#config.table)}
				WHERE ${this.keyExpr()} IN (${sql.join(batch)})
			`.execute(db);
			const records = await this.decode(rows.rows);
			const transformed = await this.finish(records, false);
			for (const record of transformed.records) if (record) result.set(record.id, record);
		}
		return result;
	}
	async countRows() {
		const filter = this.#config.countFilter?.() ?? null;
		const where = filter ? sql`WHERE ${filter}` : sql``;
		return count$1((await sql`
			SELECT COUNT(*) AS n FROM ${sql.ref(this.#config.table)} ${where}
		`.execute(this.#db)).rows[0]?.n);
	}
};
function toSyntheticParts(kind, raw) {
	const part = (name) => stringOf(raw[name]) ?? "";
	switch (kind) {
		case "content_term": return {
			kind,
			collection: part("collection"),
			entryGroup: part("entryGroup"),
			termGroup: part("termGroup")
		};
		case "seo": return {
			kind,
			collection: part("collection"),
			entryId: part("entryId")
		};
		case "byline_field_value": return {
			kind,
			bylineId: part("bylineId"),
			fieldId: part("fieldId")
		};
		default: return {
			kind: "byline_field_group_value",
			bylineGroup: part("bylineGroup"),
			fieldId: part("fieldId")
		};
	}
}
function concatKey(...parts) {
	return () => sql.join(parts.flatMap((part, index) => index === 0 ? [sql.ref(part)] : [sql.lit(":"), sql.ref(part)]), sql` || `);
}
async function nullUnexportedMedia(records, context, property) {
	const operationId = context.options.exportOperationId;
	if (!operationId || !context.paging) return { records };
	const ids = records.flatMap((record) => {
		const value = Reflect.get(record, property);
		return typeof value === "string" ? [value] : [];
	});
	if (ids.length === 0) return { records };
	const exported = await exportedMediaIds(context.db, operationId, ids);
	const adjustments = [];
	return {
		records: records.map((record) => {
			const value = Reflect.get(record, property);
			if (typeof value !== "string" || exported.has(value)) {
				adjustments.push([]);
				return record;
			}
			adjustments.push([{
				code: "avatar_nulled",
				count: 1
			}]);
			const copy = { ...record };
			Reflect.deleteProperty(copy, property);
			return copy;
		}),
		adjustments
	};
}
async function nullMissingFolders(records, context) {
	if (!context.paging) return { records };
	const ids = [...new Set(records.flatMap((r) => r.folderId === void 0 ? [] : [r.folderId]))];
	if (ids.length === 0) return { records };
	const found = /* @__PURE__ */ new Set();
	for (const batch of chunks(ids, 50)) {
		const rows = await context.db.selectFrom("media_folders").select("id").where("id", "in", batch).execute();
		for (const row of rows) found.add(row.id);
	}
	const adjustments = [];
	return {
		records: records.map((record) => {
			if (record.folderId === void 0 || found.has(record.folderId)) {
				adjustments.push([]);
				return record;
			}
			adjustments.push([{
				code: "orphan_reference_nulled",
				count: 1
			}]);
			const { folderId: _missing, ...rest } = record;
			return rest;
		}),
		adjustments
	};
}
async function filterTaxonomyCollections(records, context) {
	if (!context.paging) return { records };
	const slugs = new Set(await collectionSlugs(context.db));
	const adjustments = [];
	return {
		records: records.map((record) => {
			const kept = record.collections?.filter((slug) => slugs.has(slug));
			if (!record.collections || !kept || kept.length === record.collections.length) {
				adjustments.push([]);
				return record;
			}
			adjustments.push([{
				code: "soft_orphan_dropped",
				count: record.collections.length - kept.length
			}]);
			return {
				...record,
				collections: kept
			};
		}),
		adjustments
	};
}
async function attachBlobs(raws, options) {
	const ids = raws.flatMap((raw) => typeof raw.id === "string" ? [raw.id] : []);
	if (ids.length === 0) return;
	const blobs = await options.mediaBlobs(ids);
	for (const raw of raws) {
		const blob = typeof raw.id === "string" ? blobs.get(raw.id) : void 0;
		if (blob !== void 0) raw.blob = blob;
	}
}
var PORTABLE_SETTINGS_FILTER = () => sql`${sql.ref("options.name")} IN (${sql.join(PORTABLE_SETTING_NAMES.map((name) => sql.lit(name)))})`;
var REDIRECT_FILTER = () => sql`(
	_emdash_redirects.source_guard = 1
	OR (
		NOT EXISTS (
			SELECT 1 FROM _emdash_redirects AS guarded
			WHERE guarded.source = _emdash_redirects.source AND guarded.source_guard = 1
		)
		AND _emdash_redirects.id = (
			SELECT MIN(first.id) FROM _emdash_redirects AS first
			WHERE first.source = _emdash_redirects.source
		)
	)
)`;
var COLLECTION_SLUGS = sql`(SELECT slug FROM _emdash_collections)`;
function tableConfig(kind) {
	const spec = getPortableTableSpecForKind(kind);
	if (!spec) throw new Error(`No table for kind ${kind}`);
	return {
		kind,
		table: spec.table
	};
}
function configFor(kind) {
	switch (kind) {
		case "block_type_version": return {
			...tableConfig(kind),
			filter: () => sql`_emdash_block_type_versions.block_type_id IN (SELECT id FROM _emdash_block_types)`
		};
		case "field": return {
			...tableConfig(kind),
			filter: () => sql`_emdash_fields.collection_id IN (SELECT id FROM _emdash_collections)`
		};
		case "taxonomy_def": return {
			...tableConfig(kind),
			transform: forKind("taxonomy_def", filterTaxonomyCollections)
		};
		case "relation": return {
			...tableConfig(kind),
			filter: () => sql`(
					_emdash_relations.parent_collection IN ${COLLECTION_SLUGS}
					AND _emdash_relations.child_collection IN ${COLLECTION_SLUGS}
				)`
		};
		case "media": return {
			...tableConfig("media"),
			filter: ({ options }) => options.exportOperationId === void 0 ? null : sql`media.id IN (
							SELECT media_id FROM _emdash_transfer_media_blobs
							WHERE operation_id = ${options.exportOperationId}
						)`,
			prepare: attachBlobs,
			transform: forKind("media", nullMissingFolders)
		};
		case "term": return {
			...tableConfig("term"),
			parentColumn: "parent_id"
		};
		case "comment": return {
			...tableConfig("comment"),
			parentColumn: "parent_id",
			treeValid: commentValid
		};
		case "comment_reaction": return {
			...tableConfig(kind),
			filter: (context) => sql`_emdash_comment_reactions.comment_id IN ${treeIds("_emdash_comments", "parent_id", commentValid(context))}`
		};
		case "menu_item": return {
			...tableConfig("menu_item"),
			parentColumn: "parent_id",
			treeValid: (context) => {
				const reference = col("_emdash_menu_items", "reference_id");
				return sql`(
						_emdash_menu_items.menu_id IN (SELECT id FROM _emdash_menus)
						AND (
							${reference} IS NULL
							OR ${groupExists("taxonomies", reference)}
							OR ${anyOf(context.slugs.map((slug) => groupExists(contentTable$1(slug), reference)))}
						)
					)`;
			}
		};
		case "byline": return {
			...tableConfig("byline"),
			transform: forKind("byline", (records, context) => nullUnexportedMedia(records, context, "avatarMediaId"))
		};
		case "section": return {
			...tableConfig("section"),
			transform: forKind("section", (records, context) => nullUnexportedMedia(records, context, "previewMediaId"))
		};
		case "byline_field_value": return {
			...tableConfig(kind),
			key: concatKey("byline_id", "field_id"),
			filter: () => sql`(
					_emdash_byline_field_values.byline_id IN (SELECT id FROM _emdash_bylines)
					AND _emdash_byline_field_values.field_id IN (SELECT id FROM _emdash_byline_fields)
				)`
		};
		case "byline_field_group_value": return {
			...tableConfig(kind),
			key: concatKey("translation_group", "field_id"),
			filter: () => sql`(
					${groupExists("_emdash_bylines", col("_emdash_byline_field_group_values", "translation_group"))}
					AND _emdash_byline_field_group_values.field_id IN (SELECT id FROM _emdash_byline_fields)
				)`
		};
		case "revision": return {
			...tableConfig(kind),
			filter: revisionValid
		};
		case "content_term": return {
			...tableConfig("content_term"),
			key: concatKey("collection", "entry_id", "taxonomy_id"),
			filter: (context) => sql`(
					${entryGroupExists(context, col("content_taxonomies", "collection"), col("content_taxonomies", "entry_id"))}
					AND ${groupExists("taxonomies", col("content_taxonomies", "taxonomy_id"))}
				)`
		};
		case "content_byline": return {
			...tableConfig(kind),
			filter: (context) => sql`(
					${entryExists(context, col("_emdash_content_bylines", "collection_slug"), col("_emdash_content_bylines", "content_id"))}
					AND ${groupExists("_emdash_bylines", col("_emdash_content_bylines", "byline_id"))}
				)`
		};
		case "content_reference": return {
			...tableConfig("content_reference"),
			filter: (context) => {
				const references = "_emdash_content_references";
				return sql`EXISTS (
						SELECT 1 FROM _emdash_relations AS __relation
						WHERE __relation.id = ${col(references, "relation_id")}
						AND ${entryGroupExists(context, sql`__relation.parent_collection`, col(references, "parent_group"))}
						AND ${entryGroupExists(context, sql`__relation.child_collection`, col(references, "child_group"))}
					)`;
			}
		};
		case "seo": return {
			...tableConfig(kind),
			key: concatKey("collection", "content_id"),
			filter: (context) => entryExists(context, col("_emdash_seo", "collection"), col("_emdash_seo", "content_id"))
		};
		case "widget": return {
			...tableConfig("widget"),
			filter: () => sql`(
					_emdash_widgets.area_id IN (SELECT id FROM _emdash_widget_areas)
					AND (
						_emdash_widgets.menu_name IS NULL
						OR _emdash_widgets.menu_name IN (SELECT name FROM _emdash_menus)
					)
				)`
		};
		case "redirect": return {
			...tableConfig(kind),
			filter: REDIRECT_FILTER
		};
		case "setting": return {
			...tableConfig(kind),
			key: () => sql`${sql.ref("options.name")}`,
			filter: PORTABLE_SETTINGS_FILTER,
			countFilter: PORTABLE_SETTINGS_FILTER
		};
		default: return tableConfig(kind);
	}
}
var EntryReader = class {
	kind = "entry";
	#db;
	#fields = null;
	#collections = /* @__PURE__ */ new Map();
	constructor(db) {
		this.#db = db;
	}
	/** Registered fields of every collection, by collection slug, in one query. */
	fields() {
		this.#fields ??= this.#db.selectFrom("_emdash_collections").leftJoin("_emdash_fields", "_emdash_fields.collection_id", "_emdash_collections.id").select([
			"_emdash_collections.slug as collection",
			"_emdash_fields.slug as slug",
			"_emdash_fields.column_type as column_type",
			"_emdash_fields.type as type",
			"_emdash_fields.validation as validation"
		]).execute().then((rows) => {
			const fields = /* @__PURE__ */ new Map();
			for (const row of rows) {
				const list = fields.get(row.collection) ?? [];
				if (row.slug !== null && row.column_type !== null && row.type !== null) list.push({
					slug: row.slug,
					column_type: row.column_type,
					type: row.type,
					validation: row.validation
				});
				fields.set(row.collection, list);
			}
			return fields;
		});
		return this.#fields;
	}
	async slugs() {
		return [...(await this.fields()).keys()].toSorted();
	}
	/** A collection's table and column specs, loaded once and checked for coverage. */
	collection(slug) {
		let pending = this.#collections.get(slug);
		if (!pending) {
			pending = (async () => {
				const table = contentTable$1(slug);
				const fields = (await this.fields()).get(slug) ?? [];
				const tableColumns = await listTableColumns(this.#db, table);
				const columns = contentColumnSpecs(fields, tableColumns);
				assertLoadedColumnCoverage(table, columns, tableColumns);
				return {
					slug,
					table,
					columns
				};
			})();
			this.#collections.set(slug, pending);
		}
		return pending;
	}
	async collections() {
		const result = [];
		for (const slug of await this.slugs()) result.push(await this.collection(slug));
		return result;
	}
	decode(collection, row) {
		const { properties, fields } = decodeContentRow(this.#db, collection.columns, row);
		return toRecord("entry", {
			kind: "entry",
			collection: collection.slug,
			...properties,
			fields
		});
	}
	selectList(collection) {
		return sql.join(selectExportedColumns(this.#db, collection.columns));
	}
	async page(after, limit) {
		const db = this.#db;
		const merged = [];
		for (const collection of await this.collections()) {
			const idRef = sql.ref(`${collection.table}.id`);
			const where = after ? sql`WHERE ${bytewiseExpr(db, idRef)} > ${after.id}` : sql``;
			const result = await sql`
				SELECT ${this.selectList(collection)}
				FROM ${sql.ref(collection.table)}
				${where}
				ORDER BY ${bytewiseExpr(db, idRef)}
				LIMIT ${limit + 1}
			`.execute(db);
			for (const row of result.rows) merged.push(this.decode(collection, row));
		}
		merged.sort((a, b) => compareStreamOrder("entry", a, b));
		const page = merged.slice(0, limit);
		return {
			rows: (await this.nullMissingReferences(page)).map(({ record, adjustments }) => ({
				key: { id: record.id },
				record,
				adjustments
			})),
			done: merged.length <= limit
		};
	}
	/**
	* Remove revision pointers to revisions an export leaves out and primary
	* bylines that do not exist, keeping the entry.
	*/
	async nullMissingReferences(records) {
		const db = this.#db;
		const revisionIds = [...new Set(records.flatMap((record) => [record.liveRevisionId, record.draftRevisionId].filter((id) => id !== void 0)))];
		const revisions = /* @__PURE__ */ new Set();
		const context = {
			db,
			options: { mediaBlobs: async () => /* @__PURE__ */ new Map() },
			slugs: await this.slugs()
		};
		for (const batch of chunks(revisionIds, 50)) {
			const rows = await sql`
				SELECT id FROM revisions
				WHERE id IN (${sql.join(batch)}) AND ${revisionValid(context)}
			`.execute(db);
			for (const row of rows.rows) revisions.add(row.id);
		}
		const bylineGroups = await existingGroups(db, "_emdash_bylines", records.flatMap((record) => record.primaryBylineGroup === void 0 ? [] : [record.primaryBylineGroup]));
		return records.map((record) => {
			const next = { ...record };
			let nulled = 0;
			for (const property of ["liveRevisionId", "draftRevisionId"]) {
				const id = record[property];
				if (id !== void 0 && !revisions.has(id)) {
					delete next[property];
					nulled++;
				}
			}
			if (record.primaryBylineGroup !== void 0 && !bylineGroups.has(record.primaryBylineGroup)) {
				delete next.primaryBylineGroup;
				nulled++;
			}
			if (nulled === 0) return {
				record,
				adjustments: []
			};
			return {
				record: toRecord("entry", next),
				adjustments: [{
					code: "orphan_reference_nulled",
					count: nulled
				}]
			};
		});
	}
	async byIds(ids, collections) {
		const slugs = new Set(await this.slugs());
		const bySlug = /* @__PURE__ */ new Map();
		const anywhere = [];
		for (const id of new Set(ids)) {
			const slug = collections?.get(id);
			if (slug === void 0) anywhere.push(id);
			else if (slugs.has(slug)) {
				const list = bySlug.get(slug) ?? [];
				list.push(id);
				bySlug.set(slug, list);
			}
		}
		if (anywhere.length > 0) for (const slug of slugs) bySlug.set(slug, [...bySlug.get(slug) ?? [], ...anywhere]);
		const result = /* @__PURE__ */ new Map();
		for (const [slug, slugIds] of bySlug) {
			const collection = await this.collection(slug);
			for (const batch of chunks(slugIds, 50)) {
				const rows = await sql`
					SELECT ${this.selectList(collection)}
					FROM ${sql.ref(collection.table)}
					WHERE ${sql.ref(`${collection.table}.id`)} IN (${sql.join(batch)})
				`.execute(this.#db);
				for (const row of rows.rows) {
					const record = this.decode(collection, row);
					result.set(record.id, record);
				}
			}
		}
		return result;
	}
	async countRows() {
		let total = 0;
		for (const collection of await this.collections()) {
			const result = await sql`
				SELECT COUNT(*) AS n FROM ${sql.ref(collection.table)}
			`.execute(this.#db);
			total += count$1(result.rows[0]?.n);
		}
		return total;
	}
};
/**
* Principals are the origin users referenced by exported rows. Nothing but
* the id, name, and email of a user ever leaves the `users` table.
*/
var PrincipalReader = class {
	kind = "principal";
	#db;
	#options;
	constructor(db, options) {
		this.#db = db;
		this.#options = options;
	}
	async sources() {
		const sources = [];
		const slugs = await collectionSlugs(this.#db);
		const context = {
			db: this.#db,
			options: this.#options,
			slugs
		};
		for (const slug of slugs) sources.push({
			table: contentTable$1(slug),
			column: "author_id"
		});
		sources.push({
			table: "revisions",
			column: "author_id",
			filter: revisionValid(context)
		});
		const operationId = this.#options.exportOperationId;
		sources.push({
			table: "media",
			column: "author_id",
			filter: operationId === void 0 ? void 0 : sql`media.id IN (
						SELECT media_id FROM _emdash_transfer_media_blobs WHERE operation_id = ${operationId}
					)`
		});
		sources.push({
			table: "_emdash_bylines",
			column: "user_id"
		});
		if (this.#options.comments ?? true) sources.push({
			table: "_emdash_comments",
			column: "author_user_id",
			filter: sql`_emdash_comments.id IN ${treeIds("_emdash_comments", "parent_id", commentValid(context))}`
		});
		return sources;
	}
	async page(after, limit) {
		const db = this.#db;
		const ids = /* @__PURE__ */ new Set();
		for (const source of await this.sources()) {
			const column = sql.ref(`${source.table}.${source.column}`);
			const conditions = [sql`${column} IS NOT NULL`];
			if (after) conditions.push(sql`${bytewiseExpr(db, column)} > ${after.id}`);
			if (source.filter) conditions.push(source.filter);
			const result = await sql`
				SELECT ${column} AS id FROM ${sql.ref(source.table)}
				WHERE ${sql.join(conditions, sql` AND `)}
				GROUP BY ${column}
				ORDER BY ${bytewiseExpr(db, column)}
				LIMIT ${limit + 1}
			`.execute(db);
			for (const row of result.rows) ids.add(row.id);
		}
		const sorted = [...ids].toSorted((a, b) => compareStreamOrder("principal", { id: a }, { id: b }));
		const pageIds = sorted.slice(0, limit);
		const records = await this.byIds(pageIds);
		return {
			rows: pageIds.map((id) => ({
				key: { id },
				record: records.get(id) ?? toRecord("principal", {
					kind: "principal",
					id,
					displayName: ""
				}),
				adjustments: []
			})),
			done: sorted.length <= limit
		};
	}
	async byIds(ids) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(ids)], 50)) {
			const rows = await this.#db.selectFrom("users").select([
				"id",
				"name",
				"email"
			]).where("id", "in", batch).execute();
			for (const row of rows) result.set(row.id, toRecord("principal", {
				kind: "principal",
				id: row.id,
				displayName: row.name || row.email,
				email: row.email
			}));
		}
		return result;
	}
	async countRows() {
		return null;
	}
};
function createReader(db, kind, options) {
	if (kind === "entry") return new EntryReader(db);
	if (kind === "principal") return new PrincipalReader(db, options);
	return new TableReader(db, configFor(kind), options);
}
var encoder = new TextEncoder();
var PAGE_ROWS = 250;
var MEDIA_CANDIDATES_PER_PAGE = 50;
/** Sorts after every `index/<seq>.ndjson` path and before `media/`. */
var INDEX_PATHS_END = "index/~";
var exportOptionsSchema = z.strictObject({ comments: z.boolean().optional() });
function includesComments(options) {
	return exportOptionsSchema.parse(options ?? {}).comments ?? true;
}
/**
* Create a pending export operation, or return the existing one for the same
* idempotency key. Reusing a key with different options fails with
* `TRANSFER_IDEMPOTENCY_CONFLICT`.
*/
async function createExport(input) {
	const options = exportOptionsSchema.parse(input.options ?? {});
	const result = await new TransferOperationRepository(input.db).create({
		kind: "export",
		createdBy: input.createdBy,
		idempotencyKey: input.idempotencyKey,
		options
	});
	if (!result.created && includesComments(result.operation.options) !== includesComments(options)) throw new TransferError("TRANSFER_IDEMPOTENCY_CONFLICT", "Idempotency key was already used for an export with different options");
	return result;
}
var count = z.number().int().nonnegative();
var exportSummarySchema = z.strictObject({
	chunks: z.record(z.string(), z.array(count)),
	locales: z.array(z.string()),
	trash: z.boolean(),
	adjustments: z.record(z.string(), count),
	fenceVerified: z.boolean(),
	index: z.array(indexChunkRefSchema),
	files: z.strictObject({
		count,
		bytes: count
	})
});
function emptySummary() {
	return {
		chunks: {},
		locales: [],
		trash: false,
		adjustments: {},
		fenceVerified: false,
		index: [],
		files: {
			count: 0,
			bytes: 0
		}
	};
}
function readSummary(value) {
	return value === void 0 ? emptySummary() : exportSummarySchema.parse(value);
}
function recordsWritten(summary) {
	let total = 0;
	for (const counts of Object.values(summary.chunks)) for (const records of counts) total += records;
	return total;
}
var validationSchema = z.strictObject({
	phase: z.literal("validator"),
	state: z.json().nullable()
});
function addAdjustment(summary, code, kind, amount) {
	if (amount <= 0) return;
	const key = `${code}:${kind}`;
	summary.adjustments[key] = (summary.adjustments[key] ?? 0) + amount;
}
/** Rows a reader leaves out of each kind, and how the package declares them. */
var DROP_CODES = {
	field: "orphan_dropped",
	relation: "orphan_dropped",
	term: "orphan_dropped",
	byline_field_value: "orphan_dropped",
	byline_field_group_value: "orphan_dropped",
	revision: "orphan_dropped",
	content_byline: "orphan_dropped",
	seo: "orphan_dropped",
	comment: "orphan_dropped",
	comment_reaction: "orphan_dropped",
	menu_item: "soft_orphan_dropped",
	content_term: "soft_orphan_dropped",
	content_reference: "soft_orphan_dropped",
	widget: "soft_orphan_dropped",
	redirect: "redirect_duplicate_dropped",
	media: "media_not_ready_dropped"
};
/** Codes a later step may not hit again. */
var TRANSIENT_CODES = /* @__PURE__ */ new Set(["TRANSFER_STORAGE_ERROR", "TRANSFER_LEASE_LOST"]);
/**
* Run one bounded step of an export. Transient failures (storage errors,
* a lost lease, non-transfer errors) release the lease and rethrow so a
* later call resumes from the last persisted cursor; any other transfer
* error fails the operation.
*/
async function advanceExport(input) {
	const operations = new TransferOperationRepository(input.db);
	let operation;
	let leaseToken = input.leaseToken;
	if (leaseToken === void 0) {
		const claim = await operations.claim(input.operationId, ["pending", "running"]);
		if (claim.outcome === "lease_active") return {
			operation: claim.operation,
			outcome: "busy"
		};
		if (claim.outcome === "invalid_state") return {
			operation: claim.operation,
			outcome: "finished"
		};
		operation = claim.operation;
		leaseToken = claim.leaseToken;
	} else {
		operation = await operations.require(input.operationId);
		if (operation.kind !== "export" || operation.leaseToken !== leaseToken) throw new TransferError("TRANSFER_LEASE_LOST", "Transfer operation lease was lost");
	}
	if (operation.kind !== "export") {
		await operations.release(operation.id, leaseToken);
		throw new TransferError("TRANSFER_INVALID_STATE", "Operation is not an export");
	}
	const step = new ExportStep(input, operation, leaseToken);
	try {
		return await step.run();
	} catch (error) {
		if (isTransferError(error) && !TRANSIENT_CODES.has(error.code)) return {
			operation: await operations.fail(operation.id, leaseToken, {
				code: error.code,
				detail: error.detail
			}),
			outcome: "failed"
		};
		if (!(isTransferError(error) && error.code === "TRANSFER_LEASE_LOST")) await operations.release(operation.id, leaseToken).catch(() => void 0);
		throw error;
	}
}
var ExportStep = class {
	#input;
	#db;
	#operations;
	#stagedFiles;
	#blobs;
	#budget;
	#stage;
	#writer;
	#options;
	#leaseToken;
	#operation;
	#keys = null;
	#scannable = null;
	#readers = /* @__PURE__ */ new Map();
	#packageReader = null;
	#mediaExported = /* @__PURE__ */ new Map();
	constructor(input, operation, leaseToken) {
		this.#input = input;
		this.#db = input.db;
		this.#operation = operation;
		this.#leaseToken = leaseToken;
		this.#operations = new TransferOperationRepository(input.db);
		this.#stagedFiles = new TransferStagedFileRepository(input.db);
		this.#blobs = new TransferMediaBlobRepository(input.db, operation.id);
		this.#budget = input.budget ?? new TransferStepBudget();
		this.#stage = new TransferStage(input.storage, stagingPrefix("export", operation.id, operation.stagingSecret));
		this.#writer = new StagedPackageWriter(this.#stage);
		this.#options = exportOptionsSchema.parse(operation.options ?? {});
	}
	get #comments() {
		return this.#options.comments ?? true;
	}
	async run() {
		let cursor = this.currentCursor();
		if (cursor === null) {
			cursor = await this.start(1);
			await this.persist(cursor, "running");
		}
		for (;;) {
			const result = await this.unit(cursor);
			switch (result.type) {
				case "yield": return {
					operation: await this.#operations.release(this.#operation.id, this.#leaseToken),
					outcome: "advanced"
				};
				case "complete": {
					const total = this.progressTotal();
					const last = this.#operation.progress;
					return {
						operation: await this.#operations.complete(this.#operation.id, this.#leaseToken, {
							ttlSeconds: TRANSFER_LIMITS.exportTtlSeconds,
							progress: {
								...last,
								done: total,
								total,
								...last?.bytesDone === void 0 ? {} : { bytesTotal: last.bytesDone }
							}
						}),
						outcome: "complete"
					};
				}
				case "fail": return {
					operation: await this.#operations.fail(this.#operation.id, this.#leaseToken, {
						code: result.code,
						detail: result.detail
					}),
					outcome: "failed"
				};
				case "cursor":
					cursor = result.cursor;
					if (result.endStep) return {
						operation: await this.#operations.release(this.#operation.id, this.#leaseToken, {
							cursor,
							stage: cursor.stage,
							progress: this.progressFor(cursor)
						}),
						outcome: "advanced"
					};
					await this.persist(cursor);
			}
		}
	}
	currentCursor() {
		const cursor = this.#operation.cursor;
		if (cursor === null) return null;
		switch (cursor.stage) {
			case "export_records":
			case "export_media":
			case "export_finalize":
			case "export_validate": return cursor;
			default: throw new TransferError("TRANSFER_INVALID_STATE", "Export cursor is not an export stage");
		}
	}
	async persist(cursor, state) {
		this.#operation = await this.#operations.advance(this.#operation.id, this.#leaseToken, {
			cursor,
			stage: cursor.stage,
			progress: this.progressFor(cursor),
			...state ? { state } : {}
		});
	}
	/** Media, each exported record kind, finalize, and validate. */
	progressTotal() {
		return this.exportedKinds().length + 3;
	}
	progressFor(cursor) {
		const kinds = this.exportedKinds();
		const total = this.progressTotal();
		switch (cursor.stage) {
			case "export_media": return {
				done: 0,
				total,
				records: 0
			};
			case "export_records": return {
				done: 1 + kinds.indexOf(cursor.kind),
				total,
				records: recordsWritten(readSummary(cursor.summary))
			};
			case "export_finalize": {
				const summary = readSummary(cursor.summary);
				return {
					done: 1 + kinds.length,
					total,
					records: recordsWritten(summary),
					bytesDone: summary.files.bytes
				};
			}
			case "export_validate": return {
				...this.#operation.progress,
				done: 2 + kinds.length,
				total
			};
		}
	}
	/** Capture the fence and start an attempt at the media stage. */
	async start(attempt) {
		return {
			stage: "export_media",
			attempt,
			fence: await captureFence(this.#db, this.#operation.writeEpoch),
			afterMediaId: null,
			summary: emptySummary()
		};
	}
	async unit(cursor) {
		switch (cursor.stage) {
			case "export_media": return this.restartOnChangedFile(cursor.attempt, () => this.mediaUnit(cursor));
			case "export_records": return this.restartOnChangedFile(cursor.attempt, () => this.recordsUnit(cursor));
			case "export_finalize": return this.finalizeUnit(cursor);
			case "export_validate": return this.validateUnit(cursor);
		}
	}
	/**
	* A file this attempt already staged under the same path with other bytes
	* means the site changed since it was written (the step that wrote it did
	* not persist its cursor): start a new attempt.
	*/
	async restartOnChangedFile(attempt, run) {
		try {
			return await run();
		} catch (error) {
			if (isTransferError(error) && error.code === "TRANSFER_FILE_DIGEST_MISMATCH") return this.restart(attempt);
			throw error;
		}
	}
	async mediaUnit(cursor) {
		if (!this.#budget.canStart()) return { type: "yield" };
		this.#budget.start();
		const candidates = await listMediaCandidates(this.#db, cursor.afterMediaId, MEDIA_CANDIDATES_PER_PAGE);
		if (candidates.length === 0) return {
			type: "cursor",
			cursor: {
				stage: "export_records",
				attempt: cursor.attempt,
				fence: cursor.fence,
				kind: RECORD_KINDS[0],
				after: null,
				nextSeq: 0,
				summary: cursor.summary
			}
		};
		let after = cursor.afterMediaId;
		for (const candidate of candidates) {
			const first = this.#budget.bytesUsed === 0;
			if (!first && !this.#budget.canStart({
				queries: 5,
				bytes: 1
			})) break;
			const hashed = await hashStoredObject(this.#input.storage, candidate.storageKey, { maxBytes: first ? void 0 : this.#budget.remaining().bytes });
			if (hashed === "too_large") break;
			this.#budget.start(hashed?.bytes ?? 0);
			if (hashed === null) {
				if (candidate.status === "ready") throw new TransferError("TRANSFER_MEDIA_BLOB_MISSING", "Media file is missing from storage", { detail: { mediaId: candidate.id } });
			} else {
				await this.#blobs.putMany([{
					mediaId: candidate.id,
					sha256: hashed.sha256,
					bytes: hashed.bytes
				}]);
				await this.#stagedFiles.declareMany(this.#operation.id, [{
					path: mediaBlobPath(hashed.sha256),
					bytes: hashed.bytes,
					sha256: hashed.sha256
				}], "verified");
			}
			after = candidate.id;
		}
		if (after === cursor.afterMediaId) return { type: "yield" };
		return {
			type: "cursor",
			cursor: {
				...cursor,
				afterMediaId: after
			}
		};
	}
	reader(kind) {
		let reader = this.#readers.get(kind);
		if (!reader) {
			const options = {
				exportOperationId: this.#operation.id,
				comments: this.#comments,
				mediaBlobs: async (ids) => {
					const entries = await this.#blobs.getMany(ids);
					return new Map(Array.from(entries, ([id, entry]) => [id, entry.sha256]));
				}
			};
			reader = createReader(this.#db, kind, options);
			this.#readers.set(kind, reader);
		}
		return reader;
	}
	/** Media ids among `ids` that this export did not hash (not in the package). */
	async unexportedMedia(ids) {
		const unknown = ids.filter((id) => !this.#mediaExported.has(id));
		if (unknown.length > 0) {
			const exported = await this.#blobs.getMany(unknown);
			for (const id of unknown) this.#mediaExported.set(id, exported.has(id));
		}
		return new Set(ids.filter((id) => this.#mediaExported.get(id) === false));
	}
	async keyIndex() {
		if (!this.#keys || !this.#scannable) {
			this.#keys = await loadMediaKeyIndex(this.#db);
			this.#scannable = scannableKeys(this.#keys);
		}
		return {
			keys: this.#keys,
			scannable: this.#scannable
		};
	}
	exportedKinds() {
		return RECORD_KINDS.filter((kind) => this.#comments || kind !== "comment" && kind !== "comment_reaction");
	}
	nextKind(kind) {
		const kinds = this.exportedKinds();
		return kinds[kinds.indexOf(kind) + 1] ?? null;
	}
	async recordsUnit(cursor) {
		if (!this.#budget.canStart({ bytes: 1 })) return { type: "yield" };
		const summary = readSummary(cursor.summary);
		const { keys, scannable } = await this.keyIndex();
		const reader = this.reader(cursor.kind);
		const records = [];
		const lines = [];
		const locales = new Set(summary.locales);
		let bytes = 0;
		let after = cursor.after;
		let kindDone = false;
		fill: while (records.length < TRANSFER_LIMITS.chunkRecords) {
			const page = await reader.page(after, Math.min(PAGE_ROWS, TRANSFER_LIMITS.chunkRecords - records.length));
			for (const row of page.rows) {
				if (row.record === null) {
					after = row.key;
					continue;
				}
				const rewritten = rewriteMediaRefs(row.record, {
					mode: "export",
					keys,
					relativize: true
				});
				const error = rewritten.errors[0];
				if (error) throw new TransferError("TRANSFER_MEDIA_REF_INVALID", "Record holds a media reference that cannot be exported", { detail: {
					kind: cursor.kind,
					id: row.record.id,
					reason: error.code,
					path: error.path
				} });
				const unlinked = unlinkMediaPlaceholders(rewritten.value, await this.unexportedMedia(rewritten.mediaIds));
				const record = unlinked.record;
				const line = encodeRecordLine(record);
				if (scanForKeys(line, scannable).length > 0) throw new TransferError("TRANSFER_MEDIA_REF_INVALID", "Record still holds an origin storage key", { detail: {
					kind: cursor.kind,
					id: record.id
				} });
				const lineBytes = encoder.encode(line).byteLength + 1;
				if (records.length > 0 && bytes + lineBytes > TRANSFER_LIMITS.chunkBytes) break fill;
				records.push(record);
				lines.push(line);
				bytes += lineBytes;
				after = row.key;
				for (const adjustment of row.adjustments) addAdjustment(summary, adjustment.code, cursor.kind, adjustment.count);
				addAdjustment(summary, "media_url_relativized", cursor.kind, rewritten.relativized);
				addAdjustment(summary, "media_ref_unlinked", cursor.kind, unlinked.count);
				if (rewritten.warnings.some((warning) => warning.code === "unknown_storage_key")) addAdjustment(summary, "unknown_storage_key", cursor.kind, 1);
				if ("locale" in record && typeof record.locale === "string") locales.add(record.locale);
				if (record.kind === "entry" && record.deletedAt !== void 0) summary.trash = true;
			}
			if (page.done) {
				kindDone = true;
				break;
			}
		}
		if (records.length > 0) {
			const entry = await this.#writer.writeRecordChunk(cursor.kind, cursor.nextSeq, records);
			await this.#stagedFiles.declareMany(this.#operation.id, [{
				path: entry.path,
				bytes: entry.bytes,
				sha256: entry.sha256
			}], "verified");
			this.#budget.start(entry.bytes);
			summary.chunks[cursor.kind] = [...summary.chunks[cursor.kind] ?? [], records.length];
		} else this.#budget.start(0);
		summary.locales = [...locales].toSorted(compareUtf16);
		const nextSeq = records.length > 0 ? cursor.nextSeq + 1 : cursor.nextSeq;
		if (!kindDone) return {
			type: "cursor",
			cursor: {
				...cursor,
				after,
				nextSeq,
				summary
			}
		};
		const next = this.nextKind(cursor.kind);
		if (next === null) return {
			type: "cursor",
			cursor: {
				stage: "export_finalize",
				attempt: cursor.attempt,
				fence: cursor.fence,
				nextIndexSeq: 0,
				afterPath: null,
				summary
			}
		};
		return {
			type: "cursor",
			cursor: {
				...cursor,
				kind: next,
				after: null,
				nextSeq: 0,
				summary
			}
		};
	}
	async finalizeUnit(cursor) {
		if (!this.#budget.canStart()) return { type: "yield" };
		this.#budget.start();
		const summary = readSummary(cursor.summary);
		if (!summary.fenceVerified) {
			const current = await this.#operations.require(this.#operation.id);
			const fence = await captureFence(this.#db, current.writeEpoch);
			if (!fencesEqual(cursor.fence, fence)) return this.restart(cursor.attempt);
			await this.declareDrops(summary);
			summary.fenceVerified = true;
			return {
				type: "cursor",
				cursor: {
					...cursor,
					summary
				}
			};
		}
		const files = await this.#stagedFiles.list(this.#operation.id, {
			state: "verified",
			after: cursor.afterPath ?? INDEX_PATHS_END,
			limit: TRANSFER_LIMITS.chunkRecords
		});
		const entries = [];
		let bytes = 0;
		for (const file of files) {
			const parsed = parsePackagePath(file.path);
			if (!parsed || parsed.type !== "records" && parsed.type !== "media") continue;
			const entry = {
				path: file.path,
				bytes: file.bytes,
				sha256: file.sha256
			};
			if (parsed.type === "records") {
				const records = summary.chunks[parsed.kind]?.[parsed.seq];
				if (records === void 0) throw new TransferError("TRANSFER_EXPORT_ERROR", "Staged chunk is not part of the export", { detail: { path: file.path } });
				entry.records = records;
			}
			const size = encoder.encode(JSON.stringify(entry)).byteLength + 1;
			if (entries.length > 0 && bytes + size > TRANSFER_LIMITS.chunkBytes) break;
			entries.push(entry);
			bytes += size;
		}
		const lastEntry = entries.at(-1);
		if (lastEntry) {
			const ref = await this.#writer.writeIndexChunk(cursor.nextIndexSeq, entries);
			await this.#stagedFiles.declareMany(this.#operation.id, [{
				path: ref.path,
				bytes: ref.bytes,
				sha256: ref.sha256
			}], "verified");
			summary.index = [...summary.index, ref];
			summary.files = {
				count: summary.files.count + entries.length,
				bytes: summary.files.bytes + entries.reduce((sum, entry) => sum + entry.bytes, 0)
			};
			return {
				type: "cursor",
				cursor: {
					...cursor,
					nextIndexSeq: cursor.nextIndexSeq + 1,
					afterPath: lastEntry.path,
					summary
				}
			};
		}
		const manifest = await this.buildManifest(summary, cursor.attempt);
		const digest = await this.#writer.writeManifest(manifest);
		this.#operation = await this.#operations.advance(this.#operation.id, this.#leaseToken, { packageDigest: digest });
		return {
			type: "cursor",
			cursor: {
				stage: "export_validate",
				position: null
			}
		};
	}
	async declareDrops(summary) {
		for (const kind of this.exportedKinds()) {
			const rows = await this.reader(kind).countRows();
			if (rows === null) continue;
			const exported = (summary.chunks[kind] ?? []).reduce((sum, n) => sum + n, 0);
			const dropped = rows - exported;
			if (dropped === 0) continue;
			const code = DROP_CODES[kind];
			if (!code || dropped < 0) throw new TransferError("TRANSFER_EXPORT_ERROR", "Rows could not be exported", { detail: {
				kind,
				rows,
				exported
			} });
			addAdjustment(summary, code, kind, dropped);
		}
	}
	async restart(attempt) {
		if (attempt >= TRANSFER_LIMITS.exportFenceAttempts) return {
			type: "fail",
			code: "TRANSFER_EXPORT_CONCURRENT_WRITES",
			detail: { attempts: attempt }
		};
		let deleted;
		do
			deleted = await this.#stagedFiles.deleteForOperation(this.#operation.id);
		while (deleted > 0);
		await this.#db.deleteFrom("_emdash_transfer_media_blobs").where("operation_id", "=", this.#operation.id).execute();
		this.#operation = await this.#operations.require(this.#operation.id);
		return {
			type: "cursor",
			cursor: await this.start(attempt + 1)
		};
	}
	async buildManifest(summary, attempts) {
		const totals = await this.#blobs.totals();
		const features = /* @__PURE__ */ new Set();
		const records = {};
		for (const kind of RECORD_KINDS) {
			const chunks = summary.chunks[kind];
			if (!chunks || chunks.length === 0) continue;
			records[kind] = {
				count: chunks.reduce((sum, n) => sum + n, 0),
				chunks: chunks.length
			};
			features.add(KIND_FEATURE[kind]);
		}
		if (this.#comments) features.add("comments");
		if (totals.blobs > 0) features.add("media");
		const defaultLocale = this.#input.defaultLocale ?? getI18nConfig()?.defaultLocale ?? summary.locales[0] ?? "en";
		const locales = /* @__PURE__ */ new Set([...summary.locales, defaultLocale]);
		if (locales.size > 1) features.add("i18n");
		if (summary.trash) features.add("trash");
		const featureList = [...features].toSorted(compareUtf16);
		const transformations = [];
		for (const [key, amount] of Object.entries(summary.adjustments)) {
			const [code, kind] = key.split(":");
			const known = EXPORT_TRANSFORMATION_CODES.find((candidate) => candidate === code);
			const recordKind = RECORD_KINDS.find((candidate) => candidate === kind);
			if (!known || !recordKind || amount === 0) continue;
			transformations.push({
				code: known,
				kind: recordKind,
				count: amount
			});
		}
		transformations.sort((a, b) => compareUtf16(a.code, b.code) || compareUtf16(a.kind, b.kind));
		return {
			format: SITE_PACKAGE_FORMAT,
			formatVersion: "1",
			packageId: ulid(),
			originSiteId: await getOrCreateSiteId(this.#db),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			createdByEmDashVersion: this.#input.emdashVersion ?? "1.4.0",
			profile: SITE_PACKAGE_PROFILE,
			features: featureList,
			requiredFeatures: requiredFeaturesFor(featureList),
			locales: {
				default: defaultLocale,
				used: [...locales].toSorted(compareUtf16)
			},
			records,
			media: {
				count: totals.blobs,
				totalBytes: totals.blobBytes
			},
			files: {
				count: summary.files.count,
				totalBytes: summary.files.bytes
			},
			index: summary.index,
			transformations,
			fence: { attempts }
		};
	}
	packageReader() {
		this.#packageReader ??= new ExportPackageReader(this.#stage, this.#db, this.#input.storage, this.#operation.id);
		return this.#packageReader;
	}
	async validateUnit(cursor) {
		const reader = this.packageReader();
		if (cursor.validation === void 0) {
			const manifest = await reader.manifest();
			const position = cursor.position ?? firstChunk(manifest);
			if (position === null) return {
				type: "cursor",
				cursor: {
					...cursor,
					position: null,
					validation: {
						phase: "validator",
						state: null
					}
				}
			};
			const path = recordChunkPath(position.kind, position.seq);
			const staged = await this.#stagedFiles.get(this.#operation.id, path);
			if (!staged) throw new TransferError("TRANSFER_FILE_MISSING", "Record chunk was not staged", { detail: { path } });
			if (!this.#budget.canStart({ bytes: staged.bytes })) return { type: "yield" };
			this.#budget.start(staged.bytes);
			const { scannable } = await this.keyIndex();
			const chunk = await reader.readChunk(position.kind, position.seq, staged);
			for (const record of chunk) if (scanForKeys(record.line, scannable).length > 0) throw new TransferError("TRANSFER_MEDIA_REF_INVALID", "Package holds an origin storage key", { detail: {
				kind: position.kind,
				id: record.record.id
			} });
			const next = nextChunk(manifest, position);
			return {
				type: "cursor",
				cursor: next === null ? {
					...cursor,
					position: null,
					validation: {
						phase: "validator",
						state: null
					}
				} : {
					...cursor,
					position: next
				}
			};
		}
		const validation = validationSchema.parse(cursor.validation);
		const validate = this.#input.validatePackage;
		if (!validate) return { type: "complete" };
		if (this.#budget.units > 0 || !this.#budget.canStart()) return { type: "yield" };
		const result = await validate({
			db: this.#db,
			reader,
			operationId: this.#operation.id,
			state: validation.state,
			budget: this.#budget
		});
		const blocker = result.blockers[0];
		if (blocker) return {
			type: "fail",
			code: "TRANSFER_EXPORT_ERROR",
			detail: {
				reason: "package_invalid",
				blocker: blocker.code,
				kind: blocker.kind ?? null,
				id: blocker.id ?? null
			}
		};
		if (result.done) return { type: "complete" };
		return {
			type: "cursor",
			cursor: {
				...cursor,
				validation: {
					phase: "validator",
					state: z.json().parse(result.state ?? null)
				}
			},
			endStep: true
		};
	}
};
function firstChunk(manifest) {
	for (const kind of RECORD_KINDS) if ((manifest.records[kind]?.chunks ?? 0) > 0) return {
		kind,
		seq: 0,
		line: 0
	};
	return null;
}
function nextChunk(manifest, position) {
	if (position.seq + 1 < (manifest.records[position.kind]?.chunks ?? 0)) return {
		kind: position.kind,
		seq: position.seq + 1,
		line: 0
	};
	for (const kind of RECORD_KINDS.slice(RECORD_KINDS.indexOf(position.kind) + 1)) if ((manifest.records[kind]?.chunks ?? 0) > 0) return {
		kind,
		seq: 0,
		line: 0
	};
	return null;
}
/**
* Reader over an export's staging area. Record and index chunks come from
* staging; `media/<sha256>` streams from the origin object of a media row
* hashed to that digest.
*/
var ExportPackageReader = class extends StagedPackageReader {
	#db;
	#storage;
	#operationId;
	constructor(stage, db, storage, operationId) {
		super(stage);
		this.#db = db;
		this.#storage = storage;
		this.#operationId = operationId;
	}
	async blob(sha256) {
		const row = await this.#db.selectFrom("_emdash_transfer_media_blobs").innerJoin("media", "media.id", "_emdash_transfer_media_blobs.media_id").select(["media.storage_key as storage_key"]).where("_emdash_transfer_media_blobs.operation_id", "=", this.#operationId).where("_emdash_transfer_media_blobs.sha256", "=", sha256).orderBy("_emdash_transfer_media_blobs.media_id").executeTakeFirst();
		if (!row) throw new TransferError("TRANSFER_FILE_MISSING", "Blob is not part of this export", { detail: { path: mediaBlobPath(sha256) } });
		try {
			return (await this.#storage.download(row.storage_key)).body;
		} catch (error) {
			throw new TransferError("TRANSFER_MEDIA_BLOB_MISSING", "Media file is missing from storage", {
				detail: { path: mediaBlobPath(sha256) },
				cause: error
			});
		}
	}
};
/** Open a completed (or finalized) export's package for reading. */
function openExportPackage(input) {
	return new ExportPackageReader(new TransferStage(input.storage, stagingPrefix("export", input.operation.id, input.operation.stagingSecret)), input.db, input.storage, input.operation.id);
}
/**
* `(operation, kind, portableId) → targetId` mappings for one import.
*
* Portable ids are written verbatim whenever possible, and a verbatim id
* needs no row. Rows exist only for rewritten ids and for derived target
* values (media storage keys, recorded under kind `media_storage_key`).
* Mappings are scoped to the import operation, so a later import of the same
* origin after an abandoned one starts with a clean namespace.
* `origin_site_id` is recorded for diagnostics only.
*/
/** Identity-map kind for a media row's target storage key. */
var MEDIA_STORAGE_KEY_ENTITY = "media_storage_key";
var TransferIdentityMapRepository = class {
	constructor(db, originSiteId, operationId) {
		this.db = db;
		this.originSiteId = originSiteId;
		this.operationId = operationId;
	}
	/**
	* Record mappings; re-recording the same mapping is a no-op. Throws
	* `TRANSFER_REFERENCE_INVALID` if a portable id is already mapped to a
	* different target id in this operation.
	*/
	async putMany(entityKind, mappings) {
		if (mappings.length === 0) return;
		for (const batch of chunks([...mappings], rowsPerInsert(5))) await this.db.insertInto("_emdash_transfer_identity_map").values(batch.map((mapping) => ({
			origin_site_id: this.originSiteId,
			entity_kind: entityKind,
			portable_id: mapping.portableId,
			target_id: mapping.targetId,
			operation_id: this.operationId
		}))).onConflict((conflict) => conflict.columns([
			"operation_id",
			"entity_kind",
			"portable_id"
		]).doNothing()).execute();
		const stored = await this.getMany(entityKind, mappings.map((mapping) => mapping.portableId));
		for (const mapping of mappings) if (stored.get(mapping.portableId) !== mapping.targetId) throw new TransferError("TRANSFER_REFERENCE_INVALID", "Conflicting identity mapping", { detail: {
			kind: entityKind,
			id: mapping.portableId
		} });
	}
	async put(entityKind, mapping) {
		await this.putMany(entityKind, [mapping]);
	}
	async get(entityKind, portableId) {
		return (await this.db.selectFrom("_emdash_transfer_identity_map").select("target_id").where("operation_id", "=", this.operationId).where("entity_kind", "=", entityKind).where("portable_id", "=", portableId).executeTakeFirst())?.target_id ?? null;
	}
	/** Mapped target ids by portable id (missing ids are absent from the map). */
	async getMany(entityKind, portableIds) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(portableIds)], 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_identity_map").select(["portable_id", "target_id"]).where("operation_id", "=", this.operationId).where("entity_kind", "=", entityKind).where("portable_id", "in", batch).execute();
			for (const row of rows) result.set(row.portable_id, row.target_id);
		}
		return result;
	}
	/** Portable ids by target id (reverse lookup for verification). */
	async getPortableIds(entityKind, targetIds) {
		const result = /* @__PURE__ */ new Map();
		for (const batch of chunks([...new Set(targetIds)], 50)) {
			const rows = await this.db.selectFrom("_emdash_transfer_identity_map").select(["portable_id", "target_id"]).where("operation_id", "=", this.operationId).where("entity_kind", "=", entityKind).where("target_id", "in", batch).execute();
			for (const row of rows) result.set(row.target_id, row.portable_id);
		}
		return result;
	}
	/** Mappings of one kind in portable-id order, for bounded iteration. */
	async list(entityKind, options = {}) {
		let query = this.db.selectFrom("_emdash_transfer_identity_map").select(["portable_id", "target_id"]).where("operation_id", "=", this.operationId).where("entity_kind", "=", entityKind);
		const after = options.after;
		if (after !== void 0) query = query.where(sql`${bytewise(this.db, "portable_id")} > ${after}`);
		return (await query.orderBy(bytewise(this.db, "portable_id")).limit(Math.min(Math.max(options.limit ?? 500, 1), 1e3)).execute()).map((row) => ({
			portableId: row.portable_id,
			targetId: row.target_id
		}));
	}
};
var RECORD_KIND_NAMES = new Set(RECORD_KINDS);
/** Identity-map kind marking record-stage units that have started. */
var IMPORT_UNIT_ENTITY = "import_unit";
var ImportContext = class {
	float4;
	identity;
	#chunks = /* @__PURE__ */ new Map();
	#fields = /* @__PURE__ */ new Map();
	#rewrittenKinds;
	/** Whether the running unit is on its first attempt (see `beginUnit`). */
	firstAttempt = false;
	constructor(db, storage, ops, operation, leaseToken, plan, manifest, reader, budget) {
		this.db = db;
		this.storage = storage;
		this.ops = ops;
		this.operation = operation;
		this.leaseToken = leaseToken;
		this.plan = plan;
		this.manifest = manifest;
		this.reader = reader;
		this.budget = budget;
		this.float4 = isPostgres(db);
		this.identity = new TransferIdentityMapRepository(db, manifest.originSiteId, operation.id);
	}
	get operationId() {
		return this.operation.id;
	}
	chunkCount(kind) {
		return this.manifest.records[kind]?.chunks ?? 0;
	}
	/** Records of one chunk, parsed once per step. */
	async chunk(kind, seq) {
		const key = `${kind}/${seq}`;
		let pending = this.#chunks.get(key);
		if (!pending) {
			pending = this.reader.readChunk(kind, seq);
			this.#chunks.set(key, pending);
		}
		return pending;
	}
	/** Every record of `kind`, for small kinds read as a whole (collections, fields). */
	async allRecords(kind) {
		const records = [];
		for (let seq = 0; seq < this.chunkCount(kind); seq++) for (const staged of await this.chunk(kind, seq)) records.push(staged.record);
		return records;
	}
	/**
	* Target column type of each field of a collection that has a column, from
	* the imported schema.
	*/
	async fieldColumns(collection) {
		return (await this.fields(collection)).columns;
	}
	/** Slugs of a collection's required (NOT NULL) fields, from the imported schema. */
	async requiredFields(collection) {
		return (await this.fields(collection)).required;
	}
	fields(collection) {
		let pending = this.#fields.get(collection);
		if (!pending) {
			pending = this.db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
				"_emdash_fields.slug as slug",
				"_emdash_fields.column_type as column_type",
				"_emdash_fields.required as required",
				"_emdash_fields.type as type",
				"_emdash_fields.validation as validation"
			]).where("_emdash_collections.slug", "=", collection).execute().then((all) => all.filter((row) => !isStoragelessFieldRow(row))).then((rows) => ({
				columns: new Map(rows.map((row) => [row.slug, toFieldColumnType(row.column_type)])),
				required: new Set(rows.filter((row) => Number(row.required) === 1).map((row) => row.slug))
			}));
			this.#fields.set(collection, pending);
		}
		return pending;
	}
	/**
	* Record that the unit at `position` of `stage` is starting and set
	* `firstAttempt`: false when an earlier, interrupted step already started
	* it, so rows it finds may be its own partial writes.
	*/
	async beginUnit(stage, position) {
		const result = await this.db.insertInto("_emdash_transfer_identity_map").values({
			origin_site_id: this.manifest.originSiteId,
			operation_id: this.operation.id,
			entity_kind: IMPORT_UNIT_ENTITY,
			portable_id: `${stage}:${position.kind}:${position.seq}:${position.line}`,
			target_id: "started"
		}).onConflict((conflict) => conflict.columns([
			"operation_id",
			"entity_kind",
			"portable_id"
		]).doNothing()).executeTakeFirst();
		this.firstAttempt = Number(result.numInsertedOrUpdatedRows ?? 0n) > 0;
	}
	principalTarget(principal) {
		if (principal === void 0) return null;
		const mappings = this.plan.decisions.principalMappings;
		return Object.hasOwn(mappings, principal) ? mappings[principal] ?? null : null;
	}
	/**
	* Replace every `emdash-media:` placeholder in `records` with the target
	* storage key the media stage recorded, and unescape escaped placeholder
	* text. Throws `TRANSFER_MEDIA_REF_INVALID` for a placeholder whose media
	* was not imported.
	*/
	async resolveMediaRefs(records, lines) {
		const mediaIds = /* @__PURE__ */ new Set();
		let marked = false;
		for (const line of lines) {
			if (!line.includes(MEDIA_PLACEHOLDER_PREFIX)) continue;
			marked = true;
			for (const match of line.matchAll(PLACEHOLDER_TOKEN)) if (match[2] !== void 0) mediaIds.add(match[2]);
		}
		if (!marked) return [...records];
		const mediaIdToKey = await this.identity.getMany(MEDIA_STORAGE_KEY_ENTITY, [...mediaIds]);
		return records.map((record) => {
			const result = rewriteMediaRefs(record, {
				mode: "import",
				mediaIdToKey
			});
			const error = result.errors[0];
			if (error) throw new TransferError("TRANSFER_MEDIA_REF_INVALID", "Unresolved media reference", { detail: {
				kind: record.kind,
				id: record.id,
				path: error.path
			} });
			return result.value;
		});
	}
	/** Record kinds that have at least one rewritten id in this import. */
	rewrittenKinds() {
		this.#rewrittenKinds ??= this.db.selectFrom("_emdash_transfer_identity_map").select("entity_kind").distinct().where("operation_id", "=", this.operation.id).execute().then((rows) => new Set(rows.map((row) => row.entity_kind).filter(isRecordKindName)));
		return this.#rewrittenKinds;
	}
	noteRewrite(kind) {
		this.#rewrittenKinds = (this.#rewrittenKinds ?? Promise.resolve(/* @__PURE__ */ new Set())).then((kinds) => kinds.add(kind));
	}
	/**
	* Target ids for the records' own ids and every `by: "id"` reference,
	* keyed `kind\u0000portableId`. Ids without a rewrite are absent.
	*/
	async rewrittenIds(kind, records) {
		const rewritten = await this.rewrittenKinds();
		const result = /* @__PURE__ */ new Map();
		if (rewritten.size === 0) return result;
		const wanted = /* @__PURE__ */ new Map();
		const want = (targetKind, id) => {
			if (typeof id !== "string" || !rewritten.has(targetKind)) return;
			let ids = wanted.get(targetKind);
			if (!ids) wanted.set(targetKind, ids = /* @__PURE__ */ new Set());
			ids.add(id);
		};
		for (const record of records) {
			want(kind, record.id);
			for (const reference of KIND_REFERENCES[kind]) {
				if (reference.by !== "id") continue;
				for (const target of reference.targets) want(target, record[reference.property]);
			}
		}
		for (const [targetKind, ids] of wanted) for (const [portableId, targetId] of await this.identity.getMany(targetKind, [...ids])) result.set(`${targetKind}\u0000${portableId}`, targetId);
		return result;
	}
};
function isRecordKindName(value) {
	return RECORD_KIND_NAMES.has(value);
}
function toFieldColumnType(value) {
	switch (value) {
		case "REAL":
		case "INTEGER":
		case "JSON": return value;
		default: return "TEXT";
	}
}
/** Apply rewritten ids to a record's own id and `by: "id"` references. */
function applyRewrittenIds(record, rewritten) {
	if (rewritten.size === 0) return record;
	const next = { ...record };
	const own = rewritten.get(`${record.kind}\u0000${record.id}`);
	if (own !== void 0) next.id = own;
	for (const reference of KIND_REFERENCES[record.kind]) {
		if (reference.by !== "id") continue;
		const value = next[reference.property];
		if (typeof value !== "string") continue;
		for (const target of reference.targets) {
			const mapped = rewritten.get(`${target}\u0000${value}`);
			if (mapped !== void 0) {
				next[reference.property] = mapped;
				break;
			}
		}
	}
	return next;
}
/**
* Deterministic ids and opaque values derived from an import operation, so a
* replayed batch writes exactly what the interrupted attempt wrote.
*/
var CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
/**
* A ULID-shaped id (26 Crockford base32 characters) derived from the SHA-256
* of `parts`. Stable for the same inputs; the leading character is always in
* `0`–`7`, as in a real ULID.
*/
async function ulidFromHash(...parts) {
	const hex = await sha256Hex$1(parts.join("\0"));
	let bits = BigInt(`0x${hex.slice(0, 32)}`);
	let id = "";
	for (let index = 0; index < 26; index++) {
		id = CROCKFORD[Number(bits & 31n)] + id;
		bits >>= 5n;
	}
	return id;
}
/** Hex HMAC-SHA-256 of `message` under `secret`. */
async function hmacHex(secret, message) {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
	return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
/**
* Per-kind writers for every record kind that maps to one row of a fixed
* table (everything except collections, fields, and entries).
*
* A batch is inserted with `ON CONFLICT DO NOTHING` and read back; each
* stored row must equal the row the importer meant to write, so replaying a
* batch after an interruption is a no-op. When a row keyed by a portable id
* already exists with different content, that id belongs to an unrelated
* target row: the record is written under a deterministic rewritten id,
* recorded in the identity map, and later `by: "id"` references follow it.
* Any other conflict (another unique constraint, a row that differs after a
* rewrite) fails the batch with `TRANSFER_IMPORT_ERROR`; where the database
* has transactions, the failed batch leaves no rows behind.
*/
var ID_KEY = ["id"];
async function blockTypeVersionFingerprint(record) {
	if (record.kind !== "block_type_version") throw new Error("Expected a block type version");
	const fields = record.fields;
	return { fingerprint: await fingerprintBlockFields(fields) };
}
var FLAT_KINDS = {
	block_type: { key: ID_KEY },
	block_type_version: {
		key: ID_KEY,
		derived: (_context, record) => blockTypeVersionFingerprint(record)
	},
	taxonomy_def: { key: ID_KEY },
	relation: { key: ID_KEY },
	byline_field: { key: ID_KEY },
	media_folder: { key: ID_KEY },
	media: { key: ID_KEY },
	term: { key: ID_KEY },
	byline: { key: ID_KEY },
	byline_field_value: { key: ["byline_id", "field_id"] },
	byline_field_group_value: { key: ["translation_group", "field_id"] },
	revision: { key: ID_KEY },
	content_term: { key: [
		"collection",
		"entry_id",
		"taxonomy_id"
	] },
	content_byline: { key: ID_KEY },
	content_reference: { key: ID_KEY },
	seo: { key: ["collection", "content_id"] },
	menu: { key: ID_KEY },
	menu_item: { key: ID_KEY },
	widget_area: { key: ID_KEY },
	widget: { key: ID_KEY },
	section: { key: ID_KEY },
	redirect: {
		key: ID_KEY,
		derived: () => ({
			config_revision: ulid(),
			source_guard: 1,
			write_generation: 0
		})
	},
	comment: { key: ID_KEY },
	comment_reaction: {
		key: ID_KEY,
		derived: async (context, record) => ({ voter_hash: await hmacHex(context.operation.stagingSecret, `comment_reaction:${record.id}`) })
	},
	setting: {
		key: ["name"],
		conflict: {
			type: "update",
			target: ["name"],
			update: ["value", "revision"]
		},
		derived: () => ({ revision: ulid() })
	}
};
var NO_FIELD_COLUMNS = /* @__PURE__ */ new Map();
/**
* Identity-map kind recording each redirect the importer wrote disabled
* because it would close a loop with the redirects written before it.
* Verification reads it to predict those redirects.
*/
var REDIRECT_LOOP_ENTITY = "redirect_loop_disabled";
/** Redirects checked for loops per query: up to three bound parameters each. */
var REDIRECT_LOOP_BATCH = rowsPerInsert(3);
function isFlatKind(kind) {
	return Object.hasOwn(FLAT_KINDS, kind);
}
function tableOf(kind) {
	const spec = getPortableTableSpecForKind(kind);
	if (!spec) throw new Error(`No table for kind ${kind}`);
	return spec;
}
/** Statements one `writeRecords` call for `count` records of `kind` needs. */
function estimateWrite(kind, count) {
	const spec = tableOf(kind);
	const statements = (rows) => estimateStatements(rows, Object.keys(spec.columns).length, FLAT_KINDS[kind].key.length) + 3;
	if (kind !== "redirect") return statements(count);
	return Math.ceil(count / REDIRECT_LOOP_BATCH) * (3 + statements(REDIRECT_LOOP_BATCH));
}
/** Records that were actually written (decided settings may be skipped). */
async function writeRecords(context, kind, inputs, options = {}) {
	const skipped = skippedSettings(context);
	const selected = inputs.filter((input) => kind !== "setting" || !skipped.has(input.record.id));
	if (selected.length === 0) return [];
	const transformed = selected.map((input) => applyTransformations(input.record, context.plan, { fieldColumnTypes: NO_FIELD_COLUMNS }));
	const resolved = await context.resolveMediaRefs(transformed, selected.map((input) => input.line));
	if (kind !== "redirect") {
		await writeResolved(context, kind, resolved, options, false);
		return resolved;
	}
	const written = [];
	for (let start = 0; start < resolved.length; start += REDIRECT_LOOP_BATCH) {
		const records = await disableLoopClosers(context, resolved.slice(start, start + REDIRECT_LOOP_BATCH));
		await writeResolved(context, kind, records, options, false);
		written.push(...records);
	}
	return written;
}
/**
* The database refuses an enabled redirect that closes a loop of enabled
* redirects (by exact source and destination). An origin can still hold such
* a loop, and analysis only finds loops in packages of up to
* `MAX_LOOP_CHECKED_REDIRECTS` redirects, so each redirect that would close
* one with the redirects written before it (target rows, then the enabled
* earlier records of `records`) is written disabled and recorded under
* {@link REDIRECT_LOOP_ENTITY}. Rows of `records` already in the table (from
* an interrupted attempt) are ignored, so a replay decides the same way.
*/
async function disableLoopClosers(context, records) {
	const candidates = records.filter((record) => record.enabled && record.destination !== "");
	if (candidates.length === 0) return [...records];
	const reach = await reachableSources(context, candidates);
	const closers = /* @__PURE__ */ new Set();
	candidates.forEach((record, index) => {
		const earlier = candidates.slice(0, index).filter((other) => !closers.has(other.id));
		const queue = [{
			node: record.destination,
			moved: false
		}];
		const taken = /* @__PURE__ */ new Set();
		while (queue.length > 0) {
			const { node, moved } = queue.shift();
			for (const source of reach.get(node) ?? []) {
				if (source === record.source && (moved || source !== node)) {
					closers.add(record.id);
					return;
				}
				for (const other of earlier) {
					if (other.source !== source || taken.has(other.id)) continue;
					taken.add(other.id);
					queue.push({
						node: other.destination,
						moved: true
					});
				}
			}
		}
	});
	if (closers.size === 0) return [...records];
	await context.identity.putMany(REDIRECT_LOOP_ENTITY, Array.from(closers, (id) => ({
		portableId: id,
		targetId: id
	})));
	return records.map((record) => closers.has(record.id) ? {
		...record,
		enabled: false
	} : record);
}
/**
* For each candidate's destination, the candidate sources reachable from it
* through enabled target redirects (including the destination itself when it
* is one). Follows `idx_redirects_source` from each destination only;
* `enabled <> 0` rather than `enabled = 1` keeps SQLite from choosing
* `idx_redirects_enabled` and scanning every enabled redirect per step.
*/
async function reachableSources(context, candidates) {
	const starts = [...new Set(candidates.map((record) => record.destination))];
	const sources = [...new Set(candidates.map((record) => record.source))];
	const result = await sql`
		WITH RECURSIVE starts(node) AS (VALUES ${sql.join(starts.map((node) => sql`(${node})`))}),
		reach(start, node) AS (
			SELECT node, node FROM starts
			UNION
			SELECT reach.start, redirect.destination
			FROM reach JOIN _emdash_redirects AS redirect ON redirect.source = reach.node
			WHERE redirect.enabled <> 0 AND redirect.destination <> ''
				AND redirect.id NOT IN (${sql.join(candidates.map((record) => record.id))})
		)
		SELECT start, node FROM reach WHERE node IN (${sql.join(sources)})
	`.execute(context.db);
	const reach = /* @__PURE__ */ new Map();
	for (const row of result.rows) {
		const reached = reach.get(row.start) ?? /* @__PURE__ */ new Set();
		reached.add(row.node);
		reach.set(row.start, reached);
	}
	return reach;
}
function skippedSettings(context) {
	const { decisions } = context.plan;
	return /* @__PURE__ */ new Set([...decisions.siteTitle === "target" ? DECIDED_SETTING_NAMES.title : [], ...decisions.siteTagline === "target" ? DECIDED_SETTING_NAMES.tagline : []]);
}
function keyString(key, row) {
	return key.map((column) => String(row[column])).join("\0");
}
function uniqueConflict(kind, id) {
	return new TransferError("TRANSFER_IMPORT_ERROR", "Record conflicts with another target row on a unique key", { detail: {
		kind,
		id,
		reason: "unique_conflict"
	} });
}
/**
* Decide what a stored row that differs from its record means. The row can
* be one this import wrote in an interrupted attempt of the same unit: then
* the difference is an importer defect, never a collision, and the import
* fails with `stored_row_mismatch`. Only on a unit's first attempt can the row
* predate the import, and only a row keyed by the record's own id can then
* move aside: the record is rewritten to a new id. Anything else is a
* `collision` the import cannot resolve.
*/
function assertRewritable(context, row) {
	const detail = {
		kind: row.kind,
		id: row.id,
		column: row.column
	};
	if (!context.firstAttempt) throw new TransferError("TRANSFER_IMPORT_ERROR", "A row this import wrote does not read back as its record", { detail: {
		...detail,
		reason: "stored_row_mismatch"
	} });
	if (!row.idKeyed || row.rewritten) throw new TransferError("TRANSFER_IMPORT_ERROR", "Record collides with an existing target row", { detail: {
		...detail,
		reason: "collision"
	} });
}
async function writeResolved(context, kind, records, options, retry) {
	const spec = tableOf(kind);
	const config = FLAT_KINDS[kind];
	const rewritten = await context.rewrittenIds(kind, records);
	const codecs = { ...recordCodecs(spec.columns) };
	const rows = [];
	for (const record of records) {
		const target = applyRewrittenIds(record, rewritten);
		const row = {
			...encodeRecord(context.db, spec.columns, target, {
				kind,
				id: record.id
			}),
			...config.derived ? await config.derived(context, record) : {}
		};
		const extra = options.extra?.(record);
		if (extra) {
			Object.assign(row, extra.row);
			Object.assign(codecs, extra.codecs);
		}
		rows.push(row);
	}
	const columns = Object.keys(rows[0] ?? {});
	const collisions = await withTransaction(context.db, async (trx) => {
		await insertRows(trx, spec.table, columns, rows, config.conflict);
		const stored = new Map((await selectByKeys(trx, spec.table, config.key, rows)).map((row) => [keyString(config.key, row), row]));
		const found = [];
		rows.forEach((row, index) => {
			const record = records[index];
			if (!record) return;
			const existing = stored.get(keyString(config.key, row));
			if (!existing) throw uniqueConflict(kind, record.id);
			const column = firstDifference(context.db, codecs, row, existing, { float4: context.float4 });
			if (column === null) return;
			assertRewritable(context, {
				kind,
				id: record.id,
				column,
				idKeyed: config.key === ID_KEY,
				rewritten: retry || rewritten.has(`${kind}\u0000${record.id}`)
			});
			found.push(record);
		});
		return found;
	});
	if (collisions.length === 0) return;
	const mappings = await Promise.all(collisions.map(async (record) => ({
		portableId: record.id,
		targetId: await ulidFromHash(context.operationId, kind, record.id)
	})));
	await context.identity.putMany(kind, mappings);
	context.noteRewrite(kind);
	await writeResolved(context, kind, collisions, options, true);
}
var STANDARD_CODECS = recordCodecs(CONTENT_TABLE_COLUMNS);
var STANDARD_COLUMNS = Object.keys(STANDARD_CODECS);
function contentTable(collection) {
	validateIdentifier(collection, "collection slug");
	return `ec_${collection}`;
}
/** Statements for `count` entries of a collection with `fieldCount` fields. */
function estimateEntryWrite(count, fieldCount) {
	const columns = STANDARD_COLUMNS.length + fieldCount;
	if (rowsPerInsert(columns) === 0) return count * (2 + Math.ceil(fieldCount / 99)) + Math.ceil(count / 100) + 3;
	return estimateStatements(count, columns) + 3;
}
async function writeEntries(context, inputs) {
	const byCollection = /* @__PURE__ */ new Map();
	for (const input of inputs) {
		const list = byCollection.get(input.record.collection) ?? [];
		list.push(input);
		byCollection.set(input.record.collection, list);
	}
	for (const [collection, group] of byCollection) {
		const fieldColumns = await context.fieldColumns(collection);
		const fieldColumnTypes = /* @__PURE__ */ new Map([[collection, fieldColumns]]);
		const transformed = group.map((input) => applyTransformations(input.record, context.plan, { fieldColumnTypes }));
		await writeCollectionEntries(context, collection, fieldColumns, await context.resolveMediaRefs(transformed, group.map((input) => input.line)), false);
	}
}
function fieldCodecs(fieldColumns) {
	const codecs = {};
	for (const [slug, columnType] of fieldColumns) codecs[slug] = codecForColumnType(columnType);
	return codecs;
}
function entryRow(db, record, codecs, required) {
	const row = encodeRecord(db, CONTENT_TABLE_COLUMNS, record, {
		kind: "entry",
		id: record.id
	});
	for (const slug of Object.keys(record.fields)) if (!Object.hasOwn(codecs, slug)) throw new TransferError("TRANSFER_RECORD_INVALID", "Entry has a field its collection lacks", { detail: {
		kind: "entry",
		id: record.id,
		field: slug
	} });
	for (const [slug, codec] of Object.entries(codecs)) row[slug] = encodeValue(db, codec, record.fields[slug], {
		kind: "entry",
		id: record.id,
		column: slug
	}, { notNull: required.has(slug) });
	return row;
}
async function writeCollectionEntries(context, collection, fieldColumns, records, retry) {
	const table = contentTable(collection);
	const fields = fieldCodecs(fieldColumns);
	const required = await context.requiredFields(collection);
	const codecs = {
		...STANDARD_CODECS,
		...fields
	};
	const rewritten = await context.rewrittenIds("entry", records);
	const rows = records.map((record) => entryRow(context.db, applyRewrittenIds(record, rewritten), fields, required));
	const columns = Object.keys(codecs);
	const wide = rowsPerInsert(columns.length) === 0;
	const collisions = await withTransaction(context.db, async (trx) => {
		await insertRows(trx, table, wide ? STANDARD_COLUMNS : columns, rows);
		let stored = await storedById(trx, table, rows);
		if (wide) {
			const fieldSlugs = Object.keys(fields);
			for (const row of rows) {
				const existing = stored.get(String(row.id));
				if (!existing || firstDifference(context.db, STANDARD_CODECS, row, existing, { float4: context.float4 }) !== null) continue;
				await updateColumns(trx, table, "id", String(row.id), row, fieldSlugs);
			}
			stored = await storedById(trx, table, rows);
		}
		const found = [];
		rows.forEach((row, index) => {
			const record = records[index];
			if (!record) return;
			const existing = stored.get(String(row.id));
			if (!existing) throw uniqueConflict("entry", record.id);
			const column = firstDifference(context.db, codecs, row, existing, { float4: context.float4 });
			if (column === null) return;
			assertRewritable(context, {
				kind: "entry",
				id: record.id,
				column,
				idKeyed: true,
				rewritten: retry || rewritten.has(`entry\u0000${record.id}`)
			});
			found.push(record);
		});
		return found;
	});
	if (collisions.length === 0) return;
	const mappings = await Promise.all(collisions.map(async (record) => ({
		portableId: record.id,
		targetId: await ulidFromHash(context.operationId, "entry", record.id)
	})));
	await context.identity.putMany("entry", mappings);
	context.noteRewrite("entry");
	await writeCollectionEntries(context, collection, fieldColumns, collisions, true);
}
async function storedById(db, table, rows) {
	const stored = await selectByKeys(db, table, ["id"], rows);
	return new Map(stored.map((row) => [String(row.id), row]));
}
/**
* Media writer: one target object per media row.
*
* Each media row's bytes are copied from its staged blob to a deterministic
* target key, `${ulidFromHash(operationId, mediaId)}${ext}`, so an
* interrupted copy is simply repeated. An upload attempt is registered before
* the copy so media cleanup reclaims the object if the import is abandoned
* before the row exists. The copy is verified against the blob's declared
* size and SHA-256, and the row's `content_hash` is recomputed from the bytes
* exactly as uploads do (SHA-1, only up to `MAX_CONTENT_HASH_BYTES`).
*/
var EXTENSION = /\.[A-Za-z0-9]{1,16}$/;
var MIME_EXTENSION = /^[a-z0-9]{1,16}$/;
function mediaExtension(record) {
	const fromName = EXTENSION.exec(record.filename)?.[0];
	if (fromName) return fromName.toLowerCase();
	const fromType = mime.getExtension(record.mimeType);
	return fromType && MIME_EXTENSION.test(fromType) ? `.${fromType}` : "";
}
async function mediaStorageKey(context, record) {
	return `${await ulidFromHash(context.operationId, "media", record.id)}${mediaExtension(record)}`;
}
/** Declared size of a media row's staged blob. */
async function blobBytes(context, record) {
	const staged = await new TransferStagedFileRepository(context.db).get(context.operationId, mediaBlobPath(record.blob));
	if (!staged || staged.state !== "verified") throw new TransferError("TRANSFER_MEDIA_BLOB_MISSING", "Media blob is not staged", { detail: {
		kind: "media",
		id: record.id
	} });
	return staged.bytes;
}
/** Statements `writeMedia` needs for one row. */
var MEDIA_ROW_STATEMENTS = 12;
async function writeMedia(context, input, bytes) {
	const record = input.record;
	const storageKey = await mediaStorageKey(context, record);
	await context.identity.put(MEDIA_STORAGE_KEY_ENTITY, {
		portableId: record.id,
		targetId: storageKey
	});
	const targetId = (await context.rewrittenIds("media", [record])).get(`media\u0000${record.id}`) ?? record.id;
	const existing = await context.db.selectFrom("media").select(["storage_key", "status"]).where("id", "=", targetId).executeTakeFirst();
	let contentHash = null;
	const ours = existing?.storage_key === storageKey;
	if (ours) contentHash = (await context.db.selectFrom("media").select("content_hash").where("id", "=", targetId).executeTakeFirstOrThrow()).content_hash;
	else {
		const media = new MediaRepository(context.db);
		if (!await media.hasUploadAttempt(storageKey)) await media.createUploadAttempt(targetId, storageKey);
		contentHash = await copyBlob(context, record, storageKey, bytes);
	}
	await writeRecords(context, "media", [input], { extra: () => ({
		row: {
			storage_key: storageKey,
			content_hash: contentHash,
			status: "ready"
		},
		codecs: {
			storage_key: "text",
			status: "text"
		}
	}) });
	if (!ours) await new MediaRepository(context.db).deleteUploadAttempt(storageKey);
}
async function copyBlob(context, record, storageKey, bytes) {
	const retained = [];
	let retainedBytes = 0;
	const keepForHash = bytes > 0 && bytes <= 8388608;
	const tap = new TransformStream({ transform(chunk, controller) {
		if (keepForHash && retainedBytes + chunk.byteLength <= 8388608) {
			retained.push(chunk.slice());
			retainedBytes += chunk.byteLength;
		}
		controller.enqueue(chunk);
	} });
	const body = (await context.reader.blob(record.blob)).pipeThrough(tap);
	await putVerified(context.storage, storageKey, body, {
		bytes,
		sha256: record.blob
	}, { contentType: record.mimeType });
	if (!keepForHash || retainedBytes !== bytes) return null;
	const all = new Uint8Array(retainedBytes);
	let offset = 0;
	for (const part of retained) {
		all.set(part, offset);
		offset += part.byteLength;
	}
	return computeContentHash(all);
}
/**
* The record stages of an import: each walks its kinds' package streams in
* order and writes them in bounded units, checkpointing the stream position
* after every unit.
*/
/** Identity-map kind linking an unmapped principal's byline, per locale, to its group. */
var PRINCIPAL_BYLINE_ENTITY = "principal_byline";
/**
* Identity-map kind recording each materialized inferred credit: the
* `content_byline` row id (`inferredCreditId`) mapped to its byline group.
* Only these rows are materialized credits; a package's own `inferred:` rows
* are explicit credits like any other.
*/
var INFERRED_CREDIT_ENTITY = "inferred_credit";
/**
* Streams walked by each record stage. Fields are written together with
* their collection. The relations stage walks the entry stream a second
* time, after explicit credits exist, to materialize inferred credits.
*/
var STAGE_STREAMS = {
	...IMPORT_STAGE_KINDS,
	schema: IMPORT_STAGE_KINDS.schema.filter((kind) => kind !== "field"),
	relations: IMPORT_STAGE_KINDS.relations.flatMap((kind) => kind === "content_byline" ? [kind, "entry"] : [kind])
};
var DEFAULT_BATCH = 100;
var ENTRY_BATCH = 50;
var COLLECTION_STATEMENTS = 81;
var COLLECTION_DELETION_STATEMENTS = 40;
/** Thrown out of a stage when the operation was asked to cancel. */
var ImportCancelledSignal = class extends Error {};
/** Yield without checkpointing a unit whose collection slug is still being released. */
var ImportCollectionDeletionSignal = class extends Error {
	constructor(waiting) {
		super();
		this.waiting = waiting;
	}
};
function firstPosition(stage) {
	const kind = STAGE_STREAMS[stage][0];
	if (!kind) throw new Error(`Stage ${stage} has no streams`);
	return {
		kind,
		seq: 0,
		line: 0
	};
}
/**
* Run units of `stage` from `position` until the stage is done (returns
* null) or the step budget is spent (returns the next position).
*/
async function runRecordStage(context, stage, start, checkpoint) {
	const streams = STAGE_STREAMS[stage];
	let position = start;
	while (position) {
		const kindIndex = streams.indexOf(position.kind);
		if (kindIndex === -1) throw new TransferError("TRANSFER_INVALID_STATE", "Import cursor names an unknown stream");
		if (position.seq >= context.chunkCount(position.kind)) {
			const next = streams[kindIndex + 1];
			position = next ? {
				kind: next,
				seq: 0,
				line: 0
			} : null;
			continue;
		}
		const chunk = await context.chunk(position.kind, position.seq);
		if (position.line >= chunk.length) {
			position = {
				kind: position.kind,
				seq: position.seq + 1,
				line: 0
			};
			continue;
		}
		const unit = await planUnit(context, stage, position, chunk);
		if (!context.budget.canStart({
			queries: unit.queries + 3,
			bytes: unit.bytes
		})) return position;
		context.budget.start(unit.bytes);
		await context.beginUnit(stage, position);
		await unit.run();
		const line = position.line + unit.count;
		position = line >= chunk.length ? {
			kind: position.kind,
			seq: position.seq + 1,
			line: 0
		} : {
			kind: position.kind,
			seq: position.seq,
			line
		};
		await checkpoint(position);
	}
	return null;
}
async function planUnit(context, stage, position, chunk) {
	const kind = position.kind;
	const rest = chunk.slice(position.line);
	if (kind === "collection") {
		const [staged] = rest;
		if (!staged || staged.record.kind !== "collection") throw new Error("Expected a collection");
		const record = staged.record;
		return {
			count: 1,
			queries: COLLECTION_STATEMENTS,
			bytes: 0,
			run: () => importCollection(context, record)
		};
	}
	if (kind === "media") {
		const [staged] = rest;
		if (!staged || staged.record.kind !== "media") throw new Error("Expected a media record");
		const input = {
			record: staged.record,
			line: staged.line
		};
		const bytes = await blobBytes(context, staged.record);
		return {
			count: 1,
			queries: MEDIA_ROW_STATEMENTS,
			bytes,
			run: () => writeMedia(context, input, bytes)
		};
	}
	if (kind === "entry") {
		const batch = inputsOf("entry", rest.slice(0, ENTRY_BATCH));
		if (stage === "relations") return {
			count: batch.length,
			queries: 4 + Math.ceil(batch.length / 50) * 2 + estimateWrite("content_byline", batch.length),
			bytes: 0,
			run: () => materializeInferredCredits(context, batch)
		};
		let queries = 3;
		const perCollection = /* @__PURE__ */ new Map();
		for (const input of batch) perCollection.set(input.record.collection, (perCollection.get(input.record.collection) ?? 0) + 1);
		for (const [collection, count] of perCollection) {
			const fields = await context.fieldColumns(collection);
			queries += estimateEntryWrite(count, fields.size);
		}
		return {
			count: batch.length,
			queries,
			bytes: 0,
			run: () => writeEntries(context, batch)
		};
	}
	if (!isFlatKind(kind)) throw new TransferError("TRANSFER_INVALID_STATE", "Import cursor names an unknown stream");
	const batch = rest.slice(0, DEFAULT_BATCH);
	return {
		count: batch.length,
		queries: estimateWrite(kind, batch.length),
		bytes: 0,
		run: async () => {
			await writeRecords(context, kind, batch.map((staged) => ({
				record: staged.record,
				line: staged.line
			})));
			if (kind === "byline") await recordUnmappedBylines(context, inputsOf("byline", batch));
		}
	};
}
function inputsOf(kind, staged) {
	return staged.map((item) => {
		if (item.record.kind !== kind) throw new Error(`Expected ${kind} records`);
		return {
			record: item.record,
			line: item.line
		};
	});
}
async function importCollection(context, record) {
	const deletions = new MediaUsageCollectionDeletionRepository(context.db);
	let deletion = await deletions.findBySlug(record.slug);
	const hadDeletion = deletion !== null;
	while (deletion) {
		if (!context.budget.canStart({ queries: COLLECTION_DELETION_STATEMENTS })) throw new ImportCollectionDeletionSignal(false);
		context.budget.start();
		if ((await context.ops.require(context.operationId)).cancelRequestedAt !== null) throw new ImportCancelledSignal();
		const outcome = deletion.state === "failed" ? "failed" : await processMediaUsageCollectionDeletion(context.db, deletion);
		if (outcome === "failed") throw new TransferError("TRANSFER_IMPORT_ERROR", "Previous collection deletion failed", { detail: {
			kind: "collection",
			id: record.id,
			reason: "COLLECTION_DELETION_FAILED",
			deletedCollectionId: deletion.collectionId,
			message: `Deletion of the previous collection "${record.slug}" failed. Abandon this import with \`emdash site import abandon ${context.operationId}\`, then send {"collectionId":"${deletion.collectionId}"} to POST /_emdash/api/admin/media-usage/collection-deletions/retry. After cleanup finishes, reset this site or set up a new one before analyzing and running the import again.`
		} });
		if (outcome === "finalized") break;
		if (outcome !== "progress") throw new ImportCollectionDeletionSignal(true);
		deletion = await deletions.findBySlug(record.slug);
	}
	if (hadDeletion) {
		if (!context.budget.canStart({ queries: 84 })) throw new ImportCollectionDeletionSignal(false);
		if ((await context.ops.require(context.operationId)).cancelRequestedAt !== null) throw new ImportCancelledSignal();
	}
	const fields = (await context.allRecords("field")).filter((field) => field.collectionId === record.id);
	try {
		await new SchemaRegistry(context.db).importCollection(record, fields, { resume: true });
	} catch (error) {
		if (error instanceof SchemaError) throw new TransferError("TRANSFER_IMPORT_ERROR", "Collection could not be imported", {
			detail: {
				kind: "collection",
				id: record.id,
				reason: error.code,
				message: error.message.slice(0, 512)
			},
			cause: error
		});
		throw error;
	}
}
/**
* Remember which byline an unmapped principal owns in each locale, so the
* relations stage can keep that principal's inferred author credits.
*/
async function recordUnmappedBylines(context, inputs) {
	const mappings = inputs.flatMap(({ record }) => record.userPrincipal !== void 0 && context.principalTarget(record.userPrincipal) === null ? [{
		portableId: `${record.locale}:${record.userPrincipal}`,
		targetId: record.translationGroup ?? record.id
	}] : []);
	await context.identity.putMany(PRINCIPAL_BYLINE_ENTITY, mappings);
}
/**
* Explicit `content_byline` rows for entries whose author credit would
* otherwise be inferred from an unmapped principal and vanish on the target:
* the author is unmapped, the entry has no explicit credit, and the author
* has a byline in the entry's locale.
*/
async function materializeInferredCredits(context, inputs) {
	const candidates = inputs.map((input) => input.record).filter((record) => record.authorPrincipal !== void 0 && record.primaryBylineGroup === void 0 && context.principalTarget(record.authorPrincipal) === null);
	if (candidates.length === 0) return;
	const groups = await context.identity.getMany(PRINCIPAL_BYLINE_ENTITY, candidates.map((record) => `${record.locale}:${record.authorPrincipal}`));
	const credited = candidates.filter((record) => groups.has(`${record.locale}:${record.authorPrincipal}`));
	if (credited.length === 0) return;
	const rewritten = await context.rewrittenIds("entry", credited);
	const targetIds = credited.map((record) => applyRewrittenIds(record, rewritten).id);
	const explicit = /* @__PURE__ */ new Set();
	for (const batch of chunks(targetIds, 50)) {
		const rows = await context.db.selectFrom("_emdash_content_bylines").select(["collection_slug", "content_id"]).where("content_id", "in", batch).where(({ exists, not, selectFrom }) => not(exists(selectFrom("_emdash_transfer_identity_map").select(sql`1`.as("one")).where("_emdash_transfer_identity_map.operation_id", "=", context.operationId).where("_emdash_transfer_identity_map.entity_kind", "=", INFERRED_CREDIT_ENTITY).whereRef("_emdash_transfer_identity_map.portable_id", "=", "_emdash_content_bylines.id")))).execute();
		for (const row of rows) explicit.add(`${row.collection_slug}\u0000${row.content_id}`);
	}
	const credits = [];
	credited.forEach((record, index) => {
		if (explicit.has(`${record.collection}\u0000${targetIds[index]}`)) return;
		const bylineGroup = groups.get(`${record.locale}:${record.authorPrincipal}`);
		if (bylineGroup === void 0) return;
		const credit = {
			kind: "content_byline",
			id: inferredCreditId(record.collection, record.id),
			collection: record.collection,
			entryId: record.id,
			bylineGroup,
			sortOrder: 0,
			...record.createdAt === void 0 ? {} : { createdAt: record.createdAt }
		};
		credits.push({
			record: credit,
			line: ""
		});
	});
	if (credits.length === 0) return;
	await context.identity.putMany(INFERRED_CREDIT_ENTITY, credits.map(({ record }) => ({
		portableId: record.id,
		targetId: record.bylineGroup
	})));
	await writeRecords(context, "content_byline", credits);
}
var recordKindSchema = z.enum(RECORD_KINDS);
var nonNegative = z.number().int().nonnegative();
var verifyCursorSchema = z.strictObject({
	phase: z.enum([
		"records",
		"credits",
		"counts",
		"media",
		"digest"
	]),
	kind: recordKindSchema,
	seq: nonNegative,
	line: nonNegative,
	counts: z.record(z.string(), nonNegative),
	credits: z.strictObject({
		checked: nonNegative,
		after: z.string().nullable()
	}),
	mismatches: z.array(z.strictObject({
		kind: z.string(),
		id: z.string(),
		reason: z.string()
	})).max(TRANSFER_LIMITS.verificationMismatches)
});
/** Kinds that are written to a target, in package order. */
var VERIFIED_KINDS = RECORD_KINDS.filter((kind) => kind !== "principal");
/** Kinds whose target row count must equal the package count. */
var COUNTED_KINDS = VERIFIED_KINDS.filter((kind) => kind !== "setting");
var CREDITS_PER_UNIT = 500;
/**
* Run one bounded verification step. Returns `done: false` with a cursor to
* pass to the next call, or the logical digest, verified counts per kind, and
* at most `TRANSFER_LIMITS.verificationMismatches` mismatches.
*/
async function verifyImportStep(input) {
	return new VerifyStep(input).run();
}
function initialCursor() {
	return {
		phase: "records",
		kind: VERIFIED_KINDS[0] ?? "collection",
		seq: 0,
		line: 0,
		counts: {},
		credits: {
			checked: 0,
			after: null
		},
		mismatches: []
	};
}
var VerifyStep = class {
	#input;
	#db;
	#identity;
	#reader;
	#readers = /* @__PURE__ */ new Map();
	#cursor;
	#rewrites = null;
	#keys = null;
	#context = null;
	#packageBlobs = /* @__PURE__ */ new Map();
	constructor(input) {
		this.#input = input;
		this.#db = input.db;
		this.#reader = new StagedPackageReader(input.reader.stage, new TransferStagedFileRepository(input.db).verifiedDigests(input.operationId));
		this.#identity = new TransferIdentityMapRepository(input.db, input.plan.origin.siteId, input.operationId);
		this.#cursor = input.cursor === null || input.cursor === void 0 ? initialCursor() : verifyCursorSchema.parse(input.cursor);
	}
	async run() {
		if (await this.#reader.digest() !== this.#input.plan.packageDigest) throw new TransferError("TRANSFER_PACKAGE_DIGEST_MISMATCH", "Staged package does not match");
		for (;;) {
			const progressed = await this.unit();
			if (progressed === "done") return this.finish();
			if (progressed === "yield") return {
				done: false,
				cursor: this.#cursor
			};
		}
	}
	mismatch(kind, id, reason) {
		if (this.#cursor.mismatches.length < TRANSFER_LIMITS.verificationMismatches) this.#cursor.mismatches.push({
			kind,
			id,
			reason
		});
	}
	async unit() {
		const budget = this.#input.budget;
		if (!budget.canStart({ bytes: 1 })) return "yield";
		switch (this.#cursor.phase) {
			case "records":
				budget.start(1);
				await this.recordsUnit();
				return "continue";
			case "credits":
				budget.start(1);
				await this.creditsUnit();
				return "continue";
			case "counts":
				budget.start(1);
				await this.countsUnit();
				return "continue";
			case "media": return this.mediaUnit();
			case "digest": return "done";
		}
	}
	reader(kind) {
		let reader = this.#readers.get(kind);
		if (!reader) {
			reader = createReader(this.#db, kind, { mediaBlobs: async (ids) => {
				const portable = await this.portableIds("media", ids);
				const found = /* @__PURE__ */ new Map();
				for (const id of ids) {
					const blob = this.#packageBlobs.get(portable.get(id) ?? id);
					if (blob !== void 0) found.set(id, blob);
				}
				return found;
			} });
			this.#readers.set(kind, reader);
		}
		return reader;
	}
	/** Whether any record id was rewritten on import. */
	async hasRewrites() {
		if (this.#rewrites === null) this.#rewrites = await this.#db.selectFrom("_emdash_transfer_identity_map").select("portable_id").where("operation_id", "=", this.#input.operationId).where("entity_kind", "in", [...RECORD_KINDS]).limit(1).executeTakeFirst() !== void 0;
		return this.#rewrites;
	}
	async targetIds(kind, ids) {
		if (!await this.hasRewrites() || ids.length === 0) return /* @__PURE__ */ new Map();
		return this.#identity.getMany(kind, ids);
	}
	async portableIds(kind, ids) {
		if (!await this.hasRewrites() || ids.length === 0) return /* @__PURE__ */ new Map();
		return this.#identity.getPortableIds(kind, ids);
	}
	/** Map a record's own id and its `by: "id"` references through `lookup`. */
	async mapIds(records, lookup) {
		if (!await this.hasRewrites() || records.length === 0) return records;
		const kind = records[0]?.kind;
		if (!kind) return records;
		const properties = [];
		if (!isSyntheticKind(kind) && kind !== "setting") properties.push({
			property: "id",
			target: kind
		});
		for (const reference of KIND_REFERENCES[kind]) {
			const target = reference.targets[0];
			if (reference.by !== "id" || !target || target === "principal") continue;
			properties.push({
				property: reference.property,
				target
			});
		}
		const maps = /* @__PURE__ */ new Map();
		for (const { property, target } of properties) {
			const values = records.flatMap((record) => {
				const value = Reflect.get(record, property);
				return typeof value === "string" ? [value] : [];
			});
			maps.set(property, await lookup(target, values));
		}
		return records.map((record) => {
			const next = { ...record };
			for (const { property } of properties) {
				const value = next[property];
				const mapped = typeof value === "string" ? maps.get(property)?.get(value) : void 0;
				if (mapped !== void 0) next[property] = mapped;
			}
			if (isSyntheticRecord(next)) next.id = syntheticId(next);
			return next;
		});
	}
	async keyIndex() {
		if (!this.#keys) {
			const rows = await loadMediaKeyRows(this.#db);
			const portable = await this.portableIds("media", rows.map((row) => row.id));
			this.#keys = buildMediaKeyIndex(rows.map((row) => ({
				id: portable.get(row.id) ?? row.id,
				storageKey: row.storageKey
			})));
		}
		return this.#keys;
	}
	async transformationContext() {
		if (this.#context) return this.#context;
		const reader = this.#reader;
		const collections = /* @__PURE__ */ new Map();
		for await (const { record } of reader.records("collection")) collections.set(record.id, record.slug);
		const types = /* @__PURE__ */ new Map();
		for await (const { record } of reader.records("field")) {
			const slug = collections.get(record.collectionId);
			if (slug === void 0) continue;
			const fields = types.get(slug) ?? /* @__PURE__ */ new Map();
			fields.set(record.slug, record.columnType);
			types.set(slug, fields);
		}
		this.#context = { fieldColumnTypes: types };
		return this.#context;
	}
	excludedSettings() {
		const excluded = /* @__PURE__ */ new Set();
		const { decisions } = this.#input.plan;
		if (decisions.siteTitle === "target") for (const name of DECIDED_SETTING_NAMES.title) excluded.add(name);
		if (decisions.siteTagline === "target") for (const name of DECIDED_SETTING_NAMES.tagline) excluded.add(name);
		return excluded;
	}
	chunkCount(kind, manifest) {
		return manifest.records[kind]?.chunks ?? 0;
	}
	async recordsUnit() {
		const manifest = await this.#reader.manifest();
		const { kind, seq } = this.#cursor;
		if (seq >= this.chunkCount(kind, manifest)) {
			this.advanceKind();
			return;
		}
		const chunk = await this.#reader.readChunk(kind, seq);
		const context = await this.transformationContext();
		const excluded = kind === "setting" ? this.excludedSettings() : /* @__PURE__ */ new Set();
		const packageRecords = chunk.map((staged) => staged.record).filter((record) => !excluded.has(record.id));
		if (kind === "media") {
			for (const record of packageRecords) if (record.kind === "media") this.#packageBlobs.set(record.id, record.blob);
		}
		const predicted = await this.disabledLoopClosers(packageRecords.map((record) => predictRelativeMediaUrls(applyTransformations(record, this.#input.plan, context))));
		const forward = await this.mapIds(predicted, (target, ids) => this.targetIds(target, ids));
		const lookup = forward.map((record) => record.id);
		const collections = new Map(forward.flatMap((record) => record.kind === "entry" ? [[record.id, record.collection]] : []));
		const found = await this.readTargets(kind, lookup, collections);
		const targets = await this.mapIds(lookup.flatMap((id) => {
			const record = found.get(id);
			return record ? [record] : [];
		}), (target, ids) => this.portableIds(target, ids));
		const byPortableId = new Map(targets.map((record) => [record.id, record]));
		const keys = await this.keyIndex();
		const hashes = [];
		let verified = 0;
		for (const expected of predicted) {
			const target = byPortableId.get(expected.id);
			if (!target) {
				this.mismatch(kind, expected.id, "missing");
				continue;
			}
			const rewritten = rewriteMediaRefs(target, {
				mode: "verify",
				keys,
				relativize: true
			});
			if (rewritten.errors.length > 0) this.mismatch(kind, expected.id, `media_ref_${rewritten.errors[0]?.code ?? "invalid"}`);
			const actual = rewritten.value.kind === "media" && expected.kind === "media" ? {
				...rewritten.value,
				blob: expected.blob
			} : rewritten.value;
			hashes.push([expected.id, await recordSha256(actual)]);
			if (canonicalJson(actual) === canonicalJson(expected)) verified++;
			else this.mismatch(kind, expected.id, "different");
		}
		await new TransferStagedFileRepository(this.#db).setLogicalSha256(this.#input.operationId, recordChunkPath(kind, seq), await chunkLogicalSha256(hashes));
		this.#cursor.counts[kind] = (this.#cursor.counts[kind] ?? 0) + verified;
		this.#cursor.seq = seq + 1;
	}
	/** Redirects the importer wrote disabled because they would close a loop. */
	async disabledLoopClosers(records) {
		const redirects = records.flatMap((record) => record.kind === "redirect" ? [record.id] : []);
		if (redirects.length === 0) return records;
		const closers = await this.#identity.getMany(REDIRECT_LOOP_ENTITY, redirects);
		if (closers.size === 0) return records;
		return records.map((record) => record.kind === "redirect" && closers.has(record.id) ? {
			...record,
			enabled: false
		} : record);
	}
	async readTargets(kind, ids, collections) {
		try {
			return await this.reader(kind).byIds(ids, collections);
		} catch (error) {
			if (isTransferError(error) && error.code === "TRANSFER_EXPORT_ERROR") throw new TransferError("TRANSFER_VERIFICATION_FAILED", "Target row is not a valid record", {
				detail: {
					...error.detail,
					kind
				},
				cause: error
			});
			throw error;
		}
	}
	advanceKind() {
		const next = VERIFIED_KINDS[VERIFIED_KINDS.indexOf(this.#cursor.kind) + 1];
		if (next) {
			this.#cursor.kind = next;
			this.#cursor.seq = 0;
			return;
		}
		this.#cursor.phase = "credits";
		this.#cursor.seq = 0;
	}
	async creditsUnit() {
		const mappings = await this.#identity.list(INFERRED_CREDIT_ENTITY, {
			after: this.#cursor.credits.after ?? void 0,
			limit: CREDITS_PER_UNIT
		});
		const rows = /* @__PURE__ */ new Map();
		for (const batch of chunks(mappings.map((mapping) => mapping.portableId), 50)) {
			const found = await this.#db.selectFrom("_emdash_content_bylines").select([
				"id",
				"byline_id",
				"sort_order",
				"role_label"
			]).where("id", "in", batch).execute();
			for (const row of found) rows.set(row.id, row);
		}
		for (const mapping of mappings) {
			const row = rows.get(mapping.portableId);
			if (!row) this.mismatch("content_byline", mapping.portableId, "inferred_credit_missing");
			else if (row.byline_id !== mapping.targetId || Number(row.sort_order) !== 0 || row.role_label !== null) this.mismatch("content_byline", mapping.portableId, "inferred_credit_different");
		}
		this.#cursor.credits.checked += mappings.length;
		const last = mappings.at(-1);
		if (last && mappings.length === CREDITS_PER_UNIT) {
			this.#cursor.credits.after = last.portableId;
			return;
		}
		this.#cursor.phase = "counts";
		this.#cursor.kind = COUNTED_KINDS[0] ?? "collection";
	}
	async countsUnit() {
		const manifest = await this.#reader.manifest();
		const kind = this.#cursor.kind;
		const rows = await this.reader(kind).countRows();
		let expected = manifest.records[kind]?.count ?? 0;
		if (kind === "content_byline") expected += this.#cursor.credits.checked;
		if (rows !== null && rows !== expected) this.mismatch(kind, "*", `row_count expected=${expected} actual=${rows}`);
		const next = COUNTED_KINDS[COUNTED_KINDS.indexOf(kind) + 1];
		if (next) {
			this.#cursor.kind = next;
			return;
		}
		this.#cursor.phase = "media";
		this.#cursor.kind = "media";
		this.#cursor.seq = 0;
		this.#cursor.line = 0;
	}
	#mediaChunk = null;
	async mediaUnit() {
		const manifest = await this.#reader.manifest();
		const { seq, line } = this.#cursor;
		if (seq >= this.chunkCount("media", manifest)) {
			this.#cursor.phase = "digest";
			return "continue";
		}
		if (this.#mediaChunk?.seq !== seq) {
			const records = (await this.#reader.readChunk("media", seq)).map((s) => s.record);
			const targetIds = await this.targetIds("media", records.map((record) => record.id));
			const ids = records.map((record) => targetIds.get(record.id) ?? record.id);
			const keys = /* @__PURE__ */ new Map();
			for (const row of await this.targetMediaKeys(ids)) keys.set(row.id, row.storageKey);
			const mapped = /* @__PURE__ */ new Map();
			records.forEach((record, index) => {
				const key = keys.get(ids[index] ?? record.id);
				if (key !== void 0) mapped.set(record.id, key);
			});
			this.#mediaChunk = {
				seq,
				records,
				keys: mapped
			};
		}
		const record = this.#mediaChunk.records[line];
		if (!record || record.kind !== "media") {
			this.#cursor.seq = seq + 1;
			this.#cursor.line = 0;
			return "continue";
		}
		const budget = this.#input.budget;
		const first = budget.bytesUsed === 0;
		if (!first && !budget.canStart({ bytes: 1 })) return "yield";
		const key = this.#mediaChunk.keys.get(record.id);
		if (key === void 0) {
			budget.start(1);
			this.mismatch("media", record.id, "missing");
		} else {
			const hashed = await hashStoredObject(this.#input.storage, key, { maxBytes: first ? void 0 : budget.remaining().bytes });
			if (hashed === "too_large") return "yield";
			budget.start(Math.max(hashed?.bytes ?? 0, 1));
			if (hashed === null) this.mismatch("media", record.id, "blob_missing");
			else if (hashed.sha256 !== record.blob) this.mismatch("media", record.id, "blob_mismatch");
		}
		this.#cursor.line = line + 1;
		return "continue";
	}
	async targetMediaKeys(ids) {
		const rows = [];
		for (const batch of chunks([...ids], 50)) {
			const found = await this.#db.selectFrom("media").select(["id", "storage_key"]).where("id", "in", batch).execute();
			for (const row of found) rows.push({
				id: row.id,
				storageKey: row.storage_key
			});
		}
		return rows;
	}
	async finish() {
		const manifest = await this.#reader.manifest();
		const staged = new TransferStagedFileRepository(this.#db);
		const recordChunks = [];
		for (const kind of VERIFIED_KINDS) for (let seq = 0; seq < this.chunkCount(kind, manifest); seq++) recordChunks.push([kind, seq]);
		const files = await staged.getMany(this.#input.operationId, recordChunks.map(([kind, seq]) => recordChunkPath(kindOf(kind), seq)));
		const tuples = [];
		for (const [kind, seq] of recordChunks) {
			const hash = files.get(recordChunkPath(kindOf(kind), seq))?.logicalSha256;
			if (!hash) throw new TransferError("TRANSFER_IMPORT_ERROR", "Chunk was not verified", { detail: {
				kind,
				seq
			} });
			tuples.push([
				kind,
				seq,
				hash
			]);
		}
		return {
			done: true,
			logicalDigest: await logicalDigest(tuples),
			counts: { ...this.#cursor.counts },
			mismatches: [...this.#cursor.mismatches]
		};
	}
};
/**
* The importer writes a placeholder media URL relative to the target, so an
* absolute one in a package record is predicted without its scheme and host.
*/
function predictRelativeMediaUrls(record) {
	const text = canonicalJson(record);
	const relative = relativizePlaceholderUrls(text);
	if (relative === text) return record;
	return JSON.parse(relative);
}
function kindOf(kind) {
	const found = RECORD_KINDS.find((candidate) => candidate === kind);
	if (!found) throw new Error(`Unknown record kind ${kind}`);
	return found;
}
var SYNTHETIC = new Set(SYNTHETIC_ID_KINDS);
function isSyntheticKind(kind) {
	return SYNTHETIC.has(kind);
}
function isSyntheticRecord(record) {
	return typeof record.kind === "string" && SYNTHETIC.has(record.kind);
}
/**
* The `rebuild` stage: derived state the importer does not write row by row.
*
* - `search`: full-text indexes for collections whose package search config
*   is enabled, populated in rowid ranges, then the collection's final
*   `search_config` (SQLite only; the plan declares `search_unsupported`
*   elsewhere).
* - `media_usage`: every imported collection is marked stale so the
*   media-usage maintenance engine re-indexes it.
* - `options`: `POST_IMPORT_OPTION_RESETS`.
* - `taxonomies`: each taxonomy's structure group, rebuilt from its imported
*   definitions; a group whose name no definition has any more is deleted.
* - `caches`: isolate caches and every object-cache namespace.
*/
var FTS_ROWS_PER_UNIT = 500;
var FTS_SETUP_STATEMENTS = 20;
var FTS_POPULATE_STATEMENTS = 4;
var STALE_STATEMENTS = 4;
var OPTION_STATEMENTS = 4;
var TAXONOMY_STATEMENTS = 4;
/** Unpublishing the redirect generation, plus the checkpoint. */
var CACHE_STATEMENTS = 2;
/** Run rebuild units from `position`; returns null when the stage is done. */
async function runRebuild(context, start, checkpoint) {
	let position = start;
	while (position) {
		const next = await runUnit(context, position);
		if (next === "budget") return position;
		if (next) await checkpoint(next);
		position = next;
	}
	return null;
}
function nextStep(step) {
	const following = REBUILD_STEPS[REBUILD_STEPS.indexOf(step) + 1];
	return following ? {
		step: following,
		after: null
	} : null;
}
async function collections(context) {
	return (await context.allRecords("collection")).toSorted((a, b) => compareIds(a.slug, b.slug));
}
async function runUnit(context, position) {
	switch (position.step) {
		case "search": return searchUnit(context, position.after);
		case "media_usage": {
			const collection = (await collections(context)).find((candidate) => position.after === null || compareIds(candidate.slug, position.after) > 0);
			if (!collection) return nextStep("media_usage");
			if (!context.budget.canStart({ queries: STALE_STATEMENTS })) return "budget";
			context.budget.start();
			await markContentMediaUsageCollectionStale(context.db, collection.slug, "CONTENT_USAGE_STALE");
			return {
				step: "media_usage",
				after: collection.slug
			};
		}
		case "options":
			if (!context.budget.canStart({ queries: OPTION_STATEMENTS })) return "budget";
			context.budget.start();
			for (const name of POST_IMPORT_OPTION_RESETS.bumpVersion) await sql`
					INSERT INTO options (name, value)
					VALUES (${name}, '2')
					ON CONFLICT(name) DO UPDATE SET value = CASE
						WHEN CAST(options.value AS INTEGER) % 2 = 0
							THEN CAST(CAST(options.value AS INTEGER) + 2 AS TEXT)
						ELSE CAST(CAST(options.value AS INTEGER) + 1 AS TEXT)
					END
				`.execute(context.db);
			await context.db.deleteFrom("options").where("name", "in", [...POST_IMPORT_OPTION_RESETS.delete]).execute();
			return nextStep("options");
		case "taxonomies": return taxonomyUnit(context, position.after);
		case "caches":
			if (!context.budget.canStart({ queries: CACHE_STATEMENTS })) return "budget";
			context.budget.start();
			await invalidateCaches(context);
			return nextStep("caches");
	}
}
function isTokenizer(value) {
	return SEARCH_TOKENIZERS.some((tokenizer) => tokenizer === value);
}
async function searchTargets(context) {
	const targets = [];
	for (const record of await collections(context)) {
		const config = applyTransformations(record, context.plan, { fieldColumnTypes: /* @__PURE__ */ new Map() }).searchConfig;
		if (typeof config !== "object" || config === null || Array.isArray(config)) continue;
		if (config.enabled !== true) continue;
		if (!isSqlite(context.db)) throw new TransferError("TRANSFER_IMPORT_ERROR", "Full-text search is not available on this target", { detail: {
			kind: "collection",
			id: record.id
		} });
		targets.push({
			record,
			config
		});
	}
	return targets;
}
/** `after`: null, `slug` (done), or `slug:rowid` (index created, rows ≤ rowid indexed). */
async function searchUnit(context, after) {
	const [doneSlug, rowidText] = after?.split(":") ?? [];
	const inProgress = rowidText === void 0 ? null : Number(rowidText);
	const target = (await searchTargets(context)).find((candidate) => inProgress === null ? doneSlug === void 0 || compareIds(candidate.record.slug, doneSlug) > 0 : candidate.record.slug === doneSlug);
	if (!target) return nextStep("search");
	const slug = target.record.slug;
	const fts = new FTSManager(context.db);
	if (inProgress === null) {
		if (!context.budget.canStart({ queries: FTS_SETUP_STATEMENTS })) return "budget";
		context.budget.start();
		const fields = await fts.getSearchableFields(slug);
		if (fields.length > 0) {
			const weights = target.config.weights;
			await fts.dropFtsTable(slug);
			await fts.createFtsTable(slug, fields, typeof weights === "object" && weights !== null ? Object.fromEntries(Object.entries(weights).filter((entry) => typeof entry[1] === "number")) : void 0, isTokenizer(target.config.tokenize) ? target.config.tokenize : void 0);
		}
		return {
			step: "search",
			after: `${slug}:0`
		};
	}
	if (!context.budget.canStart({ queries: FTS_POPULATE_STATEMENTS })) return "budget";
	context.budget.start();
	const fields = await fts.getSearchableFields(slug);
	const last = fields.length > 0 ? await fts.populateRange(slug, fields, inProgress, FTS_ROWS_PER_UNIT) : null;
	if (last !== null) return {
		step: "search",
		after: `${slug}:${last}`
	};
	await context.db.updateTable("_emdash_collections").set({ search_config: JSON.stringify(target.config) }).where("id", "=", target.record.id).execute();
	return {
		step: "search",
		after: slug
	};
}
/**
* `after`: the last taxonomy name whose group was rebuilt, or null.
*
* The group becomes hierarchical if any definition is and lists every collection
* any definition lists. The definitions keep the package's values, which the
* verify stage compares; they differ from the group only where the exporting
* site's locales disagreed.
*/
async function taxonomyUnit(context, after) {
	if (!context.budget.canStart({ queries: TAXONOMY_STATEMENTS })) return "budget";
	context.budget.start();
	const db = context.db;
	let nextName = db.selectFrom("_emdash_taxonomy_defs").select((eb) => eb.fn.min("name").as("name"));
	if (after !== null) nextName = nextName.where("name", ">", after);
	const defs = await db.selectFrom("_emdash_taxonomy_defs").select([
		"id",
		"name",
		"hierarchical",
		"collections",
		"translation_group"
	]).where("name", "=", nextName).orderBy("id").execute();
	const name = defs[0]?.name;
	if (name === void 0) {
		await db.deleteFrom("_emdash_taxonomy_def_groups").where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_taxonomy_defs").select(sql`1`.as("one")).whereRef("_emdash_taxonomy_defs.name", "=", "_emdash_taxonomy_def_groups.name")))).execute();
		return nextStep("taxonomies");
	}
	const groupId = defs.map((def) => def.translation_group ?? def.id).reduce((lowest, candidate) => candidate < lowest ? candidate : lowest);
	const collectionSlugs = [...new Set(defs.flatMap((def) => parseTaxonomyCollections(def.collections)))];
	const hierarchical = defs.some((def) => def.hierarchical === 1) ? 1 : 0;
	const id = await db.selectFrom("_emdash_taxonomy_def_groups").select("id").where("id", "=", groupId).where("name", "!=", name).executeTakeFirst() ? await ulidFromHash(context.operationId, "taxonomy_group", name) : groupId;
	await db.insertInto("_emdash_taxonomy_def_groups").values({
		id,
		name,
		hierarchical,
		collections: JSON.stringify(collectionSlugs)
	}).onConflict((oc) => oc.column("name").doUpdateSet({
		id,
		hierarchical,
		collections: JSON.stringify(collectionSlugs)
	})).execute();
	return {
		step: "taxonomies",
		after: name
	};
}
async function invalidateCaches(context) {
	await unpublishRedirectArtifacts(context);
	for (const namespace of Object.values(CacheNamespace)) invalidateObjectCache(namespace);
	for (const collection of await collections(context)) {
		invalidateCollectionCache(collection.slug);
		invalidateSchemaCache(collection.slug);
	}
	invalidateSiteSettingsCache();
	resetRegisteredCollectionsCache();
	const { invalidateTermCache, invalidateTaxonomyDefsCache } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
	const { invalidateBylineCache } = await import("./bylines-f_ZEc6Sn_Cz4uDRKR.mjs").then((n) => n.t);
	const { invalidateRedirectCache } = await import("./cache-5DHbpEWu_CmSRzIKD.mjs").then((n) => n.t);
	const { invalidateUrlPatternCache } = await import("./query-D62NntCZ_KAlbGiAn.mjs").then((n) => n.s);
	invalidateTermCache();
	invalidateTaxonomyDefsCache();
	invalidateBylineCache();
	invalidateRedirectCache();
	invalidateUrlPatternCache();
}
/** Point redirect readers at the imported rules table until a repair republishes. */
async function unpublishRedirectArtifacts(context) {
	try {
		await context.db.updateTable("_emdash_redirect_state").set({
			generation: null,
			generation_revision: -1
		}).where("id", "=", 1).execute();
	} catch (error) {
		if (!isMissingTableError(error)) throw error;
	}
}
/**
* The `clear_scaffold` stage: delete the seeded scaffold the plan declared
* (`seeded_scaffold_removed`), one item per unit, then wait until
* media-usage collection deletions of removed collections have finished so
* the package may reuse their slugs.
*/
var ITEM_STATEMENTS = 40;
function declaredScaffold(context) {
	return context.plan.transformations.flatMap((transformation) => transformation.code === "seeded_scaffold_removed" ? transformation.items : []);
}
/**
* Delete declared items from `step` on. Each item is removed only if it is
* still the scaffold it was when analyzed (an unassigned term, an empty menu,
* an empty widget area, a theme section, a seeded block type); deleting an already-deleted item
* is a no-op.
*/
async function clearScaffold(context, step, checkpoint) {
	const items = declaredScaffold(context);
	let next = step;
	let removedMenus = false;
	let removedWidgets = false;
	try {
		while (next < items.length) {
			const item = items[next];
			if (!item) break;
			if (!context.budget.canStart({ queries: ITEM_STATEMENTS })) return {
				state: "continue",
				step: next
			};
			context.budget.start();
			await removeItem(context, item);
			if (item.type === "menu" || item.type === "menu_item") removedMenus = true;
			if (item.type === "widget" || item.type === "widget_area") removedWidgets = true;
			next++;
			await checkpoint(next);
		}
	} finally {
		if (removedMenus) invalidateMenuObjectCache();
		if (removedWidgets) invalidateWidgetObjectCache();
	}
	const collectionIds = items.flatMap((item) => item.type === "collection" ? [item.id] : []);
	while (collectionIds.length > 0) {
		if (!context.budget.canStart({ queries: ITEM_STATEMENTS })) return {
			state: "continue",
			step: next
		};
		context.budget.start();
		if ((await context.db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("collection_id", "in", collectionIds).execute()).length === 0) break;
		const tick = await processDueMediaUsageCollectionDeletions(context.db);
		if (tick.outcome === "idle" || tick.outcome === "claim_lost" || tick.outcome === "retry") return {
			state: "wait",
			step: next
		};
		if (tick.outcome === "failed") throw new TransferError("TRANSFER_IMPORT_ERROR", "Removing the seeded scaffold collections failed");
	}
	return { state: "done" };
}
async function removeItem(context, item) {
	const db = context.db;
	switch (item.type) {
		case "collection": {
			const row = await db.selectFrom("_emdash_collections").select("slug").where("id", "=", item.id).executeTakeFirst() ?? await db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_slug as slug").where("collection_id", "=", item.id).executeTakeFirst();
			if (!row) return;
			try {
				await new SchemaRegistry(db).deleteCollection(row.slug);
			} catch (error) {
				if (error instanceof SchemaError && error.code === "COLLECTION_NOT_FOUND") return;
				if (error instanceof SchemaError) throw new TransferError("TRANSFER_TARGET_NOT_EMPTY", "Scaffold collection is in use", {
					detail: {
						type: item.type,
						id: item.id,
						reason: error.code
					},
					cause: error
				});
				throw error;
			}
			return;
		}
		case "term":
			await db.deleteFrom("taxonomies").where("id", "=", item.id).where((eb) => eb.not(eb.exists(eb.selectFrom("content_taxonomies").select(sql`1`.as("one")).where("content_taxonomies.taxonomy_id", "=", eb.fn.coalesce("taxonomies.translation_group", "taxonomies.id"))))).execute();
			return;
		case "menu_item":
			await db.deleteFrom("_emdash_menu_items").where("id", "=", item.id).execute();
			return;
		case "widget":
			await db.deleteFrom("_emdash_widgets").where("id", "=", item.id).execute();
			return;
		case "taxonomy_def":
			await db.deleteFrom("_emdash_taxonomy_defs").where("id", "=", item.id).where((eb) => eb.not(eb.exists(eb.selectFrom("taxonomies").select(sql`1`.as("one")).whereRef("taxonomies.name", "=", "_emdash_taxonomy_defs.name")))).execute();
			return;
		case "menu":
			await db.deleteFrom("_emdash_menus").where("id", "=", item.id).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_menu_items").select(sql`1`.as("one")).whereRef("_emdash_menu_items.menu_id", "=", "_emdash_menus.id")))).execute();
			return;
		case "widget_area":
			await db.deleteFrom("_emdash_widget_areas").where("id", "=", item.id).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_widgets").select(sql`1`.as("one")).whereRef("_emdash_widgets.area_id", "=", "_emdash_widget_areas.id")))).execute();
			return;
		case "section":
			await db.deleteFrom("_emdash_sections").where("id", "=", item.id).where("source", "=", "theme").execute();
			return;
		case "block_type":
			await db.deleteFrom("_emdash_block_type_versions").where("block_type_id", "=", item.id).where((eb) => eb.exists(eb.selectFrom("_emdash_block_types").select(sql`1`.as("one")).where("_emdash_block_types.id", "=", item.id).where("_emdash_block_types.source", "=", "seed"))).execute();
			await db.deleteFrom("_emdash_block_types").where("id", "=", item.id).where("source", "=", "seed").execute();
			return;
		default: throw new TransferError("TRANSFER_IMPORT_ERROR", "Unknown scaffold item type", { detail: {
			type: item.type,
			id: item.id
		} });
	}
}
/** Delay the caller should wait before advancing again after a retry-later step. */
var IMPORT_RETRY_MS = 2e3;
/** Errors another caller's lease explains; the step is abandoned without touching the operation. */
var LEASE_CODES = /* @__PURE__ */ new Set(["TRANSFER_LEASE_LOST", "TRANSFER_LEASE_ACTIVE"]);
/**
* Failures a later step may not hit again, and how many consecutive steps
* may fail without progress before the import fails. A staged file that
* cannot be read is usually gone for good, so it gets few attempts; storage
* and database errors are more often passing. Every other transfer error
* fails the import at once.
*/
var RETRY_LIMITS = {
	TRANSFER_FILE_MISSING: 3,
	TRANSFER_STORAGE_ERROR: 8,
	TRANSFER_IMPORT_ERROR: 8
};
var MAX_RETRY_DELAY_MS = 6e4;
/** Delay before the `attempts`th retry: doubling from `IMPORT_RETRY_MS`. */
function importRetryDelay(attempts) {
	return Math.min(IMPORT_RETRY_MS * 2 ** Math.max(0, attempts - 1), MAX_RETRY_DELAY_MS);
}
var EXECUTABLE_STATES = [
	"planned",
	"running",
	"verifying"
];
function result(operation, nextRequestInMs) {
	return {
		operation,
		nextRequestInMs: isTerminalState(operation.kind, operation.state) ? null : nextRequestInMs
	};
}
/**
* Mark a planned import for execution. Requires the digests the caller
* reviewed; the first `advanceImport` then reserves the target. Repeating
* the request for an import that already started returns it unchanged, with
* `requested` false.
*/
async function requestImportExecution(input) {
	const ops = new TransferOperationRepository(input.db);
	const operation = await ops.require(input.operationId);
	if (operation.kind !== "import") throw new TransferError("TRANSFER_INVALID_STATE", "Operation is not an import");
	if (operation.packageDigest !== input.packageDigest) throw new TransferError("TRANSFER_PACKAGE_DIGEST_MISMATCH", "Package digest does not match");
	if (operation.planDigest === null || operation.planDigest !== input.planDigest) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Plan digest does not match");
	if (operation.state !== "planned" || operation.stage === "reserve") {
		const started = EXECUTING_IMPORT_STATES.includes(operation.state) || operation.mutationStartedAt !== null;
		if (operation.state === "planned" || started) return {
			operation,
			requested: false
		};
		throw new TransferError("TRANSFER_INVALID_STATE", "Import cannot be executed in its state");
	}
	const claim = await ops.claim(operation.id, ["planned"]);
	if (claim.outcome === "lease_active") throw new TransferError("TRANSFER_LEASE_ACTIVE", "Import is busy; try again");
	if (claim.outcome === "invalid_state") throw new TransferError("TRANSFER_INVALID_STATE", "Import cannot be executed in its state");
	return {
		operation: await ops.release(operation.id, claim.leaseToken, {
			stage: "reserve",
			cursor: { stage: "reserve" }
		}),
		requested: true
	};
}
async function advanceImport(options) {
	const ops = new TransferOperationRepository(options.db);
	const claim = await ops.claim(options.operationId, EXECUTABLE_STATES);
	if (claim.outcome !== "claimed") {
		if (claim.operation.kind !== "import") throw new TransferError("TRANSFER_INVALID_STATE", "Operation is not an import");
		return {
			...result(claim.operation, IMPORT_RETRY_MS),
			ended: false
		};
	}
	const step = await advanceClaimed(options, ops, claim.operation, claim.leaseToken);
	return {
		...step,
		ended: isTerminalState(step.operation.kind, step.operation.state)
	};
}
async function advanceClaimed(options, ops, operation, leaseToken) {
	if (operation.kind !== "import" || operation.state === "planned" && operation.stage !== "reserve") {
		await ops.release(operation.id, leaseToken);
		throw new TransferError("TRANSFER_INVALID_STATE", "Import has not been requested for execution");
	}
	try {
		if (await mediaUsageActivating(options.db)) return result(await ops.release(operation.id, leaseToken), IMPORT_RETRY_MS);
		return await runStep(await loadContext(options, ops, operation, leaseToken), options.verify);
	} catch (error) {
		if (error instanceof ImportCancelledSignal) return result(await ops.finishCancelled(operation.id, leaseToken), 0);
		if (error instanceof ImportCollectionDeletionSignal) return result(await ops.releaseUnlessCancelled(operation.id, leaseToken, "running"), error.waiting ? IMPORT_RETRY_MS : 0);
		if (isTransferError(error) && LEASE_CODES.has(error.code)) throw error;
		const code = isTransferError(error) ? error.code : "TRANSFER_IMPORT_ERROR";
		const detail = isTransferError(error) ? error.detail : void 0;
		const limit = RETRY_LIMITS[code];
		if (limit === void 0 || isTransferError(error) && code === "TRANSFER_IMPORT_ERROR") return result(await ops.fail(operation.id, leaseToken, {
			code,
			detail
		}), 0);
		if (!isTransferError(error)) console.error("[transfer] import step failed:", error);
		const attempts = retryAttempts(await ops.require(operation.id)) + 1;
		const retryDetail = {
			...detail,
			attempts
		};
		if (attempts >= limit) return result(await ops.fail(operation.id, leaseToken, {
			code,
			detail: retryDetail
		}), 0);
		return result(await ops.release(operation.id, leaseToken, { retryError: {
			code,
			detail: retryDetail
		} }), importRetryDelay(attempts));
	}
}
/** Consecutive failed steps recorded since the import last made progress. */
function retryAttempts(operation) {
	if (operation.errorCode === null || isTerminalState(operation.kind, operation.state)) return 0;
	const attempts = operation.errorDetail?.attempts;
	return typeof attempts === "number" ? attempts : 0;
}
async function mediaUsageActivating(db) {
	try {
		return (await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state === "activating";
	} catch (error) {
		if (isMissingTableError(error)) return false;
		throw error;
	}
}
async function loadContext(options, ops, operation, leaseToken) {
	const stage = new TransferStage(options.storage, stagingPrefix("import", operation.id, operation.stagingSecret));
	const reader = new StagedPackageReader(stage, new TransferStagedFileRepository(options.db).verifiedDigests(operation.id));
	const manifest = await reader.manifest();
	const packageDigest = await reader.digest();
	if (operation.packageDigest !== packageDigest) throw new TransferError("TRANSFER_PACKAGE_DIGEST_MISMATCH", "Staged package does not match");
	const planText = await stage.readAux("plan", TRANSFER_LIMITS.manifestBytes);
	if (planText === null) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Import plan is missing");
	const parsed = siteImportPlanSchema.safeParse(JSON.parse(planText));
	if (!parsed.success || await planDigest(parsed.data) !== operation.planDigest) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Import plan does not match");
	const plan = parsed.data;
	if (plan.packageDigest !== packageDigest) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Plan is for another package");
	if (!isPlanExecutable(plan)) throw new TransferError("TRANSFER_PLAN_BLOCKED", "Import plan has blockers");
	return new ImportContext(options.db, options.storage, ops, operation, leaseToken, plan, manifest, reader, options.budget ?? new TransferStepBudget());
}
function stageProgress(stage) {
	return {
		done: IMPORT_STAGES.indexOf(stage),
		total: IMPORT_STAGES.length
	};
}
async function checkpoint(context, cursor, patch = {}) {
	const operation = await context.ops.advance(context.operationId, context.leaseToken, {
		...patch,
		...context.operation.errorCode === null ? {} : { retryError: null },
		stage: cursor.stage,
		cursor,
		progress: stageProgress(cursor.stage)
	});
	context.operation = operation;
	if (operation.cancelRequestedAt !== null) throw new ImportCancelledSignal();
}
function currentCursor(operation) {
	const cursor = operation.cursor;
	if (cursor === null) return { stage: "reserve" };
	if (!IMPORT_STAGES.includes(cursor.stage)) throw new TransferError("TRANSFER_INVALID_STATE", "Operation cursor is not an import cursor");
	return cursor;
}
function nextRecordStageCursor(stage) {
	const next = IMPORT_STAGES[IMPORT_STAGES.indexOf(stage) + 1];
	if (next === "rebuild") return {
		stage: "rebuild",
		step: "search",
		after: null
	};
	const recordStage = IMPORT_RECORD_STAGES.find((candidate) => candidate === next);
	if (!recordStage) throw new Error(`No record stage follows ${stage}`);
	return {
		stage: recordStage,
		position: firstPosition(recordStage)
	};
}
/** The checkpoint that moves the cursor to the next stage. */
var TRANSITION_STATEMENTS = 1;
async function yieldStep(context, nextRequestInMs) {
	return result(await context.ops.release(context.operationId, context.leaseToken), nextRequestInMs);
}
async function runStep(context, verify) {
	for (;;) {
		const cursor = currentCursor(context.operation);
		switch (cursor.stage) {
			case "reserve":
				await reserve(context);
				break;
			case "clear_scaffold": {
				const progress = await clearScaffold(context, cursor.step, (step) => checkpoint(context, {
					stage: "clear_scaffold",
					step
				}));
				if (progress.state === "continue") return yieldStep(context, 0);
				if (progress.state === "wait") return yieldStep(context, IMPORT_RETRY_MS);
				if (!context.budget.canStart({ queries: TRANSITION_STATEMENTS })) return yieldStep(context, 0);
				await checkpoint(context, {
					stage: "schema",
					position: firstPosition("schema")
				});
				break;
			}
			case "schema":
			case "media":
			case "terms_bylines":
			case "content":
			case "relations":
			case "presentation": {
				const stage = cursor.stage;
				if (await runRecordStage(context, stage, cursor.position, (position) => checkpoint(context, {
					stage,
					position
				})) || !context.budget.canStart({ queries: TRANSITION_STATEMENTS })) return yieldStep(context, 0);
				await checkpoint(context, nextRecordStageCursor(stage));
				break;
			}
			case "rebuild":
				if (await runRebuild(context, {
					step: cursor.step,
					after: cursor.after
				}, (position) => checkpoint(context, {
					stage: "rebuild",
					...position
				}))) return yieldStep(context, 0);
				await checkpoint(context, {
					stage: "verify",
					position: null,
					mediaAfter: null,
					mismatches: 0
				}, { state: "verifying" });
				break;
			case "verify": return runVerify(context, verify, cursor.verifier ?? null);
		}
	}
}
async function reserve(context) {
	await checkpoint(context, { stage: "reserve" }, { state: "running" });
	const siteId = await getOrCreateSiteId(context.db);
	const dialect = isPostgres(context.db) ? "postgres" : "sqlite";
	if (siteId !== context.plan.target.siteId || dialect !== context.plan.target.dialect) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Plan was made for another target");
	await assertMappedUsersExist(context);
	const domain = await inspectPortableDomain(context.db);
	const declared = new Set(declaredScaffold(context).map((item) => `${item.type}:${item.id}`));
	const undeclared = domain.seededScaffold.filter((item) => !declared.has(`${item.type}:${item.id}`));
	if (!domain.empty || undeclared.length > 0) throw new TransferError("TRANSFER_TARGET_NOT_EMPTY", "The target site is not empty", { detail: {
		blockers: domain.blockers.length,
		undeclaredScaffold: undeclared.length
	} });
	await checkpoint(context, {
		stage: "clear_scaffold",
		step: 0
	}, { markMutationStarted: true });
}
async function assertMappedUsersExist(context) {
	const mappings = Object.entries(context.plan.decisions.principalMappings);
	const userIds = [...new Set(mappings.flatMap(([, userId]) => userId === null ? [] : [userId]))];
	const found = /* @__PURE__ */ new Set();
	for (const batch of chunks(userIds, 50)) {
		const rows = await context.db.selectFrom("users").select("id").where("id", "in", batch).execute();
		for (const row of rows) found.add(row.id);
	}
	const missing = mappings.find(([, userId]) => userId !== null && !found.has(userId));
	if (missing) throw new TransferError("TRANSFER_DECISIONS_INVALID", "A mapped target user no longer exists", { detail: { principal: missing[0] } });
}
async function runVerify(context, verify, start) {
	const step = await verify({
		db: context.db,
		storage: context.storage,
		operationId: context.operationId,
		reader: context.reader,
		plan: context.plan,
		cursor: start,
		budget: context.budget
	});
	if (!step.done) {
		await checkpoint(context, {
			stage: "verify",
			position: null,
			mediaAfter: null,
			mismatches: 0,
			verifier: toJson(step.cursor)
		});
		return yieldStep(context, 0);
	}
	if (step.mismatches.length > 0) {
		const detail = { mismatches: step.mismatches.length };
		step.mismatches.slice(0, TRANSFER_LIMITS.verificationMismatches).forEach((mismatch, index) => {
			detail[`mismatch_${index}`] = `${mismatch.kind}:${mismatch.id}:${mismatch.reason}`.slice(0, 512);
		});
		throw new TransferError("TRANSFER_VERIFICATION_FAILED", "Imported site does not match the package", { detail });
	}
	const operation = context.operation;
	if (operation.packageDigest === null || operation.planDigest === null) throw new TransferError("TRANSFER_INVALID_STATE", "Import digests are missing");
	const receipt = await sealReceipt({
		operationId: operation.id,
		packageDigest: operation.packageDigest,
		planDigest: operation.planDigest,
		targetSiteId: context.plan.target.siteId,
		originSiteId: context.manifest.originSiteId,
		formatVersion: "1",
		importerEmDashVersion: VERSION,
		completedAt: (/* @__PURE__ */ new Date()).toISOString(),
		logicalDigest: step.logicalDigest,
		counts: step.counts,
		warnings: context.plan.warnings.slice(0, 500).map((warning) => ({
			code: warning.code,
			message: warning.message
		})),
		verification: "verified"
	});
	return result(await context.ops.complete(operation.id, context.leaseToken, {
		receipt,
		progress: {
			done: IMPORT_STAGES.length,
			total: IMPORT_STAGES.length
		}
	}), 0);
}
function toJson(value) {
	return value;
}
/** Poll delay suggested while another request holds an operation's lease. */
var LEASE_RETRY_MS = 1e3;
function isLeaseError(error) {
	return isTransferError(error) && (error.code === "TRANSFER_LEASE_LOST" || error.code === "TRANSFER_LEASE_ACTIVE");
}
var PAGE_LIMIT_DEFAULT = 50;
var PAGE_LIMIT_MAX = 100;
function failure(code, message, details) {
	return {
		success: false,
		error: details === void 0 ? {
			code,
			message
		} : {
			code,
			message,
			details
		}
	};
}
function errorResult(error, fallbackCode, fallbackMessage) {
	if (isTransferError(error)) return failure(error.code, error.message, error.detail ? { ...error.detail } : void 0);
	if (error instanceof InvalidCursorError) return failure("INVALID_CURSOR", "Invalid pagination cursor");
	console.error(`[transfer] ${fallbackMessage}:`, error);
	return failure(fallbackCode, fallbackMessage);
}
function pageLimit(limit) {
	return Math.min(Math.max(Math.trunc(limit ?? PAGE_LIMIT_DEFAULT), 1), PAGE_LIMIT_MAX);
}
function decodeTimeCursor(cursor) {
	if (cursor === void 0) return void 0;
	const { orderValue, id } = decodeCursor(cursor);
	return {
		createdAt: orderValue,
		id
	};
}
function stageFor(storage, operation) {
	return new TransferStage(storage, stagingPrefix(operation.kind, operation.id, operation.stagingSecret));
}
async function requireImport(operations, operationId) {
	const operation = await operations.get(operationId);
	if (!operation || operation.kind !== "import") throw new TransferError("TRANSFER_OPERATION_NOT_FOUND", "Transfer operation not found");
	return operation;
}
async function handleTransferCapabilities(db, target) {
	try {
		const domain = await inspectPortableDomain(db);
		return {
			success: true,
			data: {
				formatVersions: [...SUPPORTED_FORMAT_VERSIONS],
				features: [...SITE_PACKAGE_FEATURES],
				optionalFeatures: [...OPTIONAL_FEATURES].toSorted(),
				limits: {
					manifestBytes: TRANSFER_LIMITS.manifestBytes,
					recordLineBytes: TRANSFER_LIMITS.recordLineBytes,
					chunkBytes: TRANSFER_LIMITS.chunkBytes,
					chunkRecords: TRANSFER_LIMITS.chunkRecords,
					totalRecords: TRANSFER_LIMITS.totalRecords,
					totalFiles: TRANSFER_LIMITS.totalFiles,
					indexChunks: TRANSFER_LIMITS.indexChunks,
					jsonDepth: TRANSFER_LIMITS.jsonDepth,
					maxBlobBytes: target.maxUploadSize
				},
				portableDomain: {
					empty: domain.empty,
					blockers: domain.blockers.map((blocker) => ({ ...blocker })),
					seededScaffold: domain.seededScaffold.map((item) => ({ ...item }))
				}
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_ANALYZE_ERROR", "Failed to read transfer capabilities");
	}
}
async function listMissing(db, operationId, options) {
	const limit = pageLimit(options.limit);
	const after = options.cursor === void 0 ? void 0 : decodeCursor(options.cursor).orderValue;
	const files = await new TransferStagedFileRepository(db).list(operationId, {
		state: "declared",
		after,
		limit: limit + 1
	});
	const items = files.slice(0, limit).map((file) => ({
		path: file.path,
		bytes: file.bytes,
		sha256: file.sha256
	}));
	const last = items.at(-1);
	return files.length > limit && last ? {
		items,
		nextCursor: encodeCursor(last.path, last.path)
	} : { items };
}
async function stageManifest(db, storage, operation, manifest, bytes) {
	const staged = new TransferStagedFileRepository(db);
	if ((await staged.get(operation.id, "manifest.json"))?.state !== "verified") {
		const sha256 = await sha256Hex$1(bytes);
		await stageFor(storage, operation).putVerified(MANIFEST_PATH, bytes, bytes.byteLength, sha256, {
			contentType: "application/json",
			keepExistingOnFailure: () => staged.isVerified(operation.id, MANIFEST_PATH)
		});
		await staged.declareMany(operation.id, [{
			path: MANIFEST_PATH,
			bytes: bytes.byteLength,
			sha256
		}], "verified");
	}
	await staged.declareMany(operation.id, manifest.index.map((ref) => ({
		path: ref.path,
		bytes: ref.bytes,
		sha256: ref.sha256
	})));
}
/**
* Create an import from a manifest, stage the manifest, and return the first
* page of files still to upload. The same idempotency key with the same
* manifest returns the existing operation; with a different manifest it
* fails with `TRANSFER_IDEMPOTENCY_CONFLICT`.
*/
async function handleImportCreate(db, storage, input) {
	try {
		const manifest = parseManifest(input.manifest);
		const digest = await packageDigest(manifest);
		const domain = await inspectPortableDomain(db);
		if (!domain.empty) throw new TransferError("TRANSFER_TARGET_NOT_EMPTY", "This site already has content; import needs an empty site", { detail: { blockers: domain.blockers.length } });
		const { operation, created } = await new TransferOperationRepository(db).create({
			kind: "import",
			createdBy: input.userId,
			idempotencyKey: input.idempotencyKey,
			packageDigest: digest,
			originSiteId: manifest.originSiteId
		});
		if (operation.kind !== "import") throw new TransferError("TRANSFER_INVALID_STATE", "Operation is not an import");
		if (created) await recordTransferAudit(db, {
			actorId: input.userId,
			action: "transfer_import_create",
			resourceType: "transfer_operation",
			resourceId: operation.id,
			details: { packageDigest: digest }
		});
		if (operation.state === "uploading") await stageManifest(db, storage, operation, manifest, input.manifest);
		return {
			success: true,
			data: {
				operation: toPublicOperation(operation),
				created,
				missing: await listMissing(db, operation.id, {})
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to create import");
	}
}
async function handleImportMissing(db, operationId, options) {
	try {
		await requireImport(new TransferOperationRepository(db), operationId);
		return {
			success: true,
			data: await listMissing(db, operationId, options)
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to list missing files");
	}
}
function fileLimit(type, maxBlobBytes) {
	switch (type) {
		case "manifest": return TRANSFER_LIMITS.manifestBytes;
		case "media": return maxBlobBytes;
		case "index":
		case "records": return TRANSFER_LIMITS.chunkBytes;
	}
}
async function digestOfBody(body, bytes) {
	const hasher = await createSha256();
	const hashing = createHashingStream(hasher, {
		maxBytes: bytes,
		onLimitExceeded: () => new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "File is larger than declared")
	});
	if (body) await body.pipeThrough(hashing.stream).pipeTo(new WritableStream());
	return {
		sha256: await hasher.digest(),
		bytes: hashing.bytes()
	};
}
/**
* Whether the staged object at `path` exists and still holds exactly the
* bytes it was verified with. A storage error other than a missing object
* is thrown rather than read as a mismatch.
*/
async function stagedFileIntact(stage, path, file) {
	if (!await stage.exists(path)) return false;
	let download;
	try {
		download = await stage.storage.download(stage.keyFor(path));
	} catch (error) {
		throw new TransferError("TRANSFER_STORAGE_ERROR", "Failed to read a staged file", { cause: error });
	}
	try {
		const stored = await digestOfBody(download.body, file.bytes);
		return stored.bytes === file.bytes && stored.sha256 === file.sha256;
	} catch (error) {
		if (isTransferError(error) && error.code === "TRANSFER_FILE_SIZE_MISMATCH") return false;
		throw error;
	}
}
/**
* Stream one declared package file into staging, verifying its size and
* digest. Uploading an index chunk declares the files it lists. A path that
* is already verified is only compared, never written, while its staged
* object still matches; once that object no longer matches (a failed
* concurrent upload of the same path overwrote it), an upload replaces it.
* An upload that is still streaming when analysis starts is refused.
*/
async function handleImportFileUpload(db, storage, input) {
	try {
		const operations = new TransferOperationRepository(db);
		const operation = await requireImport(operations, input.operationId);
		if (operation.state !== "uploading") throw new TransferError("TRANSFER_INVALID_STATE", "Files can only be uploaded before analysis");
		const parsed = parsePackagePath(input.path);
		if (!parsed) throw new TransferError("TRANSFER_PATH_INVALID", "Invalid package path");
		const staged = new TransferStagedFileRepository(db);
		const file = await staged.get(operation.id, parsed.path);
		if (!file) throw new TransferError("TRANSFER_FILE_NOT_DECLARED", "File is not declared by the package", { detail: { path: parsed.path } });
		const limit = fileLimit(parsed.type, input.maxBlobBytes);
		if (file.bytes > limit) throw new TransferError("TRANSFER_LIMIT_EXCEEDED", "File is larger than this site accepts", { detail: {
			path: parsed.path,
			bytes: file.bytes,
			limit
		} });
		if (input.contentLength !== file.bytes) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "Content-Length does not match the declared size", { detail: {
			path: parsed.path,
			expected: file.bytes
		} });
		const stage = stageFor(storage, operation);
		if (file.state === "verified" && await stagedFileIntact(stage, parsed.path, file)) {
			const received = await digestOfBody(input.body, file.bytes);
			if (received.bytes !== file.bytes) throw new TransferError("TRANSFER_FILE_SIZE_MISMATCH", "File size does not match", { detail: {
				path: parsed.path,
				expected: file.bytes
			} });
			if (received.sha256 !== file.sha256) throw new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "File digest does not match", { detail: { path: parsed.path } });
			return {
				success: true,
				data: {
					path: parsed.path,
					bytes: file.bytes,
					alreadyVerified: true,
					remaining: (await staged.countByState(operation.id)).declared
				}
			};
		}
		await stage.putVerified(parsed.path, input.body ?? /* @__PURE__ */ new Uint8Array(0), file.bytes, file.sha256, { keepExistingOnFailure: () => staged.isVerified(operation.id, parsed.path) });
		if ((await operations.require(operation.id)).state !== "uploading") throw new TransferError("TRANSFER_INVALID_STATE", "Files can only be uploaded before analysis");
		if (parsed.type === "index") {
			const entries = await new StagedPackageReader(stage).indexChunk(parsed.seq);
			await staged.declareMany(operation.id, entries.map((entry) => ({
				path: entry.path,
				bytes: entry.bytes,
				sha256: entry.sha256
			})));
		}
		await staged.markVerified(operation.id, file);
		return {
			success: true,
			data: {
				path: parsed.path,
				bytes: file.bytes,
				alreadyVerified: false,
				remaining: (await staged.countByState(operation.id)).declared
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_STORAGE_ERROR", "Failed to store the uploaded file");
	}
}
/**
* Run one bounded analysis step. Once the import is planned, returns the plan
* and, when `decisions` are given, applies them first. Decisions are refused
* with `TRANSFER_INVALID_STATE` once execution has been requested.
*/
async function handleImportAnalyze(db, storage, input) {
	try {
		const operations = new TransferOperationRepository(db);
		let operation = await requireImport(operations, input.operationId);
		let plan = null;
		let digest = null;
		if (operation.state === "uploading") {
			const { declared } = await new TransferStagedFileRepository(db).countByState(operation.id);
			if (declared > 0) throw new TransferError("TRANSFER_FILE_MISSING", "Some package files are not uploaded", { detail: { missing: declared } });
		}
		if (operation.state === "uploading" || operation.state === "analyzing") {
			const step = await analyzeImportStep({
				db,
				storage,
				operationId: operation.id,
				budget: input.budget ?? new TransferStepBudget(),
				targetContext: input.target
			}).catch((error) => {
				if (isTransferError(error) && error.code === "TRANSFER_LEASE_ACTIVE") return null;
				throw error;
			});
			if (!step) return {
				success: true,
				data: {
					operation: toPublicOperation(await operations.require(operation.id)),
					nextRequestInMs: LEASE_RETRY_MS
				}
			};
			operation = step.operation;
			if (!step.done) return {
				success: true,
				data: {
					operation: toPublicOperation(operation),
					nextRequestInMs: 0
				}
			};
			plan = step.plan;
			digest = step.planDigest;
		} else if (operation.state === "planned") {
			plan = await loadImportPlan(storage, operation);
			digest = operation.planDigest;
		} else throw new TransferError("TRANSFER_INVALID_STATE", "Import is past analysis");
		if (operation.state === "planned" && input.decisions !== void 0) {
			const finalized = await finalizePlan({
				db,
				storage,
				operationId: operation.id,
				decisions: input.decisions
			});
			plan = finalized.plan;
			digest = finalized.planDigest;
			operation = await operations.require(operation.id);
		}
		return {
			success: true,
			data: {
				operation: toPublicOperation(operation),
				...plan ? { plan } : {},
				...plan && digest ? { planDigest: digest } : {},
				nextRequestInMs: null
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_ANALYZE_ERROR", "Failed to analyze import");
	}
}
async function handleImportPlan(db, storage, operationId) {
	try {
		const operation = await requireImport(new TransferOperationRepository(db), operationId);
		const plan = operation.planDigest ? await loadImportPlan(storage, operation) : null;
		if (!plan || !operation.planDigest) throw new TransferError("TRANSFER_INVALID_STATE", "Import has not been analyzed");
		return {
			success: true,
			data: {
				plan,
				planDigest: operation.planDigest
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_ANALYZE_ERROR", "Failed to read import plan");
	}
}
async function handleImportGet(db, operationId) {
	try {
		const operation = await requireImport(new TransferOperationRepository(db), operationId);
		const files = await new TransferStagedFileRepository(db).countByState(operation.id);
		return {
			success: true,
			data: {
				operation: toPublicOperation(operation),
				files
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to read import");
	}
}
async function handleImportList(db, options) {
	try {
		const page = await new TransferOperationRepository(db).list({
			kind: "import",
			limit: pageLimit(options.limit),
			cursor: decodeTimeCursor(options.cursor)
		});
		return {
			success: true,
			data: page.next ? {
				items: page.items,
				nextCursor: encodeCursor(page.next.createdAt, page.next.id)
			} : { items: page.items }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to list imports");
	}
}
/** Cancel an import; a step in flight stops after its current batch. */
async function handleImportCancel(db, operationId, userId) {
	try {
		const operations = new TransferOperationRepository(db);
		await requireImport(operations, operationId);
		const operation = await operations.requestCancel(operationId);
		await recordTransferAudit(db, {
			actorId: userId,
			action: "transfer_import_cancel",
			resourceType: "transfer_operation",
			resourceId: operationId
		});
		return {
			success: true,
			data: { operation: toPublicOperation(operation) }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to cancel import");
	}
}
/**
* Abandon a failed or cancelled import. Lifts the site write fence; imported
* data stays in place.
*/
async function handleImportAbandon(db, operationId, userId) {
	try {
		const operations = new TransferOperationRepository(db);
		await requireImport(operations, operationId);
		const operation = await operations.abandon(operationId);
		await recordTransferAudit(db, {
			actorId: userId,
			action: "transfer_import_abandon",
			resourceType: "transfer_operation",
			resourceId: operationId
		});
		return {
			success: true,
			data: { operation: toPublicOperation(operation) }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to abandon import");
	}
}
async function requireExport(operations, operationId) {
	const operation = await operations.get(operationId);
	if (!operation || operation.kind !== "export") throw new TransferError("TRANSFER_OPERATION_NOT_FOUND", "Transfer operation not found");
	return operation;
}
async function requireCompleteExport(db, operationId) {
	const operation = await requireExport(new TransferOperationRepository(db), operationId);
	if (operation.state !== "complete") throw new TransferError("TRANSFER_INVALID_STATE", "Export is not complete");
	if (operation.stagingCollectedAt !== null) throw new TransferError("TRANSFER_EXPIRED", "Export files are no longer available");
	return operation;
}
/**
* Run `start` after a grant was consumed for it, handing the grant back when
* the operation does not start so the caller can retry with it.
*/
async function withGrantRestoredOnFailure(approvals, approval, start) {
	try {
		return await start();
	} catch (error) {
		if (approval) await approvals.restore(approval.id).catch((restoreError) => {
			console.error("[transfer] Failed to restore an approval grant:", restoreError);
		});
		throw error;
	}
}
/** Digest an export approval grant binds: the export options, normalized. */
async function exportParamsDigest(options) {
	return canonicalDigest(exportOptionsSchema.parse(options));
}
/**
* Create an export, or return the existing one for the same idempotency key.
* With `approval`, the grant must be approved, unexpired, and bound to this
* user, action `export`, these options, and the caller's token.
*/
async function handleExportCreate(db, input) {
	try {
		const approvals = new TransferApprovalRepository(db);
		if (input.approval) await approvals.consume(input.approval.id, {
			userId: input.userId,
			action: "export",
			paramsDigest: await exportParamsDigest(input.options),
			tokenId: input.approval.tokenId
		});
		const { operation, created } = await withGrantRestoredOnFailure(approvals, input.approval, () => createExport({
			db,
			createdBy: input.userId,
			options: input.options,
			idempotencyKey: input.idempotencyKey
		}));
		if (input.approval) await approvals.linkOperation(input.approval.id, operation.id);
		if (created) await recordTransferAudit(db, {
			actorId: input.userId,
			action: "transfer_export_create",
			resourceType: "transfer_operation",
			resourceId: operation.id
		});
		return {
			success: true,
			data: {
				operation: toPublicOperation(operation),
				created
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to create export");
	}
}
var validatePackage = (input) => validateStagedPackageStep(input);
/** Run one bounded export step. */
async function handleExportAdvance(db, storage, input) {
	try {
		const operations = new TransferOperationRepository(db);
		await requireExport(operations, input.operationId);
		let step;
		try {
			step = await advanceExport({
				db,
				storage,
				operationId: input.operationId,
				budget: input.budget,
				defaultLocale: input.defaultLocale,
				validatePackage
			});
		} catch (error) {
			if (isTransferError(error) && error.code === "TRANSFER_LEASE_LOST") return {
				success: true,
				data: {
					operation: toPublicOperation(await operations.require(input.operationId)),
					nextRequestInMs: LEASE_RETRY_MS
				}
			};
			throw error;
		}
		const nextRequestInMs = step.outcome === "advanced" ? 0 : step.outcome === "busy" ? LEASE_RETRY_MS : null;
		return {
			success: true,
			data: {
				operation: toPublicOperation(step.operation),
				nextRequestInMs
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to advance export");
	}
}
async function handleExportGet(db, operationId) {
	try {
		return {
			success: true,
			data: { operation: toPublicOperation(await requireExport(new TransferOperationRepository(db), operationId)) }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to read export");
	}
}
async function handleExportList(db, options) {
	try {
		const page = await new TransferOperationRepository(db).list({
			kind: "export",
			limit: pageLimit(options.limit),
			cursor: decodeTimeCursor(options.cursor)
		});
		return {
			success: true,
			data: page.next ? {
				items: page.items,
				nextCursor: encodeCursor(page.next.createdAt, page.next.id)
			} : { items: page.items }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to list exports");
	}
}
function exportFileMismatch() {
	return new TransferError("TRANSFER_FILE_DIGEST_MISMATCH", "Stored file no longer matches the export");
}
/**
* Pass `body` through, failing the stream if it does not carry exactly
* `bytes` bytes hashing to `sha256`, so a changed source object never
* reaches the client as a complete file.
*/
function verifyingStream(body, expected) {
	let hasher;
	let total = 0;
	return body.pipeThrough(new TransformStream({
		async start() {
			hasher = await createSha256();
		},
		transform(chunk, controller) {
			total += chunk.byteLength;
			if (total > expected.bytes) throw exportFileMismatch();
			hasher?.update(chunk);
			controller.enqueue(chunk);
		},
		async flush() {
			if (total !== expected.bytes || await hasher?.digest() !== expected.sha256) throw exportFileMismatch();
		}
	}));
}
async function openExportFile(db, storage, operation, path) {
	const parsed = parsePackagePath(path);
	if (!parsed) throw new TransferError("TRANSFER_PATH_INVALID", "Invalid package path");
	const reader = openExportPackage({
		db,
		storage,
		operation
	});
	if (parsed.type === "manifest") {
		const bytes = await reader.stage.readBytes(MANIFEST_PATH, TRANSFER_LIMITS.manifestBytes);
		return {
			path: MANIFEST_PATH,
			bytes: bytes.byteLength,
			sha256: await sha256Hex$1(bytes),
			body: new ReadableStream({ start(controller) {
				controller.enqueue(bytes);
				controller.close();
			} })
		};
	}
	const file = await new TransferStagedFileRepository(db).get(operation.id, parsed.path);
	if (!file || file.state !== "verified") throw new TransferError("TRANSFER_FILE_NOT_DECLARED", "File is not part of this export", { detail: { path: parsed.path } });
	const source = parsed.type === "media" ? await reader.blob(parsed.sha256) : (await reader.stage.open(parsed.path)).body;
	return {
		path: file.path,
		bytes: file.bytes,
		sha256: file.sha256,
		body: verifyingStream(source, file)
	};
}
/**
* Open one file of a complete export: `manifest.json`, an index or record
* chunk from staging, or a media blob streamed from the origin object. The
* body errors if the bytes no longer match the export's digest.
*/
async function handleExportFile(db, storage, operationId, path) {
	try {
		return {
			success: true,
			data: await openExportFile(db, storage, await requireCompleteExport(db, operationId), path)
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to read export file");
	}
}
async function* exportArchiveFiles(db, storage, operation) {
	const manifest = await openExportFile(db, storage, operation, MANIFEST_PATH);
	yield {
		path: manifest.path,
		bytes: manifest.bytes,
		body: () => manifest.body
	};
	const staged = new TransferStagedFileRepository(db);
	let after;
	for (;;) {
		const page = await staged.list(operation.id, {
			state: "verified",
			after,
			limit: 500
		});
		for (const file of page) {
			if (file.path === "manifest.json") continue;
			yield {
				path: file.path,
				bytes: file.bytes,
				body: async () => (await openExportFile(db, storage, operation, file.path)).body
			};
		}
		const last = page.at(-1);
		if (!last || page.length < 500) return;
		after = last.path;
	}
}
/**
* Stream a complete export as one tar container: the manifest first, then
* every index chunk, media blob, and record chunk in path order. Each file is
* read and verified as it is written, so a failure mid-archive ends the
* stream with an error rather than a short archive. On Workers the whole
* archive must stream within one request's limits; large sites should
* download files individually.
*/
async function handleExportArchive(db, storage, operationId) {
	try {
		return {
			success: true,
			data: { body: packSitePackage(exportArchiveFiles(db, storage, await requireCompleteExport(db, operationId))) }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_EXPORT_ERROR", "Failed to read export archive");
	}
}
/**
* Request execution of a planned import. The digests must match the staged
* package and the current plan (`TRANSFER_PACKAGE_DIGEST_MISMATCH` /
* `TRANSFER_PLAN_DIGEST_MISMATCH`), and the plan must have no blockers.
* Repeating the request for an import already executing returns it.
*/
async function handleImportExecute(db, storage, input) {
	try {
		const operation = await requireImport(new TransferOperationRepository(db), input.operationId);
		if (operation.packageDigest !== input.packageDigest) throw new TransferError("TRANSFER_PACKAGE_DIGEST_MISMATCH", "Package digest does not match");
		if (operation.planDigest === null || operation.planDigest !== input.planDigest) throw new TransferError("TRANSFER_PLAN_DIGEST_MISMATCH", "Plan digest does not match");
		if (operation.state === "planned") {
			const plan = await loadImportPlan(storage, operation);
			if (!plan || !isPlanExecutable(plan)) throw new TransferError("TRANSFER_PLAN_BLOCKED", "The import plan has blockers", { detail: { blockers: plan?.blockers.length ?? 0 } });
		}
		const approvals = new TransferApprovalRepository(db);
		if (input.approval) await approvals.consume(input.approval.id, {
			userId: input.userId,
			action: "import",
			operationId: operation.id,
			packageDigest: input.packageDigest,
			planDigest: input.planDigest,
			tokenId: input.approval.tokenId
		});
		const { operation: requested, requested: newlyRequested } = await withGrantRestoredOnFailure(approvals, input.approval, () => requestImportExecution({
			db,
			operationId: operation.id,
			packageDigest: input.packageDigest,
			planDigest: input.planDigest
		}));
		if (newlyRequested) await recordTransferAudit(db, {
			actorId: input.userId,
			action: "transfer_import_execute",
			resourceType: "transfer_operation",
			resourceId: operation.id,
			details: {
				packageDigest: input.packageDigest,
				planDigest: input.planDigest
			}
		});
		return {
			success: true,
			data: { operation: toPublicOperation(requested) }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to execute import");
	}
}
/**
* Run one bounded import step. Retryable failures are recorded on the
* operation and reported through `nextRequestInMs`, as is a step that lost
* its lease to another caller; it is null once the import has ended. The
* step that completes or fails the import records it in the audit log as
* `userId`'s.
*/
async function handleImportAdvance(db, storage, input) {
	try {
		const operations = new TransferOperationRepository(db);
		await requireImport(operations, input.operationId);
		let step;
		try {
			step = await advanceImport({
				db,
				storage,
				operationId: input.operationId,
				verify: verifyImportStep,
				budget: input.budget
			});
		} catch (error) {
			if (isLeaseError(error)) return {
				success: true,
				data: {
					operation: toPublicOperation(await operations.require(input.operationId)),
					nextRequestInMs: LEASE_RETRY_MS
				}
			};
			throw error;
		}
		if (step.ended) await auditImportEnd(db, step.operation, input.userId);
		return {
			success: true,
			data: {
				operation: toPublicOperation(step.operation),
				nextRequestInMs: step.nextRequestInMs
			}
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to advance import");
	}
}
async function auditImportEnd(db, operation, userId) {
	if (operation.state === "complete") {
		const counts = operation.receipt?.counts ?? {};
		await recordTransferAudit(db, {
			actorId: userId,
			action: "transfer_import_complete",
			resourceType: "transfer_operation",
			resourceId: operation.id,
			details: {
				packageDigest: operation.packageDigest,
				planDigest: operation.planDigest,
				records: Object.values(counts).reduce((sum, count) => sum + count, 0)
			}
		});
	} else if (operation.state === "failed") await recordTransferAudit(db, {
		actorId: userId,
		action: "transfer_import_fail",
		resourceType: "transfer_operation",
		resourceId: operation.id,
		details: { errorCode: operation.errorCode },
		status: "failure"
	});
}
async function handleImportReceipt(db, operationId) {
	try {
		const operation = await requireImport(new TransferOperationRepository(db), operationId);
		if (operation.state !== "complete" || !operation.receipt) throw new TransferError("TRANSFER_INVALID_STATE", "Import has no receipt");
		return {
			success: true,
			data: { receipt: operation.receipt }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to read import receipt");
	}
}
var APPROVAL_PERMISSION = {
	export: "transfer:export",
	import: "transfer:import"
};
async function handleApprovalList(db, options) {
	try {
		const page = await new TransferApprovalRepository(db).list({
			status: options.status,
			limit: pageLimit(options.limit),
			cursor: decodeTimeCursor(options.cursor)
		});
		return {
			success: true,
			data: page.next ? {
				items: page.items,
				nextCursor: encodeCursor(page.next.createdAt, page.next.id)
			} : { items: page.items }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to list approvals");
	}
}
/**
* Approve or deny a pending grant. The deciding user needs the permission
* for the grant's action. Callers must only reach this from a session, never
* with a bearer token.
*/
async function handleApprovalDecide(db, input) {
	try {
		const approvals = new TransferApprovalRepository(db);
		const approval = await approvals.get(input.approvalId);
		if (!approval) throw new TransferError("TRANSFER_APPROVAL_INVALID", "Approval not found");
		if (!hasPermission(input.user, APPROVAL_PERMISSION[approval.action])) return failure("FORBIDDEN", "Insufficient permissions");
		const decided = input.decision === "approve" ? await approvals.approve(approval.id, input.user.id) : await approvals.deny(approval.id, input.user.id);
		await recordTransferAudit(db, {
			actorId: input.user.id,
			action: input.decision === "approve" ? "transfer_approval_approve" : "transfer_approval_deny",
			resourceType: "transfer_approval",
			resourceId: approval.id,
			details: {
				action: approval.action,
				userId: approval.userId,
				...approval.operationId === null ? {} : { operationId: approval.operationId }
			}
		});
		return {
			success: true,
			data: { approval: decided }
		};
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to decide approval");
	}
}
/**
* Create a pending approval grant for a caller that lacks the transfer scope
* for `action`, and fail with `TRANSFER_APPROVAL_REQUIRED` carrying its id.
* An unexpired pending grant with the same binding is returned instead of a
* new one. An admin approves it in a session; the caller then retries with
* the id and consumes the grant with `TransferApprovalRepository.consume`.
*/
async function requestTransferApproval(db, input) {
	try {
		const approvals = new TransferApprovalRepository(db);
		const approval = await approvals.findPending({
			...input,
			tokenId: input.requestedByTokenId
		}) ?? await approvals.createPending(input);
		return failure("TRANSFER_APPROVAL_REQUIRED", "An admin must approve this transfer", {
			approvalId: approval.id,
			expiresAt: approval.expiresAt
		});
	} catch (error) {
		return errorResult(error, "TRANSFER_IMPORT_ERROR", "Failed to request approval");
	}
}
export { handleTransferCapabilities as C, requestTransferApproval as E, handleImportReceipt as S, openExportPackage as T, handleImportFileUpload as _, handleExportAdvance as a, handleImportMissing as b, handleExportFile as c, handleImportAbandon as d, handleImportAdvance as f, handleImportExecute as g, handleImportCreate as h, handleApprovalList as i, handleExportGet as l, handleImportCancel as m, exportParamsDigest as n, handleExportArchive as o, handleImportAnalyze as p, handleApprovalDecide as r, handleExportCreate as s, analysisTargetContext as t, handleExportList as u, handleImportGet as v, loadImportPlan as w, handleImportPlan as x, handleImportList as y };
