import { S as addAttribute, g as createRenderInstruction, h as renderHead, m as maybeRenderHead, o as renderComponent, p as renderTemplate, s as Fragment, t as spreadAttributes, u as renderSlot, w as unescapeHTML } from "./server_DwgP_JX5.mjs";
import { t as createComponent } from "./astro-component_ihr1nQIS.mjs";
import { n as getImage, o as $$ResponsiveImage, s as createAstro } from "./_astro_assets_CXULl6hB.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./portable-text-table_DDFSvZip.mjs";
import { t as config_default } from "./config_BfRzcu_C.mjs";
import { a as ContentCollectionNotFoundError, c as EmDashValidationError, d as decodeCursor, f as encodeCursor, g as getRequestContext, l as InvalidCursorError, o as ContentMutationConflictError, r as requestCached, s as ContentSlugConflictError, u as ScheduledNotDueError } from "./request-cache_CXFiINQX.mjs";
import { a as focalPointToObjectPosition, i as isTransferError, n as getSiteSettingsWithDb, r as TransferError, t as getSiteSettings } from "./settings_BfNRruVz.mjs";
import { f as peekSeoPanel } from "./loader_Btw7VAs7.mjs";
import { t as chunks } from "./chunks_B4YLB6C7.mjs";
import { _ as tableExists, a as RESERVED_COLLECTION_SLUGS, c as isStoragelessField, d as currentTimestamp, f as detectDialect, g as listTablesLike, h as isSqlite, l as isStoragelessFieldRow, m as isPostgres, n as FIELD_TYPE_TO_COLUMN, o as RESERVED_FIELD_SLUGS, p as executeAtomicBatchIfSupported, r as REPEATER_SUB_FIELD_TYPES, s as isIndexableFieldType, u as columnExists, v as withTransaction } from "./types_UzRCCRwB.mjs";
import { a as validateIdentifier, n as localeMatches, r as localeOrder, t as canonicalLocaleColumn } from "./query_B1nwqhxc.mjs";
import { n as getI18nConfig, o as isI18nEnabled, r as getLocaleCandidates } from "./config_D2Z0BYnM.mjs";
import "./taxonomies_Ct0NhD8H.mjs";
import { i as isMissingTableError, r as resolveLocalizedContentRoutePath } from "./resolve_B0ayaSfr.mjs";
import { a as invalidateCollectionCache } from "./object-cache_C1QujUiI.mjs";
import { t as resetRegisteredCollectionsCache } from "./collection-slugs-cache_B2aZDvq1.mjs";
import "./query_BsKDtjuL.mjs";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sql } from "kysely";
import { z } from "zod";
import { monotonicFactory, ulid } from "ulidx";
import { SHA256 } from "@oslojs/crypto/sha2";
// node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// node_modules/emdash/src/database/json-recordset.ts
function jsonTextValues(db, values) {
	const payload = JSON.stringify([...new Set(values)]);
	return isPostgres(db) ? sql`SELECT value::text AS value FROM jsonb_array_elements_text(${payload}::jsonb) AS value` : sql`SELECT value AS value FROM json_each(${payload})`;
}
// node_modules/emdash/dist/page/index.mjs
function isAstroInput(input) {
	return "Astro" in input;
}
/**
* Build a PublicPageContext from template input.
*/
function createPublicPageContext(input) {
	let url;
	let path;
	let locale;
	if (isAstroInput(input)) {
		url = input.Astro.url.href;
		path = input.Astro.url.pathname;
		locale = input.Astro.currentLocale ?? null;
	} else {
		const parsed = typeof input.url === "string" ? new URL(input.url) : input.url;
		url = parsed.href;
		path = parsed.pathname;
		locale = input.locale ?? null;
	}
	return {
		url,
		path,
		locale,
		kind: input.kind,
		pageType: input.pageType ?? (input.kind === "content" ? "article" : "website"),
		title: input.title ?? null,
		pageTitle: input.pageTitle ?? null,
		description: input.description ?? null,
		canonical: input.canonical ?? null,
		image: input.image ?? null,
		content: input.content ? {
			collection: input.content.collection,
			id: input.content.id,
			slug: input.content.slug ?? null
		} : void 0,
		seo: input.seo,
		articleMeta: input.articleMeta,
		siteName: input.siteName,
		breadcrumbs: input.breadcrumbs,
		siteUrl: input.siteUrl
	};
}
// node_modules/astro-portabletext/components/Block.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/List.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/ListItem.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/Mark.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/Text.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/UnknownType.astro
createAstro("https://astro.build");
// node_modules/astro-portabletext/components/PortableText.astro
createAstro("https://astro.build");
// node_modules/emdash/src/schema/url-pattern.ts
var URL_PARAM_PATTERN = /\{(\w+)\}/g;
var REGEX_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/g;
var INVALID_LITERAL_PATTERN = /[{}]/;
function escapeRegex(literal) {
	return literal.replace(REGEX_SPECIAL_CHARACTERS, "\\$&");
}
/**
* Compile a collection URL pattern to an anchored regex.
*
* Each placeholder must sit in its own path segment. Two `[^/]+` groups in one
* segment can split the segment many ways, so a crafted request path makes the
* regex backtrack polynomially (exponentially in the placeholder count).
*/
function compileUrlPattern(pattern) {
	const paramNames = [];
	let regexSource = "";
	let previousIndex = 0;
	for (const match of pattern.matchAll(URL_PARAM_PATTERN)) {
		const matchIndex = match.index;
		const literal = pattern.slice(previousIndex, matchIndex);
		if (INVALID_LITERAL_PATTERN.test(literal)) throw new Error("Invalid URL pattern placeholder");
		if (paramNames.length > 0 && !literal.includes("/")) throw new Error("URL patterns allow only one placeholder per path segment");
		regexSource += escapeRegex(literal);
		const name = match[1];
		paramNames.push(name);
		regexSource += "([^/]+)";
		previousIndex = matchIndex + match[0].length;
	}
	const trailingLiteral = pattern.slice(previousIndex);
	if (INVALID_LITERAL_PATTERN.test(trailingLiteral)) throw new Error("Invalid URL pattern placeholder");
	regexSource += escapeRegex(trailingLiteral);
	return {
		regex: new RegExp(`^${regexSource}$`),
		paramNames
	};
}
// node_modules/emdash/src/components/InlineEditor.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/PortableText.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Blocks.astro
createAstro("https://astro.build");
// node_modules/emdash/src/utils/url.ts
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
// node_modules/emdash/src/menus/index.ts
/** Per isolate: the namespaces each resolved menu was last cached under. */
var LAST_RESOLVED_NAMESPACES_KEY = Symbol.for("emdash:menu-resolved-namespaces");
globalThis[LAST_RESOLVED_NAMESPACES_KEY] ?? (() => {
	const map = /* @__PURE__ */ new Map();
	globalThis[LAST_RESOLVED_NAMESPACES_KEY] = map;
	return map;
})();
// node_modules/emdash/src/media/provider-loader.ts
var virtualMediaProviders;
var mediaProviderInstances = /* @__PURE__ */ new Map();
/**
* Load media providers from virtual module
*/
async function loadMediaProviders() {
	if (virtualMediaProviders === void 0) virtualMediaProviders = (await import("./media-providers_CRQA74br.mjs")).mediaProviders || [];
}
/**
* Get a media provider by ID.
*
* Used by EmDashMedia component for frontend rendering.
* Providers are lazy-loaded from virtual module and cached.
*
* @example
* ```ts
* const provider = await getMediaProvider("cloudflare-images");
* if (provider) {
*   const embed = provider.getEmbed(mediaValue, { width: 800 });
* }
* ```
*/
async function getMediaProvider(providerId) {
	const cached = mediaProviderInstances.get(providerId);
	if (cached) return cached;
	await loadMediaProviders();
	const entry = virtualMediaProviders?.find((p) => p.id === providerId);
	if (!entry) return;
	const provider = entry.createProvider({});
	mediaProviderInstances.set(providerId, provider);
	return provider;
}
// node_modules/emdash/src/media/normalize.ts
var INTERNAL_MEDIA_PREFIX = "/_emdash/api/media/file/";
function normalizeLegacyExternalMediaValue(value) {
	if (value.provider !== "external-url") return value;
	const src = value.src ?? value.previewUrl;
	return {
		...value,
		provider: "external",
		...src === void 0 ? {} : { src }
	};
}
// node_modules/emdash/src/media/url.ts
var SAFE_STORAGE_KEY = /^[A-Za-z0-9._-]+$/;
/**
* Build a render-time media URL. Prefers `storageKey`, then rewrites an
* internal `url` via `resolve`, then falls back to the internal proxy for a
* bare `id`. External URLs and non-matching internal-looking URLs pass
* through untouched. Returns `""` when nothing usable is present.
*
* @internal
*/
function buildRenderMediaUrl(resolve, ref) {
	const { storageKey, url, id } = ref;
	if (storageKey) return resolve ? resolve(storageKey) : `${INTERNAL_MEDIA_PREFIX}${storageKey}`;
	if (url) {
		if (resolve && url.startsWith("/_emdash/api/media/file/")) {
			const key = url.slice(INTERNAL_MEDIA_PREFIX.length);
			if (SAFE_STORAGE_KEY.test(key)) return resolve(key);
		}
		return url;
	}
	if (id) return `${INTERNAL_MEDIA_PREFIX}${id}`;
	return "";
}
// node_modules/emdash/src/media/responsive.ts
/** Standard responsive breakpoints. Matches CDN-provider srcset generation. */
var RESPONSIVE_BREAKPOINTS = [
	640,
	750,
	828,
	960,
	1080,
	1280,
	1600,
	1920
];
/** Matches absolute http(s) URLs — the only shape Astro's image services optimize. */
var ABSOLUTE_HTTP_URL = /^https?:\/\//i;
/**
* Pick the srcset widths to generate for an image rendered at `maxWidth`.
* Includes breakpoints up to 2x (retina) plus the rendered width itself, so the
* browser always has an exact-fit candidate. A known `originalWidth` below 2x
* lowers that limit, so the source is never upscaled for a high-density
* candidate. The limit itself is a candidate up to the largest breakpoint, so
* images narrower than the first breakpoint still get one.
*/
function responsiveWidths(maxWidth, originalWidth) {
	const width = Math.round(maxWidth);
	if (!(width >= 1)) return [];
	const original = Math.round(originalWidth ?? 0);
	const cap = original >= 1 && original < width * 2 ? original : width * 2;
	const widths = new Set(RESPONSIVE_BREAKPOINTS.filter((w) => w <= cap));
	widths.add(width);
	if (cap <= Math.max(...RESPONSIVE_BREAKPOINTS)) widths.add(cap);
	return [...widths].toSorted((a, b) => a - b);
}
/** Build the `sizes` attribute for an image with a known display width. */
function responsiveSizes(width) {
	return width ? `(min-width: ${width}px) ${width}px, 100vw` : "100vw";
}
/**
* Make a same-origin media URL absolute so Astro's image service can optimize it.
*
* Astro only optimizes absolute http(s) URLs; a same-origin proxy path like
* `/_emdash/api/media/file/x.jpg` is otherwise treated as an unoptimizable
* public asset. Resolving it against the site's public origin (and authorizing
* that origin via `image.remotePatterns`) lets the service transform it.
*
* Only **same-origin** root-relative paths are resolved. Protocol-relative
* URLs (`//evil.com/x`) and backslash tricks (`/\evil.com`) also start with `/`
* but resolve to a different origin -- a classic SSRF vector once a
* remotePattern authorizes the media path -- so anything that escapes the
* origin is returned unchanged (and then skipped by `buildResponsiveImage`,
* which only accepts absolute http(s) URLs). Already-absolute URLs (CDN/public
* bucket) and non-path values (`data:`, `blob:`) are returned unchanged too.
*/
function toAbsoluteMediaUrl(src, origin) {
	if (!src || !origin || !src.startsWith("/")) return src;
	try {
		const resolved = new URL(src, origin);
		if (resolved.origin !== new URL(origin).origin) return src;
		return resolved.href;
	} catch {
		return src;
	}
}
/**
* Generate a responsive `src`/`srcset`/`sizes` for a media URL via Astro's
* configured image service.
*
* Astro's image services (sharp, Cloudflare `/cdn-cgi/image`, and the default
* Cloudflare `cloudflare-binding` service) only optimize **absolute** URLs whose
* host is authorized via `image.domains` / `image.remotePatterns`. Anything else
* is passed through unchanged, which would yield a useless srcset (the same URL
* at every width descriptor). We therefore only attempt optimization for
* absolute http(s) URLs and verify the service actually rewrote the URL.
*
* Returns `null` so callers fall back to a plain `<img>` when:
*  - dimensions are unknown (avoids an inferSize fetch on every render),
*  - the URL is relative (a same-origin proxy/public asset Astro won't optimize),
*  - the host isn't authorized (the service passed the URL through unchanged),
*  - no image service is configured / `getImage` throws.
*/
async function buildResponsiveImage(getImage, opts) {
	const { src, width, height, originalWidth, quality } = opts;
	if (!src || !width || !height) return null;
	if (!ABSOLUTE_HTTP_URL.test(src)) return null;
	try {
		const sizes = responsiveSizes(width);
		const result = await getImage({
			src,
			width,
			height,
			widths: responsiveWidths(width, originalWidth),
			sizes,
			...quality !== void 0 ? { quality } : {}
		});
		if (!result.src || result.src === src) return null;
		return {
			src: result.src,
			srcset: result.srcSet?.attribute || void 0,
			sizes
		};
	} catch {
		return null;
	}
}
// node_modules/emdash/src/api/public-url.ts
/**
* Resolve siteUrl from runtime environment variables.
*
* Uses process.env (not import.meta.env) because Vite statically replaces
* import.meta.env at build time, baking out any env vars not present during
* the build. Container deployments set env vars at runtime, so we must read
* process.env which Vite leaves untouched.
*
* On Cloudflare Workers process.env is empty by default, so the fallback
* chain continues to url.origin — unless the Worker enables the
* `nodejs_compat_populate_process_env` compatibility flag, in which case
* `vars`/secrets (e.g. EMDASH_SITE_URL) are readable here too.
*
* Caches after first call.
*/
var _envSiteUrl = null;
function getEnvSiteUrl() {
	if (_envSiteUrl !== null) return _envSiteUrl || void 0;
	try {
		const value = typeof process !== "undefined" && process.env?.EMDASH_SITE_URL || typeof process !== "undefined" && process.env?.SITE_URL || "";
		if (value) {
			const parsed = new URL(value);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
				_envSiteUrl = "";
				return;
			}
			_envSiteUrl = parsed.origin;
		} else _envSiteUrl = "";
	} catch {
		_envSiteUrl = "";
	}
	return _envSiteUrl || void 0;
}
/**
* Return the public-facing origin for the site.
*
* Resolution order:
*   1. `config.siteUrl` (set in astro.config.mjs, origin-normalized at startup)
*   2. `EMDASH_SITE_URL` or `SITE_URL` env var (resolved at runtime for containers)
*   3. `url.origin` (internal request URL — correct when no proxy)
*
* @param url  The request URL (`new URL(request.url)` or `Astro.url`)
* @param config  The EmDash config (from `locals.emdash?.config`)
* @returns Origin string, e.g. `"https://mysite.example.com"`
*/
function getPublicOrigin(url, config) {
	return getConfiguredOrigin(config) || url.origin;
}
/**
* Return the operator-configured public origin, if any.
*
* The first two steps of {@link getPublicOrigin}'s resolution —
* `config.siteUrl`, then the `EMDASH_SITE_URL`/`SITE_URL` env vars — without
* the request-URL fallback. For callers that have a more trustworthy fallback
* than the request (e.g. the stored setup origin used for outbound emails).
*/
function getConfiguredOrigin(config) {
	return config?.siteUrl || getEnvSiteUrl() || void 0;
}
// node_modules/emdash/src/components/EmDashImage.astro
createAstro("https://astro.build");
var $$EmDashImage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashImage;
	const { image, darkVariant, alt, width, height, quality, priority, placeholder = true, class: className, id, ...attrs } = Astro.props;
	function normalizeImage(img) {
		if (!img) return null;
		if (typeof img === "string") return {
			id: "",
			src: img
		};
		return normalizeLegacyExternalMediaValue(img);
	}
	function buildLocalImageUrl(img) {
		return buildRenderMediaUrl(Astro.locals.emdash?.getPublicMediaUrl, {
			storageKey: img.meta?.storageKey,
			id: img.id
		});
	}
	function generateSrcset(getSrc, maxWidth, aspectRatio, originalWidth) {
		return responsiveWidths(maxWidth, originalWidth).map((w) => {
			return `${getSrc({
				width: w,
				height: aspectRatio ? Math.round(w / aspectRatio) : void 0,
				quality
			})} ${w}w`;
		}).join(", ");
	}
	async function resolveImage(img) {
		const finalWidth = width ?? img.width;
		const finalHeight = height ?? img.height;
		const aspectRatio = finalWidth && finalHeight ? finalWidth / finalHeight : void 0;
		let src = "";
		let srcset;
		let sizes;
		let astroImageSrc = "";
		const providerId = img.provider ?? "local";
		if (providerId === "local" || img.src) {
			src = img.src || buildLocalImageUrl(img);
			const publicOrigin = getPublicOrigin(Astro.url, Astro.locals.emdash?.config);
			const absoluteSrc = toAbsoluteMediaUrl(src, publicOrigin);
			if (finalWidth && finalHeight && absoluteSrc.startsWith(`${publicOrigin}/`)) astroImageSrc = absoluteSrc;
			else {
				const optimized = await buildResponsiveImage(getImage, {
					src: absoluteSrc,
					width: finalWidth,
					height: finalHeight,
					originalWidth: img.width,
					quality
				});
				if (optimized) {
					src = optimized.src;
					srcset = optimized.srcset;
					sizes = optimized.sizes;
				}
			}
		} else {
			try {
				const provider = await getMediaProvider(providerId);
				if (provider) {
					const result = provider.getEmbed(img, {
						width: finalWidth,
						height: finalHeight,
						quality
					});
					const embed = result instanceof Promise ? await result : result;
					if (embed.type === "image") {
						src = embed.src;
						if (embed.getSrc) {
							const maxWidth = finalWidth || 1200;
							srcset = generateSrcset(embed.getSrc, maxWidth, aspectRatio, img.width);
							sizes = finalWidth ? `(min-width: ${finalWidth}px) ${finalWidth}px, 100vw` : "100vw";
						}
					}
				} else console.warn(`[EmDashImage] Provider not found: ${providerId}`);
			} catch (error) {
				console.error(`[EmDashImage] Failed to get embed for image ${img.id}:`, error);
			}
			if (!src) src = buildLocalImageUrl(img);
		}
		const blurhash = img.blurhash ?? img.meta?.blurhash;
		const dominantColor = img.dominantColor ?? img.meta?.dominantColor;
		let placeholderStyle = "";
		if (placeholder && blurhash) {
			const { blurhashToImageCssString } = await import("@unpic/placeholder");
			placeholderStyle = blurhashToImageCssString(blurhash);
		} else if (placeholder && dominantColor) placeholderStyle = `background-color: ${dominantColor};`;
		const objectPosition = focalPointToObjectPosition(img.focalX, img.focalY);
		const generatedStyle = [placeholderStyle && !placeholderStyle.endsWith(";") ? `${placeholderStyle};` : placeholderStyle, objectPosition ? `object-position: ${objectPosition};` : ""].filter(Boolean).join(" ");
		return {
			src,
			srcset,
			sizes,
			astroImageSrc,
			width: finalWidth,
			height: finalHeight,
			generatedStyle
		};
	}
	const img = normalizeImage(image);
	const darkSource = darkVariant ?? (typeof image === "object" ? image?.darkVariant : void 0);
	const dark = img ? normalizeImage(darkSource) : null;
	const finalAlt = alt ?? img?.alt ?? "";
	const resolved = img ? await resolveImage(img) : null;
	const resolvedDark = dark ? await resolveImage(dark) : null;
	function imgProps(r, variantClass, elementId) {
		return {
			id: elementId,
			src: r.src,
			srcset: r.srcset,
			sizes: r.sizes,
			width: r.width,
			height: r.height,
			alt: finalAlt,
			loading: priority ? "eager" : "lazy",
			fetchpriority: priority ? "high" : void 0,
			decoding: "async",
			style: r.generatedStyle || void 0,
			class: [
				"emdash-image-media",
				variantClass,
				className
			].filter(Boolean).join(" "),
			...attrs
		};
	}
	const lightClass = resolvedDark ? "emdash-image--light" : void 0;
	const darkId = id ? `${id}--dark` : void 0;
	const astroClass = (variantClass) => [variantClass, className].filter(Boolean).join(" ") || void 0;
	return renderTemplate`${resolved && resolved.astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$ResponsiveImage, {
		"id": id,
		"src": resolved.astroImageSrc,
		"alt": finalAlt,
		"width": resolved.width,
		"height": resolved.height,
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass(lightClass),
		"style": resolved.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : resolved && resolved.src ? renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(imgProps(resolved, lightClass, id), void 0, { "class": "astro-6depetnu" })} data-astro-cid-6depetnu>` : null}${resolvedDark && resolvedDark.astroImageSrc ? renderTemplate`${renderComponent($$result, "AstroImage", $$ResponsiveImage, {
		"id": darkId,
		"src": resolvedDark.astroImageSrc,
		"alt": finalAlt,
		"width": resolvedDark.width,
		"height": resolvedDark.height,
		"quality": quality,
		"priority": priority,
		"layout": "constrained",
		"loading": priority ? "eager" : "lazy",
		"decoding": "async",
		"class": astroClass("emdash-image--dark"),
		"style": resolvedDark.generatedStyle || void 0,
		...attrs,
		"data-astro-cid-6depetnu": true
	})}` : resolvedDark && resolvedDark.src ? renderTemplate`<img${spreadAttributes(imgProps(resolvedDark, "emdash-image--dark", darkId), void 0, { "class": "astro-6depetnu" })} data-astro-cid-6depetnu>` : null}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/EmDashImage.astro", void 0);
// node_modules/emdash/src/components/widgets/RecentPosts.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Categories.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Tags.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Search.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/widgets/Archives.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/WidgetRenderer.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/WidgetArea.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/EmDashMedia.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Block.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Image.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Code.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Embed.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Gallery.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/marks/Link.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Columns.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Break.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/HtmlBlockFrame.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/HtmlBlock.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Iframe.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Video.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Table.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Button.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Buttons.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Cover.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/File.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/Pullquote.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/BlockquoteGroup.astro
createAstro("https://astro.build");
// node_modules/emdash/src/components/OrderedList.astro
createAstro("https://astro.build");
// node_modules/emdash/src/page/metadata.ts
/** Schemes safe for use in link href attributes */
var SAFE_HREF_RE = /^(https?|at):\/\//i;
var HTML_ESCAPE_MAP = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
var HTML_ESCAPE_RE = /[&<>"']/g;
/** Escape a string for safe use in an HTML attribute value */
function escapeHtmlAttr(value) {
	return value.replace(HTML_ESCAPE_RE, (ch) => HTML_ESCAPE_MAP[ch] ?? ch);
}
/** Validate that a URL uses a safe scheme (http, https, at) */
function isSafeHref(url) {
	return SAFE_HREF_RE.test(url);
}
var JSONLD_LT_RE = /</g;
var JSONLD_GT_RE = />/g;
var JSONLD_U2028_RE = /\u2028/g;
var JSONLD_U2029_RE = /\u2029/g;
/**
* Safely serialize a value for embedding in a <script type="application/ld+json"> tag.
*
* Plain JSON.stringify is not sufficient because:
* - "<\/script>" in a nested string breaks out of the script tag
* - "<!--" can open an HTML comment
* - U+2028/U+2029 are line terminators in some JS engines
*/
function safeJsonLdSerialize(value) {
	return JSON.stringify(value).replace(JSONLD_LT_RE, "\\u003c").replace(JSONLD_GT_RE, "\\u003e").replace(JSONLD_U2028_RE, "\\u2028").replace(JSONLD_U2029_RE, "\\u2029");
}
async function createSha256CspHash(value) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	const bytes = new Uint8Array(digest);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return `sha256-${btoa(binary)}`;
}
/**
* Register JSON-LD hashes with Astro's CSP runtime when CSP is enabled.
*
* The getter stays lazy because Astro warns when `Astro.csp` is accessed on a
* project that has not enabled its built-in CSP support.
*/
async function registerJsonLdCspHashes(enabled, getCsp, scripts) {
	if (!enabled || scripts.length === 0) return;
	const csp = getCsp();
	if (!csp) return;
	await Promise.all(scripts.map(async ({ json }) => {
		csp.insertScriptHash(await createSha256CspHash(json));
	}));
}
/**
* Resolve a flat list of contributions into deduplicated metadata.
* First contribution wins for any given dedupe key.
*/
function resolvePageMetadata(contributions) {
	const result = {
		meta: [],
		properties: [],
		links: [],
		jsonld: []
	};
	const seenMeta = /* @__PURE__ */ new Set();
	const seenProperties = /* @__PURE__ */ new Set();
	const seenLinks = /* @__PURE__ */ new Set();
	const seenJsonLd = /* @__PURE__ */ new Set();
	for (const c of contributions) switch (c.kind) {
		case "meta": {
			const dedupeKey = c.key ?? c.name;
			if (seenMeta.has(dedupeKey)) continue;
			seenMeta.add(dedupeKey);
			result.meta.push({
				name: c.name,
				content: c.content
			});
			break;
		}
		case "property": {
			const dedupeKey = c.key ?? c.property;
			if (seenProperties.has(dedupeKey)) continue;
			seenProperties.add(dedupeKey);
			result.properties.push({
				property: c.property,
				content: c.content
			});
			break;
		}
		case "link":
			if (!isSafeHref(c.href)) {
				if (Object.assign({
					"ASSETS_PREFIX": void 0,
					"BASE_URL": "/",
					"DEV": false,
					"MODE": "production",
					"PROD": true,
					"SITE": void 0,
					"SSR": true
				}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" })?.DEV) console.warn(`[page:metadata] Rejected link contribution with unsafe href scheme: ${c.href}`);
				continue;
			}
			if (c.rel === "canonical") {
				if (seenLinks.has("canonical")) continue;
				seenLinks.add("canonical");
			} else {
				const dedupeKey = c.key ?? c.hreflang ?? c.href;
				if (seenLinks.has(dedupeKey)) continue;
				seenLinks.add(dedupeKey);
			}
			result.links.push({
				rel: c.rel,
				href: c.href,
				...c.hreflang && { hreflang: c.hreflang }
			});
			break;
		case "jsonld":
			if (c.id) {
				if (seenJsonLd.has(c.id)) continue;
				seenJsonLd.add(c.id);
			}
			result.jsonld.push({
				id: c.id,
				json: safeJsonLdSerialize(c.graph)
			});
	}
	return result;
}
/** Render resolved metadata to an HTML string for embedding in <head> */
function renderPageMetadata(metadata, options = {}) {
	const parts = [];
	const includeJsonLd = options.includeJsonLd ?? true;
	for (const m of metadata.meta) parts.push(`<meta name="${escapeHtmlAttr(m.name)}" content="${escapeHtmlAttr(m.content)}">`);
	for (const p of metadata.properties) parts.push(`<meta property="${escapeHtmlAttr(p.property)}" content="${escapeHtmlAttr(p.content)}">`);
	for (const l of metadata.links) {
		let tag = `<link rel="${escapeHtmlAttr(l.rel)}" href="${escapeHtmlAttr(l.href)}"`;
		if (l.hreflang) tag += ` hreflang="${escapeHtmlAttr(l.hreflang)}"`;
		tag += ">";
		parts.push(tag);
	}
	if (includeJsonLd) for (const j of metadata.jsonld) parts.push(`<script type="application/ld+json">${j.json}<\/script>`);
	return parts.join("\n");
}
// node_modules/emdash/src/page/fragments.ts
/** Escape sequences that would break out of a script tag */
var SCRIPT_CLOSE_RE = /<\//g;
/**
* Filter contributions to a specific placement and deduplicate.
* - Contributions with the same `key + placement` are deduped (first wins).
* - External scripts with the same `src + placement` are deduped.
*/
function resolveFragments(contributions, placement) {
	const filtered = contributions.filter((c) => c.placement === placement);
	const seen = /* @__PURE__ */ new Set();
	const result = [];
	for (const c of filtered) {
		if (c.key) {
			const dedupeKey = `key:${c.key}`;
			if (seen.has(dedupeKey)) continue;
			seen.add(dedupeKey);
		} else if (c.kind === "external-script") {
			const dedupeKey = `src:${c.src}`;
			if (seen.has(dedupeKey)) continue;
			seen.add(dedupeKey);
		}
		result.push(c);
	}
	return result;
}
var EVENT_HANDLER_RE = /^on/i;
function renderAttributes(attrs) {
	return Object.entries(attrs).filter(([k]) => !EVENT_HANDLER_RE.test(k)).map(([k, v]) => ` ${escapeHtmlAttr(k)}="${escapeHtmlAttr(v)}"`).join("");
}
/** Render a single fragment contribution to HTML */
function renderFragment(c) {
	switch (c.kind) {
		case "external-script": {
			let tag = `<script src="${escapeHtmlAttr(c.src)}"`;
			if (c.async) tag += " async";
			if (c.defer) tag += " defer";
			if (c.attributes) tag += renderAttributes(c.attributes);
			tag += "><\/script>";
			return tag;
		}
		case "inline-script": {
			let tag = "<script";
			if (c.attributes) tag += renderAttributes(c.attributes);
			tag += `>${c.code.replace(SCRIPT_CLOSE_RE, "<\\/")}<\/script>`;
			return tag;
		}
		case "html": return c.html;
	}
}
/** Render a list of fragment contributions to an HTML string */
function renderFragments(contributions, placement) {
	return resolveFragments(contributions, placement).map(renderFragment).join("\n");
}
// node_modules/emdash/src/components/JsonLdScript.astro
createAstro("https://astro.build");
var $$JsonLdScript = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$JsonLdScript;
	const { json } = Astro.props;
	return renderTemplate`<script type="application/ld+json">${unescapeHTML(json)}<\/script>`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/JsonLdScript.astro", void 0);
// node_modules/emdash/src/seo/media-url.ts
/**
* Resolve a stored SEO image reference to a URL.
*
* The CMS SEO panel stores `seo_image` in one of these shapes:
* - an absolute URL (`https://...`) — returned as-is;
* - a root-relative path that already includes the media API prefix
*   (`/_emdash/api/media/file/01KS....webp`) — prefixed with `siteUrl`;
* - a bare media id (`01KS...`) — expanded to the media API path, then
*   prefixed with `siteUrl`.
*
* Shared by the SEO meta builder (`og:image`) and the sitemap route
* (`<image:image>`) so both resolve image references identically.
*/
var TRAILING_SLASH_RE$2 = /\/$/;
var ABSOLUTE_URL_RE$1 = /^https?:\/\//i;
function buildSeoImageUrl(imageRef, siteUrl) {
	if (ABSOLUTE_URL_RE$1.test(imageRef)) return imageRef;
	if (imageRef.startsWith("//")) return imageRef;
	if (imageRef.startsWith("/")) return siteUrl ? `${siteUrl.replace(TRAILING_SLASH_RE$2, "")}${imageRef}` : imageRef;
	const mediaPath = `/_emdash/api/media/file/${imageRef}`;
	return siteUrl ? `${siteUrl.replace(TRAILING_SLASH_RE$2, "")}${mediaPath}` : mediaPath;
}
/**
* Resolve a stored SEO canonical value to a URL.
*
* The SEO panel accepts absolute URLs, root-relative paths, and bare
* relative paths. Relative paths are joined with `siteUrl` (adding a
* leading slash when missing, so we never produce
* `https://example.composts/x`). Without a `siteUrl` the value is
* returned as-is. Absolute output matters here: the resolved value feeds
* `<link rel="canonical">` and `og:url`, both of which search engines and
* scrapers expect fully qualified.
*/
function resolveSeoCanonicalUrl(canonical, siteUrl) {
	if (!siteUrl || ABSOLUTE_URL_RE$1.test(canonical) || canonical.startsWith("//")) return canonical;
	const path = canonical.startsWith("/") ? canonical : `/${canonical}`;
	return `${siteUrl.replace(TRAILING_SLASH_RE$2, "")}${path}`;
}
// node_modules/emdash/src/page/jsonld.ts
/**
* Remove null/undefined values from a JSON-LD object recursively.
* JSON-LD validators prefer absent keys over null values.
*/
function cleanJsonLd(obj) {
	const cleaned = {};
	for (const [key, value] of Object.entries(obj)) if (value !== void 0 && value !== null) {
		if (typeof value === "object" && !Array.isArray(value)) cleaned[key] = cleanJsonLd(value);
		else cleaned[key] = value;
	}
	return cleaned;
}
/**
* Build a BlogPosting JSON-LD graph from page context.
* Used for article-type content pages.
*
* @param page - Page context for the current request.
* @param defaultOgImage - Optional site-wide fallback image URL, used when
*   the page has no own OG image. Matches the fallback applied to `og:image`
*   in `generateBaseSeoContributions`.
*/
function buildBlogPostingJsonLd(page, defaultOgImage) {
	if (page.pageType !== "article" || !page.canonical) return null;
	const ogTitle = page.seo?.ogTitle ?? page.pageTitle ?? page.title;
	const description = page.seo?.ogDescription || page.description;
	const ogImage = page.seo?.ogImage || page.image || defaultOgImage || null;
	const publishedTime = page.articleMeta?.publishedTime;
	const modifiedTime = page.articleMeta?.modifiedTime;
	const author = page.articleMeta?.author;
	const siteName = page.siteName;
	return cleanJsonLd({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: ogTitle,
		description,
		image: ogImage || void 0,
		url: page.canonical,
		datePublished: publishedTime || void 0,
		dateModified: modifiedTime || publishedTime || void 0,
		author: author ? {
			"@type": "Person",
			name: author
		} : void 0,
		publisher: siteName ? {
			"@type": "Organization",
			name: siteName
		} : void 0,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": page.canonical
		}
	});
}
/**
* Build a WebSite JSON-LD graph from page context.
* Used for non-article pages (homepage, listing pages, etc.)
*/
function buildWebSiteJsonLd(page) {
	const siteName = page.siteName;
	if (!siteName) return null;
	let siteUrl;
	if (page.siteUrl) siteUrl = page.siteUrl;
	else try {
		siteUrl = new URL(page.url).origin;
	} catch {
		siteUrl = page.canonical || page.url;
	}
	return cleanJsonLd({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteName,
		url: siteUrl
	});
}
// node_modules/emdash/src/page/seo-contributions.ts
/**
* Generate base metadata contributions from a page context's SEO data.
*
* @param page - Page context produced by the runtime for the current request.
* @param defaultOgImage - Optional site-wide fallback OG image URL, used when
*   the page has no own OG image (i.e., neither `seo.ogImage` nor `image`).
*   Sourced from `SiteSettings.seo.defaultOgImage` by `EmDashHead`.
*
* Returns an empty array if no SEO-relevant data is present.
*/
function generateBaseSeoContributions(page, defaultOgImage) {
	const contributions = [];
	const description = page.description;
	const ogTitle = page.seo?.ogTitle ?? page.pageTitle ?? page.title;
	const ogDescription = page.seo?.ogDescription || description;
	const ogImage = page.seo?.ogImage || page.image || defaultOgImage || null;
	const robots = page.seo?.robots;
	const canonical = page.canonical;
	const siteName = page.siteName;
	if (description) contributions.push({
		kind: "meta",
		name: "description",
		content: description
	});
	if (robots) contributions.push({
		kind: "meta",
		name: "robots",
		content: robots
	});
	if (canonical) contributions.push({
		kind: "link",
		rel: "canonical",
		href: canonical
	});
	contributions.push({
		kind: "property",
		property: "og:type",
		content: page.pageType === "article" ? "article" : "website"
	});
	if (ogTitle) contributions.push({
		kind: "property",
		property: "og:title",
		content: ogTitle
	});
	if (ogDescription) contributions.push({
		kind: "property",
		property: "og:description",
		content: ogDescription
	});
	if (ogImage) contributions.push({
		kind: "property",
		property: "og:image",
		content: ogImage
	});
	if (canonical) contributions.push({
		kind: "property",
		property: "og:url",
		content: canonical
	});
	if (siteName) contributions.push({
		kind: "property",
		property: "og:site_name",
		content: siteName
	});
	contributions.push({
		kind: "meta",
		name: "twitter:card",
		content: ogImage ? "summary_large_image" : "summary"
	});
	if (ogTitle) contributions.push({
		kind: "meta",
		name: "twitter:title",
		content: ogTitle
	});
	if (ogDescription) contributions.push({
		kind: "meta",
		name: "twitter:description",
		content: ogDescription
	});
	if (ogImage) contributions.push({
		kind: "meta",
		name: "twitter:image",
		content: ogImage
	});
	if (page.pageType === "article" && page.articleMeta) {
		const { publishedTime, modifiedTime, author } = page.articleMeta;
		if (publishedTime) contributions.push({
			kind: "property",
			property: "article:published_time",
			content: publishedTime
		});
		if (modifiedTime) contributions.push({
			kind: "property",
			property: "article:modified_time",
			content: modifiedTime
		});
		if (author) contributions.push({
			kind: "property",
			property: "article:author",
			content: author
		});
	}
	if (page.pageType === "article") {
		const blogPosting = buildBlogPostingJsonLd(page, defaultOgImage ?? null);
		if (blogPosting) contributions.push({
			kind: "jsonld",
			id: "primary",
			graph: blogPosting
		});
	} else if (siteName) {
		const webSite = buildWebSiteJsonLd(page);
		if (webSite) contributions.push({
			kind: "jsonld",
			id: "primary",
			graph: webSite
		});
	}
	return contributions;
}
/**
* Resolve the page context for rendering: overlay the entry's SEO panel
* values when they were primed for this request.
*
* Used by `<EmDashHead>`, `<EmDashBodyStart>`, and `<EmDashBodyEnd>` so
* head tags, JSON-LD, and every plugin hook — head and body fragments
* alike — see the same overlaid context. Returns the context unchanged
* for non-content pages or when nothing was primed. The peek is a
* request-cache read; site settings are only consulted when a panel
* exists (and are request-cached themselves), so this adds no queries.
*/
async function resolveSeoPanelPage(page, siteUrl) {
	if (!page.content) return page;
	const seo = await peekSeoPanel(page.content.collection, page.content.id);
	if (!seo) return page;
	return applySeoPanelToPageContext(page, seo, { siteUrl: siteUrl || page.siteUrl || (await getSiteSettings()).url || (URL.canParse(page.url) ? new URL(page.url).origin : "") });
}
/**
* Overlay a content entry's SEO panel data onto the page context.
*
* `<EmDashHead>` applies this overlay before anything consumes the context:
* editor-set panel values override whatever the template passed in, and
* because the overlaid context feeds plugin hooks, the base contributions,
* and the JSON-LD builders alike, structured data and head tags always
* agree. Plugins still override the rendered output via first-wins dedup.
*
* The `<title>` element itself stays the template's responsibility —
* head components can't replace it — so `seo.title` feeds
* `og:title` / `twitter:title` / the JSON-LD headline only. Templates that
* want the panel title in `<title>` keep using `getSeoMeta()`.
*
* Unset panel fields fall back to the template-provided values, so pages
* without SEO data are unaffected.
*/
function applySeoPanelToPageContext(page, seo, options = {}) {
	const siteUrl = options.siteUrl ?? void 0;
	const image = seo.image ? buildSeoImageUrl(seo.image, siteUrl) : null;
	const canonical = seo.canonical ? resolveSeoCanonicalUrl(seo.canonical, siteUrl) : null;
	return {
		...page,
		description: seo.description || page.description,
		canonical: canonical || page.canonical,
		image: image || page.image,
		seo: {
			...page.seo,
			ogTitle: seo.title || page.seo?.ogTitle,
			ogDescription: seo.description || page.seo?.ogDescription,
			ogImage: image || page.seo?.ogImage,
			robots: seo.noIndex ? "noindex, nofollow" : page.seo?.robots
		}
	};
}
/**
* Generate site-level SEO metadata contributions from SiteSettings.seo.
*
* These tags apply to every page (search engine ownership verification),
* so they're sourced from site settings rather than per-page context.
* Returns an empty array when no relevant settings are configured.
*/
function generateSiteSeoContributions(seoSettings) {
	const contributions = [];
	if (!seoSettings) return contributions;
	if (seoSettings.googleVerification) contributions.push({
		kind: "meta",
		name: "google-site-verification",
		content: seoSettings.googleVerification
	});
	if (seoSettings.bingVerification) contributions.push({
		kind: "meta",
		name: "msvalidate.01",
		content: seoSettings.bingVerification
	});
	return contributions;
}
// node_modules/emdash/src/page/site-identity.ts
/**
* Build the `<head>` HTML for site identity tags. Returns an empty string
* when no identity fields are configured.
*/
function renderSiteIdentity(input) {
	if (!input) return "";
	const parts = [];
	const favicon = input.favicon;
	if (favicon?.url) {
		let tag = `<link rel="icon" href="${escapeHtmlAttr(favicon.url)}"`;
		if (favicon.contentType) tag += ` type="${escapeHtmlAttr(favicon.contentType)}"`;
		tag += ">";
		parts.push(tag);
	}
	return parts.join("\n");
}
// node_modules/emdash/src/page/index.ts
/**
* Get the page runtime from Astro locals. Returns undefined when
* EmDash is not initialized (components render nothing in that case).
*/
function getPageRuntime(locals) {
	const emdash = locals.emdash;
	if (emdash && typeof emdash === "object" && "collectPageMetadata" in emdash && "collectPageFragments" in emdash) return emdash;
}
// node_modules/emdash/src/page/absolute-url.ts
var HTTP_URL_RE = /^https?:\/\//i;
/**
* Protocol-relative URLs (`//cdn.example.com/x.png`) are dropped outright.
* They have no legitimate use in `og:image` (scrapers want a full URL) and
* are a well-known SSRF vector when reflected through server-side
* fetchers. Anything starting with `//` returns `null`.
*/
var PROTOCOL_RELATIVE_RE = /^\/\//;
/**
* URL schemes we pass through unchanged because they are legitimately
* useful as OG image values. `data:image/*` is sometimes used for inline
* social cards (rare, but legal). Everything else with a scheme
* (`mailto:`, `tel:`, `file:`, `blob:`, custom protocols) would be garbage
* in an `og:image`; we return `null` so the caller can decide whether to
* fall back or drop the tag.
*/
var PASSTHROUGH_SCHEME_RE = /^data:image\//i;
/**
* Detects URLs that have a scheme other than http/https (and other than
* the data:image/ form we pass through). Used to short-circuit garbage
* input rather than treating it as a relative path.
*/
var OTHER_SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i;
/**
* Any ASCII whitespace or C0/C1 control character anywhere in the URL is
* an injection signal — legitimate media URLs never contain them. Without
* this guard, an input like `"  https://attacker/x"` would slip past the
* scheme regexes (which are anchored at offset 0) and get joined as a
* relative path with the site origin, producing
* `https://site.example/  https://attacker/x` — confusing but not
* exploitable, plus more pathological shapes like leading newlines that
* could inject across header boundaries downstream.
*/
var WHITESPACE_OR_CONTROL_RE = /[\s\u0000-\u001f\u007f-\u009f]/;
var TRAILING_SLASH_RE$1 = /\/$/;
/**
* `URL.origin` returns the literal string `"null"` (not the `null` value)
* for opaque origins like `data:`, `blob:`, and `about:blank`. Treating
* that as a valid origin would produce `null/og.png` in the output.
*/
function isUsableOrigin(origin) {
	return origin !== "null" && origin !== "";
}
/**
* Resolve the public origin to use when absolutizing a media URL.
*
* Precedence:
*  1. The configured `SiteSettings.url` (admin-controlled, canonical).
*  2. `PublicPageContext.siteUrl` (set by themes that override the origin,
*     e.g. when running behind a reverse proxy).
*  3. The origin parsed from `page.url`, which is the live request URL.
*
* Only `http:` and `https:` candidates count — anything else (e.g. `file:`,
* `data:`, `blob:`) would yield an unusable origin and is skipped. Returns
* `null` if no candidate parses to a usable HTTP(S) origin; callers should
* treat that as "leave the URL relative" rather than throw.
*/
function resolveSiteOrigin(configuredSiteUrl, page) {
	const candidates = [
		configuredSiteUrl,
		page.siteUrl,
		page.url
	];
	for (const candidate of candidates) {
		if (!candidate || typeof candidate !== "string") continue;
		try {
			const parsed = new URL(candidate);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") continue;
			if (!isUsableOrigin(parsed.origin)) continue;
			return parsed.origin;
		} catch {}
	}
	return null;
}
/**
* Absolutize a media URL using the best available site origin.
*
* - Returns `null` for missing/empty input.
* - Passes through already-absolute `http(s):` URLs unchanged.
* - Passes through `data:image/*` URLs unchanged (rare but legal as OG
*   image content).
* - Returns `null` for protocol-relative URLs (`//cdn.com/x`): no
*   legitimate `og:image` use case, and a known SSRF vector when reflected
*   through server-side fetchers.
* - Returns `null` for any other scheme (`mailto:`, `blob:`, `file:`,
*   custom protocols): emitting those into `og:image` is worse than
*   omitting the tag.
* - Returns the original (relative) URL when no origin can be resolved —
*   preferable to dropping `og:image` outright because scrapers that follow
*   relative URLs are better off than ones that get nothing.
*
* @param url - The (possibly relative) media URL, e.g. `/_emdash/api/media/file/abc.jpg`.
* @param configuredSiteUrl - `SiteSettings.url` value (admin-controlled).
* @param page - The page context providing `siteUrl` and `url` fallbacks.
*/
function absolutizeMediaUrl(url, configuredSiteUrl, page) {
	if (!url) return null;
	if (WHITESPACE_OR_CONTROL_RE.test(url)) return null;
	if (HTTP_URL_RE.test(url)) return url;
	if (PASSTHROUGH_SCHEME_RE.test(url)) return url;
	if (PROTOCOL_RELATIVE_RE.test(url)) return null;
	if (OTHER_SCHEME_RE.test(url)) return null;
	const origin = resolveSiteOrigin(configuredSiteUrl, page);
	if (!origin) return url;
	const safePath = url.startsWith("/") ? url : `/${url}`;
	return `${origin.replace(TRAILING_SLASH_RE$1, "")}${safePath}`;
}
// node_modules/emdash/src/content/known-fields.ts
/**
* Reconcile an entry's keys with the fields its collection currently declares.
*
* A draft revision stores the whole `data` as JSON, so deleting a field leaves the old
* value inside the revision. Every content-write surface needs the same two rules to keep
* that from stranding the entry, so they live here rather than in one caller.
*/
/** Keys EmDash reserves (`_slug` and the like). No field declares them. */
function isReservedKey(key) {
	return key.startsWith("_");
}
/**
* The entry data without the keys the collection has no field for.
*
* Reserved keys are kept.
*/
function keepKnownFields(data, knownFieldSlugs) {
	const result = {};
	for (const [key, value] of Object.entries(data)) if (isReservedKey(key) || knownFieldSlugs.has(key)) result[key] = value;
	return result;
}
/**
* Incoming keys with no matching field that the entry already stores.
*
* Dropping these lets a read-then-write save succeed after the field was deleted. A key the
* entry has never stored is not returned, so a genuinely unknown field is still reported.
*/
function staleStoredKeys(data, stored, knownFieldSlugs) {
	return Object.keys(data).filter((key) => !isReservedKey(key) && !knownFieldSlugs.has(key) && Object.hasOwn(stored, key));
}
// node_modules/emdash/src/datetime-normalization.ts
var DatetimeNormalizationError = class extends Error {
	code;
	value;
	timezone;
	constructor(code, value, timezone) {
		const detail = code === "ambiguous" ? "occurs more than once because of a daylight-saving transition" : code === "nonexistent" ? "does not exist because of a daylight-saving transition" : code === "invalid_timezone" ? `uses an invalid site timezone (${timezone})` : code === "offset_required" ? "must include Z or an explicit UTC offset" : "is not a valid ISO 8601 datetime";
		super(`Datetime ${JSON.stringify(value)} ${detail}`);
		this.code = code;
		this.value = value;
		this.timezone = timezone;
		this.name = "DatetimeNormalizationError";
	}
};
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var NAIVE_DATETIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/;
var EXPLICIT_OFFSET_PATTERN = /(?:Z|[+-]\d{2}:?\d{2})$/i;
var EXPLICIT_DATETIME_SCHEMA = z.iso.datetime({ offset: true }).or(z.iso.datetime({
	offset: true,
	precision: -1
}));
var OFFSET_SAMPLE_RANGE_MS = 1728e5;
var OFFSET_SAMPLE_STEP_MS = 216e5;
function parseNaiveDatetime(value) {
	const match = NAIVE_DATETIME_PATTERN.exec(value);
	if (!match) return null;
	const parts = {
		year: Number(match[1]),
		month: Number(match[2]),
		day: Number(match[3]),
		hour: Number(match[4] ?? 0),
		minute: Number(match[5] ?? 0),
		second: Number(match[6] ?? 0),
		millisecond: Number((match[7] ?? "0").padEnd(3, "0"))
	};
	const check = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond));
	if (check.getUTCFullYear() !== parts.year || check.getUTCMonth() + 1 !== parts.month || check.getUTCDate() !== parts.day || check.getUTCHours() !== parts.hour || check.getUTCMinutes() !== parts.minute || check.getUTCSeconds() !== parts.second || check.getUTCMilliseconds() !== parts.millisecond) return null;
	return parts;
}
function zonedFormatter(timezone, value) {
	try {
		return new Intl.DateTimeFormat("en-US-u-ca-iso8601-nu-latn", {
			timeZone: timezone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23"
		});
	} catch {
		throw new DatetimeNormalizationError("invalid_timezone", value, timezone);
	}
}
function zonedParts(formatter, epochMs) {
	const values = {};
	for (const part of formatter.formatToParts(new Date(epochMs))) if (part.type !== "literal") values[part.type] = Number(part.value);
	return {
		year: values.year ?? 0,
		month: values.month ?? 0,
		day: values.day ?? 0,
		hour: values.hour ?? 0,
		minute: values.minute ?? 0,
		second: values.second ?? 0
	};
}
function timezoneOffsetMs(formatter, epochMs) {
	const wholeSecond = Math.floor(epochMs / 1e3) * 1e3;
	const parts = zonedParts(formatter, wholeSecond);
	return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - wholeSecond;
}
function sameLocalDatetime(formatter, epochMs, expected) {
	const actual = zonedParts(formatter, epochMs);
	return actual.year === expected.year && actual.month === expected.month && actual.day === expected.day && actual.hour === expected.hour && actual.minute === expected.minute && actual.second === expected.second && new Date(epochMs).getUTCMilliseconds() === expected.millisecond;
}
function resolveNaiveDatetime(value, timezone, parts) {
	const formatter = zonedFormatter(timezone, value);
	const localEpoch = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond);
	const offsets = /* @__PURE__ */ new Set();
	for (let sample = localEpoch - OFFSET_SAMPLE_RANGE_MS; sample <= localEpoch + OFFSET_SAMPLE_RANGE_MS; sample += OFFSET_SAMPLE_STEP_MS) offsets.add(timezoneOffsetMs(formatter, sample));
	const candidates = /* @__PURE__ */ new Set();
	for (const offset of offsets) {
		const candidate = localEpoch - offset;
		if (sameLocalDatetime(formatter, candidate, parts)) candidates.add(candidate);
	}
	if (candidates.size === 0) throw new DatetimeNormalizationError("nonexistent", value, timezone);
	if (candidates.size > 1) throw new DatetimeNormalizationError("ambiguous", value, timezone);
	const candidate = candidates.values().next().value;
	if (candidate === void 0) throw new DatetimeNormalizationError("nonexistent", value, timezone);
	return new Date(candidate).toISOString();
}
function normalizeDatetime(value, timezone) {
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) throw new DatetimeNormalizationError("invalid", value, timezone);
		return {
			value: value.toISOString(),
			kind: "offset"
		};
	}
	if (typeof value !== "string") throw new DatetimeNormalizationError("invalid", value, timezone);
	if (value.startsWith("\"") && value.endsWith("\"")) try {
		const unquoted = JSON.parse(value);
		if (typeof unquoted === "string") {
			const normalized = normalizeDatetime(unquoted, timezone);
			return {
				value: normalized.value,
				kind: normalized.kind === "naive" ? "naive" : "offset"
			};
		}
	} catch {
		throw new DatetimeNormalizationError("invalid", value, timezone);
	}
	const naive = parseNaiveDatetime(value);
	if (naive) return {
		value: resolveNaiveDatetime(value, timezone, naive),
		kind: "naive"
	};
	if (!EXPLICIT_OFFSET_PATTERN.test(value)) throw new DatetimeNormalizationError("invalid", value, timezone);
	if (!EXPLICIT_DATETIME_SCHEMA.safeParse(value).success) throw new DatetimeNormalizationError("invalid", value, timezone);
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) throw new DatetimeNormalizationError("invalid", value, timezone);
	const normalized = parsed.toISOString();
	return {
		value: normalized,
		kind: value === normalized ? "canonical" : "offset"
	};
}
function normalizeExplicitDatetime(value) {
	const normalized = normalizeDatetime(value, "UTC");
	if (normalized.kind === "naive") throw new DatetimeNormalizationError("offset_required", value, "UTC");
	return normalized.value;
}
function normalizeContentDatetimes(data, fields, timezone) {
	let value = data;
	let changedCount = 0;
	let naiveCount = 0;
	const write = (slug, next) => {
		if (value === data) value = { ...data };
		value[slug] = next;
	};
	for (const field of fields) {
		const current = data[field.slug];
		if (current === null || current === void 0 || current === "") continue;
		if (field.type === "datetime") {
			const normalized = normalizeDatetime(current, timezone);
			if (normalized.kind === "naive") naiveCount++;
			if (!Object.is(normalized.value, current)) {
				changedCount++;
				write(field.slug, normalized.value);
			}
			continue;
		}
		if (!Array.isArray(current) || !field.datetimeSubFields?.length) continue;
		let rows = current;
		for (const [index, row] of current.entries()) {
			if (!isRecord$2(row)) continue;
			let nextRow = row;
			for (const subField of field.datetimeSubFields) {
				const nested = nextRow[subField];
				if (nested === null || nested === void 0 || nested === "") continue;
				const normalized = normalizeDatetime(nested, timezone);
				if (normalized.kind === "naive") naiveCount++;
				if (!Object.is(normalized.value, nested)) {
					changedCount++;
					if (nextRow === row) nextRow = { ...nextRow };
					nextRow[subField] = normalized.value;
				}
			}
			if (nextRow !== row) {
				if (rows === current) rows = [...current];
				rows[index] = nextRow;
			}
		}
		if (rows !== current) write(field.slug, rows);
	}
	return {
		value,
		changedCount,
		naiveCount
	};
}
// node_modules/emdash/src/search/match.ts
/**
* FTS5 match-expression builder for structured (non-user-syntax) queries.
*
* Unlike `escapeQuery` in `query.ts` (which powers the public search API and
* deliberately passes through FTS5 operators like AND/OR/NOT), this builder
* treats the input as plain words: every term is double-quoted with interior
* quotes escaped, so the result can never produce an FTS5 syntax error. Used
* by the admin content-list filter, where the input is a filter box, not a
* search-syntax field.
*/
var WHITESPACE_RE = /\s+/;
var DOUBLE_QUOTE_RE = /"/g;
var GLOB_SPECIAL_RE = /[[\]*?]/g;
/**
* Build a prefix-matching FTS5 MATCH expression from free-form input.
*
* `hello wor` becomes `"hello"* "wor"*` — implicit AND with per-term prefix
* matching. Returns `""` when the input contains no usable terms; callers
* must fall back to their non-FTS path in that case.
*/
function buildFtsPrefixMatch(input) {
	const terms = input.trim().split(WHITESPACE_RE).map((term) => term.replace(DOUBLE_QUOTE_RE, "\"\"")).filter((term) => term.length > 0);
	if (terms.length === 0) return "";
	return terms.map((term) => `"${term}"*`).join(" ");
}
/**
* Build a GLOB prefix pattern from free-form input, treating GLOB
* metacharacters (`* ? [ ]`) literally by wrapping each in a character
* class (GLOB has no ESCAPE clause).
*
* GLOB (unlike default LIKE) is case-sensitive, so with a lowercased
* pattern it matches slugs (lowercase by construction) while staying
* servable by the ordinary BINARY-collated slug index — SQLite's GLOB
* optimization turns a `prefix*` pattern into an index range scan.
*/
function buildSlugGlobPrefix(input) {
	return `${input.trim().toLowerCase().replace(GLOB_SPECIAL_RE, (c) => `[${c}]`)}*`;
}
// node_modules/emdash/src/database/content-datetime.ts
function repeaterSubFieldsOfType(validation, type) {
	if (!validation) return [];
	let parsed;
	try {
		parsed = JSON.parse(validation);
	} catch {
		return [];
	}
	if (typeof parsed !== "object" || parsed === null || !("subFields" in parsed)) return [];
	const subFields = parsed.subFields;
	if (!Array.isArray(subFields)) return [];
	return subFields.filter((field) => typeof field === "object" && field !== null && "type" in field && field.type === type && "slug" in field && typeof field.slug === "string").map((field) => field.slug);
}
var ContentDatetimeNormalizer = class {
	db;
	contexts;
	constructor(db, contexts) {
		this.db = db;
		this.contexts = contexts;
	}
	context(collection) {
		if (this.contexts) {
			let context = this.contexts.get(collection);
			if (!context) {
				context = this.loadContext(collection);
				this.contexts.set(collection, context);
			}
			return context;
		}
		return requestCached(`datetimeContext:${collection}`, () => this.loadContext(collection));
	}
	async loadContext(collection) {
		const [rows, timezoneRow] = await Promise.all([this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select([
			"field.slug",
			"field.type",
			"field.validation"
		]).where("collection.slug", "=", collection).execute(), this.db.selectFrom("options").select("value").where("name", "=", "site:timezone").executeTakeFirst()]);
		let timezone = "UTC";
		if (timezoneRow) try {
			const configured = JSON.parse(timezoneRow.value);
			if (typeof configured === "string" && configured) timezone = configured;
		} catch {}
		const fields = [];
		const urlFields = [];
		for (const row of rows) if (row.type === "datetime") fields.push({
			slug: row.slug,
			type: "datetime"
		});
		else if (row.type === "url") urlFields.push({ slug: row.slug });
		else if (row.type === "repeater") {
			fields.push({
				slug: row.slug,
				type: "repeater",
				datetimeSubFields: repeaterSubFieldsOfType(row.validation, "datetime")
			});
			const urlSubFields = repeaterSubFieldsOfType(row.validation, "url");
			if (urlSubFields.length > 0) urlFields.push({
				slug: row.slug,
				urlSubFields
			});
		}
		const writableFieldSlugs = new Set(rows.filter((field) => !isStoragelessFieldRow(field)).map((field) => field.slug));
		return {
			timezone,
			fields,
			urlFields,
			writableFieldSlugs
		};
	}
	async writableFieldSlugs(collection) {
		return (await this.context(collection)).writableFieldSlugs;
	}
	/**
	* Normalizes datetimes in incoming field values and rejects `url` values
	* with unsafe schemes, control characters, or off-site path forms. Values
	* already stored are not checked, so restoring or syncing existing data
	* goes through {@link normalizeData} instead.
	*/
	async normalizeInput(collection, data) {
		const context = await this.context(collection);
		assertSafeUrlFields(data, context.urlFields);
		return this.normalizeWithContext(context, [data])[0] ?? data;
	}
	async normalizeData(collection, data) {
		const [normalized] = await this.normalizeDataMany(collection, [data]);
		return normalized ?? data;
	}
	async normalizeDataMany(collection, items) {
		return this.normalizeWithContext(await this.context(collection), items);
	}
	normalizeWithContext(context, items) {
		try {
			return items.map((data) => normalizeContentDatetimes(data, context.fields, context.timezone).value);
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
	async normalizeValue(collection, value) {
		const context = await this.context(collection);
		try {
			return normalizeDatetime(value, context.timezone).value;
		} catch (error) {
			if (error instanceof DatetimeNormalizationError) throw new EmDashValidationError(error.message);
			throw error;
		}
	}
};
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function repeaterRows(value) {
	let rows = value;
	if (typeof rows === "string" && rows.startsWith("[")) try {
		rows = JSON.parse(rows);
	} catch {
		return;
	}
	return Array.isArray(rows) ? rows : void 0;
}
function assertSafeUrl(path, value) {
	if (typeof value === "string" && !isSafeUrlFieldWriteValue(value)) throw new EmDashValidationError(`Field "${path}" must use http, https, mailto, or tel, or be a safe relative path or fragment`, { path });
}
function assertSafeUrlFields(data, urlFields) {
	for (const field of urlFields) {
		const value = data[field.slug];
		if (!field.urlSubFields) {
			assertSafeUrl(field.slug, value);
			continue;
		}
		const rows = repeaterRows(value);
		if (!rows) continue;
		for (const [index, row] of rows.entries()) {
			if (!isRecord$1(row)) continue;
			for (const subField of field.urlSubFields) assertSafeUrl(`${field.slug}.${index}.${subField}`, row[subField]);
		}
	}
}
// node_modules/emdash/src/database/repositories/revision.ts
var monotonic = monotonicFactory();
function createRevisionId() {
	return monotonic();
}
function normalizeRevisionLimit(value) {
	const numeric = Number(value);
	if (!Number.isFinite(numeric)) return 50;
	return Math.max(1, Math.min(Math.trunc(numeric), 100));
}
/**
* Revision repository for version history
*
* Each revision stores a JSON snapshot of the content at a point in time.
* Used when collection has `supports: ["revisions"]` enabled.
*/
var RevisionRepository = class {
	db;
	datetimes;
	constructor(db, datetimeContexts) {
		this.db = db;
		this.datetimes = new ContentDatetimeNormalizer(db, datetimeContexts);
	}
	/**
	* Create a new revision
	*/
	async create(input) {
		const id = createRevisionId();
		const data = await this.datetimes.normalizeData(input.collection, input.data);
		const row = {
			id,
			collection: input.collection,
			entry_id: input.entryId,
			data: JSON.stringify(data),
			author_id: input.authorId ?? null
		};
		await this.db.insertInto("revisions").values(row).execute();
		const revision = await this.findById(id);
		if (!revision) throw new Error("Failed to create revision");
		await this.queuePruning(input.collection, input.entryId, id);
		return revision;
	}
	async queuePruning(collection, entryId, revisionId) {
		try {
			await this.db.insertInto("_emdash_revision_prune_queue").values({
				collection,
				entry_id: entryId,
				revision_id: revisionId
			}).onConflict((conflict) => conflict.columns(["collection", "entry_id"]).doUpdateSet({ revision_id: revisionId })).execute();
		} catch (error) {
			console.error(`[revisions] Failed to queue revision pruning for ${collection}/${entryId}:`, error);
		}
	}
	/**
	* Find revision by ID
	*/
	async findById(id) {
		const row = await this.db.selectFrom("revisions").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.normalizeRow(row) : null;
	}
	/** Shallow-merge `patch` into a stored revision's data. */
	async mergeData(id, patch) {
		const row = await this.db.selectFrom("revisions").select("data").where("id", "=", id).executeTakeFirst();
		if (!row) return;
		const data = {
			...JSON.parse(row.data),
			...patch
		};
		await this.db.updateTable("revisions").set({ data: JSON.stringify(data) }).where("id", "=", id).execute();
	}
	/**
	* Get all revisions for an entry (newest first)
	*
	* Orders by monotonic ULID (descending). The monotonic factory
	* guarantees strictly increasing IDs even within the same millisecond.
	*/
	async findByEntry(collection, entryId, options = {}) {
		let query = this.db.selectFrom("revisions").leftJoin("users", "users.id", "revisions.author_id").selectAll("revisions").select(["users.id as author_user_id", "users.name as author_name"]).where("revisions.collection", "=", collection).where("revisions.entry_id", "=", entryId).orderBy("revisions.id", "desc");
		if (options.limit) query = query.limit(options.limit);
		const rows = await query.execute();
		const data = await this.datetimes.normalizeDataMany(collection, rows.map((row) => JSON.parse(row.data)));
		return rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			return {
				...this.rowToRevision(row, normalized),
				author: row.author_user_id ? {
					id: row.author_user_id,
					name: row.author_name?.trim() || null
				} : null
			};
		});
	}
	/** Read revisions only when the owning content row is visible in the same statement snapshot. */
	async findVisibleByEntry(collection, entryId, options = {}) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const limit = normalizeRevisionLimit(options.limit);
		const result = await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			ORDER BY revisions.id DESC
			LIMIT ${limit}
		`.execute(this.db);
		const data = await this.datetimes.normalizeDataMany(collection, result.rows.map((row) => JSON.parse(row.data)));
		return result.rows.map((row, index) => {
			const normalized = data[index];
			if (!normalized) throw new Error("Failed to normalize revision data");
			return this.rowToRevision(row, normalized);
		});
	}
	/** Read one revision only when its owning content row is visible in the same statement snapshot. */
	async findVisibleById(collection, entryId, revisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		const row = (await sql`
			SELECT revisions.* FROM revisions
			WHERE revisions.id = ${revisionId}
			AND revisions.collection = ${collection}
			AND revisions.entry_id = ${entryId}
			AND EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.id = ${entryId}
				AND content.deleted_at IS NULL
			)
			LIMIT 1
		`.execute(this.db)).rows[0];
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Get the most recent revision for an entry
	*/
	async findLatest(collection, entryId) {
		const row = await this.db.selectFrom("revisions").selectAll().where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("id", "desc").limit(1).executeTakeFirst();
		return row ? this.normalizeRow(row) : null;
	}
	/**
	* Count revisions for an entry
	*/
	async countByEntry(collection, entryId) {
		const result = await this.db.selectFrom("revisions").select((eb) => eb.fn.count("id").as("count")).where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Delete all revisions for an entry (use when entry is deleted)
	*/
	async deleteByEntry(collection, entryId) {
		const result = await this.db.deleteFrom("revisions").where("collection", "=", collection).where("entry_id", "=", entryId).executeTakeFirst();
		try {
			await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).execute();
		} catch (error) {
			console.error(`[revisions] Failed to clear queued revision pruning for ${collection}/${entryId}:`, error);
		}
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Delete old revisions, keeping the most recent N
	*/
	async pruneOldRevisions(collection, entryId, keepCount, throughRevisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		let keepQuery = this.db.selectFrom("revisions").select("id").where("collection", "=", collection).where("entry_id", "=", entryId).orderBy("created_at", "desc").orderBy("id", "desc").limit(keepCount);
		if (throughRevisionId) keepQuery = keepQuery.where("id", "<=", throughRevisionId);
		const keepIds = (await keepQuery.execute()).map((r) => r.id);
		if (keepIds.length === 0) return 0;
		const revisionBoundary = throughRevisionId ? sql`AND id <= ${throughRevisionId}` : sql``;
		const result = await sql`
			DELETE FROM revisions
			WHERE collection = ${collection}
			AND entry_id = ${entryId}
			${revisionBoundary}
			AND id NOT IN (${sql.join(keepIds.map((id) => sql`${id}`))})
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db);
		return Number(result.numAffectedRows ?? 0);
	}
	async pruneQueuedEntry(collection, entryId, queuedRevisionId, keepCount) {
		const pruned = await this.pruneOldRevisions(collection, entryId, keepCount, queuedRevisionId);
		await this.db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collection).where("entry_id", "=", entryId).where("revision_id", "=", queuedRevisionId).execute();
		return pruned;
	}
	async deleteIfUnreferenced(collection, entryId, revisionId) {
		validateIdentifier(collection, "collection");
		const tableName = `ec_${collection}`;
		return ((await sql`
			DELETE FROM revisions
			WHERE id = ${revisionId}
			AND collection = ${collection}
			AND entry_id = ${entryId}
			AND NOT EXISTS (
				SELECT 1 FROM ${sql.ref(tableName)} AS content
				WHERE content.live_revision_id = revisions.id
				OR content.draft_revision_id = revisions.id
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
	}
	/**
	* Convert database row to Revision object
	*/
	async normalizeRow(row) {
		const data = await this.datetimes.normalizeData(row.collection, JSON.parse(row.data));
		return this.rowToRevision(row, data);
	}
	rowToRevision(row, data) {
		return {
			id: row.id,
			collection: row.collection,
			entryId: row.entry_id,
			data,
			authorId: row.author_id,
			createdAt: row.created_at
		};
	}
};
// node_modules/emdash/src/database/repositories/content.ts
var ULID_PATTERN = /^[0-9A-Z]{26}$/;
var SQLSTATE_PATTERN = /^[0-9A-Z]{5}$/;
var MAX_DRAFT_STAGE_ATTEMPTS = 32;
var LIKE_WILDCARD_RE = /[\\%_]/g;
var MAX_INDEXED_FIELD_FILTERS = 20;
var MAX_IN_FILTER_VALUES = 50;
var MAX_FILTER_STRING_LENGTH = 2048;
function assertRevisionPrecondition(item, expected) {
	if (expected && (item.version !== expected.version || item.updatedAt !== expected.updatedAt)) throw new ContentMutationConflictError();
}
function nullableColumnMatch(column, value) {
	validateIdentifier(column, "content column");
	return value === null ? sql`${sql.ref(column)} IS NULL` : sql`${sql.ref(column)} = ${value}`;
}
function sameStoredValue(left, right) {
	return Object.is(serializeValue(left), serializeValue(right));
}
function matchesPublication(observed, existing, revisionData, revisionId, slug, publishedAt, updatedAt) {
	if (observed.version !== existing.version + 1 || observed.status !== "published" || observed.slug !== slug || observed.liveRevisionId !== revisionId || observed.draftRevisionId !== null || observed.scheduledAt !== null || observed.publishedAt !== publishedAt || observed.updatedAt !== updatedAt) return false;
	return Object.entries(revisionData).every(([key, value]) => SYSTEM_COLUMNS.has(key) || key.startsWith("_") || sameStoredValue(observed.data[key], value));
}
function matchesLifecyclePublication(observed, existing, liveRevisionId, publishedAt, updatedAt) {
	if (observed.version !== existing.version + 1 || observed.status !== "published" || observed.slug !== existing.slug || observed.liveRevisionId !== liveRevisionId || observed.draftRevisionId !== null || observed.scheduledAt !== null || observed.publishedAt !== publishedAt || observed.updatedAt !== updatedAt) return false;
	return Object.entries(existing.data).every(([key, value]) => sameStoredValue(observed.data[key], value));
}
function matchesPublicationFence(observed, existing) {
	return observed.version === existing.version && observed.status === existing.status && observed.liveRevisionId === existing.liveRevisionId && observed.draftRevisionId === existing.draftRevisionId && observed.scheduledAt === existing.scheduledAt;
}
function isConfirmedStatementFailure(error) {
	if (typeof error !== "object" || error === null || !("code" in error)) return false;
	const code = error.code;
	return typeof code === "string" && (code === "ERR_SQLITE_ERROR" || code.startsWith("SQLITE_") || SQLSTATE_PATTERN.test(code));
}
function encodeNullableOrderCursor(field, value, id) {
	return encodeCursor(JSON.stringify({
		version: 1,
		field,
		value
	}), id);
}
/**
* `acceptPlain` also accepts the plain `{ orderValue, id }` cursor that
* built-in and collection sort fields were paged with before, which wrote a
* NULL as "".
*/
function decodeNullableOrderCursor(cursor, field, { acceptPlain = false } = {}) {
	const { orderValue, id } = decodeCursor(cursor);
	let payload;
	try {
		payload = JSON.parse(orderValue);
	} catch {
		payload = void 0;
	}
	if (payload === null || typeof payload !== "object") {
		if (acceptPlain) return {
			value: orderValue === "" ? null : orderValue,
			id
		};
		throw new InvalidCursorError(cursor);
	}
	const candidate = payload;
	const validValue = candidate.value === null || typeof candidate.value === "string" || typeof candidate.value === "number";
	if (candidate.version !== 1 || candidate.field !== field || !validValue) throw new InvalidCursorError(cursor);
	return {
		value: candidate.value,
		id
	};
}
/**
* Keyset condition for the rows after (`value`, `cursorId`) in a sort by the
* nullable `column`, then `id`. The ORDER BY keeps each dialect's own NULL
* position, lowest on SQLite and highest on Postgres, so the condition follows
* it.
*/
function nullableOrderCondition(db, column, direction, value, cursorId) {
	const sort = sql.ref(column);
	const id = sql.ref("id");
	const cmp = direction === "ASC" ? sql.raw(">") : sql.raw("<");
	const nullsFirst = direction === "ASC" !== isPostgres(db);
	if (value === null) return nullsFirst ? sql`(${sort} IS NOT NULL OR ${id} ${cmp} ${cursorId})` : sql`(${sort} IS NULL AND ${id} ${cmp} ${cursorId})`;
	const past = sql`(${sort}, ${id}) ${cmp} (${value}, ${cursorId})`;
	return nullsFirst ? past : sql`(${past} OR ${sort} IS NULL)`;
}
/**
* Whitelist mapping a public date-filter field to its physical column. Keeping
* this separate from `mapOrderField` makes the filterable set explicit and
* prevents filtering on arbitrary columns.
*/
var DATE_FILTER_COLUMNS = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	publishedAt: "published_at"
};
/**
* Built-in sort fields → their physical columns. A closed set that blocks
* sorting by arbitrary columns; per-collection fields are allowed
* separately via `mapOrderField`'s `sortableExtras`.
*/
var ORDER_FIELD_COLUMNS = {
	createdAt: "created_at",
	updatedAt: "updated_at",
	publishedAt: "published_at",
	scheduledAt: "scheduled_at",
	deletedAt: "deleted_at",
	title: "title",
	name: "name",
	slug: "slug",
	status: "status",
	locale: "locale"
};
/**
* Order columns every row has a value for. Their cursors keep the plain
* `{ orderValue, id }` shape; a cursor for any other order column records a
* NULL explicitly.
*/
var NON_NULL_ORDER_COLUMNS = /* @__PURE__ */ new Set([
	"created_at",
	"updated_at",
	"status",
	"locale"
]);
/**
* System columns that exist in every ec_* table
*/
var SYSTEM_COLUMNS = /* @__PURE__ */ new Set([
	"id",
	"slug",
	"status",
	"author_id",
	"primary_byline_id",
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at",
	"version",
	"live_revision_id",
	"draft_revision_id",
	"locale",
	"translation_group"
]);
/**
* Get the table name for a collection type
*/
function getTableName(type) {
	validateIdentifier(type, "collection type");
	return `ec_${type}`;
}
function assertPageOffset(offset, cursor) {
	if (offset === void 0) return;
	if (cursor !== void 0) throw new EmDashValidationError("cursor and offset cannot be used together");
	if (!Number.isSafeInteger(offset) || offset < 0) throw new EmDashValidationError("offset must be a non-negative integer");
}
/**
* Serialize a value for database storage
* Objects/arrays are JSON-stringified
* Booleans are converted to 0/1 for SQLite
*/
function serializeValue(value) {
	if (value === null || value === void 0) return null;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (typeof value === "object") return JSON.stringify(value);
	return value;
}
function writableContentData(data) {
	const writable = {};
	for (const [key, value] of Object.entries(data)) {
		if (SYSTEM_COLUMNS.has(key)) continue;
		validateIdentifier(key, "content field name");
		writable[key] = value;
	}
	return writable;
}
/**
* Deserialize a value from database storage
* Attempts to parse JSON strings that look like objects/arrays
*/
function deserializeValue(value) {
	if (typeof value === "string") {
		if (value.startsWith("{") || value.startsWith("[")) try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	return value;
}
/** Pattern for escaping special regex characters */
var REGEX_ESCAPE_PATTERN = /[.*+?^${}()|[\]\\]/g;
/**
* Escape special regex characters in a string for use in `new RegExp()`
*/
function escapeRegExp(s) {
	return s.replace(REGEX_ESCAPE_PATTERN, "\\$&");
}
/**
* Repository for content CRUD operations
*
* Content is stored in per-collection tables (ec_posts, ec_pages, etc.)
* Each field becomes a real column in the table.
*/
var ContentRepository = class {
	db;
	datetimeContexts;
	datetimes;
	constructor(db, datetimeContexts) {
		this.db = db;
		this.datetimeContexts = datetimeContexts;
		this.datetimes = new ContentDatetimeNormalizer(db, datetimeContexts);
	}
	async assertAliasAwareSlugAvailable(type, slug, locale, excludeId) {
		if (!slug || !locale || getLocaleCandidates(locale).length <= 1) return;
		const tableName = getTableName(type);
		if ((await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE slug = ${slug}
			AND ${localeMatches("locale", locale)}
			${excludeId === void 0 ? sql`` : sql`AND id <> ${excludeId}
				AND coalesce((SELECT existing_row.slug FROM ${sql.ref(tableName)} AS existing_row WHERE existing_row.id = ${excludeId}), '') <> ${slug}`}
			LIMIT 1
		`.execute(this.db)).rows.length > 0) throw new ContentSlugConflictError();
	}
	/**
	* Create a new content item
	*/
	async create(input) {
		const id = input.id ?? ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const { type, slug, data: inputData, status = "draft", authorId, primaryBylineId, locale, translationOf, inheritFields = [], publishedAt, createdAt } = input;
		const data = await this.datetimes.normalizeInput(type, inputData);
		const normalizedCreatedAt = createdAt ? await this.datetimes.normalizeValue(type, createdAt) : now;
		const normalizedPublishedAt = publishedAt ? await this.datetimes.normalizeValue(type, publishedAt) : null;
		if (!type) throw new EmDashValidationError("Content type is required");
		const tableName = getTableName(type);
		if (translationOf && getLocaleCandidates(locale ?? "en").length > 1) {
			if ((await sql`
				SELECT sibling.id FROM ${sql.ref(tableName)} AS sibling
				INNER JOIN ${sql.ref(tableName)} AS source
					ON coalesce(source.translation_group, source.id) = sibling.translation_group
				WHERE source.id = ${translationOf} AND source.deleted_at IS NULL
					AND sibling.deleted_at IS NULL AND ${localeMatches("sibling.locale", locale ?? "en")}
				LIMIT 1
			`.execute(this.db)).rows.length > 0) throw new ContentMutationConflictError(`Translation already exists in locale "${locale ?? "en"}" for this content item`);
		}
		await this.assertAliasAwareSlugAvailable(type, slug, locale);
		const columns = [
			"id",
			"slug",
			"status",
			"author_id",
			"primary_byline_id",
			"created_at",
			"updated_at",
			"published_at",
			"version",
			"locale",
			"translation_group"
		];
		const values = [
			id,
			slug || null,
			status,
			authorId || null,
			primaryBylineId ?? null,
			normalizedCreatedAt,
			now,
			normalizedPublishedAt,
			1,
			locale || "en",
			id
		];
		const inherited = new Set(inheritFields);
		for (const field of inherited) {
			validateIdentifier(field, "inherited content field name");
			if (!SYSTEM_COLUMNS.has(field) && !Object.hasOwn(data, field)) {
				columns.push(field);
				values.push(null);
			}
		}
		if (data && typeof data === "object") {
			for (const [key, value] of Object.entries(data)) if (!SYSTEM_COLUMNS.has(key)) {
				validateIdentifier(key, "content field name");
				columns.push(key);
				values.push(serializeValue(value));
			}
		}
		const columnRefs = columns.map((c) => sql.ref(c));
		const valuePlaceholders = values.map((value, index) => {
			const column = columns[index];
			if (translationOf && column === "translation_group") return sql`COALESCE(${sql.ref("translation_source.translation_group")}, ${sql.ref("translation_source.id")})`;
			if (translationOf && inherited.has(column)) return sql.ref(`translation_source.${column}`);
			return value === null ? sql`NULL` : sql`${value}`;
		});
		if (translationOf) await sql`
				INSERT INTO ${sql.ref(tableName)} (${sql.join(columnRefs, sql`, `)})
				SELECT ${sql.join(valuePlaceholders, sql`, `)}
				FROM ${sql.ref(tableName)} AS translation_source
				WHERE translation_source.id = ${translationOf}
					AND translation_source.deleted_at IS NULL
			`.execute(this.db);
		else await sql`
				INSERT INTO ${sql.ref(tableName)} (${sql.join(columnRefs, sql`, `)})
				VALUES (${sql.join(valuePlaceholders, sql`, `)})
			`.execute(this.db);
		invalidateCollectionCache(type);
		const item = await this.findById(type, id);
		if (!item) {
			if (translationOf) throw new EmDashValidationError("Translation source content not found");
			throw new Error("Failed to create content");
		}
		return item;
	}
	/**
	* Generate a unique slug for a content item within a collection.
	*
	* Checks the collection table for existing slugs that match `baseSlug`
	* (optionally scoped to a locale) and appends a numeric suffix (`-1`,
	* `-2`, etc.) on collision to guarantee uniqueness.
	*
	* Returns null when slug normalization cannot produce a value.
	*/
	async generateUniqueSlug(type, text, locale) {
		const baseSlug = slugify(text);
		if (!baseSlug) return null;
		const tableName = getTableName(type);
		if ((locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					AND ${localeMatches("locale", locale)}
					LIMIT 1
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug}
					LIMIT 1
				`.execute(this.db)).rows.length === 0) return baseSlug;
		const pattern = `${baseSlug}-%`;
		const candidates = locale ? await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE (slug = ${baseSlug} OR slug LIKE ${pattern})
					AND ${localeMatches("locale", locale)}
				`.execute(this.db) : await sql`
					SELECT slug FROM ${sql.ref(tableName)}
					WHERE slug = ${baseSlug} OR slug LIKE ${pattern}
				`.execute(this.db);
		let maxSuffix = 0;
		const suffixPattern = new RegExp(`^${escapeRegExp(baseSlug)}-(\\d+)$`);
		for (const row of candidates.rows) {
			const match = suffixPattern.exec(row.slug);
			if (match) {
				const n = parseInt(match[1], 10);
				if (n > maxSuffix) maxSuffix = n;
			}
		}
		return `${baseSlug}-${maxSuffix + 1}`;
	}
	/**
	* Duplicate a content item
	* Creates a new draft copy with "(Copy)" appended to the title.
	* A slug is auto-generated from the new title by the handler layer.
	*/
	async duplicate(type, id, authorId) {
		const original = await this.findById(type, id);
		if (!original) throw new EmDashValidationError("Content item not found");
		const newData = { ...original.data };
		if (typeof newData.title === "string") newData.title = `${newData.title} (Copy)`;
		else if (typeof newData.name === "string") newData.name = `${newData.name} (Copy)`;
		const slugSource = typeof newData.title === "string" ? newData.title : typeof newData.name === "string" ? newData.name : null;
		const slug = slugSource ? await this.generateUniqueSlug(type, slugSource, original.locale ?? void 0) : null;
		return this.create({
			type,
			slug,
			data: newData,
			status: "draft",
			authorId: authorId || original.authorId || void 0,
			locale: original.locale ?? void 0
		});
	}
	/**
	* Find content by ID
	*/
	async findById(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	async findManyByIds(type, ids, options = {}) {
		const items = /* @__PURE__ */ new Map();
		if (ids.length === 0) return items;
		const tableName = getTableName(type);
		const deletedFilter = options.includeTrashed ? sql`` : sql`AND deleted_at IS NULL`;
		for (const batch of chunks([...new Set(ids)], 50)) {
			const result = await sql`
				SELECT * FROM ${sql.ref(tableName)}
				WHERE id IN (${sql.join(batch)}) ${deletedFilter}
			`.execute(this.db);
			for (const row of result.rows) {
				const item = this.mapRow(type, row);
				items.set(item.id, item);
			}
		}
		return items;
	}
	async findManyBySlugsInLocale(type, slugs, locale, options = {}) {
		const items = /* @__PURE__ */ new Map();
		if (slugs.length === 0) return items;
		const tableName = getTableName(type);
		const deletedFilter = options.includeTrashed ? sql`` : sql`AND deleted_at IS NULL`;
		const statusFilter = options.publishedOnly ? sql`AND status = ${"published"}` : sql``;
		for (const batch of chunks([...new Set(slugs)], 50)) {
			const result = await sql`
				SELECT * FROM ${sql.ref(tableName)}
				WHERE slug IN (${sql.join(batch)}) AND ${localeMatches("locale", locale)} ${deletedFilter} ${statusFilter}
				ORDER BY ${localeOrder("locale", locale)}, id ASC
			`.execute(this.db);
			for (const row of result.rows) {
				const item = this.mapRow(type, row);
				if (item.slug !== null && !items.has(item.slug)) items.set(item.slug, item);
			}
		}
		return items;
	}
	/**
	* Find content by id, including trashed (soft-deleted) items.
	* Used by restore endpoint for ownership checks.
	*
	* `deletedAt` rides along because the row is already in hand: a caller that
	* has to know whether the row is trashed before touching anything else would
	* otherwise pay a second read for a column this row already carries.
	*/
	async findByIdIncludingTrashed(type, id) {
		const tableName = getTableName(type);
		const row = (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE id = ${id}
		`.execute(this.db)).rows[0];
		if (!row) return null;
		return {
			...this.mapRow(type, row),
			deletedAt: typeof row.deleted_at === "string" ? row.deleted_at : null
		};
	}
	/**
	* Find content by ID or slug. Tries ID first if it looks like a ULID,
	* otherwise tries slug. Falls back to the other if the first lookup misses.
	*/
	async findByIdOrSlug(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, false, locale);
	}
	/**
	* Find content by ID or slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findByIdOrSlugIncludingTrashed(type, identifier, locale) {
		return this._findByIdOrSlug(type, identifier, true, locale);
	}
	async isTrashed(type, id) {
		const tableName = getTableName(type);
		return await this.db.selectFrom(tableName).select("id").where("id", "=", id).where("deleted_at", "is not", null).executeTakeFirst() !== void 0;
	}
	async _findByIdOrSlug(type, identifier, includeTrashed, locale) {
		const looksLikeUlid = ULID_PATTERN.test(identifier);
		const findById = includeTrashed ? (t, id) => this.findByIdIncludingTrashed(t, id) : (t, id) => this.findById(t, id);
		const findBySlug = includeTrashed ? (t, s) => this.findBySlugIncludingTrashed(t, s, locale) : (t, s) => this.findBySlug(t, s, locale);
		try {
			if (looksLikeUlid) {
				const byId = await findById(type, identifier);
				if (byId) return byId;
				return await findBySlug(type, identifier);
			}
			const bySlug = await findBySlug(type, identifier);
			if (bySlug) return bySlug;
			return await findById(type, identifier);
		} catch (error) {
			if (isMissingTableError(error)) return null;
			throw error;
		}
	}
	/**
	* Find content by slug
	*/
	async findBySlug(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND ${localeMatches("locale", locale)}
					AND deleted_at IS NULL
					ORDER BY ${localeOrder("locale", locale)}, id ASC
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND deleted_at IS NULL
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find content by slug, including trashed (soft-deleted) items.
	* Used by restore/permanent-delete endpoints.
	*/
	async findBySlugIncludingTrashed(type, slug, locale) {
		const tableName = getTableName(type);
		const row = (locale ? await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					AND ${localeMatches("locale", locale)}
					ORDER BY ${localeOrder("locale", locale)}, id ASC
				`.execute(this.db) : await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug = ${slug}
					ORDER BY locale ASC
					LIMIT 1
				`.execute(this.db)).rows[0];
		if (!row) return null;
		return this.mapRow(type, row);
	}
	/**
	* Find many content items with filtering and pagination
	*/
	async findMany(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		assertPageOffset(options.offset, options.cursor);
		const orderField = options.orderBy?.field || "createdAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const resolvedOrderField = await this.resolveOrderField(type, orderField, options.sortableExtras);
		const dbField = resolvedOrderField.column;
		const nullableOrder = resolvedOrderField.indexedCustomField || !NON_NULL_ORDER_COLUMNS.has(dbField);
		const resolvedFieldFilters = await this.resolveFieldFilters(type, options.where?.fieldFilters);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is", null);
		if (options.where?.status) query = query.where("status", "=", options.where.status);
		if (options.where?.authorId) query = query.where("author_id", "=", options.where.authorId);
		if (options.where?.locale) query = query.where(localeMatches("locale", options.where.locale));
		query = this.applySearchFilter(query, options.where, type);
		query = this.applyDateFilter(query, options.where);
		query = this.applyBylineFilter(query, options.where, type);
		query = this.applyFieldFilters(query, resolvedFieldFilters);
		if (options.cursor) {
			if (resolvedOrderField.indexedCustomField) {
				const { value, id: cursorId } = decodeNullableOrderCursor(options.cursor, orderField);
				const isPresent = sql`${sql.ref(dbField)} IS NOT NULL`;
				const falseLiteral = sql`FALSE`;
				const trueLiteral = sql`TRUE`;
				if (safeOrderDirection === "ASC" && value === null) query = query.where(sql`(
						(${isPresent}) > ${falseLiteral}
						OR ((${isPresent}) = ${falseLiteral} AND ${sql.ref("id")} > ${cursorId})
					)`);
				else if (safeOrderDirection === "DESC" && value === null) query = query.where(sql`
						(${isPresent}) = ${falseLiteral} AND ${sql.ref("id")} < ${cursorId}
					`);
				else if (safeOrderDirection === "ASC") query = query.where(sql`
						(${isPresent}, ${sql.ref(dbField)}, ${sql.ref("id")})
							> (${trueLiteral}, ${value}, ${cursorId})
					`);
				else query = query.where(sql`
						(${isPresent}, ${sql.ref(dbField)}, ${sql.ref("id")})
							< (${trueLiteral}, ${value}, ${cursorId})
					`);
			} else if (nullableOrder) {
				const { value, id: cursorId } = decodeNullableOrderCursor(options.cursor, orderField, { acceptPlain: true });
				query = query.where(nullableOrderCondition(this.db, dbField, safeOrderDirection, value, cursorId));
			} else {
				const { orderValue, id: cursorId } = decodeCursor(options.cursor);
				if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
				else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
			}
		}
		const indexedOrderFilter = resolvedOrderField.indexedCustomField ? resolvedFieldFilters.find((filter) => filter.column === dbField) : void 0;
		if (resolvedOrderField.indexedCustomField && !indexedOrderFilter) query = query.orderBy(sql`${sql.ref(dbField)} IS NOT NULL`, safeOrderDirection === "ASC" ? "asc" : "desc");
		if (indexedOrderFilter?.kind !== "null") query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc");
		query = query.orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc");
		query = options.offset === void 0 ? query.limit(limit + 1) : query.limit(limit).offset(options.offset);
		const [rowsResult, countResult] = await Promise.allSettled([query.execute(), this.countWithResolvedFilters(type, options.where, resolvedFieldFilters)]);
		if (rowsResult.status === "rejected") throw rowsResult.reason;
		if (countResult.status === "rejected") throw countResult.reason;
		const rows = rowsResult.value;
		const total = countResult.value;
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = {
			items: items.map((row) => this.mapRow(type, row)),
			total
		};
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			if (nullableOrder) {
				if (lastOrderValue !== null && typeof lastOrderValue !== "string" && typeof lastOrderValue !== "number") throw new EmDashValidationError(`Invalid value for order field: ${orderField}`);
				mappedResult.nextCursor = encodeNullableOrderCursor(orderField, lastOrderValue, String(lastRow.id));
			} else mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Update content
	*/
	async update(type, id, input, expectedRevision) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.assertAliasAwareSlugAvailable(type, input.slug, input.locale, id);
		const updates = {};
		if (input.status !== void 0) updates.status = input.status;
		if (input.slug !== void 0) updates.slug = input.slug;
		if (input.publishedAt !== void 0) updates.published_at = input.publishedAt === null ? null : await this.datetimes.normalizeValue(type, input.publishedAt);
		if (input.scheduledAt !== void 0) updates.scheduled_at = input.scheduledAt === null ? null : await this.datetimes.normalizeValue(type, input.scheduledAt);
		if (input.authorId !== void 0) updates.author_id = input.authorId;
		if (input.primaryBylineId !== void 0) updates.primary_byline_id = input.primaryBylineId;
		if (input.data !== void 0 && typeof input.data === "object") {
			const data = await this.datetimes.normalizeInput(type, writableContentData(input.data));
			for (const [key, value] of Object.entries(data)) updates[key] = serializeValue(value);
		}
		const hasColumnWrites = Object.keys(updates).length > 0;
		if (hasColumnWrites) updates.updated_at = now;
		if (input.draftRevisionId === null) updates.draft_revision_id = null;
		updates.version = sql`version + 1`;
		let query = this.db.updateTable(tableName).set(updates).where("id", "=", id).where("deleted_at", "is", null);
		if (expectedRevision) query = query.where(sql`version = ${expectedRevision.version}`).where(sql`updated_at = ${expectedRevision.updatedAt}`);
		const result = await query.executeTakeFirst();
		if (expectedRevision && result.numUpdatedRows === 0n) throw new ContentMutationConflictError();
		if (hasColumnWrites) invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	async restoreRevision(type, id, revisionData, authorId) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const normalizedSnapshot = await this.datetimes.normalizeData(type, revisionData);
		const { _slug } = normalizedSnapshot;
		const snapshotFields = {};
		for (const [key, value] of Object.entries(normalizedSnapshot)) if (!key.startsWith("_")) snapshotFields[key] = value;
		const fieldData = writableContentData(snapshotFields);
		const revisionId = createRevisionId();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const assignments = [];
		if (typeof _slug === "string") assignments.push(sql`slug = ${_slug}`);
		for (const [field, value] of Object.entries(fieldData)) {
			validateIdentifier(field, "content field name");
			assignments.push(sql`${sql.ref(field)} = ${serializeValue(value)}`);
		}
		assignments.push(sql`draft_revision_id = ${revisionId}`, sql`updated_at = ${now}`, sql`version = version + 1`);
		const buildQueries = () => {
			return [
				sql`
				INSERT INTO revisions (id, collection, entry_id, data, author_id)
				VALUES (${revisionId}, ${type}, ${id}, ${JSON.stringify(normalizedSnapshot)}, ${authorId})
				RETURNING id
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET ${sql.join(assignments, sql`, `)}
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
				RETURNING id
			`,
				sql`
				DELETE FROM revisions
				WHERE id = ${revisionId}
				AND NOT EXISTS (
					SELECT 1 FROM ${sql.ref(tableName)}
					WHERE id = ${id}
					AND draft_revision_id = ${revisionId}
					AND version = ${existing.version + 1}
				)
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET draft_revision_id = ${existing.draftRevisionId}
				WHERE id = ${id}
				AND draft_revision_id = ${revisionId}
				AND version = ${existing.version + 1}
				RETURNING id
			`
			];
		};
		const batched = await executeAtomicBatchIfSupported(this.db, buildQueries());
		if (batched) {
			if (batched[0]?.rows.length !== 1 || batched[1]?.rows.length !== 1 || batched[3]?.rows.length !== 1) throw new ContentMutationConflictError();
		} else await withTransaction(this.db, async (trx) => {
			const [audit, update, removeUnappliedAudit, releaseMarker] = buildQueries();
			if ((await audit.execute(trx)).rows.length !== 1) throw new ContentMutationConflictError();
			const updateResult = await update.execute(trx);
			await removeUnappliedAudit.execute(trx);
			const releaseResult = await releaseMarker.execute(trx);
			if (updateResult.rows.length !== 1 || releaseResult.rows.length !== 1) throw new ContentMutationConflictError();
		});
		invalidateCollectionCache(type);
		const item = await this.findById(type, id);
		if (!item) throw new Error("Content not found");
		await new RevisionRepository(this.db, this.datetimeContexts).queuePruning(type, id, revisionId);
		return {
			item,
			revisionId
		};
	}
	async restoreDraftRevision(type, id, revisionData, authorId) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) return null;
		const normalizedSnapshot = await this.datetimes.normalizeData(type, revisionData);
		const revisionId = createRevisionId();
		const buildQueries = () => {
			return [
				sql`
				INSERT INTO revisions (id, collection, entry_id, data, author_id)
				VALUES (${revisionId}, ${type}, ${id}, ${JSON.stringify(normalizedSnapshot)}, ${authorId})
				RETURNING id
			`,
				sql`
				UPDATE ${sql.ref(tableName)}
				SET draft_revision_id = ${revisionId},
					version = version + 1
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
				RETURNING id
			`,
				sql`
				DELETE FROM revisions
				WHERE id = ${revisionId}
				AND NOT EXISTS (
					SELECT 1 FROM ${sql.ref(tableName)}
					WHERE id = ${id}
					AND draft_revision_id = ${revisionId}
					AND version = ${existing.version + 1}
				)
			`
			];
		};
		const batched = await executeAtomicBatchIfSupported(this.db, buildQueries());
		if (batched) {
			if (batched[0]?.rows.length !== 1 || batched[1]?.rows.length !== 1) throw new ContentMutationConflictError();
		} else await withTransaction(this.db, async (trx) => {
			const [audit, stage, removeUnstagedAudit] = buildQueries();
			if ((await audit.execute(trx)).rows.length !== 1) throw new ContentMutationConflictError();
			const stageResult = await stage.execute(trx);
			await removeUnstagedAudit.execute(trx);
			if (stageResult.rows.length !== 1) throw new ContentMutationConflictError();
		});
		invalidateCollectionCache(type);
		await new RevisionRepository(this.db, this.datetimeContexts).queuePruning(type, id, revisionId);
		return revisionId;
	}
	/**
	* Update plugin-authored fields without letting content columns diverge
	* from the revision pointers that publication promotes.
	*/
	async updateDraftAware(type, id, input) {
		const data = input.data ? await this.datetimes.normalizeInput(type, writableContentData(input.data)) : {};
		const stagedSlug = typeof input.slug === "string" ? input.slug : void 0;
		if (!(Object.keys(data).length > 0 || stagedSlug !== void 0)) return this.update(type, id, {
			...input,
			data
		});
		const collectionRows = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", "field.collection_id", "collection.id").select(["collection.supports", "field.slug as fieldSlug"]).where("collection.slug", "=", type).execute();
		const supportsRaw = collectionRows[0]?.supports;
		const supports = supportsRaw ? JSON.parse(supportsRaw) : [];
		if (!Array.isArray(supports) || !supports.includes("revisions")) return this.update(type, id, {
			...input,
			data,
			draftRevisionId: null
		});
		const fieldSlugs = new Set(collectionRows.map((row) => row.fieldSlug).filter((slug) => Boolean(slug)));
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let existing = await this.findById(type, id);
		let incoming = data;
		if (existing) {
			let stored = existing.data ?? {};
			if (existing.draftRevisionId) {
				const draft = await revisionRepo.findById(existing.draftRevisionId);
				if (draft?.data) stored = {
					...stored,
					...draft.data
				};
			}
			const stale = staleStoredKeys(data, stored, fieldSlugs);
			if (stale.length > 0) {
				incoming = { ...data };
				for (const key of stale) delete incoming[key];
			}
		}
		for (const field of Object.keys(incoming)) if (!fieldSlugs.has(field)) throw new EmDashValidationError(`Unknown field '${field}' in collection '${type}'`);
		for (let attempt = 0; existing && attempt < MAX_DRAFT_STAGE_ATTEMPTS; attempt++) {
			let baseData = existing.data;
			if (existing.draftRevisionId) {
				const draft = await revisionRepo.findById(existing.draftRevisionId);
				if (draft) baseData = draft.data;
			}
			const mergedData = keepKnownFields({
				...baseData,
				...incoming
			}, fieldSlugs);
			if (stagedSlug !== void 0) mergedData._slug = stagedSlug;
			const revision = await revisionRepo.create({
				collection: type,
				entryId: id,
				data: mergedData,
				...input.revisionAuthorId ? { authorId: input.revisionAuthorId } : {}
			});
			let staged;
			try {
				staged = await this.replaceDraftRevisionForUpdate(type, id, revision.id, existing, input);
			} catch (error) {
				await this.deleteUnstagedRevision(revisionRepo, type, id, revision.id);
				throw error;
			}
			if (staged) {
				const updated = await this.findById(type, id);
				if (!updated) throw new Error("Content not found");
				const draftData = {};
				for (const [key, value] of Object.entries(mergedData)) if (!key.startsWith("_")) draftData[key] = value;
				return {
					...updated,
					data: {
						...updated.data,
						...draftData
					}
				};
			}
			await this.deleteUnstagedRevision(revisionRepo, type, id, revision.id);
			existing = await this.findById(type, id);
		}
		if (!existing) throw new Error("Content not found");
		throw new ContentMutationConflictError();
	}
	async deleteUnstagedRevision(revisionRepo, type, id, revisionId) {
		try {
			await revisionRepo.deleteIfUnreferenced(type, id, revisionId);
		} catch (error) {
			console.error(`[content] Failed to clean up unstaged revision ${revisionId}:`, error);
		}
	}
	async replaceDraftRevisionForUpdate(type, id, revisionId, expected, input) {
		const tableName = getTableName(type);
		const assignments = [sql`draft_revision_id = ${revisionId}`];
		let liveMetadataChanged = false;
		if (input.status !== void 0) {
			assignments.push(sql`status = ${input.status}`);
			liveMetadataChanged = true;
		}
		if (input.slug === null) {
			assignments.push(sql`slug = NULL`);
			liveMetadataChanged = true;
		}
		if (input.publishedAt !== void 0) {
			const publishedAt = input.publishedAt === null ? null : await this.datetimes.normalizeValue(type, input.publishedAt);
			assignments.push(sql`published_at = ${publishedAt}`);
			liveMetadataChanged = true;
		}
		if (input.scheduledAt !== void 0) {
			const scheduledAt = input.scheduledAt === null ? null : await this.datetimes.normalizeValue(type, input.scheduledAt);
			assignments.push(sql`scheduled_at = ${scheduledAt}`);
			liveMetadataChanged = true;
		}
		if (input.authorId !== void 0) {
			assignments.push(sql`author_id = ${input.authorId}`);
			liveMetadataChanged = true;
		}
		if (input.primaryBylineId !== void 0) {
			assignments.push(sql`primary_byline_id = ${input.primaryBylineId}`);
			liveMetadataChanged = true;
		}
		if (liveMetadataChanged) assignments.push(sql`updated_at = ${(/* @__PURE__ */ new Date()).toISOString()}`);
		assignments.push(sql`version = version + 1`);
		const changed = ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET ${sql.join(assignments, sql`, `)}
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${expected.version}
			AND ${nullableColumnMatch("live_revision_id", expected.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", expected.draftRevisionId)}
			AND EXISTS (
				SELECT 1 FROM revisions
				WHERE revisions.id = ${revisionId}
				AND revisions.collection = ${type}
				AND revisions.entry_id = ${id}
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed && liveMetadataChanged) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Copy non-translatable field values to every other entry in the
	* translation group, trashed entries included.
	*
	* Only the fields present in `data` are copied. With `previous`, `data` is
	* the entry's complete new state and only the fields whose value differs
	* from `previous` are copied, an absent field as null. An entry that already
	* holds every copied value is left untouched, so its `updated_at` does not
	* move.
	*
	* On collections with revisions a changed entry also gets a new live
	* revision, because republishing and unpublishing read that revision rather
	* than the columns. A pending draft takes a value only where it still holds
	* the entry's previous value, so an unpublished edit to the field survives.
	*/
	async syncNonTranslatableFields(type, sourceId, translationGroup, data, options = {}) {
		const tableName = getTableName(type);
		const collectionRows = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", (join) => join.onRef("field.collection_id", "=", "collection.id").on("field.translatable", "=", 0)).select(["collection.supports", "field.slug as fieldSlug"]).where("collection.slug", "=", type).execute();
		const { previous } = options;
		const values = {};
		for (const { fieldSlug } of collectionRows) {
			if (!fieldSlug) continue;
			if (previous) {
				if (!sameStoredValue(previous[fieldSlug], data[fieldSlug])) values[fieldSlug] = data[fieldSlug] ?? null;
			} else if (fieldSlug in data) values[fieldSlug] = data[fieldSlug];
		}
		if (Object.keys(values).length === 0) return;
		const normalizedValues = await this.datetimes.normalizeData(type, values);
		const supportsRaw = collectionRows[0]?.supports;
		const supports = supportsRaw ? JSON.parse(supportsRaw) : [];
		const usesRevisions = Array.isArray(supports) && supports.includes("revisions");
		const siblings = await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND id != ${sourceId}
		`.execute(this.db);
		let changed = false;
		for (const row of siblings.rows) if (await this.syncSiblingValues(type, this.mapRow(type, row), normalizedValues, usesRevisions)) changed = true;
		if (changed) invalidateCollectionCache(type);
	}
	async syncSiblingValues(type, initial, values, usesRevisions) {
		const tableName = getTableName(type);
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let sibling = initial;
		for (let attempt = 0; sibling && attempt < MAX_DRAFT_STAGE_ATTEMPTS; attempt++) {
			const current = sibling;
			const changed = {};
			for (const [field, value] of Object.entries(values)) if (!sameStoredValue(current.data[field], value)) changed[field] = value;
			if (Object.keys(changed).length === 0) return false;
			const assignments = [];
			for (const [field, value] of Object.entries(changed)) {
				validateIdentifier(field, "content field name");
				assignments.push(sql`${sql.ref(field)} = ${serializeValue(value)}`);
			}
			const createdRevisionIds = [];
			const cleanUp = async () => {
				for (const revisionId of createdRevisionIds) await this.deleteUnstagedRevision(revisionRepo, type, current.id, revisionId);
			};
			let synced;
			try {
				const live = usesRevisions && current.liveRevisionId ? await revisionRepo.findById(current.liveRevisionId) : null;
				if (live) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: current.id,
						data: {
							...live.data,
							...changed
						}
					});
					createdRevisionIds.push(revision.id);
					assignments.push(sql`live_revision_id = ${revision.id}`);
				}
				const draft = usesRevisions && current.draftRevisionId ? await revisionRepo.findById(current.draftRevisionId) : null;
				const carried = {};
				for (const [field, value] of Object.entries(changed)) if (draft && sameStoredValue(draft.data[field], current.data[field])) carried[field] = value;
				if (draft && Object.keys(carried).length > 0) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: current.id,
						data: {
							...draft.data,
							...carried
						}
					});
					createdRevisionIds.push(revision.id);
					assignments.push(sql`draft_revision_id = ${revision.id}`);
				}
				assignments.push(sql`updated_at = ${(/* @__PURE__ */ new Date()).toISOString()}`, sql`version = version + 1`);
				synced = ((await sql`
					UPDATE ${sql.ref(tableName)}
					SET ${sql.join(assignments, sql`, `)}
					WHERE id = ${current.id}
					AND version = ${current.version}
					AND ${nullableColumnMatch("live_revision_id", current.liveRevisionId)}
					AND ${nullableColumnMatch("draft_revision_id", current.draftRevisionId)}
				`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
			} catch (error) {
				await cleanUp();
				throw error;
			}
			if (synced) return true;
			await cleanUp();
			sibling = await this.findByIdIncludingTrashed(type, current.id);
		}
		if (!sibling) return false;
		throw new ContentMutationConflictError();
	}
	/**
	* Delete content (soft delete - moves to trash)
	*/
	async delete(type, id) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const changed = ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Restore content from trash
	*
	* The entry comes back as a draft with no schedule. The live version is not
	* copied into a draft revision: collections without revisions save to the
	* columns, and a draft revision would hide those saves.
	*/
	async restore(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const existing = await this.findByIdOrSlugIncludingTrashed(type, id);
		if (!existing) return null;
		assertRevisionPrecondition(existing, expectedRevision);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const restored = (await sql`
			UPDATE ${sql.ref(tableName)}
			SET deleted_at = NULL,
				live_revision_id = NULL,
				status = 'draft',
				scheduled_at = NULL,
				updated_at = ${now},
				version = ${existing.version + 1}
			WHERE id = ${existing.id}
			AND deleted_at IS NOT NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			RETURNING *
		`.execute(this.db)).rows[0];
		if (!restored) throw new ContentMutationConflictError("Content changed while restoring");
		invalidateCollectionCache(type);
		return this.mapRow(type, restored);
	}
	/**
	* Permanently delete content (cannot be undone)
	*/
	/**
	* Permanently delete a soft-deleted content row.
	*
	* Returns `true` only when a soft-deleted (trashed) row was removed.
	* Returns `false` when no row exists OR when the row exists but is live —
	* the caller is responsible for distinguishing these cases (typically via
	* a follow-up `findByIdOrSlugIncludingTrashed` to surface NOT_FOUND vs
	* NOT_TRASHED). The `AND deleted_at IS NOT NULL` clause is the safety net
	* that prevents permanent delete from bypassing the trash workflow.
	*/
	async permanentDelete(type, id) {
		const tableName = getTableName(type);
		const changed = ((await sql`
			DELETE FROM ${sql.ref(tableName)}
			WHERE id = ${id}
			AND deleted_at IS NOT NULL
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
		if (changed) invalidateCollectionCache(type);
		return changed;
	}
	/**
	* Find trashed content items
	*/
	async findTrashed(type, options = {}) {
		const tableName = getTableName(type);
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		assertPageOffset(options.offset, options.cursor);
		const orderField = options.orderBy?.field || "deletedAt";
		const orderDirection = options.orderBy?.direction || "desc";
		const dbField = this.mapOrderField(orderField);
		const safeOrderDirection = orderDirection.toLowerCase() === "asc" ? "ASC" : "DESC";
		let query = this.db.selectFrom(tableName).selectAll().where("deleted_at", "is not", null);
		if (options.where?.locale) query = query.where(localeMatches("locale", options.where.locale));
		if (options.cursor) {
			const { orderValue, id: cursorId } = decodeCursor(options.cursor);
			if (safeOrderDirection === "DESC") query = query.where((eb) => eb.or([eb(dbField, "<", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", "<", cursorId)])]));
			else query = query.where((eb) => eb.or([eb(dbField, ">", orderValue), eb.and([eb(dbField, "=", orderValue), eb("id", ">", cursorId)])]));
		}
		query = query.orderBy(dbField, safeOrderDirection === "ASC" ? "asc" : "desc").orderBy("id", safeOrderDirection === "ASC" ? "asc" : "desc");
		query = options.offset === void 0 ? query.limit(limit + 1) : query.limit(limit).offset(options.offset);
		const rows = await query.execute();
		const hasMore = rows.length > limit;
		const items = rows.slice(0, limit);
		const mappedResult = { items: items.map((row) => {
			const record = row;
			return {
				...this.mapRow(type, record),
				deletedAt: typeof record.deleted_at === "string" ? record.deleted_at : ""
			};
		}) };
		if (hasMore && items.length > 0) {
			const lastRow = items.at(-1);
			const lastOrderValue = lastRow[dbField];
			mappedResult.nextCursor = encodeCursor(typeof lastOrderValue === "string" || typeof lastOrderValue === "number" ? String(lastOrderValue) : "", String(lastRow.id));
		}
		return mappedResult;
	}
	/**
	* Count trashed content items
	*/
	async countTrashed(type, options = {}) {
		const tableName = getTableName(type);
		let query = this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is not", null);
		if (options.locale) query = query.where(localeMatches("locale", options.locale));
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Apply the optional `q` filter.
	*
	* When the handler sets `useFts` (collection has a healthy FTS5 index
	* covering the display columns; SQLite only), the filter is served from
	* the index: a token-prefix MATCH against `_emdash_fts_<slug>` OR'd with
	* an index-served `slug GLOB 'term*'` prefix (the slug is not in the FTS
	* index). Both sides are index-backed, so SQLite's OR optimization avoids
	* the full-table scan the LIKE fallback needs (#1517). The trade-off is
	* search semantics: token-prefix matching instead of arbitrary substring.
	*
	* Fallback (Postgres, search disabled, or no usable terms): case-
	* insensitive substring LIKE across the handler-resolved `searchColumns`
	* (OR'd). User input is treated literally (LIKE wildcards escaped) and
	* `lower()` is applied on both sides for SQLite/Postgres parity.
	*/
	applySearchFilter(query, where, type) {
		const term = where?.q?.trim();
		const columns = where?.searchColumns;
		if (!term || !columns || columns.length === 0) return query;
		if (where.useFts) {
			const match = buildFtsPrefixMatch(term);
			if (match) {
				validateIdentifier(type, "collection slug");
				const ftsTable = `_emdash_fts_${type}`;
				const slugPrefix = buildSlugGlobPrefix(term);
				return query.where((eb) => eb.or([sql`id IN (SELECT id FROM ${sql.ref(ftsTable)} WHERE ${sql.ref(ftsTable)} MATCH ${match})`, sql`slug GLOB ${slugPrefix}`]));
			}
		}
		const pattern = `%${term.replace(LIKE_WILDCARD_RE, (c) => `\\${c}`)}%`;
		return query.where((eb) => eb.or(columns.map((col) => {
			validateIdentifier(col, "search column");
			return sql`lower(CAST(${sql.ref(col)} AS TEXT)) LIKE lower(${pattern}) ESCAPE '\\'`;
		})));
	}
	/**
	* Apply the optional inclusive date-range filter. The field is mapped
	* through `DATE_FILTER_COLUMNS` (a closed whitelist), and bounds compare
	* lexicographically against the stored ISO 8601 timestamps. A `publishedAt`
	* range naturally excludes never-published rows (their column is NULL).
	*/
	applyDateFilter(query, where) {
		const filter = where?.dateFilter;
		if (!filter) return query;
		const column = DATE_FILTER_COLUMNS[filter.field];
		if (!column) throw new EmDashValidationError(`Invalid date filter field: ${filter.field}`);
		const { from, to } = filter;
		if (!from && !to) return query;
		let next = query;
		if (from) next = next.where((eb) => eb(column, ">=", from));
		if (to) next = next.where((eb) => eb(column, "<=", to));
		return next;
	}
	/**
	* Apply the optional byline filter as a correlated (NOT) EXISTS against
	* `_emdash_content_bylines`.
	*
	* Correlating from the content table preserves the outer sort index so
	* `LIMIT` can short-circuit. `mode: "none"` tests the junction rather than
	* `primary_byline_id` because the two are written in the same call but
	* are not atomically consistent, so the junction is authoritative.
	*
	* Whether a credit *renders* is locale-scoped; whether one *exists* is
	* not. Both are needed: the first decides what the filter matches, the
	* second decides whether the author fallback applies at all.
	*/
	applyBylineFilter(query, where, type) {
		const filter = where?.bylineFilter;
		if (!filter) return query;
		const tableName = getTableName(type);
		const idColumn = `${tableName}.id`;
		const authorColumn = `${tableName}.author_id`;
		const localeColumn = `${tableName}.locale`;
		const creditRenders = (eb, bylineIds) => {
			let sub = eb.selectFrom("_emdash_content_bylines as cb").innerJoin("_emdash_bylines as b", "b.translation_group", "cb.byline_id").select("cb.id").where("cb.collection_slug", "=", type).whereRef("cb.content_id", "=", idColumn);
			sub = filter.locale ? sub.where(localeMatches("b.locale", filter.locale)) : sub.where(sql`${canonicalLocaleColumn("b.locale")} = ${canonicalLocaleColumn(localeColumn)}`);
			if (bylineIds) sub = sub.where("cb.byline_id", "in", bylineIds);
			return eb.exists(sub);
		};
		const hasExplicitCredit = (eb) => eb.exists(eb.selectFrom("_emdash_content_bylines as cb").select("cb.id").where("cb.collection_slug", "=", type).whereRef("cb.content_id", "=", idColumn));
		const authorHasByline = (eb, bylineIds) => {
			let sub = eb.selectFrom("_emdash_bylines as b").select("b.id").whereRef("b.user_id", "=", authorColumn);
			sub = filter.locale ? sub.where(localeMatches("b.locale", filter.locale)) : sub.where(sql`${canonicalLocaleColumn("b.locale")} = ${canonicalLocaleColumn(localeColumn)}`);
			if (bylineIds) sub = sub.where("b.translation_group", "in", bylineIds);
			return eb.exists(sub);
		};
		if (filter.mode === "none") return query.where((eb) => {
			const uncredited = eb.not(creditRenders(eb));
			return filter.includeInferred ? eb.and([uncredited, eb.or([hasExplicitCredit(eb), eb.not(authorHasByline(eb))])]) : uncredited;
		});
		const bylineIds = filter.bylineIds ?? [];
		if (bylineIds.length === 0) return query.where(() => sql`1 = 0`);
		return query.where((eb) => {
			if (!filter.includeInferred) return creditRenders(eb, bylineIds);
			return eb.or([creditRenders(eb, bylineIds), eb.and([eb.not(hasExplicitCredit(eb)), authorHasByline(eb, bylineIds)])]);
		});
	}
	/**
	* Count content items
	*/
	async count(type, where) {
		const resolvedFieldFilters = await this.resolveFieldFilters(type, where?.fieldFilters);
		return this.countWithResolvedFilters(type, where, resolvedFieldFilters);
	}
	async countWithResolvedFilters(type, where, resolvedFieldFilters) {
		const tableName = getTableName(type);
		let query = this.db.selectFrom(tableName).select((eb) => eb.fn.count("id").as("count")).where("deleted_at", "is", null);
		if (where?.status) query = query.where("status", "=", where.status);
		if (where?.authorId) query = query.where("author_id", "=", where.authorId);
		if (where?.locale) query = query.where(localeMatches("locale", where.locale));
		query = this.applySearchFilter(query, where, type);
		query = this.applyDateFilter(query, where);
		query = this.applyBylineFilter(query, where, type);
		query = this.applyFieldFilters(query, resolvedFieldFilters);
		const result = await query.executeTakeFirst();
		return Number(result?.count || 0);
	}
	/**
	* Distinct, non-null `author_id` values across the collection's live
	* (non-trashed) content. Used to populate the admin author filter with
	* only the users who have actually authored entries, rather than the
	* full user directory (which requires admin privileges to read).
	*/
	async findDistinctAuthorIds(type) {
		const tableName = getTableName(type);
		return (await this.db.selectFrom(tableName).select("author_id").distinct().where("deleted_at", "is", null).where("author_id", "is not", null).execute()).map((row) => row.author_id).filter((id) => id !== null);
	}
	async getStats(type, now = /* @__PURE__ */ new Date()) {
		const tableName = getTableName(type);
		const nowIso = now.toISOString();
		const result = await this.db.selectFrom(tableName).select((eb) => [
			eb.fn.count("id").as("total"),
			eb.fn.sum(eb.case().when("status", "=", "published").then(1).else(0).end()).as("published"),
			eb.fn.sum(eb.case().when("status", "=", "draft").then(1).else(0).end()).as("draft"),
			sql`SUM(CASE WHEN scheduled_at IS NOT NULL THEN 1 ELSE 0 END)`.as("scheduled"),
			sql`SUM(CASE WHEN scheduled_at IS NOT NULL AND scheduled_at <= ${nowIso} THEN 1 ELSE 0 END)`.as("overdue_scheduled")
		]).where("deleted_at", "is", null).executeTakeFirst();
		return {
			total: Number(result?.total || 0),
			published: Number(result?.published || 0),
			draft: Number(result?.draft || 0),
			scheduled: Number(result?.scheduled || 0),
			overdueScheduled: Number(result?.overdue_scheduled || 0)
		};
	}
	/**
	* Schedule content for future publishing
	*
	* Sets status to 'scheduled' and stores the scheduled publish time.
	* The content will be auto-published when the scheduled time is reached.
	*/
	async schedule(type, id, scheduledAt, currentTime = /* @__PURE__ */ new Date(), expectedRevision) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const normalizedScheduledAt = await this.datetimes.normalizeValue(type, scheduledAt);
		if (new Date(normalizedScheduledAt) <= currentTime) throw new EmDashValidationError("Scheduled date must be in the future");
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const newStatus = existing.status === "published" ? "published" : "scheduled";
		if (((await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = ${normalizedScheduledAt},
				updated_at = ${now}
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError("Content changed while scheduling");
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Unschedule content
	*
	* Clears the scheduled time. Published posts stay published;
	* draft/scheduled posts revert to 'draft'.
	*/
	async unschedule(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const newStatus = existing.status === "published" ? "published" : "draft";
		const result = await sql`
			UPDATE ${sql.ref(tableName)}
			SET status = ${newStatus},
				scheduled_at = NULL,
				updated_at = ${now}
			WHERE id = ${id}
			AND scheduled_at IS NOT NULL
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db);
		if (existing.scheduledAt !== null && (result.numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError("Content changed while unscheduling");
		invalidateCollectionCache(type);
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Find content that is ready to be published
	*
	* Returns all content where scheduled_at <= now, regardless of status.
	* This covers both draft-scheduled posts (status='scheduled') and
	* published posts with scheduled draft changes (status='published').
	*
	* `limit` (optional) caps how many due rows are returned, oldest-due first.
	* The scheduled-publishing sweep passes a limit so a large backlog can't
	* fan out unbounded publish/webhook work in a single tick (and blow a Worker
	* invocation's CPU/subrequest budget); the remainder drains on later ticks.
	*/
	async findReadyToPublish(type, limit, currentTime = /* @__PURE__ */ new Date(), after) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const limitClause = typeof limit === "number" && Number.isInteger(limit) && limit > 0 ? sql`LIMIT ${limit}` : sql``;
		const afterClause = after ? sql`AND (scheduled_at > ${after.scheduledAt} OR (scheduled_at = ${after.scheduledAt} AND id > ${after.id}))` : sql``;
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND scheduled_at <= ${now}
			AND deleted_at IS NULL
			${afterClause}
			ORDER BY scheduled_at ASC, id ASC
			${limitClause}
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	async findTranslationIds(type, translationGroup) {
		const tableName = getTableName(type);
		return (await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND deleted_at IS NULL
		`.execute(this.db)).rows.map((row) => row.id);
	}
	async findTranslationIdsForGroups(type, translationGroups) {
		const ids = /* @__PURE__ */ new Map();
		if (translationGroups.length === 0) return ids;
		const tableName = getTableName(type);
		for (const batch of chunks([...new Set(translationGroups)], 50)) {
			const result = await sql`
				SELECT id, translation_group FROM ${sql.ref(tableName)}
				WHERE translation_group IN (${sql.join(batch)}) AND deleted_at IS NULL
			`.execute(this.db);
			for (const row of result.rows) {
				const group = ids.get(row.translation_group) ?? [];
				group.push(row.id);
				ids.set(row.translation_group, group);
			}
		}
		return ids;
	}
	/**
	* Find all translations in a translation group
	*/
	async findTranslations(type, translationGroup) {
		const tableName = getTableName(type);
		return (await sql`
			SELECT * FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			AND deleted_at IS NULL
			ORDER BY locale ASC
		`.execute(this.db)).rows.map((row) => this.mapRow(type, row));
	}
	/**
	* Whether any row still shares `translationGroup`, trashed rows included.
	* Group-keyed satellite data (term assignments, reference edges) is owned by
	* the group, not by a single locale row, so a purge may only cascade to it
	* once nothing is left to own it — and a trashed sibling is still restorable.
	*/
	async hasTranslationsIncludingTrashed(type, translationGroup, options = {}) {
		const tableName = getTableName(type);
		const exclusion = options.excludeId ? sql`AND id != ${options.excludeId}` : sql``;
		return (await sql`
			SELECT id FROM ${sql.ref(tableName)}
			WHERE translation_group = ${translationGroup}
			${exclusion}
			LIMIT 1
		`.execute(this.db)).rows.length > 0;
	}
	/**
	* Batch variant of {@link findTranslations}: every (non-deleted) locale
	* variant for any of `translationGroups`, in one `WHERE translation_group IN
	* (...)` query chunked at `SQL_BATCH_SIZE` for D1's bind-parameter limit.
	* Lets callers resolve many edge groups without an N+1 per group. The caller
	* groups the flat result by `translationGroup` itself.
	*
	* `translation_group` leads the sort so the ordering follows
	* `idx_{table}_del_tg_locale` past its `deleted_at` equality; callers group by
	* `translationGroup`, so the per-group locale order they rely on is preserved.
	*
	* `publishedOnly` restricts the result to `status = 'published'` — reference
	* reads pass this for callers without `content:read_drafts` so draft/scheduled
	* entries never leak through an edge traversal.
	*
	* A reference edge stores only a collection slug (no SQL FK), so the table may
	* have been dropped since the edge was written. That is a tolerated dangling
	* state, not an error: a missing table resolves to no rows, mirroring how the
	* content read handlers treat `isMissingTableError`.
	*/
	async findTranslationsForGroups(type, translationGroups, options = {}) {
		if (translationGroups.length === 0) return [];
		const tableName = getTableName(type);
		const publishedFilter = options.publishedOnly ? sql`AND status = 'published'` : sql``;
		const items = [];
		try {
			for (const chunk of chunks(translationGroups, 50)) {
				const result = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE translation_group IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					${publishedFilter}
					ORDER BY translation_group ASC, locale ASC
				`.execute(this.db);
				for (const row of result.rows) items.push(this.mapRow(type, row));
			}
		} catch (error) {
			if (isMissingTableError(error)) return [];
			throw error;
		}
		return items;
	}
	/**
	* Batch variant of {@link findByIdOrSlug}: resolve many identifiers (each an
	* id OR a slug) within `type` in a constant number of queries — one `WHERE id
	* IN (...)` and one `WHERE slug IN (...)`, each chunked at `SQL_BATCH_SIZE`.
	* Returns a map from the input identifier to its resolved item; identifiers
	* that match nothing are absent. Used on write paths that accept a list of
	* references, so a single request doesn't fan out to an N+1 of point lookups.
	*
	* Resolution mirrors {@link findByIdOrSlug}: a ULID-shaped identifier prefers
	* the id match and falls back to slug; anything else prefers the slug match
	* and falls back to id. Slug matches collapse to the lowest-locale variant
	* (`ORDER BY locale ASC`), matching the slug-without-locale lookup.
	*/
	async findManyByIdOrSlug(type, identifiers) {
		const resolved = /* @__PURE__ */ new Map();
		const unique = [...new Set(identifiers)];
		if (unique.length === 0) return resolved;
		const tableName = getTableName(type);
		const byId = /* @__PURE__ */ new Map();
		const bySlug = /* @__PURE__ */ new Map();
		try {
			for (const chunk of chunks(unique, 50)) {
				const idRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE id IN (${sql.join(chunk)})
					AND deleted_at IS NULL
				`.execute(this.db);
				for (const row of idRows.rows) {
					const item = this.mapRow(type, row);
					byId.set(item.id, item);
				}
				const slugRows = await sql`
					SELECT * FROM ${sql.ref(tableName)}
					WHERE slug IN (${sql.join(chunk)})
					AND deleted_at IS NULL
					ORDER BY locale ASC
				`.execute(this.db);
				for (const row of slugRows.rows) {
					const item = this.mapRow(type, row);
					if (item.slug != null && !bySlug.has(item.slug)) bySlug.set(item.slug, item);
				}
			}
		} catch (error) {
			if (isMissingTableError(error)) return resolved;
			throw error;
		}
		for (const identifier of unique) {
			const item = ULID_PATTERN.test(identifier) ? byId.get(identifier) ?? bySlug.get(identifier) : bySlug.get(identifier) ?? byId.get(identifier);
			if (item) resolved.set(identifier, item);
		}
		return resolved;
	}
	/**
	* Publish the current draft
	*
	* Promotes draft_revision_id to live_revision_id and clears draft pointer.
	* Syncs the draft revision's data into the content table columns so the
	* content table always reflects the published version.
	* If no draft revision exists, creates one from current data and publishes it.
	* When `promoteRevision` is false, publishes the current content-table data
	* by changing lifecycle metadata only.
	*
	* `publishedAt` (optional) overrides the publication timestamp. If omitted,
	* the existing `published_at` is preserved (idempotent re-publish keeps the
	* original date) and falls back to the current time on first publish. Pass
	* an explicit value to backdate a publish (e.g. when migrating content from
	* another CMS).
	*
	* `requireDue` gates the final update on the row still being due.
	* `expectedScheduledAt` additionally fences changes made after a sweep
	* selected the row but before publication preparation began.
	*/
	async publish(type, id, publishedAt, requireDue = false, expectedScheduledAt, promoteRevision = true, requireSlug = true, expectedRevision, currentTime = /* @__PURE__ */ new Date()) {
		const tableName = getTableName(type);
		const now = currentTime.toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		const requestedPublishedAt = publishedAt ? await this.datetimes.normalizeValue(type, publishedAt) : void 0;
		const currentPublishedAt = existing.publishedAt ? await this.datetimes.normalizeValue(type, existing.publishedAt) : null;
		if (requireDue && expectedScheduledAt !== void 0 && existing.scheduledAt !== expectedScheduledAt) throw new ScheduledNotDueError();
		if (!promoteRevision && requireSlug && !existing.slug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
		if (!promoteRevision) {
			const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
			let provisionalRevisionId = null;
			try {
				let liveRevisionId = existing.liveRevisionId;
				if (!liveRevisionId) {
					const revision = await revisionRepo.create({
						collection: type,
						entryId: id,
						data: existing.data
					});
					liveRevisionId = revision.id;
					provisionalRevisionId = revision.id;
				}
				const intendedPublishedAt = requestedPublishedAt ?? currentPublishedAt ?? now;
				const duePredicate = requireDue ? sql`AND scheduled_at IS NOT NULL AND scheduled_at <= ${now}` : sql``;
				let published = false;
				try {
					published = ((await sql`
						UPDATE ${sql.ref(tableName)}
						SET live_revision_id = ${liveRevisionId},
							draft_revision_id = NULL,
							status = 'published',
							scheduled_at = NULL,
							published_at = ${intendedPublishedAt},
							updated_at = ${now},
							version = version + 1
						WHERE id = ${id}
						AND deleted_at IS NULL
						AND version = ${existing.version}
						AND updated_at = ${existing.updatedAt}
						AND status = ${existing.status}
						AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
						AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
						AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
						${duePredicate}
					`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
				} catch (error) {
					if (isConfirmedStatementFailure(error)) throw error;
					let observed;
					try {
						observed = await this.findById(type, id);
					} catch (reconciliationError) {
						throw new Error("Unable to confirm whether content publication completed", { cause: reconciliationError });
					}
					if (!observed) throw new Error("Unable to confirm whether content publication completed", { cause: error });
					published = matchesLifecyclePublication(observed, existing, liveRevisionId, intendedPublishedAt, now);
					if (!published && matchesPublicationFence(observed, existing)) throw error;
					if (!published) throw new Error("Unable to confirm whether content publication completed", { cause: error });
				}
				if (!published) throw requireDue ? new ScheduledNotDueError() : new ContentMutationConflictError();
				invalidateCollectionCache(type);
				const updated = await this.findById(type, id);
				if (!updated) throw new Error("Content not found");
				return updated;
			} catch (error) {
				if (provisionalRevisionId) try {
					await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
				} catch (cleanupError) {
					console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
				}
				throw error;
			}
		}
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let provisionalRevisionId = null;
		try {
			let revisionToPublish = existing.draftRevisionId || existing.liveRevisionId;
			if (!revisionToPublish) {
				const revision = await revisionRepo.create({
					collection: type,
					entryId: id,
					data: existing.data
				});
				revisionToPublish = revision.id;
				provisionalRevisionId = revision.id;
			}
			const revision = await revisionRepo.findById(revisionToPublish);
			if (!revision || revision.collection !== type || revision.entryId !== id) throw new EmDashValidationError("Revision does not belong to the specified content item");
			const writableFieldSlugs = await this.datetimes.writableFieldSlugs(type);
			const revisionData = keepKnownFields(revision.data, writableFieldSlugs);
			const stagedSlug = typeof revision.data._slug === "string" ? revision.data._slug : null;
			const intendedSlug = stagedSlug ?? existing.slug;
			if (requireSlug && !intendedSlug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
			const intendedPublishedAt = requestedPublishedAt ?? currentPublishedAt ?? now;
			if (stagedSlug !== null && stagedSlug !== existing.slug && existing.locale !== null) {
				const conflict = await this.findBySlugIncludingTrashed(type, stagedSlug, existing.locale);
				if (conflict && conflict.id !== id) throw new EmDashValidationError(`Cannot publish: slug '${stagedSlug}' is already used by another entry in this collection (id: ${conflict.id}). Choose a different slug.`, { code: "SLUG_CONFLICT" });
			}
			const assignments = [];
			if (stagedSlug !== null) assignments.push(sql`slug = ${stagedSlug}`);
			for (const [key, value] of Object.entries(revisionData)) {
				if (SYSTEM_COLUMNS.has(key) || key.startsWith("_")) continue;
				validateIdentifier(key, "content field name");
				assignments.push(sql`${sql.ref(key)} = ${serializeValue(value)}`);
			}
			assignments.push(sql`live_revision_id = ${revisionToPublish}`, sql`draft_revision_id = NULL`, sql`status = 'published'`, sql`scheduled_at = NULL`, sql`published_at = ${intendedPublishedAt}`, sql`updated_at = ${now}`, sql`version = version + 1`);
			const duePredicate = requireDue ? sql`AND scheduled_at IS NOT NULL AND scheduled_at <= ${now}` : sql``;
			let promoted = false;
			try {
				promoted = ((await sql`
					UPDATE ${sql.ref(tableName)}
					SET ${sql.join(assignments, sql`, `)}
					WHERE id = ${id}
					AND deleted_at IS NULL
					AND version = ${existing.version}
					AND updated_at = ${existing.updatedAt}
					AND status = ${existing.status}
					AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
					AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
					AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
					${duePredicate}
					AND EXISTS (
						SELECT 1 FROM revisions
						WHERE revisions.id = ${revisionToPublish}
						AND revisions.collection = ${type}
						AND revisions.entry_id = ${id}
					)
				`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
			} catch (error) {
				if (isConfirmedStatementFailure(error)) throw error;
				let observed;
				try {
					observed = await this.findById(type, id);
				} catch (reconciliationError) {
					throw new Error("Unable to confirm whether content publication completed", { cause: reconciliationError });
				}
				if (!observed) throw new Error("Unable to confirm whether content publication completed", { cause: error });
				promoted = matchesPublication(observed, existing, revisionData, revisionToPublish, intendedSlug, intendedPublishedAt, now);
				if (!promoted && matchesPublicationFence(observed, existing)) throw error;
				if (!promoted) throw new Error("Unable to confirm whether content publication completed", { cause: error });
			}
			if (!promoted) throw requireDue ? new ScheduledNotDueError() : new ContentMutationConflictError();
			invalidateCollectionCache(type);
			const updated = await this.findById(type, id);
			if (!updated) throw new Error("Content not found");
			return updated;
		} catch (error) {
			if (provisionalRevisionId) try {
				await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
			} catch (cleanupError) {
				console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
			}
			throw error;
		}
	}
	/**
	* Unpublish content
	*
	* Removes live pointer and cancels any pending schedule, but preserves the
	* draft and publication date. If no draft exists and `draftFromLive` is set,
	* creates one from the live version so the content isn't lost. Collections
	* without revisions save to the columns, and a draft revision would hide
	* those saves.
	*/
	async unpublish(type, id, expectedRevision, draftFromLive = true) {
		const tableName = getTableName(type);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		if (existing.status === "draft" && !existing.liveRevisionId && !existing.scheduledAt) return existing;
		const revisionRepo = new RevisionRepository(this.db, this.datetimeContexts);
		let provisionalRevisionId = null;
		try {
			let draftRevisionId = existing.draftRevisionId;
			if (draftFromLive && !draftRevisionId && existing.liveRevisionId) {
				const liveRevision = await revisionRepo.findById(existing.liveRevisionId);
				if (liveRevision) {
					const draft = await revisionRepo.create({
						collection: type,
						entryId: id,
						data: liveRevision.data
					});
					draftRevisionId = draft.id;
					provisionalRevisionId = draft.id;
				}
			}
			if (((await sql`
				UPDATE ${sql.ref(tableName)}
				SET live_revision_id = NULL,
					draft_revision_id = ${draftRevisionId},
					status = 'draft',
					scheduled_at = NULL,
					updated_at = ${now},
					version = version + 1
				WHERE id = ${id}
				AND deleted_at IS NULL
				AND version = ${existing.version}
				AND updated_at = ${existing.updatedAt}
				AND status = ${existing.status}
				AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
				AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
				AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
			`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError();
			invalidateCollectionCache(type);
			const updated = await this.findById(type, id);
			if (!updated) throw new Error("Content not found");
			return updated;
		} catch (error) {
			if (provisionalRevisionId) try {
				await revisionRepo.deleteIfUnreferenced(type, id, provisionalRevisionId);
			} catch (cleanupError) {
				console.error(`[content] Failed to clean up provisional revision ${provisionalRevisionId}:`, cleanupError);
			}
			throw error;
		}
	}
	/**
	* Set the draft revision pointer for a content item.
	*
	* Used by seed/import paths that stage a new revision's data before
	* promoting it to live via `publish()`.
	*
	* Validates that the content item exists and is not soft-deleted, that
	* the revision exists, and that the revision belongs to the same
	* collection and entry. Without these checks, a caller could leave the
	* content row pointing at a missing or unrelated revision.
	*/
	async setDraftRevision(type, id, revisionId) {
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		const revision = await new RevisionRepository(this.db, this.datetimeContexts).findById(revisionId);
		if (!revision) throw new EmDashValidationError("Revision not found");
		if (revision.collection !== type || revision.entryId !== id) throw new EmDashValidationError("Revision does not belong to the specified content item");
		if (!await this.replaceDraftRevision(type, id, revisionId, existing)) throw new ContentMutationConflictError();
	}
	async replaceDraftRevision(type, id, revisionId, expected) {
		const tableName = getTableName(type);
		return ((await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = ${revisionId},
				version = version + 1
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${expected.version}
			AND ${nullableColumnMatch("live_revision_id", expected.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", expected.draftRevisionId)}
			AND EXISTS (
				SELECT 1 FROM revisions
				WHERE revisions.id = ${revisionId}
				AND revisions.collection = ${type}
				AND revisions.entry_id = ${id}
			)
		`.execute(this.db)).numAffectedRows ?? 0n) > 0n;
	}
	/**
	* Discard pending draft changes
	*
	* Clears draft_revision_id. The content table columns already hold the
	* published version, so no data sync is needed.
	*/
	async discardDraft(type, id, expectedRevision) {
		const tableName = getTableName(type);
		const existing = await this.findById(type, id);
		if (!existing) throw new EmDashValidationError("Content item not found");
		assertRevisionPrecondition(existing, expectedRevision);
		if (!existing.draftRevisionId) return existing;
		if (((await sql`
			UPDATE ${sql.ref(tableName)}
			SET draft_revision_id = NULL,
				version = version + 1
			WHERE id = ${id}
			AND deleted_at IS NULL
			AND version = ${existing.version}
			AND updated_at = ${existing.updatedAt}
			AND status = ${existing.status}
			AND ${nullableColumnMatch("live_revision_id", existing.liveRevisionId)}
			AND ${nullableColumnMatch("draft_revision_id", existing.draftRevisionId)}
			AND ${nullableColumnMatch("scheduled_at", existing.scheduledAt)}
		`.execute(this.db)).numAffectedRows ?? 0n) === 0n) throw new ContentMutationConflictError();
		const updated = await this.findById(type, id);
		if (!updated) throw new Error("Content not found");
		return updated;
	}
	/**
	* Count content items with a pending schedule.
	* Includes both draft-scheduled (status='scheduled') and published
	* posts with scheduled draft changes (status='published', scheduled_at set).
	*/
	async countScheduled(type) {
		const tableName = getTableName(type);
		const result = await sql`
			SELECT COUNT(id) as count FROM ${sql.ref(tableName)}
			WHERE scheduled_at IS NOT NULL
			AND deleted_at IS NULL
		`.execute(this.db);
		return Number(result.rows[0]?.count || 0);
	}
	/**
	* Map database row to ContentItem
	* Extracts system columns and puts content fields in data
	* Excludes null values from data to match input semantics
	*/
	mapRow(type, row) {
		const data = {};
		for (const [key, value] of Object.entries(row)) if (!SYSTEM_COLUMNS.has(key) && value !== null) data[key] = deserializeValue(value);
		return {
			id: row.id,
			type,
			slug: row.slug,
			status: row.status,
			data,
			authorId: row.author_id,
			primaryBylineId: row.primary_byline_id ?? null,
			createdAt: row.created_at,
			updatedAt: row.updated_at,
			publishedAt: row.published_at,
			scheduledAt: row.scheduled_at,
			liveRevisionId: row.live_revision_id ?? null,
			draftRevisionId: row.draft_revision_id ?? null,
			version: typeof row.version === "number" ? row.version : 1,
			locale: row.locale ?? null,
			translationGroup: row.translation_group ?? null
		};
	}
	normalizeFilterScalar(field, type, value) {
		if (type === "number" || type === "integer") {
			if (typeof value !== "number" || !Number.isFinite(value)) throw new EmDashValidationError(`Filter for field "${field}" must use a finite number`);
			if (type === "integer" && !Number.isInteger(value)) throw new EmDashValidationError(`Filter for field "${field}" must use an integer`);
			return value;
		}
		if (type === "boolean") {
			if (typeof value !== "boolean") throw new EmDashValidationError(`Filter for field "${field}" must use a boolean`);
			return value ? 1 : 0;
		}
		if (typeof value !== "string") throw new EmDashValidationError(`Filter for field "${field}" must use a string`);
		if (value.length > MAX_FILTER_STRING_LENGTH) throw new EmDashValidationError(`Filter value for field "${field}" exceeds ${MAX_FILTER_STRING_LENGTH} characters`);
		if (type === "datetime") try {
			return normalizeExplicitDatetime(value);
		} catch {
			throw new EmDashValidationError(`Filter for datetime field "${field}" must use an ISO 8601 datetime with Z or an explicit offset`);
		}
		return value;
	}
	normalizeFieldFilter(field, type, value) {
		if (value === null) return {
			column: field,
			kind: "null"
		};
		if (typeof value !== "object") return {
			column: field,
			kind: "exact",
			value: this.normalizeFilterScalar(field, type, value)
		};
		if (Array.isArray(value)) throw new EmDashValidationError(`Invalid filter for field "${field}"`);
		const record = value;
		const keys = Object.keys(record);
		if (keys.length === 1 && keys[0] === "in") {
			if (!Array.isArray(record.in) || record.in.length === 0) throw new EmDashValidationError(`IN filter for field "${field}" must not be empty`);
			if (record.in.length > MAX_IN_FILTER_VALUES) throw new EmDashValidationError(`IN filter for field "${field}" exceeds ${MAX_IN_FILTER_VALUES} values`);
			return {
				column: field,
				kind: "in",
				values: record.in.map((entry) => this.normalizeFilterScalar(field, type, entry))
			};
		}
		const rangeKeys = /* @__PURE__ */ new Set([
			"gt",
			"gte",
			"lt",
			"lte"
		]);
		if (keys.length === 0 || keys.some((key) => !rangeKeys.has(key))) throw new EmDashValidationError(`Invalid filter operator for field "${field}"`);
		if (type === "boolean") throw new EmDashValidationError(`Boolean field "${field}" does not support range filters`);
		const bounds = {};
		for (const key of keys) {
			if (record[key] === void 0) continue;
			bounds[key] = this.normalizeFilterScalar(field, type, record[key]);
		}
		if (Object.keys(bounds).length === 0) throw new EmDashValidationError(`Range filter for field "${field}" has no bounds`);
		return {
			column: field,
			kind: "range",
			bounds
		};
	}
	async collectionExists(type) {
		return await this.db.selectFrom("_emdash_collections").where("slug", "=", type).select("id").executeTakeFirst() !== void 0;
	}
	async resolveFieldFilters(type, filters) {
		const resolvedFilters = filters ?? {};
		const fields = Object.keys(resolvedFilters);
		if (fields.length === 0) return [];
		if (fields.length > MAX_INDEXED_FIELD_FILTERS) {
			if (!await this.collectionExists(type)) return [];
			throw new EmDashValidationError(`Content list queries support at most ${MAX_INDEXED_FIELD_FILTERS} indexed field filters`);
		}
		const rows = await this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").where("collection.slug", "=", type).where("field.slug", "in", fields).where("field.indexed", "=", 1).select([
			"field.slug",
			"field.type",
			"field.validation"
		]).execute();
		const metadata = new Map(rows.filter((row) => !isStoragelessFieldRow(row)).map((row) => [row.slug, row.type]));
		if (metadata.size === 0 && !await this.collectionExists(type)) return [];
		for (const field of fields) try {
			validateIdentifier(field, "content filter field");
		} catch {
			throw new EmDashValidationError(`Invalid content filter field: ${field}`);
		}
		const normalized = fields.map((field) => {
			const fieldType = metadata.get(field);
			if (!fieldType || !isIndexableFieldType(fieldType)) throw new EmDashValidationError(`Cannot filter by field "${field}". Custom fields must be indexed before filtering.`);
			return this.normalizeFieldFilter(field, fieldType, resolvedFilters[field]);
		});
		if (normalized.reduce((total, filter) => {
			if (filter.kind === "null") return total;
			if (filter.kind === "exact") return total + 1;
			if (filter.kind === "in") return total + filter.values.length;
			return total + Object.keys(filter.bounds).length;
		}, 0) > 50) throw new EmDashValidationError(`Indexed field filters have a total operand budget of 50`);
		return normalized;
	}
	applyFieldFilters(query, filters) {
		let next = query;
		for (const filter of filters) {
			const column = sql.ref(filter.column);
			const isPresent = sql`${column} IS NOT NULL`;
			if (filter.kind === "null") {
				next = next.where(() => sql`(${isPresent}) = FALSE AND ${column} IS NULL`);
				continue;
			}
			if (filter.kind === "exact") {
				next = next.where(() => sql`(${isPresent}) = TRUE AND ${column} = ${filter.value}`);
				continue;
			}
			if (filter.kind === "in") {
				const values = sql.join(filter.values.map((value) => sql`${value}`), sql`, `);
				next = next.where(() => sql`(${isPresent}) = TRUE AND ${column} IN (${values})`);
				continue;
			}
			next = next.where(() => sql`(${isPresent}) = TRUE`);
			if (filter.bounds.gt !== void 0) next = next.where(() => sql`${column} > ${filter.bounds.gt}`);
			if (filter.bounds.gte !== void 0) next = next.where(() => sql`${column} >= ${filter.bounds.gte}`);
			if (filter.bounds.lt !== void 0) next = next.where(() => sql`${column} < ${filter.bounds.lt}`);
			if (filter.bounds.lte !== void 0) next = next.where(() => sql`${column} <= ${filter.bounds.lte}`);
		}
		return next;
	}
	/**
	* Map order field names to database columns.
	* Only allows known fields to prevent column enumeration via crafted orderBy values.
	*/
	mapOrderField(field, sortableExtras = []) {
		const mapped = ORDER_FIELD_COLUMNS[field];
		if (mapped) return mapped;
		if (sortableExtras.includes(field)) {
			validateIdentifier(field, "order field");
			return field;
		}
		throw new EmDashValidationError(`Invalid order field: ${field}`);
	}
	async resolveOrderField(type, field, sortableExtras = []) {
		try {
			return {
				column: this.mapOrderField(field, sortableExtras),
				indexedCustomField: false
			};
		} catch (error) {
			if (!(error instanceof EmDashValidationError)) throw error;
		}
		const customField = await this.db.selectFrom("_emdash_collections as collection").leftJoin("_emdash_fields as field", (join) => join.onRef("field.collection_id", "=", "collection.id").on("field.slug", "=", field).on("field.indexed", "=", 1)).where("collection.slug", "=", type).select(["collection.id as collectionId", "field.slug as fieldSlug"]).executeTakeFirst();
		if (!customField) throw new ContentCollectionNotFoundError(type);
		if (!customField.fieldSlug) throw new EmDashValidationError(`Invalid order field: ${field}. Custom fields must be indexed before sorting.`);
		validateIdentifier(customField.fieldSlug, "content order field");
		return {
			column: customField.fieldSlug,
			indexedCustomField: true
		};
	}
};
// node_modules/emdash/src/astro/dev-typegen.ts
var DEV_TYPEGEN_REFRESH_GLOBAL = "__emdashDevTypegenRefresh";
function refreshDevTypes() {
	if (typeof Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" }) === "undefined" || !Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" }).DEV) return;
	try {
		const fn = Reflect.get(globalThis, DEV_TYPEGEN_REFRESH_GLOBAL);
		if (typeof fn === "function") fn();
	} catch (error) {
		console.error("[emdash] dev typegen refresh failed:", error);
	}
}
// node_modules/emdash/src/database/collection-cleanup.ts
/**
* Delete records in shared tables that belong to a given collection's entries.
*
* These tables are keyed by collection slug rather than by a foreign key to the
* content table, so dropping `ec_<slug>` or deleting the collection row does not
* remove them. The caller must run this before the collection identity
* disappears, otherwise the rows become orphans that nothing else sweeps.
*/
async function deleteSharedCollectionRecords(db, collectionSlug) {
	await db.deleteFrom("revisions").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_revision_prune_queue").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_seo").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_comments").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_content_bylines").where("collection_slug", "=", collectionSlug).execute();
	await db.deleteFrom("content_taxonomies").where("collection", "=", collectionSlug).execute();
	await db.deleteFrom("_emdash_entry_locks").where("collection", "=", collectionSlug).execute();
}
// node_modules/emdash/src/media/usage/capture-triggers.ts
var POSTGRES_TRIGGER_FUNCTION = "emdash_media_usage_capture_work";
var POSTGRES_IDENTIFIER_LIMIT = 63;
var CAPTURE_TRIGGER_VERSION = 1;
var OWNED_TRIGGER_PREFIX = "emdash_mu_";
var MAX_OWNED_CAPTURE_TRIGGERS = 100;
var WHITESPACE_PATTERN = /\s+/g;
var TRAILING_SEMICOLON_PATTERN = /;$/;
async function installMediaUsageCaptureTriggers(db, identity, options = {}) {
	const identifiers = await captureIdentifiers(identity);
	if (isPostgres(db)) await installPostgresFunction(db);
	const installedNames = await listOwnedCaptureTriggers(db, identifiers.tableName, 101);
	if (installedNames.length > MAX_OWNED_CAPTURE_TRIGGERS) throw new Error("Media usage capture trigger set exceeds the activation limit");
	if (await hasExactCaptureTriggers(db, identifiers, identity, installedNames)) return;
	await assertCaptureLifecycle(db, identity, ["installing"]);
	const expectedNames = new Set(Object.values(identifiers.triggerNames));
	const retainedNames = new Set(options.replaceExisting === false ? installedNames.filter((name) => expectedNames.has(name)) : []);
	await removeCaptureTriggers(db, identifiers.tableName, installedNames.filter((name) => !retainedNames.has(name)));
	for (const operation of captureOperations) {
		if (retainedNames.has(identifiers.triggerNames[operation])) continue;
		if (isPostgres(db)) await postgresCreateTrigger(db, identifiers.tableName, identifiers.triggerNames[operation], operation, identity);
		else await sqliteCreateTrigger(db, identifiers.tableName, identifiers.triggerNames[operation], operation, identity);
	}
	await assertExpectedTriggerSet(db, identifiers, identity);
}
async function verifyMediaUsageCaptureTriggers(db, identity) {
	const identifiers = await captureIdentifiers(identity);
	if (!await tableExists(db, identifiers.tableName)) return false;
	return hasExactCaptureTriggers(db, identifiers, identity, await listOwnedCaptureTriggers(db, identifiers.tableName, 101));
}
var captureOperations = [
	"insert",
	"update",
	"delete"
];
async function captureIdentifiers(identity) {
	validateIdentifier(identity.collectionSlug, "collection slug");
	const tableName = `ec_${identity.collectionSlug}`;
	validateIdentifier(tableName, "content table");
	const digest = await identityDigest(`${CAPTURE_TRIGGER_VERSION}:${identity.collectionId}:${identity.collectionSlug}`);
	const triggerNames = {
		insert: `emdash_mu_${digest}_ai`,
		update: `emdash_mu_${digest}_au`,
		delete: `emdash_mu_${digest}_ad`
	};
	for (const triggerName of Object.values(triggerNames)) {
		validateIdentifier(triggerName, "media usage trigger");
		if (triggerName.length > POSTGRES_IDENTIFIER_LIMIT) throw new Error(`Media usage trigger name exceeds ${POSTGRES_IDENTIFIER_LIMIT} bytes`);
	}
	return {
		tableName,
		triggerNames
	};
}
async function identityDigest(value) {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
	return Array.from(new Uint8Array(digest).slice(0, 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function removeCaptureTriggers(db, tableName, triggerNames) {
	for (const triggerName of triggerNames) {
		validateIdentifier(triggerName, "media usage trigger");
		if (isPostgres(db)) await sql`
				DROP TRIGGER IF EXISTS ${sql.ref(triggerName)} ON ${sql.ref(tableName)}
			`.execute(db);
		else await sql`DROP TRIGGER IF EXISTS ${sql.ref(triggerName)}`.execute(db);
	}
}
async function listOwnedCaptureTriggers(db, tableName, limit) {
	const limitClause = limit === void 0 ? sql`` : sql`LIMIT ${limit}`;
	if (isPostgres(db)) return (await sql`
			SELECT trigger.tgname AS name
			FROM pg_trigger AS trigger
			INNER JOIN pg_class AS relation ON relation.oid = trigger.tgrelid
			INNER JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
			WHERE namespace.nspname = current_schema()
				AND relation.relname = ${tableName}
				AND NOT trigger.tgisinternal
				AND left(trigger.tgname, 10) = ${OWNED_TRIGGER_PREFIX}
			${limitClause}
		`.execute(db)).rows.map((row) => row.name);
	return (await sql`
		SELECT name
		FROM sqlite_master
		WHERE type = 'trigger'
			AND tbl_name = ${tableName}
			AND substr(name, 1, 10) = ${OWNED_TRIGGER_PREFIX}
		${limitClause}
	`.execute(db)).rows.map((row) => row.name);
}
async function hasExactCaptureTriggers(db, identifiers, identity, installedNames) {
	const expectedNames = new Set(Object.values(identifiers.triggerNames));
	if (installedNames.length !== expectedNames.size || installedNames.some((name) => !expectedNames.has(name))) return false;
	if (isPostgres(db)) {
		const result = await sql`
			SELECT
				trigger.tgname AS name,
				trigger.tgtype AS trigger_type,
				procedure.proname AS function_name,
				encode(trigger.tgargs, 'hex') AS arguments_hex,
				trigger.tgenabled AS enabled,
				trigger.tgqual IS NOT NULL AS has_when
			FROM pg_trigger AS trigger
			INNER JOIN pg_class AS relation ON relation.oid = trigger.tgrelid
			INNER JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
			INNER JOIN pg_proc AS procedure ON procedure.oid = trigger.tgfoid
			INNER JOIN pg_namespace AS function_namespace ON function_namespace.oid = procedure.pronamespace
			WHERE namespace.nspname = current_schema()
				AND function_namespace.nspname = current_schema()
				AND relation.relname = ${identifiers.tableName}
				AND NOT trigger.tgisinternal
				AND trigger.tgconstraint = 0
				AND NOT trigger.tgdeferrable
				AND NOT trigger.tginitdeferred
				AND trigger.tgattr = ''::int2vector
				AND left(trigger.tgname, 10) = ${OWNED_TRIGGER_PREFIX}
		`.execute(db);
		const expectedArguments = triggerArgumentsHex(identity);
		return captureOperations.every((operation) => {
			const row = result.rows.find((candidate) => candidate.name === identifiers.triggerNames[operation]);
			return row?.function_name === POSTGRES_TRIGGER_FUNCTION && Number(row.trigger_type) === postgresTriggerType(operation) && row.arguments_hex === expectedArguments && row.enabled === "O" && row.has_when === false;
		});
	}
	const result = await sql`
		SELECT name, sql AS definition
		FROM sqlite_master
		WHERE type = 'trigger'
			AND tbl_name = ${identifiers.tableName}
			AND substr(name, 1, 10) = ${OWNED_TRIGGER_PREFIX}
	`.execute(db);
	return captureOperations.every((operation) => {
		const row = result.rows.find((candidate) => candidate.name === identifiers.triggerNames[operation]);
		const contentId = operation === "delete" ? sql`OLD.id` : sql`NEW.id`;
		const expected = sqliteTriggerSql(identifiers.tableName, identifiers.triggerNames[operation], operationSql(operation), contentId, identity).compile(db).sql;
		return row ? normalizeDdl(row.definition) === normalizeDdl(expected) : false;
	});
}
function triggerArgumentsHex(identity) {
	const bytes = new TextEncoder().encode(`${identity.collectionId}\0${identity.collectionSlug}\0`);
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function postgresTriggerType(operation) {
	switch (operation) {
		case "insert": return 5;
		case "update": return 17;
		case "delete": return 9;
	}
}
function normalizeDdl(definition) {
	return definition.replace(WHITESPACE_PATTERN, " ").trim().replace(TRAILING_SEMICOLON_PATTERN, "");
}
async function assertCaptureLifecycle(db, identity, allowedStates) {
	const lifecycle = await db.selectFrom("_emdash_media_usage_index_status").select("capture_state").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).executeTakeFirst();
	if (!lifecycle?.capture_state || !allowedStates.includes(lifecycle.capture_state)) throw new Error("Media usage capture trigger changes require a fenced collection lifecycle");
}
async function assertExpectedTriggerSet(db, identifiers, identity) {
	if (!await hasExactCaptureTriggers(db, identifiers, identity, await listOwnedCaptureTriggers(db, identifiers.tableName, 101))) throw new Error("Media usage capture trigger installation is incomplete");
}
async function installPostgresFunction(db) {
	await sql`
		CREATE OR REPLACE FUNCTION ${sql.ref(POSTGRES_TRIGGER_FUNCTION)}()
		RETURNS trigger
		LANGUAGE plpgsql
		AS $function$
		DECLARE
			v_collection_id text := TG_ARGV[0];
			v_collection_slug text := TG_ARGV[1];
			v_content_id text;
			v_epoch bigint;
			v_now text := to_char(
				clock_timestamp() AT TIME ZONE 'UTC',
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			);
		BEGIN
			IF TG_OP = 'DELETE' THEN
				v_content_id := OLD.id;
			ELSE
				v_content_id := NEW.id;
			END IF;

			UPDATE _emdash_media_usage_index_status
			SET change_epoch = change_epoch + 1,
				status = CASE WHEN status = 'complete' THEN 'stale' ELSE status END,
				completed_at = CASE WHEN status = 'complete' THEN NULL ELSE completed_at END,
				updated_at = v_now
			WHERE adapter_id = 'content-media'
				AND scope_type = 'collection'
				AND scope_key = v_collection_slug
				AND collection_id = v_collection_id
				AND capture_state = 'active'
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = v_collection_id
						AND collection.slug = v_collection_slug
				)
			RETURNING change_epoch INTO v_epoch;

			IF NOT FOUND THEN
				RAISE EXCEPTION USING
					ERRCODE = 'P0001',
					MESSAGE = 'media usage capture inactive';
			END IF;

			INSERT INTO _emdash_media_usage_work (
				collection_id,
				collection_slug,
				content_id,
				change_epoch,
				work_version,
				state,
				attempt_count,
				next_attempt_at,
				lease_token,
				lease_expires_at,
				last_attempted_at,
				last_error_code,
				created_at,
				updated_at
			)
			VALUES (
				v_collection_id,
				v_collection_slug,
				v_content_id,
				v_epoch,
				1,
				'pending',
				0,
				v_now,
				NULL,
				NULL,
				NULL,
				NULL,
				v_now,
				v_now
			)
			ON CONFLICT (collection_id, content_id) DO UPDATE SET
				collection_slug = EXCLUDED.collection_slug,
				change_epoch = EXCLUDED.change_epoch,
				work_version = _emdash_media_usage_work.work_version + 1,
				state = 'pending',
				attempt_count = 0,
				next_attempt_at = EXCLUDED.next_attempt_at,
				lease_token = NULL,
				lease_expires_at = NULL,
				last_attempted_at = NULL,
				last_error_code = NULL,
				updated_at = EXCLUDED.updated_at;

			RETURN NULL;
		END;
		$function$
	`.execute(db);
}
async function postgresCreateTrigger(db, tableName, triggerName, operation, identity) {
	await sql`
		CREATE TRIGGER ${sql.ref(triggerName)}
		AFTER ${operationSql(operation)} ON ${sql.ref(tableName)}
		FOR EACH ROW
		EXECUTE FUNCTION ${sql.ref(POSTGRES_TRIGGER_FUNCTION)}(
			${sql.lit(identity.collectionId)},
			${sql.lit(identity.collectionSlug)}
		)
	`.execute(db);
}
async function sqliteCreateTrigger(db, tableName, triggerName, operation, identity) {
	const contentId = operation === "delete" ? sql`OLD.id` : sql`NEW.id`;
	await sqliteTriggerSql(tableName, triggerName, operationSql(operation), contentId, identity).execute(db);
}
function sqliteTriggerSql(tableName, triggerName, operation, contentId, identity) {
	return sql`
		CREATE TRIGGER ${sql.ref(triggerName)}
		AFTER ${operation} ON ${sql.ref(tableName)}
		FOR EACH ROW
		BEGIN
			UPDATE _emdash_media_usage_index_status
			SET change_epoch = change_epoch + 1,
				status = CASE WHEN status = 'complete' THEN 'stale' ELSE status END,
				completed_at = CASE WHEN status = 'complete' THEN NULL ELSE completed_at END,
				updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
			WHERE adapter_id = 'content-media'
				AND scope_type = 'collection'
				AND scope_key = ${sql.lit(identity.collectionSlug)}
				AND collection_id = ${sql.lit(identity.collectionId)}
				AND capture_state = 'active'
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${sql.lit(identity.collectionId)}
						AND collection.slug = ${sql.lit(identity.collectionSlug)}
				);

			SELECT CASE
				WHEN changes() <> 1 THEN RAISE(ABORT, 'media usage capture inactive')
			END;

			INSERT INTO _emdash_media_usage_work (
				collection_id,
				collection_slug,
				content_id,
				change_epoch,
				work_version,
				state,
				attempt_count,
				next_attempt_at,
				lease_token,
				lease_expires_at,
				last_attempted_at,
				last_error_code,
				created_at,
				updated_at
			)
			SELECT
				${sql.lit(identity.collectionId)},
				${sql.lit(identity.collectionSlug)},
				${contentId},
				change_epoch,
				1,
				'pending',
				0,
				strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
				NULL,
				NULL,
				NULL,
				NULL,
				strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
				strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
			FROM _emdash_media_usage_index_status
			WHERE adapter_id = 'content-media'
				AND scope_type = 'collection'
				AND scope_key = ${sql.lit(identity.collectionSlug)}
				AND collection_id = ${sql.lit(identity.collectionId)}
				AND capture_state = 'active'
			ON CONFLICT (collection_id, content_id) DO UPDATE SET
				collection_slug = excluded.collection_slug,
				change_epoch = excluded.change_epoch,
				work_version = _emdash_media_usage_work.work_version + 1,
				state = 'pending',
				attempt_count = 0,
				next_attempt_at = excluded.next_attempt_at,
				lease_token = NULL,
				lease_expires_at = NULL,
				last_attempted_at = NULL,
				last_error_code = NULL,
				updated_at = excluded.updated_at;
		END
	`;
}
function operationSql(operation) {
	switch (operation) {
		case "insert": return sql`INSERT`;
		case "update": return sql`UPDATE`;
		case "delete": return sql`DELETE`;
	}
}
// node_modules/emdash/src/media/usage/activation.ts
var ACTIVATION_KEY$1 = "incremental_capture";
var MediaUsageActivationVersionMismatchError = class extends Error {};
Object.freeze({
	collectionsPerCall: 1,
	leaseDurationSeconds: 300
});
async function canResumeMediaUsageCollectionCapture(db, identity) {
	return await findResumableMediaUsageCollectionCaptureId(db, identity) === identity.collectionId;
}
async function findResumableMediaUsageCollectionCaptureId(db, identity) {
	const activation = await findActivationIfAvailable(db);
	if (!activation) return null;
	assertRuntimeGeneration(activation);
	if (activation.state !== "active") return null;
	const lifecycle = await db.selectFrom("_emdash_media_usage_index_status").select(["collection_id", "cursor"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("capture_state", "in", ["installing", "ready"]).executeTakeFirst();
	if (!lifecycle?.collection_id) return null;
	if (identity.creationFingerprint ? lifecycle.cursor !== identity.creationFingerprint : lifecycle.cursor !== null) return null;
	return lifecycle.collection_id;
}
async function prepareMediaUsageCollectionCapture(db, input) {
	const activation = await findActivationIfAvailable(db);
	if (!activation) return {
		captureRequired: false,
		collectionId: input.collectionId,
		registrationExists: input.registeredCollectionId !== void 0,
		resuming: false
	};
	assertRuntimeGeneration(activation);
	if (activation.state !== "active") return {
		captureRequired: false,
		collectionId: input.collectionId,
		registrationExists: input.registeredCollectionId !== void 0,
		resuming: false
	};
	const existing = await db.selectFrom("_emdash_media_usage_index_status").select([
		"collection_id",
		"capture_state",
		"cursor"
	]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).executeTakeFirst();
	if (existing) {
		if (existing.collection_id && (existing.capture_state === "installing" || existing.capture_state === "ready") && (input.creationFingerprint ? existing.cursor === input.creationFingerprint : existing.cursor === null) && (input.registeredCollectionId === void 0 || input.registeredCollectionId === existing.collection_id)) return {
			captureRequired: true,
			collectionId: existing.collection_id,
			registrationExists: input.registeredCollectionId !== void 0,
			resuming: true
		};
		throw new Error("Media usage collection lifecycle identity conflict");
	}
	if (input.registeredCollectionId !== void 0) throw new Error("Media usage collection lifecycle is missing");
	await db.insertInto("_emdash_media_usage_index_status").values({
		adapter_id: "content-media",
		scope_type: "collection",
		scope_key: input.collectionSlug,
		status: "never",
		collection_id: input.collectionId,
		reconciliation_required: 1,
		capture_state: "installing",
		cursor: input.creationFingerprint ?? null,
		updated_at: timestampOffset$1(db, 0)
	}).execute();
	return {
		captureRequired: true,
		collectionId: input.collectionId,
		registrationExists: false,
		resuming: false
	};
}
async function installPreparedMediaUsageCollectionCapture(db, identity) {
	await installMediaUsageCaptureTriggers(db, identity, { replaceExisting: false });
	if (!await verifyMediaUsageCaptureTriggers(db, identity)) throw new Error("Media usage capture trigger verification failed");
}
async function markMediaUsageCollectionCaptureReady(db, identity) {
	const result = await db.updateTable("_emdash_media_usage_index_status").set({
		capture_state: "ready",
		updated_at: timestampOffset$1(db, 0)
	}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).where("capture_state", "in", ["installing", "ready"]).where(sql`EXISTS (
				SELECT 1 FROM _emdash_media_usage_activation AS activation
				WHERE activation.task_key = ${ACTIVATION_KEY$1}
					AND activation.state = 'active'
					AND activation.runtime_generation = ${1}
			)`).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) === 0) throw new Error("Media usage collection readiness lost its fence");
}
async function finalizeMediaUsageCollectionCapture(db, identity) {
	const result = await db.updateTable("_emdash_media_usage_index_status").set({
		capture_state: "active",
		cursor: null,
		updated_at: timestampOffset$1(db, 0)
	}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).where("capture_state", "=", "ready").where(sql`EXISTS (
				SELECT 1 FROM _emdash_collections AS collection
				WHERE collection.id = ${identity.collectionId}
					AND collection.slug = ${identity.collectionSlug}
			)`).where(sql`EXISTS (
				SELECT 1 FROM _emdash_media_usage_activation AS activation
				WHERE activation.task_key = ${ACTIVATION_KEY$1}
					AND activation.state = 'active'
					AND activation.runtime_generation = ${1}
			)`).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) === 0) throw new Error("Media usage collection activation lost its fence");
}
async function findActivation(db) {
	return db.selectFrom("_emdash_media_usage_activation").selectAll().where("task_key", "=", ACTIVATION_KEY$1).executeTakeFirstOrThrow();
}
async function findActivationIfAvailable(db) {
	if (!await tableExists(db, "_emdash_media_usage_activation")) return null;
	return findActivation(db);
}
function assertRuntimeGeneration(activation) {
	if (activation.runtime_generation !== 1) throw new MediaUsageActivationVersionMismatchError("Media usage activation runtime generation mismatch");
}
function timestampOffset$1(db, seconds) {
	if (isPostgres(db)) return sql`to_char(
			clock_timestamp() AT TIME ZONE 'UTC' + (${seconds} * interval '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ${`+${seconds} seconds`})`;
}
// node_modules/emdash/src/search/types.ts
/**
* Search Types
*
* Type definitions for the EmDash search system.
*/
/**
* Search configuration for a collection
*/
var SEARCH_TOKENIZERS = [
	"porter unicode61",
	"unicode61",
	"trigram"
];
// node_modules/emdash/src/search/fts-manager.ts
var DEFAULT_SEARCH_TOKENIZER = "porter unicode61";
function isSearchTokenizer(value) {
	return SEARCH_TOKENIZERS.some((tokenizer) => tokenizer === value);
}
function resolveSearchTokenizer(tokenize) {
	if (tokenize === void 0) return DEFAULT_SEARCH_TOKENIZER;
	if (!isSearchTokenizer(tokenize)) throw new Error(`Unsupported FTS5 tokenizer: "${String(tokenize)}"`);
	return tokenize;
}
function parseSearchConfig(searchConfig, titleField) {
	try {
		const parsed = JSON.parse(searchConfig);
		if (typeof parsed !== "object" || parsed === null || !("enabled" in parsed) || typeof parsed.enabled !== "boolean") return null;
		const config = { enabled: parsed.enabled };
		if (titleField) config.titleField = titleField;
		if ("weights" in parsed && typeof parsed.weights === "object" && parsed.weights !== null) {
			const weights = {};
			for (const [k, v] of Object.entries(parsed.weights)) if (typeof v === "number") weights[k] = v;
			config.weights = weights;
		}
		if ("tokenize" in parsed) {
			if (!isSearchTokenizer(parsed.tokenize)) return null;
			config.tokenize = parsed.tokenize;
		}
		return config;
	} catch {
		return null;
	}
}
/**
* FTS5 Manager
*
* Handles creation, deletion, and management of FTS5 virtual tables
* for full-text search on content collections.
*/
var FTSManager = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Validate a collection slug and its searchable field names.
	* Must be called before any raw SQL interpolation.
	*/
	validateInputs(collectionSlug, searchableFields) {
		validateIdentifier(collectionSlug, "collection slug");
		if (searchableFields) for (const field of searchableFields) validateIdentifier(field, "searchable field name");
	}
	/**
	* Get the FTS table name for a collection
	* Uses _emdash_ prefix to clearly mark as internal/system table
	*/
	getFtsTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `_emdash_fts_${collectionSlug}`;
	}
	/**
	* Get the content table name for a collection
	*/
	getContentTableName(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		return `ec_${collectionSlug}`;
	}
	/**
	* Check if an FTS table exists for a collection
	*/
	async ftsTableExists(collectionSlug) {
		const ftsTable = this.getFtsTableName(collectionSlug);
		return tableExists(this.db, ftsTable);
	}
	/**
	* Create an FTS5 virtual table for a collection.
	* FTS5 is SQLite-only; on other dialects this is a no-op.
	*
	* @param collectionSlug - The collection slug
	* @param searchableFields - Array of field names to index
	* @param weights - Optional field weights for ranking
	* @param tokenize - Optional FTS5 tokenizer configuration
	*/
	async createFtsTable(collectionSlug, searchableFields, _weights, tokenize) {
		const tokenizer = resolveSearchTokenizer(tokenize);
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const columns = [
			"id UNINDEXED",
			"locale UNINDEXED",
			...searchableFields
		].join(", ");
		await sql.raw(`
			CREATE VIRTUAL TABLE IF NOT EXISTS "${ftsTable}" USING fts5(
				${columns},
				tokenize='${tokenizer}'
			)
		`).execute(this.db);
		await this.createTriggers(collectionSlug, searchableFields);
	}
	/**
	* SQL expression producing the indexed value for one searchable field.
	*
	* Portable Text fields are stored as JSON; indexing the raw JSON pollutes
	* the index with structural tokens (`_type`, style values like `normal`,
	* `_key` ULIDs) and makes snippets show JSON fragments. Extract the prose
	* instead: every JSON string under a `text`, `alt`, `caption`, or `code`
	* key (span text, image alt/caption, code blocks). This is a superset of
	* `extractPlainText` in text-extraction.ts, which walks only known block
	* shapes — the SQL variant takes those keys at any depth, so search and
	* the extractPlainText consumers (vectorize/ai-search) can see different
	* text for the same document. Only JSON documents
	* (arrays/objects) are extracted; legacy rows holding a bare string or a
	* JSON scalar (`Some title`, `2024`) are indexed as-is. Extraction must
	* live in SQL because the sync triggers cannot call into JS.
	*
	* `ref` must be a validated column reference (`NEW.x`, `OLD.x`, `"x"`).
	*/
	searchValueExpr(ref, fieldType) {
		if (fieldType !== "portableText") return ref;
		return `CASE WHEN ${ref} IS NULL THEN NULL WHEN json_valid(${ref}) AND json_type(${ref}) IN ('array', 'object') THEN (SELECT group_concat(j.value, ' ') FROM json_tree(${ref}) AS j WHERE j.key IN ('text', 'alt', 'caption', 'code') AND j.type = 'text') ELSE ${ref} END`;
	}
	/**
	* Field type per slug for a collection, for choosing the indexed-value
	* expression. Fields missing from the schema fall back to raw indexing.
	*/
	async getFieldTypes(collectionSlug) {
		const collection = await this.db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!collection) return /* @__PURE__ */ new Map();
		const rows = await this.db.selectFrom("_emdash_fields").select(["slug", "type"]).where("collection_id", "=", collection.id).execute();
		return new Map(rows.map((r) => [r.slug, r.type]));
	}
	/**
	* Create triggers to keep FTS table in sync with content table.
	*
	* The insert and update triggers only add rows to the FTS index when
	* `deleted_at IS NULL`. This keeps soft-deleted content out of the
	* search index and ensures the FTS row count matches the non-deleted
	* content count (which `verifyAndRepairIndex` relies on).
	*
	* The FTS table stores its own values (no `content=` option), so removal
	* is a plain `DELETE FROM fts WHERE rowid = OLD.rowid` — a harmless no-op
	* for rows that were never indexed (soft-deleted content). The
	* external-content `'delete'`-command choreography and its corruption
	* modes (migration 039) do not apply to self-contained tables.
	*
	* `INSERT OR REPLACE` keeps the insert path idempotent: re-running a
	* populate (search repair runs per isolate, so two isolates can race) converges
	* on one index row per content row instead of failing on the rowid
	* constraint.
	*
	* The trigger SQL emitted here MUST stay in lock-step with migration
	* `064_fts_plain_text.ts`. If this changes again, add a new migration
	* rather than editing shipped ones — migrations are forward-only.
	*/
	async createTriggers(collectionSlug, searchableFields) {
		this.validateInputs(collectionSlug, searchableFields);
		if (searchableFields.length === 0) throw new Error(`Cannot create FTS triggers for collection "${collectionSlug}": no searchable fields. Mark at least one field as searchable before enabling search.`);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const newValueList = searchableFields.map((f) => this.searchValueExpr(`NEW.${f}`, fieldTypes.get(f))).join(", ");
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_insert"
			AFTER INSERT ON "${contentTable}"
			WHEN NEW.deleted_at IS NULL
			BEGIN
				INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				VALUES (NEW.rowid, NEW.id, NEW.locale, ${newValueList});
			END
		`).execute(this.db);
		const changedCondition = [
			"deleted_at",
			"locale",
			...searchableFields
		].map((f) => `OLD.${f} IS NOT NEW.${f}`).join(" OR ");
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_update"
			AFTER UPDATE ON "${contentTable}"
			WHEN ${changedCondition}
			BEGIN
				DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
				INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
				SELECT NEW.rowid, NEW.id, NEW.locale, ${newValueList}
				WHERE NEW.deleted_at IS NULL;
			END
		`).execute(this.db);
		await sql.raw(`
			CREATE TRIGGER IF NOT EXISTS "${ftsTable}_delete"
			AFTER DELETE ON "${contentTable}"
			BEGIN
				DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
			END
		`).execute(this.db);
	}
	/**
	* Drop triggers for a collection
	*/
	async dropTriggers(collectionSlug) {
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_insert"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_update"`).execute(this.db);
		await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_delete"`).execute(this.db);
	}
	/**
	* Drop the FTS table and triggers for a collection
	*/
	async dropFtsTable(collectionSlug) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug);
		const ftsTable = this.getFtsTableName(collectionSlug);
		await this.dropTriggers(collectionSlug);
		await sql.raw(`DROP TABLE IF EXISTS "${ftsTable}"`).execute(this.db);
	}
	/**
	* Rebuild the FTS index for a collection
	*
	* This is useful after bulk imports or if the index gets out of sync.
	*/
	async rebuildIndex(collectionSlug, searchableFields, weights, tokenize) {
		resolveSearchTokenizer(tokenize);
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		await this.createFtsTable(collectionSlug, searchableFields, weights, tokenize);
		await this.populateFromContent(collectionSlug, searchableFields);
	}
	/**
	* Populate the FTS table from existing content.
	*
	* `INSERT OR REPLACE` so a concurrent double-populate (search repair runs
	* per isolate) converges instead of failing on the rowid constraint.
	*/
	async populateFromContent(collectionSlug, searchableFields) {
		if (!isSqlite(this.db)) return;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const valueList = searchableFields.map((f) => this.searchValueExpr(`"${contentTable}"."${f}"`, fieldTypes.get(f))).join(", ");
		await sql.raw(`
			INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			SELECT rowid, id, locale, ${valueList} FROM "${contentTable}"
			WHERE deleted_at IS NULL
		`).execute(this.db);
	}
	/**
	* Index up to `limit` content rows with `rowid > afterRowid`, in rowid
	* order, so a large collection can be populated across several requests.
	* Returns the last rowid covered, or null when no rows remain. Returns
	* null on dialects without FTS5.
	*/
	async populateRange(collectionSlug, searchableFields, afterRowid, limit) {
		if (!isSqlite(this.db)) return null;
		this.validateInputs(collectionSlug, searchableFields);
		const ftsTable = this.getFtsTableName(collectionSlug);
		const contentTable = this.getContentTableName(collectionSlug);
		const last = (await sql`
			SELECT MAX(rowid) AS last FROM (
				SELECT rowid FROM ${sql.ref(contentTable)}
				WHERE rowid > ${afterRowid}
				ORDER BY rowid
				LIMIT ${limit}
			)
		`.execute(this.db)).rows[0]?.last ?? null;
		if (last === null) return null;
		const fieldTypes = await this.getFieldTypes(collectionSlug);
		const fieldList = searchableFields.join(", ");
		const valueList = searchableFields.map((f) => this.searchValueExpr(`"${contentTable}"."${f}"`, fieldTypes.get(f))).join(", ");
		await sql`
			INSERT OR REPLACE INTO ${sql.ref(ftsTable)}(rowid, id, locale, ${sql.raw(fieldList)})
			SELECT rowid, id, locale, ${sql.raw(valueList)} FROM ${sql.ref(contentTable)}
			WHERE deleted_at IS NULL AND rowid > ${afterRowid} AND rowid <= ${last}
		`.execute(this.db);
		return Number(last);
	}
	/**
	* Get the search configuration for a collection
	*/
	async getSearchConfig(collectionSlug) {
		const result = await this.db.selectFrom("_emdash_collections").select(["search_config", "title_field"]).where("slug", "=", collectionSlug).executeTakeFirst();
		if (!result?.search_config) return null;
		return parseSearchConfig(result.search_config, result.title_field);
	}
	/**
	* Load all metadata needed to search the requested collections in one round trip.
	* Omitted or empty slugs select all search-enabled collections.
	*/
	async getSearchMetadata(collectionSlugs) {
		if (!isSqlite(this.db)) return /* @__PURE__ */ new Map();
		let query = this.db.selectFrom("_emdash_collections as c").select([
			"c.slug",
			"c.search_config",
			"c.title_field",
			sql`(
					SELECT json_group_array(name ORDER BY cid)
					FROM pragma_table_info(${"_emdash_fts_"} || c.slug)
					WHERE cid >= 2
				)`.as("searchable_fields"),
			sql`EXISTS (
					SELECT 1 FROM _emdash_fields WHERE collection_id = c.id AND slug = 'title'
				)`.as("has_title")
		]).where("c.search_config", "is not", null).where(sql`EXISTS (
				SELECT 1 FROM sqlite_master
				WHERE type = 'table' AND name = ${"_emdash_fts_"} || c.slug
			)`);
		if (collectionSlugs?.length) query = query.where("c.slug", "in", sql`(SELECT value FROM json_each(${JSON.stringify(collectionSlugs)}))`);
		const metadata = /* @__PURE__ */ new Map();
		for (const row of await query.execute()) {
			const config = row.search_config ? parseSearchConfig(row.search_config, row.title_field) : null;
			if (!config?.enabled) continue;
			const searchableFields = JSON.parse(row.searchable_fields);
			if (!Array.isArray(searchableFields) || !searchableFields.every((field) => typeof field === "string")) throw new Error("Invalid FTS field metadata");
			metadata.set(row.slug, {
				config,
				searchableFields,
				hasTitle: Boolean(row.has_title)
			});
		}
		return metadata;
	}
	/**
	* Update the search configuration for a collection
	*/
	async setSearchConfig(collectionSlug, config) {
		if (config.tokenize !== void 0) resolveSearchTokenizer(config.tokenize);
		await this.db.updateTable("_emdash_collections").set({ search_config: JSON.stringify(config) }).where("slug", "=", collectionSlug).execute();
	}
	/**
	* Get searchable fields for a collection. Fields that store no column (bound
	* reference fields) are left out: the index triggers read each field's column.
	*/
	async getSearchableFields(collectionSlug) {
		const collection = await this.db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
		if (!collection) return [];
		return (await this.db.selectFrom("_emdash_fields").select([
			"slug",
			"type",
			"validation"
		]).where("collection_id", "=", collection.id).where("searchable", "=", 1).execute()).filter((f) => !isStoragelessFieldRow(f)).map((f) => f.slug);
	}
	/**
	* Whether a collection has a user-defined `title` field.
	*
	* `title` is not a system column on `ec_*` tables -- it exists only when a
	* collection defines a field with slug `title`. Search and suggestion SQL
	* that selects `c.title` must check this first; otherwise collections
	* without a title field raise "no such column: c.title".
	*/
	async hasTitleColumn(collectionSlug) {
		return (await this.getCollectionsWithTitleColumn([collectionSlug])).has(collectionSlug);
	}
	/**
	* Bulk variant of `hasTitleColumn()`: which of the given collections have
	* a user-defined `title` field. One query instead of one `hasTitleColumn`
	* round-trip pair per collection -- callers that check this once per
	* collection in a loop (multi-collection search, suggestions) should use
	* this instead (AGENTS.md: "one query beats two").
	*/
	async getCollectionsWithTitleColumn(collectionSlugs) {
		if (collectionSlugs.length === 0) return /* @__PURE__ */ new Set();
		const rows = await this.db.selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select(["c.slug as collection_slug"]).where("f.slug", "=", "title").execute();
		const withTitle = new Set(rows.map((r) => r.collection_slug));
		return new Set(collectionSlugs.filter((slug) => withTitle.has(slug)));
	}
	/**
	* Enable search for a collection.
	*
	* Uses rebuildIndex to ensure a clean state -- drop any existing FTS
	* table/triggers, recreate them, and populate from content. This avoids
	* duplicate rows when triggers have already populated the index (e.g.
	* during seeding where content is inserted before search is enabled).
	*/
	async enableSearch(collectionSlug, options) {
		if (options?.tokenize !== void 0) resolveSearchTokenizer(options.tokenize);
		if (!isSqlite(this.db)) throw new Error("Full-text search is only available with SQLite databases");
		const searchableFields = await this.getSearchableFields(collectionSlug);
		if (searchableFields.length === 0) throw new Error(`No searchable fields defined for collection "${collectionSlug}". Mark at least one field as searchable before enabling search.`);
		const existing = await this.getSearchConfig(collectionSlug);
		const weights = options?.weights ?? existing?.weights;
		const tokenize = options?.tokenize ?? existing?.tokenize;
		await this.rebuildIndex(collectionSlug, searchableFields, weights, tokenize);
		await this.setSearchConfig(collectionSlug, {
			enabled: true,
			weights,
			tokenize
		});
	}
	/**
	* Disable search for a collection
	*
	* Drops the FTS table and triggers.
	*/
	async disableSearch(collectionSlug) {
		if (!isSqlite(this.db)) return;
		await this.dropFtsTable(collectionSlug);
		const existing = await this.getSearchConfig(collectionSlug);
		await this.setSearchConfig(collectionSlug, {
			enabled: false,
			weights: existing?.weights,
			tokenize: existing?.tokenize
		});
	}
	/**
	* Get index statistics for a collection
	*/
	async getIndexStats(collectionSlug) {
		if (!isSqlite(this.db)) return null;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		if (!await this.ftsTableExists(collectionSlug)) return null;
		return { indexed: (await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db)).rows[0]?.count ?? 0 };
	}
	/**
	* Verify FTS index integrity and rebuild if drift is detected.
	*
	* Cheap belt-and-braces check, run lazily on the first search request
	* per isolate. The expensive cases (corrupted indexes from pre-fix
	* EmDash versions, broken legacy triggers) are handled at boot time by
	* migration `039_fix_fts5_triggers`, not here. This routine sticks to:
	*
	*   1. FTS table missing while config says search is enabled -> rebuild.
	*   2. Row count mismatch between content table and FTS docsize -> rebuild.
	*
	* Returns true if the index was rebuilt, false if it was healthy.
	*/
	async verifyAndRepairIndex(collectionSlug) {
		if (!isSqlite(this.db)) return false;
		this.validateInputs(collectionSlug);
		const ftsDocsizeTable = `${this.getFtsTableName(collectionSlug)}_docsize`;
		const contentTable = this.getContentTableName(collectionSlug);
		const fields = await this.getSearchableFields(collectionSlug);
		const config = await this.getSearchConfig(collectionSlug);
		if (!await this.ftsTableExists(collectionSlug)) {
			if (!config?.enabled || fields.length === 0) return false;
			console.warn(`FTS index for "${collectionSlug}" is missing. Rebuilding.`);
			await this.rebuildIndex(collectionSlug, fields, config.weights, config.tokenize);
			return true;
		}
		const contentCount = await sql`
			SELECT COUNT(*) as count FROM ${sql.ref(contentTable)}
			WHERE deleted_at IS NULL
		`.execute(this.db);
		const ftsCount = await sql`
			SELECT COUNT(*) as count FROM "${sql.raw(ftsDocsizeTable)}"
		`.execute(this.db);
		const contentRows = contentCount.rows[0]?.count ?? 0;
		const ftsRows = ftsCount.rows[0]?.count ?? 0;
		if (contentRows !== ftsRows) {
			console.warn(`FTS index for "${collectionSlug}" has ${ftsRows} rows but content table has ${contentRows}. Rebuilding.`);
			if (fields.length > 0) await this.rebuildIndex(collectionSlug, fields, config?.weights, config?.tokenize);
			return true;
		}
		return false;
	}
	/**
	* Verify and repair FTS indexes for all search-enabled collections.
	*
	* Intended to run at startup to auto-heal any corruption from
	* previous process crashes.
	*/
	async verifyAndRepairAll() {
		if (!isSqlite(this.db)) return 0;
		const collections = await this.db.selectFrom("_emdash_collections").select("slug").where("search_config", "is not", null).execute();
		let repaired = 0;
		for (const { slug } of collections) {
			if (!(await this.getSearchConfig(slug))?.enabled) continue;
			try {
				if (await this.verifyAndRepairIndex(slug)) repaired++;
			} catch (error) {
				console.error(`Failed to verify/repair FTS index for "${slug}":`, error);
			}
		}
		return repaired;
	}
};
// node_modules/emdash/src/media/usage/collection-deletion.ts
var ACTIVATION_KEY = "incremental_capture";
var VIRTUAL_DIALECT_ID = "virtual:emdash/dialect";
var MediaUsageCollectionDeletionRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async createTombstone(input) {
		assertIdentity(input);
		const now = timestampOffset(this.db, 0);
		await this.db.insertInto("_emdash_media_usage_collection_deletions").values({
			collection_id: input.collectionId,
			collection_slug: input.collectionSlug,
			force_delete: input.forceDelete ? 1 : 0,
			state: "pending",
			phase: "fence",
			next_attempt_at: now,
			updated_at: now
		}).onConflict((conflict) => conflict.column("collection_id").doNothing()).execute();
		const row = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_id", "=", input.collectionId).executeTakeFirstOrThrow();
		if (row.collection_slug !== input.collectionSlug || Boolean(row.force_delete) !== input.forceDelete) throw new Error("Collection deletion tombstone identity conflicts with existing work");
		return rowToRecord(row);
	}
	async claim(input) {
		if (!input.collectionId || !isPhase(input.phase)) throw new Error("Collection deletion claim requires an exact identity and phase");
		if (!Number.isSafeInteger(input.leaseDurationSeconds) || input.leaseDurationSeconds < 1) throw new Error("Collection deletion lease duration must be a positive whole number");
		const leaseToken = ulid();
		const row = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "leased",
			lease_token: leaseToken,
			lease_expires_at: timestampOffset(this.db, input.leaseDurationSeconds),
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("phase", "=", input.phase).where((eb) => eb.or([eb.and([eb("state", "in", ["pending", "retry"]), timestampIsDue(this.db, "next_attempt_at")]), eb.and([eb("state", "=", "leased"), timestampIsDue(this.db, "lease_expires_at")])])).returningAll().executeTakeFirst();
		if (!row) return null;
		return {
			...rowToRecord(row),
			leaseToken
		};
	}
	async findBySlug(collectionSlug) {
		validateIdentifier(collectionSlug, "collection slug");
		try {
			const row = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_slug", "=", collectionSlug).executeTakeFirst();
			return row ? rowToRecord(row) : null;
		} catch (error) {
			if (isMissingTableError(error)) return null;
			throw error;
		}
	}
	async findDue(limit) {
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("Collection deletion candidate limit must be from 1 to 100");
		const nextAttemptIsDue = timestampIsDue(this.db, "next_attempt_at");
		const leaseIsDue = timestampIsDue(this.db, "lease_expires_at");
		return (await sql`
			WITH pending_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'pending' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), retry_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'retry' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), leased_candidates AS (
				SELECT * FROM _emdash_media_usage_collection_deletions
				WHERE state = 'leased' AND ${leaseIsDue}
				ORDER BY lease_expires_at, updated_at, collection_id
				LIMIT ${limit}
			), candidates AS (
				SELECT * FROM pending_candidates
				UNION ALL SELECT * FROM retry_candidates
				UNION ALL SELECT * FROM leased_candidates
			)
			SELECT * FROM candidates
			ORDER BY CASE WHEN state = 'leased' THEN lease_expires_at ELSE next_attempt_at END,
				updated_at,
				collection_id
			LIMIT ${limit}
		`.execute(this.db)).rows.map(rowToRecord);
	}
	async hasNonterminal() {
		return await this.db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("state", "in", [
			"pending",
			"retry",
			"leased"
		]).limit(1).executeTakeFirst() !== void 0;
	}
	async findOperatorPage(options) {
		const state = options.state ?? "failed";
		if (!isState(state)) throw new Error("Invalid collection deletion state");
		const limit = options.limit ?? 50;
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("Collection deletion operator limit must be from 1 to 100");
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		let query = this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("state", "=", state);
		if (cursor) query = query.where((eb) => eb.or([eb("updated_at", "<", cursor.orderValue), eb.and([eb("updated_at", "=", cursor.orderValue), eb("collection_id", "<", cursor.id)])]));
		const rows = await query.orderBy("updated_at", "desc").orderBy("collection_id", "desc").limit(limit + 1).execute();
		const items = rows.slice(0, limit).map(rowToOperatorItem);
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.updatedAt, last.collectionId);
		}
		return result;
	}
	async retryOperatorDeletion(input) {
		if (!input.collectionId) throw new Error("Collection deletion retry requires an ID");
		const observed = await this.db.selectFrom("_emdash_media_usage_collection_deletions").selectAll().where("collection_id", "=", input.collectionId).executeTakeFirst();
		if (!observed) return { outcome: "not_found" };
		if (observed.state === "leased" && observed.lease_expires_at) {
			const live = await this.db.selectFrom("_emdash_media_usage_collection_deletions").select("lease_expires_at").where("collection_id", "=", input.collectionId).where("state", "=", "leased").where(liveLease(this.db)).executeTakeFirst();
			if (live?.lease_expires_at) return {
				outcome: "lease_active",
				leaseExpiresAt: live.lease_expires_at
			};
		}
		const now = timestampOffset(this.db, 0);
		const reopened = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "pending",
			attempt_count: 0,
			next_attempt_at: now,
			lease_token: null,
			lease_expires_at: null,
			last_error_code: null,
			updated_at: now
		}).where("collection_id", "=", input.collectionId).where((eb) => eb.or([eb("state", "in", ["failed", "retry"]), eb.and([eb("state", "=", "leased"), timestampIsDue(this.db, "lease_expires_at")])])).returningAll().executeTakeFirst();
		if (reopened) return {
			outcome: "pending",
			changed: true,
			item: rowToOperatorItem(reopened)
		};
		return { outcome: "conflict" };
	}
	async checkpoint(input) {
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			phase: input.toPhase,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("phase", "=", input.fromPhase).where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async release(input) {
		const now = timestampOffset(this.db, 0);
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: "pending",
			next_attempt_at: now,
			lease_token: null,
			lease_expires_at: null,
			attempt_count: 0,
			last_error_code: null,
			updated_at: now
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async cancelFence(input) {
		const result = await this.db.deleteFrom("_emdash_media_usage_collection_deletions").where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("phase", "=", "fence").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0) === 1;
	}
	async recordFailure(input) {
		const result = await this.db.updateTable("_emdash_media_usage_collection_deletions").set({
			state: input.terminal ? "failed" : "retry",
			attempt_count: sql`attempt_count + 1`,
			next_attempt_at: timestampOffset(this.db, input.retryDelaySeconds),
			lease_token: null,
			lease_expires_at: null,
			last_error_code: input.errorCode,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async deleteRegistryAndCheckpoint(input) {
		return withTransaction(this.db, async (trx) => {
			await trx.deleteFrom("_emdash_collections").where("id", "=", input.collectionId).where("slug", "=", input.collectionSlug).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_collection_deletions as deletion").select("deletion.collection_id").where("deletion.collection_id", "=", input.collectionId).where("deletion.collection_slug", "=", input.collectionSlug).where("deletion.state", "=", "leased").where("deletion.phase", "=", "registry").where("deletion.lease_token", "=", input.leaseToken).where(liveLease(trx, "deletion.lease_expires_at")))).execute();
			const checkpoint = await trx.updateTable("_emdash_media_usage_collection_deletions").set({
				phase: "table",
				updated_at: timestampOffset(trx, 0)
			}).where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", "registry").where("lease_token", "=", input.leaseToken).where(liveLease(trx)).executeTakeFirst();
			return Number(checkpoint.numUpdatedRows ?? 0) === 1;
		});
	}
};
async function deleteActivatedMediaUsageCollection(db, input, options = {}) {
	const frontPhaseLimit = options.frontPhaseLimit ?? 3;
	if (!Number.isSafeInteger(frontPhaseLimit) || frontPhaseLimit < 1 || frontPhaseLimit > 3) throw new Error("Collection deletion front-phase limit must be from 1 to 3");
	validateIdentifier(input.collectionSlug, "collection slug");
	const repository = new MediaUsageCollectionDeletionRepository(db);
	let deletion = await repository.findBySlug(input.collectionSlug);
	if (deletion && input.collectionId && deletion.collectionId !== input.collectionId) throw new Error("Collection deletion tombstone identity conflict");
	if (!deletion) {
		let activation;
		try {
			activation = await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", ACTIVATION_KEY).executeTakeFirst();
		} catch (error) {
			if (!isMissingTableError(error)) throw error;
		}
		if (!activation || activation.state === "expanded") return "inactive";
		if (activation.state !== "active") throw new Error("Media usage activation must be active before collection deletion");
		if (!input.collectionId) return "not_found";
		await assertActivatedCollectionDeletionReady(db, {
			collectionId: input.collectionId,
			collectionSlug: input.collectionSlug
		});
		deletion = await repository.createTombstone({
			collectionId: input.collectionId,
			collectionSlug: input.collectionSlug,
			forceDelete: input.forceDelete
		});
	}
	if (deletion.phase !== "fence" && deletion.phase !== "registry" && deletion.phase !== "table") return "deleted";
	const claim = options.claimed ?? await repository.claim({
		collectionId: deletion.collectionId,
		phase: deletion.phase,
		leaseDurationSeconds: 300
	});
	if (!claim) return "in_progress";
	if (claim.collectionId !== deletion.collectionId || claim.phase !== deletion.phase) throw new Error("Collection deletion claim identity conflict");
	let phase = claim.phase;
	let processedFrontPhases = 0;
	const lease = {
		collectionId: claim.collectionId,
		leaseToken: claim.leaseToken
	};
	if (phase === "fence") {
		const captureState = await findCollectionCaptureState(db, claim);
		if (captureState !== "active" && captureState !== "deleting") throw new Error("Activated collection deletion requires a fenced capture lifecycle");
		if (!await verifyMediaUsageCaptureTriggers(db, claim)) throw new Error("Activated collection deletion requires the exact capture trigger set");
		if (captureState === "active") {
			const result = await executeCollectionDeletionGuard(db, {
				action: "fence",
				collectionId: claim.collectionId,
				collectionSlug: claim.collectionSlug,
				leaseToken: claim.leaseToken,
				forceDelete: claim.forceDelete
			});
			if (result.outcome === "has_content") {
				if (!await repository.cancelFence(lease)) throw new Error("Collection deletion lost its fence while preserving content");
				return "has_content";
			}
			if (result.outcome !== "fenced") throw new Error("Collection deletion lost its fence");
		}
		if (!await repository.checkpoint({
			...lease,
			fromPhase: "fence",
			toPhase: "registry"
		})) throw new Error("Collection deletion lost its fence checkpoint");
		phase = "registry";
		processedFrontPhases++;
		if (processedFrontPhases >= frontPhaseLimit) {
			if (!await repository.release(lease)) throw new Error("Collection deletion lost its handoff");
			return "advanced";
		}
	}
	if (phase === "registry") {
		if (!await repository.deleteRegistryAndCheckpoint({
			...lease,
			collectionSlug: claim.collectionSlug
		})) throw new Error("Collection deletion lost its registry checkpoint");
		phase = "table";
		processedFrontPhases++;
		if (processedFrontPhases >= frontPhaseLimit) {
			if (!await repository.release(lease)) throw new Error("Collection deletion lost its handoff");
			return "advanced";
		}
	}
	if (phase === "table") {
		if ((await executeCollectionDeletionGuard(db, {
			action: "drop",
			collectionId: claim.collectionId,
			collectionSlug: claim.collectionSlug,
			leaseToken: claim.leaseToken
		})).outcome !== "dropped") throw new Error("Collection deletion lost its table fence");
		await deleteSharedCollectionRecords(db, claim.collectionSlug);
		if (!await repository.checkpoint({
			...lease,
			fromPhase: "table",
			toPhase: "work"
		})) throw new Error("Collection deletion lost its table checkpoint");
	}
	if (!await repository.release(lease)) throw new Error("Collection deletion lost its cleanup handoff");
	return "deleted";
}
async function isMediaUsageCollectionSlugDeleting(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	try {
		return await db.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("collection_slug", "=", collectionSlug).executeTakeFirst() !== void 0;
	} catch (error) {
		if (isMissingTableError(error)) return false;
		throw error;
	}
}
async function assertActivatedCollectionDeletionReady(db, identity) {
	if (await findCollectionCaptureState(db, identity) !== "active") throw new Error("Activated collection deletion requires an active capture lifecycle");
	if (!await verifyMediaUsageCaptureTriggers(db, identity)) throw new Error("Activated collection deletion requires the exact capture trigger set");
}
async function findCollectionCaptureState(db, identity) {
	return (await db.selectFrom("_emdash_media_usage_index_status").select("capture_state").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", identity.collectionSlug).where("collection_id", "=", identity.collectionId).executeTakeFirst())?.capture_state ?? null;
}
async function executeCollectionDeletionGuard(db, input) {
	const executeAdapterGuard = await loadAdapterCollectionDeletionGuard();
	if (executeAdapterGuard) {
		const { default: config } = await import("./config_rWUzgpIJ.mjs");
		return executeAdapterGuard(config.database?.config, input);
	}
	return executeLocalCollectionDeletionGuard(db, input);
}
async function loadAdapterCollectionDeletionGuard() {
	try {
		return (await import("./dialect_BQ6hoGf3.mjs")).executeCollectionDeletionGuard;
	} catch (error) {
		if (isVirtualDialectUnavailableError(error)) return void 0;
		throw error;
	}
}
function isVirtualDialectUnavailableError(error) {
	if (!(error instanceof Error) || !("code" in error)) return false;
	if (error.code === "ERR_MODULE_NOT_FOUND") return error.message.includes(VIRTUAL_DIALECT_ID);
	return error.code === "ERR_UNSUPPORTED_ESM_URL_SCHEME" && error.message.includes("Received protocol 'virtual:'");
}
async function executeLocalCollectionDeletionGuard(db, input) {
	assertGuardInput(input);
	return db.transaction().execute(async (trx) => {
		if (!await lockLiveTombstone(trx, input)) return { outcome: "stale" };
		if (input.action === "fence") return fenceCollection(trx, input);
		await new FTSManager(trx).dropFtsTable(input.collectionSlug);
		await sql`DROP TABLE IF EXISTS ${sql.ref(`ec_${input.collectionSlug}`)}`.execute(trx);
		return { outcome: "dropped" };
	});
}
async function fenceCollection(trx, input) {
	const tableName = `ec_${input.collectionSlug}`;
	validateIdentifier(tableName, "content table");
	if (isPostgres(trx)) await sql`LOCK TABLE ${sql.ref(tableName)} IN SHARE ROW EXCLUSIVE MODE`.execute(trx);
	if (!input.forceDelete) {
		if ((await sql`
			SELECT 1 AS present FROM ${sql.ref(tableName)}
			WHERE deleted_at IS NULL
			LIMIT 1
		`.execute(trx)).rows.length > 0) return { outcome: "has_content" };
	}
	const result = await trx.updateTable("_emdash_media_usage_index_status as status").set({
		capture_state: "deleting",
		updated_at: timestampOffset(trx, 0)
	}).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", input.collectionSlug).where("status.collection_id", "=", input.collectionId).where("status.capture_state", "=", "active").where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").select("collection.id").where("collection.id", "=", input.collectionId).where("collection.slug", "=", input.collectionSlug))).executeTakeFirst();
	return Number(result.numUpdatedRows ?? 0) === 1 ? { outcome: "fenced" } : { outcome: "stale" };
}
async function lockLiveTombstone(trx, input) {
	const phase = input.action === "fence" ? "fence" : "table";
	if (isPostgres(trx)) return await trx.selectFrom("_emdash_media_usage_collection_deletions").select("collection_id").where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", phase).where("lease_token", "=", input.leaseToken).where(liveLease(trx)).forUpdate().executeTakeFirst() !== void 0;
	const locked = await trx.updateTable("_emdash_media_usage_collection_deletions").set({ updated_at: sql`updated_at` }).where("collection_id", "=", input.collectionId).where("collection_slug", "=", input.collectionSlug).where("state", "=", "leased").where("phase", "=", phase).where("lease_token", "=", input.leaseToken).where(liveLease(trx)).executeTakeFirst();
	return Number(locked.numUpdatedRows ?? 0) === 1;
}
function assertIdentity(input) {
	if (!input.collectionId) throw new Error("Collection deletion requires a collection ID");
	validateIdentifier(input.collectionSlug, "collection slug");
}
function assertGuardInput(input) {
	assertIdentity(input);
	if (!input.leaseToken) throw new Error("Collection deletion requires a lease token");
}
function liveLease(db, column = "lease_expires_at") {
	const leaseExpiresAt = sql.ref(column);
	return isPostgres(db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampIsDue(db, column) {
	return isPostgres(db) ? sql`${sql.ref(column)} <= to_char(
			statement_timestamp() AT TIME ZONE 'UTC',
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)` : sql`${sql.ref(column)} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampOffset(db, offsetSeconds) {
	if (isPostgres(db)) return sql`to_char(
			(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime(
		'%Y-%m-%dT%H:%M:%fZ',
		'now',
		${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
	)`;
}
function collectionDeletionCurrentTimestamp(db) {
	return timestampOffset(db, 0);
}
function rowToRecord(row) {
	if (!isState(row.state) || !isPhase(row.phase)) throw new Error("Invalid media usage collection deletion lifecycle");
	return {
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		forceDelete: Boolean(row.force_delete),
		state: row.state,
		phase: row.phase,
		workCursor: row.work_cursor,
		sourceKey: row.source_key,
		occurrenceCursor: row.occurrence_cursor,
		attemptCount: row.attempt_count,
		nextAttemptAt: row.next_attempt_at,
		leaseToken: row.lease_token,
		leaseExpiresAt: row.lease_expires_at,
		lastErrorCode: row.last_error_code,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOperatorItem(row) {
	const deletion = rowToRecord(row);
	return {
		collectionId: deletion.collectionId,
		collectionSlug: deletion.collectionSlug,
		state: deletion.state,
		phase: deletion.phase,
		attemptCount: deletion.attemptCount,
		nextAttemptAt: deletion.nextAttemptAt,
		leaseExpiresAt: deletion.leaseExpiresAt,
		lastErrorCode: deletion.lastErrorCode,
		updatedAt: deletion.updatedAt
	};
}
function isState(value) {
	return value === "pending" || value === "retry" || value === "leased" || value === "failed";
}
function isPhase(value) {
	return value === "fence" || value === "registry" || value === "table" || value === "work" || value === "sources" || value === "status" || value === "finalize";
}
var FINGERPRINT_PATTERN = new RegExp(`^media-usage-projection:v1:sha256:[a-f0-9]{64}$`);
function isMediaUsageProjectionFingerprint(value) {
	return typeof value === "string" && FINGERPRINT_PATTERN.test(value);
}
// node_modules/emdash/src/database/repositories/media-usage.ts
var OCCURRENCE_BIND_COLUMNS = 13;
var D1_MAX_BOUND_PARAMETERS = 100;
var MEDIA_USAGE_GENERATION_WRITE_LEASE_MS = 36e5;
var OCCURRENCE_INSERT_BATCH_SIZE = Math.max(1, Math.floor(D1_MAX_BOUND_PARAMETERS / OCCURRENCE_BIND_COLUMNS));
function cleanupDeleteBatchSize(cleanupLease) {
	return cleanupLease ? 47 : 50;
}
function canIssueCleanupStatement(canIssueStatement) {
	return canIssueStatement?.() ?? true;
}
function nullableRefMatch(left, right) {
	const leftRef = sql.ref(left);
	const rightRef = sql.ref(right);
	return sql`(
		(${leftRef} IS NULL AND ${rightRef} IS NULL)
		OR ${leftRef} = ${rightRef}
	)`;
}
var MAX_JSON_BIND_BYTES = 19e5;
var MEDIA_USAGE_EVENT_QUERY_CEILING = 900;
var MEDIA_USAGE_QUERY_RESERVE = 150;
function chunkJsonRows(rows) {
	const batches = [];
	let batch = [];
	let batchBytes = 2;
	for (const row of rows) {
		const rowBytes = new TextEncoder().encode(JSON.stringify(row)).byteLength + (batch.length > 0 ? 1 : 0);
		if (batch.length > 0 && batchBytes + rowBytes > MAX_JSON_BIND_BYTES) {
			batches.push(batch);
			batch = [];
			batchBytes = 2;
		}
		batch.push(row);
		batchBytes += rowBytes;
	}
	if (batch.length > 0) batches.push(batch);
	return batches;
}
function mediaUsageQueryBudgetAllows(queries) {
	const metrics = getRequestContext()?.metrics;
	return !metrics || metrics.dbCount + queries + MEDIA_USAGE_QUERY_RESERVE <= MEDIA_USAGE_EVENT_QUERY_CEILING;
}
function mergeInto(target, source) {
	for (const value of source) target.add(value);
}
function batchOccurrenceRows(prepared, now) {
	return prepared.flatMap((item) => item.projection.occurrences.map((occurrence) => ({
		id: ulid(),
		source_key: item.row.source_key,
		generation: item.generation,
		field_slug: occurrence.fieldSlug,
		field_path: occurrence.fieldPath,
		occurrence_index: occurrence.occurrenceIndex ?? 0,
		reference_type: occurrence.referenceType,
		media_id: occurrence.mediaId,
		provider: occurrence.provider,
		provider_asset_id: occurrence.providerAssetId,
		media_kind: occurrence.mediaKind ?? null,
		mime_type: occurrence.mimeType ?? null,
		created_at: now,
		lease_token: item.leaseToken
	})));
}
function cleanupDurationSeconds(value) {
	if (!Number.isSafeInteger(value) || value < 0) throw new Error("Media usage cleanup duration must be a non-negative whole number of seconds");
	return value;
}
var CONTENT_SOURCE_ELIGIBILITY = sql`(
	s.source_variant = 'draft_overlay'
	OR (
		s.source_variant = 'columns'
		AND (
			s.content_status = 'published'
			OR NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_sources AS overlay
				WHERE overlay.source_type = 'content'
					AND overlay.collection_slug = s.collection_slug
					AND overlay.content_id = s.content_id
					AND overlay.source_variant = 'draft_overlay'
					AND ${contentSourceMatchesActiveCollection("overlay", "s.collection_id")}
			)
		)
	)
)`;
function contentSourceMatchesActiveCollection(source, currentCollectionId) {
	return sql`(
		NOT EXISTS (
			SELECT 1
			FROM _emdash_media_usage_activation AS activation
			WHERE activation.task_key = 'incremental_capture'
				AND activation.state = 'active'
		)
		OR (
			${sql.ref(`${source}.collection_id`)} = ${sql.ref(currentCollectionId)}
			AND ${sql.ref(`${source}.identity_version`)} = 1
		)
	)`;
}
/** Persistence-only repository for the internal media usage projection tables. */
var MediaUsageRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async replaceSource(source, occurrences) {
		const generation = ulid();
		if (!await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) throw new Error(`Media usage collection is no longer current for ${source.sourceKey}`);
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (!await this.upsertSource(trx, source, generation, now, leaseToken)) throw new Error(`Media usage generation lease expired for ${source.sourceKey}`);
			});
		})) throw new Error(`Media usage collection is no longer current for ${source.sourceKey}`);
		const replaced = await this.findSource(source.sourceKey);
		if (!replaced) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return replaced;
	}
	async replaceSourceIfCurrent(source, occurrences, expectedCurrentGeneration) {
		if (expectedCurrentGeneration !== null && await this.projectionMatchesCurrentGeneration(source, expectedCurrentGeneration)) return {
			replaced: false,
			unchanged: true,
			source: null
		};
		const generation = ulid();
		let replaced = false;
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (expectedCurrentGeneration === null) {
					replaced = await this.insertSourceIfAbsent(trx, row, leaseToken);
					return;
				}
				replaced = await this.updateSourceIfGeneration(trx, row, expectedCurrentGeneration, leaseToken);
			});
		});
		return {
			replaced,
			unchanged: false,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async findSource(sourceKey) {
		const row = await this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_key", "=", sourceKey).executeTakeFirst();
		return row ? rowToSource(row) : null;
	}
	async findSources(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		const sources = /* @__PURE__ */ new Map();
		if (uniqueSourceKeys.length === 0) return sources;
		for (const sourceKeyBatch of chunkJsonRows(uniqueSourceKeys)) {
			const input = jsonTextValues(this.db, sourceKeyBatch);
			const result = await sql`
				WITH requested AS (${input})
				SELECT source.*
				FROM _emdash_media_usage_sources AS source
				INNER JOIN requested ON requested.value = source.source_key
			`.execute(this.db);
			for (const row of result.rows) {
				const source = rowToSource(row);
				sources.set(source.sourceKey, source);
			}
		}
		return sources;
	}
	async measureSourceGenerationDeletion(sourceKey, generation, maxOccurrences) {
		if (!Number.isSafeInteger(maxOccurrences) || maxOccurrences < 0) throw new Error("Media usage deletion measurement requires a non-negative row limit");
		const payload = sql`
			COALESCE(field_slug, '') || COALESCE(field_path, '') ||
			COALESCE(reference_type, '') || COALESCE(media_id, '') ||
			COALESCE(provider, '') || COALESCE(provider_asset_id, '') ||
			COALESCE(media_kind, '') || COALESCE(mime_type, '')
		`;
		const occurrenceBytes = isPostgres(this.db) ? sql`octet_length(${payload})` : sql`length(CAST(${payload} AS BLOB))`;
		const rows = await this.db.selectFrom("_emdash_media_usage").select(occurrenceBytes.as("occurrence_bytes")).where("source_key", "=", sourceKey).where("generation", "=", generation).limit(maxOccurrences + 1).execute();
		return {
			occurrenceCount: rows.length,
			occurrenceBytes: rows.reduce((total, row) => total + Number(row.occurrence_bytes), 0),
			exceedsOccurrenceLimit: rows.length > maxOccurrences
		};
	}
	async replaceSourceIfMatching(source, occurrences, expectedSource) {
		if (expectedSource !== null && await this.projectionMatchesExpectedSource(source, expectedSource)) return {
			replaced: false,
			unchanged: true,
			source: null
		};
		const generation = ulid();
		let replaced = false;
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (expectedSource === null) {
					replaced = await this.insertSourceIfAbsent(trx, row, leaseToken);
					return;
				}
				replaced = await this.updateSourceIfMatching(trx, row, expectedSource, leaseToken);
			});
		});
		return {
			replaced,
			unchanged: false,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async replaceNewSourcesBatch(projections) {
		const unique = [...new Map(projections.map((projection) => [projection.source.sourceKey, projection])).values()];
		if (unique.length === 0) return /* @__PURE__ */ new Set();
		const collectionSlug = unique[0]?.source.collectionSlug;
		const collectionId = unique[0]?.source.collectionId;
		if (!collectionSlug || !collectionId) throw new Error("Canonical media usage batch requires collection identity");
		validateIdentifier(collectionSlug, "collection slug");
		if (unique.some((projection) => projection.source.collectionSlug !== collectionSlug || projection.source.collectionId !== collectionId)) throw new Error("Canonical media usage batch must contain one collection");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const expiresAt = new Date(Date.now() + MEDIA_USAGE_GENERATION_WRITE_LEASE_MS).toISOString();
		const prepared = unique.map((projection) => {
			const generation = ulid();
			return {
				projection,
				generation,
				leaseToken: ulid(),
				row: this.buildSourceRow(projection.source, generation, now)
			};
		});
		const sourceRows = prepared.map((item) => ({
			...item.row,
			lease_token: item.leaseToken
		}));
		const occurrenceRows = batchOccurrenceRows(prepared, now);
		if (!mediaUsageQueryBudgetAllows(2 + chunkJsonRows(occurrenceRows).length + chunkJsonRows(sourceRows).length)) {
			if (unique.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(unique.length / 2);
			const inserted = /* @__PURE__ */ new Set();
			mergeInto(inserted, await this.replaceNewSourcesBatch(unique.slice(0, midpoint)));
			mergeInto(inserted, await this.replaceNewSourcesBatch(unique.slice(midpoint)));
			return inserted;
		}
		const leasesPayload = JSON.stringify(prepared.map((item) => ({
			source_key: item.row.source_key,
			collection_id: item.row.collection_id,
			collection_slug: item.row.collection_slug,
			generation: item.generation,
			lease_token: item.leaseToken,
			expires_at: expiresAt,
			created_at: now
		})));
		const leases = this.generationWriteBatchInput(leasesPayload);
		await sql`
			WITH input AS (${leases})
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT source_key, generation, lease_token, expires_at, created_at
			FROM input
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE collection.id = input.collection_id
					AND collection.slug = input.collection_slug
					AND status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.capture_state = 'active'
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = input.collection_id
					)
			)
		`.execute(this.db);
		try {
			await this.insertBatchOccurrences(occurrenceRows);
			const tableName = `ec_${collectionSlug}`;
			validateIdentifier(tableName, "content table");
			const inserted = /* @__PURE__ */ new Set();
			for (const sourceRowBatch of chunkJsonRows(sourceRows)) {
				const input = this.sourceBatchInput(JSON.stringify(sourceRowBatch));
				const result = await sql`
					WITH input AS (${input})
					INSERT INTO _emdash_media_usage_sources (
						source_key, source_type, collection_id, collection_slug, content_id,
						source_variant, locale, translation_group, content_slug, content_title,
						content_status, content_scheduled_at, content_deleted_at, revision_id,
						current_generation, schema_version, source_updated_at, source_version,
						source_fingerprint, identity_version, source_completeness,
						last_attempted_at, last_error_code, indexed_at, updated_at
					)
					SELECT
						input.source_key, input.source_type, input.collection_id, input.collection_slug,
						input.content_id, input.source_variant, input.locale, input.translation_group,
						input.content_slug, input.content_title, input.content_status,
						input.content_scheduled_at, input.content_deleted_at, input.revision_id,
						input.current_generation, input.schema_version, input.source_updated_at,
						input.source_version, input.source_fingerprint, input.identity_version,
						input.source_completeness, input.last_attempted_at, input.last_error_code,
						input.indexed_at, input.updated_at
					FROM input
					WHERE EXISTS (
						SELECT 1
						FROM _emdash_media_usage_generation_writes AS writer
						WHERE writer.source_key = input.source_key
							AND writer.generation = input.current_generation
							AND writer.lease_token = input.lease_token
							AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
					)
					AND EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						INNER JOIN _emdash_media_usage_index_status AS status
							ON status.collection_id = collection.id
							AND status.scope_key = collection.slug
						WHERE collection.id = input.collection_id
							AND collection.slug = input.collection_slug
							AND status.adapter_id = 'content-media'
							AND status.scope_type = 'collection'
							AND status.capture_state = 'active'
							AND NOT EXISTS (
								SELECT 1
								FROM _emdash_media_usage_collection_deletions AS deletion
								WHERE deletion.collection_id = input.collection_id
							)
					)
					AND EXISTS (
						SELECT 1
						FROM ${sql.ref(tableName)} AS content
						WHERE content.id = input.content_id
							AND content.version = input.source_version
							AND content.updated_at = input.source_updated_at
							AND (
								(input.source_variant = 'columns' AND ${nullableRefMatch("content.live_revision_id", "input.revision_id")})
								OR
								(input.source_variant = 'draft_overlay' AND ${nullableRefMatch("content.draft_revision_id", "input.revision_id")})
							)
					)
					ON CONFLICT (source_key) DO NOTHING
					RETURNING source_key
				`.execute(this.db);
				for (const row of result.rows) inserted.add(row.source_key);
			}
			return inserted;
		} finally {
			await sql`
				WITH input AS (${leases})
				DELETE FROM _emdash_media_usage_generation_writes AS writer
				WHERE EXISTS (
					SELECT 1
					FROM input
					WHERE input.source_key = writer.source_key
						AND input.generation = writer.generation
						AND input.lease_token = writer.lease_token
				)
			`.execute(this.db);
		}
	}
	async replaceExistingSourcesBatch(projections) {
		const unique = [...new Map(projections.map((projection) => [projection.source.sourceKey, projection])).values()];
		if (unique.length === 0) return /* @__PURE__ */ new Set();
		const collectionSlug = unique[0]?.source.collectionSlug;
		const collectionId = unique[0]?.source.collectionId;
		if (!collectionSlug || !collectionId) throw new Error("Canonical media usage batch requires collection identity");
		validateIdentifier(collectionSlug, "collection slug");
		if (unique.some((projection) => projection.source.collectionSlug !== collectionSlug || projection.source.collectionId !== collectionId)) throw new Error("Canonical media usage batch must contain one collection");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const expiresAt = new Date(Date.now() + MEDIA_USAGE_GENERATION_WRITE_LEASE_MS).toISOString();
		const prepared = unique.map((projection) => {
			const generation = ulid();
			return {
				projection,
				generation,
				leaseToken: ulid(),
				row: this.buildSourceRow(projection.source, generation, now)
			};
		});
		const sourceRows = prepared.map((item) => ({
			...item.row,
			lease_token: item.leaseToken,
			expected_generation: item.projection.expectedSource.currentGeneration,
			expected_collection_id: item.projection.expectedSource.collectionId,
			expected_updated_at: item.projection.expectedSource.updatedAt,
			expected_source_fingerprint: item.projection.expectedSource.sourceFingerprint,
			expected_source_updated_at: item.projection.expectedSource.sourceUpdatedAt,
			expected_source_version: item.projection.expectedSource.sourceVersion,
			expected_identity_version: item.projection.expectedSource.identityVersion,
			expected_revision_id: item.projection.expectedSource.revisionId,
			expected_source_completeness: item.projection.expectedSource.sourceCompleteness,
			expected_last_attempted_at: item.projection.expectedSource.lastAttemptedAt,
			expected_last_error_code: item.projection.expectedSource.lastErrorCode
		}));
		const occurrenceRows = batchOccurrenceRows(prepared, now);
		if (!mediaUsageQueryBudgetAllows(2 + chunkJsonRows(occurrenceRows).length + chunkJsonRows(sourceRows).length)) {
			if (unique.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(unique.length / 2);
			const replaced = /* @__PURE__ */ new Set();
			mergeInto(replaced, await this.replaceExistingSourcesBatch(unique.slice(0, midpoint)));
			mergeInto(replaced, await this.replaceExistingSourcesBatch(unique.slice(midpoint)));
			return replaced;
		}
		const leasesPayload = JSON.stringify(prepared.map((item) => ({
			source_key: item.row.source_key,
			collection_id: item.row.collection_id,
			collection_slug: item.row.collection_slug,
			generation: item.generation,
			lease_token: item.leaseToken,
			expires_at: expiresAt,
			created_at: now
		})));
		const leases = this.generationWriteBatchInput(leasesPayload);
		await sql`
			WITH input AS (${leases})
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT source_key, generation, lease_token, expires_at, created_at
			FROM input
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE collection.id = input.collection_id
					AND collection.slug = input.collection_slug
					AND status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.capture_state = 'active'
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = input.collection_id
					)
			)
		`.execute(this.db);
		try {
			await this.insertBatchOccurrences(occurrenceRows);
			const tableName = `ec_${collectionSlug}`;
			validateIdentifier(tableName, "content table");
			const replaced = /* @__PURE__ */ new Set();
			for (const sourceRowBatch of chunkJsonRows(sourceRows)) {
				const input = this.sourceBatchInput(JSON.stringify(sourceRowBatch));
				const result = await sql`
					WITH input AS (${input})
					UPDATE _emdash_media_usage_sources AS source
					SET source_type = input.source_type,
						collection_id = input.collection_id,
						collection_slug = input.collection_slug,
						content_id = input.content_id,
						source_variant = input.source_variant,
						locale = input.locale,
						translation_group = input.translation_group,
						content_slug = input.content_slug,
						content_title = input.content_title,
						content_status = input.content_status,
						content_scheduled_at = input.content_scheduled_at,
						content_deleted_at = input.content_deleted_at,
						revision_id = input.revision_id,
						current_generation = input.current_generation,
						schema_version = input.schema_version,
						source_updated_at = input.source_updated_at,
						source_version = input.source_version,
						source_fingerprint = input.source_fingerprint,
						identity_version = input.identity_version,
						source_completeness = input.source_completeness,
						last_attempted_at = input.last_attempted_at,
						last_error_code = input.last_error_code,
						indexed_at = input.indexed_at,
						updated_at = input.updated_at
					FROM input
					WHERE source.source_key = input.source_key
						AND source.current_generation = input.expected_generation
						AND ${this.batchRefsMatch("source.collection_id", "input.expected_collection_id")}
						AND source.updated_at = input.expected_updated_at
						AND ${this.batchRefsMatch("source.source_fingerprint", "input.expected_source_fingerprint")}
						AND ${this.batchRefsMatch("source.source_updated_at", "input.expected_source_updated_at")}
						AND ${this.batchRefsMatch("source.source_version", "input.expected_source_version")}
						AND ${this.batchRefsMatch("source.identity_version", "input.expected_identity_version")}
						AND ${this.batchRefsMatch("source.revision_id", "input.expected_revision_id")}
						AND source.source_completeness = input.expected_source_completeness
						AND ${this.batchRefsMatch("source.last_attempted_at", "input.expected_last_attempted_at")}
						AND ${this.batchRefsMatch("source.last_error_code", "input.expected_last_error_code")}
						AND EXISTS (
							SELECT 1
							FROM _emdash_media_usage_generation_writes AS writer
							WHERE writer.source_key = input.source_key
								AND writer.generation = input.current_generation
								AND writer.lease_token = input.lease_token
								AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
						)
						AND EXISTS (
							SELECT 1
							FROM _emdash_collections AS collection
							INNER JOIN _emdash_media_usage_index_status AS status
								ON status.collection_id = collection.id
								AND status.scope_key = collection.slug
							WHERE collection.id = input.collection_id
								AND collection.slug = input.collection_slug
								AND status.adapter_id = 'content-media'
								AND status.scope_type = 'collection'
								AND status.capture_state = 'active'
								AND NOT EXISTS (
									SELECT 1
									FROM _emdash_media_usage_collection_deletions AS deletion
									WHERE deletion.collection_id = input.collection_id
								)
						)
						AND EXISTS (
							SELECT 1
							FROM ${sql.ref(tableName)} AS content
							WHERE content.id = input.content_id
								AND content.version = input.source_version
								AND content.updated_at = input.source_updated_at
								AND (
									(input.source_variant = 'columns' AND ${nullableRefMatch("content.live_revision_id", "input.revision_id")})
									OR
									(input.source_variant = 'draft_overlay' AND ${nullableRefMatch("content.draft_revision_id", "input.revision_id")})
								)
						)
					RETURNING ${isPostgres(this.db) ? sql`source.source_key` : sql`source_key`} AS source_key
				`.execute(this.db);
				for (const row of result.rows) replaced.add(row.source_key);
			}
			return replaced;
		} finally {
			await sql`
				WITH input AS (${leases})
				DELETE FROM _emdash_media_usage_generation_writes AS writer
				WHERE EXISTS (
					SELECT 1
					FROM input
					WHERE input.source_key = writer.source_key
						AND input.generation = writer.generation
						AND input.lease_token = writer.lease_token
				)
			`.execute(this.db);
		}
	}
	async matchingExistingSourcesBatch(projections) {
		if (projections.length === 0) return /* @__PURE__ */ new Set();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const rows = projections.map((projection) => ({
			...this.buildSourceRow(projection.source, projection.expectedSource.currentGeneration, now),
			expected_generation: projection.expectedSource.currentGeneration,
			expected_collection_id: projection.expectedSource.collectionId,
			expected_updated_at: projection.expectedSource.updatedAt,
			expected_source_fingerprint: projection.expectedSource.sourceFingerprint,
			expected_source_updated_at: projection.expectedSource.sourceUpdatedAt,
			expected_source_version: projection.expectedSource.sourceVersion,
			expected_identity_version: projection.expectedSource.identityVersion,
			expected_revision_id: projection.expectedSource.revisionId,
			expected_source_completeness: projection.expectedSource.sourceCompleteness,
			expected_last_attempted_at: projection.expectedSource.lastAttemptedAt,
			expected_last_error_code: projection.expectedSource.lastErrorCode
		}));
		if (!mediaUsageQueryBudgetAllows(chunkJsonRows(rows).length)) {
			if (projections.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(projections.length / 2);
			const matched = /* @__PURE__ */ new Set();
			mergeInto(matched, await this.matchingExistingSourcesBatch(projections.slice(0, midpoint)));
			mergeInto(matched, await this.matchingExistingSourcesBatch(projections.slice(midpoint)));
			return matched;
		}
		const matched = /* @__PURE__ */ new Set();
		for (const batch of chunkJsonRows(rows)) {
			const input = this.sourceBatchInput(JSON.stringify(batch));
			const result = await sql`
				WITH input AS (${input})
				SELECT source.source_key
				FROM _emdash_media_usage_sources AS source
				INNER JOIN input ON input.source_key = source.source_key
				WHERE source.current_generation = input.expected_generation
					AND ${this.batchRefsMatch("source.collection_id", "input.expected_collection_id")}
					AND source.updated_at = input.expected_updated_at
					AND ${this.batchRefsMatch("source.source_fingerprint", "input.expected_source_fingerprint")}
					AND ${this.batchRefsMatch("source.source_updated_at", "input.expected_source_updated_at")}
					AND ${this.batchRefsMatch("source.source_version", "input.expected_source_version")}
					AND ${this.batchRefsMatch("source.identity_version", "input.expected_identity_version")}
					AND ${this.batchRefsMatch("source.revision_id", "input.expected_revision_id")}
					AND source.source_completeness = input.expected_source_completeness
					AND ${this.batchRefsMatch("source.last_attempted_at", "input.expected_last_attempted_at")}
					AND ${this.batchRefsMatch("source.last_error_code", "input.expected_last_error_code")}
					AND EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						WHERE collection.id = source.collection_id
							AND collection.slug = source.collection_slug
					)
			`.execute(this.db);
			for (const row of result.rows) matched.add(row.source_key);
		}
		return matched;
	}
	async markSourceAttempted(source) {
		if (source.collectionId !== void 0 && source.collectionId !== null) {
			const expectedSource = await this.findSource(source.sourceKey);
			if (!(await this.markSourceAttemptedIfMatching(source, expectedSource)).attempted) throw new Error(`Canonical media usage source ${source.sourceKey} is no longer current`);
			const attempted = await this.findSource(source.sourceKey);
			if (!attempted) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
			return attempted;
		}
		const generation = ulid();
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildAttemptedSourceRow(source, generation, now);
			const updates = this.attemptedSourceUpdateSet(source, row);
			if (((await this.db.insertInto("_emdash_media_usage_sources").values(row).onConflict((oc) => oc.column("source_key").doUpdateSet(updates)).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) <= 0n) throw new Error(`Media usage generation lease expired for ${source.sourceKey}`);
		});
		const attempted = await this.findSource(source.sourceKey);
		if (!attempted) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return attempted;
	}
	async markSourceAttemptedIfMatching(source, expectedSource) {
		const generation = ulid();
		let attempted = false;
		if (expectedSource === null) await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildAttemptedSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				attempted = await this.persistSourceIfWriteLease(trx, row, leaseToken, sql`ON CONFLICT (source_key) DO NOTHING`);
			});
		});
		else {
			const row = this.buildAttemptedSourceRow(source, generation, (/* @__PURE__ */ new Date()).toISOString());
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				attempted = await this.updateAttemptedSourceIfMatching(trx, source, row, expectedSource);
			});
		}
		return {
			attempted,
			source: attempted ? null : await this.findSource(source.sourceKey)
		};
	}
	async findActiveEntryCountsByMediaIds(mediaIds) {
		const uniqueMediaIds = [...new Set(mediaIds)];
		const counts = new Map(uniqueMediaIds.map((mediaId) => [mediaId, 0]));
		for (const mediaIdBatch of chunks(uniqueMediaIds, 50)) {
			const visibleEntries = this.currentContentMediaUsageBaseQuery().select([
				"u.media_id as media_id",
				"s.collection_slug as collection_slug",
				"s.content_id as content_id"
			]).where("u.media_id", "in", mediaIdBatch).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_sources as deleted_source").select("deleted_source.source_key").where("deleted_source.source_type", "=", "content").whereRef("deleted_source.collection_slug", "=", "s.collection_slug").whereRef("deleted_source.content_id", "=", "s.content_id").where("deleted_source.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("deleted_source", "collection.id")).where("deleted_source.content_deleted_at", "is not", null)))).distinct().as("visible_entries");
			const rows = await this.db.selectFrom(visibleEntries).select("media_id").select((eb) => eb.fn.countAll().as("usage_count")).groupBy("media_id").execute();
			for (const row of rows) if (row.media_id !== null) counts.set(row.media_id, Number(row.usage_count));
		}
		return counts;
	}
	/**
	* Read collection index status and the named options in one statement.
	* The one-row anchor keeps the option values readable on a site with no
	* collections.
	*/
	async findCoverageWithOptions(identity, optionNames) {
		let query = this.db.selectFrom(this.db.selectNoFrom(sql`1`.as("anchor")).as("anchor")).leftJoin("_emdash_collections as collection", (join) => join.on(sql`1 = 1`)).leftJoin("_emdash_media_usage_index_status as status", (join) => join.on("status.adapter_id", "=", identity.adapterId).on("status.scope_type", "=", identity.scopeType).onRef("status.scope_key", "=", "collection.slug")).select([
			"collection.slug as collection_slug",
			"status.status as status",
			"status.schema_version as schema_version",
			"status.reconciliation_required as reconciliation_required"
		]).orderBy("collection.slug", "asc");
		const optionAliases = optionNames.map((name, index) => [name, `option_${index}`]);
		for (const [name, alias] of optionAliases) query = query.select((eb) => eb.selectFrom("options").select("value").where("name", "=", name).as(alias));
		const rows = await query.execute();
		const scopes = [];
		for (const row of rows) {
			if (typeof row.collection_slug !== "string") continue;
			scopes.push({
				collectionSlug: row.collection_slug,
				status: typeof row.status === "string" ? row.status : null,
				schemaVersion: row.schema_version == null ? null : Number(row.schema_version),
				reconciliationRequired: row.reconciliation_required != null && Number(row.reconciliation_required) !== 0
			});
		}
		const firstRow = rows[0];
		const options = /* @__PURE__ */ new Map();
		for (const [name, alias] of optionAliases) {
			const value = firstRow?.[alias];
			options.set(name, typeof value === "string" ? value : null);
		}
		return {
			scopes,
			options
		};
	}
	async findCollectionProgress() {
		const row = (await sql`
			WITH collection_progress AS (
				SELECT
					CASE WHEN status.status = 'complete'
						AND status.schema_version = ${2}
						AND status.reconciliation_required = 0
						AND status.capture_state = 'active'
						AND NOT EXISTS (
							SELECT 1 FROM _emdash_media_usage_work AS work
							WHERE work.collection_id = collection.id
								AND work.collection_slug = collection.slug
						)
					THEN 1 ELSE 0 END AS is_ready,
					CASE WHEN status.collection_id IS NULL
						OR COALESCE(status.capture_state, '') <> 'active'
						OR status.status NOT IN ('complete', 'never', 'running', 'partial', 'failed', 'stale')
						OR status.status = 'failed'
						OR (
							status.reconciliation_required = 0
							AND (
								status.status <> 'complete'
								OR COALESCE(status.schema_version, -1) <> ${2}
							)
							AND NOT EXISTS (
								SELECT 1 FROM _emdash_media_usage_work AS work
								WHERE work.collection_id = collection.id
									AND work.collection_slug = collection.slug
							)
						)
						OR EXISTS (
							SELECT 1 FROM _emdash_media_usage_work AS work
							WHERE work.collection_id = collection.id
								AND work.collection_slug = collection.slug
								AND work.state = 'failed'
						)
						OR EXISTS (
							SELECT 1 FROM _emdash_media_usage_reconciliations AS reconciliation
							WHERE reconciliation.collection_id = collection.id
								AND reconciliation.collection_slug = collection.slug
								AND reconciliation.state = 'failed'
								AND status.reconciliation_required = 1
								AND (
									reconciliation.target_epoch IS NULL
									OR reconciliation.target_epoch >= status.change_epoch
								)
						)
					THEN 1 ELSE 0 END AS needs_attention
				FROM _emdash_collections AS collection
				LEFT JOIN _emdash_media_usage_index_status AS status
					ON status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE NOT EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = collection.id
						AND deletion.collection_slug = collection.slug
				)
			)
			SELECT
				(
					SELECT activation.runtime_generation
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
				) AS activation_generation,
				EXISTS (
					SELECT 1 FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				) AS activation_active,
				COUNT(*) AS total_collections,
				COALESCE(SUM(is_ready), 0) AS ready_collections,
				EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.state IN ('pending', 'retry', 'leased')
				) AS cleanup_pending,
				CASE WHEN COALESCE(MAX(needs_attention), 0) = 1 OR EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.state = 'failed'
				) THEN 1 ELSE 0 END AS needs_attention
			FROM collection_progress
		`.execute(this.db)).rows[0];
		if (!row) throw new Error("Media usage progress query returned no result");
		if (!row.activation_active) return null;
		if (Number(row.activation_generation) !== 1) throw new MediaUsageActivationVersionMismatchError("Media usage activation runtime generation is incompatible");
		const readyCollections = Number(row.ready_collections);
		const totalCollections = Number(row.total_collections);
		const cleanupPending = Number(row.cleanup_pending);
		const needsAttention = Number(row.needs_attention);
		if (!Number.isSafeInteger(readyCollections) || !Number.isSafeInteger(totalCollections) || readyCollections < 0 || totalCollections < readyCollections || cleanupPending !== 0 && cleanupPending !== 1 || needsAttention !== 0 && needsAttention !== 1) throw new Error("Media usage progress query returned invalid counts");
		return {
			status: needsAttention ? "needs_attention" : readyCollections === totalCollections && cleanupPending === 0 ? "ready" : "indexing",
			readyCollections,
			totalCollections
		};
	}
	async findCurrentEntryUsagePageByMediaId(mediaId, options = {}) {
		const requestedLimit = Math.floor(options.limit ?? 50);
		const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(1, requestedLimit), 100) : 50;
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		if (cursor && (cursor.orderValue.length === 0 || cursor.id.length === 0)) throw new InvalidCursorError(options.cursor ?? "");
		let matchedGroups = this.currentContentMediaUsageBaseQuery().select([
			"collection.id as collection_id",
			"s.collection_slug as collection_slug",
			"s.content_id as content_id"
		]).where("u.media_id", "=", mediaId).distinct();
		if (cursor) matchedGroups = matchedGroups.where((eb) => eb.or([eb("s.collection_slug", ">", cursor.orderValue), eb.and([eb("s.collection_slug", "=", cursor.orderValue), eb("s.content_id", ">", cursor.id)])]));
		matchedGroups = matchedGroups.orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").limit(limit + 1);
		const rows = await this.db.with("matched_groups", () => matchedGroups).with("page_groups", (db) => db.selectFrom("matched_groups").selectAll().orderBy("collection_slug", "asc").orderBy("content_id", "asc").limit(limit)).with("entry_state", (db) => db.selectFrom("page_groups as page").crossJoin("_emdash_media_usage_sources as state").select([
			"page.collection_id",
			"page.collection_slug",
			"page.content_id"
		]).select((eb) => eb.fn.max("state.content_deleted_at").as("entry_deleted_at")).whereRef("page.collection_slug", "=", "state.collection_slug").whereRef("page.content_id", "=", "state.content_id").where("state.source_type", "=", "content").where("state.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("state", "page.collection_id")).groupBy([
			"page.collection_id",
			"page.collection_slug",
			"page.content_id"
		])).selectFrom("entry_state as page").crossJoin("_emdash_media_usage_sources as s").crossJoin("_emdash_media_usage as u").whereRef("page.collection_slug", "=", "s.collection_slug").whereRef("page.content_id", "=", "s.content_id").where(contentSourceMatchesActiveCollection("s", "page.collection_id")).whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").select(currentUsageSelect).select("page.entry_deleted_at").select(sql`CASE
					WHEN (SELECT COUNT(*) FROM matched_groups) > ${limit} THEN 1
					ELSE 0
				END`.as("has_more")).where("u.media_id", "=", mediaId).where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(CONTENT_SOURCE_ELIGIBILITY).orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").orderBy("s.source_variant", "asc").orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").orderBy("u.id", "asc").execute();
		const items = groupUsageRows(rows);
		const result = { items };
		if (Number(rows[0]?.has_more ?? 0) === 1 && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.collectionSlug, last.contentId);
		}
		return result;
	}
	async findCurrentUsageByMediaId(mediaId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.media_id", "=", mediaId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsageByProviderAsset(provider, providerAssetId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsagePageByMediaId(mediaId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.media_id", "=", mediaId), options);
	}
	async findCurrentUsagePageByProviderAsset(provider, providerAssetId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId), options);
	}
	async deleteSource(sourceKey) {
		return this.deleteSources([sourceKey]);
	}
	async deleteSourceIfCurrent(sourceKey, expectedCurrentGeneration) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where("current_generation", "=", expectedCurrentGeneration).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedCurrentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatching(sourceKey, expectedSource) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(expectedSource.collectionId, expectedSource.collectionSlug)).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatchingContentAbsent(sourceKey, expectedSource, collectionSlug, contentId) {
		validateIdentifier(collectionSlug, "collection slug");
		const tableName = `ec_${collectionSlug}`;
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(expectedSource.collectionId, expectedSource.collectionSlug)).where(sql`NOT EXISTS (SELECT 1 FROM ${sql.ref(tableName)} WHERE id = ${contentId})`).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		const contentPresent = deleted ? false : await this.contentRowExists(tableName, contentId);
		return {
			deleted,
			contentPresent,
			source: deleted || contentPresent ? null : await this.findSource(sourceKey)
		};
	}
	async deleteSources(sourceKeys) {
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteContentSources(collectionSlug, contentId) {
		const sourceKeys = (await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).execute()).map((row) => row.source_key);
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteCollectionSources(collectionSlug) {
		let deleted = 0;
		while (true) {
			const sourceRows = await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc").limit(50).execute();
			if (sourceRows.length === 0) break;
			deleted += await this.deleteSourceKeys(sourceRows.map((row) => row.source_key));
		}
		return deleted;
	}
	async findCollectionContentSources(collectionSlug, collectionId) {
		let query = this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc");
		if (collectionId !== void 0) query = query.where("collection_id", "=", collectionId);
		return (await query.execute()).map((row) => rowToSource(row));
	}
	async claimMediaUsageCleanup(input) {
		const leaseDurationSeconds = cleanupDurationSeconds(input.leaseDurationSeconds);
		const nextEligibleDelaySeconds = cleanupDurationSeconds(input.nextEligibleDelaySeconds);
		const sweepSafetyWindowSeconds = cleanupDurationSeconds(input.sweepSafetyWindowSeconds);
		const claimedAt = this.cleanupTimestampOffset(0);
		const leaseExpiresAt = this.cleanupTimestampOffset(leaseDurationSeconds);
		const nextEligibleAt = this.cleanupTimestampOffset(nextEligibleDelaySeconds);
		const sweepBeforeAt = this.cleanupTimestampOffset(-sweepSafetyWindowSeconds);
		const row = await this.db.updateTable("_emdash_media_usage_cleanup").set({
			lease_token: input.leaseToken,
			lease_expires_at: leaseExpiresAt,
			next_eligible_at: nextEligibleAt,
			last_started_at: claimedAt,
			updated_at: claimedAt,
			scan_before_at: sql`CASE
					WHEN scan_before_at IS NULL THEN ${sweepBeforeAt}
					ELSE scan_before_at
				END`
		}).where("task_key", "=", "projection_gc").where(this.cleanupTimestampIsDue("next_eligible_at")).where((eb) => eb.or([eb("lease_token", "is", null), this.cleanupTimestampIsDue("lease_expires_at")])).returning([
			"cursor_created_at",
			"cursor_id",
			"last_started_at",
			"scan_before_at",
			"consecutive_failures"
		]).executeTakeFirst();
		if (!row) return null;
		if (!row.last_started_at || !row.scan_before_at) throw new Error("Media usage cleanup claim did not persist its database timestamps");
		return {
			leaseToken: input.leaseToken,
			cursor: row.cursor_created_at && row.cursor_id ? {
				createdAt: row.cursor_created_at,
				id: row.cursor_id
			} : null,
			claimedAt: row.last_started_at,
			scanBeforeAt: row.scan_before_at,
			consecutiveFailures: row.consecutive_failures
		};
	}
	/**
	* Scans for reclaimable occurrences, or resolves to `null` when the sweep was
	* never issued because the lease is gone or the tick is out of budget. An
	* empty array means the scan ran and found nothing, which lets the caller
	* retire the sweep window; `null` must leave the cursor where it was.
	*/
	async findMediaUsageCleanupCandidates(input) {
		if (!await this.admitCleanupScan(input.cleanupLease, input.canIssueStatement)) return null;
		let query = this.db.selectFrom("_emdash_media_usage as u").leftJoin("_emdash_media_usage_sources as s", "s.source_key", "u.source_key").leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select([
			"u.id as id",
			"u.source_key as source_key",
			"u.generation as generation",
			"u.created_at as created_at",
			"s.current_generation as current_generation",
			"s.indexed_at as indexed_at",
			"writer.expires_at as write_lease_expires_at"
		]).where("u.created_at", "<", input.cutoff).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(Math.max(0, Math.floor(input.limit)));
		if (input.cursor) {
			const cursor = input.cursor;
			query = query.where((eb) => eb(eb.refTuple("u.created_at", "u.id"), ">", eb.tuple(cursor.createdAt, cursor.id)));
		}
		return (await query.execute()).map((row) => ({
			id: row.id,
			sourceKey: row.source_key,
			generation: row.generation,
			createdAt: row.created_at,
			currentGeneration: row.current_generation,
			indexedAt: row.indexed_at,
			writeLeaseExpiresAt: row.write_lease_expires_at
		}));
	}
	async completeMediaUsageCleanup(input) {
		const updates = {
			lease_token: null,
			lease_expires_at: null,
			cursor_created_at: input.sweepComplete ? null : input.nextCursor?.createdAt ?? null,
			cursor_id: input.sweepComplete ? null : input.nextCursor?.id ?? null,
			...input.sweepComplete ? { scan_before_at: null } : {},
			consecutive_failures: 0,
			last_completed_at: this.cleanupTimestampOffset(0),
			last_candidate_count: input.candidateCount,
			last_deleted_orphans: input.deletedOrphans,
			last_deleted_stale: input.deletedStale,
			last_deleted_abandoned: input.deletedAbandoned,
			last_deleted_write_leases: input.deletedWriteLeases,
			last_backlog_lower_bound: input.backlogLowerBound,
			last_scan_has_more: input.scanHasMore ? 1 : 0,
			last_duration_ms: input.durationMs,
			last_error_code: null,
			updated_at: this.cleanupTimestampOffset(0)
		};
		const result = await this.db.updateTable("_emdash_media_usage_cleanup").set(updates).where("task_key", "=", "projection_gc").where("lease_token", "=", input.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at")).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async failMediaUsageCleanup(input) {
		const retryDelaySeconds = cleanupDurationSeconds(input.retryDelaySeconds);
		const result = await this.db.updateTable("_emdash_media_usage_cleanup").set({
			lease_token: null,
			lease_expires_at: null,
			next_eligible_at: this.cleanupTimestampOffset(retryDelaySeconds),
			consecutive_failures: input.consecutiveFailures,
			last_completed_at: this.cleanupTimestampOffset(0),
			last_duration_ms: input.durationMs,
			last_error_code: input.errorCode,
			updated_at: this.cleanupTimestampOffset(0)
		}).where("task_key", "=", "projection_gc").where("lease_token", "=", input.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at")).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async deleteOrphanOccurrencesOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteOrphanCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").leftJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("s.source_key", "is", null).where("u.created_at", "<", cutoff).where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteOrphanCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteStaleGenerationsOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteStaleCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", "<", "s.indexed_at").where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteStaleCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteAbandonedGenerationsOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteAbandonedCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", ">=", "s.indexed_at").where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteAbandonedCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteExpiredGenerationWriteLeases(limit, cleanupLease, canIssueStatement) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (!await this.admitCleanupScan(cleanupLease, canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage_generation_writes").select("lease_token").where(this.generationWriteLeaseHasExpired("expires_at")).orderBy("expires_at", "asc").orderBy("lease_token", "asc").limit(batchLimit).execute();
		if (rows.length === 0 || !canIssueCleanupStatement(canIssueStatement)) return 0;
		let deleteQuery = this.db.deleteFrom("_emdash_media_usage_generation_writes").where("lease_token", "in", rows.map((row) => row.lease_token)).where(this.generationWriteLeaseHasExpired("expires_at"));
		if (cleanupLease) deleteQuery = deleteQuery.where(this.activeCleanupLeaseExpression(cleanupLease));
		const result = await deleteQuery.executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async upsertIndexStatus(input) {
		const now = input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			adapter_id: input.adapterId,
			scope_type: input.scopeType,
			scope_key: input.scopeKey,
			status: input.status,
			schema_version: input.schemaVersion ?? 1,
			started_at: input.startedAt ?? null,
			completed_at: input.completedAt ?? null,
			cursor: input.cursor ?? null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: now
		};
		await this.db.insertInto("_emdash_media_usage_index_status").values(row).onConflict((oc) => oc.columns([
			"adapter_id",
			"scope_type",
			"scope_key"
		]).doUpdateSet({
			status: row.status,
			schema_version: row.schema_version,
			started_at: row.started_at,
			completed_at: row.completed_at,
			cursor: row.cursor,
			indexed_source_count: row.indexed_source_count,
			failed_source_count: row.failed_source_count,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		})).execute();
		const status = await this.findIndexStatus(input);
		if (!status) throw new Error(`Media usage index status ${input.adapterId}:${input.scopeType}:${input.scopeKey} was not persisted`);
		return status;
	}
	async invalidateIndexStatusForSchemaChange(collectionSlug) {
		const result = await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			change_epoch: sql`change_epoch + 1`,
			status: "stale",
			completed_at: null,
			cursor: null,
			last_error_code: "CONTENT_USAGE_STALE",
			reconciliation_required: 1,
			updated_at: this.sortableUtcTimestamp()
		}).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", collectionSlug).where("status.capture_state", "=", "active").where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").select("collection.id").whereRef("collection.id", "=", "status.collection_id").whereRef("collection.slug", "=", "status.scope_key"))).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async beginIndexStatusRepair(input) {
		return this.upsertIndexStatus({
			adapterId: input.adapterId,
			scopeType: input.scopeType,
			scopeKey: input.scopeKey,
			status: "running",
			schemaVersion: input.schemaVersion,
			startedAt: input.startedAt,
			completedAt: null,
			cursor: input.runToken,
			indexedSourceCount: 0,
			failedSourceCount: 0,
			lastErrorCode: null,
			updatedAt: input.updatedAt
		});
	}
	async finalizeIndexStatusRepairIfRunning(input) {
		const updates = {
			status: input.status,
			completed_at: input.completedAt,
			cursor: null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		if (input.schemaVersion !== void 0) updates.schema_version = input.schemaVersion;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set(updates).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("status", "=", "running").where("cursor", "=", input.runToken).executeTakeFirst();
		return {
			finalized: Number(result.numUpdatedRows ?? 0) > 0,
			status: await this.findIndexStatus(input)
		};
	}
	async beginIndexStatusRepairAtCurrentEpoch(input) {
		const now = this.sortableUtcTimestamp();
		const row = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: "running",
			schema_version: input.schemaVersion,
			started_at: now,
			completed_at: null,
			cursor: input.runToken,
			indexed_source_count: 0,
			failed_source_count: 0,
			last_error_code: null,
			reconciliation_required: 1,
			updated_at: now
		}).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.scopeKey}
				)`).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				)`).returning(["change_epoch", "started_at"]).executeTakeFirst();
		if (!row?.started_at) return null;
		return {
			changeEpoch: row.change_epoch,
			startedAt: row.started_at
		};
	}
	async finalizeIndexStatusRepairAtEpoch(input) {
		const now = this.sortableUtcTimestamp();
		const updates = {
			status: input.status,
			schema_version: input.schemaVersion,
			completed_at: now,
			cursor: null,
			indexed_source_count: input.indexedSourceCount,
			failed_source_count: input.failedSourceCount,
			last_error_code: input.lastErrorCode,
			reconciliation_required: input.status === "complete" ? 0 : 1,
			updated_at: now
		};
		let query = this.db.updateTable("_emdash_media_usage_index_status").set(updates).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("status", "=", "running").where("cursor", "=", input.runToken).where("change_epoch", "=", input.startingEpoch).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.scopeKey}
				)`);
		if (input.status === "complete") query = query.where(sql`NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = ${input.collectionId}
				)`);
		const result = await query.executeTakeFirst();
		const finalized = Number(result.numUpdatedRows ?? 0) > 0;
		if (!finalized) await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: "stale",
			completed_at: null,
			cursor: null,
			last_error_code: "CONTENT_USAGE_REPAIR_CONFLICT",
			reconciliation_required: 1,
			updated_at: this.sortableUtcTimestamp()
		}).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("status", "=", "running").where("cursor", "=", input.runToken).execute();
		return {
			finalized,
			status: await this.findIndexStatusForCollection(input, input.collectionId)
		};
	}
	async recordIncrementalSuccess(input) {
		const observed = await this.db.selectFrom("_emdash_media_usage_index_status").select("change_epoch").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		if (!observed) return false;
		const canComplete = sql`(
			reconciliation_required = 0
			AND status IN ('complete', 'stale', 'partial')
			AND NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_work AS work
				WHERE work.collection_id = ${input.collectionId}
			)
		)`;
		const now = this.sortableUtcTimestamp();
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: sql`CASE WHEN ${canComplete} THEN 'complete' ELSE status END`,
			completed_at: sql`CASE WHEN ${canComplete} THEN ${now} ELSE completed_at END`,
			last_error_code: sql`CASE WHEN ${canComplete} THEN NULL ELSE last_error_code END`,
			cursor: sql`CASE WHEN ${canComplete} THEN NULL ELSE cursor END`,
			last_incremental_success_at: now,
			updated_at: now
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("change_epoch", "=", observed.change_epoch).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async prepareIncrementalFinalization(input) {
		const observed = await this.db.selectFrom("_emdash_media_usage_index_status").select(["change_epoch", "reconciliation_required"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").executeTakeFirst();
		if (!observed) return { outcome: "lost" };
		if (observed.reconciliation_required !== 0) return { outcome: "not_required" };
		const marker = `incremental-finalize:${String(observed.change_epoch)}:${ulid()}`;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			cursor: marker,
			updated_at: this.sortableUtcTimestamp()
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where("reconciliation_required", "=", 0).where("change_epoch", "=", observed.change_epoch).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).where(sql`NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = ${input.collectionId}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0 ? {
			outcome: "marked",
			marker
		} : { outcome: "lost" };
	}
	async recoverIncrementalFinalizations() {
		const markerMatchesEpoch = isPostgres(this.db) ? sql`status.cursor LIKE ('incremental-finalize:' || status.change_epoch::text || ':%')` : sql`status.cursor LIKE ('incremental-finalize:' || CAST(status.change_epoch AS text) || ':%')`;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return (await sql`
			UPDATE _emdash_media_usage_index_status AS status
			SET status = 'complete',
				completed_at = ${now},
				cursor = NULL,
				last_error_code = NULL,
				last_incremental_success_at = ${now},
				updated_at = ${now}
			WHERE status.adapter_id = 'content-media'
				AND status.scope_type = 'collection'
				AND status.capture_state = 'active'
				AND status.reconciliation_required = 0
				AND status.cursor IS NOT NULL
				AND ${markerMatchesEpoch}
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = status.collection_id
						AND collection.slug = status.scope_key
				)
				AND NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = status.collection_id
				)
				AND NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = status.collection_id
				)
			RETURNING collection_id
		`.execute(this.db)).rows.length;
	}
	async recordIncrementalFailure(input) {
		const now = this.sortableUtcTimestamp();
		const automaticRunOwnsCoverage = sql`EXISTS (
			SELECT 1
			FROM _emdash_media_usage_reconciliations AS reconciliation
			WHERE reconciliation.collection_id = ${input.collectionId}
				AND reconciliation.run_token = cursor
		)`;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN status
					WHEN reconciliation_required = 0 THEN 'partial'
					WHEN status = 'running' THEN 'stale'
					ELSE status
				END`,
			completed_at: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN completed_at
					WHEN reconciliation_required = 0 OR status = 'running' THEN NULL
					ELSE completed_at
				END`,
			cursor: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN cursor
					WHEN status = 'running' THEN NULL
					ELSE cursor
				END`,
			last_error_code: input.errorCode,
			updated_at: now
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = ${input.collectionId}
						AND work.content_id = ${input.contentId}
						AND work.work_version = ${input.workVersion}
						AND work.state = 'failed'
						AND work.last_error_code = ${input.errorCode}
				)`).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async recordIncrementalFailuresByCollection(input) {
		const collectionIds = [...new Set(input.collectionIds)];
		if (collectionIds.length === 0) return /* @__PURE__ */ new Set();
		const collections = jsonTextValues(this.db, collectionIds);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const result = await sql`
			WITH failed_collections AS (${collections})
			UPDATE _emdash_media_usage_index_status AS status
			SET status = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.status
					WHEN status.reconciliation_required = 0 THEN 'partial'
					WHEN status.status = 'running' THEN 'stale'
					ELSE status.status
				END,
				completed_at = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.completed_at
					WHEN status.reconciliation_required = 0 OR status.status = 'running' THEN NULL
					ELSE status.completed_at
				END,
				cursor = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.cursor
					WHEN status.status = 'running' THEN NULL
					ELSE status.cursor
				END,
				last_error_code = ${input.errorCode},
				updated_at = ${now}
			WHERE status.adapter_id = 'content-media'
				AND status.scope_type = 'collection'
				AND status.collection_id IN (SELECT value FROM failed_collections)
				AND EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = status.collection_id
						AND work.state = 'failed'
						AND work.last_error_code = ${input.errorCode}
				)
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = status.collection_id
						AND collection.slug = status.scope_key
				)
			RETURNING collection_id
		`.execute(this.db);
		return new Set(result.rows.map((row) => row.collection_id));
	}
	async findIndexStatus(identity) {
		const row = await this.db.selectFrom("_emdash_media_usage_index_status").selectAll().where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).executeTakeFirst();
		return row ? rowToIndexStatus(row) : null;
	}
	async findIndexStatusForCollection(identity, collectionId) {
		const row = await this.db.selectFrom("_emdash_media_usage_index_status").selectAll().where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).where("collection_id", "=", collectionId).executeTakeFirst();
		return row ? rowToIndexStatus(row) : null;
	}
	async deleteIndexStatus(identity, collectionId) {
		let query = this.db.deleteFrom("_emdash_media_usage_index_status").where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey);
		if (collectionId !== void 0) query = query.where("collection_id", "=", collectionId);
		const result = await query.executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	sortableUtcTimestamp() {
		return isPostgres(this.db) ? sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')` : sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async findCurrentUsagePage(applyFilter, options) {
		const limit = Math.min(Math.max(1, options.limit ?? 50), 100);
		let query = applyFilter(this.currentUsageBaseQuery()).orderBy("u.id", "asc").limit(limit + 1);
		if (options.cursor) {
			const { id } = decodeCursor(options.cursor);
			query = query.where("u.id", ">", id);
		}
		const rows = await query.execute();
		const items = rows.slice(0, limit).map(rowToUsageRecord);
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.occurrence.id, last.occurrence.id);
		}
		return result;
	}
	currentUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect);
	}
	currentContentMediaUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage as u").crossJoin("_emdash_media_usage_sources as s").innerJoin("_emdash_collections as collection", "collection.slug", "s.collection_slug").whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("s", "collection.id")).where(CONTENT_SOURCE_ELIGIBILITY);
	}
	async deleteOrphanCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markOrphanCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where(sql`NOT EXISTS (SELECT 1 FROM _emdash_media_usage_sources source WHERE source.source_key = _emdash_media_usage.source_key)`).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteStaleCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markStaleCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", "<", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteAbandonedCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markAbandonedCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", ">=", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async markOrphanCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where(sql`NOT EXISTS (SELECT 1 FROM _emdash_media_usage_sources source WHERE source.source_key = _emdash_media_usage.source_key)`).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	async markStaleCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", "<", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	async markAbandonedCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", ">=", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	noActiveGenerationWriteExpression(usageTable = "_emdash_media_usage") {
		const sourceKey = sql.ref(`${usageTable}.source_key`);
		const generation = sql.ref(`${usageTable}.generation`);
		return sql`NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes AS writer
				WHERE writer.source_key = ${sourceKey}
					AND writer.generation = ${generation}
					AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
			)`;
	}
	/**
	* Gates a bounded cleanup scan on the lease and the tick's statement budget.
	*
	* The budget is re-read after the lease row because that read is itself a
	* statement: an isolate suspended across it can resume with the budget spent.
	*/
	async admitCleanupScan(cleanupLease, canIssueStatement) {
		if (!canIssueCleanupStatement(canIssueStatement)) return false;
		if (!cleanupLease) return true;
		return await this.holdsCleanupLease(cleanupLease) && canIssueCleanupStatement(canIssueStatement);
	}
	/**
	* Reads the lease row on its own so a lost lease can short-circuit a sweep.
	*
	* As a row-level `EXISTS` inside a `LIMIT`ed scan this predicate is constant
	* across every candidate row: when it is false the limit is unreachable and
	* the scan reads the whole `created_at` range before returning nothing.
	* Mutating statements still carry {@link activeCleanupLeaseExpression},
	* which is what actually fences a displaced owner.
	*/
	async holdsCleanupLease(cleanupLease) {
		let query = this.db.selectFrom("_emdash_media_usage_cleanup").select("task_key").where("task_key", "=", "projection_gc").where("lease_token", "=", cleanupLease.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at"));
		if (isPostgres(this.db)) query = query.forUpdate();
		return await query.executeTakeFirst() !== void 0;
	}
	activeCleanupLeaseExpression(cleanupLease) {
		const rowLock = isPostgres(this.db) ? sql` FOR UPDATE` : sql``;
		return sql`EXISTS (
				SELECT 1
				FROM _emdash_media_usage_cleanup AS cleanup
				WHERE cleanup.task_key = 'projection_gc'
					AND cleanup.lease_token = ${cleanupLease.leaseToken}
					AND ${this.cleanupLeaseExpiryIsInFuture("cleanup.lease_expires_at")}
				${rowLock}
			)`;
	}
	cleanupLeaseExpiryIsInFuture(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	cleanupTimestampIsDue(column) {
		const timestamp = sql.ref(column);
		return isPostgres(this.db) ? sql`${timestamp}::timestamptz <= clock_timestamp()` : sql`${timestamp} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	cleanupTimestampOffset(offsetSeconds) {
		if (isPostgres(this.db)) return sql`to_char(
				(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)`;
		return sql`strftime(
			'%Y-%m-%dT%H:%M:%fZ',
			'now',
			${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
		)`;
	}
	generationWriteLeaseHasExpired(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz <= clock_timestamp()` : sql`${leaseExpiresAt} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async deleteSourceKeys(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		if (uniqueSourceKeys.length === 0) return 0;
		return withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			let deleted = 0;
			for (const sourceKeyBatch of chunks(uniqueSourceKeys, 50)) {
				const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "in", sourceKeyBatch).executeTakeFirst();
				deleted += Number(result.numDeletedRows ?? 0);
				await trx.updateTable("_emdash_media_usage").set({ cleanup_lease_token: null }).where("source_key", "in", sourceKeyBatch).execute();
				await trx.deleteFrom("_emdash_media_usage").where("source_key", "in", sourceKeyBatch).execute();
			}
			return deleted;
		});
	}
	async deleteSourceGenerationOccurrences(db, sourceKey, generation) {
		await db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: null }).where("source_key", "=", sourceKey).where("generation", "=", generation).execute();
		await db.deleteFrom("_emdash_media_usage").where("source_key", "=", sourceKey).where("generation", "=", generation).execute();
	}
	async lockCleanupBeforeSourceDelete(db) {
		if (!isPostgres(this.db)) return;
		await sql`
			SELECT 1
			FROM _emdash_media_usage_cleanup
			WHERE task_key = 'projection_gc'
			FOR SHARE
		`.execute(db);
	}
	async insertOccurrences(db, sourceKey, generation, occurrences, now) {
		if (occurrences.length === 0) return;
		const rows = occurrences.map((occurrence) => ({
			id: ulid(),
			source_key: sourceKey,
			generation,
			field_slug: occurrence.fieldSlug,
			field_path: occurrence.fieldPath,
			occurrence_index: occurrence.occurrenceIndex ?? 0,
			reference_type: occurrence.referenceType,
			media_id: occurrence.mediaId,
			provider: occurrence.provider,
			provider_asset_id: occurrence.providerAssetId,
			media_kind: occurrence.mediaKind ?? null,
			mime_type: occurrence.mimeType ?? null,
			created_at: now
		}));
		for (const rowBatch of chunks(rows, OCCURRENCE_INSERT_BATCH_SIZE)) await db.insertInto("_emdash_media_usage").values(rowBatch).execute();
	}
	async insertBatchOccurrences(rows) {
		for (const rowBatch of chunkJsonRows(rows)) {
			const input = this.occurrenceBatchInput(JSON.stringify(rowBatch));
			await sql`
				WITH input AS (${input})
				INSERT INTO _emdash_media_usage (
					id, source_key, generation, field_slug, field_path, occurrence_index,
					reference_type, media_id, provider, provider_asset_id, media_kind,
					mime_type, created_at
				)
				SELECT
					id, source_key, generation, field_slug, field_path, occurrence_index,
					reference_type, media_id, provider, provider_asset_id, media_kind,
					mime_type, created_at
				FROM input
				WHERE EXISTS (
					SELECT 1
					FROM _emdash_media_usage_generation_writes AS writer
					WHERE writer.source_key = input.source_key
						AND writer.generation = input.generation
						AND writer.lease_token = input.lease_token
						AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
				)
			`.execute(this.db);
		}
	}
	occurrenceBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'id' AS id,
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'generation' AS generation,
					entry.value ->> 'field_slug' AS field_slug,
					entry.value ->> 'field_path' AS field_path,
					CAST(entry.value ->> 'occurrence_index' AS integer) AS occurrence_index,
					entry.value ->> 'reference_type' AS reference_type,
					entry.value ->> 'media_id' AS media_id,
					entry.value ->> 'provider' AS provider,
					entry.value ->> 'provider_asset_id' AS provider_asset_id,
					entry.value ->> 'media_kind' AS media_kind,
					entry.value ->> 'mime_type' AS mime_type,
					entry.value ->> 'created_at' AS created_at,
					entry.value ->> 'lease_token' AS lease_token
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.id') AS id,
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.generation') AS generation,
				json_extract(entry.value, '$.field_slug') AS field_slug,
				json_extract(entry.value, '$.field_path') AS field_path,
				CAST(json_extract(entry.value, '$.occurrence_index') AS integer) AS occurrence_index,
				json_extract(entry.value, '$.reference_type') AS reference_type,
				json_extract(entry.value, '$.media_id') AS media_id,
				json_extract(entry.value, '$.provider') AS provider,
				json_extract(entry.value, '$.provider_asset_id') AS provider_asset_id,
				json_extract(entry.value, '$.media_kind') AS media_kind,
				json_extract(entry.value, '$.mime_type') AS mime_type,
				json_extract(entry.value, '$.created_at') AS created_at,
				json_extract(entry.value, '$.lease_token') AS lease_token
			FROM json_each(${payload}) AS entry
		`;
	}
	sourceBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'source_type' AS source_type,
					entry.value ->> 'collection_id' AS collection_id,
					entry.value ->> 'collection_slug' AS collection_slug,
					entry.value ->> 'content_id' AS content_id,
					entry.value ->> 'source_variant' AS source_variant,
					entry.value ->> 'locale' AS locale,
					entry.value ->> 'translation_group' AS translation_group,
					entry.value ->> 'content_slug' AS content_slug,
					entry.value ->> 'content_title' AS content_title,
					entry.value ->> 'content_status' AS content_status,
					entry.value ->> 'content_scheduled_at' AS content_scheduled_at,
					entry.value ->> 'content_deleted_at' AS content_deleted_at,
					entry.value ->> 'revision_id' AS revision_id,
					entry.value ->> 'current_generation' AS current_generation,
					CAST(entry.value ->> 'schema_version' AS integer) AS schema_version,
					entry.value ->> 'source_updated_at' AS source_updated_at,
					CAST(entry.value ->> 'source_version' AS bigint) AS source_version,
					entry.value ->> 'source_fingerprint' AS source_fingerprint,
					CAST(entry.value ->> 'identity_version' AS integer) AS identity_version,
					entry.value ->> 'source_completeness' AS source_completeness,
					entry.value ->> 'last_attempted_at' AS last_attempted_at,
					entry.value ->> 'last_error_code' AS last_error_code,
					entry.value ->> 'indexed_at' AS indexed_at,
					entry.value ->> 'updated_at' AS updated_at,
					entry.value ->> 'lease_token' AS lease_token,
					entry.value ->> 'expected_generation' AS expected_generation,
					entry.value ->> 'expected_collection_id' AS expected_collection_id,
					entry.value ->> 'expected_updated_at' AS expected_updated_at,
					entry.value ->> 'expected_source_fingerprint' AS expected_source_fingerprint,
					entry.value ->> 'expected_source_updated_at' AS expected_source_updated_at,
					CAST(entry.value ->> 'expected_source_version' AS bigint) AS expected_source_version,
					CAST(entry.value ->> 'expected_identity_version' AS integer) AS expected_identity_version,
					entry.value ->> 'expected_revision_id' AS expected_revision_id,
					entry.value ->> 'expected_source_completeness' AS expected_source_completeness,
					entry.value ->> 'expected_last_attempted_at' AS expected_last_attempted_at,
					entry.value ->> 'expected_last_error_code' AS expected_last_error_code
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.source_type') AS source_type,
				json_extract(entry.value, '$.collection_id') AS collection_id,
				json_extract(entry.value, '$.collection_slug') AS collection_slug,
				json_extract(entry.value, '$.content_id') AS content_id,
				json_extract(entry.value, '$.source_variant') AS source_variant,
				json_extract(entry.value, '$.locale') AS locale,
				json_extract(entry.value, '$.translation_group') AS translation_group,
				json_extract(entry.value, '$.content_slug') AS content_slug,
				json_extract(entry.value, '$.content_title') AS content_title,
				json_extract(entry.value, '$.content_status') AS content_status,
				json_extract(entry.value, '$.content_scheduled_at') AS content_scheduled_at,
				json_extract(entry.value, '$.content_deleted_at') AS content_deleted_at,
				json_extract(entry.value, '$.revision_id') AS revision_id,
				json_extract(entry.value, '$.current_generation') AS current_generation,
				CAST(json_extract(entry.value, '$.schema_version') AS integer) AS schema_version,
				json_extract(entry.value, '$.source_updated_at') AS source_updated_at,
				CAST(json_extract(entry.value, '$.source_version') AS integer) AS source_version,
				json_extract(entry.value, '$.source_fingerprint') AS source_fingerprint,
				CAST(json_extract(entry.value, '$.identity_version') AS integer) AS identity_version,
				json_extract(entry.value, '$.source_completeness') AS source_completeness,
				json_extract(entry.value, '$.last_attempted_at') AS last_attempted_at,
				json_extract(entry.value, '$.last_error_code') AS last_error_code,
				json_extract(entry.value, '$.indexed_at') AS indexed_at,
				json_extract(entry.value, '$.updated_at') AS updated_at,
				json_extract(entry.value, '$.lease_token') AS lease_token,
				json_extract(entry.value, '$.expected_generation') AS expected_generation,
				json_extract(entry.value, '$.expected_collection_id') AS expected_collection_id,
				json_extract(entry.value, '$.expected_updated_at') AS expected_updated_at,
				json_extract(entry.value, '$.expected_source_fingerprint') AS expected_source_fingerprint,
				json_extract(entry.value, '$.expected_source_updated_at') AS expected_source_updated_at,
				CAST(json_extract(entry.value, '$.expected_source_version') AS integer) AS expected_source_version,
				CAST(json_extract(entry.value, '$.expected_identity_version') AS integer) AS expected_identity_version,
				json_extract(entry.value, '$.expected_revision_id') AS expected_revision_id,
				json_extract(entry.value, '$.expected_source_completeness') AS expected_source_completeness,
				json_extract(entry.value, '$.expected_last_attempted_at') AS expected_last_attempted_at,
				json_extract(entry.value, '$.expected_last_error_code') AS expected_last_error_code
			FROM json_each(${payload}) AS entry
		`;
	}
	generationWriteBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'collection_id' AS collection_id,
					entry.value ->> 'collection_slug' AS collection_slug,
					entry.value ->> 'generation' AS generation,
					entry.value ->> 'lease_token' AS lease_token,
					entry.value ->> 'expires_at' AS expires_at,
					entry.value ->> 'created_at' AS created_at
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.collection_id') AS collection_id,
				json_extract(entry.value, '$.collection_slug') AS collection_slug,
				json_extract(entry.value, '$.generation') AS generation,
				json_extract(entry.value, '$.lease_token') AS lease_token,
				json_extract(entry.value, '$.expires_at') AS expires_at,
				json_extract(entry.value, '$.created_at') AS created_at
			FROM json_each(${payload}) AS entry
		`;
	}
	batchRefsMatch(left, right) {
		const leftRef = sql.ref(left);
		const rightRef = sql.ref(right);
		return isPostgres(this.db) ? sql`${leftRef} IS NOT DISTINCT FROM ${rightRef}` : sql`${leftRef} IS ${rightRef}`;
	}
	async lockCanonicalSourceCollection(db, source) {
		if (source.collectionId === void 0 || source.collectionId === null) return true;
		if (!source.collectionSlug) return false;
		if (!isPostgres(this.db)) return true;
		return await db.selectFrom("_emdash_collections").select("id").where("id", "=", source.collectionId).where("slug", "=", source.collectionSlug).forKeyShare().executeTakeFirst() !== void 0;
	}
	async upsertSource(db, source, generation, now, leaseToken) {
		const row = this.buildSourceRow(source, generation, now);
		return this.persistSourceIfWriteLease(db, row, leaseToken, sql`
				ON CONFLICT (source_key) DO UPDATE SET
					source_type = excluded.source_type,
					collection_id = excluded.collection_id,
					collection_slug = excluded.collection_slug,
					content_id = excluded.content_id,
					source_variant = excluded.source_variant,
					locale = excluded.locale,
					translation_group = excluded.translation_group,
					content_slug = excluded.content_slug,
					content_title = excluded.content_title,
					content_status = excluded.content_status,
					content_scheduled_at = excluded.content_scheduled_at,
					content_deleted_at = excluded.content_deleted_at,
					revision_id = excluded.revision_id,
					current_generation = excluded.current_generation,
					schema_version = excluded.schema_version,
					source_updated_at = excluded.source_updated_at,
					source_version = excluded.source_version,
					source_fingerprint = excluded.source_fingerprint,
					identity_version = excluded.identity_version,
					source_completeness = excluded.source_completeness,
					last_attempted_at = excluded.last_attempted_at,
					last_error_code = excluded.last_error_code,
					indexed_at = excluded.indexed_at,
					updated_at = excluded.updated_at
			`);
	}
	async insertSourceIfAbsent(db, row, leaseToken) {
		return this.persistSourceIfWriteLease(db, row, leaseToken, sql`ON CONFLICT (source_key) DO NOTHING`);
	}
	async persistSourceIfWriteLease(db, row, leaseToken, conflict) {
		const result = await sql`
			INSERT INTO _emdash_media_usage_sources (
				source_key,
				source_type,
				collection_id,
				collection_slug,
				content_id,
				source_variant,
				locale,
				translation_group,
				content_slug,
				content_title,
				content_status,
				content_scheduled_at,
				content_deleted_at,
				revision_id,
				current_generation,
				schema_version,
				source_updated_at,
				source_version,
				source_fingerprint,
				identity_version,
				source_completeness,
				last_attempted_at,
				last_error_code,
				indexed_at,
				updated_at
			)
			SELECT
				${row.source_key},
				${row.source_type},
				${row.collection_id},
				${row.collection_slug},
				${row.content_id},
				${row.source_variant},
				${row.locale},
				${row.translation_group},
				${row.content_slug},
				${row.content_title},
				${row.content_status},
				${row.content_scheduled_at},
				${row.content_deleted_at},
				${row.revision_id},
				${row.current_generation},
				${row.schema_version},
				${row.source_updated_at},
				${row.source_version},
				${row.source_fingerprint},
				${row.identity_version},
				${row.source_completeness},
				${row.last_attempted_at},
				${row.last_error_code},
				${row.indexed_at},
				${row.updated_at}
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes
				WHERE source_key = ${row.source_key}
					AND generation = ${row.current_generation}
					AND lease_token = ${leaseToken}
					AND ${this.generationWriteLeaseExpiryIsInFuture("expires_at")}
			)
			AND ${this.currentCollectionExists(row.collection_id, row.collection_slug)}
			AND ${this.currentCanonicalContentExists(row)}
			${conflict}
		`.execute(db);
		return Number(result.numAffectedRows ?? 0) > 0;
	}
	generationWriteLeaseExpression(row, leaseToken) {
		return (eb) => eb.exists(eb.selectFrom("_emdash_media_usage_generation_writes").select("source_key").where("source_key", "=", row.source_key).where("generation", "=", row.current_generation).where("lease_token", "=", leaseToken).where(this.generationWriteLeaseExpiryIsInFuture("_emdash_media_usage_generation_writes.expires_at")));
	}
	generationWriteLeaseExpiryIsInFuture(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async withGenerationWriteLease(source, generation, write) {
		const leaseToken = ulid();
		const owner = (await sql`
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT
				${source.sourceKey},
				${generation},
				${leaseToken},
				${this.generationWriteLeaseTimestampOffset(MEDIA_USAGE_GENERATION_WRITE_LEASE_MS / 1e3)},
				${this.generationWriteLeaseTimestampOffset(0)}
			WHERE ${this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)}
			RETURNING created_at
		`.execute(this.db)).rows[0];
		if (!owner) return false;
		try {
			await write(leaseToken, owner.created_at);
			return true;
		} finally {
			try {
				await this.db.deleteFrom("_emdash_media_usage_generation_writes").where("source_key", "=", source.sourceKey).where("generation", "=", generation).where("lease_token", "=", leaseToken).execute();
			} catch (error) {
				console.error("[media-usage] Failed to release generation write lease:", error);
			}
		}
	}
	generationWriteLeaseTimestampOffset(offsetSeconds) {
		if (isPostgres(this.db)) return sql`to_char(
				(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)`;
		return sql`strftime(
			'%Y-%m-%dT%H:%M:%fZ',
			'now',
			${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
		)`;
	}
	async updateSourceIfGeneration(db, row, expectedCurrentGeneration, leaseToken) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where("current_generation", "=", expectedCurrentGeneration).where(this.generationWriteLeaseExpression(row, leaseToken)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateSourceIfMatching(db, row, expectedSource, leaseToken) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).where(this.generationWriteLeaseExpression(row, leaseToken)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateAttemptedSourceIfMatching(db, source, row, expectedSource) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.attemptedSourceUpdateSet(source, row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	sourceMatchExpression(expectedSource) {
		return (eb) => eb.and([
			eb("current_generation", "=", expectedSource.currentGeneration),
			eb("source_completeness", "=", expectedSource.sourceCompleteness),
			this.nullableStringExpression(eb, "collection_id", expectedSource.collectionId),
			this.nullableStringExpression(eb, "updated_at", expectedSource.updatedAt),
			this.nullableStringExpression(eb, "source_fingerprint", expectedSource.sourceFingerprint),
			this.nullableStringExpression(eb, "source_updated_at", expectedSource.sourceUpdatedAt),
			this.nullableNumberExpression(eb, "source_version", expectedSource.sourceVersion),
			this.nullableNumberExpression(eb, "identity_version", expectedSource.identityVersion),
			this.nullableStringExpression(eb, "revision_id", expectedSource.revisionId),
			this.nullableStringExpression(eb, "last_attempted_at", expectedSource.lastAttemptedAt),
			this.nullableStringExpression(eb, "last_error_code", expectedSource.lastErrorCode)
		]);
	}
	async projectionMatchesCurrentGeneration(source, expectedCurrentGeneration) {
		const fingerprint = source.sourceFingerprint;
		if (!isMediaUsageProjectionFingerprint(fingerprint)) return false;
		return await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_key", "=", source.sourceKey).where("current_generation", "=", expectedCurrentGeneration).where("source_fingerprint", "=", fingerprint).where("source_completeness", "=", source.sourceCompleteness ?? "complete").where("last_error_code", "is", null).where(this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)).executeTakeFirst() !== void 0;
	}
	async projectionMatchesExpectedSource(source, expectedSource) {
		const fingerprint = source.sourceFingerprint;
		if (!isMediaUsageProjectionFingerprint(fingerprint) || expectedSource.sourceFingerprint !== fingerprint || expectedSource.sourceCompleteness !== (source.sourceCompleteness ?? "complete") || expectedSource.lastErrorCode !== null) return false;
		return await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_key", "=", source.sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)).executeTakeFirst() !== void 0;
	}
	nullableStringExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	currentCollectionExists(collectionId, collectionSlug) {
		if (collectionId === null) return sql`1 = 1`;
		return sql`EXISTS (
			SELECT 1
			FROM _emdash_collections
			WHERE id = ${collectionId}
				AND slug = ${collectionSlug}
		)`;
	}
	currentCanonicalContentExists(row) {
		if (row.collection_id === null || row.identity_version !== 1 || row.source_type !== "content") return sql`1 = 1`;
		if (!row.collection_slug || !row.content_id || row.source_version === null || row.source_updated_at === null) return sql`1 = 0`;
		validateIdentifier(row.collection_slug, "collection slug");
		const tableName = `ec_${row.collection_slug}`;
		validateIdentifier(tableName, "content table");
		const revisionColumn = row.source_variant === "columns" ? "live_revision_id" : row.source_variant === "draft_overlay" ? "draft_revision_id" : null;
		if (!revisionColumn) return sql`1 = 0`;
		const revision = sql.ref(`content.${revisionColumn}`);
		const revisionMatches = row.revision_id === null ? sql`${revision} IS NULL` : sql`${revision} = ${row.revision_id}`;
		return sql`EXISTS (
			SELECT 1
			FROM ${sql.ref(tableName)} AS content
			WHERE content.id = ${row.content_id}
				AND content.version = ${row.source_version}
				AND content.updated_at = ${row.source_updated_at}
				AND ${revisionMatches}
		)`;
	}
	nullableNumberExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	async contentRowExists(tableName, contentId) {
		return (await sql`
			SELECT id
			FROM ${sql.ref(tableName)}
			WHERE id = ${contentId}
			LIMIT 1
		`.execute(this.db)).rows.length > 0;
	}
	buildSourceRow(source, generation, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_id: source.collectionId ?? null,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: generation,
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			identity_version: source.identityVersion ?? null,
			source_completeness: source.sourceCompleteness ?? "complete",
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: null,
			indexed_at: now,
			updated_at: now
		};
	}
	buildAttemptedSourceRow(source, generation, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_id: source.collectionId ?? null,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: generation,
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			identity_version: source.identityVersion ?? null,
			source_completeness: source.sourceCompleteness ?? (source.lastErrorCode ? "failed" : "unknown"),
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: source.lastErrorCode ?? null,
			indexed_at: now,
			updated_at: now
		};
	}
	attemptedSourceUpdateSet(source, row) {
		const updates = {
			source_type: row.source_type,
			source_variant: row.source_variant,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		};
		if (source.collectionSlug !== void 0) updates.collection_slug = row.collection_slug;
		if (source.collectionId !== void 0) updates.collection_id = row.collection_id;
		if (source.contentId !== void 0) updates.content_id = row.content_id;
		if (source.locale !== void 0) updates.locale = row.locale;
		if (source.translationGroup !== void 0) updates.translation_group = row.translation_group;
		if (source.contentSlug !== void 0) updates.content_slug = row.content_slug;
		if (source.contentTitle !== void 0) updates.content_title = row.content_title;
		if (source.contentStatus !== void 0) updates.content_status = row.content_status;
		if (source.contentScheduledAt !== void 0) updates.content_scheduled_at = row.content_scheduled_at;
		if (source.contentDeletedAt !== void 0) updates.content_deleted_at = row.content_deleted_at;
		if (source.revisionId !== void 0) updates.revision_id = row.revision_id;
		if (source.schemaVersion !== void 0) updates.schema_version = row.schema_version;
		if (source.sourceUpdatedAt !== void 0) updates.source_updated_at = row.source_updated_at;
		if (source.sourceVersion !== void 0) updates.source_version = row.source_version;
		if (source.sourceFingerprint !== void 0) updates.source_fingerprint = row.source_fingerprint;
		if (source.identityVersion !== void 0) updates.identity_version = row.identity_version;
		return updates;
	}
	sourceUpdateSet(row) {
		return {
			source_type: row.source_type,
			collection_id: row.collection_id,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			identity_version: row.identity_version,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			updated_at: row.updated_at
		};
	}
};
var currentUsageSelect = [
	"s.source_key as source_key",
	"s.source_type as source_type",
	"s.collection_id as collection_id",
	"s.collection_slug as collection_slug",
	"s.content_id as content_id",
	"s.source_variant as source_variant",
	"s.locale as locale",
	"s.translation_group as translation_group",
	"s.content_slug as content_slug",
	"s.content_title as content_title",
	"s.content_status as content_status",
	"s.content_scheduled_at as content_scheduled_at",
	"s.content_deleted_at as content_deleted_at",
	"s.revision_id as revision_id",
	"s.current_generation as current_generation",
	"s.schema_version as schema_version",
	"s.source_updated_at as source_updated_at",
	"s.source_version as source_version",
	"s.source_fingerprint as source_fingerprint",
	"s.identity_version as identity_version",
	"s.source_completeness as source_completeness",
	"s.last_attempted_at as last_attempted_at",
	"s.last_error_code as last_error_code",
	"s.indexed_at as indexed_at",
	"s.created_at as source_created_at",
	"s.updated_at as source_row_updated_at",
	"u.id as occurrence_id",
	"u.generation as generation",
	"u.field_slug as field_slug",
	"u.field_path as field_path",
	"u.occurrence_index as occurrence_index",
	"u.reference_type as reference_type",
	"u.media_id as media_id",
	"u.provider as provider",
	"u.provider_asset_id as provider_asset_id",
	"u.media_kind as media_kind",
	"u.mime_type as mime_type",
	"u.created_at as occurrence_created_at"
];
function groupUsageRows(rows) {
	const groups = [];
	for (const row of rows) {
		if (row.collection_slug === null || row.content_id === null) continue;
		const record = rowToUsageRecord(row);
		let group = groups.at(-1);
		if (!group || group.collectionSlug !== row.collection_slug || group.contentId !== row.content_id) {
			group = {
				collectionSlug: row.collection_slug,
				contentId: row.content_id,
				contentDeletedAt: row.entry_deleted_at,
				sources: []
			};
			groups.push(group);
		}
		let source = group.sources.at(-1);
		if (!source || source.source.sourceKey !== record.source.sourceKey) {
			source = {
				source: record.source,
				occurrences: []
			};
			group.sources.push(source);
		}
		source.occurrences.push(record.occurrence);
	}
	return groups;
}
function rowToSource(row) {
	return {
		sourceKey: row.source_key,
		sourceType: row.source_type,
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		contentId: row.content_id,
		sourceVariant: row.source_variant,
		locale: row.locale,
		translationGroup: row.translation_group,
		contentSlug: row.content_slug,
		contentTitle: row.content_title,
		contentStatus: row.content_status,
		contentScheduledAt: row.content_scheduled_at,
		contentDeletedAt: row.content_deleted_at,
		revisionId: row.revision_id,
		currentGeneration: row.current_generation,
		schemaVersion: Number(row.schema_version),
		sourceUpdatedAt: row.source_updated_at,
		sourceVersion: row.source_version === null ? null : Number(row.source_version),
		sourceFingerprint: row.source_fingerprint,
		identityVersion: row.identity_version === null ? null : Number(row.identity_version),
		sourceCompleteness: row.source_completeness,
		lastAttemptedAt: row.last_attempted_at,
		lastErrorCode: row.last_error_code,
		indexedAt: row.indexed_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOccurrence(row) {
	return {
		id: row.id,
		sourceKey: row.source_key,
		generation: row.generation,
		fieldSlug: row.field_slug,
		fieldPath: row.field_path,
		occurrenceIndex: Number(row.occurrence_index),
		referenceType: row.reference_type,
		mediaId: row.media_id,
		provider: row.provider,
		providerAssetId: row.provider_asset_id,
		mediaKind: row.media_kind,
		mimeType: row.mime_type,
		createdAt: row.created_at
	};
}
function rowToUsageRecord(row) {
	return {
		source: rowToSource({
			source_key: row.source_key,
			source_type: row.source_type,
			collection_id: row.collection_id,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			identity_version: row.identity_version,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			created_at: row.source_created_at,
			updated_at: row.source_row_updated_at
		}),
		occurrence: rowToOccurrence({
			id: row.occurrence_id,
			source_key: row.source_key,
			generation: row.generation,
			field_slug: row.field_slug,
			field_path: row.field_path,
			occurrence_index: row.occurrence_index,
			reference_type: row.reference_type,
			media_id: row.media_id,
			provider: row.provider,
			provider_asset_id: row.provider_asset_id,
			media_kind: row.media_kind,
			mime_type: row.mime_type,
			created_at: row.occurrence_created_at,
			cleanup_lease_token: null
		})
	};
}
function rowToIndexStatus(row) {
	return {
		adapterId: row.adapter_id,
		scopeType: row.scope_type,
		scopeKey: row.scope_key,
		status: row.status,
		schemaVersion: Number(row.schema_version),
		startedAt: row.started_at,
		completedAt: row.completed_at,
		cursor: row.cursor,
		indexedSourceCount: Number(row.indexed_source_count),
		failedSourceCount: Number(row.failed_source_count),
		lastErrorCode: row.last_error_code,
		updatedAt: row.updated_at
	};
}
// node_modules/emdash/src/media/usage/schema-invalidation.ts
var CONTENT_MEDIA_USAGE_ADAPTER_ID = "content-media";
var CONTENT_MEDIA_USAGE_COLLECTION_SCOPE = "collection";
async function markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode) {
	validateIdentifier(collectionSlug, "collection slug");
	const repo = new MediaUsageRepository(db);
	const identity = {
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
		scopeKey: collectionSlug
	};
	const existing = await repo.findIndexStatus(identity);
	await repo.upsertIndexStatus({
		...identity,
		status: "stale",
		schemaVersion: existing?.schemaVersion ?? 2,
		startedAt: existing?.startedAt ?? null,
		completedAt: existing?.completedAt ?? null,
		cursor: existing?.cursor ?? null,
		indexedSourceCount: existing?.indexedSourceCount ?? 0,
		failedSourceCount: existing?.failedSourceCount ?? 0,
		lastErrorCode
	});
}
async function invalidateContentMediaUsageSchemaChange(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	if (!await tableExists(db, "_emdash_media_usage_activation")) return false;
	if ((await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state !== "active") return false;
	if (!await new MediaUsageRepository(db).invalidateIndexStatusForSchemaChange(collectionSlug)) throw new Error(`Cannot invalidate media usage coverage for collection ${collectionSlug}`);
	return true;
}
async function markContentMediaUsageCollectionStaleSafely(db, collectionSlug, lastErrorCode) {
	try {
		await markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode);
		return true;
	} catch (error) {
		console.error(`[media-usage] Failed to mark ${collectionSlug} stale:`, error);
		return false;
	}
}
// node_modules/emdash/src/schema/block-types.ts
var BLOCK_FIELD_TYPES = [
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"repeater"
];
new Set(BLOCK_FIELD_TYPES);
new Set(REPEATER_SUB_FIELD_TYPES);
new Set(BLOCK_FIELD_TYPES);
new Set(REPEATER_SUB_FIELD_TYPES);
new Set(RESERVED_FIELD_SLUGS);
// node_modules/emdash/src/media/usage/content-refresh.ts
var CONTENT_USAGE_COLLECTION_LOCKS_KEY = Symbol.for("emdash.mediaUsage.collectionLocks");
Object.freeze({
	maxOccurrenceMutationUnitsPerClaim: 500,
	maxProjectionMutationBytesPerVariant: 2e6,
	maxProjectionMutationBytesPerClaim: 4e6,
	maxOccurrenceMutationUnitsPerBatch: 5e4,
	maxProjectionMutationBytesPerBatch: 16e6
});
var ZERO_RESULT = {
	success: true,
	refreshedSourceCount: 0,
	deletedSourceCount: 0,
	failedSourceCount: 0
};
async function deleteContentMediaUsageCollection(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	return withContentUsageCollectionLock(collectionSlug, () => deleteContentMediaUsageCollectionUnlocked(db, collectionSlug));
}
async function deleteContentMediaUsageCollectionUnlocked(db, collectionSlug) {
	try {
		const repo = new MediaUsageRepository(db);
		const deletedSourceCount = await repo.deleteCollectionSources(collectionSlug);
		await repo.deleteIndexStatus({
			adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
			scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
			scopeKey: collectionSlug
		});
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	} catch (error) {
		console.error(`[media-usage] Failed to delete usage for collection ${collectionSlug}:`, error);
		try {
			await new MediaUsageRepository(db).deleteIndexStatus({
				adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
				scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
				scopeKey: collectionSlug
			});
		} catch (statusError) {
			console.error(`[media-usage] Failed to clear usage status for deleted collection ${collectionSlug}:`, statusError);
		}
		return {
			success: false,
			refreshedSourceCount: 0,
			deletedSourceCount: 0,
			failedSourceCount: 0,
			errorCode: "CONTENT_USAGE_DELETE_ERROR"
		};
	}
}
async function withContentUsageCollectionLock(collectionSlug, fn) {
	const locks = getContentUsageCollectionLocks();
	const previous = locks.get(collectionSlug) ?? Promise.resolve();
	let releaseCurrent;
	const current = new Promise((resolve) => {
		releaseCurrent = resolve;
	});
	const next = previous.catch(() => {}).then(() => current);
	locks.set(collectionSlug, next);
	try {
		await previous.catch(() => {});
		return await fn();
	} finally {
		releaseCurrent();
		if (locks.get(collectionSlug) === next) locks.delete(collectionSlug);
	}
}
function getContentUsageCollectionLocks() {
	const global = globalThis;
	const existing = global[CONTENT_USAGE_COLLECTION_LOCKS_KEY];
	if (existing instanceof Map) return existing;
	const locks = /* @__PURE__ */ new Map();
	global[CONTENT_USAGE_COLLECTION_LOCKS_KEY] = locks;
	return locks;
}
// node_modules/emdash/src/media/usage/collection-deletion-processor.ts
var MEDIA_USAGE_COLLECTION_DELETION_LIMITS = Object.freeze({
	candidatesPerTick: 4,
	rowsPerBatch: 50,
	leaseDurationSeconds: 300,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900
});
/**
* Advance the given collection's deletion by one step. Returns `idle` when the
* deletion can't be claimed now: another request holds its lease, it is
* waiting out a retry, or it failed.
*/
async function processMediaUsageCollectionDeletion(db, deletion) {
	const repository = new MediaUsageCollectionDeletionRepository(db);
	const claim = await repository.claim({
		collectionId: deletion.collectionId,
		phase: deletion.phase,
		leaseDurationSeconds: MEDIA_USAGE_COLLECTION_DELETION_LIMITS.leaseDurationSeconds
	});
	if (!claim) return "idle";
	return runClaimedDeletion(db, repository, claim);
}
async function runClaimedDeletion(db, repository, claim) {
	try {
		const processed = await processClaimedDeletion(db, claim);
		if (!processed.finalized && !processed.released && !await repository.release(claim)) return "claim_lost";
		return processed.finalized ? "finalized" : "progress";
	} catch (error) {
		const terminal = claim.attemptCount + 1 >= MEDIA_USAGE_COLLECTION_DELETION_LIMITS.maxAttempts;
		if (!await repository.recordFailure({
			collectionId: claim.collectionId,
			leaseToken: claim.leaseToken,
			errorCode: "MEDIA_USAGE_COLLECTION_DELETION_FAILED",
			terminal,
			retryDelaySeconds: retryDelaySeconds(claim.attemptCount)
		})) return "claim_lost";
		console.error("[media-usage:collection-deletion] Processing failed:", error);
		return terminal ? "failed" : "retry";
	}
}
async function processClaimedDeletion(db, claim) {
	if (claim.phase === "fence" || claim.phase === "registry" || claim.phase === "table") {
		await deleteActivatedMediaUsageCollection(db, {
			collectionId: claim.collectionId,
			collectionSlug: claim.collectionSlug,
			forceDelete: claim.forceDelete
		}, {
			frontPhaseLimit: 1,
			claimed: claim
		});
		return {
			finalized: false,
			released: true
		};
	}
	if (claim.phase === "work") await processWorkBatch(db, claim);
	if (claim.phase === "sources") await processSourceBatch(db, claim);
	if (claim.phase === "status") await processStatus(db, claim);
	if (claim.phase === "finalize") {
		await finalizeDeletion(db, claim);
		return {
			finalized: true,
			released: true
		};
	}
	return {
		finalized: false,
		released: false
	};
}
async function processWorkBatch(db, claim) {
	await withTransaction(db, async (trx) => {
		const rows = await trx.selectFrom("_emdash_media_usage_work").select("content_id").where("collection_id", "=", claim.collectionId).$if(claim.workCursor !== null, (query) => query.where("content_id", ">", claim.workCursor)).orderBy("content_id", "asc").limit(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch + 1).execute();
		const batch = rows.slice(0, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch);
		if (batch.length > 0) await trx.deleteFrom("_emdash_media_usage_work").where("collection_id", "=", claim.collectionId).where("content_id", "in", batch.map((row) => row.content_id)).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, {
			phase: rows.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch ? "work" : "sources",
			work_cursor: rows.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch ? batch.at(-1).content_id : null
		});
	});
	return false;
}
async function processSourceBatch(db, claim) {
	await withTransaction(db, async (trx) => {
		let sourceKey = claim.sourceKey;
		if (!sourceKey) {
			const source = await trx.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_id", "=", claim.collectionId).orderBy("source_key", "asc").limit(1).executeTakeFirst();
			if (!source) {
				await updateDeletion(trx, claim, {
					phase: "status",
					source_key: null,
					occurrence_cursor: null
				});
				return;
			}
			sourceKey = source.source_key;
			await updateDeletion(trx, claim, {
				source_key: sourceKey,
				occurrence_cursor: null
			});
		}
		const occurrences = await trx.selectFrom("_emdash_media_usage").select("id").where("source_key", "=", sourceKey).$if(claim.occurrenceCursor !== null, (query) => query.where("id", ">", claim.occurrenceCursor)).orderBy("id", "asc").limit(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch + 1).execute();
		const batch = occurrences.slice(0, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch);
		if (batch.length > 0) await trx.deleteFrom("_emdash_media_usage").where("source_key", "=", sourceKey).where("id", "in", batch.map((row) => row.id)).where(liveLeaseGuard(trx, claim)).execute();
		if (occurrences.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch) {
			await updateDeletion(trx, claim, {
				source_key: sourceKey,
				occurrence_cursor: batch.at(-1).id
			});
			return;
		}
		await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where("source_type", "=", "content").where("collection_id", "=", claim.collectionId).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, {
			source_key: null,
			occurrence_cursor: null
		});
	});
	return false;
}
async function processStatus(db, claim) {
	await withTransaction(db, async (trx) => {
		if (await exactCleanupRowsRemain(trx, claim, false)) throw new Error("Collection deletion cleanup is incomplete");
		await trx.deleteFrom("_emdash_media_usage_reconciliations").where("collection_id", "=", claim.collectionId).where("collection_slug", "=", claim.collectionSlug).where(liveLeaseGuard(trx, claim)).execute();
		await trx.deleteFrom("_emdash_media_usage_index_status").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", claim.collectionSlug).where("collection_id", "=", claim.collectionId).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, { phase: "finalize" });
	});
	return false;
}
async function finalizeDeletion(db, claim) {
	if (await tableExists(db, `ec_${claim.collectionSlug}`)) throw new Error("Collection table still exists during deletion finalization");
	if (await exactCleanupRowsRemain(db, claim)) throw new Error("Collection deletion is incomplete");
	if (await db.selectFrom("_emdash_collections").select("id").where("id", "=", claim.collectionId).where("slug", "=", claim.collectionSlug).executeTakeFirst()) throw new Error("Collection registry identity still exists");
	const result = await db.deleteFrom("_emdash_media_usage_collection_deletions").where("collection_id", "=", claim.collectionId).where("collection_slug", "=", claim.collectionSlug).where("state", "=", "leased").where("phase", "=", "finalize").where("lease_token", "=", claim.leaseToken).where(liveLeaseGuard(db, claim)).executeTakeFirst();
	if (Number(result.numDeletedRows ?? 0) !== 1) throw new Error("Collection deletion lost finalization");
	return true;
}
async function exactCleanupRowsRemain(db, claim, includeStatus = true) {
	const row = (await sql`
		SELECT
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_work
				WHERE collection_id = ${claim.collectionId}
			) AS work_present,
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_sources
				WHERE source_type = 'content' AND collection_id = ${claim.collectionId}
			) AS source_present,
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_index_status
				WHERE adapter_id = 'content-media'
					AND scope_type = 'collection'
					AND scope_key = ${claim.collectionSlug}
					AND collection_id = ${claim.collectionId}
			) AS status_present
	`.execute(db)).rows[0];
	return Boolean(row?.work_present) || Boolean(row?.source_present) || includeStatus && Boolean(row?.status_present);
}
async function updateDeletion(db, claim, values) {
	const result = await db.updateTable("_emdash_media_usage_collection_deletions").set({
		...values,
		attempt_count: 0,
		last_error_code: null,
		updated_at: collectionDeletionCurrentTimestamp(db)
	}).where("collection_id", "=", claim.collectionId).where("state", "=", "leased").where("lease_token", "=", claim.leaseToken).where(liveLeaseGuard(db, claim)).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) !== 1) throw new Error("Collection deletion lease was lost");
}
function liveLeaseGuard(db, claim) {
	return isPostgres(db) ? sql`EXISTS (
			SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
			WHERE deletion.collection_id = ${claim.collectionId}
				AND deletion.state = 'leased'
				AND deletion.lease_token = ${claim.leaseToken}
				AND deletion.lease_expires_at::timestamptz > clock_timestamp()
		)` : sql`EXISTS (
			SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
			WHERE deletion.collection_id = ${claim.collectionId}
				AND deletion.state = 'leased'
				AND deletion.lease_token = ${claim.leaseToken}
				AND deletion.lease_expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
		)`;
}
function retryDelaySeconds(attemptCount) {
	return Math.min(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.retryMaxSeconds, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.retryBaseSeconds * 2 ** attemptCount);
}
Object.freeze({
	candidatesPerTick: 4,
	scanPageSize: 1e3,
	sourcePageSize: 1e3,
	leaseDurationSeconds: 60,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900,
	retryJitterRatio: .25
});
Object.freeze({
	candidatesPerTick: 1e3,
	leaseDurationSeconds: 1200,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900,
	retryJitterRatio: .25
});
// node_modules/emdash/src/media/usage/maintenance-engine.ts
var MEDIA_USAGE_MAINTENANCE_LIMITS = Object.freeze({
	eventQueryCeiling: 900,
	maxStepQueries: 150
});
/**
* Finish the pending deletion of a collection slug within this request, so the
* slug can be registered again. A call stops after about one maintenance step's
* queries, so a create request never waits on a large cleanup.
*
* - `pending`: it can't finish now, because another request holds its lease,
*   it is waiting out a retry, or this call's query window ran out. Progress
*   is checkpointed, so a later call continues where this one stopped.
* - `failed`: it ran out of attempts and stays until an operator retries it
*   by the deleted collection's ID.
*/
async function finishMediaUsageCollectionDeletion(db, collectionSlug) {
	const repository = new MediaUsageCollectionDeletionRepository(db);
	const metrics = getRequestContext()?.metrics;
	const firstQuery = metrics?.dbCount ?? 0;
	for (;;) {
		const deletion = await repository.findBySlug(collectionSlug);
		if (!deletion) return { state: "finished" };
		if (deletion.state === "failed") return {
			state: "failed",
			collectionId: deletion.collectionId
		};
		if (metrics && (metrics.dbCount - firstQuery >= MEDIA_USAGE_MAINTENANCE_LIMITS.maxStepQueries || !canStartMediaUsageMaintenanceStep(metrics))) return { state: "pending" };
		const outcome = await processMediaUsageCollectionDeletion(db, deletion);
		if (outcome === "failed") return {
			state: "failed",
			collectionId: deletion.collectionId
		};
		if (outcome !== "progress" && outcome !== "finalized") return { state: "pending" };
	}
}
function canStartMediaUsageMaintenanceStep(metrics) {
	return metrics.dbCount + MEDIA_USAGE_MAINTENANCE_LIMITS.maxStepQueries <= MEDIA_USAGE_MAINTENANCE_LIMITS.eventQueryCeiling;
}
// node_modules/emdash/src/transfer/format/columns.ts
function f(property, codec = "text") {
	return {
		class: "field",
		property,
		codec
	};
}
function principal(property) {
	return {
		class: "principal",
		property,
		codec: "text"
	};
}
var EXCLUDED = { class: "excluded" };
var DERIVED = { class: "derived" };
var PORTABLE_TABLE_LIST = [
	{
		table: "_emdash_block_types",
		kind: "block_type",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			description: f("description"),
			icon: f("icon"),
			category: f("category"),
			current_version: f("currentVersion", "integer"),
			source: f("source"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_block_type_versions",
		kind: "block_type_version",
		columns: {
			id: f("id"),
			block_type_id: f("blockTypeId"),
			version: f("version", "integer"),
			fields: f("fields", "json"),
			fingerprint: DERIVED,
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_collections",
		kind: "collection",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			label_singular: f("labelSingular"),
			description: f("description"),
			icon: f("icon"),
			supports: f("supports", "json"),
			source: f("source"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			search_config: f("searchConfig", "json"),
			has_seo: f("hasSeo", "boolean"),
			url_pattern: f("urlPattern"),
			comments_enabled: f("commentsEnabled", "boolean"),
			comments_moderation: f("commentsModeration"),
			comments_closed_after_days: f("commentsClosedAfterDays", "integer"),
			comments_auto_approve_users: f("commentsAutoApproveUsers", "boolean"),
			hidden: f("hidden", "boolean"),
			sort_order: f("sortOrder", "integer"),
			admin_config: f("adminConfig", "json"),
			title_field: f("titleField"),
			date_field: f("dateField"),
			routable: f("routable", "boolean"),
			edit_locking: f("editLocking", "boolean"),
			nav_group: f("navGroup")
		}
	},
	{
		table: "_emdash_fields",
		kind: "field",
		columns: {
			id: f("id"),
			collection_id: f("collectionId"),
			slug: f("slug"),
			label: f("label"),
			type: f("type"),
			column_type: f("columnType"),
			required: f("required", "boolean"),
			unique: f("unique", "boolean"),
			default_value: f("defaultValue", "json"),
			validation: f("validation", "json"),
			widget: f("widget"),
			options: f("options", "json"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt"),
			searchable: f("searchable", "boolean"),
			translatable: f("translatable", "boolean"),
			indexed: f("indexed", "boolean")
		}
	},
	{
		table: "_emdash_taxonomy_defs",
		kind: "taxonomy_def",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			label_singular: f("labelSingular"),
			hierarchical: f("hierarchical", "boolean"),
			collections: f("collections", "json"),
			created_at: f("createdAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_relations",
		kind: "relation",
		columns: {
			id: f("id"),
			slug: f("slug"),
			parent_collection: f("parentCollection"),
			child_collection: f("childCollection"),
			parent_label: f("parentLabel"),
			child_label: f("childLabel"),
			parent_label_singular: f("parentLabelSingular"),
			child_label_singular: f("childLabelSingular"),
			max_children_per_parent: f("maxChildrenPerParent", "integer"),
			max_parents_per_child: f("maxParentsPerChild", "integer"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_byline_fields",
		kind: "byline_field",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			type: f("type"),
			required: f("required", "boolean"),
			translatable: f("translatable", "boolean"),
			validation: f("validation", "json"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "media_folders",
		kind: "media_folder",
		columns: {
			id: f("id"),
			name: f("name"),
			name_key: f("nameKey")
		}
	},
	{
		table: "media",
		kind: "media",
		columns: {
			id: f("id"),
			filename: f("filename"),
			mime_type: f("mimeType"),
			size: f("size", "integer"),
			width: f("width", "integer"),
			height: f("height", "integer"),
			focal_x: f("focalX", "real"),
			focal_y: f("focalY", "real"),
			alt: f("alt"),
			caption: f("caption"),
			storage_key: { class: "targetLocal" },
			content_hash: DERIVED,
			status: DERIVED,
			blurhash: f("blurhash"),
			dominant_color: f("dominantColor"),
			created_at: f("createdAt"),
			author_id: principal("authorPrincipal"),
			folder_id: f("folderId")
		}
	},
	{
		table: "taxonomies",
		kind: "term",
		columns: {
			id: f("id"),
			name: f("name"),
			slug: f("slug"),
			label: f("label"),
			parent_id: f("parentId"),
			data: f("data", "json"),
			locale: f("locale"),
			translation_group: f("translationGroup"),
			sort_order: f("sortOrder", "integer")
		}
	},
	{
		table: "_emdash_bylines",
		kind: "byline",
		columns: {
			id: f("id"),
			slug: f("slug"),
			display_name: f("displayName"),
			bio: f("bio"),
			avatar_media_id: f("avatarMediaId"),
			website_url: f("websiteUrl"),
			user_id: principal("userPrincipal"),
			is_guest: f("isGuest", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_byline_field_values",
		kind: "byline_field_value",
		columns: {
			byline_id: f("bylineId"),
			field_id: f("fieldId"),
			value: f("value", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_byline_field_group_values",
		kind: "byline_field_group_value",
		columns: {
			translation_group: f("bylineGroup"),
			field_id: f("fieldId"),
			value: f("value", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "revisions",
		kind: "revision",
		columns: {
			id: f("id"),
			collection: f("collection"),
			entry_id: f("entryId"),
			data: f("data", "json"),
			author_id: principal("authorPrincipal"),
			created_at: f("createdAt")
		}
	},
	{
		table: "content_taxonomies",
		kind: "content_term",
		columns: {
			collection: f("collection"),
			entry_id: f("entryGroup"),
			taxonomy_id: f("termGroup"),
			status: EXCLUDED,
			scheduled_at: EXCLUDED,
			deleted_at: EXCLUDED,
			locale: EXCLUDED,
			published_at: EXCLUDED,
			created_at: EXCLUDED
		}
	},
	{
		table: "_emdash_content_bylines",
		kind: "content_byline",
		columns: {
			id: f("id"),
			collection_slug: f("collection"),
			content_id: f("entryId"),
			byline_id: f("bylineGroup"),
			sort_order: f("sortOrder", "integer"),
			role_label: f("roleLabel"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_content_references",
		kind: "content_reference",
		columns: {
			id: f("id"),
			relation_id: f("relationId"),
			parent_group: f("parentGroup"),
			child_group: f("childGroup"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_seo",
		kind: "seo",
		columns: {
			collection: f("collection"),
			content_id: f("entryId"),
			seo_title: f("seoTitle"),
			seo_description: f("seoDescription"),
			seo_image: {
				class: "mediaRef",
				property: "seoImage",
				codec: "text"
			},
			seo_canonical: f("seoCanonical"),
			seo_no_index: f("seoNoIndex", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_menus",
		kind: "menu",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_menu_items",
		kind: "menu_item",
		columns: {
			id: f("id"),
			menu_id: f("menuId"),
			parent_id: f("parentId"),
			sort_order: f("sortOrder", "integer"),
			type: f("type"),
			reference_collection: f("referenceCollection"),
			reference_id: f("referenceGroup"),
			custom_url: f("customUrl"),
			label: f("label"),
			title_attr: f("titleAttr"),
			target: f("target"),
			css_classes: f("cssClasses"),
			created_at: f("createdAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_widget_areas",
		kind: "widget_area",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			description: f("description"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_widgets",
		kind: "widget",
		columns: {
			id: f("id"),
			area_id: f("areaId"),
			sort_order: f("sortOrder", "integer"),
			type: f("type"),
			title: f("title"),
			content: f("content", "json"),
			menu_name: f("menuName"),
			component_id: f("componentId"),
			component_props: f("componentProps", "json"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_sections",
		kind: "section",
		columns: {
			id: f("id"),
			slug: f("slug"),
			title: f("title"),
			description: f("description"),
			keywords: f("keywords", "json"),
			content: f("content", "json"),
			preview_media_id: f("previewMediaId"),
			source: f("source"),
			theme_id: f("themeId"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_redirects",
		kind: "redirect",
		columns: {
			id: f("id"),
			source: f("source"),
			destination: f("destination"),
			type: f("type", "integer"),
			is_pattern: f("isPattern", "boolean"),
			enabled: f("enabled", "boolean"),
			hits: EXCLUDED,
			last_hit_at: EXCLUDED,
			group_name: f("groupName"),
			auto: f("auto", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			config_revision: DERIVED,
			source_guard: DERIVED,
			write_generation: DERIVED
		}
	},
	{
		table: "_emdash_comments",
		kind: "comment",
		columns: {
			id: f("id"),
			collection: f("collection"),
			content_id: f("entryId"),
			parent_id: f("parentId"),
			author_name: f("authorName"),
			author_email: f("authorEmail"),
			author_user_id: principal("authorPrincipal"),
			body: f("body"),
			status: f("status"),
			ip_hash: EXCLUDED,
			user_agent: EXCLUDED,
			moderation_metadata: f("moderationMetadata", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_comment_reactions",
		kind: "comment_reaction",
		columns: {
			id: f("id"),
			comment_id: f("commentId"),
			reaction: f("reaction"),
			voter_hash: { class: "randomized" },
			created_at: f("createdAt")
		}
	},
	{
		table: "options",
		kind: "setting",
		columns: {
			name: f("id"),
			value: f("value", "json"),
			revision: DERIVED
		}
	}
];
var PORTABLE_TABLES = Object.freeze(PORTABLE_TABLE_LIST);
Object.freeze({
	id: f("id"),
	slug: f("slug"),
	status: f("status"),
	author_id: principal("authorPrincipal"),
	primary_byline_id: f("primaryBylineGroup"),
	created_at: f("createdAt"),
	updated_at: f("updatedAt"),
	published_at: f("publishedAt"),
	scheduled_at: f("scheduledAt"),
	deleted_at: f("deletedAt"),
	version: f("version", "integer"),
	live_revision_id: f("liveRevisionId"),
	draft_revision_id: f("draftRevisionId"),
	locale: f("locale"),
	translation_group: f("translationGroup")
});
Object.freeze({
	users: "auth",
	credentials: "auth",
	auth_tokens: "auth",
	oauth_accounts: "auth",
	allowed_domains: "auth",
	auth_challenges: "auth",
	_emdash_api_tokens: "auth",
	_emdash_oauth_tokens: "auth",
	_emdash_oauth_clients: "auth",
	_emdash_authorization_codes: "auth",
	_emdash_device_codes: "auth",
	_emdash_rate_limits: "runtime",
	_emdash_entry_locks: "runtime",
	_emdash_cron_tasks: "runtime",
	_emdash_redirect_write_lock: "runtime",
	_emdash_redirect_state: "derived",
	_emdash_redirect_artifacts: "derived",
	_emdash_redirect_generation_artifacts: "derived",
	_emdash_404_log: "runtime",
	_emdash_revision_prune_queue: "runtime",
	_emdash_media_upload_attempts: "runtime",
	_emdash_media_usage: "derived",
	_emdash_media_usage_sources: "derived",
	_emdash_media_usage_cleanup: "runtime",
	_emdash_media_usage_cleanup_fence: "runtime",
	_emdash_media_usage_generation_writes: "runtime",
	_emdash_media_usage_index_status: "derived",
	_emdash_media_usage_activation: "runtime",
	_emdash_media_usage_work: "runtime",
	_emdash_media_usage_collection_deletions: "runtime",
	_emdash_media_usage_reconciliations: "runtime",
	_emdash_taxonomy_def_groups: "derived",
	audit_logs: "audit",
	_emdash_migrations: "migrations",
	_emdash_migrations_lock: "migrations",
	_plugin_storage: "plugin",
	_plugin_state: "plugin",
	_plugin_indexes: "plugin"
});
Object.freeze([
	"_emdash_fts_",
	"_emdash_transfer_",
	"_plugin_",
	"sqlite_"
]);
var PORTABLE_BY_TABLE = new Map(PORTABLE_TABLES.map((spec) => [spec.table, spec]));
new Map(PORTABLE_TABLES.map((spec) => [spec.kind, spec]));
function getPortableTableSpec(table) {
	return PORTABLE_BY_TABLE.get(table);
}
// node_modules/emdash/src/transfer/format/limits.ts
/**
* Hard limits for site packages and transfer operations.
*
* Package limits are part of the format contract: an exporter must never
* produce a package that exceeds them and a reader must reject one that does
* before doing expensive work. Operation limits bound one `advance` step so it
* fits a Workers request on D1.
*/
var MiB = 1048576;
var TRANSFER_LIMITS = Object.freeze({
	/** Maximum `manifest.json` size in bytes. */
	manifestBytes: 8 * MiB,
	/**
	* Maximum bytes in one NDJSON line, excluding the newline. Kept under D1's
	* 2 MB row/statement ceiling so every record can be written in one row.
	*/
	recordLineBytes: 19e5,
	/** Maximum bytes in one record or index chunk file. */
	chunkBytes: 4 * MiB,
	/** Maximum records (or index entries) in one chunk file. */
	chunkRecords: 1e3,
	/** Maximum records across every kind. */
	totalRecords: 5e6,
	/** Maximum container nesting of any JSON value (root = 1). */
	jsonDepth: 64,
	/** Maximum files (record chunks + media blobs) listed by the index. */
	totalFiles: 1e6,
	/** Maximum index chunk files listed by the manifest. */
	indexChunks: 1e3,
	/** Default per-blob ceiling; the target's `maxUploadSize` overrides it. */
	defaultMaxBlobBytes: 50 * MiB,
	/** Maximum length of a portable id (including synthetic composite ids). */
	idLength: 1024,
	/** Maximum length of short strings: slugs, names, labels, locales, mime types. */
	shortString: 4096,
	/** Operation step: stop starting work once this many queries ran in the request. */
	stepQueryCeiling: 900,
	/** Operation step: queries a unit of work may use; checked before starting it. */
	stepQueries: 150,
	/**
	* Operation step: queries kept back from the ceiling for the writes that
	* end a step once no more units start (a checkpoint and the lease
	* release, or the read and write that record a failed step).
	*/
	stepClosingQueries: 2,
	/** Operation step: media bytes copied per step (a larger single blob gets its own step). */
	stepBytes: 32 * MiB,
	/** D1 bound parameters per statement. */
	d1BindParameters: 100,
	/** Operation lease duration. */
	leaseSeconds: 300,
	/** Uploading / analyzing / planned imports expire after this long. */
	pendingImportTtlSeconds: 86400,
	/** Completed exports expire (and their staging is collected) after this long. */
	exportTtlSeconds: 604800,
	/**
	* MCP approval grant lifetime: a pending grant expires this long after it
	* is requested, and an approved one this long after it is approved.
	*/
	approvalTtlSeconds: 900,
	/** Export attempts before failing with TRANSFER_EXPORT_CONCURRENT_WRITES. */
	exportFenceAttempts: 3,
	/** Maximum mismatches kept in a verification failure detail. */
	verificationMismatches: 50,
	/** Maximum warnings or blockers kept in a plan (the rest are summarized by count). */
	planIssues: 500
});
/**
* Rows per multi-row INSERT so a statement stays within D1's bound-parameter
* limit. Returns 0 when a single row needs more parameters than the limit;
* callers then insert core columns first and set the rest with batched
* UPDATEs.
*/
function rowsPerInsert(columnCount) {
	if (!Number.isInteger(columnCount) || columnCount < 1) throw new RangeError(`Invalid column count ${columnCount}`);
	return Math.floor(TRANSFER_LIMITS.d1BindParameters / columnCount);
}
// node_modules/emdash/src/transfer/format/canonical.ts
/**
* Canonical JSON serialization for site packages.
*
* Rules (normative for formatVersion "1"):
* - object keys are sorted by UTF-16 code unit order ({@link compareUtf16});
* - no insignificant whitespace;
* - strings and numbers are encoded exactly as `JSON.stringify` encodes them;
* - object properties whose value is `undefined` are omitted;
* - `undefined` inside an array, non-finite numbers, and any value that is not
*   a plain object, array, string, finite number, boolean, or `null` are
*   rejected;
* - nesting depth is at most {@link TRANSFER_LIMITS.jsonDepth} containers
*   (the root object or array is depth 1).
*
* The manifest, every NDJSON line, the plan, the receipt, and logical digests
* all use this one implementation.
*/
var CanonicalJsonError = class extends Error {
	path;
	constructor(message, path) {
		super(`${message} at ${path}`);
		this.name = "CanonicalJsonError";
		this.path = path;
	}
};
function compareUtf16(a, b) {
	if (a === b) return 0;
	return a < b ? -1 : 1;
}
function canonicalJson(value, options = {}) {
	const maxDepth = options.maxDepth ?? TRANSFER_LIMITS.jsonDepth;
	const parts = [];
	write(value, parts, 0, maxDepth, "$");
	return parts.join("");
}
function write(value, out, depth, maxDepth, path) {
	if (value === null) {
		out.push("null");
		return;
	}
	switch (typeof value) {
		case "string":
			out.push(JSON.stringify(value));
			return;
		case "number":
			if (!Number.isFinite(value)) throw new CanonicalJsonError("Non-finite number", path);
			out.push(JSON.stringify(value));
			return;
		case "boolean":
			out.push(value ? "true" : "false");
			return;
		case "object": break;
		default: throw new CanonicalJsonError(`Unsupported ${typeof value} value`, path);
	}
	if (depth + 1 > maxDepth) throw new CanonicalJsonError(`Nesting deeper than ${maxDepth}`, path);
	if (Array.isArray(value)) {
		out.push("[");
		for (let index = 0; index < value.length; index++) {
			if (index > 0) out.push(",");
			const item = value[index];
			if (item === void 0) throw new CanonicalJsonError("Undefined array item", `${path}[${index}]`);
			write(item, out, depth + 1, maxDepth, `${path}[${index}]`);
		}
		out.push("]");
		return;
	}
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) throw new CanonicalJsonError("Non-plain object", path);
	const present = Object.entries(value).filter(([, item]) => item !== void 0).toSorted(([a], [b]) => compareUtf16(a, b));
	out.push("{");
	present.forEach(([key, item], index) => {
		if (index > 0) out.push(",");
		out.push(JSON.stringify(key), ":");
		write(item, out, depth + 1, maxDepth, `${path}.${key}`);
	});
	out.push("}");
}
// node_modules/emdash/src/transfer/format/digest.ts
/**
* SHA-256 hashing and the digests that identify packages, plans, receipts,
* and verified target state.
*
* Digest rules (formatVersion "1"):
* - `packageDigest = "sha256:" + hex(sha256(utf8(canonicalJson(manifest))))`
* - `planDigest = "sha256:" + hex(sha256(utf8(canonicalJson(plan))))` over the
*   complete {@link SiteImportPlan} including its `decisions`, `packageDigest`
*   and `target.siteId`, so a plan cannot be replayed against another package
*   or target.
* - `receiptDigest` covers the receipt with its `receiptDigest` property
*   removed.
* - A record's hash is the hex SHA-256 of its canonical JSON (the NDJSON line
*   without its newline).
* - A chunk's logical hash is
*   `hex(sha256(utf8(canonicalJson([[id, recordSha256], …]))))` over the
*   records of one package record chunk, in chunk order, each record in its
*   predicted target form (after declared transformations).
* - `logicalDigest = "sha256:" + hex(sha256(utf8(canonicalJson(chunks))))`
*   where `chunks` is `[[kind, seq, chunkLogicalSha256], …]` for every record
*   chunk in package order (kinds in `RECORD_KINDS` order, then `seq`).
*   `principal` chunks are excluded because principals are never written to
*   a target. The two-level shape lets verification run in bounded steps and
*   persist one hash per chunk instead of an in-progress hash state.
*/
var SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;
function isSha256Hex(value) {
	return typeof value === "string" && SHA256_HEX_PATTERN.test(value);
}
function toSha256Digest(hex) {
	if (!isSha256Hex(hex)) throw new TypeError("Expected a lowercase hex SHA-256");
	return `sha256:${hex}`;
}
function isDigestStreamConstructor(value) {
	return typeof value === "function";
}
function isNodeCreateHash(value) {
	return typeof value === "function";
}
function getDigestStream() {
	const candidate = typeof globalThis.crypto === "object" ? Reflect.get(globalThis.crypto, "DigestStream") : void 0;
	return isDigestStreamConstructor(candidate) ? candidate : void 0;
}
function isNodeRuntime() {
	const processLike = Reflect.get(globalThis, "process");
	if (typeof processLike !== "object" || processLike === null) return false;
	const versions = Reflect.get(processLike, "versions");
	return typeof versions === "object" && versions !== null && typeof Reflect.get(versions, "node") === "string";
}
var nodeCreateHash;
function loadNodeCreateHash() {
	nodeCreateHash ??= (async () => {
		if (!isNodeRuntime()) return null;
		try {
			const nodeCrypto = await import("node:crypto");
			return isNodeCreateHash(nodeCrypto.createHash) ? nodeCrypto.createHash : null;
		} catch {
			return null;
		}
	})();
	return nodeCreateHash;
}
async function preferredBackend() {
	if (getDigestStream()) return "digest-stream";
	if (await loadNodeCreateHash()) return "node";
	return "oslo";
}
var DigestStreamHasher = class {
	backend = "digest-stream";
	#stream;
	#writer;
	#failure;
	constructor(DigestStream) {
		this.#stream = new DigestStream("SHA-256");
		this.#writer = this.#stream.getWriter();
	}
	update(chunk) {
		this.#writer.write(chunk.slice()).catch((error) => {
			this.#failure ??= error;
		});
	}
	async digest() {
		await this.#writer.close();
		if (this.#failure !== void 0) throw this.#failure;
		return encodeHexLowerCase(new Uint8Array(await this.#stream.digest));
	}
};
var NodeHasher = class {
	backend = "node";
	#hash;
	constructor(createHash) {
		this.#hash = createHash("sha256");
	}
	update(chunk) {
		this.#hash.update(chunk);
	}
	async digest() {
		return this.#hash.digest("hex");
	}
};
var OsloHasher = class {
	backend = "oslo";
	#hash = new SHA256();
	update(chunk) {
		this.#hash.update(chunk);
	}
	async digest() {
		return encodeHexLowerCase(this.#hash.digest());
	}
};
async function createSha256(options = {}) {
	switch (options.backend ?? await preferredBackend()) {
		case "digest-stream": {
			const DigestStream = getDigestStream();
			if (!DigestStream) throw new Error("crypto.DigestStream is not available");
			return new DigestStreamHasher(DigestStream);
		}
		case "node": {
			const createHash = await loadNodeCreateHash();
			if (!createHash) throw new Error("node:crypto is not available");
			return new NodeHasher(createHash);
		}
		case "oslo": return new OsloHasher();
	}
}
var encoder = new TextEncoder();
async function sha256Hex(data) {
	const bytes = typeof data === "string" ? encoder.encode(data) : data;
	const hasher = await createSha256();
	hasher.update(bytes);
	return hasher.digest();
}
/** `"sha256:" + hex(sha256(utf8(canonicalJson(value))))`. */
async function canonicalDigest(value) {
	return toSha256Digest(await sha256Hex(canonicalJson(value)));
}
// node_modules/emdash/src/transfer/format/column-codec.ts
var SAFE_INTEGER_TEXT = /^-?\d+$/;
function dialectOf(source) {
	return typeof source === "string" ? source : detectDialect(source);
}
function tryParseJson(text) {
	try {
		return {
			ok: true,
			value: JSON.parse(text)
		};
	} catch {
		return { ok: false };
	}
}
function invalid(codec, reason) {
	return new TransferError("TRANSFER_RECORD_INVALID", "Value cannot be stored in its column", { detail: {
		codec,
		reason
	} });
}
/** Decode one raw column value. Returns `undefined` for SQL `NULL`. */
function decodeColumn(source, codec, raw) {
	if (raw === null || raw === void 0) return void 0;
	const dialect = dialectOf(source);
	switch (codec) {
		case "text": return raw;
		case "boolean":
			if (typeof raw === "number") return raw !== 0;
			if (typeof raw === "bigint") return raw !== 0n;
			if (typeof raw === "string" && SAFE_INTEGER_TEXT.test(raw)) return Number(raw) !== 0;
			if (typeof raw === "boolean") return raw;
			return raw;
		case "integer":
			if (typeof raw === "bigint") return Number.isSafeInteger(Number(raw)) ? Number(raw) : String(raw);
			if (typeof raw === "string" && SAFE_INTEGER_TEXT.test(raw)) {
				const value = Number(raw);
				return Number.isSafeInteger(value) ? value : raw;
			}
			return raw;
		case "real":
			if (typeof raw === "string" && dialect === "postgres") return Number(raw);
			return raw;
		case "json":
			if (typeof raw !== "string") return raw;
			return decodeJsonText(raw);
		case "nativeJson":
			if (dialect === "postgres") return raw;
			if (typeof raw !== "string") return raw;
			return decodeJsonText(raw);
	}
}
function decodeJsonText(text) {
	const parsed = tryParseJson(text);
	if (!parsed.ok) return text;
	return parsed.value === null ? void 0 : parsed.value;
}
/**
* Encode one record value for a column. Returns `null` for an absent value,
* or JSON `null` when `notNull` is set for a JSON column.
*/
function encodeColumn(source, codec, value, options = {}) {
	if (value === void 0 || value === null) return options.notNull && (codec === "json" || codec === "nativeJson") ? "null" : null;
	const dialect = dialectOf(source);
	switch (codec) {
		case "text":
			if (typeof value !== "string") throw invalid(codec, "expected a string");
			return value;
		case "boolean":
			if (typeof value !== "boolean") throw invalid(codec, "expected a boolean");
			return value ? 1 : 0;
		case "integer":
			if (typeof value === "number") {
				if (!Number.isSafeInteger(value)) throw invalid(codec, "expected an integer");
				return value;
			}
			if (typeof value === "string" && dialect === "sqlite") return value;
			throw invalid(codec, "expected an integer");
		case "real":
			if (typeof value === "number") {
				if (!Number.isFinite(value)) throw invalid(codec, "expected a finite number");
				return value;
			}
			if (typeof value === "string" && dialect === "sqlite") return value;
			throw invalid(codec, "expected a number");
		case "json": return encodeJsonText(value);
		case "nativeJson":
			if (dialect === "postgres") return JSON.stringify(value);
			if (typeof value === "number") return value;
			return encodeJsonText(value);
	}
}
function encodeJsonText(value) {
	const text = JSON.stringify(value);
	if (text === void 0) throw invalid("json", "value is not JSON");
	return text;
}
// node_modules/emdash/src/transfer/import/rows.ts
/** Codecs of the columns a record carries (`field`, `principal`, `mediaRef`). */
function recordCodecs(columns) {
	const codecs = {};
	for (const [column, spec] of Object.entries(columns)) if ("property" in spec) codecs[column] = spec.codec;
	return codecs;
}
/**
* The row for `record` over every column the record carries. `record` must
* already be in target form: placeholders resolved and principals mapped.
*/
function encodeRecord(db, columns, record, location) {
	const row = {};
	for (const [column, spec] of Object.entries(columns)) {
		if (!("property" in spec)) continue;
		row[column] = encodeValue(db, spec.codec, Object.hasOwn(record, spec.property) ? record[spec.property] : void 0, {
			...location,
			column
		});
	}
	return row;
}
/** `encodeColumn`, with the record and column named in a failure. */
function encodeValue(db, codec, value, location, options = {}) {
	try {
		return encodeColumn(db, codec, value, options);
	} catch (error) {
		if (!isTransferError(error)) throw error;
		throw new TransferError(error.code, "Record value does not fit its target column", {
			detail: {
				...location,
				...error.detail
			},
			cause: error
		});
	}
}
function comparable(db, codec, raw, options) {
	const value = decodeColumn(db, codec, options.encoded && codec === "nativeJson" && isPostgres(db) && typeof raw === "string" ? JSON.parse(raw) : raw);
	if (value === void 0) return void 0;
	if (options.float4 && codec === "real" && typeof value === "number") return canonicalJson(Math.fround(value));
	return canonicalJson(value);
}
/**
* The first column (in `codecs` order) where the stored row differs from the
* row the importer encoded, or null when they are equal over those columns.
* Postgres returns `json` columns parsed, so an encoded `nativeJson` value is
* parsed before it is compared.
*/
function firstDifference(db, codecs, encoded, stored, options) {
	for (const [column, codec] of Object.entries(codecs)) if (comparable(db, codec, encoded[column], {
		...options,
		encoded: true
	}) !== comparable(db, codec, stored[column], {
		...options,
		encoded: false
	})) return column;
	return null;
}
// node_modules/emdash/src/transfer/import/sql.ts
/**
* Parameter-bounded multi-row statements over tables named at runtime.
*
* Table and column names come from the column registry or from validated
* collection and field slugs; every value is a bound parameter. Each
* statement binds at most `TRANSFER_LIMITS.d1BindParameters` values.
*/
var TABLE_NAME = /^_?[a-z][a-z0-9_]*$/;
function tableRef(table) {
	if (!TABLE_NAME.test(table)) throw new Error(`Invalid table name ${table}`);
	return sql.ref(table);
}
function columnRef(column) {
	validateIdentifier(column, "column");
	return sql.ref(column);
}
/**
* Insert `rows` (all with exactly `columns`) in statements of at most
* `rowsPerInsert(columns.length)` rows. Returns the number of rows the
* statements inserted or updated.
*/
async function insertRows(db, table, columns, rows, conflict = { type: "nothing" }) {
	const perStatement = rowsPerInsert(columns.length);
	if (perStatement === 0) throw new Error(`Too many columns for one insert into ${table}`);
	const columnList = sql.join(columns.map(columnRef));
	const onConflict = conflict.type === "nothing" ? sql`ON CONFLICT DO NOTHING` : sql`ON CONFLICT (${sql.join(conflict.target.map(columnRef))}) DO UPDATE SET ${sql.join(conflict.update.map((column) => sql`${columnRef(column)} = excluded.${columnRef(column)}`))}`;
	let written = 0;
	for (const batch of chunks([...rows], perStatement)) {
		const values = sql.join(batch.map((row) => sql`(${sql.join(columns.map((column) => row[column] ?? null))})`));
		const result = await sql`INSERT INTO ${tableRef(table)} (${columnList}) VALUES ${values} ${onConflict}`.execute(db);
		written += Number(result.numAffectedRows ?? 0n);
	}
	return written;
}
// node_modules/emdash/src/schema/slug.ts
/**
* The collection and field slug rule.
*/
/** Lowercase letter first, then lowercase letters, digits, and underscores. */
var SCHEMA_SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
// node_modules/emdash/src/schema/registry.ts
var EC_PREFIX_PATTERN = /^ec_/;
var SINGLE_QUOTE_PATTERN = /'/g;
var UNDERSCORE_PATTERN = /_/g;
var WORD_BOUNDARY_PATTERN = /\b\w/g;
var FIELD_ID_PATTERN = /^[0-9A-Z]{26}$/;
/** Valid column types for runtime validation */
var COLUMN_TYPES = /* @__PURE__ */ new Set([
	"TEXT",
	"REAL",
	"INTEGER",
	"JSON"
]);
var COLUMN_TYPE_TO_DATA_TYPE = {
	TEXT: "text",
	REAL: "real",
	INTEGER: "integer",
	JSON: "json"
};
var TEXT_ALIAS_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"slug"
]);
/** Field types usable as a `titleField` — plain text that reads well as a title. */
var TITLE_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"slug"
]);
/** Valid collection source prefixes/values */
var VALID_SOURCES = /* @__PURE__ */ new Set([
	"manual",
	"discovered",
	"seed"
]);
function isCollectionSource(value) {
	return VALID_SOURCES.has(value) || value.startsWith("template:") || value.startsWith("import:");
}
function isFieldType(value) {
	return value in FIELD_TYPE_TO_COLUMN;
}
function isColumnType(value) {
	return COLUMN_TYPES.has(value);
}
var REPEATER_SUB_FIELD_TYPE_SET = new Set(REPEATER_SUB_FIELD_TYPES);
function findUnsupportedRepeaterSubFieldType(validation) {
	if (!validation || typeof validation !== "object") return void 0;
	const subFields = "subFields" in validation ? validation.subFields : void 0;
	if (!Array.isArray(subFields)) return void 0;
	for (const [index, subField] of subFields.entries()) {
		if (!subField || typeof subField !== "object") continue;
		const type = "type" in subField ? subField.type : void 0;
		if (typeof type === "string" && !REPEATER_SUB_FIELD_TYPE_SET.has(type)) return {
			type,
			path: `validation.subFields[${index}].type`
		};
	}
}
var VALID_COLLECTION_SUPPORTS = /* @__PURE__ */ new Set([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"search",
	"seo"
]);
var SEED_FIELD_INSERT_BATCH_SIZE = 6;
/**
* Collection ordering shared by every list read: explicit `sort_order`
* first (ascending), then alphabetically by slug.
*/
var collectionOrder = sql`coalesce(sort_order, ${sql.lit(2147483647)})`;
function assertIndexableField(field, indexed, slug) {
	if (!indexed) return;
	if (!isIndexableFieldType(field.type)) throw new SchemaError(`Field "${slug}" cannot be indexed because type "${field.type}" is not a scalar query type`, "FIELD_NOT_INDEXABLE");
	if (isStoragelessField(field)) throw new SchemaError(`Field "${slug}" cannot be indexed because it stores no column to index`, "FIELD_NOT_INDEXABLE");
}
/** A field record's `validation`, which the package carries as any JSON value. */
function importFieldValidation(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
	return value;
}
function isCollectionSupport(value) {
	return typeof value === "string" && VALID_COLLECTION_SUPPORTS.has(value);
}
/**
* Parse a collection's `supports` column (stored as a JSON array of
* CollectionSupport keys). Unknown/invalid entries are filtered out so the
* runtime value matches the declared `CollectionSupport[]` type.
*
* Throws on malformed JSON so corruption surfaces loudly; returns an empty
* array only for explicitly null/empty values or non-array JSON.
*/
function parseSupports(raw) {
	if (!raw) return [];
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed.filter(isCollectionSupport);
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseCollectionAdmin(raw) {
	if (!raw) return void 0;
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed)) return void 0;
	const listColumns = parsed.listColumns;
	return {
		listColumns: Array.isArray(listColumns) ? listColumns.filter((value) => typeof value === "string") : void 0,
		quickCreate: typeof parsed.quickCreate === "boolean" ? parsed.quickCreate : void 0
	};
}
async function buildSeedCollectionCaptureFingerprint(input, fields) {
	const supports = input.supports ?? ["drafts", "revisions"];
	const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
	let maxSortOrder = -1;
	const definitions = fields.map((field) => {
		const sortOrder = field.sortOrder ?? maxSortOrder + 1;
		maxSortOrder = Math.max(maxSortOrder, sortOrder);
		return {
			slug: field.slug,
			label: field.label,
			type: field.type,
			required: field.required ?? false,
			unique: field.unique ?? false,
			defaultValue: field.defaultValue === void 0 ? null : JSON.stringify(field.defaultValue),
			validation: field.validation ? JSON.stringify(field.validation) : null,
			widget: field.widget ?? null,
			options: field.options ? JSON.stringify(field.options) : null,
			sortOrder,
			searchable: field.searchable ?? false,
			translatable: field.translatable ?? true
		};
	});
	const payload = JSON.stringify(canonicalizeFingerprintValue({
		version: 1,
		collection: {
			slug: input.slug,
			label: input.label,
			labelSingular: input.labelSingular ?? null,
			description: input.description ?? null,
			icon: input.icon ?? null,
			admin: input.admin ?? null,
			supports,
			hasSeo,
			hidden: input.hidden ?? false,
			sortOrder: input.sortOrder ?? null,
			...input.group ? { group: input.group } : {},
			commentsEnabled: input.commentsEnabled ?? false,
			...input.editLocking === false ? { editLocking: false } : {},
			urlPattern: input.urlPattern ?? null,
			routable: input.routable ?? true
		},
		fields: definitions
	}));
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
	return `media-usage-seed:v1:sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
function canonicalizeFingerprintValue(value) {
	if (value === void 0) return { __emdashUndefined: true };
	if (Array.isArray(value)) return value.map(canonicalizeFingerprintValue);
	if (typeof value !== "object" || value === null) return value;
	const canonical = {};
	for (const [key, entry] of Object.entries(value).toSorted(([a], [b]) => a.localeCompare(b))) canonical[key] = canonicalizeFingerprintValue(entry);
	return canonical;
}
/**
* Media-usage capture fingerprint for an imported collection, so an
* interrupted import resumes only the capture lifecycle it started.
*/
async function importCaptureFingerprint(record, fields) {
	return `media-usage-import:v1:${await canonicalDigest({
		collection: record,
		fields
	})}`;
}
/** Search stays disabled until the import's rebuild stage builds the index. */
function importSearchConfig(config) {
	if (config === void 0) return null;
	if (isRecord(config) && config.enabled === true) return JSON.stringify({
		...config,
		enabled: false
	});
	return JSON.stringify(config);
}
/**
* Error thrown when a schema operation fails
*/
var SchemaError = class extends Error {
	code;
	details;
	constructor(message, code, details) {
		super(message);
		this.code = code;
		this.details = details;
		this.name = "SchemaError";
	}
};
function collectionBeingDeletedError(slug) {
	return new SchemaError(`Collection "${slug}" is being deleted. Try again shortly.`, "COLLECTION_EXISTS");
}
/**
* Schema Registry
*
* Manages collection and field definitions stored in D1.
* Handles runtime DDL operations (CREATE TABLE, ALTER TABLE).
*/
var SchemaRegistry = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Notify the dev typegen hook that the schema has changed.
	*/
	notifyTypegen() {
		refreshDevTypes();
	}
	/** A deleted collection's slug stays taken until its media usage cleanup finalizes. */
	async finishPendingDeletion(slug) {
		const deletion = await finishMediaUsageCollectionDeletion(this.db, slug);
		if (deletion.state === "failed") throw new SchemaError(`Deleting the previous collection "${slug}" failed. Retry it by sending {"collectionId":"${deletion.collectionId}"} to POST /_emdash/api/admin/media-usage/collection-deletions/retry, then create the collection again.`, "COLLECTION_EXISTS", { deletedCollectionId: deletion.collectionId });
		if (deletion.state === "pending") throw collectionBeingDeletedError(slug);
	}
	/**
	* List all collections
	*/
	async listCollections() {
		return (await this.db.selectFrom("_emdash_collections").selectAll().orderBy(collectionOrder, "asc").orderBy("slug", "asc").execute()).map(this.mapCollectionRow);
	}
	/**
	* Get a collection by slug
	*/
	async getCollection(slug) {
		const row = await this.db.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
		return row ? this.mapCollectionRow(row) : null;
	}
	/**
	* Get a collection with all its fields
	*/
	async getCollectionWithFields(slug) {
		const collection = await this.getCollection(slug);
		if (!collection) return null;
		const fields = await this.listFields(collection.id);
		return {
			...collection,
			fields
		};
	}
	/**
	* List every collection together with its fields in O(1) query shapes
	* — one for collections, then one batched query for the fields of every
	* returned collection — instead of the N+1 pattern of `listCollections`
	* + per-collection `listFields`. The fields query is chunked at
	* `SQL_BATCH_SIZE` to stay under D1's bound-parameter limit, so on
	* sites with more than `SQL_BATCH_SIZE` collections the field fetch
	* becomes `ceil(collectionCount / SQL_BATCH_SIZE)` queries — still
	* a constant factor, not N+1. Typical sites have well under
	* `SQL_BATCH_SIZE` collections, so this is two queries in practice.
	*
	* Used by the manifest build, which previously paid N+1 round-trips on
	* every admin request. Each round-trip costs ~80–150ms against the D1
	* primary on a busy link, so a 10-collection site spent ~1 s rebuilding
	* a manifest that is now built fresh per admin request (no cache).
	*/
	async listCollectionsWithFields() {
		const collectionRows = await this.db.selectFrom("_emdash_collections").selectAll().orderBy(collectionOrder, "asc").orderBy("slug", "asc").execute();
		if (collectionRows.length === 0) return [];
		const fieldsByCollection = /* @__PURE__ */ new Map();
		for (const idChunk of chunks(collectionRows.map((c) => c.id), 50)) {
			const fieldRows = await this.db.selectFrom("_emdash_fields").where("collection_id", "in", idChunk).selectAll().orderBy("collection_id", "asc").orderBy("sort_order", "asc").orderBy("created_at", "asc").execute();
			for (const row of fieldRows) {
				const list = fieldsByCollection.get(row.collection_id) ?? [];
				list.push(this.mapFieldRow(row));
				fieldsByCollection.set(row.collection_id, list);
			}
		}
		return collectionRows.map((c) => ({
			...this.mapCollectionRow(c),
			fields: fieldsByCollection.get(c.id) ?? []
		}));
	}
	/**
	* Validate `titleField`/`dateField` against the collection's fields:
	* `titleField` must be a text-like field; `dateField` must be a `datetime` field.
	* Only truthy values are checked (undefined = unchanged, null/"" = cleared).
	*/
	async validateTitleDateFields(collectionId, collectionSlug, input, db = this.db) {
		const slugs = [input.titleField, input.dateField].filter((slug) => !!slug);
		if (slugs.length === 0) return;
		const rows = await db.selectFrom("_emdash_fields").where("collection_id", "=", collectionId).where("slug", "in", slugs).select(["slug", "type"]).execute();
		const typeBySlug = new Map(rows.map((row) => [row.slug, row.type]));
		if (input.titleField) {
			const type = typeBySlug.get(input.titleField);
			if (type === void 0) throw new SchemaError(`titleField "${input.titleField}" is not a field on "${collectionSlug}"`, "INVALID_TITLE_FIELD");
			if (!TITLE_FIELD_TYPES.has(type)) throw new SchemaError(`titleField "${input.titleField}" must be a text field (got "${type}")`, "INVALID_TITLE_FIELD");
		}
		if (input.dateField) {
			const type = typeBySlug.get(input.dateField);
			if (type === void 0) throw new SchemaError(`dateField "${input.dateField}" is not a field on "${collectionSlug}"`, "INVALID_DATE_FIELD");
			if (type !== "datetime") throw new SchemaError(`dateField "${input.dateField}" must be a datetime field (got "${type}")`, "INVALID_DATE_FIELD");
		}
	}
	/**
	* Create a new collection
	*/
	async createCollection(input) {
		this.validateSlug(input.slug, "collection");
		this.validateUrlPattern(input.urlPattern);
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		await this.finishPendingDeletion(input.slug);
		const existing = await this.getCollection(input.slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, input.slug)) throw collectionBeingDeletedError(input.slug);
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug
		})) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const proposedId = existing?.id ?? ulid();
		const tableName = this.getTableName(input.slug);
		if (!existing && await tableExists(this.db, tableName) && !await findResumableMediaUsageCollectionCaptureId(this.db, { collectionSlug: input.slug })) throw new SchemaError(`Collection table "${tableName}" exists but is not registered`, "COLLECTION_TABLE_ORPHANED");
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		await withTransaction(this.db, async (trx) => {
			const capture = await prepareMediaUsageCollectionCapture(trx, {
				collectionId: proposedId,
				collectionSlug: input.slug,
				registeredCollectionId: existing?.id
			});
			const values = {
				id: capture.collectionId,
				slug: input.slug,
				label: input.label,
				label_singular: input.labelSingular ?? null,
				description: input.description ?? null,
				icon: input.icon ?? null,
				admin_config: input.admin ? JSON.stringify(input.admin) : null,
				supports: JSON.stringify(supports),
				source: input.source ?? "manual",
				has_seo: hasSeo ? 1 : 0,
				routable: input.routable === false ? 0 : 1,
				hidden: input.hidden ? 1 : 0,
				sort_order: input.sortOrder ?? null,
				nav_group: input.group?.trim() || null,
				comments_enabled: input.commentsEnabled ? 1 : 0,
				edit_locking: input.editLocking === false ? 0 : 1,
				url_pattern: input.urlPattern ?? null
			};
			if (capture.captureRequired) {
				await this.createContentTable(input.slug, trx, [], { ifNotExists: capture.resuming });
				await installPreparedMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				await markMediaUsageCollectionCaptureReady(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				if (!capture.registrationExists) await trx.insertInto("_emdash_collections").values(values).execute();
				await finalizeMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				return;
			}
			await trx.insertInto("_emdash_collections").values(values).execute();
			await this.createContentTable(input.slug, trx);
		});
		const collection = await this.getCollection(input.slug);
		if (!collection) throw new SchemaError("Failed to create collection", "CREATE_FAILED");
		resetRegisteredCollectionsCache();
		this.notifyTypegen();
		return collection;
	}
	/**
	* Create a seed-owned collection and all of its fields in bulk.
	*
	* Fresh seeds can define dozens of fields. Creating them through
	* `createField` performs multiple reads, one ALTER TABLE, and one media
	* usage invalidation per field, which can exhaust D1's per-request query
	* budget. This path validates the full schema before mutating it, creates
	* the complete content table in one statement, and inserts field metadata
	* in parameter-safe batches.
	*/
	async createSeedCollection(input, fields) {
		this.validateSlug(input.slug, "collection");
		this.validateUrlPattern(input.urlPattern);
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		const fieldSlugs = /* @__PURE__ */ new Set();
		const normalizedFields = [];
		for (const field of fields) {
			this.validateSlug(field.slug, "field");
			assertIndexableField(field, field.indexed, field.slug);
			if (RESERVED_FIELD_SLUGS.includes(field.slug)) throw new SchemaError(`Field slug "${field.slug}" is reserved`, "RESERVED_SLUG");
			if (fieldSlugs.has(field.slug)) throw new SchemaError(`Field "${field.slug}" already exists in collection "${input.slug}"`, "FIELD_EXISTS");
			fieldSlugs.add(field.slug);
			normalizedFields.push(field.type === "blocks" ? {
				...field,
				validation: await this.normalizeBlocksFieldValidation(input.slug, field, void 0, this.db, false)
			} : { ...field });
		}
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		const creationFingerprint = await buildSeedCollectionCaptureFingerprint(input, normalizedFields);
		await this.finishPendingDeletion(input.slug);
		const existing = await this.getCollection(input.slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, input.slug)) throw collectionBeingDeletedError(input.slug);
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug,
			creationFingerprint
		})) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const proposedCollectionId = existing?.id ?? ulid();
		let maxSortOrder = -1;
		const fieldRows = normalizedFields.map((field) => {
			const sortOrder = field.sortOrder ?? maxSortOrder + 1;
			maxSortOrder = Math.max(maxSortOrder, sortOrder);
			return {
				id: ulid(),
				collection_id: proposedCollectionId,
				slug: field.slug,
				label: field.label,
				type: field.type,
				column_type: FIELD_TYPE_TO_COLUMN[field.type],
				required: field.required ? 1 : 0,
				unique: field.unique ? 1 : 0,
				default_value: field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null,
				validation: field.validation ? JSON.stringify(field.validation) : null,
				widget: field.widget ?? null,
				options: field.options ? JSON.stringify(field.options) : null,
				sort_order: sortOrder,
				searchable: field.searchable ? 1 : 0,
				indexed: field.indexed ? 1 : 0,
				translatable: field.translatable === false ? 0 : 1
			};
		});
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				const capture = await prepareMediaUsageCollectionCapture(trx, {
					collectionId: proposedCollectionId,
					collectionSlug: input.slug,
					creationFingerprint,
					registeredCollectionId: existing?.id
				});
				const collectionValues = {
					id: capture.collectionId,
					slug: input.slug,
					label: input.label,
					label_singular: input.labelSingular ?? null,
					description: input.description ?? null,
					icon: input.icon ?? null,
					admin_config: input.admin ? JSON.stringify(input.admin) : null,
					supports: JSON.stringify(supports),
					source: "seed",
					has_seo: hasSeo ? 1 : 0,
					routable: input.routable === false ? 0 : 1,
					hidden: input.hidden ? 1 : 0,
					sort_order: input.sortOrder ?? null,
					nav_group: input.group?.trim() || null,
					comments_enabled: input.commentsEnabled ? 1 : 0,
					edit_locking: input.editLocking === false ? 0 : 1,
					url_pattern: input.urlPattern ?? null
				};
				const rows = fieldRows.map((row) => ({
					...row,
					collection_id: capture.collectionId
				}));
				if (capture.captureRequired) {
					await this.createContentTable(input.slug, trx, normalizedFields, { ifNotExists: capture.resuming });
					await installPreparedMediaUsageCollectionCapture(trx, {
						collectionId: capture.collectionId,
						collectionSlug: input.slug
					});
					await markMediaUsageCollectionCaptureReady(trx, {
						collectionId: capture.collectionId,
						collectionSlug: input.slug
					});
					if (!capture.registrationExists) {
						await trx.insertInto("_emdash_collections").values(collectionValues).execute();
						schemaMutated = true;
					}
				} else {
					await trx.insertInto("_emdash_collections").values(collectionValues).execute();
					schemaMutated = true;
					await this.createContentTable(input.slug, trx, normalizedFields);
				}
				for (const fieldBatch of chunks(rows, SEED_FIELD_INSERT_BATCH_SIZE)) {
					let insert = trx.insertInto("_emdash_fields").values(fieldBatch);
					if (capture.resuming) insert = insert.onConflict((conflict) => conflict.columns(["collection_id", "slug"]).doNothing());
					await insert.execute();
				}
				let indexedRows = rows;
				if (capture.resuming) indexedRows = await this.assertSeedFieldDefinitions(capture.collectionId, normalizedFields, trx);
				for (const field of indexedRows) if (field.indexed === 1) await this.createFieldIndex(input.slug, field.id, field.slug, trx);
				if (capture.captureRequired) await finalizeMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
			throw error;
		} finally {
			if (schemaMutated) resetRegisteredCollectionsCache();
		}
		this.notifyTypegen();
	}
	/**
	* Write a site-package collection and its fields with their exact ids and
	* every column (see `CollectionImporter` in `transfer/schema-importer.ts`).
	*
	* Every statement is idempotent and none runs in a transaction, so a call
	* interrupted after any statement (D1 has no transactions) can be repeated
	* until it completes. Rows are inserted with `ON CONFLICT DO NOTHING` and
	* then read back; a stored row that differs from the record throws
	* `IMPORT_MISMATCH`.
	*/
	async importCollection(record, fieldRecords, _options) {
		this.validateSlug(record.slug, "collection");
		if (RESERVED_COLLECTION_SLUGS.includes(record.slug)) throw new SchemaError(`Collection slug "${record.slug}" is reserved`, "RESERVED_SLUG");
		const fields = this.importFieldInputs(record, fieldRecords);
		const conflicting = await this.db.selectFrom("_emdash_collections").select(["id", "slug"]).where((eb) => eb.or([eb("id", "=", record.id), eb("slug", "=", record.slug)])).execute();
		if (conflicting.some((row) => row.id !== record.id || row.slug !== record.slug)) throw new SchemaError(`Collection "${record.slug}" already exists`, "COLLECTION_EXISTS");
		const registered = conflicting.length > 0;
		if (await isMediaUsageCollectionSlugDeleting(this.db, record.slug)) throw new SchemaError(`Collection "${record.slug}" is being deleted`, "COLLECTION_EXISTS");
		const identity = {
			collectionId: record.id,
			collectionSlug: record.slug
		};
		const lifecycle = await this.db.selectFrom("_emdash_media_usage_index_status").select(["collection_id", "capture_state"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", record.slug).executeTakeFirst();
		const captureFinalized = lifecycle?.collection_id === record.id && lifecycle.capture_state === "active";
		let captureRequired = captureFinalized;
		if (!captureFinalized) captureRequired = (await prepareMediaUsageCollectionCapture(this.db, {
			...identity,
			creationFingerprint: await importCaptureFingerprint(record, fieldRecords),
			registeredCollectionId: registered ? record.id : void 0
		})).captureRequired;
		await this.createContentTable(record.slug, this.db, fields, { ifNotExists: true });
		if (captureRequired && !captureFinalized) {
			await installPreparedMediaUsageCollectionCapture(this.db, identity);
			await markMediaUsageCollectionCaptureReady(this.db, identity);
		}
		const collectionSpec = getPortableTableSpec("_emdash_collections");
		const fieldSpec = getPortableTableSpec("_emdash_fields");
		if (!collectionSpec || !fieldSpec) throw new SchemaError("Missing transfer column registry", "IMPORT_MISMATCH");
		const collectionRow = {
			...encodeRecord(this.db, collectionSpec.columns, record, {
				kind: "collection",
				id: record.id
			}),
			search_config: importSearchConfig(record.searchConfig)
		};
		const insertedCollection = {
			...collectionRow,
			title_field: null,
			date_field: null
		};
		const collectionCreated = await insertRows(this.db, "_emdash_collections", Object.keys(insertedCollection), [insertedCollection]) > 0;
		const fieldRows = fieldRecords.map((field) => encodeRecord(this.db, fieldSpec.columns, field, {
			kind: "field",
			id: field.id
		}));
		const fieldsCreated = await insertRows(this.db, "_emdash_fields", Object.keys(recordCodecs(fieldSpec.columns)), fieldRows);
		const float4 = isPostgres(this.db);
		const storedFields = await this.db.selectFrom("_emdash_fields").selectAll().where("collection_id", "=", record.id).execute();
		const fieldCodecs = recordCodecs(fieldSpec.columns);
		const storedById = new Map(storedFields.map((row) => [row.id, row]));
		if (storedFields.length !== fieldRows.length) throw new SchemaError(`Imported fields of "${record.slug}" do not match`, "IMPORT_MISMATCH");
		fieldRecords.forEach((field, index) => {
			const row = fieldRows[index];
			const stored = storedById.get(field.id);
			if (!row || !stored || firstDifference(this.db, fieldCodecs, row, stored, { float4 }) !== null) throw new SchemaError(`Imported field "${field.slug}" does not match`, "IMPORT_MISMATCH", { fieldId: field.id });
		});
		for (const field of fieldRecords) if (field.indexed) await this.createFieldIndex(record.slug, field.id, field.slug);
		if (captureRequired && !captureFinalized) await finalizeMediaUsageCollectionCapture(this.db, identity);
		await this.db.updateTable("_emdash_collections").set({
			title_field: record.titleField ?? null,
			date_field: record.dateField ?? null
		}).where("id", "=", record.id).execute();
		const storedCollection = await this.db.selectFrom("_emdash_collections").selectAll().where("id", "=", record.id).executeTakeFirst();
		const expectedCollection = {
			...collectionRow,
			title_field: record.titleField ?? null,
			date_field: record.dateField ?? null
		};
		if (!storedCollection || firstDifference(this.db, recordCodecs(collectionSpec.columns), expectedCollection, storedCollection, { float4 }) !== null) throw new SchemaError(`Imported collection "${record.slug}" does not match`, "IMPORT_MISMATCH");
		resetRegisteredCollectionsCache();
		this.notifyTypegen();
		return {
			collectionCreated,
			fieldsCreated
		};
	}
	importFieldInputs(record, fieldRecords) {
		const slugs = /* @__PURE__ */ new Set();
		return fieldRecords.map((field) => {
			if (field.collectionId !== record.id) throw new SchemaError(`Field "${field.slug}" does not belong to "${record.slug}"`, "IMPORT_MISMATCH");
			this.validateSlug(field.slug, "field");
			if (RESERVED_FIELD_SLUGS.includes(field.slug)) throw new SchemaError(`Field slug "${field.slug}" is reserved`, "RESERVED_SLUG");
			if (slugs.has(field.slug)) throw new SchemaError(`Field "${field.slug}" already exists in collection "${record.slug}"`, "FIELD_EXISTS");
			slugs.add(field.slug);
			if (!isFieldType(field.type) || FIELD_TYPE_TO_COLUMN[field.type] !== field.columnType) throw new SchemaError(`Field "${field.slug}" has an unsupported type or column type`, "INVALID_FIELD_TYPE");
			const validation = importFieldValidation(field.validation);
			assertIndexableField({
				type: field.type,
				validation
			}, field.indexed, field.slug);
			if (field.indexed) this.getFieldIndexName(field.id);
			return {
				slug: field.slug,
				label: field.label,
				type: field.type,
				required: field.required,
				defaultValue: field.defaultValue,
				validation
			};
		});
	}
	async assertSeedFieldDefinitions(collectionId, fields, db) {
		const stored = await db.selectFrom("_emdash_fields").selectAll().where("collection_id", "=", collectionId).execute();
		if (stored.length !== fields.length) throw new SchemaError("Interrupted seed collection fields do not match", "CREATE_FAILED");
		let maxSortOrder = -1;
		for (const field of fields) {
			const sortOrder = field.sortOrder ?? maxSortOrder + 1;
			maxSortOrder = Math.max(maxSortOrder, sortOrder);
			const row = stored.find((candidate) => candidate.slug === field.slug);
			if (!row || row.label !== field.label || row.type !== field.type || row.column_type !== FIELD_TYPE_TO_COLUMN[field.type] || row.required !== (field.required ? 1 : 0) || row.unique !== (field.unique ? 1 : 0) || row.default_value !== (field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null) || row.validation !== (field.validation ? JSON.stringify(field.validation) : null) || row.widget !== (field.widget ?? null) || row.options !== (field.options ? JSON.stringify(field.options) : null) || row.sort_order !== sortOrder || row.searchable !== (field.searchable ? 1 : 0) || row.indexed !== (field.indexed ? 1 : 0) || row.translatable !== (field.translatable === false ? 0 : 1)) throw new SchemaError("Interrupted seed collection fields do not match", "CREATE_FAILED");
		}
		return stored;
	}
	/**
	* Update a collection
	*/
	async updateCollection(slug, input) {
		const updated = await withTransaction(this.db, async (trx) => {
			const existingRow = await trx.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
			if (!existingRow) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
			if (input.urlPattern !== existingRow.url_pattern) this.validateUrlPattern(input.urlPattern);
			const existing = this.mapCollectionRow(existingRow);
			await this.validateTitleDateFields(existing.id, slug, {
				titleField: input.titleField,
				dateField: input.dateField
			}, trx);
			const updates = {};
			if (input.label !== void 0) updates.label = input.label;
			if (input.labelSingular !== void 0) updates.label_singular = input.labelSingular;
			if (input.description !== void 0) updates.description = input.description;
			if (input.icon !== void 0) updates.icon = input.icon || null;
			if (input.admin !== void 0) updates.admin_config = JSON.stringify(input.admin);
			if (input.supports !== void 0) updates.supports = JSON.stringify(input.supports);
			if (input.urlPattern !== void 0) updates.url_pattern = input.urlPattern;
			if (input.routable !== void 0) updates.routable = input.routable ? 1 : 0;
			if (input.hasSeo !== void 0) updates.has_seo = input.hasSeo ? 1 : 0;
			else if (input.supports !== void 0) updates.has_seo = input.supports.includes("seo") ? 1 : 0;
			if (input.hidden !== void 0) updates.hidden = input.hidden ? 1 : 0;
			if (input.sortOrder !== void 0) updates.sort_order = input.sortOrder;
			if (input.group !== void 0) updates.nav_group = input.group?.trim() || null;
			if (input.titleField !== void 0) updates.title_field = input.titleField || null;
			if (input.dateField !== void 0) updates.date_field = input.dateField || null;
			if (input.commentsEnabled !== void 0) updates.comments_enabled = input.commentsEnabled ? 1 : 0;
			if (input.commentsModeration !== void 0) updates.comments_moderation = input.commentsModeration;
			if (input.commentsClosedAfterDays !== void 0) updates.comments_closed_after_days = input.commentsClosedAfterDays;
			if (input.commentsAutoApproveUsers !== void 0) updates.comments_auto_approve_users = input.commentsAutoApproveUsers ? 1 : 0;
			if (input.editLocking !== void 0) updates.edit_locking = input.editLocking ? 1 : 0;
			updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
			await trx.updateTable("_emdash_collections").set(updates).where("id", "=", existing.id).execute();
			const row = await trx.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
			if (!row) throw new SchemaError("Failed to update collection", "UPDATE_FAILED");
			if (input.supports !== void 0) {
				if (existing.supports.includes("search") !== parseSupports(row.supports).includes("search")) await this.syncSearchState(slug, trx);
			}
			return this.mapCollectionRow(row);
		});
		this.notifyTypegen();
		return updated;
	}
	/**
	* The content guard {@link deleteCollection} refuses on, on its own.
	*
	* A caller that has to cascade before deleting — relations, whose edges point
	* at rows the drop is about to take — needs to know the delete is acceptable
	* before it changes anything, since the cascade cannot be rolled back on D1.
	*/
	async assertCollectionDeletable(slug, options) {
		if (options?.force) return;
		if (await this.getCollection(slug) && await this.collectionHasContent(slug)) throw new SchemaError(`Collection "${slug}" has content. Use force: true to delete.`, "COLLECTION_HAS_CONTENT");
	}
	/**
	* Delete a collection
	*/
	async deleteCollection(slug, options) {
		await this.assertCollectionDeletable(slug, options);
		const existing = await this.getCollection(slug);
		const activated = await deleteActivatedMediaUsageCollection(this.db, {
			collectionId: existing?.id,
			collectionSlug: slug,
			forceDelete: options?.force === true
		});
		if (activated === "has_content") throw new SchemaError(`Collection "${slug}" has content. Use force: true to delete.`, "COLLECTION_HAS_CONTENT");
		if (activated === "in_progress") throw new SchemaError(`Collection "${slug}" deletion is already in progress`, "CONFLICT");
		if (activated === "deleted") return;
		if (!existing) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
		let contentTableDropped = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await new FTSManager(trx).dropFtsTable(slug);
				const tableName = this.getTableName(slug);
				await sql`DROP TABLE IF EXISTS ${sql.ref(tableName)}`.execute(trx);
				contentTableDropped = true;
				await deleteSharedCollectionRecords(trx, slug);
				await trx.deleteFrom("_emdash_collections").where("id", "=", existing.id).execute();
			});
			await deleteContentMediaUsageCollection(this.db, slug);
		} catch (error) {
			if (contentTableDropped && !await tableExists(this.db, this.getTableName(slug))) await deleteContentMediaUsageCollection(this.db, slug);
			throw error;
		} finally {
			if (contentTableDropped) resetRegisteredCollectionsCache();
		}
		this.notifyTypegen();
	}
	/**
	* List fields for a collection
	*/
	async listFields(collectionId) {
		return (await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collectionId).selectAll().orderBy("sort_order", "asc").orderBy("created_at", "asc").execute()).map(this.mapFieldRow);
	}
	/**
	* Get a field by slug within a collection
	*/
	async getField(collectionSlug, fieldSlug) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) return null;
		const row = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
		return row ? this.mapFieldRow(row) : null;
	}
	/**
	* Create a new field
	*/
	async createField(collectionSlug, input) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		this.validateSlug(input.slug, "field");
		if (RESERVED_FIELD_SLUGS.includes(input.slug)) throw new SchemaError(`Field slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		if (await this.getField(collectionSlug, input.slug)) throw new SchemaError(`Field "${input.slug}" already exists in collection "${collectionSlug}"`, "FIELD_EXISTS");
		const id = ulid();
		const validation = input.type === "blocks" ? await this.normalizeBlocksFieldValidation(collectionSlug, input, void 0, this.db) : input.validation;
		const columnType = FIELD_TYPE_TO_COLUMN[input.type];
		assertIndexableField(input, input.indexed, input.slug);
		const maxSort = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).select((eb) => eb.fn.max("sort_order").as("max")).executeTakeFirst();
		const sortOrder = input.sortOrder ?? (maxSort?.max ?? -1) + 1;
		const activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
		let schemaMutated = false;
		let fieldStorageReady = false;
		try {
			const created = await withTransaction(this.db, async (trx) => {
				await trx.insertInto("_emdash_fields").values({
					id,
					collection_id: collection.id,
					slug: input.slug,
					label: input.label,
					type: input.type,
					column_type: columnType,
					required: input.required ? 1 : 0,
					unique: input.unique ? 1 : 0,
					default_value: input.defaultValue !== void 0 ? JSON.stringify(input.defaultValue) : null,
					validation: validation ? JSON.stringify(validation) : null,
					widget: input.widget ?? null,
					options: input.options ? JSON.stringify(input.options) : null,
					sort_order: sortOrder,
					searchable: input.searchable ? 1 : 0,
					indexed: input.indexed ? 1 : 0,
					translatable: input.translatable === false ? 0 : 1
				}).execute();
				schemaMutated = true;
				if (!isStoragelessField(input)) await this.addColumn(collectionSlug, input.slug, input.type, {
					required: input.required,
					defaultValue: input.defaultValue
				}, trx);
				fieldStorageReady = true;
				if (input.indexed) await this.createFieldIndex(collectionSlug, id, input.slug, trx);
				const fieldRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", input.slug).selectAll().executeTakeFirst();
				if (!fieldRow) throw new SchemaError("Failed to create field", "CREATE_FAILED");
				const field = this.mapFieldRow(fieldRow);
				if (input.searchable) await this.syncSearchState(collectionSlug, trx);
				return field;
			});
			if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			this.notifyTypegen();
			return created;
		} catch (error) {
			if (schemaMutated) {
				if (!fieldStorageReady) await this.db.deleteFrom("_emdash_fields").where("id", "=", id).execute();
				if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
				else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			}
			throw error;
		}
	}
	/**
	* Update a field
	*/
	async updateField(collectionSlug, fieldSlug, input) {
		let activeCoverageInvalidated = false;
		let schemaMutated = false;
		try {
			const updatedField = await withTransaction(this.db, async (trx) => {
				const collectionRow = await trx.selectFrom("_emdash_collections").where("slug", "=", collectionSlug).select([
					"id",
					"title_field",
					"date_field"
				]).executeTakeFirst();
				const fieldRow = collectionRow ? await trx.selectFrom("_emdash_fields").where("collection_id", "=", collectionRow.id).where("slug", "=", fieldSlug).selectAll().executeTakeFirst() : void 0;
				if (!fieldRow) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
				const field = this.mapFieldRow(fieldRow);
				if (field.unsupportedType) throw new SchemaError(`Field "${fieldSlug}" in collection "${collectionSlug}" uses unsupported field type "${field.unsupportedType.type}" at "${field.unsupportedType.path}"`, "UNSUPPORTED_FIELD_TYPE");
				const updates = {};
				let nextType = field.type;
				const nextValidation = field.type === "blocks" ? await this.normalizeBlocksFieldValidation(collectionSlug, {
					...input,
					slug: field.slug,
					label: input.label ?? field.label,
					type: field.type
				}, field, trx) : input.validation !== void 0 ? input.validation : field.validation;
				if (input.type !== void 0 && input.type !== field.type) {
					if (isStoragelessField(field) !== isStoragelessField({
						type: input.type,
						validation: nextValidation
					})) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" between storage-less and column-backed types ("${field.type}" -> "${input.type}").`, "FIELD_TYPE_COLUMN_CHANGE");
					const newColumnType = FIELD_TYPE_TO_COLUMN[input.type];
					if (newColumnType !== field.columnType) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" from type "${field.type}" to "${input.type}": the underlying column type would change from ${field.columnType} to ${newColumnType}, which requires a manual content migration.`, "FIELD_TYPE_COLUMN_CHANGE");
					if (!TEXT_ALIAS_FIELD_TYPES.has(field.type) || !TEXT_ALIAS_FIELD_TYPES.has(input.type)) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" from type "${field.type}" to "${input.type}" without a manual content migration.`, "FIELD_TYPE_CHANGE_REQUIRES_MIGRATION");
					if (collectionRow?.title_field === fieldSlug && !TITLE_FIELD_TYPES.has(input.type)) throw new SchemaError(`titleField "${fieldSlug}" must stay a text field, not "${input.type}"`, "INVALID_TITLE_FIELD");
					if (collectionRow?.date_field === fieldSlug && input.type !== "datetime") throw new SchemaError(`dateField "${fieldSlug}" must stay a datetime field, not "${input.type}"`, "INVALID_DATE_FIELD");
					nextType = input.type;
					updates.type = input.type;
					updates.column_type = newColumnType;
				}
				if (input.required !== void 0 && input.required !== field.required) throw new SchemaError(`Changing required for field "${fieldSlug}" requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.unique !== void 0 && input.unique !== field.unique) throw new SchemaError(`Changing unique for field "${fieldSlug}" requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.translatable === false && field.translatable) throw new SchemaError(`Changing field "${fieldSlug}" to non-translatable requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.label !== void 0) updates.label = input.label;
				if (input.required !== void 0) updates.required = input.required ? 1 : 0;
				if (input.unique !== void 0) updates.unique = input.unique ? 1 : 0;
				if (input.searchable !== void 0) updates.searchable = input.searchable ? 1 : 0;
				const indexedChanged = input.indexed !== void 0 && input.indexed !== field.indexed;
				if (indexedChanged) updates.indexed = input.indexed ? 1 : 0;
				if (input.translatable !== void 0) updates.translatable = input.translatable ? 1 : 0;
				if (input.defaultValue !== void 0) updates.default_value = JSON.stringify(input.defaultValue);
				if (input.validation !== void 0 || field.type === "blocks") updates.validation = nextValidation ? JSON.stringify(nextValidation) : null;
				if (input.widget !== void 0) updates.widget = input.widget;
				if (input.options !== void 0) updates.options = JSON.stringify(input.options);
				if (input.sortOrder !== void 0) updates.sort_order = input.sortOrder;
				assertIndexableField({
					type: nextType,
					validation: nextValidation
				}, input.indexed ?? field.indexed, fieldSlug);
				if (Object.keys(updates).length === 0) return field;
				activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(trx, collectionSlug);
				if (Object.keys(updates).length > 0) {
					await trx.updateTable("_emdash_fields").set(updates).where("id", "=", field.id).execute();
					schemaMutated = true;
				}
				if (indexedChanged) {
					if (input.indexed) await this.createFieldIndex(collectionSlug, field.id, fieldSlug, trx);
					else await this.dropFieldIndex(field.id, trx);
					schemaMutated = true;
				}
				const updatedRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", field.collectionId).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
				if (!updatedRow) throw new SchemaError("Failed to update field", "UPDATE_FAILED");
				const updated = this.mapFieldRow(updatedRow);
				if (schemaMutated && input.searchable !== void 0 && input.searchable !== field.searchable) await this.syncSearchState(collectionSlug, trx);
				return updated;
			});
			if (schemaMutated) {
				if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
				else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			}
			this.notifyTypegen();
			return updatedField;
		} catch (error) {
			if (schemaMutated) {
				if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
				else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			}
			throw error;
		}
	}
	/**
	* Synchronize an existing FTS index with the collection's current state.
	*
	* Only rebuilds or disables — never first-time enables. First-time FTS
	* enablement is handled by the seed's explicit enableSearch call (which
	* is try-caught) or the admin UI toggle.
	*
	* - FTS active + still has search support and searchable fields → rebuild
	* - FTS active + lost search support or no searchable fields    → disable
	* - FTS not active                                              → no-op
	*
	* Pass `db` when calling from within a transaction so FTS operations
	* participate in the same transaction and are rolled back on failure.
	*/
	async syncSearchState(collectionSlug, db) {
		const conn = db ?? this.db;
		const ftsManager = new FTSManager(conn);
		const row = await conn.selectFrom("_emdash_collections").where("slug", "=", collectionSlug).select("supports").executeTakeFirst();
		if (!row) return;
		const wantsSearch = parseSupports(row.supports).includes("search");
		const searchableFields = await ftsManager.getSearchableFields(collectionSlug);
		const config = await ftsManager.getSearchConfig(collectionSlug);
		const ftsActive = config?.enabled === true;
		if (wantsSearch && searchableFields.length > 0 && ftsActive) await ftsManager.rebuildIndex(collectionSlug, searchableFields, config?.weights, config?.tokenize);
		else if (ftsActive && (!wantsSearch || searchableFields.length === 0)) await ftsManager.disableSearch(collectionSlug);
	}
	/**
	* Delete a field
	*/
	async deleteField(collectionSlug, fieldSlug) {
		const field = await this.getField(collectionSlug, fieldSlug);
		if (!field) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
		const activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
		const collection = await this.getCollection(collectionSlug);
		const clearTitle = collection?.titleField === fieldSlug;
		const clearDate = collection?.dateField === fieldSlug;
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await trx.deleteFrom("_emdash_fields").where("id", "=", field.id).execute();
				schemaMutated = true;
				if (clearTitle || clearDate) await trx.updateTable("_emdash_collections").set({
					...clearTitle ? { title_field: null } : {},
					...clearDate ? { date_field: null } : {},
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).where("slug", "=", collectionSlug).execute();
				if (field.searchable) await this.syncSearchState(collectionSlug, trx);
				if (field.indexed) await this.dropFieldIndex(field.id, trx);
				if (await columnExists(trx, this.getTableName(collectionSlug), this.getColumnName(fieldSlug))) await this.dropColumn(collectionSlug, fieldSlug, trx);
			});
			if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) {
				if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
				else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			}
			throw error;
		}
		this.notifyTypegen();
	}
	/**
	* Reorder collections in the admin sidebar.
	*
	* `slugs` is the full desired order: every listed collection gets its
	* index as `sort_order`, and any collection left out has its explicit
	* position cleared, dropping it back to the alphabetical tail. Unknown or
	* duplicate slugs throw before anything is written.
	*/
	async reorderCollections(slugs) {
		const known = new Set((await this.listCollections()).map((collection) => collection.slug));
		const unknown = slugs.filter((slug) => !known.has(slug));
		if (unknown.length > 0) throw new SchemaError(`Unknown collection${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}`, "COLLECTION_NOT_FOUND", { slugs: unknown });
		const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
		if (duplicates.length > 0) throw new SchemaError(`Duplicate collection${duplicates.length > 1 ? "s" : ""}: ${[...new Set(duplicates)].join(", ")}`, "DUPLICATE_SLUG", { slugs: [...new Set(duplicates)] });
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const ordered = new Set(slugs);
		await withTransaction(this.db, async (trx) => {
			for (const [index, slug] of slugs.entries()) await trx.updateTable("_emdash_collections").set({
				sort_order: index,
				updated_at: now
			}).where("slug", "=", slug).execute();
			const cleared = [...known].filter((slug) => !ordered.has(slug));
			for (const slugChunk of chunks(cleared, 50)) await trx.updateTable("_emdash_collections").set({
				sort_order: null,
				updated_at: now
			}).where("slug", "in", slugChunk).execute();
		});
		this.notifyTypegen();
	}
	/**
	* Reorder fields
	*/
	async reorderFields(collectionSlug, fieldSlugs) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		for (let i = 0; i < fieldSlugs.length; i++) await this.db.updateTable("_emdash_fields").set({ sort_order: i }).where("collection_id", "=", collection.id).where("slug", "=", fieldSlugs[i]).execute();
		this.notifyTypegen();
	}
	/**
	* Create a content table for a collection
	*/
	async createContentTable(slug, db, fields = [], options = {}) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(slug);
		let table = conn.schema.createTable(tableName).addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text").addColumn("status", "text", (col) => col.defaultTo("draft")).addColumn("author_id", "text").addColumn("primary_byline_id", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("published_at", "text").addColumn("scheduled_at", "text").addColumn("deleted_at", "text").addColumn("version", "integer", (col) => col.defaultTo(1)).addColumn("live_revision_id", "text", (col) => col.references("revisions.id")).addColumn("draft_revision_id", "text", (col) => col.references("revisions.id")).addColumn("locale", "text", (col) => col.notNull().defaultTo("en")).addColumn("translation_group", "text");
		if (options.ifNotExists) table = table.ifNotExists();
		for (const field of fields) {
			if (isStoragelessField(field)) continue;
			const columnName = this.getColumnName(field.slug);
			const columnType = COLUMN_TYPE_TO_DATA_TYPE[FIELD_TYPE_TO_COLUMN[field.type]];
			table = table.addColumn(columnName, columnType, (column) => {
				if (field.type === "blocks") return column.notNull().defaultTo("[]");
				if (!field.required) return column;
				const defaultValue = field.defaultValue !== void 0 ? this.formatDefaultValue(field.defaultValue, field.type) : this.getEmptyDefault(field.type);
				return column.notNull().defaultTo(sql.raw(defaultValue));
			});
		}
		await table.addUniqueConstraint(`${tableName}_slug_locale_unique`, ["slug", "locale"]).execute();
		const createIndex = options.ifNotExists ? sql`CREATE INDEX IF NOT EXISTS` : sql`CREATE INDEX`;
		const createUniqueIndex = options.ifNotExists ? sql`CREATE UNIQUE INDEX IF NOT EXISTS` : sql`CREATE UNIQUE INDEX`;
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_slug`)}
			ON ${sql.ref(tableName)} (slug)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_del_sched`)}
			ON ${sql.ref(tableName)} (deleted_at, scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_live_revision`)}
			ON ${sql.ref(tableName)} (live_revision_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_draft_revision`)}
			ON ${sql.ref(tableName)} (draft_revision_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_author`)}
			ON ${sql.ref(tableName)} (author_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_primary_byline`)}
			ON ${sql.ref(tableName)} (primary_byline_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_locale`)}
			ON ${sql.ref(tableName)} (locale)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_tg_locale`)}
			ON ${sql.ref(tableName)} (translation_group, locale)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_del_tg_locale`)}
			ON ${sql.ref(tableName)} (deleted_at, translation_group, locale)
		`.execute(conn);
		await sql`
			${createUniqueIndex} ${sql.ref(`uidx_${tableName}_active_tg_locale`)}
			ON ${sql.ref(tableName)} (translation_group, lower(locale))
			WHERE deleted_at IS NULL AND translation_group IS NOT NULL
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_updated_id`)}
			ON ${sql.ref(tableName)} (deleted_at, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_status`)}
			ON ${sql.ref(tableName)} (deleted_at, status)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_created_id`)}
			ON ${sql.ref(tableName)} (deleted_at, created_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_published_id`)}
			ON ${sql.ref(tableName)} (deleted_at, published_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_loc_upd`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_loc_crt`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, created_at DESC, id DESC)
		`.execute(conn);
	}
	getFieldIndexName(fieldId) {
		if (!FIELD_ID_PATTERN.test(fieldId)) throw new SchemaError(`Invalid field id "${fieldId}"`, "INVALID_FIELD_ID");
		return `idx_cf_${fieldId.toLowerCase()}`;
	}
	getLocaleFieldIndexName(fieldId) {
		return `${this.getFieldIndexName(fieldId)}_loc`;
	}
	async createFieldIndex(collectionSlug, fieldId, fieldSlug, db) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(collectionSlug);
		const columnName = this.getColumnName(fieldSlug);
		const indexName = this.getFieldIndexName(fieldId);
		const localeIndexName = this.getLocaleFieldIndexName(fieldId);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(indexName)}
			ON ${sql.ref(tableName)} (
				(${sql.ref(columnName)} IS NOT NULL),
				${sql.ref(columnName)},
				id
			)
			WHERE deleted_at IS NULL
		`.execute(conn);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(localeIndexName)}
			ON ${sql.ref(tableName)} (
				locale,
				(${sql.ref(columnName)} IS NOT NULL),
				${sql.ref(columnName)},
				id
			)
			WHERE deleted_at IS NULL
		`.execute(conn);
	}
	async dropFieldIndex(fieldId, db) {
		const conn = db ?? this.db;
		await sql`DROP INDEX IF EXISTS ${sql.ref(this.getFieldIndexName(fieldId))}`.execute(conn);
		await sql`DROP INDEX IF EXISTS ${sql.ref(this.getLocaleFieldIndexName(fieldId))}`.execute(conn);
	}
	/**
	* Add a column to a content table
	*/
	async addColumn(collectionSlug, fieldSlug, fieldType, options, db) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(collectionSlug);
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		const columnName = this.getColumnName(fieldSlug);
		if (fieldType === "blocks") await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT '[]'
			`.execute(conn);
		else if (options?.required && options?.defaultValue !== void 0) {
			const defaultVal = this.formatDefaultValue(options.defaultValue, fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else if (options?.required) {
			const defaultVal = this.getEmptyDefault(fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)}
			`.execute(conn);
	}
	/**
	* Drop a column from a content table
	*/
	async dropColumn(collectionSlug, fieldSlug, db) {
		const tableName = this.getTableName(collectionSlug);
		const columnName = this.getColumnName(fieldSlug);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN ${sql.ref(columnName)}
		`.execute(db ?? this.db);
	}
	/**
	* Check if a collection has any content
	*/
	async collectionHasContent(slug, db = this.db) {
		const tableName = this.getTableName(slug);
		try {
			return ((await sql`
				SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
				WHERE deleted_at IS NULL
			`.execute(db)).rows[0]?.count ?? 0) > 0;
		} catch {
			return false;
		}
	}
	async normalizeBlocksFieldValidation(collectionSlug, input, existing, db, checkContent = true) {
		if (input.required) throw new SchemaError("Blocks fields cannot be required", "VALIDATION_ERROR", { path: "required" });
		if (input.unique) throw new SchemaError("Blocks fields cannot be unique", "VALIDATION_ERROR", { path: "unique" });
		if (input.indexed) throw new SchemaError("Blocks fields cannot be indexed", "FIELD_NOT_INDEXABLE", { path: "indexed" });
		if (input.searchable) throw new SchemaError("Blocks fields cannot be searchable", "VALIDATION_ERROR", { path: "searchable" });
		if (input.widget !== void 0) throw new SchemaError("Blocks fields cannot use custom widgets", "VALIDATION_ERROR", { path: "widget" });
		if (input.options !== void 0) throw new SchemaError("Blocks fields do not accept widget options", "VALIDATION_ERROR", { path: "options" });
		if (input.defaultValue !== void 0 && (!Array.isArray(input.defaultValue) || input.defaultValue.length > 0)) throw new SchemaError("Blocks field defaults must be an empty array", "VALIDATION_ERROR", { path: "defaultValue" });
		const requested = input.validation ?? existing?.validation ?? {};
		const allowedTypes = requested.allowedTypes ?? [];
		if (!Array.isArray(allowedTypes) || allowedTypes.some((slug) => typeof slug !== "string")) throw new SchemaError("allowedTypes must be an array of block type slugs", "VALIDATION_ERROR", { path: "validation.allowedTypes" });
		if (new Set(allowedTypes).size !== allowedTypes.length) throw new SchemaError("allowedTypes must not contain duplicates", "VALIDATION_ERROR", { path: "validation.allowedTypes" });
		const previousAllowed = existing?.validation?.allowedTypes ?? [];
		const previousRetired = existing?.validation?.retiredTypes ?? [];
		const requestedRetired = existing ? previousRetired : requested.retiredTypes ?? [];
		if (!Array.isArray(requestedRetired) || requestedRetired.some((slug) => typeof slug !== "string")) throw new SchemaError("retiredTypes must be an array of block type slugs", "VALIDATION_ERROR", { path: "validation.retiredTypes" });
		const retiredTypes = [.../* @__PURE__ */ new Set([...requestedRetired, ...previousAllowed.filter((slug) => !allowedTypes.includes(slug))])].filter((slug) => !allowedTypes.includes(slug));
		const minItems = requested.minItems ?? 0;
		const maxItems = requested.maxItems ?? 100;
		if (!Number.isInteger(minItems) || minItems < 0) throw new SchemaError("minItems must be a non-negative integer", "VALIDATION_ERROR", { path: "validation.minItems" });
		if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 100) throw new SchemaError(`maxItems must be an integer between 1 and 100`, "VALIDATION_ERROR", { path: "validation.maxItems" });
		if (minItems > maxItems) throw new SchemaError("minItems cannot exceed maxItems", "VALIDATION_ERROR", { path: "validation.minItems" });
		const previousMin = existing?.validation?.minItems ?? 0;
		if (checkContent && minItems > previousMin && minItems > 0 && await this.collectionHasContent(collectionSlug, db)) throw new SchemaError("Raising minItems on a populated collection requires a content migration", "FIELD_UPDATE_REQUIRES_MIGRATION", { path: "validation.minItems" });
		const referenced = [.../* @__PURE__ */ new Set([...allowedTypes, ...retiredTypes])];
		if (referenced.length > 0) {
			const types = await db.selectFrom("_emdash_block_types").select([
				"id",
				"slug",
				"current_version"
			]).where("slug", "in", referenced).execute();
			const bySlug = new Map(types.map((type) => [type.slug, type]));
			for (const slug of referenced) if (!bySlug.has(slug)) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND", { slug });
			const allowedRows = allowedTypes.map((slug) => bySlug.get(slug));
			if (allowedRows.length > 0) {
				const activeVersions = await db.selectFrom("_emdash_block_type_versions").select(["block_type_id", "version"]).where("block_type_id", "in", allowedRows.map((type) => type.id)).execute();
				for (const type of allowedRows) if (!activeVersions.some((version) => version.block_type_id === type.id && version.version === type.current_version)) throw new SchemaError(`Block type "${type.slug}" has no active version ${type.current_version}`, "BLOCK_TYPE_VERSION_CONFLICT", {
					slug: type.slug,
					version: type.current_version
				});
			}
		}
		return {
			allowedTypes,
			retiredTypes,
			minItems,
			maxItems
		};
	}
	/**
	* Get table name for a collection
	*/
	getTableName(slug) {
		validateIdentifier(slug, "collection slug");
		return `ec_${slug}`;
	}
	/**
	* Get column name for a field
	*/
	getColumnName(slug) {
		validateIdentifier(slug, "field slug");
		return slug;
	}
	/**
	* Validate a slug
	*/
	validateSlug(slug, type) {
		if (!slug || typeof slug !== "string") throw new SchemaError(`${type} slug is required`, "INVALID_SLUG");
		if (!SCHEMA_SLUG_PATTERN.test(slug)) throw new SchemaError(`${type} slug must start with a letter and contain only lowercase letters, numbers, and underscores`, "INVALID_SLUG");
		if (slug.length > 63) throw new SchemaError(`${type} slug must be 63 characters or less`, "INVALID_SLUG");
	}
	validateUrlPattern(urlPattern) {
		if (!urlPattern) return;
		try {
			compileUrlPattern(urlPattern);
		} catch (error) {
			throw new SchemaError(error instanceof Error ? error.message : "Invalid URL pattern", "INVALID_URL_PATTERN");
		}
	}
	/**
	* Format a default value for SQL.
	*
	* SQLite `ALTER TABLE ADD COLUMN ... DEFAULT` requires a literal constant
	* expression — parameterized values cannot be used here. We manually escape
	* single quotes and coerce types to ensure the output is safe.
	*
	* INTEGER/REAL values are coerced through `Number()` which can only produce
	* digits, `.`, `-`, `e`, `Infinity`, or `NaN` — all safe in SQL.
	* TEXT/JSON values have single quotes escaped via SQL standard doubling (`''`).
	*/
	formatDefaultValue(value, fieldType) {
		if (value === null || value === void 0) return "NULL";
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		if (columnType === "JSON") return `'${JSON.stringify(value).replace(SINGLE_QUOTE_PATTERN, "''")}'`;
		if (columnType === "INTEGER") {
			if (typeof value === "boolean") return value ? "1" : "0";
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(Math.trunc(num));
		}
		if (columnType === "REAL") {
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(num);
		}
		let text;
		if (typeof value === "string") text = value;
		else if (typeof value === "number" || typeof value === "boolean") text = String(value);
		else if (typeof value === "object" && value !== null) text = JSON.stringify(value);
		else text = "";
		return `'${text.replace(SINGLE_QUOTE_PATTERN, "''")}'`;
	}
	/**
	* Get empty default for a field type
	*/
	getEmptyDefault(fieldType) {
		if (fieldType === "blocks") return "'[]'";
		switch (FIELD_TYPE_TO_COLUMN[fieldType]) {
			case "INTEGER": return "0";
			case "REAL": return "0.0";
			case "JSON": return "'null'";
			default: return "''";
		}
	}
	/**
	* Map a collection row to a Collection object
	*/
	mapCollectionRow = (row) => {
		const moderation = row.comments_moderation;
		return {
			id: row.id,
			slug: row.slug,
			label: row.label,
			labelSingular: row.label_singular ?? void 0,
			description: row.description ?? void 0,
			icon: row.icon ?? void 0,
			admin: parseCollectionAdmin(row.admin_config),
			supports: parseSupports(row.supports),
			source: row.source && isCollectionSource(row.source) ? row.source : void 0,
			hasSeo: row.has_seo === 1,
			titleField: row.title_field ?? void 0,
			dateField: row.date_field ?? void 0,
			urlPattern: row.url_pattern ?? void 0,
			routable: row.routable !== 0,
			hidden: row.hidden === 1,
			sortOrder: row.sort_order ?? void 0,
			group: row.nav_group ?? void 0,
			commentsEnabled: row.comments_enabled === 1,
			commentsModeration: moderation === "all" || moderation === "first_time" || moderation === "none" ? moderation : "first_time",
			commentsClosedAfterDays: row.comments_closed_after_days ?? 90,
			commentsAutoApproveUsers: row.comments_auto_approve_users === 1,
			editLocking: row.edit_locking !== 0,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	};
	/**
	* Map a field row to a Field object
	*/
	mapFieldRow = (row) => {
		const validation = row.validation ? JSON.parse(row.validation) : void 0;
		const unsupportedType = isFieldType(row.type) ? row.type === "repeater" ? findUnsupportedRepeaterSubFieldType(validation) : void 0 : {
			type: row.type,
			path: "type"
		};
		return {
			id: row.id,
			collectionId: row.collection_id,
			slug: row.slug,
			label: row.label,
			type: isFieldType(row.type) ? row.type : "string",
			unsupportedType,
			columnType: isColumnType(row.column_type) ? row.column_type : "TEXT",
			required: row.required === 1,
			unique: row.unique === 1,
			defaultValue: row.default_value ? JSON.parse(row.default_value) : void 0,
			validation,
			widget: row.widget ?? void 0,
			options: row.options ? JSON.parse(row.options) : void 0,
			sortOrder: row.sort_order,
			searchable: row.searchable === 1,
			indexed: row.indexed === 1,
			translatable: row.translatable !== 0,
			createdAt: row.created_at
		};
	};
	/**
	* Discover orphaned content tables
	*
	* Finds ec_* tables that exist in the database but don't have a
	* corresponding entry in _emdash_collections.
	*/
	async discoverOrphanedTables() {
		const allTables = await listTablesLike(this.db, "ec_%");
		const registered = await this.listCollections();
		const registeredSlugs = new Set(registered.map((c) => c.slug));
		const orphans = [];
		for (const tableName of allTables) {
			const slug = tableName.replace(EC_PREFIX_PATTERN, "");
			if (!registeredSlugs.has(slug)) try {
				const countResult = await sql`
						SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
						WHERE deleted_at IS NULL
					`.execute(this.db);
				orphans.push({
					slug,
					tableName,
					rowCount: countResult.rows[0]?.count ?? 0
				});
			} catch {
				orphans.push({
					slug,
					tableName,
					rowCount: 0
				});
			}
		}
		return orphans;
	}
	/**
	* Register an orphaned table as a collection
	*
	* Creates a _emdash_collections entry for an existing ec_* table.
	*/
	async registerOrphanedTable(slug, options) {
		const tableName = this.getTableName(slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, slug)) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		if (!await tableExists(this.db, tableName)) throw new SchemaError(`Table "${tableName}" does not exist`, "TABLE_NOT_FOUND");
		const existing = await this.getCollection(slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, slug)) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug
		})) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		const proposedId = existing?.id ?? ulid();
		const label = options?.label || this.slugToLabel(slug);
		let collectionRegistered = false;
		try {
			const capture = await prepareMediaUsageCollectionCapture(this.db, {
				collectionId: proposedId,
				collectionSlug: slug,
				registeredCollectionId: existing?.id
			});
			if (capture.captureRequired) {
				await installPreparedMediaUsageCollectionCapture(this.db, {
					collectionId: capture.collectionId,
					collectionSlug: slug
				});
				await markMediaUsageCollectionCaptureReady(this.db, {
					collectionId: capture.collectionId,
					collectionSlug: slug
				});
			}
			if (!capture.registrationExists) {
				await this.db.insertInto("_emdash_collections").values({
					id: capture.collectionId,
					slug,
					label,
					label_singular: options?.labelSingular ?? null,
					description: options?.description ?? null,
					icon: null,
					supports: JSON.stringify([]),
					source: "discovered",
					has_seo: 0,
					url_pattern: null
				}).execute();
				collectionRegistered = true;
			}
			if (capture.captureRequired) await finalizeMediaUsageCollectionCapture(this.db, {
				collectionId: capture.collectionId,
				collectionSlug: slug
			});
			const collection = await this.getCollection(slug);
			if (!collection) throw new SchemaError("Failed to register orphaned table", "REGISTER_FAILED");
			await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			this.notifyTypegen();
			return collection;
		} catch (error) {
			if (collectionRegistered) await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Convert slug to human-readable label
	*/
	slugToLabel(slug) {
		return slug.replace(UNDERSCORE_PATTERN, " ").replace(WORD_BOUNDARY_PATTERN, (c) => c.toUpperCase());
	}
};
// node_modules/emdash/src/schema/query.ts
/**
* Get collection metadata with an explicit db handle.
*
* @internal Use `getCollectionInfo()` in templates. This variant is for
* routes that already have a database handle.
*/
async function getCollectionInfoWithDb(db, slug) {
	return new SchemaRegistry(db).getCollection(slug);
}
// node_modules/emdash/src/seo/hreflang.ts
var TRAILING_SLASH_RE = /\/$/;
var ABSOLUTE_URL_RE = /^https?:\/\//i;
/**
* IDs of variants flagged `noindex` in the SEO panel. Entries without
* an `_emdash_seo` row are indexable by default (same as the sitemap).
* The id list is bounded by the number of configured locales, so no
* chunking is needed.
*/
async function findNoindexIds(db, collection, ids) {
	if (ids.length === 0) return /* @__PURE__ */ new Set();
	const rows = await db.selectFrom("_emdash_seo").select("content_id").where("collection", "=", collection).where("content_id", "in", ids).where("seo_no_index", "=", 1).execute();
	return new Set(rows.map((r) => r.content_id));
}
/**
* Resolve hreflang alternates for a content entry.
*
* @example
* ```astro
* ---
* import { getHreflangAlternates } from "emdash";
*
* const alternates = await getHreflangAlternates("posts", entry.data.id, {
*   siteUrl: Astro.url.origin,
* });
* ---
* <head>
*   {alternates.map((a) => <link rel="alternate" hreflang={a.hreflang} href={a.href} />)}
* </head>
* ```
*/
async function getHreflangAlternates(collection, entryId, options = {}) {
	if (!isI18nEnabled()) return [];
	const key = `hreflang:${collection}:${entryId}:${options.siteUrl ?? ""}:${options.trailingSlash ?? "ignore"}`;
	return requestCached(key, async () => {
		const { getDb } = await import("./loader_BqUkLm2j.mjs");
		return getHreflangAlternatesWithDb(await getDb(), collection, entryId, options);
	});
}
/**
* Resolve hreflang alternates with an explicit db handle.
*
* @internal Use `getHreflangAlternates()` in templates. This variant is
* for routes/components that already have a database handle.
*/
async function getHreflangAlternatesWithDb(db, collection, entryId, options = {}) {
	if (!isI18nEnabled()) return [];
	let siteUrl = options.siteUrl;
	if (!siteUrl) siteUrl = (await getSiteSettingsWithDb(db)).url;
	if (!siteUrl || !ABSOLUTE_URL_RE.test(siteUrl)) return [];
	siteUrl = siteUrl.replace(TRAILING_SLASH_RE, "");
	const repo = new ContentRepository(db);
	const item = await repo.findByIdOrSlug(collection, entryId);
	if (!item) return [];
	const group = item.translationGroup || item.id;
	let variants = await repo.findTranslations(collection, group);
	if (variants.length === 0) variants = [item];
	let published = variants.filter((v) => v.status === "published");
	if (published.length === 0) return [];
	const noindexIds = await findNoindexIds(db, collection, published.map((v) => v.id));
	if (noindexIds.has(item.id)) return [];
	published = published.filter((v) => !noindexIds.has(v.id));
	const urlPattern = (await getCollectionInfoWithDb(db, collection))?.urlPattern ?? null;
	const resolved = [];
	for (const variant of published) {
		const locale = variant.locale || "en";
		const path = await resolveLocalizedContentRoutePath({
			pattern: urlPattern,
			collection,
			slug: variant.slug || variant.id,
			id: variant.id,
			date: variant.publishedAt,
			locale,
			trailingSlash: options.trailingSlash
		});
		if (path === null) continue;
		resolved.push({
			locale,
			href: `${siteUrl}${path}`
		});
	}
	if (resolved.length === 0) return [];
	resolved.sort((a, b) => a.locale.localeCompare(b.locale));
	const alternates = resolved.map((r) => ({
		hreflang: r.locale,
		href: r.href
	}));
	const defaultLocale = getI18nConfig()?.defaultLocale;
	const xDefault = resolved.find((r) => r.locale === defaultLocale) ?? resolved[0];
	if (xDefault) alternates.push({
		hreflang: "x-default",
		href: xDefault.href
	});
	return alternates;
}
// node_modules/emdash/src/components/EmDashHead.astro
createAstro("https://astro.build");
var $$EmDashHead = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashHead;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let metadataHtml = "";
	let siteIdentityHtml = "";
	let fragmentsHtml = "";
	let jsonLdScripts = [];
	if (runtime) {
		const siteSettings = await getSiteSettings();
		const siteUrl = page.siteUrl || siteSettings.url || (URL.canParse(page.url) ? new URL(page.url).origin : "");
		const resolvedPage = await resolveSeoPanelPage(page, siteUrl);
		const [pluginContributions, fragments] = await Promise.all([runtime.collectPageMetadata(resolvedPage), runtime.collectPageFragments(resolvedPage)]);
		const baseContributions = generateBaseSeoContributions(resolvedPage, absolutizeMediaUrl(siteSettings.seo?.defaultOgImage?.url, siteSettings.url, resolvedPage));
		let hreflangContributions = [];
		if (page.content && isI18nEnabled()) hreflangContributions = (await getHreflangAlternates(page.content.collection, page.content.id, {
			siteUrl,
			trailingSlash: config_default?.trailingSlash
		})).map((a) => ({
			kind: "link",
			rel: "alternate",
			href: a.href,
			hreflang: a.hreflang
		}));
		const siteContributions = generateSiteSeoContributions(siteSettings.seo);
		const resolved = resolvePageMetadata([
			...pluginContributions,
			...siteContributions,
			...baseContributions,
			...hreflangContributions
		]);
		jsonLdScripts = resolved.jsonld;
		metadataHtml = renderPageMetadata(resolved, { includeJsonLd: false });
		siteIdentityHtml = renderSiteIdentity({ favicon: siteSettings.favicon });
		fragmentsHtml = renderFragments(fragments, "head");
	} else {
		const resolved = resolvePageMetadata(generateBaseSeoContributions(page));
		jsonLdScripts = resolved.jsonld;
		metadataHtml = renderPageMetadata(resolved, { includeJsonLd: false });
	}
	await registerJsonLdCspHashes(config_default.astroCspEnabled === true, () => Astro.csp, jsonLdScripts);
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(metadataHtml)}` })}${jsonLdScripts.map(({ json }) => renderTemplate`${renderComponent($$result, "JsonLdScript", $$JsonLdScript, { "json": json })}`)}${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(siteIdentityHtml)}` })}${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(fragmentsHtml)}` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/EmDashHead.astro", void 0);
// node_modules/emdash/src/components/EmDashBodyStart.astro
createAstro("https://astro.build");
var $$EmDashBodyStart = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashBodyStart;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let html = "";
	if (runtime) html = renderFragments(await runtime.collectPageFragments(await resolveSeoPanelPage(page)), "body:start");
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/EmDashBodyStart.astro", void 0);
// node_modules/emdash/src/components/EmDashBodyEnd.astro
createAstro("https://astro.build");
var $$EmDashBodyEnd = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EmDashBodyEnd;
	const { page } = Astro.props;
	const runtime = getPageRuntime(Astro.locals);
	let html = "";
	if (runtime) html = renderFragments(await runtime.collectPageFragments(await resolveSeoPanelPage(page)), "body:end");
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/Users/cjdunteman/repos/three-story-studio/node_modules/emdash/src/components/EmDashBodyEnd.astro", void 0);
// src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-gradient-to-b from-taupe-light to-taupe px-8 py-12"><div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8"><div><img src="/3SS_logo_transparent.png" alt="Three Story Studio Logo" width="200" height="60" class="mb-4"></div><div><h2 class="text-2xl md:text-3xl font-bold mb-4">Quick Links</h2><ul class="space-y-3">${[
		{
			href: "/",
			label: "Home"
		},
		{
			href: "/gallery",
			label: "Gallery"
		},
		{
			href: "/about",
			label: "About"
		}
	].map((link) => renderTemplate`<li><a${addAttribute(link.href, "href")} class="text-xl md:text-2xl hover:text-gray-700">${link.label}</a></li>`)}</ul></div><div><h2 class="text-2xl md:text-3xl font-bold mb-4">Contact</h2><p class="text-xl md:text-2xl mb-4">Reach out directly to discuss your upholstery project with me!</p><div class="mt-6"><a href="mailto:kristin@threestorystudio.com" class="bg-sage hover:bg-sage-dark text-gray-800 px-4 py-3 rounded transition-colors text-xl md:text-2xl">Send an Email</a></div><div class="flex space-x-4 mt-8">${[
		{
			href: "https://www.linkedin.com/in/kristin-dunteman-1197aa72/",
			src: "/icons/linkedin.svg",
			alt: "LinkedIn"
		},
		{
			href: "https://www.instagram.com/threestorystudio/",
			src: "/icons/instagram.svg",
			alt: "instagram"
		},
		{
			href: "https://www.facebook.com/3storystudiollc",
			src: "/icons/facebook.svg",
			alt: "facebook"
		}
	].map((item) => renderTemplate`<a${addAttribute(item.href, "href")} target="_blank" rel="noopener noreferrer"><img${addAttribute(item.src, "src")} height="32" width="32"${addAttribute(item.alt, "alt")}></a>`)}</div></div></div><hr class="my-8 border-gray-300"><div class="text-center mt-8 text-gray-600"><p class="text-lg md:text-xl">&copy; ${year} Three Story Studio. All rights reserved.</p></div></footer>`;
}, "/Users/cjdunteman/repos/three-story-studio/src/components/Footer.astro", void 0);
// src/components/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const links = [
		{
			href: "/",
			label: "Home"
		},
		{
			href: "/gallery",
			label: "Gallery"
		},
		{
			href: "/about",
			label: "About"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<header><nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"><div class="flex lg:flex-1"><a href="/" class="-m-1.5 p-1.5"><img src="/3SS_logo_transparent.png" alt="Three Story Studio Logo" width="142" height="124"></a></div><div class="flex lg:hidden"><button type="button" command="show-modal" commandfor="mobile-nav" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"><span class="sr-only">Open main menu</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></button></div><div class="hidden lg:flex lg:gap-x-12"><div class="text-3xl">${links.map((link, index) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([index < links.length - 1 && "pr-4 border-r mr-4 border-black"], "class:list")}>${link.label}</a>`)}</div></div><div class="hidden lg:flex lg:flex-1 lg:justify-end"><a href="mailto:kristin@threestorystudio.com" class="py-2 px-4 rounded text-3xl bg-sage">Inquire</a></div></nav><dialog id="mobile-nav" class="lg:hidden" aria-labelledby="mobile-nav-title" closedby="any"><h2 id="mobile-nav-title" class="sr-only">Menu</h2><div class="flex flex-row-reverse"><button type="button" command="close" commandfor="mobile-nav" class="-m-2.5 rounded-md p-2.5 text-gray-700"><span class="sr-only">Close menu</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></button></div><div class="flex flex-col gap-8">${links.map((link) => renderTemplate`<a class="text-2xl font-bold"${addAttribute(link.href, "href")}>${link.label}</a>`)}<a href="mailto:kristin@threestorystudio.com" class="border-2 py-2 px-2 rounded text-3xl border-light-beige w-fit">Inquire</a></div></dialog></header>${renderScript($$result, "/Users/cjdunteman/repos/three-story-studio/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/cjdunteman/repos/three-story-studio/src/components/Header.astro", void 0);
// src/layouts/Base.astro
createAstro("https://astro.build");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const { title = "Three Story Studio", description = "Custom upholstery and soft goods for your home." } = Astro.props;
	const page = createPublicPageContext({
		Astro,
		kind: "custom",
		pageType: "website",
		title,
		description
	});
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon" href="/favicon.png">${renderComponent($$result, "EmDashHead", $$EmDashHead, { "page": page })}${renderHead($$result)}</head><body>${renderComponent($$result, "EmDashBodyStart", $$EmDashBodyStart, { "page": page })}<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">Skip to content</a>${renderComponent($$result, "Header", $$Header, {})}<div id="main">${renderSlot($$result, $$slots["default"])}</div>${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "EmDashBodyEnd", $$EmDashBodyEnd, { "page": page })}</body></html>`;
}, "/Users/cjdunteman/repos/three-story-studio/src/layouts/Base.astro", void 0);
export { $$EmDashImage as n, $$Base as t };
