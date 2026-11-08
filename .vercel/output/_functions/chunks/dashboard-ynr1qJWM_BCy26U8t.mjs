import { t as validateIdentifier } from "./validate-DANX1-Qi_wjrLsQ-M.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import { t as UserRepository } from "./user-By8SzQxS_D4eC0D6b.mjs";
import { r as isScheduledPolicyRejection, t as SCHEDULED_POLICY_REJECTION_PREFIX } from "./content-policy-BmE0MPZY_DwHUSBvD.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/dashboard-ynr1qJWM.mjs
var SCHEDULER_HEARTBEAT_OPTION = "system:scheduler:last_completed_at";
var SCHEDULER_STALE_AFTER_MS = 3e5;
async function recordSchedulerHeartbeat(db, completedAt = /* @__PURE__ */ new Date()) {
	await new OptionsRepository(db).set(SCHEDULER_HEARTBEAT_OPTION, completedAt.toISOString());
}
async function recordSchedulerHeartbeatSafely(db, completedAt = /* @__PURE__ */ new Date()) {
	try {
		await recordSchedulerHeartbeat(db, completedAt);
	} catch (error) {
		console.error("[scheduler] Failed to record heartbeat:", error);
	}
}
async function getSchedulerHealth(db, now = /* @__PURE__ */ new Date()) {
	const lastCompletedAt = await new OptionsRepository(db).get(SCHEDULER_HEARTBEAT_OPTION);
	const lastCompletedAtMs = lastCompletedAt ? Date.parse(lastCompletedAt) : NaN;
	if (!lastCompletedAt || Number.isNaN(lastCompletedAtMs)) return {
		status: "unknown",
		lastCompletedAt: null
	};
	return {
		status: now.getTime() - lastCompletedAtMs > SCHEDULER_STALE_AFTER_MS ? "stale" : "healthy",
		lastCompletedAt
	};
}
/**
* Dashboard stats handler
*
* Returns summary data for the admin dashboard in a single request:
* collection content counts, media count, user count, and recent
* content across all collections.
*/
var POLICY_REJECTION_PREVIEW_LIMIT = 20;
/**
* Fetch dashboard statistics.
*
* Queries are intentionally lightweight — counts use indexed columns,
* and recent items are capped at 10.
*
* Without `includeDrafts` (callers lacking `content:read_drafts`), only
* published entries are counted or listed, and scheduled-publication policy
* rejections are omitted. Without `includeMediaCount` / `includeUserCount`,
* `mediaCount` / `userCount` are omitted.
*/
async function handleDashboardStats(db, { includeDrafts, includeMediaCount, includeUserCount }, now = /* @__PURE__ */ new Date()) {
	try {
		const collections = await db.selectFrom("_emdash_collections").select(["slug", "label"]).orderBy("slug", "asc").execute();
		const contentRepo = new ContentRepository(db);
		const collectionStats = await Promise.all(collections.map(async (col) => {
			const stats = await contentRepo.getStats(col.slug, now);
			if (!includeDrafts) return {
				slug: col.slug,
				label: col.label,
				total: stats.published,
				published: stats.published,
				draft: 0,
				scheduled: 0,
				overdueScheduled: 0
			};
			return {
				slug: col.slug,
				label: col.label,
				total: stats.total,
				published: stats.published,
				draft: stats.draft,
				scheduled: stats.scheduled,
				overdueScheduled: stats.overdueScheduled
			};
		}));
		const mediaRepo = new MediaRepository(db);
		const userRepo = new UserRepository(db);
		const optionsRepo = new OptionsRepository(db);
		const [mediaCount, userCount, schedulerHealth, policyRejectedScheduled, versionedPolicyRejectionOptions] = await Promise.all([
			includeMediaCount ? mediaRepo.count() : void 0,
			includeUserCount ? userRepo.count() : void 0,
			getSchedulerHealth(db, now),
			includeDrafts ? optionsRepo.countByPrefix(SCHEDULED_POLICY_REJECTION_PREFIX) : 0,
			includeDrafts ? optionsRepo.getVersionedByPrefix(SCHEDULED_POLICY_REJECTION_PREFIX, { limit: POLICY_REJECTION_PREVIEW_LIMIT }) : /* @__PURE__ */ new Map()
		]);
		const policyRejections = [...versionedPolicyRejectionOptions.values()].filter(({ value }) => isScheduledPolicyRejection(value)).map(({ value, revision }) => ({
			...value,
			_rev: revision
		}));
		return {
			success: true,
			data: {
				collections: collectionStats,
				mediaCount,
				userCount,
				recentItems: await fetchRecentItems(db, collections, includeDrafts),
				schedulerHealth,
				policyRejectedScheduled,
				policyRejections
			}
		};
	} catch (error) {
		console.error("Dashboard stats error:", error);
		return {
			success: false,
			error: {
				code: "DASHBOARD_STATS_ERROR",
				message: "Failed to load dashboard statistics"
			}
		};
	}
}
/**
* Fetch the 10 most recently updated items across all collections.
*
* Uses UNION ALL over each ec_* table. The query is safe because
* collection slugs come from the system table and are validated.
*
* `title` is not a standard column — it's a user-defined field. We query
* `_emdash_fields` to discover which collections have one and fall back
* to `slug` (which is always present) otherwise.
*
* Without `includeDrafts`, only published entries are considered.
*/
async function fetchRecentItems(db, collections, includeDrafts) {
	if (collections.length === 0) return [];
	const titleFields = await db.selectFrom("_emdash_fields as f").innerJoin("_emdash_collections as c", "c.id", "f.collection_id").select(["c.slug as collection_slug"]).where("f.slug", "=", "title").execute();
	const collectionsWithTitle = new Set(titleFields.map((r) => r.collection_slug));
	const statusFilter = includeDrafts ? sql`` : sql`AND status = 'published'`;
	return (await Promise.all(collections.map(async (col) => {
		validateIdentifier(col.slug);
		const table = `ec_${col.slug}`;
		const titleExpr = collectionsWithTitle.has(col.slug) ? sql`COALESCE(title, slug, id)` : sql`COALESCE(slug, id)`;
		return (await sql`
				SELECT
					id,
					${sql.lit(col.slug)} AS collection,
					${sql.lit(col.label)} AS collection_label,
					${titleExpr} AS title,
					slug,
					status,
					updated_at,
					author_id
				FROM ${sql.ref(table)}
				WHERE deleted_at IS NULL ${statusFilter}
				ORDER BY updated_at DESC
				LIMIT 10
			`.execute(db)).rows;
	}))).flat().toSorted((a, b) => a.updated_at < b.updated_at ? 1 : a.updated_at > b.updated_at ? -1 : 0).slice(0, 10).map((row) => ({
		id: row.id,
		collection: row.collection,
		collectionLabel: row.collection_label,
		title: row.title,
		slug: row.slug,
		status: row.status,
		updatedAt: row.updated_at,
		authorId: row.author_id
	}));
}
export { recordSchedulerHeartbeatSafely as n, handleDashboardStats as t };
