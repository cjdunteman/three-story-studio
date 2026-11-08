import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import "./dist-BUmWMTbN_CDkCCJct.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import "./enrich-DFlfnd3u_DIfIr-b4.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import { t as handleTaxonomyCreate } from "./taxonomies-5SR76j11_BpsROtKh.mjs";
import { r as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { C as wpPluginExecuteBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { S as sanitizeFieldSlug, a as fetchPluginMenus, b as resolveImportByline, c as getSource, f as importSiteSettings, i as fetchPluginContentPage, l as importCommentsFromPlugin, n as fetchPluginComments, o as fetchPluginOptions, p as parseSiteSettingsFromPlugin, r as fetchPluginCommentsPage, s as fetchPluginTaxonomies, t as SiteChallengeError, u as importMenusFromPlugin, x as sanitizeCollectionSlug } from "./import-yVbfPyfd_CInIQiy6.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { a as preImportWxrTaxonomies, r as loadTaxonomyPlanFromDb, t as attachPostTaxonomies } from "./wxr-taxonomies-DbJtWrWM_fdaKewND.mjs";
import { t as importMediaWithProgress } from "./media_4hCXqg9c.mjs";
import "./dist_D1airXGO.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute.mjs
var execute_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	coerceToFieldType: () => coerceToFieldType,
	ensureCustomTaxonomyDefs: () => ensureCustomTaxonomyDefs,
	importContent: () => importContent,
	prerender: () => false
});
/** Posts per content chunk. 50 posts ≈ a few hundred D1 ops per invocation. */
var CONTENT_CHUNK_SIZE = 50;
function emptyImportResult() {
	return {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {}
	};
}
function parseIdMap(idMap) {
	const contentIdMap = /* @__PURE__ */ new Map();
	const collectionByWpId = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(idMap ?? {})) {
		const wpId = Number(key);
		if (!Number.isFinite(wpId)) continue;
		contentIdMap.set(wpId, value.id);
		collectionByWpId.set(wpId, value.collection);
	}
	return {
		contentIdMap,
		collectionByWpId
	};
}
function serializeIdMap(contentIdMap, collectionByWpId) {
	const out = {};
	for (const [wpId, id] of contentIdMap) {
		const collection = collectionByWpId.get(wpId);
		if (collection) out[String(wpId)] = {
			id,
			collection
		};
	}
	return out;
}
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	if (!emdash?.handleContentCreate) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	try {
		const emdashManifest = await emdash.getManifest();
		const body = await parseBody(request, wpPluginExecuteBody);
		if (isParseError(body)) return body;
		try {
			await resolveAndValidateExternalUrl(body.url);
		} catch (e) {
			return apiError("SSRF_BLOCKED", e instanceof SsrfError ? e.message : "Invalid URL", 400);
		}
		const config = body.config;
		const source = getSource("wordpress-plugin");
		if (!source) return apiError("NOT_CONFIGURED", "WordPress plugin source not available", 500);
		const postTypes = Object.entries(config.postTypeMappings).filter(([_, mapping]) => mapping.enabled).map(([postType]) => postType);
		if (postTypes.length === 0) return apiError("VALIDATION_ERROR", "No post types selected for import", 400);
		console.log("[WP Plugin Import] Starting import for:", body.url);
		console.log("[WP Plugin Import] Post types:", postTypes);
		if (body.phase) return apiSuccess(await runImportPhase(emdash, body, config, postTypes, emdashManifest));
		let taxonomyPlan;
		let taxonomyDefsCreated = [];
		try {
			const built = await buildTaxonomyPlan(emdash, body.url, body.token, config);
			taxonomyPlan = built.plan;
			taxonomyDefsCreated = built.defsCreated;
		} catch (e) {
			if (e instanceof SiteChallengeError) throw e;
			console.warn("[WP Plugin Import] Taxonomy pre-import failed:", e);
		}
		const { result, contentIdMap, collectionByWpId } = await importContent(source.fetchContent({
			type: "url",
			url: body.url,
			token: body.token
		}, {
			postTypes,
			includeDrafts: true
		}), config, emdash, emdashManifest, taxonomyPlan);
		if (config.importMenus !== false) await importMenusInto(result, emdash, body.url, body.token, contentIdMap);
		try {
			const comments = await fetchPluginComments(body.url, body.token);
			if (comments.length > 0) {
				const commentsResult = await importCommentsFromPlugin(comments, emdash.db, contentIdMap, collectionByWpId);
				result.comments = {
					imported: commentsResult.imported,
					skipped: commentsResult.skipped
				};
				for (const commentError of commentsResult.errors) result.errors.push({
					title: `Comment: ${commentError.comment}`,
					error: commentError.error
				});
			}
		} catch (e) {
			if (e instanceof SiteChallengeError) throw e;
			console.warn("[WP Plugin Import] Comment import failed:", e);
		}
		try {
			result.siteSettings = await applySiteSettings(emdash, body.url, body.token, config);
		} catch (e) {
			if (e instanceof SiteChallengeError) throw e;
			console.warn("[WP Plugin Import] Site settings import failed:", e);
		}
		if (taxonomyDefsCreated.length > 0) result.taxonomiesCreated = taxonomyDefsCreated;
		console.log("[WP Plugin Import] Import result:", JSON.stringify(result, null, 2));
		return apiSuccess({
			success: true,
			result
		});
	} catch (error) {
		if (error instanceof SiteChallengeError) return apiError("WP_SITE_CHALLENGE", error.message, 502);
		return handleError(error, "Failed to import from WordPress", "WP_PLUGIN_IMPORT_ERROR");
	}
};
/**
* Import navigation menus into `result`, resolving item references through
* the WP-post-ID -> EmDash-ID map collected during the content pass.
* Non-fatal: older plugin versions have no /menus endpoint.
*/
async function importMenusInto(result, emdash, url, token, contentIdMap) {
	try {
		const menus = await fetchPluginMenus(url, token);
		if (menus.length > 0) {
			const menuResult = await importMenusFromPlugin(menus, emdash.db, contentIdMap);
			result.menus = {
				created: menuResult.menusCreated,
				items: menuResult.itemsCreated
			};
			for (const menuError of menuResult.errors) result.errors.push({
				title: `Menu: ${menuError.menu}`,
				error: menuError.error
			});
		}
	} catch (e) {
		if (e instanceof SiteChallengeError) throw e;
		console.warn("[WP Plugin Import] Menu import failed:", e);
	}
}
/** Dispatch one chunk of work for the requested phase. */
async function runImportPhase(emdash, body, config, postTypes, manifest) {
	switch (body.phase) {
		case "content": return runContentChunk(emdash, body, config, postTypes, manifest);
		case "comments": return runCommentsChunk(emdash, body);
		case "finalize": return runFinalizePhase(emdash, body, config);
		case void 0: throw new Error("runImportPhase called without a phase");
		default:
			body.phase;
			throw new Error("Unknown import phase");
	}
}
/**
* Import one page of one post type. The first chunk additionally runs the
* taxonomy setup (def + term creation); later chunks only reload the
* lookup maps from the database.
*/
async function runContentChunk(emdash, body, config, postTypes, manifest) {
	const cursor = body.cursor ?? {
		postTypeIndex: 0,
		page: 1
	};
	const postType = postTypes[cursor.postTypeIndex];
	if (!postType) return {
		success: true,
		result: emptyImportResult(),
		done: true
	};
	const isFirstChunk = cursor.postTypeIndex === 0 && cursor.page === 1;
	let taxonomyPlan;
	let taxonomyDefsCreated = [];
	try {
		if (isFirstChunk) {
			const built = await buildTaxonomyPlan(emdash, body.url, body.token, config);
			taxonomyPlan = built.plan;
			taxonomyDefsCreated = built.defsCreated;
		} else taxonomyPlan = await loadTaxonomyPlanFromDb(emdash.db);
	} catch (e) {
		if (e instanceof SiteChallengeError) throw e;
		console.warn("[WP Plugin Import] Taxonomy pre-import failed:", e);
	}
	const page = await fetchPluginContentPage({
		siteUrl: body.url,
		token: body.token,
		postType,
		page: cursor.page,
		perPage: CONTENT_CHUNK_SIZE,
		includeDrafts: true
	});
	const translationGroupMap = new Map(Object.entries(body.translationGroups ?? {}));
	const { result, contentIdMap, collectionByWpId } = await importContent(page.items, config, emdash, manifest, taxonomyPlan, translationGroupMap);
	if (taxonomyDefsCreated.length > 0) result.taxonomiesCreated = taxonomyDefsCreated;
	let next;
	if (cursor.page < page.totalPages) next = {
		postTypeIndex: cursor.postTypeIndex,
		page: cursor.page + 1
	};
	else if (cursor.postTypeIndex + 1 < postTypes.length) next = {
		postTypeIndex: cursor.postTypeIndex + 1,
		page: 1
	};
	return {
		success: true,
		result,
		done: next === void 0,
		cursor: next,
		chunk: {
			idMap: serializeIdMap(contentIdMap, collectionByWpId),
			translationGroups: Object.fromEntries(translationGroupMap)
		}
	};
}
/**
* Import one page of comments (500 per page, ordered by WP comment ID so
* parents precede children across pages). Requires the accumulated idMap
* from the content phase; threading roots accumulate in `commentRoots`.
*/
async function runCommentsChunk(emdash, body) {
	const page = body.cursor?.page ?? 1;
	const result = emptyImportResult();
	const { contentIdMap, collectionByWpId } = parseIdMap(body.idMap);
	const rootIds = /* @__PURE__ */ new Map();
	for (const [key, value] of Object.entries(body.commentRoots ?? {})) {
		const wpId = Number(key);
		if (Number.isFinite(wpId)) rootIds.set(wpId, value);
	}
	const { items, totalPages } = await fetchPluginCommentsPage(body.url, body.token, page);
	if (items.length > 0) {
		const commentsResult = await importCommentsFromPlugin(items, emdash.db, contentIdMap, collectionByWpId, rootIds);
		result.comments = {
			imported: commentsResult.imported,
			skipped: commentsResult.skipped
		};
		for (const commentError of commentsResult.errors) result.errors.push({
			title: `Comment: ${commentError.comment}`,
			error: commentError.error
		});
		result.success = result.errors.length === 0;
	}
	const done = page >= totalPages;
	const commentRoots = {};
	for (const [wpId, id] of rootIds) commentRoots[String(wpId)] = id;
	return {
		success: true,
		result,
		done,
		cursor: done ? void 0 : {
			postTypeIndex: 0,
			page: page + 1
		},
		chunk: { commentRoots }
	};
}
/** Menus + site identity — small, runs as a single closing chunk. */
async function runFinalizePhase(emdash, body, config) {
	const result = emptyImportResult();
	const { contentIdMap } = parseIdMap(body.idMap);
	if (config.importMenus !== false) await importMenusInto(result, emdash, body.url, body.token, contentIdMap);
	try {
		result.siteSettings = await applySiteSettings(emdash, body.url, body.token, config);
	} catch (e) {
		if (e instanceof SiteChallengeError) throw e;
		console.warn("[WP Plugin Import] Site settings import failed:", e);
	}
	result.success = result.errors.length === 0;
	return {
		success: true,
		result,
		done: true
	};
}
/** Fields that should be auto-created if they don't exist */
var IMPORT_FIELDS = [
	{
		slug: "title",
		label: "Title",
		type: "string",
		check: () => true
	},
	{
		slug: "content",
		label: "Content",
		type: "portableText",
		check: () => true
	},
	{
		slug: "excerpt",
		label: "Excerpt",
		type: "text",
		check: (item) => !!item.excerpt
	},
	{
		slug: "featured_image",
		label: "Featured Image",
		type: "image",
		check: (item) => !!item.featuredImage
	},
	{
		slug: "seo_title",
		label: "SEO Title",
		type: "string",
		check: (item) => !!extractSeo(item).title
	},
	{
		slug: "seo_description",
		label: "SEO Description",
		type: "text",
		check: (item) => !!extractSeo(item).description
	}
];
var SEO_FIELD_SLUGS = /* @__PURE__ */ new Set(["seo_title", "seo_description"]);
/**
* Coerce a WordPress meta value to an EmDash field type. WP postmeta is
* stringly typed and inconsistent across posts (the same key can hold
* "5", 5, "", or false). Returns `undefined` when the value can't
* reasonably represent the target type — the caller drops it.
*/
function coerceToFieldType(value, fieldType) {
	switch (fieldType) {
		case "integer": {
			const n = typeof value === "number" ? value : Number(value);
			return Number.isInteger(n) ? n : void 0;
		}
		case "number": {
			const n = typeof value === "number" ? value : Number(value);
			return Number.isFinite(n) ? n : void 0;
		}
		case "boolean":
			if (typeof value === "boolean") return value;
			if (value === 1 || value === "1" || value === "true" || value === "yes") return true;
			if (value === 0 || value === "0" || value === "false" || value === "no") return false;
			return;
		case "datetime": {
			if (typeof value !== "string" && typeof value !== "number") return void 0;
			const d = new Date(value);
			return Number.isNaN(d.getTime()) ? void 0 : d.toISOString();
		}
		case "json": return value;
		case "string":
		case "text":
		case "url":
		case "select":
		case "slug":
		case "reference":
			if (typeof value === "string") return value;
			if (typeof value === "number") return String(value);
			return;
		default: return typeof value === "object" ? value : void 0;
	}
}
/**
* ACF relationship, post object, user and taxonomy fields set to the object
* return format give WP_Post, WP_User and WP_Term objects, and a user field's
* default array format gives the user's email and profile. Exporters that
* pass them through send a related post's content and password or a user's
* password hash. Keep only the IDs.
*/
function reduceWordPressObjects(value) {
	if (Array.isArray(value)) return value.map(reduceWordPressObjects);
	if (typeof value !== "object" || value === null) return value;
	const record = value;
	if ("ID" in record && ("post_type" in record || "cap_key" in record || "user_email" in record)) return record.ID;
	if ("term_id" in record && "taxonomy" in record) return record.term_id;
	return Object.fromEntries(Object.entries(record).map(([key, entry]) => [key, reduceWordPressObjects(entry)]));
}
/**
* Pull the per-post SEO title/description out of the Yoast / Rank Math
* blobs the plugin source stashes in `item.meta`. Empty strings mean "not
* overridden for this post" (the plugin exports the raw meta values) and
* are treated as absent.
*/
function pickSeoValue(blob, key) {
	if (typeof blob !== "object" || blob === null) return void 0;
	const value = blob[key];
	return typeof value === "string" && value.trim() !== "" ? value : void 0;
}
function extractSeo(item) {
	const yoast = item.meta?._yoast;
	const rankmath = item.meta?._rankmath;
	return {
		title: pickSeoValue(yoast, "title") ?? pickSeoValue(rankmath, "title"),
		description: pickSeoValue(yoast, "description") ?? pickSeoValue(rankmath, "description")
	};
}
/**
* Fetch the site's taxonomies from the plugin API and pre-create all terms,
* reusing the WXR taxonomy machinery (same def-lookup, idempotency, and
* collection-filter semantics).
*/
/** WP built-in taxonomies that either map to seeded defs or are not content taxonomies. */
var BUILTIN_TAXONOMIES = /* @__PURE__ */ new Set([
	"category",
	"post_tag",
	"nav_menu",
	"post_format"
]);
/** Mirrors NAME_PATTERN in the taxonomy handler -- names that fail stay in missingTaxonomies. */
var TAXONOMY_NAME_PATTERN = /^[a-z][a-z0-9_]*$/;
/**
* Create EmDash taxonomy defs for custom WP taxonomies (e.g. CPT taxonomies
* like `company` or `plattform`) that don't exist yet, scoped to the
* collections the enabled post-type mappings target. Returns the names of
* the defs created. Runs before term pre-import so the terms and per-post
* assignments flow through the existing machinery instead of being dropped
* as `missingTaxonomies`.
*/
async function ensureCustomTaxonomyDefs(db, taxonomies, config) {
	const created = [];
	for (const taxonomy of taxonomies) {
		if (BUILTIN_TAXONOMIES.has(taxonomy.name)) continue;
		if (taxonomy.terms.length === 0) continue;
		if (!TAXONOMY_NAME_PATTERN.test(taxonomy.name)) continue;
		if (await db.selectFrom("_emdash_taxonomy_defs").select("id").where("name", "=", taxonomy.name).executeTakeFirst()) continue;
		const collections = (taxonomy.post_types ?? []).map((postType) => config.postTypeMappings[postType]).filter((mapping) => mapping?.enabled).map((mapping) => sanitizeCollectionSlug(mapping.collection));
		const result = await handleTaxonomyCreate(db, {
			name: taxonomy.name,
			label: taxonomy.label,
			labelSingular: taxonomy.label_singular,
			hierarchical: taxonomy.hierarchical,
			collections: [...new Set(collections)]
		});
		if (result.success) created.push(taxonomy.name);
		else console.warn(`[WP Plugin Import] Could not create taxonomy '${taxonomy.name}':`, result.error.message);
	}
	return created;
}
async function buildTaxonomyPlan(emdash, url, token, config) {
	const taxonomies = await fetchPluginTaxonomies(url, token);
	const defsCreated = await ensureCustomTaxonomyDefs(emdash.db, taxonomies, config);
	const categories = [];
	const tags = [];
	const terms = [];
	for (const taxonomy of taxonomies) for (const term of taxonomy.terms) if (taxonomy.name === "category") categories.push({
		nicename: term.slug,
		name: term.name,
		description: term.description
	});
	else if (taxonomy.name === "post_tag") tags.push({
		slug: term.slug,
		name: term.name,
		description: term.description
	});
	else if (taxonomy.name !== "nav_menu" && taxonomy.name !== "post_format") terms.push({
		id: term.id,
		taxonomy: taxonomy.name,
		slug: term.slug,
		name: term.name,
		description: term.description
	});
	return {
		plan: await preImportWxrTaxonomies(emdash.db, [], categories, tags, terms, void 0),
		defsCreated
	};
}
/**
* Fetch the source site's options and apply its identity (title, tagline,
* logo, favicon) as EmDash site settings, overwriting seed placeholders.
* Logo/favicon files are side-loaded into media storage first; the later
* full media pass dedupes them by content hash.
*
* Returns the list of applied setting keys.
*/
async function applySiteSettings(emdash, url, token, config) {
	const wantTitle = config.importSiteTitle !== false;
	const wantLogo = config.importLogo !== false;
	if (!wantTitle && !wantLogo) return [];
	const parsed = parseSiteSettingsFromPlugin(await fetchPluginOptions(url, token));
	if (!wantTitle) {
		delete parsed.title;
		delete parsed.tagline;
	}
	if (!wantLogo) {
		delete parsed.logo;
		delete parsed.favicon;
	}
	const media = {};
	if (emdash.storage && (parsed.logo?.url || parsed.favicon?.url)) {
		const attachments = [];
		if (parsed.logo?.url) attachments.push({
			id: parsed.logo.id,
			url: parsed.logo.url
		});
		if (parsed.favicon?.url && parsed.favicon.url !== parsed.logo?.url) attachments.push({
			id: parsed.favicon.id,
			url: parsed.favicon.url
		});
		const mediaResult = await importMediaWithProgress(attachments, emdash.db, emdash.storage, () => {});
		for (const item of mediaResult.imported) {
			if (item.originalUrl === parsed.logo?.url) media.logoMediaId = item.mediaId;
			if (item.originalUrl === parsed.favicon?.url) media.faviconMediaId = item.mediaId;
		}
	}
	const settingsResult = await importSiteSettings(parsed, emdash.db, true, media);
	for (const settingError of settingsResult.errors) console.warn(`[WP Plugin Import] Site setting "${settingError.setting}" failed:`, settingError.error);
	return settingsResult.applied;
}
/**
* Adapt a NormalizedItem's taxonomy assignments to the WxrPost shape the
* shared attach helper consumes.
*/
function toWxrAssignments(item) {
	return {
		categories: item.categories ?? [],
		tags: item.tags ?? [],
		customTaxonomies: item.customTaxonomies ? new Map(Object.entries(item.customTaxonomies)) : void 0,
		meta: /* @__PURE__ */ new Map()
	};
}
/** Exported for tests (field auto-creation regression coverage). */
async function importContent(items, config, emdash, manifest, taxonomyPlan, seedTranslationGroups) {
	const result = {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {}
	};
	const contentIdMap = /* @__PURE__ */ new Map();
	const collectionByWpId = /* @__PURE__ */ new Map();
	const contentRepo = new ContentRepository(emdash.db);
	const bylineRepo = new BylineRepository(emdash.db);
	const bylineCache = /* @__PURE__ */ new Map();
	const schemaRegistry = new SchemaRegistry(emdash.db);
	const ensuredFields = /* @__PURE__ */ new Set();
	const fieldTypesByCollection = /* @__PURE__ */ new Map();
	const translationGroupMap = seedTranslationGroups ?? /* @__PURE__ */ new Map();
	for await (const item of items) {
		console.log("[WP Plugin Import] Processing item:", {
			sourceId: item.sourceId,
			title: item.title,
			postType: item.postType,
			status: item.status,
			contentBlocks: Array.isArray(item.content) ? item.content.length : 0,
			featuredImage: item.featuredImage,
			locale: item.locale,
			translationGroup: item.translationGroup
		});
		const mapping = config.postTypeMappings[item.postType];
		if (!mapping || !mapping.enabled) continue;
		const collection = sanitizeCollectionSlug(mapping.collection);
		if (!manifest?.collections[collection]) {
			result.errors.push({
				title: item.title || "Untitled",
				error: `Collection "${collection}" does not exist`
			});
			continue;
		}
		try {
			for (const field of IMPORT_FIELDS) {
				if (config.importSeo === false && SEO_FIELD_SLUGS.has(field.slug)) continue;
				const ensureKey = `${collection}:${field.slug}`;
				if (ensuredFields.has(ensureKey) || !field.check(item)) continue;
				ensuredFields.add(ensureKey);
				if (!await schemaRegistry.getField(collection, field.slug)) {
					console.log(`[WP Plugin Import] Creating missing field "${field.slug}" in collection "${collection}"`);
					try {
						await schemaRegistry.createField(collection, {
							slug: field.slug,
							label: field.label,
							type: field.type,
							required: false
						});
						fieldTypesByCollection.get(collection)?.set(field.slug, field.type);
					} catch (e) {
						console.log(`[WP Plugin Import] Field "${field.slug}" creation skipped:`, e instanceof Error ? e.message : e);
					}
				}
			}
			let fieldTypes = fieldTypesByCollection.get(collection);
			if (!fieldTypes) {
				fieldTypes = /* @__PURE__ */ new Map();
				const collectionDef = await schemaRegistry.getCollection(collection);
				if (collectionDef) for (const field of await schemaRegistry.listFields(collectionDef.id)) fieldTypes.set(field.slug, field.type);
				fieldTypesByCollection.set(collection, fieldTypes);
			}
			const slug = item.slug || slugify(item.title || `post-${item.sourceId}`);
			if (config.skipExisting) {
				const existing = await contentRepo.findBySlug(collection, slug, item.locale);
				if (existing) {
					if (item.translationGroup) translationGroupMap.set(item.translationGroup, existing.id);
					const wpId = Number(item.sourceId);
					if (Number.isFinite(wpId)) {
						contentIdMap.set(wpId, existing.id);
						collectionByWpId.set(wpId, collection);
					}
					result.skipped++;
					continue;
				}
			}
			const status = mapStatus(item.status);
			const data = {};
			data.title = item.title || "Untitled";
			data.content = item.content;
			if (item.excerpt) data.excerpt = item.excerpt;
			if (item.featuredImage) {
				data.featured_image = item.featuredImage;
				console.log("[WP Plugin Import] Adding featured_image:", item.featuredImage);
			}
			if (config.importSeo !== false) {
				const seo = extractSeo(item);
				if (seo.title) data.seo_title = seo.title;
				if (seo.description) data.seo_description = seo.description;
			}
			const assignMetaValue = (key, value) => {
				if (value === null || value === "") return;
				const fieldSlug = sanitizeFieldSlug(key);
				const fieldType = fieldTypes.get(fieldSlug);
				if (!fieldType || fieldSlug in data) return;
				const coerced = coerceToFieldType(value, fieldType);
				if (coerced !== void 0) data[fieldSlug] = coerced;
			};
			const acf = item.meta?._acf;
			if (typeof acf === "object" && acf !== null) for (const [key, value] of Object.entries(acf)) assignMetaValue(key, reduceWordPressObjects(value));
			if (item.meta) for (const [key, value] of Object.entries(item.meta)) {
				if (key.startsWith("_")) continue;
				assignMetaValue(key, value);
			}
			let authorId;
			if (config.authorMappings && item.author) {
				const mappedUserId = config.authorMappings[item.author];
				if (mappedUserId !== void 0 && mappedUserId !== null) authorId = mappedUserId;
			}
			const bylineId = await resolveImportByline(item.author, item.author, authorId, bylineRepo, bylineCache);
			let translationOf;
			if (item.translationGroup) {
				const existingGroupItem = translationGroupMap.get(item.translationGroup);
				if (existingGroupItem) translationOf = existingGroupItem;
			}
			const itemDateTime = item.date?.getTime();
			const createdAt = itemDateTime !== void 0 && !Number.isNaN(itemDateTime) ? item.date.toISOString() : void 0;
			const publishedAt = status === "published" && createdAt ? createdAt : void 0;
			const createResult = await emdash.handleContentCreate(collection, {
				data,
				slug,
				status,
				authorId,
				bylines: bylineId ? [{ bylineId }] : void 0,
				locale: item.locale,
				translationOf,
				createdAt,
				publishedAt
			});
			if (createResult.success) {
				result.imported++;
				result.byCollection[collection] = (result.byCollection[collection] || 0) + 1;
				const createdId = createResult.data?.item?.id;
				if (createdId) {
					const wpId = Number(item.sourceId);
					if (Number.isFinite(wpId)) {
						contentIdMap.set(wpId, createdId);
						collectionByWpId.set(wpId, collection);
					}
					if (taxonomyPlan) try {
						const attached = await attachPostTaxonomies(emdash.db, collection, createdId, toWxrAssignments(item), taxonomyPlan);
						if (attached > 0) result.taxonomyAssignments = (result.taxonomyAssignments ?? 0) + attached;
					} catch (e) {
						console.warn(`[WP Plugin Import] Taxonomy attach failed for "${slug}":`, e);
					}
				}
				if (item.translationGroup && !translationGroupMap.has(item.translationGroup) && createdId) translationGroupMap.set(item.translationGroup, createdId);
				if (createdId && item.status === "future" && createdAt && Date.parse(createdAt) > Date.now()) {
					const scheduled = await emdash.handleContentSchedule(collection, createdId, createdAt);
					if (!scheduled.success) result.errors.push({
						title: item.title || "Untitled",
						error: `Imported as draft but failed to schedule: ${scheduled.error?.message ?? "Unknown error"}`
					});
				}
			} else result.errors.push({
				title: item.title || "Untitled",
				error: typeof createResult.error === "object" && createResult.error !== null ? createResult.error.message || "Unknown error" : String(createResult.error)
			});
		} catch (error) {
			console.error(`Import error for "${item.title || "Untitled"}":`, error);
			result.errors.push({
				title: item.title || "Untitled",
				error: error instanceof Error && error.message ? error.message : "Failed to import item"
			});
		}
	}
	if (taxonomyPlan && taxonomyPlan.missingTaxonomies.length > 0) result.missingTaxonomies = taxonomyPlan.missingTaxonomies;
	result.success = result.errors.length === 0;
	return {
		result,
		contentIdMap,
		collectionByWpId
	};
}
function mapStatus(wpStatus) {
	switch (wpStatus) {
		case "publish": return "published";
		case "draft": return "draft";
		case "pending": return "draft";
		case "private": return "draft";
		default: return "draft";
	}
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/execute@_@mjs
var page = () => execute_exports;
export { page };
