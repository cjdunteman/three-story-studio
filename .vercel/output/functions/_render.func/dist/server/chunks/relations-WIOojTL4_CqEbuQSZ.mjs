import { _ as getLocaleRank, h as getLocaleCandidates } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import { l as invalidateCollectionCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as RevisionRepository } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { c as readStagedReferences, o as pageStagedGroups, t as RelationRepository } from "./staged-ByBmPFtX_FQ60UOHq.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { a as invalidateSchemaCache } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
// node_modules/emdash/dist/relations-WIOojTL4.mjs
function validationError(message) {
	return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message
		}
	};
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null;
}
/**
* Every reference field on a collection that is bound to a relation, by field
* slug — the key the entry API takes a selection under.
*/
function referenceFieldConstraints(db, collection) {
	return requestCached(`reference-field-constraints:${collection}`, async () => {
		const fields = await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
			"_emdash_fields.slug",
			"_emdash_fields.required",
			"_emdash_fields.validation"
		]).where("_emdash_collections.slug", "=", collection).where("_emdash_fields.type", "=", "reference").execute();
		const relations = await db.selectFrom("_emdash_relations").select([
			"id",
			"slug",
			"max_children_per_parent",
			"max_parents_per_child"
		]).execute();
		const limits = new Map(relations.map((r) => [r.slug, r]));
		const constraints = /* @__PURE__ */ new Map();
		for (const field of fields) {
			if (!field.validation) continue;
			let parsed;
			try {
				parsed = JSON.parse(field.validation);
			} catch {
				continue;
			}
			if (!isRecord$1(parsed) || typeof parsed.relation !== "string") continue;
			const relation = limits.get(parsed.relation);
			const relationSide = parsed.relationSide === "child" ? "child" : "parent";
			const onChildSide = relationSide === "child";
			constraints.set(field.slug, {
				slug: field.slug,
				relation: parsed.relation,
				relationId: relation?.id ?? null,
				relationSide,
				maxSelected: onChildSide ? relation?.max_parents_per_child ?? null : relation?.max_children_per_parent ?? null,
				maxOpposite: onChildSide ? relation?.max_children_per_parent ?? null : relation?.max_parents_per_child ?? null,
				required: field.required === 1
			});
		}
		return constraints;
	});
}
/**
* The field viewing one end of a relation, for the relation-scoped routes, which
* address a relation rather than a field. At most one field binds each
* (relation, side), so this is unambiguous.
*/
function constraintsForRelationSide(constraints, relation, side) {
	for (const field of constraints.values()) if (field.relation === relation && field.relationSide === side) return field;
}
function validateReferenceSelection(constraints, childIds) {
	const max = constraints.maxSelected;
	if (max !== null && childIds.length > max) return validationError(max === 1 ? `Field '${constraints.slug}' accepts a single reference, received ${childIds.length}.` : `Field '${constraints.slug}' accepts at most ${max} references, received ${childIds.length}.`);
	if (constraints.required && childIds.length === 0) return validationError(`Field '${constraints.slug}' is required and must reference at least one entry.`);
	return {
		success: true,
		data: true
	};
}
async function validateRequiredReferencesPresent(db, collection, references, translationOf) {
	if (translationOf) return {
		success: true,
		data: true
	};
	const constraints = await referenceFieldConstraints(db, collection);
	for (const field of constraints.values()) {
		if (!field.required) continue;
		if (references && Object.hasOwn(references, field.slug)) continue;
		return validationError(`Field '${field.slug}' is required and must reference at least one entry.`);
	}
	return {
		success: true,
		data: true
	};
}
/** Map an edge-read failure: a bad pagination cursor is a 400 client error,
* everything else is the generic 500-shaped reference-read error. */
function referencesGetError(error) {
	if (error instanceof InvalidCursorError) return {
		success: false,
		error: {
			code: "INVALID_CURSOR",
			message: error.message
		}
	};
	return {
		success: false,
		error: {
			code: "REFERENCES_GET_ERROR",
			message: "Failed to get references"
		}
	};
}
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
/** True for SQLite UNIQUE / Postgres unique_violation messages (matches the
* fingerprint used in the content handlers). Narrow enough not to catch NOT
* NULL / CHECK violations whose messages also say "constraint". */
function isUniqueViolation(error) {
	const message = error instanceof Error ? error.message.toLowerCase() : "";
	return message.includes("unique constraint failed") || message.includes("duplicate key");
}
async function handleRelationCreate(db, input) {
	try {
		const repo = new RelationRepository(db);
		const registry = new SchemaRegistry(db);
		for (const collection of [input.parentCollection, input.childCollection]) if (!await registry.getCollection(collection)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		return {
			success: true,
			data: { relation: await repo.create(input) }
		};
	} catch (error) {
		if (isUniqueViolation(error)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: "A relation with this slug already exists"
			}
		};
		return {
			success: false,
			error: {
				code: "RELATION_CREATE_ERROR",
				message: "Failed to create relation"
			}
		};
	}
}
async function handleRelationGet(db, id) {
	try {
		const repo = new RelationRepository(db);
		const relation = await repo.findById(id);
		if (!relation) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		const [boundFields, edgeCounts] = await Promise.all([fieldsBoundToRelation(db, relation.slug), repo.countEdgesByRelation()]);
		return {
			success: true,
			data: { relation: {
				...relation,
				boundFields,
				linkCount: edgeCounts.get(relation.id) ?? 0
			} }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "RELATION_GET_ERROR",
				message: "Failed to get relation"
			}
		};
	}
}
/**
* List relations, optionally only those `collection` takes part in.
*
* The admin's relation picker filters this way: a reference field can only bind
* to a relation with its own collection on one end.
*/
async function handleRelationList(db, opts = {}) {
	try {
		const repo = new RelationRepository(db);
		const [relations, boundByRelation, edgeCounts] = await Promise.all([
			opts.collection ? repo.findForCollection(opts.collection) : repo.list(),
			fieldsBoundByRelation(db),
			repo.countEdgesByRelation()
		]);
		return {
			success: true,
			data: { relations: relations.map((relation) => ({
				...relation,
				boundFields: boundByRelation.get(relation.slug) ?? [],
				linkCount: edgeCounts.get(relation.id) ?? 0
			})) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "RELATION_LIST_ERROR",
				message: "Failed to list relations"
			}
		};
	}
}
async function handleRelationUpdate(db, id, input) {
	try {
		const relation = await new RelationRepository(db).update(id, input);
		if (!relation) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		return {
			success: true,
			data: { relation }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "RELATION_UPDATE_ERROR",
				message: "Failed to update relation"
			}
		};
	}
}
/**
* Every reference field on the site, grouped by the slug of the relation it
* binds.
*
* Filtered in JS rather than through `json_extract`: `_emdash_fields` holds one
* row per field on the whole site, and the reference-typed subset of that is
* small enough that a scan beats a dialect-specific JSON path. Grouping the
* whole set in one pass also keeps the relations list to a single scan instead
* of one per row.
*/
async function fieldsBoundByRelation(db) {
	const rows = await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug as fieldSlug",
		"_emdash_collections.slug as collectionSlug",
		"_emdash_fields.validation as validation"
	]).where("_emdash_fields.type", "=", "reference").execute();
	const byRelation = /* @__PURE__ */ new Map();
	for (const row of rows) {
		if (!row.validation) continue;
		let parsed;
		try {
			parsed = JSON.parse(row.validation);
		} catch {
			continue;
		}
		if (!isRecord(parsed) || typeof parsed.relation !== "string") continue;
		const bound = {
			collectionSlug: row.collectionSlug,
			fieldSlug: row.fieldSlug,
			side: parsed.relationSide === "child" ? "child" : "parent"
		};
		const list = byRelation.get(parsed.relation);
		if (list) list.push(bound);
		else byRelation.set(parsed.relation, [bound]);
	}
	return byRelation;
}
/** Every reference field bound to one relation, across both of its ends. */
async function fieldsBoundToRelation(db, relationSlug) {
	return (await fieldsBoundByRelation(db)).get(relationSlug) ?? [];
}
/**
* Delete a relation, the reference fields bound to it, and its edges.
*
* A relation is only ever deleted deliberately — from the relations admin page,
* or by the checkbox on a field delete — and it cannot leave a field pointing at
* nothing, so the fields go with it either way. Callers show the count first;
* `deletedFields` reports what actually went.
*
* Order matters: fields first, then the relation row and its edges. On D1
* `withTransaction` degrades to sequential statements, so an interrupted run
* leaves a relation with fewer bound fields — visible on the relations page and
* finishable — rather than fields pointing at a relation that no longer exists.
*/
async function handleRelationDelete(db, id) {
	try {
		const relation = await new RelationRepository(db).findById(id);
		if (!relation) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		const bound = await fieldsBoundToRelation(db, relation.slug);
		if (!await withTransaction(db, async (trx) => {
			const registry = new SchemaRegistry(trx);
			for (const field of bound) await registry.deleteField(field.collectionSlug, field.fieldSlug);
			return new RelationRepository(trx).delete(id);
		})) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		for (const collection of new Set(bound.map((f) => f.collectionSlug))) {
			invalidateCollectionCache(collection);
			invalidateSchemaCache(collection);
		}
		return {
			success: true,
			data: {
				deleted: true,
				deletedFields: bound.map((f) => `${f.collectionSlug}.${f.fieldSlug}`)
			}
		};
	} catch (error) {
		console.error("Relation delete error:", error);
		return {
			success: false,
			error: {
				code: "RELATION_DELETE_ERROR",
				message: "Failed to delete relation"
			}
		};
	}
}
/**
* Display title for a resolved entry: the collection's configured `titleField`,
* then `title`, then `name`, else null.
*/
function entryTitle(data, titleField) {
	if (titleField) {
		const configured = data[titleField];
		if (typeof configured === "string" && configured.length > 0) return configured;
	}
	if (typeof data.title === "string" && data.title.length > 0) return data.title;
	if (typeof data.name === "string" && data.name.length > 0) return data.name;
	return null;
}
/**
* The collection's configured `titleField`, memoized for the request: a single
* content read hydrates every reference field, and several of them commonly
* target the same collection.
*/
async function getReferenceTitleField(db, collection) {
	return requestCached(`reference-title-field:${collection}`, async () => {
		return (await db.selectFrom("_emdash_collections").select("title_field").where("slug", "=", collection).executeTakeFirst())?.title_field ?? void 0;
	});
}
/** Resolve a relation from an id OR its slug. */
async function resolveRelation(repo, idOrSlug) {
	return await repo.findById(idOrSlug) ?? await repo.findBySlug(idOrSlug);
}
/**
* Pick the locale variant matching `locale`, falling back to the first entry
* (lowest locale code). The fallback is intentional — an edge is keyed by
* `translation_group`, so a referenced entry that exists only in another locale
* is still a real reference — but the returned ref carries the variant's actual
* `locale` so callers never mistake a fallback for the requested locale.
*/
function pickVariant(items, locale) {
	if (locale === null) return items[0];
	const candidates = getLocaleCandidates(locale);
	let best;
	let bestRank = candidates.length;
	for (const item of items) {
		if (item.locale === null) continue;
		const rank = getLocaleRank(item.locale, locale);
		if (rank < bestRank) {
			best = item;
			bestRank = rank;
		}
	}
	return best ?? items[0];
}
/**
* Resolve edge groups to loadable entries in `collection` at `locale`.
* Dangling groups (no surviving entry) are skipped — cleanup is a later slice.
*
* All groups are loaded in one batched query (chunked at `SQL_BATCH_SIZE`)
* rather than a `findTranslations` per edge, so a parent with N children costs
* a constant number of queries, not N+1. Edge order (the caller's `sort_order`)
* is preserved by iterating `edges`.
*
* `includeDrafts` is false for callers without `content:read_drafts`: the load
* is restricted to published entries so a draft/scheduled entry referenced by an
* edge is skipped exactly like a dangling one, never leaking its id/slug/locale.
*/
function resolveEntries(content, collection, edges, pick, locale, includeDrafts, titleField) {
	return resolveGroupSelection(content, collection, edges.map((edge) => ({
		group: pick(edge),
		sortOrder: edge.sortOrder
	})), locale, includeDrafts, titleField);
}
/**
* `resolveEntries` for a selection that has no links behind it yet — a pending
* one staged in a draft revision, which is already a list of translation groups
* in the order the editor chose. Position stands in for the `sort_order` the
* links will carry once it is published.
*/
function resolveEntryGroups(content, collection, groups, locale, includeDrafts, titleField) {
	return resolveGroupSelection(content, collection, groups.map((group, index) => ({
		group,
		sortOrder: index
	})), locale, includeDrafts, titleField);
}
async function resolveGroupSelection(content, collection, selection, locale, includeDrafts, titleField) {
	const all = await content.findTranslationsForGroups(collection, selection.map((entry) => entry.group), { publishedOnly: !includeDrafts });
	const variantsByGroup = /* @__PURE__ */ new Map();
	for (const item of all) {
		if (item.translationGroup == null) continue;
		const list = variantsByGroup.get(item.translationGroup);
		if (list) list.push(item);
		else variantsByGroup.set(item.translationGroup, [item]);
	}
	const refs = [];
	for (const selected of selection) {
		const variants = variantsByGroup.get(selected.group);
		if (!variants) continue;
		const entry = pickVariant(variants, locale);
		if (!entry) continue;
		refs.push({
			id: entry.id,
			slug: entry.slug,
			collection,
			title: entryTitle(entry.data, titleField),
			locale: entry.locale,
			translationGroup: entry.translationGroup,
			sortOrder: selected.sortOrder
		});
	}
	return refs;
}
/**
* The page of a pending selection this end stages, when there is one.
*
* These routes address a relation and a side; a staged selection is keyed by the
* field slug the entry API takes it under, so the field viewing this end is what
* connects them. Returns undefined when the caller may not see drafts, the entry
* has no draft, or the draft stages nothing for this field — all of which mean
* the published links are the answer.
*/
async function stagedPageFor(db, options) {
	if (!options.includeDrafts || !options.draftRevisionId) return void 0;
	const field = constraintsForRelationSide(await referenceFieldConstraints(db, options.collection), options.relationSlug, options.side);
	if (!field) return void 0;
	const groups = readStagedReferences((await new RevisionRepository(db).findById(options.draftRevisionId))?.data)?.[field.slug];
	if (!groups) return void 0;
	return pageStagedGroups(groups, options.page);
}
async function handleReferenceChildrenGet(db, collection, entryId, relation, page = {}, includeDrafts = false) {
	try {
		const repo = new RelationRepository(db);
		const content = new ContentRepository(db);
		const rel = await resolveRelation(repo, relation);
		if (!rel) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		if (collection !== rel.parentCollection) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Entry is not the parent side of this relation"
			}
		};
		const entry = await content.findByIdOrSlug(collection, entryId);
		if (!entry?.translationGroup || !includeDrafts && entry.status !== "published") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Content entry not found"
			}
		};
		const titleField = await getReferenceTitleField(db, rel.childCollection);
		const staged = await stagedPageFor(db, {
			collection,
			relationSlug: rel.slug,
			side: "parent",
			draftRevisionId: entry.draftRevisionId,
			includeDrafts,
			page
		});
		if (staged) return {
			success: true,
			data: {
				children: await resolveEntryGroups(content, rel.childCollection, staged.groups, entry.locale, includeDrafts, titleField),
				nextCursor: staged.nextCursor
			}
		};
		const edges = await repo.getChildrenPage(rel.id, entry.translationGroup, page);
		return {
			success: true,
			data: {
				children: await resolveEntries(content, rel.childCollection, edges.items, (e) => e.childGroup, entry.locale, includeDrafts, titleField),
				nextCursor: edges.nextCursor
			}
		};
	} catch (error) {
		return referencesGetError(error);
	}
}
/**
* Resolve a bound field's selection to what the link table stores, without
* writing anything and without needing the selecting entry to exist.
*
* The field decides the relation and the end it views: a field on the `parent`
* end selects children, one on the `child` end selects the parents pointing at
* it. `entryGroup` is the selecting entry's own translation group when it has
* one — the far-side count discounts links it already holds, since replacing a
* selection with itself adds nothing. A new entry passes `null`: it holds no
* links yet.
*/
async function resolveReferenceTargets(db, collection, constraints, selectedIds, entryGroup) {
	const repo = new RelationRepository(db);
	const content = new ContentRepository(db);
	const side = constraints.relationSide;
	const rel = await resolveRelation(repo, constraints.relation);
	if (!rel) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: "Relation not found"
		}
	};
	const ownCollection = side === "parent" ? rel.parentCollection : rel.childCollection;
	const otherCollection = side === "parent" ? rel.childCollection : rel.parentCollection;
	if (collection !== ownCollection) return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: `Entry is not the ${side} side of this relation`
		}
	};
	const selection = validateReferenceSelection(constraints, selectedIds);
	if (!selection.success) return selection;
	const resolved = await content.findManyByIdOrSlug(otherCollection, selectedIds);
	const groups = [];
	for (const selectedId of selectedIds) {
		const other = resolved.get(selectedId);
		if (!other?.translationGroup) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `${side === "parent" ? "Child" : "Parent"} entry '${selectedId}' not found in ${otherCollection}`
			}
		};
		groups.push(other.translationGroup);
	}
	const far = await validateOppositeSideLimit(db, {
		relationId: rel.id,
		farLimit: side === "parent" ? rel.maxParentsPerChild : rel.maxChildrenPerParent,
		side,
		entryGroup,
		groups,
		labels: selectedIds
	});
	if (!far.success) return far;
	return {
		success: true,
		data: {
			relation: rel.id,
			side,
			groups
		}
	};
}
/**
* Check what a selection does to the *other* end's cardinality.
*
* Cardinality binds both ends, but only one end ever selects: a field on the
* parent side that hands a child its second parent breaks `maxParentsPerChild`
* even though the parent's own limit is untouched. Links the selecting entry
* already holds are discounted — replacing a selection with itself adds nothing.
*
* `labels` names each group the way the caller addressed it, so the message
* quotes the id someone typed. Publication has only the groups, which it stages;
* it quotes those.
*/
async function validateOppositeSideLimit(db, options) {
	const { farLimit, side, groups } = options;
	if (farLimit === null || groups.length === 0) return {
		success: true,
		data: true
	};
	const counts = await new RelationRepository(db).countEdgesByGroup(options.relationId, side === "parent" ? "child" : "parent", groups, options.entryGroup);
	for (const [index, group] of groups.entries()) {
		if ((counts.get(group) ?? 0) + 1 <= farLimit) continue;
		const farSide = side === "parent" ? "parent" : "child";
		const label = options.labels?.[index] ?? group;
		return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: farLimit === 1 ? `Entry '${label}' already has a ${farSide} on this relation, which allows one.` : `Entry '${label}' already has the maximum of ${farLimit} ${farSide} entries on this relation.`
			}
		};
	}
	return {
		success: true,
		data: true
	};
}
/**
* {@link resolveReferenceTargets} for an entry that already exists, anchoring the
* selection on that entry's translation group.
*/
async function resolveReferenceSide(db, collection, entryId, constraints, selectedIds) {
	const entry = await new ContentRepository(db).findByIdOrSlug(collection, entryId);
	if (!entry?.translationGroup) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: "Content entry not found"
		}
	};
	const resolved = await resolveReferenceTargets(db, collection, constraints, selectedIds, entry.translationGroup);
	if (!resolved.success) return resolved;
	return {
		success: true,
		data: {
			...resolved.data,
			entryGroup: entry.translationGroup
		}
	};
}
/**
* Replace one end's links from an already-resolved selection.
*
* Resolution has already proved the relation, the entry and every selected entry
* exist, so nothing here fails on the caller's input. What it can still hit is
* the far end's limit closing between resolving and writing — a slot another
* request took in that window. The write refuses the edge rather than exceeding
* the limit, and throws so the save reports it; the throw carries an `apiError`
* the content handlers map to a response.
*/
async function writeReferenceSelection(db, selection) {
	const repo = new RelationRepository(db);
	const rel = await resolveRelation(repo, selection.relation);
	if (!rel) return;
	const rejected = selection.side === "parent" ? await repo.setChildren(rel.id, selection.entryGroup, selection.groups) : await repo.setParents(rel.id, selection.entryGroup, selection.groups);
	if (rejected.length > 0) {
		const farSide = selection.side === "parent" ? "parent" : "child";
		throw Object.assign(/* @__PURE__ */ new Error(`Entry '${rejected[0]}' already has the maximum number of ${farSide} entries on this relation.`), { apiError: { code: "VALIDATION_ERROR" } });
	}
	invalidateCollectionCache(rel.parentCollection);
	if (rel.childCollection !== rel.parentCollection) invalidateCollectionCache(rel.childCollection);
}
/**
* Replace a reference field's selection on one entry, addressed by field slug.
*
* The field decides which relation and which end: a field bound to the parent
* end replaces that entry's children, one bound to the child end replaces the
* parents pointing at it. This is what the entry create/update body writes
* through, so a site addresses a selection the way it addresses any other field.
*/
async function setReferenceSelection(db, collection, entryId, fieldSlug, selectedIds) {
	const resolved = await resolveReferenceSelection(db, collection, entryId, fieldSlug, selectedIds);
	if (!resolved.success) return resolved;
	await writeReferenceSelection(db, resolved.data);
	return {
		success: true,
		data: {
			relationId: resolved.data.relation,
			entryGroup: resolved.data.entryGroup
		}
	};
}
/**
* `setReferenceSelection` up to but not including the write.
*
* A collection that keeps drafts stages the result in its draft revision instead
* of writing links, so a save reports a bad id or an over-long selection exactly
* as a direct write would, and publication has nothing left to resolve.
*/
async function resolveReferenceSelection(db, collection, entryId, fieldSlug, selectedIds) {
	const constraints = (await referenceFieldConstraints(db, collection)).get(fieldSlug);
	if (!constraints) return notAReferenceField(fieldSlug, collection);
	return resolveReferenceSide(db, collection, entryId, constraints, selectedIds);
}
/**
* `resolveReferenceSelection` for an entry that does not exist yet.
*
* A create resolves its whole payload before it writes its row, because on D1
* that row is committed the moment it is written: a selection that cannot be
* resolved has to be refused while there is still nothing to take back.
*
* `entryGroup` is the group the new row will join — a new translation inherits
* the source's — or null when the row starts a group of its own and so holds no
* links yet.
*/
async function resolveReferenceSelectionTargets(db, collection, fieldSlug, selectedIds, entryGroup) {
	const constraints = (await referenceFieldConstraints(db, collection)).get(fieldSlug);
	if (!constraints) return notAReferenceField(fieldSlug, collection);
	return resolveReferenceTargets(db, collection, constraints, selectedIds, entryGroup);
}
function notAReferenceField(fieldSlug, collection) {
	return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: `Field '${fieldSlug}' is not a reference field on ${collection}`
		}
	};
}
async function handleReferenceParentsGet(db, collection, entryId, relation, page = {}, includeDrafts = false) {
	try {
		const repo = new RelationRepository(db);
		const content = new ContentRepository(db);
		const rel = await resolveRelation(repo, relation);
		if (!rel) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Relation not found"
			}
		};
		if (collection !== rel.childCollection) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Entry is not the child side of this relation"
			}
		};
		const entry = await content.findByIdOrSlug(collection, entryId);
		if (!entry?.translationGroup || !includeDrafts && entry.status !== "published") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Content entry not found"
			}
		};
		const titleField = await getReferenceTitleField(db, rel.parentCollection);
		const staged = await stagedPageFor(db, {
			collection,
			relationSlug: rel.slug,
			side: "child",
			draftRevisionId: entry.draftRevisionId,
			includeDrafts,
			page
		});
		if (staged) return {
			success: true,
			data: {
				parents: await resolveEntryGroups(content, rel.parentCollection, staged.groups, entry.locale, includeDrafts, titleField),
				nextCursor: staged.nextCursor
			}
		};
		const edges = await repo.getParentsPage(rel.id, entry.translationGroup, page);
		return {
			success: true,
			data: {
				parents: await resolveEntries(content, rel.parentCollection, edges.items, (e) => e.parentGroup, entry.locale, includeDrafts, titleField),
				nextCursor: edges.nextCursor
			}
		};
	} catch (error) {
		return referencesGetError(error);
	}
}
export { validateReferenceSelection as _, handleRelationCreate as a, handleRelationList as c, resolveEntries as d, resolveEntryGroups as f, validateOppositeSideLimit as g, setReferenceSelection as h, handleReferenceParentsGet as i, handleRelationUpdate as l, resolveReferenceSelectionTargets as m, getReferenceTitleField as n, handleRelationDelete as o, resolveReferenceSelection as p, handleReferenceChildrenGet as r, handleRelationGet as s, fieldsBoundToRelation as t, referenceFieldConstraints as u, validateRequiredReferencesPresent as v, writeReferenceSelection as y };
