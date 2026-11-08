import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/src/deferred-tasks.ts
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
// node_modules/emdash/src/request-context.ts
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
var ALS_KEY = Symbol.for("emdash:request-context");
var storage = globalThis[ALS_KEY] ?? (() => {
	const als = new AsyncLocalStorage();
	globalThis[ALS_KEY] = als;
	return als;
})();
/**
* Get the current request context.
* Returns undefined if no context is set (logged-out fast path).
*/
function getRequestContext() {
	return storage.getStore();
}
// node_modules/emdash/src/after.ts
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
// node_modules/emdash/src/utils/base64.ts
/**
* Base64 encoding/decoding utilities.
*
* Uses native Uint8Array.prototype.toBase64 / Uint8Array.fromBase64 when
* available (workerd, Node 26+, modern browsers), falls back to btoa/atob.
*
* All base64url encoding uses the { alphabet: "base64url" } option natively
* or manual character replacement as fallback.
*
* Delete the fallback paths when the minimum Node version supports these
* methods natively.
*/
var hasNative = typeof Uint8Array.prototype.toBase64 === "function" && typeof Uint8Array.fromBase64 === "function";
/** Encode a UTF-8 string as standard base64. */
function encodeBase64(str) {
	const bytes = new TextEncoder().encode(str);
	if (hasNative) return bytes.toBase64();
	let binary = "";
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary);
}
/** Decode a standard base64 string to a UTF-8 string. */
function decodeBase64(base64) {
	return new TextDecoder().decode(decodeBase64Bytes(base64));
}
/** Decode a standard base64 string to raw bytes (for binary payloads). */
function decodeBase64Bytes(base64) {
	if (hasNative) return Uint8Array.fromBase64(base64);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
// node_modules/emdash/src/utils/init-lock.ts
function createInitLock() {
	return {
		ownerStartedAt: null,
		generation: 0
	};
}
var DEFAULT_DEADLINE_MS = 15e3;
var DEFAULT_POLL_MS = 50;
var MAX_WAIT_HEADROOM_MS = 15e3;
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
* Return the cached value if present, otherwise initialize it under the
* lock. `init` is responsible for storing the value so that `getCached`
* returns it on subsequent calls — waiters re-check `getCached` after the
* owner finishes rather than sharing the owner's promise.
*
* `init` receives an `isCurrentClaim` predicate and must gate its cache
* publication on it: a slow init that was reclaimed past the deadline
* must not overwrite the value published by the reclaimer (for the
* runtime singleton that would orphan the reclaimer's active cron
* scheduler). A losing init should also tear down any side resources it
* started, since its result will never be published.
*/
async function initWithLock(lock, getCached, init, options) {
	const deadlineMs = options?.deadlineMs ?? DEFAULT_DEADLINE_MS;
	const pollMs = options?.pollMs ?? DEFAULT_POLL_MS;
	const maxWaitMs = options?.maxWaitMs ?? deadlineMs + MAX_WAIT_HEADROOM_MS;
	const waitStart = Date.now();
	for (;;) {
		const cached = getCached();
		if (cached !== null && cached !== void 0) return cached;
		const ownerStartedAt = lock.ownerStartedAt;
		if (ownerStartedAt === null || Date.now() - ownerStartedAt > deadlineMs) {
			lock.generation += 1;
			const claim = lock.generation;
			lock.ownerStartedAt = Date.now();
			try {
				const isCurrentClaim = () => lock.generation === claim;
				const initPromise = Promise.resolve().then(() => init(isCurrentClaim));
				options?.anchor?.(initPromise.then(() => void 0, () => void 0));
				return await initPromise;
			} finally {
				if (lock.generation === claim) lock.ownerStartedAt = null;
			}
		}
		if (Date.now() - waitStart > maxWaitMs) throw new Error(`initWithLock: timed out after ${maxWaitMs}ms waiting for initialization`);
		await sleep(pollMs);
	}
}
/** Encode a cursor from order value + id, optionally carrying the ordered field values. */
function encodeCursor(orderValue, id, sortValues) {
	const payload = {
		orderValue,
		id
	};
	if (sortValues !== void 0 && sortValues.length > 0) payload.sortValues = sortValues;
	return encodeBase64(JSON.stringify(payload));
}
/**
* Thrown when a pagination cursor cannot be decoded.
*
* Repository callers should let this propagate; handler catch blocks
* map it to a structured `INVALID_CURSOR` error so client pagination
* bugs surface immediately rather than silently re-fetching the first
* page.
*/
var InvalidCursorError = class extends Error {
	constructor(cursor) {
		const display = cursor.length > 50 ? `${cursor.slice(0, 47)}...` : cursor;
		super(`Invalid pagination cursor: ${display}`);
		this.name = "InvalidCursorError";
	}
};
function isSortFieldBoundary(item) {
	if (item === null || typeof item !== "object") return false;
	const candidate = item;
	if (candidate.missing !== void 0 && typeof candidate.missing !== "boolean") return false;
	return true;
}
function normalizeSortBoundary(item) {
	if (isSortFieldBoundary(item)) return {
		value: item.value,
		missing: item.missing
	};
	return {
		value: item,
		missing: false
	};
}
/**
* Decode a cursor to order value + id.
*
* Throws `InvalidCursorError` if the cursor is empty, not valid base64,
* not valid JSON, or doesn't contain string `orderValue` and `id` fields.
*/
function decodeCursor(cursor) {
	if (!cursor) throw new InvalidCursorError(cursor);
	if (cursor.length > 4096) throw new InvalidCursorError(cursor);
	let parsed;
	try {
		parsed = JSON.parse(decodeBase64(cursor));
	} catch {
		throw new InvalidCursorError(cursor);
	}
	if (parsed === null || typeof parsed !== "object") throw new InvalidCursorError(cursor);
	const candidate = parsed;
	if (typeof candidate.orderValue !== "string" || typeof candidate.id !== "string") throw new InvalidCursorError(cursor);
	let sortValues;
	if (candidate.sortValues !== void 0) {
		if (!Array.isArray(candidate.sortValues)) throw new InvalidCursorError(cursor);
		sortValues = candidate.sortValues.map(normalizeSortBoundary);
	}
	return {
		orderValue: candidate.orderValue,
		id: candidate.id,
		sortValues
	};
}
var EmDashValidationError = class extends Error {
	details;
	constructor(message, details) {
		super(message);
		this.details = details;
		this.name = "EmDashValidationError";
	}
};
var ContentCollectionNotFoundError = class extends Error {
	constructor(collection) {
		super(`Collection '${collection}' not found`);
		this.name = "ContentCollectionNotFoundError";
	}
};
/**
* Thrown by `publish()` when called with `requireDue` for a row that is no
* longer due (its `scheduled_at` was cleared or pushed into the future between
* selection and publish — e.g. an editor unscheduled it). Lets the scheduled
* sweep skip the row silently rather than treating it as a publish failure.
*/
var ScheduledNotDueError = class extends Error {
	constructor(message = "Content is no longer scheduled to publish") {
		super(message);
		this.name = "ScheduledNotDueError";
	}
};
var ContentMutationConflictError = class extends Error {
	constructor(message = "Content changed while the operation was in progress") {
		super(message);
		this.name = "ContentMutationConflictError";
	}
};
var ContentSlugConflictError = class extends Error {
	constructor() {
		super("The slug is already used by another content entry");
		this.name = "ContentSlugConflictError";
	}
};
// node_modules/emdash/src/request-cache.ts
var STORE_KEY = Symbol.for("emdash:request-cache");
var g = globalThis;
var store = g[STORE_KEY] ?? (() => {
	const wm = /* @__PURE__ */ new WeakMap();
	g[STORE_KEY] = wm;
	return wm;
})();
/**
* Return a cached result for `key` if one exists in the current
* request scope, otherwise call `fn`, cache its promise, and return it.
*
* Caches the *promise*, not the resolved value, so concurrent calls
* with the same key share a single in-flight query.
*/
function requestCached(key, fn) {
	const ctx = getRequestContext();
	if (!ctx) return fn();
	let cache = store.get(ctx);
	if (!cache) {
		cache = /* @__PURE__ */ new Map();
		store.set(ctx, cache);
	}
	const existing = cache.get(key);
	if (existing) {
		if (ctx.metrics) ctx.metrics.cacheHits += 1;
		return existing;
	}
	if (ctx.metrics) ctx.metrics.cacheMisses += 1;
	const promise = Promise.resolve().then(fn).catch((error) => {
		cache.delete(key);
		throw error;
	});
	cache.set(key, promise);
	return promise;
}
/**
* Look up an entry in the request-scoped cache without inserting one.
*
* Returns the in-flight or resolved promise if the key exists in the
* current request, otherwise `undefined`. Callers can use this to
* opportunistically satisfy a narrower query (e.g. `getSiteSetting("seo")`)
* from a broader one (`getSiteSettings()`) that's already been loaded
* by a parent template — avoiding a redundant round-trip.
*
* No-ops outside a request context.
*/
function peekRequestCache(key) {
	const ctx = getRequestContext();
	if (!ctx) return void 0;
	return store.get(ctx)?.get(key);
}
/**
* Pre-populate the request-scoped cache with a resolved value.
*
* Internal helper shared between hydration paths (taxonomy terms,
* bylines, etc.) that already have the data in hand and want downstream
* callers using `requestCached(key, ...)` to skip the database entirely.
* Not exported from the package entrypoint — keep it internal until we
* have a documented plugin/extension surface for hydration.
*
* No-ops outside a request context (local dev without ALS).
*
* Does not overwrite an existing entry — if a query for this key is already
* in flight, its promise wins.
*/
function setRequestCacheEntry(key, value) {
	const ctx = getRequestContext();
	if (!ctx) return;
	let cache = store.get(ctx);
	if (!cache) {
		cache = /* @__PURE__ */ new Map();
		store.set(ctx, cache);
	}
	if (cache.has(key)) return;
	cache.set(key, Promise.resolve(value));
}
/**
* Remove a key from the request-scoped cache.
*
* Used by write paths that need to invalidate a downstream read cache —
* `setRequestCacheEntry` deliberately doesn't overwrite, and `requestCached`
* returns the cached promise even after the underlying data has changed.
* Without an explicit clear, a `read → write → read` sequence in a single
* request can return stale data on the second read.
*
* Concrete case: `BylineRepository.update` invalidates
* `byline-field-group-values:${translation_group}` after writing a
* non-translatable custom-field value, so the post-update `findById`
* (and any later reads in the same request) see the fresh value.
*
* No-ops outside a request context.
*/
function clearRequestCacheEntry(key) {
	const ctx = getRequestContext();
	if (!ctx) return;
	store.get(ctx)?.delete(key);
}
export { ContentCollectionNotFoundError as a, EmDashValidationError as c, decodeCursor as d, encodeCursor as f, getRequestContext as g, after as h, setRequestCacheEntry as i, InvalidCursorError as l, initWithLock as m, peekRequestCache as n, ContentMutationConflictError as o, createInitLock as p, requestCached as r, ContentSlugConflictError as s, clearRequestCacheEntry as t, ScheduledNotDueError as u };
