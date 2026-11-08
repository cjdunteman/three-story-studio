import { n as generateFieldSchema } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import { n as apiSuccess, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { i as pluginRouteResponseToWire, n as parseDeclaredPluginRouteInput, r as pluginRouteResponseFromWire, t as PluginRouteRequestError } from "./route-wire-Ca_HWCZ5_Cu9YQK_s.mjs";
import { a as requireOwnerPerm, o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { i as resolveLocale, n as getLocaleDir } from "./loadMessages-DNBm8IQr_DB5OPNuW.mjs";
import { n as requireScope } from "./scopes-DNaY7Ey0_hhUdItA7.mjs";
import { i as Permissions } from "./dist_BZHQodRU.mjs";
import "./locales_BQs6oPWQ.mjs";
import { isEditorDraftPatchEffect, validateContentEditorPanelInteraction, validateEditorDraftPatchEffect } from "@emdash-cms/blocks/server";
// node_modules/emdash/dist/http-route-dispatch-rXKvTNm9.mjs
var EDITOR_DRAFT_LIMITS = {
	maxFields: 32,
	maxSnapshotBytes: 196608,
	maxFieldBytes: 65536
};
var ENCODER = new TextEncoder();
var INVOCATION_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isBrowserDraftRequest(value) {
	return isRecord$1(value) && typeof value.collection === "string" && typeof value.entryId === "string" && (value.locale === null || typeof value.locale === "string") && typeof value.baseRevision === "string" && typeof value.generation === "number" && typeof value.invocationId === "string" && isRecord$1(value.fields);
}
function jsonBytes(value) {
	try {
		return ENCODER.encode(JSON.stringify(value)).byteLength;
	} catch {
		return null;
	}
}
function selectedFields(collection, selector) {
	const selected = new Set(selector?.fields ?? []);
	if (selector?.translatable) {
		for (const field of collection.fields) if (field.translatable) selected.add(field.slug);
	}
	return selected;
}
function sanitizeField(field) {
	return {
		slug: field.slug,
		label: field.label,
		type: field.type,
		required: field.required,
		translatable: field.translatable,
		...field.validation ? { validation: { ...field.validation } } : {}
	};
}
function fail(code, message) {
	return {
		code,
		message
	};
}
function validateEditorDraftRequest(input) {
	if (!isBrowserDraftRequest(input.request)) return fail("EDITOR_DRAFT_INVALID", "Invalid editor draft snapshot");
	const request = input.request;
	if (request.collection !== input.collection.slug || request.entryId !== input.entry.id || request.locale !== input.entry.locale) return fail("EDITOR_DRAFT_STALE", "Editor draft identity is stale");
	if (request.baseRevision !== input.entry.revision) return fail("EDITOR_DRAFT_STALE", "Editor draft base revision is stale");
	if (!Number.isSafeInteger(request.generation) || request.generation < 0 || typeof request.invocationId !== "string" || !INVOCATION_PATTERN.test(request.invocationId)) return fail("EDITOR_DRAFT_INVALID", "Invalid editor draft invocation identity");
	const size = jsonBytes(request);
	if (size === null) return fail("EDITOR_DRAFT_INVALID", "Editor draft snapshot must be JSON serializable");
	if (size > EDITOR_DRAFT_LIMITS.maxSnapshotBytes) return fail("EDITOR_DRAFT_TOO_LARGE", "Editor draft snapshot exceeds the size limit");
	const readFields = selectedFields(input.collection, input.readSelector);
	const patchFields = selectedFields(input.collection, input.patchSelector);
	if (readFields.size > EDITOR_DRAFT_LIMITS.maxFields || patchFields.size > EDITOR_DRAFT_LIMITS.maxFields) return fail("EDITOR_DRAFT_TOO_LARGE", "Editor draft selector exceeds the field limit");
	const supplied = Object.keys(request.fields);
	if (supplied.length > EDITOR_DRAFT_LIMITS.maxFields) return fail("EDITOR_DRAFT_TOO_LARGE", "Editor draft snapshot exceeds the field limit");
	if (supplied.length > 0 && !input.canRead) return fail("EDITOR_DRAFT_CAPABILITY_REQUIRED", "Plugin cannot read unsaved editor content");
	const bySlug = new Map(input.collection.fields.map((field) => [field.slug, field]));
	const patchFieldDefinitions = Array.from(patchFields, (slug) => bySlug.get(slug)).filter((field) => Boolean(field && !field.unsupportedType)).map(sanitizeField);
	const fields = {};
	const fieldDefinitions = [];
	for (const slug of supplied) {
		if (!readFields.has(slug)) return fail("EDITOR_DRAFT_FIELD_FORBIDDEN", `Editor draft field '${slug}' is not allowed`);
		const field = bySlug.get(slug);
		if (!field || field.unsupportedType) return fail("EDITOR_DRAFT_UNSUPPORTED_FIELD_TYPE", `Editor draft field '${slug}' has an unsupported type`);
		const fieldSize = jsonBytes(request.fields[slug]);
		if (fieldSize === null) return fail("EDITOR_DRAFT_INVALID", `Editor draft field '${slug}' is invalid`);
		if (fieldSize > EDITOR_DRAFT_LIMITS.maxFieldBytes) return fail("EDITOR_DRAFT_TOO_LARGE", `Editor draft field '${slug}' exceeds the size limit`);
		if (!generateFieldSchema(field).safeParse(request.fields[slug]).success) return fail("EDITOR_DRAFT_INVALID", `Editor draft field '${slug}' is invalid`);
		fields[slug] = request.fields[slug];
		fieldDefinitions.push(sanitizeField(field));
	}
	if (input.readSelector && !input.canRead) return fail("EDITOR_DRAFT_CAPABILITY_REQUIRED", "Plugin cannot read unsaved editor content");
	if (input.patchSelector && !input.canPatch) return fail("EDITOR_DRAFT_CAPABILITY_REQUIRED", "Plugin cannot propose unsaved editor changes");
	return {
		snapshot: {
			collection: input.collection.slug,
			entryId: input.entry.id,
			locale: input.entry.locale,
			baseRevision: input.entry.revision,
			invocationId: request.invocationId,
			fields,
			fieldDefinitions
		},
		receipt: {
			entryId: input.entry.id,
			locale: input.entry.locale,
			baseRevision: input.entry.revision,
			generation: request.generation,
			invocationId: request.invocationId,
			fieldDefinitions: patchFieldDefinitions
		},
		readFields,
		patchFields
	};
}
function validateEditorDraftPatch(input) {
	if (!validateEditorDraftPatchEffect(input.patch).valid || !isEditorDraftPatchEffect(input.patch)) return fail("EDITOR_DRAFT_INVALID", "Plugin returned an invalid editor draft patch");
	const patch = input.patch;
	const bySlug = new Map(input.collection.fields.map((field) => [field.slug, field]));
	for (const operation of patch.operations) {
		if (!input.allowedFields.has(operation.field)) return fail("EDITOR_DRAFT_FIELD_FORBIDDEN", `Editor draft field '${operation.field}' is not allowed`);
		const field = bySlug.get(operation.field);
		if (!field || field.unsupportedType) return fail("EDITOR_DRAFT_UNSUPPORTED_FIELD_TYPE", `Editor draft field '${operation.field}' has an unsupported type`);
		const value = operation.op === "clear" ? null : operation.value;
		if (!generateFieldSchema(field).safeParse(value).success) return fail("EDITOR_DRAFT_INVALID", `Editor draft field '${operation.field}' is invalid`);
		const fieldSize = jsonBytes(value);
		if (fieldSize === null || fieldSize > EDITOR_DRAFT_LIMITS.maxFieldBytes) return fail("EDITOR_DRAFT_TOO_LARGE", `Editor draft field '${operation.field}' exceeds the size limit`);
	}
	return patch;
}
function editorDraftErrorResponse(error) {
	const status = error.code === "EDITOR_DRAFT_STALE" ? 409 : error.code === "EDITOR_DRAFT_FIELD_FORBIDDEN" || error.code === "EDITOR_DRAFT_CAPABILITY_REQUIRED" ? 403 : error.code === "EDITOR_DRAFT_TOO_LARGE" ? 413 : error.code === "EDITOR_DRAFT_UNSUPPORTED_FIELD_TYPE" ? 422 : 400;
	return apiError(error.code, error.message, status);
}
function toRoleLevel$1(value) {
	if (value === 10 || value === 20 || value === 30 || value === 40 || value === 50) return value;
	return null;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isPermission(value) {
	return Object.hasOwn(Permissions, value);
}
function authorizePrivatePluginRouteRequest(routeMeta, request, user, tokenScopes) {
	const permission = routeMeta.permission ?? "plugins:manage";
	if (!isPermission(permission)) return apiError("INVALID_PLUGIN_ROUTE", "Plugin route declares an invalid permission", 500);
	let permissionUser;
	if (user) {
		const role = toRoleLevel$1(user.role);
		if (role === null) return apiError("INVALID_USER", "Authenticated user has an invalid role", 500);
		permissionUser = {
			id: user.id,
			role
		};
	} else permissionUser = user;
	const denied = requirePerm(permissionUser, permission);
	if (denied) return denied;
	const scopeError = requireScope({ tokenScopes }, "admin");
	if (scopeError) return scopeError;
	if (!tokenScopes && request.headers.get("X-EmDash-Request") !== "1") return apiError("CSRF_REJECTED", "Missing required header", 403);
	return null;
}
/** Dispatch a request through the production plugin-route policy boundary. */
async function dispatchPluginApiRequest({ runtime, pluginId, path, request, user, tokenScopes, invalidateContentCache, editorDispatch }) {
	const method = request.method.toUpperCase();
	const routeMeta = runtime.getPluginRouteMeta(pluginId, path);
	if (!routeMeta) return apiError("NOT_FOUND", "Plugin route not found", 404);
	if (!routeMeta.public) {
		const denied = authorizePrivatePluginRouteRequest(routeMeta, request, user, tokenScopes);
		if (denied) return denied;
	}
	if (routeMeta.methods && !routeMeta.methods.some((allowed) => allowed === method)) {
		const response = apiError("METHOD_NOT_ALLOWED", "Method not allowed", 405);
		response.headers.set("Allow", routeMeta.methods.join(", "));
		return response;
	}
	const caller = routeMeta.public ? void 0 : user ?? void 0;
	const result = await runtime.handlePluginApiRoute(pluginId, method, path, request, caller, invalidateContentCache, editorDispatch);
	if (!result.success) {
		const code = result.error?.code ?? "PLUGIN_ERROR";
		const message = code === "INTERNAL_ERROR" ? "Plugin route error" : result.error?.message ?? "Plugin route error";
		const status = result.status ?? (code === "NOT_FOUND" ? 404 : 400);
		const details = code !== "INTERNAL_ERROR" && result.error && "details" in result.error ? result.error.details : void 0;
		return apiError(code, message, status, isRecord(details) ? details : void 0);
	}
	let response;
	if (routeMeta.response === "raw") try {
		response = pluginRouteResponseFromWire(await pluginRouteResponseToWire(result.data, routeMeta.public ? { publicRequestUrl: request.url } : { allowExternalLocation: true }), method);
	} catch (error) {
		console.error(`[plugin:${pluginId}] Invalid raw route response:`, error);
		return apiError("INVALID_PLUGIN_RESPONSE", "Plugin returned an invalid response", 500);
	}
	else response = apiSuccess(result.data);
	if (response.ok && routeMeta.public && routeMeta.cacheControl && (method === "GET" || method === "HEAD")) response.headers.set("Cache-Control", routeMeta.cacheControl);
	else response.headers.set("Cache-Control", "private, no-store");
	return response;
}
var EDITOR_EXTENSION_REQUEST_MAX_BYTES = 262144;
/** Dispatch a saved-entry extension through ownership, route, and isolate policy. */
async function dispatchPluginEditorExtensionApiRequest({ runtime, pluginId, kind, extensionId, collection, entryId, request, user, tokenScopes, invalidateContentCache }) {
	const definition = runtime.getPluginEditorExtension(pluginId, kind, extensionId, collection);
	if (!definition) return apiError("NOT_FOUND", "Plugin editor extension not found", 404);
	const routeMeta = runtime.getPluginRouteMeta(pluginId, definition.extension.route);
	if (!routeMeta || routeMeta.public) return apiError("INVALID_PLUGIN_EDITOR_EXTENSION", "Plugin editor extension must reference a private route", 500);
	const denied = authorizePrivatePluginRouteRequest(routeMeta, request, user, tokenScopes);
	if (denied) return denied;
	const requestedLocale = new URL(request.url).searchParams.get("locale") || void 0;
	const contentResult = await runtime.handleContentGet(collection, entryId, requestedLocale);
	if (!contentResult.success) return contentResult.error?.code === "NOT_FOUND" ? apiError("NOT_FOUND", "Content item not found", 404) : apiError("CONTENT_GET_ERROR", "Failed to load content item", 500);
	const contentData = contentResult.data;
	const item = typeof contentData === "object" && contentData !== null && "item" in contentData ? contentData.item : null;
	if (typeof item !== "object" || item === null) return apiError("CONTENT_GET_ERROR", "Failed to load content item", 500);
	const authorId = "authorId" in item && typeof item.authorId === "string" ? item.authorId : "";
	let ownershipUser = user == null ? user : void 0;
	if (user) {
		const ownerRole = toRoleLevel$1(user.role);
		if (ownerRole === null) return apiError("INVALID_USER", "Authenticated user has an invalid role", 500);
		ownershipUser = {
			id: user.id,
			role: ownerRole
		};
	}
	const ownershipDenied = requireOwnerPerm(ownershipUser, authorId, "content:edit_own", "content:edit_any");
	if (ownershipDenied) return ownershipDenied;
	const canonicalId = "id" in item && typeof item.id === "string" ? item.id : null;
	const canonicalLocale = "locale" in item && typeof item.locale === "string" ? item.locale : null;
	const version = "version" in item && typeof item.version === "number" ? item.version : null;
	const baseRevision = typeof contentData === "object" && contentData !== null && "_rev" in contentData && typeof contentData._rev === "string" ? contentData._rev : null;
	if (!canonicalId || version === null) return apiError("CONTENT_GET_ERROR", "Content item has invalid identity", 500);
	let input;
	let editorBody;
	try {
		editorBody = await parseDeclaredPluginRouteInput(request, {
			body: "json",
			maxBytes: EDITOR_EXTENSION_REQUEST_MAX_BYTES
		});
	} catch (error) {
		if (error instanceof PluginRouteRequestError) return apiError(error.status === 413 ? "EDITOR_DRAFT_TOO_LARGE" : "INVALID_REQUEST", error.status === 413 ? "Editor interaction exceeds the size limit" : "Invalid editor interaction", error.status);
		return apiError("INVALID_REQUEST", "Editor interaction could not be read", 400);
	}
	if (kind === "panel") {
		if (!isRecord(editorBody)) return apiError("INVALID_REQUEST", "Editor panel interaction must be an object", 400);
		input = editorBody;
		if (!validateContentEditorPanelInteraction(input).valid) return apiError("INVALID_PLUGIN_UI_CONTEXT", "Invalid editor panel interaction", 400);
	} else {
		if (!isRecord(editorBody)) return apiError("INVALID_REQUEST", "Invalid editor action interaction", 400);
		input = {
			type: "editor_action",
			...Object.hasOwn(editorBody, "draft") ? { draft: editorBody.draft } : {}
		};
	}
	let validatedDraft = null;
	if (input.draft !== void 0) {
		if (!baseRevision) return apiError("EDITOR_DRAFT_INVALID", "Content item has no draft revision identity", 409);
		const collectionSchema = await runtime.getPluginEditorDraftSchema(collection);
		if (!collectionSchema) return apiError("NOT_FOUND", "Collection not found", 404);
		const draft = validateEditorDraftRequest({
			request: input.draft,
			collection: collectionSchema,
			entry: {
				id: canonicalId,
				locale: canonicalLocale,
				revision: baseRevision
			},
			readSelector: definition.extension.draft?.read,
			patchSelector: definition.extension.draft?.patch,
			canRead: definition.capabilities.includes("admin.editor-draft:read"),
			canPatch: definition.capabilities.includes("admin.editor-draft:patch")
		});
		if ("code" in draft) {
			console.warn(`[plugin:${pluginId}] Editor draft ${kind}/${extensionId} rejected: ${draft.code}`);
			return editorDraftErrorResponse(draft);
		}
		validatedDraft = draft;
		input = {
			...input,
			draft: draft.snapshot
		};
	}
	const headers = new Headers(request.headers);
	headers.delete("content-length");
	headers.delete("content-encoding");
	headers.set("Content-Type", "application/json");
	const pluginRequest = new Request(request.url, {
		method: "POST",
		headers,
		body: JSON.stringify(input)
	});
	const locale = resolveLocale(request);
	const response = await dispatchPluginApiRequest({
		runtime,
		pluginId,
		path: definition.extension.route,
		request: pluginRequest,
		user,
		tokenScopes,
		invalidateContentCache,
		editorDispatch: {
			kind,
			policy: definition.policy,
			ui: {
				surface: kind === "panel" ? "content-editor-panel" : "content-editor-action",
				locale,
				direction: getLocaleDir(locale),
				contentLocale: canonicalLocale ?? void 0,
				extensionId,
				entry: {
					collection,
					id: canonicalId,
					locale: canonicalLocale,
					version
				}
			}
		}
	});
	if (!response.ok) return response;
	const envelope = await response.clone().json();
	if (!isRecord(envelope) || !isRecord(envelope.data)) return apiError("INVALID_PLUGIN_RESPONSE", "Plugin returned an invalid response", 502);
	const data = envelope.data;
	if (data.patch === void 0 && !validatedDraft) return response;
	if (data.patch !== void 0 && !validatedDraft) return apiError("EDITOR_DRAFT_INVALID", "Plugin returned an editor draft patch without a draft invocation", 400);
	if (data.patch !== void 0) {
		const collectionSchema = await runtime.getPluginEditorDraftSchema(collection);
		if (!collectionSchema) return apiError("NOT_FOUND", "Collection not found", 404);
		const patch = validateEditorDraftPatch({
			patch: data.patch,
			collection: collectionSchema,
			allowedFields: validatedDraft?.patchFields ?? /* @__PURE__ */ new Set()
		});
		if ("code" in patch) {
			console.warn(`[plugin:${pluginId}] Editor draft ${kind}/${extensionId} rejected: ${patch.code}`);
			return editorDraftErrorResponse(patch);
		}
		data.patch = patch;
	}
	const finalResponse = apiSuccess({
		...data,
		editorInvocation: validatedDraft?.receipt
	});
	finalResponse.headers.set("Cache-Control", "private, no-store");
	return finalResponse;
}
export { dispatchPluginEditorExtensionApiRequest as n, dispatchPluginApiRequest as t };
