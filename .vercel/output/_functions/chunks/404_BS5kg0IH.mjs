import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { m as maybeRenderHead, o as renderComponent, p as renderTemplate } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import "./_astro_assets_CXULl6hB.mjs";
import { t as $$Base } from "./Base_EYwuSYtf.mjs";
// src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Page not found — Three Story Studio" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-3xl mx-auto px-6 py-16"><h1 class="text-3xl font-bold mb-4">Page not found</h1><p class="text-xl mb-6">That page is not on the site.</p><a href="/" class="text-xl underline">Back home</a></div>` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/src/pages/404.astro", void 0);
var $$file = "/Users/cjdunteman/repos/three-story-studio/src/pages/404.astro";
var $$url = "/404";
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };
