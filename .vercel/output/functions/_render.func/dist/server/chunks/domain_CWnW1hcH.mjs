import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import { n as siteSettingsTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as unwrapResult, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { t as getConfiguredOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { t as getChosenSiteOrigin } from "./site-url-MB685I5X_Cn8dOqct.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { n as handleSiteDomainChange } from "./site-domain-oRGS_JfA_1cPYEXHU.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/settings/domain.mjs
var domain_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var siteDomainBody = z.object({ domain: z.string().min(1).max(253) });
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:read");
	if (denied) return denied;
	try {
		const siteOrigin = await getChosenSiteOrigin(emdash.db, emdash.config) ?? null;
		return apiSuccess({
			configuredUrl: getConfiguredOrigin(emdash.config) ?? null,
			siteOrigin
		});
	} catch (error) {
		return handleError(error, "Failed to read the site domain", "SITE_DOMAIN_ERROR");
	}
};
var POST = async ({ request, locals, cache }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	try {
		const body = await parseBody(request, siteDomainBody);
		if (isParseError(body)) return body;
		const result = await handleSiteDomainChange(emdash.db, body.domain);
		if (result.success) await invalidateRouteCache(cache, [siteSettingsTag()]);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to change the site domain", "SITE_DOMAIN_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain@_@mjs
var page = () => domain_exports;
export { page };
