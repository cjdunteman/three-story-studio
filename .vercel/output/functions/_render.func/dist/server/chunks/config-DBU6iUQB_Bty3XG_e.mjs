import { isDid } from "@atcute/lexicons/syntax";
// node_modules/emdash/dist/config-DBU6iUQB.mjs
function getRegistryConfigInput(registry) {
	return registry === false ? void 0 : registry;
}
var RegistryConfigurationError = class extends Error {
	constructor(code, field, message, options) {
		super(`EmDash registry configuration error in ${field}: ${message}`, options);
		this.code = code;
		this.field = field;
		this.name = "RegistryConfigurationError";
	}
};
function registryField(suffix) {
	return `registry.${suffix}`;
}
/**
* Canonicalize a capabilities list for set-style comparison.
*
* Capabilities (the legacy declared-access shape used by the current
* sandbox enforcer) are conceptually a *set*: order, duplicates, and
* non-string entries don't carry meaning. The install handler's drift
* check compares the admin's acknowledged set against the bundle
* manifest's set; both sides pass through this canonicalizer first so
* an aggregator-supplied array with unstable order or junk entries
* can't cause a spurious drift rejection.
*
* Filters non-strings, deduplicates, and sorts lexically. Named to
* avoid shadowing `@emdash-cms/plugin-types`'s existing
* `normalizeCapabilities` (which dedupes + applies the deprecated →
* current alias map but does not filter junk or sort).
*
* Exported so the same shape is produced by the browser before sending
* the `acknowledgedDeclaredAccess` payload and by the server before
* comparing against the bundle.
*/
function canonicalCapabilitiesForDriftCheck(value) {
	if (!Array.isArray(value)) return [];
	const seen = /* @__PURE__ */ new Set();
	for (const entry of value) if (typeof entry === "string" && entry.length > 0) seen.add(entry);
	return [...seen].toSorted();
}
/**
* Returns whether a `(publisher_did, slug)` pair is on the
* minimum-release-age exemption list. Exported so the same matcher is
* used by the browser policy filter and the server-side install
* enforcement.
*
* Matching is DID-only. Handles are aggregator-supplied envelope data
* (mutable, controlled by an attacker who compromises the aggregator)
* and cannot be used as a trust input -- a compromised aggregator
* could claim any handle for any package and bypass the holdback. DIDs
* are part of the AT URI of the package record and are independently
* resolvable, so even a compromised aggregator can't lie about the
* publisher DID without also breaking checksum verification downstream.
*
* Entries from config are already lowercased at manifest-build time.
* Runtime values are lowercased here at compare time.
*/
function releaseExemptFromMinimumAge(exclude, publisherDid, slug) {
	if (!exclude || exclude.length === 0) return false;
	const didLower = publisherDid.toLowerCase();
	const fullDid = `${didLower}/${slug.toLowerCase()}`;
	for (const entry of exclude) {
		if (entry === didLower) return true;
		if (entry === fullDid) return true;
	}
	return false;
}
var DURATION_PATTERN = /^(\d+)(s|m|h|d|w)$/;
/** Trailing slashes on the aggregator URL, stripped during normalization. */
var TRAILING_SLASHES = /\/+$/;
/** Trailing dot on a hostname, stripped before URL host comparisons. */
var TRAILING_DOT = /\.$/;
var REGISTRY_PACKAGE_SLUG_PATTERN = /^[a-z][a-z0-9_-]{0,63}$/;
/**
* Parse a duration string or raw second count into a non-negative
* integer count of seconds. Throws on unrecognised input so config
* mistakes fail at startup rather than silently disabling the policy.
*/
function parseDurationSeconds(duration) {
	if (typeof duration === "number") {
		if (!Number.isFinite(duration) || duration < 0) throw new Error(`Invalid duration: ${duration} (must be a non-negative finite number)`);
		return Math.floor(duration);
	}
	const match = duration.match(DURATION_PATTERN);
	if (!match) throw new Error(`Invalid duration format: "${duration}". Use a duration string like "48h", "7d", "30m", or a number of seconds.`);
	const value = parseInt(match[1], 10);
	const unit = match[2];
	switch (unit) {
		case "s": return value;
		case "m": return value * 60;
		case "h": return value * 60 * 60;
		case "d": return value * 24 * 60 * 60;
		case "w": return value * 7 * 24 * 60 * 60;
		default: throw new Error(`Unknown duration unit: ${unit}`);
	}
}
/**
* Validate that `aggregatorUrl` is a safe outbound target for the
* registry's XRPC calls. Same posture as artifact downloads: HTTPS
* required in production; `http://localhost` allowed only in dev.
*
* The aggregator's responses are the trust source for release records,
* checksums, labels, artifact cache descriptors, and `indexedAt` (until full MST
* verification lands). Allowing plain HTTP here would let a network
* attacker swap a release record and point the artifact URL at their
* own HTTPS bundle, defeating the checksum trust chain because the
* attacker controls the unsigned transport that supplied the checksum.
*/
function validateAggregatorUrl(aggregatorUrl, options = {}) {
	let parsed;
	try {
		parsed = new URL(aggregatorUrl);
	} catch (cause) {
		throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_INVALID", registryField("aggregatorUrl"), "must be a valid URL", { cause });
	}
	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_FORBIDDEN", registryField("aggregatorUrl"), "must use HTTP or HTTPS");
	if (parsed.username || parsed.password) throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_FORBIDDEN", registryField("aggregatorUrl"), "must not contain embedded credentials");
	const rawHostname = parsed.hostname.toLowerCase().replace(TRAILING_DOT, "");
	const hostname = rawHostname.startsWith("[") && rawHostname.endsWith("]") ? rawHostname.slice(1, -1) : rawHostname;
	const isLocalhost = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1" || hostname === "::1" || hostname.startsWith("::ffff:127.") || hostname.startsWith("::ffff:7f00:");
	if (!(options.allowLocalhost ?? false)) {
		if (parsed.protocol === "http:") throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_FORBIDDEN", registryField("aggregatorUrl"), "must use HTTPS outside development");
		if (isLocalhost) throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_FORBIDDEN", registryField("aggregatorUrl"), "must not point at localhost outside development");
	} else if (parsed.protocol === "http:" && !isLocalhost) throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_FORBIDDEN", registryField("aggregatorUrl"), "must use HTTPS unless it points at localhost in development");
	return parsed;
}
/**
* Expand the `RegistryConfigInput` shorthand into the full
* `RegistryConfig` object shape.
*
* Users can pass a bare aggregator URL string for the common case
* (`registry: "https://registry.emdashcms.com"`); the
* normalizer handles either form transparently.
*
* Returns `undefined` for `undefined` input so callers can chain with
* optional chaining.
*/
function coerceRegistryConfig(input) {
	if (input === void 0) return void 0;
	if (typeof input === "string") return { aggregatorUrl: input };
	return input;
}
/**
* Normalize the user-supplied `RegistryConfigInput` into the shape that
* ships to the admin browser via the manifest endpoint.
*
* Accepts either the shorthand string form
* (`"https://registry.emdashcms.com"`) or the full `RegistryConfig`
* object. Returns `null` when `input` is undefined so callers can
* spread the result directly into the manifest object.
*
* Throws a field-specific configuration error if the aggregator URL is
* malformed or forbidden, or a registry policy value cannot be normalized.
* The Astro integration uses this to fail during config loading. Runtime
* manifest generation uses {@link resolveManifestRegistryConfig} to expose
* recognized failures without exposing the configured value.
*/
function normalizeRegistryConfig(input, options = {}) {
	const config = coerceRegistryConfig(input);
	if (!config) return null;
	const aggregatorUrl = typeof config.aggregatorUrl === "string" ? config.aggregatorUrl.trim() : void 0;
	if (!aggregatorUrl) throw new RegistryConfigurationError("REGISTRY_AGGREGATOR_URL_REQUIRED", registryField("aggregatorUrl"), "is required when the registry is configured");
	validateAggregatorUrl(aggregatorUrl, options);
	const out = { aggregatorUrl: aggregatorUrl.replace(TRAILING_SLASHES, "") };
	if (config.acceptLabelers) out.acceptLabelers = config.acceptLabelers;
	const policy = {};
	let hasPolicy = false;
	if (config.policy?.minimumReleaseAge !== void 0) {
		try {
			policy.minimumReleaseAgeSeconds = parseDurationSeconds(config.policy.minimumReleaseAge);
		} catch (cause) {
			throw new RegistryConfigurationError("REGISTRY_MINIMUM_RELEASE_AGE_INVALID", registryField("policy.minimumReleaseAge"), "must be a duration such as \"48h\", \"7d\", or a non-negative number of seconds", { cause });
		}
		hasPolicy = true;
	}
	if (config.policy?.minimumReleaseAgeExclude !== void 0) {
		if (!Array.isArray(config.policy.minimumReleaseAgeExclude)) throw new RegistryConfigurationError("REGISTRY_MINIMUM_RELEASE_AGE_EXCLUDE_INVALID", registryField("policy.minimumReleaseAgeExclude"), "must be an array of DIDs or <did>/<slug> entries");
		const list = config.policy.minimumReleaseAgeExclude.map((entry) => {
			if (typeof entry !== "string") throw new RegistryConfigurationError("REGISTRY_MINIMUM_RELEASE_AGE_EXCLUDE_INVALID", registryField("policy.minimumReleaseAgeExclude"), "minimumReleaseAgeExclude entry must be a DID or <did>/<slug>");
			const trimmed = entry.trim();
			if (!trimmed) throw new RegistryConfigurationError("REGISTRY_MINIMUM_RELEASE_AGE_EXCLUDE_INVALID", registryField("policy.minimumReleaseAgeExclude"), "entries cannot be empty");
			const lower = trimmed.toLowerCase();
			const [did, slug, ...extra] = lower.split("/");
			if (!did || !isDid(did) || extra.length > 0 || slug !== void 0 && !REGISTRY_PACKAGE_SLUG_PATTERN.test(slug)) throw new RegistryConfigurationError("REGISTRY_MINIMUM_RELEASE_AGE_EXCLUDE_INVALID", registryField("policy.minimumReleaseAgeExclude"), "minimumReleaseAgeExclude entry must be a DID or <did>/<slug>");
			return lower;
		});
		if (list.length > 0) {
			policy.minimumReleaseAgeExclude = list;
			hasPolicy = true;
		}
	}
	if (hasPolicy) out.policy = policy;
	return out;
}
/** Normalize registry config without allowing a known config error to hide the admin. */
function resolveManifestRegistryConfig(input, options = {}) {
	try {
		const registry = normalizeRegistryConfig(input, options);
		return registry ? { registry } : {};
	} catch (error) {
		if (!(error instanceof RegistryConfigurationError)) throw error;
		return { error: {
			code: error.code,
			field: error.field
		} };
	}
}
export { releaseExemptFromMinimumAge as a, parseDurationSeconds as i, coerceRegistryConfig as n, resolveManifestRegistryConfig as o, getRegistryConfigInput as r, validateAggregatorUrl as s, canonicalCapabilitiesForDriftCheck as t };
