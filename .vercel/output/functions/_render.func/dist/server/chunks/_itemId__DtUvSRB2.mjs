import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs
var _itemId__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
/**
* Get a single media item from a provider
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:read");
	if (denied) return denied;
	const { providerId, itemId } = params;
	if (!providerId || !itemId) return apiError("INVALID_REQUEST", "Provider ID and Item ID required", 400);
	if (!emdash?.getMediaProvider) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const provider = emdash.getMediaProvider(providerId);
	if (!provider) return apiError("NOT_FOUND", `Provider "${providerId}" not found`, 404);
	if (!provider.get) return apiError("NOT_SUPPORTED", `Provider "${providerId}" does not support getting individual items`, 400);
	try {
		const item = await provider.get(itemId);
		if (!item) return apiError("NOT_FOUND", "Item not found", 404);
		return apiSuccess({ item });
	} catch (error) {
		return handleError(error, "Failed to get item from provider", "PROVIDER_GET_ERROR");
	}
};
/**
* Delete a media item from a provider
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "media:delete_any");
	if (denied) return denied;
	const { providerId, itemId } = params;
	if (!providerId || !itemId) return apiError("INVALID_REQUEST", "Provider ID and Item ID required", 400);
	if (!emdash?.getMediaProvider) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const provider = emdash.getMediaProvider(providerId);
	if (!provider) return apiError("NOT_FOUND", `Provider "${providerId}" not found`, 404);
	if (!provider.delete) return apiError("NOT_SUPPORTED", `Provider "${providerId}" does not support deletion`, 400);
	try {
		await provider.delete(itemId);
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete item from provider", "PROVIDER_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_@_@mjs
var page = () => _itemId__exports;
export { page };
