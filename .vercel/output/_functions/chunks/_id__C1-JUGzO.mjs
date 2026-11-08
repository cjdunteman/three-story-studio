import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./redirect-DjLdw427_BDBqyEyI.mjs";
import "./cache-5DHbpEWu_CTsWW_zV.mjs";
import "./artifacts-Dvdp2KK-_D_x8kJT9.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { k as updateRedirectBody } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { l as handleRedirectUpdate, o as handleRedirectDelete, s as handleRedirectGet } from "./redirects-Cpq1catN_BZY6zK38.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRedirectSourcePaths } from "./redirect-paths-DOaVBp6E_aBtuxRI8.mjs";
// node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:read");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		return unwrapResult(await handleRedirectGet(db, id));
	} catch (error) {
		return handleError(error, "Failed to fetch redirect", "REDIRECT_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const before = await handleRedirectGet(db, id);
		if (!before.success) return unwrapResult(before);
		const body = await parseBody(request, updateRedirectBody);
		if (isParseError(body)) return body;
		const result = await handleRedirectUpdate(db, id, body);
		if (result.success) await invalidateRedirectSourcePaths(cache, before.data.source, result.data.source);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update redirect", "REDIRECT_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const db = emdash.db;
	const { id } = params;
	const denied = requirePerm(user, "redirects:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "id is required", 400);
	try {
		const before = await handleRedirectGet(db, id);
		if (!before.success) return unwrapResult(before);
		const result = await handleRedirectDelete(db, id);
		if (result.success) await invalidateRedirectSourcePaths(cache, before.data.source);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete redirect", "REDIRECT_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs
var page = () => _id__exports;
export { page };
