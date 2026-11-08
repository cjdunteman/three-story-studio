// node_modules/emdash/dist/state-CFbGZziM.mjs
var TIMEZONE_SUFFIX = /(?:z|[+-]\d{2}(?::?\d{2})?)$/i;
var HOUR_OFFSET_SUFFIX = /\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?[+-]\d{2}$/i;
function parseDatabaseTimestamp(value) {
	let normalized = value.trim().replace(" ", "T");
	if (HOUR_OFFSET_SUFFIX.test(normalized)) normalized += ":00";
	else if (!TIMEZONE_SUFFIX.test(normalized)) normalized += "Z";
	return new Date(normalized);
}
function toPluginStatus(value) {
	if (value === "active") return "active";
	return "inactive";
}
function toPluginSource(value) {
	if (value === "marketplace") return "marketplace";
	if (value === "registry") return "registry";
	return "config";
}
/**
* Repository for plugin state in the database
*/
var PluginStateRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Get state for a specific plugin
	*/
	async get(pluginId) {
		const row = await this.db.selectFrom("_plugin_state").selectAll().where("plugin_id", "=", pluginId).executeTakeFirst();
		if (!row) return null;
		return rowToPluginState(row);
	}
	/**
	* Get all plugin states
	*/
	async getAll() {
		return (await this.db.selectFrom("_plugin_state").selectAll().execute()).map(rowToPluginState);
	}
	/**
	* Get all marketplace-installed plugin states
	*/
	async getMarketplacePlugins() {
		return (await this.db.selectFrom("_plugin_state").selectAll().where("source", "=", "marketplace").execute()).map(rowToPluginState);
	}
	/**
	* Get all registry-installed plugin states.
	*
	* The runtime's registry sync path uses this to discover which
	* registry plugins should be loaded into the sandbox on this worker.
	*/
	async getRegistryPlugins() {
		return (await this.db.selectFrom("_plugin_state").selectAll().where("source", "=", "registry").execute()).map(rowToPluginState);
	}
	/**
	* Create or update plugin state
	*/
	async upsert(pluginId, version, status, opts) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.get(pluginId);
		if (existing) {
			const updates = {
				status,
				version
			};
			if (status === "active" && existing.status !== "active") updates.activated_at = now;
			else if (status === "inactive" && existing.status !== "inactive") updates.deactivated_at = now;
			if (opts?.source) updates.source = opts.source;
			if (opts?.marketplaceVersion !== void 0) updates.marketplace_version = opts.marketplaceVersion;
			if (opts?.displayName !== void 0) updates.display_name = opts.displayName;
			if (opts?.description !== void 0) updates.description = opts.description;
			if (opts?.registryPublisherDid !== void 0) updates.registry_publisher_did = opts.registryPublisherDid;
			if (opts?.registrySlug !== void 0) updates.registry_slug = opts.registrySlug;
			if (opts?.mcpToolsEnabled !== void 0) updates.mcp_tools_enabled = opts.mcpToolsEnabled ? 1 : 0;
			if (opts?.mcpToolsConsent !== void 0) updates.mcp_tools_consent = opts.mcpToolsConsent;
			await this.db.updateTable("_plugin_state").set(updates).where("plugin_id", "=", pluginId).execute();
		} else await this.db.insertInto("_plugin_state").values({
			plugin_id: pluginId,
			status,
			version,
			installed_at: now,
			activated_at: status === "active" ? now : null,
			deactivated_at: null,
			data: null,
			source: opts?.source ?? "config",
			marketplace_version: opts?.marketplaceVersion ?? null,
			display_name: opts?.displayName ?? null,
			description: opts?.description ?? null,
			registry_publisher_did: opts?.registryPublisherDid ?? null,
			registry_slug: opts?.registrySlug ?? null,
			mcp_tools_enabled: opts?.mcpToolsEnabled ? 1 : 0,
			mcp_tools_consent: opts?.mcpToolsConsent ?? null
		}).execute();
		return await this.get(pluginId);
	}
	/**
	* Insert an active state row unless the plugin already has one.
	*
	* Returns true only for the caller whose insert created the row, so
	* concurrent callers agree on a single owner for one-time setup.
	*/
	async createActiveIfAbsent(pluginId, version, source) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return await this.db.insertInto("_plugin_state").values({
			plugin_id: pluginId,
			status: "active",
			version,
			installed_at: now,
			activated_at: now,
			deactivated_at: null,
			data: null,
			source,
			marketplace_version: null,
			display_name: null,
			description: null,
			registry_publisher_did: null,
			registry_slug: null,
			mcp_tools_consent: null
		}).onConflict((oc) => oc.column("plugin_id").doNothing()).returning("plugin_id").executeTakeFirst() !== void 0;
	}
	async restoreIfVersion(expectedVersion, state) {
		return ((await this.db.updateTable("_plugin_state").set({
			version: state.version,
			status: state.status,
			installed_at: state.installedAt.toISOString(),
			activated_at: state.activatedAt?.toISOString() ?? null,
			deactivated_at: state.deactivatedAt?.toISOString() ?? null,
			source: state.source,
			marketplace_version: state.marketplaceVersion,
			display_name: state.displayName,
			description: state.description,
			registry_publisher_did: state.registryPublisherDid,
			registry_slug: state.registrySlug,
			mcp_tools_enabled: state.mcpToolsEnabled ? 1 : 0,
			mcp_tools_consent: state.mcpToolsConsent
		}).where("plugin_id", "=", state.pluginId).where("version", "=", expectedVersion).where("source", "=", state.source).executeTakeFirst()).numUpdatedRows ?? 0n) > 0n;
	}
	/**
	* Enable a plugin
	*/
	async enable(pluginId, version) {
		return this.upsert(pluginId, version, "active");
	}
	/**
	* Disable a plugin
	*/
	async disable(pluginId, version) {
		return this.upsert(pluginId, version, "inactive");
	}
	/**
	* Delete plugin state
	*/
	async delete(pluginId) {
		return ((await this.db.deleteFrom("_plugin_state").where("plugin_id", "=", pluginId).executeTakeFirst()).numDeletedRows ?? 0) > 0;
	}
};
function rowToPluginState(row) {
	return {
		pluginId: row.plugin_id,
		status: toPluginStatus(row.status),
		version: row.version,
		installedAt: parseDatabaseTimestamp(row.installed_at),
		activatedAt: row.activated_at ? parseDatabaseTimestamp(row.activated_at) : null,
		deactivatedAt: row.deactivated_at ? parseDatabaseTimestamp(row.deactivated_at) : null,
		source: toPluginSource(row.source),
		marketplaceVersion: row.marketplace_version ?? null,
		displayName: row.display_name ?? null,
		description: row.description ?? null,
		registryPublisherDid: row.registry_publisher_did ?? null,
		registrySlug: row.registry_slug ?? null,
		mcpToolsEnabled: row.mcp_tools_enabled === 1,
		mcpToolsConsent: row.mcp_tools_consent ?? null
	};
}
export { rowToPluginState as n, PluginStateRepository as t };
