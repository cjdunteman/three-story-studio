import { n as initWithLock, t as createInitLock } from "./init-lock-BGmew3r1_D0B3IFfs.mjs";
// node_modules/emdash/dist/single-flight-cache-D0EaGbN1.mjs
/**
* Global-scope async value cache with single-flight and poison-immunity.
*
* Built for the "compute once for the lifetime of the JS global scope, read
* on every request" caches (site settings, search-health verification, ...).
* That global scope is the process on Node and the isolate on Cloudflare
* Workers — this helper is platform-neutral; the hazard it defends against is
* specific to workerd but the cache itself is not.
*
* These caches must coalesce concurrent cold reads into one query — but the
* obvious way to do that, caching the in-flight *promise* on a global and
* awaiting it from later requests, is unsafe on workerd: if the request that
* created the promise is cancelled mid-await (client disconnect, context
* teardown), its continuation never runs, so the promise neither resolves nor
* rejects. Every later request that awaits that shared promise then hangs
* until the isolate is evicted (observed as 524s at the 100s wall, near-zero
* CPU). A `.catch`/`.finally` that clears the cache doesn't help — a cancelled
* request settles neither way.
*
* This cache stores the resolved *value* (not a promise) and coalesces via
* `initWithLock`: one request becomes the owner and runs `fetch`, everyone
* else polls for the published value and never awaits the owner's promise.
* A cancelled owner can therefore never strand a waiter — the worst case is
* the lock looks held until `deadlineMs`, then the next caller reclaims. The
* owner's `fetch` is also anchored (waitUntil) so a cancelled originator's
* query still completes and populates the cache, and bounded by
* `ownerTimeoutMs` so a genuinely stuck fetch reclaims instead of hanging.
*
* Invalidation bumps `version`; reads compare against the version captured at
* call time and refetch on mismatch.
*/
function createSingleFlightCache() {
	return {
		value: null,
		hasValue: false,
		version: 0,
		valueVersion: -1,
		lock: createInitLock()
	};
}
/**
* Force the next `singleFlightCached` call to refetch. An in-flight owner
* fetched at the old version will not publish into the new version, so its
* result is ignored by subsequent reads.
*/
function invalidateSingleFlightCache(cache) {
	cache.version++;
	cache.hasValue = false;
	cache.value = null;
	cache.valueVersion = -1;
	cache.lock.ownerStartedAt = null;
}
/**
* Headroom between the owner's own timeout and the waiter reclaim deadline.
* The reclaim deadline must sit *above* `ownerTimeoutMs` so a slow-but-live
* owner times out (and releases the lock) before a waiter would reclaim it —
* otherwise a fetch slower than the deadline is superseded before it can
* publish, and steady traffic turns that into a self-sustaining stampede.
*/
var RECLAIM_HEADROOM_MS = 5e3;
function withTimeout(promise, ms) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(/* @__PURE__ */ new Error(`singleFlightCached: owner fetch exceeded ${ms}ms`));
		}, ms);
		promise.then(resolve, reject).finally(() => {
			clearTimeout(timer);
		});
	});
}
/**
* Return the cached value for `cache`, computing it via `fetch` under a
* single-flight lock on a miss. Concurrent callers coalesce onto one fetch;
* a cancelled owner cannot poison later callers (see file header).
*/
function singleFlightCached(cache, fetch, options = {}) {
	const versionAtCall = cache.version;
	const ownerTimeoutMs = options.ownerTimeoutMs !== void 0 && Number.isFinite(options.ownerTimeoutMs) && options.ownerTimeoutMs > 0 ? options.ownerTimeoutMs : void 0;
	const deadlineMs = ownerTimeoutMs === void 0 ? options.deadlineMs : Math.max(options.deadlineMs ?? 0, ownerTimeoutMs + RECLAIM_HEADROOM_MS);
	return initWithLock(cache.lock, () => cache.hasValue && cache.valueVersion === versionAtCall ? { v: cache.value } : null, (isCurrentClaim) => {
		const real = (async () => {
			const value = await fetch();
			if (isCurrentClaim()) {
				cache.value = value;
				cache.hasValue = true;
				cache.valueVersion = versionAtCall;
			}
			return { v: value };
		})();
		options.anchor?.(real.then(() => void 0, () => void 0));
		return ownerTimeoutMs === void 0 ? real : withTimeout(real, ownerTimeoutMs);
	}, {
		deadlineMs,
		pollMs: options.pollMs,
		maxWaitMs: options.maxWaitMs
	}).then((box) => box.v);
}
export { invalidateSingleFlightCache as n, singleFlightCached as r, createSingleFlightCache as t };
