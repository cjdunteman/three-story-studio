// node_modules/emdash/dist/base64-BQBZwXCx.mjs
/**
* Base64 encoding/decoding utilities.
*
* Uses native Uint8Array.prototype.toBase64 / Uint8Array.fromBase64 when
* available (workerd, Node 26+, modern browsers), falls back to btoa/atob.
*
* All base64url encoding uses the { alphabet: "base64url" } option natively
* or manual character replacement as fallback.
*
* Delete the fallback paths when the minimum Node version supports these
* methods natively.
*/
var hasNative = typeof Uint8Array.prototype.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function";
var BASE64_PLUS_PATTERN = /\+/g;
var BASE64_SLASH_PATTERN = /\//g;
var BASE64_PADDING_PATTERN = /=+$/;
var BASE64URL_DASH_PATTERN = /-/g;
var BASE64URL_UNDERSCORE_PATTERN = /_/g;
/** Encode a UTF-8 string as standard base64. */
function encodeBase64(str) {
	const bytes = new TextEncoder().encode(str);
	if (hasNative) return bytes.toBase64();
	let binary = "";
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary);
}
/** Decode a standard base64 string to a UTF-8 string. */
function decodeBase64(base64) {
	return new TextDecoder().decode(decodeBase64Bytes(base64));
}
/** Decode a standard base64 string to raw bytes (for binary payloads). */
function decodeBase64Bytes(base64) {
	if (hasNative) return Uint8Array.fromBase64(base64);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
/** Encode bytes as base64url without padding. */
function encodeBase64url(bytes) {
	if (hasNative) return bytes.toBase64({
		alphabet: "base64url",
		omitPadding: true
	});
	let binary = "";
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary).replace(BASE64_PLUS_PATTERN, "-").replace(BASE64_SLASH_PATTERN, "_").replace(BASE64_PADDING_PATTERN, "");
}
/** Decode a base64url string (with or without padding) to bytes. */
function decodeBase64url(encoded) {
	if (hasNative) return Uint8Array.fromBase64(encoded, { alphabet: "base64url" });
	const base64 = encoded.replace(BASE64URL_DASH_PATTERN, "+").replace(BASE64URL_UNDERSCORE_PATTERN, "/");
	const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
	const binary = atob(padded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
export { encodeBase64url as a, encodeBase64 as i, decodeBase64Bytes as n, decodeBase64url as r, decodeBase64 as t };
