import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { S as addAttribute, m as maybeRenderHead, o as renderComponent, p as renderTemplate, t as spreadAttributes } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { s as createAstro } from "./_astro_assets_CXULl6hB.mjs";
import { n as $$EmDashImage, t as $$Base } from "./Base_EYwuSYtf.mjs";
import { n as loadPieces, t as isFlagOn } from "./content_DKYdtM5Y.mjs";
// src/pages/gallery.astro
var gallery_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gallery,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const { entries, cacheHints, error } = await loadPieces();
	for (const hint of cacheHints) if (Astro.cache?.enabled) Astro.cache.set(hint);
	const pieces = error ? [] : entries.filter((entry) => isFlagOn(entry.data.finished_piece) && entry.data.image?.id);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Gallery — Three Story Studio" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container mx-auto columns-1 sm:columns-2 lg:columns-4 gap-8 max-w-6xl px-10 mb-12">${pieces.map((piece, index) => {
		const image = piece.data.image;
		const width = image?.width;
		const height = image?.height;
		const projectSlug = typeof piece.data.project_slug === "string" ? piece.data.project_slug : "";
		const frame = {
			class: "cover-frame mb-4 break-inside-avoid group relative [content-visibility:auto] [contain-intrinsic-size:480px]",
			style: width && height ? `aspect-ratio: ${width} / ${height}` : void 0
		};
		const photo = renderTemplate`${renderComponent($$result, "Image", $$EmDashImage, {
			"image": image,
			"priority": index === 0,
			"loading": index < 4 ? "eager" : "lazy",
			"fetchpriority": index === 0 ? "high" : void 0,
			"sizes": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
			"class": "object-cover",
			"alt": image?.alt || piece.data.title
		})}`;
		return projectSlug ? renderTemplate`<div${spreadAttributes(frame)}><a${addAttribute(`/projects/${projectSlug}`, "href")} class="block relative h-full">${photo}<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"><span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-4 py-2 rounded-md font-medium">View More</span></div></a></div>` : renderTemplate`<div${spreadAttributes(frame)}>${photo}</div>`;
	})}</div>${pieces.length === 0 && renderTemplate`<p class="max-w-3xl mx-auto px-10 pb-16 text-xl">Finished pieces will show up here once they are added in the studio admin.</p>`}` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/src/pages/gallery.astro", void 0);
var $$file = "/Users/cjdunteman/repos/three-story-studio/src/pages/gallery.astro";
var $$url = "/gallery";
// \0virtual:astro:page:src/pages/gallery@_@astro
var page = () => gallery_exports;
export { page };
