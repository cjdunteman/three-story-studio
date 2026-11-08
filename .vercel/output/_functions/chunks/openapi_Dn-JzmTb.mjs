import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { r as handleError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { C as redirectListResponseSchema, O as successEnvelope, S as notFoundSummaryResponseSchema, T as redirectsListQuery, _ as mediaDeleteResponseSchema, a as menuWithItemsSchema, b as notFoundPruneBody, c as updateMenuBody, d as createRedirectBody, i as menuListItemSchema, k as updateRedirectBody, l as updateMenuItemBody, n as createMenuItemBody, o as reorderMenuItemsBody, p as deleteResponseSchema, r as menuItemSchema, t as createMenuBody, u as apiErrorSchema, v as notFoundListQuery, w as redirectSchema, y as notFoundListResponseSchema } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { $ as orphanedTableListResponseSchema, $t as mediaListQuery, An as mediaUsageWorkListResponseSchema, At as updateWidgetBody, B as createSectionBody, C as contentListResponseSchema, Cn as mediaUsageDetailsQuery, Ct as updateBlockTypeBody, D as contentRestoreResponseSchema, Dn as mediaUsageRepairBody, Dt as updateSectionBody, E as contentResponseSchema, En as mediaUsageProgressSchema, F as contentUpdateBody, Ft as usersListQuery, G as entryLockAcquireBody, Gt as mediaDirectUploadBody, H as createTermBody, I as createBlockTypeBody, It as widgetAreaSchema, J as entryMutationConflictSchema, Jt as mediaFolderIdSchema, K as entryLockReleaseResponseSchema, Kt as mediaExistingResponseSchema, L as createCollectionBody, Lt as widgetAreaWithWidgetsAndCountSchema, M as contentTermsResponseSchema, Mn as mediaUsageWorkRetryConflictSchema, Mt as userListResponseSchema, N as contentTranslationsResponseSchema, Nn as mediaUsageWorkRetryResponseSchema, Nt as userSchema, O as contentRevisionConditionBody, On as mediaUsageRepairResponseSchema, Ot as updateTaxonomyDefBody, P as contentTrashQuery, Pt as userUpdateBody, Q as orphanRegisterBody, Qt as mediaGetQuery, R as createFieldBody, Rt as widgetAreaWithWidgetsSchema, S as contentListQuery, Sn as mediaUsageCollectionDeletionRetryResponseSchema, St as trashedContentListResponseSchema, T as contentPublishBody, Tn as mediaUsageProgressAdvanceResponseSchema, Tt as updateFieldBody, U as createWidgetAreaBody, Ut as mediaConfirmBody, W as createWidgetBody, Wt as mediaConfirmResponseSchema, X as fieldReorderBody, Xt as mediaFolderListResponseSchema, Y as fieldListResponseSchema, Yt as mediaFolderListQuery, Z as fieldResponseSchema, Zt as mediaFolderResponseSchema, _ as contentAuthorsResponseSchema, _n as mediaUsageActivationConflictSchema, _t as termGetResponseSchema, a as blockTypeResponseSchema, an as mediaReplaceResponseSchema, at as searchQuery, b as contentCreateBody, bn as mediaUsageCollectionDeletionListResponseSchema, bt as termReorderResponseSchema, cn as mediaUpdateBody, ct as searchSuggestQuery, dt as sectionsListQuery, en as mediaListReadResponseSchema, f as collectionGetQuery, fn as mediaUploadResponseSchema, ft as settingsUpdateBody, g as collectionWithFieldsResponseSchema, gn as mediaUsageActivationAdvanceResponseSchema, gt as taxonomyResponseSchema, h as collectionResponseSchema, hn as mediaUsageActivationAdvanceBody, ht as taxonomyListResponseSchema, i as blockTypeListResponseSchema, it as searchEnableBody, j as contentTermsBody, jn as mediaUsageWorkRetryBody, jt as userDetailSchema, k as contentScheduleBody, kn as mediaUsageWorkListQuery, kt as updateTermBody, lt as sectionListResponseSchema, m as collectionReorderBody, mn as mediaUploadUrlResponseSchema, mt as taxonomyDefTranslationsSchema, n as allowedDomainCreateBody, nn as mediaReadResponseSchema, nt as reorderWidgetsBody, on as mediaResponseSchema, ot as searchRebuildBody, p as collectionListResponseSchema, pn as mediaUploadUrlBody, pt as siteSettingsSchema, q as entryLockStatusSchema, qt as mediaFolderBody, r as allowedDomainUpdateBody, rn as mediaReplaceBody, sn as mediaStreamUploadResponseSchema, st as searchResponseSchema, t as activateBlockTypeVersionBody, tn as mediaListResponseSchema, tt as reorderTermsBody, ut as sectionSchema, vn as mediaUsageActivationStatusSchema, vt as termListQuery, wn as mediaUsageDetailsResponseSchema, wt as updateCollectionBody, x as contentItemSchema, xn as mediaUsageCollectionDeletionRetryBody, xt as termResponseSchema, y as contentCompareResponseSchema, yn as mediaUsageCollectionDeletionListQuery, yt as termListResponseSchema, zt as widgetSchema } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import { a as commentListQuery, c as createCommentBody, i as commentCountsResponseSchema, n as commentBulkBody, o as commentSchema, r as commentBulkResponseSchema, s as commentStatusBody, t as adminCommentListResponseSchema, u as publicCommentListResponseSchema } from "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import "./plan-CCoqxNoU_DAWLQxcP.mjs";
import "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import { _ as transferOperationListResponseSchema, a as transferCapabilitiesSchema, c as transferFileUploadResponseSchema, d as transferImportCreateResponseSchema, f as transferImportExecuteBody, g as transferMissingFilesResponseSchema, h as transferImportStatusResponseSchema, i as transferApprovalResponseSchema, l as transferImportAnalyzeBody, m as transferImportReceiptResponseSchema, n as transferApprovalListQuery, o as transferExportCreateBody, p as transferImportPlanResponseSchema, r as transferApprovalListResponseSchema, s as transferExportCreateResponseSchema, t as transferAdvanceResponseSchema, u as transferImportAnalyzeResponseSchema, v as transferOperationResponseSchema, y as transferPaginationQuery } from "./transfer-BbKfufJ4_BeTzObU9.mjs";
import { globalRegistry, object, registry, toJSONSchema } from "zod/v4";
import { globalRegistry as globalRegistry$1 } from "zod/v4/core";
import { z } from "zod";
// node_modules/emdash/dist/astro/routes/api/openapi.json.mjs
var openapi_json_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var isAnyZodType = (schema) => typeof schema === "object" && schema !== null && "_zod" in schema;
var createExamples = (examples, registry$1, path) => {
	if (!examples) return;
	const examplesObject = {};
	for (const [name, example] of Object.entries(examples)) examplesObject[name] = registry$1.addExample(example, [...path, name]);
	return examplesObject;
};
var createMediaTypeObject = (mediaType, ctx, path) => {
	const { schema, examples, ...rest } = mediaType;
	const mediaTypeObject = rest;
	if (isAnyZodType(schema)) mediaTypeObject.schema = ctx.registry.addSchema(schema, [...path, "schema"], {
		io: ctx.io,
		source: { type: "mediaType" }
	});
	else mediaTypeObject.schema = schema;
	if (examples) mediaTypeObject.examples = createExamples(examples, ctx.registry, [...path, "examples"]);
	return mediaTypeObject;
};
var createContent = (content, ctx, path) => {
	const contentObject = {};
	for (const [mediaType, mediaTypeObject] of Object.entries(content)) if (mediaTypeObject) contentObject[mediaType] = createMediaTypeObject(mediaTypeObject, ctx, [...path, mediaType]);
	return contentObject;
};
var unwrapZodObject = (zodType, io, path) => {
	const def = zodType._zod.def;
	switch (def.type) {
		case "object": return zodType;
		case "lazy": return unwrapZodObject(def.getter(), io, path);
		case "pipe":
			if (io === "input") return unwrapZodObject(def.in, io, path);
			return unwrapZodObject(def.out, io, path);
	}
	throw new Error(`Failed to unwrap ZodObject from type: ${zodType._zod.def.type} at ${path.join(" > ")}`);
};
var isRequired = (zodType, io) => {
	if (io === "input") return zodType._zod.optin === void 0;
	return zodType._zod.optout === void 0;
};
var createHeaders = (headers, registry$1, path) => {
	if (!headers) return;
	if (isAnyZodType(headers)) {
		const zodObject = unwrapZodObject(headers, "output", path);
		const headersObject = {};
		for (const [key, zodSchema] of Object.entries(zodObject._zod.def.shape)) headersObject[key] = registry$1.addHeader(zodSchema, [...path, key]);
		return headersObject;
	}
	return headers;
};
var createLinks = (links, registry$1, path) => {
	if (!links) return;
	const linksObject = {};
	for (const [name, link] of Object.entries(links)) linksObject[name] = registry$1.addLink(link, [...path, name]);
	return linksObject;
};
var createManualParameters = (parameters, registry$1, path) => {
	if (!parameters) return;
	const parameterObjects = [];
	for (const parameter of parameters) {
		if (isAnyZodType(parameter)) {
			const paramObject = registry$1.addParameter(parameter, [...path, "parameters"]);
			parameterObjects.push(paramObject);
			continue;
		}
		parameterObjects.push(parameter);
	}
	return parameterObjects;
};
var createParameters = (requestParams, registry$1, path) => {
	if (!requestParams) return;
	const parameterObjects = [];
	for (const [location, schema] of Object.entries(requestParams ?? {})) {
		const zodObject = unwrapZodObject(schema, "input", path);
		for (const [name, zodSchema] of Object.entries(zodObject._zod.def.shape)) {
			const paramObject = registry$1.addParameter(zodSchema, [
				...path,
				location,
				name
			], { location: {
				in: location,
				name
			} });
			parameterObjects.push(paramObject);
		}
	}
	return parameterObjects;
};
var isISpecificationExtension = (key) => key.startsWith("x-");
var createCallbacks = (callbacks, registry$1, path) => {
	if (!callbacks) return;
	const callbacksObject = {};
	for (const [name, value] of Object.entries(callbacks)) {
		if (isISpecificationExtension(name)) {
			callbacksObject[name] = value;
			continue;
		}
		callbacksObject[name] = registry$1.addCallback(value, [...path, name]);
	}
	return callbacksObject;
};
var createResponses = (responses, registry$1, path) => {
	if (!responses) return;
	const responsesObject = {};
	for (const [statusCode, response] of Object.entries(responses)) {
		if (!response) continue;
		if (isISpecificationExtension(statusCode)) {
			responsesObject[statusCode] = response;
			continue;
		}
		if ("$ref" in response) {
			responsesObject[statusCode] = response;
			continue;
		}
		responsesObject[statusCode] = registry$1.addResponse(response, [...path, statusCode]);
	}
	return responsesObject;
};
var createOperation = (operation, registry$1, path) => {
	const { parameters, requestParams, requestBody, responses, callbacks, ...rest } = operation;
	const operationObject = rest;
	const maybeManualParameters = createManualParameters(parameters, registry$1, [...path, "parameters"]);
	const maybeRequestParams = createParameters(requestParams, registry$1, [...path, "requestParams"]);
	if (maybeRequestParams || maybeManualParameters) operationObject.parameters = [...maybeRequestParams ?? [], ...maybeManualParameters ?? []];
	const maybeRequestBody = requestBody && registry$1.addRequestBody(requestBody, path);
	if (maybeRequestBody) operationObject.requestBody = maybeRequestBody;
	const maybeResponses = createResponses(responses, registry$1, [...path, "responses"]);
	if (maybeResponses) operationObject.responses = maybeResponses;
	const maybeCallbacks = createCallbacks(callbacks, registry$1, [...path, "callbacks"]);
	if (maybeCallbacks) operationObject.callbacks = maybeCallbacks;
	return operationObject;
};
var createPaths = (paths, registry$1, path) => {
	if (!paths) return;
	const pathsObject = {};
	for (const [singlePath, pathItemObject] of Object.entries(paths)) {
		if (isISpecificationExtension(singlePath)) {
			pathsObject[singlePath] = pathItemObject;
			continue;
		}
		pathsObject[singlePath] = registry$1.addPathItem(pathItemObject, [...path, singlePath]);
	}
	return pathsObject;
};
var openApiVersions = [
	"3.0.0",
	"3.0.1",
	"3.0.2",
	"3.0.3",
	"3.1.0",
	"3.1.1"
];
var satisfiesVersion = (test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against);
var override = (ctx) => {
	const def = ctx.zodSchema._zod.def;
	switch (def.type) {
		case "bigint":
			ctx.jsonSchema.type = "integer";
			ctx.jsonSchema.format = "int64";
			break;
		case "union": {
			if ("discriminator" in def && typeof def.discriminator === "string") {
				ctx.jsonSchema.oneOf ??= ctx.jsonSchema.anyOf;
				delete ctx.jsonSchema.anyOf;
				ctx.jsonSchema.type = "object";
				ctx.jsonSchema.discriminator = { propertyName: def.discriminator };
				const mapping = {};
				for (const [index, obj] of Object.entries(ctx.jsonSchema.oneOf)) {
					const ref = obj.$ref;
					if (!ref) {
						delete ctx.jsonSchema.discriminator;
						return;
					}
					const discriminatorValues = def.options[Number(index)]._zod.propValues?.[def.discriminator];
					if (!discriminatorValues?.size) return;
					for (const value of [...discriminatorValues ?? []]) {
						if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") return;
						mapping[String(value)] = ref;
					}
				}
				ctx.jsonSchema.discriminator.mapping = mapping;
			}
			const meta = globalRegistry.get(ctx.zodSchema);
			if (typeof meta?.unionOneOf === "boolean") {
				if (meta.unionOneOf) {
					ctx.jsonSchema.oneOf = ctx.jsonSchema.anyOf;
					delete ctx.jsonSchema.anyOf;
				}
				delete ctx.jsonSchema.unionOneOf;
			}
			break;
		}
		case "date":
			ctx.jsonSchema.type = "string";
			break;
		case "literal":
			if (def.values.includes(void 0)) break;
			break;
		case "undefined": ctx.jsonSchema.not = {};
	}
};
var validate = (ctx, opts, previousContext) => {
	if (previousContext.context && ctx.zodSchema._zod.parent !== previousContext.context.zodSchema) {
		if (previousContext.context.zodSchema._zod.def.type === "pipe") throw new Error(`Zod transform found at ${previousContext.context.path.join(" > ")} are not supported in output schemas. Please use \`.overwrite()\` or wrap the schema in a \`.pipe()\` or assign it manual metadata with \`.meta()\``);
		throw new Error(`Zod schema of type \`${previousContext.context.zodSchema._zod.def.type}\` at ${previousContext.context?.path.join(" > ")} cannot be represented in OpenAPI. Please assign it metadata with \`.meta()\``);
	}
	previousContext.context = void 0;
	if (Object.keys(ctx.jsonSchema).length) return;
	const def = ctx.zodSchema._zod.def;
	const allowEmptySchema = opts.allowEmptySchema?.[def.type];
	if (allowEmptySchema === true || allowEmptySchema?.[ctx.io]) return;
	switch (def.type) {
		case "optional":
			validate({
				...ctx,
				zodSchema: def.innerType
			}, opts, previousContext);
			return;
		case "any": return;
		case "unknown": return;
		case "pipe":
			if (ctx.io === "output") {
				if (!ctx.zodSchema._zod.parent) {
					previousContext.context = ctx;
					return;
				}
			}
			return;
		case "transform":
			if (ctx.io === "output") return;
			break;
		case "literal":
			if (def.values.includes(void 0)) throw new Error(`Zod literal at ${ctx.path.join(" > ")} cannot include \`undefined\` as a value. Please use \`z.undefined()\` or \`.optional()\` instead.`);
			return;
		case "custom": if (!ctx.zodSchema._zod.parent) {
			previousContext.context = ctx;
			return;
		}
	}
	throw new Error(`Zod schema of type \`${def.type}\` at ${ctx.path.join(" > ")} cannot be represented in OpenAPI. Please assign it metadata with \`.meta()\``);
};
var renameComponents = (components, outputIds, ctx, refPath) => {
	const componentsToRename = /* @__PURE__ */ new Map();
	if (ctx.io === "input") return componentsToRename;
	const componentDependencies = /* @__PURE__ */ new Map();
	const stringifiedComponents = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(components)) {
		const stringified = JSON.stringify(value);
		const regex = new RegExp(`"${refPath}([^"]+)"`, "g");
		const matches = stringified.matchAll(regex);
		const dependencies = /* @__PURE__ */ new Set();
		for (const match of matches) {
			const dep = match[1];
			if (dep !== key) dependencies.add(dep);
		}
		stringifiedComponents.set(key, stringified);
		componentDependencies.set(key, { dependencies });
	}
	for (const [key] of stringifiedComponents) {
		if (!ctx.registry.components.schemas.ids.get(key)) continue;
		if (isDependencyPure(componentDependencies, stringifiedComponents, ctx.registry, key)) continue;
		const newName = outputIds.get(key) ?? `${key}${ctx.opts.outputIdSuffix ?? "Output"}`;
		componentsToRename.set(key, newName);
		components[newName] = components[key];
		delete components[key];
	}
	return componentsToRename;
};
var isDependencyPure = (componentDependencies, stringifiedComponents, registry$1, key, visited = /* @__PURE__ */ new Set()) => {
	if (visited.has(key)) return true;
	const dependencies = componentDependencies.get(key);
	if (dependencies.pure !== void 0) return dependencies.pure;
	const stringified = stringifiedComponents.get(key);
	const component = registry$1.components.schemas.ids.get(key);
	if (component && stringified !== JSON.stringify(component)) {
		dependencies.pure = false;
		return false;
	}
	visited.add(key);
	const result = [...dependencies.dependencies].every((dep) => isDependencyPure(componentDependencies, stringifiedComponents, registry$1, dep, new Set(visited)));
	dependencies.pure = result;
	return result;
};
var zodOpenApiMetadataFields = [
	"param",
	"header",
	"unusedIO",
	"override",
	"outputId"
];
var deleteZodOpenApiMeta = (jsonSchema) => {
	zodOpenApiMetadataFields.forEach((field) => {
		delete jsonSchema[field];
	});
};
var deleteInvalidJsonSchemaFields = (jsonSchema) => {
	delete jsonSchema.$schema;
	delete jsonSchema.id;
	delete jsonSchema.$id;
};
var createSchemas = (schemas, ctx) => {
	const refPath = ctx.opts.schemaRefPath ?? "#/components/schemas/";
	const entries = {};
	for (const [name, { zodType }] of Object.entries(schemas)) entries[name] = zodType;
	const zodRegistry = registry();
	zodRegistry.add(object(entries), { id: "zodOpenApiCreateSchema" });
	for (const [id, { zodType }] of ctx.registry.components.schemas.manual) zodRegistry.add(zodType, { id });
	const outputIds = /* @__PURE__ */ new Map();
	const defsName = satisfiesVersion(ctx.openapiVersion ?? "3.1.0", "3.1.0") ? "$defs" : "definitions";
	const previousContext = {};
	const jsonSchema = toJSONSchema(zodRegistry, {
		override(context) {
			const meta = globalRegistry.get(context.zodSchema);
			if (meta?.outputId && meta?.id) outputIds.set(meta.id, meta.outputId);
			if (context.jsonSchema.$ref) return;
			const enrichedContext = {
				...context,
				io: ctx.io
			};
			override(enrichedContext);
			if (typeof ctx.opts.override === "function") ctx.opts.override(enrichedContext);
			if (typeof meta?.override === "function") {
				meta.override(enrichedContext);
				delete context.jsonSchema.override;
			}
			if (typeof meta?.override === "object" && meta.override !== null) {
				Object.assign(context.jsonSchema, meta.override);
				delete context.jsonSchema.override;
			}
			deleteInvalidJsonSchemaFields(context.jsonSchema);
			deleteZodOpenApiMeta(context.jsonSchema);
			validate(enrichedContext, ctx.opts, previousContext);
		},
		io: ctx.io,
		unrepresentable: "any",
		reused: ctx.opts.reused,
		cycles: ctx.opts.cycles,
		target: satisfiesVersion(ctx.openapiVersion ?? "3.1.0", "3.1.0") ? void 0 : "openapi-3.0",
		uri: (id) => id === "__shared" ? `#ZOD_OPENAPI/${id}` : `#ZOD_OPENAPI/__shared#/${defsName}/${id}`
	});
	const components = jsonSchema.schemas.__shared?.[defsName] ?? {};
	jsonSchema.schemas.__shared ??= { [defsName]: components };
	const dynamicComponents = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(components)) {
		deleteInvalidJsonSchemaFields(value);
		if (/^schema\d+$/.test(key)) {
			const newName = `__schema${ctx.registry.components.schemas.dynamicSchemaCount++}`;
			dynamicComponents.set(key, `"${refPath}${newName}"`);
			if (newName !== key) {
				components[newName] = value;
				delete components[key];
			}
		}
	}
	for (const [key] of ctx.registry.components.schemas.manual) {
		const manualComponent = jsonSchema.schemas[key];
		if (!manualComponent) continue;
		deleteInvalidJsonSchemaFields(manualComponent);
	}
	const manualUsed = {};
	const parsedJsonSchema = JSON.parse(JSON.stringify(jsonSchema).replace(/"#ZOD_OPENAPI\/__shared#\/(?:\$defs|definitions)\/([^"]+)"/g, (_, match) => {
		const dynamic = dynamicComponents.get(match);
		if (dynamic) return dynamic;
		if (ctx.registry.components.schemas.manual.get(match)) manualUsed[match] = true;
		return `"${refPath}${match}"`;
	}));
	const parsedComponents = parsedJsonSchema.schemas.__shared?.[defsName] ?? {};
	parsedJsonSchema.schemas.__shared ??= { [defsName]: parsedComponents };
	for (const [key] of ctx.registry.components.schemas.manual) {
		const manualComponent = parsedJsonSchema.schemas[key];
		if (!manualComponent) continue;
		if (manualUsed[key]) {
			if (parsedComponents[key]) throw new Error(`Component "${key}" is already registered as a component in the registry`);
			parsedComponents[key] = manualComponent;
		}
	}
	const componentsToRename = renameComponents(parsedComponents, outputIds, ctx, refPath);
	if (!componentsToRename.size) {
		const parsedSchemas = parsedJsonSchema.schemas.zodOpenApiCreateSchema?.properties;
		delete parsedJsonSchema.schemas.zodOpenApiCreateSchema;
		delete parsedJsonSchema.schemas.__shared;
		return {
			schemas: parsedSchemas,
			components: parsedComponents,
			manual: parsedJsonSchema.schemas
		};
	}
	const renamedJsonSchema = JSON.parse(JSON.stringify(parsedJsonSchema).replace(new RegExp(`"${refPath}([^"]+)"`, "g"), (_, match) => {
		const replacement = componentsToRename.get(match);
		if (replacement) return `"${refPath}${replacement}"`;
		return `"${refPath}${match}"`;
	}));
	const renamedSchemas = renamedJsonSchema.schemas.zodOpenApiCreateSchema?.properties;
	const renamedComponents = renamedJsonSchema.schemas.__shared?.[defsName] ?? {};
	delete renamedJsonSchema.schemas.zodOpenApiCreateSchema;
	delete renamedJsonSchema.schemas.__shared;
	return {
		schemas: renamedSchemas,
		components: renamedComponents,
		manual: renamedJsonSchema.schemas
	};
};
var createRegistry = (components) => {
	const registry$1 = {
		components: {
			schemas: {
				dynamicSchemaCount: 0,
				input: /* @__PURE__ */ new Map(),
				output: /* @__PURE__ */ new Map(),
				ids: /* @__PURE__ */ new Map(),
				manual: /* @__PURE__ */ new Map()
			},
			headers: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			requestBodies: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			responses: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			parameters: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			callbacks: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			pathItems: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			securitySchemes: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			links: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			},
			examples: {
				ids: /* @__PURE__ */ new Map(),
				seen: /* @__PURE__ */ new WeakMap()
			}
		},
		addSchema: (schema, path, opts) => {
			const schemaObject = {};
			registry$1.components.schemas[opts.io].set(path.join(" > "), {
				schemaObject,
				zodType: schema,
				source: {
					path,
					...opts?.source
				}
			});
			return schemaObject;
		},
		addParameter: (parameter, path, opts) => {
			const seenParameter = registry$1.components.parameters.seen.get(parameter);
			if (seenParameter) return seenParameter;
			const meta = globalRegistry$1.get(parameter);
			const name = opts?.location?.name ?? meta?.param?.name;
			const inLocation = opts?.location?.in ?? meta?.param?.in;
			if (opts?.location?.name && meta?.param?.name || opts?.location?.in && meta?.param?.in) throw new Error(`Parameter at ${path.join(" > ")} has both \`.meta({ param: { name, in } })\` and \`.meta({ param: { location: { in, name } } })\` information`);
			if (!name || !inLocation) throw new Error(`Parameter at ${path.join(" > ")} is missing \`.meta({ param: { name, in } })\` information`);
			const schemaObject = registry$1.addSchema(parameter, [
				...path,
				inLocation,
				name,
				"schema"
			], {
				io: "input",
				source: {
					type: "parameter",
					location: {
						in: inLocation,
						name
					}
				}
			});
			const { id: metaId, examples, ...rest } = meta?.param ?? {};
			const parameterObject = {
				in: inLocation,
				name,
				schema: schemaObject,
				...rest
			};
			const examplesObject = createExamples(examples, registry$1, [
				...path,
				inLocation,
				name,
				"examples"
			]);
			if (examplesObject) parameterObject.examples = examplesObject;
			if (isRequired(parameter, "input")) parameterObject.required = true;
			if (!parameterObject.description && meta?.description) parameterObject.description = meta.description;
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.parameters.ids.has(id)) throw new Error(`Schema "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/parameters/${id}` };
				registry$1.components.parameters.seen.set(parameter, ref);
				registry$1.components.parameters.ids.set(id, parameterObject);
				if (opts?.manualId) return parameterObject;
				return ref;
			}
			if (opts?.location?.name || opts?.location?.in) return parameterObject;
			registry$1.components.parameters.seen.set(parameter, parameterObject);
			return parameterObject;
		},
		addHeader: (header, path, opts) => {
			const seenHeader = registry$1.components.headers.seen.get(header);
			if (seenHeader) return seenHeader;
			const meta = globalRegistry$1.get(header);
			const { id: metaId, ...rest } = meta?.header ?? {};
			const id = metaId ?? opts?.manualId;
			const headerObject = rest;
			if (isRequired(header, "output")) headerObject.required = true;
			if (!headerObject.description && meta?.description) headerObject.description = meta.description;
			headerObject.schema = registry$1.addSchema(header, [...path, "schema"], {
				io: "output",
				source: { type: "header" }
			});
			if (id) {
				if (registry$1.components.schemas.ids.has(id)) throw new Error(`Schema "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/headers/${id}` };
				registry$1.components.headers.ids.set(id, headerObject);
				registry$1.components.headers.seen.set(header, ref);
				if (opts?.manualId) return headerObject;
				return ref;
			}
			registry$1.components.headers.seen.set(header, headerObject);
			return headerObject;
		},
		addRequestBody: (requestBody, path, opts) => {
			const seenRequestBody = registry$1.components.requestBodies.seen.get(requestBody);
			if (seenRequestBody) return seenRequestBody;
			const { content, id: metaId, ...rest } = requestBody;
			const requestBodyObject = {
				...rest,
				content: createContent(content, {
					registry: registry$1,
					io: "input"
				}, [...path, "content"])
			};
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.requestBodies.ids.has(id)) throw new Error(`RequestBody "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/requestBodies/${id}` };
				registry$1.components.requestBodies.ids.set(id, requestBodyObject);
				registry$1.components.requestBodies.seen.set(requestBody, ref);
				if (opts?.manualId) return requestBodyObject;
				return ref;
			}
			registry$1.components.requestBodies.seen.set(requestBody, requestBodyObject);
			return requestBodyObject;
		},
		addPathItem: (pathItem, path, opts) => {
			const seenPathItem = registry$1.components.pathItems.seen.get(pathItem);
			if (seenPathItem) return seenPathItem;
			const pathItemObject = {};
			const { id: metaId, ...rest } = pathItem;
			const id = metaId ?? opts?.manualId;
			for (const [key, value] of Object.entries(rest)) {
				if (isISpecificationExtension(key)) {
					pathItemObject[key] = value;
					continue;
				}
				if (key === "get" || key === "put" || key === "post" || key === "delete" || key === "options" || key === "head" || key === "patch" || key === "trace") {
					pathItemObject[key] = createOperation(value, registry$1, [...path, key]);
					continue;
				}
				if (key === "parameters") {
					pathItemObject[key] = createManualParameters(value, registry$1, [...path, key]);
					continue;
				}
				pathItemObject[key] = value;
			}
			if (id) {
				if (registry$1.components.pathItems.ids.has(id)) throw new Error(`PathItem "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/pathItems/${id}` };
				registry$1.components.pathItems.ids.set(id, pathItemObject);
				registry$1.components.pathItems.seen.set(pathItem, ref);
				if (opts?.manualId) return pathItemObject;
				return ref;
			}
			registry$1.components.pathItems.seen.set(pathItem, pathItemObject);
			return pathItemObject;
		},
		addResponse: (response, path, opts) => {
			const seenResponse = registry$1.components.responses.seen.get(response);
			if (seenResponse) return seenResponse;
			const { content, headers, links, id: metaId, ...rest } = response;
			const responseObject = rest;
			const maybeHeaders = createHeaders(headers, registry$1, [...path, "headers"]);
			if (maybeHeaders) responseObject.headers = maybeHeaders;
			if (content) responseObject.content = createContent(content, {
				registry: registry$1,
				io: "output"
			}, [...path, "content"]);
			if (links) responseObject.links = createLinks(links, registry$1, [...path, "links"]);
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.responses.ids.has(id)) throw new Error(`Response "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/responses/${id}` };
				registry$1.components.responses.ids.set(id, responseObject);
				registry$1.components.responses.seen.set(response, ref);
				if (opts?.manualId) return responseObject;
				return ref;
			}
			registry$1.components.responses.seen.set(response, responseObject);
			return responseObject;
		},
		addCallback: (callback, path, opts) => {
			const seenCallback = registry$1.components.callbacks.seen.get(callback);
			if (seenCallback) return seenCallback;
			const { id: metaId, ...rest } = callback;
			const callbackObject = {};
			for (const [name, pathItem] of Object.entries(rest)) {
				if (isISpecificationExtension(name)) {
					callbackObject[name] = pathItem;
					continue;
				}
				callbackObject[name] = registry$1.addPathItem(pathItem, [...path, name]);
			}
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.callbacks.ids.has(id)) throw new Error(`Callback "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/callbacks/${id}` };
				registry$1.components.callbacks.ids.set(id, callbackObject);
				registry$1.components.callbacks.seen.set(callback, ref);
				if (opts?.manualId) return callbackObject;
				return ref;
			}
			registry$1.components.callbacks.seen.set(callback, callbackObject);
			return callbackObject;
		},
		addSecurityScheme: (securityScheme, path, opts) => {
			const seenSecurityScheme = registry$1.components.securitySchemes.seen.get(securityScheme);
			if (seenSecurityScheme) return seenSecurityScheme;
			const { id: metaId, ...rest } = securityScheme;
			const securitySchemeObject = rest;
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.securitySchemes.ids.has(id)) throw new Error(`SecurityScheme "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/securitySchemes/${id}` };
				registry$1.components.securitySchemes.ids.set(id, securitySchemeObject);
				registry$1.components.securitySchemes.seen.set(securityScheme, ref);
				if (opts?.manualId) return securitySchemeObject;
				return ref;
			}
			registry$1.components.securitySchemes.seen.set(securityScheme, securitySchemeObject);
			return securitySchemeObject;
		},
		addLink: (link, path, opts) => {
			const seenLink = registry$1.components.links.seen.get(link);
			if (seenLink) return seenLink;
			const { id: metaId, ...rest } = link;
			const linkObject = rest;
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.links.ids.has(id)) throw new Error(`Link "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/links/${id}` };
				registry$1.components.links.ids.set(id, linkObject);
				registry$1.components.links.seen.set(link, ref);
				if (opts?.manualId) return linkObject;
				return ref;
			}
			registry$1.components.links.seen.set(link, linkObject);
			return linkObject;
		},
		addExample: (example, path, opts) => {
			const seenExample = registry$1.components.examples.seen.get(example);
			if (seenExample) return seenExample;
			const { id: metaId, ...rest } = example;
			const exampleObject = rest;
			const id = metaId ?? opts?.manualId;
			if (id) {
				if (registry$1.components.examples.ids.has(id)) throw new Error(`Example "${id}" at ${path.join(" > ")} is already registered`);
				const ref = { $ref: `#/components/examples/${id}` };
				registry$1.components.examples.ids.set(id, exampleObject);
				registry$1.components.examples.seen.set(example, ref);
				if (opts?.manualId) return exampleObject;
				return ref;
			}
			registry$1.components.examples.seen.set(example, exampleObject);
			return exampleObject;
		}
	};
	registerSchemas(components?.schemas, registry$1);
	registerParameters(components?.parameters, registry$1);
	registerHeaders(components?.headers, registry$1);
	registerResponses(components?.responses, registry$1);
	registerPathItems(components?.pathItems, registry$1);
	registerRequestBodies(components?.requestBodies, registry$1);
	registerCallbacks(components?.callbacks, registry$1);
	registerSecuritySchemes(components?.securitySchemes, registry$1);
	registerLinks(components?.links, registry$1);
	registerExamples(components?.examples, registry$1);
	return registry$1;
};
var registerSchemas = (schemas, registry$1) => {
	if (!schemas) return;
	for (const [key, schema] of Object.entries(schemas)) {
		if (isAnyZodType(schema)) {
			const id = globalRegistry$1.get(schema)?.id ?? key;
			registry$1.components.schemas.manual.set(id, {
				input: { schemaObject: {} },
				output: { schemaObject: {} },
				zodType: schema
			});
			continue;
		}
		registry$1.components.schemas.ids.set(key, schema);
	}
};
var registerParameters = (parameters, registry$1) => {
	if (!parameters) return;
	for (const [key, schema] of Object.entries(parameters)) {
		if (isAnyZodType(schema)) {
			const path = [
				"components",
				"parameters",
				key
			];
			registry$1.addParameter(schema, path, { manualId: key });
			continue;
		}
		registry$1.components.parameters.ids.set(key, schema);
	}
};
var registerHeaders = (headers, registry$1) => {
	if (!headers) return;
	for (const [key, schema] of Object.entries(headers)) {
		if (isAnyZodType(schema)) {
			const path = [
				"components",
				"headers",
				key
			];
			registry$1.addHeader(schema, path, { manualId: key });
			continue;
		}
		registry$1.components.headers.ids.set(key, schema);
	}
};
var registerResponses = (responses, registry$1) => {
	if (!responses) return;
	for (const [key, schema] of Object.entries(responses)) {
		const responseObject = registry$1.addResponse(schema, [
			"components",
			"responses",
			key
		], { manualId: key });
		registry$1.components.responses.ids.set(key, responseObject);
		registry$1.components.responses.seen.set(schema, responseObject);
	}
};
var registerRequestBodies = (requestBodies, registry$1) => {
	if (!requestBodies) return;
	for (const [key, schema] of Object.entries(requestBodies)) {
		if (isAnyZodType(schema)) {
			registry$1.addRequestBody(schema, [
				"components",
				"requestBodies",
				key
			], { manualId: key });
			continue;
		}
		registry$1.components.requestBodies.ids.set(key, schema);
	}
};
var registerCallbacks = (callbacks, registry$1) => {
	if (!callbacks) return;
	for (const [key, schema] of Object.entries(callbacks)) registry$1.addCallback(schema, [
		"components",
		"callbacks",
		key
	], { manualId: key });
};
var registerPathItems = (pathItems, registry$1) => {
	if (!pathItems) return;
	for (const [key, schema] of Object.entries(pathItems)) registry$1.addPathItem(schema, [
		"components",
		"pathItems",
		key
	], { manualId: key });
};
var registerSecuritySchemes = (securitySchemes, registry$1) => {
	if (!securitySchemes) return;
	for (const [key, schema] of Object.entries(securitySchemes)) registry$1.addSecurityScheme(schema, [
		"components",
		"securitySchemes",
		key
	], { manualId: key });
};
var registerLinks = (links, registry$1) => {
	if (!links) return;
	for (const [key, schema] of Object.entries(links)) registry$1.addLink(schema, [
		"components",
		"links",
		key
	], { manualId: key });
};
var registerExamples = (examples, registry$1) => {
	if (!examples) return;
	for (const [key, schema] of Object.entries(examples)) registry$1.components.examples.ids.set(key, schema);
};
var createIOSchemas = (ctx) => {
	const { schemas, components, manual } = createSchemas(Object.fromEntries(ctx.registry.components.schemas[ctx.io]), ctx);
	for (const [key, schema] of Object.entries(components)) ctx.registry.components.schemas.ids.set(key, schema);
	for (const [key, schema] of Object.entries(schemas)) {
		const ioSchema = ctx.registry.components.schemas[ctx.io].get(key);
		if (ioSchema) Object.assign(ioSchema.schemaObject, schema);
	}
	for (const [key, value] of Object.entries(manual)) {
		const manualSchema = ctx.registry.components.schemas.manual.get(key);
		if (!manualSchema) continue;
		if (components[key]) manualSchema[ctx.io].used = true;
		Object.assign(manualSchema[ctx.io].schemaObject, value);
	}
};
var createManualSchemas = (registry$1) => {
	for (const [key, value] of registry$1.components.schemas.manual) if (!value.input.used) {
		const schema = value[globalRegistry$1.get(value.zodType)?.unusedIO ?? "output"].schemaObject;
		registry$1.components.schemas.ids.set(key, schema);
	}
};
var createComponents = (registry$1, opts, openapiVersion) => {
	createIOSchemas({
		registry: registry$1,
		io: "input",
		opts,
		openapiVersion
	});
	createIOSchemas({
		registry: registry$1,
		io: "output",
		opts,
		openapiVersion
	});
	createManualSchemas(registry$1);
	const components = {};
	if (registry$1.components.schemas.ids.size > 0) components.schemas = Object.fromEntries(registry$1.components.schemas.ids);
	if (registry$1.components.headers.ids.size > 0) components.headers = Object.fromEntries(registry$1.components.headers.ids);
	if (registry$1.components.requestBodies.ids.size > 0) components.requestBodies = Object.fromEntries(registry$1.components.requestBodies.ids);
	if (registry$1.components.responses.ids.size > 0) components.responses = Object.fromEntries(registry$1.components.responses.ids);
	if (registry$1.components.parameters.ids.size > 0) components.parameters = Object.fromEntries(registry$1.components.parameters.ids);
	if (registry$1.components.callbacks.ids.size > 0) components.callbacks = Object.fromEntries(registry$1.components.callbacks.ids);
	if (registry$1.components.pathItems.ids.size > 0) components.pathItems = Object.fromEntries(registry$1.components.pathItems.ids);
	if (registry$1.components.securitySchemes.ids.size > 0) components.securitySchemes = Object.fromEntries(registry$1.components.securitySchemes.ids);
	if (registry$1.components.links.ids.size > 0) components.links = Object.fromEntries(registry$1.components.links.ids);
	if (registry$1.components.examples.ids.size > 0) components.examples = Object.fromEntries(registry$1.components.examples.ids);
	return components;
};
var createDocument = (zodOpenApiObject, opts = {}) => {
	const { paths, webhooks, components, ...rest } = zodOpenApiObject;
	const document = rest;
	const registry = createRegistry(components);
	const createdPaths = createPaths(paths, registry, ["paths"]);
	if (createdPaths) document.paths = createdPaths;
	const createdWebhooks = createPaths(webhooks, registry, ["webhooks"]);
	if (createdWebhooks) document.webhooks = createdWebhooks;
	const createdComponents = createComponents(registry, opts, zodOpenApiObject.openapi);
	if (Object.keys(createdComponents).length > 0) document.components = createdComponents;
	return document;
};
/**
* OpenAPI 3.1 document generator.
*
* Builds the full OpenAPI spec from Zod schemas. The Zod schemas are the
* single source of truth -- we never hand-write OpenAPI YAML.
*
* Covers all public API domains.
*/
var JSON_CONTENT = "application/json";
var MULTIPART_CONTENT = "multipart/form-data";
/** Standard error responses shared across all authenticated endpoints */
function standardErrors(...codes) {
	const responses = {};
	const errorMap = {
		400: "Bad Request",
		401: "Not authenticated",
		403: "Forbidden",
		404: "Not Found",
		409: "Conflict",
		410: "Gone",
		411: "Length Required",
		413: "Payload Too Large",
		422: "Unprocessable Entity",
		500: "Internal Server Error",
		503: "Service Unavailable"
	};
	for (const code of codes) responses[String(code)] = {
		description: errorMap[code] ?? `Error ${code}`,
		content: { [JSON_CONTENT]: { schema: apiErrorSchema } }
	};
	return responses;
}
/** Common auth error responses (401 + 403) */
var authErrors = standardErrors(401, 403);
var entryPathParams = z.object({
	collection: z.string().meta({ description: "Collection slug" }),
	id: z.string().meta({ description: "Content ID or slug" })
});
/** 409 for optimistic-concurrency or edit-lock conflicts. */
var entryMutationConflict = { "409": {
	description: "The content changed or another editor holds its edit lock",
	content: { [JSON_CONTENT]: { schema: entryMutationConflictSchema } }
} };
var contentPaths = {
	"/_emdash/api/content/{collection}": {
		get: {
			operationId: "listContent",
			summary: "List content items",
			description: "Returns a paginated list of content items in the specified collection.",
			tags: ["Content"],
			requestParams: {
				path: z.object({ collection: z.string().meta({
					description: "Collection slug",
					examples: ["posts"]
				}) }),
				query: contentListQuery
			},
			responses: {
				"200": {
					description: "Content list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		},
		post: {
			operationId: "createContent",
			summary: "Create a content item",
			tags: ["Content"],
			requestParams: { path: z.object({ collection: z.string().meta({ description: "Collection slug" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: contentCreateBody } } },
			responses: {
				"201": {
					description: "Created content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 422, 500)
			}
		}
	},
	"/_emdash/api/content/{collection}/{id}": {
		get: {
			operationId: "getContent",
			summary: "Get a content item",
			tags: ["Content"],
			requestParams: {
				path: z.object({
					collection: z.string().meta({ description: "Collection slug" }),
					id: z.string().meta({ description: "Content ID or slug" })
				}),
				query: z.object({ locale: z.string().optional().meta({ description: "Locale filter" }) })
			},
			responses: {
				"200": {
					description: "Content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateContent",
			summary: "Update a content item",
			tags: ["Content"],
			requestParams: {
				path: z.object({
					collection: z.string().meta({ description: "Collection slug" }),
					id: z.string().meta({ description: "Content ID or slug" })
				}),
				query: z.object({ locale: z.string().optional().meta({ description: "Locale filter" }) })
			},
			requestBody: { content: { [JSON_CONTENT]: { schema: contentUpdateBody } } },
			responses: {
				"200": {
					description: "Updated content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 422, 500)
			}
		},
		delete: {
			operationId: "deleteContent",
			summary: "Delete a content item (soft delete)",
			description: "Moves the content item to trash. Use the permanent delete endpoint to remove permanently.",
			tags: ["Content"],
			requestParams: {
				path: entryPathParams,
				query: z.object({ overrideLock: z.enum(["true", "false"]).optional().meta({ description: "Delete even though another editor holds this entry's edit lock. Without it the delete is refused with 409 ENTRY_LOCKED." }) })
			},
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500),
				...entryMutationConflict
			}
		}
	},
	"/_emdash/api/content/{collection}/{id}/publish": { post: {
		operationId: "publishContent",
		summary: "Publish a content item",
		description: "Promotes the current draft to live content and clears any pending schedule. An optional revision token rejects stale publication attempts.",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		requestBody: { content: { [JSON_CONTENT]: { schema: contentPublishBody } } },
		responses: {
			"200": {
				description: "Published content item",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500),
			...entryMutationConflict
		}
	} },
	"/_emdash/api/content/{collection}/{id}/unpublish": { post: {
		operationId: "unpublishContent",
		summary: "Unpublish a content item",
		description: "Reverts content to draft status.",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		requestBody: { content: { [JSON_CONTENT]: { schema: contentRevisionConditionBody } } },
		responses: {
			"200": {
				description: "Unpublished content item",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500),
			...entryMutationConflict
		}
	} },
	"/_emdash/api/content/{collection}/{id}/schedule": {
		post: {
			operationId: "scheduleContent",
			summary: "Schedule content for future publishing",
			tags: ["Content"],
			requestParams: { path: z.object({
				collection: z.string().meta({ description: "Collection slug" }),
				id: z.string().meta({ description: "Content ID or slug" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: contentScheduleBody } } },
			responses: {
				"200": {
					description: "Scheduled content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500),
				...entryMutationConflict
			}
		},
		delete: {
			operationId: "unscheduleContent",
			summary: "Cancel scheduled publishing",
			description: "Clears the scheduled publication time. A scheduled draft returns to draft status; a published item stays published.",
			tags: ["Content"],
			requestParams: {
				path: entryPathParams,
				query: z.object({ overrideLock: z.enum(["true", "false"]).optional().meta({ description: "Unschedule even though another editor holds this entry's edit lock. Without it the request is refused with 409 ENTRY_LOCKED." }) })
			},
			responses: {
				"200": {
					description: "Unscheduled content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500),
				...entryMutationConflict
			}
		}
	},
	"/_emdash/api/content/{collection}/{id}/duplicate": { post: {
		operationId: "duplicateContent",
		summary: "Duplicate a content item",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		responses: {
			"201": {
				description: "Duplicated content item",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ item: contentItemSchema })) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/content/{collection}/{id}/restore": { post: {
		operationId: "restoreContent",
		summary: "Restore a content item from trash",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID" })
		}) },
		responses: {
			"200": {
				description: "Restored",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentRestoreResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500)
		}
	} },
	"/_emdash/api/content/{collection}/{id}/permanent": { delete: {
		operationId: "permanentDeleteContent",
		summary: "Permanently delete a content item",
		description: "Permanently removes a trashed content item. This cannot be undone.",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID" })
		}) },
		responses: {
			"200": {
				description: "Permanently deleted",
				content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/content/{collection}/{id}/compare": { get: {
		operationId: "compareContent",
		summary: "Compare live and draft revisions",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		responses: {
			"200": {
				description: "Comparison result",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentCompareResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/content/{collection}/{id}/discard-draft": { post: {
		operationId: "discardDraft",
		summary: "Discard draft changes",
		description: "Reverts the content item to its live (published) version.",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		requestBody: { content: { [JSON_CONTENT]: { schema: contentRevisionConditionBody } } },
		responses: {
			"200": {
				description: "Content item reverted to live version",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500),
			...entryMutationConflict
		}
	} },
	"/_emdash/api/content/{collection}/{id}/lock": {
		get: {
			operationId: "getEntryLock",
			summary: "Read the entry's edit lock",
			description: "Reports who is holding the entry, if anyone, without changing the lease.",
			tags: ["Content"],
			requestParams: { path: entryPathParams },
			responses: {
				"200": {
					description: "Current lock state",
					content: { [JSON_CONTENT]: { schema: successEnvelope(entryLockStatusSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		post: {
			operationId: "acquireEntryLock",
			summary: "Take or refresh the entry's edit lock",
			description: "Takes the lock for the caller, or reports who holds it. `heldByCaller` tells the two apart. The lease lasts seven minutes; repeating this call and every save on the entry extend it. `takeover` claims the lock from whoever holds it; their next heartbeat or save reports the new holder.",
			tags: ["Content"],
			requestParams: { path: entryPathParams },
			requestBody: { content: { [JSON_CONTENT]: { schema: entryLockAcquireBody } } },
			responses: {
				"200": {
					description: "Lock state after the attempt",
					content: { [JSON_CONTENT]: { schema: successEnvelope(entryLockStatusSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		delete: {
			operationId: "releaseEntryLock",
			summary: "Release the caller's edit lock",
			description: "Releases the lock only when the caller holds it; `released` is false otherwise.",
			tags: ["Content"],
			requestParams: {
				path: entryPathParams,
				query: z.object({ token: z.string().optional().meta({ description: "The session token sent on acquire. With it, only the tab that last claimed the lock releases it." }) })
			},
			responses: {
				"200": {
					description: "Whether a lock was released",
					content: { [JSON_CONTENT]: { schema: successEnvelope(entryLockReleaseResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/content/{collection}/{id}/translations": { get: {
		operationId: "getContentTranslations",
		summary: "Get translations for a content item",
		tags: ["Content"],
		requestParams: { path: z.object({
			collection: z.string().meta({ description: "Collection slug" }),
			id: z.string().meta({ description: "Content ID or slug" })
		}) },
		responses: {
			"200": {
				description: "Translation group members",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentTranslationsResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/content/{collection}/{id}/terms/{taxonomy}": {
		get: {
			operationId: "getContentTerms",
			summary: "Get taxonomy terms assigned to a content item",
			description: "Returns the terms of one taxonomy that are assigned to the content item, resolved to the item's locale with fallback to the site default.",
			tags: ["Content"],
			requestParams: { path: z.object({
				collection: z.string().meta({ description: "Collection slug" }),
				id: z.string().meta({ description: "Content ID or slug" }),
				taxonomy: z.string().meta({ description: "Taxonomy name" })
			}) },
			responses: {
				"200": {
					description: "Terms assigned to the content item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentTermsResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		post: {
			operationId: "setContentTerms",
			summary: "Set taxonomy terms on a content item",
			description: "Assign a set of terms to the content item for the named taxonomy, replacing any existing assignments for that taxonomy. Every term id must belong to the named taxonomy.",
			tags: ["Content"],
			requestParams: { path: z.object({
				collection: z.string().meta({ description: "Collection slug" }),
				id: z.string().meta({ description: "Content ID or slug" }),
				taxonomy: z.string().meta({ description: "Taxonomy name" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: contentTermsBody } } },
			responses: {
				"200": {
					description: "Terms updated",
					content: { [JSON_CONTENT]: { schema: successEnvelope(contentTermsResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		}
	},
	"/_emdash/api/content/{collection}/authors": { get: {
		operationId: "listContentAuthors",
		summary: "List distinct authors of a collection's content",
		tags: ["Content"],
		requestParams: { path: z.object({ collection: z.string().meta({ description: "Collection slug" }) }) },
		responses: {
			"200": {
				description: "Content authors",
				content: { [JSON_CONTENT]: { schema: successEnvelope(contentAuthorsResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/content/{collection}/trash": { get: {
		operationId: "listTrashedContent",
		summary: "List trashed content items",
		tags: ["Content"],
		requestParams: {
			path: z.object({ collection: z.string().meta({ description: "Collection slug" }) }),
			query: contentTrashQuery
		},
		responses: {
			"200": {
				description: "Trashed content list",
				content: { [JSON_CONTENT]: { schema: successEnvelope(trashedContentListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	} }
};
function buildMediaPaths(maxUploadSize) {
	return {
		"/_emdash/api/media": {
			get: {
				operationId: "listMedia",
				summary: "List media items",
				description: "Lists media items. Set `includeUsage=1` to attach coverage-aware advisory usage counts; a count may be null when the caller cannot read draft-derived usage.",
				tags: ["Media"],
				requestParams: { query: mediaListQuery },
				responses: {
					"200": {
						description: "Media list",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaListReadResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 500)
				}
			},
			post: {
				operationId: "uploadMedia",
				summary: "Upload a media item",
				tags: ["Media"],
				requestBody: {
					required: true,
					content: { [MULTIPART_CONTENT]: { schema: mediaDirectUploadBody } }
				},
				responses: {
					"200": {
						description: "Existing deduplicated media item",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUploadResponseSchema) } }
					},
					"201": {
						description: "Created media item",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUploadResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 413, 500)
				}
			}
		},
		"/_emdash/api/media/folders": {
			get: {
				operationId: "listMediaFolders",
				summary: "List media folders",
				tags: ["Media"],
				requestParams: { query: mediaFolderListQuery },
				responses: {
					"200": {
						description: "Media folder list",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaFolderListResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 500)
				}
			},
			post: {
				operationId: "createMediaFolder",
				summary: "Create a media folder",
				tags: ["Media"],
				requestBody: { content: { [JSON_CONTENT]: { schema: mediaFolderBody } } },
				responses: {
					"201": {
						description: "Created media folder",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaFolderResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 409, 500)
				}
			}
		},
		"/_emdash/api/media/folders/{id}": {
			get: {
				operationId: "getMediaFolder",
				summary: "Get a media folder",
				tags: ["Media"],
				requestParams: { path: z.object({ id: mediaFolderIdSchema.meta({ description: "Media folder ID" }) }) },
				responses: {
					"200": {
						description: "Media folder",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaFolderResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 404, 500)
				}
			},
			put: {
				operationId: "updateMediaFolder",
				summary: "Update a media folder",
				tags: ["Media"],
				requestParams: { path: z.object({ id: mediaFolderIdSchema.meta({ description: "Media folder ID" }) }) },
				requestBody: { content: { [JSON_CONTENT]: { schema: mediaFolderBody } } },
				responses: {
					"200": {
						description: "Updated media folder",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaFolderResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 404, 409, 500)
				}
			},
			delete: {
				operationId: "deleteMediaFolder",
				summary: "Delete a media folder",
				description: "Deletes the folder and returns its media to the Main library.",
				tags: ["Media"],
				requestParams: { path: z.object({ id: mediaFolderIdSchema.meta({ description: "Media folder ID" }) }) },
				responses: {
					"200": {
						description: "Deleted media folder",
						content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 404, 500)
				}
			}
		},
		"/_emdash/api/media/{id}": {
			get: {
				operationId: "getMedia",
				summary: "Get a media item",
				description: "Gets a media item. Set `includeUsage=1` to attach a coverage-aware advisory usage count; the count may be null when the caller cannot read draft-derived usage.",
				tags: ["Media"],
				requestParams: {
					path: z.object({ id: z.string().meta({ description: "Media ID" }) }),
					query: mediaGetQuery
				},
				responses: {
					"200": {
						description: "Media item",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaReadResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 404, 500)
				}
			},
			put: {
				operationId: "updateMedia",
				summary: "Update media metadata",
				tags: ["Media"],
				requestParams: { path: z.object({ id: z.string().meta({ description: "Media ID" }) }) },
				requestBody: { content: { [JSON_CONTENT]: { schema: mediaUpdateBody } } },
				responses: {
					"200": {
						description: "Updated media item",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 404, 500)
				}
			},
			delete: {
				operationId: "deleteMedia",
				summary: "Delete a media item",
				tags: ["Media"],
				requestParams: { path: z.object({ id: z.string().meta({ description: "Media ID" }) }) },
				responses: {
					"200": {
						description: "Deleted",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaDeleteResponseSchema) } }
					},
					...authErrors,
					...standardErrors(404, 500)
				}
			}
		},
		"/_emdash/api/media/{id}/usage": { get: {
			operationId: "getMediaUsage",
			summary: "Get media usage details",
			description: "Returns paginated content entry groups whose current indexed sources reference a local media item, and the site settings that select it. Results include aggregate coverage and are advisory during concurrent writes. Requires media read and draft-content read permission; token-authenticated callers also require admin scope.",
			tags: ["Media"],
			requestParams: {
				path: z.object({ id: z.string().meta({ description: "Media ID" }) }),
				query: mediaUsageDetailsQuery
			},
			responses: {
				"200": {
					description: "Entry-grouped media usage details",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageDetailsResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		} },
		"/_emdash/api/media/{id}/replace": { put: {
			operationId: "replaceMediaImage",
			summary: "Replace a media image",
			description: "Overwrites a ready local image under its existing storage key and refreshes its file metadata while preserving its media ID, filename, and URL. The replacement may use different dimensions or an aspect ratio from the original.",
			tags: ["Media"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Media ID" }) }) },
			requestBody: {
				required: true,
				content: { [MULTIPART_CONTENT]: { schema: mediaReplaceBody } }
			},
			responses: {
				"200": {
					description: "Replaced media item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaReplaceResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 413, 500)
			}
		} },
		"/_emdash/api/admin/media-usage/repair": { post: {
			operationId: "repairMediaUsage",
			summary: "Repair media usage indexes",
			description: "Repairs content media usage indexes for one collection or all collections. The request succeeds with HTTP 200 when a structured repair result is produced; inspect `data.status` because it may be `failed` or `stale`.",
			tags: ["Media"],
			requestBody: {
				required: true,
				content: { [JSON_CONTENT]: { schema: mediaUsageRepairBody } }
			},
			responses: {
				"200": {
					description: "Media usage repair result",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageRepairResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 413, 500)
			}
		} },
		"/_emdash/api/admin/media-usage/progress": {
			get: {
				operationId: "getMediaUsageProgress",
				summary: "Get media usage indexing progress",
				description: "Returns aggregate indexing readiness for current content collections after controlled activation is active. Requires `schema:manage`; bearer tokens also require the `admin` scope.",
				tags: ["Media"],
				responses: {
					"200": {
						description: "Aggregate media usage indexing progress",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageProgressSchema) } }
					},
					...authErrors,
					...standardErrors(409),
					...standardErrors(500)
				}
			},
			post: {
				operationId: "advanceMediaUsageProgress",
				summary: "Advance media usage indexing",
				description: "Runs one bounded Media Usage maintenance step and returns the stored activation and indexing state. Requires `schema:manage`; bearer tokens also require the `admin` scope.",
				tags: ["Media"],
				responses: {
					"200": {
						description: "Media Usage progress after one maintenance step",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageProgressAdvanceResponseSchema) } }
					},
					...authErrors,
					...standardErrors(409),
					...standardErrors(500)
				}
			}
		},
		"/_emdash/api/admin/media-usage/work": { get: {
			operationId: "listMediaUsageWork",
			summary: "List durable media usage work",
			description: "Returns one bounded cursor page of durable entry-indexing work for a current collection. Requires `schema:manage`; bearer tokens also require the `admin` scope. The response omits lease tokens, work versions, indexed content, media references, raw errors, and an exact backlog count.",
			tags: ["Media"],
			requestParams: { query: mediaUsageWorkListQuery },
			responses: {
				"200": {
					description: "Bounded media usage work page",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageWorkListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		} },
		"/_emdash/api/admin/media-usage/activation": {
			get: {
				operationId: "getMediaUsageActivation",
				summary: "Get media usage activation status",
				description: "Returns the redacted status of controlled Media Usage capture activation. This operation is read-only and does not start or resume activation. Requires `schema:manage`; bearer tokens also require the `admin` scope.",
				tags: ["Media"],
				responses: {
					"200": {
						description: "Media usage activation status",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageActivationStatusSchema) } }
					},
					...authErrors,
					...standardErrors(409, 500)
				}
			},
			post: {
				operationId: "advanceMediaUsageActivation",
				summary: "Advance media usage activation",
				description: "Starts, resumes, or retries exactly one bounded activation batch after the operator confirms that all writers are drained. Continue setup through the Media Usage progress endpoint. Requires `schema:manage`; bearer tokens also require the `admin` scope.",
				tags: ["Media"],
				requestBody: {
					required: true,
					content: { [JSON_CONTENT]: { schema: mediaUsageActivationAdvanceBody } }
				},
				responses: {
					"200": {
						description: "Current media usage activation progress",
						content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageActivationAdvanceResponseSchema) } }
					},
					...authErrors,
					...standardErrors(400, 500),
					"409": {
						description: "Activation is busy, changed ownership, or is incompatible",
						content: { [JSON_CONTENT]: { schema: mediaUsageActivationConflictSchema } }
					}
				}
			}
		},
		"/_emdash/api/admin/media-usage/work/retry": { post: {
			operationId: "retryMediaUsageWork",
			summary: "Retry one durable media usage job",
			description: "Idempotently reopens or creates one entry-indexing job for a current immutable collection identity. Requires `schema:manage`; bearer tokens also require the `admin` scope. A live worker lease or a concurrent work change returns a stable conflict without exposing ownership tokens.",
			tags: ["Media"],
			requestBody: {
				required: true,
				content: { [JSON_CONTENT]: { schema: mediaUsageWorkRetryBody } }
			},
			responses: {
				"200": {
					description: "Current pending work state",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageWorkRetryResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500),
				"409": {
					description: "The job has a live lease or changed concurrently",
					content: { [JSON_CONTENT]: { schema: mediaUsageWorkRetryConflictSchema } }
				}
			}
		} },
		"/_emdash/api/admin/media-usage/collection-deletions": { get: {
			operationId: "listMediaUsageCollectionDeletions",
			summary: "List durable collection deletions",
			description: "Returns a bounded, redacted cursor page of collection deletion work. Requires `schema:manage`; bearer tokens also require the `admin` scope.",
			tags: ["Media"],
			requestParams: { query: mediaUsageCollectionDeletionListQuery },
			responses: {
				"200": {
					description: "Bounded collection deletion page",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageCollectionDeletionListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		} },
		"/_emdash/api/admin/media-usage/collection-deletions/retry": { post: {
			operationId: "retryMediaUsageCollectionDeletion",
			summary: "Retry one collection deletion",
			tags: ["Media"],
			requestBody: {
				required: true,
				content: { [JSON_CONTENT]: { schema: mediaUsageCollectionDeletionRetryBody } }
			},
			responses: {
				"200": {
					description: "Pending collection deletion state",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaUsageCollectionDeletionRetryResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500),
				"409": {
					description: "The deletion has a live lease or changed concurrently",
					content: { [JSON_CONTENT]: { schema: mediaUsageWorkRetryConflictSchema } }
				}
			}
		} },
		"/_emdash/api/media/upload-url": { post: {
			operationId: "getMediaUploadUrl",
			summary: "Get a media upload target",
			description: "Returns either a signed direct-to-storage URL or a same-origin streaming target. Creates a pending media record.",
			tags: ["Media"],
			requestBody: { content: { [JSON_CONTENT]: { schema: mediaUploadUrlBody(maxUploadSize) } } },
			responses: {
				"200": {
					description: "Upload URL or existing media (deduplication)",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.union([mediaUploadUrlResponseSchema, mediaExistingResponseSchema])) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		} },
		"/_emdash/api/media/{id}/confirm": { post: {
			operationId: "confirmMediaUpload",
			summary: "Confirm a media upload",
			description: "Marks a pending media record as ready after the file has been uploaded.",
			tags: ["Media"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Media ID" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: mediaConfirmBody } } },
			responses: {
				"200": {
					description: "Confirmed media item with URL",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaConfirmResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		} },
		"/_emdash/api/media/{id}/upload": { put: {
			operationId: "uploadPendingMedia",
			summary: "Upload a pending media file through EmDash",
			description: "Streams a file to storage when the configured adapter cannot provide a signed upload URL. The Content-Type and byte count must match the pending media item.",
			tags: ["Media"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Media ID" }) }) },
			requestBody: {
				required: true,
				content: { "*/*": { schema: z.string().meta({ format: "binary" }) } }
			},
			responses: {
				"200": {
					description: "File uploaded and ready for confirmation",
					content: { [JSON_CONTENT]: { schema: successEnvelope(mediaStreamUploadResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 413, 500)
			}
		} }
	};
}
var schemaPaths = {
	"/_emdash/api/schema/block-types": {
		get: {
			operationId: "listBlockTypes",
			summary: "List block types",
			tags: ["Schema"],
			responses: {
				"200": {
					description: "Block type list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(blockTypeListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createBlockType",
			summary: "Create a block type",
			tags: ["Schema"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createBlockTypeBody } } },
			responses: {
				"201": {
					description: "Created block type",
					content: { [JSON_CONTENT]: { schema: successEnvelope(blockTypeResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/schema/block-types/{slug}": {
		get: {
			operationId: "getBlockType",
			summary: "Get a block type",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string() }) },
			responses: {
				"200": {
					description: "Block type",
					content: { [JSON_CONTENT]: { schema: successEnvelope(blockTypeResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateBlockType",
			summary: "Update a block type",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string() }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateBlockTypeBody } } },
			responses: {
				"200": {
					description: "Updated block type",
					content: { [JSON_CONTENT]: { schema: successEnvelope(blockTypeResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		}
	},
	"/_emdash/api/schema/block-types/{slug}/versions/{version}/activate": { post: {
		operationId: "activateBlockTypeVersion",
		summary: "Activate a block type version",
		tags: ["Schema"],
		requestParams: { path: z.object({
			slug: z.string(),
			version: z.coerce.number().int().positive()
		}) },
		requestBody: { content: { [JSON_CONTENT]: { schema: activateBlockTypeVersionBody } } },
		responses: {
			"200": {
				description: "Activated block type",
				content: { [JSON_CONTENT]: { schema: successEnvelope(blockTypeResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 409, 500)
		}
	} },
	"/_emdash/api/schema/collections": {
		get: {
			operationId: "listCollections",
			summary: "List all collections",
			tags: ["Schema"],
			responses: {
				"200": {
					description: "Collection list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(collectionListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createCollection",
			summary: "Create a collection",
			tags: ["Schema"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createCollectionBody } } },
			responses: {
				"201": {
					description: "Created collection",
					content: { [JSON_CONTENT]: { schema: successEnvelope(collectionResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/schema/collections/{slug}": {
		get: {
			operationId: "getCollection",
			summary: "Get a collection",
			tags: ["Schema"],
			requestParams: {
				path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }),
				query: collectionGetQuery
			},
			responses: {
				"200": {
					description: "Collection (optionally with fields)",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.union([collectionResponseSchema.shape.item, collectionWithFieldsResponseSchema.shape.item])) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateCollection",
			summary: "Update a collection",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateCollectionBody } } },
			responses: {
				"200": {
					description: "Updated collection",
					content: { [JSON_CONTENT]: { schema: successEnvelope(collectionResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		delete: {
			operationId: "deleteCollection",
			summary: "Delete a collection",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/schema/collections/{slug}/fields": {
		get: {
			operationId: "listFields",
			summary: "List fields for a collection",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }) },
			responses: {
				"200": {
					description: "Field list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(fieldListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		post: {
			operationId: "createField",
			summary: "Create a field",
			tags: ["Schema"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: createFieldBody } } },
			responses: {
				"201": {
					description: "Created field",
					content: { [JSON_CONTENT]: { schema: successEnvelope(fieldResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/schema/collections/{slug}/fields/{fieldSlug}": {
		get: {
			operationId: "getField",
			summary: "Get a field",
			tags: ["Schema"],
			requestParams: { path: z.object({
				slug: z.string().meta({ description: "Collection slug" }),
				fieldSlug: z.string().meta({ description: "Field slug" })
			}) },
			responses: {
				"200": {
					description: "Field",
					content: { [JSON_CONTENT]: { schema: successEnvelope(fieldResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateField",
			summary: "Update a field",
			tags: ["Schema"],
			requestParams: { path: z.object({
				slug: z.string().meta({ description: "Collection slug" }),
				fieldSlug: z.string().meta({ description: "Field slug" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateFieldBody } } },
			responses: {
				"200": {
					description: "Updated field",
					content: { [JSON_CONTENT]: { schema: successEnvelope(fieldResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		delete: {
			operationId: "deleteField",
			summary: "Delete a field",
			tags: ["Schema"],
			requestParams: { path: z.object({
				slug: z.string().meta({ description: "Collection slug" }),
				fieldSlug: z.string().meta({ description: "Field slug" })
			}) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/schema/collections/reorder": { post: {
		operationId: "reorderCollections",
		summary: "Reorder collections in the admin sidebar",
		description: "Sets the sidebar order. Collections omitted from the list lose their explicit position and fall back to alphabetical order after the ordered ones.",
		tags: ["Schema"],
		requestBody: { content: { [JSON_CONTENT]: { schema: collectionReorderBody } } },
		responses: {
			"200": {
				description: "Reordered",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ success: z.literal(true) })) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/schema/collections/{slug}/fields/reorder": { post: {
		operationId: "reorderFields",
		summary: "Reorder fields in a collection",
		tags: ["Schema"],
		requestParams: { path: z.object({ slug: z.string().meta({ description: "Collection slug" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: fieldReorderBody } } },
		responses: {
			"200": {
				description: "Reordered",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ success: z.literal(true) })) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/schema/orphans": { get: {
		operationId: "listOrphanedTables",
		summary: "List orphaned content tables",
		description: "Finds ec_* tables without matching collection definitions.",
		tags: ["Schema"],
		responses: {
			"200": {
				description: "Orphaned tables",
				content: { [JSON_CONTENT]: { schema: successEnvelope(orphanedTableListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/schema/orphans/{slug}": { post: {
		operationId: "registerOrphanedTable",
		summary: "Register an orphaned table as a collection",
		tags: ["Schema"],
		requestParams: { path: z.object({ slug: z.string().meta({ description: "Table slug (without ec_ prefix)" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: orphanRegisterBody } } },
		responses: {
			"201": {
				description: "Registered collection",
				content: { [JSON_CONTENT]: { schema: successEnvelope(collectionResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} }
};
var commentsPaths = {
	"/_emdash/api/comments/{collection}/{contentId}": {
		get: {
			operationId: "listPublicComments",
			summary: "List approved comments for content",
			description: "Public endpoint. Returns approved comments with optional threading.",
			tags: ["Comments"],
			requestParams: {
				path: z.object({
					collection: z.string().meta({ description: "Collection slug" }),
					contentId: z.string().meta({ description: "Content ID" })
				}),
				query: z.object({
					limit: z.coerce.number().int().min(1).max(100).optional(),
					cursor: z.string().optional(),
					threaded: z.enum(["true", "false"]).transform((v) => v === "true").optional()
				})
			},
			responses: {
				"200": {
					description: "Comment list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(publicCommentListResponseSchema) } }
				},
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createComment",
			summary: "Submit a new comment",
			description: "Public endpoint. Comment enters moderation queue.",
			tags: ["Comments"],
			requestParams: { path: z.object({
				collection: z.string().meta({ description: "Collection slug" }),
				contentId: z.string().meta({ description: "Content ID" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: createCommentBody } } },
			responses: {
				"201": {
					description: "Comment created (pending moderation)",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({
						id: z.string(),
						status: z.string()
					})) } }
				},
				...standardErrors(400, 429, 500)
			}
		}
	},
	"/_emdash/api/admin/comments": { get: {
		operationId: "listAdminComments",
		summary: "List comments for moderation",
		tags: ["Comments"],
		requestParams: { query: commentListQuery },
		responses: {
			"200": {
				description: "Comment moderation inbox",
				content: { [JSON_CONTENT]: { schema: successEnvelope(adminCommentListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/admin/comments/counts": { get: {
		operationId: "getCommentCounts",
		summary: "Get comment status counts",
		tags: ["Comments"],
		responses: {
			"200": {
				description: "Counts by status",
				content: { [JSON_CONTENT]: { schema: successEnvelope(commentCountsResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/admin/comments/bulk": { post: {
		operationId: "bulkCommentAction",
		summary: "Bulk approve, spam, trash, or delete comments",
		tags: ["Comments"],
		requestBody: { content: { [JSON_CONTENT]: { schema: commentBulkBody } } },
		responses: {
			"200": {
				description: "Bulk action result",
				content: { [JSON_CONTENT]: { schema: successEnvelope(commentBulkResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	} },
	"/_emdash/api/admin/comments/{id}": {
		get: {
			operationId: "getComment",
			summary: "Get a single comment",
			tags: ["Comments"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Comment ID" }) }) },
			responses: {
				"200": {
					description: "Comment",
					content: { [JSON_CONTENT]: { schema: successEnvelope(commentSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		delete: {
			operationId: "deleteComment",
			summary: "Permanently delete a comment",
			tags: ["Comments"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Comment ID" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/admin/comments/{id}/status": { put: {
		operationId: "updateCommentStatus",
		summary: "Change comment status",
		tags: ["Comments"],
		requestParams: { path: z.object({ id: z.string().meta({ description: "Comment ID" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: commentStatusBody } } },
		responses: {
			"200": {
				description: "Updated comment",
				content: { [JSON_CONTENT]: { schema: successEnvelope(commentSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} }
};
var taxonomyPaths = {
	"/_emdash/api/taxonomies": { get: {
		operationId: "listTaxonomies",
		summary: "List all taxonomy definitions",
		tags: ["Taxonomies"],
		responses: {
			"200": {
				description: "Taxonomy list",
				content: { [JSON_CONTENT]: { schema: successEnvelope(taxonomyListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/taxonomies/{name}": {
		get: {
			operationId: "getTaxonomy",
			summary: "Get a taxonomy definition",
			description: "Definitions are per-locale; `locale` picks one. Without it the configured default locale is returned, falling back to the lowest locale code.",
			tags: ["Taxonomies"],
			requestParams: {
				path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }),
				query: z.object({ locale: z.string().optional().meta({ description: "Locale filter" }) })
			},
			responses: {
				"200": {
					description: "Taxonomy definition",
					content: { [JSON_CONTENT]: { schema: successEnvelope(taxonomyResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		put: {
			operationId: "updateTaxonomy",
			summary: "Update a taxonomy definition",
			description: "Writes `label` and `labelSingular` to the single definition `name` + `locale` resolves to. `hierarchical` and `collections` belong to the taxonomy and change for every locale. `name` and `locale` cannot be changed — terms are keyed on `name`, and each locale is its own definition row.",
			tags: ["Taxonomies"],
			requestParams: {
				path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }),
				query: z.object({ locale: z.string().optional().meta({ description: "Locale of the definition to update" }) })
			},
			requestBody: { content: { [JSON_CONTENT]: { schema: updateTaxonomyDefBody } } },
			responses: {
				"200": {
					description: "Updated taxonomy definition",
					content: { [JSON_CONTENT]: { schema: successEnvelope(taxonomyResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		delete: {
			operationId: "deleteTaxonomy",
			summary: "Delete a taxonomy, its terms, and their content assignments",
			description: "Destructive and unscoped: every locale's definition goes, along with every term under the name and the assignments those terms hold. There is no locale parameter and no guard on a taxonomy that is still in use.",
			tags: ["Taxonomies"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/taxonomies/{name}/translations": { get: {
		operationId: "listTaxonomyTranslations",
		summary: "List every locale variant of a taxonomy definition",
		description: "Create a translation with `POST /_emdash/api/taxonomies` and `translationOf` set to a definition id from this list.",
		tags: ["Taxonomies"],
		requestParams: {
			path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }),
			query: z.object({ locale: z.string().optional().meta({ description: "Locale of the definition to resolve the group from" }) })
		},
		responses: {
			"200": {
				description: "Translations sharing a translation_group",
				content: { [JSON_CONTENT]: { schema: successEnvelope(taxonomyDefTranslationsSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/taxonomies/{name}/reorder": { post: {
		operationId: "reorderTerms",
		summary: "Set the manual order of one sibling group of terms",
		description: "`ids` names the terms to move, in the desired order, and may be a subset of the group — the listed terms are permuted within the positions they already occupy. A position belongs to a term across every locale, so there is no `locale` parameter. Ordering never reparents — use the term update endpoint to change a parent.",
		tags: ["Taxonomies"],
		requestParams: { path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: reorderTermsBody } } },
		responses: {
			"200": {
				description: "The group in its new order",
				content: { [JSON_CONTENT]: { schema: successEnvelope(termReorderResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/taxonomies/{name}/terms": {
		get: {
			operationId: "listTerms",
			summary: "List terms for a taxonomy",
			description: "Returns a tree for hierarchical taxonomies, flat list otherwise.",
			tags: ["Taxonomies"],
			requestParams: {
				path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }),
				query: termListQuery
			},
			responses: {
				"200": {
					description: "Term list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(termListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		post: {
			operationId: "createTerm",
			summary: "Create a term",
			tags: ["Taxonomies"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Taxonomy name" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: createTermBody } } },
			responses: {
				"201": {
					description: "Created term",
					content: { [JSON_CONTENT]: { schema: successEnvelope(termResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/taxonomies/{name}/terms/{slug}": {
		get: {
			operationId: "getTerm",
			summary: "Get a term by slug",
			tags: ["Taxonomies"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Taxonomy name" }),
				slug: z.string().meta({ description: "Term slug" })
			}) },
			responses: {
				"200": {
					description: "Term with children and count",
					content: { [JSON_CONTENT]: { schema: successEnvelope(termGetResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateTerm",
			summary: "Update a term",
			tags: ["Taxonomies"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Taxonomy name" }),
				slug: z.string().meta({ description: "Term slug" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateTermBody } } },
			responses: {
				"200": {
					description: "Updated term",
					content: { [JSON_CONTENT]: { schema: successEnvelope(termResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		},
		delete: {
			operationId: "deleteTerm",
			summary: "Delete a term",
			tags: ["Taxonomies"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Taxonomy name" }),
				slug: z.string().meta({ description: "Term slug" })
			}) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		}
	}
};
var menuPaths = {
	"/_emdash/api/menus": {
		get: {
			operationId: "listMenus",
			summary: "List all menus with item counts",
			tags: ["Menus"],
			responses: {
				"200": {
					description: "Menu list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.array(menuListItemSchema)) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createMenu",
			summary: "Create a menu",
			tags: ["Menus"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createMenuBody } } },
			responses: {
				"201": {
					description: "Created menu",
					content: { [JSON_CONTENT]: { schema: successEnvelope(menuWithItemsSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/menus/{name}": {
		get: {
			operationId: "getMenu",
			summary: "Get a menu with all items",
			tags: ["Menus"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Menu name" }) }) },
			responses: {
				"200": {
					description: "Menu with items",
					content: { [JSON_CONTENT]: { schema: successEnvelope(menuWithItemsSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateMenu",
			summary: "Update a menu",
			tags: ["Menus"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Menu name" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateMenuBody } } },
			responses: {
				"200": {
					description: "Updated menu",
					content: { [JSON_CONTENT]: { schema: successEnvelope(menuWithItemsSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		delete: {
			operationId: "deleteMenu",
			summary: "Delete a menu and its items",
			tags: ["Menus"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Menu name" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/menus/{name}/items": { post: {
		operationId: "createMenuItem",
		summary: "Add an item to a menu",
		tags: ["Menus"],
		requestParams: { path: z.object({ name: z.string().meta({ description: "Menu name" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: createMenuItemBody } } },
		responses: {
			"201": {
				description: "Created menu item",
				content: { [JSON_CONTENT]: { schema: successEnvelope(menuItemSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/menus/{name}/items/{id}": {
		put: {
			operationId: "updateMenuItem",
			summary: "Update a menu item",
			tags: ["Menus"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Menu name" }),
				id: z.string().meta({ description: "Menu item id" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateMenuItemBody } } },
			responses: {
				"200": {
					description: "Updated menu item",
					content: { [JSON_CONTENT]: { schema: successEnvelope(menuItemSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		delete: {
			operationId: "deleteMenuItem",
			summary: "Delete a menu item",
			tags: ["Menus"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Menu name" }),
				id: z.string().meta({ description: "Menu item id" })
			}) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/menus/{name}/reorder": { post: {
		operationId: "reorderMenuItems",
		summary: "Batch reorder menu items",
		tags: ["Menus"],
		requestParams: { path: z.object({ name: z.string().meta({ description: "Menu name" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: reorderMenuItemsBody } } },
		responses: {
			"200": {
				description: "Reordered items",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.array(menuItemSchema)) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} }
};
var sectionPaths = {
	"/_emdash/api/sections": {
		get: {
			operationId: "listSections",
			summary: "List sections",
			tags: ["Sections"],
			requestParams: { query: sectionsListQuery },
			responses: {
				"200": {
					description: "Section list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(sectionListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createSection",
			summary: "Create a section",
			tags: ["Sections"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createSectionBody } } },
			responses: {
				"201": {
					description: "Created section",
					content: { [JSON_CONTENT]: { schema: successEnvelope(sectionSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/sections/{slug}": {
		get: {
			operationId: "getSection",
			summary: "Get a section by slug",
			tags: ["Sections"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Section slug" }) }) },
			responses: {
				"200": {
					description: "Section",
					content: { [JSON_CONTENT]: { schema: successEnvelope(sectionSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateSection",
			summary: "Update a section",
			tags: ["Sections"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Section slug" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateSectionBody } } },
			responses: {
				"200": {
					description: "Updated section",
					content: { [JSON_CONTENT]: { schema: successEnvelope(sectionSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		},
		delete: {
			operationId: "deleteSection",
			summary: "Delete a section",
			tags: ["Sections"],
			requestParams: { path: z.object({ slug: z.string().meta({ description: "Section slug" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(403, 404, 500)
			}
		}
	}
};
var widgetPaths = {
	"/_emdash/api/widget-areas": {
		get: {
			operationId: "listWidgetAreas",
			summary: "List all widget areas",
			tags: ["Widgets"],
			responses: {
				"200": {
					description: "Widget area list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ items: z.array(widgetAreaWithWidgetsAndCountSchema) })) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createWidgetArea",
			summary: "Create a widget area",
			tags: ["Widgets"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createWidgetAreaBody } } },
			responses: {
				"201": {
					description: "Created widget area",
					content: { [JSON_CONTENT]: { schema: successEnvelope(widgetAreaSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/widget-areas/{name}": {
		get: {
			operationId: "getWidgetArea",
			summary: "Get a widget area with widgets",
			tags: ["Widgets"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Widget area name" }) }) },
			responses: {
				"200": {
					description: "Widget area with widgets",
					content: { [JSON_CONTENT]: { schema: successEnvelope(widgetAreaWithWidgetsSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		delete: {
			operationId: "deleteWidgetArea",
			summary: "Delete a widget area and its widgets",
			tags: ["Widgets"],
			requestParams: { path: z.object({ name: z.string().meta({ description: "Widget area name" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/widget-areas/{name}/widgets": { post: {
		operationId: "createWidget",
		summary: "Add a widget to an area",
		tags: ["Widgets"],
		requestParams: { path: z.object({ name: z.string().meta({ description: "Widget area name" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: createWidgetBody } } },
		responses: {
			"201": {
				description: "Created widget",
				content: { [JSON_CONTENT]: { schema: successEnvelope(widgetSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/widget-areas/{name}/widgets/{id}": {
		put: {
			operationId: "updateWidget",
			summary: "Update a widget",
			tags: ["Widgets"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Widget area name" }),
				id: z.string().meta({ description: "Widget ID" })
			}) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateWidgetBody } } },
			responses: {
				"200": {
					description: "Updated widget",
					content: { [JSON_CONTENT]: { schema: successEnvelope(widgetSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 500)
			}
		},
		delete: {
			operationId: "deleteWidget",
			summary: "Delete a widget",
			tags: ["Widgets"],
			requestParams: { path: z.object({
				name: z.string().meta({ description: "Widget area name" }),
				id: z.string().meta({ description: "Widget ID" })
			}) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/widget-areas/{name}/reorder": { post: {
		operationId: "reorderWidgets",
		summary: "Reorder widgets in an area",
		tags: ["Widgets"],
		requestParams: { path: z.object({ name: z.string().meta({ description: "Widget area name" }) }) },
		requestBody: { content: { [JSON_CONTENT]: { schema: reorderWidgetsBody } } },
		responses: {
			"200": {
				description: "Reordered",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ success: z.literal(true) })) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} }
};
var settingsPaths = { "/_emdash/api/settings": {
	get: {
		operationId: "getSettings",
		summary: "Get site settings",
		tags: ["Settings"],
		responses: {
			"200": {
				description: "Site settings",
				content: { [JSON_CONTENT]: { schema: successEnvelope(siteSettingsSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	},
	put: {
		operationId: "updateSettings",
		summary: "Update site settings",
		tags: ["Settings"],
		requestBody: { content: { [JSON_CONTENT]: { schema: settingsUpdateBody } } },
		responses: {
			"200": {
				description: "Updated settings",
				content: { [JSON_CONTENT]: { schema: successEnvelope(siteSettingsSchema) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	}
} };
var searchPaths = {
	"/_emdash/api/search": { get: {
		operationId: "search",
		summary: "Full-text search across collections",
		tags: ["Search"],
		requestParams: { query: searchQuery },
		responses: {
			"200": {
				description: "Search results",
				content: { [JSON_CONTENT]: { schema: successEnvelope(searchResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/search/suggest": { get: {
		operationId: "searchSuggest",
		summary: "Autocomplete search suggestions",
		tags: ["Search"],
		requestParams: { query: searchSuggestQuery },
		responses: {
			"200": {
				description: "Search suggestions",
				content: { [JSON_CONTENT]: { schema: successEnvelope(searchResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/search/rebuild": { post: {
		operationId: "rebuildSearchIndex",
		summary: "Rebuild the search index for a collection",
		tags: ["Search"],
		requestBody: { content: { [JSON_CONTENT]: { schema: searchRebuildBody } } },
		responses: {
			"200": {
				description: "Rebuild started",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({
					collection: z.string(),
					indexed: z.number().int()
				})) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	} },
	"/_emdash/api/search/enable": { post: {
		operationId: "enableSearch",
		summary: "Enable or disable search for a collection",
		tags: ["Search"],
		requestBody: { content: { [JSON_CONTENT]: { schema: searchEnableBody } } },
		responses: {
			"200": {
				description: "Search config updated",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({
					collection: z.string(),
					enabled: z.boolean()
				})) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	} },
	"/_emdash/api/search/stats": { get: {
		operationId: "getSearchStats",
		summary: "Get search index statistics",
		tags: ["Search"],
		responses: {
			"200": {
				description: "Search stats per collection",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ collections: z.array(z.object({
					collection: z.string(),
					enabled: z.boolean(),
					indexed: z.number().int()
				})) })) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} }
};
var redirectPaths = {
	"/_emdash/api/redirects": {
		get: {
			operationId: "listRedirects",
			summary: "List redirects",
			tags: ["Redirects"],
			requestParams: { query: redirectsListQuery },
			responses: {
				"200": {
					description: "Redirect list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(redirectListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createRedirect",
			summary: "Create a redirect rule",
			tags: ["Redirects"],
			requestBody: { content: { [JSON_CONTENT]: { schema: createRedirectBody } } },
			responses: {
				"201": {
					description: "Created redirect",
					content: { [JSON_CONTENT]: { schema: successEnvelope(redirectSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/redirects/{id}": {
		get: {
			operationId: "getRedirect",
			summary: "Get a redirect",
			tags: ["Redirects"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Redirect ID" }) }) },
			responses: {
				"200": {
					description: "Redirect",
					content: { [JSON_CONTENT]: { schema: successEnvelope(redirectSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateRedirect",
			summary: "Update a redirect",
			tags: ["Redirects"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Redirect ID" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: updateRedirectBody } } },
			responses: {
				"200": {
					description: "Updated redirect",
					content: { [JSON_CONTENT]: { schema: successEnvelope(redirectSchema) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		},
		delete: {
			operationId: "deleteRedirect",
			summary: "Delete a redirect",
			tags: ["Redirects"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "Redirect ID" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	},
	"/_emdash/api/redirects/404s": {
		get: {
			operationId: "listNotFoundEntries",
			summary: "List 404 log entries",
			tags: ["Redirects"],
			requestParams: { query: notFoundListQuery },
			responses: {
				"200": {
					description: "404 log entries",
					content: { [JSON_CONTENT]: { schema: successEnvelope(notFoundListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		delete: {
			operationId: "clearNotFoundLog",
			summary: "Clear all 404 log entries",
			tags: ["Redirects"],
			responses: {
				"200": {
					description: "Cleared",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ deleted: z.number().int() })) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "pruneNotFoundLog",
			summary: "Prune old 404 log entries",
			tags: ["Redirects"],
			requestBody: { content: { [JSON_CONTENT]: { schema: notFoundPruneBody } } },
			responses: {
				"200": {
					description: "Pruned",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ deleted: z.number().int() })) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		}
	},
	"/_emdash/api/redirects/404s/summary": { get: {
		operationId: "getNotFoundSummary",
		summary: "Get 404 summary grouped by path",
		tags: ["Redirects"],
		responses: {
			"200": {
				description: "404 summary",
				content: { [JSON_CONTENT]: { schema: successEnvelope(notFoundSummaryResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} }
};
var userPaths = {
	"/_emdash/api/admin/users": { get: {
		operationId: "listUsers",
		summary: "List users",
		tags: ["Users"],
		requestParams: { query: usersListQuery },
		responses: {
			"200": {
				description: "User list",
				content: { [JSON_CONTENT]: { schema: successEnvelope(userListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/admin/users/{id}": {
		get: {
			operationId: "getUser",
			summary: "Get user details",
			tags: ["Users"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "User ID" }) }) },
			responses: {
				"200": {
					description: "User detail",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ item: userDetailSchema })) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		put: {
			operationId: "updateUser",
			summary: "Update a user",
			tags: ["Users"],
			requestParams: { path: z.object({ id: z.string().meta({ description: "User ID" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: userUpdateBody } } },
			responses: {
				"200": {
					description: "Updated user",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ item: userSchema })) } }
				},
				...authErrors,
				...standardErrors(400, 404, 409, 500)
			}
		}
	},
	"/_emdash/api/admin/users/{id}/disable": { post: {
		operationId: "disableUser",
		summary: "Disable a user account",
		tags: ["Users"],
		requestParams: { path: z.object({ id: z.string().meta({ description: "User ID" }) }) },
		responses: {
			"200": {
				description: "User disabled",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ item: userSchema })) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/admin/users/{id}/enable": { post: {
		operationId: "enableUser",
		summary: "Enable a user account",
		tags: ["Users"],
		requestParams: { path: z.object({ id: z.string().meta({ description: "User ID" }) }) },
		responses: {
			"200": {
				description: "User enabled",
				content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ item: userSchema })) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/admin/allowed-domains": {
		get: {
			operationId: "listAllowedDomains",
			summary: "List allowed email domains",
			tags: ["Users"],
			responses: {
				"200": {
					description: "Allowed domains list",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({ items: z.array(z.object({
						domain: z.string(),
						defaultRole: z.number().int(),
						enabled: z.boolean(),
						createdAt: z.string()
					})) })) } }
				},
				...authErrors,
				...standardErrors(500)
			}
		},
		post: {
			operationId: "createAllowedDomain",
			summary: "Add an allowed email domain",
			tags: ["Users"],
			requestBody: { content: { [JSON_CONTENT]: { schema: allowedDomainCreateBody } } },
			responses: {
				"201": {
					description: "Created",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({
						domain: z.string(),
						defaultRole: z.number().int(),
						enabled: z.boolean()
					})) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/admin/allowed-domains/{domain}": {
		put: {
			operationId: "updateAllowedDomain",
			summary: "Update an allowed domain",
			tags: ["Users"],
			requestParams: { path: z.object({ domain: z.string().meta({ description: "Domain name" }) }) },
			requestBody: { content: { [JSON_CONTENT]: { schema: allowedDomainUpdateBody } } },
			responses: {
				"200": {
					description: "Updated",
					content: { [JSON_CONTENT]: { schema: successEnvelope(z.object({
						domain: z.string(),
						defaultRole: z.number().int(),
						enabled: z.boolean()
					})) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		},
		delete: {
			operationId: "deleteAllowedDomain",
			summary: "Remove an allowed domain",
			tags: ["Users"],
			requestParams: { path: z.object({ domain: z.string().meta({ description: "Domain name" }) }) },
			responses: {
				"200": {
					description: "Deleted",
					content: { [JSON_CONTENT]: { schema: successEnvelope(deleteResponseSchema) } }
				},
				...authErrors,
				...standardErrors(404, 500)
			}
		}
	}
};
var TRANSFER_AUTH = "Session users need the `transfer:import` permission (admins); bearer tokens need `admin` or the scope named here.";
var importPathParams = z.object({ id: z.string().meta({ description: "Import operation ID" }) });
var exportPathParams = z.object({ id: z.string().meta({ description: "Export operation ID" }) });
var EXPORT_AUTH = "Session users need the `transfer:export` permission (admins); bearer tokens need the `transfer:export` scope. Any holder of both can read any export.";
var approvalPathParams = z.object({ id: z.string().meta({ description: "Approval ID" }) });
var transferPaths = {
	"/_emdash/api/admin/transfer/capabilities": { get: {
		operationId: "getTransferCapabilities",
		summary: "Get site transfer capabilities",
		description: "Returns the supported package format versions, features, and limits, and whether this site can receive an import (`portableDomain`, with the reasons it cannot). Session users need `transfer:export` or `transfer:import`; bearer tokens need any transfer scope.",
		tags: ["Transfer"],
		responses: {
			"200": {
				description: "Transfer capabilities",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferCapabilitiesSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/admin/transfer/imports": {
		get: {
			operationId: "listTransferImports",
			summary: "List site imports",
			description: `Returns imports newest first. ${TRANSFER_AUTH} Scope: \`transfer:analyze\` or \`transfer:execute\`.`,
			tags: ["Transfer"],
			requestParams: { query: transferPaginationQuery },
			responses: {
				"200": {
					description: "One page of imports",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		},
		post: {
			operationId: "createTransferImport",
			summary: "Create a site import",
			description: `The request body is the package's \`manifest.json\`, byte for byte (at most 8 MiB). An optional \`Idempotency-Key\` header returns the existing operation on retry; reusing a key with a different manifest fails with \`TRANSFER_IDEMPOTENCY_CONFLICT\`. The response lists the first files to upload. ${TRANSFER_AUTH} Scope: \`transfer:analyze\`.`,
			tags: ["Transfer"],
			requestBody: {
				required: true,
				content: { [JSON_CONTENT]: { schema: z.string().meta({ format: "binary" }) } }
			},
			responses: {
				"200": {
					description: "Existing import for this idempotency key",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportCreateResponseSchema) } }
				},
				"201": {
					description: "Import created",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportCreateResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 413, 422, 500, 503)
			}
		}
	},
	"/_emdash/api/admin/transfer/imports/{id}": { get: {
		operationId: "getTransferImport",
		summary: "Get a site import",
		description: `Returns the import and how many of its files are uploaded. ${TRANSFER_AUTH} Scope: \`transfer:analyze\` or \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "Import status",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportStatusResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/missing": { get: {
		operationId: "listTransferImportMissingFiles",
		summary: "List package files still to upload",
		description: `Returns declared files that are not uploaded yet, in path order. Uploading an index chunk declares the files it lists, so list again after each round of uploads until the list is empty. ${TRANSFER_AUTH} Scope: \`transfer:analyze\`.`,
		tags: ["Transfer"],
		requestParams: {
			path: importPathParams,
			query: transferPaginationQuery
		},
		responses: {
			"200": {
				description: "One page of missing files",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferMissingFilesResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 500)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/files/{path}": { put: {
		operationId: "uploadTransferImportFile",
		summary: "Upload one package file",
		description: `Streams one declared package file (\`index/…\`, \`records/…\`, or \`media/…\`; the path keeps its slashes). \`Content-Length\` is required and must equal the declared size, and the bytes must match the declared SHA-256. Media files may not exceed the site's \`maxUploadSize\`. ${TRANSFER_AUTH} Scope: \`transfer:analyze\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams.extend({ path: z.string().meta({ description: "Package file path" }) }) },
		requestBody: {
			required: true,
			content: { "application/octet-stream": { schema: z.string().meta({ format: "binary" }) } }
		},
		responses: {
			"200": {
				description: "File stored and verified",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferFileUploadResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 409, 411, 413, 422, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/analyze": { post: {
		operationId: "analyzeTransferImport",
		summary: "Advance import analysis",
		description: `Runs one bounded analysis step once every file is uploaded. Call again after \`nextRequestInMs\` until it is null; the response then includes the plan and its digest. Submitted decisions are applied once the import is planned. ${TRANSFER_AUTH} Scope: \`transfer:analyze\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		requestBody: {
			required: false,
			content: { [JSON_CONTENT]: { schema: transferImportAnalyzeBody } }
		},
		responses: {
			"200": {
				description: "Analysis progress, or the plan",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportAnalyzeResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 409, 422, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/plan": { get: {
		operationId: "getTransferImportPlan",
		summary: "Get an import plan",
		description: `${TRANSFER_AUTH} Scope: \`transfer:analyze\` or \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "The plan and its digest",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportPlanResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/cancel": { post: {
		operationId: "cancelTransferImport",
		summary: "Cancel a site import",
		description: `A step in progress stops after its current batch. ${TRANSFER_AUTH} Scope: \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "The cancelled import",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/abandon": { post: {
		operationId: "abandonTransferImport",
		summary: "Abandon a failed or cancelled import",
		description: `Lifts the site write fence after an import failed or was cancelled. Data the import already wrote stays in place. ${TRANSFER_AUTH} Scope: \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "The abandoned import",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/execute": { post: {
		operationId: "executeTransferImport",
		summary: "Start a planned import",
		description: `Starts a planned import once the reviewed package and plan digests match. The plan must have no blockers. Then call \`advance\` until \`nextRequestInMs\` is null. ${TRANSFER_AUTH} Scope: \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		requestBody: {
			required: true,
			content: { [JSON_CONTENT]: { schema: transferImportExecuteBody } }
		},
		responses: {
			"200": {
				description: "The import, marked for execution",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 404, 409, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/advance": { post: {
		operationId: "advanceTransferImport",
		summary: "Advance an executing import",
		description: `Runs one bounded import step. Retryable failures are recorded on the import and delay \`nextRequestInMs\`; it is null once the import has ended. While the import runs, and after it fails or is cancelled until it is abandoned, other site writes return 503 \`TRANSFER_IMPORT_IN_PROGRESS\`. ${TRANSFER_AUTH} Scope: \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "The import after one step",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferAdvanceResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/imports/{id}/receipt": { get: {
		operationId: "getTransferImportReceipt",
		summary: "Get an import receipt",
		description: `The verified receipt of a complete import; its \`receiptDigest\` covers every other field. ${TRANSFER_AUTH} Scope: \`transfer:analyze\` or \`transfer:execute\`.`,
		tags: ["Transfer"],
		requestParams: { path: importPathParams },
		responses: {
			"200": {
				description: "The receipt",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferImportReceiptResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500)
		}
	} },
	"/_emdash/api/admin/transfer/exports": {
		get: {
			operationId: "listTransferExports",
			summary: "List site exports",
			description: `Returns exports newest first. ${EXPORT_AUTH}`,
			tags: ["Transfer"],
			requestParams: { query: transferPaginationQuery },
			responses: {
				"200": {
					description: "One page of exports",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationListResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 500)
			}
		},
		post: {
			operationId: "createTransferExport",
			summary: "Start a site export",
			description: `Creates an export; call \`advance\` until \`nextRequestInMs\` is null. An optional \`Idempotency-Key\` header returns the existing export on retry. ${EXPORT_AUTH}`,
			tags: ["Transfer"],
			requestBody: {
				required: false,
				content: { [JSON_CONTENT]: { schema: transferExportCreateBody } }
			},
			responses: {
				"200": {
					description: "Existing export for this idempotency key",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferExportCreateResponseSchema) } }
				},
				"201": {
					description: "Export created",
					content: { [JSON_CONTENT]: { schema: successEnvelope(transferExportCreateResponseSchema) } }
				},
				...authErrors,
				...standardErrors(400, 409, 500)
			}
		}
	},
	"/_emdash/api/admin/transfer/exports/{id}": { get: {
		operationId: "getTransferExport",
		summary: "Get a site export",
		description: EXPORT_AUTH,
		tags: ["Transfer"],
		requestParams: { path: exportPathParams },
		responses: {
			"200": {
				description: "Export status",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferOperationResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 500)
		}
	} },
	"/_emdash/api/admin/transfer/exports/{id}/advance": { post: {
		operationId: "advanceTransferExport",
		summary: "Advance a site export",
		description: `Runs one bounded export step; \`nextRequestInMs\` is null once the export has ended. ${EXPORT_AUTH}`,
		tags: ["Transfer"],
		requestParams: { path: exportPathParams },
		responses: {
			"200": {
				description: "The export after one step",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferAdvanceResponseSchema) } }
			},
			...authErrors,
			...standardErrors(404, 409, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/exports/{id}/manifest": { get: {
		operationId: "getTransferExportManifest",
		summary: "Download an export manifest",
		description: `The complete export's \`manifest.json\`, byte for byte; its SHA-256 is the package digest. ${EXPORT_AUTH}`,
		tags: ["Transfer"],
		requestParams: { path: exportPathParams },
		responses: {
			"200": {
				description: "The manifest",
				content: { [JSON_CONTENT]: { schema: z.string().meta({ format: "binary" }) } }
			},
			...authErrors,
			...standardErrors(404, 409, 410, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/exports/{id}/files/{path}": { get: {
		operationId: "downloadTransferExportFile",
		summary: "Download one export file",
		description: `Streams one index chunk, record chunk, or media blob listed by the export (the path keeps its slashes). \`Content-Length\` and the \`ETag\` (hex SHA-256) describe the file; the stream fails partway if the stored bytes no longer match. ${EXPORT_AUTH}`,
		tags: ["Transfer"],
		requestParams: { path: exportPathParams.extend({ path: z.string().meta({ description: "Package file path" }) }) },
		responses: {
			"200": {
				description: "The file",
				content: { "application/octet-stream": { schema: z.string().meta({ format: "binary" }) } }
			},
			...authErrors,
			...standardErrors(404, 409, 410, 422, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/exports/{id}/archive": { get: {
		operationId: "downloadTransferExportArchive",
		summary: "Download an export archive",
		description: `Streams the complete export as one \`.emdash\` tar archive, manifest first. On Workers the whole archive streams within one request; large sites should download files individually. ${EXPORT_AUTH}`,
		tags: ["Transfer"],
		requestParams: { path: exportPathParams },
		responses: {
			"200": {
				description: "The archive",
				content: { "application/x-tar": { schema: z.string().meta({ format: "binary" }) } }
			},
			...authErrors,
			...standardErrors(404, 409, 410, 500, 503)
		}
	} },
	"/_emdash/api/admin/transfer/approvals": { get: {
		operationId: "listTransferApprovals",
		summary: "List transfer approvals",
		description: "Approval grants requested by MCP callers, newest first. Signed-in sessions only (`transfer:export` or `transfer:import`); bearer tokens are refused.",
		tags: ["Transfer"],
		requestParams: { query: transferApprovalListQuery },
		responses: {
			"200": {
				description: "One page of approvals",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferApprovalListResponseSchema) } }
			},
			...authErrors,
			...standardErrors(400, 500)
		}
	} },
	"/_emdash/api/admin/transfer/approvals/{id}/approve": { post: {
		operationId: "approveTransferApproval",
		summary: "Approve a transfer request",
		description: "Approves a pending grant; the requester can use it once within 15 minutes. Signed-in sessions only, with the permission for the grant's action; bearer tokens are refused.",
		tags: ["Transfer"],
		requestParams: { path: approvalPathParams },
		responses: {
			"200": {
				description: "The approved grant",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferApprovalResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} },
	"/_emdash/api/admin/transfer/approvals/{id}/deny": { post: {
		operationId: "denyTransferApproval",
		summary: "Deny a transfer request",
		description: "Denies a pending grant. Signed-in sessions only, with the permission for the grant's action; bearer tokens are refused.",
		tags: ["Transfer"],
		requestParams: { path: approvalPathParams },
		responses: {
			"200": {
				description: "The denied grant",
				content: { [JSON_CONTENT]: { schema: successEnvelope(transferApprovalResponseSchema) } }
			},
			...authErrors,
			...standardErrors(500)
		}
	} }
};
function buildAllPaths(maxUploadSize) {
	return {
		...contentPaths,
		...buildMediaPaths(maxUploadSize),
		...schemaPaths,
		...commentsPaths,
		...taxonomyPaths,
		...menuPaths,
		...sectionPaths,
		...widgetPaths,
		...settingsPaths,
		...searchPaths,
		...redirectPaths,
		...userPaths,
		...transferPaths
	};
}
/**
* Generate the OpenAPI 3.1 document for the EmDash CMS API.
*
* Covers: Content, Media, Schema, Comments, Taxonomies, Menus,
* Sections, Widgets, Settings, Search, Redirects, Users, Transfer.
*/
function generateOpenApiDocument(options = {}) {
	const maxUploadSize = options.maxUploadSize ?? 52428800;
	return createDocument({
		openapi: "3.1.0",
		info: {
			title: "EmDash CMS API",
			version: "0.1.0",
			description: "REST API for the EmDash CMS. All endpoints require authentication and return responses wrapped in a `{ success, data }` envelope."
		},
		servers: [{
			url: "{baseUrl}",
			description: "CMS instance",
			variables: { baseUrl: { default: "http://localhost:4321" } }
		}],
		tags: [
			{
				name: "Content",
				description: "CRUD operations for content items across collections"
			},
			{
				name: "Media",
				description: "Media library — upload, manage, and serve files"
			},
			{
				name: "Schema",
				description: "Collection and field management"
			},
			{
				name: "Comments",
				description: "Public comments and admin moderation"
			},
			{
				name: "Taxonomies",
				description: "Taxonomy definitions and terms"
			},
			{
				name: "Menus",
				description: "Navigation menu management"
			},
			{
				name: "Sections",
				description: "Reusable content sections"
			},
			{
				name: "Widgets",
				description: "Widget areas and widget management"
			},
			{
				name: "Settings",
				description: "Site-wide settings"
			},
			{
				name: "Search",
				description: "Full-text search and index management"
			},
			{
				name: "Redirects",
				description: "Redirect rules and 404 logging"
			},
			{
				name: "Users",
				description: "User management and access control"
			},
			{
				name: "Transfer",
				description: "Whole-site export and import (site packages)"
			}
		],
		components: {
			schemas: { MediaListResponse: mediaListResponseSchema },
			securitySchemes: {
				session: {
					type: "apiKey",
					in: "cookie",
					name: "emdash_session",
					description: "Session cookie set by the auth endpoints"
				},
				bearer: {
					type: "http",
					scheme: "bearer",
					description: "OAuth2 or API token"
				}
			}
		},
		security: [{ session: [] }, { bearer: [] }],
		paths: buildAllPaths(maxUploadSize)
	});
}
var OPENAPI_CACHE_KEY = Symbol.for("emdash.openapi.cachedSpec");
function getCachedSpec() {
	const val = globalThis[OPENAPI_CACHE_KEY];
	return typeof val === "string" ? val : null;
}
function setCachedSpec(spec) {
	globalThis[OPENAPI_CACHE_KEY] = spec;
}
var GET = async ({ locals }) => {
	const { emdash } = locals;
	let spec = getCachedSpec();
	if (!spec && emdash) try {
		const doc = generateOpenApiDocument({ maxUploadSize: emdash.config.maxUploadSize });
		spec = JSON.stringify(doc);
		setCachedSpec(spec);
	} catch (error) {
		return handleError(error, "Failed to generate OpenAPI document", "OPENAPI_ERROR");
	}
	if (!spec) try {
		spec = JSON.stringify(generateOpenApiDocument());
	} catch (error) {
		return handleError(error, "Failed to generate OpenAPI document", "OPENAPI_ERROR");
	}
	return new Response(spec, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "private, no-store",
			"Access-Control-Allow-Origin": "*"
		}
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/openapi.json@_@mjs
var page = () => openapi_json_exports;
export { page };
