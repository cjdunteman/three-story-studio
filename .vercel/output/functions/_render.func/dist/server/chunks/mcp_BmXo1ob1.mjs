import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as PluginStateRepository } from "./state-CFbGZziM_KXas5_hl.mjs";
import { n as apiSuccess, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs
var mcp_exports = /* @__PURE__ */ __exportAll({
	PUT: () => PUT,
	prerender: () => false
});
var bodySchema = z.object({ enabled: z.boolean() });
var PUT = async ({ params, request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:manage");
	if (denied) return denied;
	if (!params.id) return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	const parsed = await parseBody(request, bodySchema);
	if (parsed instanceof Response) return parsed;
	const tools = await emdash.getPluginMcpTools(params.id);
	if (parsed.enabled && tools.length === 0) return apiError("NO_MCP_TOOLS", "Plugin does not declare MCP tools", 400);
	const stateRepo = new PluginStateRepository(emdash.db);
	const existing = await stateRepo.get(params.id);
	const configuredVersion = emdash.configuredPlugins.find((plugin) => plugin.id === params.id)?.version ?? emdash.sandboxedPluginEntries.find((plugin) => plugin.id === params.id)?.version;
	const version = existing?.version ?? configuredVersion;
	if (!version) return apiError("NOT_FOUND", "Plugin not found", 404);
	const consent = parsed.enabled ? emdash.serializePluginMcpConsent(tools, params.id) : null;
	return apiSuccess({
		enabled: (await stateRepo.upsert(params.id, version, existing?.status ?? "active", {
			mcpToolsEnabled: parsed.enabled,
			mcpToolsConsent: consent
		})).mcpToolsEnabled,
		tools: tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool)
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp@_@mjs
var page = () => mcp_exports;
export { page };
