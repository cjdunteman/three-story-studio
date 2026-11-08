import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import "./oauth-user-lookup-BDgF6IVG_BQW973ok.mjs";
import { a as handleTokenRefresh } from "./device-flow-D1U392GC_BGhmkEn-.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs
var refresh_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var refreshSchema = z.object({
	refresh_token: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, refreshSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRefresh(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to refresh token", "TOKEN_REFRESH_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs
var page = () => refresh_exports;
export { page };
