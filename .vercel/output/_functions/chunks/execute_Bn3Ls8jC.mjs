import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { D as wxrChunkState, E as wxrChunkCursor, O as wxrImportConfig } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { b as resolveImportByline, d as importReusableBlocksAsSections, h as parseWxrString, m as parseWxrDate, x as sanitizeCollectionSlug, y as relativizeContentLinks } from "./import-yVbfPyfd_CInIQiy6.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import "./analyze_FQV59a8B.mjs";
import { a as preImportWxrTaxonomies, i as mirrorTermsToLocales, n as isWxrTaxonomyConflictError, o as setPostTermAssignmentsReplacing, r as loadTaxonomyPlanFromDb, t as attachPostTaxonomies } from "./wxr-taxonomies-DbJtWrWM_fdaKewND.mjs";
import "./dist_D1airXGO.mjs";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
// node_modules/emdash/dist/astro/routes/api/import/wordpress/execute.mjs
var execute_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	importContent: () => importContent,
	prerender: () => false
});
/** Posts processed per Worker invocation in chunked WXR imports. */
var WXR_CONTENT_CHUNK_SIZE = 30;
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	if (!emdash?.handleContentCreate) return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	try {
		const emdashManifest = await emdash.getManifest();
		const formData = await request.formData();
		const fileEntry = formData.get("file");
		const file = fileEntry instanceof File ? fileEntry : null;
		const configEntry = formData.get("config");
		const configJson = typeof configEntry === "string" ? configEntry : null;
		if (!file) return apiError("VALIDATION_ERROR", "No file provided", 400);
		if (!configJson) return apiError("VALIDATION_ERROR", "No config provided", 400);
		const parsedConfig = parseJsonField(configJson, "config");
		if ("response" in parsedConfig) return parsedConfig.response;
		const configResult = wxrImportConfig.safeParse(parsedConfig.value);
		if (!configResult.success) return apiError("VALIDATION_ERROR", "Invalid import config", 400);
		const config = configResult.data;
		const phaseEntry = formData.get("phase");
		if (phaseEntry !== null && phaseEntry !== "taxonomy" && phaseEntry !== "content" && phaseEntry !== "finalize") return apiError("VALIDATION_ERROR", "Invalid import phase", 400);
		const phase = phaseEntry;
		const cursorEntry = formData.get("cursor");
		let cursor;
		if (typeof cursorEntry === "string" && cursorEntry.length > 0) {
			const parsedCursor = parseJsonField(cursorEntry, "cursor");
			if ("response" in parsedCursor) return parsedCursor.response;
			const cursorResult = wxrChunkCursor.safeParse(parsedCursor.value);
			if (!cursorResult.success) return apiError("VALIDATION_ERROR", "Invalid import cursor", 400);
			cursor = cursorResult.data;
		}
		const chunkEntry = formData.get("chunk");
		let incomingChunk;
		if (typeof chunkEntry === "string" && chunkEntry.length > 0) {
			const parsedChunk = parseJsonField(chunkEntry, "chunk");
			if ("response" in parsedChunk) return parsedChunk.response;
			const chunkResult = wxrChunkState.safeParse(parsedChunk.value);
			if (!chunkResult.success) return apiError("VALIDATION_ERROR", "Invalid import chunk state", 400);
			incomingChunk = chunkResult.data;
		}
		const text = await file.text();
		const wxr = await parseWxrString(text);
		const source = await importFingerprint(text, configJson);
		if (cursor && cursor.source !== source) return apiError("WXR_IMPORT_SOURCE_CHANGED", "The WXR file or import configuration changed after this import started", 409);
		const attachmentMap = /* @__PURE__ */ new Map();
		for (const att of wxr.attachments) if (att.id && att.url) attachmentMap.set(String(att.id), att.url);
		const authorDisplayNames = /* @__PURE__ */ new Map();
		for (const author of wxr.authors) {
			if (!author.login) continue;
			authorDisplayNames.set(author.login, author.displayName || author.login);
		}
		if (phase === "content") {
			if (!cursor?.taxonomiesReady) return apiError("VALIDATION_ERROR", "Taxonomy preparation is not complete", 400);
			const chunkResponse = await runContentChunk(wxr, config, emdash, emdashManifest, attachmentMap, authorDisplayNames, cursor, incomingChunk, source);
			if (chunkResponse instanceof Response) return chunkResponse;
			return apiSuccess(chunkResponse);
		}
		if (phase === "taxonomy") {
			if (cursor || incomingChunk) return apiError("VALIDATION_ERROR", "Taxonomy preparation cannot be resumed", 400);
			let taxonomyPlan;
			try {
				taxonomyPlan = await prepareTaxonomies(wxr, emdash, config.locale);
			} catch (error) {
				if (isWxrTaxonomyConflictError(error)) {
					console.error("[WXR_IMPORT_TAXONOMY_CONFLICT]", error);
					return apiError("WXR_IMPORT_TAXONOMY_CONFLICT", error.publicMessage, 409);
				}
				throw error;
			}
			const result = emptyImportResult();
			result.taxonomies = {
				termsCreated: taxonomyPlan.termsCreated,
				termsReused: taxonomyPlan.termsReused,
				assignments: 0,
				missingTaxonomies: taxonomyPlan.missingTaxonomies
			};
			return apiSuccess({
				success: true,
				result,
				done: true,
				cursor: {
					offset: 0,
					source,
					taxonomiesReady: true
				},
				chunk: { translationGroups: {} }
			});
		}
		if (phase === "finalize") {
			if (!cursor || cursor.offset !== wxr.posts.length) return apiError("VALIDATION_ERROR", "Content import is not complete", 400);
			const result = emptyImportResult();
			if (config.importSections !== false) {
				const sectionsResult = await importReusableBlocksAsSections(wxr.posts, emdash.db);
				result.sections = {
					created: sectionsResult.sectionsCreated,
					skipped: sectionsResult.sectionsSkipped
				};
				result.errors.push(...sectionsResult.errors);
				result.success = result.errors.length === 0;
			}
			return apiSuccess({
				success: result.success,
				result,
				done: true
			});
		}
		if (wxr.posts.length > WXR_CONTENT_CHUNK_SIZE) return apiError("WXR_IMPORT_TOO_LARGE", `This WXR contains ${wxr.posts.length} posts, which exceeds the ${WXR_CONTENT_CHUNK_SIZE}-post limit for a single import request. Run the import in chunked mode or split the file into smaller exports.`, 413);
		const taxonomyPlan = await preImportWxrTaxonomies(emdash.db, wxr.posts, wxr.categories, wxr.tags, wxr.terms, config.locale);
		const postLocales = /* @__PURE__ */ new Set();
		for (const post of wxr.posts) if (post.locale) postLocales.add(post.locale);
		if (postLocales.size > 0) try {
			await mirrorTermsToLocales(emdash.db, taxonomyPlan, postLocales, config.locale);
		} catch (mirrorError) {
			if (isWxrTaxonomyConflictError(mirrorError)) {
				console.error("[WXR_IMPORT_TAXONOMY_CONFLICT]", mirrorError);
				return apiError("WXR_IMPORT_TAXONOMY_CONFLICT", mirrorError.publicMessage, 409);
			}
			throw mirrorError;
		}
		const result = await importContent(wxr.posts, config, emdash, emdashManifest, attachmentMap, config.locale, authorDisplayNames, taxonomyPlan, /* @__PURE__ */ new Map(), wxr.site.link);
		if (config.importSections !== false) {
			const sectionsResult = await importReusableBlocksAsSections(wxr.posts, emdash.db);
			result.sections = {
				created: sectionsResult.sectionsCreated,
				skipped: sectionsResult.sectionsSkipped
			};
			result.errors.push(...sectionsResult.errors);
			if (sectionsResult.errors.length > 0) result.success = false;
		}
		return apiSuccess(result);
	} catch (error) {
		return handleError(error, "Failed to import content", "WXR_IMPORT_ERROR");
	}
};
function parseJsonField(value, fieldName) {
	try {
		return { value: JSON.parse(value) };
	} catch {
		return { response: apiError("VALIDATION_ERROR", `Invalid JSON in ${fieldName}`, 400) };
	}
}
async function importFingerprint(text, configJson) {
	const bytes = new TextEncoder().encode(`${configJson}\u0000${text}`);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function emptyImportResult() {
	return {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {}
	};
}
/** Import a bounded WXR post chunk using taxonomy rows prepared in the prior phase. */
async function runContentChunk(wxr, config, emdash, manifest, attachmentMap, authorDisplayNames, cursor, incomingChunk, source) {
	const offset = cursor?.offset ?? 0;
	if (offset > wxr.posts.length || offset > 0 && offset % WXR_CONTENT_CHUNK_SIZE !== 0) return apiError("VALIDATION_ERROR", "Invalid import cursor offset", 400);
	const posts = wxr.posts.slice(offset, offset + WXR_CONTENT_CHUNK_SIZE);
	const taxonomyPlan = await loadTaxonomyPlanFromDb(emdash.db);
	const translationGroupMap = new Map(Object.entries(incomingChunk?.translationGroups ?? {}));
	const result = await importContent(posts, config, emdash, manifest, attachmentMap, config.locale, authorDisplayNames, taxonomyPlan, translationGroupMap, wxr.site.link);
	const nextOffset = offset + posts.length;
	const done = nextOffset >= wxr.posts.length;
	return {
		success: result.errors.length === 0,
		result,
		done,
		cursor: {
			offset: nextOffset,
			source,
			taxonomiesReady: true
		},
		chunk: { translationGroups: Object.fromEntries(translationGroupMap) }
	};
}
async function prepareTaxonomies(wxr, emdash, locale) {
	const taxonomyPlan = await preImportWxrTaxonomies(emdash.db, wxr.posts, wxr.categories, wxr.tags, wxr.terms, locale);
	const postLocales = /* @__PURE__ */ new Set();
	for (const post of wxr.posts) if (post.locale) postLocales.add(post.locale);
	if (postLocales.size > 0) await mirrorTermsToLocales(emdash.db, taxonomyPlan, postLocales, locale);
	return taxonomyPlan;
}
async function importContent(posts, config, emdash, manifest, attachmentMap, locale, authorDisplayNames, taxonomyPlan, translationGroupMap = /* @__PURE__ */ new Map(), siteUrl = "") {
	const result = {
		success: true,
		imported: 0,
		skipped: 0,
		errors: [],
		byCollection: {},
		taxonomies: {
			termsCreated: taxonomyPlan.termsCreated,
			termsReused: taxonomyPlan.termsReused,
			assignments: 0,
			missingTaxonomies: taxonomyPlan.missingTaxonomies
		}
	};
	const contentRepo = new ContentRepository(emdash.db);
	const bylineRepo = new BylineRepository(emdash.db);
	const bylineCache = /* @__PURE__ */ new Map();
	for (const post of posts) {
		const postType = post.postType || "post";
		const mapping = config.postTypeMappings[postType];
		if (!mapping || !mapping.enabled) continue;
		const collection = sanitizeCollectionSlug(mapping.collection);
		if (!manifest?.collections[collection]) {
			result.errors.push({
				title: post.title || "Untitled",
				error: `Collection "${collection}" does not exist`
			});
			continue;
		}
		try {
			const content = post.content ? gutenbergToPortableText(post.content) : [];
			if (siteUrl) relativizeContentLinks(content, siteUrl);
			const slug = post.postName || slugify(post.title || `post-${post.id || Date.now()}`);
			const postLocale = post.locale ?? locale;
			if (config.skipExisting) {
				const existing = await contentRepo.findBySlug(collection, slug, postLocale);
				if (existing) {
					if (post.translationGroup) translationGroupMap.set(post.translationGroup, existing.id);
					result.skipped++;
					continue;
				}
			}
			let translationOf;
			if (post.translationGroup) translationOf = translationGroupMap.get(post.translationGroup);
			const status = mapStatus(post.status);
			const data = {
				title: post.title || "Untitled",
				content,
				excerpt: post.excerpt || void 0
			};
			const collectionSchema = manifest.collections[collection];
			if (collectionSchema?.fields ? "featured_image" in collectionSchema.fields : false) {
				const thumbnailId = post.meta.get("_thumbnail_id");
				const featuredImage = thumbnailId ? attachmentMap.get(String(thumbnailId)) : void 0;
				if (featuredImage) data.featured_image = featuredImage;
			}
			let authorId;
			if (config.authorMappings && post.creator) {
				const mappedUserId = config.authorMappings[post.creator];
				if (mappedUserId !== void 0 && mappedUserId !== null) authorId = mappedUserId;
			}
			const bylineId = await resolveImportByline(post.creator, authorDisplayNames?.get(post.creator ?? "") ?? post.creator, authorId, bylineRepo, bylineCache);
			const parsedDate = parseWxrDate(post.postDateGmt, post.pubDate, post.postDate);
			const createdAt = parsedDate ? parsedDate.toISOString() : void 0;
			const publishedAt = status === "published" && createdAt ? createdAt : void 0;
			const createResult = await emdash.handleContentCreate(collection, {
				data,
				slug,
				status,
				authorId,
				bylines: bylineId ? [{ bylineId }] : void 0,
				locale: postLocale,
				translationOf,
				createdAt,
				publishedAt
			});
			if (createResult.success) {
				result.imported++;
				result.byCollection[collection] = (result.byCollection[collection] || 0) + 1;
				const createdItem = createResult.data?.item;
				if (createdItem && post.translationGroup && !translationGroupMap.has(post.translationGroup)) translationGroupMap.set(post.translationGroup, createdItem.id);
				if (createdItem) try {
					const written = translationOf ? await setPostTermAssignmentsReplacing(emdash.db, collection, createdItem.id, post, taxonomyPlan) : await attachPostTaxonomies(emdash.db, collection, createdItem.id, post, taxonomyPlan);
					if (result.taxonomies) result.taxonomies.assignments += written;
				} catch (taxError) {
					console.error(`Failed to attach taxonomies for "${post.title || "Untitled"}":`, taxError);
					result.errors.push({
						title: post.title || "Untitled",
						error: taxError instanceof Error && taxError.message ? `Imported but failed to attach taxonomies: ${taxError.message}` : "Imported but failed to attach taxonomies"
					});
				}
				if (createdItem && post.status === "future" && createdAt && Date.parse(createdAt) > Date.now()) {
					const scheduled = await emdash.handleContentSchedule(collection, createdItem.id, createdAt);
					if (!scheduled.success) result.errors.push({
						title: post.title || "Untitled",
						error: `Imported as draft but failed to schedule: ${scheduled.error?.message ?? "Unknown error"}`
					});
				}
			} else result.errors.push({
				title: post.title || "Untitled",
				error: typeof createResult.error === "object" && createResult.error !== null ? createResult.error.message || "Unknown error" : String(createResult.error)
			});
		} catch (error) {
			console.error(`Import error for "${post.title || "Untitled"}":`, error);
			result.errors.push({
				title: post.title || "Untitled",
				error: error instanceof Error && error.message ? error.message : "Failed to import item"
			});
		}
	}
	result.success = result.errors.length === 0;
	return result;
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
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress/execute@_@mjs
var page = () => execute_exports;
export { page };
