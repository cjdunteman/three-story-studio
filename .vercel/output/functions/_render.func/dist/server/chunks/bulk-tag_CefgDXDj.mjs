import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { b as resolveConfiguredLocale, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { a as resolveLocalizedContentRoutePath, n as localizePath } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { r as taxonomyTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { f as invalidateTermCache } from "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { a as unwrapResult, i as requireDb, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { o as bulkTagBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag.mjs
var bulk_tag_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var TRAILING_SLASHES = /\/+$/;
function titleFor(item, collection) {
	const preferred = collection.titleField && item.data[collection.titleField];
	const title = item.data.title;
	const name = item.data.name;
	return typeof preferred === "string" && preferred || typeof title === "string" && title || typeof name === "string" && name || item.slug || item.id;
}
function normalizedPath(path) {
	return path.replace(TRAILING_SLASHES, "") || "/";
}
async function urlCandidates(url, origin, collections) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}
	if (parsed.origin !== origin || !["https:", "http:"].includes(parsed.protocol)) return null;
	const locales = getI18nConfig()?.locales ?? ["en"];
	const candidates = [];
	for (const collection of collections) {
		const pattern = collection.urlPattern ?? `/${collection.slug}/{slug}`;
		for (const locale of locales) {
			const prefix = await localizePath("/", locale);
			if (!prefix) continue;
			const { regex, paramNames } = compileUrlPattern(`${prefix === "/" ? "" : prefix}${pattern}`);
			const segments = regex.exec(parsed.pathname);
			if (!segments) continue;
			const slugIndex = paramNames.indexOf("slug");
			const idIndex = paramNames.indexOf("id");
			if (slugIndex < 0 && idIndex < 0) continue;
			let identifier;
			try {
				identifier = decodeURIComponent(segments[1 + (slugIndex >= 0 ? slugIndex : idIndex)] ?? "");
			} catch {
				continue;
			}
			candidates.push({
				collection,
				locale,
				identifier,
				by: slugIndex >= 0 ? "slug" : "id"
			});
		}
	}
	return {
		path: parsed.pathname,
		candidates
	};
}
async function handleBulkTag(db, origin, input, invalidate) {
	try {
		const taxonomy = new TaxonomyRepository(db);
		const term = await taxonomy.findById(input.termId);
		if (!term) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Term not found"
			}
		};
		const definitions = await db.selectFrom("_emdash_taxonomy_defs").select("collections").where("name", "=", term.name).execute();
		const allowed = new Set(definitions.flatMap((def) => {
			const parsed = def.collections ? JSON.parse(def.collections) : [];
			return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
		}));
		const collections = (await new SchemaRegistry(db).listCollections()).filter((collection) => allowed.has(collection.slug));
		const byCollection = new Map(collections.map((collection) => [collection.slug, collection]));
		const content = new ContentRepository(db);
		const idNeeds = /* @__PURE__ */ new Map();
		const slugNeeds = /* @__PURE__ */ new Map();
		const parsedUrls = /* @__PURE__ */ new Map();
		for (const [index, source] of input.items.entries()) if ("url" in source) {
			const parsed = await urlCandidates(source.url, origin, collections);
			parsedUrls.set(index, parsed);
			for (const candidate of parsed?.candidates ?? []) if (candidate.by === "id") {
				const ids = idNeeds.get(candidate.collection.slug) ?? /* @__PURE__ */ new Set();
				ids.add(candidate.identifier);
				idNeeds.set(candidate.collection.slug, ids);
			} else {
				const key = `${candidate.collection.slug}:${candidate.locale}`;
				const group = slugNeeds.get(key) ?? {
					collection: candidate.collection.slug,
					locale: candidate.locale,
					slugs: /* @__PURE__ */ new Set()
				};
				group.slugs.add(candidate.identifier);
				slugNeeds.set(key, group);
			}
		} else if (byCollection.has(source.collection)) {
			const ids = idNeeds.get(source.collection) ?? /* @__PURE__ */ new Set();
			ids.add(source.id);
			idNeeds.set(source.collection, ids);
		}
		const byId = /* @__PURE__ */ new Map();
		for (const [collection, ids] of idNeeds) byId.set(collection, await content.findManyByIds(collection, [...ids]));
		const bySlug = /* @__PURE__ */ new Map();
		for (const [key, group] of slugNeeds) bySlug.set(key, await content.findManyBySlugsInLocale(group.collection, [...group.slugs], group.locale, { publishedOnly: true }));
		const prepared = [];
		const groups = /* @__PURE__ */ new Map();
		for (const [index, source] of input.items.entries()) {
			let resolved = "not_found";
			if ("url" in source) {
				const parsed = parsedUrls.get(index);
				const matches = /* @__PURE__ */ new Map();
				for (const candidate of parsed?.candidates ?? []) {
					const item = candidate.by === "id" ? byId.get(candidate.collection.slug)?.get(candidate.identifier) : bySlug.get(`${candidate.collection.slug}:${candidate.locale}`)?.get(candidate.identifier);
					if (!item || item.locale === null || resolveConfiguredLocale(item.locale) !== resolveConfiguredLocale(candidate.locale) || item.status !== "published") continue;
					const canonical = await resolveLocalizedContentRoutePath({
						pattern: candidate.collection.urlPattern ?? `/${candidate.collection.slug}/{slug}`,
						collection: candidate.collection.slug,
						slug: item.slug ?? "",
						id: item.id,
						date: item.publishedAt,
						locale: candidate.locale
					});
					if (canonical && parsed && normalizedPath(canonical) === normalizedPath(parsed.path)) matches.set(`${candidate.collection.slug}:${item.id}`, {
						item,
						collection: candidate.collection
					});
				}
				resolved = matches.size > 1 ? "ambiguous" : matches.values().next().value ?? "not_found";
			} else {
				const collection = byCollection.get(source.collection);
				const item = byId.get(source.collection)?.get(source.id);
				if (item && collection) resolved = {
					item,
					collection
				};
			}
			prepared.push({
				source,
				resolved
			});
			if (typeof resolved !== "string") {
				const collectionGroups = groups.get(resolved.collection.slug) ?? /* @__PURE__ */ new Set();
				collectionGroups.add(resolved.item.translationGroup ?? resolved.item.id);
				groups.set(resolved.collection.slug, collectionGroups);
			}
		}
		const termGroup = term.translationGroup ?? term.id;
		const assigned = /* @__PURE__ */ new Set();
		if (!input.apply) for (const [collection, entryGroups] of groups) for (const batch of chunks([...entryGroups], 50)) {
			const rows = await db.selectFrom("content_taxonomies").select("entry_id").where("collection", "=", collection).where("taxonomy_id", "=", termGroup).where("entry_id", "in", batch).execute();
			for (const row of rows) assigned.add(`${collection}:${row.entry_id}`);
		}
		const siblingIds = /* @__PURE__ */ new Map();
		if (input.apply && invalidate) for (const [collection, entryGroups] of groups) siblingIds.set(collection, await content.findTranslationIdsForGroups(collection, [...entryGroups]));
		const seen = /* @__PURE__ */ new Set();
		const purge = /* @__PURE__ */ new Set([taxonomyTag(term.name)]);
		const results = [];
		let changed = false;
		for (const { source, resolved } of prepared) {
			if (typeof resolved === "string") {
				if (input.apply && input.refreshOnly && invalidate && "id" in source && byCollection.has(source.collection)) {
					purge.add(source.collection);
					purge.add(source.id);
				}
				results.push({
					input: source,
					status: "unmatched",
					reason: resolved
				});
				continue;
			}
			const { item, collection } = resolved;
			const entry = {
				collection: collection.slug,
				id: item.id,
				title: titleFor(item, collection),
				locale: item.locale ?? "en"
			};
			const group = item.translationGroup ?? item.id;
			const key = `${collection.slug}:${group}`;
			if (seen.has(key)) {
				results.push({
					input: source,
					status: "skipped",
					entry
				});
				continue;
			}
			try {
				const inserted = input.apply && !input.refreshOnly ? await taxonomy.attachGroupsToEntry(collection.slug, item.id, [termGroup]) : 0;
				if (inserted) changed = true;
				seen.add(key);
				if (input.apply && invalidate) {
					purge.add(collection.slug);
					for (const id of siblingIds.get(collection.slug)?.get(group) ?? [item.id]) purge.add(id);
				}
				results.push({
					input: source,
					status: input.apply ? inserted ? "added" : "skipped" : assigned.has(key) ? "skipped" : "ready",
					entry
				});
			} catch (error) {
				console.error("[bulk-tag] Failed to tag entry:", error);
				results.push({
					input: source,
					status: "failed",
					reason: "save_failed",
					entry
				});
			}
		}
		if (changed) invalidateTermCache();
		let cacheRefreshFailed = false;
		if (input.apply && invalidate && (purge.size > 1 || input.refreshOnly)) try {
			for (const batch of chunks([...purge], 100)) await invalidate(batch);
		} catch (error) {
			console.error("[bulk-tag] Failed to invalidate cache:", error);
			cacheRefreshFailed = true;
		}
		return {
			success: true,
			data: {
				results,
				cacheRefreshFailed
			}
		};
	} catch (error) {
		console.error("[bulk-tag] Failed:", error);
		return {
			success: false,
			error: {
				code: "BULK_TAG_ERROR",
				message: "Failed to bulk tag posts"
			}
		};
	}
}
var POST = async ({ locals, request, cache }) => {
	const { emdash, user } = locals;
	const dbError = requireDb(emdash?.db);
	if (dbError) return dbError;
	const denied = requirePerm(user, "content:edit_any");
	if (denied) return denied;
	const body = await parseBody(request, bulkTagBody);
	if (isParseError(body)) return body;
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return unwrapResult(await handleBulkTag(emdash.db, getPublicOrigin(new URL(request.url), emdash.config), body, cache?.enabled ? (tags) => cache.invalidate({ tags }) : void 0));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/taxonomies/bulk-tag@_@mjs
var page = () => bulk_tag_exports;
export { page };
