import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as getConfiguredOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
// node_modules/emdash/dist/site-url-MB685I5X.mjs
var LOOPBACK_HOSTS = /* @__PURE__ */ new Set([
	"localhost",
	"127.0.0.1",
	"[::1]"
]);
/** Sign-in tokens travel in these links, so plain HTTP is only accepted for loopback hosts. */
function siteUrlSettingOrigin(value) {
	if (typeof value !== "string" || !URL.canParse(value)) return void 0;
	const url = new URL(value);
	if (url.protocol === "https:") return url.origin;
	if (url.protocol === "http:" && LOOPBACK_HOSTS.has(url.hostname)) return url.origin;
}
/**
* The site's public origin for outbound links, in the precedence order
* described above. `siteUrlSetting` and `setupUrl` are the stored
* `site:url` and `emdash:site_url` option values.
*/
function resolveSiteOrigin(config, siteUrlSetting, setupUrl) {
	return getConfiguredOrigin(config) ?? siteUrlSettingOrigin(siteUrlSetting) ?? (typeof setupUrl === "string" && setupUrl ? setupUrl : void 0);
}
/**
* The origin chosen for the site: the configured origin, then the **Site URL**.
* Unlike `getSiteBaseUrl`, it never falls back to the origin recorded during
* setup, which may be an address the site has since moved away from.
*/
async function getChosenSiteOrigin(db, config) {
	return getConfiguredOrigin(config) ?? siteUrlSettingOrigin(await new OptionsRepository(db).get("site:url"));
}
async function getSiteBaseUrl(db, request, config) {
	const configured = getConfiguredOrigin(config);
	if (configured) return `${configured}/_emdash`;
	const stored = await new OptionsRepository(db).getMany(["site:url", "emdash:site_url"]);
	const storedUrl = resolveSiteOrigin(config, stored.get("site:url"), stored.get("emdash:site_url"));
	if (storedUrl) return `${storedUrl}/_emdash`;
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}/_emdash`;
}
export { getSiteBaseUrl as n, resolveSiteOrigin as r, getChosenSiteOrigin as t };
