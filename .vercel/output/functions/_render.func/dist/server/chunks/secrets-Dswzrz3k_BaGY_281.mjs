import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { a as encodeBase64url, r as decodeBase64url } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { r as singleFlightCached, t as createSingleFlightCache } from "./single-flight-cache-D0EaGbN1_BgL4u_IC.mjs";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
// node_modules/emdash/dist/secrets-Dswzrz3k.mjs
var REQUEST_SCOPED_DBS_KEY = Symbol.for("emdash:request-scoped-dbs");
function getRegistry() {
	const holder = globalThis;
	let registry = holder[REQUEST_SCOPED_DBS_KEY];
	if (!registry) {
		registry = /* @__PURE__ */ new WeakSet();
		holder[REQUEST_SCOPED_DBS_KEY] = registry;
	}
	return registry;
}
function markRequestScopedDb(db) {
	getRegistry().add(db);
}
function isRequestScopedDb(db) {
	return getRegistry().has(db);
}
/**
* Centralized secrets module
*
* Single source of truth for site-level cryptographic secrets:
*
* - `EMDASH_ENCRYPTION_KEY` — primary key for encrypting plugin secrets at
*   rest. A comma-separated list supports rotation: the first key encrypts
*   new values and every listed key remains available for decryption. Format:
*   `emdash_enc_v1_<43 base64url chars>` representing
*   32 random bytes. **Operator-provided; never stored in the database.**
*   Losing the key means losing every secret encrypted with it. Validated
*   at runtime startup via `validateEncryptionKeyAtStartup` — request-time
*   resolution does not depend on it, so a malformed key can't 500 the
*   preview/comment hot paths for unrelated visitors.
* - `EMDASH_IP_SALT` (optional) / DB-stored `emdash:ip_salt` — site-specific
*   salt for hashing commenter IPs. Generated and persisted on first need
*   if no env override is set. Replaces the previous hardcoded
*   `"emdash-ip-salt"` constant which was correlatable across installs.
* - `EMDASH_PREVIEW_SECRET` (optional) / DB-stored `emdash:preview_secret` —
*   HMAC secret for signing preview URLs. Generated and persisted on first
*   need if no env override is set. Replaces the previous empty-string
*   fallback which silently disabled preview-token verification.
*
* The `EMDASH_AUTH_SECRET` env var is consulted only as a legacy fallback
* source for the IP salt — that's the only path the prior code actually
* read it from. New deployments don't need to set it.
*
* Modeled on `resolveS3Config` in `../storage/s3.ts`.
*/
/** v1 encryption key prefix. Bumping requires a separate KDF version. */
var ENCRYPTION_KEY_PREFIX = "emdash_enc_v1_";
/** 32 random bytes encoded as unpadded base64url = 43 chars. */
var ENCRYPTION_KEY_BODY_LENGTH = 43;
/**
* Built from the prefix constant via interpolation. The prefix has no regex
* metacharacters today (`emdash_enc_v1_`), but escaping is cheap defense
* against anyone changing the prefix in a future bump without remembering.
*/
var ENCRYPTION_KEY_PATTERN = new RegExp(`^${ENCRYPTION_KEY_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[A-Za-z0-9_-]{${ENCRYPTION_KEY_BODY_LENGTH}}$`);
/** Options-table key for the persisted commenter-IP salt. */
var IP_SALT_OPTION_KEY = "emdash:ip_salt";
/** Options-table key for the persisted preview HMAC secret. */
var PREVIEW_SECRET_OPTION_KEY = "emdash:preview_secret";
/** Length in bytes of generated values. 32 bytes = 256 bits. */
var GENERATED_SECRET_BYTES = 32;
/**
* Class of validation failures raised by this module.
*
* Errors here are operator-facing config problems (malformed key, etc.).
* They are thrown rather than soft-skipped so misconfiguration fails loudly
* at startup instead of silently degrading at request time.
*/
var EmDashSecretsError = class extends Error {
	name = "EmDashSecretsError";
	code;
	constructor(message, code) {
		super(message);
		this.code = code;
	}
};
/**
* Parse the `EMDASH_ENCRYPTION_KEY` env var.
*
* Accepts a single key or a comma-separated list. The first entry is the
* primary (used for new writes); all entries are tried for decryption,
* matched by `kid`. Whitespace around commas is tolerated. Empty entries
* (e.g. trailing comma) are ignored.
*
* Returns `null` for an unset/empty input. Throws `EmDashSecretsError` on
* any malformed entry — silent skipping would mask deployment mistakes.
*/
async function parseEncryptionKeys(raw) {
	if (!raw) return null;
	const entries = raw.split(",").map((entry) => entry.trim()).filter((entry) => entry.length > 0);
	if (entries.length === 0) return null;
	const parsed = [];
	const seenKids = /* @__PURE__ */ new Set();
	for (const entry of entries) {
		if (!ENCRYPTION_KEY_PATTERN.test(entry)) throw new EmDashSecretsError(`EMDASH_ENCRYPTION_KEY entry is malformed (expected "${ENCRYPTION_KEY_PREFIX}" followed by ${ENCRYPTION_KEY_BODY_LENGTH} base64url chars). Generate one with \`emdash secrets generate\`.`, "INVALID_ENCRYPTION_KEY");
		const body = entry.slice(14);
		const key = decodeBase64urlStrict(body);
		if (!key) throw new EmDashSecretsError("EMDASH_ENCRYPTION_KEY body is not valid base64url", "INVALID_ENCRYPTION_KEY");
		if (key.length !== GENERATED_SECRET_BYTES) throw new EmDashSecretsError(`EMDASH_ENCRYPTION_KEY must decode to ${GENERATED_SECRET_BYTES} bytes, got ${key.length}`, "INVALID_ENCRYPTION_KEY");
		if (encodeBase64url(key) !== body) throw new EmDashSecretsError("EMDASH_ENCRYPTION_KEY body is not canonical base64url. Generate one with `emdash secrets generate`.", "INVALID_ENCRYPTION_KEY");
		const kid = fingerprintKeyBytes(key);
		if (seenKids.has(kid)) continue;
		seenKids.add(kid);
		parsed.push({
			kid,
			key,
			raw: entry
		});
	}
	return parsed;
}
/**
* Resolve the encryption keys used for plugin secret settings.
*
* This is deliberately separate from `resolveSecrets`: plugin settings are
* not on the anonymous request path, and a missing or malformed key must only
* fail operations that need encrypted plugin settings.
*/
function resolvePluginEncryptionKeys(env) {
	return parseEncryptionKeys((env ?? readDefaultEnv()).EMDASH_ENCRYPTION_KEY);
}
/**
* Internal: kid derivation from raw key bytes. The single source of truth
* for what makes two keys "the same key" — used by both `parseEncryptionKeys`
* and `fingerprintKey`.
*/
function fingerprintKeyBytes(key) {
	return encodeHexLowerCase(sha256(key)).slice(0, 8);
}
/**
* Resolve site secrets. Reads env vars; for IP salt and preview secret,
* falls back to a DB-stored value, generating one atomically on first need.
*
* Idempotent. Concurrent callers race on the atomic `setIfAbsent`; whichever
* wins, all callers converge on the same stored value.
*
* Note: `EMDASH_ENCRYPTION_KEY` is **not** consumed here. It's validated
* separately at runtime startup (see `validateEncryptionKeyAtStartup`) so a
* malformed key can't take down preview-token verification or comment
* submission for unrelated visitors. Plugin-secret encryption reads it
* separately through `resolvePluginEncryptionKeys`.
*/
async function resolveSecrets(options) {
	const env = options.env ?? readDefaultEnv();
	const repo = options._repo ?? new OptionsRepository(options.db);
	const previewEnvOverride = pickFirstNonEmpty(env.EMDASH_PREVIEW_SECRET, env.PREVIEW_SECRET);
	const ipSaltEnvOverride = pickFirstNonEmpty(env.EMDASH_IP_SALT, env.EMDASH_AUTH_SECRET, env.AUTH_SECRET);
	const [previewSecret, ipSalt] = await Promise.all([previewEnvOverride !== null ? Promise.resolve({
		value: previewEnvOverride,
		source: "env"
	}) : ensureGeneratedOption(repo, PREVIEW_SECRET_OPTION_KEY), ipSaltEnvOverride !== null ? Promise.resolve({
		value: ipSaltEnvOverride,
		source: "env"
	}) : ensureGeneratedOption(repo, IP_SALT_OPTION_KEY)]);
	return {
		previewSecret: previewSecret.value,
		previewSecretSource: previewSecret.source,
		ipSalt: ipSalt.value,
		ipSaltSource: ipSalt.source
	};
}
/**
* Validate `EMDASH_ENCRYPTION_KEY` once at runtime startup. Logs an
* operator-facing error if the value is malformed but does **not** throw —
* plugin secret-setting operations fail closed at their own boundary when
* the key is invalid. This way, deployment mistakes surface immediately in
* startup logs without wedging unrelated request paths such as preview-token
* verification or comment submission.
*
* Returns `true` if the key is unset or valid, `false` if it was malformed.
*/
async function validateEncryptionKeyAtStartup(env) {
	const resolved = env ?? readDefaultEnv();
	try {
		await parseEncryptionKeys(resolved.EMDASH_ENCRYPTION_KEY);
		return true;
	} catch (error) {
		if (error instanceof EmDashSecretsError) {
			console.error(`[emdash] EMDASH_ENCRYPTION_KEY is invalid: ${error.message} Plugin secret settings are unavailable until this is fixed. Generate a fresh key with \`emdash secrets generate\`.`);
			return false;
		}
		throw error;
	}
}
/**
* Per-DB cache of resolved secrets. Request-scoped views of the configured
* database (see `database/request-scoped.ts`) share one entry; any other
* Kysely instance is keyed by its identity.
*
* The resolved values are stable for the lifetime of the deployment (env
* vars don't change without a restart, and DB-stored values are written
* once via `setIfAbsent`). Caching avoids one options-table read per
* request on the hot paths (preview verification, comment hashing). A
* deleted row is regenerated only by a process or isolate that has not
* cached the old value, so rotating a DB-stored secret needs a restart or
* redeploy.
*
* Lives on `globalThis` so module-duplication during SSR bundling can't
* fragment the cache. See `request-context.ts` for the same pattern.
*
* Each entry is a poison-immune single-flight cache (see
* `utils/single-flight-cache.ts`): the resolved *value* is cached, never an
* in-flight promise, so a request cancelled mid-resolve can't strand later
* preview/comment requests on the isolate.
*/
var SECRETS_CACHE_KEY = Symbol.for("@emdash-cms/core/secrets-cache@2");
function getSecretsCache(db) {
	const holder = globalThis;
	let entry = holder[SECRETS_CACHE_KEY];
	if (!entry) {
		entry = { cache: /* @__PURE__ */ new WeakMap() };
		holder[SECRETS_CACHE_KEY] = entry;
	}
	if (isRequestScopedDb(db)) {
		entry.requestScoped ??= createSingleFlightCache();
		return entry.requestScoped;
	}
	let cache = entry.cache.get(db);
	if (!cache) {
		cache = createSingleFlightCache();
		entry.cache.set(db, cache);
	}
	return cache;
}
/**
* Memoized wrapper around `resolveSecrets`. Use this from request-time hot
* paths (preview verification, comment IP hashing) so they don't reread
* env / re-query options on every request.
*
* Request-scoped views of the configured database share one resolution;
* playground / DO preview / per-test databases each get their own.
* Concurrent cold callers coalesce onto one resolution via the single-flight
* lock; a failed resolution propagates to the caller and releases the lock so
* the next caller retries.
*/
function resolveSecretsCached(db) {
	return singleFlightCached(getSecretsCache(db), () => resolveSecrets({ db }), {
		anchor: (promise) => after(() => promise),
		ownerTimeoutMs: 3e4
	});
}
/**
* Read or generate-and-persist a random base64url secret stored in the
* options table.
*
* Concurrency: `setIfAbsent` is an atomic INSERT...ON CONFLICT DO NOTHING.
* On race, the loser re-reads to converge on the winner's value.
*/
async function ensureGeneratedOption(repo, optionKey) {
	const existing = await repo.get(optionKey);
	if (typeof existing === "string" && existing.length > 0) return {
		value: existing,
		source: "db"
	};
	const generated = generateRandomSecret();
	if (await repo.setIfAbsent(optionKey, generated)) return {
		value: generated,
		source: "db"
	};
	const winner = await repo.get(optionKey);
	if (typeof winner !== "string" || winner.length === 0) throw new EmDashSecretsError(`Failed to persist generated secret for "${optionKey}"`, "SECRET_PERSIST_FAILED");
	return {
		value: winner,
		source: "db"
	};
}
/** Generate 32 random bytes encoded as unpadded base64url. */
function generateRandomSecret() {
	const bytes = new Uint8Array(GENERATED_SECRET_BYTES);
	crypto.getRandomValues(bytes);
	return encodeBase64url(bytes);
}
/** Return the first non-empty string from `values`, or `null` if all are empty. */
function pickFirstNonEmpty(...values) {
	for (const value of values) if (typeof value === "string" && value.length > 0) return value;
	return null;
}
var BASE64URL_CHARSET_PATTERN = /^[A-Za-z0-9_-]+$/;
/**
* Validate base64url shape and decode. Returns `null` on malformed input
* (rather than throwing) so the caller can produce a config-specific error.
*/
function decodeBase64urlStrict(input) {
	if (!BASE64URL_CHARSET_PATTERN.test(input)) return null;
	try {
		return decodeBase64url(input);
	} catch {
		return null;
	}
}
/**
* Default env reader.
*
* Reads **only** `process.env`. This module must never reference
* `import.meta.env`: in an Astro/Vite production build the bare
* `import.meta.env` expression is statically replaced with an object
* literal built from the env loaded at build time, which (a) embeds any
* secret present in `.env` on the build machine into the shipped server
* bundle, and (b) makes that stale build-time value silently shadow the
* real runtime secret configured on the deployment platform (e.g. via
* `wrangler secret put`). See #2139.
*
* `process.env` is the runtime source on Node/container deployments and
* on Cloudflare Workers with Node compatibility (the same source
* `resolveS3Config` in `../storage/s3.ts` uses). The CLI surface
* (`cli/commands/secrets.ts`) runs outside the bundle where
* `process.env` is native.
*
* The convention documented in AGENTS.md ("import.meta.env.EMDASH_X ||
* import.meta.env.X") is for public, build-time config in route
* handlers; secrets are deliberately excluded from it.
*/
function readDefaultEnv() {
	const proc = typeof process !== "undefined" && process.env ? process.env : {};
	return {
		EMDASH_ENCRYPTION_KEY: proc.EMDASH_ENCRYPTION_KEY,
		EMDASH_PREVIEW_SECRET: proc.EMDASH_PREVIEW_SECRET,
		PREVIEW_SECRET: proc.PREVIEW_SECRET,
		EMDASH_IP_SALT: proc.EMDASH_IP_SALT,
		EMDASH_AUTH_SECRET: proc.EMDASH_AUTH_SECRET,
		AUTH_SECRET: proc.AUTH_SECRET
	};
}
export { validateEncryptionKeyAtStartup as a, resolveSecretsCached as i, markRequestScopedDb as n, resolvePluginEncryptionKeys as r, EmDashSecretsError as t };
