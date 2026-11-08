import { a as __exportAll, g as getLocaleChainRank, h as getLocaleCandidates, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { i as compoundSelectLimit, n as buildStatusCondition } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { i as getRequestContext } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as storedLocaleOrder, n as localeMatches, r as localeOrder, t as canonicalLocaleColumn } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { a as contentCacheNamespaces, g as isObjectCacheActive, m as invalidateTaxonomyObjectCache, n as cachedQuery, t as CacheNamespace } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { i as setRequestCacheEntry, n as peekRequestCache, r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { i as resolveLocaleChain, r as resolveLocale } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { r as taxonomyTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import { f as getDb, g as parseTaxonomyCollections, o as createRevalidatingCache, p as invalidateRevalidatingCache, v as resetTaxonomyNamesCache, x as selectTaxonomyDefs, y as revalidatingCached } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { n as noteStaleRegisteredCollections, t as filterToRegisteredCollections } from "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/taxonomies-B__VmCKQ.mjs
/**
* Per-collection count branch. `taxonomy_id` stores the term's
* translation_group, so results are keyed by group (locale-independent) and
* each assignment is counted once per content translation group. When a
* locale is provided, only that group's matching content row contributes.
*
* Scoping to the taxonomy uses `translation_group IN (...)` rather than a
* join on `taxonomies.id` — the anchor row (id == group) can be deleted while
* sibling translations survive, and a plain join on `translation_group` would
* multiply counts by the number of locales.
*
* CROSS JOIN with the join predicate in WHERE keeps stats-blind SQLite/D1 from
* reordering content_taxonomies out of the outer position; it touches ec_* only
* through the translation-group index. Postgres treats this as an ordinary
* inner join and plans freely.
*/
function collectionBranch(db, taxonomyName, collection, locale) {
	return sql`
		SELECT ct.taxonomy_id AS taxonomy_id, COUNT(DISTINCT e.translation_group) AS count
		FROM content_taxonomies AS ct
		CROSS JOIN ${sql.ref(`ec_${collection}`)} AS e
		WHERE e.translation_group = ct.entry_id
			AND ct.collection = ${collection}
			AND ct.taxonomy_id IN (SELECT translation_group FROM taxonomies WHERE name = ${taxonomyName})
			${locale ? sql`AND ${localeMatches("e.locale", locale)}` : sql``}
			AND ${buildStatusCondition(db, "published", "e")}
			AND e.deleted_at IS NULL
		GROUP BY ct.taxonomy_id`;
}
async function runCounts(db, taxonomyName, collections, locale) {
	const branches = collections.map((collection) => collectionBranch(db, taxonomyName, collection, locale));
	const result = await sql`
		SELECT taxonomy_id, SUM(count) AS count
		FROM (${sql.join(branches, sql` UNION ALL `)}) AS per_collection
		GROUP BY taxonomy_id`.execute(db);
	const counts = /* @__PURE__ */ new Map();
	for (const row of result.rows) counts.set(row.taxonomy_id, Number(row.count));
	return counts;
}
function addCounts(into, from) {
	for (const [group, count] of from) into.set(group, (into.get(group) ?? 0) + count);
}
/**
* Counts for one batch of collections, degrading to a query per collection
* when a declared collection has no ec_* table so the rest still contribute.
*/
async function runBatch(db, taxonomyName, collections, locale) {
	try {
		return await runCounts(db, taxonomyName, collections, locale);
	} catch (error) {
		if (!isMissingTableError(error)) throw error;
		noteStaleRegisteredCollections();
	}
	const counts = /* @__PURE__ */ new Map();
	for (const collection of collections) try {
		addCounts(counts, await runCounts(db, taxonomyName, [collection], locale));
	} catch (error) {
		if (!isMissingTableError(error)) throw error;
	}
	return counts;
}
/**
* Count publicly-visible term assignments for one taxonomy, keyed by the
* term's translation_group (what `content_taxonomies.taxonomy_id` stores).
* When `locale` is provided, only entries in that locale contribute. Omitting
* it preserves the locale-agnostic API used by legacy callers.
*
* Counts are scoped to the taxonomy's declared collections — pass
* `TaxonomyDef.collections` (`_emdash_taxonomy_defs.collections`). Declared
* collections without a `_emdash_collections` row (the migration-seeded
* defaults declare `posts` unconditionally) are filtered out before any SQL
* is built, so no statement referencing a missing `ec_*` table is sent — a
* failed statement is logged by the database even when the caller recovers,
* flooding D1 observability with phantom errors. The missing-table guards in
* `runBatch` stay as the backstop for registry/table drift (e.g. a partially
* applied D1 create) and for a table dropped mid-flight, yielding a
* partial-but-correct count rather than a throw.
*
* One database round-trip for the whole taxonomy (UNION ALL across
* collections). On a backend that caps compound-SELECT terms — D1 allows five
* — the branches are split into one statement per batch, since a taxonomy
* declaring more collections than that would otherwise take down every path
* that shows counts. Per-collection sums are commutative, so batching cannot
* change the total.
*
* Callers on the public render path should go through the request-cached
* wrapper in `taxonomies/index.ts` so a page rendering both the widget and a
* term detail shares one computation.
*/
async function fetchVisibleTermCounts(db, taxonomyName, collections, locale) {
	const unique = [...new Set(collections)];
	for (const collection of unique) validateIdentifier(collection, "collection slug");
	if (unique.length === 0) return /* @__PURE__ */ new Map();
	const present = await filterToRegisteredCollections(db, unique);
	if (present.length === 0) return /* @__PURE__ */ new Map();
	const limit = compoundSelectLimit(db);
	const batched = limit === null ? [present] : chunks(present, limit);
	const batches = await Promise.all(batched.map((batch) => runBatch(db, taxonomyName, batch, locale)));
	const counts = /* @__PURE__ */ new Map();
	for (const batch of batches) addCounts(counts, batch);
	return counts;
}
/**
* Runtime API for taxonomies.
*
* All helpers are locale-aware. When a locale is not passed explicitly we fall
* back to the request context or the configured `defaultLocale` (see
* `i18n/resolve.ts`).
*
* Because `content_taxonomies.taxonomy_id` stores the translation_group (not a
* specific term id), and `entry_id` stores the content translation_group, one
* assignment resolves to the requested locale on both sides.
*/
var taxonomies_exports = /* @__PURE__ */ __exportAll({
	getAllTermsForEntries: () => getAllTermsForEntries,
	getEntriesByTerm: () => getEntriesByTerm,
	getEntryTerms: () => getEntryTerms,
	getTaxonomyDef: () => getTaxonomyDef,
	getTaxonomyDefs: () => getTaxonomyDefs,
	getTaxonomyTerms: () => getTaxonomyTerms,
	getTaxonomyTermsWithCacheHint: () => getTaxonomyTermsWithCacheHint,
	getTerm: () => getTerm,
	getTermsForEntries: () => getTermsForEntries,
	invalidateTaxonomyDefsCache: () => invalidateTaxonomyDefsCache,
	invalidateTermCache: () => invalidateTermCache,
	primeFoldedEntryTerms: () => primeFoldedEntryTerms
});
async function selectEntryTermRows(db, collection, entryIds, taxonomyName, locale) {
	validateIdentifier(collection, "collection slug");
	const tableName = `ec_${collection}`;
	const defaultLocale = getI18nConfig()?.defaultLocale ?? "en";
	const preferredMatch = locale ? localeMatches("exact_term.locale", locale) : sql`${canonicalLocaleColumn("exact_term.locale")} = ${canonicalLocaleColumn("content.locale")}`;
	const defaultMatch = localeMatches("default_term.locale", defaultLocale);
	const hasAliases = Object.keys(getI18nConfig()?.localeAliases ?? {}).length > 0;
	return (await sql`
		SELECT content.id AS entry_id,
			coalesce(exact_term.id, default_term.id) AS id,
			coalesce(exact_term.name, default_term.name) AS name,
			coalesce(exact_term.slug, default_term.slug) AS slug,
			coalesce(exact_term.label, default_term.label) AS label,
			coalesce(exact_term.parent_id, default_term.parent_id) AS parent_id,
			coalesce(exact_term.locale, default_term.locale) AS locale,
			coalesce(exact_term.translation_group, default_term.translation_group) AS translation_group
		FROM ${sql.ref(tableName)} AS content
		INNER JOIN content_taxonomies AS pivot
			ON pivot.entry_id = content.translation_group
			AND pivot.collection = ${collection}
		LEFT JOIN taxonomies AS exact_term
			ON exact_term.translation_group = pivot.taxonomy_id
			AND ${preferredMatch}
			${hasAliases ? sql`AND exact_term.id = (
				SELECT candidate.id FROM taxonomies AS candidate
				WHERE candidate.translation_group = pivot.taxonomy_id
					AND ${locale ? localeMatches("candidate.locale", locale) : sql`${canonicalLocaleColumn("candidate.locale")} = ${canonicalLocaleColumn("content.locale")}`}
				ORDER BY ${locale ? localeOrder("candidate.locale", locale) : storedLocaleOrder("candidate.locale")}, candidate.id LIMIT 1
			)` : sql``}
		LEFT JOIN taxonomies AS default_term
			ON default_term.translation_group = pivot.taxonomy_id
			AND ${defaultMatch}
			${hasAliases ? sql`AND default_term.id = (
				SELECT candidate.id FROM taxonomies AS candidate
				WHERE candidate.translation_group = pivot.taxonomy_id
					AND ${localeMatches("candidate.locale", defaultLocale)}
				ORDER BY ${localeOrder("candidate.locale", defaultLocale)}, candidate.id LIMIT 1
			)` : sql``}
		WHERE content.id IN (${sql.join(entryIds.map((id) => sql`${id}`))})
			AND coalesce(exact_term.id, default_term.id) IS NOT NULL
			${taxonomyName ? sql`AND coalesce(exact_term.name, default_term.name) = ${taxonomyName}` : sql``}
		ORDER BY coalesce(exact_term.label, default_term.label) ASC,
			coalesce(exact_term.id, default_term.id) ASC
	`.execute(db)).rows;
}
/** Invalidate cached taxonomy term data and any content that hydrates terms. */
function invalidateTermCache() {
	invalidateTaxonomyObjectCache();
}
/**
* Every locale's definition rows, revalidated in the background after 30 seconds.
* The optional object cache remains authoritative when configured; isolated
* databases bypass the isolate snapshot.
*/
var TAXONOMY_DEFS_CACHE_KEY = Symbol.for("emdash:taxonomy-defs:swr");
var taxonomyDefsStore = globalThis;
var defsCache = taxonomyDefsStore[TAXONOMY_DEFS_CACHE_KEY] ?? (() => {
	const c = createRevalidatingCache();
	taxonomyDefsStore[TAXONOMY_DEFS_CACHE_KEY] = c;
	return c;
})();
/**
* Invalidate the isolate-wide taxonomy-definitions cache (and the related
* loader taxonomy-names cache). Called from every taxonomy-def write path
* (`handleTaxonomyCreate`/`Update`/`Delete`, seed application). Other isolates
* pick up remote changes through background revalidation.
*/
function invalidateTaxonomyDefsCache() {
	invalidateRevalidatingCache(defsCache);
	resetTaxonomyNamesCache();
	invalidateTaxonomyObjectCache();
}
/** Every locale's definition rows, straight from the database (no caching). */
async function fetchTaxonomyDefRows() {
	return (await selectTaxonomyDefs(await getDb()).orderBy("d.name", "asc").orderBy("d.locale", "asc").execute()).map(rowToTaxonomyDef);
}
/**
* Resolve the definition rows through the isolate fallback cache, bypassing it
* for isolated databases.
*/
function loadTaxonomyDefRows() {
	if (getRequestContext()?.dbIsIsolated) return fetchTaxonomyDefRows();
	return revalidatingCached(defsCache, fetchTaxonomyDefRows, (error) => console.error("[emdash:taxonomies] revalidating taxonomy definitions failed:", error));
}
/**
* Every locale's definition rows. Two-tier cache: per-request via
* `requestCached`, then the object cache when configured, else the isolate
* holder, so warm renders issue zero queries whatever locale they ask for.
*/
function getTaxonomyDefRows() {
	return requestCached("taxonomy-def-rows", async () => {
		if (await isObjectCacheActive()) return cachedQuery({
			namespace: CacheNamespace.TAXONOMIES,
			key: "defRows",
			load: fetchTaxonomyDefRows
		});
		return loadTaxonomyDefRows();
	});
}
/**
* One definition per taxonomy, in the first locale of `chain` that has one.
* A taxonomy with no definition anywhere on the chain still resolves, to its
* default-locale row or else its lowest locale: its structure is the same in
* every locale, and only the label falls back.
*/
function resolveDefs(rows, chain) {
	const defaultLocale = getI18nConfig()?.defaultLocale;
	const preference = defaultLocale === void 0 ? chain : [...chain, defaultLocale];
	const byName = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const current = byName.get(row.name);
		if (!current || getLocaleChainRank(row.locale, preference) < getLocaleChainRank(current.locale, preference)) byName.set(row.name, row);
	}
	return [...byName.values()];
}
/**
* Get every taxonomy definition, one per taxonomy, labelled for the active
* locale (see `resolveDefs` for the fallback).
*/
async function getTaxonomyDefs(options = {}) {
	const chain = resolveLocaleChain(options.locale);
	return requestCached(`taxonomy-defs:${chain.join(",")}`, async () => resolveDefs(await getTaxonomyDefRows(), chain));
}
/**
* Get a single taxonomy definition by name, labelled for the active locale.
* Resolves whenever the taxonomy is defined in any locale (see `resolveDefs`).
*/
async function getTaxonomyDef(name, options = {}) {
	return (await getTaxonomyDefs(options)).find((def) => def.name === name) ?? null;
}
/**
* Object-cache namespaces for values that embed visible term counts: the
* taxonomy epoch (term/assignment writes) plus each counted collection's
* content epoch, so publishing, unpublishing, or trashing an entry
* invalidates the cached count promptly. Both content namespace generations
* participate so rolling deployments preserve invalidation in either direction.
*/
function termCountNamespaces(collections) {
	return [...[...new Set(collections)].flatMap((collection) => contentCacheNamespaces(collection)), CacheNamespace.TAXONOMIES];
}
/**
* All terms of a taxonomy in a specific locale (flat for non-hierarchical,
* tree for hierarchical).
*
* The term list and the visible-entry counts are loaded and cached separately:
* the list depends only on the taxonomy epoch, while the counts additionally
* depend on every counted collection's content epoch and cost an aggregate over
* the whole assignment pivot. Callers that don't render counts pass
* `includeCounts: false` and skip that aggregate entirely, while still sharing
* the term list with callers that do.
*/
async function getTaxonomyTerms(taxonomyName, options = {}) {
	const locale = resolveLocale(options.locale);
	const def = await getTaxonomyDef(taxonomyName, options);
	if (!def) return [];
	if (options.includeCounts === false) return getTermList(def, locale);
	const [terms, counts] = await Promise.all([getTermList(def, locale), getVisibleTermCounts(def.name, def.collections, locale)]);
	return withCounts(terms, counts);
}
/**
* Get all terms of a taxonomy with a Workers edge-cache hint.
*
* Use the returned `cacheHint` with `Astro.cache.set()` so pages that render
* a taxonomy facet can be purged automatically when taxonomy terms change.
*/
async function getTaxonomyTermsWithCacheHint(taxonomyName, options = {}) {
	return {
		data: await getTaxonomyTerms(taxonomyName, options),
		cacheHint: { tags: [taxonomyTag(taxonomyName)] }
	};
}
/** Terms without counts, under the cache keys the layout prefetch warms. */
function getTermList(def, locale) {
	const localeKey = locale ?? "*";
	return requestCached(`taxonomy-terms:${def.name}:${localeKey}`, () => cachedQuery({
		namespace: CacheNamespace.TAXONOMIES,
		key: `termList:${def.name}:${localeKey}`,
		load: () => loadTaxonomyTerms(def, locale)
	}));
}
/**
* Copy a term list with counts attached. Counts are keyed by translation_group
* (what the pivot stores) and are locale-independent. Rebuilds every node so
* the shared, cached count-free list is never mutated.
*/
function withCounts(terms, counts) {
	return terms.map((term) => ({
		...term,
		count: counts.get(term.translationGroup ?? term.id) ?? 0,
		children: withCounts(term.children, counts)
	}));
}
async function loadTaxonomyTerms(def, locale) {
	let termsQuery = (await getDb()).selectFrom("taxonomies").selectAll().where("name", "=", def.name).orderBy("sort_order", "asc").orderBy("label", "asc");
	if (locale !== void 0) termsQuery = termsQuery.where(localeMatches("locale", locale)).orderBy(localeOrder("locale", locale), "asc");
	const flatTerms = (await termsQuery.execute()).map((row) => ({
		id: row.id,
		name: row.name,
		slug: row.slug,
		label: row.label,
		parent_id: row.parent_id,
		data: row.data,
		locale: row.locale,
		translation_group: row.translation_group
	}));
	if (def.hierarchical) return buildTree(flatTerms);
	return flatTerms.map((term) => ({
		id: term.id,
		name: term.name,
		slug: term.slug,
		label: term.label,
		description: term.data ? JSON.parse(term.data).description : void 0,
		children: [],
		locale: term.locale,
		translationGroup: term.translation_group
	}));
}
/**
* Per-translation-group visible-usage counts for one taxonomy, in a single
* round-trip (see `fetchVisibleTermCounts`). The pivot identity is the
* translation group, while entry rows are scoped to the resolved locale.
* Request and object cache keys include that locale so translated views never
* reuse each other's visible counts.
*/
function getVisibleTermCounts(taxonomyName, collections, locale) {
	const scope = [...new Set(collections)].toSorted().join(",");
	const localeScope = locale ?? "*";
	return requestCached(`taxonomy-term-counts:${taxonomyName}:${scope}:${localeScope}`, async () => {
		const entries = await cachedQuery({
			namespace: termCountNamespaces(collections),
			key: `termCounts:${taxonomyName}:${scope}:${localeScope}`,
			load: async () => {
				return [...await fetchVisibleTermCounts(await getDb(), taxonomyName, collections, locale)];
			}
		});
		return new Map(entries);
	});
}
/**
* Get a single term by (taxonomy, slug). Honours the fallback chain — if the
* slug exists in a fallback locale, we return that row (useful for deep-linking
* to a term page when the translation is missing).
*
* The term row and its visible-entry count are loaded and cached separately: the
* row depends only on the taxonomy epoch, while the count adds an aggregate over
* the whole assignment pivot and every counted collection's content epoch. A
* caller that renders no count passes `includeCounts: false` and skips it.
*/
async function getTerm(taxonomyName, slug, options = {}) {
	const chain = resolveLocaleChain(options.locale);
	const term = await getTermRow(taxonomyName, slug, chain);
	if (!term) return null;
	if (options.includeCounts === false) return term;
	const counts = await getVisibleTermCounts(taxonomyName, (await getTaxonomyDef(taxonomyName, options))?.collections ?? [], chain[0] ?? term.locale);
	return {
		...term,
		count: counts.get(term.translationGroup ?? term.id) ?? 0
	};
}
/** A single term with its children, without counts, under the taxonomy epoch. */
function getTermRow(taxonomyName, slug, chain) {
	return cachedQuery({
		namespace: CacheNamespace.TAXONOMIES,
		key: `term:${taxonomyName}:${slug}:${chain.join(",")}`,
		load: () => loadTerm(taxonomyName, slug, chain)
	});
}
async function loadTerm(taxonomyName, slug, chain) {
	const db = await getDb();
	let row;
	const selectTerm = () => db.selectFrom("taxonomies").selectAll().where("name", "=", taxonomyName).where("slug", "=", slug);
	if (chain.length === 0) row = await selectTerm().orderBy("locale", "asc").orderBy("id", "asc").executeTakeFirst();
	else {
		let offset = 0;
		const candidates = chain.flatMap((locale) => {
			const values = getLocaleCandidates(locale);
			const result = values.map((candidate, index) => ({
				candidate,
				rank: offset + index
			}));
			offset += values.length;
			return result;
		});
		const chainOrder = sql`CASE ${sql.join(candidates.map(({ candidate, rank }) => sql`WHEN lower(locale) = ${candidate.toLowerCase()} THEN ${sql.lit(rank)}`), sql` `)} ELSE ${sql.lit(offset)} END`;
		row = await selectTerm().where((eb) => eb.or(chain.map((locale) => localeMatches("locale", locale)))).orderBy(chainOrder, "asc").orderBy(localeOrder("locale", chain[0]), "asc").orderBy("id", "asc").executeTakeFirst();
	}
	if (!row) return null;
	let childrenQuery = db.selectFrom("taxonomies").selectAll().where("parent_id", "=", row.translation_group ?? row.id).orderBy("sort_order", "asc").orderBy("label", "asc");
	const termLocale = row.locale;
	if (termLocale) childrenQuery = childrenQuery.where(localeMatches("locale", termLocale)).orderBy(localeOrder("locale", termLocale), "asc");
	const children = (await childrenQuery.execute()).map((child) => ({
		id: child.id,
		name: child.name,
		slug: child.slug,
		label: child.label,
		parentId: child.parent_id ?? void 0,
		children: [],
		locale: child.locale,
		translationGroup: child.translation_group
	}));
	return {
		id: row.id,
		name: row.name,
		slug: row.slug,
		label: row.label,
		parentId: row.parent_id ?? void 0,
		description: row.data ? JSON.parse(row.data).description : void 0,
		children,
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
/**
* Terms assigned to a content entry, resolved into the active locale and then
* the configured default locale.
*/
function getEntryTerms(collection, entryId, taxonomyName, options = {}) {
	const locale = resolveLocale(options.locale);
	return requestCached(`terms:${collection}:${entryId}:${taxonomyName ?? "*"}:${locale ?? "*"}`, () => cachedQuery({
		namespace: [...contentCacheNamespaces(collection), CacheNamespace.TAXONOMIES],
		key: `entryTerms:${collection}:${entryId}:${taxonomyName ?? "*"}:${locale ?? "*"}`,
		load: async () => {
			return (await selectEntryTermRows(await getDb(), collection, [entryId], taxonomyName, locale)).map((row) => ({
				id: row.id,
				name: row.name,
				slug: row.slug,
				label: row.label,
				parentId: row.parent_id ?? void 0,
				children: [],
				locale: row.locale,
				translationGroup: row.translation_group
			}));
		}
	}));
}
/**
* Terms for multiple entries of one taxonomy, single query.
*/
async function getTermsForEntries(collection, entryIds, taxonomyName, options = {}) {
	const uniqueIds = [...new Set(entryIds)];
	if (uniqueIds.length === 0) return /* @__PURE__ */ new Map();
	const locale = resolveLocale(options.locale);
	const localeKey = locale ?? "*";
	const load = async () => {
		const result = /* @__PURE__ */ new Map();
		for (const id of uniqueIds) result.set(id, []);
		const missedIds = [];
		const cacheReads = [];
		for (const id of uniqueIds) {
			const cached = peekRequestCache(`terms:${collection}:${id}:${taxonomyName}:${localeKey}`);
			if (cached) cacheReads.push(cached.then((terms) => ({
				id,
				terms
			}), () => ({
				id,
				miss: true
			})));
			else missedIds.push(id);
		}
		for (const read of await Promise.all(cacheReads)) {
			if ("miss" in read) {
				missedIds.push(read.id);
				continue;
			}
			result.set(read.id, read.terms.map((t) => ({
				...t,
				children: [...t.children]
			})));
		}
		if (missedIds.length === 0) return [...result.entries()];
		const db = await getDb();
		for (const chunk of chunks(missedIds, 50)) {
			let rows;
			try {
				rows = await selectEntryTermRows(db, collection, chunk, taxonomyName, locale);
			} catch (error) {
				if (isMissingTableError(error)) return [...result.entries()];
				throw error;
			}
			for (const row of rows) {
				const term = {
					id: row.id,
					name: row.name,
					slug: row.slug,
					label: row.label,
					parentId: row.parent_id ?? void 0,
					children: [],
					locale: row.locale,
					translationGroup: row.translation_group
				};
				const terms = result.get(row.entry_id);
				if (terms) terms.push(term);
			}
		}
		return [...result.entries()];
	};
	const idKey = uniqueIds.toSorted().join(",");
	const pairs = idKey.length <= 256 ? await cachedQuery({
		namespace: [...contentCacheNamespaces(collection), CacheNamespace.TAXONOMIES],
		key: `termsForEntries:${collection}:${taxonomyName}:${locale ?? "*"}:${idKey}`,
		load
	}) : await load();
	return new Map(pairs);
}
/**
* Batch-fetch terms for multiple entries across ALL taxonomies in one query.
* Primes the request-cache for subsequent per-entry calls to `getEntryTerms`.
*/
async function getAllTermsForEntries(collection, entryIds, options = {}) {
	const result = /* @__PURE__ */ new Map();
	const uniqueIds = [...new Set(entryIds)];
	for (const id of uniqueIds) result.set(id, {});
	if (uniqueIds.length === 0) return result;
	const db = await getDb();
	const locale = resolveLocale(options.locale);
	const applicableTaxonomyNames = await getCollectionTaxonomyNames(collection, { locale });
	for (const chunk of chunks(uniqueIds, 50)) {
		let rows;
		try {
			rows = await selectEntryTermRows(db, collection, chunk, void 0, locale);
		} catch (error) {
			if (isMissingTableError(error)) {
				for (const id of uniqueIds) primeEntryTermsCache(collection, id, {}, applicableTaxonomyNames, locale);
				return result;
			}
			throw error;
		}
		for (const row of rows) {
			const term = {
				id: row.id,
				name: row.name,
				slug: row.slug,
				label: row.label,
				parentId: row.parent_id ?? void 0,
				children: [],
				locale: row.locale,
				translationGroup: row.translation_group
			};
			const byTaxonomy = result.get(row.entry_id);
			if (!byTaxonomy) continue;
			const existing = byTaxonomy[row.name];
			if (existing) existing.push(term);
			else byTaxonomy[row.name] = [term];
		}
	}
	for (const [entryId, byTaxonomy] of result) primeEntryTermsCache(collection, entryId, byTaxonomy, applicableTaxonomyNames, locale);
	return result;
}
/**
* Return the list of taxonomy names applicable to a collection, request-
* cached so a page render only pays for it once.
*
* Returns an empty list when taxonomies haven't been defined yet.
*/
async function getCollectionTaxonomyNames(collection, options) {
	try {
		return (await getTaxonomyDefs(options)).filter((d) => d.collections.includes(collection)).map((d) => d.name);
	} catch (error) {
		if (isMissingTableError(error)) return [];
		throw error;
	}
}
/**
* Pre-populate the request-cache for every getEntryTerms call-shape that
* could hit this entry:
*
*   getEntryTerms(collection, entryId)                 -> key `terms:C:E:*`
*   getEntryTerms(collection, entryId, "tag")          -> key `terms:C:E:tag`
*   getEntryTerms(collection, entryId, "category")     -> key `terms:C:E:category`
*   ...one per taxonomy that applies to this collection
*
* Taxonomies with no rows on this entry are seeded with `[]` so legacy
* callers short-circuit to the cached empty array instead of re-querying.
*/
function primeEntryTermsCache(collection, entryId, byTaxonomy, applicableTaxonomyNames, locale) {
	const localeKey = locale ?? "*";
	for (const name of applicableTaxonomyNames) setRequestCacheEntry(`terms:${collection}:${entryId}:${name}:${localeKey}`, byTaxonomy[name] ?? []);
	for (const [name, terms] of Object.entries(byTaxonomy)) setRequestCacheEntry(`terms:${collection}:${entryId}:${name}:${localeKey}`, terms);
	const allTerms = Object.values(byTaxonomy).flat();
	setRequestCacheEntry(`terms:${collection}:${entryId}:*:${localeKey}`, allTerms);
}
/**
* Prime the per-entry request cache from terms that were folded into the
* content query (query.ts `hydrateEntryTerms` fast path), so subsequent
* `getEntryTerms` calls in the same render hit the cache instead of issuing an
* N+1 query. Seeds the wildcard key and one key per taxonomy present on the
* entry — purely from the folded data, with no DB lookup.
*
* Unlike `getAllTermsForEntries`, this deliberately does NOT seed `[]` for
* taxonomies that apply to the collection but have no rows on the entry: doing
* so would require a `getTaxonomyDefs` query, adding a round trip to every fold
* render to serve the rarer `getEntryTerms(id, absentTaxonomy)` case from cache.
* That call simply falls through to its own cached query. Keeping the key shape
* here (rather than in query.ts) prevents the two from drifting.
*/
function primeFoldedEntryTerms(collection, perEntry, options = {}) {
	if (perEntry.length === 0) return;
	const locale = resolveLocale(options.locale);
	for (const { entryId, byTaxonomy } of perEntry) primeEntryTermsCache(collection, entryId, byTaxonomy, [], locale);
}
/**
* Get entries by term. Both the lookup (term slug in the active locale) and
* the content query respect the active locale.
*/
async function getEntriesByTerm(collection, taxonomyName, termSlug, options = {}) {
	const { getEmDashCollection } = await import("./query-D62NntCZ_KAlbGiAn.mjs").then((n) => n.s);
	const queryOptions = { where: { [taxonomyName]: termSlug } };
	if (options.locale !== void 0) queryOptions.locale = options.locale;
	const { entries } = await getEmDashCollection(collection, queryOptions);
	return entries;
}
function rowToTaxonomyDef(row) {
	return {
		id: row.id,
		name: row.name,
		label: row.label,
		labelSingular: row.label_singular ?? void 0,
		hierarchical: row.hierarchical === 1,
		collections: parseTaxonomyCollections(row.collections),
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
/**
* Build tree structure from flat terms
*/
function buildTree(flatTerms) {
	const byLocaleGroup = /* @__PURE__ */ new Map();
	const nodes = [];
	const roots = [];
	for (const term of flatTerms) {
		const node = {
			id: term.id,
			name: term.name,
			slug: term.slug,
			label: term.label,
			parentId: term.parent_id ?? void 0,
			description: term.data ? JSON.parse(term.data).description : void 0,
			children: [],
			locale: term.locale,
			translationGroup: term.translation_group
		};
		byLocaleGroup.set(`${term.locale}::${term.translation_group ?? term.id}`, node);
		nodes.push(node);
	}
	for (const node of nodes) {
		const parent = node.parentId ? byLocaleGroup.get(`${node.locale}::${node.parentId}`) : void 0;
		if (parent) parent.children.push(node);
		else roots.push(node);
	}
	return roots;
}
export { getTaxonomyDef as a, getTaxonomyTermsWithCacheHint as c, invalidateTaxonomyDefsCache as d, invalidateTermCache as f, getEntryTerms as i, getTerm as l, getAllTermsForEntries as n, getTaxonomyDefs as o, taxonomies_exports as p, getEntriesByTerm as r, getTaxonomyTerms as s, fetchVisibleTermCounts as t, getTermsForEntries as u };
