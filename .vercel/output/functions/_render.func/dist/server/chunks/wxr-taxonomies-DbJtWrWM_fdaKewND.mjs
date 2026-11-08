import { n as localeMatches, r as localeOrder } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { d as findTaxonomyStructure, x as selectTaxonomyDefs } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { f as invalidateTermCache } from "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
// node_modules/emdash/dist/wxr-taxonomies-DbJtWrWM.mjs
/**
* Thrown by `mirrorTermsToLocales` when a pre-existing locale row at the
* same `(taxonomy, slug)` belongs to a different `translation_group` than
* the canonical term. Callers in the route layer surface
* `publicMessage` to the operator (no internal data) while logging
* `cause` server-side.
*
* Marker class so the route layer can distinguish "operator-actionable
* taxonomy conflict" from any other DB / repository error that might
* escape the helper.
*/
var WxrTaxonomyConflictError = class extends Error {
	publicMessage;
	constructor(publicMessage, options) {
		super(publicMessage, options);
		this.name = "WxrTaxonomyConflictError";
		this.publicMessage = publicMessage;
	}
};
function isWxrTaxonomyConflictError(error) {
	return error instanceof WxrTaxonomyConflictError;
}
function makeState() {
	return { plan: {
		termsCreated: {},
		termsReused: {},
		missingTaxonomies: [],
		termIdByNameAndSlug: /* @__PURE__ */ new Map(),
		collectionsByTaxonomy: /* @__PURE__ */ new Map(),
		translationGroupByTermId: /* @__PURE__ */ new Map()
	} };
}
/**
* Record-keeping helpers — keep mutations centralised so the result object
* stays consistent.
*/
function bump(record, key) {
	record[key] = (record[key] ?? 0) + 1;
}
function rememberTerm(state, taxonomyName, slug, termId) {
	let bySlug = state.plan.termIdByNameAndSlug.get(taxonomyName);
	if (!bySlug) {
		bySlug = /* @__PURE__ */ new Map();
		state.plan.termIdByNameAndSlug.set(taxonomyName, bySlug);
	}
	bySlug.set(slug, termId);
}
function parseDefCollections(raw) {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed.filter((c) => typeof c === "string");
	} catch {}
	return [];
}
/**
* Rebuild the taxonomy lookup maps from the database without creating
* anything. The chunked WP import runs term creation once (first content
* chunk); every later chunk only needs the maps to attach per-post
* assignments, and two SELECTs are far cheaper than re-walking every term
* through the ensure path.
*
* ponytail: first row wins per (name, slug), ordered by locale asc — the
* same row `findBySlug` without a locale resolves to. Per-locale term
* variants beyond that are the mirror pass's job, not the importer's.
*/
async function loadTaxonomyPlanFromDb(db) {
	const state = makeState();
	const defs = await selectTaxonomyDefs(db).orderBy("d.locale", "asc").execute();
	for (const def of defs) if (!state.plan.collectionsByTaxonomy.has(def.name)) state.plan.collectionsByTaxonomy.set(def.name, new Set(parseDefCollections(def.collections)));
	const terms = await db.selectFrom("taxonomies").select([
		"name",
		"slug",
		"id"
	]).orderBy("locale", "asc").execute();
	for (const term of terms) if (!state.plan.termIdByNameAndSlug.get(term.name)?.has(term.slug)) rememberTerm(state, term.name, term.slug, term.id);
	return state.plan;
}
function termKey(taxonomyName, slug) {
	return `${taxonomyName}\u0000${slug}`;
}
/**
* Find or create many terms in a small number of batched SELECTs instead of
* one SELECT per term. This is the dominant fixed cost for WXR imports with
* large category/tag vocabularies: a site with 100+ categories would otherwise
* spend one D1 round-trip per category before writing any posts.
*
* Batching rules:
*   - Descriptors already resolved in `state.plan.termIdByNameAndSlug` are
*     skipped (same idempotency as the old per-term loop).
*   - Remaining descriptors are deduplicated by `(taxonomy, slug)`; the first
*     label/description seen wins, matching the old behaviour where the first
*     `ensureTerm` call cached the id.
*   - One batched SELECT resolves existing rows at the requested locale.
*   - One batched SELECT resolves any-locale rows for use as `translationOf`.
*   - Missing rows are still created one at a time because each insert needs
*     its own ULID/translation_group/sort_order bookkeeping, but the reads are
*     where the round-trip bottleneck lives.
*/
async function ensureTermsBatch(db, state, descriptors, locale) {
	if (descriptors.length === 0) return;
	const repo = new TaxonomyRepository(db);
	const needed = [];
	const seenKeys = /* @__PURE__ */ new Set();
	for (const d of descriptors) {
		if (state.plan.termIdByNameAndSlug.get(d.taxonomyName)?.has(d.slug)) continue;
		const key = termKey(d.taxonomyName, d.slug);
		if (seenKeys.has(key)) continue;
		seenKeys.add(key);
		needed.push(d);
	}
	if (needed.length === 0) return;
	const existingAtLocale = await findExistingTerms(db, needed, locale);
	for (const row of existingAtLocale) {
		bump(state.plan.termsReused, row.name);
		rememberTerm(state, row.name, row.slug, row.id);
	}
	const stillNeeded = [];
	for (const d of needed) if (!state.plan.termIdByNameAndSlug.get(d.taxonomyName)?.has(d.slug)) stillNeeded.push(d);
	if (stillNeeded.length === 0) return;
	const anyLocaleRows = await findExistingTerms(db, stillNeeded, void 0);
	const translationOfByKey = /* @__PURE__ */ new Map();
	for (const row of anyLocaleRows) {
		const key = termKey(row.name, row.slug);
		if (!translationOfByKey.has(key)) translationOfByKey.set(key, row.id);
	}
	for (const d of stillNeeded) {
		const created = await repo.create({
			name: d.taxonomyName,
			slug: d.slug,
			label: d.label,
			data: d.description ? { description: d.description } : void 0,
			locale,
			translationOf: translationOfByKey.get(termKey(d.taxonomyName, d.slug))
		});
		bump(state.plan.termsCreated, d.taxonomyName);
		rememberTerm(state, d.taxonomyName, d.slug, created.id);
	}
}
/**
* Batched lookup of term rows for a list of `(taxonomy, slug)` pairs.
* Chunks at `SQL_BATCH_SIZE / 2` because each pair consumes two bind
* parameters (`name` and `slug`). When `locale` is omitted, returns rows
* for all locales ordered by locale ascending so callers can pick the first
* row per pair (mirroring `TaxonomyRepository.findBySlug` without a locale
* argument).
*/
async function findExistingTerms(db, descriptors, locale) {
	const { chunks, SQL_BATCH_SIZE } = await import("./chunks-DiW8VMwz_5ydu36Av.mjs").then((n) => n.r);
	const rows = [];
	const seenKeys = /* @__PURE__ */ new Set();
	for (const batch of chunks(descriptors, Math.floor(SQL_BATCH_SIZE / 2))) {
		const batchRows = await db.selectFrom("taxonomies").select([
			"id",
			"name",
			"slug"
		]).where((eb) => eb.or(batch.map((d) => eb.and([eb("name", "=", d.taxonomyName), eb("slug", "=", d.slug)])))).$if(locale !== void 0, (qb) => qb.where(localeMatches("locale", locale))).orderBy(locale !== void 0 ? localeOrder("locale", locale) : "locale", "asc").execute();
		for (const row of batchRows) {
			const key = termKey(row.name, row.slug);
			if (seenKeys.has(key)) continue;
			seenKeys.add(key);
			rows.push(row);
		}
	}
	return rows;
}
/**
* Retrieve the human label captured by the parser for a per-item
* `<category>` text body, falling back to the slug when the parser didn't
* see a label (e.g. self-closing tags or whitespace-only bodies).
*/
function labelFor(post, taxonomy, slug) {
	const key = `${taxonomy}\u0000${slug}`;
	return post.taxonomyLabels?.get(key) ?? slug;
}
/**
* Pre-import every term referenced by the WXR file.
*
* Pass 1: `wp:category` blocks. Each becomes a term in EmDash's seeded
*         `category` taxonomy.
* Pass 2: `wp:tag` blocks. Each becomes a term in `tag`.
* Pass 3: `wp:term` blocks (custom taxonomies). Skipped when no matching
*         EmDash def exists.
* Pass 4: per-item `<category domain="…" nicename="…">` assignments. WXR
*         exports sometimes reference taxonomies/terms that weren't declared
*         at the top level (older exports especially), so we backfill terms
*         from per-item assignments. Categories and tags use the seeded defs
*         and pick up the assignment text as the label; custom domains fall
*         back to the same "def must exist" rule.
*/
async function preImportWxrTaxonomies(db, posts, categories, tags, terms, locale) {
	const state = makeState();
	const defCache = /* @__PURE__ */ new Map();
	const lookupDef = async (name) => {
		if (defCache.has(name)) return defCache.get(name) ?? null;
		const def = await findTaxonomyStructure(db, name);
		defCache.set(name, def);
		if (def) state.plan.collectionsByTaxonomy.set(name, new Set(def.collections));
		return def;
	};
	const categoryDef = await lookupDef("category");
	const tagDef = await lookupDef("tag");
	const topLevel = [];
	if (categoryDef) for (const cat of categories) {
		if (!cat.nicename || !cat.name) continue;
		topLevel.push({
			taxonomyName: "category",
			slug: cat.nicename,
			label: cat.name,
			description: cat.description
		});
	}
	else if (categories.length > 0) state.plan.missingTaxonomies.push("category");
	if (tagDef) for (const tag of tags) {
		if (!tag.slug || !tag.name) continue;
		topLevel.push({
			taxonomyName: "tag",
			slug: tag.slug,
			label: tag.name,
			description: tag.description
		});
	}
	else if (tags.length > 0) state.plan.missingTaxonomies.push("tag");
	for (const term of terms) {
		if (term.taxonomy === "nav_menu" || term.taxonomy === "language") continue;
		const taxonomyName = term.taxonomy === "post_tag" ? "tag" : term.taxonomy;
		if (!await lookupDef(taxonomyName)) {
			if (!state.plan.missingTaxonomies.includes(taxonomyName)) state.plan.missingTaxonomies.push(taxonomyName);
			continue;
		}
		topLevel.push({
			taxonomyName,
			slug: term.slug,
			label: term.name,
			description: term.description
		});
	}
	await ensureTermsBatch(db, state, topLevel, locale);
	const fromPosts = [];
	let recordedMissingCategoryFromPosts = false;
	let recordedMissingTagFromPosts = false;
	for (const post of posts) {
		for (const slug of post.categories) {
			if (!categoryDef) {
				if (!recordedMissingCategoryFromPosts && !state.plan.missingTaxonomies.includes("category")) {
					state.plan.missingTaxonomies.push("category");
					recordedMissingCategoryFromPosts = true;
				}
				break;
			}
			if (state.plan.termIdByNameAndSlug.get("category")?.has(slug)) continue;
			fromPosts.push({
				taxonomyName: "category",
				slug,
				label: labelFor(post, "category", slug)
			});
		}
		for (const slug of post.tags) {
			if (!tagDef) {
				if (!recordedMissingTagFromPosts && !state.plan.missingTaxonomies.includes("tag")) {
					state.plan.missingTaxonomies.push("tag");
					recordedMissingTagFromPosts = true;
				}
				break;
			}
			if (state.plan.termIdByNameAndSlug.get("tag")?.has(slug)) continue;
			fromPosts.push({
				taxonomyName: "tag",
				slug,
				label: labelFor(post, "tag", slug)
			});
		}
		if (post.customTaxonomies) for (const [rawName, slugs] of post.customTaxonomies) {
			if (rawName === "nav_menu" || rawName === "language") continue;
			const taxonomyName = rawName === "post_tag" ? "tag" : rawName;
			if (!await lookupDef(taxonomyName)) {
				if (!state.plan.missingTaxonomies.includes(taxonomyName)) state.plan.missingTaxonomies.push(taxonomyName);
				continue;
			}
			for (const slug of slugs) {
				if (state.plan.termIdByNameAndSlug.get(taxonomyName)?.has(slug)) continue;
				fromPosts.push({
					taxonomyName,
					slug,
					label: labelFor(post, taxonomyName, slug)
				});
			}
		}
	}
	await ensureTermsBatch(db, state, fromPosts, locale);
	invalidateTermCache();
	return state.plan;
}
/**
* Walk a parsed WXR post's per-item taxonomy assignments and return only
* the ones that resolve to a real EmDash term AND aren't filtered out by
* the taxonomy def's `collections` allowlist. Grouped by EmDash taxonomy
* name (so `post_tag` is already folded into `tag`). Deduplicated.
*
* This is the single source of truth for "what will the importer try to
* write for this post". Both the anchor (additive `attachToEntry`) and
* translation (per-taxonomy `setTermsForEntry`) paths drive from this map
* so they agree on which taxonomies need touching. In particular, the
* translation path uses the keys here -- not `postAssignedTaxonomies` --
* to decide which inherited pivot rows to clear, so a translation whose
* only assignment is filtered out by `collections` doesn't lose its
* inherited terms (see #1087 review feedback).
*
* Skipped taxonomies: `nav_menu` (handled by the menu importer) and
* `language` (Polylang's locale signal, already promoted to `post.locale`
* by the parser).
*/
function resolvePostTermAssignments(collection, post, plan) {
	const result = /* @__PURE__ */ new Map();
	const seen = /* @__PURE__ */ new Set();
	const tryResolve = (taxonomyName, slug) => {
		const termId = plan.termIdByNameAndSlug.get(taxonomyName)?.get(slug);
		if (!termId) return;
		const collectionFilter = plan.collectionsByTaxonomy.get(taxonomyName);
		if (collectionFilter && collectionFilter.size > 0 && !collectionFilter.has(collection)) return;
		const dedupeKey = `${taxonomyName}\u0000${termId}`;
		if (seen.has(dedupeKey)) return;
		seen.add(dedupeKey);
		const existing = result.get(taxonomyName);
		if (existing) existing.push(termId);
		else result.set(taxonomyName, [termId]);
	};
	for (const slug of post.categories) tryResolve("category", slug);
	for (const slug of post.tags) tryResolve("tag", slug);
	if (post.customTaxonomies) for (const [rawName, slugs] of post.customTaxonomies) {
		if (rawName === "nav_menu" || rawName === "language") continue;
		const taxonomyName = rawName === "post_tag" ? "tag" : rawName;
		for (const slug of slugs) tryResolve(taxonomyName, slug);
	}
	return result;
}
/**
* Attach the taxonomy assignments parsed for a single WXR post to a freshly-
* created EmDash content row. Additive (`attachToEntry` + `ON CONFLICT DO
* NOTHING`). Used for anchors -- translations need replace-semantics per
* taxonomy and should use `setPostTermAssignmentsReplacing` instead.
*
* Returns the number of pivot rows actually inserted (excludes rows that
* already existed via the `ON CONFLICT DO NOTHING` path), so the caller can
* roll them up into the import summary without over-counting on re-imports.
*/
async function attachPostTaxonomies(db, collection, entryId, post, plan) {
	const repo = new TaxonomyRepository(db);
	const resolved = resolvePostTermAssignments(collection, post, plan);
	const groups = /* @__PURE__ */ new Set();
	for (const [, termIds] of resolved) for (const termId of termIds) {
		const group = await termTranslationGroup(repo, plan, termId);
		if (group) groups.add(group);
	}
	return repo.attachGroupsToEntry(collection, entryId, [...groups]);
}
/**
* Replace assignments per-taxonomy from a parsed WXR post. Used for
* translations. Assignments belong to the content translation_group, so a
* translated item's explicit taxonomy replaces that taxonomy for every
* locale. Taxonomies with no resolvable permitted terms are left unchanged.
*
* Returns the number of pivot rows after replacement (sum of `termIds`
* lists across taxonomies actually touched). Note this counts logical
* assignments, not the delta from the prior state; the import summary
* treats this as an additive count for compatibility with `attachPost-
* Taxonomies`.
*/
async function setPostTermAssignmentsReplacing(db, collection, entryId, post, plan) {
	const repo = new TaxonomyRepository(db);
	const resolved = resolvePostTermAssignments(collection, post, plan);
	let attached = 0;
	for (const [taxonomyName, termIds] of resolved) {
		await repo.setTermsForEntry(collection, entryId, taxonomyName, termIds);
		attached += termIds.length;
	}
	return attached;
}
/**
* Resolve a term id to its `translation_group` (the value
* `content_taxonomies` stores). Caches the result on the plan so
* repeated attaches of the same term don't repeat the lookup.
*/
async function termTranslationGroup(repo, plan, termId) {
	const cached = plan.translationGroupByTermId.get(termId);
	if (cached !== void 0) return cached;
	const group = (await repo.findById(termId))?.translationGroup ?? null;
	plan.translationGroupByTermId.set(termId, group);
	return group;
}
/**
* Mirror every term in the plan into each additional locale used by the
* incoming posts. New rows share the canonical term's `translation_group`
* so per-locale lookups (`getTermsForEntry(..., locale)`) resolve correctly
* for translations whose locale differs from the import-wide one.
*
* Without this pass, multilingual WXR imports (#1080) write all term rows
* at the upload-wide locale; the `content_taxonomies` pivot is correct (it
* stores `translation_group`, not `term id`), but
* `getTermsForEntry(collection, arabicPostId, "category", "ar")` filters on
* `taxonomies.locale = "ar"` and returns zero rows. Users see "no tags" on
* every non-canonical translation.
*
* Idempotent: skips a locale when a row already exists at `(name, slug,
* locale)`. Safe to call after `preImportWxrTaxonomies` on subsequent
* imports.
*/
async function mirrorTermsToLocales(db, plan, postLocales, canonicalLocale) {
	const localeSet = /* @__PURE__ */ new Set();
	for (const locale of postLocales) {
		if (!locale || locale === canonicalLocale) continue;
		localeSet.add(locale);
	}
	if (localeSet.size === 0) return;
	const repo = new TaxonomyRepository(db);
	for (const [taxonomyName, bySlug] of plan.termIdByNameAndSlug) for (const [slug, canonicalTermId] of bySlug) {
		const cachedGroup = await termTranslationGroup(repo, plan, canonicalTermId);
		if (!cachedGroup) continue;
		const canonicalGroup = cachedGroup;
		for (const locale of localeSet) {
			const existing = await repo.findBySlug(taxonomyName, slug, locale);
			if (existing) {
				if (existing.translationGroup !== canonicalGroup) throw new WxrTaxonomyConflictError(`Cannot import: term "${taxonomyName}/${slug}" already exists at locale "${locale}" in a different translation group than the canonical row at this import's locale. Reconcile the rows in the admin (re-link via translationOf, or delete one) and retry.`);
				continue;
			}
			try {
				await repo.create({
					name: taxonomyName,
					slug,
					label: slug,
					locale,
					translationOf: canonicalTermId
				});
			} catch (error) {
				const message = error instanceof Error ? error.message.toLowerCase() : "";
				if (!(message.includes("unique constraint failed") || message.includes("duplicate key"))) throw error;
				const winner = await repo.findBySlug(taxonomyName, slug, locale);
				if (!winner) throw new WxrTaxonomyConflictError(`Cannot import: term "${taxonomyName}/${slug}" raced UNIQUE at locale "${locale}" but no row is visible afterwards. The concurrent transaction may have rolled back; retry the import.`, { cause: error });
				if (winner.translationGroup !== canonicalGroup) throw new WxrTaxonomyConflictError(`Cannot import: term "${taxonomyName}/${slug}" raced UNIQUE at locale "${locale}" with a different translation group. Reconcile the rows in the admin and retry.`, { cause: error });
				console.warn(`[WXR import] concurrent writer beat us to term "${taxonomyName}/${slug}" at locale "${locale}"; using existing row (same group).`);
			}
		}
	}
}
export { preImportWxrTaxonomies as a, mirrorTermsToLocales as i, isWxrTaxonomyConflictError as n, setPostTermAssignmentsReplacing as o, loadTaxonomyPlanFromDb as r, attachPostTaxonomies as t };
