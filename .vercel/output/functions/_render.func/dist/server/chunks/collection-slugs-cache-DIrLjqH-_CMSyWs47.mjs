import { i as getRequestContext, t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { n as invalidateSingleFlightCache, r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-D0EaGbN1_BgL4u_IC.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
// node_modules/emdash/dist/collection-slugs-cache-DIrLjqH-.mjs
var HOLDER_KEY = Symbol.for("emdash:collection-slugs@2");
var g = globalThis;
var holder = g[HOLDER_KEY] ?? (() => {
	const h = {
		cache: createSingleFlightCache(),
		fetchedAt: 0
	};
	g[HOLDER_KEY] = h;
	return h;
})();
var revalidateWindowMs = 6e4;
async function fetchSlugs(db) {
	const rows = await db.selectFrom("_emdash_collections").select("slug").execute();
	return new Set(rows.map((row) => row.slug));
}
function loadSlugs(db) {
	return singleFlightCached(holder.cache, async () => {
		const slugs = await fetchSlugs(db);
		holder.fetchedAt = Date.now();
		return slugs;
	}, {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: 3e4
	});
}
/**
* Keep only the collections that have a `_emdash_collections` row, i.e. whose
* `ec_*` table the registry has created. When the filter would drop a
* collection and the cached set is older than the revalidation window, the
* set is re-fetched once so a collection created by another isolate becomes
* visible without waiting for an isolate recycle.
*/
async function filterToRegisteredCollections(db, collections) {
	if (collections.length === 0) return [];
	if (getRequestContext()?.dbIsIsolated === true) {
		const slugs = await requestCached("collection-slugs", () => fetchSlugs(db));
		return collections.filter((slug) => slugs.has(slug));
	}
	let slugs = await loadSlugs(db);
	let present = collections.filter((slug) => slugs.has(slug));
	if (present.length < collections.length && Date.now() - holder.fetchedAt > revalidateWindowMs) {
		holder.fetchedAt = Date.now();
		invalidateSingleFlightCache(holder.cache);
		slugs = await loadSlugs(db);
		present = collections.filter((slug) => slugs.has(slug));
	}
	return present;
}
/**
* Seed the cache with slugs an init-time read already fetched, so the first
* render on a cold isolate pays no extra query. Called by the runtime's
* auto-seed gate.
*/
function primeRegisteredCollections(slugs) {
	const { cache } = holder;
	cache.value = new Set(slugs);
	cache.hasValue = true;
	cache.valueVersion = cache.version;
	holder.fetchedAt = Date.now();
}
/**
* Drop the cached slug set so the next reader re-fetches. Called from every
* schema-mutation path (`invalidateUrlPatternCache`, `SchemaRegistry`
* create/delete). Other isolates converge through bounded revalidation.
*/
function resetRegisteredCollectionsCache() {
	invalidateSingleFlightCache(holder.cache);
	holder.fetchedAt = 0;
}
/**
* Note that a query hit a missing `ec_*` table despite the slug filter: the
* cached set is stale (the collection was deleted on another isolate) or the
* registry has drifted from the physical schema. Drops the cached set at most
* once per revalidation window, so the delete case converges like the create
* case while genuine drift costs one slug re-fetch per window instead of one
* per render.
*/
function noteStaleRegisteredCollections() {
	if (Date.now() - holder.fetchedAt > revalidateWindowMs) resetRegisteredCollectionsCache();
}
export { resetRegisteredCollectionsCache as i, noteStaleRegisteredCollections as n, primeRegisteredCollections as r, filterToRegisteredCollections as t };
