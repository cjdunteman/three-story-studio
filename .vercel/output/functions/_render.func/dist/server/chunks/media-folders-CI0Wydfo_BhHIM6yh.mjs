import { a as InvalidCursorError, i as EmDashValidationError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/media-folders-CI0Wydfo.mjs
function escapeLike(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
function normalizeFolderSearch(value) {
	return value.trim().normalize("NFKC").toLowerCase();
}
function normalizeFolderName(name) {
	if (typeof name !== "string") throw new EmDashValidationError("Folder name must be a string");
	const trimmed = name.trim();
	if (trimmed.length < 1 || trimmed.length > 200) throw new EmDashValidationError("Folder name must be between 1 and 200 characters");
	return {
		name: trimmed,
		nameKey: trimmed.normalize("NFKC").toLowerCase()
	};
}
var MediaFolderRepository = class {
	constructor(db) {
		this.db = db;
	}
	async findMany(options = {}) {
		const limit = Math.max(1, Math.min(options.limit ?? 50, 100));
		let query = this.db.selectFrom("media_folders").select([
			"id",
			"name",
			"name_key"
		]).orderBy("name_key", "asc").orderBy("id", "asc").limit(limit + 1);
		const term = normalizeFolderSearch(options.q ?? "");
		if (term) {
			const pattern = `%${escapeLike(term)}%`;
			query = query.where("name_key", "like", sql`${pattern} escape '\\'`);
		}
		if (options.cursor !== void 0) {
			const { orderValue: nameKey, id } = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("name_key", ">", nameKey), eb.and([eb("name_key", "=", nameKey), eb("id", ">", id)])]));
		}
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const visible = rows.slice(0, limit);
		return {
			items: visible.map(({ id, name }) => ({
				id,
				name
			})),
			nextCursor: hasMore && visible.length > 0 ? encodeCursor(visible.at(-1).name_key, visible.at(-1).id) : void 0
		};
	}
	async findById(id) {
		return await this.db.selectFrom("media_folders").select(["id", "name"]).where("id", "=", id).executeTakeFirst() ?? null;
	}
	async create(inputName) {
		const { name, nameKey } = normalizeFolderName(inputName);
		return await this.db.insertInto("media_folders").values({
			id: ulid(),
			name,
			name_key: nameKey
		}).returning(["id", "name"]).executeTakeFirstOrThrow();
	}
	async update(id, inputName) {
		const { name, nameKey } = normalizeFolderName(inputName);
		return await this.db.updateTable("media_folders").set({
			name,
			name_key: nameKey
		}).where("id", "=", id).returning(["id", "name"]).executeTakeFirst() ?? null;
	}
	async delete(id) {
		return await this.db.deleteFrom("media_folders").where("id", "=", id).returning("id").executeTakeFirst() !== void 0;
	}
};
var UNIQUE_VIOLATION_RE = /unique constraint failed|duplicate key value violates unique constraint/i;
async function handleMediaFolderList(db, options = {}) {
	try {
		return {
			success: true,
			data: await new MediaFolderRepository(db).findMany(options)
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MEDIA_FOLDER_LIST_ERROR",
				message: "Failed to list media folders"
			}
		};
	}
}
async function handleMediaFolderGet(db, id) {
	try {
		const item = await new MediaFolderRepository(db).findById(id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Media folder not found"
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_FOLDER_GET_ERROR",
				message: "Failed to get media folder"
			}
		};
	}
}
async function handleMediaFolderCreate(db, input) {
	try {
		return {
			success: true,
			data: { item: await new MediaFolderRepository(db).create(input.name) }
		};
	} catch (error) {
		return mediaFolderWriteError(error, "MEDIA_FOLDER_CREATE_ERROR", "Failed to create media folder");
	}
}
async function handleMediaFolderUpdate(db, id, input) {
	try {
		const item = await new MediaFolderRepository(db).update(id, input.name);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Media folder not found"
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		return mediaFolderWriteError(error, "MEDIA_FOLDER_UPDATE_ERROR", "Failed to update media folder");
	}
}
async function handleMediaFolderDelete(db, id) {
	try {
		if (!await new MediaFolderRepository(db).delete(id)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Media folder not found"
			}
		};
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_FOLDER_DELETE_ERROR",
				message: "Failed to delete media folder"
			}
		};
	}
}
function mediaFolderWriteError(error, code, message) {
	if (error instanceof EmDashValidationError) return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: error.message
		}
	};
	if (isUniqueViolation(error)) return {
		success: false,
		error: {
			code: "CONFLICT",
			message: "A media folder with this name already exists"
		}
	};
	return {
		success: false,
		error: {
			code,
			message
		}
	};
}
function isUniqueViolation(error) {
	if (error && typeof error === "object") {
		if ("code" in error && error.code === "23505") return true;
	}
	const message = error instanceof Error ? error.message : "";
	if (UNIQUE_VIOLATION_RE.test(message)) return true;
	return Boolean(error && typeof error === "object" && "cause" in error && isUniqueViolation(error.cause));
}
export { handleMediaFolderUpdate as a, handleMediaFolderList as i, handleMediaFolderDelete as n, handleMediaFolderGet as r, handleMediaFolderCreate as t };
