import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as MediaUsageWorkRepository, t as MediaUsageCollectionDeletionRepository } from "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
// node_modules/emdash/dist/media-usage-work-B2RaoJIa.mjs
async function handleMediaUsageWorkList(db, query) {
	try {
		const page = await new MediaUsageWorkRepository(db).findOperatorPage({
			collectionSlug: query.collection,
			state: query.state,
			cursor: query.cursor,
			limit: query.limit
		});
		if (!page) return {
			success: false,
			error: {
				code: ErrorCode.COLLECTION_NOT_FOUND,
				message: "Collection not found"
			}
		};
		return {
			success: true,
			data: page
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: ErrorCode.INVALID_CURSOR,
				message: "Invalid media usage work cursor"
			}
		};
		console.error("[media-usage-work] list failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_WORK_LIST_ERROR,
				message: "Failed to list media usage work"
			}
		};
	}
}
async function handleMediaUsageCollectionDeletionList(db, query) {
	try {
		return {
			success: true,
			data: await new MediaUsageCollectionDeletionRepository(db).findOperatorPage(query)
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: ErrorCode.INVALID_CURSOR,
				message: "Invalid cursor"
			}
		};
		console.error("[media-usage:collection-deletion] list failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_COLLECTION_DELETION_LIST_ERROR,
				message: "Failed to list collection deletions"
			}
		};
	}
}
async function handleMediaUsageCollectionDeletionRetry(db, input) {
	try {
		const result = await new MediaUsageCollectionDeletionRepository(db).retryOperatorDeletion(input);
		if (result.outcome === "pending") return {
			success: true,
			data: {
				changed: result.changed,
				item: result.item
			}
		};
		if (result.outcome === "lease_active") return {
			success: false,
			error: {
				code: ErrorCode.WORK_LEASE_ACTIVE,
				message: "Collection deletion is currently leased",
				details: { leaseExpiresAt: result.leaseExpiresAt }
			}
		};
		return {
			success: false,
			error: {
				code: result.outcome === "not_found" ? ErrorCode.NOT_FOUND : ErrorCode.WORK_CHANGED,
				message: result.outcome === "not_found" ? "Collection deletion not found" : "Collection deletion changed"
			}
		};
	} catch (error) {
		console.error("[media-usage:collection-deletion] retry failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_COLLECTION_DELETION_RETRY_ERROR,
				message: "Failed to retry collection deletion"
			}
		};
	}
}
async function handleMediaUsageWorkRetry(db, input) {
	try {
		const result = await new MediaUsageWorkRepository(db).retryOperatorWork(input);
		switch (result.outcome) {
			case "pending": return {
				success: true,
				data: {
					changed: result.changed,
					item: result.work
				}
			};
			case "lease_active": return {
				success: false,
				error: {
					code: ErrorCode.WORK_LEASE_ACTIVE,
					message: "Media usage work is currently leased",
					details: { leaseExpiresAt: result.leaseExpiresAt }
				}
			};
			case "collection_not_found": return {
				success: false,
				error: {
					code: ErrorCode.COLLECTION_NOT_FOUND,
					message: "Collection not found"
				}
			};
			case "conflict": return {
				success: false,
				error: {
					code: ErrorCode.WORK_CHANGED,
					message: "Media usage work changed; retry the request"
				}
			};
		}
	} catch (error) {
		console.error("[media-usage-work] retry failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_WORK_RETRY_ERROR,
				message: "Failed to retry media usage work"
			}
		};
	}
}
export { handleMediaUsageWorkRetry as i, handleMediaUsageCollectionDeletionRetry as n, handleMediaUsageWorkList as r, handleMediaUsageCollectionDeletionList as t };
