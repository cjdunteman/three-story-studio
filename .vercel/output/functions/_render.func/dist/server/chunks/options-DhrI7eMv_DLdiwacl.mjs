import { sql } from "kysely";
// node_modules/emdash/dist/options-DhrI7eMv.mjs
var MAX_KEY_LENGTH = 1024;
var MAX_REVISION_LENGTH = 128;
var MAX_VALUE_BYTES = 1048576;
function assertStorageKey(key, maxLength = MAX_KEY_LENGTH) {
	if (typeof key !== "string" || key.length === 0 || key.length > maxLength) throw new TypeError(`Storage key must be a nonempty string of at most ${maxLength} characters`);
}
function assertStorageRevision(revision) {
	if (typeof revision !== "string" || revision.length === 0 || revision.length > MAX_REVISION_LENGTH) throw new TypeError("Storage revision must be a nonempty string of at most 128 characters");
}
function serializeConditionalValue(value) {
	const serialized = JSON.stringify(value);
	if (serialized === void 0) throw new TypeError("Storage value must be JSON serializable");
	if (new TextEncoder().encode(serialized).byteLength > MAX_VALUE_BYTES) throw new TypeError("Conditional storage value must not exceed 1 MiB of JSON");
	return serialized;
}
function escapeLike(value) {
	return value.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}
/**
* Options repository for key-value settings storage
*
* Used for site settings, plugin configuration, and other arbitrary key-value data.
* Values are stored as JSON for flexibility.
*/
var OptionsRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Get an option value
	*/
	async get(name) {
		const row = await this.db.selectFrom("options").select("value").where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return JSON.parse(row.value);
	}
	/**
	* Get an option value with a default
	*/
	async getOrDefault(name, defaultValue) {
		return await this.get(name) ?? defaultValue;
	}
	/**
	* Set an option value (creates or updates)
	*/
	async set(name, value) {
		await this.setVersioned(name, value);
	}
	async setVersioned(name, value) {
		const revision = crypto.randomUUID();
		const row = {
			name,
			value: JSON.stringify(value),
			revision
		};
		await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doUpdateSet({
			value: row.value,
			revision: row.revision
		})).execute();
		return revision;
	}
	/**
	* Set an option value only if no row with that name exists. Atomic at the
	* database level via INSERT ... ON CONFLICT DO NOTHING, so concurrent
	* callers can't race past the check.
	*
	* Returns true when the row was inserted, false when a row already
	* existed (regardless of its value — even an empty string or null).
	*/
	async setIfAbsent(name, value) {
		const row = {
			name,
			value: JSON.stringify(value),
			revision: crypto.randomUUID()
		};
		return ((await this.db.insertInto("options").values(row).onConflict((oc) => oc.column("name").doNothing()).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) > 0n;
	}
	async getVersioned(name) {
		assertStorageKey(name, 2048);
		const row = await this.db.selectFrom("options").select(["value", "revision"]).where("name", "=", name).executeTakeFirst();
		if (!row) return null;
		return {
			value: JSON.parse(row.value),
			revision: row.revision
		};
	}
	async compareAndSet(name, expectedRevision, value) {
		assertStorageKey(name, 2048);
		if (expectedRevision !== null) assertStorageRevision(expectedRevision);
		const serialized = serializeConditionalValue(value);
		const revision = crypto.randomUUID();
		const row = expectedRevision === null ? await this.db.insertInto("options").values({
			name,
			value: serialized,
			revision
		}).onConflict((oc) => oc.column("name").doNothing()).returning("revision").executeTakeFirst() : await this.db.updateTable("options").set({
			value: serialized,
			revision
		}).where("name", "=", name).where("revision", "=", expectedRevision).returning("revision").executeTakeFirst();
		return row ? {
			applied: true,
			revision: row.revision
		} : { applied: false };
	}
	async compareAndDelete(name, expectedRevision) {
		assertStorageKey(name, 2048);
		assertStorageRevision(expectedRevision);
		return { applied: await this.db.deleteFrom("options").where("name", "=", name).where("revision", "=", expectedRevision).returning("name").executeTakeFirst() !== void 0 };
	}
	/**
	* Delete an option
	*/
	async delete(name) {
		return ((await this.db.deleteFrom("options").where("name", "=", name).executeTakeFirst()).numDeletedRows ?? 0) > 0;
	}
	/**
	* Delete multiple options in one statement.
	*/
	async deleteMany(names) {
		if (names.length === 0) return 0;
		const result = await this.db.deleteFrom("options").where("name", "in", names).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	/**
	* Check if an option exists
	*/
	async exists(name) {
		return !!await this.db.selectFrom("options").select("name").where("name", "=", name).executeTakeFirst();
	}
	/**
	* Get multiple options at once
	*/
	async getMany(names) {
		if (names.length === 0) return /* @__PURE__ */ new Map();
		const rows = await this.db.selectFrom("options").select(["name", "value"]).where("name", "in", names).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Set multiple options at once
	*/
	async setMany(options) {
		const entries = Object.entries(options);
		if (entries.length === 0) return;
		for (const [name, value] of entries) await this.set(name, value);
	}
	/**
	* Get all options (use sparingly)
	*/
	async getAll() {
		const rows = await this.db.selectFrom("options").select(["name", "value"]).execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	/**
	* Get all options matching a prefix
	*/
	async getByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike(prefix)}%`;
		let query = this.db.selectFrom("options").select(["name", "value"]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, JSON.parse(row.value));
		return result;
	}
	async getVersionedByPrefix(prefix, options = {}) {
		const pattern = `${escapeLike(prefix)}%`;
		let query = this.db.selectFrom("options").select([
			"name",
			"value",
			"revision"
		]).where(sql`name LIKE ${pattern} ESCAPE '\\'`).orderBy("name", "asc");
		if (options.limit !== void 0) query = query.limit(Math.max(0, options.limit));
		const rows = await query.execute();
		const result = /* @__PURE__ */ new Map();
		for (const row of rows) result.set(row.name, {
			value: JSON.parse(row.value),
			revision: row.revision
		});
		return result;
	}
	async countByPrefix(prefix) {
		const pattern = `${escapeLike(prefix)}%`;
		const row = await this.db.selectFrom("options").select((eb) => eb.fn.countAll().as("count")).where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(row?.count ?? 0);
	}
	/**
	* Delete all options matching a prefix
	*/
	async deleteByPrefix(prefix) {
		const pattern = `${escapeLike(prefix)}%`;
		const result = await this.db.deleteFrom("options").where(sql`name LIKE ${pattern} ESCAPE '\\'`).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
};
export { serializeConditionalValue as i, assertStorageKey as n, assertStorageRevision as r, OptionsRepository as t };
