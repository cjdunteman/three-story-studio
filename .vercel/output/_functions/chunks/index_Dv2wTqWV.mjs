import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./snapshot-BjaXDZQ5_Dup_vZ0x.mjs";
import { a as getBackupSettings, s as listBackupArchives, u as updateBackupSettings } from "./backup-8rPSJ28a_Cg5Lz2dI.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs
var backups_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	try {
		const settings = await getBackupSettings(emdash.db);
		let archives = [];
		const storageAvailable = !!emdash.storage;
		if (emdash.storage) {
			const listed = await listBackupArchives(emdash.storage);
			if (listed.success) archives = listed.data;
		}
		return apiSuccess({
			settings,
			archives,
			storageAvailable
		});
	} catch (error) {
		return handleError(error, "Failed to load backup settings", ErrorCode.BACKUP_SETTINGS_READ_ERROR);
	}
};
var settingsBody = z.object({
	enabled: z.boolean(),
	retention: z.number().int().min(1).max(30)
});
var PUT = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	const body = await parseBody(request, settingsBody);
	if (isParseError(body)) return body;
	return unwrapResult(await updateBackupSettings(emdash.db, body));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs
var page = () => backups_exports;
export { page };
