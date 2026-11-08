// node_modules/emdash/dist/email-console-FFVJWb9N.mjs
/**
* In-memory store for dev emails.
* Uses globalThis so the same array is shared across Vite SSR module
* instances (the runtime and the route handler may load separate copies
* of this module, but globalThis is always the same object).
*/
var GLOBAL_KEY = Symbol.for("emdash:dev-emails");
var g = globalThis;
(() => {
	const existing = g[GLOBAL_KEY];
	if (existing) return existing;
	const fresh = [];
	g[GLOBAL_KEY] = fresh;
	return fresh;
})();
export {};
