/** Public inquiry form: validate the submission and send it to the studio. */

const TO = "kristin@threestorystudio.com";
const FROM = {
	email: "noreply@mail.threestorystudio.com",
	name: "Three Story Studio",
};

const PHOTO_LIMIT = 8 * 1024 * 1024;
const BODY_LIMIT = 10 * 1024 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SENDS = 5;

const PHOTO_TYPES = new Map<string, string>([
	["image/jpeg", "jpg"],
	["image/jpg", "jpg"],
	["image/png", "png"],
	["image/webp", "webp"],
	["image/gif", "gif"],
	["image/heic", "heic"],
	["image/heif", "heif"],
]);

const EXTENSION_TYPES = new Map<string, string>([
	["jpg", "image/jpeg"],
	["jpeg", "image/jpeg"],
	["png", "image/png"],
	["webp", "image/webp"],
	["gif", "image/gif"],
	["heic", "image/heic"],
	["heif", "image/heif"],
]);

export const inquiryFields = [
	"name",
	"email",
	"phone",
	"piece",
	"width",
	"depth",
	"height",
	"notes",
	"photo",
] as const;

export type InquiryField = (typeof inquiryFields)[number];

export type InquiryValues = Record<Exclude<InquiryField, "photo">, string>;

export type Inquiry = InquiryValues & {
	photo?: { filename: string; type: string; content: ArrayBuffer };
};

export type InquiryResult =
	| { ok: true; honeypot: true }
	| { ok: true; honeypot: false; inquiry: Inquiry }
	| { ok: false; values: InquiryValues; fieldErrors: Partial<Record<InquiryField, string>> };

const emptyValues = (): InquiryValues => ({
	name: "",
	email: "",
	phone: "",
	piece: "",
	width: "",
	depth: "",
	height: "",
	notes: "",
});

const recentSends = new Map<string, number[]>();

/** True when this address has already sent several inquiries in the last few minutes. */
export function inquiryRateLimited(ip: string): boolean {
	const now = Date.now();
	const recent = (recentSends.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
	if (recent.length >= MAX_SENDS) {
		recentSends.set(ip, recent);
		return true;
	}
	recent.push(now);
	recentSends.set(ip, recent);
	if (recentSends.size > 1000) recentSends.clear();
	return false;
}

export function inquiryBodyTooLarge(contentLength: string | null): boolean {
	if (!contentLength) return false;
	const size = Number(contentLength);
	return Number.isFinite(size) && size > BODY_LIMIT;
}

export async function parseInquiry(form: FormData): Promise<InquiryResult> {
	const values = emptyValues();
	const fieldErrors: Partial<Record<InquiryField, string>> = {};

	const honeypot = form.get("fax_number");
	if (typeof honeypot === "string" && honeypot.trim()) return { ok: true, honeypot: true };

	for (const key of ["name", "email", "phone", "piece", "width", "depth", "height", "notes"] as const) {
		const raw = form.get(key);
		if (typeof raw !== "string") {
			fieldErrors[key] = "That form could not be read. Please try again.";
			continue;
		}
		values[key] = cleanText(raw, key === "piece" || key === "notes");
	}

	checkLength(values, fieldErrors, "name", 120, "Name");
	checkLength(values, fieldErrors, "email", 200, "Email");
	checkLength(values, fieldErrors, "phone", 40, "Phone");
	checkLength(values, fieldErrors, "piece", 2000, "Type of piece");
	checkLength(values, fieldErrors, "width", 40, "Width");
	checkLength(values, fieldErrors, "depth", 40, "Depth");
	checkLength(values, fieldErrors, "height", 40, "Height");
	checkLength(values, fieldErrors, "notes", 5000, "Notes");

	if (!values.name) fieldErrors.name = "Please add your name.";
	if (!values.email) fieldErrors.email = "Please add your email address.";
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		fieldErrors.email = "That email address does not look complete.";
	}
	if (!values.piece) fieldErrors.piece = "Please describe the type or style of piece.";

	const photo = await readPhoto(form.get("photo"), fieldErrors);
	if (Object.keys(fieldErrors).length) return { ok: false, values, fieldErrors };

	return {
		ok: true,
		honeypot: false,
		inquiry: { ...values, ...(photo ? { photo } : {}) },
	};
}

export function inquiryMessage(inquiry: Inquiry): {
	from: { email: string; name: string };
	to: string;
	replyTo: string;
	subject: string;
	text: string;
	attachments?: { disposition: "attachment"; filename: string; type: string; content: ArrayBuffer }[];
} {
	const lines = [
		"New inquiry from the website",
		"",
		`Name: ${inquiry.name}`,
		`Email: ${inquiry.email}`,
	];
	if (inquiry.phone) lines.push(`Phone: ${inquiry.phone}`);
	lines.push("", "Type / style of piece:", inquiry.piece);
	const size = [inquiry.width, inquiry.depth, inquiry.height];
	if (size.some(Boolean)) {
		lines.push("", "Measurements (W × D × H):", size.map((part) => part || "—").join(" × "));
	}
	if (inquiry.notes) lines.push("", "Notes:", inquiry.notes);
	if (inquiry.photo) lines.push("", `Photo: ${inquiry.photo.filename}`);

	return {
		from: { email: FROM.email, name: oneLine(inquiry.name) || FROM.name },
		to: TO,
		replyTo: inquiry.email,
		subject: `Upholstery inquiry from ${oneLine(inquiry.name)}`.slice(0, 180),
		text: lines.join("\n"),
		...(inquiry.photo
			? {
					attachments: [
						{
							disposition: "attachment" as const,
							filename: inquiry.photo.filename,
							type: inquiry.photo.type,
							content: inquiry.photo.content,
						},
					],
				}
			: {}),
	};
}

/** Send through the Cloudflare Email binding. Throws when mail is unavailable. */
export async function deliverInquiry(inquiry: Inquiry): Promise<void> {
	const { env } = await import("cloudflare:workers");
	const email = (env as { EMAIL?: { send?: (message: unknown) => Promise<unknown> } }).EMAIL;
	if (!email || typeof email.send !== "function") {
		throw new Error("EMAIL binding is not available");
	}
	await email.send(inquiryMessage(inquiry));
}

async function readPhoto(
	value: FormDataEntryValue | null,
	fieldErrors: Partial<Record<InquiryField, string>>,
): Promise<Inquiry["photo"] | undefined> {
	if (!(value instanceof File) || value.size === 0) return undefined;
	if (value.size > PHOTO_LIMIT) {
		fieldErrors.photo = "That photo is larger than 8 MB. Please send a smaller image.";
		return undefined;
	}
	const filename = safeFilename(value.name);
	const type = photoType(value.type, filename);
	if (!type) {
		fieldErrors.photo = "Please send a JPEG, PNG, WEBP, GIF, or HEIC photo.";
		return undefined;
	}
	if (Object.keys(fieldErrors).length) return undefined;
	return { filename, type, content: await value.arrayBuffer() };
}

function photoType(type: string, filename: string): string | undefined {
	const normalized = type.toLowerCase().split(";")[0]?.trim() ?? "";
	if (PHOTO_TYPES.has(normalized)) return normalized === "image/jpg" ? "image/jpeg" : normalized;
	const extension = filename.split(".").pop()?.toLowerCase() ?? "";
	return EXTENSION_TYPES.get(extension);
}

function safeFilename(name: string): string {
	const base = name.split(/[/\\]/).pop() ?? "photo";
	const cleaned = base.replace(/[^\w.\- ]+/g, "").trim().slice(0, 80);
	return cleaned || "photo";
}

function cleanText(value: string, keepLines: boolean): string {
	const withoutControls = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
	const text = keepLines ? withoutControls : withoutControls.replace(/[\r\n]+/g, " ");
	return text.trim();
}

function oneLine(value: string): string {
	return value.replace(/[\r\n]+/g, " ").trim();
}

function checkLength(
	values: InquiryValues,
	fieldErrors: Partial<Record<InquiryField, string>>,
	key: Exclude<InquiryField, "photo">,
	max: number,
	label: string,
) {
	if (values[key].length > max) fieldErrors[key] = `${label} is too long.`;
}
