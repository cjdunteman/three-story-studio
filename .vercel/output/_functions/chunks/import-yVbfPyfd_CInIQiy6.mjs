import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { d as invalidateMenuObjectCache, u as invalidateCommentObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import { s as invalidateSiteSettingsCache } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as ssrfSafeFetch, r as resolveAndValidateExternalUrl, s as validateExternalUrl } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { o as RESERVED_COLLECTION_SLUGS, s as RESERVED_FIELD_SLUGS } from "./types-C_asjp1J_CfydHSXi.mjs";
import { ulid } from "ulidx";
import mime from "mime/lite";
import sax from "sax";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
// node_modules/emdash/dist/utils-D5uOi6WS.mjs
/** Internal WordPress post types that should be excluded from import */
var INTERNAL_POST_TYPES = [
	"revision",
	"nav_menu_item",
	"custom_css",
	"customize_changeset",
	"oembed_cache",
	"wp_global_styles",
	"wp_navigation",
	"wp_template",
	"wp_template_part",
	"attachment",
	"wp_block",
	"acf-field-group",
	"acf-field",
	"acf-post-type",
	"acf-taxonomy",
	"acf-ui-options-page"
];
/** Internal meta key prefixes to filter out */
var INTERNAL_META_PREFIXES = ["_edit_", "_wp_"];
var NUMERIC_PATTERN = /^-?\d+(\.\d+)?$/;
var TRAILING_SLASHES$1 = /\/+$/;
var WP_JSON_SUFFIX$1 = /\/wp-json\/?.*$/;
/** Specific internal meta keys */
var INTERNAL_META_KEYS = [
	"_edit_last",
	"_edit_lock",
	"_pingme",
	"_encloseme"
];
/** Base fields required for any WordPress import */
var BASE_REQUIRED_FIELDS = [
	{
		slug: "title",
		label: "Title",
		type: "string",
		required: true,
		searchable: true
	},
	{
		slug: "content",
		label: "Content",
		type: "portableText",
		required: false,
		searchable: true
	},
	{
		slug: "excerpt",
		label: "Excerpt",
		type: "text",
		required: false
	}
];
/** Featured image field - only added to post types that have _thumbnail_id */
var FEATURED_IMAGE_FIELD = {
	slug: "featured_image",
	label: "Featured Image",
	type: "image",
	required: false
};
/**
* Check if a post type is internal/should be excluded
*/
function isInternalPostType(type) {
	return INTERNAL_POST_TYPES.includes(type);
}
/**
* Check if a meta key is internal/should be filtered out
*/
function isInternalMetaKey(key) {
	if (INTERNAL_META_KEYS.includes(key)) return true;
	for (const prefix of INTERNAL_META_PREFIXES) if (key.startsWith(prefix)) return true;
	if (key === "_thumbnail_id") return false;
	if (key.startsWith("_yoast_")) return false;
	if (key.startsWith("_rank_math_")) return false;
	if (key.startsWith("_")) return true;
	return false;
}
/**
* Map WordPress status to normalized status
*/
function mapWpStatus(status) {
	switch (status) {
		case "publish": return "publish";
		case "draft": return "draft";
		case "pending": return "pending";
		case "private": return "private";
		case "future": return "future";
		default: return "draft";
	}
}
/** Default mappings from WordPress post types to EmDash collections */
var POST_TYPE_TO_COLLECTION = {
	post: "posts",
	page: "pages",
	attachment: "media",
	product: "products",
	portfolio: "portfolio",
	testimonial: "testimonials",
	team: "team",
	event: "events",
	faq: "faqs"
};
var INVALID_COLLECTION_SLUG_CHARS = /[^a-z0-9_]/g;
/** Turn a WordPress post type name into a valid, non-reserved collection slug. */
function sanitizeCollectionSlug(slug) {
	const sanitized = slug.toLowerCase().replace(INVALID_COLLECTION_SLUG_CHARS, "_").replace(LEADING_NON_ALPHA_CHARS, "");
	if (!sanitized) return "imported";
	if (RESERVED_COLLECTION_SLUGS.includes(sanitized)) return `wp_${sanitized}`;
	return sanitized;
}
/**
* Map WordPress post type to EmDash collection name
*/
function mapPostTypeToCollection(postType) {
	return POST_TYPE_TO_COLLECTION[postType] || sanitizeCollectionSlug(postType);
}
/**
* Map WordPress meta key to EmDash field slug
*/
function mapMetaKeyToField(key) {
	if (key === "_yoast_wpseo_title") return "seo_title";
	if (key === "_yoast_wpseo_metadesc") return "seo_description";
	if (key === "_rank_math_title") return "seo_title";
	if (key === "_rank_math_description") return "seo_description";
	if (key === "_thumbnail_id") return "featured_image";
	if (key.startsWith("_")) return key.slice(1);
	return key;
}
/**
* Infer field type from meta key name and sample value
*/
function inferMetaType(key, value) {
	if (key.endsWith("_id") || key === "_thumbnail_id") return "string";
	if (key.endsWith("_date") || key.endsWith("_time")) return "date";
	if (key.endsWith("_count") || key.endsWith("_number")) return "number";
	if (!value) return "string";
	if (value.startsWith("a:") || value.startsWith("{") || value.startsWith("[")) return "json";
	if (NUMERIC_PATTERN.test(value)) return "number";
	if ([
		"0",
		"1",
		"true",
		"false"
	].includes(value)) return "boolean";
	return "string";
}
/**
* Meta prefixes written by well-known WordPress plugins as operational
* bookkeeping (sync state, counters, cache keys) — not content. Without
* this filter, a mature site's analysis suggests dozens of junk fields
* per post type and the real content fields drown in them.
*
* ponytail: curated list of the plugins we've seen in the wild, not a
* taxonomy of the WP ecosystem. Unknown plugins' meta still gets through;
* extend the list as real sites surface new offenders.
*/
var PLUGIN_META_PREFIXES = [
	"aawp_",
	"algolia_",
	"amazon_polly_",
	"ampforwp_",
	"classifai_",
	"essb_",
	"eg_",
	"gnpub_",
	"jetpack_",
	"mashsb_",
	"monsterinsights_",
	"onesignal_",
	"penci_",
	"perfmatters_",
	"pys_",
	"rank_math_",
	"rp4wp_",
	"saswp_",
	"sbg_",
	"snap_",
	"spay_",
	"tie_",
	"wl_",
	"wpil_",
	"wprm_",
	"wpswa_",
	"wpuf_",
	"yarpp_"
];
/** Exact meta keys that are plugin/core bookkeeping, not content. */
var PLUGIN_META_KEYS = /* @__PURE__ */ new Set([
	"entity_same_as",
	"exclude_from_search",
	"footnotes",
	"inline_featured_image",
	"os_meta",
	"thirstydata"
]);
/**
* Check whether a meta key is well-known plugin bookkeeping that should
* not become a content field. Hyphens are normalized to underscores
* before matching (e.g. `ampforwp-amp-on-off`).
*/
function isPluginBookkeepingMeta(key) {
	const normalized = key.replaceAll("-", "_");
	if (PLUGIN_META_KEYS.has(normalized)) return true;
	return PLUGIN_META_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}
var INVALID_FIELD_SLUG_CHARS = /[^a-z0-9_]+/g;
var LEADING_NON_ALPHA_CHARS = /^[^a-z]+/;
/**
* Sanitize a WordPress meta/ACF key into a valid EmDash field slug
* (`/^[a-z][a-z0-9_]*$/`, max 63 chars, not reserved).
*
* Must be applied consistently on both sides of an import: once when
* creating fields from the analysis, and again when matching incoming
* meta keys onto schema fields — otherwise keys like `my-field` create
* `my_field` but never receive values.
*/
function sanitizeFieldSlug(key) {
	const sanitized = key.toLowerCase().replace(INVALID_FIELD_SLUG_CHARS, "_").replace(LEADING_NON_ALPHA_CHARS, "").slice(0, 63);
	if (!sanitized) return "field";
	if (RESERVED_FIELD_SLUGS.includes(sanitized)) return `wp_${sanitized}`;
	return sanitized;
}
var REGEX_SPECIALS = /[.*+?^${}()|[\]\\]/g;
var LEADING_WWW = /^www\./;
/**
* Turn an absolute URL into a root-relative one when it points at the
* source site (www-insensitive). Returns null when the URL should be
* left alone: external links, non-http(s) schemes, and `/wp-content/`
* media files — those stay absolute so the later media pass can match
* them against its old-URL -> new-URL map.
*/
function relativizeUrl(url, sourceHost) {
	if (!url.startsWith("http://") && !url.startsWith("https://")) return null;
	try {
		const parsed = new URL(url);
		if (parsed.hostname.replace(LEADING_WWW, "") !== sourceHost) return null;
		if (parsed.pathname.startsWith("/wp-content/")) return null;
		return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
	} catch {
		return null;
	}
}
function relativizeMarkDefs(markDefs, sourceHost) {
	for (const def of markDefs ?? []) if (def._type === "link" && typeof def.href === "string") def.href = relativizeUrl(def.href, sourceHost) ?? def.href;
}
/**
* Rewrite internal links in imported content to root-relative URLs, in
* place. Without this, imported posts keep linking back to the old
* WordPress domain (e.g. `https://oldsite.com/companies/google/`)
* instead of staying on the new site.
*
* ponytail: path structures are kept as-is (WP permalink /2024/05/slug/
* stays /2024/05/slug/) — mapping old paths onto the new site's routes
* is the planned permalink->redirect-map feature.
*/
function relativizeContentLinks(blocks, siteUrl) {
	let sourceHost;
	try {
		sourceHost = new URL(siteUrl).hostname.replace(LEADING_WWW, "");
	} catch {
		return;
	}
	const hrefPattern = new RegExp(`href=(["']?)https?://(?:www\\.)?${sourceHost.replace(REGEX_SPECIALS, "\\$&")}(/[^"'\\s>]*)?\\1`, "gi");
	for (const block of blocks) switch (block._type) {
		case "block":
			relativizeMarkDefs(block.markDefs, sourceHost);
			break;
		case "image":
			if (typeof block.link === "string") block.link = relativizeUrl(block.link, sourceHost) ?? block.link;
			else if (block.link?.href) block.link = {
				...block.link,
				href: relativizeUrl(block.link.href, sourceHost) ?? block.link.href
			};
			break;
		case "table":
			for (const row of block.rows) for (const cell of row.cells) relativizeMarkDefs(cell.markDefs, sourceHost);
			break;
		case "columns":
			for (const column of block.columns) relativizeContentLinks(column.content, siteUrl);
			break;
		case "cover":
			relativizeContentLinks(block.content, siteUrl);
			break;
		case "button":
			if (block.url) block.url = relativizeUrl(block.url, sourceHost) ?? block.url;
			break;
		case "buttons":
			for (const button of block.buttons) if (button.url) button.url = relativizeUrl(button.url, sourceHost) ?? button.url;
			break;
		case "htmlBlock": block.html = block.html.replace(hrefPattern, (match, _quote, path) => path?.startsWith("/wp-content/") ? match : `href="${path || "/"}"`);
	}
}
/**
* Normalize URL for API requests
*/
function normalizeUrl$1(url) {
	let normalized = url.trim();
	if (!normalized.startsWith("http")) normalized = `https://${normalized}`;
	normalized = normalized.replace(TRAILING_SLASHES$1, "");
	normalized = normalized.replace(WP_JSON_SUFFIX$1, "");
	return normalized;
}
/**
* Extract filename from URL
*/
function getFilenameFromUrl(url) {
	try {
		return new URL(url).pathname.split("/").filter(Boolean).pop();
	} catch {
		return;
	}
}
/**
* Guess MIME type from filename
*/
function guessMimeType(filename) {
	return mime.getType(filename) ?? void 0;
}
/**
* Build a map of attachment IDs to URLs for resolving featured images
*/
function buildAttachmentMap(attachments) {
	const map = /* @__PURE__ */ new Map();
	for (const att of attachments) if (att.id && att.url) map.set(String(att.id), att.url);
	return map;
}
/**
* Check if two field types are compatible for import
*/
function isTypeCompatible(requiredType, existingType) {
	if (requiredType === existingType) return true;
	return {
		string: [
			"string",
			"text",
			"slug"
		],
		text: ["string", "text"],
		portableText: ["portableText", "json"],
		number: ["number", "integer"],
		integer: ["number", "integer"]
	}[requiredType]?.includes(existingType) ?? false;
}
var MAX_SLUG_COLLISION_ATTEMPTS = 1e3;
/**
* Find or create a unique byline slug, capped at MAX_SLUG_COLLISION_ATTEMPTS.
*/
async function ensureUniqueBylineSlug(bylineRepo, baseSlug) {
	let candidate = baseSlug;
	let suffix = 2;
	while (await bylineRepo.findBySlug(candidate)) {
		if (suffix > MAX_SLUG_COLLISION_ATTEMPTS) throw new Error(`Byline slug collision limit exceeded for base slug "${baseSlug}". Tried ${MAX_SLUG_COLLISION_ATTEMPTS} variants.`);
		candidate = `${baseSlug}-${suffix}`;
		suffix++;
	}
	return candidate;
}
/**
* Resolve (find-or-create) a byline for an imported WordPress author.
* Caches results in `cache` keyed by `authorLogin:mappedUserId`.
*/
async function resolveImportByline(authorLogin, displayName, mappedUserId, bylineRepo, cache) {
	if (!authorLogin) return void 0;
	const cacheKey = `${authorLogin}:${mappedUserId ?? ""}`;
	const cached = cache.get(cacheKey);
	if (cached) return cached;
	if (mappedUserId) {
		const existingForUser = await bylineRepo.findByUserId(mappedUserId);
		if (existingForUser) {
			cache.set(cacheKey, existingForUser.id);
			return existingForUser.id;
		}
	}
	const name = displayName || authorLogin;
	const slug = await ensureUniqueBylineSlug(bylineRepo, slugify(authorLogin) || "author");
	const created = await bylineRepo.create({
		slug,
		displayName: name,
		userId: mappedUserId ?? null,
		isGuest: !mappedUserId
	});
	cache.set(cacheKey, created.id);
	return created.id;
}
/**
* Check schema compatibility between required fields and existing collection
*/
function checkSchemaCompatibility(requiredFields, existingCollection) {
	if (!existingCollection) {
		const fieldStatus = {};
		for (const field of requiredFields) fieldStatus[field.slug] = {
			status: "missing",
			requiredType: field.type
		};
		return {
			exists: false,
			fieldStatus,
			canImport: true
		};
	}
	const fieldStatus = {};
	const incompatibleFields = [];
	for (const field of requiredFields) {
		const existingField = existingCollection.fields.get(field.slug);
		if (!existingField) fieldStatus[field.slug] = {
			status: "missing",
			requiredType: field.type
		};
		else if (isTypeCompatible(field.type, existingField.type)) fieldStatus[field.slug] = {
			status: "compatible",
			existingType: existingField.type,
			requiredType: field.type
		};
		else {
			fieldStatus[field.slug] = {
				status: "type_mismatch",
				existingType: existingField.type,
				requiredType: field.type
			};
			incompatibleFields.push(field.slug);
		}
	}
	const canImport = incompatibleFields.length === 0;
	return {
		exists: true,
		fieldStatus,
		canImport,
		reason: canImport ? void 0 : `Incompatible field types: ${incompatibleFields.join(", ")}`
	};
}
// node_modules/emdash/dist/import-yVbfPyfd.mjs
var PHP_SERIALIZED_STRING_PATTERN = /s:\d+:"([^"]+)"/g;
var PHP_SERIALIZED_STRING_MATCH_PATTERN = /s:\d+:"([^"]+)"/;
/**
* WPML stores per-post language in postmeta as `_icl_lang_code`. The shared
* translation id is `trid` (this is the group ID -- every translation of the
* same content shares it). `_icl_translation_id` exists on some exports too
* but is a per-translation row id from `wp_icl_translations`, NOT the group
* id, so it must NOT be used as the group key. We accept it only when `trid`
* is absent and trust the export to be internally consistent (the only case
* where that's reasonable is single-post exports with no real grouping).
*
* See `wpml_element_trid` in the WPML hook docs: "the ID of the translation
* group".
*/
var WPML_LOCALE_META_KEYS = ["_icl_lang_code"];
var WPML_TRID_META_KEYS = ["trid", "_icl_translation_id"];
/**
* Polylang stores per-post language in postmeta as `_locale` on newer
* exports. The actual language taxonomy assignment lives on
* `customTaxonomies.language`, which we use as a fallback. Translation
* grouping is encoded in `_translations` as a serialized PHP map of
* `{ lang_code => post_id }`; we synthesize a stable group key from the
* sorted IDs so every member of the group resolves to the same string.
*/
var POLYLANG_LOCALE_META_KEY = "_locale";
var POLYLANG_TRANSLATIONS_META_KEY = "_translations";
var POLYLANG_LANG_TAXONOMY = "language";
/**
* Extract a list of post-IDs from Polylang's `_translations` PHP-serialized
* value. The format we care about is roughly:
*
*   a:2:{s:2:"en";i:1;s:2:"ar";i:7;}
*
* We don't need to round-trip the PHP value -- we just need a stable group
* key shared by every translation of the same content. Concatenating the
* sorted IDs gives us exactly that: every post in the group derives the
* same key from its own copy of `_translations`.
*
* Naïve `/i:(\d+);/g` would also match `i:N;` literals embedded INSIDE
* string values (e.g. `s:11:"i:42;hello";`), which would silently corrupt
* the group key. We walk the serialized blob token-by-token instead.
*
* PHP serializes `s:LEN:"..."` with LEN counted in BYTES, not characters
* (UTF-8 byte length). JS string positions are UTF-16 code units, so we
* encode to bytes via `TextEncoder` and walk byte offsets. Single-byte-only
* inputs (the common case for Polylang's `_translations` which only stores
* ASCII locale codes) take the same path; the encoder is cheap.
*/
function polylangTranslationGroupFromMeta(serialized) {
	const bytes = new TextEncoder().encode(serialized);
	const decoder = new TextDecoder("utf-8");
	const ids = [];
	let i = 0;
	const n = bytes.length;
	const CHAR_S = 115;
	const CHAR_I = 105;
	const CHAR_COLON = 58;
	const CHAR_SEMI = 59;
	const CHAR_QUOTE = 34;
	const indexOf = (byte, from) => {
		for (let k = from; k < n; k++) if (bytes[k] === byte) return k;
		return -1;
	};
	while (i < n) {
		const ch = bytes[i];
		if (ch === CHAR_S && bytes[i + 1] === CHAR_COLON) {
			const lenStart = i + 2;
			const lenEnd = indexOf(CHAR_COLON, lenStart);
			if (lenEnd === -1) break;
			const lenText = decoder.decode(bytes.slice(lenStart, lenEnd));
			const len = Number.parseInt(lenText, 10);
			if (!Number.isFinite(len) || len < 0) {
				i = lenEnd + 1;
				continue;
			}
			if (bytes[lenEnd + 1] !== CHAR_QUOTE) {
				i = lenEnd + 1;
				continue;
			}
			i = lenEnd + 2 + len + 2;
			continue;
		}
		if (ch === CHAR_I && bytes[i + 1] === CHAR_COLON) {
			const valStart = i + 2;
			const valEnd = indexOf(CHAR_SEMI, valStart);
			if (valEnd === -1) break;
			const idText = decoder.decode(bytes.slice(valStart, valEnd));
			const id = Number.parseInt(idText, 10);
			if (Number.isFinite(id)) ids.push(id);
			i = valEnd + 1;
			continue;
		}
		i++;
	}
	if (ids.length === 0) return void 0;
	return `pll:${[...new Set(ids)].toSorted((a, b) => a - b).join(",")}`;
}
/**
* Promote multilingual-plugin metadata from `post.meta` and
* `post.customTaxonomies` into `post.locale` / `post.translationGroup`.
*
* Called once per `<item>` after all of its `<wp:postmeta>` and per-item
* `<category>` entries have been parsed. Safe to call on posts that have no
* multilingual metadata -- it's a no-op in that case.
*
* WPML wins over Polylang when both are present (they shouldn't co-exist on
* the same site, but defensive precedence avoids ambiguity).
*/
function promoteI18nMetadata(post) {
	for (const key of WPML_LOCALE_META_KEYS) {
		const value = post.meta.get(key);
		if (value) {
			post.locale = value;
			break;
		}
	}
	for (const key of WPML_TRID_META_KEYS) {
		const value = post.meta.get(key);
		if (value) {
			post.translationGroup = `wpml:${value}`;
			break;
		}
	}
	if (!post.locale) {
		const pllLocale = post.meta.get(POLYLANG_LOCALE_META_KEY);
		if (pllLocale) post.locale = pllLocale;
		else {
			const firstLang = (post.customTaxonomies?.get(POLYLANG_LANG_TAXONOMY))?.[0];
			if (firstLang) post.locale = firstLang;
		}
	}
	if (!post.translationGroup) {
		const pllTranslations = post.meta.get(POLYLANG_TRANSLATIONS_META_KEY);
		if (pllTranslations) {
			const group = polylangTranslationGroupFromMeta(pllTranslations);
			if (group) post.translationGroup = group;
		}
	}
}
/** Extract string value from a SAX attribute (handles both Tag and QualifiedTag) */
function attrStr(attr) {
	if (typeof attr === "string") return attr;
	if (attr && typeof attr === "object" && "value" in attr) return attr.value;
	return "";
}
/**
* Normalise a `<category domain="...">` value to the matching EmDash
* taxonomy name so per-item label captures can be retrieved later using
* the same key.
*/
function normaliseDomain(domain) {
	if (domain === "post_tag") return "tag";
	return domain;
}
/**
* Persist the human label of a `<category>` text body keyed by the
* normalised `(taxonomy, slug)` pair. Skips trivial labels that equal the
* slug (no information vs. just storing the slug).
*/
function captureItemCategoryLabel(item, pair, label) {
	if (!label || label === pair.nicename) return;
	if (!item.taxonomyLabels) item.taxonomyLabels = /* @__PURE__ */ new Map();
	const key = `${normaliseDomain(pair.domain)}\u0000${pair.nicename}`;
	if (!item.taxonomyLabels.has(key)) item.taxonomyLabels.set(key, label);
}
/** Type guard for complete WxrTerm (all required fields present) */
function isCompleteWxrTerm(term) {
	return term.id !== void 0 && term.taxonomy !== void 0 && term.slug !== void 0 && term.name !== void 0;
}
/**
* Parse a WordPress WXR export from a string
*
* Uses the non-streaming SAX parser API for compatibility with
* environments that don't have Node.js streams (e.g., Cloudflare Workers).
*/
function parseWxrString(xml) {
	return new Promise((resolve, reject) => {
		const parser = sax.parser(true, {
			trim: false,
			normalize: false
		});
		const data = {
			site: {},
			posts: [],
			attachments: [],
			categories: [],
			tags: [],
			authors: [],
			terms: [],
			navMenus: []
		};
		let currentPath = [];
		let currentText = "";
		let currentItem = null;
		let currentAttachment = null;
		let currentCategory = null;
		let currentTag = null;
		let currentAuthor = null;
		let currentTerm = null;
		let currentMetaKey = "";
		let pendingItemCategory = null;
		const navMenuItemPosts = [];
		const menuTermsBySlug = /* @__PURE__ */ new Map();
		parser.onopentag = (node) => {
			const tag = node.name.toLowerCase();
			currentPath.push(tag);
			currentText = "";
			if (tag === "item") currentItem = {
				categories: [],
				tags: [],
				customTaxonomies: /* @__PURE__ */ new Map(),
				meta: /* @__PURE__ */ new Map()
			};
			else if (tag === "wp:category") currentCategory = {};
			else if (tag === "wp:tag") currentTag = {};
			else if (tag === "wp:author") currentAuthor = {};
			else if (tag === "wp:term") currentTerm = {};
			if (tag === "category" && currentItem && node.attributes) {
				const domain = attrStr(node.attributes.domain);
				const nicename = attrStr(node.attributes.nicename);
				if (domain === "category" && nicename) {
					currentItem.categories.push(nicename);
					pendingItemCategory = {
						domain,
						nicename
					};
				} else if (domain === "post_tag" && nicename) {
					currentItem.tags.push(nicename);
					pendingItemCategory = {
						domain,
						nicename
					};
				} else if (domain && nicename && domain !== "category" && domain !== "post_tag") {
					if (!currentItem.customTaxonomies) currentItem.customTaxonomies = /* @__PURE__ */ new Map();
					const existing = currentItem.customTaxonomies.get(domain) || [];
					existing.push(nicename);
					currentItem.customTaxonomies.set(domain, existing);
					pendingItemCategory = {
						domain,
						nicename
					};
				}
			}
		};
		parser.ontext = (text) => {
			currentText += text;
		};
		parser.oncdata = (cdata) => {
			currentText += cdata;
		};
		parser.onclosetag = (tagName) => {
			const tag = tagName.toLowerCase();
			const text = currentText.trim();
			if (currentPath.length === 3 && currentPath[1] === "channel") switch (tag) {
				case "title":
					data.site.title = text;
					break;
				case "link":
					data.site.link = text;
					break;
				case "description":
					data.site.description = text;
					break;
				case "language":
					data.site.language = text;
					break;
				case "wp:base_site_url":
					data.site.baseSiteUrl = text;
					break;
				case "wp:base_blog_url": data.site.baseBlogUrl = text;
			}
			if (currentItem) switch (tag) {
				case "title":
					currentItem.title = text;
					break;
				case "link":
					currentItem.link = text;
					break;
				case "pubdate":
					currentItem.pubDate = text;
					break;
				case "dc:creator":
					currentItem.creator = text;
					break;
				case "guid":
					currentItem.guid = text;
					break;
				case "description":
					currentItem.description = text;
					break;
				case "content:encoded":
					currentItem.content = text;
					break;
				case "excerpt:encoded":
					currentItem.excerpt = text;
					break;
				case "wp:post_id":
					currentItem.id = parseInt(text, 10);
					break;
				case "wp:post_date":
					currentItem.postDate = text;
					break;
				case "wp:post_date_gmt":
					currentItem.postDateGmt = text;
					break;
				case "wp:post_modified":
					currentItem.postModified = text;
					break;
				case "wp:post_modified_gmt":
					currentItem.postModifiedGmt = text;
					break;
				case "wp:comment_status":
					currentItem.commentStatus = text;
					break;
				case "wp:ping_status":
					currentItem.pingStatus = text;
					break;
				case "wp:post_name":
					currentItem.postName = text;
					break;
				case "wp:status":
					currentItem.status = text;
					break;
				case "wp:post_parent":
					currentItem.postParent = parseInt(text, 10);
					break;
				case "wp:menu_order":
					currentItem.menuOrder = parseInt(text, 10);
					break;
				case "wp:post_type":
					currentItem.postType = text;
					if (text === "attachment") currentAttachment = {
						id: currentItem.id,
						title: currentItem.title,
						url: currentItem.link,
						postDate: currentItem.postDate,
						meta: /* @__PURE__ */ new Map()
					};
					break;
				case "wp:post_password":
					currentItem.postPassword = text || void 0;
					break;
				case "wp:is_sticky":
					currentItem.isSticky = text === "1";
					break;
				case "wp:attachment_url":
					if (currentAttachment) currentAttachment.url = text;
					break;
				case "wp:meta_key":
					currentMetaKey = text;
					break;
				case "wp:meta_value":
					if (currentMetaKey && currentItem.meta) currentItem.meta.set(currentMetaKey, text);
					break;
				case "category":
					if (pendingItemCategory && text) captureItemCategoryLabel(currentItem, pendingItemCategory, text);
					pendingItemCategory = null;
					break;
				case "item":
					if (currentAttachment) {
						data.attachments.push(currentAttachment);
						currentAttachment = null;
					} else if (currentItem.postType === "nav_menu_item") {
						navMenuItemPosts.push(currentItem);
						data.posts.push(currentItem);
					} else if (currentItem.postType !== "attachment") {
						promoteI18nMetadata(currentItem);
						data.posts.push(currentItem);
					}
					currentItem = null;
			}
			if (currentCategory) switch (tag) {
				case "wp:term_id":
					currentCategory.id = parseInt(text, 10);
					break;
				case "wp:category_nicename":
					currentCategory.nicename = text;
					break;
				case "wp:cat_name":
					currentCategory.name = text;
					break;
				case "wp:category_parent":
					currentCategory.parent = text || void 0;
					break;
				case "wp:category_description":
					currentCategory.description = text || void 0;
					break;
				case "wp:category":
					if (currentCategory.name) data.categories.push(currentCategory);
					currentCategory = null;
			}
			if (currentTag) switch (tag) {
				case "wp:term_id":
					currentTag.id = parseInt(text, 10);
					break;
				case "wp:tag_slug":
					currentTag.slug = text;
					break;
				case "wp:tag_name":
					currentTag.name = text;
					break;
				case "wp:tag_description":
					currentTag.description = text || void 0;
					break;
				case "wp:tag":
					if (currentTag.name) data.tags.push(currentTag);
					currentTag = null;
			}
			if (currentAuthor) switch (tag) {
				case "wp:author_id":
					currentAuthor.id = parseInt(text, 10);
					break;
				case "wp:author_login":
					currentAuthor.login = text;
					break;
				case "wp:author_email":
					currentAuthor.email = text;
					break;
				case "wp:author_display_name":
					currentAuthor.displayName = text;
					break;
				case "wp:author_first_name":
					currentAuthor.firstName = text;
					break;
				case "wp:author_last_name":
					currentAuthor.lastName = text;
					break;
				case "wp:author":
					if (currentAuthor.login) data.authors.push(currentAuthor);
					currentAuthor = null;
			}
			if (currentTerm) switch (tag) {
				case "wp:term_id":
					currentTerm.id = parseInt(text, 10);
					break;
				case "wp:term_taxonomy":
					currentTerm.taxonomy = text;
					break;
				case "wp:term_slug":
					currentTerm.slug = text;
					break;
				case "wp:term_name":
					currentTerm.name = text;
					break;
				case "wp:term_parent":
					currentTerm.parent = text || void 0;
					break;
				case "wp:term_description":
					currentTerm.description = text || void 0;
					break;
				case "wp:term":
					if (isCompleteWxrTerm(currentTerm)) {
						data.terms.push(currentTerm);
						if (currentTerm.taxonomy === "nav_menu") menuTermsBySlug.set(currentTerm.slug, currentTerm.id);
					}
					currentTerm = null;
			}
			currentPath.pop();
			currentText = "";
		};
		parser.onerror = (err) => {
			reject(/* @__PURE__ */ new Error(`XML parsing error: ${err.message}`));
		};
		parser.onend = () => {
			data.navMenus = buildNavMenus(navMenuItemPosts, menuTermsBySlug);
			resolve(data);
		};
		parser.write(xml).close();
	});
}
/**
* Build structured navigation menus from nav_menu_item posts
*/
function buildNavMenus(navMenuItemPosts, menuTermsBySlug) {
	const menuItemsByMenu = /* @__PURE__ */ new Map();
	for (const post of navMenuItemPosts) {
		const navMenuSlugs = post.customTaxonomies?.get("nav_menu");
		if (!navMenuSlugs || navMenuSlugs.length === 0) continue;
		const menuSlug = navMenuSlugs[0];
		if (!menuSlug) continue;
		const items = menuItemsByMenu.get(menuSlug) || [];
		items.push(post);
		menuItemsByMenu.set(menuSlug, items);
	}
	const menus = [];
	for (const [menuSlug, posts] of menuItemsByMenu) {
		const menuId = menuTermsBySlug.get(menuSlug) || 0;
		const items = posts.map((post) => {
			const meta = post.meta;
			const menuItemTypeRaw = meta.get("_menu_item_type") || "custom";
			const menuItemType = menuItemTypeRaw === "post_type" || menuItemTypeRaw === "taxonomy" ? menuItemTypeRaw : "custom";
			const objectType = meta.get("_menu_item_object");
			const objectIdStr = meta.get("_menu_item_object_id");
			const url = meta.get("_menu_item_url");
			const parentIdStr = meta.get("_menu_item_menu_item_parent");
			const target = meta.get("_menu_item_target");
			const classesStr = meta.get("_menu_item_classes");
			let classes;
			if (classesStr) {
				const matches = classesStr.match(PHP_SERIALIZED_STRING_PATTERN);
				if (matches) classes = matches.map((m) => m.match(PHP_SERIALIZED_STRING_MATCH_PATTERN)?.[1]).filter(Boolean).join(" ");
			}
			return {
				id: post.id || 0,
				menuId,
				parentId: parentIdStr ? parseInt(parentIdStr, 10) || void 0 : void 0,
				sortOrder: post.menuOrder || 0,
				type: menuItemType,
				objectType: objectType || void 0,
				objectId: objectIdStr ? parseInt(objectIdStr, 10) : void 0,
				url: url || void 0,
				title: post.title || "",
				target: target || void 0,
				classes: classes || void 0
			};
		});
		items.sort((a, b) => a.sortOrder - b.sortOrder);
		menus.push({
			id: menuId,
			name: menuSlug,
			label: menuSlug,
			items
		});
	}
	return menus;
}
/**
* Import navigation menus from Plugin API
*
* @param menus - Menus from plugin API
* @param db - Database connection
* @param contentIdMap - Map from WP post ID to EmDash content ID
* @returns Import result with counts and ID mapping
*/
async function importMenusFromPlugin(menus, db, contentIdMap) {
	const result = {
		menusCreated: 0,
		itemsCreated: 0,
		menuIdMap: /* @__PURE__ */ new Map(),
		errors: []
	};
	for (const menu of menus) try {
		const existing = await db.selectFrom("_emdash_menus").select("id").where("name", "=", menu.name).executeTakeFirst();
		if (existing) {
			result.menuIdMap.set(menu.name, existing.id);
			continue;
		}
		const menuId = ulid();
		await db.insertInto("_emdash_menus").values({
			id: menuId,
			name: menu.name,
			label: menu.label
		}).execute();
		result.menusCreated++;
		result.menuIdMap.set(menu.name, menuId);
		const itemsCreated = await importPluginMenuItems(menu.items, menuId, db, contentIdMap);
		result.itemsCreated += itemsCreated;
	} catch (error) {
		result.errors.push({
			menu: menu.name,
			error: error instanceof Error ? error.message : String(error)
		});
	}
	if (result.menusCreated > 0) invalidateMenuObjectCache();
	return result;
}
/**
* Import menu items from Plugin API format
*/
async function importPluginMenuItems(items, menuId, db, contentIdMap) {
	const itemIdMap = /* @__PURE__ */ new Map();
	let count = 0;
	const sortedItems = items.toSorted((a, b) => a.sort_order - b.sort_order);
	for (const item of sortedItems) {
		const itemId = ulid();
		itemIdMap.set(item.id, itemId);
		const { type, collection, referenceId, customUrl } = mapPluginMenuItem(item, contentIdMap);
		await db.insertInto("_emdash_menu_items").values({
			id: itemId,
			menu_id: menuId,
			parent_id: null,
			sort_order: item.sort_order,
			type,
			reference_collection: collection,
			reference_id: referenceId,
			custom_url: customUrl,
			label: item.title,
			title_attr: null,
			target: item.target || null,
			css_classes: item.classes || null
		}).execute();
		count++;
	}
	for (const item of sortedItems) if (item.parent_id) {
		const itemId = itemIdMap.get(item.id);
		const parentId = itemIdMap.get(item.parent_id);
		if (itemId && parentId) await db.updateTable("_emdash_menu_items").set({ parent_id: parentId }).where("id", "=", itemId).execute();
	}
	return count;
}
/**
* Map Plugin menu item to EmDash format
*/
function mapPluginMenuItem(item, contentIdMap) {
	switch (item.type) {
		case "custom": return {
			type: "custom",
			collection: null,
			referenceId: null,
			customUrl: item.url || "#"
		};
		case "post_type": {
			const collection = mapObjectToCollection(item.object);
			const referenceId = item.object_id ? contentIdMap.get(item.object_id) || null : null;
			if (!referenceId && item.url) return {
				type: "custom",
				collection: null,
				referenceId: null,
				customUrl: item.url
			};
			return {
				type: collection === "pages" ? "page" : "post",
				collection,
				referenceId,
				customUrl: null
			};
		}
		case "taxonomy": return {
			type: "custom",
			collection: null,
			referenceId: null,
			customUrl: item.url || "#"
		};
		default: return {
			type: "custom",
			collection: null,
			referenceId: null,
			customUrl: item.url || "#"
		};
	}
}
/**
* Map WordPress object type to EmDash collection name
*/
function mapObjectToCollection(objectType) {
	if (!objectType) return "posts";
	return {
		post: "posts",
		page: "pages",
		product: "products",
		portfolio: "portfolio"
	}[objectType] || objectType;
}
/**
* Import reusable blocks (wp_block post type) from WXR as sections
*
* @param posts - All posts from WXR (will filter to wp_block)
* @param db - Database connection
* @returns Import result with counts
*/
async function importReusableBlocksAsSections(posts, db) {
	const result = {
		sectionsCreated: 0,
		sectionsSkipped: 0,
		errors: []
	};
	const reusableBlocks = posts.filter((post) => post.postType === "wp_block");
	if (reusableBlocks.length === 0) return result;
	for (const block of reusableBlocks) try {
		const slug = block.postName || slugify(block.title || `block-${block.id || Date.now()}`);
		if (await db.selectFrom("_emdash_sections").select("id").where("slug", "=", slug).executeTakeFirst()) {
			result.sectionsSkipped++;
			continue;
		}
		const content = block.content ? gutenbergToPortableText(block.content) : [];
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await db.insertInto("_emdash_sections").values({
			id,
			slug,
			title: block.title || "Untitled Block",
			description: null,
			keywords: null,
			content: JSON.stringify(content),
			preview_media_id: null,
			source: "import",
			theme_id: null,
			created_at: now,
			updated_at: now
		}).execute();
		result.sectionsCreated++;
	} catch (error) {
		result.errors.push({
			title: block.title || "Untitled Block",
			error: error instanceof Error ? error.message : String(error)
		});
	}
	return result;
}
/**
* Import comments from the plugin API.
*
* Preserves original timestamps and threading. Comments whose post was
* not imported (no entry in `contentIdMap`) are skipped. Re-running the
* import is idempotent: a comment with the same post, author email, and
* timestamp is not created twice.
*
* @param comments - Comments from the plugin API (all pages, flat)
* @param db - Database connection
* @param contentIdMap - WP post ID -> EmDash content ID
* @param collectionMap - WP post ID -> EmDash collection slug
* @param rootIds - Optional pre-seeded WP-comment-ID -> EmDash-root-ID map.
*   The chunked import passes the map accumulated from earlier pages so a
*   reply in page N can thread onto a parent imported in page N-1; the
*   function adds this page's entries to it.
*/
async function importCommentsFromPlugin(comments, db, contentIdMap, collectionMap, rootIds) {
	const result = {
		imported: 0,
		skipped: 0,
		errors: []
	};
	const commentIdMap = /* @__PURE__ */ new Map();
	const rootIdMap = rootIds ?? /* @__PURE__ */ new Map();
	const sorted = comments.toSorted((a, b) => a.id - b.id);
	for (const comment of sorted) {
		const label = `${comment.author_name || "Anonymous"} (${comment.date_gmt})`;
		try {
			const contentId = contentIdMap.get(comment.post_id);
			const collection = collectionMap.get(comment.post_id);
			if (!contentId || !collection) {
				result.skipped++;
				continue;
			}
			const parsed = new Date(comment.date_gmt);
			const createdAt = Number.isNaN(parsed.getTime()) ? (/* @__PURE__ */ new Date()).toISOString() : parsed.toISOString();
			const existing = await db.selectFrom("_emdash_comments").select("id").where("content_id", "=", contentId).where("author_email", "=", comment.author_email).where("created_at", "=", createdAt).where("body", "=", comment.body).executeTakeFirst();
			const parentId = comment.parent_id !== null ? rootIdMap.get(comment.parent_id) ?? null : null;
			if (existing) {
				commentIdMap.set(comment.id, existing.id);
				rootIdMap.set(comment.id, parentId ?? existing.id);
				result.skipped++;
				continue;
			}
			const id = ulid();
			await db.insertInto("_emdash_comments").values({
				id,
				collection,
				content_id: contentId,
				parent_id: parentId,
				author_name: comment.author_name || "Anonymous",
				author_email: comment.author_email,
				author_user_id: null,
				body: comment.body,
				status: comment.status,
				ip_hash: null,
				user_agent: null,
				moderation_metadata: null,
				created_at: createdAt,
				updated_at: createdAt
			}).execute();
			commentIdMap.set(comment.id, id);
			rootIdMap.set(comment.id, parentId ?? id);
			result.imported++;
		} catch (error) {
			result.errors.push({
				comment: label,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	if (result.imported > 0) invalidateCommentObjectCache();
	return result;
}
/** Options key prefix used by the site settings module (`settings/index.ts`). */
var SETTINGS_PREFIX = "site:";
/**
* Import site settings from analysis into EmDash site settings.
*
* Writes the `site:*` options consumed by `getSiteSettings()` and
* invalidates the settings cache. Logo/favicon are only applied when
* the caller resolved them to EmDash media IDs.
*
* @param settings - Site settings analysis
* @param db - Database connection
* @param overwrite - Whether to overwrite existing settings (a fresh
*   site's seed already sets title/tagline, so migrations pass true)
* @param media - Resolved media IDs for logo/favicon
*/
async function importSiteSettings(settings, db, overwrite = false, media = {}) {
	const result = {
		applied: [],
		skipped: [],
		errors: []
	};
	const updates = [];
	if (settings.title) updates.push({
		setting: "title",
		value: settings.title
	});
	if (settings.tagline) updates.push({
		setting: "tagline",
		value: settings.tagline
	});
	if (media.logoMediaId) updates.push({
		setting: "logo",
		value: { mediaId: media.logoMediaId }
	});
	if (media.faviconMediaId) updates.push({
		setting: "favicon",
		value: { mediaId: media.faviconMediaId }
	});
	if (updates.length === 0) return result;
	const options = new OptionsRepository(db);
	try {
		for (const { setting, value } of updates) try {
			const key = `${SETTINGS_PREFIX}${setting}`;
			if (!overwrite) {
				if (await options.get(key) !== null) {
					result.skipped.push(setting);
					continue;
				}
			}
			await options.set(key, value);
			result.applied.push(setting);
		} catch (error) {
			result.errors.push({
				setting,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	} finally {
		if (result.applied.length > 0) invalidateSiteSettingsCache();
	}
	return result;
}
/**
* Parse site settings from WordPress plugin options response
*/
function parseSiteSettingsFromPlugin(options) {
	const settings = {};
	if (typeof options.blogname === "string" && options.blogname.trim() !== "") settings.title = options.blogname;
	if (typeof options.blogdescription === "string" && options.blogdescription.trim() !== "") settings.tagline = options.blogdescription;
	if (typeof options.custom_logo_url === "string" && options.custom_logo_url !== "") settings.logo = {
		url: options.custom_logo_url,
		id: typeof options.custom_logo === "number" ? options.custom_logo : void 0
	};
	if (typeof options.site_icon_url === "string" && options.site_icon_url !== "") settings.favicon = {
		url: options.site_icon_url,
		id: typeof options.site_icon === "number" ? options.site_icon : void 0
	};
	return settings;
}
/**
* Import source registry
*
* Manages available import sources and provides URL probing.
*/
var TRAILING_SLASHES_PATTERN = /\/+$/;
/** Registered import sources */
var sources = /* @__PURE__ */ new Map();
/**
* A bot-protection challenge page (for example Cloudflare's "Just a moment...")
* answered instead of the source's API. Server-side requests can't solve it,
* so the site owner has to let the importer's requests through.
*/
var SiteChallengeError = class extends Error {
	constructor() {
		super("Cloudflare's bot protection answered with a challenge page instead of the EmDash Exporter API. Let requests to /wp-json/emdash/v1/ and ?rest_route=/emdash/v1/ through (for example with a WAF custom rule that skips bot protection), or pause bot protection during the migration.");
		this.name = "SiteChallengeError";
	}
};
/**
* Register an import source
*/
function registerSource(source) {
	sources.set(source.id, source);
}
/**
* Get a source by ID
*/
function getSource(id) {
	return sources.get(id);
}
/**
* Get all registered sources
*/
function getAllSources() {
	return [...sources.values()];
}
/**
* Get sources that can probe URLs
*/
function getUrlSources() {
	return getAllSources().filter((s) => s.canProbe);
}
/**
* Probe a URL against all registered sources
*
* Returns probe results sorted by confidence (definite > likely > possible)
*/
async function probeUrl(url) {
	let normalizedUrl = url.trim();
	if (!normalizedUrl.startsWith("http")) normalizedUrl = `https://${normalizedUrl}`;
	normalizedUrl = normalizedUrl.replace(TRAILING_SLASHES_PATTERN, "");
	await resolveAndValidateExternalUrl(normalizedUrl);
	const results = [];
	const urlSources = getUrlSources();
	let challenged = false;
	const probePromises = urlSources.map(async (source) => {
		try {
			const result = await source.probe?.(normalizedUrl);
			if (result) return result;
		} catch (error) {
			if (error instanceof SiteChallengeError) challenged = true;
			console.debug(`Probe failed for ${source.id}:`, error);
		}
		return null;
	});
	const probeResults = await Promise.allSettled(probePromises);
	for (const result of probeResults) if (result.status === "fulfilled" && result.value) results.push(result.value);
	const confidenceOrder = {
		definite: 0,
		likely: 1,
		possible: 2
	};
	results.sort((a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence]);
	return {
		url: normalizedUrl,
		isWordPress: results.length > 0,
		bestMatch: results[0] ?? null,
		allMatches: results,
		...challenged && results.length === 0 ? { challenged: true } : {}
	};
}
/**
* WXR (WordPress eXtended RSS) import source
*
* Handles WordPress export file uploads (.xml).
* This wraps the existing WXR parsing and analysis logic.
*/
var wxrSource = {
	id: "wxr",
	name: "WordPress Export File",
	description: "Upload a WordPress export file (.xml)",
	icon: "upload",
	requiresFile: true,
	canProbe: false,
	async analyze(input, context) {
		if (input.type !== "file") throw new Error("WXR source requires a file input");
		return analyzeWxrData(await parseWxrString(await input.file.text()), context.getExistingCollections ? await context.getExistingCollections() : /* @__PURE__ */ new Map());
	},
	async *fetchContent(input, options) {
		if (input.type !== "file") throw new Error("WXR source requires a file input");
		const wxr = await parseWxrString(await input.file.text());
		const attachmentMap = buildAttachmentMap(wxr.attachments);
		let count = 0;
		for (const post of wxr.posts) {
			const postType = post.postType || "post";
			if (!options.postTypes.includes(postType)) continue;
			if (isInternalPostType(postType)) continue;
			if (!options.includeDrafts && post.status !== "publish") continue;
			yield wxrPostToNormalizedItem(post, attachmentMap, wxr.site.link || "");
			count++;
			if (options.limit && count >= options.limit) break;
		}
	}
};
/**
* Analyze WXR data and return normalized ImportAnalysis
*/
function analyzeWxrData(wxr, existingCollections) {
	const postTypeCounts = /* @__PURE__ */ new Map();
	const postTypesWithThumbnails = /* @__PURE__ */ new Set();
	const metaKeys = /* @__PURE__ */ new Map();
	const authorPostCounts = /* @__PURE__ */ new Map();
	for (const post of wxr.posts) {
		const type = post.postType || "post";
		postTypeCounts.set(type, (postTypeCounts.get(type) || 0) + 1);
		if (post.creator) authorPostCounts.set(post.creator, (authorPostCounts.get(post.creator) || 0) + 1);
		if (post.meta.has("_thumbnail_id")) postTypesWithThumbnails.add(type);
		for (const [key, value] of post.meta) {
			const existing = metaKeys.get(key);
			if (existing) {
				existing.count++;
				if (existing.samples.length < 3 && value) existing.samples.push(value.slice(0, 100));
			} else metaKeys.set(key, {
				count: 1,
				samples: value ? [value.slice(0, 100)] : [],
				isInternal: isInternalMetaKey(key)
			});
		}
	}
	const customFields = [...metaKeys.entries()].filter(([_, info]) => !info.isInternal).map(([key, info]) => ({
		key,
		count: info.count,
		samples: info.samples,
		suggestedField: mapMetaKeyToField(key),
		suggestedType: inferMetaType(key, info.samples[0]),
		isInternal: info.isInternal
	})).toSorted((a, b) => b.count - a.count);
	const postTypes = [...postTypeCounts.entries()].filter(([type]) => !isInternalPostType(type)).map(([name, count]) => {
		const suggestedCollection = mapPostTypeToCollection(name);
		const existingCollection = existingCollections.get(suggestedCollection);
		const requiredFields = [...BASE_REQUIRED_FIELDS];
		if (postTypesWithThumbnails.has(name)) requiredFields.push(FEATURED_IMAGE_FIELD);
		return {
			name,
			count,
			suggestedCollection,
			requiredFields,
			schemaStatus: checkSchemaCompatibility(requiredFields, existingCollection)
		};
	}).toSorted((a, b) => b.count - a.count);
	const attachmentItems = wxr.attachments.map((att) => {
		const filename = att.url ? getFilenameFromUrl(att.url) : void 0;
		const mimeType = filename ? guessMimeType(filename) : void 0;
		return {
			id: att.id,
			title: att.title,
			url: att.url,
			filename,
			mimeType
		};
	});
	const navMenus = wxr.navMenus.map((menu) => ({
		name: menu.name,
		label: menu.label,
		itemCount: menu.items.length
	}));
	const taxonomyMap = /* @__PURE__ */ new Map();
	for (const term of wxr.terms) {
		if (term.taxonomy === "category" || term.taxonomy === "post_tag" || term.taxonomy === "nav_menu") continue;
		const existing = taxonomyMap.get(term.taxonomy);
		if (existing) {
			existing.count++;
			if (existing.samples.length < 3) existing.samples.push(term.name);
		} else taxonomyMap.set(term.taxonomy, {
			count: 1,
			samples: [term.name]
		});
	}
	const customTaxonomies = Array.from(taxonomyMap.entries(), ([slug, info]) => ({
		slug,
		termCount: info.count,
		sampleTerms: info.samples
	})).toSorted((a, b) => b.termCount - a.termCount);
	const reusableBlocks = wxr.posts.filter((post) => post.postType === "wp_block").map((post) => ({
		id: post.id || 0,
		title: post.title || "Untitled Block",
		slug: post.postName || slugify(post.title || `block-${post.id || Date.now()}`)
	}));
	return {
		sourceId: "wxr",
		site: {
			title: wxr.site.title || "WordPress Site",
			url: wxr.site.link || ""
		},
		postTypes,
		attachments: {
			count: wxr.attachments.length,
			items: attachmentItems
		},
		categories: wxr.categories.length,
		tags: wxr.tags.length,
		authors: wxr.authors.map((a) => ({
			id: a.id,
			login: a.login,
			email: a.email,
			displayName: a.displayName || a.login || "Unknown",
			postCount: a.login ? authorPostCounts.get(a.login) || 0 : 0
		})),
		navMenus: navMenus.length > 0 ? navMenus : void 0,
		customTaxonomies: customTaxonomies.length > 0 ? customTaxonomies : void 0,
		reusableBlocks: reusableBlocks.length > 0 ? reusableBlocks : void 0,
		customFields
	};
}
/**
* Convert a WXR post to a normalized item
*/
function wxrPostToNormalizedItem(post, attachmentMap, siteUrl) {
	const content = post.content ? gutenbergToPortableText(post.content) : [];
	if (siteUrl) relativizeContentLinks(content, siteUrl);
	const thumbnailId = post.meta.get("_thumbnail_id");
	const featuredImage = thumbnailId ? attachmentMap.get(String(thumbnailId)) : void 0;
	let customTaxonomies;
	if (post.customTaxonomies && post.customTaxonomies.size > 0) {
		const filtered = Object.fromEntries([...post.customTaxonomies].filter(([taxonomy]) => taxonomy !== "language"));
		if (Object.keys(filtered).length > 0) customTaxonomies = filtered;
	}
	return {
		sourceId: post.id || 0,
		postType: post.postType || "post",
		status: mapWpStatus(post.status),
		slug: post.postName || slugify(post.title || `post-${post.id || Date.now()}`),
		title: post.title || "Untitled",
		content,
		excerpt: post.excerpt,
		date: parseWxrDate(post.postDateGmt, post.pubDate, post.postDate) ?? /* @__PURE__ */ new Date(),
		modified: parseWxrDate(post.postModifiedGmt, void 0, post.postModified),
		author: post.creator,
		categories: post.categories,
		tags: post.tags,
		meta: Object.fromEntries(post.meta),
		featuredImage,
		parentId: post.postParent && post.postParent !== 0 ? post.postParent : void 0,
		menuOrder: post.menuOrder,
		customTaxonomies,
		locale: post.locale,
		translationGroup: post.translationGroup
	};
}
/**
* WordPress uses "0000-00-00 00:00:00" as a sentinel for missing GMT dates
* (e.g. unpublished drafts). This must be treated as absent.
*/
var WXR_ZERO_DATE = "0000-00-00 00:00:00";
/**
* Parse a WXR date with the correct fallback chain:
* 1. GMT date (always UTC, most reliable)
* 2. pubDate (RFC 2822, includes timezone offset)
* 3. Site-local date (MySQL datetime without timezone, imprecise but best available)
*
* Returns undefined when none of the inputs yield a valid date.
* Callers that need a guaranteed Date should use `?? new Date()`.
*/
function parseWxrDate(gmtDate, pubDate, localDate) {
	if (gmtDate && gmtDate !== WXR_ZERO_DATE) return /* @__PURE__ */ new Date(gmtDate.replace(" ", "T") + "Z");
	if (pubDate) {
		const d = new Date(pubDate);
		if (!isNaN(d.getTime())) return d;
	}
	if (localDate) {
		const d = new Date(localDate.replace(" ", "T"));
		if (!isNaN(d.getTime())) return d;
	}
}
/**
* WordPress REST API probe
*
* Probes self-hosted WordPress sites to detect capabilities.
* This source is probe-only - it tells users what's available
* and suggests next steps (usually: upload WXR file).
*/
var TRAILING_SLASHES = /\/+$/;
var WP_JSON_SUFFIX = /\/wp-json\/?$/;
var wordpressRestSource = {
	id: "wordpress-rest",
	name: "WordPress Site",
	description: "Connect to a self-hosted WordPress site",
	icon: "globe",
	requiresFile: false,
	canProbe: true,
	async probe(url) {
		try {
			const siteUrl = normalizeUrl(url);
			validateExternalUrl(siteUrl);
			const response = await ssrfSafeFetch(`${siteUrl}/wp-json/`, {
				headers: { Accept: "application/json" },
				signal: AbortSignal.timeout(1e4)
			});
			if (!response.ok) {
				if (!(await ssrfSafeFetch(`${siteUrl}/?rest_route=/`, {
					headers: { Accept: "application/json" },
					signal: AbortSignal.timeout(1e4)
				})).ok) return null;
			}
			const data = await response.json();
			if (!data.namespaces?.includes("wp/v2")) return null;
			const preview = await getPublicContentCounts(siteUrl);
			const hasAppPasswords = !!data.authentication?.["application-passwords"];
			return {
				sourceId: "wordpress-rest",
				confidence: "definite",
				detected: {
					platform: "wordpress",
					siteTitle: data.name,
					siteUrl: data.url || data.home || siteUrl
				},
				capabilities: {
					publicContent: true,
					privateContent: false,
					customPostTypes: false,
					allMeta: false,
					mediaStream: true
				},
				auth: hasAppPasswords ? {
					type: "password",
					instructions: "To import drafts and private content, create an Application Password in WordPress → Users → Your Profile → Application Passwords"
				} : void 0,
				preview,
				suggestedAction: {
					type: "upload",
					instructions: "For a complete import including drafts, custom post types, and all metadata, export your content from WordPress (Tools → Export) and upload the file here."
				}
			};
		} catch {
			return null;
		}
	},
	async analyze(_input, _context) {
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	},
	async *fetchContent(_input, _options) {
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	}
};
/**
* Normalize a URL for API requests
*/
function normalizeUrl(url) {
	let normalized = url.trim();
	if (!normalized.startsWith("http")) normalized = `https://${normalized}`;
	normalized = normalized.replace(TRAILING_SLASHES, "");
	normalized = normalized.replace(WP_JSON_SUFFIX, "");
	return normalized;
}
/**
* Get public content counts from REST API
*/
async function getPublicContentCounts(siteUrl) {
	const result = {};
	try {
		const [postsRes, pagesRes, mediaRes] = await Promise.allSettled([
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/posts?per_page=1`, { signal: AbortSignal.timeout(5e3) }),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/pages?per_page=1`, { signal: AbortSignal.timeout(5e3) }),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/media?per_page=1`, { signal: AbortSignal.timeout(5e3) })
		]);
		if (postsRes.status === "fulfilled" && postsRes.value.ok) {
			const total = postsRes.value.headers.get("X-WP-Total");
			if (total) result.posts = parseInt(total, 10);
		}
		if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
			const total = pagesRes.value.headers.get("X-WP-Total");
			if (total) result.pages = parseInt(total, 10);
		}
		if (mediaRes.status === "fulfilled" && mediaRes.value.ok) {
			const total = mediaRes.value.headers.get("X-WP-Total");
			if (total) result.media = parseInt(total, 10);
		}
	} catch {}
	return result;
}
/**
* WordPress Plugin (EmDash Exporter) import source
*
* Connects to self-hosted WordPress sites running the EmDash Exporter plugin.
* Provides full access to all content including drafts, custom post types, and ACF fields.
*/
/**
* Identifying User-Agent for outbound WordPress plugin importer requests.
*
* The importer sends this on both plugin API calls and direct media downloads.
* Cloudflare Workers' fetch() has no default User-Agent, and some hosts reject
* requests without one (returning 403). Using the same value everywhere keeps
* behavior predictable when the importer is retried against a bot-filtered host.
*/
var IMPORTER_USER_AGENT = "EmDash-Importer/1.0";
/**
* Build the REST API URL for a plugin endpoint.
*
* `restRoute: false` uses the pretty form (`/wp-json/emdash/v1/...`),
* `restRoute: true` uses the `?rest_route=` form that works on sites with
* plain permalinks (where `/wp-json/` doesn't exist).
*/
function pluginApiUrl(siteUrl, path, params = {}, restRoute = false) {
	if (restRoute) {
		const url = new URL(siteUrl + "/");
		url.searchParams.set("rest_route", `/emdash/v1/${path}`);
		for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
		return url.toString();
	}
	const url = new URL(`${siteUrl}/wp-json/emdash/v1/${path}`);
	for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
	return url.toString();
}
/**
* Fetch a plugin API endpoint, falling back to the `?rest_route=` form when
* the pretty `/wp-json/` route 404s or is unreachable. Sites with "Plain"
* permalinks have no `/wp-json/` rewrite, so without this fallback they
* always fail with a misleading 404.
*/
async function fetchPluginApi(siteUrl, path, params, headersInit, timeoutMs) {
	const headers = new Headers(headersInit);
	headers.set("User-Agent", IMPORTER_USER_AGENT);
	let pretty = null;
	try {
		pretty = await ssrfSafeFetch(pluginApiUrl(siteUrl, path, params), {
			headers,
			signal: AbortSignal.timeout(timeoutMs)
		});
	} catch {}
	const response = pretty && pretty.status !== 404 ? pretty : await ssrfSafeFetch(pluginApiUrl(siteUrl, path, params, true), {
		headers,
		signal: AbortSignal.timeout(timeoutMs)
	});
	if (response.headers.get("cf-mitigated") === "challenge") throw new SiteChallengeError();
	return response;
}
var wordpressPluginSource = {
	id: "wordpress-plugin",
	name: "WordPress (EmDash Exporter)",
	description: "Import from WordPress sites with the EmDash Exporter plugin installed",
	icon: "plug",
	requiresFile: false,
	canProbe: true,
	async probe(url) {
		try {
			const siteUrl = normalizeUrl$1(url);
			validateExternalUrl(siteUrl);
			const response = await fetchPluginApi(siteUrl, "probe", {}, { Accept: "application/json" }, 1e4);
			if (!response.ok) return null;
			const data = await response.json();
			if (!data.emdash_exporter) return null;
			return {
				sourceId: "wordpress-plugin",
				confidence: "definite",
				detected: {
					platform: "wordpress",
					version: data.wordpress_version,
					siteTitle: data.site.title,
					siteUrl: data.site.url
				},
				capabilities: {
					publicContent: true,
					privateContent: true,
					customPostTypes: true,
					allMeta: true,
					mediaStream: true
				},
				auth: data.capabilities.application_passwords ? {
					type: "password",
					instructions: data.auth_instructions.instructions
				} : void 0,
				preview: {
					posts: data.post_types.find((p) => p.name === "post")?.count,
					pages: data.post_types.find((p) => p.name === "page")?.count,
					media: data.media_count
				},
				suggestedAction: { type: "proceed" },
				i18n: pluginI18nToDetection(data.i18n)
			};
		} catch (error) {
			if (error instanceof SiteChallengeError) throw error;
			return null;
		}
	},
	async analyze(input, context) {
		const { siteUrl, headers } = getRequestConfig(input);
		const response = await fetchPluginApi(siteUrl, "analyze", {}, headers, 3e4);
		if (!response.ok) {
			const body = await response.json().catch(() => void 0);
			const message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string" ? body.message : "";
			throw new Error(message || `Failed to analyze site: ${response.statusText}`);
		}
		const data = await response.json();
		const existingCollections = context.getExistingCollections ? await context.getExistingCollections() : /* @__PURE__ */ new Map();
		const postTypes = data.post_types.filter((pt) => pt.total > 0).map((pt) => {
			const suggestedCollection = mapPostTypeToCollection(pt.name);
			const existingCollection = existingCollections.get(suggestedCollection);
			const requiredFields = pt.supports && "thumbnail" in pt.supports ? [...BASE_REQUIRED_FIELDS, FEATURED_IMAGE_FIELD] : [...BASE_REQUIRED_FIELDS];
			const knownSlugs = new Set(requiredFields.map((f) => f.slug));
			const metaTypes = new Map((pt.custom_fields ?? []).map((field) => [sanitizeFieldSlug(field.key), mapInferredFieldType(field.inferred_type)]));
			const jsonAcfFields = [];
			for (const acfField of acfFieldsForPostType(data.acf, pt.name)) {
				const slug = sanitizeFieldSlug(acfField.name);
				if (knownSlugs.has(slug)) continue;
				knownSlugs.add(slug);
				const type = acfImportFieldType(acfField, existingCollection?.fields.get(slug)?.type, metaTypes.get(slug));
				if (type === "json") jsonAcfFields.push(acfField);
				requiredFields.push({
					slug,
					label: acfField.label || fieldLabelFromKey(acfField.name),
					type,
					required: false
				});
			}
			for (const customField of pt.custom_fields ?? []) {
				if (isPluginBookkeepingMeta(customField.key)) continue;
				if (isAcfRowMeta(customField.key, jsonAcfFields)) continue;
				const slug = sanitizeFieldSlug(customField.key);
				if (knownSlugs.has(slug)) continue;
				knownSlugs.add(slug);
				requiredFields.push({
					slug,
					label: fieldLabelFromKey(customField.key),
					type: mapInferredFieldType(customField.inferred_type),
					required: false
				});
			}
			return {
				name: pt.name,
				count: pt.total,
				suggestedCollection,
				requiredFields,
				schemaStatus: checkSchemaCompatibility(requiredFields, existingCollection)
			};
		});
		const attachments = [];
		if (data.attachments.count > 0) try {
			let page = 1;
			let totalPages = 1;
			while (page <= totalPages) {
				const mediaResponse = await fetchPluginApi(siteUrl, "media", {
					per_page: "500",
					page: String(page)
				}, headers, 3e4);
				if (!mediaResponse.ok) break;
				const mediaData = await mediaResponse.json();
				totalPages = mediaData.pages;
				for (const item of mediaData.items) attachments.push({
					id: item.id,
					url: item.url,
					filename: item.filename,
					mimeType: item.mime_type,
					title: item.title,
					alt: item.alt,
					caption: item.caption,
					width: item.width,
					height: item.height
				});
				page++;
			}
		} catch (e) {
			if (e instanceof SiteChallengeError) throw e;
			console.warn("Failed to fetch media list:", e);
		}
		const categoryTaxonomy = data.taxonomies.find((t) => t.name === "category");
		const tagTaxonomy = data.taxonomies.find((t) => t.name === "post_tag");
		return {
			sourceId: "wordpress-plugin",
			site: {
				title: data.site.title,
				url: data.site.url
			},
			postTypes,
			attachments: {
				count: data.attachments.count,
				items: attachments
			},
			categories: categoryTaxonomy?.term_count ?? 0,
			tags: tagTaxonomy?.term_count ?? 0,
			authors: data.authors.map((a) => ({
				id: a.id,
				login: a.login,
				email: a.email,
				displayName: a.display_name,
				postCount: a.post_count
			})),
			i18n: pluginI18nToDetection(data.i18n)
		};
	},
	async *fetchContent(input, options) {
		const { siteUrl, headers } = getRequestConfig(input);
		for (const postType of options.postTypes) {
			let page = 1;
			let totalPages = 1;
			let yielded = 0;
			while (page <= totalPages) {
				const response = await fetchPluginApi(siteUrl, "content", {
					post_type: postType,
					status: options.includeDrafts ? "any" : "publish",
					per_page: "100",
					page: String(page)
				}, headers, 6e4);
				if (!response.ok) throw new Error(`Failed to fetch ${postType}: ${response.statusText}`);
				const data = await response.json();
				totalPages = data.pages;
				for (const post of data.items) {
					yield pluginPostToNormalizedItem(post, siteUrl);
					yielded++;
					if (options.limit && yielded >= options.limit) return;
				}
				page++;
			}
		}
	},
	async fetchMedia(url, _input) {
		validateExternalUrl(url);
		const response = await ssrfSafeFetch(url, { headers: { "User-Agent": IMPORTER_USER_AGENT } });
		if (!response.ok) throw new Error(`Failed to fetch media: ${response.statusText}`);
		return response.blob();
	}
};
/**
* Fetch a single page of content for one post type. This is the unit of
* work for the chunked import: one Worker invocation imports one page,
* keeping each request far below Cloudflare's CPU and subrequest limits
* (see issue #475).
*/
async function fetchPluginContentPage(options) {
	const { siteUrl, headers } = getRequestConfig({
		type: "url",
		url: options.siteUrl,
		token: options.token
	});
	const response = await fetchPluginApi(siteUrl, "content", {
		post_type: options.postType,
		status: options.includeDrafts ? "any" : "publish",
		per_page: String(options.perPage),
		page: String(options.page)
	}, headers, 6e4);
	if (!response.ok) throw new Error(`Failed to fetch ${options.postType}: ${response.statusText}`);
	const data = await response.json();
	return {
		items: data.items.map((post) => pluginPostToNormalizedItem(post, siteUrl)),
		totalPages: data.pages
	};
}
/** Plugin `inferred_type` values that are valid EmDash field types as-is */
var VALID_INFERRED_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"number",
	"integer",
	"boolean",
	"datetime",
	"json",
	"reference"
]);
/**
* Map the plugin's inferred custom-field type to an EmDash field type.
* Unknown values fall back to string (always safe for TEXT storage).
*/
function mapInferredFieldType(inferredType) {
	return VALID_INFERRED_TYPES.has(inferredType) ? inferredType : "string";
}
/**
* EmDash field types for ACF field types that hold a single value and return
* a scalar by default. When a return format makes `get_fields()` give an
* array, the raw meta value fills the field instead. Every other ACF type
* (select, checkbox, relationship, repeater, gallery, ...) can return several
* values or an object and is stored as JSON.
*/
var ACF_FIELD_TYPES = {
	text: "string",
	email: "string",
	url: "string",
	password: "string",
	radio: "string",
	button_group: "string",
	color_picker: "string",
	oembed: "string",
	date_picker: "string",
	date_time_picker: "string",
	time_picker: "string",
	textarea: "text",
	wysiwyg: "text",
	number: "number",
	range: "number",
	true_false: "boolean"
};
/**
* The field type for an ACF field. A collection created by an earlier
* import holds the type the raw meta suggested for that key; that type is
* kept so the collection still imports, and the field's flattened row
* keys then keep filling their own fields.
*/
function acfImportFieldType(field, existingType, metaType) {
	const acfType = ACF_FIELD_TYPES[field.type] ?? "json";
	if (existingType && metaType && !isTypeCompatible(acfType, existingType) && isTypeCompatible(metaType, existingType)) return existingType;
	return acfType;
}
/** ACF layout-only field types that hold no value */
var ACF_LAYOUT_TYPES = /* @__PURE__ */ new Set([
	"tab",
	"message",
	"accordion"
]);
/** Fields of the ACF field groups whose location rules include `post_type == <postType>` */
function acfFieldsForPostType(groups, postType) {
	const fields = [];
	for (const group of groups ?? []) {
		if (!group.location?.some((rules) => rules.some((rule) => rule.param === "post_type" && rule.operator === "==" && rule.value === postType))) continue;
		for (const field of group.fields) if (field.name && !ACF_LAYOUT_TYPES.has(field.type)) fields.push(field);
	}
	return fields;
}
var ACF_ROW_SUFFIX = /^_\d+_/;
/**
* ACF stores repeater and flexible content rows as `<name>_<row>_<sub>`
* meta keys. Their values already arrive whole under the parent field in
* `get_fields()`.
*/
function isAcfRowMeta(key, acfFields) {
	return acfFields.some((field) => (field.type === "repeater" || field.type === "flexible_content") && key.startsWith(field.name) && ACF_ROW_SUFFIX.test(key.slice(field.name.length)));
}
var FIELD_KEY_SEPARATORS = /[_-]+/;
/** Derive a human label from a meta key: "event_start-date" -> "Event Start Date" */
function fieldLabelFromKey(key) {
	return key.split(FIELD_KEY_SEPARATORS).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
/**
* Convert plugin i18n info to the shared I18nDetection type.
* Returns undefined when no multilingual plugin is detected.
*/
function pluginI18nToDetection(i18n) {
	if (!i18n) return void 0;
	return {
		plugin: i18n.plugin,
		defaultLocale: i18n.default_locale,
		locales: i18n.locales
	};
}
/**
* Get request configuration from input
*/
function getRequestConfig(input) {
	if (input.type === "url") {
		const siteUrl = normalizeUrl$1(input.url);
		validateExternalUrl(siteUrl);
		const headers = { Accept: "application/json" };
		if (input.token) headers["Authorization"] = `Basic ${input.token}`;
		return {
			siteUrl,
			headers
		};
	}
	if (input.type === "oauth") {
		const oauthSiteUrl = normalizeUrl$1(input.url);
		validateExternalUrl(oauthSiteUrl);
		return {
			siteUrl: oauthSiteUrl,
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${input.accessToken}`
			}
		};
	}
	throw new Error("WordPress plugin source requires URL or OAuth input");
}
/**
* Convert plugin post to normalized item
*/
function pluginPostToNormalizedItem(post, siteUrl) {
	const content = post.content ? gutenbergToPortableText(post.content) : [];
	relativizeContentLinks(content, siteUrl);
	const categories = post.taxonomies?.category?.map((c) => c.slug) ?? post.taxonomies?.categories?.map((c) => c.slug) ?? [];
	const tags = post.taxonomies?.post_tag?.map((t) => t.slug) ?? post.taxonomies?.tags?.map((t) => t.slug) ?? [];
	const customTaxonomies = {};
	for (const [name, terms] of Object.entries(post.taxonomies ?? {})) {
		if ([
			"category",
			"categories",
			"post_tag",
			"tags"
		].includes(name)) continue;
		if (Array.isArray(terms) && terms.length > 0) customTaxonomies[name] = terms.map((t) => t.slug);
	}
	const meta = { ...post.meta };
	if (post.acf) meta._acf = post.acf;
	if (post.yoast) meta._yoast = post.yoast;
	if (post.rankmath) meta._rankmath = post.rankmath;
	return {
		sourceId: post.id,
		postType: post.post_type,
		status: mapWpStatus(post.status),
		slug: post.slug,
		title: post.title,
		content,
		excerpt: post.excerpt || void 0,
		date: parseWxrDate(post.date_gmt, void 0, post.date) ?? /* @__PURE__ */ new Date(NaN),
		modified: parseWxrDate(post.modified_gmt, void 0, post.modified),
		author: post.author?.login,
		categories,
		tags,
		customTaxonomies: Object.keys(customTaxonomies).length > 0 ? customTaxonomies : void 0,
		meta,
		featuredImage: post.featured_image?.url,
		locale: post.locale,
		translationGroup: post.translation_group
	};
}
/**
* Fetch taxonomies from plugin API
*/
async function fetchPluginTaxonomies(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "taxonomies", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (!response.ok) throw new Error(`Failed to fetch taxonomies: ${response.statusText}`);
	return response.json();
}
/**
* Fetch navigation menus from plugin API (added in emdash-exporter 1.1.0).
* Returns an empty array when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginMenus(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "menus", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (response.status === 404) return [];
	if (!response.ok) throw new Error(`Failed to fetch menus: ${response.statusText}`);
	return response.json();
}
/**
* Fetch site options from plugin API (title, tagline, logo, favicon, ...)
*/
async function fetchPluginOptions(siteUrl, authToken) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "options", {}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (!response.ok) throw new Error(`Failed to fetch options: ${response.statusText}`);
	return response.json();
}
/**
* Fetch a single page of comments from the plugin API (added in
* emdash-exporter 1.2.0). The exporter orders by comment ID ascending, so
* parents always appear before their children across pages. Returns
* `totalPages: 0` when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginCommentsPage(siteUrl, authToken, page) {
	const normalizedSiteUrl = normalizeUrl$1(siteUrl);
	validateExternalUrl(normalizedSiteUrl);
	const response = await fetchPluginApi(normalizedSiteUrl, "comments", {
		per_page: "500",
		page: String(page)
	}, {
		Accept: "application/json",
		Authorization: `Basic ${authToken}`
	}, 3e4);
	if (response.status === 404) return {
		items: [],
		totalPages: 0
	};
	if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);
	const data = await response.json();
	return {
		items: data.items,
		totalPages: data.pages
	};
}
/**
* Fetch all comments from plugin API, paginating through every page.
* Returns an empty array when the endpoint doesn't exist (older plugin).
*/
async function fetchPluginComments(siteUrl, authToken) {
	const comments = [];
	let page = 1;
	let totalPages = 1;
	while (page <= totalPages) {
		const result = await fetchPluginCommentsPage(siteUrl, authToken, page);
		totalPages = result.totalPages;
		comments.push(...result.items);
		page++;
	}
	return comments;
}
registerSource(wordpressPluginSource);
registerSource(wordpressRestSource);
registerSource(wxrSource);
export { sanitizeFieldSlug as S, isInternalPostType as _, fetchPluginMenus as a, resolveImportByline as b, getSource as c, importReusableBlocksAsSections as d, importSiteSettings as f, probeUrl as g, parseWxrString as h, fetchPluginContentPage as i, importCommentsFromPlugin as l, parseWxrDate as m, fetchPluginComments as n, fetchPluginOptions as o, parseSiteSettingsFromPlugin as p, fetchPluginCommentsPage as r, fetchPluginTaxonomies as s, SiteChallengeError as t, importMenusFromPlugin as u, mapPostTypeToCollection as v, sanitizeCollectionSlug as x, relativizeContentLinks as y };
