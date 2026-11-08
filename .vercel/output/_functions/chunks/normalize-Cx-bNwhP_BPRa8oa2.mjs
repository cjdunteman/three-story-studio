import { n as normalizeFocalPoint } from "./focal-point-CgCcr1Ca_d0laIeAH.mjs";
// node_modules/emdash/dist/normalize-Cx-bNwhP.mjs
function getMediaCaption(value) {
	if (typeof value.caption === "string") return value.caption;
	if (value.meta && typeof value.meta === "object" && "caption" in value.meta && typeof value.meta.caption === "string") return value.meta.caption;
}
/** Keep the legacy metadata alias consistent with the per-use caption. */
function syncMediaCaption(value) {
	const caption = getMediaCaption(value);
	if (caption === void 0) return value;
	return {
		...value,
		caption,
		...value.meta && Object.hasOwn(value.meta, "caption") ? { meta: {
			...value.meta,
			caption
		} } : {}
	};
}
/**
* Media Value Normalization
*
* Normalizes media field values into a consistent shape regardless of
* creation path (seed scripts, media picker, WP import, URL input).
*
* Called at content create/update time when a media provider is available,
* filling in missing dimensions, storageKey, mimeType, and filename from
* the provider's `get()` method.
*/
var INTERNAL_MEDIA_PREFIX = "/_emdash/api/media/file/";
var URL_PATTERN = /^https?:\/\//;
function normalizeLegacyExternalMediaValue(value) {
	if (value.provider !== "external-url") return value;
	const src = value.src ?? value.previewUrl;
	return {
		...value,
		provider: "external",
		...src === void 0 ? {} : { src }
	};
}
/**
* Normalize a media field value into a consistent MediaValue shape.
*
* - `null`/`undefined` → `null`
* - Empty or whitespace-only string → `null`
* - Bare URL string → `{ provider: "external", id: "", src: url }`
* - Bare internal media URL → resolved via local provider's `get()`
* - Bare local media ID → resolved via local provider's `get()`
* - Object with `provider` + `id` → enriched with missing fields from provider
*/
async function normalizeMediaValue(value, getProvider) {
	if (value == null) return null;
	if (typeof value === "string") {
		if (value.trim() === "") return null;
		return normalizeStringUrl(value, getProvider);
	}
	if (!isRecord(value)) return null;
	if (!("id" in value) && !("src" in value)) return null;
	const parsed = normalizeLegacyExternalMediaValue(recordToMediaValue(value));
	const provider = parsed.provider || "local";
	const id = parsed.id;
	if (provider === "external") return parsed;
	const result = {
		...parsed,
		provider
	};
	if (provider === "local") delete result.src;
	const needsDimensions = result.width == null || result.height == null;
	const needsStorageKey = provider === "local" && !result.meta?.storageKey;
	const needsFileInfo = !result.mimeType || !result.filename;
	const needsLqip = (result.mimeType ?? "").startsWith("image/") && (result.blurhash == null || result.dominantColor == null);
	if (!(needsDimensions || needsStorageKey || needsFileInfo || needsLqip) || !id) return result;
	const mediaProvider = getProvider(provider);
	if (!mediaProvider?.get) return result;
	let providerItem;
	try {
		providerItem = await mediaProvider.get(id);
	} catch {
		return result;
	}
	if (!providerItem) return result;
	return mergeProviderData(result, providerItem);
}
async function normalizeStringUrl(url, getProvider) {
	if (url.startsWith("/_emdash/api/media/file/")) return resolveInternalUrl(url, getProvider);
	if (URL_PATTERN.test(url)) return Promise.resolve({
		provider: "external",
		id: "",
		src: url
	});
	const localMedia = await resolveLocalId(url, getProvider);
	if (localMedia) return localMedia;
	return {
		provider: "external",
		id: "",
		src: url
	};
}
async function resolveInternalUrl(url, getProvider) {
	const storageKey = url.slice(24);
	const localProvider = getProvider("local");
	if (!localProvider?.get) return {
		provider: "external",
		id: "",
		src: url
	};
	let item;
	try {
		item = await localProvider.get(storageKey);
	} catch {
		return {
			provider: "external",
			id: "",
			src: url
		};
	}
	if (!item) return {
		provider: "external",
		id: "",
		src: url
	};
	const focalPoint = normalizeFocalPoint(item.focalX, item.focalY);
	return syncMediaCaption({
		provider: "local",
		id: item.id,
		filename: item.filename,
		mimeType: item.mimeType,
		width: item.width,
		height: item.height,
		...focalPoint,
		blurhash: item.blurhash,
		dominantColor: item.dominantColor,
		alt: item.alt,
		caption: item.caption,
		meta: item.meta
	});
}
async function resolveLocalId(id, getProvider) {
	const localProvider = getProvider("local");
	if (!localProvider?.get) return null;
	let item;
	try {
		item = await localProvider.get(id);
	} catch {
		return null;
	}
	if (!item) return null;
	const focalPoint = normalizeFocalPoint(item.focalX, item.focalY);
	return syncMediaCaption({
		provider: "local",
		id: item.id,
		filename: item.filename,
		mimeType: item.mimeType,
		width: item.width,
		height: item.height,
		...focalPoint,
		blurhash: item.blurhash,
		dominantColor: item.dominantColor,
		alt: item.alt,
		caption: item.caption,
		meta: item.meta
	});
}
/**
* Fill missing media metadata from a provider.
* Caller captions, including empty strings, take priority over provider captions.
* Provider alt text fills missing or empty caller alt text.
*/
function mergeProviderData(existing, item) {
	const result = { ...existing };
	if (result.width == null && item.width != null) result.width = item.width;
	if (result.height == null && item.height != null) result.height = item.height;
	if (result.blurhash == null && item.blurhash != null) result.blurhash = item.blurhash;
	if (result.dominantColor == null && item.dominantColor != null) result.dominantColor = item.dominantColor;
	if (!result.filename && item.filename) result.filename = item.filename;
	if (!result.mimeType && item.mimeType) result.mimeType = item.mimeType;
	if (!result.alt && item.alt) result.alt = item.alt;
	if (result.caption == null && item.caption != null) result.caption = item.caption;
	if (item.meta) result.meta = {
		...item.meta,
		...result.meta
	};
	return syncMediaCaption(result);
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* Extract known MediaValue fields from a runtime-checked record.
* Avoids unsafe `as MediaValue` cast by reading each property explicitly.
*/
function recordToMediaValue(obj) {
	const result = { id: typeof obj.id === "string" ? obj.id : "" };
	if (typeof obj.provider === "string") result.provider = obj.provider;
	if (typeof obj.src === "string") result.src = obj.src;
	if (typeof obj.previewUrl === "string") result.previewUrl = obj.previewUrl;
	if (typeof obj.filename === "string") result.filename = obj.filename;
	if (typeof obj.mimeType === "string") result.mimeType = obj.mimeType;
	if (typeof obj.width === "number") result.width = obj.width;
	if (typeof obj.height === "number") result.height = obj.height;
	const focalPoint = normalizeFocalPoint(obj.focalX, obj.focalY);
	if (focalPoint) {
		result.focalX = focalPoint.focalX;
		result.focalY = focalPoint.focalY;
	}
	if (typeof obj.blurhash === "string") result.blurhash = obj.blurhash;
	if (typeof obj.dominantColor === "string") result.dominantColor = obj.dominantColor;
	if (typeof obj.alt === "string") result.alt = obj.alt;
	if (typeof obj.caption === "string") result.caption = obj.caption;
	if (isRecord(obj.meta)) result.meta = obj.meta;
	return syncMediaCaption(result);
}
export { normalizeMediaValue as n, INTERNAL_MEDIA_PREFIX as t };
