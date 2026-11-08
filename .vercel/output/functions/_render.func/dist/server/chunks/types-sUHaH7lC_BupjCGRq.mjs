import { CAPABILITY_RENAMES, isDeprecatedCapability, normalizeCapabilities } from "@emdash-cms/plugin-types";
// node_modules/emdash/dist/types-sUHaH7lC.mjs
var PLUGIN_CAPABILITY_IMPLICATIONS = [
	["content:write", "content:read"],
	["content:revisions:read", "content:read"],
	["taxonomies:write", "taxonomies:read"],
	["content:publish", "content:read"],
	["media:write", "media:read"],
	["comments:moderate", "comments:read"],
	["redirects:write", "redirects:read"],
	["network:request:unrestricted", "network:request"]
];
function normalizePluginCapabilities(capabilities) {
	const normalized = new Set(normalizeCapabilities(capabilities));
	for (const [granted, implied] of PLUGIN_CAPABILITY_IMPLICATIONS) if (normalized.has(granted)) normalized.add(implied);
	return [...normalized];
}
var WARNED_DEPRECATED_CAPABILITY_PLUGINS = Symbol.for("emdash:warned-deprecated-capability-plugins");
/**
* Warn, once per plugin per process, that a plugin declares deprecated
* capability names. Call with the plugin's raw, un-normalized capabilities.
*/
function warnDeprecatedPluginCapabilities(pluginId, capabilities) {
	const deprecated = capabilities.filter(isDeprecatedCapability);
	if (deprecated.length === 0) return;
	const g = globalThis;
	const warned = g[WARNED_DEPRECATED_CAPABILITY_PLUGINS] ??= /* @__PURE__ */ new Set();
	if (warned.has(pluginId)) return;
	warned.add(pluginId);
	const renames = deprecated.map((cap) => `${cap} → ${CAPABILITY_RENAMES[cap]}`).join(", ");
	console.warn(`[emdash] Plugin "${pluginId}" declares deprecated capability names (${renames}). They still work, but support will be removed in a future major release. Update the plugin, or ask its author to publish a version that uses the current names.`);
}
export { normalizePluginCapabilities as n, warnDeprecatedPluginCapabilities as r, normalizeCapabilities as t };
