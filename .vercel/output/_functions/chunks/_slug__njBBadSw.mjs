import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { m as maybeRenderHead, o as renderComponent, p as renderTemplate } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { s as createAstro } from "./_astro_assets_CXULl6hB.mjs";
import { n as $$EmDashImage, t as $$Base } from "./Base_EYwuSYtf.mjs";
import { n as loadPieces, r as loadProject } from "./content_DKYdtM5Y.mjs";
// src/pages/projects/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = Astro.params.slug;
	if (!slug) return Astro.rewrite("/404");
	const projectResult = await loadProject(slug);
	if (projectResult.cacheHint && Astro.cache?.enabled) Astro.cache.set(projectResult.cacheHint);
	if (!projectResult.entry) return Astro.rewrite("/404");
	if ("redirectTo" in projectResult && projectResult.redirectTo) return Astro.redirect(projectResult.redirectTo, 301);
	const project = projectResult.entry;
	const { entries, cacheHints } = await loadPieces();
	for (const hint of cacheHints) if (Astro.cache?.enabled) Astro.cache.set(hint);
	const images = entries.filter((entry) => entry.data.project_slug === project.data.slug && entry.data.image?.id);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `${project.data.title} — Three Story Studio` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container mx-auto max-w-6xl px-4 py-8"><h1 class="text-3xl font-bold mb-8">${project.data.title}</h1><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${images.map((piece) => renderTemplate`<div class="break-inside-avoid">${renderComponent($$result, "Image", $$EmDashImage, {
		"image": piece.data.image,
		"alt": piece.data.image?.alt || piece.data.title,
		"class": "w-full object-cover",
		"sizes": "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
	})}</div>`)}</div></div>` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/src/pages/projects/[slug].astro", void 0);
var $$file = "/Users/cjdunteman/repos/three-story-studio/src/pages/projects/[slug].astro";
var $$url = "/projects/[slug]";
// \0virtual:astro:page:src/pages/projects/[slug]@_@astro
var page = () => _slug__exports;
export { page };
