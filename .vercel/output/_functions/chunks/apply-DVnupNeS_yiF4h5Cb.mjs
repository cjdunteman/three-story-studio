import { _ as getLocaleRank, a as __exportAll, b as resolveConfiguredLocale, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { c as executeAtomicBatchIfSupported, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import { n as localeMatches, r as localeOrder } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { d as invalidateMenuObjectCache, h as invalidateWidgetObjectCache, i as coalesceObjectCacheWrites } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { n as RevisionRepository } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { t as RedirectRepository } from "./redirect-DjLdw427_BDBqyEyI.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import { t as INTERNAL_MEDIA_PREFIX } from "./normalize-Cx-bNwhP_BPRa8oa2.mjs";
import { t as imageSize } from "./dist-BUmWMTbN_CDkCCJct.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { b as saveTaxonomyStructure, d as findTaxonomyStructure } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { M as markContentMediaUsageCollectionStaleSafely, d as SchemaRegistry, t as BlockTypeRegistry, u as SchemaError } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { n as computeContentHash } from "./hash-BJaeek87_BXspnfEZ.mjs";
import { a as resolveBlockTypes, i as normalizeBlocksData } from "./block-values-Dg0-8PPS_DG_24WSy.mjs";
import { h as setReferenceSelection } from "./relations-WIOojTL4_CqEbuQSZ.mjs";
import { n as createFieldRelation, t as bindReferenceField } from "./schema-B-3rntlX_DyyWZ5SC.mjs";
import { s as invalidateSiteSettingsCache, u as setSiteSettings } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as ssrfSafeFetch, s as validateExternalUrl } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as validateSeed, t as findTaxonomyStructureSource } from "./validate-Dz-TIOFB_DkPy7aTs.mjs";
import { ulid } from "ulidx";
import mime from "mime/lite";
// node_modules/emdash/dist/apply-DVnupNeS.mjs
/**
* Build the internal file route URL for a storage key, encoding each path
* segment so `?`, `#` and `%` stay inside the path. A key with an empty, `.` or
* `..` segment is encoded whole, because the URL parser would collapse those
* segments and move the request off the route. Mirrors the admin's
* `localMediaFileUrl`.
*/
function localMediaFileUrl(key) {
	const segments = key.split("/");
	if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return `${INTERNAL_MEDIA_PREFIX}${encodeURIComponent(key)}`;
	return `${INTERNAL_MEDIA_PREFIX}${segments.map(encodeURIComponent).join("/")}`;
}
/**
* Resolve the public URL for a locally stored media key. Returns an empty
* string when no key is given. When a storage adapter is supplied, defers to
* `storage.getPublicUrl()`; otherwise returns the internal proxy route.
*/
function resolvePublicMediaUrl(storage, storageKey) {
	if (!storageKey) return "";
	if (storage) return storage.getPublicUrl(storageKey);
	return `/_emdash/api/media/file/${storageKey}`;
}
/**
* Build the `getPublicMediaUrl` closure attached to `Astro.locals.emdash`.
* Shared by the anonymous fast path and the full-runtime path in middleware.
*
* @internal
*/
function createPublicMediaUrlResolver(storage) {
	return (key) => resolvePublicMediaUrl(storage, key);
}
/**
* Shared sanitization for gallery block images and image media, used by both
* converters so the editor round-trip and the stored shape stay in lockstep.
*/
/**
* Read an image's media reference, alt text, and dimensions. Accepts the
* reference shape (`_ref`, `url`) and the MediaValue that seeded `$media`
* stores instead (`id`, `src`, `meta.storageKey`, dimensions). The image's own
* `alt`, `width`, and `height` take precedence over the asset's.
*/
function resolveImageMedia(image) {
	const record = isRecord(image) ? image : {};
	const asset = isRecord(record.asset) ? record.asset : {};
	const storageKey = isRecord(asset.meta) ? nonEmptyString(asset.meta.storageKey) : void 0;
	const url = nonEmptyString(asset.url) ?? nonEmptyString(asset.src) ?? (storageKey ? localMediaFileUrl(storageKey) : void 0);
	const provider = nonEmptyString(asset.provider);
	const alt = nonEmptyString(record.alt) ?? nonEmptyString(asset.alt);
	const width = typeof record.width === "number" ? record.width : asset.width;
	const height = typeof record.height === "number" ? record.height : asset.height;
	const media = { asset: {
		_type: "reference",
		_ref: nonEmptyString(asset._ref) ?? nonEmptyString(asset.id) ?? "",
		...url ? { url } : {},
		...provider ? { provider } : {}
	} };
	if (alt) media.alt = alt;
	if (typeof width === "number") media.width = width;
	if (typeof height === "number") media.height = height;
	return media;
}
/**
* Normalize an untrusted `images` value into well-formed gallery images.
* Non-object entries and entries without an asset object are dropped.
* Missing `_key`s are filled via `generateKey` when provided (PM → PT);
* left empty otherwise (PT → PM keeps whatever the block carried).
*/
function sanitizeGalleryImages(value, generateKey) {
	if (!Array.isArray(value)) return [];
	const images = [];
	for (const entry of value) {
		if (!isRecord(entry)) continue;
		const record = entry;
		if (!isRecord(record.asset)) continue;
		const { asset, alt, width, height } = resolveImageMedia(record);
		const image = {
			_type: "image",
			_key: typeof record._key === "string" && record._key ? record._key : generateKey ? generateKey() : "",
			asset
		};
		if (alt) image.alt = alt;
		if (typeof record.caption === "string" && record.caption) image.caption = record.caption;
		if (width !== void 0) image.width = width;
		if (height !== void 0) image.height = height;
		if (typeof record.focalX === "number") image.focalX = record.focalX;
		if (typeof record.focalY === "number") image.focalY = record.focalY;
		if (typeof record.blurhash === "string" && record.blurhash) image.blurhash = record.blurhash;
		if (typeof record.dominantColor === "string" && record.dominantColor) image.dominantColor = record.dominantColor;
		images.push(image);
	}
	return images;
}
function nonEmptyString(value) {
	return typeof value === "string" && value ? value : void 0;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* Seed engine - applies seed files to database
*
* This is the core implementation that bootstraps an EmDash site from a seed file.
* Apply order is critical for foreign keys and references.
*/
var apply_exports = /* @__PURE__ */ __exportAll({
	applySeed: () => applySeed,
	applySeedWithinBudget: () => applySeedWithinBudget
});
var SEED_MENU_ITEM_INSERT_BATCH_SIZE = 6;
var SEED_WIDGET_INSERT_BATCH_SIZE = 10;
async function replaceSeedChildren(db, parentTable, parentIds, buildStatements) {
	if (parentIds.length === 0) return;
	if (await executeAtomicBatchIfSupported(db, buildStatements(db)) !== null) return;
	await withTransaction(db, async (trx) => {
		if (isPostgres(trx)) await trx.selectFrom(parentTable).select("id").where("id", "in", parentIds).orderBy("id").forUpdate().execute();
		for (const statement of buildStatements(trx)) await statement.execute();
	});
}
async function applySiteSettings(db, settings, onConflict, result) {
	const entries = Object.entries(settings).filter(([, value]) => value !== void 0);
	if (entries.length === 0) return;
	if (onConflict === "update") {
		await setSiteSettings(settings, db);
		result.settings.applied += entries.length;
		return;
	}
	const options = new OptionsRepository(db);
	let applied = 0;
	try {
		for (const [key, value] of entries) {
			const write = await options.compareAndSet(`site:${key}`, null, value);
			if (!write.applied && onConflict === "error") throw new Error(`Conflict: site setting "site:${key}" already exists`);
			if (write.applied) applied++;
		}
	} finally {
		if (applied > 0) {
			result.settings.applied += applied;
			invalidateSiteSettingsCache();
		}
	}
}
/**
* Set a collection's `titleField`/`dateField`: a separate write run after the
* fields exist, so `updateCollection` can validate them. No-op when neither is set.
*/
async function applyDisplayDateFields(registry, collection) {
	if (collection.titleField === void 0 && collection.dateField === void 0) return;
	await registry.updateCollection(collection.slug, {
		titleField: collection.titleField,
		dateField: collection.dateField
	});
}
var FILE_EXTENSION_PATTERN = /\.([a-z0-9]+)(?:\?|$)/i;
var SEED_RELATION_NAME_MAX_ATTEMPTS = 5;
var SEED_RELATION_INSERT_BATCH_SIZE = 10;
/** Pattern to remove file extensions */
var EXTENSION_PATTERN = /\.[^.]+$/;
/** Pattern to remove query parameters */
var QUERY_PARAM_PATTERN = /\?.*$/;
/** Pattern to remove non-alphanumeric characters (except dash and underscore) */
var SANITIZE_PATTERN = /[^a-zA-Z0-9_-]/g;
/** Pattern to collapse multiple hyphens */
var MULTIPLE_HYPHENS_PATTERN = /-+/g;
/** The `category` and `tag` defs that migrations insert on every new database. */
var BUILT_IN_TAXONOMY_DEFS = /* @__PURE__ */ new Map([["taxdef_category", {
	label: "Categories",
	label_singular: "Category",
	hierarchical: 1,
	collections: "[\"posts\"]"
}], ["taxdef_tag", {
	label: "Tags",
	label_singular: "Tag",
	hierarchical: 0,
	collections: "[\"posts\"]"
}]]);
/** Whether `def` is a built-in `category`/`tag` definition still holding its migration defaults. */
function isUntouchedBuiltInTaxonomyDef(def) {
	const builtIn = BUILT_IN_TAXONOMY_DEFS.get(def.id);
	return builtIn !== void 0 && def.label === builtIn.label && def.label_singular === builtIn.label_singular && def.hierarchical === builtIn.hierarchical && def.collections === builtIn.collections;
}
/**
* Apply a seed file to the database
*
* This function is idempotent - safe to run multiple times.
*
* @param db - Kysely database instance
* @param seed - Seed file to apply
* @param options - Application options
* @returns Result summary
*/
async function applySeed(db, seed, options = {}) {
	const { result } = await coalesceObjectCacheWrites(() => applySeedWrites(db, seed, options, null));
	return result;
}
/**
* Apply a seed over several calls, for a platform that caps the queries or
* fetches of one request.
*
* The limits are thresholds, checked before each taxonomy term, byline and
* content entry is created and before the phases that follow content. Schema,
* taxonomy definitions and settings are applied in every call, the item that
* crosses a threshold finishes, and the phases after content (menus,
* redirects, widgets, sections) run in one call, so set the limits well below
* the platform's. A call that stops returns `complete: false`; applying the
* same seed again continues with the first item not yet created. A call
* creates at least one item before it stops, so repeated calls finish. A
* `$media` URL used by entries in different calls is still downloaded each time
* so its content hash can be computed, but the resulting media row is reused
* when an existing ready row has the same hash. Requires
* `onConflict: "skip"`.
*/
async function applySeedWithinBudget(db, seed, options, limits) {
	const budget = new SeedBudget(limits);
	return coalesceObjectCacheWrites(() => applySeedWrites(db.withPlugin(budget), seed, options, budget));
}
/**
* Counts what a budgeted call spends. As a Kysely plugin it sees every query
* the call runs, including those inside transactions.
*/
var SeedBudget = class {
	#queries = 0;
	#mediaDownloads = 0;
	constructor(limits) {
		this.limits = limits;
	}
	transformQuery(args) {
		this.#queries++;
		return args.node;
	}
	transformResult(args) {
		return Promise.resolve(args.result);
	}
	countMediaDownload() {
		this.#mediaDownloads++;
	}
	isSpent() {
		const { queries, mediaDownloads } = this.limits;
		return queries !== void 0 && this.#queries >= queries || mediaDownloads !== void 0 && this.#mediaDownloads >= mediaDownloads;
	}
};
async function applySeedWrites(db, seed, options, budget) {
	const validation = validateSeed(seed);
	if (!validation.valid) throw new Error(`Invalid seed file:\n${validation.errors.join("\n")}`);
	const { includeContent = false, storage, skipMediaDownload = false, onConflict = "skip" } = options;
	if (budget && onConflict !== "skip") throw new Error("A seed budget requires onConflict: \"skip\"");
	const result = {
		blockTypes: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		collections: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		fields: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		relations: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		taxonomies: {
			created: 0,
			skipped: 0,
			terms: 0
		},
		bylines: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		menus: {
			created: 0,
			items: 0
		},
		redirects: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		widgetAreas: {
			created: 0,
			widgets: 0
		},
		sections: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		settings: { applied: 0 },
		content: {
			created: 0,
			skipped: 0,
			updated: 0
		},
		media: {
			created: 0,
			skipped: 0
		}
	};
	let complete = true;
	const progress = {
		done: 0,
		total: countSeedItems(seed, includeContent)
	};
	const mayCreateItem = () => !budget || result.taxonomies.terms + result.bylines.created + result.content.created === 0 || !budget.isSpent();
	const mediaContext = {
		db,
		storage: storage ?? null,
		skipMediaDownload,
		mediaCache: /* @__PURE__ */ new Map(),
		budget
	};
	const seedIdMap = /* @__PURE__ */ new Map();
	const seedBylineIdMap = /* @__PURE__ */ new Map();
	const staleMarkedContentCollections = /* @__PURE__ */ new Set();
	const failedStaleContentCollections = /* @__PURE__ */ new Set();
	const defaultLocale = getI18nConfig()?.defaultLocale ?? seed.defaultLocale ?? "en";
	const markSeedContentCollectionStale = async (collectionSlug) => {
		if (staleMarkedContentCollections.has(collectionSlug)) return;
		if (await markContentMediaUsageCollectionStaleSafely(db, collectionSlug, "CONTENT_USAGE_STALE")) {
			staleMarkedContentCollections.add(collectionSlug);
			failedStaleContentCollections.delete(collectionSlug);
		} else failedStaleContentCollections.add(collectionSlug);
	};
	const retryFailedSeedContentStaleMarks = async () => {
		for (const collectionSlug of failedStaleContentCollections) if (await markContentMediaUsageCollectionStaleSafely(db, collectionSlug, "CONTENT_USAGE_STALE")) {
			staleMarkedContentCollections.add(collectionSlug);
			failedStaleContentCollections.delete(collectionSlug);
		}
	};
	if (seed.settings) await applySiteSettings(db, seed.settings, onConflict, result);
	if (seed.relations) await applySeedRelations(db, seed.relations, seed.collections ?? [], onConflict, result);
	if (seed.blockTypes) {
		const registry = new BlockTypeRegistry(db);
		for (const blockType of seed.blockTypes) {
			const existing = await registry.getBlockType(blockType.slug);
			await registry.applySeedBlockType(blockType, onConflict);
			if (!existing) result.blockTypes.created++;
			else if (onConflict === "update") result.blockTypes.updated++;
			else result.blockTypes.skipped++;
		}
	}
	if (seed.collections) {
		const registry = new SchemaRegistry(db);
		const seedCollectionSlugs = new Set(seed.collections.map((collection) => collection.slug));
		const knownRelations = await readRelationEnds(db);
		const relationSlugs = new Set(knownRelations.keys());
		const externalTargetExists = /* @__PURE__ */ new Map();
		const pendingRelations = [];
		for (const collection of seed.collections) {
			if (await registry.getCollection(collection.slug)) {
				if (onConflict === "error") throw new Error(`Conflict: collection "${collection.slug}" already exists`);
				if (onConflict === "update") {
					await registry.updateCollection(collection.slug, {
						label: collection.label,
						labelSingular: collection.labelSingular,
						description: collection.description,
						icon: collection.icon,
						admin: collection.admin,
						supports: collection.supports || [],
						urlPattern: collection.urlPattern,
						routable: collection.routable,
						hidden: collection.hidden,
						sortOrder: collection.sortOrder,
						group: collection.group,
						commentsEnabled: collection.commentsEnabled,
						editLocking: collection.editLocking
					});
					result.collections.updated++;
					for (const field of collection.fields) {
						const existingField = await registry.getField(collection.slug, field.slug);
						await upsertSeedField(db, collection.slug, field, existingField, knownRelations);
						if (existingField) result.fields.updated++;
						else result.fields.created++;
					}
					await applyDisplayDateFields(registry, collection);
					continue;
				}
				result.collections.skipped++;
				result.fields.skipped += collection.fields.length;
				continue;
			}
			const fields = [];
			for (const field of collection.fields) {
				let fieldValidation = field.validation;
				const bound = resolveSeedFieldRelation(collection.slug, field, knownRelations);
				const targetCollection = !bound && field.type === "reference" && typeof fieldValidation?.targetCollection === "string" ? fieldValidation.targetCollection : void 0;
				if (bound) fieldValidation = {
					...fieldValidation,
					...bound
				};
				if (targetCollection) {
					let targetExists = seedCollectionSlugs.has(targetCollection);
					if (!targetExists) {
						targetExists = externalTargetExists.get(targetCollection) ?? false;
						if (!externalTargetExists.has(targetCollection)) {
							targetExists = Boolean(await registry.getCollection(targetCollection));
							externalTargetExists.set(targetCollection, targetExists);
						}
					}
					if (!targetExists) throw new SchemaError(`Target collection "${targetCollection}" not found`, "COLLECTION_NOT_FOUND");
					const relationId = ulid();
					const relationSlug = allocateSeedRelationName(collection.slug, field.slug, relationSlugs);
					pendingRelations.push({
						id: relationId,
						slug: relationSlug,
						parent_collection: collection.slug,
						child_collection: targetCollection,
						parent_label: collection.label,
						parent_label_singular: collection.labelSingular ?? null,
						child_label: field.label,
						max_children_per_parent: fieldValidation?.multiple ? null : 1
					});
					fieldValidation = {
						...fieldValidation,
						relation: relationSlug,
						relationSide: "parent"
					};
				}
				fields.push({
					slug: field.slug,
					label: field.label,
					type: field.type,
					required: field.required || false,
					unique: field.unique || false,
					searchable: field.searchable || false,
					indexed: field.indexed || false,
					translatable: field.translatable,
					defaultValue: field.defaultValue,
					validation: fieldValidation,
					widget: field.widget,
					options: field.options
				});
			}
			await registry.createSeedCollection({
				slug: collection.slug,
				label: collection.label,
				labelSingular: collection.labelSingular,
				description: collection.description,
				icon: collection.icon,
				admin: collection.admin,
				supports: collection.supports || [],
				urlPattern: collection.urlPattern,
				routable: collection.routable,
				hidden: collection.hidden,
				sortOrder: collection.sortOrder,
				group: collection.group,
				commentsEnabled: collection.commentsEnabled,
				editLocking: collection.editLocking
			}, fields);
			await applyDisplayDateFields(registry, collection);
			result.collections.created++;
			result.fields.created += collection.fields.length;
		}
		for (const relationBatch of chunks(pendingRelations, SEED_RELATION_INSERT_BATCH_SIZE)) await db.insertInto("_emdash_relations").values(relationBatch).execute();
	}
	if (seed.taxonomies) {
		const termSeedIdMap = /* @__PURE__ */ new Map();
		const taxonomiesBySeedId = /* @__PURE__ */ new Map();
		for (const taxonomy of seed.taxonomies) if (taxonomy.id) taxonomiesBySeedId.set(taxonomy.id, taxonomy);
		const untouchedBuiltInDefIds = new Set((await db.selectFrom("_emdash_taxonomy_defs").select([
			"id",
			"label",
			"label_singular",
			"hierarchical",
			"collections"
		]).where("id", "in", [...BUILT_IN_TAXONOMY_DEFS.keys()]).execute()).filter(isUntouchedBuiltInTaxonomyDef).map((def) => def.id));
		const declaresOwnStructure = (taxonomy) => findTaxonomyStructureSource(taxonomy, taxonomiesBySeedId) === taxonomy;
		const orderedTaxonomies = [...seed.taxonomies.filter(declaresOwnStructure), ...seed.taxonomies.filter((taxonomy) => !declaresOwnStructure(taxonomy))];
		for (const taxonomy of orderedTaxonomies) {
			const defLocale = resolveConfiguredLocale(taxonomy.locale ?? defaultLocale);
			const defsOfName = await db.selectFrom("_emdash_taxonomy_defs").select(["id", "locale"]).where("name", "=", taxonomy.name).execute();
			const existingDef = defsOfName.filter((def) => resolveConfiguredLocale(def.locale) === defLocale).toSorted((a, b) => getLocaleRank(a.locale, defLocale) - getLocaleRank(b.locale, defLocale) || a.id.localeCompare(b.id))[0];
			const unclaimed = existingDef !== void 0 && untouchedBuiltInDefIds.has(existingDef.id);
			if (existingDef && onConflict === "error" && !unclaimed) throw new Error(`Conflict: taxonomy "${taxonomy.name}" (${defLocale}) already exists`);
			const replacesDef = onConflict === "update" || unclaimed;
			const existingStructure = await findTaxonomyStructure(db, taxonomy.name);
			const replacesStructure = replacesDef || defsOfName.every((def) => untouchedBuiltInDefIds.has(def.id));
			const writesStructure = !existingStructure || replacesStructure && !taxonomy.translationOf;
			const structure = existingStructure && !writesStructure ? existingStructure : {
				hierarchical: taxonomy.hierarchical ?? existingStructure?.hierarchical ?? false,
				collections: taxonomy.collections ?? existingStructure?.collections ?? []
			};
			const defId = existingDef?.id ?? ulid();
			const translationGroup = writesStructure ? await saveTaxonomyStructure(db, taxonomy.name, existingStructure?.id ?? defId, structure) : existingStructure.id;
			if (existingDef) if (replacesDef) await db.updateTable("_emdash_taxonomy_defs").set({
				label: taxonomy.label,
				label_singular: taxonomy.labelSingular ?? null
			}).where("id", "=", existingDef.id).execute();
			else result.taxonomies.skipped++;
			else {
				await db.insertInto("_emdash_taxonomy_defs").values({
					id: defId,
					name: taxonomy.name,
					label: taxonomy.label,
					label_singular: taxonomy.labelSingular ?? null,
					hierarchical: structure.hierarchical ? 1 : 0,
					collections: JSON.stringify(structure.collections),
					locale: defLocale,
					translation_group: translationGroup
				}).execute();
				result.taxonomies.created++;
			}
			if (includeContent && taxonomy.terms && taxonomy.terms.length > 0) {
				const termRepo = new TaxonomyRepository(db);
				const existingTerms = await findExistingSeedTerms(db, taxonomy.name, taxonomy.terms);
				if (structure.hierarchical) {
					const applied = await applyHierarchicalTerms(termRepo, taxonomy.name, defLocale, taxonomy.terms, existingTerms, termSeedIdMap, result, onConflict, mayCreateItem);
					progress.done += applied.processed;
					complete = applied.complete;
				} else for (const term of taxonomy.terms) {
					const termLocale = resolveConfiguredLocale(term.locale ?? defLocale);
					const termKey = seedTermKey(termLocale, term.slug);
					const existingId = existingTerms.get(termKey);
					if (existingId) {
						if (onConflict === "error") throw new Error(`Conflict: taxonomy term "${term.slug}" in "${taxonomy.name}" (${termLocale}) already exists`);
						if (onConflict === "update") {
							await termRepo.update(existingId, {
								label: term.label,
								data: term.description ? { description: term.description } : {}
							});
							result.taxonomies.terms++;
						}
						if (term.id) termSeedIdMap.set(term.id, existingId);
						progress.done++;
					} else {
						if (!mayCreateItem()) {
							complete = false;
							break;
						}
						const translationOf = term.translationOf ? termSeedIdMap.get(term.translationOf) : void 0;
						const created = await termRepo.create({
							name: taxonomy.name,
							slug: term.slug,
							label: term.label,
							data: term.description ? { description: term.description } : void 0,
							locale: termLocale,
							translationOf
						});
						existingTerms.set(termKey, created.id);
						if (term.id) termSeedIdMap.set(term.id, created.id);
						result.taxonomies.terms++;
						progress.done++;
					}
				}
			}
			if (!complete) break;
		}
		const { invalidateTaxonomyDefsCache } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
		invalidateTaxonomyDefsCache();
	}
	if (complete && includeContent && seed.bylines) {
		const bylineRepo = new BylineRepository(db);
		const existingBylines = await findExistingSeedBylines(db, seed.bylines.map((byline) => byline.slug));
		for (const byline of seed.bylines) {
			const existingId = existingBylines.get(byline.slug);
			if (existingId) {
				if (onConflict === "error") throw new Error(`Conflict: byline "${byline.slug}" already exists`);
				if (onConflict === "update") {
					const avatar = byline.avatar ? await resolveSeedBylineAvatar(db, byline.avatar) : null;
					try {
						if (!await bylineRepo.update(existingId, {
							displayName: byline.displayName,
							bio: byline.bio ?? null,
							websiteUrl: byline.websiteUrl ?? null,
							isGuest: byline.isGuest,
							...avatar ? { avatarMediaId: avatar.id } : {}
						})) throw new Error(`Byline "${byline.slug}" disappeared during update`);
					} catch (error) {
						if (avatar?.created) await deleteMediaRow(db, avatar.id);
						throw error;
					}
					seedBylineIdMap.set(byline.id, existingId);
					result.bylines.updated++;
					if (avatar?.created) result.media.created++;
					progress.done++;
					continue;
				}
				seedBylineIdMap.set(byline.id, existingId);
				result.bylines.skipped++;
				progress.done++;
				continue;
			}
			if (!mayCreateItem()) {
				complete = false;
				break;
			}
			const avatar = byline.avatar ? await resolveSeedBylineAvatar(db, byline.avatar) : null;
			let createdId;
			try {
				createdId = (await bylineRepo.create({
					slug: byline.slug,
					displayName: byline.displayName,
					bio: byline.bio ?? null,
					websiteUrl: byline.websiteUrl ?? null,
					isGuest: byline.isGuest,
					avatarMediaId: avatar?.id ?? null
				})).id;
			} catch (error) {
				if (avatar?.created) await deleteMediaRow(db, avatar.id);
				throw error;
			}
			existingBylines.set(byline.slug, createdId);
			seedBylineIdMap.set(byline.id, createdId);
			result.bylines.created++;
			if (avatar?.created) result.media.created++;
			progress.done++;
		}
	}
	if (complete && includeContent && seed.content) {
		const contentRepo = new ContentRepository(db);
		const schemaRegistry = new SchemaRegistry(db);
		const datetimeContexts = /* @__PURE__ */ new Map();
		try {
			for (const [collectionSlug, entries] of Object.entries(seed.content)) {
				const collectionInfo = await schemaRegistry.getCollectionWithFields(collectionSlug);
				const collectionRoutable = collectionInfo?.routable !== false;
				const referenceFields = referenceFieldsOf(collectionInfo);
				const resolvedBlockTypes = collectionInfo?.fields.some((field) => field.type === "blocks") ? await resolveBlockTypes(db) : void 0;
				const existingEntries = await findExistingSeedEntries(contentRepo, collectionSlug, entries, defaultLocale);
				const trashedEntries = await findExistingSeedEntries(contentRepo, collectionSlug, entries.filter((entry) => {
					const { slug, locale } = seedEntryIdentity(entry, defaultLocale);
					return !existingEntries.has(seedEntryKey(entry, slug, locale));
				}), defaultLocale, true);
				for (const entry of entries) {
					const { slug: entrySlug, locale: entryLocale } = seedEntryIdentity(entry, defaultLocale);
					const entryKey = seedEntryKey(entry, entrySlug, entryLocale);
					const existing = existingEntries.get(entryKey);
					if (!existing) {
						if (trashedEntries.get(entryKey)) {
							if (onConflict === "error") throw new Error(`Conflict: content "${entrySlug ?? entry.id}" in "${collectionSlug}" already exists (in trash)`);
							console.warn(`content.${collectionSlug}: "${entrySlug ?? entry.id}" (${entryLocale}) exists in the trash — skipping`);
							result.content.skipped++;
							progress.done++;
							continue;
						}
					}
					if (existing) {
						if (onConflict === "error") throw new Error(`Conflict: content "${entrySlug ?? entry.id}" in "${collectionSlug}" already exists`);
						if (onConflict === "update") {
							let resolvedData = await resolveReferences(entry.data, seedIdMap, mediaContext, result);
							if (collectionInfo) resolvedData = await normalizeBlocksData(db, collectionInfo, resolvedData, existing.data, { restoreBlocks: true }, false, resolvedBlockTypes);
							const { columnData, edges } = splitReferenceFields(collectionSlug, referenceFields, resolvedData);
							const status = entry.status || "published";
							let contentMutated = false;
							try {
								await withTransaction(db, async (trx) => {
									const trxContentRepo = new ContentRepository(trx, datetimeContexts);
									const trxBylineRepo = new BylineRepository(trx);
									const trxRevisionRepo = new RevisionRepository(trx, datetimeContexts);
									await trxContentRepo.update(collectionSlug, existing.id, {
										status,
										data: columnData
									});
									contentMutated = true;
									await applyContentBylines(trxBylineRepo, collectionSlug, existing.id, entry, seedBylineIdMap, true);
									await applyContentTaxonomies(trx, collectionSlug, existing.id, entry, true);
									await applyContentReferences(trx, collectionSlug, existing.id, edges);
									if (status === "published") {
										const draft = await trxRevisionRepo.create({
											collection: collectionSlug,
											entryId: existing.id,
											data: columnData
										});
										try {
											await trxContentRepo.setDraftRevision(collectionSlug, existing.id, draft.id);
											await trxContentRepo.publish(collectionSlug, existing.id, void 0, false, void 0, true, collectionRoutable);
										} catch (error) {
											try {
												await trxRevisionRepo.deleteIfUnreferenced(collectionSlug, existing.id, draft.id);
											} catch (cleanupError) {
												console.error(`[seed] Failed to clean up unstaged revision ${draft.id}:`, cleanupError);
											}
											throw error;
										}
									}
								});
							} catch (error) {
								if (contentMutated) await markSeedContentCollectionStale(collectionSlug);
								throw error;
							}
							seedIdMap.set(entry.id, existing.id);
							result.content.updated++;
							progress.done++;
							await markSeedContentCollectionStale(collectionSlug);
							continue;
						}
						result.content.skipped++;
						seedIdMap.set(entry.id, existing.id);
						progress.done++;
						continue;
					}
					if (!mayCreateItem()) {
						complete = false;
						break;
					}
					let resolvedData = await resolveReferences(entry.data, seedIdMap, mediaContext, result);
					if (collectionInfo) resolvedData = await normalizeBlocksData(db, collectionInfo, resolvedData, {}, { restoreBlocks: true }, false, resolvedBlockTypes);
					const { columnData, edges } = splitReferenceFields(collectionSlug, referenceFields, resolvedData);
					let translationOf;
					if (entry.translationOf) {
						const sourceId = seedIdMap.get(entry.translationOf);
						if (!sourceId) console.warn(`content.${collectionSlug}: translationOf "${entry.translationOf}" not found (not yet created or missing). Skipping translation link.`);
						else translationOf = sourceId;
					}
					const status = entry.status || "published";
					let contentMutated = false;
					let created;
					try {
						created = await withTransaction(db, async (trx) => {
							const trxContentRepo = new ContentRepository(trx, datetimeContexts);
							const trxBylineRepo = new BylineRepository(trx);
							const item = await trxContentRepo.create({
								...entrySlug ? {} : { id: entry.id },
								type: collectionSlug,
								slug: entrySlug,
								status,
								data: columnData,
								locale: entryLocale,
								translationOf,
								publishedAt: status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null
							});
							contentMutated = true;
							await applyContentBylines(trxBylineRepo, collectionSlug, item.id, entry, seedBylineIdMap);
							await applyContentTaxonomies(trx, collectionSlug, item.id, entry, false);
							await applyContentReferences(trx, collectionSlug, item.id, edges);
							if (status === "published") await trxContentRepo.publish(collectionSlug, item.id, void 0, false, void 0, true, collectionRoutable);
							return item;
						});
					} catch (error) {
						if (contentMutated) await markSeedContentCollectionStale(collectionSlug);
						throw error;
					}
					seedIdMap.set(entry.id, created.id);
					existingEntries.set(entryKey, created);
					result.content.created++;
					progress.done++;
					await markSeedContentCollectionStale(collectionSlug);
				}
				if (!complete) break;
			}
		} finally {
			await retryFailedSeedContentStaleMarks();
		}
	}
	if (complete && !mayCreateItem()) complete = false;
	if (!complete) {
		await invalidateSeedCaches();
		return {
			result,
			complete,
			progress
		};
	}
	if (seed.menus) {
		const menuSeedIdMap = /* @__PURE__ */ new Map();
		const itemSeedIdMap = /* @__PURE__ */ new Map();
		const menuIds = [];
		const itemRows = [];
		try {
			for (const menu of seed.menus) {
				const locale = resolveConfiguredLocale(menu.locale ?? defaultLocale);
				let lookup = db.selectFrom("_emdash_menus").selectAll().where("name", "=", menu.name).where(localeMatches("locale", locale)).orderBy(localeOrder("locale", locale), "asc").orderBy("id", "asc");
				const existingMenu = await lookup.executeTakeFirst();
				let menuId;
				let translationGroup;
				if (existingMenu) {
					menuId = existingMenu.id;
					translationGroup = existingMenu.translation_group ?? existingMenu.id;
				} else {
					menuId = ulid();
					translationGroup = menuId;
					if (menu.translationOf) {
						const source = menuSeedIdMap.get(menu.translationOf);
						if (source) translationGroup = source.translationGroup;
						else console.warn(`menu "${menu.name}" (${locale}): translationOf "${menu.translationOf}" not found yet; minting a fresh group.`);
					}
					if (await db.insertInto("_emdash_menus").values({
						id: menuId,
						name: menu.name,
						label: menu.label,
						created_at: (/* @__PURE__ */ new Date()).toISOString(),
						updated_at: (/* @__PURE__ */ new Date()).toISOString(),
						locale,
						translation_group: translationGroup
					}).onConflict((conflict) => conflict.columns(["name", "locale"]).doNothing()).returning("id").executeTakeFirst()) result.menus.created++;
					else {
						const concurrentMenu = await lookup.executeTakeFirstOrThrow();
						menuId = concurrentMenu.id;
						translationGroup = concurrentMenu.translation_group ?? concurrentMenu.id;
					}
				}
				if (menu.id) menuSeedIdMap.set(menu.id, {
					id: menuId,
					translationGroup
				});
				menuIds.push(menuId);
				const itemCount = collectMenuItems(itemRows, menuId, existingMenu?.locale ?? locale, menu.items, null, 0, seedIdMap, itemSeedIdMap);
				result.menus.items += itemCount;
			}
			const buildStatements = (target) => [...menuIds.map((id) => target.deleteFrom("_emdash_menu_items").where("menu_id", "=", id)), ...chunks(itemRows, SEED_MENU_ITEM_INSERT_BATCH_SIZE).map((rows) => target.insertInto("_emdash_menu_items").values(rows))];
			await replaceSeedChildren(db, "_emdash_menus", menuIds, buildStatements);
		} finally {
			invalidateMenuObjectCache();
		}
	}
	if (seed.redirects) {
		const redirectRepo = new RedirectRepository(db);
		for (const redirect of seed.redirects) {
			const existing = await redirectRepo.findBySource(redirect.source);
			if (existing) {
				if (onConflict === "error") throw new Error(`Conflict: redirect "${redirect.source}" already exists`);
				if (onConflict === "update") {
					await redirectRepo.update(existing.id, {
						destination: redirect.destination,
						type: redirect.type,
						enabled: redirect.enabled,
						groupName: redirect.groupName
					});
					result.redirects.updated++;
					continue;
				}
				result.redirects.skipped++;
				continue;
			}
			await redirectRepo.create({
				source: redirect.source,
				destination: redirect.destination,
				type: redirect.type,
				enabled: redirect.enabled,
				groupName: redirect.groupName
			});
			result.redirects.created++;
		}
	}
	if (seed.widgetAreas) try {
		const areaIds = [];
		const widgetRows = [];
		for (const area of seed.widgetAreas) {
			const lookup = db.selectFrom("_emdash_widget_areas").selectAll().where("name", "=", area.name);
			const existingArea = await lookup.executeTakeFirst();
			let areaId;
			if (existingArea) areaId = existingArea.id;
			else {
				areaId = ulid();
				if (await db.insertInto("_emdash_widget_areas").values({
					id: areaId,
					name: area.name,
					label: area.label,
					description: area.description ?? null
				}).onConflict((conflict) => conflict.column("name").doNothing()).returning("id").executeTakeFirst()) result.widgetAreas.created++;
				else areaId = (await lookup.executeTakeFirstOrThrow()).id;
			}
			areaIds.push(areaId);
			for (let i = 0; i < area.widgets.length; i++) {
				const widget = area.widgets[i];
				widgetRows.push(createSeedWidgetRow(areaId, widget, i));
				result.widgetAreas.widgets++;
			}
		}
		await replaceSeedChildren(db, "_emdash_widget_areas", areaIds, (target) => [...areaIds.map((id) => target.deleteFrom("_emdash_widgets").where("area_id", "=", id)), ...chunks(widgetRows, SEED_WIDGET_INSERT_BATCH_SIZE).map((rows) => target.insertInto("_emdash_widgets").values(rows))]);
	} finally {
		invalidateWidgetObjectCache();
	}
	if (seed.sections) for (const section of seed.sections) {
		const existing = await db.selectFrom("_emdash_sections").select("id").where("slug", "=", section.slug).executeTakeFirst();
		if (existing) {
			if (onConflict === "error") throw new Error(`Conflict: section "${section.slug}" already exists`);
			if (onConflict === "update") {
				await db.updateTable("_emdash_sections").set({
					title: section.title,
					description: section.description ?? null,
					keywords: section.keywords ? JSON.stringify(section.keywords) : null,
					content: JSON.stringify(section.content),
					source: section.source || "theme",
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).where("id", "=", existing.id).execute();
				result.sections.updated++;
				continue;
			}
			result.sections.skipped++;
			continue;
		}
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await db.insertInto("_emdash_sections").values({
			id,
			slug: section.slug,
			title: section.title,
			description: section.description ?? null,
			keywords: section.keywords ? JSON.stringify(section.keywords) : null,
			content: JSON.stringify(section.content),
			preview_media_id: null,
			source: section.source || "theme",
			theme_id: section.source === "theme" ? section.slug : null,
			created_at: now,
			updated_at: now
		}).execute();
		result.sections.created++;
	}
	if (seed.collections) {
		const ftsManager = new FTSManager(db);
		for (const collection of seed.collections) if (collection.supports?.includes("search")) {
			if ((await ftsManager.getSearchableFields(collection.slug)).length > 0) try {
				await ftsManager.enableSearch(collection.slug);
			} catch (err) {
				console.warn(`Failed to enable search for ${collection.slug}:`, err);
			}
		}
	}
	if (result.redirects.created + result.redirects.updated > 0) {
		const { publishRedirectChanges } = await import("./artifacts-Dvdp2KK-_DnHPb9ba.mjs").then((n) => n.t);
		await publishRedirectChanges(db);
	}
	await invalidateSeedCaches();
	return {
		result,
		complete,
		progress
	};
}
function countSeedItems(seed, includeContent) {
	if (!includeContent) return 0;
	const terms = (seed.taxonomies ?? []).reduce((total, taxonomy) => total + (taxonomy.terms?.length ?? 0), 0);
	const entries = Object.values(seed.content ?? {}).reduce((total, collectionEntries) => total + collectionEntries.length, 0);
	return terms + (seed.bylines?.length ?? 0) + entries;
}
function seedTermKey(locale, slug) {
	return `${locale}::${slug}`;
}
/**
* Find which of a taxonomy's seed terms already exist, as term ids keyed by
* `seedTermKey`. Each query covers a batch of slugs.
*/
async function findExistingSeedTerms(db, taxonomyName, terms) {
	const selected = /* @__PURE__ */ new Map();
	for (const batch of chunks([...new Set(terms.map((term) => term.slug))], 50)) {
		const rows = await db.selectFrom("taxonomies").select([
			"id",
			"slug",
			"locale"
		]).where("name", "=", taxonomyName).where("slug", "in", batch).execute();
		for (const row of rows) {
			const canonicalLocale = resolveConfiguredLocale(row.locale);
			const key = seedTermKey(canonicalLocale, row.slug);
			const previous = selected.get(key);
			if (previous === void 0 || getLocaleRank(row.locale, canonicalLocale) < getLocaleRank(previous.locale, canonicalLocale) || getLocaleRank(row.locale, canonicalLocale) === getLocaleRank(previous.locale, canonicalLocale) && row.id.localeCompare(previous.id) < 0) selected.set(key, {
				id: row.id,
				locale: row.locale
			});
		}
	}
	return new Map(Array.from(selected, ([key, value]) => [key, value.id]));
}
/**
* Match seed bylines by slug, preferring a path over its stored code aliases.
* Across different configured locales, keep the lowest-locale selection.
*/
async function findExistingSeedBylines(db, slugs) {
	const existing = /* @__PURE__ */ new Map();
	for (const batch of chunks([...new Set(slugs)], 50)) {
		const rows = await db.selectFrom("_emdash_bylines").select([
			"id",
			"slug",
			"locale"
		]).where("slug", "in", batch).orderBy("locale", "asc").orderBy("id", "asc").execute();
		for (const row of rows) {
			const previous = existing.get(row.slug);
			const locale = resolveConfiguredLocale(row.locale);
			if (!previous || resolveConfiguredLocale(previous.locale) === locale && getLocaleRank(row.locale, locale) < getLocaleRank(previous.locale, locale)) existing.set(row.slug, row);
		}
	}
	return new Map(Array.from(existing, ([slug, row]) => [slug, row.id]));
}
/**
* Invalidate caches that may have been affected by seed data.
* Seed creates bylines, redirects, and collections, all of which
* have module-level caches in the hot path.
*/
async function invalidateSeedCaches() {
	const { invalidateBylineCache } = await import("./bylines-f_ZEc6Sn_Cz4uDRKR.mjs").then((n) => n.t);
	const { invalidateRedirectCache } = await import("./cache-5DHbpEWu_CmSRzIKD.mjs").then((n) => n.t);
	const { invalidateUrlPatternCache } = await import("./query-D62NntCZ_KAlbGiAn.mjs").then((n) => n.s);
	invalidateBylineCache();
	invalidateRedirectCache();
	invalidateUrlPatternCache();
}
function seedEntryIdentity(entry, defaultLocale) {
	return {
		slug: typeof entry.slug === "string" && entry.slug.trim().length > 0 ? entry.slug : null,
		locale: resolveConfiguredLocale(entry.locale ?? defaultLocale)
	};
}
async function readRelationEnds(db) {
	const rows = await db.selectFrom("_emdash_relations").select([
		"slug",
		"parent_collection",
		"child_collection"
	]).execute();
	return new Map(rows.map((row) => [row.slug, {
		parentCollection: row.parent_collection,
		childCollection: row.child_collection
	}]));
}
/**
* Resolve the relation a seed reference field names, and which end of it this
* collection sits on.
*
* `relationSide` is only needed for a self-referential relation, where both ends
* are this collection; otherwise the side follows from which end matches.
* `targetCollection` is the collection at the other end, derived rather than
* trusted, so a seed cannot declare a target the relation disagrees with.
*/
function resolveSeedFieldRelation(collectionSlug, field, knownRelations) {
	if (field.type !== "reference") return null;
	const named = field.validation?.relation;
	if (typeof named !== "string" || named.length === 0) return null;
	const relation = knownRelations.get(named);
	if (!relation) throw new SchemaError(`Relation "${named}" not found`, "RELATION_NOT_FOUND");
	const declared = field.validation?.relationSide;
	const side = declared === "parent" || declared === "child" ? declared : relation.parentCollection === collectionSlug ? "parent" : "child";
	if ((side === "parent" ? relation.parentCollection : relation.childCollection) !== collectionSlug) throw new SchemaError(`Relation "${named}" has no ${side} end on collection "${collectionSlug}"`, "VALIDATION_ERROR");
	return {
		relation: named,
		relationSide: side,
		targetCollection: side === "parent" ? relation.childCollection : relation.parentCollection
	};
}
/**
* Create or update the relations a seed declares, before the fields that name
* them.
*
* A relation's two collections are fixed once it exists: changing one would
* leave its links pointing into a collection that is no longer an end of it, so
* a seed that names different ones fails rather than rewriting the row. Labels
* and limits are updated under `onConflict: "update"`.
*/
async function applySeedRelations(db, relations, seedCollections, onConflict, result) {
	const existing = await readRelationEnds(db);
	const known = new Set(seedCollections.map((collection) => collection.slug));
	for (const row of await db.selectFrom("_emdash_collections").select("slug").execute()) known.add(row.slug);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	for (const relation of relations) {
		for (const end of [relation.parentCollection, relation.childCollection]) if (!known.has(end)) throw new SchemaError(`Relation "${relation.slug}" names collection "${end}", which does not exist`, "COLLECTION_NOT_FOUND");
		const current = existing.get(relation.slug);
		if (current) {
			if (current.parentCollection !== relation.parentCollection || current.childCollection !== relation.childCollection) throw new SchemaError(`Relation "${relation.slug}" joins ${current.parentCollection} to ${current.childCollection}; a relation's collections cannot change`, "RELATION_COLLECTIONS_IMMUTABLE");
			if (onConflict === "error") throw new Error(`Conflict: relation "${relation.slug}" already exists`);
			if (onConflict !== "update") {
				result.relations.skipped++;
				continue;
			}
			await db.updateTable("_emdash_relations").set({
				parent_label: relation.parentLabel,
				parent_label_singular: relation.parentLabelSingular ?? null,
				child_label: relation.childLabel,
				child_label_singular: relation.childLabelSingular ?? null,
				max_children_per_parent: relation.maxChildrenPerParent ?? null,
				max_parents_per_child: relation.maxParentsPerChild ?? null,
				updated_at: now
			}).where("slug", "=", relation.slug).execute();
			result.relations.updated++;
			continue;
		}
		await db.insertInto("_emdash_relations").values({
			id: ulid(),
			slug: relation.slug,
			parent_collection: relation.parentCollection,
			child_collection: relation.childCollection,
			parent_label: relation.parentLabel,
			parent_label_singular: relation.parentLabelSingular ?? null,
			child_label: relation.childLabel,
			child_label_singular: relation.childLabelSingular ?? null,
			max_children_per_parent: relation.maxChildrenPerParent ?? null,
			max_parents_per_child: relation.maxParentsPerChild ?? null,
			created_at: now,
			updated_at: now
		}).execute();
		existing.set(relation.slug, {
			parentCollection: relation.parentCollection,
			childCollection: relation.childCollection
		});
		result.relations.created++;
	}
}
function allocateSeedRelationName(collectionSlug, fieldSlug, usedNames) {
	const baseName = `${collectionSlug}_${fieldSlug}`.slice(0, 63);
	for (let attempt = 0; attempt < SEED_RELATION_NAME_MAX_ATTEMPTS; attempt++) {
		const suffix = attempt === 0 ? "" : `_${attempt + 1}`;
		const name = attempt === 0 ? baseName : `${baseName.slice(0, 63 - suffix.length)}${suffix}`;
		if (!usedNames.has(name)) {
			usedNames.add(name);
			return name;
		}
	}
	throw new SchemaError("Could not allocate a unique relation name", "RELATION_NAME_CONFLICT");
}
/**
* Slugful entries use the existing locale-aware key. Slugless seed entries
* persist their seed ID, which keeps re-application idempotent.
*/
function seedEntryKey(entry, slug, locale) {
	return slug === null ? `id:${entry.id}` : `slug:${locale}:${slug}`;
}
/**
* Find which of a collection's seed entries already exist, keyed by
* `seedEntryKey`. Each query covers a batch of entries.
*/
async function findExistingSeedEntries(repo, collectionSlug, entries, defaultLocale, includeTrashed = false) {
	const identities = entries.map((entry) => ({
		entry,
		...seedEntryIdentity(entry, defaultLocale)
	}));
	const slugsByLocale = /* @__PURE__ */ new Map();
	for (const { slug, locale } of identities) {
		if (slug === null) continue;
		const slugs = slugsByLocale.get(locale);
		if (slugs) slugs.push(slug);
		else slugsByLocale.set(locale, [slug]);
	}
	const bySlug = /* @__PURE__ */ new Map();
	for (const [locale, slugs] of slugsByLocale) bySlug.set(locale, await repo.findManyBySlugsInLocale(collectionSlug, slugs, locale, { includeTrashed }));
	const byId = await repo.findManyByIds(collectionSlug, identities.filter(({ slug }) => slug === null).map(({ entry }) => entry.id), { includeTrashed });
	const existing = /* @__PURE__ */ new Map();
	for (const { entry, slug, locale } of identities) {
		const item = slug === null ? byId.get(entry.id) : bySlug.get(locale)?.get(slug);
		if (item) existing.set(seedEntryKey(entry, slug, locale), item);
	}
	return existing;
}
/**
* Apply hierarchical taxonomy terms (parents before children). Stops before
* creating a term once `mayCreate` returns false, and returns how many terms
* were found or created.
*/
async function applyHierarchicalTerms(termRepo, taxonomyName, defLocale, terms, existingTerms, termSeedIdMap, result, onConflict, mayCreate) {
	let processed = 0;
	const slugToId = /* @__PURE__ */ new Map();
	const resolveTermLocale = (term) => resolveConfiguredLocale(term.locale ?? defLocale);
	let remaining = [...terms];
	let maxPasses = 10;
	while (remaining.length > 0 && maxPasses > 0) {
		const processedThisPass = [];
		for (const term of remaining) {
			const termLocale = resolveTermLocale(term);
			const parentReady = !term.parent || slugToId.has(`${termLocale}::${term.parent}`);
			const translationReady = !term.translationOf || termSeedIdMap.has(term.translationOf);
			if (!parentReady || !translationReady) continue;
			const parentId = term.parent ? slugToId.get(`${termLocale}::${term.parent}`) : void 0;
			const translationOf = term.translationOf ? termSeedIdMap.get(term.translationOf) : void 0;
			const termKey = seedTermKey(termLocale, term.slug);
			const existingId = existingTerms.get(termKey);
			if (existingId) {
				if (onConflict === "error") throw new Error(`Conflict: taxonomy term "${term.slug}" in "${taxonomyName}" (${termLocale}) already exists`);
				if (onConflict === "update") {
					await termRepo.update(existingId, {
						label: term.label,
						parentId,
						data: term.description ? { description: term.description } : {}
					});
					result.taxonomies.terms++;
				}
				slugToId.set(termKey, existingId);
				if (term.id) termSeedIdMap.set(term.id, existingId);
			} else {
				if (!mayCreate()) return {
					processed,
					complete: false
				};
				const created = await termRepo.create({
					name: taxonomyName,
					slug: term.slug,
					label: term.label,
					parentId,
					data: term.description ? { description: term.description } : void 0,
					locale: termLocale,
					translationOf
				});
				existingTerms.set(termKey, created.id);
				slugToId.set(termKey, created.id);
				if (term.id) termSeedIdMap.set(term.id, created.id);
				result.taxonomies.terms++;
			}
			processed++;
			processedThisPass.push(term.slug + "::" + termLocale);
		}
		remaining = remaining.filter((term) => !processedThisPass.includes(term.slug + "::" + resolveTermLocale(term)));
		maxPasses--;
	}
	if (remaining.length > 0) console.warn(`Could not process ${remaining.length} terms due to missing parents/translations`);
	return {
		processed,
		complete: true
	};
}
/**
* Apply byline credits to a content entry.
* In update mode, clears existing credits even if the seed has none.
*/
async function applyContentBylines(bylineRepo, collectionSlug, contentId, entry, seedBylineIdMap, isUpdate = false) {
	if (!entry.bylines || entry.bylines.length === 0) {
		if (isUpdate) await bylineRepo.setContentBylines(collectionSlug, contentId, []);
		return;
	}
	const credits = entry.bylines.map((credit) => {
		const bylineId = seedBylineIdMap.get(credit.byline);
		if (!bylineId) return null;
		return {
			bylineId,
			roleLabel: credit.roleLabel ?? null
		};
	}).filter((credit) => Boolean(credit));
	if (credits.length !== entry.bylines.length) console.warn(`content.${collectionSlug}.${entry.slug ?? entry.id}: one or more byline refs could not be resolved`);
	if (credits.length > 0 || isUpdate) await bylineRepo.setContentBylines(collectionSlug, contentId, credits);
}
/**
* Apply taxonomy term assignments to a content entry.
* In update mode, clears existing assignments before re-attaching.
*/
/**
* Create or update a field from a seed.
*
* A reference field bound to a relation is storage-less: it persists no column
* and its edges live in `_emdash_content_references`. Seeds create fields
* through the registry (not the schema handler that owns the relation
* lifecycle), so this mirrors the handler — it creates the relation on first
* insert (field + relation in one transaction) and preserves the
* server-assigned `validation.relation`/`targetCollection` on re-apply, since a
* seed's field validation omits them and would otherwise orphan the relation. A
* reference field with no `targetCollection` cannot form a relation, so it is
* created column-backed, holding a plain entry id.
*/
async function upsertSeedField(db, collectionSlug, field, existing, knownRelations) {
	const bound = resolveSeedFieldRelation(collectionSlug, field, knownRelations);
	if (existing) {
		const update = {
			label: field.label,
			type: field.type,
			required: field.required || false,
			unique: field.unique || false,
			searchable: field.searchable || false,
			indexed: field.indexed || false,
			translatable: field.translatable,
			defaultValue: field.defaultValue,
			widget: field.widget,
			options: field.options
		};
		if (!bound && field.type === "reference" && !existing.validation?.relation && typeof field.validation?.targetCollection === "string") {
			await bindReferenceField(db, collectionSlug, existing, {
				...update,
				validation: field.validation
			}, field.validation.targetCollection);
			return;
		}
		const validation = bound ? {
			...field.validation,
			...bound
		} : field.type === "reference" && existing.validation?.relation ? {
			...field.validation,
			relation: existing.validation.relation,
			relationSide: existing.validation.relationSide,
			targetCollection: existing.validation.targetCollection
		} : field.validation;
		await new SchemaRegistry(db).updateField(collectionSlug, field.slug, {
			...update,
			validation
		});
		return;
	}
	const input = {
		slug: field.slug,
		label: field.label,
		type: field.type,
		required: field.required || false,
		unique: field.unique || false,
		searchable: field.searchable || false,
		indexed: field.indexed || false,
		translatable: field.translatable,
		defaultValue: field.defaultValue,
		validation: field.validation,
		widget: field.widget,
		options: field.options
	};
	if (bound) {
		await new SchemaRegistry(db).createField(collectionSlug, {
			...input,
			validation: {
				...field.validation,
				...bound
			}
		});
		return;
	}
	const targetCollection = field.type === "reference" && typeof field.validation?.targetCollection === "string" ? field.validation.targetCollection : void 0;
	if (targetCollection) {
		await withTransaction(db, async (trx) => {
			const relation = await createFieldRelation(trx, collectionSlug, field.slug, field.label, targetCollection, field.validation?.multiple ? null : 1);
			await new SchemaRegistry(trx).createField(collectionSlug, {
				...input,
				validation: {
					...field.validation,
					relation: relation.slug,
					relationSide: "parent"
				}
			});
		});
		return;
	}
	await new SchemaRegistry(db).createField(collectionSlug, input);
}
/**
* Split resolved content `data` into the plain column data and the reference
* edge writes. A reference field bound to a relation is storage-less, so its key
* left in `data` would hit the column writer (and `syncDataColumns` on publish)
* and throw "no such column". Its `$ref:`-resolved value — a child entry id or
* an array of them — is captured as an edge write instead, keyed by the field's
* relation. A reference field with no relation still owns its column, so its
* resolved id is written there like any other string.
*/
/** One collection's reference fields by slug, read once per collection: the
* schema phase has finished by the time content is applied. */
function referenceFieldsOf(collection) {
	return new Map((collection?.fields ?? []).filter((f) => f.type === "reference").map((f) => [f.slug, f]));
}
function splitReferenceFields(collectionSlug, referenceFields, data) {
	if (referenceFields.size === 0) return {
		columnData: data,
		edges: []
	};
	const columnData = {};
	const edges = [];
	for (const [key, value] of Object.entries(data)) {
		if (!referenceFields.get(key)?.validation?.relation) {
			columnData[key] = value;
			continue;
		}
		const childIds = [];
		for (const candidate of Array.isArray(value) ? value : [value]) {
			if (typeof candidate !== "string" || candidate.length === 0) continue;
			if (candidate.startsWith("$ref:")) {
				console.warn(`content.${collectionSlug}: reference "${candidate}" in field "${key}" did not resolve (not yet created or missing). Skipping.`);
				continue;
			}
			childIds.push(candidate);
		}
		edges.push({
			fieldSlug: key,
			childIds
		});
	}
	return {
		columnData,
		edges
	};
}
/**
* Write reference edges for a content entry, replacing any existing set per
* relation (so re-applying a seed is idempotent). Throws to abort the enclosing
* transaction if a child entry cannot be resolved — a half-written entry is
* worse than a failed apply.
*/
async function applyContentReferences(trx, collectionSlug, contentId, edges) {
	for (const { fieldSlug, childIds } of edges) {
		const result = await setReferenceSelection(trx, collectionSlug, contentId, fieldSlug, childIds);
		if (!result.success) throw new Error(`content.${collectionSlug}: failed to write references for "${contentId}": ${result.error.message}`);
	}
}
async function applyContentTaxonomies(db, collectionSlug, contentId, entry, isUpdate) {
	const termRepo = new TaxonomyRepository(db);
	if (isUpdate) await termRepo.clearEntryTerms(collectionSlug, contentId);
	if (!entry.taxonomies) {
		if (isUpdate) {
			const { invalidateTermCache } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
			invalidateTermCache();
		}
		return;
	}
	for (const [taxonomyName, termSlugs] of Object.entries(entry.taxonomies)) for (const termSlug of termSlugs) {
		const term = await termRepo.findBySlug(taxonomyName, termSlug);
		if (term) await termRepo.attachToEntry(collectionSlug, contentId, term.id);
	}
	const { invalidateTermCache } = await import("./taxonomies-B__VmCKQ_CSS-JsWF.mjs").then((n) => n.f);
	invalidateTermCache();
}
/**
* Collect menu item rows recursively.
*
* When a `SeedMenuItem` carries `id`/`translationOf`, the import resolves the
* source item's `translation_group` so cross-locale "same nav entry" links
* survive export → apply. Items without `translationOf` get a fresh group
* (= their own id).
*/
function collectMenuItems(rows, menuId, locale, items, parentId, startOrder, seedIdMap, itemSeedIdMap) {
	let count = 0;
	let order = startOrder;
	for (const item of items) {
		const itemId = ulid();
		const itemLocale = item.locale ?? locale;
		let referenceId = null;
		let referenceCollection = null;
		if (item.type !== "custom" && item.type !== "taxonomy") {
			const collection = item.collection || (item.type === "page" || item.type === "post" ? `${item.type}s` : null);
			if (item.ref) {
				const resolved = seedIdMap.get(item.ref);
				if (resolved && collection) {
					referenceId = resolved;
					referenceCollection = collection;
				}
			} else referenceCollection = collection;
		}
		let translationGroup = itemId;
		if (item.translationOf) {
			const source = itemSeedIdMap.get(item.translationOf);
			if (source) translationGroup = source.translationGroup;
			else console.warn(`menu item "${item.label ?? item.url ?? item.ref ?? "(unlabeled)"}" (${itemLocale}): translationOf "${item.translationOf}" not found yet; minting a fresh group.`);
		}
		rows.push({
			id: itemId,
			menu_id: menuId,
			parent_id: parentId,
			sort_order: order,
			type: item.type,
			reference_collection: referenceCollection,
			reference_id: referenceId,
			custom_url: item.url ?? null,
			label: item.label || "",
			title_attr: item.titleAttr ?? null,
			target: item.target ?? null,
			css_classes: item.cssClasses ?? null,
			created_at: (/* @__PURE__ */ new Date()).toISOString(),
			locale: itemLocale,
			translation_group: translationGroup
		});
		if (item.id) itemSeedIdMap.set(item.id, {
			id: itemId,
			translationGroup
		});
		count++;
		order++;
		if (item.children && item.children.length > 0) {
			const childCount = collectMenuItems(rows, menuId, itemLocale, item.children, itemId, 0, seedIdMap, itemSeedIdMap);
			count += childCount;
		}
	}
	return count;
}
/**
* Build a widget row
*/
function createSeedWidgetRow(areaId, widget, sortOrder) {
	return {
		id: ulid(),
		area_id: areaId,
		sort_order: sortOrder,
		type: widget.type,
		title: widget.title ?? null,
		content: widget.content ? JSON.stringify(widget.content) : null,
		menu_name: widget.menuName ?? null,
		component_id: widget.componentId ?? null,
		component_props: widget.props ? JSON.stringify(widget.props) : null
	};
}
/**
* Type guard for $media reference
*/
function isSeedMediaReference(value) {
	if (typeof value !== "object" || value === null || !("$media" in value)) return false;
	const media = value.$media;
	return typeof media === "object" && media !== null && "url" in media && typeof media.url === "string";
}
/**
* Resolve $ref: and $media references in content data
*/
async function resolveReferences(data, seedIdMap, mediaContext, result) {
	const resolved = {};
	for (const [key, value] of Object.entries(data)) resolved[key] = await resolveValue(value, seedIdMap, mediaContext, result);
	return resolved;
}
/**
* Resolve a single value recursively
*/
async function resolveValue(value, seedIdMap, mediaContext, result) {
	if (typeof value === "string" && value.startsWith("$ref:")) {
		const seedId = value.slice(5);
		return seedIdMap.get(seedId) ?? value;
	}
	if (isSeedMediaReference(value)) return resolveMedia(value, mediaContext, result);
	if (Array.isArray(value)) return Promise.all(value.map((item) => resolveValue(item, seedIdMap, mediaContext, result)));
	if (typeof value === "object" && value !== null) {
		const resolved = {};
		for (const [k, v] of Object.entries(value)) resolved[k] = await resolveValue(v, seedIdMap, mediaContext, result);
		if (resolved._type === "gallery" && Array.isArray(resolved.images)) resolved.images = sanitizeGalleryImages(resolved.images, ulid);
		else if (resolved._type === "image" && "asset" in value && isSeedMediaReference(value.asset)) {
			const [image] = sanitizeGalleryImages([resolved], ulid);
			if (image) Object.assign(resolved, image);
		}
		return resolved;
	}
	return value;
}
/**
* Resolve a seeded byline avatar to a `media` row id. The file is assumed to
* already exist in storage (the caller supplies its `storageKey`), so nothing
* is downloaded or uploaded.
*
* Idempotent: if a media row with the same `storageKey` already exists it is
* reused rather than duplicated, so re-applying a seed in `update` mode does
* not leak rows. `created` reports whether a new row was inserted, so the
* caller can both account for it and delete it if the subsequent byline write
* fails (the only cross-dialect way to avoid an orphan — `withTransaction`
* is a no-op on D1).
*/
async function resolveSeedBylineAvatar(db, avatar) {
	const existing = await db.selectFrom("media").select("id").where("storage_key", "=", avatar.storageKey).orderBy("id", "asc").executeTakeFirst();
	if (existing) return {
		id: existing.id,
		created: false
	};
	const basename = avatar.storageKey.split("/").pop();
	const filename = avatar.filename ?? (basename && basename.length > 0 ? basename : avatar.storageKey);
	return {
		id: (await new MediaRepository(db).create({
			filename,
			mimeType: avatar.mimeType ?? "image/jpeg",
			storageKey: avatar.storageKey,
			alt: avatar.alt,
			width: avatar.width,
			height: avatar.height,
			status: "ready"
		})).id,
		created: true
	};
}
/**
* Delete a media row by id. Best-effort cleanup for a failed byline write: a
* failure here must not mask the original error that triggered the cleanup, so
* it is logged and swallowed rather than thrown.
*/
async function deleteMediaRow(db, id) {
	try {
		await db.deleteFrom("media").where("id", "=", id).execute();
	} catch (error) {
		console.warn(`[seed] failed to clean up orphaned avatar media ${id}:`, error);
	}
}
/**
* Resolve a $media reference by downloading and uploading the media
*/
async function resolveMedia(ref, ctx, result) {
	const { url, alt, filename, caption, libraryCaption } = ref.$media;
	const cached = ctx.mediaCache.get(url);
	if (cached) {
		result.media.skipped++;
		return {
			...cached,
			alt: alt ?? cached.alt,
			caption: caption ?? cached.caption
		};
	}
	if (ctx.skipMediaDownload) {
		const defaultCaption = libraryCaption ?? void 0;
		const mediaValue = {
			provider: "external",
			id: ulid(),
			src: url,
			alt: alt ?? void 0,
			caption: caption ?? defaultCaption,
			filename: filename ?? void 0
		};
		ctx.mediaCache.set(url, {
			...mediaValue,
			caption: defaultCaption
		});
		result.media.skipped++;
		return mediaValue;
	}
	if (!ctx.storage) {
		console.warn(`Skipping $media reference (no storage configured): ${url}`);
		result.media.skipped++;
		return null;
	}
	try {
		validateExternalUrl(url);
		console.log(`  📥 Downloading: ${url}`);
		ctx.budget?.countMediaDownload();
		const response = await ssrfSafeFetch(url, { headers: { "User-Agent": "EmDash-CMS/1.0" } });
		if (!response.ok) {
			console.warn(`  ⚠️ Failed to download ${url}: ${response.status}`);
			result.media.skipped++;
			return null;
		}
		const contentType = response.headers.get("content-type") || "application/octet-stream";
		const ext = getExtensionFromContentType(contentType) || getExtensionFromUrl(url) || ".bin";
		const arrayBuffer = await response.arrayBuffer();
		const body = new Uint8Array(arrayBuffer);
		const contentHash = await computeContentHash(body);
		const mediaRepo = new MediaRepository(ctx.db);
		const existing = await mediaRepo.findByContentHash(contentHash);
		if (existing) {
			const mediaValue = {
				provider: "local",
				id: existing.id,
				alt: alt ?? existing.alt ?? void 0,
				caption: caption ?? existing.caption ?? void 0,
				width: existing.width ?? void 0,
				height: existing.height ?? void 0,
				mimeType: existing.mimeType,
				filename: existing.filename,
				meta: { storageKey: existing.storageKey }
			};
			ctx.mediaCache.set(url, {
				...mediaValue,
				caption: existing.caption ?? void 0
			});
			result.media.skipped++;
			console.log(`  ✅ Reused: ${existing.filename}`);
			return mediaValue;
		}
		const storageId = ulid();
		const finalFilename = filename || generateFilename(url, ext);
		const storageKey = `${storageId}${ext}`;
		let width;
		let height;
		if (contentType.startsWith("image/")) {
			const dimensions = getImageDimensions(body);
			width = dimensions?.width;
			height = dimensions?.height;
		}
		await ctx.storage.upload({
			key: storageKey,
			body,
			contentType
		});
		const media = await mediaRepo.create({
			filename: finalFilename,
			mimeType: contentType,
			size: body.length,
			width,
			height,
			alt,
			caption: (libraryCaption === void 0 ? caption : libraryCaption) ?? void 0,
			storageKey,
			contentHash,
			status: "ready"
		});
		const mediaValue = {
			provider: "local",
			id: media.id,
			alt: alt ?? void 0,
			caption: caption ?? media.caption ?? void 0,
			width,
			height,
			mimeType: contentType,
			filename: finalFilename,
			meta: { storageKey }
		};
		ctx.mediaCache.set(url, {
			...mediaValue,
			caption: media.caption ?? void 0
		});
		result.media.created++;
		console.log(`  ✅ Uploaded: ${finalFilename}`);
		return mediaValue;
	} catch (error) {
		console.warn(`  ⚠️ Error processing $media ${url}:`, error instanceof Error ? error.message : error);
		result.media.skipped++;
		return null;
	}
}
/**
* Get file extension from content type
*/
function getExtensionFromContentType(contentType) {
	const baseMime = contentType.split(";")[0].trim();
	const ext = mime.getExtension(baseMime);
	return ext ? `.${ext}` : null;
}
/**
* Get file extension from URL
*/
function getExtensionFromUrl(url) {
	try {
		const match = new URL(url).pathname.match(FILE_EXTENSION_PATTERN);
		return match ? `.${match[1]}` : null;
	} catch {
		return null;
	}
}
/**
* Generate a filename from URL
*/
function generateFilename(url, ext) {
	try {
		return `${(new URL(url).pathname.split("/").pop() || "media").replace(EXTENSION_PATTERN, "").replace(QUERY_PARAM_PATTERN, "").replace(SANITIZE_PATTERN, "-").replace(MULTIPLE_HYPHENS_PATTERN, "-") || "media"}${ext}`;
	} catch {
		return `media${ext}`;
	}
}
/**
* Get image dimensions from buffer using image-size.
* Supports PNG, JPEG, GIF, WebP, AVIF, SVG, TIFF, and more.
*/
function getImageDimensions(buffer) {
	try {
		const result = imageSize(buffer);
		if (result.width != null && result.height != null) return {
			width: result.width,
			height: result.height
		};
		return null;
	} catch {
		return null;
	}
}
export { resolveImageMedia as a, createPublicMediaUrlResolver as i, applySeedWithinBudget as n, sanitizeGalleryImages as o, apply_exports as r, applySeed as t };
