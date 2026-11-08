import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { c as handleMenuList, t as handleMenuCreate } from "./menus-B0Qqv_cS_yKxfszRW.mjs";
import { t as menuTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, r as handleError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { g as localeFilterQuery, t as createMenuBody } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/index.mjs
var menus_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "menus:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		return unwrapResult(await handleMenuList(emdash.db, { locale: query.locale }));
	} catch (error) {
		return handleError(error, "Failed to fetch menus", "MENU_LIST_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createMenuBody);
		if (isParseError(body)) return body;
		const result = await handleMenuCreate(emdash.db, body);
		if (!result.success) return unwrapResult(result, 201);
		await invalidateRouteCache(cache, [menuTag(result.data.name)]);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create menu", "MENU_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/index@_@mjs
var page = () => menus_exports;
export { page };
