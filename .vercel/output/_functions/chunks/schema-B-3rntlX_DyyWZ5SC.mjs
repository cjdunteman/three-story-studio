import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { b as tableExists, o as currentTimestampValue } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { l as invalidateCollectionCache, p as invalidateSchemaObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as RelationRepository } from "./staged-ByBmPFtX_FQ60UOHq.mjs";
import { d as SchemaRegistry, u as SchemaError } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { a as invalidateSchemaCache } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import { n as expandCollectionBlockFields } from "./block-values-Dg0-8PPS_DG_24WSy.mjs";
import { o as handleRelationDelete, t as fieldsBoundToRelation } from "./relations-WIOojTL4_CqEbuQSZ.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/schema-B-3rntlX.mjs
/** The ids one column value holds. */
function parseColumnIds(value) {
	if (typeof value !== "string" || value.length === 0) return [];
	if (!value.startsWith("[")) return [value];
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		return [value];
	}
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((entry) => typeof entry === "string" && entry.length > 0);
}
/**
* Copy a reference field's column values in as relation edges.
*
* A reference field created before relations existed holds its selection in a
* TEXT column: one entry id, or a JSON array of them for a multiple-reference
* field (`serializeValue` stringifies the array). Binding the field to a relation
* moves that selection into `_emdash_content_references`, and this is the copy.
*
* The column is not touched. On a site that predates pickers it was a free-text
* box, so it can hold anything an editor typed, and only the ids that resolve to
* an entry become edges — clearing it would destroy the rest. Nothing writes to
* it once the field is bound and typegen stops declaring the key, but a content
* read still reports the frozen value in `data` beside the live `references`.
*
* Both ends of an edge are translation groups, so the locale siblings of one
* entry contribute to the same parent group. They are read in a fixed order and
* their ids deduped, and the result is capped at the relation's limit — a
* single-reference field whose locale rows point at different entries keeps the
* first rather than storing a selection the relation forbids.
*
* Every insert is `ON CONFLICT DO NOTHING` against the edge table's unique
* constraint, so running this twice adds nothing the first run already wrote.
*
* Migration 077 carries its own copy of this for the upgrade path. A migration
* must not share a module with the handler layer — the bundler then puts the two
* in chunks that cycle through the migration runner, and the built package throws
* on import — and a shipped migration has to keep behaving the way it did anyway.
*/
async function backfillReferenceEdges(db, backfill) {
	const parentTable = `ec_${backfill.parentCollection}`;
	const childTable = `ec_${backfill.childCollection}`;
	validateIdentifier(parentTable, "content table name");
	validateIdentifier(childTable, "content table name");
	validateIdentifier(backfill.fieldSlug, "content field name");
	if (!await tableExists(db, parentTable) || !await tableExists(db, childTable)) return;
	const entries = await sql`
		SELECT translation_group, ${sql.ref(backfill.fieldSlug)} AS value
		FROM ${sql.ref(parentTable)}
		WHERE ${sql.ref(backfill.fieldSlug)} IS NOT NULL
		ORDER BY locale, id
	`.execute(db);
	const selections = /* @__PURE__ */ new Map();
	for (const entry of entries.rows) {
		if (!entry.translation_group) continue;
		const existing = selections.get(entry.translation_group) ?? [];
		for (const id of parseColumnIds(entry.value)) if (!existing.includes(id)) existing.push(id);
		selections.set(entry.translation_group, existing);
	}
	if (selections.size === 0) return;
	const childIds = [...new Set([...selections.values()].flat())];
	const childGroups = /* @__PURE__ */ new Map();
	for (const batch of chunks(childIds, 50)) {
		const resolved = await sql`
			SELECT id, translation_group
			FROM ${sql.ref(childTable)}
			WHERE id IN (${sql.join(batch)})
		`.execute(db);
		for (const row of resolved.rows) if (row.translation_group) childGroups.set(row.id, row.translation_group);
	}
	const now = currentTimestampValue(db);
	const rows = [];
	for (const parentGroup of [...selections.keys()].toSorted()) {
		const groups = [];
		for (const id of selections.get(parentGroup) ?? []) {
			const group = childGroups.get(id);
			if (group && !groups.includes(group)) groups.push(group);
		}
		const selected = backfill.maxChildren === null ? groups : groups.slice(0, backfill.maxChildren);
		for (const [sortOrder, childGroup] of selected.entries()) rows.push({
			parentGroup,
			childGroup,
			sortOrder
		});
	}
	for (const batch of chunks(rows, 16)) {
		const values = batch.map((row) => sql`(${ulid()}, ${backfill.relationId}, ${row.parentGroup}, ${row.childGroup}, ${row.sortOrder}, ${now})`);
		await sql`
			INSERT INTO ${sql.ref("_emdash_content_references")}
				(id, relation_id, parent_group, child_group, sort_order, created_at)
			VALUES ${sql.join(values)}
			ON CONFLICT DO NOTHING
		`.execute(db);
	}
}
var schema_exports = /* @__PURE__ */ __exportAll({
	bindReferenceField: () => bindReferenceField,
	createFieldRelation: () => createFieldRelation,
	handleOrphanedTableList: () => handleOrphanedTableList,
	handleOrphanedTableRegister: () => handleOrphanedTableRegister,
	handleSchemaCollectionCreate: () => handleSchemaCollectionCreate,
	handleSchemaCollectionDelete: () => handleSchemaCollectionDelete,
	handleSchemaCollectionGet: () => handleSchemaCollectionGet,
	handleSchemaCollectionList: () => handleSchemaCollectionList,
	handleSchemaCollectionReorder: () => handleSchemaCollectionReorder,
	handleSchemaCollectionUpdate: () => handleSchemaCollectionUpdate,
	handleSchemaFieldCreate: () => handleSchemaFieldCreate,
	handleSchemaFieldDelete: () => handleSchemaFieldDelete,
	handleSchemaFieldGet: () => handleSchemaFieldGet,
	handleSchemaFieldList: () => handleSchemaFieldList,
	handleSchemaFieldReorder: () => handleSchemaFieldReorder,
	handleSchemaFieldUpdate: () => handleSchemaFieldUpdate
});
/** Maximum attempts to allocate a unique relation slug for a new reference
* field: the base `${collection}_${field}` slug, then `_2` through `_5`. */
var RELATION_NAME_MAX_ATTEMPTS = 5;
/** True for SQLite UNIQUE / Postgres unique_violation messages — mirrors the
* fingerprint used in the relations API handler. */
function isUniqueViolation(error) {
	const message = error instanceof Error ? error.message.toLowerCase() : "";
	return message.includes("unique constraint failed") || message.includes("duplicate key");
}
/**
* Create the relation definition backing a new reference field, retrying
* with a numeric suffix on a name collision. Runs inside the caller's
* transaction so the relation and the field row it backs commit or roll
* back together.
*/
async function createFieldRelation(trx, collectionSlug, fieldSlug, fieldLabel, targetCollection, maxChildrenPerParent = null) {
	const registry = new SchemaRegistry(trx);
	const relations = new RelationRepository(trx);
	const parent = await registry.getCollection(collectionSlug);
	if (!parent) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
	if (!await registry.getCollection(targetCollection)) throw new SchemaError(`Target collection "${targetCollection}" not found`, "COLLECTION_NOT_FOUND");
	const baseSlug = `${collectionSlug}_${fieldSlug}`.slice(0, 63);
	for (let attempt = 0; attempt < RELATION_NAME_MAX_ATTEMPTS; attempt++) {
		const suffix = attempt === 0 ? "" : `_${attempt + 1}`;
		const slug = attempt === 0 ? baseSlug : `${baseSlug.slice(0, 63 - suffix.length)}${suffix}`;
		try {
			return await relations.create({
				slug,
				parentCollection: collectionSlug,
				childCollection: targetCollection,
				parentLabel: parent.label,
				parentLabelSingular: parent.labelSingular ?? null,
				childLabel: fieldLabel,
				maxChildrenPerParent
			});
		} catch (error) {
			if (attempt === 4 || !isUniqueViolation(error)) throw error;
		}
	}
	throw new SchemaError("Could not allocate a unique relation name", "RELATION_NAME_CONFLICT");
}
/**
* Every cache a field change can stale.
*
* The schema object-cache namespace is bumped here rather than only by the
* collection routes: the render path's reference field map lives in that
* namespace, so a field created, bound, relabelled or deleted would otherwise
* keep resolving against the shape the collection used to have.
*/
function invalidateFieldCaches(collectionSlug) {
	invalidateCollectionCache(collectionSlug);
	invalidateSchemaCache(collectionSlug);
	invalidateSchemaObjectCache();
}
/**
* Bind a reference field that has no relation to one, and copy the selection its
* column holds in as edges.
*
* The column is left in place but stops being written, so the field also stops
* being `indexed` and `searchable`: an index over a frozen column would answer
* content-list filters and searches from values that no longer change. Clearing
* both here drops the field index and re-syncs FTS through `updateField`.
*/
async function bindReferenceField(db, collectionSlug, existing, input, targetCollection) {
	const label = input.label ?? existing.label;
	const maxChildren = input.validation?.multiple ? null : 1;
	return withTransaction(db, async (trx) => {
		const relation = await createFieldRelation(trx, collectionSlug, existing.slug, label, targetCollection, maxChildren);
		const updated = await new SchemaRegistry(trx).updateField(collectionSlug, existing.slug, {
			...input,
			indexed: false,
			searchable: false,
			validation: {
				...input.validation,
				relation: relation.slug,
				relationSide: "parent",
				targetCollection
			}
		});
		await backfillReferenceEdges(trx, {
			parentCollection: collectionSlug,
			childCollection: targetCollection,
			fieldSlug: existing.slug,
			relationId: relation.id,
			maxChildren
		});
		return updated;
	});
}
/**
* List all collections
*/
async function handleSchemaCollectionList(db) {
	try {
		return {
			success: true,
			data: { items: await new SchemaRegistry(db).listCollections() }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_LIST_ERROR",
				message: "Failed to list collections"
			}
		};
	}
}
/**
* Get a collection by slug
*/
async function handleSchemaCollectionGet(db, slug, options) {
	try {
		const registry = new SchemaRegistry(db);
		if (options?.includeFields) {
			const stored = await registry.getCollectionWithFields(slug);
			const item = stored ? await expandCollectionBlockFields(db, stored) : null;
			if (!item) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Collection not found: ${slug}`
				}
			};
			return {
				success: true,
				data: { item }
			};
		}
		const item = await registry.getCollection(slug);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Collection not found: ${slug}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_GET_ERROR",
				message: "Failed to get collection"
			}
		};
	}
}
/**
* Create a collection
*/
async function handleSchemaCollectionCreate(db, input) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).createCollection(input) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		console.error("[emdash] Failed to create collection:", error);
		return {
			success: false,
			error: {
				code: "SCHEMA_CREATE_ERROR",
				message: "Failed to create collection"
			}
		};
	}
}
/**
* Update a collection
*/
async function handleSchemaCollectionUpdate(db, slug, input) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).updateCollection(slug, input) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_UPDATE_ERROR",
				message: "Failed to update collection"
			}
		};
	}
}
/**
* Delete a collection
*/
async function handleSchemaCollectionDelete(db, slug, options) {
	try {
		const registry = new SchemaRegistry(db);
		await registry.assertCollectionDeletable(slug, options);
		const relations = new RelationRepository(db);
		for (const relation of await relations.findForCollection(slug)) {
			const removed = await handleRelationDelete(db, relation.id);
			if (!removed.success) return removed;
		}
		await registry.deleteCollection(slug, options);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_DELETE_ERROR",
				message: "Failed to delete collection"
			}
		};
	}
}
/**
* List fields for a collection
*/
async function handleSchemaFieldList(db, collectionSlug) {
	try {
		const stored = await new SchemaRegistry(db).getCollectionWithFields(collectionSlug);
		if (!stored) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Collection not found: ${collectionSlug}`
			}
		};
		return {
			success: true,
			data: { items: (await expandCollectionBlockFields(db, stored)).fields }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_LIST_ERROR",
				message: "Failed to list fields"
			}
		};
	}
}
/**
* Get a field
*/
async function handleSchemaFieldGet(db, collectionSlug, fieldSlug) {
	try {
		const collection = await new SchemaRegistry(db).getCollectionWithFields(collectionSlug);
		const item = collection ? (await expandCollectionBlockFields(db, collection)).fields.find((field) => field.slug === fieldSlug) : null;
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Field not found: ${fieldSlug} in collection ${collectionSlug}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_GET_ERROR",
				message: "Failed to get field"
			}
		};
	}
}
/**
* Resolve which end of `relation` a field on `collectionSlug` sits on.
*
* The side is only a choice when both ends are the same collection — a
* self-referential relation such as related posts. Anywhere else the matching
* end decides it, and an explicit side that disagrees is a client error rather
* than something to silently override.
*/
function resolveBindingSide(relation, collectionSlug, requested) {
	const isParent = relation.parentCollection === collectionSlug;
	const isChild = relation.childCollection === collectionSlug;
	if (!isParent && !isChild) return { error: `Relation '${relation.slug}' does not touch collection '${collectionSlug}'` };
	if (isParent && isChild) {
		const side = requested ?? "parent";
		return {
			side,
			targetCollection: side === "parent" ? relation.childCollection : relation.parentCollection
		};
	}
	const side = isParent ? "parent" : "child";
	if (requested && requested !== side) return { error: `Collection '${collectionSlug}' is the ${side} of relation '${relation.slug}'` };
	return {
		side,
		targetCollection: isParent ? relation.childCollection : relation.parentCollection
	};
}
/**
* Create a reference field that views an existing relation.
*
* Only one field may view a relation from a given end: two pickers writing the
* same link set have no defined merge, and the second would silently overwrite
* the first on every save.
*/
async function createBoundReferenceField(db, collectionSlug, input, relationSlug) {
	const relation = await new RelationRepository(db).findBySlug(relationSlug);
	if (!relation) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: `Relation '${relationSlug}' not found`
		}
	};
	const resolved = resolveBindingSide(relation, collectionSlug, input.validation?.relationSide);
	if ("error" in resolved) return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: resolved.error
		}
	};
	const taken = (await fieldsBoundToRelation(db, relation.slug)).find((field) => field.side === resolved.side);
	if (taken) return {
		success: false,
		error: {
			code: "CONFLICT",
			message: `Relation '${relation.slug}' is already picked from by ${taken.collectionSlug}.${taken.fieldSlug}`
		}
	};
	const item = await new SchemaRegistry(db).createField(collectionSlug, {
		...input,
		validation: {
			...input.validation,
			relation: relation.slug,
			relationSide: resolved.side,
			targetCollection: resolved.targetCollection
		}
	});
	invalidateFieldCaches(collectionSlug);
	return {
		success: true,
		data: { item }
	};
}
/**
* Create a field
*/
async function handleSchemaFieldCreate(db, collectionSlug, input) {
	try {
		if (input.type === "reference" && input.validation?.relation) return await createBoundReferenceField(db, collectionSlug, input, input.validation.relation);
		if (input.type === "reference") {
			const targetCollection = input.validation?.targetCollection;
			if (!targetCollection) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Reference field requires a target collection"
				}
			};
			const item = await withTransaction(db, async (trx) => {
				const relation = await createFieldRelation(trx, collectionSlug, input.slug, input.label, targetCollection, input.validation?.multiple ? null : 1);
				return new SchemaRegistry(trx).createField(collectionSlug, {
					...input,
					validation: {
						...input.validation,
						relation: relation.slug,
						relationSide: "parent",
						targetCollection
					}
				});
			});
			invalidateFieldCaches(collectionSlug);
			return {
				success: true,
				data: { item }
			};
		}
		const item = await new SchemaRegistry(db).createField(collectionSlug, input);
		invalidateFieldCaches(collectionSlug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_CREATE_ERROR",
				message: "Failed to create field"
			}
		};
	}
}
/**
* Update a field
*/
async function handleSchemaFieldUpdate(db, collectionSlug, fieldSlug, input) {
	try {
		const existing = await new SchemaRegistry(db).getField(collectionSlug, fieldSlug);
		const relationSlug = existing?.type === "reference" ? existing.validation?.relation : void 0;
		const relationSide = existing?.validation?.relationSide;
		if (existing && relationSlug) {
			const nextTargetCollection = input.validation?.targetCollection;
			if (nextTargetCollection !== void 0 && nextTargetCollection !== existing.validation?.targetCollection) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Cannot change the target collection of an existing reference field"
				}
			};
			const updateInput = input.validation !== void 0 ? {
				...input,
				validation: {
					...input.validation,
					relation: existing.validation?.relation,
					relationSide: existing.validation?.relationSide,
					targetCollection: existing.validation?.targetCollection
				}
			} : input;
			const item = await withTransaction(db, async (trx) => {
				const updated = await new SchemaRegistry(trx).updateField(collectionSlug, fieldSlug, updateInput);
				if (input.label !== void 0 && input.label !== existing.label) {
					const relations = new RelationRepository(trx);
					const relation = await relations.findBySlug(relationSlug);
					if (relation) await relations.update(relation.id, relationSide === "child" ? { parentLabel: input.label } : { childLabel: input.label });
				}
				return updated;
			});
			invalidateFieldCaches(collectionSlug);
			return {
				success: true,
				data: { item }
			};
		}
		const bindTarget = existing?.type === "reference" ? input.validation?.targetCollection : null;
		if (existing && bindTarget) {
			const item = await bindReferenceField(db, collectionSlug, existing, input, bindTarget);
			invalidateFieldCaches(collectionSlug);
			return {
				success: true,
				data: { item }
			};
		}
		const item = await new SchemaRegistry(db).updateField(collectionSlug, fieldSlug, input);
		invalidateFieldCaches(collectionSlug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_UPDATE_ERROR",
				message: "Failed to update field"
			}
		};
	}
}
/**
* Delete a field
*/
/**
* Delete a field.
*
* For a reference field, `deleteRelation` also takes the relation, its edges,
* and the field bound to its other side. It is opt-in on the wire and checked
* by default in the admin's confirm dialog, which enumerates what goes first.
*/
async function handleSchemaFieldDelete(db, collectionSlug, fieldSlug, options) {
	try {
		const existing = await new SchemaRegistry(db).getField(collectionSlug, fieldSlug);
		const relationSlug = existing?.type === "reference" ? existing.validation?.relation : void 0;
		if (relationSlug && options?.deleteRelation) {
			const relation = await new RelationRepository(db).findBySlug(relationSlug);
			if (relation) {
				const result = await handleRelationDelete(db, relation.id);
				if (!result.success) return result;
				invalidateFieldCaches(collectionSlug);
				return {
					success: true,
					data: { success: true }
				};
			}
		}
		await new SchemaRegistry(db).deleteField(collectionSlug, fieldSlug);
		invalidateFieldCaches(collectionSlug);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_DELETE_ERROR",
				message: "Failed to delete field"
			}
		};
	}
}
/**
* Reorder collections in the admin sidebar
*/
async function handleSchemaCollectionReorder(db, slugs) {
	try {
		await new SchemaRegistry(db).reorderCollections(slugs);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		console.error("[emdash] Failed to reorder collections:", error);
		return {
			success: false,
			error: {
				code: "SCHEMA_COLLECTION_REORDER_ERROR",
				message: "Failed to reorder collections"
			}
		};
	}
}
/**
* Reorder fields
*/
async function handleSchemaFieldReorder(db, collectionSlug, fieldSlugs) {
	try {
		await new SchemaRegistry(db).reorderFields(collectionSlug, fieldSlugs);
		return {
			success: true,
			data: { success: true }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "SCHEMA_FIELD_REORDER_ERROR",
				message: "Failed to reorder fields"
			}
		};
	}
}
/**
* List orphaned content tables
*/
async function handleOrphanedTableList(db) {
	try {
		return {
			success: true,
			data: { items: await new SchemaRegistry(db).discoverOrphanedTables() }
		};
	} catch (error) {
		console.error("[emdash] Failed to list orphaned tables:", error);
		return {
			success: false,
			error: {
				code: "ORPHAN_LIST_ERROR",
				message: "Failed to list orphaned tables"
			}
		};
	}
}
/**
* Register an orphaned table as a collection
*/
async function handleOrphanedTableRegister(db, slug, options) {
	try {
		return {
			success: true,
			data: { item: await new SchemaRegistry(db).registerOrphanedTable(slug, options) }
		};
	} catch (error) {
		if (error instanceof SchemaError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message,
				details: error.details
			}
		};
		return {
			success: false,
			error: {
				code: "ORPHAN_REGISTER_ERROR",
				message: "Failed to register orphaned table"
			}
		};
	}
}
export { schema_exports as _, handleSchemaCollectionCreate as a, handleSchemaCollectionList as c, handleSchemaFieldCreate as d, handleSchemaFieldDelete as f, handleSchemaFieldUpdate as g, handleSchemaFieldReorder as h, handleOrphanedTableRegister as i, handleSchemaCollectionReorder as l, handleSchemaFieldList as m, createFieldRelation as n, handleSchemaCollectionDelete as o, handleSchemaFieldGet as p, handleOrphanedTableList as r, handleSchemaCollectionGet as s, bindReferenceField as t, handleSchemaCollectionUpdate as u };
