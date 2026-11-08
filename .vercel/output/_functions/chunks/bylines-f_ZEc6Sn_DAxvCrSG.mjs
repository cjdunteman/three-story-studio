import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { i as resolveLocaleChain } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import { f as getDb } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { t as resolveBylineCredits } from "./credits-BKREepht_BTl2HLL3.mjs";
import "kysely";
// node_modules/emdash/dist/bylines-f_ZEc6Sn.mjs
var bylines_exports = /* @__PURE__ */ __exportAll({
	getByline: () => getByline,
	getBylineBySlug: () => getBylineBySlug,
	getBylinesForEntries: () => getBylinesForEntries,
	getEntriesByByline: () => getEntriesByByline,
	invalidateBylineCache: () => invalidateBylineCache
});
/**
* No-op — kept for API compatibility.
*
* Used to invalidate a worker-lifetime "has any byline?" probe. That
* probe added a query on every cold isolate to save one query on sites
* with zero bylines (i.e. the wrong tradeoff), so we dropped it. The
* batch byline join below returns an empty map for empty sites at the
* same cost as the probe, without the pre-check.
*/
function invalidateBylineCache() {}
/**
* Get a byline by ID.
*
* @example
* ```ts
* import { getByline } from "emdash";
*
* const byline = await getByline("01HXYZ...");
* if (byline) {
*   console.log(byline.displayName);
* }
* ```
*/
async function getByline(id) {
	return new BylineRepository(await getDb()).findById(id);
}
/**
* Get a byline by slug.
*
* Standalone identity lookup (e.g. rendering an author profile page). Walks
* the configured locale fallback chain — same pattern as `getMenu` and
* `getTerm`, see PR #916. Returns the first match found, walking
* `[requestedLocale, ...fallbacks, defaultLocale]` in order.
*
* Note: this is intentionally different from credit hydration on a content
* entry (`getEntryBylines`), which is strict per locale with no fallback.
* The distinction: identity lookups answer "give me this byline", and
* falling back to another locale's display name is acceptable. Credit
* hydration answers "what should render on this entry", where falling back
* silently surfaces a stale-locale name and contradicts editorial intent.
*
* @example
* ```ts
* import { getBylineBySlug } from "emdash";
*
* const byline = await getBylineBySlug("jane-doe", { locale: "de-de" });
* if (byline) {
*   console.log(byline.displayName);
* }
* ```
*/
async function getBylineBySlug(slug, options) {
	const chain = resolveLocaleChain(options?.locale);
	return requestCached(`byline-by-slug:${slug}:${chain.length > 0 ? chain.join(",") : "*"}`, async () => {
		const repo = new BylineRepository(await getDb());
		if (chain.length === 0) return repo.findBySlug(slug);
		for (const locale of chain) {
			const row = await repo.findBySlug(slug, { locale });
			if (row) return row;
		}
		return null;
	});
}
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
/**
* Get content entries credited to a byline, in any credit position.
*
* Unlike filtering on the content table's `primary_byline_id` column (which
* only finds entries where the byline is the first/primary credit), this
* matches every explicit credit recorded in `_emdash_content_bylines`, so
* co-authored entries where the byline is a secondary credit are included.
*
* `byline` is matched against the byline's `translation_group` (the value
* stored on credits since migration 040), so a single credit spans every
* locale variant of the byline. Pass `byline.translationGroup ?? byline.id`
* from `getByline` / `getBylineBySlug`. An array matches any of the given
* bylines (OR).
*
* The result respects the active locale, status, ordering, and eager
* hydration of `getEmDashCollection`.
*
* @example
* ```ts
* import { getBylineBySlug, getEntriesByByline } from "emdash";
*
* const byline = await getBylineBySlug("jane-doe");
* if (byline) {
*   const posts = await getEntriesByByline("posts", byline.translationGroup ?? byline.id, {
*     orderBy: { published_at: "desc" },
*   });
* }
* ```
*
* @param collection - The collection slug (e.g. "posts")
* @param byline - A byline translation group, or an array of them (OR)
* @param options - Optional locale, ordering, status, and limit
*/
async function getEntriesByByline(collection, byline, options = {}) {
	const { getEmDashCollection } = await import("./query-D62NntCZ_KAlbGiAn.mjs").then((n) => n.s);
	const queryOptions = { where: { byline } };
	if (options.locale !== void 0) queryOptions.locale = options.locale;
	if (options.orderBy !== void 0) queryOptions.orderBy = options.orderBy;
	if (options.status !== void 0) queryOptions.status = options.status;
	if (options.limit !== void 0) queryOptions.limit = options.limit;
	const { entries } = await getEmDashCollection(collection, queryOptions);
	return entries;
}
export { invalidateBylineCache as a, getEntriesByByline as i, getByline as n, getBylineBySlug as r, bylines_exports as t };
