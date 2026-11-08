import { t as EntryLockRepository } from "./entry-locks-CJ9uhqg1_C8W-QuNA.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { ulid } from "ulidx";
// node_modules/emdash/dist/entry-lock-D-zJQ4q6.mjs
var ENTRY_LOCK_LEASE_SECONDS = 420;
function toHolder(lock) {
	return {
		userId: lock.userId,
		userName: lock.userName,
		acquiredAt: lock.acquiredAt,
		expiresAt: lock.expiresAt
	};
}
function holderLabel(holder) {
	return holder.userName?.trim() ? holder.userName : "Another editor";
}
async function isLockingEnabled(db, collection) {
	const row = await db.selectFrom("_emdash_collections").select("edit_locking").where("slug", "=", collection).executeTakeFirst();
	if (!row) return null;
	return row.edit_locking !== 0;
}
function collectionNotFound(collection) {
	return {
		success: false,
		error: {
			code: ErrorCode.COLLECTION_NOT_FOUND,
			message: `Collection '${collection}' not found`
		}
	};
}
/**
* Takes the entry's lock for `userId`, or reports who is holding it. A
* take-over is only granted when the caller asks for one.
*/
async function handleEntryLockAcquire(db, collection, entryId, userId, options = {}) {
	try {
		const enabled = await isLockingEnabled(db, collection);
		if (enabled === null) return collectionNotFound(collection);
		if (!enabled) return {
			success: true,
			data: {
				enabled: false,
				holder: null,
				heldByCaller: false
			}
		};
		const claim = await new EntryLockRepository(db).acquire({
			collection,
			entryId,
			userId,
			token: options.token ?? ulid(),
			leaseSeconds: ENTRY_LOCK_LEASE_SECONDS,
			takeover: options.takeover
		});
		return {
			success: true,
			data: {
				enabled: true,
				holder: toHolder(claim.lock),
				heldByCaller: claim.outcome === "acquired"
			}
		};
	} catch (error) {
		console.error("[entry-lock] acquire failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to acquire the entry lock"
			}
		};
	}
}
async function handleEntryLockRead(db, collection, entryId, userId) {
	try {
		const enabled = await isLockingEnabled(db, collection);
		if (enabled === null) return collectionNotFound(collection);
		if (!enabled) return {
			success: true,
			data: {
				enabled: false,
				holder: null,
				heldByCaller: false
			}
		};
		const lock = await new EntryLockRepository(db).findLive(collection, entryId);
		return {
			success: true,
			data: {
				enabled: true,
				holder: lock ? toHolder(lock) : null,
				heldByCaller: lock?.userId === userId
			}
		};
	} catch (error) {
		console.error("[entry-lock] read failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to read the entry lock"
			}
		};
	}
}
async function handleEntryLockRelease(db, collection, entryId, userId, options = {}) {
	try {
		return {
			success: true,
			data: { released: await new EntryLockRepository(db).release({
				collection,
				entryId,
				userId,
				token: options.token
			}) }
		};
	} catch (error) {
		console.error("[entry-lock] release failed:", error);
		return {
			success: false,
			error: {
				code: ErrorCode.ENTRY_LOCK_ERROR,
				message: "Failed to release the entry lock"
			}
		};
	}
}
/**
* Decides whether a write may proceed, and keeps the caller's own lease alive
* while it does. Resolves to `null` when the write is allowed.
*
* A write never takes a lock it was not given, so a CLI or API caller writing
* an unlocked entry leaves it unlocked.
*/
async function claimEntryLockForWrite(db, collection, entryId, userId, options = {}) {
	if (options.override === true) return null;
	const repo = new EntryLockRepository(db);
	if (await repo.refreshHeld({
		collection,
		entryId,
		userId,
		leaseSeconds: ENTRY_LOCK_LEASE_SECONDS
	})) return null;
	const holder = await repo.findEnforceable(collection, entryId);
	if (!holder) return null;
	const details = toHolder(holder);
	return {
		code: ErrorCode.ENTRY_LOCKED,
		message: `${holderLabel(details)} is holding this entry`,
		details
	};
}
export { handleEntryLockRelease as i, handleEntryLockAcquire as n, handleEntryLockRead as r, claimEntryLockForWrite as t };
