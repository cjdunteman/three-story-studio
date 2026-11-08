import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import "./staged-ByBmPFtX_FQ60UOHq.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import "./registry-B0-O575m_BFXFyFwY.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./block-values-Dg0-8PPS_DG_24WSy.mjs";
import "./query-LmPY2y0C_b7pVy27b.mjs";
import "./schema-BqBlUZtb_YfhNDbeT.mjs";
import { l as handleRelationUpdate, o as handleRelationDelete, s as handleRelationGet } from "./relations-WIOojTL4_CqEbuQSZ.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { Et as updateRelationBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PATCH: () => PATCH,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		return unwrapResult(await handleRelationGet(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to get relation", "RELATION_GET_ERROR");
	}
};
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		const body = await parseBody(request, updateRelationBody);
		if (isParseError(body)) return body;
		return unwrapResult(await handleRelationUpdate(emdash.db, id, body));
	} catch (error) {
		return handleError(error, "Failed to update relation", "RELATION_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	if (!id) return apiError("VALIDATION_ERROR", "Relation id required", 400);
	try {
		return unwrapResult(await handleRelationDelete(emdash.db, id));
	} catch (error) {
		return handleError(error, "Failed to delete relation", "RELATION_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/_id_/index@_@mjs
var page = () => _id__exports;
export { page };
