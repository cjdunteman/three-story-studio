import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as localizePath, t as interpolateUrlPattern } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
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
import { t as getCollectionInfoWithDb } from "./query-LmPY2y0C_b7pVy27b.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as parseOptionalBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { w as contentPreviewUrlBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { t as generatePreviewToken } from "./tokens-BnhSnGwJ_CaIsDsD0.mjs";
import { n as getPreviewUrl, t as buildPreviewUrl } from "./preview-DLexxwp3_BIUi85-s.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs
var preview_url_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var DURATION_PATTERN = /^(\d+)([smhdw])$/;
var POST = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "content:read_drafts");
	if (denied) return denied;
	const collection = params.collection;
	const id = params.id;
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	let entryLocale = null;
	let entrySlug = null;
	if (emdash?.handleContentGet) {
		const result = await emdash.handleContentGet(collection, id);
		if (!result.success) return unwrapResult(result);
		entryLocale = result.data?.item?.locale ?? null;
		entrySlug = result.data?.item?.slug ?? null;
	}
	const body = await parseOptionalBody(request, contentPreviewUrlBody, {});
	if (isParseError(body)) return body;
	const expiresIn = body.expiresIn || "1h";
	const explicitPattern = body.pathPattern || null;
	const i18n = getI18nConfig();
	let localeSegment = "";
	if (entryLocale && i18n) localeSegment = entryLocale === i18n.defaultLocale && !i18n.prefixDefaultLocale ? "" : entryLocale;
	else if (entryLocale) localeSegment = entryLocale;
	const expiresInSeconds = typeof expiresIn === "number" ? expiresIn : parseExpiresIn(expiresIn);
	const expiresAt = Math.floor(Date.now() / 1e3) + expiresInSeconds;
	try {
		if (!explicitPattern) {
			let collectionInfo;
			try {
				collectionInfo = await getCollectionInfoWithDb(emdash.db, collection);
			} catch (error) {
				return handleError(error, "Failed to resolve the collection URL pattern", "PREVIEW_URL_ERROR");
			}
			if (collectionInfo?.urlPattern) {
				const path = interpolateUrlPattern({
					pattern: collectionInfo.urlPattern,
					collection,
					slug: entrySlug || id,
					id
				});
				const localized = await localizePath(path, entryLocale ?? "");
				const token = await generatePreviewToken({
					contentId: `${collection}:${id}`,
					expiresIn,
					secret: previewSecret
				});
				return apiSuccess({
					url: buildPreviewUrl({
						path: localized ?? path,
						token
					}),
					expiresAt
				});
			}
		}
		return apiSuccess({
			url: await getPreviewUrl({
				collection,
				id,
				secret: previewSecret,
				expiresIn,
				pathPattern: explicitPattern || "/{collection}/{id}",
				locale: localeSegment
			}),
			expiresAt
		});
	} catch (error) {
		return handleError(error, "Failed to generate preview URL", "TOKEN_ERROR");
	}
};
/**
* Parse duration string to seconds
*/
function parseExpiresIn(duration) {
	const match = duration.match(DURATION_PATTERN);
	if (!match) return 3600;
	const value = parseInt(match[1], 10);
	switch (match[2]) {
		case "s": return value;
		case "m": return value * 60;
		case "h": return value * 60 * 60;
		case "d": return value * 60 * 60 * 24;
		case "w": return value * 60 * 60 * 24 * 7;
		default: return 3600;
	}
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs
var page = () => preview_url_exports;
export { page };
