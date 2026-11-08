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
import { o as getSiteSettingsWithDb } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
// node_modules/emdash/dist/astro/routes/robots.txt.mjs
var robots_txt_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var TRAILING_SLASH_RE = /\/$/;
/**
* `Content-Signal` is not a rule, so the empty `Disallow:` is what closes the
* `*` group; without a rule, crawlers merge it with the next group and apply
* `Disallow: /` to everyone.
*/
var AI_TRAINING_RULES = [
	"# Disallow AI training",
	"User-agent: *",
	"Content-Signal: search=yes, ai-train=no",
	"Disallow:",
	...[
		"Amazonbot",
		"Applebot-Extended",
		"Bytespider",
		"CCBot",
		"ClaudeBot",
		"Google-Extended",
		"GPTBot",
		"meta-externalagent"
	].flatMap((agent) => [
		"",
		`User-agent: ${agent}`,
		"Disallow: /"
	])
].join("\n");
var GET = async ({ locals, url }) => {
	const { emdash } = locals;
	if (!emdash?.db) return new Response("User-agent: *\nAllow: /\n", {
		status: 200,
		headers: { "Content-Type": "text/plain; charset=utf-8" }
	});
	try {
		const settings = await getSiteSettingsWithDb(emdash.db);
		const sitemapUrl = `${(settings.url || getPublicOrigin(url, emdash?.config)).replace(TRAILING_SLASH_RE, "")}/sitemap.xml`;
		const disallowAiTraining = settings.seo?.disallowAiTraining === true;
		if (settings.seo?.robotsTxt) {
			let content = settings.seo.robotsTxt;
			if (disallowAiTraining) content = `${content.trimEnd()}\n\n${AI_TRAINING_RULES}\n`;
			if (!content.toLowerCase().includes("sitemap:")) content = `${content.trimEnd()}\n\nSitemap: ${sitemapUrl}\n`;
			return new Response(content, {
				status: 200,
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"Cache-Control": "public, max-age=86400"
				}
			});
		}
		const defaultRobots = [
			"User-agent: *",
			"Allow: /",
			"",
			"# Disallow admin and API routes",
			"Disallow: /_emdash/",
			"",
			...disallowAiTraining ? [AI_TRAINING_RULES, ""] : [],
			`Sitemap: ${sitemapUrl}`,
			""
		].join("\n");
		return new Response(defaultRobots, {
			status: 200,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "public, max-age=86400"
			}
		});
	} catch {
		return new Response("User-agent: *\nAllow: /\n", {
			status: 200,
			headers: { "Content-Type": "text/plain; charset=utf-8" }
		});
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/robots.txt@_@mjs
var page = () => robots_txt_exports;
export { page };
