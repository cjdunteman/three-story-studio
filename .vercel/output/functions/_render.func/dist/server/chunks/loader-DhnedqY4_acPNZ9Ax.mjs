import { a as __exportAll, h as getLocaleCandidates, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { n as isMissingColumnError, r as isMissingTableError, t as getMissingColumnIdentifier } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { n as buildStatusCondition, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { i as getRequestContext, t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { n as invalidateSingleFlightCache, r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-D0EaGbN1_BgL4u_IC.mjs";
import { i as storedLocaleOrder, n as localeMatches, r as localeOrder, t as canonicalLocaleColumn } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { i as setRequestCacheEntry } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { a as InvalidCursorError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as jsonTextValues } from "./json-recordset-D0WhN2UA_CIrMhMsj.mjs";
import { Kysely, sql } from "kysely";
var QUERY_LOG_PREFIX = "[emdash-query-log]";
function createRecorder(route, method, phase) {
	return {
		events: [],
		route,
		method,
		phase
	};
}
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
/**
* Emit all events from a recorder as prefixed NDJSON on stdout. The
* harness pipes the child's stdout, filters lines beginning with
* QUERY_LOG_PREFIX, and writes them to its own file. Using stdout means
* the sink works uniformly in Node and in workerd (which has no fs).
*
* Idempotent: the first call emits and marks the recorder flushed, later
* calls no-op. For streamed responses the flush is deferred to stream end
* (see wrapBodyForStreamMetrics) so it captures queries issued while the
* body is still rendering; bodyless responses fall back to a flush when
* middleware returns.
*/
function flushRecorder(rec) {
	if (rec.flushed) return;
	rec.flushed = true;
	for (const e of rec.events) console.log(`${QUERY_LOG_PREFIX} ${JSON.stringify(e)}`);
}
/**
* Whether query instrumentation is enabled. Read at Kysely construction
* time and middleware entry — the env var is a process-lifetime flag, not
* per-request. Gated via `process.env` so adapters that ship env through
* to the worker (e.g. Miniflare via wrangler.jsonc `vars` or host env
* pass-through) can enable it at runtime.
*/
function isInstrumentationEnabled() {
	return Boolean(typeof process !== "undefined" && process.env && process.env["EMDASH_QUERY_LOG"] === "1");
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
// node_modules/emdash/dist/loader-DhnedqY4.mjs
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
/**
* The taxonomy's group id and structure, or null when no locale defines `name`.
* A group whose definitions are all gone counts as deleted.
*/
async function findTaxonomyStructure(db, name) {
	const row = await selectTaxonomyDefs(db).where("d.name", "=", name).orderBy("d.id", "asc").executeTakeFirst();
	if (!row) return null;
	return {
		id: row.translation_group ?? row.id,
		hierarchical: row.hierarchical === 1,
		collections: parseTaxonomyCollections(row.collections)
	};
}
/**
* Write a taxonomy's structure for every locale and return its group id.
*
* Creates the group with `groupId` and `structure` when the name has none. An
* existing group changes only the fields in `overwrite`, so a caller holding an
* older read of the other field does not write it back. Every definition row of
* the name is then linked to the group and copies its values, including rows
* written without it.
*/
async function saveTaxonomyStructure(db, name, groupId, structure, overwrite = structure) {
	const changes = {};
	if (overwrite.hierarchical !== void 0) changes.hierarchical = overwrite.hierarchical ? 1 : 0;
	if (overwrite.collections !== void 0) changes.collections = JSON.stringify([...new Set(overwrite.collections)]);
	const group = await db.insertInto("_emdash_taxonomy_def_groups").values({
		id: groupId,
		name,
		hierarchical: structure.hierarchical ? 1 : 0,
		collections: JSON.stringify([...new Set(structure.collections)])
	}).onConflict((oc) => Object.keys(changes).length > 0 ? oc.column("name").doUpdateSet(changes) : oc.column("name").doNothing()).returning([
		"id",
		"hierarchical",
		"collections"
	]).executeTakeFirst() ?? await db.selectFrom("_emdash_taxonomy_def_groups").select([
		"id",
		"hierarchical",
		"collections"
	]).where("name", "=", name).executeTakeFirstOrThrow();
	await db.updateTable("_emdash_taxonomy_defs").set({
		hierarchical: group.hierarchical,
		collections: group.collections,
		translation_group: group.id
	}).where("name", "=", name).execute();
	return group.id;
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
function seoPanelCacheKey(collection, id) {
	return `seo-panel:${collection}:${id}`;
}
/**
* Prime the request-scoped SEO panel cache for a content entry.
*
* Called wherever an entry's folded SEO data materializes: the loader's
* single-entry path (fresh query) and the object-cache revive path in
* `getEmDashEntry` (warm hit, where the loader never runs). No-ops outside
* a request context; never overwrites an already-primed value.
*/
function primeSeoPanel(collection, id, seo) {
	setRequestCacheEntry(seoPanelCacheKey(collection, id), seo);
}
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
function invalidateRevalidatingCache(cache) {
	cache.generation++;
	cache.snapshot = null;
	cache.expiresAt = 0;
	cache.revalidatingUntil = 0;
	invalidateSingleFlightCache(cache.refresh);
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
var loader_exports = /* @__PURE__ */ __exportAll({
	CURSOR_RAW_VALUES: () => CURSOR_RAW_VALUES,
	FOLDED_AUTHOR_BYLINE: () => FOLDED_AUTHOR_BYLINE,
	FOLDED_BYLINES: () => FOLDED_BYLINES,
	FOLDED_BYLINES_EXIST: () => FOLDED_BYLINES_EXIST,
	FOLDED_TERMS: () => FOLDED_TERMS,
	LARGE_TERM_ASSIGNMENTS: () => LARGE_TERM_ASSIGNMENTS,
	buildTaxonomyPivotQuery: () => buildTaxonomyPivotQuery,
	creditFromFoldedAuthorByline: () => creditFromFoldedAuthorByline,
	creditsFromFoldedBylines: () => creditsFromFoldedBylines,
	emdashLoader: () => emdashLoader,
	encodeSortCursor: () => encodeSortCursor,
	getDb: () => getDb,
	loadEntriesByGroups: () => loadEntriesByGroups,
	resetTaxonomyNamesCache: () => resetTaxonomyNamesCache
});
var FIELD_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
/**
* SEO columns folded into the single-entry query as a single JSON column
* (`_emdash_seo` in the result set), then expanded onto the row under these
* aliases for `extractSeo()`. Surfacing SEO as one aggregated column keeps the
* result-set width bounded regardless of how many fields the collection has,
* which matters for D1: a flat `LEFT JOIN _emdash_seo` adds 5 alias columns to
* every row and pushes wide collections (common after WordPress / ACF imports)
* past D1's per-result-set column limit, surfacing as a silent null entry.
* One JSON column is one column, so the join stays safe at any schema width.
*
* The aliases mirror the strategy used by `foldedHydrationSelects` for byline
* and taxonomy hydration: aggregate in SQL, expand in JS. SEO is 1:1 with
* content, so the subquery uses `json_object` (not the array aggregator).
*
* The `_emdash_` prefix on the aliases guarantees they can never collide with
* a content field. Field slugs must match `/^[a-z][a-z0-9_]*$/`, so a user can
* legitimately define a `seo_title` field; surfacing the SEO column under its
* bare name would shadow that field in the result set and drop the user's
* value. The prefix (illegal as a leading slug char) sidesteps this entirely.
*/
var SEO_COLUMN_ALIASES = {
	seo_title: "_emdash_seo_title",
	seo_description: "_emdash_seo_description",
	seo_image: "_emdash_seo_image",
	seo_canonical: "_emdash_seo_canonical",
	seo_no_index: "_emdash_seo_no_index"
};
/** Aliased SEO result keys — excluded from generic field mapping. */
var SEO_ALIAS_COLUMNS = Object.values(SEO_COLUMN_ALIASES);
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
* Correlated JSON-array subqueries that fold taxonomy-term and byline hydration
* into the content query, removing the two separate hydration round trips per
* fetch. `outer` is the content table's alias/name; each subquery correlates on
* `<outer>.id`, so the base query stays one row per entry (no join fan-out, no
* duplicated content payload). Order is NOT applied in the aggregate (it differs
* across dialects) — the consumer sorts terms by label and credits by sortOrder.
*
* Dialect-specific aggregation: SQLite `json_group_array`/`json_object` returns
* a JSON *string*; Postgres `json_agg`/`json_build_object` (coalesced to `[]`)
* returns parsed JSON. {@link stashFolded} handles both.
*/
function foldedHydrationSelects(db, type, outer) {
	const o = sql.ref(outer);
	const pg = isPostgres(db);
	const obj = (pairs) => pg ? sql.raw(`json_build_object(${pairs})`) : sql.raw(`json_object(${pairs})`);
	const agg = (inner) => pg ? sql`coalesce(json_agg(${inner}), '[]'::json)` : sql`json_group_array(${inner})`;
	const foldJoin = pg ? sql`JOIN` : sql`CROSS JOIN`;
	const termObj = obj("'id', coalesce(exact_term.id, default_term.id), 'name', coalesce(exact_term.name, default_term.name), 'slug', coalesce(exact_term.slug, default_term.slug), 'label', coalesce(exact_term.label, default_term.label), 'parent_id', coalesce(exact_term.parent_id, default_term.parent_id), 'locale', coalesce(exact_term.locale, default_term.locale), 'translation_group', coalesce(exact_term.translation_group, default_term.translation_group)");
	const defaultLocale = getI18nConfig()?.defaultLocale ?? "en";
	const selectedTermId = sql`coalesce(exact_term.id, default_term.id)`;
	const termAgg = pg ? sql`coalesce(json_agg(${termObj}) FILTER (WHERE ${selectedTermId} IS NOT NULL), '[]'::json)` : sql`json_group_array(${termObj}) FILTER (WHERE ${selectedTermId} IS NOT NULL)`;
	const hasLocaleAliases = Object.keys(getI18nConfig()?.localeAliases ?? {}).length > 0;
	const terms = hasLocaleAliases ? sql`(SELECT ${termAgg} FROM ${sql.ref("content_taxonomies")} AS ct
		LEFT JOIN ${sql.ref("taxonomies")} AS exact_term ON exact_term.id = (
			SELECT candidate.id FROM taxonomies AS candidate
			WHERE candidate.translation_group = ct.taxonomy_id
				AND ${canonicalLocaleColumn("candidate.locale")} = ${canonicalLocaleColumn(`${outer}.locale`)}
			ORDER BY ${storedLocaleOrder("candidate.locale")}, candidate.id LIMIT 1
		)
		LEFT JOIN ${sql.ref("taxonomies")} AS default_term ON default_term.id = (
			SELECT candidate.id FROM taxonomies AS candidate
			WHERE candidate.translation_group = ct.taxonomy_id
				AND ${localeMatches("candidate.locale", defaultLocale)}
			ORDER BY ${localeOrder("candidate.locale", defaultLocale)}, candidate.id LIMIT 1
		)
		WHERE ct.collection = ${type} AND ct.entry_id = ${o}.translation_group) AS ${sql.ref("_emdash_terms")}` : sql`(SELECT ${termAgg} FROM ${sql.ref("content_taxonomies")} AS ct LEFT JOIN ${sql.ref("taxonomies")} AS exact_term ON exact_term.translation_group = ct.taxonomy_id AND exact_term.locale = ${o}.locale LEFT JOIN ${sql.ref("taxonomies")} AS default_term ON default_term.translation_group = ct.taxonomy_id AND default_term.locale = ${defaultLocale} WHERE ct.collection = ${type} AND ct.entry_id = ${o}.translation_group) AS ${sql.ref("_emdash_terms")}`;
	const bylineInner = obj("'id', b.id, 'slug', b.slug, 'displayName', b.display_name, 'bio', b.bio, 'avatarMediaId', b.avatar_media_id, 'avatarStorageKey', m.storage_key, 'avatarAlt', m.alt, 'avatarBlurhash', m.blurhash, 'avatarDominantColor', m.dominant_color, 'websiteUrl', b.website_url, 'userId', b.user_id, 'isGuest', b.is_guest, 'createdAt', b.created_at, 'updatedAt', b.updated_at, 'locale', b.locale, 'translationGroup', b.translation_group");
	const credit = sql`${pg ? sql.raw("json_build_object('roleLabel', cb.role_label, 'sortOrder', cb.sort_order, 'byline', ") : sql.raw("json_object('roleLabel', cb.role_label, 'sortOrder', cb.sort_order, 'byline', ")}${bylineInner})`;
	const credits = hasLocaleAliases ? sql`(SELECT ${agg(credit)} FROM ${sql.ref("_emdash_content_bylines")} AS cb
		${foldJoin} ${sql.ref("_emdash_bylines")} AS b ON b.id = (
			SELECT candidate.id FROM _emdash_bylines AS candidate
			WHERE candidate.translation_group = cb.byline_id
				AND ${canonicalLocaleColumn("candidate.locale")} = ${canonicalLocaleColumn(`${outer}.locale`)}
			ORDER BY ${storedLocaleOrder("candidate.locale")}, candidate.id LIMIT 1
		)
		LEFT JOIN ${sql.ref("media")} AS m ON m.id = b.avatar_media_id
		WHERE cb.collection_slug = ${type} AND cb.content_id = ${o}.id)` : sql`(SELECT ${agg(credit)} FROM ${sql.ref("_emdash_content_bylines")} AS cb ${foldJoin} ${sql.ref("_emdash_bylines")} AS b ON b.translation_group = cb.byline_id LEFT JOIN ${sql.ref("media")} AS m ON m.id = b.avatar_media_id WHERE cb.collection_slug = ${type} AND cb.content_id = ${o}.id AND b.locale = ${o}.locale)`;
	const author = hasLocaleAliases ? sql`(SELECT ${bylineInner} FROM ${sql.ref("_emdash_bylines")} AS b LEFT JOIN ${sql.ref("media")} AS m ON m.id = b.avatar_media_id
		WHERE b.user_id = ${o}.author_id
			AND ${canonicalLocaleColumn("b.locale")} = ${canonicalLocaleColumn(`${outer}.locale`)}
		ORDER BY ${storedLocaleOrder("b.locale")}, b.id LIMIT 1)` : sql`(SELECT ${bylineInner} FROM ${sql.ref("_emdash_bylines")} AS b LEFT JOIN ${sql.ref("media")} AS m ON m.id = b.avatar_media_id WHERE b.user_id = ${o}.author_id AND b.locale = ${o}.locale LIMIT 1)`;
	return {
		terms,
		bylines: pg ? sql`json_build_object('credits', ${credits}, 'author', ${author}) AS ${sql.ref("_emdash_bylines")}` : sql`json_object('credits', json(${credits}), 'author', json(${author})) AS ${sql.ref("_emdash_bylines")}`,
		bylinesExist: sql`(SELECT 1 FROM ${sql.ref("_emdash_bylines")} LIMIT 1) AS ${sql.ref("_emdash_bylines_exist")}`
	};
}
/**
* Correlated JSON-object subquery that folds per-entry SEO into the content
* query without widening the result set: 1 row of `_emdash_seo` becomes 1 JSON
* column rather than 5 flat columns. The JSON column is expanded onto the row
* via {@link expandFoldedSeo} after the query runs, preserving the alias keys
* that {@link extractSeo} reads. Missing SEO row (no entry in `_emdash_seo`)
* yields NULL, which {@link expandFoldedSeo} treats as "no SEO" - identical to
* the prior LEFT JOIN miss behavior.
*
* Dialect-specific aggregation mirrors {@link foldedHydrationSelects}: SQLite
* `json_object` returns a JSON *string*, Postgres `json_build_object` returns
* parsed JSON; both branches are handled in expansion.
*/
function foldedSeoSelect(db, type, outer) {
	const o = sql.ref(outer);
	const pg = isPostgres(db);
	const pairs = "'seo_title', s.seo_title, 'seo_description', s.seo_description, 'seo_image', s.seo_image, 'seo_canonical', s.seo_canonical, 'seo_no_index', s.seo_no_index";
	return sql`(SELECT ${pg ? sql.raw(`json_build_object(${pairs})`) : sql.raw(`json_object(${pairs})`)} FROM ${sql.ref("_emdash_seo")} AS s WHERE s.collection = ${type} AND s.content_id = ${o}.id LIMIT 1) AS ${sql.ref(SEO_FOLDED_COLUMN)}`;
}
function foldedBooleanFieldsSelect(db, type) {
	return sql`(
		SELECT ${isPostgres(db) ? sql`coalesce(json_agg(f.slug), '[]'::json)` : sql`json_group_array(f.slug)`}
		FROM ${sql.ref("_emdash_fields")} AS f
		INNER JOIN ${sql.ref("_emdash_collections")} AS c ON c.id = f.collection_id
		WHERE c.slug = ${type} AND f.type = ${"boolean"}
	) AS ${sql.ref(BOOLEAN_FIELDS_FOLDED_COLUMN)}`;
}
/**
* Expand the folded `_emdash_seo` JSON column onto the row using SEO_COLUMN_ALIASES,
* so {@link extractSeo} reads it transparently. SQLite returns a JSON string
* (parse it); Postgres returns already-parsed JSON. Missing/malformed/null is
* a no-op: {@link extractSeo} returns null when the aliases are absent.
*/
function isPlainObject(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function expandFoldedSeo(row) {
	const raw = row[SEO_FOLDED_COLUMN];
	delete row[SEO_FOLDED_COLUMN];
	let parsed = null;
	if (typeof raw === "string") try {
		const candidate = JSON.parse(raw);
		if (isPlainObject(candidate)) parsed = candidate;
	} catch {
		return;
	}
	else if (isPlainObject(raw)) parsed = raw;
	if (!parsed) return;
	for (const [col, alias] of Object.entries(SEO_COLUMN_ALIASES)) row[alias] = parsed[col] ?? null;
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
/**
* Stash folded hydration JSON (non-enumerable) for the query.ts fast paths.
* SQLite returns a JSON string (parse it); Postgres returns already-parsed JSON.
*/
function stashFolded(data, row) {
	for (const [col, sym] of [["_emdash_terms", FOLDED_TERMS], ["_emdash_bylines", FOLDED_BYLINES]]) {
		const raw = row[col];
		let value;
		if (typeof raw === "string") try {
			value = JSON.parse(raw);
		} catch {
			continue;
		}
		else if (Array.isArray(raw) || isPlainObject(raw)) value = raw;
		else continue;
		if (sym === FOLDED_BYLINES && isPlainObject(value)) {
			const { credits, author } = value;
			if (author === null || isPlainObject(author)) Object.defineProperty(data, FOLDED_AUTHOR_BYLINE, {
				value: author,
				enumerable: false,
				configurable: true
			});
			value = credits;
		}
		if (!Array.isArray(value)) continue;
		Object.defineProperty(data, sym, {
			value,
			enumerable: false,
			configurable: true
		});
	}
	if ("_emdash_bylines_exist" in row) Object.defineProperty(data, FOLDED_BYLINES_EXIST, {
		value: row["_emdash_bylines_exist"] != null,
		enumerable: false,
		configurable: true
	});
	const foldedBylines = Reflect.get(data, FOLDED_BYLINES);
	if (!Array.isArray(foldedBylines)) return;
	const credits = creditsFromFoldedBylines(foldedBylines);
	data.bylines = credits;
	data.byline = credits[0]?.byline ?? null;
}
/**
* Build a `data.seo` object from the joined `_emdash_seo` columns on a row.
*
* Returns `null` when no SEO row exists (LEFT JOIN miss → `seo_no_index` is
* NULL, since the column is `NOT NULL DEFAULT 0` whenever a row is present).
* Returning null keeps the `seo` key off entries that have none, so
* `getSeoMeta()` falls back to its defaults exactly as before.
*/
function extractSeo(row) {
	const noIndex = row[SEO_COLUMN_ALIASES.seo_no_index];
	if (noIndex === null || noIndex === void 0) return null;
	const title = row[SEO_COLUMN_ALIASES.seo_title];
	const description = row[SEO_COLUMN_ALIASES.seo_description];
	const image = row[SEO_COLUMN_ALIASES.seo_image];
	const canonical = row[SEO_COLUMN_ALIASES.seo_canonical];
	return {
		title: typeof title === "string" ? title : null,
		description: typeof description === "string" ? description : null,
		image: typeof image === "string" ? image : null,
		canonical: typeof canonical === "string" ? canonical : null,
		noIndex: noIndex === 1
	};
}
/**
* Get the table name for a collection type
*/
function getTableName(type) {
	validateIdentifier(type, "collection type");
	return `ec_${type}`;
}
var TAXONOMY_NAMES_CACHE_KEY = Symbol.for("emdash:taxonomy-names:swr");
var taxonomyNamesStore = globalThis;
var taxonomyNamesCache = taxonomyNamesStore[TAXONOMY_NAMES_CACHE_KEY] ?? (() => {
	const cache = createRevalidatingCache();
	taxonomyNamesStore[TAXONOMY_NAMES_CACHE_KEY] = cache;
	return cache;
})();
async function fetchTaxonomyNames(db) {
	try {
		const defs = await selectTaxonomyDefs(db).execute();
		const namesByCollection = /* @__PURE__ */ new Map();
		for (const def of defs) for (const collection of parseTaxonomyCollections(def.collections)) {
			const names = namesByCollection.get(collection) ?? /* @__PURE__ */ new Set();
			names.add(def.name);
			namesByCollection.set(collection, names);
		}
		return namesByCollection;
	} catch (error) {
		if (!isMissingTableError(error) && !isMissingColumnError(error)) throw error;
		return /* @__PURE__ */ new Map();
	}
}
async function getTaxonomyNames(db, collection) {
	const load = () => fetchTaxonomyNames(db);
	return (getRequestContext()?.dbIsIsolated ? await load() : await revalidatingCached(taxonomyNamesCache, load, (error) => {
		console.error("[emdash:loader] revalidating taxonomy names failed:", error);
	})).get(collection) ?? /* @__PURE__ */ new Set();
}
/** Discard mappings after a local taxonomy-definition write. @internal */
function resetTaxonomyNamesCache() {
	invalidateRevalidatingCache(taxonomyNamesCache);
}
/**
* System columns to include in data (mapped to camelCase where needed)
*/
var INCLUDE_IN_DATA = {
	id: "id",
	status: "status",
	author_id: "authorId",
	primary_byline_id: "primaryBylineId",
	created_at: "createdAt",
	updated_at: "updatedAt",
	published_at: "publishedAt",
	scheduled_at: "scheduledAt",
	draft_revision_id: "draftRevisionId",
	live_revision_id: "liveRevisionId",
	locale: "locale",
	translation_group: "translationGroup"
};
/** System date columns that should be converted to Date objects */
var DATE_COLUMNS = /* @__PURE__ */ new Set([
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at"
]);
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
var LOCAL_MEDIA_FILE_PREFIX = "/_emdash/api/media/file/";
var URL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
/** Safely extract a string value from a record, returning fallback if not a string */
function rowStr(row, key, fallback = "") {
	const val = row[key];
	return typeof val === "string" ? val : fallback;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isBareMediaKey(src) {
	return !src.startsWith("/") && !URL_SCHEME_PATTERN.test(src);
}
function normalizeLocalMediaValue(value) {
	if (Array.isArray(value)) return value.map(normalizeLocalMediaValue);
	if (!isRecord(value)) return value;
	const normalized = {};
	for (const [key, child] of Object.entries(value)) normalized[key] = normalizeLocalMediaValue(child);
	if (normalized.provider === "local" && typeof normalized.src === "string" && normalized.src.length > 0) {
		const src = normalized.src;
		if (src.startsWith(LOCAL_MEDIA_FILE_PREFIX)) {
			const id = src.slice(24);
			if (!normalized.id && id) normalized.id = id;
		} else if (isBareMediaKey(src)) {
			if (!normalized.id) normalized.id = src;
			normalized.src = `${LOCAL_MEDIA_FILE_PREFIX}${src}`;
		}
	}
	return normalized;
}
/**
* Map a database row to entry data
* Extracts content fields (non-system columns) and parses JSON where needed.
* System columns needed for templates (id, status, dates) are included with camelCase names.
*/
function mapRowToData(row, booleanFields, sortColumn) {
	const data = {};
	const rawValues = {};
	for (const [key, value] of Object.entries(row)) {
		if (key in INCLUDE_IN_DATA) {
			if (DATE_COLUMNS.has(key)) if (typeof value === "string") {
				rawValues[key] = value;
				data[INCLUDE_IN_DATA[key]] = new Date(value);
			} else data[INCLUDE_IN_DATA[key]] = null;
			else data[INCLUDE_IN_DATA[key]] = value;
			continue;
		}
		if (SYSTEM_COLUMNS.has(key)) continue;
		if (booleanFields.has(key) && (typeof value === "boolean" || value === 0 || value === 1)) {
			data[key] = Boolean(value);
			continue;
		}
		if (typeof value === "string") try {
			if (value.startsWith("{") || value.startsWith("[")) data[key] = normalizeLocalMediaValue(JSON.parse(value));
			else data[key] = value;
		} catch {
			data[key] = value;
		}
		else data[key] = value;
	}
	stashSortValue(data, row, sortColumn, rawValues);
	return data;
}
/**
* Keep the row's raw sort value on `data` (non-enumerable) so the next-page
* cursor is encoded from the same value the keyset query compares against.
*/
function stashSortValue(data, row, sortColumn, rawValues = {}) {
	if (sortColumn !== void 0 && sortColumn in row) rawValues[sortColumn] = sortCursorValue(row[sortColumn]);
	Object.defineProperty(data, CURSOR_RAW_VALUES, {
		value: rawValues,
		enumerable: false,
		configurable: false,
		writable: false
	});
}
/**
* Fetch the draft revision snapshots for the rows a collection read should
* serve as drafts, keyed by content row ID. One query per `SQL_BATCH_SIZE`
* revisions; nothing runs unless `scope` is set.
*/
async function loadDraftRevisions(db, rows, scope) {
	const drafts = /* @__PURE__ */ new Map();
	if (!scope) return drafts;
	const wanted = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const draftId = rowStr(row, "draft_revision_id");
		if (!draftId) continue;
		if (scope !== "all" && scope.id !== rowStr(row, "id") && scope.id !== rowStr(row, "slug") && scope.id !== entryIdForRow(row)) continue;
		wanted.set(draftId, rowStr(row, "id"));
	}
	for (const ids of chunks([...wanted.keys()], 50)) {
		const result = await sql`
			SELECT id, data FROM revisions WHERE id IN (${sql.join(ids)})
		`.execute(db);
		for (const revision of result.rows) {
			const rowId = wanted.get(revision.id);
			if (rowId) drafts.set(rowId, JSON.parse(revision.data));
		}
	}
	return drafts;
}
/**
* Build an entry whose content fields come from a revision snapshot, keeping
* the system metadata of the content table row.
*/
function revisionEntry(row, parsed, booleanFields, sortColumn) {
	const systemData = {};
	for (const [key, mappedKey] of Object.entries(INCLUDE_IN_DATA)) if (key in row) if (DATE_COLUMNS.has(key)) systemData[mappedKey] = typeof row[key] === "string" ? new Date(row[key]) : null;
	else systemData[mappedKey] = row[key];
	const slug = typeof parsed._slug === "string" ? parsed._slug : rowStr(row, "slug");
	const revSlug = slug || rowStr(row, "id");
	const i18nConfig = virtualConfig?.i18n;
	const i18nEnabled = i18nConfig && i18nConfig.locales.length > 1;
	const revLocale = rowStr(row, "locale");
	const shouldPrefixRev = i18nEnabled && revLocale !== "" && (revLocale !== i18nConfig.defaultLocale || i18nConfig.prefixDefaultLocale);
	const data = {
		...systemData,
		slug,
		...mapRevisionData(parsed, booleanFields)
	};
	stashSortValue(data, row, sortColumn);
	return {
		id: shouldPrefixRev ? `${revLocale}/${revSlug}` : revSlug,
		slug,
		status: rowStr(row, "status", "draft"),
		data,
		cacheHint: { tags: [rowStr(row, "id")] }
	};
}
/**
* The entry id Astro addresses a row by: its slug, prefixed with the locale
* whenever i18n routing would prefix the URL. Shared by every path that builds
* a loader entry so a referenced entry carries the same id it would have been
* loaded under directly.
*/
function entryIdForRow(row) {
	const i18nConfig = virtualConfig?.i18n;
	const slug = rowStr(row, "slug") || rowStr(row, "id");
	const locale = rowStr(row, "locale");
	return i18nConfig && i18nConfig.locales.length > 1 && locale !== "" && (locale !== i18nConfig.defaultLocale || i18nConfig.prefixDefaultLocale) ? `${locale}/${slug}` : slug;
}
/**
* Load one locale variant of each translation group, in one query per
* `SQL_BATCH_SIZE` chunk of groups.
*
* A group's variant is the first of `localeChain` it has, or else its lowest
* locale code: a reference names a translation group, so a target that exists
* only outside the chain is still a real reference. Groups with no surviving
* variant are absent from the result.
*
* The rows go through the same {@link mapRowToData} as a direct entry load, so
* a referenced entry's `data` carries the same dates, booleans and normalized
* media values a caller would get from `getEmDashEntry`. Bylines and taxonomy
* terms are not hydrated; each would cost a correlated subquery per row.
*/
async function loadEntriesByGroups(type, translationGroups, options = {}) {
	if (translationGroups.length === 0) return [];
	const db = await getDb();
	const tableName = getTableName(type);
	const statusFilter = options.publishedOnly ? sql`AND status = ${"published"}` : sql``;
	const booleanFieldsSelect = foldedBooleanFieldsSelect(db, type);
	const localeChain = options.localeChain ?? [];
	const localeCandidates = [...new Set(localeChain.flatMap((locale) => getLocaleCandidates(locale)))];
	const chainPosition = localeCandidates.length > 0 ? sql`CASE locale ${sql.join(localeCandidates.map((locale, index) => sql`WHEN ${locale} THEN ${sql.lit(index)}`), sql` `)} ELSE ${sql.lit(localeCandidates.length)} END,` : sql``;
	const entries = [];
	try {
		for (const chunk of chunks(translationGroups, 50)) {
			const result = await sql`
				SELECT * FROM (
					SELECT *, ${booleanFieldsSelect},
						ROW_NUMBER() OVER (
							PARTITION BY translation_group ORDER BY ${chainPosition} locale ASC
						) AS ${sql.ref(VARIANT_RANK_COLUMN)}
					FROM ${sql.ref(tableName)}
					WHERE translation_group IN (${sql.join(chunk.map((group) => sql`${group}`))})
					AND deleted_at IS NULL
					${statusFilter}
				) AS variants
				WHERE ${sql.ref(VARIANT_RANK_COLUMN)} = 1
				ORDER BY translation_group ASC
			`.execute(db);
			const booleanFields = parseFoldedBooleanFields(result.rows[0]);
			for (const row of result.rows) entries.push({
				id: entryIdForRow(row),
				slug: rowStr(row, "slug"),
				status: rowStr(row, "status", "draft"),
				data: mapRowToData(row, booleanFields),
				cacheHint: { tags: [rowStr(row, "id")] }
			});
		}
	} catch (error) {
		if (isMissingTableError(error)) return [];
		throw error;
	}
	return entries;
}
function parseFoldedBooleanFields(row) {
	const raw = row?.[BOOLEAN_FIELDS_FOLDED_COLUMN];
	let values;
	if (typeof raw === "string") try {
		values = JSON.parse(raw);
	} catch {
		return /* @__PURE__ */ new Set();
	}
	else values = raw;
	if (!Array.isArray(values)) return /* @__PURE__ */ new Set();
	return new Set(values.filter((value) => typeof value === "string"));
}
/**
* Map revision data (already-parsed JSON object) to entry data.
* Strips _-prefixed metadata keys (e.g. _slug) used internally by revisions.
*/
function mapRevisionData(data, booleanFields) {
	const result = {};
	for (const [key, value] of Object.entries(data)) {
		if (key.startsWith("_")) continue;
		if (booleanFields.has(key) && (typeof value === "boolean" || value === 0 || value === 1)) {
			result[key] = Boolean(value);
			continue;
		}
		result[key] = normalizeLocalMediaValue(value);
	}
	return result;
}
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
* Get the primary sort field from an orderBy spec (first valid field, or default).
*/
function getPrimarySort(orderBy, tablePrefix) {
	if (orderBy) {
		for (const [field, direction] of Object.entries(orderBy)) if (FIELD_NAME_PATTERN.test(field)) return {
			field: tablePrefix ? `${tablePrefix}.${field}` : field,
			direction
		};
	}
	return {
		field: tablePrefix ? `${tablePrefix}.created_at` : "created_at",
		direction: "desc"
	};
}
/**
* Build ORDER BY clause from orderBy spec
* Validates field names to prevent SQL injection (alphanumeric + underscore only)
* Supports multiple sort fields in object key order
*/
function buildOrderByClause(orderBy, tablePrefix) {
	if (!orderBy || Object.keys(orderBy).length === 0) {
		const field = tablePrefix ? `${tablePrefix}.created_at` : "created_at";
		return sql`ORDER BY ${sql.ref(field)} DESC, ${sql.ref(tablePrefix ? `${tablePrefix}.id` : "id")} DESC`;
	}
	const sortParts = [];
	for (const [field, direction] of Object.entries(orderBy)) {
		if (!FIELD_NAME_PATTERN.test(field)) continue;
		const fullField = tablePrefix ? `${tablePrefix}.${field}` : field;
		const dir = direction === "asc" ? sql`ASC` : sql`DESC`;
		sortParts.push(sql`${sql.ref(fullField)} ${dir}`);
	}
	if (sortParts.length === 0) {
		const defaultField = tablePrefix ? `${tablePrefix}.created_at` : "created_at";
		return sql`ORDER BY ${sql.ref(defaultField)} DESC, ${sql.ref(tablePrefix ? `${tablePrefix}.id` : "id")} DESC`;
	}
	const primary = getPrimarySort(orderBy, tablePrefix);
	const idField = tablePrefix ? `${tablePrefix}.id` : "id";
	const idDir = primary.direction === "asc" ? sql`ASC` : sql`DESC`;
	sortParts.push(sql`${sql.ref(idField)} ${idDir}`);
	return sql`ORDER BY ${sql.join(sortParts, sql`, `)}`;
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
function decodeSortCursor(cursor, field) {
	const { orderValue, id } = decodeCursor(cursor);
	if (NON_NULL_SORT_COLUMNS.has(field)) return {
		value: orderValue,
		id
	};
	let payload;
	try {
		payload = JSON.parse(orderValue);
	} catch {
		payload = void 0;
	}
	if (payload === null || typeof payload !== "object") return {
		value: orderValue === "" ? null : orderValue,
		id
	};
	const candidate = payload;
	const { value } = candidate;
	if (candidate.version !== 1 || candidate.field !== field || value !== null && typeof value !== "string" && typeof value !== "number") throw new InvalidCursorError(cursor);
	return {
		value,
		id
	};
}
/**
* Keyset condition for the rows after `cursor`, ordered by `sort` then `id`
* in `direction`. The ORDER BY keeps each dialect's own NULL position, lowest
* on SQLite and highest on Postgres, so the condition follows it.
*
* Throws `InvalidCursorError` if the cursor is malformed; callers should
* let this propagate so users see a real error rather than silently
* falling back to the first page.
*/
function sortCursorCondition(db, cursor, column, direction, sort, id) {
	const { value, id: cursorId } = decodeSortCursor(cursor, column);
	const cmp = direction === "asc" ? sql.raw(">") : sql.raw("<");
	const nullsFirst = direction === "asc" !== isPostgres(db);
	if (value === null) return nullsFirst ? sql`(${sort} IS NOT NULL OR ${id} ${cmp} ${cursorId})` : sql`(${sort} IS NULL AND ${id} ${cmp} ${cursorId})`;
	const past = sql`${sort} ${cmp} ${value} OR (${sort} = ${value} AND ${id} ${cmp} ${cursorId})`;
	return nullsFirst || NON_NULL_SORT_COLUMNS.has(column) ? sql`(${past})` : sql`(${past} OR ${sort} IS NULL)`;
}
/**
* Build a cursor WHERE condition for keyset pagination.
* Uses the primary sort field + id as tiebreaker for stable ordering.
*/
function buildCursorCondition(db, cursor, orderBy, tablePrefix) {
	const primary = getPrimarySort(orderBy);
	const ref = (column) => sql.ref(tablePrefix ? `${tablePrefix}.${column}` : column);
	return sortCursorCondition(db, cursor, primary.field, primary.direction, ref(primary.field), ref("id"));
}
/** Type guard: is the where value a range object (not a string or array)? */
function isWhereRange(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* Keys a `where` or `orderBy` can name that belong to the table rather than to
* a field. `slug` is one of them; {@link SYSTEM_COLUMNS} leaves it out because
* it is kept in `entry.data` for templates.
*/
var SYSTEM_QUERY_KEYS = /* @__PURE__ */ new Set([...SYSTEM_COLUMNS, "slug"]);
/**
* The first of `keys` that names a reference field bound to a relation, or
* undefined.
*
* Such a field has no column: a `WHERE` on it fails with "no such column", which
* the catch below reads as an empty collection, and a field bound after its
* column existed answers from values it stopped writing. Both read to a template
* as "nothing matched", so the key has to be caught before the query is built.
*
* System columns are answered without a lookup, and the lookup itself is cached
* per request and in the schema object-cache namespace, so a render that filters
* by an ordinary field pays for this at most once between schema changes, and a
* render that filters by nothing never pays at all.
*/
async function findStoragelessQueryKey(collection, keys) {
	const candidates = keys.filter((key) => !SYSTEM_QUERY_KEYS.has(key));
	if (candidates.length === 0) return void 0;
	const { getReferenceFieldMap } = await import("./field-map-BSXdNGt5_ybTbeb2k.mjs").then((n) => n.t);
	const bound = await getReferenceFieldMap(collection);
	return candidates.find((key) => bound.has(key));
}
/**
* A boolean field owns an INTEGER column (`FIELD_TYPE_TO_COLUMN`) and its
* values are written as 0/1, so binding a native `true` against one is a type
* error on PostgreSQL. SQLite accepts the boolean and compares it as 1, which
* is why filtering by a boolean field only ever broke on one dialect.
*/
function bindableFilterValue(value) {
	return typeof value === "boolean" ? value ? 1 : 0 : value;
}
/**
* Build AND conditions for non-taxonomy field filters.
* Returns an array of sql fragments; empty if no field filters apply.
* Field names are validated against FIELD_NAME_PATTERN to prevent injection.
*
* D1 allows 100 bound parameters per statement, and an array filter binds one
* per value. So when the arrays in `fields` hold more than `SQL_BATCH_SIZE`
* values between them, the longest arrays are bound as a single JSON parameter
* each (`IN (SELECT value FROM json_each(?))`, or `jsonb_array_elements_text`
* on PostgreSQL) until the rest fit. The statement stays one query, so
* ordering, cursors, limit and offset stay in the database. Values bound that
* way compare as text.
*/
function buildFieldConditions(db, fields, tablePrefix) {
	const conditions = [];
	const arrayLengths = Object.entries(fields).filter((entry) => Array.isArray(entry[1])).map(([key, value]) => [key, value.length]).toSorted((a, b) => b[1] - a[1]);
	let inlineValues = arrayLengths.reduce((sum, [, length]) => sum + length, 0);
	const asJson = /* @__PURE__ */ new Set();
	for (const [key, length] of arrayLengths) {
		if (inlineValues <= 50) break;
		asJson.add(key);
		inlineValues -= length;
	}
	for (const [key, value] of Object.entries(fields)) {
		if (!FIELD_NAME_PATTERN.test(key)) {
			console.warn(`[emdash] where filter: invalid field name "${key}" ignored`);
			continue;
		}
		if (value == null) continue;
		const ref = tablePrefix ? sql.ref(`${tablePrefix}.${key}`) : sql.ref(key);
		if (isWhereRange(value)) {
			const { gt, gte, lt, lte } = value;
			if (gt === void 0 && gte === void 0 && lt === void 0 && lte === void 0) {
				console.warn(`[emdash] where filter: "${key}" is an object with none of gt/gte/lt/lte and was ignored (use an array for IN)`);
				continue;
			}
			if (gt !== void 0) conditions.push(sql`${ref} > ${bindableFilterValue(gt)}`);
			if (gte !== void 0) conditions.push(sql`${ref} >= ${bindableFilterValue(gte)}`);
			if (lt !== void 0) conditions.push(sql`${ref} < ${bindableFilterValue(lt)}`);
			if (lte !== void 0) conditions.push(sql`${ref} <= ${bindableFilterValue(lte)}`);
		} else if (Array.isArray(value)) {
			if (value.length === 0) continue;
			if (asJson.has(key)) {
				const values = value.map((v) => String(bindableFilterValue(v)));
				conditions.push(sql`${ref} IN (${jsonTextValues(db, values)})`);
			} else conditions.push(sql`${ref} IN (${sql.join(value.map((v) => sql`${bindableFilterValue(v)}`))})`);
		} else conditions.push(sql`${ref} = ${bindableFilterValue(value)}`);
	}
	return conditions;
}
/**
* Pivot rows from which a term counts as large. Seeking the pivot reads every
* assignment of the term; walking `ec_*` in sort order reads about
* `collection size / term size` rows per match. The walk wins only for large
* terms, and the size probe reads at most this many pivot index entries.
*
* The walk estimate assumes the term's entries are spread over the sort order
* and the requested locale. A term clustered in time, a deep page or a narrow
* byline filter makes the walk read up to the whole collection; the seek would
* still read every assignment of the term.
*/
var LARGE_TERM_ASSIGNMENTS = 200;
/** A single `published_at`/`created_at` sort, which an `ec_*` index serves in order. */
function isIndexedPivotSort(orderBy) {
	const validSortKeys = orderBy ? Object.keys(orderBy).filter((k) => FIELD_NAME_PATTERN.test(k)) : [];
	const primary = getPrimarySort(orderBy);
	return validSortKeys.length <= 1 && (primary.field === "published_at" || primary.field === "created_at");
}
/**
* Resolve a taxonomy filter (`name` + one or more `slug`s, optionally scoped to
* `locale`) to the set of `translation_group`s the pivot stores in
* `content_taxonomies.taxonomy_id`. Exact terms only — no subtree expansion.
*
* Mirrors the meaning of the old EXISTS join (`t.name = ? AND t.slug IN (?)
* [AND t.locale = ?]`): a pivot row matches when its group has a term with that
* name/slug in the active locale. Resolving to explicit values (rather than an
* `IN (subquery)`) keeps the single-term case a plain equality on the pivot
* index, which is what gives the clean early-`LIMIT` seek.
*
* With `probeCollection`, `large` reports whether a resolved term has at least
* {@link LARGE_TERM_ASSIGNMENTS} pivot rows in that collection. The capped
* probe rides in this query; a query of its own would add a round trip to
* every listing.
*/
async function resolveTermGroups(db, name, slugs, locale, probeCollection) {
	let query = db.selectFrom("taxonomies").select("translation_group").distinct().where("name", "=", name).where("slug", "in", slugs).$if(probeCollection !== void 0, (qb) => qb.select((eb) => eb.selectFrom("content_taxonomies").select(sql`1`.as("hit")).where("content_taxonomies.collection", "=", probeCollection).whereRef("content_taxonomies.taxonomy_id", "=", "taxonomies.translation_group").limit(1).offset(199).as("large")));
	if (locale) query = query.where(localeMatches("locale", locale));
	const rows = await query.execute();
	const groups = /* @__PURE__ */ new Set();
	let large = false;
	for (const row of rows) {
		if (row.translation_group) groups.add(row.translation_group);
		if (row.large != null) large = true;
	}
	return {
		groups: [...groups],
		large
	};
}
/** Equality (single) or `IN` (multiple) condition on a pivot group column. */
function pivotGroupCondition(ref, groups) {
	if (groups.length === 1) return sql`${sql.ref(ref)} = ${groups[0]}`;
	return sql`${sql.ref(ref)} IN (${sql.join(groups.map((g) => sql`${g}`))})`;
}
/** LIMIT/OFFSET fragment matching the loader's single-table variant. */
function buildPivotLimitOffset(db, fetchLimit, offset) {
	if (fetchLimit != null && offset != null) return sql`LIMIT ${fetchLimit} OFFSET ${offset}`;
	if (fetchLimit != null) return sql`LIMIT ${fetchLimit}`;
	if (offset != null) return isPostgres(db) ? sql`OFFSET ${offset}` : sql`LIMIT -1 OFFSET ${offset}`;
	return sql``;
}
/**
* Build the pivot-driven taxonomy listing query (#1834).
*
* Joins the term pivot to content translations through their shared
* translation_group. Content columns remain authoritative for locale,
* visibility, sorting, and cursor predicates.
*
* Two shapes:
* - **Indexed sort** (`published_at`/`created_at`, single sort field): the
*   `LIMIT` lives in `picked`, which either sorts the term's candidates or,
*   with `driveFromContent`, walks the `ec_*` sort index and stops at `LIMIT`.
* - **Temp-sort** (`updated_at` or any other field, or multi-field sort): no
*   pivot sort index applies, so `picked` collects the tagged candidate set and
*   the outer query sorts the joined rows. Bounded to tagged rows — no
*   `ec_*` full scan — but no early-`LIMIT`.
*/
function buildTaxonomyPivotQuery(opts) {
	const { db, collection, tableName, groupSets, orderBy, cursor, locale, status, deletedIsNull, bylineGroups, fetchLimit, offset, driveFromContent = false } = opts;
	const primary = getPrimarySort(orderBy);
	const isIndexedSort = isIndexedPivotSort(orderBy);
	const dir = primary.direction === "asc" ? sql`ASC` : sql`DESC`;
	const firstGroups = groupSets[0] ?? [];
	const restGroups = groupSets.slice(1);
	const multiGroup = firstGroups.length > 1;
	const residual = restGroups.length > 0 ? sql`${sql.join(restGroups.map((g) => sql`AND EXISTS (
						SELECT 1 FROM content_taxonomies ct2
						WHERE ct2.collection = ${collection}
							AND ct2.entry_id = ct.entry_id
							AND ${pivotGroupCondition("ct2.taxonomy_id", g)}
					)`), sql` `)}` : sql``;
	const bylineCt = bylineGroups ? sql`AND EXISTS (
				SELECT 1 FROM _emdash_content_bylines cb
				WHERE cb.collection_slug = ${collection}
					AND cb.content_id = r.id
					AND cb.byline_id IN (${sql.join(bylineGroups.map((g) => sql`${g}`))})
			)` : sql``;
	const firstGroupCond = pivotGroupCondition("ct.taxonomy_id", firstGroups);
	const pivotContentJoin = isPostgres(db) || driveFromContent ? sql`JOIN` : sql`CROSS JOIN`;
	const { terms: termsSelect, bylines: bylinesSelect, bylinesExist: bylinesExistSelect } = foldedHydrationSelects(db, collection, "r");
	const booleanFieldsSelect = foldedBooleanFieldsSelect(db, collection);
	const deletedR = deletedIsNull ? sql`r.deleted_at IS NULL` : sql`r.deleted_at IS NOT NULL`;
	const statusR = status !== void 0 ? sql`AND ${buildStatusCondition(db, status, "r")}` : sql``;
	const localeR = locale ? sql`AND ${localeMatches("r.locale", locale)}` : sql``;
	if (isIndexedSort) {
		const sortRef = sql.ref(`r.${primary.field}`);
		const sortval = multiGroup ? sql`MAX(${sortRef})` : sortRef;
		const groupByClause = multiGroup ? sql`GROUP BY r.id` : sql``;
		let cursorClause = sql``;
		let havingClause = sql``;
		if (cursor) {
			const cond = sortCursorCondition(db, cursor, primary.field, primary.direction, sortval, sql.ref("r.id"));
			if (multiGroup) havingClause = sql`HAVING ${cond}`;
			else cursorClause = sql`AND ${cond}`;
		}
		const limitClause = buildPivotLimitOffset(db, fetchLimit, offset);
		return sql`
			WITH picked AS (
				SELECT r.id AS entry_id, ${sortval} AS sortval
				FROM content_taxonomies ct
				${pivotContentJoin} ${sql.ref(tableName)} AS r ON r.translation_group = ct.entry_id
				WHERE ct.collection = ${collection}
					AND ${firstGroupCond}
					AND ${deletedR}
					${statusR}
					${localeR}
					${residual}
					${bylineCt}
					${cursorClause}
				${groupByClause}
				${havingClause}
				ORDER BY sortval ${dir}, r.id ${dir}
				${limitClause}
			)
			SELECT r.*, ${termsSelect}, ${bylinesSelect}, ${bylinesExistSelect}, ${booleanFieldsSelect}
			FROM picked JOIN ${sql.ref(tableName)} AS r ON r.id = picked.entry_id
			WHERE ${deletedR} ${statusR} ${localeR}
			ORDER BY picked.sortval ${dir}, picked.entry_id ${dir}
		`;
	}
	const orderByClause = buildOrderByClause(orderBy, "r");
	const cursorCond = cursor ? sql`AND ${buildCursorCondition(db, cursor, orderBy, "r")}` : sql``;
	const limitClause = buildPivotLimitOffset(db, fetchLimit, offset);
	return sql`
		WITH picked AS (
			SELECT DISTINCT r.id AS entry_id
			FROM content_taxonomies ct
			${pivotContentJoin} ${sql.ref(tableName)} AS r ON r.translation_group = ct.entry_id
			WHERE ct.collection = ${collection}
				AND ${firstGroupCond}
				AND ${deletedR}
				${statusR}
				${localeR}
				${residual}
				${bylineCt}
		)
		SELECT r.*, ${termsSelect}, ${bylinesSelect}, ${bylinesExistSelect}, ${booleanFieldsSelect}
		FROM picked JOIN ${sql.ref(tableName)} AS r ON r.id = picked.entry_id
		WHERE ${deletedR} ${statusR} ${localeR}
			${cursorCond}
		${orderByClause}
		${limitClause}
	`;
}
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
		dbInstance = new Kysely({
			dialect: virtualCreateDialect(virtualConfig.database.config),
			log: kyselyLogOption()
		});
	}
	return dbInstance;
}
/**
* Create an EmDash Live Collections loader
*
* This loader handles ALL content types in a single Astro collection.
* Use `getEmDashCollection()` and `getEmDashEntry()` to query
* specific content types.
*
* Database is configured in astro.config.mjs via the emdash() integration.
*
* @example
* ```ts
* // src/live.config.ts
* import { defineLiveCollection } from "astro:content";
* import { emdashLoader } from "emdash";
*
* export const collections = {
*   emdash: defineLiveCollection({
*     loader: emdashLoader(),
*   }),
* };
* ```
*/
function emdashLoader() {
	return {
		name: "emdash",
		async loadCollection({ filter }) {
			const callerColumns = /* @__PURE__ */ new Set();
			try {
				const db = await getDb();
				const type = filter?.type;
				if (!type) return { error: /* @__PURE__ */ new Error("type filter is required. Use getEmDashCollection() instead of getLiveCollection() directly.") };
				const tableName = getTableName(type);
				const status = filter?.status || "published";
				const limit = filter?.limit;
				const cursor = filter?.cursor;
				const where = filter?.where;
				const orderBy = filter?.orderBy;
				const locale = filter?.locale;
				const fetchLimit = limit ? limit + 1 : void 0;
				const rawOffset = cursor ? void 0 : filter?.offset;
				const offset = typeof rawOffset === "number" && Number.isInteger(rawOffset) && rawOffset > 0 ? rawOffset : void 0;
				const cursorCondition = cursor ? buildCursorCondition(db, cursor, orderBy) : null;
				let result;
				const taxonomyFilters = [];
				let bylineFilter = null;
				const fieldFilters = {};
				if (where && Object.keys(where).length > 0) {
					const taxNames = await getTaxonomyNames(db, type);
					for (const [key, value] of Object.entries(where)) {
						if (value == null) continue;
						if (key === "byline") {
							if (isWhereRange(value)) {
								console.warn(`[emdash] where filter: range operators are not supported on "byline", ignored`);
								continue;
							}
							bylineFilter = { groups: Array.isArray(value) ? value : [value] };
						} else if (taxNames.has(key)) {
							if (isWhereRange(value)) {
								console.warn(`[emdash] where filter: range operators are not supported on taxonomy "${key}", ignored`);
								continue;
							}
							const slugs = Array.isArray(value) ? value : [value];
							taxonomyFilters.push({
								name: key,
								slugs
							});
						} else fieldFilters[key] = value;
					}
				}
				const storagelessKey = await findStoragelessQueryKey(type, [...Object.keys(fieldFilters), ...Object.keys(orderBy ?? {})]);
				if (storagelessKey) {
					const message = `Cannot filter or sort "${type}" by "${storagelessKey}": it is a reference field bound to a relation, and its links are not stored on the entry. Read them with getEmDashEntry(..., { references }) or getEmDashReferences().`;
					console.warn(`[emdash] where filter: ${message}`);
					return { error: new Error(message) };
				}
				for (const key of [...Object.keys(fieldFilters), ...Object.keys(orderBy ?? {})]) {
					if (!FIELD_NAME_PATTERN.test(key) || SYSTEM_QUERY_KEYS.has(key)) continue;
					const name = key.toLowerCase();
					callerColumns.add(name);
					callerColumns.add(`${tableName}.${name}`);
					if (taxonomyFilters.length > 0 && Object.keys(fieldFilters).length === 0) callerColumns.add(`r.${name}`);
				}
				if (bylineFilter && bylineFilter.groups.length === 0 || taxonomyFilters.some((f) => f.slugs.length === 0)) return {
					entries: [],
					cacheHint: { tags: [type] }
				};
				if (taxonomyFilters.length > 0 && Object.keys(fieldFilters).length === 0) {
					const groupSets = [];
					const probeCollection = !isPostgres(db) && taxonomyFilters.length === 1 && taxonomyFilters[0]?.slugs.length === 1 && fetchLimit != null && isIndexedPivotSort(orderBy) ? type : void 0;
					let driveFromContent = false;
					for (const taxFilter of taxonomyFilters) {
						const { groups, large } = await resolveTermGroups(db, taxFilter.name, taxFilter.slugs, locale, probeCollection);
						if (groups.length === 0) return {
							entries: [],
							cacheHint: { tags: [type] }
						};
						groupSets.push(groups);
						driveFromContent = large && groups.length === 1;
					}
					result = await buildTaxonomyPivotQuery({
						db,
						collection: type,
						tableName,
						groupSets,
						orderBy,
						cursor,
						locale,
						status,
						deletedIsNull: true,
						bylineGroups: bylineFilter ? bylineFilter.groups : null,
						fetchLimit,
						offset,
						driveFromContent
					}).execute(db);
				} else {
					const orderByClause = buildOrderByClause(orderBy);
					const statusCondition = buildStatusCondition(db, status);
					const localeFilter = locale ? sql`AND ${localeMatches("locale", locale)}` : sql``;
					const cursorCond = cursorCondition ? sql`AND ${cursorCondition}` : sql``;
					const fieldConds = buildFieldConditions(db, fieldFilters);
					const fieldCondsSQL = fieldConds.length > 0 ? sql`${sql.join(fieldConds, sql` AND `)}` : null;
					const taxonomyCond = taxonomyFilters.length > 0 ? sql`${sql.join(taxonomyFilters.map((f) => sql`AND EXISTS (
							SELECT 1 FROM content_taxonomies ct
							INNER JOIN taxonomies t ON t.translation_group = ct.taxonomy_id
							WHERE ct.collection = ${type}
								AND ct.entry_id = ${sql.ref(tableName)}.translation_group
								AND t.name = ${f.name}
								AND t.slug IN (${sql.join(f.slugs.map((s) => sql`${s}`))})
							${locale ? sql`AND ${localeMatches("t.locale", locale)}` : sql``}
						)`), sql` `)}` : sql``;
					const bylineCond = bylineFilter ? sql`AND EXISTS (
							SELECT 1 FROM _emdash_content_bylines cb
							WHERE cb.collection_slug = ${type}
								AND cb.content_id = ${sql.ref(tableName)}.id
								AND cb.byline_id IN (${sql.join(bylineFilter.groups.map((g) => sql`${g}`))})
						)` : sql``;
					const { terms: termsSelect, bylines: bylinesSelect, bylinesExist: bylinesExistSelect } = foldedHydrationSelects(db, type, tableName);
					const booleanFieldsSelect = foldedBooleanFieldsSelect(db, type);
					let limitOffsetClause = sql``;
					if (fetchLimit != null && offset != null) limitOffsetClause = sql`LIMIT ${fetchLimit} OFFSET ${offset}`;
					else if (fetchLimit != null) limitOffsetClause = sql`LIMIT ${fetchLimit}`;
					else if (offset != null) limitOffsetClause = isPostgres(db) ? sql`OFFSET ${offset}` : sql`LIMIT -1 OFFSET ${offset}`;
					result = await sql`
						SELECT *, ${termsSelect}, ${bylinesSelect}, ${bylinesExistSelect}, ${booleanFieldsSelect} FROM ${sql.ref(tableName)}
						WHERE deleted_at IS NULL
						AND ${statusCondition}
						${localeFilter}
						${cursorCond}
						${taxonomyCond}
						${bylineCond}
						${fieldCondsSQL ? sql`AND ${fieldCondsSQL}` : sql``}
						${orderByClause}
						${limitOffsetClause}
					`.execute(db);
				}
				const hasMore = limit ? result.rows.length > limit : false;
				const rows = hasMore ? result.rows.slice(0, limit) : result.rows;
				const primary = getPrimarySort(orderBy);
				const sortColumn = primary.field.includes(".") ? primary.field.split(".").pop() : primary.field;
				const booleanFields = parseFoldedBooleanFields(rows[0]);
				const drafts = await loadDraftRevisions(db, rows, filter?.draftRevisions);
				const entries = rows.map((row) => {
					const draft = drafts.get(rowStr(row, "id"));
					if (draft) {
						const revEntry = revisionEntry(row, draft, booleanFields, sortColumn);
						stashFolded(revEntry.data, row);
						return revEntry;
					}
					const id = entryIdForRow(row);
					const data = mapRowToData(row, booleanFields, sortColumn);
					stashFolded(data, row);
					return {
						id,
						slug: rowStr(row, "slug"),
						status: rowStr(row, "status", "draft"),
						data,
						cacheHint: { tags: [rowStr(row, "id")] }
					};
				});
				let nextCursor;
				if (hasMore && rows.length > 0) {
					const lastRow = rows.at(-1);
					nextCursor = encodeSortCursor(sortColumn, lastRow[sortColumn], String(lastRow.id));
				}
				return {
					entries,
					nextCursor,
					cacheHint: { tags: [type] }
				};
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				if (isMissingTableError(error)) return { entries: [] };
				const missingColumn = getMissingColumnIdentifier(error);
				if (missingColumn && callerColumns.has(missingColumn)) {
					console.warn(`[emdash] where filter: ${message}`);
					return { entries: [] };
				}
				return { error: /* @__PURE__ */ new Error(`Failed to load collection: ${message}`) };
			}
		},
		async loadEntry({ filter }) {
			try {
				const db = await getDb();
				const type = filter?.type;
				const id = filter?.id;
				if (!type || !id) return { error: /* @__PURE__ */ new Error("type and id filters are required. Use getEmDashEntry() instead of getLiveEntry() directly.") };
				const tableName = getTableName(type);
				const locale = filter?.locale;
				const { terms: termsSelect, bylines: bylinesSelect, bylinesExist: bylinesExistSelect } = foldedHydrationSelects(db, type, "c");
				const seoSelect = foldedSeoSelect(db, type, "c");
				const booleanFieldsSelect = foldedBooleanFieldsSelect(db, type);
				const metadataSelect = sql`(
					SELECT ${isPostgres(db) ? sql`json_build_object` : sql`json_object`}(
						'bylinesExist', _emdash_bylines_exist,
						'booleanFields', _emdash_boolean_fields
					)
					FROM (SELECT ${bylinesExistSelect}, ${booleanFieldsSelect}) AS metadata
				) AS _emdash_entry_metadata`;
				const slugVisibility = filter?.publishedOnly ? sql`AND c.status = ${"published"}` : sql``;
				const row = (locale ? await sql`
							SELECT c.*, ${seoSelect}, ${termsSelect}, ${bylinesSelect}, ${metadataSelect}
							FROM ${sql.ref(tableName)} AS c
							WHERE c.deleted_at IS NULL
							AND ((c.slug = ${id} AND ${localeMatches("c.locale", locale)} ${slugVisibility}) OR c.id = ${id})
							ORDER BY CASE WHEN c.id = ${id} THEN 0 ELSE 1 END, ${localeOrder("c.locale", locale)}, c.id
							LIMIT 1
						`.execute(db) : await sql`
							SELECT c.*, ${seoSelect}, ${termsSelect}, ${bylinesSelect}, ${metadataSelect}
							FROM ${sql.ref(tableName)} AS c
							WHERE c.deleted_at IS NULL
							AND ((c.slug = ${id} ${slugVisibility}) OR c.id = ${id})
							LIMIT 1
						`.execute(db)).rows[0];
				if (!row) return;
				const rawMetadata = row._emdash_entry_metadata;
				const metadata = typeof rawMetadata === "string" ? JSON.parse(rawMetadata) : rawMetadata;
				delete row._emdash_entry_metadata;
				if (isPlainObject(metadata)) {
					row._emdash_bylines_exist = metadata.bylinesExist;
					row[BOOLEAN_FIELDS_FOLDED_COLUMN] = metadata.booleanFields;
				}
				expandFoldedSeo(row);
				const entryId = entryIdForRow(row);
				const revisionId = filter?.revisionId;
				if (revisionId) {
					const revData = (await sql`
						SELECT data FROM revisions
						WHERE id = ${revisionId}
						LIMIT 1
					`.execute(db)).rows[0];
					if (revData) {
						const revEntry = revisionEntry(row, JSON.parse(revData.data), parseFoldedBooleanFields(row));
						const revSeo = extractSeo(row);
						if (revSeo) {
							revEntry.data.seo = revSeo;
							primeSeoPanel(type, rowStr(row, "id"), revSeo);
						}
						stashFolded(revEntry.data, row);
						return revEntry;
					}
				}
				const entryData = mapRowToData(row, parseFoldedBooleanFields(row));
				const entrySeo = extractSeo(row);
				if (entrySeo) {
					entryData.seo = entrySeo;
					primeSeoPanel(type, rowStr(row, "id"), entrySeo);
				}
				stashFolded(entryData, row);
				return {
					id: entryId,
					slug: rowStr(row, "slug"),
					status: rowStr(row, "status", "draft"),
					data: entryData,
					cacheHint: { tags: [rowStr(row, "id")] }
				};
			} catch (error) {
				if (isMissingTableError(error)) return;
				const message = error instanceof Error ? error.message : String(error);
				return { error: /* @__PURE__ */ new Error(`Failed to load entry: ${message}`) };
			}
		}
	};
}
export { flushRecorder as C, createRecorder as S, kyselyLogOption as T, primeSeoPanel as _, FOLDED_TERMS as a, saveTaxonomyStructure as b, creditsFromFoldedBylines as c, findTaxonomyStructure as d, getDb as f, parseTaxonomyCollections as g, loader_exports as h, FOLDED_BYLINES_EXIST as i, emdashLoader as l, loadEntriesByGroups as m, FOLDED_AUTHOR_BYLINE as n, createRevalidatingCache as o, invalidateRevalidatingCache as p, FOLDED_BYLINES as r, creditFromFoldedAuthorByline as s, CURSOR_RAW_VALUES as t, encodeSortCursor as u, resetTaxonomyNamesCache as v, isInstrumentationEnabled as w, selectTaxonomyDefs as x, revalidatingCached as y };
