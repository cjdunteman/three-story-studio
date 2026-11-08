import { i as resolveAndValidateExternalUrlTarget, t as SsrfError } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { RECORD_SCOPED_BLOB_CACHE_TYPE } from "@emdash-cms/registry-lexicons";
// node_modules/emdash/dist/checksum-CEqvfxGX.mjs
var UNSUPPORTED_AUTH_MESSAGE = "This release requires an authentication method the client does not support.";
function unsupportedAuthDetails(auth) {
	if (!isRecord$1(auth) || typeof auth.hint_url !== "string" || auth.hint_url.length > 2048) return;
	try {
		const url = new URL(auth.hint_url);
		if (url.protocol !== "https:" || url.username || url.password) return void 0;
		return { hintUrl: url.href };
	} catch {
		return;
	}
}
function isRecord$1(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function verificationError(code, message, details) {
	return {
		success: false,
		error: {
			code,
			message,
			...details === void 0 ? {} : { details }
		}
	};
}
var SHA2_256_CODE = 18;
var SHA2_256_LENGTH = 32;
var BASE32_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";
/** Derive the required artifact checksum from a raw sha2-256 blob CID. */
function multihashFromBlobCid(value) {
	if (!value.startsWith("b")) return verificationError("BLOB_REF_INVALID", "The blob reference CID is malformed.");
	const bytes = decodeBase32(value.slice(1));
	if (bytes === null || bytes.length !== 36 || bytes[0] !== 1 || bytes[1] !== 85) return verificationError("BLOB_REF_INVALID", "Blob references must use a CIDv1 raw sha2-256 CID.");
	const checksum = `b${encodeBase32(bytes.slice(2))}`;
	if (!decodeMultihash(checksum).success) return verificationError("BLOB_REF_INVALID", "Blob references must use a CIDv1 raw sha2-256 CID.");
	return {
		success: true,
		value: checksum
	};
}
/** Decodes a lowercase base32 multibase-encoded multihash. */
function decodeMultihash(value) {
	if (!value.startsWith("b")) return verificationError("INVALID_MULTIHASH", "Checksums must be lowercase base32 multibase-encoded multihashes.");
	const bytes = decodeBase32(value.slice(1));
	if (bytes === null) return verificationError("INVALID_MULTIHASH", "The multibase checksum is malformed.");
	const code = readVarint(bytes, 0);
	if (code === null) return verificationError("INVALID_MULTIHASH", "The multihash algorithm code is malformed.");
	const length = readVarint(bytes, code.nextOffset);
	if (length === null || length.value !== bytes.length - length.nextOffset) return verificationError("INVALID_MULTIHASH", "The multihash digest length is malformed.");
	if (code.value !== SHA2_256_CODE) return verificationError("UNSUPPORTED_MULTIHASH", "The multihash algorithm is not supported.");
	if (length.value !== SHA2_256_LENGTH) return verificationError("INVALID_MULTIHASH", "The sha2-256 digest must be 32 bytes.");
	return {
		success: true,
		value: {
			algorithm: "sha2-256",
			digest: bytes.slice(length.nextOffset)
		}
	};
}
async function computeArtifactDigestCandidates(bytes) {
	const [sha256, sha384, sha512] = await Promise.all([
		crypto.subtle.digest("SHA-256", new Uint8Array(bytes)),
		crypto.subtle.digest("SHA-384", new Uint8Array(bytes)),
		crypto.subtle.digest("SHA-512", new Uint8Array(bytes))
	]);
	return [
		new Uint8Array(sha256),
		new Uint8Array(sha384),
		new Uint8Array(sha512)
	];
}
async function verifyMultihash(bytes, expected) {
	const decoded = decodeMultihash(expected);
	if (!decoded.success) return decoded;
	const actual = await computeDigest(bytes, decoded.value.algorithm);
	if (!actual.success) return actual;
	if (!compareDigestBytes(actual.value, decoded.value.digest)) return verificationError("CHECKSUM_MISMATCH", "The resource bytes do not match the expected checksum.");
	return {
		success: true,
		value: true
	};
}
/**
* Compare public checksum digest bytes without early exit. Digests are public
* integrity metadata, so a portable byte loop is preferable to a Node-only
* timing primitive while still avoiding an ordinary equality short circuit.
*/
function compareDigestBytes(left, right) {
	let difference = left.length ^ right.length;
	const maximumLength = Math.max(left.length, right.length);
	for (let index = 0; index < maximumLength; index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
	return difference === 0;
}
async function computeDigest(bytes, algorithm) {
	if (algorithm !== "sha2-256") return verificationError("UNSUPPORTED_MULTIHASH", "The multihash algorithm is not supported.");
	try {
		return {
			success: true,
			value: new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)))
		};
	} catch {
		return verificationError("UNSUPPORTED_MULTIHASH", "The sha2-256 algorithm is unavailable.");
	}
}
function readVarint(bytes, offset) {
	let value = 0;
	let shift = 0;
	for (let index = offset; index < bytes.length && index < offset + 5; index += 1) {
		const byte = bytes[index];
		if (byte === void 0) return null;
		value |= (byte & 127) << shift;
		if ((byte & 128) === 0) return {
			value,
			nextOffset: index + 1
		};
		shift += 7;
	}
	return null;
}
function encodeBase32(bytes) {
	let result = "";
	let buffer = 0;
	let bits = 0;
	for (const byte of bytes) {
		buffer = buffer << 8 | byte;
		bits += 8;
		while (bits >= 5) {
			result += BASE32_ALPHABET[buffer >>> bits - 5 & 31] ?? "";
			bits -= 5;
		}
	}
	if (bits > 0) result += BASE32_ALPHABET[buffer << 5 - bits & 31] ?? "";
	return result;
}
function decodeBase32(value) {
	if (value.length === 0) return null;
	let buffer = 0;
	let bits = 0;
	const output = [];
	for (const character of value) {
		const digit = BASE32_ALPHABET.indexOf(character);
		if (digit === -1) return null;
		buffer = buffer << 5 | digit;
		bits += 5;
		if (bits >= 8) {
			output.push(buffer >>> bits - 8 & 255);
			bits -= 8;
		}
	}
	if (bits > 0 && (buffer & (1 << bits) - 1) !== 0) return null;
	return new Uint8Array(output);
}
// node_modules/emdash/dist/artifact-fetch-DIh7iyOV.mjs
var DIGITS = /^\d+$/;
var IPV4_LITERAL = /^\d{1,3}(?:\.\d{1,3}){3}$/;
var IPV4_PART = /^\d{1,3}$/;
var IPV6_PART = /^[0-9a-f]{1,4}$/i;
var TRAILING_DOT$1 = /\.+$/;
var DEFAULT_FETCH_LIMITS = {
	headerTimeoutMs: 1e4,
	totalTimeoutMs: 3e4,
	maxBytes: 26214400,
	maxRedirects: 3
};
async function fetchVerifiedResource(value, options) {
	const limits = {
		headerTimeoutMs: options.headerTimeoutMs ?? DEFAULT_FETCH_LIMITS.headerTimeoutMs,
		totalTimeoutMs: options.totalTimeoutMs ?? DEFAULT_FETCH_LIMITS.totalTimeoutMs,
		maxBytes: options.maxBytes ?? DEFAULT_FETCH_LIMITS.maxBytes,
		maxRedirects: options.maxRedirects ?? DEFAULT_FETCH_LIMITS.maxRedirects
	};
	if (!areValidLimits(limits)) return verificationError("INVALID_URL", "Fetch limits must be positive integers.");
	const startedAt = Date.now();
	let currentUrl = parseAndValidateUrl(value, void 0, options.allowHttpLocalhost === true);
	if (!currentUrl.success) return currentUrl;
	for (let redirects = 0;; redirects += 1) {
		const remaining = limits.totalTimeoutMs - (Date.now() - startedAt);
		if (remaining <= 0) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		const host = isAllowedLoopback(currentUrl.value, options.allowHttpLocalhost === true) ? {
			success: true,
			value: true
		} : await validateHost(currentUrl.value, options.resolveHostname, remaining);
		if (!host.success) return host;
		const remainingAfterResolution = limits.totalTimeoutMs - (Date.now() - startedAt);
		if (remainingAfterResolution <= 0) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		const response = await fetchResponse(options.fetch, currentUrl.value, Math.min(remainingAfterResolution, limits.headerTimeoutMs));
		if (!response.success) return response;
		if (isRedirect(response.value.status)) {
			if (redirects >= limits.maxRedirects) return verificationError("REDIRECT_LIMIT_EXCEEDED", "The resource exceeded the redirect limit.");
			const location = response.value.headers.get("location");
			if (location === null) return verificationError("REDIRECT_LOCATION_MISSING", "The redirect response has no location header.");
			currentUrl = parseAndValidateUrl(location, currentUrl.value, options.allowHttpLocalhost === true);
			if (!currentUrl.success) return currentUrl;
			continue;
		}
		if (!response.value.ok && !options.allowedStatuses?.includes(response.value.status)) return verificationError("RESOURCE_STATUS_ERROR", `The resource returned HTTP ${response.value.status}.`);
		const contentLength = response.value.headers.get("content-length");
		if (contentLength !== null && (!DIGITS.test(contentLength) || Number(contentLength) > limits.maxBytes)) return verificationError("RESOURCE_SIZE_EXCEEDED", "The resource exceeds the byte limit.");
		const bytes = await readResponse(response.value, limits.maxBytes, startedAt, limits.totalTimeoutMs);
		if (!bytes.success) return bytes;
		return {
			success: true,
			value: {
				bytes: bytes.value,
				url: currentUrl.value,
				status: response.value.status,
				headers: response.value.headers
			}
		};
	}
}
function parseAndValidateUrl(value, base, allowHttpLocalhost = false) {
	let url;
	try {
		url = new URL(value, base);
	} catch {
		return verificationError("INVALID_URL", "The resource URL is invalid.");
	}
	if (url.protocol !== "https:" && !isAllowedLoopback(url, allowHttpLocalhost) || url.username !== "" || url.password !== "") return verificationError("INVALID_URL", "Resource URLs must use HTTPS and cannot include credentials.");
	if (!isAllowedLoopback(url, allowHttpLocalhost) && (isIpLiteral(url.hostname) || isLocalHostname(url.hostname))) return verificationError("HOST_REJECTED", "The resource host is not permitted.");
	return {
		success: true,
		value: url
	};
}
function isAllowedLoopback(url, enabled) {
	if (!enabled || url.protocol !== "http:" && url.protocol !== "https:") return false;
	const hostname = url.hostname.toLowerCase().replace(TRAILING_DOT$1, "");
	return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "::1";
}
async function validateHost(url, resolver, timeoutMs) {
	try {
		const addresses = await withTimeout(Promise.resolve().then(() => resolver(url.hostname)), timeoutMs);
		if (addresses.length === 0 || addresses.some(isForbiddenAddress)) return verificationError("HOST_REJECTED", "The resource host resolved to a forbidden address.");
		return {
			success: true,
			value: true
		};
	} catch (error) {
		if (isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		return verificationError("HOST_REJECTED", "The resource host could not be validated.");
	}
}
async function fetchResponse(fetchImplementation, url, timeoutMs) {
	const controller = new AbortController();
	try {
		return {
			success: true,
			value: await withTimeout(Promise.resolve().then(() => fetchImplementation(url, {
				method: "GET",
				redirect: "manual",
				signal: controller.signal
			})), timeoutMs, () => controller.abort())
		};
	} catch (error) {
		if (controller.signal.aborted || isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource response headers timed out.");
		return verificationError("FETCH_FAILED", "The resource request failed.");
	}
}
async function readResponse(response, maximumBytes, startedAt, totalTimeoutMs) {
	if (response.body === null) return {
		success: true,
		value: /* @__PURE__ */ new Uint8Array()
	};
	const reader = response.body.getReader();
	const chunks = [];
	let length = 0;
	try {
		for (;;) {
			const remaining = totalTimeoutMs - (Date.now() - startedAt);
			if (remaining <= 0) {
				await reader.cancel();
				return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
			}
			const chunk = await readWithTimeout(reader, remaining);
			if (!chunk.success) {
				await reader.cancel();
				return chunk;
			}
			if (chunk.value.done) break;
			const value = chunk.value.value;
			length += value.length;
			if (length > maximumBytes) {
				await reader.cancel();
				return verificationError("RESOURCE_SIZE_EXCEEDED", "The resource exceeds the byte limit.");
			}
			chunks.push(value);
		}
	} catch {
		return verificationError("FETCH_FAILED", "The resource response could not be read.");
	} finally {
		reader.releaseLock();
	}
	const output = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		output.set(chunk, offset);
		offset += chunk.length;
	}
	return {
		success: true,
		value: output
	};
}
async function readWithTimeout(reader, timeoutMs) {
	try {
		return {
			success: true,
			value: await withTimeout(Promise.resolve().then(() => reader.read()), timeoutMs)
		};
	} catch (error) {
		if (isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		return verificationError("FETCH_FAILED", "The resource response could not be read.");
	}
}
/**
* Every operation has both fulfillment and rejection handlers, so an operation
* that loses the timeout race cannot later become an unhandled rejection.
*/
function withTimeout(operation, timeoutMs, onTimeout) {
	return new Promise((resolve, reject) => {
		let settled = false;
		const timeout = setTimeout(() => {
			if (settled) return;
			settled = true;
			onTimeout?.();
			reject(new DOMException("Timed out", "AbortError"));
		}, timeoutMs);
		operation.then((value) => {
			if (settled) return void 0;
			settled = true;
			clearTimeout(timeout);
			resolve(value);
		}, (error) => {
			if (settled) return void 0;
			settled = true;
			clearTimeout(timeout);
			reject(error);
		});
	});
}
function areValidLimits(limits) {
	return Object.values(limits).every((value) => Number.isSafeInteger(value) && value > 0);
}
function isRedirect(status) {
	return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}
function isAbortError(error) {
	return error instanceof DOMException && error.name === "AbortError";
}
function isIpLiteral(hostname) {
	return IPV4_LITERAL.test(hostname) || hostname.includes(":");
}
function isLocalHostname(hostname) {
	const normalized = hostname.toLowerCase();
	return normalized === "localhost" || normalized.endsWith(".localhost") || normalized.endsWith(".local") || normalized.endsWith(".internal");
}
function isForbiddenAddress(address) {
	const ipv4 = parseIpv4(address);
	if (ipv4 !== null) {
		const [a, b] = ipv4;
		return a === 0 || a === 10 || a === 127 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 0 || b === 168) || a === 198 && (b === 18 || b === 19) || a >= 224;
	}
	const ipv6 = parseIpv6(address);
	if (ipv6 === null) return true;
	const first = ipv6[0];
	const isUnspecified = ipv6.every((part) => part === 0);
	const isLoopback = ipv6.slice(0, 7).every((part) => part === 0) && ipv6[7] === 1;
	const isPrivate = (first & 65024) === 64512;
	const isLinkLocal = (first & 65472) === 65152;
	const isMulticast = (first & 65280) === 65280;
	if (ipv6.slice(0, 5).every((part) => part === 0) && ipv6[5] === 65535) return isForbiddenAddress(`${ipv6[6] >>> 8}.${ipv6[6] & 255}.${ipv6[7] >>> 8}.${ipv6[7] & 255}`);
	return isUnspecified || isLoopback || isPrivate || isLinkLocal || isMulticast;
}
function parseIpv4(value) {
	const parts = value.split(".");
	if (parts.length !== 4) return null;
	const numbers = parts.map((part) => IPV4_PART.test(part) ? Number(part) : NaN);
	if (numbers.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
	return [
		numbers[0],
		numbers[1],
		numbers[2],
		numbers[3]
	];
}
function parseIpv6(value) {
	if (value.includes(":::") || value.split("::").length > 2) return null;
	const [before = "", after = ""] = value.split("::");
	const head = before === "" ? [] : before.split(":");
	const tail = after === "" ? [] : after.split(":");
	const parts = [...head, ...tail];
	if (parts.some((part) => !IPV6_PART.test(part)) || parts.length > 8) return null;
	if (!value.includes("::") && parts.length !== 8) return null;
	const zeroes = value.includes("::") ? 8 - parts.length : 0;
	return [
		...head,
		...Array.from({ length: zeroes }).fill("0"),
		...tail
	].map((part) => Number.parseInt(part, 16));
}
var DID_DOCUMENT_MAX_BYTES = 262144;
var PLC_DID_PATTERN = /^did:plc:[a-z2-7]{24}$/;
var CID_PATTERN = /^b[a-z2-7]+$/;
var UNSAFE_PATH_SEGMENT = /[/\\?#]/;
async function fetchReleaseArtifact(input, options) {
	const deadline = Date.now() + (options.totalTimeoutMs ?? DEFAULT_FETCH_LIMITS.totalTimeoutMs);
	const { artifact } = input;
	if (!artifact.blob && !artifact.url) return verificationError("RELEASE_ARTIFACT_SOURCE_MISSING", "The release artifact must provide a blob or URL.");
	if (artifact.requiresAuth === true || input.auth !== void 0) return unsupportedAuth(input.auth);
	const blobCid = modernBlobCid(artifact.blob);
	const blobMetadata = blobCid && artifact.blob && "ref" in artifact.blob ? artifact.blob : void 0;
	if (artifact.blob && !blobCid) return verificationError("BLOB_REF_INVALID", "Legacy blob references are not supported.");
	if (blobCid) {
		const expected = multihashFromBlobCid(blobCid);
		if (!expected.success) return expected;
		if (expected.value !== artifact.checksum) return verificationError("CHECKSUM_MISMATCH", "The artifact checksum does not match its blob reference CID.");
	}
	let lastError;
	for (const cache of input.artifactCaches ?? []) {
		const serviceEndpoint = recordScopedCacheEndpoint(cache);
		if (!serviceEndpoint || !blobCid) continue;
		const cacheUrl = recordScopedBlobCacheUrl(serviceEndpoint, input.record, blobCid);
		if (!cacheUrl.success) {
			lastError = cacheUrl.error;
			continue;
		}
		const attemptOptions = withinDeadline(options, deadline);
		if (!attemptOptions) return timedOut();
		const result = await fetchAndVerify("artifact-cache", cacheUrl.value, artifact.checksum, withBlobSizeLimit(attemptOptions, blobMetadata), blobMetadata);
		if (result.success) return result;
		lastError = result.error;
	}
	if (blobCid) {
		const resolutionOptions = withinDeadline(options, deadline);
		if (!resolutionOptions) return timedOut();
		const pds = input.pdsEndpoint ? {
			success: true,
			value: input.pdsEndpoint
		} : await resolvePublisherPdsEndpoint(input.record.did, resolutionOptions);
		if (pds.success) {
			const url = blobUrl(pds.value, input.record.did, blobCid);
			if (url.success) {
				const attemptOptions = withinDeadline(options, deadline);
				if (!attemptOptions) return timedOut();
				const result = await fetchAndVerify("blob", url.value, artifact.checksum, withBlobSizeLimit(attemptOptions, blobMetadata), blobMetadata);
				if (result.success) return result;
				lastError = result.error;
			} else lastError = url.error;
		} else lastError = pds.error;
	}
	if (artifact.url) {
		const attemptOptions = withinDeadline(options, deadline);
		if (!attemptOptions) return timedOut();
		const result = await fetchAndVerify("url", artifact.url, artifact.checksum, withBlobSizeLimit(attemptOptions, blobMetadata), blobMetadata);
		if (result.success) return result;
		lastError = result.error;
	}
	return lastError ? {
		success: false,
		error: lastError
	} : verificationError("FETCH_FAILED", "The release artifact could not be fetched.");
}
function recordScopedBlobCacheUrl(serviceEndpoint, record, blobCid) {
	try {
		const endpoint = new URL(serviceEndpoint);
		if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password || endpoint.pathname !== "/" || endpoint.search || endpoint.hash) throw new Error();
		const segments = [
			"r",
			record.did,
			record.collection,
			record.rkey,
			record.cid,
			blobCid
		];
		if (!CID_PATTERN.test(record.cid) || !CID_PATTERN.test(blobCid) || segments.some((segment) => !isSafePathSegment(segment))) throw new Error();
		return {
			success: true,
			value: new URL(segments.join("/"), endpoint)
		};
	} catch {
		return verificationError("INVALID_URL", "The record-scoped blob cache endpoint is invalid.");
	}
}
function recordScopedImageCacheUrl(serviceEndpoint, preset, record, blobCid) {
	const raw = recordScopedBlobCacheUrl(serviceEndpoint, record, blobCid);
	if (!raw.success) return raw;
	const url = new URL(raw.value);
	url.pathname = `/img/${preset}${url.pathname}`;
	return {
		success: true,
		value: url
	};
}
async function resolvePublisherPdsEndpoint(publisherDid, options) {
	const documentUrl = didDocumentUrl(publisherDid);
	if (!documentUrl) return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID is not supported.");
	const fetched = await fetchVerifiedResource(documentUrl, {
		...options,
		maxBytes: DID_DOCUMENT_MAX_BYTES
	});
	if (!fetched.success) return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID document could not be fetched.");
	let document;
	try {
		document = JSON.parse(new TextDecoder().decode(fetched.value.bytes));
	} catch {
		return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID document is malformed.");
	}
	if (!isRecord(document) || document.id !== publisherDid || !Array.isArray(document.service)) return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID document has no valid PDS service.");
	const service = document.service.find((value) => isRecord(value) && (value.id === `${publisherDid}#atproto_pds` || value.id === "#atproto_pds") && value.type === "AtprotoPersonalDataServer" && typeof value.serviceEndpoint === "string");
	if (!isRecord(service) || typeof service.serviceEndpoint !== "string") return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID document has no valid PDS service.");
	try {
		const endpoint = new URL(service.serviceEndpoint);
		if (!(options.allowHttpLocalhost === true && endpoint.protocol === "http:" && (endpoint.hostname === "localhost" || endpoint.hostname === "127.0.0.1")) && endpoint.protocol !== "https:" || endpoint.username || endpoint.password) throw new Error();
		return {
			success: true,
			value: endpoint.href
		};
	} catch {
		return verificationError("PDS_RESOLUTION_FAILED", "The publisher DID document has no valid PDS service.");
	}
}
async function fetchAndVerify(source, url, checksum, options, blobMetadata) {
	const fetched = await fetchVerifiedResource(url, options);
	if (!fetched.success) return blobMetadata && fetched.error.code === "RESOURCE_SIZE_EXCEEDED" ? verificationError("BLOB_METADATA_MISMATCH", "The fetched artifact size does not match its signed blob metadata.") : fetched;
	const verified = await verifyMultihash(fetched.value.bytes, checksum);
	if (!verified.success) return verified;
	const contentType = fetched.value.headers.get("content-type")?.split(";", 1)[0]?.trim();
	if (blobMetadata && (fetched.value.bytes.byteLength !== blobMetadata.size || contentType !== void 0 && contentType !== blobMetadata.mimeType)) return verificationError("BLOB_METADATA_MISMATCH", "The fetched artifact does not match its signed blob metadata.");
	return {
		success: true,
		value: {
			bytes: fetched.value.bytes,
			source,
			url: fetched.value.url
		}
	};
}
function withBlobSizeLimit(options, blobMetadata) {
	if (!blobMetadata) return options;
	return {
		...options,
		maxBytes: Math.min(options.maxBytes ?? DEFAULT_FETCH_LIMITS.maxBytes, blobMetadata.size)
	};
}
function blobUrl(pdsEndpoint, publisherDid, cid) {
	try {
		const url = new URL("/xrpc/com.atproto.sync.getBlob", pdsEndpoint);
		url.searchParams.set("did", publisherDid);
		url.searchParams.set("cid", cid);
		return {
			success: true,
			value: url
		};
	} catch {
		return verificationError("PDS_RESOLUTION_FAILED", "The publisher PDS endpoint is invalid.");
	}
}
function didDocumentUrl(did) {
	if (PLC_DID_PATTERN.test(did)) return `https://plc.directory/${encodeURIComponent(did)}`;
	if (!did.startsWith("did:web:")) return null;
	try {
		const parts = did.slice(8).split(":").map(decodeURIComponent);
		const host = parts.shift();
		if (!host || parts.some((part) => part === "" || part === "." || part === "..")) return null;
		const path = parts.length === 0 ? "/.well-known/did.json" : `/${parts.join("/")}/did.json`;
		return new URL(path, `https://${host}`).href;
	} catch {
		return null;
	}
}
function unsupportedAuth(auth) {
	return verificationError("AUTH_METHOD_UNSUPPORTED", UNSUPPORTED_AUTH_MESSAGE, unsupportedAuthDetails(auth));
}
function withinDeadline(options, deadline) {
	const remaining = deadline - Date.now();
	if (remaining <= 0) return null;
	return {
		...options,
		totalTimeoutMs: remaining
	};
}
function timedOut() {
	return verificationError("RESOURCE_TIMEOUT", "Artifact retrieval exceeded its total timeout.");
}
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function modernBlobCid(blob) {
	if (!blob || !("ref" in blob) || typeof blob.ref?.$link !== "string") return null;
	return blob.ref.$link;
}
function recordScopedCacheEndpoint(value) {
	if (!isRecord(value) || value.$type !== RECORD_SCOPED_BLOB_CACHE_TYPE) return null;
	return typeof value.serviceEndpoint === "string" ? value.serviceEndpoint : null;
}
function isSafePathSegment(value) {
	if (value.length === 0 || UNSAFE_PATH_SEGMENT.test(value)) return false;
	for (const character of value) {
		const codePoint = character.codePointAt(0);
		if (codePoint !== void 0 && (codePoint <= 31 || codePoint === 127)) return false;
	}
	return true;
}
var TRAILING_DOT = /\.+$/;
var LOCALHOST_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"localhost.localdomain",
	"ip6-localhost",
	"ip6-loopback"
]);
function isLocalhostHostname(hostname) {
	const normalized = hostname.toLowerCase().replace(TRAILING_DOT, "");
	return LOCALHOST_HOSTNAMES.has(normalized) || normalized.endsWith(".localhost") || normalized === "127.0.0.1" || normalized === "::1" || normalized === "[::1]" || normalized.startsWith("::ffff:127.") || normalized.startsWith("::ffff:7f00:");
}
async function resolveSafeArtifactTarget(urlString) {
	let url;
	try {
		url = new URL(urlString);
	} catch {
		throw new Error(`Invalid artifact URL: ${urlString}`);
	}
	if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error(`Artifact URL protocol not allowed: ${url.protocol}`);
	if (url.username || url.password) throw new Error("Artifact URL must not contain embedded credentials");
	const hostname = stripIpv6Brackets(url.hostname.toLowerCase().replace(TRAILING_DOT, ""));
	const localhost = isLocalhostHostname(hostname);
	if (url.protocol === "http:") throw new Error("Artifact URL must use https");
	if (localhost) throw new Error(`Artifact URL points to localhost: ${hostname}`);
	if (localhost) return {
		url,
		addresses: []
	};
	try {
		return await resolveAndValidateExternalUrlTarget(url.href);
	} catch (error) {
		if (error instanceof SsrfError) throw new Error(`Artifact URL rejected: ${error.message}`, { cause: error });
		throw error;
	}
}
async function fetchRegistryArtifactUrl(urlString, options) {
	if (!Number.isSafeInteger(options.maxResponseBytes) || options.maxResponseBytes < 0) throw new TypeError("Registry artifact response limit is invalid");
	const target = await resolveSafeArtifactTarget(urlString);
	if (target.addresses.length === 0) return globalThis.fetch(target.url, {
		redirect: "manual",
		signal: options.signal
	});
	const result = await (await createRuntimeRegistryArtifactTransport()).fetch({
		url: target.url,
		allowedAddresses: target.addresses,
		signal: options.signal,
		maxResponseBytes: options.maxResponseBytes
	});
	if (result.connectedAddress !== null && !target.addresses.includes(result.connectedAddress)) {
		await result.response.body?.cancel().catch(() => void 0);
		throw new Error("Registry artifact transport connected outside the validated address set");
	}
	return result.response;
}
async function createRuntimeRegistryArtifactTransport() {
	return isCloudflareWorkersRuntime() ? createWorkersRegistryArtifactTransport() : createNodeRegistryArtifactTransport();
}
function createWorkersRegistryArtifactTransport(workerFetch = globalThis.fetch) {
	return { async fetch(input) {
		return {
			response: limitResponseBody(await workerFetch(input.url, {
				redirect: "manual",
				signal: input.signal,
				headers: { "Accept-Encoding": "identity" }
			}), input.maxResponseBytes),
			connectedAddress: null
		};
	} };
}
function isCloudflareWorkersRuntime() {
	return typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers");
}
function limitResponseBody(response, maxBytes) {
	if (!response.body) return response;
	let received = 0;
	const body = response.body.pipeThrough(new TransformStream({ transform(chunk, controller) {
		received += chunk.byteLength;
		if (received > maxBytes) {
			controller.error(/* @__PURE__ */ new RangeError("Registry artifact response exceeds its byte limit"));
			return;
		}
		controller.enqueue(chunk);
	} }));
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
}
async function createNodeRegistryArtifactTransport(nodeRequest) {
	const request = nodeRequest ?? (await import("node:https")).request;
	return { async fetch(input) {
		let lastError;
		for (const address of input.allowedAddresses) try {
			return {
				response: await new Promise((resolve, reject) => {
					const chunks = [];
					let total = 0;
					const req = request({
						protocol: "https:",
						hostname: stripIpv6Brackets(input.url.hostname),
						port: parseHttpsPort(input.url),
						path: `${input.url.pathname}${input.url.search}`,
						method: "GET",
						agent: false,
						headers: {
							Host: input.url.host,
							Connection: "close",
							"Accept-Encoding": "identity"
						},
						lookup: (_hostname, options, callback) => {
							const family = address.includes(":") ? 6 : 4;
							if (options.all) callback(null, [{
								address,
								family
							}]);
							else callback(null, address, family);
						},
						signal: input.signal
					}, (upstream) => {
						const contentEncoding = upstream.headers["content-encoding"];
						if (contentEncoding && contentEncoding.toLowerCase() !== "identity") {
							upstream.destroy(/* @__PURE__ */ new Error("Registry artifact response content encoding is unsupported"));
							return;
						}
						upstream.on("data", (chunk) => {
							total += chunk.byteLength;
							if (total > input.maxResponseBytes) {
								upstream.destroy(/* @__PURE__ */ new RangeError("Registry artifact response exceeds its byte limit"));
								return;
							}
							chunks.push(new Uint8Array(chunk));
						});
						upstream.once("error", reject);
						upstream.once("end", () => {
							const bytes = concatBytes(chunks, total);
							const headers = new Headers();
							for (let index = 0; index < upstream.rawHeaders.length; index += 2) headers.append(upstream.rawHeaders[index], upstream.rawHeaders[index + 1]);
							resolve(parsedResponseToWebResponse({
								status: upstream.statusCode ?? 502,
								headers,
								body: bytes
							}));
						});
					});
					req.once("error", reject);
					req.end();
				}),
				connectedAddress: address
			};
		} catch (error) {
			if (input.signal.aborted) throw error;
			lastError = error;
		}
		throw new Error("Registry artifact transport could not connect to an approved address", { cause: lastError });
	} };
}
function parsedResponseToWebResponse(parsed) {
	const bodyAllowed = ![
		204,
		205,
		304
	].includes(parsed.status);
	let body = null;
	if (bodyAllowed) {
		body = new ArrayBuffer(parsed.body.byteLength);
		new Uint8Array(body).set(parsed.body);
	}
	return new Response(body, {
		status: parsed.status,
		headers: parsed.headers
	});
}
function concatBytes(chunks, total) {
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return bytes;
}
function parseHttpsPort(url) {
	const port = url.port === "" ? 443 : Number(url.port);
	if (!Number.isSafeInteger(port) || port < 1 || port > 65535) throw new TypeError("Registry artifact HTTPS port is invalid");
	return port;
}
function stripIpv6Brackets(hostname) {
	return hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
}
export { resolvePublisherPdsEndpoint as a, verificationError as c, recordScopedImageCacheUrl as i, verifyMultihash as l, fetchReleaseArtifact as n, computeArtifactDigestCandidates as o, fetchVerifiedResource as r, multihashFromBlobCid as s, fetchRegistryArtifactUrl as t };
