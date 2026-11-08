import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import { n as siteSettingsTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import { n as handleSettingsUpdate, t as handleSettingsGet } from "./settings--XlUdUaI_Q75SnPNm.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { ft as settingsUpdateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
// node_modules/emdash/dist/astro/routes/api/settings.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* GET /_emdash/api/settings
*
* Returns all site settings as a JSON object.
* Unset values are undefined. Media references include resolved URLs.
*/
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:read");
	if (denied) return denied;
	try {
		return unwrapResult(await handleSettingsGet(emdash.db, emdash.storage));
	} catch (error) {
		return handleError(error, "Failed to get settings", "SETTINGS_READ_ERROR");
	}
};
/**
* POST /_emdash/api/settings
*
* Updates site settings. Accepts a partial settings object.
* Merges with existing settings and returns the updated settings.
*/
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, settingsUpdateBody);
		if (isParseError(body)) return body;
		const result = await handleSettingsUpdate(emdash.db, emdash.storage, body);
		if (!result.success) return unwrapResult(result);
		await invalidateRouteCache(cache, [siteSettingsTag()]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to update settings", "SETTINGS_UPDATE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs
var page = () => settings_exports;
export { page };
