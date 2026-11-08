import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { a as currentTimestamp, b as tableExists, d as isSqlite, l as indexExists, m as listTablesLike, o as currentTimestampValue, r as columnExists, t as binaryType, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import "node:module";
import { PostgresAdapter, sql } from "kysely";
import { Migrator } from "kysely/migration";
import { z } from "zod";
import { ulid } from "ulidx";
// node_modules/emdash/dist/database/pg-migration-lock.mjs
/**
* Sentinel message thrown when another migrator holds the migration lock.
* `runMigrations` matches on it to route into the concurrent-migrator wait.
*/
var MIGRATION_LOCK_BUSY_MESSAGE = "EMDASH_MIGRATION_LOCK_BUSY";
// node_modules/emdash/dist/database/migration-lock.mjs
var MIGRATION_LOCK_TABLE = "_emdash_migrations_lock";
function migrationLockHeldMessage(heldSince) {
	return `The migration lock has been held since ${new Date(heldSince).toISOString()} (lock ${heldSince}). A migration may still be running; if none is, check the database and release the lock: https://docs.emdashcms.com/deployment/core-migrations/#release-a-stuck-migration-lock`;
}
/** When the lock was taken, as carried by the busy error of `LockingSqliteAdapter`. */
function busyLockHeldSince(error) {
	if (typeof error !== "object" || error === null) return void 0;
	const heldSince = Reflect.get(error, "heldSince");
	return typeof heldSince === "number" && heldSince > 0 ? heldSince : void 0;
}
// node_modules/emdash/dist/config-Cs_AwWXI.mjs
var LOCALE_CODE_PATTERN = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i;
var I18N_CONFIG_KEY = Symbol.for("emdash:i18n-config");
function configStore() {
	return globalThis;
}
/**
* Initialize i18n config from virtual module data.
* Called during runtime initialization.
*/
function setI18nConfig(config) {
	configStore()[I18N_CONFIG_KEY] = config;
}
/**
* Get the current i18n config.
* Returns null if i18n is not configured.
*/
function getI18nConfig() {
	return configStore()[I18N_CONFIG_KEY] ?? null;
}
/** Match a locale path or Astro code to the canonical content locale. */
function resolveConfiguredLocale(locale, config = getI18nConfig()) {
	const configured = config?.locales.find((candidate) => candidate.toLowerCase() === locale.toLowerCase());
	if (configured) return configured;
	const aliased = Object.entries(config?.localeAliases ?? {}).find(([code]) => code.toLowerCase() === locale.toLowerCase())?.[1];
	if (aliased === void 0) return locale;
	return config?.locales.find((candidate) => candidate.toLowerCase() === aliased.toLowerCase()) ?? aliased;
}
/** Stored locale spellings for one configured locale, in read-preference order. */
function getLocaleCandidates(locale) {
	const canonical = resolveConfiguredLocale(locale);
	const candidates = [canonical];
	const seen = /* @__PURE__ */ new Set([canonical.toLowerCase()]);
	for (const code of Object.keys(getI18nConfig()?.localeAliases ?? {})) if (resolveConfiguredLocale(code) === canonical && !seen.has(code.toLowerCase())) {
		candidates.push(code);
		seen.add(code.toLowerCase());
	}
	return candidates;
}
/** Rank a stored row's locale for a lookup by path or code. */
function getLocaleRank(stored, requested) {
	const candidates = getLocaleCandidates(requested);
	const rank = candidates.findIndex((candidate) => candidate.toLowerCase() === stored.toLowerCase());
	return rank === -1 ? candidates.length : rank;
}
/** Rank stored locale variants before moving to the next fallback locale. */
function getLocaleChainRank(stored, chain) {
	let offset = 0;
	for (const locale of chain) {
		const candidates = getLocaleCandidates(locale);
		const rank = getLocaleRank(stored, locale);
		if (rank < candidates.length) return offset + rank;
		offset += candidates.length;
	}
	return offset;
}
/** Whether a string matches the locale-code subset accepted by EmDash. */
function isValidLocaleCode(locale) {
	return LOCALE_CODE_PATTERN.test(locale);
}
/** Resolve the locale for a new content row. */
function resolveContentCreateLocale(locale, config = getI18nConfig()) {
	if (locale !== void 0) {
		if (typeof locale !== "string") throw new Error("Invalid locale code: expected a string");
		const configured = resolveConfiguredLocale(locale, config);
		if (config?.locales.includes(configured)) return configured;
		if (!isValidLocaleCode(locale)) throw new Error(`Invalid locale code: "${locale}"`);
		if (config) throw new Error(`Locale "${locale}" is not configured for this site`);
		return locale;
	}
	return config?.defaultLocale ?? "en";
}
/**
* Check if i18n is enabled.
* Returns true when multiple locales are configured.
*/
function isI18nEnabled() {
	const config = getI18nConfig();
	return config != null && config.locales.length > 1;
}
/**
* Resolve fallback locale chain for a given locale.
* Returns array of locales to try, from most preferred to least.
* Always ends with defaultLocale.
*/
function getFallbackChain(locale) {
	const config = getI18nConfig();
	if (!config) return [locale];
	locale = resolveConfiguredLocale(locale, config);
	const chain = [locale];
	let current = locale;
	const visited = /* @__PURE__ */ new Set([locale]);
	while (config.fallback?.[current]) {
		const next = resolveConfiguredLocale(config.fallback[current], config);
		if (visited.has(next)) break;
		chain.push(next);
		visited.add(next);
		current = next;
	}
	if (!visited.has(config.defaultLocale)) chain.push(config.defaultLocale);
	return chain;
}
// node_modules/emdash/dist/datetime-normalization-PeiEdcRY.mjs
var DatetimeNormalizationError = class extends Error {
	constructor(code, value, timezone) {
		const detail = code === "ambiguous" ? "occurs more than once because of a daylight-saving transition" : code === "nonexistent" ? "does not exist because of a daylight-saving transition" : code === "invalid_timezone" ? `uses an invalid site timezone (${timezone})` : code === "offset_required" ? "must include Z or an explicit UTC offset" : "is not a valid ISO 8601 datetime";
		super(`Datetime ${JSON.stringify(value)} ${detail}`);
		this.code = code;
		this.value = value;
		this.timezone = timezone;
		this.name = "DatetimeNormalizationError";
	}
};
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var NAIVE_DATETIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/;
var EXPLICIT_OFFSET_PATTERN = /(?:Z|[+-]\d{2}:?\d{2})$/i;
var EXPLICIT_DATETIME_SCHEMA = z.iso.datetime({ offset: true }).or(z.iso.datetime({
	offset: true,
	precision: -1
}));
var OFFSET_SAMPLE_RANGE_MS = 1728e5;
var OFFSET_SAMPLE_STEP_MS = 216e5;
function parseNaiveDatetime(value) {
	const match = NAIVE_DATETIME_PATTERN.exec(value);
	if (!match) return null;
	const parts = {
		year: Number(match[1]),
		month: Number(match[2]),
		day: Number(match[3]),
		hour: Number(match[4] ?? 0),
		minute: Number(match[5] ?? 0),
		second: Number(match[6] ?? 0),
		millisecond: Number((match[7] ?? "0").padEnd(3, "0"))
	};
	const check = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond));
	if (check.getUTCFullYear() !== parts.year || check.getUTCMonth() + 1 !== parts.month || check.getUTCDate() !== parts.day || check.getUTCHours() !== parts.hour || check.getUTCMinutes() !== parts.minute || check.getUTCSeconds() !== parts.second || check.getUTCMilliseconds() !== parts.millisecond) return null;
	return parts;
}
function zonedFormatter(timezone, value) {
	try {
		return new Intl.DateTimeFormat("en-US-u-ca-iso8601-nu-latn", {
			timeZone: timezone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23"
		});
	} catch {
		throw new DatetimeNormalizationError("invalid_timezone", value, timezone);
	}
}
function zonedParts(formatter, epochMs) {
	const values = {};
	for (const part of formatter.formatToParts(new Date(epochMs))) if (part.type !== "literal") values[part.type] = Number(part.value);
	return {
		year: values.year ?? 0,
		month: values.month ?? 0,
		day: values.day ?? 0,
		hour: values.hour ?? 0,
		minute: values.minute ?? 0,
		second: values.second ?? 0
	};
}
function timezoneOffsetMs(formatter, epochMs) {
	const wholeSecond = Math.floor(epochMs / 1e3) * 1e3;
	const parts = zonedParts(formatter, wholeSecond);
	return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - wholeSecond;
}
function sameLocalDatetime(formatter, epochMs, expected) {
	const actual = zonedParts(formatter, epochMs);
	return actual.year === expected.year && actual.month === expected.month && actual.day === expected.day && actual.hour === expected.hour && actual.minute === expected.minute && actual.second === expected.second && new Date(epochMs).getUTCMilliseconds() === expected.millisecond;
}
function resolveNaiveDatetime(value, timezone, parts) {
	const formatter = zonedFormatter(timezone, value);
	const localEpoch = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond);
	const offsets = /* @__PURE__ */ new Set();
	for (let sample = localEpoch - OFFSET_SAMPLE_RANGE_MS; sample <= localEpoch + OFFSET_SAMPLE_RANGE_MS; sample += OFFSET_SAMPLE_STEP_MS) offsets.add(timezoneOffsetMs(formatter, sample));
	const candidates = /* @__PURE__ */ new Set();
	for (const offset of offsets) {
		const candidate = localEpoch - offset;
		if (sameLocalDatetime(formatter, candidate, parts)) candidates.add(candidate);
	}
	if (candidates.size === 0) throw new DatetimeNormalizationError("nonexistent", value, timezone);
	if (candidates.size > 1) throw new DatetimeNormalizationError("ambiguous", value, timezone);
	const candidate = candidates.values().next().value;
	if (candidate === void 0) throw new DatetimeNormalizationError("nonexistent", value, timezone);
	return new Date(candidate).toISOString();
}
function normalizeDatetime(value, timezone) {
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) throw new DatetimeNormalizationError("invalid", value, timezone);
		return {
			value: value.toISOString(),
			kind: "offset"
		};
	}
	if (typeof value !== "string") throw new DatetimeNormalizationError("invalid", value, timezone);
	if (value.startsWith("\"") && value.endsWith("\"")) try {
		const unquoted = JSON.parse(value);
		if (typeof unquoted === "string") {
			const normalized = normalizeDatetime(unquoted, timezone);
			return {
				value: normalized.value,
				kind: normalized.kind === "naive" ? "naive" : "offset"
			};
		}
	} catch {
		throw new DatetimeNormalizationError("invalid", value, timezone);
	}
	const naive = parseNaiveDatetime(value);
	if (naive) return {
		value: resolveNaiveDatetime(value, timezone, naive),
		kind: "naive"
	};
	if (!EXPLICIT_OFFSET_PATTERN.test(value)) throw new DatetimeNormalizationError("invalid", value, timezone);
	if (!EXPLICIT_DATETIME_SCHEMA.safeParse(value).success) throw new DatetimeNormalizationError("invalid", value, timezone);
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) throw new DatetimeNormalizationError("invalid", value, timezone);
	const normalized = parsed.toISOString();
	return {
		value: normalized,
		kind: value === normalized ? "canonical" : "offset"
	};
}
function normalizeExplicitDatetime(value) {
	const normalized = normalizeDatetime(value, "UTC");
	if (normalized.kind === "naive") throw new DatetimeNormalizationError("offset_required", value, "UTC");
	return normalized.value;
}
function normalizeContentDatetimes(data, fields, timezone) {
	let value = data;
	let changedCount = 0;
	let naiveCount = 0;
	const write = (slug, next) => {
		if (value === data) value = { ...data };
		value[slug] = next;
	};
	for (const field of fields) {
		const current = data[field.slug];
		if (current === null || current === void 0 || current === "") continue;
		if (field.type === "datetime") {
			const normalized = normalizeDatetime(current, timezone);
			if (normalized.kind === "naive") naiveCount++;
			if (!Object.is(normalized.value, current)) {
				changedCount++;
				write(field.slug, normalized.value);
			}
			continue;
		}
		if (!Array.isArray(current) || !field.datetimeSubFields?.length) continue;
		let rows = current;
		for (const [index, row] of current.entries()) {
			if (!isRecord$2(row)) continue;
			let nextRow = row;
			for (const subField of field.datetimeSubFields) {
				const nested = nextRow[subField];
				if (nested === null || nested === void 0 || nested === "") continue;
				const normalized = normalizeDatetime(nested, timezone);
				if (normalized.kind === "naive") naiveCount++;
				if (!Object.is(normalized.value, nested)) {
					changedCount++;
					if (nextRow === row) nextRow = { ...nextRow };
					nextRow[subField] = normalized.value;
				}
			}
			if (nextRow !== row) {
				if (rows === current) rows = [...current];
				rows[index] = nextRow;
			}
		}
		if (rows !== current) write(field.slug, rows);
	}
	return {
		value,
		changedCount,
		naiveCount
	};
}
// node_modules/emdash/dist/runner-Bkkfk4O8.mjs
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var _001_initial_exports = /* @__PURE__ */ __exportAll({
	down: () => down$89,
	up: () => up$89
});
/**
* Initial schema migration
*
* Note: Content tables (ec_posts, ec_pages, etc.) are created dynamically
* by the SchemaRegistry when collections are added via the admin UI.
* This migration only creates system tables.
*/
async function up$89(db) {
	await db.schema.createTable("revisions").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("collection", "text", (col) => col.notNull()).addColumn("entry_id", "text", (col) => col.notNull()).addColumn("data", "text", (col) => col.notNull()).addColumn("author_id", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_revisions_entry").ifNotExists().on("revisions").columns(["collection", "entry_id"]).execute();
	await db.schema.createTable("taxonomies").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull()).addColumn("slug", "text", (col) => col.notNull()).addColumn("label", "text", (col) => col.notNull()).addColumn("parent_id", "text").addColumn("data", "text").addUniqueConstraint("taxonomies_name_slug_unique", ["name", "slug"]).addForeignKeyConstraint("taxonomies_parent_fk", ["parent_id"], "taxonomies", ["id"], (cb) => cb.onDelete("set null")).execute();
	await db.schema.createIndex("idx_taxonomies_name").ifNotExists().on("taxonomies").column("name").execute();
	await db.schema.createTable("content_taxonomies").ifNotExists().addColumn("collection", "text", (col) => col.notNull()).addColumn("entry_id", "text", (col) => col.notNull()).addColumn("taxonomy_id", "text", (col) => col.notNull()).addPrimaryKeyConstraint("content_taxonomies_pk", [
		"collection",
		"entry_id",
		"taxonomy_id"
	]).addForeignKeyConstraint("content_taxonomies_taxonomy_fk", ["taxonomy_id"], "taxonomies", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createTable("media").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("filename", "text", (col) => col.notNull()).addColumn("mime_type", "text", (col) => col.notNull()).addColumn("size", "integer").addColumn("width", "integer").addColumn("height", "integer").addColumn("alt", "text").addColumn("caption", "text").addColumn("storage_key", "text", (col) => col.notNull()).addColumn("content_hash", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("author_id", "text").execute();
	await db.schema.createIndex("idx_media_content_hash").ifNotExists().on("media").column("content_hash").execute();
	await db.schema.createTable("users").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("email", "text", (col) => col.notNull().unique()).addColumn("password_hash", "text", (col) => col.notNull()).addColumn("name", "text").addColumn("role", "text", (col) => col.defaultTo("subscriber")).addColumn("avatar_id", "text").addColumn("data", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_users_email").ifNotExists().on("users").column("email").execute();
	await db.schema.createTable("options").ifNotExists().addColumn("name", "text", (col) => col.primaryKey()).addColumn("value", "text", (col) => col.notNull()).execute();
	await db.schema.createTable("audit_logs").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("timestamp", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("actor_id", "text").addColumn("actor_ip", "text").addColumn("action", "text", (col) => col.notNull()).addColumn("resource_type", "text").addColumn("resource_id", "text").addColumn("details", "text").addColumn("status", "text").execute();
	await db.schema.createIndex("idx_audit_actor").ifNotExists().on("audit_logs").column("actor_id").execute();
	await db.schema.createIndex("idx_audit_action").ifNotExists().on("audit_logs").column("action").execute();
	await db.schema.createIndex("idx_audit_timestamp").ifNotExists().on("audit_logs").column("timestamp").execute();
}
async function down$89(db) {
	await db.schema.dropTable("audit_logs").execute();
	await db.schema.dropTable("options").execute();
	await db.schema.dropTable("users").execute();
	await db.schema.dropTable("media").execute();
	await db.schema.dropTable("content_taxonomies").execute();
	await db.schema.dropTable("taxonomies").execute();
	await db.schema.dropTable("revisions").execute();
}
var _002_media_status_exports = /* @__PURE__ */ __exportAll({
	down: () => down$88,
	up: () => up$88
});
/**
* Add status column to media table for tracking upload state.
* Status values: 'pending' | 'ready' | 'failed'
*/
async function up$88(db) {
	await db.schema.alterTable("media").addColumn("status", "text", (col) => col.notNull().defaultTo("ready")).execute();
	await db.schema.createIndex("idx_media_status").on("media").column("status").execute();
}
async function down$88(db) {
	await db.schema.dropIndex("idx_media_status").execute();
}
var _003_schema_registry_exports = /* @__PURE__ */ __exportAll({
	down: () => down$87,
	up: () => up$87
});
/**
* Migration: Schema Registry Tables
*
* Creates the schema registry tables that store collection and field definitions.
* This enables dynamic schema management where D1 is the source of truth.
*/
async function up$87(db) {
	await db.schema.createTable("_emdash_collections").addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("label_singular", "text").addColumn("description", "text").addColumn("icon", "text").addColumn("supports", "text").addColumn("source", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createTable("_emdash_fields").addColumn("id", "text", (col) => col.primaryKey()).addColumn("collection_id", "text", (col) => col.notNull()).addColumn("slug", "text", (col) => col.notNull()).addColumn("label", "text", (col) => col.notNull()).addColumn("type", "text", (col) => col.notNull()).addColumn("column_type", "text", (col) => col.notNull()).addColumn("required", "integer", (col) => col.defaultTo(0)).addColumn("unique", "integer", (col) => col.defaultTo(0)).addColumn("default_value", "text").addColumn("validation", "text").addColumn("widget", "text").addColumn("options", "text").addColumn("sort_order", "integer", (col) => col.defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("fields_collection_fk", ["collection_id"], "_emdash_collections", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_fields_collection_slug").on("_emdash_fields").columns(["collection_id", "slug"]).unique().execute();
	await db.schema.createIndex("idx_fields_collection").on("_emdash_fields").column("collection_id").execute();
	await db.schema.createIndex("idx_fields_sort").on("_emdash_fields").columns(["collection_id", "sort_order"]).execute();
}
async function down$87(db) {
	await db.schema.dropTable("_emdash_fields").execute();
	await db.schema.dropTable("_emdash_collections").execute();
}
var _004_plugins_exports = /* @__PURE__ */ __exportAll({
	down: () => down$86,
	up: () => up$86
});
/**
* Migration: Plugin System Tables
*
* Creates the plugin storage table and plugin state tracking.
* Plugin storage uses a document store with declared indexes.
*
* @see PLUGIN-SYSTEM.md § Plugin Storage
*/
async function up$86(db) {
	await db.schema.createTable("_plugin_storage").addColumn("plugin_id", "text", (col) => col.notNull()).addColumn("collection", "text", (col) => col.notNull()).addColumn("id", "text", (col) => col.notNull()).addColumn("data", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("pk_plugin_storage", [
		"plugin_id",
		"collection",
		"id"
	]).execute();
	await db.schema.createIndex("idx_plugin_storage_list").on("_plugin_storage").columns([
		"plugin_id",
		"collection",
		"created_at"
	]).execute();
	await db.schema.createTable("_plugin_state").addColumn("plugin_id", "text", (col) => col.primaryKey()).addColumn("version", "text", (col) => col.notNull()).addColumn("status", "text", (col) => col.notNull().defaultTo("installed")).addColumn("installed_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("activated_at", "text").addColumn("deactivated_at", "text").addColumn("data", "text").execute();
	await db.schema.createTable("_plugin_indexes").addColumn("plugin_id", "text", (col) => col.notNull()).addColumn("collection", "text", (col) => col.notNull()).addColumn("index_name", "text", (col) => col.notNull()).addColumn("fields", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("pk_plugin_indexes", [
		"plugin_id",
		"collection",
		"index_name"
	]).execute();
}
async function down$86(db) {
	await db.schema.dropTable("_plugin_indexes").execute();
	await db.schema.dropTable("_plugin_state").execute();
	await db.schema.dropTable("_plugin_storage").execute();
}
var _005_menus_exports = /* @__PURE__ */ __exportAll({
	down: () => down$85,
	up: () => up$85
});
/**
* Navigation Menus migration
*
* Creates tables for admin-editable navigation menus.
* Menu items can reference content entries, taxonomy terms, or custom URLs.
*/
async function up$85(db) {
	await db.schema.createTable("_emdash_menus").addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createTable("_emdash_menu_items").addColumn("id", "text", (col) => col.primaryKey()).addColumn("menu_id", "text", (col) => col.notNull()).addColumn("parent_id", "text").addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0)).addColumn("type", "text", (col) => col.notNull()).addColumn("reference_collection", "text").addColumn("reference_id", "text").addColumn("custom_url", "text").addColumn("label", "text", (col) => col.notNull()).addColumn("title_attr", "text").addColumn("target", "text").addColumn("css_classes", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("menu_items_menu_fk", ["menu_id"], "_emdash_menus", ["id"], (cb) => cb.onDelete("cascade")).addForeignKeyConstraint("menu_items_parent_fk", ["parent_id"], "_emdash_menu_items", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_menu_items_menu").on("_emdash_menu_items").columns(["menu_id", "sort_order"]).execute();
	await db.schema.createIndex("idx_menu_items_parent").on("_emdash_menu_items").column("parent_id").execute();
}
async function down$85(db) {
	await db.schema.dropTable("_emdash_menu_items").execute();
	await db.schema.dropTable("_emdash_menus").execute();
}
var _006_taxonomy_defs_exports = /* @__PURE__ */ __exportAll({
	down: () => down$84,
	up: () => up$84
});
/**
* Taxonomy definitions migration
*
* Adds _emdash_taxonomy_defs table to store taxonomy definitions (category, tag, custom)
* and seeds default category and tag taxonomies.
*/
async function up$84(db) {
	await db.schema.createTable("_emdash_taxonomy_defs").addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("label_singular", "text").addColumn("hierarchical", "integer", (col) => col.defaultTo(0)).addColumn("collections", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.insertInto("_emdash_taxonomy_defs").values([{
		id: "taxdef_category",
		name: "category",
		label: "Categories",
		label_singular: "Category",
		hierarchical: 1,
		collections: JSON.stringify(["posts"])
	}, {
		id: "taxdef_tag",
		name: "tag",
		label: "Tags",
		label_singular: "Tag",
		hierarchical: 0,
		collections: JSON.stringify(["posts"])
	}]).execute();
}
async function down$84(db) {
	await db.schema.dropTable("_emdash_taxonomy_defs").execute();
}
var _007_widgets_exports = /* @__PURE__ */ __exportAll({
	down: () => down$83,
	up: () => up$83
});
async function up$83(db) {
	await db.schema.createTable("_emdash_widget_areas").addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("description", "text").addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
	await db.schema.createTable("_emdash_widgets").addColumn("id", "text", (col) => col.primaryKey()).addColumn("area_id", "text", (col) => col.notNull().references("_emdash_widget_areas.id").onDelete("cascade")).addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0)).addColumn("type", "text", (col) => col.notNull()).addColumn("title", "text").addColumn("content", "text").addColumn("menu_name", "text").addColumn("component_id", "text").addColumn("component_props", "text").addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
	await db.schema.createIndex("idx_widgets_area").on("_emdash_widgets").columns(["area_id", "sort_order"]).execute();
}
async function down$83(db) {
	await db.schema.dropTable("_emdash_widgets").execute();
	await db.schema.dropTable("_emdash_widget_areas").execute();
}
var _008_auth_exports = /* @__PURE__ */ __exportAll({
	down: () => down$82,
	up: () => up$82
});
/**
* Auth migration - passkey-first authentication
*
* Changes:
* - Removes password_hash from users (no passwords)
* - Adds role as integer (RBAC levels)
* - Adds email_verified, avatar_url, updated_at to users
* - Creates credentials table (passkeys)
* - Creates auth_tokens table (magic links, invites)
* - Creates oauth_accounts table (external provider links)
* - Creates allowed_domains table (self-signup)
*/
async function up$82(db) {
	await db.schema.createTable("users_new").addColumn("id", "text", (col) => col.primaryKey()).addColumn("email", "text", (col) => col.notNull().unique()).addColumn("name", "text").addColumn("avatar_url", "text").addColumn("role", "integer", (col) => col.notNull().defaultTo(10)).addColumn("email_verified", "integer", (col) => col.notNull().defaultTo(0)).addColumn("data", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await sql`
		INSERT INTO users_new (id, email, name, role, data, created_at, updated_at)
		SELECT
			id,
			email,
			name,
			CASE role
				WHEN 'admin' THEN 50
				WHEN 'editor' THEN 40
				WHEN 'author' THEN 30
				WHEN 'contributor' THEN 20
				ELSE 10
			END,
			data,
			created_at,
			${currentTimestampValue(db)}
		FROM users
	`.execute(db);
	await db.schema.dropTable("users").execute();
	await sql`ALTER TABLE users_new RENAME TO users`.execute(db);
	await db.schema.createIndex("idx_users_email").on("users").column("email").execute();
	await db.schema.createTable("credentials").addColumn("id", "text", (col) => col.primaryKey()).addColumn("user_id", "text", (col) => col.notNull()).addColumn("public_key", binaryType(db), (col) => col.notNull()).addColumn("counter", "integer", (col) => col.notNull().defaultTo(0)).addColumn("device_type", "text", (col) => col.notNull()).addColumn("backed_up", "integer", (col) => col.notNull().defaultTo(0)).addColumn("transports", "text").addColumn("name", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("last_used_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("credentials_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_credentials_user").on("credentials").column("user_id").execute();
	await db.schema.createTable("auth_tokens").addColumn("hash", "text", (col) => col.primaryKey()).addColumn("user_id", "text").addColumn("email", "text").addColumn("type", "text", (col) => col.notNull()).addColumn("role", "integer").addColumn("invited_by", "text").addColumn("expires_at", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("auth_tokens_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).addForeignKeyConstraint("auth_tokens_invited_by_fk", ["invited_by"], "users", ["id"], (cb) => cb.onDelete("set null")).execute();
	await db.schema.createIndex("idx_auth_tokens_email").on("auth_tokens").column("email").execute();
	await db.schema.createTable("oauth_accounts").addColumn("provider", "text", (col) => col.notNull()).addColumn("provider_account_id", "text", (col) => col.notNull()).addColumn("user_id", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("oauth_accounts_pk", ["provider", "provider_account_id"]).addForeignKeyConstraint("oauth_accounts_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_oauth_accounts_user").on("oauth_accounts").column("user_id").execute();
	await db.schema.createTable("allowed_domains").addColumn("domain", "text", (col) => col.primaryKey()).addColumn("default_role", "integer", (col) => col.notNull().defaultTo(20)).addColumn("enabled", "integer", (col) => col.notNull().defaultTo(1)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createTable("auth_challenges").addColumn("challenge", "text", (col) => col.primaryKey()).addColumn("type", "text", (col) => col.notNull()).addColumn("user_id", "text").addColumn("data", "text").addColumn("expires_at", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_auth_challenges_expires").on("auth_challenges").column("expires_at").execute();
}
async function down$82(db) {
	await db.schema.dropTable("auth_challenges").execute();
	await db.schema.dropTable("allowed_domains").execute();
	await db.schema.dropTable("oauth_accounts").execute();
	await db.schema.dropTable("auth_tokens").execute();
	await db.schema.dropTable("credentials").execute();
	await db.schema.createTable("users_old").addColumn("id", "text", (col) => col.primaryKey()).addColumn("email", "text", (col) => col.notNull().unique()).addColumn("password_hash", "text", (col) => col.notNull()).addColumn("name", "text").addColumn("role", "text", (col) => col.defaultTo("subscriber")).addColumn("avatar_id", "text").addColumn("data", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await sql`
		INSERT INTO users_old (id, email, password_hash, name, role, data, created_at)
		SELECT
			id,
			email,
			'', -- No way to restore password
			name,
			CASE role
				WHEN 50 THEN 'admin'
				WHEN 40 THEN 'editor'
				WHEN 30 THEN 'author'
				WHEN 20 THEN 'contributor'
				ELSE 'subscriber'
			END,
			data,
			created_at
		FROM users
	`.execute(db);
	await db.schema.dropTable("users").execute();
	await sql`ALTER TABLE users_old RENAME TO users`.execute(db);
	await db.schema.createIndex("idx_users_email").on("users").column("email").execute();
}
var _009_user_disabled_exports = /* @__PURE__ */ __exportAll({
	down: () => down$81,
	up: () => up$81
});
/**
* User disabled column - for soft-disabling users
*
* Changes:
* - Adds disabled column to users table (INTEGER, default 0)
* - Disabled users cannot log in
*/
async function up$81(db) {
	await sql`ALTER TABLE users ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0`.execute(db);
	await db.schema.createIndex("idx_users_disabled").on("users").column("disabled").execute();
}
async function down$81(db) {
	await db.schema.dropIndex("idx_users_disabled").execute();
}
var _011_sections_exports = /* @__PURE__ */ __exportAll({
	down: () => down$80,
	up: () => up$80
});
/**
* Migration: Add sections tables and performance indexes
*
* Sections are reusable content blocks that can be inserted into any Portable Text field.
* They provide a library of pre-built page sections (heroes, CTAs, testimonials, etc.)
* that content authors can browse and insert with a single click.
*/
async function up$80(db) {
	await db.schema.createTable("_emdash_section_categories").addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("sort_order", "integer", (col) => col.defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
	await db.schema.createTable("_emdash_sections").addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("title", "text", (col) => col.notNull()).addColumn("description", "text").addColumn("category_id", "text", (col) => col.references("_emdash_section_categories.id").onDelete("set null")).addColumn("keywords", "text").addColumn("content", "text", (col) => col.notNull()).addColumn("preview_media_id", "text").addColumn("source", "text", (col) => col.notNull().defaultTo("user")).addColumn("theme_id", "text").addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).addColumn("updated_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
	await db.schema.createIndex("idx_sections_category").on("_emdash_sections").columns(["category_id"]).execute();
	await db.schema.createIndex("idx_sections_source").on("_emdash_sections").columns(["source"]).execute();
}
async function down$80(db) {
	await db.schema.dropIndex("idx_sections_source").execute();
	await db.schema.dropIndex("idx_sections_category").execute();
	await db.schema.dropTable("_emdash_sections").execute();
	await db.schema.dropTable("_emdash_section_categories").execute();
}
var _012_search_exports = /* @__PURE__ */ __exportAll({
	down: () => down$79,
	up: () => up$79
});
/**
* Migration: Search Support
*
* Adds search configuration to collections and searchable flag to fields.
* FTS5 tables are created dynamically when search is enabled for a collection.
*/
async function up$79(db) {
	await db.schema.alterTable("_emdash_collections").addColumn("search_config", "text").execute();
	await db.schema.alterTable("_emdash_fields").addColumn("searchable", "integer", (col) => col.defaultTo(0)).execute();
}
async function down$79(db) {
	await db.schema.alterTable("_emdash_fields").dropColumn("searchable").execute();
	await db.schema.alterTable("_emdash_collections").dropColumn("search_config").execute();
}
var _013_scheduled_publishing_exports = /* @__PURE__ */ __exportAll({
	down: () => down$78,
	up: () => up$78
});
/**
* Migration: Add scheduled publishing support
*
* Adds scheduled_at column to all ec_* content tables.
* When scheduled_at is set and status is 'scheduled', the content
* will be auto-published when the scheduled time is reached.
*/
async function up$78(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			ALTER TABLE ${sql.ref(table.name)} 
			ADD COLUMN scheduled_at TEXT
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)} 
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL AND status = 'scheduled'
		`.execute(db);
	}
}
async function down$78(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(table.name)} 
			DROP COLUMN scheduled_at
		`.execute(db);
	}
}
var _014_draft_revisions_exports = /* @__PURE__ */ __exportAll({
	down: () => down$77,
	up: () => up$77
});
async function up$77(db) {
	const tables = await db.selectFrom("_emdash_collections").select("slug").execute();
	for (const row of tables) {
		const tableName = `ec_${row.slug}`;
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			ADD COLUMN live_revision_id TEXT REFERENCES revisions(id)
		`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			ADD COLUMN draft_revision_id TEXT REFERENCES revisions(id)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${row.slug}_live_revision`)}
			ON ${sql.ref(tableName)} (live_revision_id)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${row.slug}_draft_revision`)}
			ON ${sql.ref(tableName)} (draft_revision_id)
		`.execute(db);
	}
}
async function down$77(db) {
	const tables = await db.selectFrom("_emdash_collections").select("slug").execute();
	for (const row of tables) {
		const tableName = `ec_${row.slug}`;
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${row.slug}_draft_revision`)}
		`.execute(db);
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${row.slug}_live_revision`)}
		`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN draft_revision_id
		`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN live_revision_id
		`.execute(db);
	}
}
var _015_indexes_exports = /* @__PURE__ */ __exportAll({
	down: () => down$76,
	up: () => up$76
});
/**
* Add performance indexes for common query patterns.
*
* Covers:
* 1. Media table: mime_type, filename, created_at
* 2. content_taxonomies: reverse lookup by taxonomy_id
* 3. taxonomies: parent_id FK
* 4. audit_logs: compound (resource_type, resource_id)
* 5. Retroactive author_id + updated_at on existing ec_* content tables
*    (new tables get these from createContentTable() in registry.ts)
*/
async function up$76(db) {
	await db.schema.createIndex("idx_media_mime_type").on("media").column("mime_type").execute();
	await db.schema.createIndex("idx_media_filename").on("media").column("filename").execute();
	await db.schema.createIndex("idx_media_created_at").on("media").column("created_at").execute();
	await db.schema.createIndex("idx_content_taxonomies_term").on("content_taxonomies").column("taxonomy_id").execute();
	await db.schema.createIndex("idx_taxonomies_parent").on("taxonomies").column("parent_id").execute();
	await db.schema.createIndex("idx_audit_resource").on("audit_logs").columns(["resource_type", "resource_id"]).execute();
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_author`)} 
			ON ${sql.ref(table.name)} (author_id)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_updated`)} 
			ON ${sql.ref(table.name)} (updated_at)
		`.execute(db);
	}
}
async function down$76(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_updated`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_author`)}`.execute(db);
	}
	await db.schema.dropIndex("idx_audit_resource").execute();
	await db.schema.dropIndex("idx_taxonomies_parent").execute();
	await db.schema.dropIndex("idx_content_taxonomies_term").execute();
	await db.schema.dropIndex("idx_media_created_at").execute();
	await db.schema.dropIndex("idx_media_filename").execute();
	await db.schema.dropIndex("idx_media_mime_type").execute();
}
var _016_api_tokens_exports = /* @__PURE__ */ __exportAll({
	down: () => down$75,
	up: () => up$75
});
/**
* API token tables for programmatic access.
*
* Three tables:
* 1. _emdash_api_tokens — Personal Access Tokens (ec_pat_...)
* 2. _emdash_oauth_tokens — OAuth access/refresh tokens (ec_oat_/ec_ort_...)
* 3. _emdash_device_codes — OAuth Device Flow state (RFC 8628)
*
* Every CREATE is guarded with `.ifNotExists()` so the migration is safe to
* re-run against a partially-applied schema. See #954 for the failure mode:
* if `up()` crashes mid-way (D1 subrequest limit, isolate cancellation,
* transient connection error), the migration record never gets inserted
* into `_emdash_migrations`, and the next request retries `up()` from the
* top. Without these guards, the retry crashed with `table ... already
* exists` and blocked every subsequent boot of the Worker.
*/
async function up$75(db) {
	await db.schema.createTable("_emdash_api_tokens").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull()).addColumn("token_hash", "text", (col) => col.notNull().unique()).addColumn("prefix", "text", (col) => col.notNull()).addColumn("user_id", "text", (col) => col.notNull()).addColumn("scopes", "text", (col) => col.notNull()).addColumn("expires_at", "text").addColumn("last_used_at", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("api_tokens_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_api_tokens_token_hash").ifNotExists().on("_emdash_api_tokens").column("token_hash").execute();
	await db.schema.createIndex("idx_api_tokens_user_id").ifNotExists().on("_emdash_api_tokens").column("user_id").execute();
	await db.schema.createTable("_emdash_oauth_tokens").ifNotExists().addColumn("token_hash", "text", (col) => col.primaryKey()).addColumn("token_type", "text", (col) => col.notNull()).addColumn("user_id", "text", (col) => col.notNull()).addColumn("scopes", "text", (col) => col.notNull()).addColumn("client_type", "text", (col) => col.notNull().defaultTo("cli")).addColumn("expires_at", "text", (col) => col.notNull()).addColumn("refresh_token_hash", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("oauth_tokens_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_oauth_tokens_user_id").ifNotExists().on("_emdash_oauth_tokens").column("user_id").execute();
	await db.schema.createIndex("idx_oauth_tokens_expires").ifNotExists().on("_emdash_oauth_tokens").column("expires_at").execute();
	await db.schema.createTable("_emdash_device_codes").ifNotExists().addColumn("device_code", "text", (col) => col.primaryKey()).addColumn("user_code", "text", (col) => col.notNull().unique()).addColumn("scopes", "text", (col) => col.notNull()).addColumn("user_id", "text").addColumn("status", "text", (col) => col.notNull().defaultTo("pending")).addColumn("expires_at", "text", (col) => col.notNull()).addColumn("interval", "integer", (col) => col.notNull().defaultTo(5)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
}
async function down$75(db) {
	await db.schema.dropTable("_emdash_device_codes").ifExists().execute();
	await db.schema.dropTable("_emdash_oauth_tokens").ifExists().execute();
	await db.schema.dropTable("_emdash_api_tokens").ifExists().execute();
}
var _017_authorization_codes_exports = /* @__PURE__ */ __exportAll({
	down: () => down$74,
	up: () => up$74
});
/**
* Authorization codes for OAuth 2.1 Authorization Code + PKCE flow.
*
* Used by MCP clients (Claude Desktop, VS Code, etc.) to authenticate
* via the standard OAuth authorization code grant.
*
* Also adds client_id tracking to oauth_tokens for per-client revocation.
*
* Every statement is guarded so the migration can restart after any one of
* them has committed. D1 commits each DDL statement on its own and the
* migrator records the migration only once `up` returns, so an interrupted
* run leaves the table created and the migration pending; an unguarded
* `CREATE TABLE` then fails on every retry and the database never finishes
* migrating.
*/
async function up$74(db) {
	await db.schema.createTable("_emdash_authorization_codes").ifNotExists().addColumn("code_hash", "text", (col) => col.primaryKey()).addColumn("client_id", "text", (col) => col.notNull()).addColumn("redirect_uri", "text", (col) => col.notNull()).addColumn("user_id", "text", (col) => col.notNull()).addColumn("scopes", "text", (col) => col.notNull()).addColumn("code_challenge", "text", (col) => col.notNull()).addColumn("code_challenge_method", "text", (col) => col.notNull().defaultTo("S256")).addColumn("resource", "text").addColumn("expires_at", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addForeignKeyConstraint("auth_codes_user_fk", ["user_id"], "users", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_auth_codes_expires").ifNotExists().on("_emdash_authorization_codes").column("expires_at").execute();
	if (!await columnExists(db, "_emdash_oauth_tokens", "client_id")) await db.schema.alterTable("_emdash_oauth_tokens").addColumn("client_id", "text").execute();
}
async function down$74(db) {
	await db.schema.dropTable("_emdash_authorization_codes").ifExists().execute();
}
var _018_seo_exports = /* @__PURE__ */ __exportAll({
	down: () => down$73,
	up: () => up$73
});
/**
* Migration: SEO support
*
* Creates:
* - `_emdash_seo` table: per-content SEO metadata (separate from content tables)
* - `has_seo` column on `_emdash_collections`: opt-in flag per collection
*
* SEO is not a universal concern — only collections representing web pages
* need it. The `has_seo` flag controls whether the admin shows SEO fields
* and whether the collection's content appears in sitemaps.
*/
async function up$73(db) {
	await db.schema.createTable("_emdash_seo").addColumn("collection", "text", (col) => col.notNull()).addColumn("content_id", "text", (col) => col.notNull()).addColumn("seo_title", "text").addColumn("seo_description", "text").addColumn("seo_image", "text").addColumn("seo_canonical", "text").addColumn("seo_no_index", "integer", (col) => col.notNull().defaultTo(0)).addColumn("created_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("_emdash_seo_pk", ["collection", "content_id"]).execute();
	await sql`
		CREATE INDEX idx_emdash_seo_collection
		ON _emdash_seo (collection)
	`.execute(db);
	await sql`
		ALTER TABLE _emdash_collections
		ADD COLUMN has_seo INTEGER NOT NULL DEFAULT 0
	`.execute(db);
}
async function down$73(db) {
	await sql`DROP TABLE IF EXISTS _emdash_seo`.execute(db);
	await sql`
		ALTER TABLE _emdash_collections
		DROP COLUMN has_seo
	`.execute(db);
}
var _019_i18n_exports = /* @__PURE__ */ __exportAll({
	down: () => down$72,
	up: () => up$72
});
/**
* Quote an identifier for use in raw SQL. Escapes embedded double-quotes
* per SQL standard (double them). The name should first pass
* validateIdentifier() or validateTableName() for defense-in-depth.
*/
var DOUBLE_QUOTE_RE = /"/g;
function quoteIdent(name) {
	return `"${name.replace(DOUBLE_QUOTE_RE, "\"\"")}"`;
}
/** Suffix added to tmp tables during i18n migration rebuild. */
var I18N_TMP_SUFFIX = /_i18n_tmp$/;
/** Table names from sqlite_master are ec_{slug} — validate the pattern. */
var TABLE_NAME_PATTERN = /^ec_[a-z][a-z0-9_]*$/;
function validateTableName(name) {
	if (!TABLE_NAME_PATTERN.test(name)) throw new Error(`Invalid content table name: "${name}"`);
}
/** SQLite column types produced by EmDash's schema registry. */
var ALLOWED_COLUMN_TYPES = /* @__PURE__ */ new Set([
	"TEXT",
	"INTEGER",
	"REAL",
	"BLOB",
	"JSON",
	"NUMERIC",
	""
]);
function validateColumnType(type, colName) {
	if (!ALLOWED_COLUMN_TYPES.has(type.toUpperCase())) throw new Error(`Unexpected column type "${type}" for column "${colName}"`);
}
/**
* Validate that a default value expression from PRAGMA table_info is safe
* to interpolate into DDL. Allows: string literals, numeric literals,
* NULL, and known function calls like datetime('now').
*
* Note: PRAGMA table_info strips the outer parens from expression defaults,
* so `DEFAULT (datetime('now'))` is reported as `datetime('now')`.
* We accept both forms and re-wrap in parens via normalizeDdlDefault().
*/
var SAFE_DEFAULT_PATTERN = /^(?:'[^']*'|NULL|-?\d+(?:\.\d+)?|\(?datetime\('now'\)\)?|\(?json\('[^']*'\)\)?|0|1)$/i;
function validateDefaultValue(value, colName) {
	if (!SAFE_DEFAULT_PATTERN.test(value)) throw new Error(`Unexpected default value "${value}" for column "${colName}"`);
}
/**
* Normalize a PRAGMA table_info default value for use in DDL.
* Function-call defaults (e.g. `datetime('now')`) must be wrapped in parens
* to form valid expression defaults: `DEFAULT (datetime('now'))`.
* PRAGMA strips the outer parens, so we re-add them here.
*/
var FUNCTION_DEFAULT_PATTERN = /^(?:datetime|json)\(/i;
function normalizeDdlDefault(value) {
	if (value.startsWith("(")) return value;
	if (FUNCTION_DEFAULT_PATTERN.test(value)) return `(${value})`;
	return value;
}
/**
* Validate that a CREATE INDEX statement from sqlite_master is safe to replay.
* Must start with CREATE [UNIQUE] INDEX and not contain suspicious patterns.
*/
var CREATE_INDEX_PATTERN = /^CREATE\s+(UNIQUE\s+)?INDEX\s+/i;
function validateCreateIndexSql(sqlStr, idxName) {
	if (!CREATE_INDEX_PATTERN.test(sqlStr)) throw new Error(`Unexpected index SQL for "${idxName}": does not match CREATE INDEX pattern`);
	if (sqlStr.includes(";")) throw new Error(`Unexpected index SQL for "${idxName}": contains semicolon`);
}
/**
* PostgreSQL path: ALTER TABLE supports ADD COLUMN and DROP CONSTRAINT directly.
* No table rebuild needed.
*/
async function upPostgres$1(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const t of tableNames) {
		validateTableName(t);
		if ((await sql`
			SELECT EXISTS(
				SELECT 1 FROM information_schema.columns
				WHERE table_schema = current_schema() AND table_name = ${t} AND column_name = 'locale'
			) as exists
		`.execute(db)).rows[0]?.exists === true) continue;
		await sql`ALTER TABLE ${sql.ref(t)} ADD COLUMN locale TEXT NOT NULL DEFAULT 'en'`.execute(db);
		await sql`ALTER TABLE ${sql.ref(t)} ADD COLUMN translation_group TEXT`.execute(db);
		const constraints = await sql`
			SELECT conname FROM pg_constraint
			WHERE conrelid = ${t}::regclass
			AND contype = 'u'
			AND array_length(conkey, 1) = 1
			AND conkey[1] = (
				SELECT attnum FROM pg_attribute
				WHERE attrelid = ${t}::regclass AND attname = 'slug'
			)
		`.execute(db);
		for (const c of constraints.rows) await sql`ALTER TABLE ${sql.ref(t)} DROP CONSTRAINT ${sql.ref(c.conname)}`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(t)}
			ADD CONSTRAINT ${sql.ref(`${t}_slug_locale_unique`)} UNIQUE (slug, locale)
		`.execute(db);
		await sql`UPDATE ${sql.ref(t)} SET translation_group = id`.execute(db);
		await sql`CREATE INDEX ${sql.ref(`idx_${t}_locale`)} ON ${sql.ref(t)} (locale)`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${t}_translation_group`)}
			ON ${sql.ref(t)} (translation_group)
		`.execute(db);
	}
	if ((await sql`
		SELECT EXISTS(
			SELECT 1 FROM information_schema.columns
			WHERE table_schema = current_schema() AND table_name = '_emdash_fields' AND column_name = 'translatable'
		) as exists
	`.execute(db)).rows[0]?.exists !== true) await sql`
			ALTER TABLE _emdash_fields
			ADD COLUMN translatable INTEGER NOT NULL DEFAULT 1
		`.execute(db);
}
async function up$72(db) {
	if (!isSqlite(db)) return upPostgres$1(db);
	const orphanedTmps = await listTablesLike(db, "ec_%_i18n_tmp");
	for (const tmpName of orphanedTmps) {
		validateTableName(tmpName.replace(I18N_TMP_SUFFIX, ""));
		await sql`DROP TABLE IF EXISTS ${sql.ref(tmpName)}`.execute(db);
	}
	const tables = { rows: (await listTablesLike(db, "ec_%")).map((name) => ({ name })) };
	for (const table of tables.rows) {
		const t = table.name;
		validateTableName(t);
		const tmp = `${t}_i18n_tmp`;
		{
			const trx = db;
			const columns = (await sql`
				PRAGMA table_info(${sql.ref(t)})
			`.execute(trx)).rows;
			if (columns.some((col) => col.name === "locale")) continue;
			const idxResult = await sql`
				PRAGMA index_list(${sql.ref(t)})
			`.execute(trx);
			const indexDefs = [];
			for (const idx of idxResult.rows) {
				if (idx.origin === "pk" || idx.name.startsWith("sqlite_autoindex_")) continue;
				const idxColResult = await sql`
					PRAGMA index_info(${sql.ref(idx.name)})
				`.execute(trx);
				indexDefs.push({
					name: idx.name,
					unique: idx.unique === 1,
					columns: idxColResult.rows.map((c) => c.name),
					partial: idx.partial
				});
			}
			const partialSqls = /* @__PURE__ */ new Map();
			for (const idx of indexDefs) if (idx.partial) {
				const createResult = await sql`
						SELECT sql FROM sqlite_master 
						WHERE type = 'index' AND name = ${idx.name}
					`.execute(trx);
				if (createResult.rows[0]?.sql) partialSqls.set(idx.name, createResult.rows[0].sql);
			}
			for (const col of columns) validateIdentifier(col.name, "column name");
			const colDefs = [];
			const colNames = [];
			for (const col of columns) {
				validateColumnType(col.type || "TEXT", col.name);
				colNames.push(quoteIdent(col.name));
				let def = `${quoteIdent(col.name)} ${col.type || "TEXT"}`;
				if (col.pk) def += " PRIMARY KEY";
				else if (col.name === "slug") {} else if (col.notnull) def += " NOT NULL";
				if (col.dflt_value !== null) {
					validateDefaultValue(col.dflt_value, col.name);
					def += ` DEFAULT ${normalizeDdlDefault(col.dflt_value)}`;
				}
				colDefs.push(def);
			}
			colDefs.push("\"locale\" TEXT NOT NULL DEFAULT 'en'");
			colDefs.push("\"translation_group\" TEXT");
			colDefs.push("UNIQUE(\"slug\", \"locale\")");
			const createColsSql = colDefs.join(",\n				");
			const selectColsSql = colNames.join(", ");
			for (const idx of indexDefs) await sql`DROP INDEX IF EXISTS ${sql.ref(idx.name)}`.execute(trx);
			await sql.raw(`CREATE TABLE ${quoteIdent(tmp)} (\n\t\t\t\t${createColsSql}\n\t\t\t)`).execute(trx);
			await sql.raw(`INSERT INTO ${quoteIdent(tmp)} (${selectColsSql}, "locale", "translation_group")\n\t\t\t SELECT ${selectColsSql}, 'en', "id" FROM ${quoteIdent(t)}`).execute(trx);
			await sql`DROP TABLE ${sql.ref(t)}`.execute(trx);
			await sql.raw(`ALTER TABLE ${quoteIdent(tmp)} RENAME TO ${quoteIdent(t)}`).execute(trx);
			for (const idx of indexDefs) {
				if (idx.name === `idx_${t}_slug`) continue;
				if (idx.partial && partialSqls.has(idx.name)) {
					const idxSql = partialSqls.get(idx.name);
					validateCreateIndexSql(idxSql, idx.name);
					await sql.raw(idxSql).execute(trx);
				} else {
					for (const c of idx.columns) validateIdentifier(c, "index column name");
					const cols = idx.columns.map((c) => quoteIdent(c)).join(", ");
					const unique = idx.unique ? "UNIQUE " : "";
					await sql.raw(`CREATE ${unique}INDEX ${quoteIdent(idx.name)} ON ${quoteIdent(t)} (${cols})`).execute(trx);
				}
			}
			await sql`
				CREATE INDEX ${sql.ref(`idx_${t}_slug`)} 
				ON ${sql.ref(t)} (slug)
			`.execute(trx);
			await sql`
				CREATE INDEX ${sql.ref(`idx_${t}_locale`)} 
				ON ${sql.ref(t)} (locale)
			`.execute(trx);
			await sql`
				CREATE INDEX ${sql.ref(`idx_${t}_translation_group`)} 
				ON ${sql.ref(t)} (translation_group)
			`.execute(trx);
		}
	}
	if (!(await sql`
		PRAGMA table_info(_emdash_fields)
	`.execute(db)).rows.some((col) => col.name === "translatable")) await sql`
			ALTER TABLE _emdash_fields 
			ADD COLUMN translatable INTEGER NOT NULL DEFAULT 1
		`.execute(db);
}
/**
* PostgreSQL down path: straightforward ALTER TABLE operations.
*/
async function downPostgres(db) {
	await sql`ALTER TABLE _emdash_fields DROP COLUMN translatable`.execute(db);
	const tableNames = await listTablesLike(db, "ec_%");
	for (const t of tableNames) {
		validateTableName(t);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${t}_locale`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${t}_translation_group`)}`.execute(db);
		await sql`ALTER TABLE ${sql.ref(t)} DROP CONSTRAINT IF EXISTS ${sql.ref(`${t}_slug_locale_unique`)}`.execute(db);
		await sql`ALTER TABLE ${sql.ref(t)} ADD CONSTRAINT ${sql.ref(`${t}_slug_unique`)} UNIQUE (slug)`.execute(db);
		await sql`ALTER TABLE ${sql.ref(t)} DROP COLUMN locale`.execute(db);
		await sql`ALTER TABLE ${sql.ref(t)} DROP COLUMN translation_group`.execute(db);
	}
}
async function down$72(db) {
	if (!isSqlite(db)) return downPostgres(db);
	await sql`
		ALTER TABLE _emdash_fields
		DROP COLUMN translatable
	`.execute(db);
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const t = tableName;
		validateTableName(t);
		const tmp = `${t}_i18n_tmp`;
		{
			const trx = db;
			const columns = (await sql`
				PRAGMA table_info(${sql.ref(t)})
			`.execute(trx)).rows;
			const idxResult = await sql`
				PRAGMA index_list(${sql.ref(t)})
			`.execute(trx);
			const indexDefs = [];
			for (const idx of idxResult.rows) {
				if (idx.origin === "pk" || idx.name.startsWith("sqlite_autoindex_")) continue;
				const idxColResult = await sql`
					PRAGMA index_info(${sql.ref(idx.name)})
				`.execute(trx);
				indexDefs.push({
					name: idx.name,
					unique: idx.unique === 1,
					columns: idxColResult.rows.map((c) => c.name),
					partial: idx.partial
				});
			}
			const partialSqls = /* @__PURE__ */ new Map();
			for (const idx of indexDefs) if (idx.partial) {
				const createResult = await sql`
						SELECT sql FROM sqlite_master 
						WHERE type = 'index' AND name = ${idx.name}
					`.execute(trx);
				if (createResult.rows[0]?.sql) partialSqls.set(idx.name, createResult.rows[0].sql);
			}
			for (const col of columns) {
				if (col.name === "locale" || col.name === "translation_group") continue;
				validateIdentifier(col.name, "column name");
			}
			const colDefs = [];
			const colNames = [];
			for (const col of columns) {
				if (col.name === "locale" || col.name === "translation_group") continue;
				validateColumnType(col.type || "TEXT", col.name);
				colNames.push(quoteIdent(col.name));
				let def = `${quoteIdent(col.name)} ${col.type || "TEXT"}`;
				if (col.pk) def += " PRIMARY KEY";
				else if (col.name === "slug") def += " UNIQUE";
				else if (col.notnull) def += " NOT NULL";
				if (col.dflt_value !== null) {
					validateDefaultValue(col.dflt_value, col.name);
					def += ` DEFAULT ${normalizeDdlDefault(col.dflt_value)}`;
				}
				colDefs.push(def);
			}
			const createColsSql = colDefs.join(",\n				");
			const selectColsSql = colNames.join(", ");
			for (const idx of indexDefs) await sql`DROP INDEX IF EXISTS ${sql.ref(idx.name)}`.execute(trx);
			await sql.raw(`CREATE TABLE ${quoteIdent(tmp)} (\n\t\t\t\t${createColsSql}\n\t\t\t)`).execute(trx);
			await sql.raw(`INSERT OR IGNORE INTO ${quoteIdent(tmp)} (${selectColsSql})
			 SELECT ${selectColsSql} FROM ${quoteIdent(t)}
			 WHERE "locale" = 'en'`).execute(trx);
			await sql.raw(`INSERT OR IGNORE INTO ${quoteIdent(tmp)} (${selectColsSql})
			 SELECT ${selectColsSql} FROM ${quoteIdent(t)}
			 WHERE "id" NOT IN (SELECT "id" FROM ${quoteIdent(tmp)})
			 AND "id" IN (
				SELECT "id" FROM ${quoteIdent(t)} AS t2
				WHERE t2."translation_group" IS NOT NULL
				AND t2."locale" = (
					SELECT MIN(t3."locale") FROM ${quoteIdent(t)} AS t3
					WHERE t3."translation_group" = t2."translation_group"
				)
			 )`).execute(trx);
			await sql.raw(`INSERT OR IGNORE INTO ${quoteIdent(tmp)} (${selectColsSql})
			 SELECT ${selectColsSql} FROM ${quoteIdent(t)}
			 WHERE "id" NOT IN (SELECT "id" FROM ${quoteIdent(tmp)})
			 AND "translation_group" IS NULL`).execute(trx);
			await sql`DROP TABLE ${sql.ref(t)}`.execute(trx);
			await sql.raw(`ALTER TABLE ${quoteIdent(tmp)} RENAME TO ${quoteIdent(t)}`).execute(trx);
			for (const idx of indexDefs) {
				if (idx.name === `idx_${t}_locale`) continue;
				if (idx.name === `idx_${t}_translation_group`) continue;
				if (idx.partial && partialSqls.has(idx.name)) {
					const idxSql = partialSqls.get(idx.name);
					validateCreateIndexSql(idxSql, idx.name);
					await sql.raw(idxSql).execute(trx);
				} else {
					const cols = idx.columns.filter((c) => c !== "locale" && c !== "translation_group");
					if (cols.length === 0) continue;
					for (const c of cols) validateIdentifier(c, "index column name");
					const colsSql = cols.map((c) => quoteIdent(c)).join(", ");
					const unique = idx.unique ? "UNIQUE " : "";
					await sql.raw(`CREATE ${unique}INDEX ${quoteIdent(idx.name)} ON ${quoteIdent(t)} (${colsSql})`).execute(trx);
				}
			}
		}
	}
}
var _020_collection_url_pattern_exports = /* @__PURE__ */ __exportAll({
	down: () => down$71,
	up: () => up$71
});
/**
* Migration: URL pattern for collections
*
* Adds `url_pattern` column to `_emdash_collections` so each collection
* can declare its own URL structure (e.g. "/{slug}" for pages, "/blog/{slug}"
* for posts). Used for menu URL resolution, sitemaps, and path-based lookups.
*/
async function up$71(db) {
	await sql`
		ALTER TABLE _emdash_collections
		ADD COLUMN url_pattern TEXT
	`.execute(db);
}
async function down$71(db) {
	await sql`
		ALTER TABLE _emdash_collections
		DROP COLUMN url_pattern
	`.execute(db);
}
var _021_remove_section_categories_exports = /* @__PURE__ */ __exportAll({
	down: () => down$70,
	up: () => up$70
});
/**
* Migration: Remove section categories
*
* Section categories had a complete backend but no UI to create or manage them.
* Rather than building the missing UI for a feature with very little need at this stage,
* we're removing the feature entirely.
*/
async function up$70(db) {
	await db.schema.dropIndex("idx_sections_category").ifExists().execute();
	await db.schema.alterTable("_emdash_sections").dropColumn("category_id").execute();
	await db.schema.dropTable("_emdash_section_categories").execute();
}
async function down$70(db) {
	await db.schema.createTable("_emdash_section_categories").addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("sort_order", "integer", (col) => col.defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`)).execute();
	await db.schema.alterTable("_emdash_sections").addColumn("category_id", "text", (col) => col.references("_emdash_section_categories.id").onDelete("set null")).execute();
	await db.schema.createIndex("idx_sections_category").on("_emdash_sections").columns(["category_id"]).execute();
}
var _022_marketplace_plugin_state_exports = /* @__PURE__ */ __exportAll({
	down: () => down$69,
	up: () => up$69
});
/**
* Migration: Add marketplace fields to _plugin_state
*
* Adds `source` and `marketplace_version` columns to track
* whether a plugin was installed from config or marketplace,
* and which marketplace version is installed.
*/
async function up$69(db) {
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN source TEXT NOT NULL DEFAULT 'config'
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN marketplace_version TEXT
	`.execute(db);
	await sql`
		CREATE INDEX idx_plugin_state_source
		ON _plugin_state (source)
		WHERE source = 'marketplace'
	`.execute(db);
}
async function down$69(db) {
	await sql`
		DROP INDEX IF EXISTS idx_plugin_state_source
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN marketplace_version
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN source
	`.execute(db);
}
var _023_plugin_metadata_exports = /* @__PURE__ */ __exportAll({
	down: () => down$68,
	up: () => up$68
});
/**
* Migration: Add display metadata to _plugin_state
*
* Stores display_name and description for marketplace plugins
* so the admin UI can show meaningful info without re-fetching
* from the marketplace on every page load.
*/
async function up$68(db) {
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN display_name TEXT
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN description TEXT
	`.execute(db);
}
async function down$68(db) {
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN description
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN display_name
	`.execute(db);
}
var _024_media_placeholders_exports = /* @__PURE__ */ __exportAll({
	down: () => down$67,
	up: () => up$67
});
/**
* Migration: Add placeholder columns to media table
*
* Stores blurhash and dominant_color for LQIP (Low Quality Image Placeholder)
* support. Generated at upload time from image pixel data.
*/
async function up$67(db) {
	await sql`
		ALTER TABLE media
		ADD COLUMN blurhash TEXT
	`.execute(db);
	await sql`
		ALTER TABLE media
		ADD COLUMN dominant_color TEXT
	`.execute(db);
}
async function down$67(db) {
	await sql`
		ALTER TABLE media
		DROP COLUMN dominant_color
	`.execute(db);
	await sql`
		ALTER TABLE media
		DROP COLUMN blurhash
	`.execute(db);
}
var _025_oauth_clients_exports = /* @__PURE__ */ __exportAll({
	down: () => down$66,
	up: () => up$66
});
/**
* Migration: Create OAuth clients table
*
* Implements the oauth_clients registry so that the authorization endpoint
* can validate client_id and enforce a per-client redirect URI allowlist.
*
* Each client has a set of pre-registered redirect URIs (JSON array).
* The authorize endpoint rejects any redirect_uri not in the client's list.
*/
async function up$66(db) {
	await db.schema.createTable("_emdash_oauth_clients").addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull()).addColumn("redirect_uris", "text", (col) => col.notNull()).addColumn("scopes", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
}
async function down$66(db) {
	await db.schema.dropTable("_emdash_oauth_clients").execute();
}
var _026_cron_tasks_exports = /* @__PURE__ */ __exportAll({
	down: () => down$65,
	up: () => up$65
});
/**
* Migration: Create cron tasks table for plugin scheduled tasks.
*
* Each plugin can register cron tasks (recurring or one-shot) which are
* stored here and executed by the platform-specific scheduler.
*
* The `next_run_at` + `status` + `enabled` index drives the "find overdue
* tasks" query used by CronExecutor.tick().
*/
async function up$65(db) {
	await db.schema.createTable("_emdash_cron_tasks").addColumn("id", "text", (col) => col.primaryKey()).addColumn("plugin_id", "text", (col) => col.notNull()).addColumn("task_name", "text", (col) => col.notNull()).addColumn("schedule", "text", (col) => col.notNull()).addColumn("is_oneshot", "integer", (col) => col.notNull().defaultTo(0)).addColumn("data", "text").addColumn("next_run_at", "text", (col) => col.notNull()).addColumn("last_run_at", "text").addColumn("status", "text", (col) => col.notNull().defaultTo("idle")).addColumn("locked_at", "text").addColumn("enabled", "integer", (col) => col.notNull().defaultTo(1)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addUniqueConstraint("uq_cron_tasks_plugin_task", ["plugin_id", "task_name"]).execute();
	await db.schema.createIndex("idx_cron_tasks_due").on("_emdash_cron_tasks").columns([
		"enabled",
		"status",
		"next_run_at"
	]).execute();
	await db.schema.createIndex("idx_cron_tasks_plugin").on("_emdash_cron_tasks").column("plugin_id").execute();
}
async function down$65(db) {
	await db.schema.dropTable("_emdash_cron_tasks").execute();
}
var _027_comments_exports = /* @__PURE__ */ __exportAll({
	down: () => down$64,
	up: () => up$64
});
async function up$64(db) {
	await db.schema.createTable("_emdash_comments").addColumn("id", "text", (col) => col.primaryKey()).addColumn("collection", "text", (col) => col.notNull()).addColumn("content_id", "text", (col) => col.notNull()).addColumn("parent_id", "text", (col) => col.references("_emdash_comments.id").onDelete("cascade")).addColumn("author_name", "text", (col) => col.notNull()).addColumn("author_email", "text", (col) => col.notNull()).addColumn("author_url", "text").addColumn("author_user_id", "text", (col) => col.references("users.id").onDelete("set null")).addColumn("body", "text", (col) => col.notNull()).addColumn("status", "text", (col) => col.notNull().defaultTo("pending")).addColumn("ip_hash", "text").addColumn("user_agent", "text").addColumn("moderation_metadata", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_comments_content").on("_emdash_comments").columns([
		"collection",
		"content_id",
		"status"
	]).execute();
	await db.schema.createIndex("idx_comments_parent").on("_emdash_comments").column("parent_id").execute();
	await db.schema.createIndex("idx_comments_status").on("_emdash_comments").columns(["status", "created_at"]).execute();
	await db.schema.createIndex("idx_comments_author_email").on("_emdash_comments").column("author_email").execute();
	await db.schema.createIndex("idx_comments_author_user").on("_emdash_comments").column("author_user_id").execute();
	await db.schema.alterTable("_emdash_collections").addColumn("comments_enabled", "integer", (col) => col.defaultTo(0)).execute();
	await db.schema.alterTable("_emdash_collections").addColumn("comments_moderation", "text", (col) => col.defaultTo("first_time")).execute();
	await db.schema.alterTable("_emdash_collections").addColumn("comments_closed_after_days", "integer", (col) => col.defaultTo(90)).execute();
	await db.schema.alterTable("_emdash_collections").addColumn("comments_auto_approve_users", "integer", (col) => col.defaultTo(1)).execute();
}
async function down$64(db) {
	await db.schema.dropTable("_emdash_comments").execute();
}
var _028_drop_author_url_exports = /* @__PURE__ */ __exportAll({
	down: () => down$63,
	up: () => up$63
});
async function up$63(db) {
	await sql`ALTER TABLE _emdash_comments DROP COLUMN author_url`.execute(db);
}
async function down$63(db) {
	await db.schema.alterTable("_emdash_comments").addColumn("author_url", "text").execute();
}
var _029_redirects_exports = /* @__PURE__ */ __exportAll({
	down: () => down$62,
	up: () => up$62
});
async function up$62(db) {
	await db.schema.createTable("_emdash_redirects").addColumn("id", "text", (col) => col.primaryKey()).addColumn("source", "text", (col) => col.notNull()).addColumn("destination", "text", (col) => col.notNull()).addColumn("type", "integer", (col) => col.notNull().defaultTo(301)).addColumn("is_pattern", "integer", (col) => col.notNull().defaultTo(0)).addColumn("enabled", "integer", (col) => col.notNull().defaultTo(1)).addColumn("hits", "integer", (col) => col.notNull().defaultTo(0)).addColumn("last_hit_at", "text").addColumn("group_name", "text").addColumn("auto", "integer", (col) => col.notNull().defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_redirects_source").on("_emdash_redirects").column("source").execute();
	await db.schema.createIndex("idx_redirects_enabled").on("_emdash_redirects").column("enabled").execute();
	await db.schema.createIndex("idx_redirects_group").on("_emdash_redirects").column("group_name").execute();
	await db.schema.createTable("_emdash_404_log").addColumn("id", "text", (col) => col.primaryKey()).addColumn("path", "text", (col) => col.notNull()).addColumn("referrer", "text").addColumn("user_agent", "text").addColumn("ip", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_404_log_path").on("_emdash_404_log").column("path").execute();
	await db.schema.createIndex("idx_404_log_created").on("_emdash_404_log").column("created_at").execute();
}
async function down$62(db) {
	await db.schema.dropTable("_emdash_404_log").execute();
	await db.schema.dropTable("_emdash_redirects").execute();
}
var _030_widen_scheduled_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$61,
	up: () => up$61
});
/**
* Migration: Widen scheduled publishing index
*
* The original partial index (013) only covered status='scheduled'.
* Published posts can now have scheduled draft changes, so widen the
* index to cover all rows where scheduled_at IS NOT NULL.
*/
async function up$61(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)}
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(db);
	}
}
async function down$61(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)}
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL AND status = 'scheduled'
		`.execute(db);
	}
}
var _031_bylines_exports = /* @__PURE__ */ __exportAll({
	down: () => down$60,
	up: () => up$60
});
async function up$60(db) {
	await db.schema.createTable("_emdash_bylines").addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("display_name", "text", (col) => col.notNull()).addColumn("bio", "text").addColumn("avatar_media_id", "text", (col) => col.references("media.id").onDelete("set null")).addColumn("website_url", "text").addColumn("user_id", "text", (col) => col.references("users.id").onDelete("set null")).addColumn("is_guest", "integer", (col) => col.notNull().defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await sql`
		CREATE UNIQUE INDEX ${sql.ref("idx_bylines_user_id_unique")}
		ON ${sql.ref("_emdash_bylines")} (user_id)
		WHERE user_id IS NOT NULL
	`.execute(db);
	await db.schema.createIndex("idx_bylines_slug").on("_emdash_bylines").column("slug").execute();
	await db.schema.createIndex("idx_bylines_display_name").on("_emdash_bylines").column("display_name").execute();
	await db.schema.createTable("_emdash_content_bylines").addColumn("id", "text", (col) => col.primaryKey()).addColumn("collection_slug", "text", (col) => col.notNull()).addColumn("content_id", "text", (col) => col.notNull()).addColumn("byline_id", "text", (col) => col.notNull().references("_emdash_bylines.id").onDelete("cascade")).addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0)).addColumn("role_label", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addUniqueConstraint("content_bylines_unique", [
		"collection_slug",
		"content_id",
		"byline_id"
	]).execute();
	await db.schema.createIndex("idx_content_bylines_content").on("_emdash_content_bylines").columns([
		"collection_slug",
		"content_id",
		"sort_order"
	]).execute();
	await db.schema.createIndex("idx_content_bylines_byline").on("_emdash_content_bylines").column("byline_id").execute();
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			ADD COLUMN primary_byline_id TEXT
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${tableName}_primary_byline`)}
			ON ${sql.ref(tableName)} (primary_byline_id)
		`.execute(db);
	}
}
async function down$60(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_primary_byline`)}
		`.execute(db);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN primary_byline_id
		`.execute(db);
	}
	await db.schema.dropTable("_emdash_content_bylines").execute();
	await db.schema.dropTable("_emdash_bylines").execute();
}
var _032_rate_limits_exports = /* @__PURE__ */ __exportAll({
	down: () => down$59,
	up: () => up$59
});
/**
* Migration: Rate limits table + device code polling tracking.
*
* 1. Create _emdash_rate_limits for database-backed rate limiting
*    of unauthenticated endpoints (device code, magic link, passkey).
*
* 2. Add last_polled_at column to _emdash_device_codes for
*    RFC 8628 slow_down enforcement.
*/
async function up$59(db) {
	await db.schema.createTable("_emdash_rate_limits").addColumn("key", "text", (col) => col.notNull()).addColumn("window", "text", (col) => col.notNull()).addColumn("count", "integer", (col) => col.notNull().defaultTo(1)).addPrimaryKeyConstraint("pk_rate_limits", ["key", "window"]).execute();
	await db.schema.createIndex("idx_rate_limits_window").on("_emdash_rate_limits").column("window").execute();
	await db.schema.alterTable("_emdash_device_codes").addColumn("last_polled_at", "text").execute();
}
async function down$59(db) {
	await db.schema.dropTable("_emdash_rate_limits").execute();
	await db.schema.alterTable("_emdash_device_codes").dropColumn("last_polled_at").execute();
}
var _033_optimize_content_indexes_exports = /* @__PURE__ */ __exportAll({
	down: () => down$58,
	up: () => up$58
});
/**
* Migration: Optimize content table indexes for D1 performance
*
* Addresses GitHub issue #131: Full table scans causing massive D1 row reads.
*
* Changes:
* 1. Replaces single-column indexes with composite indexes on ec_* tables
* 2. Adds partial indexes for _emdash_comments status counting
*
* Impact: Reduces D1 row reads by 90%+ for admin panel operations.
*/
async function up$58(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_status`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_created`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_deleted`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_updated`)}`.execute(db);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table.name}_deleted_updated_id`)}
			ON ${sql.ref(table.name)} (deleted_at, updated_at DESC, id DESC)
		`.execute(db);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table.name}_deleted_status`)}
			ON ${sql.ref(table.name)} (deleted_at, status)
		`.execute(db);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table.name}_deleted_created_id`)}
			ON ${sql.ref(table.name)} (deleted_at, created_at DESC, id DESC)
		`.execute(db);
	}
	await sql`
		CREATE INDEX IF NOT EXISTS idx_comments_pending
		ON _emdash_comments (id)
		WHERE status = 'pending'
	`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS idx_comments_approved
		ON _emdash_comments (id)
		WHERE status = 'approved'
	`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS idx_comments_spam
		ON _emdash_comments (id)
		WHERE status = 'spam'
	`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS idx_comments_trash
		ON _emdash_comments (id)
		WHERE status = 'trash'
	`.execute(db);
}
async function down$58(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_deleted_updated_id`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_deleted_status`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_deleted_created_id`)}`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_status`)}
			ON ${sql.ref(table.name)} (status)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_created`)}
			ON ${sql.ref(table.name)} (created_at)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_deleted`)}
			ON ${sql.ref(table.name)} (deleted_at)
		`.execute(db);
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_updated`)}
			ON ${sql.ref(table.name)} (updated_at)
		`.execute(db);
	}
	await sql`DROP INDEX IF EXISTS idx_comments_pending`.execute(db);
	await sql`DROP INDEX IF EXISTS idx_comments_approved`.execute(db);
	await sql`DROP INDEX IF EXISTS idx_comments_spam`.execute(db);
	await sql`DROP INDEX IF EXISTS idx_comments_trash`.execute(db);
}
var _034_published_at_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$57,
	up: () => up$57
});
async function up$57(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table.name}_deleted_published_id`)}
			ON ${sql.ref(table.name)} (deleted_at, published_at DESC, id DESC)
		`.execute(db);
	}
}
async function down$57(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_deleted_published_id`)}`.execute(db);
	}
}
var _035_bounded_404_log_exports = /* @__PURE__ */ __exportAll({
	down: () => down$56,
	up: () => up$56
});
/**
* Migration: Bounded 404 logging
*
* Hardens `_emdash_404_log` against unauthenticated DoS. Previously every 404
* inserted a new row, so an attacker could grow the table without bound.
*
* Changes:
*   - Adds `hits` (default 1, NOT NULL)
*   - Adds `last_seen_at` (nullable; SQLite can't add NOT NULL with a
*     non-constant default to a populated table, so the column is nullable
*     at the schema level and backfilled from `created_at` for existing rows;
*     new inserts via `log404` always set it)
*   - Deduplicates existing rows by path, keeping the most recent row per
*     path and summing hits
*   - Adds a UNIQUE index on `path` so upsert semantics work
*/
async function up$56(db) {
	if (!await columnExists(db, "_emdash_404_log", "hits")) await db.schema.alterTable("_emdash_404_log").addColumn("hits", "integer", (col) => col.notNull().defaultTo(1)).execute();
	if (!await columnExists(db, "_emdash_404_log", "last_seen_at")) await db.schema.alterTable("_emdash_404_log").addColumn("last_seen_at", "text").execute();
	await sql`
		UPDATE _emdash_404_log
		SET last_seen_at = created_at
		WHERE last_seen_at IS NULL
	`.execute(db);
	await sql`
		UPDATE _emdash_404_log
		SET
			hits = agg.path_count,
			last_seen_at = agg.latest_created_at
		FROM (
			SELECT path, COUNT(*) AS path_count, MAX(created_at) AS latest_created_at
			FROM _emdash_404_log
			GROUP BY path
			HAVING COUNT(*) > 1
		) AS agg
		WHERE _emdash_404_log.path = agg.path
	`.execute(db);
	await sql`
		DELETE FROM _emdash_404_log
		WHERE id IN (
			SELECT id FROM (
				SELECT
					id,
					ROW_NUMBER() OVER (
						PARTITION BY path
						ORDER BY created_at DESC, id DESC
					) AS rn
				FROM _emdash_404_log
			) AS ranked
			WHERE rn > 1
		)
	`.execute(db);
	await db.schema.createIndex("idx_404_log_path_unique").ifNotExists().on("_emdash_404_log").column("path").unique().execute();
	await db.schema.dropIndex("idx_404_log_path").ifExists().execute();
	await db.schema.createIndex("idx_404_log_last_seen").ifNotExists().on("_emdash_404_log").column("last_seen_at").execute();
}
async function down$56(db) {
	await db.schema.dropIndex("idx_404_log_last_seen").ifExists().execute();
	await db.schema.dropIndex("idx_404_log_path_unique").ifExists().execute();
	await db.schema.createIndex("idx_404_log_path").ifNotExists().on("_emdash_404_log").column("path").execute();
	await db.schema.alterTable("_emdash_404_log").dropColumn("last_seen_at").execute();
	await db.schema.alterTable("_emdash_404_log").dropColumn("hits").execute();
}
var _036_i18n_menus_and_taxonomies_exports = /* @__PURE__ */ __exportAll({
	down: () => down$55,
	up: () => up$55
});
/**
* i18n for menus + taxonomies. Adds `locale` + `translation_group` to system
* tables and stores translation_groups (not row ids) in
* `_emdash_menu_items.reference_id` and `content_taxonomies.taxonomy_id`.
* Backfill locale and column DEFAULTs use the site's configured defaultLocale.
*/
function getDefaultLocale$1() {
	return getI18nConfig()?.defaultLocale ?? "en";
}
async function up$55(db) {
	const defaultLocale = getDefaultLocale$1();
	if (isSqlite(db)) {
		await rebuildContentTaxonomies(db);
		await rebuildMenuItems(db, defaultLocale);
		await rebuildMenus(db, defaultLocale);
		await rebuildTaxonomies(db, defaultLocale);
		await rebuildTaxonomyDefs(db, defaultLocale);
		await remapMenuItemRefs(db);
		return;
	}
	await pgWiden(db, "_emdash_menus", ["name"], ["name", "locale"], defaultLocale);
	await pgWiden(db, "_emdash_menu_items", null, null, defaultLocale);
	await pgWiden(db, "taxonomies", ["name", "slug"], [
		"name",
		"slug",
		"locale"
	], defaultLocale);
	await pgWiden(db, "_emdash_taxonomy_defs", ["name"], ["name", "locale"], defaultLocale);
	await pgRemapContentTaxonomies(db);
	await remapMenuItemRefs(db);
}
/**
* D1 commits each statement of a rebuild on its own. A run that stopped
* between dropping `table` and renaming `<table>_new` leaves the staged copy
* as the only one, and the guards below read the old table, so rename the
* staged copy back before they run.
*/
async function resumeStagedRebuild(db, table) {
	const staged = `${table}_new`;
	if (await tableExists(db, table) || !await tableExists(db, staged)) return;
	await db.schema.alterTable(staged).renameTo(table).execute();
}
async function rebuildMenus(db, defaultLocale) {
	await resumeStagedRebuild(db, "_emdash_menus");
	if (!await hasColumn$1(db, "_emdash_menus", "locale")) {
		await sql.raw(`DROP TABLE IF EXISTS "_emdash_menus_new"`).execute(db);
		await db.schema.createTable("_emdash_menus_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull()).addColumn("label", "text", (c) => c.notNull()).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text").addUniqueConstraint("_emdash_menus_name_locale_unique", ["name", "locale"]).execute();
		await sql`
			INSERT INTO _emdash_menus_new (id, name, label, created_at, updated_at, locale, translation_group)
			SELECT id, name, label, created_at, updated_at, ${defaultLocale}, id FROM _emdash_menus
		`.execute(db);
		await db.schema.dropTable("_emdash_menus").execute();
		await sql`ALTER TABLE _emdash_menus_new RENAME TO _emdash_menus`.execute(db);
	}
	await db.schema.createIndex("idx__emdash_menus_locale").ifNotExists().on("_emdash_menus").column("locale").execute();
	await db.schema.createIndex("idx__emdash_menus_translation_group").ifNotExists().on("_emdash_menus").column("translation_group").execute();
}
async function rebuildMenuItems(db, defaultLocale) {
	await resumeStagedRebuild(db, "_emdash_menu_items");
	if (!await hasColumn$1(db, "_emdash_menu_items", "locale")) {
		await sql.raw(`DROP TABLE IF EXISTS "_emdash_menu_items_new"`).execute(db);
		await db.schema.createTable("_emdash_menu_items_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("menu_id", "text", (c) => c.notNull()).addColumn("parent_id", "text").addColumn("sort_order", "integer", (c) => c.notNull().defaultTo(0)).addColumn("type", "text", (c) => c.notNull()).addColumn("reference_collection", "text").addColumn("reference_id", "text").addColumn("custom_url", "text").addColumn("label", "text", (c) => c.notNull()).addColumn("title_attr", "text").addColumn("target", "text").addColumn("css_classes", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text").execute();
		await sql`
		INSERT INTO _emdash_menu_items_new (
			id, menu_id, parent_id, sort_order, type, reference_collection,
			reference_id, custom_url, label, title_attr, target, css_classes,
			created_at, locale, translation_group
		)
		SELECT
			id, menu_id, parent_id, sort_order, type, reference_collection,
			reference_id, custom_url, label, title_attr, target, css_classes,
			created_at, ${defaultLocale}, id
		FROM _emdash_menu_items
	`.execute(db);
		await db.schema.dropTable("_emdash_menu_items").execute();
		await sql`ALTER TABLE _emdash_menu_items_new RENAME TO _emdash_menu_items`.execute(db);
	}
	await db.schema.createIndex("idx_menu_items_menu").ifNotExists().on("_emdash_menu_items").columns(["menu_id", "sort_order"]).execute();
	await db.schema.createIndex("idx_menu_items_parent").ifNotExists().on("_emdash_menu_items").column("parent_id").execute();
	await db.schema.createIndex("idx__emdash_menu_items_locale").ifNotExists().on("_emdash_menu_items").column("locale").execute();
	await db.schema.createIndex("idx__emdash_menu_items_translation_group").ifNotExists().on("_emdash_menu_items").column("translation_group").execute();
}
async function rebuildTaxonomies(db, defaultLocale) {
	await resumeStagedRebuild(db, "taxonomies");
	if (!await hasColumn$1(db, "taxonomies", "locale")) {
		await sql.raw(`DROP TABLE IF EXISTS "taxonomies_new"`).execute(db);
		await sql`DROP INDEX IF EXISTS idx_taxonomies_name`.execute(db);
		await db.schema.createTable("taxonomies_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull()).addColumn("slug", "text", (c) => c.notNull()).addColumn("label", "text", (c) => c.notNull()).addColumn("parent_id", "text").addColumn("data", "text").addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text").addUniqueConstraint("taxonomies_name_slug_locale_unique", [
			"name",
			"slug",
			"locale"
		]).addForeignKeyConstraint("taxonomies_parent_fk", ["parent_id"], "taxonomies_new", ["id"], (cb) => cb.onDelete("set null")).execute();
		await sql`
		INSERT INTO taxonomies_new (id, name, slug, label, parent_id, data, locale, translation_group)
		SELECT id, name, slug, label, parent_id, data, ${defaultLocale}, id FROM taxonomies
	`.execute(db);
		await db.schema.dropTable("taxonomies").execute();
		await sql`ALTER TABLE taxonomies_new RENAME TO taxonomies`.execute(db);
	}
	await db.schema.createIndex("idx_taxonomies_name").ifNotExists().on("taxonomies").column("name").execute();
	await db.schema.createIndex("idx_taxonomies_locale").ifNotExists().on("taxonomies").column("locale").execute();
	await db.schema.createIndex("idx_taxonomies_translation_group").ifNotExists().on("taxonomies").column("translation_group").execute();
	await db.schema.createIndex("idx_taxonomies_parent").ifNotExists().on("taxonomies").column("parent_id").execute();
}
async function rebuildTaxonomyDefs(db, defaultLocale) {
	await resumeStagedRebuild(db, "_emdash_taxonomy_defs");
	if (!await hasColumn$1(db, "_emdash_taxonomy_defs", "locale")) {
		await sql.raw(`DROP TABLE IF EXISTS "_emdash_taxonomy_defs_new"`).execute(db);
		await db.schema.createTable("_emdash_taxonomy_defs_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull()).addColumn("label", "text", (c) => c.notNull()).addColumn("label_singular", "text").addColumn("hierarchical", "integer", (c) => c.defaultTo(0)).addColumn("collections", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text").addUniqueConstraint("_emdash_taxonomy_defs_name_locale_unique", ["name", "locale"]).execute();
		await sql`
		INSERT INTO _emdash_taxonomy_defs_new
			(id, name, label, label_singular, hierarchical, collections, created_at, locale, translation_group)
		SELECT id, name, label, label_singular, hierarchical, collections, created_at, ${defaultLocale}, id
		FROM _emdash_taxonomy_defs
	`.execute(db);
		await db.schema.dropTable("_emdash_taxonomy_defs").execute();
		await sql`ALTER TABLE _emdash_taxonomy_defs_new RENAME TO _emdash_taxonomy_defs`.execute(db);
	}
	await db.schema.createIndex("idx__emdash_taxonomy_defs_locale").ifNotExists().on("_emdash_taxonomy_defs").column("locale").execute();
	await db.schema.createIndex("idx__emdash_taxonomy_defs_translation_group").ifNotExists().on("_emdash_taxonomy_defs").column("translation_group").execute();
}
async function rebuildContentTaxonomies(db) {
	await resumeStagedRebuild(db, "content_taxonomies");
	if ((await sql`PRAGMA foreign_key_list(content_taxonomies)`.execute(db)).rows.length > 0) {
		await sql.raw(`DROP TABLE IF EXISTS "content_taxonomies_new"`).execute(db);
		await db.schema.createTable("content_taxonomies_new").addColumn("collection", "text", (c) => c.notNull()).addColumn("entry_id", "text", (c) => c.notNull()).addColumn("taxonomy_id", "text", (c) => c.notNull()).addPrimaryKeyConstraint("content_taxonomies_pk", [
			"collection",
			"entry_id",
			"taxonomy_id"
		]).execute();
		await sql`
			INSERT OR IGNORE INTO content_taxonomies_new (collection, entry_id, taxonomy_id)
			SELECT collection, entry_id, taxonomy_id FROM content_taxonomies
		`.execute(db);
		await db.schema.dropTable("content_taxonomies").execute();
		await sql`ALTER TABLE content_taxonomies_new RENAME TO content_taxonomies`.execute(db);
	}
	await sql`CREATE INDEX IF NOT EXISTS idx_content_taxonomies_term ON content_taxonomies(taxonomy_id)`.execute(db);
}
async function remapMenuItemRefs(db) {
	const collections = await sql`SELECT slug FROM _emdash_collections`.execute(db);
	for (const { slug } of collections.rows) {
		validateIdentifier(slug, "collection slug");
		const ec = sql.ref(`ec_${slug}`);
		await sql`
			UPDATE _emdash_menu_items SET reference_id = (
				SELECT translation_group FROM ${ec} WHERE ${ec}.id = _emdash_menu_items.reference_id
			)
			WHERE reference_collection = ${slug} AND reference_id IS NOT NULL
				AND EXISTS (SELECT 1 FROM ${ec} WHERE ${ec}.id = _emdash_menu_items.reference_id)
		`.execute(db);
	}
	await sql`
		UPDATE _emdash_menu_items SET reference_id = (
			SELECT translation_group FROM taxonomies WHERE taxonomies.id = _emdash_menu_items.reference_id
		)
		WHERE type = 'taxonomy' AND reference_id IS NOT NULL
			AND EXISTS (SELECT 1 FROM taxonomies WHERE taxonomies.id = _emdash_menu_items.reference_id)
	`.execute(db);
}
async function pgWiden(db, table, oldCols, newCols, defaultLocale) {
	validateSystemIdent(table);
	const ref = sql.ref(table);
	await sql`ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT ${sql.lit(defaultLocale)}`.execute(db);
	await sql`ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS translation_group TEXT`.execute(db);
	await sql`UPDATE ${ref} SET translation_group = id WHERE translation_group IS NULL`.execute(db);
	await sql`CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table}_locale`)} ON ${ref} (locale)`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${table}_translation_group`)} ON ${ref} (translation_group)
	`.execute(db);
	if (!oldCols || !newCols) return;
	for (const c of [...oldCols, ...newCols]) validateSystemIdent(c);
	const cons = await sql`
		SELECT conname FROM pg_constraint c
		WHERE c.conrelid = ${table}::regclass AND c.contype = 'u'
			AND array_length(c.conkey, 1) = ${oldCols.length}
			AND (
				SELECT array_agg(a.attname ORDER BY pos.ord)
				FROM unnest(c.conkey) WITH ORDINALITY AS pos(attnum, ord)
				JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = pos.attnum
			)::text[] = ${oldCols}::text[]
	`.execute(db);
	for (const c of cons.rows) await sql`ALTER TABLE ${ref} DROP CONSTRAINT ${sql.ref(c.conname)}`.execute(db);
	const cols = sql.join(newCols.map((c) => sql.ref(c)), sql`, `);
	await sql`
		ALTER TABLE ${ref}
		ADD CONSTRAINT ${sql.ref(`${table}_${newCols.join("_")}_unique`)} UNIQUE (${cols})
	`.execute(db);
}
async function pgRemapContentTaxonomies(db) {
	const fks = await sql`
		SELECT conname FROM pg_constraint
		WHERE conrelid = 'content_taxonomies'::regclass AND contype = 'f'
	`.execute(db);
	for (const c of fks.rows) await sql`ALTER TABLE content_taxonomies DROP CONSTRAINT ${sql.ref(c.conname)}`.execute(db);
	await sql`
		UPDATE content_taxonomies SET taxonomy_id = t.translation_group
		FROM taxonomies t WHERE t.id = content_taxonomies.taxonomy_id
	`.execute(db);
}
async function hasColumn$1(db, table, column) {
	return (await sql`PRAGMA table_info(${sql.ref(table)})`.execute(db)).rows.some((r) => r.name === column);
}
var SYSTEM_IDENT = /^[_a-z][a-z0-9_]*$/;
function validateSystemIdent(name) {
	if (!SYSTEM_IDENT.test(name)) throw new Error(`Invalid identifier: "${name}"`);
}
/**
* down() restores the FK on content_taxonomies. Rows whose taxonomy_id doesn't
* resolve to a (translation_group, defaultLocale) pair would fail the rebuild
* after other tables are already stripped — leaving the user mid-rollback.
* Surface dangling rows up front instead.
*/
async function assertContentTaxonomiesResolve(db, defaultLocale) {
	const result = await sql`
		SELECT COUNT(*) AS count FROM content_taxonomies ct
		WHERE NOT EXISTS (
			SELECT 1 FROM taxonomies t
			WHERE t.translation_group = ct.taxonomy_id AND t.locale = ${defaultLocale}
		)
	`.execute(db);
	const count = Number(result.rows[0]?.count ?? 0);
	if (count > 0) throw new Error(`Cannot revert migration 036_i18n_menus_and_taxonomies: ${count} row(s) in "content_taxonomies" reference a translation_group with no row in "taxonomies" at locale="${defaultLocale}". Clean up the dangling associations before rolling back.`);
}
/**
* down() is destructive on multi-locale installs (dropping `locale` collapses
* translated rows onto an ambiguous unique key). Refuse to run when any row
* sits at a locale other than the configured defaultLocale.
*/
async function assertSingleLocale$1(db, defaultLocale) {
	for (const table of [
		"_emdash_menus",
		"_emdash_menu_items",
		"taxonomies",
		"_emdash_taxonomy_defs"
	]) {
		validateSystemIdent(table);
		const result = await sql`
			SELECT COUNT(*) AS count FROM ${sql.ref(table)} WHERE locale != ${defaultLocale}
		`.execute(db);
		const count = Number(result.rows[0]?.count ?? 0);
		if (count > 0) throw new Error(`Cannot revert migration 036_i18n_menus_and_taxonomies: ${count} row(s) in "${table}" use a non-default locale (defaultLocale="${defaultLocale}"). Reverting would drop them silently. Export translations first (or delete them) and re-run the rollback. See packages/core/src/database/migrations/036_i18n_menus_and_taxonomies.ts.`);
	}
}
async function down$55(db) {
	const defaultLocale = getDefaultLocale$1();
	await assertSingleLocale$1(db, defaultLocale);
	await assertContentTaxonomiesResolve(db, defaultLocale);
	const widenedTables = [
		"_emdash_menus",
		"_emdash_menu_items",
		"taxonomies",
		"_emdash_taxonomy_defs"
	];
	if (isSqlite(db)) {
		for (const t of widenedTables) {
			await sql.raw(`DROP INDEX IF EXISTS idx_${t}_locale`).execute(db);
			await sql.raw(`DROP INDEX IF EXISTS idx_${t}_translation_group`).execute(db);
		}
		await remapContentTaxonomiesDown(db, defaultLocale);
		await rebuildMenusDown(db);
		await rebuildMenuItemsDown(db);
		await rebuildTaxonomiesDown(db);
		await rebuildTaxonomyDefsDown(db);
		await restoreContentTaxonomiesFk(db);
		return;
	}
	for (const t of widenedTables) {
		await sql.raw(`DROP INDEX IF EXISTS idx_${t}_locale`).execute(db);
		await sql.raw(`DROP INDEX IF EXISTS idx_${t}_translation_group`).execute(db);
		await sql.raw(`ALTER TABLE "${t}" DROP COLUMN IF EXISTS locale`).execute(db);
		await sql.raw(`ALTER TABLE "${t}" DROP COLUMN IF EXISTS translation_group`).execute(db);
	}
}
async function remapContentTaxonomiesDown(db, defaultLocale) {
	await sql`
		UPDATE content_taxonomies
		SET taxonomy_id = COALESCE(
			(SELECT t.id FROM taxonomies t
			 WHERE t.translation_group = content_taxonomies.taxonomy_id
				 AND t.locale = ${defaultLocale}),
			taxonomy_id
		)
	`.execute(db);
}
async function restoreContentTaxonomiesFk(db) {
	await sql.raw(`DROP TABLE IF EXISTS "content_taxonomies_new"`).execute(db);
	await db.schema.createTable("content_taxonomies_new").addColumn("collection", "text", (c) => c.notNull()).addColumn("entry_id", "text", (c) => c.notNull()).addColumn("taxonomy_id", "text", (c) => c.notNull()).addPrimaryKeyConstraint("content_taxonomies_pk", [
		"collection",
		"entry_id",
		"taxonomy_id"
	]).addForeignKeyConstraint("content_taxonomies_taxonomy_fk", ["taxonomy_id"], "taxonomies", ["id"], (cb) => cb.onDelete("cascade")).execute();
	await sql`
		INSERT OR IGNORE INTO content_taxonomies_new (collection, entry_id, taxonomy_id)
		SELECT collection, entry_id, taxonomy_id FROM content_taxonomies
	`.execute(db);
	await db.schema.dropTable("content_taxonomies").execute();
	await sql`ALTER TABLE content_taxonomies_new RENAME TO content_taxonomies`.execute(db);
	await sql`CREATE INDEX IF NOT EXISTS idx_content_taxonomies_term ON content_taxonomies(taxonomy_id)`.execute(db);
}
async function rebuildMenusDown(db) {
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_menus_old"`).execute(db);
	await db.schema.createTable("_emdash_menus_old").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull().unique()).addColumn("label", "text", (c) => c.notNull()).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).execute();
	await sql`
		INSERT INTO _emdash_menus_old (id, name, label, created_at, updated_at)
		SELECT id, name, label, created_at, updated_at FROM _emdash_menus
	`.execute(db);
	await db.schema.dropTable("_emdash_menus").execute();
	await sql`ALTER TABLE _emdash_menus_old RENAME TO _emdash_menus`.execute(db);
}
async function rebuildMenuItemsDown(db) {
	await sql.raw(`ALTER TABLE _emdash_menu_items DROP COLUMN locale`).execute(db);
	await sql.raw(`ALTER TABLE _emdash_menu_items DROP COLUMN translation_group`).execute(db);
}
async function rebuildTaxonomiesDown(db) {
	await sql.raw(`DROP TABLE IF EXISTS "taxonomies_old"`).execute(db);
	await db.schema.createTable("taxonomies_old").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull()).addColumn("slug", "text", (c) => c.notNull()).addColumn("label", "text", (c) => c.notNull()).addColumn("parent_id", "text").addColumn("data", "text").addUniqueConstraint("taxonomies_name_slug_unique", ["name", "slug"]).addForeignKeyConstraint("taxonomies_parent_fk", ["parent_id"], "taxonomies_old", ["id"], (cb) => cb.onDelete("set null")).execute();
	await sql`
		INSERT INTO taxonomies_old (id, name, slug, label, parent_id, data)
		SELECT id, name, slug, label, parent_id, data FROM taxonomies
	`.execute(db);
	await db.schema.dropTable("taxonomies").execute();
	await sql`ALTER TABLE taxonomies_old RENAME TO taxonomies`.execute(db);
	await db.schema.createIndex("idx_taxonomies_name").on("taxonomies").column("name").execute();
	await db.schema.createIndex("idx_taxonomies_parent").ifNotExists().on("taxonomies").column("parent_id").execute();
}
async function rebuildTaxonomyDefsDown(db) {
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_taxonomy_defs_old"`).execute(db);
	await db.schema.createTable("_emdash_taxonomy_defs_old").addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull().unique()).addColumn("label", "text", (c) => c.notNull()).addColumn("label_singular", "text").addColumn("hierarchical", "integer", (c) => c.defaultTo(0)).addColumn("collections", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).execute();
	await sql`
		INSERT INTO _emdash_taxonomy_defs_old
			(id, name, label, label_singular, hierarchical, collections, created_at)
		SELECT id, name, label, label_singular, hierarchical, collections, created_at
		FROM _emdash_taxonomy_defs
	`.execute(db);
	await db.schema.dropTable("_emdash_taxonomy_defs").execute();
	await sql`ALTER TABLE _emdash_taxonomy_defs_old RENAME TO _emdash_taxonomy_defs`.execute(db);
}
var _037_credential_algorithm_exports = /* @__PURE__ */ __exportAll({
	down: () => down$54,
	up: () => up$54
});
async function up$54(db) {
	if (!await columnExists(db, "credentials", "algorithm")) await db.schema.alterTable("credentials").addColumn("algorithm", "integer", (col) => col.notNull().defaultTo(-7)).execute();
}
async function down$54(db) {
	if (await columnExists(db, "credentials", "algorithm")) await db.schema.alterTable("credentials").dropColumn("algorithm").execute();
}
var _038_registry_plugin_state_exports = /* @__PURE__ */ __exportAll({
	down: () => down$53,
	up: () => up$53
});
/**
* Migration: Add registry fields to _plugin_state
*
* Extends the marketplace columns added in 022 to support the
* experimental decentralized plugin registry (see RFC #694). Rather
* than introducing a separate `_registry_plugin_state` table, we
* reuse the same row shape and distinguish registry installs via the
* existing `source` column (now `'config' | 'marketplace' | 'registry'`).
*
* Registry plugins are addressed by `(publisher_did, slug)` in their
* lexicon records but stored under a hashed, opaque `plugin_id` for
* runtime compatibility -- see `packages/core/src/registry/plugin-id.ts`.
* The `(publisher_did, slug)` pair is preserved here for update
* resolution against the currently configured aggregator and for admin
* UI rendering ("by @example.dev").
*
* All new columns are nullable; existing marketplace and config rows
* keep working unchanged.
*
* Idempotency: D1 and SQLite don't honor the migration runner's
* advisory lock, so a partial re-apply (cold start race between two
* isolates, retry after a connection drop) can re-enter this `up`
* function with the columns or index already in place. Each step
* checks before adding to keep the migration safe under partial
* re-application. The same pattern is used in 019_i18n.ts.
*/
async function up$53(db) {
	if (isSqlite(db)) await upSqlite(db);
	else await upPostgres(db);
}
async function upSqlite(db) {
	const cols = await sql`PRAGMA table_info(_plugin_state)`.execute(db);
	const colNames = new Set(cols.rows.map((c) => c.name));
	if (!colNames.has("registry_publisher_did")) await sql`
			ALTER TABLE _plugin_state
			ADD COLUMN registry_publisher_did TEXT
		`.execute(db);
	if (!colNames.has("registry_slug")) await sql`
			ALTER TABLE _plugin_state
			ADD COLUMN registry_slug TEXT
		`.execute(db);
	const indexes = await sql`PRAGMA index_list(_plugin_state)`.execute(db);
	if (!new Set(indexes.rows.map((i) => i.name)).has("idx_plugin_state_registry")) await sql`
			CREATE INDEX idx_plugin_state_registry
			ON _plugin_state (source)
			WHERE source = 'registry'
		`.execute(db);
}
async function upPostgres(db) {
	const cols = await sql`
		SELECT column_name FROM information_schema.columns
		WHERE table_name = '_plugin_state'
		  AND table_schema = current_schema()
	`.execute(db);
	const colNames = new Set(cols.rows.map((c) => c.column_name));
	if (!colNames.has("registry_publisher_did")) await sql`
			ALTER TABLE _plugin_state
			ADD COLUMN registry_publisher_did TEXT
		`.execute(db);
	if (!colNames.has("registry_slug")) await sql`
			ALTER TABLE _plugin_state
			ADD COLUMN registry_slug TEXT
		`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS idx_plugin_state_registry
		ON _plugin_state (source)
		WHERE source = 'registry'
	`.execute(db);
}
async function down$53(db) {
	await sql`
		DROP INDEX IF EXISTS idx_plugin_state_registry
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN registry_slug
	`.execute(db);
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN registry_publisher_did
	`.execute(db);
}
var _039_fix_fts5_triggers_exports = /* @__PURE__ */ __exportAll({
	down: () => down$52,
	up: () => up$52
});
async function up$52(db) {
	if (!isSqlite(db)) return;
	const collections = await sql`
		SELECT slug, search_config FROM _emdash_collections
		WHERE search_config IS NOT NULL
	`.execute(db);
	for (const collection of collections.rows) {
		if (!isSearchEnabled$1(collection.search_config)) continue;
		try {
			validateIdentifier(collection.slug, "collection slug");
		} catch (error) {
			console.warn(`[migration 039] skipping FTS rebuild for collection "${collection.slug}": ${error instanceof Error ? error.message : String(error)}`);
			continue;
		}
		const fields = await getSearchableFields$1(db, collection.slug);
		if (fields.length === 0) {
			await dropFtsObjects(db, collection.slug);
			await sql`
				UPDATE _emdash_collections
				SET search_config = json_set(search_config, '$.enabled', json('false'))
				WHERE slug = ${collection.slug}
			`.execute(db);
			continue;
		}
		await rebuildIndex$1(db, collection.slug, fields);
	}
}
/**
* Forward-only migration. Down is a no-op: we cannot meaningfully
* "restore the broken triggers" and there is no migration-level state
* to roll back. The FTS tables themselves are managed by `FTSManager`
* at runtime, not by this migration, so leaving them in their
* corruption-safe state on rollback is correct.
*/
async function down$52(_db) {}
function isSearchEnabled$1(searchConfig) {
	if (!searchConfig) return false;
	try {
		const parsed = JSON.parse(searchConfig);
		return typeof parsed === "object" && parsed !== null && "enabled" in parsed && parsed.enabled === true;
	} catch {
		return false;
	}
}
async function getSearchableFields$1(db, collectionSlug) {
	const rows = await sql`
		SELECT f.slug FROM _emdash_fields f
		INNER JOIN _emdash_collections c ON c.id = f.collection_id
		WHERE c.slug = ${collectionSlug} AND f.searchable = 1
	`.execute(db);
	const out = [];
	for (const row of rows.rows) try {
		validateIdentifier(row.slug, "searchable field name");
		out.push(row.slug);
	} catch {
		console.warn(`[migration 039] skipping invalid searchable field "${row.slug}" on collection "${collectionSlug}"`);
	}
	return out;
}
async function rebuildIndex$1(db, collectionSlug, fields) {
	const ftsTable = `_emdash_fts_${collectionSlug}`;
	const contentTable = `ec_${collectionSlug}`;
	const columnList = [
		"id UNINDEXED",
		"locale UNINDEXED",
		...fields
	].join(", ");
	const fieldList = fields.join(", ");
	const newFieldList = fields.map((f) => `NEW.${f}`).join(", ");
	const oldFieldList = fields.map((f) => `OLD.${f}`).join(", ");
	await dropFtsObjects(db, collectionSlug);
	await sql.raw(`
		CREATE VIRTUAL TABLE IF NOT EXISTS "${ftsTable}" USING fts5(
			${columnList},
			content='${contentTable}',
			content_rowid='rowid',
			tokenize='porter unicode61'
		)
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_insert"
		AFTER INSERT ON "${contentTable}"
		WHEN NEW.deleted_at IS NULL
		BEGIN
			INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			VALUES (NEW.rowid, NEW.id, NEW.locale, ${newFieldList});
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_update"
		AFTER UPDATE ON "${contentTable}"
		BEGIN
			INSERT INTO "${ftsTable}"("${ftsTable}", rowid, id, locale, ${fieldList})
			SELECT 'delete', OLD.rowid, OLD.id, OLD.locale, ${oldFieldList}
			WHERE OLD.deleted_at IS NULL;
			INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			SELECT NEW.rowid, NEW.id, NEW.locale, ${newFieldList}
			WHERE NEW.deleted_at IS NULL;
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_delete"
		AFTER DELETE ON "${contentTable}"
		BEGIN
			INSERT INTO "${ftsTable}"("${ftsTable}", rowid, id, locale, ${fieldList})
			SELECT 'delete', OLD.rowid, OLD.id, OLD.locale, ${oldFieldList}
			WHERE OLD.deleted_at IS NULL;
		END
	`).execute(db);
	await sql.raw(`
		INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
		SELECT rowid, id, locale, ${fieldList} FROM "${contentTable}"
		WHERE deleted_at IS NULL
	`).execute(db);
}
async function dropFtsObjects(db, collectionSlug) {
	const ftsTable = `_emdash_fts_${collectionSlug}`;
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_insert"`).execute(db);
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_update"`).execute(db);
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_delete"`).execute(db);
	await sql.raw(`DROP TABLE IF EXISTS "${ftsTable}"`).execute(db);
}
var _040_byline_i18n_exports = /* @__PURE__ */ __exportAll({
	down: () => down$51,
	up: () => up$51
});
/**
* i18n for bylines. Adds `locale` + `translation_group` to `_emdash_bylines`
* and stores translation_groups (not row ids) in
* `_emdash_content_bylines.byline_id` and `ec_*.primary_byline_id`. Backfill
* locale and column DEFAULTs use the site's configured defaultLocale.
*
* Mirrors the row-per-locale + `translation_group` model PR #916 (migration
* 036) applied to menus and taxonomies.
*
* Key consequences of the model:
* - `(slug, locale)` is unique on `_emdash_bylines`; a single slug can repeat
*   across locales (one row per locale variant of a byline).
* - The partial unique on `user_id` widens to `(user_id, locale)` so a CMS
*   user can have one byline per locale.
* - `_emdash_content_bylines.byline_id` no longer FKs to `_emdash_bylines.id`
*   (it holds a `translation_group`, not a row id). The runtime is
*   responsible for cascading on byline delete — see `BylineRepository.delete`.
*
* Hydration is strict per locale (see `BylineRepository.getContentBylines`):
* a credit at locale X renders iff a byline row exists at locale X within the
* credited translation group. This mirrors `getEntryTerms` and the convention
* established by #916. There is no read-time fallback.
*/
function getDefaultLocale() {
	return getI18nConfig()?.defaultLocale ?? "en";
}
async function up$51(db) {
	const defaultLocale = getDefaultLocale();
	if (isSqlite(db)) {
		await rebuildContentBylines(db);
		await rebuildBylines(db, defaultLocale);
		await remapPrimaryBylineIds(db);
		return;
	}
	await pgWidenBylines(db, defaultLocale);
	await pgDropContentBylinesFk(db);
	await remapPrimaryBylineIds(db);
}
async function rebuildContentBylines(db) {
	if ((await sql`PRAGMA foreign_key_list(_emdash_content_bylines)`.execute(db)).rows.length === 0) return;
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_content_bylines_new"`).execute(db);
	await db.schema.createTable("_emdash_content_bylines_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("collection_slug", "text", (c) => c.notNull()).addColumn("content_id", "text", (c) => c.notNull()).addColumn("byline_id", "text", (c) => c.notNull()).addColumn("sort_order", "integer", (c) => c.notNull().defaultTo(0)).addColumn("role_label", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addUniqueConstraint("content_bylines_unique", [
		"collection_slug",
		"content_id",
		"byline_id"
	]).execute();
	await sql`
		INSERT INTO _emdash_content_bylines_new
			(id, collection_slug, content_id, byline_id, sort_order, role_label, created_at)
		SELECT id, collection_slug, content_id, byline_id, sort_order, role_label, created_at
		FROM _emdash_content_bylines
	`.execute(db);
	await db.schema.dropTable("_emdash_content_bylines").execute();
	await sql`ALTER TABLE _emdash_content_bylines_new RENAME TO _emdash_content_bylines`.execute(db);
	await db.schema.createIndex("idx_content_bylines_content").on("_emdash_content_bylines").columns([
		"collection_slug",
		"content_id",
		"sort_order"
	]).execute();
	await db.schema.createIndex("idx_content_bylines_byline").on("_emdash_content_bylines").column("byline_id").execute();
}
async function rebuildBylines(db, defaultLocale) {
	if (await hasColumn(db, "_emdash_bylines", "locale")) return;
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_bylines_new"`).execute(db);
	await db.schema.createTable("_emdash_bylines_new").addColumn("id", "text", (c) => c.primaryKey()).addColumn("slug", "text", (c) => c.notNull()).addColumn("display_name", "text", (c) => c.notNull()).addColumn("bio", "text").addColumn("avatar_media_id", "text", (c) => c.references("media.id").onDelete("set null")).addColumn("website_url", "text").addColumn("user_id", "text", (c) => c.references("users.id").onDelete("set null")).addColumn("is_guest", "integer", (c) => c.notNull().defaultTo(0)).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text").addUniqueConstraint("_emdash_bylines_slug_locale_unique", ["slug", "locale"]).execute();
	await sql`
		INSERT INTO _emdash_bylines_new (
			id, slug, display_name, bio, avatar_media_id, website_url,
			user_id, is_guest, created_at, updated_at, locale, translation_group
		)
		SELECT
			id, slug, display_name, bio, avatar_media_id, website_url,
			user_id, is_guest, created_at, updated_at, ${defaultLocale}, id
		FROM _emdash_bylines
	`.execute(db);
	await db.schema.dropTable("_emdash_bylines").execute();
	await sql`ALTER TABLE _emdash_bylines_new RENAME TO _emdash_bylines`.execute(db);
	await db.schema.createIndex("idx_bylines_slug").on("_emdash_bylines").column("slug").execute();
	await db.schema.createIndex("idx_bylines_display_name").on("_emdash_bylines").column("display_name").execute();
	await sql`
		CREATE UNIQUE INDEX ${sql.ref("idx_bylines_user_id_locale_unique")}
		ON ${sql.ref("_emdash_bylines")} (user_id, locale)
		WHERE user_id IS NOT NULL
	`.execute(db);
	await db.schema.createIndex("idx__emdash_bylines_locale").on("_emdash_bylines").column("locale").execute();
	await db.schema.createIndex("idx__emdash_bylines_translation_group").on("_emdash_bylines").column("translation_group").execute();
	await sql`
		CREATE UNIQUE INDEX ${sql.ref("idx_bylines_group_locale_unique")}
		ON ${sql.ref("_emdash_bylines")} (translation_group, locale)
		WHERE translation_group IS NOT NULL
	`.execute(db);
}
async function remapPrimaryBylineIds(db) {
	const collections = await listTablesLike(db, "ec_%");
	for (const table of collections) {
		validateIdentifier(table, "content table");
		await sql`
			UPDATE ${sql.ref(table)} SET primary_byline_id = (
				SELECT translation_group FROM _emdash_bylines
				WHERE _emdash_bylines.id = ${sql.ref(table)}.primary_byline_id
			)
			WHERE primary_byline_id IS NOT NULL
				AND EXISTS (
					SELECT 1 FROM _emdash_bylines
					WHERE _emdash_bylines.id = ${sql.ref(table)}.primary_byline_id
				)
		`.execute(db);
	}
}
async function pgWidenBylines(db, defaultLocale) {
	const ref = sql.ref("_emdash_bylines");
	await sql`ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS locale TEXT NOT NULL DEFAULT ${sql.lit(defaultLocale)}`.execute(db);
	await sql`ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS translation_group TEXT`.execute(db);
	await sql`UPDATE ${ref} SET translation_group = id WHERE translation_group IS NULL`.execute(db);
	await sql`CREATE INDEX IF NOT EXISTS ${sql.ref("idx__emdash_bylines_locale")} ON ${ref} (locale)`.execute(db);
	await sql`
		CREATE INDEX IF NOT EXISTS ${sql.ref("idx__emdash_bylines_translation_group")}
		ON ${ref} (translation_group)
	`.execute(db);
	const slugCons = await sql`
		SELECT conname FROM pg_constraint c
		WHERE c.conrelid = '_emdash_bylines'::regclass AND c.contype = 'u'
			AND array_length(c.conkey, 1) = 1
			AND (
				SELECT array_agg(a.attname ORDER BY pos.ord)
				FROM unnest(c.conkey) WITH ORDINALITY AS pos(attnum, ord)
				JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = pos.attnum
			)::text[] = ARRAY['slug']
	`.execute(db);
	for (const c of slugCons.rows) await sql`ALTER TABLE ${ref} DROP CONSTRAINT ${sql.ref(c.conname)}`.execute(db);
	await sql`
		ALTER TABLE ${ref}
		ADD CONSTRAINT _emdash_bylines_slug_locale_unique UNIQUE (slug, locale)
	`.execute(db);
	await sql`DROP INDEX IF EXISTS idx_bylines_user_id_unique`.execute(db);
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS ${sql.ref("idx_bylines_user_id_locale_unique")}
		ON ${ref} (user_id, locale) WHERE user_id IS NOT NULL
	`.execute(db);
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS ${sql.ref("idx_bylines_group_locale_unique")}
		ON ${ref} (translation_group, locale) WHERE translation_group IS NOT NULL
	`.execute(db);
}
async function pgDropContentBylinesFk(db) {
	const fks = await sql`
		SELECT conname FROM pg_constraint
		WHERE conrelid = '_emdash_content_bylines'::regclass AND contype = 'f'
	`.execute(db);
	for (const c of fks.rows) await sql`ALTER TABLE _emdash_content_bylines DROP CONSTRAINT ${sql.ref(c.conname)}`.execute(db);
}
async function hasColumn(db, table, column) {
	return (await sql`PRAGMA table_info(${sql.ref(table)})`.execute(db)).rows.some((r) => r.name === column);
}
/**
* down() restores the FK on `_emdash_content_bylines.byline_id`. Rows whose
* `byline_id` doesn't resolve to a (translation_group, defaultLocale) row in
* `_emdash_bylines` would fail the rebuild after other tables are already
* stripped — leaving the user mid-rollback. Surface dangling rows up front.
*/
async function assertContentBylinesResolve(db, defaultLocale) {
	const result = await sql`
		SELECT COUNT(*) AS count FROM _emdash_content_bylines cb
		WHERE NOT EXISTS (
			SELECT 1 FROM _emdash_bylines b
			WHERE b.translation_group = cb.byline_id AND b.locale = ${defaultLocale}
		)
	`.execute(db);
	const count = Number(result.rows[0]?.count ?? 0);
	if (count > 0) throw new Error(`Cannot revert migration 040_byline_i18n: ${count} row(s) in "_emdash_content_bylines" reference a translation_group with no row in "_emdash_bylines" at locale="${defaultLocale}". Clean up the dangling credits before rolling back.`);
}
/**
* down() is destructive on multi-locale installs (dropping `locale` collapses
* translated rows onto an ambiguous unique key). Refuse to run when any row
* sits at a locale other than the configured defaultLocale.
*/
async function assertSingleLocale(db, defaultLocale) {
	const result = await sql`
		SELECT COUNT(*) AS count FROM _emdash_bylines WHERE locale != ${defaultLocale}
	`.execute(db);
	const count = Number(result.rows[0]?.count ?? 0);
	if (count > 0) throw new Error(`Cannot revert migration 040_byline_i18n: ${count} row(s) in "_emdash_bylines" use a non-default locale (defaultLocale="${defaultLocale}"). Reverting would drop them silently. Export translations first (or delete them) and re-run the rollback. See packages/core/src/database/migrations/040_byline_i18n.ts.`);
}
async function down$51(db) {
	const defaultLocale = getDefaultLocale();
	await assertSingleLocale(db, defaultLocale);
	await assertContentBylinesResolve(db, defaultLocale);
	if (isSqlite(db)) {
		await sql.raw(`DROP INDEX IF EXISTS idx__emdash_bylines_locale`).execute(db);
		await sql.raw(`DROP INDEX IF EXISTS idx__emdash_bylines_translation_group`).execute(db);
		await sql.raw(`DROP INDEX IF EXISTS idx_bylines_user_id_locale_unique`).execute(db);
		await sql.raw(`DROP INDEX IF EXISTS idx_bylines_group_locale_unique`).execute(db);
		await remapPrimaryBylineIdsDown(db, defaultLocale);
		await remapContentBylinesDown(db, defaultLocale);
		await rebuildBylinesDown(db);
		await restoreContentBylinesFk(db);
		return;
	}
	await remapPrimaryBylineIdsDown(db, defaultLocale);
	await sql`
		UPDATE _emdash_content_bylines
		SET byline_id = COALESCE(
			(SELECT b.id FROM _emdash_bylines b
			 WHERE b.translation_group = _emdash_content_bylines.byline_id
				 AND b.locale = ${defaultLocale}),
			byline_id
		)
	`.execute(db);
	await sql.raw(`DROP INDEX IF EXISTS idx__emdash_bylines_locale`).execute(db);
	await sql.raw(`DROP INDEX IF EXISTS idx__emdash_bylines_translation_group`).execute(db);
	await sql.raw(`DROP INDEX IF EXISTS idx_bylines_user_id_locale_unique`).execute(db);
	await sql.raw(`DROP INDEX IF EXISTS idx_bylines_group_locale_unique`).execute(db);
	await sql.raw(`ALTER TABLE "_emdash_bylines" DROP CONSTRAINT IF EXISTS _emdash_bylines_slug_locale_unique`).execute(db);
	await sql.raw(`ALTER TABLE "_emdash_bylines" DROP COLUMN IF EXISTS locale`).execute(db);
	await sql.raw(`ALTER TABLE "_emdash_bylines" DROP COLUMN IF EXISTS translation_group`).execute(db);
	await sql.raw(`ALTER TABLE "_emdash_bylines" ADD CONSTRAINT _emdash_bylines_slug_unique UNIQUE (slug)`).execute(db);
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS ${sql.ref("idx_bylines_user_id_unique")}
		ON _emdash_bylines (user_id) WHERE user_id IS NOT NULL
	`.execute(db);
	await sql`
		ALTER TABLE _emdash_content_bylines
		ADD CONSTRAINT _emdash_content_bylines_byline_fk
		FOREIGN KEY (byline_id) REFERENCES _emdash_bylines(id) ON DELETE CASCADE
	`.execute(db);
}
async function remapPrimaryBylineIdsDown(db, defaultLocale) {
	const collections = await listTablesLike(db, "ec_%");
	for (const table of collections) {
		validateIdentifier(table, "content table");
		await sql`
			UPDATE ${sql.ref(table)}
			SET primary_byline_id = COALESCE(
				(SELECT b.id FROM _emdash_bylines b
				 WHERE b.translation_group = ${sql.ref(table)}.primary_byline_id
					 AND b.locale = ${defaultLocale}),
				primary_byline_id
			)
			WHERE primary_byline_id IS NOT NULL
		`.execute(db);
	}
}
async function remapContentBylinesDown(db, defaultLocale) {
	await sql`
		UPDATE _emdash_content_bylines
		SET byline_id = COALESCE(
			(SELECT b.id FROM _emdash_bylines b
			 WHERE b.translation_group = _emdash_content_bylines.byline_id
				 AND b.locale = ${defaultLocale}),
			byline_id
		)
	`.execute(db);
}
async function rebuildBylinesDown(db) {
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_bylines_old"`).execute(db);
	await db.schema.createTable("_emdash_bylines_old").addColumn("id", "text", (c) => c.primaryKey()).addColumn("slug", "text", (c) => c.notNull().unique()).addColumn("display_name", "text", (c) => c.notNull()).addColumn("bio", "text").addColumn("avatar_media_id", "text", (c) => c.references("media.id").onDelete("set null")).addColumn("website_url", "text").addColumn("user_id", "text", (c) => c.references("users.id").onDelete("set null")).addColumn("is_guest", "integer", (c) => c.notNull().defaultTo(0)).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).execute();
	await sql`
		INSERT INTO _emdash_bylines_old (
			id, slug, display_name, bio, avatar_media_id, website_url,
			user_id, is_guest, created_at, updated_at
		)
		SELECT
			id, slug, display_name, bio, avatar_media_id, website_url,
			user_id, is_guest, created_at, updated_at
		FROM _emdash_bylines
	`.execute(db);
	await db.schema.dropTable("_emdash_bylines").execute();
	await sql`ALTER TABLE _emdash_bylines_old RENAME TO _emdash_bylines`.execute(db);
	await db.schema.createIndex("idx_bylines_slug").on("_emdash_bylines").column("slug").execute();
	await db.schema.createIndex("idx_bylines_display_name").on("_emdash_bylines").column("display_name").execute();
	await sql`
		CREATE UNIQUE INDEX ${sql.ref("idx_bylines_user_id_unique")}
		ON ${sql.ref("_emdash_bylines")} (user_id)
		WHERE user_id IS NOT NULL
	`.execute(db);
}
async function restoreContentBylinesFk(db) {
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_content_bylines_old"`).execute(db);
	await db.schema.createTable("_emdash_content_bylines_old").addColumn("id", "text", (c) => c.primaryKey()).addColumn("collection_slug", "text", (c) => c.notNull()).addColumn("content_id", "text", (c) => c.notNull()).addColumn("byline_id", "text", (c) => c.notNull().references("_emdash_bylines.id").onDelete("cascade")).addColumn("sort_order", "integer", (c) => c.notNull().defaultTo(0)).addColumn("role_label", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addUniqueConstraint("content_bylines_unique", [
		"collection_slug",
		"content_id",
		"byline_id"
	]).execute();
	await sql`
		INSERT INTO _emdash_content_bylines_old
			(id, collection_slug, content_id, byline_id, sort_order, role_label, created_at)
		SELECT id, collection_slug, content_id, byline_id, sort_order, role_label, created_at
		FROM _emdash_content_bylines
	`.execute(db);
	await db.schema.dropTable("_emdash_content_bylines").execute();
	await sql`ALTER TABLE _emdash_content_bylines_old RENAME TO _emdash_content_bylines`.execute(db);
	await db.schema.createIndex("idx_content_bylines_content").on("_emdash_content_bylines").columns([
		"collection_slug",
		"content_id",
		"sort_order"
	]).execute();
	await db.schema.createIndex("idx_content_bylines_byline").on("_emdash_content_bylines").column("byline_id").execute();
}
var _041_content_locale_list_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$50,
	up: () => up$50
});
/**
* Migration: locale-aware composite indexes for content list queries.
*
* Addresses GitHub issue #1219. When i18n is enabled the admin content list
* filters by `locale` and orders by `updated_at`/`created_at`. The existing
* composite indexes (033/034) cover `(deleted_at, updated_at DESC, id DESC)`
* etc. but omit `locale`, so a locale-filtered ordered list can't be served
* by a single index on large tables. These indexes restore index-only paging
* for the locale-scoped case.
*
* Forward-only and idempotent (`IF NOT EXISTS`).
*
* Index names use a short `loc_upd`/`loc_crt` suffix rather than spelling out
* `deleted_locale_updated_id`: Postgres truncates identifiers to 63 bytes, and
* the longer form pushes the `updated`/`created` discriminator past byte 63 for
* slugs as short as 40 chars, making both names truncate to the same string.
* Keep these identical to the names in `schema/registry.ts`.
*/
async function up$50(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_loc_upd`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, updated_at DESC, id DESC)
		`.execute(db);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_loc_crt`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, created_at DESC, id DESC)
		`.execute(db);
	}
}
async function down$50(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_loc_upd`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_loc_crt`)}`.execute(db);
	}
}
var _042_byline_fields_exports = /* @__PURE__ */ __exportAll({
	down: () => down$49,
	up: () => up$49
});
/**
* Byline custom fields (Discussion #1174). Adds three tables and a
* version-counter row in `options`. Purely additive: no change to
* `_emdash_bylines` columns landed by migration 040, no change to
* `_emdash_content_bylines`.
*
* Storage model (D11 in the design spec):
*
* - `_emdash_byline_fields` — definitions. One row per registered field.
* - `_emdash_byline_field_values` — translatable values, keyed by
*   `(byline_id, field_id)`. One value per locale variant of a byline.
* - `_emdash_byline_field_group_values` — non-translatable values, keyed
*   by `(translation_group, field_id)`. One value shared across every
*   locale variant of the byline's translation group.
*
* The per-field `translatable` flag (column on `_emdash_byline_fields`)
* decides which value table a field writes to. The split is at the
* storage level rather than per-row so a single SELECT … IN per locale
* bucket suffices for batched hydration (see Phase 3 of the PR plan).
*
* `options('byline_fields_version', '0')` is the version counter the
* field-definitions cache reads (Phase 3). Every mutation on
* `_emdash_byline_fields` bumps this row; cached defs invalidate on a
* mismatch. Storing it in `options` (the same table `settings/index.ts`
* uses) means we get the request-cache + persisted-version pattern for
* free — no new infrastructure.
*
* Idempotency: every `CREATE TABLE` and `CREATE INDEX` uses
* `.ifNotExists()`, so a partial prior run (a crash mid-migration, retried
* after the runner's race-recovery path or after a manual fix) re-applies
* cleanly — including any indexes that landed in the failed pass after the
* table itself. A coarse table-level guard would skip the index step if the
* table existed but indexes didn't (the realistic crash window between
* `CREATE TABLE` and the next `CREATE INDEX`). The runner records applied
* migrations only after a successful pass, so a crashed-then-retried `up()`
* is the normal recovery path here.
*
* D1 has no transactions — the schema builder and `INSERT` for the
* version row execute one statement at a time. Order matters: parent
* tables first (`_emdash_byline_fields`), then the value tables that
* reference it. If `down()` runs after a partial `up()`, missing tables
* are tolerated (`DROP TABLE IF EXISTS`).
*/
async function up$49(db) {
	await db.schema.createTable("_emdash_byline_fields").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text", (col) => col.notNull().unique()).addColumn("label", "text", (col) => col.notNull()).addColumn("type", "text", (col) => col.notNull()).addColumn("required", "integer", (col) => col.notNull().defaultTo(0)).addColumn("translatable", "integer", (col) => col.notNull().defaultTo(1)).addColumn("validation", "text").addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0)).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx__emdash_byline_fields_sort_order").ifNotExists().on("_emdash_byline_fields").column("sort_order").execute();
	await db.schema.createTable("_emdash_byline_field_values").ifNotExists().addColumn("byline_id", "text", (col) => col.notNull().references("_emdash_bylines.id").onDelete("cascade")).addColumn("field_id", "text", (col) => col.notNull().references("_emdash_byline_fields.id").onDelete("cascade")).addColumn("value", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("_emdash_byline_field_values_pk", ["byline_id", "field_id"]).execute();
	await db.schema.createIndex("idx__emdash_byline_field_values_byline").ifNotExists().on("_emdash_byline_field_values").column("byline_id").execute();
	await db.schema.createIndex("idx__emdash_byline_field_values_field").ifNotExists().on("_emdash_byline_field_values").column("field_id").execute();
	await db.schema.createTable("_emdash_byline_field_group_values").ifNotExists().addColumn("translation_group", "text", (col) => col.notNull()).addColumn("field_id", "text", (col) => col.notNull().references("_emdash_byline_fields.id").onDelete("cascade")).addColumn("value", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("_emdash_byline_field_group_values_pk", ["translation_group", "field_id"]).execute();
	await db.schema.createIndex("idx__emdash_byline_field_group_values_group").ifNotExists().on("_emdash_byline_field_group_values").column("translation_group").execute();
	await db.schema.createIndex("idx__emdash_byline_field_group_values_field").ifNotExists().on("_emdash_byline_field_group_values").column("field_id").execute();
	await sql`
		INSERT INTO options (name, value) VALUES ('byline_fields_version', '0')
		ON CONFLICT (name) DO NOTHING
	`.execute(db);
}
/**
* Reverses the schema additions and removes the version-counter row.
* Used by the test suite and by `rollbackMigration`; the runner itself
* never invokes `down()` automatically.
*
* The drops are unconditional `IF EXISTS` so a `down()` after a partial
* `up()` (only one or two tables landed) still settles the database back
* to its pre-042 state.
*/
async function down$49(db) {
	await db.schema.dropTable("_emdash_byline_field_group_values").ifExists().execute();
	await db.schema.dropTable("_emdash_byline_field_values").ifExists().execute();
	await db.schema.dropTable("_emdash_byline_fields").ifExists().execute();
	await sql`DELETE FROM options WHERE name = 'byline_fields_version'`.execute(db);
}
var _043_content_references_exports = /* @__PURE__ */ __exportAll({
	down: () => down$48,
	up: () => up$48
});
/**
* Content references.
*
* `_emdash_relations` defines relationship types (row-per-locale, mirroring
* `_emdash_taxonomy_defs`): which collection is the parent, which is the child
* (the side that may multiply), and localized labels for each role.
*
* `_emdash_content_references` holds directed `parent → child` edges between
* content entries. Both endpoints and the relation are referenced by
* `translation_group`, so edges are locale-agnostic. As with
* `content_taxonomies`, group-linking precludes SQL foreign keys; referential
* cleanup is an application-layer concern.
*
* Idempotency: every `CREATE TABLE` and `CREATE INDEX` uses `.ifNotExists()`,
* so a partial prior run (a crash mid-migration, or a retry after the runner's
* race-recovery path) re-applies cleanly — including any indexes that landed in
* the failed pass after their table.
*/
async function up$48(db) {
	const defaultLocale = getI18nConfig()?.defaultLocale ?? "en";
	await db.schema.createTable("_emdash_relations").ifNotExists().addColumn("id", "text", (c) => c.primaryKey()).addColumn("name", "text", (c) => c.notNull()).addColumn("parent_collection", "text", (c) => c.notNull()).addColumn("child_collection", "text", (c) => c.notNull()).addColumn("parent_label", "text", (c) => c.notNull()).addColumn("child_label", "text", (c) => c.notNull()).addColumn("locale", "text", (c) => c.notNull().defaultTo(defaultLocale)).addColumn("translation_group", "text", (c) => c.notNull()).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addUniqueConstraint("_emdash_relations_name_locale_unique", ["name", "locale"]).execute();
	await db.schema.createIndex("idx__emdash_relations_locale").ifNotExists().on("_emdash_relations").column("locale").execute();
	await db.schema.createIndex("idx__emdash_relations_translation_group").ifNotExists().on("_emdash_relations").column("translation_group").execute();
	await db.schema.createIndex("idx__emdash_relations_parent_collection").ifNotExists().on("_emdash_relations").column("parent_collection").execute();
	await db.schema.createIndex("idx__emdash_relations_child_collection").ifNotExists().on("_emdash_relations").column("child_collection").execute();
	await db.schema.createIndex("idx__emdash_relations_group_locale_unique").ifNotExists().unique().on("_emdash_relations").columns(["translation_group", "locale"]).execute();
	await db.schema.createTable("_emdash_content_references").ifNotExists().addColumn("id", "text", (c) => c.primaryKey()).addColumn("relation_group", "text", (c) => c.notNull()).addColumn("parent_group", "text", (c) => c.notNull()).addColumn("child_group", "text", (c) => c.notNull()).addColumn("sort_order", "integer", (c) => c.notNull().defaultTo(0)).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addUniqueConstraint("content_references_unique", [
		"relation_group",
		"parent_group",
		"child_group"
	]).execute();
	await db.schema.createIndex("idx__emdash_content_references_parent").ifNotExists().on("_emdash_content_references").columns([
		"parent_group",
		"relation_group",
		"sort_order"
	]).execute();
	await db.schema.createIndex("idx__emdash_content_references_child").ifNotExists().on("_emdash_content_references").columns(["child_group", "relation_group"]).execute();
	await db.schema.createIndex("idx__emdash_content_references_relation").ifNotExists().on("_emdash_content_references").column("relation_group").execute();
}
async function down$48(db) {
	await db.schema.dropTable("_emdash_content_references").ifExists().execute();
	await db.schema.dropTable("_emdash_relations").ifExists().execute();
}
var _044_comment_reactions_exports = /* @__PURE__ */ __exportAll({
	down: () => down$47,
	up: () => up$47
});
/**
* Comment reactions (Tier 1 of the best-in-class comments RFC).
*
* One row per (comment, voter, reaction). Toggle semantics are enforced by the
* unique index — a voter either has a given reaction on a comment or doesn't.
* `voter_hash` is a salted SHA-256 of the visitor's IP (same primitive as
* `_emdash_comments.ip_hash`), so no cleartext identity is stored.
*
* Additive and backward-compatible: a new table, no change to existing schema.
*/
async function up$47(db) {
	await db.schema.createTable("_emdash_comment_reactions").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("comment_id", "text", (col) => col.notNull().references("_emdash_comments.id").onDelete("cascade")).addColumn("reaction", "text", (col) => col.notNull().defaultTo("like")).addColumn("voter_hash", "text", (col) => col.notNull()).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_comment_reactions_unique").ifNotExists().on("_emdash_comment_reactions").columns([
		"comment_id",
		"voter_hash",
		"reaction"
	]).unique().execute();
	await db.schema.createIndex("idx_comment_reactions_comment").ifNotExists().on("_emdash_comment_reactions").column("comment_id").execute();
	await db.schema.createIndex("idx_comment_reactions_voter").ifNotExists().on("_emdash_comment_reactions").columns(["voter_hash", "created_at"]).execute();
}
async function down$47(db) {
	await db.schema.dropTable("_emdash_comment_reactions").execute();
}
var _045_taxonomy_parent_group_exports = /* @__PURE__ */ __exportAll({
	down: () => down$46,
	up: () => up$46
});
/**
* Store the parent's `translation_group` in `taxonomies.parent_id` instead of a
* locale-bound row id.
*
* Before this, a term's `parent_id` pointed at one specific parent *row* (one
* locale). A child translated in another locale could end up parented to a row
* in a different locale, silently flattening that locale's tree (#1347). Every
* other taxonomy i18n relationship already keys off `translation_group`
* (`content_taxonomies.taxonomy_id`, `_emdash_menu_items.reference_id`), so this
* aligns parentage with that model: a child links to the parent *concept* and
* stays nested in whichever locale that parent has been translated into.
*
* Backfill rewrites every existing `parent_id` from the referenced parent row's
* id to that parent's `translation_group`. A `translation_group` normally equals
* its anchor row's id, so the self-FK on `parent_id` stays valid. We only
* rewrite when that anchor row still exists; if a parent's anchor was deleted
* but a sibling translation survives, the existing locale-bound id is left as-is
* rather than rewritten to a dangling FK value. Such a child then renders as a
* root rather than nested — an accepted degradation for an already-inconsistent
* dataset (its `translation_group` already points at a deleted row, which breaks
* `content_taxonomies` joins too). New deletes can't recreate this state: a
* parent with children in any locale is undeletable. The correlated subquery is
* a no-op for rows that already hold a group (an anchor row's id resolves to
* itself), so the migration is safe to re-run.
*
* Dialect-independent: the correlated-subquery `UPDATE` runs on SQLite (incl.
* D1) and Postgres alike.
*/
async function up$46(db) {
	await sql`
		UPDATE taxonomies
		SET parent_id = (
			SELECT p.translation_group FROM taxonomies p WHERE p.id = taxonomies.parent_id
		)
		WHERE parent_id IS NOT NULL
			AND EXISTS (
				SELECT 1 FROM taxonomies p
				WHERE p.id = taxonomies.parent_id
					AND p.translation_group IS NOT NULL
					-- Only rewrite to a translation_group that is itself a live row
					-- id, so the self-FK on parent_id can never dangle.
					AND EXISTS (SELECT 1 FROM taxonomies a WHERE a.id = p.translation_group)
			)
	`.execute(db);
}
/**
* Map each `parent_id` group back to the row id of the parent in the same
* locale (the pre-migration shape). Rows with no same-locale parent are left as
* they are rather than nulled, so a rollback never silently detaches a subtree.
*/
async function down$46(db) {
	await sql`
		UPDATE taxonomies
		SET parent_id = COALESCE(
			(
				SELECT c.id FROM taxonomies c
				WHERE c.translation_group = taxonomies.parent_id
					AND c.locale = taxonomies.locale
			),
			parent_id
		)
		WHERE parent_id IS NOT NULL
	`.execute(db);
}
var _046_media_usage_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$45,
	up: () => up$45
});
/**
* Internal media usage projection tables.
*
* This migration is DDL-only by design: no backfill, no runtime media/indexing
* imports, and no content-table scans. Production rows are introduced by later
* phases once the central snapshot/indexer path is reviewed.
*/
async function up$45(db) {
	await db.schema.createTable("_emdash_media_usage_sources").ifNotExists().addColumn("source_key", "text", (c) => c.primaryKey()).addColumn("source_type", "text", (c) => c.notNull()).addColumn("collection_slug", "text").addColumn("content_id", "text").addColumn("source_variant", "text", (c) => c.notNull()).addColumn("locale", "text").addColumn("translation_group", "text").addColumn("content_slug", "text").addColumn("content_title", "text").addColumn("content_status", "text").addColumn("content_scheduled_at", "text").addColumn("content_deleted_at", "text").addColumn("revision_id", "text").addColumn("current_generation", "text", (c) => c.notNull()).addColumn("schema_version", "integer", (c) => c.notNull().defaultTo(1)).addColumn("indexed_at", "text", (c) => c.notNull().defaultTo(currentTimestamp(db))).addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_content").ifNotExists().on("_emdash_media_usage_sources").columns([
		"source_type",
		"collection_slug",
		"content_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_variant").ifNotExists().on("_emdash_media_usage_sources").columns(["source_type", "source_variant"]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_locale").ifNotExists().on("_emdash_media_usage_sources").columns(["collection_slug", "locale"]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_deleted").ifNotExists().on("_emdash_media_usage_sources").column("content_deleted_at").execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_translation_group").ifNotExists().on("_emdash_media_usage_sources").columns(["collection_slug", "translation_group"]).execute();
	await db.schema.createTable("_emdash_media_usage").ifNotExists().addColumn("id", "text", (c) => c.primaryKey()).addColumn("source_key", "text", (c) => c.notNull()).addColumn("generation", "text", (c) => c.notNull()).addColumn("field_slug", "text", (c) => c.notNull()).addColumn("field_path", "text", (c) => c.notNull()).addColumn("occurrence_index", "integer", (c) => c.notNull().defaultTo(0)).addColumn("reference_type", "text", (c) => c.notNull()).addColumn("media_id", "text").addColumn("provider", "text", (c) => c.notNull().defaultTo("local")).addColumn("provider_asset_id", "text", (c) => c.notNull()).addColumn("media_kind", "text").addColumn("mime_type", "text").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx__emdash_media_usage_unique_occurrence").ifNotExists().unique().on("_emdash_media_usage").columns([
		"source_key",
		"generation",
		"field_path",
		"occurrence_index"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_media_id").ifNotExists().on("_emdash_media_usage").column("media_id").execute();
	await db.schema.createIndex("idx__emdash_media_usage_provider_asset").ifNotExists().on("_emdash_media_usage").columns(["provider", "provider_asset_id"]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_source_generation").ifNotExists().on("_emdash_media_usage").columns(["source_key", "generation"]).execute();
}
async function down$45(db) {
	await db.schema.dropTable("_emdash_media_usage").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_sources").ifExists().execute();
}
var _047_restore_taxonomy_parent_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$44,
	up: () => up$44
});
/**
* Restore `idx_taxonomies_parent` on `taxonomies(parent_id)` (#1665).
*
* Migration 015 created this index, but 036's SQLite table rebuild
* (`taxonomies_new` → drop → rename) dropped every index attached to the old
* table and only recreated `name`/`locale`/`translation_group`. The parent
* index — which backs hierarchical (parent/child) lookups — was silently lost
* on any install migrated through 036. The Postgres path in 036 alters the
* table in place and keeps its indexes, so it is unaffected; `ifNotExists`
* makes this a no-op there.
*
* Forward-only: 036 has already shipped, so existing installs only recover the
* index here. Fresh installs also get it in 036's rebuild for parity with the
* other rebuilt tables, making this a no-op for them.
*/
async function up$44(db) {
	await db.schema.createIndex("idx_taxonomies_parent").ifNotExists().on("taxonomies").column("parent_id").execute();
}
async function down$44(db) {
	await db.schema.dropIndex("idx_taxonomies_parent").ifExists().execute();
}
var _048_restore_content_taxonomies_term_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$43,
	up: () => up$43
});
/**
* Restore `idx_content_taxonomies_term` on `content_taxonomies(taxonomy_id)` (#1701).
*
* Migration 015 created this index. 036's SQLite/D1 table rebuild recreated it,
* but the recreate was gated behind an FK-presence early-return: if a first run
* committed the rebuild (stripping the FK and dropping the old index) and then
* failed before the recreate, the retry saw zero FKs, skipped the whole body,
* and never restored the index — while 036 was still recorded as applied. The
* result was an install missing only this one index, with no forward migration
* to recover it (the sibling `idx_taxonomies_parent` case was fixed by 047).
*
* 036 has since been fixed to recreate the index unconditionally, so fresh
* installs are fine. This recovers the index on installs that hit the trap
* before that fix. The Postgres path in 036 alters in place and keeps its
* indexes, so it is unaffected; `ifNotExists` makes this a no-op there.
*
* Forward-only.
*/
async function up$43(db) {
	await db.schema.createIndex("idx_content_taxonomies_term").ifNotExists().on("content_taxonomies").column("taxonomy_id").execute();
}
async function down$43(db) {
	await db.schema.dropIndex("idx_content_taxonomies_term").ifExists().execute();
}
var _049_taxonomies_name_locale_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$42,
	up: () => up$42
});
/**
* Add composite `idx_taxonomies_name_locale` on `taxonomies(name, locale)` (#1723).
*
* `TaxonomyRepository.findByName` filters `WHERE name = ? AND locale = ?`, but
* the only indexes were the single-column `idx_taxonomies_name(name)` and
* `idx_taxonomies_locale(locale)`. On SQLite/D1 with no `sqlite_stat1` the
* planner picks `idx_taxonomies_locale` and reads *every* term in the locale,
* filtering `name` in memory — once per facet rendered. On a site where one
* taxonomy dominates a locale, each small facet still walks the whole locale.
*
* The composite resolves both equalities, so the planner searches only the one
* taxonomy's terms. Its leftmost prefix (`name`) also serves every name-only
* lookup, so it supersedes `idx_taxonomies_name`, which we drop. The
* single-column `idx_taxonomies_locale` stays for locale-only lookups.
*
* Strictly additive: no query changes, and the dropped index is fully covered
* by the new composite's prefix. Create-before-drop keeps name lookups indexed
* at every point. Both statements are idempotent so a partial apply can retry.
*/
async function up$42(db) {
	await db.schema.createIndex("idx_taxonomies_name_locale").ifNotExists().on("taxonomies").columns(["name", "locale"]).execute();
	await db.schema.dropIndex("idx_taxonomies_name").ifExists().execute();
}
async function down$42(db) {
	await db.schema.createIndex("idx_taxonomies_name").ifNotExists().on("taxonomies").column("name").execute();
	await db.schema.dropIndex("idx_taxonomies_name_locale").ifExists().execute();
}
var _050_media_usage_index_status_exports = /* @__PURE__ */ __exportAll({
	down: () => down$41,
	up: () => up$41
});
var SOURCE_TABLE = "_emdash_media_usage_sources";
var DUPLICATE_COLUMN_RE$3 = /(?:duplicate column|column .* already exists|already exists.*column)/i;
/**
* Media usage index metadata.
*
* DDL-only by design: adds freshness/completeness metadata and scope status
* tracking for later reference-index reconciliation. No content scans, no
* runtime imports, and no backfill.
*/
async function up$41(db) {
	await addSourceMetadataColumns(db);
	await db.schema.createTable("_emdash_media_usage_index_status").ifNotExists().addColumn("adapter_id", "text", (c) => c.notNull()).addColumn("scope_type", "text", (c) => c.notNull()).addColumn("scope_key", "text", (c) => c.notNull()).addColumn("status", "text", (c) => c.notNull()).addColumn("schema_version", "integer", (c) => c.notNull().defaultTo(1)).addColumn("started_at", "text").addColumn("completed_at", "text").addColumn("cursor", "text").addColumn("indexed_source_count", "integer", (c) => c.notNull().defaultTo(0)).addColumn("failed_source_count", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_error_code", "text").addColumn("updated_at", "text", (c) => c.notNull().defaultTo(currentTimestamp(db))).addPrimaryKeyConstraint("_emdash_media_usage_index_status_pk", [
		"adapter_id",
		"scope_type",
		"scope_key"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_completeness").ifNotExists().on("_emdash_media_usage_sources").columns([
		"source_type",
		"collection_slug",
		"source_completeness"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_fingerprint").ifNotExists().on("_emdash_media_usage_sources").column("source_fingerprint").execute();
	await db.schema.createIndex("idx__emdash_media_usage_index_status_status").ifNotExists().on("_emdash_media_usage_index_status").columns(["adapter_id", "status"]).execute();
}
async function down$41(db) {
	await db.schema.dropIndex("idx__emdash_media_usage_index_status_status").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_sources_fingerprint").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_sources_completeness").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_index_status").ifExists().execute();
	await dropSourceMetadataColumns(db);
}
async function addSourceMetadataColumns(db) {
	await addColumnIfMissing$2(db, "source_updated_at", () => db.schema.alterTable(SOURCE_TABLE).addColumn("source_updated_at", "text").execute());
	await addColumnIfMissing$2(db, "source_version", () => db.schema.alterTable(SOURCE_TABLE).addColumn("source_version", "integer").execute());
	await addColumnIfMissing$2(db, "source_fingerprint", () => db.schema.alterTable(SOURCE_TABLE).addColumn("source_fingerprint", "text").execute());
	await addColumnIfMissing$2(db, "source_completeness", () => db.schema.alterTable(SOURCE_TABLE).addColumn("source_completeness", "text", (c) => c.notNull().defaultTo("unknown")).execute());
	await addColumnIfMissing$2(db, "last_attempted_at", () => db.schema.alterTable(SOURCE_TABLE).addColumn("last_attempted_at", "text").execute());
	await addColumnIfMissing$2(db, "last_error_code", () => db.schema.alterTable(SOURCE_TABLE).addColumn("last_error_code", "text").execute());
}
async function addColumnIfMissing$2(db, columnName, addColumn) {
	if (await columnExists(db, SOURCE_TABLE, columnName)) return;
	try {
		await addColumn();
	} catch (error) {
		if (DUPLICATE_COLUMN_RE$3.test(deepErrorMessage$4(error))) {
			if (await columnExists(db, SOURCE_TABLE, columnName)) return;
		}
		throw error;
	}
}
function deepErrorMessage$4(error) {
	if (error instanceof Error) {
		const own = error.message ?? "";
		if (error.cause) {
			const causeMessage = deepErrorMessage$4(error.cause);
			return own ? `${own}: ${causeMessage}` : causeMessage;
		}
		return own;
	}
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
async function dropSourceMetadataColumns(db) {
	for (const columnName of [
		"last_error_code",
		"last_attempted_at",
		"source_completeness",
		"source_fingerprint",
		"source_version",
		"source_updated_at"
	]) if (await columnExists(db, SOURCE_TABLE, columnName)) await db.schema.alterTable(SOURCE_TABLE).dropColumn(columnName).execute();
}
var _051_content_taxonomies_denorm_exports = /* @__PURE__ */ __exportAll({
	down: () => down$40,
	up: () => up$40
});
/**
* Denormalize the filter + sort columns from `ec_*` onto `content_taxonomies`
* and mirror `ec_*`'s composite sort indexes onto the pivot (#1834).
*
* A taxonomy-filtered listing used to apply the term filter as a correlated
* `EXISTS` on `SELECT * FROM ec_<collection> … ORDER BY … LIMIT ?`. The pivot
* carried only `(collection, entry_id, taxonomy_id)`, so the filter
* (`deleted_at`, `status`, `locale`) and the sort (`published_at`/`created_at`)
* could only be evaluated on the `ec_*` row. On stats-blind SQLite/D1 a
* selective term never fills the `LIMIT`, so the query walked the whole
* collection (~75k D1 rows read for a one-row page).
*
* Copying those columns onto the pivot and indexing them keyed by
* `(taxonomy_id, collection, …)` lets the loader seek the term and walk a
* sort-ordered pivot index, short-circuiting on `LIMIT`, then touch `ec_*` only
* by primary key to hydrate the page.
*
* The columns are advisory (D1 has no transactions; the write-path re-stamp is
* non-atomic), so the read path re-checks the real predicates on the joined
* `ec_*` row — see loader.ts. `updated_at` is deliberately not denormalized: it
* moves on every edit and is seldom a public sort, so its write cost outweighs
* its read value; `updated_at`-sorted taxonomy listings temp-sort instead.
*
* Order matters: add the columns, backfill, THEN build the indexes so each
* index is built once over populated data rather than maintained through the
* backfill `UPDATE`.
*
* Forward-only.
*/
var DENORM_COLUMNS = [
	"status",
	"scheduled_at",
	"deleted_at",
	"locale",
	"published_at",
	"created_at"
];
var INDEXES = [
	{
		name: "idx_content_taxonomies_pub",
		columns: "taxonomy_id, collection, deleted_at, published_at DESC, entry_id DESC"
	},
	{
		name: "idx_content_taxonomies_crt",
		columns: "taxonomy_id, collection, deleted_at, created_at DESC, entry_id DESC"
	},
	{
		name: "idx_content_taxonomies_loc_pub",
		columns: "taxonomy_id, collection, deleted_at, locale, published_at DESC, entry_id DESC"
	},
	{
		name: "idx_content_taxonomies_loc_crt",
		columns: "taxonomy_id, collection, deleted_at, locale, created_at DESC, entry_id DESC"
	}
];
async function up$40(db) {
	for (const column of DENORM_COLUMNS) {
		if (await columnExists(db, "content_taxonomies", column)) continue;
		await sql`
			ALTER TABLE content_taxonomies ADD COLUMN ${sql.ref(column)} TEXT
		`.execute(db);
	}
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		validateIdentifier(tableName, "content table name");
		const slug = tableName.slice(3);
		await sql`
			UPDATE content_taxonomies
			SET (status, scheduled_at, deleted_at, locale, published_at, created_at) = (
				SELECT status, scheduled_at, deleted_at, locale, published_at, created_at
				FROM ${sql.ref(tableName)}
				WHERE ${sql.ref(tableName)}.id = content_taxonomies.entry_id
			)
			WHERE collection = ${slug}
		`.execute(db);
	}
	for (const index of INDEXES) await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(index.name)}
			ON content_taxonomies (${sql.raw(index.columns)})
		`.execute(db);
}
async function down$40(db) {
	for (const index of INDEXES) await sql`DROP INDEX IF EXISTS ${sql.ref(index.name)}`.execute(db);
	for (const column of DENORM_COLUMNS) await sql`
			ALTER TABLE content_taxonomies DROP COLUMN ${sql.ref(column)}
		`.execute(db);
}
var _052_media_usage_read_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$39,
	up: () => up$39
});
var OLD_INDEX = "idx__emdash_media_usage_media_id";
var READ_INDEX = "idx__emdash_media_usage_media_source_generation";
async function up$39(db) {
	await db.schema.createIndex(READ_INDEX).ifNotExists().on("_emdash_media_usage").columns([
		"media_id",
		"source_key",
		"generation"
	]).execute();
	await db.schema.dropIndex(OLD_INDEX).ifExists().execute();
}
async function down$39(db) {
	await db.schema.createIndex(OLD_INDEX).ifNotExists().on("_emdash_media_usage").column("media_id").execute();
	await db.schema.dropIndex(READ_INDEX).ifExists().execute();
}
var _053_plugin_mcp_tools_exports = /* @__PURE__ */ __exportAll({
	down: () => down$38,
	up: () => up$38
});
/** Persist explicit per-plugin MCP enablement and the declaration consented to by an admin. */
async function up$38(db) {
	if (!await columnExists(db, "_plugin_state", "mcp_tools_enabled")) await db.schema.alterTable("_plugin_state").addColumn("mcp_tools_enabled", "integer", (col) => col.notNull().defaultTo(0)).execute();
	if (!await columnExists(db, "_plugin_state", "mcp_tools_consent")) await db.schema.alterTable("_plugin_state").addColumn("mcp_tools_consent", "text").execute();
}
async function down$38(db) {
	await db.schema.alterTable("_plugin_state").dropColumn("mcp_tools_consent").execute();
	await db.schema.alterTable("_plugin_state").dropColumn("mcp_tools_enabled").execute();
}
var _054_media_upload_attempts_exports = /* @__PURE__ */ __exportAll({
	down: () => down$37,
	up: () => up$37
});
async function up$37(db) {
	await db.schema.createTable("_emdash_media_upload_attempts").ifNotExists().addColumn("storage_key", "text", (col) => col.primaryKey()).addColumn("media_id", "text", (col) => col.notNull()).addColumn("status", "text", (col) => col.notNull().defaultTo("active")).addColumn("created_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db))).execute();
	await db.schema.createIndex("idx_media_upload_attempts_media_id").ifNotExists().on("_emdash_media_upload_attempts").column("media_id").execute();
	await db.schema.createIndex("idx_media_upload_attempts_status_created_at").ifNotExists().on("_emdash_media_upload_attempts").columns(["status", "created_at"]).execute();
	await db.schema.createIndex("idx_media_storage_key").ifNotExists().on("media").column("storage_key").execute();
}
async function down$37(db) {
	await db.schema.dropIndex("idx_media_storage_key").ifExists().execute();
	await db.schema.dropTable("_emdash_media_upload_attempts").ifExists().execute();
}
var _055_content_translation_group_locale_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$36,
	up: () => up$36
});
/**
* Migration: replace the single-column content `translation_group` index with
* one index per translation-group read shape.
*
* There are two shapes. Translation-group reads filter `deleted_at IS NULL`
* with `translation_group = ?` / `IN (...)` and order by locale; menu and
* reference resolution looks a group up by `translation_group` (+ `locale`)
* alone, with no `deleted_at` term.
*
* Neither shape can borrow the other's index. Seeking migration 041's
* `(deleted_at, locale, ...)` composites on `deleted_at` alone already returns
* rows in locale order, so a stats-blind planner prefers them over a
* single-column `translation_group` index and reads every non-deleted row in
* the table; the batched variant is worse still, because the `IN (...)` list
* multiplies the planner's row estimate for a `translation_group`-leading index
* and it falls back to a `deleted_at` composite from a handful of groups
* onward. Going the other way, an index leading with `deleted_at` cannot seek a
* lookup that never constrains that column. D1 never has `sqlite_stat1`, so the
* index shape is the only lever and each shape needs a prefix matching it term
* for term.
*
* Forward-only and idempotent (`IF NOT EXISTS`).
*
* Index names use short `tg_locale` / `del_tg_locale` suffixes rather than
* spelling out `translation_group`: Postgres truncates identifiers to 63 bytes,
* and the longer forms truncate to the same value for long collection slugs.
* Keep these identical to the names in `schema/registry.ts`.
*/
async function up$36(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_tg_locale`)}
			ON ${sql.ref(tableName)} (translation_group, locale)
		`.execute(db);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_del_tg_locale`)}
			ON ${sql.ref(tableName)} (deleted_at, translation_group, locale)
		`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_translation_group`)}`.execute(db);
	}
}
async function down$36(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_translation_group`)}
			ON ${sql.ref(tableName)} (translation_group)
		`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_del_tg_locale`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_tg_locale`)}`.execute(db);
	}
}
var _056_taxonomy_term_sort_order_exports = /* @__PURE__ */ __exportAll({
	down: () => down$35,
	up: () => up$35
});
/**
* Add `taxonomies.sort_order` and mint a position for every existing term.
*
* A position belongs to a `translation_group`, not a row: every row of a group
* carries the same value. Groups are numbered by `(label, id)` — the order term
* listings used before this migration — taking the label from the group's lowest
* row id. That locale's rendered order is unchanged; every other locale is
* re-sorted to match it, since only one locale's collation can win.
*
* Sibling groups are keyed on the raw `parent_id` column, which holds the
* parent's translation_group, so a group whose rows disagree about their parent
* is reconciled before numbering — otherwise it lands in whichever sibling group
* one arbitrary row happens to name.
*
* Only the `ALTER` is guarded; the passes below run unconditionally so a run that
* dies partway can be retried. Guarding the whole migration strands a partial
* numbering, because the retry early-returns on the column it added.
*/
/**
* Translation groups per `UPDATE`. Each costs three bound parameters — a CASE
* `WHEN`/`THEN` pair plus one slot in the `IN` list — which keeps a statement
* inside D1's 100-parameter ceiling. Writing one group per statement instead
* spends a subrequest per term, and a large taxonomy exhausts the 1,000 a
* Worker gets on the free plan before the migration finishes.
*/
var GROUPS_PER_UPDATE = 32;
async function up$35(db) {
	const fresh = !await columnExists(db, "taxonomies", "sort_order");
	if (fresh) await db.schema.alterTable("taxonomies").addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0)).execute();
	await sql`UPDATE taxonomies SET translation_group = id WHERE translation_group IS NULL`.execute(db);
	const { rows } = await sql`
		SELECT id, name, label, parent_id, translation_group FROM taxonomies
	`.execute(db);
	await repairParents(db, rows);
	await mintPositions(db, rows, fresh);
}
/**
* Give every row of a translation_group the same `parent_id`, mutating `rows` so
* the numbering below sees the reconciled tree.
*
* `parent_id` holds the parent's translation_group, so it is locale-agnostic and
* a group's rows should all agree. Reparenting used to write a single row, which
* left a term nested in the locale it was moved in and a root everywhere else.
* A non-null parent wins: it is the move somebody made, and the null is the row
* that missed it.
*
* The winner is copied from a sibling row, so it already satisfies the self-FK
* on `parent_id` and can't be rewritten into a dangling reference.
*/
async function repairParents(db, rows) {
	const byGroup = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const group = row.translation_group;
		let members = byGroup.get(group);
		if (!members) byGroup.set(group, members = []);
		members.push(row);
	}
	const winners = /* @__PURE__ */ new Map();
	for (const [group, members] of byGroup) {
		if (new Set(members.map((member) => member.parent_id)).size < 2) continue;
		const parented = members.filter((member) => member.parent_id !== null);
		const winner = (parented.find((member) => member.id === group) ?? parented.toSorted((a, b) => a.id.localeCompare(b.id))[0])?.parent_id;
		if (winner === void 0 || winner === null) continue;
		winners.set(group, winner);
		for (const member of members) member.parent_id = winner;
	}
	await applyByGroup(db, "parent_id", winners);
}
/**
* Number each sibling group by `(label, id)`.
*
* When the column was just added every row already reads 0, so those positions
* are left to the default. On a retry the column is already there and may hold
* numbers from the run that failed, so every position is written explicitly.
*/
async function mintPositions(db, rows, fresh) {
	const groups = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const group = row.translation_group;
		const chosen = groups.get(group);
		if (chosen && chosen.id <= row.id) continue;
		groups.set(group, {
			sibling: row.name + "/" + (row.parent_id ?? ""),
			label: row.label ?? "",
			id: row.id
		});
	}
	const siblings = /* @__PURE__ */ new Map();
	for (const [group, { sibling, label, id }] of groups) {
		let members = siblings.get(sibling);
		if (!members) siblings.set(sibling, members = []);
		members.push({
			group,
			label,
			id
		});
	}
	const positions = /* @__PURE__ */ new Map();
	for (const members of siblings.values()) {
		members.sort((a, b) => a.label.localeCompare(b.label) || a.id.localeCompare(b.id));
		for (const [position, member] of members.entries()) {
			if (position === 0 && fresh) continue;
			positions.set(member.group, position);
		}
	}
	await applyByGroup(db, "sort_order", positions);
}
/**
* Set one column per translation_group, chunked to stay inside the parameter
* ceiling.
*/
async function applyByGroup(db, column, values) {
	const entries = [...values];
	const valueType = column === "sort_order" ? sql`INTEGER` : sql`TEXT`;
	for (let index = 0; index < entries.length; index += GROUPS_PER_UPDATE) {
		const chunk = entries.slice(index, index + GROUPS_PER_UPDATE);
		const arms = sql.join(chunk.map(([group, value]) => sql`WHEN ${group} THEN CAST(${value} AS ${valueType})`), sql` `);
		const keys = sql.join(chunk.map(([group]) => sql`${group}`));
		await sql`
			UPDATE taxonomies
			SET ${sql.ref(column)} = CASE translation_group ${arms} END
			WHERE translation_group IN (${keys})
		`.execute(db);
	}
}
async function down$35(db) {
	if (await columnExists(db, "taxonomies", "sort_order")) await db.schema.alterTable("taxonomies").dropColumn("sort_order").execute();
}
var _057_collection_hidden_exports = /* @__PURE__ */ __exportAll({
	down: () => down$34,
	up: () => up$34
});
/**
* Migration: hide a collection from the admin sidebar.
*
* Adds `hidden` to `_emdash_collections`. A hidden collection stays fully
* functional (REST API, MCP, plugin hooks, direct `/content/:collection`
* URLs) — only its auto-generated sidebar entry is omitted, so plugins that
* own a collection end to end can steer editors to their own admin UI.
*/
async function up$34(db) {
	if (!await columnExists(db, "_emdash_collections", "hidden")) await db.schema.alterTable("_emdash_collections").addColumn("hidden", "integer", (col) => col.notNull().defaultTo(0)).execute();
}
async function down$34(db) {
	await db.schema.alterTable("_emdash_collections").dropColumn("hidden").execute();
}
var _058_collection_sort_order_exports = /* @__PURE__ */ __exportAll({
	down: () => down$33,
	up: () => up$33
});
/**
* Migration: explicit collection order in the admin sidebar.
*
* Adds `sort_order` to `_emdash_collections`. A NULL `sort_order` means no
* explicit position: those collections sort after the ordered ones, keeping
* the alphabetical-by-slug order.
*/
async function up$33(db) {
	if (!await columnExists(db, "_emdash_collections", "sort_order")) await db.schema.alterTable("_emdash_collections").addColumn("sort_order", "integer").execute();
}
async function down$33(db) {
	await db.schema.alterTable("_emdash_collections").dropColumn("sort_order").execute();
}
var _059_revision_prune_queue_exports = /* @__PURE__ */ __exportAll({
	down: () => down$32,
	up: () => up$32
});
var REVISION_KEEP_COUNT = 50;
async function up$32(db) {
	await db.schema.createTable("_emdash_revision_prune_queue").ifNotExists().addColumn("collection", "text", (column) => column.notNull()).addColumn("entry_id", "text", (column) => column.notNull()).addColumn("revision_id", "text", (column) => column.notNull()).addPrimaryKeyConstraint("revision_prune_queue_pk", ["collection", "entry_id"]).execute();
	await db.schema.createIndex("idx_revision_prune_queue_revision_id").ifNotExists().on("_emdash_revision_prune_queue").column("revision_id").execute();
	await sql`
		INSERT INTO _emdash_revision_prune_queue (collection, entry_id, revision_id)
		SELECT collection, entry_id, MAX(id)
		FROM revisions
		WHERE true
		GROUP BY collection, entry_id
		HAVING COUNT(*) > ${REVISION_KEEP_COUNT}
		ON CONFLICT (collection, entry_id)
		DO UPDATE SET revision_id = excluded.revision_id
	`.execute(db);
}
async function down$32(db) {
	await db.schema.dropTable("_emdash_revision_prune_queue").ifExists().execute();
}
var _060_collection_admin_config_exports = /* @__PURE__ */ __exportAll({
	down: () => down$31,
	up: () => up$31
});
/** Persist collection-level admin presentation options. */
async function up$31(db) {
	if (!await columnExists(db, "_emdash_collections", "admin_config")) await db.schema.alterTable("_emdash_collections").addColumn("admin_config", "text").execute();
}
async function down$31(db) {
	if (await columnExists(db, "_emdash_collections", "admin_config")) await db.schema.alterTable("_emdash_collections").dropColumn("admin_config").execute();
}
var _061_media_usage_cleanup_exports = /* @__PURE__ */ __exportAll({
	down: () => down$30,
	up: () => up$30
});
var CLEANUP_TASK_KEY = "projection_gc";
var INITIAL_ELIGIBLE_AT = "1970-01-01T00:00:00.000Z";
async function up$30(db) {
	await db.schema.createIndex("idx__emdash_media_usage_cleanup_scan").ifNotExists().on("_emdash_media_usage").columns([
		"created_at",
		"id",
		"source_key",
		"generation"
	]).execute();
	await db.schema.createTable("_emdash_media_usage_cleanup").ifNotExists().addColumn("task_key", "text", (c) => c.primaryKey()).addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("next_eligible_at", "text", (c) => c.notNull()).addColumn("cursor_created_at", "text").addColumn("cursor_id", "text").addColumn("scan_before_at", "text").addColumn("consecutive_failures", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_started_at", "text").addColumn("last_completed_at", "text").addColumn("last_candidate_count", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_deleted_orphans", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_deleted_stale", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_deleted_abandoned", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_deleted_write_leases", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_backlog_lower_bound", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_scan_has_more", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_duration_ms", "integer", (c) => c.notNull().defaultTo(0)).addColumn("last_error_code", "text").addColumn("updated_at", "text", (c) => c.notNull().defaultTo(currentTimestamp(db))).execute();
	await db.schema.createTable("_emdash_media_usage_generation_writes").ifNotExists().addColumn("source_key", "text", (c) => c.notNull()).addColumn("generation", "text", (c) => c.notNull()).addColumn("lease_token", "text", (c) => c.primaryKey()).addColumn("expires_at", "text", (c) => c.notNull()).addColumn("created_at", "text", (c) => c.notNull().defaultTo(currentTimestamp(db))).addUniqueConstraint("_emdash_media_usage_generation_writes_source_generation", ["source_key", "generation"]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_generation_writes_expiry").ifNotExists().on("_emdash_media_usage_generation_writes").columns(["expires_at", "lease_token"]).execute();
	await sql`
		INSERT INTO _emdash_media_usage_cleanup (task_key, next_eligible_at)
		VALUES (${CLEANUP_TASK_KEY}, ${INITIAL_ELIGIBLE_AT})
		ON CONFLICT (task_key) DO NOTHING
	`.execute(db);
}
async function down$30(db) {
	await db.schema.dropIndex("idx__emdash_media_usage_generation_writes_expiry").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_generation_writes").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_cleanup").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_cleanup_scan").ifExists().execute();
}
var _062_media_usage_cleanup_fence_exports = /* @__PURE__ */ __exportAll({
	down: () => down$29,
	up: () => up$29
});
async function up$29(db) {
	if (!await columnExists(db, "_emdash_media_usage", "cleanup_lease_token")) await db.schema.alterTable("_emdash_media_usage").addColumn("cleanup_lease_token", "text").execute();
	await db.schema.createTable("_emdash_media_usage_cleanup_fence").ifNotExists().addColumn("task_key", "text", (c) => c.primaryKey()).addColumn("generation_floor", "text", (c) => c.notNull()).addColumn("updated_at", "text", (c) => c.notNull().defaultTo(currentTimestamp(db))).execute();
	if (isPostgres(db)) {
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_record_cleanup_fence ON _emdash_media_usage").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_update ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_insert ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_update ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_insert ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_delete ON _emdash_media_usage_sources").execute(db);
		await sql.raw(`
			CREATE OR REPLACE FUNCTION emdash_media_usage_lock_cleanup()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				PERFORM 1
				FROM _emdash_media_usage_cleanup AS cleanup
				WHERE cleanup.task_key = 'projection_gc'
				FOR SHARE;
				RETURN NULL;
			END;
			$$
		`).execute(db);
		await sql.raw(`
			CREATE OR REPLACE FUNCTION emdash_media_usage_fence_source_generation()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				IF EXISTS (
					SELECT 1
					FROM _emdash_media_usage_cleanup_fence AS fence
					WHERE fence.task_key = 'projection_gc'
						AND NEW.current_generation <= fence.generation_floor
				) AND NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_generation_writes AS writer
					WHERE writer.source_key = NEW.source_key
						AND writer.generation = NEW.current_generation
						AND writer.expires_at::timestamptz > clock_timestamp()
				) THEN
					RETURN NULL;
				END IF;
				RETURN NEW;
			END;
			$$
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_lock_cleanup_insert
			BEFORE INSERT ON _emdash_media_usage_sources
			FOR EACH STATEMENT
			EXECUTE FUNCTION emdash_media_usage_lock_cleanup()
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_lock_cleanup_update
			BEFORE UPDATE OF current_generation ON _emdash_media_usage_sources
			FOR EACH STATEMENT
			EXECUTE FUNCTION emdash_media_usage_lock_cleanup()
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_lock_cleanup_delete
			BEFORE DELETE ON _emdash_media_usage_sources
			FOR EACH STATEMENT
			EXECUTE FUNCTION emdash_media_usage_lock_cleanup()
		`).execute(db);
		await sql.raw(`
			CREATE OR REPLACE FUNCTION emdash_media_usage_record_cleanup_fence()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				IF OLD.cleanup_lease_token IS NOT NULL AND EXISTS (
					SELECT 1
					FROM _emdash_media_usage_cleanup AS cleanup
					WHERE cleanup.task_key = 'projection_gc'
						AND cleanup.lease_token = OLD.cleanup_lease_token
				) THEN
					INSERT INTO _emdash_media_usage_cleanup_fence (
						task_key,
						generation_floor,
						updated_at
					)
					VALUES ('projection_gc', OLD.generation, CURRENT_TIMESTAMP::text)
					ON CONFLICT (task_key) DO UPDATE SET
						generation_floor = CASE
							WHEN EXCLUDED.generation_floor > _emdash_media_usage_cleanup_fence.generation_floor
							THEN EXCLUDED.generation_floor
							ELSE _emdash_media_usage_cleanup_fence.generation_floor
						END,
						updated_at = EXCLUDED.updated_at;
				END IF;
				RETURN OLD;
			END;
			$$
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_fence_source_generation_insert
			BEFORE INSERT ON _emdash_media_usage_sources
			FOR EACH ROW
			EXECUTE FUNCTION emdash_media_usage_fence_source_generation()
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_fence_source_generation_update
			BEFORE UPDATE OF current_generation ON _emdash_media_usage_sources
			FOR EACH ROW
			EXECUTE FUNCTION emdash_media_usage_fence_source_generation()
		`).execute(db);
		await sql.raw(`
			CREATE TRIGGER emdash_media_usage_record_cleanup_fence
			BEFORE DELETE ON _emdash_media_usage
			FOR EACH ROW
			WHEN (OLD.cleanup_lease_token IS NOT NULL)
			EXECUTE FUNCTION emdash_media_usage_record_cleanup_fence()
		`).execute(db);
		return;
	}
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS emdash_media_usage_fence_source_generation_insert
		BEFORE INSERT ON _emdash_media_usage_sources
		WHEN EXISTS (
			SELECT 1
			FROM _emdash_media_usage_cleanup_fence AS fence
			WHERE fence.task_key = 'projection_gc'
				AND NEW.current_generation <= fence.generation_floor
		) AND NOT EXISTS (
			SELECT 1
			FROM _emdash_media_usage_generation_writes AS writer
			WHERE writer.source_key = NEW.source_key
				AND writer.generation = NEW.current_generation
				AND writer.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
		)
		BEGIN
			SELECT RAISE(IGNORE);
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS emdash_media_usage_fence_source_generation_update
		BEFORE UPDATE OF current_generation ON _emdash_media_usage_sources
		WHEN NEW.current_generation <> OLD.current_generation
			AND EXISTS (
				SELECT 1
				FROM _emdash_media_usage_cleanup_fence AS fence
				WHERE fence.task_key = 'projection_gc'
					AND NEW.current_generation <= fence.generation_floor
			) AND NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes AS writer
				WHERE writer.source_key = NEW.source_key
					AND writer.generation = NEW.current_generation
					AND writer.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
			)
		BEGIN
			SELECT RAISE(IGNORE);
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS emdash_media_usage_record_cleanup_fence
		BEFORE DELETE ON _emdash_media_usage
		WHEN OLD.cleanup_lease_token IS NOT NULL AND EXISTS (
			SELECT 1
			FROM _emdash_media_usage_cleanup AS cleanup
			WHERE cleanup.task_key = 'projection_gc'
				AND cleanup.lease_token = OLD.cleanup_lease_token
		)
		BEGIN
			INSERT INTO _emdash_media_usage_cleanup_fence (
				task_key,
				generation_floor,
				updated_at
			)
			VALUES ('projection_gc', OLD.generation, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
			ON CONFLICT (task_key) DO UPDATE SET
				generation_floor = CASE
					WHEN excluded.generation_floor > _emdash_media_usage_cleanup_fence.generation_floor
					THEN excluded.generation_floor
					ELSE _emdash_media_usage_cleanup_fence.generation_floor
				END,
				updated_at = excluded.updated_at;
		END
	`).execute(db);
}
async function down$29(db) {
	if (isPostgres(db)) {
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_record_cleanup_fence ON _emdash_media_usage").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_update ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_insert ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_update ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_insert ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_lock_cleanup_delete ON _emdash_media_usage_sources").execute(db);
		await sql.raw("DROP FUNCTION IF EXISTS emdash_media_usage_record_cleanup_fence()").execute(db);
		await sql.raw("DROP FUNCTION IF EXISTS emdash_media_usage_fence_source_generation()").execute(db);
		await sql.raw("DROP FUNCTION IF EXISTS emdash_media_usage_lock_cleanup()").execute(db);
	} else {
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_record_cleanup_fence").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_update").execute(db);
		await sql.raw("DROP TRIGGER IF EXISTS emdash_media_usage_fence_source_generation_insert").execute(db);
	}
	await db.schema.dropTable("_emdash_media_usage_cleanup_fence").ifExists().execute();
	if (await columnExists(db, "_emdash_media_usage", "cleanup_lease_token")) await db.schema.alterTable("_emdash_media_usage").dropColumn("cleanup_lease_token").execute();
}
var _063_media_usage_incremental_work_exports = /* @__PURE__ */ __exportAll({
	down: () => down$28,
	up: () => up$28
});
var ACTIVATION_KEY$1 = "incremental_capture";
var CONTENT_ADAPTER_ID = "content-media";
var COLLECTION_SCOPE = "collection";
var DUPLICATE_COLUMN_RE$2 = /(?:duplicate column|column .* already exists|already exists.*column)/i;
async function up$28(db) {
	await db.schema.createTable("_emdash_media_usage_activation").ifNotExists().addColumn("task_key", "text", (column) => column.primaryKey()).addColumn("state", "text", (column) => column.notNull().defaultTo("expanded")).addColumn("runtime_generation", "integer", (column) => column.notNull().defaultTo(1)).addColumn("collection_cursor", "text").addColumn("drain_confirmed_at", "text").addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("attempt_count", "integer", (column) => column.notNull().defaultTo(0)).addColumn("last_attempted_at", "text").addColumn("last_error_code", "text").addColumn("activated_at", "text").addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$3(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$3(db))).execute();
	await sql`
		INSERT INTO _emdash_media_usage_activation (task_key, state)
		VALUES (${ACTIVATION_KEY$1}, 'expanded')
		ON CONFLICT (task_key) DO NOTHING
	`.execute(db);
	await db.schema.createTable("_emdash_media_usage_work").ifNotExists().addColumn("collection_id", "text", (column) => column.notNull()).addColumn("collection_slug", "text", (column) => column.notNull()).addColumn("content_id", "text", (column) => column.notNull()).addColumn("change_epoch", "bigint", (column) => column.notNull()).addColumn("work_version", "bigint", (column) => column.notNull().defaultTo(1)).addColumn("state", "text", (column) => column.notNull().defaultTo("pending")).addColumn("attempt_count", "integer", (column) => column.notNull().defaultTo(0)).addColumn("next_attempt_at", "text", (column) => column.notNull()).addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("last_attempted_at", "text").addColumn("last_error_code", "text").addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$3(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$3(db))).addPrimaryKeyConstraint("_emdash_media_usage_work_pk", ["collection_id", "content_id"]).execute();
	await addStatusColumns(db);
	await addSourceColumns(db);
	await db.schema.createIndex("idx__emdash_media_usage_work_due").ifNotExists().on("_emdash_media_usage_work").columns([
		"state",
		"next_attempt_at",
		"updated_at",
		"collection_id",
		"content_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_work_lease").ifNotExists().on("_emdash_media_usage_work").columns([
		"state",
		"lease_expires_at",
		"collection_id",
		"content_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_work_operator").ifNotExists().on("_emdash_media_usage_work").columns([
		"collection_id",
		"state",
		"updated_at",
		"content_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_status_collection").ifNotExists().unique().on("_emdash_media_usage_index_status").columns([
		"adapter_id",
		"scope_type",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_identity").ifNotExists().on("_emdash_media_usage_sources").columns([
		"source_type",
		"collection_id",
		"content_id",
		"source_variant"
	]).execute();
	await sql`
		DELETE FROM _emdash_media_usage_index_status
		WHERE adapter_id = ${CONTENT_ADAPTER_ID}
			AND scope_type = ${COLLECTION_SCOPE}
			AND (
				(
					collection_id IS NULL
					AND NOT EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						WHERE collection.slug = _emdash_media_usage_index_status.scope_key
					)
				)
				OR (
					collection_id IS NOT NULL
					AND capture_state = 'installing'
					AND EXISTS (
						SELECT 1
						FROM _emdash_media_usage_activation AS activation
						WHERE activation.task_key = ${ACTIVATION_KEY$1}
							AND activation.state = 'expanded'
					)
					AND NOT EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						WHERE collection.id = _emdash_media_usage_index_status.collection_id
							AND collection.slug = _emdash_media_usage_index_status.scope_key
					)
				)
			)
	`.execute(db);
	await sql`
		UPDATE _emdash_media_usage_index_status
		SET collection_id = (
				SELECT collection.id
				FROM _emdash_collections AS collection
				WHERE collection.slug = _emdash_media_usage_index_status.scope_key
			),
			reconciliation_required = 1,
			capture_state = COALESCE(capture_state, 'installing')
		WHERE adapter_id = ${CONTENT_ADAPTER_ID}
			AND scope_type = ${COLLECTION_SCOPE}
			AND (
				collection_id IS NULL
				OR capture_state IS NULL
			)
			AND EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				WHERE collection.id = COALESCE(
					_emdash_media_usage_index_status.collection_id,
					collection.id
				)
					AND collection.slug = _emdash_media_usage_index_status.scope_key
			)
	`.execute(db);
}
async function down$28(db) {
	await assertRollbackIsEmptyAndInactive(db);
	await db.schema.dropIndex("idx__emdash_media_usage_sources_identity").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_status_collection").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_work_operator").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_work_lease").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_work_due").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_work").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_activation").ifExists().execute();
	if (isPostgres(db)) await sql`DROP FUNCTION IF EXISTS emdash_media_usage_capture_work()`.execute(db);
	for (const columnName of ["identity_version", "collection_id"]) if (await columnExists(db, "_emdash_media_usage_sources", columnName)) await db.schema.alterTable("_emdash_media_usage_sources").dropColumn(columnName).execute();
	for (const columnName of [
		"capture_state",
		"last_incremental_success_at",
		"reconciliation_required",
		"change_epoch",
		"collection_id"
	]) if (await columnExists(db, "_emdash_media_usage_index_status", columnName)) await db.schema.alterTable("_emdash_media_usage_index_status").dropColumn(columnName).execute();
}
async function addStatusColumns(db) {
	await addColumnIfMissing$1(db, "_emdash_media_usage_index_status", "collection_id", () => db.schema.alterTable("_emdash_media_usage_index_status").addColumn("collection_id", "text").execute());
	await addColumnIfMissing$1(db, "_emdash_media_usage_index_status", "change_epoch", () => db.schema.alterTable("_emdash_media_usage_index_status").addColumn("change_epoch", "bigint", (column) => column.notNull().defaultTo(0)).execute());
	await addColumnIfMissing$1(db, "_emdash_media_usage_index_status", "reconciliation_required", () => db.schema.alterTable("_emdash_media_usage_index_status").addColumn("reconciliation_required", "integer", (column) => column.notNull().defaultTo(0)).execute());
	await addStatusTextColumn(db, "last_incremental_success_at");
	await addStatusTextColumn(db, "capture_state");
}
async function assertRollbackIsEmptyAndInactive(db) {
	if (await hasCaptureTriggers(db)) throw new Error("Cannot roll back media usage capture while capture triggers are installed");
	if (await tableExists(db, "_emdash_media_usage_activation")) {
		const activation = await sql`
			SELECT state
			FROM _emdash_media_usage_activation
			WHERE task_key = ${ACTIVATION_KEY$1}
		`.execute(db);
		if (activation.rows[0] && activation.rows[0].state !== "expanded") throw new Error("Cannot roll back media usage capture after activation has started");
	}
	if (await tableExists(db, "_emdash_media_usage_work")) {
		if ((await sql`
			SELECT 1 AS present FROM _emdash_media_usage_work LIMIT 1
		`.execute(db)).rows.length > 0) throw new Error("Cannot roll back media usage capture while durable work exists");
	}
	const sourceHasCollectionId = await columnExists(db, "_emdash_media_usage_sources", "collection_id");
	const sourceHasIdentityVersion = await columnExists(db, "_emdash_media_usage_sources", "identity_version");
	if (sourceHasCollectionId || sourceHasIdentityVersion) {
		if ((sourceHasCollectionId ? await sql`
					SELECT 1 AS present
					FROM _emdash_media_usage_sources
					WHERE collection_id IS NOT NULL
					LIMIT 1
				`.execute(db) : await sql`
					SELECT 1 AS present
					FROM _emdash_media_usage_sources
					WHERE identity_version IS NOT NULL
					LIMIT 1
				`.execute(db)).rows.length > 0) throw new Error("Cannot roll back media usage capture after canonical sources exist");
		if (sourceHasCollectionId && sourceHasIdentityVersion) {
			if ((await sql`
				SELECT 1 AS present
				FROM _emdash_media_usage_sources
				WHERE identity_version IS NOT NULL
				LIMIT 1
			`.execute(db)).rows.length > 0) throw new Error("Cannot roll back media usage capture after canonical sources exist");
		}
	}
	if (await columnExists(db, "_emdash_media_usage_index_status", "capture_state")) {
		if ((await sql`
			SELECT 1 AS present FROM _emdash_media_usage_index_status
			WHERE capture_state IN ('active', 'deleting') LIMIT 1
		`.execute(db)).rows.length > 0) throwRollbackLifecycleError();
	}
	if (await columnExists(db, "_emdash_media_usage_index_status", "change_epoch")) {
		if ((await sql`
			SELECT 1 AS present FROM _emdash_media_usage_index_status
			WHERE change_epoch <> 0 LIMIT 1
		`.execute(db)).rows.length > 0) throwRollbackLifecycleError();
	}
	if (await columnExists(db, "_emdash_media_usage_index_status", "last_incremental_success_at")) {
		if ((await sql`
			SELECT 1 AS present FROM _emdash_media_usage_index_status
			WHERE last_incremental_success_at IS NOT NULL LIMIT 1
		`.execute(db)).rows.length > 0) throwRollbackLifecycleError();
	}
}
function throwRollbackLifecycleError() {
	throw new Error("Cannot roll back media usage capture while capture lifecycle state exists");
}
async function hasCaptureTriggers(db) {
	if (isPostgres(db)) return (await sql`
			SELECT EXISTS (
				SELECT 1
				FROM pg_trigger AS trigger
				INNER JOIN pg_class AS relation ON relation.oid = trigger.tgrelid
				INNER JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
				WHERE namespace.nspname = current_schema()
					AND NOT trigger.tgisinternal
					AND left(trigger.tgname, 10) = 'emdash_mu_'
			) AS present
		`.execute(db)).rows[0]?.present === true;
	return (await sql`
		SELECT 1 AS present
		FROM sqlite_master
		WHERE type = 'trigger' AND substr(name, 1, 10) = 'emdash_mu_'
		LIMIT 1
	`.execute(db)).rows.length > 0;
}
async function addStatusTextColumn(db, columnName) {
	await addColumnIfMissing$1(db, "_emdash_media_usage_index_status", columnName, () => db.schema.alterTable("_emdash_media_usage_index_status").addColumn(columnName, "text").execute());
}
async function addSourceColumns(db) {
	await addColumnIfMissing$1(db, "_emdash_media_usage_sources", "collection_id", () => db.schema.alterTable("_emdash_media_usage_sources").addColumn("collection_id", "text").execute());
	await addColumnIfMissing$1(db, "_emdash_media_usage_sources", "identity_version", () => db.schema.alterTable("_emdash_media_usage_sources").addColumn("identity_version", "integer").execute());
}
async function addColumnIfMissing$1(db, tableName, columnName, addColumn) {
	if (await columnExists(db, tableName, columnName)) return;
	try {
		await addColumn();
	} catch (error) {
		if (DUPLICATE_COLUMN_RE$2.test(deepErrorMessage$3(error))) {
			if (await columnExists(db, tableName, columnName)) return;
		}
		throw error;
	}
}
function sortableUtcTimestamp$3(db) {
	if (isPostgres(db)) return sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
	return sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`;
}
function deepErrorMessage$3(error) {
	if (error instanceof Error) {
		const own = error.message ?? "";
		if (error.cause) {
			const causeMessage = deepErrorMessage$3(error.cause);
			return own ? `${own}: ${causeMessage}` : causeMessage;
		}
		return own;
	}
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
var _064_fts_plain_text_exports = /* @__PURE__ */ __exportAll({
	down: () => down$27,
	up: () => up$27
});
async function up$27(db) {
	if (!isSqlite(db)) return;
	const collections = await sql`
		SELECT slug, search_config FROM _emdash_collections
		WHERE search_config IS NOT NULL
	`.execute(db);
	for (const collection of collections.rows) {
		if (!isSearchEnabled(collection.search_config)) continue;
		try {
			validateIdentifier(collection.slug, "collection slug");
		} catch (error) {
			console.warn(`[migration 064] skipping FTS rebuild for collection "${collection.slug}": ${error instanceof Error ? error.message : String(error)}`);
			continue;
		}
		const fields = await getSearchableFields(db, collection.slug);
		if (fields.length === 0) continue;
		await rebuildIndex(db, collection.slug, fields, searchTokenizer(collection.search_config));
	}
}
/**
* Forward-only. Down is a no-op: the FTS tables are managed by FTSManager
* at runtime and the self-contained shape remains fully functional for
* older code paths that only MATCH and join on id.
*/
async function down$27(_db) {}
function isSearchEnabled(searchConfig) {
	if (!searchConfig) return false;
	try {
		const parsed = JSON.parse(searchConfig);
		return typeof parsed === "object" && parsed !== null && "enabled" in parsed && parsed.enabled === true;
	} catch {
		return false;
	}
}
/**
* Tokenizers this migration knows how to carry across the rebuild — a frozen
* copy of SEARCH_TOKENIZERS as of this migration, not an import: a replay
* after the live allowlist changes must not reinterpret configs this
* migration never shipped with.
*/
var KNOWN_TOKENIZERS = [
	"porter unicode61",
	"unicode61",
	"trigram"
];
/**
* Tokenizer for the rebuilt table, from the collection's search_config.
* Values outside the allowlist (or unparsable config) fall back to the
* default rather than reaching the raw CREATE VIRTUAL TABLE statement.
*/
function searchTokenizer(searchConfig) {
	if (!searchConfig) return "porter unicode61";
	try {
		const parsed = JSON.parse(searchConfig);
		if (typeof parsed === "object" && parsed !== null && "tokenize" in parsed) {
			const configured = KNOWN_TOKENIZERS.find((tokenizer) => tokenizer === parsed.tokenize);
			if (configured !== void 0) return configured;
		}
	} catch {
		return "porter unicode61";
	}
	return "porter unicode61";
}
async function getSearchableFields(db, collectionSlug) {
	const rows = await sql`
		SELECT f.slug, f.type FROM _emdash_fields f
		INNER JOIN _emdash_collections c ON c.id = f.collection_id
		WHERE c.slug = ${collectionSlug} AND f.searchable = 1
	`.execute(db);
	const out = [];
	for (const row of rows.rows) try {
		validateIdentifier(row.slug, "searchable field name");
		out.push(row);
	} catch {
		console.warn(`[migration 064] skipping invalid searchable field "${row.slug}" on collection "${collectionSlug}"`);
	}
	return out;
}
/** Indexed-value expression for one field; lock-step with FTSManager.searchValueExpr. */
function searchValueExpr(ref, fieldType) {
	if (fieldType !== "portableText") return ref;
	return `CASE WHEN ${ref} IS NULL THEN NULL WHEN json_valid(${ref}) AND json_type(${ref}) IN ('array', 'object') THEN (SELECT group_concat(j.value, ' ') FROM json_tree(${ref}) AS j WHERE j.key IN ('text', 'alt', 'caption', 'code') AND j.type = 'text') ELSE ${ref} END`;
}
async function rebuildIndex(db, collectionSlug, fields, tokenizer) {
	const ftsTable = `_emdash_fts_${collectionSlug}`;
	const contentTable = `ec_${collectionSlug}`;
	const slugs = fields.map((f) => f.slug);
	const columnList = [
		"id UNINDEXED",
		"locale UNINDEXED",
		...slugs
	].join(", ");
	const fieldList = slugs.join(", ");
	const newValueList = fields.map((f) => searchValueExpr(`NEW.${f.slug}`, f.type)).join(", ");
	const changedCondition = [
		"deleted_at",
		"locale",
		...slugs
	].map((f) => `OLD.${f} IS NOT NEW.${f}`).join(" OR ");
	const selectValueList = fields.map((f) => searchValueExpr(`"${contentTable}"."${f.slug}"`, f.type)).join(", ");
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_insert"`).execute(db);
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_update"`).execute(db);
	await sql.raw(`DROP TRIGGER IF EXISTS "${ftsTable}_delete"`).execute(db);
	await sql.raw(`DROP TABLE IF EXISTS "${ftsTable}"`).execute(db);
	await sql.raw(`
		CREATE VIRTUAL TABLE IF NOT EXISTS "${ftsTable}" USING fts5(
			${columnList},
			tokenize='${tokenizer}'
		)
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_insert"
		AFTER INSERT ON "${contentTable}"
		WHEN NEW.deleted_at IS NULL
		BEGIN
			INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			VALUES (NEW.rowid, NEW.id, NEW.locale, ${newValueList});
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_update"
		AFTER UPDATE ON "${contentTable}"
		WHEN ${changedCondition}
		BEGIN
			DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
			INSERT INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
			SELECT NEW.rowid, NEW.id, NEW.locale, ${newValueList}
			WHERE NEW.deleted_at IS NULL;
		END
	`).execute(db);
	await sql.raw(`
		CREATE TRIGGER IF NOT EXISTS "${ftsTable}_delete"
		AFTER DELETE ON "${contentTable}"
		BEGIN
			DELETE FROM "${ftsTable}" WHERE rowid = OLD.rowid;
		END
	`).execute(db);
	await sql.raw(`
		INSERT OR REPLACE INTO "${ftsTable}"(rowid, id, locale, ${fieldList})
		SELECT rowid, id, locale, ${selectValueList} FROM "${contentTable}"
		WHERE deleted_at IS NULL
	`).execute(db);
}
var _065_media_usage_collection_deletion_exports = /* @__PURE__ */ __exportAll({
	down: () => down$26,
	up: () => up$26
});
async function up$26(db) {
	await db.schema.createTable("_emdash_media_usage_collection_deletions").ifNotExists().addColumn("collection_id", "text", (column) => column.notNull().primaryKey()).addColumn("collection_slug", "text", (column) => column.notNull().unique()).addColumn("force_delete", "integer", (column) => column.notNull()).addColumn("state", "text", (column) => column.notNull().defaultTo("pending")).addColumn("phase", "text", (column) => column.notNull().defaultTo("fence")).addColumn("work_cursor", "text").addColumn("source_key", "text").addColumn("occurrence_cursor", "text").addColumn("attempt_count", "integer", (column) => column.notNull().defaultTo(0)).addColumn("next_attempt_at", "text", (column) => column.notNull()).addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("last_error_code", "text").addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$2(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$2(db))).execute();
	await db.schema.createIndex("idx__emdash_media_usage_collection_deletions_due").ifNotExists().on("_emdash_media_usage_collection_deletions").columns([
		"state",
		"next_attempt_at",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_collection_deletions_lease").ifNotExists().on("_emdash_media_usage_collection_deletions").columns([
		"state",
		"lease_expires_at",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_collection_deletions_operator").ifNotExists().on("_emdash_media_usage_collection_deletions").columns([
		"state",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_sources_collection_cursor").ifNotExists().on("_emdash_media_usage_sources").columns([
		"source_type",
		"collection_id",
		"source_key"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_source_cursor").ifNotExists().on("_emdash_media_usage").columns(["source_key", "id"]).execute();
}
async function down$26(db) {
	if ((await sql`
		SELECT 1 AS present
		FROM _emdash_media_usage_collection_deletions
		LIMIT 1
	`.execute(db)).rows.length > 0) throw new Error("Cannot roll back while durable collection deletion evidence exists");
	await db.schema.dropIndex("idx__emdash_media_usage_source_cursor").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_sources_collection_cursor").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_collection_deletions").ifExists().execute();
}
function sortableUtcTimestamp$2(db) {
	if (isPostgres(db)) return sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
	return sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`;
}
var _066_media_usage_reconciliation_exports = /* @__PURE__ */ __exportAll({
	down: () => down$25,
	up: () => up$25
});
var ACTIVATION_KEY = "incremental_capture";
async function up$25(db) {
	await db.schema.createTable("_emdash_media_usage_reconciliations").ifNotExists().addColumn("collection_id", "text", (column) => column.notNull().primaryKey()).addColumn("collection_slug", "text", (column) => column.notNull()).addColumn("run_token", "text", (column) => column.notNull()).addColumn("target_epoch", "bigint").addColumn("field_fingerprint", "text").addColumn("state", "text", (column) => column.notNull().defaultTo("pending")).addColumn("phase", "text", (column) => column.notNull().defaultTo("scan")).addColumn("scan_cursor", "text").addColumn("scan_upper_id", "text").addColumn("source_cursor", "text").addColumn("source_upper_key", "text").addColumn("attempt_count", "integer", (column) => column.notNull().defaultTo(0)).addColumn("next_attempt_at", "text", (column) => column.notNull()).addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("last_error_code", "text").addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$1(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp$1(db))).execute();
	await db.schema.createIndex("idx__emdash_media_usage_reconciliations_due").ifNotExists().on("_emdash_media_usage_reconciliations").columns([
		"state",
		"next_attempt_at",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_reconciliations_lease").ifNotExists().on("_emdash_media_usage_reconciliations").columns([
		"state",
		"lease_expires_at",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_reconciliations_failed").ifNotExists().on("_emdash_media_usage_reconciliations").columns([
		"state",
		"updated_at",
		"collection_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_media_usage_status_reconciliation").ifNotExists().on("_emdash_media_usage_index_status").columns([
		"adapter_id",
		"scope_type",
		"capture_state",
		"reconciliation_required",
		"collection_id"
	]).execute();
	if (!await columnExists(db, "_emdash_media_usage_activation", "media_usage_maintenance_turn")) await db.schema.alterTable("_emdash_media_usage_activation").addColumn("media_usage_maintenance_turn", "integer", (column) => column.notNull().defaultTo(2)).execute();
}
async function down$25(db) {
	if (await tableExists(db, "_emdash_media_usage_reconciliations")) {
		if ((await sql`
			SELECT 1 AS present
			FROM _emdash_media_usage_reconciliations
			LIMIT 1
		`.execute(db)).rows.length > 0) throw new Error("Cannot roll back while durable reconciliation evidence exists");
	}
	if ((await sql`
		SELECT state
		FROM _emdash_media_usage_activation
		WHERE task_key = ${ACTIVATION_KEY}
	`.execute(db)).rows[0]?.state !== "expanded") throw new Error("Cannot roll back media usage reconciliation after activation has started");
	await db.schema.dropIndex("idx__emdash_media_usage_status_reconciliation").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_reconciliations_failed").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_reconciliations_lease").ifExists().execute();
	await db.schema.dropIndex("idx__emdash_media_usage_reconciliations_due").ifExists().execute();
	await db.schema.dropTable("_emdash_media_usage_reconciliations").ifExists().execute();
	if (await columnExists(db, "_emdash_media_usage_activation", "media_usage_maintenance_turn")) await db.schema.alterTable("_emdash_media_usage_activation").dropColumn("media_usage_maintenance_turn").execute();
}
function sortableUtcTimestamp$1(db) {
	if (isPostgres(db)) return sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
	return sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`;
}
var _067_indexed_content_fields_exports = /* @__PURE__ */ __exportAll({
	down: () => down$24,
	up: () => up$24
});
var FIELD_ID_PATTERN = /^[0-9A-Z]{26}$/;
/** Mark custom fields whose structured list queries are backed by a physical index. */
async function up$24(db) {
	if (!await columnExists(db, "_emdash_fields", "indexed")) await db.schema.alterTable("_emdash_fields").addColumn("indexed", "integer", (column) => column.notNull().defaultTo(0)).execute();
}
async function down$24(db) {
	if (!await columnExists(db, "_emdash_fields", "indexed")) return;
	const indexedFields = await sql`
		SELECT id FROM _emdash_fields WHERE indexed = 1
	`.execute(db);
	for (const field of indexedFields.rows) {
		if (!FIELD_ID_PATTERN.test(field.id)) throw new Error(`Invalid indexed field id "${field.id}"`);
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_cf_${field.id.toLowerCase()}`)}
		`.execute(db);
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_cf_${field.id.toLowerCase()}_loc`)}
		`.execute(db);
	}
	await db.schema.alterTable("_emdash_fields").dropColumn("indexed").execute();
}
var _068_content_taxonomy_entry_groups_exports = /* @__PURE__ */ __exportAll({
	down: () => down$23,
	up: () => up$23
});
var LEGACY_DENORM_INDEXES = [
	"idx_content_taxonomies_pub",
	"idx_content_taxonomies_crt",
	"idx_content_taxonomies_loc_pub",
	"idx_content_taxonomies_loc_crt"
];
/**
* Store the content translation_group in content_taxonomies.entry_id.
* Existing per-locale rows are merged into one assignment per content group
* and term group. Rows whose content table or content entry no longer exists
* are left untouched.
*/
async function up$23(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		validateIdentifier(tableName, "content table name");
		const collection = tableName.slice(3);
		await sql`
			INSERT INTO content_taxonomies (collection, entry_id, taxonomy_id)
			SELECT DISTINCT ${collection}, content.translation_group, pivot.taxonomy_id
			FROM content_taxonomies AS pivot
			INNER JOIN ${sql.ref(tableName)} AS content ON content.id = pivot.entry_id
			WHERE pivot.collection = ${collection}
				AND content.translation_group IS NOT NULL
			ON CONFLICT (collection, entry_id, taxonomy_id) DO NOTHING
		`.execute(db);
		await sql`
			DELETE FROM content_taxonomies
			WHERE collection = ${collection}
				AND entry_id IN (
					SELECT id
					FROM ${sql.ref(tableName)}
					WHERE translation_group IS NOT NULL AND id != translation_group
				)
		`.execute(db);
	}
	for (const indexName of LEGACY_DENORM_INDEXES) await sql`DROP INDEX IF EXISTS ${sql.ref(indexName)}`.execute(db);
	await db.schema.createIndex("idx_content_taxonomies_group_lookup").ifNotExists().on("content_taxonomies").columns([
		"taxonomy_id",
		"collection",
		"entry_id"
	]).execute();
}
/** The collapsed per-locale rows cannot be reconstructed. */
async function down$23(_db) {}
var _069_collection_title_date_fields_exports = /* @__PURE__ */ __exportAll({
	down: () => down$22,
	up: () => up$22
});
/**
* Migration: configurable title and date fields for collections
*
* Adds `title_field` and `date_field` columns to `_emdash_collections` so a
* collection can override which field powers the Title column and which field
* powers the Date column in the admin content list. Both are nullable — NULL
* preserves the current defaults (title-style display, last-updated date).
*
* Column adds/drops are guarded by `columnExists`: D1 has no transactions, so a
* migration can partially apply without being recorded and later re-run.
*/
async function up$22(db) {
	if (!await columnExists(db, "_emdash_collections", "title_field")) await sql`
			ALTER TABLE _emdash_collections
			ADD COLUMN title_field TEXT
		`.execute(db);
	if (!await columnExists(db, "_emdash_collections", "date_field")) await sql`
			ALTER TABLE _emdash_collections
			ADD COLUMN date_field TEXT
		`.execute(db);
}
async function down$22(db) {
	if (await columnExists(db, "_emdash_collections", "date_field")) await sql`
			ALTER TABLE _emdash_collections
			DROP COLUMN date_field
		`.execute(db);
	if (await columnExists(db, "_emdash_collections", "title_field")) await sql`
			ALTER TABLE _emdash_collections
			DROP COLUMN title_field
		`.execute(db);
}
var _070_collection_routable_exports = /* @__PURE__ */ __exportAll({
	down: () => down$21,
	up: () => up$21
});
async function up$21(db) {
	if (!await columnExists(db, "_emdash_collections", "routable")) await db.schema.alterTable("_emdash_collections").addColumn("routable", "integer", (col) => col.notNull().defaultTo(1)).execute();
}
async function down$21(db) {
	if (await columnExists(db, "_emdash_collections", "routable")) await db.schema.alterTable("_emdash_collections").dropColumn("routable").execute();
}
var _071_restore_content_bylines_table_exports = /* @__PURE__ */ __exportAll({
	down: () => down$20,
	up: () => up$20
});
/**
* Restore `_emdash_content_bylines` where migration 040's SQLite rebuild
* stopped between dropping the old table and renaming the staged copy.
*
* 040 guards its rebuild on `PRAGMA foreign_key_list`, which returns no rows
* for a missing table, so a retry after that partial run skips the rename and
* leaves `_emdash_content_bylines_new` behind with the credits inside. The
* indexes went with the dropped table.
*
* The Postgres path of 040 alters the table in place, so this is a no-op there.
*/
async function up$20(db) {
	if (!isSqlite(db)) return;
	if (!await tableExists(db, "_emdash_content_bylines")) {
		if (!await tableExists(db, "_emdash_content_bylines_new")) return;
		await sql`ALTER TABLE _emdash_content_bylines_new RENAME TO _emdash_content_bylines`.execute(db);
	}
	await db.schema.createIndex("idx_content_bylines_content").ifNotExists().on("_emdash_content_bylines").columns([
		"collection_slug",
		"content_id",
		"sort_order"
	]).execute();
	await db.schema.createIndex("idx_content_bylines_byline").ifNotExists().on("_emdash_content_bylines").column("byline_id").execute();
}
async function down$20(_db) {}
var _072_media_folders_exports = /* @__PURE__ */ __exportAll({
	down: () => down$19,
	up: () => up$19
});
var DUPLICATE_COLUMN_RE$1 = /(?:duplicate column|column .* already exists|already exists.*column)/i;
async function up$19(db) {
	await db.schema.createTable("media_folders").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull()).addColumn("name_key", "text", (col) => col.notNull().unique()).execute();
	await addFolderColumnIfMissing(db, () => db.schema.alterTable("media").addColumn("folder_id", "text", (col) => col.references("media_folders.id").onDelete("set null")).execute());
	await db.schema.createIndex("idx_media_folder_id").ifNotExists().on("media").column("folder_id").execute();
}
async function down$19(db) {
	await db.schema.dropIndex("idx_media_folder_id").ifExists().execute();
	if (await columnExists(db, "media", "folder_id")) await db.schema.alterTable("media").dropColumn("folder_id").execute();
	await db.schema.dropTable("media_folders").ifExists().execute();
}
async function addFolderColumnIfMissing(db, addColumn) {
	if (await columnExists(db, "media", "folder_id")) return;
	try {
		await addColumn();
	} catch (error) {
		if (DUPLICATE_COLUMN_RE$1.test(deepErrorMessage$2(error))) {
			if (await columnExists(db, "media", "folder_id")) return;
		}
		throw error;
	}
}
function deepErrorMessage$2(error) {
	if (error instanceof Error) {
		const own = error.message ?? "";
		if (error.cause) {
			const causeMessage = deepErrorMessage$2(error.cause);
			return own ? `${own}: ${causeMessage}` : causeMessage;
		}
		return own;
	}
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
var _073_media_focal_point_exports = /* @__PURE__ */ __exportAll({
	addFocalColumnIfMissing: () => addFocalColumnIfMissing,
	down: () => down$18,
	up: () => up$18
});
var DUPLICATE_COLUMN_RE = /(?:duplicate column|column .* already exists|already exists.*column)/i;
async function up$18(db) {
	await addFocalColumnIfMissing(db, "focal_x", () => db.schema.alterTable("media").addColumn("focal_x", "real").execute());
	await addFocalColumnIfMissing(db, "focal_y", () => db.schema.alterTable("media").addColumn("focal_y", "real").execute());
}
async function down$18(db) {
	if (await columnExists(db, "media", "focal_y")) await db.schema.alterTable("media").dropColumn("focal_y").execute();
	if (await columnExists(db, "media", "focal_x")) await db.schema.alterTable("media").dropColumn("focal_x").execute();
}
async function addFocalColumnIfMissing(db, column, addColumn) {
	if (await columnExists(db, "media", column)) return;
	try {
		await addColumn();
	} catch (error) {
		if (DUPLICATE_COLUMN_RE.test(deepErrorMessage$1(error))) {
			if (await columnExists(db, "media", column)) return;
		}
		throw error;
	}
}
function deepErrorMessage$1(error) {
	if (error instanceof Error) {
		const own = error.message ?? "";
		if (error.cause) {
			const causeMessage = deepErrorMessage$1(error.cause);
			return own ? `${own}: ${causeMessage}` : causeMessage;
		}
		return own;
	}
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
var _074_content_deleted_scheduled_index_exports = /* @__PURE__ */ __exportAll({
	down: () => down$17,
	up: () => up$17
});
/**
* Migration: replace the single-column partial `scheduled_at` index on content
* tables with a `(deleted_at, scheduled_at)` composite.
*
* The scheduled-publishing sweep filters `scheduled_at` by range and
* `deleted_at IS NULL`, ordered by `scheduled_at`. A `scheduled_at`-only index
* cannot satisfy the soft-delete term, so a stats-blind planner seeks a
* `deleted_at`-leading composite instead and reads every live row. Leading with
* `deleted_at` lets one index serve the equality, the range, and the ORDER BY.
* D1 never has `sqlite_stat1`, so the index shape is the only lever.
*
* The partial predicate from migration 030 is kept so the index stays
* proportional to scheduled content rather than to the table.
*
* Forward-only and idempotent (`IF NOT EXISTS`).
*
* The short `del_sched` suffix keeps the name inside Postgres's 63-byte
* identifier limit for long collection slugs. Keep it identical to the name in
* `schema/registry.ts`.
*/
async function up$17(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_del_sched`)}
			ON ${sql.ref(tableName)} (deleted_at, scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_scheduled`)}`.execute(db);
	}
}
async function down$17(db) {
	const tableNames = await listTablesLike(db, "ec_%");
	for (const tableName of tableNames) {
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(`idx_${tableName}_scheduled`)}
			ON ${sql.ref(tableName)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${tableName}_del_sched`)}`.execute(db);
	}
}
var _075_entry_edit_locks_exports = /* @__PURE__ */ __exportAll({
	down: () => down$16,
	up: () => up$16
});
/**
* Timestamps here carry no column default: `datetime('now')` renders a
* space-separated shape that would not sort against the ISO-8601 values the
* lease predicate compares as strings.
*/
async function up$16(db) {
	await db.schema.createTable("_emdash_entry_locks").ifNotExists().addColumn("collection", "text", (col) => col.notNull()).addColumn("entry_id", "text", (col) => col.notNull()).addColumn("user_id", "text", (col) => col.notNull().references("users.id").onDelete("cascade")).addColumn("token", "text", (col) => col.notNull()).addColumn("acquired_at", "text", (col) => col.notNull()).addColumn("expires_at", "text", (col) => col.notNull()).addPrimaryKeyConstraint("pk_emdash_entry_locks", ["collection", "entry_id"]).execute();
	await db.schema.createIndex("idx_emdash_entry_locks_user_id").ifNotExists().on("_emdash_entry_locks").column("user_id").execute();
	if (!await columnExists(db, "_emdash_collections", "edit_locking")) await db.schema.alterTable("_emdash_collections").addColumn("edit_locking", "integer", (col) => col.notNull().defaultTo(1)).execute();
}
async function down$16(db) {
	if (await columnExists(db, "_emdash_collections", "edit_locking")) await db.schema.alterTable("_emdash_collections").dropColumn("edit_locking").execute();
	await db.schema.dropIndex("idx_emdash_entry_locks_user_id").ifExists().execute();
	await db.schema.dropTable("_emdash_entry_locks").ifExists().execute();
}
var _076_collection_nav_group_exports = /* @__PURE__ */ __exportAll({
	down: () => down$15,
	up: () => up$15
});
/**
* Migration: group collections into admin sidebar folders.
*
* Adds `nav_group` to `_emdash_collections`. Collections sharing a group
* render under one collapsible folder in the admin sidebar; NULL keeps the
* collection inline.
*/
async function up$15(db) {
	if (!await columnExists(db, "_emdash_collections", "nav_group")) await db.schema.alterTable("_emdash_collections").addColumn("nav_group", "text").execute();
}
async function down$15(db) {
	if (await columnExists(db, "_emdash_collections", "nav_group")) await db.schema.alterTable("_emdash_collections").dropColumn("nav_group").execute();
}
var _077_plugin_storage_revisions_exports = /* @__PURE__ */ __exportAll({
	down: () => down$14,
	up: () => up$14
});
var TABLES = [{
	name: "options",
	keys: ["name"]
}, {
	name: "_plugin_storage",
	keys: [
		"plugin_id",
		"collection",
		"id"
	]
}];
var DUPLICATE_COLUMN_REGEX$1 = /(?:duplicate column|column .* already exists|already exists.*column)/i;
async function up$14(db) {
	for (const table of TABLES) {
		if (await columnExists(db, table.name, "revision")) continue;
		try {
			await db.schema.alterTable(table.name).addColumn("revision", "text", (column) => column.notNull().defaultTo("0")).execute();
		} catch (error) {
			if (isDuplicateColumnError(error) && await columnExists(db, table.name, "revision")) continue;
			throw error;
		}
	}
	if (isPostgres(db)) {
		await sql`
			CREATE OR REPLACE FUNCTION emdash_plugin_storage_assign_revision()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				IF TG_OP = 'INSERT' THEN
					IF NEW.revision = '0' THEN
						NEW.revision := gen_random_uuid()::text;
					END IF;
				ELSIF NEW.revision = '0' OR NEW.revision = OLD.revision THEN
					NEW.revision := gen_random_uuid()::text;
				END IF;
				RETURN NEW;
			END;
			$$
		`.execute(db);
		for (const table of TABLES) await sql`
				CREATE OR REPLACE TRIGGER ${sql.ref(`emdash_${table.name}_revision`)}
				BEFORE INSERT OR UPDATE ON ${sql.ref(table.name)}
				FOR EACH ROW EXECUTE FUNCTION emdash_plugin_storage_assign_revision()
			`.execute(db);
	} else for (const table of TABLES) {
		const rowKey = sql.join(table.keys.map((key) => sql`${sql.ref(key)} = ${sql.ref(`NEW.${key}`)}`), sql` AND `);
		await sql`
				CREATE TRIGGER IF NOT EXISTS ${sql.ref(`emdash_${table.name}_revision_insert`)}
				AFTER INSERT ON ${sql.ref(table.name)}
				WHEN NEW.revision = '0'
				BEGIN
					UPDATE ${sql.ref(table.name)} SET revision = lower(hex(randomblob(16)))
					WHERE ${rowKey} AND revision = NEW.revision;
				END
			`.execute(db);
		await sql`
				CREATE TRIGGER IF NOT EXISTS ${sql.ref(`emdash_${table.name}_revision_update`)}
				AFTER UPDATE ON ${sql.ref(table.name)}
				WHEN NEW.revision = '0' OR NEW.revision = OLD.revision
				BEGIN
					UPDATE ${sql.ref(table.name)} SET revision = lower(hex(randomblob(16)))
					WHERE ${rowKey} AND revision = NEW.revision;
				END
			`.execute(db);
	}
}
function isDuplicateColumnError(error) {
	if (!(error instanceof Error)) return false;
	return DUPLICATE_COLUMN_REGEX$1.test(error.message) || isDuplicateColumnError(error.cause);
}
async function down$14(_db) {}
var _078_menu_item_translation_groups_exports = /* @__PURE__ */ __exportAll({
	down: () => down$13,
	up: () => up$13
});
async function up$13(db) {
	await sql`
		UPDATE _emdash_menu_items
		SET translation_group = id
		WHERE translation_group IS NULL
	`.execute(db);
}
/** Existing translation-group relationships must survive a host rollback. */
async function down$13(_db) {}
var SYSTEM_DATETIME_COLUMNS = [
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at"
];
var MAX_DIAGNOSTIC_SAMPLES = 50;
var DATETIME_MIGRATION_BATCH_SIZE = 50;
var DATETIME_UPDATE_COLUMN_BATCH_SIZE = Math.floor(49 / 2);
var MAX_JSON_BIND_BYTES = 19e5;
var SITE_TIMEZONE_OPTION = "site:timezone";
var RESUME_OPTION = "emdash:datetime_normalization_resume";
var REVISIONS_TABLE = "revisions";
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function serializedJson(value) {
	if (typeof value === "string") return value;
	const serialized = JSON.stringify(value);
	if (serialized === void 0) throw new Error("Could not serialize repeater datetime data");
	return serialized;
}
function addSample(state, sample) {
	if (state.samples.length < MAX_DIAGNOSTIC_SAMPLES) {
		state.samples.push(sample);
		return;
	}
	if (sample.kind !== "manual_review" && sample.kind !== "inspection_error") return;
	const replace = state.samples.findIndex((existing) => existing.kind !== "manual_review" && existing.kind !== "inspection_error");
	if (replace !== -1) state.samples[replace] = sample;
}
function parseRepeaterDatetimeFields(validation) {
	if (!validation) return [];
	let parsed;
	try {
		parsed = JSON.parse(validation);
	} catch {
		return [];
	}
	if (typeof parsed !== "object" || parsed === null || !("subFields" in parsed)) return [];
	const subFields = parsed.subFields;
	if (!Array.isArray(subFields)) return [];
	return subFields.flatMap((field) => typeof field === "object" && field !== null && "type" in field && field.type === "datetime" && "slug" in field && typeof field.slug === "string" ? [field.slug] : []);
}
async function loadScanOptions(db) {
	const rows = await db.selectFrom("options").select(["name", "value"]).where("name", "in", [SITE_TIMEZONE_OPTION, RESUME_OPTION]).execute();
	const timezoneRow = rows.find((row) => row.name === SITE_TIMEZONE_OPTION);
	const resumeOption = rows.find((row) => row.name === RESUME_OPTION)?.value;
	if (!timezoneRow) return {
		timezone: "UTC",
		resumeOption
	};
	try {
		const value = JSON.parse(timezoneRow.value);
		return {
			timezone: typeof value === "string" && value ? value : "UTC",
			resumeOption
		};
	} catch {
		return {
			timezone: "UTC",
			resumeOption
		};
	}
}
async function loadCollectionSchemas(db) {
	const collections = await db.selectFrom("_emdash_collections").select(["id", "slug"]).orderBy("slug").execute();
	const schemas = new Map(collections.map((collection) => [collection.slug, {
		slug: collection.slug,
		fields: []
	}]));
	const schemaBatchSize = 48;
	for (let offset = 0; offset < collections.length; offset += schemaBatchSize) {
		const ids = collections.slice(offset, offset + schemaBatchSize).map((collection) => collection.id);
		if (ids.length === 0) continue;
		const fields = await db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select([
			"collection.slug as collection",
			"field.slug",
			"field.type",
			"field.validation"
		]).where("field.collection_id", "in", ids).where("field.type", "in", ["datetime", "repeater"]).orderBy("field.id").execute();
		for (const field of fields) {
			const schema = schemas.get(field.collection);
			if (!schema) continue;
			schema.fields.push(field.type === "datetime" ? {
				slug: field.slug,
				type: "datetime"
			} : {
				slug: field.slug,
				type: "repeater",
				datetimeSubFields: parseRepeaterDatetimeFields(field.validation)
			});
		}
	}
	return schemas;
}
function recordNormalization(state, location, original, normalized) {
	if (normalized.kind === "canonical") return;
	state.noncanonicalCount++;
	if (normalized.kind === "naive") state.naiveCount++;
	addSample(state, {
		location,
		value: original,
		kind: normalized.kind
	});
}
function recordError(state, location, value, error) {
	if (error instanceof DatetimeNormalizationError && (error.code === "ambiguous" || error.code === "nonexistent")) {
		state.manualReviewCount++;
		addSample(state, {
			location,
			value,
			kind: "manual_review",
			message: error.message
		});
		return;
	}
	state.inspectionErrorCount++;
	addSample(state, {
		location,
		value,
		kind: "inspection_error",
		message: error instanceof Error ? error.message : String(error)
	});
}
function parseStoredFieldValue(state, location, field, value) {
	if (field.type !== "repeater" || typeof value !== "string") return value;
	try {
		return JSON.parse(value);
	} catch (error) {
		recordError(state, location, value, error);
		return value;
	}
}
function groupByPayloadSize(entries) {
	const encoder = new TextEncoder();
	const batches = [];
	const oversized = [];
	let batch = [];
	let batchBytes = 2;
	for (const entry of entries) {
		const entryBytes = encoder.encode(entry.payload).byteLength;
		if (entryBytes + 2 > MAX_JSON_BIND_BYTES) {
			oversized.push(entry);
			continue;
		}
		if (batch.length > 0 && batchBytes + 1 + entryBytes > MAX_JSON_BIND_BYTES) {
			batches.push(batch);
			batch = [];
			batchBytes = 2;
		}
		batchBytes += (batch.length > 0 ? 1 : 0) + entryBytes;
		batch.push(entry);
	}
	if (batch.length > 0) batches.push(batch);
	return {
		batches,
		oversized
	};
}
function joinPayloads(entries) {
	return `[${entries.map((entry) => entry.payload).join(",")}]`;
}
function targetColumn(column) {
	return sql.ref(`target.${column}`);
}
function inputAfter(index) {
	return sql.ref(`input.after_${index}`);
}
function inputBefore(index) {
	return sql.ref(`input.before_${index}`);
}
async function updateContentBatch(db, table, columns, updates, payload, postgres) {
	const changed = [];
	for (const [index, column] of columns.entries()) {
		const change = updates.find((update) => update.changes.has(column))?.changes.get(column);
		if (change) changed.push({
			column,
			index,
			json: change.json
		});
	}
	const inputColumns = changed.map(({ index }) => postgres ? sql`entry.value -> 1 ->> ${sql.lit(index)} AS ${sql.ref(`after_${index}`)},
				entry.value -> 2 ->> ${sql.lit(index)} AS ${sql.ref(`before_${index}`)}` : sql`json_extract(entry.value, ${sql.lit(`$[1][${index}]`)}) AS ${sql.ref(`after_${index}`)},
				json_extract(entry.value, ${sql.lit(`$[2][${index}]`)}) AS ${sql.ref(`before_${index}`)}`);
	const input = postgres ? sql`SELECT entry.value ->> 0 AS target_id, ${sql.join(inputColumns)}
			FROM jsonb_array_elements(CAST(${payload} AS jsonb)) AS entry(value)` : sql`SELECT json_extract(entry.value, '$[0]') AS target_id, ${sql.join(inputColumns)}
			FROM json_each(${payload}) AS entry`;
	const assignments = changed.map(({ column, index, json }) => json && postgres ? sql`${sql.ref(column)} = COALESCE(CAST(${inputAfter(index)} AS JSON), ${targetColumn(column)})` : sql`${sql.ref(column)} = COALESCE(${inputAfter(index)}, ${targetColumn(column)})`);
	const guards = changed.map(({ column, index, json }) => json && postgres ? sql`(${inputBefore(index)} IS NULL OR CAST(${targetColumn(column)} AS JSONB) = CAST(${inputBefore(index)} AS JSONB))` : sql`(${inputBefore(index)} IS NULL OR ${targetColumn(column)} = ${inputBefore(index)})`);
	await sql`
		WITH input AS (${input})
		UPDATE ${sql.ref(table)} AS target
		SET ${sql.join(assignments, sql`, `)}
		FROM input
		WHERE target.id = input.target_id
		AND ${sql.join(guards, sql` AND `)}
	`.execute(db);
}
async function updateContentRow(db, table, update, postgres) {
	const changeEntries = [...update.changes];
	for (let offset = 0; offset < changeEntries.length; offset += DATETIME_UPDATE_COLUMN_BATCH_SIZE) {
		const batch = changeEntries.slice(offset, offset + DATETIME_UPDATE_COLUMN_BATCH_SIZE);
		const assignments = batch.map(([column, change]) => change.json && postgres ? sql`${sql.ref(column)} = CAST(${change.after} AS JSON)` : sql`${sql.ref(column)} = ${change.after}`);
		const predicates = batch.map(([column, change]) => change.json && postgres ? sql`CAST(${sql.ref(column)} AS JSONB) = CAST(${serializedJson(change.before)} AS JSONB)` : sql`${sql.ref(column)} = ${change.before}`);
		await sql`
			UPDATE ${sql.ref(table)}
			SET ${sql.join(assignments, sql`, `)}
			WHERE id = ${update.id}
			AND ${sql.join(predicates, sql` AND `)}
		`.execute(db);
	}
}
async function writeContentUpdates(db, table, columns, updates, postgres) {
	const { batches, oversized } = groupByPayloadSize(updates.map((update) => ({
		update,
		payload: JSON.stringify([
			update.id,
			columns.map((column) => update.changes.get(column)?.after ?? null),
			columns.map((column) => {
				const change = update.changes.get(column);
				if (!change) return null;
				return change.json ? serializedJson(change.before) : change.before;
			})
		])
	})));
	for (const batch of batches) await updateContentBatch(db, table, columns, batch.map((entry) => entry.update), joinPayloads(batch), postgres);
	for (const { update } of oversized) await updateContentRow(db, table, update, postgres);
}
async function writeRevisionUpdates(db, updates, postgres) {
	const { batches, oversized } = groupByPayloadSize(updates.map((update) => ({
		update,
		payload: JSON.stringify([
			update.id,
			update.after,
			update.before
		])
	})));
	for (const batch of batches) {
		const payload = joinPayloads(batch);
		await sql`
			WITH input AS (${postgres ? sql`SELECT entry.value ->> 0 AS target_id, entry.value ->> 1 AS next_data, entry.value ->> 2 AS previous_data
				FROM jsonb_array_elements(CAST(${payload} AS jsonb)) AS entry(value)` : sql`SELECT json_extract(entry.value, '$[0]') AS target_id,
					json_extract(entry.value, '$[1]') AS next_data,
					json_extract(entry.value, '$[2]') AS previous_data
				FROM json_each(${payload}) AS entry`})
			UPDATE revisions AS target
			SET data = input.next_data
			FROM input
			WHERE target.id = input.target_id
			AND target.data = input.previous_data
		`.execute(db);
	}
	for (const { update } of oversized) await db.updateTable("revisions").set({ data: update.after }).where("id", "=", update.id).where("data", "=", update.before).execute();
}
async function saveResumePoint(db, point) {
	const value = JSON.stringify(point);
	await db.insertInto("options").values({
		name: RESUME_OPTION,
		value
	}).onConflict((conflict) => conflict.column("name").doUpdateSet({ value })).execute();
}
async function clearResumePoint(db) {
	await db.deleteFrom("options").where("name", "=", RESUME_OPTION).execute();
}
function scanTables(context) {
	return [...Array.from(context.schemas.keys(), (slug) => `ec_${slug}`), REVISIONS_TABLE];
}
function parseResumePoint(context) {
	if (context.resumeOption === void 0) return void 0;
	let parsed;
	try {
		parsed = JSON.parse(context.resumeOption);
	} catch {
		return;
	}
	if (!isRecord$1(parsed)) return void 0;
	const { timezone, table, after } = parsed;
	if (typeof timezone !== "string" || typeof table !== "string" || typeof after !== "string") return;
	if (timezone !== context.timezone || !scanTables(context).includes(table)) return void 0;
	return {
		timezone,
		table,
		after
	};
}
async function scanContentRows(db, schema, state, startAfter) {
	validateIdentifier(schema.slug, "collection slug");
	const table = `ec_${schema.slug}`;
	const postgres = db.getExecutor().adapter instanceof PostgresAdapter;
	const fieldColumns = schema.fields.map((field) => field.slug);
	for (const column of fieldColumns) validateIdentifier(column, "content datetime field");
	const columns = [...SYSTEM_DATETIME_COLUMNS, ...fieldColumns];
	let cursor = startAfter;
	for (;;) {
		const selected = [sql.ref("id"), ...columns.map((column) => sql.ref(column))];
		const result = await sql`
			SELECT ${sql.join(selected, sql`, `)}
			FROM ${sql.ref(table)}
			WHERE id > ${cursor}
			ORDER BY id
			LIMIT ${DATETIME_MIGRATION_BATCH_SIZE}
		`.execute(db);
		if (result.rows.length === 0) break;
		const updates = [];
		for (const row of result.rows) {
			const id = String(row.id);
			const changes = /* @__PURE__ */ new Map();
			for (const column of SYSTEM_DATETIME_COLUMNS) {
				const current = row[column];
				if (current === null || current === void 0 || current === "") continue;
				try {
					const normalized = normalizeDatetime(current, state.timezone);
					recordNormalization(state, `${table}/${id}.${column}`, current, normalized);
					if (normalized.value !== current) changes.set(column, {
						before: current,
						after: normalized.value,
						json: false
					});
				} catch (error) {
					recordError(state, `${table}/${id}.${column}`, current, error);
				}
			}
			const data = {};
			for (const field of schema.fields) data[field.slug] = parseStoredFieldValue(state, `${table}/${id}.${field.slug}`, field, row[field.slug]);
			for (const field of schema.fields) {
				const before = data[field.slug];
				try {
					const normalized = normalizeContentDatetimes({ [field.slug]: before }, [field], state.timezone);
					state.noncanonicalCount += normalized.changedCount;
					state.naiveCount += normalized.naiveCount;
					if (normalized.changedCount === 0) continue;
					const after = normalized.value[field.slug];
					addSample(state, {
						location: `${table}/${id}.${field.slug}`,
						value: before,
						kind: normalized.naiveCount > 0 ? "naive" : "offset"
					});
					changes.set(field.slug, {
						before: row[field.slug],
						after: field.type === "repeater" ? JSON.stringify(after) : after,
						json: field.type === "repeater"
					});
				} catch (error) {
					recordError(state, `${table}/${id}.${field.slug}`, before, error);
				}
			}
			if (state.write && changes.size > 0) updates.push({
				id,
				changes
			});
		}
		cursor = String(result.rows.at(-1).id);
		if (updates.length > 0) {
			await writeContentUpdates(db, table, columns, updates, postgres);
			await saveResumePoint(db, {
				timezone: state.timezone,
				table,
				after: cursor
			});
		}
		if (result.rows.length < DATETIME_MIGRATION_BATCH_SIZE) break;
	}
}
async function scanRevisions(db, schemas, state, startAfter) {
	const postgres = db.getExecutor().adapter instanceof PostgresAdapter;
	let cursor = startAfter;
	for (;;) {
		const rows = await db.selectFrom("revisions").select([
			"id",
			"collection",
			"entry_id",
			"data"
		]).where("id", ">", cursor).orderBy("id").limit(DATETIME_MIGRATION_BATCH_SIZE).execute();
		if (rows.length === 0) break;
		const updates = [];
		for (const row of rows) {
			const schema = schemas.get(row.collection);
			if (!schema) continue;
			let data;
			try {
				data = JSON.parse(row.data);
			} catch (error) {
				recordError(state, `revisions/${row.id}.data`, row.data, error);
				continue;
			}
			if (!isRecord$1(data)) {
				recordError(state, `revisions/${row.id}.data`, data, /* @__PURE__ */ new Error("Expected a JSON object"));
				continue;
			}
			let normalizedData = data;
			let changed = false;
			for (const field of schema.fields) {
				const before = normalizedData[field.slug];
				try {
					const normalized = normalizeContentDatetimes({ [field.slug]: before }, [field], state.timezone);
					state.noncanonicalCount += normalized.changedCount;
					state.naiveCount += normalized.naiveCount;
					if (normalized.changedCount === 0) continue;
					if (!changed) normalizedData = { ...normalizedData };
					changed = true;
					normalizedData[field.slug] = normalized.value[field.slug];
					addSample(state, {
						location: `revisions/${row.id}.data.${field.slug} (${row.collection}/${row.entry_id})`,
						value: before,
						kind: normalized.naiveCount > 0 ? "naive" : "offset"
					});
				} catch (error) {
					recordError(state, `revisions/${row.id}.data.${field.slug} (${row.collection}/${row.entry_id})`, before, error);
				}
			}
			if (state.write && changed) updates.push({
				id: row.id,
				before: row.data,
				after: JSON.stringify(normalizedData)
			});
		}
		cursor = rows.at(-1).id;
		if (updates.length > 0) {
			await writeRevisionUpdates(db, updates, postgres);
			await saveResumePoint(db, {
				timezone: state.timezone,
				table: REVISIONS_TABLE,
				after: cursor
			});
		}
		if (rows.length < DATETIME_MIGRATION_BATCH_SIZE) break;
	}
}
async function loadScanContext(db) {
	const [options, schemas] = await Promise.all([loadScanOptions(db), loadCollectionSchemas(db)]);
	return {
		...options,
		schemas
	};
}
async function scan(db, context, write, start) {
	const state = {
		timezone: context.timezone,
		noncanonicalCount: 0,
		naiveCount: 0,
		manualReviewCount: 0,
		inspectionErrorCount: 0,
		samples: [],
		write
	};
	const tables = scanTables(context);
	let pending = start;
	for (const [index, schema] of [...context.schemas.values()].entries()) {
		if (pending && pending.table !== `ec_${schema.slug}`) continue;
		await scanContentRows(db, schema, state, pending?.after ?? "");
		pending = void 0;
		const next = tables[index + 1];
		if (write && next) await saveResumePoint(db, {
			timezone: state.timezone,
			table: next,
			after: ""
		});
	}
	await scanRevisions(db, context.schemas, state, pending?.after ?? "");
	const { write: _write, ...report } = state;
	return report;
}
function formatDatetimeStorageReport(report) {
	const summary = `${report.noncanonicalCount} noncanonical values (${report.naiveCount} naive) using ${report.timezone}`;
	const samples = report.samples.map((sample) => `${sample.location}: ${sample.message ?? JSON.stringify(sample.value)}`);
	const totalFindings = report.noncanonicalCount + report.manualReviewCount + report.inspectionErrorCount;
	const omitted = totalFindings > samples.length ? totalFindings - samples.length : 0;
	return [
		summary,
		...report.manualReviewCount > 0 || report.inspectionErrorCount > 0 ? [`${report.manualReviewCount} require manual review; ${report.inspectionErrorCount} could not be inspected`] : [],
		...samples,
		...omitted > 0 ? [`${omitted} additional findings omitted`] : []
	].join("\n");
}
/** Migration 079 runs this, so a change here must not alter the data it writes. */
async function normalizeDatetimeStorage(db) {
	const context = await loadScanContext(db);
	const resumeFrom = parseResumePoint(context);
	let preflight;
	if (resumeFrom) console.info(`[datetime migration] resuming in ${resumeFrom.table} after ${JSON.stringify(resumeFrom.after)} using ${resumeFrom.timezone}`);
	else {
		preflight = await scan(db, context, false);
		if (preflight.manualReviewCount > 0 || preflight.inspectionErrorCount > 0) throw new Error(`Datetime migration requires manual review:\n${formatDatetimeStorageReport(preflight)}`);
		if (preflight.noncanonicalCount === 0) {
			if (context.resumeOption !== void 0) await clearResumePoint(db);
			return preflight;
		}
		console.info(`[datetime migration] ${formatDatetimeStorageReport(preflight)}`);
		const [firstTable = REVISIONS_TABLE] = scanTables(context);
		await saveResumePoint(db, {
			timezone: context.timezone,
			table: firstTable,
			after: ""
		});
	}
	const written = await scan(db, context, true, resumeFrom);
	const verified = await scan(db, context, false);
	await clearResumePoint(db);
	if (verified.noncanonicalCount > 0 || verified.manualReviewCount > 0 || verified.inspectionErrorCount > 0) throw new Error(`Datetime migration did not reach a canonical state:\n${formatDatetimeStorageReport(verified)}`);
	return preflight ?? written;
}
var _079_datetime_normalization_exports = /* @__PURE__ */ __exportAll({
	down: () => down$12,
	up: () => up$12
});
async function up$12(db) {
	await normalizeDatetimeStorage(db);
}
async function down$12(_db) {}
var _080_content_translation_locale_unique_exports = /* @__PURE__ */ __exportAll({
	down: () => down$11,
	up: () => up$11
});
var DUPLICATE_GROUP_BATCH_SIZE = 50;
async function splitDuplicateLocales(db, tableName) {
	const collection = tableName.slice(3);
	while (true) {
		const duplicates = await sql`
			WITH duplicate_groups AS (
				SELECT translation_group, lower(locale) AS locale_key
				FROM ${sql.ref(tableName)}
				WHERE deleted_at IS NULL AND translation_group IS NOT NULL
				GROUP BY translation_group, lower(locale)
				HAVING COUNT(*) > 1
				ORDER BY translation_group, lower(locale)
				LIMIT ${DUPLICATE_GROUP_BATCH_SIZE}
			)
			SELECT content.id, content.translation_group, lower(content.locale) AS locale_key
			FROM ${sql.ref(tableName)} AS content
			INNER JOIN duplicate_groups AS duplicate
				ON duplicate.translation_group = content.translation_group
				AND duplicate.locale_key = lower(content.locale)
			WHERE content.deleted_at IS NULL
			ORDER BY content.translation_group, lower(content.locale),
				CASE WHEN content.id = content.translation_group THEN 0 ELSE 1 END,
				content.created_at, content.id
		`.execute(db);
		if (duplicates.rows.length === 0) return;
		let previousGroupLocale = null;
		for (const row of duplicates.rows) {
			const groupLocale = `${row.translation_group}\0${row.locale_key}`;
			if (groupLocale !== previousGroupLocale) {
				previousGroupLocale = groupLocale;
				continue;
			}
			await sql`
				INSERT INTO content_taxonomies (collection, entry_id, taxonomy_id)
				SELECT collection, ${row.id}, taxonomy_id
				FROM content_taxonomies
				WHERE collection = ${collection} AND entry_id = ${row.translation_group}
				ON CONFLICT (collection, entry_id, taxonomy_id) DO NOTHING
			`.execute(db);
			await sql`
				UPDATE ${sql.ref(tableName)}
				SET translation_group = ${row.id}
				WHERE id = ${row.id}
					AND deleted_at IS NULL
					AND translation_group = ${row.translation_group}
					AND lower(locale) = ${row.locale_key}
			`.execute(db);
		}
	}
}
async function up$11(db) {
	for (const tableName of await listTablesLike(db, "ec_%")) {
		const indexName = `uidx_${tableName}_active_tg_locale`;
		if (await indexExists(db, isPostgres(db) ? indexName.slice(0, 63) : indexName)) continue;
		await splitDuplicateLocales(db, tableName);
		await sql`
			CREATE UNIQUE INDEX IF NOT EXISTS ${sql.ref(indexName)}
			ON ${sql.ref(tableName)} (translation_group, lower(locale))
			WHERE deleted_at IS NULL AND translation_group IS NOT NULL
		`.execute(db);
	}
}
async function down$11(db) {
	for (const tableName of await listTablesLike(db, "ec_%")) {
		const indexName = `uidx_${tableName}_active_tg_locale`;
		const storedIndexName = isPostgres(db) ? indexName.slice(0, 63) : indexName;
		await sql`DROP INDEX IF EXISTS ${sql.ref(storedIndexName)}`.execute(db);
	}
}
var _081_redirect_write_guards_exports = /* @__PURE__ */ __exportAll({
	down: () => down$10,
	up: () => up$10
});
var DUPLICATE_COLUMN_REGEX = /(?:duplicate column|column .* already exists|already exists.*column)/i;
async function addColumnIfMissing(db, column) {
	if (await columnExists(db, "_emdash_redirects", column)) return;
	try {
		await db.schema.alterTable("_emdash_redirects").addColumn(column, column === "config_revision" ? "text" : "integer", (builder) => builder.notNull().defaultTo(column === "config_revision" ? "0" : 0)).execute();
	} catch (error) {
		if (error instanceof Error && DUPLICATE_COLUMN_REGEX.test(error.message) && await columnExists(db, "_emdash_redirects", column)) return;
		throw error;
	}
}
async function up$10(db) {
	await addColumnIfMissing(db, "config_revision");
	await addColumnIfMissing(db, "source_guard");
	await addColumnIfMissing(db, "write_generation");
	await sql`
		UPDATE _emdash_redirects
		SET source_guard = 1
		WHERE id IN (
			SELECT MIN(id) FROM _emdash_redirects GROUP BY source
		)
		AND source_guard = 0
	`.execute(db);
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS idx_redirects_managed_source
		ON _emdash_redirects (source)
		WHERE source_guard = 1
	`.execute(db);
	await db.schema.createTable("_emdash_redirect_write_lock").ifNotExists().addColumn("id", "integer", (column) => column.primaryKey()).addColumn("token", "text", (column) => column.notNull()).addColumn("expires_at", isPostgres(db) ? "bigint" : "integer", (column) => column.notNull()).addColumn("generation", "integer", (column) => column.notNull()).execute();
	await sql`
		INSERT INTO _emdash_redirect_write_lock (id, token, expires_at, generation)
		VALUES (1, '', 0, 0)
		ON CONFLICT (id) DO NOTHING
	`.execute(db);
	if (isPostgres(db)) {
		await sql`
			CREATE OR REPLACE FUNCTION emdash_redirect_validate_write()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				PERFORM pg_advisory_xact_lock(1168624763);
				IF TG_OP = 'INSERT' THEN
					NEW.source_guard := 1;
				ELSIF NEW.source <> OLD.source THEN
					NEW.source_guard := 1;
				END IF;
				IF TG_OP = 'UPDATE'
					AND NEW.config_revision IS NOT DISTINCT FROM OLD.config_revision
					AND (
						NEW.source IS DISTINCT FROM OLD.source OR
						NEW.destination IS DISTINCT FROM OLD.destination OR
						NEW.enabled IS DISTINCT FROM OLD.enabled OR
						NEW.is_pattern IS DISTINCT FROM OLD.is_pattern OR
						NEW.type IS DISTINCT FROM OLD.type OR
						NEW.group_name IS DISTINCT FROM OLD.group_name
					)
				THEN
					NEW.config_revision := md5(random()::text || clock_timestamp()::text || NEW.id);
				END IF;
				IF NEW.write_generation <> 0 AND TG_OP = 'INSERT' THEN
					IF NOT EXISTS (
						SELECT 1 FROM _emdash_redirect_write_lock
						WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
					) THEN
						RAISE EXCEPTION 'redirect write lease expired';
					END IF;
				ELSIF TG_OP = 'UPDATE' AND NEW.write_generation IS DISTINCT FROM OLD.write_generation THEN
					IF NOT EXISTS (
						SELECT 1 FROM _emdash_redirect_write_lock
						WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
					) THEN
						RAISE EXCEPTION 'redirect write lease expired';
					END IF;
				END IF;
				IF NEW.enabled = 1 AND NEW.destination <> ''
					AND (TG_OP = 'INSERT' OR NEW.source <> OLD.source OR NEW.destination <> OLD.destination)
					AND EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1
							AND (TG_OP = 'INSERT' OR id <> NEW.id)
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1
							AND (TG_OP = 'INSERT' OR redirect.id <> NEW.id)
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				) THEN
					RAISE EXCEPTION 'redirect loop';
				END IF;
				RETURN NEW;
			END;
			$$
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_validate_write ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_validate_write
			BEFORE INSERT OR UPDATE OF source, destination, enabled, is_pattern, type, group_name
			ON _emdash_redirects
			FOR EACH ROW EXECUTE FUNCTION emdash_redirect_validate_write()
		`.execute(db);
		await sql`
			CREATE OR REPLACE FUNCTION emdash_redirect_serialize_delete()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				PERFORM pg_advisory_xact_lock(1168624763);
				RETURN OLD;
			END;
			$$
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_serialize_delete ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_serialize_delete
			BEFORE DELETE ON _emdash_redirects
			FOR EACH ROW EXECUTE FUNCTION emdash_redirect_serialize_delete()
		`.execute(db);
	} else {
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_fence_insert
			BEFORE INSERT ON _emdash_redirects
			WHEN NEW.write_generation <> 0 AND NOT EXISTS (
				SELECT 1 FROM _emdash_redirect_write_lock
				WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
			)
			BEGIN
				SELECT RAISE(ABORT, 'redirect write lease expired');
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_fence_update
			BEFORE UPDATE OF source, destination, enabled, is_pattern, type, group_name ON _emdash_redirects
			WHEN NEW.write_generation <> OLD.write_generation
			AND NEW.write_generation <> 0 AND NOT EXISTS (
				SELECT 1 FROM _emdash_redirect_write_lock
				WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
			)
			BEGIN
				SELECT RAISE(ABORT, 'redirect write lease expired');
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_loop_insert
			BEFORE INSERT ON _emdash_redirects
			WHEN NEW.enabled = 1 AND NEW.destination <> ''
			BEGIN
				SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				);
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_loop_update
			BEFORE UPDATE OF source, destination ON _emdash_redirects
			WHEN NEW.enabled = 1 AND NEW.destination <> ''
			BEGIN
				SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1 AND id <> NEW.id
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1 AND redirect.id <> NEW.id
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				);
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_guard_insert
			AFTER INSERT ON _emdash_redirects
			WHEN NEW.source_guard = 0
			BEGIN
				UPDATE _emdash_redirects SET source_guard = 1 WHERE id = NEW.id;
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_guard_update
			AFTER UPDATE OF source ON _emdash_redirects
			WHEN NEW.source_guard = 0 AND NEW.source <> OLD.source
			BEGIN
				UPDATE _emdash_redirects SET source_guard = 1 WHERE id = NEW.id;
			END
		`.execute(db);
		await sql`
			CREATE TRIGGER IF NOT EXISTS emdash_redirect_revision_update
			AFTER UPDATE OF source, destination, enabled, is_pattern, type, group_name ON _emdash_redirects
			WHEN NEW.config_revision = OLD.config_revision AND (
				NEW.source IS NOT OLD.source OR
				NEW.destination IS NOT OLD.destination OR
				NEW.enabled IS NOT OLD.enabled OR
				NEW.is_pattern IS NOT OLD.is_pattern OR
				NEW.type IS NOT OLD.type OR
				NEW.group_name IS NOT OLD.group_name
			)
			BEGIN
				UPDATE _emdash_redirects
				SET config_revision = lower(hex(randomblob(16)))
				WHERE id = NEW.id;
			END
		`.execute(db);
	}
}
async function down$10(_db) {}
var _082_taxonomy_translation_locale_unique_exports = /* @__PURE__ */ __exportAll({
	down: () => down$9,
	up: () => up$9
});
var INDEX_NAME = "idx_taxonomies_translation_group_locale_unique";
async function up$9(db) {
	const duplicates = await sql`
		SELECT id, translation_group
		FROM (
			SELECT
				id,
				translation_group,
				ROW_NUMBER() OVER (
					PARTITION BY translation_group, locale
					ORDER BY id ASC
				) AS duplicate_rank
			FROM taxonomies
			WHERE translation_group IS NOT NULL
		) ranked
		WHERE duplicate_rank > 1
	`.execute(db);
	for (const duplicate of duplicates.rows) {
		await sql`
			INSERT INTO content_taxonomies (collection, entry_id, taxonomy_id)
			SELECT collection, entry_id, ${duplicate.id}
			FROM content_taxonomies
			WHERE taxonomy_id = ${duplicate.translation_group}
			ON CONFLICT DO NOTHING
		`.execute(db);
		await sql`
			UPDATE taxonomies
			SET translation_group = ${duplicate.id}
			WHERE id = ${duplicate.id}
				AND translation_group = ${duplicate.translation_group}
		`.execute(db);
	}
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS ${sql.ref(INDEX_NAME)}
		ON taxonomies (translation_group, locale)
		WHERE translation_group IS NOT NULL
	`.execute(db);
}
async function down$9(db) {
	await sql`DROP INDEX IF EXISTS ${sql.ref(INDEX_NAME)}`.execute(db);
}
var _083_block_types_exports = /* @__PURE__ */ __exportAll({
	down: () => down$8,
	up: () => up$8
});
async function up$8(db) {
	await db.schema.createTable("_emdash_block_types").ifNotExists().addColumn("id", "text", (column) => column.primaryKey()).addColumn("slug", "text", (column) => column.notNull().unique()).addColumn("label", "text", (column) => column.notNull()).addColumn("description", "text").addColumn("icon", "text").addColumn("category", "text").addColumn("current_version", "integer", (column) => column.notNull().defaultTo(1)).addColumn("source", "text", (column) => column.notNull().defaultTo("user")).addColumn("created_at", "text", (column) => column.notNull().defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(currentTimestamp(db))).execute();
	await db.schema.createTable("_emdash_block_type_versions").ifNotExists().addColumn("id", "text", (column) => column.primaryKey()).addColumn("block_type_id", "text", (column) => column.notNull()).addColumn("version", "integer", (column) => column.notNull()).addColumn("fields", "text", (column) => column.notNull()).addColumn("fingerprint", "text", (column) => column.notNull()).addColumn("created_at", "text", (column) => column.notNull().defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(currentTimestamp(db))).addForeignKeyConstraint("block_type_versions_type_fk", ["block_type_id"], "_emdash_block_types", ["id"], (constraint) => constraint.onDelete("cascade")).execute();
	await db.schema.createIndex("idx_block_type_versions_type_version").ifNotExists().on("_emdash_block_type_versions").columns(["block_type_id", "version"]).unique().execute();
	await db.schema.createIndex("idx_block_type_versions_type").ifNotExists().on("_emdash_block_type_versions").column("block_type_id").execute();
}
async function down$8(db) {
	await db.schema.dropTable("_emdash_block_type_versions").ifExists().execute();
	await db.schema.dropTable("_emdash_block_types").ifExists().execute();
}
var _084_site_transfer_exports = /* @__PURE__ */ __exportAll({
	down: () => down$7,
	up: () => up$7
});
/**
* Site transfer (portable export/import) operation state.
*
* Operation rows hold digests and small JSON cursors only; manifests, plans,
* and package files live in staging storage.
*/
async function up$7(db) {
	await db.schema.createTable("_emdash_transfer_operations").ifNotExists().addColumn("id", "text", (column) => column.primaryKey()).addColumn("kind", "text", (column) => column.notNull()).addColumn("state", "text", (column) => column.notNull()).addColumn("stage", "text").addColumn("cursor", "text").addColumn("progress", "text").addColumn("options", "text").addColumn("idempotency_key", "text").addColumn("package_digest", "text").addColumn("plan_digest", "text").addColumn("origin_site_id", "text").addColumn("staging_secret", "text", (column) => column.notNull()).addColumn("receipt", "text").addColumn("error_code", "text").addColumn("error_detail", "text").addColumn("write_epoch", "integer", (column) => column.notNull().defaultTo(0)).addColumn("attempt_count", "integer", (column) => column.notNull().defaultTo(0)).addColumn("lease_token", "text").addColumn("lease_expires_at", "text").addColumn("runtime_generation", "integer", (column) => column.notNull().defaultTo(1)).addColumn("cancel_requested_at", "text").addColumn("mutation_started_at", "text").addColumn("created_by", "text", (column) => column.notNull()).addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp(db))).addColumn("updated_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp(db))).addColumn("completed_at", "text").addColumn("expires_at", "text").addColumn("staging_collected_at", "text").execute();
	await db.schema.createIndex("idx__emdash_transfer_operations_idempotency").ifNotExists().unique().on("_emdash_transfer_operations").columns([
		"created_by",
		"kind",
		"idempotency_key"
	]).execute();
	await sql`
		CREATE UNIQUE INDEX IF NOT EXISTS idx__emdash_transfer_operations_active_import
		ON _emdash_transfer_operations (kind)
		WHERE kind = 'import'
			AND (
				state IN ('uploading', 'analyzing', 'planned', 'running', 'verifying')
				OR (state IN ('failed', 'cancelled') AND mutation_started_at IS NOT NULL)
			)
	`.execute(db);
	await db.schema.createIndex("idx__emdash_transfer_operations_kind_state").ifNotExists().on("_emdash_transfer_operations").columns([
		"kind",
		"state",
		"created_at"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_operations_expires").ifNotExists().on("_emdash_transfer_operations").columns(["state", "expires_at"]).execute();
	await db.schema.createIndex("idx__emdash_transfer_operations_uncollected").ifNotExists().on("_emdash_transfer_operations").columns([
		"staging_collected_at",
		"state",
		"updated_at"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_operations_created_by").ifNotExists().on("_emdash_transfer_operations").column("created_by").execute();
	await db.schema.createTable("_emdash_transfer_identity_map").ifNotExists().addColumn("origin_site_id", "text", (column) => column.notNull()).addColumn("entity_kind", "text", (column) => column.notNull()).addColumn("portable_id", "text", (column) => column.notNull()).addColumn("target_id", "text", (column) => column.notNull()).addColumn("operation_id", "text", (column) => column.notNull()).addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp(db))).addPrimaryKeyConstraint("_emdash_transfer_identity_map_pk", [
		"operation_id",
		"entity_kind",
		"portable_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_identity_map_target").ifNotExists().on("_emdash_transfer_identity_map").columns([
		"operation_id",
		"entity_kind",
		"target_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_identity_map_origin").ifNotExists().on("_emdash_transfer_identity_map").columns([
		"origin_site_id",
		"entity_kind",
		"portable_id"
	]).execute();
	await db.schema.createTable("_emdash_transfer_staged_files").ifNotExists().addColumn("operation_id", "text", (column) => column.notNull().references("_emdash_transfer_operations.id").onDelete("cascade")).addColumn("path", "text", (column) => column.notNull()).addColumn("bytes", "bigint", (column) => column.notNull()).addColumn("sha256", "text", (column) => column.notNull()).addColumn("state", "text", (column) => column.notNull().defaultTo("declared")).addColumn("verified_at", "text").addColumn("logical_sha256", "text").addPrimaryKeyConstraint("_emdash_transfer_staged_files_pk", ["operation_id", "path"]).execute();
	await db.schema.createIndex("idx__emdash_transfer_staged_files_state").ifNotExists().on("_emdash_transfer_staged_files").columns([
		"operation_id",
		"state",
		"path"
	]).execute();
	await db.schema.createTable("_emdash_transfer_package_index").ifNotExists().addColumn("operation_id", "text", (column) => column.notNull().references("_emdash_transfer_operations.id").onDelete("cascade")).addColumn("kind", "text", (column) => column.notNull()).addColumn("id", "text", (column) => column.notNull()).addColumn("group_id", "text").addColumn("parent_id", "text").addColumn("name_key", "text").addColumn("depth", "integer", (column) => column.notNull().defaultTo(0)).addPrimaryKeyConstraint("_emdash_transfer_package_index_pk", [
		"operation_id",
		"kind",
		"id"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_package_index_group").ifNotExists().on("_emdash_transfer_package_index").columns([
		"operation_id",
		"kind",
		"group_id"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_package_index_name").ifNotExists().on("_emdash_transfer_package_index").columns([
		"operation_id",
		"kind",
		"name_key"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_package_index_parent").ifNotExists().on("_emdash_transfer_package_index").columns([
		"operation_id",
		"kind",
		"parent_id"
	]).execute();
	await db.schema.createTable("_emdash_transfer_media_blobs").ifNotExists().addColumn("operation_id", "text", (column) => column.notNull().references("_emdash_transfer_operations.id").onDelete("cascade")).addColumn("media_id", "text", (column) => column.notNull()).addColumn("sha256", "text", (column) => column.notNull()).addColumn("bytes", "bigint", (column) => column.notNull()).addPrimaryKeyConstraint("_emdash_transfer_media_blobs_pk", ["operation_id", "media_id"]).execute();
	await db.schema.createIndex("idx__emdash_transfer_media_blobs_sha256").ifNotExists().on("_emdash_transfer_media_blobs").columns(["operation_id", "sha256"]).execute();
	await db.schema.createTable("_emdash_transfer_approvals").ifNotExists().addColumn("id", "text", (column) => column.primaryKey()).addColumn("status", "text", (column) => column.notNull().defaultTo("pending")).addColumn("action", "text", (column) => column.notNull()).addColumn("user_id", "text", (column) => column.notNull()).addColumn("requested_by_token_id", "text").addColumn("approved_by", "text").addColumn("operation_id", "text").addColumn("params_digest", "text").addColumn("package_digest", "text").addColumn("plan_digest", "text").addColumn("expires_at", "text", (column) => column.notNull()).addColumn("created_at", "text", (column) => column.notNull().defaultTo(sortableUtcTimestamp(db))).addColumn("decided_at", "text").addColumn("consumed_at", "text").execute();
	await db.schema.createIndex("idx__emdash_transfer_approvals_user_status").ifNotExists().on("_emdash_transfer_approvals").columns([
		"user_id",
		"status",
		"created_at"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_approvals_status_created").ifNotExists().on("_emdash_transfer_approvals").columns([
		"status",
		"created_at",
		"id"
	]).execute();
	await db.schema.createIndex("idx__emdash_transfer_approvals_operation").ifNotExists().on("_emdash_transfer_approvals").column("operation_id").execute();
}
async function down$7(db) {
	await db.schema.dropTable("_emdash_transfer_approvals").ifExists().execute();
	await db.schema.dropTable("_emdash_transfer_media_blobs").ifExists().execute();
	await db.schema.dropTable("_emdash_transfer_package_index").ifExists().execute();
	await db.schema.dropTable("_emdash_transfer_staged_files").ifExists().execute();
	await db.schema.dropTable("_emdash_transfer_identity_map").ifExists().execute();
	await db.schema.dropTable("_emdash_transfer_operations").ifExists().execute();
}
function sortableUtcTimestamp(db) {
	if (isPostgres(db)) return sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
	return sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`;
}
var _085_taxonomy_def_groups_exports = /* @__PURE__ */ __exportAll({
	down: () => down$6,
	up: () => up$6
});
/**
* Store a taxonomy's structure once instead of on every locale's definition.
*
* `_emdash_taxonomy_def_groups` owns `hierarchical` and `collections`, one row
* per taxonomy `name`. `label` and `label_singular` stay on the per-locale rows
* of `_emdash_taxonomy_defs`. Every reader resolves a definition by name and
* terms are keyed on it, so rows of one name that sit in different translation
* groups describe the same taxonomy: they are merged into the lowest group id.
* Rows of different names that share a group describe different taxonomies, so
* each name gets a group of its own: the name holding the group's anchor row
* (`id = translation_group`) keeps the id, and the others get a fresh one.
*
* Rows of one name can disagree. The merged structure keeps whatever any row
* declares, hierarchical if any row is and every collection any row attaches,
* so no term tree flattens and no collection loses a taxonomy it showed in
* some locale.
*
* The per-locale rows keep their own `hierarchical` and `collections` columns,
* rewritten to the merged values, so code that reads them directly, such as the
* plugin sandbox bridges, still sees the taxonomy's structure.
*
* Computing the merge from rows that were already rewritten gives the same
* structure, and the last statement links rows to their group by name, so a run
* that dies after any statement can be retried.
*/
/** Groups per `INSERT`. Each costs four bound parameters, inside D1's limit of 100. */
var GROUPS_PER_INSERT = 24;
async function up$6(db) {
	await db.schema.createTable("_emdash_taxonomy_def_groups").ifNotExists().addColumn("id", "text", (col) => col.primaryKey()).addColumn("name", "text", (col) => col.notNull()).addColumn("hierarchical", "integer", (col) => col.notNull().defaultTo(0)).addColumn("collections", "text", (col) => col.notNull().defaultTo("[]")).addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db))).addUniqueConstraint("_emdash_taxonomy_def_groups_name_unique", ["name"]).execute();
	await sql`
		UPDATE _emdash_taxonomy_defs
		SET translation_group = id
		WHERE translation_group IS NULL
	`.execute(db);
	const { rows } = await sql`
		SELECT id, name, hierarchical, collections, translation_group
		FROM _emdash_taxonomy_defs
		ORDER BY id ASC
	`.execute(db);
	const groups = [...mergeByName(rows).values()];
	for (let start = 0; start < groups.length; start += GROUPS_PER_INSERT) {
		const batch = groups.slice(start, start + GROUPS_PER_INSERT);
		await sql`
			INSERT INTO _emdash_taxonomy_def_groups (id, name, hierarchical, collections)
			VALUES ${sql.join(batch.map((group) => sql`(${group.id}, ${group.name}, ${group.hierarchical}, ${JSON.stringify(group.collections)})`))}
			ON CONFLICT DO NOTHING
		`.execute(db);
	}
	await sql`
		UPDATE _emdash_taxonomy_defs
		SET
			translation_group = (
				SELECT g.id FROM _emdash_taxonomy_def_groups g
				WHERE g.name = _emdash_taxonomy_defs.name
			),
			hierarchical = (
				SELECT g.hierarchical FROM _emdash_taxonomy_def_groups g
				WHERE g.name = _emdash_taxonomy_defs.name
			),
			collections = (
				SELECT g.collections FROM _emdash_taxonomy_def_groups g
				WHERE g.name = _emdash_taxonomy_defs.name
			)
		WHERE EXISTS (
			SELECT 1 FROM _emdash_taxonomy_def_groups g
			WHERE g.name = _emdash_taxonomy_defs.name
		)
	`.execute(db);
}
/** The per-locale rows still carry the merged structure, so dropping the table loses nothing. */
async function down$6(db) {
	await db.schema.dropTable("_emdash_taxonomy_def_groups").ifExists().execute();
}
function mergeByName(rows) {
	const merged = /* @__PURE__ */ new Map();
	for (const row of rows) {
		let group = merged.get(row.name);
		if (!group) {
			group = {
				id: row.translation_group,
				name: row.name,
				hierarchical: 0,
				collections: []
			};
			merged.set(row.name, group);
		}
		if (row.translation_group < group.id) group.id = row.translation_group;
		if (row.hierarchical === 1) group.hierarchical = 1;
		for (const collection of parseCollections(row.collections)) if (!group.collections.includes(collection)) group.collections.push(collection);
	}
	const anchorNames = new Map(rows.map((row) => [row.id, row.name]));
	const isAnchored = (group) => anchorNames.get(group.id) === group.name;
	const claimed = /* @__PURE__ */ new Set();
	for (const group of merged.values()) if (isAnchored(group)) claimed.add(group.id);
	for (const group of merged.values()) {
		if (isAnchored(group)) continue;
		if (claimed.has(group.id)) group.id = ulid();
		claimed.add(group.id);
	}
	return merged;
}
function parseCollections(value) {
	if (!value) return [];
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		return [];
	}
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((entry) => typeof entry === "string");
}
var _086_relations_structural_exports = /* @__PURE__ */ __exportAll({
	down: () => down$5,
	up: () => up$5
});
/**
* Collapse the per-locale rows to one row per relation, with a slug unique
* across all of them.
*
* `UNIQUE(name, locale)` allowed two groups to share a name, so the collapse
* can collide; a colliding relation takes a numeric suffix rather than failing
* the migration. Groups are processed in a fixed order so every replica lands
* on the same result.
*/
function collapseGroups(rows) {
	const byGroup = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const group = byGroup.get(row.translation_group);
		if (group) group.push(row);
		else byGroup.set(row.translation_group, [row]);
	}
	const collapsed = [];
	const takenSlugs = /* @__PURE__ */ new Set();
	for (const translationGroup of [...byGroup.keys()].toSorted()) {
		const canonical = (byGroup.get(translationGroup) ?? []).toSorted((a, b) => a.locale < b.locale ? -1 : 1)[0];
		if (!canonical) continue;
		let slug = canonical.name;
		for (let suffix = 2; takenSlugs.has(slug); suffix++) slug = `${canonical.name.slice(0, 63 - String(suffix).length - 1)}_${suffix}`;
		takenSlugs.add(slug);
		collapsed.push({
			id: translationGroup,
			slug,
			parent_collection: canonical.parent_collection,
			child_collection: canonical.child_collection,
			parent_label: canonical.parent_label,
			child_label: canonical.child_label
		});
	}
	return collapsed;
}
async function createRelationsTable(db, name) {
	await db.schema.createTable(name).addColumn("id", "text", (c) => c.primaryKey()).addColumn("slug", "text", (c) => c.notNull()).addColumn("parent_collection", "text", (c) => c.notNull()).addColumn("child_collection", "text", (c) => c.notNull()).addColumn("parent_label", "text", (c) => c.notNull()).addColumn("child_label", "text", (c) => c.notNull()).addColumn("parent_label_singular", "text").addColumn("child_label_singular", "text").addColumn("max_children_per_parent", "integer").addColumn("max_parents_per_child", "integer").addColumn("created_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addColumn("updated_at", "text", (c) => c.defaultTo(currentTimestamp(db))).addUniqueConstraint("_emdash_relations_slug_unique", ["slug"]).execute();
}
async function createRelationIndexes(db) {
	await db.schema.createIndex("idx__emdash_relations_parent_collection").ifNotExists().on("_emdash_relations").column("parent_collection").execute();
	await db.schema.createIndex("idx__emdash_relations_child_collection").ifNotExists().on("_emdash_relations").column("child_collection").execute();
}
/**
* Rename the edge table's relation column. The column holds a relation id now,
* not a translation group. Values are unchanged — `id` was preserved from the
* group — so this is a rename, not a remap. SQLite and Postgres both carry
* indexes and constraints across `RENAME COLUMN`.
*/
async function renameEdgeRelationColumn(db) {
	if (!await columnExists(db, "_emdash_content_references", "relation_group")) return;
	await sql.raw(`ALTER TABLE "_emdash_content_references" RENAME COLUMN "relation_group" TO "relation_id"`).execute(db);
}
async function up$5(db) {
	if (await tableExists(db, "_emdash_relations_new") && !await tableExists(db, "_emdash_relations")) await sql.raw(`ALTER TABLE "_emdash_relations_new" RENAME TO "_emdash_relations"`).execute(db);
	if (await columnExists(db, "_emdash_relations", "slug")) {
		await createRelationIndexes(db);
		await renameEdgeRelationColumn(db);
		return;
	}
	const collapsed = collapseGroups((await sql`
		SELECT id, name, parent_collection, child_collection,
		       parent_label, child_label, locale, translation_group
		FROM ${sql.ref("_emdash_relations")}
	`.execute(db)).rows);
	await sql.raw(`DROP TABLE IF EXISTS "_emdash_relations_new"`).execute(db);
	await createRelationsTable(db, "_emdash_relations_new");
	for (const row of collapsed) await sql`
			INSERT INTO ${sql.ref("_emdash_relations_new")}
				(id, slug, parent_collection, child_collection, parent_label, child_label)
			VALUES (${row.id}, ${row.slug}, ${row.parent_collection}, ${row.child_collection},
			        ${row.parent_label}, ${row.child_label})
		`.execute(db);
	await db.schema.dropTable("_emdash_relations").execute();
	await sql.raw(`ALTER TABLE "_emdash_relations_new" RENAME TO "_emdash_relations"`).execute(db);
	await createRelationIndexes(db);
	await renameEdgeRelationColumn(db);
}
async function down$5(_db) {}
var _087_reference_field_relations_exports = /* @__PURE__ */ __exportAll({
	down: () => down$4,
	up: () => up$4
});
/**
* Give a reference field created before relations existed the relation it needs
* to work as a picker.
*
* Such a field names its target in `options.collection` and keeps a TEXT column
* holding either one entry id or a JSON array of them. A field with no
* `validation.relation` still reads and writes that column, so this migration is
* an upgrade rather than a repair: it creates one relation per field, copies the
* column's ids in as edges, and records the relation on the field row.
*
* The column is left in place. Nothing reads it once the field is bound, but
* dropping it would discard the only copy of any value whose target entry could
* not be resolved.
*
* Writing `validation.relation` is the completion fence: a rerun sees it and
* skips the field, so a lost D1 response cannot wire a field twice. Relation
* creation and the edge copy are each idempotent on their own — the relation is
* created under the field's own id, so a rerun recognizes its own half-finished
* work and anything else at that slug as somebody else's, and the edge table's
* unique constraint absorbs a repeated copy.
*
* A field is left unbound when its target cannot be resolved, when it is indexed
* or searchable, when its relation slug is taken, and when its locale rows
* disagree about what it selects. Such a field keeps behaving exactly as it did;
* an editor can bind it later by setting a target collection in the schema
* editor.
*
* The edge copy below is duplicated from `backfillReferenceEdges`, which the
* schema handler runs for that manual binding, and it batches with a local
* constant rather than `SQL_BATCH_SIZE`. A migration reaches only for modules
* nothing outside the runner imports: the bundler otherwise puts a shared module
* in a chunk that cycles with the runner's, and the built package throws on
* import. A shipped migration has to keep batching the way it did anyway.
*/
/** Ids per statement while resolving children, within D1's 100-parameter ceiling. */
var ID_BATCH_SIZE = 50;
/** Edges per INSERT: each binds six values, within D1's 100-parameter ceiling. */
var EDGE_INSERT_BATCH_SIZE = Math.floor(100 / 6);
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function parseJsonObject(value) {
	if (!value) return {};
	try {
		const parsed = JSON.parse(value);
		return isRecord(parsed) ? parsed : {};
	} catch {
		return {};
	}
}
function readString(source, key) {
	const value = source[key];
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
/**
* The ids one legacy column value holds: a JSON array for a multiple-reference
* field (`serializeValue` stringifies it), or the id itself.
*/
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
* What one field's column holds, per translation group, as the translation
* groups it selects — or `null` when its locale rows disagree.
*
* A link belongs to the group, not to one locale's row of it, so a field whose
* locale rows made different choices has no selection this can carry over: the
* union would hand each locale the other's entries, and keeping one locale's
* answer would throw the other's away. Neither is the selection the site has, so
* such a field is left unbound with its column intact, for an editor to settle
* and bind by hand.
*
* Disagreement is judged on translation groups rather than on the ids in the
* column, because that is what an edge names: two locale rows pointing at their
* own locale's row of one entry have made the same choice twice, which is
* exactly how a localized site holds a reference. Comparing ids would read that
* as a conflict and leave the field unbound.
*
* A row that chose nothing does not disagree with one that did — it is the same
* group's single answer, arrived at once.
*/
async function readColumnSelections(db, field) {
	const parentTable = `ec_${field.collectionSlug}`;
	const childTable = `ec_${field.targetCollection}`;
	validateIdentifier(parentTable, "content table name");
	validateIdentifier(childTable, "content table name");
	validateIdentifier(field.fieldSlug, "content field name");
	if (!await tableExists(db, parentTable) || !await tableExists(db, childTable)) return /* @__PURE__ */ new Map();
	const entries = await sql`
		SELECT translation_group, ${sql.ref(field.fieldSlug)} AS value
		FROM ${sql.ref(parentTable)}
		WHERE ${sql.ref(field.fieldSlug)} IS NOT NULL
		ORDER BY locale, id
	`.execute(db);
	const rows = [];
	for (const entry of entries.rows) {
		if (!entry.translation_group) continue;
		const ids = parseColumnIds(entry.value);
		if (ids.length === 0) continue;
		rows.push({
			parentGroup: entry.translation_group,
			ids
		});
	}
	if (rows.length === 0) return /* @__PURE__ */ new Map();
	const childGroups = await resolveChildGroups(db, childTable, [...new Set(rows.flatMap((row) => row.ids))]);
	const selections = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const groups = [];
		for (const id of row.ids) {
			const group = childGroups.get(id);
			if (group && !groups.includes(group)) groups.push(group);
		}
		const existing = selections.get(row.parentGroup);
		if (!existing) {
			selections.set(row.parentGroup, groups);
			continue;
		}
		if (existing.length !== groups.length || existing.some((group, index) => group !== groups[index])) return null;
	}
	return selections;
}
/** The translation group each of `ids` belongs to, for the ids that still resolve. */
async function resolveChildGroups(db, childTable, ids) {
	const childGroups = /* @__PURE__ */ new Map();
	for (let offset = 0; offset < ids.length; offset += ID_BATCH_SIZE) {
		const batch = ids.slice(offset, offset + ID_BATCH_SIZE);
		const resolved = await sql`
			SELECT id, translation_group
			FROM ${sql.ref(childTable)}
			WHERE id IN (${sql.join(batch)})
		`.execute(db);
		for (const row of resolved.rows) if (row.translation_group) childGroups.set(row.id, row.translation_group);
	}
	return childGroups;
}
/**
* Copy one field's resolved selections in as edges.
*
* Edges an interrupted run already wrote are not sent again, so a rerun only
* pays for what is still missing and a copy too large for one invocation
* finishes over several.
*/
async function backfillEdges(db, relationId, maxChildren, selections) {
	if (selections.size === 0) return;
	const copied = await sql`
		SELECT parent_group, child_group
		FROM ${sql.ref("_emdash_content_references")}
		WHERE relation_id = ${relationId}
	`.execute(db);
	const copiedByParent = /* @__PURE__ */ new Map();
	for (const edge of copied.rows) {
		const children = copiedByParent.get(edge.parent_group) ?? /* @__PURE__ */ new Set();
		children.add(edge.child_group);
		copiedByParent.set(edge.parent_group, children);
	}
	const rows = [];
	for (const parentGroup of [...selections.keys()].toSorted()) {
		const groups = selections.get(parentGroup) ?? [];
		const selected = maxChildren === null ? groups : groups.slice(0, maxChildren);
		const alreadyCopied = copiedByParent.get(parentGroup);
		for (const [sortOrder, childGroup] of selected.entries()) {
			if (alreadyCopied?.has(childGroup)) continue;
			rows.push({
				parentGroup,
				childGroup,
				sortOrder
			});
		}
	}
	const now = currentTimestampValue(db);
	for (let offset = 0; offset < rows.length; offset += EDGE_INSERT_BATCH_SIZE) {
		const values = rows.slice(offset, offset + EDGE_INSERT_BATCH_SIZE).map((row) => sql`(${ulid()}, ${relationId}, ${row.parentGroup}, ${row.childGroup}, ${row.sortOrder}, ${now})`);
		await sql`
			INSERT INTO ${sql.ref("_emdash_content_references")}
				(id, relation_id, parent_group, child_group, sort_order, created_at)
			VALUES ${sql.join(values)}
			ON CONFLICT DO NOTHING
		`.execute(db);
	}
}
/**
* Which reference fields to bind, and to what.
*
* A field is skipped when its target cannot be resolved to an existing
* collection, and when it is `indexed` or `searchable`. Both flags mean the site
* queries the column through an index — a content-list field filter, or the FTS
* table — and binding the field freezes that column, so the migration leaves
* those fields alone rather than changing the results of a query the site
* already runs.
*/
async function findLegacyReferenceFields(db) {
	const fields = await sql`
		SELECT f.id AS field_id, f.slug AS field_slug, f.label AS field_label,
		       f.validation, f.options, f.indexed, f.searchable,
		       c.slug AS collection_slug, c.label AS collection_label,
		       c.label_singular AS collection_label_singular
		FROM ${sql.ref("_emdash_fields")} AS f
		INNER JOIN ${sql.ref("_emdash_collections")} AS c ON c.id = f.collection_id
		WHERE f.type = 'reference'
		ORDER BY c.slug, f.slug
	`.execute(db);
	const collections = await sql`
		SELECT slug FROM ${sql.ref("_emdash_collections")}
	`.execute(db);
	const known = new Set(collections.rows.map((row) => row.slug));
	const legacy = [];
	const boundSlugs = /* @__PURE__ */ new Set();
	for (const row of fields.rows) {
		const validation = parseJsonObject(row.validation);
		const boundTo = readString(validation, "relation");
		if (boundTo) {
			boundSlugs.add(boundTo);
			continue;
		}
		if (row.indexed === 1 || row.searchable === 1) continue;
		const options = parseJsonObject(row.options);
		const targetCollection = readString(options, "collection") ?? readString(validation, "targetCollection") ?? readString(validation, "collection");
		if (!targetCollection || !known.has(targetCollection)) continue;
		legacy.push({
			fieldId: row.field_id,
			collectionSlug: row.collection_slug,
			collectionLabel: row.collection_label,
			collectionLabelSingular: row.collection_label_singular,
			fieldSlug: row.field_slug,
			fieldLabel: row.field_label,
			validation,
			targetCollection,
			allowMultiple: options.allowMultiple === true
		});
	}
	return {
		fields: legacy,
		boundSlugs
	};
}
async function up$4(db) {
	const { fields, boundSlugs } = await findLegacyReferenceFields(db);
	for (const field of fields) {
		const maxChildren = field.allowMultiple ? null : 1;
		const slug = `${field.collectionSlug}_${field.fieldSlug}`.slice(0, 63);
		const selections = await readColumnSelections(db, field);
		if (selections === null) continue;
		const existing = await sql`
			SELECT id FROM ${sql.ref("_emdash_relations")} WHERE slug = ${slug}
		`.execute(db);
		const relationId = field.fieldId;
		const claimed = existing.rows[0];
		if (claimed) {
			if (claimed.id !== relationId || boundSlugs.has(slug)) continue;
		} else await sql`
				INSERT INTO ${sql.ref("_emdash_relations")}
					(id, slug, parent_collection, child_collection, parent_label, parent_label_singular,
					 child_label, max_children_per_parent, created_at, updated_at)
				VALUES (${relationId}, ${slug}, ${field.collectionSlug}, ${field.targetCollection},
				        ${field.collectionLabel}, ${field.collectionLabelSingular},
				        ${field.fieldLabel}, ${maxChildren},
				        ${currentTimestampValue(db)}, ${currentTimestampValue(db)})
			`.execute(db);
		await backfillEdges(db, relationId, maxChildren, selections);
		const validation = {
			...field.validation,
			relation: slug,
			relationSide: "parent",
			targetCollection: field.targetCollection,
			multiple: field.allowMultiple
		};
		await sql`
			UPDATE ${sql.ref("_emdash_fields")}
			SET validation = ${JSON.stringify(validation)}
			WHERE id = ${field.fieldId}
		`.execute(db);
		boundSlugs.add(slug);
	}
}
async function down$4(_db) {}
var _088_cron_oneshot_utc_exports = /* @__PURE__ */ __exportAll({
	down: () => down$3,
	up: () => up$3
});
var BATCH_SIZE = 100;
var ISO_TIMEZONE_PATTERN = /(?:Z|[+-]\d{2}:?\d{2})$/;
async function up$3(db) {
	let cursor = "";
	for (;;) {
		const rows = await sql`
			SELECT id, next_run_at
			FROM _emdash_cron_tasks
			WHERE is_oneshot = 1 AND id > ${cursor}
			ORDER BY id
			LIMIT ${BATCH_SIZE}
		`.execute(db);
		if (rows.rows.length === 0) break;
		for (const row of rows.rows) {
			const normalized = row.next_run_at.replace(" ", "T");
			const input = ISO_TIMEZONE_PATTERN.test(normalized) ? normalized : `${normalized}Z`;
			const parsed = new Date(input);
			if (Number.isNaN(parsed.getTime())) continue;
			const canonical = parsed.toISOString();
			if (canonical === row.next_run_at) continue;
			await sql`
				UPDATE _emdash_cron_tasks
				SET next_run_at = ${canonical}
				WHERE id = ${row.id} AND next_run_at = ${row.next_run_at}
			`.execute(db);
		}
		cursor = rows.rows.at(-1).id;
		if (rows.rows.length < BATCH_SIZE) break;
	}
}
async function down$3(_db) {}
var _089_auto_seed_completion_exports = /* @__PURE__ */ __exportAll({
	down: () => down$2,
	up: () => up$2
});
async function up$2(db) {
	await sql`
		INSERT INTO options (name, value)
		SELECT 'emdash:seed_complete', 'true'
		WHERE EXISTS (SELECT 1 FROM _emdash_collections)
		ON CONFLICT (name) DO NOTHING
	`.execute(db);
}
async function down$2(_db) {}
var _090_redirect_enable_loop_guard_exports = /* @__PURE__ */ __exportAll({
	down: () => down$1,
	up: () => up$1
});
/**
* Rejects enabling a disabled redirect when its edge would close a loop.
* The loop guards from 081 only fire when source or destination changes.
*/
async function up$1(db) {
	if (isPostgres(db)) {
		await sql`
			CREATE OR REPLACE FUNCTION emdash_redirect_validate_enable()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				PERFORM pg_advisory_xact_lock(1168624763);
				IF EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1 AND id <> NEW.id
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1 AND redirect.id <> NEW.id
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				) THEN
					RAISE EXCEPTION 'redirect loop';
				END IF;
				RETURN NEW;
			END;
			$$
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_loop_enable ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_loop_enable
			BEFORE UPDATE OF enabled ON _emdash_redirects
			FOR EACH ROW
			WHEN (NEW.enabled = 1 AND OLD.enabled IS DISTINCT FROM 1 AND NEW.destination <> '')
			EXECUTE FUNCTION emdash_redirect_validate_enable()
		`.execute(db);
		return;
	}
	await sql`
		CREATE TRIGGER IF NOT EXISTS emdash_redirect_loop_enable
		BEFORE UPDATE OF enabled ON _emdash_redirects
		WHEN NEW.enabled = 1 AND OLD.enabled IS NOT 1 AND NEW.destination <> ''
		BEGIN
			SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
				WITH RECURSIVE chain(source, destination) AS (
					SELECT source, destination FROM _emdash_redirects
					WHERE source = NEW.destination AND enabled = 1 AND id <> NEW.id
					UNION
					SELECT redirect.source, redirect.destination
					FROM _emdash_redirects AS redirect
					JOIN chain ON redirect.source = chain.destination
					WHERE redirect.enabled = 1 AND redirect.id <> NEW.id
				)
				SELECT 1 FROM chain WHERE destination = NEW.source
			);
		END
	`.execute(db);
}
async function down$1(_db) {}
var _091_redirect_artifacts_exports = /* @__PURE__ */ __exportAll({
	down: () => down,
	up: () => up
});
/**
* Published redirect artifacts: compact, content-addressed snapshots of the
* enabled redirect rules that the middleware loads in one query.
*
* `revision` counts changes to the columns enabled rules are published from
* and is bumped by triggers, so writes that bypass the handlers still mark the
* published generation stale. Hit tracking does not bump it.
*/
async function up(db) {
	const postgres = isPostgres(db);
	await db.schema.createTable("_emdash_redirect_state").ifNotExists().addColumn("id", "integer", (column) => column.primaryKey()).addColumn("revision", "integer", (column) => column.notNull().defaultTo(0)).addColumn("generation", "text").addColumn("generation_revision", "integer", (column) => column.notNull().defaultTo(-1)).addColumn("repair_expires_at", postgres ? "bigint" : "integer", (column) => column.notNull().defaultTo(0)).execute();
	await sql`
		INSERT INTO _emdash_redirect_state (id, revision, generation, generation_revision, repair_expires_at)
		VALUES (1, 0, NULL, -1, 0)
		ON CONFLICT (id) DO NOTHING
	`.execute(db);
	await db.schema.createTable("_emdash_redirect_artifacts").ifNotExists().addColumn("digest", "text", (column) => column.primaryKey()).addColumn("kind", "text", (column) => column.notNull()).addColumn("payload", "text", (column) => column.notNull()).execute();
	await db.schema.createTable("_emdash_redirect_generation_artifacts").ifNotExists().addColumn("generation", "text", (column) => column.notNull()).addColumn("position", "integer", (column) => column.notNull()).addColumn("digest", "text", (column) => column.notNull()).addPrimaryKeyConstraint("pk_emdash_redirect_generation_artifacts", ["generation", "position"]).execute();
	await db.schema.createIndex("idx_emdash_redirect_generation_artifacts_digest").ifNotExists().on("_emdash_redirect_generation_artifacts").column("digest").execute();
	if (postgres) {
		await sql`
			CREATE OR REPLACE FUNCTION emdash_redirect_bump_revision()
			RETURNS trigger
			LANGUAGE plpgsql
			AS $$
			BEGIN
				UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
				RETURN NULL;
			END;
			$$
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_state_revision_insert ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_state_revision_insert
			AFTER INSERT ON _emdash_redirects
			FOR EACH ROW
			WHEN (NEW.enabled = 1)
			EXECUTE FUNCTION emdash_redirect_bump_revision()
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_state_revision_delete ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_state_revision_delete
			AFTER DELETE ON _emdash_redirects
			FOR EACH ROW
			WHEN (OLD.enabled = 1)
			EXECUTE FUNCTION emdash_redirect_bump_revision()
		`.execute(db);
		await sql`DROP TRIGGER IF EXISTS emdash_redirect_state_revision_update ON _emdash_redirects`.execute(db);
		await sql`
			CREATE TRIGGER emdash_redirect_state_revision_update
			AFTER UPDATE OF source, destination, enabled, is_pattern, type, created_at ON _emdash_redirects
			FOR EACH ROW
			WHEN ((NEW.enabled = 1 OR OLD.enabled = 1) AND (
				NEW.source IS DISTINCT FROM OLD.source OR
				NEW.destination IS DISTINCT FROM OLD.destination OR
				NEW.enabled IS DISTINCT FROM OLD.enabled OR
				NEW.is_pattern IS DISTINCT FROM OLD.is_pattern OR
				NEW.type IS DISTINCT FROM OLD.type OR
				NEW.created_at IS DISTINCT FROM OLD.created_at
			))
			EXECUTE FUNCTION emdash_redirect_bump_revision()
		`.execute(db);
		return;
	}
	await sql`
		CREATE TRIGGER IF NOT EXISTS emdash_redirect_state_revision_insert
		AFTER INSERT ON _emdash_redirects
		WHEN NEW.enabled = 1
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END
	`.execute(db);
	await sql`
		CREATE TRIGGER IF NOT EXISTS emdash_redirect_state_revision_delete
		AFTER DELETE ON _emdash_redirects
		WHEN OLD.enabled = 1
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END
	`.execute(db);
	await sql`
		CREATE TRIGGER IF NOT EXISTS emdash_redirect_state_revision_update
		AFTER UPDATE OF source, destination, enabled, is_pattern, type, created_at ON _emdash_redirects
		WHEN (NEW.enabled = 1 OR OLD.enabled = 1) AND (
			NEW.source IS NOT OLD.source OR
			NEW.destination IS NOT OLD.destination OR
			NEW.enabled IS NOT OLD.enabled OR
			NEW.is_pattern IS NOT OLD.is_pattern OR
			NEW.type IS NOT OLD.type OR
			NEW.created_at IS NOT OLD.created_at
		)
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END
	`.execute(db);
}
async function down(_db) {}
async function countCapped(db, rows, cap) {
	try {
		const result = await sql`
			SELECT COUNT(*) AS count FROM (${rows} LIMIT ${cap}) AS capped
		`.execute(db);
		return Number(result.rows[0]?.count ?? 0);
	} catch (error) {
		if (isMissingTableError(error)) return 0;
		throw error;
	}
}
var DATETIME_COLLECTIONS = sql`
	SELECT collection.slug FROM _emdash_collections AS collection
	INNER JOIN _emdash_fields AS field ON field.collection_id = collection.id
	WHERE field.type IN ('datetime', 'repeater')
`;
/**
* 079 can update every content entry, and every revision of a collection with
* datetime or repeater fields, one statement each. It only reads the other
* revisions, 50 per statement in each of its three passes, so about 16 of them
* cost what one written row does.
*/
var READ_ONLY_REVISIONS_PER_ROW = 16;
async function countDatetimeNormalizationRows(db, cap) {
	let slugs;
	try {
		slugs = (await db.selectFrom("_emdash_collections").select("slug").execute()).map((collection) => collection.slug);
	} catch (error) {
		if (isMissingTableError(error)) return 0;
		throw error;
	}
	let rows = await countCapped(db, sql`SELECT 1 FROM revisions WHERE collection IN (${DATETIME_COLLECTIONS})`, cap);
	for (const slug of slugs) {
		if (rows >= cap) return rows;
		validateIdentifier(slug, "collection slug");
		rows += await countCapped(db, sql`SELECT 1 FROM ${sql.ref(`ec_${slug}`)}`, cap - rows);
	}
	if (rows >= cap) return rows;
	const readOnly = await countCapped(db, sql`SELECT 1 FROM revisions WHERE collection NOT IN (${DATETIME_COLLECTIONS})`, (cap - rows) * READ_ONLY_REVISIONS_PER_ROW);
	return rows + Math.ceil(readOnly / READ_ONLY_REVISIONS_PER_ROW);
}
/** Keyed by migration name, since a published migration's module must not change. */
var CONTENT_SIZED_MIGRATIONS = /* @__PURE__ */ new Map([["079_datetime_normalization", { countRows: countDatetimeNormalizationRows }]]);
var MIGRATIONS = Object.freeze({
	"001_initial": _001_initial_exports,
	"002_media_status": _002_media_status_exports,
	"003_schema_registry": _003_schema_registry_exports,
	"004_plugins": _004_plugins_exports,
	"005_menus": _005_menus_exports,
	"006_taxonomy_defs": _006_taxonomy_defs_exports,
	"007_widgets": _007_widgets_exports,
	"008_auth": _008_auth_exports,
	"009_user_disabled": _009_user_disabled_exports,
	"011_sections": _011_sections_exports,
	"012_search": _012_search_exports,
	"013_scheduled_publishing": _013_scheduled_publishing_exports,
	"014_draft_revisions": _014_draft_revisions_exports,
	"015_indexes": _015_indexes_exports,
	"016_api_tokens": _016_api_tokens_exports,
	"017_authorization_codes": _017_authorization_codes_exports,
	"018_seo": _018_seo_exports,
	"019_i18n": _019_i18n_exports,
	"020_collection_url_pattern": _020_collection_url_pattern_exports,
	"021_remove_section_categories": _021_remove_section_categories_exports,
	"022_marketplace_plugin_state": _022_marketplace_plugin_state_exports,
	"023_plugin_metadata": _023_plugin_metadata_exports,
	"024_media_placeholders": _024_media_placeholders_exports,
	"025_oauth_clients": _025_oauth_clients_exports,
	"026_cron_tasks": _026_cron_tasks_exports,
	"027_comments": _027_comments_exports,
	"028_drop_author_url": _028_drop_author_url_exports,
	"029_redirects": _029_redirects_exports,
	"030_widen_scheduled_index": _030_widen_scheduled_index_exports,
	"031_bylines": _031_bylines_exports,
	"032_rate_limits": _032_rate_limits_exports,
	"033_optimize_content_indexes": _033_optimize_content_indexes_exports,
	"034_published_at_index": _034_published_at_index_exports,
	"035_bounded_404_log": _035_bounded_404_log_exports,
	"036_i18n_menus_and_taxonomies": _036_i18n_menus_and_taxonomies_exports,
	"037_credential_algorithm": _037_credential_algorithm_exports,
	"038_registry_plugin_state": _038_registry_plugin_state_exports,
	"039_fix_fts5_triggers": _039_fix_fts5_triggers_exports,
	"040_byline_i18n": _040_byline_i18n_exports,
	"041_content_locale_list_index": _041_content_locale_list_index_exports,
	"042_byline_fields": _042_byline_fields_exports,
	"043_content_references": _043_content_references_exports,
	"044_comment_reactions": _044_comment_reactions_exports,
	"045_taxonomy_parent_group": _045_taxonomy_parent_group_exports,
	"046_media_usage_index": _046_media_usage_index_exports,
	"047_restore_taxonomy_parent_index": _047_restore_taxonomy_parent_index_exports,
	"048_restore_content_taxonomies_term_index": _048_restore_content_taxonomies_term_index_exports,
	"049_taxonomies_name_locale_index": _049_taxonomies_name_locale_index_exports,
	"050_media_usage_index_status": _050_media_usage_index_status_exports,
	"051_content_taxonomies_denorm": _051_content_taxonomies_denorm_exports,
	"052_media_usage_read_index": _052_media_usage_read_index_exports,
	"053_plugin_mcp_tools": _053_plugin_mcp_tools_exports,
	"054_media_upload_attempts": _054_media_upload_attempts_exports,
	"055_content_translation_group_locale_index": _055_content_translation_group_locale_index_exports,
	"056_taxonomy_term_sort_order": _056_taxonomy_term_sort_order_exports,
	"057_collection_hidden": _057_collection_hidden_exports,
	"058_collection_sort_order": _058_collection_sort_order_exports,
	"059_revision_prune_queue": _059_revision_prune_queue_exports,
	"060_collection_admin_config": _060_collection_admin_config_exports,
	"061_media_usage_cleanup": _061_media_usage_cleanup_exports,
	"062_media_usage_cleanup_fence": _062_media_usage_cleanup_fence_exports,
	"063_media_usage_incremental_work": _063_media_usage_incremental_work_exports,
	"064_fts_plain_text": _064_fts_plain_text_exports,
	"065_media_usage_collection_deletion": _065_media_usage_collection_deletion_exports,
	"066_media_usage_reconciliation": _066_media_usage_reconciliation_exports,
	"067_indexed_content_fields": _067_indexed_content_fields_exports,
	"068_content_taxonomy_entry_groups": _068_content_taxonomy_entry_groups_exports,
	"069_collection_title_date_fields": _069_collection_title_date_fields_exports,
	"070_collection_routable": _070_collection_routable_exports,
	"071_restore_content_bylines_table": _071_restore_content_bylines_table_exports,
	"072_media_folders": _072_media_folders_exports,
	"073_media_focal_point": _073_media_focal_point_exports,
	"074_content_deleted_scheduled_index": _074_content_deleted_scheduled_index_exports,
	"075_entry_edit_locks": _075_entry_edit_locks_exports,
	"076_collection_nav_group": _076_collection_nav_group_exports,
	"077_plugin_storage_revisions": _077_plugin_storage_revisions_exports,
	"078_menu_item_translation_groups": _078_menu_item_translation_groups_exports,
	"079_datetime_normalization": _079_datetime_normalization_exports,
	"080_content_translation_locale_unique": _080_content_translation_locale_unique_exports,
	"081_redirect_write_guards": _081_redirect_write_guards_exports,
	"082_taxonomy_translation_locale_unique": _082_taxonomy_translation_locale_unique_exports,
	"083_block_types": _083_block_types_exports,
	"084_site_transfer": _084_site_transfer_exports,
	"085_taxonomy_def_groups": _085_taxonomy_def_groups_exports,
	"086_relations_structural": _086_relations_structural_exports,
	"087_reference_field_relations": _087_reference_field_relations_exports,
	"088_cron_oneshot_utc": _088_cron_oneshot_utc_exports,
	"089_auto_seed_completion": _089_auto_seed_completion_exports,
	"090_redirect_enable_loop_guard": _090_redirect_enable_loop_guard_exports,
	"091_redirect_artifacts": _091_redirect_artifacts_exports
});
/** Ordered names from the statically registered migration set. */
var MIGRATION_NAMES = Object.freeze(Object.keys(MIGRATIONS));
/** Total number of registered migrations. Exported for use in tests. */
var MIGRATION_COUNT = MIGRATION_NAMES.length;
/**
* Migration provider that uses statically imported migrations.
* This approach works well with bundlers and avoids filesystem access.
*/
var StaticMigrationProvider = class {
	async getMigrations() {
		return MIGRATIONS;
	}
};
/**
* Thrown when another instance held the migration lock for the whole wait
* window. This is NOT a migration failure — the holder may simply be slow
* (e.g. many pending migrations over a remote Postgres connection) — so
* callers with failure-backoff logic (`getDatabase` in emdash-runtime.ts)
* exempt it: the next request waits again instead of backing off, and init
* recovers as soon as the holder finishes.
*/
var ConcurrentMigrationTimeoutError = class extends Error {
	constructor(waitMs) {
		super(`Timed out waiting for another instance's migrations: the migration lock was still held after ${waitMs}ms. It may still be applying migrations, or its migration may be failing repeatedly.`);
		this.name = "ConcurrentMigrationTimeoutError";
	}
};
/**
* Thrown without waiting when the migration lock is older than
* MIGRATION_LOCK_WAIT_MAX_AGE_MS. Callers with failure backoff apply it: the
* holder has most likely stopped, and only a person can release its lock.
*/
var MigrationLockHeldError = class extends Error {
	heldSince;
	constructor(heldSince) {
		super(migrationLockHeldMessage(heldSince));
		this.name = "MigrationLockHeldError";
		this.heldSince = heldSince;
	}
};
/**
* Thrown when the migrator reports an error while applying pending migrations.
* Callers with failure backoff apply it. Errors from the applied-migration
* count check before the migrator runs are not wrapped and stay retryable.
*/
var MigrationFailedError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "MigrationFailedError";
	}
};
/**
* Thrown before the migration lock is taken when the pending content-sized
* migrations process more rows than the caller's `contentRowLimit`. Nothing
* has been applied; `emdash migrate` applies them outside a request.
*/
var MigrationRowLimitError = class extends Error {
	migrations;
	rowLimit;
	constructor(migrations, rowLimit) {
		super(`Pending migration ${migrations.join(", ")} processes more than ${rowLimit} content rows, too many to apply while serving a request. Apply it with \`emdash migrate\`: https://docs.emdashcms.com/deployment/core-migrations/#apply-large-content-migrations-from-the-cli`);
		this.name = "MigrationRowLimitError";
		this.migrations = [...migrations];
		this.rowLimit = rowLimit;
	}
};
/** Custom migration table name */
var MIGRATION_TABLE = "_emdash_migrations";
function createMigrator(db, options) {
	return new Migrator({
		db,
		provider: new StaticMigrationProvider(),
		migrationTableName: MIGRATION_TABLE,
		migrationLockTableName: MIGRATION_LOCK_TABLE,
		migrationTableSchema: options?.migrationTableSchema
	});
}
/** Pattern for escaping special regex characters. Matches the shared helper in `database/repositories/content.ts`. */
var REGEX_ESCAPE_PATTERN = /[.*+?^${}()|[\]\\]/g;
/** Escape special regex characters so a string can be embedded literally in `new RegExp()`. */
function escapeRegExp(value) {
	return value.replace(REGEX_ESCAPE_PATTERN, "\\$&");
}
/**
* Pattern used to detect the concurrent-migration race. The Kysely
* `SqliteAdapter.acquireMigrationLock` is a no-op, so two processes migrating
* the same SQLite database (or the same D1 database, when one of them runs a
* build whose D1 adapter takes no lock) can both attempt
* `INSERT INTO _emdash_migrations` for the same migration name. The losing
* insert fails with a UNIQUE constraint error, which is benign: the other
* process is applying the same schema.
*
* We match on the table name (not the full error text) because different
* SQLite drivers phrase the message differently
* (`UNIQUE constraint failed: _emdash_migrations.name` for file-backed SQLite,
* `D1_ERROR: UNIQUE constraint failed: _emdash_migrations.name: SQLITE_CONSTRAINT`
* for D1, etc.). The pattern is built from `MIGRATION_TABLE` so a rename
* cannot silently disable race detection.
*/
var MIGRATION_RACE_PATTERN = new RegExp(`UNIQUE constraint failed: ${escapeRegExp(MIGRATION_TABLE)}\\.name`, "i");
/**
* How long to wait for a concurrent migrator to finish before giving up.
* Exported because the db init lock's reclaim deadline must comfortably
* exceed it (see DB_INIT_DEADLINE_MS in emdash-runtime.ts) — a healthy
* init can legitimately block this long inside waitForConcurrentMigrator.
*/
var MIGRATION_RACE_WAIT_MS = 1e4;
/** Polling interval while waiting for a concurrent migrator. */
var MIGRATION_RACE_POLL_MS = 100;
/**
* A migration lock older than this is not waited on. Its holder has most
* likely stopped, and polling a lock that only a person can release would add
* a 10-second stall and a hundred queries to every runtime init until then.
*/
var MIGRATION_LOCK_WAIT_MAX_AGE_MS = 6e4;
/**
* Pattern used to detect "table does not exist" errors across the dialects
* EmDash supports. The phrasing differs by driver:
*
*   - SQLite:         `no such table: _emdash_migrations`
*   - D1:             `D1_ERROR: no such table: _emdash_migrations: SQLITE_ERROR`
*   - PostgreSQL:     `relation "_emdash_migrations" does not exist`
*                     (also occasionally `table "_emdash_migrations" does not exist`)
*
* We deliberately match on the migration table name (rather than using the
* generic `isMissingTableError` helper) so an unexpected missing-table error
* naming a different table — implausible today since
* `getAppliedMigrationCount` only references `MIGRATION_TABLE`, but cheap
* insurance against future edits — is not silently swallowed. The pattern is
* built from `MIGRATION_TABLE` so a rename cannot drift.
*/
var MIGRATION_TABLE_MISSING_PATTERN = new RegExp(`(?:no such table:\\s*(?:[a-z][a-z0-9_]*\\.)?${escapeRegExp(MIGRATION_TABLE)}\\b|(?:relation|table)\\s+"?(?:[a-z][a-z0-9_]*\\.)?${escapeRegExp(MIGRATION_TABLE)}"?\\s+does(?:n't| not) exist\\b)`, "i");
/**
* Read the count of applied migrations.
*
* Returns `null` only when the migration table does not exist yet (which is
* the normal state on a fresh database before the first migration runs).
* Any other error is rethrown so callers — particularly
* `waitForConcurrentMigrator` — don't silently mask connection failures,
* permission errors, or other unexpected driver problems behind a 10s wait
* and a bogus "we're done" verdict.
*/
async function getAppliedMigrationCount(db) {
	try {
		const result = await sql`
			SELECT COUNT(*) as count FROM ${sql.ref(MIGRATION_TABLE)}
		`.execute(db);
		return Number(result.rows[0]?.count ?? 0);
	} catch (error) {
		if (MIGRATION_TABLE_MISSING_PATTERN.test(deepErrorMessage(error))) return null;
		throw error;
	}
}
/**
* Wait for a concurrent migrator to finish applying all migrations.
*
* Resolves to `true` once the migration table contains at least
* `MIGRATION_COUNT` rows (i.e. every migration this build knows about has
* been recorded), `false` if the deadline elapses first. We use `>=` rather
* than `===` so that an old isolate observing a database that has already
* been migrated by a newer build still treats the wait as settled instead
* of timing out.
*/
async function waitForConcurrentMigrator(db, waitMs = MIGRATION_RACE_WAIT_MS) {
	const deadline = Date.now() + waitMs;
	while (Date.now() < deadline) {
		const count = await getAppliedMigrationCount(db);
		if (count !== null && count >= MIGRATION_COUNT) return true;
		await new Promise((resolve) => setTimeout(resolve, MIGRATION_RACE_POLL_MS));
	}
	const finalCount = await getAppliedMigrationCount(db);
	return finalCount !== null && finalCount >= MIGRATION_COUNT;
}
/** Extract the deepest error message available from a thrown value. */
function deepErrorMessage(error) {
	if (error instanceof Error) {
		const own = error.message ?? "";
		if (error.cause) {
			const causeMsg = deepErrorMessage(error.cause);
			return own ? `${own}: ${causeMsg}` : causeMsg;
		}
		return own;
	}
	if (typeof error === "string") return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
/**
* Read exact migration status without invoking Kysely's migration
* introspection. Registered names retain execution order; unknown database
* records are sorted so reports remain stable across dialects.
*/
async function getExactMigrationStatus(db, options) {
	const table = options?.migrationTableSchema ? sql`${sql.ref(options.migrationTableSchema)}.${sql.ref(MIGRATION_TABLE)}` : sql.ref(MIGRATION_TABLE);
	let rows;
	try {
		rows = (await sql`SELECT name FROM ${table}`.execute(db)).rows;
	} catch (error) {
		if (MIGRATION_TABLE_MISSING_PATTERN.test(deepErrorMessage(error))) return {
			knownApplied: [],
			pending: [...MIGRATION_NAMES],
			unknownApplied: []
		};
		throw error;
	}
	const appliedNames = new Set(rows.map((row) => row.name));
	const knownApplied = MIGRATION_NAMES.filter((name) => appliedNames.has(name));
	const pending = MIGRATION_NAMES.filter((name) => !appliedNames.has(name));
	const knownNames = new Set(MIGRATION_NAMES);
	return {
		knownApplied,
		pending,
		unknownApplied: [...appliedNames].filter((name) => !knownNames.has(name)).toSorted()
	};
}
async function assertWithinContentRowLimit(db, rowLimit, options) {
	const { pending } = await getExactMigrationStatus(db, options);
	const sized = pending.filter((name) => CONTENT_SIZED_MIGRATIONS.has(name));
	let rows = 0;
	for (const name of sized) {
		const migration = CONTENT_SIZED_MIGRATIONS.get(name);
		if (!migration) continue;
		rows += await migration.countRows(db, rowLimit + 1 - rows);
		if (rows > rowLimit) throw new MigrationRowLimitError(sized, rowLimit);
	}
}
/**
* Run all pending migrations.
*
* Includes a fast-path: if the migration table already exists and contains
* at least MIGRATION_COUNT rows, all migrations this build knows about have
* been applied and we can skip the Kysely Migrator entirely. This avoids
* the expensive `pragma_table_info` introspection that Kysely runs for
* every table in the database (twice!) just to check if the migration
* tables exist. On D1 with ~57 tables, that's ~116 queries saved per init.
*
* Concurrent-migration safety: the Kysely Migrator's `acquireMigrationLock`
* is a no-op for SQLite, so two callers running this concurrently against the
* same database will both try to apply pending migrations. (D1 and Postgres
* take a lock, and the loser gets the busy error handled below.) SQLite
* serializes the writes, but the loser still surfaces a
* `UNIQUE constraint failed: _emdash_migrations.name` error. We treat that
* specific error as benign: another caller is already applying the same
* schema. We wait for the concurrent migrator to finish, then return
* success. This matches the user-observable expectation that running
* migrations twice in a row is a no-op.
*/
async function runMigrations(db, options) {
	if (!options?.migrationTableSchema) {
		const initialCount = await getAppliedMigrationCount(db);
		if (initialCount !== null && initialCount >= MIGRATION_COUNT) return { applied: [] };
	}
	if (options?.contentRowLimit !== void 0) await assertWithinContentRowLimit(db, options.contentRowLimit, options);
	const { error, results } = await createMigrator(db, options).migrateToLatest();
	const applied = results?.filter((r) => r.status === "Success").map((r) => r.migrationName) ?? [];
	if (error) {
		const msg = deepErrorMessage(error);
		const failedMigration = results?.find((r) => r.status === "Error");
		const lockBusy = msg.includes(MIGRATION_LOCK_BUSY_MESSAGE);
		const heldSince = lockBusy ? busyLockHeldSince(error) : void 0;
		if (heldSince !== void 0 && Date.now() - heldSince > MIGRATION_LOCK_WAIT_MAX_AGE_MS) throw new MigrationLockHeldError(heldSince);
		if (MIGRATION_RACE_PATTERN.test(msg) || lockBusy) {
			if (await waitForConcurrentMigrator(db, options?.raceWaitMs)) return { applied };
			if (lockBusy) throw new ConcurrentMigrationTimeoutError(options?.raceWaitMs ?? 1e4);
		}
		const failedSuffix = failedMigration ? ` (migration: ${failedMigration.migrationName})` : "";
		throw new MigrationFailedError(`Migration failed: ${msg || "unknown error"}${failedSuffix}`);
	}
	return { applied };
}
export { setI18nConfig as S, getLocaleRank as _, __exportAll as a, resolveConfiguredLocale as b, DatetimeNormalizationError as c, normalizeExplicitDatetime as d, LOCALE_CODE_PATTERN as f, getLocaleChainRank as g, getLocaleCandidates as h, MigrationRowLimitError as i, normalizeContentDatetimes as l, getI18nConfig as m, MigrationFailedError as n, getExactMigrationStatus as o, getFallbackChain as p, MigrationLockHeldError as r, runMigrations as s, MIGRATION_RACE_WAIT_MS as t, normalizeDatetime as u, isI18nEnabled as v, resolveContentCreateLocale as x, isValidLocaleCode as y };
