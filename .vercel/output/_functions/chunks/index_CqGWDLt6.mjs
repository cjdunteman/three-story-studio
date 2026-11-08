import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./snapshot-BjaXDZQ5_Dup_vZ0x.mjs";
import { a as getBackupSettings, l as runBackupToStorage } from "./backup-8rPSJ28a_Cg5Lz2dI.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs
var archives_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "backups:manage");
	if (denied) return denied;
	if (!emdash.storage) return apiError("STORAGE_NOT_CONFIGURED", "No storage backend is configured", 503);
	const settings = await getBackupSettings(emdash.db);
	return unwrapResult(await runBackupToStorage(emdash.db, emdash.storage, settings.retention), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs
var page = () => archives_exports;
export { page };
