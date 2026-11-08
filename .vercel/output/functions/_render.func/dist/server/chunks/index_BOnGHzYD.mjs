import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs
var _providerId__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* List media from a specific provider
*/
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { providerId } = params;
	const readDenied = requirePerm(user, "media:read");
	if (readDenied) return readDenied;
	if (!providerId) return apiError("INVALID_REQUEST", "Provider ID required", 400);
	if (!emdash?.getMediaProvider) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const provider = emdash.getMediaProvider(providerId);
	if (!provider) return apiError("NOT_FOUND", `Provider "${providerId}" not found`, 404);
	const url = new URL(request.url);
	const cursor = url.searchParams.get("cursor") || void 0;
	const rawLimit = url.searchParams.get("limit");
	const limit = rawLimit ? Math.max(1, Math.min(parseInt(rawLimit, 10) || 50, 100)) : void 0;
	const query = url.searchParams.get("query") || void 0;
	const mimeType = url.searchParams.get("mimeType") || void 0;
	try {
		const result = await provider.list({
			cursor,
			limit,
			query,
			mimeType
		});
		return apiSuccess({
			items: result.items,
			nextCursor: result.nextCursor
		});
	} catch (error) {
		return handleError(error, "Failed to list media from provider", "PROVIDER_LIST_ERROR");
	}
};
/**
* Upload media to a specific provider
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { providerId } = params;
	const uploadDenied = requirePerm(user, "media:upload");
	if (uploadDenied) return uploadDenied;
	if (!providerId) return apiError("INVALID_REQUEST", "Provider ID required", 400);
	if (!emdash?.getMediaProvider) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const provider = emdash.getMediaProvider(providerId);
	if (!provider) return apiError("NOT_FOUND", `Provider "${providerId}" not found`, 404);
	if (!provider.upload) return apiError("NOT_SUPPORTED", `Provider "${providerId}" does not support uploads`, 400);
	try {
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		const altEntry = formData.get("alt");
		const alt = typeof altEntry === "string" ? altEntry : null;
		if (!file) return apiError("NO_FILE", "No file provided", 400);
		const maxSize = emdash.config?.maxUploadSize ?? 52428800;
		if (file.size > maxSize) return apiError("FILE_TOO_LARGE", `File exceeds maximum size of ${Math.round(maxSize / 1024 / 1024)}MB`, 413);
		return apiSuccess({ item: await provider.upload({
			file,
			filename: file.name,
			alt: alt || void 0
		}) }, 201);
	} catch (error) {
		return handleError(error, "Failed to upload to provider", "PROVIDER_UPLOAD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index@_@mjs
var page = () => _providerId__exports;
export { page };
