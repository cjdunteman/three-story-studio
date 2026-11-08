// node_modules/emdash/dist/range-CYfeXgGK.mjs
var BYTES_UNIT_PATTERN = /^bytes=/i;
var RANGE_SPEC_PATTERN = /^(\d*)-(\d*)$/;
/**
* Parse a `Range` header that asks for a single byte range.
*
* Returns null when the header should be ignored and the whole file served:
* it's missing or malformed, uses another unit, or asks for several ranges.
*/
function parseRangeHeader(header) {
	if (!header || !BYTES_UNIT_PATTERN.test(header)) return null;
	const [spec, ...otherSpecs] = header.slice(6).split(",").map((part) => part.trim()).filter((part) => part !== "");
	const match = spec !== void 0 && otherSpecs.length === 0 ? RANGE_SPEC_PATTERN.exec(spec) : null;
	if (!match) return null;
	const [, first = "", last = ""] = match;
	if (first === "") {
		const suffix = Number(last);
		return last !== "" && Number.isSafeInteger(suffix) ? { suffix } : null;
	}
	const offset = Number(first);
	if (!Number.isSafeInteger(offset)) return null;
	if (last === "") return { offset };
	const end = Number(last);
	if (!Number.isSafeInteger(end) || end < offset) return null;
	return {
		offset,
		length: end - offset + 1
	};
}
/**
* The bytes a range selects from a file of `size` bytes, or null when it
* selects none.
*/
function resolveByteRange(range, size) {
	if ("suffix" in range) {
		const length = Math.min(range.suffix, size);
		return length > 0 ? {
			offset: size - length,
			length
		} : null;
	}
	const length = Math.min(range.length ?? size, size - range.offset);
	return range.offset >= 0 && length > 0 ? {
		offset: range.offset,
		length
	} : null;
}
export { resolveByteRange as n, parseRangeHeader as t };
