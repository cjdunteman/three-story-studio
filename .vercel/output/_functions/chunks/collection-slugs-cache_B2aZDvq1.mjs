import "./request-cache_CXFiINQX.mjs";
import { m as invalidateSingleFlightCache, p as createSingleFlightCache } from "./loader_Btw7VAs7.mjs";
// node_modules/emdash/src/schema/collection-slugs-cache.ts
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
/**
* Drop the cached slug set so the next reader re-fetches. Called from every
* schema-mutation path (`invalidateUrlPatternCache`, `SchemaRegistry`
* create/delete). Other isolates converge through bounded revalidation.
*/
function resetRegisteredCollectionsCache() {
	invalidateSingleFlightCache(holder.cache);
	holder.fetchedAt = 0;
}
export { resetRegisteredCollectionsCache as t };
