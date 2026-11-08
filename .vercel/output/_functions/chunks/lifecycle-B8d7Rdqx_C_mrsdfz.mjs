import { n as handlePluginEnable, t as handlePluginDisable } from "./plugins-COJ2L49n_CFcgwXlS.mjs";
import { r as setCronTasksEnabled } from "./cron-D7obTIfk_CTXHi0cN.mjs";
// node_modules/emdash/dist/lifecycle-B8d7Rdqx.mjs
async function enableRuntimePlugin(runtime, pluginId) {
	const result = await handlePluginEnable(runtime.db, runtime.configuredPlugins, runtime.sandboxedPluginEntries, pluginId);
	if (!result.success) return result;
	const source = result.data.item.source;
	if (source === "registry") await runtime.syncRegistryPlugins();
	else if (source === "marketplace") await runtime.syncMarketplacePlugins();
	await runtime.setPluginStatus(pluginId, "active");
	await setCronTasksEnabled(runtime.db, pluginId, true);
	return result;
}
async function disableRuntimePlugin(runtime, pluginId) {
	const result = await handlePluginDisable(runtime.db, runtime.configuredPlugins, runtime.sandboxedPluginEntries, pluginId);
	if (!result.success) return result;
	await runtime.setPluginStatus(pluginId, "inactive");
	await setCronTasksEnabled(runtime.db, pluginId, false);
	return result;
}
export { enableRuntimePlugin as n, disableRuntimePlugin as t };
