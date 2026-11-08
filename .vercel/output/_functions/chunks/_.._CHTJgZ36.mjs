import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import { r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as resolveByteRange, t as parseRangeHeader } from "./range-CYfeXgGK_CLdr9U7y.mjs";
import { i as isNotModified, n as MUTABLE_MEDIA_CACHE_CONTROL, s as validatorHeaders, t as IMMUTABLE_IMAGE_CACHE } from "./image-endpoint_Dg3VHZtz.mjs";
import "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import { t as isRefusedStorageKey } from "./keys-CifIkT0N_Cq2A0wmZ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs
var ____key__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* Content-Disposition header construction for media downloads.
*
* The public media file route serves every non-inline type as an attachment.
* Without a `filename` parameter the browser falls back to the last path
* segment of the URL -- the storage key -- so a downloaded PDF lands in the
* user's filesystem named after its ULID. These helpers build a header that
* names the file the way the editor uploaded it.
*/
/**
* Characters unsafe in a filename on one or more platforms, plus the quote and
* backslash that would otherwise break out of the quoted `filename=` value.
*/
var UNSAFE_FILENAME_CHARS = /[\x00-\x1F\x7F"\\/<>:|?*]/g;
/** Anything outside printable ASCII, carried by `filename*` instead. */
var NON_ASCII = /[^\x20-\x7E]/g;
/**
* An ASCII-only, filesystem-safe rendering of `filename`, for the quoted
* `filename=` parameter that older clients read.
*/
function toAsciiFilename(filename) {
	const cleaned = filename.normalize("NFKD").replaceAll(UNSAFE_FILENAME_CHARS, "-").replaceAll(NON_ASCII, "").trim();
	return cleaned.length > 0 ? cleaned : "download";
}
/**
* Build a `Content-Disposition` value.
*
* Emits both `filename` (ASCII, quoted) and RFC 5987 `filename*` (UTF-8
* percent-encoded) so a name with non-ASCII characters survives. Returns the
* bare disposition when no filename is known, which is the pre-existing
* behaviour for media with no database row.
*/
function contentDisposition(disposition, filename) {
	if (!filename) return disposition;
	return `${disposition}; filename="${toAsciiFilename(filename)}"; filename*=UTF-8''${encodeURIComponent(filename).replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)}`;
}
var MAX_KEY_DECODES = 3;
/**
* Whether a key is, or percent-decodes to, a key this route must refuse.
* Every decoding layer is checked because storage backends differ in whether
* they decode keys; a key that is still encoded after the last layer, or
* does not decode, is refused.
*/
function isPrivateMediaKey(key) {
	let candidate = key;
	for (let layer = 0; layer <= MAX_KEY_DECODES; layer++) {
		if (isRefusedStorageKey(candidate)) return true;
		let decoded;
		try {
			decoded = decodeURIComponent(candidate);
		} catch {
			return true;
		}
		if (decoded === candidate) return false;
		candidate = decoded;
	}
	return true;
}
/**
* Content types that are safe to display inline (simple raster/vector images, video, audio).
* Everything else gets Content-Disposition: attachment to prevent script execution.
*/
var SAFE_INLINE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/avif",
	"image/x-icon",
	"video/mp4",
	"video/webm",
	"audio/mpeg",
	"audio/wav",
	"audio/ogg"
]);
var GET = async ({ params, locals, request, cache }) => {
	const { key } = params;
	const { emdash } = locals;
	if (!key) return apiError("NOT_FOUND", "File not found", 404);
	if (isPrivateMediaKey(key)) return apiError("NOT_FOUND", "File not found", 404);
	if (!emdash?.storage) return apiError("NOT_CONFIGURED", "Storage not configured", 500);
	let unusedBody;
	try {
		const range = request.headers.has("If-Range") ? null : parseRangeHeader(request.headers.get("Range"));
		if (range && cache?.enabled) cache.set(false);
		const result = range ? await emdash.storage.download(key, { range }) : await emdash.storage.download(key);
		unusedBody = result.body;
		const served = range ? result.range : void 0;
		if (range && !served && result.size > 0 && !resolveByteRange(range, result.size)) {
			const response = apiError("RANGE_NOT_SATISFIABLE", "Range not satisfiable", 416);
			response.headers.set("Content-Range", `bytes */${result.size}`);
			return response;
		}
		const cacheControl = result.contentType.startsWith("image/") ? MUTABLE_MEDIA_CACHE_CONTROL : IMMUTABLE_IMAGE_CACHE;
		if (isNotModified(request, result.size, result.lastModified)) return new Response(null, {
			status: 304,
			headers: {
				"Content-Type": result.contentType,
				"Cache-Control": cacheControl,
				...validatorHeaders(result.size, result.lastModified)
			}
		});
		const headers = {
			"Content-Type": result.contentType,
			"Cache-Control": cacheControl,
			"Accept-Ranges": "bytes",
			"X-Content-Type-Options": "nosniff",
			"Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
			...validatorHeaders(result.size, result.lastModified)
		};
		const disposition = SAFE_INLINE_TYPES.has(result.contentType) ? "inline" : "attachment";
		let filename = null;
		if (disposition === "attachment") try {
			filename = await new MediaRepository(emdash.db).findFilenameByStorageKey(key);
		} catch {
			filename = null;
		}
		headers["Content-Disposition"] = contentDisposition(disposition, filename);
		const body = request.method === "HEAD" ? null : result.body;
		if (served) {
			const end = served.offset + served.length - 1;
			headers["Content-Range"] = `bytes ${served.offset}-${end}/${result.size}`;
			headers["Content-Length"] = String(served.length);
			const response = new Response(body, {
				status: 206,
				headers
			});
			if (body) unusedBody = void 0;
			return response;
		}
		if (result.size) headers["Content-Length"] = String(result.size);
		const response = new Response(body, {
			status: 200,
			headers
		});
		if (body) unusedBody = void 0;
		return response;
	} catch (error) {
		if (error instanceof Error && (error.message.includes("not found") || error.message.includes("NOT_FOUND"))) return apiError("NOT_FOUND", "File not found", 404);
		return handleError(error, "Failed to serve file", "FILE_SERVE_ERROR");
	} finally {
		if (unusedBody && !unusedBody.locked) await unusedBody.cancel().catch(() => void 0);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/file/_...key_@_@mjs
var page = () => ____key__exports;
export { page };
