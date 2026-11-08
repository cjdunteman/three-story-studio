import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { a as handleMenuItemDelete, s as handleMenuItemUpdate } from "./menus-B0Qqv_cS_yKxfszRW.mjs";
import { t as menuTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { g as localeFilterQuery, l as updateMenuItemBody } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const body = await parseBody(request, updateMenuItemBody);
		if (isParseError(body)) return body;
		const result = await handleMenuItemUpdate(emdash.db, name, itemId, body, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update menu item", "MENU_ITEM_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const name = params.name;
	const itemId = params.id;
	const denied = requirePerm(user, "menus:manage");
	if (denied) return denied;
	if (!itemId) return apiError("VALIDATION_ERROR", "id is required", 400);
	const localeQ = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(localeQ)) return localeQ;
	try {
		const result = await handleMenuItemDelete(emdash.db, name, itemId, { locale: localeQ.locale });
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [menuTag(name)]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to delete menu item", "MENU_ITEM_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs
var page = () => _id__exports;
export { page };
