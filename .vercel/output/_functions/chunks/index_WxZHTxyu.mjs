import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { n as bylineFieldCreateBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { i as handleBylineFieldList, t as handleBylineFieldCreate } from "./byline-fields-D6KYsEa7_XYbp3npz.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs
var byline_fields_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	return unwrapResult(await handleBylineFieldList(emdash.db));
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:manage");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const body = await parseBody(request, bylineFieldCreateBody);
	if (isParseError(body)) return body;
	return unwrapResult(await handleBylineFieldCreate(emdash.db, {
		slug: body.slug,
		label: body.label,
		type: body.type,
		required: body.required,
		translatable: body.translatable,
		validation: body.validation ?? null,
		sortOrder: body.sortOrder
	}), 201);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs
var page = () => byline_fields_exports;
export { page };
