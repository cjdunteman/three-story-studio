import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { l as bylineUpdateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./credits-BKREepht_BTl2HLL3.mjs";
import "./bylines-f_ZEc6Sn_DAxvCrSG.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { i as handleBylineUpdate } from "./bylines-Bsg5cH4S_Doo6VLtC.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const byline = await new BylineRepository(emdash.db).findById(params.id);
		if (!byline) return apiError("NOT_FOUND", "Byline not found", 404);
		return apiSuccess(byline);
	} catch (error) {
		return handleError(error, "Failed to get byline", "BYLINE_GET_ERROR");
	}
};
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const body = await parseBody(request, bylineUpdateBody);
	if (isParseError(body)) return body;
	const result = await handleBylineUpdate(emdash.db, params.id, {
		slug: body.slug,
		displayName: body.displayName,
		bio: body.bio ?? null,
		avatarMediaId: body.avatarMediaId ?? null,
		websiteUrl: body.websiteUrl ?? null,
		userId: body.userId ?? null,
		isGuest: body.isGuest,
		customFields: body.customFields
	});
	if (result.success) {
		const byline = result.data;
		after(() => emdash.hooks.runBylineAfterSave(byline, false));
	}
	return unwrapResult(result);
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const repo = new BylineRepository(emdash.db);
		const existing = emdash.hooks.hasHooks("byline:afterDelete") ? await repo.findById(params.id) : null;
		if (!await repo.delete(params.id)) return apiError("NOT_FOUND", "Byline not found", 404);
		if (existing) after(() => emdash.hooks.runBylineAfterDelete(existing));
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete byline", "BYLINE_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs
var page = () => _id__exports;
export { page };
