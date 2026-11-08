import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { n as VERSION } from "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as generateSnapshot } from "./snapshot-BjaXDZQ5_Dup_vZ0x.mjs";
// node_modules/emdash/dist/backup-8rPSJ28a.mjs
/** Storage key prefix for scheduled/manual archives. */
var BACKUP_STORAGE_PREFIX = "backups/";
/**
* Filename prefix within the backups/ folder. Included in the list() prefix
* so LocalStorage (which matches directory + filename prefix, not flat keys
* like S3/R2) finds the archives too.
*/
var BACKUP_FILE_PREFIX = "emdash-backup-";
/** Options key holding the scheduled-backup settings. */
var BACKUP_SETTINGS_KEY = "emdash:backups";
/** Options key holding the ISO timestamp of the last scheduled run. */
var BACKUP_LAST_RUN_KEY = "emdash:backups_last_run";
/** Minimum interval between scheduled backups (23h — daily with cron jitter). */
var SCHEDULED_BACKUP_INTERVAL_MS = 828e5;
var BACKUP_RETENTION_DEFAULT = 7;
/**
* Options-table key prefixes included in backups. Never widen this to a
* prefix that can match secrets (`emdash:preview_secret`, `plugin:`,
* `emdash:passkey_pending:`).
*/
var BACKUP_OPTION_PREFIXES = ["site:"];
/**
* Exact `emdash:*` keys included in backups. Do not add `emdash:site_url`: it
* is the origin of the deployment that took the backup, not portable site data.
*/
var BACKUP_OPTION_KEYS = [
	"emdash:site_title",
	"emdash:site_tagline",
	"emdash:locale"
];
/**
* Archive filename shape. Strict allowlist — the download/delete routes
* interpolate this into a storage key, so it must never contain `/` or `..`.
* The random suffix makes names unguessable (defense in depth on top of the
* media route's backups/ deny) and avoids same-second collisions.
*/
var ARCHIVE_NAME_PATTERN = /^emdash-backup-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-[0-9a-f]{8}\.json$/;
function isValidArchiveName(name) {
	return ARCHIVE_NAME_PATTERN.test(name);
}
var DEFAULT_SETTINGS = {
	enabled: false,
	retention: BACKUP_RETENTION_DEFAULT
};
function clampRetention(value) {
	if (!Number.isFinite(value)) return BACKUP_RETENTION_DEFAULT;
	return Math.min(30, Math.max(1, Math.trunc(value)));
}
/**
* Generate a full content backup as a JSON string.
*
* ponytail: the whole backup is materialized in memory. Fine for the sites
* EmDash targets today; truly huge databases should use `wrangler d1 export`
* (documented on the backups docs page). Upgrade path: stream table-by-table.
*/
async function generateBackupJson(db) {
	const snapshot = await generateSnapshot(db, {
		includeDrafts: true,
		includeTrashed: true,
		optionPrefixes: BACKUP_OPTION_PREFIXES,
		optionKeys: BACKUP_OPTION_KEYS
	});
	return JSON.stringify({
		format: "emdash-backup",
		formatVersion: 1,
		emdashVersion: VERSION,
		generatedAt: snapshot.generatedAt,
		schema: snapshot.schema,
		tables: snapshot.tables
	});
}
/** Derive the archive filename for a given date (plus a random suffix). */
function archiveNameForDate(date) {
	return `emdash-backup-${date.toISOString().slice(0, 19).replaceAll(":", "-")}-${crypto.randomUUID().replaceAll("-", "").slice(0, 8)}.json`;
}
async function getBackupSettings(db) {
	const stored = await new OptionsRepository(db).get(BACKUP_SETTINGS_KEY);
	if (!stored) return { ...DEFAULT_SETTINGS };
	return {
		enabled: stored.enabled === true,
		retention: clampRetention(stored.retention ?? BACKUP_RETENTION_DEFAULT)
	};
}
async function updateBackupSettings(db, input) {
	try {
		const settings = {
			enabled: input.enabled,
			retention: clampRetention(input.retention)
		};
		await new OptionsRepository(db).set(BACKUP_SETTINGS_KEY, settings);
		return {
			success: true,
			data: settings
		};
	} catch (error) {
		console.error("[backup] Failed to update settings:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.BACKUP_SETTINGS_ERROR,
				message: "Failed to update backup settings"
			}
		};
	}
}
/**
* List stored archives, newest first.
*
* ponytail: single unpaginated list. The retention cap (max 30) bounds the
* archive count, so one page always suffices.
*/
async function listBackupArchives(storage) {
	try {
		return {
			success: true,
			data: (await storage.list({
				prefix: `${BACKUP_STORAGE_PREFIX}${BACKUP_FILE_PREFIX}`,
				limit: 100
			})).files.map((file) => ({
				name: file.key.slice(8),
				size: file.size,
				lastModified: file.lastModified.toISOString()
			})).filter((archive) => isValidArchiveName(archive.name)).toSorted((a, b) => a.name < b.name ? 1 : -1)
		};
	} catch (error) {
		console.error("[backup] Failed to list archives:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.BACKUP_LIST_ERROR,
				message: "Failed to list backup archives"
			}
		};
	}
}
/**
* Create a backup and store it as an archive, then prune old archives
* beyond `retention`.
*/
async function runBackupToStorage(db, storage, retention) {
	try {
		const json = await generateBackupJson(db);
		const name = archiveNameForDate(/* @__PURE__ */ new Date());
		const body = new TextEncoder().encode(json);
		await storage.upload({
			key: `${BACKUP_STORAGE_PREFIX}${name}`,
			body,
			contentType: "application/json"
		});
		await pruneArchives(storage, clampRetention(retention));
		return {
			success: true,
			data: {
				name,
				size: body.byteLength,
				lastModified: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
	} catch (error) {
		console.error("[backup] Failed to create archive:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.BACKUP_CREATE_ERROR,
				message: "Failed to create backup archive"
			}
		};
	}
}
/** Delete archives beyond the newest `keep`. Failures are logged, not fatal. */
async function pruneArchives(storage, keep) {
	const listed = await listBackupArchives(storage);
	if (!listed.success) return;
	for (const archive of listed.data.slice(keep)) try {
		await storage.delete(`${BACKUP_STORAGE_PREFIX}${archive.name}`);
	} catch (error) {
		console.error(`[backup] Failed to prune archive ${archive.name}:`, error);
	}
}
async function deleteBackupArchive(storage, name) {
	if (!isValidArchiveName(name)) return {
		success: false,
		error: {
			code: ErrorCode.VALIDATION_ERROR,
			message: "Invalid archive name"
		}
	};
	try {
		await storage.delete(`${BACKUP_STORAGE_PREFIX}${name}`);
		return {
			success: true,
			data: { deleted: true }
		};
	} catch (error) {
		console.error(`[backup] Failed to delete archive ${name}:`, error);
		return {
			success: false,
			error: {
				code: ErrorCode.BACKUP_DELETE_ERROR,
				message: "Failed to delete backup archive"
			}
		};
	}
}
/**
* Run a scheduled backup if enabled and due. Called from the maintenance
* tick alongside scheduled publishing and system cleanup — never from a
* request. Never throws.
*
* ponytail: last-run bookkeeping is a plain read-then-write, so two isolates
* ticking simultaneously could both back up. Worst case is a duplicate
* archive that retention prunes; not worth a lock.
*/
async function maybeRunScheduledBackup(db, storage) {
	try {
		if (!storage) return;
		const settings = await getBackupSettings(db);
		if (!settings.enabled) return;
		const options = new OptionsRepository(db);
		const lastRun = await options.get(BACKUP_LAST_RUN_KEY);
		if (lastRun) {
			const elapsed = Date.now() - Date.parse(lastRun);
			if (Number.isFinite(elapsed) && elapsed < SCHEDULED_BACKUP_INTERVAL_MS) return;
		}
		const result = await runBackupToStorage(db, storage, settings.retention);
		if (result.success) {
			await options.set(BACKUP_LAST_RUN_KEY, (/* @__PURE__ */ new Date()).toISOString());
			console.log(`[backup] Scheduled backup stored: ${result.data.name}`);
		}
	} catch (error) {
		console.error("[backup] Scheduled backup failed:", error);
	}
}
export { getBackupSettings as a, maybeRunScheduledBackup as c, generateBackupJson as i, runBackupToStorage as l, archiveNameForDate as n, isValidArchiveName as o, deleteBackupArchive as r, listBackupArchives as s, BACKUP_STORAGE_PREFIX as t, updateBackupSettings as u };
