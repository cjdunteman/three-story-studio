import { f as removeLeadingForwardSlash, g as stripRequestBase, h as slash, i as collapseDuplicateTrailingSlashes, l as joinPaths, m as removeTrailingForwardSlash, o as hasFileExtension, r as collapseDuplicateSlashes, s as isInternalPath, t as appendForwardSlash, u as prependForwardSlash } from "./path_jvl2hruy.mjs";
import { n as matchPattern } from "./remote_Z-Z8LuKO.mjs";
import { C as routeHasHtmlExtension, D as pathHasLocale, E as normalizeThePath, O as shouldAppendForwardSlash, S as isFallbackRouteMatch, T as normalizeTheLocale, _ as createAsyncManifestMemo, a as getRouteGenerator, b as getCustom500Route, c as getOriginPathname, d as getLogger, f as getResolvedLogger, g as readBodyWithLimit, h as BodySizeLimitError, i as getRouteCache, k as defineMiddleware, l as setOriginPathname, m as SERVER_ISLAND_COMPONENT, n as getParams, o as getEnvironment, p as DEFAULT_404_ROUTE, r as getProps, s as copyRequest, t as sequence, u as validateAndDecodePathname, v as createManifestMemo, w as getErrorRoutePath, x as getDefaultStatusCode, y as getCustom404Route } from "./sequence_CGsNBl3C.mjs";
import { A as ASTRO_GENERATOR, D as isRoute404, E as isRoute3xx, F as clientAddressSymbol, I as fetchStateSymbol, L as originPathnameSymbol, M as REDIRECT_STATUS_CODES, N as REROUTABLE_STATUS_CODES, O as isRoute500, P as STATUS_CODE_PAGES, R as responseSentSymbol$1, T as renderEndpoint, V as generateCspDigest, _ as isRenderInstruction, a as renderJSX, c as chunkToString, d as renderSlotToString, f as isRenderTemplateResult, i as renderPage, k as ASTRO_ERROR_HEADER, v as normalizeCspResourceEntry, y as pushDirective, z as decodeKey } from "./server_DwgP_JX5.mjs";
import { D as LocalsReassigned, E as LocalsNotAnObject, H as PrerenderClientAddressNotAvailable, I as NoManifestAvailable, K as ReservedSlotName, O as MiddlewareNoDataOrNextCalled, X as SessionStorageSaveError, Y as SessionStorageInitError, Z as StaticClientAddressNotAvailable, a as ClientAddressNotAvailable, i as CacheNotEnabled, it as isAstroError, k as MiddlewareNotAResponse, n as ActionsReturnedInvalidDataError, nt as i18nNoLocaleFoundInPath, p as ForbiddenRewrite, q as ResponseSentError, r as AstroResponseHeadersReassigned, rt as AstroError, t as ActionNotFoundError } from "./errors-data_BZ8TGgRd.mjs";
import { n as AstroIntegrationLogger, r as astroToRuntimeLogger } from "./console_Cc8F-PUH.mjs";
import React, { createElement, memo } from "react";
import ReactDOM from "react-dom/server";
import picomatch from "picomatch";
import { parse, stringify, unflatten } from "devalue";
import colors from "piccolore";
import { parseCookie, stringifySetCookie } from "cookie";
import { escape } from "html-escaper";
import { createStorage } from "unstorage";
// node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
// node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
		...serializedRoute,
		routeData: deserializeRouteData(serializedRoute.routeData)
	});
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
// \0astro:react:opts
var _astro_react_opts_default = {
	include: void 0,
	exclude: void 0,
	experimentalReactChildren: false,
	experimentalDisableStreaming: false
};
// node_modules/@astrojs/react/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "r";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
// node_modules/@astrojs/react/dist/static-html.js
/**
* Astro passes `children` as a string of HTML, so we need
* a wrapper `div` to render that content as VNodes.
*
* As a bonus, we can signal to React that this subtree is
* entirely static and will never change via `shouldComponentUpdate`.
*/
var StaticHtml = ({ value, name, hydrate = true }) => {
	if (value == null || value.trim() === "") return null;
	return createElement(hydrate ? "astro-slot" : "astro-static-slot", {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value }
	});
};
/**
* React.memo is the modern functional equivalent of shouldComponentUpdate.
*
* By returning `true` in the comparison function (the second argument),
* we tell React that the props are "equal" and it should skip re-rendering,
* effectively making this subtree static.
*/
var static_html_default = memo(StaticHtml, () => true);
// node_modules/@astrojs/internal-helpers/dist/create-filter.js
function ensureArray(thing) {
	if (Array.isArray(thing)) return thing;
	if (thing == null) return [];
	return [thing];
}
function toMatcher(pattern) {
	if (pattern instanceof RegExp) return pattern;
	const normalized = slash(pattern);
	const fn = picomatch(normalized, { dot: true });
	return { test: (what) => fn(what) };
}
function createFilter(include, exclude) {
	const includeMatchers = ensureArray(include).map(toMatcher);
	const excludeMatchers = ensureArray(exclude).map(toMatcher);
	if (!includeMatchers.length && !excludeMatchers.length) return (id) => typeof id === "string" && !id.includes("\0");
	return function(id) {
		if (typeof id !== "string") return false;
		if (id.includes("\0")) return false;
		const pathId = slash(id);
		for (const matcher of excludeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return false;
		}
		for (const matcher of includeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return true;
		}
		return !includeMatchers.length;
	};
}
// node_modules/@astrojs/react/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
var reactTypeof = Symbol.for("react.element");
var reactTransitionalTypeof = Symbol.for("react.transitional.element");
var filter = _astro_react_opts_default?.include || _astro_react_opts_default?.exclude ? createFilter(_astro_react_opts_default.include, _astro_react_opts_default.exclude) : null;
async function check(Component, props, children, metadata) {
	if (typeof Component === "object") return Component["$$typeof"]?.toString().slice(7).startsWith("react") ?? false;
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;
	if (typeof Component === "function" && Component["$$typeof"] === Symbol.for("react.forward_ref")) return false;
	if (Component.prototype != null && typeof Component.prototype.render === "function") return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	if (filter && metadata?.componentUrl && !filter(metadata.componentUrl)) return false;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) isReactComponent = true;
		} catch {}
		return React.createElement("div");
	}
	await renderToStaticMarkup.call(this, Tester, props, children);
	return isReactComponent;
}
async function getNodeWritable() {
	let { Writable } = await import(
		/* @vite-ignore */
		"node:stream"
);
	return Writable;
}
function needsHydration(metadata) {
	return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	let prefix;
	if (this && this.result) prefix = incrementId(this.result);
	const attrs = { prefix };
	delete props["class"];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(static_html_default, {
			hydrate: needsHydration(metadata),
			value,
			name
		});
	}
	const newProps = {
		...props,
		...slots
	};
	const newChildren = children ?? props.children;
	if (children && _astro_react_opts_default.experimentalReactChildren) {
		attrs["data-react-children"] = true;
		newProps.children = (await import("./vnode-children_C4hxNQje.mjs").then((mod) => mod.default))(children);
	} else if (newChildren != null) newProps.children = React.createElement(static_html_default, {
		hydrate: needsHydration(metadata),
		value: newChildren
	});
	const formState = this ? await getFormState(this) : void 0;
	if (formState) {
		attrs["data-action-result"] = JSON.stringify(formState[0]);
		attrs["data-action-key"] = formState[1];
		attrs["data-action-name"] = formState[2];
	}
	const vnode = React.createElement(Component, newProps);
	const renderOptions = {
		identifierPrefix: prefix,
		formState
	};
	let html;
	if (_astro_react_opts_default.experimentalDisableStreaming) html = ReactDOM.renderToString(vnode, renderOptions);
	else if ("renderToReadableStream" in ReactDOM) html = await renderToReadableStreamAsync(vnode, renderOptions);
	else html = await renderToPipeableStreamAsync(vnode, renderOptions);
	return {
		html,
		attrs
	};
}
async function getFormState({ result }) {
	const { request, actionResult } = result;
	if (!actionResult) return void 0;
	if (!isFormRequest(request.headers.get("content-type"))) return void 0;
	const { searchParams } = new URL(request.url);
	/**
	* The key generated by React to identify each `useActionState()` call.
	* @example "k511f74df5a35d32e7cf266450d85cb6c"
	*/
	const actionKey = (await request.clone().formData()).get("$ACTION_KEY")?.toString();
	/**
	* The action name returned by an action's `toString()` property.
	* This matches the endpoint path.
	* @example "/_actions/blog.like"
	*/
	const actionName = searchParams.get("_action");
	if (!actionKey || !actionName) return void 0;
	return [
		actionResult,
		actionKey,
		actionName
	];
}
async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = "";
	return new Promise((resolve, reject) => {
		let error = void 0;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(new Writable({
					write(chunk, _encoding, callback) {
						html += chunk.toString("utf-8");
						callback();
					},
					destroy() {
						resolve(html);
					}
				}));
			}
		});
	});
}
/**
* Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
* See https://github.com/facebook/react/issues/24169
*/
async function readResult(stream) {
	const reader = stream.getReader();
	let result = "";
	const decoder = new TextDecoder("utf-8");
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) result += decoder.decode(value);
			else decoder.decode(/* @__PURE__ */ new Uint8Array());
			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}
async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
var formContentTypes$1 = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
	const type = contentType?.split(";")[0].toLowerCase();
	return formContentTypes$1.some((t) => type === t);
}
// \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/react",
	"clientEntrypoint": "@astrojs/react/client.js",
	"serverEntrypoint": "@astrojs/react/server.js"
}, { ssr: {
	name: "@astrojs/react",
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: true
} })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/emdash/dist/astro/image-endpoint.mjs",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/.well-known/auth",
			"pattern": "^\\/_emdash\\/\\.well-known\\/auth\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs",
			"pathname": "/_emdash/.well-known/auth",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"isIndex": false,
			"route": "/_emdash/admin/[...path]",
			"pattern": "^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...path"],
			"component": "node_modules/emdash/src/astro/routes/admin.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains/[domain]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["domain"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/allowed-domains",
			"pattern": "^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "allowed-domains",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs",
			"pathname": "/_emdash/api/admin/allowed-domains",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/api-tokens",
			"pattern": "^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api-tokens",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs",
			"pathname": "/_emdash/api/admin/api-tokens",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs",
			"pathname": "/_emdash/api/admin/byline-fields/reorder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]/usage",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields/[slug]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/byline-fields",
			"pattern": "^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "byline-fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs",
			"pathname": "/_emdash/api/admin/byline-fields",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/bylines",
			"pattern": "^\\/_emdash\\/api\\/admin\\/bylines\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bylines",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs",
			"pathname": "/_emdash/api/admin/bylines",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/bulk",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bulk",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs",
			"pathname": "/_emdash/api/admin/comments/bulk",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/counts",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "counts",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs",
			"pathname": "/_emdash/api/admin/comments/counts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]/status",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/comments",
			"pattern": "^\\/_emdash\\/api\\/admin\\/comments\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs",
			"pathname": "/_emdash/api/admin/comments",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/core-update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/core-update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "core-update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs",
			"pathname": "/_emdash/api/admin/core-update",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive/[hookName]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hookName",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["hookName"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/hooks/exclusive",
			"pattern": "^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "hooks",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "exclusive",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs",
			"pathname": "/_emdash/api/admin/hooks/exclusive",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/activation",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/activation\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "activation",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs",
			"pathname": "/_emdash/api/admin/media-usage/activation",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/collection-deletions/retry",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/retry\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection-deletions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "retry",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs",
			"pathname": "/_emdash/api/admin/media-usage/collection-deletions/retry",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/collection-deletions",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection-deletions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs",
			"pathname": "/_emdash/api/admin/media-usage/collection-deletions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/progress",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/progress\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "progress",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs",
			"pathname": "/_emdash/api/admin/media-usage/progress",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/repair",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "repair",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs",
			"pathname": "/_emdash/api/admin/media-usage/repair",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/work/retry",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/retry\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "work",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "retry",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs",
			"pathname": "/_emdash/api/admin/media-usage/work/retry",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/media-usage/work",
			"pattern": "^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media-usage",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "work",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs",
			"pathname": "/_emdash/api/admin/media-usage/work",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/oauth-clients",
			"pattern": "^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-clients",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs",
			"pathname": "/_emdash/api/admin/oauth-clients",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/icon",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "icon",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/plugins/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/artifact",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "artifact",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/artifact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/install",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "install",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/install",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/publisher-handle",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/publisher-handle\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "publisher-handle",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/publisher-handle",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/verify",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs",
			"pathname": "/_emdash/api/admin/plugins/registry/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/[id]/uninstall",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/uninstall\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "uninstall",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/registry/[id]/update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "registry",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/updates",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "updates",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs",
			"pathname": "/_emdash/api/admin/plugins/updates",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/mcp",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/settings",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/uninstall",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "uninstall",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]/update",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "update",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/plugins",
			"pattern": "^\\/_emdash\\/api\\/admin\\/plugins\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs",
			"pathname": "/_emdash/api/admin/plugins",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/scheduled-policy-rejections/[collection]/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/scheduled-policy-rejections\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "scheduled-policy-rejections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]/thumbnail",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "thumbnail",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/themes/marketplace",
			"pattern": "^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "marketplace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs",
			"pathname": "/_emdash/api/admin/themes/marketplace",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/transfer/[...path]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/transfer(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "transfer",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...path"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/disable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "disable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/enable",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]/send-recovery",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "send-recovery",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users/[id]",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/admin/users",
			"pattern": "^\\/_emdash\\/api\\/admin\\/users\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "users",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs",
			"pathname": "/_emdash/api/admin/users",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs",
			"pathname": "/_emdash/api/auth/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/handover",
			"pattern": "^\\/_emdash\\/api\\/auth\\/handover\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "handover",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/handover.mjs",
			"pathname": "/_emdash/api/auth/handover",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/accept",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "accept",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs",
			"pathname": "/_emdash/api/auth/invite/accept",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs",
			"pathname": "/_emdash/api/auth/invite/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite/register-options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register-options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs",
			"pathname": "/_emdash/api/auth/invite/register-options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/invite",
			"pattern": "^\\/_emdash\\/api\\/auth\\/invite\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "invite",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs",
			"pathname": "/_emdash/api/auth/invite",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/logout",
			"pattern": "^\\/_emdash\\/api\\/auth\\/logout\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logout",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/logout.mjs",
			"pathname": "/_emdash/api/auth/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/send",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "send",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs",
			"pathname": "/_emdash/api/auth/magic-link/send",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/magic-link/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "magic-link",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs",
			"pathname": "/_emdash/api/auth/magic-link/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/me",
			"pattern": "^\\/_emdash\\/api\\/auth\\/me\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "me",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/me.mjs",
			"pathname": "/_emdash/api/auth/me",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/mode",
			"pattern": "^\\/_emdash\\/api\\/auth\\/mode\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mode",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/mode.mjs",
			"pathname": "/_emdash/api/auth/mode",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]/callback",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/oauth/[provider]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "provider",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["provider"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/options",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "options",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/options",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/register/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/register/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs",
			"pathname": "/_emdash/api/auth/passkey/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey/[id]",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/passkey",
			"pattern": "^\\/_emdash\\/api\\/auth\\/passkey\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "passkey",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs",
			"pathname": "/_emdash/api/auth/passkey",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/complete",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "complete",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs",
			"pathname": "/_emdash/api/auth/signup/complete",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/request",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "request",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs",
			"pathname": "/_emdash/api/auth/signup/request",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/auth/signup/verify",
			"pattern": "^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "signup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs",
			"pathname": "/_emdash/api/auth/signup/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/calendar",
			"pattern": "^\\/_emdash\\/api\\/calendar\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "calendar",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/calendar.mjs",
			"pathname": "/_emdash/api/calendar",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]/reactions",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reactions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/comments/[collection]/[contentId]",
			"pattern": "^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "comments",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "contentId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "contentId"],
			"component": "node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/authors",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "authors",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/trash",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "trash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/compare",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "compare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/discard-draft",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "discard-draft",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/duplicate",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "duplicate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/lock",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/lock\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "lock",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/permanent",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "permanent",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/plugin-extensions/[pluginId]/[kind]/[extensionId]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/plugin-extensions\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "plugin-extensions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pluginId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "kind",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "extensionId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"pluginId",
				"kind",
				"extensionId"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/preview-url",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "preview-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/publish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "publish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/references/[relation]/children",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/children\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "references",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relation",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "children",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"relation"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/references/[relation]/parents",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/parents\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "references",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relation",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "parents",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"relation"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/restore",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/revisions",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/schedule",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "schedule",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/terms/[taxonomy]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomy",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": [
				"collection",
				"id",
				"taxonomy"
			],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/translations",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]/unpublish",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "unpublish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]/[id]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/content/[collection]",
			"pattern": "^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dashboard",
			"pattern": "^\\/_emdash\\/api\\/dashboard\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dashboard",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dashboard.mjs",
			"pathname": "/_emdash/api/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/dev/emails",
			"pattern": "^\\/_emdash\\/api\\/dev\\/emails\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "emails",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/dev/emails.mjs",
			"pathname": "/_emdash/api/dev/emails",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/health",
			"pattern": "^\\/_emdash\\/api\\/health\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "health",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/health.mjs",
			"pathname": "/_emdash/api/health",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/probe",
			"pattern": "^\\/_emdash\\/api\\/import\\/probe\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "probe",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/probe.mjs",
			"pathname": "/_emdash/api/import/probe",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/media",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs",
			"pathname": "/_emdash/api/import/wordpress/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/prepare",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "prepare",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs",
			"pathname": "/_emdash/api/import/wordpress/prepare",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress/rewrite-urls",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rewrite-urls",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs",
			"pathname": "/_emdash/api/import/wordpress/rewrite-urls",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/analyze",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "analyze",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/analyze",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/callback",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "callback",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/callback",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/import/wordpress-plugin/execute",
			"pattern": "^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "import",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "wordpress-plugin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "execute",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs",
			"pathname": "/_emdash/api/import/wordpress-plugin/execute",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/manifest",
			"pattern": "^\\/_emdash\\/api\\/manifest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "manifest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/manifest.mjs",
			"pathname": "/_emdash/api/manifest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/mcp",
			"pattern": "^\\/_emdash\\/api\\/mcp\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mcp",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/mcp.mjs",
			"pathname": "/_emdash/api/mcp",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/asset/[id]/[filename]",
			"pattern": "^\\/_emdash\\/api\\/media\\/asset\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "asset",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "filename",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id", "filename"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/file/[...key]",
			"pattern": "^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "file",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "...key",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["...key"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/folders/[id]",
			"pattern": "^\\/_emdash\\/api\\/media\\/folders\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "folders",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/folders",
			"pattern": "^\\/_emdash\\/api\\/media\\/folders\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "folders",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs",
			"pathname": "/_emdash/api/media/folders",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]/[itemId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "itemId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId", "itemId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers/[providerId]",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providerId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["providerId"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/providers",
			"pattern": "^\\/_emdash\\/api\\/media\\/providers\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "providers",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs",
			"pathname": "/_emdash/api/media/providers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/upload-url",
			"pattern": "^\\/_emdash\\/api\\/media\\/upload-url\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "upload-url",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs",
			"pathname": "/_emdash/api/media/upload-url",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/confirm",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "confirm",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/replace",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/replace\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "replace",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/upload",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/upload\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "upload",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]/usage",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "usage",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media/[id]",
			"pattern": "^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/media/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/media",
			"pattern": "^\\/_emdash\\/api\\/media\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "media",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/media.mjs",
			"pathname": "/_emdash/api/media",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items/[id]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/items",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "items",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]/translations",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus/[name]",
			"pattern": "^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/menus",
			"pattern": "^\\/_emdash\\/api\\/menus\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "menus",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/menus/index.mjs",
			"pathname": "/_emdash/api/menus",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/authorize",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs",
			"pathname": "/_emdash/api/oauth/device/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/code",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "code",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs",
			"pathname": "/_emdash/api/oauth/device/code",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/device/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "device",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs",
			"pathname": "/_emdash/api/oauth/device/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/register",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/register\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/register.mjs",
			"pathname": "/_emdash/api/oauth/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/refresh",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "refresh",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs",
			"pathname": "/_emdash/api/oauth/token/refresh",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token/revoke",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revoke",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs",
			"pathname": "/_emdash/api/oauth/token/revoke",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/oauth/token",
			"pattern": "^\\/_emdash\\/api\\/oauth\\/token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/token.mjs",
			"pathname": "/_emdash/api/oauth/token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/openapi.json",
			"pattern": "^\\/_emdash\\/api\\/openapi\\.json$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "openapi.json",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/openapi.json.mjs",
			"pathname": "/_emdash/api/openapi.json",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/plugins/[pluginId]/[...path]",
			"pattern": "^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "plugins",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pluginId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "...path",
					"dynamic": true,
					"spread": true
				}]
			],
			"params": ["pluginId", "...path"],
			"component": "node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s/summary",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "summary",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs",
			"pathname": "/_emdash/api/redirects/404s/summary",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/404s",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/404s\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "404s",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs",
			"pathname": "/_emdash/api/redirects/404s",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects/[id]",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/redirects",
			"pattern": "^\\/_emdash\\/api\\/redirects\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "redirects",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/redirects/index.mjs",
			"pathname": "/_emdash/api/redirects",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/relations/[id]",
			"pattern": "^\\/_emdash\\/api\\/relations\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relations",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/relations",
			"pattern": "^\\/_emdash\\/api\\/relations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "relations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/relations/index.mjs",
			"pathname": "/_emdash/api/relations",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]/restore",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "restore",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/revisions/[revisionId]",
			"pattern": "^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "revisionId",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["revisionId"],
			"component": "node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types/[slug]/versions/[version]/activate",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/versions\\/([^/]+?)\\/activate\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "versions",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "version",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "activate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug", "version"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/block-types",
			"pattern": "^\\/_emdash\\/api\\/schema\\/block-types\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "block-types",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs",
			"pathname": "/_emdash/api/schema/block-types",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/reorder",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs",
			"pathname": "/_emdash/api/schema/collections/reorder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/reorder",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "fieldSlug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug", "fieldSlug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]/fields",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "fields",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/collections",
			"pattern": "^\\/_emdash\\/api\\/schema\\/collections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs",
			"pathname": "/_emdash/api/schema/collections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans/[slug]",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema/orphans",
			"pattern": "^\\/_emdash\\/api\\/schema\\/orphans\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orphans",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs",
			"pathname": "/_emdash/api/schema/orphans",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/schema",
			"pattern": "^\\/_emdash\\/api\\/schema\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "schema",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/schema/index.mjs",
			"pathname": "/_emdash/api/schema",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/enable",
			"pattern": "^\\/_emdash\\/api\\/search\\/enable\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "enable",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/enable.mjs",
			"pathname": "/_emdash/api/search/enable",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/rebuild",
			"pattern": "^\\/_emdash\\/api\\/search\\/rebuild\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rebuild",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs",
			"pathname": "/_emdash/api/search/rebuild",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/stats",
			"pattern": "^\\/_emdash\\/api\\/search\\/stats\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "stats",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/stats.mjs",
			"pathname": "/_emdash/api/search/stats",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search/suggest",
			"pattern": "^\\/_emdash\\/api\\/search\\/suggest\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "suggest",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/suggest.mjs",
			"pathname": "/_emdash/api/search/suggest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/search",
			"pattern": "^\\/_emdash\\/api\\/search\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/search/index.mjs",
			"pathname": "/_emdash/api/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections/[slug]",
			"pattern": "^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/sections",
			"pattern": "^\\/_emdash\\/api\\/sections\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "sections",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/sections/index.mjs",
			"pathname": "/_emdash/api/sections",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives/[name]",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/archives",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "archives",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs",
			"pathname": "/_emdash/api/settings/backups/archives",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups/export",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "export",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs",
			"pathname": "/_emdash/api/settings/backups/export",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/backups",
			"pattern": "^\\/_emdash\\/api\\/settings\\/backups\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "backups",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs",
			"pathname": "/_emdash/api/settings/backups",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/domain/notify",
			"pattern": "^\\/_emdash\\/api\\/settings\\/domain\\/notify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "notify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs",
			"pathname": "/_emdash/api/settings/domain/notify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/domain",
			"pattern": "^\\/_emdash\\/api\\/settings\\/domain\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/domain.mjs",
			"pathname": "/_emdash/api/settings/domain",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings/email",
			"pattern": "^\\/_emdash\\/api\\/settings\\/email\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "email",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings/email.mjs",
			"pathname": "/_emdash/api/settings/email",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/settings",
			"pattern": "^\\/_emdash\\/api\\/settings\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "settings",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/settings.mjs",
			"pathname": "/_emdash/api/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin/verify",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs",
			"pathname": "/_emdash/api/setup/admin/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/admin",
			"pattern": "^\\/_emdash\\/api\\/setup\\/admin\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/admin.mjs",
			"pathname": "/_emdash/api/setup/admin",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-bypass",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-bypass",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs",
			"pathname": "/_emdash/api/setup/dev-bypass",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/dev-reset",
			"pattern": "^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dev-reset",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs",
			"pathname": "/_emdash/api/setup/dev-reset",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup/status",
			"pattern": "^\\/_emdash\\/api\\/setup\\/status\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "status",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/status.mjs",
			"pathname": "/_emdash/api/setup/status",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/setup",
			"pattern": "^\\/_emdash\\/api\\/setup\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "setup",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/setup/index.mjs",
			"pathname": "/_emdash/api/setup",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/site/domain-proof",
			"pattern": "^\\/_emdash\\/api\\/site\\/domain-proof\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "site",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "domain-proof",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs",
			"pathname": "/_emdash/api/site/domain-proof",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/snapshot",
			"pattern": "^\\/_emdash\\/api\\/snapshot\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "snapshot",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/snapshot.mjs",
			"pathname": "/_emdash/api/snapshot",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/bulk-tag",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/bulk-tag\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "bulk-tag",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs",
			"pathname": "/_emdash/api/taxonomies/bulk-tag",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]/translations",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms/[slug]",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "slug"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/terms",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]/translations",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/translations\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "translations",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies/[name]",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/taxonomies",
			"pattern": "^\\/_emdash\\/api\\/taxonomies\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "taxonomies",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs",
			"pathname": "/_emdash/api/taxonomies",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/themes/preview",
			"pattern": "^\\/_emdash\\/api\\/themes\\/preview\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "themes",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "preview",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/themes/preview.mjs",
			"pathname": "/_emdash/api/themes/preview",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/typegen",
			"pattern": "^\\/_emdash\\/api\\/typegen\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "typegen",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/typegen.mjs",
			"pathname": "/_emdash/api/typegen",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/action-token",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/action-token\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "action-token",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs",
			"pathname": "/_emdash/api/visual-editing/action-token",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/content/[collection]/[id]/publish",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "content",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "collection",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "publish",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["collection", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/visual-editing/toolbar-labels",
			"pattern": "^\\/_emdash\\/api\\/visual-editing\\/toolbar-labels\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "visual-editing",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "toolbar-labels",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs",
			"pathname": "/_emdash/api/visual-editing/toolbar-labels",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/reorder",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "reorder",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets/[id]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name", "id"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]/widgets",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "widgets",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas/[name]",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "name",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["name"],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-areas",
			"pattern": "^\\/_emdash\\/api\\/widget-areas\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-areas",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs",
			"pathname": "/_emdash/api/widget-areas",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/api/widget-components",
			"pattern": "^\\/_emdash\\/api\\/widget-components\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "widget-components",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/widget-components.mjs",
			"pathname": "/_emdash/api/widget-components",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/_emdash/oauth/authorize",
			"pattern": "^\\/_emdash\\/oauth\\/authorize\\/?$",
			"segments": [
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "authorize",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs",
			"pathname": "/_emdash/oauth/authorize",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-authorization-server/_emdash",
			"pattern": "^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$",
			"segments": [
				[{
					"content": ".well-known",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "oauth-authorization-server",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "_emdash",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs",
			"pathname": "/.well-known/oauth-authorization-server/_emdash",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/.well-known/oauth-protected-resource",
			"pattern": "^\\/\\.well-known\\/oauth-protected-resource\\/?$",
			"segments": [[{
				"content": ".well-known",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "oauth-protected-resource",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs",
			"pathname": "/.well-known/oauth-protected-resource",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404\\/?$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about\\/?$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about.astro",
			"pathname": "/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/gallery",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/gallery\\/?$",
			"segments": [[{
				"content": "gallery",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/gallery.astro",
			"pathname": "/gallery",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/projects/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/projects\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "projects",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/projects/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/robots.txt",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/robots.txt.mjs",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap.xml",
			"pattern": "^\\/sitemap\\.xml$",
			"segments": [[{
				"content": "sitemap.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/emdash/dist/astro/routes/sitemap.xml.mjs",
			"pathname": "/sitemap.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/sitemap-[collection].xml",
			"pattern": "^\\/sitemap-([^/]+?)\\.xml$",
			"segments": [[
				{
					"content": "sitemap-",
					"dynamic": false,
					"spread": false
				},
				{
					"content": "collection",
					"dynamic": true,
					"spread": false
				},
				{
					"content": ".xml",
					"dynamic": false,
					"spread": false
				}
			]],
			"params": ["collection"],
			"component": "node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
// \0virtual:astro:pages
var _page0 = () => import("./image-endpoint_CTjPD7Qc.mjs");
var _page1 = () => import("./auth_e6RIm2-j.mjs");
var _page2 = () => import("./admin_BsnYCNE1.mjs");
var _page3 = () => import("./_domain__CpZscK0k.mjs");
var _page4 = () => import("./index_Dhtr9DdF.mjs");
var _page5 = () => import("./_id__ChgeqsSy.mjs");
var _page6 = () => import("./index_C6Z3o4N7.mjs");
var _page7 = () => import("./reorder_2h1UcT9n.mjs");
var _page8 = () => import("./usage_SRPxl1t7.mjs");
var _page9 = () => import("./_slug__BNWD0oOG.mjs");
var _page10 = () => import("./index_WxZHTxyu.mjs");
var _page11 = () => import("./translations_BFXYMQEa.mjs");
var _page12 = () => import("./index_BGdkb-Bv.mjs");
var _page13 = () => import("./index_DxRCxlmI.mjs");
var _page14 = () => import("./bulk_DLWE7I5a.mjs");
var _page15 = () => import("./counts_DqP9LiGx.mjs");
var _page16 = () => import("./status_DZFsK2TG.mjs");
var _page17 = () => import("./_id__C5QKIbSi.mjs");
var _page18 = () => import("./index_iW71XJZM.mjs");
var _page19 = () => import("./core-update_CPJNq6p-.mjs");
var _page20 = () => import("./_hookName__Dbx0PxZE.mjs");
var _page21 = () => import("./index_Csr5rDy1.mjs");
var _page22 = () => import("./activation_Cq-9hw_X.mjs");
var _page23 = () => import("./retry_3uQZoPTA.mjs");
var _page24 = () => import("./index_DtryRSPt.mjs");
var _page25 = () => import("./progress_CMECl8IL.mjs");
var _page26 = () => import("./repair_BHFESOlQ.mjs");
var _page27 = () => import("./retry_C7xdC1w-.mjs");
var _page28 = () => import("./index_CCkxTJrD.mjs");
var _page29 = () => import("./_id__nuPaLPAf.mjs");
var _page30 = () => import("./index_D8mVLb-P.mjs");
var _page31 = () => import("./icon_CamZOtzp.mjs");
var _page32 = () => import("./install_CKf6ZbGA.mjs");
var _page33 = () => import("./index_D3Z6NCUR.mjs");
var _page34 = () => import("./index_C4fkoW7T.mjs");
var _page35 = () => import("./artifact_DWDCKKL-.mjs");
var _page36 = () => import("./install_BF2CSIop.mjs");
var _page37 = () => import("./publisher-handle_0nx0bltn.mjs");
var _page38 = () => import("./verify_UTPjUwBc.mjs");
var _page39 = () => import("./uninstall_BN9rR-5o.mjs");
var _page40 = () => import("./update_Bm6DmtCa.mjs");
var _page41 = () => import("./updates_DIuRnknG.mjs");
var _page42 = () => import("./disable_Be2lTstO.mjs");
var _page43 = () => import("./enable_Cub2r_q4.mjs");
var _page44 = () => import("./mcp_BmXo1ob1.mjs");
var _page45 = () => import("./settings_CvmcV1WB.mjs");
var _page46 = () => import("./uninstall_CQksq_Ys.mjs");
var _page47 = () => import("./update_Di5JNCwS.mjs");
var _page48 = () => import("./index_BGPvBE5h.mjs");
var _page49 = () => import("./index_BrIm17gX.mjs");
var _page50 = () => import("./_id__DdkOV576.mjs");
var _page51 = () => import("./thumbnail_Hxp5-3wB.mjs");
var _page52 = () => import("./index_C2MxzHg-.mjs");
var _page53 = () => import("./index_DP_c8XOO.mjs");
var _page54 = () => import("./_.._DSwavgjL.mjs");
var _page55 = () => import("./disable_DcZe7LSW.mjs");
var _page56 = () => import("./enable_D8f6mAvW.mjs");
var _page57 = () => import("./send-recovery_rz8oQ5Zg.mjs");
var _page58 = () => import("./index_OOLKW1Yj.mjs");
var _page59 = () => import("./index_Bxr89ss2.mjs");
var _page60 = () => import("./dev-bypass_CyIRSqiu.mjs");
var _page61 = () => import("./handover_jYrwSo-Q.mjs");
var _page62 = () => import("./accept_BExzhfVv.mjs");
var _page63 = () => import("./complete_cDOf1CO5.mjs");
var _page64 = () => import("./register-options_BsZXwYIl.mjs");
var _page65 = () => import("./index_Dy5GEbp9.mjs");
var _page66 = () => import("./logout_ALmCcNtL.mjs");
var _page67 = () => import("./send_pRxw4ipf.mjs");
var _page68 = () => import("./verify_BzPmxAXm.mjs");
var _page69 = () => import("./me_DI0a9tTg.mjs");
var _page70 = () => import("./mode_R1KbL3fV.mjs");
var _page71 = () => import("./callback_BZB2hyHV.mjs");
var _page72 = () => import("./_provider__DamUBWt0.mjs");
var _page73 = () => import("./options_C6_6J-BO.mjs");
var _page74 = () => import("./options_C09fhm6A.mjs");
var _page75 = () => import("./verify_i97XZaJw.mjs");
var _page76 = () => import("./verify_BDxK4mZ1.mjs");
var _page77 = () => import("./_id__BTVuFlrQ.mjs");
var _page78 = () => import("./index_DwM0dSPz.mjs");
var _page79 = () => import("./complete_CKoirr_f.mjs");
var _page80 = () => import("./request_DSW-7r6v.mjs");
var _page81 = () => import("./verify_C2oCaI8Q.mjs");
var _page82 = () => import("./calendar_NqTN9GI8.mjs");
var _page83 = () => import("./reactions_CJ_XVZyV.mjs");
var _page84 = () => import("./index_VTmK2Yix.mjs");
var _page85 = () => import("./authors_CmAyL1fr.mjs");
var _page86 = () => import("./trash_Dm2ud5m0.mjs");
var _page87 = () => import("./compare_D7tTc3Zt.mjs");
var _page88 = () => import("./discard-draft_BU3e5Uyc.mjs");
var _page89 = () => import("./duplicate_DWbKYKRK.mjs");
var _page90 = () => import("./lock_D9OFHAyw.mjs");
var _page91 = () => import("./permanent_DhjVftK9.mjs");
var _page92 = () => import("./_extensionId__LnSTncvE.mjs");
var _page93 = () => import("./preview-url_CW3RfYqA.mjs");
var _page94 = () => import("./publish_q0bHPGSq.mjs");
var _page95 = () => import("./children_DaFkt8Pd.mjs");
var _page96 = () => import("./parents_B-hH6pL_.mjs");
var _page97 = () => import("./restore_pFXL_sFs.mjs");
var _page98 = () => import("./revisions_BtZg8MAj.mjs");
var _page99 = () => import("./schedule_DRNdV6cV.mjs");
var _page100 = () => import("./_taxonomy__Nnkr4P42.mjs");
var _page101 = () => import("./translations_8A-dhi3C.mjs");
var _page102 = () => import("./unpublish_Cj1SiYdC.mjs");
var _page103 = () => import("./_id__YydmCU8x.mjs");
var _page104 = () => import("./index_bgoTyVsg.mjs");
var _page105 = () => import("./dashboard_D9YZurV3.mjs");
var _page106 = () => import("./emails_BFR5v5mO.mjs");
var _page107 = () => import("./health_nrgPrV0H.mjs");
var _page108 = () => import("./probe_B7phC26E.mjs");
var _page109 = () => import("./analyze_DMWVKv4w.mjs");
var _page110 = () => import("./execute_Bn3Ls8jC.mjs");
var _page111 = () => import("./media_BaT8O5lj.mjs");
var _page112 = () => import("./prepare_rUCG-Xqc.mjs");
var _page113 = () => import("./rewrite-urls_BmXm-PMA.mjs");
var _page114 = () => import("./analyze_FzjoLUhU.mjs");
var _page115 = () => import("./callback_BMVHDsPA.mjs");
var _page116 = () => import("./execute_Bt3uouW_.mjs");
var _page117 = () => import("./manifest_B4jjgc5o.mjs");
var _page118 = () => import("./mcp_C0fTJ2LH.mjs");
var _page119 = () => import("./_filename__DTaHkdHT.mjs");
var _page120 = () => import("./_.._CHTJgZ36.mjs");
var _page121 = () => import("./_id__CyESs0aV.mjs");
var _page122 = () => import("./index_mOK74t1E.mjs");
var _page123 = () => import("./_itemId__DtUvSRB2.mjs");
var _page124 = () => import("./index_BOnGHzYD.mjs");
var _page125 = () => import("./index_BLNOLt2U.mjs");
var _page126 = () => import("./upload-url_D_C4XpnN.mjs");
var _page127 = () => import("./confirm_CDquSPiZ.mjs");
var _page128 = () => import("./replace_p6V6aGGr.mjs");
var _page129 = () => import("./upload_C-HMwsUA.mjs");
var _page130 = () => import("./usage_DJUJVnro.mjs");
var _page131 = () => import("./_id__DaIGpj4J.mjs");
var _page132 = () => import("./media_3t6k6Blv.mjs");
var _page133 = () => import("./_id__Ctj8LJ_1.mjs");
var _page134 = () => import("./items_BUPmP3vu.mjs");
var _page135 = () => import("./reorder_Eo9J-xjU.mjs");
var _page136 = () => import("./translations_BQc-i_LH.mjs");
var _page137 = () => import("./_name__C675F7CQ.mjs");
var _page138 = () => import("./index_DiclkZ63.mjs");
var _page139 = () => import("./authorize_DRZeykPi.mjs");
var _page140 = () => import("./code_DMBf4ckN.mjs");
var _page141 = () => import("./token_BNIQRF_I.mjs");
var _page142 = () => import("./register_4LioqRN2.mjs");
var _page143 = () => import("./refresh_CagY0oVy.mjs");
var _page144 = () => import("./revoke_mLvEGuzr.mjs");
var _page145 = () => import("./token_BF-mympN.mjs");
var _page146 = () => import("./openapi_Dn-JzmTb.mjs");
var _page147 = () => import("./_.._CVMFdAcf.mjs");
var _page148 = () => import("./summary_C9qxNC4Q.mjs");
var _page149 = () => import("./index_24h2HCW7.mjs");
var _page150 = () => import("./_id__C1-JUGzO.mjs");
var _page151 = () => import("./index_Cs-80pN4.mjs");
var _page152 = () => import("./index_BfV7ynp8.mjs");
var _page153 = () => import("./index_CIFRJ8Z-.mjs");
var _page154 = () => import("./restore_BoVoHxa6.mjs");
var _page155 = () => import("./index_Csou3y-a.mjs");
var _page156 = () => import("./activate_DkLmk0Cd.mjs");
var _page157 = () => import("./index_D72-zWL-.mjs");
var _page158 = () => import("./index_BFI4i1rw.mjs");
var _page159 = () => import("./reorder_DuPyGf30.mjs");
var _page160 = () => import("./reorder_BLDAhR1S.mjs");
var _page161 = () => import("./_fieldSlug__CdnjOaHa.mjs");
var _page162 = () => import("./index_C5ySrmWP.mjs");
var _page163 = () => import("./index_CEnNz0NV.mjs");
var _page164 = () => import("./index_DQZds5m9.mjs");
var _page165 = () => import("./_slug__O4JV7Jqb.mjs");
var _page166 = () => import("./index_m9-jRDXg.mjs");
var _page167 = () => import("./index_OPjn7fr-.mjs");
var _page168 = () => import("./enable_CBJxZOLJ.mjs");
var _page169 = () => import("./rebuild_DW929jkP.mjs");
var _page170 = () => import("./stats_BZdf15Pn.mjs");
var _page171 = () => import("./suggest_B48k5rZB.mjs");
var _page172 = () => import("./index_CIvPgVyO.mjs");
var _page173 = () => import("./_slug__Cp1wazA1.mjs");
var _page174 = () => import("./index_CK-mRKus.mjs");
var _page175 = () => import("./_name__DQFBpHt2.mjs");
var _page176 = () => import("./index_CqGWDLt6.mjs");
var _page177 = () => import("./export_DEJmq_5g.mjs");
var _page178 = () => import("./index_Dv2wTqWV.mjs");
var _page179 = () => import("./domain-notify_DLc3P8rg.mjs");
var _page180 = () => import("./domain_CWnW1hcH.mjs");
var _page181 = () => import("./email_Bc7n5ViU.mjs");
var _page182 = () => import("./settings_DRwzGszV.mjs");
var _page183 = () => import("./admin-verify_BClFgT7W.mjs");
var _page184 = () => import("./admin_EWgUUE66.mjs");
var _page185 = () => import("./dev-bypass_D5xQYqbo.mjs");
var _page186 = () => import("./dev-reset_Ia3RUVaO.mjs");
var _page187 = () => import("./status_CnZ63PaH.mjs");
var _page188 = () => import("./index_CzvdhHJZ.mjs");
var _page189 = () => import("./domain-proof_BYmsxUqt.mjs");
var _page190 = () => import("./snapshot_vdnbZgVs.mjs");
var _page191 = () => import("./bulk-tag_CefgDXDj.mjs");
var _page192 = () => import("./reorder_DTqC6FpH.mjs");
var _page193 = () => import("./translations_Bu20AdC0.mjs");
var _page194 = () => import("./_slug__D4x4k1_n.mjs");
var _page195 = () => import("./index_BFz98aVW.mjs");
var _page196 = () => import("./translations_CVDP3qhF.mjs");
var _page197 = () => import("./_name__DhkHJYjO.mjs");
var _page198 = () => import("./index_DfyJxwNb.mjs");
var _page199 = () => import("./preview_CCQmvevR.mjs");
var _page200 = () => import("./typegen_CyyZCA_M.mjs");
var _page201 = () => import("./action-token_DwHIJtkn.mjs");
var _page202 = () => import("./publish_BOJPQqo2.mjs");
var _page203 = () => import("./toolbar-labels_D5fa3bX8.mjs");
var _page204 = () => import("./reorder_W8-BRd_6.mjs");
var _page205 = () => import("./_id__CA_3YQk9.mjs");
var _page206 = () => import("./widgets_BcfGPM9F.mjs");
var _page207 = () => import("./_name__Q6ORI9SU.mjs");
var _page208 = () => import("./index_Cqb3JXee.mjs");
var _page209 = () => import("./widget-components_wnAVmHwv.mjs");
var _page210 = () => import("./authorize_DCQshC78.mjs");
var _page211 = () => import("./oauth-authorization-server_BaxE_3dO.mjs");
var _page212 = () => import("./oauth-protected-resource_BOeLixjD.mjs");
var _page213 = () => import("./404_BS5kg0IH.mjs");
var _page214 = () => import("./about_vl3VjM--.mjs");
var _page215 = () => import("./gallery_BPytLJ2P.mjs");
var _page216 = () => import("./_slug__njBBadSw.mjs");
var _page217 = () => import("./robots_47GtRwYc.mjs");
var _page218 = () => import("./sitemap_B5w2OIr1.mjs");
var _page219 = () => import("./sitemap-_collection__DOZAugtE.mjs");
var _page220 = () => import("./index_D1WcOeJL.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/emdash/dist/astro/image-endpoint.mjs", _page0],
	["node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs", _page1],
	["node_modules/emdash/src/astro/routes/admin.astro", _page2],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs", _page3],
	["node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs", _page4],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs", _page5],
	["node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs", _page6],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs", _page7],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs", _page8],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs", _page9],
	["node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs", _page10],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs", _page11],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs", _page12],
	["node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs", _page13],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs", _page14],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs", _page15],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs", _page16],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs", _page17],
	["node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs", _page18],
	["node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs", _page19],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs", _page20],
	["node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs", _page21],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs", _page22],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs", _page23],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs", _page24],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs", _page25],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs", _page26],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs", _page27],
	["node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs", _page28],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs", _page29],
	["node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs", _page30],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs", _page31],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs", _page32],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs", _page33],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs", _page34],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs", _page35],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs", _page36],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs", _page37],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs", _page38],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs", _page39],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs", _page40],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs", _page41],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs", _page42],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs", _page43],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs", _page44],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs", _page45],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs", _page46],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs", _page47],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs", _page48],
	["node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs", _page49],
	["node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs", _page50],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs", _page51],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs", _page52],
	["node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs", _page53],
	["node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs", _page54],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs", _page55],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs", _page56],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs", _page57],
	["node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs", _page58],
	["node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs", _page59],
	["node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs", _page60],
	["node_modules/emdash/dist/astro/routes/api/auth/handover.mjs", _page61],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs", _page62],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs", _page63],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs", _page64],
	["node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs", _page65],
	["node_modules/emdash/dist/astro/routes/api/auth/logout.mjs", _page66],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs", _page67],
	["node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs", _page68],
	["node_modules/emdash/dist/astro/routes/api/auth/me.mjs", _page69],
	["node_modules/emdash/dist/astro/routes/api/auth/mode.mjs", _page70],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs", _page71],
	["node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs", _page72],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs", _page73],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs", _page74],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs", _page75],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs", _page76],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs", _page77],
	["node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs", _page78],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs", _page79],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs", _page80],
	["node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs", _page81],
	["node_modules/emdash/dist/astro/routes/api/calendar.mjs", _page82],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs", _page83],
	["node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs", _page84],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs", _page85],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs", _page86],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs", _page87],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs", _page88],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs", _page89],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs", _page90],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs", _page91],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs", _page92],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs", _page93],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs", _page94],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs", _page95],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs", _page96],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs", _page97],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs", _page98],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs", _page99],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs", _page100],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs", _page101],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs", _page102],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs", _page103],
	["node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs", _page104],
	["node_modules/emdash/dist/astro/routes/api/dashboard.mjs", _page105],
	["node_modules/emdash/dist/astro/routes/api/dev/emails.mjs", _page106],
	["node_modules/emdash/dist/astro/routes/api/health.mjs", _page107],
	["node_modules/emdash/dist/astro/routes/api/import/probe.mjs", _page108],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs", _page109],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs", _page110],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs", _page111],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs", _page112],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs", _page113],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs", _page114],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs", _page115],
	["node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs", _page116],
	["node_modules/emdash/dist/astro/routes/api/manifest.mjs", _page117],
	["node_modules/emdash/dist/astro/routes/api/mcp.mjs", _page118],
	["node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs", _page119],
	["node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs", _page120],
	["node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs", _page121],
	["node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs", _page122],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs", _page123],
	["node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs", _page124],
	["node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs", _page125],
	["node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs", _page126],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs", _page127],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs", _page128],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs", _page129],
	["node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs", _page130],
	["node_modules/emdash/dist/astro/routes/api/media/_id_.mjs", _page131],
	["node_modules/emdash/dist/astro/routes/api/media.mjs", _page132],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs", _page133],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs", _page134],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs", _page135],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs", _page136],
	["node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs", _page137],
	["node_modules/emdash/dist/astro/routes/api/menus/index.mjs", _page138],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs", _page139],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs", _page140],
	["node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs", _page141],
	["node_modules/emdash/dist/astro/routes/api/oauth/register.mjs", _page142],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs", _page143],
	["node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs", _page144],
	["node_modules/emdash/dist/astro/routes/api/oauth/token.mjs", _page145],
	["node_modules/emdash/dist/astro/routes/api/openapi.json.mjs", _page146],
	["node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs", _page147],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs", _page148],
	["node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs", _page149],
	["node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs", _page150],
	["node_modules/emdash/dist/astro/routes/api/redirects/index.mjs", _page151],
	["node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs", _page152],
	["node_modules/emdash/dist/astro/routes/api/relations/index.mjs", _page153],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs", _page154],
	["node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs", _page155],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs", _page156],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs", _page157],
	["node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs", _page158],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs", _page159],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs", _page160],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs", _page161],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs", _page162],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs", _page163],
	["node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs", _page164],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs", _page165],
	["node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs", _page166],
	["node_modules/emdash/dist/astro/routes/api/schema/index.mjs", _page167],
	["node_modules/emdash/dist/astro/routes/api/search/enable.mjs", _page168],
	["node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs", _page169],
	["node_modules/emdash/dist/astro/routes/api/search/stats.mjs", _page170],
	["node_modules/emdash/dist/astro/routes/api/search/suggest.mjs", _page171],
	["node_modules/emdash/dist/astro/routes/api/search/index.mjs", _page172],
	["node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs", _page173],
	["node_modules/emdash/dist/astro/routes/api/sections/index.mjs", _page174],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs", _page175],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs", _page176],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs", _page177],
	["node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs", _page178],
	["node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs", _page179],
	["node_modules/emdash/dist/astro/routes/api/settings/domain.mjs", _page180],
	["node_modules/emdash/dist/astro/routes/api/settings/email.mjs", _page181],
	["node_modules/emdash/dist/astro/routes/api/settings.mjs", _page182],
	["node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs", _page183],
	["node_modules/emdash/dist/astro/routes/api/setup/admin.mjs", _page184],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs", _page185],
	["node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs", _page186],
	["node_modules/emdash/dist/astro/routes/api/setup/status.mjs", _page187],
	["node_modules/emdash/dist/astro/routes/api/setup/index.mjs", _page188],
	["node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs", _page189],
	["node_modules/emdash/dist/astro/routes/api/snapshot.mjs", _page190],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs", _page191],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs", _page192],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs", _page193],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs", _page194],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs", _page195],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs", _page196],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs", _page197],
	["node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs", _page198],
	["node_modules/emdash/dist/astro/routes/api/themes/preview.mjs", _page199],
	["node_modules/emdash/dist/astro/routes/api/typegen.mjs", _page200],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs", _page201],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs", _page202],
	["node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs", _page203],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs", _page204],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs", _page205],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs", _page206],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs", _page207],
	["node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs", _page208],
	["node_modules/emdash/dist/astro/routes/api/widget-components.mjs", _page209],
	["node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs", _page210],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs", _page211],
	["node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs", _page212],
	["src/pages/404.astro", _page213],
	["src/pages/about.astro", _page214],
	["src/pages/gallery.astro", _page215],
	["src/pages/projects/[slug].astro", _page216],
	["node_modules/emdash/dist/astro/routes/robots.txt.mjs", _page217],
	["node_modules/emdash/dist/astro/routes/sitemap.xml.mjs", _page218],
	["node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs", _page219],
	["src/pages/index.astro", _page220]
]);
// \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///Users/cjdunteman/repos/three-story-studio/","cacheDir":"file:///Users/cjdunteman/repos/three-story-studio/node_modules/.astro/","outDir":"file:///Users/cjdunteman/repos/three-story-studio/dist/","srcDir":"file:///Users/cjdunteman/repos/three-story-studio/src/","publicDir":"file:///Users/cjdunteman/repos/three-story-studio/public/","buildClientDir":"file:///Users/cjdunteman/repos/three-story-studio/dist/client/","buildServerDir":"file:///Users/cjdunteman/repos/three-story-studio/dist/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/_image","component":"node_modules/emdash/dist/astro/image-endpoint.mjs","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/.well-known/auth","pattern":"^\\/_emdash\\/\\.well-known\\/auth\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs","pathname":"/_emdash/.well-known/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"#emdash-boot-loader[data-astro-cid-u6fdjxxc]{background:var(--color-kumo-elevated);justify-content:center;align-items:center;min-height:100vh;display:flex}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .loader-inner[data-astro-cid-u6fdjxxc]{text-align:center}#emdash-boot-loader[data-astro-cid-u6fdjxxc] .spinner[data-astro-cid-u6fdjxxc]{border:2.5px solid var(--color-kumo-line);border-top-color:var(--text-color-kumo-subtle);border-radius:50%;width:24px;height:24px;margin:0 auto;animation:.8s linear infinite emdash-spin}#emdash-boot-loader[data-astro-cid-u6fdjxxc] p[data-astro-cid-u6fdjxxc]{font-family:var(--font-emdash,ui-sans-serif, system-ui, sans-serif);color:var(--text-color-kumo-subtle);margin-top:1rem;font-size:.875rem}@keyframes emdash-spin{to{transform:rotate(360deg)}}\n@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/_emdash/admin/[...path]","pattern":"^\\/_emdash\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/emdash/src/astro/routes/admin.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains/[domain]","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}],[{"content":"domain","dynamic":true,"spread":false}]],"params":["domain"],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/allowed-domains","pattern":"^\\/_emdash\\/api\\/admin\\/allowed-domains\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"allowed-domains","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index.mjs","pathname":"/_emdash/api/admin/allowed-domains","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/api-tokens","pattern":"^\\/_emdash\\/api\\/admin\\/api-tokens\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"api-tokens","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index.mjs","pathname":"/_emdash/api/admin/api-tokens","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/reorder","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder.mjs","pathname":"/_emdash/api/admin/byline-fields/reorder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]/usage","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields/[slug]","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/byline-fields","pattern":"^\\/_emdash\\/api\\/admin\\/byline-fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"byline-fields","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index.mjs","pathname":"/_emdash/api/admin/byline-fields","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]/translations","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/bylines","pattern":"^\\/_emdash\\/api\\/admin\\/bylines\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"bylines","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/bylines/index.mjs","pathname":"/_emdash/api/admin/bylines","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/bulk","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/bulk\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"bulk","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/bulk.mjs","pathname":"/_emdash/api/admin/comments/bulk","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/counts","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/counts\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"counts","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/counts.mjs","pathname":"/_emdash/api/admin/comments/counts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]/status","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/comments","pattern":"^\\/_emdash\\/api\\/admin\\/comments\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/comments/index.mjs","pathname":"/_emdash/api/admin/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/core-update","pattern":"^\\/_emdash\\/api\\/admin\\/core-update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"core-update","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/core-update.mjs","pathname":"/_emdash/api/admin/core-update","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive/[hookName]","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}],[{"content":"hookName","dynamic":true,"spread":false}]],"params":["hookName"],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/hooks/exclusive","pattern":"^\\/_emdash\\/api\\/admin\\/hooks\\/exclusive\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"hooks","dynamic":false,"spread":false}],[{"content":"exclusive","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index.mjs","pathname":"/_emdash/api/admin/hooks/exclusive","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/activation","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/activation\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"activation","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation.mjs","pathname":"/_emdash/api/admin/media-usage/activation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/collection-deletions/retry","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/retry\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"collection-deletions","dynamic":false,"spread":false}],[{"content":"retry","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry.mjs","pathname":"/_emdash/api/admin/media-usage/collection-deletions/retry","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/collection-deletions","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/collection-deletions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"collection-deletions","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index.mjs","pathname":"/_emdash/api/admin/media-usage/collection-deletions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/progress","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/progress\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"progress","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress.mjs","pathname":"/_emdash/api/admin/media-usage/progress","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/repair","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/repair\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"repair","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair.mjs","pathname":"/_emdash/api/admin/media-usage/repair","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/work/retry","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/retry\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}],[{"content":"retry","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry.mjs","pathname":"/_emdash/api/admin/media-usage/work/retry","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/media-usage/work","pattern":"^\\/_emdash\\/api\\/admin\\/media-usage\\/work\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"media-usage","dynamic":false,"spread":false}],[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index.mjs","pathname":"/_emdash/api/admin/media-usage/work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/oauth-clients","pattern":"^\\/_emdash\\/api\\/admin\\/oauth-clients\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"oauth-clients","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index.mjs","pathname":"/_emdash/api/admin/oauth-clients","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/icon","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/icon\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"icon","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index.mjs","pathname":"/_emdash/api/admin/plugins/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/artifact","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/artifact\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"artifact","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact.mjs","pathname":"/_emdash/api/admin/plugins/registry/artifact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/install","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/install\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"install","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install.mjs","pathname":"/_emdash/api/admin/plugins/registry/install","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/publisher-handle","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/publisher-handle\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"publisher-handle","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle.mjs","pathname":"/_emdash/api/admin/plugins/registry/publisher-handle","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/verify","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs","pathname":"/_emdash/api/admin/plugins/registry/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/[id]/uninstall","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/uninstall\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"uninstall","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/registry/[id]/update","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/registry\\/([^/]+?)\\/update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"registry","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/updates","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/updates\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"updates","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/updates.mjs","pathname":"/_emdash/api/admin/plugins/updates","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/mcp","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/settings","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/uninstall","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/uninstall\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"uninstall","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]/update","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/update\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"update","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/plugins","pattern":"^\\/_emdash\\/api\\/admin\\/plugins\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/plugins/index.mjs","pathname":"/_emdash/api/admin/plugins","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/scheduled-policy-rejections/[collection]/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/scheduled-policy-rejections\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"scheduled-policy-rejections","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]/thumbnail","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/thumbnail\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"thumbnail","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/themes/marketplace","pattern":"^\\/_emdash\\/api\\/admin\\/themes\\/marketplace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"marketplace","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index.mjs","pathname":"/_emdash/api/admin/themes/marketplace","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/transfer/[...path]","pattern":"^\\/_emdash\\/api\\/admin\\/transfer(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"transfer","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/disable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/disable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"disable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/enable","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]/send-recovery","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/send-recovery\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"send-recovery","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users/[id]","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/admin/users","pattern":"^\\/_emdash\\/api\\/admin\\/users\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"users","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/admin/users/index.mjs","pathname":"/_emdash/api/admin/users","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/dev-bypass","pattern":"^\\/_emdash\\/api\\/auth\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/dev-bypass.mjs","pathname":"/_emdash/api/auth/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/handover","pattern":"^\\/_emdash\\/api\\/auth\\/handover\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"handover","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/handover.mjs","pathname":"/_emdash/api/auth/handover","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/accept","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/accept\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"accept","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/accept.mjs","pathname":"/_emdash/api/auth/invite/accept","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/complete","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/complete.mjs","pathname":"/_emdash/api/auth/invite/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite/register-options","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/register-options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}],[{"content":"register-options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/register-options.mjs","pathname":"/_emdash/api/auth/invite/register-options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/invite","pattern":"^\\/_emdash\\/api\\/auth\\/invite\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"invite","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/invite/index.mjs","pathname":"/_emdash/api/auth/invite","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/logout","pattern":"^\\/_emdash\\/api\\/auth\\/logout\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/logout.mjs","pathname":"/_emdash/api/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/send","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/send\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/send.mjs","pathname":"/_emdash/api/auth/magic-link/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/magic-link/verify","pattern":"^\\/_emdash\\/api\\/auth\\/magic-link\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"magic-link","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs","pathname":"/_emdash/api/auth/magic-link/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/me","pattern":"^\\/_emdash\\/api\\/auth\\/me\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/me.mjs","pathname":"/_emdash/api/auth/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/mode","pattern":"^\\/_emdash\\/api\\/auth\\/mode\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"mode","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/mode.mjs","pathname":"/_emdash/api/auth/mode","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]/callback","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/oauth/[provider]","pattern":"^\\/_emdash\\/api\\/auth\\/oauth\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"provider","dynamic":true,"spread":false}]],"params":["provider"],"component":"node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/options.mjs","pathname":"/_emdash/api/auth/passkey/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/options","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/options\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"options","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options.mjs","pathname":"/_emdash/api/auth/passkey/register/options","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/register/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/register\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify.mjs","pathname":"/_emdash/api/auth/passkey/register/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/verify","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/verify.mjs","pathname":"/_emdash/api/auth/passkey/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey/[id]","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/passkey","pattern":"^\\/_emdash\\/api\\/auth\\/passkey\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"passkey","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/passkey/index.mjs","pathname":"/_emdash/api/auth/passkey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/complete","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/complete\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"complete","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/complete.mjs","pathname":"/_emdash/api/auth/signup/complete","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/request","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/request\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"request","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/request.mjs","pathname":"/_emdash/api/auth/signup/request","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/auth/signup/verify","pattern":"^\\/_emdash\\/api\\/auth\\/signup\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs","pathname":"/_emdash/api/auth/signup/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/calendar","pattern":"^\\/_emdash\\/api\\/calendar\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/calendar.mjs","pathname":"/_emdash/api/calendar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]/reactions","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/reactions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}],[{"content":"reactions","dynamic":false,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/comments/[collection]/[contentId]","pattern":"^\\/_emdash\\/api\\/comments\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"contentId","dynamic":true,"spread":false}]],"params":["collection","contentId"],"component":"node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/authors","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/authors\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"authors","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/authors.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/trash","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/trash\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"trash","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/trash.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/compare","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/compare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"compare","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/discard-draft","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/discard-draft\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"discard-draft","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/duplicate","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/duplicate\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"duplicate","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/lock","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/lock\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"lock","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/permanent","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/permanent\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"permanent","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/plugin-extensions/[pluginId]/[kind]/[extensionId]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/plugin-extensions\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"plugin-extensions","dynamic":false,"spread":false}],[{"content":"pluginId","dynamic":true,"spread":false}],[{"content":"kind","dynamic":true,"spread":false}],[{"content":"extensionId","dynamic":true,"spread":false}]],"params":["collection","id","pluginId","kind","extensionId"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/preview-url","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/preview-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"preview-url","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/publish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"publish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/references/[relation]/children","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/children\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"references","dynamic":false,"spread":false}],[{"content":"relation","dynamic":true,"spread":false}],[{"content":"children","dynamic":false,"spread":false}]],"params":["collection","id","relation"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/references/[relation]/parents","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/references\\/([^/]+?)\\/parents\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"references","dynamic":false,"spread":false}],[{"content":"relation","dynamic":true,"spread":false}],[{"content":"parents","dynamic":false,"spread":false}]],"params":["collection","id","relation"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/restore","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/revisions","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/revisions\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/schedule","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/schedule\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"schedule","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/terms/[taxonomy]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"taxonomy","dynamic":true,"spread":false}]],"params":["collection","id","taxonomy"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/translations","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]/unpublish","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/unpublish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"unpublish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]/[id]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/content/[collection]","pattern":"^\\/_emdash\\/api\\/content\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/api/content/_collection_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dashboard","pattern":"^\\/_emdash\\/api\\/dashboard\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dashboard.mjs","pathname":"/_emdash/api/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/dev/emails","pattern":"^\\/_emdash\\/api\\/dev\\/emails\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"dev","dynamic":false,"spread":false}],[{"content":"emails","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/dev/emails.mjs","pathname":"/_emdash/api/dev/emails","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/health","pattern":"^\\/_emdash\\/api\\/health\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"health","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/health.mjs","pathname":"/_emdash/api/health","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/probe","pattern":"^\\/_emdash\\/api\\/import\\/probe\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"probe","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/probe.mjs","pathname":"/_emdash/api/import/probe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze.mjs","pathname":"/_emdash/api/import/wordpress/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs","pathname":"/_emdash/api/import/wordpress/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/media","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/media.mjs","pathname":"/_emdash/api/import/wordpress/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/prepare","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/prepare\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"prepare","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare.mjs","pathname":"/_emdash/api/import/wordpress/prepare","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress/rewrite-urls","pattern":"^\\/_emdash\\/api\\/import\\/wordpress\\/rewrite-urls\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress","dynamic":false,"spread":false}],[{"content":"rewrite-urls","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs","pathname":"/_emdash/api/import/wordpress/rewrite-urls","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/analyze","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/analyze\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"analyze","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs","pathname":"/_emdash/api/import/wordpress-plugin/analyze","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/callback","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/callback\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs","pathname":"/_emdash/api/import/wordpress-plugin/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/import/wordpress-plugin/execute","pattern":"^\\/_emdash\\/api\\/import\\/wordpress-plugin\\/execute\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"import","dynamic":false,"spread":false}],[{"content":"wordpress-plugin","dynamic":false,"spread":false}],[{"content":"execute","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs","pathname":"/_emdash/api/import/wordpress-plugin/execute","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/manifest","pattern":"^\\/_emdash\\/api\\/manifest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"manifest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/manifest.mjs","pathname":"/_emdash/api/manifest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/mcp","pattern":"^\\/_emdash\\/api\\/mcp\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"mcp","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/mcp.mjs","pathname":"/_emdash/api/mcp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/asset/[id]/[filename]","pattern":"^\\/_emdash\\/api\\/media\\/asset\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"asset","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"filename","dynamic":true,"spread":false}]],"params":["id","filename"],"component":"node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/file/[...key]","pattern":"^\\/_emdash\\/api\\/media\\/file(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"file","dynamic":false,"spread":false}],[{"content":"...key","dynamic":true,"spread":true}]],"params":["...key"],"component":"node_modules/emdash/dist/astro/routes/api/media/file/_...key_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/folders/[id]","pattern":"^\\/_emdash\\/api\\/media\\/folders\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"folders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/folders/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/folders","pattern":"^\\/_emdash\\/api\\/media\\/folders\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"folders","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/folders/index.mjs","pathname":"/_emdash/api/media/folders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]/[itemId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}],[{"content":"itemId","dynamic":true,"spread":false}]],"params":["providerId","itemId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers/[providerId]","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}],[{"content":"providerId","dynamic":true,"spread":false}]],"params":["providerId"],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/providers","pattern":"^\\/_emdash\\/api\\/media\\/providers\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"providers","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/providers/index.mjs","pathname":"/_emdash/api/media/providers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/upload-url","pattern":"^\\/_emdash\\/api\\/media\\/upload-url\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"upload-url","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media/upload-url.mjs","pathname":"/_emdash/api/media/upload-url","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/confirm","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/confirm\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"confirm","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/confirm.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/replace","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/replace\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"replace","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/replace.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/upload","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/upload\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/upload.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]/usage","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/usage\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"usage","dynamic":false,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_/usage.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media/[id]","pattern":"^\\/_emdash\\/api\\/media\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/media/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/media","pattern":"^\\/_emdash\\/api\\/media\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"media","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/media.mjs","pathname":"/_emdash/api/media","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items/[id]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/items","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/items\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"items","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/items.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/reorder","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]/translations","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus/[name]","pattern":"^\\/_emdash\\/api\\/menus\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/menus/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/menus","pattern":"^\\/_emdash\\/api\\/menus\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"menus","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/menus/index.mjs","pathname":"/_emdash/api/menus","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/authorize","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/authorize.mjs","pathname":"/_emdash/api/oauth/device/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/code","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/code\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/code.mjs","pathname":"/_emdash/api/oauth/device/code","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/device/token","pattern":"^\\/_emdash\\/api\\/oauth\\/device\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"device","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/device/token.mjs","pathname":"/_emdash/api/oauth/device/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/register","pattern":"^\\/_emdash\\/api\\/oauth\\/register\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/register.mjs","pathname":"/_emdash/api/oauth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/refresh","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/refresh\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"refresh","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/refresh.mjs","pathname":"/_emdash/api/oauth/token/refresh","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token/revoke","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/revoke\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}],[{"content":"revoke","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token/revoke.mjs","pathname":"/_emdash/api/oauth/token/revoke","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/oauth/token","pattern":"^\\/_emdash\\/api\\/oauth\\/token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/token.mjs","pathname":"/_emdash/api/oauth/token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/openapi.json","pattern":"^\\/_emdash\\/api\\/openapi\\.json$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"openapi.json","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/openapi.json.mjs","pathname":"/_emdash/api/openapi.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/plugins/[pluginId]/[...path]","pattern":"^\\/_emdash\\/api\\/plugins\\/([^/]+?)(?:\\/(.*?))?\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"plugins","dynamic":false,"spread":false}],[{"content":"pluginId","dynamic":true,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["pluginId","...path"],"component":"node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s/summary","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/summary\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}],[{"content":"summary","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/summary.mjs","pathname":"/_emdash/api/redirects/404s/summary","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/404s","pattern":"^\\/_emdash\\/api\\/redirects\\/404s\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"404s","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/404s/index.mjs","pathname":"/_emdash/api/redirects/404s","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects/[id]","pattern":"^\\/_emdash\\/api\\/redirects\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/redirects/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/redirects","pattern":"^\\/_emdash\\/api\\/redirects\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"redirects","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/redirects/index.mjs","pathname":"/_emdash/api/redirects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/relations/[id]","pattern":"^\\/_emdash\\/api\\/relations\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"relations","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"node_modules/emdash/dist/astro/routes/api/relations/_id_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/relations","pattern":"^\\/_emdash\\/api\\/relations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"relations","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/relations/index.mjs","pathname":"/_emdash/api/relations","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]/restore","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/restore\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}],[{"content":"restore","dynamic":false,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/revisions/[revisionId]","pattern":"^\\/_emdash\\/api\\/revisions\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"revisions","dynamic":false,"spread":false}],[{"content":"revisionId","dynamic":true,"spread":false}]],"params":["revisionId"],"component":"node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types/[slug]/versions/[version]/activate","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/versions\\/([^/]+?)\\/activate\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"versions","dynamic":false,"spread":false}],[{"content":"version","dynamic":true,"spread":false}],[{"content":"activate","dynamic":false,"spread":false}]],"params":["slug","version"],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/block-types","pattern":"^\\/_emdash\\/api\\/schema\\/block-types\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"block-types","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/block-types/index.mjs","pathname":"/_emdash/api/schema/block-types","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/reorder","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/reorder.mjs","pathname":"/_emdash/api/schema/collections/reorder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/reorder","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields/[fieldSlug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}],[{"content":"fieldSlug","dynamic":true,"spread":false}]],"params":["slug","fieldSlug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]/fields","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/fields\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"fields","dynamic":false,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/collections","pattern":"^\\/_emdash\\/api\\/schema\\/collections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"collections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/collections/index.mjs","pathname":"/_emdash/api/schema/collections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans/[slug]","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema/orphans","pattern":"^\\/_emdash\\/api\\/schema\\/orphans\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}],[{"content":"orphans","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/orphans/index.mjs","pathname":"/_emdash/api/schema/orphans","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/schema","pattern":"^\\/_emdash\\/api\\/schema\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"schema","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/schema/index.mjs","pathname":"/_emdash/api/schema","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/enable","pattern":"^\\/_emdash\\/api\\/search\\/enable\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"enable","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/enable.mjs","pathname":"/_emdash/api/search/enable","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/rebuild","pattern":"^\\/_emdash\\/api\\/search\\/rebuild\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"rebuild","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/rebuild.mjs","pathname":"/_emdash/api/search/rebuild","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/stats","pattern":"^\\/_emdash\\/api\\/search\\/stats\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"stats","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/stats.mjs","pathname":"/_emdash/api/search/stats","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search/suggest","pattern":"^\\/_emdash\\/api\\/search\\/suggest\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}],[{"content":"suggest","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/suggest.mjs","pathname":"/_emdash/api/search/suggest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/search","pattern":"^\\/_emdash\\/api\\/search\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/search/index.mjs","pathname":"/_emdash/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections/[slug]","pattern":"^\\/_emdash\\/api\\/sections\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"node_modules/emdash/dist/astro/routes/api/sections/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/sections","pattern":"^\\/_emdash\\/api\\/sections\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/sections/index.mjs","pathname":"/_emdash/api/sections","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives/[name]","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/archives","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/archives\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index.mjs","pathname":"/_emdash/api/settings/backups/archives","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups/export","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/export\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}],[{"content":"export","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/export.mjs","pathname":"/_emdash/api/settings/backups/export","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/backups","pattern":"^\\/_emdash\\/api\\/settings\\/backups\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"backups","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/backups/index.mjs","pathname":"/_emdash/api/settings/backups","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/domain/notify","pattern":"^\\/_emdash\\/api\\/settings\\/domain\\/notify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"domain","dynamic":false,"spread":false}],[{"content":"notify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/domain-notify.mjs","pathname":"/_emdash/api/settings/domain/notify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/domain","pattern":"^\\/_emdash\\/api\\/settings\\/domain\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"domain","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/domain.mjs","pathname":"/_emdash/api/settings/domain","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings/email","pattern":"^\\/_emdash\\/api\\/settings\\/email\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}],[{"content":"email","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings/email.mjs","pathname":"/_emdash/api/settings/email","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/settings","pattern":"^\\/_emdash\\/api\\/settings\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/settings.mjs","pathname":"/_emdash/api/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin/verify","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/verify\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin-verify.mjs","pathname":"/_emdash/api/setup/admin/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/admin","pattern":"^\\/_emdash\\/api\\/setup\\/admin\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/admin.mjs","pathname":"/_emdash/api/setup/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-bypass","pattern":"^\\/_emdash\\/api\\/setup\\/dev-bypass\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-bypass","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs","pathname":"/_emdash/api/setup/dev-bypass","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/dev-reset","pattern":"^\\/_emdash\\/api\\/setup\\/dev-reset\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"dev-reset","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/dev-reset.mjs","pathname":"/_emdash/api/setup/dev-reset","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup/status","pattern":"^\\/_emdash\\/api\\/setup\\/status\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/status.mjs","pathname":"/_emdash/api/setup/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/setup","pattern":"^\\/_emdash\\/api\\/setup\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/setup/index.mjs","pathname":"/_emdash/api/setup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/site/domain-proof","pattern":"^\\/_emdash\\/api\\/site\\/domain-proof\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"site","dynamic":false,"spread":false}],[{"content":"domain-proof","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs","pathname":"/_emdash/api/site/domain-proof","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/snapshot","pattern":"^\\/_emdash\\/api\\/snapshot\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"snapshot","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/snapshot.mjs","pathname":"/_emdash/api/snapshot","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/bulk-tag","pattern":"^\\/_emdash\\/api\\/taxonomies\\/bulk-tag\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"bulk-tag","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs","pathname":"/_emdash/api/taxonomies/bulk-tag","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/reorder","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]/translations","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms/[slug]","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["name","slug"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/terms","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/terms\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]/translations","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/translations\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"translations","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies/[name]","pattern":"^\\/_emdash\\/api\\/taxonomies\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/taxonomies","pattern":"^\\/_emdash\\/api\\/taxonomies\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"taxonomies","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/taxonomies/index.mjs","pathname":"/_emdash/api/taxonomies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/themes/preview","pattern":"^\\/_emdash\\/api\\/themes\\/preview\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"themes","dynamic":false,"spread":false}],[{"content":"preview","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/themes/preview.mjs","pathname":"/_emdash/api/themes/preview","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/typegen","pattern":"^\\/_emdash\\/api\\/typegen\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"typegen","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/typegen.mjs","pathname":"/_emdash/api/typegen","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/action-token","pattern":"^\\/_emdash\\/api\\/visual-editing\\/action-token\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"action-token","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs","pathname":"/_emdash/api/visual-editing/action-token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/content/[collection]/[id]/publish","pattern":"^\\/_emdash\\/api\\/visual-editing\\/content\\/([^/]+?)\\/([^/]+?)\\/publish\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}],[{"content":"collection","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"publish","dynamic":false,"spread":false}]],"params":["collection","id"],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/visual-editing/toolbar-labels","pattern":"^\\/_emdash\\/api\\/visual-editing\\/toolbar-labels\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"visual-editing","dynamic":false,"spread":false}],[{"content":"toolbar-labels","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels.mjs","pathname":"/_emdash/api/visual-editing/toolbar-labels","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/reorder","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/reorder\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"reorder","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets/[id]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["name","id"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]/widgets","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/widgets\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}],[{"content":"widgets","dynamic":false,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas/[name]","pattern":"^\\/_emdash\\/api\\/widget-areas\\/([^/]+?)\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"params":["name"],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/_name_.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-areas","pattern":"^\\/_emdash\\/api\\/widget-areas\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-areas","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-areas/index.mjs","pathname":"/_emdash/api/widget-areas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/api/widget-components","pattern":"^\\/_emdash\\/api\\/widget-components\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"api","dynamic":false,"spread":false}],[{"content":"widget-components","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/widget-components.mjs","pathname":"/_emdash/api/widget-components","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_emdash/oauth/authorize","pattern":"^\\/_emdash\\/oauth\\/authorize\\/?$","segments":[[{"content":"_emdash","dynamic":false,"spread":false}],[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"authorize","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/oauth/authorize.mjs","pathname":"/_emdash/oauth/authorize","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-authorization-server/_emdash","pattern":"^\\/\\.well-known\\/oauth-authorization-server\\/_emdash\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-authorization-server","dynamic":false,"spread":false}],[{"content":"_emdash","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server.mjs","pathname":"/.well-known/oauth-authorization-server/_emdash","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/.well-known/oauth-protected-resource","pattern":"^\\/\\.well-known\\/oauth-protected-resource\\/?$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"oauth-protected-resource","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs","pathname":"/.well-known/oauth-protected-resource","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/Base.CuOjpPOZ.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/Base.CuOjpPOZ.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/Base.CuOjpPOZ.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/Base.CuOjpPOZ.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/projects/[slug]","isIndex":false,"type":"page","pattern":"^\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/projects/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/robots.txt","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/robots.txt.mjs","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap.xml","pattern":"^\\/sitemap\\.xml$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/emdash/dist/astro/routes/sitemap.xml.mjs","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/sitemap-[collection].xml","pattern":"^\\/sitemap-([^/]+?)\\.xml$","segments":[[{"content":"sitemap-","dynamic":false,"spread":false},{"content":"collection","dynamic":true,"spread":false},{"content":".xml","dynamic":false,"spread":false}]],"params":["collection"],"component":"node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml.mjs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/Base.CuOjpPOZ.css"},{"type":"inline","content":"@layer astro.images{:where([data-astro-image]){height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}[data-astro-image-fit=fill]{object-fit:fill}[data-astro-image-fit=contain]{object-fit:contain}[data-astro-image-fit=cover]{object-fit:cover}[data-astro-image-fit=scale-down]{object-fit:scale-down}[data-astro-image-pos=top]{object-position:top}[data-astro-image-pos=bottom]{object-position:bottom}[data-astro-image-pos=left]{object-position:left}[data-astro-image-pos=right]{object-position:right}[data-astro-image-pos=center]{object-position:center}[data-astro-image-pos=top-left]{object-position:top left}[data-astro-image-pos=top-right]{object-position:top right}[data-astro-image-pos=top-center]{object-position:top center}[data-astro-image-pos=bottom-left]{object-position:bottom left}[data-astro-image-pos=bottom-right]{object-position:bottom right}[data-astro-image-pos=bottom-center]{object-position:bottom center}[data-astro-image-pos=left-top]{object-position:left top}[data-astro-image-pos=left-bottom]{object-position:left bottom}[data-astro-image-pos=left-center]{object-position:left center}[data-astro-image-pos=right-top]{object-position:right top}[data-astro-image-pos=right-bottom]{object-position:right bottom}[data-astro-image-pos=right-center]{object-position:right center}[data-astro-image-pos=center-top]{object-position:center top}[data-astro-image-pos=center-bottom]{object-position:center bottom}[data-astro-image-pos=center-left]{object-position:center left}[data-astro-image-pos=center-right]{object-position:center right}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["/Users/cjdunteman/repos/three-story-studio/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/cjdunteman/repos/three-story-studio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/cjdunteman/repos/three-story-studio/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["/Users/cjdunteman/repos/three-story-studio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/cjdunteman/repos/three-story-studio/src/pages/projects/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/astro/routes/admin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()},r=typeof t.value==`object`?t.value:void 0,i={timeout:r==null?void 0:r.timeout};`requestIdleCallback`in window?window.requestIdleCallback(n,i):setTimeout(n,i.timeout||200)};(self.Astro||(self.Astro={})).idle=e,window.dispatchEvent(new Event(`astro:idle`))})();"],["load","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).load=e,window.dispatchEvent(new Event(`astro:load`))})();"],["media","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()};if(t.value){let e=matchMedia(t.value);e.matches?n():e.addEventListener(`change`,n,{once:!0})}};(self.Astro||(self.Astro={})).media=e,window.dispatchEvent(new Event(`astro:media`))})();"],["only","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).only=e,window.dispatchEvent(new Event(`astro:only`))})();"],["visible","(function(){let e=(e,t,n)=>{let r=async()=>{await(await e())()},i=typeof t.value==`object`?t.value:void 0,a={rootMargin:i==null?void 0:i.rootMargin},o=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){o.disconnect(),r();break}},a);for(let e of n.children)o.observe(e)};(self.Astro||(self.Astro={})).visible=e,window.dispatchEvent(new Event(`astro:visible`))})();"]],"entryModules":{"\u0000astro:asset-imports":"chunks/_astro_asset-imports_DVH09DLb.mjs","\u0000astro:content-module-imports":"chunks/_astro_content-module-imports_C6ORHsA3.mjs","\u0000astro:content":"chunks/_astro_content_C5sLgUjc.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DprqAX32.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_DMej8zKf.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_BhTW5IeR.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_IwDkEcCZ.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/plugins/adapt-sandbox-entry.mjs":"chunks/adapt-sandbox-entry_BSHEgKdE.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/apply-DVnupNeS.mjs":"chunks/apply-DVnupNeS_BT7FNDkY.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/artifacts-Dvdp2KK-.mjs":"chunks/artifacts-Dvdp2KK-_DnHPb9ba.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/byline-DHJS-GGb.mjs":"chunks/byline-DHJS-GGb_BocecCV6.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/bylines-f_ZEc6Sn.mjs":"chunks/bylines-f_ZEc6Sn_Cz4uDRKR.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/cache-5DHbpEWu.mjs":"chunks/cache-5DHbpEWu_CmSRzIKD.mjs","\u0000virtual:emdash/config":"chunks/config_rWUzgpIJ.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/content-BKHUVsE5.mjs":"chunks/content-BKHUVsE5_DIOQmEbg.mjs","\u0000virtual:emdash/dialect":"chunks/dialect_BQ6hoGf3.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/field-map-BSXdNGt5.mjs":"chunks/field-map-BSXdNGt5_ybTbeb2k.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/gc-CNkXB3mE.mjs":"chunks/gc-CNkXB3mE_-hD5EluF.mjs","/Users/cjdunteman/repos/three-story-studio/src/live.config.ts":"chunks/live.config_B4zHcGdL.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/load-D4xtzm6h.mjs":"chunks/load-D4xtzm6h_BW7lCxb3.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/loader-DhnedqY4.mjs":"chunks/loader-DhnedqY4_BJV41M7E.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-B-F60t8q.js":"_astro/messages-B-F60t8q.BRqJ9gDm.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-B0BCv599.js":"_astro/messages-B0BCv599.BG2d6BJZ.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-B6yZGWgQ.js":"_astro/messages-B6yZGWgQ.BYxuZIHI.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BK-tYSWG.js":"_astro/messages-BK-tYSWG.IjaAlhia.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BLjy9gT-.js":"_astro/messages-BLjy9gT-._q4eptrE.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BOkO4qva.js":"_astro/messages-BOkO4qva.CRN6_h0Z.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BWGzIv4B.js":"_astro/messages-BWGzIv4B.q-rL5lnX.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-Bikiqblc.js":"_astro/messages-Bikiqblc.BQwPDRLN.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BkvpZ-7S.js":"_astro/messages-BkvpZ-7S.DJvzsCeV.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-Brb7Ewlq.js":"_astro/messages-Brb7Ewlq.Cp7N3LJ_.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-BxorrMDL.js":"_astro/messages-BxorrMDL.Dozny3F9.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-By0sYTNc.js":"_astro/messages-By0sYTNc.WTa02VTV.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-C1IDHXdm.js":"_astro/messages-C1IDHXdm.CKu4MRsL.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CDURktvZ.js":"_astro/messages-CDURktvZ.CjPgQFiX.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CDoPmyPD.js":"_astro/messages-CDoPmyPD.Dtr53WkH.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CLJ8BrHU.js":"_astro/messages-CLJ8BrHU.CqNPHg34.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CRPWwVJj.js":"_astro/messages-CRPWwVJj.BSvMhRu5.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CfBxAYxv.js":"_astro/messages-CfBxAYxv.XtRaMazv.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-CnrCotb-.js":"_astro/messages-CnrCotb-.CYgauQgk.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-D0TEOMlM.js":"_astro/messages-D0TEOMlM.DX2v_w5N.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-D1vghJc4.js":"_astro/messages-D1vghJc4.BnCoOnaB.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-D6Jnuwaq.js":"_astro/messages-D6Jnuwaq.DwR52krF.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-DEukxExT.js":"_astro/messages-DEukxExT.CUsUaCcb.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-DUlsSUrn.js":"_astro/messages-DUlsSUrn.DguOSZvv.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-Da_yFdAG.js":"_astro/messages-Da_yFdAG.DfoBkxkc.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-L2ewXatf.js":"_astro/messages-L2ewXatf.DZAU0lKP.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-RwTPlE_B.js":"_astro/messages-RwTPlE_B.BH0cO5jo.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-Sj6Maupf.js":"_astro/messages-Sj6Maupf.CsOSiaBZ.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-SjVdWFob.js":"_astro/messages-SjVdWFob.D5cdQY6D.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-TBG9bLnA.js":"_astro/messages-TBG9bLnA.CeqvOfkn.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-YnBnL8aZ.js":"_astro/messages-YnBnL8aZ.B0TaxMYA.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-fIU-37FH.js":"_astro/messages-fIU-37FH.CY-N1OM-.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-hAyIYlyM.js":"_astro/messages-hAyIYlyM.DanK3HjO.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-i6VVd7zZ.js":"_astro/messages-i6VVd7zZ.BnOnJt0c.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-irmP9UnX.js":"_astro/messages-irmP9UnX.BPM4K7BC.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/messages-s-T1hU5_.js":"_astro/messages-s-T1hU5_.C48ePbZ0.js","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_CxXy0p4B.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/oauth-authorization-CPLgBrdo.mjs":"chunks/oauth-authorization-CPLgBrdo_CMjVntTo.mjs","\u0000virtual:emdash/object-cache":"chunks/object-cache_XrGln1aI.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/query-D62NntCZ.mjs":"chunks/query-D62NntCZ_KAlbGiAn.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/registry-B0-O575m.mjs":"chunks/registry-B0-O575m_B8jWSyfP.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/resolve-BNnm8EkB.mjs":"chunks/resolve-BNnm8EkB_DKs9SZLb.mjs","\u0000virtual:emdash/seed":"chunks/seed_CSu9JVUY.mjs","\u0000astro:config/server":"chunks/server_DfI0GDIL.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DOaXOETN.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/taxonomies-B__VmCKQ.mjs":"chunks/taxonomies-B__VmCKQ_CSS-JsWF.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/turnstile-Cs2wfkJG.mjs":"chunks/turnstile-Cs2wfkJG_D8jNLS0L.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/validate-Dz-TIOFB.mjs":"chunks/validate-Dz-TIOFB_CrWmXzar.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/validation-Fc9ZSUS_.mjs":"chunks/validation-Fc9ZSUS__DPaWyyD-.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_C4hxNQje.mjs","\u0000virtual:emdash/wait-until":"chunks/wait-until_bIc_sNRQ.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_BS5kg0IH.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/files/_...path_.mjs":"chunks/_...path__Cr5Q0VjI.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/files/_...path_.mjs":"chunks/_...path__DTRwXtBk.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/file/_...key_@_@mjs":"chunks/_.._CHTJgZ36.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/plugins/_pluginId_/_...path_@_@mjs":"chunks/_.._CVMFdAcf.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_@_@mjs":"chunks/_.._DSwavgjL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/_domain_@_@mjs":"chunks/_domain__CpZscK0k.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/plugin-extensions/_pluginId_/_kind_/_extensionId_@_@mjs":"chunks/_extensionId__LnSTncvE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/_fieldSlug_@_@mjs":"chunks/_fieldSlug__CdnjOaHa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/asset/_id_/_filename_@_@mjs":"chunks/_filename__DTaHkdHT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/_hookName_@_@mjs":"chunks/_hookName__Dbx0PxZE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/_id_@_@mjs":"chunks/_id__BTVuFlrQ.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/index.mjs":"chunks/_id__BdhP09gv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/_id_@_@mjs":"chunks/_id__C1-JUGzO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_@_@mjs":"chunks/_id__C5QKIbSi.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets/_id_@_@mjs":"chunks/_id__CA_3YQk9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/_id_@_@mjs":"chunks/_id__ChgeqsSy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items/_id_@_@mjs":"chunks/_id__Ctj8LJ_1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/_id_@_@mjs":"chunks/_id__CyESs0aV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_@_@mjs":"chunks/_id__DaIGpj4J.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/scheduled-policy-rejections/_collection_/_id_@_@mjs":"chunks/_id__DdkOV576.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_@_@mjs":"chunks/_id__YydmCU8x.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/_id_@_@mjs":"chunks/_id__nuPaLPAf.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/index.mjs":"chunks/_id__ol1zqzZU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/_itemId_@_@mjs":"chunks/_itemId__DtUvSRB2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_@_@mjs":"chunks/_name__C675F7CQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/_name_@_@mjs":"chunks/_name__DQFBpHt2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_@_@mjs":"chunks/_name__DhkHJYjO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_@_@mjs":"chunks/_name__Q6ORI9SU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_@_@mjs":"chunks/_provider__DamUBWt0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_@_@mjs":"chunks/_slug__BNWD0oOG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/_slug_@_@mjs":"chunks/_slug__Cp1wazA1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_@_@mjs":"chunks/_slug__D4x4k1_n.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/_slug_@_@mjs":"chunks/_slug__O4JV7Jqb.mjs","\u0000virtual:astro:page:src/pages/projects/[slug]@_@astro":"chunks/_slug__njBBadSw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs":"chunks/_taxonomy__Nnkr4P42.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/abandon.mjs":"chunks/abandon_BfEJil_c.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_vl3VjM--.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/accept@_@mjs":"chunks/accept_BExzhfVv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/action-token@_@mjs":"chunks/action-token_DwHIJtkn.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/versions/_version_/activate@_@mjs":"chunks/activate_DkLmk0Cd.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/activation@_@mjs":"chunks/activation_Cq-9hw_X.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin-verify@_@mjs":"chunks/admin-verify_BClFgT7W.mjs","\u0000virtual:astro:page:node_modules/emdash/src/astro/routes/admin@_@astro":"chunks/admin_BsnYCNE1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/admin@_@mjs":"chunks/admin_EWgUUE66.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/advance.mjs":"chunks/advance_C502zgx3.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/advance.mjs":"chunks/advance_DxfSCio2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/analyze@_@mjs":"chunks/analyze_DMWVKv4w.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs":"chunks/analyze_FzjoLUhU.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/analyze.mjs":"chunks/analyze_rMsWDHQK.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/index.mjs":"chunks/approvals_D1Yw03Mk.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/approve.mjs":"chunks/approve_CTQz55hW.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/archive.mjs":"chunks/archive_CQNJzfmU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/artifact@_@mjs":"chunks/artifact_DWDCKKL-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/auth@_@mjs":"chunks/auth_e6RIm2-j.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/authorize@_@mjs":"chunks/authorize_DCQshC78.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/authorize@_@mjs":"chunks/authorize_DRZeykPi.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/authors@_@mjs":"chunks/authors_CmAyL1fr.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/block-types-BbOrfnWs.mjs":"chunks/block-types-BbOrfnWs_BevyqXiO.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/block-values-Dg0-8PPS.mjs":"chunks/block-values-Dg0-8PPS_CYkJIu_s.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag@_@mjs":"chunks/bulk-tag_CefgDXDj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/bulk@_@mjs":"chunks/bulk_DLWE7I5a.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/database/repositories/byline.ts":"chunks/byline_hX3RknOn.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/bylines-Bsg5cH4S.mjs":"chunks/bylines-Bsg5cH4S_Cdvur2wK.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/bylines/index.ts":"chunks/bylines_Cu_yELGR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/calendar@_@mjs":"chunks/calendar_NqTN9GI8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback@_@mjs":"chunks/callback_BMVHDsPA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/oauth/_provider_/callback@_@mjs":"chunks/callback_BZB2hyHV.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/cancel.mjs":"chunks/cancel_DaVhRvjK.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/capabilities.mjs":"chunks/capabilities_Dxyo8fSx.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/children@_@mjs":"chunks/children_DaFkt8Pd.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/chunks-DiW8VMwz.mjs":"chunks/chunks-DiW8VMwz_5ydu36Av.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/code@_@mjs":"chunks/code_DMBf4ckN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/compare@_@mjs":"chunks/compare_D7tTc3Zt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/complete@_@mjs":"chunks/complete_CKoirr_f.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/complete@_@mjs":"chunks/complete_cDOf1CO5.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/confirm@_@mjs":"chunks/confirm_CDquSPiZ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/core-update@_@mjs":"chunks/core-update_CPJNq6p-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/counts@_@mjs":"chunks/counts_DqP9LiGx.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs":"chunks/dashboard_D9YZurV3.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/deny.mjs":"chunks/deny_BfTds2Vv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/dev-bypass@_@mjs":"chunks/dev-bypass_CyIRSqiu.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs":"chunks/dev-bypass_D5xQYqbo.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-reset@_@mjs":"chunks/dev-reset_Ia3RUVaO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/disable@_@mjs":"chunks/disable_Be2lTstO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/disable@_@mjs":"chunks/disable_DcZe7LSW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/discard-draft@_@mjs":"chunks/discard-draft_BU3e5Uyc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain-notify@_@mjs":"chunks/domain-notify_DLc3P8rg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/site/domain-proof@_@mjs":"chunks/domain-proof_BYmsxUqt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/domain@_@mjs":"chunks/domain_CWnW1hcH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/duplicate@_@mjs":"chunks/duplicate_DWbKYKRK.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/email@_@mjs":"chunks/email_Bc7n5ViU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dev/emails@_@mjs":"chunks/emails_BFR5v5mO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/enable@_@mjs":"chunks/enable_CBJxZOLJ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/enable@_@mjs":"chunks/enable_Cub2r_q4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/enable@_@mjs":"chunks/enable_D8f6mAvW.mjs","\u0000virtual:emdash/env":"chunks/env_D4nDvOOj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/execute@_@mjs":"chunks/execute_Bn3Ls8jC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute@_@mjs":"chunks/execute_Bt3uouW_.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/execute.mjs":"chunks/execute_CD1x92MT.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/export@_@mjs":"chunks/export_DEJmq_5g.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/index.mjs":"chunks/exports_BFpk-BvY.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/fts-manager-6861qcwk.mjs":"chunks/fts-manager-6861qcwk_E5WqITwL.mjs","\u0000virtual:astro:page:src/pages/gallery@_@astro":"chunks/gallery_BPytLJ2P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/handover@_@mjs":"chunks/handover_jYrwSo-Q.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/health@_@mjs":"chunks/health_nrgPrV0H.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon@_@mjs":"chunks/icon_CamZOtzp.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/image-endpoint@_@mjs":"chunks/image-endpoint_CTjPD7Qc.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/index.mjs":"chunks/imports_D5W__2QW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/index@_@mjs":"chunks/index_24h2HCW7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/index@_@mjs":"chunks/index_BFI4i1rw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/index@_@mjs":"chunks/index_BFz98aVW.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/index@_@mjs":"chunks/index_BGPvBE5h.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/index@_@mjs":"chunks/index_BGdkb-Bv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/index@_@mjs":"chunks/index_BLNOLt2U.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/providers/_providerId_/index@_@mjs":"chunks/index_BOnGHzYD.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/_id_/index@_@mjs":"chunks/index_BfV7ynp8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/index@_@mjs":"chunks/index_BrIm17gX.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/index@_@mjs":"chunks/index_Bxr89ss2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/index@_@mjs":"chunks/index_C2MxzHg-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/index@_@mjs":"chunks/index_C4fkoW7T.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/index@_@mjs":"chunks/index_C5ySrmWP.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/api-tokens/index@_@mjs":"chunks/index_C6Z3o4N7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/index@_@mjs":"chunks/index_CCkxTJrD.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/index@_@mjs":"chunks/index_CEnNz0NV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/relations/index@_@mjs":"chunks/index_CIFRJ8Z-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/index@_@mjs":"chunks/index_CIvPgVyO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/sections/index@_@mjs":"chunks/index_CK-mRKus.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/archives/index@_@mjs":"chunks/index_CqGWDLt6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/index@_@mjs":"chunks/index_Cqb3JXee.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/index@_@mjs":"chunks/index_Cs-80pN4.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/index@_@mjs":"chunks/index_Csou3y-a.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/hooks/exclusive/index@_@mjs":"chunks/index_Csr5rDy1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs":"chunks/index_CzvdhHJZ.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_D1WcOeJL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/index@_@mjs":"chunks/index_D3Z6NCUR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/block-types/_slug_/index@_@mjs":"chunks/index_D72-zWL-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/oauth-clients/index@_@mjs":"chunks/index_D8mVLb-P.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/index@_@mjs":"chunks/index_DP_c8XOO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/index@_@mjs":"chunks/index_DQZds5m9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/index@_@mjs":"chunks/index_DfyJxwNb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/allowed-domains/index@_@mjs":"chunks/index_Dhtr9DdF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/index@_@mjs":"chunks/index_DiclkZ63.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/index@_@mjs":"chunks/index_DtryRSPt.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings/backups/index@_@mjs":"chunks/index_Dv2wTqWV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/index@_@mjs":"chunks/index_DwM0dSPz.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/index@_@mjs":"chunks/index_DxRCxlmI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/index@_@mjs":"chunks/index_Dy5GEbp9.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/index@_@mjs":"chunks/index_OOLKW1Yj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/index@_@mjs":"chunks/index_OPjn7fr-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/index@_@mjs":"chunks/index_VTmK2Yix.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/index@_@mjs":"chunks/index_WxZHTxyu.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/index@_@mjs":"chunks/index_bgoTyVsg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/index@_@mjs":"chunks/index_iW71XJZM.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/orphans/index@_@mjs":"chunks/index_m9-jRDXg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/folders/index@_@mjs":"chunks/index_mOK74t1E.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/install@_@mjs":"chunks/install_BF2CSIop.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/install@_@mjs":"chunks/install_CKf6ZbGA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/items@_@mjs":"chunks/items_BUPmP3vu.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/auth/dist/adapters/kysely.mjs":"chunks/kysely_JbPAu9XA.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/loader.ts":"chunks/loader_BqUkLm2j.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/lock@_@mjs":"chunks/lock_D9OFHAyw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/logout@_@mjs":"chunks/logout_ALmCcNtL.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/exports/_id_/manifest.mjs":"chunks/manifest_B2TE6LkF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/manifest@_@mjs":"chunks/manifest_B4jjgc5o.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/mcp@_@mjs":"chunks/mcp_BmXo1ob1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/mcp@_@mjs":"chunks/mcp_C0fTJ2LH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs":"chunks/me_DI0a9tTg.mjs","\u0000virtual:emdash/media-providers":"chunks/media-providers_CRQA74br.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/media-usage-X1_20MY-.mjs":"chunks/media-usage-X1_20MY-_Xz3azttC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media@_@mjs":"chunks/media_3t6k6Blv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/media@_@mjs":"chunks/media_BaT8O5lj.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/menus-B0Qqv_cS.mjs":"chunks/menus-B0Qqv_cS_BaC65sIa.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/missing.mjs":"chunks/missing_CON5d-XQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/mode@_@mjs":"chunks/mode_R1KbL3fV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-authorization-server@_@mjs":"chunks/oauth-authorization-server_BaxE_3dO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource@_@mjs":"chunks/oauth-protected-resource_BOeLixjD.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/openapi.json@_@mjs":"chunks/openapi_Dn-JzmTb.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/options@_@mjs":"chunks/options_C09fhm6A.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/options@_@mjs":"chunks/options_C6_6J-BO.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/references/_relation_/parents@_@mjs":"chunks/parents_B-hH6pL_.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/permanent@_@mjs":"chunks/permanent_DhjVftK9.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/plan.mjs":"chunks/plan_BAu0kXZI.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/prepare@_@mjs":"chunks/prepare_rUCG-Xqc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/preview-url@_@mjs":"chunks/preview-url_CW3RfYqA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/themes/preview@_@mjs":"chunks/preview_CCQmvevR.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/probe@_@mjs":"chunks/probe_B7phC26E.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/progress@_@mjs":"chunks/progress_CMECl8IL.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish@_@mjs":"chunks/publish_BOJPQqo2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/publish@_@mjs":"chunks/publish_q0bHPGSq.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/publisher-handle@_@mjs":"chunks/publisher-handle_0nx0bltn.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/query.ts":"chunks/query_BO1oTrGy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/comments/_collection_/_contentId_/reactions@_@mjs":"chunks/reactions_CJ_XVZyV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/rebuild@_@mjs":"chunks/rebuild_DW929jkP.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/astro/routes/api/admin/transfer/imports/_id_/receipt.mjs":"chunks/receipt_Dnx9RNMX.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/refresh@_@mjs":"chunks/refresh_CagY0oVy.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/invite/register-options@_@mjs":"chunks/register-options_BsZXwYIl.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/register@_@mjs":"chunks/register_4LioqRN2.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/reorder@_@mjs":"chunks/reorder_2h1UcT9n.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/_slug_/fields/reorder@_@mjs":"chunks/reorder_BLDAhR1S.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/reorder@_@mjs":"chunks/reorder_DTqC6FpH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/schema/collections/reorder@_@mjs":"chunks/reorder_DuPyGf30.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/reorder@_@mjs":"chunks/reorder_Eo9J-xjU.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/reorder@_@mjs":"chunks/reorder_W8-BRd_6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/repair@_@mjs":"chunks/repair_BHFESOlQ.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/replace@_@mjs":"chunks/replace_p6V6aGGr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/request@_@mjs":"chunks/request_DSW-7r6v.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/revisions/_revisionId_/restore@_@mjs":"chunks/restore_BoVoHxa6.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/restore@_@mjs":"chunks/restore_pFXL_sFs.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/collection-deletions/retry@_@mjs":"chunks/retry_3uQZoPTA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/media-usage/work/retry@_@mjs":"chunks/retry_C7xdC1w-.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/revisions@_@mjs":"chunks/revisions_BtZg8MAj.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token/revoke@_@mjs":"chunks/revoke_mLvEGuzr.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls@_@mjs":"chunks/rewrite-urls_BmXm-PMA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/robots.txt@_@mjs":"chunks/robots_47GtRwYc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/schedule@_@mjs":"chunks/schedule_DRNdV6cV.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/schema-B-3rntlX.mjs":"chunks/schema-B-3rntlX_lHQUT1kc.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/schema-BqBlUZtb.mjs":"chunks/schema-BqBlUZtb_hW2lmRLk.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/search-BPWTnpnD.mjs":"chunks/search-BPWTnpnD_CMyobesl.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/users/_id_/send-recovery@_@mjs":"chunks/send-recovery_rz8oQ5Zg.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/send@_@mjs":"chunks/send_pRxw4ipf.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/settings--XlUdUaI.mjs":"chunks/settings--XlUdUaI_DNfNOtN7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/settings@_@mjs":"chunks/settings_CvmcV1WB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/settings@_@mjs":"chunks/settings_DRwzGszV.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap-_collection_.xml@_@mjs":"chunks/sitemap-_collection__DOZAugtE.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap.xml@_@mjs":"chunks/sitemap_B5w2OIr1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/snapshot@_@mjs":"chunks/snapshot_vdnbZgVs.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/stats@_@mjs":"chunks/stats_BZdf15Pn.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/status@_@mjs":"chunks/status_CnZ63PaH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/comments/_id_/status@_@mjs":"chunks/status_DZFsK2TG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/search/suggest@_@mjs":"chunks/suggest_B48k5rZB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/redirects/404s/summary@_@mjs":"chunks/summary_C9qxNC4Q.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/taxonomies-5SR76j11.mjs":"chunks/taxonomies-5SR76j11_DQge9wu8.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/taxonomies/index.ts":"chunks/taxonomies_CWxT83MW.mjs","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/dist/taxonomy-CMI5fczd.mjs":"chunks/taxonomy-CMI5fczd_ChMaHSE1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/themes/marketplace/_id_/thumbnail@_@mjs":"chunks/thumbnail_Hxp5-3wB.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/token@_@mjs":"chunks/token_BF-mympN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/oauth/device/token@_@mjs":"chunks/token_BNIQRF_I.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/toolbar-labels@_@mjs":"chunks/toolbar-labels_D5fa3bX8.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/translations@_@mjs":"chunks/translations_8A-dhi3C.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/bylines/_id_/translations@_@mjs":"chunks/translations_BFXYMQEa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/menus/_name_/translations@_@mjs":"chunks/translations_BQc-i_LH.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/terms/_slug_/translations@_@mjs":"chunks/translations_Bu20AdC0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/_name_/translations@_@mjs":"chunks/translations_CVDP3qhF.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/trash@_@mjs":"chunks/trash_Dm2ud5m0.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/typegen@_@mjs":"chunks/typegen_CyyZCA_M.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/uninstall@_@mjs":"chunks/uninstall_BN9rR-5o.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/uninstall@_@mjs":"chunks/uninstall_CQksq_Ys.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/unpublish@_@mjs":"chunks/unpublish_Cj1SiYdC.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/_id_/update@_@mjs":"chunks/update_Bm6DmtCa.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/_id_/update@_@mjs":"chunks/update_Di5JNCwS.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/updates@_@mjs":"chunks/updates_DIuRnknG.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/upload-url@_@mjs":"chunks/upload-url_D_C4XpnN.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/upload@_@mjs":"chunks/upload_C-HMwsUA.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/media/_id_/usage@_@mjs":"chunks/usage_DJUJVnro.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs":"chunks/usage_SRPxl1t7.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/verify@_@mjs":"chunks/verify_BDxK4mZ1.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify@_@mjs":"chunks/verify_BzPmxAXm.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/verify@_@mjs":"chunks/verify_C2oCaI8Q.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify@_@mjs":"chunks/verify_UTPjUwBc.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/passkey/register/verify@_@mjs":"chunks/verify_i97XZaJw.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-components@_@mjs":"chunks/widget-components_wnAVmHwv.mjs","\u0000virtual:astro:page:node_modules/emdash/dist/astro/routes/api/widget-areas/_name_/widgets@_@mjs":"chunks/widgets_BcfGPM9F.mjs","/Users/cjdunteman/repos/three-story-studio/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.Gwf19K9S.js","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/HtmlBlockFrame.astro?astro&type=script&index=0&lang.ts":"_astro/HtmlBlockFrame.astro_astro_type_script_index_0_lang.BU-pUjYT.js","/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/InlinePortableTextEditor.tsx":"_astro/InlinePortableTextEditor.BFMQP-VZ.js","emdash/internal/routes/PluginRegistry":"_astro/PluginRegistry.B5c7qswX.js","@astrojs/react/client.js":"_astro/client.B2xPyUxA.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/CodeEditor-UHsDaao9.js":"_astro/CodeEditor-UHsDaao9.Bq3urCew.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ar.js":"_astro/ar.Ngvx0B79.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/bn.js":"_astro/bn.AzJ73Mas.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ca.js":"_astro/ca.BR6Rkx4S.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/cs.js":"_astro/cs.JoWGQlol.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/da.js":"_astro/da.Cp49cbC1.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/de.js":"_astro/de.BVHWjCBf.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/registry-client/dist/discovery/index.js":"_astro/discovery.BZxv8LJh.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/en-GB.js":"_astro/en-GB.7qg3xOSp.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/es.js":"_astro/es.Ejf3KOkO.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/eu.js":"_astro/eu.Cs7LQyMN.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/fa-IR.js":"_astro/fa-IR.DCoZ0t-W.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/fr.js":"_astro/fr.CB_ZhdA3.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/he.js":"_astro/he.Dhsyw04A.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/hi.js":"_astro/hi.DT_lA_WM.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/hr.js":"_astro/hr.DNozE1oj.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/hu.js":"_astro/hu.Bj77h4md.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/id.js":"_astro/id.G54UD7jp.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@phosphor-icons/react/dist/index.es.js":"_astro/index.es.CvTiMiGv.js","/Users/cjdunteman/repos/three-story-studio/node_modules/invokers-polyfill/index.js":"_astro/invokers-polyfill.D9osDMpS.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/it.js":"_astro/it.DHWmFW02.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ja.js":"_astro/ja.Bz3YNTpR.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ka.js":"_astro/ka.VsMPTCjX.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ko.js":"_astro/ko.CXBwDxt0.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/nb.js":"_astro/nb.C7s-n9K5.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/nl.js":"_astro/nl.maQ8o0vG.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/pl.js":"_astro/pl.CUsB5kLA.js","/Users/cjdunteman/repos/three-story-studio/node_modules/@emdash-cms/admin/dist/plugins-DvJDUKMa.js":"_astro/plugins-DvJDUKMa.DckANRrk.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/pt-BR.js":"_astro/pt-BR.Dh7AzUqM.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/pt.js":"_astro/pt.taJjVSmD.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/ru.js":"_astro/ru.DTcFFQjo.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/sr-Latn.js":"_astro/sr-Latn.BGx4nr70.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/sv.js":"_astro/sv.Bkq2Z5iF.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/th.js":"_astro/th.mJCe_PLT.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/tr.js":"_astro/tr.w7H3fgrC.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/uk.js":"_astro/uk.C4ByVXeQ.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/zh-CN.js":"_astro/zh-CN.B_2gt7kx.js","/Users/cjdunteman/repos/three-story-studio/node_modules/react-day-picker/dist/esm/locale/zh-TW.js":"_astro/zh-TW.D-3993Wm.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/3SS_logo_transparent.png","/_astro/Base.CuOjpPOZ.css","/_astro/CodeEditor-UHsDaao9.Bq3urCew.js","/_astro/DateLib.0wPzMF9B.js","/_astro/Header.astro_astro_type_script_index_0_lang.Gwf19K9S.js","/_astro/HtmlBlockFrame.astro_astro_type_script_index_0_lang.BU-pUjYT.js","/_astro/InlinePortableTextEditor.BFMQP-VZ.js","/_astro/PluginRegistry.B5c7qswX.js","/_astro/ar.Ngvx0B79.js","/_astro/bn.AzJ73Mas.js","/_astro/ca.BR6Rkx4S.js","/_astro/client.B2xPyUxA.js","/_astro/client.DeYT6-3Q.js","/_astro/cs.JoWGQlol.js","/_astro/da.Cp49cbC1.js","/_astro/dancing-script-latin-400-normal.-YrtvvVF.woff2","/_astro/dancing-script-latin-400-normal.BY5FxJb0.woff","/_astro/dancing-script-latin-ext-400-normal.C917Kz-3.woff2","/_astro/dancing-script-latin-ext-400-normal.DaWfpMsu.woff","/_astro/dancing-script-vietnamese-400-normal.D2srOv8f.woff","/_astro/dancing-script-vietnamese-400-normal.lz8MlVep.woff2","/_astro/de.BVHWjCBf.js","/_astro/discovery.BZxv8LJh.js","/_astro/dist.DmpP6oBr.js","/_astro/en-GB.7qg3xOSp.js","/_astro/en-US.Dsza-2-1.js","/_astro/es.Ejf3KOkO.js","/_astro/eu.Cs7LQyMN.js","/_astro/fa-IR.DCoZ0t-W.js","/_astro/fonts/08f0ea18cdf1ae81.woff2","/_astro/fonts/1633c6c006fb5995.woff2","/_astro/fonts/190f8cf059e0f931.woff2","/_astro/fonts/1d7aab50fda97bb3.woff2","/_astro/fonts/1e5097bbf9c9d577.woff2","/_astro/fonts/63342f4e10d096aa.woff2","/_astro/fonts/6ed39b447c70fac7.woff2","/_astro/fonts/81fc65a9fa1b7533.woff2","/_astro/fonts/84070159564df0be.woff2","/_astro/fonts/9593fbb8383eb01c.woff2","/_astro/fonts/a582ec5275b6220a.woff2","/_astro/fonts/a9bea187e846fcc2.woff2","/_astro/fonts/ad35ff1453ab1728.woff2","/_astro/fonts/cced06053f87829e.woff2","/_astro/fonts/d581d51cd793384e.woff2","/_astro/fonts/f52e1d65e1364c61.woff2","/_astro/fr.CB_ZhdA3.js","/_astro/he.Dhsyw04A.js","/_astro/hi.DT_lA_WM.js","/_astro/hr.DNozE1oj.js","/_astro/html-block.ClFHzl_P.js","/_astro/hu.Bj77h4md.js","/_astro/id.G54UD7jp.js","/_astro/index.es.C4CMJdY9.js","/_astro/index.es.CvTiMiGv.js","/_astro/invokers-polyfill.D9osDMpS.js","/_astro/isSameWeek.DG-7IsR2.js","/_astro/it.DHWmFW02.js","/_astro/ja.Bz3YNTpR.js","/_astro/jsx-runtime.D9gUpo36.js","/_astro/ka.VsMPTCjX.js","/_astro/ko.CXBwDxt0.js","/_astro/lib.NDCvW4Yk.js","/_astro/listing-policy.CKnc2p5f.js","/_astro/messages-B-F60t8q.BRqJ9gDm.js","/_astro/messages-B0BCv599.BG2d6BJZ.js","/_astro/messages-B6yZGWgQ.BYxuZIHI.js","/_astro/messages-BK-tYSWG.IjaAlhia.js","/_astro/messages-BLjy9gT-._q4eptrE.js","/_astro/messages-BOkO4qva.CRN6_h0Z.js","/_astro/messages-BWGzIv4B.q-rL5lnX.js","/_astro/messages-Bikiqblc.BQwPDRLN.js","/_astro/messages-BkvpZ-7S.DJvzsCeV.js","/_astro/messages-Brb7Ewlq.Cp7N3LJ_.js","/_astro/messages-BxorrMDL.Dozny3F9.js","/_astro/messages-By0sYTNc.WTa02VTV.js","/_astro/messages-C1IDHXdm.CKu4MRsL.js","/_astro/messages-CDURktvZ.CjPgQFiX.js","/_astro/messages-CDoPmyPD.Dtr53WkH.js","/_astro/messages-CLJ8BrHU.CqNPHg34.js","/_astro/messages-CRPWwVJj.BSvMhRu5.js","/_astro/messages-CfBxAYxv.XtRaMazv.js","/_astro/messages-CnrCotb-.CYgauQgk.js","/_astro/messages-D0TEOMlM.DX2v_w5N.js","/_astro/messages-D1vghJc4.BnCoOnaB.js","/_astro/messages-D6Jnuwaq.DwR52krF.js","/_astro/messages-DEukxExT.CUsUaCcb.js","/_astro/messages-DUlsSUrn.DguOSZvv.js","/_astro/messages-Da_yFdAG.DfoBkxkc.js","/_astro/messages-L2ewXatf.DZAU0lKP.js","/_astro/messages-RwTPlE_B.BH0cO5jo.js","/_astro/messages-Sj6Maupf.CsOSiaBZ.js","/_astro/messages-SjVdWFob.D5cdQY6D.js","/_astro/messages-TBG9bLnA.CeqvOfkn.js","/_astro/messages-YnBnL8aZ.B0TaxMYA.js","/_astro/messages-fIU-37FH.CY-N1OM-.js","/_astro/messages-hAyIYlyM.DanK3HjO.js","/_astro/messages-i6VVd7zZ.BnOnJt0c.js","/_astro/messages-irmP9UnX.BPM4K7BC.js","/_astro/messages-s-T1hU5_.C48ePbZ0.js","/_astro/nb.C7s-n9K5.js","/_astro/nl.maQ8o0vG.js","/_astro/pl.CUsB5kLA.js","/_astro/plugins-DvJDUKMa.DckANRrk.js","/_astro/plugins-DvJDUKMa.wOADXva9.js","/_astro/preload-helper.DygEbaNj.js","/_astro/pt-BR.Dh7AzUqM.js","/_astro/pt.taJjVSmD.js","/_astro/react-dom.c_sf7UW_.js","/_astro/react.B54jxNxs.js","/_astro/rolldown-runtime.XKyaHtl9.js","/_astro/ru.DTcFFQjo.js","/_astro/sr-Latn.BGx4nr70.js","/_astro/styles.CUsjoeGg.css","/_astro/sv.Bkq2Z5iF.js","/_astro/th.mJCe_PLT.js","/_astro/tr.w7H3fgrC.js","/_astro/uk.C4ByVXeQ.js","/_astro/zh-CN.B_2gt7kx.js","/_astro/zh-TW.D-3993Wm.js","/favicon.png","/fonts/PrintClearly-GGP.ttf","/icons/facebook.svg","/icons/instagram.svg","/icons/linkedin.svg"],"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"SnkgyOHp6Kba825Ukm3t4LU7K9uBWgkGI/mQsl5RRrE=","sessionConfig":{"driver":"unstorage/drivers/lru-cache","options":{"max":500}},"image":{"layout":"constrained"},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./noop-entrypoint_CxXy0p4B.mjs"),
	middleware: () => import("../virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./_virtual_astro_session-driver_IwDkEcCZ.mjs"),
	serverIslandMappings: () => import("./_virtual_astro_server-island-manifest_BhTW5IeR.mjs"),
	routes: manifestRoutes,
	pageMap
});
/**
* The ambient manifest: the explicitly registered one, else the virtual
* module's. Throws lazily when neither is available, so merely importing a
* module that uses this never fails — only actually handling a request does.
*/
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
// node_modules/astro/dist/core/app/render-options.js
/**
* Symbol used to attach `ResolvedRenderOptions` to a `Request` object so
* that they can flow through the `FetchHandler` signature (which only takes
* a request) into the request handler chain. This is an internal implementation
* detail between `BaseApp` and the default handler pipeline.
*/
var renderOptionsSymbol = Symbol.for("astro.renderOptions");
/**
* Reads `ResolvedRenderOptions` that were attached to a request via
* `renderOptionsSymbol`. Returns `undefined` if no options are attached.
*/
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
/**
* Attaches `ResolvedRenderOptions` to a request via `renderOptionsSymbol` so
* that downstream handlers can read them.
*/
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
// node_modules/astro/dist/core/app/origin-check.js
/**
* Content types that can be passed when sending a request via a form
*
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
* @private
*/
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
/**
* Determines whether a request should be rejected because it is a cross-site
* submission for a route rendered on demand.
*
* This encapsulates the shared logic used by both the origin-check middleware
* and the Astro Actions dispatch, so the check is applied consistently
* regardless of where the request is handled.
*
* @private
*/
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const contentType = request.headers.get("content-type");
	if (contentType && !hasFormLikeHeader(contentType)) return false;
	switch (request.headers.get("sec-fetch-site")) {
		case "":
		case null: break;
		case "same-origin":
		case "none": return false;
		default: return true;
	}
	const origin = request.headers.get("origin");
	if (!origin) return false;
	return origin !== url.origin;
}
/**
* Builds the 403 response returned when a cross-site submission is rejected.
*
* @private
*/
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
/**
* Returns middleware that rejects cross-origin form submissions.
*
* @private
*/
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
// node_modules/astro/dist/core/fetch/features.js
/**
* Bit flags for features that handler functions register as "used" when a
* custom `src/fetch.ts` fetch handler is in play. After the first request
* (dev) or at runtime (prod SSR), we compare against the manifest to warn
* about features the user configured but forgot to include in their custom
* fetch handler.
*/
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
/** All feature bits ORed together. Keep next to `FetchFeatures` so
*  new flags are hard to forget. */
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
/** ORs a feature bit into the manifest's used-features bitmask. */
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
/** The used-features bitmask for a manifest; `0` when nothing was marked. */
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
// node_modules/astro/dist/core/routing/invalid-encoding.js
/**
* Returns an empty `400 Bad Request` response when the request path was
* encoded too many times to fully decode, or is not valid percent-encoded
* UTF-8 (`state.invalidEncoding`), or `undefined` otherwise.
*
* Every entry point that routes the request or runs middleware calls this
* first, so composable pipelines reject the request the same way
* `handleRequest` does regardless of which handlers they include.
*/
function rejectInvalidEncoding(state) {
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
}
// node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
// node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" })?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
// node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
// node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	#logger;
	constructor(request, logger) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
		this.#logger = logger;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value !== void 0) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
// node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
// node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
// node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
// node_modules/astro/dist/i18n/fallback.js
/**
* Compute fallback route for failed responses.
* Pure function - no APIContext, no Response objects, no URL objects.
*
* This function determines whether a failed request should be redirected or rewritten
* to a fallback locale based on the i18n configuration.
*/
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const segments = pathname.split("/");
	const urlLocale = segments.find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	const localeIndex = segments.indexOf(urlLocale);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		segments.splice(localeIndex, 1);
		newPathname = segments.join("/") || "/";
	} else {
		segments[localeIndex] = pathFallbackLocale;
		newPathname = segments.join("/");
	}
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
// node_modules/astro/dist/i18n/router.js
/**
* Router for i18n routing strategy decisions.
* Determines whether to continue, redirect, or return 404 based on pathname and locale.
*
* This is a pure class that returns decision objects (not HTTP Responses).
* The middleware layer is responsible for converting decisions to HTTP responses.
*/
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		for (const page of STATUS_CODE_PAGES) if (pathname.includes(page)) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
// node_modules/astro/dist/core/i18n/handler.js
/**
* Pure compile from explicit values — used by `astro:i18n`'s manual-mode
* middleware wrapper (`src/i18n/middleware.ts`), which receives the values as
* arguments rather than reading a manifest.
*/
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
/**
* The compiled i18n post-processor for a manifest, or `null` when i18n is
* unset or the routing strategy is `manual`.
*/
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
/**
* Post-processes a rendered `Response` against the compiled i18n
* configuration, as an explicit step in `handleRequest` after the middleware
* chain returns. The manual-strategy public API (`astro:i18n.middleware(...)`)
* wraps this in a middleware-shaped closure.
*/
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const routeData = state.routeData;
	const isPrerendered = routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false,
		allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = isMissingLocalePage(state, routeData, response) ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": try {
				return await state.rewrite(fallbackDecision.pathname + url.search);
			} catch {
				break;
			}
		}
	}
	return response;
}
/**
* Whether the render pipeline signals that the page does not exist in the
* requested locale. Two signals exist:
*
* - the fallback sentinel (`X-Astro-Route-Type: fallback`, status 500) for
*   routes of type `fallback`;
* - an on-demand page reached through one of its `fallbackRoutes`, which
*   renders with the `302` that `getDefaultStatusCode` assigns to such
*   matches and no `Location` (#18473; the status stopped being consumed
*   in #15704). A page that took over the response (an explicit redirect or
*   status) is not a missing page and is served as is.
*/
function isMissingLocalePage(state, routeData, response) {
	if (state.responseRouteType === "fallback") return true;
	return isFallbackRouteMatch(routeData, state.pathname) && response.status === 302 && !response.headers.has("Location");
}
// node_modules/astro/dist/i18n/index.js
/**
* Given a locale (code), it returns its corresponding path
* @param locale
* @param locales
*/
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
/**
* Returns an array of only locales, by picking the `code`
* @param locales
*/
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
// node_modules/astro/dist/i18n/utils.js
/**
* Parses the value of the `Accept-Language` header:
*
* More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
*
* Complex example: `fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`
*
*/
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		const qa = a.locale === "*" ? a.qualityValue ?? 0 : a.qualityValue ?? 1;
		return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
	});
}
/**
* Set the current locale by parsing the value passed from the `Accept-Header`.
*
* If multiple locales are present in the header, they are sorted by their quality value and the highest is selected as current locale.
*
*/
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
/**
* Check if any of the route's resolved param values match a configured locale.
* This handles dynamic routes like `[locale]` or `[...path]` where the locale
* isn't in a static segment of the route pathname.
*/
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
// node_modules/astro/dist/core/app/prepare-response.js
/**
* Appends cookies written via `Astro.cookie.set()` to the `Set-Cookie` header
* and marks the response as sent.
*
* This is a pure function with no dependencies on the app; it is shared by
* `handleRequest` and the various error handlers.
*/
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
// node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
/**
* Handles dispatch of a matched route (endpoint / redirect / page / fallback)
* at the bottom of the middleware chain. This is a pure dispatch layer — it
* renders whatever route the `FetchState` currently points to without any
* rewrite logic. Rewrites are handled upstream: `executeRewrite()` for
* `Astro.rewrite()` and `handleMiddleware` for `next(payload)`.
*
* `handlePages` is the `next` callback that `handleMiddleware` invokes at
* the end of the middleware chain. Error handlers and the container also
* use it directly for the same dispatch behavior.
*/
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (isRoute404(state.routeData.route) || isRoute500(state.routeData.route)) state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/routing/match.js
/** Find matching route from pathname */
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
/**
* Determines if the given route matches a 404 or 500 error page.
*
* @param {RouteData} route - The route data to check.
* @returns {boolean} `true` if the route matches a 404 or 500 error page; otherwise, `false`.
*/
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
/**
* Determines if a given route is associated with the server island component.
*
* @param {RouteData} route - The route data object to evaluate.
* @return {boolean} Returns true if the route's component is the server island component; otherwise, false.
*/
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
// node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => isRoute404(route.route))) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
// node_modules/astro/dist/core/routing/priority.js
/**
* Comparator for sorting routes in resolution order.
*
* The routes are sorted in by the following rules in order, following the first rule that
* applies:
* - More specific routes are sorted before less specific routes. Here, "specific" means
*   the number of segments in the route, so a parent route is always sorted after its children.
*   For example, `/foo/bar` is sorted before `/foo`.
*   Index routes, originating from a file named `index.astro`, are considered to have one more
*   segment than the URL they represent.
* - Static routes are sorted before dynamic routes.
*   For example, `/foo/bar` is sorted before `/foo/[bar]`.
* - Dynamic routes with single parameters are sorted before dynamic routes with rest parameters.
*   For example, `/foo/[bar]` is sorted before `/foo/[...bar]`.
* - Prerendered routes are sorted before non-prerendered routes.
* - Endpoints are sorted before pages.
*   For example, a file `/foo.ts` is sorted before `/bar.astro`.
* - If both routes are equal regarding all previous conditions, they are sorted alphabetically.
*   For example, `/bar` is sorted before `/foo`.
*   The definition of "alphabetically" is dependent on the default locale of the running system.
*/
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
// node_modules/astro/dist/core/routing/router.js
/**
* Matches request pathnames against a route list with base and trailing slash rules.
*/
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
/**
* Normalize a base path to a leading-slash form.
*/
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
/**
* Provide a redirect target for pathnames that need correction.
* - Ensures a leading slash.
* - Collapses multiple leading slashes into a single slash redirect.
*/
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
/**
* Strip the configured base from the pathname and account for trailing slash policies.
* Returns null if the pathname is outside the base or should be redirected elsewhere.
*/
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
/**
* Normalize file-format pathnames by removing .html and /index.html suffixes.
*/
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
// node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
/**
* The route table for a manifest: the derived route list (with the default
* 404 ensured) and the compiled router. All route reads — matching, rewrites,
* custom-404 fallbacks, `manifestData` accessors — go through this single
* entry so dev HMR updates are visible to every consumer at once.
*/
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
/**
* Atomically replaces the route table for a manifest (dev `astro:routes-updated`).
* Runs `ensure404Route` on the new list, compiles a fresh `Router`, and swaps
* the memo entry in one step, so no consumer can observe a half-updated table.
*/
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
/**
* Low-level route matching against the manifest routes. Returns the matched
* `RouteData` or `undefined`. Does not filter prerendered routes or check
* public assets — use the app-level match for that.
*/
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
/**
* Returns all routes matching the given pathname, in priority order. Used when
* the first match cannot serve the request (e.g. a prerendered dynamic route
* that doesn't cover this specific path) and the caller needs to try
* subsequent matches.
*/
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
// node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
/** Resolves the cache provider from the manifest, `null` when none. */
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
// node_modules/astro/dist/core/cache/runtime/utils.js
/**
* Generate default cache response headers from CacheOptions.
* Used when the provider doesn't supply its own `setHeaders()`.
*/
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
// node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = Symbol.for("astro:cache:apply");
var IS_ACTIVE = Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
		if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
/**
* Apply cache headers to a response.
*/
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
// node_modules/astro/dist/core/cache/runtime/noop.js
/**
* A no-op cache implementation used in dev mode when cache is configured.
* The API is available so user code doesn't need conditional checks,
* but nothing is actually cached.
*/
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
/**
* A no-op cache used when cache is not configured.
* Logs a warning on first use instead of throwing, so libraries
* can call cache methods without needing try/catch.
* `invalidate()` still throws since it implies the caller
* expects purging to actually work.
*/
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
// node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} — parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
// node_modules/astro/dist/core/cache/runtime/route-matching.js
/**
* Compile config-level cache route patterns into RegExps.
* The result is memoized on the pipeline — this function is only called once,
* on the first request that needs route matching.
* Returns compiled patterns sorted by Astro's standard route priority (most specific first).
*/
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
/**
* Called per-request to find the first matching cache rule for a given pathname.
*/
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
// node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
/**
* Registers a cache provider on the given `FetchState`. When
* `state.resolve('cache')` is first called, the appropriate cache
* implementation is created (disabled, noop for dev, or real).
*
* Returns synchronously when cache is not configured or in dev mode.
*/
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
/**
* Wraps a render callback with cache provider logic. Handles both
* runtime caching (onRequest) and CDN-based providers (headers only).
*
* - When a cache provider with `onRequest` is configured, the callback
*   is wrapped so the provider can serve from cache or fall through.
* - When only CDN headers are needed, the callback runs directly and
*   cache headers are applied to the response.
* - When no cache provider is configured, the callback runs as-is.
*
* Cache headers (`CDN-Cache-Control`, `Cache-Tag`) are stripped from
* the final response after the runtime provider has read them.
*/
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil,
			logger: {
				info(msg) {
					state.logger.info("cache", msg);
				},
				warn(msg) {
					state.logger.warn("cache", msg);
				},
				error(msg) {
					state.logger.error("cache", msg);
				}
			}
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response.headers.delete("CDN-Cache-Control");
		response.headers.delete("Cache-Tag");
		return response;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
/**
* Config-level cache routes compiled from `manifest.cacheConfig`, derived
* lazily on the first cache-seeded request.
*/
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
// node_modules/astro/dist/core/session/driver.js
var sessionDriverMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.sessionDriver) return (await manifest.sessionDriver())?.default || null;
	return null;
});
/** Resolves the session driver factory from the manifest, `null` when none. */
function getSessionDriver(manifest) {
	return sessionDriverMemo.get(manifest);
}
// node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var unflatten$1 = (parsed, _) => {
	return unflatten(parsed, { URL: (href) => new URL(href) });
};
var stringify$1 = (data, _) => {
	return stringify(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#logger;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage, logger }) {
		this.#logger = logger;
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten$1(JSON.parse(stringify$1(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const cookieValue = this.#cookies.get(this.#cookieName)?.value;
		const sessionId = this.#sessionID ?? (cookieValue && UUID_REGEX.test(cookieValue) ? cookieValue : void 0);
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
			this.#partial = false;
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key) => data.delete(key));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify$1(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten$1(raw);
			if (!(storedMap instanceof Map)) {
				this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue && UUID_REGEX.test(cookieValue)) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
// node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
/**
* Registers a session provider on the given `FetchState`. When
* `state.resolve('session')` is first called, the `AstroSession` is
* created lazily. When `state.finalizeAll()` runs, any mutations are
* persisted.
*
* No-op (returns synchronously) if sessions are not configured on the
* manifest, avoiding promise allocation on the hot path.
*/
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
	const config = state.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const driverFactory = await getSessionDriver(state.manifest);
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: getEnvironment(state.manifest).runtimeMode,
				driverFactory,
				mockStorage: null,
				logger: state.logger
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
// node_modules/astro/dist/core/app/validate-headers.js
/**
* Parses a potentially comma-separated multi-value header (as produced by
* proxy chains) and returns the first value, trimmed of whitespace.
* Returns `undefined` when the header is absent or empty.
*/
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
/**
* Sanitize a hostname by rejecting any with path separators.
* Prevents path injection attacks. Invalid hostnames return undefined.
*/
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
/**
* Parse a host string into hostname and port components. Returns `undefined`
* for a host that carries more than a single `hostname:port` pair (e.g.
* `example.com:8080:8080`), which is not a valid host and would otherwise be
* accepted by inspecting only the first two segments.
*/
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
/**
* Check if a host matches any of the allowed domain patterns.
* Assumes hostname and port are already sanitized/parsed.
*/
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
/**
* Validate a host against allowedDomains.
* Returns the host only if it matches an allowed pattern; otherwise, undefined.
* This prevents SSRF attacks by ensuring the Host header is trusted.
*/
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
/**
* Validate forwarded headers (proto, host, port) against allowedDomains.
* Returns validated values or undefined for rejected headers.
* Uses strict defaults: http/https only for proto, rejects port if not in allowedDomains.
*/
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
// node_modules/astro/dist/core/output-filename.js
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
// node_modules/astro/dist/core/errors/default-handler.js
/**
* The default error strategy used in production SSR. Attempts to render the
* matching error route (404.astro / 500.astro), falling back to a plain
* response with the given status. Handles prerendered error pages via
* `prerenderedErrorPageFetch`.
*/
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response, resolvedRenderOptions);
				return response;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
// node_modules/astro/dist/core/errors/build-handler.js
/**
* The error strategy used during static build / prerendering.
*
* - For 500 errors, returns the original response if present, otherwise
*   throws so the build surfaces the underlying error to the developer.
* - For other errors (e.g. 404), delegates to `renderDefaultError` with
*   `prerenderedErrorPageFetch` cleared (the build pipeline can't fetch
*   prerendered pages the way production SSR can).
*/
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
// node_modules/astro/dist/core/errors/dev-handler.js
/**
* The dev-server error strategy. Renders custom 404/500 routes if the user
* has them, otherwise throws so Vite's dev overlay is shown. Shared between
* the Vite dev server and the non-runnable dev pipeline; only
* `shouldInjectCspMetaTags` differs between them (carried by the
* environment record's `injectCspMetaTagsOnErrorPages` static).
*/
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
// node_modules/astro/dist/core/errors/handler.js
/**
* Renders the error page (404.astro / 500.astro or a plain response) for a
* request, dispatching to the strategy the manifest's environment selects:
* production/container default, dev (overlay + custom error routes, with or
* without CSP meta-tag injection), or build (500s throw so the build fails).
*/
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
/**
* Dispatches an internal error render for a request flowing through the
* handler chain: through the facade's late-bound `renderError` hook when the
* state was built by `BaseApp.render`'s fast path (preserving instance
* overrides/reassignments, e.g. cloudflare's prerender-error propagation),
* else through the environment's strategy via {@link renderErrorPage}.
*/
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
/**
* Whether a middleware rewrite (`ctx.rewrite()` / `next(payload)`) issued while
* rendering the error page dead-ended in another empty reroutable (404/500)
* response. The rewrite swaps the state's routeData away from the error route,
* so returning that render as-is would produce a blank page; the error handler
* should instead retry rendering the error page without middleware.
*
* @param skipMiddleware Whether middleware was already skipped for this render.
* @param errorRouteData The error route matched before middleware ran.
* @param renderedRouteData The route data on the state after middleware ran.
* @param response The response produced by the middleware-driven render.
*/
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
// node_modules/astro/dist/core/middleware/callMiddleware.js
/**
* Utility function that is in charge of calling the middleware.
*
* It accepts a `R` generic, which usually is the `Response` returned.
* It is a generic because endpoints can return a different payload.
*
* When calling a middleware, we provide a `next` function, this function might or
* might not be called.
*
* A middleware, to behave correctly, can:
* - return a `Response`;
* - call `next`;
*
* Failing doing so will result an error. A middleware can call `next` and do not return a
* response. A middleware cannot call `next` and return a new `Response` from scratch (maybe with a redirect).
*
* ```js
* const onRequest = async (context, next) => {
*   const response = await next(context);
*   return response;
* }
* ```
*
* ```js
* const onRequest = async (context, next) => {
*   context.locals = "foo";
*   next();
* }
* ```
*
* @param onRequest The function called which accepts a `context` and a `resolve` function
* @param apiContext The API context
* @param responseFunction A callback function that should return a promise with the response
*/
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			/**
			* Then we check if a value is returned. If so, we need to return the value returned by the
			* middleware.
			* e.g.
			* ```js
			* 	const response = await next();
			* 	const new Response(null, { status: 500, headers: response.headers });
			* ```
			*/
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined")
 /**
		* There might be cases where `next` isn't called and the middleware **must** return
		* something.
		*
		* If not thing is returned, then we raise an Astro error.
		*/
		throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
// node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
/**
* Resolves the middleware from the manifest and returns the `onRequest`
* function (prefixed with the origin-check middleware when configured). If
* `onRequest` isn't there, it returns a no-op function.
*/
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
// node_modules/astro/dist/core/middleware/astro-middleware.js
/**
* Runs Astro's middleware chain (origin check + user `onRequest`) for a
* single render, reading the composed middleware from the manifest and
* per-request data (componentInstance, slots, props, API contexts) off the
* supplied `FetchState`. The actual route dispatch (endpoint / redirect /
* page / fallback) is supplied by the caller as `renderRouteCallback` —
* typically `handlePages`.
*/
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
// node_modules/astro/dist/core/util/normalized-url.js
/**
* Creates a normalized URL from a request URL string.
* Decodes and validates the pathname, collapses duplicate slashes.
*/
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
/**
* Assigns `url.pathname` only when the value differs.
* The setter re-parses the whole URL, so a no-op write is still expensive.
*/
function setPathname(url, pathname) {
	if (url.pathname !== pathname) url.pathname = pathname;
}
/**
* Normalizes an already-parsed URL in place: decodes and validates the
* pathname, collapses duplicate slashes. Returns the same URL object.
*
* Collapse runs after the decode is written back: the pathname setter
* rewrites `\` to `/`, so a decoded backslash only becomes `//` once assigned.
*/
function normalizeUrl(url) {
	try {
		setPathname(url, validateAndDecodePathname(url.pathname));
	} catch {
		try {
			setPathname(url, decodeURI(url.pathname));
		} catch {}
	}
	setPathname(url, collapseDuplicateSlashes(url.pathname));
	return url;
}
// node_modules/astro/dist/core/rewrites/handler.js
/**
* Validates and applies a rewrite target to the given `FetchState`.
*
* - Validates that SSR→prerender rewrites are not attempted (except
*   for i18n fallback routes).
* - Mutates `state` to reflect the new route: request, URL, cookies,
*   params, pathname, component instance, etc.
* - Invalidates cached API contexts so they're re-derived from the
*   new route.
*
* Called by both `executeRewrite()` (user-triggered `Astro.rewrite`)
* and `handleMiddleware` (middleware `next(payload)`).
*/
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request, state.logger);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
/**
* Executes a user-triggered rewrite (`Astro.rewrite(...)` /
* `ctx.rewrite(...)`) against a `FetchState`. Resolves the rewrite
* target via the environment's `tryRewrite`, validates it, mutates the
* `FetchState` to reflect the new route, and re-runs the middleware
* and page dispatch to produce the new response.
*/
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
// node_modules/astro/dist/core/i18n/domain.js
/**
* For domain-based i18n routing strategies, derives the locale-prefixed
* pathname from the request's `Host` header rather than its URL. For example,
* a request for `/foo` served from `https://example.fr` resolves to `/fr/foo`.
*
* Returns `undefined` when the strategy isn't domain-based or the host isn't
* mapped to a locale — in which case normal pathname routing applies.
*
*/
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		const validated = validateForwardedHeaders(getFirstForwardedValue(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains);
		const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
		const requestHost = request.headers.get("Host") ?? void 0;
		const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
		let host = validated.host ?? validatedRequestHost;
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
// node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
/** The manifest's `site` as a `URL` (used for `Astro.site`). */
function getSite(manifest) {
	return sites.get(manifest);
}
// node_modules/astro/dist/core/server-islands/mappings.js
/**
* The server-island mappings for a manifest. Deliberately NOT memoized: the
* manifest thunk is a module import, which is cheap.
*/
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
// node_modules/astro/dist/core/fetch/fetch-state.js
var slotValuesSymbol = Symbol("astro.slotValues");
/**
* Retrieves the `FetchState` stashed on an `APIContext` by
* `FetchState.getAPIContext()`. Throws if not found — this indicates
* the context was not created through Astro's request pipeline.
*/
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
/**
* External `<link href>` / `<script src>` entries are stored with empty
* `children`. Hashing that empty string puts the SHA of `''` in CSP and
* disables `'unsafe-inline'` for that directive.
*/
function isInlineCspHeadContent(element) {
	if (!element.children) return false;
	const props = element.props ?? {};
	return props.href == null && props.src == null;
}
/**
* Holds per-request state as it flows through the handler pipeline.
*
* **This class is user-facing** via `astro/fetch` and `astro/hono`.
* The {@link AstroFetchState} interface defines the stable public
* surface. Members not on that interface are internal and
* may change without notice.
*
* Performance note: fields on this class are plain properties — ES
* private fields (`#foo`) have a non-zero per-access cost in V8
* which is measurable on the hot render path, so `#` is used only
* for rarely-accessed memoized caches and Maps.
*/
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/** Explicitly assigned status; `undefined` until a caller sets one. */
	#status;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	* Reads `200` until assigned.
	*/
	get status() {
		return this.#status ?? 200;
	}
	set status(value) {
		this.#status = value;
	}
	/**
	* Sets `status` from the matched route (see `getDefaultStatusCode`)
	* unless a caller already assigned one.
	*/
	applyDefaultStatus() {
		if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
	}
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode, or is not valid percent-encoded UTF-8 (see
	* {@link validateAndDecodePathname}). These requests are rejected with a
	* `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		setPathname(url, publicPathname);
		setPathname(url, collapseDuplicateSlashes(url.pathname));
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request, this.logger);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) {
				if (!isInlineCspHeadContent(style)) continue;
				extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			}
			for (const script of scripts) {
				if (!isInlineCspHeadContent(script)) continue;
				extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
			}
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const Astro = Object.assign(Object.create(astroPagePartial), {
			props,
			self: null
		});
		Object.defineProperty(Astro, slotValuesSymbol, {
			value: slotValues,
			writable: true,
			configurable: true,
			enumerable: false
		});
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get slots() {
				const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
				let slots = slotsByAstro.get(this);
				if (slots === void 0) {
					slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
					slotsByAstro.set(this, slots);
				}
				return slots;
			},
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(logger);
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			const original = this.pathname;
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
			if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch {
			this.invalidEncoding = true;
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(state.logger);
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Called before `getProps()` has resolved, the context carries
	* `props: null` and is not memoized; the next call after `getProps()`
	* fills in `props` on the same object. Callers that read `props`
	* must await `getProps()` first.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		const apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		if (this.props !== null) this.apiContext = apiContext;
		return apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
// node_modules/@astrojs/internal-helpers/dist/object.js
/**
* Keys that must be rejected when traversing object paths (e.g. dot-separated
* property lookups) to prevent prototype-pollution attacks.
*/
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
// node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
// node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
/** Resolves the actions module from the manifest (a no-op module when none). */
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
/** Looks up a single action handler by its dot-separated path. */
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
// node_modules/astro/dist/actions/runtime/server.js
/**
* Access information about Action requests from middleware.
*/
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				if (error instanceof URIError) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				if (e instanceof SyntaxError) return {
					data: void 0,
					error: new ActionError({
						code: "BAD_REQUEST",
						message: "Invalid JSON request body"
					})
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body;
		if (res.error instanceof ActionInputError) body = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
// node_modules/astro/dist/actions/handler.js
/**
* Handles Astro Action requests in both modes:
*
* - **RPC**: POST requests to `/_actions/<name>` (originating from the
*   generated JS client). Runs the action and returns the serialized result
*   as the response, so the caller can short-circuit rendering.
* - **Form**: POST requests with `?_action=<name>` targeting a page route
*   (originating from an HTML `<form action={actions.foo}>`). Runs the
*   action, stashes the result into `locals._actionPayload`, and returns
*   `undefined` so the caller continues to render the page.
*
* Non-action requests are a no-op (`undefined`).
*
* This handler is invoked at the bottom of the middleware chain, before
* page dispatch. That placement preserves the existing behavior where
* user middleware sees action requests and response finalization (cookies,
* sessions, etc.) runs around the action response.
*
* Expects the APIContext that is already being used by the render pipeline.
* Returns a `Response` when the action fully handles the request (RPC),
* or `undefined` when the caller should continue processing the request
* (form actions or non-action requests).
*/
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
// node_modules/astro/dist/core/routing/3xx.js
/**
* Generates a minimal HTML redirect page used for SSR redirects.
*/
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
// node_modules/astro/dist/core/routing/trailing-slash-handler.js
/**
* Handles trailing-slash normalization for incoming requests. If the
* request's pathname does not match the manifest's configured
* `trailingSlash` policy, a redirect `Response` is returned. Otherwise,
* returns `undefined` so the caller can continue processing the request.
* Paths encoded too many times to decode get a 400 instead of a redirect.
*/
function handleTrailingSlash(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const location = redirect + url.search;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: location,
		absoluteLocation: location,
		from: state.request.url
	}), {
		status,
		headers: { location }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
// node_modules/astro/dist/core/errors/not-found.js
/**
* Renders the 404 error page when no route matched the request, or returns
* `undefined` when a route matched. Returns an empty `400` when the request
* path is over-encoded.
*
* `FetchState` only falls back to an SSR `404.astro`, so this renders a
* prerendered (or absent) custom 404 page: through
* `renderOptions.prerenderedErrorPageFetch` in production, or by rendering
* the page source in dev.
*/
function handleNotFound(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (state.routeData) return;
	return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
}
// node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
/**
* Computes the HTTP status code for a redirect response.
*
* - If the route has a `redirectRoute` and an explicit numeric status, that status is used.
* - Otherwise: GET → 301, non-GET (e.g. POST) → 308.
*/
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
/**
* Resolves the final redirect target URL by substituting dynamic params into
* the redirect string (e.g. `/[slug]/page` → `/hello/page`).
*
* When `redirectRoute` is provided its route generator is used; otherwise params
* are substituted manually into the string redirect target.
*/
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, () => paramValue).replace(`[...${param}]`, () => paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
// node_modules/astro/dist/core/routing/redirect-page.js
/** The delay Astro's built-in redirect page uses for `status`. */
function redirectDelayFor(status) {
	return status === 302 ? 2 : 0;
}
/**
* Renders the project's `src/pages/3xx.astro` as the body of a redirect,
* returning its HTML.
*
* Returns `undefined` when the project has no `3xx.astro`, or when rendering it
* fails — the caller falls back to Astro's built-in redirect page so a broken
* custom page degrades to a working redirect instead of failing the build.
*
* Middleware is skipped: it already ran for the request that produced the
* redirect, and re-running it around a template render would let a middleware
* that redirects recurse.
*/
async function renderRedirectPage(manifest, request, props) {
	const route = getRouteTable(manifest).routes.find((candidate) => isRoute3xx(candidate.route));
	if (!route) return;
	const state = new FetchState(manifest, request);
	try {
		state.skipMiddleware = true;
		state.routeData = route;
		state.pathname = route.route;
		state.status = 200;
		state.componentInstance = await getEnvironment(manifest).getComponentByRoute(manifest, route);
		state.initialProps = { ...props };
		return await (await handleMiddleware(state, handlePages)).text();
	} catch (err) {
		state.logger.error("redirects", `Failed to render \`src/pages/3xx.astro\` for the redirect from \`${props.from}\` to \`${props.to}\`. Falling back to the built-in redirect page.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		return;
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			state.logger.error("redirects", `Failed to finalize the \`src/pages/3xx.astro\` render for the redirect from \`${props.from}\` to \`${props.to}\`.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		}
	}
}
// node_modules/astro/dist/core/routing/handler.js
/**
* Dispatches request logging: through the facade's late-bound
* `logThisRequest` hook when the state was built by `BaseApp.render`'s fast
* path (preserving subclass overrides), else through the environment's
* `logRequest` behavior (dev request lines; prod/build/container no-op).
*/
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
/**
* Runs actions then pages — the callback at the bottom of the middleware
* chain. A module-level function so passing it by reference costs zero
* per-request allocation.
*/
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
/**
* Swaps a bodiless redirect response for one carrying the project's rendered
* `src/pages/3xx.astro`.
*
* Only the build environment opts in (see `RenderEnvironment.rendersRedirectPage`):
* a static site has no `Location` header to follow, so the HTML body is the
* redirect. Responses that already carry a body — the trailing-slash
* normalizer's, or a page that rendered its own — are left alone.
*/
async function withRedirectPageBody(state, response) {
	const status = response.status;
	if (status < 300 || status >= 400 || response.body !== null) return response;
	if (!getEnvironment(state.manifest).rendersRedirectPage()) return response;
	const to = response.headers.get("location");
	if (!to) return response;
	const html = await renderRedirectPage(state.manifest, state.request, {
		from: state.pathname,
		to,
		status,
		delay: redirectDelayFor(status)
	});
	if (html === void 0) return response;
	const headers = new Headers(response.headers);
	if (!headers.has("content-type")) headers.set("content-type", "text/html");
	return new Response(html, {
		status,
		statusText: response.statusText,
		headers
	});
}
/**
* The composite "batteries-included" handler that wires up every request
* feature internally; `astro(state)` (astro/fetch) delegates here, as does
* `BaseApp.render`'s default-handler fast path.
*/
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	const notFoundResponse = handleNotFound(state);
	if (notFoundResponse) return notFoundResponse;
	return render(state);
}
/**
* Renders a response for the given `FetchState`. Assumes trailing-slash
* redirects and routeData resolution have already run.
*
* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
* `executeRewrite` on the current `FetchState` — they mutate the existing
* state in place and re-run middleware + page dispatch.
*/
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await withRedirectPageBody(state, await renderRedirect(state));
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	response = await withRedirectPageBody(state, response);
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
// node_modules/astro/dist/core/fetch/default-handler.js
/**
* The default request handler for `BaseApp`. Stateless: builds the
* per-request `FetchState` from the manifest and delegates to
* `handleRequest`.
*
* The export path (`astro/app/fetch/default-handler`), the class name, and
* no-arg constructibility are baked into generated builds
* (`core/fetch/vite-plugin.ts` emits `new DefaultFetchHandler()`), so all
* three survive.
*/
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
// node_modules/astro/dist/core/routing/match-request.js
/**
* Fully decodes a pathname, falling back to a single decode and then the raw pathname
* when validation fails. Matching runs before `render()`, so it must not throw for
* request input that render-time validation handles.
*/
function safeDecodePathname(manifest, pathname) {
	try {
		return validateAndDecodePathname(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		try {
			return decodeURI(pathname);
		} catch {
			return pathname;
		}
	}
}
/**
* Given a `Request`, returns the `RouteData` that matches its pathname — the
* appless, purely functional body of `BaseApp.match()`. By default, prerendered
* routes aren't returned, even if they are matched; when
* `allowPrerenderedRoutes` is `true`, matched prerendered routes are returned
* too.
*/
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	pathname = safeDecodePathname(manifest, pathname);
	const routeData = matchRoute(manifest, pathname);
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, pathname).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
// node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Fully decodes a pathname, falling back to a single decode and then the raw pathname
	* when validation fails. Adapter matching runs before `render()`, so it must not throw
	* for request input that render-time validation handles.
	*/
	safeDecodePathname(pathname) {
		try {
			return validateAndDecodePathname(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			try {
				return decodeURI(pathname);
			} catch {
				return pathname;
			}
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodePathname(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.manifest.allowedDomains, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodePathname(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
// node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
export { DefaultFetchHandler as n, manifest as r, App as t };
