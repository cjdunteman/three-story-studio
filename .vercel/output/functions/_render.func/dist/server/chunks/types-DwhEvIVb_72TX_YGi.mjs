import { i as encodeBase64, t as decodeBase64 } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
// node_modules/emdash/dist/types-DwhEvIVb.mjs
/**
* Hard cap on cursor length. Cursors we issue are short JSON-in-base64
* blobs; a real cursor is well under 200 chars. This guards against
* malicious callers passing megabyte-sized strings to force the base64
* decoder to allocate (decodeBase64 is O(N) in input size). The MCP and
* REST schemas also clamp at 2048 — this 4096 cap is a defense-in-depth
* floor inside the repository helpers.
*/
var MAX_CURSOR_LENGTH = 4096;
/**
* Order value stamped into a cursor over a *staged* reference selection, whose
* anchor is a translation group rather than a row in the link table.
*
* A preview and a public render page the same field from different places, so a
* cursor can cross that boundary in either direction — the draft publishes, or
* the preview session ends, mid-pagination. Both sides recognise this marker so
* they can tell a foreign cursor from a malformed one and restart the field's
* page rather than failing or silently emptying it.
*/
var STAGED_CURSOR_MARKER = "staged";
/** Encode a cursor from order value + id, optionally carrying the ordered field values. */
function encodeCursor(orderValue, id, sortValues) {
	const payload = {
		orderValue,
		id
	};
	if (sortValues !== void 0 && sortValues.length > 0) payload.sortValues = sortValues;
	return encodeBase64(JSON.stringify(payload));
}
/**
* Thrown when a pagination cursor cannot be decoded.
*
* Repository callers should let this propagate; handler catch blocks
* map it to a structured `INVALID_CURSOR` error so client pagination
* bugs surface immediately rather than silently re-fetching the first
* page.
*/
var InvalidCursorError = class extends Error {
	constructor(cursor) {
		const display = cursor.length > 50 ? `${cursor.slice(0, 47)}...` : cursor;
		super(`Invalid pagination cursor: ${display}`);
		this.name = "InvalidCursorError";
	}
};
function isSortFieldBoundary(item) {
	if (item === null || typeof item !== "object") return false;
	const candidate = item;
	if (candidate.missing !== void 0 && typeof candidate.missing !== "boolean") return false;
	return true;
}
function normalizeSortBoundary(item) {
	if (isSortFieldBoundary(item)) return {
		value: item.value,
		missing: item.missing
	};
	return {
		value: item,
		missing: false
	};
}
/**
* Decode a cursor to order value + id.
*
* Throws `InvalidCursorError` if the cursor is empty, not valid base64,
* not valid JSON, or doesn't contain string `orderValue` and `id` fields.
*/
function decodeCursor(cursor) {
	if (!cursor) throw new InvalidCursorError(cursor);
	if (cursor.length > 4096) throw new InvalidCursorError(cursor);
	let parsed;
	try {
		parsed = JSON.parse(decodeBase64(cursor));
	} catch {
		throw new InvalidCursorError(cursor);
	}
	if (parsed === null || typeof parsed !== "object") throw new InvalidCursorError(cursor);
	const candidate = parsed;
	if (typeof candidate.orderValue !== "string" || typeof candidate.id !== "string") throw new InvalidCursorError(cursor);
	let sortValues;
	if (candidate.sortValues !== void 0) {
		if (!Array.isArray(candidate.sortValues)) throw new InvalidCursorError(cursor);
		sortValues = candidate.sortValues.map(normalizeSortBoundary);
	}
	return {
		orderValue: candidate.orderValue,
		id: candidate.id,
		sortValues
	};
}
var EmDashValidationError = class extends Error {
	constructor(message, details) {
		super(message);
		this.details = details;
		this.name = "EmDashValidationError";
	}
};
var ContentCollectionNotFoundError = class extends Error {
	constructor(collection) {
		super(`Collection '${collection}' not found`);
		this.name = "ContentCollectionNotFoundError";
	}
};
/**
* Thrown by `publish()` when called with `requireDue` for a row that is no
* longer due (its `scheduled_at` was cleared or pushed into the future between
* selection and publish — e.g. an editor unscheduled it). Lets the scheduled
* sweep skip the row silently rather than treating it as a publish failure.
*/
var ScheduledNotDueError = class extends Error {
	constructor(message = "Content is no longer scheduled to publish") {
		super(message);
		this.name = "ScheduledNotDueError";
	}
};
var ContentMutationConflictError = class extends Error {
	constructor(message = "Content changed while the operation was in progress") {
		super(message);
		this.name = "ContentMutationConflictError";
	}
};
var ContentSlugConflictError = class extends Error {
	constructor() {
		super("The slug is already used by another content entry");
		this.name = "ContentSlugConflictError";
	}
};
export { InvalidCursorError as a, ScheduledNotDueError as c, EmDashValidationError as i, decodeCursor as l, ContentMutationConflictError as n, MAX_CURSOR_LENGTH as o, ContentSlugConflictError as r, STAGED_CURSOR_MARKER as s, ContentCollectionNotFoundError as t, encodeCursor as u };
