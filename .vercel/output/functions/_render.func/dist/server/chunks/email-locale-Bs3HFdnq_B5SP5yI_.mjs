import { i as resolveLocale, r as matchLocale } from "./loadMessages-DNBm8IQr_DB5OPNuW.mjs";
// node_modules/emdash/dist/email-locale-Bs3HFdnq.mjs
/**
* Resolve the locale for outbound system emails (invite, magic link,
* recovery). Only resolves the locale string: callers pass in the
* `emdash:locale` option value (batched with their other options
* reads) and use the returned locale to load localized copy from the
* admin catalogs.
*
* Priority: the site-wide `emdash:locale` option (explicit site
* language) -> the requesting user's admin locale (cookie /
* Accept-Language, i.e. the language the inviter works in) -> English.
*/
function resolveEmailLocale(siteLocale, request) {
	if (typeof siteLocale === "string" && siteLocale) {
		const matched = matchLocale(siteLocale);
		if (matched) return matched;
	}
	return resolveLocale(request);
}
export { resolveEmailLocale as t };
