import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./snapshot-BjaXDZQ5_Dup_vZ0x.mjs";
import { o as isValidArchiveName, r as deleteBackupArchive, t as BACKUP_STORAGE_PREFIX } from "./backup-8rPSJ28a_Cg5Lz2dI.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs
var _name__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const name = params.name ?? "";
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	if (!isValidArchiveName(name)) return apiError("VALIDATION_ERROR", "Invalid archive name", 400);
	try {
		const result = await emdash.storage.download(`${BACKUP_STORAGE_PREFIX}${name}`);
		return new Response(result.body, {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Content-Disposition": `attachment; filename="${name}"`,
				"Cache-Control": "private, no-store",
				"X-Content-Type-Options": "nosniff"
			}
		});
	} catch (error) {
		if (error instanceof Error && error.message.toLowerCase().includes("not found")) return apiError("NOT_FOUND", "Archive not found", 404);
		return handleError(error, "Failed to download archive", ErrorCode.BACKUP_DOWNLOAD_ERROR);
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const name = params.name ?? "";
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	return unwrapResult(await deleteBackupArchive(emdash.storage, name));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_@_@mjs
var page = () => _name__exports;
export { page };
