import { _ as getLocaleRank, a as __exportAll, g as getLocaleChainRank, h as getLocaleCandidates } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { n as localeMatches, r as localeOrder } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { m as invalidateTaxonomyObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import { t as slugify } from "./slugify_CCZol-5S.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/taxonomy-CMI5fczd.mjs
var taxonomy_exports = /* @__PURE__ */ __exportAll({ TaxonomyRepository: () => TaxonomyRepository });
/**
* Translation groups per reorder `UPDATE`. Each costs three bound parameters —
* a CASE `WHEN`/`THEN` pair plus one slot in the `IN` list — which keeps a
* statement inside D1's 100-parameter ceiling.
*/
var GROUPS_PER_UPDATE = 32;
/** Rows per `content_taxonomies` insert. Each row binds three parameters. */
var ASSIGNMENTS_PER_INSERT = 32;
var NUMERIC_SUFFIX_PATTERN = /^\d+$/;
/** Deal the listed groups back out over the slots they hold, in the order given. */
function permuteWithinSlots(listed, occupied) {
	const slots = occupied.toSorted((a, b) => a - b);
	const target = /* @__PURE__ */ new Map();
	listed.forEach((group, index) => {
		const position = slots[index];
		if (position !== void 0) target.set(group, position);
	});
	return target;
}
/**
* Renumber a whole sibling group 0..n-1, with the listed groups in the order
* given and every other member left in the place it already held.
*
* Works off each member's index in the sequence rather than its stored value,
* which is what lets it resolve positions that tie. The sort is stable, so
* tied members keep the order `siblings` arrives in — deterministic, but a
* listing that mixes locales breaks a tie on whichever locale's label sorts
* first, not on the order any one caller rendered.
*/
function renumberSiblings(listed, siblings) {
	const sequence = siblings.toSorted((a, b) => a.position - b.position);
	const wanted = new Set(listed);
	const target = /* @__PURE__ */ new Map();
	let next = 0;
	sequence.forEach(({ group }, index) => {
		const replacement = wanted.has(group) ? listed[next++] : void 0;
		target.set(replacement ?? group, index);
	});
	return target;
}
/**
* Taxonomy repository for categories, tags, and other classification.
*
* Terms are per-locale. Translations of the same term share a `translation_group`
* ULID. `content_taxonomies` stores translation_groups on both sides so a single
* association spans every locale of a post and term.
*
* Strict lookup methods use only the locale callers supply. The explicitly
* resolved methods accept both the preferred and default locales so their
* fallback policy stays visible at the call site.
*
* `sort_order` is per translation_group, not per row: every row sharing a
* translation_group carries the same value, so a term holds one position across
* all its locales. Sibling groups are keyed on the raw `parent_id` column, which
* is locale-agnostic for the same reason (it stores the parent's
* translation_group). Writes must preserve both invariants.
*/
var TaxonomyRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Create a new taxonomy term. When `translationOf` is set the new row joins
	* the source term's translation_group; otherwise a fresh group is minted
	* (matching the migration backfill pattern `translation_group = id`).
	*/
	async create(input) {
		const id = ulid();
		const parentInput = input.parentId === "" ? void 0 : input.parentId;
		let parentId = parentInput ? await this.resolveParentRef(parentInput) : null;
		let translationGroup = id;
		let sortOrder = null;
		let movesGroup = false;
		if (input.translationOf) {
			const source = await this.findById(input.translationOf);
			if (source?.translationGroup) translationGroup = source.translationGroup;
			if (source && (parentInput === void 0 || source.parentId === parentId)) {
				parentId = source.parentId;
				sortOrder = source.sortOrder;
			} else if (source) movesGroup = true;
		}
		sortOrder ??= await this.nextSortOrder(input.name, parentId);
		await withTransaction(this.db, async (trx) => {
			await trx.insertInto("taxonomies").values({
				id,
				name: input.name,
				slug: input.slug,
				label: input.label,
				parent_id: parentId,
				data: input.data ? JSON.stringify(input.data) : null,
				sort_order: sortOrder,
				...input.locale !== void 0 ? { locale: input.locale } : {},
				translation_group: translationGroup
			}).execute();
			if (movesGroup) await trx.updateTable("taxonomies").set({
				parent_id: parentId,
				sort_order: sortOrder
			}).where("translation_group", "=", translationGroup).execute();
		});
		invalidateTaxonomyObjectCache();
		const taxonomy = await this.findById(id);
		if (!taxonomy) throw new Error("Failed to create taxonomy");
		return taxonomy;
	}
	async findById(id) {
		const row = await this.db.selectFrom("taxonomies").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? this.rowToTaxonomy(row) : null;
	}
	/** Resolve either a locale row id or a locale-agnostic translation group. */
	async findByIdOrTranslationGroup(id) {
		const row = await this.db.selectFrom("taxonomies").selectAll().where((eb) => eb.or([eb("id", "=", id), eb("translation_group", "=", id)])).orderBy("locale", "asc").orderBy("id", "asc").executeTakeFirst();
		return row ? this.rowToTaxonomy(row) : null;
	}
	/**
	* Find a term by (name, slug). When `locale` is provided, filter by it.
	* When omitted, returns the lowest-locale-code match (deterministic across
	* calls). Mirrors `ContentRepository.findBySlug`.
	*/
	async findBySlug(name, slug, locale) {
		let query = this.db.selectFrom("taxonomies").selectAll().where("name", "=", name).where("slug", "=", slug);
		if (locale !== void 0) query = query.where(localeMatches("locale", locale));
		const row = await query.orderBy(locale !== void 0 ? localeOrder("locale", locale) : "locale", "asc").orderBy("id", "asc").executeTakeFirst();
		return row ? this.rowToTaxonomy(row) : null;
	}
	/** Generate a locale-scoped term slug, adding a numeric suffix when needed. */
	async generateUniqueSlug(name, text, locale) {
		const baseSlug = slugify(text);
		let query = this.db.selectFrom("taxonomies").select("slug").where("name", "=", name).where((eb) => eb.or([eb("slug", "=", baseSlug), eb("slug", "like", `${baseSlug}-%`)]));
		if (locale !== void 0) query = query.where(localeMatches("locale", locale));
		const candidates = await query.execute();
		if (!candidates.some((candidate) => candidate.slug === baseSlug)) return baseSlug;
		let maxSuffix = 0;
		const prefix = `${baseSlug}-`;
		for (const candidate of candidates) {
			if (!candidate.slug.startsWith(prefix)) continue;
			const suffix = candidate.slug.slice(prefix.length);
			if (!NUMERIC_SUFFIX_PATTERN.test(suffix)) continue;
			maxSuffix = Math.max(maxSuffix, Number.parseInt(suffix, 10));
		}
		return `${baseSlug}-${maxSuffix + 1}`;
	}
	/**
	* Get all terms for a taxonomy (e.g., all categories).
	*
	* `sort_order` carries the manual order set from the admin; it is 0 for
	* terms nobody has reordered, so an untouched taxonomy still comes back
	* alphabetically. `id asc` is a stable tiebreaker for terms that share both
	* values. Without it the SQL ordering is implementation-defined when they match.
	*/
	async findByName(name, options = {}) {
		let query = this.db.selectFrom("taxonomies").selectAll().where("name", "=", name).orderBy("sort_order", "asc").orderBy("label", "asc").orderBy("id", "asc");
		if (options.locale !== void 0) query = query.where(localeMatches("locale", options.locale));
		if (options.parentId !== void 0) if (options.parentId === null) query = query.where("parent_id", "is", null);
		else query = query.where("parent_id", "=", options.parentId);
		return (await query.execute()).map((row) => this.rowToTaxonomy(row));
	}
	async findByNameResolved(name, locale, defaultLocale) {
		const locales = [.../* @__PURE__ */ new Set([locale, defaultLocale])];
		const rows = await this.db.selectFrom("taxonomies").selectAll().where("name", "=", name).where((eb) => eb.or(locales.map((candidate) => localeMatches("locale", candidate)))).orderBy("sort_order", "asc").orderBy("label", "asc").orderBy("id", "asc").execute();
		const selected = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const term = this.rowToTaxonomy(row);
			const group = term.translationGroup ?? term.id;
			const current = selected.get(group);
			if (!current || getLocaleChainRank(term.locale, [locale, defaultLocale]) < getLocaleChainRank(current.locale, [locale, defaultLocale])) selected.set(group, term);
		}
		return [...selected.values()].toSorted((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label) || a.id.localeCompare(b.id));
	}
	async findPageByName(name, options = {}) {
		const limit = Math.max(1, Math.min(options.limit ?? 50, 100));
		let query = this.db.selectFrom("taxonomies").selectAll().where("name", "=", name);
		if (options.locale !== void 0) query = query.where(localeMatches("locale", options.locale));
		if (options.parentId !== void 0) query = options.parentId === null ? query.where("parent_id", "is", null) : query.where("parent_id", "=", options.parentId);
		if (options.cursor) {
			const cursor = options.cursor;
			query = query.where((eb) => eb.or([
				eb("sort_order", ">", cursor.sortOrder),
				eb.and([eb("sort_order", "=", cursor.sortOrder), eb("label", ">", cursor.label)]),
				eb.and([
					eb("sort_order", "=", cursor.sortOrder),
					eb("label", "=", cursor.label),
					eb("id", ">", cursor.id)
				])
			]));
		}
		query = query.orderBy("sort_order", "asc").orderBy("label", "asc").orderBy("id", "asc");
		const rows = await query.limit(limit + 1).execute();
		return {
			items: rows.slice(0, limit).map((row) => this.rowToTaxonomy(row)),
			hasMore: rows.length > limit
		};
	}
	/**
	* Children of a term. Accepts a term id OR a translation_group and resolves
	* to the group, since `parent_id` stores the parent's translation_group.
	* Pass `locale` to scope to one locale's tree (children share the parent's
	* group across locales); omit it to find children in every locale (used to
	* block deletes that would orphan a sibling translation's subtree).
	*/
	async findChildren(parentIdOrGroup, locale) {
		const group = await this.resolveTranslationGroup(parentIdOrGroup);
		if (!group) return [];
		let query = this.db.selectFrom("taxonomies").selectAll().where("parent_id", "=", group).orderBy("sort_order", "asc").orderBy("label", "asc").orderBy("id", "asc");
		if (locale !== void 0) query = query.where(localeMatches("locale", locale));
		return (await query.execute()).map((row) => this.rowToTaxonomy(row));
	}
	/**
	* Every translation sibling of a term (including itself), identified by
	* their shared `translation_group`.
	*/
	async findTranslations(translationGroup) {
		return (await this.db.selectFrom("taxonomies").selectAll().where("translation_group", "=", translationGroup).orderBy("locale", "asc").execute()).map((row) => this.rowToTaxonomy(row));
	}
	async update(id, input) {
		const existing = await this.findById(id);
		if (!existing) return null;
		const updates = {};
		if (input.slug !== void 0) updates.slug = input.slug;
		if (input.label !== void 0) updates.label = input.label;
		if (input.data !== void 0) updates.data = JSON.stringify(input.data);
		const group = {};
		if (input.parentId !== void 0) {
			const parentId = input.parentId === "" || input.parentId === null ? null : await this.resolveParentRef(input.parentId);
			if (parentId !== existing.parentId) {
				group.parent_id = parentId;
				group.sort_order = await this.nextSortOrder(existing.name, parentId);
			} else if (await this.groupHasOtherParent(existing.translationGroup ?? existing.id, parentId)) {
				group.parent_id = parentId;
				group.sort_order = existing.sortOrder;
			}
		}
		const hasRowUpdates = Object.keys(updates).length > 0;
		const hasGroupUpdates = Object.keys(group).length > 0;
		if (hasRowUpdates || hasGroupUpdates) {
			await withTransaction(this.db, async (trx) => {
				if (hasRowUpdates) await trx.updateTable("taxonomies").set(updates).where("id", "=", id).execute();
				if (hasGroupUpdates) await trx.updateTable("taxonomies").set(group).where("translation_group", "=", existing.translationGroup ?? existing.id).execute();
			});
			invalidateTaxonomyObjectCache();
		}
		return this.findById(id);
	}
	/**
	* Move `groups` (translation_groups, in the desired order) into the positions
	* those same groups already occupy, leaving every other member of the sibling
	* group where it is.
	*
	* `groups` may be a subset: a locale renders only the terms translated into
	* it, so an admin in `fr` often cannot name every member. A group left out
	* keeps its place, which is also what makes a stale list harmless.
	*
	* `siblings` is every member of the group with the position it holds, in a
	* listing's order — tied positions are resolved by that order, so pass it as
	* read. Groups already at their target are skipped, so one swap rewrites two
	* groups rather than the whole list.
	*/
	async reorder(groups, siblings) {
		const current = new Map(siblings.map(({ group, position }) => [group, position]));
		const listed = [];
		const occupied = [];
		for (const group of groups) {
			const position = current.get(group);
			if (position === void 0) continue;
			listed.push(group);
			occupied.push(position);
		}
		if (listed.length === 0) return;
		const changed = [...new Set(occupied).size === occupied.length ? permuteWithinSlots(listed, occupied) : renumberSiblings(listed, siblings)].filter(([group, position]) => current.get(group) !== position);
		if (changed.length === 0) return;
		await this.applyPositions(changed);
		invalidateTaxonomyObjectCache();
	}
	/**
	* Write one position per translation_group, GROUPS_PER_UPDATE at a time so
	* each statement stays inside D1's parameter ceiling.
	*
	* D1 has no transactions — `withTransaction` runs its callback bare there —
	* so a chunk is the unit that can't tear. A reorder spanning several chunks
	* can, and leaves ties, which the next reorder renumbers away.
	*/
	async applyPositions(positions) {
		for (let index = 0; index < positions.length; index += GROUPS_PER_UPDATE) {
			const chunk = positions.slice(index, index + GROUPS_PER_UPDATE);
			await sql`
				UPDATE taxonomies
				SET sort_order = CASE translation_group ${sql.join(chunk.map(([group, position]) => sql`WHEN ${group} THEN CAST(${position} AS INTEGER)`), sql` `)} END
				WHERE translation_group IN (${sql.join(chunk.map(([group]) => sql`${group}`))})
			`.execute(this.db);
		}
	}
	/**
	* Position for a term joining a sibling group: one past the last member, or
	* 0 when the group is empty.
	*
	* Bounds are taken across every locale because a position belongs to the
	* translation_group, not to a row — a term translated into only one locale
	* still occupies its slot for all of them.
	*/
	async nextSortOrder(name, parentId) {
		let query = this.db.selectFrom("taxonomies").select((eb) => eb.fn.max("sort_order").as("max")).where("name", "=", name);
		query = parentId === null ? query.where("parent_id", "is", null) : query.where("parent_id", "=", parentId);
		const bounds = await query.executeTakeFirst();
		if (!bounds || bounds.max === null) return 0;
		return bounds.max + 1;
	}
	/** Whether any row of `translationGroup` has a parent other than `parentId`. */
	async groupHasOtherParent(translationGroup, parentId) {
		return await this.db.selectFrom("taxonomies").select("id").where("translation_group", "=", translationGroup).where((eb) => parentId === null ? eb("parent_id", "is not", null) : eb.or([eb("parent_id", "is", null), eb("parent_id", "!=", parentId)])).executeTakeFirst() !== void 0;
	}
	async delete(id) {
		const term = await this.findById(id);
		if (!term) return false;
		if (term.translationGroup) {
			if ((await this.db.selectFrom("taxonomies").select("id").where("translation_group", "=", term.translationGroup).where("id", "!=", id).execute()).length === 0) await this.db.deleteFrom("content_taxonomies").where("taxonomy_id", "=", term.translationGroup).execute();
		}
		const result = await this.db.deleteFrom("taxonomies").where("id", "=", id).executeTakeFirst();
		invalidateTaxonomyObjectCache();
		return (result.numDeletedRows ?? 0n) > 0n;
	}
	async attachToEntry(collection, entryId, taxonomyId) {
		const taxonomyGroup = await this.resolveTranslationGroup(taxonomyId);
		if (!taxonomyGroup) return;
		await this.attachGroupsToEntry(collection, entryId, [taxonomyGroup]);
	}
	/**
	* Attach already-resolved term translation groups and return the number of
	* assignments that did not already exist.
	*/
	async attachGroupsToEntry(collection, entryId, taxonomyGroups) {
		const uniqueGroups = [...new Set(taxonomyGroups)];
		if (uniqueGroups.length === 0) return 0;
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return 0;
		const inserted = await this.insertAssignments(collection, entryGroup, uniqueGroups);
		if (inserted > 0) invalidateTaxonomyObjectCache();
		return inserted;
	}
	async insertAssignments(collection, entryGroup, taxonomyGroups) {
		let inserted = 0;
		try {
			for (const batch of chunks(taxonomyGroups, ASSIGNMENTS_PER_INSERT)) {
				const result = await this.db.insertInto("content_taxonomies").values(batch.map((taxonomy_id) => ({
					collection,
					entry_id: entryGroup,
					taxonomy_id
				}))).onConflict((oc) => oc.doNothing()).executeTakeFirst();
				inserted += Number(result.numInsertedOrUpdatedRows ?? 0n);
			}
		} catch (error) {
			if (inserted > 0) invalidateTaxonomyObjectCache();
			throw error;
		}
		return inserted;
	}
	async deleteAssignments(collection, entryGroup, taxonomyGroups) {
		let removed = 0;
		try {
			for (const batch of chunks(taxonomyGroups, 50)) {
				const result = await this.db.deleteFrom("content_taxonomies").where("collection", "=", collection).where("entry_id", "=", entryGroup).where("taxonomy_id", "in", batch).executeTakeFirst();
				removed += Number(result.numDeletedRows ?? 0n);
			}
		} catch (error) {
			if (removed > 0) invalidateTaxonomyObjectCache();
			throw error;
		}
		return removed;
	}
	async detachFromEntry(collection, entryId, taxonomyId) {
		const [entryGroup, taxonomyGroup] = await Promise.all([this.resolveEntryTranslationGroup(collection, entryId), this.resolveTranslationGroup(taxonomyId)]);
		if (!entryGroup || !taxonomyGroup) return;
		await this.db.deleteFrom("content_taxonomies").where("collection", "=", collection).where("entry_id", "=", entryGroup).where("taxonomy_id", "=", taxonomyGroup).execute();
		invalidateTaxonomyObjectCache();
	}
	/** Remove already-resolved term groups without replacing concurrent assignments. */
	async detachGroupsFromEntry(collection, entryId, taxonomyGroups) {
		const uniqueGroups = [...new Set(taxonomyGroups)];
		if (uniqueGroups.length === 0) return 0;
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return 0;
		const removed = await this.deleteAssignments(collection, entryGroup, uniqueGroups);
		if (removed > 0) invalidateTaxonomyObjectCache();
		return removed;
	}
	/**
	* Taxonomy terms assigned to a content entry, resolved into a specific locale.
	* Terms whose translation_group lacks a row in the requested locale are
	* omitted — callers wanting fallback behaviour apply it themselves.
	*/
	async getTermsForEntry(collection, entryId, taxonomyName, locale) {
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return [];
		let query = this.db.selectFrom("content_taxonomies").innerJoin("taxonomies", "taxonomies.translation_group", "content_taxonomies.taxonomy_id").selectAll("taxonomies").where("content_taxonomies.collection", "=", collection).where("content_taxonomies.entry_id", "=", entryGroup);
		if (taxonomyName) query = query.where("taxonomies.name", "=", taxonomyName);
		if (locale !== void 0) query = query.where(localeMatches("taxonomies.locale", locale));
		const terms = (await query.orderBy("taxonomies.locale", "asc").execute()).map((row) => this.rowToTaxonomy(row));
		if (locale === void 0) return terms;
		const selected = /* @__PURE__ */ new Map();
		for (const term of terms) {
			const group = term.translationGroup ?? term.id;
			const current = selected.get(group);
			if (!current || getLocaleRank(term.locale, locale) < getLocaleRank(current.locale, locale) || getLocaleRank(term.locale, locale) === getLocaleRank(current.locale, locale) && term.id < current.id) selected.set(group, term);
		}
		return [...selected.values()];
	}
	async getTermAssignmentsForEntry(collection, entryId, taxonomyName, locale, defaultLocale) {
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return [];
		const rows = await this.db.selectFrom("content_taxonomies").innerJoin("taxonomies", "taxonomies.translation_group", "content_taxonomies.taxonomy_id").selectAll("taxonomies").select("content_taxonomies.taxonomy_id as assignment_group").where("content_taxonomies.collection", "=", collection).where("content_taxonomies.entry_id", "=", entryGroup).where("taxonomies.name", "=", taxonomyName).orderBy("content_taxonomies.taxonomy_id", "asc").orderBy("taxonomies.locale", "asc").execute();
		const byGroup = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const variants = byGroup.get(row.assignment_group) ?? [];
			variants.push(this.rowToTaxonomy(row));
			byGroup.set(row.assignment_group, variants);
		}
		const chain = [locale, ...defaultLocale !== locale ? [defaultLocale] : []];
		const chainLimit = getLocaleChainRank(defaultLocale, chain) + getLocaleCandidates(defaultLocale).length;
		return Array.from(byGroup, ([translationGroup, variants]) => {
			return {
				translationGroup,
				term: variants.filter((variant) => getLocaleChainRank(variant.locale, chain) < chainLimit).toSorted((a, b) => getLocaleChainRank(a.locale, chain) - getLocaleChainRank(b.locale, chain) || a.id.localeCompare(b.id))[0] ?? null,
				availableLocales: variants.map((variant) => variant.locale),
				translations: variants.map((variant) => ({
					id: variant.id,
					slug: variant.slug,
					locale: variant.locale
				}))
			};
		});
	}
	/**
	* Replace all assignments of a given taxonomy for one content entry.
	* Term ids OR translation_groups are accepted and normalised to groups.
	*/
	async setTermsForEntry(collection, entryId, taxonomyName, termIds) {
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return;
		const groups = [];
		for (const id of termIds) {
			const group = await this.resolveTranslationGroup(id);
			if (group) groups.push(group);
		}
		const newGroups = new Set(groups);
		const current = await this.db.selectFrom("content_taxonomies").innerJoin("taxonomies", "taxonomies.translation_group", "content_taxonomies.taxonomy_id").select(["content_taxonomies.taxonomy_id as group"]).distinct().where("content_taxonomies.collection", "=", collection).where("content_taxonomies.entry_id", "=", entryGroup).where("taxonomies.name", "=", taxonomyName).execute();
		const currentGroups = new Set(current.map((r) => r.group));
		const toRemove = [...currentGroups].filter((g) => !newGroups.has(g));
		const toAdd = [...newGroups].filter((g) => !currentGroups.has(g));
		try {
			if (toRemove.length > 0) await this.deleteAssignments(collection, entryGroup, toRemove);
			if (toAdd.length > 0) await this.insertAssignments(collection, entryGroup, toAdd);
		} finally {
			if (toRemove.length > 0 || toAdd.length > 0) invalidateTaxonomyObjectCache();
		}
	}
	async clearEntryTerms(collection, entryId) {
		const entryGroup = await this.resolveEntryTranslationGroup(collection, entryId);
		if (!entryGroup) return 0;
		return this.clearEntryGroupTerms(collection, entryGroup);
	}
	/**
	* Remove every term assignment held by an entry translation group. Takes the
	* group rather than an entry id, so it still works after the group's last
	* row has been deleted.
	*/
	async clearEntryGroupTerms(collection, entryGroup) {
		const result = await this.db.deleteFrom("content_taxonomies").where("collection", "=", collection).where("entry_id", "=", entryGroup).executeTakeFirst();
		const removed = Number(result.numDeletedRows ?? 0);
		if (removed > 0) invalidateTaxonomyObjectCache();
		return removed;
	}
	async resolveEntryTranslationGroup(collection, entryIdOrGroup) {
		validateIdentifier(collection, "collection type");
		const tableName = `ec_${collection}`;
		return (await sql`
			SELECT translation_group
			FROM ${sql.ref(tableName)}
			WHERE id = ${entryIdOrGroup} OR translation_group = ${entryIdOrGroup}
			LIMIT 1
		`.execute(this.db)).rows[0]?.translation_group ?? null;
	}
	/**
	* Count content entries that use any translation of this term. Accepts
	* either a term id or a translation_group — we normalise to the group.
	*
	* Counts raw pivot rows regardless of the entry's status or deletion —
	* drafts and trashed entries are included. User-facing counts (admin term
	* list/get, public widget and term pages) use `fetchVisibleTermCounts`
	* from `taxonomies/term-counts.ts` instead, which counts only publicly
	* visible entries.
	*/
	async countEntriesWithTerm(termIdOrGroup) {
		const group = await this.resolveTranslationGroup(termIdOrGroup);
		if (!group) return 0;
		const result = await this.db.selectFrom("content_taxonomies").select((eb) => eb.fn.count("entry_id").as("count")).where("taxonomy_id", "=", group).executeTakeFirst();
		return Number(result?.count ?? 0);
	}
	/**
	* Resolve a parent reference (a row id or a translation_group) to the value
	* persisted in `parent_id`: the parent's translation_group, which is
	* locale-agnostic so the child stays nested in every locale. A
	* translation_group normally equals its anchor row's id, which satisfies the
	* self-FK on `parent_id`. If that anchor row is missing (a translation whose
	* anchor was deleted), fall back to the id we were given so we never write a
	* dangling FK value.
	*/
	async resolveParentRef(idOrGroup) {
		const group = await this.resolveTranslationGroup(idOrGroup);
		if (!group) return idOrGroup;
		return await this.db.selectFrom("taxonomies").select("id").where("id", "=", group).executeTakeFirst() ? group : idOrGroup;
	}
	async resolveTranslationGroup(idOrGroup) {
		return (await this.db.selectFrom("taxonomies").select(["translation_group"]).where((eb) => eb.or([eb("id", "=", idOrGroup), eb("translation_group", "=", idOrGroup)])).executeTakeFirst())?.translation_group ?? null;
	}
	/**
	* Batch count entries for multiple taxonomy translation_groups.
	* Chunks the query at SQL_BATCH_SIZE to stay below D1's bind-parameter limit.
	* Returns a Map from translation_group to count.
	*
	* Pass translation_groups (not term ids) — `content_taxonomies.taxonomy_id`
	* stores the translation_group so a single assignment spans every locale.
	*
	* Like `countEntriesWithTerm`, this counts raw pivot rows regardless of
	* status/deletion; user-facing counts go through `fetchVisibleTermCounts`.
	*/
	async countEntriesForTerms(translationGroups) {
		if (translationGroups.length === 0) return /* @__PURE__ */ new Map();
		const counts = /* @__PURE__ */ new Map();
		for (const chunk of chunks(translationGroups, 50)) {
			const rows = await this.db.selectFrom("content_taxonomies").select(["taxonomy_id", (eb) => eb.fn.count("entry_id").as("count")]).where("taxonomy_id", "in", chunk).groupBy("taxonomy_id").execute();
			for (const row of rows) counts.set(row.taxonomy_id, Number(row.count || 0));
		}
		return counts;
	}
	rowToTaxonomy(row) {
		return {
			id: row.id,
			name: row.name,
			slug: row.slug,
			label: row.label,
			parentId: row.parent_id,
			data: row.data ? JSON.parse(row.data) : null,
			locale: row.locale,
			translationGroup: row.translation_group,
			sortOrder: row.sort_order
		};
	}
};
export { taxonomy_exports as n, TaxonomyRepository as t };
