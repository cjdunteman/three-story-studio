import { b as resolveConfiguredLocale, m as getI18nConfig, p as getFallbackChain, v as isI18nEnabled } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { i as getRequestContext } from "./after-32yNRvd2_BC9LTfYL.mjs";
// node_modules/emdash/dist/resolve-DdNXBJSr.mjs
/**
* Shared locale-resolution helpers.
*
* Matches the pattern used by `query.ts` for content: an explicit locale wins,
* otherwise we fall back to the request-context locale, otherwise to
* `defaultLocale` when i18n is enabled, otherwise to `undefined` (meaning "do
* not filter by locale" — legacy single-locale behaviour).
*/
/**
* Resolve the locale to use for a query given an optional explicit value.
* Returns `undefined` when no locale information is available; callers should
* treat that as "do not filter by locale".
*/
function resolveLocale(explicit) {
	if (explicit !== void 0) return resolveConfiguredLocale(explicit);
	const ctxLocale = getRequestContext()?.locale;
	if (ctxLocale !== void 0) return resolveConfiguredLocale(ctxLocale);
	const cfg = getI18nConfig();
	if (cfg && isI18nEnabled()) return cfg.defaultLocale;
}
/**
* Fallback chain to try when looking up a single item. When i18n is disabled
* or the locale is unspecified, returns a single-element array (or empty when
* no locale resolves) so callers can iterate uniformly.
*/
function resolveLocaleChain(explicit) {
	const locale = resolveLocale(explicit);
	if (locale === void 0) return [];
	if (!isI18nEnabled()) return [locale];
	return getFallbackChain(locale);
}
var REPEATED_SLASHES = /\/{2,}/g;
var TRAILING_SLASH = /\/$/;
var DATE_TOKEN = /\{(year|month|day|hour|minute|second)\}/g;
var OFFSETLESS_DATETIME = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)$/;
var pad2 = (n) => String(n).padStart(2, "0");
function parseUtcDate(date) {
	if (date instanceof Date) return date;
	const offsetless = OFFSETLESS_DATETIME.exec(date);
	return new Date(offsetless ? `${offsetless[1]}T${offsetless[2]}Z` : date);
}
/**
* Substitute WordPress-style date tokens (`{year}`, `{month}`, `{day}`,
* `{hour}`, `{minute}`, `{second}`) from a publish date. Month/day/time parts
* are zero-padded, mirroring WordPress (`%monthnum%`, `%day%`, ...). Tokens are
* left untouched when no valid date is available, so callers without a date
* (or unpublished entries) never produce a half-resolved URL.
*/
function applyDateTokens(path, date) {
	const d = date == null ? null : parseUtcDate(date);
	if (!d || Number.isNaN(d.getTime())) return path;
	const parts = {
		year: String(d.getUTCFullYear()),
		month: pad2(d.getUTCMonth() + 1),
		day: pad2(d.getUTCDate()),
		hour: pad2(d.getUTCHours()),
		minute: pad2(d.getUTCMinutes()),
		second: pad2(d.getUTCSeconds())
	};
	return path.replace(DATE_TOKEN, (match, key) => parts[key] ?? match);
}
/**
* Interpolate a collection `url_pattern` with a row's slug, id and publish date.
*
* Supported tokens: `{slug}`, `{id}`, and the date tokens `{year}`,
* `{month}`, `{day}`, `{hour}`, `{minute}`, `{second}` (resolved from `date`,
* for WordPress-style permalinks like `/{year}/{month}/{day}/{slug}.html`).
*
* Falls back to `/{collection}/{slug}` when no pattern is configured.
* Does NOT apply any locale prefix — pass the result through
* Astro's `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` (or the
* `localizePath` helper below) to add the locale segment.
*/
function interpolateUrlPattern(options) {
	const { pattern, collection, slug, id, date } = options;
	let path = (pattern ?? `/${encodeURIComponent(collection)}/{slug}`).replaceAll("{slug}", encodeURIComponent(slug)).replaceAll("{id}", encodeURIComponent(id));
	path = applyDateTokens(path, date);
	path = path.replace(REPEATED_SLASHES, "/");
	if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
	if (!path.startsWith("/")) path = `/${path}`;
	return path;
}
/** Resolve a content row to its locale-aware route path. */
async function resolveLocalizedContentRoutePath(options) {
	const localized = await localizePath(interpolateUrlPattern(options), options.locale);
	if (localized === null) return null;
	if (options.trailingSlash === "always" && localized !== "/") return `${localized}/`;
	if (options.trailingSlash === "never" && localized !== "/") return localized.replace(TRAILING_SLASH, "");
	return localized;
}
/**
* Apply a locale prefix to a path, honouring the user's Astro `i18n`
* routing config (`prefixDefaultLocale`, custom `path`/`codes` mappings).
*
* Reads the resolved config from `astro:config/server`, which is always
* available regardless of whether i18n is enabled -- so this function
* works in both i18n and non-i18n builds without tripping Astro's
* `i18nNotEnabled` resolver (the case with importing `astro:i18n`).
*
* Returns:
*   - The original `path` when i18n is not configured.
*   - The original `path` for the default locale when
*     `prefixDefaultLocale` is false.
*   - `/{segment}{path}` for any other configured locale, where
*     `{segment}` is the locale's custom `path` if one is set,
*     otherwise the locale code.
*   - `null` when the row's locale isn't in the configured list.
*     Callers should drop the entry: a sitemap link to a route the
*     site can't serve is worse than no link at all (search engines
*     get a 404 / soft-404 and downrank the page).
*
* Falls back to `getI18nConfig()` (EmDash's mirror of the same config,
* populated at runtime startup) when `astro:config/server` is
* unavailable -- e.g. running outside an Astro build context, such as
* in vitest.
*/
async function localizePath(path, locale) {
	const segment = await resolveLocaleSegment(locale);
	if (segment === void 0) return null;
	if (segment === null || segment === "") return normalizePath(path);
	return normalizePath(`/${segment}${path}`);
}
/**
* Resolve the URL segment to use for a locale.
*
* Returns:
*   - `null` when i18n isn't configured (caller should not prefix).
*   - `""` when the locale is the default locale and
*     `prefixDefaultLocale` is false (caller should not prefix).
*   - The locale's custom `path` value, or the locale string itself.
*   - `undefined` when the locale isn't in the configured list --
*     the row points at a route the site can't serve.
*/
async function resolveLocaleSegment(locale) {
	return resolveLocaleSegmentFromConfig(await readAstroI18nConfig(), locale);
}
/** @internal Exported for testing Astro object-locale routing without a virtual module. */
function resolveLocaleSegmentFromConfig(i18n, locale) {
	if (!i18n || !i18n.locales || i18n.locales.length <= 1) return null;
	let segment;
	let isDefault = locale === i18n.defaultLocale;
	for (const entry of i18n.locales) if (typeof entry === "string") {
		if (entry === locale) {
			segment = entry;
			break;
		}
	} else if (entry.path === locale || entry.codes.includes(locale)) {
		segment = entry.path;
		isDefault ||= entry.path === i18n.defaultLocale || entry.codes.includes(i18n.defaultLocale);
		break;
	}
	if (segment === void 0) return void 0;
	if (isDefault && !i18n.prefixDefaultLocale) return "";
	return segment;
}
var astroI18nCache;
async function readAstroI18nConfig() {
	if (astroI18nCache !== void 0) return astroI18nCache;
	try {
		const mod = await import("./server_DfI0GDIL.mjs");
		if (!mod.i18n) {
			astroI18nCache = null;
			return null;
		}
		const routing = mod.i18n.routing;
		astroI18nCache = {
			defaultLocale: mod.i18n.defaultLocale,
			locales: mod.i18n.locales,
			prefixDefaultLocale: typeof routing === "object" ? routing.prefixDefaultLocale ?? false : false
		};
		return astroI18nCache;
	} catch {
		const cfg = getI18nConfig();
		if (!cfg || !isI18nEnabled()) {
			astroI18nCache = null;
			return null;
		}
		astroI18nCache = {
			defaultLocale: cfg.defaultLocale,
			locales: cfg.locales,
			prefixDefaultLocale: cfg.prefixDefaultLocale
		};
		return astroI18nCache;
	}
}
function normalizePath(path) {
	let p = path.replace(REPEATED_SLASHES, "/");
	if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
	if (!p.startsWith("/")) p = `/${p}`;
	return p;
}
export { resolveLocalizedContentRoutePath as a, resolveLocaleChain as i, localizePath as n, resolveLocale as r, interpolateUrlPattern as t };
