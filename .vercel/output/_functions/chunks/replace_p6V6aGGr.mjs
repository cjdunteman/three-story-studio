import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as normalizeMime } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { n as computeContentHash } from "./hash-BJaeek87_BXspnfEZ.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { in as mediaReplaceMetadataForm } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as MUTABLE_MEDIA_CACHE_CONTROL } from "./image-endpoint_Dg3VHZtz.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs
var replace_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var REPLACEABLE_IMAGE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp"
]);
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const editDenied = requirePerm(user, "media:edit_own");
	if (editDenied) return editDenied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID required", 400);
	if (!emdash?.handleMediaGet || !emdash?.handleMediaReplaceMetadata) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.storage) return apiError("NO_STORAGE", "Storage not configured", 500);
	const getResult = await emdash.handleMediaGet(id);
	if (!getResult.success) return unwrapResult(getResult);
	const media = getResult.data.item;
	const ownerDenied = requireOwnerPerm(user, media.authorId ?? "", "media:edit_own", "media:edit_any");
	if (ownerDenied) return ownerDenied;
	if (media.status !== "ready") return apiError("INVALID_STATE", "Only ready media can be replaced", 400);
	const sourceMime = normalizeMime(media.mimeType);
	if (!REPLACEABLE_IMAGE_TYPES.has(sourceMime)) return apiError("INVALID_TYPE", "Media type cannot be replaced", 400);
	const rawMax = emdash.config.maxUploadSize ?? 52428800;
	if (!Number.isFinite(rawMax) || rawMax <= 0) return apiError("CONFIGURATION_ERROR", "Invalid maxUploadSize configuration", 500);
	const maxUploadSize = rawMax;
	const contentLength = request.headers.get("Content-Length");
	if (contentLength && parseInt(contentLength, 10) > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
	try {
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		if (!file) return apiError("NO_FILE", "No file provided", 400);
		if (file.size === 0) return apiError("VALIDATION_ERROR", "Replacement file is empty", 400);
		if (file.size > maxUploadSize) return apiError("PAYLOAD_TOO_LARGE", "Upload too large", 413);
		const replacementMime = normalizeMime(file.type);
		if (!REPLACEABLE_IMAGE_TYPES.has(replacementMime) || replacementMime !== sourceMime) return apiError("INVALID_TYPE", "Replacement file type must match the media item", 400);
		const metadataResult = mediaReplaceMetadataForm.safeParse({
			width: formData.get("width"),
			height: formData.get("height")
		});
		if (!metadataResult.success) return apiError("VALIDATION_ERROR", "Invalid request data", 400, { issues: metadataResult.error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message
		})) });
		const { width, height } = metadataResult.data;
		const bytes = new Uint8Array(await file.arrayBuffer());
		const contentHash = await computeContentHash(bytes);
		try {
			await emdash.storage.upload({
				key: media.storageKey,
				body: bytes,
				contentType: sourceMime,
				cacheControl: MUTABLE_MEDIA_CACHE_CONTROL
			});
		} catch (error) {
			return handleError(error, "Failed to replace media", "MEDIA_REPLACE_ERROR");
		}
		const result = await emdash.handleMediaReplaceMetadata(id, media.storageKey, {
			size: file.size,
			width,
			height,
			contentHash
		});
		if (!result.success) return unwrapResult(result);
		return apiSuccess({ item: {
			...result.data.item,
			url: `/_emdash/api/media/file/${result.data.item.storageKey}`
		} });
	} catch (error) {
		return handleError(error, "Failed to replace media", "MEDIA_REPLACE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/replace@_@mjs
var page = () => replace_exports;
export { page };
