import { i as Permissions } from "./dist_BZHQodRU.mjs";
import { z } from "zod";
import { capabilitiesToDeclaredAccess, declaredAccessToCapabilities, isJsonPostRouteContract, manifestRouteEntrySchema, normalizeManifestRoute, routeNameSchema } from "@emdash-cms/plugin-types";
// node_modules/emdash/dist/manifest-schema-DNb4XmTS.mjs
/**
* Zod schema for PluginManifest validation
*
* Used to validate manifest.json from plugin bundles at every parse site:
* - Client-side download (marketplace.ts extractBundle)
* - R2 load (api/handlers/marketplace.ts loadBundleFromR2)
* - marketplace and registry bundle validation
* - Marketplace ingest extends this with publishing-specific fields
*/
/**
* Current capability names — the ones authors should use going forward.
* See `PluginCapability` in `types.ts` for documentation of each.
*/
var CURRENT_PLUGIN_CAPABILITIES = [
	"network:request",
	"network:request:unrestricted",
	"content:read",
	"content:revisions:read",
	"content:write",
	"content:publish",
	"content:restore",
	"comments:read",
	"comments:moderate",
	"schema:read",
	"admin.editor-draft:read",
	"admin.editor-draft:patch",
	"hooks.content-policy:register",
	"taxonomies:read",
	"taxonomies:write",
	"bylines:read",
	"redirects:read",
	"redirects:write",
	"media:read",
	"media:bytes:read",
	"media:metadata:write",
	"media:write",
	"users:read",
	"email:send",
	"hooks.email-transport:register",
	"hooks.email-events:register",
	"hooks.page-fragments:register"
];
/**
* Legacy capability names accepted during the deprecation window.
* Normalized to current names via `normalizeCapability()` in types.ts
* before reaching the runtime. Plugin authors are warned at bundle/validate
* and hard-failed at publish.
*/
var DEPRECATED_PLUGIN_CAPABILITIES = [
	"network:fetch",
	"network:fetch:any",
	"read:content",
	"write:content",
	"read:media",
	"write:media",
	"read:users",
	"email:provide",
	"email:intercept",
	"page:inject"
];
/**
* Full set of accepted capability strings — current + deprecated.
*
* The manifest schema accepts both during the transition. The runtime only
* ever sees current names because `normalizeCapability()` rewrites legacy
* names at every external boundary (definePlugin, adaptSandboxEntry).
*/
var PLUGIN_CAPABILITIES$1 = [...CURRENT_PLUGIN_CAPABILITIES, ...DEPRECATED_PLUGIN_CAPABILITIES];
/** Must stay in sync with FieldType in schema/types.ts */
var FIELD_TYPES = [
	"string",
	"text",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"reference",
	"json",
	"slug",
	"repeater",
	"blocks"
];
var HOOK_NAMES = [
	"plugin:install",
	"plugin:activate",
	"plugin:deactivate",
	"plugin:uninstall",
	"content:beforeSave",
	"content:afterSave",
	"content:beforeDelete",
	"content:afterDelete",
	"content:beforePublish",
	"content:beforeSchedule",
	"content:beforeUnpublish",
	"content:afterPublish",
	"content:afterUnpublish",
	"content:afterRestore",
	"content:afterSchedule",
	"content:afterUnschedule",
	"media:beforeUpload",
	"media:afterUpload",
	"cron",
	"email:beforeSend",
	"email:deliver",
	"email:afterSend",
	"comment:beforeCreate",
	"comment:moderate",
	"comment:afterCreate",
	"comment:afterModerate",
	"byline:afterSave",
	"byline:afterDelete",
	"page:metadata",
	"page:fragments"
];
/**
* Structured hook entry for manifest — name plus optional metadata.
* During a transition period, both plain strings and objects are accepted.
*/
var manifestHookEntrySchema = z.object({
	name: z.enum(HOOK_NAMES),
	exclusive: z.boolean().optional(),
	priority: z.number().int().optional(),
	timeout: z.number().int().positive().optional(),
	dependencies: z.array(z.string().min(1)).optional(),
	errorPolicy: z.enum(["continue", "abort"]).optional()
});
/**
* Structured route entry for manifest — name plus optional metadata.
* Both plain strings and objects are accepted; strings are normalized
* to `{ name }` objects via `normalizeManifestRoute()`.
*/
var manifestRouteEntrySchema$1 = manifestRouteEntrySchema.safeExtend({ permission: z.string().refine((permission) => Object.hasOwn(Permissions, permission)).optional() });
var pluginJsonSchema = z.record(z.string(), z.unknown());
var pluginMcpConfigSchema = z.object({ tools: z.array(z.object({
	name: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/, "Invalid MCP tool name"),
	description: z.string().min(1),
	route: routeNameSchema,
	permission: z.string().refine((permission) => Object.hasOwn(Permissions, permission)),
	destructive: z.boolean(),
	inputSchema: pluginJsonSchema,
	outputSchema: pluginJsonSchema.optional()
})) });
/** Index field names must be valid identifiers to prevent SQL injection via JSON path expressions */
var indexFieldName = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/);
var storageCollectionSchema = z.object({
	indexes: z.array(z.union([indexFieldName, z.array(indexFieldName)])),
	uniqueIndexes: z.array(z.union([indexFieldName, z.array(indexFieldName)])).optional()
});
var baseSettingFields = {
	label: z.string(),
	description: z.string().optional()
};
var settingFieldSchema = z.discriminatedUnion("type", [
	z.object({
		...baseSettingFields,
		type: z.literal("string"),
		default: z.string().optional(),
		multiline: z.boolean().optional()
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("number"),
		default: z.number().optional(),
		min: z.number().optional(),
		max: z.number().optional()
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("boolean"),
		default: z.boolean().optional()
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("select"),
		options: z.array(z.object({
			value: z.string(),
			label: z.string()
		})),
		default: z.string().optional()
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("secret")
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("url"),
		default: z.string().optional(),
		placeholder: z.string().optional()
	}),
	z.object({
		...baseSettingFields,
		type: z.literal("email"),
		default: z.string().optional(),
		placeholder: z.string().optional()
	})
]);
var adminPageSchema = z.object({
	path: z.string(),
	label: z.string(),
	icon: z.string().optional(),
	group: z.string().trim().min(1).max(100).optional()
});
var dashboardWidgetSchema = z.object({
	id: z.string(),
	size: z.enum([
		"full",
		"half",
		"third"
	]).optional(),
	title: z.string().optional()
});
var editorExtensionIdPattern = /^[a-z][a-z0-9_-]*$/;
var collectionSlugPattern = /^[a-z][a-z0-9_]*$/;
var editorCollectionsSchema = z.array(z.string().max(63).regex(collectionSlugPattern, "Invalid collection slug")).max(64).refine((collections) => new Set(collections).size === collections.length, { message: "Editor extension collections must be unique" });
var editorDraftFieldSelectorSchema = z.object({
	fields: z.array(z.string().max(63).regex(collectionSlugPattern, "Invalid field slug")).max(32).refine((fields) => new Set(fields).size === fields.length, { message: "Editor draft fields must be unique" }).optional(),
	translatable: z.literal(true).optional()
}).refine((selector) => (selector.fields?.length ?? 0) > 0 || selector.translatable === true, { message: "Editor draft selector must include fields or translatable" });
var editorDraftAccessSchema = z.object({
	read: editorDraftFieldSelectorSchema.optional(),
	patch: editorDraftFieldSelectorSchema.optional()
}).refine((access) => access.read !== void 0 || access.patch !== void 0, { message: "Editor draft access must include read or patch" });
var editorPanelSchema = z.object({
	id: z.string().min(1).max(64).regex(editorExtensionIdPattern, "Invalid editor panel id"),
	title: z.string().min(1).max(128),
	route: routeNameSchema.max(128),
	collections: editorCollectionsSchema.optional(),
	order: z.number().int().min(-1e3).max(1e3).optional(),
	draft: editorDraftAccessSchema.optional()
}).refine((extension) => extension.draft === void 0 || (extension.collections?.length ?? 0) > 0, {
	message: "Editor draft access requires explicit collection scope",
	path: ["collections"]
});
var editorActionConfirmSchema = z.object({
	title: z.string().min(1).max(128),
	text: z.string().min(1).max(1024),
	confirm: z.string().min(1).max(64),
	deny: z.string().min(1).max(64),
	style: z.literal("danger").optional()
});
var editorActionSchema = z.object({
	id: z.string().min(1).max(64).regex(editorExtensionIdPattern, "Invalid editor action id"),
	label: z.string().min(1).max(128),
	route: routeNameSchema.max(128),
	placement: z.enum(["toolbar", "overflow"]),
	collections: editorCollectionsSchema.optional(),
	style: z.enum(["default", "danger"]).optional(),
	confirm: editorActionConfirmSchema.optional(),
	draft: editorDraftAccessSchema.optional()
}).refine((action) => action.style !== "danger" || action.confirm !== void 0, {
	message: "Danger editor actions require confirmation",
	path: ["confirm"]
}).refine((extension) => extension.draft === void 0 || (extension.collections?.length ?? 0) > 0, {
	message: "Editor draft access requires explicit collection scope",
	path: ["collections"]
});
function uniqueExtensionIds(items, ctx, path) {
	const seen = /* @__PURE__ */ new Set();
	for (const [index, item] of (items ?? []).entries()) {
		if (seen.has(item.id)) ctx.addIssue({
			code: "custom",
			message: `Duplicate ${path} id`,
			path: [
				path,
				index,
				"id"
			]
		});
		seen.add(item.id);
	}
}
var pluginAdminConfigSchema = z.object({
	entry: z.string().optional(),
	settingsSchema: z.record(z.string(), settingFieldSchema).optional(),
	pages: z.array(adminPageSchema).optional(),
	widgets: z.array(dashboardWidgetSchema).optional(),
	editorPanels: z.array(editorPanelSchema).max(32).optional(),
	editorActions: z.array(editorActionSchema).max(32).optional(),
	fieldWidgets: z.array(z.object({
		name: z.string().min(1),
		label: z.string().min(1),
		fieldTypes: z.array(z.enum(FIELD_TYPES)),
		elements: z.array(z.object({
			type: z.string(),
			action_id: z.string(),
			label: z.string().optional()
		}).loose()).optional()
	})).optional()
}).superRefine((admin, ctx) => {
	uniqueExtensionIds(admin.editorPanels, ctx, "editorPanels");
	uniqueExtensionIds(admin.editorActions, ctx, "editorActions");
});
/**
* An operation's constraint object. Open vocabulary: keys the runtime
* recognises are enforced, others are advisory. The bundler emits `{}` for a
* granted operation; presence (not value) signals the grant.
*/
var accessConstraints = z.record(z.string(), z.unknown());
/**
* Structured trust contract embedded in the bundle manifest. Mirrors
* `DeclaredAccess` in `@emdash-cms/plugin-types`. Categories are host
* subsystems; operations are modes of participation.
*/
var declaredAccessSchema = z.object({
	content: z.object({
		read: accessConstraints.optional(),
		revisionsRead: accessConstraints.optional(),
		write: accessConstraints.optional(),
		publish: accessConstraints.optional(),
		restore: accessConstraints.optional(),
		policy: accessConstraints.optional()
	}).optional(),
	schema: z.object({ read: accessConstraints.optional() }).optional(),
	admin: z.object({
		editorDraftRead: accessConstraints.optional(),
		editorDraftPatch: accessConstraints.optional()
	}).optional(),
	taxonomies: z.object({
		read: accessConstraints.optional(),
		write: accessConstraints.optional()
	}).optional(),
	bylines: z.object({ read: accessConstraints.optional() }).optional(),
	redirects: z.object({
		read: accessConstraints.optional(),
		write: accessConstraints.optional()
	}).optional(),
	comments: z.object({
		read: accessConstraints.optional(),
		moderate: accessConstraints.optional()
	}).optional(),
	media: z.object({
		read: accessConstraints.optional(),
		bytesRead: accessConstraints.optional(),
		metadataWrite: accessConstraints.optional(),
		write: accessConstraints.optional()
	}).optional(),
	network: z.object({ request: z.object({ allowedHosts: z.array(z.string()).min(1).optional() }).optional() }).optional(),
	email: z.object({
		send: accessConstraints.optional(),
		events: accessConstraints.optional(),
		transport: accessConstraints.optional()
	}).optional(),
	page: z.object({ fragments: accessConstraints.optional() }).optional(),
	users: z.object({ read: accessConstraints.optional() }).optional()
});
/**
* Zod schema matching the PluginManifest interface from types.ts.
*
* Every JSON.parse of a manifest.json should validate through this.
*
* `declaredAccess` is the trust contract; `capabilities`/`allowedHosts` are the
* runtime's enforcement currency. Apply `reconcileManifestAccess` after parsing
* to make them consistent (declaredAccess authoritative when present). Kept a
* plain object (no `.transform`) because callers `.pick()`/`.extend()` it.
*/
var pluginManifestBaseSchema = z.object({
	id: z.string().min(1),
	version: z.string().min(1),
	declaredAccess: declaredAccessSchema.optional(),
	capabilities: z.array(z.enum(PLUGIN_CAPABILITIES$1)),
	allowedHosts: z.array(z.string()),
	storage: z.record(z.string(), storageCollectionSchema),
	hooks: z.array(z.union([z.enum(HOOK_NAMES), manifestHookEntrySchema])),
	routes: z.array(z.union([routeNameSchema, manifestRouteEntrySchema$1])),
	mcp: pluginMcpConfigSchema.optional(),
	admin: pluginAdminConfigSchema
});
function validateEditorExtensionRoutes(manifest, ctx) {
	for (const [kind, extensions] of [["editorPanels", manifest.admin.editorPanels], ["editorActions", manifest.admin.editorActions]]) for (const [index, extension] of (extensions ?? []).entries()) {
		const matches = manifest.routes.filter((route) => (typeof route === "string" ? route : route.name) === extension.route);
		if (matches.length !== 1) {
			ctx.addIssue({
				code: "custom",
				message: matches.length === 0 ? "Editor extension route is not declared" : "Editor extension route must be declared exactly once",
				path: [
					"admin",
					kind,
					index,
					"route"
				]
			});
			continue;
		}
		const route = matches[0];
		if (!route) continue;
		if (typeof route !== "string" && route.public === true) ctx.addIssue({
			code: "custom",
			message: "Editor extension routes must be private",
			path: [
				"admin",
				kind,
				index,
				"route"
			]
		});
		if (typeof route !== "string" && !isJsonPostRouteContract(route)) ctx.addIssue({
			code: "custom",
			message: "Editor extension routes must accept POST JSON requests and return JSON",
			path: [
				"admin",
				kind,
				index,
				"route"
			]
		});
	}
}
function validateUniqueRoutes(manifest, ctx) {
	const seen = /* @__PURE__ */ new Set();
	for (const [index, route] of manifest.routes.entries()) {
		const name = typeof route === "string" ? route : route.name;
		if (seen.has(name)) ctx.addIssue({
			code: "custom",
			message: `Route "${name}" must be declared exactly once`,
			path: ["routes", index]
		});
		seen.add(name);
	}
}
function validateMcpToolRoutes(manifest, ctx) {
	for (const [index, tool] of (manifest.mcp?.tools ?? []).entries()) {
		const route = manifest.routes.find((candidate) => (typeof candidate === "string" ? candidate : candidate.name) === tool.route);
		if (typeof route === "string" || route === void 0 || route.public === true || route.permission !== tool.permission || !isJsonPostRouteContract(route)) ctx.addIssue({
			code: "custom",
			message: "MCP tools must reference a private POST-compatible JSON route",
			path: [
				"mcp",
				"tools",
				index,
				"route"
			]
		});
	}
}
function validateBlockKitAdminRoute(manifest, ctx) {
	if ((manifest.admin.pages?.length ?? 0) === 0 && (manifest.admin.widgets?.length ?? 0) === 0) return;
	const routeIndex = manifest.routes.findIndex((route) => (typeof route === "string" ? route : route.name) === "admin");
	if (routeIndex < 0) return;
	const route = manifest.routes[routeIndex];
	if (!route) return;
	if (typeof route !== "string" && (route.public === true || !isJsonPostRouteContract(route))) ctx.addIssue({
		code: "custom",
		message: "Block Kit admin routes must be private POST-compatible JSON routes",
		path: ["routes", routeIndex]
	});
}
var pluginManifestSchema$1 = pluginManifestBaseSchema.superRefine((manifest, ctx) => {
	validateUniqueRoutes(manifest, ctx);
	validateEditorExtensionRoutes(manifest, ctx);
	validateMcpToolRoutes(manifest, ctx);
	validateBlockKitAdminRoute(manifest, ctx);
});
/**
* Reconcile a parsed manifest's trust contract with its enforcement currency.
* `declaredAccess` is authoritative: when present, `capabilities`/`allowedHosts`
* are re-derived from it so what the runtime enforces always matches what was
* recorded and consented to. A pre-migration bundle without `declaredAccess`
* has it derived from the legacy capability list instead. The result always
* carries both, mutually consistent. Apply this at every bundle-parse site.
*/
function reconcileManifestAccess$1(manifest) {
	return manifest.declaredAccess ? {
		...manifest,
		...declaredAccessToCapabilities(manifest.declaredAccess)
	} : {
		...manifest,
		declaredAccess: capabilitiesToDeclaredAccess(manifest.capabilities, manifest.allowedHosts)
	};
}
/**
* Normalize a manifest hook entry — plain strings become `{ name }` objects.
*/
function normalizeManifestHook(entry) {
	if (typeof entry === "string") return { name: entry };
	return entry;
}
/**
* Normalize a manifest route entry — plain strings become `{ name }` objects.
*/
function normalizeManifestRoute$1(entry) {
	return normalizeManifestRoute(entry);
}
export { pluginManifestSchema$1 as a, normalizeManifestRoute$1 as i, PLUGIN_CAPABILITIES$1 as n, reconcileManifestAccess$1 as o, normalizeManifestHook as r, HOOK_NAMES as t };
