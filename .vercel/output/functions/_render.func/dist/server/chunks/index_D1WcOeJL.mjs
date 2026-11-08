import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { m as maybeRenderHead, o as renderComponent, p as renderTemplate } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { s as createAstro } from "./_astro_assets_CXULl6hB.mjs";
import { n as $$EmDashImage, t as $$Base } from "./Base_EYwuSYtf.mjs";
import { n as loadPieces, t as isFlagOn } from "./content_DKYdtM5Y.mjs";
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { entries, cacheHints, error } = await loadPieces();
	for (const hint of cacheHints) if (Astro.cache?.enabled) Astro.cache.set(hint);
	const slides = error ? [] : entries.filter((entry) => isFlagOn(entry.data.show_on_home) && entry.data.image?.id);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div><div class="w-11/12 mx-auto flex flex-col items-center mb-8"><h1 class="font-script text-3xl mb-16 border-b-2 text-center md:text-4xl lg:text-5xl">Custom upholstery & soft goods for your home</h1><div class="flex justify-center w-full"><div class="flex overflow-x-auto max-w-7xl scrollbar-hide px-4 md:px-10 gap-4 snap-x snap-mandatory items-center">${slides.map((piece, index) => renderTemplate`<div class="cover-frame relative min-w-[300px] h-[400px] flex-shrink-0 snap-center">${renderComponent($$result, "Image", $$EmDashImage, {
		"image": piece.data.image,
		"priority": index === 0,
		"loading": index === 0 ? "eager" : "lazy",
		"fetchpriority": index === 0 ? "high" : "low",
		"sizes": "(min-width: 808px) 300px, 100vw",
		"class": "rounded-lg shadow-md",
		"alt": piece.data.image?.alt || piece.data.title
	})}</div>`)}</div></div></div><section class="py-20 bg-taupe px-8"><div class="max-w-4xl mx-auto"><p class="text-2xl">WELCOME TO MY STUDIO</p><p class="font-script text-2xl pb-8">Proudly located in Sussex, Wisconsin</p><p class="text-xl md:text-2xl">Hello and welcome!</p><br><p class="text-xl md:text-2xl">My name is Kristin and I'm glad you stopped by. A well-loved home reflects your own personal style and history. It is your story to tell. I enjoy collaborating with people to help make that happen.</p><br><p class="text-xl md:text-2xl">Bespoke furniture upholstery and various types of custom-made soft goods are my specialty. High quality craftsmanship, attention to detail and individual style are the basis of my trade.</p><br><p class="text-xl md:text-2xl">Drop me a line and I'd be happy to speak with you about your specific project needs/ideas. Hope to meet you soon!</p></div></section></div>` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/src/pages/index.astro", void 0);
var $$file = "/Users/cjdunteman/repos/three-story-studio/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
