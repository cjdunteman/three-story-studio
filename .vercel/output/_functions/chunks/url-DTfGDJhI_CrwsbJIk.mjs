// node_modules/emdash/dist/url-DTfGDJhI.mjs
/**
* URL scheme validation utilities
*
* Prevents XSS via dangerous URL schemes (javascript:, data:, vbscript:, etc.)
* by allowlisting known-safe schemes before rendering into href attributes.
*/
/**
* Matches URLs that are safe to render in href attributes.
*
* Allowed:
* - http:// and https://
* - mailto: and tel:
* - Relative paths (starting with /)
* - Fragment links (starting with #)
* - Protocol-relative URLs are NOT allowed (starting with //) as they can
*   redirect to attacker-controlled hosts.
*/
var SAFE_ABSOLUTE_URL_RE = /^(https?:|mailto:|tel:)/i;
var SITE_RELATIVE_HREF_RE = /^(\/(?![/\\])|#)/;
var URL_SCHEME_RE = /^([a-z][a-z0-9+.-]*):/i;
var URL_BASE = new URL("https://emdash.invalid/");
function containsHrefControl(value) {
	for (const character of value) {
		const codePoint = character.codePointAt(0);
		if (codePoint !== void 0 && (codePoint <= 31 || codePoint === 127)) return true;
	}
	return false;
}
function resolvesOnSite(value) {
	try {
		return new URL(value, URL_BASE).origin === URL_BASE.origin;
	} catch {
		return false;
	}
}
/**
* Returns the URL unchanged if it uses a safe scheme, otherwise returns "#".
*
* Use this at the render layer as the primary defense against XSS via
* dangerous URL schemes like `javascript:`, `data:`, or `vbscript:`.
*
* @example
* ```ts
* sanitizeHref("https://example.com")        // "https://example.com"
* sanitizeHref("/about")                      // "/about"
* sanitizeHref("#section")                    // "#section"
* sanitizeHref("mailto:a@b.com")              // "mailto:a@b.com"
* sanitizeHref("javascript:alert(1)")         // "#"
* sanitizeHref("data:text/html,<script>")     // "#"
* sanitizeHref("")                            // "#"
* ```
*/
function sanitizeHref(url) {
	if (!url) return "#";
	return isSafeHref(url) ? url : "#";
}
/**
* Returns true if the URL uses a safe scheme for rendering in href attributes.
*/
function isSafeHref(url) {
	if (containsHrefControl(url)) return false;
	if (SAFE_ABSOLUTE_URL_RE.test(url)) return URL.canParse(url);
	return SITE_RELATIVE_HREF_RE.test(url) && resolvesOnSite(url);
}
var ALLOWED_URL_SCHEMES = /* @__PURE__ */ new Set([
	"http",
	"https",
	"mailto",
	"tel"
]);
/**
* Returns true if the value names a URL scheme other than http, https,
* mailto, or tel, as a browser would resolve it in an href.
*/
function hasUnsafeUrlScheme(value) {
	const stripped = value.replace(/[\t\n\r]/g, "").trimStart();
	const scheme = URL_SCHEME_RE.exec(stripped)?.[1];
	return scheme !== void 0 && !ALLOWED_URL_SCHEMES.has(scheme.toLowerCase());
}
/**
* Returns true when a repository write may keep the value. Repository callers
* preserve legacy scheme-less values, but reject anything a browser resolves
* off-site or to a script-capable scheme.
*/
function isSafeUrlFieldWriteValue(value) {
	if (containsHrefControl(value) || hasUnsafeUrlScheme(value)) return false;
	const candidate = value.trimStart();
	const scheme = URL_SCHEME_RE.exec(candidate)?.[1];
	if (scheme !== void 0) return ALLOWED_URL_SCHEMES.has(scheme.toLowerCase());
	return resolvesOnSite(candidate);
}
/**
* Returns true if the value may be stored in a `url` content field: a safe
* href per {@link isSafeHref} that is either site-relative or a parseable
* absolute URL.
*/
function isSafeUrlFieldValue(value) {
	return isSafeHref(value);
}
export { sanitizeHref as i, isSafeUrlFieldValue as n, isSafeUrlFieldWriteValue as r, isSafeHref as t };
