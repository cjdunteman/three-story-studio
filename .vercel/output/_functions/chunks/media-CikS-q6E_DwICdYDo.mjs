import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as isValidFocalPointUpdate } from "./focal-point-CgCcr1Ca_d0laIeAH.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as removeUploadAttempt } from "./upload-attempts-DPFC4COv_BSG4R4En.mjs";
// node_modules/emdash/dist/media-CikS-q6E.mjs
var FOREIGN_KEY_VIOLATION_RE = /foreign key constraint failed/i;
/**
* List media items
*/
async function handleMediaList(db, params) {
	try {
		if (params.page !== void 0) {
			const limit = Math.max(1, Math.min(params.limit || 50, 100));
			const offset = (params.page - 1) * limit;
			if (params.cursor !== void 0 || !Number.isSafeInteger(params.page) || params.page < 1 || !Number.isSafeInteger(offset)) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid media page"
				}
			};
			return {
				success: true,
				data: await new MediaRepository(db).findPage({
					page: params.page,
					limit,
					mimeType: params.mimeType,
					q: params.q,
					folderId: params.folderId
				})
			};
		}
		const result = await new MediaRepository(db).findMany({
			cursor: params.cursor,
			limit: Math.max(1, Math.min(params.limit || 50, 100)),
			mimeType: params.mimeType,
			q: params.q,
			folderId: params.folderId
		});
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor
			}
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
				code: "MEDIA_LIST_ERROR",
				message: "Failed to list media"
			}
		};
	}
}
/**
* Get single media item
*/
async function handleMediaGet(db, id) {
	try {
		const item = await new MediaRepository(db).findById(id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
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
				code: "MEDIA_GET_ERROR",
				message: "Failed to get media"
			}
		};
	}
}
/**
* Create media item (after file upload)
*/
async function handleMediaCreate(db, input) {
	try {
		return {
			success: true,
			data: { item: await new MediaRepository(db).create(input) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_CREATE_ERROR",
				message: "Failed to create media"
			}
		};
	}
}
/**
* Confirm an upload minted by the signed upload URL endpoint.
*
* The storage key must belong to a pending media row created for the same
* user; arbitrary keys never reach storage this way.
*/
async function handleMediaRegisterUpload(db, storage, input) {
	const invalidKey = {
		success: false,
		error: {
			code: "INVALID_STORAGE_KEY",
			message: "storageKey does not match a pending upload created for this user; request a signed upload URL first"
		}
	};
	try {
		const repo = new MediaRepository(db);
		const pending = await repo.findPendingByStorageKey(input.storageKey);
		if (!pending) return invalidKey;
		if ((pending.authorId ?? null) !== (input.authorId ?? null)) return invalidKey;
		if (pending.size === null) return {
			success: false,
			error: {
				code: "INVALID_STATE",
				message: "Pending upload has no expected size"
			}
		};
		if (!await storage.exists(input.storageKey)) return {
			success: false,
			error: {
				code: "FILE_NOT_FOUND",
				message: "File was not uploaded to storage"
			}
		};
		const storedFile = await storage.download(input.storageKey);
		try {
			if (storedFile.size !== pending.size) return {
				success: false,
				error: {
					code: "UPLOAD_SIZE_MISMATCH",
					message: "Stored file size does not match the pending upload"
				}
			};
		} finally {
			try {
				await storedFile.body.cancel();
			} catch (error) {
				console.error("[media] upload confirmation cancellation failed:", error);
			}
		}
		const item = await repo.confirmUpload(pending.id, void 0, input.storageKey);
		if (!item) return invalidKey;
		try {
			await repo.deleteUploadAttempt(input.storageKey);
		} catch (error) {
			console.error("[media] upload attempt cleanup failed:", error);
		}
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_REGISTER_ERROR",
				message: "Failed to register the upload"
			}
		};
	}
}
/**
* Update media metadata
*/
async function handleMediaUpdate(db, id, input) {
	if (!isValidFocalPointUpdate(input)) return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: "focalX and focalY must both be valid numbers or both be null"
		}
	};
	try {
		const item = await new MediaRepository(db).update(id, input);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (isForeignKeyViolation(error)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Media folder not found"
			}
		};
		return {
			success: false,
			error: {
				code: "MEDIA_UPDATE_ERROR",
				message: "Failed to update media"
			}
		};
	}
}
async function handleMediaReplaceMetadata(db, id, expectedStorageKey, input) {
	try {
		const item = await new MediaRepository(db).replaceReadyFile(id, expectedStorageKey, input);
		if (!item) return {
			success: false,
			error: {
				code: "MEDIA_REPLACE_METADATA_ERROR",
				message: "Failed to update replaced media metadata"
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
				code: "MEDIA_REPLACE_METADATA_ERROR",
				message: "Failed to update replaced media metadata"
			}
		};
	}
}
function isForeignKeyViolation(error) {
	if (error && typeof error === "object") {
		if ("code" in error && error.code === "23503") return true;
	}
	const message = error instanceof Error ? error.message : "";
	if (FOREIGN_KEY_VIOLATION_RE.test(message)) return true;
	return Boolean(error && typeof error === "object" && "cause" in error && isForeignKeyViolation(error.cause));
}
/** Delete a media item, then delete or queue cleanup of its stored object. */
async function handleMediaDelete(db, id, storage) {
	try {
		const repo = new MediaRepository(db);
		const notFound = {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Media item not found: ${id}`
			}
		};
		const media = await repo.findById(id);
		if (!media) return notFound;
		if (storage) await repo.trackStorageKeyForCleanup(media.id, media.storageKey);
		const storageKey = await repo.deleteWithStorageKey(id);
		if (!storageKey) return notFound;
		let storageDeleted = false;
		if (storage) if (await repo.isStorageKeyReferenced(storageKey)) await repo.deleteUploadAttempt(storageKey);
		else storageDeleted = await removeUploadAttempt(storage, repo, storageKey, { allowUntracked: true });
		return {
			success: true,
			data: {
				deleted: true,
				storageKey,
				storageDeleted
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MEDIA_DELETE_ERROR",
				message: "Failed to delete media"
			}
		};
	}
}
export { handleMediaRegisterUpload as a, handleMediaList as i, handleMediaDelete as n, handleMediaReplaceMetadata as o, handleMediaGet as r, handleMediaUpdate as s, handleMediaCreate as t };
