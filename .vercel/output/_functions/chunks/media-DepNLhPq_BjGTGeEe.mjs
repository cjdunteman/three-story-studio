import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as normalizeFocalPoint } from "./focal-point-CgCcr1Ca_d0laIeAH.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/media-DepNLhPq.mjs
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
export { MediaRepository as t };
