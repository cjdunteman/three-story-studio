import { f as encodeCursor, g as getRequestContext, h as after, m as initWithLock, n as peekRequestCache, p as createInitLock } from "./request-cache_CXFiINQX.mjs";
import { Kysely } from "kysely";
// node_modules/emdash/src/utils/single-flight-cache.ts
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
// node_modules/emdash/src/database/instrumentation.ts
function recordEvent(rec, sql, params, durationMs) {
	rec.events.push({
		sql,
		params,
		durationMs,
		route: rec.route,
		method: rec.method,
		phase: rec.phase
	});
}
function kyselyLog(event) {
	if (event.level !== "query") return;
	const ctx = getRequestContext();
	if (!ctx) return;
	const dur = event.queryDurationMillis;
	if (ctx.metrics) {
		const m = ctx.metrics;
		m.dbCount += 1;
		m.dbTotalMs += dur;
		const finishedAt = performance.now() - m.start;
		const startedAt = finishedAt - dur;
		if (m.dbFirstOffset === null) m.dbFirstOffset = startedAt;
		m.dbLastOffset = finishedAt;
	}
	if (ctx.queryRecorder) recordEvent(ctx.queryRecorder, event.query.sql, event.query.parameters, dur);
}
/**
* Returns a Kysely `log` callback. Always returns a function so per-request
* counters (db.count, db.total, db.first, db.last) and the optional NDJSON
* recorder both get fed. The cost over the previous "undefined when off"
* behaviour is one `performance.now()` pair per query inside Kysely, which
* is in the noise compared to any real query.
*/
function kyselyLogOption() {
	return kyselyLog;
}
// node_modules/emdash/src/page/seo-panel.ts
function seoPanelCacheKey(collection, id) {
	return `seo-panel:${collection}:${id}`;
}
/**
* Read the SEO panel data primed for a content entry in this request.
*
* Returns `null` when nothing was primed — either the entry has no SEO
* row, or it was not fetched through an EmDash loader in this request
* (e.g. prerendered pages, or a hand-rolled query). Callers treat null as
* "no overlay"; this never falls back to a database lookup, so the
* logged-out hot path gains zero queries.
*/
async function peekSeoPanel(collection, id) {
	const primed = peekRequestCache(seoPanelCacheKey(collection, id));
	return primed ? await primed : null;
}
// node_modules/emdash/src/utils/revalidating-cache.ts
var REVALIDATING_CACHE_TTL_MS = 3e4;
function createRevalidatingCache() {
	return {
		snapshot: null,
		expiresAt: 0,
		generation: 0,
		revalidatingUntil: 0,
		refresh: createSingleFlightCache()
	};
}
/** Serve the last good snapshot while an expired value refreshes via after(). */
async function revalidatingCached(cache, load, onError) {
	const refresh = () => singleFlightCached(cache.refresh, load, {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: REVALIDATING_CACHE_TTL_MS
	});
	const install = (value) => {
		cache.snapshot = { value };
		cache.expiresAt = Date.now() + REVALIDATING_CACHE_TTL_MS;
	};
	const revalidate = () => {
		const now = Date.now();
		if (cache.revalidatingUntil > now) return;
		cache.revalidatingUntil = now + REVALIDATING_CACHE_TTL_MS;
		const generation = ++cache.generation;
		invalidateSingleFlightCache(cache.refresh);
		after(async () => {
			try {
				const value = await refresh();
				if (generation === cache.generation) install(value);
			} catch (error) {
				onError(error);
			}
		});
	};
	for (let attempt = 0; attempt < 3; attempt++) {
		const snapshot = cache.snapshot;
		if (snapshot) {
			if (Date.now() >= cache.expiresAt) revalidate();
			return snapshot.value;
		}
		const generation = cache.generation;
		const loaded = await refresh();
		if (generation === cache.generation) {
			install(loaded);
			return loaded;
		}
		if (attempt === 2) return loaded;
	}
	throw new Error("Revalidating cache refresh exhausted without loading value");
}
/** Aliased SEO result keys — excluded from generic field mapping. */
var SEO_ALIAS_COLUMNS = Object.values({
	seo_title: "_emdash_seo_title",
	seo_description: "_emdash_seo_description",
	seo_image: "_emdash_seo_image",
	seo_canonical: "_emdash_seo_canonical",
	seo_no_index: "_emdash_seo_no_index"
});
/** Folded SEO JSON column name in the result set (expanded onto aliases in JS). */
var SEO_FOLDED_COLUMN = "_emdash_seo";
/** Folded boolean field slugs used to restore SQLite integer values. */
var BOOLEAN_FIELDS_FOLDED_COLUMN = "_emdash_boolean_fields";
/** Rank of a row among its translation group's variants, in {@link loadEntriesByGroups}. */
var VARIANT_RANK_COLUMN = "_emdash_variant_rank";
/**
* System columns excluded from entry.data
* Note: slug is intentionally NOT excluded - it's useful as data.slug in templates
*/
var SYSTEM_COLUMNS = /* @__PURE__ */ new Set([
	"id",
	"status",
	"author_id",
	"primary_byline_id",
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at",
	"version",
	"live_revision_id",
	"draft_revision_id",
	"locale",
	"translation_group",
	...SEO_ALIAS_COLUMNS,
	"_emdash_terms",
	"_emdash_bylines",
	"_emdash_bylines_exist",
	SEO_FOLDED_COLUMN,
	BOOLEAN_FIELDS_FOLDED_COLUMN,
	VARIANT_RANK_COLUMN
]);
/** Markers for byline/taxonomy hydration folded into the content query. */
var FOLDED_TERMS = Symbol.for("emdash:foldedTerms");
var FOLDED_BYLINES = Symbol.for("emdash:foldedBylines");
/**
* Marker for whether `_emdash_bylines` has any rows at all (`false` = table
* empty). Lets byline hydration trust an empty fold instead of re-checking
* via the byline query path on sites that never use bylines.
*/
var FOLDED_BYLINES_EXIST = Symbol.for("emdash:foldedBylinesExist");
/**
* Marker for the folded author-fallback byline: the byline linked to the
* entry's `author_id` in the entry's locale, or `null` when there is none.
* Lets byline hydration resolve an entry with no explicit credit without the
* byline query path. Unset when the row's fold predates it.
*/
var FOLDED_AUTHOR_BYLINE = Symbol.for("emdash:foldedAuthorByline");
/**
* Expand the folded `_emdash_seo` JSON column onto the row using SEO_COLUMN_ALIASES,
* so {@link extractSeo} reads it transparently. SQLite returns a JSON string
* (parse it); Postgres returns already-parsed JSON. Missing/malformed/null is
* a no-op: {@link extractSeo} returns null when the aliases are absent.
*/
function isPlainObject(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
/**
* A folded byline object as a `BylineSummary`. The fold's JSON keys are the
* `BylineSummary` keys (see `bylineInner` in {@link foldedHydrationSelects}).
*/
function foldedBylineSummary(raw) {
	const byline = isPlainObject(raw) ? raw : {};
	return {
		...byline,
		isGuest: Boolean(byline.isGuest),
		customFields: {}
	};
}
function creditsFromFoldedBylines(folded) {
	return folded.map((raw) => {
		const credit = isPlainObject(raw) ? raw : {};
		return {
			roleLabel: typeof credit.roleLabel === "string" ? credit.roleLabel : null,
			sortOrder: Number(credit.sortOrder ?? 0),
			source: "explicit",
			byline: foldedBylineSummary(credit.byline)
		};
	}).toSorted((a, b) => a.sortOrder - b.sortOrder);
}
/** The inferred credit for a folded author-fallback byline. */
function creditFromFoldedAuthorByline(raw) {
	return {
		byline: foldedBylineSummary(raw),
		sortOrder: 0,
		roleLabel: null,
		source: "inferred"
	};
}
var TAXONOMY_NAMES_CACHE_KEY = Symbol.for("emdash:taxonomy-names:swr");
var taxonomyNamesStore = globalThis;
taxonomyNamesStore[TAXONOMY_NAMES_CACHE_KEY] ?? (() => {
	const cache = createRevalidatingCache();
	taxonomyNamesStore[TAXONOMY_NAMES_CACHE_KEY] = cache;
	return cache;
})();
/**
* Hidden, symbol-keyed property on each mapped data record carrying raw DB
* values: the string of every date column and, in a collection load, the
* primary sort column's value. Lets cursor encoders downstream reproduce the
* loader's exact `nextCursor` from an entry, whose `data` leaves some columns
* out, parses text that looks like JSON, and holds dates as `Date` objects,
* which lose precision for stored values that aren't already
* ISO-with-milliseconds (e.g. `2026-01-01T00:00:00Z` becomes
* `2026-01-01T00:00:00.000Z`).
*/
var CURSOR_RAW_VALUES = Symbol("emdash:cursorRawValues");
var virtualConfig;
var virtualCreateDialect;
async function loadVirtualConfig() {
	if (virtualConfig === void 0) virtualConfig = (await import("./config_rWUzgpIJ.mjs")).default;
}
async function loadVirtualModules() {
	await loadVirtualConfig();
	if (virtualCreateDialect === void 0) virtualCreateDialect = (await import("./dialect_BQ6hoGf3.mjs")).createDialect;
}
/**
* Sort columns every row has a value for. Their cursors keep the plain
* `{ orderValue, id }` shape; any other sort column can hold NULL.
*/
var NON_NULL_SORT_COLUMNS = /* @__PURE__ */ new Set([
	"id",
	"created_at",
	"updated_at",
	"status",
	"locale"
]);
function sortCursorValue(value) {
	if (typeof value === "string" || typeof value === "number") return value;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (value instanceof Date) return value.toISOString();
	return null;
}
/**
* Encode the cursor for the page after the row whose primary sort column
* `field` holds `value`.
*
* @internal shared with query.ts, which re-encodes cursors from entries.
*/
function encodeSortCursor(field, value, id) {
	const cursorValue = sortCursorValue(value);
	if (NON_NULL_SORT_COLUMNS.has(field)) return encodeCursor(cursorValue === null ? "" : String(cursorValue), id);
	return encodeCursor(JSON.stringify({
		version: 1,
		field,
		value: cursorValue
	}), id);
}
[...SYSTEM_COLUMNS];
var dbInstance = null;
/**
* Get the database instance. Used by query wrapper functions and middleware.
*
* Checks the ALS request context first — if a per-request DB override is set
* (e.g. by DO preview middleware), it takes precedence over the module-level
* cached instance. This allows preview mode to route queries to an isolated
* Durable Object database without modifying any calling code.
*
* Initializes the default database on first call using config from virtual module.
*/
async function getDb() {
	await loadVirtualConfig();
	const ctx = getRequestContext();
	if (ctx?.db) return ctx.db;
	if (!dbInstance) {
		await loadVirtualModules();
		if (!virtualConfig?.database || typeof virtualCreateDialect !== "function") throw new Error("EmDash database not configured. Add database config to emdash() in astro.config.mjs");
		const dialect = virtualCreateDialect(virtualConfig.database.config);
		dbInstance = new Kysely({
			dialect,
			log: kyselyLogOption()
		});
	}
	return dbInstance;
}
export { FOLDED_TERMS as a, encodeSortCursor as c, revalidatingCached as d, peekSeoPanel as f, singleFlightCached as h, FOLDED_BYLINES_EXIST as i, getDb as l, invalidateSingleFlightCache as m, FOLDED_AUTHOR_BYLINE as n, creditFromFoldedAuthorByline as o, createSingleFlightCache as p, FOLDED_BYLINES as r, creditsFromFoldedBylines as s, CURSOR_RAW_VALUES as t, createRevalidatingCache as u };
