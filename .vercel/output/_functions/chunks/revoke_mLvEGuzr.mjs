import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import "./oauth-user-lookup-BDgF6IVG_BQW973ok.mjs";
import { o as handleTokenRevoke } from "./device-flow-D1U392GC_BGhmkEn-.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs
var revoke_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var revokeSchema = z.object({ token: z.string().min(1) });
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, revokeSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleTokenRevoke(emdash.db, body));
	} catch (error) {
		return handleError(error, "Failed to revoke token", "TOKEN_REVOKE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs
var page = () => revoke_exports;
export { page };
