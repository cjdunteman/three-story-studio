import "./dist_D1airXGO.mjs";
import { a as getEmDashEntry, i as getEmDashCollection } from "./query-D62NntCZ_lxluWEZx.mjs";
// src/lib/content.ts
var PAGE_SIZE = 100;
var MAX_PAGES = 20;
function isFlagOn(value) {
	return value === true || value === 1 || value === "1" || value === "true";
}
async function loadPieces() {
	const entries = [];
	const cacheHints = [];
	let cursor;
	let error;
	for (let page = 0; page < MAX_PAGES; page++) {
		const result = await getEmDashCollection("pieces", {
			status: "published",
			limit: PAGE_SIZE,
			cursor,
			orderBy: { created_at: "desc" }
		});
		if (result.cacheHint) cacheHints.push(result.cacheHint);
		if (result.error) {
			error = result.error;
			break;
		}
		entries.push(...result.entries);
		if (!result.nextCursor) break;
		cursor = result.nextCursor;
	}
	return {
		entries,
		cacheHints,
		error
	};
}
async function loadProject(slug) {
	const direct = await getEmDashEntry("projects", slug);
	if (direct.entry || !slug) return direct;
	const legacy = await getEmDashCollection("projects", {
		status: "published",
		where: { legacy_id: slug },
		limit: 1
	});
	const match = legacy.entries[0];
	if (!match?.data.slug) return direct;
	return {
		entry: match,
		cacheHint: legacy.cacheHint,
		error: legacy.error,
		redirectTo: `/projects/${match.id}`
	};
}
export { loadPieces as n, loadProject as r, isFlagOn as t };
