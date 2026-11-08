import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { b as tableExists, d as isSqlite } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as SEARCH_TOKENIZERS } from "./types-Cj0_yZkn_CPN4An3-.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/fts-manager-6861qcwk.mjs
var fts_manager_exports = /* @__PURE__ */ __exportAll({ FTSManager: () => FTSManager });
var DEFAULT_SEARCH_TOKENIZER = "porter unicode61";
function isSearchTokenizer(value) {
	return SEARCH_TOKENIZERS.some((tokenizer) => tokenizer === value);
}
function resolveSearchTokenizer(tokenize) {
	if (tokenize === void 0) return DEFAULT_SEARCH_TOKENIZER;
	if (!isSearchTokenizer(tokenize)) throw new Error(`Unsupported FTS5 tokenizer: "${String(tokenize)}"`);
	return tokenize;
}
function parseSearchConfig(searchConfig, titleField) {
	try {
		const parsed = JSON.parse(searchConfig);
		if (typeof parsed !== "object" || parsed === null || !("enabled" in parsed) || typeof parsed.enabled !== "boolean") return null;
		const config = { enabled: parsed.enabled };
		if (titleField) config.titleField = titleField;
		if ("weights" in parsed && typeof parsed.weights === "object" && parsed.weights !== null) {
			const weights = {};
			for (const [k, v] of Object.entries(parsed.weights)) if (typeof v === "number") weights[k] = v;
			config.weights = weights;
		}
		if ("tokenize" in parsed) {
			if (!isSearchTokenizer(parsed.tokenize)) return null;
			config.tokenize = parsed.tokenize;
		}
		return config;
	} catch {
		return null;
	}
}
/**
* FTS5 Manager
*
* Handles creation, deletion, and management of FTS5 virtual tables
* for full-text search on content collections.
*/
var FTSManager = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Validate a collection slug and its searchable field names.
	* Must be called before any raw SQL interpolation.
	*/
	validateInputs(collectionSlug, searchableFields) {
		validateIdentifier(collectionSlug, "collection slug");
		if (searchableFields) for (const field of searchableFields) validateIdentifier(field, "searchable field name");
	}
	/**
	* Get the FTS table name for a collection
	* Uses _emdash_ prefix to clearly mark as internal/system table
	*/
	getFtsTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `_emdash_fts_${collectionSlug}`;
	}
	/**
	* Get the content table name for a collection
	*/
	getContentTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `ec_${collectionSlug}`;
	}
	/**
	* Check if an FTS table exists for a collection
	*/
	async ftsTableExists(collectionSlug) {
		const ftsTable = this.getFtsTableName(collectionSlug);
		return tableExists(this.db, ftsTable);
	}
	/**
	* Create an FTS5 virtual table for a collection.
	* FTS5 is SQLite-only; on other dialects this is a no-op.
	*
	* @param collectionSlug - The collection slug
	* @param searchableFields - Array of field names to index
	* @param weights - Optional field weights for ranking
	* @param tokenize - Optional FTS5 tokenizer configuration
	*/
	async createFtsTable(collectionSlug, searchableFields, _weights, tokenize) {
		const tokenizer = resolveSearchTokenizer(tokenize);
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const columns = [
			"id UNINDEXED",
			"locale UNINDEXED",
			...searchableFields
		].join(", ");
		await sql.raw(`
			CREATE VIRTUAL TABLE IF NOT EXISTS "${ftsTable}" USING fts5(
				${columns},
				tokenize='${tokenizer}'
			)
		`).execute(this.db);
		await this.createTriggers(collectionSlug, searchableFields);
	}
	/**
	* SQL expression producing the indexed value for one searchable field.
	*
	* Portable Text fields are stored as JSON; indexing the raw JSON pollutes
	* the index with structural tokens (`_type`, style values like `normal`,
	* `_key` ULIDs) and makes snippets show JSON fragments. Extract the prose
	* instead: every JSON string under a `text`, `alt`, `caption`, or `code`
	* key (span text, image alt/caption, code blocks). This is a superset of
	* `extractPlainText` in text-extraction.ts, which walks only known block
	* shapes — the SQL variant takes those keys at any depth, so search and
	* the extractPlainText consumers (vectorize/ai-search) can see different
	* text for the same document. Only JSON documents
	* (arrays/objects) are extracted; legacy rows holding a bare string or a
	* JSON scalar (`Some title`, `2024`) are indexed as-is. Extraction must
	* live in SQL because the sync triggers cannot call into JS.
	*
	* `ref` must be a validated column reference (`NEW.x`, `OLD.x`, `"x"`).
	*/
	searchValueExpr(ref, fieldType) {
		if (fieldType !== "portableText") return ref;
		return `CASE WHEN ${ref} IS NULL THEN NULL WHEN json_valid(${ref}) AND json_type(${ref}) IN ('array', 'object') THEN (SELECT group_concat(j.value, ' ') FROM json_tree(${ref}) AS j WHERE j.key IN ('text', 'alt', 'caption', 'code') AND j.type = 'text') ELSE ${ref} END`;
	}
	/**
	* Field type per slug for a collection, for choosing the indexed-value
	* expression. Fields missing from the schema fall back to raw indexing.
	*/
	async getFieldTypes(collectionSlug) {
		const collection = await this.db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!collection) return /* @__PURE__ */ new Map();
		const rows = await this.db.selectFrom("_emdash_fields").select(["slug", "type"]).where("collection_id", "=", collection.id).execute();
		return new Map(rows.map((r) => [r.slug, r.type]));
	}
	/**
	* Create triggers to keep FTS table in sync with content table.
	*
	* The insert and update triggers only add rows to the FTS index when
	* `deleted_at IS NULL`. This keeps soft-deleted content out of the
	* search index and ensures the FTS row count matches the non-deleted
	* content count (which `verifyAndRepairIndex` relies on).
	*
	* The FTS table stores its own values (no `content=` option), so removal
	* is a plain `DELETE FROM fts WHERE rowid = OLD.rowid` — a harmless no-op
	* for rows that were never indexed (soft-deleted content). The
	* external-content `'delete'`-command choreography and its corruption
	* modes (migration 039) do not apply to self-contained tables.
	*
	* `INSERT OR REPLACE` keeps the insert path idempotent: re-running a
	* populate (search repair runs per isolate, so two isolates can race) converges
	* on one index row per content row instead of failing on the rowid
	* constraint.
	*
	* The trigger SQL emitted here MUST stay in lock-step with migration
	* `064_fts_plain_text.ts`. If this changes again, add a new migration
	* rather than editing shipped ones — migrations are forward-only.
	*/
	async createTriggers(collectionSlug, searchableFields) {
		this.validateInputs(collectionSlug, searchableFields);
		if (searchableFields.length === 0) throw new Error(`Cannot create FTS triggers for collection "${collectionSlug}": no searchable fields. Mark at least one field as searchable before enabling search.`);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const newValueList = searchableFields.map((f) => this.searchValueExpr(`NEW.${f}`, fieldTypes.get(f))).join(", ");
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_insert"
			AFTER INSERT ON "${contentTable}"
			WHEN NEW.deleted_at IS NULL
			BEGIN
				INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				VALUES (NEW.rowid, NEW.id, NEW.locale, ${newValueList});
			END
		`).execute(this.db);
		const changedCondition = [
			"deleted_at",
			"locale",
			...searchableFields
		].map((f) => `OLD.${f} IS NOT NEW.${f}`).join(" OR ");
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_update"
			AFTER UPDATE ON "${contentTable}"
			WHEN ${changedCondition}
			BEGIN
				DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
				INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				SELECT NEW.rowid, NEW.id, NEW.locale, ${newValueList}
				WHERE NEW.deleted_at IS NULL;
			END
		`).execute(this.db);
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_delete"
			AFTER DELETE ON "${contentTable}"
			BEGIN
				DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
			END
		`).execute(this.db);
	}
	/**
	* Drop triggers for a collection
	*/
	async dropTriggers(collectionSlug) {
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_insert"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_update"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_delete"`).execute(this.db);
	}
	/**
	* Drop the FTS table and triggers for a collection
	*/
	async dropFtsTable(collectionSlug) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await this.dropTriggers(collectionSlug);
		await sql.raw(`DROP TABLE IF EXISTS "${ftsTable}"`).execute(this.db);
	}
	/**
	* Rebuild the FTS index for a collection
	*
	* This is useful after bulk imports or if the index gets out of sync.
	*/
	async rebuildIndex(collectionSlug, searchableFields, weights, tokenize) {
		resolveSearchTokenizer(tokenize);
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		await this.createFtsTable(collectionSlug, searchableFields, weights, tokenize);
		await this.populateFromContent(collectionSlug, searchableFields);
	}
	/**
	* Populate the FTS table from existing content.
	*
	* `INSERT OR REPLACE` so a concurrent double-populate (search repair runs
	* per isolate) converges instead of failing on the rowid constraint.
	*/
	async populateFromContent(collectionSlug, searchableFields) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const valueList = searchableFields.map((f) => this.searchValueExpr(`"${contentTable}"."${f}"`, fieldTypes.get(f))).join(", ");
		await sql.raw(`
			INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			SELECT rowid, id, locale, ${valueList} FROM "${contentTable}"
			WHERE deleted_at IS NULL
		`).execute(this.db);
	}
	/**
	* Index up to `limit` content rows with `rowid > afterRowid`, in rowid
	* order, so a large collection can be populated across several requests.
	* Returns the last rowid covered, or null when no rows remain. Returns
	* null on dialects without FTS5.
	*/
	async populateRange(collectionSlug, searchableFields, afterRowid, limit) {
		if (!isSqlite(this.db)) return null;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const last = (await sql`
			SELECT MAX(rowid) AS last FROM (
				SELECT rowid FROM ${sql.ref(contentTable)}
				WHERE rowid > ${afterRowid}
				ORDER BY rowid
				LIMIT ${limit}
			)
		`.execute(this.db)).rows[0]?.last ?? null;
		if (last === null) return null;
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const valueList = searchableFields.map((f) => this.searchValueExpr(`"${contentTable}"."${f}"`, fieldTypes.get(f))).join(", ");
		await sql`
			INSERT OR REPLACE INTO ${sql.ref(ftsTable)}(rowid, id, locale, ${sql.raw(fieldList)})
			SELECT rowid, id, locale, ${sql.raw(valueList)} FROM ${sql.ref(contentTable)}
			WHERE deleted_at IS NULL AND rowid > ${afterRowid} AND rowid <= ${last}
		`.execute(this.db);
		return Number(last);
	}
	/**
	* Get the search configuration for a collection
	*/
	async getSearchConfig(collectionSlug) {
		const result = await this.db.selectFrom("_emdash_collections").select(["search_config", "title_field"]).where("slug", "=", collectionSlug).executeTakeFirst();
		if (!result?.search_config) return null;
		return parseSearchConfig(result.search_config, result.title_field);
	}
	/**
	* Load all metadata needed to search the requested collections in one round trip.
	* Omitted or empty slugs select all search-enabled collections.
	*/
	async getSearchMetadata(collectionSlugs) {
		if (!isSqlite(this.db)) return /* @__PURE__ */ new Map();
		let query = this.db.selectFrom("_emdash_collections as c").select([
			"c.slug",
			"c.search_config",
			"c.title_field",
			sql`(
					SELECT json_group_array(name ORDER BY cid)
					FROM pragma_table_info(${"_emdash_fts_"} || c.slug)
					WHERE cid >= 2
				)`.as("searchable_fields"),
			sql`EXISTS (
					SELECT 1 FROM _emdash_fields WHERE collection_id = c.id AND slug = 'title'
				)`.as("has_title")
		]).where("c.search_config", "is not", null).where(sql`EXISTS (
				SELECT 1 FROM sqlite_master
				WHERE type = 'table' AND name = ${"_emdash_fts_"} || c.slug
			)`);
		if (collectionSlugs?.length) query = query.where("c.slug", "in", sql`(SELECT value FROM json_each(${JSON.stringify(collectionSlugs)}))`);
		const metadata = /* @__PURE__ */ new Map();
		for (const row of await query.execute()) {
			const config = row.search_config ? parseSearchConfig(row.search_config, row.title_field) : null;
			if (!config?.enabled) continue;
			const searchableFields = JSON.parse(row.searchable_fields);
			if (!Array.isArray(searchableFields) || !searchableFields.every((field) => typeof field === "string")) throw new Error("Invalid FTS field metadata");
			metadata.set(row.slug, {
				config,
				searchableFields,
				hasTitle: Boolean(row.has_title)
			});
		}
		return metadata;
	}
	/**
	* Update the search configuration for a collection
	*/
	async setSearchConfig(collectionSlug, config) {
		if (config.tokenize !== void 0) resolveSearchTokenizer(config.tokenize);
		await this.db.updateTable("_emdash_collections").set({ search_config: JSON.stringify(config) }).where("slug", "=", collectionSlug).execute();
	}
	/**
	* Get searchable fields for a collection. Fields that store no column (bound
	* reference fields) are left out: the index triggers read each field's column.
	*/
	async getSearchableFields(collectionSlug) {
		const collection = await this.db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!collection) return [];
		return (await this.db.selectFrom("_emdash_fields").select([
			"slug",
			"type",
			"validation"
		]).where("collection_id", "=", collection.id).where("searchable", "=", 1).execute()).filter((f) => !isStoragelessFieldRow(f)).map((f) => f.slug);
	}
	/**
	* Whether a collection has a user-defined `title` field.
	*
	* `title` is not a system column on `ec_*` tables -- it exists only when a
	* collection defines a field with slug `title`. Search and suggestion SQL
	* that selects `c.title` must check this first; otherwise collections
	* without a title field raise "no such column: c.title".
	*/
	async hasTitleColumn(collectionSlug) {
		return (await this.getCollectionsWithTitleColumn([collectionSlug])).has(collectionSlug);
	}
	/**
	* Bulk variant of `hasTitleColumn()`: which of the given collections have
	* a user-defined `title` field. One query instead of one `hasTitleColumn`
	* round-trip pair per collection -- callers that check this once per
	* collection in a loop (multi-collection search, suggestions) should use
	* this instead (AGENTS.md: "one query beats two").
	*/
	async getCollectionsWithTitleColumn(collectionSlugs) {
		if (collectionSlugs.length === 0) return /* @__PURE__ */ new Set();
		const rows = await this.db.selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select(["c.slug as collection_slug"]).where("f.slug", "=", "title").execute();
		const withTitle = new Set(rows.map((r) => r.collection_slug));
		return new Set(collectionSlugs.filter((slug) => withTitle.has(slug)));
	}
	/**
	* Enable search for a collection.
	*
	* Uses rebuildIndex to ensure a clean state -- drop any existing FTS
	* table/triggers, recreate them, and populate from content. This avoids
	* duplicate rows when triggers have already populated the index (e.g.
	* during seeding where content is inserted before search is enabled).
	*/
	async enableSearch(collectionSlug, options) {
		if (options?.tokenize !== void 0) resolveSearchTokenizer(options.tokenize);
		if (!isSqlite(this.db)) throw new Error("Full-text search is only available with SQLite databases");
		const searchableFields = await this.getSearchableFields(collectionSlug);
		if (searchableFields.length === 0) throw new Error(`No searchable fields defined for collection "${collectionSlug}". Mark at least one field as searchable before enabling search.`);
		const existing = await this.getSearchConfig(collectionSlug);
		const weights = options?.weights ?? existing?.weights;
		const tokenize = options?.tokenize ?? existing?.tokenize;
		await this.rebuildIndex(collectionSlug, searchableFields, weights, tokenize);
		await this.setSearchConfig(collectionSlug, {
			enabled: true,
			weights,
			tokenize
		});
	}
	/**
	* Disable search for a collection
	*
	* Drops the FTS table and triggers.
	*/
	async disableSearch(collectionSlug) {
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		const existing = await this.getSearchConfig(collectionSlug);
		await this.setSearchConfig(collectionSlug, {
			enabled: false,
			weights: existing?.weights,
			tokenize: existing?.tokenize
		});
	}
	/**
	* Get index statistics for a collection
	*/
	async getIndexStats(collectionSlug) {
		if (!isSqlite(this.db)) return null;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		if (!await this.ftsTableExists(collectionSlug)) return null;
		return { indexed: (await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db)).rows[0]?.count ?? 0 };
	}
	/**
	* Verify FTS index integrity and rebuild if drift is detected.
	*
	* Cheap belt-and-braces check, run lazily on the first search request
	* per isolate. The expensive cases (corrupted indexes from pre-fix
	* EmDash versions, broken legacy triggers) are handled at boot time by
	* migration `039_fix_fts5_triggers`, not here. This routine sticks to:
	*
	*   1. FTS table missing while config says search is enabled -> rebuild.
	*   2. Row count mismatch between content table and FTS docsize -> rebuild.
	*
	* Returns true if the index was rebuilt, false if it was healthy.
	*/
	async verifyAndRepairIndex(collectionSlug) {
		if (!isSqlite(this.db)) return false;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		const contentTable = this.getContentTableName(collectionSlug);
		const fields = await this.getSearchableFields(collectionSlug);
		const config = await this.getSearchConfig(collectionSlug);
		if (!await this.ftsTableExists(collectionSlug)) {
			if (!config?.enabled || fields.length === 0) return false;
			console.warn(`FTS index for "${collectionSlug}" is missing. Rebuilding.`);
			await this.rebuildIndex(collectionSlug, fields, config.weights, config.tokenize);
			return true;
		}
		const contentCount = await sql`
			SELECT COUNT(*) as count FROM ${sql.ref(contentTable)}
			WHERE deleted_at IS NULL
		`.execute(this.db);
		const ftsCount = await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db);
		const contentRows = contentCount.rows[0]?.count ?? 0;
		const ftsRows = ftsCount.rows[0]?.count ?? 0;
		if (contentRows !== ftsRows) {
			console.warn(`FTS index for "${collectionSlug}" has ${ftsRows} rows but content table has ${contentRows}. Rebuilding.`);
			if (fields.length > 0) await this.rebuildIndex(collectionSlug, fields, config?.weights, config?.tokenize);
			return true;
		}
		return false;
	}
	/**
	* Verify and repair FTS indexes for all search-enabled collections.
	*
	* Intended to run at startup to auto-heal any corruption from
	* previous process crashes.
	*/
	async verifyAndRepairAll() {
		if (!isSqlite(this.db)) return 0;
		const collections = await this.db.selectFrom("_emdash_collections").select("slug").where("search_config", "is not", null).execute();
		let repaired = 0;
		for (const { slug } of collections) {
			if (!(await this.getSearchConfig(slug))?.enabled) continue;
			try {
				if (await this.verifyAndRepairIndex(slug)) repaired++;
			} catch (error) {
				console.error(`Failed to verify/repair FTS index for "${slug}":`, error);
			}
		}
		return repaired;
	}
};
export { fts_manager_exports as n, FTSManager as t };
