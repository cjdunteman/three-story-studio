import { a as __exportAll, b as resolveConfiguredLocale } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { n as localeMatches } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { a as InvalidCursorError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/search-BPWTnpnD.mjs
/**
* Marker stored in the `id` slot of a search pagination cursor.
*
* Search results are merged from per-collection FTS queries and re-sorted by
* score, so there is no single stable keyset column to encode (the way
* `getEmDashCollection` encodes `(orderValue, id)`). We page over the merged,
* score-sorted set by offset instead, carried as the cursor's `orderValue`.
* Reusing `encodeCursor`/`decodeCursor` keeps the opaque base64-JSON shape and
* the `InvalidCursorError` handling consistent with the rest of the API.
*/
var SEARCH_CURSOR_MARKER = "search";
/** Encode the next-page offset into an opaque search cursor. */
function encodeSearchCursor(offset) {
	return encodeCursor(String(offset), SEARCH_CURSOR_MARKER);
}
/**
* Decode a search cursor back to its offset. Throws `InvalidCursorError` for a
* malformed cursor or one that doesn't carry a non-negative integer offset, so
* a client pagination bug surfaces immediately rather than silently restarting
* from the first page.
*/
/** Upper bound on a decoded search offset, to cap the per-collection row fetch a forged cursor can trigger. */
var MAX_SEARCH_OFFSET = 1e4;
function decodeSearchOffset(cursor) {
	const { orderValue, id } = decodeCursor(cursor);
	if (id !== SEARCH_CURSOR_MARKER) throw new InvalidCursorError(cursor);
	const offset = Number(orderValue);
	if (!Number.isInteger(offset) || offset < 0 || offset > MAX_SEARCH_OFFSET) throw new InvalidCursorError(cursor);
	return offset;
}
/** Pattern to split on whitespace for query term extraction */
var WHITESPACE_SPLIT_PATTERN = /\s+/;
var FTS_OPERATORS_PATTERN = /\b(AND|OR|NOT|NEAR)\b/;
var DOUBLE_QUOTE_PATTERN = /"/g;
/**
* Detect FTS5 query syntax errors. Match specifically on the SQLite FTS5
* error fingerprints rather than a broad "fts5" / "syntax error" filter
* (which would also swallow internal table-corruption errors). The two
* fingerprints we care about are:
*
*  - "fts5: syntax error near …" — unbalanced quotes, stray operators,
*    other malformed user input
*  - "unknown special query: …" — bare special tokens like `^*` that
*    parse but don't resolve to a real FTS5 directive
*/
function isFts5SyntaxError(error) {
	if (!(error instanceof Error)) return false;
	const message = error.message.toLowerCase();
	return message.includes("fts5: syntax error") || message.includes("unknown special query");
}
/**
* Search across multiple collections (with explicit db)
*
* @internal Use `search()` in templates. This variant is for admin routes
* that already have a database handle.
*
* @param db - Kysely database instance
* @param query - Search query (FTS5 syntax supported)
* @param options - Search options
* @returns Search results with pagination
*/
async function searchWithDb(db, query, options = {}) {
	const ftsManager = new FTSManager(db);
	const limit = options.limit ?? 20;
	const status = options.status ?? "published";
	const offset = options.cursor ? decodeSearchOffset(options.cursor) : 0;
	if (!escapeQuery(query)) return { items: [] };
	const metadata = await ftsManager.getSearchMetadata(options.collections);
	const collections = options.collections?.length ? options.collections : [...metadata.keys()];
	const perCollectionLimit = offset + limit + 1;
	const allResults = [];
	for (const collection of collections) {
		const collectionMetadata = metadata.get(collection);
		if (!collectionMetadata) continue;
		const collectionResults = await searchSingleCollection(db, collection, query, {
			status,
			locale: options.locale,
			limit: perCollectionLimit,
			scope: options.scope
		}, collectionMetadata);
		allResults.push(...collectionResults);
	}
	allResults.sort((a, b) => b.score - a.score);
	return {
		items: allResults.slice(offset, offset + limit),
		nextCursor: allResults.length > offset + limit ? encodeSearchCursor(offset + limit) : void 0
	};
}
/**
* Internal function to search a single collection
*/
async function searchSingleCollection(db, collection, query, options, metadata) {
	validateIdentifier(collection, "collection slug");
	const ftsManager = new FTSManager(db);
	const ftsTable = ftsManager.getFtsTableName(collection);
	const contentTable = ftsManager.getContentTableName(collection);
	const limit = options.limit ?? 20;
	const status = options.status ?? "published";
	const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
	const escapedQuery = escapeQuery(query);
	if (!escapedQuery) return [];
	const { searchableFields, hasTitle, config } = metadata;
	const { weights, titleField } = config;
	let matchQuery = escapedQuery;
	if (options.scope === "title") {
		const titleColumn = titleField && searchableFields.includes(titleField) ? titleField : searchableFields.includes("title") ? "title" : void 0;
		if (!titleColumn) return [];
		validateIdentifier(titleColumn, "title field");
		matchQuery = `${titleColumn} : (${escapeQuery(query, false)})`;
	}
	let titleExpr;
	if (titleField) {
		validateIdentifier(titleField, "title field");
		titleExpr = sql`c.${sql.ref(titleField)}`;
	} else titleExpr = hasTitle ? sql`c.title` : sql`NULL`;
	let bm25Args = "";
	if (weights && searchableFields.length > 0) {
		const weightValues = ["0", "0"];
		for (const field of searchableFields) weightValues.push(String(weights[field] ?? 1));
		bm25Args = weightValues.join(", ");
	}
	const bm25Expr = bm25Args ? `bm25("${ftsTable}", ${bm25Args})` : `bm25("${ftsTable}")`;
	let results;
	try {
		results = await sql`
		SELECT
			c.id,
			c.slug,
			c.locale,
			${titleExpr} as title,
			snippet("${sql.raw(ftsTable)}", 2, '<mark>', '</mark>', '...', 32) as snippet,
			${sql.raw(bm25Expr)} as score
		FROM "${sql.raw(ftsTable)}" f
		JOIN "${sql.raw(contentTable)}" c ON f.id = c.id
		WHERE "${sql.raw(ftsTable)}" MATCH ${matchQuery}
		AND c.status = ${status}
		AND c.deleted_at IS NULL
		${locale ? sql`AND ${localeMatches("c.locale", locale)}` : sql``}
		ORDER BY score
		LIMIT ${limit}
	`.execute(db);
	} catch (error) {
		if (isFts5SyntaxError(error)) return [];
		throw error;
	}
	return results.rows.map((row) => ({
		collection,
		id: row.id,
		slug: row.slug,
		locale: row.locale,
		title: row.title ?? void 0,
		snippet: row.snippet === null ? void 0 : sanitizeSnippet(row.snippet),
		score: Math.abs(row.score)
	}));
}
var SNIPPET_AMP_RE = /&/g;
var SNIPPET_LT_RE = /</g;
var SNIPPET_GT_RE = />/g;
var SNIPPET_QUOT_RE = /"/g;
var SNIPPET_APOS_RE = /'/g;
/**
* Make an FTS5 snippet safe to render with `set:html` / `innerHTML`.
*
* SQLite's `snippet()` function splices literal `<mark>` and `</mark>`
* markers around matched terms but does not escape the surrounding
* source text. Posts that legitimately contain `<`, `>`, `&`, `"` or
* `'` would render as broken markup, and a `<script>` literal in a
* title (or any other indexed field) would execute when displayed.
*
* The fix: HTML-escape the whole string, which turns the markers into
* `&lt;mark&gt;` / `&lt;/mark&gt;`. Then restore those two patterns to
* their original tag form. The result is "the indexed text with all
* HTML metacharacters escaped, plus a small set of literal `<mark>`
* highlight tags around matched terms" — which matches the API's
* documented contract.
*/
function sanitizeSnippet(snippet) {
	return snippet.replace(SNIPPET_AMP_RE, "&amp;").replace(SNIPPET_LT_RE, "&lt;").replace(SNIPPET_GT_RE, "&gt;").replace(SNIPPET_QUOT_RE, "&quot;").replace(SNIPPET_APOS_RE, "&#39;").replaceAll("&lt;mark&gt;", "<mark>").replaceAll("&lt;/mark&gt;", "</mark>");
}
/**
* Get search suggestions for autocomplete
*
* @param db - Kysely database instance
* @param query - Partial search query
* @param options - Suggestion options
* @returns Array of suggestions
*/
async function getSuggestions(db, query, options = {}) {
	const limit = options.limit ?? 5;
	const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
	const prefixQuery = escapeQuery(query);
	if (!prefixQuery) return [];
	const ftsManager = new FTSManager(db);
	const metadata = await ftsManager.getSearchMetadata(options.collections);
	const collections = options.collections?.length ? options.collections : [...metadata.keys()];
	const suggestions = [];
	for (const collection of collections) {
		const collectionMetadata = metadata.get(collection);
		if (!collectionMetadata) continue;
		const { config, hasTitle } = collectionMetadata;
		let titleExpr;
		if (config.titleField) {
			validateIdentifier(config.titleField, "title field");
			titleExpr = sql`c.${sql.ref(config.titleField)}`;
		} else if (hasTitle) titleExpr = sql`c.title`;
		else continue;
		validateIdentifier(collection, "collection slug");
		const ftsTable = ftsManager.getFtsTableName(collection);
		const contentTable = ftsManager.getContentTableName(collection);
		let results;
		try {
			results = await sql`
				SELECT
					c.id,
					c.slug,
					${titleExpr} AS title
				FROM "${sql.raw(ftsTable)}" f
				JOIN "${sql.raw(contentTable)}" c ON f.id = c.id
				WHERE "${sql.raw(ftsTable)}" MATCH ${prefixQuery}
				AND c.status = 'published'
				AND c.deleted_at IS NULL
				AND ${titleExpr} IS NOT NULL
				${locale ? sql`AND ${localeMatches("c.locale", locale)}` : sql``}
				ORDER BY bm25("${sql.raw(ftsTable)}")
				LIMIT ${limit}
			`.execute(db);
		} catch (error) {
			if (isFts5SyntaxError(error)) continue;
			throw error;
		}
		for (const row of results.rows) suggestions.push({
			collection,
			id: row.id,
			slug: row.slug,
			title: row.title
		});
	}
	return suggestions.slice(0, limit);
}
/**
* Get search statistics for all collections
*/
async function getSearchStats(db) {
	const ftsManager = new FTSManager(db);
	const collections = await getSearchableCollections(db);
	const stats = { collections: {} };
	for (const collection of collections) {
		const collectionStats = await ftsManager.getIndexStats(collection);
		if (collectionStats) stats.collections[collection] = collectionStats;
	}
	return stats;
}
/**
* Get list of collections with search enabled
*/
async function getSearchableCollections(db) {
	return (await db.selectFrom("_emdash_collections").select(["slug", "search_config"]).execute()).filter((r) => {
		if (!r.search_config) return false;
		try {
			return JSON.parse(r.search_config).enabled === true;
		} catch {
			return false;
		}
	}).map((r) => r.slug);
}
/**
* Escape a query string for FTS5
*
* Handles special characters and prevents injection.
*/
function escapeQuery(query, allowOperators = true) {
	if (!query || typeof query !== "string") return "";
	query = query.trim();
	if (query.length === 0) return "";
	if (query.startsWith("\"") && query.endsWith("\"") && query.length >= 2) return `"${query.slice(1, -1).replace(DOUBLE_QUOTE_PATTERN, "\"\"")}"`;
	const escaped = query.replace(DOUBLE_QUOTE_PATTERN, "\"\"");
	if (allowOperators && FTS_OPERATORS_PATTERN.test(query)) return escaped;
	const terms = escaped.split(WHITESPACE_SPLIT_PATTERN).filter((t) => t.length > 0);
	if (terms.length === 0) return "";
	return terms.map((t) => `"${t}"*`).join(" ");
}
var search_exports = /* @__PURE__ */ __exportAll({ searchWithDb: () => searchWithDb });
export { search_exports as i, getSuggestions as n, searchWithDb as r, getSearchStats as t };
