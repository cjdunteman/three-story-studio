import { r as manifest } from "./app_CtIBKZHm.mjs";
import "./console_Cc8F-PUH.mjs";
import "./sequence_CGsNBl3C.mjs";
// node_modules/astro/dist/core/app/common.js
var PREFIX_DEFAULT_LOCALE = /* @__PURE__ */ new Set([
	"pathname-prefix-always",
	"domains-prefix-always",
	"pathname-prefix-always-no-redirect",
	"domains-prefix-always-no-redirect"
]);
var REDIRECT_TO_DEFAULT_LOCALE = /* @__PURE__ */ new Set(["pathname-prefix-always-no-redirect", "domains-prefix-always-no-redirect"]);
function fromRoutingStrategy(strategy, fallbackType) {
	let routing;
	if (strategy === "manual") routing = "manual";
	else routing = {
		prefixDefaultLocale: PREFIX_DEFAULT_LOCALE.has(strategy),
		redirectToDefaultLocale: !REDIRECT_TO_DEFAULT_LOCALE.has(strategy),
		fallbackType
	};
	return routing;
}
// \0astro:config/server
var i18n = void 0;
if (manifest.i18n) i18n = {
	defaultLocale: manifest.i18n.defaultLocale,
	locales: manifest.i18n.locales,
	routing: fromRoutingStrategy(manifest.i18n.strategy, manifest.i18n.fallbackType),
	fallback: manifest.i18n.fallback,
	domains: manifest.i18n.domains
};
if (manifest.image) manifest.image.objectFit, manifest.image.objectPosition, manifest.image.layout;
manifest.base;
new URL("file:///Users/cjdunteman/repos/three-story-studio/dist/server/"), new URL("file:///Users/cjdunteman/repos/three-story-studio/dist/client/");
new URL(manifest.cacheDir);
new URL(manifest.outDir);
new URL(manifest.publicDir);
new URL(manifest.srcDir);
new URL(manifest.rootDir);
manifest.trailingSlash;
manifest.site;
manifest.compressHTML;
export { i18n };
