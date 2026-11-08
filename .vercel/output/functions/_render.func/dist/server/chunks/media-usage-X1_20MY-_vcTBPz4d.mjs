import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { s as getMediaUsageActivationStatus, t as MediaUsageActivationVersionMismatchError } from "./activation-CGlyigmg_D6-z5nIo.mjs";
import { c as MediaUsageRepository, n as CONTENT_MEDIA_USAGE_ADAPTER_ID, r as CONTENT_MEDIA_USAGE_COLLECTION_SCOPE, z as runMediaUsageMaintenanceStep } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as repairContentMediaUsageCollection, t as repairContentMediaUsageAll } from "./content-repair-Ukdxoq-R_ntNtEF9u.mjs";
import { n as MEDIA_USAGE_SITE_SETTING_OPTIONS, r as groupSiteSettingMediaUsage } from "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
// node_modules/emdash/dist/media-usage-X1_20MY-.mjs
var media_usage_exports = /* @__PURE__ */ __exportAll({
	aggregateMediaUsageCoverageStatus: () => aggregateMediaUsageCoverageStatus,
	handleMediaUsageDetails: () => handleMediaUsageDetails,
	handleMediaUsageProgress: () => handleMediaUsageProgress,
	handleMediaUsageProgressAdvance: () => handleMediaUsageProgressAdvance,
	handleMediaUsageRepair: () => handleMediaUsageRepair,
	handleMediaUsageSummaries: () => handleMediaUsageSummaries,
	toMediaUsageRepairResponse: () => toMediaUsageRepairResponse
});
async function handleMediaUsageProgress(db) {
	try {
		const progress = await new MediaUsageRepository(db).findCollectionProgress();
		if (!progress) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_NOT_ACTIVE,
				message: "Media Usage is not active"
			}
		};
		return {
			success: true,
			data: progress
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media Usage activation version does not match this runtime"
			}
		};
		console.error("[media-usage] progress read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_READ_ERROR,
				message: "Failed to read media usage progress"
			}
		};
	}
}
async function handleMediaUsageProgressAdvance(db) {
	try {
		const step = await runMediaUsageMaintenanceStep(db);
		const activation = await getMediaUsageActivationStatus(db);
		if (activation.state === "expanded") return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_NOT_ACTIVE,
				message: "Media Usage activation has not started"
			}
		};
		const progress = activation.state === "active" ? await new MediaUsageRepository(db).findCollectionProgress() : null;
		return {
			success: true,
			data: {
				activation,
				progress,
				nextRequestInMs: continuationDelayMs(step.continuation, progress)
			}
		};
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_ACTIVATION_VERSION_MISMATCH,
				message: "Media Usage activation version does not match this runtime"
			}
		};
		console.error("[media-usage] progress advance failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_PROGRESS_ADVANCE_ERROR,
				message: "Failed to advance media usage progress"
			}
		};
	}
}
function continuationDelayMs(continuation, progress) {
	if (progress?.status === "needs_attention") return null;
	if (continuation.kind === "immediate") return 0;
	if (continuation.kind === "delayed") return 3e4;
	if (progress?.status === "indexing") return 0;
	return null;
}
function aggregateMediaUsageCoverageStatus(scopes) {
	const statuses = scopes.map(normalizeMediaUsageCoverageStatus);
	if (statuses.every((status) => status === "complete")) return "complete";
	if (statuses.includes("unknown")) return "unknown";
	if (statuses.includes("running")) return "running";
	if (statuses.includes("stale")) return "stale";
	if (statuses.includes("partial")) return "partial";
	if (statuses.every((status) => status === "never")) return "never";
	if (statuses.every((status) => status === "failed")) return "failed";
	return "partial";
}
async function handleMediaUsageSummaries(db, mediaIds, options) {
	if (mediaIds.length === 0) return {
		success: true,
		data: {}
	};
	try {
		const repository = new MediaUsageRepository(db);
		const { coverage, siteSettings } = await loadMediaUsageCoverage(repository);
		const counts = options.includeCount && coverage.status === "complete" ? await repository.findActiveEntryCountsByMediaIds(mediaIds) : null;
		const summaries = {};
		for (const mediaId of new Set(mediaIds)) summaries[mediaId] = {
			count: counts ? (counts.get(mediaId) ?? 0) + (siteSettings.get(mediaId)?.length ?? 0) : null,
			coverage
		};
		return {
			success: true,
			data: summaries
		};
	} catch (error) {
		console.error("[media-usage] summary read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_READ_ERROR,
				message: "Failed to read media usage"
			}
		};
	}
}
async function handleMediaUsageDetails(db, mediaId, options) {
	try {
		if (!await new MediaRepository(db).findById(mediaId)) return {
			success: false,
			error: {
				code: ErrorCode.NOT_FOUND,
				message: `Media item not found: ${mediaId}`
			}
		};
		const repository = new MediaUsageRepository(db);
		const { coverage, siteSettings } = await loadMediaUsageCoverage(repository);
		const page = await repository.findCurrentEntryUsagePageByMediaId(mediaId, options);
		return {
			success: true,
			data: {
				items: page.items.map(toMediaUsageEntryDetail),
				...page.nextCursor ? { nextCursor: page.nextCursor } : {},
				siteSettings: (siteSettings.get(mediaId) ?? []).map((setting) => ({ setting })),
				coverage
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: ErrorCode.INVALID_CURSOR,
				message: error.message
			}
		};
		console.error("[media-usage] detail read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_READ_ERROR,
				message: "Failed to read media usage"
			}
		};
	}
}
async function handleMediaUsageRepair(db, input) {
	try {
		let result;
		if (input.scope === "collection") result = await repairContentMediaUsageCollection(db, { collectionSlug: input.collection });
		else if (input.scope === "all") result = await repairContentMediaUsageAll(db);
		else return {
			success: false,
			error: {
				code: ErrorCode.VALIDATION_ERROR,
				message: "Invalid media usage repair request"
			}
		};
		return {
			success: true,
			data: toMediaUsageRepairResponse(result)
		};
	} catch (error) {
		console.error("[media-usage] repair failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.MEDIA_USAGE_REPAIR_ERROR,
				message: "Failed to repair media usage"
			}
		};
	}
}
function toMediaUsageRepairResponse(result) {
	const collections = "collections" in result ? result.collections : [result];
	return {
		status: result.status,
		indexedSourceCount: result.indexedSourceCount,
		failedSourceCount: result.failedSourceCount,
		skippedSourceCount: result.skippedSourceCount,
		deletedSourceCount: result.deletedSourceCount,
		collections: collections.map(toMediaUsageRepairCollectionSummary)
	};
}
function toMediaUsageRepairCollectionSummary(result) {
	return {
		collection: result.scope.scopeKey,
		status: result.status,
		indexedSourceCount: result.indexedSourceCount,
		failedSourceCount: result.failedSourceCount,
		skippedSourceCount: result.skippedSourceCount,
		deletedSourceCount: result.deletedSourceCount,
		lastErrorCode: result.lastErrorCode,
		startedAt: result.startedAt,
		completedAt: result.completedAt
	};
}
function normalizeMediaUsageCoverageStatus(scope) {
	if (scope.status === null) return "never";
	if (scope.status === "complete") {
		if (scope.reconciliationRequired) return "stale";
		return scope.schemaVersion === 2 ? "complete" : "stale";
	}
	if (scope.status === "never" || scope.status === "running" || scope.status === "partial" || scope.status === "failed" || scope.status === "stale") return scope.status;
	return "unknown";
}
async function loadMediaUsageCoverage(repository) {
	const { scopes, options } = await repository.findCoverageWithOptions({
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE
	}, MEDIA_USAGE_SITE_SETTING_OPTIONS);
	return {
		coverage: {
			scope: "all_content_collections",
			status: aggregateMediaUsageCoverageStatus(scopes)
		},
		siteSettings: groupSiteSettingMediaUsage(options)
	};
}
function toMediaUsageEntryDetail(group) {
	const preferred = group.sources.find(({ source }) => source.sourceVariant === "draft_overlay") ?? group.sources.find(({ source }) => source.sourceVariant === "columns");
	if (!preferred) throw new Error("Media usage entry has no supported source");
	return {
		collection: group.collectionSlug,
		contentId: group.contentId,
		title: preferred.source.contentTitle,
		slug: preferred.source.contentSlug,
		locale: preferred.source.locale,
		status: preferred.source.contentStatus,
		scheduledAt: preferred.source.contentScheduledAt,
		deletedAt: group.contentDeletedAt,
		sources: group.sources.flatMap(({ source, occurrences }) => {
			if (source.sourceVariant !== "columns" && source.sourceVariant !== "draft_overlay") return [];
			return [{
				variant: source.sourceVariant,
				occurrences: occurrences.map((occurrence) => ({
					fieldSlug: occurrence.fieldSlug,
					fieldPath: occurrence.fieldPath,
					occurrenceIndex: occurrence.occurrenceIndex,
					referenceType: normalizeMediaUsageReferenceType(occurrence.referenceType)
				}))
			}];
		})
	};
}
function normalizeMediaUsageReferenceType(referenceType) {
	if (referenceType === "image_field" || referenceType === "file_field" || referenceType === "portable_text_image" || referenceType === "portable_text_video") return referenceType;
	return "unknown";
}
export { handleMediaUsageSummaries as a, handleMediaUsageRepair as i, handleMediaUsageProgress as n, media_usage_exports as o, handleMediaUsageProgressAdvance as r, handleMediaUsageDetails as t };
