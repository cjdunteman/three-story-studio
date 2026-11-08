import { d as decodeCursor, f as encodeCursor, g as getRequestContext, h as after, n as peekRequestCache, r as requestCached } from "./request-cache_CXFiINQX.mjs";
import { t as chunks } from "./chunks_B4YLB6C7.mjs";
import { h as singleFlightCached, l as getDb, m as invalidateSingleFlightCache, p as createSingleFlightCache } from "./loader_Btw7VAs7.mjs";
import { n as cachedQuery } from "./object-cache_C1QujUiI.mjs";
import "@oslojs/encoding";
import { sql } from "kysely";
import { z } from "zod";
import { ulid } from "ulidx";
import "@oslojs/crypto/sha2";
// node_modules/emdash/src/plugins/conditional-storage.ts
var MAX_KEY_LENGTH = 1024;
var MAX_REVISION_LENGTH = 128;
var MAX_VALUE_BYTES = 1048576;
function assertStorageKey(key, maxLength = MAX_KEY_LENGTH) {
	if (typeof key !== "string" || key.length === 0 || key.length > maxLength) throw new TypeError(`Storage key must be a nonempty string of at most ${maxLength} characters`);
}
function assertStorageRevision(revision) {
	if (typeof revision !== "string" || revision.length === 0 || revision.length > MAX_REVISION_LENGTH) throw new TypeError("Storage revision must be a nonempty string of at most 128 characters");
}
function serializeConditionalValue(value) {
	const serialized = JSON.stringify(value);
	if (serialized === void 0) throw new TypeError("Storage value must be JSON serializable");
	if (new TextEncoder().encode(serialized).byteLength > MAX_VALUE_BYTES) throw new TypeError("Conditional storage value must not exceed 1 MiB of JSON");
	return serialized;
}
// node_modules/emdash/src/database/repositories/options.ts
function escapeLike$1(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Options repository for key-value settings storage
*
* Used for site settings, plugin configuration, and other arbitrary key-value data.
* Values are stored as JSON for flexibility.
*/
var OptionsRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Get an option value
	*/
	async get(name) {
		const row = await this.db.selectFrom("options").select("value").where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return JSON.parse(row.value);
	}
	/**
	* Get an option value with a default
	*/
	async getOrDefault(name, defaultValue) {
		return await this.get(name) ?? defaultValue;
	}
	/**
	* Set an option value (creates or updates)
	*/
	async set(name, value) {
		await this.setVersioned(name, value);
	}
	async setVersioned(name, value) {
		const revision = crypto.randomUUID();
		const row = {
			name,
			value: JSON.stringify(value),
			revision
		};
		await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doUpdateSet({
			value: row.value,
			revision: row.revision
		})).execute();
		return revision;
	}
	/**
	* Set an option value only if no row with that name exists. Atomic at the
	* database level via INSERT ... ON CONFLICT DO NOTHING, so concurrent
	* callers can't race past the check.
	*
	* Returns true when the row was inserted, false when a row already
	* existed (regardless of its value — even an empty string or null).
	*/
	async setIfAbsent(name, value) {
		const row = {
			name,
			value: JSON.stringify(value),
			revision: crypto.randomUUID()
		};
		return ((await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n;
	}
	async getVersioned(name) {
		assertStorageKey(name, 2048);
		const row = await this.db.selectFrom("options").select(["value", "revision"]).where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return {
			value: JSON.parse(row.value),
			revision: row.revision
		};
	}
	async compareAndSet(name, expectedRevision, value) {
		assertStorageKey(name, 2048);
		if (expectedRevision !== null) assertStorageRevision(expectedRevision);
		const serialized = serializeConditionalValue(value);
		const revision = crypto.randomUUID();
		const row = expectedRevision === null ? await this.db.insertInto("options").values({
			name,
			value: serialized,
			revision
		}).onConflict((oc) => oc.column("name").doNothing()).returning("revision").executeTakeFirst() : await this.db.updateTable("options").set({
			value: serialized,
			revision
		}).where("name", "=", name).where("revision", "=", expectedRevision).returning("revision").executeTakeFirst();
		return row ? {
			applied: true,
			revision: row.revision
		} : { applied: false };
	}
	async compareAndDelete(name, expectedRevision) {
		assertStorageKey(name, 2048);
		assertStorageRevision(expectedRevision);
		return { applied: await this.db.deleteFrom("options").where("name", "=", name).where("revision", "=", expectedRevision).returning("name").executeTakeFirst() !== void 0 };
	}
	/**
	* Delete an option
	*/
	async delete(name) {
		return ((await this.db.deleteFrom("options").where("name", "=", name).executeTakeFirst()).numDeletedRows ?? 0) > 0;
	}
	/**
	* Delete multiple options in one statement.
	*/
	async deleteMany(names) {
		if (names.length === 0) return 0;
		const result = await this.db.deleteFrom("options").where("name", "in", names).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Check if an option exists
	*/
	async exists(name) {
		return !!await this.db.selectFrom("options").select("name").where("name", "=", name).executeTakeFirst();
	}
	/**
	* Get multiple options at once
	*/
	async getMany(names) {
		if (names.length === 0) return /* @__PURE__ */ new Map();
		const rows = await this.db.selectFrom("options").select(["name", "value"]).where("name", "in", names).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Set multiple options at once
	*/
	async setMany(options) {
		const entries = Object.entries(options);
		if (entries.length === 0) return;
		for (const [name, value] of entries) await this.set(name, value);
	}
	/**
	* Get all options (use sparingly)
	*/
	async getAll() {
		const rows = await this.db.selectFrom("options").select(["name", "value"]).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Get all options matching a prefix
	*/
	async getByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike$1(prefix)}%`;
		let query = this.db.selectFrom("options").select(["name", "value"]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	async getVersionedByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike$1(prefix)}%`;
		let query = this.db.selectFrom("options").select([
			"name",
			"value",
			"revision"
		]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, {
			value: JSON.parse(row.value),
			revision: row.revision
		});
		return result;
	}
	async countByPrefix(prefix) {
		const pattern = `${escapeLike$1(prefix)}%`;
		const row = await this.db.selectFrom("options").select((eb) => eb.fn.countAll().as("count")).where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(row?.count ?? 0);
	}
	/**
	* Delete all options matching a prefix
	*/
	async deleteByPrefix(prefix) {
		const pattern = `${escapeLike$1(prefix)}%`;
		const result = await this.db.deleteFrom("options").where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
};
new RegExp(`^${"emdash_enc_v1_".replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[A-Za-z0-9_-]{43}$`);
// node_modules/emdash/src/media/focal-point.ts
function isFocalCoordinate(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}
function normalizeFocalPoint(focalX, focalY) {
	if (!isFocalCoordinate(focalX) || !isFocalCoordinate(focalY)) return null;
	return {
		focalX,
		focalY
	};
}
function focalPointToObjectPosition(focalX, focalY) {
	const point = normalizeFocalPoint(focalX, focalY);
	if (!point) return void 0;
	return `${Math.round(point.focalX * 1e4) / 100}% ${Math.round(point.focalY * 1e4) / 100}%`;
}
// node_modules/emdash/src/database/repositories/media.ts
/** Escape LIKE wildcard characters and the escape char itself in user-supplied values */
function escapeLike(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Normalize a mimeType filter (string or array) into a clean string[].
* Entries that are empty strings are dropped.
*/
function normalizeMimeFilter(input) {
	if (!input) return [];
	return (Array.isArray(input) ? input : [input]).filter((entry) => typeof entry === "string" && entry.length > 0).map((entry) => entry.endsWith("/") ? entry.toLowerCase() : entry.split(";")[0].trim().toLowerCase());
}
function normalizeListLimit(limit) {
	return Math.min(Math.max(typeof limit === "number" && !Number.isNaN(limit) ? Math.trunc(limit) : 50, 1), 100);
}
/**
* Build a WHERE clause that matches `mime_type` against any of the given
* filter entries — exact equality for full MIMEs, LIKE prefix for entries
* ending in "/".
*/
function mimeMatchExpr(eb, filters) {
	return eb.or(filters.map((entry) => entry.endsWith("/") ? sql`mime_type LIKE ${`${escapeLike(entry)}%`} ESCAPE '\\'` : eb("mime_type", "=", entry)));
}
var UPLOAD_ATTEMPT_CLEANUP_AGE_MS = 36e5;
var UPLOAD_ATTEMPT_CLEANUP_BATCH_SIZE = 100;
/**
* Media repository for database operations
*/
var MediaRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new media item
	*/
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			id,
			filename: input.filename,
			mime_type: input.mimeType,
			size: input.size ?? null,
			width: input.width ?? null,
			height: input.height ?? null,
			focal_x: null,
			focal_y: null,
			alt: input.alt ?? null,
			caption: input.caption ?? null,
			storage_key: input.storageKey,
			content_hash: input.contentHash ?? null,
			blurhash: input.blurhash ?? null,
			dominant_color: input.dominantColor ?? null,
			status: input.status ?? "ready",
			created_at: now,
			author_id: input.authorId ?? null,
			folder_id: input.folderId ?? null
		};
		await this.db.insertInto("media").values(row).execute();
		return this.rowToItem(row);
	}
	/**
	* Create a pending media item (for signed URL upload flow)
	*/
	async createPending(input) {
		return this.create({
			...input,
			status: "pending"
		});
	}
	async createUploadAttempt(mediaId, storageKey) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_media_upload_attempts").values({
			media_id: mediaId,
			storage_key: storageKey,
			status: "active",
			created_at: now,
			updated_at: now
		}).execute();
	}
	/**
	* Register a stored object for cleanup before its media row is removed,
	* so a failed storage delete is retried by the cleanup sweep instead of
	* leaving the object unreferenced and unreachable.
	*/
	async trackStorageKeyForCleanup(mediaId, storageKey) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_media_upload_attempts").values({
			media_id: mediaId,
			storage_key: storageKey,
			status: "cleanup",
			created_at: now,
			updated_at: now
		}).onConflict((oc) => oc.column("storage_key").doUpdateSet({
			status: "cleanup",
			updated_at: now
		})).execute();
	}
	async hasUploadAttempt(storageKey) {
		return await this.db.selectFrom("_emdash_media_upload_attempts").select("storage_key").where("storage_key", "=", storageKey).executeTakeFirst() !== void 0;
	}
	async claimUploadAttemptForCleanup(storageKey) {
		const result = await this.db.updateTable("_emdash_media_upload_attempts").set({
			status: "cleanup",
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).where("storage_key", "=", storageKey).where((eb) => eb.not(eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key")))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async deleteUploadAttempt(storageKey) {
		await this.db.deleteFrom("_emdash_media_upload_attempts").where("storage_key", "=", storageKey).execute();
	}
	async deferUploadAttemptCleanup(storageKey) {
		await this.db.updateTable("_emdash_media_upload_attempts").set({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).where("storage_key", "=", storageKey).execute();
	}
	async deleteCompletedUploadAttempts() {
		const result = await this.db.deleteFrom("_emdash_media_upload_attempts").where("status", "=", "active").where((eb) => eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.id", "=", "_emdash_media_upload_attempts.media_id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key").where("media.status", "=", "ready"))).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async findUploadAttemptsForCleanup(maxAgeMs = UPLOAD_ATTEMPT_CLEANUP_AGE_MS, limit = UPLOAD_ATTEMPT_CLEANUP_BATCH_SIZE) {
		const cutoff = new Date(Date.now() - maxAgeMs).toISOString();
		return (await this.db.selectFrom("_emdash_media_upload_attempts").select("storage_key").where((eb) => eb.or([eb("status", "=", "cleanup"), eb("created_at", "<", cutoff)])).where((eb) => eb.not(eb.exists(eb.selectFrom("media").select("media.id").whereRef("media.storage_key", "=", "_emdash_media_upload_attempts.storage_key")))).orderBy("updated_at", "asc").limit(limit).execute()).map((row) => row.storage_key);
	}
	async publishPendingStorageKey(id, expectedStorageKey, storageKey, contentHash) {
		const result = await this.db.updateTable("media").set({
			storage_key: storageKey,
			...contentHash !== void 0 ? { content_hash: contentHash } : {}
		}).where("id", "=", id).where("status", "=", "pending").where("storage_key", "=", expectedStorageKey).where((eb) => eb.exists(eb.selectFrom("_emdash_media_upload_attempts").select("storage_key").where("media_id", "=", id).where("storage_key", "=", storageKey).where("status", "=", "active"))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	/**
	* Confirm upload (mark as ready)
	*/
	async confirmUpload(id, metadata, expectedStorageKey) {
		const updates = { status: "ready" };
		if (metadata?.width !== void 0) updates.width = metadata.width;
		if (metadata?.height !== void 0) updates.height = metadata.height;
		if (metadata?.size !== void 0) updates.size = metadata.size;
		if (metadata?.blurhash !== void 0) updates.blurhash = metadata.blurhash;
		if (metadata?.dominantColor !== void 0) updates.dominant_color = metadata.dominantColor;
		if (metadata?.contentHash !== void 0) updates.content_hash = metadata.contentHash;
		let query = this.db.updateTable("media").set(updates).where("id", "=", id).where("status", "=", "pending");
		if (expectedStorageKey !== void 0) query = query.where("storage_key", "=", expectedStorageKey);
		const row = await query.returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Mark upload as failed
	*/
	async markFailed(id, expectedStorageKey) {
		let query = this.db.updateTable("media").set({ status: "failed" }).where("id", "=", id);
		if (expectedStorageKey !== void 0) query = query.where("status", "=", "pending").where("storage_key", "=", expectedStorageKey);
		const row = await query.returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find the pending media row minted for a signed upload URL.
	*/
	async findPendingByStorageKey(storageKey) {
		const row = await this.db.selectFrom("media").selectAll().where("storage_key", "=", storageKey).where("status", "=", "pending").executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find media by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("media").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find the original upload filename for a storage key.
	*
	* Used by the public media file route to name the download after the file
	* the editor uploaded rather than after its storage key. Selects the single
	* column it needs: this runs on every unauthenticated download.
	*/
	async findFilenameByStorageKey(storageKey) {
		return (await this.db.selectFrom("media").select("filename").where("storage_key", "=", storageKey).executeTakeFirst())?.filename ?? null;
	}
	/**
	* Find media by filename
	* Useful for idempotent imports
	*/
	async findByFilename(filename) {
		const row = await this.db.selectFrom("media").selectAll().where("filename", "=", filename).executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	async findAvailableFilename(filename) {
		const exists = async (candidate) => Boolean(await this.db.selectFrom("media").select("id").where(sql`lower(filename)`, "=", candidate.toLowerCase()).executeTakeFirst());
		if (!await exists(filename)) return filename;
		const extensionIndex = filename.lastIndexOf(".");
		const hasExtension = extensionIndex > 0;
		const extension = hasExtension ? filename.slice(extensionIndex) : "";
		const stem = hasExtension ? filename.slice(0, extensionIndex) : filename;
		let copyNumber = 2;
		let candidate = `${stem}-${copyNumber}${extension}`;
		while (await exists(candidate)) {
			copyNumber += 1;
			candidate = `${stem}-${copyNumber}${extension}`;
		}
		return candidate;
	}
	/**
	* Find media by content hash
	* Used for deduplication - same content = same hash
	*/
	async findByContentHash(contentHash) {
		const row = await this.db.selectFrom("media").selectAll().where("content_hash", "=", contentHash).where("status", "=", "ready").executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Find many media items with cursor pagination
	*
	* Uses keyset pagination (cursor-based) for consistent results.
	* The cursor encodes the created_at and id of the last item.
	*/
	async findMany(options = {}) {
		const limit = normalizeListLimit(options.limit);
		let query = this.applyListFilters(this.db.selectFrom("media"), options).selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		if (options.cursor) {
			const { orderValue: createdAt, id: cursorId } = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", createdAt), eb.and([eb("created_at", "=", createdAt), eb("id", "<", cursorId)])]));
		}
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit).map((row) => this.rowToItem(row));
		let nextCursor;
		if (hasMore && items.length > 0) {
			const lastItem = items.at(-1);
			nextCursor = encodeCursor(lastItem.createdAt, lastItem.id);
		}
		return {
			items,
			nextCursor
		};
	}
	async findPage(options) {
		const limit = normalizeListLimit(options.limit);
		const offset = (options.page - 1) * limit;
		const filtered = this.applyListFilters(this.db.selectFrom("media"), options);
		const rows = await filtered.selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit).offset(offset).execute();
		const count = await filtered.select((eb) => eb.fn.count("id").as("count")).executeTakeFirst();
		return {
			items: rows.map((row) => this.rowToItem(row)),
			totalCount: Number(count?.count ?? 0)
		};
	}
	/**
	* Update media metadata
	*/
	async update(id, input) {
		if (!await this.findById(id)) return null;
		const updates = {};
		if (input.alt !== void 0) updates.alt = input.alt;
		if (input.caption !== void 0) updates.caption = input.caption;
		if (input.width !== void 0) updates.width = input.width;
		if (input.height !== void 0) updates.height = input.height;
		if (input.folderId !== void 0) updates.folder_id = input.folderId;
		if (input.focalX !== void 0 && input.focalY !== void 0) {
			updates.focal_x = input.focalX;
			updates.focal_y = input.focalY;
		}
		if (Object.keys(updates).length > 0) await this.db.updateTable("media").set(updates).where("id", "=", id).execute();
		return this.findById(id);
	}
	async updateReadyMetadata(id, input) {
		const updates = {};
		if (input.alt !== void 0) updates.alt = input.alt;
		if (input.caption !== void 0) updates.caption = input.caption;
		if (input.focalX !== void 0 && input.focalY !== void 0) {
			updates.focal_x = input.focalX;
			updates.focal_y = input.focalY;
		}
		if (Object.keys(updates).length === 0) throw new TypeError("Media metadata update requires at least one field");
		const row = await this.db.updateTable("media").set(updates).where("id", "=", id).where("status", "=", "ready").returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	async replaceReadyFile(id, expectedStorageKey, input) {
		const row = await this.db.updateTable("media").set({
			size: input.size,
			width: input.width,
			height: input.height,
			content_hash: input.contentHash,
			blurhash: null,
			dominant_color: null,
			focal_x: null,
			focal_y: null
		}).where("id", "=", id).where("status", "=", "ready").where("storage_key", "=", expectedStorageKey).returningAll().executeTakeFirst();
		return row ? this.rowToItem(row) : null;
	}
	/**
	* Delete media item
	*/
	async deleteWithStorageKey(id) {
		const deleted = await this.db.deleteFrom("media").where("id", "=", id).returning("storage_key").executeTakeFirst();
		if (deleted) return deleted.storage_key;
		return null;
	}
	async isStorageKeyReferenced(storageKey) {
		return await this.db.selectFrom("media").select("id").where("storage_key", "=", storageKey).executeTakeFirst() !== void 0;
	}
	async delete(id) {
		return await this.deleteWithStorageKey(id) !== null;
	}
	/**
	* Count media items
	*/
	async count(mimeType) {
		const filters = normalizeMimeFilter(mimeType);
		let query = this.db.selectFrom("media").select((eb) => eb.fn.count("id").as("count"));
		if (filters.length > 0) query = query.where((eb) => mimeMatchExpr(eb, filters));
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	applyListFilters(query, options) {
		const mimeFilters = normalizeMimeFilter(options.mimeType);
		if (mimeFilters.length > 0) query = query.where((eb) => mimeMatchExpr(eb, mimeFilters));
		const term = options.q?.trim();
		if (term) {
			const pattern = `%${escapeLike(term)}%`;
			query = query.where(sql`lower(filename)`, "like", sql`lower(${pattern}) escape '\\'`);
		}
		if (options.status !== "all") query = query.where("status", "=", options.status ?? "ready");
		if (options.folderId === null) query = query.where("folder_id", "is", null);
		else if (options.folderId !== void 0) query = query.where("folder_id", "=", options.folderId);
		return query;
	}
	/**
	* Delete pending uploads older than the given age.
	* Pending uploads that were never confirmed indicate abandoned upload flows.
	*
	* Returns the storage keys of deleted rows so callers can remove the
	* corresponding files from object storage.
	*/
	async cleanupPendingUploads(maxAgeMs = 36e5) {
		const cutoff = new Date(Date.now() - maxAgeMs).toISOString();
		const keys = (await this.db.deleteFrom("media").where("status", "=", "pending").where("created_at", "<", cutoff).returning("storage_key").execute()).map((r) => r.storage_key);
		if (keys.length === 0) return keys;
		const stillReferenced = /* @__PURE__ */ new Set();
		for (const batch of chunks(keys, 50)) {
			const refs = await this.db.selectFrom("media").select("storage_key").where("storage_key", "in", batch).execute();
			for (const ref of refs) stillReferenced.add(ref.storage_key);
		}
		return keys.filter((key) => !stillReferenced.has(key));
	}
	/**
	* Convert database row to MediaItem
	*/
	rowToItem(row) {
		const focalPoint = normalizeFocalPoint(row.focal_x, row.focal_y);
		return {
			id: row.id,
			filename: row.filename,
			mimeType: row.mime_type,
			size: row.size,
			width: row.width,
			height: row.height,
			focalX: focalPoint?.focalX ?? null,
			focalY: focalPoint?.focalY ?? null,
			alt: row.alt,
			caption: row.caption,
			storageKey: row.storage_key,
			contentHash: row.content_hash,
			blurhash: row.blurhash,
			dominantColor: row.dominant_color,
			status: row.status,
			createdAt: row.created_at,
			authorId: row.author_id,
			folderId: row.folder_id
		};
	}
};
new TextEncoder();
new TextDecoder("utf-8", { fatal: true });
// node_modules/emdash/src/transfer/errors.ts
/**
* Stable error codes for site transfer (export, analysis, import).
*
* Every code is `SCREAMING_SNAKE_CASE` with the `TRANSFER_` prefix and has a
* fixed HTTP status. `mapErrorStatus` in `api/errors.ts` consults
* {@link transferErrorStatus} first, so handlers can return these codes in an
* `ApiResult` and `unwrapResult` picks the right status.
*/
var TransferErrorCode = {
	TRANSFER_IMPORT_IN_PROGRESS: "TRANSFER_IMPORT_IN_PROGRESS",
	TRANSFER_FENCE_CHECK_FAILED: "TRANSFER_FENCE_CHECK_FAILED",
	TRANSFER_EXPORT_CONCURRENT_WRITES: "TRANSFER_EXPORT_CONCURRENT_WRITES",
	TRANSFER_OPERATION_NOT_FOUND: "TRANSFER_OPERATION_NOT_FOUND",
	TRANSFER_INVALID_STATE: "TRANSFER_INVALID_STATE",
	TRANSFER_LEASE_ACTIVE: "TRANSFER_LEASE_ACTIVE",
	TRANSFER_LEASE_LOST: "TRANSFER_LEASE_LOST",
	TRANSFER_RUNTIME_MISMATCH: "TRANSFER_RUNTIME_MISMATCH",
	TRANSFER_IDEMPOTENCY_CONFLICT: "TRANSFER_IDEMPOTENCY_CONFLICT",
	TRANSFER_TARGET_NOT_EMPTY: "TRANSFER_TARGET_NOT_EMPTY",
	TRANSFER_EXPIRED: "TRANSFER_EXPIRED",
	TRANSFER_MANIFEST_INVALID: "TRANSFER_MANIFEST_INVALID",
	TRANSFER_UNSUPPORTED_FORMAT: "TRANSFER_UNSUPPORTED_FORMAT",
	TRANSFER_UNSUPPORTED_FEATURE: "TRANSFER_UNSUPPORTED_FEATURE",
	TRANSFER_PATH_INVALID: "TRANSFER_PATH_INVALID",
	TRANSFER_FILE_NOT_DECLARED: "TRANSFER_FILE_NOT_DECLARED",
	TRANSFER_FILE_MISSING: "TRANSFER_FILE_MISSING",
	TRANSFER_FILE_SIZE_MISMATCH: "TRANSFER_FILE_SIZE_MISMATCH",
	TRANSFER_FILE_DIGEST_MISMATCH: "TRANSFER_FILE_DIGEST_MISMATCH",
	TRANSFER_CONTAINER_INVALID: "TRANSFER_CONTAINER_INVALID",
	TRANSFER_LIMIT_EXCEEDED: "TRANSFER_LIMIT_EXCEEDED",
	TRANSFER_RECORD_INVALID: "TRANSFER_RECORD_INVALID",
	TRANSFER_REFERENCE_INVALID: "TRANSFER_REFERENCE_INVALID",
	TRANSFER_MEDIA_REF_INVALID: "TRANSFER_MEDIA_REF_INVALID",
	TRANSFER_MEDIA_BLOB_MISSING: "TRANSFER_MEDIA_BLOB_MISSING",
	TRANSFER_SCHEMA_UNCLASSIFIED: "TRANSFER_SCHEMA_UNCLASSIFIED",
	TRANSFER_PACKAGE_DIGEST_MISMATCH: "TRANSFER_PACKAGE_DIGEST_MISMATCH",
	TRANSFER_PLAN_DIGEST_MISMATCH: "TRANSFER_PLAN_DIGEST_MISMATCH",
	TRANSFER_PLAN_BLOCKED: "TRANSFER_PLAN_BLOCKED",
	TRANSFER_DECISIONS_INVALID: "TRANSFER_DECISIONS_INVALID",
	TRANSFER_VERIFICATION_FAILED: "TRANSFER_VERIFICATION_FAILED",
	TRANSFER_APPROVAL_REQUIRED: "TRANSFER_APPROVAL_REQUIRED",
	TRANSFER_APPROVAL_INVALID: "TRANSFER_APPROVAL_INVALID",
	TRANSFER_STORAGE_ERROR: "TRANSFER_STORAGE_ERROR",
	TRANSFER_EXPORT_ERROR: "TRANSFER_EXPORT_ERROR",
	TRANSFER_ANALYZE_ERROR: "TRANSFER_ANALYZE_ERROR",
	TRANSFER_IMPORT_ERROR: "TRANSFER_IMPORT_ERROR"
};
var TRANSFER_ERROR_STATUS = Object.freeze({
	TRANSFER_IMPORT_IN_PROGRESS: 503,
	TRANSFER_FENCE_CHECK_FAILED: 503,
	TRANSFER_EXPORT_CONCURRENT_WRITES: 409,
	TRANSFER_OPERATION_NOT_FOUND: 404,
	TRANSFER_INVALID_STATE: 409,
	TRANSFER_LEASE_ACTIVE: 409,
	TRANSFER_LEASE_LOST: 409,
	TRANSFER_RUNTIME_MISMATCH: 409,
	TRANSFER_IDEMPOTENCY_CONFLICT: 409,
	TRANSFER_TARGET_NOT_EMPTY: 409,
	TRANSFER_EXPIRED: 410,
	TRANSFER_MANIFEST_INVALID: 422,
	TRANSFER_UNSUPPORTED_FORMAT: 422,
	TRANSFER_UNSUPPORTED_FEATURE: 422,
	TRANSFER_PATH_INVALID: 422,
	TRANSFER_FILE_NOT_DECLARED: 422,
	TRANSFER_FILE_MISSING: 422,
	TRANSFER_FILE_SIZE_MISMATCH: 422,
	TRANSFER_FILE_DIGEST_MISMATCH: 422,
	TRANSFER_CONTAINER_INVALID: 422,
	TRANSFER_LIMIT_EXCEEDED: 413,
	TRANSFER_RECORD_INVALID: 422,
	TRANSFER_REFERENCE_INVALID: 422,
	TRANSFER_MEDIA_REF_INVALID: 422,
	TRANSFER_MEDIA_BLOB_MISSING: 422,
	TRANSFER_SCHEMA_UNCLASSIFIED: 500,
	TRANSFER_PACKAGE_DIGEST_MISMATCH: 409,
	TRANSFER_PLAN_DIGEST_MISMATCH: 409,
	TRANSFER_PLAN_BLOCKED: 409,
	TRANSFER_DECISIONS_INVALID: 422,
	TRANSFER_VERIFICATION_FAILED: 422,
	TRANSFER_APPROVAL_REQUIRED: 403,
	TRANSFER_APPROVAL_INVALID: 403,
	TRANSFER_STORAGE_ERROR: 500,
	TRANSFER_EXPORT_ERROR: 500,
	TRANSFER_ANALYZE_ERROR: 500,
	TRANSFER_IMPORT_ERROR: 500
});
z.record(z.string(), z.union([
	z.string(),
	z.number(),
	z.boolean(),
	z.null()
]));
var TransferError = class extends Error {
	code;
	status;
	detail;
	constructor(code, message, options = {}) {
		super(message, options.cause === void 0 ? void 0 : { cause: options.cause });
		this.name = "TransferError";
		this.code = code;
		this.status = TRANSFER_ERROR_STATUS[code];
		this.detail = options.detail;
	}
};
function isTransferError(error) {
	return error instanceof TransferError;
}
({ ...TransferErrorCode });
// node_modules/emdash/src/settings/version.ts
/** Returns the canonical JSON representation of a site-settings revision fingerprint. */
function normalizeSiteSettingsVersion(input) {
	const decoded = JSON.parse(input);
	if (!Array.isArray(decoded)) throw new Error("Invalid site settings version");
	const entries = [];
	for (const entry of decoded) {
		if (!Array.isArray(entry)) throw new Error("Invalid site settings version entry");
		const name = entry[0];
		const revision = entry[1];
		if (typeof name !== "string" || typeof revision !== "string") throw new Error("Invalid site settings version entry");
		entries.push([name, revision]);
	}
	return JSON.stringify(entries.toSorted(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
}
// node_modules/emdash/src/settings/index.ts
/** Object-cache namespace for site settings. */
var SETTINGS_CACHE_NAMESPACE = "settings";
/** Prefix for site settings in the options table */
var SETTINGS_PREFIX = "site:";
var SITE_SETTINGS_CACHE_TTL_MS = 3e4;
var SITE_SETTINGS_CACHE_KEY = Symbol.for("emdash:site-settings:swr");
var g = globalThis;
var settingsCache = g[SITE_SETTINGS_CACHE_KEY] ?? (() => {
	const c = {
		snapshot: null,
		expiresAt: 0,
		generation: 0,
		revalidatingUntil: 0,
		refresh: createSingleFlightCache()
	};
	g[SITE_SETTINGS_CACHE_KEY] = c;
	return c;
})();
/** Discard a snapshot found stale by the route-cache freshness check. @internal */
function invalidateSiteSettingsSnapshot() {
	settingsCache.generation++;
	settingsCache.snapshot = null;
	settingsCache.expiresAt = 0;
	settingsCache.revalidatingUntil = 0;
	invalidateSingleFlightCache(settingsCache.refresh);
}
/**
* Resolve a media reference to include the full URL plus content metadata.
*
* Pulls `mimeType` and intrinsic dimensions from the media row so callers
* can emit correct head tags (e.g. `<link rel="icon" type="image/svg+xml">`,
* which Chromium requires when the URL has no `.svg` extension) without
* a second round-trip to the media table.
*/
async function resolveMediaReference(mediaRef, db, _storage) {
	if (!mediaRef?.mediaId) return mediaRef;
	try {
		const media = await new MediaRepository(db).findById(mediaRef.mediaId);
		if (media) return {
			...mediaRef,
			url: `/_emdash/api/media/file/${media.storageKey}`,
			contentType: media.mimeType,
			...media.width !== null ? { width: media.width } : {},
			...media.height !== null ? { height: media.height } : {}
		};
	} catch {}
	return mediaRef;
}
function refreshSiteSettings() {
	return singleFlightCached(settingsCache.refresh, () => cachedQuery({
		namespace: SETTINGS_CACHE_NAMESPACE,
		key: "snapshot-v1",
		load: async () => loadSiteSettingsSnapshot(await getDb())
	}), {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: 3e4
	});
}
function installSiteSettings(snapshot) {
	settingsCache.snapshot = snapshot;
	settingsCache.expiresAt = Date.now() + SITE_SETTINGS_CACHE_TTL_MS;
}
function revalidateSiteSettings() {
	const now = Date.now();
	if (settingsCache.revalidatingUntil > now) return;
	settingsCache.revalidatingUntil = now + SITE_SETTINGS_CACHE_TTL_MS;
	const generation = ++settingsCache.generation;
	invalidateSingleFlightCache(settingsCache.refresh);
	after(async () => {
		try {
			const snapshot = await refreshSiteSettings();
			if (generation === settingsCache.generation) installSiteSettings(snapshot);
		} catch (error) {
			console.error("[emdash:settings] revalidating site settings failed:", error);
		}
	});
}
async function loadCachedSiteSettings() {
	for (let attempt = 0; attempt < 3; attempt++) {
		const snapshot = settingsCache.snapshot;
		if (snapshot) {
			if (Date.now() >= settingsCache.expiresAt) revalidateSiteSettings();
			return snapshot;
		}
		const generation = settingsCache.generation;
		const loaded = await refreshSiteSettings();
		if (generation === settingsCache.generation) {
			installSiteSettings(loaded);
			return loaded;
		}
		if (attempt === 2) return loaded;
	}
	throw new Error("Site settings refresh exhausted without loading settings");
}
/**
* Get all site settings
*
* Returns all configured settings. Unset values are undefined.
* Media references (logo/favicon) are resolved to include URLs.
*
* @example
* ```ts
* import { getSiteSettings } from "emdash";
*
* const settings = await getSiteSettings();
* console.log(settings.title); // "My Site"
* console.log(settings.logo?.url); // "/_emdash/api/media/file/abc123"
* ```
*/
function getSiteSettings() {
	return requestCached("siteSettings", async () => {
		return (await requestCached("siteSettingsSnapshot", async () => {
			const ctx = getRequestContext();
			const requestSettings = ctx?.siteSettings;
			if (ctx?.routeCacheFill) return loadSiteSettingsSnapshot(await getDb());
			let loaded = requestSettings?.snapshot ?? await loadCachedSiteSettings();
			if (requestSettings?.version !== void 0 && loaded.version !== requestSettings.version) {
				invalidateSiteSettingsSnapshot();
				const generation = settingsCache.generation;
				loaded = await loadSiteSettingsSnapshot(await getDb());
				if (generation === settingsCache.generation) installSiteSettings(loaded);
			}
			return loaded;
		})).data;
	}).then(async (data) => {
		const snapshot = await peekRequestCache("siteSettingsSnapshot");
		if (snapshot) getRequestContext()?.siteSettings?.onRead(snapshot.version);
		return data;
	});
}
/**
* Get all site settings (with explicit db)
*
* @internal Use `getSiteSettings()` in templates. This variant is for admin routes
* that already have a database handle.
*/
async function getSiteSettingsWithDb(db, storage = null) {
	return (await loadSiteSettingsSnapshot(db, storage)).data;
}
async function loadSiteSettingsSnapshot(db, storage = null) {
	const allOptions = await new OptionsRepository(db).getVersionedByPrefix(SETTINGS_PREFIX);
	const version = normalizeSiteSettingsVersion(JSON.stringify([...allOptions].filter(([key]) => key.startsWith(SETTINGS_PREFIX)).map(([key, value]) => [key, value.revision])));
	const settings = {};
	for (const [key, value] of allOptions) {
		const settingKey = key.replace(SETTINGS_PREFIX, "");
		settings[settingKey] = value.value;
	}
	const typedSettings = settings;
	if (typedSettings.logo) typedSettings.logo = await resolveMediaReference(typedSettings.logo, db, storage);
	if (typedSettings.favicon) typedSettings.favicon = await resolveMediaReference(typedSettings.favicon, db, storage);
	if (typedSettings.seo?.defaultOgImage) typedSettings.seo = {
		...typedSettings.seo,
		defaultOgImage: await resolveMediaReference(typedSettings.seo.defaultOgImage, db, storage)
	};
	return {
		data: typedSettings,
		version
	};
}
export { focalPointToObjectPosition as a, isTransferError as i, getSiteSettingsWithDb as n, TransferError as r, getSiteSettings as t };
