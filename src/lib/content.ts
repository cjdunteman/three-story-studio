import { getEmDashCollection, getEmDashEntry, type CacheHint } from "emdash";

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

export function isFlagOn(value: unknown): boolean {
	return value === true || value === 1 || value === "1" || value === "true";
}

type PieceEntry = Awaited<ReturnType<typeof getEmDashCollection<"pieces">>>["entries"][number];

type PhotoImage = {
	id: string;
	src?: string;
	alt?: string;
	caption?: string;
	width?: number;
	height?: number;
};

export type PiecePhoto = {
	image: PhotoImage;
	caption: string;
};

function isPhotoImage(value: unknown): value is PhotoImage {
	return (
		typeof value === "object" &&
		value !== null &&
		typeof (value as PhotoImage).id === "string" &&
		(value as PhotoImage).id.length > 0
	);
}

/** Photos on the piece page, other than the gallery showcase. */
export function additionalPhotos(data: {
	showcase?: { id?: string } | null;
	photos?: unknown;
}): PiecePhoto[] {
	const rows = Array.isArray(data.photos) ? data.photos : [];
	const showcaseId = typeof data.showcase?.id === "string" ? data.showcase.id : "";
	const photos: PiecePhoto[] = [];

	for (const row of rows) {
		if (!row || typeof row !== "object") continue;
		const record = row as { image?: unknown; caption?: unknown };
		if (!isPhotoImage(record.image) || record.image.id === showcaseId) continue;
		photos.push({
			image: record.image,
			caption: typeof record.caption === "string" ? record.caption.trim() : "",
		});
	}

	return photos;
}

/** Public piece URL when the piece has photos beyond the showcase. */
export function piecePagePath(piece: {
	id: string;
	data: { showcase?: { id?: string } | null; photos?: unknown };
}): string {
	if (!piece.id || additionalPhotos(piece.data).length === 0) return "";
	return `/pieces/${piece.id}`;
}

export function projectPath(slug: unknown): string {
	if (typeof slug !== "string") return "";
	const trimmed = slug.trim();
	if (!trimmed || trimmed.includes("/") || trimmed.includes("\\")) return "";
	return `/projects/${trimmed}`;
}

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
