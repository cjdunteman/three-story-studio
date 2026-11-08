import { t as imageSize } from "./dist-BUmWMTbN_CDkCCJct.mjs";
import { n as normalizeMime } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { encode } from "blurhash";
// node_modules/emdash/dist/enrich-DFlfnd3u.mjs
/**
* Image Placeholder Generation
*
* Generates blurhash and dominant color from image buffers for LQIP support.
* Decodes images via jpeg-js (pure JS) and upng-js (pure JS, uses pako for
* deflate). No Node-specific dependencies — works in Workers and Node SSR.
*/
var SUPPORTED_TYPES = {
	"image/jpeg": "jpeg",
	"image/jpg": "jpeg",
	"image/png": "png"
};
/** Max width for blurhash input. Encode is O(w*h*components), so downsample first. */
var MAX_ENCODE_WIDTH = 32;
/** Max decoded RGBA size (32 MB). Images exceeding this skip placeholder generation. */
var MAX_DECODED_BYTES = 33554432;
/**
* Decode a JPEG buffer into raw RGBA pixel data.
*/
async function decodeJpeg(buffer) {
	const { decode } = await import("jpeg-js");
	const result = decode(buffer, { useTArray: true });
	return {
		width: result.width,
		height: result.height,
		data: result.data
	};
}
/**
* Decode a PNG buffer into raw RGBA pixel data.
* Uses upng-js (pure JS with pako deflate) — no Node zlib dependency.
*/
async function decodePng(buffer) {
	const UPNG = (await import("upng-js")).default;
	const img = UPNG.decode(buffer.buffer);
	const frames = UPNG.toRGBA8(img);
	const rgba = new Uint8Array(frames[0]);
	return {
		width: img.width,
		height: img.height,
		data: rgba
	};
}
/**
* Extract the dominant color from RGBA pixel data.
* Simple average of all non-transparent pixels.
*/
function extractDominantColor(data, width, height) {
	let r = 0;
	let g = 0;
	let b = 0;
	let count = 0;
	const len = width * height * 4;
	for (let i = 0; i < len; i += 4) {
		if (data[i + 3] < 128) continue;
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
		count++;
	}
	if (count === 0) return "rgb(0,0,0)";
	return `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
}
/**
* Read image dimensions from headers without decoding pixel data.
* Returns null when the header cannot be parsed.
*
* Shared by every caller that needs pixel dimensions so the header is parsed
* once per buffer, not re-read inside generatePlaceholder.
*/
function readDimensions(buffer) {
	try {
		const result = imageSize(buffer);
		if (result.width != null && result.height != null) return {
			width: result.width,
			height: result.height
		};
		return null;
	} catch {
		return null;
	}
}
/**
* Generate blurhash and dominant color from an image buffer.
* Returns null for non-image MIME types or on failure.
*
* @param dimensions - Optional pre-known dimensions. When present they are
*   trusted verbatim (the caller has typically already read them via
*   readDimensions); otherwise dimensions are read from this buffer's header.
*   Generation is skipped (returns null) when no dimensions are available at
*   all, or when the decoded size (width * height * 4) exceeds
*   MAX_DECODED_BYTES — both guards avoid OOM from unbounded decodes on
*   memory-constrained runtimes.
*/
async function generatePlaceholder(buffer, mimeType, dimensions) {
	const format = SUPPORTED_TYPES[normalizeMime(mimeType)];
	if (!format) return null;
	try {
		const dims = dimensions ?? readDimensions(buffer);
		if (!dims) return null;
		if (dims.width * dims.height * 4 > MAX_DECODED_BYTES) return null;
		const { width, height, data } = format === "jpeg" ? await decodeJpeg(buffer) : await decodePng(buffer);
		if (width === 0 || height === 0) return null;
		let encodePixels;
		let encodeWidth;
		let encodeHeight;
		if (width > MAX_ENCODE_WIDTH) {
			const scale = MAX_ENCODE_WIDTH / width;
			encodeWidth = MAX_ENCODE_WIDTH;
			encodeHeight = Math.max(1, Math.round(height * scale));
			encodePixels = downsample(data, width, height, encodeWidth, encodeHeight);
		} else {
			encodeWidth = width;
			encodeHeight = height;
			encodePixels = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
		}
		return {
			blurhash: encode(encodePixels, encodeWidth, encodeHeight, 4, 3),
			dominantColor: extractDominantColor(data, width, height)
		};
	} catch {
		return null;
	}
}
/**
* Nearest-neighbor downsample of RGBA pixel data.
*/
function downsample(src, srcW, srcH, dstW, dstH) {
	const dst = new Uint8ClampedArray(dstW * dstH * 4);
	for (let y = 0; y < dstH; y++) {
		const srcY = Math.floor(y * srcH / dstH);
		for (let x = 0; x < dstW; x++) {
			const srcX = Math.floor(x * srcW / dstW);
			const srcIdx = (srcY * srcW + srcX) * 4;
			const dstIdx = (y * dstW + x) * 4;
			dst[dstIdx] = src[srcIdx];
			dst[dstIdx + 1] = src[srcIdx + 1];
			dst[dstIdx + 2] = src[srcIdx + 2];
			dst[dstIdx + 3] = src[srcIdx + 3];
		}
	}
	return dst;
}
/**
* Image Metadata Enrichment
*
* Single seam that derives image dimensions and LQIP placeholders (blurhash,
* dominant color) from raw image bytes. Every server-side media-creation path
* routes through this so records are populated consistently. Pure-JS and
* Workers-safe (image-size reads headers only; generatePlaceholder guards
* decode size).
*/
/**
* Derive dimensions + LQIP placeholders from image bytes.
*
* - Non-image content types return `{}`.
* - `knownDimensions` (e.g. browser `naturalWidth/Height`) win over `image-size`
*   for the *stored record* because the browser applies EXIF orientation;
*   `image-size` reports raw header dimensions, which are swapped for
*   90°/270°-rotated JPEGs. They are NOT used for the decode OOM guard — see below.
* - The placeholder OOM guard uses only header dimensions read from the bytes
*   actually decoded. Caller-supplied `knownDimensions` are untrusted for the
*   guard: a client could claim a tiny size for a huge image to bypass the cap.
* - `placeholder` lets a caller decode a smaller thumbnail for the blurhash to
*   avoid OOM on large originals; dimensions still come from `bytes`.
* - Placeholders are jpeg/png only (the generator's supported formats); other
*   image types still get dimensions.
*/
async function enrichImageMetadata(bytes, contentType, opts) {
	const normalizedContentType = normalizeMime(contentType);
	if (!normalizedContentType.startsWith("image/")) return {};
	const headerDims = readDimensions(bytes) ?? void 0;
	const recordDims = opts?.knownDimensions ?? headerDims;
	const override = opts?.placeholder;
	const placeholder = await generatePlaceholder(override ? override.bytes : bytes, override ? normalizeMime(override.contentType) : normalizedContentType, override ? void 0 : headerDims);
	return {
		width: recordDims?.width,
		height: recordDims?.height,
		blurhash: placeholder?.blurhash,
		dominantColor: placeholder?.dominantColor
	};
}
export { enrichImageMetadata as t };
