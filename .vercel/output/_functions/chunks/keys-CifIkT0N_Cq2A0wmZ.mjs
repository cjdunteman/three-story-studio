import { t as TransferError } from "./errors-B4f4It-2_rwT1g5LA.mjs";
import { p as isRecordKind } from "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
// node_modules/emdash/dist/paths-biDzFTY2.mjs
/**
* Package file paths.
*
* A package contains exactly these files, and nothing else:
*
* ```
* manifest.json
* index/<seq>.ndjson                file index chunks, listed in the manifest
* records/<kind>/<seq>.ndjson       record chunks, listed in the index
* media/<sha256-hex>                raw media bytes, listed in the index
* ```
*
* `seq` is a zero-padded six-digit number starting at `000000` with no gaps.
* Paths are case-sensitive, relative, and never contain `.`/`..` segments,
* backslashes, or empty segments; anything that does not match is rejected.
*/
var MANIFEST_PATH = "manifest.json";
var SEQ_DIGITS = 6;
var MAX_SEQ = 10 ** SEQ_DIGITS - 1;
var INDEX_PATH_PATTERN = /^index\/(\d{6})\.ndjson$/;
var RECORD_PATH_PATTERN = /^records\/([a-z_]+)\/(\d{6})\.ndjson$/;
var MEDIA_PATH_PATTERN = /^media\/([0-9a-f]{64})$/;
var SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;
function parsePackagePath(path) {
	if (path === "manifest.json") return {
		type: "manifest",
		path
	};
	const index = INDEX_PATH_PATTERN.exec(path);
	if (index) return {
		type: "index",
		path,
		seq: Number(index[1])
	};
	const records = RECORD_PATH_PATTERN.exec(path);
	if (records) {
		const kind = records[1];
		if (!isRecordKind(kind)) return null;
		return {
			type: "records",
			path,
			kind,
			seq: Number(records[2])
		};
	}
	const media = MEDIA_PATH_PATTERN.exec(path);
	if (media) return {
		type: "media",
		path,
		sha256: media[1]
	};
	return null;
}
function isPackagePath(path) {
	return parsePackagePath(path) !== null;
}
function formatSeq(seq) {
	if (!Number.isInteger(seq) || seq < 0 || seq > MAX_SEQ) throw new RangeError(`Invalid chunk sequence ${seq}`);
	return String(seq).padStart(SEQ_DIGITS, "0");
}
function indexChunkPath(seq) {
	return `index/${formatSeq(seq)}.ndjson`;
}
function recordChunkPath(kind, seq) {
	return `records/${kind}/${formatSeq(seq)}.ndjson`;
}
function mediaBlobPath(sha256) {
	if (!SHA256_HEX_PATTERN.test(sha256)) throw new TypeError("Expected a lowercase hex SHA-256");
	return `media/${sha256}`;
}
// node_modules/emdash/dist/keys-CifIkT0N.mjs
/**
* Storage layout for staged packages.
*
* ```
* transfers/imports/<operationId>-<secret>/<package path>
* transfers/exports/<operationId>-<secret>/<package path>
* transfers/<kind>/<operationId>-<secret>/_plan.json
* ```
*
* `secret` is the operation's 128-bit `staging_secret`, so a staged object's
* key cannot be guessed from an operation id. The public media route must
* refuse every key under `transfers/` ({@link isTransferStorageKey}).
*/
var TRANSFER_STORAGE_PREFIX = "transfers/";
/** Staged files that are not part of the package itself. */
var STAGING_AUX_FILES = Object.freeze({ plan: "_plan.json" });
var OPERATION_ID_PATTERN = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var SECRET_PATTERN = /^[0-9a-f]{32}$/;
function stagingPrefix(kind, operationId, stagingSecret) {
	if (!OPERATION_ID_PATTERN.test(operationId) || !SECRET_PATTERN.test(stagingSecret)) throw new TransferError("TRANSFER_STORAGE_ERROR", "Invalid staging location");
	return `${TRANSFER_STORAGE_PREFIX}${kind}s/${operationId}-${stagingSecret}/`;
}
/** Storage key of a package file under `prefix`. Rejects anything but a package path. */
function stagingKey(prefix, path) {
	if (!isPackagePath(path)) throw new TransferError("TRANSFER_PATH_INVALID", "Invalid package path", { detail: { path } });
	return `${prefix}${path}`;
}
function stagingAuxKey(prefix, file) {
	return `${prefix}${STAGING_AUX_FILES[file]}`;
}
/**
* Normalize a storage key for prefix guards, or return null when the key is
* not a plain relative key: a leading `/` or `\`, any backslash, an empty
* segment, or a `.`/`..` segment. The result is lowercased because some
* storage backends treat keys case-insensitively. Guards must refuse keys
* this returns null for.
*/
function normalizeStorageKeyForGuard(key) {
	if (key.length === 0 || key.includes("\\")) return null;
	const segments = key.split("/");
	for (const segment of segments) if (segment === "" || segment === "." || segment === "..") return null;
	return key.toLowerCase();
}
/** Prefixes the public media route must never serve. */
var PRIVATE_STORAGE_PREFIXES = Object.freeze(["backups/", TRANSFER_STORAGE_PREFIX]);
/**
* Whether a public route must refuse `key`: it is not a plain relative key
* or it falls under one of `prefixes`.
*/
function isRefusedStorageKey(key, prefixes = PRIVATE_STORAGE_PREFIXES) {
	const normalized = normalizeStorageKeyForGuard(key);
	return normalized === null || prefixes.some((prefix) => normalized.startsWith(prefix));
}
export { MANIFEST_PATH as a, parsePackagePath as c, stagingPrefix as i, recordChunkPath as l, stagingAuxKey as n, indexChunkPath as o, stagingKey as r, mediaBlobPath as s, isRefusedStorageKey as t };
