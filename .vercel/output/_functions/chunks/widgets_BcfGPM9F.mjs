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
import { W as createWidgetBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as rowToWidget } from "./widgets-BUx_Mf2q_CHnI69LH.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs
var widgets_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const { name } = params;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	if (!name) return apiError("VALIDATION_ERROR", "name is required", 400);
	try {
		const area = await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", name).executeTakeFirst();
		if (!area) return apiError("NOT_FOUND", `Widget area "${name}" not found`, 404);
		const body = await parseBody(request, createWidgetBody);
		if (isParseError(body)) return body;
		const sortOrder = ((await db.selectFrom("_emdash_widgets").select(({ fn }) => fn.max("sort_order").as("maxOrder")).where("area_id", "=", area.id).executeTakeFirst())?.maxOrder ?? -1) + 1;
		const id = ulid();
		await db.insertInto("_emdash_widgets").values({
			id,
			area_id: area.id,
			sort_order: sortOrder,
			type: body.type,
			title: body.title ?? null,
			content: body.content ? JSON.stringify(body.content) : null,
			menu_name: body.menuName ?? null,
			component_id: body.componentId ?? null,
			component_props: body.componentProps ? JSON.stringify(body.componentProps) : null
		}).execute();
		invalidateWidgetObjectCache();
		const widget = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(name)]);
		return apiSuccess(rowToWidget(widget), 201);
	} catch (error) {
		return handleError(error, "Failed to create widget", "WIDGET_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs
var page = () => widgets_exports;
export { page };
