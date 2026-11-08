import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { a as handleOAuthClientUpdate, n as handleOAuthClientDelete, r as handleOAuthClientGet } from "./oauth-clients-BT0Pg-MO_C-JAktPh.mjs";
import "./dist_BZHQodRU.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT,
	prerender: () => false
});
var updateClientSchema = z.object({
	name: z.string().min(1).max(255).optional(),
	redirectUris: z.array(z.url("Each redirect URI must be a valid URL")).min(1, "At least one redirect URI is required").optional(),
	scopes: z.array(z.string()).nullable().optional()
});
/**
* Get a single OAuth client.
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const clientId = params.id;
	if (!clientId) return apiError("VALIDATION_ERROR", "Client ID is required", 400);
	return unwrapResult(await handleOAuthClientGet(emdash.db, clientId));
};
/**
* Update an OAuth client.
*/
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const clientId = params.id;
	if (!clientId) return apiError("VALIDATION_ERROR", "Client ID is required", 400);
	try {
		const body = await parseBody(request, updateClientSchema);
		if (isParseError(body)) return body;
		return unwrapResult(await handleOAuthClientUpdate(emdash.db, clientId, body));
	} catch (error) {
		return handleError(error, "Failed to update OAuth client", "CLIENT_UPDATE_ERROR");
	}
};
/**
* Delete an OAuth client.
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const clientId = params.id;
	if (!clientId) return apiError("VALIDATION_ERROR", "Client ID is required", 400);
	try {
		return unwrapResult(await handleOAuthClientDelete(emdash.db, clientId));
	} catch (error) {
		return handleError(error, "Failed to delete OAuth client", "CLIENT_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_@_@mjs
var page = () => _id__exports;
export { page };
