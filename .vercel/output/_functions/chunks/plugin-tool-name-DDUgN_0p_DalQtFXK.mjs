// node_modules/emdash/dist/plugin-tool-name-DDUgN_0p.mjs
var FORWARD_SLASH_PATTERN = "/";
var MCP_SAFE_PLUGIN_ID_PATTERN = /^[A-Za-z0-9_.-]+$/;
var PLUGIN_SCOPE_PREFIX_PATTERN = /^@/;
var PLUGIN_ID_DASH_PATTERN = /-/g;
var PLUGIN_ID_UNDERSCORE_PATTERN = /_/;
var AMBIGUOUS_PLUGIN_SEGMENT_PATTERN = /__/;
var AMBIGUOUS_JOINED_PLUGIN_ID_PATTERN = /_{3,}/;
function pluginToolName(pluginId, toolName) {
	if (MCP_SAFE_PLUGIN_ID_PATTERN.test(pluginId)) return `${pluginId}__${toolName}`;
	const readableSegments = pluginId.replace(PLUGIN_SCOPE_PREFIX_PATTERN, "").split(FORWARD_SLASH_PATTERN).map((segment) => segment.replace(PLUGIN_ID_DASH_PATTERN, "_"));
	const readablePluginId = readableSegments.join("__");
	if (PLUGIN_ID_UNDERSCORE_PATTERN.test(pluginId) || AMBIGUOUS_JOINED_PLUGIN_ID_PATTERN.test(readablePluginId) || readableSegments.some((segment) => AMBIGUOUS_PLUGIN_SEGMENT_PATTERN.test(segment))) return `${readablePluginId}__${stableToolNameHash(pluginId)}__${toolName}`;
	return `${readablePluginId}__${toolName}`;
}
function stableToolNameHash(value) {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index++) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(16).padStart(8, "0");
}
export { pluginToolName as t };
