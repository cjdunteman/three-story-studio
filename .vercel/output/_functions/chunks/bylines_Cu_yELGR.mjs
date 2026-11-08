import { t as BylineRepository } from "./byline_CUtsRnCA.mjs";
import { a as validateIdentifier } from "./query_B1nwqhxc.mjs";
import { i as isMissingTableError } from "./resolve_B0ayaSfr.mjs";
import { l as getDb } from "./loader_Btw7VAs7.mjs";
import "./request-cache_CXFiINQX.mjs";
import "kysely";
// node_modules/emdash/src/bylines/credits.ts
/**
* Resolve byline credits for multiple content entries against an explicit
* database handle.
*
* Entries are bucketed by `entry.locale` and each bucket gets a single
* batched strict-locale credit query. Entries with no explicit credit fall
* back to the byline linked to their author, unless `primaryBylineId` is set.
* Items with no `locale` field (legacy / single-locale installs) share an
* unscoped bucket.
*
* Every requested entry ID is present in the result, with `[]` when the
* entry has no resolvable credit.
*/
async function resolveBylineCredits(db, collection, entries, options = {}) {
	validateIdentifier(collection, "collection");
	const hydrateCustomFields = options.hydrateCustomFields ?? true;
	const result = /* @__PURE__ */ new Map();
	for (const { id } of entries) result.set(id, []);
	if (entries.length === 0) return result;
	const repo = new BylineRepository(db);
	const buckets = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const key = entry.locale ?? null;
		const bucket = buckets.get(key);
		if (bucket) bucket.push(entry);
		else buckets.set(key, [entry]);
	}
	const explicitByEntry = /* @__PURE__ */ new Map();
	const entriesNeedingAuthorCheck = [];
	const hydrationTargets = [];
	for (const [locale, bucket] of buckets) {
		const localeOpt = locale ? {
			locale,
			skipHydration: true
		} : { skipHydration: true };
		const bucketIds = bucket.map((e) => e.id);
		let bylinesMap;
		try {
			bylinesMap = await repo.getContentBylinesMany(collection, bucketIds, localeOpt);
		} catch (error) {
			if (isMissingTableError(error)) return result;
			throw error;
		}
		for (const [id, list] of bylinesMap) {
			explicitByEntry.set(id, list);
			for (const credit of list) hydrationTargets.push(credit.byline);
		}
		for (const entry of bucket) {
			if (bylinesMap.has(entry.id) && bylinesMap.get(entry.id).length > 0) continue;
			if (entry.authorId) entriesNeedingAuthorCheck.push(entry);
		}
	}
	const fallbackByEntry = /* @__PURE__ */ new Map();
	if (entriesNeedingAuthorCheck.length > 0) {
		const authorBuckets = /* @__PURE__ */ new Map();
		for (const entry of entriesNeedingAuthorCheck) {
			if (entry.primaryBylineId) continue;
			const key = entry.locale ?? null;
			const bucket = authorBuckets.get(key);
			if (bucket) bucket.push(entry);
			else authorBuckets.set(key, [entry]);
		}
		for (const [locale, bucket] of authorBuckets) {
			const localeOpt = locale ? {
				locale,
				skipHydration: true
			} : { skipHydration: true };
			const authorIds = bucket.map((e) => e.authorId).filter((id) => id !== null);
			const uniqueAuthorIds = [...new Set(authorIds)];
			if (uniqueAuthorIds.length === 0) continue;
			const authorBylineMap = await repo.findByUserIds(uniqueAuthorIds, localeOpt);
			for (const entry of bucket) {
				if (!entry.authorId) continue;
				const f = authorBylineMap.get(entry.authorId);
				if (f) {
					fallbackByEntry.set(entry.id, f);
					hydrationTargets.push(f);
				}
			}
		}
	}
	if (hydrateCustomFields && hydrationTargets.length > 0) await repo.hydrateBylineCustomFields(hydrationTargets);
	for (const { id } of entries) {
		const explicit = explicitByEntry.get(id);
		if (explicit && explicit.length > 0) {
			result.set(id, explicit.map((c) => ({
				...c,
				source: "explicit"
			})));
			continue;
		}
		const fallback = fallbackByEntry.get(id);
		if (fallback) result.set(id, [{
			byline: fallback,
			sortOrder: 0,
			roleLabel: null,
			source: "inferred"
		}]);
	}
	return result;
}
// node_modules/emdash/src/bylines/index.ts
/**
* Batch-fetch byline credits for multiple content entries.
*
* Per-entry strict-locale hydration: entries are bucketed by `entry.locale`
* and each bucket gets a single batched call to the strict-locale repo
* method. Items with no `locale` field (legacy / single-locale installs)
* share an unscoped bucket.
*
* Internal: consumed by `hydrateEntryBylines` in `query.ts` so that every
* entry returned from `getEmDashCollection` / `getEmDashEntry` already has
* `data.bylines` populated. Site code should rely on that eager hydration
* rather than calling this directly -- this function is not re-exported
* from the `emdash` package entry point.
*
* @param collection - The collection slug (e.g., "posts")
* @param entries - Entry id + authorId + locale (each entry resolves at its own locale)
* @returns Map from entry ID to array of byline credits
*/
async function getBylinesForEntries(collection, entries) {
	validateIdentifier(collection, "collection");
	if (entries.length === 0) return /* @__PURE__ */ new Map();
	return resolveBylineCredits(await getDb(), collection, entries);
}
export { getBylinesForEntries };
