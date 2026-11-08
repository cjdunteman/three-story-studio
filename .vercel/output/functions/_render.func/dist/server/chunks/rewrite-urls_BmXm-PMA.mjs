import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as normalizeMediaValue } from "./normalize-Cx-bNwhP_BPRa8oa2.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import { M as markContentMediaUsageCollectionStaleSafely } from "./registry-B0-O575m_BFXFyFwY.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { T as wpRewriteUrlsBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-url-helpers.mjs
var REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
var WORDPRESS_IMAGE_SIZE_SUFFIX = /-\d+x\d+(?=\.[^./?#]+$)/;
var BASE_URL_EXTENSION = /^(.+)(\.[^./?#]+)$/;
var QUERY_BEFORE_FRAGMENT = /^[^#]*\?/;
/** What may follow a URL in a string field: its end, a quote, a tag, or the punctuation of prose. */
var URL_END = `(?=$|["'\\s<>)\\],;:!?]|\\.(?=$|["'\\s<>)\\]]))`;
/**
* Strip query parameters from a URL for base matching
*/
function getBaseUrl(url) {
	try {
		const parsed = new URL(url);
		return `${parsed.origin}${parsed.pathname}`;
	} catch {
		return url.split("?")[0] || url;
	}
}
/**
* Whether a URL map key carries a query string, which makes it one URL rather
* than a file: `https://example.com/?attachment_id=7` is an attachment's page,
* and its base is the home page. Such a key is matched exactly, never by its
* base, or every link to the home page would be rewritten with it.
*/
function carriesQuery(url) {
	return QUERY_BEFORE_FRAGMENT.test(url);
}
/**
* Build a map of base URLs to new URLs for flexible matching. A key that
* carries a query has no base entry (see `carriesQuery`).
*/
function buildBaseUrlMap(urlMap) {
	const baseMap = /* @__PURE__ */ new Map();
	for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
		if (carriesQuery(oldUrl)) continue;
		const baseUrl = getBaseUrl(oldUrl);
		baseMap.set(baseUrl, newUrl);
	}
	return baseMap;
}
/**
* Extract the URL to match from a stored media field value.
*
* Image/file columns hold a JSON-stringified MediaValue
* (e.g. `{"provider":"external","id":"","src":"https://.../hero.jpg"}`), but legacy
* rows may hold a bare URL string. Returns the inner `src` for a MediaValue, otherwise
* the value unchanged. Without this, the whole JSON blob is passed to findMatchingUrl()
* and the embedded URL is never matched.
*/
function extractMediaUrl(value) {
	try {
		const parsed = JSON.parse(value);
		if (parsed && typeof parsed.src === "string") return parsed.src;
	} catch {}
	return value;
}
/**
* Find matching new URL for a given URL, checking exact, base, and WordPress image-size matches
*/
function findMatchingUrl(url, exactMap, baseMap) {
	if (exactMap[url]) return exactMap[url];
	const baseUrl = getBaseUrl(url);
	const baseMatch = baseMap.get(baseUrl);
	if (baseMatch) return baseMatch;
	const wordPressImageMatch = baseMap.get(stripWordPressImageSizeSuffix(baseUrl));
	if (wordPressImageMatch) return wordPressImageMatch;
	return null;
}
/**
* Rewrite URLs in a Portable Text array, returning whether any changes were made
*/
function rewritePortableTextUrls(blocks, exactMap, baseMap) {
	let changed = false;
	let urlsRewritten = 0;
	const rewriteField = (target, key) => {
		const value = target[key];
		const newUrl = typeof value === "string" ? findMatchingUrl(value, exactMap, baseMap) : null;
		if (!newUrl) return false;
		target[key] = newUrl;
		changed = true;
		urlsRewritten++;
		return true;
	};
	const rewriteHtml = (target, count = true) => {
		if (typeof target.html !== "string") return;
		const result = rewriteStringUrls(target.html, exactMap, baseMap);
		if (result.changed) {
			target.html = result.newValue;
			changed = true;
			if (count) urlsRewritten += result.urlsRewritten;
		}
	};
	const rewriteMarkDefs = (markDefs) => {
		for (const def of markDefs ?? []) rewriteField(def, "href");
	};
	const rewriteNested = (content) => {
		if (!Array.isArray(content)) return;
		const result = rewritePortableTextUrls(content, exactMap, baseMap);
		if (result.changed) {
			changed = true;
			urlsRewritten += result.urlsRewritten;
		}
	};
	for (const block of blocks) switch (block._type) {
		case "image":
			if (block.asset?.url) {
				const newUrl = findMatchingUrl(block.asset.url, exactMap, baseMap);
				if (newUrl) {
					block.asset.url = newUrl;
					block.asset._ref = newUrl;
					changed = true;
					urlsRewritten++;
				}
			}
			if (typeof block.link === "string") rewriteField(block, "link");
			else if (block.link) rewriteField(block.link, "href");
			break;
		case "gallery":
			rewriteNested(block.images);
			break;
		case "columns":
			for (const column of block.columns ?? []) rewriteNested(column.content);
			break;
		case "cover":
			rewriteField(block, "backgroundImage");
			rewriteNested(block.content);
			break;
		case "block":
			rewriteMarkDefs(block.markDefs);
			break;
		case "table":
			for (const row of block.rows ?? []) for (const cell of row.cells ?? []) rewriteMarkDefs(cell.markDefs);
			break;
		case "file":
		case "button":
			rewriteField(block, "url");
			break;
		case "embed":
			rewriteHtml(block, !rewriteField(block, "url"));
			break;
		case "htmlBlock":
			rewriteHtml(block);
			break;
		case "buttons": for (const button of block.buttons ?? []) rewriteField(button, "url");
	}
	return {
		changed,
		urlsRewritten
	};
}
/**
* Rewrite URLs in a string field using simple string replacement
*/
function rewriteStringUrls(value, exactMap, baseMap) {
	let newValue = value;
	let changed = false;
	let urlsRewritten = 0;
	for (const [oldUrl, newUrl] of Object.entries(exactMap)) {
		if (!newValue.includes(oldUrl)) continue;
		const replaced = carriesQuery(oldUrl) ? newValue.replace(new RegExp(`${escapeRegExp(oldUrl)}${URL_END}`, "g"), () => newUrl) : newValue.split(oldUrl).join(newUrl);
		if (replaced === newValue) continue;
		newValue = replaced;
		changed = true;
		urlsRewritten++;
	}
	for (const [baseUrl, newUrl] of baseMap.entries()) {
		const regex = buildBaseUrlMatchRegex(baseUrl);
		const matches = newValue.match(regex);
		if (matches) {
			for (const match of matches) if (!exactMap[match]) {
				newValue = newValue.split(match).join(newUrl);
				changed = true;
				urlsRewritten++;
			}
		}
	}
	return {
		newValue,
		changed,
		urlsRewritten
	};
}
/**
* Escape special regex characters in a string
*/
function escapeRegExp(string) {
	return string.replace(REGEX_SPECIAL_CHARS, "\\$&");
}
function stripWordPressImageSizeSuffix(url) {
	return url.replace(WORDPRESS_IMAGE_SIZE_SUFFIX, "");
}
function buildBaseUrlMatchRegex(baseUrl) {
	const extensionMatch = BASE_URL_EXTENSION.exec(baseUrl);
	const basePattern = extensionMatch ? `${escapeRegExp(extensionMatch[1])}(?:-\\d+x\\d+)?${escapeRegExp(extensionMatch[2])}` : escapeRegExp(baseUrl);
	return new RegExp(`${basePattern}(\\?[^"'\\s]*)?${URL_END}`, "g");
}
// node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls.mjs
var rewrite_urls_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false,
	rewriteUrls: () => rewriteUrls
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NO_DB", "Database not initialized", 500);
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpRewriteUrlsBody);
		if (isParseError(body)) return body;
		if (Object.entries(body.urlMap).length === 0) return apiSuccess({
			updated: 0,
			byCollection: {},
			urlsRewritten: 0,
			errors: []
		});
		const getProvider = (id) => emdash.getMediaProvider(id);
		return apiSuccess(await rewriteUrls(emdash.db, body.urlMap, getProvider, body.collections));
	} catch (error) {
		return handleError(error, "Failed to rewrite URLs", "REWRITE_ERROR");
	}
};
async function rewriteUrls(db, urlMap, getProvider, collections, markUsageCollectionStale = markContentMediaUsageCollectionStaleSafely) {
	const { SchemaRegistry } = await import("./registry-B0-O575m_B8jWSyfP.mjs").then((n) => n.r);
	const registry = new SchemaRegistry(db);
	const result = {
		updated: 0,
		byCollection: {},
		urlsRewritten: 0,
		errors: []
	};
	const staleMarkedCollections = /* @__PURE__ */ new Set();
	const staleMarkFailedCollections = /* @__PURE__ */ new Set();
	const markCollectionStale = async (collectionSlug) => {
		if (staleMarkedCollections.has(collectionSlug)) return;
		if (await markUsageCollectionStale(db, collectionSlug, "CONTENT_USAGE_STALE")) {
			staleMarkedCollections.add(collectionSlug);
			staleMarkFailedCollections.delete(collectionSlug);
		} else staleMarkFailedCollections.add(collectionSlug);
	};
	const baseMap = buildBaseUrlMap(urlMap);
	const allCollections = await registry.listCollections();
	const targetCollections = collections?.length ? allCollections.filter((c) => collections.includes(c.slug)) : allCollections;
	try {
		for (const collection of targetCollections) {
			const fields = await registry.listFields(collection.id);
			const portableTextFields = fields.filter((f) => f.type === "portableText");
			const stringFields = fields.filter((f) => ["text", "string"].includes(f.type));
			const mediaFields = fields.filter((f) => ["image", "file"].includes(f.type));
			if (portableTextFields.length === 0 && stringFields.length === 0 && mediaFields.length === 0) continue;
			validateIdentifier(collection.slug, "collection slug");
			const tableName = `ec_${collection.slug}`;
			try {
				const rows = await sql`
				SELECT * FROM ${sql.ref(tableName)}
				WHERE deleted_at IS NULL
			`.execute(db);
				for (const row of rows.rows) {
					let rowUpdated = false;
					const updates = {};
					let rowUrlsRewritten = 0;
					for (const field of portableTextFields) {
						const value = row[field.slug];
						if (!value || typeof value !== "string") continue;
						try {
							const blocks = JSON.parse(value);
							if (!Array.isArray(blocks)) continue;
							const rewriteResult = rewritePortableTextUrls(blocks, urlMap, baseMap);
							if (rewriteResult.changed) {
								updates[field.slug] = JSON.stringify(blocks);
								rowUpdated = true;
								rowUrlsRewritten += rewriteResult.urlsRewritten;
							}
						} catch {
							const stringResult = rewriteStringUrls(value, urlMap, baseMap);
							if (stringResult.changed) {
								updates[field.slug] = stringResult.newValue;
								rowUpdated = true;
								rowUrlsRewritten += stringResult.urlsRewritten;
							}
						}
					}
					for (const field of stringFields) {
						const value = row[field.slug];
						if (!value || typeof value !== "string") continue;
						const stringResult = rewriteStringUrls(value, urlMap, baseMap);
						if (stringResult.changed) {
							updates[field.slug] = stringResult.newValue;
							rowUpdated = true;
							rowUrlsRewritten += stringResult.urlsRewritten;
						}
					}
					for (const field of mediaFields) {
						const value = row[field.slug];
						if (!value || typeof value !== "string") continue;
						const newUrl = findMatchingUrl(extractMediaUrl(value), urlMap, baseMap);
						if (newUrl) {
							try {
								const normalized = await normalizeMediaValue(newUrl, getProvider);
								updates[field.slug] = normalized ? JSON.stringify(normalized) : newUrl;
							} catch {
								updates[field.slug] = newUrl;
							}
							rowUpdated = true;
							rowUrlsRewritten++;
						}
					}
					if (rowUpdated) try {
						let query = db.updateTable(tableName).where("id", "=", row.id);
						for (const [key, value] of Object.entries(updates)) query = query.set({ [key]: value });
						await query.execute();
						result.updated++;
						result.urlsRewritten += rowUrlsRewritten;
						result.byCollection[collection.slug] = (result.byCollection[collection.slug] || 0) + 1;
						await markCollectionStale(collection.slug);
					} catch (updateError) {
						result.errors.push({
							collection: collection.slug,
							id: row.id,
							error: updateError instanceof Error ? updateError.message : "Update failed"
						});
					}
				}
			} catch (queryError) {
				result.errors.push({
					collection: collection.slug,
					id: "*",
					error: queryError instanceof Error ? queryError.message : "Query failed for collection"
				});
			}
		}
	} finally {
		for (const collectionSlug of staleMarkFailedCollections) {
			if (staleMarkedCollections.has(collectionSlug)) continue;
			if (await markUsageCollectionStale(db, collectionSlug, "CONTENT_USAGE_STALE")) staleMarkedCollections.add(collectionSlug);
		}
	}
	return result;
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/rewrite-urls@_@mjs
var page = () => rewrite_urls_exports;
export { page };
