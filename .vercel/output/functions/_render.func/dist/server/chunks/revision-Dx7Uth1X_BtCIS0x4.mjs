import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { c as DatetimeNormalizationError, l as normalizeContentDatetimes, u as normalizeDatetime } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { r as isSafeUrlFieldWriteValue } from "./url-DTfGDJhI_CrwsbJIk.mjs";
import { i as EmDashValidationError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { sql } from "kysely";
import { monotonicFactory } from "ulidx";
// node_modules/emdash/dist/revision-Dx7Uth1X.mjs
function repeaterSubFieldsOfType(validation, type) {
	if (!validation) return [];
	let parsed;
	try {
		parsed = JSON.parse(validation);
	} catch {
		return [];
	}
	if (typeof parsed !== "object" || parsed === null || !("subFields" in parsed)) return [];
	const subFields = parsed.subFields;
	if (!Array.isArray(subFields)) return [];
	return subFields.filter((field) => typeof field === "object" && field !== null && "type" in field && field.type === type && "slug" in field && typeof field.slug === "string").map((field) => field.slug);
}
var ContentDatetimeNormalizer = class {
	constructor(db, contexts) {
		this.db = db;
		this.contexts = contexts;
	}
	context(collection) {
		if (this.contexts) {
			let context = this.contexts.get(collection);
			if (!context) {
				context = this.loadContext(collection);
				this.contexts.set(collection, context);
			}
			return context;
		}
		return requestCached(`datetimeContext:${collection}`, () => this.loadContext(collection));
	}
	async loadContext(collection) {
		const [rows, timezoneRow] = await Promise.all([this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select([
			"field.slug",
			"field.type",
			"field.validation"
		]).where("collection.slug", "=", collection).execute(), this.db.selectFrom("options").select("value").where("name", "=", "site:timezone").executeTakeFirst()]);
		let timezone = "UTC";
		if (timezoneRow) try {
			const configured = JSON.parse(timezoneRow.value);
			if (typeof configured === "string" && configured) timezone = configured;
		} catch {}
		const fields = [];
		const urlFields = [];
		for (const row of rows) if (row.type === "datetime") fields.push({
			slug: row.slug,
			type: "datetime"
		});
		else if (row.type === "url") urlFields.push({ slug: row.slug });
		else if (row.type === "repeater") {
			fields.push({
				slug: row.slug,
				type: "repeater",
				datetimeSubFields: repeaterSubFieldsOfType(row.validation, "datetime")
			});
			const urlSubFields = repeaterSubFieldsOfType(row.validation, "url");
			if (urlSubFields.length > 0) urlFields.push({
				slug: row.slug,
				urlSubFields
			});
		}
		const writableFieldSlugs = new Set(rows.filter((field) => !isStoragelessFieldRow(field)).map((field) => field.slug));
		return {
			timezone,
			fields,
			urlFields,
			writableFieldSlugs
		};
	}
	async writableFieldSlugs(collection) {
		return (await this.context(collection)).writableFieldSlugs;
	}
	/**
	* Normalizes datetimes in incoming field values and rejects `url` values
	* with unsafe schemes, control characters, or off-site path forms. Values
	* already stored are not checked, so restoring or syncing existing data
	* goes through {@link normalizeData} instead.
	*/
	async normalizeInput(collection, data) {
		const context = await this.context(collection);
		assertSafeUrlFields(data, context.urlFields);
		return this.normalizeWithContext(context, [data])[0] ?? data;
	}
	async normalizeData(collection, data) {
		const [normalized] = await this.normalizeDataMany(collection, [data]);
		return normalized ?? data;
	}
	async normalizeDataMany(collection, items) {
		return this.normalizeWithContext(await this.context(collection), items);
	}
	normalizeWithContext(context, items) {
		try {
			return items.map((data) => normalizeContentDatetimes(data, context.fields, context.timezone).value);
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
	async normalizeValue(collection, value) {
		const context = await this.context(collection);
		try {
			return normalizeDatetime(value, context.timezone).value;
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
};
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function repeaterRows(value) {
	let rows = value;
	if (typeof rows === "string" && rows.startsWith("[")) try {
		rows = JSON.parse(rows);
	} catch {
		return;
	}
	return Array.isArray(rows) ? rows : void 0;
}
function assertSafeUrl(path, value) {
	if (typeof value === "string" && !isSafeUrlFieldWriteValue(value)) throw new EmDashValidationError(`Field "${path}" must use http, https, mailto, or tel, or be a safe relative path or fragment`, { path });
}
function assertSafeUrlFields(data, urlFields) {
	for (const field of urlFields) {
		const value = data[field.slug];
		if (!field.urlSubFields) {
			assertSafeUrl(field.slug, value);
			continue;
		}
		const rows = repeaterRows(value);
		if (!rows) continue;
		for (const [index, row] of rows.entries()) {
			if (!isRecord(row)) continue;
			for (const subField of field.urlSubFields) assertSafeUrl(`${field.slug}.${index}.${subField}`, row[subField]);
		}
	}
}
var monotonic = monotonicFactory();
function createRevisionId() {
	return monotonic();
}
function normalizeRevisionLimit(value) {
	const numeric = Number(value);
	if (!Number.isFinite(numeric)) return 50;
	return Math.max(1, Math.min(Math.trunc(numeric), 100));
}
/**
* Revision repository for version history
*
* Each revision stores a JSON snapshot of the content at a point in time.
* Used when collection has `supports: ["revisions"]` enabled.
*/
var RevisionRepository = class {
	datetimes;
	constructor(db, datetimeContexts) {
		this.db = db;
		this.datetimes = new ContentDatetimeNormalizer(db, datetimeContexts);
	}
	/**
	* Create a new revision
	*/
	async create(input) {
		const id = createRevisionId();
		const data = await this.datetimes.normalizeData(input.collection, input.data);
		const row = {
			id,
			collection: input.collection,
			entry_id: input.entryId,
			data: JSON.stringify(data),
			author_id: input.authorId ?? null
		};
		await this.db.insertInto("revisions").values(row).execute();
		const revision = await this.findById(id);
		if (!revision) throw new Error("Failed to create revision");
		await this.queuePruning(input.collection, input.entryId, id);
		return revision;
	}
	async queuePruning(collection, entryId, revisionId) {
		try {
			await this.db.insertInto("_emdash_revision_prune_queue").values({
				collection,
				entry_id: entryId,
				revision_id: revisionId
			}).onConflict((conflict) => conflict.columns(["collection", "entry_id"]).doUpdateSet({ revision_id: revisionId })).execute();
		} catch (error) {
			console.error(`[revisions] Failed to queue revision pruning for ${collection}/${entryId}:`, error);
		}
	}
	/**
	* Find revision by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("revisions").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.normalizeRow(row) : null;
	}
	/** Shallow-merge `patch` into a stored revision's data. */
	async mergeData(id, patch) {
		const row = await this.db.selectFrom("revisions").select("data").where("id", "=", id).executeTakeFirst();
		if (!row) return;
		const data = {
			...JSON.parse(row.data),
			...patch
		};
		await this.db.updateTable("revisions").set({ data: JSON.stringify(data) }).where("id", "=", id).execute();
	}
	/**
	* Get all revisions for an entry (newest first)
	*
	* Orders by monotonic ULID (descending). The monotonic factory
	* guarantees strictly increasing IDs even within the same millisecond.
	*/
	async findByEntry(collection, entryId, options = {}) {
		let query = this.db.selectFrom("revisions").leftJoin("users", "users.id", "revisions.author_id").selectAll("revisions").select(["users.id as author_user_id", "users.name as author_name"]).where("revisions.collection", "=", collection).where("revisions.entry_id", "=", entryId).orderBy("revisions.id", "desc");
		if (options.limit) query = query.limit(options.limit);
		const rows = await query.execute();
		const data = await this.datetimes.normalizeDataMany(collection, rows.map((row) => JSON.parse(row.data)));
		return rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			return {
				...this.rowToRevision(row, normalized),
				author: row.author_user_id ? {
					id: row.author_user_id,
					name: row.author_name?.trim() || null
				} : null
			};
		});
	}
	/** Read revisions only when the owning content row is visible in the same statement snapshot. */
	async findVisibleByEntry(collection, entryId, options = {}) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const limit = normalizeRevisionLimit(options.limit);
		const result = await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			ORDER BY revisions.id DESC
			LIMIT ${limit}
		`.execute(this.db);
		const data = await this.datetimes.normalizeDataMany(collection, result.rows.map((row) => JSON.parse(row.data)));
		return result.rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			return this.rowToRevision(row, normalized);
		});
	}
	/** Read one revision only when its owning content row is visible in the same statement snapshot. */
	async findVisibleById(collection, entryId, revisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const row = (await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.id = ${revisionId}
			AND revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			LIMIT 1
		`.execute(this.db)).rows[0];
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Get the most recent revision for an entry
	*/
	async findLatest(collection, entryId) {
		const row = await this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("id", "desc").limit(1).executeTakeFirst();
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Count revisions for an entry
	*/
	async countByEntry(collection, entryId) {
		const result = await this.db.selectFrom("revisions").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Delete all revisions for an entry (use when entry is deleted)
	*/
	async deleteByEntry(collection, entryId) {
		const result = await this.db.deleteFrom("revisions").where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		try {
			await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).execute();
		} catch (error) {
			console.error(`[revisions] Failed to clear queued revision pruning for ${collection}/${entryId}:`, error);
		}
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete old revisions, keeping the most recent N
	*/
	async pruneOldRevisions(collection, entryId, keepCount, throughRevisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		let keepQuery = this.db.selectFrom("revisions").select("id").where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("created_at", "desc").orderBy("id", "desc").limit(keepCount);
		if (throughRevisionId) keepQuery = keepQuery.where("id", "<=", throughRevisionId);
		const keepIds = (await keepQuery.execute()).map((r) => r.id);
		if (keepIds.length === 0) return 0;
		const result = await sql`
			DELETE FROM revisions
			WHERE collection = ${collection}
			AND entry_id = ${entryId}
			${throughRevisionId ? sql`AND id <= ${throughRevisionId}` : sql``}
			AND id NOT IN (${sql.join(keepIds.map((id) => sql`${id}`))})
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db);
		return Number(result.numAffectedRows ?? 0);
	}
	async pruneQueuedEntry(collection, entryId, queuedRevisionId, keepCount) {
		const pruned = await this.pruneOldRevisions(collection, entryId, keepCount, queuedRevisionId);
		await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).where("revision_id", "=", queuedRevisionId).execute();
		return pruned;
	}
	async deleteIfUnreferenced(collection, entryId, revisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		return ((await sql`
			DELETE FROM revisions
			WHERE id = ${revisionId}
			AND collection = ${collection}
			AND entry_id = ${entryId}
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
	}
	/**
	* Convert database row to Revision object
	*/
	async normalizeRow(row) {
		const data = await this.datetimes.normalizeData(row.collection, JSON.parse(row.data));
		return this.rowToRevision(row, data);
	}
	rowToRevision(row, data) {
		return {
			id: row.id,
			collection: row.collection,
			entryId: row.entry_id,
			data,
			authorId: row.author_id,
			createdAt: row.created_at
		};
	}
};
export { normalizeRevisionLimit as i, RevisionRepository as n, createRevisionId as r, ContentDatetimeNormalizer as t };
