import { a as __exportAll, b as resolveConfiguredLocale, h as getLocaleCandidates, m as getI18nConfig, p as getFallbackChain, v as isI18nEnabled } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { i as getRequestContext } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { a as contentCacheNamespaces, n as cachedQuery, o as contentNamespaces, p as invalidateSchemaObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { r as resolveLocale } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { _ as primeSeoPanel, a as FOLDED_TERMS, c as creditsFromFoldedBylines, i as FOLDED_BYLINES_EXIST, n as FOLDED_AUTHOR_BYLINE, r as FOLDED_BYLINES, s as creditFromFoldedAuthorByline, t as CURSOR_RAW_VALUES, u as encodeSortCursor } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { i as resetRegisteredCollectionsCache } from "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
// node_modules/emdash/dist/query-D62NntCZ.mjs
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
var query_exports = /* @__PURE__ */ __exportAll({
	bucketFilter: () => bucketFilter,
	getEditMeta: () => getEditMeta,
	getEmDashCollection: () => getEmDashCollection,
	getEmDashEntry: () => getEmDashEntry,
	getEmDashReferences: () => getEmDashReferences,
	getTranslations: () => getTranslations,
	invalidateUrlPatternCache: () => invalidateUrlPatternCache,
	resolveEmDashPath: () => resolveEmDashPath,
	sliceCollectionResult: () => sliceCollectionResult
});
var COLLECTION_NAME = "_emdash";
/** Symbol key for edit metadata on PT arrays — avoids collision with user data */
var EMDASH_EDIT = Symbol.for("__emdash");
/** Type guard for EditFieldMeta */
function isEditFieldMeta(value) {
	if (typeof value !== "object" || value === null) return false;
	if (!("collection" in value) || !("id" in value) || !("field" in value)) return false;
	const { collection, id, field } = value;
	return typeof collection === "string" && typeof id === "string" && typeof field === "string";
}
/**
* Read edit metadata from a value (returns undefined if not tagged).
* Uses Object.getOwnPropertyDescriptor to access Symbol-keyed property
* without an unsafe type assertion.
*/
function getEditMeta(value) {
	if (value && typeof value === "object") {
		const meta = Object.getOwnPropertyDescriptor(value, EMDASH_EDIT)?.value;
		if (isEditFieldMeta(meta)) return meta;
	}
}
/** Slugs of a collection's Portable Text fields; empty when they can't be read. */
function getPortableTextFieldSlugs(collection) {
	return requestCached(`portable-text-fields:${collection}`, async () => {
		try {
			const { getDb } = await import("./loader-DhnedqY4_BJV41M7E.mjs").then((n) => n.f);
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
* Get a single entry by type and ID/slug
*
* Returns { entry, error, isPreview } for graceful error handling.
* - entry is null if not found (not an error)
* - error is set only for actual errors (db issues, etc.)
*
* Preview mode is detected automatically from request context (ALS).
* When the URL has a valid `_preview` token, the middleware sets preview
* context and this function serves draft revision data if available.
*
* @example
* ```ts
* import { getEmDashEntry } from "emdash";
*
* // Simple usage — preview just works via middleware
* const { entry: post, isPreview, error } = await getEmDashEntry("posts", "my-slug");
* if (!post) return Astro.rewrite("/404");
* ```
*
* @example
* ```ts
* // Opt into reference fields, by field slug
* const { entry: post } = await getEmDashEntry("posts", slug, {
*   references: { author: true, related_posts: { limit: 6 } },
* });
* const author = post?.references?.author.entries[0];
* ```
*/
async function getEmDashEntry(type, id, options) {
	return resolveEmDashEntry(type, id, options);
}
/**
* Attach one page of each selected reference field to a resolved entry, and
* report the cache hint its children contribute.
*
* An entry with no translation group predates i18n and has no links; there is
* nothing to resolve, and `references` stays absent rather than becoming an
* empty object that reads as "this entry references nothing".
*/
async function attachReferences(type, entry, options) {
	const data = entryData(entry);
	const entryGroup = dataStr(data, "translationGroup");
	if (!entryGroup) return {};
	const { resolveReferencePages } = await import("./resolve-BNnm8EkB_DKs9SZLb.mjs");
	const pages = await resolveReferencePages({
		collection: type,
		entryGroup,
		locale: dataStr(data, "locale") || null,
		draftRevisionId: options.draftRevisionId,
		serveDrafts: options.serveDrafts,
		selection: options.selection
	});
	const references = {};
	const tags = [];
	for (const [field, page] of Object.entries(pages)) {
		for (const child of page.entries) tags.push(...child.cacheHint.tags);
		references[field] = {
			entries: page.entries.map((child) => wrapReferencedEntry(page.collection, child)),
			...page.nextCursor === void 0 ? {} : { nextCursor: page.nextCursor }
		};
	}
	entry.references = references;
	return { tags };
}
/**
* Fold the children's cache hint into the entry's own.
*
* A render that shows a referenced entry has read that row, so the route's tags
* have to name it. Without this the route cache's
* `invalidate({ tags: [collection, id] })` on a child write would never reach
* the pages that render the child.
*/
function mergeCacheHints(base, extra) {
	if (!extra.tags?.length && !extra.lastModified) return base;
	const tags = [.../* @__PURE__ */ new Set([...base.tags ?? [], ...extra.tags ?? []])];
	const newest = base.lastModified && extra.lastModified ? base.lastModified > extra.lastModified ? base.lastModified : extra.lastModified : base.lastModified ?? extra.lastModified;
	return {
		...tags.length > 0 ? { tags } : {},
		...newest ? { lastModified: newest } : {}
	};
}
/**
* The object-cache namespaces a selection's targets live in.
*
* Without them a cached parent snapshot would outlive a write to the entries it
* points at. Byline and taxonomy namespaces are deliberately absent: referenced
* entries are loaded without either hydration. The targets are sorted so two
* callers that name the same fields in a different order share one snapshot.
*/
async function referenceTargetNamespaces(collection, selection) {
	const { getReferenceFieldMap } = await import("./field-map-BSXdNGt5_ybTbeb2k.mjs").then((n) => n.t);
	const fieldMap = await getReferenceFieldMap(collection);
	const targets = /* @__PURE__ */ new Set();
	for (const [slug, query] of Object.entries(selection)) {
		if (query === void 0) continue;
		const binding = fieldMap.get(slug);
		if (binding) targets.add(binding.targetCollection);
	}
	return [...targets].toSorted().flatMap((target) => [...contentCacheNamespaces(target)]);
}
/**
* Wrap a referenced entry the way the collection paths wrap their own: an edit
* proxy in edit mode, revision metadata stripped for anyone who may not see it.
*
* The proxy is scoped to the *referenced* entry's collection and row, so
* clicking through from a card opens the entry the card is about.
*/
function wrapReferencedEntry(collection, child) {
	const isEditMode = getRequestContext()?.editMode ?? false;
	const dbId = entryDatabaseId(child);
	if (isEditMode) tagEditableFields(child.data, collection, dbId);
	if (!canExposeRevisionMetadata(child, collection)) stripRevisionMetadata(child);
	return {
		id: child.id,
		data: child.data,
		edit: isEditMode ? createEditable(collection, dbId, entryEditOptions(child)) : createNoop()
	};
}
async function resolveEmDashEntry(type, id, options) {
	const { getLiveEntry } = await import("./_astro_content_C5sLgUjc.mjs");
	const ctx = getRequestContext();
	const preview = ctx?.preview;
	const isEditMode = ctx?.editMode ?? false;
	const isPreviewMode = !!preview && preview.collection === type;
	const serveDrafts = isPreviewMode || isEditMode;
	const rawLocale = options?.locale ?? ctx?.locale;
	const requestedLocale = rawLocale === void 0 ? void 0 : resolveConfiguredLocale(rawLocale);
	const references = options?.references;
	const portableTextFields = isEditMode ? await getPortableTextFieldSlugs(type) : void 0;
	/** Wrap a raw Astro entry with edit proxy, tagging editable fields if needed */
	function wrapEntry(raw) {
		const dbId = entryDatabaseId(raw);
		if (isEditMode) tagEditableFields(entryData(raw), type, dbId, portableTextFields);
		return {
			...raw,
			edit: isEditMode ? createEditable(type, dbId, entryEditOptions(raw)) : createNoop()
		};
	}
	/** Check if an entry has completed publication. */
	function isVisible(entry) {
		return dataStr(entryData(entry), "status") === "published";
	}
	const localeChain = requestedLocale && isI18nEnabled() ? getFallbackChain(requestedLocale) : [requestedLocale];
	/** Return a successful EntryResult with bylines, taxonomy terms and references hydrated */
	async function successResult(wrapped, opts) {
		const draftRevisionId = dataStr(entryData(wrapped), "draftRevisionId") || void 0;
		if (!opts.isPreview) stripRevisionMetadata(wrapped);
		const termLocale = isI18nEnabled() ? dataStr(entryData(wrapped), "locale") || void 0 : void 0;
		const [, , referenceHint] = await Promise.all([
			hydrateEntryBylines(type, [wrapped]),
			hydrateEntryTerms(type, [wrapped], termLocale),
			references ? attachReferences(type, wrapped, {
				selection: references,
				serveDrafts: opts.isPreview,
				draftRevisionId
			}) : Promise.resolve({})
		]);
		return {
			entry: wrapped,
			isPreview: opts.isPreview,
			fallbackLocale: opts.fallbackLocale,
			cacheHint: mergeCacheHints(opts.cacheHint, referenceHint)
		};
	}
	if (serveDrafts) {
		for (let i = 0; i < localeChain.length; i++) {
			const locale = localeChain[i];
			const fallbackLocale = i > 0 ? locale : void 0;
			const { entry: baseEntry, error: baseError, cacheHint } = await getLiveEntry(COLLECTION_NAME, {
				type,
				id,
				locale
			});
			if (baseError) {
				if (baseError.name === "LiveEntryNotFoundError") continue;
				return {
					entry: null,
					error: baseError,
					isPreview: serveDrafts,
					cacheHint: {}
				};
			}
			if (!baseEntry) continue;
			if (isPreviewMode && !isEditMode) {
				const dbId = entryDatabaseId(baseEntry);
				if (preview.id !== dbId && preview.id !== id) {
					if (isVisible(baseEntry)) return successResult(wrapEntry(baseEntry), {
						isPreview: false,
						fallbackLocale,
						cacheHint: cacheHint ?? {}
					});
					continue;
				}
			}
			const draftRevisionId = dataStr(entryData(baseEntry), "draftRevisionId") || void 0;
			if (draftRevisionId) {
				const { entry: draftEntry, error: draftError } = await getLiveEntry(COLLECTION_NAME, {
					type,
					id,
					revisionId: draftRevisionId,
					locale
				});
				if (!draftError && draftEntry) return successResult(wrapEntry(draftEntry), {
					isPreview: serveDrafts,
					fallbackLocale,
					cacheHint: cacheHint ?? {}
				});
			}
			return successResult(wrapEntry(baseEntry), {
				isPreview: serveDrafts,
				fallbackLocale,
				cacheHint: cacheHint ?? {}
			});
		}
		return {
			entry: null,
			isPreview: serveDrafts,
			cacheHint: {}
		};
	}
	const resolveNormal = async () => {
		for (let i = 0; i < localeChain.length; i++) {
			const locale = localeChain[i];
			const fallbackLocale = i > 0 ? locale : void 0;
			const { entry, error, cacheHint } = await getLiveEntry(COLLECTION_NAME, {
				type,
				id,
				locale,
				...locale !== void 0 && getLocaleCandidates(locale).length > 1 ? { publishedOnly: true } : {}
			});
			if (error) {
				if (error.name === "LiveEntryNotFoundError") continue;
				return {
					entry: null,
					error,
					isPreview: false,
					cacheHint: {}
				};
			}
			if (entry && isVisible(entry)) return successResult(wrapEntry(entry), {
				isPreview: false,
				fallbackLocale,
				cacheHint: cacheHint ?? {}
			});
		}
		return {
			entry: null,
			isPreview: false,
			cacheHint: {}
		};
	};
	const namespaces = references ? [...contentNamespaces(type), ...await referenceTargetNamespaces(type, references)] : contentNamespaces(type);
	const referenceKey = references ? `|refs=${stableStringify(references)}` : "";
	const snapshot = await cachedQuery({
		namespace: namespaces,
		key: `entry:v2:${id}|loc=${requestedLocale ?? ""}${referenceKey}`,
		load: async () => {
			const result = await resolveNormal();
			if (result.error) return {
				ok: false,
				error: result.error,
				cacheHint: result.cacheHint
			};
			return {
				ok: true,
				value: {
					entry: result.entry ? entrySnapshot(result.entry) : null,
					isPreview: result.isPreview,
					fallbackLocale: result.fallbackLocale,
					cacheHint: result.cacheHint
				}
			};
		},
		cacheable: (snap) => snap.ok
	});
	if (!snapshot.ok) return {
		entry: null,
		error: snapshot.error,
		isPreview: false,
		cacheHint: snapshot.cacheHint
	};
	const revived = snapshot.value.entry ? reviveEntry(snapshot.value.entry) : null;
	if (revived && !canExposeRevisionMetadata(revived, type)) stripRevisionMetadata(revived);
	if (revived) {
		const { id: rowId, seo } = revived.data;
		if (seo && typeof rowId === "string") primeSeoPanel(type, rowId, seo);
	}
	return {
		entry: revived,
		isPreview: snapshot.value.isPreview,
		fallbackLocale: snapshot.value.fallbackLocale,
		cacheHint: snapshot.value.cacheHint
	};
}
/**
* Get one page of a single reference field, without re-reading the entry it
* hangs off.
*
* `getEmDashEntry({ references })` returns the first page of each field it is
* asked for; this is how a "load more" walks past it, using the `nextCursor`
* that page carried. Draft visibility follows the same request context — a
* preview token for this entry, or edit mode — so a walk started in preview
* keeps seeing the pending selection.
*
* @example
* ```ts
* import { getEmDashReferences } from "emdash";
*
* const more = await getEmDashReferences("posts", post.id, "related_posts", {
*   cursor,
*   limit: 20,
* });
* ```
*/
async function getEmDashReferences(type, id, field, options) {
	const ctx = getRequestContext();
	const preview = ctx?.preview;
	const isEditMode = ctx?.editMode ?? false;
	const rawLocale = options?.locale ?? ctx?.locale;
	const locale = rawLocale === void 0 ? void 0 : resolveConfiguredLocale(rawLocale);
	try {
		const { getDb } = await import("./loader-DhnedqY4_BJV41M7E.mjs").then((n) => n.f);
		const { ContentRepository } = await import("./content-BKHUVsE5_DIOQmEbg.mjs").then((n) => n.n);
		const { resolveReferencePages } = await import("./resolve-BNnm8EkB_DKs9SZLb.mjs");
		const db = await getDb();
		const addressed = splitLocalePrefixedId(id, locale);
		const entry = await new ContentRepository(db).findByIdOrSlug(type, addressed.id, addressed.locale);
		if (!entry?.translationGroup) return { entries: [] };
		const previewMatches = !!preview && preview.collection === type && (preview.id === entry.id || preview.id === id);
		const serveDrafts = isEditMode || previewMatches;
		if (!serveDrafts && entry.status !== "published") return { entries: [] };
		const query = options?.limit === void 0 && options?.cursor === void 0 ? true : {
			limit: options.limit,
			cursor: options.cursor
		};
		const page = (await resolveReferencePages({
			collection: type,
			entryGroup: entry.translationGroup,
			locale: entry.locale,
			draftRevisionId: entry.draftRevisionId ?? void 0,
			serveDrafts,
			selection: { [field]: query }
		}))[field];
		if (!page) return { entries: [] };
		const tags = [];
		for (const child of page.entries) tags.push(...child.cacheHint.tags);
		return {
			entries: page.entries.map((child) => wrapReferencedEntry(page.collection, child)),
			...page.nextCursor === void 0 ? {} : { nextCursor: page.nextCursor },
			cacheHint: { tags }
		};
	} catch (error) {
		return {
			entries: [],
			error: error instanceof Error ? error : new Error(String(error))
		};
	}
}
/**
* Take a locale prefix off an entry id, and read it as the locale to look in.
*
* Wherever i18n prefixes a locale's URLs, an entry is addressed as `fr/about`
* rather than `about` — that is the id the loader builds and the id a render
* holds, including for a referenced entry. Rows are stored under the bare slug,
* so the prefix has to become the locale instead. A first segment that is not a
* configured locale is part of the identifier and stays put.
*/
function splitLocalePrefixedId(id, locale) {
	const slash = id.indexOf("/");
	if (slash === -1) return {
		id,
		locale
	};
	const prefix = id.slice(0, slash);
	if (!getI18nConfig()?.locales.includes(prefix)) return {
		id,
		locale
	};
	return {
		id: id.slice(slash + 1),
		locale: prefix
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
			const { getDb } = await import("./loader-DhnedqY4_BJV41M7E.mjs").then((n) => n.f);
			const { BylineRepository } = await import("./byline-DHJS-GGb_BocecCV6.mjs").then((n) => n.n);
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
		const { getBylinesForEntries } = await import("./bylines-f_ZEc6Sn_Cz4uDRKR.mjs").then((n) => n.t);
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
		const { primeFoldedEntryTerms } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
		primeFoldedEntryTerms(type, perEntry, { locale });
		return;
	}
	try {
		const { getAllTermsForEntries } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
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
/**
* Get all translations of a content item.
*
* Given a content entry, returns all locale variants that share the same
* translation group. This is useful for building language switcher UI.
*
* @example
* ```ts
* import { getEmDashEntry, getTranslations } from "emdash";
*
* const { entry: post } = await getEmDashEntry("posts", "hello-world", { locale: "en" });
* const { translations } = await getTranslations("posts", post.data.id);
* // translations = [{ id: "...", locale: "en", slug: "hello-world", status: "published" }, ...]
* ```
*/
async function getTranslations(type, id) {
	try {
		const db = (await import("./loader-DhnedqY4_BJV41M7E.mjs").then((n) => n.f)).getDb;
		const dbInstance = await db();
		const { ContentRepository } = await import("./content-BKHUVsE5_DIOQmEbg.mjs").then((n) => n.n);
		const repo = new ContentRepository(dbInstance);
		const item = await repo.findByIdOrSlug(type, id);
		if (!item) return {
			translationGroup: "",
			translations: [],
			error: /* @__PURE__ */ new Error(`Content item not found: ${id}`)
		};
		const group = item.translationGroup || item.id;
		return {
			translationGroup: group,
			translations: (await repo.findTranslations(type, group)).map((t) => ({
				id: t.id,
				locale: t.locale || "en",
				slug: t.slug,
				status: t.status
			}))
		};
	} catch (error) {
		return {
			translationGroup: "",
			translations: [],
			error: error instanceof Error ? error : new Error(String(error))
		};
	}
}
var URL_PATTERN_CACHE_KEY = Symbol.for("emdash:url-pattern-cache");
var queryGlobal = globalThis;
var urlPatternCache = queryGlobal[URL_PATTERN_CACHE_KEY] ?? (() => {
	const cache = { patterns: null };
	queryGlobal[URL_PATTERN_CACHE_KEY] = cache;
	return cache;
})();
/**
* Invalidate the cached URL patterns used by resolveEmDashPath.
* Call when collection URL patterns change (schema updates).
*
* Also busts the distributed schema cache (collection metadata such as
* `commentsEnabled`, `supports`, fields read by `getCollectionInfo`) and the
* per-isolate registered-collection-slugs cache used by term counting, since
* every schema-mutation path already routes through here.
*/
function invalidateUrlPatternCache() {
	urlPatternCache.patterns = null;
	resetRegisteredCollectionsCache();
	invalidateSchemaObjectCache();
}
/**
* Resolve a URL path to a content entry by matching against collection URL patterns.
*
* Loads all collections with a `urlPattern` set, converts each pattern to a regex,
* and tests the given path. On match, extracts the slug and fetches the entry.
*
* @example
* ```ts
* import { resolveEmDashPath } from "emdash";
*
* // Given pages with urlPattern "/{slug}" and posts with "/blog/{slug}":
* const result = await resolveEmDashPath("/blog/hello-world");
* if (result) {
*   console.log(result.collection); // "posts"
*   console.log(result.params.slug); // "hello-world"
*   console.log(result.entry.data); // post data
* }
* ```
*/
async function resolveEmDashPath(path) {
	let cachedUrlPatterns = urlPatternCache.patterns;
	if (!cachedUrlPatterns) {
		const { getDb } = await import("./loader-DhnedqY4_BJV41M7E.mjs").then((n) => n.f);
		const { SchemaRegistry } = await import("./registry-B0-O575m_B8jWSyfP.mjs").then((n) => n.r);
		const collections = await new SchemaRegistry(await getDb()).listCollections();
		cachedUrlPatterns = [];
		for (const collection of collections) {
			if (!collection.urlPattern) continue;
			try {
				const { regex, paramNames } = compileUrlPattern(collection.urlPattern);
				cachedUrlPatterns.push({
					slug: collection.slug,
					regex,
					paramNames
				});
			} catch (error) {
				const reason = error instanceof Error ? error.message : String(error);
				console.warn(`[emdash] Skipping URL pattern "${collection.urlPattern}" for collection "${collection.slug}": ${reason}. Update the collection's URL pattern to route its entries.`);
			}
		}
		urlPatternCache.patterns = cachedUrlPatterns;
	}
	for (const pattern of cachedUrlPatterns) {
		const match = path.match(pattern.regex);
		if (!match) continue;
		const params = {};
		for (let i = 0; i < pattern.paramNames.length; i++) params[pattern.paramNames[i]] = match[i + 1];
		const slug = params.slug;
		if (!slug) continue;
		const { entry } = await getEmDashEntry(pattern.slug, slug);
		if (entry) return {
			entry,
			collection: pattern.slug,
			params
		};
	}
	return null;
}
export { getEmDashEntry as a, invalidateUrlPatternCache as c, getEmDashCollection as i, query_exports as l, createNoop as n, getEmDashReferences as o, getEditMeta as r, getTranslations as s, createEditable as t, resolveEmDashPath as u };
