import { a as validateIdentifier, i as storedLocaleOrder, n as localeMatches, r as localeOrder, t as canonicalLocaleColumn } from "./query_B1nwqhxc.mjs";
import { i as getLocaleChainRank, n as getI18nConfig } from "./config_D2Z0BYnM.mjs";
import { i as isMissingTableError, n as resolveLocaleChain, t as resolveLocale } from "./resolve_B0ayaSfr.mjs";
import { d as revalidatingCached, l as getDb, u as createRevalidatingCache } from "./loader_Btw7VAs7.mjs";
import { n as cachedQuery, o as isObjectCacheActive, t as CacheNamespace } from "./object-cache_C1QujUiI.mjs";
import { g as getRequestContext, i as setRequestCacheEntry, r as requestCached } from "./request-cache_CXFiINQX.mjs";
import { t as chunks } from "./chunks_B4YLB6C7.mjs";
import "./collection-slugs-cache_B2aZDvq1.mjs";
import { sql } from "kysely";
// node_modules/emdash/src/database/repositories/taxonomy-def.ts
/**
* Select definition rows (aliased `d`) with their taxonomy's structure.
* Qualify columns in `where` and `orderBy`: `id` and `name` exist on both tables.
*
* A row that has no group yet, because code without the group table wrote it
* during a rolling deploy, reads its own copy.
*/
function selectTaxonomyDefs(db, locale) {
	let query = db.selectFrom("_emdash_taxonomy_defs as d").leftJoin("_emdash_taxonomy_def_groups as g", "g.name", "d.name").select([
		"d.id",
		"d.name",
		"d.label",
		"d.label_singular",
		"d.created_at",
		"d.locale",
		"d.translation_group",
		sql`coalesce(g.hierarchical, d.hierarchical)`.as("hierarchical"),
		sql`coalesce(g.collections, d.collections)`.as("collections")
	]);
	if (locale !== void 0) query = query.where(localeMatches("d.locale", locale)).orderBy(localeOrder("d.locale", locale), "asc");
	return query;
}
/** Parse a stored `collections` value, skipping anything that isn't a string list. */
function parseTaxonomyCollections(value) {
	if (!value) return [];
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		return [];
	}
	if (!Array.isArray(parsed)) return [];
	return [...new Set(parsed.filter((entry) => typeof entry === "string"))];
}
// node_modules/emdash/src/taxonomies/index.ts
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
export { getTaxonomyDefs as n, primeFoldedEntryTerms as r, getAllTermsForEntries as t };
