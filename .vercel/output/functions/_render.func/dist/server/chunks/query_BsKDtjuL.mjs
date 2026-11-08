import { s as resolveConfiguredLocale } from "./config_D2Z0BYnM.mjs";
import { i as isMissingTableError, t as resolveLocale } from "./resolve_B0ayaSfr.mjs";
import { a as FOLDED_TERMS, c as encodeSortCursor, i as FOLDED_BYLINES_EXIST, n as FOLDED_AUTHOR_BYLINE, o as creditFromFoldedAuthorByline, r as FOLDED_BYLINES, s as creditsFromFoldedBylines, t as CURSOR_RAW_VALUES } from "./loader_Btw7VAs7.mjs";
import { n as cachedQuery, r as contentNamespaces } from "./object-cache_C1QujUiI.mjs";
import { g as getRequestContext, r as requestCached } from "./request-cache_CXFiINQX.mjs";
import "./collection-slugs-cache_B2aZDvq1.mjs";
// node_modules/emdash/src/visual-editing/editable.ts
/**
* Create an editable proxy for an entry.
*
* Usage:
* - `{...entry.edit}` - entry-level annotation (includes status/hasDraft)
* - `{...entry.edit.title}` - field-level annotation
* - `{...entry.edit['nested.field']}` - nested field (bracket notation)
*/
function createEditable(collection, id, options) {
	const base = {
		collection,
		id,
		...options?.status && { status: options.status },
		...options?.hasDraft && { hasDraft: true }
	};
	return new Proxy({}, {
		get(_, prop) {
			if (prop === "toJSON") return () => ({ "data-emdash-ref": JSON.stringify(base) });
			if (typeof prop === "symbol") return void 0;
			if (prop === "data-emdash-ref") return JSON.stringify(base);
			return { "data-emdash-ref": JSON.stringify({
				...base,
				field: String(prop)
			}) };
		},
		ownKeys() {
			return ["data-emdash-ref"];
		},
		getOwnPropertyDescriptor(_, prop) {
			if (prop === "data-emdash-ref") return {
				configurable: true,
				enumerable: true,
				value: JSON.stringify(base)
			};
		}
	});
}
/**
* Create a noop proxy for production mode.
* Spreading this produces no attributes.
*/
function createNoop() {
	return new Proxy({}, {
		get(_, prop) {
			if (typeof prop === "symbol") return void 0;
		},
		ownKeys() {
			return [];
		},
		getOwnPropertyDescriptor() {}
	});
}
// node_modules/emdash/src/query.ts
var COLLECTION_NAME = "_emdash";
/** Symbol key for edit metadata on PT arrays — avoids collision with user data */
var EMDASH_EDIT = Symbol.for("__emdash");
/** Slugs of a collection's Portable Text fields; empty when they can't be read. */
function getPortableTextFieldSlugs(collection) {
	return requestCached(`portable-text-fields:${collection}`, async () => {
		try {
			const { getDb } = await import("./loader_BqUkLm2j.mjs");
			const rows = await (await getDb()).selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select("f.slug").where("c.slug", "=", collection).where("f.type", "=", "portableText").execute();
			return new Set(rows.map((row) => row.slug));
		} catch (error) {
			if (!isMissingTableError(error)) {
				const msg = error instanceof Error ? error.message : String(error);
				console.warn("[emdash] Failed to load Portable Text fields:", msg);
			}
			return /* @__PURE__ */ new Set();
		}
	});
}
/**
* Tag PT-like arrays in entry data with edit metadata (non-enumerable).
* A PT array is identified by: is an array, first element has _type property.
* An empty one is identified by its field being in `portableTextFields`, and
* a missing or blank one becomes an empty array, so the page can still render
* an editor for it.
*/
function tagEditableFields(data, collection, id, portableTextFields = /* @__PURE__ */ new Set()) {
	for (const field of portableTextFields) {
		const value = data[field];
		if (value == null || typeof value === "string" && !value.trim()) data[field] = [];
	}
	for (const [field, value] of Object.entries(data)) {
		if (!Array.isArray(value)) continue;
		const first = value[0];
		if (value.length === 0 ? portableTextFields.has(field) : typeof first === "object" && first !== null && "_type" in first) Object.defineProperty(value, EMDASH_EDIT, {
			value: {
				collection,
				id,
				field
			},
			enumerable: false,
			configurable: true
		});
	}
}
/** Safely read a string field from a Record, with optional fallback */
function dataStr(data, key, fallback = "") {
	const val = data[key];
	return typeof val === "string" ? val : fallback;
}
/** Type guard for Record<string, unknown> */
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Extract data as Record from an Astro entry (which is any-typed) */
function entryData(entry) {
	return isRecord(entry.data) ? entry.data : {};
}
/** Extract the database ID from entry data (data.id is the ULID, entry.id is the slug) */
function entryDatabaseId(entry) {
	return dataStr(entryData(entry), "id") || entry.id;
}
/** Extract edit options from entry data for the proxy */
function entryEditOptions(entry) {
	const data = entryData(entry);
	const status = dataStr(data, "status", "draft");
	const draftRevisionId = dataStr(data, "draftRevisionId") || void 0;
	const liveRevisionId = dataStr(data, "liveRevisionId") || void 0;
	return {
		status,
		hasDraft: !!draftRevisionId && draftRevisionId !== liveRevisionId
	};
}
function stripRevisionMetadata(entry) {
	const data = entryData(entry);
	delete data.draftRevisionId;
	delete data.liveRevisionId;
}
function canExposeRevisionMetadata(entry, collection) {
	const ctx = getRequestContext();
	if (ctx?.editMode) return true;
	if (ctx?.preview?.collection !== collection) return false;
	const dbId = entryDatabaseId(entry);
	return ctx.preview.id === dbId || ctx.preview.id === entry.id;
}
/**
* Get all entries of a content type
*
* Returns { entries, error } for graceful error handling.
*
* When emdash-env.d.ts is generated, the collection name will be
* type-checked and the return type will be inferred automatically.
*
* @example
* ```ts
* import { getEmDashCollection } from "emdash";
*
* const { entries: posts, error } = await getEmDashCollection("posts");
* if (error) {
*   console.error("Failed to load posts:", error);
*   return;
* }
* // posts[0].data.title is typed (if emdash-env.d.ts exists)
*
* // With filters
* const { entries: drafts } = await getEmDashCollection("posts", { status: "draft" });
* ```
*/
async function getEmDashCollection(type, filter) {
	const bucketed = bucketFilter(filter);
	const ctx = getRequestContext();
	const serveDrafts = ctx?.editMode === true || ctx?.preview !== void 0;
	const cached = await requestCached(collectionCacheKey(type, bucketed.fetchFilter), () => serveDrafts ? getEmDashCollectionUncached(type, bucketed.fetchFilter) : loadCollectionCached(type, bucketed.fetchFilter));
	return bucketed.requestedLimit === void 0 ? cached : sliceCollectionResult(cached, bucketed.requestedLimit, filter?.orderBy);
}
/**
* Distributed (L2) read-through around {@link getEmDashCollectionUncached}.
*
* Caches a JSON-safe snapshot keyed by collection + filter + effective locale,
* folding the shared `bylines`/`taxonomies` epochs into the key so renaming an
* author or term invalidates affected lists. Errors are never cached.
*/
async function loadCollectionCached(type, filter) {
	const snapshot = await cachedQuery({
		namespace: contentNamespaces(type),
		key: `collection:v2:${collectionCacheKey(type, filter)}|loc=${effectiveLocaleKey(filter)}`,
		load: async () => {
			const result = await getEmDashCollectionUncached(type, filter);
			if (result.error) return {
				ok: false,
				error: result.error,
				cacheHint: result.cacheHint
			};
			return {
				ok: true,
				value: {
					entries: result.entries.map(entrySnapshot),
					nextCursor: result.nextCursor,
					hasMore: result.hasMore,
					cacheHint: result.cacheHint
				}
			};
		},
		cacheable: (snap) => snap.ok
	});
	if (!snapshot.ok) return {
		entries: [],
		error: snapshot.error,
		cacheHint: snapshot.cacheHint
	};
	return {
		entries: snapshot.value.entries.map((entry) => {
			const revived = reviveEntry(entry);
			if (!canExposeRevisionMetadata(revived, type)) stripRevisionMetadata(revived);
			return revived;
		}),
		nextCursor: snapshot.value.nextCursor,
		hasMore: snapshot.value.hasMore,
		cacheHint: snapshot.value.cacheHint
	};
}
/**
* Threshold for limit bucketing. Page templates routinely render small
* "recent posts" widgets at limits 3-8; rounding those up to a single
* shared bucket lets one fetch satisfy several widgets within a request.
* Above this, the requested limit is honoured exactly — bucketing limit:50
* to limit:64 would waste hydration work for callers fetching real pages.
*/
var BUCKET_LIMIT_THRESHOLD = 10;
/** @internal exported for unit tests; not part of the public API. */
function bucketFilter(filter) {
	const limit = filter?.limit;
	if (limit === void 0 || limit >= BUCKET_LIMIT_THRESHOLD || limit <= 0 || filter?.cursor !== void 0 || filter?.offset !== void 0) return {
		fetchFilter: filter,
		requestedLimit: void 0
	};
	return {
		fetchFilter: {
			...filter,
			limit: BUCKET_LIMIT_THRESHOLD
		},
		requestedLimit: limit
	};
}
/**
* Slice a cached bucketed result down to the originally-requested limit
* and recompute `nextCursor` from the row that would have been the
* over-fetch detector for that limit. When truncation is needed, returns
* a shallow-copied result with a new `entries` array; otherwise returns
* the cached result unchanged (including error results and results
* already within the requested limit).
*/
/** @internal exported for unit tests; not part of the public API. */
function sliceCollectionResult(cached, limit, orderBy) {
	if (cached.error) return cached;
	if (cached.entries.length <= limit) return cached;
	const sliced = cached.entries.slice(0, limit);
	const lastEntry = sliced.at(-1);
	const nextCursor = lastEntry ? encodeEntryCursor(lastEntry, orderBy) : void 0;
	return {
		...cached,
		entries: sliced,
		nextCursor,
		hasMore: true
	};
}
/** Map of database column names to camelCase keys present on entry.data. */
var ENTRY_DATA_KEY_MAP = {
	created_at: "createdAt",
	updated_at: "updatedAt",
	published_at: "publishedAt",
	scheduled_at: "scheduledAt",
	author_id: "authorId",
	primary_byline_id: "primaryBylineId"
};
var FIELD_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
/**
* Encode a `nextCursor` from a content entry, as the loader encodes one from
* the entry's row. Reads the sort column's raw DB value the loader stashed via
* CURSOR_RAW_VALUES, since `entry.data` can't reproduce it for every column.
*/
function encodeEntryCursor(entry, orderBy) {
	const data = entryData(entry);
	const id = dataStr(data, "id");
	if (!id) return void 0;
	let dbField = "created_at";
	if (orderBy) {
		for (const field of Object.keys(orderBy)) if (FIELD_NAME_PATTERN.test(field)) {
			dbField = field;
			break;
		}
	}
	const rawValues = Reflect.get(data, CURSOR_RAW_VALUES);
	if (rawValues !== null && typeof rawValues === "object" && Object.hasOwn(rawValues, dbField)) return encodeSortCursor(dbField, Reflect.get(rawValues, dbField), id);
	return encodeSortCursor(dbField, data[ENTRY_DATA_KEY_MAP[dbField] ?? dbField], id);
}
/**
* Build a canonical cache key for `getEmDashCollection`.
*
* `JSON.stringify` is insertion-order-sensitive, so two callers passing
* semantically identical filters with different key orders would miss
* the cache. We fix the top-level field order and sort `where` keys
* (order there is irrelevant), while preserving `orderBy` key order
* because that's the sort priority.
*/
function collectionCacheKey(type, filter) {
	if (!filter) return `collection:${type}:`;
	return `collection:${type}:${[
		filter.status ?? "",
		filter.limit ?? "",
		filter.cursor ?? "",
		filter.offset ?? "",
		filter.where ? stableStringify(filter.where) : "",
		filter.orderBy ? JSON.stringify(filter.orderBy) : "",
		filter.locale === void 0 ? "" : resolveConfiguredLocale(filter.locale)
	].join("|")}`;
}
function stableStringify(value) {
	return JSON.stringify(stableOrder(value));
}
function stableOrder(value) {
	const keys = Object.keys(value).toSorted();
	const ordered = {};
	for (const k of keys) {
		const v = value[k];
		if (isRecord(v)) ordered[k] = stableOrder(v);
		else ordered[k] = v;
	}
	return ordered;
}
/** Enumerable field carrying the {@link CURSOR_RAW_VALUES} payload in snapshots. */
var CURSOR_RAW_FIELD = "__emdashCursorRaw";
function dataSnapshot(data) {
	const rawCursor = Reflect.get(data, CURSOR_RAW_VALUES);
	return {
		...data,
		[CURSOR_RAW_FIELD]: rawCursor ?? {}
	};
}
function reviveData(raw) {
	const data = { ...raw };
	const rawCursor = data[CURSOR_RAW_FIELD] ?? {};
	delete data[CURSOR_RAW_FIELD];
	Object.defineProperty(data, CURSOR_RAW_VALUES, {
		value: rawCursor,
		enumerable: false,
		configurable: false,
		writable: false
	});
	return data;
}
function entrySnapshot(entry) {
	const { edit: _edit, references, ...rest } = entry;
	return {
		...rest,
		data: dataSnapshot(entryData(entry)),
		...references ? { references: referencesSnapshot(references) } : {}
	};
}
function referencesSnapshot(references) {
	const snapshot = {};
	for (const [field, page] of Object.entries(references)) snapshot[field] = {
		entries: page.entries.map((child) => ({
			id: child.id,
			data: dataSnapshot(entryData(child))
		})),
		...page.nextCursor === void 0 ? {} : { nextCursor: page.nextCursor }
	};
	return snapshot;
}
/**
* Rebuild the reference pages a snapshot carried.
*
* Every child comes back with a no-op `edit` proxy and no revision metadata,
* which is lossless: the object cache is bypassed for edit-mode and preview
* requests, so a snapshot is only ever written — and read back — by a render
* that had neither to begin with.
*/
function reviveReferences(raw) {
	if (!isRecord(raw)) return void 0;
	const references = {};
	for (const [field, page] of Object.entries(raw)) {
		const snapshot = page;
		references[field] = {
			entries: snapshot.entries.map((child) => ({
				id: child.id,
				data: reviveData(child.data),
				edit: createNoop()
			})),
			...snapshot.nextCursor === void 0 ? {} : { nextCursor: snapshot.nextCursor }
		};
	}
	return references;
}
function reviveEntry(raw) {
	const entry = raw;
	const data = reviveData(entry.data);
	const references = reviveReferences(entry.references);
	return {
		...entry,
		data,
		...references ? { references } : {},
		edit: createNoop()
	};
}
/** Resolve the effective locale used by content reads, for the L2 cache key. */
function effectiveLocaleKey(filter) {
	return resolveLocale(filter?.locale) ?? "";
}
async function getEmDashCollectionUncached(type, filter) {
	const { getLiveCollection } = await import("./_astro_content_C5sLgUjc.mjs");
	const ctx = getRequestContext();
	const resolvedLocale = resolveLocale(filter?.locale);
	const requestedLimit = filter?.limit;
	const pageParam = filter?.cursor !== void 0 ? { cursor: filter.cursor } : filter?.offset !== void 0 ? { offset: filter.offset } : {};
	const draftRevisions = ctx?.editMode ? "all" : ctx?.preview?.collection === type ? { id: ctx.preview.id } : void 0;
	const { entries, error, cacheHint } = await getLiveCollection(COLLECTION_NAME, {
		type,
		status: filter?.status,
		limit: requestedLimit && requestedLimit > 0 ? requestedLimit + 1 : filter?.limit,
		...pageParam,
		where: filter?.where,
		orderBy: filter?.orderBy,
		locale: resolvedLocale,
		draftRevisions
	});
	if (error) return {
		entries: [],
		error,
		cacheHint: {}
	};
	const hasMore = requestedLimit != null && requestedLimit > 0 && entries.length > requestedLimit;
	const pageEntries = hasMore ? entries.slice(0, requestedLimit) : entries;
	const nextCursor = hasMore ? encodeEntryCursor(pageEntries.at(-1), filter?.orderBy) : void 0;
	const hasMoreResult = requestedLimit != null && requestedLimit > 0 ? hasMore : void 0;
	const isEditMode = ctx?.editMode ?? false;
	const portableTextFields = isEditMode && pageEntries.length > 0 ? await getPortableTextFieldSlugs(type) : void 0;
	const entriesWithEdit = pageEntries.map((entry) => {
		const dbId = entryDatabaseId(entry);
		if (isEditMode) tagEditableFields(entryData(entry), type, dbId, portableTextFields);
		if (!canExposeRevisionMetadata(entry, type)) stripRevisionMetadata(entry);
		return {
			...entry,
			edit: isEditMode ? createEditable(type, dbId, entryEditOptions(entry)) : createNoop()
		};
	});
	await Promise.all([hydrateEntryBylines(type, entriesWithEdit), hydrateEntryTerms(type, entriesWithEdit, resolvedLocale)]);
	return {
		entries: entriesWithEdit,
		nextCursor,
		hasMore: hasMoreResult,
		cacheHint: cacheHint ?? {}
	};
}
/**
* Eagerly hydrate byline data onto entry.data for one or more entries.
*
* Attaches `bylines` (array of ContentBylineCredit) and `byline`
* (primary BylineSummary or null) to each entry's data object.
* Uses batch queries to avoid N+1.
*
* Fails silently if the byline tables don't exist yet (pre-migration).
*/
async function hydrateEntryBylines(type, entries) {
	if (entries.length === 0) return;
	if (entries.every((e) => FOLDED_BYLINES in entryData(e))) {
		const parsed = entries.map((entry) => {
			const data = entryData(entry);
			const folded = Reflect.get(data, FOLDED_BYLINES);
			const credits = creditsFromFoldedBylines(Array.isArray(folded) ? folded : []);
			const authorFolded = FOLDED_AUTHOR_BYLINE in data && dataStr(data, "locale") !== "";
			if (credits.length === 0 && authorFolded && dataStr(data, "primaryBylineId") === "") {
				const author = Reflect.get(data, FOLDED_AUTHOR_BYLINE);
				if (dataStr(data, "authorId") !== "" && isRecord(author)) credits.push(creditFromFoldedAuthorByline(author));
			}
			return {
				data,
				credits,
				complete: credits.length > 0 || authorFolded
			};
		});
		let needsQueryPath = !entries.every((e) => Reflect.get(entryData(e), FOLDED_BYLINES_EXIST) === false) && parsed.some((p) => !p.complete && (dataStr(p.data, "authorId") !== "" || dataStr(p.data, "primaryBylineId") !== ""));
		const summaries = parsed.flatMap((p) => p.credits.map((c) => c.byline));
		if (!needsQueryPath && summaries.length > 0) try {
			const { getDb } = await import("./loader_BqUkLm2j.mjs");
			const { BylineRepository } = await import("./byline_hX3RknOn.mjs");
			await new BylineRepository(await getDb()).hydrateBylineCustomFields(summaries);
		} catch (error) {
			if (!isMissingTableError(error)) needsQueryPath = true;
		}
		if (!needsQueryPath) {
			for (const p of parsed) {
				p.data.bylines = p.credits;
				p.data.byline = p.credits[0]?.byline ?? null;
			}
			return;
		}
	}
	try {
		const { getBylinesForEntries } = await import("./bylines_Cu_yELGR.mjs");
		const refs = entries.map((e) => {
			const data = entryData(e);
			const id = dataStr(data, "id");
			if (!id) return null;
			return {
				id,
				authorId: dataStr(data, "authorId") || null,
				primaryBylineId: dataStr(data, "primaryBylineId") || null,
				locale: dataStr(data, "locale") || null
			};
		}).filter((r) => r !== null);
		if (refs.length === 0) return;
		const bylinesMap = await getBylinesForEntries(type, refs);
		for (const entry of entries) {
			const data = entryData(entry);
			const dbId = dataStr(data, "id");
			if (!dbId) continue;
			const credits = bylinesMap.get(dbId) ?? [];
			data.bylines = credits;
			data.byline = credits[0]?.byline ?? null;
		}
	} catch (err) {
		if (!isMissingTableError(err)) {
			const msg = err instanceof Error ? err.message : String(err);
			console.warn("[emdash] Failed to hydrate bylines:", msg);
		}
	}
}
/**
* Eagerly hydrate taxonomy term data onto entry.data for one or more entries.
*
* Attaches `terms` (Record keyed by taxonomy name with an array of TaxonomyTerm
* values) to each entry's data object. Uses a single batched JOIN query across
* all taxonomies so the cost is O(1) regardless of the number of entries or
* taxonomies on the site.
*
* This eliminates the common N+1 pattern where templates loop over list
* results and call getEntryTerms() per entry. With hydration, the list page
* stays at a single round-trip for term data.
*
* `locale` is the preferred locale the entries were resolved to. Each assigned
* group resolves that variant first, then the configured default. When it is
* omitted, the stored locale of each content row is preferred.
*
* Fails silently if the taxonomy tables don't exist yet (pre-migration).
*/
async function hydrateEntryTerms(type, entries, locale) {
	if (entries.length === 0) return;
	if (entries.every((e) => FOLDED_TERMS in entryData(e))) {
		const perEntry = [];
		for (const entry of entries) {
			const data = entryData(entry);
			const folded = Reflect.get(data, FOLDED_TERMS);
			const rows = Array.isArray(folded) ? folded : [];
			const grouped = {};
			for (const r of rows) {
				const name = String(r?.name);
				(grouped[name] ??= []).push({
					id: r?.id,
					name,
					slug: r?.slug,
					label: r?.label,
					parentId: r?.parent_id ?? void 0,
					children: [],
					locale: r?.locale,
					translationGroup: r?.translation_group
				});
			}
			for (const [name, arr] of Object.entries(grouped)) grouped[name] = arr.toSorted((a, b) => String(a.label).localeCompare(String(b.label)));
			data.terms = grouped;
			const entryId = dataStr(data, "id");
			if (entryId) perEntry.push({
				entryId,
				byTaxonomy: grouped
			});
		}
		const { primeFoldedEntryTerms } = await import("./taxonomies_CWxT83MW.mjs");
		primeFoldedEntryTerms(type, perEntry, { locale });
		return;
	}
	try {
		const { getAllTermsForEntries } = await import("./taxonomies_CWxT83MW.mjs");
		const ids = entries.map((e) => dataStr(entryData(e), "id")).filter(Boolean);
		if (ids.length === 0) return;
		const termsMap = await getAllTermsForEntries(type, ids, { locale });
		for (const entry of entries) {
			const data = entryData(entry);
			const dbId = dataStr(data, "id");
			if (!dbId) continue;
			data.terms = termsMap.get(dbId) ?? {};
		}
	} catch (err) {
		if (!isMissingTableError(err)) {
			const msg = err instanceof Error ? err.message : String(err);
			console.warn("[emdash] Failed to hydrate terms:", msg);
		}
	}
}
var URL_PATTERN_CACHE_KEY = Symbol.for("emdash:url-pattern-cache");
var queryGlobal = globalThis;
queryGlobal[URL_PATTERN_CACHE_KEY] ?? (() => {
	const cache = { patterns: null };
	queryGlobal[URL_PATTERN_CACHE_KEY] = cache;
	return cache;
})();
export { getEmDashCollection as n, sliceCollectionResult as r, bucketFilter as t };
