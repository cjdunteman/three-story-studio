import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { r as getRegistryConfigInput } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { isHandle } from "@atcute/lexicons/syntax";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs
var publisher_handle_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var PLC_DIRECTORY_URL = "https://plc.directory";
var DOH_URL = "https://cloudflare-dns.com/dns-query";
var DIRECTORY_ORIGINS = /* @__PURE__ */ new Set([PLC_DIRECTORY_URL, new URL(DOH_URL).origin]);
var PLC_DID_PATTERN = /^did:plc:[a-z2-7]{24}$/;
var WEB_DID_PREFIX = "did:web:";
var HANDLE_URI_PREFIX = "at://";
/** Covers the DID document plus the DNS and HTTPS handle checks. */
var LOOKUP_TIMEOUT_MS = 8e3;
/** Far above any legitimate DID document, DoH answer, or well-known body. */
var MAX_RESPONSE_BYTES = 65536;
/**
* What `resolveAndValidateExternalUrl` throws when DNS returns no A or AAAA
* records, NXDOMAIN included. It is the only `SsrfError` that describes the
* host rather than a refusal to contact it.
*/
var NO_ADDRESSES_MESSAGE = "Hostname resolved to no addresses";
/**
* Conclusive results are shared across requests in this isolate. The admin
* keeps its own 24-hour copy per browser, so this layer only absorbs repeat
* lookups from other admins and page loads; a short TTL keeps it from
* stretching how long a changed or broken handle keeps its old status.
*/
var CACHE_TTL_MS = 36e5;
var CACHE_MAX_ENTRIES = 500;
var CACHE_KEY = Symbol.for("emdash.registry.publisherHandles");
function resolutionCache() {
	const holder = globalThis;
	holder[CACHE_KEY] ??= /* @__PURE__ */ new Map();
	return holder[CACHE_KEY];
}
function isPlcDid(value) {
	return PLC_DID_PATTERN.test(value);
}
/** atproto only uses hostname-level `did:web` identifiers. */
function isWebDid(value) {
	if (!value.startsWith(WEB_DID_PREFIX)) return false;
	const host = value.slice(8);
	return host === host.toLowerCase() && isHandle(host);
}
function isPublisherDid(value) {
	return isPlcDid(value) || isWebDid(value);
}
/**
* Resolve a publisher DID to its verified handle.
*
* Returns `null` when the outcome is indeterminate (network failure, timeout,
* unexpected response); the caller should retry later rather than treat the
* publisher as broken.
*/
async function resolvePublisherHandle(did) {
	const cache = resolutionCache();
	const cached = cache.get(did);
	if (cached && cached.expiresAt > Date.now()) return cached.resolution;
	cache.delete(did);
	const resolution = await lookUpPublisherHandle(did);
	if (resolution) {
		if (cache.size >= CACHE_MAX_ENTRIES) {
			const oldest = cache.keys().next();
			if (!oldest.done) cache.delete(oldest.value);
		}
		cache.set(did, {
			resolution,
			expiresAt: Date.now() + CACHE_TTL_MS
		});
	}
	return resolution;
}
async function lookUpPublisherHandle(did) {
	if (!isPublisherDid(did)) return null;
	const identity = await import("@atcute/identity-resolver");
	const deadline = AbortSignal.timeout(LOOKUP_TIMEOUT_MS);
	const fetch = boundedFetch(deadline);
	let alsoKnownAs;
	try {
		alsoKnownAs = (isPlcDid(did) ? await new identity.PlcDidDocumentResolver({
			apiUrl: PLC_DIRECTORY_URL,
			fetch
		}).resolve(did, { signal: deadline }) : await new identity.AtprotoWebDidDocumentResolver({ fetch }).resolve(did, { signal: deadline })).alsoKnownAs;
	} catch (error) {
		if (error instanceof identity.DocumentNotFoundError) return { status: "missing" };
		console.warn(`[registry] DID document lookup failed for ${did}:`, error);
		return null;
	}
	const claimed = claimedHandle(alsoKnownAs);
	if (claimed === null) return { status: "missing" };
	if (claimed === void 0) return { status: "invalid" };
	const lookup = await resolveHandleDid([new identity.DohJsonHandleResolver({
		dohUrl: DOH_URL,
		fetch
	}), new identity.WellKnownHandleResolver({ fetch })], claimed, deadline, (error) => error instanceof identity.DidNotFoundError || error instanceof identity.InvalidResolvedHandleError || error instanceof identity.AmbiguousHandleError);
	if (lookup === "failed") {
		console.warn(`[registry] handle lookup failed for ${claimed} (${did})`);
		return null;
	}
	if (lookup === "not-found" || lookup.did !== did) return { status: "invalid" };
	return {
		status: "ok",
		handle: claimed
	};
}
/**
* The first `at://` entry is the claimed handle, as in `@atcute/identity`'s
* `getAtprotoHandle`: `null` when none is claimed, `undefined` when the claim
* is not a valid handle.
*/
function claimedHandle(alsoKnownAs) {
	const entry = alsoKnownAs?.find((value) => value.startsWith(HANDLE_URI_PREFIX));
	if (entry === void 0) return null;
	const handle = entry.slice(5).toLowerCase();
	return isHandle(handle) ? handle : void 0;
}
/**
* Race the DNS and HTTPS methods like atcute's `CompositeHandleResolver`: the
* first DID either method returns wins. Unlike it, a lookup where every method
* failed reports whether all of them failed conclusively (no record, no valid
* DID), so a network error or timeout is never mistaken for a broken handle.
*/
function resolveHandleDid(resolvers, handle, deadline, isConclusive) {
	return new Promise((resolve) => {
		const controller = new AbortController();
		const settle = (lookup) => {
			deadline.removeEventListener("abort", onDeadline);
			controller.abort();
			resolve(lookup);
		};
		function onDeadline() {
			settle("failed");
		}
		if (deadline.aborted) return settle("failed");
		deadline.addEventListener("abort", onDeadline, { once: true });
		let pending = resolvers.length;
		let conclusive = true;
		for (const resolver of resolvers) resolver.resolve(handle, { signal: controller.signal }).then((did) => settle({ did }), (error) => {
			if (!isConclusive(error)) conclusive = false;
			pending -= 1;
			if (pending === 0) settle(conclusive ? "not-found" : "failed");
		});
	});
}
/**
* `fetch` for the atcute resolvers: HTTPS only, no credentials, no redirects,
* a shared deadline, and a response size cap. Only the `accept` header the
* resolvers set is forwarded.
*
* A publisher host with no DNS addresses answers as a 404, which atcute reads
* as "no DID here" (a lapsed handle domain, a did:web host that is gone). A
* host the SSRF policy refuses still throws: it was never asked, so the
* lookup stays indeterminate.
*/
function boundedFetch(deadline) {
	return async (input, init) => {
		const url = new URL(input instanceof Request ? input.url : input);
		if (url.protocol !== "https:" || url.username || url.password) throw new TypeError("Identity lookups require an HTTPS URL without credentials");
		if (!DIRECTORY_ORIGINS.has(url.origin)) try {
			await resolveAndValidateExternalUrl(url.href);
		} catch (error) {
			if (error instanceof SsrfError && error.message === NO_ADDRESSES_MESSAGE) return new Response(null, { status: 404 });
			throw error;
		}
		const accept = new Headers(init?.headers).get("accept");
		return limitResponseBody(await globalThis.fetch(url, {
			method: "GET",
			headers: accept ? { accept } : {},
			redirect: "manual",
			signal: init?.signal ? AbortSignal.any([init.signal, deadline]) : deadline
		}), MAX_RESPONSE_BYTES);
	};
}
function limitResponseBody(response, maxBytes) {
	if (!response.body) return response;
	let received = 0;
	const body = response.body.pipeThrough(new TransformStream({ transform(chunk, controller) {
		received += chunk.byteLength;
		if (received > maxBytes) {
			controller.error(/* @__PURE__ */ new RangeError("Identity response exceeds its size limit"));
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
var MAX_DID_LENGTH = 256;
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	if (!getRegistryConfigInput(emdash.config.registry)) return apiError("REGISTRY_NOT_CONFIGURED", "Registry is not configured", 400);
	const did = url.searchParams.get("did");
	if (!did || did.length > MAX_DID_LENGTH || !isPublisherDid(did)) return apiError("INVALID_REQUEST", "Invalid did", 400);
	try {
		const resolution = await resolvePublisherHandle(did);
		if (!resolution) return apiError("HANDLE_RESOLUTION_FAILED", "The publisher handle could not be resolved", 502);
		return apiSuccess(resolution);
	} catch (error) {
		return handleError(error, "Failed to resolve publisher handle", "HANDLE_RESOLUTION_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle@_@mjs
var page = () => publisher_handle_exports;
export { page };
