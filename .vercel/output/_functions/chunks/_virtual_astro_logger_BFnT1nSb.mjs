// node_modules/astro/dist/core/render-scope/scope.js
/**
* The channel is a write-once immutable *conduit* shared so every compiled copy
* of this module resolves the same AsyncLocalStorage instance (the prerender
* runtime is bundled, so the build orchestrator and the bundled runtime hold
* different module instances of this file); all mutable per-render state lives
* in stores reachable only through async execution context. Never installed in
* dev or production SSR runtimes. It holds no state, so it stays installed across builds.
*/
var SCOPE_KEY = Symbol.for("astro:render-scope");
/** The installed render scope, or `undefined` when none was installed. */
function getInstalledRenderScope() {
	return globalThis[SCOPE_KEY];
}
/** The current render's collectors store, or `undefined` when not collecting. */
function getRenderCollectors() {
	return getInstalledRenderScope()?.getStore();
}
// node_modules/astro/dist/core/render-scope/record.js
/**
* Records that a content entry was rendered, keyed by its root-relative
* `filePath`. No-op outside of a collecting render (dev, production SSR,
* module top-level).
*/
function recordContentEntryRender(filePath) {
	if (!filePath) return;
	getRenderCollectors()?.contentEntries?.add(filePath);
}
function isCollectingStaticImages() {
	return getRenderCollectors()?.staticImages !== void 0;
}
/** Keeps repeats; `collectPrerenderMetadata()` dedupes them. */
function recordStaticImage(image) {
	getRenderCollectors()?.staticImages?.push(image);
}
// \0virtual:astro:logger
var level = "info";
export { recordStaticImage as i, isCollectingStaticImages as n, recordContentEntryRender as r, level as t };
