import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import "./dist-BUmWMTbN_CDkCCJct.mjs";
import { i as resolveUploadMimeType, t as matchesMimeAllowlist } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { t as enrichImageMetadata } from "./enrich-DFlfnd3u_DIfIr-b4.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import "./registry-B0-O575m_BFXFyFwY.mjs";
import { n as computeContentHash } from "./hash-BJaeek87_BXspnfEZ.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./content-repair-Ukdxoq-R_ntNtEF9u.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as handleMediaUsageSummaries } from "./media-usage-X1_20MY-_vcTBPz4d.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { $t as mediaListQuery, Ht as formatFileSize, Jt as mediaFolderIdSchema, dn as mediaUploadMetadataForm, ln as mediaUploadDeduplicateForm, un as mediaUploadEnsureUniqueFilenameForm } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as resolveFieldAllowlist, t as GLOBAL_UPLOAD_ALLOWLIST } from "./media-allowlist-BMBLqyWh_C2XgtjYy.mjs";
import { o as requirePerm, t as canReadMediaUsageCount } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { ulid } from "ulidx";
import * as path from "node:path";
// node_modules/emdash/dist/astro/routes/api/media.mjs
var media_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* Add URL to media items
* Uses relative URLs to ensure portability across deployments
*/
function addUrlToMedia(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
/**
* List media items
*/
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	if (!emdash?.handleMediaList) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const query = parseQuery(new URL(request.url), mediaListQuery);
	if (isParseError(query)) return query;
	const result = await emdash.handleMediaList({
		cursor: query.cursor,
		page: query.page,
		limit: query.limit,
		mimeType: query.mimeType,
		q: query.q,
		folderId: query.folderId === "unfiled" ? null : query.folderId
	});
	if (!result.success) return unwrapResult(result);
	const itemsWithUrl = result.data.items.map((item) => addUrlToMedia(item));
	if (query.includeUsage !== "1") return apiSuccess({
		items: itemsWithUrl,
		nextCursor: result.data.nextCursor,
		totalCount: result.data.totalCount
	});
	const includeCount = canReadMediaUsageCount(user, locals.tokenScopes);
	const usageResult = await handleMediaUsageSummaries(emdash.db, itemsWithUrl.map((item) => item.id), { includeCount });
	if (!usageResult.success) return unwrapResult(usageResult);
	const itemsWithUsage = [];
	for (const item of itemsWithUrl) {
		const usage = usageResult.data[item.id];
		if (!usage) return apiError("MEDIA_USAGE_READ_ERROR", "Failed to read media usage", 500);
		itemsWithUsage.push({
			...item,
			usage
		});
	}
	return apiSuccess({
		items: itemsWithUsage,
		nextCursor: result.data.nextCursor,
		totalCount: result.data.totalCount
	});
};
/**
* Upload media file
*
* Uses the configured storage adapter to store the file.
*/
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!emdash?.handleMediaCreate) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash?.storage) return apiError("NO_STORAGE", "Storage not configured", 500);
	try {
		const rawMax = emdash.config.maxUploadSize ?? 52428800;
		if (!Number.isFinite(rawMax) || rawMax <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration", 500);
		const maxUploadSize = rawMax;
		const contentLength = request.headers.get("Content-Length");
		if (contentLength && parseInt(contentLength, 10) > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		if (!file) return apiError("NO_FILE", "No file provided", 400);
		const deduplicateResult = mediaUploadDeduplicateForm.safeParse(formData.get("deduplicate") ?? void 0);
		if (!deduplicateResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400, { issues: deduplicateResult.error.issues.map((issue) => ({
			path: "deduplicate",
			message: issue.message
		})) });
		const ensureUniqueFilenameResult = mediaUploadEnsureUniqueFilenameForm.safeParse(formData.get("ensureUniqueFilename") ?? void 0);
		if (!ensureUniqueFilenameResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400);
		const folderEntry = formData.get("folderId");
		let folderId;
		if (folderEntry !== null) {
			if (typeof folderEntry !== "string") return apiError("VALIDATION_ERROR", "Invalid request data", 400);
			if (folderEntry === "unfiled") folderId = null;
			else {
				const folderResult = mediaFolderIdSchema.safeParse(folderEntry);
				if (!folderResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400);
				folderId = folderResult.data;
			}
		}
		const metadataResult = mediaUploadMetadataForm.safeParse({
			alt: formData.get("alt") ?? void 0,
			caption: formData.get("caption") ?? void 0
		});
		if (!metadataResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400, { issues: metadataResult.error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message
		})) });
		const fieldIdEntry = formData.get("fieldId");
		const fieldId = typeof fieldIdEntry === "string" && fieldIdEntry.length > 0 ? fieldIdEntry : null;
		const allowlist = (fieldId ? await resolveFieldAllowlist(emdash.db, fieldId) : null) ?? [...GLOBAL_UPLOAD_ALLOWLIST];
		const mimeType = resolveUploadMimeType(file.name, file.type);
		if (!mimeType || !matchesMimeAllowlist(mimeType, allowlist)) return apiError("INVALID_TYPE", "File type not allowed", 400);
		if (file.size > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", `File exceeds maximum size of ${formatFileSize(maxUploadSize)}`, 413);
		const buffer = new Uint8Array(await file.arrayBuffer());
		const contentHash = await computeContentHash(buffer);
		const repo = new MediaRepository(emdash.db);
		if (deduplicateResult.data) {
			const existing = await repo.findByContentHash(contentHash);
			if (existing) return apiSuccess({
				item: addUrlToMedia(existing),
				deduplicated: true
			});
		}
		const filename = ensureUniqueFilenameResult.data ? await repo.findAvailableFilename(file.name) : file.name;
		const storageKey = `${ulid()}${path.extname(filename) || ""}`;
		await emdash.storage.upload({
			key: storageKey,
			body: buffer,
			contentType: mimeType
		});
		const widthEntry = formData.get("width");
		const widthStr = typeof widthEntry === "string" ? widthEntry : null;
		const heightEntry = formData.get("height");
		const heightStr = typeof heightEntry === "string" ? heightEntry : null;
		const width = widthStr ? parseInt(widthStr, 10) : void 0;
		const height = heightStr ? parseInt(heightStr, 10) : void 0;
		const thumbnailEntry = formData.get("thumbnail");
		const thumbnail = thumbnailEntry instanceof File ? thumbnailEntry : null;
		const enriched = await enrichImageMetadata(buffer, mimeType, {
			knownDimensions: width != null && height != null ? {
				width,
				height
			} : void 0,
			placeholder: thumbnail ? {
				bytes: new Uint8Array(await thumbnail.arrayBuffer()),
				contentType: thumbnail.type
			} : void 0
		});
		const result = await emdash.handleMediaCreate({
			filename,
			mimeType,
			size: file.size,
			alt: metadataResult.data.alt,
			caption: metadataResult.data.caption,
			width: width ?? enriched.width,
			height: height ?? enriched.height,
			storageKey,
			contentHash,
			blurhash: enriched.blurhash,
			dominantColor: enriched.dominantColor,
			authorId: user?.id,
			folderId
		});
		if (!result.success) {
			try {
				await emdash.storage.delete(storageKey);
			} catch {}
			return unwrapResult(result);
		}
		return apiSuccess({ item: addUrlToMedia(result.data.item) }, 201);
	} catch (error) {
		return handleError(error, "Upload failed", "UPLOAD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media@_@mjs
var page = () => media_exports;
export { page };
