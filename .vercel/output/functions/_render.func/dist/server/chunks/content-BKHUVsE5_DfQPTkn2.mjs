import { a as __exportAll, d as normalizeExplicitDatetime, h as getLocaleCandidates } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { c as executeAtomicBatchIfSupported, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { n as localeMatches, r as localeOrder, t as canonicalLocaleColumn } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { l as invalidateCollectionCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { c as isIndexableFieldType, u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import { a as InvalidCursorError, c as ScheduledNotDueError, i as EmDashValidationError, l as decodeCursor, n as ContentMutationConflictError, r as ContentSlugConflictError, t as ContentCollectionNotFoundError, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import { n as RevisionRepository, r as createRevisionId, t as ContentDatetimeNormalizer } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/content-BKHUVsE5.mjs
/**
* Reconcile an entry's keys with the fields its collection currently declares.
*
* A draft revision stores the whole `data` as JSON, so deleting a field leaves the old
* value inside the revision. Every content-write surface needs the same two rules to keep
* that from stranding the entry, so they live here rather than in one caller.
*/
/** Keys EmDash reserves (`_slug` and the like). No field declares them. */
function isReservedKey(key) {
	return key.startsWith("_");
}
/**
* The entry data without the keys the collection has no field for.
*
* Reserved keys are kept.
*/
function keepKnownFields(data, knownFieldSlugs) {
	const result = {};
	for (const [key, value] of Object.entries(data)) if (isReservedKey(key) || knownFieldSlugs.has(key)) result[key] = value;
	return result;
}
/**
* Incoming keys with no matching field that the entry already stores.
*
* Dropping these lets a read-then-write save succeed after the field was deleted. A key the
* entry has never stored is not returned, so a genuinely unknown field is still reported.
*/
function staleStoredKeys(data, stored, knownFieldSlugs) {
	return Object.keys(data).filter((key) => !isReservedKey(key) && !knownFieldSlugs.has(key) && Object.hasOwn(stored, key));
}
/**
* FTS5 match-expression builder for structured (non-user-syntax) queries.
*
* Unlike `escapeQuery` in `query.ts` (which powers the public search API and
* deliberately passes through FTS5 operators like AND/OR/NOT), this builder
* treats the input as plain words: every term is double-quoted with interior
* quotes escaped, so the result can never produce an FTS5 syntax error. Used
* by the admin content-list filter, where the input is a filter box, not a
* search-syntax field.
*/
var WHITESPACE_RE = /\s+/;
var DOUBLE_QUOTE_RE = /"/g;
var GLOB_SPECIAL_RE = /[[\]*?]/g;
/**
* Build a prefix-matching FTS5 MATCH expression from free-form input.
*
* `hello wor` becomes `"hello"* "wor"*` — implicit AND with per-term prefix
* matching. Returns `""` when the input contains no usable terms; callers
* must fall back to their non-FTS path in that case.
*/
function buildFtsPrefixMatch(input) {
	const terms = input.trim().split(WHITESPACE_RE).map((term) => term.replace(DOUBLE_QUOTE_RE, "\"\"")).filter((term) => term.length > 0);
	if (terms.length === 0) return "";
	return terms.map((term) => `"${term}"*`).join(" ");
}
/**
* Build a GLOB prefix pattern from free-form input, treating GLOB
* metacharacters (`* ? [ ]`) literally by wrapping each in a character
* class (GLOB has no ESCAPE clause).
*
* GLOB (unlike default LIKE) is case-sensitive, so with a lowercased
* pattern it matches slugs (lowercase by construction) while staying
* servable by the ordinary BINARY-collated slug index — SQLite's GLOB
* optimization turns a `prefix*` pattern into an index range scan.
*/
function buildSlugGlobPrefix(input) {
	return `${input.trim().toLowerCase().replace(GLOB_SPECIAL_RE, (c) => `[${c}]`)}*`;
}
var content_exports = /* @__PURE__ */ __exportAll({
	ContentRepository: () => ContentRepository,
	isConfirmedStatementFailure: () => isConfirmedStatementFailure,
	isSystemOrderField: () => isSystemOrderField
});
var ULID_PATTERN = /^[0-9A-Z]{26}$/;
var SQLSTATE_PATTERN = /^[0-9A-Z]{5}$/;
var MAX_DRAFT_STAGE_ATTEMPTS = 32;
var LIKE_WILDCARD_RE = /[\\%_]/g;
var MAX_INDEXED_FIELD_FILTERS = 20;
var MAX_IN_FILTER_VALUES = 50;
var MAX_FILTER_STRING_LENGTH = 2048;
function assertRevisionPrecondition(item, expected) {
	if (expected && (item.version !== expected.version || item.updatedAt !== expected.updatedAt)) throw new ContentMutationConflictError();
}
function nullableColumnMatch(column, value) {
	validateIdentifier(column, "content column");
	return value === null ? sql`${sql.ref(column)} IS NULL` : sql`${sql.ref(column)} = ${value}`;
}
function sameStoredValue(left, right) {
	return Object.is(serializeValue(left), serializeValue(right));
}
function matchesPublication(observed, existing, revisionData, revisionId, slug, publishedAt, updatedAt) {
	if (observed.version !== existing.version + 1 || observed.status !== "published" || observed.slug !== slug || observed.liveRevisionId !== revisionId || observed.draftRevisionId !== null || observed.scheduledAt !== null || observed.publishedAt !== publishedAt || observed.updatedAt !== updatedAt) return false;
	return Object.entries(revisionData).every(([key, value]) => SYSTEM_COLUMNS.has(key) || key.startsWith("_") || sameStoredValue(observed.data[key], value));
}
function matchesLifecyclePublication(observed, existing, liveRevisionId, publishedAt, updatedAt) {
	if (observed.version !== existing.version + 1 || observed.status !== "published" || observed.slug !== existing.slug || observed.liveRevisionId !== liveRevisionId || observed.draftRevisionId !== null || observed.scheduledAt !== null || observed.publishedAt !== publishedAt || observed.updatedAt !== updatedAt) return false;
	return Object.entries(existing.data).every(([key, value]) => sameStoredValue(observed.data[key], value));
}
function matchesPublicationFence(observed, existing) {
	return observed.version === existing.version && observed.status === existing.status && observed.liveRevisionId === existing.liveRevisionId && observed.draftRevisionId === existing.draftRevisionId && observed.scheduledAt === existing.scheduledAt;
}
function isConfirmedStatementFailure(error) {
	if (typeof error !== "object" || error === null || !("code" in error)) return false;
	const code = error.code;
	return typeof code === "string" && (code === "ERR_SQLITE_ERROR" || code.startsWith("SQLITE_") || SQLSTATE_PATTERN.test(code));
}
function encodeNullableOrderCursor(field, value, id) {
	return encodeCursor(JSON.stringify({
		version: 1,
		field,
		value
	}), id);
}
/**
* `acceptPlain` also accepts the plain `{ orderValue, id }` cursor that
* built-in and collection sort fields were paged with before, which wrote a
* NULL as "".
*/
function decodeNullableOrderCursor(cursor, field, { acceptPlain = false } = {}) {
	const { orderValue, id } = decodeCursor(cursor);
	let payload;
	try {
		payload = JSON.parse(orderValue);
	} catch {
		payload = void 0;
	}
	if (payload === null || typeof payload !== "object") {
		if (acceptPlain) return {
			value: orderValue === "" ? null : orderValue,
			id
		};
		throw new InvalidCursorError(cursor);
	}
	const candidate = payload;
	const validValue = candidate.value === null || typeof candidate.value === "string" || typeof candidate.value === "number";
	if (candidate.version !== 1 || candidate.field !== field || !validValue) throw new InvalidCursorError(cursor);
	return {
		value: candidate.value,
		id
	};
}
/**
* Keyset condition for the rows after (`value`, `cursorId`) in a sort by the
* nullable `column`, then `id`. The ORDER BY keeps each dialect's own NULL
* position, lowest on SQLite and highest on Postgres, so the condition follows
* it.
*/
function nullableOrderCondition(db, column, direction, value, cursorId) {
	const sort = sql.ref(column);
	const id = sql.ref("id");
	const cmp = direction === "ASC" ? sql.raw(">") : sql.raw("<");
	const nullsFirst = direction === "ASC" !== isPostgres(db);
	if (value === null) return nullsFirst ? sql`(${sort} IS NOT NULL OR ${id} ${cmp} ${cursorId})` : sql`(${sort} IS NULL AND ${id} ${cmp} ${cursorId})`;
	const past = sql`(${sort}, ${id}) ${cmp} (${value}, ${cursorId})`;
	return nullsFirst ? past : sql`(${past} OR ${sort} IS NULL)`;
}
/**
* Whitelist mapping a public date-filter field to its physical column. Keeping
* this separate from `mapOrderField` makes the filterable set explicit and
* prevents filtering on arbitrary columns.
*/
var DATE_FILTER_COLUMNS = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	publishedAt: "published_at"
};
/**
* Built-in sort fields → their physical columns. A closed set that blocks
* sorting by arbitrary columns; per-collection fields are allowed
* separately via `mapOrderField`'s `sortableExtras`.
*/
var ORDER_FIELD_COLUMNS = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	publishedAt: "published_at",
	scheduledAt: "scheduled_at",
	deletedAt: "deleted_at",
	title: "title",
	name: "name",
	slug: "slug",
	status: "status",
	locale: "locale"
};
/**
* Order columns every row has a value for. Their cursors keep the plain
* `{ orderValue, id }` shape; a cursor for any other order column records a
* NULL explicitly.
*/
var NON_NULL_ORDER_COLUMNS = /* @__PURE__ */ new Set([
	"created_at",
	"updated_at",
	"status",
	"locale"
]);
/** True when `field` maps to a system column and needs no per-collection resolution. */
function isSystemOrderField(field) {
	return field in ORDER_FIELD_COLUMNS;
}
/**
* System columns that exist in every ec_* table
*/
var SYSTEM_COLUMNS = /* @__PURE__ */ new Set([
	"id",
	"slug",
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
	"translation_group"
]);
/**
* Get the table name for a collection type
*/
function getTableName(type) {
	validateIdentifier(type, "collection type");
	return `ec_${type}`;
}
function assertPageOffset(offset, cursor) {
	if (offset === void 0) return;
	if (cursor !== void 0) throw new EmDashValidationError("cursor and offset cannot be used together");
	if (!Number.isSafeInteger(offset) || offset < 0) throw new EmDashValidationError("offset must be a non-negative integer");
}
/**
* Serialize a value for database storage
* Objects/arrays are JSON-stringified
* Booleans are converted to 0/1 for SQLite
*/
function serializeValue(value) {
	if (value === null || value === void 0) return null;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (typeof value === "object") return JSON.stringify(value);
	return value;
}
function writableContentData(data) {
	const writable = {};
	for (const [key, value] of Object.entries(data)) {
		if (SYSTEM_COLUMNS.has(key)) continue;
		validateIdentifier(key, "content field name");
		writable[key] = value;
	}
	return writable;
}
/**
* Deserialize a value from database storage
* Attempts to parse JSON strings that look like objects/arrays
*/
function deserializeValue(value) {
	if (typeof value === "string") {
		if (value.startsWith("{") || value.startsWith("[")) try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	return value;
}
/** Pattern for escaping special regex characters */
var REGEX_ESCAPE_PATTERN = /[.*+?^${}()|[\]\\]/g;
/**
* Escape special regex characters in a string for use in `new RegExp()`
*/
function escapeRegExp(s) {
	return s.replace(REGEX_ESCAPE_PATTERN, "\\$&");
}
/**
* Repository for content CRUD operations
*
* Content is stored in per-collection tables (ec_posts, ec_pages, etc.)
* Each field becomes a real column in the table.
*/
var ContentRepository = class {
	datetimes;
	constructor(db, datetimeContexts) {
		this.db = db;
		this.datetimeContexts = datetimeContexts;
		this.datetimes = new ContentDatetimeNormalizer(db, datetimeContexts);
	}
	async assertAliasAwareSlugAvailable(type, slug, locale, excludeId) {
		if (!slug || !locale || getLocaleCandidates(locale).length <= 1) return;
		const tableName = getTableName(type);
		if ((await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE slug = ${slug}
			AND ${localeMatches("locale", locale)}
			${excludeId === void 0 ? sql`` : sql`AND id <> ${excludeId}
				AND coalesce((SELECT existing_row.slug FROM ${sql.ref(tableName)} AS existing_row WHERE existing_row.id = ${excludeId}), '') <> ${slug}`}
			LIMIT 1
		`.execute(this.db)).rows.length > 0) throw new ContentSlugConflictError();
	}
	/**
	* Create a new content item
	*/
	async create(input) {
		const id = input.id ?? ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const { type, slug, data: inputData, status = "draft", authorId, primaryBylineId, locale, translationOf, inheritFields = [], publishedAt, createdAt } = input;
		const data = await this.datetimes.normalizeInput(type, inputData);
		const normalizedCreatedAt = createdAt ? await this.datetimes.normalizeValue(type, createdAt) : now;
		const normalizedPublishedAt = publishedAt ? await this.datetimes.normalizeValue(type, publishedAt) : null;
		if (!type) throw new EmDashValidationError("Content type is required");
		const tableName = getTableName(type);
		if (translationOf && getLocaleCandidates(locale ?? "en").length > 1) {
			if ((await sql`
				SELECT sibling.id FROM ${sql.ref(tableName)} AS sibling
				INNER JOIN ${sql.ref(tableName)} AS source
					ON coalesce(source.translation_group, source.id) = sibling.translation_group
				WHERE source.id = ${translationOf} AND source.deleted_at IS NULL
					AND sibling.deleted_at IS NULL AND ${localeMatches("sibling.locale", locale ?? "en")}
				LIMIT 1
			`.execute(this.db)).rows.length > 0) throw new ContentMutationConflictError(`Translation already exists in locale "${locale ?? "en"}" for this content item`);
		}
		await this.assertAliasAwareSlugAvailable(type, slug, locale);
		const columns = [
			"id",
			"slug",
			"status",
			"author_id",
			"primary_byline_id",
			"created_at",
			"updated_at",
			"published_at",
			"version",
			"locale",
			"translation_group"
		];
		const values = [
			id,
			slug || null,
			status,
			authorId || null,
			primaryBylineId ?? null,
			normalizedCreatedAt,
			now,
			normalizedPublishedAt,
			1,
			locale || "en",
			id
		];
		const inherited = new Set(inheritFields);
		for (const field of inherited) {
			validateIdentifier(field, "inherited content field name");
			if (!SYSTEM_COLUMNS.has(field) && !Object.hasOwn(data, field)) {
				columns.push(field);
				values.push(null);
			}
		}
		if (data && typeof data === "object") {
			for (const [key, value] of Object.entries(data)) if (!SYSTEM_COLUMNS.has(key)) {
				validateIdentifier(key, "content field name");
				columns.push(key);
				values.push(serializeValue(value));
			}
		}
		const columnRefs = columns.map((c) => sql.ref(c));
		const valuePlaceholders = values.map((value, index) => {
			const column = columns[index];
			if (translationOf && column === "translation_group") return sql`COALESCE(${sql.ref("translation_source.translation_group")}, ${sql.ref("translation_source.id")})`;
			if (translationOf && inherited.has(column)) return sql.ref(`translation_source.${column}`);
			return value === null ? sql`NULL` : sql`${value}`;
		});
		if (translationOf) await sql`
				INSERT INTO ${sql.ref(tableName)} (${sql.join(columnRefs, sql`, `)})
				SELECT ${sql.join(valuePlaceholders, sql`, `)}
				FROM ${sql.ref(tableName)} AS translation_source
				WHERE translation_source.id = ${translationOf}
					AND translation_source.deleted_at IS NULL
			`.execute(this.db);
		else await sql`
				INSERT INTO ${sql.ref(tableName)} (${sql.join(columnRefs, sql`, `)})
				VALUES (${sql.join(valuePlaceholders, sql`, `)})
			`.execute(this.db);
		invalidateCollectionCache(type);
		const item = await this.findById(type, id);
		if (!item) {
			if (translationOf) throw new EmDashValidationError("Translation source content not found");
			throw new Error("Failed to create content");
		}
		return item;
	}
	/**
	* Generate a unique slug for a content item within a collection.
	*
	* Checks the collection table for existing slugs that match `baseSlug`
	* (optionally scoped to a locale) and appends a numeric suffix (`-1`,
	* `-2`, etc.) on collision to guarantee uniqueness.
	*
	* Returns null when slug normalization cannot produce a value.
	*/
	async generateUniqueSlug(type, text, locale) {
		const baseSlug = slugify(text);
		if (!baseSlug) return null;
		const tableName = getTableName(type);
		if ((locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					AND ${localeMatches("locale", locale)}
					LIMIT 1
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					LIMIT 1
				`.execute(this.db)).rows.length === 0) return baseSlug;
		const pattern = `${baseSlug}-%`;
		const candidates = locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE (slug = ${baseSlug} OR slug LIKE ${pattern})
					AND ${localeMatches("locale", locale)}
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug} OR slug LIKE ${pattern}
				`.execute(this.db);
		let maxSuffix = 0;
		const suffixPattern = new RegExp(`^${escapeRegExp(baseSlug)}-(\\d+)$`);
		for (const row of candidates.rows) {
			const match = suffixPattern.exec(row.slug);
			if (match) {
				const n = parseInt(match[1], 10);
				if (n > maxSuffix) maxSuffix = n;
			}
		}
		return `${baseSlug}-${maxSuffix + 1}`;
	}
	/**
	* Duplicate a content item
	* Creates a new draft copy with "(Copy)" appended to the title.
	* A slug is auto-generated from the new title by the handler layer.
	*/
	async duplicate(type, id, authorId) {
		const original = await this.findById(type, id);
		if (!original) throw new EmDashValidationError("Content item not found");
		const newData = { ...original.data };
		if (typeof newData.title === "string") newData.title = `${newData.title} (Copy)`;
		else if (typeof newData.name === "string") newData.name = `${newData.name} (Copy)`;
		const slugSource = typeof newData.title === "string" ? newData.title : typeof newData.name === "string" ? newData.name : null;
		const slug = slugSource ? await this.generateUniqueSlug(type, slugSource, original.locale ?? void 0) : null;
		return this.create({
			type,
			slug,
			data: newData,
			status: "draft",
			authorId: authorId || original.authorId || void 0,
			locale: original.locale ?? void 0
		});
	}
	/**
	* Find content by ID
	*/
	async findById(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	async findManyByIds(type, ids, options = {}) {
		const items = /* @__PURE__ */ new Map();
		if (ids.length === 0) return items;
		const tableName = getTableName(type);
		const deletedFilter = options.includeTrashed ? sql`` : sql`AND deleted_at IS NULL`;
		for (const batch of chunks([...new Set(ids)], 50)) {
			const result = await sql`
				SELECT * FROM ${sql.ref(tableName)}
				WHERE id IN (${sql.join(batch)}) ${deletedFilter}
			`.execute(this.db);
			for (const row of result.rows) {
				const item = this.mapRow(type, row);
				items.set(item.id, item);
			}
		}
		return items;
	}
	async findManyBySlugsInLocale(type, slugs, locale, options = {}) {
		const items = /* @__PURE__ */ new Map();
		if (slugs.length === 0) return items;
		const tableName = getTableName(type);
		const deletedFilter = options.includeTrashed ? sql`` : sql`AND deleted_at IS NULL`;
		const statusFilter = options.publishedOnly ? sql`AND status = ${"published"}` : sql``;
		for (const batch of chunks([...new Set(slugs)], 50)) {
			const result = await sql`
				SELECT * FROM ${sql.ref(tableName)}
				WHERE slug IN (${sql.join(batch)}) AND ${localeMatches("locale", locale)} ${deletedFilter} ${statusFilter}
				ORDER BY ${localeOrder("locale", locale)}, id ASC
			`.execute(this.db);
			for (const row of result.rows) {
				const item = this.mapRow(type, row);
				if (item.slug !== null && !items.has(item.slug)) items.set(item.slug, item);
			}
		}
		return items;
	}
	/**
	* Find content by id, including trashed (soft-deleted) items.
	* Used by restore endpoint for ownership checks.
	*
	* `deletedAt` rides along because the row is already in hand: a caller that
	* has to know whether the row is trashed before touching anything else would
	* otherwise pay a second read for a column this row already carries.
	*/
	async findByIdIncludingTrashed(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return {
			...this.mapRow(type, row),
			deletedAt: typeof row.deleted_at === "string" ? row.deleted_at : null
		};
	}
	/**
	* Find content by ID or slug. Tries ID first if it looks like a ULID,
	* otherwise tries slug. Falls back to the other if the first lookup misses.
	*/
	async findByIdOrSlug(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, false, locale);
	}
	/**
	* Find content by ID or slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findByIdOrSlugIncludingTrashed(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, true, locale);
	}
	async isTrashed(type, id) {
		const tableName = getTableName(type);
		return await this.db.selectFrom(tableName).select("id").where("id", "=", id).where("deleted_at", "is not", null).executeTakeFirst() !== void 0;
	}
	async _findByIdOrSlug(type, identifier, includeTrashed, locale) {
		const looksLikeUlid = ULID_PATTERN.test(identifier);
		const findById = includeTrashed ? (t, id) => this.findByIdIncludingTrashed(t, id) : (t, id) => this.findById(t, id);
		const findBySlug = includeTrashed ? (t, s) => this.findBySlugIncludingTrashed(t, s, locale) : (t, s) => this.findBySlug(t, s, locale);
		try {
			if (looksLikeUlid) {
				const byId = await findById(type, identifier);
				if (byId) return byId;
				return await findBySlug(type, identifier);
			}
			const bySlug = await findBySlug(type, identifier);
			if (bySlug) return bySlug;
			return await findById(type, identifier);
		} catch (error) {
			if (isMissingTableError(error)) return null;
			throw error;
		}
	}
	/**
	* Find content by slug
	*/
	async findBySlug(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND ${localeMatches("locale", locale)}
					AND deleted_at IS NULL
					ORDER BY ${localeOrder("locale", locale)}, id ASC
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND deleted_at IS NULL
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find content by slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findBySlugIncludingTrashed(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND ${localeMatches("locale", locale)}
					ORDER BY ${localeOrder("locale", locale)}, id ASC
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find many content items with filtering and pagination
	*/
	async findMany(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		assertPageOffset(options.offset, options.cursor);
		const orderField = options.orderBy?.field || "createdAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const resolvedOrderField = await this.resolveOrderField(type, orderField, options.sortableExtras);
		const dbField = resolvedOrderField.column;
		const nullableOrder = resolvedOrderField.indexedCustomField || !NON_NULL_ORDER_COLUMNS.has(dbField);
		const resolvedFieldFilters = await this.resolveFieldFilters(type, options.where?.fieldFilters);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is", null);
		if (options.where?.status) query = query.where("status", "=", options.where.status);
		if (options.where?.authorId) query = query.where("author_id", "=", options.where.authorId);
		if (options.where?.locale) query = query.where(localeMatches("locale", options.where.locale));
		query = this.applySearchFilter(query, options.where, type);
		query = this.applyDateFilter(query, options.where);
		query = this.applyBylineFilter(query, options.where, type);
		query = this.applyFieldFilters(query, resolvedFieldFilters);
		if (options.cursor) if (resolvedOrderField.indexedCustomField) {
			const { value, id: cursorId } = decodeNullableOrderCursor(options.cursor, orderField);
			const isPresent = sql`${sql.ref(dbField)} IS NOT NULL`;
			const falseLiteral = sql`FALSE`;
			const trueLiteral = sql`TRUE`;
			if (safeOrderDirection === "ASC" && value === null) query = query.where(sql`(
						(${isPresent}) > ${falseLiteral}
						OR ((${isPresent}) = ${falseLiteral} AND ${sql.ref("id")} > ${cursorId})
					)`);
			else if (safeOrderDirection === "DESC" && value === null) query = query.where(sql`
						(${isPresent}) = ${falseLiteral} AND ${sql.ref("id")} < ${cursorId}
					`);
			else if (safeOrderDirection === "ASC") query = query.where(sql`
						(${isPresent}, ${sql.ref(dbField)}, ${sql.ref("id")})
							> (${trueLiteral}, ${value}, ${cursorId})
					`);
			else query = query.where(sql`
						(${isPresent}, ${sql.ref(dbField)}, ${sql.ref("id")})
							< (${trueLiteral}, ${value}, ${cursorId})
					`);
		} else if (nullableOrder) {
			const { value, id: cursorId } = decodeNullableOrderCursor(options.cursor, orderField, { acceptPlain: true });
			query = query.where(nullableOrderCondition(this.db, dbField, safeOrderDirection, value, cursorId));
		} else {
			const { orderValue, id: cursorId } = decodeCursor(options.cursor);
			if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
			else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
		}
		const indexedOrderFilter = resolvedOrderField.indexedCustomField ? resolvedFieldFilters.find((filter) => filter.column === dbField) : void 0;
		if (resolvedOrderField.indexedCustomField && !indexedOrderFilter) query = query.orderBy(sql`${sql.ref(dbField)} IS NOT NULL`, safeOrderDirection === "ASC" ? "asc" : "desc");
		if (indexedOrderFilter?.kind !== "null") query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc");
		query = query.orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc");
		query = options.offset === void 0 ? query.limit(limit + 1) : query.limit(limit).offset(options.offset);
		const [rowsResult, countResult] = await Promise.allSettled([query.execute(), this.countWithResolvedFilters(type, options.where, resolvedFieldFilters)]);
		if (rowsResult.status === "rejected") throw rowsResult.reason;
		if (countResult.status === "rejected") throw countResult.reason;
		const rows = rowsResult.value;
		const total = countResult.value;
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = {
			items: items.map((row) => this.mapRow(type, row)),
			total
		};
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			if (nullableOrder) {
				if (lastOrderValue !== null && typeof lastOrderValue !== "string" && typeof lastOrderValue !== "number") throw new EmDashValidationError(`Invalid value for order field: ${orderField}`);
				mappedResult.nextCursor = encodeNullableOrderCursor(orderField, lastOrderValue, String(lastRow.id));
			} else mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Update content
	*/
	async update(type, id, input, expectedRevision) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.assertAliasAwareSlugAvailable(type, input.slug, input.locale, id);
		const updates = {};
		if (input.status !== void 0) updates.status = input.status;
		if (input.slug !== void 0) updates.slug = input.slug;
		if (input.publishedAt !== void 0) updates.published_at = input.publishedAt === null ? null : await this.datetimes.normalizeValue(type, input.publishedAt);
		if (input.scheduledAt !== void 0) updates.scheduled_at = input.scheduledAt === null ? null : await this.datetimes.normalizeValue(type, input.scheduledAt);
		if (input.authorId !== void 0) updates.author_id = input.authorId;
		if (input.primaryBylineId !== void 0) updates.primary_byline_id = input.primaryBylineId;
		if (input.data !== void 0 && typeof input.data === "object") {
			const data = await this.datetimes.normalizeInput(type, writableContentData(input.data));
			for (const [key, value] of Object.entries(data)) updates[key] = serializeValue(value);
		}
		const hasColumnWrites = Object.keys(updates).length > 0;
		if (hasColumnWrites) updates.updated_at = now;
		if (input.draftRevisionId === null) updates.draft_revision_id = null;
		updates.version = sql`version + 1`;
		let query = this.db.updateTable(tableName).set(updates).where("id", "=", id).where("deleted_at", "is", null);
		if (expectedRevision) query = query.where(sql`version = ${expectedRevision.version}`).where(sql`updated_at = ${expectedRevision.updatedAt}`);
		const result = await query.executeTakeFirst();
		if (expectedRevision && result.numUpdatedRows === 0n) throw new ContentMutationConflictError();
		if (hasColumnWrites) invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	async restoreRevision(type, id, revisionData, authorId) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const normalizedSnapshot = await this.datetimes.normalizeData(type, revisionData);
		const { _slug } = normalizedSnapshot;
		const snapshotFields = {};
		for (const [key, value] of Object.entries(normalizedSnapshot)) if (!key.startsWith("_")) snapshotFields[key] = value;
		const fieldData = writableContentData(snapshotFields);
		const revisionId = createRevisionId();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const assignments = [];
		if (typeof _slug === "string") assignments.push(sql`slug = ${_slug}`);
		for (const [field, value] of Object.entries(fieldData)) {
			validateIdentifier(field, "content field name");
			assignments.push(sql`${sql.ref(field)} = ${serializeValue(value)}`);
		}
		assignments.push(sql`draft_revision_id = ${revisionId}`, sql`updated_at = ${now}`, sql`version = version + 1`);
		const buildQueries = () => {
			return [
				sql`
				INSERT INTO revisions (id, collection, entry_id, data, author_id)
				VALUES (${revisionId}, ${type}, ${id}, ${JSON.stringify(normalizedSnapshot)}, ${authorId})
				RETURNING id
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET ${sql.join(assignments, sql`, `)}
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
				RETURNING id
			`,
				sql`
				DELETE FROM revisions
				WHERE id = ${revisionId}
				AND NOT EXISTS (
					SELECT 1 FROM ${sql.ref(tableName)}
					WHERE id = ${id}
					AND draft_revision_id = ${revisionId}
					AND version = ${existing.version + 1}
				)
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET draft_revision_id = ${existing.draftRevisionId}
				WHERE id = ${id}
				AND draft_revision_id = ${revisionId}
				AND version = ${existing.version + 1}
				RETURNING id
			`
			];
		};
		const batched = await executeAtomicBatchIfSupported(this.db, buildQueries());
		if (batched) {
			if (batched[0]?.rows.length !== 1 || batched[1]?.rows.length !== 1 || batched[3]?.rows.length !== 1) throw new ContentMutationConflictError();
		} else await withTransaction(this.db, async (trx) => {
			const [audit, update, removeUnappliedAudit, releaseMarker] = buildQueries();
			if ((await audit.execute(trx)).rows.length !== 1) throw new ContentMutationConflictError();
			const updateResult = await update.execute(trx);
			await removeUnappliedAudit.execute(trx);
			const releaseResult = await releaseMarker.execute(trx);
			if (updateResult.rows.length !== 1 || releaseResult.rows.length !== 1) throw new ContentMutationConflictError();
		});
		invalidateCollectionCache(type);
		const item = await this.findById(type, id);
		if (!item) throw new Error("Content not found");
		await new RevisionRepository(this.db, this.datetimeContexts).queuePruning(type, id, revisionId);
		return {
			item,
			revisionId
		};
	}
	async restoreDraftRevision(type, id, revisionData, authorId) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) return null;
		const normalizedSnapshot = await this.datetimes.normalizeData(type, revisionData);
		const revisionId = createRevisionId();
		const buildQueries = () => {
			return [
				sql`
				INSERT INTO revisions (id, collection, entry_id, data, author_id)
				VALUES (${revisionId}, ${type}, ${id}, ${JSON.stringify(normalizedSnapshot)}, ${authorId})
				RETURNING id
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET draft_revision_id = ${revisionId},
					version = version + 1
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
				RETURNING id
			`,
				sql`
				DELETE FROM revisions
				WHERE id = ${revisionId}
				AND NOT EXISTS (
					SELECT 1 FROM ${sql.ref(tableName)}
					WHERE id = ${id}
					AND draft_revision_id = ${revisionId}
					AND version = ${existing.version + 1}
				)
			`
			];
		};
		const batched = await executeAtomicBatchIfSupported(this.db, buildQueries());
		if (batched) {
			if (batched[0]?.rows.length !== 1 || batched[1]?.rows.length !== 1) throw new ContentMutationConflictError();
		} else await withTransaction(this.db, async (trx) => {
			const [audit, stage, removeUnstagedAudit] = buildQueries();
			if ((await audit.execute(trx)).rows.length !== 1) throw new ContentMutationConflictError();
			const stageResult = await stage.execute(trx);
			await removeUnstagedAudit.execute(trx);
			if (stageResult.rows.length !== 1) throw new ContentMutationConflictError();
		});
		invalidateCollectionCache(type);
		await new RevisionRepository(this.db, this.datetimeContexts).queuePruning(type, id, revisionId);
		return revisionId;
	}
	/**
	* Update plugin-authored fields without letting content columns diverge
	* from the revision pointers that publication promotes.
	*/
	async updateDraftAware(type, id, input) {
		const data = input.data ? await this.datetimes.normalizeInput(type, writableContentData(input.data)) : {};
		const stagedSlug = typeof input.slug === "string" ? input.slug : void 0;
		if (!(Object.keys(data).length > 0 || stagedSlug !== void 0)) return this.update(type, id, {
			...input,
			data
		});
		const collectionRows = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", "field.collection_id", "collection.id").select(["collection.supports", "field.slug as fieldSlug"]).where("collection.slug", "=", type).execute();
		const supportsRaw = collectionRows[0]?.supports;
		const supports = supportsRaw ? JSON.parse(supportsRaw) : [];
		if (!Array.isArray(supports) || !supports.includes("revisions")) return this.update(type, id, {
			...input,
			data,
			draftRevisionId: null
		});
		const fieldSlugs = new Set(collectionRows.map((row) => row.fieldSlug).filter((slug) => Boolean(slug)));
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let existing = await this.findById(type, id);
		let incoming = data;
		if (existing) {
			let stored = existing.data ?? {};
			if (existing.draftRevisionId) {
				const draft = await revisionRepo.findById(existing.draftRevisionId);
				if (draft?.data) stored = {
					...stored,
					...draft.data
				};
			}
			const stale = staleStoredKeys(data, stored, fieldSlugs);
			if (stale.length > 0) {
				incoming = { ...data };
				for (const key of stale) delete incoming[key];
			}
		}
		for (const field of Object.keys(incoming)) if (!fieldSlugs.has(field)) throw new EmDashValidationError(`Unknown field '${field}' in collection '${type}'`);
		for (let attempt = 0; existing && attempt < MAX_DRAFT_STAGE_ATTEMPTS; attempt++) {
			let baseData = existing.data;
			if (existing.draftRevisionId) {
				const draft = await revisionRepo.findById(existing.draftRevisionId);
				if (draft) baseData = draft.data;
			}
			const mergedData = keepKnownFields({
				...baseData,
				...incoming
			}, fieldSlugs);
			if (stagedSlug !== void 0) mergedData._slug = stagedSlug;
			const revision = await revisionRepo.create({
				collection: type,
				entryId: id,
				data: mergedData,
				...input.revisionAuthorId ? { authorId: input.revisionAuthorId } : {}
			});
			let staged;
			try {
				staged = await this.replaceDraftRevisionForUpdate(type, id, revision.id, existing, input);
			} catch (error) {
				await this.deleteUnstagedRevision(revisionRepo, type, id, revision.id);
				throw error;
			}
			if (staged) {
				const updated = await this.findById(type, id);
				if (!updated) throw new Error("Content not found");
				const draftData = {};
				for (const [key, value] of Object.entries(mergedData)) if (!key.startsWith("_")) draftData[key] = value;
				return {
					...updated,
					data: {
						...updated.data,
						...draftData
					}
				};
			}
			await this.deleteUnstagedRevision(revisionRepo, type, id, revision.id);
			existing = await this.findById(type, id);
		}
		if (!existing) throw new Error("Content not found");
		throw new ContentMutationConflictError();
	}
	async deleteUnstagedRevision(revisionRepo, type, id, revisionId) {
		try {
			await revisionRepo.deleteIfUnreferenced(type, id, revisionId);
		} catch (error) {
			console.error(`[content] Failed to clean up unstaged revision ${revisionId}:`, error);
		}
	}
	async replaceDraftRevisionForUpdate(type, id, revisionId, expected, input) {
		const tableName = getTableName(type);
		const assignments = [sql`draft_revision_id = ${revisionId}`];
		let liveMetadataChanged = false;
		if (input.status !== void 0) {
			assignments.push(sql`status = ${input.status}`);
			liveMetadataChanged = true;
		}
		if (input.slug === null) {
			assignments.push(sql`slug = NULL`);
			liveMetadataChanged = true;
		}
		if (input.publishedAt !== void 0) {
			const publishedAt = input.publishedAt === null ? null : await this.datetimes.normalizeValue(type, input.publishedAt);
			assignments.push(sql`published_at = ${publishedAt}`);
			liveMetadataChanged = true;
		}
		if (input.scheduledAt !== void 0) {
			const scheduledAt = input.scheduledAt === null ? null : await this.datetimes.normalizeValue(type, input.scheduledAt);
			assignments.push(sql`scheduled_at = ${scheduledAt}`);
			liveMetadataChanged = true;
		}
		if (input.authorId !== void 0) {
			assignments.push(sql`author_id = ${input.authorId}`);
			liveMetadataChanged = true;
		}
		if (input.primaryBylineId !== void 0) {
			assignments.push(sql`primary_byline_id = ${input.primaryBylineId}`);
			liveMetadataChanged = true;
		}
		if (liveMetadataChanged) assignments.push(sql`updated_at = ${(/* @__PURE__ */ new Date()).toISOString()}`);
		assignments.push(sql`version = version + 1`);
		const changed = ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET ${sql.join(assignments, sql`, `)}
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${expected.version}
			AND ${nullableColumnMatch("live_revision_id", expected.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", expected.draftRevisionId)}
			AND EXISTS (
				SELECT 1 FROM revisions
				WHERE revisions.id = ${revisionId}
				AND revisions.collection = ${type}
				AND revisions.entry_id = ${id}
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed && liveMetadataChanged) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Copy non-translatable field values to every other entry in the
	* translation group, trashed entries included.
	*
	* Only the fields present in `data` are copied. With `previous`, `data` is
	* the entry's complete new state and only the fields whose value differs
	* from `previous` are copied, an absent field as null. An entry that already
	* holds every copied value is left untouched, so its `updated_at` does not
	* move.
	*
	* On collections with revisions a changed entry also gets a new live
	* revision, because republishing and unpublishing read that revision rather
	* than the columns. A pending draft takes a value only where it still holds
	* the entry's previous value, so an unpublished edit to the field survives.
	*/
	async syncNonTranslatableFields(type, sourceId, translationGroup, data, options = {}) {
		const tableName = getTableName(type);
		const collectionRows = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", (join) => join.onRef("field.collection_id", "=", "collection.id").on("field.translatable", "=", 0)).select(["collection.supports", "field.slug as fieldSlug"]).where("collection.slug", "=", type).execute();
		const { previous } = options;
		const values = {};
		for (const { fieldSlug } of collectionRows) {
			if (!fieldSlug) continue;
			if (previous) {
				if (!sameStoredValue(previous[fieldSlug], data[fieldSlug])) values[fieldSlug] = data[fieldSlug] ?? null;
			} else if (fieldSlug in data) values[fieldSlug] = data[fieldSlug];
		}
		if (Object.keys(values).length === 0) return;
		const normalizedValues = await this.datetimes.normalizeData(type, values);
		const supportsRaw = collectionRows[0]?.supports;
		const supports = supportsRaw ? JSON.parse(supportsRaw) : [];
		const usesRevisions = Array.isArray(supports) && supports.includes("revisions");
		const siblings = await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND id != ${sourceId}
		`.execute(this.db);
		let changed = false;
		for (const row of siblings.rows) if (await this.syncSiblingValues(type, this.mapRow(type, row), normalizedValues, usesRevisions)) changed = true;
		if (changed) invalidateCollectionCache(type);
	}
	async syncSiblingValues(type, initial, values, usesRevisions) {
		const tableName = getTableName(type);
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let sibling = initial;
		for (let attempt = 0; sibling && attempt < MAX_DRAFT_STAGE_ATTEMPTS; attempt++) {
			const current = sibling;
			const changed = {};
			for (const [field, value] of Object.entries(values)) if (!sameStoredValue(current.data[field], value)) changed[field] = value;
			if (Object.keys(changed).length === 0) return false;
			const assignments = [];
			for (const [field, value] of Object.entries(changed)) {
				validateIdentifier(field, "content field name");
				assignments.push(sql`${sql.ref(field)} = ${serializeValue(value)}`);
			}
			const createdRevisionIds = [];
			const cleanUp = async () => {
				for (const revisionId of createdRevisionIds) await this.deleteUnstagedRevision(revisionRepo, type, current.id, revisionId);
			};
			let synced;
			try {
				const live = usesRevisions && current.liveRevisionId ? await revisionRepo.findById(current.liveRevisionId) : null;
				if (live) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: current.id,
						data: {
							...live.data,
							...changed
						}
					});
					createdRevisionIds.push(revision.id);
					assignments.push(sql`live_revision_id = ${revision.id}`);
				}
				const draft = usesRevisions && current.draftRevisionId ? await revisionRepo.findById(current.draftRevisionId) : null;
				const carried = {};
				for (const [field, value] of Object.entries(changed)) if (draft && sameStoredValue(draft.data[field], current.data[field])) carried[field] = value;
				if (draft && Object.keys(carried).length > 0) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: current.id,
						data: {
							...draft.data,
							...carried
						}
					});
					createdRevisionIds.push(revision.id);
					assignments.push(sql`draft_revision_id = ${revision.id}`);
				}
				assignments.push(sql`updated_at = ${(/* @__PURE__ */ new Date()).toISOString()}`, sql`version = version + 1`);
				synced = ((await sql`
					UPDATE ${sql.ref(tableName)}
					SET ${sql.join(assignments, sql`, `)}
					WHERE id = ${current.id}
					AND version = ${current.version}
					AND ${nullableColumnMatch("live_revision_id", current.liveRevisionId)}
					AND ${nullableColumnMatch("draft_revision_id", current.draftRevisionId)}
				`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
			} catch (error) {
				await cleanUp();
				throw error;
			}
			if (synced) return true;
			await cleanUp();
			sibling = await this.findByIdIncludingTrashed(type, current.id);
		}
		if (!sibling) return false;
		throw new ContentMutationConflictError();
	}
	/**
	* Delete content (soft delete - moves to trash)
	*/
	async delete(type, id) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const changed = ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Restore content from trash
	*
	* The entry comes back as a draft with no schedule. The live version is not
	* copied into a draft revision: collections without revisions save to the
	* columns, and a draft revision would hide those saves.
	*/
	async restore(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const existing = await this.findByIdOrSlugIncludingTrashed(type, id);
		if (!existing) return null;
		assertRevisionPrecondition(existing, expectedRevision);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const restored = (await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = NULL,
				live_revision_id = NULL,
				status = 'draft',
				scheduled_at = NULL,
				updated_at = ${now},
				version = ${existing.version + 1}
			WHERE id = ${existing.id}
			AND deleted_at IS NOT NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			RETURNING *
		`.execute(this.db)).rows[0];
		if (!restored) throw new ContentMutationConflictError("Content changed while restoring");
		invalidateCollectionCache(type);
		return this.mapRow(type, restored);
	}
	/**
	* Permanently delete content (cannot be undone)
	*/
	/**
	* Permanently delete a soft-deleted content row.
	*
	* Returns `true` only when a soft-deleted (trashed) row was removed.
	* Returns `false` when no row exists OR when the row exists but is live —
	* the caller is responsible for distinguishing these cases (typically via
	* a follow-up `findByIdOrSlugIncludingTrashed` to surface NOT_FOUND vs
	* NOT_TRASHED). The `AND deleted_at IS NOT NULL` clause is the safety net
	* that prevents permanent delete from bypassing the trash workflow.
	*/
	async permanentDelete(type, id) {
		const tableName = getTableName(type);
		const changed = ((await sql`
			DELETE FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NOT NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Find trashed content items
	*/
	async findTrashed(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		assertPageOffset(options.offset, options.cursor);
		const orderField = options.orderBy?.field || "deletedAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const dbField = this.mapOrderField(orderField);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is not", null);
		if (options.where?.locale) query = query.where(localeMatches("locale", options.where.locale));
		if (options.cursor) {
			const { orderValue, id: cursorId } = decodeCursor(options.cursor);
			if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
			else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
		}
		query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc").orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc");
		query = options.offset === void 0 ? query.limit(limit + 1) : query.limit(limit).offset(options.offset);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = { items: items.map((row) => {
			const record = row;
			return {
				...this.mapRow(type, record),
				deletedAt: typeof record.deleted_at === "string" ? record.deleted_at : ""
			};
		}) };
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Count trashed content items
	*/
	async countTrashed(type, options = {}) {
		const tableName = getTableName(type);
		let query = this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is not", null);
		if (options.locale) query = query.where(localeMatches("locale", options.locale));
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Apply the optional `q` filter.
	*
	* When the handler sets `useFts` (collection has a healthy FTS5 index
	* covering the display columns; SQLite only), the filter is served from
	* the index: a token-prefix MATCH against `_emdash_fts_<slug>` OR'd with
	* an index-served `slug GLOB 'term*'` prefix (the slug is not in the FTS
	* index). Both sides are index-backed, so SQLite's OR optimization avoids
	* the full-table scan the LIKE fallback needs (#1517). The trade-off is
	* search semantics: token-prefix matching instead of arbitrary substring.
	*
	* Fallback (Postgres, search disabled, or no usable terms): case-
	* insensitive substring LIKE across the handler-resolved `searchColumns`
	* (OR'd). User input is treated literally (LIKE wildcards escaped) and
	* `lower()` is applied on both sides for SQLite/Postgres parity.
	*/
	applySearchFilter(query, where, type) {
		const term = where?.q?.trim();
		const columns = where?.searchColumns;
		if (!term || !columns || columns.length === 0) return query;
		if (where.useFts) {
			const match = buildFtsPrefixMatch(term);
			if (match) {
				validateIdentifier(type, "collection slug");
				const ftsTable = `_emdash_fts_${type}`;
				const slugPrefix = buildSlugGlobPrefix(term);
				return query.where((eb) => eb.or([sql`id IN (SELECT id FROM ${sql.ref(ftsTable)} WHERE ${sql.ref(ftsTable)} MATCH ${match})`, sql`slug GLOB ${slugPrefix}`]));
			}
		}
		const pattern = `%${term.replace(LIKE_WILDCARD_RE, (c) => `\\${c}`)}%`;
		return query.where((eb) => eb.or(columns.map((col) => {
			validateIdentifier(col, "search column");
			return sql`lower(CAST(${sql.ref(col)} AS TEXT)) LIKE lower(${pattern}) ESCAPE '\\'`;
		})));
	}
	/**
	* Apply the optional inclusive date-range filter. The field is mapped
	* through `DATE_FILTER_COLUMNS` (a closed whitelist), and bounds compare
	* lexicographically against the stored ISO 8601 timestamps. A `publishedAt`
	* range naturally excludes never-published rows (their column is NULL).
	*/
	applyDateFilter(query, where) {
		const filter = where?.dateFilter;
		if (!filter) return query;
		const column = DATE_FILTER_COLUMNS[filter.field];
		if (!column) throw new EmDashValidationError(`Invalid date filter field: ${filter.field}`);
		const { from, to } = filter;
		if (!from && !to) return query;
		let next = query;
		if (from) next = next.where((eb) => eb(column, ">=", from));
		if (to) next = next.where((eb) => eb(column, "<=", to));
		return next;
	}
	/**
	* Apply the optional byline filter as a correlated (NOT) EXISTS against
	* `_emdash_content_bylines`.
	*
	* Correlating from the content table preserves the outer sort index so
	* `LIMIT` can short-circuit. `mode: "none"` tests the junction rather than
	* `primary_byline_id` because the two are written in the same call but
	* are not atomically consistent, so the junction is authoritative.
	*
	* Whether a credit *renders* is locale-scoped; whether one *exists* is
	* not. Both are needed: the first decides what the filter matches, the
	* second decides whether the author fallback applies at all.
	*/
	applyBylineFilter(query, where, type) {
		const filter = where?.bylineFilter;
		if (!filter) return query;
		const tableName = getTableName(type);
		const idColumn = `${tableName}.id`;
		const authorColumn = `${tableName}.author_id`;
		const localeColumn = `${tableName}.locale`;
		const creditRenders = (eb, bylineIds) => {
			let sub = eb.selectFrom("_emdash_content_bylines as cb").innerJoin("_emdash_bylines as b", "b.translation_group", "cb.byline_id").select("cb.id").where("cb.collection_slug", "=", type).whereRef("cb.content_id", "=", idColumn);
			sub = filter.locale ? sub.where(localeMatches("b.locale", filter.locale)) : sub.where(sql`${canonicalLocaleColumn("b.locale")} = ${canonicalLocaleColumn(localeColumn)}`);
			if (bylineIds) sub = sub.where("cb.byline_id", "in", bylineIds);
			return eb.exists(sub);
		};
		const hasExplicitCredit = (eb) => eb.exists(eb.selectFrom("_emdash_content_bylines as cb").select("cb.id").where("cb.collection_slug", "=", type).whereRef("cb.content_id", "=", idColumn));
		const authorHasByline = (eb, bylineIds) => {
			let sub = eb.selectFrom("_emdash_bylines as b").select("b.id").whereRef("b.user_id", "=", authorColumn);
			sub = filter.locale ? sub.where(localeMatches("b.locale", filter.locale)) : sub.where(sql`${canonicalLocaleColumn("b.locale")} = ${canonicalLocaleColumn(localeColumn)}`);
			if (bylineIds) sub = sub.where("b.translation_group", "in", bylineIds);
			return eb.exists(sub);
		};
		if (filter.mode === "none") return query.where((eb) => {
			const uncredited = eb.not(creditRenders(eb));
			return filter.includeInferred ? eb.and([uncredited, eb.or([hasExplicitCredit(eb), eb.not(authorHasByline(eb))])]) : uncredited;
		});
		const bylineIds = filter.bylineIds ?? [];
		if (bylineIds.length === 0) return query.where(() => sql`1 = 0`);
		return query.where((eb) => {
			if (!filter.includeInferred) return creditRenders(eb, bylineIds);
			return eb.or([creditRenders(eb, bylineIds), eb.and([eb.not(hasExplicitCredit(eb)), authorHasByline(eb, bylineIds)])]);
		});
	}
	/**
	* Count content items
	*/
	async count(type, where) {
		const resolvedFieldFilters = await this.resolveFieldFilters(type, where?.fieldFilters);
		return this.countWithResolvedFilters(type, where, resolvedFieldFilters);
	}
	async countWithResolvedFilters(type, where, resolvedFieldFilters) {
		const tableName = getTableName(type);
		let query = this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is", null);
		if (where?.status) query = query.where("status", "=", where.status);
		if (where?.authorId) query = query.where("author_id", "=", where.authorId);
		if (where?.locale) query = query.where(localeMatches("locale", where.locale));
		query = this.applySearchFilter(query, where, type);
		query = this.applyDateFilter(query, where);
		query = this.applyBylineFilter(query, where, type);
		query = this.applyFieldFilters(query, resolvedFieldFilters);
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Distinct, non-null `author_id` values across the collection's live
	* (non-trashed) content. Used to populate the admin author filter with
	* only the users who have actually authored entries, rather than the
	* full user directory (which requires admin privileges to read).
	*/
	async findDistinctAuthorIds(type) {
		const tableName = getTableName(type);
		return (await this.db.selectFrom(tableName).select("author_id").distinct().where("deleted_at", "is", null).where("author_id", "is not", null).execute()).map((row) => row.author_id).filter((id) => id !== null);
	}
	async getStats(type, now = /* @__PURE__ */ new Date()) {
		const tableName = getTableName(type);
		const nowIso = now.toISOString();
		const result = await this.db.selectFrom(tableName).select((eb) => [
			eb.fn.count("id").as("total"),
			eb.fn.sum(eb.case().when("status", "=", "published").then(1).else(0).end()).as("published"),
			eb.fn.sum(eb.case().when("status", "=", "draft").then(1).else(0).end()).as("draft"),
			sql`SUM(CASE WHEN scheduled_at IS NOT NULL THEN 1 ELSE 0 END)`.as("scheduled"),
			sql`SUM(CASE WHEN scheduled_at IS NOT NULL AND scheduled_at <= ${nowIso} THEN 1 ELSE 0 END)`.as("overdue_scheduled")
		]).where("deleted_at", "is", null).executeTakeFirst();
		return {
			total: Number(result?.total || 0),
			published: Number(result?.published || 0),
			draft: Number(result?.draft || 0),
			scheduled: Number(result?.scheduled || 0),
			overdueScheduled: Number(result?.overdue_scheduled || 0)
		};
	}
	/**
	* Schedule content for future publishing
	*
	* Sets status to 'scheduled' and stores the scheduled publish time.
	* The content will be auto-published when the scheduled time is reached.
	*/
	async schedule(type, id, scheduledAt, currentTime = /* @__PURE__ */ new Date(), expectedRevision) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const normalizedScheduledAt = await this.datetimes.normalizeValue(type, scheduledAt);
		if (new Date(normalizedScheduledAt) <= currentTime) throw new EmDashValidationError("Scheduled date must be in the future");
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const newStatus = existing.status === "published" ? "published" : "scheduled";
		if (((await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = ${normalizedScheduledAt},
				updated_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError("Content changed while scheduling");
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Unschedule content
	*
	* Clears the scheduled time. Published posts stay published;
	* draft/scheduled posts revert to 'draft'.
	*/
	async unschedule(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const newStatus = existing.status === "published" ? "published" : "draft";
		const result = await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = NULL,
				updated_at = ${now}
			WHERE id = ${id}
			AND scheduled_at IS NOT NULL
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db);
		if (existing.scheduledAt !== null && (result.numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError("Content changed while unscheduling");
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Find content that is ready to be published
	*
	* Returns all content where scheduled_at <= now, regardless of status.
	* This covers both draft-scheduled posts (status='scheduled') and
	* published posts with scheduled draft changes (status='published').
	*
	* `limit` (optional) caps how many due rows are returned, oldest-due first.
	* The scheduled-publishing sweep passes a limit so a large backlog can't
	* fan out unbounded publish/webhook work in a single tick (and blow a Worker
	* invocation's CPU/subrequest budget); the remainder drains on later ticks.
	*/
	async findReadyToPublish(type, limit, currentTime = /* @__PURE__ */ new Date(), after) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const limitClause = typeof limit === "number" && Number.isInteger(limit) && limit > 0 ? sql`LIMIT ${limit}` : sql``;
		const afterClause = after ? sql`AND (scheduled_at > ${after.scheduledAt} OR (scheduled_at = ${after.scheduledAt} AND id > ${after.id}))` : sql``;
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND scheduled_at <= ${now}
			AND deleted_at IS NULL
			${afterClause}
			ORDER BY scheduled_at ASC, id ASC
			${limitClause}
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	async findTranslationIds(type, translationGroup) {
		const tableName = getTableName(type);
		return (await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND deleted_at IS NULL
		`.execute(this.db)).rows.map((row) => row.id);
	}
	async findTranslationIdsForGroups(type, translationGroups) {
		const ids = /* @__PURE__ */ new Map();
		if (translationGroups.length === 0) return ids;
		const tableName = getTableName(type);
		for (const batch of chunks([...new Set(translationGroups)], 50)) {
			const result = await sql`
				SELECT id, translation_group FROM ${sql.ref(tableName)}
				WHERE translation_group IN (${sql.join(batch)}) AND deleted_at IS NULL
			`.execute(this.db);
			for (const row of result.rows) {
				const group = ids.get(row.translation_group) ?? [];
				group.push(row.id);
				ids.set(row.translation_group, group);
			}
		}
		return ids;
	}
	/**
	* Find all translations in a translation group
	*/
	async findTranslations(type, translationGroup) {
		const tableName = getTableName(type);
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND deleted_at IS NULL
			ORDER BY locale ASC
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	/**
	* Whether any row still shares `translationGroup`, trashed rows included.
	* Group-keyed satellite data (term assignments, reference edges) is owned by
	* the group, not by a single locale row, so a purge may only cascade to it
	* once nothing is left to own it — and a trashed sibling is still restorable.
	*/
	async hasTranslationsIncludingTrashed(type, translationGroup, options = {}) {
		const tableName = getTableName(type);
		const exclusion = options.excludeId ? sql`AND id != ${options.excludeId}` : sql``;
		return (await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			${exclusion}
			LIMIT 1
		`.execute(this.db)).rows.length > 0;
	}
	/**
	* Batch variant of {@link findTranslations}: every (non-deleted) locale
	* variant for any of `translationGroups`, in one `WHERE translation_group IN
	* (...)` query chunked at `SQL_BATCH_SIZE` for D1's bind-parameter limit.
	* Lets callers resolve many edge groups without an N+1 per group. The caller
	* groups the flat result by `translationGroup` itself.
	*
	* `translation_group` leads the sort so the ordering follows
	* `idx_{table}_del_tg_locale` past its `deleted_at` equality; callers group by
	* `translationGroup`, so the per-group locale order they rely on is preserved.
	*
	* `publishedOnly` restricts the result to `status = 'published'` — reference
	* reads pass this for callers without `content:read_drafts` so draft/scheduled
	* entries never leak through an edge traversal.
	*
	* A reference edge stores only a collection slug (no SQL FK), so the table may
	* have been dropped since the edge was written. That is a tolerated dangling
	* state, not an error: a missing table resolves to no rows, mirroring how the
	* content read handlers treat `isMissingTableError`.
	*/
	async findTranslationsForGroups(type, translationGroups, options = {}) {
		if (translationGroups.length === 0) return [];
		const tableName = getTableName(type);
		const publishedFilter = options.publishedOnly ? sql`AND status = 'published'` : sql``;
		const items = [];
		try {
			for (const chunk of chunks(translationGroups, 50)) {
				const result = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE translation_group IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					${publishedFilter}
					ORDER BY translation_group ASC, locale ASC
				`.execute(this.db);
				for (const row of result.rows) items.push(this.mapRow(type, row));
			}
		} catch (error) {
			if (isMissingTableError(error)) return [];
			throw error;
		}
		return items;
	}
	/**
	* Batch variant of {@link findByIdOrSlug}: resolve many identifiers (each an
	* id OR a slug) within `type` in a constant number of queries — one `WHERE id
	* IN (...)` and one `WHERE slug IN (...)`, each chunked at `SQL_BATCH_SIZE`.
	* Returns a map from the input identifier to its resolved item; identifiers
	* that match nothing are absent. Used on write paths that accept a list of
	* references, so a single request doesn't fan out to an N+1 of point lookups.
	*
	* Resolution mirrors {@link findByIdOrSlug}: a ULID-shaped identifier prefers
	* the id match and falls back to slug; anything else prefers the slug match
	* and falls back to id. Slug matches collapse to the lowest-locale variant
	* (`ORDER BY locale ASC`), matching the slug-without-locale lookup.
	*/
	async findManyByIdOrSlug(type, identifiers) {
		const resolved = /* @__PURE__ */ new Map();
		const unique = [...new Set(identifiers)];
		if (unique.length === 0) return resolved;
		const tableName = getTableName(type);
		const byId = /* @__PURE__ */ new Map();
		const bySlug = /* @__PURE__ */ new Map();
		try {
			for (const chunk of chunks(unique, 50)) {
				const idRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE id IN (${sql.join(chunk)})
					AND deleted_at IS NULL
				`.execute(this.db);
				for (const row of idRows.rows) {
					const item = this.mapRow(type, row);
					byId.set(item.id, item);
				}
				const slugRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					ORDER BY locale ASC
				`.execute(this.db);
				for (const row of slugRows.rows) {
					const item = this.mapRow(type, row);
					if (item.slug != null && !bySlug.has(item.slug)) bySlug.set(item.slug, item);
				}
			}
		} catch (error) {
			if (isMissingTableError(error)) return resolved;
			throw error;
		}
		for (const identifier of unique) {
			const item = ULID_PATTERN.test(identifier) ? byId.get(identifier) ?? bySlug.get(identifier) : bySlug.get(identifier) ?? byId.get(identifier);
			if (item) resolved.set(identifier, item);
		}
		return resolved;
	}
	/**
	* Publish the current draft
	*
	* Promotes draft_revision_id to live_revision_id and clears draft pointer.
	* Syncs the draft revision's data into the content table columns so the
	* content table always reflects the published version.
	* If no draft revision exists, creates one from current data and publishes it.
	* When `promoteRevision` is false, publishes the current content-table data
	* by changing lifecycle metadata only.
	*
	* `publishedAt` (optional) overrides the publication timestamp. If omitted,
	* the existing `published_at` is preserved (idempotent re-publish keeps the
	* original date) and falls back to the current time on first publish. Pass
	* an explicit value to backdate a publish (e.g. when migrating content from
	* another CMS).
	*
	* `requireDue` gates the final update on the row still being due.
	* `expectedScheduledAt` additionally fences changes made after a sweep
	* selected the row but before publication preparation began.
	*/
	async publish(type, id, publishedAt, requireDue = false, expectedScheduledAt, promoteRevision = true, requireSlug = true, expectedRevision, currentTime = /* @__PURE__ */ new Date()) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const requestedPublishedAt = publishedAt ? await this.datetimes.normalizeValue(type, publishedAt) : void 0;
		const currentPublishedAt = existing.publishedAt ? await this.datetimes.normalizeValue(type, existing.publishedAt) : null;
		if (requireDue && expectedScheduledAt !== void 0 && existing.scheduledAt !== expectedScheduledAt) throw new ScheduledNotDueError();
		if (!promoteRevision && requireSlug && !existing.slug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
		if (!promoteRevision) {
			const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
			let provisionalRevisionId = null;
			try {
				let liveRevisionId = existing.liveRevisionId;
				if (!liveRevisionId) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: id,
						data: existing.data
					});
					liveRevisionId = revision.id;
					provisionalRevisionId = revision.id;
				}
				const intendedPublishedAt = requestedPublishedAt ?? currentPublishedAt ?? now;
				const duePredicate = requireDue ? sql`AND scheduled_at IS NOT NULL AND scheduled_at <= ${now}` : sql``;
				let published = false;
				try {
					published = ((await sql`
						UPDATE ${sql.ref(tableName)}
						SET live_revision_id = ${liveRevisionId},
							draft_revision_id = NULL,
							status = 'published',
							scheduled_at = NULL,
							published_at = ${intendedPublishedAt},
							updated_at = ${now},
							version = version + 1
						WHERE id = ${id}
						AND deleted_at IS NULL
						AND version = ${existing.version}
						AND updated_at = ${existing.updatedAt}
						AND status = ${existing.status}
						AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
						AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
						AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
						${duePredicate}
					`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
				} catch (error) {
					if (isConfirmedStatementFailure(error)) throw error;
					let observed;
					try {
						observed = await this.findById(type, id);
					} catch (reconciliationError) {
						throw new Error("Unable to confirm whether content publication completed", { cause: reconciliationError });
					}
					if (!observed) throw new Error("Unable to confirm whether content publication completed", { cause: error });
					published = matchesLifecyclePublication(observed, existing, liveRevisionId, intendedPublishedAt, now);
					if (!published && matchesPublicationFence(observed, existing)) throw error;
					if (!published) throw new Error("Unable to confirm whether content publication completed", { cause: error });
				}
				if (!published) throw requireDue ? new ScheduledNotDueError() : new ContentMutationConflictError();
				invalidateCollectionCache(type);
				const updated = await this.findById(type, id);
				if (!updated) throw new Error("Content not found");
				return updated;
			} catch (error) {
				if (provisionalRevisionId) try {
					await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
				} catch (cleanupError) {
					console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
				}
				throw error;
			}
		}
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let provisionalRevisionId = null;
		try {
			let revisionToPublish = existing.draftRevisionId || existing.liveRevisionId;
			if (!revisionToPublish) {
				const revision = await revisionRepo.create({
					collection: type,
					entryId: id,
					data: existing.data
				});
				revisionToPublish = revision.id;
				provisionalRevisionId = revision.id;
			}
			const revision = await revisionRepo.findById(revisionToPublish);
			if (!revision || revision.collection !== type || revision.entryId !== id) throw new EmDashValidationError("Revision does not belong to the specified content item");
			const writableFieldSlugs = await this.datetimes.writableFieldSlugs(type);
			const revisionData = keepKnownFields(revision.data, writableFieldSlugs);
			const stagedSlug = typeof revision.data._slug === "string" ? revision.data._slug : null;
			const intendedSlug = stagedSlug ?? existing.slug;
			if (requireSlug && !intendedSlug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
			const intendedPublishedAt = requestedPublishedAt ?? currentPublishedAt ?? now;
			if (stagedSlug !== null && stagedSlug !== existing.slug && existing.locale !== null) {
				const conflict = await this.findBySlugIncludingTrashed(type, stagedSlug, existing.locale);
				if (conflict && conflict.id !== id) throw new EmDashValidationError(`Cannot publish: slug '${stagedSlug}' is already used by another entry in this collection (id: ${conflict.id}). Choose a different slug.`, { code: "SLUG_CONFLICT" });
			}
			const assignments = [];
			if (stagedSlug !== null) assignments.push(sql`slug = ${stagedSlug}`);
			for (const [key, value] of Object.entries(revisionData)) {
				if (SYSTEM_COLUMNS.has(key) || key.startsWith("_")) continue;
				validateIdentifier(key, "content field name");
				assignments.push(sql`${sql.ref(key)} = ${serializeValue(value)}`);
			}
			assignments.push(sql`live_revision_id = ${revisionToPublish}`, sql`draft_revision_id = NULL`, sql`status = 'published'`, sql`scheduled_at = NULL`, sql`published_at = ${intendedPublishedAt}`, sql`updated_at = ${now}`, sql`version = version + 1`);
			const duePredicate = requireDue ? sql`AND scheduled_at IS NOT NULL AND scheduled_at <= ${now}` : sql``;
			let promoted = false;
			try {
				promoted = ((await sql`
					UPDATE ${sql.ref(tableName)}
					SET ${sql.join(assignments, sql`, `)}
					WHERE id = ${id}
					AND deleted_at IS NULL
					AND version = ${existing.version}
					AND updated_at = ${existing.updatedAt}
					AND status = ${existing.status}
					AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
					AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
					AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
					${duePredicate}
					AND EXISTS (
						SELECT 1 FROM revisions
						WHERE revisions.id = ${revisionToPublish}
						AND revisions.collection = ${type}
						AND revisions.entry_id = ${id}
					)
				`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
			} catch (error) {
				if (isConfirmedStatementFailure(error)) throw error;
				let observed;
				try {
					observed = await this.findById(type, id);
				} catch (reconciliationError) {
					throw new Error("Unable to confirm whether content publication completed", { cause: reconciliationError });
				}
				if (!observed) throw new Error("Unable to confirm whether content publication completed", { cause: error });
				promoted = matchesPublication(observed, existing, revisionData, revisionToPublish, intendedSlug, intendedPublishedAt, now);
				if (!promoted && matchesPublicationFence(observed, existing)) throw error;
				if (!promoted) throw new Error("Unable to confirm whether content publication completed", { cause: error });
			}
			if (!promoted) throw requireDue ? new ScheduledNotDueError() : new ContentMutationConflictError();
			invalidateCollectionCache(type);
			const updated = await this.findById(type, id);
			if (!updated) throw new Error("Content not found");
			return updated;
		} catch (error) {
			if (provisionalRevisionId) try {
				await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
			} catch (cleanupError) {
				console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
			}
			throw error;
		}
	}
	/**
	* Unpublish content
	*
	* Removes live pointer and cancels any pending schedule, but preserves the
	* draft and publication date. If no draft exists and `draftFromLive` is set,
	* creates one from the live version so the content isn't lost. Collections
	* without revisions save to the columns, and a draft revision would hide
	* those saves.
	*/
	async unpublish(type, id, expectedRevision, draftFromLive = true) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		if (existing.status === "draft" && !existing.liveRevisionId && !existing.scheduledAt) return existing;
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let provisionalRevisionId = null;
		try {
			let draftRevisionId = existing.draftRevisionId;
			if (draftFromLive && !draftRevisionId && existing.liveRevisionId) {
				const liveRevision = await revisionRepo.findById(existing.liveRevisionId);
				if (liveRevision) {
					const draft = await revisionRepo.create({
						collection: type,
						entryId: id,
						data: liveRevision.data
					});
					draftRevisionId = draft.id;
					provisionalRevisionId = draft.id;
				}
			}
			if (((await sql`
				UPDATE ${sql.ref(tableName)}
				SET live_revision_id = NULL,
					draft_revision_id = ${draftRevisionId},
					status = 'draft',
					scheduled_at = NULL,
					updated_at = ${now},
					version = version + 1
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
			`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError();
			invalidateCollectionCache(type);
			const updated = await this.findById(type, id);
			if (!updated) throw new Error("Content not found");
			return updated;
		} catch (error) {
			if (provisionalRevisionId) try {
				await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
			} catch (cleanupError) {
				console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
			}
			throw error;
		}
	}
	/**
	* Set the draft revision pointer for a content item.
	*
	* Used by seed/import paths that stage a new revision's data before
	* promoting it to live via `publish()`.
	*
	* Validates that the content item exists and is not soft-deleted, that
	* the revision exists, and that the revision belongs to the same
	* collection and entry. Without these checks, a caller could leave the
	* content row pointing at a missing or unrelated revision.
	*/
	async setDraftRevision(type, id, revisionId) {
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const revision = await new RevisionRepository(this.db, this.datetimeContexts).findById(revisionId);
		if (!revision) throw new EmDashValidationError("Revision not found");
		if (revision.collection !== type || revision.entryId !== id) throw new EmDashValidationError("Revision does not belong to the specified content item");
		if (!await this.replaceDraftRevision(type, id, revisionId, existing)) throw new ContentMutationConflictError();
	}
	async replaceDraftRevision(type, id, revisionId, expected) {
		const tableName = getTableName(type);
		return ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = ${revisionId},
				version = version + 1
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${expected.version}
			AND ${nullableColumnMatch("live_revision_id", expected.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", expected.draftRevisionId)}
			AND EXISTS (
				SELECT 1 FROM revisions
				WHERE revisions.id = ${revisionId}
				AND revisions.collection = ${type}
				AND revisions.entry_id = ${id}
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
	}
	/**
	* Discard pending draft changes
	*
	* Clears draft_revision_id. The content table columns already hold the
	* published version, so no data sync is needed.
	*/
	async discardDraft(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		if (!existing.draftRevisionId) return existing;
		if (((await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = NULL,
				version = version + 1
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError();
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Count content items with a pending schedule.
	* Includes both draft-scheduled (status='scheduled') and published
	* posts with scheduled draft changes (status='published', scheduled_at set).
	*/
	async countScheduled(type) {
		const tableName = getTableName(type);
		const result = await sql`
			SELECT COUNT(id) as count FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND deleted_at IS NULL
		`.execute(this.db);
		return Number(result.rows[0]?.count || 0);
	}
	/**
	* Map database row to ContentItem
	* Extracts system columns and puts content fields in data
	* Excludes null values from data to match input semantics
	*/
	mapRow(type, row) {
		const data = {};
		for (const [key, value] of Object.entries(row)) if (!SYSTEM_COLUMNS.has(key) && value !== null) data[key] = deserializeValue(value);
		return {
			id: row.id,
			type,
			slug: row.slug,
			status: row.status,
			data,
			authorId: row.author_id,
			primaryBylineId: row.primary_byline_id ?? null,
			createdAt: row.created_at,
			updatedAt: row.updated_at,
			publishedAt: row.published_at,
			scheduledAt: row.scheduled_at,
			liveRevisionId: row.live_revision_id ?? null,
			draftRevisionId: row.draft_revision_id ?? null,
			version: typeof row.version === "number" ? row.version : 1,
			locale: row.locale ?? null,
			translationGroup: row.translation_group ?? null
		};
	}
	normalizeFilterScalar(field, type, value) {
		if (type === "number" || type === "integer") {
			if (typeof value !== "number" || !Number.isFinite(value)) throw new EmDashValidationError(`Filter for field "${field}" must use a finite number`);
			if (type === "integer" && !Number.isInteger(value)) throw new EmDashValidationError(`Filter for field "${field}" must use an integer`);
			return value;
		}
		if (type === "boolean") {
			if (typeof value !== "boolean") throw new EmDashValidationError(`Filter for field "${field}" must use a boolean`);
			return value ? 1 : 0;
		}
		if (typeof value !== "string") throw new EmDashValidationError(`Filter for field "${field}" must use a string`);
		if (value.length > MAX_FILTER_STRING_LENGTH) throw new EmDashValidationError(`Filter value for field "${field}" exceeds ${MAX_FILTER_STRING_LENGTH} characters`);
		if (type === "datetime") try {
			return normalizeExplicitDatetime(value);
		} catch {
			throw new EmDashValidationError(`Filter for datetime field "${field}" must use an ISO 8601 datetime with Z or an explicit offset`);
		}
		return value;
	}
	normalizeFieldFilter(field, type, value) {
		if (value === null) return {
			column: field,
			kind: "null"
		};
		if (typeof value !== "object") return {
			column: field,
			kind: "exact",
			value: this.normalizeFilterScalar(field, type, value)
		};
		if (Array.isArray(value)) throw new EmDashValidationError(`Invalid filter for field "${field}"`);
		const record = value;
		const keys = Object.keys(record);
		if (keys.length === 1 && keys[0] === "in") {
			if (!Array.isArray(record.in) || record.in.length === 0) throw new EmDashValidationError(`IN filter for field "${field}" must not be empty`);
			if (record.in.length > MAX_IN_FILTER_VALUES) throw new EmDashValidationError(`IN filter for field "${field}" exceeds ${MAX_IN_FILTER_VALUES} values`);
			return {
				column: field,
				kind: "in",
				values: record.in.map((entry) => this.normalizeFilterScalar(field, type, entry))
			};
		}
		const rangeKeys = /* @__PURE__ */ new Set([
			"gt",
			"gte",
			"lt",
			"lte"
		]);
		if (keys.length === 0 || keys.some((key) => !rangeKeys.has(key))) throw new EmDashValidationError(`Invalid filter operator for field "${field}"`);
		if (type === "boolean") throw new EmDashValidationError(`Boolean field "${field}" does not support range filters`);
		const bounds = {};
		for (const key of keys) {
			if (record[key] === void 0) continue;
			bounds[key] = this.normalizeFilterScalar(field, type, record[key]);
		}
		if (Object.keys(bounds).length === 0) throw new EmDashValidationError(`Range filter for field "${field}" has no bounds`);
		return {
			column: field,
			kind: "range",
			bounds
		};
	}
	async collectionExists(type) {
		return await this.db.selectFrom("_emdash_collections").where("slug", "=", type).select("id").executeTakeFirst() !== void 0;
	}
	async resolveFieldFilters(type, filters) {
		const resolvedFilters = filters ?? {};
		const fields = Object.keys(resolvedFilters);
		if (fields.length === 0) return [];
		if (fields.length > MAX_INDEXED_FIELD_FILTERS) {
			if (!await this.collectionExists(type)) return [];
			throw new EmDashValidationError(`Content list queries support at most ${MAX_INDEXED_FIELD_FILTERS} indexed field filters`);
		}
		const rows = await this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").where("collection.slug", "=", type).where("field.slug", "in", fields).where("field.indexed", "=", 1).select([
			"field.slug",
			"field.type",
			"field.validation"
		]).execute();
		const metadata = new Map(rows.filter((row) => !isStoragelessFieldRow(row)).map((row) => [row.slug, row.type]));
		if (metadata.size === 0 && !await this.collectionExists(type)) return [];
		for (const field of fields) try {
			validateIdentifier(field, "content filter field");
		} catch {
			throw new EmDashValidationError(`Invalid content filter field: ${field}`);
		}
		const normalized = fields.map((field) => {
			const fieldType = metadata.get(field);
			if (!fieldType || !isIndexableFieldType(fieldType)) throw new EmDashValidationError(`Cannot filter by field "${field}". Custom fields must be indexed before filtering.`);
			return this.normalizeFieldFilter(field, fieldType, resolvedFilters[field]);
		});
		if (normalized.reduce((total, filter) => {
			if (filter.kind === "null") return total;
			if (filter.kind === "exact") return total + 1;
			if (filter.kind === "in") return total + filter.values.length;
			return total + Object.keys(filter.bounds).length;
		}, 0) > 50) throw new EmDashValidationError(`Indexed field filters have a total operand budget of 50`);
		return normalized;
	}
	applyFieldFilters(query, filters) {
		let next = query;
		for (const filter of filters) {
			const column = sql.ref(filter.column);
			const isPresent = sql`${column} IS NOT NULL`;
			if (filter.kind === "null") {
				next = next.where(() => sql`(${isPresent}) = FALSE AND ${column} IS NULL`);
				continue;
			}
			if (filter.kind === "exact") {
				next = next.where(() => sql`(${isPresent}) = TRUE AND ${column} = ${filter.value}`);
				continue;
			}
			if (filter.kind === "in") {
				const values = sql.join(filter.values.map((value) => sql`${value}`), sql`, `);
				next = next.where(() => sql`(${isPresent}) = TRUE AND ${column} IN (${values})`);
				continue;
			}
			next = next.where(() => sql`(${isPresent}) = TRUE`);
			if (filter.bounds.gt !== void 0) next = next.where(() => sql`${column} > ${filter.bounds.gt}`);
			if (filter.bounds.gte !== void 0) next = next.where(() => sql`${column} >= ${filter.bounds.gte}`);
			if (filter.bounds.lt !== void 0) next = next.where(() => sql`${column} < ${filter.bounds.lt}`);
			if (filter.bounds.lte !== void 0) next = next.where(() => sql`${column} <= ${filter.bounds.lte}`);
		}
		return next;
	}
	/**
	* Map order field names to database columns.
	* Only allows known fields to prevent column enumeration via crafted orderBy values.
	*/
	mapOrderField(field, sortableExtras = []) {
		const mapped = ORDER_FIELD_COLUMNS[field];
		if (mapped) return mapped;
		if (sortableExtras.includes(field)) {
			validateIdentifier(field, "order field");
			return field;
		}
		throw new EmDashValidationError(`Invalid order field: ${field}`);
	}
	async resolveOrderField(type, field, sortableExtras = []) {
		try {
			return {
				column: this.mapOrderField(field, sortableExtras),
				indexedCustomField: false
			};
		} catch (error) {
			if (!(error instanceof EmDashValidationError)) throw error;
		}
		const customField = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", (join) => join.onRef("field.collection_id", "=", "collection.id").on("field.slug", "=", field).on("field.indexed", "=", 1)).where("collection.slug", "=", type).select(["collection.id as collectionId", "field.slug as fieldSlug"]).executeTakeFirst();
		if (!customField) throw new ContentCollectionNotFoundError(type);
		if (!customField.fieldSlug) throw new EmDashValidationError(`Invalid order field: ${field}. Custom fields must be indexed before sorting.`);
		validateIdentifier(customField.fieldSlug, "content order field");
		return {
			column: customField.fieldSlug,
			indexedCustomField: true
		};
	}
};
export { staleStoredKeys as a, keepKnownFields as i, content_exports as n, isSystemOrderField as r, ContentRepository as t };
