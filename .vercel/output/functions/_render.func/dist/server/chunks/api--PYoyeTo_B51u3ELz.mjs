import { n as isMissingColumnError, r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { i as validateStorageCollectionName, n as validateJsonFieldName, r as validatePluginIdentifier, t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { d as isSqlite, f as jsonExtractExpr, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { b as resolveConfiguredLocale, m as getI18nConfig, v as isI18nEnabled } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as EmDashSecretsError } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import { i as encodeBase64, t as decodeBase64$1 } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { r as isSystemOrderField, t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import { l as isStoragelessField, u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { r as requestCached } from "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { a as InvalidCursorError, c as ScheduledNotDueError, i as EmDashValidationError, n as ContentMutationConflictError, r as ContentSlugConflictError, t as ContentCollectionNotFoundError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as RevisionRepository } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as UserRepository } from "./user-By8SzQxS_D4eC0D6b.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import { t as CommentRepository } from "./comment-DB74Zpa4_Ce41HKnk.mjs";
import { t as interpolateUrlPattern } from "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { t as RedirectRepository } from "./redirect-DjLdw427_BDBqyEyI.mjs";
import { t as BylineRepository } from "./byline-DHJS-GGb_D9_UHvtn.mjs";
import { c as readStagedReferences, n as STAGED_REFERENCES_BASELINE_KEY, o as pageStagedGroups, r as STAGED_REFERENCES_KEY, s as readStagedReferenceBaselines, t as RelationRepository } from "./staged-ByBmPFtX_FQ60UOHq.mjs";
import { r as parseAllowedMimeTypes, t as matchesMimeAllowlist } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { t as EntryLockRepository } from "./entry-locks-CJ9uhqg1_C8W-QuNA.mjs";
import { l as invalidateCollectionCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { i as scheduledPolicyRejectionKey } from "./content-policy-BmE0MPZY_DwHUSBvD.mjs";
import { n as invalidateRedirectCache } from "./cache-5DHbpEWu_CTsWW_zV.mjs";
import { r as publishRedirectChanges } from "./artifacts-Dvdp2KK-_D_x8kJT9.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { f as invalidateTermCache } from "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import { d as SchemaRegistry, t as BlockTypeRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { n as expandCollectionBlockFields } from "./block-values-Dg0-8PPS_DG_24WSy.mjs";
import { _ as validateReferenceSelection, d as resolveEntries, f as resolveEntryGroups, g as validateOppositeSideLimit, m as resolveReferenceSelectionTargets, n as getReferenceTitleField, p as resolveReferenceSelection, u as referenceFieldConstraints, v as validateRequiredReferencesPresent, y as writeReferenceSelection } from "./relations-WIOojTL4_CqEbuQSZ.mjs";
import { a as releaseExemptFromMinimumAge, i as parseDurationSeconds, n as coerceRegistryConfig, s as validateAggregatorUrl, t as canonicalCapabilitiesForDriftCheck } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as PluginStateRepository } from "./state-CFbGZziM_KXas5_hl.mjs";
import { r as encodePluginSettingValue, t as PluginSettingEncryptionError } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as pluginManifestSchema$1, i as normalizeManifestRoute$1, o as reconcileManifestAccess$1 } from "./manifest-schema-DNb4XmTS_BtxTt78k.mjs";
import { n as MarketplaceUnavailableError, r as createMarketplaceClient, t as MarketplaceError } from "./marketplace-CqbgeIa7_JO1MG6HV.mjs";
import { r as warnDeprecatedPluginCapabilities, t as normalizeCapabilities } from "./types-sUHaH7lC_BupjCGRq.mjs";
import { c as verificationError$1, l as verifyMultihash$1, n as fetchReleaseArtifact, o as computeArtifactDigestCandidates, t as fetchRegistryArtifactUrl } from "./artifact-fetch-DIh7iyOV_BxFcsue5.mjs";
import { a as ssrfSafeFetch, i as resolveAndValidateExternalUrlTarget, n as cloudflareDohResolver } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { createRequire } from "node:module";
import { sql } from "kysely";
import { canonicalizeDeclaredAccess, isPluginSlug, isPluginVersion, pluginManifestSchema, reconcileManifestAccess } from "@emdash-cms/plugin-types";
import { createGzipDecoder } from "modern-tar";
import { NSID, PackageProfile, PackageProfileExtension, PackageRelease, PackageReleaseExtension } from "@emdash-cms/registry-lexicons";
import { DirectPdsClient, DirectPdsReadError } from "@emdash-cms/registry-client/direct-pds";
import { ClientResponseError, ClientValidationError } from "@atcute/client";
import { checkEnvCompatibility, compareVersions, findSkippedEnvConstraints } from "@emdash-cms/registry-client/env";
import { isProvenFirstRelease } from "@emdash-cms/registry-client/listing-policy";
import { evaluateRegistryReleaseWithdrawal } from "@emdash-cms/registry-client/withdrawal";
// node_modules/emdash/dist/seo-B_H_pqOd.mjs
/** Default SEO values for content without an explicit SEO row */
var SEO_DEFAULTS$1 = {
	title: null,
	description: null,
	image: null,
	canonical: null,
	noIndex: false
};
/**
* Returns true if the input has at least one explicitly-set SEO field.
* Used to skip no-op upserts when callers pass `{ seo: {} }`.
*/
function hasAnyField(input) {
	return input.title !== void 0 || input.description !== void 0 || input.image !== void 0 || input.canonical !== void 0 || input.noIndex !== void 0;
}
/**
* Repository for SEO metadata stored in `_emdash_seo`.
*
* SEO data lives in a separate table keyed by (collection, content_id).
* Only collections with `has_seo = 1` should use this — callers are
* responsible for checking the flag before reading/writing.
*/
var SeoRepository = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Check whether a collection has SEO enabled (`has_seo = 1`).
	* Returns `false` if the collection does not exist.
	*/
	async isEnabled(collection) {
		return (await this.db.selectFrom("_emdash_collections").select("has_seo").where("slug", "=", collection).executeTakeFirst())?.has_seo === 1;
	}
	/**
	* Get SEO data for a content item. Returns null defaults if no row exists.
	*/
	async get(collection, contentId) {
		const row = await this.db.selectFrom("_emdash_seo").selectAll().where("collection", "=", collection).where("content_id", "=", contentId).executeTakeFirst();
		if (!row) return { ...SEO_DEFAULTS$1 };
		return {
			title: row.seo_title ?? null,
			description: row.seo_description ?? null,
			image: row.seo_image ?? null,
			canonical: row.seo_canonical ?? null,
			noIndex: row.seo_no_index === 1
		};
	}
	/**
	* Get SEO data for multiple content items.
	* Returns a Map keyed by content_id. Items without SEO rows get defaults.
	*
	* Chunks the `content_id IN (…)` clause so the total bound-parameter count
	* per statement (ids + the `collection = ?` filter) stays within Cloudflare
	* D1's 100-variable limit regardless of how many content items are passed.
	*/
	async getMany(collection, contentIds) {
		const result = /* @__PURE__ */ new Map();
		if (contentIds.length === 0) return result;
		for (const id of contentIds) result.set(id, { ...SEO_DEFAULTS$1 });
		const uniqueContentIds = [...new Set(contentIds)];
		for (const chunk of chunks(uniqueContentIds, 50)) {
			const rows = await this.db.selectFrom("_emdash_seo").selectAll().where("collection", "=", collection).where("content_id", "in", chunk).execute();
			for (const row of rows) result.set(row.content_id, {
				title: row.seo_title ?? null,
				description: row.seo_description ?? null,
				image: row.seo_image ?? null,
				canonical: row.seo_canonical ?? null,
				noIndex: row.seo_no_index === 1
			});
		}
		return result;
	}
	/**
	* Upsert SEO data for a content item using INSERT ON CONFLICT DO UPDATE
	* for atomicity. Skips no-op writes when input has no fields set.
	*/
	async upsert(collection, contentId, input) {
		if (!hasAnyField(input)) return this.get(collection, contentId);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		await sql`
			INSERT INTO _emdash_seo (
				collection, content_id,
				seo_title, seo_description, seo_image, seo_canonical, seo_no_index,
				created_at, updated_at
			) VALUES (
				${collection}, ${contentId},
				${input.title ?? null}, ${input.description ?? null},
				${input.image ?? null}, ${input.canonical ?? null},
				${input.noIndex ? 1 : 0},
				${now}, ${now}
			)
			ON CONFLICT (collection, content_id) DO UPDATE SET
				seo_title = ${input.title !== void 0 ? sql`${input.title}` : sql`_emdash_seo.seo_title`},
				seo_description = ${input.description !== void 0 ? sql`${input.description}` : sql`_emdash_seo.seo_description`},
				seo_image = ${input.image !== void 0 ? sql`${input.image}` : sql`_emdash_seo.seo_image`},
				seo_canonical = ${input.canonical !== void 0 ? sql`${input.canonical}` : sql`_emdash_seo.seo_canonical`},
				seo_no_index = ${input.noIndex !== void 0 ? sql`${input.noIndex ? 1 : 0}` : sql`_emdash_seo.seo_no_index`},
				updated_at = ${now}
		`.execute(this.db);
		invalidateCollectionCache(collection);
		return this.get(collection, contentId);
	}
	/**
	* Delete SEO data for a content item.
	*/
	async delete(collection, contentId) {
		await this.db.deleteFrom("_emdash_seo").where("collection", "=", collection).where("content_id", "=", contentId).execute();
		invalidateCollectionCache(collection);
	}
	/**
	* Copy SEO data from one content item to another.
	* Used by duplicate. Clears canonical (it pointed to the original).
	*/
	async copyForDuplicate(collection, sourceId, targetId) {
		const source = await this.get(collection, sourceId);
		if (source.title !== null || source.description !== null || source.image !== null || source.noIndex) await this.upsert(collection, targetId, {
			title: source.title,
			description: source.description,
			image: source.image,
			canonical: null,
			noIndex: source.noIndex
		});
	}
};
// node_modules/emdash/dist/types-qHVygneX.mjs
var SANDBOX_ROUTE_ERROR_DEFINITIONS = {
	MEDIA_USAGE_ACTIVATION_IN_PROGRESS: {
		message: "Media usage activation is in progress",
		status: 503
	},
	MEDIA_USAGE_ACTIVATION_CHECK_FAILED: {
		message: "Unable to verify media usage activation state",
		status: 503
	},
	TRANSFER_IMPORT_IN_PROGRESS: {
		message: "A site import is in progress or incomplete; writes are disabled",
		status: 503
	},
	TRANSFER_FENCE_CHECK_FAILED: {
		message: "Unable to verify whether site writes are allowed",
		status: 503
	}
};
function isRecord$4(value) {
	return typeof value === "object" && value !== null;
}
function isSandboxRouteErrorCode(value) {
	return typeof value === "string" && value in SANDBOX_ROUTE_ERROR_DEFINITIONS;
}
function getSandboxRouteErrorDetails(error) {
	if (!isRecord$4(error)) return null;
	const propertyCode = isSandboxRouteErrorCode(error.code) ? error.code : null;
	const nameCode = error instanceof Error && isSandboxRouteErrorCode(error.name) ? error.name : null;
	if (propertyCode && nameCode && propertyCode !== nameCode) return null;
	const code = propertyCode ?? nameCode;
	if (!code || error.status !== void 0 && error.status !== 503) return null;
	return {
		code,
		...SANDBOX_ROUTE_ERROR_DEFINITIONS[code]
	};
}
function withUnavailableReason(message, runner) {
	const reason = runner?.unavailableReason?.();
	return reason ? `${message}: ${reason}` : message;
}
// node_modules/emdash/dist/types-CgfFGfO5.mjs
/**
* Storage error with additional context
*/
var EmDashStorageError = class extends Error {
	constructor(message, code, cause) {
		super(message);
		this.code = code;
		this.cause = cause;
		this.name = "EmDashStorageError";
	}
};
// node_modules/emdash/dist/authoritative-records-CQlB3JzE.mjs
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire("file:///C:/emdash-registry-verification.js");
function verificationError(code, message, details) {
	return {
		success: false,
		error: {
			code,
			message,
			...details === void 0 ? {} : { details }
		}
	};
}
var SHA2_256_CODE = 18;
var SHA2_256_LENGTH = 32;
var BASE32_ALPHABET$1 = "abcdefghijklmnopqrstuvwxyz234567";
/** Derive the required artifact checksum from a raw sha2-256 blob CID. */
function multihashFromBlobCid(value) {
	if (!value.startsWith("b")) return verificationError("BLOB_REF_INVALID", "The blob reference CID is malformed.");
	const bytes = decodeBase32(value.slice(1));
	if (bytes === null || bytes.length !== 36 || bytes[0] !== 1 || bytes[1] !== 85) return verificationError("BLOB_REF_INVALID", "Blob references must use a CIDv1 raw sha2-256 CID.");
	const checksum = `b${encodeBase32(bytes.slice(2))}`;
	if (!decodeMultihash(checksum).success) return verificationError("BLOB_REF_INVALID", "Blob references must use a CIDv1 raw sha2-256 CID.");
	return {
		success: true,
		value: checksum
	};
}
/** Decodes a lowercase base32 multibase-encoded multihash. */
function decodeMultihash(value) {
	if (!value.startsWith("b")) return verificationError("INVALID_MULTIHASH", "Checksums must be lowercase base32 multibase-encoded multihashes.");
	const bytes = decodeBase32(value.slice(1));
	if (bytes === null) return verificationError("INVALID_MULTIHASH", "The multibase checksum is malformed.");
	const code = readVarint(bytes, 0);
	if (code === null) return verificationError("INVALID_MULTIHASH", "The multihash algorithm code is malformed.");
	const length = readVarint(bytes, code.nextOffset);
	if (length === null || length.value !== bytes.length - length.nextOffset) return verificationError("INVALID_MULTIHASH", "The multihash digest length is malformed.");
	if (code.value !== SHA2_256_CODE) return verificationError("UNSUPPORTED_MULTIHASH", "The multihash algorithm is not supported.");
	if (length.value !== SHA2_256_LENGTH) return verificationError("INVALID_MULTIHASH", "The sha2-256 digest must be 32 bytes.");
	return {
		success: true,
		value: {
			algorithm: "sha2-256",
			digest: bytes.slice(length.nextOffset)
		}
	};
}
async function verifyMultihash(bytes, expected) {
	const decoded = decodeMultihash(expected);
	if (!decoded.success) return decoded;
	const actual = await computeDigest(bytes, decoded.value.algorithm);
	if (!actual.success) return actual;
	if (!compareDigestBytes(actual.value, decoded.value.digest)) return verificationError("CHECKSUM_MISMATCH", "The resource bytes do not match the expected checksum.");
	return {
		success: true,
		value: true
	};
}
/**
* Compare public checksum digest bytes without early exit. Digests are public
* integrity metadata, so a portable byte loop is preferable to a Node-only
* timing primitive while still avoiding an ordinary equality short circuit.
*/
function compareDigestBytes(left, right) {
	let difference = left.length ^ right.length;
	const maximumLength = Math.max(left.length, right.length);
	for (let index = 0; index < maximumLength; index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
	return difference === 0;
}
async function computeDigest(bytes, algorithm) {
	if (algorithm !== "sha2-256") return verificationError("UNSUPPORTED_MULTIHASH", "The multihash algorithm is not supported.");
	try {
		return {
			success: true,
			value: new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)))
		};
	} catch {
		return verificationError("UNSUPPORTED_MULTIHASH", "The sha2-256 algorithm is unavailable.");
	}
}
function readVarint(bytes, offset) {
	let value = 0;
	let shift = 0;
	for (let index = offset; index < bytes.length && index < offset + 5; index += 1) {
		const byte = bytes[index];
		if (byte === void 0) return null;
		value |= (byte & 127) << shift;
		if ((byte & 128) === 0) return {
			value,
			nextOffset: index + 1
		};
		shift += 7;
	}
	return null;
}
function encodeBase32(bytes) {
	let result = "";
	let buffer = 0;
	let bits = 0;
	for (const byte of bytes) {
		buffer = buffer << 8 | byte;
		bits += 8;
		while (bits >= 5) {
			result += BASE32_ALPHABET$1[buffer >>> bits - 5 & 31] ?? "";
			bits -= 5;
		}
	}
	if (bits > 0) result += BASE32_ALPHABET$1[buffer << 5 - bits & 31] ?? "";
	return result;
}
function decodeBase32(value) {
	if (value.length === 0) return null;
	let buffer = 0;
	let bits = 0;
	const output = [];
	for (const character of value) {
		const digit = BASE32_ALPHABET$1.indexOf(character);
		if (digit === -1) return null;
		buffer = buffer << 5 | digit;
		bits += 5;
		if (bits >= 8) {
			output.push(buffer >>> bits - 8 & 255);
			bits -= 8;
		}
	}
	if (bits > 0 && (buffer & (1 << bits) - 1) !== 0) return null;
	return new Uint8Array(output);
}
var UNSUPPORTED_AUTH_MESSAGE = "This release requires an authentication method the client does not support.";
function unsupportedAuthDetails(auth) {
	if (!isRecord$3(auth) || typeof auth.hint_url !== "string" || auth.hint_url.length > 2048) return;
	try {
		const url = new URL(auth.hint_url);
		if (url.protocol !== "https:" || url.username || url.password) return void 0;
		return { hintUrl: url.href };
	} catch {
		return;
	}
}
function isRecord$3(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
var DIGITS = /^\d+$/;
var IPV4_LITERAL = /^\d{1,3}(?:\.\d{1,3}){3}$/;
var IPV4_PART = /^\d{1,3}$/;
var IPV6_PART = /^[0-9a-f]{1,4}$/i;
var TRAILING_DOT = /\.+$/;
var DEFAULT_FETCH_LIMITS = {
	headerTimeoutMs: 1e4,
	totalTimeoutMs: 3e4,
	maxBytes: 26214400,
	maxRedirects: 3
};
async function fetchVerifiedResource(value, options) {
	const limits = {
		headerTimeoutMs: options.headerTimeoutMs ?? DEFAULT_FETCH_LIMITS.headerTimeoutMs,
		totalTimeoutMs: options.totalTimeoutMs ?? DEFAULT_FETCH_LIMITS.totalTimeoutMs,
		maxBytes: options.maxBytes ?? DEFAULT_FETCH_LIMITS.maxBytes,
		maxRedirects: options.maxRedirects ?? DEFAULT_FETCH_LIMITS.maxRedirects
	};
	if (!areValidLimits(limits)) return verificationError("INVALID_URL", "Fetch limits must be positive integers.");
	const startedAt = Date.now();
	let currentUrl = parseAndValidateUrl(value, void 0, options.allowHttpLocalhost === true);
	if (!currentUrl.success) return currentUrl;
	for (let redirects = 0;; redirects += 1) {
		const remaining = limits.totalTimeoutMs - (Date.now() - startedAt);
		if (remaining <= 0) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		const host = isAllowedLoopback(currentUrl.value, options.allowHttpLocalhost === true) ? {
			success: true,
			value: true
		} : await validateHost(currentUrl.value, options.resolveHostname, remaining);
		if (!host.success) return host;
		const remainingAfterResolution = limits.totalTimeoutMs - (Date.now() - startedAt);
		if (remainingAfterResolution <= 0) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		const response = await fetchResponse(options.fetch, currentUrl.value, Math.min(remainingAfterResolution, limits.headerTimeoutMs));
		if (!response.success) return response;
		if (isRedirect(response.value.status)) {
			if (redirects >= limits.maxRedirects) return verificationError("REDIRECT_LIMIT_EXCEEDED", "The resource exceeded the redirect limit.");
			const location = response.value.headers.get("location");
			if (location === null) return verificationError("REDIRECT_LOCATION_MISSING", "The redirect response has no location header.");
			currentUrl = parseAndValidateUrl(location, currentUrl.value, options.allowHttpLocalhost === true);
			if (!currentUrl.success) return currentUrl;
			continue;
		}
		if (!response.value.ok && !options.allowedStatuses?.includes(response.value.status)) return verificationError("RESOURCE_STATUS_ERROR", `The resource returned HTTP ${response.value.status}.`);
		const contentLength = response.value.headers.get("content-length");
		if (contentLength !== null && (!DIGITS.test(contentLength) || Number(contentLength) > limits.maxBytes)) return verificationError("RESOURCE_SIZE_EXCEEDED", "The resource exceeds the byte limit.");
		const bytes = await readResponse(response.value, limits.maxBytes, startedAt, limits.totalTimeoutMs);
		if (!bytes.success) return bytes;
		return {
			success: true,
			value: {
				bytes: bytes.value,
				url: currentUrl.value,
				status: response.value.status,
				headers: response.value.headers
			}
		};
	}
}
function parseAndValidateUrl(value, base, allowHttpLocalhost = false) {
	let url;
	try {
		url = new URL(value, base);
	} catch {
		return verificationError("INVALID_URL", "The resource URL is invalid.");
	}
	if (url.protocol !== "https:" && !isAllowedLoopback(url, allowHttpLocalhost) || url.username !== "" || url.password !== "") return verificationError("INVALID_URL", "Resource URLs must use HTTPS and cannot include credentials.");
	if (!isAllowedLoopback(url, allowHttpLocalhost) && (isIpLiteral(url.hostname) || isLocalHostname(url.hostname))) return verificationError("HOST_REJECTED", "The resource host is not permitted.");
	return {
		success: true,
		value: url
	};
}
function isAllowedLoopback(url, enabled) {
	if (!enabled || url.protocol !== "http:" && url.protocol !== "https:") return false;
	const hostname = url.hostname.toLowerCase().replace(TRAILING_DOT, "");
	return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "::1";
}
async function validateHost(url, resolver, timeoutMs) {
	try {
		const addresses = await withTimeout(Promise.resolve().then(() => resolver(url.hostname)), timeoutMs);
		if (addresses.length === 0 || addresses.some(isForbiddenAddress)) return verificationError("HOST_REJECTED", "The resource host resolved to a forbidden address.");
		return {
			success: true,
			value: true
		};
	} catch (error) {
		if (isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		return verificationError("HOST_REJECTED", "The resource host could not be validated.");
	}
}
async function fetchResponse(fetchImplementation, url, timeoutMs) {
	const controller = new AbortController();
	try {
		return {
			success: true,
			value: await withTimeout(Promise.resolve().then(() => fetchImplementation(url, {
				method: "GET",
				redirect: "manual",
				signal: controller.signal
			})), timeoutMs, () => controller.abort())
		};
	} catch (error) {
		if (controller.signal.aborted || isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource response headers timed out.");
		return verificationError("FETCH_FAILED", "The resource request failed.");
	}
}
async function readResponse(response, maximumBytes, startedAt, totalTimeoutMs) {
	if (response.body === null) return {
		success: true,
		value: /* @__PURE__ */ new Uint8Array()
	};
	const reader = response.body.getReader();
	const chunks = [];
	let length = 0;
	try {
		for (;;) {
			const remaining = totalTimeoutMs - (Date.now() - startedAt);
			if (remaining <= 0) {
				await reader.cancel();
				return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
			}
			const chunk = await readWithTimeout(reader, remaining);
			if (!chunk.success) {
				await reader.cancel();
				return chunk;
			}
			if (chunk.value.done) break;
			const value = chunk.value.value;
			length += value.length;
			if (length > maximumBytes) {
				await reader.cancel();
				return verificationError("RESOURCE_SIZE_EXCEEDED", "The resource exceeds the byte limit.");
			}
			chunks.push(value);
		}
	} catch {
		return verificationError("FETCH_FAILED", "The resource response could not be read.");
	} finally {
		reader.releaseLock();
	}
	const output = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		output.set(chunk, offset);
		offset += chunk.length;
	}
	return {
		success: true,
		value: output
	};
}
async function readWithTimeout(reader, timeoutMs) {
	try {
		return {
			success: true,
			value: await withTimeout(Promise.resolve().then(() => reader.read()), timeoutMs)
		};
	} catch (error) {
		if (isAbortError(error)) return verificationError("RESOURCE_TIMEOUT", "The resource fetch exceeded its total timeout.");
		return verificationError("FETCH_FAILED", "The resource response could not be read.");
	}
}
/**
* Every operation has both fulfillment and rejection handlers, so an operation
* that loses the timeout race cannot later become an unhandled rejection.
*/
function withTimeout(operation, timeoutMs, onTimeout) {
	return new Promise((resolve, reject) => {
		let settled = false;
		const timeout = setTimeout(() => {
			if (settled) return;
			settled = true;
			onTimeout?.();
			reject(new DOMException("Timed out", "AbortError"));
		}, timeoutMs);
		operation.then((value) => {
			if (settled) return void 0;
			settled = true;
			clearTimeout(timeout);
			resolve(value);
		}, (error) => {
			if (settled) return void 0;
			settled = true;
			clearTimeout(timeout);
			reject(error);
		});
	});
}
function areValidLimits(limits) {
	return Object.values(limits).every((value) => Number.isSafeInteger(value) && value > 0);
}
function isRedirect(status) {
	return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}
function isAbortError(error) {
	return error instanceof DOMException && error.name === "AbortError";
}
function isIpLiteral(hostname) {
	return IPV4_LITERAL.test(hostname) || hostname.includes(":");
}
function isLocalHostname(hostname) {
	const normalized = hostname.toLowerCase();
	return normalized === "localhost" || normalized.endsWith(".localhost") || normalized.endsWith(".local") || normalized.endsWith(".internal");
}
function isForbiddenAddress(address) {
	const ipv4 = parseIpv4(address);
	if (ipv4 !== null) {
		const [a, b] = ipv4;
		return a === 0 || a === 10 || a === 127 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 0 || b === 168) || a === 198 && (b === 18 || b === 19) || a >= 224;
	}
	const ipv6 = parseIpv6(address);
	if (ipv6 === null) return true;
	const first = ipv6[0];
	const isUnspecified = ipv6.every((part) => part === 0);
	const isLoopback = ipv6.slice(0, 7).every((part) => part === 0) && ipv6[7] === 1;
	const isPrivate = (first & 65024) === 64512;
	const isLinkLocal = (first & 65472) === 65152;
	const isMulticast = (first & 65280) === 65280;
	if (ipv6.slice(0, 5).every((part) => part === 0) && ipv6[5] === 65535) return isForbiddenAddress(`${ipv6[6] >>> 8}.${ipv6[6] & 255}.${ipv6[7] >>> 8}.${ipv6[7] & 255}`);
	return isUnspecified || isLoopback || isPrivate || isLinkLocal || isMulticast;
}
function parseIpv4(value) {
	const parts = value.split(".");
	if (parts.length !== 4) return null;
	const numbers = parts.map((part) => IPV4_PART.test(part) ? Number(part) : NaN);
	if (numbers.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
	return [
		numbers[0],
		numbers[1],
		numbers[2],
		numbers[3]
	];
}
function parseIpv6(value) {
	if (value.includes(":::") || value.split("::").length > 2) return null;
	const [before = "", after = ""] = value.split("::");
	const head = before === "" ? [] : before.split(":");
	const tail = after === "" ? [] : after.split(":");
	const parts = [...head, ...tail];
	if (parts.some((part) => !IPV6_PART.test(part)) || parts.length > 8) return null;
	if (!value.includes("::") && parts.length !== 8) return null;
	const zeroes = value.includes("::") ? 8 - parts.length : 0;
	return [
		...head,
		...Array.from({ length: zeroes }).fill("0"),
		...tail
	].map((part) => Number.parseInt(part, 16));
}
new TextDecoder("utf-8", {
	fatal: true,
	ignoreBOM: false
});
var require_envelope = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Signature = exports.Envelope = void 0;
	exports.Envelope = {
		fromJSON(object) {
			return {
				payload: isSet(object.payload) ? Buffer.from(bytesFromBase64(object.payload)) : Buffer.alloc(0),
				payloadType: isSet(object.payloadType) ? globalThis.String(object.payloadType) : "",
				signatures: globalThis.Array.isArray(object?.signatures) ? object.signatures.map((e) => exports.Signature.fromJSON(e)) : []
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.payload.length !== 0) obj.payload = base64FromBytes(message.payload);
			if (message.payloadType !== "") obj.payloadType = message.payloadType;
			if (message.signatures?.length) obj.signatures = message.signatures.map((e) => exports.Signature.toJSON(e));
			return obj;
		}
	};
	exports.Signature = {
		fromJSON(object) {
			return {
				sig: isSet(object.sig) ? Buffer.from(bytesFromBase64(object.sig)) : Buffer.alloc(0),
				keyid: isSet(object.keyid) ? globalThis.String(object.keyid) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.sig.length !== 0) obj.sig = base64FromBytes(message.sig);
			if (message.keyid !== "") obj.keyid = message.keyid;
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_timestamp$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Timestamp = void 0;
	exports.Timestamp = {
		fromJSON(object) {
			return {
				seconds: isSet(object.seconds) ? globalThis.String(object.seconds) : "0",
				nanos: isSet(object.nanos) ? globalThis.Number(object.nanos) : 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.seconds !== "0") obj.seconds = message.seconds;
			if (message.nanos !== 0) obj.nanos = Math.round(message.nanos);
			return obj;
		}
	};
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_sigstore_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TimeRange = exports.X509CertificateChain = exports.SubjectAlternativeName = exports.X509Certificate = exports.DistinguishedName = exports.ObjectIdentifierValuePair = exports.ObjectIdentifier = exports.PublicKeyIdentifier = exports.PublicKey = exports.RFC3161SignedTimestamp = exports.LogId = exports.MessageSignature = exports.HashOutput = exports.SubjectAlternativeNameType = exports.PublicKeyDetails = exports.HashAlgorithm = void 0;
	exports.hashAlgorithmFromJSON = hashAlgorithmFromJSON;
	exports.hashAlgorithmToJSON = hashAlgorithmToJSON;
	exports.publicKeyDetailsFromJSON = publicKeyDetailsFromJSON;
	exports.publicKeyDetailsToJSON = publicKeyDetailsToJSON;
	exports.subjectAlternativeNameTypeFromJSON = subjectAlternativeNameTypeFromJSON;
	exports.subjectAlternativeNameTypeToJSON = subjectAlternativeNameTypeToJSON;
	const timestamp_1 = require_timestamp$2();
	/**
	* Only a subset of the secure hash standard algorithms are supported.
	* See <https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf> for more
	* details.
	* UNSPECIFIED SHOULD not be used, primary reason for inclusion is to force
	* any proto JSON serialization to emit the used hash algorithm, as default
	* option is to *omit* the default value of an enum (which is the first
	* value, represented by '0'.
	*/
	var HashAlgorithm;
	(function(HashAlgorithm) {
		HashAlgorithm[HashAlgorithm["HASH_ALGORITHM_UNSPECIFIED"] = 0] = "HASH_ALGORITHM_UNSPECIFIED";
		HashAlgorithm[HashAlgorithm["SHA2_256"] = 1] = "SHA2_256";
		HashAlgorithm[HashAlgorithm["SHA2_384"] = 2] = "SHA2_384";
		HashAlgorithm[HashAlgorithm["SHA2_512"] = 3] = "SHA2_512";
		/**
		* SHA3_256 - Used for LMS
		*
		* @deprecated
		*/
		HashAlgorithm[HashAlgorithm["SHA3_256"] = 4] = "SHA3_256";
		/**
		* SHA3_384 - Used for LMS
		*
		* @deprecated
		*/
		HashAlgorithm[HashAlgorithm["SHA3_384"] = 5] = "SHA3_384";
	})(HashAlgorithm || (exports.HashAlgorithm = HashAlgorithm = {}));
	function hashAlgorithmFromJSON(object) {
		switch (object) {
			case 0:
			case "HASH_ALGORITHM_UNSPECIFIED": return HashAlgorithm.HASH_ALGORITHM_UNSPECIFIED;
			case 1:
			case "SHA2_256": return HashAlgorithm.SHA2_256;
			case 2:
			case "SHA2_384": return HashAlgorithm.SHA2_384;
			case 3:
			case "SHA2_512": return HashAlgorithm.SHA2_512;
			case 4:
			case "SHA3_256": return HashAlgorithm.SHA3_256;
			case 5:
			case "SHA3_384": return HashAlgorithm.SHA3_384;
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum HashAlgorithm");
		}
	}
	function hashAlgorithmToJSON(object) {
		switch (object) {
			case HashAlgorithm.HASH_ALGORITHM_UNSPECIFIED: return "HASH_ALGORITHM_UNSPECIFIED";
			case HashAlgorithm.SHA2_256: return "SHA2_256";
			case HashAlgorithm.SHA2_384: return "SHA2_384";
			case HashAlgorithm.SHA2_512: return "SHA2_512";
			case HashAlgorithm.SHA3_256: return "SHA3_256";
			case HashAlgorithm.SHA3_384: return "SHA3_384";
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum HashAlgorithm");
		}
	}
	/**
	* Details of a specific public key, capturing the the key encoding method,
	* and signature algorithm.
	*
	* PublicKeyDetails captures the public key/hash algorithm combinations
	* recommended in the Sigstore ecosystem.
	*
	* This is modelled as a linear set as we want to provide a small number of
	* opinionated options instead of allowing every possible permutation.
	*
	* Any changes to this enum MUST be reflected in the algorithm registry.
	*
	* See: <https://github.com/sigstore/architecture-docs/blob/main/algorithm-registry.md>
	*
	* To avoid the possibility of contradicting formats such as PKCS1 with
	* ED25519 the valid permutations are listed as a linear set instead of a
	* cartesian set (i.e one combined variable instead of two, one for encoding
	* and one for the signature algorithm).
	*/
	var PublicKeyDetails;
	(function(PublicKeyDetails) {
		PublicKeyDetails[PublicKeyDetails["PUBLIC_KEY_DETAILS_UNSPECIFIED"] = 0] = "PUBLIC_KEY_DETAILS_UNSPECIFIED";
		/**
		* PKCS1_RSA_PKCS1V5 - RSA
		*
		* @deprecated
		*/
		PublicKeyDetails[PublicKeyDetails["PKCS1_RSA_PKCS1V5"] = 1] = "PKCS1_RSA_PKCS1V5";
		/**
		* PKCS1_RSA_PSS - See RFC8017
		*
		* @deprecated
		*/
		PublicKeyDetails[PublicKeyDetails["PKCS1_RSA_PSS"] = 2] = "PKCS1_RSA_PSS";
		/** @deprecated */
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PKCS1V5"] = 3] = "PKIX_RSA_PKCS1V5";
		/** @deprecated */
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PSS"] = 4] = "PKIX_RSA_PSS";
		/** PKIX_RSA_PKCS1V15_2048_SHA256 - RSA public key in PKIX format, PKCS#1v1.5 signature */
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PKCS1V15_2048_SHA256"] = 9] = "PKIX_RSA_PKCS1V15_2048_SHA256";
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PKCS1V15_3072_SHA256"] = 10] = "PKIX_RSA_PKCS1V15_3072_SHA256";
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PKCS1V15_4096_SHA256"] = 11] = "PKIX_RSA_PKCS1V15_4096_SHA256";
		/** PKIX_RSA_PSS_2048_SHA256 - RSA public key in PKIX format, RSASSA-PSS signature */
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PSS_2048_SHA256"] = 16] = "PKIX_RSA_PSS_2048_SHA256";
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PSS_3072_SHA256"] = 17] = "PKIX_RSA_PSS_3072_SHA256";
		PublicKeyDetails[PublicKeyDetails["PKIX_RSA_PSS_4096_SHA256"] = 18] = "PKIX_RSA_PSS_4096_SHA256";
		/**
		* PKIX_ECDSA_P256_HMAC_SHA_256 - ECDSA
		*
		* @deprecated
		*/
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P256_HMAC_SHA_256"] = 6] = "PKIX_ECDSA_P256_HMAC_SHA_256";
		/** PKIX_ECDSA_P256_SHA_256 - See NIST FIPS 186-4 */
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P256_SHA_256"] = 5] = "PKIX_ECDSA_P256_SHA_256";
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P384_SHA_384"] = 12] = "PKIX_ECDSA_P384_SHA_384";
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P521_SHA_512"] = 13] = "PKIX_ECDSA_P521_SHA_512";
		/** PKIX_ED25519 - Ed 25519 */
		PublicKeyDetails[PublicKeyDetails["PKIX_ED25519"] = 7] = "PKIX_ED25519";
		PublicKeyDetails[PublicKeyDetails["PKIX_ED25519_PH"] = 8] = "PKIX_ED25519_PH";
		/**
		* PKIX_ECDSA_P384_SHA_256 - These algorithms are deprecated and should not be used, but they
		* were/are being used by most Sigstore clients implementations.
		*
		* @deprecated
		*/
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P384_SHA_256"] = 19] = "PKIX_ECDSA_P384_SHA_256";
		/** @deprecated */
		PublicKeyDetails[PublicKeyDetails["PKIX_ECDSA_P521_SHA_256"] = 20] = "PKIX_ECDSA_P521_SHA_256";
		/**
		* LMS_SHA256 - LMS and LM-OTS
		*
		* These algorithms are deprecated and should not be used.
		* There are no plans to support SLH-DSA at this time.
		*
		* USER WARNING: LMS and LM-OTS are both stateful signature schemes.
		* Using them correctly requires discretion and careful consideration
		* to ensure that individual secret keys are not used more than once.
		* In addition, LM-OTS is a single-use scheme, meaning that it
		* MUST NOT be used for more than one signature per LM-OTS key.
		* If you cannot maintain these invariants, you MUST NOT use these
		* schemes.
		*
		* @deprecated
		*/
		PublicKeyDetails[PublicKeyDetails["LMS_SHA256"] = 14] = "LMS_SHA256";
		/** @deprecated */
		PublicKeyDetails[PublicKeyDetails["LMOTS_SHA256"] = 15] = "LMOTS_SHA256";
		/**
		* ML_DSA_44 - ML-DSA
		*
		* These ML_DSA_44, ML_DSA_65 and ML-DSA_87 algorithms are the pure variants
		* that take data to sign rather than the prehash variants (HashML-DSA), which
		* take digests. While considered quantum-resistant, their usage
		* involves tradeoffs in that signatures and keys are much larger, and
		* this makes deployments more costly.
		*
		* USER WARNING: ML_DSA_44, ML_DSA_65 and ML_DSA_87 are experimental algorithms.
		* In the future they MAY be used by private Sigstore deployments, but
		* they are not yet fully functional. This warning will be removed when
		* these algorithms are widely supported by Sigstore clients and servers,
		* but care should still be taken for production environments.
		*
		* See NIST FIPS 204, RFC 9881 for algorithm identifiers
		*/
		PublicKeyDetails[PublicKeyDetails["ML_DSA_44"] = 23] = "ML_DSA_44";
		PublicKeyDetails[PublicKeyDetails["ML_DSA_65"] = 21] = "ML_DSA_65";
		PublicKeyDetails[PublicKeyDetails["ML_DSA_87"] = 22] = "ML_DSA_87";
	})(PublicKeyDetails || (exports.PublicKeyDetails = PublicKeyDetails = {}));
	function publicKeyDetailsFromJSON(object) {
		switch (object) {
			case 0:
			case "PUBLIC_KEY_DETAILS_UNSPECIFIED": return PublicKeyDetails.PUBLIC_KEY_DETAILS_UNSPECIFIED;
			case 1:
			case "PKCS1_RSA_PKCS1V5": return PublicKeyDetails.PKCS1_RSA_PKCS1V5;
			case 2:
			case "PKCS1_RSA_PSS": return PublicKeyDetails.PKCS1_RSA_PSS;
			case 3:
			case "PKIX_RSA_PKCS1V5": return PublicKeyDetails.PKIX_RSA_PKCS1V5;
			case 4:
			case "PKIX_RSA_PSS": return PublicKeyDetails.PKIX_RSA_PSS;
			case 9:
			case "PKIX_RSA_PKCS1V15_2048_SHA256": return PublicKeyDetails.PKIX_RSA_PKCS1V15_2048_SHA256;
			case 10:
			case "PKIX_RSA_PKCS1V15_3072_SHA256": return PublicKeyDetails.PKIX_RSA_PKCS1V15_3072_SHA256;
			case 11:
			case "PKIX_RSA_PKCS1V15_4096_SHA256": return PublicKeyDetails.PKIX_RSA_PKCS1V15_4096_SHA256;
			case 16:
			case "PKIX_RSA_PSS_2048_SHA256": return PublicKeyDetails.PKIX_RSA_PSS_2048_SHA256;
			case 17:
			case "PKIX_RSA_PSS_3072_SHA256": return PublicKeyDetails.PKIX_RSA_PSS_3072_SHA256;
			case 18:
			case "PKIX_RSA_PSS_4096_SHA256": return PublicKeyDetails.PKIX_RSA_PSS_4096_SHA256;
			case 6:
			case "PKIX_ECDSA_P256_HMAC_SHA_256": return PublicKeyDetails.PKIX_ECDSA_P256_HMAC_SHA_256;
			case 5:
			case "PKIX_ECDSA_P256_SHA_256": return PublicKeyDetails.PKIX_ECDSA_P256_SHA_256;
			case 12:
			case "PKIX_ECDSA_P384_SHA_384": return PublicKeyDetails.PKIX_ECDSA_P384_SHA_384;
			case 13:
			case "PKIX_ECDSA_P521_SHA_512": return PublicKeyDetails.PKIX_ECDSA_P521_SHA_512;
			case 7:
			case "PKIX_ED25519": return PublicKeyDetails.PKIX_ED25519;
			case 8:
			case "PKIX_ED25519_PH": return PublicKeyDetails.PKIX_ED25519_PH;
			case 19:
			case "PKIX_ECDSA_P384_SHA_256": return PublicKeyDetails.PKIX_ECDSA_P384_SHA_256;
			case 20:
			case "PKIX_ECDSA_P521_SHA_256": return PublicKeyDetails.PKIX_ECDSA_P521_SHA_256;
			case 14:
			case "LMS_SHA256": return PublicKeyDetails.LMS_SHA256;
			case 15:
			case "LMOTS_SHA256": return PublicKeyDetails.LMOTS_SHA256;
			case 23:
			case "ML_DSA_44": return PublicKeyDetails.ML_DSA_44;
			case 21:
			case "ML_DSA_65": return PublicKeyDetails.ML_DSA_65;
			case 22:
			case "ML_DSA_87": return PublicKeyDetails.ML_DSA_87;
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum PublicKeyDetails");
		}
	}
	function publicKeyDetailsToJSON(object) {
		switch (object) {
			case PublicKeyDetails.PUBLIC_KEY_DETAILS_UNSPECIFIED: return "PUBLIC_KEY_DETAILS_UNSPECIFIED";
			case PublicKeyDetails.PKCS1_RSA_PKCS1V5: return "PKCS1_RSA_PKCS1V5";
			case PublicKeyDetails.PKCS1_RSA_PSS: return "PKCS1_RSA_PSS";
			case PublicKeyDetails.PKIX_RSA_PKCS1V5: return "PKIX_RSA_PKCS1V5";
			case PublicKeyDetails.PKIX_RSA_PSS: return "PKIX_RSA_PSS";
			case PublicKeyDetails.PKIX_RSA_PKCS1V15_2048_SHA256: return "PKIX_RSA_PKCS1V15_2048_SHA256";
			case PublicKeyDetails.PKIX_RSA_PKCS1V15_3072_SHA256: return "PKIX_RSA_PKCS1V15_3072_SHA256";
			case PublicKeyDetails.PKIX_RSA_PKCS1V15_4096_SHA256: return "PKIX_RSA_PKCS1V15_4096_SHA256";
			case PublicKeyDetails.PKIX_RSA_PSS_2048_SHA256: return "PKIX_RSA_PSS_2048_SHA256";
			case PublicKeyDetails.PKIX_RSA_PSS_3072_SHA256: return "PKIX_RSA_PSS_3072_SHA256";
			case PublicKeyDetails.PKIX_RSA_PSS_4096_SHA256: return "PKIX_RSA_PSS_4096_SHA256";
			case PublicKeyDetails.PKIX_ECDSA_P256_HMAC_SHA_256: return "PKIX_ECDSA_P256_HMAC_SHA_256";
			case PublicKeyDetails.PKIX_ECDSA_P256_SHA_256: return "PKIX_ECDSA_P256_SHA_256";
			case PublicKeyDetails.PKIX_ECDSA_P384_SHA_384: return "PKIX_ECDSA_P384_SHA_384";
			case PublicKeyDetails.PKIX_ECDSA_P521_SHA_512: return "PKIX_ECDSA_P521_SHA_512";
			case PublicKeyDetails.PKIX_ED25519: return "PKIX_ED25519";
			case PublicKeyDetails.PKIX_ED25519_PH: return "PKIX_ED25519_PH";
			case PublicKeyDetails.PKIX_ECDSA_P384_SHA_256: return "PKIX_ECDSA_P384_SHA_256";
			case PublicKeyDetails.PKIX_ECDSA_P521_SHA_256: return "PKIX_ECDSA_P521_SHA_256";
			case PublicKeyDetails.LMS_SHA256: return "LMS_SHA256";
			case PublicKeyDetails.LMOTS_SHA256: return "LMOTS_SHA256";
			case PublicKeyDetails.ML_DSA_44: return "ML_DSA_44";
			case PublicKeyDetails.ML_DSA_65: return "ML_DSA_65";
			case PublicKeyDetails.ML_DSA_87: return "ML_DSA_87";
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum PublicKeyDetails");
		}
	}
	var SubjectAlternativeNameType;
	(function(SubjectAlternativeNameType) {
		SubjectAlternativeNameType[SubjectAlternativeNameType["SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED"] = 0] = "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED";
		SubjectAlternativeNameType[SubjectAlternativeNameType["EMAIL"] = 1] = "EMAIL";
		SubjectAlternativeNameType[SubjectAlternativeNameType["URI"] = 2] = "URI";
		/**
		* OTHER_NAME - OID 1.3.6.1.4.1.57264.1.7
		* See https://github.com/sigstore/fulcio/blob/main/docs/oid-info.md#1361415726417--othername-san
		* for more details.
		*/
		SubjectAlternativeNameType[SubjectAlternativeNameType["OTHER_NAME"] = 3] = "OTHER_NAME";
	})(SubjectAlternativeNameType || (exports.SubjectAlternativeNameType = SubjectAlternativeNameType = {}));
	function subjectAlternativeNameTypeFromJSON(object) {
		switch (object) {
			case 0:
			case "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED": return SubjectAlternativeNameType.SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED;
			case 1:
			case "EMAIL": return SubjectAlternativeNameType.EMAIL;
			case 2:
			case "URI": return SubjectAlternativeNameType.URI;
			case 3:
			case "OTHER_NAME": return SubjectAlternativeNameType.OTHER_NAME;
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum SubjectAlternativeNameType");
		}
	}
	function subjectAlternativeNameTypeToJSON(object) {
		switch (object) {
			case SubjectAlternativeNameType.SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED: return "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED";
			case SubjectAlternativeNameType.EMAIL: return "EMAIL";
			case SubjectAlternativeNameType.URI: return "URI";
			case SubjectAlternativeNameType.OTHER_NAME: return "OTHER_NAME";
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum SubjectAlternativeNameType");
		}
	}
	exports.HashOutput = {
		fromJSON(object) {
			return {
				algorithm: isSet(object.algorithm) ? hashAlgorithmFromJSON(object.algorithm) : 0,
				digest: isSet(object.digest) ? Buffer.from(bytesFromBase64(object.digest)) : Buffer.alloc(0)
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.algorithm !== 0) obj.algorithm = hashAlgorithmToJSON(message.algorithm);
			if (message.digest.length !== 0) obj.digest = base64FromBytes(message.digest);
			return obj;
		}
	};
	exports.MessageSignature = {
		fromJSON(object) {
			return {
				messageDigest: isSet(object.messageDigest) ? exports.HashOutput.fromJSON(object.messageDigest) : void 0,
				signature: isSet(object.signature) ? Buffer.from(bytesFromBase64(object.signature)) : Buffer.alloc(0)
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.messageDigest !== void 0) obj.messageDigest = exports.HashOutput.toJSON(message.messageDigest);
			if (message.signature.length !== 0) obj.signature = base64FromBytes(message.signature);
			return obj;
		}
	};
	exports.LogId = {
		fromJSON(object) {
			return { keyId: isSet(object.keyId) ? Buffer.from(bytesFromBase64(object.keyId)) : Buffer.alloc(0) };
		},
		toJSON(message) {
			const obj = {};
			if (message.keyId.length !== 0) obj.keyId = base64FromBytes(message.keyId);
			return obj;
		}
	};
	exports.RFC3161SignedTimestamp = {
		fromJSON(object) {
			return { signedTimestamp: isSet(object.signedTimestamp) ? Buffer.from(bytesFromBase64(object.signedTimestamp)) : Buffer.alloc(0) };
		},
		toJSON(message) {
			const obj = {};
			if (message.signedTimestamp.length !== 0) obj.signedTimestamp = base64FromBytes(message.signedTimestamp);
			return obj;
		}
	};
	exports.PublicKey = {
		fromJSON(object) {
			return {
				rawBytes: isSet(object.rawBytes) ? Buffer.from(bytesFromBase64(object.rawBytes)) : void 0,
				keyDetails: isSet(object.keyDetails) ? publicKeyDetailsFromJSON(object.keyDetails) : 0,
				validFor: isSet(object.validFor) ? exports.TimeRange.fromJSON(object.validFor) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.rawBytes !== void 0) obj.rawBytes = base64FromBytes(message.rawBytes);
			if (message.keyDetails !== 0) obj.keyDetails = publicKeyDetailsToJSON(message.keyDetails);
			if (message.validFor !== void 0) obj.validFor = exports.TimeRange.toJSON(message.validFor);
			return obj;
		}
	};
	exports.PublicKeyIdentifier = {
		fromJSON(object) {
			return { hint: isSet(object.hint) ? globalThis.String(object.hint) : "" };
		},
		toJSON(message) {
			const obj = {};
			if (message.hint !== "") obj.hint = message.hint;
			return obj;
		}
	};
	exports.ObjectIdentifier = {
		fromJSON(object) {
			return { id: globalThis.Array.isArray(object?.id) ? object.id.map((e) => globalThis.Number(e)) : [] };
		},
		toJSON(message) {
			const obj = {};
			if (message.id?.length) obj.id = message.id.map((e) => Math.round(e));
			return obj;
		}
	};
	exports.ObjectIdentifierValuePair = {
		fromJSON(object) {
			return {
				oid: isSet(object.oid) ? exports.ObjectIdentifier.fromJSON(object.oid) : void 0,
				value: isSet(object.value) ? Buffer.from(bytesFromBase64(object.value)) : Buffer.alloc(0)
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.oid !== void 0) obj.oid = exports.ObjectIdentifier.toJSON(message.oid);
			if (message.value.length !== 0) obj.value = base64FromBytes(message.value);
			return obj;
		}
	};
	exports.DistinguishedName = {
		fromJSON(object) {
			return {
				organization: isSet(object.organization) ? globalThis.String(object.organization) : "",
				commonName: isSet(object.commonName) ? globalThis.String(object.commonName) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.organization !== "") obj.organization = message.organization;
			if (message.commonName !== "") obj.commonName = message.commonName;
			return obj;
		}
	};
	exports.X509Certificate = {
		fromJSON(object) {
			return { rawBytes: isSet(object.rawBytes) ? Buffer.from(bytesFromBase64(object.rawBytes)) : Buffer.alloc(0) };
		},
		toJSON(message) {
			const obj = {};
			if (message.rawBytes.length !== 0) obj.rawBytes = base64FromBytes(message.rawBytes);
			return obj;
		}
	};
	exports.SubjectAlternativeName = {
		fromJSON(object) {
			return {
				type: isSet(object.type) ? subjectAlternativeNameTypeFromJSON(object.type) : 0,
				identity: isSet(object.regexp) ? {
					$case: "regexp",
					regexp: globalThis.String(object.regexp)
				} : isSet(object.value) ? {
					$case: "value",
					value: globalThis.String(object.value)
				} : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.type !== 0) obj.type = subjectAlternativeNameTypeToJSON(message.type);
			if (message.identity?.$case === "regexp") obj.regexp = message.identity.regexp;
			else if (message.identity?.$case === "value") obj.value = message.identity.value;
			return obj;
		}
	};
	exports.X509CertificateChain = {
		fromJSON(object) {
			return { certificates: globalThis.Array.isArray(object?.certificates) ? object.certificates.map((e) => exports.X509Certificate.fromJSON(e)) : [] };
		},
		toJSON(message) {
			const obj = {};
			if (message.certificates?.length) obj.certificates = message.certificates.map((e) => exports.X509Certificate.toJSON(e));
			return obj;
		}
	};
	exports.TimeRange = {
		fromJSON(object) {
			return {
				start: isSet(object.start) ? fromJsonTimestamp(object.start) : void 0,
				end: isSet(object.end) ? fromJsonTimestamp(object.end) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.start !== void 0) obj.start = message.start.toISOString();
			if (message.end !== void 0) obj.end = message.end.toISOString();
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function fromTimestamp(t) {
		let millis = (globalThis.Number(t.seconds) || 0) * 1e3;
		millis += (t.nanos || 0) / 1e6;
		return new globalThis.Date(millis);
	}
	function fromJsonTimestamp(o) {
		if (o instanceof globalThis.Date) return o;
		else if (typeof o === "string") return new globalThis.Date(o);
		else return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_sigstore_rekor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TransparencyLogEntry = exports.InclusionPromise = exports.InclusionProof = exports.Checkpoint = exports.KindVersion = void 0;
	const sigstore_common_1 = require_sigstore_common();
	exports.KindVersion = {
		fromJSON(object) {
			return {
				kind: isSet(object.kind) ? globalThis.String(object.kind) : "",
				version: isSet(object.version) ? globalThis.String(object.version) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.kind !== "") obj.kind = message.kind;
			if (message.version !== "") obj.version = message.version;
			return obj;
		}
	};
	exports.Checkpoint = {
		fromJSON(object) {
			return { envelope: isSet(object.envelope) ? globalThis.String(object.envelope) : "" };
		},
		toJSON(message) {
			const obj = {};
			if (message.envelope !== "") obj.envelope = message.envelope;
			return obj;
		}
	};
	exports.InclusionProof = {
		fromJSON(object) {
			return {
				logIndex: isSet(object.logIndex) ? globalThis.String(object.logIndex) : "0",
				rootHash: isSet(object.rootHash) ? Buffer.from(bytesFromBase64(object.rootHash)) : Buffer.alloc(0),
				treeSize: isSet(object.treeSize) ? globalThis.String(object.treeSize) : "0",
				hashes: globalThis.Array.isArray(object?.hashes) ? object.hashes.map((e) => Buffer.from(bytesFromBase64(e))) : [],
				checkpoint: isSet(object.checkpoint) ? exports.Checkpoint.fromJSON(object.checkpoint) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.logIndex !== "0") obj.logIndex = message.logIndex;
			if (message.rootHash.length !== 0) obj.rootHash = base64FromBytes(message.rootHash);
			if (message.treeSize !== "0") obj.treeSize = message.treeSize;
			if (message.hashes?.length) obj.hashes = message.hashes.map((e) => base64FromBytes(e));
			if (message.checkpoint !== void 0) obj.checkpoint = exports.Checkpoint.toJSON(message.checkpoint);
			return obj;
		}
	};
	exports.InclusionPromise = {
		fromJSON(object) {
			return { signedEntryTimestamp: isSet(object.signedEntryTimestamp) ? Buffer.from(bytesFromBase64(object.signedEntryTimestamp)) : Buffer.alloc(0) };
		},
		toJSON(message) {
			const obj = {};
			if (message.signedEntryTimestamp.length !== 0) obj.signedEntryTimestamp = base64FromBytes(message.signedEntryTimestamp);
			return obj;
		}
	};
	exports.TransparencyLogEntry = {
		fromJSON(object) {
			return {
				logIndex: isSet(object.logIndex) ? globalThis.String(object.logIndex) : "0",
				logId: isSet(object.logId) ? sigstore_common_1.LogId.fromJSON(object.logId) : void 0,
				kindVersion: isSet(object.kindVersion) ? exports.KindVersion.fromJSON(object.kindVersion) : void 0,
				integratedTime: isSet(object.integratedTime) ? globalThis.String(object.integratedTime) : "0",
				inclusionPromise: isSet(object.inclusionPromise) ? exports.InclusionPromise.fromJSON(object.inclusionPromise) : void 0,
				inclusionProof: isSet(object.inclusionProof) ? exports.InclusionProof.fromJSON(object.inclusionProof) : void 0,
				canonicalizedBody: isSet(object.canonicalizedBody) ? Buffer.from(bytesFromBase64(object.canonicalizedBody)) : Buffer.alloc(0)
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.logIndex !== "0") obj.logIndex = message.logIndex;
			if (message.logId !== void 0) obj.logId = sigstore_common_1.LogId.toJSON(message.logId);
			if (message.kindVersion !== void 0) obj.kindVersion = exports.KindVersion.toJSON(message.kindVersion);
			if (message.integratedTime !== "0") obj.integratedTime = message.integratedTime;
			if (message.inclusionPromise !== void 0) obj.inclusionPromise = exports.InclusionPromise.toJSON(message.inclusionPromise);
			if (message.inclusionProof !== void 0) obj.inclusionProof = exports.InclusionProof.toJSON(message.inclusionProof);
			if (message.canonicalizedBody.length !== 0) obj.canonicalizedBody = base64FromBytes(message.canonicalizedBody);
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_sigstore_bundle = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Bundle = exports.VerificationMaterial = exports.TimestampVerificationData = void 0;
	const envelope_1 = require_envelope();
	const sigstore_common_1 = require_sigstore_common();
	const sigstore_rekor_1 = require_sigstore_rekor();
	exports.TimestampVerificationData = {
		fromJSON(object) {
			return { rfc3161Timestamps: globalThis.Array.isArray(object?.rfc3161Timestamps) ? object.rfc3161Timestamps.map((e) => sigstore_common_1.RFC3161SignedTimestamp.fromJSON(e)) : [] };
		},
		toJSON(message) {
			const obj = {};
			if (message.rfc3161Timestamps?.length) obj.rfc3161Timestamps = message.rfc3161Timestamps.map((e) => sigstore_common_1.RFC3161SignedTimestamp.toJSON(e));
			return obj;
		}
	};
	exports.VerificationMaterial = {
		fromJSON(object) {
			return {
				content: isSet(object.publicKey) ? {
					$case: "publicKey",
					publicKey: sigstore_common_1.PublicKeyIdentifier.fromJSON(object.publicKey)
				} : isSet(object.x509CertificateChain) ? {
					$case: "x509CertificateChain",
					x509CertificateChain: sigstore_common_1.X509CertificateChain.fromJSON(object.x509CertificateChain)
				} : isSet(object.certificate) ? {
					$case: "certificate",
					certificate: sigstore_common_1.X509Certificate.fromJSON(object.certificate)
				} : void 0,
				tlogEntries: globalThis.Array.isArray(object?.tlogEntries) ? object.tlogEntries.map((e) => sigstore_rekor_1.TransparencyLogEntry.fromJSON(e)) : [],
				timestampVerificationData: isSet(object.timestampVerificationData) ? exports.TimestampVerificationData.fromJSON(object.timestampVerificationData) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.content?.$case === "publicKey") obj.publicKey = sigstore_common_1.PublicKeyIdentifier.toJSON(message.content.publicKey);
			else if (message.content?.$case === "x509CertificateChain") obj.x509CertificateChain = sigstore_common_1.X509CertificateChain.toJSON(message.content.x509CertificateChain);
			else if (message.content?.$case === "certificate") obj.certificate = sigstore_common_1.X509Certificate.toJSON(message.content.certificate);
			if (message.tlogEntries?.length) obj.tlogEntries = message.tlogEntries.map((e) => sigstore_rekor_1.TransparencyLogEntry.toJSON(e));
			if (message.timestampVerificationData !== void 0) obj.timestampVerificationData = exports.TimestampVerificationData.toJSON(message.timestampVerificationData);
			return obj;
		}
	};
	exports.Bundle = {
		fromJSON(object) {
			return {
				mediaType: isSet(object.mediaType) ? globalThis.String(object.mediaType) : "",
				verificationMaterial: isSet(object.verificationMaterial) ? exports.VerificationMaterial.fromJSON(object.verificationMaterial) : void 0,
				content: isSet(object.messageSignature) ? {
					$case: "messageSignature",
					messageSignature: sigstore_common_1.MessageSignature.fromJSON(object.messageSignature)
				} : isSet(object.dsseEnvelope) ? {
					$case: "dsseEnvelope",
					dsseEnvelope: envelope_1.Envelope.fromJSON(object.dsseEnvelope)
				} : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.mediaType !== "") obj.mediaType = message.mediaType;
			if (message.verificationMaterial !== void 0) obj.verificationMaterial = exports.VerificationMaterial.toJSON(message.verificationMaterial);
			if (message.content?.$case === "messageSignature") obj.messageSignature = sigstore_common_1.MessageSignature.toJSON(message.content.messageSignature);
			else if (message.content?.$case === "dsseEnvelope") obj.dsseEnvelope = envelope_1.Envelope.toJSON(message.content.dsseEnvelope);
			return obj;
		}
	};
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_sigstore_trustroot = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ClientTrustConfig = exports.ServiceConfiguration = exports.Service = exports.SigningConfig = exports.TrustedRoot = exports.CertificateAuthority = exports.TransparencyLogInstance = exports.ServiceSelector = void 0;
	exports.serviceSelectorFromJSON = serviceSelectorFromJSON;
	exports.serviceSelectorToJSON = serviceSelectorToJSON;
	const sigstore_common_1 = require_sigstore_common();
	/**
	* ServiceSelector specifies how a client SHOULD select a set of
	* Services to connect to. A client SHOULD throw an error if
	* the value is SERVICE_SELECTOR_UNDEFINED.
	*/
	var ServiceSelector;
	(function(ServiceSelector) {
		ServiceSelector[ServiceSelector["SERVICE_SELECTOR_UNDEFINED"] = 0] = "SERVICE_SELECTOR_UNDEFINED";
		/**
		* ALL - Clients SHOULD select all Services based on supported API version
		* and validity window.
		*/
		ServiceSelector[ServiceSelector["ALL"] = 1] = "ALL";
		/**
		* ANY - Clients SHOULD select one Service based on supported API version
		* and validity window. It is up to the client implementation to
		* decide how to select the Service, e.g. random or round-robin.
		*/
		ServiceSelector[ServiceSelector["ANY"] = 2] = "ANY";
		/**
		* EXACT - Clients SHOULD select a specific number of Services based on
		* supported API version and validity window, using the provided
		* `count`. It is up to the client implementation to decide how to
		* select the Service, e.g. random or round-robin.
		*/
		ServiceSelector[ServiceSelector["EXACT"] = 3] = "EXACT";
	})(ServiceSelector || (exports.ServiceSelector = ServiceSelector = {}));
	function serviceSelectorFromJSON(object) {
		switch (object) {
			case 0:
			case "SERVICE_SELECTOR_UNDEFINED": return ServiceSelector.SERVICE_SELECTOR_UNDEFINED;
			case 1:
			case "ALL": return ServiceSelector.ALL;
			case 2:
			case "ANY": return ServiceSelector.ANY;
			case 3:
			case "EXACT": return ServiceSelector.EXACT;
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum ServiceSelector");
		}
	}
	function serviceSelectorToJSON(object) {
		switch (object) {
			case ServiceSelector.SERVICE_SELECTOR_UNDEFINED: return "SERVICE_SELECTOR_UNDEFINED";
			case ServiceSelector.ALL: return "ALL";
			case ServiceSelector.ANY: return "ANY";
			case ServiceSelector.EXACT: return "EXACT";
			default: throw new globalThis.Error("Unrecognized enum value " + object + " for enum ServiceSelector");
		}
	}
	exports.TransparencyLogInstance = {
		fromJSON(object) {
			return {
				baseUrl: isSet(object.baseUrl) ? globalThis.String(object.baseUrl) : "",
				hashAlgorithm: isSet(object.hashAlgorithm) ? (0, sigstore_common_1.hashAlgorithmFromJSON)(object.hashAlgorithm) : 0,
				publicKey: isSet(object.publicKey) ? sigstore_common_1.PublicKey.fromJSON(object.publicKey) : void 0,
				logId: isSet(object.logId) ? sigstore_common_1.LogId.fromJSON(object.logId) : void 0,
				checkpointKeyId: isSet(object.checkpointKeyId) ? sigstore_common_1.LogId.fromJSON(object.checkpointKeyId) : void 0,
				operator: isSet(object.operator) ? globalThis.String(object.operator) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.baseUrl !== "") obj.baseUrl = message.baseUrl;
			if (message.hashAlgorithm !== 0) obj.hashAlgorithm = (0, sigstore_common_1.hashAlgorithmToJSON)(message.hashAlgorithm);
			if (message.publicKey !== void 0) obj.publicKey = sigstore_common_1.PublicKey.toJSON(message.publicKey);
			if (message.logId !== void 0) obj.logId = sigstore_common_1.LogId.toJSON(message.logId);
			if (message.checkpointKeyId !== void 0) obj.checkpointKeyId = sigstore_common_1.LogId.toJSON(message.checkpointKeyId);
			if (message.operator !== "") obj.operator = message.operator;
			return obj;
		}
	};
	exports.CertificateAuthority = {
		fromJSON(object) {
			return {
				subject: isSet(object.subject) ? sigstore_common_1.DistinguishedName.fromJSON(object.subject) : void 0,
				uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
				certChain: isSet(object.certChain) ? sigstore_common_1.X509CertificateChain.fromJSON(object.certChain) : void 0,
				validFor: isSet(object.validFor) ? sigstore_common_1.TimeRange.fromJSON(object.validFor) : void 0,
				operator: isSet(object.operator) ? globalThis.String(object.operator) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.subject !== void 0) obj.subject = sigstore_common_1.DistinguishedName.toJSON(message.subject);
			if (message.uri !== "") obj.uri = message.uri;
			if (message.certChain !== void 0) obj.certChain = sigstore_common_1.X509CertificateChain.toJSON(message.certChain);
			if (message.validFor !== void 0) obj.validFor = sigstore_common_1.TimeRange.toJSON(message.validFor);
			if (message.operator !== "") obj.operator = message.operator;
			return obj;
		}
	};
	exports.TrustedRoot = {
		fromJSON(object) {
			return {
				mediaType: isSet(object.mediaType) ? globalThis.String(object.mediaType) : "",
				tlogs: globalThis.Array.isArray(object?.tlogs) ? object.tlogs.map((e) => exports.TransparencyLogInstance.fromJSON(e)) : [],
				certificateAuthorities: globalThis.Array.isArray(object?.certificateAuthorities) ? object.certificateAuthorities.map((e) => exports.CertificateAuthority.fromJSON(e)) : [],
				ctlogs: globalThis.Array.isArray(object?.ctlogs) ? object.ctlogs.map((e) => exports.TransparencyLogInstance.fromJSON(e)) : [],
				timestampAuthorities: globalThis.Array.isArray(object?.timestampAuthorities) ? object.timestampAuthorities.map((e) => exports.CertificateAuthority.fromJSON(e)) : []
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.mediaType !== "") obj.mediaType = message.mediaType;
			if (message.tlogs?.length) obj.tlogs = message.tlogs.map((e) => exports.TransparencyLogInstance.toJSON(e));
			if (message.certificateAuthorities?.length) obj.certificateAuthorities = message.certificateAuthorities.map((e) => exports.CertificateAuthority.toJSON(e));
			if (message.ctlogs?.length) obj.ctlogs = message.ctlogs.map((e) => exports.TransparencyLogInstance.toJSON(e));
			if (message.timestampAuthorities?.length) obj.timestampAuthorities = message.timestampAuthorities.map((e) => exports.CertificateAuthority.toJSON(e));
			return obj;
		}
	};
	exports.SigningConfig = {
		fromJSON(object) {
			return {
				mediaType: isSet(object.mediaType) ? globalThis.String(object.mediaType) : "",
				caUrls: globalThis.Array.isArray(object?.caUrls) ? object.caUrls.map((e) => exports.Service.fromJSON(e)) : [],
				oidcUrls: globalThis.Array.isArray(object?.oidcUrls) ? object.oidcUrls.map((e) => exports.Service.fromJSON(e)) : [],
				rekorTlogUrls: globalThis.Array.isArray(object?.rekorTlogUrls) ? object.rekorTlogUrls.map((e) => exports.Service.fromJSON(e)) : [],
				rekorTlogConfig: isSet(object.rekorTlogConfig) ? exports.ServiceConfiguration.fromJSON(object.rekorTlogConfig) : void 0,
				tsaUrls: globalThis.Array.isArray(object?.tsaUrls) ? object.tsaUrls.map((e) => exports.Service.fromJSON(e)) : [],
				tsaConfig: isSet(object.tsaConfig) ? exports.ServiceConfiguration.fromJSON(object.tsaConfig) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.mediaType !== "") obj.mediaType = message.mediaType;
			if (message.caUrls?.length) obj.caUrls = message.caUrls.map((e) => exports.Service.toJSON(e));
			if (message.oidcUrls?.length) obj.oidcUrls = message.oidcUrls.map((e) => exports.Service.toJSON(e));
			if (message.rekorTlogUrls?.length) obj.rekorTlogUrls = message.rekorTlogUrls.map((e) => exports.Service.toJSON(e));
			if (message.rekorTlogConfig !== void 0) obj.rekorTlogConfig = exports.ServiceConfiguration.toJSON(message.rekorTlogConfig);
			if (message.tsaUrls?.length) obj.tsaUrls = message.tsaUrls.map((e) => exports.Service.toJSON(e));
			if (message.tsaConfig !== void 0) obj.tsaConfig = exports.ServiceConfiguration.toJSON(message.tsaConfig);
			return obj;
		}
	};
	exports.Service = {
		fromJSON(object) {
			return {
				url: isSet(object.url) ? globalThis.String(object.url) : "",
				majorApiVersion: isSet(object.majorApiVersion) ? globalThis.Number(object.majorApiVersion) : 0,
				validFor: isSet(object.validFor) ? sigstore_common_1.TimeRange.fromJSON(object.validFor) : void 0,
				operator: isSet(object.operator) ? globalThis.String(object.operator) : ""
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.url !== "") obj.url = message.url;
			if (message.majorApiVersion !== 0) obj.majorApiVersion = Math.round(message.majorApiVersion);
			if (message.validFor !== void 0) obj.validFor = sigstore_common_1.TimeRange.toJSON(message.validFor);
			if (message.operator !== "") obj.operator = message.operator;
			return obj;
		}
	};
	exports.ServiceConfiguration = {
		fromJSON(object) {
			return {
				selector: isSet(object.selector) ? serviceSelectorFromJSON(object.selector) : 0,
				count: isSet(object.count) ? globalThis.Number(object.count) : 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.selector !== 0) obj.selector = serviceSelectorToJSON(message.selector);
			if (message.count !== 0) obj.count = Math.round(message.count);
			return obj;
		}
	};
	exports.ClientTrustConfig = {
		fromJSON(object) {
			return {
				mediaType: isSet(object.mediaType) ? globalThis.String(object.mediaType) : "",
				trustedRoot: isSet(object.trustedRoot) ? exports.TrustedRoot.fromJSON(object.trustedRoot) : void 0,
				signingConfig: isSet(object.signingConfig) ? exports.SigningConfig.fromJSON(object.signingConfig) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.mediaType !== "") obj.mediaType = message.mediaType;
			if (message.trustedRoot !== void 0) obj.trustedRoot = exports.TrustedRoot.toJSON(message.trustedRoot);
			if (message.signingConfig !== void 0) obj.signingConfig = exports.SigningConfig.toJSON(message.signingConfig);
			return obj;
		}
	};
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_sigstore_verification = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Input = exports.Artifact = exports.ArtifactVerificationOptions_ObserverTimestampOptions = exports.ArtifactVerificationOptions_TlogIntegratedTimestampOptions = exports.ArtifactVerificationOptions_TimestampAuthorityOptions = exports.ArtifactVerificationOptions_CtlogOptions = exports.ArtifactVerificationOptions_TlogOptions = exports.ArtifactVerificationOptions = exports.PublicKeyIdentities = exports.CertificateIdentities = exports.CertificateIdentity = void 0;
	const sigstore_bundle_1 = require_sigstore_bundle();
	const sigstore_common_1 = require_sigstore_common();
	const sigstore_trustroot_1 = require_sigstore_trustroot();
	exports.CertificateIdentity = {
		fromJSON(object) {
			return {
				issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : "",
				san: isSet(object.san) ? sigstore_common_1.SubjectAlternativeName.fromJSON(object.san) : void 0,
				oids: globalThis.Array.isArray(object?.oids) ? object.oids.map((e) => sigstore_common_1.ObjectIdentifierValuePair.fromJSON(e)) : []
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.issuer !== "") obj.issuer = message.issuer;
			if (message.san !== void 0) obj.san = sigstore_common_1.SubjectAlternativeName.toJSON(message.san);
			if (message.oids?.length) obj.oids = message.oids.map((e) => sigstore_common_1.ObjectIdentifierValuePair.toJSON(e));
			return obj;
		}
	};
	exports.CertificateIdentities = {
		fromJSON(object) {
			return { identities: globalThis.Array.isArray(object?.identities) ? object.identities.map((e) => exports.CertificateIdentity.fromJSON(e)) : [] };
		},
		toJSON(message) {
			const obj = {};
			if (message.identities?.length) obj.identities = message.identities.map((e) => exports.CertificateIdentity.toJSON(e));
			return obj;
		}
	};
	exports.PublicKeyIdentities = {
		fromJSON(object) {
			return { publicKeys: globalThis.Array.isArray(object?.publicKeys) ? object.publicKeys.map((e) => sigstore_common_1.PublicKey.fromJSON(e)) : [] };
		},
		toJSON(message) {
			const obj = {};
			if (message.publicKeys?.length) obj.publicKeys = message.publicKeys.map((e) => sigstore_common_1.PublicKey.toJSON(e));
			return obj;
		}
	};
	exports.ArtifactVerificationOptions = {
		fromJSON(object) {
			return {
				signers: isSet(object.certificateIdentities) ? {
					$case: "certificateIdentities",
					certificateIdentities: exports.CertificateIdentities.fromJSON(object.certificateIdentities)
				} : isSet(object.publicKeys) ? {
					$case: "publicKeys",
					publicKeys: exports.PublicKeyIdentities.fromJSON(object.publicKeys)
				} : void 0,
				tlogOptions: isSet(object.tlogOptions) ? exports.ArtifactVerificationOptions_TlogOptions.fromJSON(object.tlogOptions) : void 0,
				ctlogOptions: isSet(object.ctlogOptions) ? exports.ArtifactVerificationOptions_CtlogOptions.fromJSON(object.ctlogOptions) : void 0,
				tsaOptions: isSet(object.tsaOptions) ? exports.ArtifactVerificationOptions_TimestampAuthorityOptions.fromJSON(object.tsaOptions) : void 0,
				integratedTsOptions: isSet(object.integratedTsOptions) ? exports.ArtifactVerificationOptions_TlogIntegratedTimestampOptions.fromJSON(object.integratedTsOptions) : void 0,
				observerOptions: isSet(object.observerOptions) ? exports.ArtifactVerificationOptions_ObserverTimestampOptions.fromJSON(object.observerOptions) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.signers?.$case === "certificateIdentities") obj.certificateIdentities = exports.CertificateIdentities.toJSON(message.signers.certificateIdentities);
			else if (message.signers?.$case === "publicKeys") obj.publicKeys = exports.PublicKeyIdentities.toJSON(message.signers.publicKeys);
			if (message.tlogOptions !== void 0) obj.tlogOptions = exports.ArtifactVerificationOptions_TlogOptions.toJSON(message.tlogOptions);
			if (message.ctlogOptions !== void 0) obj.ctlogOptions = exports.ArtifactVerificationOptions_CtlogOptions.toJSON(message.ctlogOptions);
			if (message.tsaOptions !== void 0) obj.tsaOptions = exports.ArtifactVerificationOptions_TimestampAuthorityOptions.toJSON(message.tsaOptions);
			if (message.integratedTsOptions !== void 0) obj.integratedTsOptions = exports.ArtifactVerificationOptions_TlogIntegratedTimestampOptions.toJSON(message.integratedTsOptions);
			if (message.observerOptions !== void 0) obj.observerOptions = exports.ArtifactVerificationOptions_ObserverTimestampOptions.toJSON(message.observerOptions);
			return obj;
		}
	};
	exports.ArtifactVerificationOptions_TlogOptions = {
		fromJSON(object) {
			return {
				threshold: isSet(object.threshold) ? globalThis.Number(object.threshold) : 0,
				performOnlineVerification: isSet(object.performOnlineVerification) ? globalThis.Boolean(object.performOnlineVerification) : false,
				disable: isSet(object.disable) ? globalThis.Boolean(object.disable) : false
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.threshold !== 0) obj.threshold = Math.round(message.threshold);
			if (message.performOnlineVerification !== false) obj.performOnlineVerification = message.performOnlineVerification;
			if (message.disable !== false) obj.disable = message.disable;
			return obj;
		}
	};
	exports.ArtifactVerificationOptions_CtlogOptions = {
		fromJSON(object) {
			return {
				threshold: isSet(object.threshold) ? globalThis.Number(object.threshold) : 0,
				disable: isSet(object.disable) ? globalThis.Boolean(object.disable) : false
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.threshold !== 0) obj.threshold = Math.round(message.threshold);
			if (message.disable !== false) obj.disable = message.disable;
			return obj;
		}
	};
	exports.ArtifactVerificationOptions_TimestampAuthorityOptions = {
		fromJSON(object) {
			return {
				threshold: isSet(object.threshold) ? globalThis.Number(object.threshold) : 0,
				disable: isSet(object.disable) ? globalThis.Boolean(object.disable) : false
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.threshold !== 0) obj.threshold = Math.round(message.threshold);
			if (message.disable !== false) obj.disable = message.disable;
			return obj;
		}
	};
	exports.ArtifactVerificationOptions_TlogIntegratedTimestampOptions = {
		fromJSON(object) {
			return {
				threshold: isSet(object.threshold) ? globalThis.Number(object.threshold) : 0,
				disable: isSet(object.disable) ? globalThis.Boolean(object.disable) : false
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.threshold !== 0) obj.threshold = Math.round(message.threshold);
			if (message.disable !== false) obj.disable = message.disable;
			return obj;
		}
	};
	exports.ArtifactVerificationOptions_ObserverTimestampOptions = {
		fromJSON(object) {
			return {
				threshold: isSet(object.threshold) ? globalThis.Number(object.threshold) : 0,
				disable: isSet(object.disable) ? globalThis.Boolean(object.disable) : false
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.threshold !== 0) obj.threshold = Math.round(message.threshold);
			if (message.disable !== false) obj.disable = message.disable;
			return obj;
		}
	};
	exports.Artifact = {
		fromJSON(object) {
			return { data: isSet(object.artifactUri) ? {
				$case: "artifactUri",
				artifactUri: globalThis.String(object.artifactUri)
			} : isSet(object.artifact) ? {
				$case: "artifact",
				artifact: Buffer.from(bytesFromBase64(object.artifact))
			} : isSet(object.artifactDigest) ? {
				$case: "artifactDigest",
				artifactDigest: sigstore_common_1.HashOutput.fromJSON(object.artifactDigest)
			} : void 0 };
		},
		toJSON(message) {
			const obj = {};
			if (message.data?.$case === "artifactUri") obj.artifactUri = message.data.artifactUri;
			else if (message.data?.$case === "artifact") obj.artifact = base64FromBytes(message.data.artifact);
			else if (message.data?.$case === "artifactDigest") obj.artifactDigest = sigstore_common_1.HashOutput.toJSON(message.data.artifactDigest);
			return obj;
		}
	};
	exports.Input = {
		fromJSON(object) {
			return {
				artifactTrustRoot: isSet(object.artifactTrustRoot) ? sigstore_trustroot_1.TrustedRoot.fromJSON(object.artifactTrustRoot) : void 0,
				artifactVerificationOptions: isSet(object.artifactVerificationOptions) ? exports.ArtifactVerificationOptions.fromJSON(object.artifactVerificationOptions) : void 0,
				bundle: isSet(object.bundle) ? sigstore_bundle_1.Bundle.fromJSON(object.bundle) : void 0,
				artifact: isSet(object.artifact) ? exports.Artifact.fromJSON(object.artifact) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.artifactTrustRoot !== void 0) obj.artifactTrustRoot = sigstore_trustroot_1.TrustedRoot.toJSON(message.artifactTrustRoot);
			if (message.artifactVerificationOptions !== void 0) obj.artifactVerificationOptions = exports.ArtifactVerificationOptions.toJSON(message.artifactVerificationOptions);
			if (message.bundle !== void 0) obj.bundle = sigstore_bundle_1.Bundle.toJSON(message.bundle);
			if (message.artifact !== void 0) obj.artifact = exports.Artifact.toJSON(message.artifact);
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_dist$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$2) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$2, p)) __createBinding(exports$2, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_envelope(), exports);
	__exportStar(require_sigstore_bundle(), exports);
	__exportStar(require_sigstore_common(), exports);
	__exportStar(require_sigstore_rekor(), exports);
	__exportStar(require_sigstore_trustroot(), exports);
	__exportStar(require_sigstore_verification(), exports);
}));
var require_bundle$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BUNDLE_V03_MEDIA_TYPE = exports.BUNDLE_V03_LEGACY_MEDIA_TYPE = exports.BUNDLE_V02_MEDIA_TYPE = exports.BUNDLE_V01_MEDIA_TYPE = void 0;
	exports.isBundleWithCertificateChain = isBundleWithCertificateChain;
	exports.isBundleWithPublicKey = isBundleWithPublicKey;
	exports.isBundleWithMessageSignature = isBundleWithMessageSignature;
	exports.isBundleWithDsseEnvelope = isBundleWithDsseEnvelope;
	exports.BUNDLE_V01_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.1";
	exports.BUNDLE_V02_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.2";
	exports.BUNDLE_V03_LEGACY_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle+json;version=0.3";
	exports.BUNDLE_V03_MEDIA_TYPE = "application/vnd.dev.sigstore.bundle.v0.3+json";
	function isBundleWithCertificateChain(b) {
		return b.verificationMaterial.content.$case === "x509CertificateChain";
	}
	function isBundleWithPublicKey(b) {
		return b.verificationMaterial.content.$case === "publicKey";
	}
	function isBundleWithMessageSignature(b) {
		return b.content.$case === "messageSignature";
	}
	function isBundleWithDsseEnvelope(b) {
		return b.content.$case === "dsseEnvelope";
	}
}));
var require_build = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toMessageSignatureBundle = toMessageSignatureBundle;
	exports.toDSSEBundle = toDSSEBundle;
	const protobuf_specs_1 = require_dist$3();
	const bundle_1 = require_bundle$1();
	function toMessageSignatureBundle(options) {
		return {
			mediaType: options.certificateChain ? bundle_1.BUNDLE_V02_MEDIA_TYPE : bundle_1.BUNDLE_V03_MEDIA_TYPE,
			content: {
				$case: "messageSignature",
				messageSignature: {
					messageDigest: {
						algorithm: protobuf_specs_1.HashAlgorithm.SHA2_256,
						digest: options.digest
					},
					signature: options.signature
				}
			},
			verificationMaterial: toVerificationMaterial(options)
		};
	}
	function toDSSEBundle(options) {
		return {
			mediaType: options.certificateChain ? bundle_1.BUNDLE_V02_MEDIA_TYPE : bundle_1.BUNDLE_V03_MEDIA_TYPE,
			content: {
				$case: "dsseEnvelope",
				dsseEnvelope: toEnvelope(options)
			},
			verificationMaterial: toVerificationMaterial(options)
		};
	}
	function toEnvelope(options) {
		return {
			payloadType: options.artifactType,
			payload: options.artifact,
			signatures: [toSignature(options)]
		};
	}
	function toSignature(options) {
		return {
			keyid: options.keyHint || "",
			sig: options.signature
		};
	}
	function toVerificationMaterial(options) {
		return {
			content: toKeyContent(options),
			tlogEntries: [],
			timestampVerificationData: { rfc3161Timestamps: [] }
		};
	}
	function toKeyContent(options) {
		if (options.certificate) if (options.certificateChain) return {
			$case: "x509CertificateChain",
			x509CertificateChain: { certificates: [{ rawBytes: options.certificate }] }
		};
		else return {
			$case: "certificate",
			certificate: { rawBytes: options.certificate }
		};
		else return {
			$case: "publicKey",
			publicKey: { hint: options.keyHint || "" }
		};
	}
}));
var require_error$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ValidationError = void 0;
	var ValidationError = class extends Error {
		fields;
		constructor(message, fields) {
			super(message);
			this.fields = fields;
		}
	};
	exports.ValidationError = ValidationError;
}));
var require_validate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.assertBundle = assertBundle;
	exports.assertBundleV01 = assertBundleV01;
	exports.isBundleV01 = isBundleV01;
	exports.assertBundleV02 = assertBundleV02;
	exports.assertBundleLatest = assertBundleLatest;
	const error_1 = require_error$3();
	function assertBundle(b) {
		const invalidValues = validateBundleBase(b);
		if (invalidValues.length > 0) throw new error_1.ValidationError("invalid bundle", invalidValues);
	}
	function assertBundleV01(b) {
		const invalidValues = [];
		invalidValues.push(...validateBundleBase(b));
		invalidValues.push(...validateInclusionPromise(b));
		if (invalidValues.length > 0) throw new error_1.ValidationError("invalid v0.1 bundle", invalidValues);
	}
	function isBundleV01(b) {
		try {
			assertBundleV01(b);
			return true;
		} catch (e) {
			return false;
		}
	}
	function assertBundleV02(b) {
		const invalidValues = [];
		invalidValues.push(...validateBundleBase(b));
		invalidValues.push(...validateInclusionProof(b));
		if (invalidValues.length > 0) throw new error_1.ValidationError("invalid v0.2 bundle", invalidValues);
	}
	function assertBundleLatest(b) {
		const invalidValues = [];
		invalidValues.push(...validateBundleBase(b));
		invalidValues.push(...validateInclusionProof(b));
		invalidValues.push(...validateNoCertificateChain(b));
		if (invalidValues.length > 0) throw new error_1.ValidationError("invalid bundle", invalidValues);
	}
	function validateBundleBase(b) {
		const invalidValues = [];
		if (b.mediaType === void 0 || !b.mediaType.match(/^application\/vnd\.dev\.sigstore\.bundle\+json;version=\d\.\d/) && !b.mediaType.match(/^application\/vnd\.dev\.sigstore\.bundle\.v\d\.\d\+json/)) invalidValues.push("mediaType");
		if (b.content === void 0) invalidValues.push("content");
		else switch (b.content.$case) {
			case "messageSignature":
				if (b.content.messageSignature.messageDigest === void 0) invalidValues.push("content.messageSignature.messageDigest");
				else if (b.content.messageSignature.messageDigest.digest.length === 0) invalidValues.push("content.messageSignature.messageDigest.digest");
				if (b.content.messageSignature.signature.length === 0) invalidValues.push("content.messageSignature.signature");
				break;
			case "dsseEnvelope":
				if (b.content.dsseEnvelope.payload.length === 0) invalidValues.push("content.dsseEnvelope.payload");
				if (b.content.dsseEnvelope.signatures.length !== 1) invalidValues.push("content.dsseEnvelope.signatures");
				else if (b.content.dsseEnvelope.signatures[0].sig.length === 0) invalidValues.push("content.dsseEnvelope.signatures[0].sig");
		}
		if (b.verificationMaterial === void 0) invalidValues.push("verificationMaterial");
		else {
			if (b.verificationMaterial.content === void 0) invalidValues.push("verificationMaterial.content");
			else switch (b.verificationMaterial.content.$case) {
				case "x509CertificateChain":
					if (b.verificationMaterial.content.x509CertificateChain.certificates.length === 0) invalidValues.push("verificationMaterial.content.x509CertificateChain.certificates");
					b.verificationMaterial.content.x509CertificateChain.certificates.forEach((cert, i) => {
						if (cert.rawBytes.length === 0) invalidValues.push(`verificationMaterial.content.x509CertificateChain.certificates[${i}].rawBytes`);
					});
					break;
				case "certificate": if (b.verificationMaterial.content.certificate.rawBytes.length === 0) invalidValues.push("verificationMaterial.content.certificate.rawBytes");
			}
			if (b.verificationMaterial.tlogEntries === void 0) invalidValues.push("verificationMaterial.tlogEntries");
			else if (b.verificationMaterial.tlogEntries.length > 0) b.verificationMaterial.tlogEntries.forEach((entry, i) => {
				if (entry.logId === void 0) invalidValues.push(`verificationMaterial.tlogEntries[${i}].logId`);
				if (entry.kindVersion === void 0) invalidValues.push(`verificationMaterial.tlogEntries[${i}].kindVersion`);
			});
		}
		return invalidValues;
	}
	function validateInclusionPromise(b) {
		const invalidValues = [];
		if (b.verificationMaterial && b.verificationMaterial.tlogEntries?.length > 0) b.verificationMaterial.tlogEntries.forEach((entry, i) => {
			if (entry.inclusionPromise === void 0) invalidValues.push(`verificationMaterial.tlogEntries[${i}].inclusionPromise`);
		});
		return invalidValues;
	}
	function validateInclusionProof(b) {
		const invalidValues = [];
		if (b.verificationMaterial && b.verificationMaterial.tlogEntries?.length > 0) b.verificationMaterial.tlogEntries.forEach((entry, i) => {
			if (entry.inclusionProof === void 0) invalidValues.push(`verificationMaterial.tlogEntries[${i}].inclusionProof`);
			else if (entry.inclusionProof.checkpoint === void 0) invalidValues.push(`verificationMaterial.tlogEntries[${i}].inclusionProof.checkpoint`);
		});
		return invalidValues;
	}
	function validateNoCertificateChain(b) {
		const invalidValues = [];
		/* istanbul ignore next */
		if (b.verificationMaterial?.content?.$case === "x509CertificateChain") invalidValues.push("verificationMaterial.content.$case");
		return invalidValues;
	}
}));
var require_serialized = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.envelopeToJSON = exports.envelopeFromJSON = exports.bundleToJSON = exports.bundleFromJSON = void 0;
	const protobuf_specs_1 = require_dist$3();
	const bundle_1 = require_bundle$1();
	const validate_1 = require_validate();
	const bundleFromJSON = (obj) => {
		const bundle = protobuf_specs_1.Bundle.fromJSON(obj);
		switch (bundle.mediaType) {
			case bundle_1.BUNDLE_V01_MEDIA_TYPE:
				(0, validate_1.assertBundleV01)(bundle);
				break;
			case bundle_1.BUNDLE_V02_MEDIA_TYPE:
				(0, validate_1.assertBundleV02)(bundle);
				break;
			default: (0, validate_1.assertBundleLatest)(bundle);
		}
		return bundle;
	};
	exports.bundleFromJSON = bundleFromJSON;
	const bundleToJSON = (bundle) => {
		return protobuf_specs_1.Bundle.toJSON(bundle);
	};
	exports.bundleToJSON = bundleToJSON;
	const envelopeFromJSON = (obj) => {
		return protobuf_specs_1.Envelope.fromJSON(obj);
	};
	exports.envelopeFromJSON = envelopeFromJSON;
	const envelopeToJSON = (envelope) => {
		return protobuf_specs_1.Envelope.toJSON(envelope);
	};
	exports.envelopeToJSON = envelopeToJSON;
}));
var require_dist$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isBundleV01 = exports.assertBundleV02 = exports.assertBundleV01 = exports.assertBundleLatest = exports.assertBundle = exports.envelopeToJSON = exports.envelopeFromJSON = exports.bundleToJSON = exports.bundleFromJSON = exports.ValidationError = exports.isBundleWithPublicKey = exports.isBundleWithMessageSignature = exports.isBundleWithDsseEnvelope = exports.isBundleWithCertificateChain = exports.BUNDLE_V03_MEDIA_TYPE = exports.BUNDLE_V03_LEGACY_MEDIA_TYPE = exports.BUNDLE_V02_MEDIA_TYPE = exports.BUNDLE_V01_MEDIA_TYPE = exports.toMessageSignatureBundle = exports.toDSSEBundle = void 0;
	var build_1 = require_build();
	Object.defineProperty(exports, "toDSSEBundle", {
		enumerable: true,
		get: function() {
			return build_1.toDSSEBundle;
		}
	});
	Object.defineProperty(exports, "toMessageSignatureBundle", {
		enumerable: true,
		get: function() {
			return build_1.toMessageSignatureBundle;
		}
	});
	var bundle_1 = require_bundle$1();
	Object.defineProperty(exports, "BUNDLE_V01_MEDIA_TYPE", {
		enumerable: true,
		get: function() {
			return bundle_1.BUNDLE_V01_MEDIA_TYPE;
		}
	});
	Object.defineProperty(exports, "BUNDLE_V02_MEDIA_TYPE", {
		enumerable: true,
		get: function() {
			return bundle_1.BUNDLE_V02_MEDIA_TYPE;
		}
	});
	Object.defineProperty(exports, "BUNDLE_V03_LEGACY_MEDIA_TYPE", {
		enumerable: true,
		get: function() {
			return bundle_1.BUNDLE_V03_LEGACY_MEDIA_TYPE;
		}
	});
	Object.defineProperty(exports, "BUNDLE_V03_MEDIA_TYPE", {
		enumerable: true,
		get: function() {
			return bundle_1.BUNDLE_V03_MEDIA_TYPE;
		}
	});
	Object.defineProperty(exports, "isBundleWithCertificateChain", {
		enumerable: true,
		get: function() {
			return bundle_1.isBundleWithCertificateChain;
		}
	});
	Object.defineProperty(exports, "isBundleWithDsseEnvelope", {
		enumerable: true,
		get: function() {
			return bundle_1.isBundleWithDsseEnvelope;
		}
	});
	Object.defineProperty(exports, "isBundleWithMessageSignature", {
		enumerable: true,
		get: function() {
			return bundle_1.isBundleWithMessageSignature;
		}
	});
	Object.defineProperty(exports, "isBundleWithPublicKey", {
		enumerable: true,
		get: function() {
			return bundle_1.isBundleWithPublicKey;
		}
	});
	var error_1 = require_error$3();
	Object.defineProperty(exports, "ValidationError", {
		enumerable: true,
		get: function() {
			return error_1.ValidationError;
		}
	});
	var serialized_1 = require_serialized();
	Object.defineProperty(exports, "bundleFromJSON", {
		enumerable: true,
		get: function() {
			return serialized_1.bundleFromJSON;
		}
	});
	Object.defineProperty(exports, "bundleToJSON", {
		enumerable: true,
		get: function() {
			return serialized_1.bundleToJSON;
		}
	});
	Object.defineProperty(exports, "envelopeFromJSON", {
		enumerable: true,
		get: function() {
			return serialized_1.envelopeFromJSON;
		}
	});
	Object.defineProperty(exports, "envelopeToJSON", {
		enumerable: true,
		get: function() {
			return serialized_1.envelopeToJSON;
		}
	});
	var validate_1 = require_validate();
	Object.defineProperty(exports, "assertBundle", {
		enumerable: true,
		get: function() {
			return validate_1.assertBundle;
		}
	});
	Object.defineProperty(exports, "assertBundleLatest", {
		enumerable: true,
		get: function() {
			return validate_1.assertBundleLatest;
		}
	});
	Object.defineProperty(exports, "assertBundleV01", {
		enumerable: true,
		get: function() {
			return validate_1.assertBundleV01;
		}
	});
	Object.defineProperty(exports, "assertBundleV02", {
		enumerable: true,
		get: function() {
			return validate_1.assertBundleV02;
		}
	});
	Object.defineProperty(exports, "isBundleV01", {
		enumerable: true,
		get: function() {
			return validate_1.isBundleV01;
		}
	});
}));
var require_stream = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ByteStream = void 0;
	var StreamError = class extends Error {};
	exports.ByteStream = class ByteStream {
		static BLOCK_SIZE = 1024;
		buf;
		view;
		start = 0;
		constructor(buffer) {
			if (buffer) {
				this.buf = buffer;
				this.view = Buffer.from(buffer);
			} else {
				this.buf = Buffer.alloc(0);
				this.view = Buffer.from(this.buf);
			}
		}
		get buffer() {
			return this.view.subarray(0, this.start);
		}
		get length() {
			return this.view.byteLength;
		}
		get position() {
			return this.start;
		}
		seek(position) {
			this.start = position;
		}
		slice(start, len) {
			const end = start + len;
			if (end > this.length) throw new StreamError("request past end of buffer");
			return this.view.subarray(start, end);
		}
		appendChar(char) {
			this.ensureCapacity(1);
			this.view[this.start] = char;
			this.start += 1;
		}
		appendUint16(num) {
			this.ensureCapacity(2);
			const value = new Uint16Array([num]);
			const view = new Uint8Array(value.buffer);
			this.view[this.start] = view[1];
			this.view[this.start + 1] = view[0];
			this.start += 2;
		}
		appendUint24(num) {
			this.ensureCapacity(3);
			const value = new Uint32Array([num]);
			const view = new Uint8Array(value.buffer);
			this.view[this.start] = view[2];
			this.view[this.start + 1] = view[1];
			this.view[this.start + 2] = view[0];
			this.start += 3;
		}
		appendView(view) {
			this.ensureCapacity(view.length);
			this.view.set(view, this.start);
			this.start += view.length;
		}
		getBlock(size) {
			if (size <= 0) return Buffer.alloc(0);
			if (this.start + size > this.view.length) throw new Error("request past end of buffer");
			const result = this.view.subarray(this.start, this.start + size);
			this.start += size;
			return result;
		}
		getUint8() {
			return this.getBlock(1)[0];
		}
		getUint16() {
			const block = this.getBlock(2);
			return block[0] << 8 | block[1];
		}
		ensureCapacity(size) {
			if (this.start + size > this.view.byteLength) {
				const blockSize = ByteStream.BLOCK_SIZE + (size > ByteStream.BLOCK_SIZE ? size : 0);
				this.realloc(this.view.byteLength + blockSize);
			}
		}
		realloc(size) {
			const newArray = Buffer.alloc(size);
			const newView = Buffer.from(newArray);
			newView.set(this.view);
			this.buf = newArray;
			this.view = newView;
		}
	};
}));
var require_error$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ASN1TypeError = exports.ASN1ParseError = void 0;
	var ASN1ParseError = class extends Error {};
	exports.ASN1ParseError = ASN1ParseError;
	var ASN1TypeError = class extends Error {};
	exports.ASN1TypeError = ASN1TypeError;
}));
var require_length = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeLength = decodeLength;
	exports.encodeLength = encodeLength;
	const error_1 = require_error$2();
	function decodeLength(stream) {
		const buf = stream.getUint8();
		if ((buf & 128) === 0) return buf;
		const byteCount = buf & 127;
		if (byteCount > 6) throw new error_1.ASN1ParseError("length exceeds 6 byte limit");
		let len = 0;
		for (let i = 0; i < byteCount; i++) {
			const byte = stream.getUint8();
			if (i === 0 && byte === 0) throw new error_1.ASN1ParseError("non-minimal length encoding");
			len = len * 256 + byte;
		}
		if (len === 0) throw new error_1.ASN1ParseError("indefinite length encoding not supported");
		if (len < 128) throw new error_1.ASN1ParseError("non-minimal length encoding");
		return len;
	}
	function encodeLength(len) {
		if (len < 128) return Buffer.from([len]);
		let val = BigInt(len);
		const bytes = [];
		while (val > 0n) {
			bytes.unshift(Number(val & 255n));
			val = val >> 8n;
		}
		return Buffer.from([128 | bytes.length, ...bytes]);
	}
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseInteger = parseInteger;
	exports.parseStringASCII = parseStringASCII;
	exports.parseTime = parseTime;
	exports.parseOID = parseOID;
	exports.parseBoolean = parseBoolean;
	exports.parseBitString = parseBitString;
	const error_1 = require_error$2();
	const RE_TIME_SHORT_YEAR = /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\.\d{3})?Z$/;
	const RE_TIME_LONG_YEAR = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\.\d{3})?Z$/;
	function parseInteger(buf) {
		let pos = 0;
		const end = buf.length;
		let val = buf[pos];
		const neg = val > 127;
		const pad = neg ? 255 : 0;
		while (val == pad && ++pos < end) val = buf[pos];
		if (end - pos === 0) return BigInt(neg ? -1 : 0);
		val = neg ? val - 256 : val;
		let n = BigInt(val);
		for (let i = pos + 1; i < end; ++i) n = n * BigInt(256) + BigInt(buf[i]);
		return n;
	}
	function parseStringASCII(buf) {
		return buf.toString("ascii");
	}
	function parseTime(buf, shortYear) {
		const timeStr = parseStringASCII(buf);
		const m = shortYear ? RE_TIME_SHORT_YEAR.exec(timeStr) : RE_TIME_LONG_YEAR.exec(timeStr);
		if (!m) throw new Error("invalid time");
		if (shortYear) {
			let year = Number(m[1]);
			year += year >= 50 ? 1900 : 2e3;
			m[1] = year.toString();
		}
		return /* @__PURE__ */ new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}Z`);
	}
	function parseOID(buf) {
		let pos = 0;
		const end = buf.length;
		let n = buf[pos++];
		let oid = `${Math.floor(n / 40)}.${n % 40}`;
		let val = 0n;
		for (; pos < end; ++pos) {
			n = buf[pos];
			val = (val << 7n) + BigInt(n & 127);
			if ((n & 128) === 0) {
				oid += `.${val}`;
				val = 0n;
			}
		}
		return oid;
	}
	function parseBoolean(buf) {
		if (buf.length !== 1) throw new error_1.ASN1ParseError("invalid boolean");
		switch (buf[0]) {
			case 0: return false;
			case 255: return true;
			default: throw new error_1.ASN1ParseError("invalid boolean");
		}
	}
	function parseBitString(buf) {
		const unused = buf[0];
		if (unused > 7) throw new error_1.ASN1ParseError("invalid bit string");
		const start = 1;
		const end = buf.length;
		const bits = [];
		for (let i = start; i < end; ++i) {
			const byte = buf[i];
			const skip = i === end - 1 ? unused : 0;
			for (let j = 7; j >= skip; --j) bits.push(byte >> j & 1);
		}
		return bits;
	}
}));
var require_tag = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ASN1Tag = void 0;
	const error_1 = require_error$2();
	const UNIVERSAL_TAG = {
		BOOLEAN: 1,
		INTEGER: 2,
		BIT_STRING: 3,
		OCTET_STRING: 4,
		OBJECT_IDENTIFIER: 6,
		SEQUENCE: 16,
		SET: 17,
		PRINTABLE_STRING: 19,
		UTC_TIME: 23,
		GENERALIZED_TIME: 24
	};
	const TAG_CLASS = {
		UNIVERSAL: 0,
		APPLICATION: 1,
		CONTEXT_SPECIFIC: 2,
		PRIVATE: 3
	};
	var ASN1Tag = class {
		number;
		constructed;
		class;
		constructor(enc) {
			this.number = enc & 31;
			this.constructed = (enc & 32) === 32;
			this.class = enc >> 6;
			if (this.number === 31) throw new error_1.ASN1ParseError("long form tags not supported");
			if (this.class === TAG_CLASS.UNIVERSAL && this.number === 0) throw new error_1.ASN1ParseError("unsupported tag 0x00");
		}
		isUniversal() {
			return this.class === TAG_CLASS.UNIVERSAL;
		}
		isContextSpecific(num) {
			const res = this.class === TAG_CLASS.CONTEXT_SPECIFIC;
			return num !== void 0 ? res && this.number === num : res;
		}
		isBoolean() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.BOOLEAN;
		}
		isInteger() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.INTEGER;
		}
		isBitString() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.BIT_STRING;
		}
		isOctetString() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.OCTET_STRING;
		}
		isOID() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.OBJECT_IDENTIFIER;
		}
		isUTCTime() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.UTC_TIME;
		}
		isGeneralizedTime() {
			return this.isUniversal() && this.number === UNIVERSAL_TAG.GENERALIZED_TIME;
		}
		toDER() {
			return this.number | (this.constructed ? 32 : 0) | this.class << 6;
		}
	};
	exports.ASN1Tag = ASN1Tag;
}));
var require_obj = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ASN1Obj = void 0;
	const stream_1 = require_stream();
	const error_1 = require_error$2();
	const length_1 = require_length();
	const parse_1 = require_parse();
	const tag_1 = require_tag();
	var ASN1Obj = class {
		tag;
		subs;
		value;
		constructor(tag, value, subs) {
			this.tag = tag;
			this.value = value;
			this.subs = subs;
		}
		static parseBuffer(buf) {
			const stream = new stream_1.ByteStream(buf);
			const obj = parseStream(stream);
			if (stream.position !== stream.length) throw new error_1.ASN1ParseError("invalid trailing data");
			return obj;
		}
		toDER() {
			const valueStream = new stream_1.ByteStream();
			if (this.subs.length > 0) for (const sub of this.subs) valueStream.appendView(sub.toDER());
			else valueStream.appendView(this.value);
			const value = valueStream.buffer;
			const obj = new stream_1.ByteStream();
			obj.appendChar(this.tag.toDER());
			obj.appendView((0, length_1.encodeLength)(value.length));
			obj.appendView(value);
			return obj.buffer;
		}
		toBoolean() {
			if (!this.tag.isBoolean()) throw new error_1.ASN1TypeError("not a boolean");
			return (0, parse_1.parseBoolean)(this.value);
		}
		toInteger() {
			if (!this.tag.isInteger()) throw new error_1.ASN1TypeError("not an integer");
			return (0, parse_1.parseInteger)(this.value);
		}
		toOID() {
			if (!this.tag.isOID()) throw new error_1.ASN1TypeError("not an OID");
			return (0, parse_1.parseOID)(this.value);
		}
		toDate() {
			switch (true) {
				case this.tag.isUTCTime(): return (0, parse_1.parseTime)(this.value, true);
				case this.tag.isGeneralizedTime(): return (0, parse_1.parseTime)(this.value, false);
				default: throw new error_1.ASN1TypeError("not a date");
			}
		}
		toBitString() {
			if (!this.tag.isBitString()) throw new error_1.ASN1TypeError("not a bit string");
			return (0, parse_1.parseBitString)(this.value);
		}
	};
	exports.ASN1Obj = ASN1Obj;
	const MAX_DEPTH = 100;
	function parseStream(stream, depth = 0) {
		if (depth > MAX_DEPTH) throw new error_1.ASN1ParseError("maximum nesting depth exceeded");
		const tag = new tag_1.ASN1Tag(stream.getUint8());
		const len = (0, length_1.decodeLength)(stream);
		const value = stream.slice(stream.position, len);
		const start = stream.position;
		let subs = [];
		if (tag.constructed) subs = collectSubs(stream, len, depth);
		else if (tag.isOctetString()) try {
			subs = collectSubs(stream, len, depth);
		} catch (e) {}
		if (subs.length === 0) stream.seek(start + len);
		return new ASN1Obj(tag, value, subs);
	}
	function collectSubs(stream, len, depth) {
		const end = stream.position + len;
		/* istanbul ignore if */
		if (end > stream.length) throw new error_1.ASN1ParseError("invalid length");
		const subs = [];
		while (stream.position < end) subs.push(parseStream(stream, depth + 1));
		if (stream.position !== end) throw new error_1.ASN1ParseError("invalid length");
		return subs;
	}
}));
var require_asn1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ASN1Obj = void 0;
	var obj_1 = require_obj();
	Object.defineProperty(exports, "ASN1Obj", {
		enumerable: true,
		get: function() {
			return obj_1.ASN1Obj;
		}
	});
}));
var require_crypto = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createPublicKey = createPublicKey;
	exports.digest = digest;
	exports.verify = verify;
	exports.bufferEqual = bufferEqual;
	const crypto_1 = __importDefault(__require("crypto"));
	function createPublicKey(key, type = "spki") {
		if (typeof key === "string") if (key.startsWith("-----")) return crypto_1.default.createPublicKey(key);
		else return crypto_1.default.createPublicKey({
			key: Buffer.from(key, "base64"),
			format: "der",
			type
		});
		else return crypto_1.default.createPublicKey({
			key,
			format: "der",
			type
		});
	}
	function digest(algorithm, ...data) {
		const hash = crypto_1.default.createHash(algorithm);
		for (const d of data) hash.update(d);
		return hash.digest();
	}
	function algorithmForKey(key) {
		if (!(key instanceof crypto_1.default.KeyObject) || key.type !== "public") return false;
		switch (key.asymmetricKeyType) {
			case "ec": switch (key.asymmetricKeyDetails?.namedCurve) {
				case "prime256v1": return "sha256";
				case "secp384r1": return "sha384";
				case "secp521r1": return "sha512";
				default: return false;
			}
			case "ed25519": return;
			default: return false;
		}
	}
	function verify(data, key, signature, algorithm) {
		try {
			if (algorithm === void 0) {
				algorithm = algorithmForKey(key);
				if (algorithm === false) return false;
			}
			return crypto_1.default.verify(algorithm, data, key, signature);
		} catch (e) {
			/* istanbul ignore next */
			return false;
		}
	}
	function bufferEqual(a, b) {
		try {
			return crypto_1.default.timingSafeEqual(a, b);
		} catch {
			/* istanbul ignore next */
			return false;
		}
	}
}));
var require_dsse$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.preAuthEncoding = preAuthEncoding;
	const PAE_PREFIX = "DSSEv1";
	function preAuthEncoding(payloadType, payload) {
		const typeBytes = Buffer.from(payloadType, "utf-8");
		return Buffer.concat([
			Buffer.from(`${PAE_PREFIX} ${typeBytes.length} `, "ascii"),
			typeBytes,
			Buffer.from(` ${payload.length} `, "ascii"),
			payload
		]);
	}
}));
var require_encoding = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.base64Encode = base64Encode;
	exports.base64Decode = base64Decode;
	const BASE64_ENCODING = "base64";
	const UTF8_ENCODING = "utf-8";
	function base64Encode(str) {
		return Buffer.from(str, UTF8_ENCODING).toString(BASE64_ENCODING);
	}
	function base64Decode(str) {
		return Buffer.from(str, BASE64_ENCODING).toString(UTF8_ENCODING);
	}
}));
var require_json = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.canonicalize = canonicalize;
	function canonicalize(object) {
		let buffer = "";
		if (object === null || typeof object !== "object" || object.toJSON != null) buffer += JSON.stringify(object);
		else if (Array.isArray(object)) {
			buffer += "[";
			let first = true;
			object.forEach((element) => {
				if (!first) buffer += ",";
				first = false;
				buffer += canonicalize(element);
			});
			buffer += "]";
		} else {
			buffer += "{";
			let first = true;
			Object.keys(object).sort().forEach((property) => {
				if (!first) buffer += ",";
				first = false;
				buffer += JSON.stringify(property);
				buffer += ":";
				buffer += canonicalize(object[property]);
			});
			buffer += "}";
		}
		return buffer;
	}
}));
var require_pem = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toDER = toDER;
	exports.fromDER = fromDER;
	const PEM_HEADER = /-----BEGIN (.*)-----/;
	const PEM_FOOTER = /-----END (.*)-----/;
	function toDER(certificate) {
		let der = "";
		certificate.split("\n").forEach((line) => {
			if (line.match(PEM_HEADER) || line.match(PEM_FOOTER)) return;
			der += line;
		});
		return Buffer.from(der, "base64");
	}
	function fromDER(certificate, type = "CERTIFICATE") {
		const lines = certificate.toString("base64").match(/.{1,64}/g) || "";
		return [
			`-----BEGIN ${type}-----`,
			...lines,
			`-----END ${type}-----`
		].join("\n").concat("\n");
	}
}));
var require_oid = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SHA2_HASH_ALGOS = exports.RSA_SIGNATURE_ALGOS = exports.ECDSA_SIGNATURE_ALGOS = void 0;
	exports.ECDSA_SIGNATURE_ALGOS = {
		"1.2.840.10045.4.3.1": "sha224",
		"1.2.840.10045.4.3.2": "sha256",
		"1.2.840.10045.4.3.3": "sha384",
		"1.2.840.10045.4.3.4": "sha512"
	};
	exports.RSA_SIGNATURE_ALGOS = {
		"1.2.840.113549.1.1.14": "sha224",
		"1.2.840.113549.1.1.11": "sha256",
		"1.2.840.113549.1.1.12": "sha384",
		"1.2.840.113549.1.1.13": "sha512"
	};
	exports.SHA2_HASH_ALGOS = {
		"2.16.840.1.101.3.4.2.1": "sha256",
		"2.16.840.1.101.3.4.2.2": "sha384",
		"2.16.840.1.101.3.4.2.3": "sha512"
	};
}));
var require_error$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RFC3161TimestampVerificationError = void 0;
	var RFC3161TimestampVerificationError = class extends Error {};
	exports.RFC3161TimestampVerificationError = RFC3161TimestampVerificationError;
}));
var require_tstinfo = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TSTInfo = void 0;
	const crypto = __importStar(require_crypto());
	const oid_1 = require_oid();
	const error_1 = require_error$1();
	var TSTInfo = class {
		root;
		constructor(asn1) {
			this.root = asn1;
		}
		get version() {
			return this.root.subs[0].toInteger();
		}
		get genTime() {
			return this.root.subs[4].toDate();
		}
		get messageImprintHashAlgorithm() {
			const oid = this.messageImprintObj.subs[0].subs[0].toOID();
			return oid_1.SHA2_HASH_ALGOS[oid];
		}
		get messageImprintHashedMessage() {
			return this.messageImprintObj.subs[1].value;
		}
		get raw() {
			return this.root.toDER();
		}
		verify(data) {
			const digest = crypto.digest(this.messageImprintHashAlgorithm, data);
			if (!crypto.bufferEqual(digest, this.messageImprintHashedMessage)) throw new error_1.RFC3161TimestampVerificationError("message imprint does not match artifact");
		}
		get messageImprintObj() {
			return this.root.subs[2];
		}
	};
	exports.TSTInfo = TSTInfo;
}));
var require_timestamp$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RFC3161Timestamp = void 0;
	const asn1_1 = require_asn1();
	const crypto = __importStar(require_crypto());
	const oid_1 = require_oid();
	const error_1 = require_error$1();
	const tstinfo_1 = require_tstinfo();
	const OID_PKCS9_CONTENT_TYPE_SIGNED_DATA = "1.2.840.113549.1.7.2";
	const OID_PKCS9_CONTENT_TYPE_TSTINFO = "1.2.840.113549.1.9.16.1.4";
	const OID_PKCS9_MESSAGE_DIGEST_KEY = "1.2.840.113549.1.9.4";
	exports.RFC3161Timestamp = class RFC3161Timestamp {
		root;
		constructor(asn1) {
			this.root = asn1;
		}
		static parse(der) {
			return new RFC3161Timestamp(asn1_1.ASN1Obj.parseBuffer(der));
		}
		get status() {
			return this.pkiStatusInfoObj.subs[0].toInteger();
		}
		get contentType() {
			return this.contentTypeObj.toOID();
		}
		get eContentType() {
			return this.eContentTypeObj.toOID();
		}
		get signingTime() {
			return this.tstInfo.genTime;
		}
		get signerIssuer() {
			return this.signerSidObj.subs[0].value;
		}
		get signerSerialNumber() {
			return this.signerSidObj.subs[1].value;
		}
		get signerDigestAlgorithm() {
			const oid = this.signerDigestAlgorithmObj.subs[0].toOID();
			return oid_1.SHA2_HASH_ALGOS[oid];
		}
		get signatureAlgorithm() {
			const oid = this.signatureAlgorithmObj.subs[0].toOID();
			return oid_1.ECDSA_SIGNATURE_ALGOS[oid];
		}
		get signatureValue() {
			return this.signatureValueObj.value;
		}
		get tstInfo() {
			return new tstinfo_1.TSTInfo(this.eContentObj.subs[0].subs[0]);
		}
		verify(data, publicKey) {
			if (!this.timeStampTokenObj) throw new error_1.RFC3161TimestampVerificationError("timeStampToken is missing");
			if (this.contentType !== OID_PKCS9_CONTENT_TYPE_SIGNED_DATA) throw new error_1.RFC3161TimestampVerificationError(`incorrect content type: ${this.contentType}`);
			if (this.eContentType !== OID_PKCS9_CONTENT_TYPE_TSTINFO) throw new error_1.RFC3161TimestampVerificationError(`incorrect encapsulated content type: ${this.eContentType}`);
			this.tstInfo.verify(data);
			this.verifyMessageDigest();
			this.verifySignature(publicKey);
		}
		verifyMessageDigest() {
			const tstInfoDigest = crypto.digest(this.signerDigestAlgorithm, this.tstInfo.raw);
			const expectedDigest = this.messageDigestAttributeObj.subs[1].subs[0].value;
			if (!crypto.bufferEqual(tstInfoDigest, expectedDigest)) throw new error_1.RFC3161TimestampVerificationError("signed data does not match tstInfo");
		}
		verifySignature(key) {
			const signedAttrs = this.signedAttrsObj.toDER();
			signedAttrs[0] = 49;
			if (!crypto.verify(signedAttrs, key, this.signatureValue, this.signatureAlgorithm)) throw new error_1.RFC3161TimestampVerificationError("signature verification failed");
		}
		get pkiStatusInfoObj() {
			return this.root.subs[0];
		}
		get timeStampTokenObj() {
			return this.root.subs[1];
		}
		get contentTypeObj() {
			return this.timeStampTokenObj.subs[0];
		}
		get signedDataObj() {
			return this.timeStampTokenObj.subs.find((sub) => sub.tag.isContextSpecific(0)).subs[0];
		}
		get encapContentInfoObj() {
			return this.signedDataObj.subs[2];
		}
		get signerInfosObj() {
			const sd = this.signedDataObj;
			return sd.subs[sd.subs.length - 1];
		}
		get signerInfoObj() {
			return this.signerInfosObj.subs[0];
		}
		get eContentTypeObj() {
			return this.encapContentInfoObj.subs[0];
		}
		get eContentObj() {
			return this.encapContentInfoObj.subs[1];
		}
		get signedAttrsObj() {
			return this.signerInfoObj.subs.find((sub) => sub.tag.isContextSpecific(0));
		}
		get messageDigestAttributeObj() {
			return this.signedAttrsObj.subs.find((sub) => sub.subs[0].tag.isOID() && sub.subs[0].toOID() === OID_PKCS9_MESSAGE_DIGEST_KEY);
		}
		get signerSidObj() {
			return this.signerInfoObj.subs[1];
		}
		get signerDigestAlgorithmObj() {
			return this.signerInfoObj.subs[2];
		}
		get signatureAlgorithmObj() {
			return this.signerInfoObj.subs[4];
		}
		get signatureValueObj() {
			return this.signerInfoObj.subs[5];
		}
	};
}));
var require_rfc3161 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RFC3161Timestamp = void 0;
	var timestamp_1 = require_timestamp$1();
	Object.defineProperty(exports, "RFC3161Timestamp", {
		enumerable: true,
		get: function() {
			return timestamp_1.RFC3161Timestamp;
		}
	});
}));
var require_sct$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SignedCertificateTimestamp = void 0;
	const crypto = __importStar(require_crypto());
	const stream_1 = require_stream();
	exports.SignedCertificateTimestamp = class SignedCertificateTimestamp {
		version;
		logID;
		timestamp;
		extensions;
		hashAlgorithm;
		signatureAlgorithm;
		signature;
		constructor(options) {
			this.version = options.version;
			this.logID = options.logID;
			this.timestamp = options.timestamp;
			this.extensions = options.extensions;
			this.hashAlgorithm = options.hashAlgorithm;
			this.signatureAlgorithm = options.signatureAlgorithm;
			this.signature = options.signature;
		}
		get datetime() {
			return new Date(Number(this.timestamp.readBigInt64BE()));
		}
		get algorithm() {
			switch (this.hashAlgorithm) {
				case 0: return "none";
				case 1: return "md5";
				case 2: return "sha1";
				case 3: return "sha224";
				case 4: return "sha256";
				case 5: return "sha384";
				case 6: return "sha512";
				default: return "unknown";
			}
		}
		verify(preCert, key) {
			const stream = new stream_1.ByteStream();
			stream.appendChar(this.version);
			stream.appendChar(0);
			stream.appendView(this.timestamp);
			stream.appendUint16(1);
			stream.appendView(preCert);
			stream.appendUint16(this.extensions.byteLength);
			/* istanbul ignore next - extensions are very uncommon */
			if (this.extensions.byteLength > 0) stream.appendView(this.extensions);
			return crypto.verify(stream.buffer, key, this.signature, this.algorithm);
		}
		static parse(buf) {
			const stream = new stream_1.ByteStream(buf);
			const version = stream.getUint8();
			const logID = stream.getBlock(32);
			const timestamp = stream.getBlock(8);
			const extenstionLength = stream.getUint16();
			const extensions = stream.getBlock(extenstionLength);
			const hashAlgorithm = stream.getUint8();
			const signatureAlgorithm = stream.getUint8();
			const sigLength = stream.getUint16();
			const signature = stream.getBlock(sigLength);
			if (stream.position !== buf.length) throw new Error("SCT buffer length mismatch");
			return new SignedCertificateTimestamp({
				version,
				logID,
				timestamp,
				extensions,
				hashAlgorithm,
				signatureAlgorithm,
				signature
			});
		}
	};
}));
var require_ext = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.X509SCTExtension = exports.X509SubjectKeyIDExtension = exports.X509AuthorityKeyIDExtension = exports.X509SubjectAlternativeNameExtension = exports.X509KeyUsageExtension = exports.X509BasicConstraintsExtension = exports.X509Extension = void 0;
	const stream_1 = require_stream();
	const sct_1 = require_sct$1();
	var X509Extension = class {
		root;
		constructor(asn1) {
			this.root = asn1;
		}
		get oid() {
			return this.root.subs[0].toOID();
		}
		get critical() {
			return this.root.subs.length === 3 ? this.root.subs[1].toBoolean() : false;
		}
		get value() {
			return this.extnValueObj.value;
		}
		get valueObj() {
			return this.extnValueObj;
		}
		get extnValueObj() {
			return this.root.subs[this.root.subs.length - 1];
		}
	};
	exports.X509Extension = X509Extension;
	var X509BasicConstraintsExtension = class extends X509Extension {
		get isCA() {
			return this.sequence.subs[0]?.toBoolean() ?? false;
		}
		get pathLenConstraint() {
			return this.sequence.subs.length > 1 ? this.sequence.subs[1].toInteger() : void 0;
		}
		get sequence() {
			return this.extnValueObj.subs[0];
		}
	};
	exports.X509BasicConstraintsExtension = X509BasicConstraintsExtension;
	var X509KeyUsageExtension = class extends X509Extension {
		get digitalSignature() {
			return this.bitString[0] === 1;
		}
		get keyCertSign() {
			return this.bitString[5] === 1;
		}
		get crlSign() {
			return this.bitString[6] === 1;
		}
		get bitString() {
			return this.extnValueObj.subs[0].toBitString();
		}
	};
	exports.X509KeyUsageExtension = X509KeyUsageExtension;
	var X509SubjectAlternativeNameExtension = class extends X509Extension {
		get rfc822Name() {
			return this.findGeneralName(1)?.value.toString("ascii");
		}
		get uri() {
			return this.findGeneralName(6)?.value.toString("ascii");
		}
		otherName(oid) {
			const otherName = this.findGeneralName(0);
			if (otherName === void 0) return;
			if (otherName.subs[0].toOID() !== oid) return;
			return otherName.subs[1].subs[0].value.toString("ascii");
		}
		findGeneralName(tag) {
			return this.generalNames.find((gn) => gn.tag.isContextSpecific(tag));
		}
		get generalNames() {
			return this.extnValueObj.subs[0].subs;
		}
	};
	exports.X509SubjectAlternativeNameExtension = X509SubjectAlternativeNameExtension;
	var X509AuthorityKeyIDExtension = class extends X509Extension {
		get keyIdentifier() {
			return this.findSequenceMember(0)?.value;
		}
		findSequenceMember(tag) {
			return this.sequence.subs.find((el) => el.tag.isContextSpecific(tag));
		}
		get sequence() {
			return this.extnValueObj.subs[0];
		}
	};
	exports.X509AuthorityKeyIDExtension = X509AuthorityKeyIDExtension;
	var X509SubjectKeyIDExtension = class extends X509Extension {
		get keyIdentifier() {
			return this.extnValueObj.subs[0].value;
		}
	};
	exports.X509SubjectKeyIDExtension = X509SubjectKeyIDExtension;
	var X509SCTExtension = class extends X509Extension {
		constructor(asn1) {
			super(asn1);
		}
		get signedCertificateTimestamps() {
			const buf = this.extnValueObj.subs[0].value;
			const stream = new stream_1.ByteStream(buf);
			const end = stream.getUint16() + 2;
			const sctList = [];
			while (stream.position < end) {
				const sctLength = stream.getUint16();
				const sct = stream.getBlock(sctLength);
				sctList.push(sct_1.SignedCertificateTimestamp.parse(sct));
			}
			if (stream.position !== end) throw new Error("SCT list length does not match actual length");
			return sctList;
		}
	};
	exports.X509SCTExtension = X509SCTExtension;
}));
var require_cert = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.X509Certificate = exports.EXTENSION_OID_SCT = void 0;
	const asn1_1 = require_asn1();
	const crypto = __importStar(require_crypto());
	const oid_1 = require_oid();
	const pem = __importStar(require_pem());
	const ext_1 = require_ext();
	const EXTENSION_OID_SUBJECT_KEY_ID = "2.5.29.14";
	const EXTENSION_OID_KEY_USAGE = "2.5.29.15";
	const EXTENSION_OID_SUBJECT_ALT_NAME = "2.5.29.17";
	const EXTENSION_OID_BASIC_CONSTRAINTS = "2.5.29.19";
	const EXTENSION_OID_AUTHORITY_KEY_ID = "2.5.29.35";
	exports.EXTENSION_OID_SCT = "1.3.6.1.4.1.11129.2.4.2";
	exports.X509Certificate = class X509Certificate {
		root;
		constructor(asn1) {
			this.root = asn1;
		}
		static parse(cert) {
			const der = typeof cert === "string" ? pem.toDER(cert) : cert;
			return new X509Certificate(asn1_1.ASN1Obj.parseBuffer(der));
		}
		get tbsCertificate() {
			return this.tbsCertificateObj;
		}
		get version() {
			return `v${(this.versionObj.subs[0].toInteger() + BigInt(1)).toString()}`;
		}
		get serialNumber() {
			return this.serialNumberObj.value;
		}
		get notBefore() {
			return this.validityObj.subs[0].toDate();
		}
		get notAfter() {
			return this.validityObj.subs[1].toDate();
		}
		get issuer() {
			return this.issuerObj.value;
		}
		get subject() {
			return this.subjectObj.value;
		}
		get publicKey() {
			return this.subjectPublicKeyInfoObj.toDER();
		}
		get signatureAlgorithm() {
			const oid = this.signatureAlgorithmObj.subs[0].toOID();
			if (oid_1.RSA_SIGNATURE_ALGOS[oid]) return oid_1.RSA_SIGNATURE_ALGOS[oid];
			return oid_1.ECDSA_SIGNATURE_ALGOS[oid];
		}
		get signatureValue() {
			return this.signatureValueObj.value.subarray(1);
		}
		get subjectAltName() {
			const ext = this.extSubjectAltName;
			return ext?.uri || ext?.rfc822Name;
		}
		get extensions() {
			/* istanbul ignore next */
			return (this.extensionsObj?.subs[0])?.subs || [];
		}
		get extKeyUsage() {
			const ext = this.findExtension(EXTENSION_OID_KEY_USAGE);
			return ext ? new ext_1.X509KeyUsageExtension(ext) : void 0;
		}
		get extBasicConstraints() {
			const ext = this.findExtension(EXTENSION_OID_BASIC_CONSTRAINTS);
			return ext ? new ext_1.X509BasicConstraintsExtension(ext) : void 0;
		}
		get extSubjectAltName() {
			const ext = this.findExtension(EXTENSION_OID_SUBJECT_ALT_NAME);
			return ext ? new ext_1.X509SubjectAlternativeNameExtension(ext) : void 0;
		}
		get extAuthorityKeyID() {
			const ext = this.findExtension(EXTENSION_OID_AUTHORITY_KEY_ID);
			return ext ? new ext_1.X509AuthorityKeyIDExtension(ext) : void 0;
		}
		get extSubjectKeyID() {
			const ext = this.findExtension(EXTENSION_OID_SUBJECT_KEY_ID);
			return ext ? new ext_1.X509SubjectKeyIDExtension(ext) : void 0;
		}
		get extSCT() {
			const ext = this.findExtension(exports.EXTENSION_OID_SCT);
			return ext ? new ext_1.X509SCTExtension(ext) : void 0;
		}
		get isCA() {
			const ca = this.extBasicConstraints?.isCA || false;
			/* istanbul ignore else */
			if (this.extKeyUsage) return ca && this.extKeyUsage.keyCertSign;
			/* istanbul ignore next */
			return ca;
		}
		extension(oid) {
			const ext = this.findExtension(oid);
			return ext ? new ext_1.X509Extension(ext) : void 0;
		}
		verify(issuerCertificate) {
			const publicKey = issuerCertificate?.publicKey || this.publicKey;
			const key = crypto.createPublicKey(publicKey);
			return crypto.verify(this.tbsCertificate.toDER(), key, this.signatureValue, this.signatureAlgorithm);
		}
		validForDate(date) {
			return this.notBefore <= date && date <= this.notAfter;
		}
		equals(other) {
			return this.root.toDER().equals(other.root.toDER());
		}
		clone() {
			const der = this.root.toDER();
			const clone = Buffer.alloc(der.length);
			der.copy(clone);
			return X509Certificate.parse(clone);
		}
		findExtension(oid) {
			return this.extensions.find((ext) => ext.subs[0].toOID() === oid);
		}
		get tbsCertificateObj() {
			return this.root.subs[0];
		}
		get signatureAlgorithmObj() {
			return this.root.subs[1];
		}
		get signatureValueObj() {
			return this.root.subs[2];
		}
		get versionObj() {
			return this.tbsCertificateObj.subs[0];
		}
		get serialNumberObj() {
			return this.tbsCertificateObj.subs[1];
		}
		get issuerObj() {
			return this.tbsCertificateObj.subs[3];
		}
		get validityObj() {
			return this.tbsCertificateObj.subs[4];
		}
		get subjectObj() {
			return this.tbsCertificateObj.subs[5];
		}
		get subjectPublicKeyInfoObj() {
			return this.tbsCertificateObj.subs[6];
		}
		get extensionsObj() {
			return this.tbsCertificateObj.subs.find((sub) => sub.tag.isContextSpecific(3));
		}
	};
}));
var require_x509 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.X509SCTExtension = exports.X509Certificate = exports.EXTENSION_OID_SCT = void 0;
	var cert_1 = require_cert();
	Object.defineProperty(exports, "EXTENSION_OID_SCT", {
		enumerable: true,
		get: function() {
			return cert_1.EXTENSION_OID_SCT;
		}
	});
	Object.defineProperty(exports, "X509Certificate", {
		enumerable: true,
		get: function() {
			return cert_1.X509Certificate;
		}
	});
	var ext_1 = require_ext();
	Object.defineProperty(exports, "X509SCTExtension", {
		enumerable: true,
		get: function() {
			return ext_1.X509SCTExtension;
		}
	});
}));
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.X509SCTExtension = exports.X509Certificate = exports.EXTENSION_OID_SCT = exports.ByteStream = exports.RFC3161Timestamp = exports.pem = exports.json = exports.encoding = exports.dsse = exports.crypto = exports.ASN1Obj = void 0;
	var asn1_1 = require_asn1();
	Object.defineProperty(exports, "ASN1Obj", {
		enumerable: true,
		get: function() {
			return asn1_1.ASN1Obj;
		}
	});
	exports.crypto = __importStar(require_crypto());
	exports.dsse = __importStar(require_dsse$3());
	exports.encoding = __importStar(require_encoding());
	exports.json = __importStar(require_json());
	exports.pem = __importStar(require_pem());
	var rfc3161_1 = require_rfc3161();
	Object.defineProperty(exports, "RFC3161Timestamp", {
		enumerable: true,
		get: function() {
			return rfc3161_1.RFC3161Timestamp;
		}
	});
	var stream_1 = require_stream();
	Object.defineProperty(exports, "ByteStream", {
		enumerable: true,
		get: function() {
			return stream_1.ByteStream;
		}
	});
	var x509_1 = require_x509();
	Object.defineProperty(exports, "EXTENSION_OID_SCT", {
		enumerable: true,
		get: function() {
			return x509_1.EXTENSION_OID_SCT;
		}
	});
	Object.defineProperty(exports, "X509Certificate", {
		enumerable: true,
		get: function() {
			return x509_1.X509Certificate;
		}
	});
	Object.defineProperty(exports, "X509SCTExtension", {
		enumerable: true,
		get: function() {
			return x509_1.X509SCTExtension;
		}
	});
}));
var require_dsse$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DSSESignatureContent = void 0;
	const core_1 = require_dist$1();
	var DSSESignatureContent = class {
		env;
		constructor(env) {
			this.env = env;
		}
		compareDigest(digest) {
			return core_1.crypto.bufferEqual(digest, core_1.crypto.digest("sha256", this.env.payload));
		}
		compareSignedDigest(digest) {
			return core_1.crypto.bufferEqual(digest, core_1.crypto.digest("sha256", this.preAuthEncoding));
		}
		compareSignature(signature) {
			return core_1.crypto.bufferEqual(signature, this.signature);
		}
		verifySignature(key) {
			return core_1.crypto.verify(this.preAuthEncoding, key, this.signature);
		}
		get signature() {
			return this.env.signatures.length > 0 ? this.env.signatures[0].sig : Buffer.from("");
		}
		get preAuthEncoding() {
			return core_1.dsse.preAuthEncoding(this.env.payloadType, this.env.payload);
		}
	};
	exports.DSSESignatureContent = DSSESignatureContent;
}));
var require_message = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageSignatureContent = void 0;
	const core_1 = require_dist$1();
	const protobuf_specs_1 = require_dist$3();
	const HASH_ALGORITHM_MAP = {
		[protobuf_specs_1.HashAlgorithm.HASH_ALGORITHM_UNSPECIFIED]: "sha256",
		[protobuf_specs_1.HashAlgorithm.SHA2_256]: "sha256",
		[protobuf_specs_1.HashAlgorithm.SHA2_384]: "sha384",
		[protobuf_specs_1.HashAlgorithm.SHA2_512]: "sha512",
		[protobuf_specs_1.HashAlgorithm.SHA3_256]: "sha3-256",
		[protobuf_specs_1.HashAlgorithm.SHA3_384]: "sha3-384"
	};
	var MessageSignatureContent = class {
		signature;
		messageDigest;
		artifact;
		hashAlgorithm;
		constructor(messageSignature, artifact) {
			this.signature = messageSignature.signature;
			this.messageDigest = messageSignature.messageDigest.digest;
			this.artifact = artifact;
			this.hashAlgorithm = HASH_ALGORITHM_MAP[messageSignature.messageDigest.algorithm] ?? "sha256";
		}
		compareSignature(signature) {
			return core_1.crypto.bufferEqual(signature, this.signature);
		}
		compareDigest(digest) {
			return core_1.crypto.bufferEqual(digest, this.messageDigest);
		}
		compareSignedDigest(digest) {
			return this.compareDigest(digest);
		}
		verifySignature(key) {
			return core_1.crypto.verify(this.artifact, key, this.signature, this.hashAlgorithm);
		}
	};
	exports.MessageSignatureContent = MessageSignatureContent;
}));
var require_bundle = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toSignedEntity = toSignedEntity;
	exports.signatureContent = signatureContent;
	const core_1 = require_dist$1();
	const dsse_1 = require_dsse$2();
	const message_1 = require_message();
	function toSignedEntity(bundle, artifact) {
		const { tlogEntries, timestampVerificationData } = bundle.verificationMaterial;
		const timestamps = [];
		for (const entry of tlogEntries) if (entry.integratedTime && entry.integratedTime !== "0") timestamps.push({
			$case: "transparency-log",
			tlogEntry: entry
		});
		for (const ts of timestampVerificationData?.rfc3161Timestamps ?? []) timestamps.push({
			$case: "timestamp-authority",
			timestamp: core_1.RFC3161Timestamp.parse(Buffer.from(ts.signedTimestamp))
		});
		return {
			signature: signatureContent(bundle, artifact),
			key: key(bundle),
			tlogEntries,
			timestamps
		};
	}
	function signatureContent(bundle, artifact) {
		switch (bundle.content.$case) {
			case "dsseEnvelope": return new dsse_1.DSSESignatureContent(bundle.content.dsseEnvelope);
			case "messageSignature": return new message_1.MessageSignatureContent(bundle.content.messageSignature, artifact);
		}
	}
	function key(bundle) {
		switch (bundle.verificationMaterial.content.$case) {
			case "publicKey": return {
				$case: "public-key",
				hint: bundle.verificationMaterial.content.publicKey.hint
			};
			case "x509CertificateChain": return {
				$case: "certificate",
				certificate: core_1.X509Certificate.parse(Buffer.from(bundle.verificationMaterial.content.x509CertificateChain.certificates[0].rawBytes))
			};
			case "certificate": return {
				$case: "certificate",
				certificate: core_1.X509Certificate.parse(Buffer.from(bundle.verificationMaterial.content.certificate.rawBytes))
			};
		}
	}
}));
var require_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PolicyError = exports.VerificationError = void 0;
	var BaseError = class extends Error {
		code;
		cause;
		constructor({ code, message, cause }) {
			super(message);
			this.code = code;
			this.cause = cause;
			this.name = this.constructor.name;
		}
	};
	var VerificationError = class extends BaseError {};
	exports.VerificationError = VerificationError;
	var PolicyError = class extends BaseError {};
	exports.PolicyError = PolicyError;
}));
var require_filter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.filterCertAuthorities = filterCertAuthorities;
	exports.filterTLogAuthorities = filterTLogAuthorities;
	function filterCertAuthorities(certAuthorities, timestamp) {
		return certAuthorities.filter((ca) => {
			return ca.validFor.start <= timestamp && ca.validFor.end >= timestamp;
		});
	}
	function filterTLogAuthorities(tlogAuthorities, criteria) {
		return tlogAuthorities.filter((tlog) => {
			if (criteria.logID && !tlog.logID.equals(criteria.logID)) return false;
			return tlog.validFor.start <= criteria.targetDate && criteria.targetDate <= tlog.validFor.end;
		});
	}
}));
var require_trust = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.filterTLogAuthorities = exports.filterCertAuthorities = void 0;
	exports.toTrustMaterial = toTrustMaterial;
	const core_1 = require_dist$1();
	const protobuf_specs_1 = require_dist$3();
	const error_1 = require_error();
	const BEGINNING_OF_TIME = /* @__PURE__ */ new Date(0);
	const END_OF_TIME = /* @__PURE__ */ new Date(864e13);
	var filter_1 = require_filter();
	Object.defineProperty(exports, "filterCertAuthorities", {
		enumerable: true,
		get: function() {
			return filter_1.filterCertAuthorities;
		}
	});
	Object.defineProperty(exports, "filterTLogAuthorities", {
		enumerable: true,
		get: function() {
			return filter_1.filterTLogAuthorities;
		}
	});
	function toTrustMaterial(root, keys) {
		const keyFinder = typeof keys === "function" ? keys : keyLocator(keys);
		return {
			certificateAuthorities: root.certificateAuthorities.map(createCertAuthority),
			timestampAuthorities: root.timestampAuthorities.map(createCertAuthority),
			tlogs: root.tlogs.map(createTLogAuthority),
			ctlogs: root.ctlogs.map(createTLogAuthority),
			publicKey: keyFinder
		};
	}
	function createTLogAuthority(tlogInstance) {
		const keyDetails = tlogInstance.publicKey.keyDetails;
		const keyType = keyDetails === protobuf_specs_1.PublicKeyDetails.PKCS1_RSA_PKCS1V5 || keyDetails === protobuf_specs_1.PublicKeyDetails.PKIX_RSA_PKCS1V5 || keyDetails === protobuf_specs_1.PublicKeyDetails.PKIX_RSA_PKCS1V15_2048_SHA256 || keyDetails === protobuf_specs_1.PublicKeyDetails.PKIX_RSA_PKCS1V15_3072_SHA256 || keyDetails === protobuf_specs_1.PublicKeyDetails.PKIX_RSA_PKCS1V15_4096_SHA256 ? "pkcs1" : "spki";
		/* istanbul ignore next */
		return {
			baseURL: tlogInstance.baseUrl,
			logID: tlogInstance.checkpointKeyId ? tlogInstance.checkpointKeyId.keyId : tlogInstance.logId.keyId,
			publicKey: core_1.crypto.createPublicKey(tlogInstance.publicKey.rawBytes, keyType),
			validFor: {
				start: tlogInstance.publicKey.validFor?.start || BEGINNING_OF_TIME,
				end: tlogInstance.publicKey.validFor?.end || END_OF_TIME
			}
		};
	}
	function createCertAuthority(ca) {
		/* istanbul ignore next */
		return {
			certChain: ca.certChain.certificates.map((cert) => {
				return core_1.X509Certificate.parse(Buffer.from(cert.rawBytes));
			}),
			validFor: {
				start: ca.validFor?.start || BEGINNING_OF_TIME,
				end: ca.validFor?.end || END_OF_TIME
			}
		};
	}
	function keyLocator(keys) {
		return (hint) => {
			const key = (keys || {})[hint];
			if (!key) throw new error_1.VerificationError({
				code: "PUBLIC_KEY_ERROR",
				message: `key not found: ${hint}`
			});
			return {
				publicKey: core_1.crypto.createPublicKey(key.rawBytes),
				validFor: (date) => {
					/* istanbul ignore next */
					return (key.validFor?.start || BEGINNING_OF_TIME) <= date && (key.validFor?.end || END_OF_TIME) >= date;
				}
			};
		};
	}
}));
var require_certificate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CertificateChainVerifier = void 0;
	exports.verifyCertificateChain = verifyCertificateChain;
	const error_1 = require_error();
	const trust_1 = require_trust();
	function verifyCertificateChain(timestamp, leaf, certificateAuthorities) {
		const cas = (0, trust_1.filterCertAuthorities)(certificateAuthorities, timestamp);
		let error;
		for (const ca of cas) try {
			return new CertificateChainVerifier({
				trustedCerts: ca.certChain,
				untrustedCert: leaf,
				timestamp
			}).verify();
		} catch (err) {
			error = err;
		}
		throw new error_1.VerificationError({
			code: "CERTIFICATE_ERROR",
			message: "Failed to verify certificate chain",
			cause: error
		});
	}
	var CertificateChainVerifier = class {
		untrustedCert;
		trustedCerts;
		localCerts;
		timestamp;
		constructor(opts) {
			this.untrustedCert = opts.untrustedCert;
			this.trustedCerts = opts.trustedCerts;
			this.localCerts = dedupeCertificates([...opts.trustedCerts, opts.untrustedCert]);
			this.timestamp = opts.timestamp;
		}
		verify() {
			const certificatePath = this.sort();
			this.checkPath(certificatePath);
			if (!certificatePath.every((cert) => cert.validForDate(this.timestamp))) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "certificate is not valid or expired at the specified date"
			});
			return certificatePath;
		}
		sort() {
			const leafCert = this.untrustedCert;
			let paths = this.buildPaths(leafCert);
			paths = paths.filter((path) => path.some((cert) => this.trustedCerts.includes(cert)));
			if (paths.length === 0) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "no trusted certificate path found"
			});
			return [leafCert, ...paths.reduce((prev, curr) => prev.length < curr.length ? prev : curr)].slice(0, -1);
		}
		buildPaths(certificate) {
			const paths = [];
			const issuers = this.findIssuer(certificate);
			if (issuers.length === 0) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "no valid certificate path found"
			});
			for (let i = 0; i < issuers.length; i++) {
				const issuer = issuers[i];
				if (issuer.equals(certificate)) {
					paths.push([certificate]);
					continue;
				}
				const subPaths = this.buildPaths(issuer);
				for (let j = 0; j < subPaths.length; j++) paths.push([issuer, ...subPaths[j]]);
			}
			return paths;
		}
		findIssuer(certificate) {
			let issuers = [];
			let keyIdentifier;
			if (certificate.subject.equals(certificate.issuer)) {
				if (certificate.verify()) return [certificate];
			}
			if (certificate.extAuthorityKeyID) keyIdentifier = certificate.extAuthorityKeyID.keyIdentifier;
			this.localCerts.forEach((possibleIssuer) => {
				if (keyIdentifier) {
					/* istanbul ignore else */
					if (possibleIssuer.extSubjectKeyID) {
						if (possibleIssuer.extSubjectKeyID.keyIdentifier.equals(keyIdentifier)) issuers.push(possibleIssuer);
						return;
					}
				}
				if (possibleIssuer.subject.equals(certificate.issuer)) issuers.push(possibleIssuer);
			});
			issuers = issuers.filter((issuer) => {
				try {
					return certificate.verify(issuer);
				} catch (ex) {
					/* istanbul ignore next - should never error */
					return false;
				}
			});
			return issuers;
		}
		checkPath(path) {
			/* istanbul ignore if */
			if (path.length < 1) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "certificate chain must contain at least one certificate"
			});
			if (!path.slice(1).every((cert) => cert.isCA)) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "intermediate certificate is not a CA"
			});
			for (let i = path.length - 2; i >= 0; i--)
 /* istanbul ignore if */
			if (!path[i].issuer.equals(path[i + 1].subject)) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "incorrect certificate name chaining"
			});
			for (let i = 0; i < path.length; i++) {
				const cert = path[i];
				if (cert.extBasicConstraints?.isCA) {
					const pathLength = cert.extBasicConstraints.pathLenConstraint;
					if (pathLength !== void 0 && pathLength < i - 1) throw new error_1.VerificationError({
						code: "CERTIFICATE_ERROR",
						message: "path length constraint exceeded"
					});
				}
			}
		}
	};
	exports.CertificateChainVerifier = CertificateChainVerifier;
	function dedupeCertificates(certs) {
		for (let i = 0; i < certs.length; i++) for (let j = i + 1; j < certs.length; j++) if (certs[i].equals(certs[j])) {
			certs.splice(j, 1);
			j--;
		}
		return certs;
	}
}));
var require_sct = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifySCTs = verifySCTs;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const trust_1 = require_trust();
	function verifySCTs(cert, issuer, ctlogs) {
		let extSCT;
		const clone = cert.clone();
		for (let i = 0; i < clone.extensions.length; i++) {
			const ext = clone.extensions[i];
			if (ext.subs[0].toOID() === core_1.EXTENSION_OID_SCT) {
				extSCT = new core_1.X509SCTExtension(ext);
				clone.extensions.splice(i, 1);
				break;
			}
		}
		if (!extSCT) return [];
		/* istanbul ignore if -- too difficult to fabricate test case for this */
		if (extSCT.signedCertificateTimestamps.length === 0) return [];
		const preCert = new core_1.ByteStream();
		const issuerId = core_1.crypto.digest("sha256", issuer.publicKey);
		preCert.appendView(issuerId);
		const tbs = clone.tbsCertificate.toDER();
		preCert.appendUint24(tbs.length);
		preCert.appendView(tbs);
		return extSCT.signedCertificateTimestamps.map((sct) => {
			if (!(0, trust_1.filterTLogAuthorities)(ctlogs, {
				logID: sct.logID,
				targetDate: sct.datetime
			}).some((log) => sct.verify(preCert.buffer, log.publicKey))) throw new error_1.VerificationError({
				code: "CERTIFICATE_ERROR",
				message: "SCT verification failed"
			});
			return sct.logID;
		});
	}
}));
var require_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyPublicKey = verifyPublicKey;
	exports.verifyCertificate = verifyCertificate;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const certificate_1 = require_certificate();
	const sct_1 = require_sct();
	const OID_FULCIO_ISSUER_V1 = "1.3.6.1.4.1.57264.1.1";
	const OID_FULCIO_ISSUER_V2 = "1.3.6.1.4.1.57264.1.8";
	function verifyPublicKey(hint, timestamps, trustMaterial) {
		const key = trustMaterial.publicKey(hint);
		timestamps.forEach((timestamp) => {
			if (!key.validFor(timestamp)) throw new error_1.VerificationError({
				code: "PUBLIC_KEY_ERROR",
				message: `Public key is not valid for timestamp: ${timestamp.toISOString()}`
			});
		});
		return { key: key.publicKey };
	}
	function verifyCertificate(leaf, timestamps, trustMaterial) {
		let path = [];
		timestamps.forEach((timestamp) => {
			path = (0, certificate_1.verifyCertificateChain)(timestamp, leaf, trustMaterial.certificateAuthorities);
		});
		return {
			scts: (0, sct_1.verifySCTs)(path[0], path[1], trustMaterial.ctlogs),
			signer: getSigner(path[0])
		};
	}
	function getSigner(cert) {
		let issuer;
		const issuerExtension = cert.extension(OID_FULCIO_ISSUER_V2);
		/* istanbul ignore next */
		if (issuerExtension) issuer = issuerExtension.valueObj.subs?.[0]?.value.toString("ascii");
		else issuer = cert.extension(OID_FULCIO_ISSUER_V1)?.value.toString("ascii");
		const oids = cert.extensions.map((ext) => {
			return {
				oid: { id: ext.subs[0].toOID().split(".").map(Number) },
				value: ext.subs[ext.subs.length - 1].value
			};
		});
		const identity = {
			extensions: { issuer },
			subjectAlternativeName: cert.subjectAltName,
			oids
		};
		return {
			key: core_1.crypto.createPublicKey(cert.publicKey),
			identity
		};
	}
}));
var require_policy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifySubjectAlternativeName = verifySubjectAlternativeName;
	exports.verifyExtensions = verifyExtensions;
	exports.verifyOIDs = verifyOIDs;
	const error_1 = require_error();
	function verifySubjectAlternativeName(policyIdentity, signerIdentity) {
		if (signerIdentity === void 0 || !signerIdentity.match(policyIdentity)) throw new error_1.PolicyError({
			code: "UNTRUSTED_SIGNER_ERROR",
			message: `certificate identity error - expected ${policyIdentity}, got ${signerIdentity}`
		});
	}
	function verifyExtensions(policyExtensions, signerExtensions = {}) {
		let key;
		for (key in policyExtensions) if (signerExtensions[key] !== policyExtensions[key]) throw new error_1.PolicyError({
			code: "UNTRUSTED_SIGNER_ERROR",
			message: `invalid certificate extension - expected ${key}=${policyExtensions[key]}, got ${key}=${signerExtensions[key]}`
		});
	}
	function verifyOIDs(policyOIDs, signerOIDs = []) {
		for (const policyOID of policyOIDs) if (!signerOIDs.find((signerOID) => oidEquals(policyOID.oid?.id, signerOID.oid?.id) && policyOID.value.equals(signerOID.value))) {
			const oid = policyOID.oid?.id.join(".") ?? "<unknown>";
			throw new error_1.PolicyError({
				code: "UNTRUSTED_SIGNER_ERROR",
				message: `invalid certificate extension - missing OID ${oid}`
			});
		}
	}
	function oidEquals(a, b) {
		if (a === void 0 || b === void 0) return false;
		return a.length === b.length && a.every((v, i) => v === b[i]);
	}
}));
var require_tsa = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyRFC3161Timestamp = verifyRFC3161Timestamp;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const certificate_1 = require_certificate();
	const trust_1 = require_trust();
	function verifyRFC3161Timestamp(timestamp, data, timestampAuthorities) {
		const signingTime = timestamp.signingTime;
		timestampAuthorities = (0, trust_1.filterCertAuthorities)(timestampAuthorities, signingTime);
		timestampAuthorities = filterCAsBySerialAndIssuer(timestampAuthorities, {
			serialNumber: timestamp.signerSerialNumber,
			issuer: timestamp.signerIssuer
		});
		if (!timestampAuthorities.some((ca) => {
			try {
				verifyTimestampForCA(timestamp, data, ca);
				return true;
			} catch (e) {
				return false;
			}
		})) throw new error_1.VerificationError({
			code: "TIMESTAMP_ERROR",
			message: "timestamp could not be verified"
		});
	}
	function verifyTimestampForCA(timestamp, data, ca) {
		const [leaf, ...cas] = ca.certChain;
		const signingKey = core_1.crypto.createPublicKey(leaf.publicKey);
		const signingTime = timestamp.signingTime;
		try {
			new certificate_1.CertificateChainVerifier({
				untrustedCert: leaf,
				trustedCerts: cas,
				timestamp: signingTime
			}).verify();
		} catch (e) {
			throw new error_1.VerificationError({
				code: "TIMESTAMP_ERROR",
				message: "invalid certificate chain"
			});
		}
		timestamp.verify(data, signingKey);
	}
	function filterCAsBySerialAndIssuer(timestampAuthorities, criteria) {
		return timestampAuthorities.filter((ca) => ca.certChain.length > 0 && core_1.crypto.bufferEqual(ca.certChain[0].serialNumber, criteria.serialNumber) && core_1.crypto.bufferEqual(ca.certChain[0].issuer, criteria.issuer));
	}
}));
var require_timestamp = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getTSATimestamp = getTSATimestamp;
	exports.getTLogTimestamp = getTLogTimestamp;
	const tsa_1 = require_tsa();
	function getTSATimestamp(timestamp, data, timestampAuthorities) {
		(0, tsa_1.verifyRFC3161Timestamp)(timestamp, data, timestampAuthorities);
		return {
			type: "timestamp-authority",
			logID: timestamp.signerSerialNumber,
			timestamp: timestamp.signingTime
		};
	}
	function getTLogTimestamp(entry) {
		if (!entry.inclusionPromise) return;
		return {
			type: "transparency-log",
			logID: entry.logId.keyId,
			timestamp: /* @__PURE__ */ new Date(Number(entry.integratedTime) * 1e3)
		};
	}
}));
var require_verifier$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Signature = exports.Verifier = exports.PublicKey = void 0;
	const sigstore_common_1 = require_sigstore_common();
	exports.PublicKey = {
		fromJSON(object) {
			return { rawBytes: isSet(object.rawBytes) ? Buffer.from(bytesFromBase64(object.rawBytes)) : Buffer.alloc(0) };
		},
		toJSON(message) {
			const obj = {};
			if (message.rawBytes.length !== 0) obj.rawBytes = base64FromBytes(message.rawBytes);
			return obj;
		}
	};
	exports.Verifier = {
		fromJSON(object) {
			return {
				verifier: isSet(object.publicKey) ? {
					$case: "publicKey",
					publicKey: exports.PublicKey.fromJSON(object.publicKey)
				} : isSet(object.x509Certificate) ? {
					$case: "x509Certificate",
					x509Certificate: sigstore_common_1.X509Certificate.fromJSON(object.x509Certificate)
				} : void 0,
				keyDetails: isSet(object.keyDetails) ? (0, sigstore_common_1.publicKeyDetailsFromJSON)(object.keyDetails) : 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.verifier?.$case === "publicKey") obj.publicKey = exports.PublicKey.toJSON(message.verifier.publicKey);
			else if (message.verifier?.$case === "x509Certificate") obj.x509Certificate = sigstore_common_1.X509Certificate.toJSON(message.verifier.x509Certificate);
			if (message.keyDetails !== 0) obj.keyDetails = (0, sigstore_common_1.publicKeyDetailsToJSON)(message.keyDetails);
			return obj;
		}
	};
	exports.Signature = {
		fromJSON(object) {
			return {
				content: isSet(object.content) ? Buffer.from(bytesFromBase64(object.content)) : Buffer.alloc(0),
				verifier: isSet(object.verifier) ? exports.Verifier.fromJSON(object.verifier) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.content.length !== 0) obj.content = base64FromBytes(message.content);
			if (message.verifier !== void 0) obj.verifier = exports.Verifier.toJSON(message.verifier);
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_dsse$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DSSELogEntryV002 = exports.DSSERequestV002 = void 0;
	const envelope_1 = require_envelope();
	const sigstore_common_1 = require_sigstore_common();
	const verifier_1 = require_verifier$1();
	exports.DSSERequestV002 = {
		fromJSON(object) {
			return {
				envelope: isSet(object.envelope) ? envelope_1.Envelope.fromJSON(object.envelope) : void 0,
				verifiers: globalThis.Array.isArray(object?.verifiers) ? object.verifiers.map((e) => verifier_1.Verifier.fromJSON(e)) : []
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.envelope !== void 0) obj.envelope = envelope_1.Envelope.toJSON(message.envelope);
			if (message.verifiers?.length) obj.verifiers = message.verifiers.map((e) => verifier_1.Verifier.toJSON(e));
			return obj;
		}
	};
	exports.DSSELogEntryV002 = {
		fromJSON(object) {
			return {
				payloadHash: isSet(object.payloadHash) ? sigstore_common_1.HashOutput.fromJSON(object.payloadHash) : void 0,
				signatures: globalThis.Array.isArray(object?.signatures) ? object.signatures.map((e) => verifier_1.Signature.fromJSON(e)) : []
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.payloadHash !== void 0) obj.payloadHash = sigstore_common_1.HashOutput.toJSON(message.payloadHash);
			if (message.signatures?.length) obj.signatures = message.signatures.map((e) => verifier_1.Signature.toJSON(e));
			return obj;
		}
	};
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_hashedrekord$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HashedRekordLogEntryV002 = exports.HashedRekordRequestV002 = void 0;
	const sigstore_common_1 = require_sigstore_common();
	const verifier_1 = require_verifier$1();
	exports.HashedRekordRequestV002 = {
		fromJSON(object) {
			return {
				digest: isSet(object.digest) ? Buffer.from(bytesFromBase64(object.digest)) : Buffer.alloc(0),
				signature: isSet(object.signature) ? verifier_1.Signature.fromJSON(object.signature) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.digest.length !== 0) obj.digest = base64FromBytes(message.digest);
			if (message.signature !== void 0) obj.signature = verifier_1.Signature.toJSON(message.signature);
			return obj;
		}
	};
	exports.HashedRekordLogEntryV002 = {
		fromJSON(object) {
			return {
				data: isSet(object.data) ? sigstore_common_1.HashOutput.fromJSON(object.data) : void 0,
				signature: isSet(object.signature) ? verifier_1.Signature.fromJSON(object.signature) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.data !== void 0) obj.data = sigstore_common_1.HashOutput.toJSON(message.data);
			if (message.signature !== void 0) obj.signature = verifier_1.Signature.toJSON(message.signature);
			return obj;
		}
	};
	function bytesFromBase64(b64) {
		return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	}
	function base64FromBytes(arr) {
		return globalThis.Buffer.from(arr).toString("base64");
	}
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_entry = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateEntryRequest = exports.Spec = exports.Entry = void 0;
	const dsse_1 = require_dsse$1();
	const hashedrekord_1 = require_hashedrekord$1();
	exports.Entry = {
		fromJSON(object) {
			return {
				kind: isSet(object.kind) ? globalThis.String(object.kind) : "",
				apiVersion: isSet(object.apiVersion) ? globalThis.String(object.apiVersion) : "",
				spec: isSet(object.spec) ? exports.Spec.fromJSON(object.spec) : void 0
			};
		},
		toJSON(message) {
			const obj = {};
			if (message.kind !== "") obj.kind = message.kind;
			if (message.apiVersion !== "") obj.apiVersion = message.apiVersion;
			if (message.spec !== void 0) obj.spec = exports.Spec.toJSON(message.spec);
			return obj;
		}
	};
	exports.Spec = {
		fromJSON(object) {
			return { spec: isSet(object.hashedRekordV002) ? {
				$case: "hashedRekordV002",
				hashedRekordV002: hashedrekord_1.HashedRekordLogEntryV002.fromJSON(object.hashedRekordV002)
			} : isSet(object.dsseV002) ? {
				$case: "dsseV002",
				dsseV002: dsse_1.DSSELogEntryV002.fromJSON(object.dsseV002)
			} : void 0 };
		},
		toJSON(message) {
			const obj = {};
			if (message.spec?.$case === "hashedRekordV002") obj.hashedRekordV002 = hashedrekord_1.HashedRekordLogEntryV002.toJSON(message.spec.hashedRekordV002);
			else if (message.spec?.$case === "dsseV002") obj.dsseV002 = dsse_1.DSSELogEntryV002.toJSON(message.spec.dsseV002);
			return obj;
		}
	};
	exports.CreateEntryRequest = {
		fromJSON(object) {
			return { spec: isSet(object.hashedRekordRequestV002) ? {
				$case: "hashedRekordRequestV002",
				hashedRekordRequestV002: hashedrekord_1.HashedRekordRequestV002.fromJSON(object.hashedRekordRequestV002)
			} : isSet(object.dsseRequestV002) ? {
				$case: "dsseRequestV002",
				dsseRequestV002: dsse_1.DSSERequestV002.fromJSON(object.dsseRequestV002)
			} : void 0 };
		},
		toJSON(message) {
			const obj = {};
			if (message.spec?.$case === "hashedRekordRequestV002") obj.hashedRekordRequestV002 = hashedrekord_1.HashedRekordRequestV002.toJSON(message.spec.hashedRekordRequestV002);
			else if (message.spec?.$case === "dsseRequestV002") obj.dsseRequestV002 = dsse_1.DSSERequestV002.toJSON(message.spec.dsseRequestV002);
			return obj;
		}
	};
	function isSet(value) {
		return value !== null && value !== void 0;
	}
}));
var require_v2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_dsse$1(), exports);
	__exportStar(require_entry(), exports);
	__exportStar(require_hashedrekord$1(), exports);
	__exportStar(require_verifier$1(), exports);
}));
var require_dsse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DSSE_API_VERSION_V1 = void 0;
	exports.verifyDSSETLogBody = verifyDSSETLogBody;
	exports.verifyDSSETLogBodyV2 = verifyDSSETLogBodyV2;
	const error_1 = require_error();
	exports.DSSE_API_VERSION_V1 = "0.0.1";
	function verifyDSSETLogBody(tlogEntry, content) {
		switch (tlogEntry.apiVersion) {
			case exports.DSSE_API_VERSION_V1: return verifyDSSE001TLogBody(tlogEntry, content);
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported dsse version: ${tlogEntry.apiVersion}`
			});
		}
	}
	function verifyDSSETLogBodyV2(tlogEntry, content) {
		const spec = tlogEntry.spec?.spec;
		if (!spec) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: `missing dsse spec`
		});
		switch (spec.$case) {
			case "dsseV002": return verifyDSSE002TLogBody(spec.dsseV002, content);
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported version: ${spec.$case}`
			});
		}
	}
	function verifyDSSE001TLogBody(tlogEntry, content) {
		if (tlogEntry.spec.signatures?.length !== 1) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "signature count mismatch"
		});
		const tlogSig = tlogEntry.spec.signatures[0].signature;
		if (!content.compareSignature(Buffer.from(tlogSig, "base64"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "tlog entry signature mismatch"
		});
		const tlogHash = tlogEntry.spec.payloadHash?.value || "";
		if (!content.compareDigest(Buffer.from(tlogHash, "hex"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "DSSE payload hash mismatch"
		});
	}
	function verifyDSSE002TLogBody(spec, content) {
		if (spec.signatures?.length !== 1) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "signature count mismatch"
		});
		const tlogSig = spec.signatures[0].content;
		if (!content.compareSignature(tlogSig)) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "tlog entry signature mismatch"
		});
		const tlogHash = spec.payloadHash?.digest || Buffer.from("");
		if (!content.compareDigest(tlogHash)) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "DSSE payload hash mismatch"
		});
	}
}));
var require_hashedrekord = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.HASHEDREKORD_API_VERSION_V1 = void 0;
	exports.verifyHashedRekordTLogBody = verifyHashedRekordTLogBody;
	exports.verifyHashedRekordTLogBodyV2 = verifyHashedRekordTLogBodyV2;
	const error_1 = require_error();
	exports.HASHEDREKORD_API_VERSION_V1 = "0.0.1";
	function verifyHashedRekordTLogBody(tlogEntry, content) {
		switch (tlogEntry.apiVersion) {
			case exports.HASHEDREKORD_API_VERSION_V1: return verifyHashedrekord001TLogBody(tlogEntry, content);
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported hashedrekord version: ${tlogEntry.apiVersion}`
			});
		}
	}
	function verifyHashedRekordTLogBodyV2(tlogEntry, content) {
		const spec = tlogEntry.spec?.spec;
		if (!spec) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: `missing dsse spec`
		});
		switch (spec.$case) {
			case "hashedRekordV002": return verifyHashedrekord002TLogBody(spec.hashedRekordV002, content);
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported version: ${spec.$case}`
			});
		}
	}
	function verifyHashedrekord001TLogBody(tlogEntry, content) {
		const tlogSig = tlogEntry.spec.signature.content || "";
		if (!content.compareSignature(Buffer.from(tlogSig, "base64"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "signature mismatch"
		});
		const tlogDigest = tlogEntry.spec.data.hash?.value || "";
		if (!content.compareSignedDigest(Buffer.from(tlogDigest, "hex"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "digest mismatch"
		});
	}
	function verifyHashedrekord002TLogBody(spec, content) {
		const tlogSig = spec.signature?.content || Buffer.from("");
		if (!content.compareSignature(tlogSig)) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "signature mismatch"
		});
		const tlogHash = spec.data?.digest || Buffer.from("");
		if (!content.compareSignedDigest(tlogHash)) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "digest mismatch"
		});
	}
}));
var require_intoto = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyIntotoTLogBody = verifyIntotoTLogBody;
	const error_1 = require_error();
	function verifyIntotoTLogBody(tlogEntry, content) {
		switch (tlogEntry.apiVersion) {
			case "0.0.2": return verifyIntoto002TLogBody(tlogEntry, content);
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported intoto version: ${tlogEntry.apiVersion}`
			});
		}
	}
	function verifyIntoto002TLogBody(tlogEntry, content) {
		if (tlogEntry.spec.content.envelope.signatures?.length !== 1) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "signature count mismatch"
		});
		const tlogSig = base64Decode(tlogEntry.spec.content.envelope.signatures[0].sig);
		if (!content.compareSignature(Buffer.from(tlogSig, "base64"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "tlog entry signature mismatch"
		});
		const tlogHash = tlogEntry.spec.content.payloadHash?.value || "";
		if (!content.compareDigest(Buffer.from(tlogHash, "hex"))) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: "DSSE payload hash mismatch"
		});
	}
	function base64Decode(str) {
		return Buffer.from(str, "base64").toString("utf-8");
	}
}));
var require_checkpoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.LogCheckpoint = void 0;
	exports.verifyCheckpoint = verifyCheckpoint;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const CHECKPOINT_SEPARATOR = "\n\n";
	const SIGNATURE_REGEX = /\u2014 (\S+) (\S+)\n/g;
	function verifyCheckpoint(entry, tlogs) {
		const inclusionProof = entry.inclusionProof;
		const signedNote = SignedNote.fromString(inclusionProof.checkpoint.envelope);
		const checkpoint = LogCheckpoint.fromString(signedNote.note);
		if (!verifySignedNote(signedNote, tlogs)) throw new error_1.VerificationError({
			code: "TLOG_INCLUSION_PROOF_ERROR",
			message: "invalid checkpoint signature"
		});
		return checkpoint;
	}
	function verifySignedNote(signedNote, tlogs) {
		const data = Buffer.from(signedNote.note, "utf-8");
		return signedNote.signatures.some((signature) => {
			const tlog = tlogs.find((tlog) => core_1.crypto.bufferEqual(tlog.logID.subarray(0, 4), signature.keyHint) && tlog.baseURL.match(signature.name));
			if (!tlog) return false;
			return core_1.crypto.verify(data, tlog.publicKey, signature.signature);
		});
	}
	var SignedNote = class SignedNote {
		note;
		signatures;
		constructor(note, signatures) {
			this.note = note;
			this.signatures = signatures;
		}
		static fromString(envelope) {
			if (!envelope.includes(CHECKPOINT_SEPARATOR)) throw new error_1.VerificationError({
				code: "TLOG_INCLUSION_PROOF_ERROR",
				message: "missing checkpoint separator"
			});
			const split = envelope.indexOf(CHECKPOINT_SEPARATOR);
			const header = envelope.slice(0, split + 1);
			const matches = envelope.slice(split + 2).matchAll(SIGNATURE_REGEX);
			const signatures = Array.from(matches, (match) => {
				const [, name, signature] = match;
				const sigBytes = Buffer.from(signature, "base64");
				if (sigBytes.length < 5) throw new error_1.VerificationError({
					code: "TLOG_INCLUSION_PROOF_ERROR",
					message: "malformed checkpoint signature"
				});
				return {
					name,
					keyHint: sigBytes.subarray(0, 4),
					signature: sigBytes.subarray(4)
				};
			});
			if (signatures.length === 0) throw new error_1.VerificationError({
				code: "TLOG_INCLUSION_PROOF_ERROR",
				message: "no signatures found in checkpoint"
			});
			return new SignedNote(header, signatures);
		}
	};
	var LogCheckpoint = class LogCheckpoint {
		origin;
		logSize;
		logHash;
		rest;
		constructor(origin, logSize, logHash, rest) {
			this.origin = origin;
			this.logSize = logSize;
			this.logHash = logHash;
			this.rest = rest;
		}
		static fromString(note) {
			const lines = note.trimEnd().split("\n");
			if (lines.length < 3) throw new error_1.VerificationError({
				code: "TLOG_INCLUSION_PROOF_ERROR",
				message: "too few lines in checkpoint header"
			});
			const origin = lines[0];
			return new LogCheckpoint(origin, BigInt(lines[1]), Buffer.from(lines[2], "base64"), lines.slice(3));
		}
	};
	exports.LogCheckpoint = LogCheckpoint;
}));
var require_merkle = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyMerkleInclusion = verifyMerkleInclusion;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const RFC6962_LEAF_HASH_PREFIX = Buffer.from([0]);
	const RFC6962_NODE_HASH_PREFIX = Buffer.from([1]);
	function verifyMerkleInclusion(entry, checkpoint) {
		const inclusionProof = entry.inclusionProof;
		const logIndex = BigInt(inclusionProof.logIndex);
		const treeSize = BigInt(checkpoint.logSize);
		if (logIndex < 0n || logIndex >= treeSize) throw new error_1.VerificationError({
			code: "TLOG_INCLUSION_PROOF_ERROR",
			message: `invalid index: ${logIndex}`
		});
		const { inner, border } = decompInclProof(logIndex, treeSize);
		if (inclusionProof.hashes.length !== inner + border) throw new error_1.VerificationError({
			code: "TLOG_INCLUSION_PROOF_ERROR",
			message: "invalid hash count"
		});
		const innerHashes = inclusionProof.hashes.slice(0, inner);
		const borderHashes = inclusionProof.hashes.slice(inner);
		const calculatedHash = chainBorderRight(chainInner(hashLeaf(entry.canonicalizedBody), innerHashes, logIndex), borderHashes);
		if (!core_1.crypto.bufferEqual(calculatedHash, checkpoint.logHash)) throw new error_1.VerificationError({
			code: "TLOG_INCLUSION_PROOF_ERROR",
			message: "calculated root hash does not match inclusion proof"
		});
	}
	function decompInclProof(index, size) {
		const inner = innerProofSize(index, size);
		return {
			inner,
			border: onesCount(index >> BigInt(inner))
		};
	}
	function chainInner(seed, hashes, index) {
		return hashes.reduce((acc, h, i) => {
			if (index >> BigInt(i) & BigInt(1)) return hashChildren(h, acc);
			else return hashChildren(acc, h);
		}, seed);
	}
	function chainBorderRight(seed, hashes) {
		return hashes.reduce((acc, h) => hashChildren(h, acc), seed);
	}
	function innerProofSize(index, size) {
		return bitLength(index ^ size - BigInt(1));
	}
	function onesCount(num) {
		return num.toString(2).split("1").length - 1;
	}
	function bitLength(n) {
		if (n === 0n) return 0;
		return n.toString(2).length;
	}
	function hashChildren(left, right) {
		return core_1.crypto.digest("sha256", RFC6962_NODE_HASH_PREFIX, left, right);
	}
	function hashLeaf(leaf) {
		return core_1.crypto.digest("sha256", RFC6962_LEAF_HASH_PREFIX, leaf);
	}
}));
var require_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyTLogSET = verifyTLogSET;
	const core_1 = require_dist$1();
	const error_1 = require_error();
	const trust_1 = require_trust();
	function verifyTLogSET(entry, tlogs) {
		if (!(0, trust_1.filterTLogAuthorities)(tlogs, {
			logID: entry.logId.keyId,
			targetDate: /* @__PURE__ */ new Date(Number(entry.integratedTime) * 1e3)
		}).some((tlog) => {
			const payload = toVerificationPayload(entry);
			const data = Buffer.from(core_1.json.canonicalize(payload), "utf8");
			const signature = entry.inclusionPromise.signedEntryTimestamp;
			return core_1.crypto.verify(data, tlog.publicKey, signature);
		})) throw new error_1.VerificationError({
			code: "TLOG_INCLUSION_PROMISE_ERROR",
			message: "inclusion promise could not be verified"
		});
	}
	function toVerificationPayload(entry) {
		const { integratedTime, logIndex, logId, canonicalizedBody } = entry;
		return {
			body: canonicalizedBody.toString("base64"),
			integratedTime: Number(integratedTime),
			logIndex: Number(logIndex),
			logID: logId.keyId.toString("hex")
		};
	}
}));
var require_tlog = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyTLogBody = verifyTLogBody;
	exports.verifyTLogInclusion = verifyTLogInclusion;
	const v2_1 = require_v2();
	const error_1 = require_error();
	const dsse_1 = require_dsse();
	const hashedrekord_1 = require_hashedrekord();
	const intoto_1 = require_intoto();
	const checkpoint_1 = require_checkpoint();
	const merkle_1 = require_merkle();
	const set_1 = require_set();
	function verifyTLogBody(entry, sigContent) {
		const { kind, version } = entry.kindVersion;
		const body = JSON.parse(entry.canonicalizedBody.toString("utf8"));
		if (kind !== body.kind || version !== body.apiVersion) throw new error_1.VerificationError({
			code: "TLOG_BODY_ERROR",
			message: `kind/version mismatch - expected: ${kind}/${version}, received: ${body.kind}/${body.apiVersion}`
		});
		switch (kind) {
			case "dsse": if (version == dsse_1.DSSE_API_VERSION_V1) return (0, dsse_1.verifyDSSETLogBody)(body, sigContent);
			else {
				const entryRekorV2 = v2_1.Entry.fromJSON(body);
				return (0, dsse_1.verifyDSSETLogBodyV2)(entryRekorV2, sigContent);
			}
			case "intoto": return (0, intoto_1.verifyIntotoTLogBody)(body, sigContent);
			case "hashedrekord": if (version == hashedrekord_1.HASHEDREKORD_API_VERSION_V1) return (0, hashedrekord_1.verifyHashedRekordTLogBody)(body, sigContent);
			else {
				const entryRekorV2 = v2_1.Entry.fromJSON(body);
				return (0, hashedrekord_1.verifyHashedRekordTLogBodyV2)(entryRekorV2, sigContent);
			}
			default: throw new error_1.VerificationError({
				code: "TLOG_BODY_ERROR",
				message: `unsupported kind: ${kind}`
			});
		}
	}
	function verifyTLogInclusion(entry, tlogAuthorities) {
		let inclusionVerified = false;
		if (isTLogEntryWithInclusionPromise(entry)) {
			(0, set_1.verifyTLogSET)(entry, tlogAuthorities);
			inclusionVerified = true;
		}
		if (isTLogEntryWithInclusionProof(entry)) {
			const checkpoint = (0, checkpoint_1.verifyCheckpoint)(entry, tlogAuthorities);
			(0, merkle_1.verifyMerkleInclusion)(entry, checkpoint);
			inclusionVerified = true;
		}
		if (!inclusionVerified) throw new error_1.VerificationError({
			code: "TLOG_MISSING_INCLUSION_ERROR",
			message: "inclusion could not be verified"
		});
	}
	function isTLogEntryWithInclusionPromise(entry) {
		return entry.inclusionPromise !== void 0;
	}
	function isTLogEntryWithInclusionProof(entry) {
		return entry.inclusionProof !== void 0;
	}
}));
var require_verifier = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Verifier = void 0;
	const util_1 = __require("util");
	const error_1 = require_error();
	const key_1 = require_key();
	const policy_1 = require_policy();
	const timestamp_1 = require_timestamp();
	const tlog_1 = require_tlog();
	var Verifier = class {
		trustMaterial;
		options;
		constructor(trustMaterial, options = {}) {
			this.trustMaterial = trustMaterial;
			this.options = {
				ctlogThreshold: options.ctlogThreshold ?? 1,
				tlogThreshold: options.tlogThreshold ?? 1,
				timestampThreshold: options.timestampThreshold ?? options.tsaThreshold ?? 1,
				tsaThreshold: 0
			};
		}
		verify(entity, policy) {
			const timestamps = this.verifyTimestamps(entity);
			const signer = this.verifySigningKey(entity, timestamps);
			this.verifyTLogs(entity);
			this.verifySignature(entity, signer);
			if (policy) this.verifyPolicy(policy, signer.identity || {});
			return signer;
		}
		verifyTimestamps(entity) {
			const timestamps = [];
			for (const timestamp of entity.timestamps) switch (timestamp.$case) {
				case "timestamp-authority":
					timestamps.push((0, timestamp_1.getTSATimestamp)(timestamp.timestamp, entity.signature.signature, this.trustMaterial.timestampAuthorities));
					break;
				case "transparency-log": {
					const result = (0, timestamp_1.getTLogTimestamp)(timestamp.tlogEntry);
					if (result) timestamps.push(result);
					break;
				}
			}
			if (containsDupes(timestamps)) throw new error_1.VerificationError({
				code: "TIMESTAMP_ERROR",
				message: "duplicate timestamp"
			});
			if (timestamps.length < this.options.timestampThreshold) throw new error_1.VerificationError({
				code: "TIMESTAMP_ERROR",
				message: `expected ${this.options.timestampThreshold} timestamps, got ${timestamps.length}`
			});
			return timestamps.map((t) => t.timestamp);
		}
		verifySigningKey({ key }, timestamps) {
			switch (key.$case) {
				case "public-key": return (0, key_1.verifyPublicKey)(key.hint, timestamps, this.trustMaterial);
				case "certificate": {
					const result = (0, key_1.verifyCertificate)(key.certificate, timestamps, this.trustMaterial);
					/* istanbul ignore next - no fixture */
					if (containsDupes(result.scts)) throw new error_1.VerificationError({
						code: "CERTIFICATE_ERROR",
						message: "duplicate SCT"
					});
					if (result.scts.length < this.options.ctlogThreshold) throw new error_1.VerificationError({
						code: "CERTIFICATE_ERROR",
						message: `expected ${this.options.ctlogThreshold} SCTs, got ${result.scts.length}`
					});
					return result.signer;
				}
			}
		}
		verifyTLogs({ signature: content, tlogEntries }) {
			let tlogCount = 0;
			tlogEntries.forEach((entry) => {
				tlogCount++;
				(0, tlog_1.verifyTLogInclusion)(entry, this.trustMaterial.tlogs);
				(0, tlog_1.verifyTLogBody)(entry, content);
			});
			if (tlogCount < this.options.tlogThreshold) throw new error_1.VerificationError({
				code: "TLOG_ERROR",
				message: `expected ${this.options.tlogThreshold} tlog entries, got ${tlogCount}`
			});
		}
		verifySignature(entity, signer) {
			if (!entity.signature.verifySignature(signer.key)) throw new error_1.VerificationError({
				code: "SIGNATURE_ERROR",
				message: "signature verification failed"
			});
		}
		verifyPolicy(policy, identity) {
			/* istanbul ignore else */
			if (policy.subjectAlternativeName) (0, policy_1.verifySubjectAlternativeName)(policy.subjectAlternativeName, identity.subjectAlternativeName);
			/* istanbul ignore else */
			if (policy.extensions) (0, policy_1.verifyExtensions)(policy.extensions, identity.extensions);
			/* istanbul ignore if */
			if (policy.oids) (0, policy_1.verifyOIDs)(policy.oids, identity.oids);
		}
	};
	exports.Verifier = Verifier;
	function containsDupes(arr) {
		for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) if ((0, util_1.isDeepStrictEqual)(arr[i], arr[j])) return true;
		return false;
	}
}));
var import_dist$2 = (/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Verifier = exports.toTrustMaterial = exports.VerificationError = exports.PolicyError = exports.toSignedEntity = void 0;
	/* istanbul ignore file */
	var bundle_1 = require_bundle();
	Object.defineProperty(exports, "toSignedEntity", {
		enumerable: true,
		get: function() {
			return bundle_1.toSignedEntity;
		}
	});
	var error_1 = require_error();
	Object.defineProperty(exports, "PolicyError", {
		enumerable: true,
		get: function() {
			return error_1.PolicyError;
		}
	});
	Object.defineProperty(exports, "VerificationError", {
		enumerable: true,
		get: function() {
			return error_1.VerificationError;
		}
	});
	var trust_1 = require_trust();
	Object.defineProperty(exports, "toTrustMaterial", {
		enumerable: true,
		get: function() {
			return trust_1.toTrustMaterial;
		}
	});
	var verifier_1 = require_verifier();
	Object.defineProperty(exports, "Verifier", {
		enumerable: true,
		get: function() {
			return verifier_1.Verifier;
		}
	});
})))();
var import_dist = require_dist$2();
var import_dist$1 = require_dist$3();
var TRAILING_SLASHES_RE = /\/+$/;
/** Canonicalize a signed source repository URL, or return null when it is unsafe. */
function canonicalizeRepositoryUrl(value) {
	try {
		const url = new URL(value);
		if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.port) return null;
		let path = url.pathname;
		if (path !== "/") path = path.replace(TRAILING_SLASHES_RE, "") || "/";
		return `https://${url.hostname.toLowerCase()}${path}`;
	} catch {
		return null;
	}
}
var sigstore_public_good_v1_default = {
	mediaType: "application/vnd.dev.sigstore.trustedroot+json;version=0.1",
	tlogs: [{
		"baseUrl": "https://rekor.sigstore.dev",
		"hashAlgorithm": "SHA2_256",
		"publicKey": {
			"rawBytes": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE2G2Y+2tabdTV5BcGiBIx0a9fAFwrkBbmLSGtks4L3qX6yYY0zufBnhC8Ur/iy55GhWP/9A/bY2LhC30M9+RYtw==",
			"keyDetails": "PKIX_ECDSA_P256_SHA_256",
			"validFor": { "start": "2021-01-12T11:53:27Z" }
		},
		"logId": { "keyId": "wNI9atQGlz+VWfO6LRygH4QUfY/8W4RFwiT5i5WRgB0=" }
	}, {
		"baseUrl": "https://log2025-1.rekor.sigstore.dev",
		"hashAlgorithm": "SHA2_256",
		"publicKey": {
			"rawBytes": "MCowBQYDK2VwAyEAt8rlp1knGwjfbcXAYPYAkn0XiLz1x8O4t0YkEhie244=",
			"keyDetails": "PKIX_ED25519",
			"validFor": { "start": "2025-09-23T00:00:00Z" }
		},
		"logId": { "keyId": "zxGZFVvd0FEmjR8WrFwMdcAJ9vtaY/QXf44Y1wUeP6A=" }
	}],
	certificateAuthorities: [{
		"subject": {
			"organization": "sigstore.dev",
			"commonName": "sigstore"
		},
		"uri": "https://fulcio.sigstore.dev",
		"certChain": { "certificates": [{ "rawBytes": "MIIB+DCCAX6gAwIBAgITNVkDZoCiofPDsy7dfm6geLbuhzAKBggqhkjOPQQDAzAqMRUwEwYDVQQKEwxzaWdzdG9yZS5kZXYxETAPBgNVBAMTCHNpZ3N0b3JlMB4XDTIxMDMwNzAzMjAyOVoXDTMxMDIyMzAzMjAyOVowKjEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MREwDwYDVQQDEwhzaWdzdG9yZTB2MBAGByqGSM49AgEGBSuBBAAiA2IABLSyA7Ii5k+pNO8ZEWY0ylemWDowOkNa3kL+GZE5Z5GWehL9/A9bRNA3RbrsZ5i0JcastaRL7Sp5fp/jD5dxqc/UdTVnlvS16an+2Yfswe/QuLolRUCrcOE2+2iA5+tzd6NmMGQwDgYDVR0PAQH/BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQEwHQYDVR0OBBYEFMjFHQBBmiQpMlEk6w2uSu1KBtPsMB8GA1UdIwQYMBaAFMjFHQBBmiQpMlEk6w2uSu1KBtPsMAoGCCqGSM49BAMDA2gAMGUCMH8liWJfMui6vXXBhjDgY4MwslmN/TJxVe/83WrFomwmNf056y1X48F9c4m3a3ozXAIxAKjRay5/aj/jsKKGIkmQatjI8uupHr/+CxFvaJWmpYqNkLDGRU+9orzh5hI2RrcuaQ==" }] },
		"validFor": {
			"start": "2021-03-07T03:20:29Z",
			"end": "2022-12-31T23:59:59.999Z"
		}
	}, {
		"subject": {
			"organization": "sigstore.dev",
			"commonName": "sigstore"
		},
		"uri": "https://fulcio.sigstore.dev",
		"certChain": { "certificates": [{ "rawBytes": "MIICGjCCAaGgAwIBAgIUALnViVfnU0brJasmRkHrn/UnfaQwCgYIKoZIzj0EAwMwKjEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MREwDwYDVQQDEwhzaWdzdG9yZTAeFw0yMjA0MTMyMDA2MTVaFw0zMTEwMDUxMzU2NThaMDcxFTATBgNVBAoTDHNpZ3N0b3JlLmRldjEeMBwGA1UEAxMVc2lnc3RvcmUtaW50ZXJtZWRpYXRlMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE8RVS/ysH+NOvuDZyPIZtilgUF9NlarYpAd9HP1vBBH1U5CV77LSS7s0ZiH4nE7Hv7ptS6LvvR/STk798LVgMzLlJ4HeIfF3tHSaexLcYpSASr1kS0N/RgBJz/9jWCiXno3sweTAOBgNVHQ8BAf8EBAMCAQYwEwYDVR0lBAwwCgYIKwYBBQUHAwMwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQU39Ppz1YkEZb5qNjpKFWixi4YZD8wHwYDVR0jBBgwFoAUWMAeX5FFpWapesyQoZMi0CrFxfowCgYIKoZIzj0EAwMDZwAwZAIwPCsQK4DYiZYDPIaDi5HFKnfxXx6ASSVmERfsynYBiX2X6SJRnZU84/9DZdnFvvxmAjBOt6QpBlc4J/0DxvkTCqpclvziL6BCCPnjdlIB3Pu3BxsPmygUY7Ii2zbdCdliiow=" }, { "rawBytes": "MIIB9zCCAXygAwIBAgIUALZNAPFdxHPwjeDloDwyYChAO/4wCgYIKoZIzj0EAwMwKjEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MREwDwYDVQQDEwhzaWdzdG9yZTAeFw0yMTEwMDcxMzU2NTlaFw0zMTEwMDUxMzU2NThaMCoxFTATBgNVBAoTDHNpZ3N0b3JlLmRldjERMA8GA1UEAxMIc2lnc3RvcmUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAT7XeFT4rb3PQGwS4IajtLk3/OlnpgangaBclYpsYBr5i+4ynB07ceb3LP0OIOZdxexX69c5iVuyJRQ+Hz05yi+UF3uBWAlHpiS5sh0+H2GHE7SXrk1EC5m1Tr19L9gg92jYzBhMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRYwB5fkUWlZql6zJChkyLQKsXF+jAfBgNVHSMEGDAWgBRYwB5fkUWlZql6zJChkyLQKsXF+jAKBggqhkjOPQQDAwNpADBmAjEAj1nHeXZp+13NWBNa+EDsDP8G1WWg1tCMWP/WHPqpaVo0jhsweNFZgSs0eE7wYI4qAjEA2WB9ot98sIkoF3vZYdd3/VtWB5b9TNMea7Ix/stJ5TfcLLeABLE4BNJOsQ4vnBHJ" }] },
		"validFor": { "start": "2022-04-13T20:06:15Z" }
	}],
	ctlogs: [{
		"baseUrl": "https://ctfe.sigstore.dev/test",
		"hashAlgorithm": "SHA2_256",
		"publicKey": {
			"rawBytes": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbfwR+RJudXscgRBRpKX1XFDy3PyudDxz/SfnRi1fT8ekpfBd2O1uoz7jr3Z8nKzxA69EUQ+eFCFI3zeubPWU7w==",
			"keyDetails": "PKIX_ECDSA_P256_SHA_256",
			"validFor": {
				"start": "2021-03-14T00:00:00Z",
				"end": "2022-10-31T23:59:59.999Z"
			}
		},
		"logId": { "keyId": "CGCS8ChS/2hF0dFrJ4ScRWcYrBY9wzjSbea8IgY2b3I=" }
	}, {
		"baseUrl": "https://ctfe.sigstore.dev/2022",
		"hashAlgorithm": "SHA2_256",
		"publicKey": {
			"rawBytes": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEiPSlFi0CmFTfEjCUqF9HuCEcYXNKAaYalIJmBZ8yyezPjTqhxrKBpMnaocVtLJBI1eM3uXnQzQGAJdJ4gs9Fyw==",
			"keyDetails": "PKIX_ECDSA_P256_SHA_256",
			"validFor": { "start": "2022-10-20T00:00:00Z" }
		},
		"logId": { "keyId": "3T0wasbHETJjGR4cmWc3AqJKXrjePK3/h4pygC8p7o4=" }
	}],
	timestampAuthorities: [{
		"subject": {
			"organization": "sigstore.dev",
			"commonName": "sigstore-tsa-selfsigned"
		},
		"uri": "https://timestamp.sigstore.dev/api/v1/timestamp",
		"certChain": { "certificates": [{ "rawBytes": "MIICEDCCAZagAwIBAgIUOhNULwyQYe68wUMvy4qOiyojiwwwCgYIKoZIzj0EAwMwOTEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MSAwHgYDVQQDExdzaWdzdG9yZS10c2Etc2VsZnNpZ25lZDAeFw0yNTA0MDgwNjU5NDNaFw0zNTA0MDYwNjU5NDNaMC4xFTATBgNVBAoTDHNpZ3N0b3JlLmRldjEVMBMGA1UEAxMMc2lnc3RvcmUtdHNhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE4ra2Z8hKNig2T9kFjCAToGG30jky+WQv3BzL+mKvh1SKNR/UwuwsfNCg4sryoYAd8E6isovVA3M4aoNdm9QDi50Z8nTEyvqgfDPtTIwXItfiW/AFf1V7uwkbkAoj0xxco2owaDAOBgNVHQ8BAf8EBAMCB4AwHQYDVR0OBBYEFIn9eUOHz9BlRsMCRscsc1t9tOsDMB8GA1UdIwQYMBaAFJjsAe9/u1H/1JUeb4qImFMHic6/MBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMAoGCCqGSM49BAMDA2gAMGUCMDtpsV/6KaO0qyF/UMsX2aSUXKQFdoGTptQGc0ftq1csulHPGG6dsmyMNd3JB+G3EQIxAOajvBcjpJmKb4Nv+2Taoj8Uc5+b6ih6FXCCKraSqupe07zqswMcXJTe1cExvHvvlw==" }, { "rawBytes": "MIIB9zCCAXygAwIBAgIUV7f0GLDOoEzIh8LXSW80OJiUp14wCgYIKoZIzj0EAwMwOTEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MSAwHgYDVQQDExdzaWdzdG9yZS10c2Etc2VsZnNpZ25lZDAeFw0yNTA0MDgwNjU5NDNaFw0zNTA0MDYwNjU5NDNaMDkxFTATBgNVBAoTDHNpZ3N0b3JlLmRldjEgMB4GA1UEAxMXc2lnc3RvcmUtdHNhLXNlbGZzaWduZWQwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAQUQNtfRT/ou3YATa6wB/kKTe70cfJwyRIBovMnt8RcJph/COE82uyS6FmppLLL1VBPGcPfpQPYJNXzWwi8icwhKQ6W/Qe2h3oebBb2FHpwNJDqo+TMaC/tdfkv/ElJB72jRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBSY7AHvf7tR/9SVHm+KiJhTB4nOvzAKBggqhkjOPQQDAwNpADBmAjEAwGEGrfGZR1cen1R8/DTVMI943LssZmJRtDp/i7SfGHmGRP6gRbuj9vOK3b67Z0QQAjEAuT2H673LQEaHTcyQSZrkp4mX7WwkmF+sVbkYY5mXN+RMH13KUEHHOqASaemYWK/E" }] },
		"validFor": { "start": "2025-07-04T00:00:00Z" }
	}]
};
var STATEMENT_TYPE = "https://in-toto.io/Statement/v1";
var PREDICATE_TYPE = "https://slsa.dev/provenance/v1";
var LEGACY_GITHUB_WORKFLOW_BUILD_TYPE = "https://slsa-framework.github.io/github-actions-buildtypes/workflow/v1";
var GITHUB_WORKFLOW_BUILD_TYPE = "https://actions.github.io/buildtypes/workflow/v1";
var LEGACY_GITHUB_HOSTED_BUILDER_ID = "https://github.com/actions/runner/github-hosted";
var GITHUB_HOSTED_RUNNER = "github-hosted";
var GITHUB_OIDC_ISSUER = "https://token.actions.githubusercontent.com";
var DSSE_PAYLOAD_TYPE = "application/vnd.in-toto+json";
var FULCIO_OID_PREFIX = "1.3.6.1.4.1.57264.1.";
var GIT_COMMIT_RE = /^[0-9a-f]{40}$/;
var GITHUB_WORKFLOW_PATH_RE = /^\.github\/workflows\/.+\.ya?ml$/;
var DECIMAL_RE = /^[1-9][0-9]*$/;
var BASE64_RE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
var HEX_RE = /^[0-9a-f]+$/;
var REGEX_META_RE = /[\\^$.*+?()[\]{}|]/g;
var SUPPORTED_SUBJECT_DIGESTS = /* @__PURE__ */ new Map([
	["sha256", 32],
	["sha384", 48],
	["sha512", 64]
]);
var decoder$1 = new TextDecoder("utf-8", {
	fatal: true,
	ignoreBOM: false
});
var verifier = new import_dist$2.Verifier((0, import_dist$2.toTrustMaterial)(import_dist$1.TrustedRoot.fromJSON(sigstore_public_good_v1_default)), {
	tlogThreshold: 1,
	ctlogThreshold: 1,
	timestampThreshold: 1
});
var GitHubProvenanceVerifier = class {
	async verify(input) {
		try {
			const snapshot = snapshotInput(input);
			if (!(await verifyMultihash(snapshot.document, snapshot.reference.checksum)).success) return unverifiable();
			const serializedBundle = parseJson(snapshot.document);
			const expected = validateStatement(parseStatement(serializedBundle), snapshot);
			const bundle = (0, import_dist.bundleFromJSON)(serializedBundle);
			validateSignerIdentity(verifier.verify((0, import_dist$2.toSignedEntity)(bundle), {
				subjectAlternativeName: exactRegexPattern(expected.signerId),
				extensions: { issuer: GITHUB_OIDC_ISSUER }
			}).identity, expected);
			return {
				success: true,
				value: {
					predicateType: PREDICATE_TYPE,
					artifactDigest: expected.artifactDigest,
					sourceRepository: expected.repository,
					builderId: expected.builderId,
					repositoryId: expected.repositoryId,
					workflowRef: expected.workflowRef,
					commitSha: expected.commitSha,
					invocationId: expected.invocationId
				}
			};
		} catch {
			return unverifiable();
		}
	}
};
function snapshotInput(input) {
	return {
		document: new Uint8Array(input.document),
		reference: {
			builderId: input.reference.builderId,
			checksum: input.reference.checksum,
			predicateType: input.reference.predicateType,
			sourceRepository: input.reference.sourceRepository,
			url: input.reference.url
		},
		artifactDigest: new Uint8Array(input.artifactDigest),
		artifactDigests: input.artifactDigests?.map((digest) => new Uint8Array(digest)),
		profileRepository: input.profileRepository
	};
}
function exactRegexPattern(value) {
	return `^${value.replace(REGEX_META_RE, "\\$&")}$`;
}
function parseJson(document) {
	return JSON.parse(decoder$1.decode(document));
}
function parseStatement(serializedBundle) {
	const bundle = requireObject(serializedBundle);
	const mediaType = requireString(bundle.mediaType);
	if (mediaType !== import_dist.BUNDLE_V03_MEDIA_TYPE && mediaType !== import_dist.BUNDLE_V03_LEGACY_MEDIA_TYPE) throw new Error("Unsupported Sigstore bundle format");
	if ("messageSignature" in bundle || !("dsseEnvelope" in bundle)) throw new Error("Only DSSE Sigstore bundles are supported");
	const envelope = requireObject(bundle.dsseEnvelope);
	if (requireString(envelope.payloadType) !== DSSE_PAYLOAD_TYPE) throw new Error("Unsupported DSSE payload type");
	const statement = requireObject(JSON.parse(decoder$1.decode(decodeBase64(requireString(envelope.payload)))));
	const statementType = requireString(statement._type);
	const predicateType = requireString(statement.predicateType);
	if (statementType !== STATEMENT_TYPE || predicateType !== PREDICATE_TYPE || !Array.isArray(statement.subject)) throw new Error("Unsupported provenance statement");
	return {
		_type: statementType,
		subject: statement.subject,
		predicateType,
		predicate: requireObject(statement.predicate)
	};
}
function validateStatement(statement, input) {
	if (input.reference.predicateType !== PREDICATE_TYPE) throw new Error("Provenance predicate reference mismatch");
	const artifactDigest = validateArtifactSubject(statement.subject, [input.artifactDigest, ...input.artifactDigests ?? []]);
	const profileRepository = requireRepository(input.profileRepository);
	const referenceRepository = requireRepository(input.reference.sourceRepository);
	const buildDefinition = requireObject(statement.predicate.buildDefinition);
	const buildType = requireString(buildDefinition.buildType);
	if (buildType !== GITHUB_WORKFLOW_BUILD_TYPE && buildType !== LEGACY_GITHUB_WORKFLOW_BUILD_TYPE) throw new Error("Unsupported SLSA build type");
	const workflow = requireObject(requireObject(buildDefinition.externalParameters).workflow);
	const attestedRepository = requireRepository(requireString(workflow.repository));
	if (attestedRepository !== referenceRepository || referenceRepository !== profileRepository) throw new Error("Repository identity mismatch");
	const workflowPath = requireString(workflow.path);
	const workflowRef = requireString(workflow.ref);
	if (!GITHUB_WORKFLOW_PATH_RE.test(workflowPath)) throw new Error("Unsupported GitHub workflow path");
	if (!workflowRef.startsWith("refs/")) throw new Error("Invalid GitHub workflow ref");
	const builderId = `${attestedRepository}/${workflowPath}@${workflowRef}`;
	if (builderId !== input.reference.builderId) throw new Error("Workflow identity mismatch");
	const github = requireObject(requireObject(buildDefinition.internalParameters).github);
	const repositoryId = requireDecimalString(github.repository_id);
	const runDetails = requireObject(statement.predicate.runDetails);
	const invocationId = requireHttpsUrl(requireString(requireObject(runDetails.metadata).invocationId));
	const slsaBuilderId = requireString(requireObject(runDetails.builder).id);
	const signerPrefix = `${attestedRepository}/`;
	const signerSuffix = `@${workflowRef}`;
	const signerPath = slsaBuilderId.slice(signerPrefix.length, -signerSuffix.length);
	if (!(buildType === LEGACY_GITHUB_WORKFLOW_BUILD_TYPE ? slsaBuilderId === LEGACY_GITHUB_HOSTED_BUILDER_ID : slsaBuilderId.startsWith(signerPrefix) && slsaBuilderId.endsWith(signerSuffix) && GITHUB_WORKFLOW_PATH_RE.test(signerPath) && github.runner_environment === GITHUB_HOSTED_RUNNER)) throw new Error("Unsupported GitHub Actions runner class");
	const dependencies = buildDefinition.resolvedDependencies;
	if (!Array.isArray(dependencies)) throw new Error("Missing resolved dependency");
	const expectedUri = `git+${attestedRepository}@${workflowRef}`;
	const matching = dependencies.filter((dependency) => requireString(requireObject(dependency).uri) === expectedUri);
	if (matching.length !== 1) throw new Error("Ambiguous resolved dependency");
	const commitSha = requireString(requireObject(requireObject(matching[0]).digest).gitCommit);
	if (!GIT_COMMIT_RE.test(commitSha)) throw new Error("Invalid Git commit digest");
	return {
		artifactDigest,
		repository: attestedRepository,
		builderId,
		signerId: buildType === LEGACY_GITHUB_WORKFLOW_BUILD_TYPE ? builderId : slsaBuilderId,
		workflowRef,
		commitSha,
		repositoryId,
		invocationId
	};
}
function validateArtifactSubject(subjects, artifactDigests) {
	for (const value of subjects) {
		const digest = requireObject(requireObject(value).digest);
		for (const [algorithm, expectedLength] of SUPPORTED_SUBJECT_DIGESTS) {
			if (!(algorithm in digest)) continue;
			const bytes = decodeHex(requireString(digest[algorithm]));
			if (bytes.byteLength !== expectedLength) throw new Error("Invalid subject digest length");
			const matched = artifactDigests.find((candidate) => compareDigestBytes(bytes, candidate));
			if (matched) return new Uint8Array(matched);
		}
	}
	throw new Error("Artifact digest mismatch");
}
function validateSignerIdentity(identity, expected) {
	if (identity?.subjectAlternativeName !== expected.signerId || identity.extensions?.issuer !== GITHUB_OIDC_ISSUER) throw new Error("Certificate identity mismatch");
	const oids = identity.oids ?? [];
	const issuer = readRequiredOid(oids, 8);
	const buildSignerUri = readRequiredOid(oids, 9);
	const buildSignerDigest = readRequiredOid(oids, 10);
	const runnerEnvironment = readRequiredOid(oids, 11);
	const sourceRepository = requireRepository(readRequiredOid(oids, 12));
	const sourceDigest = readRequiredOid(oids, 13);
	const sourceRef = readRequiredOid(oids, 14);
	const repositoryId = readRequiredOid(oids, 15);
	const buildConfigUri = readRequiredOid(oids, 18);
	const buildConfigDigest = readRequiredOid(oids, 19);
	const invocationId = readRequiredOid(oids, 21);
	if (issuer !== GITHUB_OIDC_ISSUER || buildSignerUri !== expected.signerId || buildConfigUri !== expected.builderId || buildSignerDigest !== expected.commitSha || runnerEnvironment !== GITHUB_HOSTED_RUNNER || sourceDigest !== expected.commitSha || buildConfigDigest !== expected.commitSha || sourceRepository !== expected.repository || sourceRef !== expected.workflowRef || repositoryId !== expected.repositoryId || invocationId !== expected.invocationId) throw new Error("Certificate and predicate identity mismatch");
}
function readRequiredOid(oids, suffix) {
	const expectedOid = `${FULCIO_OID_PREFIX}${suffix}`;
	const matches = oids.filter((pair) => pair.oid?.id.join(".") === expectedOid);
	if (matches.length !== 1) throw new Error("Missing or duplicate Fulcio identity OID");
	const value = matches[0]?.value;
	if (!value) throw new Error("Missing Fulcio identity OID value");
	return decodeDerUtf8String(value);
}
function decodeDerUtf8String(value) {
	if (value[0] !== 12 || value.byteLength < 2) throw new Error("Malformed DER UTF8String");
	const firstLength = value[1];
	if (firstLength === void 0) throw new Error("Malformed DER UTF8String");
	let offset = 2;
	let length;
	if (firstLength < 128) length = firstLength;
	else {
		const lengthBytes = firstLength & 127;
		if (lengthBytes === 0 || lengthBytes > 2 || value.byteLength < 2 + lengthBytes) throw new Error("Malformed DER UTF8String length");
		length = 0;
		for (let index = 0; index < lengthBytes; index += 1) length = length * 256 + (value[offset + index] ?? 0);
		if (length < 128 || lengthBytes === 2 && length < 256) throw new Error("Non-canonical DER UTF8String length");
		offset += lengthBytes;
	}
	if (length === 0 || offset + length !== value.byteLength) throw new Error("Malformed DER UTF8String value");
	return decoder$1.decode(value.subarray(offset));
}
function requireRepository(value) {
	const repository = canonicalizeRepositoryUrl(value);
	if (!repository) throw new Error("Invalid repository URL");
	return repository;
}
function requireHttpsUrl(value) {
	const url = new URL(value);
	if (url.protocol !== "https:" || url.username || url.password || url.hash || url.port || url.toString() !== value) throw new Error("Invalid HTTPS URL");
	return value;
}
function requireDecimalString(value) {
	const result = requireString(value);
	if (!DECIMAL_RE.test(result)) throw new Error("Invalid decimal identity");
	return result;
}
function requireObject(value) {
	if (!isRecord$1(value)) throw new Error("Expected an object");
	return value;
}
function isRecord$1(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function requireString(value) {
	if (typeof value !== "string" || value.length === 0) throw new Error("Expected a string");
	return value;
}
function decodeBase64(value) {
	if (!BASE64_RE.test(value)) throw new Error("Invalid base64");
	return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}
function decodeHex(value) {
	if (!HEX_RE.test(value) || value.length % 2 !== 0) throw new Error("Invalid hexadecimal digest");
	return Uint8Array.from(value.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
}
function unverifiable() {
	return verificationError("PROVENANCE_UNVERIFIABLE", "The supplied provenance could not be verified.");
}
var DEFAULT_POLICY = {
	requireProvenance: false,
	confirmation: "escalation-only",
	approvers: []
};
/** Validate signed profile/release records without evaluating provenance evidence. */
async function inspectPackageReleaseRecords(input) {
	const profile = await parseLexicon(PackageProfile.mainSchema, input.profile);
	if (!profile) return failed("PROFILE_LEXICON_INVALID", "The package profile is malformed.");
	if (!isPluginSlug(input.package)) return failed("RELEASE_PACKAGE_MISMATCH", "The expected package slug is invalid.");
	const expectedProfileId = `at://${input.publisherDid}/${NSID.packageProfile}/${input.package}`;
	if (profile.id !== expectedProfileId || profile.slug !== void 0 && profile.slug !== input.package) return failed("PROFILE_ID_MISMATCH", "The profile does not match its authoritative record identity.");
	let profileExtension = null;
	let repository = null;
	let policy = {
		...DEFAULT_POLICY,
		approvers: []
	};
	const rawProfileExtension = isRecord$2(profile.extensions) ? profile.extensions[NSID.packageProfileExtension] : void 0;
	if (rawProfileExtension === void 0) {
		if (profile.extensions !== void 0 && !isRecord$2(profile.extensions)) return failed("PROFILE_EXTENSION_INVALID", "The signed repository extension is malformed.");
	} else {
		profileExtension = await parseLexicon(PackageProfileExtension.mainSchema, rawProfileExtension);
		if (!profileExtension) return failed("PROFILE_EXTENSION_INVALID", "The signed repository extension is malformed.");
		repository = canonicalizeRepositoryUrl(profileExtension.repository);
		if (!repository || repository !== profileExtension.repository) return failed("PROFILE_REPOSITORY_INVALID", "The signed repository anchor is not canonical HTTPS.");
		const normalizedPolicy = normalizePolicy(profileExtension.releasePolicy);
		if (!normalizedPolicy) return failed("PROFILE_POLICY_INVALID", "The signed release policy is invalid.");
		policy = normalizedPolicy;
	}
	const release = await parseLexicon(PackageRelease.mainSchema, input.release);
	if (!release) return failed("RELEASE_LEXICON_INVALID", "The package release is malformed.");
	if (release.package !== input.package) return failed("RELEASE_PACKAGE_MISMATCH", "The release package does not match the requested package.");
	if (!isComparablePluginVersion(release.version)) return failed("RELEASE_VERSION_INVALID", "The release version is not canonical semver.");
	if (release.version !== input.version) return failed("RELEASE_VERSION_MISMATCH", "The release version does not match the requested version.");
	if (input.rkey !== `${input.package}:${release.version}`) return failed("RELEASE_RKEY_MISMATCH", "The release record key does not match package and version.");
	const artifactFailure = validateArtifacts(release);
	if (artifactFailure) return failed(artifactFailure.code, artifactFailure.message);
	const authFailure = unsupportedAuth(release);
	if (authFailure) return failed(authFailure.code, authFailure.message, "not-checked", authFailure.details);
	if (release.extensions === void 0) return failed("RELEASE_EXTENSION_MISSING", "The EmDash release extension is absent.");
	if (!isRecord$2(release.extensions)) return failed("RELEASE_EXTENSION_INVALID", "The EmDash release extension is malformed.");
	const rawReleaseExtension = release.extensions[NSID.packageReleaseExtension];
	if (rawReleaseExtension === void 0) return failed("RELEASE_EXTENSION_MISSING", "The EmDash release extension is absent.");
	const releaseExtension = await parseLexicon(PackageReleaseExtension.mainSchema, rawReleaseExtension);
	if (!releaseExtension) return failed("RELEASE_EXTENSION_INVALID", "The EmDash release extension is malformed.");
	const declaredAccess = canonicalizeDeclaredAccess(releaseExtension.declaredAccess);
	return {
		success: true,
		status: "inspected",
		code: "VERIFIED",
		reasons: [{
			code: "VERIFIED",
			message: "The signed package records are valid."
		}],
		provenance: { status: "not-checked" },
		value: {
			profile,
			release,
			profileExtension,
			releaseExtension,
			repository,
			policy,
			declaredAccess
		}
	};
}
async function verifyPackageReleaseRecordsInternal(input, defaultVerifier) {
	const inspection = await inspectPackageReleaseRecords(input);
	if (!inspection.success) return inspection;
	const context = inspection.value;
	const { policy, release, releaseExtension, repository } = context;
	if (!releaseExtension.provenance) {
		if (policy.requireProvenance) return failed("PROVENANCE_REQUIRED", "The signed policy requires provenance, but the release has none.", "absent-required");
		return {
			success: true,
			status: "unattested",
			code: "PROVENANCE_ABSENT_OPTIONAL",
			reasons: [{
				code: "PROVENANCE_ABSENT_OPTIONAL",
				message: "The release has no provenance and the signed policy permits it."
			}],
			provenance: { status: "absent-optional" },
			value: context
		};
	}
	if (repository === null) return failed("PROVENANCE_UNVERIFIABLE", "The release supplies provenance, but its signed profile has no repository anchor.", "failed");
	if (!input.provenance) return failed("PROVENANCE_UNVERIFIABLE", "The release supplies provenance, but no verification evidence was provided.", "failed");
	const artifactChecksum = decodeMultihash(release.artifacts.package.checksum);
	if (!artifactChecksum.success) return failed(artifactChecksum.error.code, artifactChecksum.error.message, "failed");
	if (!compareDigestBytes(input.provenance.artifactDigest, artifactChecksum.value.digest)) return failed("CHECKSUM_MISMATCH", "The artifact digest does not match the signed package checksum.", "failed");
	const verifier = input.provenance.verifier ?? defaultVerifier;
	if (!verifier) return failed("PROVENANCE_UNVERIFIABLE", "The supplied provenance verifier is unavailable.", "failed");
	let provenanceResult;
	try {
		provenanceResult = await verifier.verify({
			document: input.provenance.document,
			reference: releaseExtension.provenance,
			artifactDigest: input.provenance.artifactDigest,
			artifactDigests: input.provenance.artifactDigests,
			profileRepository: repository
		});
	} catch {
		return failed("PROVENANCE_UNVERIFIABLE", "The supplied provenance could not be verified.", "failed");
	}
	if (!provenanceResult.success) return failed(provenanceResult.error.code, provenanceResult.error.message, "failed");
	return {
		success: true,
		status: "verified",
		code: "VERIFIED",
		reasons: [{
			code: "VERIFIED",
			message: "The signed records and provenance are valid."
		}],
		provenance: { status: "verified" },
		value: {
			...context,
			verifiedProvenance: provenanceResult.value
		}
	};
}
function verifyPackageReleaseRecordsWithDefaultVerifier(input, defaultVerifier) {
	return verifyPackageReleaseRecordsInternal(input, defaultVerifier);
}
function normalizePolicy(value) {
	if (!value) return {
		...DEFAULT_POLICY,
		approvers: []
	};
	const confirmation = value.confirmation ?? DEFAULT_POLICY.confirmation;
	if (!isConfirmation(confirmation)) return null;
	const approvers = value.approvers ?? [];
	if (new Set(approvers).size !== approvers.length) return null;
	return {
		requireProvenance: value.requireProvenance ?? false,
		confirmation,
		approvers: [...approvers]
	};
}
function isConfirmation(value) {
	return value === "always" || value === "escalation-only";
}
function isComparablePluginVersion(value) {
	if (!isPluginVersion(value)) return false;
	const prereleaseSeparator = value.indexOf("-");
	return value.slice(0, prereleaseSeparator === -1 ? void 0 : prereleaseSeparator).split(".").every((component) => Number.isSafeInteger(Number(component)));
}
function failed(code, message, provenance = "not-checked", details) {
	return {
		success: false,
		status: "failed",
		code,
		reasons: [{
			code,
			message
		}],
		provenance: { status: provenance },
		...details === void 0 ? {} : { details }
	};
}
function validateArtifacts(release) {
	const artifacts = [
		release.artifacts.package,
		release.artifacts.icon,
		release.artifacts.banner,
		...release.artifacts.screenshots ?? []
	];
	for (const value of artifacts) {
		if (value === void 0) continue;
		if (!isRecord$2(value)) return {
			code: "RELEASE_LEXICON_INVALID",
			message: "A release artifact is malformed."
		};
		const hasUrl = typeof value.url === "string" && value.url.length > 0;
		const blob = value.blob;
		const hasBlob = isRecord$2(blob);
		if (!hasUrl && !hasBlob) return {
			code: "RELEASE_ARTIFACT_SOURCE_MISSING",
			message: "Every release artifact must provide a blob or URL."
		};
		if (hasBlob) {
			const ref = blob.ref;
			const cid = isRecord$2(ref) ? ref.$link : void 0;
			if (typeof cid !== "string") return {
				code: "BLOB_REF_INVALID",
				message: "The blob reference CID is malformed."
			};
			const expected = multihashFromBlobCid(cid);
			if (!expected.success) return expected.error;
			if (value.checksum !== expected.value) return {
				code: "CHECKSUM_MISMATCH",
				message: "The artifact checksum does not match its blob reference CID."
			};
		}
	}
	return null;
}
function unsupportedAuth(release) {
	const gated = [
		release.artifacts.package,
		release.artifacts.icon,
		release.artifacts.banner,
		...release.artifacts.screenshots ?? []
	].some((artifact) => artifact?.requiresAuth === true);
	if (release.auth === void 0 && !gated) return null;
	const details = unsupportedAuthDetails(release.auth);
	return {
		code: "AUTH_METHOD_UNSUPPORTED",
		message: UNSUPPORTED_AUTH_MESSAGE,
		...details === void 0 ? {} : { details }
	};
}
async function parseLexicon(schema, value) {
	const result = await schema["~standard"].validate(value);
	return result.issues ? null : result.value;
}
function isRecord$2(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Validate signed profile/release records and apply the complete provenance policy. */
function verifyPackageReleaseRecords(input) {
	return verifyPackageReleaseRecordsWithDefaultVerifier(input, new GitHubProvenanceVerifier());
}
var MAX_PROVENANCE_BYTES = 5242880;
var AUTHORITATIVE_READER_OVERRIDE = Symbol.for("emdash.registry.authoritativeRecordReader");
async function readAuthoritativePackageRelease(publisherDid, packageSlug, version, options = {}) {
	const override = globalThis[AUTHORITATIVE_READER_OVERRIDE];
	if (override) return override(publisherDid, packageSlug, version, options);
	try {
		const client = new DirectPdsClient({
			did: publisherDid,
			fetch: options.fetch ?? guardedFetch,
			didDocumentResolver: options.didDocumentResolver
		});
		const [profile, release] = await Promise.all([client.getPackageProfile(packageSlug), client.getPackageRelease(packageSlug, version)]);
		const inspection = await inspectPackageReleaseRecords({
			publisherDid,
			package: packageSlug,
			version,
			rkey: release.rkey,
			profileCid: profile.cid,
			profile: profile.value,
			release: release.value
		});
		if (!inspection.success) return {
			success: false,
			error: {
				code: inspection.code,
				message: inspection.reasons[0]?.message ?? "The signed package records are invalid."
			}
		};
		return {
			success: true,
			value: {
				publisherDid,
				packageSlug,
				version,
				profile,
				release,
				inspection
			}
		};
	} catch (error) {
		if (error instanceof DirectPdsReadError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "AUTHORITATIVE_RECORD_READ_FAILED",
				message: "The publisher's signed package records could not be verified."
			}
		};
	}
}
async function verifyAuthoritativePackageRelease(records, artifactDigest, options = {}) {
	const context = records.inspection.value;
	const provenanceReference = context.releaseExtension.provenance;
	if (provenanceReference && context.repository === null) return verificationFailure("PROVENANCE_UNVERIFIABLE", "The release supplies provenance, but its signed profile has no repository anchor.");
	let document;
	if (provenanceReference) {
		const fetched = await fetchVerifiedResource(provenanceReference.url, {
			fetch: options.provenanceFetch ?? defaultProvenanceFetch,
			resolveHostname: options.resolveHostname ?? cloudflareDohResolver,
			maxBytes: MAX_PROVENANCE_BYTES
		});
		if (!fetched.success) return verificationFailure(fetched.error.code, fetched.error.message);
		const checksum = await verifyMultihash(fetched.value.bytes, provenanceReference.checksum);
		if (!checksum.success) return verificationFailure(checksum.error.code, checksum.error.message);
		document = fetched.value.bytes;
	}
	return verifyPackageReleaseRecords({
		publisherDid: records.publisherDid,
		package: records.packageSlug,
		version: records.version,
		rkey: records.release.rkey,
		profileCid: records.profile.cid,
		profile: records.profile.value,
		release: records.release.value,
		provenance: document === void 0 ? void 0 : {
			document,
			artifactDigest,
			artifactDigests: options.artifactDigests,
			verifier: options.provenanceVerifier
		}
	});
}
function verificationFailure(code, message) {
	return {
		success: false,
		status: "failed",
		code,
		reasons: [{
			code,
			message
		}],
		provenance: { status: "failed" }
	};
}
var guardedFetch = async (input, init) => {
	return ssrfSafeFetch(input instanceof Request ? input.url : String(input), init, { httpsOnly: true });
};
var defaultProvenanceFetch = (input, init) => globalThis.fetch(input, init);
// node_modules/emdash/dist/api--PYoyeTo.mjs
/**
* Generate a _rev token from a content item's version and updatedAt.
*/
function encodeRev(item) {
	return encodeBase64(`${item.version}:${item.updatedAt}`);
}
/**
* Decode a _rev token into its components.
* Returns null if the token is malformed.
*/
function decodeRev(rev) {
	try {
		const decoded = decodeBase64$1(rev);
		const colonIdx = decoded.indexOf(":");
		if (colonIdx === -1) return null;
		const version = parseInt(decoded.slice(0, colonIdx), 10);
		const updatedAt = decoded.slice(colonIdx + 1);
		if (isNaN(version) || !updatedAt) return null;
		return {
			version,
			updatedAt
		};
	} catch {
		return null;
	}
}
/**
* Validate a _rev token against a content item.
* Returns null if valid (or if no _rev provided), or an error message if invalid.
*/
function validateRev(rev, item) {
	if (!rev) return { valid: true };
	const decoded = decodeRev(rev);
	if (!decoded) return {
		valid: false,
		message: "Malformed _rev token"
	};
	if (decoded.version !== item.version || decoded.updatedAt !== item.updatedAt) return {
		valid: false,
		message: "Content has been modified since last read (version conflict)"
	};
	return { valid: true };
}
/** One bound field's live selection as translation groups. */
async function liveFieldSelection(repo, field, entryGroup) {
	return (field.relationSide === "child" ? await repo.getParents(field.relation, entryGroup) : await repo.getChildren(field.relation, entryGroup)).map((link) => field.relationSide === "child" ? link.parentGroup : link.childGroup);
}
/**
* Re-check what publication is about to make live against the relation's current
* cardinality.
*
* A draft can sit unpublished across a schema edit that makes its field required
* or narrows the relation's limits, and across another entry claiming what it
* selected. It is publication — not the save that staged it — that has to hold
* the line on both ends. So this walks the collection's bound fields rather than
* the staged keys: a field added as required after the entry was written appears
* in no existing draft, and iterating `staged` would never reach it. A field the
* draft does stage needs no link read.
*/
async function validateStagedReferences(db, collection, staged, entryGroup, baselines) {
	const repo = new RelationRepository(db);
	for (const field of (await referenceFieldConstraints(db, collection)).values()) {
		const isStaged = Object.hasOwn(staged, field.slug);
		let groups = isStaged ? staged[field.slug] ?? [] : void 0;
		const baseline = baselines?.[field.slug];
		if (groups && baseline) {
			const live = await liveFieldSelection(repo, field, entryGroup);
			groups = applyReferenceDiff(baseline, groups, live);
		}
		groups ??= await liveFieldSelection(repo, field, entryGroup);
		const valid = validateReferenceSelection(field, groups);
		if (!valid.success) return valid;
		if (!isStaged || field.relationId === null) continue;
		const far = await validateOppositeSideLimit(db, {
			relationId: field.relationId,
			farLimit: field.maxOpposite,
			side: field.relationSide,
			entryGroup,
			groups
		});
		if (!far.success) return far;
	}
	return {
		success: true,
		data: true
	};
}
/**
* The live selection, in the same shape a draft stages: every bound reference
* field on the collection, by field slug, as translation groups.
*
* One link read per bound field. Used where both selections have to be
* comparable — the live and draft sides of a compare — never on a render path.
*/
async function liveReferenceSelection(db, collection, entryGroup) {
	const repo = new RelationRepository(db);
	const selection = {};
	for (const field of (await referenceFieldConstraints(db, collection)).values()) selection[field.slug] = await liveFieldSelection(repo, field, entryGroup);
	return selection;
}
/**
* Compute the selection that results from applying the staged-versus-baseline
* diff on top of the current live selection.
*
* Additions and removals made in the draft win. Items the draft left unchanged
* follow the current live selection, preserving additions and removals made
* from the relation's opposite end.
*/
function applyReferenceDiff(baseline, staged, live) {
	const baselineSet = new Set(baseline);
	const stagedSet = new Set(staged);
	const liveSet = new Set(live);
	const additionSet = new Set(staged.filter((group) => !baselineSet.has(group)));
	const removalSet = new Set(baseline.filter((group) => !stagedSet.has(group)));
	const result = [];
	const seen = /* @__PURE__ */ new Set();
	for (const group of staged) {
		if (!additionSet.has(group) && !liveSet.has(group) || seen.has(group)) continue;
		result.push(group);
		seen.add(group);
	}
	for (const group of live) {
		if (removalSet.has(group) || seen.has(group)) continue;
		result.push(group);
		seen.add(group);
	}
	return result;
}
/**
* Record the complete live selection in the revision publication just made live.
*
* A draft stages only the fields its saves named, and a revision written from
* the columns stages none. Restoring either would otherwise leave whatever was
* published after it linked in the fields it does not carry.
*/
async function recordPublishedReferences(db, collection, revisionId, entryGroup) {
	const selection = await liveReferenceSelection(db, collection, entryGroup);
	if (Object.keys(selection).length === 0) return;
	await new RevisionRepository(db).mergeData(revisionId, { [STAGED_REFERENCES_KEY]: selection });
}
/**
* Promote a staged selection to live links.
*
* A field slug the collection no longer carries as a bound reference field is
* skipped: the revision outlived the field, and there is no relation left to
* write into.
*
* When `baselines` are provided, each staged field is promoted as a diff
* against its baseline rather than as a wholesale replacement. That prevents a
* draft saved before a concurrent opposite-end publish from undoing the links
* that publish added or removed.
*/
async function applyStagedReferences(db, collection, entryGroup, staged, baselines) {
	const constraints = await referenceFieldConstraints(db, collection);
	const repo = new RelationRepository(db);
	for (const [fieldSlug, groups] of Object.entries(staged)) {
		const field = constraints.get(fieldSlug);
		if (!field) continue;
		const baseline = baselines?.[fieldSlug];
		let selection;
		if (baseline) selection = applyReferenceDiff(baseline, groups, await liveFieldSelection(repo, field, entryGroup));
		else selection = groups;
		await writeReferenceSelection(db, {
			relation: field.relation,
			side: field.relationSide,
			entryGroup,
			groups: selection
		});
	}
}
function asMediaRef(value) {
	if (value === null || value === void 0) return null;
	if (typeof value !== "object" || Array.isArray(value)) return null;
	return value;
}
function fail(message) {
	return {
		success: false,
		error: {
			code: "INVALID_MIME_FOR_FIELD",
			message
		}
	};
}
function addTarget(targets, path, value, allowedMimeTypes, includeDarkVariant) {
	if (!allowedMimeTypes?.length || value == null) return;
	targets.push({
		path,
		value,
		allowedMimeTypes: [...allowedMimeTypes]
	});
	const ref = includeDarkVariant ? asMediaRef(value) : null;
	if (ref && "darkVariant" in ref && ref.darkVariant != null) targets.push({
		path: `${path}.darkVariant`,
		value: ref.darkVariant,
		allowedMimeTypes: [...allowedMimeTypes]
	});
}
function collectBlockTargets(targets, field, value) {
	if (!Array.isArray(value)) return {
		success: true,
		data: true
	};
	const types = new Map((field.blockTypes ?? []).map((type) => [type.slug, type]));
	for (const [index, block] of value.entries()) {
		if (!block || typeof block !== "object" || Array.isArray(block)) continue;
		const typeSlug = "_type" in block && typeof block._type === "string" ? block._type : void 0;
		const versionNumber = "_version" in block && typeof block._version === "number" ? block._version : void 0;
		const key = "_key" in block && typeof block._key === "string" ? block._key : String(index);
		const type = typeSlug ? types.get(typeSlug) : void 0;
		const version = type?.versions.find((candidate) => candidate.version === versionNumber);
		if (!type || !version || version.unsupportedTypes?.length) return {
			success: false,
			error: {
				code: "UNSUPPORTED_FIELD_TYPE",
				message: `Field '${field.slug}' block '${key}' has no retained definition`
			}
		};
		for (const nestedField of version.fields) {
			const nestedValue = nestedField.slug in block ? block[nestedField.slug] : void 0;
			const nestedPath = `${field.slug}.${key}.${nestedField.slug}`;
			if (nestedField.type !== "image" && nestedField.type !== "file") continue;
			addTarget(targets, nestedPath, nestedValue, nestedField.validation?.allowedMimeTypes, nestedField.type === "image");
		}
	}
	return {
		success: true,
		data: true
	};
}
async function loadMediaFieldsForCollection(db, collectionSlug) {
	const rows = await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug",
		"_emdash_fields.type",
		"_emdash_fields.validation"
	]).where("_emdash_collections.slug", "=", collectionSlug).where("_emdash_fields.type", "in", [
		"file",
		"image",
		"blocks"
	]).execute();
	const out = [];
	const allBlockTypes = rows.some((row) => row.type === "blocks") ? await new BlockTypeRegistry(db).listBlockTypes() : [];
	const blockTypeBySlug = new Map(allBlockTypes.map((type) => [type.slug, type]));
	for (const row of rows) {
		if (row.type === "blocks") {
			let validation;
			try {
				validation = row.validation ? JSON.parse(row.validation) : {};
			} catch {
				validation = {};
			}
			let configured = [];
			if (validation && typeof validation === "object" && !Array.isArray(validation)) {
				const allowed = "allowedTypes" in validation && Array.isArray(validation.allowedTypes) ? validation.allowedTypes : [];
				const retired = "retiredTypes" in validation && Array.isArray(validation.retiredTypes) ? validation.retiredTypes : [];
				configured = [...allowed, ...retired];
			}
			out.push({
				slug: row.slug,
				type: row.type,
				allowedMimeTypes: [],
				blockTypes: configured.flatMap((slug) => {
					const type = typeof slug === "string" ? blockTypeBySlug.get(slug) : void 0;
					return type ? [type] : [];
				})
			});
			continue;
		}
		const list = parseAllowedMimeTypes(row.validation);
		if (!list) continue;
		out.push({
			slug: row.slug,
			type: row.type,
			allowedMimeTypes: list
		});
	}
	return out;
}
async function validateMediaFields(db, collectionSlug, data) {
	const fields = await requestCached(`mediaFields:${collectionSlug}`, () => loadMediaFieldsForCollection(db, collectionSlug));
	if (fields.length === 0) return {
		success: true,
		data: true
	};
	const targets = [];
	for (const field of fields) {
		const value = data[field.slug];
		if (field.type === "blocks") {
			const collected = collectBlockTargets(targets, field, value);
			if (!collected.success) return collected;
		} else addTarget(targets, field.slug, value, field.allowedMimeTypes, field.type === "image");
	}
	if (targets.length === 0) return {
		success: true,
		data: true
	};
	const localIds = /* @__PURE__ */ new Set();
	for (const target of targets) {
		const ref = asMediaRef(target.value);
		if (!ref) continue;
		if ((typeof ref.provider === "string" ? ref.provider : "local") === "local" && typeof ref.id === "string") localIds.add(ref.id);
	}
	const idList = [...localIds];
	const mimeById = /* @__PURE__ */ new Map();
	if (idList.length > 0) for (const batch of chunks(idList, 50)) {
		const rows = await db.selectFrom("media").select(["id", "mime_type"]).where("id", "in", batch).execute();
		for (const r of rows) mimeById.set(r.id, r.mime_type);
	}
	for (const target of targets) {
		const ref = asMediaRef(target.value);
		if (!ref) continue;
		const provider = typeof ref.provider === "string" ? ref.provider : "local";
		let mime;
		if (provider === "local") {
			if (typeof ref.id !== "string") return fail(`Field '${target.path}' references media with an invalid id`);
			mime = mimeById.get(ref.id);
			if (!mime) return fail(`Field '${target.path}' references media with unknown MIME type`);
		} else {
			if (typeof ref.mimeType !== "string") return fail(`Field '${target.path}' requires a mimeType declaration for non-local media`);
			mime = ref.mimeType;
		}
		if (!matchesMimeAllowlist(mime, target.allowedMimeTypes)) return fail(`Field '${target.path}' does not accept ${mime}`);
	}
	return {
		success: true,
		data: true
	};
}
/**
* Narrow a caught error to one carrying a structured `apiError` discriminant.
* Used by transaction callbacks that want to surface a specific error code
* through the standard Error throwing path.
*/
function hasApiError(error) {
	if (!(error instanceof Error) || !("apiError" in error)) return false;
	const { apiError } = error;
	return typeof apiError === "object" && apiError !== null && "code" in apiError && typeof apiError.code === "string";
}
/**
* Abort the surrounding transaction when a relation's limit refused an edge.
*
* `farSide` names the end that filled up, which is the opposite of the end the
* refused group sits on: a child that cannot take another parent refuses with
* `"parent"`.
*/
function throwIfReferenceLimitRefused(rejected, farSide) {
	if (rejected.length === 0) return;
	throw Object.assign(/* @__PURE__ */ new Error(`Entry '${rejected[0]}' already has the maximum number of ${farSide} entries on this relation.`), { apiError: { code: "VALIDATION_ERROR" } });
}
/** The slug a draft revision stages, when it stages one. */
function readStagedSlug(data) {
	return typeof data?._slug === "string" ? data._slug : null;
}
/**
* Make every refusal `publish()` decides before it writes, ahead of it.
*
* `publish()` decides all of them again and stays authoritative; this does not
* replace it. It exists for the one caller that has irreversible work to do
* first — promoting a draft's staged reference selection, which nothing takes
* back where `withTransaction` degrades to plain statements. A refusal that
* landed after that promotion would leave a draft's links live on an entry that
* never published.
*
* The optimistic fence `publish()` ends on is not checked here, because it is
* the write itself: a publish lost to a concurrent edit still promotes.
*/
async function assertPublishWillNotBeRefused(db, collection, id, existing, options) {
	const { expectedRevision } = options;
	if (expectedRevision && (existing.version !== expectedRevision.version || existing.updatedAt !== expectedRevision.updatedAt)) throw new ContentMutationConflictError();
	if (options.requireDue && options.expectedScheduledAt !== void 0 && existing.scheduledAt !== options.expectedScheduledAt) throw new ScheduledNotDueError();
	const intendedSlug = options.stagedSlug ?? existing.slug;
	if (options.requireSlug && !intendedSlug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
	if (options.stagedSlug !== null && options.stagedSlug !== existing.slug && existing.locale !== null) {
		const conflict = await new ContentRepository(db).findBySlugIncludingTrashed(collection, options.stagedSlug, existing.locale);
		if (conflict && conflict.id !== id) throw new EmDashValidationError(`Cannot publish: slug '${options.stagedSlug}' is already used by another entry in this collection (id: ${conflict.id}). Choose a different slug.`, { code: "SLUG_CONFLICT" });
	}
}
function isTranslationLocaleConflict(error, collection) {
	if (!(error instanceof Error)) return false;
	const message = error.message.toLowerCase();
	const storedIndexName = `uidx_ec_${collection}_active_tg_locale`.slice(0, 63).toLowerCase();
	return message.includes(storedIndexName) || message.includes("unique constraint failed") && message.includes("translation_group") && message.includes("locale");
}
function decodeRevisionPrecondition(rev) {
	if (rev === void 0) return void 0;
	const decoded = decodeRev(rev);
	if (!decoded) throw new ContentMutationConflictError("Revision precondition did not match");
	return decoded;
}
/**
* Extract a slug source from content data: the collection's `titleField` when
* it sets one and the entry has a value for it, otherwise `title`, then `name`.
* Returns null if no suitable string field is found.
*/
function getSlugSource(data, titleField) {
	const configured = titleField ? data[titleField] : void 0;
	if (typeof configured === "string" && configured.length > 0) return configured;
	if (typeof data.title === "string" && data.title.length > 0) return data.title;
	if (typeof data.name === "string" && data.name.length > 0) return data.name;
	return null;
}
/** Default SEO values for content without an explicit SEO row */
var SEO_DEFAULTS = {
	title: null,
	description: null,
	image: null,
	canonical: null,
	noIndex: false
};
/**
* Check if a collection has SEO enabled.
*
* Cached per request so bulk imports do not re-query `_emdash_collections`
* for every item they create.
*/
async function collectionHasSeo(db, collection) {
	return requestCached(`collectionHasSeo:${collection}`, async () => {
		return (await db.selectFrom("_emdash_collections").select("has_seo").where("slug", "=", collection).executeTakeFirst())?.has_seo === 1;
	});
}
/**
* Collection publication metadata, cached per request for bulk imports.
*/
async function getCollectionPublishConfig(db, collection) {
	return requestCached(`collectionPublishConfig:${collection}`, async () => {
		const row = await db.selectFrom("_emdash_collections").select(["supports", "routable"]).where("slug", "=", collection).executeTakeFirst();
		const supports = row?.supports ? JSON.parse(row.supports) : [];
		return {
			supportsRevisions: Array.isArray(supports) && supports.includes("revisions"),
			routable: row?.routable !== 0
		};
	});
}
async function getCollectionTitleField(db, collection) {
	return requestCached(`collectionTitleField:${collection}`, async () => {
		return (await db.selectFrom("_emdash_collections").select("title_field").where("slug", "=", collection).executeTakeFirst())?.title_field ?? null;
	});
}
function requireRoutablePublishSlug(routable, slug) {
	if (routable && !slug?.trim()) throw new EmDashValidationError("Cannot publish routable content without a slug");
}
/**
* Hydrate SEO data on a single content item if the collection has SEO enabled.
*/
async function hydrateSeo(db, collection, item, hasSeo) {
	if (!hasSeo) return;
	item.seo = await new SeoRepository(db).get(collection, item.id);
}
/**
* Hydrate SEO data on multiple content items using a single batch query.
*/
async function hydrateSeoMany(db, collection, items, hasSeo) {
	if (!hasSeo || items.length === 0) return;
	const seoMap = await new SeoRepository(db).getMany(collection, items.map((i) => i.id));
	for (const item of items) item.seo = seoMap.get(item.id) ?? { ...SEO_DEFAULTS };
}
async function hydrateBylines(db, collection, item) {
	const bylineRepo = new BylineRepository(db);
	const localeOpt = item.locale ? { locale: item.locale } : void 0;
	const bylines = await bylineRepo.getContentBylines(collection, item.id, localeOpt);
	if (bylines.length > 0) {
		item.bylines = bylines.map((c) => ({
			...c,
			source: "explicit"
		}));
		item.byline = bylines[0]?.byline ?? null;
		return;
	}
	if (item.primaryBylineId) {
		item.bylines = [];
		item.byline = null;
		return;
	}
	if (item.authorId) {
		const fallback = await bylineRepo.findByUserId(item.authorId, localeOpt);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			return;
		}
	}
	item.bylines = [];
	item.byline = null;
}
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
/**
* Hydrate the first page of each reference field's selection onto a single
* content item, keyed by field slug — the same key the create and update bodies
* take a selection under.
*
* Callers must have already decided `includeDrafts` — draft visibility is
* enforced by the caller, not this helper — because a resolved entry can carry
* a draft or scheduled entry's id and slug. The admin's REST GET route is the
* only caller, and it asks for every entry it serves, so a collection with no
* reference field still pays the two lookups below.
*
* For a caller that opted into drafts, a field whose selection is staged in the
* entry's draft revision is answered from that revision; every other field, and
* every field for a caller that did not opt in, is answered from the links,
* which hold the published selection. That is what keeps a picker change on a
* published entry invisible until it is published.
*
* Either selection arrives one page at a time, with the cursor to walk the rest
* through the edge routes — a draft's pending selection can be as long as a
* published one, and a caller that reads an entry should not have to take a
* field of a thousand entries to find out.
*/
async function hydrateReferences(db, collection, item, includeDrafts) {
	if (!item.translationGroup) return;
	const collectionRow = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collection).executeTakeFirst();
	if (!collectionRow) return;
	const fields = await db.selectFrom("_emdash_fields").select(["slug", "validation"]).where("collection_id", "=", collectionRow.id).where("type", "=", "reference").execute();
	const references = {};
	if (fields.length === 0) {
		item.references = references;
		return;
	}
	const repo = new RelationRepository(db);
	const content = new ContentRepository(db);
	const staged = includeDrafts && item.draftRevisionId ? readStagedReferences((await new RevisionRepository(db).findById(item.draftRevisionId))?.data) : void 0;
	for (const field of fields) {
		let validation = {};
		if (field.validation) {
			let parsed;
			try {
				parsed = JSON.parse(field.validation);
			} catch {
				continue;
			}
			if (isRecord(parsed)) validation = parsed;
		}
		const relation = typeof validation.relation === "string" ? validation.relation : void 0;
		const targetCollection = typeof validation.targetCollection === "string" ? validation.targetCollection : void 0;
		if (!relation || !targetCollection) continue;
		const stagedGroups = staged?.[field.slug];
		if (stagedGroups) {
			const page = pageStagedGroups(stagedGroups);
			references[field.slug] = {
				children: await resolveEntryGroups(content, targetCollection, page.groups, item.locale, includeDrafts, await getReferenceTitleField(db, targetCollection)),
				...page.nextCursor ? { nextCursor: page.nextCursor } : {}
			};
			continue;
		}
		const onChildSide = validation.relationSide === "child";
		const edges = onChildSide ? await repo.getParentsPage(relation, item.translationGroup) : await repo.getChildrenPage(relation, item.translationGroup);
		const children = await resolveEntries(content, targetCollection, edges.items, (e) => onChildSide ? e.parentGroup : e.childGroup, item.locale, includeDrafts, await getReferenceTitleField(db, targetCollection));
		references[field.slug] = {
			children,
			...edges.nextCursor ? { nextCursor: edges.nextCursor } : {}
		};
	}
	item.references = references;
}
/**
* Batch-hydrate bylines for multiple items using two bulk queries instead of N+1.
*
* Items may live at different locales (e.g. a list endpoint returning the
* translations of an entry). Group by `item.locale` and call the strict
* per-locale repo method once per group so each item resolves against its
* own locale's byline rows.
*/
async function hydrateBylinesMany(db, collection, items) {
	if (items.length === 0) return;
	const bylineRepo = new BylineRepository(db);
	const localeBuckets = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = item.locale ?? null;
		const bucket = localeBuckets.get(key);
		if (bucket) bucket.push(item);
		else localeBuckets.set(key, [item]);
	}
	const bylinesByItem = /* @__PURE__ */ new Map();
	const itemsNeedingAuthorCheck = [];
	for (const [locale, bucket] of localeBuckets) {
		const localeOpt = locale ? { locale } : void 0;
		const ids = bucket.map((i) => i.id);
		const credits = await bylineRepo.getContentBylinesMany(collection, ids, localeOpt);
		for (const [id, list] of credits) bylinesByItem.set(id, list);
		for (const item of bucket) {
			if (credits.has(item.id) && credits.get(item.id).length > 0) continue;
			if (item.authorId) itemsNeedingAuthorCheck.push(item);
		}
	}
	const fallbackByItem = /* @__PURE__ */ new Map();
	if (itemsNeedingAuthorCheck.length > 0) {
		const authorBuckets = /* @__PURE__ */ new Map();
		for (const item of itemsNeedingAuthorCheck) {
			if (item.primaryBylineId) continue;
			const key = item.locale ?? null;
			const bucket = authorBuckets.get(key);
			if (bucket) bucket.push(item);
			else authorBuckets.set(key, [item]);
		}
		for (const [locale, bucket] of authorBuckets) {
			const localeOpt = locale ? { locale } : void 0;
			const authorIds = bucket.map((i) => i.authorId).filter((id) => id !== null);
			const uniqueAuthorIds = [...new Set(authorIds)];
			if (uniqueAuthorIds.length === 0) continue;
			const authorMap = await bylineRepo.findByUserIds(uniqueAuthorIds, localeOpt);
			for (const item of bucket) {
				if (!item.authorId) continue;
				const f = authorMap.get(item.authorId);
				if (f) fallbackByItem.set(item.id, f);
			}
		}
	}
	for (const item of items) {
		const explicit = bylinesByItem.get(item.id);
		if (explicit && explicit.length > 0) {
			item.bylines = explicit.map((c) => ({
				...c,
				source: "explicit"
			}));
			item.byline = explicit[0]?.byline ?? null;
			continue;
		}
		const fallback = fallbackByItem.get(item.id);
		if (fallback) {
			item.bylines = [{
				byline: fallback,
				sortOrder: 0,
				roleLabel: null,
				source: "inferred"
			}];
			item.byline = fallback;
			continue;
		}
		item.bylines = [];
		item.byline = null;
	}
}
/**
* Resolve an identifier (ID or slug) to a real content ID.
* Returns the ID if found, null if not found.
* When locale is provided, slug lookups are scoped to that locale.
*/
async function resolveId(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlug(collection, identifier, locale ? resolveConfiguredLocale(locale) : void 0))?.id ?? null;
}
/**
* Resolve an identifier (ID or slug) to a real content ID,
* including trashed (soft-deleted) items.
*/
async function resolveIdIncludingTrashed(repo, collection, identifier, locale) {
	return (await repo.findByIdOrSlugIncludingTrashed(collection, identifier, locale ? resolveConfiguredLocale(locale) : void 0))?.id ?? null;
}
/**
* Resolve the columns a content-list search should match against. Always
* includes `slug` (a standard column), adds the configured `titleField` plus
* the `title`/`name` display fields when the collection actually defines them,
* mirroring the admin's item-title resolution (titleField -> title -> name ->
* slug), and includes every field explicitly marked searchable. Returning only
* fields that have a column (a reference field bound to a relation has none)
* avoids "no such column" errors.
*/
async function resolveSearchColumns(db, collection) {
	const row = await db.selectFrom("_emdash_collections").select(["id", "title_field"]).where("slug", "=", collection).executeTakeFirst();
	if (!row) return ["slug"];
	const fields = (await db.selectFrom("_emdash_fields").select([
		"slug",
		"searchable",
		"type",
		"validation"
	]).where("collection_id", "=", row.id).orderBy("sort_order", "asc").execute()).filter((f) => !isStoragelessFieldRow(f));
	const columns = /* @__PURE__ */ new Set(["slug"]);
	const fieldSlugs = new Set(fields.map((f) => f.slug));
	if (row.title_field && fieldSlugs.has(row.title_field)) columns.add(row.title_field);
	for (const candidate of ["title", "name"]) if (fieldSlugs.has(candidate)) columns.add(candidate);
	for (const field of fields) if (field.searchable === 1) columns.add(field.slug);
	return [...columns];
}
/**
* The keys of `data` that name a storage-less field — a reference field bound
* to a relation, whose selection lives in the edge table and reaches the API
* under the separate `references` key.
*
* A reference field with no relation still owns its column, so its value in
* `data` is exactly where it belongs and is not returned here.
*/
async function storagelessDataKeys(db, collection, data) {
	const collectionRow = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collection).executeTakeFirst();
	if (!collectionRow) return [];
	const fields = await db.selectFrom("_emdash_fields").select([
		"slug",
		"type",
		"validation"
	]).where("collection_id", "=", collectionRow.id).execute();
	const storageless = new Set(fields.filter(isStoragelessFieldRow).map((f) => f.slug));
	if (storageless.size === 0) return [];
	return Object.keys(data).filter((key) => storageless.has(key));
}
/**
* Refuse a `data` payload that tries to set a storage-less field.
*
* Such a key would otherwise reach the column writer and throw "no such
* column". Dropping it instead is worse than refusing it: a client that can
* only write `data` would be told its write succeeded while nothing was linked.
* On a collection that keeps drafts the key never reaches the column writer at
* all — it is merged into the draft revision's JSON — so the runtime applies
* this before staging rather than leaving it to the write below.
*/
function storagelessDataKeyError(keys) {
	return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: `Reference fields bound to a relation are set through 'references', not 'data': ${keys.join(", ")}`
		}
	};
}
/**
* The storage-less keys in `data` that an update is actually trying to change.
*
* A field bound to a relation after its column existed keeps that column, and
* every read hands the value frozen in it back under the field's own slug. A
* read-then-write client — the admin editor among them — therefore echoes a key
* it never touched, and refusing that would make such an entry unsaveable. An
* echo asks for nothing; a different value is an attempt to set a selection
* through the one channel that cannot carry it.
*
* A key the entry does not store counts as changed, which is every key of a
* field that never had a column: there is nothing for such a payload to be
* echoing, and letting it through would reach the column writer.
*/
function changedStoragelessDataKeys(storageless, data, stored) {
	return Object.keys(data).filter((key) => storageless.has(key) && (!Object.hasOwn(stored, key) || JSON.stringify(data[key]) !== JSON.stringify(stored[key])));
}
/**
* Decide whether the content-list `q` filter can be served from the
* collection's FTS5 index instead of a full-scan substring LIKE (#1517).
*
* Requires SQLite (FTS5 is SQLite-only), search enabled on the collection,
* every non-slug display column present in the searchable-field set (or the
* index would miss matches the LIKE finds), and the index table actually
* existing.
*/
async function canUseFtsForListFilter(db, collection, searchColumns) {
	if (!isSqlite(db)) return false;
	const ftsManager = new FTSManager(db);
	if (!(await ftsManager.getSearchConfig(collection))?.enabled) return false;
	const searchable = new Set(await ftsManager.getSearchableFields(collection));
	if (!searchColumns.every((col) => col === "slug" || searchable.has(col))) return false;
	return ftsManager.ftsTableExists(collection);
}
/**
* Create a 301 auto-redirect from an entry's old URL to its new one after a
* slug change, using the collection's URL pattern. Shared by
* handleContentUpdate (direct slug edits) and handleContentPublish (slug edits
* staged as `_slug` in a draft revision, which only land on publish).
*/
async function createSlugChangeRedirect(db, collection, oldSlug, newSlug, contentId, oldPublishedAt, newPublishedAt) {
	if (await slugStillTaken(db, collection, oldSlug, contentId)) return false;
	const collectionRow = await db.selectFrom("_emdash_collections").select("url_pattern").where("slug", "=", collection).executeTakeFirst();
	const redirect = await new RedirectRepository(db).createAutoRedirect(collection, oldSlug, newSlug, contentId, collectionRow?.url_pattern ?? null, oldPublishedAt, newPublishedAt);
	invalidateRedirectCache();
	return redirect !== null;
}
/**
* Remove any auto-redirect whose source is the URL a newly published entry
* now occupies. This prevents an earlier slug-change redirect from shadowing
* the new live page, because the redirect middleware runs before routing.
*/
async function removeShadowingAutoRedirect(db, collection, slug, contentId, publishedAt) {
	if (!slug) return false;
	validateIdentifier(collection, "collection slug");
	const url = interpolateUrlPattern({
		pattern: (await db.selectFrom("_emdash_collections").select("url_pattern").where("slug", "=", collection).executeTakeFirst())?.url_pattern ?? null,
		collection,
		slug,
		id: contentId,
		date: publishedAt
	});
	const result = await db.deleteFrom("_emdash_redirects").where("source", "=", url).where("auto", "=", 1).executeTakeFirst();
	const removed = BigInt(result.numDeletedRows ?? 0n) > 0n;
	if (removed) invalidateRedirectCache();
	return removed;
}
/** Whether a row other than `contentId` still holds `slug` in this collection. */
async function slugStillTaken(db, collection, slug, contentId) {
	validateIdentifier(collection, "collection slug");
	return (await sql`
		SELECT id FROM ${sql.ref(`ec_${collection}`)}
		WHERE slug = ${slug}
		AND id != ${contentId}
		AND deleted_at IS NULL
		LIMIT 1
	`.execute(db)).rows.length > 0;
}
/** Matches a date-only `YYYY-MM-DD` bound (no time component). */
var DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
/**
* Normalize a date-range bound to an ISO datetime for lexicographic comparison
* against stored ISO 8601 timestamps. A bare `YYYY-MM-DD` is widened to the
* appropriate UTC day boundary so the range stays inclusive: a `start` bound
* becomes the start of the day and an `end` bound the end of the day.
* Otherwise a date-only upper bound would exclude every same-day row (since
* `2024-06-01T12:00:00Z` sorts after `2024-06-01`). Full datetimes pass
* through unchanged.
*/
function normalizeDateBound(value, edge) {
	if (!value) return void 0;
	if (!DATE_ONLY_RE.test(value)) return new Date(value).toISOString();
	return edge === "start" ? `${value}T00:00:00.000Z` : `${value}T23:59:59.999Z`;
}
/**
* Build the repository's byline filter from the wire params.
*
* `locale` is the locale the list is scoped to, which is the locale an
* inferred credit has to resolve at — the admin list is always scoped to the
* locale picked in its switcher.
*/
function resolveBylineFilter(params, locale) {
	const includeInferred = params.includeInferredBylines === true;
	if (params.bylinesNone) return {
		mode: "none",
		includeInferred,
		locale
	};
	const bylineIds = params.bylines ?? [];
	if (bylineIds.length === 0) return void 0;
	return {
		mode: "any",
		bylineIds,
		includeInferred,
		locale
	};
}
/**
* Rows to skip for a numbered page, or `null` when the page can't be served
* (combined with a cursor, or past the safe-integer range).
*/
function pageOffset(params) {
	const offset = (params.page - 1) * params.limit;
	if (params.cursor !== void 0 || !Number.isSafeInteger(params.page) || params.page < 1 || !Number.isSafeInteger(offset)) return null;
	return offset;
}
/**
* Create content list handler
*/
async function handleContentList(db, collection, params) {
	try {
		const limit = Math.max(1, Math.min(params.limit || 50, 100));
		const offset = params.page === void 0 ? void 0 : pageOffset({
			page: params.page,
			limit,
			cursor: params.cursor
		});
		if (offset === null) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Invalid content page"
			}
		};
		const repo = new ContentRepository(db);
		const where = {};
		if (params.status) where.status = params.status;
		const locale = params.locale ? resolveConfiguredLocale(params.locale) : void 0;
		if (locale) where.locale = locale;
		if (params.authorId) where.authorId = params.authorId;
		if (params.fieldFilters && Object.keys(params.fieldFilters).length > 0) where.fieldFilters = params.fieldFilters;
		const bylineFilter = resolveBylineFilter(params, locale);
		if (bylineFilter) where.bylineFilter = bylineFilter;
		if (params.dateField && (params.dateFrom || params.dateTo)) where.dateFilter = {
			field: params.dateField,
			from: normalizeDateBound(params.dateFrom, "start"),
			to: normalizeDateBound(params.dateTo, "end")
		};
		const q = params.q?.trim();
		if (q) {
			where.q = q;
			where.searchColumns = await resolveSearchColumns(db, collection);
			where.useFts = await canUseFtsForListFilter(db, collection, where.searchColumns);
		}
		let sortableExtras;
		if (params.orderBy && !isSystemOrderField(params.orderBy)) {
			const coll = await db.selectFrom("_emdash_collections").select(["title_field", "date_field"]).where("slug", "=", collection).executeTakeFirst();
			sortableExtras = [coll?.title_field, coll?.date_field].filter((slug) => !!slug);
		}
		const result = await repo.findMany(collection, {
			cursor: params.cursor,
			offset,
			limit,
			where: Object.keys(where).length > 0 ? where : void 0,
			orderBy: params.orderBy ? {
				field: params.orderBy,
				direction: params.order || "desc"
			} : void 0,
			sortableExtras
		});
		const hasSeo = await collectionHasSeo(db, collection);
		await hydrateSeoMany(db, collection, result.items, hasSeo);
		await hydrateBylinesMany(db, collection, result.items);
		return {
			success: true,
			data: {
				items: result.items,
				nextCursor: result.nextCursor,
				total: result.total
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		if (error instanceof ContentCollectionNotFoundError || isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (isMissingColumnError(error, "deleted_at")) return {
			success: false,
			error: {
				code: "COLLECTION_SCHEMA_MISMATCH",
				message: `Collection '${collection}' backing table is missing the 'deleted_at' column`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content list error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list content"
			}
		};
	}
}
/**
* List the distinct authors of a collection's live content.
*
* Backs the admin content-list author filter. Unlike `/admin/users` (ADMIN
* only), this is gated on `content:read`, so any editor can filter by author.
* Returns only users who have authored at least one non-trashed entry, sorted
* by display name then email for a stable dropdown order.
*/
async function handleContentAuthors(db, collection) {
	try {
		const authorIds = await new ContentRepository(db).findDistinctAuthorIds(collection);
		if (authorIds.length === 0) return {
			success: true,
			data: { items: [] }
		};
		return {
			success: true,
			data: { items: (await new UserRepository(db).findByIds(authorIds)).map((u) => ({
				id: u.id,
				name: u.name,
				email: u.email,
				avatarUrl: u.avatarUrl
			})).toSorted((a, b) => (a.name ?? a.email).localeCompare(b.name ?? b.email)) }
		};
	} catch (error) {
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		console.error("Content authors error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_AUTHORS_ERROR",
				message: "Failed to list content authors"
			}
		};
	}
}
/**
* Get single content item
*/
async function handleContentGet(db, collection, id, locale, referenceOptions) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlug(collection, id, locale ? resolveConfiguredLocale(locale) : void 0);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		if (referenceOptions) await hydrateReferences(db, collection, item, referenceOptions.includeDrafts);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
/**
* Get a content item by id, including trashed items.
* Used by restore endpoint for ownership checks on soft-deleted items.
*/
async function handleContentGetIncludingTrashed(db, collection, id, locale) {
	try {
		const item = await new ContentRepository(db).findByIdOrSlugIncludingTrashed(collection, id, locale ? resolveConfiguredLocale(locale) : void 0);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		await hydrateBylines(db, collection, item);
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		console.error("Content get error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_GET_ERROR",
				message: "Failed to get content"
			}
		};
	}
}
/**
* Create content item.
*
* Content + SEO writes are wrapped in a transaction so either both succeed
* or neither does. If `body.seo` is provided for a non-SEO collection, the
* API returns a validation error rather than silently dropping it.
*/
async function handleContentCreate(db, collection, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		const storagelessKeys = await storagelessDataKeys(db, collection, body.data);
		if (storagelessKeys.length > 0) return storagelessDataKeyError(storagelessKeys);
		const mimeCheck = await validateMediaFields(db, collection, body.data);
		if (!mimeCheck.success) return mimeCheck;
		const requiredReferences = await validateRequiredReferencesPresent(db, collection, body.references, body.translationOf);
		if (!requiredReferences.success) return requiredReferences;
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const inheritedFields = body.translationOf ? (await trx.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select("field.slug").where("collection.slug", "=", collection).where("field.translatable", "=", 0).execute()).map((field) => field.slug) : [];
			const referenceWrites = [];
			if (body.references) {
				const entryGroup = body.translationOf ? (await repo.findById(collection, body.translationOf))?.translationGroup ?? null : null;
				for (const [fieldSlug, selectedIds] of Object.entries(body.references)) {
					const resolved = await resolveReferenceSelectionTargets(trx, collection, fieldSlug, selectedIds, entryGroup);
					if (!resolved.success) throw Object.assign(new Error(resolved.error.message), { apiError: { code: resolved.error.code } });
					referenceWrites.push(resolved.data);
				}
			}
			const effectiveLocale = body.locale ? resolveConfiguredLocale(body.locale) : getI18nConfig()?.defaultLocale;
			let slug = body.slug;
			if (!slug) {
				const slugSource = getSlugSource(body.data, await getCollectionTitleField(trx, collection));
				if (slugSource) slug = await repo.generateUniqueSlug(collection, slugSource, effectiveLocale);
			}
			if (body.status === "published") requireRoutablePublishSlug((await getCollectionPublishConfig(trx, collection)).routable, slug);
			const created = await repo.create({
				type: collection,
				slug,
				data: body.data,
				status: body.status || "draft",
				authorId: body.authorId,
				locale: effectiveLocale,
				translationOf: body.translationOf,
				inheritFields: inheritedFields,
				createdAt: body.createdAt,
				publishedAt: body.publishedAt
			});
			if (body.bylines !== void 0) created.primaryBylineId = (await bylineRepo.setContentBylines(collection, created.id, body.bylines))[0]?.byline.translationGroup ?? null;
			if (body.translationOf) {
				if (body.bylines === void 0) {
					await bylineRepo.copyContentBylines(collection, body.translationOf, created.id);
					const source = await repo.findById(collection, body.translationOf);
					if (source) created.primaryBylineId = source.primaryBylineId;
				}
			}
			await hydrateBylines(trx, collection, created);
			if (body.seo && hasSeo) created.seo = await new SeoRepository(trx).upsert(collection, created.id, body.seo);
			else if (hasSeo) created.seo = { ...SEO_DEFAULTS };
			if (body.taxonomies) await assignTaxonomies(trx, collection, created.id, effectiveLocale, body.taxonomies);
			if (created.translationGroup) for (const write of referenceWrites) await writeReferenceSelection(trx, {
				...write,
				entryGroup: created.translationGroup
			});
			if (created.status === "published") redirectChanged = await removeShadowingAutoRedirect(trx, collection, created.slug, created.id, created.publishedAt);
			return created;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof ContentSlugConflictError) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `Slug '${body.slug ?? "(auto-generated)"}' already exists in collection '${collection}'`
			}
		};
		if (error instanceof EmDashValidationError) {
			if (error.message === "Translation source content not found") return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: error.message
				}
			};
			return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: error.message
				}
			};
		}
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("active_tg_locale") || message.includes("translation_group") && message.includes("locale")) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `Translation already exists in locale "${body.locale ?? getI18nConfig()?.defaultLocale ?? "en"}" for this content item`
				}
			};
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? "(auto-generated)"}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content create error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_CREATE_ERROR",
				message: "Failed to create content"
			}
		};
	}
}
/**
* Update content item.
* If `_rev` is provided, validates it against the current version before writing.
* No `_rev` = blind write (backwards-compatible for admin UI).
*
* Content + SEO writes are wrapped in a transaction for atomicity.
*/
async function handleContentUpdate(db, collection, id, body) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		if (body.seo && !hasSeo) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `Collection "${collection}" does not have SEO enabled. Remove the seo field or enable SEO on this collection.`
			}
		};
		if (body.data) {
			const mimeCheck = await validateMediaFields(db, collection, body.data);
			if (!mimeCheck.success) return mimeCheck;
		}
		const repo = new ContentRepository(db);
		const resolvedId = await resolveId(repo, collection, id, body.locale) ?? id;
		if (body.data) {
			const storagelessKeys = await storagelessDataKeys(db, collection, body.data);
			if (storagelessKeys.length > 0) {
				const stored = await repo.findById(collection, resolvedId);
				const changed = changedStoragelessDataKeys(new Set(storagelessKeys), body.data, stored?.data ?? {});
				if (changed.length > 0) return storagelessDataKeyError(changed);
			}
		}
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const trxRepo = new ContentRepository(trx);
			const bylineRepo = new BylineRepository(trx);
			const existing = body._rev || body.slug !== void 0 || body.status === "published" ? await trxRepo.findById(collection, resolvedId) : null;
			if (body._rev) {
				if (!existing) throw Object.assign(/* @__PURE__ */ new Error(`Content item not found: ${id}`), { apiError: { code: "NOT_FOUND" } });
				const revCheck = validateRev(body._rev, existing);
				if (!revCheck.valid) throw Object.assign(new Error(revCheck.message), { apiError: { code: "CONFLICT" } });
			}
			let oldSlug;
			if (body.slug && existing?.slug && existing.slug !== body.slug) oldSlug = existing.slug;
			if ((body.status ?? existing?.status) === "published") {
				if (!existing) throw Object.assign(/* @__PURE__ */ new Error(`Content item not found: ${id}`), { apiError: { code: "NOT_FOUND" } });
				const publishConfig = await getCollectionPublishConfig(trx, collection);
				const intendedSlug = body.slug !== void 0 ? body.slug : existing.slug;
				requireRoutablePublishSlug(publishConfig.routable, intendedSlug);
			}
			const referenceWrites = [];
			if (body.references) for (const [fieldSlug, selectedIds] of Object.entries(body.references)) {
				const resolved = await resolveReferenceSelection(trx, collection, resolvedId, fieldSlug, selectedIds);
				if (!resolved.success) throw Object.assign(new Error(resolved.error.message), { apiError: { code: resolved.error.code } });
				referenceWrites.push(resolved.data);
			}
			const { supportsRevisions } = await getCollectionPublishConfig(trx, collection);
			const updated = await trxRepo.update(collection, resolvedId, {
				data: body.data,
				slug: body.slug,
				locale: existing?.locale ?? body.locale,
				status: body.status,
				authorId: body.authorId,
				publishedAt: body.publishedAt,
				...supportsRevisions ? {} : { draftRevisionId: null }
			}, body._rev ? decodeRevisionPrecondition(body._rev) : void 0);
			if (body.bylines !== void 0) updated.primaryBylineId = (await bylineRepo.setContentBylines(collection, resolvedId, body.bylines))[0]?.byline.translationGroup ?? null;
			if (oldSlug && body.slug) redirectChanged = await createSlugChangeRedirect(trx, collection, oldSlug, body.slug, resolvedId, existing?.publishedAt ?? null, updated.publishedAt ?? null);
			if (isI18nEnabled() && body.data && updated.translationGroup) await trxRepo.syncNonTranslatableFields(collection, updated.id, updated.translationGroup, body.data);
			if (body.seo && hasSeo) updated.seo = await new SeoRepository(trx).upsert(collection, resolvedId, body.seo);
			else if (hasSeo) updated.seo = await new SeoRepository(trx).get(collection, resolvedId);
			await hydrateBylines(trx, collection, updated);
			if (body.taxonomies) await assignTaxonomies(trx, collection, resolvedId, updated.locale ?? body.locale, body.taxonomies);
			for (const write of referenceWrites) await writeReferenceSelection(trx, write);
			if (updated.status === "published") redirectChanged = await removeShadowingAutoRedirect(trx, collection, updated.slug, updated.id, updated.publishedAt) || redirectChanged;
			return updated;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (isMissingTableError(error)) return {
			success: false,
			error: {
				code: "COLLECTION_NOT_FOUND",
				message: `Collection '${collection}' not found`
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		if (error instanceof ContentSlugConflictError) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `Slug '${body.slug ?? id}' already exists in collection '${collection}'`
			}
		};
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if (message.includes("unique constraint failed") || message.includes("duplicate key")) {
			if (message.includes("slug")) return {
				success: false,
				error: {
					code: "SLUG_CONFLICT",
					message: `Slug '${body.slug ?? id}' already exists in collection '${collection}'`
				}
			};
			return {
				success: false,
				error: {
					code: "CONFLICT",
					message: "Unique constraint violation"
				}
			};
		}
		console.error("Content update error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UPDATE_ERROR",
				message: "Failed to update content"
			}
		};
	}
}
/**
* Duplicate content item.
*
* Only copies SEO data if the collection has SEO enabled.
* Always returns consistent `seo` shape for SEO-enabled collections.
*/
async function handleContentDuplicate(db, collection, id, authorId) {
	try {
		const hasSeo = await collectionHasSeo(db, collection);
		return {
			success: true,
			data: { item: await withTransaction(db, async (trx) => {
				const repo = new ContentRepository(trx);
				const bylineRepo = new BylineRepository(trx);
				const resolvedId = await resolveId(repo, collection, id) ?? id;
				const original = await repo.findById(collection, resolvedId);
				const dup = await repo.duplicate(collection, resolvedId, authorId);
				if (original?.translationGroup && dup.translationGroup) {
					const relations = new RelationRepository(trx);
					throwIfReferenceLimitRefused(await relations.copyParentEdges(original.translationGroup, dup.translationGroup), "parent");
					for (const field of (await referenceFieldConstraints(trx, collection)).values()) {
						if (field.relationSide !== "child") continue;
						const parents = await relations.getParents(field.relation, original.translationGroup);
						if (parents.length === 0) continue;
						throwIfReferenceLimitRefused(await relations.setParents(field.relation, dup.translationGroup, parents.map((parent) => parent.parentGroup)), "child");
					}
				}
				const existingBylines = await bylineRepo.getContentBylines(collection, resolvedId);
				if (existingBylines.length > 0) await bylineRepo.setContentBylines(collection, dup.id, existingBylines.map((entry) => ({
					bylineId: entry.byline.id,
					roleLabel: entry.roleLabel
				})));
				if (hasSeo) {
					const seoRepo = new SeoRepository(trx);
					await seoRepo.copyForDuplicate(collection, resolvedId, dup.id);
					dup.seo = await seoRepo.get(collection, dup.id);
				}
				await hydrateBylines(trx, collection, dup);
				return dup;
			}) }
		};
	} catch (err) {
		if (err instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: err.message
			}
		};
		if (hasApiError(err)) return {
			success: false,
			error: {
				code: err.apiError.code,
				message: err.message
			}
		};
		console.error("Content duplicate error:", err);
		return {
			success: false,
			error: {
				code: "CONTENT_DUPLICATE_ERROR",
				message: "Failed to duplicate content"
			}
		};
	}
}
/**
* Delete content item (soft delete - moves to trash)
*/
async function handleContentDelete(db, collection, id) {
	try {
		const result = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const deleted = await repo.delete(collection, resolvedId);
			if (deleted) await new EntryLockRepository(trx).releaseEntry(collection, resolvedId);
			return {
				id: resolvedId,
				deleted
			};
		});
		if (!result.deleted) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: result.id
			}
		};
	} catch (error) {
		console.error("Content delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to delete content"
			}
		};
	}
}
/**
* Restore content item from trash
*/
async function handleContentRestore(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveIdIncludingTrashed(repo, collection, id) ?? id;
			return repo.restore(collection, resolvedId, expectedRevision);
		});
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Trashed content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				restored: true,
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (isTranslationLocaleConflict(error, collection)) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: "An active translation already exists in this locale"
			}
		};
		console.error("Content restore error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_RESTORE_ERROR",
				message: "Failed to restore content"
			}
		};
	}
}
/**
* Permanently delete content item (cannot be undone).
* Also cleans up associated SEO data.
*/
async function handleContentPermanentDelete(db, collection, id) {
	try {
		const resolvedId = await resolveIdIncludingTrashed(new ContentRepository(db), collection, id) ?? id;
		if (!await withTransaction(db, async (trx) => {
			const trxRepo = new ContentRepository(trx);
			const item = await trxRepo.findByIdIncludingTrashed(collection, resolvedId);
			if (!item || item.deletedAt === null) return false;
			const lastOfGroup = item.translationGroup !== null ? !await trxRepo.hasTranslationsIncludingTrashed(collection, item.translationGroup, { excludeId: resolvedId }) : false;
			if (lastOfGroup && item.translationGroup) await new RelationRepository(trx).clearReferencesForGroup(item.translationGroup);
			const wasDeleted = await trxRepo.permanentDelete(collection, resolvedId);
			if (wasDeleted) {
				await new SeoRepository(trx).delete(collection, resolvedId);
				await new CommentRepository(trx).deleteByContent(collection, resolvedId);
				await new RevisionRepository(trx).deleteByEntry(collection, resolvedId);
				await new EntryLockRepository(trx).releaseEntry(collection, resolvedId);
				await new BylineRepository(trx).deleteContentBylines(collection, resolvedId);
				if (lastOfGroup && item.translationGroup) await new TaxonomyRepository(trx).clearEntryGroupTerms(collection, item.translationGroup);
			}
			return wasDeleted;
		})) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		return {
			success: true,
			data: {
				deleted: true,
				id: resolvedId
			}
		};
	} catch (error) {
		console.error("Content permanent delete error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DELETE_ERROR",
				message: "Failed to permanently delete content"
			}
		};
	}
}
/**
* List trashed content items
*/
async function handleContentListTrashed(db, collection, options = {}) {
	try {
		const limit = Math.max(1, Math.min(options.limit || 50, 100));
		const offset = options.page === void 0 ? void 0 : pageOffset({
			page: options.page,
			limit,
			cursor: options.cursor
		});
		if (offset === null) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Invalid content page"
			}
		};
		const repo = new ContentRepository(db);
		const where = { locale: options.locale };
		const [rowsResult, countResult] = await Promise.allSettled([repo.findTrashed(collection, {
			limit,
			cursor: options.cursor,
			offset,
			where
		}), offset === void 0 ? void 0 : repo.countTrashed(collection, where)]);
		if (rowsResult.status === "rejected") throw rowsResult.reason;
		if (countResult.status === "rejected") throw countResult.reason;
		const result = rowsResult.value;
		return {
			success: true,
			data: {
				items: result.items.map((item) => ({
					id: item.id,
					type: item.type,
					slug: item.slug,
					status: item.status,
					locale: item.locale,
					translationGroup: item.translationGroup,
					data: item.data,
					authorId: item.authorId,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
					publishedAt: item.publishedAt,
					deletedAt: item.deletedAt
				})),
				nextCursor: result.nextCursor,
				total: countResult.value
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		console.error("Content list trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_LIST_ERROR",
				message: "Failed to list trashed content"
			}
		};
	}
}
/**
* Count trashed content items
*/
async function handleContentCountTrashed(db, collection, options = {}) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countTrashed(collection, { locale: options.locale }) }
		};
	} catch (error) {
		console.error("Content count trashed error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count trashed content"
			}
		};
	}
}
/**
* Schedule content for future publishing
*/
async function handleContentSchedule(db, collection, id, scheduledAt, currentTime = /* @__PURE__ */ new Date(), _rev) {
	try {
		const expectedRevision = decodeRevisionPrecondition(_rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const existing = await repo.findByIdOrSlug(collection, id);
			const resolvedId = existing?.id ?? id;
			if (existing) requireRoutablePublishSlug((await getCollectionPublishConfig(trx, collection)).routable, existing.slug);
			return repo.schedule(collection, resolvedId, scheduledAt, currentTime, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content schedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_SCHEDULE_ERROR",
				message: "Failed to schedule content"
			}
		};
	}
}
/**
* Unschedule content (revert to draft)
*/
async function handleContentUnschedule(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.unschedule(collection, resolvedId, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unschedule error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNSCHEDULE_ERROR",
				message: "Failed to unschedule content"
			}
		};
	}
}
/**
* Persist a permanent policy rejection and unschedule the publication.
* Databases with transactions commit both writes together. D1 persists the
* reason first so a failed option write cannot silently remove the entry from
* future sweeps; if unscheduling then fails, the due entry and its dashboard
* notice remain available for retry and operator action.
*/
async function handleScheduledPolicyRejection(db, collection, id, options) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const optionsRepo = new OptionsRepository(trx);
			const rejectionKey = scheduledPolicyRejectionKey(collection, resolvedId);
			const rejectionRevision = await optionsRepo.setVersioned(rejectionKey, {
				...options.rejection,
				id: resolvedId
			});
			try {
				return await repo.unschedule(collection, resolvedId, expectedRevision);
			} catch (error) {
				if (error instanceof ContentMutationConflictError) try {
					await optionsRepo.compareAndDelete(rejectionKey, rejectionRevision);
				} catch (cleanupError) {
					console.error("Failed to clear stale scheduled policy rejection:", cleanupError);
				}
				throw error;
			}
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Scheduled policy rejection error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNSCHEDULE_ERROR",
				message: "Failed to record scheduled publication rejection"
			}
		};
	}
}
/**
* Publish content immediately.
*
* Publication is one atomic content-row statement. On databases that support
* transactions, the slug redirect and the locale sync stay grouped with it.
*/
async function handleContentPublish(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		let redirectChanged = false;
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const publishConfig = await getCollectionPublishConfig(trx, collection);
			const existing = await repo.findById(collection, resolvedId);
			const draftRevision = publishConfig.supportsRevisions && existing?.draftRevisionId ? await new RevisionRepository(trx).findById(existing.draftRevisionId) : void 0;
			const stagedReferences = draftRevision ? readStagedReferences(draftRevision.data) : void 0;
			const stagedReferenceBaselines = draftRevision ? readStagedReferenceBaselines(draftRevision.data) : void 0;
			if (existing?.translationGroup) {
				const valid = await validateStagedReferences(trx, collection, stagedReferences ?? {}, existing.translationGroup, stagedReferenceBaselines);
				if (!valid.success) throw Object.assign(new Error(valid.error.message), { apiError: { code: valid.error.code } });
				if (stagedReferences) {
					await assertPublishWillNotBeRefused(trx, collection, resolvedId, existing, {
						stagedSlug: readStagedSlug(draftRevision?.data),
						requireSlug: publishConfig.routable,
						requireDue: options.requireScheduledDue,
						expectedScheduledAt: options.expectedScheduledAt,
						expectedRevision
					});
					await applyStagedReferences(trx, collection, existing.translationGroup, stagedReferences, stagedReferenceBaselines);
				}
			}
			const published = await repo.publish(collection, resolvedId, options.publishedAt, options.requireScheduledDue, options.expectedScheduledAt, publishConfig.supportsRevisions, publishConfig.routable, expectedRevision, options.currentTime);
			if (publishConfig.supportsRevisions && published.liveRevisionId && published.translationGroup) await recordPublishedReferences(trx, collection, published.liveRevisionId, published.translationGroup);
			if (existing && isI18nEnabled() && publishConfig.supportsRevisions && published.translationGroup) await repo.syncNonTranslatableFields(collection, published.id, published.translationGroup, published.data, { previous: existing.data });
			if (existing?.status === "published" && existing.slug && published.slug && existing.slug !== published.slug) redirectChanged = await createSlugChangeRedirect(trx, collection, existing.slug, published.slug, resolvedId, existing.publishedAt ?? null, published.publishedAt ?? null);
			redirectChanged = await removeShadowingAutoRedirect(trx, collection, published.slug, published.id, published.publishedAt) || redirectChanged;
			return published;
		});
		if (redirectChanged) after(() => publishRedirectChanges(db));
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (hasApiError(error)) return {
			success: false,
			error: {
				code: error.apiError.code,
				message: error.message
			}
		};
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof ScheduledNotDueError) return {
			success: false,
			error: {
				code: "NOT_DUE",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) {
			const details = error.details;
			return {
				success: false,
				error: {
					code: typeof details === "object" && details !== null && "code" in details && details.code === "SLUG_CONFLICT" ? "SLUG_CONFLICT" : "VALIDATION_ERROR",
					message: error.message
				}
			};
		}
		const message = error instanceof Error ? error.message.toLowerCase() : "";
		if ((message.includes("unique constraint failed") || message.includes("duplicate key")) && message.includes("slug")) return {
			success: false,
			error: {
				code: "SLUG_CONFLICT",
				message: `The staged slug is already used by another entry in collection '${collection}'`
			}
		};
		console.error("Content publish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_PUBLISH_ERROR",
				message: "Failed to publish content"
			}
		};
	}
}
/**
* Unpublish content (revert to draft).
*
* Wrapped in a transaction — unpublish may create a draft revision
* from the live version then update the status, which is multi-step.
*/
async function handleContentUnpublish(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			const { supportsRevisions } = await getCollectionPublishConfig(trx, collection);
			return repo.unpublish(collection, resolvedId, expectedRevision, supportsRevisions);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: error.message
			}
		};
		console.error("Content unpublish error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_UNPUBLISH_ERROR",
				message: "Failed to unpublish content"
			}
		};
	}
}
/**
* Count scheduled content items
*/
async function handleContentCountScheduled(db, collection) {
	try {
		return {
			success: true,
			data: { count: await new ContentRepository(db).countScheduled(collection) }
		};
	} catch (error) {
		console.error("Content count scheduled error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COUNT_ERROR",
				message: "Failed to count scheduled content"
			}
		};
	}
}
/**
* Discard draft changes (revert to live version)
*/
async function handleContentDiscardDraft(db, collection, id, options = {}) {
	try {
		const expectedRevision = decodeRevisionPrecondition(options._rev);
		const item = await withTransaction(db, async (trx) => {
			const repo = new ContentRepository(trx);
			const resolvedId = await resolveId(repo, collection, id) ?? id;
			return repo.discardDraft(collection, resolvedId, expectedRevision);
		});
		await hydrateSeo(db, collection, item, await collectionHasSeo(db, collection));
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		if (error instanceof EmDashValidationError) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: error.message
			}
		};
		console.error("Content discard draft error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_DISCARD_DRAFT_ERROR",
				message: "Failed to discard draft"
			}
		};
	}
}
/**
* Compare live and draft revisions
*/
async function handleContentCompare(db, collection, id) {
	try {
		const entry = await new ContentRepository(db).findByIdOrSlug(collection, id);
		if (!entry) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		const revisionRepo = new RevisionRepository(db);
		const live = entry.liveRevisionId ? await revisionRepo.findById(entry.liveRevisionId) : null;
		const draft = entry.draftRevisionId ? await revisionRepo.findById(entry.draftRevisionId) : null;
		const liveReferences = entry.translationGroup ? await liveReferenceSelection(db, collection, entry.translationGroup) : {};
		const withReferences = (revisionData, staged) => {
			if (!revisionData) return void 0;
			const selection = {
				...liveReferences,
				...staged
			};
			if (Object.keys(selection).length === 0) return revisionData;
			return {
				...revisionData,
				[STAGED_REFERENCES_KEY]: selection
			};
		};
		return {
			success: true,
			data: {
				hasChanges: entry.draftRevisionId !== null && entry.draftRevisionId !== entry.liveRevisionId,
				live: withReferences(live?.data, {}) ?? null,
				draft: withReferences(draft?.data, readStagedReferences(draft?.data) ?? {}) ?? null
			}
		};
	} catch (error) {
		console.error("Content compare error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_COMPARE_ERROR",
				message: "Failed to compare revisions"
			}
		};
	}
}
/**
* Get all translations for a content item.
* Returns the item's translation group members with locale and status info.
*/
async function handleContentTranslations(db, collection, id) {
	try {
		const repo = new ContentRepository(db);
		const item = await repo.findByIdOrSlug(collection, id);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Content item not found: ${id}`
			}
		};
		if (!item.translationGroup) return {
			success: true,
			data: {
				translationGroup: item.id,
				translations: [{
					id: item.id,
					locale: item.locale,
					slug: item.slug,
					status: item.status,
					updatedAt: item.updatedAt
				}]
			}
		};
		const translations = await repo.findTranslations(collection, item.translationGroup);
		return {
			success: true,
			data: {
				translationGroup: item.translationGroup,
				translations: translations.map((t) => ({
					id: t.id,
					locale: t.locale,
					slug: t.slug,
					status: t.status,
					updatedAt: t.updatedAt
				}))
			}
		};
	} catch (error) {
		if (error instanceof Error) console.error("Content translations error:", error);
		return {
			success: false,
			error: {
				code: "CONTENT_TRANSLATIONS_ERROR",
				message: "Failed to get translations"
			}
		};
	}
}
/**
* Resolve a `{ taxonomyName: [slug, ...] }` map to term IDs and replace the
* entry's assignments for each named taxonomy.
*
* Shared by handleContentCreate and handleContentUpdate so both MCP entry
* points behave identically. Slug resolution is scoped to `locale`; passing
* `undefined` lets `findBySlug` fall back to its default (lowest locale code)
* so callers on single-locale sites don't need to know the site's default.
*
* Throws EmDashValidationError on unknown slug or wrong shape; the calling
* handler translates that into a VALIDATION_ERROR response.
*/
async function assignTaxonomies(trx, collection, entryId, locale, taxonomies) {
	const taxRepo = new TaxonomyRepository(trx);
	let anyChange = false;
	for (const [taxonomyName, slugs] of Object.entries(taxonomies)) {
		if (!Array.isArray(slugs)) throw new EmDashValidationError(`taxonomies.${taxonomyName} must be an array of term slugs`);
		const termIds = [];
		for (const slug of slugs) {
			if (typeof slug !== "string" || slug.length === 0) throw new EmDashValidationError(`taxonomies.${taxonomyName} contains a non-string or empty slug`);
			const term = await taxRepo.findBySlug(taxonomyName, slug, locale);
			if (!term) throw new EmDashValidationError(`Unknown taxonomy term: ${taxonomyName}='${slug}'${locale ? ` (locale '${locale}')` : ""}`);
			termIds.push(term.id);
		}
		await taxRepo.setTermsForEntry(collection, entryId, taxonomyName, termIds);
		anyChange = true;
	}
	if (anyChange) invalidateTermCache();
}
/** Pattern to add spaces before capital letters */
var CAMEL_CASE_PATTERN = /([A-Z])/g;
var FIRST_CHAR_PATTERN = /^./;
/**
* Map schema field types to editor field kinds.
*/
/** Field types that can be surfaced as list columns in the admin. */
var LIST_COLUMN_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect"
]);
var FIELD_TYPE_TO_KIND = {
	string: "string",
	slug: "string",
	url: "url",
	text: "richText",
	number: "number",
	integer: "number",
	boolean: "boolean",
	datetime: "datetime",
	select: "select",
	multiSelect: "multiSelect",
	portableText: "portableText",
	image: "image",
	file: "file",
	reference: "reference",
	json: "json",
	repeater: "repeater",
	blocks: "blocks"
};
/**
* Build collection descriptors from build-time config plus live database rows.
*
* Config collections are added first and win on slug conflicts. Runtime/manual
* collections have no Zod schema to inspect, so their field descriptors are
* synthesized from `_emdash_fields`.
*/
async function buildManifestCollections(collections, db) {
	const manifestCollections = {};
	for (const [name, definition] of Object.entries(collections)) {
		const fields = extractFieldDescriptors(definition.schema);
		manifestCollections[name] = {
			label: definition.admin.label,
			labelSingular: definition.admin.labelSingular || definition.admin.label,
			supports: definition.admin.supports || [],
			hasSeo: (definition.admin.supports || []).includes("seo"),
			routable: definition.admin.routable ?? true,
			fields
		};
	}
	if (!db) return manifestCollections;
	try {
		const storedCollections = await new SchemaRegistry(db).listCollectionsWithFields();
		const dbCollections = await Promise.all(storedCollections.map((collection) => expandCollectionBlockFields(db, collection)));
		const cardinality = await relationCardinality(db, dbCollections);
		for (const collection of dbCollections) {
			if (manifestCollections[collection.slug]) continue;
			const fields = {};
			for (const field of collection.fields) fields[field.slug] = dbFieldDescriptor(field, cardinality);
			const configuredListColumns = collection.admin?.listColumns ?? [];
			const fieldTypes = new Map(collection.fields.map((field) => [field.slug, field.type]));
			const listColumns = [];
			for (const slug of configuredListColumns) {
				if (listColumns.includes(slug)) continue;
				const fieldType = fieldTypes.get(slug);
				if (!fieldType || !LIST_COLUMN_FIELD_TYPES.has(fieldType)) {
					console.warn(`EmDash: Ignoring unsupported or unknown list column "${slug}" in collection "${collection.slug}".`);
					continue;
				}
				if (listColumns.length >= 4) {
					console.warn(`EmDash: Collection "${collection.slug}" declares more than 4 list columns; extra columns are ignored.`);
					break;
				}
				listColumns.push(slug);
			}
			manifestCollections[collection.slug] = {
				label: collection.label,
				labelSingular: collection.labelSingular || collection.label,
				supports: collection.supports || [],
				hasSeo: collection.hasSeo,
				urlPattern: collection.urlPattern,
				routable: collection.routable !== false,
				titleField: collection.titleField,
				dateField: collection.dateField,
				...collection.hidden ? { hidden: true } : {},
				...collection.icon ? { icon: collection.icon } : {},
				...collection.group ? { group: collection.group } : {},
				...collection.admin?.quickCreate === false ? { quickCreate: false } : {},
				listColumns: listColumns.length > 0 ? listColumns : void 0,
				fields
			};
		}
	} catch (error) {
		console.debug("EmDash: Could not load database collections for manifest:", error);
	}
	return manifestCollections;
}
/**
* Extract field descriptors from Zod schema
* Note: This is a simplified implementation that handles common types
*/
function extractFieldDescriptors(schema) {
	const fields = {};
	const shape = typeof schema._def?.shape === "function" ? schema._def.shape() : schema.shape || {};
	for (const [name, fieldSchema] of Object.entries(shape)) fields[name] = extractFieldType(name, fieldSchema);
	return fields;
}
/**
* Extract field type from Zod schema
*/
/** Type guard: check if a value is a non-null object */
function isObject(value) {
	return typeof value === "object" && value !== null;
}
function extractFieldType(name, schema) {
	if (!isObject(schema)) return {
		kind: "string",
		label: formatLabel(name)
	};
	if (schema.isPortableText) return {
		kind: "portableText",
		label: formatLabel(name)
	};
	if (schema.isImage) return {
		kind: "image",
		label: formatLabel(name)
	};
	if (schema.isReference) return {
		kind: "reference",
		label: formatLabel(name)
	};
	const def = isObject(schema._def) ? schema._def : void 0;
	switch (typeof def?.typeName === "string" ? def.typeName : void 0) {
		case "ZodString": return {
			kind: "string",
			label: formatLabel(name)
		};
		case "ZodNumber": return {
			kind: "number",
			label: formatLabel(name)
		};
		case "ZodBoolean": return {
			kind: "boolean",
			label: formatLabel(name)
		};
		case "ZodDate": return {
			kind: "datetime",
			label: formatLabel(name)
		};
		case "ZodEnum": {
			const values = Array.isArray(def?.values) ? def.values : [];
			return {
				kind: "select",
				label: formatLabel(name),
				options: values.filter((v) => typeof v === "string").map((v) => ({
					value: v,
					label: v.charAt(0).toUpperCase() + v.slice(1)
				}))
			};
		}
		case "ZodArray": return {
			kind: "array",
			label: formatLabel(name)
		};
		case "ZodObject": return {
			kind: "object",
			label: formatLabel(name)
		};
		case "ZodOptional":
		case "ZodDefault":
			if (def?.innerType) return extractFieldType(name, def.innerType);
			return {
				kind: "string",
				label: formatLabel(name)
			};
		default: return {
			kind: "string",
			label: formatLabel(name)
		};
	}
}
/**
* The limits of every relation a bound reference field names, by relation slug.
*
* Empty when nothing is bound, so a site with no reference fields never issues
* the query, and empty before migration 086 has created the table.
*/
async function relationCardinality(db, collections) {
	if (!collections.some((collection) => collection.fields.some(isStoragelessField))) return /* @__PURE__ */ new Map();
	try {
		const rows = await db.selectFrom("_emdash_relations").select([
			"slug",
			"max_children_per_parent",
			"max_parents_per_child"
		]).execute();
		return new Map(rows.map((row) => [row.slug, {
			maxChildrenPerParent: row.max_children_per_parent,
			maxParentsPerChild: row.max_parents_per_child
		}]));
	} catch (error) {
		if (isMissingTableError(error)) return /* @__PURE__ */ new Map();
		throw error;
	}
}
/**
* Whether the editor may select more than one entry for a bound reference
* field: the question the relation answers, from the end the field views.
*
* `validation.multiple` on the field row is a create-time input — it is what
* set the relation's limit — and the relation is what the write path enforces.
* Reading the field back would let the two disagree, which is what happens when
* a later edit rewrites the row's validation without it.
*/
function boundReferenceIsMultiple(validation, cardinality) {
	return (validation.relationSide === "child" ? cardinality.maxParentsPerChild : cardinality.maxChildrenPerParent) !== 1;
}
function dbFieldDescriptor(field, cardinality) {
	const entry = {
		kind: field.unsupportedType ? "unsupported" : FIELD_TYPE_TO_KIND[field.type],
		label: field.label,
		required: field.required,
		translatable: field.translatable,
		id: field.id
	};
	if (field.unsupportedType) entry.unsupportedType = field.unsupportedType;
	if (field.type === "integer") entry.integer = true;
	if (field.blockTypes) entry.blockTypes = field.blockTypes;
	if (field.blockTypeFingerprint) entry.blockTypeFingerprint = field.blockTypeFingerprint;
	if (field.widget) entry.widget = field.widget;
	if (field.options) entry.options = field.options;
	if (field.validation?.options) entry.options = field.validation.options.map((value) => ({
		value,
		label: value.charAt(0).toUpperCase() + value.slice(1)
	}));
	if (field.validation) {
		const validation = { ...field.validation };
		if (isStoragelessField(field) && field.validation.relation) {
			const limits = cardinality.get(field.validation.relation);
			if (limits) validation.multiple = boundReferenceIsMultiple(field.validation, limits);
		}
		entry.validation = validation;
	}
	if (field.defaultValue !== void 0 && !isStoragelessField(field)) entry.defaultValue = field.defaultValue;
	return entry;
}
/**
* Format field name as label
*/
function formatLabel(name) {
	return name.replace(CAMEL_CASE_PATTERN, " $1").replace(FIRST_CHAR_PATTERN, (str) => str.toUpperCase()).trim();
}
/**
* List revisions for a content entry
*/
async function handleRevisionList(db, collection, entryId, params = {}) {
	try {
		const repo = new RevisionRepository(db);
		const [items, total] = await Promise.all([repo.findByEntry(collection, entryId, { limit: Math.max(1, Math.min(params.limit || 50, 100)) }), repo.countByEntry(collection, entryId)]);
		return {
			success: true,
			data: {
				items,
				total
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_LIST_ERROR",
				message: "Failed to list revisions"
			}
		};
	}
}
/**
* Get a specific revision
*/
async function handleRevisionGet(db, revisionId) {
	try {
		const item = await new RevisionRepository(db).findById(revisionId);
		if (!item) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REVISION_GET_ERROR",
				message: "Failed to get revision"
			}
		};
	}
}
/**
* Restore a revision (updates content to this revision's data and creates new revision)
*/
async function handleRevisionRestore(db, revisionId, callerUserId) {
	try {
		const revision = await new RevisionRepository(db).findById(revisionId);
		if (!revision) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Revision not found: ${revisionId}`
			}
		};
		const stagedReferences = readStagedReferences(revision.data);
		if (stagedReferences) {
			const entry = await new ContentRepository(db).findById(revision.collection, revision.entryId);
			if (entry?.translationGroup) {
				const valid = await validateStagedReferences(db, revision.collection, stagedReferences, entry.translationGroup);
				if (!valid.success) return valid;
			}
		}
		const restoredData = { ...revision.data };
		delete restoredData[STAGED_REFERENCES_BASELINE_KEY];
		const { item, revisionId: queuedRevisionId } = await new ContentRepository(db).restoreRevision(revision.collection, revision.entryId, restoredData, callerUserId);
		if (stagedReferences && item.translationGroup) await applyStagedReferences(db, revision.collection, item.translationGroup, stagedReferences);
		const pruneRepo = new RevisionRepository(db);
		after(async () => {
			try {
				await pruneRepo.pruneQueuedEntry(revision.collection, revision.entryId, queuedRevisionId, 50);
			} catch (error) {
				console.error(`[revisions] Failed to prune revisions for ${revision.collection}/${revision.entryId}:`, error);
			}
		});
		return {
			success: true,
			data: {
				item,
				_rev: encodeRev(item)
			}
		};
	} catch (error) {
		if (error instanceof ContentMutationConflictError) return {
			success: false,
			error: {
				code: "CONFLICT",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "REVISION_RESTORE_ERROR",
				message: "Failed to restore revision"
			}
		};
	}
}
function settingsKey(pluginId, key) {
	return `plugin:${pluginId}:settings:${key}`;
}
/**
* Resolve a plugin's settings schema from either the configured
* (in-process) plugin list or the statically-sandboxed entries.
* Returns null when the plugin doesn't exist, undefined-equivalent
* empty object when it declares no schema.
*/
function getPluginSettingsSchema(configuredPlugins, sandboxedPluginEntries, pluginId) {
	const plugin = configuredPlugins.find((p) => p.id === pluginId);
	if (plugin) return plugin.admin.settingsSchema ?? {};
	const sandboxed = sandboxedPluginEntries.find((e) => e.id === pluginId);
	if (sandboxed) return sandboxed.settingsSchema ?? {};
	return null;
}
/**
* Validate a single value against its schema field.
* Returns an error message, or null when valid.
*/
function validateValue(key, field, value) {
	switch (field.type) {
		case "string":
		case "secret":
		case "url":
		case "email":
			if (typeof value !== "string") return `Setting "${key}" must be a string`;
			if (field.type === "url" && value !== "" && !URL.canParse(value)) return `Setting "${key}" must be a valid URL`;
			if (field.type === "email" && value !== "" && !value.includes("@")) return `Setting "${key}" must be a valid email address`;
			return null;
		case "number":
			if (typeof value !== "number" || Number.isNaN(value)) return `Setting "${key}" must be a number`;
			if (field.min !== void 0 && value < field.min) return `Setting "${key}" must be at least ${field.min}`;
			if (field.max !== void 0 && value > field.max) return `Setting "${key}" must be at most ${field.max}`;
			return null;
		case "boolean": return typeof value === "boolean" ? null : `Setting "${key}" must be a boolean`;
		case "select":
			if (typeof value !== "string" || !field.options.some((o) => o.value === value)) return `Setting "${key}" must be one of the defined options`;
			return null;
		default: return `Setting "${key}" has an unknown field type`;
	}
}
async function buildSettingsResponse(optionsRepo, pluginId, schema) {
	const keys = Object.keys(schema);
	const stored = await optionsRepo.getMany(keys.map((key) => settingsKey(pluginId, key)));
	const values = {};
	const secretsSet = {};
	for (const key of keys) {
		const field = schema[key];
		if (!field) continue;
		const storedValue = stored.get(settingsKey(pluginId, key));
		if (field.type === "secret") {
			secretsSet[key] = storedValue !== void 0 && storedValue !== null && storedValue !== "";
			continue;
		}
		if (storedValue !== void 0 && storedValue !== null) values[key] = storedValue;
		else if ("default" in field && field.default !== void 0) values[key] = field.default;
		else values[key] = null;
	}
	return {
		schema,
		values,
		secretsSet
	};
}
/**
* Get a plugin's settings (schema + current values, secrets masked)
*/
async function handlePluginSettingsGet(db, pluginId, schema) {
	try {
		return {
			success: true,
			data: await buildSettingsResponse(new OptionsRepository(db), pluginId, schema)
		};
	} catch {
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_READ_ERROR,
				message: "Failed to read plugin settings"
			}
		};
	}
}
/**
* Update a plugin's settings.
*
* Only keys present in `updates` are written. A `null` value deletes the
* stored value (reverting to the schema default). Secret fields are
* write-only: they accept a new string value or `null` to clear, and the
* response never echoes them back.
*/
async function handlePluginSettingsUpdate(db, pluginId, schema, updates) {
	try {
		for (const [key, value] of Object.entries(updates)) {
			const field = schema[key];
			if (!field) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: `Unknown setting "${key}" for plugin "${pluginId}"`
				}
			};
			if (value === null) continue;
			const error = validateValue(key, field, value);
			if (error) return {
				success: false,
				error: {
					code: ErrorCode.VALIDATION_ERROR,
					message: error
				}
			};
		}
		const encodedUpdates = /* @__PURE__ */ new Map();
		for (const [key, value] of Object.entries(updates)) encodedUpdates.set(key, value === null ? null : await encodePluginSettingValue(pluginId, key, value, schema));
		return {
			success: true,
			data: await withTransaction(db, async (trx) => {
				const txRepo = new OptionsRepository(trx);
				for (const [key, value] of encodedUpdates) {
					if (value === null) await txRepo.delete(settingsKey(pluginId, key));
					else await txRepo.set(settingsKey(pluginId, key), value);
					await trx.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).where("collection", "=", "__kv").where("id", "=", `settings:${key}`).execute();
				}
				return buildSettingsResponse(txRepo, pluginId, schema);
			})
		};
	} catch (error) {
		if (error instanceof PluginSettingEncryptionError) return {
			success: false,
			error: {
				code: error.code,
				message: error.message
			}
		};
		if (error instanceof EmDashSecretsError) return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTING_ENCRYPTION_KEY_INVALID,
				message: "EMDASH_ENCRYPTION_KEY is malformed. Restore or correct the configured key from its secret backup. Generate a new key only if no stored plugin setting depends on the lost key."
			}
		};
		return {
			success: false,
			error: {
				code: ErrorCode.PLUGIN_SETTINGS_UPDATE_ERROR,
				message: "Failed to update plugin settings"
			}
		};
	}
}
/**
* Generate a deterministic index name.
* Unique indexes use a `uidx_` prefix to avoid collisions with regular indexes on the same fields.
*/
function generateIndexName(pluginId, collection, fields, options) {
	return `${options?.unique ? "uidx" : "idx"}_plugin_${pluginId}_${collection}_${fields.join("_")}`.substring(0, 128);
}
/**
* Generate a Kysely sql expression for creating an expression index.
*
* Validates all inputs before interpolation. The collection uses the
* permissive manifest-key rules rather than SQL-identifier rules — it is
* stored as opaque text and only reaches SQL inside the generated index
* name — so kebab-case collections index like any other.
*/
function generateCreateIndexSql(db, pluginId, collection, fields, options) {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateStorageCollectionName(collection, "collection name");
	for (const field of fields) validateJsonFieldName(field, "index field name");
	const indexName = generateIndexName(pluginId, collection, fields, options);
	const expressions = fields.map((field) => {
		if (isPostgres(db)) return `(${jsonExtractExpr(db, "data", field)})`;
		return jsonExtractExpr(db, "data", field);
	}).join(", ");
	const createKeyword = options?.unique ? "CREATE UNIQUE INDEX" : "CREATE INDEX";
	return sql`${sql.raw(createKeyword)} IF NOT EXISTS ${sql.ref(indexName)}
		ON _plugin_storage(plugin_id, collection, ${sql.raw(expressions)})
	`;
}
/**
* Generate a Kysely sql expression for dropping an index.
*
* Uses sql.ref() for safe identifier quoting.
*/
function generateDropIndexSql(indexName) {
	return sql`DROP INDEX IF EXISTS ${sql.ref(indexName)}`;
}
/**
* Normalize index declarations to arrays of field arrays
*/
function normalizeIndexes(indexes) {
	return indexes.map((index) => Array.isArray(index) ? index : [index]);
}
/**
* Create all declared indexes for a plugin collection
*/
async function createStorageIndexes(db, pluginId, collection, indexes, options) {
	const normalized = normalizeIndexes(indexes);
	const uniqueNormalized = options?.uniqueIndexes ? normalizeIndexes(options.uniqueIndexes) : [];
	const uniqueSet = new Set(uniqueNormalized.map((f) => f.join(",")));
	const allEntries = [...normalized.filter((f) => !uniqueSet.has(f.join(","))).map((fields) => ({
		fields,
		unique: false
	})), ...uniqueNormalized.map((fields) => ({
		fields,
		unique: true
	}))];
	const created = [];
	const errors = [];
	for (const entry of allEntries) {
		const { fields } = entry;
		const indexName = generateIndexName(pluginId, collection, fields, { unique: entry.unique });
		try {
			await generateCreateIndexSql(db, pluginId, collection, fields, { unique: entry.unique }).execute(db);
			const fieldsJson = JSON.stringify(fields);
			await db.insertInto("_plugin_indexes").values({
				plugin_id: pluginId,
				collection,
				index_name: indexName,
				fields: fieldsJson
			}).onConflict((oc) => oc.columns([
				"plugin_id",
				"collection",
				"index_name"
			]).doUpdateSet({ fields: fieldsJson }).whereRef("_plugin_indexes.fields", "!=", "excluded.fields")).execute();
			created.push(indexName);
		} catch (error) {
			errors.push({
				index: indexName,
				error: error instanceof Error ? error.message : String(error)
			});
		}
	}
	return {
		created,
		errors
	};
}
/**
* Remove indexes that are no longer declared
*/
async function removeOrphanedIndexes(db, pluginId, collection, currentIndexes, options) {
	const normalized = normalizeIndexes(currentIndexes);
	const uniqueNormalized = options?.uniqueIndexes ? normalizeIndexes(options.uniqueIndexes) : [];
	const uniqueSet = new Set(uniqueNormalized.map((f) => f.join(",")));
	const currentIndexNames = /* @__PURE__ */ new Set();
	for (const fields of normalized) if (!uniqueSet.has(fields.join(","))) currentIndexNames.add(generateIndexName(pluginId, collection, fields));
	for (const fields of uniqueNormalized) currentIndexNames.add(generateIndexName(pluginId, collection, fields, { unique: true }));
	const existingIndexes = await db.selectFrom("_plugin_indexes").select(["index_name"]).where("plugin_id", "=", pluginId).where("collection", "=", collection).execute();
	const removed = [];
	const errors = [];
	for (const { index_name } of existingIndexes) if (!currentIndexNames.has(index_name)) try {
		await generateDropIndexSql(index_name).execute(db);
		await db.deleteFrom("_plugin_indexes").where("plugin_id", "=", pluginId).where("collection", "=", collection).where("index_name", "=", index_name).execute();
		removed.push(index_name);
	} catch (error) {
		errors.push({
			index: index_name,
			error: error instanceof Error ? error.message : String(error)
		});
	}
	return {
		removed,
		errors
	};
}
/**
* Sync indexes for a plugin collection (create new, remove old)
*/
async function syncStorageIndexes(db, pluginId, collection, indexes, options) {
	const [createResult, removeResult] = await Promise.all([createStorageIndexes(db, pluginId, collection, indexes, options), removeOrphanedIndexes(db, pluginId, collection, indexes, options)]);
	return {
		created: createResult.created,
		removed: removeResult.removed,
		errors: [...createResult.errors, ...removeResult.errors]
	};
}
/**
* Materialize the storage indexes a set of plugins declare in their
* manifests. Failures are logged per collection and never thrown — a missing
* index affects query performance, not correctness, so it must not fail an
* install or a scheduler tick.
*/
async function syncDeclaredStorageIndexes(db, plugins) {
	for (const plugin of plugins) for (const [collection, config] of Object.entries(plugin.storage ?? {})) try {
		const result = await syncStorageIndexes(db, plugin.id, collection, config.indexes, { uniqueIndexes: config.uniqueIndexes });
		for (const failure of result.errors) console.error(`[plugins] Failed to sync storage index ${failure.index} for ${plugin.id}/${collection}: ${failure.error}`);
	} catch (error) {
		console.error(`[plugins] Failed to sync storage indexes for ${plugin.id}/${collection}:`, error);
	}
}
/**
* Remove all indexes for a plugin
*/
async function removeAllPluginIndexes(db, pluginId) {
	const existingIndexes = await db.selectFrom("_plugin_indexes").select(["index_name", "collection"]).where("plugin_id", "=", pluginId).execute();
	const removed = [];
	const errors = [];
	for (const { index_name } of existingIndexes) try {
		await generateDropIndexSql(index_name).execute(db);
		removed.push(index_name);
	} catch (error) {
		errors.push({
			index: index_name,
			error: error instanceof Error ? error.message : String(error)
		});
	}
	await db.deleteFrom("_plugin_indexes").where("plugin_id", "=", pluginId).execute();
	return {
		removed,
		errors
	};
}
/** Semver-like pattern: digits, dots, hyphens, plus signs (e.g. 1.0.0, 1.0.0-beta.1) */
var VERSION_PATTERN = /^[a-z0-9][a-z0-9._+-]*$/i;
function validateVersion(version) {
	if (version.includes("..")) throw new Error("Invalid version format");
	if (!VERSION_PATTERN.test(version)) throw new Error("Invalid version format");
}
function getClient(marketplaceUrl, siteOrigin) {
	if (!marketplaceUrl) return null;
	return createMarketplaceClient(marketplaceUrl, siteOrigin);
}
function diffCapabilities(oldCaps, newCaps) {
	const oldNorm = normalizeCapabilities(oldCaps);
	const newNorm = normalizeCapabilities(newCaps);
	const oldSet = new Set(oldNorm);
	const newSet = new Set(newNorm);
	return {
		added: newNorm.filter((c) => !oldSet.has(c)),
		removed: oldNorm.filter((c) => !newSet.has(c))
	};
}
/**
* Diff route visibility between two manifests.
* Returns routes that changed from private to public (newly exposed).
*/
function diffRouteVisibility(oldManifest, newManifest) {
	const oldPublicRoutes = /* @__PURE__ */ new Set();
	if (oldManifest) for (const entry of oldManifest.routes) {
		const normalized = normalizeManifestRoute$1(entry);
		if (normalized.public === true) oldPublicRoutes.add(normalized.name);
	}
	const newlyPublic = [];
	for (const entry of newManifest.routes) {
		const normalized = normalizeManifestRoute$1(entry);
		if (normalized.public === true && !oldPublicRoutes.has(normalized.name)) newlyPublic.push(normalized.name);
	}
	return { newlyPublic };
}
async function resolveVersionMetadata(client, pluginId, pluginDetail, version) {
	if (pluginDetail.latestVersion?.version === version) return {
		version: pluginDetail.latestVersion.version,
		minEmDashVersion: pluginDetail.latestVersion.minEmDashVersion,
		bundleSize: pluginDetail.latestVersion.bundleSize,
		checksum: pluginDetail.latestVersion.checksum,
		changelog: pluginDetail.latestVersion.changelog,
		capabilities: pluginDetail.latestVersion.capabilities,
		status: pluginDetail.latestVersion.status,
		auditVerdict: pluginDetail.latestVersion.audit?.verdict ?? null,
		imageAuditVerdict: pluginDetail.latestVersion.imageAudit?.verdict ?? null,
		publishedAt: pluginDetail.latestVersion.publishedAt
	};
	return (await client.getVersions(pluginId)).find((v) => v.version === version) ?? null;
}
/** A null verdict means no audit ran, which is allowed; "fail" and "warn" are not. */
function checkAuditVerdict(versionMetadata) {
	if (versionMetadata.auditVerdict !== "fail" && versionMetadata.auditVerdict !== "warn") return null;
	return {
		success: false,
		error: {
			code: "AUDIT_FAILED",
			message: versionMetadata.auditVerdict === "fail" ? "Plugin failed security audit and cannot be installed or updated" : "Plugin audit was inconclusive and cannot be installed or updated until reviewed"
		}
	};
}
function validateBundleIdentity(bundle, pluginId, version) {
	if (bundle.manifest.id !== pluginId) return {
		success: false,
		error: {
			code: "MANIFEST_MISMATCH",
			message: `Bundle manifest ID (${bundle.manifest.id}) does not match requested plugin (${pluginId})`
		}
	};
	if (bundle.manifest.version !== version) return {
		success: false,
		error: {
			code: "MANIFEST_VERSION_MISMATCH",
			message: `Bundle manifest version (${bundle.manifest.version}) does not match requested version (${version})`
		}
	};
	return null;
}
function bundlePrefix(source, pluginId, version) {
	return `${source}/${pluginId}/${version}`;
}
async function storeBundleInR2(storage, pluginId, version, bundle, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	await storage.upload({
		key: `${prefix}/manifest.json`,
		body: new TextEncoder().encode(JSON.stringify(bundle.manifest)),
		contentType: "application/json"
	});
	await storage.upload({
		key: `${prefix}/backend.js`,
		body: new TextEncoder().encode(bundle.backendCode),
		contentType: "application/javascript"
	});
	if (bundle.adminCode) await storage.upload({
		key: `${prefix}/admin.js`,
		body: new TextEncoder().encode(bundle.adminCode),
		contentType: "application/javascript"
	});
}
/** Read a ReadableStream to string */
async function streamToText(stream) {
	return new Response(stream).text();
}
/**
* Load a plugin bundle from site-local R2 storage.
*
* `source` selects the R2 key prefix: marketplace plugins are stored
* under `marketplace/<id>/<version>/`, registry plugins under
* `registry/<id>/<version>/`. Defaults to `"marketplace"` for
* backwards compatibility with pre-registry call sites.
*/
async function loadBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	try {
		const manifestResult = await storage.download(`${prefix}/manifest.json`);
		const backendResult = await storage.download(`${prefix}/backend.js`);
		const manifestText = await streamToText(manifestResult.body);
		const backendCode = await streamToText(backendResult.body);
		const parsed = JSON.parse(manifestText);
		const result = pluginManifestSchema$1.safeParse(parsed);
		if (!result.success) return null;
		const manifest = reconcileManifestAccess$1(result.data);
		warnDeprecatedPluginCapabilities(manifest.id, manifest.capabilities);
		let adminCode;
		try {
			adminCode = await streamToText((await storage.download(`${prefix}/admin.js`)).body);
		} catch {}
		return {
			manifest,
			backendCode,
			adminCode
		};
	} catch {
		return null;
	}
}
/** Delete a plugin bundle from site-local R2 storage */
async function deleteBundleFromR2(storage, pluginId, version, source = "marketplace") {
	validatePluginIdentifier(pluginId, "plugin ID");
	validateVersion(version);
	const prefix = bundlePrefix(source, pluginId, version);
	for (const file of [
		"manifest.json",
		"backend.js",
		"admin.js"
	]) try {
		await storage.delete(`${prefix}/${file}`);
	} catch {}
}
async function rollbackPluginUpdate(db, storage, previousState, failedVersion, source) {
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required"
		}
	};
	if (previousState.source !== source) return {
		success: false,
		error: {
			code: "UPDATE_ROLLBACK_CONFLICT",
			message: "Plugin source changed during update"
		}
	};
	try {
		if (!await new PluginStateRepository(db).restoreIfVersion(failedVersion, previousState)) return {
			success: false,
			error: {
				code: "UPDATE_ROLLBACK_CONFLICT",
				message: "Plugin state changed before the failed update could be rolled back"
			}
		};
		await deleteBundleFromR2(storage, previousState.pluginId, failedVersion, source);
		return {
			success: true,
			data: {
				pluginId: previousState.pluginId,
				version: previousState.version
			}
		};
	} catch (error) {
		console.error("Failed to roll back plugin update:", error);
		return {
			success: false,
			error: {
				code: "UPDATE_ROLLBACK_FAILED",
				message: "Failed to roll back plugin update"
			}
		};
	}
}
async function handleMarketplaceInstall(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl, opts?.siteOrigin);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for marketplace plugin installation"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required for marketplace plugins", sandboxRunner)
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (existing && existing.source === "marketplace") return {
			success: false,
			error: {
				code: "ALREADY_INSTALLED",
				message: `Plugin ${pluginId} is already installed`
			}
		};
		if (opts?.configuredPluginIds?.has(pluginId)) return {
			success: false,
			error: {
				code: "PLUGIN_ID_CONFLICT",
				message: `Cannot install marketplace plugin "${pluginId}" — a configured plugin with the same ID already exists`
			}
		};
		const pluginDetail = await client.getPlugin(pluginId);
		const version = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!version) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `No published versions found for plugin ${pluginId}`
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, version);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${version} was not found for plugin ${pluginId}`
			}
		};
		const auditError = checkAuditVerdict(versionMetadata);
		if (auditError) return auditError;
		const bundle = await client.downloadBundle(pluginId, version);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, version);
		if (bundleIdentityError) return bundleIdentityError;
		const routeVisibilityChanges = diffRouteVisibility(void 0, bundle.manifest);
		const hasPublicRoutes = routeVisibilityChanges.newlyPublic.length > 0;
		const publicRoutes = routeVisibilityChanges.newlyPublic.toSorted();
		const acknowledgedPublicRoutes = (opts?.acknowledgedPublicRoutes ?? []).toSorted();
		const mcpTools = bundle.manifest.mcp?.tools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		const consentDetails = {
			routeVisibilityChanges: hasPublicRoutes ? { newlyPublic: publicRoutes } : void 0,
			mcpTools
		};
		if (hasPublicRoutes && JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(publicRoutes)) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin install exposes public (unauthenticated) routes",
				details: consentDetails
			}
		};
		if ((mcpTools?.length ?? 0) > 0 && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin MCP tools require explicit consent",
				details: consentDetails
			}
		};
		await storeBundleInR2(storage, pluginId, version, bundle);
		await stateRepo.upsert(pluginId, version, "active", {
			source: "marketplace",
			marketplaceVersion: version,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0
		});
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		client.reportInstall(pluginId, version).catch(() => {});
		return {
			success: true,
			data: {
				pluginId,
				version,
				capabilities: bundle.manifest.capabilities
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Plugin marketplace is currently unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while installing plugin"
			}
		};
		if (err && typeof err === "object" && "code" in err) {
			const code = err.code;
			if (typeof code === "string" && code.trim()) return {
				success: false,
				error: {
					code,
					message: "Failed to install plugin from marketplace"
				}
			};
		}
		console.error("Failed to install marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "INSTALL_FAILED",
				message: "Failed to install plugin from marketplace"
			}
		};
	}
}
async function handleMarketplaceUpdate(db, storage, sandboxRunner, marketplaceUrl, pluginId, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required"
		}
	};
	if (!opts?.sandboxBypassed && (!sandboxRunner || !sandboxRunner.isAvailable())) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required", sandboxRunner)
		}
	};
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const oldVersion = existing.marketplaceVersion ?? existing.version;
		const pluginDetail = await client.getPlugin(pluginId);
		const newVersion = opts?.version ?? pluginDetail.latestVersion?.version;
		if (!newVersion) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: "No newer version available"
			}
		};
		if (newVersion === oldVersion) return {
			success: false,
			error: {
				code: "ALREADY_UP_TO_DATE",
				message: "Plugin is already up to date"
			}
		};
		const versionMetadata = await resolveVersionMetadata(client, pluginId, pluginDetail, newVersion);
		if (!versionMetadata) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: `Version ${newVersion} was not found for plugin ${pluginId}`
			}
		};
		const auditError = checkAuditVerdict(versionMetadata);
		if (auditError) return auditError;
		const bundle = await client.downloadBundle(pluginId, newVersion);
		if (versionMetadata.checksum && bundle.checksum !== versionMetadata.checksum) return {
			success: false,
			error: {
				code: "CHECKSUM_MISMATCH",
				message: "Bundle checksum does not match marketplace record. Download may be corrupted."
			}
		};
		const bundleIdentityError = validateBundleIdentity(bundle, pluginId, newVersion);
		if (bundleIdentityError) return bundleIdentityError;
		const oldBundle = await loadBundleFromR2(storage, pluginId, oldVersion);
		const capabilityChanges = diffCapabilities(oldBundle?.manifest.capabilities ?? [], bundle.manifest.capabilities);
		const hasEscalation = capabilityChanges.added.length > 0;
		const routeVisibilityChanges = diffRouteVisibility(oldBundle?.manifest, bundle.manifest);
		const hasNewPublicRoutes = routeVisibilityChanges.newlyPublic.length > 0;
		const newlyPublicRoutes = routeVisibilityChanges.newlyPublic.toSorted();
		const acknowledgedPublicRoutes = (opts?.acknowledgedPublicRoutes ?? []).toSorted();
		const oldMcpTools = [...oldBundle?.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const newMcpTools = [...bundle.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const hasMcpChanges = JSON.stringify(oldMcpTools) !== JSON.stringify(newMcpTools);
		const mcpTools = newMcpTools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		const consentDetails = {
			capabilityChanges,
			routeVisibilityChanges: hasNewPublicRoutes ? { newlyPublic: newlyPublicRoutes } : void 0,
			mcpTools: hasMcpChanges ? mcpTools : void 0
		};
		if (hasEscalation && !opts?.confirmCapabilityChanges) return {
			success: false,
			error: {
				code: "CAPABILITY_ESCALATION",
				message: "Plugin update requires new capabilities",
				details: consentDetails
			}
		};
		if (hasNewPublicRoutes && JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(newlyPublicRoutes)) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin update exposes new public (unauthenticated) routes",
				details: consentDetails
			}
		};
		if (hasMcpChanges && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin update changes its MCP tools",
				details: consentDetails
			}
		};
		await storeBundleInR2(storage, pluginId, newVersion, bundle);
		await stateRepo.upsert(pluginId, newVersion, "active", {
			source: "marketplace",
			marketplaceVersion: newVersion,
			displayName: pluginDetail.name,
			description: pluginDetail.description ?? void 0,
			mcpToolsEnabled: false,
			mcpToolsConsent: null
		});
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		return {
			success: true,
			data: {
				pluginId,
				oldVersion,
				newVersion,
				capabilityChanges,
				routeVisibilityChanges: hasNewPublicRoutes ? routeVisibilityChanges : void 0
			}
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		if (err instanceof MarketplaceError) return {
			success: false,
			error: {
				code: err.code ?? "MARKETPLACE_ERROR",
				message: err.message
			}
		};
		console.error("Failed to update marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_FAILED",
				message: "Failed to update plugin"
			}
		};
	}
}
async function handleMarketplaceUninstall(db, storage, pluginId, opts) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "marketplace") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No marketplace plugin found: ${pluginId}`
			}
		};
		const version = existing.marketplaceVersion ?? existing.version;
		await opts?.beforeDelete?.();
		let dataDeleted = false;
		if (opts?.deleteData) try {
			await db.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).execute();
			dataDeleted = true;
		} catch {}
		try {
			await removeAllPluginIndexes(db, pluginId);
		} catch {}
		await stateRepo.delete(pluginId);
		if (storage) await deleteBundleFromR2(storage, pluginId, version);
		return {
			success: true,
			data: {
				pluginId,
				dataDeleted
			}
		};
	} catch (err) {
		console.error("Failed to uninstall marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "UNINSTALL_FAILED",
				message: "Failed to uninstall plugin"
			}
		};
	}
}
async function handleMarketplaceUpdateCheck(db, marketplaceUrl) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		const marketplacePlugins = await new PluginStateRepository(db).getMarketplacePlugins();
		const items = [];
		for (const plugin of marketplacePlugins) try {
			const detail = await client.getPlugin(plugin.pluginId);
			const latest = detail.latestVersion?.version;
			const installed = plugin.marketplaceVersion ?? plugin.version;
			if (!latest) continue;
			const hasUpdate = latest !== installed;
			let capabilityChanges;
			let hasCapabilityChanges = false;
			if (hasUpdate && detail.latestVersion) {
				capabilityChanges = diffCapabilities(detail.capabilities ?? [], detail.latestVersion.capabilities ?? []);
				hasCapabilityChanges = capabilityChanges.added.length > 0 || capabilityChanges.removed.length > 0;
			}
			items.push({
				pluginId: plugin.pluginId,
				installed,
				latest: latest ?? installed,
				hasUpdate,
				hasCapabilityChanges,
				capabilityChanges: hasCapabilityChanges ? capabilityChanges : void 0,
				hasRouteVisibilityChanges: false
			});
		} catch (err) {
			console.warn(`Failed to check updates for ${plugin.pluginId}:`, err);
		}
		return {
			success: true,
			data: { items }
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to check marketplace updates:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_CHECK_FAILED",
				message: "Failed to check for updates"
			}
		};
	}
}
async function handleMarketplaceSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.search(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search marketplace:", err);
		return {
			success: false,
			error: {
				code: "SEARCH_FAILED",
				message: "Failed to search marketplace"
			}
		};
	}
}
async function handleMarketplaceGetPlugin(marketplaceUrl, pluginId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getPlugin(pluginId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Plugin not found: ${pluginId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace plugin:", err);
		return {
			success: false,
			error: {
				code: "GET_PLUGIN_FAILED",
				message: "Failed to get plugin details"
			}
		};
	}
}
async function handleThemeSearch(marketplaceUrl, query, opts) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.searchThemes(query, opts)
		};
	} catch (err) {
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to search themes:", err);
		return {
			success: false,
			error: {
				code: "THEME_SEARCH_FAILED",
				message: "Failed to search themes"
			}
		};
	}
}
async function handleThemeGetDetail(marketplaceUrl, themeId) {
	const client = getClient(marketplaceUrl);
	if (!client) return {
		success: false,
		error: {
			code: "MARKETPLACE_NOT_CONFIGURED",
			message: "Marketplace is not configured"
		}
	};
	try {
		return {
			success: true,
			data: await client.getTheme(themeId)
		};
	} catch (err) {
		if (err instanceof MarketplaceError && err.status === 404) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Theme not found: ${themeId}`
			}
		};
		if (err instanceof MarketplaceUnavailableError) return {
			success: false,
			error: {
				code: "MARKETPLACE_UNAVAILABLE",
				message: "Marketplace is unavailable"
			}
		};
		console.error("Failed to get marketplace theme:", err);
		return {
			success: false,
			error: {
				code: "GET_THEME_FAILED",
				message: "Failed to get theme details"
			}
		};
	}
}
/** Maximum accepted gzip payload size. */
var MAX_BUNDLE_COMPRESSED_BYTES = 393216;
/** Maximum aggregate size of regular-file contents. */
var MAX_BUNDLE_SIZE = 262144;
/** Maximum size of one regular file. */
var MAX_BUNDLE_FILE_BYTES = 131072;
/** Maximum number of regular files. */
var MAX_BUNDLE_FILE_COUNT = 20;
/** Maximum total tar entries, including harmless directory entries. */
var MAX_BUNDLE_TAR_ENTRY_COUNT = 32;
/**
* Maximum tar stream size after decompression. This includes USTAR headers,
* file padding, and the end marker in addition to the regular-file contents.
*/
var MAX_BUNDLE_DECOMPRESSED_BYTES = 289772;
var TAR_BLOCK_BYTES = 512;
var TAR_END_BYTES = TAR_BLOCK_BYTES * 2;
var OCTAL_PATTERN = /^[0-7]+$/;
var WINDOWS_DRIVE_PATTERN = /^[a-zA-Z]:/;
var decoder = new TextDecoder("utf-8", {
	fatal: true,
	ignoreBOM: false
});
async function validatePluginBundle(compressed, options = {}) {
	if (compressed.byteLength > MAX_BUNDLE_COMPRESSED_BYTES) return verificationError$1("BUNDLE_COMPRESSED_SIZE_EXCEEDED", "The compressed plugin bundle exceeds the size limit.");
	const decompressed = await decompressBundle(compressed);
	if (!decompressed.success) return decompressed;
	const files = parseTar(decompressed.value);
	if (!files.success) return files;
	const manifestFile = files.value.get("manifest.json");
	if (!manifestFile) return verificationError$1("BUNDLE_MISSING_MANIFEST", "The plugin bundle is missing manifest.json.");
	const backend = files.value.get("backend.js");
	if (!backend) return verificationError$1("BUNDLE_MISSING_BACKEND", "The plugin bundle is missing backend.js.");
	let parsed;
	try {
		parsed = JSON.parse(decoder.decode(manifestFile.data));
	} catch {
		return verificationError$1("BUNDLE_INVALID_MANIFEST", "The plugin bundle manifest is not valid JSON.");
	}
	const validated = pluginManifestSchema.safeParse(parsed);
	if (!validated.success) return verificationError$1("BUNDLE_INVALID_MANIFEST", "The plugin bundle manifest failed schema validation.");
	const manifest = reconcileManifestAccess(validated.data);
	if (options.expectedSlug !== void 0 && manifest.id !== options.expectedSlug) return verificationError$1("BUNDLE_ID_MISMATCH", "The plugin bundle manifest id does not match the expected plugin.");
	if (options.expectedVersion !== void 0 && manifest.version !== options.expectedVersion) return verificationError$1("BUNDLE_VERSION_MISMATCH", "The plugin bundle manifest version does not match the expected version.");
	const result = {
		manifest,
		declaredAccess: manifest.declaredAccess ?? {},
		backend: backend.data
	};
	const admin = files.value.get("admin.js");
	if (admin) result.admin = admin.data;
	return {
		success: true,
		value: result
	};
}
async function decompressBundle(bytes) {
	const source = new ReadableStream({ start(controller) {
		controller.enqueue(bytes);
		controller.close();
	} });
	let reader;
	try {
		reader = source.pipeThrough(createGzipDecoder()).getReader();
	} catch {
		return verificationError$1("BUNDLE_INVALID_ARCHIVE", "The plugin bundle is not valid gzip data.");
	}
	const chunks = [];
	let total = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (!value) continue;
			total += value.byteLength;
			if (total > MAX_BUNDLE_DECOMPRESSED_BYTES) {
				await reader.cancel().catch(() => void 0);
				return verificationError$1("BUNDLE_DECOMPRESSED_SIZE_EXCEEDED", "The decompressed plugin bundle exceeds the size limit.");
			}
			chunks.push(value);
		}
	} catch {
		return verificationError$1("BUNDLE_INVALID_ARCHIVE", "The plugin bundle is not valid gzip data.");
	}
	const output = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		output.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return {
		success: true,
		value: output
	};
}
function parseTar(bytes) {
	if (bytes.byteLength < TAR_END_BYTES || bytes.byteLength % TAR_BLOCK_BYTES !== 0) return invalidArchive();
	const files = /* @__PURE__ */ new Map();
	const rawPaths = /* @__PURE__ */ new Set();
	const normalizedPaths = /* @__PURE__ */ new Set();
	let offset = 0;
	let fileCount = 0;
	let entryCount = 0;
	let totalFileBytes = 0;
	let ended = false;
	while (offset + TAR_BLOCK_BYTES <= bytes.byteLength) {
		const header = bytes.subarray(offset, offset + TAR_BLOCK_BYTES);
		if (isZeroBlock(header)) {
			if (!isZeroBlock(bytes.subarray(offset + TAR_BLOCK_BYTES, offset + TAR_END_BYTES))) return invalidArchive();
			if (bytes.subarray(offset + TAR_END_BYTES).some((byte) => byte !== 0)) return invalidArchive();
			ended = true;
			break;
		}
		if (!validChecksum(header)) return invalidArchive();
		entryCount += 1;
		if (entryCount > MAX_BUNDLE_TAR_ENTRY_COUNT) return verificationError$1("BUNDLE_FILE_COUNT_EXCEEDED", "The plugin bundle contains too many archive entries.");
		const rawName = readTarPath(header);
		if (!rawName.success) return rawName;
		const typeFlag = header[156];
		const type = typeFlag === 0 ? "file" : String.fromCharCode(typeFlag ?? 0);
		const isDirectory = type === "5";
		const normalized = normalizePath(rawName.value, isDirectory);
		if (!normalized.success) return normalized;
		if (rawPaths.has(rawName.value) || normalizedPaths.has(normalized.value)) return verificationError$1("BUNDLE_PATH_COLLISION", "The plugin bundle contains duplicate or ambiguous paths.");
		rawPaths.add(rawName.value);
		normalizedPaths.add(normalized.value);
		const size = readOctal(header.subarray(124, 136));
		if (size === null || !Number.isSafeInteger(size)) return invalidArchive();
		const bodyStart = offset + TAR_BLOCK_BYTES;
		const nextOffset = bodyStart + Math.ceil(size / TAR_BLOCK_BYTES) * TAR_BLOCK_BYTES;
		if (nextOffset > bytes.byteLength) return invalidArchive();
		if (isDirectory) {
			if (size !== 0) return invalidArchive();
		} else if (type === "file" || type === "0") {
			fileCount += 1;
			if (fileCount > MAX_BUNDLE_FILE_COUNT) return verificationError$1("BUNDLE_FILE_COUNT_EXCEEDED", "The plugin bundle contains too many files.");
			if (size > MAX_BUNDLE_FILE_BYTES) return verificationError$1("BUNDLE_FILE_SIZE_EXCEEDED", "A file in the plugin bundle exceeds the per-file size limit.");
			totalFileBytes += size;
			if (totalFileBytes > MAX_BUNDLE_SIZE) return verificationError$1("BUNDLE_DECOMPRESSED_SIZE_EXCEEDED", "The plugin bundle file contents exceed the size limit.");
			files.set(normalized.value, {
				name: normalized.value,
				data: bytes.slice(bodyStart, bodyStart + size)
			});
		} else return verificationError$1("BUNDLE_UNSUPPORTED_ENTRY", "The plugin bundle contains an unsupported archive entry type.");
		offset = nextOffset;
	}
	if (!ended) return invalidArchive();
	return {
		success: true,
		value: files
	};
}
function readTarPath(header) {
	const name = readTarString(header.subarray(0, 100));
	const prefix = readTarString(header.subarray(345, 500));
	if (name === null || prefix === null || name.length === 0) return verificationError$1("BUNDLE_INVALID_PATH", "The plugin bundle contains a malformed path.");
	return {
		success: true,
		value: prefix ? `${prefix}/${name}` : name
	};
}
function readTarString(field) {
	const terminator = field.indexOf(0);
	const end = terminator === -1 ? field.length : terminator;
	if (terminator !== -1 && field.subarray(terminator + 1).some((byte) => byte !== 0)) return null;
	try {
		return decoder.decode(field.subarray(0, end));
	} catch {
		return null;
	}
}
function normalizePath(raw, isDirectory) {
	if (raw.includes("\\") || raw.startsWith("/") || WINDOWS_DRIVE_PATTERN.test(raw) || hasControlCharacter(raw) || raw.endsWith("/") !== isDirectory) return verificationError$1("BUNDLE_INVALID_PATH", "The plugin bundle contains an unsafe path.");
	const parts = raw.split("/");
	if (isDirectory) parts.pop();
	const normalized = [];
	for (const part of parts) {
		if (part === ".") continue;
		if (part === "" || part === "..") return verificationError$1("BUNDLE_INVALID_PATH", "The plugin bundle contains an unsafe path.");
		normalized.push(part.normalize("NFC"));
	}
	if (normalized.length === 0) return verificationError$1("BUNDLE_INVALID_PATH", "The plugin bundle contains a malformed path.");
	return {
		success: true,
		value: normalized.join("/")
	};
}
function hasControlCharacter(value) {
	for (const character of value) {
		const codePoint = character.codePointAt(0);
		if (codePoint !== void 0 && (codePoint <= 31 || codePoint === 127)) return true;
	}
	return false;
}
function readOctal(field) {
	const text = new TextDecoder().decode(field).replaceAll("\0", "").trim();
	if (!OCTAL_PATTERN.test(text)) return null;
	const value = Number.parseInt(text, 8);
	return Number.isSafeInteger(value) ? value : null;
}
function validChecksum(header) {
	const expected = readOctal(header.subarray(148, 156));
	if (expected === null) return false;
	let actual = 0;
	for (let index = 0; index < header.length; index += 1) actual += index >= 148 && index < 156 ? 32 : header[index] ?? 0;
	return actual === expected;
}
function isZeroBlock(block) {
	return block.byteLength === TAR_BLOCK_BYTES && block.every((byte) => byte === 0);
}
function invalidArchive() {
	return verificationError$1("BUNDLE_INVALID_ARCHIVE", "The plugin bundle is not a valid tar archive.");
}
var bundleDecoder = new TextDecoder("utf-8", { fatal: true });
async function validateRegistryArtifact(bytes, checksum, slug, version) {
	const checksumReport = await verifyMultihash$1(bytes, checksum);
	if (!checksumReport.success) return checksumReport;
	const [artifactDigest, ...artifactDigests] = await computeArtifactDigestCandidates(bytes);
	const bundleReport = await validatePluginBundle(bytes, {
		expectedSlug: slug,
		expectedVersion: version
	});
	if (!bundleReport.success) return bundleReport;
	const manifest = pluginManifestSchema$1.safeParse(bundleReport.value.manifest);
	if (!manifest.success) return {
		success: false,
		error: {
			code: "BUNDLE_RUNTIME_UNSUPPORTED",
			message: "The plugin bundle uses manifest features unsupported by this EmDash version."
		}
	};
	try {
		return {
			success: true,
			value: {
				bundle: {
					manifest: reconcileManifestAccess$1(manifest.data),
					backendCode: bundleDecoder.decode(bundleReport.value.backend),
					adminCode: bundleReport.value.admin === void 0 ? void 0 : bundleDecoder.decode(bundleReport.value.admin),
					checksum
				},
				artifactDigest,
				artifactDigests
			}
		};
	} catch {
		return {
			success: false,
			error: {
				code: "BUNDLE_INVALID_CODE_ENCODING",
				message: "Plugin bundle code must be valid UTF-8."
			}
		};
	}
}
/**
* Plugin identifier helpers for the experimental decentralized plugin
* registry.
*
* Registry plugins are addressed by `(publisher_did, slug)`, but the
* EmDash runtime threads a single `pluginId: string` through every
* install primitive (R2 storage keys, `PluginStateRepository`,
* `syncMarketplacePlugins`, sandbox cache keys). Rather than refactor
* everything to carry a composite identifier, we normalize the registry
* tuple to an opaque content-addressed id that satisfies the existing
* `validatePluginIdentifier` shape (`/^[a-z][a-z0-9_-]*$/`).
*
* The normalized id is:
*
*   `r_` + base32-encoded SHA-256(publisher_did + "\n" + slug), truncated.
*
* Properties:
*
*   - Deterministic. The same `(publisher, slug)` always produces the
*     same id, so re-resolving an installed plugin's metadata against
*     the aggregator is a straightforward lookup keyed by the columns
*     stored alongside `plugin_id` in `plugin_states`.
*   - Collision-resistant. 80 bits of truncated hash; a 50% birthday
*     collision happens around 2^40 distinct plugins, well beyond what
*     this registry will ever index.
*   - R2-safe. Lowercase alphanumerics + underscore (no hyphens), no
*     `:` or `/`. Existing sandbox cache keys (`${pluginId}:${version}`)
*     keep working because the id contains no `:`.
*   - Syntactically distinct from typical marketplace plugin ids: the
*     `r_` prefix plus exactly 16 base32 characters is unlikely to be
*     chosen as a marketplace id. Not formally guaranteed by the
*     validator -- marketplace ids may begin with `r_` and contain
*     hyphens -- so the install handler also performs an explicit
*     pre-existing-row check at the derived id and rejects any cross-
*     source collision (`PLUGIN_ID_COLLISION`).
*
* Reverse lookup (id → publisher + slug) requires the `plugin_states`
* row -- the hash is one-way. That's intentional: any code path that
* needs the human-meaningful pair already has the state row in hand.
*/
/** Length (in base32 characters) of the truncated hash portion of the id. */
var HASH_LENGTH = 16;
var BASE32_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";
/**
* RFC 4648 base32 encoding without padding, lowercase. Implemented inline
* rather than depending on a multibase library because (a) we only need
* lowercase base32 here, (b) we need it to run identically in workerd,
* Node, and the browser, and (c) the implementation is fewer lines than
* the import statement would be.
*/
function base32Encode(bytes) {
	let bits = 0;
	let value = 0;
	let out = "";
	for (const byte of bytes) {
		value = value << 8 | byte;
		bits += 8;
		while (bits >= 5) {
			bits -= 5;
			out += BASE32_ALPHABET[value >>> bits & 31];
		}
	}
	if (bits > 0) out += BASE32_ALPHABET[value << 5 - bits & 31];
	return out;
}
/**
* Derive the normalized plugin id for a registry-published plugin.
*
* Throws if either input is empty or whitespace-only -- a missing DID
* or slug is always a programming error in the install path, not a
* recoverable runtime condition.
*/
async function makeRegistryPluginId(publisherDid, slug) {
	const did = publisherDid.trim();
	const s = slug.trim();
	if (!did) throw new Error("makeRegistryPluginId: publisherDid is required");
	if (!s) throw new Error("makeRegistryPluginId: slug is required");
	const input = `${did}\n${s}`;
	const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
	return `r_${base32Encode(new Uint8Array(hashBuffer)).slice(0, HASH_LENGTH)}`;
}
function hasCurrentRecordLabel(labels, value, record, now = Date.now()) {
	return labels.some((label) => {
		if (label.val !== value || label.uri !== record.uri || label.cid !== record.cid || label.neg === true) return false;
		if (label.exp === void 0) return true;
		const expiresAt = Date.parse(label.exp);
		return Number.isFinite(expiresAt) && expiresAt > now;
	});
}
/**
* Registry installs use aggregator results only for discovery and moderation
* metadata. The handler reads profile and release records from the publisher's
* PDS, verifies their repository proofs, then validates the bundle checksum,
* manifest, policy, and consent before storing or activating executable code.
* Applicable labels can block installation but cannot supply any verified
* record, checksum, permission, or executable byte.
*/
function verifiedAccessEqual(a, b) {
	return JSON.stringify(a) === JSON.stringify(canonicalizeDeclaredAccess(b));
}
function registryArtifactError(code, message, operation) {
	let apiCode;
	switch (code) {
		case "BUNDLE_ID_MISMATCH":
			apiCode = operation === "install" ? "MANIFEST_ID_MISMATCH" : "BUNDLE_IDENTITY_MISMATCH";
			break;
		case "BUNDLE_VERSION_MISMATCH":
			apiCode = operation === "install" ? "MANIFEST_VERSION_MISMATCH" : code;
			break;
		case "CHECKSUM_MISMATCH":
		case "INVALID_MULTIHASH":
		case "UNSUPPORTED_MULTIHASH":
			apiCode = "CHECKSUM_MISMATCH";
			break;
		case "FETCH_FAILED":
		case "HOST_REJECTED":
		case "REDIRECT_LIMIT_EXCEEDED":
		case "REDIRECT_LOCATION_MISSING":
		case "RESOURCE_STATUS_ERROR":
		case "RESOURCE_TIMEOUT":
			apiCode = operation === "install" ? "INSTALL_FAILED" : "UPDATE_FAILED";
			break;
		default: apiCode = "INVALID_BUNDLE";
	}
	return {
		success: false,
		error: {
			code: apiCode,
			message,
			details: { verificationCode: code }
		}
	};
}
function registryRecordError(code, message) {
	return {
		success: false,
		error: {
			code: "RECORD_VERIFICATION_FAILED",
			message,
			details: { verificationCode: code }
		}
	};
}
function recordConsentError(input, records) {
	if (!input.profileCid || !input.releaseCid) return {
		success: false,
		error: {
			code: "RECORD_CONSENT_REQUIRED",
			message: "Verify the signed package records before confirming this action."
		}
	};
	if (input.profileCid !== records.profile.cid || input.releaseCid !== records.release.cid) return {
		success: false,
		error: {
			code: "RECORD_VERIFICATION_DRIFT",
			message: "The signed package records changed after review. Verify them again."
		}
	};
	return null;
}
function recordVerificationSummary(records, report) {
	return {
		profileCid: records.profile.cid,
		releaseCid: records.release.cid,
		provenance: report.provenance.status,
		policy: report.value.policy
	};
}
/**
* Bytes-per-artifact cap on the gzipped tarball we'll download before
* decompression. RFC 0001 caps a sandboxed plugin bundle at 256 KiB
* decompressed (see `MAX_BUNDLE_SIZE` in @emdash-cms/plugin-cli);
* gzip on a mix of JSON manifest + JS code typically gives 0.3-0.6
* ratio, so compressed bundles are well under 200 KiB in practice.
* 512 KiB leaves margin for unusual file mixes that compress poorly
* while still rejecting anything that's obviously not a legitimate
* plugin bundle.
*/
var MAX_ARTIFACT_BYTES = 524288;
/**
* Maximum number of HTTP redirects followed during artifact download.
* Each hop is independently URL-validated, so a malicious server cannot
* redirect through a series of allowed-looking origins to reach a
* forbidden one.
*/
var MAX_REDIRECTS = 5;
/**
* Wall-clock cap on any single artifact fetch attempt (per URL).
* Defends against slow-loris artifact sources that accept the connection but
* never finish sending headers or body.
*/
var ARTIFACT_FETCH_TIMEOUT_MS = 15e3;
/**
* Total wall-clock budget for the artifact-download phase across all
* advertised caches, the publisher PDS, and the declared URL. Even with the
* per-URL timeout, unavailable sources could otherwise tie up the install request for
* minutes; this caps total time at a budget interactive admins can
* tolerate. Tuned so a fast happy path takes <1s of budget per
* attempt and a worst case still completes in under a minute.
*/
var ARTIFACT_TOTAL_BUDGET_MS = 45e3;
/**
* Per-request timeout applied to every aggregator XRPC call
* (`resolvePackage`, `getLatestRelease`, `listReleases`). Matches the
* per-URL artifact-fetch cap. Without this, a slow-loris aggregator
* can stall the install before the artifact phase even starts.
*/
var AGGREGATOR_REQUEST_TIMEOUT_MS = 15e3;
/**
* Total wall-clock budget for the aggregator-discovery phase
* (resolve + selected-release lookup). Mirrors the artifact-download
* budget. Worst case with the pinned-version path's 20-page cap is
* 20 + 1 calls; capping the total ensures any one stalled call
* still bounds the whole phase.
*/
var AGGREGATOR_TOTAL_BUDGET_MS = 3e4;
var RegistryArtifactFetchError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "RegistryArtifactFetchError";
	}
};
/** Build a fetch function that enforces a per-request and per-budget timeout. */
function timedFetch(totalDeadline) {
	return (input, init) => {
		const remaining = Math.max(0, totalDeadline - Date.now());
		if (remaining === 0) return Promise.reject(/* @__PURE__ */ new Error("Aggregator request budget exhausted"));
		const timeout = Math.min(AGGREGATOR_REQUEST_TIMEOUT_MS, remaining);
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		const callerSignal = init?.signal;
		if (callerSignal) if (callerSignal.aborted) controller.abort(callerSignal.reason);
		else callerSignal.addEventListener("abort", () => controller.abort(callerSignal.reason));
		return fetch(input, {
			...init,
			signal: controller.signal
		}).finally(() => {
			clearTimeout(timer);
		});
	};
}
async function fetchArtifact(artifactCaches, artifact, record, auth) {
	const result = await fetchReleaseArtifact({
		artifact,
		record,
		artifactCaches,
		...auth === void 0 ? {} : { auth }
	}, {
		fetch: async (url, init) => {
			if (!init.signal) throw new Error("Registry artifact fetch requires an abort signal");
			return fetchRegistryArtifactUrl(url.href, {
				signal: init.signal,
				maxResponseBytes: MAX_ARTIFACT_BYTES
			});
		},
		resolveHostname: async (hostname) => (await resolveAndValidateExternalUrlTarget(`https://${hostname}`)).addresses,
		allowHttpLocalhost: false,
		headerTimeoutMs: ARTIFACT_FETCH_TIMEOUT_MS,
		totalTimeoutMs: ARTIFACT_TOTAL_BUDGET_MS,
		maxBytes: MAX_ARTIFACT_BYTES,
		maxRedirects: MAX_REDIRECTS
	});
	if (!result.success) throw new RegistryArtifactFetchError(result.error.code, result.error.message);
	return result.value.bytes;
}
/**
* Returns an error when the release is younger than `policy.minimumReleaseAge`,
* unless its publisher or package is in `minimumReleaseAgeExclude` or it is a
* proven first release.
*
* `releaseView.indexedAt` is aggregator operational data, not part of the
* signed release. The release schema has no publication timestamp, so minimum
* age remains a local discovery holdback rather than a cryptographic property.
* A missing or malformed timestamp fails closed.
*/
function checkMinimumReleaseAge(registryConfig, publisherDid, slug, packageView, releaseView) {
	const minimumReleaseAge = registryConfig.policy?.minimumReleaseAge;
	let minimumReleaseAgeSeconds = 0;
	if (minimumReleaseAge !== void 0) try {
		minimumReleaseAgeSeconds = parseDurationSeconds(minimumReleaseAge);
	} catch (err) {
		return {
			success: false,
			error: {
				code: "REGISTRY_POLICY_INVALID",
				message: err instanceof Error ? err.message : "Invalid minimumReleaseAge value in registry config"
			}
		};
	}
	if (minimumReleaseAgeSeconds > 0) {
		const exclude = registryConfig.policy?.minimumReleaseAgeExclude?.map((e) => e.trim().toLowerCase());
		if (!(releaseExemptFromMinimumAge(exclude, publisherDid, slug) || isProvenFirstRelease(packageView))) {
			const indexedAt = Date.parse(releaseView.indexedAt);
			if (!Number.isFinite(indexedAt)) return {
				success: false,
				error: {
					code: "RELEASE_TIMESTAMP_INVALID",
					message: "Release record is missing a valid indexed-at timestamp; cannot evaluate minimum release age policy."
				}
			};
			const ageSeconds = (Date.now() - indexedAt) / 1e3;
			if (ageSeconds < minimumReleaseAgeSeconds) {
				const remaining = Math.ceil(minimumReleaseAgeSeconds - ageSeconds);
				return {
					success: false,
					error: {
						code: "RELEASE_TOO_NEW",
						message: `This release does not meet the configured minimum release age of ${minimumReleaseAgeSeconds}s. It will be installable in ~${remaining}s.`
					}
				};
			}
		}
	}
	return null;
}
/**
* Gate a release's `requires` constraints against the running host
* environment. `requires` is the lexicon-`unknown` value off the signed
* release record — never trust its shape; `checkEnvCompatibility` guards it.
*
* Returns `null` when every advertised constraint is satisfied (or there are
* none), or a structured `ENV_INCOMPATIBLE` error naming the unsatisfied
* constraints and the host versions. The error carries the guarded `requires`
* and `host` maps so the admin can render the same mismatch the UI gate shows.
*/
function assertEnvCompatible(requires, hostEnv) {
	for (const skipped of findSkippedEnvConstraints(requires, hostEnv)) console.warn(`[registry] env compatibility constraint skipped: ${skipped.key} requires ${skipped.required} but host version is ${skipped.reason}`);
	const mismatches = checkEnvCompatibility(requires, hostEnv);
	if (mismatches.length === 0) return null;
	const guarded = {};
	for (const m of mismatches) guarded[m.key] = m.required;
	return {
		code: "ENV_INCOMPATIBLE",
		message: `This release is not compatible with the current environment: ${mismatches.map((m) => `${m.key} requires ${m.required} but host is ${m.host}`).join("; ")}.`,
		details: {
			requires: guarded,
			host: hostEnv
		}
	};
}
async function handleRegistryInstall(db, storage, sandboxRunner, registryConfigInput, input, opts) {
	const registryConfig = coerceRegistryConfig(registryConfigInput);
	if (!registryConfig) return {
		success: false,
		error: {
			code: "REGISTRY_NOT_CONFIGURED",
			message: "Registry is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for registry plugin installation"
		}
	};
	if (!sandboxRunner || !sandboxRunner.isAvailable()) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required for registry plugins", sandboxRunner)
		}
	};
	try {
		validateAggregatorUrl(registryConfig.aggregatorUrl);
	} catch (err) {
		return {
			success: false,
			error: {
				code: "REGISTRY_NOT_CONFIGURED",
				message: err instanceof Error ? err.message : "Invalid aggregator URL"
			}
		};
	}
	const { did, slug, version: requestedVersion } = input;
	const { DiscoveryClient, registryLabelerPolicy } = await import("@emdash-cms/registry-client/discovery");
	const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
	const discovery = new DiscoveryClient({
		aggregatorUrl: registryConfig.aggregatorUrl,
		acceptLabelers: registryConfig.acceptLabelers,
		labelerPolicy: registryLabelerPolicy(registryConfig.acceptLabelers),
		fetch: timedFetch(aggregatorDeadline)
	});
	if (!did.startsWith("did:") || did.split(":").length < 3) return {
		success: false,
		error: {
			code: "INVALID_DID",
			message: "DID must be a valid atproto DID (e.g. did:plc:abc123)"
		}
	};
	try {
		const publisherDid = did;
		const packageView = await discovery.getPackage({
			did: publisherDid,
			slug
		});
		const MAX_LIST_PAGES = 20;
		const releaseView = await (async () => {
			if (!requestedVersion) return discovery.getLatestRelease({
				did: publisherDid,
				package: slug
			});
			let cursor;
			const seenCursors = /* @__PURE__ */ new Set();
			for (let page = 0; page < MAX_LIST_PAGES; page++) {
				if (cursor !== void 0) {
					if (seenCursors.has(cursor)) break;
					seenCursors.add(cursor);
				}
				const result = await discovery.listReleases({
					did: publisherDid,
					package: slug,
					cursor,
					limit: 50
				});
				for (const r of result.releases) if (r.version === requestedVersion) return r;
				if (!result.cursor) break;
				cursor = result.cursor;
			}
		})();
		if (!releaseView) return {
			success: false,
			error: {
				code: "NO_RELEASE",
				message: requestedVersion ? `Version ${requestedVersion} not found for ${publisherDid}/${slug}` : `No installable release found for ${publisherDid}/${slug}`
			}
		};
		if (packageView.did !== publisherDid || packageView.slug !== slug) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a package view for a different publisher or slug."
			}
		};
		if (releaseView.did !== publisherDid || releaseView.package !== slug || requestedVersion !== void 0 && releaseView.version !== requestedVersion) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a release view that does not match the requested package or version."
			}
		};
		const version = releaseView.version;
		if (evaluateRegistryReleaseWithdrawal(releaseView, discovery.labelerPolicy).withdrawn) return {
			success: false,
			error: {
				code: "RELEASE_YANKED",
				message: "This release has been withdrawn"
			}
		};
		const authoritative = await (opts?.readAuthoritativeRecords ?? readAuthoritativePackageRelease)(publisherDid, slug, version, opts?.authoritativeRecords);
		if (!authoritative.success) return registryRecordError(authoritative.error.code, authoritative.error.message);
		const records = authoritative.value;
		const { profile, release } = records.inspection.value;
		if (packageView.uri !== records.profile.uri || packageView.cid !== records.profile.cid || releaseView.uri !== records.release.uri || releaseView.cid !== records.release.cid) return {
			success: false,
			error: {
				code: "AGGREGATOR_RECORD_MISMATCH",
				message: "Aggregator metadata does not match the publisher's signed records."
			}
		};
		if (!opts?.verifyOnly) {
			const consentError = recordConsentError({
				profileCid: input.acknowledgedProfileCid,
				releaseCid: input.acknowledgedReleaseCid
			}, records);
			if (consentError) return consentError;
		}
		if (hasCurrentRecordLabel(packageView.labels ?? [], "security:yanked", records.profile) || hasCurrentRecordLabel(packageView.labels ?? [], "security-yanked", records.profile)) return {
			success: false,
			error: {
				code: "RELEASE_YANKED",
				message: "This release has been withdrawn"
			}
		};
		if (opts?.hostEnv) {
			const envError = assertEnvCompatible(release.requires, opts.hostEnv);
			if (envError) return {
				success: false,
				error: envError
			};
		}
		const releaseAgeError = checkMinimumReleaseAge(registryConfig, publisherDid, slug, packageView, releaseView);
		if (releaseAgeError) return releaseAgeError;
		const pluginId = await makeRegistryPluginId(publisherDid, slug);
		if (opts?.configuredPluginIds?.has(pluginId)) return {
			success: false,
			error: {
				code: "PLUGIN_ID_CONFLICT",
				message: "A configured plugin with the same derived id already exists"
			}
		};
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (existing) {
			if (existing.source === "registry") return {
				success: false,
				error: {
					code: "ALREADY_INSTALLED",
					message: `Plugin ${publisherDid}/${slug} is already installed`
				}
			};
			return {
				success: false,
				error: {
					code: "PLUGIN_ID_COLLISION",
					message: `A non-registry plugin already exists at the derived id ${pluginId}. Uninstall it before installing this registry plugin.`
				}
			};
		}
		const packageArtifact = release.artifacts.package;
		const declaredChecksum = release.artifacts.package.checksum;
		if (!packageArtifact || !declaredChecksum) return {
			success: false,
			error: {
				code: "INVALID_RELEASE",
				message: "Release record is missing its package artifact or checksum"
			}
		};
		let artifactBytes;
		try {
			artifactBytes = await fetchArtifact(releaseView.artifactCaches ?? [], packageArtifact, {
				did: publisherDid,
				collection: NSID.packageRelease,
				rkey: `${slug}:${version}`,
				cid: releaseView.cid
			}, release.auth);
		} catch (error) {
			if (error instanceof RegistryArtifactFetchError) return registryArtifactError(error.code, error.message, "install");
			throw error;
		}
		const artifactReport = await validateRegistryArtifact(artifactBytes, declaredChecksum, slug, version);
		if (!artifactReport.success) return registryArtifactError(artifactReport.error.code, artifactReport.error.message, "install");
		const { bundle, artifactDigest, artifactDigests } = artifactReport.value;
		const recordReport = await verifyAuthoritativePackageRelease(records, artifactDigest, {
			...opts?.authoritativeRecords,
			artifactDigests
		});
		if (!recordReport.success) return registryRecordError(recordReport.code, recordReport.reasons[0]?.message ?? "The release provenance is invalid.");
		const verification = recordVerificationSummary(records, recordReport);
		bundle.manifest = {
			...bundle.manifest,
			id: pluginId
		};
		if (!verifiedAccessEqual(recordReport.value.declaredAccess, bundle.manifest.declaredAccess ?? {})) return {
			success: false,
			error: {
				code: "DECLARED_ACCESS_DRIFT",
				message: "The plugin bundle declares different permissions than its published record. Installation refused."
			}
		};
		const actualCapabilities = canonicalCapabilitiesForDriftCheck(bundle.manifest.capabilities);
		if (!opts?.verifyOnly && actualCapabilities.length > 0) {
			if (input.acknowledgedDeclaredAccess === void 0) return {
				success: false,
				error: {
					code: "DECLARED_ACCESS_REQUIRED",
					message: "This plugin declares capabilities that require consent. Re-open the install dialog to review and acknowledge them."
				}
			};
			const acknowledged = canonicalCapabilitiesForDriftCheck(input.acknowledgedDeclaredAccess);
			if (acknowledged.length !== actualCapabilities.length || acknowledged.some((cap, i) => cap !== actualCapabilities[i])) return {
				success: false,
				error: {
					code: "DECLARED_ACCESS_DRIFT",
					message: "Plugin manifest has changed since you consented. Re-open the install dialog to review the new permissions."
				}
			};
		}
		const actualMcpTools = (bundle.manifest.mcp?.tools ?? []).map(({ inputSchema: _, outputSchema: __, ...tool }) => tool);
		const publicRoutes = diffRouteVisibility(void 0, bundle.manifest).newlyPublic.toSorted();
		if (!opts?.verifyOnly && publicRoutes.length > 0) {
			const acknowledgedPublicRoutes = Array.isArray(input.acknowledgedPublicRoutes) ? input.acknowledgedPublicRoutes.filter((route) => typeof route === "string").toSorted() : [];
			if (JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(publicRoutes)) return {
				success: false,
				error: {
					code: "ROUTE_VISIBILITY_ESCALATION",
					message: "Plugin install exposes public (unauthenticated) routes",
					details: {
						routeVisibilityChanges: { newlyPublic: publicRoutes },
						mcpTools: actualMcpTools,
						verification
					}
				}
			};
		}
		if (!opts?.verifyOnly && actualMcpTools.length > 0) {
			if (JSON.stringify(input.acknowledgedMcpTools) !== JSON.stringify(actualMcpTools)) return {
				success: false,
				error: {
					code: "MCP_TOOL_CONSENT_REQUIRED",
					message: "Plugin MCP tools require explicit consent",
					details: {
						mcpTools: actualMcpTools,
						routeVisibilityChanges: publicRoutes.length > 0 ? { newlyPublic: publicRoutes } : void 0,
						verification
					}
				}
			};
		}
		const result = {
			pluginId,
			publisherDid,
			slug,
			version,
			capabilities: bundle.manifest.capabilities,
			declaredAccess: recordReport.value.releaseExtension.declaredAccess,
			mcpTools: actualMcpTools,
			publicRoutes,
			verification
		};
		if (opts?.verifyOnly) return {
			success: true,
			data: result
		};
		await storeBundleInR2(storage, pluginId, version, bundle, "registry");
		try {
			await stateRepo.upsert(pluginId, version, "active", {
				source: "registry",
				displayName: profile.name ?? slug,
				description: profile.description ?? void 0,
				registryPublisherDid: publisherDid,
				registrySlug: slug
			});
		} catch (stateErr) {
			let lostRace = false;
			try {
				const winner = await stateRepo.get(pluginId);
				lostRace = winner !== void 0 && winner !== null;
			} catch (probeErr) {
				console.warn(`[registry-install] Failed to probe state row for ${pluginId} after state-write failure; treating as orphan:`, probeErr);
			}
			if (!lostRace) try {
				await deleteBundleFromR2(storage, pluginId, version, "registry");
			} catch (cleanupErr) {
				console.warn(`[registry-install] Failed to clean up R2 bundle for ${pluginId}@${version} after state-row write failure:`, cleanupErr);
			}
			throw stateErr;
		}
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		return {
			success: true,
			data: result
		};
	} catch (err) {
		if (err instanceof ClientValidationError) return {
			success: false,
			error: {
				code: "AGGREGATOR_RESPONSE_INVALID",
				message: `Aggregator returned a response that does not conform to its lexicon (${err.target})`
			}
		};
		if (err instanceof ClientResponseError) {
			if (err.error === "ListingUnavailable") return {
				success: false,
				error: {
					code: "LISTING_UNAVAILABLE",
					message: "This plugin is unavailable under the active registry policy"
				}
			};
			return {
				success: false,
				error: {
					code: err.status === 404 ? "AGGREGATOR_NOT_FOUND" : "AGGREGATOR_HTTP_ERROR",
					message: `Aggregator returned ${err.status}: ${err.error}`
				}
			};
		}
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while installing plugin"
			}
		};
		console.error("[registry-install] Failed:", err);
		return {
			success: false,
			error: {
				code: "INSTALL_FAILED",
				message: err instanceof Error ? err.message : "Failed to install plugin from registry"
			}
		};
	}
}
/**
* Uninstall a registry-source plugin. Deletes the R2 bundle under
* `registry/<pluginId>/<version>/`, optionally drops the plugin's
* `_plugin_storage` rows, and removes the `_plugin_state` row. The
* sandbox runtime is reconciled by the route's `syncRegistryPlugins`
* call after this returns.
*
* Refuses to uninstall plugins whose `source` is not `"registry"` to
* avoid trashing a marketplace/config plugin that happens to share the
* pluginId namespace.
*/
async function handleRegistryUninstall(db, storage, pluginId, opts) {
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No registry plugin found: ${pluginId}`
			}
		};
		const version = existing.version;
		await opts?.beforeDelete?.();
		let dataDeleted = false;
		if (opts?.deleteData) {
			await db.deleteFrom("_plugin_storage").where("plugin_id", "=", pluginId).execute();
			dataDeleted = true;
		}
		try {
			await removeAllPluginIndexes(db, pluginId);
		} catch {}
		await stateRepo.delete(pluginId);
		if (storage) await deleteBundleFromR2(storage, pluginId, version, "registry");
		return {
			success: true,
			data: {
				pluginId,
				dataDeleted
			}
		};
	} catch (err) {
		console.error("[registry-uninstall] Failed:", err);
		return {
			success: false,
			error: {
				code: "UNINSTALL_FAILED",
				message: "Failed to uninstall plugin"
			}
		};
	}
}
/**
* Update a registry-source plugin to a newer release. Mirrors
* `handleMarketplaceUpdate`: resolves the target version via the aggregator,
* re-runs the artifact fetch / checksum / extract pipeline, diffs capabilities
* and route visibility against the currently installed bundle, and gates
* escalations behind `confirmCapabilityChanges` and an exact
* `acknowledgedPublicRoutes` match so the admin re-consents to widened permissions.
*
* Refuses non-registry sources. Refuses when the stored state row is missing
* the `(publisherDid, slug)` it needs to resolve against the aggregator.
*/
async function handleRegistryUpdate(db, storage, sandboxRunner, registryConfigInput, pluginId, opts) {
	const registryConfig = coerceRegistryConfig(registryConfigInput);
	if (!registryConfig) return {
		success: false,
		error: {
			code: "REGISTRY_NOT_CONFIGURED",
			message: "Registry is not configured"
		}
	};
	if (!storage) return {
		success: false,
		error: {
			code: "STORAGE_NOT_CONFIGURED",
			message: "Storage is required for registry plugin updates"
		}
	};
	if (!sandboxRunner || !sandboxRunner.isAvailable()) return {
		success: false,
		error: {
			code: "SANDBOX_NOT_AVAILABLE",
			message: withUnavailableReason("Sandbox runner is required", sandboxRunner)
		}
	};
	try {
		validateAggregatorUrl(registryConfig.aggregatorUrl);
	} catch (err) {
		return {
			success: false,
			error: {
				code: "REGISTRY_NOT_CONFIGURED",
				message: err instanceof Error ? err.message : "Invalid aggregator URL"
			}
		};
	}
	try {
		const stateRepo = new PluginStateRepository(db);
		const existing = await stateRepo.get(pluginId);
		if (!existing || existing.source !== "registry") return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `No registry plugin found: ${pluginId}`
			}
		};
		if (!existing.registryPublisherDid || !existing.registrySlug) return {
			success: false,
			error: {
				code: "INVALID_STATE",
				message: `Registry plugin ${pluginId} is missing publisher DID or slug in state`
			}
		};
		const oldVersion = existing.version;
		const publisherDid = existing.registryPublisherDid;
		const slug = existing.registrySlug;
		const { DiscoveryClient, registryLabelerPolicy } = await import("@emdash-cms/registry-client/discovery");
		const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
		const discovery = new DiscoveryClient({
			aggregatorUrl: registryConfig.aggregatorUrl,
			acceptLabelers: registryConfig.acceptLabelers,
			labelerPolicy: registryLabelerPolicy(registryConfig.acceptLabelers),
			fetch: timedFetch(aggregatorDeadline)
		});
		const MAX_LIST_PAGES = 20;
		const releaseView = await (async () => {
			if (!opts?.version) return discovery.getLatestRelease({
				did: publisherDid,
				package: slug
			});
			let cursor;
			const seenCursors = /* @__PURE__ */ new Set();
			for (let page = 0; page < MAX_LIST_PAGES; page++) {
				if (cursor !== void 0) {
					if (seenCursors.has(cursor)) break;
					seenCursors.add(cursor);
				}
				const result = await discovery.listReleases({
					did: publisherDid,
					package: slug,
					cursor,
					limit: 50
				});
				for (const r of result.releases) if (r.version === opts.version) return r;
				if (!result.cursor) break;
				cursor = result.cursor;
			}
		})();
		if (!releaseView) return {
			success: false,
			error: {
				code: "NO_VERSION",
				message: opts?.version ? `Version ${opts.version} not found for ${publisherDid}/${slug}` : `No installable release found for ${publisherDid}/${slug}`
			}
		};
		if (releaseView.did !== publisherDid || releaseView.package !== slug || opts?.version !== void 0 && releaseView.version !== opts.version) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a release view that does not match the requested package or version."
			}
		};
		const packageView = await discovery.getPackage({
			did: publisherDid,
			slug
		});
		if (!packageView || packageView.did !== publisherDid || packageView.slug !== slug) return {
			success: false,
			error: {
				code: "AGGREGATOR_IDENTITY_MISMATCH",
				message: "Aggregator returned a package view that does not match the installed plugin."
			}
		};
		const newVersion = releaseView.version;
		if (evaluateRegistryReleaseWithdrawal(releaseView, discovery.labelerPolicy).withdrawn) return {
			success: false,
			error: {
				code: "YANKED",
				message: "Release has been withdrawn"
			}
		};
		if (newVersion === oldVersion) return {
			success: false,
			error: {
				code: "ALREADY_UP_TO_DATE",
				message: "Plugin is already at the requested version"
			}
		};
		if (opts?.version !== void 0) {
			const order = compareVersions(newVersion, oldVersion);
			if (order === null) return {
				success: false,
				error: {
					code: "INVALID_VERSION",
					message: "Installed or requested version is not valid semver"
				}
			};
			if (order < 0) return {
				success: false,
				error: {
					code: "DOWNGRADE_NOT_ALLOWED",
					message: "An update cannot target a version older than the installed one"
				}
			};
		}
		const releaseAgeError = checkMinimumReleaseAge(registryConfig, publisherDid, slug, packageView, releaseView);
		if (releaseAgeError) return releaseAgeError;
		const authoritative = await (opts?.readAuthoritativeRecords ?? readAuthoritativePackageRelease)(publisherDid, slug, newVersion, opts?.authoritativeRecords);
		if (!authoritative.success) return registryRecordError(authoritative.error.code, authoritative.error.message);
		const records = authoritative.value;
		const { profile, release } = records.inspection.value;
		if (packageView.uri !== records.profile.uri || packageView.cid !== records.profile.cid || releaseView.uri !== records.release.uri || releaseView.cid !== records.release.cid) return {
			success: false,
			error: {
				code: "AGGREGATOR_RECORD_MISMATCH",
				message: "Aggregator metadata does not match the publisher's signed records."
			}
		};
		if (hasCurrentRecordLabel(packageView.labels ?? [], "security:yanked", records.profile) || hasCurrentRecordLabel(packageView.labels ?? [], "security-yanked", records.profile)) return {
			success: false,
			error: {
				code: "YANKED",
				message: "Package has been withdrawn"
			}
		};
		if (opts?.confirmCapabilityChanges || (opts?.acknowledgedPublicRoutes?.length ?? 0) > 0 || opts?.confirmMcpTools) {
			const consentError = recordConsentError({
				profileCid: opts?.acknowledgedProfileCid,
				releaseCid: opts?.acknowledgedReleaseCid
			}, records);
			if (consentError) return consentError;
		}
		if (opts?.hostEnv) {
			const envError = assertEnvCompatible(release.requires, opts.hostEnv);
			if (envError) return {
				success: false,
				error: envError
			};
		}
		const packageArtifact = release.artifacts.package;
		const declaredChecksum = packageArtifact?.checksum;
		if (!packageArtifact || !declaredChecksum) return {
			success: false,
			error: {
				code: "INVALID_RELEASE",
				message: "Release record is missing its package artifact or checksum"
			}
		};
		let artifactBytes;
		try {
			artifactBytes = await fetchArtifact(releaseView.artifactCaches ?? [], packageArtifact, {
				did: publisherDid,
				collection: NSID.packageRelease,
				rkey: `${slug}:${newVersion}`,
				cid: releaseView.cid
			}, release.auth);
		} catch (error) {
			if (error instanceof RegistryArtifactFetchError) return registryArtifactError(error.code, error.message, "update");
			throw error;
		}
		const artifactReport = await validateRegistryArtifact(artifactBytes, declaredChecksum, slug, newVersion);
		if (!artifactReport.success) return registryArtifactError(artifactReport.error.code, artifactReport.error.message, "update");
		const { bundle, artifactDigest, artifactDigests } = artifactReport.value;
		const recordReport = await verifyAuthoritativePackageRelease(records, artifactDigest, {
			...opts?.authoritativeRecords,
			artifactDigests
		});
		if (!recordReport.success) return registryRecordError(recordReport.code, recordReport.reasons[0]?.message ?? "The release provenance is invalid.");
		const verification = recordVerificationSummary(records, recordReport);
		bundle.manifest = {
			...bundle.manifest,
			id: pluginId
		};
		if (!verifiedAccessEqual(recordReport.value.declaredAccess, bundle.manifest.declaredAccess ?? {})) return {
			success: false,
			error: {
				code: "DECLARED_ACCESS_DRIFT",
				message: "The plugin bundle declares different permissions than its published record. Update refused."
			}
		};
		const oldBundle = await loadBundleFromR2(storage, pluginId, oldVersion, "registry");
		const capabilityChanges = diffCapabilities(oldBundle?.manifest.capabilities ?? [], bundle.manifest.capabilities);
		if (capabilityChanges.added.length > 0 && !opts?.confirmCapabilityChanges) return {
			success: false,
			error: {
				code: "CAPABILITY_ESCALATION",
				message: "Plugin update requires new capabilities",
				details: {
					capabilityChanges,
					verification
				}
			}
		};
		const newlyPublicRoutes = diffRouteVisibility(oldBundle?.manifest, bundle.manifest).newlyPublic.toSorted();
		const acknowledgedPublicRoutes = (opts?.acknowledgedPublicRoutes ?? []).filter((route) => typeof route === "string").toSorted();
		if (newlyPublicRoutes.length > 0 && JSON.stringify(acknowledgedPublicRoutes) !== JSON.stringify(newlyPublicRoutes)) return {
			success: false,
			error: {
				code: "ROUTE_VISIBILITY_ESCALATION",
				message: "Plugin update exposes new public (unauthenticated) routes",
				details: {
					routeVisibilityChanges: { newlyPublic: newlyPublicRoutes },
					capabilityChanges,
					verification
				}
			}
		};
		const oldMcpTools = [...oldBundle?.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		const newMcpTools = [...bundle.manifest.mcp?.tools ?? []].toSorted((a, b) => a.name.localeCompare(b.name));
		if (JSON.stringify(oldMcpTools) !== JSON.stringify(newMcpTools) && !opts?.confirmMcpTools) return {
			success: false,
			error: {
				code: "MCP_TOOL_CONSENT_REQUIRED",
				message: "Plugin update changes its MCP tools",
				details: {
					mcpTools: newMcpTools.map(({ inputSchema: _, outputSchema: __, ...tool }) => tool),
					verification
				}
			}
		};
		await storeBundleInR2(storage, pluginId, newVersion, bundle, "registry");
		await stateRepo.upsert(pluginId, newVersion, "active", {
			source: "registry",
			registryPublisherDid: publisherDid,
			registrySlug: slug,
			displayName: profile.name ?? slug,
			description: profile.description ?? void 0,
			mcpToolsEnabled: false,
			mcpToolsConsent: null
		});
		await syncDeclaredStorageIndexes(db, [bundle.manifest]);
		return {
			success: true,
			data: {
				pluginId,
				oldVersion,
				newVersion,
				capabilityChanges,
				routeVisibilityChanges: newlyPublicRoutes.length > 0 ? { newlyPublic: newlyPublicRoutes } : void 0,
				verification
			}
		};
	} catch (err) {
		if (err instanceof ClientValidationError) return {
			success: false,
			error: {
				code: "AGGREGATOR_RESPONSE_INVALID",
				message: `Aggregator returned a response that does not conform to its lexicon (${err.target})`
			}
		};
		if (err instanceof ClientResponseError) {
			if (err.error === "ListingUnavailable") return {
				success: false,
				error: {
					code: "LISTING_UNAVAILABLE",
					message: "This plugin is unavailable under the active registry policy"
				}
			};
			return {
				success: false,
				error: {
					code: err.status === 404 ? "AGGREGATOR_NOT_FOUND" : "AGGREGATOR_HTTP_ERROR",
					message: `Aggregator returned ${err.status}: ${err.error}`
				}
			};
		}
		if (err instanceof EmDashStorageError) return {
			success: false,
			error: {
				code: err.code ?? "STORAGE_ERROR",
				message: "Storage error while updating plugin"
			}
		};
		console.error("[registry-update] Failed:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_FAILED",
				message: err instanceof Error ? err.message : "Failed to update plugin"
			}
		};
	}
}
/**
* Bulk update check across every installed registry plugin. Queries the
* aggregator for each plugin's latest release and reports `hasUpdate`
* based on the version comparison. Plugins whose aggregator lookup fails
* (unreachable, delisted, malformed) are skipped silently — one bad
* publisher must not blank the whole admin Updates list.
*/
async function handleRegistryUpdateCheck(db, registryConfigInput) {
	const registryConfig = coerceRegistryConfig(registryConfigInput);
	if (!registryConfig) return {
		success: false,
		error: {
			code: "REGISTRY_NOT_CONFIGURED",
			message: "Registry is not configured"
		}
	};
	try {
		const registryPlugins = await new PluginStateRepository(db).getRegistryPlugins();
		if (registryPlugins.length === 0) return {
			success: true,
			data: { items: [] }
		};
		const { DiscoveryClient, registryLabelerPolicy } = await import("@emdash-cms/registry-client/discovery");
		const aggregatorDeadline = Date.now() + AGGREGATOR_TOTAL_BUDGET_MS;
		const discovery = new DiscoveryClient({
			aggregatorUrl: registryConfig.aggregatorUrl,
			acceptLabelers: registryConfig.acceptLabelers,
			labelerPolicy: registryLabelerPolicy(registryConfig.acceptLabelers),
			fetch: timedFetch(aggregatorDeadline)
		});
		const items = [];
		for (const plugin of registryPlugins) {
			if (!plugin.registryPublisherDid || !plugin.registrySlug) continue;
			try {
				const releaseView = await discovery.getLatestRelease({
					did: plugin.registryPublisherDid,
					package: plugin.registrySlug
				});
				if (evaluateRegistryReleaseWithdrawal(releaseView, discovery.labelerPolicy).withdrawn) continue;
				const latest = releaseView.version;
				if (!latest) continue;
				const installed = plugin.version;
				items.push({
					pluginId: plugin.pluginId,
					installed,
					latest,
					hasUpdate: latest !== installed,
					hasCapabilityChanges: false,
					hasRouteVisibilityChanges: false
				});
			} catch (err) {
				console.warn(`[registry-update-check] Skipped ${plugin.pluginId}:`, err);
			}
		}
		return {
			success: true,
			data: { items }
		};
	} catch (err) {
		if (err instanceof ClientValidationError) return {
			success: false,
			error: {
				code: "AGGREGATOR_RESPONSE_INVALID",
				message: `Aggregator returned a response that does not conform to its lexicon (${err.target})`
			}
		};
		if (err instanceof ClientResponseError) return {
			success: false,
			error: {
				code: err.status === 404 ? "AGGREGATOR_NOT_FOUND" : "AGGREGATOR_HTTP_ERROR",
				message: `Aggregator returned ${err.status}: ${err.error}`
			}
		};
		console.error("[registry-update-check] Failed:", err);
		return {
			success: false,
			error: {
				code: "UPDATE_CHECK_FAILED",
				message: "Failed to check for registry updates"
			}
		};
	}
}
export { handlePluginSettingsGet as A, handleThemeGetDetail as B, handleContentUpdate as C, handleMarketplaceUninstall as D, handleMarketplaceSearch as E, handleRegistryUpdateCheck as F, storagelessDataKeyError as G, liveReferenceSelection as H, handleRevisionGet as I, EmDashStorageError as J, syncDeclaredStorageIndexes as K, handleRevisionList as L, handleRegistryInstall as M, handleRegistryUninstall as N, handleMarketplaceUpdate as O, handleRegistryUpdate as P, handleRevisionRestore as R, handleContentUnschedule as S, handleMarketplaceInstall as T, loadBundleFromR2 as U, handleThemeSearch as V, rollbackPluginUpdate as W, SeoRepository as X, getSandboxRouteErrorDetails as Y, handleContentPublish as _, handleContentCompare as a, handleContentTranslations as b, handleContentCreate as c, handleContentDuplicate as d, handleContentGet as f, handleContentPermanentDelete as g, handleContentListTrashed as h, handleContentAuthors as i, handlePluginSettingsUpdate as j, handleMarketplaceUpdateCheck as k, handleContentDelete as l, handleContentList as m, changedStoragelessDataKeys as n, handleContentCountScheduled as o, handleContentGetIncludingTrashed as p, validateRev as q, getPluginSettingsSchema as r, handleContentCountTrashed as s, buildManifestCollections as t, handleContentDiscardDraft as u, handleContentRestore as v, handleMarketplaceGetPlugin as w, handleContentUnpublish as x, handleContentSchedule as y, handleScheduledPolicyRejection as z };
