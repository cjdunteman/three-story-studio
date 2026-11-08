import { c as EmDashValidationError, d as decodeCursor, f as encodeCursor, g as getRequestContext, h as after, i as setRequestCacheEntry, m as initWithLock, n as peekRequestCache, p as createInitLock, r as requestCached, t as clearRequestCacheEntry } from "./request-cache_CXFiINQX.mjs";
import { g as listTablesLike, i as RESERVED_BYLINE_FIELD_SLUGS, t as BYLINE_FIELD_TYPES, v as withTransaction } from "./types_UzRCCRwB.mjs";
import { a as validateIdentifier, n as localeMatches, r as localeOrder } from "./query_B1nwqhxc.mjs";
import { a as getLocaleRank } from "./config_D2Z0BYnM.mjs";
import { a as invalidateCollectionCache, i as invalidateBylineObjectCache } from "./object-cache_C1QujUiI.mjs";
import { t as chunks } from "./chunks_B4YLB6C7.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/src/schema/byline-registry.ts
var RESERVED_SET = new Set(RESERVED_BYLINE_FIELD_SLUGS);
var TYPE_SET = new Set(BYLINE_FIELD_TYPES);
var VERSION_KEY = "byline_fields_version";
/** Hard cap on a slug — mirrors `SchemaRegistry.validateSlug`. */
var MAX_SLUG_LENGTH = 63;
/** Hard cap on a label. Bigger than slugs because labels are display strings. */
var MAX_LABEL_LENGTH = 200;
/**
* Error thrown for byline-schema validation failures. Mirrors
* `SchemaError` in `registry.ts` so the admin API layer can map a small
* set of codes to HTTP statuses without inspecting messages.
*
* Codes:
* - `INVALID_SLUG`      — slug fails identifier rules or length cap
* - `RESERVED_SLUG`     — slug collides with a fixed `_emdash_bylines` column
* - `INVALID_TYPE`      — type is not one of the five v1 field types
* - `INVALID_LABEL`     — label missing or exceeds length cap
* - `INVALID_VALIDATION` — validation payload malformed (e.g. `select` with
*                          no `options`, duplicates in `options`)
* - `FIELD_EXISTS`      — slug already registered
* - `FIELD_NOT_FOUND`   — slug not registered
* - `TRANSLATABLE_LOCKED` — attempt to flip `translatable` while stored
*                          values reference the field
* - `REORDER_MISMATCH`  — reorder input doesn't match the registered set
*/
var BylineSchemaError = class extends Error {
	code;
	details;
	constructor(message, code, details) {
		super(message);
		this.code = code;
		this.details = details;
		this.name = "BylineSchemaError";
	}
};
/**
* Registry for byline custom fields (Discussion #1174).
*
* Owns CRUD over `_emdash_byline_fields` and the
* `options.byline_fields_version` counter that drives cache
* invalidation in `bylines/field-defs-cache.ts`.
*
* **Dirty-bit bookend.** Every mutation runs `markVersionDirty` before
* the schema write and `markVersionClean` after, as standalone writes
* (not inside `withTransaction`) so concurrent isolates observe the
* dirty mark *before* the mutation lands. Parity carries meaning:
* odd = mutation in flight or crashed mid-flight, even = stable.
* The cache bypasses the global holder while odd.
*
* `markVersionDirty` is parity-aware (idempotent on odd) so a
* crashed prior attempt doesn't invert the bit.
* `markVersionClean` always advances to a new even value (+2 from
* even, +1 from odd) so concurrent mutators can't collapse on the
* same key and pin a stale cache snapshot. Idempotent-retry exits
* (`FIELD_EXISTS` / `FIELD_NOT_FOUND` / no-op update) call
* `markVersionClean` too — same code path doubles as crash recovery
* and false-clean recovery.
*
* The residual race: a reader caching between two concurrent
* `markVersionClean` calls sees a partial-set snapshot until the
* second clean lands. Bounded by the inter-clean window (~ms).
* Schema mutations are admin-only and rare; acceptable for now.
* A CAS-on-bump or dialect-specific lock is tracked as follow-up.
*
* **`deleteField` cascade.** Migration 041 already declares
* `ON DELETE CASCADE` on both value tables. The explicit deletes
* here are defense-in-depth against FK-pragma misconfig and mirror
* `BylineRepository.delete`'s app-level cascade for the bylines
* domain.
*
* Reserved-slug rejection runs at the API layer (zod) *and* here so
* non-HTTP callers (seeds, scripts) can't bypass the check.
*/
var BylineSchemaRegistry = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async listFields() {
		return (await this.db.selectFrom("_emdash_byline_fields").selectAll().orderBy("sort_order", "asc").orderBy("created_at", "asc").execute()).map((row) => mapFieldRow(row));
	}
	async getField(slug) {
		const row = await this.db.selectFrom("_emdash_byline_fields").selectAll().where("slug", "=", slug).executeTakeFirst();
		return row ? mapFieldRow(row) : null;
	}
	async getFieldById(id) {
		const row = await this.db.selectFrom("_emdash_byline_fields").selectAll().where("id", "=", id).executeTakeFirst();
		return row ? mapFieldRow(row) : null;
	}
	async createField(input) {
		this.validateSlug(input.slug);
		this.validateLabel(input.label);
		this.validateType(input.type);
		const validation = this.normaliseValidation(input.type, input.validation ?? null);
		if (await this.getField(input.slug)) {
			await this.markVersionClean();
			throw new BylineSchemaError(`Byline field "${input.slug}" already exists`, "FIELD_EXISTS", { slug: input.slug });
		}
		const id = ulid();
		const sortOrder = input.sortOrder ?? await this.nextSortOrder();
		await this.markVersionDirty();
		await withTransaction(this.db, async (trx) => {
			await trx.insertInto("_emdash_byline_fields").values({
				id,
				slug: input.slug,
				label: input.label,
				type: input.type,
				required: input.required ? 1 : 0,
				translatable: input.translatable === false ? 0 : 1,
				validation: validation ? JSON.stringify(validation) : null,
				sort_order: sortOrder
			}).execute();
		});
		await this.markVersionClean();
		const created = await this.getFieldById(id);
		if (!created) throw new BylineSchemaError("Failed to load created field", "FIELD_NOT_FOUND", { id });
		return created;
	}
	async updateField(slug, input) {
		const field = await this.getField(slug);
		if (!field) {
			await this.markVersionClean();
			throw new BylineSchemaError(`Byline field "${slug}" not found`, "FIELD_NOT_FOUND", { slug });
		}
		const updates = {};
		if (input.label !== void 0) {
			this.validateLabel(input.label);
			updates.label = input.label;
		}
		if (input.required !== void 0) updates.required = input.required ? 1 : 0;
		if (input.validation !== void 0) {
			const validation = this.normaliseValidation(field.type, input.validation);
			updates.validation = validation ? JSON.stringify(validation) : null;
		}
		if (input.translatable !== void 0 && input.translatable !== field.translatable) {
			const usage = await this.countFieldValues(field.id);
			if (usage > 0) throw new BylineSchemaError(`Cannot change "translatable" on field "${slug}" while ${usage} value row(s) exist. Delete the values (or the field) and re-create with the new setting.`, "TRANSLATABLE_LOCKED", {
				slug,
				valueCount: usage
			});
			updates.translatable = input.translatable ? 1 : 0;
		}
		if (input.sortOrder !== void 0) updates.sort_order = input.sortOrder;
		if (Object.keys(updates).length === 0) {
			await this.markVersionClean();
			return field;
		}
		updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
		await this.markVersionDirty();
		await withTransaction(this.db, async (trx) => {
			await trx.updateTable("_emdash_byline_fields").set(updates).where("id", "=", field.id).execute();
		});
		await this.markVersionClean();
		const updated = await this.getFieldById(field.id);
		if (!updated) throw new BylineSchemaError("Failed to load updated field", "FIELD_NOT_FOUND", { slug });
		return updated;
	}
	async deleteField(slug) {
		const field = await this.getField(slug);
		if (!field) {
			await this.markVersionClean();
			throw new BylineSchemaError(`Byline field "${slug}" not found`, "FIELD_NOT_FOUND", { slug });
		}
		await this.markVersionDirty();
		await withTransaction(this.db, async (trx) => {
			await trx.deleteFrom("_emdash_byline_field_values").where("field_id", "=", field.id).execute();
			await trx.deleteFrom("_emdash_byline_field_group_values").where("field_id", "=", field.id).execute();
			await trx.deleteFrom("_emdash_byline_fields").where("id", "=", field.id).execute();
		});
		await this.markVersionClean();
	}
	/**
	* Reorder fields by slug. The input must be the *exact* set of
	* currently registered slugs — no adds, no drops, no duplicates. This
	* keeps the operation invertible (any reorder is followed by a reverse
	* reorder) and removes a class of "did I forget a field?" bugs at the
	* API layer.
	*/
	async reorderFields(slugs) {
		if (new Set(slugs).size !== slugs.length) throw new BylineSchemaError("Reorder input contains duplicate slugs", "REORDER_MISMATCH", { slugs });
		const registeredSlugs = (await this.listFields()).map((f) => f.slug).toSorted();
		const inputSlugs = slugs.toSorted();
		if (registeredSlugs.length !== inputSlugs.length) throw new BylineSchemaError(`Reorder input has ${inputSlugs.length} slug(s); ${registeredSlugs.length} registered`, "REORDER_MISMATCH", {
			registered: registeredSlugs,
			input: inputSlugs
		});
		for (let i = 0; i < registeredSlugs.length; i++) if (registeredSlugs[i] !== inputSlugs[i]) throw new BylineSchemaError("Reorder input does not match the registered field set", "REORDER_MISMATCH", {
			registered: registeredSlugs,
			input: inputSlugs
		});
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.markVersionDirty();
		await withTransaction(this.db, async (trx) => {
			for (let i = 0; i < slugs.length; i++) {
				const slug = slugs[i];
				if (slug === void 0) continue;
				await trx.updateTable("_emdash_byline_fields").set({
					sort_order: i,
					updated_at: now
				}).where("slug", "=", slug).execute();
			}
		});
		await this.markVersionClean();
	}
	/**
	* Per-table usage counts for a field, plus the sum. Backs the
	* destructive-delete confirm dialog in the admin UI (Phase 5).
	*
	* Both counts are surfaced separately for diagnostic value: a
	* non-zero count on the table that doesn't match the field's current
	* `translatable` flag indicates historical drift (e.g. a flip from
	* an older code path). Today the registry rejects such flips with
	* `TRANSLATABLE_LOCKED`, so any drift originates pre-Phase-2.
	*
	* Throws `FIELD_NOT_FOUND` when the slug doesn't resolve — callers
	* shouldn't get back zero counts for a missing field.
	*/
	async getFieldUsage(slug) {
		const field = await this.getField(slug);
		if (!field) throw new BylineSchemaError(`Byline field "${slug}" not found`, "FIELD_NOT_FOUND", { slug });
		const tr = await this.db.selectFrom("_emdash_byline_field_values").select(({ fn }) => [fn.count("field_id").as("count")]).where("field_id", "=", field.id).executeTakeFirst();
		const grp = await this.db.selectFrom("_emdash_byline_field_group_values").select(({ fn }) => [fn.count("field_id").as("count")]).where("field_id", "=", field.id).executeTakeFirst();
		const translatableValueCount = Number(tr?.count ?? 0);
		const groupValueCount = Number(grp?.count ?? 0);
		return {
			translatableValueCount,
			groupValueCount,
			totalAffectedRows: translatableValueCount + groupValueCount
		};
	}
	/**
	* Read the persisted version counter. Used by the field-defs cache
	* (Phase 3) to detect invalidation. Returns `0` when the row is
	* missing — covers the "tests that didn't run migration 041" case
	* without throwing.
	*/
	async getVersion() {
		const row = await this.db.selectFrom("options").select("value").where("name", "=", VERSION_KEY).executeTakeFirst();
		if (!row) return 0;
		const parsed = Number.parseInt(row.value, 10);
		return Number.isFinite(parsed) ? parsed : 0;
	}
	/**
	* Force the version counter to an odd integer ("dirty"). Idempotent
	* on odd so a crashed prior attempt can't invert parity. Upsert (not
	* UPDATE) so a missing row still flips parity — `getVersion` returns
	* 0 on missing, which is even, so a bare UPDATE would leave the
	* cache pinned on a stale snapshot. See the class JSDoc.
	*
	* `options.value` qualified: PG's `ON CONFLICT DO UPDATE` puts both
	* the target and `EXCLUDED.value` in scope; bare `value` is ambiguous.
	*/
	async markVersionDirty() {
		await sql`
			INSERT INTO options (name, value)
			VALUES (${VERSION_KEY}, '1')
			ON CONFLICT(name) DO UPDATE SET value = CASE
				WHEN CAST(options.value AS INTEGER) % 2 = 0
					THEN CAST(CAST(options.value AS INTEGER) + 1 AS TEXT)
				ELSE options.value
			END
		`.execute(this.db);
	}
	/**
	* Force the version counter to a **new** even integer (+2 from even,
	* +1 from odd). Always-advance — never a no-op — so two concurrent
	* mutators can't collapse on the same even key and pin a stale cache
	* snapshot. See the class JSDoc for the concurrent-collapse rationale.
	*
	* `options.value` qualified — see `markVersionDirty`.
	*/
	async markVersionClean() {
		await sql`
			INSERT INTO options (name, value)
			VALUES (${VERSION_KEY}, '2')
			ON CONFLICT(name) DO UPDATE SET value = CASE
				WHEN CAST(options.value AS INTEGER) % 2 = 0
					THEN CAST(CAST(options.value AS INTEGER) + 2 AS TEXT)
				ELSE CAST(CAST(options.value AS INTEGER) + 1 AS TEXT)
			END
		`.execute(this.db);
	}
	async nextSortOrder() {
		const max = (await this.db.selectFrom("_emdash_byline_fields").select(({ fn }) => [fn.max("sort_order").as("max")]).executeTakeFirst())?.max ?? null;
		return max === null ? 0 : max + 1;
	}
	async countFieldValues(fieldId) {
		const tr = await this.db.selectFrom("_emdash_byline_field_values").select(({ fn }) => [fn.count("field_id").as("count")]).where("field_id", "=", fieldId).executeTakeFirst();
		const grp = await this.db.selectFrom("_emdash_byline_field_group_values").select(({ fn }) => [fn.count("field_id").as("count")]).where("field_id", "=", fieldId).executeTakeFirst();
		return Number(tr?.count ?? 0) + Number(grp?.count ?? 0);
	}
	validateSlug(slug) {
		if (!slug || typeof slug !== "string") throw new BylineSchemaError("Byline field slug is required", "INVALID_SLUG", { slug });
		if (slug.length > MAX_SLUG_LENGTH) throw new BylineSchemaError(`Byline field slug must be ${MAX_SLUG_LENGTH} characters or less`, "INVALID_SLUG", { slug });
		try {
			validateIdentifier(slug, "byline field slug");
		} catch (error) {
			throw new BylineSchemaError(error instanceof Error ? error.message : "Invalid byline field slug", "INVALID_SLUG", { slug });
		}
		if (RESERVED_SET.has(slug)) throw new BylineSchemaError(`Byline field slug "${slug}" is reserved`, "RESERVED_SLUG", { slug });
	}
	validateLabel(label) {
		if (!label || typeof label !== "string") throw new BylineSchemaError("Byline field label is required", "INVALID_LABEL", { label });
		if (label.length > MAX_LABEL_LENGTH) throw new BylineSchemaError(`Byline field label must be ${MAX_LABEL_LENGTH} characters or less`, "INVALID_LABEL", { length: label.length });
	}
	validateType(type) {
		if (!TYPE_SET.has(type)) throw new BylineSchemaError(`Byline field type "${type}" is not supported. Valid types: ${[...TYPE_SET].join(", ")}`, "INVALID_TYPE", { type });
	}
	/**
	* Normalise + validate a validation payload for a given field type.
	*
	* - `select`: `options` is required, must be a non-empty array of unique
	*   non-empty strings, capped at `MAX_SELECT_OPTIONS`.
	* - any other type: `options` is silently dropped if present (a future
	*   field type might use it, but v1 doesn't).
	*
	* Returns `null` when the resulting validation object is empty, so the
	* storage column stays NULL rather than carrying `'{}'`.
	*/
	normaliseValidation(type, validation) {
		if (type === "select") {
			const options = validation?.options;
			if (!Array.isArray(options) || options.length === 0) throw new BylineSchemaError(`Byline field of type "select" requires non-empty "validation.options"`, "INVALID_VALIDATION", { type });
			if (options.length > 200) throw new BylineSchemaError(`Byline field "select" cannot have more than 200 options`, "INVALID_VALIDATION", { count: options.length });
			const seen = /* @__PURE__ */ new Set();
			for (const option of options) {
				if (typeof option !== "string" || option.length === 0) throw new BylineSchemaError(`Byline field "select" options must be non-empty strings`, "INVALID_VALIDATION", { option });
				if (seen.has(option)) throw new BylineSchemaError(`Byline field "select" options must be unique`, "INVALID_VALIDATION", { option });
				seen.add(option);
			}
			return { options };
		}
		if (validation == null) return null;
		const { options: _drop, ...rest } = validation;
		return Object.keys(rest).length === 0 ? null : rest;
	}
};
function mapFieldRow(row) {
	return {
		id: row.id,
		slug: row.slug,
		label: row.label,
		type: row.type,
		required: row.required === 1,
		translatable: row.translatable === 1,
		validation: row.validation ? JSON.parse(row.validation) : null,
		sortOrder: row.sort_order,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
// node_modules/emdash/src/bylines/field-defs-cache.ts
var HOLDER_KEY = Symbol.for("emdash:byline-field-defs");
var g = globalThis;
var holder = g[HOLDER_KEY] ?? (() => {
	const h = {
		value: null,
		hasValue: false,
		cachedVersion: -1,
		lock: createInitLock()
	};
	g[HOLDER_KEY] = h;
	return h;
})();
var REQUEST_CACHE_KEY_VERSION = "byline-fields-version";
var REQUEST_CACHE_KEY_DEFS_PREFIX = "byline-field-defs:";
/**
* Reclaim window for the single-flight lock: if an owner holds it past
* this without publishing (e.g. its request was cancelled and the
* anchored fetch hasn't completed yet), the next reader reclaims and
* refetches. `listFields` is a single fast SELECT, so this only needs to
* cover a genuinely slow/stranded query. Mutable solely so tests can
* shorten it; production never changes it.
*/
var reclaimDeadlineMs = 1e4;
/**
* Read the persisted `options.byline_fields_version` counter. Cached for
* the duration of the current request via `requestCached`. Returns `0`
* when the row is missing (matches `BylineSchemaRegistry.getVersion`).
*/
async function getBylineFieldsVersion(db) {
	return requestCached(REQUEST_CACHE_KEY_VERSION, () => new BylineSchemaRegistry(db).getVersion());
}
/**
* Resolve registered byline custom-field definitions. Two-tier cache:
* per-request via `requestCached`, then per-isolate via the global
* holder.
*
* The global holder is bypassed for isolated requests (playground / DO
* preview, which point at a divergent schema) and for dirty versions
* (odd counter — see `BylineSchemaRegistry`'s class JSDoc — indicates
* an in-flight or crashed mutation). Both bypass paths still hit the
* per-request cache, so a single render dedupes within itself.
*
* Always returns an array. Empty = no custom fields registered.
*/
async function getBylineFieldDefs(db) {
	const isolated = getRequestContext()?.dbIsIsolated === true;
	const version = await getBylineFieldsVersion(db);
	const dirty = version % 2 !== 0;
	return requestCached(`${REQUEST_CACHE_KEY_DEFS_PREFIX}${version}`, async () => {
		if (isolated || dirty) return new BylineSchemaRegistry(db).listFields();
		return initWithLock(holder.lock, () => holder.hasValue && holder.cachedVersion === version ? holder.value : null, (isCurrentClaim) => (async () => {
			const defs = await new BylineSchemaRegistry(db).listFields();
			if (isCurrentClaim() && version >= holder.cachedVersion) {
				holder.value = defs;
				holder.hasValue = true;
				holder.cachedVersion = version;
			}
			return defs;
		})(), {
			deadlineMs: reclaimDeadlineMs,
			anchor: (promise) => after(() => promise)
		});
	});
}
// node_modules/emdash/src/database/repositories/byline.ts
function preferLocalizedRows(rows, locale) {
	if (locale === void 0) return rows;
	const selected = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const key = `${row.content_id ?? ""}:${row.translation_group ?? row.id}`;
		const existing = selected.get(key);
		if (!existing || getLocaleRank(row.locale, locale) < getLocaleRank(existing.locale, locale) || getLocaleRank(row.locale, locale) === getLocaleRank(existing.locale, locale) && row.id < existing.id) selected.set(key, row);
	}
	return rows.filter((row) => selected.get(`${row.content_id ?? ""}:${row.translation_group ?? row.id}`) === row);
}
function rowToByline(row) {
	return {
		id: row.id,
		slug: row.slug,
		displayName: row.display_name,
		bio: row.bio,
		avatarMediaId: row.avatar_media_id,
		avatarStorageKey: row.avatar_storage_key ?? null,
		avatarAlt: row.avatar_alt ?? null,
		avatarBlurhash: row.avatar_blurhash ?? null,
		avatarDominantColor: row.avatar_dominant_color ?? null,
		websiteUrl: row.website_url,
		userId: row.user_id,
		isGuest: row.is_guest === 1,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		locale: row.locale,
		translationGroup: row.translation_group
	};
}
/**
* Merge a single decoded value into a `BylineSummary.customFields` map.
* Centralised so the merge semantics (null storage, JSON.parse failure
* handling) live in one place across both translatable and group-shared
* paths.
*
* A stored row with `value = NULL` (representing an explicit null) is
* surfaced as `null` in `customFields`. A row with a malformed JSON
* payload is dropped silently with a `console.warn` — a corrupted
* payload shouldn't break the entire byline hydration; the field-defs
* cache will let admins replace the value, and the warning makes the
* issue debuggable. (Storage path uses `JSON.stringify`, so the only
* way to get malformed JSON is direct DB tampering or a future
* migration bug.)
*/
function assignCustomFieldValue(summary, field, stored) {
	const target = summary.customFields ?? {};
	if (stored === null) target[field.slug] = null;
	else try {
		target[field.slug] = JSON.parse(stored);
	} catch {
		console.warn(`[BylineRepository] dropping malformed JSON for byline=${summary.id} field=${field.slug}: ${stored.slice(0, 60)}`);
		return;
	}
	summary.customFields = target;
}
/**
* Coerce a raw write-path value to `CustomFieldValue`, throwing
* `EmDashValidationError` on type mismatch. `null` clears the field
* (DELETE in the write path).
*
* TODO: `field.required` is not enforced. The admin UI exposes the
* toggle but the backend accepts missing values; design pass needed
* on the enforcement model.
*/
function coerceFieldValue(field, raw) {
	if (raw === null) return null;
	switch (field.type) {
		case "string":
		case "text":
			if (typeof raw !== "string") throw new EmDashValidationError(`Byline field "${field.slug}" expects a string value (received ${typeof raw})`, {
				slug: field.slug,
				type: field.type,
				received: typeof raw
			});
			return raw;
		case "url": {
			if (typeof raw !== "string") throw new EmDashValidationError(`Byline field "${field.slug}" expects a string value (received ${typeof raw})`, {
				slug: field.slug,
				type: field.type,
				received: typeof raw
			});
			if (raw === "") return raw;
			let parsed;
			try {
				parsed = new URL(raw);
			} catch {
				throw new EmDashValidationError(`Byline field "${field.slug}" expects a valid URL (received "${raw}")`, {
					slug: field.slug,
					type: field.type,
					received: raw
				});
			}
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new EmDashValidationError(`Byline field "${field.slug}" must use http or https scheme (received "${parsed.protocol}")`, {
				slug: field.slug,
				type: field.type,
				received: raw,
				protocol: parsed.protocol
			});
			return raw;
		}
		case "boolean":
			if (typeof raw !== "boolean") throw new EmDashValidationError(`Byline field "${field.slug}" expects a boolean value (received ${typeof raw})`, {
				slug: field.slug,
				type: field.type,
				received: typeof raw
			});
			return raw;
		case "select": {
			if (typeof raw !== "string") throw new EmDashValidationError(`Byline field "${field.slug}" expects a string value (received ${typeof raw})`, {
				slug: field.slug,
				type: field.type,
				received: typeof raw
			});
			const options = field.validation?.options ?? [];
			if (!options.includes(raw)) throw new EmDashValidationError(`Byline field "${field.slug}" value "${raw}" is not one of the registered choices`, {
				slug: field.slug,
				value: raw,
				options
			});
			return raw;
		}
	}
}
/**
* Byline repository for content credits.
*
* Bylines are per-locale (migration 040). Translations of the same byline
* share a `translation_group` ULID. `_emdash_content_bylines.byline_id` and
* `ec_*.primary_byline_id` store the translation_group (not a row id) so a
* single credit spans every locale variant of a byline.
*
* The repository does not resolve locale fallbacks on its own — callers
* supply the locale they want. Hydration is strict per locale: a credit at
* locale X renders iff a byline row exists at locale X within the credited
* translation group. This mirrors `TaxonomyRepository.getTermsForEntry` and
* the convention established by PR #916.
*
* Runtime helpers in `packages/core/src/bylines/index.ts` may layer fallback
* resolution on top for the "look up one byline by slug" path, but the
* relation-hydration methods on this class are always strict.
*/
var BylineRepository = class {
	db;
	constructor(db) {
		this.db = db;
	}
	/**
	* Merge `customFields` onto each `BylineSummary` produced from the
	* given rows. Two batched queries total — one against
	* `_emdash_byline_field_values` (keyed by `byline_id`), one against
	* `_emdash_byline_field_group_values` (keyed by `translation_group`)
	* — both chunked at `SQL_BATCH_SIZE` for D1's bound-parameter cap.
	*
	* When zero fields are registered, every row gets `customFields = {}`
	* with no value-table reads (the field-defs cache returns `[]`).
	* Group-shared values are looked up via the row's `translation_group`,
	* so every locale sibling of the same byline identity sees the same
	* non-translatable value without re-reading per row.
	*
	* **Duplicate-row handling.** Callers (notably `getContentBylinesMany`
	* for list views with repeated authors) can pass the same byline row
	* multiple times. We assign values by *iterating both `rows` and
	* `summaries` in lockstep by index*, not by deduping into a Map keyed
	* on byline id. A Map approach silently drops earlier duplicates' merge
	* step (last writer wins, earlier instances keep their initial `{}`).
	* Iterating by index gives every duplicate its own merged copy.
	*
	* Hydration is *strict per row* — values are merged onto whichever
	* `BylineRow` produced them. Fallback semantics (e.g. "if no value
	* for this locale, show the default-locale value") are not the
	* repository's concern; consumers layer them on top if wanted, the
	* same way `BylineRepository` doesn't resolve locale fallback for
	* the base byline lookup.
	*/
	async withCustomFields(rows) {
		const summaries = rows.map(rowToByline);
		for (const summary of summaries) summary.customFields = {};
		await this.applyCustomFieldsTo(summaries);
		return summaries;
	}
	async withCustomFieldsOne(row) {
		if (!row) return null;
		const [result] = await this.withCustomFields([row]);
		return result ?? null;
	}
	/**
	* Hydrate `customFields` on each `BylineSummary`, mutating in place.
	*
	* The public entry point for callers that fetch byline rows in
	* multiple passes (e.g. `getBylinesForEntries`, which buckets by
	* locale and calls `getContentBylinesMany` per bucket) and want a
	* single batched hydration over the union of bylines, not one per
	* pass. Use with the `skipHydration` option on the read methods to
	* defer customFields work to a single call here.
	*
	* Two batched queries total (translatable + group-shared) regardless
	* of how many bylines, locales, or translation_groups are in the
	* input — meets the Phase 3 query-count envelope for mixed-locale
	* list views even when sibling locales reference disjoint
	* translation_groups.
	*
	* Replaces any existing `customFields` on each summary with a freshly
	* fetched map. Callers that want to merge rather than replace should
	* not use this entry point.
	*/
	async hydrateBylineCustomFields(summaries) {
		for (const summary of summaries) summary.customFields = {};
		await this.applyCustomFieldsTo(summaries);
	}
	/**
	* Shared merge engine for `withCustomFields` and
	* `hydrateBylineCustomFields`. Reads field defs (cached), batches the
	* translatable + group-shared fetches, and walks `summaries` directly
	* to apply values.
	*
	* Iterates `summaries` (not a `summaryById` map) so duplicate
	* `BylineSummary` objects sharing the same `id` — e.g. the same
	* author credited to multiple entries — each get their own merged
	* values. The previous Map-based dedup silently dropped earlier
	* duplicates' merge step.
	*/
	async applyCustomFieldsTo(summaries) {
		if (summaries.length === 0) return;
		const defs = await getBylineFieldDefs(this.db);
		if (defs.length === 0) return;
		const fieldById = new Map(defs.map((d) => [d.id, d]));
		const translatableByByline = /* @__PURE__ */ new Map();
		const bylineIds = [...new Set(summaries.map((s) => s.id))];
		const loadTranslatable = async () => {
			for (const chunk of chunks(bylineIds, 50)) {
				const trRows = await this.db.selectFrom("_emdash_byline_field_values").select([
					"byline_id",
					"field_id",
					"value"
				]).where("byline_id", "in", chunk).execute();
				for (const trRow of trRows) {
					let fieldMap = translatableByByline.get(trRow.byline_id);
					if (!fieldMap) {
						fieldMap = /* @__PURE__ */ new Map();
						translatableByByline.set(trRow.byline_id, fieldMap);
					}
					fieldMap.set(trRow.field_id, trRow.value);
				}
			}
		};
		const groups = [...new Set(summaries.map((s) => s.translationGroup).filter((g) => typeof g === "string" && g.length > 0))];
		const [, groupByGroup] = await Promise.all([loadTranslatable(), this.loadGroupValuesByIds(groups)]);
		for (const summary of summaries) {
			const trValues = translatableByByline.get(summary.id);
			if (trValues) for (const [fieldId, value] of trValues) {
				const field = fieldById.get(fieldId);
				if (!field || !field.translatable) continue;
				assignCustomFieldValue(summary, field, value);
			}
			if (summary.translationGroup) {
				const grpValues = groupByGroup.get(summary.translationGroup);
				if (grpValues) for (const [fieldId, value] of grpValues) {
					const field = fieldById.get(fieldId);
					if (!field || field.translatable) continue;
					assignCustomFieldValue(summary, field, value);
				}
			}
		}
	}
	/**
	* Resolve the group-shared custom-field values for a set of
	* translation_groups, sharing work across hydration calls within the
	* same request via per-group `requestCached` entries.
	*
	* The non-translatable storage table (`_emdash_byline_field_group_values`)
	* is keyed by `translation_group`, which is locale-agnostic. Combining
	* this method with `skipHydration` on `getContentBylinesMany` and a
	* single `hydrateBylineCustomFields` call (see
	* `getBylinesForEntries`) keeps mixed-locale list hydration to **one**
	* batched group-shared SQL per request — even with disjoint
	* translation_groups across locale buckets. Solo callers (`findById`,
	* `findMany`, etc.) still get the same per-call batching they had
	* before; the cache simply means a second call in the same request
	* for an overlapping group is free.
	*
	* Cache key: `byline-field-group-values:${groupId}` — one entry per
	* group. Writes use `setRequestCacheEntry` (idempotent, doesn't
	* overwrite); `BylineRepository.update` calls `clearRequestCacheEntry`
	* after a group-shared write to keep the cache fresh within the same
	* request.
	*/
	async loadGroupValuesByIds(groups) {
		const result = /* @__PURE__ */ new Map();
		if (groups.length === 0) return result;
		const missing = [];
		for (const g of groups) {
			const cached = peekRequestCache(`byline-field-group-values:${g}`);
			if (cached) result.set(g, await cached);
			else missing.push(g);
		}
		if (missing.length === 0) return result;
		const fetched = /* @__PURE__ */ new Map();
		for (const g of missing) fetched.set(g, /* @__PURE__ */ new Map());
		for (const chunk of chunks(missing, 50)) {
			const grpRows = await this.db.selectFrom("_emdash_byline_field_group_values").select([
				"translation_group",
				"field_id",
				"value"
			]).where("translation_group", "in", chunk).execute();
			for (const grpRow of grpRows) {
				const fieldMap = fetched.get(grpRow.translation_group);
				if (!fieldMap) continue;
				fieldMap.set(grpRow.field_id, grpRow.value);
			}
		}
		for (const g of missing) {
			const m = fetched.get(g);
			if (!m) continue;
			setRequestCacheEntry(`byline-field-group-values:${g}`, m);
			result.set(g, m);
		}
		return result;
	}
	/**
	* Every byline column plus the avatar's media columns, folded in by the
	* same `LEFT JOIN media` the credit-hydration queries use. Only the
	* single-row finders select this; `findMany` stays a single-table scan.
	*/
	selectBylineWithAvatar() {
		return this.db.selectFrom("_emdash_bylines as b").leftJoin("media as m", "m.id", "b.avatar_media_id").selectAll("b").select([
			"m.storage_key as avatar_storage_key",
			"m.alt as avatar_alt",
			"m.blurhash as avatar_blurhash",
			"m.dominant_color as avatar_dominant_color"
		]);
	}
	async findById(id) {
		const row = await this.selectBylineWithAvatar().where("b.id", "=", id).executeTakeFirst();
		return this.withCustomFieldsOne(row);
	}
	/**
	* Find a byline by slug. When `locale` is provided, filter by it strictly.
	* When omitted, returns the lowest-locale-code match (deterministic across
	* calls). Mirrors `TaxonomyRepository.findBySlug`.
	*/
	async findBySlug(slug, options) {
		let query = this.selectBylineWithAvatar().where("b.slug", "=", slug);
		if (options?.locale !== void 0) query = query.where(localeMatches("b.locale", options.locale));
		const row = await query.orderBy(options?.locale !== void 0 ? localeOrder("b.locale", options.locale) : "b.locale", "asc").orderBy("b.id", "asc").executeTakeFirst();
		return this.withCustomFieldsOne(row);
	}
	/**
	* Find the byline linked to a CMS user. Post-migration 040 the partial
	* unique on user_id is `(user_id, locale)`, so `locale` is required to
	* disambiguate when multiple locale variants exist. When omitted, returns
	* the lowest-locale-code match.
	*/
	async findByUserId(userId, options) {
		let query = this.selectBylineWithAvatar().where("b.user_id", "=", userId);
		if (options?.locale !== void 0) query = query.where(localeMatches("b.locale", options.locale));
		const row = await query.orderBy(options?.locale !== void 0 ? localeOrder("b.locale", options.locale) : "b.locale", "asc").orderBy("b.id", "asc").executeTakeFirst();
		return this.withCustomFieldsOne(row);
	}
	async findMany(options) {
		const limit = Math.min(Math.max(options?.limit ?? 50, 1), 100);
		let query = this.db.selectFrom("_emdash_bylines").selectAll().orderBy("created_at", "desc").orderBy("id", "desc").limit(limit + 1);
		if (options?.search) {
			const term = `%${options.search.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_")}%`;
			query = query.where((eb) => eb.or([eb("display_name", "like", term), eb("slug", "like", term)]));
		}
		if (options?.isGuest !== void 0) query = query.where("is_guest", "=", options.isGuest ? 1 : 0);
		if (options?.userId !== void 0) query = query.where("user_id", "=", options.userId);
		if (options?.locale !== void 0) query = query.where(localeMatches("locale", options.locale));
		if (options?.cursor) {
			const decoded = decodeCursor(options.cursor);
			query = query.where((eb) => eb.or([eb("created_at", "<", decoded.orderValue), eb.and([eb("created_at", "=", decoded.orderValue), eb("id", "<", decoded.id)])]));
		}
		const rows = await query.execute();
		const pageRows = rows.slice(0, limit);
		const items = await this.withCustomFields(pageRows);
		const result = { items };
		if (rows.length > limit) {
			const last = items.at(-1);
			if (last) result.nextCursor = encodeCursor(last.createdAt, last.id);
		}
		return result;
	}
	/**
	* List every sibling row in `translation_group`. Used by the admin
	* `TranslationsPanel` to render one entry per configured locale.
	*/
	async listTranslations(id) {
		const anchor = await this.findById(id);
		if (!anchor) return [];
		const group = anchor.translationGroup ?? anchor.id;
		return this.findByTranslationGroup(group);
	}
	/**
	* Direct lookup by `translation_group`. Returns every locale variant of a
	* byline, ordered by locale code (deterministic).
	*/
	async findByTranslationGroup(translationGroup) {
		const rows = await this.db.selectFrom("_emdash_bylines").selectAll().where("translation_group", "=", translationGroup).orderBy("locale", "asc").execute();
		return this.withCustomFields(rows);
	}
	/**
	* Validate a `customFields` input map into a write list before any row
	* write — throws `EmDashValidationError` on unknown slugs, type
	* mismatches, or select-choice misses.
	*/
	async resolveCustomFieldWrites(customFields) {
		if (!customFields || Object.keys(customFields).length === 0) return [];
		const defs = await getBylineFieldDefs(this.db);
		const bySlug = new Map(defs.map((d) => [d.slug, d]));
		const writes = [];
		for (const [slug, raw] of Object.entries(customFields)) {
			const field = bySlug.get(slug);
			if (!field) throw new EmDashValidationError(`Unknown byline custom field "${slug}"`, {
				slug,
				registered: defs.map((d) => d.slug)
			});
			writes.push({
				field,
				value: coerceFieldValue(field, raw)
			});
		}
		return writes;
	}
	/**
	* Write a validated custom-field list against a byline row inside the
	* caller's transaction. Per-field writes route to
	* `_emdash_byline_field_values` (translatable) or
	* `_emdash_byline_field_group_values` (group-shared); `null` clears.
	* Returns `true` when any group-shared row was touched so the caller
	* can invalidate the per-request cache post-commit.
	*/
	async applyCustomFieldWritesInTrx(trx, bylineId, translationGroup, writes, now) {
		if (writes.length === 0) return false;
		let touchedGroupShared = false;
		for (const { field, value } of writes) {
			if (!field.translatable) touchedGroupShared = true;
			if (field.translatable) {
				if (value === null) await trx.deleteFrom("_emdash_byline_field_values").where("byline_id", "=", bylineId).where("field_id", "=", field.id).execute();
				else {
					const encoded = JSON.stringify(value);
					await trx.insertInto("_emdash_byline_field_values").values({
						byline_id: bylineId,
						field_id: field.id,
						value: encoded,
						created_at: now,
						updated_at: now
					}).onConflict((oc) => oc.columns(["byline_id", "field_id"]).doUpdateSet({
						value: encoded,
						updated_at: now
					})).execute();
				}
			} else if (value === null) await trx.deleteFrom("_emdash_byline_field_group_values").where("translation_group", "=", translationGroup).where("field_id", "=", field.id).execute();
			else {
				const encoded = JSON.stringify(value);
				await trx.insertInto("_emdash_byline_field_group_values").values({
					translation_group: translationGroup,
					field_id: field.id,
					value: encoded,
					created_at: now,
					updated_at: now
				}).onConflict((oc) => oc.columns(["translation_group", "field_id"]).doUpdateSet({
					value: encoded,
					updated_at: now
				})).execute();
			}
		}
		return touchedGroupShared;
	}
	async create(input) {
		const id = ulid();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const customFieldWrites = await this.resolveCustomFieldWrites(input.customFields);
		let translationGroup = id;
		if (input.translationOf) {
			const source = await this.findById(input.translationOf);
			if (!source) throw new Error("Source byline for translation not found");
			translationGroup = source.translationGroup ?? source.id;
		}
		let touchedGroupShared = false;
		await withTransaction(this.db, async (trx) => {
			await trx.insertInto("_emdash_bylines").values({
				id,
				slug: input.slug,
				display_name: input.displayName,
				bio: input.bio ?? null,
				avatar_media_id: input.avatarMediaId ?? null,
				website_url: input.websiteUrl ?? null,
				user_id: input.userId ?? null,
				is_guest: input.isGuest ? 1 : 0,
				created_at: now,
				updated_at: now,
				...input.locale !== void 0 ? { locale: input.locale } : {},
				translation_group: translationGroup
			}).execute();
			touchedGroupShared = await this.applyCustomFieldWritesInTrx(trx, id, translationGroup, customFieldWrites, now);
		});
		if (touchedGroupShared) clearRequestCacheEntry(`byline-field-group-values:${translationGroup}`);
		invalidateBylineObjectCache();
		const byline = await this.findById(id);
		if (!byline) throw new Error("Failed to create byline");
		return byline;
	}
	async update(id, input) {
		const existing = await this.findById(id);
		if (!existing) return null;
		const customFieldWrites = await this.resolveCustomFieldWrites(input.customFields);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const updates = { updated_at: now };
		if (input.slug !== void 0) updates.slug = input.slug;
		if (input.displayName !== void 0) updates.display_name = input.displayName;
		if (input.bio !== void 0) updates.bio = input.bio;
		if (input.avatarMediaId !== void 0) updates.avatar_media_id = input.avatarMediaId;
		if (input.websiteUrl !== void 0) updates.website_url = input.websiteUrl;
		if (input.userId !== void 0) updates.user_id = input.userId;
		if (input.isGuest !== void 0) updates.is_guest = input.isGuest ? 1 : 0;
		const group = existing.translationGroup ?? existing.id;
		let touchedGroupShared = false;
		await withTransaction(this.db, async (trx) => {
			await trx.updateTable("_emdash_bylines").set(updates).where("id", "=", id).execute();
			touchedGroupShared = await this.applyCustomFieldWritesInTrx(trx, id, group, customFieldWrites, now);
		});
		if (touchedGroupShared) clearRequestCacheEntry(`byline-field-group-values:${group}`);
		invalidateBylineObjectCache();
		return await this.findById(id);
	}
	/**
	* Delete a byline row. When this row is the last sibling in its
	* translation group, also drops every junction row pointing at the group,
	* clears `primary_byline_id` references, and removes the byline's
	* non-translatable custom-field values. When other siblings remain in
	* the group, junctions, `primary_byline_id` pointers, and group-shared
	* custom-field values stay intact — the credit (and its shared metadata)
	* lives on at other locales.
	*
	* **Application-level cascade.** The byline domain has standardised on
	* app-level cascade rather than trusting FK ON DELETE CASCADE, partly
	* because migration 040 had to strip its own FK to support the
	* translation_group remap (#1021), and partly so cleanup doesn't
	* depend on `PRAGMA foreign_keys = ON` (set in production via
	* `connection.ts:60`, but easy to bypass in tests, scripts, and
	* one-off tools). Every byline-related deletion table is cleared
	* explicitly here:
	*
	* - `_emdash_byline_field_values` (per-byline translatable values) —
	*   migration 041 declares FK ON DELETE CASCADE on `byline_id`; the
	*   explicit DELETE removes the dependency on that pragma.
	* - `_emdash_content_bylines` — migration 040 dropped its FK.
	* - `ec_*.primary_byline_id` — never had an FK.
	* - `_emdash_byline_field_group_values` (translation-group-keyed) —
	*   keyed by a text column with no FK to bylines, so app-level cleanup
	*   is the only path.
	*
	* The FKs that remain (migration 041) serve as defense-in-depth.
	*/
	async delete(id) {
		const existing = await this.findById(id);
		if (!existing) return false;
		const group = existing.translationGroup ?? existing.id;
		await withTransaction(this.db, async (trx) => {
			await trx.deleteFrom("_emdash_byline_field_values").where("byline_id", "=", id).execute();
			await trx.deleteFrom("_emdash_bylines").where("id", "=", id).execute();
			const remaining = await trx.selectFrom("_emdash_bylines").select(({ fn }) => [fn.count("id").as("count")]).where("translation_group", "=", group).executeTakeFirst();
			if (Number(remaining?.count ?? 0) > 0) return;
			await trx.deleteFrom("_emdash_content_bylines").where("byline_id", "=", group).execute();
			await trx.deleteFrom("_emdash_byline_field_group_values").where("translation_group", "=", group).execute();
			const tableNames = await listTablesLike(trx, "ec_%");
			for (const tableName of tableNames) {
				validateIdentifier(tableName, "content table");
				await sql`
					UPDATE ${sql.ref(tableName)}
					SET primary_byline_id = NULL
					WHERE primary_byline_id = ${group}
				`.execute(trx);
			}
		});
		invalidateBylineObjectCache();
		return true;
	}
	/**
	* Strict per-locale credit hydration. Joins `_emdash_content_bylines` to
	* `_emdash_bylines` on `translation_group = byline_id`, then filters to
	* the requested locale. Credits whose translation group lacks a row at
	* the requested locale are omitted — callers wanting fallback behaviour
	* apply it themselves. Mirrors `TaxonomyRepository.getTermsForEntry`.
	*/
	async getContentBylines(collectionSlug, contentId, options) {
		let query = this.db.selectFrom("_emdash_content_bylines as cb").innerJoin("_emdash_bylines as b", "b.translation_group", "cb.byline_id").leftJoin("media as m", "m.id", "b.avatar_media_id").select([
			"cb.sort_order as sort_order",
			"cb.role_label as role_label",
			"b.id as id",
			"b.slug as slug",
			"b.display_name as display_name",
			"b.bio as bio",
			"b.avatar_media_id as avatar_media_id",
			"m.storage_key as avatar_storage_key",
			"m.alt as avatar_alt",
			"m.blurhash as avatar_blurhash",
			"m.dominant_color as avatar_dominant_color",
			"b.website_url as website_url",
			"b.user_id as user_id",
			"b.is_guest as is_guest",
			"b.created_at as created_at",
			"b.updated_at as updated_at",
			"b.locale as locale",
			"b.translation_group as translation_group"
		]).where("cb.collection_slug", "=", collectionSlug).where("cb.content_id", "=", contentId).orderBy("cb.sort_order", "asc");
		if (options?.locale !== void 0) query = query.where(localeMatches("b.locale", options.locale));
		const rows = preferLocalizedRows(await query.execute(), options?.locale);
		const bylineRows = rows.map((row) => ({
			id: row.id,
			slug: row.slug,
			display_name: row.display_name,
			bio: row.bio,
			avatar_media_id: row.avatar_media_id,
			avatar_storage_key: row.avatar_storage_key,
			avatar_alt: row.avatar_alt,
			avatar_blurhash: row.avatar_blurhash,
			avatar_dominant_color: row.avatar_dominant_color,
			website_url: row.website_url,
			user_id: row.user_id,
			is_guest: row.is_guest,
			created_at: row.created_at,
			updated_at: row.updated_at,
			locale: row.locale,
			translation_group: row.translation_group
		}));
		const hydrated = await this.withCustomFields(bylineRows);
		return rows.map((row, i) => {
			const byline = hydrated[i];
			if (!byline) throw new Error("getContentBylines: hydration row count mismatch");
			return {
				byline,
				sortOrder: row.sort_order,
				roleLabel: row.role_label
			};
		});
	}
	/**
	* Does this entry have any explicit byline credits — at any locale?
	*
	* Used to disambiguate "no credits exist" (fall back to author-linked
	* byline) from "credits exist but don't resolve at the requested locale"
	* (strict per-locale model: render no byline). Without this check the
	* locale-strict hydration would silently turn a missing translation into
	* an author-inferred byline, contradicting editorial intent.
	*/
	async hasContentBylines(collectionSlug, contentId) {
		return await this.db.selectFrom("_emdash_content_bylines").select("id").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).limit(1).executeTakeFirst() !== void 0;
	}
	/**
	* Batch variant of `hasContentBylines`. Returns the set of content IDs
	* that have at least one junction row (locale-agnostic).
	*/
	async hasContentBylinesMany(collectionSlug, contentIds) {
		const result = /* @__PURE__ */ new Set();
		if (contentIds.length === 0) return result;
		const uniqueContentIds = [...new Set(contentIds)];
		for (const chunk of chunks(uniqueContentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_content_bylines").select("content_id").distinct().where("collection_slug", "=", collectionSlug).where("content_id", "in", chunk).execute();
			for (const row of rows) result.add(row.content_id);
		}
		return result;
	}
	/**
	* Batch variant of `getContentBylines`. Same strict-per-locale semantics
	* applied to the requested locale (single value, not per-entry).
	*
	* When callers need per-entry-locale filtering (e.g. a list endpoint
	* returning entries at mixed locales), they should group the input ids by
	* the entry's locale and call this method once per group.
	*
	* When the caller will issue multiple `getContentBylinesMany` calls in
	* one request (e.g. per locale bucket) and wants a *single* batched
	* customFields hydration over the union of returned bylines, pass
	* `skipHydration: true` on each call and finish with
	* `hydrateBylineCustomFields(allBylines)`. The returned bylines carry
	* `customFields = {}` until that hydration call runs — matching the
	* "always populated" invariant from AC #6 — so callers that forget to
	* hydrate get an empty map rather than `undefined`.
	*/
	async getContentBylinesMany(collectionSlug, contentIds, options) {
		const result = /* @__PURE__ */ new Map();
		if (contentIds.length === 0) return result;
		const uniqueContentIds = [...new Set(contentIds)];
		for (const chunk of chunks(uniqueContentIds, 50)) {
			let query = this.db.selectFrom("_emdash_content_bylines as cb").innerJoin("_emdash_bylines as b", "b.translation_group", "cb.byline_id").leftJoin("media as m", "m.id", "b.avatar_media_id").select([
				"cb.content_id as content_id",
				"cb.sort_order as sort_order",
				"cb.role_label as role_label",
				"b.id as id",
				"b.slug as slug",
				"b.display_name as display_name",
				"b.bio as bio",
				"b.avatar_media_id as avatar_media_id",
				"m.storage_key as avatar_storage_key",
				"m.alt as avatar_alt",
				"m.blurhash as avatar_blurhash",
				"m.dominant_color as avatar_dominant_color",
				"b.website_url as website_url",
				"b.user_id as user_id",
				"b.is_guest as is_guest",
				"b.created_at as created_at",
				"b.updated_at as updated_at",
				"b.locale as locale",
				"b.translation_group as translation_group"
			]).where("cb.collection_slug", "=", collectionSlug).where("cb.content_id", "in", chunk).orderBy("cb.sort_order", "asc");
			if (options?.locale !== void 0) query = query.where(localeMatches("b.locale", options.locale));
			const rows = preferLocalizedRows(await query.execute(), options?.locale);
			const bylineRows = rows.map((row) => ({
				id: row.id,
				slug: row.slug,
				display_name: row.display_name,
				bio: row.bio,
				avatar_media_id: row.avatar_media_id,
				avatar_storage_key: row.avatar_storage_key,
				avatar_alt: row.avatar_alt,
				avatar_blurhash: row.avatar_blurhash,
				avatar_dominant_color: row.avatar_dominant_color,
				website_url: row.website_url,
				user_id: row.user_id,
				is_guest: row.is_guest,
				created_at: row.created_at,
				updated_at: row.updated_at,
				locale: row.locale,
				translation_group: row.translation_group
			}));
			let bylines;
			if (options?.skipHydration === true) {
				bylines = bylineRows.map(rowToByline);
				for (const b of bylines) b.customFields = {};
			} else bylines = await this.withCustomFields(bylineRows);
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];
				const byline = bylines[i];
				if (!row || !byline) continue;
				const contentId = row.content_id;
				const credit = {
					byline,
					sortOrder: row.sort_order,
					roleLabel: row.role_label
				};
				const existing = result.get(contentId);
				if (existing) existing.push(credit);
				else result.set(contentId, [credit]);
			}
		}
		return result;
	}
	/**
	* Batch-fetch byline profiles linked to user IDs in a single query.
	* Strict-locale variant of `findByUserId`.
	*
	* `skipHydration: true` returns bylines with `customFields = {}` so
	* callers issuing multiple `findByUserIds` calls in one request (e.g.
	* the per-locale-bucket author-fallback path in `getBylinesForEntries`)
	* can defer customFields hydration to a single batched
	* `hydrateBylineCustomFields` call across the union — keeping the
	* Phase 3 query-count envelope at "+1 group-shared query per
	* hydration pass" even when buckets fetch disjoint author bylines.
	*/
	async findByUserIds(userIds, options) {
		const result = /* @__PURE__ */ new Map();
		if (userIds.length === 0) return result;
		for (const chunk of chunks(userIds, 50)) {
			let query = this.db.selectFrom("_emdash_bylines as b").leftJoin("media as m", "m.id", "b.avatar_media_id").select([
				"b.id as id",
				"b.slug as slug",
				"b.display_name as display_name",
				"b.bio as bio",
				"b.avatar_media_id as avatar_media_id",
				"m.storage_key as avatar_storage_key",
				"m.alt as avatar_alt",
				"m.blurhash as avatar_blurhash",
				"m.dominant_color as avatar_dominant_color",
				"b.website_url as website_url",
				"b.user_id as user_id",
				"b.is_guest as is_guest",
				"b.created_at as created_at",
				"b.updated_at as updated_at",
				"b.locale as locale",
				"b.translation_group as translation_group"
			]).where("b.user_id", "in", chunk);
			if (options?.locale !== void 0) query = query.where(localeMatches("b.locale", options.locale));
			const rows = await query.execute();
			let bylines;
			if (options?.skipHydration === true) {
				bylines = rows.map(rowToByline);
				for (const b of bylines) b.customFields = {};
			} else bylines = await this.withCustomFields(rows);
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];
				const summary = bylines[i];
				if (!row || !summary || !row.user_id) continue;
				const existing = result.get(row.user_id);
				if (!existing || options?.locale === void 0 || getLocaleRank(row.locale, options.locale) < getLocaleRank(existing.locale, options.locale) || getLocaleRank(row.locale, options.locale) === getLocaleRank(existing.locale, options.locale) && row.id < existing.id) result.set(row.user_id, summary);
			}
		}
		return result;
	}
	/**
	* Clone every junction row from `sourceContentId` to `targetContentId`,
	* preserving `sort_order` and `role_label`. Used by the content
	* translation flow: a newly created translation inherits the source's
	* byline credits at the storage level. Because the junction stores
	* `translation_group` (not a row id), the copy is locale-agnostic — the
	* credits resolve to whichever locale variants of each byline exist when
	* the translated entry is hydrated.
	*
	* No-op when the source has no credits. Skips when the target already
	* has credits (idempotent for re-runs).
	*/
	async copyContentBylines(collection, sourceContentId, targetContentId) {
		validateIdentifier(collection, "collection slug");
		const tableName = `ec_${collection}`;
		validateIdentifier(tableName, "content table");
		if (await this.db.selectFrom("_emdash_content_bylines").select("id").where("collection_slug", "=", collection).where("content_id", "=", targetContentId).executeTakeFirst()) return;
		const sourceRows = await this.db.selectFrom("_emdash_content_bylines").select([
			"byline_id",
			"sort_order",
			"role_label"
		]).where("collection_slug", "=", collection).where("content_id", "=", sourceContentId).orderBy("sort_order", "asc").execute();
		if (sourceRows.length === 0) return;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await this.db.insertInto("_emdash_content_bylines").values(sourceRows.map((row) => ({
			id: ulid(),
			collection_slug: collection,
			content_id: targetContentId,
			byline_id: row.byline_id,
			sort_order: row.sort_order,
			role_label: row.role_label,
			created_at: now
		}))).execute();
		const firstByline = sourceRows[0]?.byline_id ?? null;
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET primary_byline_id = ${firstByline}
			WHERE id = ${targetContentId}
		`.execute(this.db);
		invalidateCollectionCache(collection);
	}
	/**
	* Replace the set of byline credits on a content entry. Accepts row ids
	* at the wire (consistent with how the admin sends them), translates
	* each to its `translation_group` on write, and stores the group in
	* `_emdash_content_bylines.byline_id` and `ec_*.primary_byline_id`.
	*
	* The returned credits are hydrated with strict-locale matching at the
	* locale of the rows the caller supplied (i.e. the locale of the byline
	* each `bylineId` resolves to) — adequate for the autosave round-trip,
	* which then re-hydrates the entry against its own locale separately.
	*/
	async setContentBylines(collectionSlug, contentId, inputBylines) {
		validateIdentifier(collectionSlug, "collection slug");
		const tableName = `ec_${collectionSlug}`;
		validateIdentifier(tableName, "content table");
		const idToGroup = /* @__PURE__ */ new Map();
		const wireIds = [...new Set(inputBylines.map((item) => item.bylineId))];
		for (const batch of chunks(wireIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_bylines").select(["id", "translation_group"]).where("id", "in", batch).execute();
			if (rows.length !== batch.length) throw new Error("One or more byline IDs do not exist");
			for (const row of rows) idToGroup.set(row.id, row.translation_group ?? row.id);
		}
		const seenGroups = /* @__PURE__ */ new Set();
		const bylines = [];
		for (const item of inputBylines) {
			const group = idToGroup.get(item.bylineId);
			if (!group) throw new Error(`Missing translation_group for byline ${item.bylineId}`);
			if (seenGroups.has(group)) continue;
			seenGroups.add(group);
			bylines.push({
				...item,
				group
			});
		}
		await this.db.deleteFrom("_emdash_content_bylines").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).execute();
		for (let i = 0; i < bylines.length; i++) {
			const item = bylines[i];
			if (!item) continue;
			await this.db.insertInto("_emdash_content_bylines").values({
				id: ulid(),
				collection_slug: collectionSlug,
				content_id: contentId,
				byline_id: item.group,
				sort_order: i,
				role_label: item.roleLabel ?? null,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			}).execute();
		}
		const primaryGroup = bylines[0]?.group ?? null;
		await sql`
			UPDATE ${sql.ref(tableName)}
			SET primary_byline_id = ${primaryGroup}
			WHERE id = ${contentId}
		`.execute(this.db);
		invalidateCollectionCache(collectionSlug);
		return await this.getContentBylines(collectionSlug, contentId);
	}
	async deleteContentBylines(collectionSlug, contentId) {
		const result = await this.db.deleteFrom("_emdash_content_bylines").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
};
export { coerceFieldValue as n, BylineRepository as t };
