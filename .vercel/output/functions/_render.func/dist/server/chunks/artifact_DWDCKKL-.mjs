import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as coerceRegistryConfig, r as getRegistryConfigInput, s as validateAggregatorUrl } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { a as resolvePublisherPdsEndpoint, i as recordScopedImageCacheUrl, l as verifyMultihash, r as fetchVerifiedResource, s as multihashFromBlobCid, t as fetchRegistryArtifactUrl } from "./artifact-fetch-DIh7iyOV_BxFcsue5.mjs";
import { i as resolveAndValidateExternalUrlTarget } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { NSID, RECORD_SCOPED_BLOB_CACHE_TYPE } from "@emdash-cms/registry-lexicons";
import { evaluateRegistryReleaseWithdrawal } from "@emdash-cms/registry-client/withdrawal";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs
var artifact_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var SHA256_HEX_PATTERN = /^[0-9a-fA-F]{64}$/;
async function verifyRegistryArtifactChecksum(bytes, checksum) {
	if (SHA256_HEX_PATTERN.test(checksum)) {
		const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", Uint8Array.from(bytes)));
		return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("") === checksum.toLowerCase();
	}
	return (await verifyMultihash(bytes, checksum)).success;
}
/**
* Image content types the proxy will pass through. Anything else is rejected.
*
* SVG is deliberately excluded: it is active content (an `<svg><script>`
* executes when navigated to as a top-level document), and the publisher
* supplies the bytes. Rather than serve it behind mitigations, we refuse it
* end-to-end — the publish CLI rejects SVG artifacts too, so a conforming
* release never references one.
*/
var ALLOWED_IMAGE_TYPES = /* @__PURE__ */ new Set([
	"image/png",
	"image/jpeg",
	"image/webp"
]);
/** Artifact kinds the proxy can resolve. `screenshot` additionally needs `index`. */
var ALLOWED_KINDS = /* @__PURE__ */ new Set([
	"icon",
	"banner",
	"screenshot"
]);
/** Loose DID shape (`did:method:id`); the aggregator lexicon is authoritative. */
var DID_PATTERN = /^did:[a-z]+:.+/;
/** Slug grammar: ASCII letter then letters / digits / `-` / `_`. Mirrors the install route. */
var SLUG_PATTERN = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
var CID_PATTERN = /^b[a-z2-7]+$/;
/** Non-negative integer, for the screenshot index param. */
var INDEX_PATTERN = /^\d+$/;
/** Cap proxied images so a hostile host can't stream an unbounded body. */
var MAX_IMAGE_BYTES = 1048576;
/** Redirect hops to follow, re-validating each target against SSRF rules. */
var MAX_REDIRECTS = 5;
/** Wall-clock budget covering connect + headers + body for the artifact fetch. */
var FETCH_TIMEOUT_MS = 15e3;
/** Per-aggregator-request timeout and overall budget for release resolution. */
var AGGREGATOR_REQUEST_TIMEOUT_MS = 15e3;
var AGGREGATOR_TOTAL_BUDGET_MS = 3e4;
/** Bound the version search: 20 pages * 50 per page = 1000 releases worth. */
var MAX_LIST_PAGES = 20;
/** Build a fetch that enforces a per-request and per-budget timeout. Mirrors the install handler. */
function timedFetch(totalDeadline) {
	return (input, init) => {
		const remaining = Math.max(0, totalDeadline - Date.now());
		if (remaining === 0) return Promise.reject(/* @__PURE__ */ new Error("Aggregator request budget exhausted"));
		const timeout = Math.min(AGGREGATOR_REQUEST_TIMEOUT_MS, remaining);
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		const callerSignal = init?.signal;
		if (callerSignal) if (callerSignal.aborted) controller.abort(callerSignal.reason);
		else callerSignal.addEventListener("abort", () => controller.abort(callerSignal.reason));
		return fetch(input, {
			...init,
			signal: controller.signal
		}).finally(() => {
			clearTimeout(timer);
		});
	};
}
function declaredArtifact(value) {
	if (!value || typeof value !== "object") return null;
	const entry = value;
	const url = entry.url;
	const blob = entry.blob;
	const checksum = entry.checksum;
	const blobCid = objectProperty(objectProperty(blob, "ref"), "$link");
	const blobMimeType = objectProperty(blob, "mimeType");
	const blobSize = objectProperty(blob, "size");
	const hasUrl = typeof url === "string" && url.length > 0;
	const hasBlob = typeof blobCid === "string" && blobCid.length > 0 && typeof blobMimeType === "string" && Number.isSafeInteger(blobSize) && Number(blobSize) >= 0;
	if (!hasUrl && !hasBlob || typeof checksum !== "string" || checksum.length === 0) return null;
	return {
		...hasUrl ? { url } : {},
		...hasBlob ? { blob: {
			$type: "blob",
			ref: { $link: blobCid },
			mimeType: blobMimeType,
			size: Number(blobSize)
		} } : {},
		checksum,
		requiresAuth: entry.requiresAuth === true
	};
}
/**
* Resolve the declared artifact source for `(kind, index)` from a release's
* `artifacts` map. Returns `null` when the requested artifact isn't present
* or doesn't carry a usable URL.
*/
function resolveDeclaredArtifact(artifacts, kind, index) {
	if (!artifacts || typeof artifacts !== "object") return null;
	const map = artifacts;
	if (kind === "icon") return declaredArtifact(map.icon);
	if (kind === "banner") return declaredArtifact(map.banner);
	const screenshots = map.screenshots;
	if (!Array.isArray(screenshots)) return null;
	if (index < 0 || index >= screenshots.length) return null;
	return declaredArtifact(screenshots[index]);
}
function objectProperty(value, key) {
	if (!value || typeof value !== "object") return void 0;
	return Object.getOwnPropertyDescriptor(value, key)?.value;
}
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const did = url.searchParams.get("did");
	const slug = url.searchParams.get("slug");
	const cid = url.searchParams.get("cid");
	const kind = url.searchParams.get("kind");
	const versionParam = url.searchParams.get("version");
	const indexParam = url.searchParams.get("index");
	if (!did || !slug || !cid || !kind) return apiError("INVALID_REQUEST", "Missing did, slug, cid, or kind", 400);
	if (did.length > 256 || !DID_PATTERN.test(did)) return apiError("INVALID_REQUEST", "Invalid did", 400);
	if (slug.length > 64 || !SLUG_PATTERN.test(slug)) return apiError("INVALID_REQUEST", "Invalid slug", 400);
	if (cid.length > 256 || !CID_PATTERN.test(cid)) return apiError("INVALID_REQUEST", "Invalid release CID", 400);
	if (!ALLOWED_KINDS.has(kind)) return apiError("INVALID_REQUEST", "Invalid kind", 400);
	let index = 0;
	if (kind === "screenshot") {
		if (indexParam === null) return apiError("INVALID_REQUEST", "Missing index for screenshot", 400);
		if (!INDEX_PATTERN.test(indexParam)) return apiError("INVALID_REQUEST", "Invalid index", 400);
		index = Number(indexParam);
		if (!Number.isSafeInteger(index)) return apiError("INVALID_REQUEST", "Invalid index", 400);
	}
	let version;
	if (versionParam !== null && versionParam.length > 0) {
		if (versionParam.length > 64) return apiError("INVALID_REQUEST", "Invalid version", 400);
		version = versionParam;
	}
	const registryConfig = coerceRegistryConfig(getRegistryConfigInput(emdash.config.registry));
	if (!registryConfig) return apiError("REGISTRY_NOT_CONFIGURED", "Registry is not configured", 400);
	try {
		validateAggregatorUrl(registryConfig.aggregatorUrl);
	} catch {
		return apiError("REGISTRY_NOT_CONFIGURED", "Registry aggregator URL is invalid", 500);
	}
	let resolvedArtifact;
	try {
		const resolved = await resolveArtifact(registryConfig, did, slug, version, cid, kind, index);
		if (resolved === null) return apiError("ARTIFACT_NOT_FOUND", "Artifact not found", 404);
		resolvedArtifact = resolved;
	} catch {
		return apiError("ARTIFACT_RESOLVE_FAILED", "Failed to resolve artifact", 502);
	}
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		const fetchOptions = proxyFetchOptions(controller.signal);
		let bytes;
		let headers;
		let checksumValid;
		if (resolvedArtifact.imageCacheUrl) {
			const transformed = await fetchVerifiedResource(resolvedArtifact.imageCacheUrl, fetchOptions);
			if (transformed.success) {
				bytes = transformed.value.bytes;
				headers = transformed.value.headers;
			}
		}
		if (!bytes || !headers) {
			const raw = await fetchRawArtifact(resolvedArtifact, fetchOptions);
			if (!raw.success) return artifactFetchError(raw.code);
			bytes = raw.bytes;
			headers = raw.headers;
			checksumValid = raw.checksumValid;
		}
		const contentType = (headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
		if (!ALLOWED_IMAGE_TYPES.has(contentType)) return apiError("ARTIFACT_NOT_IMAGE", "Artifact is not an allowed image type", 415);
		const declaredLength = headers.get("content-length");
		if (declaredLength) {
			const declared = Number(declaredLength);
			if (Number.isFinite(declared) && declared > MAX_IMAGE_BYTES) return apiError("ARTIFACT_TOO_LARGE", "Artifact exceeds size limit", 413);
		}
		if (checksumValid === false) return artifactFetchError("CHECKSUM_MISMATCH");
		return new Response(bytes, { headers: {
			"Content-Type": contentType,
			"Cache-Control": "private, no-store",
			"X-Content-Type-Options": "nosniff",
			"Content-Disposition": "attachment",
			"Content-Security-Policy": "default-src 'none'; sandbox"
		} });
	} catch {
		return apiError("ARTIFACT_FETCH_FAILED", "Failed to fetch artifact", 502);
	} finally {
		clearTimeout(timer);
	}
};
/**
* Resolve the declared artifact URL for `(did, slug, version, kind, index)`
* from the aggregator's release record. Mirrors the install handler's release
* lookup. Returns `null` when the package/release/artifact isn't found.
*
* Self-contained to this route: the install/update handlers are intentionally
* left untouched, so a small amount of resolution-pattern duplication is
* accepted here.
*/
async function resolveArtifact(registryConfig, did, slug, version, cid, kind, index) {
	const { DiscoveryClient, registryLabelerPolicy } = await import("@emdash-cms/registry-client/discovery");
	const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
	const discovery = new DiscoveryClient({
		aggregatorUrl: registryConfig.aggregatorUrl,
		acceptLabelers: registryConfig.acceptLabelers,
		labelerPolicy: registryLabelerPolicy(registryConfig.acceptLabelers),
		fetch: timedFetch(aggregatorDeadline)
	});
	const publisherDid = did;
	const releaseView = await (async () => {
		if (!version) return discovery.getLatestRelease({
			did: publisherDid,
			package: slug
		});
		let cursor;
		const seenCursors = /* @__PURE__ */ new Set();
		for (let page = 0; page < MAX_LIST_PAGES; page++) {
			if (cursor !== void 0) {
				if (seenCursors.has(cursor)) break;
				seenCursors.add(cursor);
			}
			const result = await discovery.listReleases({
				did: publisherDid,
				package: slug,
				cursor,
				limit: 50
			});
			for (const r of result.releases) if (r.version === version) return r;
			if (!result.cursor) break;
			cursor = result.cursor;
		}
	})();
	if (!releaseView?.release || releaseView.cid !== cid || releaseView.did !== publisherDid || releaseView.package !== slug || version !== void 0 && releaseView.version !== version || releaseView.release.package !== slug || releaseView.release.version !== releaseView.version) return null;
	if (evaluateRegistryReleaseWithdrawal(releaseView, discovery.labelerPolicy).withdrawn) return null;
	const descriptor = resolveDeclaredArtifact(releaseView.release.artifacts, kind, index);
	if (!descriptor || descriptor.requiresAuth || releaseView.release.auth !== void 0) return null;
	const blobCid = descriptor.blob?.ref.$link;
	let imageCacheUrl;
	if (blobCid) {
		const expected = multihashFromBlobCid(blobCid);
		if (!expected.success || expected.value !== descriptor.checksum) return null;
		const rkey = `${slug}:${releaseView.version}`;
		const serviceEndpoint = releaseView.artifactCaches.map(recordScopedCacheEndpoint).find((value) => value !== null);
		if (serviceEndpoint) {
			const cacheUrl = recordScopedImageCacheUrl(serviceEndpoint, kind === "icon" ? "avatar" : kind === "banner" ? "banner" : "feed_fullsize", {
				did,
				collection: NSID.packageRelease,
				rkey,
				cid: releaseView.cid
			}, blobCid);
			if (!cacheUrl.success) return null;
			imageCacheUrl = cacheUrl.value;
		}
	}
	return {
		artifact: descriptor,
		record: {
			did,
			collection: NSID.packageRelease,
			rkey: `${slug}:${releaseView.version}`,
			cid: releaseView.cid
		},
		...imageCacheUrl ? { imageCacheUrl } : {}
	};
}
function recordScopedCacheEndpoint(value) {
	if (objectProperty(value, "$type") !== RECORD_SCOPED_BLOB_CACHE_TYPE) return null;
	const endpoint = objectProperty(value, "serviceEndpoint");
	return typeof endpoint === "string" ? endpoint : null;
}
/** Build bounded, SSRF-validated fetch options for cache, PDS, and URL sources. */
function proxyFetchOptions(signal) {
	return {
		fetch: async (url, init) => fetchRegistryArtifactUrl(url.href, {
			signal: init.signal instanceof AbortSignal ? init.signal : signal,
			maxResponseBytes: MAX_IMAGE_BYTES
		}),
		resolveHostname: async (hostname) => (await resolveAndValidateExternalUrlTarget(`https://${hostname}/`)).addresses,
		allowHttpLocalhost: false,
		maxBytes: MAX_IMAGE_BYTES,
		maxRedirects: MAX_REDIRECTS,
		totalTimeoutMs: FETCH_TIMEOUT_MS
	};
}
async function fetchRawArtifact(resolved, options) {
	const urls = [];
	const blobCid = resolved.artifact.blob?.ref.$link;
	let lastCode = "FETCH_FAILED";
	let checksumMismatch;
	if (blobCid) {
		const pds = await resolvePublisherPdsEndpoint(resolved.record.did, options);
		if (pds.success) {
			const url = new URL("/xrpc/com.atproto.sync.getBlob", pds.value);
			url.searchParams.set("did", resolved.record.did);
			url.searchParams.set("cid", blobCid);
			urls.push(url);
		} else lastCode = pds.error.code;
	}
	if (resolved.artifact.url) urls.push(new URL(resolved.artifact.url));
	for (const url of urls) {
		const fetched = await fetchVerifiedResource(url, options);
		if (!fetched.success) {
			lastCode = fetched.error.code;
			continue;
		}
		if (!await verifyRegistryArtifactChecksum(fetched.value.bytes, resolved.artifact.checksum)) {
			lastCode = "CHECKSUM_MISMATCH";
			checksumMismatch = {
				bytes: fetched.value.bytes,
				headers: fetched.value.headers
			};
			continue;
		}
		return {
			success: true,
			bytes: fetched.value.bytes,
			headers: fetched.value.headers,
			checksumValid: true
		};
	}
	if (checksumMismatch) return {
		success: true,
		...checksumMismatch,
		checksumValid: false
	};
	return {
		success: false,
		code: lastCode
	};
}
function artifactFetchError(code) {
	if (code === "CHECKSUM_MISMATCH") return apiError("ARTIFACT_CHECKSUM_MISMATCH", "Artifact bytes do not match the approved release record", 502);
	if (code === "RESOURCE_SIZE_EXCEEDED") return apiError("ARTIFACT_TOO_LARGE", "Artifact exceeds size limit", 413);
	if (code === "HOST_REJECTED" || code === "INVALID_URL") return apiError("ARTIFACT_URL_REJECTED", "Artifact URL is not allowed", 400);
	return apiError("ARTIFACT_FETCH_FAILED", "Failed to fetch artifact", 502);
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact@_@mjs
var page = () => artifact_exports;
export { page };
