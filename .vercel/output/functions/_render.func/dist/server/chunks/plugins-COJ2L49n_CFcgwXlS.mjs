import { t as PluginStateRepository } from "./state-CFbGZziM_KXas5_hl.mjs";
// node_modules/emdash/dist/plugins-COJ2L49n.mjs
function marketplaceIconUrl(marketplaceUrl, pluginId) {
	return `${marketplaceUrl}/api/v1/plugins/${encodeURIComponent(pluginId)}/icon`;
}
/**
* Get plugin info from configured plugin and database state
*/
function buildPluginInfo(plugin, state, marketplaceUrl) {
	const status = state?.status ?? "active";
	const enabled = status === "active";
	const isMarketplace = (state?.source ?? "config") === "marketplace";
	return {
		id: plugin.id,
		name: state?.displayName || plugin.id,
		version: plugin.version,
		package: void 0,
		enabled,
		status,
		source: state?.source ?? "config",
		marketplaceVersion: state?.marketplaceVersion ?? void 0,
		registryPublisherDid: state?.registryPublisherDid ?? void 0,
		registrySlug: state?.registrySlug ?? void 0,
		capabilities: plugin.capabilities,
		hasAdminPages: (plugin.admin.pages?.length ?? 0) > 0,
		hasDashboardWidgets: (plugin.admin.widgets?.length ?? 0) > 0,
		hasHooks: Object.keys(plugin.hooks ?? {}).length > 0,
		hasSettings: Object.keys(plugin.admin.settingsSchema ?? {}).length > 0,
		installedAt: state?.installedAt?.toISOString(),
		activatedAt: state?.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state?.deactivatedAt?.toISOString() ?? void 0,
		description: state?.description ?? void 0,
		iconUrl: isMarketplace && marketplaceUrl ? marketplaceIconUrl(marketplaceUrl, plugin.id) : void 0,
		mcpToolsEnabled: state?.mcpToolsEnabled ?? false,
		mcpTools: Object.entries(plugin.mcp?.tools ?? {}).flatMap(([name, tool]) => {
			const permission = plugin.routes[tool.route]?.permission;
			return permission ? [{
				name,
				description: tool.description,
				route: tool.route,
				permission,
				destructive: tool.destructive ?? false
			}] : [];
		})
	};
}
/**
* Build plugin info for a statically-sandboxed plugin entry
*/
function buildSandboxedPluginInfo(entry, state) {
	const status = state?.status ?? "active";
	const enabled = status === "active";
	return {
		id: entry.id,
		name: state?.displayName || entry.id,
		version: entry.version,
		package: void 0,
		enabled,
		status,
		source: "config",
		sandboxed: true,
		capabilities: entry.capabilities,
		hasAdminPages: (entry.adminPages?.length ?? 0) > 0,
		hasDashboardWidgets: (entry.adminWidgets?.length ?? 0) > 0,
		hasHooks: false,
		hasSettings: Object.keys(entry.settingsSchema ?? {}).length > 0,
		installedAt: state?.installedAt?.toISOString(),
		activatedAt: state?.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state?.deactivatedAt?.toISOString() ?? void 0,
		description: state?.description ?? void 0,
		mcpToolsEnabled: state?.mcpToolsEnabled ?? false,
		mcpTools: entry.mcp?.tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool) ?? []
	};
}
/**
* List all configured plugins with their state
*/
async function handlePluginList(db, configuredPlugins, sandboxedPluginEntries, marketplaceUrl, runtimeSettingsSchemaLookup) {
	try {
		const allStates = await new PluginStateRepository(db).getAll();
		const stateMap = new Map(allStates.map((s) => [s.pluginId, s]));
		const configuredIds = new Set(configuredPlugins.map((p) => p.id));
		const items = configuredPlugins.map((plugin) => {
			return buildPluginInfo(plugin, stateMap.get(plugin.id) ?? null, marketplaceUrl);
		});
		for (const entry of sandboxedPluginEntries) {
			if (configuredIds.has(entry.id)) continue;
			configuredIds.add(entry.id);
			items.push(buildSandboxedPluginInfo(entry, stateMap.get(entry.id) ?? null));
		}
		for (const state of allStates) {
			if (state.source !== "marketplace" && state.source !== "registry") continue;
			if (configuredIds.has(state.pluginId)) continue;
			items.push(buildStateOnlyPluginInfo(state, marketplaceUrl, runtimeSettingsSchemaLookup));
		}
		return {
			success: true,
			data: { items }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_LIST_ERROR",
				message: "Failed to list plugins"
			}
		};
	}
}
/**
* Get a single plugin's info
*/
async function handlePluginGet(db, configuredPlugins, sandboxedPluginEntries, pluginId, marketplaceUrl, runtimeSettingsSchemaLookup) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.get(pluginId), marketplaceUrl) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.get(pluginId)) }
		};
		const state = await stateRepo.get(pluginId);
		if (state && (state.source === "marketplace" || state.source === "registry")) return {
			success: true,
			data: { item: buildStateOnlyPluginInfo(state, marketplaceUrl, runtimeSettingsSchemaLookup) }
		};
		return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_GET_ERROR",
				message: "Failed to get plugin"
			}
		};
	}
}
/**
* Build a minimal `PluginInfo` for a plugin that exists only as a
* `_plugin_state` row (marketplace or registry install), with no
* matching `configuredPlugins` entry. Runtime-installed plugins don't
* have ResolvedPlugin metadata until they're loaded into the sandbox,
* so the list, single-plugin, and enable/disable responses surface the
* state-row view as a stable shape the admin UI already understands.
*/
function buildStateOnlyPluginInfo(state, marketplaceUrl, runtimeSettingsSchemaLookup) {
	return {
		id: state.pluginId,
		name: state.displayName || state.pluginId,
		version: state.marketplaceVersion ?? state.version,
		enabled: state.status === "active",
		status: state.status,
		source: state.source,
		marketplaceVersion: state.marketplaceVersion ?? void 0,
		registryPublisherDid: state.registryPublisherDid ?? void 0,
		registrySlug: state.registrySlug ?? void 0,
		capabilities: [],
		hasAdminPages: false,
		hasDashboardWidgets: false,
		hasHooks: false,
		hasSettings: Object.keys(runtimeSettingsSchemaLookup?.(state.pluginId) ?? {}).length > 0,
		installedAt: state.installedAt?.toISOString(),
		activatedAt: state.activatedAt?.toISOString() ?? void 0,
		deactivatedAt: state.deactivatedAt?.toISOString() ?? void 0,
		description: state.description ?? void 0,
		iconUrl: state.source === "marketplace" && marketplaceUrl ? marketplaceIconUrl(marketplaceUrl, state.pluginId) : void 0,
		mcpToolsEnabled: state.mcpToolsEnabled,
		mcpTools: []
	};
}
/**
* Enable a plugin
*/
async function handlePluginEnable(db, configuredPlugins, sandboxedPluginEntries, pluginId) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.enable(pluginId, plugin.version)) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.enable(pluginId, sandboxed.version)) }
		};
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace" && existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		return {
			success: true,
			data: { item: buildStateOnlyPluginInfo(await stateRepo.enable(pluginId, existing.version)) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_ENABLE_ERROR",
				message: "Failed to enable plugin"
			}
		};
	}
}
/**
* Disable a plugin
*/
async function handlePluginDisable(db, configuredPlugins, sandboxedPluginEntries, pluginId) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const plugin = configuredPlugins.find((p) => p.id === pluginId);
		if (plugin) return {
			success: true,
			data: { item: buildPluginInfo(plugin, await stateRepo.disable(pluginId, plugin.version)) }
		};
		const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
		if (sandboxed) return {
			success: true,
			data: { item: buildSandboxedPluginInfo(sandboxed, await stateRepo.disable(pluginId, sandboxed.version)) }
		};
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace" && existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		return {
			success: true,
			data: { item: buildStateOnlyPluginInfo(await stateRepo.disable(pluginId, existing.version)) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "PLUGIN_DISABLE_ERROR",
				message: "Failed to disable plugin"
			}
		};
	}
}
export { handlePluginList as i, handlePluginEnable as n, handlePluginGet as r, handlePluginDisable as t };
