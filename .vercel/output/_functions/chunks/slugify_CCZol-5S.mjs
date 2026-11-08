// node_modules/@emdash-cms/admin/dist/slugify.js
var SEPARATOR_PATTERN = /[\s_]+/gu;
var UNSAFE_CHARACTER_PATTERN = /[^\p{Letter}\p{Number}\p{Mark}-]+/gu;
var MULTIPLE_HYPHENS_PATTERN = /-+/g;
var EDGE_HYPHENS_PATTERN = /^-+|-+$/g;
var TRAILING_HYPHENS_PATTERN = /-+$/g;
var USABLE_CHARACTER_PATTERN = /[\p{Letter}\p{Number}]/u;
var GRAPHEME_SEGMENTER = new Intl.Segmenter("en", { granularity: "grapheme" });
function fallbackSlug(value) {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index++) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return `untitled-${(hash >>> 0).toString(36).padStart(7, "0")}`;
}
function truncateByGrapheme(value, maxLength) {
	if (maxLength <= 0) return "";
	if (!Number.isFinite(maxLength)) return value;
	let result = "";
	let length = 0;
	for (const { segment } of GRAPHEME_SEGMENTER.segment(value)) {
		if (length >= Math.floor(maxLength)) break;
		result += segment;
		length++;
	}
	return result.replace(TRAILING_HYPHENS_PATTERN, "");
}
/**
* Convert text to a browser-safe Unicode URL slug.
*
* Text is NFKC-normalized and lowercased; whitespace and underscores become
* hyphens while Unicode letters, numbers, and combining marks are preserved.
* The length limit counts grapheme clusters. Inputs without usable characters
* receive a stable `untitled-*` fallback.
*/
function slugify(text, maxLength = 80) {
	const normalized = text.normalize("NFKC").toLowerCase();
	const slug = normalized.replace(SEPARATOR_PATTERN, "-").replace(UNSAFE_CHARACTER_PATTERN, "").replace(MULTIPLE_HYPHENS_PATTERN, "-").replace(EDGE_HYPHENS_PATTERN, "");
	return truncateByGrapheme(USABLE_CHARACTER_PATTERN.test(slug) ? slug : fallbackSlug(normalized), maxLength);
}
export { slugify as t };
