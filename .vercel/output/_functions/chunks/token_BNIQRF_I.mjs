import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-BU3Nx9g1_1bp6on4H.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { n as getClientIp, r as rateLimitResponse, t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import "./oauth-user-lookup-BDgF6IVG_BQW973ok.mjs";
import { i as handleDeviceTokenExchange } from "./device-flow-D1U392GC_BGhmkEn-.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs
var token_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var deviceTokenSchema = z.object({
	device_code: z.string().min(1),
	grant_type: z.string().min(1)
});
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseBody(request, deviceTokenSchema);
		if (isParseError(body)) return body;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "device/token", 12, 60)).allowed) return rateLimitResponse(60);
		const result = await handleDeviceTokenExchange(emdash.db, body);
		if (!result.success && result.deviceFlowError) {
			const errorBody = { error: result.deviceFlowError };
			if (result.deviceFlowInterval !== void 0) errorBody.interval = result.deviceFlowInterval;
			return Response.json(errorBody, {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
					Pragma: "no-cache"
				}
			});
		}
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to exchange device code", "TOKEN_EXCHANGE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs
var page = () => token_exports;
export { page };
