import { a as __exportAll, v as isI18nEnabled } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { a as currentTimestamp, b as tableExists, c as executeAtomicBatchIfSupported, m as listTablesLike, o as currentTimestampValue, p as listTableColumns, r as columnExists, s as detectDialect, u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { i as getRequestContext } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { c as isIndexableFieldType, i as REPEATER_SUB_FIELD_TYPES, l as isStoragelessField, o as RESERVED_COLLECTION_SLUGS, r as FIELD_TYPE_TO_COLUMN, s as RESERVED_FIELD_SLUGS, u as isStoragelessFieldRow } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { a as InvalidCursorError, l as decodeCursor, u as encodeCursor } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import "./normalize-Cx-bNwhP_BPRa8oa2.mjs";
import { n as normalizeMime } from "./mime-D1We9jUx_wrjSCjky.mjs";
import { t as FTSManager } from "./fts-manager-6861qcwk_6bKjovHG.mjs";
import { t as jsonTextValues } from "./json-recordset-D0WhN2UA_CIrMhMsj.mjs";
import { i as resetRegisteredCollectionsCache } from "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { a as deleteSharedCollectionRecords, i as deleteActivatedMediaUsageCollection, n as MediaUsageWorkRepository, o as isMediaUsageCollectionSlugDeleting, r as collectionDeletionCurrentTimestamp, t as MediaUsageCollectionDeletionRepository } from "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import { a as finalizeMediaUsageCollectionCapture, c as installPreparedMediaUsageCollectionCapture, i as continueMediaUsageActivation, l as markMediaUsageCollectionCaptureReady, o as findResumableMediaUsageCollectionCaptureId, r as canResumeMediaUsageCollectionCapture, t as MediaUsageActivationVersionMismatchError, u as prepareMediaUsageCollectionCapture } from "./activation-CGlyigmg_D6-z5nIo.mjs";
import { a as invalidateSchemaCache } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import { r as isTransferError, t as TransferError } from "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as TRANSFER_LIMITS, r as canonicalJson$1, s as rowsPerInsert } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { t as canonicalDigest } from "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import { t as SCHEMA_SLUG_PATTERN } from "./slug-aVnUV4SL_BsIV7CXs.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/dev-typegen-EBni_pOQ.mjs
var DEV_TYPEGEN_REFRESH_GLOBAL = "__emdashDevTypegenRefresh";
function refreshDevTypes() {
	if (typeof Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" }) === "undefined" || !Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": void 0,
		"SSR": true
	}, { _: "/Users/cjdunteman/repos/three-story-studio/node_modules/.bin/astro" }).DEV) return;
	try {
		const fn = Reflect.get(globalThis, DEV_TYPEGEN_REFRESH_GLOBAL);
		if (typeof fn === "function") fn();
	} catch (error) {
		console.error("[emdash] dev typegen refresh failed:", error);
	}
}
// node_modules/emdash/dist/video-DytCnw3L.mjs
var isRecord$6 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var isString = (value) => typeof value === "string";
var isDimension = (value) => typeof value === "number" && Number.isInteger(value) && value >= 1;
var hasOnly = (record, fields) => Object.entries(record).every(([key, value]) => value === void 0 || (fields.get(key)?.(value) ?? false));
var ASSET_FIELDS = /* @__PURE__ */ new Map([
	["_ref", isString],
	["url", isString],
	["provider", isString]
]);
var isAsset = (value) => isRecord$6(value) && typeof value._ref === "string" && hasOnly(value, ASSET_FIELDS);
var VIDEO_FIELDS = /* @__PURE__ */ new Map([
	["_type", () => true],
	["_key", () => true],
	["asset", isAsset],
	["caption", isString],
	["width", isDimension],
	["height", isDimension]
]);
/**
* Whether a block is the editor's own video block. A `video` block with other
* fields, or values of other types, belongs to a plugin.
*/
function isPortableTextVideoBlock(block) {
	return isRecord$6(block) && block._type === "video" && hasOnly(block, VIDEO_FIELDS);
}
// node_modules/emdash/dist/registry-B0-O575m.mjs
var MEDIA_USAGE_PROJECTION_FINGERPRINT_VERSION = 1;
var FINGERPRINT_PREFIX = `media-usage-projection:v${MEDIA_USAGE_PROJECTION_FINGERPRINT_VERSION}:sha256:`;
var FINGERPRINT_PATTERN = new RegExp(`^${FINGERPRINT_PREFIX}[a-f0-9]{64}$`);
async function buildMediaUsageProjectionFingerprint(input) {
	if (!input.collectionId) throw new Error("Media usage projection fingerprints require a collection identity");
	const canonicalOccurrences = input.occurrences.map((occurrence) => ({
		fieldSlug: occurrence.fieldSlug,
		fieldPath: occurrence.fieldPath,
		occurrenceIndex: occurrence.occurrenceIndex ?? 0,
		referenceType: occurrence.referenceType,
		mediaId: occurrence.mediaId,
		provider: occurrence.provider,
		providerAssetId: occurrence.providerAssetId,
		mediaKind: occurrence.mediaKind ?? null,
		mimeType: occurrence.mimeType ?? null
	})).map((occurrence) => ({
		occurrence,
		key: canonicalJson(occurrence)
	})).toSorted((a, b) => compareCanonicalStrings(a.key, b.key)).map(({ occurrence }) => occurrence);
	return buildCanonicalSha256Fingerprint(FINGERPRINT_PREFIX, {
		fingerprintVersion: MEDIA_USAGE_PROJECTION_FINGERPRINT_VERSION,
		collectionId: input.collectionId,
		extractionSchema: normalizeExtractionFields(input.extractionFields),
		source: {
			sourceKey: input.source.sourceKey,
			sourceType: input.source.sourceType,
			collectionSlug: input.source.collectionSlug ?? null,
			contentId: input.source.contentId ?? null,
			sourceVariant: input.source.sourceVariant,
			locale: input.source.locale ?? null,
			translationGroup: input.source.translationGroup ?? null,
			contentSlug: input.source.contentSlug ?? null,
			contentTitle: input.source.contentTitle ?? null,
			contentStatus: input.source.contentStatus ?? null,
			contentScheduledAt: input.source.contentScheduledAt ?? null,
			contentDeletedAt: input.source.contentDeletedAt ?? null,
			revisionId: input.source.revisionId ?? null,
			schemaVersion: input.source.schemaVersion ?? 1,
			sourceCompleteness: input.source.sourceCompleteness ?? "complete"
		},
		occurrences: canonicalOccurrences
	});
}
async function buildCanonicalSha256Fingerprint(prefix, payload) {
	const encodedPayload = new TextEncoder().encode(canonicalJson(payload));
	const digest = await crypto.subtle.digest("SHA-256", encodedPayload);
	return {
		fingerprint: `${prefix}${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`,
		byteLength: encodedPayload.byteLength
	};
}
function normalizeExtractionFields(fields) {
	return fields.map((field) => {
		if (field.type === "blocks") return {
			slug: field.slug,
			type: field.type,
			blockTypes: (field.blockTypes ?? []).map((type) => ({
				slug: type.slug,
				currentVersion: type.currentVersion,
				versions: type.versions.map((version) => ({
					version: version.version,
					fingerprint: version.fingerprint
				}))
			}))
		};
		if (field.type !== "repeater") return {
			slug: field.slug,
			type: field.type
		};
		return {
			slug: field.slug,
			type: field.type,
			subFields: (field.validation?.subFields ?? []).map((subField) => ({
				slug: subField.slug,
				type: subField.type
			})).toSorted((a, b) => compareCanonicalStrings(a.slug, b.slug))
		};
	}).toSorted((a, b) => compareCanonicalStrings(String(a.slug), String(b.slug)));
}
function compareCanonicalStrings(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
function isMediaUsageProjectionFingerprint(value) {
	return typeof value === "string" && FINGERPRINT_PATTERN.test(value);
}
function canonicalJson(value) {
	return JSON.stringify(canonicalize$1(value));
}
function canonicalize$1(value) {
	if (value === void 0) return null;
	if (typeof value === "bigint") return value.toString();
	if (typeof value === "number") return Number.isFinite(value) ? value : null;
	if (Array.isArray(value)) return value.map((item) => canonicalize$1(item));
	if (!isRecord$5(value)) return value;
	const canonical = {};
	for (const key of Object.keys(value).toSorted()) canonical[key] = canonicalize$1(value[key]);
	return canonical;
}
function isRecord$5(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var OCCURRENCE_BIND_COLUMNS = 13;
var D1_MAX_BOUND_PARAMETERS = 100;
var MEDIA_USAGE_GENERATION_WRITE_LEASE_MS = 36e5;
var OCCURRENCE_INSERT_BATCH_SIZE = Math.max(1, Math.floor(D1_MAX_BOUND_PARAMETERS / OCCURRENCE_BIND_COLUMNS));
function cleanupDeleteBatchSize(cleanupLease) {
	return cleanupLease ? 47 : 50;
}
function canIssueCleanupStatement(canIssueStatement) {
	return canIssueStatement?.() ?? true;
}
function nullableRefMatch(left, right) {
	const leftRef = sql.ref(left);
	const rightRef = sql.ref(right);
	return sql`(
		(${leftRef} IS NULL AND ${rightRef} IS NULL)
		OR ${leftRef} = ${rightRef}
	)`;
}
var MAX_JSON_BIND_BYTES = 19e5;
var MEDIA_USAGE_EVENT_QUERY_CEILING = 900;
var MEDIA_USAGE_QUERY_RESERVE = 150;
function chunkJsonRows(rows) {
	const batches = [];
	let batch = [];
	let batchBytes = 2;
	for (const row of rows) {
		const rowBytes = new TextEncoder().encode(JSON.stringify(row)).byteLength + (batch.length > 0 ? 1 : 0);
		if (batch.length > 0 && batchBytes + rowBytes > MAX_JSON_BIND_BYTES) {
			batches.push(batch);
			batch = [];
			batchBytes = 2;
		}
		batch.push(row);
		batchBytes += rowBytes;
	}
	if (batch.length > 0) batches.push(batch);
	return batches;
}
function mediaUsageQueryBudgetAllows(queries) {
	const metrics = getRequestContext()?.metrics;
	return !metrics || metrics.dbCount + queries + MEDIA_USAGE_QUERY_RESERVE <= MEDIA_USAGE_EVENT_QUERY_CEILING;
}
function mergeInto(target, source) {
	for (const value of source) target.add(value);
}
function batchOccurrenceRows(prepared, now) {
	return prepared.flatMap((item) => item.projection.occurrences.map((occurrence) => ({
		id: ulid(),
		source_key: item.row.source_key,
		generation: item.generation,
		field_slug: occurrence.fieldSlug,
		field_path: occurrence.fieldPath,
		occurrence_index: occurrence.occurrenceIndex ?? 0,
		reference_type: occurrence.referenceType,
		media_id: occurrence.mediaId,
		provider: occurrence.provider,
		provider_asset_id: occurrence.providerAssetId,
		media_kind: occurrence.mediaKind ?? null,
		mime_type: occurrence.mimeType ?? null,
		created_at: now,
		lease_token: item.leaseToken
	})));
}
function cleanupDurationSeconds(value) {
	if (!Number.isSafeInteger(value) || value < 0) throw new Error("Media usage cleanup duration must be a non-negative whole number of seconds");
	return value;
}
var CONTENT_SOURCE_ELIGIBILITY = sql`(
	s.source_variant = 'draft_overlay'
	OR (
		s.source_variant = 'columns'
		AND (
			s.content_status = 'published'
			OR NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_sources AS overlay
				WHERE overlay.source_type = 'content'
					AND overlay.collection_slug = s.collection_slug
					AND overlay.content_id = s.content_id
					AND overlay.source_variant = 'draft_overlay'
					AND ${contentSourceMatchesActiveCollection("overlay", "s.collection_id")}
			)
		)
	)
)`;
function contentSourceMatchesActiveCollection(source, currentCollectionId) {
	return sql`(
		NOT EXISTS (
			SELECT 1
			FROM _emdash_media_usage_activation AS activation
			WHERE activation.task_key = 'incremental_capture'
				AND activation.state = 'active'
		)
		OR (
			${sql.ref(`${source}.collection_id`)} = ${sql.ref(currentCollectionId)}
			AND ${sql.ref(`${source}.identity_version`)} = 1
		)
	)`;
}
/** Persistence-only repository for the internal media usage projection tables. */
var MediaUsageRepository = class {
	constructor(db) {
		this.db = db;
	}
	async replaceSource(source, occurrences) {
		const generation = ulid();
		if (!await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) throw new Error(`Media usage collection is no longer current for ${source.sourceKey}`);
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (!await this.upsertSource(trx, source, generation, now, leaseToken)) throw new Error(`Media usage generation lease expired for ${source.sourceKey}`);
			});
		})) throw new Error(`Media usage collection is no longer current for ${source.sourceKey}`);
		const replaced = await this.findSource(source.sourceKey);
		if (!replaced) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return replaced;
	}
	async replaceSourceIfCurrent(source, occurrences, expectedCurrentGeneration) {
		if (expectedCurrentGeneration !== null && await this.projectionMatchesCurrentGeneration(source, expectedCurrentGeneration)) return {
			replaced: false,
			unchanged: true,
			source: null
		};
		const generation = ulid();
		let replaced = false;
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (expectedCurrentGeneration === null) {
					replaced = await this.insertSourceIfAbsent(trx, row, leaseToken);
					return;
				}
				replaced = await this.updateSourceIfGeneration(trx, row, expectedCurrentGeneration, leaseToken);
			});
		});
		return {
			replaced,
			unchanged: false,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async findSource(sourceKey) {
		const row = await this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_key", "=", sourceKey).executeTakeFirst();
		return row ? rowToSource(row) : null;
	}
	async findSources(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		const sources = /* @__PURE__ */ new Map();
		if (uniqueSourceKeys.length === 0) return sources;
		for (const sourceKeyBatch of chunkJsonRows(uniqueSourceKeys)) {
			const result = await sql`
				WITH requested AS (${jsonTextValues(this.db, sourceKeyBatch)})
				SELECT source.*
				FROM _emdash_media_usage_sources AS source
				INNER JOIN requested ON requested.value = source.source_key
			`.execute(this.db);
			for (const row of result.rows) {
				const source = rowToSource(row);
				sources.set(source.sourceKey, source);
			}
		}
		return sources;
	}
	async measureSourceGenerationDeletion(sourceKey, generation, maxOccurrences) {
		if (!Number.isSafeInteger(maxOccurrences) || maxOccurrences < 0) throw new Error("Media usage deletion measurement requires a non-negative row limit");
		const payload = sql`
			COALESCE(field_slug, '') || COALESCE(field_path, '') ||
			COALESCE(reference_type, '') || COALESCE(media_id, '') ||
			COALESCE(provider, '') || COALESCE(provider_asset_id, '') ||
			COALESCE(media_kind, '') || COALESCE(mime_type, '')
		`;
		const occurrenceBytes = isPostgres(this.db) ? sql`octet_length(${payload})` : sql`length(CAST(${payload} AS BLOB))`;
		const rows = await this.db.selectFrom("_emdash_media_usage").select(occurrenceBytes.as("occurrence_bytes")).where("source_key", "=", sourceKey).where("generation", "=", generation).limit(maxOccurrences + 1).execute();
		return {
			occurrenceCount: rows.length,
			occurrenceBytes: rows.reduce((total, row) => total + Number(row.occurrence_bytes), 0),
			exceedsOccurrenceLimit: rows.length > maxOccurrences
		};
	}
	async replaceSourceIfMatching(source, occurrences, expectedSource) {
		if (expectedSource !== null && await this.projectionMatchesExpectedSource(source, expectedSource)) return {
			replaced: false,
			unchanged: true,
			source: null
		};
		const generation = ulid();
		let replaced = false;
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				await this.insertOccurrences(trx, source.sourceKey, generation, occurrences, now);
				if (expectedSource === null) {
					replaced = await this.insertSourceIfAbsent(trx, row, leaseToken);
					return;
				}
				replaced = await this.updateSourceIfMatching(trx, row, expectedSource, leaseToken);
			});
		});
		return {
			replaced,
			unchanged: false,
			source: replaced ? null : await this.findSource(source.sourceKey)
		};
	}
	async replaceNewSourcesBatch(projections) {
		const unique = [...new Map(projections.map((projection) => [projection.source.sourceKey, projection])).values()];
		if (unique.length === 0) return /* @__PURE__ */ new Set();
		const collectionSlug = unique[0]?.source.collectionSlug;
		const collectionId = unique[0]?.source.collectionId;
		if (!collectionSlug || !collectionId) throw new Error("Canonical media usage batch requires collection identity");
		validateIdentifier(collectionSlug, "collection slug");
		if (unique.some((projection) => projection.source.collectionSlug !== collectionSlug || projection.source.collectionId !== collectionId)) throw new Error("Canonical media usage batch must contain one collection");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const expiresAt = new Date(Date.now() + MEDIA_USAGE_GENERATION_WRITE_LEASE_MS).toISOString();
		const prepared = unique.map((projection) => {
			const generation = ulid();
			return {
				projection,
				generation,
				leaseToken: ulid(),
				row: this.buildSourceRow(projection.source, generation, now)
			};
		});
		const sourceRows = prepared.map((item) => ({
			...item.row,
			lease_token: item.leaseToken
		}));
		const occurrenceRows = batchOccurrenceRows(prepared, now);
		if (!mediaUsageQueryBudgetAllows(2 + chunkJsonRows(occurrenceRows).length + chunkJsonRows(sourceRows).length)) {
			if (unique.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(unique.length / 2);
			const inserted = /* @__PURE__ */ new Set();
			mergeInto(inserted, await this.replaceNewSourcesBatch(unique.slice(0, midpoint)));
			mergeInto(inserted, await this.replaceNewSourcesBatch(unique.slice(midpoint)));
			return inserted;
		}
		const leasesPayload = JSON.stringify(prepared.map((item) => ({
			source_key: item.row.source_key,
			collection_id: item.row.collection_id,
			collection_slug: item.row.collection_slug,
			generation: item.generation,
			lease_token: item.leaseToken,
			expires_at: expiresAt,
			created_at: now
		})));
		const leases = this.generationWriteBatchInput(leasesPayload);
		await sql`
			WITH input AS (${leases})
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT source_key, generation, lease_token, expires_at, created_at
			FROM input
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE collection.id = input.collection_id
					AND collection.slug = input.collection_slug
					AND status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.capture_state = 'active'
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = input.collection_id
					)
			)
		`.execute(this.db);
		try {
			await this.insertBatchOccurrences(occurrenceRows);
			const tableName = `ec_${collectionSlug}`;
			validateIdentifier(tableName, "content table");
			const inserted = /* @__PURE__ */ new Set();
			for (const sourceRowBatch of chunkJsonRows(sourceRows)) {
				const result = await sql`
					WITH input AS (${this.sourceBatchInput(JSON.stringify(sourceRowBatch))})
					INSERT INTO _emdash_media_usage_sources (
						source_key, source_type, collection_id, collection_slug, content_id,
						source_variant, locale, translation_group, content_slug, content_title,
						content_status, content_scheduled_at, content_deleted_at, revision_id,
						current_generation, schema_version, source_updated_at, source_version,
						source_fingerprint, identity_version, source_completeness,
						last_attempted_at, last_error_code, indexed_at, updated_at
					)
					SELECT
						input.source_key, input.source_type, input.collection_id, input.collection_slug,
						input.content_id, input.source_variant, input.locale, input.translation_group,
						input.content_slug, input.content_title, input.content_status,
						input.content_scheduled_at, input.content_deleted_at, input.revision_id,
						input.current_generation, input.schema_version, input.source_updated_at,
						input.source_version, input.source_fingerprint, input.identity_version,
						input.source_completeness, input.last_attempted_at, input.last_error_code,
						input.indexed_at, input.updated_at
					FROM input
					WHERE EXISTS (
						SELECT 1
						FROM _emdash_media_usage_generation_writes AS writer
						WHERE writer.source_key = input.source_key
							AND writer.generation = input.current_generation
							AND writer.lease_token = input.lease_token
							AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
					)
					AND EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						INNER JOIN _emdash_media_usage_index_status AS status
							ON status.collection_id = collection.id
							AND status.scope_key = collection.slug
						WHERE collection.id = input.collection_id
							AND collection.slug = input.collection_slug
							AND status.adapter_id = 'content-media'
							AND status.scope_type = 'collection'
							AND status.capture_state = 'active'
							AND NOT EXISTS (
								SELECT 1
								FROM _emdash_media_usage_collection_deletions AS deletion
								WHERE deletion.collection_id = input.collection_id
							)
					)
					AND EXISTS (
						SELECT 1
						FROM ${sql.ref(tableName)} AS content
						WHERE content.id = input.content_id
							AND content.version = input.source_version
							AND content.updated_at = input.source_updated_at
							AND (
								(input.source_variant = 'columns' AND ${nullableRefMatch("content.live_revision_id", "input.revision_id")})
								OR
								(input.source_variant = 'draft_overlay' AND ${nullableRefMatch("content.draft_revision_id", "input.revision_id")})
							)
					)
					ON CONFLICT (source_key) DO NOTHING
					RETURNING source_key
				`.execute(this.db);
				for (const row of result.rows) inserted.add(row.source_key);
			}
			return inserted;
		} finally {
			await sql`
				WITH input AS (${leases})
				DELETE FROM _emdash_media_usage_generation_writes AS writer
				WHERE EXISTS (
					SELECT 1
					FROM input
					WHERE input.source_key = writer.source_key
						AND input.generation = writer.generation
						AND input.lease_token = writer.lease_token
				)
			`.execute(this.db);
		}
	}
	async replaceExistingSourcesBatch(projections) {
		const unique = [...new Map(projections.map((projection) => [projection.source.sourceKey, projection])).values()];
		if (unique.length === 0) return /* @__PURE__ */ new Set();
		const collectionSlug = unique[0]?.source.collectionSlug;
		const collectionId = unique[0]?.source.collectionId;
		if (!collectionSlug || !collectionId) throw new Error("Canonical media usage batch requires collection identity");
		validateIdentifier(collectionSlug, "collection slug");
		if (unique.some((projection) => projection.source.collectionSlug !== collectionSlug || projection.source.collectionId !== collectionId)) throw new Error("Canonical media usage batch must contain one collection");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const expiresAt = new Date(Date.now() + MEDIA_USAGE_GENERATION_WRITE_LEASE_MS).toISOString();
		const prepared = unique.map((projection) => {
			const generation = ulid();
			return {
				projection,
				generation,
				leaseToken: ulid(),
				row: this.buildSourceRow(projection.source, generation, now)
			};
		});
		const sourceRows = prepared.map((item) => ({
			...item.row,
			lease_token: item.leaseToken,
			expected_generation: item.projection.expectedSource.currentGeneration,
			expected_collection_id: item.projection.expectedSource.collectionId,
			expected_updated_at: item.projection.expectedSource.updatedAt,
			expected_source_fingerprint: item.projection.expectedSource.sourceFingerprint,
			expected_source_updated_at: item.projection.expectedSource.sourceUpdatedAt,
			expected_source_version: item.projection.expectedSource.sourceVersion,
			expected_identity_version: item.projection.expectedSource.identityVersion,
			expected_revision_id: item.projection.expectedSource.revisionId,
			expected_source_completeness: item.projection.expectedSource.sourceCompleteness,
			expected_last_attempted_at: item.projection.expectedSource.lastAttemptedAt,
			expected_last_error_code: item.projection.expectedSource.lastErrorCode
		}));
		const occurrenceRows = batchOccurrenceRows(prepared, now);
		if (!mediaUsageQueryBudgetAllows(2 + chunkJsonRows(occurrenceRows).length + chunkJsonRows(sourceRows).length)) {
			if (unique.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(unique.length / 2);
			const replaced = /* @__PURE__ */ new Set();
			mergeInto(replaced, await this.replaceExistingSourcesBatch(unique.slice(0, midpoint)));
			mergeInto(replaced, await this.replaceExistingSourcesBatch(unique.slice(midpoint)));
			return replaced;
		}
		const leasesPayload = JSON.stringify(prepared.map((item) => ({
			source_key: item.row.source_key,
			collection_id: item.row.collection_id,
			collection_slug: item.row.collection_slug,
			generation: item.generation,
			lease_token: item.leaseToken,
			expires_at: expiresAt,
			created_at: now
		})));
		const leases = this.generationWriteBatchInput(leasesPayload);
		await sql`
			WITH input AS (${leases})
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT source_key, generation, lease_token, expires_at, created_at
			FROM input
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_collections AS collection
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE collection.id = input.collection_id
					AND collection.slug = input.collection_slug
					AND status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.capture_state = 'active'
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = input.collection_id
					)
			)
		`.execute(this.db);
		try {
			await this.insertBatchOccurrences(occurrenceRows);
			const tableName = `ec_${collectionSlug}`;
			validateIdentifier(tableName, "content table");
			const replaced = /* @__PURE__ */ new Set();
			for (const sourceRowBatch of chunkJsonRows(sourceRows)) {
				const result = await sql`
					WITH input AS (${this.sourceBatchInput(JSON.stringify(sourceRowBatch))})
					UPDATE _emdash_media_usage_sources AS source
					SET source_type = input.source_type,
						collection_id = input.collection_id,
						collection_slug = input.collection_slug,
						content_id = input.content_id,
						source_variant = input.source_variant,
						locale = input.locale,
						translation_group = input.translation_group,
						content_slug = input.content_slug,
						content_title = input.content_title,
						content_status = input.content_status,
						content_scheduled_at = input.content_scheduled_at,
						content_deleted_at = input.content_deleted_at,
						revision_id = input.revision_id,
						current_generation = input.current_generation,
						schema_version = input.schema_version,
						source_updated_at = input.source_updated_at,
						source_version = input.source_version,
						source_fingerprint = input.source_fingerprint,
						identity_version = input.identity_version,
						source_completeness = input.source_completeness,
						last_attempted_at = input.last_attempted_at,
						last_error_code = input.last_error_code,
						indexed_at = input.indexed_at,
						updated_at = input.updated_at
					FROM input
					WHERE source.source_key = input.source_key
						AND source.current_generation = input.expected_generation
						AND ${this.batchRefsMatch("source.collection_id", "input.expected_collection_id")}
						AND source.updated_at = input.expected_updated_at
						AND ${this.batchRefsMatch("source.source_fingerprint", "input.expected_source_fingerprint")}
						AND ${this.batchRefsMatch("source.source_updated_at", "input.expected_source_updated_at")}
						AND ${this.batchRefsMatch("source.source_version", "input.expected_source_version")}
						AND ${this.batchRefsMatch("source.identity_version", "input.expected_identity_version")}
						AND ${this.batchRefsMatch("source.revision_id", "input.expected_revision_id")}
						AND source.source_completeness = input.expected_source_completeness
						AND ${this.batchRefsMatch("source.last_attempted_at", "input.expected_last_attempted_at")}
						AND ${this.batchRefsMatch("source.last_error_code", "input.expected_last_error_code")}
						AND EXISTS (
							SELECT 1
							FROM _emdash_media_usage_generation_writes AS writer
							WHERE writer.source_key = input.source_key
								AND writer.generation = input.current_generation
								AND writer.lease_token = input.lease_token
								AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
						)
						AND EXISTS (
							SELECT 1
							FROM _emdash_collections AS collection
							INNER JOIN _emdash_media_usage_index_status AS status
								ON status.collection_id = collection.id
								AND status.scope_key = collection.slug
							WHERE collection.id = input.collection_id
								AND collection.slug = input.collection_slug
								AND status.adapter_id = 'content-media'
								AND status.scope_type = 'collection'
								AND status.capture_state = 'active'
								AND NOT EXISTS (
									SELECT 1
									FROM _emdash_media_usage_collection_deletions AS deletion
									WHERE deletion.collection_id = input.collection_id
								)
						)
						AND EXISTS (
							SELECT 1
							FROM ${sql.ref(tableName)} AS content
							WHERE content.id = input.content_id
								AND content.version = input.source_version
								AND content.updated_at = input.source_updated_at
								AND (
									(input.source_variant = 'columns' AND ${nullableRefMatch("content.live_revision_id", "input.revision_id")})
									OR
									(input.source_variant = 'draft_overlay' AND ${nullableRefMatch("content.draft_revision_id", "input.revision_id")})
								)
						)
					RETURNING ${isPostgres(this.db) ? sql`source.source_key` : sql`source_key`} AS source_key
				`.execute(this.db);
				for (const row of result.rows) replaced.add(row.source_key);
			}
			return replaced;
		} finally {
			await sql`
				WITH input AS (${leases})
				DELETE FROM _emdash_media_usage_generation_writes AS writer
				WHERE EXISTS (
					SELECT 1
					FROM input
					WHERE input.source_key = writer.source_key
						AND input.generation = writer.generation
						AND input.lease_token = writer.lease_token
				)
			`.execute(this.db);
		}
	}
	async matchingExistingSourcesBatch(projections) {
		if (projections.length === 0) return /* @__PURE__ */ new Set();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const rows = projections.map((projection) => ({
			...this.buildSourceRow(projection.source, projection.expectedSource.currentGeneration, now),
			expected_generation: projection.expectedSource.currentGeneration,
			expected_collection_id: projection.expectedSource.collectionId,
			expected_updated_at: projection.expectedSource.updatedAt,
			expected_source_fingerprint: projection.expectedSource.sourceFingerprint,
			expected_source_updated_at: projection.expectedSource.sourceUpdatedAt,
			expected_source_version: projection.expectedSource.sourceVersion,
			expected_identity_version: projection.expectedSource.identityVersion,
			expected_revision_id: projection.expectedSource.revisionId,
			expected_source_completeness: projection.expectedSource.sourceCompleteness,
			expected_last_attempted_at: projection.expectedSource.lastAttemptedAt,
			expected_last_error_code: projection.expectedSource.lastErrorCode
		}));
		if (!mediaUsageQueryBudgetAllows(chunkJsonRows(rows).length)) {
			if (projections.length === 1) return /* @__PURE__ */ new Set();
			const midpoint = Math.ceil(projections.length / 2);
			const matched = /* @__PURE__ */ new Set();
			mergeInto(matched, await this.matchingExistingSourcesBatch(projections.slice(0, midpoint)));
			mergeInto(matched, await this.matchingExistingSourcesBatch(projections.slice(midpoint)));
			return matched;
		}
		const matched = /* @__PURE__ */ new Set();
		for (const batch of chunkJsonRows(rows)) {
			const result = await sql`
				WITH input AS (${this.sourceBatchInput(JSON.stringify(batch))})
				SELECT source.source_key
				FROM _emdash_media_usage_sources AS source
				INNER JOIN input ON input.source_key = source.source_key
				WHERE source.current_generation = input.expected_generation
					AND ${this.batchRefsMatch("source.collection_id", "input.expected_collection_id")}
					AND source.updated_at = input.expected_updated_at
					AND ${this.batchRefsMatch("source.source_fingerprint", "input.expected_source_fingerprint")}
					AND ${this.batchRefsMatch("source.source_updated_at", "input.expected_source_updated_at")}
					AND ${this.batchRefsMatch("source.source_version", "input.expected_source_version")}
					AND ${this.batchRefsMatch("source.identity_version", "input.expected_identity_version")}
					AND ${this.batchRefsMatch("source.revision_id", "input.expected_revision_id")}
					AND source.source_completeness = input.expected_source_completeness
					AND ${this.batchRefsMatch("source.last_attempted_at", "input.expected_last_attempted_at")}
					AND ${this.batchRefsMatch("source.last_error_code", "input.expected_last_error_code")}
					AND EXISTS (
						SELECT 1
						FROM _emdash_collections AS collection
						WHERE collection.id = source.collection_id
							AND collection.slug = source.collection_slug
					)
			`.execute(this.db);
			for (const row of result.rows) matched.add(row.source_key);
		}
		return matched;
	}
	async markSourceAttempted(source) {
		if (source.collectionId !== void 0 && source.collectionId !== null) {
			const expectedSource = await this.findSource(source.sourceKey);
			if (!(await this.markSourceAttemptedIfMatching(source, expectedSource)).attempted) throw new Error(`Canonical media usage source ${source.sourceKey} is no longer current`);
			const attempted = await this.findSource(source.sourceKey);
			if (!attempted) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
			return attempted;
		}
		const generation = ulid();
		await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildAttemptedSourceRow(source, generation, now);
			const updates = this.attemptedSourceUpdateSet(source, row);
			if (((await this.db.insertInto("_emdash_media_usage_sources").values(row).onConflict((oc) => oc.column("source_key").doUpdateSet(updates)).executeTakeFirst()).numInsertedOrUpdatedRows ?? 0n) <= 0n) throw new Error(`Media usage generation lease expired for ${source.sourceKey}`);
		});
		const attempted = await this.findSource(source.sourceKey);
		if (!attempted) throw new Error(`Media usage source ${source.sourceKey} was not persisted`);
		return attempted;
	}
	async markSourceAttemptedIfMatching(source, expectedSource) {
		const generation = ulid();
		let attempted = false;
		if (expectedSource === null) await this.withGenerationWriteLease(source, generation, async (leaseToken, now) => {
			const row = this.buildAttemptedSourceRow(source, generation, now);
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				attempted = await this.persistSourceIfWriteLease(trx, row, leaseToken, sql`ON CONFLICT (source_key) DO NOTHING`);
			});
		});
		else {
			const row = this.buildAttemptedSourceRow(source, generation, (/* @__PURE__ */ new Date()).toISOString());
			await withTransaction(this.db, async (trx) => {
				if (!await this.lockCanonicalSourceCollection(trx, source)) return;
				attempted = await this.updateAttemptedSourceIfMatching(trx, source, row, expectedSource);
			});
		}
		return {
			attempted,
			source: attempted ? null : await this.findSource(source.sourceKey)
		};
	}
	async findActiveEntryCountsByMediaIds(mediaIds) {
		const uniqueMediaIds = [...new Set(mediaIds)];
		const counts = new Map(uniqueMediaIds.map((mediaId) => [mediaId, 0]));
		for (const mediaIdBatch of chunks(uniqueMediaIds, 50)) {
			const visibleEntries = this.currentContentMediaUsageBaseQuery().select([
				"u.media_id as media_id",
				"s.collection_slug as collection_slug",
				"s.content_id as content_id"
			]).where("u.media_id", "in", mediaIdBatch).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_sources as deleted_source").select("deleted_source.source_key").where("deleted_source.source_type", "=", "content").whereRef("deleted_source.collection_slug", "=", "s.collection_slug").whereRef("deleted_source.content_id", "=", "s.content_id").where("deleted_source.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("deleted_source", "collection.id")).where("deleted_source.content_deleted_at", "is not", null)))).distinct().as("visible_entries");
			const rows = await this.db.selectFrom(visibleEntries).select("media_id").select((eb) => eb.fn.countAll().as("usage_count")).groupBy("media_id").execute();
			for (const row of rows) if (row.media_id !== null) counts.set(row.media_id, Number(row.usage_count));
		}
		return counts;
	}
	/**
	* Read collection index status and the named options in one statement.
	* The one-row anchor keeps the option values readable on a site with no
	* collections.
	*/
	async findCoverageWithOptions(identity, optionNames) {
		let query = this.db.selectFrom(this.db.selectNoFrom(sql`1`.as("anchor")).as("anchor")).leftJoin("_emdash_collections as collection", (join) => join.on(sql`1 = 1`)).leftJoin("_emdash_media_usage_index_status as status", (join) => join.on("status.adapter_id", "=", identity.adapterId).on("status.scope_type", "=", identity.scopeType).onRef("status.scope_key", "=", "collection.slug")).select([
			"collection.slug as collection_slug",
			"status.status as status",
			"status.schema_version as schema_version",
			"status.reconciliation_required as reconciliation_required"
		]).orderBy("collection.slug", "asc");
		const optionAliases = optionNames.map((name, index) => [name, `option_${index}`]);
		for (const [name, alias] of optionAliases) query = query.select((eb) => eb.selectFrom("options").select("value").where("name", "=", name).as(alias));
		const rows = await query.execute();
		const scopes = [];
		for (const row of rows) {
			if (typeof row.collection_slug !== "string") continue;
			scopes.push({
				collectionSlug: row.collection_slug,
				status: typeof row.status === "string" ? row.status : null,
				schemaVersion: row.schema_version == null ? null : Number(row.schema_version),
				reconciliationRequired: row.reconciliation_required != null && Number(row.reconciliation_required) !== 0
			});
		}
		const firstRow = rows[0];
		const options = /* @__PURE__ */ new Map();
		for (const [name, alias] of optionAliases) {
			const value = firstRow?.[alias];
			options.set(name, typeof value === "string" ? value : null);
		}
		return {
			scopes,
			options
		};
	}
	async findCollectionProgress() {
		const row = (await sql`
			WITH collection_progress AS (
				SELECT
					CASE WHEN status.status = 'complete'
						AND status.schema_version = ${2}
						AND status.reconciliation_required = 0
						AND status.capture_state = 'active'
						AND NOT EXISTS (
							SELECT 1 FROM _emdash_media_usage_work AS work
							WHERE work.collection_id = collection.id
								AND work.collection_slug = collection.slug
						)
					THEN 1 ELSE 0 END AS is_ready,
					CASE WHEN status.collection_id IS NULL
						OR COALESCE(status.capture_state, '') <> 'active'
						OR status.status NOT IN ('complete', 'never', 'running', 'partial', 'failed', 'stale')
						OR status.status = 'failed'
						OR (
							status.reconciliation_required = 0
							AND (
								status.status <> 'complete'
								OR COALESCE(status.schema_version, -1) <> ${2}
							)
							AND NOT EXISTS (
								SELECT 1 FROM _emdash_media_usage_work AS work
								WHERE work.collection_id = collection.id
									AND work.collection_slug = collection.slug
							)
						)
						OR EXISTS (
							SELECT 1 FROM _emdash_media_usage_work AS work
							WHERE work.collection_id = collection.id
								AND work.collection_slug = collection.slug
								AND work.state = 'failed'
						)
						OR EXISTS (
							SELECT 1 FROM _emdash_media_usage_reconciliations AS reconciliation
							WHERE reconciliation.collection_id = collection.id
								AND reconciliation.collection_slug = collection.slug
								AND reconciliation.state = 'failed'
								AND status.reconciliation_required = 1
								AND (
									reconciliation.target_epoch IS NULL
									OR reconciliation.target_epoch >= status.change_epoch
								)
						)
					THEN 1 ELSE 0 END AS needs_attention
				FROM _emdash_collections AS collection
				LEFT JOIN _emdash_media_usage_index_status AS status
					ON status.adapter_id = 'content-media'
					AND status.scope_type = 'collection'
					AND status.collection_id = collection.id
					AND status.scope_key = collection.slug
				WHERE NOT EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = collection.id
						AND deletion.collection_slug = collection.slug
				)
			)
			SELECT
				(
					SELECT activation.runtime_generation
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
				) AS activation_generation,
				EXISTS (
					SELECT 1 FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				) AS activation_active,
				COUNT(*) AS total_collections,
				COALESCE(SUM(is_ready), 0) AS ready_collections,
				EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.state IN ('pending', 'retry', 'leased')
				) AS cleanup_pending,
				CASE WHEN COALESCE(MAX(needs_attention), 0) = 1 OR EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.state = 'failed'
				) THEN 1 ELSE 0 END AS needs_attention
			FROM collection_progress
		`.execute(this.db)).rows[0];
		if (!row) throw new Error("Media usage progress query returned no result");
		if (!row.activation_active) return null;
		if (Number(row.activation_generation) !== 1) throw new MediaUsageActivationVersionMismatchError("Media usage activation runtime generation is incompatible");
		const readyCollections = Number(row.ready_collections);
		const totalCollections = Number(row.total_collections);
		const cleanupPending = Number(row.cleanup_pending);
		const needsAttention = Number(row.needs_attention);
		if (!Number.isSafeInteger(readyCollections) || !Number.isSafeInteger(totalCollections) || readyCollections < 0 || totalCollections < readyCollections || cleanupPending !== 0 && cleanupPending !== 1 || needsAttention !== 0 && needsAttention !== 1) throw new Error("Media usage progress query returned invalid counts");
		return {
			status: needsAttention ? "needs_attention" : readyCollections === totalCollections && cleanupPending === 0 ? "ready" : "indexing",
			readyCollections,
			totalCollections
		};
	}
	async findCurrentEntryUsagePageByMediaId(mediaId, options = {}) {
		const requestedLimit = Math.floor(options.limit ?? 50);
		const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(1, requestedLimit), 100) : 50;
		const cursor = options.cursor ? decodeCursor(options.cursor) : null;
		if (cursor && (cursor.orderValue.length === 0 || cursor.id.length === 0)) throw new InvalidCursorError(options.cursor ?? "");
		let matchedGroups = this.currentContentMediaUsageBaseQuery().select([
			"collection.id as collection_id",
			"s.collection_slug as collection_slug",
			"s.content_id as content_id"
		]).where("u.media_id", "=", mediaId).distinct();
		if (cursor) matchedGroups = matchedGroups.where((eb) => eb.or([eb("s.collection_slug", ">", cursor.orderValue), eb.and([eb("s.collection_slug", "=", cursor.orderValue), eb("s.content_id", ">", cursor.id)])]));
		matchedGroups = matchedGroups.orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").limit(limit + 1);
		const rows = await this.db.with("matched_groups", () => matchedGroups).with("page_groups", (db) => db.selectFrom("matched_groups").selectAll().orderBy("collection_slug", "asc").orderBy("content_id", "asc").limit(limit)).with("entry_state", (db) => db.selectFrom("page_groups as page").crossJoin("_emdash_media_usage_sources as state").select([
			"page.collection_id",
			"page.collection_slug",
			"page.content_id"
		]).select((eb) => eb.fn.max("state.content_deleted_at").as("entry_deleted_at")).whereRef("page.collection_slug", "=", "state.collection_slug").whereRef("page.content_id", "=", "state.content_id").where("state.source_type", "=", "content").where("state.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("state", "page.collection_id")).groupBy([
			"page.collection_id",
			"page.collection_slug",
			"page.content_id"
		])).selectFrom("entry_state as page").crossJoin("_emdash_media_usage_sources as s").crossJoin("_emdash_media_usage as u").whereRef("page.collection_slug", "=", "s.collection_slug").whereRef("page.content_id", "=", "s.content_id").where(contentSourceMatchesActiveCollection("s", "page.collection_id")).whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").select(currentUsageSelect).select("page.entry_deleted_at").select(sql`CASE
					WHEN (SELECT COUNT(*) FROM matched_groups) > ${limit} THEN 1
					ELSE 0
				END`.as("has_more")).where("u.media_id", "=", mediaId).where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(CONTENT_SOURCE_ELIGIBILITY).orderBy("s.collection_slug", "asc").orderBy("s.content_id", "asc").orderBy("s.source_variant", "asc").orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").orderBy("u.id", "asc").execute();
		const items = groupUsageRows(rows);
		const result = { items };
		if (Number(rows[0]?.has_more ?? 0) === 1 && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.collectionSlug, last.contentId);
		}
		return result;
	}
	async findCurrentUsageByMediaId(mediaId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.media_id", "=", mediaId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsageByProviderAsset(provider, providerAssetId) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect).where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId).orderBy("s.source_key", "asc").orderBy("u.field_path", "asc").orderBy("u.occurrence_index", "asc").execute()).map(rowToUsageRecord);
	}
	async findCurrentUsagePageByMediaId(mediaId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.media_id", "=", mediaId), options);
	}
	async findCurrentUsagePageByProviderAsset(provider, providerAssetId, options = {}) {
		return this.findCurrentUsagePage((query) => query.where("u.provider", "=", provider).where("u.provider_asset_id", "=", providerAssetId), options);
	}
	async deleteSource(sourceKey) {
		return this.deleteSources([sourceKey]);
	}
	async deleteSourceIfCurrent(sourceKey, expectedCurrentGeneration) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where("current_generation", "=", expectedCurrentGeneration).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedCurrentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatching(sourceKey, expectedSource) {
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(expectedSource.collectionId, expectedSource.collectionSlug)).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		return {
			deleted,
			source: await this.findSource(sourceKey)
		};
	}
	async deleteSourceIfMatchingContentAbsent(sourceKey, expectedSource, collectionSlug, contentId) {
		validateIdentifier(collectionSlug, "collection slug");
		const tableName = `ec_${collectionSlug}`;
		let deleted = false;
		await withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(expectedSource.collectionId, expectedSource.collectionSlug)).where(sql`NOT EXISTS (SELECT 1 FROM ${sql.ref(tableName)} WHERE id = ${contentId})`).executeTakeFirst();
			deleted = Number(result.numDeletedRows ?? 0) > 0;
			if (!deleted) return;
			await this.deleteSourceGenerationOccurrences(trx, sourceKey, expectedSource.currentGeneration);
		});
		const contentPresent = deleted ? false : await this.contentRowExists(tableName, contentId);
		return {
			deleted,
			contentPresent,
			source: deleted || contentPresent ? null : await this.findSource(sourceKey)
		};
	}
	async deleteSources(sourceKeys) {
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteContentSources(collectionSlug, contentId) {
		const sourceKeys = (await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).where("content_id", "=", contentId).execute()).map((row) => row.source_key);
		return this.deleteSourceKeys(sourceKeys);
	}
	async deleteCollectionSources(collectionSlug) {
		let deleted = 0;
		while (true) {
			const sourceRows = await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc").limit(50).execute();
			if (sourceRows.length === 0) break;
			deleted += await this.deleteSourceKeys(sourceRows.map((row) => row.source_key));
		}
		return deleted;
	}
	async findCollectionContentSources(collectionSlug, collectionId) {
		let query = this.db.selectFrom("_emdash_media_usage_sources").selectAll().where("source_type", "=", "content").where("collection_slug", "=", collectionSlug).orderBy("source_key", "asc");
		if (collectionId !== void 0) query = query.where("collection_id", "=", collectionId);
		return (await query.execute()).map((row) => rowToSource(row));
	}
	async claimMediaUsageCleanup(input) {
		const leaseDurationSeconds = cleanupDurationSeconds(input.leaseDurationSeconds);
		const nextEligibleDelaySeconds = cleanupDurationSeconds(input.nextEligibleDelaySeconds);
		const sweepSafetyWindowSeconds = cleanupDurationSeconds(input.sweepSafetyWindowSeconds);
		const claimedAt = this.cleanupTimestampOffset(0);
		const leaseExpiresAt = this.cleanupTimestampOffset(leaseDurationSeconds);
		const nextEligibleAt = this.cleanupTimestampOffset(nextEligibleDelaySeconds);
		const sweepBeforeAt = this.cleanupTimestampOffset(-sweepSafetyWindowSeconds);
		const row = await this.db.updateTable("_emdash_media_usage_cleanup").set({
			lease_token: input.leaseToken,
			lease_expires_at: leaseExpiresAt,
			next_eligible_at: nextEligibleAt,
			last_started_at: claimedAt,
			updated_at: claimedAt,
			scan_before_at: sql`CASE
					WHEN scan_before_at IS NULL THEN ${sweepBeforeAt}
					ELSE scan_before_at
				END`
		}).where("task_key", "=", "projection_gc").where(this.cleanupTimestampIsDue("next_eligible_at")).where((eb) => eb.or([eb("lease_token", "is", null), this.cleanupTimestampIsDue("lease_expires_at")])).returning([
			"cursor_created_at",
			"cursor_id",
			"last_started_at",
			"scan_before_at",
			"consecutive_failures"
		]).executeTakeFirst();
		if (!row) return null;
		if (!row.last_started_at || !row.scan_before_at) throw new Error("Media usage cleanup claim did not persist its database timestamps");
		return {
			leaseToken: input.leaseToken,
			cursor: row.cursor_created_at && row.cursor_id ? {
				createdAt: row.cursor_created_at,
				id: row.cursor_id
			} : null,
			claimedAt: row.last_started_at,
			scanBeforeAt: row.scan_before_at,
			consecutiveFailures: row.consecutive_failures
		};
	}
	/**
	* Scans for reclaimable occurrences, or resolves to `null` when the sweep was
	* never issued because the lease is gone or the tick is out of budget. An
	* empty array means the scan ran and found nothing, which lets the caller
	* retire the sweep window; `null` must leave the cursor where it was.
	*/
	async findMediaUsageCleanupCandidates(input) {
		if (!await this.admitCleanupScan(input.cleanupLease, input.canIssueStatement)) return null;
		let query = this.db.selectFrom("_emdash_media_usage as u").leftJoin("_emdash_media_usage_sources as s", "s.source_key", "u.source_key").leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select([
			"u.id as id",
			"u.source_key as source_key",
			"u.generation as generation",
			"u.created_at as created_at",
			"s.current_generation as current_generation",
			"s.indexed_at as indexed_at",
			"writer.expires_at as write_lease_expires_at"
		]).where("u.created_at", "<", input.cutoff).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(Math.max(0, Math.floor(input.limit)));
		if (input.cursor) {
			const cursor = input.cursor;
			query = query.where((eb) => eb(eb.refTuple("u.created_at", "u.id"), ">", eb.tuple(cursor.createdAt, cursor.id)));
		}
		return (await query.execute()).map((row) => ({
			id: row.id,
			sourceKey: row.source_key,
			generation: row.generation,
			createdAt: row.created_at,
			currentGeneration: row.current_generation,
			indexedAt: row.indexed_at,
			writeLeaseExpiresAt: row.write_lease_expires_at
		}));
	}
	async completeMediaUsageCleanup(input) {
		const updates = {
			lease_token: null,
			lease_expires_at: null,
			cursor_created_at: input.sweepComplete ? null : input.nextCursor?.createdAt ?? null,
			cursor_id: input.sweepComplete ? null : input.nextCursor?.id ?? null,
			...input.sweepComplete ? { scan_before_at: null } : {},
			consecutive_failures: 0,
			last_completed_at: this.cleanupTimestampOffset(0),
			last_candidate_count: input.candidateCount,
			last_deleted_orphans: input.deletedOrphans,
			last_deleted_stale: input.deletedStale,
			last_deleted_abandoned: input.deletedAbandoned,
			last_deleted_write_leases: input.deletedWriteLeases,
			last_backlog_lower_bound: input.backlogLowerBound,
			last_scan_has_more: input.scanHasMore ? 1 : 0,
			last_duration_ms: input.durationMs,
			last_error_code: null,
			updated_at: this.cleanupTimestampOffset(0)
		};
		const result = await this.db.updateTable("_emdash_media_usage_cleanup").set(updates).where("task_key", "=", "projection_gc").where("lease_token", "=", input.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at")).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async failMediaUsageCleanup(input) {
		const retryDelaySeconds = cleanupDurationSeconds(input.retryDelaySeconds);
		const result = await this.db.updateTable("_emdash_media_usage_cleanup").set({
			lease_token: null,
			lease_expires_at: null,
			next_eligible_at: this.cleanupTimestampOffset(retryDelaySeconds),
			consecutive_failures: input.consecutiveFailures,
			last_completed_at: this.cleanupTimestampOffset(0),
			last_duration_ms: input.durationMs,
			last_error_code: input.errorCode,
			updated_at: this.cleanupTimestampOffset(0)
		}).where("task_key", "=", "projection_gc").where("lease_token", "=", input.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at")).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async deleteOrphanOccurrencesOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteOrphanCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").leftJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("s.source_key", "is", null).where("u.created_at", "<", cutoff).where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteOrphanCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteStaleGenerationsOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteStaleCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", "<", "s.indexed_at").where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteStaleCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteAbandonedGenerationsOlderThan(cutoff, limit, options = {}) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (options.candidateIds) return this.deleteAbandonedCandidateIds(options.candidateIds.slice(0, batchLimit), cutoff, options.cleanupLease, options.canIssueStatement);
		if (!await this.admitCleanupScan(options.cleanupLease, options.canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage as u").innerJoin("_emdash_media_usage_sources as s", (join) => join.onRef("s.source_key", "=", "u.source_key")).leftJoin("_emdash_media_usage_generation_writes as writer", (join) => join.onRef("writer.source_key", "=", "u.source_key").onRef("writer.generation", "=", "u.generation")).select("u.id").where("u.created_at", "<", cutoff).whereRef("u.generation", "!=", "s.current_generation").whereRef("u.created_at", ">=", "s.indexed_at").where(this.noActiveGenerationWriteExpression("u")).orderBy("u.created_at", "asc").orderBy("u.id", "asc").limit(batchLimit).execute();
		return this.deleteAbandonedCandidateIds(rows.map((row) => row.id), cutoff, options.cleanupLease, options.canIssueStatement);
	}
	async deleteExpiredGenerationWriteLeases(limit, cleanupLease, canIssueStatement) {
		const batchLimit = Math.floor(limit);
		if (batchLimit <= 0) return 0;
		if (!await this.admitCleanupScan(cleanupLease, canIssueStatement)) return 0;
		const rows = await this.db.selectFrom("_emdash_media_usage_generation_writes").select("lease_token").where(this.generationWriteLeaseHasExpired("expires_at")).orderBy("expires_at", "asc").orderBy("lease_token", "asc").limit(batchLimit).execute();
		if (rows.length === 0 || !canIssueCleanupStatement(canIssueStatement)) return 0;
		let deleteQuery = this.db.deleteFrom("_emdash_media_usage_generation_writes").where("lease_token", "in", rows.map((row) => row.lease_token)).where(this.generationWriteLeaseHasExpired("expires_at"));
		if (cleanupLease) deleteQuery = deleteQuery.where(this.activeCleanupLeaseExpression(cleanupLease));
		const result = await deleteQuery.executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	async upsertIndexStatus(input) {
		const now = input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString();
		const row = {
			adapter_id: input.adapterId,
			scope_type: input.scopeType,
			scope_key: input.scopeKey,
			status: input.status,
			schema_version: input.schemaVersion ?? 1,
			started_at: input.startedAt ?? null,
			completed_at: input.completedAt ?? null,
			cursor: input.cursor ?? null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: now
		};
		await this.db.insertInto("_emdash_media_usage_index_status").values(row).onConflict((oc) => oc.columns([
			"adapter_id",
			"scope_type",
			"scope_key"
		]).doUpdateSet({
			status: row.status,
			schema_version: row.schema_version,
			started_at: row.started_at,
			completed_at: row.completed_at,
			cursor: row.cursor,
			indexed_source_count: row.indexed_source_count,
			failed_source_count: row.failed_source_count,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		})).execute();
		const status = await this.findIndexStatus(input);
		if (!status) throw new Error(`Media usage index status ${input.adapterId}:${input.scopeType}:${input.scopeKey} was not persisted`);
		return status;
	}
	async invalidateIndexStatusForSchemaChange(collectionSlug) {
		const result = await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			change_epoch: sql`change_epoch + 1`,
			status: "stale",
			completed_at: null,
			cursor: null,
			last_error_code: "CONTENT_USAGE_STALE",
			reconciliation_required: 1,
			updated_at: this.sortableUtcTimestamp()
		}).where("status.adapter_id", "=", "content-media").where("status.scope_type", "=", "collection").where("status.scope_key", "=", collectionSlug).where("status.capture_state", "=", "active").where((eb) => eb.exists(eb.selectFrom("_emdash_collections as collection").select("collection.id").whereRef("collection.id", "=", "status.collection_id").whereRef("collection.slug", "=", "status.scope_key"))).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async beginIndexStatusRepair(input) {
		return this.upsertIndexStatus({
			adapterId: input.adapterId,
			scopeType: input.scopeType,
			scopeKey: input.scopeKey,
			status: "running",
			schemaVersion: input.schemaVersion,
			startedAt: input.startedAt,
			completedAt: null,
			cursor: input.runToken,
			indexedSourceCount: 0,
			failedSourceCount: 0,
			lastErrorCode: null,
			updatedAt: input.updatedAt
		});
	}
	async finalizeIndexStatusRepairIfRunning(input) {
		const updates = {
			status: input.status,
			completed_at: input.completedAt,
			cursor: null,
			indexed_source_count: input.indexedSourceCount ?? 0,
			failed_source_count: input.failedSourceCount ?? 0,
			last_error_code: input.lastErrorCode ?? null,
			updated_at: input.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		if (input.schemaVersion !== void 0) updates.schema_version = input.schemaVersion;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set(updates).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("status", "=", "running").where("cursor", "=", input.runToken).executeTakeFirst();
		return {
			finalized: Number(result.numUpdatedRows ?? 0) > 0,
			status: await this.findIndexStatus(input)
		};
	}
	async beginIndexStatusRepairAtCurrentEpoch(input) {
		const now = this.sortableUtcTimestamp();
		const row = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: "running",
			schema_version: input.schemaVersion,
			started_at: now,
			completed_at: null,
			cursor: input.runToken,
			indexed_source_count: 0,
			failed_source_count: 0,
			last_error_code: null,
			reconciliation_required: 1,
			updated_at: now
		}).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.scopeKey}
				)`).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = 'incremental_capture'
						AND activation.state = 'active'
				)`).returning(["change_epoch", "started_at"]).executeTakeFirst();
		if (!row?.started_at) return null;
		return {
			changeEpoch: row.change_epoch,
			startedAt: row.started_at
		};
	}
	async finalizeIndexStatusRepairAtEpoch(input) {
		const now = this.sortableUtcTimestamp();
		const updates = {
			status: input.status,
			schema_version: input.schemaVersion,
			completed_at: now,
			cursor: null,
			indexed_source_count: input.indexedSourceCount,
			failed_source_count: input.failedSourceCount,
			last_error_code: input.lastErrorCode,
			reconciliation_required: input.status === "complete" ? 0 : 1,
			updated_at: now
		};
		let query = this.db.updateTable("_emdash_media_usage_index_status").set(updates).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("status", "=", "running").where("cursor", "=", input.runToken).where("change_epoch", "=", input.startingEpoch).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.scopeKey}
				)`);
		if (input.status === "complete") query = query.where(sql`NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = ${input.collectionId}
				)`);
		const result = await query.executeTakeFirst();
		const finalized = Number(result.numUpdatedRows ?? 0) > 0;
		if (!finalized) await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: "stale",
			completed_at: null,
			cursor: null,
			last_error_code: "CONTENT_USAGE_REPAIR_CONFLICT",
			reconciliation_required: 1,
			updated_at: this.sortableUtcTimestamp()
		}).where("adapter_id", "=", input.adapterId).where("scope_type", "=", input.scopeType).where("scope_key", "=", input.scopeKey).where("collection_id", "=", input.collectionId).where("status", "=", "running").where("cursor", "=", input.runToken).execute();
		return {
			finalized,
			status: await this.findIndexStatusForCollection(input, input.collectionId)
		};
	}
	async recordIncrementalSuccess(input) {
		const observed = await this.db.selectFrom("_emdash_media_usage_index_status").select("change_epoch").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		if (!observed) return false;
		const canComplete = sql`(
			reconciliation_required = 0
			AND status IN ('complete', 'stale', 'partial')
			AND NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_work AS work
				WHERE work.collection_id = ${input.collectionId}
			)
		)`;
		const now = this.sortableUtcTimestamp();
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: sql`CASE WHEN ${canComplete} THEN 'complete' ELSE status END`,
			completed_at: sql`CASE WHEN ${canComplete} THEN ${now} ELSE completed_at END`,
			last_error_code: sql`CASE WHEN ${canComplete} THEN NULL ELSE last_error_code END`,
			cursor: sql`CASE WHEN ${canComplete} THEN NULL ELSE cursor END`,
			last_incremental_success_at: now,
			updated_at: now
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("change_epoch", "=", observed.change_epoch).where("capture_state", "=", "active").where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async prepareIncrementalFinalization(input) {
		const observed = await this.db.selectFrom("_emdash_media_usage_index_status").select(["change_epoch", "reconciliation_required"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").executeTakeFirst();
		if (!observed) return { outcome: "lost" };
		if (observed.reconciliation_required !== 0) return { outcome: "not_required" };
		const marker = `incremental-finalize:${String(observed.change_epoch)}:${ulid()}`;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			cursor: marker,
			updated_at: this.sortableUtcTimestamp()
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where("capture_state", "=", "active").where("reconciliation_required", "=", 0).where("change_epoch", "=", observed.change_epoch).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).where(sql`NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = ${input.collectionId}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0 ? {
			outcome: "marked",
			marker
		} : { outcome: "lost" };
	}
	async recoverIncrementalFinalizations() {
		const markerMatchesEpoch = isPostgres(this.db) ? sql`status.cursor LIKE ('incremental-finalize:' || status.change_epoch::text || ':%')` : sql`status.cursor LIKE ('incremental-finalize:' || CAST(status.change_epoch AS text) || ':%')`;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		return (await sql`
			UPDATE _emdash_media_usage_index_status AS status
			SET status = 'complete',
				completed_at = ${now},
				cursor = NULL,
				last_error_code = NULL,
				last_incremental_success_at = ${now},
				updated_at = ${now}
			WHERE status.adapter_id = 'content-media'
				AND status.scope_type = 'collection'
				AND status.capture_state = 'active'
				AND status.reconciliation_required = 0
				AND status.cursor IS NOT NULL
				AND ${markerMatchesEpoch}
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = status.collection_id
						AND collection.slug = status.scope_key
				)
				AND NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = status.collection_id
				)
				AND NOT EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = status.collection_id
				)
			RETURNING collection_id
		`.execute(this.db)).rows.length;
	}
	async recordIncrementalFailure(input) {
		const now = this.sortableUtcTimestamp();
		const automaticRunOwnsCoverage = sql`EXISTS (
			SELECT 1
			FROM _emdash_media_usage_reconciliations AS reconciliation
			WHERE reconciliation.collection_id = ${input.collectionId}
				AND reconciliation.run_token = cursor
		)`;
		const result = await this.db.updateTable("_emdash_media_usage_index_status").set({
			status: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN status
					WHEN reconciliation_required = 0 THEN 'partial'
					WHEN status = 'running' THEN 'stale'
					ELSE status
				END`,
			completed_at: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN completed_at
					WHEN reconciliation_required = 0 OR status = 'running' THEN NULL
					ELSE completed_at
				END`,
			cursor: sql`CASE
					WHEN ${automaticRunOwnsCoverage} THEN cursor
					WHEN status = 'running' THEN NULL
					ELSE cursor
				END`,
			last_error_code: input.errorCode,
			updated_at: now
		}).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", input.collectionSlug).where("collection_id", "=", input.collectionId).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = ${input.collectionId}
						AND work.content_id = ${input.contentId}
						AND work.work_version = ${input.workVersion}
						AND work.state = 'failed'
						AND work.last_error_code = ${input.errorCode}
				)`).where(sql`EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = ${input.collectionId}
						AND collection.slug = ${input.collectionSlug}
				)`).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async recordIncrementalFailuresByCollection(input) {
		const collectionIds = [...new Set(input.collectionIds)];
		if (collectionIds.length === 0) return /* @__PURE__ */ new Set();
		const collections = jsonTextValues(this.db, collectionIds);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const result = await sql`
			WITH failed_collections AS (${collections})
			UPDATE _emdash_media_usage_index_status AS status
			SET status = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.status
					WHEN status.reconciliation_required = 0 THEN 'partial'
					WHEN status.status = 'running' THEN 'stale'
					ELSE status.status
				END,
				completed_at = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.completed_at
					WHEN status.reconciliation_required = 0 OR status.status = 'running' THEN NULL
					ELSE status.completed_at
				END,
				cursor = CASE
					WHEN EXISTS (
						SELECT 1
						FROM _emdash_media_usage_reconciliations AS reconciliation
						WHERE reconciliation.collection_id = status.collection_id
							AND reconciliation.run_token = status.cursor
					) THEN status.cursor
					WHEN status.status = 'running' THEN NULL
					ELSE status.cursor
				END,
				last_error_code = ${input.errorCode},
				updated_at = ${now}
			WHERE status.adapter_id = 'content-media'
				AND status.scope_type = 'collection'
				AND status.collection_id IN (SELECT value FROM failed_collections)
				AND EXISTS (
					SELECT 1
					FROM _emdash_media_usage_work AS work
					WHERE work.collection_id = status.collection_id
						AND work.state = 'failed'
						AND work.last_error_code = ${input.errorCode}
				)
				AND EXISTS (
					SELECT 1
					FROM _emdash_collections AS collection
					WHERE collection.id = status.collection_id
						AND collection.slug = status.scope_key
				)
			RETURNING collection_id
		`.execute(this.db);
		return new Set(result.rows.map((row) => row.collection_id));
	}
	async findIndexStatus(identity) {
		const row = await this.db.selectFrom("_emdash_media_usage_index_status").selectAll().where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).executeTakeFirst();
		return row ? rowToIndexStatus(row) : null;
	}
	async findIndexStatusForCollection(identity, collectionId) {
		const row = await this.db.selectFrom("_emdash_media_usage_index_status").selectAll().where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey).where("collection_id", "=", collectionId).executeTakeFirst();
		return row ? rowToIndexStatus(row) : null;
	}
	async deleteIndexStatus(identity, collectionId) {
		let query = this.db.deleteFrom("_emdash_media_usage_index_status").where("adapter_id", "=", identity.adapterId).where("scope_type", "=", identity.scopeType).where("scope_key", "=", identity.scopeKey);
		if (collectionId !== void 0) query = query.where("collection_id", "=", collectionId);
		const result = await query.executeTakeFirst();
		return Number(result.numDeletedRows ?? 0);
	}
	sortableUtcTimestamp() {
		return isPostgres(this.db) ? sql`to_char(clock_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')` : sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async findCurrentUsagePage(applyFilter, options) {
		const limit = Math.min(Math.max(1, options.limit ?? 50), 100);
		let query = applyFilter(this.currentUsageBaseQuery()).orderBy("u.id", "asc").limit(limit + 1);
		if (options.cursor) {
			const { id } = decodeCursor(options.cursor);
			query = query.where("u.id", ">", id);
		}
		const rows = await query.execute();
		const items = rows.slice(0, limit).map(rowToUsageRecord);
		const result = { items };
		if (rows.length > limit && items.length > 0) {
			const last = items.at(-1);
			result.nextCursor = encodeCursor(last.occurrence.id, last.occurrence.id);
		}
		return result;
	}
	currentUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage_sources as s").innerJoin("_emdash_media_usage as u", (join) => join.onRef("u.source_key", "=", "s.source_key").onRef("u.generation", "=", "s.current_generation")).select(currentUsageSelect);
	}
	currentContentMediaUsageBaseQuery() {
		return this.db.selectFrom("_emdash_media_usage as u").crossJoin("_emdash_media_usage_sources as s").innerJoin("_emdash_collections as collection", "collection.slug", "s.collection_slug").whereRef("s.source_key", "=", "u.source_key").whereRef("s.current_generation", "=", "u.generation").where("s.source_type", "=", "content").where("s.collection_slug", "is not", null).where("s.content_id", "is not", null).where("s.source_variant", "in", ["columns", "draft_overlay"]).where(contentSourceMatchesActiveCollection("s", "collection.id")).where(CONTENT_SOURCE_ELIGIBILITY);
	}
	async deleteOrphanCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markOrphanCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where(sql`NOT EXISTS (SELECT 1 FROM _emdash_media_usage_sources source WHERE source.source_key = _emdash_media_usage.source_key)`).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteStaleCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markStaleCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", "<", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async deleteAbandonedCandidateIds(ids, cutoff, cleanupLease, canIssueStatement) {
		let deleted = 0;
		for (const idBatch of chunks([...ids], cleanupDeleteBatchSize(cleanupLease))) {
			if (!canIssueCleanupStatement(canIssueStatement)) break;
			if (cleanupLease) {
				await this.markAbandonedCandidatesForCleanup(idBatch, cutoff, cleanupLease);
				if (!canIssueCleanupStatement(canIssueStatement)) break;
			}
			let query = this.db.deleteFrom("_emdash_media_usage").where("id", "in", idBatch).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", ">=", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression());
			if (cleanupLease) query = query.where("cleanup_lease_token", "=", cleanupLease.leaseToken).where(this.activeCleanupLeaseExpression(cleanupLease));
			const result = await query.executeTakeFirst();
			deleted += Number(result.numDeletedRows ?? 0);
		}
		return deleted;
	}
	async markOrphanCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where(sql`NOT EXISTS (SELECT 1 FROM _emdash_media_usage_sources source WHERE source.source_key = _emdash_media_usage.source_key)`).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	async markStaleCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", "<", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	async markAbandonedCandidatesForCleanup(ids, cutoff, cleanupLease) {
		await this.db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: cleanupLease.leaseToken }).where("id", "in", ids).where("created_at", "<", cutoff).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").whereRef("source.source_key", "=", "_emdash_media_usage.source_key").whereRef("source.current_generation", "!=", "_emdash_media_usage.generation").whereRef("_emdash_media_usage.created_at", ">=", "source.indexed_at"))).where(this.noActiveGenerationWriteExpression()).where(this.activeCleanupLeaseExpression(cleanupLease)).execute();
	}
	noActiveGenerationWriteExpression(usageTable = "_emdash_media_usage") {
		return sql`NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes AS writer
				WHERE writer.source_key = ${sql.ref(`${usageTable}.source_key`)}
					AND writer.generation = ${sql.ref(`${usageTable}.generation`)}
					AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
			)`;
	}
	/**
	* Gates a bounded cleanup scan on the lease and the tick's statement budget.
	*
	* The budget is re-read after the lease row because that read is itself a
	* statement: an isolate suspended across it can resume with the budget spent.
	*/
	async admitCleanupScan(cleanupLease, canIssueStatement) {
		if (!canIssueCleanupStatement(canIssueStatement)) return false;
		if (!cleanupLease) return true;
		return await this.holdsCleanupLease(cleanupLease) && canIssueCleanupStatement(canIssueStatement);
	}
	/**
	* Reads the lease row on its own so a lost lease can short-circuit a sweep.
	*
	* As a row-level `EXISTS` inside a `LIMIT`ed scan this predicate is constant
	* across every candidate row: when it is false the limit is unreachable and
	* the scan reads the whole `created_at` range before returning nothing.
	* Mutating statements still carry {@link activeCleanupLeaseExpression},
	* which is what actually fences a displaced owner.
	*/
	async holdsCleanupLease(cleanupLease) {
		let query = this.db.selectFrom("_emdash_media_usage_cleanup").select("task_key").where("task_key", "=", "projection_gc").where("lease_token", "=", cleanupLease.leaseToken).where(this.cleanupLeaseExpiryIsInFuture("_emdash_media_usage_cleanup.lease_expires_at"));
		if (isPostgres(this.db)) query = query.forUpdate();
		return await query.executeTakeFirst() !== void 0;
	}
	activeCleanupLeaseExpression(cleanupLease) {
		const rowLock = isPostgres(this.db) ? sql` FOR UPDATE` : sql``;
		return sql`EXISTS (
				SELECT 1
				FROM _emdash_media_usage_cleanup AS cleanup
				WHERE cleanup.task_key = 'projection_gc'
					AND cleanup.lease_token = ${cleanupLease.leaseToken}
					AND ${this.cleanupLeaseExpiryIsInFuture("cleanup.lease_expires_at")}
				${rowLock}
			)`;
	}
	cleanupLeaseExpiryIsInFuture(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	cleanupTimestampIsDue(column) {
		const timestamp = sql.ref(column);
		return isPostgres(this.db) ? sql`${timestamp}::timestamptz <= clock_timestamp()` : sql`${timestamp} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	cleanupTimestampOffset(offsetSeconds) {
		if (isPostgres(this.db)) return sql`to_char(
				(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)`;
		return sql`strftime(
			'%Y-%m-%dT%H:%M:%fZ',
			'now',
			${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
		)`;
	}
	generationWriteLeaseHasExpired(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz <= clock_timestamp()` : sql`${leaseExpiresAt} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async deleteSourceKeys(sourceKeys) {
		const uniqueSourceKeys = [...new Set(sourceKeys)];
		if (uniqueSourceKeys.length === 0) return 0;
		return withTransaction(this.db, async (trx) => {
			await this.lockCleanupBeforeSourceDelete(trx);
			let deleted = 0;
			for (const sourceKeyBatch of chunks(uniqueSourceKeys, 50)) {
				const result = await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "in", sourceKeyBatch).executeTakeFirst();
				deleted += Number(result.numDeletedRows ?? 0);
				await trx.updateTable("_emdash_media_usage").set({ cleanup_lease_token: null }).where("source_key", "in", sourceKeyBatch).execute();
				await trx.deleteFrom("_emdash_media_usage").where("source_key", "in", sourceKeyBatch).execute();
			}
			return deleted;
		});
	}
	async deleteSourceGenerationOccurrences(db, sourceKey, generation) {
		await db.updateTable("_emdash_media_usage").set({ cleanup_lease_token: null }).where("source_key", "=", sourceKey).where("generation", "=", generation).execute();
		await db.deleteFrom("_emdash_media_usage").where("source_key", "=", sourceKey).where("generation", "=", generation).execute();
	}
	async lockCleanupBeforeSourceDelete(db) {
		if (!isPostgres(this.db)) return;
		await sql`
			SELECT 1
			FROM _emdash_media_usage_cleanup
			WHERE task_key = 'projection_gc'
			FOR SHARE
		`.execute(db);
	}
	async insertOccurrences(db, sourceKey, generation, occurrences, now) {
		if (occurrences.length === 0) return;
		const rows = occurrences.map((occurrence) => ({
			id: ulid(),
			source_key: sourceKey,
			generation,
			field_slug: occurrence.fieldSlug,
			field_path: occurrence.fieldPath,
			occurrence_index: occurrence.occurrenceIndex ?? 0,
			reference_type: occurrence.referenceType,
			media_id: occurrence.mediaId,
			provider: occurrence.provider,
			provider_asset_id: occurrence.providerAssetId,
			media_kind: occurrence.mediaKind ?? null,
			mime_type: occurrence.mimeType ?? null,
			created_at: now
		}));
		for (const rowBatch of chunks(rows, OCCURRENCE_INSERT_BATCH_SIZE)) await db.insertInto("_emdash_media_usage").values(rowBatch).execute();
	}
	async insertBatchOccurrences(rows) {
		for (const rowBatch of chunkJsonRows(rows)) await sql`
				WITH input AS (${this.occurrenceBatchInput(JSON.stringify(rowBatch))})
				INSERT INTO _emdash_media_usage (
					id, source_key, generation, field_slug, field_path, occurrence_index,
					reference_type, media_id, provider, provider_asset_id, media_kind,
					mime_type, created_at
				)
				SELECT
					id, source_key, generation, field_slug, field_path, occurrence_index,
					reference_type, media_id, provider, provider_asset_id, media_kind,
					mime_type, created_at
				FROM input
				WHERE EXISTS (
					SELECT 1
					FROM _emdash_media_usage_generation_writes AS writer
					WHERE writer.source_key = input.source_key
						AND writer.generation = input.generation
						AND writer.lease_token = input.lease_token
						AND ${this.generationWriteLeaseExpiryIsInFuture("writer.expires_at")}
				)
			`.execute(this.db);
	}
	occurrenceBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'id' AS id,
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'generation' AS generation,
					entry.value ->> 'field_slug' AS field_slug,
					entry.value ->> 'field_path' AS field_path,
					CAST(entry.value ->> 'occurrence_index' AS integer) AS occurrence_index,
					entry.value ->> 'reference_type' AS reference_type,
					entry.value ->> 'media_id' AS media_id,
					entry.value ->> 'provider' AS provider,
					entry.value ->> 'provider_asset_id' AS provider_asset_id,
					entry.value ->> 'media_kind' AS media_kind,
					entry.value ->> 'mime_type' AS mime_type,
					entry.value ->> 'created_at' AS created_at,
					entry.value ->> 'lease_token' AS lease_token
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.id') AS id,
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.generation') AS generation,
				json_extract(entry.value, '$.field_slug') AS field_slug,
				json_extract(entry.value, '$.field_path') AS field_path,
				CAST(json_extract(entry.value, '$.occurrence_index') AS integer) AS occurrence_index,
				json_extract(entry.value, '$.reference_type') AS reference_type,
				json_extract(entry.value, '$.media_id') AS media_id,
				json_extract(entry.value, '$.provider') AS provider,
				json_extract(entry.value, '$.provider_asset_id') AS provider_asset_id,
				json_extract(entry.value, '$.media_kind') AS media_kind,
				json_extract(entry.value, '$.mime_type') AS mime_type,
				json_extract(entry.value, '$.created_at') AS created_at,
				json_extract(entry.value, '$.lease_token') AS lease_token
			FROM json_each(${payload}) AS entry
		`;
	}
	sourceBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'source_type' AS source_type,
					entry.value ->> 'collection_id' AS collection_id,
					entry.value ->> 'collection_slug' AS collection_slug,
					entry.value ->> 'content_id' AS content_id,
					entry.value ->> 'source_variant' AS source_variant,
					entry.value ->> 'locale' AS locale,
					entry.value ->> 'translation_group' AS translation_group,
					entry.value ->> 'content_slug' AS content_slug,
					entry.value ->> 'content_title' AS content_title,
					entry.value ->> 'content_status' AS content_status,
					entry.value ->> 'content_scheduled_at' AS content_scheduled_at,
					entry.value ->> 'content_deleted_at' AS content_deleted_at,
					entry.value ->> 'revision_id' AS revision_id,
					entry.value ->> 'current_generation' AS current_generation,
					CAST(entry.value ->> 'schema_version' AS integer) AS schema_version,
					entry.value ->> 'source_updated_at' AS source_updated_at,
					CAST(entry.value ->> 'source_version' AS bigint) AS source_version,
					entry.value ->> 'source_fingerprint' AS source_fingerprint,
					CAST(entry.value ->> 'identity_version' AS integer) AS identity_version,
					entry.value ->> 'source_completeness' AS source_completeness,
					entry.value ->> 'last_attempted_at' AS last_attempted_at,
					entry.value ->> 'last_error_code' AS last_error_code,
					entry.value ->> 'indexed_at' AS indexed_at,
					entry.value ->> 'updated_at' AS updated_at,
					entry.value ->> 'lease_token' AS lease_token,
					entry.value ->> 'expected_generation' AS expected_generation,
					entry.value ->> 'expected_collection_id' AS expected_collection_id,
					entry.value ->> 'expected_updated_at' AS expected_updated_at,
					entry.value ->> 'expected_source_fingerprint' AS expected_source_fingerprint,
					entry.value ->> 'expected_source_updated_at' AS expected_source_updated_at,
					CAST(entry.value ->> 'expected_source_version' AS bigint) AS expected_source_version,
					CAST(entry.value ->> 'expected_identity_version' AS integer) AS expected_identity_version,
					entry.value ->> 'expected_revision_id' AS expected_revision_id,
					entry.value ->> 'expected_source_completeness' AS expected_source_completeness,
					entry.value ->> 'expected_last_attempted_at' AS expected_last_attempted_at,
					entry.value ->> 'expected_last_error_code' AS expected_last_error_code
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.source_type') AS source_type,
				json_extract(entry.value, '$.collection_id') AS collection_id,
				json_extract(entry.value, '$.collection_slug') AS collection_slug,
				json_extract(entry.value, '$.content_id') AS content_id,
				json_extract(entry.value, '$.source_variant') AS source_variant,
				json_extract(entry.value, '$.locale') AS locale,
				json_extract(entry.value, '$.translation_group') AS translation_group,
				json_extract(entry.value, '$.content_slug') AS content_slug,
				json_extract(entry.value, '$.content_title') AS content_title,
				json_extract(entry.value, '$.content_status') AS content_status,
				json_extract(entry.value, '$.content_scheduled_at') AS content_scheduled_at,
				json_extract(entry.value, '$.content_deleted_at') AS content_deleted_at,
				json_extract(entry.value, '$.revision_id') AS revision_id,
				json_extract(entry.value, '$.current_generation') AS current_generation,
				CAST(json_extract(entry.value, '$.schema_version') AS integer) AS schema_version,
				json_extract(entry.value, '$.source_updated_at') AS source_updated_at,
				CAST(json_extract(entry.value, '$.source_version') AS integer) AS source_version,
				json_extract(entry.value, '$.source_fingerprint') AS source_fingerprint,
				CAST(json_extract(entry.value, '$.identity_version') AS integer) AS identity_version,
				json_extract(entry.value, '$.source_completeness') AS source_completeness,
				json_extract(entry.value, '$.last_attempted_at') AS last_attempted_at,
				json_extract(entry.value, '$.last_error_code') AS last_error_code,
				json_extract(entry.value, '$.indexed_at') AS indexed_at,
				json_extract(entry.value, '$.updated_at') AS updated_at,
				json_extract(entry.value, '$.lease_token') AS lease_token,
				json_extract(entry.value, '$.expected_generation') AS expected_generation,
				json_extract(entry.value, '$.expected_collection_id') AS expected_collection_id,
				json_extract(entry.value, '$.expected_updated_at') AS expected_updated_at,
				json_extract(entry.value, '$.expected_source_fingerprint') AS expected_source_fingerprint,
				json_extract(entry.value, '$.expected_source_updated_at') AS expected_source_updated_at,
				CAST(json_extract(entry.value, '$.expected_source_version') AS integer) AS expected_source_version,
				CAST(json_extract(entry.value, '$.expected_identity_version') AS integer) AS expected_identity_version,
				json_extract(entry.value, '$.expected_revision_id') AS expected_revision_id,
				json_extract(entry.value, '$.expected_source_completeness') AS expected_source_completeness,
				json_extract(entry.value, '$.expected_last_attempted_at') AS expected_last_attempted_at,
				json_extract(entry.value, '$.expected_last_error_code') AS expected_last_error_code
			FROM json_each(${payload}) AS entry
		`;
	}
	generationWriteBatchInput(payload) {
		if (isPostgres(this.db)) return sql`
				SELECT
					entry.value ->> 'source_key' AS source_key,
					entry.value ->> 'collection_id' AS collection_id,
					entry.value ->> 'collection_slug' AS collection_slug,
					entry.value ->> 'generation' AS generation,
					entry.value ->> 'lease_token' AS lease_token,
					entry.value ->> 'expires_at' AS expires_at,
					entry.value ->> 'created_at' AS created_at
				FROM jsonb_array_elements(${payload}::jsonb) AS entry(value)
			`;
		return sql`
			SELECT
				json_extract(entry.value, '$.source_key') AS source_key,
				json_extract(entry.value, '$.collection_id') AS collection_id,
				json_extract(entry.value, '$.collection_slug') AS collection_slug,
				json_extract(entry.value, '$.generation') AS generation,
				json_extract(entry.value, '$.lease_token') AS lease_token,
				json_extract(entry.value, '$.expires_at') AS expires_at,
				json_extract(entry.value, '$.created_at') AS created_at
			FROM json_each(${payload}) AS entry
		`;
	}
	batchRefsMatch(left, right) {
		const leftRef = sql.ref(left);
		const rightRef = sql.ref(right);
		return isPostgres(this.db) ? sql`${leftRef} IS NOT DISTINCT FROM ${rightRef}` : sql`${leftRef} IS ${rightRef}`;
	}
	async lockCanonicalSourceCollection(db, source) {
		if (source.collectionId === void 0 || source.collectionId === null) return true;
		if (!source.collectionSlug) return false;
		if (!isPostgres(this.db)) return true;
		return await db.selectFrom("_emdash_collections").select("id").where("id", "=", source.collectionId).where("slug", "=", source.collectionSlug).forKeyShare().executeTakeFirst() !== void 0;
	}
	async upsertSource(db, source, generation, now, leaseToken) {
		const row = this.buildSourceRow(source, generation, now);
		return this.persistSourceIfWriteLease(db, row, leaseToken, sql`
				ON CONFLICT (source_key) DO UPDATE SET
					source_type = excluded.source_type,
					collection_id = excluded.collection_id,
					collection_slug = excluded.collection_slug,
					content_id = excluded.content_id,
					source_variant = excluded.source_variant,
					locale = excluded.locale,
					translation_group = excluded.translation_group,
					content_slug = excluded.content_slug,
					content_title = excluded.content_title,
					content_status = excluded.content_status,
					content_scheduled_at = excluded.content_scheduled_at,
					content_deleted_at = excluded.content_deleted_at,
					revision_id = excluded.revision_id,
					current_generation = excluded.current_generation,
					schema_version = excluded.schema_version,
					source_updated_at = excluded.source_updated_at,
					source_version = excluded.source_version,
					source_fingerprint = excluded.source_fingerprint,
					identity_version = excluded.identity_version,
					source_completeness = excluded.source_completeness,
					last_attempted_at = excluded.last_attempted_at,
					last_error_code = excluded.last_error_code,
					indexed_at = excluded.indexed_at,
					updated_at = excluded.updated_at
			`);
	}
	async insertSourceIfAbsent(db, row, leaseToken) {
		return this.persistSourceIfWriteLease(db, row, leaseToken, sql`ON CONFLICT (source_key) DO NOTHING`);
	}
	async persistSourceIfWriteLease(db, row, leaseToken, conflict) {
		const result = await sql`
			INSERT INTO _emdash_media_usage_sources (
				source_key,
				source_type,
				collection_id,
				collection_slug,
				content_id,
				source_variant,
				locale,
				translation_group,
				content_slug,
				content_title,
				content_status,
				content_scheduled_at,
				content_deleted_at,
				revision_id,
				current_generation,
				schema_version,
				source_updated_at,
				source_version,
				source_fingerprint,
				identity_version,
				source_completeness,
				last_attempted_at,
				last_error_code,
				indexed_at,
				updated_at
			)
			SELECT
				${row.source_key},
				${row.source_type},
				${row.collection_id},
				${row.collection_slug},
				${row.content_id},
				${row.source_variant},
				${row.locale},
				${row.translation_group},
				${row.content_slug},
				${row.content_title},
				${row.content_status},
				${row.content_scheduled_at},
				${row.content_deleted_at},
				${row.revision_id},
				${row.current_generation},
				${row.schema_version},
				${row.source_updated_at},
				${row.source_version},
				${row.source_fingerprint},
				${row.identity_version},
				${row.source_completeness},
				${row.last_attempted_at},
				${row.last_error_code},
				${row.indexed_at},
				${row.updated_at}
			WHERE EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes
				WHERE source_key = ${row.source_key}
					AND generation = ${row.current_generation}
					AND lease_token = ${leaseToken}
					AND ${this.generationWriteLeaseExpiryIsInFuture("expires_at")}
			)
			AND ${this.currentCollectionExists(row.collection_id, row.collection_slug)}
			AND ${this.currentCanonicalContentExists(row)}
			${conflict}
		`.execute(db);
		return Number(result.numAffectedRows ?? 0) > 0;
	}
	generationWriteLeaseExpression(row, leaseToken) {
		return (eb) => eb.exists(eb.selectFrom("_emdash_media_usage_generation_writes").select("source_key").where("source_key", "=", row.source_key).where("generation", "=", row.current_generation).where("lease_token", "=", leaseToken).where(this.generationWriteLeaseExpiryIsInFuture("_emdash_media_usage_generation_writes.expires_at")));
	}
	generationWriteLeaseExpiryIsInFuture(column) {
		const leaseExpiresAt = sql.ref(column);
		return isPostgres(this.db) ? sql`${leaseExpiresAt}::timestamptz > clock_timestamp()` : sql`${leaseExpiresAt} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
	}
	async withGenerationWriteLease(source, generation, write) {
		const leaseToken = ulid();
		const owner = (await sql`
			INSERT INTO _emdash_media_usage_generation_writes (
				source_key, generation, lease_token, expires_at, created_at
			)
			SELECT
				${source.sourceKey},
				${generation},
				${leaseToken},
				${this.generationWriteLeaseTimestampOffset(MEDIA_USAGE_GENERATION_WRITE_LEASE_MS / 1e3)},
				${this.generationWriteLeaseTimestampOffset(0)}
			WHERE ${this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)}
			RETURNING created_at
		`.execute(this.db)).rows[0];
		if (!owner) return false;
		try {
			await write(leaseToken, owner.created_at);
			return true;
		} finally {
			try {
				await this.db.deleteFrom("_emdash_media_usage_generation_writes").where("source_key", "=", source.sourceKey).where("generation", "=", generation).where("lease_token", "=", leaseToken).execute();
			} catch (error) {
				console.error("[media-usage] Failed to release generation write lease:", error);
			}
		}
	}
	generationWriteLeaseTimestampOffset(offsetSeconds) {
		if (isPostgres(this.db)) return sql`to_char(
				(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
				'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
			)`;
		return sql`strftime(
			'%Y-%m-%dT%H:%M:%fZ',
			'now',
			${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
		)`;
	}
	async updateSourceIfGeneration(db, row, expectedCurrentGeneration, leaseToken) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where("current_generation", "=", expectedCurrentGeneration).where(this.generationWriteLeaseExpression(row, leaseToken)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateSourceIfMatching(db, row, expectedSource, leaseToken) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.sourceUpdateSet(row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).where(this.generationWriteLeaseExpression(row, leaseToken)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	async updateAttemptedSourceIfMatching(db, source, row, expectedSource) {
		const result = await db.updateTable("_emdash_media_usage_sources").set(this.attemptedSourceUpdateSet(source, row)).where("source_key", "=", row.source_key).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(row.collection_id, row.collection_slug)).where(this.currentCanonicalContentExists(row)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) > 0;
	}
	sourceMatchExpression(expectedSource) {
		return (eb) => eb.and([
			eb("current_generation", "=", expectedSource.currentGeneration),
			eb("source_completeness", "=", expectedSource.sourceCompleteness),
			this.nullableStringExpression(eb, "collection_id", expectedSource.collectionId),
			this.nullableStringExpression(eb, "updated_at", expectedSource.updatedAt),
			this.nullableStringExpression(eb, "source_fingerprint", expectedSource.sourceFingerprint),
			this.nullableStringExpression(eb, "source_updated_at", expectedSource.sourceUpdatedAt),
			this.nullableNumberExpression(eb, "source_version", expectedSource.sourceVersion),
			this.nullableNumberExpression(eb, "identity_version", expectedSource.identityVersion),
			this.nullableStringExpression(eb, "revision_id", expectedSource.revisionId),
			this.nullableStringExpression(eb, "last_attempted_at", expectedSource.lastAttemptedAt),
			this.nullableStringExpression(eb, "last_error_code", expectedSource.lastErrorCode)
		]);
	}
	async projectionMatchesCurrentGeneration(source, expectedCurrentGeneration) {
		const fingerprint = source.sourceFingerprint;
		if (!isMediaUsageProjectionFingerprint(fingerprint)) return false;
		return await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_key", "=", source.sourceKey).where("current_generation", "=", expectedCurrentGeneration).where("source_fingerprint", "=", fingerprint).where("source_completeness", "=", source.sourceCompleteness ?? "complete").where("last_error_code", "is", null).where(this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)).executeTakeFirst() !== void 0;
	}
	async projectionMatchesExpectedSource(source, expectedSource) {
		const fingerprint = source.sourceFingerprint;
		if (!isMediaUsageProjectionFingerprint(fingerprint) || expectedSource.sourceFingerprint !== fingerprint || expectedSource.sourceCompleteness !== (source.sourceCompleteness ?? "complete") || expectedSource.lastErrorCode !== null) return false;
		return await this.db.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_key", "=", source.sourceKey).where(this.sourceMatchExpression(expectedSource)).where(this.currentCollectionExists(source.collectionId ?? null, source.collectionSlug ?? null)).executeTakeFirst() !== void 0;
	}
	nullableStringExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	currentCollectionExists(collectionId, collectionSlug) {
		if (collectionId === null) return sql`1 = 1`;
		return sql`EXISTS (
			SELECT 1
			FROM _emdash_collections
			WHERE id = ${collectionId}
				AND slug = ${collectionSlug}
		)`;
	}
	currentCanonicalContentExists(row) {
		if (row.collection_id === null || row.identity_version !== 1 || row.source_type !== "content") return sql`1 = 1`;
		if (!row.collection_slug || !row.content_id || row.source_version === null || row.source_updated_at === null) return sql`1 = 0`;
		validateIdentifier(row.collection_slug, "collection slug");
		const tableName = `ec_${row.collection_slug}`;
		validateIdentifier(tableName, "content table");
		const revisionColumn = row.source_variant === "columns" ? "live_revision_id" : row.source_variant === "draft_overlay" ? "draft_revision_id" : null;
		if (!revisionColumn) return sql`1 = 0`;
		const revision = sql.ref(`content.${revisionColumn}`);
		const revisionMatches = row.revision_id === null ? sql`${revision} IS NULL` : sql`${revision} = ${row.revision_id}`;
		return sql`EXISTS (
			SELECT 1
			FROM ${sql.ref(tableName)} AS content
			WHERE content.id = ${row.content_id}
				AND content.version = ${row.source_version}
				AND content.updated_at = ${row.source_updated_at}
				AND ${revisionMatches}
		)`;
	}
	nullableNumberExpression(eb, column, value) {
		return value === null ? eb(column, "is", null) : eb(column, "=", value);
	}
	async contentRowExists(tableName, contentId) {
		return (await sql`
			SELECT id
			FROM ${sql.ref(tableName)}
			WHERE id = ${contentId}
			LIMIT 1
		`.execute(this.db)).rows.length > 0;
	}
	buildSourceRow(source, generation, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_id: source.collectionId ?? null,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: generation,
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			identity_version: source.identityVersion ?? null,
			source_completeness: source.sourceCompleteness ?? "complete",
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: null,
			indexed_at: now,
			updated_at: now
		};
	}
	buildAttemptedSourceRow(source, generation, now) {
		return {
			source_key: source.sourceKey,
			source_type: source.sourceType,
			collection_id: source.collectionId ?? null,
			collection_slug: source.collectionSlug ?? null,
			content_id: source.contentId ?? null,
			source_variant: source.sourceVariant,
			locale: source.locale ?? null,
			translation_group: source.translationGroup ?? null,
			content_slug: source.contentSlug ?? null,
			content_title: source.contentTitle ?? null,
			content_status: source.contentStatus ?? null,
			content_scheduled_at: source.contentScheduledAt ?? null,
			content_deleted_at: source.contentDeletedAt ?? null,
			revision_id: source.revisionId ?? null,
			current_generation: generation,
			schema_version: source.schemaVersion ?? 1,
			source_updated_at: source.sourceUpdatedAt ?? null,
			source_version: source.sourceVersion ?? null,
			source_fingerprint: source.sourceFingerprint ?? null,
			identity_version: source.identityVersion ?? null,
			source_completeness: source.sourceCompleteness ?? (source.lastErrorCode ? "failed" : "unknown"),
			last_attempted_at: source.lastAttemptedAt ?? now,
			last_error_code: source.lastErrorCode ?? null,
			indexed_at: now,
			updated_at: now
		};
	}
	attemptedSourceUpdateSet(source, row) {
		const updates = {
			source_type: row.source_type,
			source_variant: row.source_variant,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			updated_at: row.updated_at
		};
		if (source.collectionSlug !== void 0) updates.collection_slug = row.collection_slug;
		if (source.collectionId !== void 0) updates.collection_id = row.collection_id;
		if (source.contentId !== void 0) updates.content_id = row.content_id;
		if (source.locale !== void 0) updates.locale = row.locale;
		if (source.translationGroup !== void 0) updates.translation_group = row.translation_group;
		if (source.contentSlug !== void 0) updates.content_slug = row.content_slug;
		if (source.contentTitle !== void 0) updates.content_title = row.content_title;
		if (source.contentStatus !== void 0) updates.content_status = row.content_status;
		if (source.contentScheduledAt !== void 0) updates.content_scheduled_at = row.content_scheduled_at;
		if (source.contentDeletedAt !== void 0) updates.content_deleted_at = row.content_deleted_at;
		if (source.revisionId !== void 0) updates.revision_id = row.revision_id;
		if (source.schemaVersion !== void 0) updates.schema_version = row.schema_version;
		if (source.sourceUpdatedAt !== void 0) updates.source_updated_at = row.source_updated_at;
		if (source.sourceVersion !== void 0) updates.source_version = row.source_version;
		if (source.sourceFingerprint !== void 0) updates.source_fingerprint = row.source_fingerprint;
		if (source.identityVersion !== void 0) updates.identity_version = row.identity_version;
		return updates;
	}
	sourceUpdateSet(row) {
		return {
			source_type: row.source_type,
			collection_id: row.collection_id,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			identity_version: row.identity_version,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			updated_at: row.updated_at
		};
	}
};
var currentUsageSelect = [
	"s.source_key as source_key",
	"s.source_type as source_type",
	"s.collection_id as collection_id",
	"s.collection_slug as collection_slug",
	"s.content_id as content_id",
	"s.source_variant as source_variant",
	"s.locale as locale",
	"s.translation_group as translation_group",
	"s.content_slug as content_slug",
	"s.content_title as content_title",
	"s.content_status as content_status",
	"s.content_scheduled_at as content_scheduled_at",
	"s.content_deleted_at as content_deleted_at",
	"s.revision_id as revision_id",
	"s.current_generation as current_generation",
	"s.schema_version as schema_version",
	"s.source_updated_at as source_updated_at",
	"s.source_version as source_version",
	"s.source_fingerprint as source_fingerprint",
	"s.identity_version as identity_version",
	"s.source_completeness as source_completeness",
	"s.last_attempted_at as last_attempted_at",
	"s.last_error_code as last_error_code",
	"s.indexed_at as indexed_at",
	"s.created_at as source_created_at",
	"s.updated_at as source_row_updated_at",
	"u.id as occurrence_id",
	"u.generation as generation",
	"u.field_slug as field_slug",
	"u.field_path as field_path",
	"u.occurrence_index as occurrence_index",
	"u.reference_type as reference_type",
	"u.media_id as media_id",
	"u.provider as provider",
	"u.provider_asset_id as provider_asset_id",
	"u.media_kind as media_kind",
	"u.mime_type as mime_type",
	"u.created_at as occurrence_created_at"
];
function groupUsageRows(rows) {
	const groups = [];
	for (const row of rows) {
		if (row.collection_slug === null || row.content_id === null) continue;
		const record = rowToUsageRecord(row);
		let group = groups.at(-1);
		if (!group || group.collectionSlug !== row.collection_slug || group.contentId !== row.content_id) {
			group = {
				collectionSlug: row.collection_slug,
				contentId: row.content_id,
				contentDeletedAt: row.entry_deleted_at,
				sources: []
			};
			groups.push(group);
		}
		let source = group.sources.at(-1);
		if (!source || source.source.sourceKey !== record.source.sourceKey) {
			source = {
				source: record.source,
				occurrences: []
			};
			group.sources.push(source);
		}
		source.occurrences.push(record.occurrence);
	}
	return groups;
}
function rowToSource(row) {
	return {
		sourceKey: row.source_key,
		sourceType: row.source_type,
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		contentId: row.content_id,
		sourceVariant: row.source_variant,
		locale: row.locale,
		translationGroup: row.translation_group,
		contentSlug: row.content_slug,
		contentTitle: row.content_title,
		contentStatus: row.content_status,
		contentScheduledAt: row.content_scheduled_at,
		contentDeletedAt: row.content_deleted_at,
		revisionId: row.revision_id,
		currentGeneration: row.current_generation,
		schemaVersion: Number(row.schema_version),
		sourceUpdatedAt: row.source_updated_at,
		sourceVersion: row.source_version === null ? null : Number(row.source_version),
		sourceFingerprint: row.source_fingerprint,
		identityVersion: row.identity_version === null ? null : Number(row.identity_version),
		sourceCompleteness: row.source_completeness,
		lastAttemptedAt: row.last_attempted_at,
		lastErrorCode: row.last_error_code,
		indexedAt: row.indexed_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function rowToOccurrence(row) {
	return {
		id: row.id,
		sourceKey: row.source_key,
		generation: row.generation,
		fieldSlug: row.field_slug,
		fieldPath: row.field_path,
		occurrenceIndex: Number(row.occurrence_index),
		referenceType: row.reference_type,
		mediaId: row.media_id,
		provider: row.provider,
		providerAssetId: row.provider_asset_id,
		mediaKind: row.media_kind,
		mimeType: row.mime_type,
		createdAt: row.created_at
	};
}
function rowToUsageRecord(row) {
	return {
		source: rowToSource({
			source_key: row.source_key,
			source_type: row.source_type,
			collection_id: row.collection_id,
			collection_slug: row.collection_slug,
			content_id: row.content_id,
			source_variant: row.source_variant,
			locale: row.locale,
			translation_group: row.translation_group,
			content_slug: row.content_slug,
			content_title: row.content_title,
			content_status: row.content_status,
			content_scheduled_at: row.content_scheduled_at,
			content_deleted_at: row.content_deleted_at,
			revision_id: row.revision_id,
			current_generation: row.current_generation,
			schema_version: row.schema_version,
			source_updated_at: row.source_updated_at,
			source_version: row.source_version,
			source_fingerprint: row.source_fingerprint,
			identity_version: row.identity_version,
			source_completeness: row.source_completeness,
			last_attempted_at: row.last_attempted_at,
			last_error_code: row.last_error_code,
			indexed_at: row.indexed_at,
			created_at: row.source_created_at,
			updated_at: row.source_row_updated_at
		}),
		occurrence: rowToOccurrence({
			id: row.occurrence_id,
			source_key: row.source_key,
			generation: row.generation,
			field_slug: row.field_slug,
			field_path: row.field_path,
			occurrence_index: row.occurrence_index,
			reference_type: row.reference_type,
			media_id: row.media_id,
			provider: row.provider,
			provider_asset_id: row.provider_asset_id,
			media_kind: row.media_kind,
			mime_type: row.mime_type,
			created_at: row.occurrence_created_at,
			cleanup_lease_token: null
		})
	};
}
function rowToIndexStatus(row) {
	return {
		adapterId: row.adapter_id,
		scopeType: row.scope_type,
		scopeKey: row.scope_key,
		status: row.status,
		schemaVersion: Number(row.schema_version),
		startedAt: row.started_at,
		completedAt: row.completed_at,
		cursor: row.cursor,
		indexedSourceCount: Number(row.indexed_source_count),
		failedSourceCount: Number(row.failed_source_count),
		lastErrorCode: row.last_error_code,
		updatedAt: row.updated_at
	};
}
var CONTENT_MEDIA_USAGE_ADAPTER_ID = "content-media";
var CONTENT_MEDIA_USAGE_COLLECTION_SCOPE = "collection";
async function markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode) {
	validateIdentifier(collectionSlug, "collection slug");
	const repo = new MediaUsageRepository(db);
	const identity = {
		adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
		scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
		scopeKey: collectionSlug
	};
	const existing = await repo.findIndexStatus(identity);
	await repo.upsertIndexStatus({
		...identity,
		status: "stale",
		schemaVersion: existing?.schemaVersion ?? 2,
		startedAt: existing?.startedAt ?? null,
		completedAt: existing?.completedAt ?? null,
		cursor: existing?.cursor ?? null,
		indexedSourceCount: existing?.indexedSourceCount ?? 0,
		failedSourceCount: existing?.failedSourceCount ?? 0,
		lastErrorCode
	});
}
async function invalidateContentMediaUsageSchemaChange(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	if (!await tableExists(db, "_emdash_media_usage_activation")) return false;
	if ((await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state !== "active") return false;
	if (!await new MediaUsageRepository(db).invalidateIndexStatusForSchemaChange(collectionSlug)) throw new Error(`Cannot invalidate media usage coverage for collection ${collectionSlug}`);
	return true;
}
async function markContentMediaUsageCollectionStaleSafely(db, collectionSlug, lastErrorCode) {
	try {
		await markContentMediaUsageCollectionStale(db, collectionSlug, lastErrorCode);
		return true;
	} catch (error) {
		console.error(`[media-usage] Failed to mark ${collectionSlug} stale:`, error);
		return false;
	}
}
var BLOCK_FIELD_TYPES = [
	"string",
	"text",
	"url",
	"number",
	"integer",
	"boolean",
	"datetime",
	"select",
	"multiSelect",
	"portableText",
	"image",
	"file",
	"repeater"
];
var SLUG_PATTERN$1 = /^[a-z][a-z0-9_]*$/;
var MIME_PATTERN = /^[a-z0-9][a-z0-9!#$&^_+\-.]*\/[a-z0-9!#$&^_+\-.]*$/i;
var MAX_SLUG_LENGTH$1 = 63;
var MAX_LABEL_LENGTH$1 = 200;
var RESERVED_VALUE_KEYS = /* @__PURE__ */ new Set([
	"_type",
	"_version",
	"_key"
]);
var BLOCK_FIELD_TYPE_SET$1 = new Set(BLOCK_FIELD_TYPES);
var REPEATER_TYPE_SET = new Set(REPEATER_SUB_FIELD_TYPES);
var VALIDATION_KEYS = {
	string: /* @__PURE__ */ new Set([
		"minLength",
		"maxLength",
		"pattern"
	]),
	text: /* @__PURE__ */ new Set([
		"minLength",
		"maxLength",
		"pattern"
	]),
	url: /* @__PURE__ */ new Set([
		"minLength",
		"maxLength",
		"pattern"
	]),
	number: /* @__PURE__ */ new Set(["min", "max"]),
	integer: /* @__PURE__ */ new Set(["min", "max"]),
	boolean: /* @__PURE__ */ new Set(),
	datetime: /* @__PURE__ */ new Set(),
	select: /* @__PURE__ */ new Set(["options"]),
	multiSelect: /* @__PURE__ */ new Set(["options"]),
	portableText: /* @__PURE__ */ new Set(),
	image: /* @__PURE__ */ new Set(["allowedMimeTypes"]),
	file: /* @__PURE__ */ new Set(["allowedMimeTypes"]),
	repeater: /* @__PURE__ */ new Set([
		"subFields",
		"minItems",
		"maxItems"
	])
};
function fail(path, message) {
	throw new SchemaError(`${path}: ${message}`, "VALIDATION_ERROR", { path });
}
function assertSlug(slug, path) {
	if (typeof slug !== "string" || slug.length === 0 || slug.length > MAX_SLUG_LENGTH$1 || !SLUG_PATTERN$1.test(slug)) fail(path, "must start with a letter and contain only lowercase letters, numbers, and underscores");
}
function assertLabel$1(label, path) {
	if (typeof label !== "string" || label.trim().length === 0 || label.length > MAX_LABEL_LENGTH$1) fail(path, `must contain between 1 and ${MAX_LABEL_LENGTH$1} characters`);
}
function isJsonValue(value, seen = /* @__PURE__ */ new Set()) {
	if (value === null || typeof value === "string" || typeof value === "boolean") return true;
	if (typeof value === "number") return Number.isFinite(value);
	if (typeof value !== "object") return false;
	if (seen.has(value)) return false;
	seen.add(value);
	if (Array.isArray(value)) {
		const valid = value.every((entry) => isJsonValue(entry, seen));
		seen.delete(value);
		return valid;
	}
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== Object.prototype && prototype !== null) {
		seen.delete(value);
		return false;
	}
	const valid = Object.values(value).every((entry) => isJsonValue(entry, seen));
	seen.delete(value);
	return valid;
}
function validateOptions(values, path) {
	if (!Array.isArray(values) || values.length === 0) fail(path, "must be a non-empty array");
	if (values.some((value) => typeof value !== "string" || value.length === 0)) fail(path, "must contain non-empty strings");
	if (new Set(values).size !== values.length) fail(path, "must not contain duplicates");
}
function validateRepeaterSubFields(value, path) {
	if (!Array.isArray(value) || value.length === 0) fail(path, "must be a non-empty array");
	const slugs = /* @__PURE__ */ new Set();
	for (const [index, subField] of value.entries()) {
		const fieldPath = `${path}[${index}]`;
		if (!subField || typeof subField !== "object" || Array.isArray(subField)) fail(fieldPath, "must be an object");
		const slug = "slug" in subField ? subField.slug : void 0;
		assertSlug(slug, `${fieldPath}.slug`);
		if (RESERVED_VALUE_KEYS.has(slug)) fail(`${fieldPath}.slug`, `"${slug}" is reserved`);
		if (slugs.has(slug)) fail(`${fieldPath}.slug`, `duplicate slug "${slug}"`);
		slugs.add(slug);
		assertLabel$1("label" in subField ? subField.label : void 0, `${fieldPath}.label`);
		const type = "type" in subField ? subField.type : void 0;
		if (typeof type !== "string" || !REPEATER_TYPE_SET.has(type)) fail(`${fieldPath}.type`, `unsupported repeater field type "${String(type)}"`);
		const options = "options" in subField ? subField.options : void 0;
		if (type === "select") validateOptions(options, `${fieldPath}.options`);
		else if (options !== void 0) fail(`${fieldPath}.options`, `is not supported for type "${type}"`);
		const required = "required" in subField ? subField.required : void 0;
		if (required !== void 0 && typeof required !== "boolean") fail(`${fieldPath}.required`, "must be a boolean");
	}
}
function validateValidation(field, path) {
	const validation = field.validation;
	if (validation === void 0) {
		if (field.type === "select" || field.type === "multiSelect") fail(`${path}.validation.options`, `is required for type "${field.type}"`);
		if (field.type === "repeater") fail(`${path}.validation.subFields`, "is required");
		return;
	}
	if (!validation || typeof validation !== "object" || Array.isArray(validation)) fail(`${path}.validation`, "must be an object");
	for (const key of Object.keys(validation)) if (!VALIDATION_KEYS[field.type].has(key)) fail(`${path}.validation.${key}`, `is not supported for type "${field.type}"`);
	for (const [minimum, maximum] of [
		["min", "max"],
		["minLength", "maxLength"],
		["minItems", "maxItems"]
	]) {
		const minimumValue = validation[minimum];
		const maximumValue = validation[maximum];
		if (minimumValue !== void 0 && (typeof minimumValue !== "number" || !Number.isFinite(minimumValue))) fail(`${path}.validation.${minimum}`, "must be a finite number");
		if (maximumValue !== void 0 && (typeof maximumValue !== "number" || !Number.isFinite(maximumValue))) fail(`${path}.validation.${maximum}`, "must be a finite number");
		if (typeof minimumValue === "number" && typeof maximumValue === "number" && minimumValue > maximumValue) fail(`${path}.validation.${maximum}`, `must be greater than or equal to ${minimum}`);
	}
	for (const key of [
		"minLength",
		"maxLength",
		"minItems",
		"maxItems"
	]) {
		const value = validation[key];
		if (value !== void 0 && (!Number.isInteger(value) || value < 0)) fail(`${path}.validation.${key}`, "must be a non-negative integer");
	}
	if (validation.pattern !== void 0) {
		if (typeof validation.pattern !== "string") fail(`${path}.validation.pattern`, "must be a string");
		try {
			RegExp(validation.pattern);
		} catch {
			fail(`${path}.validation.pattern`, "must be a valid regular expression");
		}
	}
	if (field.type === "select" || field.type === "multiSelect") validateOptions(validation.options, `${path}.validation.options`);
	if (field.type === "repeater") validateRepeaterSubFields(validation.subFields, `${path}.validation.subFields`);
	if (validation.allowedMimeTypes !== void 0) {
		validateOptions(validation.allowedMimeTypes, `${path}.validation.allowedMimeTypes`);
		for (const mime of validation.allowedMimeTypes) if (!MIME_PATTERN.test(mime)) fail(`${path}.validation.allowedMimeTypes`, `invalid MIME type "${mime}"`);
	}
}
function validateBlockFields(fields) {
	if (!Array.isArray(fields)) fail("fields", "must be an array");
	const slugs = /* @__PURE__ */ new Set();
	return fields.map((field, index) => {
		const path = `fields[${index}]`;
		if (!field || typeof field !== "object" || Array.isArray(field)) fail(path, "must be an object");
		assertSlug(field.slug, `${path}.slug`);
		if (RESERVED_VALUE_KEYS.has(field.slug)) fail(`${path}.slug`, `"${field.slug}" is reserved`);
		if (slugs.has(field.slug)) fail(`${path}.slug`, `duplicate slug "${field.slug}"`);
		slugs.add(field.slug);
		assertLabel$1(field.label, `${path}.label`);
		if (typeof field.type !== "string" || !BLOCK_FIELD_TYPE_SET$1.has(field.type)) fail(`${path}.type`, `unsupported block field type "${String(field.type)}"`);
		if (field.required !== void 0 && typeof field.required !== "boolean") fail(`${path}.required`, "must be a boolean");
		if (field.defaultValue !== void 0 && !isJsonValue(field.defaultValue)) fail(`${path}.defaultValue`, "must be a JSON value");
		if (field.options !== void 0) {
			if (field.type !== "image") fail(`${path}.options`, `is not supported for type "${field.type}"`);
			for (const key of Object.keys(field.options)) if (key !== "darkVariant") fail(`${path}.options.${key}`, "is not a supported option");
			if (field.options.darkVariant !== void 0 && typeof field.options.darkVariant !== "boolean") fail(`${path}.options.darkVariant`, "must be a boolean");
		}
		validateValidation(field, path);
		return field;
	});
}
function canonicalize(value) {
	if (Array.isArray(value)) return value.map(canonicalize);
	if (!value || typeof value !== "object") return value;
	const result = {};
	for (const [key, entry] of Object.entries(value).toSorted(([left], [right]) => left.localeCompare(right))) if (entry !== void 0) result[key] = canonicalize(entry);
	return result;
}
function contractFields(fields) {
	return fields.map((field) => ({
		slug: field.slug,
		type: field.type,
		required: field.required ?? false,
		...field.defaultValue !== void 0 ? { defaultValue: field.defaultValue } : {},
		...field.validation !== void 0 ? { validation: field.validation } : {},
		...field.options !== void 0 ? { options: field.options } : {}
	}));
}
function canonicalBlockFields(fields) {
	return JSON.stringify(canonicalize(contractFields(fields)));
}
async function fingerprintBlockFields(fields) {
	const bytes = new TextEncoder().encode(canonicalBlockFields(fields));
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return `block-type:v1:sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
function equal(a, b) {
	return JSON.stringify(canonicalize(a)) === JSON.stringify(canonicalize(b));
}
function difference(differences, path, change, compatibility) {
	differences.push({
		path,
		change,
		compatibility
	});
}
function compareLowerBound(differences, path, key, before, after) {
	if (before === after) return;
	const compatible = after === void 0 || before !== void 0 && after <= before;
	difference(differences, `${path}.validation.${key}`, "changed", compatible ? "compatible" : "breaking");
}
function compareUpperBound(differences, path, key, before, after) {
	if (before === after) return;
	const compatible = after === void 0 || before !== void 0 && after >= before;
	difference(differences, `${path}.validation.${key}`, "changed", compatible ? "compatible" : "breaking");
}
function compareSet(differences, path, before, after) {
	if (equal(before, after)) return;
	if (after === void 0) {
		difference(differences, path, "constraint removed", "compatible");
		return;
	}
	if (before === void 0) {
		difference(differences, path, "constraint added", "breaking");
		return;
	}
	const afterSet = new Set(after);
	difference(differences, path, "allowed values changed", before.some((value) => !afterSet.has(value)) ? "breaking" : "compatible");
}
function repeaterFields(fields) {
	return (fields ?? []).map((field) => ({
		slug: field.slug,
		label: field.label,
		type: field.type,
		required: field.required,
		...field.options ? { validation: { options: field.options } } : {}
	}));
}
function compareValidation(differences, path, before, after) {
	const beforeValidation = before.validation;
	const afterValidation = after.validation;
	compareLowerBound(differences, path, "min", beforeValidation?.min, afterValidation?.min);
	compareUpperBound(differences, path, "max", beforeValidation?.max, afterValidation?.max);
	compareLowerBound(differences, path, "minLength", beforeValidation?.minLength, afterValidation?.minLength);
	compareUpperBound(differences, path, "maxLength", beforeValidation?.maxLength, afterValidation?.maxLength);
	compareLowerBound(differences, path, "minItems", beforeValidation?.minItems, afterValidation?.minItems);
	compareUpperBound(differences, path, "maxItems", beforeValidation?.maxItems, afterValidation?.maxItems);
	if (beforeValidation?.pattern !== afterValidation?.pattern) {
		const compatible = afterValidation?.pattern === void 0;
		difference(differences, `${path}.validation.pattern`, "changed", compatible ? "compatible" : "breaking");
	}
	compareSet(differences, `${path}.validation.options`, beforeValidation?.options, afterValidation?.options);
	compareSet(differences, `${path}.validation.allowedMimeTypes`, beforeValidation?.allowedMimeTypes, afterValidation?.allowedMimeTypes);
	if (before.type === "repeater" && after.type === "repeater") compareFields(differences, `${path}.validation.subFields`, repeaterFields(beforeValidation?.subFields), repeaterFields(afterValidation?.subFields));
}
function compareFields(differences, path, before, after) {
	const beforeBySlug = new Map(before.map((field) => [field.slug, field]));
	const afterBySlug = new Map(after.map((field) => [field.slug, field]));
	for (const field of before) if (!afterBySlug.has(field.slug)) difference(differences, `${path}.${field.slug}`, "field removed", "breaking");
	for (const field of after) {
		const previous = beforeBySlug.get(field.slug);
		const fieldPath = `${path}.${field.slug}`;
		if (!previous) {
			difference(differences, fieldPath, "field added", field.required ? "breaking" : "compatible");
			continue;
		}
		if (previous.type !== field.type) {
			difference(differences, `${fieldPath}.type`, "type changed", "breaking");
			continue;
		}
		if ((previous.required ?? false) !== (field.required ?? false)) difference(differences, `${fieldPath}.required`, "required changed", field.required ? "breaking" : "compatible");
		if (!equal(previous.defaultValue, field.defaultValue)) difference(differences, `${fieldPath}.defaultValue`, "default changed", "compatible");
		compareValidation(differences, fieldPath, previous, field);
		if ((previous.options?.darkVariant ?? false) !== (field.options?.darkVariant ?? false)) difference(differences, `${fieldPath}.options.darkVariant`, "dark variant changed", field.options?.darkVariant ? "compatible" : "breaking");
	}
}
function compareBlockFields(before, after) {
	const differences = [];
	compareFields(differences, "fields", before, after);
	return {
		compatible: differences.every((entry) => entry.compatibility === "compatible"),
		differences
	};
}
var SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
var MAX_SLUG_LENGTH = 63;
var MAX_LABEL_LENGTH = 200;
var UNIQUE_VIOLATION = /unique constraint failed|duplicate key value violates unique constraint/i;
var BLOCK_FIELD_TYPE_SET = new Set(BLOCK_FIELD_TYPES);
var REPEATER_SUB_FIELD_TYPE_SET$1 = new Set(REPEATER_SUB_FIELD_TYPES);
var RESERVED_BLOCK_TYPE_SLUGS = new Set(RESERVED_FIELD_SLUGS);
function isRecord$4(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function executeAtomicStatements(db, statements) {
	const batched = await executeAtomicBatchIfSupported(db, statements);
	if (batched) return batched.map((result) => result.rows.length);
	return withTransaction(db, async (trx) => {
		const counts = [];
		for (const statement of statements) counts.push((await statement.execute(trx)).rows.length);
		return counts;
	});
}
function assertBlockTypeSlug(slug) {
	if (slug.length === 0 || slug.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(slug)) throw new SchemaError(`Invalid block type slug "${slug}"`, "INVALID_SLUG", { slug });
	if (RESERVED_BLOCK_TYPE_SLUGS.has(slug)) throw new SchemaError(`Block type slug "${slug}" is reserved`, "RESERVED_SLUG", { slug });
}
function assertLabel(label) {
	if (label.trim().length === 0 || label.length > MAX_LABEL_LENGTH) throw new SchemaError(`Block type label must contain between 1 and ${MAX_LABEL_LENGTH} characters`, "VALIDATION_ERROR", { path: "label" });
}
function sourceValue(source) {
	if (source === "user" || source === "seed") return source;
	throw new SchemaError(`Stored block type source "${source}" is unsupported`, "BLOCK_TYPE_VERSION_CONFLICT");
}
function parseStoredFields(raw) {
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) throw new SchemaError("Stored block type fields are not an array", "BLOCK_TYPE_VERSION_CONFLICT");
	const unsupportedTypes = [];
	const fields = parsed.map((entry, index) => {
		if (!isRecord$4(entry) || typeof entry.slug !== "string" || typeof entry.label !== "string") throw new SchemaError(`Stored block type field at index ${index} is invalid`, "BLOCK_TYPE_VERSION_CONFLICT");
		const rawType = entry.type;
		if (typeof rawType !== "string") throw new SchemaError(`Stored block type field at index ${index} has no valid type`, "BLOCK_TYPE_VERSION_CONFLICT");
		const type = BLOCK_FIELD_TYPE_SET.has(rawType) ? rawType : "string";
		if (!BLOCK_FIELD_TYPE_SET.has(rawType)) unsupportedTypes.push({
			type: rawType,
			path: `fields[${index}].type`
		});
		if (type === "repeater" && isRecord$4(entry.validation)) {
			const subFields = entry.validation.subFields;
			if (Array.isArray(subFields)) for (const [subIndex, subField] of subFields.entries()) {
				if (!isRecord$4(subField) || typeof subField.type !== "string") continue;
				if (!REPEATER_SUB_FIELD_TYPE_SET$1.has(subField.type)) unsupportedTypes.push({
					type: subField.type,
					path: `fields[${index}].validation.subFields[${subIndex}].type`
				});
			}
		}
		return {
			...entry,
			type
		};
	});
	return {
		fields: unsupportedTypes.length === 0 ? validateBlockFields(fields) : fields,
		unsupportedTypes
	};
}
function mapVersion(row, currentVersion) {
	const parsed = parseStoredFields(row.fields);
	return {
		id: row.id,
		blockTypeId: row.block_type_id,
		version: row.version,
		fields: parsed.fields,
		fingerprint: row.fingerprint,
		active: row.version === currentVersion,
		unsupportedTypes: parsed.unsupportedTypes.length > 0 ? parsed.unsupportedTypes : void 0,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function mapBlockType(row, versions) {
	return {
		id: row.id,
		slug: row.slug,
		label: row.label,
		description: row.description ?? void 0,
		icon: row.icon ?? void 0,
		category: row.category ?? void 0,
		currentVersion: row.current_version,
		source: sourceValue(row.source),
		versions: versions.map((version) => mapVersion(version, row.current_version)),
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function activeVersion(blockType) {
	const version = blockType.versions.find((candidate) => candidate.version === blockType.currentVersion);
	if (!version) throw new SchemaError(`Block type "${blockType.slug}" has no active version ${blockType.currentVersion}`, "BLOCK_TYPE_VERSION_CONFLICT", {
		slug: blockType.slug,
		version: blockType.currentVersion
	});
	return version;
}
var BlockTypeRegistry = class {
	constructor(db) {
		this.db = db;
	}
	async listBlockTypes() {
		const [types, versions] = await Promise.all([this.db.selectFrom("_emdash_block_types").selectAll().orderBy("slug", "asc").execute(), this.db.selectFrom("_emdash_block_type_versions").selectAll().orderBy("block_type_id", "asc").orderBy("version", "asc").execute()]);
		const byType = /* @__PURE__ */ new Map();
		for (const version of versions) {
			const entries = byType.get(version.block_type_id) ?? [];
			entries.push(version);
			byType.set(version.block_type_id, entries);
		}
		return types.map((type) => mapBlockType(type, byType.get(type.id) ?? []));
	}
	async getBlockType(slug) {
		const row = await this.db.selectFrom("_emdash_block_types").selectAll().where("slug", "=", slug).executeTakeFirst();
		if (!row) return null;
		return mapBlockType(row, await this.db.selectFrom("_emdash_block_type_versions").selectAll().where("block_type_id", "=", row.id).orderBy("version", "asc").execute());
	}
	async listAffectedCollections(blockTypeSlug) {
		const rows = await this.db.selectFrom("_emdash_fields as field").innerJoin("_emdash_collections as collection", "collection.id", "field.collection_id").select(["collection.slug as collection", "field.validation"]).where("field.type", "=", "blocks").execute();
		const affected = /* @__PURE__ */ new Set();
		for (const row of rows) {
			if (!row.validation) continue;
			const validation = JSON.parse(row.validation);
			if (!isRecord$4(validation)) continue;
			const allowed = Array.isArray(validation.allowedTypes) ? validation.allowedTypes : [];
			const retired = Array.isArray(validation.retiredTypes) ? validation.retiredTypes : [];
			if ([...allowed, ...retired].includes(blockTypeSlug)) affected.add(row.collection);
		}
		return [...affected].toSorted();
	}
	async beginMediaSchemaMutation(slug) {
		const invalidated = /* @__PURE__ */ new Set();
		for (const collection of await this.listAffectedCollections(slug)) if (await invalidateContentMediaUsageSchemaChange(this.db, collection)) invalidated.add(collection);
		return invalidated;
	}
	async notifyMutation(slug, mediaInvalidated) {
		const collections = await this.listAffectedCollections(slug);
		for (const collection of collections) {
			invalidateSchemaCache(collection);
			if (!mediaInvalidated) continue;
			if (mediaInvalidated.has(collection)) await invalidateContentMediaUsageSchemaChange(this.db, collection);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collection, "CONTENT_USAGE_STALE");
		}
		refreshDevTypes();
	}
	async createBlockType(input) {
		assertBlockTypeSlug(input.slug);
		assertLabel(input.label);
		if (input.source !== void 0 && input.source !== "user" && input.source !== "seed") throw new SchemaError(`Invalid block type source "${String(input.source)}"`, "VALIDATION_ERROR", { path: "source" });
		const fields = validateBlockFields(input.fields);
		const fingerprint = await fingerprintBlockFields(fields);
		const typeId = ulid();
		const versionId = ulid();
		const mediaInvalidated = await this.beginMediaSchemaMutation(input.slug);
		try {
			await executeAtomicStatements(this.db, [sql`
					INSERT INTO _emdash_block_types (
						id, slug, label, description, icon, category, current_version, source
					) VALUES (
						${typeId}, ${input.slug}, ${input.label}, ${input.description ?? null},
						${input.icon ?? null}, ${input.category ?? null}, 1, ${input.source ?? "user"}
					)
					RETURNING id
				`, sql`
					INSERT INTO _emdash_block_type_versions (
						id, block_type_id, version, fields, fingerprint
					) VALUES (
						${versionId}, ${typeId}, 1, ${JSON.stringify(fields)}, ${fingerprint}
					)
					RETURNING id
				`]);
		} catch (error) {
			if (error instanceof Error && UNIQUE_VIOLATION.test(error.message)) throw new SchemaError(`Block type "${input.slug}" already exists`, "BLOCK_TYPE_EXISTS", { slug: input.slug });
			throw error;
		}
		const created = await this.getBlockType(input.slug);
		if (!created) throw new SchemaError(`Block type "${input.slug}" was not created`, "BLOCK_TYPE_NOT_FOUND");
		await this.notifyMutation(input.slug, mediaInvalidated);
		return created;
	}
	async updateBlockType(slug, input) {
		const existing = await this.getBlockType(slug);
		if (!existing) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND", { slug });
		const active = activeVersion(existing);
		if (active.unsupportedTypes?.length) throw new SchemaError(`Block type "${slug}" contains unsupported field types`, "UNSUPPORTED_FIELD_TYPE", { unsupportedTypes: active.unsupportedTypes });
		if (active.fingerprint !== input.expectedFingerprint) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT", {
			expectedFingerprint: input.expectedFingerprint,
			actualFingerprint: active.fingerprint
		});
		if (input.label !== void 0) assertLabel(input.label);
		const fields = input.fields === void 0 ? void 0 : validateBlockFields(input.fields);
		const compatibility = fields ? compareBlockFields(active.fields, fields) : void 0;
		if (compatibility && !compatibility.compatible && !input.breaking) throw new SchemaError(`Block type "${slug}" update requires a new version`, "BLOCK_TYPE_BREAKING_CHANGE", { differences: compatibility.differences });
		const nextFingerprint = fields ? await fingerprintBlockFields(fields) : active.fingerprint;
		const metadataAssignments = [sql`updated_at = ${currentTimestampValue(this.db)}`];
		if (input.label !== void 0) metadataAssignments.push(sql`label = ${input.label}`);
		if (input.description !== void 0) metadataAssignments.push(sql`description = ${input.description}`);
		if (input.icon !== void 0) metadataAssignments.push(sql`icon = ${input.icon}`);
		if (input.category !== void 0) metadataAssignments.push(sql`category = ${input.category}`);
		const metadataUpdate = sql`
			UPDATE _emdash_block_types
			SET ${sql.join(metadataAssignments, sql`, `)}
			WHERE id = ${existing.id}
				AND EXISTS (
					SELECT 1 FROM _emdash_block_type_versions
					WHERE block_type_id = ${existing.id}
						AND version = _emdash_block_types.current_version
						AND fingerprint = ${input.expectedFingerprint}
				)
			RETURNING id
		`;
		const mediaInvalidated = fields && nextFingerprint !== active.fingerprint ? await this.beginMediaSchemaMutation(slug) : void 0;
		if (compatibility && !compatibility.compatible && fields) {
			if (!existing.versions.find((version) => version.version !== existing.currentVersion && version.fingerprint === nextFingerprint && JSON.stringify(version.fields) === JSON.stringify(fields))) {
				const nextVersion = Math.max(...existing.versions.map((version) => version.version)) + 1;
				try {
					const counts = await executeAtomicStatements(this.db, [sql`
							INSERT INTO _emdash_block_type_versions (
								id, block_type_id, version, fields, fingerprint
							)
							SELECT
								${ulid()}, ${existing.id}, ${nextVersion},
								${JSON.stringify(fields)}, ${nextFingerprint}
							WHERE EXISTS (
								SELECT 1 FROM _emdash_block_type_versions
								WHERE block_type_id = ${existing.id}
									AND version = ${existing.currentVersion}
									AND fingerprint = ${input.expectedFingerprint}
							)
							RETURNING id
						`, metadataUpdate]);
					if (counts[0] !== 1 || counts[1] !== 1) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT");
				} catch (error) {
					if (error instanceof SchemaError) throw error;
					if (error instanceof Error && UNIQUE_VIOLATION.test(error.message)) {
						const raced = (await this.getBlockType(slug))?.versions.find((version) => version.version === nextVersion);
						if (raced?.fingerprint !== nextFingerprint || JSON.stringify(raced.fields) !== JSON.stringify(fields)) throw new SchemaError(`Block type "${slug}" version ${nextVersion} was created concurrently with a different contract`, "BLOCK_TYPE_VERSION_CONFLICT", { version: nextVersion });
					} else throw error;
				}
			} else if ((await executeAtomicStatements(this.db, [metadataUpdate]))[0] !== 1) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT");
		} else if (fields) {
			const counts = await executeAtomicStatements(this.db, [metadataUpdate, sql`
					UPDATE _emdash_block_type_versions
					SET fields = ${JSON.stringify(fields)},
						fingerprint = ${nextFingerprint},
						updated_at = ${currentTimestampValue(this.db)}
					WHERE block_type_id = ${existing.id}
						AND version = ${active.version}
						AND fingerprint = ${input.expectedFingerprint}
					RETURNING id
				`]);
			if (counts[0] !== 1 || counts[1] !== 1) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT");
		} else if ((await executeAtomicStatements(this.db, [metadataUpdate]))[0] !== 1) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT");
		const updated = await this.getBlockType(slug);
		if (!updated) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND");
		await this.notifyMutation(slug, mediaInvalidated);
		return updated;
	}
	async applySeedBlockType(input, onConflict = "skip") {
		assertBlockTypeSlug(input.slug);
		assertLabel(input.label);
		const versions = await Promise.all(input.versions.toSorted((left, right) => left.version - right.version).map(async (version) => ({
			version: version.version,
			fields: validateBlockFields(version.fields),
			fingerprint: await fingerprintBlockFields(version.fields)
		})));
		if (versions.length === 0 || versions[0]?.version !== 1 || versions.some((version, index) => !Number.isInteger(version.version) || version.version < 1 || index > 0 && version.version !== versions[index - 1].version + 1)) throw new SchemaError(`Block type "${input.slug}" versions must be contiguous positive integers starting at 1`, "BLOCK_TYPE_VERSION_CONFLICT");
		if (!versions.some((version) => version.version === input.currentVersion)) throw new SchemaError(`Block type "${input.slug}" currentVersion ${input.currentVersion} is not declared`, "BLOCK_TYPE_VERSION_CONFLICT");
		const existing = await this.getBlockType(input.slug);
		if (existing && onConflict === "error") throw new SchemaError(`Block type "${input.slug}" already exists`, "BLOCK_TYPE_EXISTS");
		if (existing && onConflict === "skip") return existing;
		const mediaInvalidated = await this.beginMediaSchemaMutation(input.slug);
		if (!existing) {
			const typeId = ulid();
			const statements = [sql`
					INSERT INTO _emdash_block_types (
						id, slug, label, description, icon, category, current_version, source
					) VALUES (
						${typeId}, ${input.slug}, ${input.label}, ${input.description ?? null},
						${input.icon ?? null}, ${input.category ?? null}, ${input.currentVersion}, 'seed'
					)
					RETURNING id
				`];
			for (const version of versions) statements.push(sql`
					INSERT INTO _emdash_block_type_versions (
						id, block_type_id, version, fields, fingerprint
					) VALUES (
						${ulid()}, ${typeId}, ${version.version},
						${JSON.stringify(version.fields)}, ${version.fingerprint}
					)
					RETURNING id
				`);
			try {
				await executeAtomicStatements(this.db, statements);
			} catch (error) {
				if (error instanceof Error && UNIQUE_VIOLATION.test(error.message)) throw new SchemaError(`Block type "${input.slug}" already exists`, "BLOCK_TYPE_EXISTS");
				throw error;
			}
		} else {
			const statements = [sql`
					UPDATE _emdash_block_types
					SET label = ${input.label}, description = ${input.description ?? null},
						icon = ${input.icon ?? null}, category = ${input.category ?? null},
						updated_at = ${currentTimestampValue(this.db)}
					WHERE id = ${existing.id}
					RETURNING id
				`];
			for (const version of versions) {
				const stored = existing.versions.find((candidate) => candidate.version === version.version);
				if (stored) {
					if (stored.unsupportedTypes?.length) throw new SchemaError(`Block type "${input.slug}" version ${version.version} contains unsupported field types`, "UNSUPPORTED_FIELD_TYPE", { unsupportedTypes: stored.unsupportedTypes });
					if (stored.fingerprint !== version.fingerprint && !compareBlockFields(stored.fields, version.fields).compatible) throw new SchemaError(`Block type "${input.slug}" version ${version.version} has an incompatible stored contract`, "BLOCK_TYPE_VERSION_CONFLICT", { version: version.version });
					statements.push(sql`
						UPDATE _emdash_block_type_versions
						SET fields = ${JSON.stringify(version.fields)},
							fingerprint = ${version.fingerprint},
							updated_at = ${currentTimestampValue(this.db)}
						WHERE id = ${stored.id}
						RETURNING id
					`);
				} else statements.push(sql`
						INSERT INTO _emdash_block_type_versions (
							id, block_type_id, version, fields, fingerprint
						) VALUES (
							${ulid()}, ${existing.id}, ${version.version},
							${JSON.stringify(version.fields)}, ${version.fingerprint}
						)
						RETURNING id
					`);
			}
			statements.push(sql`
				UPDATE _emdash_block_types
				SET current_version = ${input.currentVersion},
					updated_at = ${currentTimestampValue(this.db)}
				WHERE id = ${existing.id}
				RETURNING id
			`);
			await executeAtomicStatements(this.db, statements);
		}
		const applied = await this.getBlockType(input.slug);
		if (!applied) throw new SchemaError(`Block type "${input.slug}" not found`, "BLOCK_TYPE_NOT_FOUND");
		await this.notifyMutation(input.slug, mediaInvalidated);
		return applied;
	}
	async activateVersion(slug, version, expectedFingerprint) {
		const existing = await this.getBlockType(slug);
		if (!existing) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND", { slug });
		const active = activeVersion(existing);
		if (active.fingerprint !== expectedFingerprint) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT", {
			expectedFingerprint,
			actualFingerprint: active.fingerprint
		});
		const target = existing.versions.find((candidate) => candidate.version === version);
		if (!target) throw new SchemaError(`Block type "${slug}" has no version ${version}`, "BLOCK_TYPE_VERSION_CONFLICT", {
			slug,
			version
		});
		if (target.unsupportedTypes?.length) throw new SchemaError(`Block type "${slug}" version ${version} contains unsupported field types`, "UNSUPPORTED_FIELD_TYPE", { unsupportedTypes: target.unsupportedTypes });
		const mediaInvalidated = version !== existing.currentVersion ? await this.beginMediaSchemaMutation(slug) : void 0;
		if (version !== existing.currentVersion) {
			if ((await sql`
				UPDATE _emdash_block_types
				SET current_version = ${version},
					updated_at = ${currentTimestampValue(this.db)}
				WHERE id = ${existing.id}
					AND current_version = ${existing.currentVersion}
					AND EXISTS (
						SELECT 1 FROM _emdash_block_type_versions
						WHERE block_type_id = ${existing.id}
							AND version = ${existing.currentVersion}
							AND fingerprint = ${expectedFingerprint}
					)
				RETURNING id
			`.execute(this.db)).rows.length !== 1) throw new SchemaError(`Block type "${slug}" changed since it was read`, "CONFLICT");
		}
		const updated = await this.getBlockType(slug);
		if (!updated) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND");
		await this.notifyMutation(slug, mediaInvalidated);
		return updated;
	}
};
async function buildContentMediaUsageFieldFingerprint(discovery) {
	return (await buildCanonicalSha256Fingerprint("media-usage-fields:v1:sha256:", {
		fingerprintVersion: 1,
		contentSourceSchemaVersion: 2,
		extractionFields: discovery.extractionFields.map((field) => ({
			slug: field.slug,
			type: field.type,
			...field.type === "blocks" ? { blockTypes: (field.blockTypes ?? []).map((type) => ({
				slug: type.slug,
				currentVersion: type.currentVersion,
				versions: type.versions.map((version) => ({
					version: version.version,
					fingerprint: version.fingerprint
				}))
			})) } : {},
			...field.type === "repeater" ? { subFields: (field.validation?.subFields ?? []).map((subField) => ({
				slug: subField.slug,
				type: subField.type
			})).toSorted(compareFieldIdentity) } : {}
		})).toSorted(compareFieldIdentity),
		displayFieldSlugs: discovery.displayFieldSlugs.toSorted(compareStrings)
	})).fingerprint;
}
var MediaUsageFieldDiscoveryError = class extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		this.name = "MediaUsageFieldDiscoveryError";
	}
};
var DISPLAY_FIELD_SLUGS = ["title", "name"];
var SUPPORTED_TOP_LEVEL_TYPES = [
	"file",
	"image",
	"portableText"
];
async function loadContentMediaUsageFields(db, collectionSlug, collectionId) {
	validateIdentifier(collectionSlug, "collection slug");
	let query = db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug",
		"_emdash_fields.type",
		"_emdash_fields.validation"
	]).where("_emdash_collections.slug", "=", collectionSlug);
	if (collectionId !== void 0) query = query.where("_emdash_collections.id", "=", collectionId);
	const rows = (await query.execute()).filter((row) => !isStoragelessFieldRow(row));
	const extractionFields = [];
	const rowBySlug = /* @__PURE__ */ new Map();
	const allBlockTypes = rows.some((row) => row.type === "blocks") ? await new BlockTypeRegistry(db).listBlockTypes() : [];
	for (const row of rows) {
		rowBySlug.set(row.slug, row);
		if (isSupportedTopLevelType(row.type)) {
			validateIdentifier(row.slug, "media usage field slug");
			extractionFields.push({
				slug: row.slug,
				type: row.type
			});
			continue;
		}
		if (row.type === "repeater") {
			validateIdentifier(row.slug, "media usage field slug");
			const subFields = normalizeRepeaterImageSubFields(row.validation);
			if (subFields.length > 0) extractionFields.push({
				slug: row.slug,
				type: "repeater",
				validation: { subFields }
			});
		}
		if (row.type === "blocks") {
			validateIdentifier(row.slug, "media usage field slug");
			const blockTypes = resolveMediaBlockTypes(allBlockTypes, parseBlockTypeSlugs(row.validation));
			extractionFields.push({
				slug: row.slug,
				type: "blocks",
				blockTypes
			});
		}
	}
	extractionFields.sort((a, b) => a.slug.localeCompare(b.slug));
	return {
		extractionFields,
		displayFieldSlugs: DISPLAY_FIELD_SLUGS.filter((slug) => {
			if (!rowBySlug.has(slug)) return false;
			validateIdentifier(slug, "media usage display field slug");
			return true;
		})
	};
}
function parseBlockTypeSlugs(rawValidation) {
	const validation = parseValidation(rawValidation, "block");
	if (!isRecord$3(validation)) throw new MediaUsageFieldDiscoveryError("Blocks field validation must be an object before media usage can be discovered", "INVALID_BLOCK_VALIDATION");
	const allowed = Array.isArray(validation.allowedTypes) ? validation.allowedTypes : [];
	const retired = Array.isArray(validation.retiredTypes) ? validation.retiredTypes : [];
	const values = [...allowed, ...retired];
	if (values.some((value) => typeof value !== "string")) throw new MediaUsageFieldDiscoveryError("Blocks field type lists must contain strings before media usage can be discovered", "INVALID_BLOCK_VALIDATION");
	return [...new Set(values)];
}
function resolveMediaBlockTypes(types, slugs) {
	const bySlug = new Map(types.map((type) => [type.slug, type]));
	return slugs.map((slug) => {
		const type = bySlug.get(slug);
		if (!type || type.versions.some((version) => version.unsupportedTypes?.length)) throw new MediaUsageFieldDiscoveryError(`Block type "${slug}" cannot be resolved for media usage`, "UNSUPPORTED_BLOCK_DEFINITION");
		return type;
	});
}
function normalizeRepeaterImageSubFields(rawValidation) {
	const validation = parseValidation(rawValidation, "repeater");
	if (!isRecord$3(validation) || !Array.isArray(validation.subFields)) return [];
	const subFields = [];
	for (const subField of validation.subFields) {
		if (!isRecord$3(subField) || subField.type !== "image") continue;
		if (typeof subField.slug !== "string") continue;
		validateIdentifier(subField.slug, "media usage repeater sub-field slug");
		subFields.push({
			slug: subField.slug,
			type: "image"
		});
	}
	return subFields.toSorted((a, b) => a.slug.localeCompare(b.slug));
}
function parseValidation(rawValidation, kind) {
	if (!rawValidation) return null;
	try {
		return JSON.parse(rawValidation);
	} catch {
		throw new MediaUsageFieldDiscoveryError(`${kind === "block" ? "Blocks" : "Repeater"} field validation must be valid JSON before media usage can be discovered`, kind === "block" ? "INVALID_BLOCK_VALIDATION" : "INVALID_REPEATER_VALIDATION");
	}
}
function isSupportedTopLevelType(value) {
	return SUPPORTED_TOP_LEVEL_TYPES.includes(value);
}
function isRecord$3(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function compareFieldIdentity(a, b) {
	return compareStrings(a.slug, b.slug);
}
function compareStrings(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
var URL_LIKE_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function extractMediaUsageOccurrences({ fields, data }) {
	const occurrences = [];
	const seen = /* @__PURE__ */ new Set();
	for (const field of fields) {
		const value = data[field.slug];
		if (field.type === "image") {
			addImageOccurrences(occurrences, seen, field.slug, field.slug, value);
			continue;
		}
		if (field.type === "file") {
			addOccurrence(occurrences, seen, {
				fieldSlug: field.slug,
				fieldPath: field.slug,
				referenceType: "file_field",
				value,
				fallbackKind: null
			});
			continue;
		}
		if (field.type === "repeater") {
			extractRepeaterOccurrences(occurrences, seen, field.slug, value, field.validation?.subFields);
			continue;
		}
		if (field.type === "portableText") {
			extractPortableTextOccurrences(occurrences, seen, field.slug, value);
			continue;
		}
		if (field.type === "blocks") extractBlockOccurrences(occurrences, seen, field, value);
	}
	return occurrences;
}
function extractRepeaterOccurrences(occurrences, seen, fieldSlug, value, subFields, pathPrefix = fieldSlug) {
	if (!Array.isArray(value) || !Array.isArray(subFields)) return;
	for (const [itemIndex, item] of value.entries()) {
		if (!isRecord$2(item)) continue;
		for (const subField of subFields) {
			if (subField.type !== "image") continue;
			addImageOccurrences(occurrences, seen, fieldSlug, `${pathPrefix}[${itemIndex}].${subField.slug}`, item[subField.slug]);
		}
	}
}
function addImageOccurrences(occurrences, seen, fieldSlug, fieldPath, value) {
	addOccurrence(occurrences, seen, {
		fieldSlug,
		fieldPath,
		referenceType: "image_field",
		value,
		fallbackKind: "image"
	});
	if (isRecord$2(value) && value.darkVariant != null) addOccurrence(occurrences, seen, {
		fieldSlug,
		fieldPath: `${fieldPath}.darkVariant`,
		referenceType: "image_field",
		value: value.darkVariant,
		fallbackKind: "image"
	});
}
function extractPortableTextOccurrences(occurrences, seen, fieldSlug, value, pathPrefix = fieldSlug) {
	if (!Array.isArray(value)) return;
	for (const [blockIndex, block] of value.entries()) {
		if (!isRecord$2(block)) continue;
		if (block._type === "image") {
			addPortableTextAssetOccurrence(occurrences, seen, fieldSlug, `${pathPrefix}[${blockIndex}]`, block.asset, "image");
			continue;
		}
		if (isPortableTextVideoBlock(block)) {
			addPortableTextAssetOccurrence(occurrences, seen, fieldSlug, `${pathPrefix}[${blockIndex}]`, block.asset, "video");
			continue;
		}
		if (block._type === "gallery" && Array.isArray(block.images)) for (const [imageIndex, image] of block.images.entries()) {
			if (!isRecord$2(image)) continue;
			addPortableTextAssetOccurrence(occurrences, seen, fieldSlug, `${pathPrefix}[${blockIndex}].images[${imageIndex}]`, image.asset, "image");
		}
	}
}
var MediaUsageBlockResolutionError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "MediaUsageBlockResolutionError";
	}
};
function extractBlockOccurrences(occurrences, seen, field, value) {
	if (!Array.isArray(value)) return;
	const types = new Map((field.blockTypes ?? []).map((type) => [type.slug, type]));
	for (const [index, block] of value.entries()) {
		if (!isRecord$2(block)) continue;
		if (typeof block._type !== "string" || typeof block._version !== "number" || typeof block._key !== "string" || block._key.length === 0) throw new MediaUsageBlockResolutionError(`Block at ${field.slug}[${index}] has invalid identity metadata`);
		const type = types.get(block._type);
		const version = type?.versions.find((candidate) => candidate.version === block._version);
		if (!type || !version || version.unsupportedTypes?.length) throw new MediaUsageBlockResolutionError(`Block at ${field.slug}[${index}] has no retained definition`);
		const pathPrefix = `${field.slug}.${block._key}`;
		for (const nestedField of version.fields) {
			const nestedValue = block[nestedField.slug];
			const nestedPath = `${pathPrefix}.${nestedField.slug}`;
			if (nestedField.type === "image") addImageOccurrences(occurrences, seen, field.slug, nestedPath, nestedValue);
			else if (nestedField.type === "file") addOccurrence(occurrences, seen, {
				fieldSlug: field.slug,
				fieldPath: nestedPath,
				referenceType: "file_field",
				value: nestedValue,
				fallbackKind: null
			});
			else if (nestedField.type === "portableText") extractPortableTextOccurrences(occurrences, seen, field.slug, nestedValue, nestedPath);
			else if (nestedField.type === "repeater") extractRepeaterOccurrences(occurrences, seen, field.slug, nestedValue, nestedField.validation?.subFields, nestedPath);
		}
	}
}
function addPortableTextAssetOccurrence(occurrences, seen, fieldSlug, pathPrefix, asset, kind) {
	if (!isRecord$2(asset)) return;
	const provider = normalizeProvider(asset.provider);
	const ref = readPortableTextAssetRef(asset, provider);
	if (!ref) return;
	addRefOccurrence(occurrences, seen, {
		fieldSlug,
		fieldPath: `${pathPrefix}.asset.${ref.key}`,
		referenceType: kind === "video" ? "portable_text_video" : "portable_text_image",
		ref: buildMediaRef({
			id: ref.id,
			provider,
			mimeType: normalizeMimeValue(asset.mimeType),
			fallbackKind: kind
		})
	});
}
function addOccurrence(occurrences, seen, input) {
	const ref = readMediaRef(input.value, input.fallbackKind);
	if (!ref) return;
	addRefOccurrence(occurrences, seen, {
		fieldSlug: input.fieldSlug,
		fieldPath: input.fieldPath,
		referenceType: input.referenceType,
		ref
	});
}
function addRefOccurrence(occurrences, seen, input) {
	if (!input.ref) return;
	const occurrence = {
		fieldSlug: input.fieldSlug,
		fieldPath: input.fieldPath,
		occurrenceIndex: 0,
		referenceType: input.referenceType,
		mediaId: input.ref.mediaId,
		provider: input.ref.provider,
		providerAssetId: input.ref.providerAssetId,
		mediaKind: input.ref.mediaKind,
		mimeType: input.ref.mimeType
	};
	const key = [
		occurrence.fieldSlug,
		occurrence.fieldPath,
		occurrence.occurrenceIndex,
		occurrence.referenceType,
		occurrence.provider,
		occurrence.providerAssetId,
		occurrence.mediaId ?? ""
	].join("\0");
	if (seen.has(key)) return;
	seen.add(key);
	occurrences.push(occurrence);
}
function readMediaRef(value, fallbackKind) {
	if (typeof value === "string") {
		const id = normalizeLocalMediaId(value);
		return id ? buildMediaRef({
			id,
			provider: "local",
			mimeType: null,
			fallbackKind
		}) : null;
	}
	if (!isRecord$2(value)) return null;
	const provider = normalizeProvider(value.provider);
	const id = provider === "local" ? normalizeLocalMediaId(value.id) : normalizeStableId(value.id);
	if (!id) return null;
	return buildMediaRef({
		id,
		provider,
		mimeType: normalizeMimeValue(value.mimeType),
		fallbackKind
	});
}
function buildMediaRef(input) {
	const provider = normalizeProvider(input.provider);
	if (provider === "external") return null;
	return {
		mediaId: provider === "local" ? input.id : null,
		provider,
		providerAssetId: input.id,
		mediaKind: mediaKindFromMime(input.mimeType) ?? input.fallbackKind,
		mimeType: input.mimeType
	};
}
function readPortableTextAssetRef(asset, provider) {
	const normalizeId = provider === "local" ? normalizeLocalMediaId : normalizeStableId;
	const ref = normalizeId(asset._ref);
	if (ref) return {
		key: "_ref",
		id: ref
	};
	const id = normalizeId(asset.id);
	if (id) return {
		key: "id",
		id
	};
	return null;
}
function normalizeProvider(value) {
	return readString$1(value)?.trim() || "local";
}
function normalizeLocalMediaId(value) {
	const id = normalizeStableId(value);
	if (!id) return null;
	return id.includes("/") ? null : id;
}
function normalizeStableId(value) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	if (URL_LIKE_RE.test(trimmed)) return null;
	if (trimmed.startsWith("/_emdash/api/media/file/")) return null;
	return trimmed;
}
function normalizeMimeValue(value) {
	if (typeof value !== "string") return null;
	const normalized = normalizeMime(value);
	return normalized.includes("/") ? normalized : null;
}
function mediaKindFromMime(mimeType) {
	if (!mimeType) return null;
	if (mimeType.startsWith("image/")) return "image";
	if (mimeType.startsWith("video/")) return "video";
	if (mimeType.startsWith("audio/")) return "audio";
	if (mimeType.startsWith("font/") || mimeType.startsWith("application/font-")) return "font";
	if (mimeType.startsWith("text/")) return "text";
	if (isDocumentMime(mimeType)) return "document";
	if (isArchiveMime(mimeType)) return "archive";
	return "other";
}
function isDocumentMime(mimeType) {
	return mimeType === "application/pdf" || mimeType === "application/msword" || mimeType === "application/rtf" || mimeType === "application/vnd.ms-excel" || mimeType === "application/vnd.ms-powerpoint" || mimeType.startsWith("application/vnd.openxmlformats-officedocument.");
}
function isArchiveMime(mimeType) {
	return mimeType === "application/zip" || mimeType === "application/gzip" || mimeType === "application/x-tar" || mimeType === "application/x-7z-compressed" || mimeType === "application/x-rar-compressed" || mimeType === "application/vnd.rar";
}
function readString$1(value) {
	return typeof value === "string" ? value : null;
}
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var MEDIA_USAGE_CONTENT_SOURCE_VARIANTS = ["columns", "draft_overlay"];
function buildContentMediaUsageSourceKey(input) {
	if (input.collectionId) return `content:${input.collectionId}:${input.contentId}:${input.sourceVariant}`;
	return `content:${input.collectionSlug}:${input.contentId}:${input.sourceVariant}`;
}
var CONTENT_COLLECTION_ID_RESULT = "__emdash_media_usage_collection_id";
var CONTENT_SYSTEM_COLUMNS = [
	"id",
	"slug",
	"status",
	"created_at",
	"updated_at",
	"published_at",
	"scheduled_at",
	"deleted_at",
	"version",
	"live_revision_id",
	"draft_revision_id",
	"locale",
	"translation_group"
];
async function loadContentMediaUsageSnapshots(db, collectionSlug, contentId, fieldDiscovery, options = {}) {
	return (await loadContentMediaUsageSnapshotsBatch(db, collectionSlug, [contentId], fieldDiscovery, options)).get(contentId) ?? {
		success: false,
		error: "CONTENT_NOT_FOUND"
	};
}
async function loadContentMediaUsageSnapshotsBatch(db, collectionSlug, contentIds, fieldDiscovery, options = {}, control = {}) {
	validateIdentifier(collectionSlug, "collection slug");
	if (options.identityVersion !== void 0 && !options.collectionId) throw new Error("Canonical media usage snapshots require a collection identity");
	const discovery = fieldDiscovery ?? await loadContentMediaUsageFields(db, collectionSlug);
	const rows = await loadContentRows(db, collectionSlug, contentIds, [...discovery.extractionFields.map((field) => field.slug), ...discovery.displayFieldSlugs], options.collectionId);
	const revisions = await loadRevisionRows(db, Array.from(rows.values(), (row) => readNullableString(row.draft_revision_id)).filter((revisionId) => revisionId !== null));
	const results = /* @__PURE__ */ new Map();
	let occurrenceCount = 0;
	let projectionBytes = 0;
	for (const contentId of new Set(contentIds)) {
		if (control.shouldContinue && !control.shouldContinue()) break;
		const row = rows.get(contentId);
		const result = row ? await buildContentMediaUsageSnapshots(row, collectionSlug, discovery, options, revisions) : {
			success: false,
			error: "CONTENT_NOT_FOUND"
		};
		const snapshots = result.success ? result.snapshots : result.snapshots ?? [];
		const itemOccurrenceCount = snapshots.reduce((total, snapshot) => total + snapshot.occurrences.length, 0);
		const itemProjectionBytes = snapshots.reduce((total, snapshot) => total + snapshot.projectionByteLength, 0);
		if (results.size > 0 && (control.maxOccurrenceCount !== void 0 && occurrenceCount + itemOccurrenceCount > control.maxOccurrenceCount || control.maxProjectionBytes !== void 0 && projectionBytes + itemProjectionBytes > control.maxProjectionBytes)) break;
		results.set(contentId, result);
		occurrenceCount += itemOccurrenceCount;
		projectionBytes += itemProjectionBytes;
	}
	return results;
}
async function buildContentMediaUsageSnapshots(row, collectionSlug, discovery, options, revisions) {
	const collectionId = readString(row[CONTENT_COLLECTION_ID_RESULT]);
	if (!collectionId) throw new Error("Media usage snapshot query did not return a collection identity");
	const columnsData = projectData(row, discovery.extractionFields.map((field) => field.slug));
	const displayData = projectRawData(row, discovery.displayFieldSlugs);
	const occurrences = extractMediaUsageOccurrences({
		fields: discovery.extractionFields,
		data: columnsData
	});
	const columnsRevisionId = readNullableString(row.live_revision_id);
	const columnsSource = buildContentSource({
		collectionId: options.collectionId,
		collectionSlug,
		identityVersion: options.identityVersion,
		row,
		displayData,
		sourceVariant: "columns",
		revisionId: columnsRevisionId
	});
	const columnsProjection = await buildMediaUsageProjectionFingerprint({
		collectionId,
		source: columnsSource,
		occurrences,
		extractionFields: discovery.extractionFields
	});
	columnsSource.sourceFingerprint = columnsProjection.fingerprint;
	const snapshots = [{
		source: columnsSource,
		occurrences,
		fields: discovery.extractionFields,
		projectionByteLength: columnsProjection.byteLength
	}];
	const draftRevisionId = readNullableString(row.draft_revision_id);
	if (draftRevisionId) {
		const attemptedDraftSource = buildContentSource({
			collectionId: options.collectionId,
			collectionSlug,
			identityVersion: options.identityVersion,
			row,
			displayData,
			sourceVariant: "draft_overlay",
			revisionId: draftRevisionId
		});
		const revisionResult = revisions.get(draftRevisionId);
		if (!revisionResult) return {
			success: false,
			error: "DRAFT_REVISION_NOT_FOUND",
			source: attemptedDraftSource,
			snapshots
		};
		if (!revisionResult.success) return {
			success: false,
			error: "DRAFT_REVISION_INVALID",
			source: attemptedDraftSource,
			snapshots
		};
		const revision = revisionResult.revision;
		if (revision.collection !== collectionSlug || revision.entryId !== row.id) return {
			success: false,
			error: "DRAFT_REVISION_MISMATCH",
			source: attemptedDraftSource,
			snapshots
		};
		const revisionData = stripRevisionMetadata(revision.data);
		const draftOverlayData = {
			...columnsData,
			...revisionData
		};
		const draftDisplayData = {
			...displayData,
			...projectPresentData(revisionData, discovery.displayFieldSlugs)
		};
		const draftContentSlug = readNullableString(revision.data._slug) ?? readNullableString(row.slug);
		const draftOccurrences = extractMediaUsageOccurrences({
			fields: discovery.extractionFields,
			data: draftOverlayData
		});
		const draftSource = buildContentSource({
			collectionId: options.collectionId,
			collectionSlug,
			identityVersion: options.identityVersion,
			row,
			displayData: draftDisplayData,
			sourceVariant: "draft_overlay",
			revisionId: draftRevisionId,
			contentSlug: draftContentSlug
		});
		const draftProjection = await buildMediaUsageProjectionFingerprint({
			collectionId,
			source: draftSource,
			occurrences: draftOccurrences,
			extractionFields: discovery.extractionFields
		});
		draftSource.sourceFingerprint = draftProjection.fingerprint;
		snapshots.push({
			source: draftSource,
			occurrences: draftOccurrences,
			fields: discovery.extractionFields,
			projectionByteLength: draftProjection.byteLength
		});
	}
	return {
		success: true,
		snapshots
	};
}
async function loadContentRows(db, collectionSlug, contentIds, fieldSlugs, expectedCollectionId) {
	const tableName = getContentTableName(collectionSlug);
	const columnRefs = uniqueColumns([...CONTENT_SYSTEM_COLUMNS, ...fieldSlugs]).map((column) => sql.ref(`content.${column}`));
	const rows = /* @__PURE__ */ new Map();
	const uniqueContentIds = [...new Set(contentIds)];
	if (uniqueContentIds.length === 0) return rows;
	const result = await sql`
		WITH requested AS (${jsonTextValues(db, uniqueContentIds)})
		SELECT
			${sql.join(columnRefs, sql`, `)},
			collection.id AS __emdash_media_usage_collection_id
		FROM ${sql.ref(tableName)} AS content
		INNER JOIN requested ON requested.value = content.id
		INNER JOIN _emdash_collections AS collection
			ON collection.slug = ${collectionSlug}
			${expectedCollectionId ? sql`AND collection.id = ${expectedCollectionId}` : sql``}
	`.execute(db);
	for (const row of result.rows) {
		const contentId = readString(row.id);
		if (contentId) rows.set(contentId, row);
	}
	return rows;
}
async function loadRevisionRows(db, revisionIds) {
	const revisions = /* @__PURE__ */ new Map();
	const uniqueRevisionIds = [...new Set(revisionIds)];
	if (uniqueRevisionIds.length === 0) return revisions;
	const rows = await sql`
		WITH requested AS (${jsonTextValues(db, uniqueRevisionIds)})
		SELECT revision.id, revision.collection, revision.entry_id, revision.data
		FROM revisions AS revision
		INNER JOIN requested ON requested.value = revision.id
	`.execute(db);
	for (const row of rows.rows) {
		const data = parseRevisionData(row.data);
		revisions.set(row.id, data ? {
			success: true,
			revision: {
				id: row.id,
				collection: row.collection,
				entryId: row.entry_id,
				data
			}
		} : { success: false });
	}
	return revisions;
}
function buildContentSource(input) {
	const { collectionId, collectionSlug, identityVersion, row, displayData, sourceVariant, revisionId } = input;
	const contentId = readString(row.id) ?? "";
	const contentSlug = input.contentSlug ?? readNullableString(row.slug);
	return {
		sourceKey: buildContentMediaUsageSourceKey({
			collectionId,
			collectionSlug,
			contentId,
			sourceVariant
		}),
		sourceType: "content",
		collectionId,
		collectionSlug,
		contentId,
		sourceVariant,
		locale: readNullableString(row.locale),
		translationGroup: readNullableString(row.translation_group),
		contentSlug,
		contentTitle: deriveContentTitle(displayData, contentSlug, contentId),
		contentStatus: readNullableString(row.status),
		contentScheduledAt: readNullableString(row.scheduled_at),
		contentDeletedAt: readNullableString(row.deleted_at),
		revisionId,
		schemaVersion: 2,
		sourceUpdatedAt: readNullableString(row.updated_at),
		sourceVersion: readNumber(row.version),
		identityVersion
	};
}
function projectData(row, fieldSlugs) {
	const data = {};
	for (const fieldSlug of fieldSlugs) data[fieldSlug] = deserializeValue(row[fieldSlug] ?? null);
	return data;
}
function projectRawData(row, fieldSlugs) {
	const data = {};
	for (const fieldSlug of fieldSlugs) data[fieldSlug] = row[fieldSlug] ?? null;
	return data;
}
function projectPresentData(row, fieldSlugs) {
	const data = {};
	for (const fieldSlug of fieldSlugs) if (Object.hasOwn(row, fieldSlug)) data[fieldSlug] = row[fieldSlug];
	return data;
}
function uniqueColumns(columns) {
	const unique = [...new Set(columns)];
	for (const column of unique) validateIdentifier(column, "content media usage column");
	return unique;
}
function getContentTableName(collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	return `ec_${collectionSlug}`;
}
function deserializeValue(value) {
	if (typeof value === "string" && (value.startsWith("{") || value.startsWith("["))) try {
		return JSON.parse(value);
	} catch {
		return value;
	}
	return value;
}
function parseRevisionData(value) {
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return isRecord$1(parsed) ? parsed : null;
	} catch {
		return null;
	}
	return isRecord$1(value) ? value : null;
}
function stripRevisionMetadata(data) {
	const stripped = {};
	for (const [key, value] of Object.entries(data)) if (!key.startsWith("_")) stripped[key] = value;
	return stripped;
}
function deriveContentTitle(displayData, contentSlug, contentId) {
	for (const fieldSlug of ["title", "name"]) {
		const value = displayData[fieldSlug];
		if (typeof value === "string" && value.trim()) return value;
	}
	return contentSlug ?? contentId;
}
function readString(value) {
	return typeof value === "string" ? value : null;
}
function readNullableString(value) {
	return value === null || value === void 0 ? null : readString(value);
}
function readNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "bigint") return Number(value);
	if (typeof value === "string" && value) {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}
	return null;
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
var CONTENT_USAGE_LOCKS_KEY = Symbol.for("emdash.mediaUsage.contentLocks");
var CONTENT_USAGE_COLLECTION_LOCKS_KEY = Symbol.for("emdash.mediaUsage.collectionLocks");
var CONTENT_USAGE_REFRESH_MAX_ATTEMPTS = 2;
var MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS = Object.freeze({
	maxOccurrenceMutationUnitsPerClaim: 500,
	maxProjectionMutationBytesPerVariant: 2e6,
	maxProjectionMutationBytesPerClaim: 4e6,
	maxOccurrenceMutationUnitsPerBatch: 5e4,
	maxProjectionMutationBytesPerBatch: 16e6
});
var ZERO_RESULT = {
	success: true,
	refreshedSourceCount: 0,
	deletedSourceCount: 0,
	failedSourceCount: 0
};
function createContentMediaUsageAdmissionBudget(limits = {}) {
	return {
		remainingOccurrenceMutationUnits: limits.maxOccurrenceMutationUnits ?? MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxOccurrenceMutationUnitsPerClaim,
		remainingProjectionMutationBytes: limits.maxProjectionMutationBytes ?? MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxProjectionMutationBytesPerClaim,
		hasReservedMutation: false
	};
}
async function planContentMediaUsageProjectionAdmission(repo, snapshots, observedSources, canonicalSourceKeys, budget) {
	const snapshotSourceKeys = new Set(snapshots.map((snapshot) => snapshot.source.sourceKey));
	const absentSources = canonicalSourceKeys.filter((sourceKey) => !snapshotSourceKeys.has(sourceKey)).map((sourceKey) => observedSources.get(sourceKey)).filter((source) => source !== void 0);
	let deletionOccurrenceUnits = 0;
	let deletionBytes = 0;
	let largestDeletionBytes = 0;
	for (const source of absentSources) {
		const measurement = await repo.measureSourceGenerationDeletion(source.sourceKey, source.currentGeneration, MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxOccurrenceMutationUnitsPerClaim);
		if (measurement.exceedsOccurrenceLimit) return budget.hasReservedMutation ? { outcome: "claim_budget_deferred" } : { outcome: "intrinsic_resource_limit" };
		deletionOccurrenceUnits += measurement.occurrenceCount;
		const sourceDeletionBytes = storedMediaUsageSourceByteLength(source) + measurement.occurrenceBytes * 2;
		deletionBytes += sourceDeletionBytes;
		largestDeletionBytes = Math.max(largestDeletionBytes, sourceDeletionBytes);
	}
	const noOpSourceKeys = /* @__PURE__ */ new Set();
	let cost = projectionAdmissionCost(snapshots, noOpSourceKeys, deletionOccurrenceUnits, deletionBytes, largestDeletionBytes);
	if (exceedsProjectionAdmissionLimits(cost)) {
		for (const snapshot of snapshots) {
			const expectedSource = observedSources.get(snapshot.source.sourceKey);
			if (expectedSource && await repo.projectionMatchesExpectedSource(snapshot.source, expectedSource)) noOpSourceKeys.add(snapshot.source.sourceKey);
		}
		cost = projectionAdmissionCost(snapshots, noOpSourceKeys, deletionOccurrenceUnits, deletionBytes, largestDeletionBytes);
	}
	if (exceedsProjectionAdmissionLimits(cost)) return budget.hasReservedMutation ? { outcome: "claim_budget_deferred" } : { outcome: "intrinsic_resource_limit" };
	if (cost.occurrenceMutationUnits > budget.remainingOccurrenceMutationUnits || cost.projectionMutationBytes > budget.remainingProjectionMutationBytes) return { outcome: "claim_budget_deferred" };
	budget.remainingOccurrenceMutationUnits -= cost.occurrenceMutationUnits;
	budget.remainingProjectionMutationBytes -= cost.projectionMutationBytes;
	if (cost.occurrenceMutationUnits > 0 || cost.projectionMutationBytes > 0) budget.hasReservedMutation = true;
	return {
		outcome: "admitted",
		noOpSourceKeys,
		absentSources,
		...cost
	};
}
function projectionAdmissionCost(snapshots, noOpSourceKeys, deletionOccurrenceUnits, deletionBytes, largestDeletionBytes) {
	return snapshots.reduce((cost, snapshot) => {
		if (noOpSourceKeys.has(snapshot.source.sourceKey)) return cost;
		cost.occurrenceMutationUnits += snapshot.occurrences.length;
		cost.projectionMutationBytes += snapshot.projectionByteLength;
		cost.largestProjectionMutationBytes = Math.max(cost.largestProjectionMutationBytes, snapshot.projectionByteLength);
		return cost;
	}, {
		occurrenceMutationUnits: deletionOccurrenceUnits,
		projectionMutationBytes: deletionBytes,
		largestProjectionMutationBytes: largestDeletionBytes
	});
}
function exceedsProjectionAdmissionLimits(cost) {
	return cost.occurrenceMutationUnits > MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxOccurrenceMutationUnitsPerClaim || cost.largestProjectionMutationBytes > MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxProjectionMutationBytesPerVariant || cost.projectionMutationBytes > MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxProjectionMutationBytesPerClaim;
}
function storedMediaUsageSourceByteLength(source) {
	return new TextEncoder().encode(JSON.stringify(source)).byteLength;
}
async function refreshContentMediaUsage(db, collectionSlug, contentId) {
	validateIdentifier(collectionSlug, "collection slug");
	return withContentUsageCollectionLock(collectionSlug, () => withContentUsageLock(collectionSlug, contentId, () => refreshContentMediaUsageUnlocked(db, collectionSlug, contentId, {})));
}
async function refreshContentMediaUsageForWorkBatch(db, items, options = {}) {
	const results = /* @__PURE__ */ new Map();
	const batchBudget = createContentMediaUsageAdmissionBudget({
		maxOccurrenceMutationUnits: MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxOccurrenceMutationUnitsPerBatch,
		maxProjectionMutationBytes: MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxProjectionMutationBytesPerBatch
	});
	const collections = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = `${item.collectionId}\u0000${item.collectionSlug}`;
		const collectionItems = collections.get(key) ?? [];
		collectionItems.push(item);
		collections.set(key, collectionItems);
	}
	for (const collectionItems of collections.values()) {
		if (options.shouldContinue && !options.shouldContinue()) break;
		const first = collectionItems[0];
		if (!first) continue;
		validateIdentifier(first.collectionSlug, "collection slug");
		if (!first.collectionId) throw new Error("Durable media usage work requires a collection identity");
		await withContentUsageCollectionLock(first.collectionSlug, async () => {
			const fieldDiscovery = await loadContentMediaUsageFields(db, first.collectionSlug, first.collectionId);
			const sourceKeys = collectionItems.flatMap((item) => contentSourceKeys(item.collectionSlug, item.contentId, item.collectionId));
			const repo = new MediaUsageRepository(db);
			const observedSources = await repo.findSources(sourceKeys);
			const snapshots = await loadContentMediaUsageSnapshotsBatch(db, first.collectionSlug, collectionItems.map((item) => item.contentId), fieldDiscovery, {
				collectionId: first.collectionId,
				identityVersion: 1
			}, {
				shouldContinue: options.shouldContinue,
				maxOccurrenceCount: MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxOccurrenceMutationUnitsPerBatch,
				maxProjectionBytes: MEDIA_USAGE_PROJECTION_ADMISSION_LIMITS.maxProjectionMutationBytesPerBatch
			});
			const newSourceProjections = [];
			const newSourceKeys = /* @__PURE__ */ new Map();
			const existingSourceProjections = [];
			const unchangedSourceProjections = [];
			const existingSourceKeys = /* @__PURE__ */ new Map();
			for (const item of collectionItems) {
				if (options.shouldContinue && !options.shouldContinue()) break;
				const snapshotsResult = snapshots.get(item.contentId);
				const itemSourceKeys = contentSourceKeys(item.collectionSlug, item.contentId, item.collectionId);
				if (!snapshotsResult?.success) continue;
				const snapshotsByKey = new Map(snapshotsResult.snapshots.map((snapshot) => [snapshot.source.sourceKey, snapshot]));
				const existing = itemSourceKeys.map((sourceKey) => observedSources.get(sourceKey)).filter((source) => source !== void 0);
				const allNew = existing.length === 0;
				const allExisting = existing.length === snapshotsResult.snapshots.length && existing.every((source) => snapshotsByKey.has(source.sourceKey));
				if (!allNew && !allExisting) continue;
				const admission = await planContentMediaUsageProjectionAdmission(repo, snapshotsResult.snapshots, observedSources, itemSourceKeys, batchBudget);
				if (admission.outcome === "claim_budget_deferred") break;
				if (admission.outcome !== "admitted") {
					results.set(contentRefreshKey(item.collectionId, item.contentId), admissionFailureResult(admission.outcome));
					continue;
				}
				const key = contentRefreshKey(item.collectionId, item.contentId);
				if (allNew) {
					newSourceProjections.push(...snapshotsResult.snapshots.map((snapshot) => ({
						source: snapshot.source,
						occurrences: snapshot.occurrences
					})));
					newSourceKeys.set(key, snapshotsResult.snapshots.map((snapshot) => snapshot.source.sourceKey));
					continue;
				}
				const changed = [];
				const unchanged = [];
				for (const snapshot of snapshotsResult.snapshots) {
					const expectedSource = observedSources.get(snapshot.source.sourceKey);
					if (!expectedSource) continue;
					if (expectedSource.sourceFingerprint === snapshot.source.sourceFingerprint && expectedSource.sourceCompleteness === (snapshot.source.sourceCompleteness ?? "complete") && expectedSource.lastErrorCode === null) {
						unchanged.push(snapshot.source.sourceKey);
						unchangedSourceProjections.push({
							source: snapshot.source,
							occurrences: snapshot.occurrences,
							expectedSource
						});
						continue;
					}
					changed.push(snapshot.source.sourceKey);
					existingSourceProjections.push({
						source: snapshot.source,
						occurrences: snapshot.occurrences,
						expectedSource
					});
				}
				existingSourceKeys.set(key, {
					allCount: snapshotsResult.snapshots.length,
					changed,
					unchanged
				});
			}
			const insertedSourceKeys = await repo.replaceNewSourcesBatch(newSourceProjections);
			const replacedSourceKeys = await repo.replaceExistingSourcesBatch(existingSourceProjections);
			const matchedSourceKeys = await repo.matchingExistingSourcesBatch(unchangedSourceProjections);
			for (const [key, expectedSourceKeys] of newSourceKeys) results.set(key, expectedSourceKeys.every((sourceKey) => insertedSourceKeys.has(sourceKey)) ? {
				success: true,
				refreshedSourceCount: expectedSourceKeys.length,
				deletedSourceCount: 0,
				failedSourceCount: 0
			} : generationConflictResult({
				refreshedSourceCount: 0,
				deletedSourceCount: 0
			}));
			for (const [key, expected] of existingSourceKeys) results.set(key, expected.changed.every((sourceKey) => replacedSourceKeys.has(sourceKey)) && expected.unchanged.every((sourceKey) => matchedSourceKeys.has(sourceKey)) ? {
				success: true,
				refreshedSourceCount: expected.allCount,
				deletedSourceCount: 0,
				failedSourceCount: 0
			} : generationConflictResult({
				refreshedSourceCount: 0,
				deletedSourceCount: 0
			}));
			for (const item of collectionItems) {
				if (options.shouldContinue && !options.shouldContinue()) break;
				const key = contentRefreshKey(item.collectionId, item.contentId);
				if (!snapshots.has(item.contentId)) continue;
				if (results.has(key)) continue;
				const result = await withContentUsageLock(item.collectionSlug, item.contentId, () => refreshContentMediaUsageUnlocked(db, item.collectionSlug, item.contentId, {
					collectionId: item.collectionId,
					durableWork: true,
					fieldDiscovery,
					observedSources,
					snapshotsResult: snapshots.get(item.contentId)
				}));
				results.set(key, result);
			}
		});
	}
	return results;
}
async function refreshContentMediaUsageUnlocked(db, collectionSlug, contentId, options) {
	try {
		let conflictResult = null;
		if (options.durableWork) options.admissionBudget = createContentMediaUsageAdmissionBudget();
		for (let attempt = 0; attempt < CONTENT_USAGE_REFRESH_MAX_ATTEMPTS; attempt++) {
			const result = await refreshContentMediaUsageAttempt(db, collectionSlug, contentId, options);
			if (result.errorCode !== "CONTENT_USAGE_GENERATION_CONFLICT") return result;
			conflictResult = result;
			if (options.admissionBudget?.hasReservedMutation) break;
		}
		if (options.durableWork) return generationConflictResult({
			refreshedSourceCount: conflictResult?.refreshedSourceCount ?? 0,
			deletedSourceCount: conflictResult?.deletedSourceCount ?? 0
		});
		return markGenerationConflict(db, collectionSlug, {
			refreshedSourceCount: conflictResult?.refreshedSourceCount ?? 0,
			deletedSourceCount: conflictResult?.deletedSourceCount ?? 0
		});
	} catch (error) {
		console.error(`[media-usage] Failed to refresh ${collectionSlug}/${contentId}:`, error);
		if (!options.durableWork) await markContentMediaUsageCollectionStaleSafely(db, collectionSlug, "CONTENT_USAGE_REFRESH_ERROR");
		return {
			success: false,
			refreshedSourceCount: 0,
			deletedSourceCount: 0,
			failedSourceCount: 0,
			errorCode: "CONTENT_USAGE_REFRESH_ERROR"
		};
	}
}
async function refreshContentMediaUsageAttempt(db, collectionSlug, contentId, options) {
	const repo = new MediaUsageRepository(db);
	const canonicalSourceKeys = contentSourceKeys(collectionSlug, contentId, options.collectionId);
	const observedSources = options.observedSources ?? await repo.findSources(canonicalSourceKeys);
	const snapshotsResult = options.snapshotsResult ?? await loadContentMediaUsageSnapshots(db, collectionSlug, contentId, options.fieldDiscovery, options.collectionId ? {
		collectionId: options.collectionId,
		identityVersion: 1
	} : void 0);
	if (!snapshotsResult.success) {
		if (snapshotsResult.error === "CONTENT_NOT_FOUND" && options.collectionId) {
			if (!options.admissionBudget) throw new Error("Durable media usage work requires an admission budget");
			const admission = await planContentMediaUsageProjectionAdmission(repo, [], observedSources, canonicalSourceKeys, options.admissionBudget);
			if (admission.outcome !== "admitted") return admissionFailureResult(admission.outcome);
			return deleteCanonicalContentSourcesIfAbsent(repo, admission.absentSources, collectionSlug, contentId);
		}
		if (snapshotsResult.error === "CONTENT_NOT_FOUND" && !await contentCollectionExists(db, collectionSlug)) {
			const deletedSourceCount = await repo.deleteContentSources(collectionSlug, contentId);
			return {
				...ZERO_RESULT,
				deletedSourceCount
			};
		}
		return options.durableWork ? snapshotFailureResult(snapshotsResult) : markSnapshotFailure(db, collectionSlug, snapshotsResult);
	}
	if (!options.collectionId && !await contentCollectionExists(db, collectionSlug)) {
		const deletedSourceCount = await repo.deleteContentSources(collectionSlug, contentId);
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	}
	const admission = options.admissionBudget ? await planContentMediaUsageProjectionAdmission(repo, snapshotsResult.snapshots, observedSources, canonicalSourceKeys, options.admissionBudget) : null;
	if (admission && admission.outcome !== "admitted") return admissionFailureResult(admission.outcome);
	let refreshedSourceCount = 0;
	for (const snapshot of snapshotsResult.snapshots) {
		if (admission?.outcome === "admitted" && admission.noOpSourceKeys.has(snapshot.source.sourceKey)) {
			refreshedSourceCount++;
			continue;
		}
		const result = await repo.replaceSourceIfMatching(snapshot.source, snapshot.occurrences, observedSources.get(snapshot.source.sourceKey) ?? null);
		if (result.unchanged) {
			refreshedSourceCount++;
			continue;
		}
		if (!result.replaced) return generationConflictResult({
			refreshedSourceCount,
			deletedSourceCount: 0
		});
		refreshedSourceCount++;
	}
	if (!options.collectionId && !await contentCollectionExists(db, collectionSlug)) {
		const deletedSourceCount = await repo.deleteContentSources(collectionSlug, contentId);
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	}
	const expectedSourceKeys = new Set(snapshotsResult.snapshots.map((snapshot) => snapshot.source.sourceKey));
	const absentSources = admission?.outcome === "admitted" ? admission.absentSources : canonicalSourceKeys.filter((sourceKey) => !expectedSourceKeys.has(sourceKey)).map((sourceKey) => observedSources.get(sourceKey)).filter((source) => source !== void 0);
	let deletedSourceCount = 0;
	for (const expectedSource of absentSources) {
		const result = await repo.deleteSourceIfMatching(expectedSource.sourceKey, expectedSource);
		if (result.deleted) {
			deletedSourceCount++;
			continue;
		}
		if (result.source) return generationConflictResult({
			refreshedSourceCount,
			deletedSourceCount
		});
	}
	return {
		success: true,
		refreshedSourceCount,
		deletedSourceCount,
		failedSourceCount: 0
	};
}
function contentRefreshKey(collectionId, contentId) {
	return `${collectionId}\u0000${contentId}`;
}
function contentSourceKeys(collectionSlug, contentId, collectionId) {
	return MEDIA_USAGE_CONTENT_SOURCE_VARIANTS.map((sourceVariant) => buildContentMediaUsageSourceKey({
		collectionId,
		collectionSlug,
		contentId,
		sourceVariant
	}));
}
function admissionFailureResult(outcome) {
	return {
		...generationConflictResult({
			refreshedSourceCount: 0,
			deletedSourceCount: 0
		}),
		errorCode: outcome === "intrinsic_resource_limit" ? "CONTENT_USAGE_RESOURCE_LIMIT" : "CONTENT_USAGE_GENERATION_CONFLICT"
	};
}
async function markGenerationConflict(db, collectionSlug, counts) {
	await markContentMediaUsageCollectionStaleSafely(db, collectionSlug, "CONTENT_USAGE_GENERATION_CONFLICT");
	return {
		success: false,
		refreshedSourceCount: counts.refreshedSourceCount,
		deletedSourceCount: counts.deletedSourceCount,
		failedSourceCount: 0,
		errorCode: "CONTENT_USAGE_GENERATION_CONFLICT"
	};
}
function generationConflictResult(counts) {
	return {
		success: false,
		refreshedSourceCount: counts.refreshedSourceCount,
		deletedSourceCount: counts.deletedSourceCount,
		failedSourceCount: 0,
		errorCode: "CONTENT_USAGE_GENERATION_CONFLICT"
	};
}
async function contentCollectionExists(db, collectionSlug, collectionId) {
	let query = db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug);
	if (collectionId) query = query.where("id", "=", collectionId);
	return await query.executeTakeFirst() !== void 0;
}
async function deleteContentMediaUsage(db, collectionSlug, contentId) {
	validateIdentifier(collectionSlug, "collection slug");
	return withContentUsageCollectionLock(collectionSlug, () => withContentUsageLock(collectionSlug, contentId, () => deleteContentMediaUsageUnlocked(db, collectionSlug, contentId)));
}
async function deleteContentMediaUsageUnlocked(db, collectionSlug, contentId) {
	try {
		const deletedSourceCount = await new MediaUsageRepository(db).deleteContentSources(collectionSlug, contentId);
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	} catch (error) {
		console.error(`[media-usage] Failed to delete usage for ${collectionSlug}/${contentId}:`, error);
		await markContentMediaUsageCollectionStaleSafely(db, collectionSlug, "CONTENT_USAGE_DELETE_ERROR");
		return {
			success: false,
			refreshedSourceCount: 0,
			deletedSourceCount: 0,
			failedSourceCount: 0,
			errorCode: "CONTENT_USAGE_DELETE_ERROR"
		};
	}
}
async function deleteContentMediaUsageCollection(db, collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	return withContentUsageCollectionLock(collectionSlug, () => deleteContentMediaUsageCollectionUnlocked(db, collectionSlug));
}
async function deleteContentMediaUsageCollectionUnlocked(db, collectionSlug) {
	try {
		const repo = new MediaUsageRepository(db);
		const deletedSourceCount = await repo.deleteCollectionSources(collectionSlug);
		await repo.deleteIndexStatus({
			adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
			scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
			scopeKey: collectionSlug
		});
		return {
			...ZERO_RESULT,
			deletedSourceCount
		};
	} catch (error) {
		console.error(`[media-usage] Failed to delete usage for collection ${collectionSlug}:`, error);
		try {
			await new MediaUsageRepository(db).deleteIndexStatus({
				adapterId: CONTENT_MEDIA_USAGE_ADAPTER_ID,
				scopeType: CONTENT_MEDIA_USAGE_COLLECTION_SCOPE,
				scopeKey: collectionSlug
			});
		} catch (statusError) {
			console.error(`[media-usage] Failed to clear usage status for deleted collection ${collectionSlug}:`, statusError);
		}
		return {
			success: false,
			refreshedSourceCount: 0,
			deletedSourceCount: 0,
			failedSourceCount: 0,
			errorCode: "CONTENT_USAGE_DELETE_ERROR"
		};
	}
}
async function refreshContentMediaUsageAfterWrite(db, collectionSlug, contentId) {
	const result = await refreshContentMediaUsage(db, collectionSlug, contentId);
	if (!result.success) console.error(`[media-usage] Usage refresh for ${collectionSlug}/${contentId} finished with ${result.errorCode}`);
}
async function findNonTranslatableSiblingContentIds(db, collectionSlug, updatedContentId, translationGroup, updatedData, options = {}) {
	if (!isI18nEnabled() || !updatedData || !translationGroup) return [];
	validateIdentifier(collectionSlug, "collection slug");
	const collection = await db.selectFrom("_emdash_collections").select("id").where("slug", "=", collectionSlug).executeTakeFirst();
	if (!collection) return [];
	const touchedNonTranslatableSlugs = (await db.selectFrom("_emdash_fields").select("slug").where("collection_id", "=", collection.id).where("translatable", "=", 0).execute()).filter((field) => options.absentAsCleared || field.slug in updatedData).map((field) => field.slug);
	if (touchedNonTranslatableSlugs.length === 0) return [];
	const usageFields = await loadContentMediaUsageFields(db, collectionSlug);
	const usageRelevantSlugs = /* @__PURE__ */ new Set([...usageFields.extractionFields.map((field) => field.slug), ...usageFields.displayFieldSlugs]);
	if (!touchedNonTranslatableSlugs.some((slug) => usageRelevantSlugs.has(slug))) return [];
	const tableName = `ec_${collectionSlug}`;
	return (await sql`
		SELECT id
		FROM ${sql.ref(tableName)}
		WHERE translation_group = ${translationGroup}
		AND id != ${updatedContentId}
		ORDER BY id ASC
	`.execute(db)).rows.map((row) => row.id);
}
async function markSnapshotFailure(db, collectionSlug, result) {
	const repo = new MediaUsageRepository(db);
	if (result.source) await repo.markSourceAttempted({
		...result.source,
		sourceCompleteness: "failed",
		lastErrorCode: result.error
	});
	await markContentMediaUsageCollectionStale(db, collectionSlug, result.error);
	return {
		success: false,
		refreshedSourceCount: 0,
		deletedSourceCount: 0,
		failedSourceCount: result.source ? 1 : 0,
		errorCode: result.error
	};
}
function snapshotFailureResult(result) {
	return {
		success: false,
		refreshedSourceCount: 0,
		deletedSourceCount: 0,
		failedSourceCount: result.source ? 1 : 0,
		errorCode: result.error
	};
}
async function deleteCanonicalContentSourcesIfAbsent(repo, observedSources, collectionSlug, contentId) {
	let deletedSourceCount = 0;
	for (const source of observedSources) {
		const result = await repo.deleteSourceIfMatchingContentAbsent(source.sourceKey, source, collectionSlug, contentId);
		if (result.deleted) {
			deletedSourceCount++;
			continue;
		}
		if (result.contentPresent || result.source) return generationConflictResult({
			refreshedSourceCount: 0,
			deletedSourceCount
		});
	}
	return {
		...ZERO_RESULT,
		deletedSourceCount
	};
}
async function withContentUsageLock(collectionSlug, contentId, fn) {
	const locks = getContentUsageLocks();
	const lockKey = `${collectionSlug}\0${contentId}`;
	const previous = locks.get(lockKey) ?? Promise.resolve();
	let releaseCurrent;
	const current = new Promise((resolve) => {
		releaseCurrent = resolve;
	});
	const next = previous.catch(() => {}).then(() => current);
	locks.set(lockKey, next);
	try {
		await previous.catch(() => {});
		return await fn();
	} finally {
		releaseCurrent();
		if (locks.get(lockKey) === next) locks.delete(lockKey);
	}
}
async function withContentUsageCollectionLock(collectionSlug, fn) {
	const locks = getContentUsageCollectionLocks();
	const previous = locks.get(collectionSlug) ?? Promise.resolve();
	let releaseCurrent;
	const current = new Promise((resolve) => {
		releaseCurrent = resolve;
	});
	const next = previous.catch(() => {}).then(() => current);
	locks.set(collectionSlug, next);
	try {
		await previous.catch(() => {});
		return await fn();
	} finally {
		releaseCurrent();
		if (locks.get(collectionSlug) === next) locks.delete(collectionSlug);
	}
}
function getContentUsageLocks() {
	const global = globalThis;
	const existing = global[CONTENT_USAGE_LOCKS_KEY];
	if (existing instanceof Map) return existing;
	const locks = /* @__PURE__ */ new Map();
	global[CONTENT_USAGE_LOCKS_KEY] = locks;
	return locks;
}
function getContentUsageCollectionLocks() {
	const global = globalThis;
	const existing = global[CONTENT_USAGE_COLLECTION_LOCKS_KEY];
	if (existing instanceof Map) return existing;
	const locks = /* @__PURE__ */ new Map();
	global[CONTENT_USAGE_COLLECTION_LOCKS_KEY] = locks;
	return locks;
}
var MEDIA_USAGE_COLLECTION_DELETION_LIMITS = Object.freeze({
	candidatesPerTick: 4,
	rowsPerBatch: 50,
	leaseDurationSeconds: 300,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900
});
async function processDueMediaUsageCollectionDeletions(db) {
	const repository = new MediaUsageCollectionDeletionRepository(db);
	const candidates = await repository.findDue(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.candidatesPerTick);
	if (candidates.length === 0) return {
		candidateCount: await repository.hasNonterminal() ? 1 : 0,
		claimedCount: 0,
		outcome: "idle"
	};
	let claim = null;
	for (const candidate of candidates) {
		claim = await repository.claim({
			collectionId: candidate.collectionId,
			phase: candidate.phase,
			leaseDurationSeconds: MEDIA_USAGE_COLLECTION_DELETION_LIMITS.leaseDurationSeconds
		});
		if (claim?.leaseToken) break;
	}
	if (!claim?.leaseToken) return {
		candidateCount: candidates.length,
		claimedCount: 0,
		outcome: "claim_lost"
	};
	return {
		candidateCount: candidates.length,
		claimedCount: 1,
		outcome: await runClaimedDeletion(db, repository, claim)
	};
}
/**
* Advance the given collection's deletion by one step. Returns `idle` when the
* deletion can't be claimed now: another request holds its lease, it is
* waiting out a retry, or it failed.
*/
async function processMediaUsageCollectionDeletion(db, deletion) {
	const repository = new MediaUsageCollectionDeletionRepository(db);
	const claim = await repository.claim({
		collectionId: deletion.collectionId,
		phase: deletion.phase,
		leaseDurationSeconds: MEDIA_USAGE_COLLECTION_DELETION_LIMITS.leaseDurationSeconds
	});
	if (!claim) return "idle";
	return runClaimedDeletion(db, repository, claim);
}
async function runClaimedDeletion(db, repository, claim) {
	try {
		const processed = await processClaimedDeletion(db, claim);
		if (!processed.finalized && !processed.released && !await repository.release(claim)) return "claim_lost";
		return processed.finalized ? "finalized" : "progress";
	} catch (error) {
		const terminal = claim.attemptCount + 1 >= MEDIA_USAGE_COLLECTION_DELETION_LIMITS.maxAttempts;
		if (!await repository.recordFailure({
			collectionId: claim.collectionId,
			leaseToken: claim.leaseToken,
			errorCode: "MEDIA_USAGE_COLLECTION_DELETION_FAILED",
			terminal,
			retryDelaySeconds: retryDelaySeconds$2(claim.attemptCount)
		})) return "claim_lost";
		console.error("[media-usage:collection-deletion] Processing failed:", error);
		return terminal ? "failed" : "retry";
	}
}
async function processClaimedDeletion(db, claim) {
	if (claim.phase === "fence" || claim.phase === "registry" || claim.phase === "table") {
		await deleteActivatedMediaUsageCollection(db, {
			collectionId: claim.collectionId,
			collectionSlug: claim.collectionSlug,
			forceDelete: claim.forceDelete
		}, {
			frontPhaseLimit: 1,
			claimed: claim
		});
		return {
			finalized: false,
			released: true
		};
	}
	if (claim.phase === "work") await processWorkBatch(db, claim);
	if (claim.phase === "sources") await processSourceBatch(db, claim);
	if (claim.phase === "status") await processStatus(db, claim);
	if (claim.phase === "finalize") {
		await finalizeDeletion(db, claim);
		return {
			finalized: true,
			released: true
		};
	}
	return {
		finalized: false,
		released: false
	};
}
async function processWorkBatch(db, claim) {
	await withTransaction(db, async (trx) => {
		const rows = await trx.selectFrom("_emdash_media_usage_work").select("content_id").where("collection_id", "=", claim.collectionId).$if(claim.workCursor !== null, (query) => query.where("content_id", ">", claim.workCursor)).orderBy("content_id", "asc").limit(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch + 1).execute();
		const batch = rows.slice(0, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch);
		if (batch.length > 0) await trx.deleteFrom("_emdash_media_usage_work").where("collection_id", "=", claim.collectionId).where("content_id", "in", batch.map((row) => row.content_id)).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, {
			phase: rows.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch ? "work" : "sources",
			work_cursor: rows.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch ? batch.at(-1).content_id : null
		});
	});
	return false;
}
async function processSourceBatch(db, claim) {
	await withTransaction(db, async (trx) => {
		let sourceKey = claim.sourceKey;
		if (!sourceKey) {
			const source = await trx.selectFrom("_emdash_media_usage_sources").select("source_key").where("source_type", "=", "content").where("collection_id", "=", claim.collectionId).orderBy("source_key", "asc").limit(1).executeTakeFirst();
			if (!source) {
				await updateDeletion(trx, claim, {
					phase: "status",
					source_key: null,
					occurrence_cursor: null
				});
				return;
			}
			sourceKey = source.source_key;
			await updateDeletion(trx, claim, {
				source_key: sourceKey,
				occurrence_cursor: null
			});
		}
		const occurrences = await trx.selectFrom("_emdash_media_usage").select("id").where("source_key", "=", sourceKey).$if(claim.occurrenceCursor !== null, (query) => query.where("id", ">", claim.occurrenceCursor)).orderBy("id", "asc").limit(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch + 1).execute();
		const batch = occurrences.slice(0, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch);
		if (batch.length > 0) await trx.deleteFrom("_emdash_media_usage").where("source_key", "=", sourceKey).where("id", "in", batch.map((row) => row.id)).where(liveLeaseGuard(trx, claim)).execute();
		if (occurrences.length > MEDIA_USAGE_COLLECTION_DELETION_LIMITS.rowsPerBatch) {
			await updateDeletion(trx, claim, {
				source_key: sourceKey,
				occurrence_cursor: batch.at(-1).id
			});
			return;
		}
		await trx.deleteFrom("_emdash_media_usage_sources").where("source_key", "=", sourceKey).where("source_type", "=", "content").where("collection_id", "=", claim.collectionId).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, {
			source_key: null,
			occurrence_cursor: null
		});
	});
	return false;
}
async function processStatus(db, claim) {
	await withTransaction(db, async (trx) => {
		if (await exactCleanupRowsRemain(trx, claim, false)) throw new Error("Collection deletion cleanup is incomplete");
		await trx.deleteFrom("_emdash_media_usage_reconciliations").where("collection_id", "=", claim.collectionId).where("collection_slug", "=", claim.collectionSlug).where(liveLeaseGuard(trx, claim)).execute();
		await trx.deleteFrom("_emdash_media_usage_index_status").where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", claim.collectionSlug).where("collection_id", "=", claim.collectionId).where(liveLeaseGuard(trx, claim)).execute();
		await updateDeletion(trx, claim, { phase: "finalize" });
	});
	return false;
}
async function finalizeDeletion(db, claim) {
	if (await tableExists(db, `ec_${claim.collectionSlug}`)) throw new Error("Collection table still exists during deletion finalization");
	if (await exactCleanupRowsRemain(db, claim)) throw new Error("Collection deletion is incomplete");
	if (await db.selectFrom("_emdash_collections").select("id").where("id", "=", claim.collectionId).where("slug", "=", claim.collectionSlug).executeTakeFirst()) throw new Error("Collection registry identity still exists");
	const result = await db.deleteFrom("_emdash_media_usage_collection_deletions").where("collection_id", "=", claim.collectionId).where("collection_slug", "=", claim.collectionSlug).where("state", "=", "leased").where("phase", "=", "finalize").where("lease_token", "=", claim.leaseToken).where(liveLeaseGuard(db, claim)).executeTakeFirst();
	if (Number(result.numDeletedRows ?? 0) !== 1) throw new Error("Collection deletion lost finalization");
	return true;
}
async function exactCleanupRowsRemain(db, claim, includeStatus = true) {
	const row = (await sql`
		SELECT
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_work
				WHERE collection_id = ${claim.collectionId}
			) AS work_present,
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_sources
				WHERE source_type = 'content' AND collection_id = ${claim.collectionId}
			) AS source_present,
			EXISTS (
				SELECT 1 FROM _emdash_media_usage_index_status
				WHERE adapter_id = 'content-media'
					AND scope_type = 'collection'
					AND scope_key = ${claim.collectionSlug}
					AND collection_id = ${claim.collectionId}
			) AS status_present
	`.execute(db)).rows[0];
	return Boolean(row?.work_present) || Boolean(row?.source_present) || includeStatus && Boolean(row?.status_present);
}
async function updateDeletion(db, claim, values) {
	const result = await db.updateTable("_emdash_media_usage_collection_deletions").set({
		...values,
		attempt_count: 0,
		last_error_code: null,
		updated_at: collectionDeletionCurrentTimestamp(db)
	}).where("collection_id", "=", claim.collectionId).where("state", "=", "leased").where("lease_token", "=", claim.leaseToken).where(liveLeaseGuard(db, claim)).executeTakeFirst();
	if (Number(result.numUpdatedRows ?? 0) !== 1) throw new Error("Collection deletion lease was lost");
}
function liveLeaseGuard(db, claim) {
	return isPostgres(db) ? sql`EXISTS (
			SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
			WHERE deletion.collection_id = ${claim.collectionId}
				AND deletion.state = 'leased'
				AND deletion.lease_token = ${claim.leaseToken}
				AND deletion.lease_expires_at::timestamptz > clock_timestamp()
		)` : sql`EXISTS (
			SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
			WHERE deletion.collection_id = ${claim.collectionId}
				AND deletion.state = 'leased'
				AND deletion.lease_token = ${claim.leaseToken}
				AND deletion.lease_expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
		)`;
}
function retryDelaySeconds$2(attemptCount) {
	return Math.min(MEDIA_USAGE_COLLECTION_DELETION_LIMITS.retryMaxSeconds, MEDIA_USAGE_COLLECTION_DELETION_LIMITS.retryBaseSeconds * 2 ** attemptCount);
}
var ACTIVATION_KEY = "incremental_capture";
var CONTENT_ADAPTER_ID = "content-media";
var COLLECTION_SCOPE = "collection";
var MAX_CANDIDATES = 100;
var MAX_PORTABLE_DURATION_SECONDS = 31536e3;
var STABLE_ERROR_CODE_PATTERN = /^[A-Z][A-Z0-9_]{0,63}$/;
var MediaUsageReconciliationRepository = class {
	constructor(db) {
		this.db = db;
	}
	async findByIdentity(collectionId, runToken) {
		assertIdentity({
			collectionId,
			runToken
		});
		const row = await this.db.selectFrom("_emdash_media_usage_reconciliations").selectAll().where("collection_id", "=", collectionId).where("run_token", "=", runToken).executeTakeFirst();
		return row ? rowToRecord(row) : null;
	}
	async beginRun(claim) {
		const now = timestampOffset(this.db, 0);
		const sameRun = sql`status = 'running' AND cursor = ${claim.runToken}`;
		return (await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			status: "running",
			started_at: sql`CASE WHEN ${sameRun} THEN started_at ELSE ${now} END`,
			completed_at: null,
			cursor: claim.runToken,
			indexed_source_count: 0,
			failed_source_count: 0,
			last_error_code: null,
			change_epoch: sql`CASE WHEN ${sameRun} THEN change_epoch ELSE change_epoch + 1 END`,
			reconciliation_required: 1,
			updated_at: now
		}).where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.collection_id", "=", claim.collectionId).where("status.scope_key", "=", claim.collectionSlug).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1).where((eb) => eb.or([eb("status.status", "!=", "running"), eb("status.cursor", "=", claim.runToken)])).where(this.liveClaimExists(claim)).returning("change_epoch").executeTakeFirst())?.change_epoch ?? null;
	}
	async findScanUpperId(claim) {
		const tableName = contentTableName(claim.collectionSlug);
		return (await sql`
			SELECT content.id
			FROM ${sql.ref(tableName)} AS content
			WHERE ${this.liveClaimExistsSql(claim)}
			ORDER BY content.id DESC
			LIMIT 1
		`.execute(this.db)).rows[0]?.id ?? null;
	}
	async initializeScan(input) {
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			target_epoch: input.targetEpoch,
			field_fingerprint: input.fieldFingerprint,
			phase: "scan",
			scan_cursor: null,
			scan_upper_id: input.scanUpperId,
			source_cursor: null,
			source_upper_key: null,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "is", null).where("reconciliation.state", "=", "leased").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db)).where(this.statusOwnsRun(input.claim, input.targetEpoch)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async findScanPage(reconciliation, limit) {
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1e3) throw new Error("Reconciliation scan page limit must be from 1 to 1000");
		if (!reconciliation.leaseToken || reconciliation.targetEpoch === null) return [];
		const tableName = contentTableName(reconciliation.collectionSlug);
		const lowerBound = reconciliation.scanCursor ? sql`AND content.id > ${reconciliation.scanCursor}` : sql``;
		const upperBound = reconciliation.scanUpperId ? sql`AND content.id <= ${reconciliation.scanUpperId}` : sql`AND 1 = 0`;
		return (await sql`
			SELECT content.id
			FROM ${sql.ref(tableName)} AS content
			WHERE 1 = 1
				${lowerBound}
				${upperBound}
				AND ${this.liveClaimExistsSql(reconciliation)}
			ORDER BY content.id ASC
			LIMIT ${limit}
		`.execute(this.db)).rows.map((row) => row.id);
	}
	async checkpointScan(input) {
		let query = this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			scan_cursor: input.nextCursor,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "=", input.targetEpoch).where("reconciliation.state", "=", "leased").where("reconciliation.phase", "=", "scan").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db)).where(this.statusOwnsRun(input.claim, input.targetEpoch));
		query = input.previousCursor ? query.where("reconciliation.scan_cursor", "=", input.previousCursor) : query.where("reconciliation.scan_cursor", "is", null);
		const result = await query.executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async ownsRun(claim, targetEpoch) {
		const result = await sql`
			SELECT ${this.statusOwnsRun(claim, targetEpoch)} AS owned
		`.execute(this.db);
		return Boolean(result.rows[0]?.owned);
	}
	async restartRun(claim, previousEpoch) {
		const now = timestampOffset(this.db, 0);
		const interruptedRestart = sql`status = 'running'
			AND cursor = ${claim.runToken}
			AND change_epoch > ${previousEpoch}`;
		return (await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			status: "running",
			started_at: sql`CASE WHEN ${interruptedRestart} THEN started_at ELSE ${now} END`,
			completed_at: null,
			cursor: claim.runToken,
			last_error_code: null,
			change_epoch: sql`CASE WHEN ${interruptedRestart} THEN change_epoch ELSE change_epoch + 1 END`,
			reconciliation_required: 1,
			updated_at: now
		}).where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.collection_id", "=", claim.collectionId).where("status.scope_key", "=", claim.collectionSlug).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1).where((eb) => eb.or([eb("status.status", "!=", "running"), eb("status.cursor", "=", claim.runToken)])).where(this.liveClaimExists(claim)).returning("change_epoch").executeTakeFirst())?.change_epoch ?? null;
	}
	async restartScan(input) {
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			target_epoch: input.targetEpoch,
			field_fingerprint: input.fieldFingerprint,
			phase: "scan",
			scan_cursor: null,
			scan_upper_id: input.scanUpperId,
			source_cursor: null,
			source_upper_key: null,
			attempt_count: 0,
			next_attempt_at: timestampOffset(this.db, 0),
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "=", input.previousEpoch).where("reconciliation.state", "=", "leased").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db)).where(this.statusOwnsRun(input.claim, input.targetEpoch)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async findWorkBarrier(collectionId) {
		if (!collectionId) throw new Error("Reconciliation work barrier requires a collection ID");
		const failed = await this.db.selectFrom("_emdash_media_usage_work").select("last_error_code").where("collection_id", "=", collectionId).where("state", "=", "failed").orderBy("content_id").limit(1).executeTakeFirst();
		if (failed) return {
			state: "failed",
			errorCode: failed.last_error_code ?? "MEDIA_USAGE_PROCESSING_FAILED"
		};
		return await this.db.selectFrom("_emdash_media_usage_work").select("content_id").where("collection_id", "=", collectionId).limit(1).executeTakeFirst() ? { state: "pending" } : { state: "empty" };
	}
	async findSourceUpperKey(claim, targetEpoch) {
		return (await this.db.selectFrom("_emdash_media_usage_sources as source").select("source.source_key").where("source.source_type", "=", "content").where("source.collection_id", "=", claim.collectionId).where("source.identity_version", "=", 1).where(this.liveClaimExists(claim)).where(this.statusOwnsRun(claim, targetEpoch)).orderBy("source.source_key", "desc").limit(1).executeTakeFirst())?.source_key ?? null;
	}
	async transitionToSources(input) {
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			phase: "sources",
			source_cursor: null,
			source_upper_key: input.sourceUpperKey,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "=", input.targetEpoch).where("reconciliation.field_fingerprint", "=", input.fieldFingerprint).where("reconciliation.state", "=", "leased").where("reconciliation.phase", "=", "scan").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db)).where(this.statusOwnsRun(input.claim, input.targetEpoch)).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_work as work").select("work.content_id").where("work.collection_id", "=", input.claim.collectionId)))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async findSourcePage(reconciliation, limit) {
		if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1e3) throw new Error("Reconciliation source page limit must be from 1 to 1000");
		if (!reconciliation.leaseToken || reconciliation.targetEpoch === null) return [];
		let query = this.db.selectFrom("_emdash_media_usage_sources as source").select([
			"source.source_key",
			"source.content_id",
			"source.source_variant"
		]).where("source.source_type", "=", "content").where("source.collection_id", "=", reconciliation.collectionId).where("source.identity_version", "=", 1).where(this.liveClaimExists(reconciliation)).where(this.statusOwnsRun(reconciliation, reconciliation.targetEpoch));
		if (reconciliation.sourceCursor) query = query.where("source.source_key", ">", reconciliation.sourceCursor);
		if (reconciliation.sourceUpperKey) query = query.where("source.source_key", "<=", reconciliation.sourceUpperKey);
		else query = query.where(sql`1 = 0`);
		return (await query.orderBy("source.source_key").limit(limit).execute()).map((row) => ({
			sourceKey: row.source_key,
			contentId: row.content_id,
			sourceVariant: row.source_variant
		}));
	}
	async findMissingContentIds(collectionSlug, contentIds) {
		const unique = [...new Set(contentIds)];
		if (unique.length === 0) return [];
		if (unique.length > 1e3 || unique.some((contentId) => !contentId)) throw new Error("Reconciliation source page has invalid content identity");
		const tableName = contentTableName(collectionSlug);
		const existing = await sql`
			WITH requested AS (${jsonTextValues(this.db, unique)})
			SELECT content.id
			FROM ${sql.ref(tableName)} AS content
			INNER JOIN requested ON requested.value = content.id
		`.execute(this.db);
		const present = new Set(existing.rows.map((row) => row.id));
		return unique.filter((contentId) => !present.has(contentId));
	}
	async checkpointSources(input) {
		let query = this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			source_cursor: input.nextCursor,
			attempt_count: 0,
			last_error_code: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "=", input.targetEpoch).where("reconciliation.state", "=", "leased").where("reconciliation.phase", "=", "sources").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db)).where(this.statusOwnsRun(input.claim, input.targetEpoch));
		query = input.previousCursor ? query.where("reconciliation.source_cursor", "=", input.previousCursor) : query.where("reconciliation.source_cursor", "is", null);
		const result = await query.executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async finishFailedCoverage(collectionId, runToken) {
		assertIdentity({
			collectionId,
			runToken
		});
		const now = timestampOffset(this.db, 0);
		const result = await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			status: sql`CASE WHEN EXISTS (
					SELECT 1 FROM _emdash_media_usage_sources AS source
					WHERE source.source_type = 'content'
						AND source.collection_id = ${collectionId}
						AND source.identity_version = 1
					LIMIT 1
				) THEN 'partial' ELSE 'failed' END`,
			completed_at: null,
			cursor: null,
			last_error_code: sql`CASE WHEN (
					SELECT reconciliation.last_error_code
					FROM _emdash_media_usage_reconciliations AS reconciliation
					WHERE reconciliation.collection_id = ${collectionId}
						AND reconciliation.run_token = ${runToken}
				) = 'MEDIA_USAGE_RECONCILIATION_ENTRY_FAILED'
				THEN COALESCE(
					(SELECT work.last_error_code
					 FROM _emdash_media_usage_work AS work
					 WHERE work.collection_id = ${collectionId} AND work.state = 'failed'
					 ORDER BY work.content_id LIMIT 1),
					'MEDIA_USAGE_RECONCILIATION_ENTRY_FAILED'
				)
				ELSE (
					SELECT reconciliation.last_error_code
					FROM _emdash_media_usage_reconciliations AS reconciliation
					WHERE reconciliation.collection_id = ${collectionId}
						AND reconciliation.run_token = ${runToken}
				) END`,
			reconciliation_required: 1,
			updated_at: now
		}).where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.collection_id", "=", collectionId).where("status.status", "=", "running").where("status.cursor", "=", runToken).where(sql`status.change_epoch = (
				SELECT reconciliation.target_epoch
				FROM _emdash_media_usage_reconciliations AS reconciliation
				WHERE reconciliation.collection_id = ${collectionId}
					AND reconciliation.run_token = ${runToken}
			)`).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_reconciliations as reconciliation").select("reconciliation.collection_id").where("reconciliation.collection_id", "=", collectionId).where("reconciliation.run_token", "=", runToken).where("reconciliation.state", "=", "failed"))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async finalizeCoverage(input) {
		const now = timestampOffset(this.db, 0);
		const result = await this.db.updateTable("_emdash_media_usage_index_status as status").set({
			status: "complete",
			schema_version: input.schemaVersion,
			completed_at: now,
			cursor: null,
			last_error_code: null,
			reconciliation_required: 0,
			updated_at: now
		}).where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.collection_id", "=", input.claim.collectionId).where("status.scope_key", "=", input.claim.collectionSlug).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1).where("status.status", "=", "running").where("status.cursor", "=", input.claim.runToken).where("status.change_epoch", "=", input.targetEpoch).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_work as work").select("work.content_id").where("work.collection_id", "=", input.claim.collectionId)))).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_reconciliations as reconciliation").innerJoin("_emdash_collections as collection", (join) => join.onRef("collection.id", "=", "reconciliation.collection_id").onRef("collection.slug", "=", "reconciliation.collection_slug")).select("reconciliation.collection_id").where("reconciliation.collection_id", "=", input.claim.collectionId).where("reconciliation.run_token", "=", input.claim.runToken).where("reconciliation.target_epoch", "=", input.targetEpoch).where("reconciliation.field_fingerprint", "=", input.fieldFingerprint).where("reconciliation.state", "=", "leased").where("reconciliation.phase", "=", "sources").where("reconciliation.lease_token", "=", input.claim.leaseToken).where(liveLease(this.db, "reconciliation.lease_expires_at")).where((inner) => inner.not(inner.exists(inner.selectFrom("_emdash_media_usage_collection_deletions as deletion").select("deletion.collection_id").where("deletion.collection_id", "=", input.claim.collectionId)))))).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_activation as activation").select("activation.task_key").where("activation.task_key", "=", ACTIVATION_KEY).where("activation.state", "=", "active"))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async deleteFinalized(claim) {
		const result = await this.db.deleteFrom("_emdash_media_usage_reconciliations as reconciliation").where("reconciliation.collection_id", "=", claim.collectionId).where("reconciliation.run_token", "=", claim.runToken).where("reconciliation.state", "=", "leased").where("reconciliation.lease_token", "=", claim.leaseToken).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_index_status as status").select("status.collection_id").where("status.collection_id", "=", claim.collectionId).where("status.scope_key", "=", claim.collectionSlug).where("status.status", "=", "complete").where("status.reconciliation_required", "=", 0))).executeTakeFirst();
		return Number(result.numDeletedRows ?? 0) === 1;
	}
	async deleteOneObsolete() {
		return (await sql`
			DELETE FROM _emdash_media_usage_reconciliations
			WHERE (collection_id, run_token) IN (
				SELECT reconciliation.collection_id, reconciliation.run_token
				FROM _emdash_media_usage_reconciliations AS reconciliation
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = reconciliation.collection_id
					AND status.scope_key = reconciliation.collection_slug
				WHERE status.adapter_id = ${CONTENT_ADAPTER_ID}
					AND status.scope_type = ${COLLECTION_SCOPE}
					AND status.reconciliation_required = 0
				ORDER BY reconciliation.updated_at, reconciliation.collection_id
				LIMIT 1
			)
			RETURNING collection_id
		`.execute(this.db)).rows.length === 1;
	}
	liveClaimExists(claim) {
		return this.liveClaimExistsSql(claim);
	}
	liveClaimExistsSql(claim) {
		return sql`EXISTS (
			SELECT 1
			FROM _emdash_media_usage_reconciliations AS reconciliation
			INNER JOIN _emdash_collections AS collection
				ON collection.id = reconciliation.collection_id
				AND collection.slug = reconciliation.collection_slug
			WHERE reconciliation.collection_id = ${claim.collectionId}
				AND reconciliation.collection_slug = ${claim.collectionSlug}
				AND reconciliation.run_token = ${claim.runToken}
				AND reconciliation.state = 'leased'
				AND reconciliation.lease_token = ${claim.leaseToken}
				AND ${liveLease(this.db, "reconciliation.lease_expires_at")}
				AND EXISTS (
					SELECT 1 FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = ${ACTIVATION_KEY}
						AND activation.state = 'active'
				)
				AND NOT EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = reconciliation.collection_id
				)
		)`;
	}
	statusOwnsRun(claim, targetEpoch) {
		return sql`EXISTS (
			SELECT 1 FROM _emdash_media_usage_index_status AS status
			WHERE status.adapter_id = ${CONTENT_ADAPTER_ID}
				AND status.scope_type = ${COLLECTION_SCOPE}
				AND status.collection_id = ${claim.collectionId}
				AND status.scope_key = ${claim.collectionSlug}
				AND status.capture_state = 'active'
				AND status.reconciliation_required = 1
				AND status.status = 'running'
				AND status.cursor = ${claim.runToken}
				AND status.change_epoch = ${targetEpoch}
		)`;
	}
	async seedNextCandidate() {
		const runToken = ulid();
		const now = timestampOffset(this.db, 0);
		return (await sql`
			INSERT INTO _emdash_media_usage_reconciliations (
				collection_id,
				collection_slug,
				run_token,
				next_attempt_at,
				updated_at
			)
			SELECT status.collection_id, status.scope_key, ${runToken}, ${now}, ${now}
			FROM _emdash_media_usage_index_status AS status
			INNER JOIN _emdash_collections AS collection
				ON collection.id = status.collection_id
				AND collection.slug = status.scope_key
			WHERE status.adapter_id = ${CONTENT_ADAPTER_ID}
				AND status.scope_type = ${COLLECTION_SCOPE}
				AND status.capture_state = 'active'
				AND status.reconciliation_required = 1
				AND status.collection_id IS NOT NULL
				AND EXISTS (
					SELECT 1 FROM _emdash_media_usage_activation AS activation
					WHERE activation.task_key = ${ACTIVATION_KEY}
						AND activation.state = 'active'
				)
				AND NOT EXISTS (
					SELECT 1 FROM _emdash_media_usage_reconciliations AS existing
					WHERE existing.collection_id = status.collection_id
				)
				AND NOT EXISTS (
					SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
					WHERE deletion.collection_id = status.collection_id
				)
			ORDER BY status.collection_id
			LIMIT 1
			ON CONFLICT (collection_id) DO NOTHING
			RETURNING collection_id
		`.execute(this.db)).rows.length === 1;
	}
	async findDue(limit) {
		assertLimit(limit);
		const nextAttemptIsDue = timestampIsDue(this.db, "next_attempt_at");
		return (await sql`
			WITH pending_candidates AS (
				SELECT * FROM _emdash_media_usage_reconciliations
				WHERE state = 'pending' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), retry_candidates AS (
				SELECT * FROM _emdash_media_usage_reconciliations
				WHERE state = 'retry' AND ${nextAttemptIsDue}
				ORDER BY next_attempt_at, updated_at, collection_id
				LIMIT ${limit}
			), leased_candidates AS (
				SELECT * FROM _emdash_media_usage_reconciliations
				WHERE state = 'leased' AND ${timestampIsDue(this.db, "lease_expires_at")}
				ORDER BY lease_expires_at, updated_at, collection_id
				LIMIT ${limit}
			), candidates AS (
				SELECT * FROM pending_candidates
				UNION ALL SELECT * FROM retry_candidates
				UNION ALL SELECT * FROM leased_candidates
			)
			SELECT * FROM candidates
			ORDER BY CASE WHEN state = 'leased' THEN lease_expires_at ELSE next_attempt_at END,
				updated_at,
				collection_id
			LIMIT ${limit}
		`.execute(this.db)).rows.map(rowToRecord);
	}
	async hasDeferredCandidate() {
		return await this.db.selectFrom("_emdash_media_usage_reconciliations").select("collection_id").where("state", "in", [
			"pending",
			"retry",
			"leased"
		]).limit(1).executeTakeFirst() !== void 0;
	}
	async wakeDrainedBarrierCandidate() {
		const now = timestampOffset(this.db, 0);
		return (await sql`
			UPDATE _emdash_media_usage_reconciliations
			SET next_attempt_at = ${now}, updated_at = ${now}
			WHERE collection_id = (
				SELECT reconciliation.collection_id
				FROM _emdash_media_usage_reconciliations AS reconciliation
				INNER JOIN _emdash_media_usage_index_status AS status
					ON status.collection_id = reconciliation.collection_id
					AND status.scope_key = reconciliation.collection_slug
				WHERE reconciliation.state = 'pending'
					AND reconciliation.target_epoch IS NOT NULL
					AND NOT ${timestampIsDue(this.db, "reconciliation.next_attempt_at")}
					AND status.adapter_id = ${CONTENT_ADAPTER_ID}
					AND status.scope_type = ${COLLECTION_SCOPE}
					AND status.capture_state = 'active'
					AND status.reconciliation_required = 1
					AND status.status = 'running'
					AND status.cursor = reconciliation.run_token
					AND status.change_epoch = reconciliation.target_epoch
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_work AS work
						WHERE work.collection_id = reconciliation.collection_id
					)
					AND NOT EXISTS (
						SELECT 1 FROM _emdash_media_usage_collection_deletions AS deletion
						WHERE deletion.collection_id = reconciliation.collection_id
					)
				ORDER BY reconciliation.next_attempt_at, reconciliation.updated_at,
					reconciliation.collection_id
				LIMIT 1
			)
			AND state = 'pending'
			AND NOT ${timestampIsDue(this.db, "_emdash_media_usage_reconciliations.next_attempt_at")}
			AND EXISTS (
				SELECT 1 FROM _emdash_media_usage_activation AS activation
				WHERE activation.task_key = ${ACTIVATION_KEY}
					AND activation.state = 'active'
			)
			AND NOT EXISTS (
				SELECT 1 FROM _emdash_media_usage_work AS work
				WHERE work.collection_id = _emdash_media_usage_reconciliations.collection_id
			)
			RETURNING collection_id
		`.execute(this.db)).rows.length === 1;
	}
	async findFailed(limit) {
		assertLimit(limit);
		return (await this.db.selectFrom("_emdash_media_usage_reconciliations as reconciliation").innerJoin("_emdash_media_usage_index_status as status", (join) => join.onRef("status.collection_id", "=", "reconciliation.collection_id").onRef("status.scope_key", "=", "reconciliation.collection_slug")).selectAll("reconciliation").where("reconciliation.state", "=", "failed").where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where((eb) => eb.or([
			eb("status.reconciliation_required", "=", 0),
			eb.and([eb("status.status", "=", "running"), eb("status.cursor", "=", eb.ref("reconciliation.run_token"))]),
			eb.and([eb("status.cursor", "is", null), eb("status.change_epoch", ">", eb.ref("reconciliation.target_epoch"))])
		])).orderBy("reconciliation.updated_at").orderBy("reconciliation.collection_id").limit(limit).execute()).map(rowToRecord);
	}
	async claim(input) {
		assertIdentity(input);
		assertDuration(input.leaseDurationSeconds, "lease duration");
		const leaseToken = ulid();
		const row = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			state: "leased",
			lease_token: leaseToken,
			lease_expires_at: timestampOffset(this.db, input.leaseDurationSeconds),
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", input.collectionId).where("reconciliation.run_token", "=", input.runToken).where((eb) => eb.or([eb.and([eb("reconciliation.state", "in", ["pending", "retry"]), timestampIsDue(this.db, "reconciliation.next_attempt_at")]), eb.and([eb("reconciliation.state", "=", "leased"), timestampIsDue(this.db, "reconciliation.lease_expires_at")])])).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_activation as activation").select("activation.task_key").where("activation.task_key", "=", ACTIVATION_KEY).where("activation.state", "=", "active"))).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_index_status as status").innerJoin("_emdash_collections as collection", (join) => join.onRef("collection.id", "=", "status.collection_id").onRef("collection.slug", "=", "status.scope_key")).select("status.collection_id").whereRef("status.collection_id", "=", "reconciliation.collection_id").whereRef("status.scope_key", "=", "reconciliation.collection_slug").where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1))).where((eb) => eb.not(eb.exists(eb.selectFrom("_emdash_media_usage_collection_deletions as deletion").select("deletion.collection_id").whereRef("deletion.collection_id", "=", "reconciliation.collection_id")))).returningAll().executeTakeFirst();
		return row ? {
			...rowToRecord(row),
			leaseToken
		} : null;
	}
	async release(input) {
		assertLeaseIdentity(input);
		assertDuration(input.delaySeconds, "release delay", true);
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations").set({
			state: "pending",
			next_attempt_at: timestampOffset(this.db, input.delaySeconds),
			lease_token: null,
			lease_expires_at: null,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("run_token", "=", input.runToken).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async recordFailure(input) {
		assertLeaseIdentity(input);
		if (!STABLE_ERROR_CODE_PATTERN.test(input.errorCode)) throw new Error("Reconciliation failure requires a stable error code");
		assertDuration(input.retryDelaySeconds, "retry delay", true);
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations").set({
			state: input.terminal ? "failed" : sql`CASE WHEN attempt_count >= 4 THEN 'failed' ELSE 'retry' END`,
			...input.terminal ? { target_epoch: sql`COALESCE(
								target_epoch,
								(SELECT status.change_epoch
								 FROM _emdash_media_usage_index_status AS status
								 WHERE status.adapter_id = ${CONTENT_ADAPTER_ID}
									AND status.scope_type = ${COLLECTION_SCOPE}
									AND status.collection_id = ${input.collectionId}
									AND status.status = 'running'
									AND status.cursor = ${input.runToken})
							)` } : {},
			attempt_count: sql`attempt_count + 1`,
			next_attempt_at: timestampOffset(this.db, input.retryDelaySeconds),
			lease_token: null,
			lease_expires_at: null,
			last_error_code: input.errorCode,
			updated_at: timestampOffset(this.db, 0)
		}).where("collection_id", "=", input.collectionId).where("run_token", "=", input.runToken).where("state", "=", "leased").where("lease_token", "=", input.leaseToken).where(liveLease(this.db)).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async recordEntryFailure(claim) {
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			state: "failed",
			attempt_count: sql`attempt_count + 1`,
			next_attempt_at: timestampOffset(this.db, 0),
			lease_token: null,
			lease_expires_at: null,
			last_error_code: "MEDIA_USAGE_RECONCILIATION_ENTRY_FAILED",
			updated_at: timestampOffset(this.db, 0)
		}).where("reconciliation.collection_id", "=", claim.collectionId).where("reconciliation.run_token", "=", claim.runToken).where("reconciliation.state", "=", "leased").where("reconciliation.lease_token", "=", claim.leaseToken).where(liveLease(this.db)).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_work as work").select("work.content_id").where("work.collection_id", "=", claim.collectionId).where("work.state", "=", "failed"))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
	async resetFailedForNewEpoch(observed) {
		const collectionId = "collection_id" in observed ? observed.collection_id : observed.collectionId;
		const runToken = "run_token" in observed ? observed.run_token : observed.runToken;
		const targetEpoch = "target_epoch" in observed ? observed.target_epoch : observed.targetEpoch;
		if (targetEpoch === null) return false;
		const now = timestampOffset(this.db, 0);
		const result = await this.db.updateTable("_emdash_media_usage_reconciliations as reconciliation").set({
			state: "pending",
			phase: "scan",
			target_epoch: null,
			field_fingerprint: null,
			scan_cursor: null,
			scan_upper_id: null,
			source_cursor: null,
			source_upper_key: null,
			attempt_count: 0,
			next_attempt_at: now,
			lease_token: null,
			lease_expires_at: null,
			last_error_code: null,
			updated_at: now
		}).where("reconciliation.collection_id", "=", collectionId).where("reconciliation.run_token", "=", runToken).where("reconciliation.state", "=", "failed").where("reconciliation.target_epoch", "=", targetEpoch).where((eb) => eb.exists(eb.selectFrom("_emdash_media_usage_index_status as status").select("status.collection_id").whereRef("status.collection_id", "=", "reconciliation.collection_id").whereRef("status.scope_key", "=", "reconciliation.collection_slug").where("status.adapter_id", "=", CONTENT_ADAPTER_ID).where("status.scope_type", "=", COLLECTION_SCOPE).where("status.capture_state", "=", "active").where("status.reconciliation_required", "=", 1).where((status) => status.or([status("status.cursor", "is", null), status.and([status("status.status", "=", "running"), status("status.cursor", "=", runToken)])])).where("status.change_epoch", ">", targetEpoch))).executeTakeFirst();
		return Number(result.numUpdatedRows ?? 0) === 1;
	}
};
function rowToRecord(row) {
	if (!isState(row.state) || !isPhase(row.phase) || !Number.isSafeInteger(row.attempt_count)) throw new Error("Invalid media usage reconciliation lifecycle");
	return {
		collectionId: row.collection_id,
		collectionSlug: row.collection_slug,
		runToken: row.run_token,
		targetEpoch: row.target_epoch,
		fieldFingerprint: row.field_fingerprint,
		state: row.state,
		phase: row.phase,
		scanCursor: row.scan_cursor,
		scanUpperId: row.scan_upper_id,
		sourceCursor: row.source_cursor,
		sourceUpperKey: row.source_upper_key,
		attemptCount: row.attempt_count,
		nextAttemptAt: row.next_attempt_at,
		leaseToken: row.lease_token,
		leaseExpiresAt: row.lease_expires_at,
		lastErrorCode: row.last_error_code,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
function isState(state) {
	return state === "pending" || state === "retry" || state === "leased" || state === "failed";
}
function isPhase(phase) {
	return phase === "scan" || phase === "sources";
}
function assertLimit(limit) {
	if (!Number.isSafeInteger(limit) || limit < 1 || limit > MAX_CANDIDATES) throw new Error("Reconciliation candidate limit must be from 1 to 100");
}
function assertIdentity(input) {
	if (!input.collectionId || !input.runToken) throw new Error("Reconciliation requires an exact collection and run token");
}
function assertLeaseIdentity(input) {
	assertIdentity(input);
	if (!input.leaseToken) throw new Error("Reconciliation requires a lease token");
}
function assertDuration(value, label, allowZero = false) {
	if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1) || value > MAX_PORTABLE_DURATION_SECONDS) throw new Error(`Reconciliation ${label} is outside the portable range`);
}
function liveLease(db, column = "lease_expires_at") {
	const expiry = sql.ref(column);
	return isPostgres(db) ? sql`${expiry} > to_char(statement_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')` : sql`${expiry} > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampIsDue(db, column) {
	const value = sql.ref(column);
	return isPostgres(db) ? sql`${value} <= to_char(statement_timestamp() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')` : sql`${value} <= strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`;
}
function timestampOffset(db, offsetSeconds) {
	if (isPostgres(db)) return sql`to_char(
			(clock_timestamp() AT TIME ZONE 'UTC') + (${offsetSeconds} * INTERVAL '1 second'),
			'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
		)`;
	return sql`strftime(
		'%Y-%m-%dT%H:%M:%fZ',
		'now',
		${`${offsetSeconds >= 0 ? "+" : ""}${offsetSeconds} seconds`}
	)`;
}
function contentTableName(collectionSlug) {
	validateIdentifier(collectionSlug, "collection slug");
	const tableName = `ec_${collectionSlug}`;
	validateIdentifier(tableName, "content table");
	return tableName;
}
var MEDIA_USAGE_RECONCILIATION_LIMITS = Object.freeze({
	candidatesPerTick: 4,
	scanPageSize: 1e3,
	sourcePageSize: 1e3,
	leaseDurationSeconds: 60,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900,
	retryJitterRatio: .25
});
async function processDueMediaUsageReconciliationDetailed(db, options = {}) {
	if (!options.activationKnownActive) {
		if ((await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state !== "active") return {
			outcome: "inactive",
			consumedUnit: false,
			hasDeferredCandidate: false
		};
	}
	const reconciliation = new MediaUsageReconciliationRepository(db);
	if (await reconciliation.deleteOneObsolete()) return {
		outcome: "completed",
		consumedUnit: true,
		hasDeferredCandidate: false
	};
	const [failed] = await reconciliation.findFailed(1);
	if (failed) {
		if (await reconciliation.finishFailedCoverage(failed.collectionId, failed.runToken)) return {
			outcome: "failed",
			consumedUnit: true,
			hasDeferredCandidate: false
		};
		if (await reconciliation.resetFailedForNewEpoch(failed)) return {
			outcome: "advanced",
			consumedUnit: true,
			hasDeferredCandidate: false
		};
	}
	const seeded = await reconciliation.seedNextCandidate();
	const candidates = await reconciliation.findDue(MEDIA_USAGE_RECONCILIATION_LIMITS.candidatesPerTick);
	let claim = null;
	for (const candidate of candidates) {
		claim = await reconciliation.claim({
			collectionId: candidate.collectionId,
			runToken: candidate.runToken,
			leaseDurationSeconds: MEDIA_USAGE_RECONCILIATION_LIMITS.leaseDurationSeconds
		});
		if (claim) break;
	}
	if (!claim) return {
		outcome: candidates.length === 0 ? "not_due" : "claim_lost",
		consumedUnit: seeded,
		hasDeferredCandidate: candidates.length === 0 && await reconciliation.hasDeferredCandidate()
	};
	try {
		return {
			outcome: await processClaimedReconciliation(db, claim),
			consumedUnit: true,
			hasDeferredCandidate: false
		};
	} catch (error) {
		const terminal = claim.attemptCount + 1 >= MEDIA_USAGE_RECONCILIATION_LIMITS.maxAttempts;
		if (!await reconciliation.recordFailure({
			collectionId: claim.collectionId,
			runToken: claim.runToken,
			leaseToken: claim.leaseToken,
			errorCode: "MEDIA_USAGE_RECONCILIATION_FAILED",
			retryDelaySeconds: retryDelaySeconds$1(claim.attemptCount),
			terminal
		})) return {
			outcome: "claim_lost",
			consumedUnit: true,
			hasDeferredCandidate: false
		};
		if (terminal) await reconciliation.finishFailedCoverage(claim.collectionId, claim.runToken);
		console.error("[media-usage:reconciliation] Processing failed:", error);
		return {
			outcome: terminal ? "failed" : "retry",
			consumedUnit: true,
			hasDeferredCandidate: false
		};
	}
}
async function processClaimedMediaUsageReconciliationScan(db, claim, options = {}, knownCurrent) {
	const reconciliation = new MediaUsageReconciliationRepository(db);
	let current = knownCurrent ?? await reconciliation.findByIdentity(claim.collectionId, claim.runToken);
	if (!current || current.leaseToken !== claim.leaseToken || current.phase !== "scan") return "deferred";
	let fields;
	let fieldFingerprint;
	if (current.targetEpoch === null) {
		const targetEpoch = await reconciliation.beginRun(claim);
		if (targetEpoch === null) {
			await reconciliation.release({
				...claim,
				delaySeconds: 30
			});
			return "deferred";
		}
		fields = await loadContentMediaUsageFields(db, claim.collectionSlug, claim.collectionId);
		fieldFingerprint = await buildContentMediaUsageFieldFingerprint(fields);
		const scanUpperId = fields.extractionFields.length === 0 ? null : await reconciliation.findScanUpperId(claim);
		if (!await reconciliation.initializeScan({
			claim,
			targetEpoch,
			fieldFingerprint,
			scanUpperId
		})) return "deferred";
		current = {
			...current,
			targetEpoch,
			fieldFingerprint,
			scanCursor: null,
			scanUpperId,
			sourceCursor: null,
			sourceUpperKey: null
		};
	} else {
		fields = await loadContentMediaUsageFields(db, claim.collectionSlug, claim.collectionId);
		fieldFingerprint = await buildContentMediaUsageFieldFingerprint(fields);
	}
	if (current.fieldFingerprint !== fieldFingerprint || current.targetEpoch === null) return "restart_required";
	const contentIds = await reconciliation.findScanPage(current, MEDIA_USAGE_RECONCILIATION_LIMITS.scanPageSize);
	if (contentIds.length === 0) {
		if (options.releaseOnExhausted ?? true) await reconciliation.release({
			...claim,
			delaySeconds: 30
		});
		return "exhausted";
	}
	await new MediaUsageWorkRepository(db).enqueueReconciliationPage({
		collectionId: claim.collectionId,
		collectionSlug: claim.collectionSlug,
		runToken: claim.runToken,
		leaseToken: claim.leaseToken,
		changeEpoch: current.targetEpoch,
		phase: "scan",
		contentIds
	});
	const nextCursor = contentIds.at(-1);
	if (!await reconciliation.checkpointScan({
		claim,
		targetEpoch: current.targetEpoch,
		previousCursor: current.scanCursor,
		nextCursor
	})) return "deferred";
	if (!await reconciliation.release({
		...claim,
		delaySeconds: 0
	})) return "deferred";
	return "advanced";
}
async function processClaimedReconciliation(db, claim) {
	const reconciliation = new MediaUsageReconciliationRepository(db);
	let current = claim;
	if (current.targetEpoch !== null && !await reconciliation.ownsRun(claim, current.targetEpoch)) return restartReconciliation(db, reconciliation, claim, current);
	if (current.targetEpoch !== null) await new MediaUsageWorkRepository(db).deleteObsoleteReconciliationWork({
		collectionId: claim.collectionId,
		collectionSlug: claim.collectionSlug,
		runToken: claim.runToken,
		leaseToken: claim.leaseToken,
		targetEpoch: current.targetEpoch
	});
	if (current.phase === "scan") {
		const outcome = await processClaimedMediaUsageReconciliationScan(db, claim, { releaseOnExhausted: false }, current);
		if (outcome === "restart_required") {
			current = await reconciliation.findByIdentity(claim.collectionId, claim.runToken) ?? current;
			return restartReconciliation(db, reconciliation, claim, current);
		}
		if (outcome !== "exhausted") return outcome;
		if (current.targetEpoch === null || current.fieldFingerprint === null) current = await reconciliation.findByIdentity(claim.collectionId, claim.runToken) ?? current;
		const barrier = await reconciliation.findWorkBarrier(claim.collectionId);
		if (barrier.state === "failed") return failReconciliation(reconciliation, claim, barrier.errorCode, true);
		if (barrier.state === "pending") {
			await reconciliation.release({
				...claim,
				delaySeconds: 30
			});
			return "deferred";
		}
		if (current.targetEpoch === null || current.fieldFingerprint === null) return "claim_lost";
		const sourceUpperKey = await reconciliation.findSourceUpperKey(claim, current.targetEpoch);
		if (!await reconciliation.transitionToSources({
			claim,
			targetEpoch: current.targetEpoch,
			fieldFingerprint: current.fieldFingerprint,
			sourceUpperKey
		})) return "claim_lost";
		if (!await reconciliation.release({
			...claim,
			delaySeconds: 0
		})) return "claim_lost";
		return "advanced";
	}
	return processSourcePhase(db, reconciliation, claim, current);
}
async function processSourcePhase(db, reconciliation, claim, current) {
	if (current.targetEpoch === null || current.fieldFingerprint === null) return "claim_lost";
	const fields = await loadContentMediaUsageFields(db, claim.collectionSlug, claim.collectionId);
	const fieldFingerprint = await buildContentMediaUsageFieldFingerprint(fields);
	if (fieldFingerprint !== current.fieldFingerprint) return restartReconciliation(db, reconciliation, claim, current, fields, fieldFingerprint);
	const page = await reconciliation.findSourcePage(current, MEDIA_USAGE_RECONCILIATION_LIMITS.sourcePageSize);
	if (page.length > 0) {
		let enqueuedMissingContent = false;
		if (page.some((source) => !source.contentId || source.sourceVariant !== "columns" && source.sourceVariant !== "draft_overlay")) return failReconciliation(reconciliation, claim, "MEDIA_USAGE_RECONCILIATION_INVALID_SOURCE", false);
		const contentIds = [...new Set(page.map((source) => source.contentId))];
		const enqueueIds = fields.extractionFields.length === 0 ? contentIds : await reconciliation.findMissingContentIds(claim.collectionSlug, contentIds);
		if (enqueueIds.length > 0) {
			await new MediaUsageWorkRepository(db).enqueueReconciliationPage({
				collectionId: claim.collectionId,
				collectionSlug: claim.collectionSlug,
				runToken: claim.runToken,
				leaseToken: claim.leaseToken,
				changeEpoch: current.targetEpoch,
				phase: "sources",
				contentIds: enqueueIds
			});
			enqueuedMissingContent = true;
		}
		if (!await reconciliation.checkpointSources({
			claim,
			targetEpoch: current.targetEpoch,
			previousCursor: current.sourceCursor,
			nextCursor: page.at(-1).sourceKey
		})) return "claim_lost";
		if (enqueuedMissingContent || page.length === MEDIA_USAGE_RECONCILIATION_LIMITS.sourcePageSize) {
			if (!await reconciliation.release({
				...claim,
				delaySeconds: 0
			})) return "claim_lost";
			return "advanced";
		}
	}
	const barrier = await reconciliation.findWorkBarrier(claim.collectionId);
	if (barrier.state === "failed") return failReconciliation(reconciliation, claim, barrier.errorCode, true);
	if (barrier.state === "pending") {
		await reconciliation.release({
			...claim,
			delaySeconds: 30
		});
		return "deferred";
	}
	if (!await reconciliation.finalizeCoverage({
		claim,
		targetEpoch: current.targetEpoch,
		fieldFingerprint,
		schemaVersion: 2
	})) return "claim_lost";
	if (!await reconciliation.deleteFinalized(claim)) return "claim_lost";
	return "completed";
}
async function restartReconciliation(db, reconciliation, claim, current, fields, fieldFingerprint) {
	if (current.targetEpoch === null) return "claim_lost";
	const discoveredFields = fields ?? await loadContentMediaUsageFields(db, claim.collectionSlug, claim.collectionId);
	const fingerprint = fieldFingerprint ?? await buildContentMediaUsageFieldFingerprint(discoveredFields);
	const targetEpoch = await reconciliation.restartRun(claim, current.targetEpoch);
	if (targetEpoch === null) {
		await reconciliation.release({
			...claim,
			delaySeconds: 30
		});
		return "deferred";
	}
	const scanUpperId = discoveredFields.extractionFields.length === 0 ? null : await reconciliation.findScanUpperId(claim);
	if (!await reconciliation.restartScan({
		claim,
		previousEpoch: current.targetEpoch,
		targetEpoch,
		fieldFingerprint: fingerprint,
		scanUpperId
	})) return "claim_lost";
	if (!await reconciliation.release({
		...claim,
		delaySeconds: 0
	})) return "claim_lost";
	return "advanced";
}
async function failReconciliation(reconciliation, claim, errorCode, entryFailure) {
	if (!(entryFailure ? await reconciliation.recordEntryFailure(claim) : await reconciliation.recordFailure({
		collectionId: claim.collectionId,
		runToken: claim.runToken,
		leaseToken: claim.leaseToken,
		errorCode,
		retryDelaySeconds: 0,
		terminal: true
	}))) return "claim_lost";
	await reconciliation.finishFailedCoverage(claim.collectionId, claim.runToken);
	return "failed";
}
function retryDelaySeconds$1(attemptCount) {
	const exponential = Math.min(MEDIA_USAGE_RECONCILIATION_LIMITS.retryMaxSeconds, MEDIA_USAGE_RECONCILIATION_LIMITS.retryBaseSeconds * 2 ** attemptCount);
	const jitter = Math.floor(exponential * MEDIA_USAGE_RECONCILIATION_LIMITS.retryJitterRatio * Math.random());
	return Math.min(MEDIA_USAGE_RECONCILIATION_LIMITS.retryMaxSeconds, exponential + jitter);
}
var MEDIA_USAGE_WORK_PROCESSING_LIMITS = Object.freeze({
	candidatesPerTick: 1e3,
	leaseDurationSeconds: 1200,
	maxAttempts: 5,
	retryBaseSeconds: 30,
	retryMaxSeconds: 900,
	retryJitterRatio: .25
});
async function processMediaUsageWorkAfterWrite(db, collectionSlug, contentId) {
	if (!await isIncrementalCaptureActive(db)) return {
		outcome: "inactive",
		claimed: false
	};
	await new MediaUsageRepository(db).recoverIncrementalFinalizations();
	const repo = new MediaUsageWorkRepository(db);
	const work = await repo.findWorkForContent(collectionSlug, contentId);
	if (!work) return {
		outcome: "not_due",
		claimed: false
	};
	const claimed = await repo.claimWork({
		collectionId: work.collectionId,
		contentId: work.contentId,
		workVersion: work.workVersion,
		leaseDurationSeconds: MEDIA_USAGE_WORK_PROCESSING_LIMITS.leaseDurationSeconds
	});
	if (!claimed) return {
		outcome: "claim_lost",
		claimed: false
	};
	try {
		return (await runClaimedBatch(db, [claimed])).get(workResultKey(claimed)) ?? {
			outcome: "claim_lost",
			claimed: false
		};
	} catch (error) {
		const outcome = (await repo.retryClaimedWorkBatch({
			work: [workLease(claimed)],
			errorCode: "MEDIA_USAGE_PROCESSING_FAILED",
			retryDelaySeconds: MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryBaseSeconds,
			maxAttempts: MEDIA_USAGE_WORK_PROCESSING_LIMITS.maxAttempts
		})).get(workIdentityKey(claimed)) ?? "superseded";
		if (outcome === "failed") await new MediaUsageRepository(db).recordIncrementalFailure({
			collectionId: claimed.collectionId,
			collectionSlug: claimed.collectionSlug,
			contentId: claimed.contentId,
			workVersion: claimed.workVersion,
			errorCode: "MEDIA_USAGE_PROCESSING_FAILED"
		});
		console.error("[media-usage:work] Immediate processing failed:", error);
		return {
			outcome,
			claimed: true
		};
	}
}
async function processDueMediaUsageWork(db, options = {}) {
	const startedAt = Date.now();
	const result = {
		candidateCount: 0,
		claimedCount: 0,
		completedCount: 0,
		retryCount: 0,
		failedCount: 0,
		supersededCount: 0,
		obsoleteCount: 0,
		durationMs: 0
	};
	if (!options.activationKnownActive && !await isIncrementalCaptureActive(db)) {
		result.durationMs = Date.now() - startedAt;
		return result;
	}
	await new MediaUsageRepository(db).recoverIncrementalFinalizations();
	const repo = new MediaUsageWorkRepository(db);
	const candidates = await repo.claimDueWorkBatch({
		limit: MEDIA_USAGE_WORK_PROCESSING_LIMITS.candidatesPerTick,
		leaseDurationSeconds: MEDIA_USAGE_WORK_PROCESSING_LIMITS.leaseDurationSeconds
	});
	result.candidateCount = candidates.length > 0 || !await repo.hasNonterminalWork() ? candidates.length : 1;
	const processedBatch = await processClaimedCollections(db, candidates);
	for (const candidate of candidates) {
		const processed = processedBatch.get(workResultKey(candidate)) ?? {
			outcome: "claim_lost",
			claimed: false
		};
		if (processed.claimed) result.claimedCount++;
		if (processed.outcome === "completed") result.completedCount++;
		if (processed.outcome === "retry") result.retryCount++;
		if (processed.outcome === "failed") result.failedCount++;
		if (processed.outcome === "superseded") result.supersededCount++;
		if (processed.outcome === "obsolete") result.obsoleteCount++;
	}
	result.durationMs = Date.now() - startedAt;
	return result;
}
async function processClaimedCollections(db, candidates) {
	const processed = /* @__PURE__ */ new Map();
	const byCollection = /* @__PURE__ */ new Map();
	for (const candidate of candidates) {
		const key = collectionResultKey(candidate);
		const collection = byCollection.get(key) ?? [];
		collection.push(candidate);
		byCollection.set(key, collection);
	}
	for (const collection of byCollection.values()) try {
		for (const [key, result] of await runClaimedBatch(db, collection)) processed.set(key, result);
	} catch (error) {
		for (const [key, result] of await retryFailedClaimedCollection(db, collection)) processed.set(key, result);
		console.error("[media-usage:work] Collection processing failed:", error);
	}
	return processed;
}
async function retryFailedClaimedCollection(db, candidates) {
	const transitioned = await new MediaUsageWorkRepository(db).retryClaimedWorkBatch({
		work: candidates.map(workLease),
		errorCode: "MEDIA_USAGE_PROCESSING_FAILED",
		retryDelaySeconds: MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryBaseSeconds,
		maxAttempts: MEDIA_USAGE_WORK_PROCESSING_LIMITS.maxAttempts
	});
	const processed = /* @__PURE__ */ new Map();
	const failedCollectionIds = /* @__PURE__ */ new Set();
	for (const candidate of candidates) {
		const state = transitioned.get(workIdentityKey(candidate));
		if (state === "failed") failedCollectionIds.add(candidate.collectionId);
		processed.set(workResultKey(candidate), {
			outcome: state ?? "superseded",
			claimed: true
		});
	}
	await new MediaUsageRepository(db).recordIncrementalFailuresByCollection({
		collectionIds: [...failedCollectionIds],
		errorCode: "MEDIA_USAGE_PROCESSING_FAILED"
	});
	return processed;
}
async function runClaimedBatch(db, candidates) {
	return isPostgres(db) ? withTransaction(db, (trx) => processClaimedBatch(trx, new MediaUsageWorkRepository(trx), candidates)) : processClaimedBatch(db, new MediaUsageWorkRepository(db), candidates);
}
async function processClaimedBatch(db, repo, candidates) {
	const results = /* @__PURE__ */ new Map();
	const locked = await repo.lockClaimedWorkBatch(candidates.map(workLease));
	const owned = [];
	for (const candidate of candidates) if (locked.has(workIdentityKey(candidate))) owned.push(candidate);
	else results.set(workResultKey(candidate), {
		outcome: "superseded",
		claimed: true
	});
	const currentCollections = await findCurrentCollectionIdentities(db, owned);
	const current = [];
	const obsolete = [];
	for (const candidate of owned) if (currentCollections.has(collectionResultKey(candidate))) current.push(candidate);
	else obsolete.push(candidate);
	const obsoleteCompleted = await repo.completeWorkBatch(obsolete.map(workLease));
	for (const candidate of obsolete) results.set(workResultKey(candidate), {
		outcome: obsoleteCompleted.has(workIdentityKey(candidate)) ? "obsolete" : "superseded",
		claimed: true
	});
	if (current.length === 0) return results;
	const refreshes = await refreshContentMediaUsageForWorkBatch(db, current, { shouldContinue: canContinueBulkWork });
	const successful = [];
	const unstarted = [];
	const failedRefreshes = [];
	for (const candidate of current) {
		const refresh = refreshes.get(contentRefreshKey(candidate.collectionId, candidate.contentId));
		if (refresh?.success) successful.push(candidate);
		else if (!refresh) unstarted.push(candidate);
		else failedRefreshes.push({
			candidate,
			refresh
		});
	}
	const terminalFailureCollections = /* @__PURE__ */ new Map();
	const failureGroups = /* @__PURE__ */ new Map();
	for (const failure of failedRefreshes) {
		const errorCode = processingErrorCode(failure.refresh.errorCode);
		const terminal = errorCode === "MEDIA_USAGE_RESOURCE_LIMIT" || failure.candidate.attemptCount + 1 >= MEDIA_USAGE_WORK_PROCESSING_LIMITS.maxAttempts;
		const delay = retryDelaySeconds(failure.candidate.attemptCount);
		const key = `${errorCode}\u0000${terminal ? "terminal" : String(delay)}`;
		const group = failureGroups.get(key) ?? {
			errorCode,
			retryDelaySeconds: delay,
			terminal,
			candidates: []
		};
		group.candidates.push(failure.candidate);
		failureGroups.set(key, group);
	}
	for (const group of failureGroups.values()) {
		const transitioned = await repo.retryClaimedWorkBatch({
			work: group.candidates.map(workLease),
			errorCode: group.errorCode,
			retryDelaySeconds: group.retryDelaySeconds,
			maxAttempts: group.terminal ? 1 : MEDIA_USAGE_WORK_PROCESSING_LIMITS.maxAttempts
		});
		for (const candidate of group.candidates) {
			const state = transitioned.get(workIdentityKey(candidate));
			if (state === "failed") {
				const collections = terminalFailureCollections.get(group.errorCode) ?? /* @__PURE__ */ new Set();
				collections.add(candidate.collectionId);
				terminalFailureCollections.set(group.errorCode, collections);
			}
			results.set(workResultKey(candidate), {
				outcome: state ?? "superseded",
				claimed: true
			});
		}
	}
	for (const [errorCode, collectionIds] of terminalFailureCollections) await new MediaUsageRepository(db).recordIncrementalFailuresByCollection({
		collectionIds: [...collectionIds],
		errorCode
	});
	const released = await repo.releaseClaimedWorkBatch(unstarted.map(workLease));
	for (const candidate of unstarted) results.set(workResultKey(candidate), {
		outcome: released.has(workIdentityKey(candidate)) ? "not_due" : "superseded",
		claimed: true
	});
	const usage = new MediaUsageRepository(db);
	const successfulByCollection = /* @__PURE__ */ new Map();
	for (const candidate of successful) {
		const key = collectionResultKey(candidate);
		const collection = successfulByCollection.get(key) ?? [];
		collection.push(candidate);
		successfulByCollection.set(key, collection);
	}
	const readyToComplete = [];
	const deferredCompletion = [];
	const lostFinalization = [];
	let pendingFinalizationQueries = 2;
	for (const collection of successfulByCollection.values()) {
		const first = collection[0];
		if (!first) continue;
		const metrics = getRequestContext()?.metrics;
		if (metrics && metrics.dbCount + pendingFinalizationQueries + 4 > 900) {
			deferredCompletion.push(...collection);
			continue;
		}
		if ((await usage.prepareIncrementalFinalization({
			collectionId: first.collectionId,
			collectionSlug: first.collectionSlug
		})).outcome !== "lost") {
			readyToComplete.push(...collection);
			pendingFinalizationQueries += 2;
			continue;
		}
		lostFinalization.push(...collection);
		pendingFinalizationQueries += 2;
	}
	const lostTransitions = await repo.retryClaimedWorkBatch({
		work: lostFinalization.map(workLease),
		errorCode: "MEDIA_USAGE_GENERATION_CONFLICT",
		retryDelaySeconds: MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryBaseSeconds,
		maxAttempts: MEDIA_USAGE_WORK_PROCESSING_LIMITS.maxAttempts
	});
	const lostFailedCollections = /* @__PURE__ */ new Set();
	for (const candidate of lostFinalization) {
		const state = lostTransitions.get(workIdentityKey(candidate));
		if (state === "failed") lostFailedCollections.add(candidate.collectionId);
		results.set(workResultKey(candidate), {
			outcome: state ?? "superseded",
			claimed: true
		});
	}
	await usage.recordIncrementalFailuresByCollection({
		collectionIds: [...lostFailedCollections],
		errorCode: "MEDIA_USAGE_GENERATION_CONFLICT"
	});
	const deferred = await repo.releaseClaimedWorkBatch(deferredCompletion.map(workLease));
	for (const candidate of deferredCompletion) results.set(workResultKey(candidate), {
		outcome: deferred.has(workIdentityKey(candidate)) ? "not_due" : "superseded",
		claimed: true
	});
	const completed = await repo.completeWorkBatch(readyToComplete.map(workLease));
	const completedCollections = /* @__PURE__ */ new Map();
	for (const candidate of readyToComplete) {
		const didComplete = completed.has(workIdentityKey(candidate));
		results.set(workResultKey(candidate), {
			outcome: didComplete ? "completed" : "superseded",
			claimed: true
		});
		if (didComplete) completedCollections.set(collectionResultKey(candidate), candidate);
	}
	for (const collection of completedCollections.values()) await usage.recordIncrementalSuccess({
		collectionId: collection.collectionId,
		collectionSlug: collection.collectionSlug
	});
	return results;
}
async function findCurrentCollectionIdentities(db, candidates) {
	const identities = new Map(candidates.map((candidate) => [collectionResultKey(candidate), candidate]));
	const current = /* @__PURE__ */ new Set();
	for (const batch of chunkCollectionIds(Array.from(identities.values(), (item) => item.collectionId))) {
		const rows = await db.selectFrom("_emdash_collections").select(["id", "slug"]).where("id", "in", batch).execute();
		for (const row of rows) current.add(`${row.id}\u0000${row.slug}`);
	}
	return current;
}
function workLease(work) {
	if (!work.leaseToken) throw new Error("Claimed media usage work requires a lease token");
	return {
		collectionId: work.collectionId,
		contentId: work.contentId,
		workVersion: work.workVersion,
		leaseToken: work.leaseToken
	};
}
function workIdentityKey(work) {
	return `${work.collectionId}\u0000${work.contentId}\u0000${String(work.workVersion)}`;
}
function workResultKey(work) {
	return workIdentityKey(work);
}
function collectionResultKey(work) {
	return `${work.collectionId}\u0000${work.collectionSlug}`;
}
function chunkCollectionIds(ids) {
	const unique = [...new Set(ids)];
	const batches = [];
	for (let index = 0; index < unique.length; index += 50) batches.push(unique.slice(index, index + 50));
	return batches;
}
function canContinueBulkWork() {
	const metrics = getRequestContext()?.metrics;
	return !metrics || metrics.dbCount + 150 <= 900;
}
async function isIncrementalCaptureActive(db) {
	return (await db.selectFrom("_emdash_media_usage_activation").select("state").where("task_key", "=", "incremental_capture").executeTakeFirst())?.state === "active";
}
function retryDelaySeconds(attemptCount) {
	const exponential = Math.min(MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryMaxSeconds, MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryBaseSeconds * 2 ** attemptCount);
	const jitter = Math.floor(exponential * MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryJitterRatio * Math.random());
	return Math.min(MEDIA_USAGE_WORK_PROCESSING_LIMITS.retryMaxSeconds, exponential + jitter);
}
function processingErrorCode(errorCode) {
	if (errorCode === "DRAFT_REVISION_NOT_FOUND" || errorCode === "DRAFT_REVISION_MISMATCH" || errorCode === "DRAFT_REVISION_INVALID") return "MEDIA_USAGE_SNAPSHOT_FAILED";
	if (errorCode === "CONTENT_USAGE_GENERATION_CONFLICT") return "MEDIA_USAGE_GENERATION_CONFLICT";
	if (errorCode === "CONTENT_USAGE_RESOURCE_LIMIT") return "MEDIA_USAGE_RESOURCE_LIMIT";
	return "MEDIA_USAGE_PROCESSING_FAILED";
}
var MEDIA_USAGE_MAINTENANCE_LIMITS = Object.freeze({
	eventQueryCeiling: 900,
	maxStepQueries: 150
});
var TASK_CLASSES = [
	"collection_deletion",
	"entry_work",
	"reconciliation"
];
async function runMediaUsageMaintenanceStep(db) {
	const activation = await db.selectFrom("_emdash_media_usage_activation").select(["state", "runtime_generation"]).where("task_key", "=", "incremental_capture").executeTakeFirst();
	if (activation?.state !== "active" || activation.runtime_generation !== 1) return runActivationStep(db);
	let blocked = false;
	let blockedReconciliation = false;
	let madeProgress = false;
	for (const taskClass of TASK_CLASSES) {
		const metrics = getRequestContext()?.metrics;
		if (metrics && !canStartMediaUsageMaintenanceStep(metrics)) return madeProgress ? {
			state: "progress",
			continuation: { kind: "immediate" }
		} : {
			state: "blocked",
			continuation: { kind: "immediate" }
		};
		const outcome = await runTaskClass(db, taskClass);
		if (outcome === "inactive") return inactiveResult();
		if (outcome === "progress") madeProgress = true;
		if (outcome === "blocked") {
			blocked = true;
			if (taskClass === "reconciliation") blockedReconciliation = true;
		}
	}
	if (madeProgress) return {
		state: "progress",
		continuation: { kind: "immediate" }
	};
	if (blockedReconciliation && await new MediaUsageReconciliationRepository(db).wakeDrainedBarrierCandidate()) return {
		state: "progress",
		continuation: { kind: "immediate" }
	};
	if (blocked) return {
		state: "blocked",
		continuation: {
			kind: "delayed",
			delaySeconds: 30
		}
	};
	return {
		state: "idle",
		continuation: { kind: "none" }
	};
}
/**
* Finish the pending deletion of a collection slug within this request, so the
* slug can be registered again. A call stops after about one maintenance step's
* queries, so a create request never waits on a large cleanup.
*
* - `pending`: it can't finish now, because another request holds its lease,
*   it is waiting out a retry, or this call's query window ran out. Progress
*   is checkpointed, so a later call continues where this one stopped.
* - `failed`: it ran out of attempts and stays until an operator retries it
*   by the deleted collection's ID.
*/
async function finishMediaUsageCollectionDeletion(db, collectionSlug) {
	const repository = new MediaUsageCollectionDeletionRepository(db);
	const metrics = getRequestContext()?.metrics;
	const firstQuery = metrics?.dbCount ?? 0;
	for (;;) {
		const deletion = await repository.findBySlug(collectionSlug);
		if (!deletion) return { state: "finished" };
		if (deletion.state === "failed") return {
			state: "failed",
			collectionId: deletion.collectionId
		};
		if (metrics && (metrics.dbCount - firstQuery >= MEDIA_USAGE_MAINTENANCE_LIMITS.maxStepQueries || !canStartMediaUsageMaintenanceStep(metrics))) return { state: "pending" };
		const outcome = await processMediaUsageCollectionDeletion(db, deletion);
		if (outcome === "failed") return {
			state: "failed",
			collectionId: deletion.collectionId
		};
		if (outcome !== "progress" && outcome !== "finalized") return { state: "pending" };
	}
}
async function runActivationStep(db) {
	try {
		const result = await continueMediaUsageActivation(db);
		if (result.outcome === "activating" || result.outcome === "active") return {
			state: "progress",
			continuation: { kind: "immediate" }
		};
		if (result.outcome === "lease_active" || result.outcome === "conflict") return {
			state: "blocked",
			continuation: {
				kind: "delayed",
				delaySeconds: 30
			}
		};
		return inactiveResult();
	} catch (error) {
		if (error instanceof MediaUsageActivationVersionMismatchError) return inactiveResult();
		throw error;
	}
}
async function runTaskClass(db, taskClass) {
	if (taskClass === "entry_work") {
		const result = await processDueMediaUsageWork(db, { activationKnownActive: true });
		if (result.claimedCount > 0) return "progress";
		return result.candidateCount > 0 ? "blocked" : "idle";
	}
	if (taskClass === "collection_deletion") {
		const result = await processDueMediaUsageCollectionDeletions(db);
		if (result.claimedCount > 0) return "progress";
		return result.candidateCount > 0 ? "blocked" : "idle";
	}
	const result = await processDueMediaUsageReconciliationDetailed(db, { activationKnownActive: true });
	if (result.outcome === "inactive") return "inactive";
	if (result.consumedUnit) return "progress";
	return result.outcome === "claim_lost" || result.hasDeferredCandidate ? "blocked" : "idle";
}
function inactiveResult() {
	return {
		state: "inactive",
		continuation: { kind: "none" }
	};
}
function canStartMediaUsageMaintenanceStep(metrics) {
	return metrics.dbCount + MEDIA_USAGE_MAINTENANCE_LIMITS.maxStepQueries <= MEDIA_USAGE_MAINTENANCE_LIMITS.eventQueryCeiling;
}
function f(property, codec = "text") {
	return {
		class: "field",
		property,
		codec
	};
}
function principal(property) {
	return {
		class: "principal",
		property,
		codec: "text"
	};
}
var EXCLUDED = { class: "excluded" };
var DERIVED = { class: "derived" };
var PORTABLE_TABLE_LIST = [
	{
		table: "_emdash_block_types",
		kind: "block_type",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			description: f("description"),
			icon: f("icon"),
			category: f("category"),
			current_version: f("currentVersion", "integer"),
			source: f("source"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_block_type_versions",
		kind: "block_type_version",
		columns: {
			id: f("id"),
			block_type_id: f("blockTypeId"),
			version: f("version", "integer"),
			fields: f("fields", "json"),
			fingerprint: DERIVED,
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_collections",
		kind: "collection",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			label_singular: f("labelSingular"),
			description: f("description"),
			icon: f("icon"),
			supports: f("supports", "json"),
			source: f("source"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			search_config: f("searchConfig", "json"),
			has_seo: f("hasSeo", "boolean"),
			url_pattern: f("urlPattern"),
			comments_enabled: f("commentsEnabled", "boolean"),
			comments_moderation: f("commentsModeration"),
			comments_closed_after_days: f("commentsClosedAfterDays", "integer"),
			comments_auto_approve_users: f("commentsAutoApproveUsers", "boolean"),
			hidden: f("hidden", "boolean"),
			sort_order: f("sortOrder", "integer"),
			admin_config: f("adminConfig", "json"),
			title_field: f("titleField"),
			date_field: f("dateField"),
			routable: f("routable", "boolean"),
			edit_locking: f("editLocking", "boolean"),
			nav_group: f("navGroup")
		}
	},
	{
		table: "_emdash_fields",
		kind: "field",
		columns: {
			id: f("id"),
			collection_id: f("collectionId"),
			slug: f("slug"),
			label: f("label"),
			type: f("type"),
			column_type: f("columnType"),
			required: f("required", "boolean"),
			unique: f("unique", "boolean"),
			default_value: f("defaultValue", "json"),
			validation: f("validation", "json"),
			widget: f("widget"),
			options: f("options", "json"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt"),
			searchable: f("searchable", "boolean"),
			translatable: f("translatable", "boolean"),
			indexed: f("indexed", "boolean")
		}
	},
	{
		table: "_emdash_taxonomy_defs",
		kind: "taxonomy_def",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			label_singular: f("labelSingular"),
			hierarchical: f("hierarchical", "boolean"),
			collections: f("collections", "json"),
			created_at: f("createdAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_relations",
		kind: "relation",
		columns: {
			id: f("id"),
			slug: f("slug"),
			parent_collection: f("parentCollection"),
			child_collection: f("childCollection"),
			parent_label: f("parentLabel"),
			child_label: f("childLabel"),
			parent_label_singular: f("parentLabelSingular"),
			child_label_singular: f("childLabelSingular"),
			max_children_per_parent: f("maxChildrenPerParent", "integer"),
			max_parents_per_child: f("maxParentsPerChild", "integer"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_byline_fields",
		kind: "byline_field",
		columns: {
			id: f("id"),
			slug: f("slug"),
			label: f("label"),
			type: f("type"),
			required: f("required", "boolean"),
			translatable: f("translatable", "boolean"),
			validation: f("validation", "json"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "media_folders",
		kind: "media_folder",
		columns: {
			id: f("id"),
			name: f("name"),
			name_key: f("nameKey")
		}
	},
	{
		table: "media",
		kind: "media",
		columns: {
			id: f("id"),
			filename: f("filename"),
			mime_type: f("mimeType"),
			size: f("size", "integer"),
			width: f("width", "integer"),
			height: f("height", "integer"),
			focal_x: f("focalX", "real"),
			focal_y: f("focalY", "real"),
			alt: f("alt"),
			caption: f("caption"),
			storage_key: { class: "targetLocal" },
			content_hash: DERIVED,
			status: DERIVED,
			blurhash: f("blurhash"),
			dominant_color: f("dominantColor"),
			created_at: f("createdAt"),
			author_id: principal("authorPrincipal"),
			folder_id: f("folderId")
		}
	},
	{
		table: "taxonomies",
		kind: "term",
		columns: {
			id: f("id"),
			name: f("name"),
			slug: f("slug"),
			label: f("label"),
			parent_id: f("parentId"),
			data: f("data", "json"),
			locale: f("locale"),
			translation_group: f("translationGroup"),
			sort_order: f("sortOrder", "integer")
		}
	},
	{
		table: "_emdash_bylines",
		kind: "byline",
		columns: {
			id: f("id"),
			slug: f("slug"),
			display_name: f("displayName"),
			bio: f("bio"),
			avatar_media_id: f("avatarMediaId"),
			website_url: f("websiteUrl"),
			user_id: principal("userPrincipal"),
			is_guest: f("isGuest", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_byline_field_values",
		kind: "byline_field_value",
		columns: {
			byline_id: f("bylineId"),
			field_id: f("fieldId"),
			value: f("value", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_byline_field_group_values",
		kind: "byline_field_group_value",
		columns: {
			translation_group: f("bylineGroup"),
			field_id: f("fieldId"),
			value: f("value", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "revisions",
		kind: "revision",
		columns: {
			id: f("id"),
			collection: f("collection"),
			entry_id: f("entryId"),
			data: f("data", "json"),
			author_id: principal("authorPrincipal"),
			created_at: f("createdAt")
		}
	},
	{
		table: "content_taxonomies",
		kind: "content_term",
		columns: {
			collection: f("collection"),
			entry_id: f("entryGroup"),
			taxonomy_id: f("termGroup"),
			status: EXCLUDED,
			scheduled_at: EXCLUDED,
			deleted_at: EXCLUDED,
			locale: EXCLUDED,
			published_at: EXCLUDED,
			created_at: EXCLUDED
		}
	},
	{
		table: "_emdash_content_bylines",
		kind: "content_byline",
		columns: {
			id: f("id"),
			collection_slug: f("collection"),
			content_id: f("entryId"),
			byline_id: f("bylineGroup"),
			sort_order: f("sortOrder", "integer"),
			role_label: f("roleLabel"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_content_references",
		kind: "content_reference",
		columns: {
			id: f("id"),
			relation_id: f("relationId"),
			parent_group: f("parentGroup"),
			child_group: f("childGroup"),
			sort_order: f("sortOrder", "integer"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_seo",
		kind: "seo",
		columns: {
			collection: f("collection"),
			content_id: f("entryId"),
			seo_title: f("seoTitle"),
			seo_description: f("seoDescription"),
			seo_image: {
				class: "mediaRef",
				property: "seoImage",
				codec: "text"
			},
			seo_canonical: f("seoCanonical"),
			seo_no_index: f("seoNoIndex", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_menus",
		kind: "menu",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_menu_items",
		kind: "menu_item",
		columns: {
			id: f("id"),
			menu_id: f("menuId"),
			parent_id: f("parentId"),
			sort_order: f("sortOrder", "integer"),
			type: f("type"),
			reference_collection: f("referenceCollection"),
			reference_id: f("referenceGroup"),
			custom_url: f("customUrl"),
			label: f("label"),
			title_attr: f("titleAttr"),
			target: f("target"),
			css_classes: f("cssClasses"),
			created_at: f("createdAt"),
			locale: f("locale"),
			translation_group: f("translationGroup")
		}
	},
	{
		table: "_emdash_widget_areas",
		kind: "widget_area",
		columns: {
			id: f("id"),
			name: f("name"),
			label: f("label"),
			description: f("description"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_widgets",
		kind: "widget",
		columns: {
			id: f("id"),
			area_id: f("areaId"),
			sort_order: f("sortOrder", "integer"),
			type: f("type"),
			title: f("title"),
			content: f("content", "json"),
			menu_name: f("menuName"),
			component_id: f("componentId"),
			component_props: f("componentProps", "json"),
			created_at: f("createdAt")
		}
	},
	{
		table: "_emdash_sections",
		kind: "section",
		columns: {
			id: f("id"),
			slug: f("slug"),
			title: f("title"),
			description: f("description"),
			keywords: f("keywords", "json"),
			content: f("content", "json"),
			preview_media_id: f("previewMediaId"),
			source: f("source"),
			theme_id: f("themeId"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_redirects",
		kind: "redirect",
		columns: {
			id: f("id"),
			source: f("source"),
			destination: f("destination"),
			type: f("type", "integer"),
			is_pattern: f("isPattern", "boolean"),
			enabled: f("enabled", "boolean"),
			hits: EXCLUDED,
			last_hit_at: EXCLUDED,
			group_name: f("groupName"),
			auto: f("auto", "boolean"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt"),
			config_revision: DERIVED,
			source_guard: DERIVED,
			write_generation: DERIVED
		}
	},
	{
		table: "_emdash_comments",
		kind: "comment",
		columns: {
			id: f("id"),
			collection: f("collection"),
			content_id: f("entryId"),
			parent_id: f("parentId"),
			author_name: f("authorName"),
			author_email: f("authorEmail"),
			author_user_id: principal("authorPrincipal"),
			body: f("body"),
			status: f("status"),
			ip_hash: EXCLUDED,
			user_agent: EXCLUDED,
			moderation_metadata: f("moderationMetadata", "json"),
			created_at: f("createdAt"),
			updated_at: f("updatedAt")
		}
	},
	{
		table: "_emdash_comment_reactions",
		kind: "comment_reaction",
		columns: {
			id: f("id"),
			comment_id: f("commentId"),
			reaction: f("reaction"),
			voter_hash: { class: "randomized" },
			created_at: f("createdAt")
		}
	},
	{
		table: "options",
		kind: "setting",
		columns: {
			name: f("id"),
			value: f("value", "json"),
			revision: DERIVED
		}
	}
];
var PORTABLE_TABLES = Object.freeze(PORTABLE_TABLE_LIST);
/** Standard columns of every `ec_*` content table (kind `entry`). */
var CONTENT_TABLE_COLUMNS = Object.freeze({
	id: f("id"),
	slug: f("slug"),
	status: f("status"),
	author_id: principal("authorPrincipal"),
	primary_byline_id: f("primaryBylineGroup"),
	created_at: f("createdAt"),
	updated_at: f("updatedAt"),
	published_at: f("publishedAt"),
	scheduled_at: f("scheduledAt"),
	deleted_at: f("deletedAt"),
	version: f("version", "integer"),
	live_revision_id: f("liveRevisionId"),
	draft_revision_id: f("draftRevisionId"),
	locale: f("locale"),
	translation_group: f("translationGroup")
});
Object.freeze({
	users: "auth",
	credentials: "auth",
	auth_tokens: "auth",
	oauth_accounts: "auth",
	allowed_domains: "auth",
	auth_challenges: "auth",
	_emdash_api_tokens: "auth",
	_emdash_oauth_tokens: "auth",
	_emdash_oauth_clients: "auth",
	_emdash_authorization_codes: "auth",
	_emdash_device_codes: "auth",
	_emdash_rate_limits: "runtime",
	_emdash_entry_locks: "runtime",
	_emdash_cron_tasks: "runtime",
	_emdash_redirect_write_lock: "runtime",
	_emdash_redirect_state: "derived",
	_emdash_redirect_artifacts: "derived",
	_emdash_redirect_generation_artifacts: "derived",
	_emdash_404_log: "runtime",
	_emdash_revision_prune_queue: "runtime",
	_emdash_media_upload_attempts: "runtime",
	_emdash_media_usage: "derived",
	_emdash_media_usage_sources: "derived",
	_emdash_media_usage_cleanup: "runtime",
	_emdash_media_usage_cleanup_fence: "runtime",
	_emdash_media_usage_generation_writes: "runtime",
	_emdash_media_usage_index_status: "derived",
	_emdash_media_usage_activation: "runtime",
	_emdash_media_usage_work: "runtime",
	_emdash_media_usage_collection_deletions: "runtime",
	_emdash_media_usage_reconciliations: "runtime",
	_emdash_taxonomy_def_groups: "derived",
	audit_logs: "audit",
	_emdash_migrations: "migrations",
	_emdash_migrations_lock: "migrations",
	_plugin_storage: "plugin",
	_plugin_state: "plugin",
	_plugin_indexes: "plugin"
});
Object.freeze([
	"_emdash_fts_",
	"_emdash_transfer_",
	"_plugin_",
	"sqlite_"
]);
var PORTABLE_BY_TABLE = new Map(PORTABLE_TABLES.map((spec) => [spec.table, spec]));
var PORTABLE_BY_KIND = new Map(PORTABLE_TABLES.map((spec) => [spec.kind, spec]));
function isContentTableName(table) {
	return table.startsWith("ec_");
}
function getPortableTableSpec(table) {
	return PORTABLE_BY_TABLE.get(table);
}
/** The table for a kind; `entry` lives in `ec_*` tables and `principal` in none. */
function getPortableTableSpecForKind(kind) {
	return PORTABLE_BY_KIND.get(kind);
}
/**
* Column classification for a table in `db`. For an `ec_*` table the
* standard columns come from {@link CONTENT_TABLE_COLUMNS} and each column
* named by a registered field of that collection is a generic `field`
* (property = field slug, codec from the field's column type).
*/
async function getColumnSpecs(db, table) {
	const spec = PORTABLE_BY_TABLE.get(table);
	if (spec) return spec.columns;
	if (!isContentTableName(table)) throw new TransferError("TRANSFER_SCHEMA_UNCLASSIFIED", "Table is not portable", { detail: { table } });
	const slug = table.slice(3);
	validateIdentifier(slug, "collection slug");
	return contentColumnSpecs(await db.selectFrom("_emdash_fields").innerJoin("_emdash_collections", "_emdash_collections.id", "_emdash_fields.collection_id").select([
		"_emdash_fields.slug as slug",
		"_emdash_fields.column_type as column_type",
		"_emdash_fields.type as type",
		"_emdash_fields.validation as validation"
	]).where("_emdash_collections.slug", "=", slug).execute(), await listTableColumns(db, table));
}
/**
* Column classification of an `ec_*` table from its collection's registered
* fields and the table's declared columns (see {@link getColumnSpecs}).
*
* A storage-less field's values are content references, not a column. A
* column left under its slug from before the field was bound is excluded.
*/
function contentColumnSpecs(fields, tableColumns) {
	const declared = new Map(tableColumns.map((column) => [column.name, column.type.toLowerCase()]));
	const columns = { ...CONTENT_TABLE_COLUMNS };
	for (const field of fields) {
		if (Object.hasOwn(columns, field.slug)) continue;
		if (isStoragelessFieldRow(field)) {
			columns[field.slug] = EXCLUDED;
			continue;
		}
		let codec = codecForColumnType(field.column_type);
		if (codec === "nativeJson" && !JSON_COLUMN_TYPES.has(declared.get(field.slug) ?? "")) codec = "json";
		columns[field.slug] = f(field.slug, codec);
	}
	return columns;
}
var JSON_COLUMN_TYPES = /* @__PURE__ */ new Set(["json", "jsonb"]);
function codecForColumnType(columnType) {
	switch (columnType) {
		case "INTEGER": return "integer";
		case "REAL": return "real";
		case "JSON": return "nativeJson";
		default: return "text";
	}
}
/** Columns present in `table` that the registry does not classify. */
async function listUnclassifiedColumns(db, table) {
	const specs = await getColumnSpecs(db, table);
	return (await listTableColumns(db, table)).map((column) => column.name).filter((name) => !Object.hasOwn(specs, name));
}
/**
* Throw `TRANSFER_SCHEMA_UNCLASSIFIED` unless every column of `table` is
* classified. Readers call this before reading a table so an unclassified
* column is never silently dropped from (or leaked into) a package.
*/
async function assertColumnCoverage(db, table) {
	assertCoverage(table, await listUnclassifiedColumns(db, table));
}
/** {@link assertColumnCoverage} for a table whose columns and specs are already loaded. */
function assertLoadedColumnCoverage(table, specs, tableColumns) {
	assertCoverage(table, tableColumns.map((column) => column.name).filter((name) => !Object.hasOwn(specs, name)));
}
function assertCoverage(table, unclassified) {
	if (unclassified.length > 0) throw new TransferError("TRANSFER_SCHEMA_UNCLASSIFIED", `Table ${table} has columns without a transfer classification`, { detail: {
		table,
		columns: unclassified.join(",")
	} });
}
/**
* The single decoding and encoding path between database column values and
* record property values. Exporter readers, verification, and importer
* writers must all go through these functions so a value read on one dialect
* and written on another round-trips to the same record value.
*
* Rules:
* - SQL `NULL` decodes to `undefined` (the property is omitted) and
*   `undefined`/`null` encode to `NULL`.
* - `boolean`: 0/1 integers ↔ booleans (any non-zero number decodes to true).
* - `integer`: numbers, and Postgres `bigint` strings, decode to numbers when
*   they are safe integers. Any other value (non-numeric text a SQLite column
*   may hold) decodes to itself.
* - `real`: numbers. On Postgres, `real` is float4 and node-pg renders it
*   with float4 precision (`0.1`), which differs from the float4 value itself
*   (`Math.fround(0.1)`). Select REAL columns with {@link selectColumn}, which
*   casts to float8 on Postgres, so the decoded number is exactly the stored
*   float4 value.
* - `json` (JSON held in a TEXT column): the parsed value; text that is not
*   valid JSON decodes to the text itself. Encoding always writes
*   `JSON.stringify`, so raw text that is not JSON is stored as a JSON
*   string: EmDash parses these columns as JSON when it reads them.
* - `nativeJson` (a column declared `json`: `ec_*` JSON fields): on
*   Postgres, node-pg returns the parsed value; on SQLite the column has
*   NUMERIC affinity, so numbers come back as numbers and everything else as
*   text decoded like `json`. Encoding on Postgres is always
*   `JSON.stringify`; on SQLite numbers are written as numbers and the rest
*   like `json`.
* - `text`: strings verbatim.
* - A JSON `null` decodes like SQL `NULL` (absent): node-pg cannot tell them
*   apart in a `json` column, so neither dialect does. A NOT NULL JSON
*   column can only hold JSON `null` for an absent value, so encoding for
*   one (`notNull`) writes JSON `null`.
*
* Invariant: for every value `v` produced by `decodeColumn`,
* `decodeColumn(encodeColumn(v))` on either dialect yields `v`.
*/
var SAFE_INTEGER_TEXT = /^-?\d+$/;
function dialectOf(source) {
	return typeof source === "string" ? source : detectDialect(source);
}
function tryParseJson(text) {
	try {
		return {
			ok: true,
			value: JSON.parse(text)
		};
	} catch {
		return { ok: false };
	}
}
function invalid(codec, reason) {
	return new TransferError("TRANSFER_RECORD_INVALID", "Value cannot be stored in its column", { detail: {
		codec,
		reason
	} });
}
/** Decode one raw column value. Returns `undefined` for SQL `NULL`. */
function decodeColumn(source, codec, raw) {
	if (raw === null || raw === void 0) return void 0;
	const dialect = dialectOf(source);
	switch (codec) {
		case "text": return raw;
		case "boolean":
			if (typeof raw === "number") return raw !== 0;
			if (typeof raw === "bigint") return raw !== 0n;
			if (typeof raw === "string" && SAFE_INTEGER_TEXT.test(raw)) return Number(raw) !== 0;
			if (typeof raw === "boolean") return raw;
			return raw;
		case "integer":
			if (typeof raw === "bigint") return Number.isSafeInteger(Number(raw)) ? Number(raw) : String(raw);
			if (typeof raw === "string" && SAFE_INTEGER_TEXT.test(raw)) {
				const value = Number(raw);
				return Number.isSafeInteger(value) ? value : raw;
			}
			return raw;
		case "real":
			if (typeof raw === "string" && dialect === "postgres") return Number(raw);
			return raw;
		case "json":
			if (typeof raw !== "string") return raw;
			return decodeJsonText(raw);
		case "nativeJson":
			if (dialect === "postgres") return raw;
			if (typeof raw !== "string") return raw;
			return decodeJsonText(raw);
	}
}
function decodeJsonText(text) {
	const parsed = tryParseJson(text);
	if (!parsed.ok) return text;
	return parsed.value === null ? void 0 : parsed.value;
}
/**
* Encode one record value for a column. Returns `null` for an absent value,
* or JSON `null` when `notNull` is set for a JSON column.
*/
function encodeColumn(source, codec, value, options = {}) {
	if (value === void 0 || value === null) return options.notNull && (codec === "json" || codec === "nativeJson") ? "null" : null;
	const dialect = dialectOf(source);
	switch (codec) {
		case "text":
			if (typeof value !== "string") throw invalid(codec, "expected a string");
			return value;
		case "boolean":
			if (typeof value !== "boolean") throw invalid(codec, "expected a boolean");
			return value ? 1 : 0;
		case "integer":
			if (typeof value === "number") {
				if (!Number.isSafeInteger(value)) throw invalid(codec, "expected an integer");
				return value;
			}
			if (typeof value === "string" && dialect === "sqlite") return value;
			throw invalid(codec, "expected an integer");
		case "real":
			if (typeof value === "number") {
				if (!Number.isFinite(value)) throw invalid(codec, "expected a finite number");
				return value;
			}
			if (typeof value === "string" && dialect === "sqlite") return value;
			throw invalid(codec, "expected a number");
		case "json": return encodeJsonText(value);
		case "nativeJson":
			if (dialect === "postgres") return JSON.stringify(value);
			if (typeof value === "number") return value;
			return encodeJsonText(value);
	}
}
function encodeJsonText(value) {
	const text = JSON.stringify(value);
	if (text === void 0) throw invalid("json", "value is not JSON");
	return text;
}
/**
* Select expression for a column, aliased to the column name. REAL columns
* are cast to float8 on Postgres (see the module comment).
*/
function selectColumn(source, column, codec) {
	if (codec === "real" && dialectOf(source) === "postgres") return sql`${sql.ref(column)}::float8`.as(column);
	return sql`${sql.ref(column)}`.as(column);
}
function propertyOf(spec) {
	return "property" in spec ? {
		property: spec.property,
		codec: spec.codec
	} : null;
}
/**
* Select expressions for every exported column of a table (columns whose
* class has a property), in `specs` order.
*/
function selectExportedColumns(source, specs) {
	const expressions = [];
	for (const [column, spec] of Object.entries(specs)) {
		const mapped = propertyOf(spec);
		if (mapped) expressions.push(selectColumn(source, column, mapped.codec));
	}
	return expressions;
}
/** Decode a row into record properties; NULL columns are omitted. */
function decodeRow(source, specs, row) {
	const dialect = dialectOf(source);
	const properties = {};
	for (const [column, spec] of Object.entries(specs)) {
		const mapped = propertyOf(spec);
		if (!mapped || !Object.hasOwn(row, column)) continue;
		const value = decodeColumn(dialect, mapped.codec, row[column]);
		if (value !== void 0) properties[mapped.property] = value;
	}
	return properties;
}
/** Whether an `ec_*` column is a field column rather than a standard column. */
function isContentFieldColumn(column) {
	return !Object.hasOwn(CONTENT_TABLE_COLUMNS, column);
}
/**
* Decode an `ec_*` row into the standard entry properties and the `fields`
* map (field slug → value). `specs` comes from `getColumnSpecs`.
*/
function decodeContentRow(source, specs, row) {
	const standard = {};
	const fieldSpecs = {};
	for (const [column, spec] of Object.entries(specs)) if (isContentFieldColumn(column)) fieldSpecs[column] = spec;
	else standard[column] = spec;
	return {
		properties: decodeRow(source, standard, row),
		fields: decodeRow(source, fieldSpecs, row)
	};
}
/** Codecs of the columns a record carries (`field`, `principal`, `mediaRef`). */
function recordCodecs(columns) {
	const codecs = {};
	for (const [column, spec] of Object.entries(columns)) if ("property" in spec) codecs[column] = spec.codec;
	return codecs;
}
/**
* The row for `record` over every column the record carries. `record` must
* already be in target form: placeholders resolved and principals mapped.
*/
function encodeRecord(db, columns, record, location) {
	const row = {};
	for (const [column, spec] of Object.entries(columns)) {
		if (!("property" in spec)) continue;
		row[column] = encodeValue(db, spec.codec, Object.hasOwn(record, spec.property) ? record[spec.property] : void 0, {
			...location,
			column
		});
	}
	return row;
}
/** `encodeColumn`, with the record and column named in a failure. */
function encodeValue(db, codec, value, location, options = {}) {
	try {
		return encodeColumn(db, codec, value, options);
	} catch (error) {
		if (!isTransferError(error)) throw error;
		throw new TransferError(error.code, "Record value does not fit its target column", {
			detail: {
				...location,
				...error.detail
			},
			cause: error
		});
	}
}
function comparable(db, codec, raw, options) {
	const value = decodeColumn(db, codec, options.encoded && codec === "nativeJson" && isPostgres(db) && typeof raw === "string" ? JSON.parse(raw) : raw);
	if (value === void 0) return void 0;
	if (options.float4 && codec === "real" && typeof value === "number") return canonicalJson$1(Math.fround(value));
	return canonicalJson$1(value);
}
/**
* The first column (in `codecs` order) where the stored row differs from the
* row the importer encoded, or null when they are equal over those columns.
* Postgres returns `json` columns parsed, so an encoded `nativeJson` value is
* parsed before it is compared.
*/
function firstDifference(db, codecs, encoded, stored, options) {
	for (const [column, codec] of Object.entries(codecs)) if (comparable(db, codec, encoded[column], {
		...options,
		encoded: true
	}) !== comparable(db, codec, stored[column], {
		...options,
		encoded: false
	})) return column;
	return null;
}
/**
* Parameter-bounded multi-row statements over tables named at runtime.
*
* Table and column names come from the column registry or from validated
* collection and field slugs; every value is a bound parameter. Each
* statement binds at most `TRANSFER_LIMITS.d1BindParameters` values.
*/
var TABLE_NAME = /^_?[a-z][a-z0-9_]*$/;
function tableRef(table) {
	if (!TABLE_NAME.test(table)) throw new Error(`Invalid table name ${table}`);
	return sql.ref(table);
}
function columnRef(column) {
	validateIdentifier(column, "column");
	return sql.ref(column);
}
/**
* Insert `rows` (all with exactly `columns`) in statements of at most
* `rowsPerInsert(columns.length)` rows. Returns the number of rows the
* statements inserted or updated.
*/
async function insertRows(db, table, columns, rows, conflict = { type: "nothing" }) {
	const perStatement = rowsPerInsert(columns.length);
	if (perStatement === 0) throw new Error(`Too many columns for one insert into ${table}`);
	const columnList = sql.join(columns.map(columnRef));
	const onConflict = conflict.type === "nothing" ? sql`ON CONFLICT DO NOTHING` : sql`ON CONFLICT (${sql.join(conflict.target.map(columnRef))}) DO UPDATE SET ${sql.join(conflict.update.map((column) => sql`${columnRef(column)} = excluded.${columnRef(column)}`))}`;
	let written = 0;
	for (const batch of chunks([...rows], perStatement)) {
		const values = sql.join(batch.map((row) => sql`(${sql.join(columns.map((column) => row[column] ?? null))})`));
		const result = await sql`INSERT INTO ${tableRef(table)} (${columnList}) VALUES ${values} ${onConflict}`.execute(db);
		written += Number(result.numAffectedRows ?? 0n);
	}
	return written;
}
/** Rows of `table` whose `keyColumns` equal one of `keys`. */
async function selectByKeys(db, table, keyColumns, keys) {
	const perStatement = Math.max(1, Math.floor(TRANSFER_LIMITS.d1BindParameters / keyColumns.length));
	const result = [];
	for (const batch of chunks([...keys], perStatement)) {
		const [only] = keyColumns;
		const where = keyColumns.length === 1 && only !== void 0 ? sql`${columnRef(only)} IN (${sql.join(batch.map((key) => key[only] ?? null))})` : sql.join(batch.map((key) => sql`(${sql.join(keyColumns.map((column) => sql`${columnRef(column)} = ${key[column] ?? null}`), sql` AND `)})`), sql` OR `);
		const rows = await sql`SELECT * FROM ${tableRef(table)} WHERE ${where}`.execute(db);
		result.push(...rows.rows);
	}
	return result;
}
/**
* Set `columns` of the row whose `keyColumn` equals `key`, in statements of
* at most `d1BindParameters - 1` columns.
*/
async function updateColumns(db, table, keyColumn, key, row, columns) {
	let statements = 0;
	for (const batch of chunks([...columns], TRANSFER_LIMITS.d1BindParameters - 1)) {
		const assignments = sql.join(batch.map((column) => sql`${columnRef(column)} = ${row[column] ?? null}`));
		await sql`UPDATE ${tableRef(table)} SET ${assignments} WHERE ${columnRef(keyColumn)} = ${key}`.execute(db);
		statements++;
	}
	return statements;
}
/** Statements `insertRows` + `selectByKeys` need for `count` rows. */
function estimateStatements(count, columns, keyColumns = 1) {
	const perInsert = Math.max(1, rowsPerInsert(columns));
	const perSelect = Math.max(1, Math.floor(TRANSFER_LIMITS.d1BindParameters / keyColumns));
	return Math.ceil(count / perInsert) + Math.ceil(count / perSelect);
}
var registry_exports = /* @__PURE__ */ __exportAll({
	SchemaError: () => SchemaError,
	SchemaRegistry: () => SchemaRegistry,
	buildSeedCollectionCaptureFingerprint: () => buildSeedCollectionCaptureFingerprint
});
var EC_PREFIX_PATTERN = /^ec_/;
var SINGLE_QUOTE_PATTERN = /'/g;
var UNDERSCORE_PATTERN = /_/g;
var WORD_BOUNDARY_PATTERN = /\b\w/g;
var FIELD_ID_PATTERN = /^[0-9A-Z]{26}$/;
/** Valid column types for runtime validation */
var COLUMN_TYPES = /* @__PURE__ */ new Set([
	"TEXT",
	"REAL",
	"INTEGER",
	"JSON"
]);
var COLUMN_TYPE_TO_DATA_TYPE = {
	TEXT: "text",
	REAL: "real",
	INTEGER: "integer",
	JSON: "json"
};
var TEXT_ALIAS_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"slug"
]);
/** Field types usable as a `titleField` — plain text that reads well as a title. */
var TITLE_FIELD_TYPES = /* @__PURE__ */ new Set([
	"string",
	"text",
	"slug"
]);
/** Valid collection source prefixes/values */
var VALID_SOURCES = /* @__PURE__ */ new Set([
	"manual",
	"discovered",
	"seed"
]);
function isCollectionSource(value) {
	return VALID_SOURCES.has(value) || value.startsWith("template:") || value.startsWith("import:");
}
function isFieldType(value) {
	return value in FIELD_TYPE_TO_COLUMN;
}
function isColumnType(value) {
	return COLUMN_TYPES.has(value);
}
var REPEATER_SUB_FIELD_TYPE_SET = new Set(REPEATER_SUB_FIELD_TYPES);
function findUnsupportedRepeaterSubFieldType(validation) {
	if (!validation || typeof validation !== "object") return void 0;
	const subFields = "subFields" in validation ? validation.subFields : void 0;
	if (!Array.isArray(subFields)) return void 0;
	for (const [index, subField] of subFields.entries()) {
		if (!subField || typeof subField !== "object") continue;
		const type = "type" in subField ? subField.type : void 0;
		if (typeof type === "string" && !REPEATER_SUB_FIELD_TYPE_SET.has(type)) return {
			type,
			path: `validation.subFields[${index}].type`
		};
	}
}
var VALID_COLLECTION_SUPPORTS = /* @__PURE__ */ new Set([
	"drafts",
	"revisions",
	"preview",
	"scheduling",
	"search",
	"seo"
]);
var SEED_FIELD_INSERT_BATCH_SIZE = 6;
/**
* Collection ordering shared by every list read: explicit `sort_order`
* first (ascending), then alphabetically by slug.
*/
var collectionOrder = sql`coalesce(sort_order, ${sql.lit(2147483647)})`;
function assertIndexableField(field, indexed, slug) {
	if (!indexed) return;
	if (!isIndexableFieldType(field.type)) throw new SchemaError(`Field "${slug}" cannot be indexed because type "${field.type}" is not a scalar query type`, "FIELD_NOT_INDEXABLE");
	if (isStoragelessField(field)) throw new SchemaError(`Field "${slug}" cannot be indexed because it stores no column to index`, "FIELD_NOT_INDEXABLE");
}
/** A field record's `validation`, which the package carries as any JSON value. */
function importFieldValidation(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
	return value;
}
function isCollectionSupport(value) {
	return typeof value === "string" && VALID_COLLECTION_SUPPORTS.has(value);
}
/**
* Parse a collection's `supports` column (stored as a JSON array of
* CollectionSupport keys). Unknown/invalid entries are filtered out so the
* runtime value matches the declared `CollectionSupport[]` type.
*
* Throws on malformed JSON so corruption surfaces loudly; returns an empty
* array only for explicitly null/empty values or non-array JSON.
*/
function parseSupports(raw) {
	if (!raw) return [];
	const parsed = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed.filter(isCollectionSupport);
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseCollectionAdmin(raw) {
	if (!raw) return void 0;
	const parsed = JSON.parse(raw);
	if (!isRecord(parsed)) return void 0;
	const listColumns = parsed.listColumns;
	return {
		listColumns: Array.isArray(listColumns) ? listColumns.filter((value) => typeof value === "string") : void 0,
		quickCreate: typeof parsed.quickCreate === "boolean" ? parsed.quickCreate : void 0
	};
}
async function buildSeedCollectionCaptureFingerprint(input, fields) {
	const supports = input.supports ?? ["drafts", "revisions"];
	const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
	let maxSortOrder = -1;
	const definitions = fields.map((field) => {
		const sortOrder = field.sortOrder ?? maxSortOrder + 1;
		maxSortOrder = Math.max(maxSortOrder, sortOrder);
		return {
			slug: field.slug,
			label: field.label,
			type: field.type,
			required: field.required ?? false,
			unique: field.unique ?? false,
			defaultValue: field.defaultValue === void 0 ? null : JSON.stringify(field.defaultValue),
			validation: field.validation ? JSON.stringify(field.validation) : null,
			widget: field.widget ?? null,
			options: field.options ? JSON.stringify(field.options) : null,
			sortOrder,
			searchable: field.searchable ?? false,
			translatable: field.translatable ?? true
		};
	});
	const payload = JSON.stringify(canonicalizeFingerprintValue({
		version: 1,
		collection: {
			slug: input.slug,
			label: input.label,
			labelSingular: input.labelSingular ?? null,
			description: input.description ?? null,
			icon: input.icon ?? null,
			admin: input.admin ?? null,
			supports,
			hasSeo,
			hidden: input.hidden ?? false,
			sortOrder: input.sortOrder ?? null,
			...input.group ? { group: input.group } : {},
			commentsEnabled: input.commentsEnabled ?? false,
			...input.editLocking === false ? { editLocking: false } : {},
			urlPattern: input.urlPattern ?? null,
			routable: input.routable ?? true
		},
		fields: definitions
	}));
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
	return `media-usage-seed:v1:sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
function canonicalizeFingerprintValue(value) {
	if (value === void 0) return { __emdashUndefined: true };
	if (Array.isArray(value)) return value.map(canonicalizeFingerprintValue);
	if (typeof value !== "object" || value === null) return value;
	const canonical = {};
	for (const [key, entry] of Object.entries(value).toSorted(([a], [b]) => a.localeCompare(b))) canonical[key] = canonicalizeFingerprintValue(entry);
	return canonical;
}
/**
* Media-usage capture fingerprint for an imported collection, so an
* interrupted import resumes only the capture lifecycle it started.
*/
async function importCaptureFingerprint(record, fields) {
	return `media-usage-import:v1:${await canonicalDigest({
		collection: record,
		fields
	})}`;
}
/** Search stays disabled until the import's rebuild stage builds the index. */
function importSearchConfig(config) {
	if (config === void 0) return null;
	if (isRecord(config) && config.enabled === true) return JSON.stringify({
		...config,
		enabled: false
	});
	return JSON.stringify(config);
}
/**
* Error thrown when a schema operation fails
*/
var SchemaError = class extends Error {
	constructor(message, code, details) {
		super(message);
		this.code = code;
		this.details = details;
		this.name = "SchemaError";
	}
};
function collectionBeingDeletedError(slug) {
	return new SchemaError(`Collection "${slug}" is being deleted. Try again shortly.`, "COLLECTION_EXISTS");
}
/**
* Schema Registry
*
* Manages collection and field definitions stored in D1.
* Handles runtime DDL operations (CREATE TABLE, ALTER TABLE).
*/
var SchemaRegistry = class {
	constructor(db) {
		this.db = db;
	}
	/**
	* Notify the dev typegen hook that the schema has changed.
	*/
	notifyTypegen() {
		refreshDevTypes();
	}
	/** A deleted collection's slug stays taken until its media usage cleanup finalizes. */
	async finishPendingDeletion(slug) {
		const deletion = await finishMediaUsageCollectionDeletion(this.db, slug);
		if (deletion.state === "failed") throw new SchemaError(`Deleting the previous collection "${slug}" failed. Retry it by sending {"collectionId":"${deletion.collectionId}"} to POST /_emdash/api/admin/media-usage/collection-deletions/retry, then create the collection again.`, "COLLECTION_EXISTS", { deletedCollectionId: deletion.collectionId });
		if (deletion.state === "pending") throw collectionBeingDeletedError(slug);
	}
	/**
	* List all collections
	*/
	async listCollections() {
		return (await this.db.selectFrom("_emdash_collections").selectAll().orderBy(collectionOrder, "asc").orderBy("slug", "asc").execute()).map(this.mapCollectionRow);
	}
	/**
	* Get a collection by slug
	*/
	async getCollection(slug) {
		const row = await this.db.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
		return row ? this.mapCollectionRow(row) : null;
	}
	/**
	* Get a collection with all its fields
	*/
	async getCollectionWithFields(slug) {
		const collection = await this.getCollection(slug);
		if (!collection) return null;
		const fields = await this.listFields(collection.id);
		return {
			...collection,
			fields
		};
	}
	/**
	* List every collection together with its fields in O(1) query shapes
	* — one for collections, then one batched query for the fields of every
	* returned collection — instead of the N+1 pattern of `listCollections`
	* + per-collection `listFields`. The fields query is chunked at
	* `SQL_BATCH_SIZE` to stay under D1's bound-parameter limit, so on
	* sites with more than `SQL_BATCH_SIZE` collections the field fetch
	* becomes `ceil(collectionCount / SQL_BATCH_SIZE)` queries — still
	* a constant factor, not N+1. Typical sites have well under
	* `SQL_BATCH_SIZE` collections, so this is two queries in practice.
	*
	* Used by the manifest build, which previously paid N+1 round-trips on
	* every admin request. Each round-trip costs ~80–150ms against the D1
	* primary on a busy link, so a 10-collection site spent ~1 s rebuilding
	* a manifest that is now built fresh per admin request (no cache).
	*/
	async listCollectionsWithFields() {
		const collectionRows = await this.db.selectFrom("_emdash_collections").selectAll().orderBy(collectionOrder, "asc").orderBy("slug", "asc").execute();
		if (collectionRows.length === 0) return [];
		const fieldsByCollection = /* @__PURE__ */ new Map();
		for (const idChunk of chunks(collectionRows.map((c) => c.id), 50)) {
			const fieldRows = await this.db.selectFrom("_emdash_fields").where("collection_id", "in", idChunk).selectAll().orderBy("collection_id", "asc").orderBy("sort_order", "asc").orderBy("created_at", "asc").execute();
			for (const row of fieldRows) {
				const list = fieldsByCollection.get(row.collection_id) ?? [];
				list.push(this.mapFieldRow(row));
				fieldsByCollection.set(row.collection_id, list);
			}
		}
		return collectionRows.map((c) => ({
			...this.mapCollectionRow(c),
			fields: fieldsByCollection.get(c.id) ?? []
		}));
	}
	/**
	* Validate `titleField`/`dateField` against the collection's fields:
	* `titleField` must be a text-like field; `dateField` must be a `datetime` field.
	* Only truthy values are checked (undefined = unchanged, null/"" = cleared).
	*/
	async validateTitleDateFields(collectionId, collectionSlug, input, db = this.db) {
		const slugs = [input.titleField, input.dateField].filter((slug) => !!slug);
		if (slugs.length === 0) return;
		const rows = await db.selectFrom("_emdash_fields").where("collection_id", "=", collectionId).where("slug", "in", slugs).select(["slug", "type"]).execute();
		const typeBySlug = new Map(rows.map((row) => [row.slug, row.type]));
		if (input.titleField) {
			const type = typeBySlug.get(input.titleField);
			if (type === void 0) throw new SchemaError(`titleField "${input.titleField}" is not a field on "${collectionSlug}"`, "INVALID_TITLE_FIELD");
			if (!TITLE_FIELD_TYPES.has(type)) throw new SchemaError(`titleField "${input.titleField}" must be a text field (got "${type}")`, "INVALID_TITLE_FIELD");
		}
		if (input.dateField) {
			const type = typeBySlug.get(input.dateField);
			if (type === void 0) throw new SchemaError(`dateField "${input.dateField}" is not a field on "${collectionSlug}"`, "INVALID_DATE_FIELD");
			if (type !== "datetime") throw new SchemaError(`dateField "${input.dateField}" must be a datetime field (got "${type}")`, "INVALID_DATE_FIELD");
		}
	}
	/**
	* Create a new collection
	*/
	async createCollection(input) {
		this.validateSlug(input.slug, "collection");
		this.validateUrlPattern(input.urlPattern);
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		await this.finishPendingDeletion(input.slug);
		const existing = await this.getCollection(input.slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, input.slug)) throw collectionBeingDeletedError(input.slug);
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug
		})) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const proposedId = existing?.id ?? ulid();
		const tableName = this.getTableName(input.slug);
		if (!existing && await tableExists(this.db, tableName) && !await findResumableMediaUsageCollectionCaptureId(this.db, { collectionSlug: input.slug })) throw new SchemaError(`Collection table "${tableName}" exists but is not registered`, "COLLECTION_TABLE_ORPHANED");
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		await withTransaction(this.db, async (trx) => {
			const capture = await prepareMediaUsageCollectionCapture(trx, {
				collectionId: proposedId,
				collectionSlug: input.slug,
				registeredCollectionId: existing?.id
			});
			const values = {
				id: capture.collectionId,
				slug: input.slug,
				label: input.label,
				label_singular: input.labelSingular ?? null,
				description: input.description ?? null,
				icon: input.icon ?? null,
				admin_config: input.admin ? JSON.stringify(input.admin) : null,
				supports: JSON.stringify(supports),
				source: input.source ?? "manual",
				has_seo: hasSeo ? 1 : 0,
				routable: input.routable === false ? 0 : 1,
				hidden: input.hidden ? 1 : 0,
				sort_order: input.sortOrder ?? null,
				nav_group: input.group?.trim() || null,
				comments_enabled: input.commentsEnabled ? 1 : 0,
				edit_locking: input.editLocking === false ? 0 : 1,
				url_pattern: input.urlPattern ?? null
			};
			if (capture.captureRequired) {
				await this.createContentTable(input.slug, trx, [], { ifNotExists: capture.resuming });
				await installPreparedMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				await markMediaUsageCollectionCaptureReady(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				if (!capture.registrationExists) await trx.insertInto("_emdash_collections").values(values).execute();
				await finalizeMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
				return;
			}
			await trx.insertInto("_emdash_collections").values(values).execute();
			await this.createContentTable(input.slug, trx);
		});
		const collection = await this.getCollection(input.slug);
		if (!collection) throw new SchemaError("Failed to create collection", "CREATE_FAILED");
		resetRegisteredCollectionsCache();
		this.notifyTypegen();
		return collection;
	}
	/**
	* Create a seed-owned collection and all of its fields in bulk.
	*
	* Fresh seeds can define dozens of fields. Creating them through
	* `createField` performs multiple reads, one ALTER TABLE, and one media
	* usage invalidation per field, which can exhaust D1's per-request query
	* budget. This path validates the full schema before mutating it, creates
	* the complete content table in one statement, and inserts field metadata
	* in parameter-safe batches.
	*/
	async createSeedCollection(input, fields) {
		this.validateSlug(input.slug, "collection");
		this.validateUrlPattern(input.urlPattern);
		if (RESERVED_COLLECTION_SLUGS.includes(input.slug)) throw new SchemaError(`Collection slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		const fieldSlugs = /* @__PURE__ */ new Set();
		const normalizedFields = [];
		for (const field of fields) {
			this.validateSlug(field.slug, "field");
			assertIndexableField(field, field.indexed, field.slug);
			if (RESERVED_FIELD_SLUGS.includes(field.slug)) throw new SchemaError(`Field slug "${field.slug}" is reserved`, "RESERVED_SLUG");
			if (fieldSlugs.has(field.slug)) throw new SchemaError(`Field "${field.slug}" already exists in collection "${input.slug}"`, "FIELD_EXISTS");
			fieldSlugs.add(field.slug);
			normalizedFields.push(field.type === "blocks" ? {
				...field,
				validation: await this.normalizeBlocksFieldValidation(input.slug, field, void 0, this.db, false)
			} : { ...field });
		}
		const supports = input.supports ?? ["drafts", "revisions"];
		const hasSeo = input.hasSeo ?? supports.includes("seo") ?? false;
		const creationFingerprint = await buildSeedCollectionCaptureFingerprint(input, normalizedFields);
		await this.finishPendingDeletion(input.slug);
		const existing = await this.getCollection(input.slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, input.slug)) throw collectionBeingDeletedError(input.slug);
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug,
			creationFingerprint
		})) throw new SchemaError(`Collection "${input.slug}" already exists`, "COLLECTION_EXISTS");
		const proposedCollectionId = existing?.id ?? ulid();
		let maxSortOrder = -1;
		const fieldRows = normalizedFields.map((field) => {
			const sortOrder = field.sortOrder ?? maxSortOrder + 1;
			maxSortOrder = Math.max(maxSortOrder, sortOrder);
			return {
				id: ulid(),
				collection_id: proposedCollectionId,
				slug: field.slug,
				label: field.label,
				type: field.type,
				column_type: FIELD_TYPE_TO_COLUMN[field.type],
				required: field.required ? 1 : 0,
				unique: field.unique ? 1 : 0,
				default_value: field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null,
				validation: field.validation ? JSON.stringify(field.validation) : null,
				widget: field.widget ?? null,
				options: field.options ? JSON.stringify(field.options) : null,
				sort_order: sortOrder,
				searchable: field.searchable ? 1 : 0,
				indexed: field.indexed ? 1 : 0,
				translatable: field.translatable === false ? 0 : 1
			};
		});
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				const capture = await prepareMediaUsageCollectionCapture(trx, {
					collectionId: proposedCollectionId,
					collectionSlug: input.slug,
					creationFingerprint,
					registeredCollectionId: existing?.id
				});
				const collectionValues = {
					id: capture.collectionId,
					slug: input.slug,
					label: input.label,
					label_singular: input.labelSingular ?? null,
					description: input.description ?? null,
					icon: input.icon ?? null,
					admin_config: input.admin ? JSON.stringify(input.admin) : null,
					supports: JSON.stringify(supports),
					source: "seed",
					has_seo: hasSeo ? 1 : 0,
					routable: input.routable === false ? 0 : 1,
					hidden: input.hidden ? 1 : 0,
					sort_order: input.sortOrder ?? null,
					nav_group: input.group?.trim() || null,
					comments_enabled: input.commentsEnabled ? 1 : 0,
					edit_locking: input.editLocking === false ? 0 : 1,
					url_pattern: input.urlPattern ?? null
				};
				const rows = fieldRows.map((row) => ({
					...row,
					collection_id: capture.collectionId
				}));
				if (capture.captureRequired) {
					await this.createContentTable(input.slug, trx, normalizedFields, { ifNotExists: capture.resuming });
					await installPreparedMediaUsageCollectionCapture(trx, {
						collectionId: capture.collectionId,
						collectionSlug: input.slug
					});
					await markMediaUsageCollectionCaptureReady(trx, {
						collectionId: capture.collectionId,
						collectionSlug: input.slug
					});
					if (!capture.registrationExists) {
						await trx.insertInto("_emdash_collections").values(collectionValues).execute();
						schemaMutated = true;
					}
				} else {
					await trx.insertInto("_emdash_collections").values(collectionValues).execute();
					schemaMutated = true;
					await this.createContentTable(input.slug, trx, normalizedFields);
				}
				for (const fieldBatch of chunks(rows, SEED_FIELD_INSERT_BATCH_SIZE)) {
					let insert = trx.insertInto("_emdash_fields").values(fieldBatch);
					if (capture.resuming) insert = insert.onConflict((conflict) => conflict.columns(["collection_id", "slug"]).doNothing());
					await insert.execute();
				}
				let indexedRows = rows;
				if (capture.resuming) indexedRows = await this.assertSeedFieldDefinitions(capture.collectionId, normalizedFields, trx);
				for (const field of indexedRows) if (field.indexed === 1) await this.createFieldIndex(input.slug, field.id, field.slug, trx);
				if (capture.captureRequired) await finalizeMediaUsageCollectionCapture(trx, {
					collectionId: capture.collectionId,
					collectionSlug: input.slug
				});
			});
			await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) await markContentMediaUsageCollectionStaleSafely(this.db, input.slug, "CONTENT_USAGE_STALE");
			throw error;
		} finally {
			if (schemaMutated) resetRegisteredCollectionsCache();
		}
		this.notifyTypegen();
	}
	/**
	* Write a site-package collection and its fields with their exact ids and
	* every column (see `CollectionImporter` in `transfer/schema-importer.ts`).
	*
	* Every statement is idempotent and none runs in a transaction, so a call
	* interrupted after any statement (D1 has no transactions) can be repeated
	* until it completes. Rows are inserted with `ON CONFLICT DO NOTHING` and
	* then read back; a stored row that differs from the record throws
	* `IMPORT_MISMATCH`.
	*/
	async importCollection(record, fieldRecords, _options) {
		this.validateSlug(record.slug, "collection");
		if (RESERVED_COLLECTION_SLUGS.includes(record.slug)) throw new SchemaError(`Collection slug "${record.slug}" is reserved`, "RESERVED_SLUG");
		const fields = this.importFieldInputs(record, fieldRecords);
		const conflicting = await this.db.selectFrom("_emdash_collections").select(["id", "slug"]).where((eb) => eb.or([eb("id", "=", record.id), eb("slug", "=", record.slug)])).execute();
		if (conflicting.some((row) => row.id !== record.id || row.slug !== record.slug)) throw new SchemaError(`Collection "${record.slug}" already exists`, "COLLECTION_EXISTS");
		const registered = conflicting.length > 0;
		if (await isMediaUsageCollectionSlugDeleting(this.db, record.slug)) throw new SchemaError(`Collection "${record.slug}" is being deleted`, "COLLECTION_EXISTS");
		const identity = {
			collectionId: record.id,
			collectionSlug: record.slug
		};
		const lifecycle = await this.db.selectFrom("_emdash_media_usage_index_status").select(["collection_id", "capture_state"]).where("adapter_id", "=", "content-media").where("scope_type", "=", "collection").where("scope_key", "=", record.slug).executeTakeFirst();
		const captureFinalized = lifecycle?.collection_id === record.id && lifecycle.capture_state === "active";
		let captureRequired = captureFinalized;
		if (!captureFinalized) captureRequired = (await prepareMediaUsageCollectionCapture(this.db, {
			...identity,
			creationFingerprint: await importCaptureFingerprint(record, fieldRecords),
			registeredCollectionId: registered ? record.id : void 0
		})).captureRequired;
		await this.createContentTable(record.slug, this.db, fields, { ifNotExists: true });
		if (captureRequired && !captureFinalized) {
			await installPreparedMediaUsageCollectionCapture(this.db, identity);
			await markMediaUsageCollectionCaptureReady(this.db, identity);
		}
		const collectionSpec = getPortableTableSpec("_emdash_collections");
		const fieldSpec = getPortableTableSpec("_emdash_fields");
		if (!collectionSpec || !fieldSpec) throw new SchemaError("Missing transfer column registry", "IMPORT_MISMATCH");
		const collectionRow = {
			...encodeRecord(this.db, collectionSpec.columns, record, {
				kind: "collection",
				id: record.id
			}),
			search_config: importSearchConfig(record.searchConfig)
		};
		const insertedCollection = {
			...collectionRow,
			title_field: null,
			date_field: null
		};
		const collectionCreated = await insertRows(this.db, "_emdash_collections", Object.keys(insertedCollection), [insertedCollection]) > 0;
		const fieldRows = fieldRecords.map((field) => encodeRecord(this.db, fieldSpec.columns, field, {
			kind: "field",
			id: field.id
		}));
		const fieldsCreated = await insertRows(this.db, "_emdash_fields", Object.keys(recordCodecs(fieldSpec.columns)), fieldRows);
		const float4 = isPostgres(this.db);
		const storedFields = await this.db.selectFrom("_emdash_fields").selectAll().where("collection_id", "=", record.id).execute();
		const fieldCodecs = recordCodecs(fieldSpec.columns);
		const storedById = new Map(storedFields.map((row) => [row.id, row]));
		if (storedFields.length !== fieldRows.length) throw new SchemaError(`Imported fields of "${record.slug}" do not match`, "IMPORT_MISMATCH");
		fieldRecords.forEach((field, index) => {
			const row = fieldRows[index];
			const stored = storedById.get(field.id);
			if (!row || !stored || firstDifference(this.db, fieldCodecs, row, stored, { float4 }) !== null) throw new SchemaError(`Imported field "${field.slug}" does not match`, "IMPORT_MISMATCH", { fieldId: field.id });
		});
		for (const field of fieldRecords) if (field.indexed) await this.createFieldIndex(record.slug, field.id, field.slug);
		if (captureRequired && !captureFinalized) await finalizeMediaUsageCollectionCapture(this.db, identity);
		await this.db.updateTable("_emdash_collections").set({
			title_field: record.titleField ?? null,
			date_field: record.dateField ?? null
		}).where("id", "=", record.id).execute();
		const storedCollection = await this.db.selectFrom("_emdash_collections").selectAll().where("id", "=", record.id).executeTakeFirst();
		const expectedCollection = {
			...collectionRow,
			title_field: record.titleField ?? null,
			date_field: record.dateField ?? null
		};
		if (!storedCollection || firstDifference(this.db, recordCodecs(collectionSpec.columns), expectedCollection, storedCollection, { float4 }) !== null) throw new SchemaError(`Imported collection "${record.slug}" does not match`, "IMPORT_MISMATCH");
		resetRegisteredCollectionsCache();
		this.notifyTypegen();
		return {
			collectionCreated,
			fieldsCreated
		};
	}
	importFieldInputs(record, fieldRecords) {
		const slugs = /* @__PURE__ */ new Set();
		return fieldRecords.map((field) => {
			if (field.collectionId !== record.id) throw new SchemaError(`Field "${field.slug}" does not belong to "${record.slug}"`, "IMPORT_MISMATCH");
			this.validateSlug(field.slug, "field");
			if (RESERVED_FIELD_SLUGS.includes(field.slug)) throw new SchemaError(`Field slug "${field.slug}" is reserved`, "RESERVED_SLUG");
			if (slugs.has(field.slug)) throw new SchemaError(`Field "${field.slug}" already exists in collection "${record.slug}"`, "FIELD_EXISTS");
			slugs.add(field.slug);
			if (!isFieldType(field.type) || FIELD_TYPE_TO_COLUMN[field.type] !== field.columnType) throw new SchemaError(`Field "${field.slug}" has an unsupported type or column type`, "INVALID_FIELD_TYPE");
			const validation = importFieldValidation(field.validation);
			assertIndexableField({
				type: field.type,
				validation
			}, field.indexed, field.slug);
			if (field.indexed) this.getFieldIndexName(field.id);
			return {
				slug: field.slug,
				label: field.label,
				type: field.type,
				required: field.required,
				defaultValue: field.defaultValue,
				validation
			};
		});
	}
	async assertSeedFieldDefinitions(collectionId, fields, db) {
		const stored = await db.selectFrom("_emdash_fields").selectAll().where("collection_id", "=", collectionId).execute();
		if (stored.length !== fields.length) throw new SchemaError("Interrupted seed collection fields do not match", "CREATE_FAILED");
		let maxSortOrder = -1;
		for (const field of fields) {
			const sortOrder = field.sortOrder ?? maxSortOrder + 1;
			maxSortOrder = Math.max(maxSortOrder, sortOrder);
			const row = stored.find((candidate) => candidate.slug === field.slug);
			if (!row || row.label !== field.label || row.type !== field.type || row.column_type !== FIELD_TYPE_TO_COLUMN[field.type] || row.required !== (field.required ? 1 : 0) || row.unique !== (field.unique ? 1 : 0) || row.default_value !== (field.defaultValue !== void 0 ? JSON.stringify(field.defaultValue) : null) || row.validation !== (field.validation ? JSON.stringify(field.validation) : null) || row.widget !== (field.widget ?? null) || row.options !== (field.options ? JSON.stringify(field.options) : null) || row.sort_order !== sortOrder || row.searchable !== (field.searchable ? 1 : 0) || row.indexed !== (field.indexed ? 1 : 0) || row.translatable !== (field.translatable === false ? 0 : 1)) throw new SchemaError("Interrupted seed collection fields do not match", "CREATE_FAILED");
		}
		return stored;
	}
	/**
	* Update a collection
	*/
	async updateCollection(slug, input) {
		const updated = await withTransaction(this.db, async (trx) => {
			const existingRow = await trx.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
			if (!existingRow) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
			if (input.urlPattern !== existingRow.url_pattern) this.validateUrlPattern(input.urlPattern);
			const existing = this.mapCollectionRow(existingRow);
			await this.validateTitleDateFields(existing.id, slug, {
				titleField: input.titleField,
				dateField: input.dateField
			}, trx);
			const updates = {};
			if (input.label !== void 0) updates.label = input.label;
			if (input.labelSingular !== void 0) updates.label_singular = input.labelSingular;
			if (input.description !== void 0) updates.description = input.description;
			if (input.icon !== void 0) updates.icon = input.icon || null;
			if (input.admin !== void 0) updates.admin_config = JSON.stringify(input.admin);
			if (input.supports !== void 0) updates.supports = JSON.stringify(input.supports);
			if (input.urlPattern !== void 0) updates.url_pattern = input.urlPattern;
			if (input.routable !== void 0) updates.routable = input.routable ? 1 : 0;
			if (input.hasSeo !== void 0) updates.has_seo = input.hasSeo ? 1 : 0;
			else if (input.supports !== void 0) updates.has_seo = input.supports.includes("seo") ? 1 : 0;
			if (input.hidden !== void 0) updates.hidden = input.hidden ? 1 : 0;
			if (input.sortOrder !== void 0) updates.sort_order = input.sortOrder;
			if (input.group !== void 0) updates.nav_group = input.group?.trim() || null;
			if (input.titleField !== void 0) updates.title_field = input.titleField || null;
			if (input.dateField !== void 0) updates.date_field = input.dateField || null;
			if (input.commentsEnabled !== void 0) updates.comments_enabled = input.commentsEnabled ? 1 : 0;
			if (input.commentsModeration !== void 0) updates.comments_moderation = input.commentsModeration;
			if (input.commentsClosedAfterDays !== void 0) updates.comments_closed_after_days = input.commentsClosedAfterDays;
			if (input.commentsAutoApproveUsers !== void 0) updates.comments_auto_approve_users = input.commentsAutoApproveUsers ? 1 : 0;
			if (input.editLocking !== void 0) updates.edit_locking = input.editLocking ? 1 : 0;
			updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
			await trx.updateTable("_emdash_collections").set(updates).where("id", "=", existing.id).execute();
			const row = await trx.selectFrom("_emdash_collections").where("slug", "=", slug).selectAll().executeTakeFirst();
			if (!row) throw new SchemaError("Failed to update collection", "UPDATE_FAILED");
			if (input.supports !== void 0) {
				if (existing.supports.includes("search") !== parseSupports(row.supports).includes("search")) await this.syncSearchState(slug, trx);
			}
			return this.mapCollectionRow(row);
		});
		this.notifyTypegen();
		return updated;
	}
	/**
	* The content guard {@link deleteCollection} refuses on, on its own.
	*
	* A caller that has to cascade before deleting — relations, whose edges point
	* at rows the drop is about to take — needs to know the delete is acceptable
	* before it changes anything, since the cascade cannot be rolled back on D1.
	*/
	async assertCollectionDeletable(slug, options) {
		if (options?.force) return;
		if (await this.getCollection(slug) && await this.collectionHasContent(slug)) throw new SchemaError(`Collection "${slug}" has content. Use force: true to delete.`, "COLLECTION_HAS_CONTENT");
	}
	/**
	* Delete a collection
	*/
	async deleteCollection(slug, options) {
		await this.assertCollectionDeletable(slug, options);
		const existing = await this.getCollection(slug);
		const activated = await deleteActivatedMediaUsageCollection(this.db, {
			collectionId: existing?.id,
			collectionSlug: slug,
			forceDelete: options?.force === true
		});
		if (activated === "has_content") throw new SchemaError(`Collection "${slug}" has content. Use force: true to delete.`, "COLLECTION_HAS_CONTENT");
		if (activated === "in_progress") throw new SchemaError(`Collection "${slug}" deletion is already in progress`, "CONFLICT");
		if (activated === "deleted") return;
		if (!existing) throw new SchemaError(`Collection "${slug}" not found`, "COLLECTION_NOT_FOUND");
		let contentTableDropped = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await new FTSManager(trx).dropFtsTable(slug);
				const tableName = this.getTableName(slug);
				await sql`DROP TABLE IF EXISTS ${sql.ref(tableName)}`.execute(trx);
				contentTableDropped = true;
				await deleteSharedCollectionRecords(trx, slug);
				await trx.deleteFrom("_emdash_collections").where("id", "=", existing.id).execute();
			});
			await deleteContentMediaUsageCollection(this.db, slug);
		} catch (error) {
			if (contentTableDropped && !await tableExists(this.db, this.getTableName(slug))) await deleteContentMediaUsageCollection(this.db, slug);
			throw error;
		} finally {
			if (contentTableDropped) resetRegisteredCollectionsCache();
		}
		this.notifyTypegen();
	}
	/**
	* List fields for a collection
	*/
	async listFields(collectionId) {
		return (await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collectionId).selectAll().orderBy("sort_order", "asc").orderBy("created_at", "asc").execute()).map(this.mapFieldRow);
	}
	/**
	* Get a field by slug within a collection
	*/
	async getField(collectionSlug, fieldSlug) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) return null;
		const row = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
		return row ? this.mapFieldRow(row) : null;
	}
	/**
	* Create a new field
	*/
	async createField(collectionSlug, input) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		this.validateSlug(input.slug, "field");
		if (RESERVED_FIELD_SLUGS.includes(input.slug)) throw new SchemaError(`Field slug "${input.slug}" is reserved`, "RESERVED_SLUG");
		if (await this.getField(collectionSlug, input.slug)) throw new SchemaError(`Field "${input.slug}" already exists in collection "${collectionSlug}"`, "FIELD_EXISTS");
		const id = ulid();
		const validation = input.type === "blocks" ? await this.normalizeBlocksFieldValidation(collectionSlug, input, void 0, this.db) : input.validation;
		const columnType = FIELD_TYPE_TO_COLUMN[input.type];
		assertIndexableField(input, input.indexed, input.slug);
		const maxSort = await this.db.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).select((eb) => eb.fn.max("sort_order").as("max")).executeTakeFirst();
		const sortOrder = input.sortOrder ?? (maxSort?.max ?? -1) + 1;
		const activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
		let schemaMutated = false;
		let fieldStorageReady = false;
		try {
			const created = await withTransaction(this.db, async (trx) => {
				await trx.insertInto("_emdash_fields").values({
					id,
					collection_id: collection.id,
					slug: input.slug,
					label: input.label,
					type: input.type,
					column_type: columnType,
					required: input.required ? 1 : 0,
					unique: input.unique ? 1 : 0,
					default_value: input.defaultValue !== void 0 ? JSON.stringify(input.defaultValue) : null,
					validation: validation ? JSON.stringify(validation) : null,
					widget: input.widget ?? null,
					options: input.options ? JSON.stringify(input.options) : null,
					sort_order: sortOrder,
					searchable: input.searchable ? 1 : 0,
					indexed: input.indexed ? 1 : 0,
					translatable: input.translatable === false ? 0 : 1
				}).execute();
				schemaMutated = true;
				if (!isStoragelessField(input)) await this.addColumn(collectionSlug, input.slug, input.type, {
					required: input.required,
					defaultValue: input.defaultValue
				}, trx);
				fieldStorageReady = true;
				if (input.indexed) await this.createFieldIndex(collectionSlug, id, input.slug, trx);
				const fieldRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", collection.id).where("slug", "=", input.slug).selectAll().executeTakeFirst();
				if (!fieldRow) throw new SchemaError("Failed to create field", "CREATE_FAILED");
				const field = this.mapFieldRow(fieldRow);
				if (input.searchable) await this.syncSearchState(collectionSlug, trx);
				return field;
			});
			if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			this.notifyTypegen();
			return created;
		} catch (error) {
			if (schemaMutated) {
				if (!fieldStorageReady) await this.db.deleteFrom("_emdash_fields").where("id", "=", id).execute();
				if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
				else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			}
			throw error;
		}
	}
	/**
	* Update a field
	*/
	async updateField(collectionSlug, fieldSlug, input) {
		let activeCoverageInvalidated = false;
		let schemaMutated = false;
		try {
			const updatedField = await withTransaction(this.db, async (trx) => {
				const collectionRow = await trx.selectFrom("_emdash_collections").where("slug", "=", collectionSlug).select([
					"id",
					"title_field",
					"date_field"
				]).executeTakeFirst();
				const fieldRow = collectionRow ? await trx.selectFrom("_emdash_fields").where("collection_id", "=", collectionRow.id).where("slug", "=", fieldSlug).selectAll().executeTakeFirst() : void 0;
				if (!fieldRow) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
				const field = this.mapFieldRow(fieldRow);
				if (field.unsupportedType) throw new SchemaError(`Field "${fieldSlug}" in collection "${collectionSlug}" uses unsupported field type "${field.unsupportedType.type}" at "${field.unsupportedType.path}"`, "UNSUPPORTED_FIELD_TYPE");
				const updates = {};
				let nextType = field.type;
				const nextValidation = field.type === "blocks" ? await this.normalizeBlocksFieldValidation(collectionSlug, {
					...input,
					slug: field.slug,
					label: input.label ?? field.label,
					type: field.type
				}, field, trx) : input.validation !== void 0 ? input.validation : field.validation;
				if (input.type !== void 0 && input.type !== field.type) {
					if (isStoragelessField(field) !== isStoragelessField({
						type: input.type,
						validation: nextValidation
					})) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" between storage-less and column-backed types ("${field.type}" -> "${input.type}").`, "FIELD_TYPE_COLUMN_CHANGE");
					const newColumnType = FIELD_TYPE_TO_COLUMN[input.type];
					if (newColumnType !== field.columnType) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" from type "${field.type}" to "${input.type}": the underlying column type would change from ${field.columnType} to ${newColumnType}, which requires a manual content migration.`, "FIELD_TYPE_COLUMN_CHANGE");
					if (!TEXT_ALIAS_FIELD_TYPES.has(field.type) || !TEXT_ALIAS_FIELD_TYPES.has(input.type)) throw new SchemaError(`Cannot change field "${fieldSlug}" in collection "${collectionSlug}" from type "${field.type}" to "${input.type}" without a manual content migration.`, "FIELD_TYPE_CHANGE_REQUIRES_MIGRATION");
					if (collectionRow?.title_field === fieldSlug && !TITLE_FIELD_TYPES.has(input.type)) throw new SchemaError(`titleField "${fieldSlug}" must stay a text field, not "${input.type}"`, "INVALID_TITLE_FIELD");
					if (collectionRow?.date_field === fieldSlug && input.type !== "datetime") throw new SchemaError(`dateField "${fieldSlug}" must stay a datetime field, not "${input.type}"`, "INVALID_DATE_FIELD");
					nextType = input.type;
					updates.type = input.type;
					updates.column_type = newColumnType;
				}
				if (input.required !== void 0 && input.required !== field.required) throw new SchemaError(`Changing required for field "${fieldSlug}" requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.unique !== void 0 && input.unique !== field.unique) throw new SchemaError(`Changing unique for field "${fieldSlug}" requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.translatable === false && field.translatable) throw new SchemaError(`Changing field "${fieldSlug}" to non-translatable requires a manual content migration.`, "FIELD_UPDATE_REQUIRES_MIGRATION");
				if (input.label !== void 0) updates.label = input.label;
				if (input.required !== void 0) updates.required = input.required ? 1 : 0;
				if (input.unique !== void 0) updates.unique = input.unique ? 1 : 0;
				if (input.searchable !== void 0) updates.searchable = input.searchable ? 1 : 0;
				const indexedChanged = input.indexed !== void 0 && input.indexed !== field.indexed;
				if (indexedChanged) updates.indexed = input.indexed ? 1 : 0;
				if (input.translatable !== void 0) updates.translatable = input.translatable ? 1 : 0;
				if (input.defaultValue !== void 0) updates.default_value = JSON.stringify(input.defaultValue);
				if (input.validation !== void 0 || field.type === "blocks") updates.validation = nextValidation ? JSON.stringify(nextValidation) : null;
				if (input.widget !== void 0) updates.widget = input.widget;
				if (input.options !== void 0) updates.options = JSON.stringify(input.options);
				if (input.sortOrder !== void 0) updates.sort_order = input.sortOrder;
				assertIndexableField({
					type: nextType,
					validation: nextValidation
				}, input.indexed ?? field.indexed, fieldSlug);
				if (Object.keys(updates).length === 0) return field;
				activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(trx, collectionSlug);
				if (Object.keys(updates).length > 0) {
					await trx.updateTable("_emdash_fields").set(updates).where("id", "=", field.id).execute();
					schemaMutated = true;
				}
				if (indexedChanged) {
					if (input.indexed) await this.createFieldIndex(collectionSlug, field.id, fieldSlug, trx);
					else await this.dropFieldIndex(field.id, trx);
					schemaMutated = true;
				}
				const updatedRow = await trx.selectFrom("_emdash_fields").where("collection_id", "=", field.collectionId).where("slug", "=", fieldSlug).selectAll().executeTakeFirst();
				if (!updatedRow) throw new SchemaError("Failed to update field", "UPDATE_FAILED");
				const updated = this.mapFieldRow(updatedRow);
				if (schemaMutated && input.searchable !== void 0 && input.searchable !== field.searchable) await this.syncSearchState(collectionSlug, trx);
				return updated;
			});
			if (schemaMutated) if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			this.notifyTypegen();
			return updatedField;
		} catch (error) {
			if (schemaMutated) if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Synchronize an existing FTS index with the collection's current state.
	*
	* Only rebuilds or disables — never first-time enables. First-time FTS
	* enablement is handled by the seed's explicit enableSearch call (which
	* is try-caught) or the admin UI toggle.
	*
	* - FTS active + still has search support and searchable fields → rebuild
	* - FTS active + lost search support or no searchable fields    → disable
	* - FTS not active                                              → no-op
	*
	* Pass `db` when calling from within a transaction so FTS operations
	* participate in the same transaction and are rolled back on failure.
	*/
	async syncSearchState(collectionSlug, db) {
		const conn = db ?? this.db;
		const ftsManager = new FTSManager(conn);
		const row = await conn.selectFrom("_emdash_collections").where("slug", "=", collectionSlug).select("supports").executeTakeFirst();
		if (!row) return;
		const wantsSearch = parseSupports(row.supports).includes("search");
		const searchableFields = await ftsManager.getSearchableFields(collectionSlug);
		const config = await ftsManager.getSearchConfig(collectionSlug);
		const ftsActive = config?.enabled === true;
		if (wantsSearch && searchableFields.length > 0 && ftsActive) await ftsManager.rebuildIndex(collectionSlug, searchableFields, config?.weights, config?.tokenize);
		else if (ftsActive && (!wantsSearch || searchableFields.length === 0)) await ftsManager.disableSearch(collectionSlug);
	}
	/**
	* Delete a field
	*/
	async deleteField(collectionSlug, fieldSlug) {
		const field = await this.getField(collectionSlug, fieldSlug);
		if (!field) throw new SchemaError(`Field "${fieldSlug}" not found in collection "${collectionSlug}"`, "FIELD_NOT_FOUND");
		const activeCoverageInvalidated = await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
		const collection = await this.getCollection(collectionSlug);
		const clearTitle = collection?.titleField === fieldSlug;
		const clearDate = collection?.dateField === fieldSlug;
		let schemaMutated = false;
		try {
			await withTransaction(this.db, async (trx) => {
				await trx.deleteFrom("_emdash_fields").where("id", "=", field.id).execute();
				schemaMutated = true;
				if (clearTitle || clearDate) await trx.updateTable("_emdash_collections").set({
					...clearTitle ? { title_field: null } : {},
					...clearDate ? { date_field: null } : {},
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).where("slug", "=", collectionSlug).execute();
				if (field.searchable) await this.syncSearchState(collectionSlug, trx);
				if (field.indexed) await this.dropFieldIndex(field.id, trx);
				if (await columnExists(trx, this.getTableName(collectionSlug), this.getColumnName(fieldSlug))) await this.dropColumn(collectionSlug, fieldSlug, trx);
			});
			if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
		} catch (error) {
			if (schemaMutated) if (activeCoverageInvalidated) await invalidateContentMediaUsageSchemaChange(this.db, collectionSlug);
			else await markContentMediaUsageCollectionStaleSafely(this.db, collectionSlug, "CONTENT_USAGE_STALE");
			throw error;
		}
		this.notifyTypegen();
	}
	/**
	* Reorder collections in the admin sidebar.
	*
	* `slugs` is the full desired order: every listed collection gets its
	* index as `sort_order`, and any collection left out has its explicit
	* position cleared, dropping it back to the alphabetical tail. Unknown or
	* duplicate slugs throw before anything is written.
	*/
	async reorderCollections(slugs) {
		const known = new Set((await this.listCollections()).map((collection) => collection.slug));
		const unknown = slugs.filter((slug) => !known.has(slug));
		if (unknown.length > 0) throw new SchemaError(`Unknown collection${unknown.length > 1 ? "s" : ""}: ${unknown.join(", ")}`, "COLLECTION_NOT_FOUND", { slugs: unknown });
		const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
		if (duplicates.length > 0) throw new SchemaError(`Duplicate collection${duplicates.length > 1 ? "s" : ""}: ${[...new Set(duplicates)].join(", ")}`, "DUPLICATE_SLUG", { slugs: [...new Set(duplicates)] });
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const ordered = new Set(slugs);
		await withTransaction(this.db, async (trx) => {
			for (const [index, slug] of slugs.entries()) await trx.updateTable("_emdash_collections").set({
				sort_order: index,
				updated_at: now
			}).where("slug", "=", slug).execute();
			const cleared = [...known].filter((slug) => !ordered.has(slug));
			for (const slugChunk of chunks(cleared, 50)) await trx.updateTable("_emdash_collections").set({
				sort_order: null,
				updated_at: now
			}).where("slug", "in", slugChunk).execute();
		});
		this.notifyTypegen();
	}
	/**
	* Reorder fields
	*/
	async reorderFields(collectionSlug, fieldSlugs) {
		const collection = await this.getCollection(collectionSlug);
		if (!collection) throw new SchemaError(`Collection "${collectionSlug}" not found`, "COLLECTION_NOT_FOUND");
		for (let i = 0; i < fieldSlugs.length; i++) await this.db.updateTable("_emdash_fields").set({ sort_order: i }).where("collection_id", "=", collection.id).where("slug", "=", fieldSlugs[i]).execute();
		this.notifyTypegen();
	}
	/**
	* Create a content table for a collection
	*/
	async createContentTable(slug, db, fields = [], options = {}) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(slug);
		let table = conn.schema.createTable(tableName).addColumn("id", "text", (col) => col.primaryKey()).addColumn("slug", "text").addColumn("status", "text", (col) => col.defaultTo("draft")).addColumn("author_id", "text").addColumn("primary_byline_id", "text").addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(conn))).addColumn("published_at", "text").addColumn("scheduled_at", "text").addColumn("deleted_at", "text").addColumn("version", "integer", (col) => col.defaultTo(1)).addColumn("live_revision_id", "text", (col) => col.references("revisions.id")).addColumn("draft_revision_id", "text", (col) => col.references("revisions.id")).addColumn("locale", "text", (col) => col.notNull().defaultTo("en")).addColumn("translation_group", "text");
		if (options.ifNotExists) table = table.ifNotExists();
		for (const field of fields) {
			if (isStoragelessField(field)) continue;
			const columnName = this.getColumnName(field.slug);
			const columnType = COLUMN_TYPE_TO_DATA_TYPE[FIELD_TYPE_TO_COLUMN[field.type]];
			table = table.addColumn(columnName, columnType, (column) => {
				if (field.type === "blocks") return column.notNull().defaultTo("[]");
				if (!field.required) return column;
				const defaultValue = field.defaultValue !== void 0 ? this.formatDefaultValue(field.defaultValue, field.type) : this.getEmptyDefault(field.type);
				return column.notNull().defaultTo(sql.raw(defaultValue));
			});
		}
		await table.addUniqueConstraint(`${tableName}_slug_locale_unique`, ["slug", "locale"]).execute();
		const createIndex = options.ifNotExists ? sql`CREATE INDEX IF NOT EXISTS` : sql`CREATE INDEX`;
		const createUniqueIndex = options.ifNotExists ? sql`CREATE UNIQUE INDEX IF NOT EXISTS` : sql`CREATE UNIQUE INDEX`;
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_slug`)}
			ON ${sql.ref(tableName)} (slug)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_del_sched`)}
			ON ${sql.ref(tableName)} (deleted_at, scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_live_revision`)}
			ON ${sql.ref(tableName)} (live_revision_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_draft_revision`)}
			ON ${sql.ref(tableName)} (draft_revision_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_author`)}
			ON ${sql.ref(tableName)} (author_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_primary_byline`)}
			ON ${sql.ref(tableName)} (primary_byline_id)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_locale`)}
			ON ${sql.ref(tableName)} (locale)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_tg_locale`)}
			ON ${sql.ref(tableName)} (translation_group, locale)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_del_tg_locale`)}
			ON ${sql.ref(tableName)} (deleted_at, translation_group, locale)
		`.execute(conn);
		await sql`
			${createUniqueIndex} ${sql.ref(`uidx_${tableName}_active_tg_locale`)}
			ON ${sql.ref(tableName)} (translation_group, lower(locale))
			WHERE deleted_at IS NULL AND translation_group IS NOT NULL
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_updated_id`)}
			ON ${sql.ref(tableName)} (deleted_at, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_status`)}
			ON ${sql.ref(tableName)} (deleted_at, status)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_created_id`)}
			ON ${sql.ref(tableName)} (deleted_at, created_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_deleted_published_id`)}
			ON ${sql.ref(tableName)} (deleted_at, published_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_loc_upd`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, updated_at DESC, id DESC)
		`.execute(conn);
		await sql`
			${createIndex} ${sql.ref(`idx_${tableName}_loc_crt`)}
			ON ${sql.ref(tableName)} (deleted_at, locale, created_at DESC, id DESC)
		`.execute(conn);
	}
	getFieldIndexName(fieldId) {
		if (!FIELD_ID_PATTERN.test(fieldId)) throw new SchemaError(`Invalid field id "${fieldId}"`, "INVALID_FIELD_ID");
		return `idx_cf_${fieldId.toLowerCase()}`;
	}
	getLocaleFieldIndexName(fieldId) {
		return `${this.getFieldIndexName(fieldId)}_loc`;
	}
	async createFieldIndex(collectionSlug, fieldId, fieldSlug, db) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(collectionSlug);
		const columnName = this.getColumnName(fieldSlug);
		const indexName = this.getFieldIndexName(fieldId);
		const localeIndexName = this.getLocaleFieldIndexName(fieldId);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(indexName)}
			ON ${sql.ref(tableName)} (
				(${sql.ref(columnName)} IS NOT NULL),
				${sql.ref(columnName)},
				id
			)
			WHERE deleted_at IS NULL
		`.execute(conn);
		await sql`
			CREATE INDEX IF NOT EXISTS ${sql.ref(localeIndexName)}
			ON ${sql.ref(tableName)} (
				locale,
				(${sql.ref(columnName)} IS NOT NULL),
				${sql.ref(columnName)},
				id
			)
			WHERE deleted_at IS NULL
		`.execute(conn);
	}
	async dropFieldIndex(fieldId, db) {
		const conn = db ?? this.db;
		await sql`DROP INDEX IF EXISTS ${sql.ref(this.getFieldIndexName(fieldId))}`.execute(conn);
		await sql`DROP INDEX IF EXISTS ${sql.ref(this.getLocaleFieldIndexName(fieldId))}`.execute(conn);
	}
	/**
	* Add a column to a content table
	*/
	async addColumn(collectionSlug, fieldSlug, fieldType, options, db) {
		const conn = db ?? this.db;
		const tableName = this.getTableName(collectionSlug);
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		const columnName = this.getColumnName(fieldSlug);
		if (fieldType === "blocks") await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT '[]'
			`.execute(conn);
		else if (options?.required && options?.defaultValue !== void 0) {
			const defaultVal = this.formatDefaultValue(options.defaultValue, fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else if (options?.required) {
			const defaultVal = this.getEmptyDefault(fieldType);
			await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)} NOT NULL DEFAULT ${sql.raw(defaultVal)}
			`.execute(conn);
		} else await sql`
				ALTER TABLE ${sql.ref(tableName)}
				ADD COLUMN ${sql.ref(columnName)} ${sql.raw(columnType)}
			`.execute(conn);
	}
	/**
	* Drop a column from a content table
	*/
	async dropColumn(collectionSlug, fieldSlug, db) {
		const tableName = this.getTableName(collectionSlug);
		const columnName = this.getColumnName(fieldSlug);
		await sql`
			ALTER TABLE ${sql.ref(tableName)}
			DROP COLUMN ${sql.ref(columnName)}
		`.execute(db ?? this.db);
	}
	/**
	* Check if a collection has any content
	*/
	async collectionHasContent(slug, db = this.db) {
		const tableName = this.getTableName(slug);
		try {
			return ((await sql`
				SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
				WHERE deleted_at IS NULL
			`.execute(db)).rows[0]?.count ?? 0) > 0;
		} catch {
			return false;
		}
	}
	async normalizeBlocksFieldValidation(collectionSlug, input, existing, db, checkContent = true) {
		if (input.required) throw new SchemaError("Blocks fields cannot be required", "VALIDATION_ERROR", { path: "required" });
		if (input.unique) throw new SchemaError("Blocks fields cannot be unique", "VALIDATION_ERROR", { path: "unique" });
		if (input.indexed) throw new SchemaError("Blocks fields cannot be indexed", "FIELD_NOT_INDEXABLE", { path: "indexed" });
		if (input.searchable) throw new SchemaError("Blocks fields cannot be searchable", "VALIDATION_ERROR", { path: "searchable" });
		if (input.widget !== void 0) throw new SchemaError("Blocks fields cannot use custom widgets", "VALIDATION_ERROR", { path: "widget" });
		if (input.options !== void 0) throw new SchemaError("Blocks fields do not accept widget options", "VALIDATION_ERROR", { path: "options" });
		if (input.defaultValue !== void 0 && (!Array.isArray(input.defaultValue) || input.defaultValue.length > 0)) throw new SchemaError("Blocks field defaults must be an empty array", "VALIDATION_ERROR", { path: "defaultValue" });
		const requested = input.validation ?? existing?.validation ?? {};
		const allowedTypes = requested.allowedTypes ?? [];
		if (!Array.isArray(allowedTypes) || allowedTypes.some((slug) => typeof slug !== "string")) throw new SchemaError("allowedTypes must be an array of block type slugs", "VALIDATION_ERROR", { path: "validation.allowedTypes" });
		if (new Set(allowedTypes).size !== allowedTypes.length) throw new SchemaError("allowedTypes must not contain duplicates", "VALIDATION_ERROR", { path: "validation.allowedTypes" });
		const previousAllowed = existing?.validation?.allowedTypes ?? [];
		const previousRetired = existing?.validation?.retiredTypes ?? [];
		const requestedRetired = existing ? previousRetired : requested.retiredTypes ?? [];
		if (!Array.isArray(requestedRetired) || requestedRetired.some((slug) => typeof slug !== "string")) throw new SchemaError("retiredTypes must be an array of block type slugs", "VALIDATION_ERROR", { path: "validation.retiredTypes" });
		const retiredTypes = [.../* @__PURE__ */ new Set([...requestedRetired, ...previousAllowed.filter((slug) => !allowedTypes.includes(slug))])].filter((slug) => !allowedTypes.includes(slug));
		const minItems = requested.minItems ?? 0;
		const maxItems = requested.maxItems ?? 100;
		if (!Number.isInteger(minItems) || minItems < 0) throw new SchemaError("minItems must be a non-negative integer", "VALIDATION_ERROR", { path: "validation.minItems" });
		if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 100) throw new SchemaError(`maxItems must be an integer between 1 and 100`, "VALIDATION_ERROR", { path: "validation.maxItems" });
		if (minItems > maxItems) throw new SchemaError("minItems cannot exceed maxItems", "VALIDATION_ERROR", { path: "validation.minItems" });
		const previousMin = existing?.validation?.minItems ?? 0;
		if (checkContent && minItems > previousMin && minItems > 0 && await this.collectionHasContent(collectionSlug, db)) throw new SchemaError("Raising minItems on a populated collection requires a content migration", "FIELD_UPDATE_REQUIRES_MIGRATION", { path: "validation.minItems" });
		const referenced = [.../* @__PURE__ */ new Set([...allowedTypes, ...retiredTypes])];
		if (referenced.length > 0) {
			const types = await db.selectFrom("_emdash_block_types").select([
				"id",
				"slug",
				"current_version"
			]).where("slug", "in", referenced).execute();
			const bySlug = new Map(types.map((type) => [type.slug, type]));
			for (const slug of referenced) if (!bySlug.has(slug)) throw new SchemaError(`Block type "${slug}" not found`, "BLOCK_TYPE_NOT_FOUND", { slug });
			const allowedRows = allowedTypes.map((slug) => bySlug.get(slug));
			if (allowedRows.length > 0) {
				const activeVersions = await db.selectFrom("_emdash_block_type_versions").select(["block_type_id", "version"]).where("block_type_id", "in", allowedRows.map((type) => type.id)).execute();
				for (const type of allowedRows) if (!activeVersions.some((version) => version.block_type_id === type.id && version.version === type.current_version)) throw new SchemaError(`Block type "${type.slug}" has no active version ${type.current_version}`, "BLOCK_TYPE_VERSION_CONFLICT", {
					slug: type.slug,
					version: type.current_version
				});
			}
		}
		return {
			allowedTypes,
			retiredTypes,
			minItems,
			maxItems
		};
	}
	/**
	* Get table name for a collection
	*/
	getTableName(slug) {
		validateIdentifier(slug, "collection slug");
		return `ec_${slug}`;
	}
	/**
	* Get column name for a field
	*/
	getColumnName(slug) {
		validateIdentifier(slug, "field slug");
		return slug;
	}
	/**
	* Validate a slug
	*/
	validateSlug(slug, type) {
		if (!slug || typeof slug !== "string") throw new SchemaError(`${type} slug is required`, "INVALID_SLUG");
		if (!SCHEMA_SLUG_PATTERN.test(slug)) throw new SchemaError(`${type} slug must start with a letter and contain only lowercase letters, numbers, and underscores`, "INVALID_SLUG");
		if (slug.length > 63) throw new SchemaError(`${type} slug must be 63 characters or less`, "INVALID_SLUG");
	}
	validateUrlPattern(urlPattern) {
		if (!urlPattern) return;
		try {
			compileUrlPattern(urlPattern);
		} catch (error) {
			throw new SchemaError(error instanceof Error ? error.message : "Invalid URL pattern", "INVALID_URL_PATTERN");
		}
	}
	/**
	* Format a default value for SQL.
	*
	* SQLite `ALTER TABLE ADD COLUMN ... DEFAULT` requires a literal constant
	* expression — parameterized values cannot be used here. We manually escape
	* single quotes and coerce types to ensure the output is safe.
	*
	* INTEGER/REAL values are coerced through `Number()` which can only produce
	* digits, `.`, `-`, `e`, `Infinity`, or `NaN` — all safe in SQL.
	* TEXT/JSON values have single quotes escaped via SQL standard doubling (`''`).
	*/
	formatDefaultValue(value, fieldType) {
		if (value === null || value === void 0) return "NULL";
		const columnType = FIELD_TYPE_TO_COLUMN[fieldType];
		if (columnType === "JSON") return `'${JSON.stringify(value).replace(SINGLE_QUOTE_PATTERN, "''")}'`;
		if (columnType === "INTEGER") {
			if (typeof value === "boolean") return value ? "1" : "0";
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(Math.trunc(num));
		}
		if (columnType === "REAL") {
			const num = Number(value);
			if (!Number.isFinite(num)) return "0";
			return String(num);
		}
		let text;
		if (typeof value === "string") text = value;
		else if (typeof value === "number" || typeof value === "boolean") text = String(value);
		else if (typeof value === "object" && value !== null) text = JSON.stringify(value);
		else text = "";
		return `'${text.replace(SINGLE_QUOTE_PATTERN, "''")}'`;
	}
	/**
	* Get empty default for a field type
	*/
	getEmptyDefault(fieldType) {
		if (fieldType === "blocks") return "'[]'";
		switch (FIELD_TYPE_TO_COLUMN[fieldType]) {
			case "INTEGER": return "0";
			case "REAL": return "0.0";
			case "JSON": return "'null'";
			default: return "''";
		}
	}
	/**
	* Map a collection row to a Collection object
	*/
	mapCollectionRow = (row) => {
		const moderation = row.comments_moderation;
		return {
			id: row.id,
			slug: row.slug,
			label: row.label,
			labelSingular: row.label_singular ?? void 0,
			description: row.description ?? void 0,
			icon: row.icon ?? void 0,
			admin: parseCollectionAdmin(row.admin_config),
			supports: parseSupports(row.supports),
			source: row.source && isCollectionSource(row.source) ? row.source : void 0,
			hasSeo: row.has_seo === 1,
			titleField: row.title_field ?? void 0,
			dateField: row.date_field ?? void 0,
			urlPattern: row.url_pattern ?? void 0,
			routable: row.routable !== 0,
			hidden: row.hidden === 1,
			sortOrder: row.sort_order ?? void 0,
			group: row.nav_group ?? void 0,
			commentsEnabled: row.comments_enabled === 1,
			commentsModeration: moderation === "all" || moderation === "first_time" || moderation === "none" ? moderation : "first_time",
			commentsClosedAfterDays: row.comments_closed_after_days ?? 90,
			commentsAutoApproveUsers: row.comments_auto_approve_users === 1,
			editLocking: row.edit_locking !== 0,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		};
	};
	/**
	* Map a field row to a Field object
	*/
	mapFieldRow = (row) => {
		const validation = row.validation ? JSON.parse(row.validation) : void 0;
		const unsupportedType = isFieldType(row.type) ? row.type === "repeater" ? findUnsupportedRepeaterSubFieldType(validation) : void 0 : {
			type: row.type,
			path: "type"
		};
		return {
			id: row.id,
			collectionId: row.collection_id,
			slug: row.slug,
			label: row.label,
			type: isFieldType(row.type) ? row.type : "string",
			unsupportedType,
			columnType: isColumnType(row.column_type) ? row.column_type : "TEXT",
			required: row.required === 1,
			unique: row.unique === 1,
			defaultValue: row.default_value ? JSON.parse(row.default_value) : void 0,
			validation,
			widget: row.widget ?? void 0,
			options: row.options ? JSON.parse(row.options) : void 0,
			sortOrder: row.sort_order,
			searchable: row.searchable === 1,
			indexed: row.indexed === 1,
			translatable: row.translatable !== 0,
			createdAt: row.created_at
		};
	};
	/**
	* Discover orphaned content tables
	*
	* Finds ec_* tables that exist in the database but don't have a
	* corresponding entry in _emdash_collections.
	*/
	async discoverOrphanedTables() {
		const allTables = await listTablesLike(this.db, "ec_%");
		const registered = await this.listCollections();
		const registeredSlugs = new Set(registered.map((c) => c.slug));
		const orphans = [];
		for (const tableName of allTables) {
			const slug = tableName.replace(EC_PREFIX_PATTERN, "");
			if (!registeredSlugs.has(slug)) try {
				const countResult = await sql`
						SELECT COUNT(*) as count FROM ${sql.ref(tableName)}
						WHERE deleted_at IS NULL
					`.execute(this.db);
				orphans.push({
					slug,
					tableName,
					rowCount: countResult.rows[0]?.count ?? 0
				});
			} catch {
				orphans.push({
					slug,
					tableName,
					rowCount: 0
				});
			}
		}
		return orphans;
	}
	/**
	* Register an orphaned table as a collection
	*
	* Creates a _emdash_collections entry for an existing ec_* table.
	*/
	async registerOrphanedTable(slug, options) {
		const tableName = this.getTableName(slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, slug)) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		if (!await tableExists(this.db, tableName)) throw new SchemaError(`Table "${tableName}" does not exist`, "TABLE_NOT_FOUND");
		const existing = await this.getCollection(slug);
		if (await isMediaUsageCollectionSlugDeleting(this.db, slug)) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		if (existing && !await canResumeMediaUsageCollectionCapture(this.db, {
			collectionId: existing.id,
			collectionSlug: existing.slug
		})) throw new SchemaError(`Collection "${slug}" is already registered`, "COLLECTION_EXISTS");
		const proposedId = existing?.id ?? ulid();
		const label = options?.label || this.slugToLabel(slug);
		let collectionRegistered = false;
		try {
			const capture = await prepareMediaUsageCollectionCapture(this.db, {
				collectionId: proposedId,
				collectionSlug: slug,
				registeredCollectionId: existing?.id
			});
			if (capture.captureRequired) {
				await installPreparedMediaUsageCollectionCapture(this.db, {
					collectionId: capture.collectionId,
					collectionSlug: slug
				});
				await markMediaUsageCollectionCaptureReady(this.db, {
					collectionId: capture.collectionId,
					collectionSlug: slug
				});
			}
			if (!capture.registrationExists) {
				await this.db.insertInto("_emdash_collections").values({
					id: capture.collectionId,
					slug,
					label,
					label_singular: options?.labelSingular ?? null,
					description: options?.description ?? null,
					icon: null,
					supports: JSON.stringify([]),
					source: "discovered",
					has_seo: 0,
					url_pattern: null
				}).execute();
				collectionRegistered = true;
			}
			if (capture.captureRequired) await finalizeMediaUsageCollectionCapture(this.db, {
				collectionId: capture.collectionId,
				collectionSlug: slug
			});
			const collection = await this.getCollection(slug);
			if (!collection) throw new SchemaError("Failed to register orphaned table", "REGISTER_FAILED");
			await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			this.notifyTypegen();
			return collection;
		} catch (error) {
			if (collectionRegistered) await markContentMediaUsageCollectionStaleSafely(this.db, slug, "CONTENT_USAGE_STALE");
			throw error;
		}
	}
	/**
	* Convert slug to human-readable label
	*/
	slugToLabel(slug) {
		return slug.replace(UNDERSCORE_PATTERN, " ").replace(WORD_BOUNDARY_PATTERN, (c) => c.toUpperCase());
	}
};
export { loadContentMediaUsageSnapshots as A, selectByKeys as B, estimateStatements as C, getPortableTableSpecForKind as D, firstDifference as E, processMediaUsageWorkAfterWrite as F, updateColumns as H, recordCodecs as I, refreshContentMediaUsageAfterWrite as L, markContentMediaUsageCollectionStaleSafely as M, processDueMediaUsageCollectionDeletions as N, insertRows as O, processMediaUsageCollectionDeletion as P, registry_exports as R, encodeValue as S, fingerprintBlockFields as T, validateBlockFields as U, selectExportedColumns as V, withContentUsageCollectionLock as W, decodeContentRow as _, MEDIA_USAGE_CONTENT_SOURCE_VARIANTS as a, encodeColumn as b, MediaUsageRepository as c, SchemaRegistry as d, assertColumnCoverage as f, contentColumnSpecs as g, codecForColumnType as h, CONTENT_TABLE_COLUMNS as i, markContentMediaUsageCollectionStale as j, loadContentMediaUsageFields as k, PORTABLE_TABLES as l, buildContentMediaUsageSourceKey as m, CONTENT_MEDIA_USAGE_ADAPTER_ID as n, MediaUsageBlockResolutionError as o, assertLoadedColumnCoverage as p, CONTENT_MEDIA_USAGE_COLLECTION_SCOPE as r, MediaUsageFieldDiscoveryError as s, BlockTypeRegistry as t, SchemaError as u, decodeRow as v, findNonTranslatableSiblingContentIds as w, encodeRecord as x, deleteContentMediaUsage as y, runMediaUsageMaintenanceStep as z };
