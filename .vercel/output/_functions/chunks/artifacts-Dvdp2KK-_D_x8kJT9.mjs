import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { r as isMissingTableError } from "./db-errors-unnO6yiZ_bZrC2Cf7.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { t as RedirectRepository } from "./redirect-DjLdw427_BDBqyEyI.mjs";
import { n as siteSettingsVersionQuery, t as normalizeSiteSettingsVersion } from "./version-DqB7LIO7_XOqsc8vv.mjs";
import { n as invalidateRedirectCache } from "./cache-5DHbpEWu_CTsWW_zV.mjs";
// node_modules/emdash/dist/artifacts-Dvdp2KK-.mjs
var artifacts_exports = /* @__PURE__ */ __exportAll({
	createRedirectSource: () => createRedirectSource,
	publishRedirectArtifacts: () => publishRedirectArtifacts,
	publishRedirectChanges: () => publishRedirectChanges
});
var ARTIFACT_TARGET_BYTES = 65536;
var GENERATION_PREFIX = "emdash-redirects-v1";
var REPAIR_LEASE_MS = 6e4;
/** Three bound parameters per link row keeps each insert within D1's limit. */
var LINK_BATCH_SIZE = 30;
var encoder = new TextEncoder();
async function sha256Hex(value) {
	const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function fnv1a(value) {
	let hash = 2166136261;
	for (let i = 0; i < value.length; i++) {
		hash ^= value.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return hash >>> 0;
}
function toEntry(rule) {
	return [
		rule.id,
		rule.source,
		rule.destination,
		rule.type
	];
}
function entryBytes(entry) {
	return encoder.encode(JSON.stringify(entry)).byteLength + 1;
}
async function createArtifact(kind, entries) {
	const payload = JSON.stringify(entries);
	return {
		digest: await sha256Hex(`${kind}\n${payload}`),
		kind,
		payload
	};
}
function generationId(digests) {
	return sha256Hex([GENERATION_PREFIX, ...digests].join("\n"));
}
/** Splits enabled rows, in precedence order, into exact and pattern rules. */
function toRuleSet(rows, version) {
	const exact = [];
	const patterns = [];
	for (const { isPattern, ...rule } of rows) (isPattern ? patterns : exact).push(rule);
	return {
		version,
		exact,
		patterns
	};
}
/**
* Builds the artifacts for a rule set. Exact rules keep the last rule per
* source, matching lookup semantics, and are sorted so the shards are
* deterministic. Pattern rules keep precedence order across chunks.
*/
async function buildArtifacts(rules) {
	const bySource = /* @__PURE__ */ new Map();
	for (const rule of rules.exact) bySource.set(rule.source, toEntry(rule));
	const exact = [...bySource.values()].toSorted((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);
	const exactBytes = exact.reduce((total, entry) => total + entryBytes(entry), 0);
	const shardCount = Math.max(1, Math.ceil(exactBytes / ARTIFACT_TARGET_BYTES));
	const shards = Array.from({ length: shardCount }, () => []);
	for (const entry of exact) shards[fnv1a(entry[1]) % shardCount].push(entry);
	const artifacts = [];
	for (const shard of shards) if (shard.length > 0) artifacts.push(await createArtifact("exact", shard));
	let chunk = [];
	let chunkBytes = 0;
	for (const rule of rules.patterns) {
		const entry = toEntry(rule);
		const bytes = entryBytes(entry);
		if (chunk.length > 0 && chunkBytes + bytes > ARTIFACT_TARGET_BYTES) {
			artifacts.push(await createArtifact("pattern", chunk));
			chunk = [];
			chunkBytes = 0;
		}
		chunk.push(entry);
		chunkBytes += bytes;
	}
	if (chunk.length > 0) artifacts.push(await createArtifact("pattern", chunk));
	return {
		generation: await generationId(artifacts.map((artifact) => artifact.digest)),
		artifacts
	};
}
/**
* Publishes the enabled redirect rules as the active generation.
*
* The revision is read before the rules, so the published generation holds
* at least the changes up to the revision it is labelled with. A publish at
* the active revision replaces the active generation, which repairs a damaged
* one; losing the compare-and-set to a newer revision leaves that publish
* active.
*/
async function publishRedirectArtifacts(db) {
	const state = await db.selectFrom("_emdash_redirect_state").select("revision").where("id", "=", 1).executeTakeFirst();
	if (!state) throw new Error("Redirect state row is missing");
	const revision = Number(state.revision);
	const { generation, artifacts } = await buildArtifacts(toRuleSet((await db.selectFrom("_emdash_redirects").select([
		"id",
		"source",
		"destination",
		"type",
		"is_pattern"
	]).where("enabled", "=", 1).orderBy("created_at", (order) => order.asc().nullsFirst()).orderBy("id", "asc").execute()).map((row) => ({
		id: row.id,
		source: row.source,
		destination: row.destination,
		type: Number(row.type),
		isPattern: Number(row.is_pattern) === 1
	})), null));
	await withTransaction(db, async (trx) => {
		const digests = [...new Set(artifacts.map((artifact) => artifact.digest))];
		const stored = /* @__PURE__ */ new Map();
		for (const batch of chunks(digests, 50)) {
			const found = await trx.selectFrom("_emdash_redirect_artifacts").select([
				"digest",
				"kind",
				"payload"
			]).where("digest", "in", batch).execute();
			for (const row of found) stored.set(row.digest, `${row.kind}\n${row.payload}`);
		}
		for (const artifact of artifacts) {
			const content = `${artifact.kind}\n${artifact.payload}`;
			if (stored.get(artifact.digest) === content) continue;
			stored.set(artifact.digest, content);
			await trx.insertInto("_emdash_redirect_artifacts").values(artifact).onConflict((conflict) => conflict.column("digest").doUpdateSet({
				kind: artifact.kind,
				payload: artifact.payload
			})).execute();
		}
		const links = artifacts.map((artifact, position) => ({
			generation,
			position,
			digest: artifact.digest
		}));
		for (const batch of chunks(links, LINK_BATCH_SIZE)) await trx.insertInto("_emdash_redirect_generation_artifacts").values(batch).onConflict((conflict) => conflict.columns(["generation", "position"]).doUpdateSet((eb) => ({ digest: eb.ref("excluded.digest") }))).execute();
		await trx.deleteFrom("_emdash_redirect_generation_artifacts").where("generation", "=", generation).where("position", ">=", links.length).execute();
		const activated = await trx.updateTable("_emdash_redirect_state").set({
			generation,
			generation_revision: revision
		}).where("id", "=", 1).where("generation_revision", "<=", revision).executeTakeFirst();
		if (BigInt(activated.numUpdatedRows) === 0n) return;
		await trx.deleteFrom("_emdash_redirect_generation_artifacts").where((eb) => eb("generation", "<>", eb.selectFrom("_emdash_redirect_state").select("generation").where("id", "=", 1))).execute();
		await trx.deleteFrom("_emdash_redirect_artifacts").where(({ exists, not, selectFrom }) => not(exists(selectFrom("_emdash_redirect_generation_artifacts").select("_emdash_redirect_generation_artifacts.digest").whereRef("_emdash_redirect_generation_artifacts.digest", "=", "_emdash_redirect_artifacts.digest")))).execute();
	});
}
/**
* Publishes after a redirect write, then invalidates this isolate's cache. A
* failed publish is logged rather than failing the write: readers fall back
* to the rules table and repair the stale generation.
*/
async function publishRedirectChanges(db) {
	try {
		await publishRedirectArtifacts(db);
	} catch (error) {
		console.error("[emdash:redirects] publishing redirect artifacts failed:", error);
	}
	invalidateRedirectCache();
}
function isArtifactEntry(value) {
	return Array.isArray(value) && value.length === 4 && typeof value[0] === "string" && typeof value[1] === "string" && typeof value[2] === "string" && typeof value[3] === "number";
}
function parseEntries(payload) {
	try {
		const parsed = JSON.parse(payload);
		return Array.isArray(parsed) && parsed.every(isArtifactEntry) ? parsed : null;
	} catch {
		return null;
	}
}
function observeSiteSettingsVersion(callback, raw) {
	if (!callback) return;
	let version = null;
	try {
		if (raw) version = normalizeSiteSettingsVersion(raw);
	} catch {}
	callback(version);
}
/**
* Loads and verifies the active generation. Returns null when nothing is
* published, the generation is stale, or any artifact is missing, altered, or
* out of place.
*/
async function loadPublishedRedirects(db, onSiteSettingsVersion) {
	const rows = await db.selectFrom("_emdash_redirect_state as state").leftJoin("_emdash_redirect_generation_artifacts as link", "link.generation", "state.generation").leftJoin("_emdash_redirect_artifacts as artifact", "artifact.digest", "link.digest").select([
		"state.revision",
		"state.generation",
		"state.generation_revision",
		...onSiteSettingsVersion ? [siteSettingsVersionQuery(db).as("site_settings_version")] : [],
		"link.position",
		"link.digest",
		"artifact.kind",
		"artifact.payload"
	]).where("state.id", "=", 1).orderBy("link.position", "asc").execute();
	const state = rows[0];
	observeSiteSettingsVersion(onSiteSettingsVersion, state?.site_settings_version);
	if (!state?.generation) return null;
	if (Number(state.revision) > Number(state.generation_revision)) return null;
	const exact = [];
	const patterns = [];
	const digests = [];
	const links = rows.filter((row) => row.position !== null);
	for (const [index, link] of links.entries()) {
		if (Number(link.position) !== index || !link.digest || link.payload === null || link.kind !== "exact" && link.kind !== "pattern") return null;
		if (await sha256Hex(`${link.kind}\n${link.payload}`) !== link.digest) return null;
		const entries = parseEntries(link.payload);
		if (!entries) return null;
		const target = link.kind === "exact" ? exact : patterns;
		for (const [id, source, destination, type] of entries) target.push({
			id,
			source,
			destination,
			type
		});
		digests.push(link.digest);
	}
	if (await generationId(digests) !== state.generation) return null;
	return {
		version: state.generation,
		exact,
		patterns
	};
}
async function loadRulesTable(db) {
	return toRuleSet((await new RedirectRepository(db).findAllEnabled()).map(({ id, source, destination, type, isPattern }) => ({
		id,
		source,
		destination,
		type,
		isPattern
	})), null);
}
var REPAIR_STATE_KEY = Symbol.for("emdash:redirect-artifact-repair");
var g = globalThis;
var repairState = g[REPAIR_STATE_KEY] ?? (() => {
	const state = { runningUntil: 0 };
	g[REPAIR_STATE_KEY] = state;
	return state;
})();
/**
* Republishes the artifacts under a database lease so one isolate repairs a
* stale or damaged generation while the others keep serving.
*/
async function repairRedirectArtifacts(db) {
	const now = Date.now();
	const expiresAt = now + REPAIR_LEASE_MS;
	const lease = await db.updateTable("_emdash_redirect_state").set({ repair_expires_at: expiresAt }).where("id", "=", 1).where("repair_expires_at", "<", now).executeTakeFirst();
	if (BigInt(lease.numUpdatedRows) === 0n) return;
	try {
		await publishRedirectArtifacts(db);
	} finally {
		await db.updateTable("_emdash_redirect_state").set({ repair_expires_at: 0 }).where("id", "=", 1).where("repair_expires_at", "=", expiresAt).execute();
	}
}
function scheduleRedirectRepair(db) {
	const now = Date.now();
	if (repairState.runningUntil > now) return;
	const runningUntil = now + REPAIR_LEASE_MS;
	repairState.runningUntil = runningUntil;
	after(async () => {
		try {
			await repairRedirectArtifacts(db);
		} catch (error) {
			console.error("[emdash:redirects] repairing redirect artifacts failed:", error);
		} finally {
			if (repairState.runningUntil === runningUntil) repairState.runningUntil = 0;
		}
	});
}
/**
* The rule source the middleware caches: the published generation when it is
* current and verifies, otherwise the rules table. Before the artifact tables exist the
* rules table is read directly.
*/
function createRedirectSource(db, onSiteSettingsVersion) {
	return {
		async load() {
			let published;
			try {
				published = await loadPublishedRedirects(db, onSiteSettingsVersion);
			} catch (error) {
				if (isMissingTableError(error)) {
					onSiteSettingsVersion?.(null);
					return loadRulesTable(db);
				}
				throw error;
			}
			if (published) return published;
			scheduleRedirectRepair(db);
			return loadRulesTable(db);
		},
		async isCurrent(version) {
			const state = await db.selectFrom("_emdash_redirect_state").select([
				"revision",
				"generation",
				"generation_revision",
				...onSiteSettingsVersion ? [siteSettingsVersionQuery(db).as("site_settings_version")] : []
			]).where("id", "=", 1).executeTakeFirst();
			observeSiteSettingsVersion(onSiteSettingsVersion, state?.site_settings_version);
			return state?.generation === version && Number(state.revision) <= Number(state.generation_revision);
		}
	};
}
export { createRedirectSource as n, publishRedirectChanges as r, artifacts_exports as t };
