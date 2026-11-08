import { A as MissingGetFontFileRequestUrl, Q as UnavailableAstroGlobal, d as FontFamilyNotFound, rt as AstroError, v as ImageMissingAlt } from "./errors-data_BZ8TGgRd.mjs";
import { A as ASTRO_GENERATOR, S as addAttribute, m as maybeRenderHead, o as renderComponent, p as renderTemplate, t as spreadAttributes, w as unescapeHTML } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { t as createConsoleLogger } from "./console_Cc8F-PUH.mjs";
import { t as level } from "./_virtual_astro_logger_BFnT1nSb.mjs";
import { n as getImage$1, t as getConfiguredImageService$1 } from "./assets_Bmh5uWIC.mjs";
import "./service_EhNdzXh1.mjs";
import "mrmime";
// node_modules/astro/dist/runtime/server/astro-global.js
function createError(name) {
	return new AstroError({
		...UnavailableAstroGlobal,
		message: UnavailableAstroGlobal.message(name)
	});
}
function createAstro(site) {
	return {
		get site() {
			console.warn(`Astro.site inside getStaticPaths is deprecated and will be removed in a future major version of Astro. Use import.meta.env.SITE instead`);
			return site ? new URL(site) : void 0;
		},
		get generator() {
			console.warn(`Astro.generator inside getStaticPaths is deprecated and will be removed in a future major version of Astro.`);
			return ASTRO_GENERATOR;
		},
		get callAction() {
			throw createError("callAction");
		},
		get clientAddress() {
			throw createError("clientAddress");
		},
		get cookies() {
			throw createError("cookies");
		},
		get csp() {
			throw createError("csp");
		},
		get currentLocale() {
			throw createError("currentLocale");
		},
		get getActionResult() {
			throw createError("getActionResult");
		},
		get isPrerendered() {
			throw createError("isPrerendered");
		},
		get locals() {
			throw createError("locals");
		},
		get originPathname() {
			throw createError("originPathname");
		},
		get params() {
			throw createError("params");
		},
		get preferredLocale() {
			throw createError("preferredLocale");
		},
		get preferredLocaleList() {
			throw createError("preferredLocaleList");
		},
		get props() {
			throw createError("props");
		},
		get redirect() {
			throw createError("redirect");
		},
		get request() {
			throw createError("request");
		},
		get response() {
			throw createError("response");
		},
		get rewrite() {
			throw createError("rewrite");
		},
		get routePattern() {
			throw createError("routePattern");
		},
		get self() {
			throw createError("self");
		},
		get slots() {
			throw createError("slots");
		},
		get url() {
			throw createError("url");
		},
		get session() {
			throw createError("session");
		},
		get cache() {
			throw createError("cache");
		},
		get logger() {
			throw createError("logger");
		}
	};
}
var $$Image = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Image;
	const props = Astro.props;
	if (props.alt === void 0 || props.alt === null) throw new AstroError(ImageMissingAlt);
	if (typeof props.width === "string") props.width = Number.parseInt(props.width);
	if (typeof props.height === "string") props.height = Number.parseInt(props.height);
	const layout = props.layout ?? imageConfig.layout ?? "none";
	if (layout !== "none") {
		props.layout ??= layout;
		props.fit ??= imageConfig.objectFit ?? "cover";
		props.position ??= imageConfig.objectPosition ?? "center";
	} else if (imageConfig.objectFit || imageConfig.objectPosition) {
		if (imageConfig.objectFit) props.fit ??= imageConfig.objectFit;
		if (imageConfig.objectPosition) props.position ??= imageConfig.objectPosition;
	}
	const image = await getImage(props);
	const additionalAttributes = {};
	if (image.srcSet.values.length > 0) additionalAttributes.srcset = image.srcSet.attribute;
	const { class: className, ...attributes } = {
		...additionalAttributes,
		...image.attributes
	};
	return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/astro/components/Image.astro", void 0);
var $$ResponsiveImage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResponsiveImage;
	const { class: className, ...props } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Image", $$Image, {
		...props,
		"class": className
	})}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/astro/components/ResponsiveImage.astro", void 0);
// \0virtual:astro:assets/fonts/internal
var componentDataByCssVariable = /* @__PURE__ */ new Map([["--font-emdash", {
	"preloads": [
		{
			"style": "italic",
			"subset": "cyrillic-ext",
			"type": "woff2",
			"url": "/_astro/fonts/08f0ea18cdf1ae81.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "cyrillic",
			"type": "woff2",
			"url": "/_astro/fonts/9593fbb8383eb01c.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "devanagari",
			"type": "woff2",
			"url": "/_astro/fonts/cced06053f87829e.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "greek-ext",
			"type": "woff2",
			"url": "/_astro/fonts/a9bea187e846fcc2.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "greek",
			"type": "woff2",
			"url": "/_astro/fonts/84070159564df0be.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "vietnamese",
			"type": "woff2",
			"url": "/_astro/fonts/d581d51cd793384e.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "latin-ext",
			"type": "woff2",
			"url": "/_astro/fonts/190f8cf059e0f931.woff2",
			"weight": "100 900"
		},
		{
			"style": "italic",
			"subset": "latin",
			"type": "woff2",
			"url": "/_astro/fonts/1d7aab50fda97bb3.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "cyrillic-ext",
			"type": "woff2",
			"url": "/_astro/fonts/81fc65a9fa1b7533.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "cyrillic",
			"type": "woff2",
			"url": "/_astro/fonts/1633c6c006fb5995.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "devanagari",
			"type": "woff2",
			"url": "/_astro/fonts/f52e1d65e1364c61.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "greek-ext",
			"type": "woff2",
			"url": "/_astro/fonts/63342f4e10d096aa.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "greek",
			"type": "woff2",
			"url": "/_astro/fonts/a582ec5275b6220a.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "vietnamese",
			"type": "woff2",
			"url": "/_astro/fonts/6ed39b447c70fac7.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "latin-ext",
			"type": "woff2",
			"url": "/_astro/fonts/ad35ff1453ab1728.woff2",
			"weight": "100 900"
		},
		{
			"style": "normal",
			"subset": "latin",
			"type": "woff2",
			"url": "/_astro/fonts/1e5097bbf9c9d577.woff2",
			"weight": "100 900"
		}
	],
	"css": "@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/08f0ea18cdf1ae81.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/9593fbb8383eb01c.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/cced06053f87829e.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0900-097F,U+1CD0-1CF4,U+1CF7-1CF9,U+200C-200D,U+20A8,U+20B9,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF,U+11B00-11B0A;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/a9bea187e846fcc2.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+1F00-1FFF;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/84070159564df0be.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/d581d51cd793384e.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/190f8cf059e0f931.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/1d7aab50fda97bb3.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:100 900;font-style:italic;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/81fc65a9fa1b7533.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/1633c6c006fb5995.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/f52e1d65e1364c61.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0900-097F,U+1CD0-1CF4,U+1CF7-1CF9,U+200C-200D,U+20A8,U+20B9,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF,U+11B00-11B0A;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/63342f4e10d096aa.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+1F00-1FFF;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/a582ec5275b6220a.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/6ed39b447c70fac7.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/ad35ff1453ab1728.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3\";src:url(\"/_astro/fonts/1e5097bbf9c9d577.woff2\") format(\"woff2\");font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:100 900;font-style:normal;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:italic;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}@font-face{font-family:\"Noto Sans-ada45c26760e80a3 fallback: Arial\";src:local(\"Arial\");font-display:swap;font-weight:100 900;font-style:normal;size-adjust:122.9249%;ascent-override:86.9637%;descent-override:23.8357%;line-gap-override:0%;}:root{--font-emdash:\"Noto Sans-ada45c26760e80a3\",\"Noto Sans-ada45c26760e80a3 fallback: Arial\",ui-sans-serif,system-ui,sans-serif;}"
}]]);
// node_modules/astro/dist/assets/fonts/core/filter-preloads.js
function filterPreloads(data, preload) {
	if (!preload) return null;
	if (preload === true) return data;
	return data.filter(({ weight, style, subset }) => preload.some((p) => {
		if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) return false;
		if (p.style !== void 0 && p.style !== style) return false;
		if (p.subset !== void 0 && p.subset !== subset) return false;
		return true;
	}));
}
function checkWeight(input, target) {
	const trimmedInput = input.trim();
	if (trimmedInput.includes(" ")) return trimmedInput === target;
	if (target.includes(" ")) {
		const [a, b] = target.split(" ");
		const parsedInput = Number.parseInt(input);
		return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
	}
	return input === target;
}
var $$Font = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Font;
	const { cssVariable, preload = false } = Astro.props;
	const data = componentDataByCssVariable.get(cssVariable);
	if (!data) throw new AstroError({
		...FontFamilyNotFound,
		message: FontFamilyNotFound.message(cssVariable)
	});
	const filteredPreloadData = filterPreloads(data.preloads, preload);
	return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/astro/components/Font.astro", void 0);
// node_modules/astro/dist/assets/fonts/infra/ssr-runtime-font-file-url-resolver.js
/**
* During SSR, we don't know ahead of time where the server is located.
* We rely on `requestUrl` (provided by the user) to construct the URL.
*/
var SsrRuntimeFontFileUrlResolver = class {
	#urls;
	constructor({ urls }) {
		this.#urls = urls;
	}
	resolve(url, requestUrl) {
		if (!this.#urls.has(url)) return null;
		if (!url.startsWith("/")) return url;
		if (!requestUrl) throw new AstroError(MissingGetFontFileRequestUrl);
		return `${requestUrl.origin}${url}`;
	}
};
new SsrRuntimeFontFileUrlResolver({ urls: /* @__PURE__ */ new Set([
	"/_astro/fonts/08f0ea18cdf1ae81.woff2",
	"/_astro/fonts/9593fbb8383eb01c.woff2",
	"/_astro/fonts/cced06053f87829e.woff2",
	"/_astro/fonts/a9bea187e846fcc2.woff2",
	"/_astro/fonts/84070159564df0be.woff2",
	"/_astro/fonts/d581d51cd793384e.woff2",
	"/_astro/fonts/190f8cf059e0f931.woff2",
	"/_astro/fonts/1d7aab50fda97bb3.woff2",
	"/_astro/fonts/81fc65a9fa1b7533.woff2",
	"/_astro/fonts/1633c6c006fb5995.woff2",
	"/_astro/fonts/f52e1d65e1364c61.woff2",
	"/_astro/fonts/63342f4e10d096aa.woff2",
	"/_astro/fonts/a582ec5275b6220a.woff2",
	"/_astro/fonts/6ed39b447c70fac7.woff2",
	"/_astro/fonts/ad35ff1453ab1728.woff2",
	"/_astro/fonts/1e5097bbf9c9d577.woff2"
]) });
// \0astro:assets
var _astroLogger = createConsoleLogger({ level });
var _runtimeLogger = {
	info: (message) => _astroLogger.info(null, message),
	warn: (message) => _astroLogger.warn(null, message),
	error: (message) => _astroLogger.error(null, message)
};
var getConfiguredImageService = getConfiguredImageService$1;
var imageConfig = {
	"endpoint": {
		"entrypoint": "emdash/internal/image-endpoint",
		"route": "/_image"
	},
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": [],
	"remotePatterns": [],
	"layout": "constrained",
	"responsiveStyles": true
};
Object.defineProperties(imageConfig, {
	assetQueryParams: {
		value: void 0,
		enumerable: false,
		configurable: true
	},
	staticImageConfig: {
		value: {
			"base": "/",
			"assetsDir": "_astro"
		},
		enumerable: false,
		configurable: true
	}
});
var getImage = async (options) => await getImage$1(options, imageConfig, _runtimeLogger);
export { componentDataByCssVariable as a, $$Font as i, getImage as n, $$ResponsiveImage as o, imageConfig as r, createAstro as s, getConfiguredImageService as t };
