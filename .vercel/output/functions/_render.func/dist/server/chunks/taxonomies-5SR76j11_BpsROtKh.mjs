import { a as __exportAll, b as resolveConfiguredLocale, g as getLocaleChainRank, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { n as localeMatches } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { b as saveTaxonomyStructure, d as findTaxonomyStructure, g as parseTaxonomyCollections, x as selectTaxonomyDefs } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { d as invalidateTaxonomyDefsCache, f as invalidateTermCache, t as fetchVisibleTermCounts } from "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/taxonomies-5SR76j11.mjs
/**
* Taxonomy and term CRUD handlers.
*
* i18n: terms and defs are per-locale. `(name, slug, locale)` is unique for
* terms; `(name, locale)` for defs. Translations of the same term/def share a
* `translation_group`. The content_taxonomies pivot stores translation_groups
* so assignments span every locale of a post.
*
* A def's `label` and `labelSingular` belong to its locale; `hierarchical` and
* `collections` belong to the taxonomy and read and write the same through
* every locale.
*/
var taxonomies_exports = /* @__PURE__ */ __exportAll({
	handleTaxonomyCreate: () => handleTaxonomyCreate,
	handleTaxonomyDefTranslations: () => handleTaxonomyDefTranslations,
	handleTaxonomyDelete: () => handleTaxonomyDelete,
	handleTaxonomyGet: () => handleTaxonomyGet,
	handleTaxonomyList: () => handleTaxonomyList,
	handleTaxonomyUpdate: () => handleTaxonomyUpdate,
	handleTermCreate: () => handleTermCreate,
	handleTermDelete: () => handleTermDelete,
	handleTermGet: () => handleTermGet,
	handleTermList: () => handleTermList,
	handleTermReorder: () => handleTermReorder,
	handleTermTranslations: () => handleTermTranslations,
	handleTermUpdate: () => handleTermUpdate
});
var NAME_PATTERN = /^[a-z][a-z0-9_]*$/;
var MAX_GENERATED_TERM_SLUG_ATTEMPTS = 16;
function isTermSlugUniqueViolation(error) {
	const message = error instanceof Error ? error.message.toLowerCase() : "";
	return (message.includes("unique constraint failed") || message.includes("duplicate key")) && message.includes("slug");
}
function isTermTranslationLocaleUniqueViolation(error) {
	const message = error instanceof Error ? error.message.toLowerCase() : "";
	return (message.includes("unique constraint failed") || message.includes("duplicate key")) && (message.includes("translation_group") || message.includes("idx_taxonomies_translation_group_locale_unique"));
}
/**
* Build tree structure from flat terms
*/
function buildTree(flatTerms, resolveByGroup = false) {
	const byLocaleGroup = /* @__PURE__ */ new Map();
	const roots = [];
	for (const term of flatTerms) {
		const key = resolveByGroup ? term.translationGroup ?? term.id : `${term.locale}::${term.translationGroup ?? term.id}`;
		byLocaleGroup.set(key, term);
	}
	for (const term of flatTerms) {
		const parent = term.parentId ? byLocaleGroup.get(resolveByGroup ? term.parentId : `${term.locale}::${term.parentId}`) : void 0;
		if (parent) parent.children.push(term);
		else roots.push(term);
	}
	return roots;
}
function taxonomyDefNotFound(name, locale) {
	return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: `Taxonomy '${name}' not found${locale !== void 0 ? ` in locale '${locale}'` : ""}`
		}
	};
}
/** Look up the exact definition addressed by a mutation. */
async function requireTaxonomyDef(db, name, locale) {
	const def = await selectTaxonomyDefs(db, locale).where("d.name", "=", name).orderBy("d.locale", "asc").orderBy("d.id", "asc").executeTakeFirst();
	return def ? {
		success: true,
		def
	} : taxonomyDefNotFound(name, locale);
}
/**
* Prefer the requested locale, then the configured default. Incomplete
* translation groups fall back deterministically so their terms remain usable.
*/
async function requireTaxonomyDefWithFallback(db, name, locale) {
	const defs = await selectTaxonomyDefs(db).where("d.name", "=", name).execute();
	const defaultLocale = getI18nConfig()?.defaultLocale;
	const chain = locale ? [locale, ...defaultLocale && defaultLocale !== locale ? [defaultLocale] : []] : defaultLocale ? [defaultLocale] : [];
	const def = defs.toSorted((a, b) => getLocaleChainRank(a.locale, chain) - getLocaleChainRank(b.locale, chain) || a.locale.localeCompare(b.locale) || a.id.localeCompare(b.id))[0];
	return def ? {
		success: true,
		def
	} : taxonomyDefNotFound(name, locale);
}
function validateHierarchicalParent(def, taxonomyName, parentId) {
	if (parentId === void 0 || parentId === null || def.hierarchical === 1) return null;
	return {
		code: "VALIDATION_ERROR",
		message: `Taxonomy '${taxonomyName}' is not hierarchical and cannot have parent terms`
	};
}
/** The subset of `slugs` that still has a row in `_emdash_collections`. */
async function findExistingCollections(db, slugs) {
	if (slugs.length === 0) return /* @__PURE__ */ new Set();
	const rows = await db.selectFrom("_emdash_collections").select("slug").where("slug", "in", [...slugs]).execute();
	return new Set(rows.map((r) => r.slug));
}
/**
* Reject a `collections` list naming collections that don't exist. Shared by
* create and update so both fail the same way instead of storing a reference
* that reads back filtered out.
*/
async function validateCollections(db, collections) {
	const existing = await findExistingCollections(db, collections);
	const invalid = collections.filter((slug) => !existing.has(slug));
	if (invalid.length === 0) return null;
	return {
		code: "VALIDATION_ERROR",
		message: `Unknown collection(s): ${invalid.join(", ")}`
	};
}
/**
* Shape one definition row for a response, dropping collection references whose
* collection is gone. Storage is untouched — re-creating the collection
* re-links automatically, same as `handleTaxonomyList`.
*/
async function toTaxonomyResponse(db, row) {
	const def = rowToDef(row);
	const realCollections = await findExistingCollections(db, def.collections);
	return { taxonomy: {
		...def,
		collections: def.collections.filter((slug) => realCollections.has(slug))
	} };
}
function rowToDef(row) {
	return {
		id: row.id,
		name: row.name,
		label: row.label,
		labelSingular: row.label_singular ?? void 0,
		hierarchical: row.hierarchical === 1,
		collections: parseTaxonomyCollections(row.collections),
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
/**
* List all taxonomy definitions
*/
async function handleTaxonomyList(db, options = {}) {
	try {
		const query = selectTaxonomyDefs(db, options.locale ? resolveConfiguredLocale(options.locale) : void 0);
		const [rows, collectionRows] = await Promise.all([query.execute(), db.selectFrom("_emdash_collections").select("slug").execute()]);
		const realCollections = new Set(collectionRows.map((r) => r.slug));
		return {
			success: true,
			data: { taxonomies: rows.map((row) => {
				const def = rowToDef(row);
				return {
					...def,
					collections: def.collections.filter((slug) => realCollections.has(slug))
				};
			}) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TAXONOMY_LIST_ERROR",
				message: "Failed to list taxonomies"
			}
		};
	}
}
/**
* Get a single taxonomy definition by name.
*
* Definitions are per-locale, so `locale` picks which one. Without it the
* configured default locale wins, then the lowest locale code.
*/
async function handleTaxonomyGet(db, name, options = {}) {
	try {
		const lookup = await requireTaxonomyDefWithFallback(db, name, options.locale ? resolveConfiguredLocale(options.locale) : void 0);
		if (!lookup.success) return lookup;
		return {
			success: true,
			data: await toTaxonomyResponse(db, lookup.def)
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TAXONOMY_GET_ERROR",
				message: "Failed to get taxonomy"
			}
		};
	}
}
/**
* Create a taxonomy definition in one locale.
*
* When the taxonomy already exists in another locale, the new definition joins
* it whether or not `translationOf` is given, and takes its `hierarchical` and
* `collections`. A differing value sent with it is rejected rather than applied
* to every locale; changing the structure is an update.
*/
async function handleTaxonomyCreate(db, input) {
	try {
		const locale = resolveConfiguredLocale(input.locale ?? getI18nConfig()?.defaultLocale ?? "en");
		if (!NAME_PATTERN.test(input.name)) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Taxonomy name must start with a letter and contain only lowercase letters, numbers, and underscores"
			}
		};
		if (input.translationOf) {
			const source = await db.selectFrom("_emdash_taxonomy_defs").select("name").where("id", "=", input.translationOf).executeTakeFirst();
			if (!source) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: "Source taxonomy for translation not found"
				}
			};
			if (source.name !== input.name) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `A translation of taxonomy '${source.name}' must use the same name`
				}
			};
		}
		if (input.collections !== void 0) {
			const collectionError = await validateCollections(db, input.collections);
			if (collectionError) return {
				success: false,
				error: collectionError
			};
		}
		if (await db.selectFrom("_emdash_taxonomy_defs").select("id").where("name", "=", input.name).where(localeMatches("locale", locale)).executeTakeFirst()) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Taxonomy '${input.name}' already exists in locale '${locale}'`
			}
		};
		const id = ulid();
		const existingStructure = await findTaxonomyStructure(db, input.name);
		if (existingStructure && !await matchesStructure(db, existingStructure, input)) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Taxonomy '${input.name}' already exists in another locale with a different hierarchical or collections value; change them with an update`
			}
		};
		const structure = existingStructure ?? {
			hierarchical: input.hierarchical ?? false,
			collections: [...new Set(input.collections ?? [])]
		};
		const groupId = existingStructure?.id ?? id;
		await withTransaction(db, async (trx) => {
			await trx.insertInto("_emdash_taxonomy_defs").values({
				id,
				name: input.name,
				label: input.label,
				label_singular: input.labelSingular ?? null,
				hierarchical: structure.hierarchical ? 1 : 0,
				collections: JSON.stringify(structure.collections),
				locale,
				translation_group: groupId
			}).execute();
			await saveTaxonomyStructure(trx, input.name, groupId, structure, {});
		});
		invalidateTaxonomyDefsCache();
		return {
			success: true,
			data: { taxonomy: rowToDef(await selectTaxonomyDefs(db).where("d.id", "=", id).executeTakeFirstOrThrow()) }
		};
	} catch (error) {
		if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Taxonomy '${input.name}' already exists`
			}
		};
		return {
			success: false,
			error: {
				code: "TAXONOMY_CREATE_ERROR",
				message: "Failed to create taxonomy"
			}
		};
	}
}
/**
* Whether the `hierarchical` and `collections` a request sends, if any, equal
* `structure` as a read returns it, without collections that no longer exist.
*/
async function matchesStructure(db, structure, input) {
	if (input.hierarchical !== void 0 && input.hierarchical !== structure.hierarchical) return false;
	if (input.collections === void 0) return true;
	const existing = await findExistingCollections(db, structure.collections);
	const visible = structure.collections.filter((collection) => existing.has(collection));
	const sent = new Set(input.collections);
	return sent.size === visible.length && visible.every((collection) => sent.has(collection));
}
/**
* Update a taxonomy definition.
*
* `label` and `labelSingular` write the one row `(name, locale)` resolves to.
* `hierarchical` and `collections` write the taxonomy, so every locale changes.
* `name` and `locale` are immutable (renaming would strand the terms, which are
* keyed on `name`).
*/
async function handleTaxonomyUpdate(db, name, input) {
	try {
		const lookup = await requireTaxonomyDef(db, name, input.locale ? resolveConfiguredLocale(input.locale) : void 0);
		if (!lookup.success) return lookup;
		const collections = input.collections ? [...new Set(input.collections)] : void 0;
		if (collections !== void 0) {
			const collectionError = await validateCollections(db, collections);
			if (collectionError) return {
				success: false,
				error: collectionError
			};
		}
		const updates = {};
		if (input.label !== void 0) updates.label = input.label;
		if (input.labelSingular !== void 0) updates.label_singular = input.labelSingular;
		const structureChanged = input.hierarchical !== void 0 || collections !== void 0;
		if (Object.keys(updates).length > 0 || structureChanged) {
			const def = lookup.def;
			await withTransaction(db, async (trx) => {
				if (Object.keys(updates).length > 0) await trx.updateTable("_emdash_taxonomy_defs").set(updates).where("id", "=", def.id).execute();
				if (structureChanged) await saveTaxonomyStructure(trx, name, def.translation_group ?? def.id, {
					hierarchical: input.hierarchical ?? def.hierarchical === 1,
					collections: collections ?? parseTaxonomyCollections(def.collections)
				}, {
					hierarchical: input.hierarchical,
					collections
				});
			});
			invalidateTaxonomyDefsCache();
		}
		return {
			success: true,
			data: await toTaxonomyResponse(db, await selectTaxonomyDefs(db).where("d.id", "=", lookup.def.id).executeTakeFirstOrThrow())
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TAXONOMY_UPDATE_ERROR",
				message: "Failed to update taxonomy"
			}
		};
	}
}
/**
* Delete a taxonomy: every locale's definition, every term under that name in
* every locale, and the term assignments those terms hold.
*
* There is no locale scope and no non-empty guard. Terms are keyed on `name`
* rather than on a definition row, so leaving one locale's definition behind
* would leave the taxonomy half-deleted — a definition with no terms, or terms
* no definition describes.
*/
async function handleTaxonomyDelete(db, name) {
	try {
		const lookup = await requireTaxonomyDef(db, name);
		if (!lookup.success) return lookup;
		await withTransaction(db, async (trx) => {
			await trx.deleteFrom("content_taxonomies").where("taxonomy_id", "in", (eb) => eb.selectFrom("taxonomies").select(sql`coalesce(translation_group, id)`.as("group")).where("name", "=", name)).execute();
			await trx.deleteFrom("taxonomies").where("name", "=", name).execute();
			await trx.deleteFrom("_emdash_taxonomy_defs").where("name", "=", name).execute();
			await trx.deleteFrom("_emdash_taxonomy_def_groups").where("name", "=", name).execute();
		});
		invalidateTaxonomyDefsCache();
		return {
			success: true,
			data: { deleted: true }
		};
	} catch (error) {
		console.error("[taxonomies] delete failed:", error);
		return {
			success: false,
			error: {
				code: "TAXONOMY_DELETE_ERROR",
				message: "Failed to delete taxonomy"
			}
		};
	}
}
/**
* List every locale translation of a taxonomy def (by id or translation_group).
*/
async function handleTaxonomyDefTranslations(db, idOrGroup) {
	try {
		const anchor = await db.selectFrom("_emdash_taxonomy_defs").selectAll().where((eb) => eb.or([eb("id", "=", idOrGroup), eb("translation_group", "=", idOrGroup)])).executeTakeFirst();
		if (!anchor) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Taxonomy not found"
			}
		};
		const group = anchor.translation_group ?? anchor.id;
		return {
			success: true,
			data: {
				translationGroup: group,
				translations: (await db.selectFrom("_emdash_taxonomy_defs").selectAll().where("translation_group", "=", group).orderBy("locale", "asc").execute()).map((r) => ({
					id: r.id,
					name: r.name,
					label: r.label,
					locale: r.locale
				}))
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TAXONOMY_TRANSLATIONS_ERROR",
				message: "Failed to list taxonomy translations"
			}
		};
	}
}
/**
* List all terms for a taxonomy (returns tree for hierarchical taxonomies)
*/
async function handleTermList(db, taxonomyName, options = {}) {
	try {
		if (options.resolveFallback && !options.locale) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "A locale is required when resolving taxonomy fallbacks"
			}
		};
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const lookup = await requireTaxonomyDefWithFallback(db, taxonomyName, locale);
		if (!lookup.success) return lookup;
		const repo = new TaxonomyRepository(db);
		const terms = options.resolveFallback && locale ? await repo.findByNameResolved(taxonomyName, locale, getI18nConfig()?.defaultLocale ?? "en") : await repo.findByName(taxonomyName, { locale });
		const countsByGroup = options.includeCounts ?? true ? await fetchVisibleTermCounts(db, taxonomyName, parseTaxonomyCollections(lookup.def.collections), locale) : void 0;
		const termData = terms.map((term) => ({
			id: term.id,
			name: term.name,
			slug: term.slug,
			label: term.label,
			parentId: term.parentId,
			description: typeof term.data?.description === "string" ? term.data.description : void 0,
			children: [],
			...countsByGroup && { count: countsByGroup.get(term.translationGroup ?? term.id) ?? 0 },
			locale: term.locale,
			translationGroup: term.translationGroup
		}));
		return {
			success: true,
			data: { terms: lookup.def.hierarchical === 1 ? buildTree(termData, options.resolveFallback && !!locale) : termData }
		};
	} catch (error) {
		console.error("[taxonomies] term list failed:", error);
		return {
			success: false,
			error: {
				code: "TERM_LIST_ERROR",
				message: "Failed to list terms"
			}
		};
	}
}
/**
* Set the manual order of one sibling group.
*
* `ids` names the terms to move, in the desired order; each is a row id or a
* translation_group and resolves to the latter, because a position belongs to a
* term rather than to one of its locales. Reordering never reparents — moving a
* term under a different parent is a term update.
*
* The group is `(taxonomy, parentId)` and has no locale: `parentId` is the
* parent's translation_group (a row id is accepted and resolved), and `null`
* selects the top level — which for a flat taxonomy is every term.
*
* `ids` may be a *subset* of the group, and the listed terms are permuted
* within the positions they already occupy. A locale only renders the terms
* translated into it, so a caller often cannot name every member; a member left
* out keeps its place, which is also what makes a stale list harmless.
*/
async function handleTermReorder(db, taxonomyName, input) {
	try {
		const lookup = await requireTaxonomyDef(db, taxonomyName);
		if (!lookup.success) return lookup;
		const repo = new TaxonomyRepository(db);
		let parentId = input.parentId ?? null;
		if (parentId !== null) {
			const parent = await repo.findById(parentId);
			if (parent) parentId = parent.translationGroup ?? parent.id;
		}
		const members = await repo.findByName(taxonomyName, { parentId });
		const siblings = [];
		const seen = /* @__PURE__ */ new Set();
		const resolve = /* @__PURE__ */ new Map();
		for (const term of members) {
			const group = term.translationGroup ?? term.id;
			if (!seen.has(group)) {
				seen.add(group);
				siblings.push({
					group,
					position: term.sortOrder
				});
			}
			resolve.set(group, group);
			resolve.set(term.id, group);
		}
		const groups = [];
		for (const id of input.ids) {
			const group = resolve.get(id);
			if (!group) return {
				success: false,
				error: {
					code: "REORDER_MISMATCH",
					message: `Term "${id}" is not in the sibling group being reordered`
				}
			};
			if (groups.includes(group)) return {
				success: false,
				error: {
					code: "REORDER_MISMATCH",
					message: `Term "${id}" is listed more than once`
				}
			};
			groups.push(group);
		}
		await repo.reorder(groups, siblings);
		invalidateTermCache();
		return {
			success: true,
			data: { reordered: true }
		};
	} catch (error) {
		console.error("[taxonomies] term reorder failed:", error);
		return {
			success: false,
			error: {
				code: "TERM_REORDER_ERROR",
				message: "Failed to reorder terms"
			}
		};
	}
}
/**
* Validate a parent term reference for create/update.
*
* Returns `null` on success or a structured error message that callers
* wrap in their own ApiResult.
*
*   - `parentId === undefined` -> no-op (no parent change requested).
*   - `parentId === null` -> caller intends to detach; no-op here.
*   - parent must exist (FK exists -> term row not soft-deleted).
*   - parent must live in the same taxonomy.
*   - reject a parent in the term's own translation_group (self-parent),
*     including the create path: a translation inherits its source's group, so
*     `selfGroup` carries that prospective group when `termId` is absent.
*   - walk up the parent chain to detect cycles, on create against `selfGroup`,
*     since a translation under another parent moves the existing term.
*/
async function validateParentTerm(repo, taxonomyName, termId, parentId, selfGroup) {
	if (parentId === void 0 || parentId === null) return null;
	const parent = await repo.findById(parentId);
	if (!parent) return {
		code: "VALIDATION_ERROR",
		message: `Parent term '${parentId}' not found`
	};
	if (parent.name !== taxonomyName) return {
		code: "VALIDATION_ERROR",
		message: `Parent term '${parentId}' belongs to taxonomy '${parent.name}', not '${taxonomyName}'`
	};
	const parentGroup = parent.translationGroup ?? parent.id;
	let termGroup = selfGroup ?? null;
	if (termId !== void 0) {
		const term = await repo.findById(termId);
		termGroup = term ? term.translationGroup ?? term.id : termId;
	}
	if (termGroup !== null && parentGroup === termGroup) return {
		code: "VALIDATION_ERROR",
		message: "A term cannot be its own parent"
	};
	const MAX_DEPTH = 100;
	let cursor = parent.parentId;
	let steps = 0;
	while (cursor !== null && steps < MAX_DEPTH) {
		if (termGroup !== null && cursor === termGroup) return {
			code: "VALIDATION_ERROR",
			message: "Cycle detected: cannot make a descendant the parent"
		};
		const next = await repo.findById(cursor);
		if (!next) break;
		cursor = next.parentId;
		steps++;
	}
	if (cursor !== null && steps >= MAX_DEPTH) return {
		code: "VALIDATION_ERROR",
		message: "Parent chain exceeds maximum depth"
	};
	return null;
}
/**
* Create a new term in a taxonomy
*/
async function handleTermCreate(db, taxonomyName, input) {
	let attemptedSlug = input.slug;
	let effectiveLocale = input.locale ?? getI18nConfig()?.defaultLocale ?? "en";
	try {
		const locale = resolveConfiguredLocale(input.locale ?? getI18nConfig()?.defaultLocale ?? "en");
		effectiveLocale = locale;
		const lookup = await requireTaxonomyDefWithFallback(db, taxonomyName, locale);
		if (!lookup.success) return lookup;
		const repo = new TaxonomyRepository(db);
		const parentId = input.parentId === "" || input.parentId === void 0 ? void 0 : input.parentId;
		const hierarchyError = validateHierarchicalParent(lookup.def, taxonomyName, parentId);
		if (hierarchyError) return {
			success: false,
			error: hierarchyError
		};
		if (input.slug === void 0 ? null : await repo.findBySlug(taxonomyName, input.slug, locale)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Term '${input.slug}' already exists in '${taxonomyName}' (${locale})`
			}
		};
		let selfGroup = null;
		if (input.translationOf) {
			const source = await repo.findById(input.translationOf);
			if (!source) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `Translation source '${input.translationOf}' not found`
				}
			};
			if (source.name !== taxonomyName) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `Translation source '${input.translationOf}' belongs to taxonomy '${source.name}', not '${taxonomyName}'`
				}
			};
			selfGroup = source.translationGroup ?? source.id;
			if ((await repo.findTranslations(selfGroup)).some((translation) => resolveConfiguredLocale(translation.locale) === resolveConfiguredLocale(locale))) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `Term translation already exists for locale '${locale}'`
				}
			};
		}
		const parentError = await validateParentTerm(repo, taxonomyName, void 0, parentId, selfGroup);
		if (parentError) return {
			success: false,
			error: parentError
		};
		const create = (slug) => repo.create({
			name: taxonomyName,
			slug,
			label: input.label,
			parentId: parentId ?? void 0,
			data: input.description ? { description: input.description } : void 0,
			locale,
			translationOf: input.translationOf
		});
		let term;
		let lastSlugConflict;
		if (input.slug !== void 0) term = await create(input.slug);
		else for (let attempt = 0; attempt < MAX_GENERATED_TERM_SLUG_ATTEMPTS; attempt++) {
			attemptedSlug = await repo.generateUniqueSlug(taxonomyName, input.label, locale);
			try {
				term = await create(attemptedSlug);
				break;
			} catch (error) {
				if (!isTermSlugUniqueViolation(error)) throw error;
				lastSlugConflict = error;
			}
		}
		if (!term) throw lastSlugConflict ?? /* @__PURE__ */ new Error("Failed to create taxonomy term");
		invalidateTermCache();
		return {
			success: true,
			data: { term: {
				id: term.id,
				name: term.name,
				slug: term.slug,
				label: term.label,
				parentId: term.parentId,
				description: typeof term.data?.description === "string" ? term.data.description : void 0,
				locale: term.locale,
				translationGroup: term.translationGroup
			} }
		};
	} catch (error) {
		if (isTermTranslationLocaleUniqueViolation(error)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Term translation already exists for locale '${effectiveLocale}'`
			}
		};
		if (isTermSlugUniqueViolation(error)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Term with slug '${attemptedSlug ?? "(generated)"}' already exists in taxonomy '${taxonomyName}'`
			}
		};
		return {
			success: false,
			error: {
				code: "TERM_CREATE_ERROR",
				message: "Failed to create term"
			}
		};
	}
}
/**
* Get a single term by slug
*/
async function handleTermGet(db, taxonomyName, termSlug, options = {}) {
	try {
		const repo = new TaxonomyRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const term = await repo.findBySlug(taxonomyName, termSlug, locale);
		if (!term) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Term '${termSlug}' not found in taxonomy '${taxonomyName}'`
			}
		};
		const lookup = await requireTaxonomyDefWithFallback(db, taxonomyName, locale);
		const count = (await fetchVisibleTermCounts(db, taxonomyName, lookup.success ? parseTaxonomyCollections(lookup.def.collections) : [], locale ?? term.locale)).get(term.translationGroup ?? term.id) ?? 0;
		const children = await repo.findChildren(term.id, term.locale);
		return {
			success: true,
			data: { term: {
				id: term.id,
				name: term.name,
				slug: term.slug,
				label: term.label,
				parentId: term.parentId,
				description: typeof term.data?.description === "string" ? term.data.description : void 0,
				count,
				children: children.map((c) => ({
					id: c.id,
					slug: c.slug,
					label: c.label
				})),
				locale: term.locale,
				translationGroup: term.translationGroup
			} }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TERM_GET_ERROR",
				message: "Failed to get term"
			}
		};
	}
}
/** List every translation of a term (by id or translation_group). */
async function handleTermTranslations(db, idOrGroup) {
	try {
		const anchor = await db.selectFrom("taxonomies").selectAll().where((eb) => eb.or([eb("id", "=", idOrGroup), eb("translation_group", "=", idOrGroup)])).executeTakeFirst();
		if (!anchor) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Term not found"
			}
		};
		const group = anchor.translation_group ?? anchor.id;
		return {
			success: true,
			data: {
				translationGroup: group,
				translations: (await db.selectFrom("taxonomies").selectAll().where("translation_group", "=", group).orderBy("locale", "asc").execute()).map((r) => ({
					id: r.id,
					slug: r.slug,
					label: r.label,
					locale: r.locale
				}))
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TERM_TRANSLATIONS_ERROR",
				message: "Failed to list term translations"
			}
		};
	}
}
/**
* Update a term
*/
async function handleTermUpdate(db, taxonomyName, termSlug, input, options = {}) {
	try {
		const repo = new TaxonomyRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const term = await repo.findBySlug(taxonomyName, termSlug, locale);
		if (!term) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Term '${termSlug}' not found in taxonomy '${taxonomyName}'`
			}
		};
		const newSlug = input.slug === "" || input.slug === void 0 ? void 0 : input.slug;
		const newParentId = input.parentId === "" || input.parentId === void 0 ? void 0 : input.parentId;
		if (newParentId !== void 0 && newParentId !== null) {
			const lookup = await requireTaxonomyDefWithFallback(db, taxonomyName, term.locale);
			if (!lookup.success) return lookup;
			const hierarchyError = validateHierarchicalParent(lookup.def, taxonomyName, newParentId);
			if (hierarchyError) return {
				success: false,
				error: hierarchyError
			};
		}
		if (newSlug !== void 0 && newSlug !== termSlug) {
			const existing = await repo.findBySlug(taxonomyName, newSlug, locale);
			if (existing && existing.id !== term.id) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `Term with slug '${newSlug}' already exists in taxonomy '${taxonomyName}'`
				}
			};
		}
		const parentError = await validateParentTerm(repo, taxonomyName, term.id, newParentId);
		if (parentError) return {
			success: false,
			error: parentError
		};
		const updated = await repo.update(term.id, {
			slug: newSlug,
			label: input.label,
			parentId: newParentId,
			data: input.description !== void 0 ? { description: input.description } : void 0
		});
		invalidateTermCache();
		if (!updated) return {
			success: false,
			error: {
				code: "TERM_UPDATE_ERROR",
				message: "Failed to update term"
			}
		};
		return {
			success: true,
			data: { term: {
				id: updated.id,
				name: updated.name,
				slug: updated.slug,
				label: updated.label,
				parentId: updated.parentId,
				description: typeof updated.data?.description === "string" ? updated.data.description : void 0,
				locale: updated.locale,
				translationGroup: updated.translationGroup
			} }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TERM_UPDATE_ERROR",
				message: "Failed to update term"
			}
		};
	}
}
/**
* Delete a term
*/
async function handleTermDelete(db, taxonomyName, termSlug, options = {}) {
	try {
		const repo = new TaxonomyRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const term = await repo.findBySlug(taxonomyName, termSlug, locale);
		if (!term) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Term '${termSlug}' not found in taxonomy '${taxonomyName}'`
			}
		};
		if ((await repo.findChildren(term.id)).length > 0) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Cannot delete term with children. Delete children first."
			}
		};
		if (!await repo.delete(term.id)) return {
			success: false,
			error: {
				code: "TERM_DELETE_ERROR",
				message: "Failed to delete term"
			}
		};
		invalidateTermCache();
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "TERM_DELETE_ERROR",
				message: "Failed to delete term"
			}
		};
	}
}
export { handleTaxonomyList as a, handleTermDelete as c, handleTermReorder as d, handleTermTranslations as f, handleTaxonomyGet as i, handleTermGet as l, taxonomies_exports as m, handleTaxonomyDefTranslations as n, handleTaxonomyUpdate as o, handleTermUpdate as p, handleTaxonomyDelete as r, handleTermCreate as s, handleTaxonomyCreate as t, handleTermList as u };
