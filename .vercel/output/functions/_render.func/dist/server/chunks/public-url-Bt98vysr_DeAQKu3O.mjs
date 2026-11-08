// node_modules/emdash/dist/public-url-Bt98vysr.mjs
/**
* Resolve siteUrl from runtime environment variables.
*
* Uses process.env (not import.meta.env) because Vite statically replaces
* import.meta.env at build time, baking out any env vars not present during
* the build. Container deployments set env vars at runtime, so we must read
* process.env which Vite leaves untouched.
*
* On Cloudflare Workers process.env is empty by default, so the fallback
* chain continues to url.origin — unless the Worker enables the
* `nodejs_compat_populate_process_env` compatibility flag, in which case
* `vars`/secrets (e.g. EMDASH_SITE_URL) are readable here too.
*
* Caches after first call.
*/
var _envSiteUrl = null;
function getEnvSiteUrl() {
	if (_envSiteUrl !== null) return _envSiteUrl || void 0;
	try {
		const value = typeof process !== "undefined" && process.env?.EMDASH_SITE_URL || typeof process !== "undefined" && process.env?.SITE_URL || "";
		if (value) {
			const parsed = new URL(value);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
				_envSiteUrl = "";
				return;
			}
			_envSiteUrl = parsed.origin;
		} else _envSiteUrl = "";
	} catch {
		_envSiteUrl = "";
	}
	return _envSiteUrl || void 0;
}
/**
* Return the public-facing origin for the site.
*
* Resolution order:
*   1. `config.siteUrl` (set in astro.config.mjs, origin-normalized at startup)
*   2. `EMDASH_SITE_URL` or `SITE_URL` env var (resolved at runtime for containers)
*   3. `url.origin` (internal request URL — correct when no proxy)
*
* @param url  The request URL (`new URL(request.url)` or `Astro.url`)
* @param config  The EmDash config (from `locals.emdash?.config`)
* @returns Origin string, e.g. `"https://mysite.example.com"`
*/
function getPublicOrigin(url, config) {
	return getConfiguredOrigin(config) || url.origin;
}
/**
* Return the operator-configured public origin, if any.
*
* The first two steps of {@link getPublicOrigin}'s resolution —
* `config.siteUrl`, then the `EMDASH_SITE_URL`/`SITE_URL` env vars — without
* the request-URL fallback. For callers that have a more trustworthy fallback
* than the request (e.g. the stored setup origin used for outbound emails).
*/
function getConfiguredOrigin(config) {
	return config?.siteUrl || getEnvSiteUrl() || void 0;
}
/**
* Resolve additional accepted passkey origins from runtime environment.
*
* Reads `EMDASH_ALLOWED_ORIGINS` (comma-separated list of origins) for
* multi-origin deployments where the same RP is reachable under several
* hostnames sharing the registrable parent domain (e.g. apex + preview).
*
* Each entry is parsed via `new URL()` and reduced to its `origin`. Unlike
* `getEnvSiteUrl` (which silently falls back to `url.origin` on bad input),
* this throws on any unparseable or non-http(s) entry — `EMDASH_ALLOWED_ORIGINS`
* is an allowlist for passkey verification, so silently dropping a typo would
* surface as "I can't authenticate on this origin" with no diagnostic. Fail
* loud at first read.
*
* Uses `process.env` (Vite leaves it untouched at runtime). Result is cached
* on success.
*/
var _envAllowedOrigins = null;
function getEnvAllowedOrigins() {
	if (_envAllowedOrigins !== null) return _envAllowedOrigins;
	const raw = typeof process !== "undefined" ? process.env?.EMDASH_ALLOWED_ORIGINS || "" : "";
	const parsed = [];
	for (const entry of raw.split(",")) {
		const trimmed = entry.trim();
		if (!trimmed) continue;
		let u;
		try {
			u = new URL(trimmed);
		} catch (e) {
			throw new Error(`EmDash config error in EMDASH_ALLOWED_ORIGINS: invalid URL: "${trimmed}"`, { cause: e });
		}
		if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error(`EmDash config error in EMDASH_ALLOWED_ORIGINS: origin must be http or https: "${trimmed}" (got ${u.protocol})`);
		parsed.push(u.origin);
	}
	_envAllowedOrigins = parsed;
	return parsed;
}
export { getEnvAllowedOrigins as n, getPublicOrigin as r, getConfiguredOrigin as t };
