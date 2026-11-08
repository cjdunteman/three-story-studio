// node_modules/emdash/dist/canonical-BudtH-Fx.mjs
/**
* Hard limits for site packages and transfer operations.
*
* Package limits are part of the format contract: an exporter must never
* produce a package that exceeds them and a reader must reject one that does
* before doing expensive work. Operation limits bound one `advance` step so it
* fits a Workers request on D1.
*/
var MiB = 1048576;
var TRANSFER_LIMITS = Object.freeze({
	manifestBytes: 8 * MiB,
	recordLineBytes: 19e5,
	chunkBytes: 4 * MiB,
	chunkRecords: 1e3,
	totalRecords: 5e6,
	jsonDepth: 64,
	totalFiles: 1e6,
	indexChunks: 1e3,
	defaultMaxBlobBytes: 50 * MiB,
	idLength: 1024,
	shortString: 4096,
	stepQueryCeiling: 900,
	stepQueries: 150,
	stepClosingQueries: 2,
	stepBytes: 32 * MiB,
	d1BindParameters: 100,
	leaseSeconds: 300,
	pendingImportTtlSeconds: 86400,
	exportTtlSeconds: 604800,
	approvalTtlSeconds: 900,
	exportFenceAttempts: 3,
	verificationMismatches: 50,
	planIssues: 500
});
/**
* Rows per multi-row INSERT so a statement stays within D1's bound-parameter
* limit. Returns 0 when a single row needs more parameters than the limit;
* callers then insert core columns first and set the rest with batched
* UPDATEs.
*/
function rowsPerInsert(columnCount) {
	if (!Number.isInteger(columnCount) || columnCount < 1) throw new RangeError(`Invalid column count ${columnCount}`);
	return Math.floor(TRANSFER_LIMITS.d1BindParameters / columnCount);
}
/**
* Canonical JSON serialization for site packages.
*
* Rules (normative for formatVersion "1"):
* - object keys are sorted by UTF-16 code unit order ({@link compareUtf16});
* - no insignificant whitespace;
* - strings and numbers are encoded exactly as `JSON.stringify` encodes them;
* - object properties whose value is `undefined` are omitted;
* - `undefined` inside an array, non-finite numbers, and any value that is not
*   a plain object, array, string, finite number, boolean, or `null` are
*   rejected;
* - nesting depth is at most {@link TRANSFER_LIMITS.jsonDepth} containers
*   (the root object or array is depth 1).
*
* The manifest, every NDJSON line, the plan, the receipt, and logical digests
* all use this one implementation.
*/
var CanonicalJsonError = class extends Error {
	path;
	constructor(message, path) {
		super(`${message} at ${path}`);
		this.name = "CanonicalJsonError";
		this.path = path;
	}
};
function compareUtf16(a, b) {
	if (a === b) return 0;
	return a < b ? -1 : 1;
}
function canonicalJson(value, options = {}) {
	const maxDepth = options.maxDepth ?? TRANSFER_LIMITS.jsonDepth;
	const parts = [];
	write(value, parts, 0, maxDepth, "$");
	return parts.join("");
}
function write(value, out, depth, maxDepth, path) {
	if (value === null) {
		out.push("null");
		return;
	}
	switch (typeof value) {
		case "string":
			out.push(JSON.stringify(value));
			return;
		case "number":
			if (!Number.isFinite(value)) throw new CanonicalJsonError("Non-finite number", path);
			out.push(JSON.stringify(value));
			return;
		case "boolean":
			out.push(value ? "true" : "false");
			return;
		case "object": break;
		default: throw new CanonicalJsonError(`Unsupported ${typeof value} value`, path);
	}
	if (depth + 1 > maxDepth) throw new CanonicalJsonError(`Nesting deeper than ${maxDepth}`, path);
	if (Array.isArray(value)) {
		out.push("[");
		for (let index = 0; index < value.length; index++) {
			if (index > 0) out.push(",");
			const item = value[index];
			if (item === void 0) throw new CanonicalJsonError("Undefined array item", `${path}[${index}]`);
			write(item, out, depth + 1, maxDepth, `${path}[${index}]`);
		}
		out.push("]");
		return;
	}
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) throw new CanonicalJsonError("Non-plain object", path);
	const present = Object.entries(value).filter(([, item]) => item !== void 0).toSorted(([a], [b]) => compareUtf16(a, b));
	out.push("{");
	present.forEach(([key, item], index) => {
		if (index > 0) out.push(",");
		out.push(JSON.stringify(key), ":");
		write(item, out, depth + 1, maxDepth, `${path}.${key}`);
	});
	out.push("}");
}
/**
* Container nesting depth of a JSON text, measured without parsing it so an
* adversarial document cannot exhaust the parser's stack first. Returns
* `Infinity` as soon as `limit` is exceeded.
*/
function measureJsonDepth(text, limit = TRANSFER_LIMITS.jsonDepth) {
	let depth = 0;
	let max = 0;
	let inString = false;
	for (let index = 0; index < text.length; index++) {
		const code = text.charCodeAt(index);
		if (inString) {
			if (code === 92) index++;
			else if (code === 34) inString = false;
			continue;
		}
		if (code === 34) inString = true;
		else if (code === 123 || code === 91) {
			depth++;
			if (depth > max) {
				max = depth;
				if (max > limit) return Number.POSITIVE_INFINITY;
			}
		} else if (code === 125 || code === 93) depth--;
	}
	return max;
}
/**
* Parse a JSON text that must already be in canonical form. Throws
* {@link CanonicalJsonError} when the depth limit is exceeded, the text is not
* valid JSON, or re-serializing the parsed value does not reproduce the text
* byte for byte.
*/
function parseCanonicalJson(text, options = {}) {
	const maxDepth = options.maxDepth ?? TRANSFER_LIMITS.jsonDepth;
	if (measureJsonDepth(text, maxDepth) > maxDepth) throw new CanonicalJsonError(`Nesting deeper than ${maxDepth}`, "$");
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new CanonicalJsonError("Invalid JSON", "$");
	}
	if (canonicalJson(parsed, { maxDepth }) !== text) throw new CanonicalJsonError("JSON is not in canonical form", "$");
	return parsed;
}
export { measureJsonDepth as a, compareUtf16 as i, TRANSFER_LIMITS as n, parseCanonicalJson as o, canonicalJson as r, rowsPerInsert as s, CanonicalJsonError as t };
