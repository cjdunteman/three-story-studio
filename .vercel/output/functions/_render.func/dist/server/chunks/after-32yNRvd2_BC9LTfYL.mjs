import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/dist/request-context.mjs
/**
* EmDash Request Context
*
* Uses AsyncLocalStorage to provide request-scoped state to query functions
* without requiring explicit parameter passing. The middleware wraps next()
* in als.run(), making the context available to all code during rendering.
*
* Middleware always wraps each request in a context so per-request
* metrics (db.*, cache.*) can be surfaced via Server-Timing. The cost is
* one ALS frame per request — sub-microsecond, negligible compared to
* any real work.
*
* The AsyncLocalStorage instance is stored on globalThis with a Symbol key
* to guarantee a singleton even when bundlers duplicate this module across
* code-split chunks. Without this, Rollup/Vite may inline the module into
* multiple chunks (e.g. middleware and page components), each with its own
* ALS instance — breaking request-scoped state propagation.
*/
function createRequestMetrics(start) {
	return {
		start,
		dbCount: 0,
		dbTotalMs: 0,
		dbFirstOffset: null,
		dbLastOffset: null,
		cacheHits: 0,
		cacheMisses: 0,
		rpcCount: 0
	};
}
var ALS_KEY = Symbol.for("emdash:request-context");
var storage = globalThis[ALS_KEY] ?? (() => {
	const als = new AsyncLocalStorage();
	globalThis[ALS_KEY] = als;
	return als;
})();
/**
* Run a function within an EmDash request context.
* Called by middleware to wrap next().
*/
function runWithContext(ctx, fn) {
	return storage.run(ctx, fn);
}
/**
* Get the current request context.
* Returns undefined if no context is set (logged-out fast path).
*/
function getRequestContext() {
	return storage.getStore();
}
// node_modules/emdash/dist/after-32yNRvd2.mjs
var DEFERRED_TASKS_KEY = Symbol.for("emdash:deferred-tasks");
var deferredTasks = globalThis[DEFERRED_TASKS_KEY] ?? (() => {
	const tasks = /* @__PURE__ */ new Set();
	globalThis[DEFERRED_TASKS_KEY] = tasks;
	return tasks;
})();
function trackDeferredTask(promise) {
	let tracked;
	tracked = promise.finally(() => deferredTasks.delete(tracked));
	deferredTasks.add(tracked);
	return tracked;
}
function createDeferredTaskTracker(onSettled) {
	let pending = 0;
	let responseSettled = false;
	let completed = false;
	let resolveSettled;
	const settled = new Promise((resolve) => {
		resolveSettled = resolve;
	});
	const completeIfSettled = () => {
		if (completed || !responseSettled || pending > 0) return;
		completed = true;
		try {
			onSettled();
		} finally {
			resolveSettled();
		}
	};
	return {
		settled,
		track(promise) {
			pending++;
			return promise.finally(() => {
				pending--;
				completeIfSettled();
			});
		},
		settle() {
			responseSettled = true;
			completeIfSettled();
		}
	};
}
/**
* Defer work past the HTTP response.
*
* Use for bookkeeping that doesn't need to complete before the client
* gets bytes — writes that record state, maintenance queries, cache
* refreshes. `after()` hands the promise to the host's lifetime
* extender when one is available (Cloudflare's `waitUntil` under
* workerd), or fires-and-forgets on Node (the process lives for the
* next request anyway).
*
* Host binding is resolved lazily via a dynamic import of the
* `virtual:emdash/wait-until` virtual module. Lazy — rather than a
* static top-level import — so tools that walk the dist in a plain
* Node loader (`astro check`, Vitest, etc.) don't trip over the
* `virtual:` scheme: they'd only fail if they actually called
* `after()`, which they don't during type-checking.
*/
var waitUntilReady = (async () => {
	try {
		return (await import("./wait-until_bIc_sNRQ.mjs")).waitUntil ?? null;
	} catch {
		return null;
	}
})();
waitUntilReady.catch(() => {});
/**
* Schedule `fn` to run without blocking the response.
*
* Errors are caught and logged — a deferred task should never surface
* as an unhandled rejection because the response is long gone. Callers
* that care about errors should handle them inside `fn`.
*/
function after(fn) {
	const task = Promise.resolve().then(fn).catch((error) => {
		console.error("[emdash] deferred task failed:", error);
	});
	const promise = trackDeferredTask(getRequestContext()?.deferredTasks?.track(task) ?? task);
	waitUntilReady.then((waitUntil) => {
		if (waitUntil) waitUntil(promise);
		return null;
	});
}
export { runWithContext as a, getRequestContext as i, createDeferredTaskTracker as n, createRequestMetrics as r, after as t };
