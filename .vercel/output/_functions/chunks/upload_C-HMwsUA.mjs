import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { n as normalizeMime } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { n as computeContentHash } from "./hash-BJaeek87_BXspnfEZ.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as removeUploadAttempt } from "./upload-attempts-DPFC4COv_BSG4R4En.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs
var upload_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var INITIAL_HASH_BUFFER_BYTES = 65536;
var UploadBodyError = class extends Error {
	code;
	constructor(code) {
		super(code);
		this.code = code;
	}
};
function findUploadBodyError(error) {
	let current = error;
	for (let depth = 0; depth < 5 && current instanceof Error; depth++) {
		if (current instanceof UploadBodyError) return current;
		current = current.cause;
	}
	return null;
}
function preserveKnownLength(body, expectedLength) {
	if (typeof FixedLengthStream === "undefined") return body;
	return body.pipeThrough(new FixedLengthStream(expectedLength));
}
function createUploadAttemptKey(key) {
	const pathSeparator = key.lastIndexOf("/");
	const extensionSeparator = key.lastIndexOf(".");
	if (extensionSeparator > pathSeparator) return `${key.slice(0, extensionSeparator)}.${ulid()}${key.slice(extensionSeparator)}`;
	return `${key}.${ulid()}`;
}
async function getStoredSize(storage, key) {
	if (!await storage.exists(key)) return null;
	const download = await storage.download(key);
	try {
		return download.size;
	} finally {
		try {
			await download.body.cancel();
		} catch (error) {
			console.error("[media] upload download cancellation failed:", error);
		}
	}
}
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID is required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!emdash.storage) return apiError("NO_STORAGE", "Storage not configured", 500);
	try {
		const repo = new MediaRepository(emdash.db);
		const media = await repo.findById(id);
		if (!media) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
		if (media.status !== "pending") return apiError("INVALID_STATE", `Media item is not pending: ${media.status}`, 400);
		const ownerDenied = requireOwnerPerm(user, media.authorId ?? "", "media:upload", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		if (!Number.isSafeInteger(media.size) || media.size === null || media.size < 0) return apiError("INVALID_STATE", "Pending media item has no valid upload size", 400);
		const expectedSize = media.size;
		const contentType = request.headers.get("Content-Type");
		if (!contentType || normalizeMime(contentType) !== media.mimeType) return apiError("INVALID_TYPE", "Upload content type does not match the media item", 400);
		const requestBody = request.body ?? (expectedSize === 0 ? new ReadableStream({ start(controller) {
			controller.close();
		} }) : null);
		if (!requestBody) return apiError("NO_FILE", "No file provided", 400);
		const contentLength = request.headers.get("Content-Length");
		if (contentLength !== null) {
			const declaredSize = Number(contentLength);
			if (!Number.isSafeInteger(declaredSize) || declaredSize < 0) return apiError("INVALID_REQUEST", "Invalid Content-Length header", 400);
			if (declaredSize > expectedSize) return apiError("PAYLOAD_TOO_LARGE", "Upload exceeds the expected size", 413);
			if (declaredSize !== expectedSize) return apiError("UPLOAD_SIZE_MISMATCH", "Upload size does not match the media item", 400);
		}
		let receivedSize = 0;
		const shouldHash = expectedSize > 0 && expectedSize <= 8388608;
		let hashBytes = null;
		const body = preserveKnownLength(requestBody.pipeThrough(new TransformStream({
			transform(chunk, controller) {
				const offset = receivedSize;
				receivedSize += chunk.byteLength;
				if (receivedSize > expectedSize) {
					controller.error(new UploadBodyError("PAYLOAD_TOO_LARGE"));
					return;
				}
				if (shouldHash && chunk.byteLength > 0) {
					if (!hashBytes) hashBytes = new Uint8Array(Math.min(expectedSize, Math.max(INITIAL_HASH_BUFFER_BYTES, receivedSize)));
					else if (receivedSize > hashBytes.byteLength) {
						const grown = new Uint8Array(Math.min(expectedSize, Math.max(receivedSize, hashBytes.byteLength * 2)));
						grown.set(hashBytes);
						hashBytes = grown;
					}
					hashBytes.set(chunk, offset);
				}
				controller.enqueue(chunk);
			},
			flush(controller) {
				if (receivedSize !== expectedSize) controller.error(new UploadBodyError("UPLOAD_SIZE_MISMATCH"));
			}
		})), expectedSize);
		const attemptKey = createUploadAttemptKey(media.storageKey);
		await repo.createUploadAttempt(id, attemptKey);
		let attemptSize;
		try {
			attemptSize = (await emdash.storage.upload({
				key: attemptKey,
				body,
				contentType: media.mimeType
			})).size;
		} catch (error) {
			await removeUploadAttempt(emdash.storage, repo, attemptKey);
			const bodyError = findUploadBodyError(error);
			if (bodyError?.code === "PAYLOAD_TOO_LARGE") return apiError("PAYLOAD_TOO_LARGE", "Upload exceeds the expected size", 413);
			if (bodyError?.code === "UPLOAD_SIZE_MISMATCH") return apiError("UPLOAD_SIZE_MISMATCH", "Upload size does not match the media item", 400);
			return handleError(error, "Upload failed", "UPLOAD_ERROR");
		}
		if (receivedSize !== expectedSize || attemptSize !== expectedSize) {
			await removeUploadAttempt(emdash.storage, repo, attemptKey);
			return apiError("UPLOAD_SIZE_MISMATCH", "Upload size does not match the media item", 400);
		}
		const contentHash = hashBytes ? await computeContentHash(hashBytes) : void 0;
		let published;
		try {
			published = await repo.publishPendingStorageKey(id, media.storageKey, attemptKey, contentHash);
		} catch (error) {
			try {
				const current = await repo.findById(id);
				if (current?.storageKey === attemptKey && (current.status === "pending" || current.status === "ready") && current.size === expectedSize && await getStoredSize(emdash.storage, attemptKey) === expectedSize) return apiSuccess({
					uploaded: true,
					size: expectedSize
				});
			} catch (verificationError) {
				console.error("[media] upload publication verification failed:", verificationError);
			}
			return handleError(error, "Upload failed", "UPLOAD_ERROR");
		}
		if (!published) {
			const current = await repo.findById(id);
			if (current && (current.status === "pending" || current.status === "ready") && current.size === expectedSize && (current.storageKey === attemptKey || expectedSize === 0 || contentHash !== void 0 && current.contentHash === contentHash) && await getStoredSize(emdash.storage, current.storageKey) === expectedSize) {
				if (current.storageKey !== attemptKey) await removeUploadAttempt(emdash.storage, repo, attemptKey);
				return apiSuccess({
					uploaded: true,
					size: expectedSize
				});
			}
			await removeUploadAttempt(emdash.storage, repo, attemptKey);
			return apiError("INVALID_STATE", "Media item is no longer pending", 400);
		}
		await removeUploadAttempt(emdash.storage, repo, media.storageKey);
		return apiSuccess({
			uploaded: true,
			size: receivedSize
		});
	} catch (error) {
		return handleError(error, "Upload failed", "UPLOAD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/upload@_@mjs
var page = () => upload_exports;
export { page };
