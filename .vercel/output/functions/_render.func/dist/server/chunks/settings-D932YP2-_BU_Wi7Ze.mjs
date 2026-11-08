import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { i as getRequestContext, t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { n as assertStorageKey, t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { r as resolvePluginEncryptionKeys } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import { a as encodeBase64url, r as decodeBase64url } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { n as invalidateSingleFlightCache, r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-D0EaGbN1_BgL4u_IC.mjs";
import { f as invalidateObjectCache, n as cachedQuery } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { n as peekRequestCache, r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as normalizeSiteSettingsVersion } from "./version-DqB7LIO7_XOqsc8vv.mjs";
import { f as getDb } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { r as bumpRunningExportWriteEpochs } from "./fence-Dagicj14_KC___fhN.mjs";
// node_modules/emdash/dist/plugin-utils.mjs
/**
* Narrow `unknown` to a plain object record.
*
* Useful for safely inspecting untyped API responses before accessing properties.
*/
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
// node_modules/emdash/dist/settings-D932YP2-.mjs
var ENVELOPE_VERSION = 1;
var ENVELOPE_MARKER = "plugin-setting";
var IV_BYTES = 12;
var KEY_ID_PATTERN = /^[0-9a-f]{8}$/;
var BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8", { fatal: true });
var PluginSettingEncryptionError = class extends Error {
	name = "PluginSettingEncryptionError";
	code;
	constructor(code, message) {
		super(message);
		this.code = code;
	}
};
function isEncryptedPluginSetting(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	return Object.keys(value).length === 5 && "$emdash" in value && value.$emdash === ENVELOPE_MARKER && "v" in value && value.v === ENVELOPE_VERSION && "kid" in value && typeof value.kid === "string" && KEY_ID_PATTERN.test(value.kid) && "iv" in value && typeof value.iv === "string" && BASE64URL_PATTERN.test(value.iv) && "ciphertext" in value && typeof value.ciphertext === "string" && BASE64URL_PATTERN.test(value.ciphertext);
}
function additionalData(pluginId, key) {
	return textEncoder.encode(JSON.stringify([
		"emdash-plugin-setting",
		ENVELOPE_VERSION,
		pluginId,
		key
	]));
}
function exactBuffer(bytes) {
	return bytes.slice().buffer;
}
async function importEncryptionKey(key, usage) {
	return crypto.subtle.importKey("raw", exactBuffer(key.key), "AES-GCM", false, [usage]);
}
async function keysOrDefault(keys) {
	return keys === void 0 ? resolvePluginEncryptionKeys() : keys;
}
async function encryptPluginSetting(pluginId, key, value, keys) {
	const primary = (await keysOrDefault(keys))?.[0];
	if (!primary) throw new PluginSettingEncryptionError("PLUGIN_SETTING_ENCRYPTION_KEY_MISSING", "Plugin secret settings require EMDASH_ENCRYPTION_KEY");
	try {
		const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
		const cryptoKey = await importEncryptionKey(primary, "encrypt");
		const ciphertext = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv: exactBuffer(iv),
			additionalData: exactBuffer(additionalData(pluginId, key))
		}, cryptoKey, exactBuffer(textEncoder.encode(value)));
		return {
			$emdash: ENVELOPE_MARKER,
			v: ENVELOPE_VERSION,
			kid: primary.kid,
			iv: encodeBase64url(iv),
			ciphertext: encodeBase64url(new Uint8Array(ciphertext))
		};
	} catch (error) {
		if (error instanceof PluginSettingEncryptionError) throw error;
		throw new PluginSettingEncryptionError("PLUGIN_SETTING_ENCRYPTION_FAILED", "Plugin secret setting could not be encrypted");
	}
}
async function decryptPluginSetting(pluginId, key, envelope, keys) {
	const resolved = await keysOrDefault(keys);
	if (!resolved?.length) throw new PluginSettingEncryptionError("PLUGIN_SETTING_ENCRYPTION_KEY_MISSING", "Plugin secret setting cannot be decrypted because its encryption key is unavailable");
	const matched = resolved.find((candidate) => candidate.kid === envelope.kid);
	if (!matched) throw new PluginSettingEncryptionError("PLUGIN_SETTING_ENCRYPTION_KEY_UNKNOWN", "Plugin secret setting was encrypted with an unavailable key");
	try {
		const iv = decodeBase64url(envelope.iv);
		const ciphertext = decodeBase64url(envelope.ciphertext);
		if (iv.byteLength !== IV_BYTES || ciphertext.byteLength < 16) throw new Error("invalid envelope");
		const cryptoKey = await importEncryptionKey(matched, "decrypt");
		const plaintext = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv: exactBuffer(iv),
			additionalData: exactBuffer(additionalData(pluginId, key))
		}, cryptoKey, exactBuffer(ciphertext));
		return textDecoder.decode(plaintext);
	} catch {
		throw new PluginSettingEncryptionError("PLUGIN_SETTING_DECRYPTION_FAILED", "Plugin secret setting could not be decrypted");
	}
}
function isSecretField(schema, key) {
	return schema[key]?.type === "secret";
}
async function encodePluginSettingValue(pluginId, key, value, schema, keys, onSecret) {
	if (!isSecretField(schema, key)) return value;
	if (typeof value !== "string") throw new PluginSettingEncryptionError("PLUGIN_SETTING_ENCRYPTION_FAILED", "Plugin secret settings must be strings");
	onSecret?.(key, value);
	return encryptPluginSetting(pluginId, key, value, keys);
}
async function decodePluginSettingValue(pluginId, key, value, schema, keys, onSecret) {
	if (!isSecretField(schema, key)) {
		if (isEncryptedPluginSetting(value)) throw new PluginSettingEncryptionError("PLUGIN_SETTING_DECRYPTION_FAILED", "Encrypted plugin setting is not declared as a secret");
		return value;
	}
	if (typeof value === "string") {
		onSecret?.(key, value);
		return value;
	}
	if (!isEncryptedPluginSetting(value)) throw new PluginSettingEncryptionError("PLUGIN_SETTING_DECRYPTION_FAILED", "Plugin secret setting has an invalid encrypted envelope");
	const decrypted = await decryptPluginSetting(pluginId, key, value, keys);
	onSecret?.(key, decrypted);
	return decrypted;
}
function createSettingsAccess(optionsRepo, pluginId, schema = {}, keys, onSecret) {
	const prefix = `plugin:${pluginId}:settings:`;
	const optionKey = (key) => {
		assertStorageKey(key);
		return `${prefix}${key}`;
	};
	return {
		async get(key) {
			const value = await optionsRepo.get(optionKey(key));
			return value === null ? null : decodePluginSettingValue(pluginId, key, value, schema, keys, onSecret);
		},
		async getVersioned(key) {
			const value = await optionsRepo.getVersioned(optionKey(key));
			if (!value) return null;
			return {
				value: await decodePluginSettingValue(pluginId, key, value.value, schema, keys, onSecret),
				revision: value.revision
			};
		},
		async compareAndSet(key, expectedRevision, value) {
			return optionsRepo.compareAndSet(optionKey(key), expectedRevision, await encodePluginSettingValue(pluginId, key, value, schema, keys, onSecret));
		},
		compareAndDelete(key, expectedRevision) {
			return optionsRepo.compareAndDelete(optionKey(key), expectedRevision);
		},
		async set(key, value) {
			await optionsRepo.set(optionKey(key), await encodePluginSettingValue(pluginId, key, value, schema, keys, onSecret));
		},
		delete(key) {
			return optionsRepo.delete(optionKey(key));
		},
		async list(keyPrefix = "") {
			assertStorageKey(keyPrefix || "_");
			const values = await optionsRepo.getByPrefix(`${prefix}${keyPrefix}`);
			const result = [];
			for (const [fullKey, value] of values) {
				const key = fullKey.slice(prefix.length);
				result.push({
					key,
					value: await decodePluginSettingValue(pluginId, key, value, schema, keys, onSecret)
				});
			}
			return result;
		}
	};
}
/** Object-cache namespace for site settings. */
var SETTINGS_CACHE_NAMESPACE = "settings";
/** Prefix for site settings in the options table */
var SETTINGS_PREFIX = "site:";
/** Settings stored as one object whose fields are updated individually. */
var NESTED_SETTING_KEYS = /* @__PURE__ */ new Set(["seo", "social"]);
var SITE_SETTINGS_CACHE_TTL_MS = 3e4;
var SITE_SETTINGS_CACHE_KEY = Symbol.for("emdash:site-settings:swr");
var g = globalThis;
var settingsCache = g[SITE_SETTINGS_CACHE_KEY] ?? (() => {
	const c = {
		snapshot: null,
		expiresAt: 0,
		generation: 0,
		revalidatingUntil: 0,
		refresh: createSingleFlightCache()
	};
	g[SITE_SETTINGS_CACHE_KEY] = c;
	return c;
})();
/** Capture the resolved snapshot before route-cache headers are finalized. @internal */
function peekSiteSettingsSnapshot() {
	return settingsCache.snapshot;
}
/** Discard a snapshot found stale by the route-cache freshness check. @internal */
function invalidateSiteSettingsSnapshot() {
	settingsCache.generation++;
	settingsCache.snapshot = null;
	settingsCache.expiresAt = 0;
	settingsCache.revalidatingUntil = 0;
	invalidateSingleFlightCache(settingsCache.refresh);
}
/**
* Bump the isolate-wide site-settings cache version, forcing the next
* `getSiteSettings()` to re-query the database.
*
* Called from every `site:*` write path. Other isolates still serve their
* own cached copy while a background refresh picks up remote writes.
*/
function invalidateSiteSettingsCache() {
	invalidateSiteSettingsSnapshot();
	invalidateObjectCache(SETTINGS_CACHE_NAMESPACE);
}
/**
* Type guard for MediaReference values
*/
function isMediaReference(value) {
	return typeof value === "object" && value !== null && "mediaId" in value;
}
/**
* Resolve a media reference to include the full URL plus content metadata.
*
* Pulls `mimeType` and intrinsic dimensions from the media row so callers
* can emit correct head tags (e.g. `<link rel="icon" type="image/svg+xml">`,
* which Chromium requires when the URL has no `.svg` extension) without
* a second round-trip to the media table.
*/
async function resolveMediaReference(mediaRef, db, _storage) {
	if (!mediaRef?.mediaId) return mediaRef;
	try {
		const media = await new MediaRepository(db).findById(mediaRef.mediaId);
		if (media) return {
			...mediaRef,
			url: `/_emdash/api/media/file/${media.storageKey}`,
			contentType: media.mimeType,
			...media.width !== null ? { width: media.width } : {},
			...media.height !== null ? { height: media.height } : {}
		};
	} catch {}
	return mediaRef;
}
/**
* Get a single site setting by key (with explicit db)
*
* @internal Use `getSiteSetting()` in templates. This variant is for admin routes
* that already have a database handle.
*/
async function getSiteSettingWithDb(key, db, storage = null) {
	const value = await new OptionsRepository(db).get(`${SETTINGS_PREFIX}${key}`);
	if (!value) return;
	if ((key === "logo" || key === "favicon") && isMediaReference(value)) return await resolveMediaReference(value, db, storage);
	if (key === "seo" && value && typeof value === "object") {
		const seo = value;
		if (seo.defaultOgImage) return {
			...seo,
			defaultOgImage: await resolveMediaReference(seo.defaultOgImage, db, storage)
		};
	}
	return value;
}
function refreshSiteSettings() {
	return singleFlightCached(settingsCache.refresh, () => cachedQuery({
		namespace: SETTINGS_CACHE_NAMESPACE,
		key: "snapshot-v1",
		load: async () => loadSiteSettingsSnapshot(await getDb())
	}), {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: 3e4
	});
}
function installSiteSettings(snapshot) {
	settingsCache.snapshot = snapshot;
	settingsCache.expiresAt = Date.now() + SITE_SETTINGS_CACHE_TTL_MS;
}
function revalidateSiteSettings() {
	const now = Date.now();
	if (settingsCache.revalidatingUntil > now) return;
	settingsCache.revalidatingUntil = now + SITE_SETTINGS_CACHE_TTL_MS;
	const generation = ++settingsCache.generation;
	invalidateSingleFlightCache(settingsCache.refresh);
	after(async () => {
		try {
			const snapshot = await refreshSiteSettings();
			if (generation === settingsCache.generation) installSiteSettings(snapshot);
		} catch (error) {
			console.error("[emdash:settings] revalidating site settings failed:", error);
		}
	});
}
async function loadCachedSiteSettings() {
	for (let attempt = 0; attempt < 3; attempt++) {
		const snapshot = settingsCache.snapshot;
		if (snapshot) {
			if (Date.now() >= settingsCache.expiresAt) revalidateSiteSettings();
			return snapshot;
		}
		const generation = settingsCache.generation;
		const loaded = await refreshSiteSettings();
		if (generation === settingsCache.generation) {
			installSiteSettings(loaded);
			return loaded;
		}
		if (attempt === 2) return loaded;
	}
	throw new Error("Site settings refresh exhausted without loading settings");
}
/**
* Get all site settings
*
* Returns all configured settings. Unset values are undefined.
* Media references (logo/favicon) are resolved to include URLs.
*
* @example
* ```ts
* import { getSiteSettings } from "emdash";
*
* const settings = await getSiteSettings();
* console.log(settings.title); // "My Site"
* console.log(settings.logo?.url); // "/_emdash/api/media/file/abc123"
* ```
*/
function getSiteSettings() {
	return requestCached("siteSettings", async () => {
		return (await requestCached("siteSettingsSnapshot", async () => {
			const ctx = getRequestContext();
			const requestSettings = ctx?.siteSettings;
			if (ctx?.routeCacheFill) return loadSiteSettingsSnapshot(await getDb());
			let loaded = requestSettings?.snapshot ?? await loadCachedSiteSettings();
			if (requestSettings?.version !== void 0 && loaded.version !== requestSettings.version) {
				invalidateSiteSettingsSnapshot();
				const generation = settingsCache.generation;
				loaded = await loadSiteSettingsSnapshot(await getDb());
				if (generation === settingsCache.generation) installSiteSettings(loaded);
			}
			return loaded;
		})).data;
	}).then(async (data) => {
		const snapshot = await peekRequestCache("siteSettingsSnapshot");
		if (snapshot) getRequestContext()?.siteSettings?.onRead(snapshot.version);
		return data;
	});
}
/**
* Get all site settings (with explicit db)
*
* @internal Use `getSiteSettings()` in templates. This variant is for admin routes
* that already have a database handle.
*/
async function getSiteSettingsWithDb(db, storage = null) {
	return (await loadSiteSettingsSnapshot(db, storage)).data;
}
async function loadSiteSettingsSnapshot(db, storage = null) {
	const allOptions = await new OptionsRepository(db).getVersionedByPrefix(SETTINGS_PREFIX);
	const version = normalizeSiteSettingsVersion(JSON.stringify([...allOptions].filter(([key]) => key.startsWith(SETTINGS_PREFIX)).map(([key, value]) => [key, value.revision])));
	const settings = {};
	for (const [key, value] of allOptions) {
		const settingKey = key.replace(SETTINGS_PREFIX, "");
		settings[settingKey] = value.value;
	}
	const typedSettings = settings;
	if (typedSettings.logo) typedSettings.logo = await resolveMediaReference(typedSettings.logo, db, storage);
	if (typedSettings.favicon) typedSettings.favicon = await resolveMediaReference(typedSettings.favicon, db, storage);
	if (typedSettings.seo?.defaultOgImage) typedSettings.seo = {
		...typedSettings.seo,
		defaultOgImage: await resolveMediaReference(typedSettings.seo.defaultOgImage, db, storage)
	};
	return {
		data: typedSettings,
		version
	};
}
/**
* Set site settings (internal function used by admin API)
*
* Merges provided settings with existing ones. Only provided fields are updated,
* including fields inside `seo` and `social`; `seo.defaultOgImage: null` removes the default image.
* Media references should include just the mediaId; URLs are resolved on read.
*
* @param settings - Partial settings object with values to update
* @param db - Kysely database instance
* @returns Promise that resolves when settings are saved
*
* @internal
*
* @example
* ```ts
* // Update multiple settings at once
* await setSiteSettings({
*   title: "My Site",
*   tagline: "Welcome",
*   logo: { mediaId: "med_123", alt: "Logo" }
* }, db);
* ```
*/
async function setSiteSettings(settings, db) {
	const updates = {};
	const deletions = [];
	const nestedPatches = [];
	for (const [key, value] of Object.entries(settings)) {
		if (value === void 0) continue;
		if (value === null) deletions.push(`${SETTINGS_PREFIX}${key}`);
		else if (NESTED_SETTING_KEYS.has(key) && isRecord(value)) nestedPatches.push([key, value]);
		else updates[`${SETTINGS_PREFIX}${key}`] = value;
	}
	if (Object.keys(updates).length === 0 && deletions.length === 0 && nestedPatches.length === 0) return;
	try {
		await withTransaction(db, async (trx) => {
			const transactionOptions = new OptionsRepository(trx);
			await transactionOptions.setMany(updates);
			await transactionOptions.deleteMany(deletions);
			for (const [key, patch] of nestedPatches) {
				const optionName = `${SETTINGS_PREFIX}${key}`;
				const next = { ...await transactionOptions.get(optionName) };
				for (const [field, fieldValue] of Object.entries(patch)) if (fieldValue === null) delete next[field];
				else if (fieldValue !== void 0) next[field] = fieldValue;
				if (Object.keys(next).length === 0) await transactionOptions.delete(optionName);
				else await transactionOptions.set(optionName, next);
			}
			try {
				await bumpRunningExportWriteEpochs(trx);
			} catch (error) {
				if (isMissingTableError(error)) return;
				throw error;
			}
		});
	} finally {
		invalidateSiteSettingsCache();
	}
}
export { getSiteSettings as a, invalidateSiteSettingsSnapshot as c, isRecord as d, getSiteSettingWithDb as i, peekSiteSettingsSnapshot as l, createSettingsAccess as n, getSiteSettingsWithDb as o, encodePluginSettingValue as r, invalidateSiteSettingsCache as s, PluginSettingEncryptionError as t, setSiteSettings as u };
