// node_modules/emdash/dist/hash-BJaeek87.mjs
var MAX_CONTENT_HASH_BYTES = 8388608;
function formatContentHash(hash) {
	return `sha1:${Array.from(hash, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
/**
* SHA-256 hash of a string, truncated to 16 hex chars (64 bits).
* For cache invalidation / ETags — not for security.
*/
async function hashString(content) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(content));
	return Array.from(new Uint8Array(buf).slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}
/**
* Compute content hash using Web Crypto API
*
* Uses SHA-1 which is the fastest option in SubtleCrypto.
* SHA-1 is cryptographically weak but fine for content deduplication
* where we only need to detect identical files, not resist attacks.
*
* Returns hex string prefixed with "sha1:" for future-proofing
*/
async function computeContentHash(content) {
	let buf;
	if (content instanceof ArrayBuffer) buf = content;
	else if (content.buffer instanceof ArrayBuffer && content.byteOffset === 0 && content.byteLength === content.buffer.byteLength) buf = content.buffer;
	else {
		buf = new ArrayBuffer(content.byteLength);
		new Uint8Array(buf).set(content);
	}
	const hashBuffer = await crypto.subtle.digest("SHA-1", buf);
	return formatContentHash(new Uint8Array(hashBuffer));
}
export { computeContentHash as n, hashString as r, MAX_CONTENT_HASH_BYTES as t };
