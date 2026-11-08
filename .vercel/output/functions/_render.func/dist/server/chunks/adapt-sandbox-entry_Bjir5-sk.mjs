import { n as PLUGIN_CAPABILITIES$1, t as HOOK_NAMES } from "./manifest-schema-DNb4XmTS_BtxTt78k.mjs";
import { n as normalizePluginCapabilities, r as warnDeprecatedPluginCapabilities } from "./types-sUHaH7lC_BupjCGRq.mjs";
import { n as sanitizeHeadersForSandbox } from "./request-meta-bwZ_NsvU_BYmTq3sa.mjs";
import { z } from "zod";
// node_modules/emdash/dist/json-schema-v_D_pPNG.mjs
function safeJsonSchemaToZod(schema, toolId, kind) {
	try {
		return z.fromJSONSchema(schema);
	} catch (error) {
		console.warn(`[emdash] Invalid ${kind} schema for plugin MCP tool ${toolId}:`, error);
		return;
	}
}
// node_modules/emdash/dist/plugins/adapt-sandbox-entry.mjs
/**
* In-Process Adapter for Standard-Format Plugins
*
* Converts a standard plugin definition ({ hooks, routes }) into a
* ResolvedPlugin compatible with HookPipeline. This allows standard-format
* plugins to run in-process when placed in the `plugins: []` config array.
*
* The adapter wraps each hook and route handler so that the PluginContextFactory
* provides the same capability-gated context as the native path.
*
*/
/**
* Default hook configuration values
*/
var DEFAULT_PRIORITY = 100;
var DEFAULT_TIMEOUT = 5e3;
var DEFAULT_ERROR_POLICY = "abort";
/**
* Check if a hook entry is the config form (has a `handler` property).
*/
function isHookConfig(entry) {
	return typeof entry === "object" && entry !== null && "handler" in entry;
}
/**
* Resolve a single hook entry to a ResolvedHook.
*
* Sandboxed-format hooks use the standard two-arg convention:
*   handler(event, ctx)
*
* The HookPipeline dispatch methods also call handlers with (event, ctx),
* so the handler is compatible as-is — we just normalise the
* surrounding config (priority, timeout, etc.) to its defaults.
*/
function resolveSandboxedHook(entry, pluginId) {
	if (isHookConfig(entry)) return {
		priority: entry.priority ?? DEFAULT_PRIORITY,
		timeout: entry.timeout ?? DEFAULT_TIMEOUT,
		dependencies: entry.dependencies ?? [],
		errorPolicy: entry.errorPolicy ?? DEFAULT_ERROR_POLICY,
		exclusive: entry.exclusive ?? false,
		handler: entry.handler,
		pluginId
	};
	return {
		priority: DEFAULT_PRIORITY,
		timeout: DEFAULT_TIMEOUT,
		dependencies: [],
		errorPolicy: DEFAULT_ERROR_POLICY,
		exclusive: false,
		handler: entry,
		pluginId
	};
}
/**
* Normalise a `RouteEntry` (bare handler or `{ handler, public?, input? }`
* config) to the config form. The `input` schema is intentionally typed
* `unknown` in `RouteEntry` — sandboxed plugins describe it loosely
* because the strict `z.ZodType<TInput>` constraint of the runtime's
* `PluginRoute` only narrows once the route is wired into the router.
* The wider type flows through to the runtime which validates at
* invocation time.
*/
function normalizeRouteEntry(entry) {
	if (typeof entry === "function") return { handler: entry };
	return {
		handler: entry.handler,
		public: entry.public,
		permission: entry.permission,
		cacheControl: entry.cacheControl,
		methods: entry.methods,
		request: entry.request,
		response: entry.response,
		input: entry.input
	};
}
var VALID_CAPABILITIES_SET = new Set(PLUGIN_CAPABILITIES$1);
var VALID_HOOK_NAMES_SET = new Set(HOOK_NAMES);
/**
* Adapt a sandboxed plugin's default export into a ResolvedPlugin.
*
* This is the in-process side of sandboxed-format plugins: it takes
* the `{ hooks, routes }` default export of a sandboxed plugin and
* produces a `ResolvedPlugin` that enters the HookPipeline alongside
* native plugins. The descriptor supplies identity (id, version) and
* the trust contract (capabilities, allowedHosts, storage); the
* definition supplies behaviour.
*
* @param definition - The plugin's default export (matching `SandboxedPlugin` from `emdash/plugin`).
* @param descriptor - The plugin descriptor with id, version, capabilities, etc.
* @returns A ResolvedPlugin compatible with HookPipeline.
*/
function adaptSandboxEntry(definition, descriptor) {
	const pluginId = descriptor.id;
	const version = descriptor.version;
	if (typeof definition !== "object" || definition === null || Array.isArray(definition)) throw new Error(`Plugin "${pluginId}" default export must be an object with \`hooks\` and/or \`routes\` (got ${Array.isArray(definition) ? "array" : typeof definition}). Did you forget \`export default {...} satisfies SandboxedPlugin\`?`);
	const resolvedHooks = {};
	if (definition.hooks) {
		const hookMap = definition.hooks;
		for (const [hookName, entry] of Object.entries(hookMap)) {
			if (!VALID_HOOK_NAMES_SET.has(hookName)) throw new Error(`Plugin "${pluginId}" declares unknown hook "${hookName}". Valid hooks: ${[...VALID_HOOK_NAMES_SET].join(", ")}`);
			resolvedHooks[hookName] = resolveSandboxedHook(entry, pluginId);
		}
	}
	const usesPublicRouteContext = "id" in definition && typeof definition.id === "string";
	const resolvedRoutes = {};
	if (definition.routes) for (const [routeName, rawEntry] of Object.entries(definition.routes)) {
		const { handler, public: publicFlag, cacheControl, methods, request, response, input: inputSchema, permission } = normalizeRouteEntry(rawEntry);
		resolvedRoutes[routeName] = {
			input: inputSchema,
			public: publicFlag,
			permission,
			cacheControl,
			methods,
			request,
			response,
			handler: async (ctx) => {
				if (usesPublicRouteContext) return handler(ctx);
				const declaredHeaders = request ? request.headers ?? [] : void 0;
				const headers = sanitizeHeadersForSandbox(ctx.request.headers, declaredHeaders);
				const requestShape = {
					url: ctx.request.url,
					method: ctx.request.method,
					headers
				};
				const routeCtx = {
					input: ctx.input,
					request: requestShape,
					requestMeta: ctx.requestMeta,
					user: ctx.user,
					ui: ctx.ui
				};
				const { input: _, request: __, requestMeta: ___, user: ____, ui: _____, ...pluginCtx } = ctx;
				return handler(routeCtx, pluginCtx);
			}
		};
	}
	const rawCapabilities = descriptor.capabilities ?? [];
	for (const cap of rawCapabilities) if (!VALID_CAPABILITIES_SET.has(cap)) throw new Error(`Invalid capability "${cap}" in plugin "${pluginId}". Valid capabilities: ${[...VALID_CAPABILITIES_SET].join(", ")}`);
	warnDeprecatedPluginCapabilities(pluginId, rawCapabilities);
	const capabilities = normalizePluginCapabilities(rawCapabilities);
	const allowedHosts = descriptor.allowedHosts ?? [];
	const rawStorage = descriptor.storage ?? {};
	const storage = {};
	for (const [name, config] of Object.entries(rawStorage)) storage[name] = {
		indexes: config.indexes ?? [],
		uniqueIndexes: config.uniqueIndexes
	};
	const admin = {};
	if (descriptor.adminPages) admin.pages = descriptor.adminPages;
	if (descriptor.adminWidgets) admin.widgets = descriptor.adminWidgets;
	if (descriptor.editorPanels) admin.editorPanels = descriptor.editorPanels;
	if (descriptor.editorActions) admin.editorActions = descriptor.editorActions;
	if (descriptor.settingsSchema) admin.settingsSchema = descriptor.settingsSchema;
	if (descriptor.portableTextBlocks) admin.portableTextBlocks = descriptor.portableTextBlocks;
	if (descriptor.fieldWidgets) admin.fieldWidgets = descriptor.fieldWidgets;
	return {
		id: pluginId,
		version,
		capabilities,
		allowedHosts,
		storage,
		hooks: resolvedHooks,
		routes: resolvedRoutes,
		mcp: { tools: {
			...Object.fromEntries((descriptor.mcp?.tools ?? []).map((tool) => [tool.name, toolFromManifest(tool, pluginId)])),
			...Object.fromEntries(Object.entries(definition.mcp?.tools ?? {}).map(([name, tool]) => [name, {
				description: tool.description,
				route: tool.route,
				input: tool.input,
				output: tool.output,
				destructive: tool.destructive
			}]))
		} },
		admin
	};
}
/**
* An MCP tool from its serialized manifest form. The schemas are converted
* on first use: turning JSON Schema back into Zod takes milliseconds per
* tool, and this adapter runs on every cold start, public requests included.
*/
function toolFromManifest(tool, pluginId) {
	let input;
	let output;
	return {
		description: tool.description,
		route: tool.route,
		destructive: tool.destructive,
		get input() {
			input ??= safeJsonSchemaToZod({ ...tool.inputSchema }, `${pluginId}/${tool.name}`, "input") ?? z.record(z.string(), z.unknown());
			return input;
		},
		get output() {
			if (!tool.outputSchema) return void 0;
			if (output === void 0) output = safeJsonSchemaToZod({ ...tool.outputSchema }, `${pluginId}/${tool.name}`, "output") ?? null;
			return output ?? void 0;
		}
	};
}
export { safeJsonSchemaToZod as n, adaptSandboxEntry as t };
