import { r as canonicalJson } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { SHA256 } from "@oslojs/crypto/sha2";
// node_modules/emdash/dist/digest-DJ1tHCgy.mjs
/**
* SHA-256 hashing and the digests that identify packages, plans, receipts,
* and verified target state.
*
* Digest rules (formatVersion "1"):
* - `packageDigest = "sha256:" + hex(sha256(utf8(canonicalJson(manifest))))`
* - `planDigest = "sha256:" + hex(sha256(utf8(canonicalJson(plan))))` over the
*   complete {@link SiteImportPlan} including its `decisions`, `packageDigest`
*   and `target.siteId`, so a plan cannot be replayed against another package
*   or target.
* - `receiptDigest` covers the receipt with its `receiptDigest` property
*   removed.
* - A record's hash is the hex SHA-256 of its canonical JSON (the NDJSON line
*   without its newline).
* - A chunk's logical hash is
*   `hex(sha256(utf8(canonicalJson([[id, recordSha256], …]))))` over the
*   records of one package record chunk, in chunk order, each record in its
*   predicted target form (after declared transformations).
* - `logicalDigest = "sha256:" + hex(sha256(utf8(canonicalJson(chunks))))`
*   where `chunks` is `[[kind, seq, chunkLogicalSha256], …]` for every record
*   chunk in package order (kinds in `RECORD_KINDS` order, then `seq`).
*   `principal` chunks are excluded because principals are never written to
*   a target. The two-level shape lets verification run in bounded steps and
*   persist one hash per chunk instead of an in-progress hash state.
*/
var SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;
var SHA256_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
function isSha256Hex(value) {
	return typeof value === "string" && SHA256_HEX_PATTERN.test(value);
}
function isSha256Digest(value) {
	return typeof value === "string" && SHA256_DIGEST_PATTERN.test(value);
}
function toSha256Digest(hex) {
	if (!isSha256Hex(hex)) throw new TypeError("Expected a lowercase hex SHA-256");
	return `sha256:${hex}`;
}
function isDigestStreamConstructor(value) {
	return typeof value === "function";
}
function isNodeCreateHash(value) {
	return typeof value === "function";
}
function getDigestStream() {
	const candidate = typeof globalThis.crypto === "object" ? Reflect.get(globalThis.crypto, "DigestStream") : void 0;
	return isDigestStreamConstructor(candidate) ? candidate : void 0;
}
function isNodeRuntime() {
	const processLike = Reflect.get(globalThis, "process");
	if (typeof processLike !== "object" || processLike === null) return false;
	const versions = Reflect.get(processLike, "versions");
	return typeof versions === "object" && versions !== null && typeof Reflect.get(versions, "node") === "string";
}
var nodeCreateHash;
function loadNodeCreateHash() {
	nodeCreateHash ??= (async () => {
		if (!isNodeRuntime()) return null;
		try {
			const nodeCrypto = await import("node:crypto");
			return isNodeCreateHash(nodeCrypto.createHash) ? nodeCrypto.createHash : null;
		} catch {
			return null;
		}
	})();
	return nodeCreateHash;
}
async function preferredBackend() {
	if (getDigestStream()) return "digest-stream";
	if (await loadNodeCreateHash()) return "node";
	return "oslo";
}
var DigestStreamHasher = class {
	backend = "digest-stream";
	#stream;
	#writer;
	#failure;
	constructor(DigestStream) {
		this.#stream = new DigestStream("SHA-256");
		this.#writer = this.#stream.getWriter();
	}
	update(chunk) {
		this.#writer.write(chunk.slice()).catch((error) => {
			this.#failure ??= error;
		});
	}
	async digest() {
		await this.#writer.close();
		if (this.#failure !== void 0) throw this.#failure;
		return encodeHexLowerCase(new Uint8Array(await this.#stream.digest));
	}
};
var NodeHasher = class {
	backend = "node";
	#hash;
	constructor(createHash) {
		this.#hash = createHash("sha256");
	}
	update(chunk) {
		this.#hash.update(chunk);
	}
	async digest() {
		return this.#hash.digest("hex");
	}
};
var OsloHasher = class {
	backend = "oslo";
	#hash = new SHA256();
	update(chunk) {
		this.#hash.update(chunk);
	}
	async digest() {
		return encodeHexLowerCase(this.#hash.digest());
	}
};
async function createSha256(options = {}) {
	switch (options.backend ?? await preferredBackend()) {
		case "digest-stream": {
			const DigestStream = getDigestStream();
			if (!DigestStream) throw new Error("crypto.DigestStream is not available");
			return new DigestStreamHasher(DigestStream);
		}
		case "node": {
			const createHash = await loadNodeCreateHash();
			if (!createHash) throw new Error("node:crypto is not available");
			return new NodeHasher(createHash);
		}
		case "oslo": return new OsloHasher();
	}
}
var encoder = new TextEncoder();
async function sha256Hex(data) {
	const bytes = typeof data === "string" ? encoder.encode(data) : data;
	const hasher = await createSha256();
	hasher.update(bytes);
	return hasher.digest();
}
/** `"sha256:" + hex(sha256(utf8(canonicalJson(value))))`. */
async function canonicalDigest(value) {
	return toSha256Digest(await sha256Hex(canonicalJson(value)));
}
/** Hex SHA-256 of a record's canonical JSON (its NDJSON line without the newline). */
async function recordSha256(record) {
	return sha256Hex(canonicalJson(record));
}
function packageDigest(manifest) {
	return canonicalDigest(manifest);
}
function planDigest(plan) {
	return canonicalDigest(plan);
}
/** Digest over a receipt without its own `receiptDigest` property. */
function receiptDigest(receipt) {
	const { receiptDigest: _ignored, ...rest } = receipt;
	return canonicalDigest(rest);
}
/** Hex logical hash of one record chunk from its `[id, recordSha256]` pairs in chunk order. */
async function chunkLogicalSha256(records) {
	for (const [, sha] of records) if (!isSha256Hex(sha)) throw new TypeError("Expected a lowercase hex SHA-256");
	return sha256Hex(canonicalJson(records.map(([id, sha]) => [id, sha])));
}
/** `logicalDigest` from `[kind, seq, chunkLogicalSha256]` tuples in package order. */
async function logicalDigest(chunks) {
	for (const [, , sha] of chunks) if (!isSha256Hex(sha)) throw new TypeError("Expected a lowercase hex SHA-256");
	return canonicalDigest(chunks.map(([kind, seq, sha]) => [
		kind,
		seq,
		sha
	]));
}
/**
* Pass-through stream that feeds every chunk to `hasher` and counts bytes.
* Throws inside the stream as soon as more than `maxBytes` flow through.
*/
function createHashingStream(hasher, options = {}) {
	let total = 0;
	return {
		stream: new TransformStream({ transform(chunk, controller) {
			total += chunk.byteLength;
			if (options.maxBytes !== void 0 && total > options.maxBytes) throw options.onLimitExceeded?.() ?? /* @__PURE__ */ new RangeError("Stream exceeded its declared size");
			hasher.update(chunk);
			controller.enqueue(chunk);
		} }),
		bytes: () => total
	};
}
export { isSha256Digest as a, planDigest as c, sha256Hex as d, toSha256Digest as f, createSha256 as i, receiptDigest as l, chunkLogicalSha256 as n, logicalDigest as o, createHashingStream as r, packageDigest as s, canonicalDigest as t, recordSha256 as u };
