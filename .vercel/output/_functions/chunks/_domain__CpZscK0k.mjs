import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { n as roleFromLevel, t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { r as allowedDomainUpdateBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs
var _domain__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	prerender: () => false
});
/**
* PATCH - Update domain settings
*/
var PATCH = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	const { domain } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!domain) return apiError("VALIDATION_ERROR", "Domain is required", 400);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		const body = await parseBody(request, allowedDomainUpdateBody);
		if (isParseError(body)) return body;
		const existing = await adapter.getAllowedDomain(domain);
		if (!existing) return apiError("NOT_FOUND", "Domain not found", 404);
		const defaultRole = body.defaultRole;
		const enabled = body.enabled ?? existing.enabled;
		await adapter.updateAllowedDomain(domain, enabled, defaultRole);
		const updated = await adapter.getAllowedDomain(domain);
		return apiSuccess({
			success: true,
			domain: updated ? {
				domain: updated.domain,
				defaultRole: updated.defaultRole,
				roleName: roleFromLevel(updated.defaultRole),
				enabled: updated.enabled,
				createdAt: updated.createdAt.toISOString()
			} : null
		});
	} catch (error) {
		return handleError(error, "Failed to update allowed domain", "DOMAIN_UPDATE_ERROR");
	}
};
/**
* DELETE - Remove an allowed domain
*/
var DELETE = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { domain } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "Database not configured", 500);
	if (!domain) return apiError("VALIDATION_ERROR", "Domain is required", 400);
	if (!user || user.role < Role.ADMIN) return apiError("FORBIDDEN", "Admin privileges required", 403);
	const adapter = createKyselyAdapter(emdash.db);
	try {
		if (!await adapter.getAllowedDomain(domain)) return apiError("NOT_FOUND", "Domain not found", 404);
		await adapter.deleteAllowedDomain(domain);
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to delete allowed domain", "DOMAIN_DELETE_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_@_@mjs
var page = () => _domain__exports;
export { page };
