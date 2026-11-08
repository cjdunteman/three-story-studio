import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as getTrustedProxyHeaders } from "./trusted-proxy-BU3Nx9g1_1bp6on4H.mjs";
import { n as getClientIp, t as checkRateLimit } from "./rate-limit-C04Llsoc_CPQmN4kk.mjs";
import { t as handleOAuthClientCreate } from "./oauth-clients-BT0Pg-MO_C-JAktPh.mjs";
// node_modules/emdash/dist/astro/routes/api/oauth/register.mjs
var register_exports = /* @__PURE__ */ __exportAll({
	OPTIONS: () => OPTIONS,
	POST: () => POST,
	prerender: () => false
});
var OAUTH_REGISTRATION_HEADERS = {
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
var SUPPORTED_GRANT_TYPES = /* @__PURE__ */ new Set([
	"authorization_code",
	"refresh_token",
	"urn:ietf:params:oauth:grant-type:device_code"
]);
var SUPPORTED_RESPONSE_TYPES = /* @__PURE__ */ new Set(["code"]);
function registrationError(description, status = 400, error = "invalid_client_metadata") {
	return Response.json({
		error,
		error_description: description
	}, {
		status,
		headers: OAUTH_REGISTRATION_HEADERS
	});
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isStringArray(value) {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function parseScope(value) {
	if (value === void 0) return void 0;
	if (typeof value === "string") {
		const scopes = value.split(" ").filter(Boolean);
		return scopes.length > 0 ? scopes : void 0;
	}
	if (isStringArray(value)) {
		const scopes = value.filter(Boolean);
		return scopes.length > 0 ? scopes : void 0;
	}
	return registrationError("scope must be a string or array of strings");
}
function parseSupportedStringArray(value, field, supported) {
	if (value === void 0) return void 0;
	if (!isStringArray(value)) return registrationError(`${field} must be an array of strings`);
	const invalidValue = value.find((item) => !supported.has(item));
	if (invalidValue) return registrationError(`${field} contains unsupported value: ${invalidValue}`);
	return value;
}
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
		let body;
		try {
			body = await request.json();
		} catch {
			return registrationError("Request body must be valid JSON");
		}
		if (!isRecord(body)) return registrationError("Request body must be a JSON object");
		if (!isStringArray(body.redirect_uris) || body.redirect_uris.length === 0) return registrationError("redirect_uris must be a non-empty array of strings");
		if (body.token_endpoint_auth_method !== void 0 && body.token_endpoint_auth_method !== "none") return registrationError("Only token_endpoint_auth_method=none is supported");
		const grantTypes = parseSupportedStringArray(body.grant_types, "grant_types", SUPPORTED_GRANT_TYPES);
		if (grantTypes instanceof Response) return grantTypes;
		const responseTypes = parseSupportedStringArray(body.response_types, "response_types", SUPPORTED_RESPONSE_TYPES);
		if (responseTypes instanceof Response) return responseTypes;
		const scopes = parseScope(body.scope);
		if (scopes instanceof Response) return scopes;
		const ip = getClientIp(request, getTrustedProxyHeaders(emdash.config));
		if (!(await checkRateLimit(emdash.db, ip, "oauth/register", 10, 60)).allowed) {
			const response = registrationError("Too many registration requests. Please try again later.", 429, "temporarily_unavailable");
			response.headers.set("Retry-After", "60");
			return response;
		}
		const clientId = crypto.randomUUID();
		const clientName = typeof body.client_name === "string" && body.client_name ? body.client_name : `dynamic-${clientId.slice(0, 8)}`;
		const result = await handleOAuthClientCreate(emdash.db, {
			id: clientId,
			name: clientName,
			redirectUris: body.redirect_uris,
			scopes
		});
		if (!result.success) return registrationError(result.error.message);
		return Response.json({
			client_id: result.data.id,
			client_id_issued_at: Math.floor(new Date(result.data.createdAt).getTime() / 1e3),
			redirect_uris: result.data.redirectUris,
			client_name: result.data.name,
			grant_types: grantTypes ?? ["authorization_code", "refresh_token"],
			response_types: responseTypes ?? ["code"],
			token_endpoint_auth_method: "none",
			scope: result.data.scopes ? result.data.scopes.join(" ") : void 0
		}, {
			status: 201,
			headers: OAUTH_REGISTRATION_HEADERS
		});
	} catch (error) {
		return handleError(error, "Failed to register OAuth client", "CLIENT_REGISTER_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/register@_@mjs
var page = () => register_exports;
export { page };
