import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
// node_modules/emdash/dist/credits-BKREepht.mjs
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
export { resolveBylineCredits as t };
