import { getEmDashCollection, getEmDashEntry, type CacheHint } from "emdash";

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

export function isFlagOn(value: unknown): boolean {
	return value === true || value === 1 || value === "1" || value === "true";
}

type PieceEntry = Awaited<ReturnType<typeof getEmDashCollection<"pieces">>>["entries"][number];

export async function loadPieces() {
	const entries: PieceEntry[] = [];
	const cacheHints: CacheHint[] = [];
	let cursor: string | undefined;
	let error: unknown;

	for (let page = 0; page < MAX_PAGES; page++) {
		const result = await getEmDashCollection("pieces", {
			status: "published",
			limit: PAGE_SIZE,
			cursor,
			orderBy: { created_at: "desc" },
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

	return { entries, cacheHints, error };
}

export async function loadProject(slug: string) {
	const direct = await getEmDashEntry("projects", slug);
	if (direct.entry || !slug) return direct;

	const legacy = await getEmDashCollection("projects", {
		status: "published",
		where: { legacy_id: slug },
		limit: 1,
	});
	const match = legacy.entries[0];
	if (!match?.data.slug) return direct;

	return {
		entry: match,
		cacheHint: legacy.cacheHint,
		error: legacy.error,
		redirectTo: `/projects/${match.id}`,
	};
}
