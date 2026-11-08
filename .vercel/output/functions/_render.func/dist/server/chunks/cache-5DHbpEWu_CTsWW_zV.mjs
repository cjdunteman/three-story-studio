import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { n as invalidateSingleFlightCache, r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-D0EaGbN1_BgL4u_IC.mjs";
import { i as matchPattern, n as interpolateDestination, o as validatePattern, t as compilePattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
// node_modules/emdash/dist/cache-5DHbpEWu.mjs
/**
* Redirect rule cache.
*
* Worker-isolate cache for enabled redirect rules. The middleware populates
* this on first request; route handlers invalidate it on writes. Cached rules
* are revalidated after they expire so writes handled by another isolate
* become visible here too.
*
* A cold isolate loads the rules from its source and waits for them. Once
* warm, requests never wait: an expired cache keeps serving while one
* background revalidation asks the source whether the loaded version is still
* current and reloads only when it is not. A caller that must not act on stale
* rules asks for them to be verified, and waits for that check.
*
* This module deliberately has NO Astro imports so it can be safely imported
* from handlers, seed, CLI, and tests without dragging in `astro:middleware`.
*/
var cache_exports = /* @__PURE__ */ __exportAll({
	invalidateRedirectCache: () => invalidateRedirectCache,
	loadCachedRedirects: () => loadCachedRedirects,
	matchCachedPatterns: () => matchCachedPatterns
});
var REDIRECT_CACHE_TTL_MS = 3e4;
var REDIRECT_CACHE_MAX_REFRESH_ATTEMPTS = 3;
var REDIRECT_CACHE_KEY = Symbol.for("emdash:redirect-cache");
var g = globalThis;
var cacheState = g[REDIRECT_CACHE_KEY] ?? (() => {
	const state = {
		redirects: null,
		expiresAt: 0,
		generation: 0,
		refresh: createSingleFlightCache(),
		revalidatingUntil: 0
	};
	g[REDIRECT_CACHE_KEY] = state;
	return state;
})();
/**
* Invalidate the cached redirects (both exact and pattern).
* Call when redirects are created, updated, or deleted.
*/
function invalidateRedirectCache() {
	cacheState.generation++;
	cacheState.redirects = null;
	cacheState.expiresAt = 0;
	cacheState.revalidatingUntil = 0;
	invalidateSingleFlightCache(cacheState.refresh);
}
/** Compile a rule set into the in-memory lookup structures. */
function compileRedirects(rules) {
	const exact = /* @__PURE__ */ new Map();
	for (const rule of rules.exact) exact.set(rule.source, rule);
	const patterns = [];
	for (const rule of rules.patterns) {
		const patternError = validatePattern(rule.source);
		if (patternError) {
			console.warn(`[emdash:redirects] Skipping redirect ${rule.id}: ${patternError}`);
			continue;
		}
		patterns.push({
			redirect: rule,
			compiled: compilePattern(rule.source)
		});
	}
	return {
		version: rules.version,
		exact,
		patterns
	};
}
function installCachedRedirects(redirects) {
	cacheState.redirects = redirects;
	cacheState.expiresAt = Date.now() + REDIRECT_CACHE_TTL_MS;
	return cacheState.redirects;
}
function revalidateInBackground(source, cached) {
	const now = Date.now();
	if (cacheState.revalidatingUntil > now) return;
	cacheState.revalidatingUntil = now + REDIRECT_CACHE_TTL_MS;
	const generation = cacheState.generation;
	after(async () => {
		try {
			if (cached.version !== null && await source.isCurrent(cached.version)) {
				if (generation === cacheState.generation) cacheState.expiresAt = Date.now() + REDIRECT_CACHE_TTL_MS;
				return;
			}
			const loaded = compileRedirects(await source.load());
			if (generation === cacheState.generation) installCachedRedirects(loaded);
		} catch (error) {
			console.error("[emdash:redirects] revalidating redirects failed:", error);
		}
	});
}
async function loadCachedRedirects(source, options = {}) {
	let verify = options.verify === true;
	for (let attempt = 0; attempt < REDIRECT_CACHE_MAX_REFRESH_ATTEMPTS; attempt++) {
		const cached = cacheState.redirects;
		if (cached && verify) {
			verify = false;
			let current;
			try {
				current = cached.version !== null && await source.isCurrent(cached.version);
			} catch (error) {
				console.error("[emdash:redirects] checking redirects are current failed:", error);
				return cached;
			}
			if (current) {
				if (cacheState.redirects === cached) cacheState.expiresAt = Date.now() + REDIRECT_CACHE_TTL_MS;
				return cached;
			}
			if (cacheState.redirects === cached) invalidateRedirectCache();
			continue;
		}
		if (cached) {
			if (Date.now() >= cacheState.expiresAt) revalidateInBackground(source, cached);
			return cached;
		}
		const generation = cacheState.generation;
		const loaded = await singleFlightCached(cacheState.refresh, async () => compileRedirects(await source.load()), {
			anchor: (promise) => after(() => promise),
			ownerTimeoutMs: 3e4
		});
		if (generation === cacheState.generation) return installCachedRedirects(loaded);
		if (attempt === 2) return loaded;
	}
	throw new Error("Redirect cache refresh exhausted without loading rules");
}
/**
* Match a path against the cached pattern rules.
* Returns the resolved destination and matching redirect, or null.
*/
function matchCachedPatterns(rules, pathname) {
	for (const { redirect, compiled } of rules) {
		const params = matchPattern(compiled, pathname);
		if (params) return {
			redirect,
			destination: interpolateDestination(redirect.destination, params)
		};
	}
	return null;
}
export { matchCachedPatterns as i, invalidateRedirectCache as n, loadCachedRedirects as r, cache_exports as t };
