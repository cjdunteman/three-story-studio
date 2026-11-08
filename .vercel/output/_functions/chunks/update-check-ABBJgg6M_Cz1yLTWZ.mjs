import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { i as parseDurationSeconds } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
// node_modules/emdash/dist/update-check-ABBJgg6M.mjs
/** Options-table key for the cached registry result. */
var CORE_UPDATE_OPTION = "emdash:core_update_check";
/** Check the registry at most once per day, whether or not the check succeeds. */
var CHECK_INTERVAL_MS = 864e5;
/** npm packument for `emdash`: the `latest` dist-tag and each version's publish time. */
var REGISTRY_URL = "https://registry.npmjs.org/emdash";
/** Default time a release must be public before admins are told about it. */
var DEFAULT_MINIMUM_RELEASE_AGE = "24h";
var REGISTRY_TIMEOUT_MS = 1e4;
var SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)(-.+)?$/;
var STABLE_RE = /^\d+\.\d+\.\d+$/;
/**
* True when `latest` is a strictly newer release than `current`.
*
* Handles plain `major.minor.patch` versions. Anything unparsable —
* including the `"dev"` fallback version — compares as "not newer", so
* dev/test runs never show the banner. On an equal base version, a stable
* release is newer than a prerelease of it, so a site running
* `0.24.0-beta.1` is notified when `0.24.0` ships. Prerelease identifiers
* are not compared to each other.
*/
function isNewerVersion(latest, current) {
	const l = SEMVER_RE.exec(latest);
	const c = SEMVER_RE.exec(current);
	if (!l || !c) return false;
	for (let i = 1; i <= 3; i++) {
		const a = Number(l[i]);
		const b = Number(c[i]);
		if (a !== b) return a > b;
	}
	return !l[4] && !!c[4];
}
function field(value, key) {
	return typeof value === "object" && value !== null && Object.hasOwn(value, key) ? Reflect.get(value, key) : void 0;
}
/**
* Fetch the stable releases and their publish times from the npm registry
* and cache them. Exported for tests; production callers go through
* `handleCoreUpdateStatus`, which defers this via `after()`.
*/
async function refreshCoreUpdateCache(db, fetchImpl = fetch) {
	const response = await fetchImpl(REGISTRY_URL, {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(REGISTRY_TIMEOUT_MS)
	});
	if (!response.ok) throw new Error(`registry responded ${response.status}`);
	const body = await response.json();
	const latest = field(field(body, "dist-tags"), "latest");
	if (typeof latest !== "string" || !STABLE_RE.test(latest)) throw new Error("registry response missing a valid version");
	const time = field(body, "time");
	const versions = field(body, "versions");
	const releases = {};
	if (typeof time === "object" && time !== null) for (const [version, publishedAt] of Object.entries(time)) {
		if (!STABLE_RE.test(version) || isNewerVersion(version, latest)) continue;
		const manifest = field(versions, version);
		if (manifest === void 0 || field(manifest, "deprecated") !== void 0) continue;
		if (typeof publishedAt !== "string" || Number.isNaN(Date.parse(publishedAt))) continue;
		releases[version] = publishedAt;
	}
	if (!releases[latest]) throw new Error("registry response missing a publish time for the latest version");
	const cache = {
		releases,
		checkedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	await new OptionsRepository(db).set(CORE_UPDATE_OPTION, cache);
}
function parseCache(value) {
	const releases = field(value, "releases");
	const checkedAt = field(value, "checkedAt");
	if (typeof releases !== "object" || releases === null || typeof checkedAt !== "string") return null;
	if (Number.isNaN(Date.parse(checkedAt))) return null;
	const valid = {};
	for (const [version, publishedAt] of Object.entries(releases)) if (STABLE_RE.test(version) && typeof publishedAt === "string" && !Number.isNaN(Date.parse(publishedAt))) valid[version] = publishedAt;
	return {
		releases: valid,
		checkedAt
	};
}
/** The newest release published at least `minimumAgeMs` before `now`. */
function newestReleased(releases, now, minimumAgeMs) {
	let newest = null;
	for (const [version, publishedAt] of Object.entries(releases)) {
		if (now.getTime() - Date.parse(publishedAt) < minimumAgeMs) continue;
		if (!newest || isNewerVersion(version, newest)) newest = version;
	}
	return newest;
}
/**
* Seconds a release must be public before it is reported, from the
* `updateCheck` option. Throws on an invalid duration.
*/
function minimumReleaseAgeSeconds(option) {
	return parseDurationSeconds((typeof option === "object" ? option?.minimumReleaseAge : void 0) ?? DEFAULT_MINIMUM_RELEASE_AGE);
}
/**
* Report the cached update status and, when the cache is stale (or
* missing), kick a deferred registry refresh. Never blocks on the
* network: the first request after install/expiry reports the previous
* state and the next request sees the refreshed one.
*/
async function handleCoreUpdateStatus(db, options) {
	const current = options?.current ?? "1.4.0";
	if (options?.enabled === false) return {
		success: true,
		data: {
			current,
			latest: null,
			updateAvailable: false,
			checkedAt: null
		}
	};
	try {
		const repo = new OptionsRepository(db);
		const cache = parseCache(await repo.get(CORE_UPDATE_OPTION));
		const now = options?.now ?? /* @__PURE__ */ new Date();
		const minimumAgeMs = (options?.minimumReleaseAgeSeconds ?? minimumReleaseAgeSeconds(void 0)) * 1e3;
		if ((!cache || now.getTime() - Date.parse(cache.checkedAt) >= CHECK_INTERVAL_MS) && current !== "dev") after(async () => {
			try {
				await refreshCoreUpdateCache(db);
			} catch (error) {
				console.warn("[update-check] registry refresh failed:", error);
				if (parseCache(await repo.get(CORE_UPDATE_OPTION))?.checkedAt !== cache?.checkedAt) return;
				const retryLater = {
					releases: cache?.releases ?? {},
					checkedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
				await repo.set(CORE_UPDATE_OPTION, retryLater);
			}
		});
		const latest = cache ? newestReleased(cache.releases, now, minimumAgeMs) : null;
		return {
			success: true,
			data: {
				current,
				latest,
				updateAvailable: latest ? isNewerVersion(latest, current) : false,
				checkedAt: cache?.checkedAt ?? null
			}
		};
	} catch (error) {
		console.error("[update-check] status read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.UPDATE_CHECK_ERROR,
				message: "Failed to read update status"
			}
		};
	}
}
export { minimumReleaseAgeSeconds as n, handleCoreUpdateStatus as t };
