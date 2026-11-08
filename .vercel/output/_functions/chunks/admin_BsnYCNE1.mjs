import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { S as addAttribute, h as renderHead, o as renderComponent, p as renderTemplate } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { a as componentDataByCssVariable, i as $$Font, s as createAstro } from "./_astro_assets_CXULl6hB.mjs";
import { i as resolveLocale, n as getLocaleDir, t as loadMessages } from "./loadMessages-DNBm8IQr_DB5OPNuW.mjs";
import "./locales_BQs6oPWQ.mjs";
import { n as getSiteSettingsWithDb } from "./settings_BfNRruVz.mjs";
// node_modules/@emdash-cms/admin/dist/styles.css?url
var styles_default = "/_astro/styles.CUsjoeGg.css";
// node_modules/emdash/src/astro/routes/admin.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Admin,
	file: () => $$file,
	prerender: () => false,
	url: () => void 0
});
createAstro("https://astro.build");
var $$Admin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const resolvedLocale = resolveLocale(Astro.request);
	const resolvedDir = getLocaleDir(resolvedLocale);
	const messages = await loadMessages(resolvedLocale);
	const adminConfig = Astro.locals.emdash?.config?.admin;
	const pageTitle = adminConfig?.siteName ? `${adminConfig.siteName} Admin` : "EmDash Admin";
	Astro.response.headers.set("Cache-Control", "private, no-store");
	const emdash = Astro.locals.emdash;
	let siteFavicon;
	let siteFaviconType;
	if (!adminConfig?.favicon && emdash?.db) try {
		const settings = await getSiteSettingsWithDb(emdash.db, emdash.storage ?? null);
		siteFavicon = settings.favicon?.url ?? void 0;
		siteFaviconType = settings.favicon?.contentType ?? void 0;
	} catch {}
	const favicon = adminConfig?.favicon ?? siteFavicon;
	const faviconType = adminConfig?.favicon ? void 0 : siteFaviconType;
	return renderTemplate`<html${addAttribute(resolvedLocale, "lang")}${addAttribute(resolvedDir, "dir")} data-theme="classic" data-astro-cid-u6fdjxxc><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script>
			(() => {
				let preference = "system";

				try {
					const storedPreference = localStorage.getItem("emdash-theme");
					if (storedPreference === "light" || storedPreference === "dark") {
						preference = storedPreference;
					}
				} catch {
					// Storage can be unavailable in privacy-restricted contexts. Use the system theme.
				}

				const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				const mode =
					preference === "dark" || (preference === "system" && prefersDark) ? "dark" : "light";
				document.documentElement.setAttribute("data-mode", mode);
			})();
		<\/script><link rel="stylesheet"${addAttribute(styles_default, "href")}>${componentDataByCssVariable.has("--font-emdash") ? renderTemplate`${renderComponent($$result, "Font", $$Font, {
		"cssVariable": "--font-emdash",
		"data-astro-cid-u6fdjxxc": true
	})}` : null}${favicon ? renderTemplate`<link rel="icon"${addAttribute(favicon, "href")}${addAttribute(faviconType, "type")}>` : renderTemplate`<link rel="icon" href="data:image/svg+xml,&lt;svg width='75' height='75' viewBox='0 0 75 75' fill='none' xmlns='http://www.w3.org/2000/svg'&gt; &lt;g clip-path='url(%23clip0_50_99)'&gt; &lt;rect x='3' y='3' width='69' height='69' rx='10.518' stroke='url(%23paint0_linear_50_99)' stroke-width='6'/&gt; &lt;rect x='18' y='34' width='39.3661' height='6.56101' fill='url(%23paint1_linear_50_99)'/&gt; &lt;/g&gt; &lt;defs&gt; &lt;linearGradient id='paint0_linear_50_99' x1='-42.9996' y1='124' x2='92.4233' y2='-41.7456' gradientUnits='userSpaceOnUse'&gt; &lt;stop stop-color='%230F006B'/&gt; &lt;stop offset='0.0833333' stop-color='%23281A81'/&gt; &lt;stop offset='0.166667' stop-color='%235D0C83'/&gt; &lt;stop offset='0.25' stop-color='%23911475'/&gt; &lt;stop offset='0.333333' stop-color='%23CE2F55'/&gt; &lt;stop offset='0.416667' stop-color='%23FF6633'/&gt; &lt;stop offset='0.5' stop-color='%23F6821F'/&gt; &lt;stop offset='0.583333' stop-color='%23FBAD41'/&gt; &lt;stop offset='0.666667' stop-color='%23FFCD89'/&gt; &lt;stop offset='0.75' stop-color='%23FFE9CB'/&gt; &lt;stop offset='0.833333' stop-color='%23FFF7EC'/&gt; &lt;stop offset='0.916667' stop-color='%23FFF8EE'/&gt; &lt;stop offset='1' stop-color='white'/&gt; &lt;/linearGradient&gt; &lt;linearGradient id='paint1_linear_50_99' x1='91.4992' y1='27.4982' x2='28.1217' y2='54.1775' gradientUnits='userSpaceOnUse'&gt; &lt;stop stop-color='white'/&gt; &lt;stop offset='0.129253' stop-color='%23FFF8EE'/&gt; &lt;stop offset='0.617058' stop-color='%23FBAD41'/&gt; &lt;stop offset='0.848019' stop-color='%23F6821F'/&gt; &lt;stop offset='1' stop-color='%23FF6633'/&gt; &lt;/linearGradient&gt; &lt;clipPath id='clip0_50_99'&gt; &lt;rect width='75' height='75' fill='white'/&gt; &lt;/clipPath&gt; &lt;/defs&gt; &lt;/svg&gt;">`}<title>${pageTitle}</title>${renderHead($$result)}</head><body class="isolate" data-astro-cid-u6fdjxxc><div id="admin-root" class="min-h-screen" data-astro-cid-u6fdjxxc><div id="emdash-boot-loader" data-astro-cid-u6fdjxxc><div class="loader-inner" data-astro-cid-u6fdjxxc><div class="spinner" data-astro-cid-u6fdjxxc></div><p data-astro-cid-u6fdjxxc>${adminConfig?.siteName ? `Loading ${adminConfig.siteName}...` : "Loading EmDash..."}</p></div></div>${renderComponent($$result, "AdminWrapper", null, {
		"client:only": "react",
		"locale": resolvedLocale,
		"messages": messages,
		"adminBranding": {
			logo: adminConfig?.logo,
			siteName: adminConfig?.siteName
		},
		"data-astro-cid-u6fdjxxc": true,
		"client:component-hydration": "only",
		"client:component-path": "emdash/internal/routes/PluginRegistry",
		"client:component-export": "default"
	})}</div></body></html>`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/astro/routes/admin.astro", void 0);
var $$file = "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/astro/routes/admin.astro";
// \0virtual:astro:page:node_modules/emdash/src/astro/routes/admin@_@astro
var page = () => admin_exports;
export { page };
