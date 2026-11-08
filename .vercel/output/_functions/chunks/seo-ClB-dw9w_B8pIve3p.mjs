import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/seo-ClB-dw9w.mjs
/**
* SEO Handlers
*
* Business logic for sitemap generation and robots.txt.
*/
/**
* Entries per child sitemap. Collections with more indexable entries continue
* at `/sitemap-{collection}-2.xml`, `-3.xml`, and so on.
*/
var SITEMAP_PAGE_SIZE = 2e3;
/** Matches a trailing timezone designator (`Z` or `±HH`, `±HHMM`, `±HH:MM`). */
var TZ_SUFFIX_RE = /([zZ]|[+-]\d{2}(:?\d{2})?)$/;
/**
* Normalize a stored timestamp to W3C Datetime (ISO 8601) for sitemaps.
*
* `updated_at` is not guaranteed to be ISO: the column default is
* `datetime('now')` on SQLite and `CURRENT_TIMESTAMP` on Postgres, both of
* which store a space-separated `YYYY-MM-DD HH:MM:SS` string (and imported
* content can carry other shapes). The sitemap `<lastmod>` field requires
* W3C Datetime, and Google Search Console rejects the space-separated form
* as "Invalid date". Normalize defensively, assuming UTC when no offset is
* present (matches SQLite's `datetime('now')`). Valid date strings are
* normalized to UTC ISO 8601; unparseable values are returned as-is.
*/
function toW3CDate(value) {
	if (!value) return value;
	let normalized = value.trim();
	if (normalized.includes(" ") && !normalized.includes("T")) normalized = normalized.replace(" ", "T");
	if (!TZ_SUFFIX_RE.test(normalized)) normalized += "Z";
	const parsed = Date.parse(normalized);
	return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
}
/** Routable, SEO-enabled collections with a valid slug (optionally one collection). */
async function getSitemapCollections(db, collectionSlug) {
	let query = db.selectFrom("_emdash_collections").select(["slug", "url_pattern"]).where("has_seo", "=", 1).where("routable", "=", 1);
	if (collectionSlug) query = query.where("slug", "=", collectionSlug);
	return (await query.execute()).filter((col) => {
		try {
			validateIdentifier(col.slug, "collection slug");
			return true;
		} catch {
			console.warn(`[SITEMAP] Skipping collection with invalid slug: ${col.slug}`);
			return false;
		}
	});
}
/**
* Published, non-deleted rows with a slug that are not marked noindex.
* Content without an SEO row is indexable by default.
*/
function indexableRows(collection) {
	return sql`
		FROM ${sql.ref(`ec_${collection}`)} c
		LEFT JOIN _emdash_seo s
			ON s.collection = ${collection}
			AND s.content_id = c.id
		WHERE c.status = 'published'
		AND c.deleted_at IS NULL
		AND c.slug IS NOT NULL
		AND TRIM(c.slug) <> ''
		AND (s.seo_no_index IS NULL OR s.seo_no_index = 0)
	`;
}
/**
* List the child sitemaps for the sitemap index: one per page of each
* SEO-enabled collection that has indexable content, with the page's latest
* update as `lastmod`.
*/
async function handleSitemapIndexData(db, pageSize = SITEMAP_PAGE_SIZE) {
	try {
		const collections = await getSitemapCollections(db);
		const sitemaps = [];
		for (const col of collections) try {
			const rows = await sql`
					SELECT p.page AS page, MAX(p.updated_at) AS lastmod
					FROM (
						SELECT c.updated_at,
							(ROW_NUMBER() OVER (ORDER BY c.id) - 1) / CAST(${pageSize} AS INTEGER) AS page
						${indexableRows(col.slug)}
					) p
					GROUP BY p.page
					ORDER BY p.page
				`.execute(db);
			for (const row of rows.rows) sitemaps.push({
				collection: col.slug,
				page: Number(row.page) + 1,
				lastmod: toW3CDate(row.lastmod)
			});
		} catch (err) {
			console.warn(`[SITEMAP] Failed to query collection "${col.slug}":`, err);
		}
		return {
			success: true,
			data: { sitemaps }
		};
	} catch (error) {
		console.error("[SITEMAP_ERROR]", error);
		return {
			success: false,
			error: {
				code: "SITEMAP_ERROR",
				message: "Failed to generate sitemap index"
			}
		};
	}
}
/**
* Collect one page of published, indexable content per SEO-enabled
* collection for sitemap generation, ordered by ID so editing an entry does
* not move it to another page.
*
* Returns raw data grouped per collection. The caller (route) is
* responsible for building absolute URLs — this handler does NOT
* assume a URL structure.
*/
async function handleSitemapData(db, collectionSlug, options = {}) {
	const page = options.page ?? 1;
	const pageSize = options.pageSize ?? SITEMAP_PAGE_SIZE;
	try {
		const collections = await getSitemapCollections(db, collectionSlug);
		const result = [];
		for (const col of collections) try {
			const from = indexableRows(col.slug);
			const rows = await sql`
					WITH page AS (
						SELECT c.id, c.translation_group
						${from}
						ORDER BY c.id
						LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
					)
					SELECT c.slug, c.id, c.updated_at, c.published_at, c.locale, c.translation_group,
						s.seo_image,
						CASE WHEN c.id IN (SELECT id FROM page) THEN 1 ELSE 0 END AS on_page
					${from}
					AND (
						c.id IN (SELECT id FROM page)
						OR c.translation_group IN (SELECT translation_group FROM page)
					)
					ORDER BY c.id
				`.execute(db);
			const entries = [];
			const translations = [];
			for (const row of rows.rows) {
				const entry = {
					id: row.id,
					slug: row.slug,
					updatedAt: toW3CDate(row.updated_at),
					publishedAt: row.published_at ?? null,
					locale: row.locale,
					translationGroup: row.translation_group,
					image: row.seo_image ?? null
				};
				(Number(row.on_page) === 1 ? entries : translations).push(entry);
			}
			if (entries.length === 0) continue;
			result.push({
				collection: col.slug,
				urlPattern: col.url_pattern,
				entries,
				translations
			});
		} catch (err) {
			console.warn(`[SITEMAP] Failed to query collection "${col.slug}":`, err);
			continue;
		}
		return {
			success: true,
			data: { collections: result }
		};
	} catch (error) {
		console.error("[SITEMAP_ERROR]", error);
		return {
			success: false,
			error: {
				code: "SITEMAP_ERROR",
				message: "Failed to generate sitemap data"
			}
		};
	}
}
export { handleSitemapIndexData as n, handleSitemapData as t };
