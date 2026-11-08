import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { b as tableExists } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/fence-Dagicj14.mjs
/**
* The media usage activation fence alone. Write paths use the unified site
* write fence in `transfer/fence.ts`, which falls back to this before the
* transfer tables exist.
*/
async function findMediaUsageActivationWriteFenceError(db) {
	if (!await tableExists(db, "_emdash_media_usage_activation")) return null;
	try {
		if ((await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state === "activating") return {
			code: "MEDIA_USAGE_ACTIVATION_IN_PROGRESS",
			message: "Media usage activation is in progress",
			status: 503
		};
	} catch (error) {
		console.error("[media-usage] Failed to check the activation write fence:", error);
		return {
			code: "MEDIA_USAGE_ACTIVATION_CHECK_FAILED",
			message: "Unable to verify media usage activation state",
			status: 503
		};
	}
	return null;
}
/**
* Unified site write fence: media-usage activation and transfer imports.
*
* One query answers both questions, so a fenced write path pays a single
* round trip. A transfer import fences writes while it executes and, after a
* failure or cancellation once writing started, until it is abandoned. The
* same query reports whether an export is running, so a fenced write can
* bump the export's write epoch without an extra query when none is.
*/
var SiteWriteBlockedError = class extends Error {
	code;
	status;
	operationId;
	constructor(error) {
		super(error.message);
		this.name = error.code;
		this.code = error.code;
		this.status = error.status;
		this.operationId = error.operationId;
	}
};
var CHECK_FAILED = {
	code: "TRANSFER_FENCE_CHECK_FAILED",
	message: "Unable to verify whether site writes are allowed",
	status: 503
};
/** Read both fences and the running-export flag with one query. */
async function readSiteWriteFence(db, scope = {}) {
	const mediaUsage = scope.mediaUsage !== false;
	const transfer = scope.transfer !== false;
	let row;
	try {
		row = (await sql`
			SELECT
				(
					SELECT state FROM _emdash_media_usage_activation
					WHERE task_key = 'incremental_capture'
				) AS media_state,
				(
					SELECT id FROM _emdash_transfer_operations
					WHERE kind = 'import'
						AND (
							state IN ('running', 'verifying')
							OR (state IN ('failed', 'cancelled') AND mutation_started_at IS NOT NULL)
						)
					LIMIT 1
				) AS import_id,
				(
					SELECT id FROM _emdash_transfer_operations
					WHERE kind = 'export' AND state = 'running'
					LIMIT 1
				) AS export_id
		`.execute(db)).rows[0];
	} catch (error) {
		if (isMissingTableError(error)) return {
			error: mediaUsage ? await findMediaUsageActivationWriteFenceError(db) : null,
			exportRunning: false
		};
		console.error("[transfer] Failed to check the site write fence:", error);
		return {
			error: CHECK_FAILED,
			exportRunning: false
		};
	}
	const exportRunning = Boolean(row?.export_id);
	if (transfer && row?.import_id) return {
		error: {
			code: "TRANSFER_IMPORT_IN_PROGRESS",
			message: "A site import is in progress or incomplete; writes are disabled",
			status: 503,
			operationId: row.import_id
		},
		exportRunning
	};
	if (mediaUsage && row?.media_state === "activating") return {
		error: {
			code: "MEDIA_USAGE_ACTIVATION_IN_PROGRESS",
			message: "Media usage activation is in progress",
			status: 503
		},
		exportRunning
	};
	return {
		error: null,
		exportRunning
	};
}
/**
* Tell running exports that a fenced write happened, so their consistency
* fence restarts them. Failures are logged, not thrown: the write itself is
* allowed either way.
*/
async function recordSiteWrite(db) {
	try {
		await bumpRunningExportWriteEpochs(db);
	} catch (error) {
		console.error("[transfer] Failed to record a write for running exports:", error);
	}
}
/** Increments the write epoch of every running export; returns how many there were. */
async function bumpRunningExportWriteEpochs(db) {
	const result = await db.updateTable("_emdash_transfer_operations").set({ write_epoch: sql`write_epoch + 1` }).where("kind", "=", "export").where("state", "=", "running").executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0n);
}
var NOTHING_TO_RECORD = async () => {};
/**
* Throw {@link SiteWriteBlockedError} when a fence blocks writes. Call it
* immediately before the write, and call the returned function once the
* write has succeeded: recording it afterwards means an export whose fence
* was captured while the write ran still sees it.
*/
async function assertSiteWriteAllowed(db) {
	const status = await readSiteWriteFence(db);
	if (status.error) throw new SiteWriteBlockedError(status.error);
	return status.exportRunning ? () => recordSiteWrite(db) : NOTHING_TO_RECORD;
}
/**
* The fence as an API error response, or null when writes are allowed.
* Records nothing: for the plugin lifecycle routes that call it, the fence
* middleware records a successful response's write.
*/
async function checkSiteWriteFence(db) {
	const status = await readSiteWriteFence(db);
	if (status.error) return apiError(status.error.code, status.error.message, status.error.status);
	return null;
}
export { readSiteWriteFence as a, checkSiteWriteFence as i, assertSiteWriteAllowed as n, recordSiteWrite as o, bumpRunningExportWriteEpochs as r, SiteWriteBlockedError as t };
