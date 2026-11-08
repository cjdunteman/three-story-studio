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
import { U as createWidgetAreaBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as rowToWidget } from "./widgets-BUx_Mf2q_CHnI69LH.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs
var widget_areas_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:read");
	if (denied) return denied;
	try {
		const areas = await db.selectFrom("_emdash_widget_areas").selectAll().orderBy("name", "asc").execute();
		return apiSuccess({ items: await Promise.all(areas.map(async (area) => {
			const widgets = await db.selectFrom("_emdash_widgets").selectAll().$castTo().where("area_id", "=", area.id).orderBy("sort_order", "asc").execute();
			return {
				...area,
				widgets: widgets.map((row) => rowToWidget(row)),
				widgetCount: widgets.length
			};
		})) });
	} catch (error) {
		return handleError(error, "Failed to fetch widget areas", "WIDGET_AREA_LIST_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	const db = emdash.db;
	const denied = requirePerm(user, "widgets:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, createWidgetAreaBody);
		if (isParseError(body)) return body;
		if (await db.selectFrom("_emdash_widget_areas").select("id").where("name", "=", body.name).executeTakeFirst()) return apiError("CONFLICT", `Widget area with name "${body.name}" already exists`, 409);
		const id = ulid();
		await db.insertInto("_emdash_widget_areas").values({
			id,
			name: body.name,
			label: body.label,
			description: body.description ?? null
		}).execute();
		invalidateWidgetObjectCache();
		const area = await db.selectFrom("_emdash_widget_areas").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
		await invalidateRouteCache(cache, [widgetAreaTag(area.name)]);
		return apiSuccess(area, 201);
	} catch (error) {
		return handleError(error, "Failed to create widget area", "WIDGET_AREA_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs
var page = () => widget_areas_exports;
export { page };
