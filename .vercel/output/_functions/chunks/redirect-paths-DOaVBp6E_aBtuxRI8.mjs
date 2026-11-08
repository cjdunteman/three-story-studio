// node_modules/emdash/dist/redirect-paths-DOaVBp6E.mjs
function toggledTrailingSlash(path) {
	if (path.length <= 1) return null;
	return path.endsWith("/") ? path.slice(0, -1) : `${path}/`;
}
/**
* Build cache-invalidation specs for one or more redirect source paths.
* Returns each path with and without a trailing slash, deduplicated.
*/
function redirectSourceCachePaths(...sources) {
	const paths = /* @__PURE__ */ new Set();
	for (const source of sources) {
		if (!source) continue;
		paths.add(source);
		const alt = toggledTrailingSlash(source);
		if (alt) paths.add(alt);
	}
	return Array.from(paths, (path) => ({ path }));
}
/**
* Invalidate the edge cache for one or more redirect source paths.
* Failures are logged but not thrown: the redirect mutation has already
* been committed and should still return a successful response.
*/
async function invalidateRedirectSourcePaths(cache, ...sources) {
	if (!cache?.enabled) return;
	for (const spec of redirectSourceCachePaths(...sources)) try {
		await cache.invalidate(spec);
	} catch (error) {
		console.error(`[redirects] Failed to invalidate cache for ${spec.path}:`, error);
	}
}
export { invalidateRedirectSourcePaths as t };
