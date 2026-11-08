import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import "./dist-BUmWMTbN_CDkCCJct.mjs";
import { t as enrichImageMetadata } from "./enrich-DFlfnd3u_DIfIr-b4.mjs";
import { n as computeContentHash, t as MAX_CONTENT_HASH_BYTES } from "./hash-BJaeek87_BXspnfEZ.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Ut as mediaConfirmBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs
var confirm_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* Max raw bytes to buffer for server-side LQIP generation at confirm time. The
* signed-URL upload flow exists so large files bypass server buffering — re-reading
* the whole object into a Worker's 128 MB heap to compute a blurhash would OOM
* on the very uploads that flow was designed for. LQIP is progressive
* enhancement: large images simply ship without a server-generated placeholder.
*/
var MAX_PLACEHOLDER_DOWNLOAD_BYTES = MAX_CONTENT_HASH_BYTES;
/**
* Add URL to media item (relative URL for portability)
*/
function addUrlToMedia(item) {
	return {
		...item,
		url: `/_emdash/api/media/file/${item.storageKey}`
	};
}
async function cancelDownload(download) {
	try {
		await download.body.cancel();
	} catch (error) {
		console.error("[media] confirm download cancellation failed:", error);
	}
}
async function forgetUploadAttempt(repo, storageKey) {
	try {
		await repo.deleteUploadAttempt(storageKey);
	} catch (error) {
		console.error("[media] confirm upload attempt cleanup failed:", error);
	}
}
async function confirmationConflict(repo, id) {
	const current = await repo.findById(id);
	if (!current) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
	if (current.status === "ready") {
		await forgetUploadAttempt(repo, current.storageKey);
		return apiSuccess({ item: addUrlToMedia(current) });
	}
	if (current.status === "pending") return apiError("INVALID_STATE", "Media item changed during confirmation", 409);
	return apiError("INVALID_STATE", `Media item is not pending: ${current.status}`, 400);
}
async function consumeDownload(download) {
	const reader = download.body.getReader();
	try {
		const bytes = new Uint8Array(download.size);
		let receivedSize = 0;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (receivedSize + value.byteLength > bytes.byteLength) throw new Error("Stored file exceeds its reported size");
			bytes.set(value, receivedSize);
			receivedSize += value.byteLength;
		}
		if (receivedSize !== download.size) throw new Error("Stored file size does not match its reported size");
		return bytes;
	} catch (error) {
		try {
			await reader.cancel(error);
		} catch (cancelError) {
			console.error("[media] confirm download cancellation failed:", cancelError);
		}
		throw error;
	} finally {
		reader.releaseLock();
	}
}
/**
* Confirm upload completion
*/
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const denied = requirePerm(user, "media:upload");
	if (denied) return denied;
	if (!id) return apiError("INVALID_REQUEST", "Media ID is required", 400);
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseOptionalBody(request, mediaConfirmBody, {});
		if (isParseError(body)) return body;
		const repo = new MediaRepository(emdash.db);
		const existing = await repo.findById(id);
		if (!existing) return apiError("NOT_FOUND", `Media item not found: ${id}`, 404);
		const ownerDenied = requireOwnerPerm(user, existing.authorId ?? "", "media:upload", "media:edit_any");
		if (ownerDenied) return ownerDenied;
		if (existing.status === "ready") {
			await forgetUploadAttempt(repo, existing.storageKey);
			return apiSuccess({ item: addUrlToMedia(existing) });
		}
		if (existing.status !== "pending") return apiError("INVALID_STATE", `Media item is not pending: ${existing.status}`, 400);
		if (body.size !== void 0 && existing.size !== null && body.size !== existing.size) return apiError("UPLOAD_SIZE_MISMATCH", "Confirmed size does not match the pending media item", 400);
		let confirmedSize = existing.size ?? body.size;
		let contentHash = existing.contentHash;
		let imageBytes;
		if (emdash.storage) {
			if (!await emdash.storage.exists(existing.storageKey)) {
				if (!await repo.markFailed(id, existing.storageKey)) return await confirmationConflict(repo, id);
				return apiError("FILE_NOT_FOUND", "File was not uploaded to storage", 400);
			}
			const storedFile = await emdash.storage.download(existing.storageKey);
			if (confirmedSize !== void 0 && storedFile.size !== confirmedSize) {
				await cancelDownload(storedFile);
				return apiError("UPLOAD_SIZE_MISMATCH", "Stored file size does not match the pending media item", 400);
			}
			confirmedSize = storedFile.size;
			const isImage = existing.mimeType.startsWith("image/");
			const canBuffer = storedFile.size <= MAX_PLACEHOLDER_DOWNLOAD_BYTES;
			const hasServerHash = contentHash !== null && await repo.hasUploadAttempt(existing.storageKey);
			if (canBuffer && (isImage || !hasServerHash)) {
				const bytes = await consumeDownload(storedFile);
				contentHash = bytes.byteLength > 0 ? await computeContentHash(bytes) : null;
				if (isImage && bytes.byteLength > 0) imageBytes = bytes;
			} else {
				if (!hasServerHash) contentHash = null;
				await cancelDownload(storedFile);
			}
			if (isImage && !canBuffer) console.warn(`[media] confirm skipping placeholder: object ${existing.storageKey} reported size ${storedFile.size} bytes (> ${MAX_PLACEHOLDER_DOWNLOAD_BYTES})`);
		}
		let blurhash;
		let dominantColor;
		let width = body.width;
		let height = body.height;
		if (imageBytes) try {
			const enriched = await enrichImageMetadata(imageBytes, existing.mimeType, { knownDimensions: body.width != null && body.height != null ? {
				width: body.width,
				height: body.height
			} : void 0 });
			blurhash = enriched.blurhash;
			dominantColor = enriched.dominantColor;
			width = width ?? enriched.width;
			height = height ?? enriched.height;
		} catch (error) {
			console.error("[media] confirm placeholder generation failed:", error);
		}
		const item = await repo.confirmUpload(id, {
			size: confirmedSize,
			width,
			height,
			blurhash,
			dominantColor,
			contentHash
		}, existing.storageKey);
		if (!item) return await confirmationConflict(repo, id);
		await forgetUploadAttempt(repo, item.storageKey);
		const itemWithUrl = addUrlToMedia(item);
		if (emdash.hooks?.hasHooks("media:afterUpload")) after(async () => {
			try {
				await emdash.hooks.runMediaAfterUpload({
					id: itemWithUrl.id,
					filename: itemWithUrl.filename,
					mimeType: itemWithUrl.mimeType,
					size: itemWithUrl.size,
					url: itemWithUrl.url,
					createdAt: itemWithUrl.createdAt
				});
			} catch (error) {
				console.error("[media] afterUpload hook failed:", error);
			}
		});
		return apiSuccess({ item: itemWithUrl });
	} catch (error) {
		return handleError(error, "Failed to confirm upload", "CONFIRM_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs
var page = () => confirm_exports;
export { page };
