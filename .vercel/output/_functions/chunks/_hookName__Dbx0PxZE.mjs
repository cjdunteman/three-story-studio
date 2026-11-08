import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs
var _hookName__exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
/** Hook name format: namespace:action (e.g., "content:beforeSave") */
var HOOK_NAME_RE = /^[a-z]+:[a-zA-Z]+$/;
var setSelectionSchema = z.object({ pluginId: z.string().min(1).nullable() });
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;
	const hookName = params.hookName;
	if (!hookName) return apiError("VALIDATION_ERROR", "Hook name is required", 400);
	if (!HOOK_NAME_RE.test(hookName)) return apiError("VALIDATION_ERROR", "Invalid hook name format", 400);
	try {
		const pipeline = emdash.hooks;
		if (!pipeline.isExclusiveHook(hookName)) return apiError("NOT_FOUND", `Hook '${hookName}' is not a registered exclusive hook`, 404);
		const body = await parseBody(request, setSelectionSchema);
		if (isParseError(body)) return body;
		const optionsRepo = new OptionsRepository(emdash.db);
		const optionKey = `emdash:exclusive_hook:${hookName}`;
		if (body.pluginId === null) {
			await optionsRepo.delete(optionKey);
			pipeline.clearExclusiveSelection(hookName);
		} else {
			if (!pipeline.getExclusiveHookProviders(hookName).some((p) => p.pluginId === body.pluginId)) return apiError("VALIDATION_ERROR", `Plugin '${body.pluginId}' is not a provider for hook '${hookName}'`, 400);
			await optionsRepo.set(optionKey, body.pluginId);
			pipeline.setExclusiveSelection(hookName, body.pluginId);
		}
		return apiSuccess({
			hookName,
			selectedPluginId: body.pluginId
		});
	} catch (error) {
		return handleError(error, "Failed to set exclusive hook selection", "EXCLUSIVE_HOOK_SET_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_@_@mjs
var page = () => _hookName__exports;
export { page };
