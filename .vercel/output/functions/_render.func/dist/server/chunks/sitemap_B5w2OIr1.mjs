import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as handleSitemapIndexData } from "./seo-ClB-dw9w_B8pIve3p.mjs";
import { o as getSiteSettingsWithDb } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
// node_modules/emdash/dist/astro/routes/sitemap.xml.mjs
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var TRAILING_SLASH_RE = /\/$/;
var AMP_RE = /&/g;
var LT_RE = /</g;
var GT_RE = />/g;
var QUOT_RE = /"/g;
var APOS_RE = /'/g;
var GET = async ({ locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return new Response("<!-- EmDash not configured -->", {
		status: 500,
		headers: { "Content-Type": "application/xml" }
	});
	try {
		const siteUrl = ((await getSiteSettingsWithDb(emdash.db)).url || getPublicOrigin(url, emdash?.config)).replace(TRAILING_SLASH_RE, "");
		const result = await handleSitemapIndexData(emdash.db);
		if (!result.success || !result.data) return new Response("<!-- Failed to generate sitemap -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" }
		});
		const { sitemaps } = result.data;
		const lines = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"];
		for (const sitemap of sitemaps) {
			const suffix = sitemap.page === 1 ? "" : `-${sitemap.page}`;
			const loc = `${siteUrl}/sitemap-${encodeURIComponent(sitemap.collection)}${suffix}.xml`;
			lines.push("  <sitemap>");
			lines.push(`    <loc>${escapeXml(loc)}</loc>`);
			lines.push(`    <lastmod>${escapeXml(sitemap.lastmod)}</lastmod>`);
			lines.push("  </sitemap>");
		}
		lines.push("</sitemapindex>");
		return new Response(lines.join("\n"), {
			status: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600"
			}
		});
	} catch {
		return new Response("<!-- Internal error generating sitemap -->", {
			status: 500,
			headers: { "Content-Type": "application/xml" }
		});
	}
};
/** Escape special XML characters in a string */
function escapeXml(str) {
	return str.replace(AMP_RE, "&amp;").replace(LT_RE, "&lt;").replace(GT_RE, "&gt;").replace(QUOT_RE, "&quot;").replace(APOS_RE, "&apos;");
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/sitemap.xml@_@mjs
var page = () => sitemap_xml_exports;
export { page };
