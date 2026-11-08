import { a as pluginManifestSchema$1, o as reconcileManifestAccess$1 } from "./manifest-schema-DNb4XmTS_BtxTt78k.mjs";
import { createGzipDecoder, unpackTar } from "modern-tar";
// node_modules/emdash/dist/marketplace-CqbgeIa7.mjs
/**
* MarketplaceClient — HTTP client for the EmDash Plugin Marketplace
*
* Used by the install/update/proxy endpoints in EmDash core to communicate
* with the marketplace Worker. The marketplace is a distribution channel,
* not a runtime dependency — bundles are copied to site-local R2 at install time.
*/
var TRAILING_SLASHES = /\/+$/;
var LEADING_DOT_SLASH = /^\.\//;
var MarketplaceError = class extends Error {
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = "MarketplaceError";
	}
};
var MarketplaceUnavailableError = class extends MarketplaceError {
	constructor(cause) {
		super("Plugin marketplace is unavailable", void 0, "MARKETPLACE_UNAVAILABLE");
		if (cause) this.cause = cause;
	}
};
var MAX_REDIRECTS = 5;
/**
* Fetches a marketplace URL, following redirects only while they stay on
* that URL's origin. Throws a `MarketplaceError` coded
* `${codePrefix}_REDIRECT_UNTRUSTED` or `${codePrefix}_TOO_MANY_REDIRECTS`.
*/
async function fetchWithinOrigin(url, label, codePrefix) {
	const origin = new URL(url).origin;
	let currentUrl = url;
	let response = await fetch(currentUrl, { redirect: "manual" });
	for (let i = 0; i < MAX_REDIRECTS; i++) {
		if (response.status < 300 || response.status >= 400) break;
		const location = response.headers.get("location");
		if (!location) break;
		const target = new URL(location, currentUrl);
		if (target.origin !== origin) throw new MarketplaceError(`${label} redirected to untrusted host: ${target.origin}`, response.status, `${codePrefix}_REDIRECT_UNTRUSTED`);
		currentUrl = target.href;
		response = await fetch(currentUrl, { redirect: "manual" });
	}
	if (response.status >= 300 && response.status < 400) throw new MarketplaceError(`${label} exceeded maximum redirects (${MAX_REDIRECTS})`, response.status, `${codePrefix}_TOO_MANY_REDIRECTS`);
	return response;
}
var MarketplaceClientImpl = class {
	baseUrl;
	siteOrigin;
	constructor(baseUrl, siteOrigin) {
		this.baseUrl = baseUrl.replace(TRAILING_SLASHES, "");
		this.siteOrigin = siteOrigin;
	}
	async search(query, opts) {
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		if (opts?.category) params.set("category", opts.category);
		if (opts?.capability) params.set("capability", opts.capability);
		if (opts?.sort) params.set("sort", opts.sort);
		if (opts?.cursor) params.set("cursor", opts.cursor);
		if (opts?.limit) params.set("limit", String(opts.limit));
		const qs = params.toString();
		const url = `${this.baseUrl}/api/v1/plugins${qs ? `?${qs}` : ""}`;
		return await this.fetchJson(url);
	}
	async getPlugin(id) {
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}`;
		return this.fetchJson(url);
	}
	async getVersions(id) {
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/versions`;
		return (await this.fetchJson(url)).items;
	}
	async downloadBundle(id, version) {
		const bundleUrl = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/versions/${encodeURIComponent(version)}/bundle`;
		let response;
		try {
			response = await fetchWithinOrigin(bundleUrl, "Bundle download", "BUNDLE");
		} catch (err) {
			if (err instanceof MarketplaceError) throw err;
			throw new MarketplaceUnavailableError(err);
		}
		if (!response.ok) throw new MarketplaceError(`Failed to download bundle: ${response.status} ${response.statusText}`, response.status, "BUNDLE_DOWNLOAD_FAILED");
		const tarballBytes = new Uint8Array(await response.arrayBuffer());
		try {
			return await extractBundle(tarballBytes);
		} catch (err) {
			if (err instanceof MarketplaceError) throw err;
			throw new MarketplaceError("Failed to extract plugin bundle", void 0, "BUNDLE_EXTRACT_FAILED");
		}
	}
	async reportInstall(id, version) {
		const siteHash = await generateSiteHash(this.siteOrigin);
		const url = `${this.baseUrl}/api/v1/plugins/${encodeURIComponent(id)}/installs`;
		try {
			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					siteHash,
					version
				})
			});
		} catch {}
	}
	async searchThemes(query, opts) {
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		if (opts?.keyword) params.set("keyword", opts.keyword);
		if (opts?.sort) params.set("sort", opts.sort);
		if (opts?.cursor) params.set("cursor", opts.cursor);
		if (opts?.limit) params.set("limit", String(opts.limit));
		const qs = params.toString();
		const url = `${this.baseUrl}/api/v1/themes${qs ? `?${qs}` : ""}`;
		return this.fetchJson(url);
	}
	async getTheme(id) {
		const url = `${this.baseUrl}/api/v1/themes/${encodeURIComponent(id)}`;
		return this.fetchJson(url);
	}
	async fetchJson(url) {
		let response;
		try {
			response = await fetch(url, { headers: { Accept: "application/json" } });
		} catch (err) {
			throw new MarketplaceUnavailableError(err);
		}
		if (!response.ok) {
			let errorMessage = `Marketplace request failed: ${response.status}`;
			try {
				const body = await response.json();
				if (body.error) errorMessage = body.error;
			} catch {}
			throw new MarketplaceError(errorMessage, response.status);
		}
		return await response.json();
	}
};
/**
* Extract manifest + code files from a tarball.
*
* The tarball is a gzipped tar archive containing:
* - manifest.json
* - backend.js
* - admin.js (optional)
*
* We use a minimal tar parser since we only need to read a few small files.
*/
/**
* Exported so the experimental registry install handler can reuse the
* same parse / validate / hash primitive. Despite the file name, this
* function predates the marketplace-vs-registry split and is generic
* over plugin bundle tarballs regardless of distribution channel.
*/
var MAX_DECOMPRESSED_BUNDLE_BYTES = 262144;
var MAX_BUNDLE_TAR_ENTRIES = 32;
async function extractBundle(tarballBytes) {
	const reader = new ReadableStream({ start(controller) {
		controller.enqueue(tarballBytes);
		controller.close();
	} }).pipeThrough(createGzipDecoder()).getReader();
	const chunks = [];
	let total = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		total += value.byteLength;
		if (total > MAX_DECOMPRESSED_BUNDLE_BYTES) {
			try {
				await reader.cancel();
			} catch {}
			throw new MarketplaceError(`Bundle decompressed size exceeds limit (${MAX_DECOMPRESSED_BUNDLE_BYTES} bytes)`, void 0, "INVALID_BUNDLE");
		}
		chunks.push(value);
	}
	const decompressedBytes = new Uint8Array(total);
	{
		let offset = 0;
		for (const chunk of chunks) {
			decompressedBytes.set(chunk, offset);
			offset += chunk.byteLength;
		}
	}
	const entries = await unpackTar(new ReadableStream({ start(controller) {
		controller.enqueue(decompressedBytes);
		controller.close();
	} }));
	if (entries.length > MAX_BUNDLE_TAR_ENTRIES) throw new MarketplaceError(`Bundle has too many tar entries (${entries.length} > ${MAX_BUNDLE_TAR_ENTRIES})`, void 0, "INVALID_BUNDLE");
	const decoder = new TextDecoder();
	const files = /* @__PURE__ */ new Map();
	for (const entry of entries) if (entry.data && entry.header.type === "file") {
		const name = entry.header.name.replace(LEADING_DOT_SLASH, "");
		files.set(name, decoder.decode(entry.data));
	}
	const manifestJson = files.get("manifest.json");
	const backendCode = files.get("backend.js");
	if (!manifestJson) throw new MarketplaceError("Invalid bundle: missing manifest.json", void 0, "INVALID_BUNDLE");
	if (!backendCode) throw new MarketplaceError("Invalid bundle: missing backend.js", void 0, "INVALID_BUNDLE");
	let manifest;
	try {
		const parsed = JSON.parse(manifestJson);
		const result = pluginManifestSchema$1.safeParse(parsed);
		if (!result.success) throw new MarketplaceError("Invalid bundle: manifest.json failed validation", void 0, "INVALID_BUNDLE");
		manifest = reconcileManifestAccess$1(result.data);
	} catch (err) {
		if (err instanceof MarketplaceError) throw err;
		throw new MarketplaceError("Invalid bundle: malformed manifest.json", void 0, "INVALID_BUNDLE");
	}
	const hashBuffer = await crypto.subtle.digest("SHA-256", tarballBytes);
	const hashArray = new Uint8Array(hashBuffer);
	const checksum = Array.from(hashArray, (b) => b.toString(16).padStart(2, "0")).join("");
	return {
		manifest,
		backendCode,
		adminCode: files.get("admin.js"),
		checksum
	};
}
/**
* Generate a stable non-identifying site hash from the site origin.
* The same origin always produces the same hash, so the marketplace
* installs table deduplicates correctly per (plugin_id, site_hash).
*/
async function generateSiteHash(siteOrigin) {
	const seed = siteOrigin ? `emdash-site:${siteOrigin}` : `emdash-anonymous`;
	try {
		const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(seed));
		const arr = new Uint8Array(hash);
		return Array.from(arr.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
	} catch {
		let h = 2166136261;
		for (let i = 0; i < seed.length; i++) {
			h ^= seed.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		const h2 = h ^ h >>> 16;
		return (h >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
	}
}
/**
* Create a MarketplaceClient for the given marketplace URL.
*
* @param baseUrl - The marketplace API base URL (e.g. "https://marketplace.emdashcms.com")
* @param siteOrigin - The origin of the EmDash site (e.g. "https://myblog.example.com").
*   Used to generate a stable, non-identifying site hash for install deduplication.
*/
function createMarketplaceClient(baseUrl, siteOrigin) {
	return new MarketplaceClientImpl(baseUrl, siteOrigin);
}
export { fetchWithinOrigin as i, MarketplaceUnavailableError as n, createMarketplaceClient as r, MarketplaceError as t };
