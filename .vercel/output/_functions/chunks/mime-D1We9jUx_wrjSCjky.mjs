import * as path from "node:path";
// node_modules/emdash/dist/mime-D1We9jUx.mjs
function normalizeMime(mime) {
	return mime.split(";")[0].trim().toLowerCase();
}
function matchesMimeAllowlist(mime, allowList) {
	const normalized = normalizeMime(mime);
	for (const entry of allowList) {
		if (!entry || !entry.includes("/")) continue;
		const normalizedEntry = normalizeMime(entry);
		if (normalizedEntry.endsWith("/")) {
			if (normalized.startsWith(normalizedEntry)) return true;
		} else if (normalized === normalizedEntry) return true;
	}
	return false;
}
var UNKNOWN_UPLOAD_TYPES = /* @__PURE__ */ new Set(["", "application/octet-stream"]);
/**
* Resolve the MIME type for an uploaded file.
*
* Browsers that don't recognise an extension (e.g. `.jxl`) often report an
* empty or generic `application/octet-stream` type. In those cases fall back to
* the extension map so server-side allowlist checks can still identify allowed
* formats such as `image/jxl`.
*/
function resolveUploadMimeType(filename, fileType) {
	const normalized = normalizeMime(fileType);
	if (normalized && !UNKNOWN_UPLOAD_TYPES.has(normalized)) return normalized;
	return EXTENSION_TO_MIME[path.extname(filename).toLowerCase()] ?? "";
}
var EXTENSION_TO_MIME = {
	".pdf": "application/pdf",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".avif": "image/avif",
	".jxl": "image/jxl",
	".svg": "image/svg+xml",
	".mp3": "audio/mpeg",
	".wav": "audio/wav",
	".mp4": "video/mp4",
	".webm": "video/webm",
	".zip": "application/zip",
	".tar": "application/x-tar",
	".gz": "application/gzip",
	".csv": "text/csv",
	".doc": "application/msword",
	".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	".xls": "application/vnd.ms-excel",
	".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	".txt": "text/plain",
	".rtf": "application/rtf",
	".vtt": "text/vtt",
	".srt": "application/x-subrip",
	".woff": "font/woff",
	".woff2": "font/woff2"
};
/**
* Extract the `allowedMimeTypes` list from a `_emdash_fields.validation` row
* (raw JSON string). Returns null when the value is missing, malformed, or the
* list is empty — callers treat that as "no field-specific constraint".
*/
function parseAllowedMimeTypes(rawValidation) {
	if (!rawValidation) return null;
	try {
		const parsed = JSON.parse(rawValidation);
		if (typeof parsed !== "object" || parsed === null) return null;
		const list = parsed.allowedMimeTypes;
		if (!Array.isArray(list) || list.length === 0) return null;
		return list.filter((entry) => typeof entry === "string");
	} catch {
		return null;
	}
}
export { resolveUploadMimeType as i, normalizeMime as n, parseAllowedMimeTypes as r, matchesMimeAllowlist as t };
