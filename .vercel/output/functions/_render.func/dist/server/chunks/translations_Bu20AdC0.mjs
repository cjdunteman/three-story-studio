import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { r as taxonomyTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { f as handleTermTranslations, l as handleTermGet, s as handleTermCreate } from "./taxonomies-5SR76j11_BpsROtKh.mjs";
import { i as parseQuery, n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { g as localeFilterQuery } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs
var translations_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var createTermTranslationBody = z.object({
	locale: z.string().min(1),
	label: z.string().min(1).optional(),
	slug: z.string().min(1).optional()
}).meta({ id: "CreateTermTranslationBody" });
var GET = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:read");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const anchor = await handleTermGet(emdash.db, name, slug, { locale: query.locale });
		if (!anchor.success) return unwrapResult(anchor);
		return unwrapResult(await handleTermTranslations(emdash.db, anchor.data.term.id));
	} catch (error) {
		return handleError(error, "Failed to list term translations", "TERM_TRANSLATIONS_ERROR");
	}
};
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { name, slug } = params;
	if (!name || !slug) return apiError("VALIDATION_ERROR", "Taxonomy name and slug required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "taxonomies:manage");
	if (denied) return denied;
	const query = parseQuery(new URL(request.url), localeFilterQuery);
	if (isParseError(query)) return query;
	try {
		const body = await parseBody(request, createTermTranslationBody);
		if (isParseError(body)) return body;
		const source = await handleTermGet(emdash.db, name, slug, { locale: query.locale });
		if (!source.success) return unwrapResult(source);
		const result = await handleTermCreate(emdash.db, name, {
			slug: body.slug ?? source.data.term.slug,
			label: body.label ?? source.data.term.label,
			parentId: source.data.term.parentId,
			description: source.data.term.description,
			locale: body.locale,
			translationOf: source.data.term.id
		});
		if (!result.success) return unwrapResult(result, 201);
		await invalidateRouteCache(cache, [taxonomyTag(name)]);
		return unwrapResult(result, 201);
	} catch (error) {
		return handleError(error, "Failed to create term translation", "TERM_TRANSLATION_CREATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations@_@mjs
var page = () => translations_exports;
export { page };
