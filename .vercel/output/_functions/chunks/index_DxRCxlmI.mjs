import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { b as resolveConfiguredLocale, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
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
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { s as bylineCreateBody, u as bylinesListQuery } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./credits-BKREepht_BTl2HLL3.mjs";
import "./bylines-f_ZEc6Sn_DAxvCrSG.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { n as handleBylineCreate } from "./bylines-Bsg5cH4S_Doo6VLtC.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs
var bylines_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:read");
	if (denied) return denied;
	const query = parseQuery(url, bylinesListQuery);
	if (isParseError(query)) return query;
	const locale = query.locale ? resolveConfiguredLocale(query.locale) : void 0;
	const i18n = getI18nConfig();
	if (locale && i18n && !i18n.locales.includes(locale)) return apiError("VALIDATION_ERROR", `Locale "${locale}" is not configured for this site`, 400);
	try {
		return apiSuccess(await new BylineRepository(emdash.db).findMany({
			search: query.search,
			isGuest: query.isGuest,
			userId: query.userId,
			locale,
			cursor: query.cursor,
			limit: query.limit
		}));
	} catch (error) {
		return handleError(error, "Failed to list bylines", "BYLINE_LIST_ERROR");
	}
};
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "bylines:manage");
	if (denied) return denied;
	const body = await parseBody(request, bylineCreateBody);
	if (isParseError(body)) return body;
	try {
		const result = await handleBylineCreate(emdash.db, {
			slug: body.slug,
			displayName: body.displayName,
			bio: body.bio ?? null,
			avatarMediaId: body.avatarMediaId ?? null,
			websiteUrl: body.websiteUrl ?? null,
			userId: body.userId,
			isGuest: body.isGuest,
			locale: body.locale,
			translationOf: body.translationOf,
			customFields: body.customFields
		});
		if (result.success) {
			const byline = result.data;
			after(() => emdash.hooks.runBylineAfterSave(byline, true));
		}
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create byline", "BYLINE_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs
var page = () => bylines_exports;
export { page };
