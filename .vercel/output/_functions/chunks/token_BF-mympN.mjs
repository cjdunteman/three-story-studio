import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as OAuthErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import "./oauth-user-lookup-BDgF6IVG_BQW973ok.mjs";
import { r as handleAuthorizationCodeExchange } from "./oauth-authorization-CPLgBrdo_BfU1ysKM.mjs";
import { a as handleTokenRefresh, i as handleDeviceTokenExchange } from "./device-flow-D1U392GC_BGhmkEn-.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/oauth/token.mjs
var token_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST,
	prerender: () => false
});
/**
* Parse the request body from either form-encoded or JSON.
* OAuth 2.1 mandates form-encoded, but we accept both.
*/
async function parseTokenBody(request) {
	if ((request.headers.get("content-type") ?? "").includes("application/x-www-form-urlencoded")) {
		const text = await request.text();
		const params = new URLSearchParams(text);
		const result = {};
		for (const [key, value] of params) result[key] = value;
		return result;
	}
	try {
		const json = Object(await request.json());
		const result = {};
		for (const [key, value] of Object.entries(json)) if (typeof value === "string") result[key] = value;
		else if (typeof value === "number") result[key] = String(value);
		return result;
	} catch {
		return {};
	}
}
var authCodeSchema = z.object({
	grant_type: z.literal("authorization_code"),
	code: z.string().min(1),
	redirect_uri: z.string().min(1),
	client_id: z.string().min(1),
	code_verifier: z.string().min(43).max(128),
	resource: z.string().optional()
});
var deviceCodeSchema = z.object({
	grant_type: z.literal("urn:ietf:params:oauth:grant-type:device_code"),
	device_code: z.string().min(1)
});
var refreshSchema = z.object({
	grant_type: z.literal("refresh_token"),
	refresh_token: z.string().min(1)
});
var OPTIONS = () => {
	return new Response(null, {
		status: 204,
		headers: OAUTH_PREFLIGHT_HEADERS
	});
};
var POST = async ({ request, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const body = await parseTokenBody(request);
		const grantType = body.grant_type;
		if (!grantType) return oauthError("invalid_request", "grant_type is required", 400);
		switch (grantType) {
			case "authorization_code": {
				const parsed = authCodeSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleAuthorizationCodeExchange(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			case "urn:ietf:params:oauth:grant-type:device_code": {
				const parsed = deviceCodeSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleDeviceTokenExchange(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					if (result.deviceFlowError) return oauthError(result.deviceFlowError, err.message, 400);
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			case "refresh_token": {
				const parsed = refreshSchema.safeParse(body);
				if (!parsed.success) return oauthError("invalid_request", formatZodError(parsed.error), 400);
				const result = await handleTokenRefresh(emdash.db, parsed.data);
				if (!result.success) {
					const err = result.error ?? {
						code: "unknown",
						message: "Unknown error"
					};
					return oauthError(err.code, err.message, 400);
				}
				return oauthSuccess(result.data);
			}
			default: return oauthError("unsupported_grant_type", `Unsupported grant_type: ${grantType}`, 400);
		}
	} catch (error) {
		return handleError(error, "Failed to process token request", "TOKEN_ERROR");
	}
};
/** RFC 6749 §5.1 requires Cache-Control: no-store and Pragma: no-cache on token responses */
var OAUTH_TOKEN_HEADERS = {
	"Content-Type": "application/json",
	"Cache-Control": "no-store",
	Pragma: "no-cache",
	"Access-Control-Allow-Origin": "*"
};
var OAUTH_PREFLIGHT_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Max-Age": "86400"
};
function oauthSuccess(data) {
	return Response.json(data, { headers: OAUTH_TOKEN_HEADERS });
}
function oauthError(error, description, status) {
	return Response.json({
		error: error === "INVALID_GRANT" ? OAuthErrorCode.INVALID_GRANT : error,
		error_description: description
	}, {
		status,
		headers: OAUTH_TOKEN_HEADERS
	});
}
function formatZodError(error) {
	return error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token@_@mjs
var page = () => token_exports;
export { page };
