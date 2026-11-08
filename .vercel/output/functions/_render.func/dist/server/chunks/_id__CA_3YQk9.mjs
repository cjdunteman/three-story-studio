import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { h as invalidateWidgetObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { i as widgetAreaTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { At as updateWidgetBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as rowToWidget } from "./widgets-BUx_Mf2q_CHnI69LH.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var PUT = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		const body = await parseBody(request, updateWidgetBody);
		if (isParseError(body)) return body;
		const updates = {};
		if (body.title !== void 0) updates.title = body.title || null;
		if (body.type !== void 0) updates.type = body.type;
		if (body.content !== void 0) updates.content = body.content ? JSON.stringify(body.content) : null;
		if (body.menuName !== void 0) updates.menu_name = body.menuName || null;
		if (body.componentId !== void 0) updates.component_id = body.componentId || null;
		if (body.componentProps !== void 0) updates.component_props = body.componentProps ? JSON.stringify(body.componentProps) : null;
		if (Object.keys(updates).length === 0) return apiError("VALIDATION_ERROR", "No fields to update", 400);
		await db.updateTable("_emdash_widgets").set(updates).where("id", "=", id).execute();
		invalidateWidgetObjectCache();
		const widget = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess(rowToWidget(widget));
	} catch (error) {
		return handleError(error, "Failed to update widget", "WIDGET_UPDATE_ERROR");
	}
};
var DELETE = async ({ params, locals, cache }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name, id } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name || !id) return apiError("VALIDATION_ERROR", "name and id are required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		if (!await db.selectFrom("_emdash_widgets").select("id").where("id", "=", id).where("area_id", "=", area.id).executeTakeFirst()) return apiError("NOT_FOUND", `Widget "${id}" not found in area "${name}"`, 404);
		await db.deleteFrom("_emdash_widgets").where("id", "=", id).execute();
		invalidateWidgetObjectCache();
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess({ deleted: true });
	} catch (error) {
		return handleError(error, "Failed to delete widget", "WIDGET_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs
var page = () => _id__exports;
export { page };
