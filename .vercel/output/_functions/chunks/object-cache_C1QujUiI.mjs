import { g as getRequestContext, h as after } from "./request-cache_CXFiINQX.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
// node_modules/emdash/src/object-cache/codec.ts
/**
* Object-cache serialization codec.
*
* Cached values are JSON, with one extension: `Date` instances are preserved
* across the round-trip. EmDash content entries carry `Date` objects for the
* system timestamp columns (`createdAt`, `updatedAt`, `publishedAt`,
* `scheduledAt`) and on `cacheHint.lastModified`; plain `JSON.stringify` would
* silently flatten those to ISO strings, so a value read from cache would no
* longer be `=== instanceof Date` and downstream `value instanceof Date`
* branches (cursor encoding, scheduled-visibility checks) would diverge from a
* fresh database read.
*
* Functions and symbol-keyed properties are NOT preserved — callers that cache
* values carrying either (e.g. content entries with their `.edit` proxy and
* the non-enumerable `CURSOR_RAW_VALUES` symbol) must reduce to a serializable
* snapshot before caching and rebuild the non-serializable parts on read. See
* `query.ts` content snapshot helpers.
*/
/** Tag used to mark a serialized `Date`. Deliberately unlikely to collide. */
var DATE_TAG = "$$emdashDate";
function isTaggedDate(value) {
	if (typeof value !== "object" || value === null) return false;
	return Object.keys(value).length === 1 && typeof value[DATE_TAG] === "string";
}
/**
* Serialize a value to a cache string, preserving `Date` instances.
*
* Uses the JSON replacer's `this` binding to inspect the *original* property
* value: `JSON.stringify` invokes `Date.prototype.toJSON` before the replacer
* sees it, so by the time `value` arrives it is already an ISO string. Reading
* `this[key]` recovers the live `Date` so we can tag it.
*/
function encode(value) {
	return JSON.stringify(value, function(key, val) {
		const original = this[key];
		if (original instanceof Date) return { [DATE_TAG]: original.toISOString() };
		return val;
	});
}
/**
* Parse a cache string produced by {@link encode}, rehydrating tagged `Date`s.
*
* Returns `undefined` if the input is not valid JSON (treated as a cache miss
* by the read-through layer rather than throwing).
*/
function decode(raw) {
	try {
		return JSON.parse(raw, (_key, value) => {
			if (isTaggedDate(value)) return new Date(value[DATE_TAG]);
			return value;
		});
	} catch {
		return;
	}
}
// node_modules/emdash/src/object-cache/index.ts
/**
* Object cache — distributed read-through query cache.
*
* Layering (per query):
*
*   requestCached   → in-request dedupe (per render, WeakMap on ALS context)
*   cachedQuery     → THIS layer: distributed L2 (KV / memory), epoch-keyed
*   database        → source of truth
*
* Optional and off by default: when no `objectCache` descriptor is configured,
* `virtual:emdash/object-cache` exports `createObjectCache = undefined`,
* {@link getBackend} resolves to `null`, and {@link cachedQuery} is a
* transparent passthrough to its `load` function. Configure with
* `memoryCache()` (Node) or `kvCache()` from `@emdash-cms/cloudflare`.
*
* Invalidation is epoch-based: each cache key embeds a per-namespace epoch
* ("last changed" marker) read from the backend. A write calls
* {@link invalidateObjectCache}, which stamps the namespace epoch to
* `Date.now()`; every previously-stored key for that namespace is instantly
* orphaned and reclaimed by its TTL. This is O(1) and needs no key
* enumeration (KV has no prefix delete).
*
* The singleton backend/config and the per-isolate epoch cache live on
* `globalThis` behind `Symbol.for` keys so Vite SSR chunk duplication can't
* fork them (same pattern as `request-context.ts`).
*/
var DEFAULT_KEY_PREFIX = "em";
var DEFAULT_TTL_SECONDS = 3600;
var DEFAULT_REVALIDATE_MS = 1e3;
var DEFAULT_TIMEOUT_MS = 2e3;
/**
* Race a backend operation against a timeout so a stalled call (e.g. a KV read
* that never resolves *and* never rejects — a cold cross-region read, or one
* queued behind the Workers simultaneous-connection limit) degrades to a
* rejection instead of hanging the isolate. A rejection is benign: callers
* already treat a failed read as a cache miss / last-known epoch.
*/
function withTimeout(promise, ms, label) {
	if (!(ms > 0)) return promise;
	let timer;
	const timeout = new Promise((_resolve, reject) => {
		timer = setTimeout(() => {
			reject(/* @__PURE__ */ new Error(`object-cache ${label} timed out after ${ms}ms`));
		}, ms);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
/**
* Extra time past the configured read timeout before an in-flight epoch read
* is presumed dead. A live owner's read settles within `timeout` (enforced by
* {@link withTimeout}), so the grace only needs to absorb scheduling jitter.
*/
var EPOCH_READ_GRACE_MS = 1e3;
/**
* How long an in-flight epoch read may be trusted. A read older than this can
* only exist because its owning request was cancelled mid-await — on workerd
* a cancelled request's continuations never run, *including the timeout's own
* `setTimeout` callback*, so the shared promise never settles and is never
* replaced. With the timeout disabled (`timeout: 0`) the default is used as
* the deadline; the worst case of guessing too short is one duplicate
* backend read.
*/
function epochReadDeadline() {
	return (holder.config.timeout > 0 ? holder.config.timeout : DEFAULT_TIMEOUT_MS) + EPOCH_READ_GRACE_MS;
}
/**
* Await another request's in-flight epoch read, bounded by the waiter's own
* timer. The bare promise must never be awaited across requests: if the
* owning request is cancelled, the promise never settles (see
* {@link epochReadDeadline}) and an unguarded waiter hangs until the isolate
* is evicted. The race timer below belongs to the *waiter's* request context
* and therefore always fires; on timeout the waiter degrades to `fallback`
* (the last known epoch), the same contract as a failed backend read.
*/
function raceInFlightEpochRead(promise, ms, fallback) {
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(resolve, Math.max(ms, 1), fallback);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
/** Bound a waiter on another request's backend initialization. */
function raceInFlightBackendInit(promise, ms) {
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(resolve, Math.max(ms, 1), null);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
var BACKEND_KEY = Symbol.for("emdash:object-cache:backend");
var EPOCH_KEY = Symbol.for("emdash:object-cache:epochs");
var PENDING_KEY = Symbol.for("emdash:object-cache:pending-bumps");
var LAST_CONTENT_WRITE_KEY = Symbol.for("emdash:object-cache:last-content-write");
var PENDING_CONTENT_WRITE_KEY = Symbol.for("emdash:object-cache:pending-content-write");
var WRITE_SCOPE_KEY = Symbol.for("emdash:object-cache:write-scope");
var g = globalThis;
var holder = g[BACKEND_KEY] ?? (() => {
	const h = {
		initialized: false,
		backend: null,
		initPromise: null,
		config: {
			keyPrefix: DEFAULT_KEY_PREFIX,
			defaultTtl: DEFAULT_TTL_SECONDS,
			revalidate: DEFAULT_REVALIDATE_MS,
			timeout: DEFAULT_TIMEOUT_MS
		}
	};
	g[BACKEND_KEY] = h;
	return h;
})();
var epochCache = g[EPOCH_KEY] ?? (() => {
	const m = /* @__PURE__ */ new Map();
	g[EPOCH_KEY] = m;
	return m;
})();
/** Namespaces with a backend epoch write already scheduled this tick. */
var pendingBumps = g[PENDING_KEY] ?? (() => {
	const s = /* @__PURE__ */ new Set();
	g[PENDING_KEY] = s;
	return s;
})();
var lastContentWrite = g[LAST_CONTENT_WRITE_KEY] ?? (() => {
	const s = {
		value: 0,
		at: 0
	};
	g[LAST_CONTENT_WRITE_KEY] = s;
	return s;
})();
/** Whether a backend persist of the content-write stamp is already scheduled. */
var contentWritePersist = g[PENDING_CONTENT_WRITE_KEY] ?? (() => {
	const s = { pending: false };
	g[PENDING_CONTENT_WRITE_KEY] = s;
	return s;
})();
var writeScopes = g[WRITE_SCOPE_KEY] ?? (() => {
	const als = new AsyncLocalStorage();
	g[WRITE_SCOPE_KEY] = als;
	return als;
})();
/**
* Resolve (once per isolate) the configured object-cache backend.
*
* Loads `virtual:emdash/object-cache`, which exports `createObjectCache`
* (`undefined` when no cache is configured) and the serialized
* `objectCacheConfig`. Returns `null` when the cache is disabled.
*/
async function getBackend() {
	if (holder.initialized) return holder.backend;
	if (holder.initPromise) {
		const age = Date.now() - (holder.initPromiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) return raceInFlightBackendInit(holder.initPromise, deadline - age);
	}
	holder.initPromiseAt = Date.now();
	holder.initPromise = (async () => {
		try {
			const mod = await import("./object-cache_XrGln1aI.mjs");
			const config = mod.objectCacheConfig ?? {};
			holder.config = {
				keyPrefix: typeof config.keyPrefix === "string" && config.keyPrefix.length > 0 ? config.keyPrefix : DEFAULT_KEY_PREFIX,
				defaultTtl: typeof config.defaultTtl === "number" && config.defaultTtl > 0 ? config.defaultTtl : DEFAULT_TTL_SECONDS,
				revalidate: typeof config.revalidate === "number" && config.revalidate >= 0 ? config.revalidate : DEFAULT_REVALIDATE_MS,
				timeout: typeof config.timeout === "number" && config.timeout >= 0 ? config.timeout : DEFAULT_TIMEOUT_MS
			};
			holder.backend = typeof mod.createObjectCache === "function" ? mod.createObjectCache(config) : null;
		} catch (error) {
			if (Object.assign({
				"ASSETS_PREFIX": void 0,
				"BASE_URL": "/",
				"DEV": false,
				"MODE": "production",
				"PROD": true,
				"SITE": void 0,
				"SSR": true
			}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" })?.DEV) console.warn("[object-cache] backend unavailable:", error);
			holder.backend = null;
		}
		holder.initialized = true;
		holder.initPromise = null;
		holder.initPromiseAt = void 0;
		return holder.backend;
	})();
	const started = holder.initPromise;
	after(() => started.then(() => void 0, () => void 0));
	return started;
}
/** Build the backend key for a namespace's epoch anchor. */
function epochKey(namespace) {
	return `${holder.config.keyPrefix}:epoch:${namespace}`;
}
/** Backend key for the shared "last content write" stamp (no short TTL). */
function lastContentWriteKey() {
	return `${holder.config.keyPrefix}:last-content-write-at`;
}
function isContentNamespace(namespace) {
	return namespace.startsWith("content:");
}
/**
* Build the (epoch-independent) backend key for a cached value.
*
* The key is stable across invalidations — the namespace epochs are stored
* *inside* the value envelope and validated on read, not baked into the key.
* This lets the value and the epochs be fetched in one parallel round-trip
* (instead of "read epoch, then read value"), and means an invalidated value
* is overwritten in place rather than orphaned under a dead epoch-keyed name.
*/
function valueKey(namespaces, key) {
	return `${holder.config.keyPrefix}:${namespaces.join(",")}:${key}`;
}
function epochsMatch(stored, current) {
	if (stored.length !== current.length) return false;
	for (let i = 0; i < stored.length; i++) if (stored[i] !== current[i]) return false;
	return true;
}
/**
* Requests that must always read live data and never populate the cache:
* visual edit mode, preview tokens, isolated databases (playground / DO
* preview, whose schema and content diverge from the configured site), and
* Astro route-cache fills that must not rebuild a purged page from a stale
* object-cache snapshot.
*/
function shouldBypass() {
	const ctx = getRequestContext();
	if (!ctx) return false;
	return ctx.editMode === true || ctx.preview !== void 0 || ctx.dbIsIsolated === true || ctx.routeCacheFill === true;
}
/**
* Read the current epoch for `namespace`, reusing an isolate-cached value for
* up to `revalidate` ms. A missing epoch (never bumped) is treated as `0`.
*
* Backend errors and stalls are non-fatal: the read is bounded by a timeout,
* and on failure we fall back to the last known epoch (or `0`), so a flaky or
* hung cache degrades to "serve whatever's keyed" rather than throwing or
* hanging.
*/
async function getEpoch(namespace, backend) {
	const now = Date.now();
	const cached = epochCache.get(namespace);
	if (cached && now - cached.at < holder.config.revalidate) return cached.value;
	if (cached?.promise) {
		const age = now - (cached.promiseAt ?? 0);
		const deadline = epochReadDeadline();
		if (age < deadline) return raceInFlightEpochRead(cached.promise, deadline - age, cached.value);
	}
	const promise = (async () => {
		let value;
		try {
			const raw = await withTimeout(backend.get(epochKey(namespace)), holder.config.timeout, "epoch read");
			const parsed = raw === null ? 0 : Number(raw);
			value = Number.isFinite(parsed) ? parsed : 0;
		} catch {
			value = cached?.value ?? 0;
		}
		const merged = Math.max(value, epochCache.get(namespace)?.value ?? 0);
		epochCache.set(namespace, {
			value: merged,
			at: Date.now()
		});
		return merged;
	})();
	after(() => promise.then(() => void 0, () => void 0));
	epochCache.set(namespace, {
		value: cached?.value ?? 0,
		at: cached?.at ?? 0,
		promise,
		promiseAt: now
	});
	return promise;
}
/**
* Distributed read-through cache around `load`.
*
* `T` must be the value as it should be *stored* — i.e. JSON-serializable with
* the codec's `Date` support, carrying no functions or symbol-keyed props.
* Callers caching richer objects (content entries) reduce to a serializable
* snapshot here and rebuild on the way out; see `query.ts`.
*
* On a miss or when the cache is disabled/bypassed, this is equivalent to
* `await load()`. Backend errors never propagate: a failing `get` is a miss, a
* failing `set` is dropped.
*/
async function cachedQuery(options) {
	return cachedQueryWithEpochs(options);
}
/**
* {@link cachedQuery} that also passes `onEpochs` the namespace epochs the read
* is checked against and stored under, in namespace order, before the cached
* value is returned or `load` runs. Not called when the cache is disabled or
* bypassed.
*
* @internal
*/
async function cachedQueryWithEpochs(options) {
	const backend = await getBackend();
	if (!backend || shouldBypass()) return options.load();
	const namespaces = typeof options.namespace === "string" ? [options.namespace] : options.namespace;
	const fullKey = valueKey(namespaces, options.key);
	const epochsPromise = Promise.all(namespaces.map((ns) => getEpoch(ns, backend)));
	const rawPromise = withTimeout(backend.get(fullKey), holder.config.timeout, "read").catch(() => null);
	const currentEpochs = await epochsPromise;
	options.onEpochs?.(currentEpochs);
	const raw = await rawPromise;
	if (raw !== null) {
		const decoded = decode(raw);
		if (decoded !== void 0) {
			const envelope = decoded;
			if (epochsMatch(envelope.e, currentEpochs)) return envelope.v;
		}
	}
	const value = await options.load();
	if (options.cacheable ? options.cacheable(value) : true) {
		const ttl = options.ttl ?? holder.config.defaultTtl;
		after(async () => {
			try {
				const encoded = encode({
					e: currentEpochs,
					v: value
				});
				await backend.set(fullKey, encoded, ttl);
			} catch (error) {
				if (Object.assign({
					"ASSETS_PREFIX": void 0,
					"BASE_URL": "/",
					"DEV": false,
					"MODE": "production",
					"PROD": true,
					"SITE": void 0,
					"SSR": true
				}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" })?.DEV) console.warn("[object-cache] set failed:", error);
			}
		});
	}
	return value;
}
/** Whether object-cache reads are active for the current request. */
async function isObjectCacheActive() {
	return await getBackend() !== null && !shouldBypass();
}
/**
* Stamp the isolate-local + backend "last content write" marker when a
* content collection namespace is invalidated. Used by DB adapters (Hyperdrive)
* to briefly prefer uncached SQL after a publish so edge/object caches are not
* reseeded from a stale query-cache hit.
*/
function stampLastContentWrite() {
	const stamp = Math.max(lastContentWrite.value + 1, Date.now());
	lastContentWrite.value = stamp;
	lastContentWrite.at = stamp;
	lastContentWrite.promise = void 0;
	lastContentWrite.promiseAt = void 0;
	scheduleBackendWrite("last-content-write", persistLastContentWrite);
}
function persistLastContentWrite() {
	if (contentWritePersist.pending) return;
	contentWritePersist.pending = true;
	after(async () => {
		contentWritePersist.pending = false;
		try {
			const backend = await getBackend();
			if (!backend) return;
			const latest = lastContentWrite.value;
			await backend.set(lastContentWriteKey(), String(latest));
		} catch (error) {
			console.error("[object-cache] last-content-write stamp failed:", error);
		}
	});
}
/**
* Invalidate every cached value in `namespace` by bumping its epoch.
*
* Sync and non-blocking: the local epoch is stamped immediately (so the
* writing isolate is instantly consistent) and the backend write is deferred
* via `after`, or held until the work ends inside
* {@link coalesceObjectCacheWrites}. Other isolates pick up the new epoch
* within their `revalidate` window after that write. No-ops when the cache is
* disabled.
*
* Content namespaces (`content:*`) also stamp {@link getLastContentWriteAt}.
*/
function invalidateObjectCache(namespace) {
	const prev = epochCache.get(namespace)?.value ?? 0;
	const stamp = Math.max(prev + 1, Date.now());
	epochCache.set(namespace, {
		value: stamp,
		at: stamp
	});
	if (isContentNamespace(namespace)) stampLastContentWrite();
	scheduleBackendWrite(`epoch:${namespace}`, () => persistEpoch(namespace, stamp));
}
function persistEpoch(namespace, stamp) {
	if (pendingBumps.has(namespace)) return;
	pendingBumps.add(namespace);
	after(async () => {
		pendingBumps.delete(namespace);
		try {
			const backend = await getBackend();
			if (!backend) return;
			const latest = epochCache.get(namespace)?.value ?? stamp;
			await backend.set(epochKey(namespace), String(latest));
		} catch (error) {
			console.error("[object-cache] epoch bump failed for", namespace, error);
		}
	});
}
function scheduleBackendWrite(key, write) {
	const scope = writeScopes.getStore();
	if (scope && !scope.closed) {
		scope.held.set(key, write);
		return;
	}
	write();
}
/**
* Fixed namespaces for data shared across collections. Content reads fold the
* `BYLINES` and `TAXONOMIES` epochs into their keys (via {@link cachedQuery})
* because entries hydrate byline and taxonomy-term data — so renaming an
* author or a category correctly invalidates every cached entry that displays
* it, without tracking which collections reference it.
*/
var CacheNamespace = {
	SETTINGS: "settings",
	MENUS: "menus",
	TAXONOMIES: "taxonomies",
	BYLINES: "bylines",
	/** Collection schema/metadata (label, supports, commentsEnabled, fields). */
	SCHEMA: "schema",
	/** Public (approved) comments. */
	COMMENTS: "comments",
	/** Widget areas and their widgets. */
	WIDGETS: "widgets"
};
/** Namespace for a content collection's cached queries. */
function contentNamespace(collection) {
	return `content:v2:${collection}`;
}
function legacyContentNamespace(collection) {
	return `content:${collection}`;
}
/**
* Content epochs carried by current cache entries. The versioned namespace
* makes snapshots written before the current cache format unreachable.
*/
function contentCacheNamespaces(collection) {
	return [contentNamespace(collection)];
}
function contentInvalidationNamespaces(collection) {
	return [contentNamespace(collection), legacyContentNamespace(collection)];
}
/**
* Namespaces a content read depends on: the collection itself plus the shared
* byline/taxonomy data folded into each entry.
*/
function contentNamespaces(collection) {
	return [
		...contentCacheNamespaces(collection),
		CacheNamespace.BYLINES,
		CacheNamespace.TAXONOMIES
	];
}
/**
* Invalidate all cached reads (list + entry) for a content collection.
* Call from every write path that mutates rows in `ec_<collection>`.
*/
function invalidateCollectionCache(collection) {
	for (const namespace of contentInvalidationNamespaces(collection)) invalidateObjectCache(namespace);
}
/** Invalidate cached bylines and all content that hydrates them. */
function invalidateBylineObjectCache() {
	invalidateObjectCache(CacheNamespace.BYLINES);
}
export { invalidateCollectionCache as a, invalidateBylineObjectCache as i, cachedQuery as n, isObjectCacheActive as o, contentNamespaces as r, CacheNamespace as t };
