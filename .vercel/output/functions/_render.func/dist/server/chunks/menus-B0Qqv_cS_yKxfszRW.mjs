import { _ as getLocaleRank, a as __exportAll, b as resolveConfiguredLocale, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { c as executeAtomicBatchIfSupported, u as isPostgres, y as supportsAtomicBatch } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { n as localeMatches, r as localeOrder } from "./query-BFHjCzSh_E34Ry5iG.mjs";
import { d as invalidateMenuObjectCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/menus-B0Qqv_cS.mjs
/**
* Thrown by a repository write when the menu the caller resolved earlier has
* since been deleted. Handlers translate this to a
* `NOT_FOUND` API response. Necessary because D1 disables FK enforcement
* (so `ON DELETE CASCADE` won't fire), and an unchecked `setItems` would
* happily insert items whose `menu_id` no longer exists, leaving orphans.
*/
var MenuGoneError = class extends Error {
	constructor(menuId) {
		super(`Menu ${menuId} was deleted while being modified`);
		this.menuId = menuId;
		this.name = "MenuGoneError";
	}
};
var MenuItemParentError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "MenuItemParentError";
	}
};
/**
* Run the statements as one atomic batch where the adapter supports it (D1),
* otherwise inside a transaction. D1 has no interactive transactions, so a
* `withTransaction` there would commit each statement on its own. `check`
* runs inside the transaction, or just before the batch on D1, where a read
* can't be part of it.
*/
async function executeMenuWrite(db, buildStatements, check) {
	if (supportsAtomicBatch(db)) {
		await check?.(db);
		const statements = buildStatements(db);
		if (statements.length > 0) await executeAtomicBatchIfSupported(db, statements);
		return;
	}
	await withTransaction(db, async (trx) => {
		await check?.(trx);
		for (const statement of buildStatements(trx)) await statement.execute();
	});
}
function insertItemRows(target, rows) {
	const first = rows[0];
	if (!first) return [];
	if (isPostgres(target)) return [target.insertInto("_emdash_menu_items").values(rows)];
	return chunks(rows, Math.max(1, Math.floor(50 / Object.keys(first).length))).map((chunk) => target.insertInto("_emdash_menu_items").values(chunk));
}
async function validateItemParents(db, menuId, changes, newItemId) {
	const rows = await db.selectFrom("_emdash_menu_items").select(["id", "parent_id"]).where("menu_id", "=", menuId).execute();
	const parents = new Map(rows.map((row) => [row.id, row.parent_id]));
	if (newItemId !== void 0) parents.set(newItemId, null);
	const originalParents = new Map(parents);
	const scopedChanges = changes.filter((change) => parents.has(change.id));
	for (const change of scopedChanges) parents.set(change.id, change.parentId);
	const validated = /* @__PURE__ */ new Set();
	const changedIds = new Set(scopedChanges.map((change) => change.id));
	for (const id of changedIds) {
		const parentId = parents.get(id) ?? null;
		if (id !== newItemId && parentId === originalParents.get(id)) continue;
		if (parentId !== null && !parents.has(parentId)) throw new MenuItemParentError("Parent item must exist in the same menu");
		const path = /* @__PURE__ */ new Set();
		let cursor = id;
		while (cursor !== null && !validated.has(cursor)) {
			if (path.has(cursor)) throw new MenuItemParentError("A menu item cannot be its own ancestor");
			if (!parents.has(cursor)) break;
			path.add(cursor);
			cursor = parents.get(cursor) ?? null;
		}
		for (const ancestorId of path) validated.add(ancestorId);
	}
}
function rowToMenu(row) {
	return {
		id: row.id,
		name: row.name,
		label: row.label,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
function rowToMenuItem(row) {
	return {
		id: row.id,
		menuId: row.menu_id,
		parentId: row.parent_id,
		sortOrder: row.sort_order,
		type: row.type,
		referenceCollection: row.reference_collection,
		referenceId: row.reference_id,
		customUrl: row.custom_url,
		label: row.label,
		titleAttr: row.title_attr,
		target: row.target,
		cssClasses: row.css_classes,
		createdAt: row.created_at,
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
var MenuRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* List menus with their item counts. When `locale` is omitted, returns
	* every locale variant as its own row (consistent with the admin listing
	* model: each translation is its own menu for editing purposes).
	*/
	async findMany(options = {}) {
		let query = this.db.selectFrom("_emdash_menus as m").leftJoin("_emdash_menu_items as i", "i.menu_id", "m.id").select(({ fn }) => [
			"m.id",
			"m.name",
			"m.label",
			"m.created_at",
			"m.updated_at",
			"m.locale",
			"m.translation_group",
			fn.count("i.id").as("itemCount")
		]).groupBy([
			"m.id",
			"m.name",
			"m.label",
			"m.created_at",
			"m.updated_at",
			"m.locale",
			"m.translation_group"
		]).orderBy("m.name", "asc");
		if (options.locale !== void 0) query = query.where(localeMatches("m.locale", options.locale));
		return (await query.execute()).map((row) => ({
			itemCount: typeof row.itemCount === "string" ? Number(row.itemCount) : row.itemCount,
			...rowToMenu({
				id: row.id,
				name: row.name,
				label: row.label,
				created_at: row.created_at,
				updated_at: row.updated_at,
				locale: row.locale,
				translation_group: row.translation_group
			})
		}));
	}
	/**
	* Find every menu row matching `name` (one per locale on multi-locale
	* installs). Callers use this both to look up a single menu (when locale
	* is supplied) and to detect AMBIGUOUS_LOCALE situations (`length > 1`).
	*/
	async findByName(name, options = {}) {
		let query = this.db.selectFrom("_emdash_menus").selectAll().where("name", "=", name);
		if (options.locale !== void 0) query = query.where(localeMatches("locale", options.locale)).orderBy(localeOrder("locale", options.locale), "asc").orderBy("id", "asc");
		else query = query.orderBy("locale", "asc");
		return (await query.execute()).map(rowToMenu);
	}
	async findById(id) {
		const row = await this.db.selectFrom("_emdash_menus").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? rowToMenu(row) : null;
	}
	/** Fetch a menu plus its items, ordered by `sort_order`. */
	async findWithItems(menuId) {
		const menu = await this.findById(menuId);
		if (!menu) return null;
		const items = await this.findItems(menuId);
		return {
			...menu,
			items
		};
	}
	async findItems(menuId) {
		return (await this.db.selectFrom("_emdash_menu_items").selectAll().where("menu_id", "=", menuId).orderBy("sort_order", "asc").execute()).map(rowToMenuItem);
	}
	/**
	* Returns true when a menu already exists for the given `(name, locale)`.
	* Used by the handler to surface a CONFLICT before attempting the insert.
	*/
	async existsByNameAndLocale(name, locale) {
		return await this.db.selectFrom("_emdash_menus").select("id").where("name", "=", name).where(localeMatches("locale", locale)).executeTakeFirst() !== void 0;
	}
	/**
	* Create a menu. When `translationOf` is supplied the new menu joins the
	* source menu's translation_group and clones its items (each clone gets a
	* fresh ULID, but inherits the source item's `translation_group` so a
	* given nav entry resolves to "the same item" across menu translations).
	*
	* If the source menu is missing this throws — callers should validate
	* existence via `findById` first to return a clean NOT_FOUND.
	*/
	async create(input) {
		const id = ulid();
		let translationGroup = id;
		let sourceItems = [];
		if (input.translationOf) {
			const source = await this.findById(input.translationOf);
			if (!source) throw new Error("Source menu for translation not found");
			translationGroup = source.translationGroup ?? source.id;
			sourceItems = await this.db.selectFrom("_emdash_menu_items").selectAll().where("menu_id", "=", source.id).orderBy("sort_order", "asc").execute();
		}
		const idMap = /* @__PURE__ */ new Map();
		for (const item of sourceItems) idMap.set(item.id, ulid());
		const itemRows = sourceItems.map((item) => ({
			id: idMap.get(item.id),
			menu_id: id,
			parent_id: item.parent_id ? idMap.get(item.parent_id) ?? null : null,
			sort_order: item.sort_order,
			type: item.type,
			reference_collection: item.reference_collection,
			reference_id: item.reference_id,
			custom_url: item.custom_url,
			label: item.label,
			title_attr: item.title_attr,
			target: item.target,
			css_classes: item.css_classes,
			...input.locale !== void 0 ? { locale: input.locale } : {},
			translation_group: item.translation_group ?? item.id
		}));
		await executeMenuWrite(this.db, (target) => [target.insertInto("_emdash_menus").values({
			id,
			name: input.name,
			label: input.label,
			...input.locale !== void 0 ? { locale: input.locale } : {},
			translation_group: translationGroup
		}), ...insertItemRows(target, itemRows)]);
		invalidateMenuObjectCache();
		const created = await this.findById(id);
		if (!created) throw new Error("Failed to create menu");
		return created;
	}
	async update(id, input) {
		if (!await this.findById(id)) return null;
		const values = {};
		if (input.label !== void 0) values.label = input.label;
		if (Object.keys(values).length > 0) {
			await this.db.updateTable("_emdash_menus").set(values).where("id", "=", id).execute();
			invalidateMenuObjectCache();
		}
		return await this.findById(id);
	}
	/**
	* Delete a menu. Items are deleted explicitly to avoid relying on the
	* `ON DELETE CASCADE` FK declared in migration 005, which migration 036
	* removed: that FK is what made #1021 destructive on D1 (the cascade
	* fired when the i18n migration dropped `_emdash_menus`), so dropping
	* the FK was the fix. The explicit delete keeps the runtime working
	* the same way before and after the migration.
	*/
	async delete(id) {
		if (!await this.findById(id)) return false;
		await executeMenuWrite(this.db, (target) => [target.deleteFrom("_emdash_menu_items").where("menu_id", "=", id), target.deleteFrom("_emdash_menus").where("id", "=", id)]);
		invalidateMenuObjectCache();
		return true;
	}
	/**
	* List every translation of a menu (by id or translation_group).
	*
	* Returns `null` when neither the id nor the group resolves to a menu,
	* mapped to NOT_FOUND by the handler.
	*/
	async listTranslations(idOrGroup) {
		const anchor = await this.db.selectFrom("_emdash_menus").selectAll().where((eb) => eb.or([eb("id", "=", idOrGroup), eb("translation_group", "=", idOrGroup)])).executeTakeFirst();
		if (!anchor) return null;
		const group = anchor.translation_group ?? anchor.id;
		return {
			translationGroup: group,
			translations: (await this.db.selectFrom("_emdash_menus").selectAll().where("translation_group", "=", group).orderBy("locale", "asc").execute()).map((row) => ({
				id: row.id,
				name: row.name,
				locale: row.locale,
				label: row.label,
				updatedAt: row.updated_at
			}))
		};
	}
	/**
	* Insert a menu item. `locale` is propagated from the parent menu so
	* `_emdash_menu_items.locale` mirrors the menu's locale (queries can scope
	* by locale without a join).
	*
	* When `sortOrder` is omitted, the next position within the same parent
	* scope is used (max + 1). The fresh `translation_group` defaults to the
	* item's own id, matching the migration 036 backfill.
	*/
	async createItem(menuId, locale, input) {
		const id = ulid();
		if (input.parentId !== void 0) await validateItemParents(this.db, menuId, [{
			id,
			parentId: input.parentId
		}], id);
		let sortOrder = input.sortOrder ?? 0;
		if (input.sortOrder === void 0) {
			const query = this.db.selectFrom("_emdash_menu_items").select(({ fn }) => fn.max("sort_order").as("max")).where("menu_id", "=", menuId);
			sortOrder = ((await (input.parentId == null ? query.where("parent_id", "is", null) : query.where("parent_id", "=", input.parentId)).executeTakeFirst())?.max ?? -1) + 1;
		}
		await this.db.insertInto("_emdash_menu_items").values({
			id,
			menu_id: menuId,
			parent_id: input.parentId ?? null,
			sort_order: sortOrder,
			type: input.type,
			reference_collection: input.referenceCollection ?? null,
			reference_id: input.referenceId ?? null,
			custom_url: input.customUrl ?? null,
			label: input.label,
			title_attr: input.titleAttr ?? null,
			target: input.target ?? null,
			css_classes: input.cssClasses ?? null,
			locale,
			translation_group: id
		}).execute();
		invalidateMenuObjectCache();
		return rowToMenuItem(await this.db.selectFrom("_emdash_menu_items").selectAll().where("id", "=", id).executeTakeFirstOrThrow());
	}
	/**
	* Update a menu item. Caller must ensure the item belongs to the menu —
	* the `where("menu_id", "=", menuId)` guard prevents cross-menu writes.
	* Returns `null` if the item is not found within the menu.
	*/
	async updateItem(menuId, itemId, input) {
		if (!await this.db.selectFrom("_emdash_menu_items").select("id").where("id", "=", itemId).where("menu_id", "=", menuId).executeTakeFirst()) return null;
		if (input.parentId !== void 0) await validateItemParents(this.db, menuId, [{
			id: itemId,
			parentId: input.parentId
		}]);
		const values = {};
		if (input.label !== void 0) values.label = input.label;
		if (input.customUrl !== void 0) values.custom_url = input.customUrl;
		if (input.target !== void 0) values.target = input.target;
		if (input.titleAttr !== void 0) values.title_attr = input.titleAttr;
		if (input.cssClasses !== void 0) values.css_classes = input.cssClasses;
		if (input.parentId !== void 0) values.parent_id = input.parentId;
		if (input.sortOrder !== void 0) values.sort_order = input.sortOrder;
		if (Object.keys(values).length > 0) {
			await this.db.updateTable("_emdash_menu_items").set(values).where("id", "=", itemId).execute();
			invalidateMenuObjectCache();
		}
		return rowToMenuItem(await this.db.selectFrom("_emdash_menu_items").selectAll().where("id", "=", itemId).executeTakeFirstOrThrow());
	}
	/** Delete an item scoped to its menu. Returns false if nothing was deleted. */
	async deleteItem(menuId, itemId) {
		const deleted = (await this.db.deleteFrom("_emdash_menu_items").where("id", "=", itemId).where("menu_id", "=", menuId).execute())[0]?.numDeletedRows !== 0n;
		if (deleted) invalidateMenuObjectCache();
		return deleted;
	}
	/**
	* Atomic replace: delete every existing item and re-insert in order.
	* `parentIndex` (validated by the caller) is resolved against the live
	* insert order so children always reference real parent ids.
	*
	* Returns the count of inserted items (matches the existing handler API).
	*/
	async setItems(menuId, locale, items) {
		const insertedIds = [];
		const itemRows = [];
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (!item) continue;
			const id = ulid();
			const parentId = item.parentIndex !== void 0 ? insertedIds[item.parentIndex] ?? null : null;
			itemRows.push({
				id,
				translation_group: id,
				menu_id: menuId,
				parent_id: parentId,
				sort_order: i,
				type: item.type,
				reference_collection: item.referenceCollection ?? null,
				reference_id: item.referenceId ?? null,
				custom_url: item.customUrl ?? null,
				label: item.label,
				title_attr: item.titleAttr ?? null,
				target: item.target ?? null,
				css_classes: item.cssClasses ?? null,
				locale
			});
			insertedIds.push(id);
		}
		await executeMenuWrite(this.db, (target) => [
			target.deleteFrom("_emdash_menu_items").where("menu_id", "=", menuId),
			...insertItemRows(target, itemRows),
			target.updateTable("_emdash_menus").set({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).where("id", "=", menuId)
		], async (target) => {
			if (!await target.selectFrom("_emdash_menus").select("id").where("id", "=", menuId).executeTakeFirst()) throw new MenuGoneError(menuId);
		});
		invalidateMenuObjectCache();
		return { itemCount: items.length };
	}
	/**
	* Batch reorder items. Each entry is applied scoped to the menu so a
	* malicious payload cannot move foreign items into this menu's siblings.
	*/
	async reorderItems(menuId, items) {
		await executeMenuWrite(this.db, (target) => items.map((item) => target.updateTable("_emdash_menu_items").set({
			parent_id: item.parentId,
			sort_order: item.sortOrder
		}).where("id", "=", item.id).where("menu_id", "=", menuId)), (target) => validateItemParents(target, menuId, items));
		invalidateMenuObjectCache();
		return this.findItems(menuId);
	}
};
var menus_exports = /* @__PURE__ */ __exportAll({
	handleMenuCreate: () => handleMenuCreate,
	handleMenuDelete: () => handleMenuDelete,
	handleMenuGet: () => handleMenuGet,
	handleMenuItemCreate: () => handleMenuItemCreate,
	handleMenuItemDelete: () => handleMenuItemDelete,
	handleMenuItemReorder: () => handleMenuItemReorder,
	handleMenuItemUpdate: () => handleMenuItemUpdate,
	handleMenuList: () => handleMenuList,
	handleMenuSetItems: () => handleMenuSetItems,
	handleMenuTranslations: () => handleMenuTranslations,
	handleMenuUpdate: () => handleMenuUpdate
});
/**
* Error returned when a menu lookup by `name` matches multiple locale
* variants and the caller did not pass `locale` to disambiguate. Maps to
* HTTP 400 via `mapErrorStatus`. The available locales are surfaced in the
* message so MCP/REST callers can recover by re-issuing with `locale`.
*/
function ambiguousMenuLocaleError(name, locales) {
	return {
		success: false,
		error: {
			code: "AMBIGUOUS_LOCALE",
			message: `Menu '${name}' exists in multiple locales (${locales.toSorted().join(", ")}); pass 'locale' to disambiguate.`
		}
	};
}
/**
* Resolve a menu by name + optional locale to a single Menu, surfacing the
* canonical NOT_FOUND / AMBIGUOUS_LOCALE errors. Every item handler relies on
* this to translate (name, locale) into an unambiguous menu row.
*/
async function resolveMenu(repo, name, options) {
	const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
	const matches = await repo.findByName(name, { locale });
	if (matches.length === 0) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: `Menu '${name}' not found${options.locale ? ` in locale '${options.locale}'` : ""}`
		}
	};
	const canonicalLocales = new Set(matches.map((match) => resolveConfiguredLocale(match.locale)));
	if (locale === void 0 && canonicalLocales.size > 1) return {
		success: false,
		error: ambiguousMenuLocaleError(name, [...canonicalLocales]).error
	};
	const preferredLocale = locale ?? resolveConfiguredLocale(matches[0].locale);
	return {
		success: true,
		menu: matches.toSorted((a, b) => getLocaleRank(a.locale, preferredLocale) - getLocaleRank(b.locale, preferredLocale) || a.id.localeCompare(b.id))[0]
	};
}
/**
* List menus with item counts. Filter by `locale` when provided.
*/
async function handleMenuList(db, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		return {
			success: true,
			data: await repo.findMany({ locale })
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_LIST_ERROR",
				message: "Failed to fetch menus"
			}
		};
	}
}
/**
* Create a new menu. When `translationOf` is supplied the new menu joins the
* source menu's translation_group (and gets the source's items cloned by the
* repository).
*/
async function handleMenuCreate(db, input) {
	try {
		if (input.translationOf && !input.locale) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "`locale` is required when `translationOf` is provided"
			}
		};
		const repo = new MenuRepository(db);
		if (input.translationOf) {
			const source = await repo.findById(input.translationOf);
			if (!source) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: "Source menu for translation not found"
				}
			};
			if (source.name !== input.name) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `A translation of menu "${source.name}" must use the same name`
				}
			};
		}
		const effectiveLocale = input.locale ? resolveConfiguredLocale(input.locale) : getI18nConfig()?.defaultLocale ?? "en";
		if (await repo.existsByNameAndLocale(input.name, effectiveLocale)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: `Menu "${input.name}" already exists${input.locale ? ` in locale "${input.locale}"` : ""}`
			}
		};
		return {
			success: true,
			data: await repo.create({
				...input,
				locale: effectiveLocale
			})
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_CREATE_ERROR",
				message: "Failed to create menu"
			}
		};
	}
}
/**
* Get a single menu by name. Honours an optional `locale` filter; when two
* menus share a name across locales, the locale distinguishes them.
*
* Historical behaviour: when `locale` is omitted, returns the lowest-locale
* match (deterministic). Mirrors the pre-repo handler.
*/
async function handleMenuGet(db, name, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const locale = options.locale ? resolveConfiguredLocale(options.locale) : void 0;
		const matches = await repo.findByName(name, { locale });
		if (matches.length === 0) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${name}' not found`
			}
		};
		const menu = matches[0];
		const items = await repo.findItems(menu.id);
		return {
			success: true,
			data: {
				...menu,
				items
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_GET_ERROR",
				message: "Failed to fetch menu"
			}
		};
	}
}
/**
* Update a menu's label. The name + locale are immutable.
*/
async function handleMenuUpdate(db, name, input) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, name, { locale: input.locale });
		if (!resolved.success) return resolved;
		const updated = await repo.update(resolved.menu.id, { label: input.label });
		if (!updated) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${name}' not found`
			}
		};
		return {
			success: true,
			data: updated
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_UPDATE_ERROR",
				message: "Failed to update menu"
			}
		};
	}
}
/**
* Delete a menu (and its items, via the repository's explicit cleanup).
*/
async function handleMenuDelete(db, name, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, name, options);
		if (!resolved.success) return resolved;
		await repo.delete(resolved.menu.id);
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_DELETE_ERROR",
				message: "Failed to delete menu"
			}
		};
	}
}
/**
* List every translation of a menu (by id or translation_group).
*/
async function handleMenuTranslations(db, idOrGroup) {
	try {
		const result = await new MenuRepository(db).listTranslations(idOrGroup);
		if (!result) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu not found"
			}
		};
		return {
			success: true,
			data: result
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_TRANSLATIONS_ERROR",
				message: "Failed to list menu translations"
			}
		};
	}
}
/**
* Add an item to a menu. The item inherits the menu's locale.
*/
async function handleMenuItemCreate(db, menuName, input, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		return {
			success: true,
			data: await repo.createItem(resolved.menu.id, resolved.menu.locale, input)
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_ITEM_CREATE_ERROR",
				message: "Failed to create menu item"
			}
		};
	}
}
/**
* Update a menu item.
*/
async function handleMenuItemUpdate(db, menuName, itemId, input, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		const updated = await repo.updateItem(resolved.menu.id, itemId, input);
		if (!updated) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu item not found"
			}
		};
		return {
			success: true,
			data: updated
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_ITEM_UPDATE_ERROR",
				message: "Failed to update menu item"
			}
		};
	}
}
/**
* Delete a menu item.
*/
async function handleMenuItemDelete(db, menuName, itemId, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		if (!await repo.deleteItem(resolved.menu.id, itemId)) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Menu item not found"
			}
		};
		return {
			success: true,
			data: { deleted: true }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "MENU_ITEM_DELETE_ERROR",
				message: "Failed to delete menu item"
			}
		};
	}
}
/**
* Replace the entire set of items for a menu in one atomic transaction.
*
* Existing items are deleted and the new list is inserted in the order
* provided. `parentIndex` references resolve to actual parent IDs as the
* insert proceeds.
*/
async function handleMenuSetItems(db, menuName, items, options = {}) {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (item?.parentIndex !== void 0) {
			if (item.parentIndex < 0 || item.parentIndex >= i) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: `item[${i}].parentIndex (${item.parentIndex}) must reference an earlier item`
				}
			};
		}
	}
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		const { itemCount } = await repo.setItems(resolved.menu.id, resolved.menu.locale, items);
		return {
			success: true,
			data: {
				name: menuName,
				itemCount
			}
		};
	} catch (error) {
		if (error instanceof MenuGoneError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Menu '${menuName}' not found${options.locale ? ` in locale '${options.locale}'` : ""}`
			}
		};
		console.error("[emdash] handleMenuSetItems failed:", error);
		return {
			success: false,
			error: {
				code: "MENU_SET_ITEMS_ERROR",
				message: "Failed to set menu items"
			}
		};
	}
}
/**
* Batch reorder menu items.
*/
async function handleMenuItemReorder(db, menuName, items, options = {}) {
	try {
		const repo = new MenuRepository(db);
		const resolved = await resolveMenu(repo, menuName, options);
		if (!resolved.success) return resolved;
		return {
			success: true,
			data: await repo.reorderItems(resolved.menu.id, items)
		};
	} catch (error) {
		if (error instanceof MenuItemParentError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "MENU_REORDER_ERROR",
				message: "Failed to reorder menu items"
			}
		};
	}
}
export { handleMenuItemDelete as a, handleMenuList as c, menus_exports as d, handleMenuItemCreate as i, handleMenuTranslations as l, handleMenuDelete as n, handleMenuItemReorder as o, handleMenuGet as r, handleMenuItemUpdate as s, handleMenuCreate as t, handleMenuUpdate as u };
