import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { f as hasScope } from "./passkey_CpIENnGH.mjs";
import { h as hasPermission, o as canActOnOwn } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/authorize-NJgp8kLI.mjs
function canReadMediaUsageCount(user, tokenScopes) {
	return hasPermission(user, "content:read_drafts") && (!tokenScopes || hasScope(tokenScopes, "admin"));
}
/**
* Check if user has a permission. Returns a 401/403 Response if not, or null if authorized.
*
* Usage:
* ```ts
* const denied = requirePerm(user, "schema:manage");
* if (denied) return denied;
* ```
*/
function requirePerm(user, permission) {
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	if (!hasPermission(user, permission)) return apiError("FORBIDDEN", "Insufficient permissions", 403);
	return null;
}
/**
* Check if user can act on a resource, considering ownership.
* Returns a 401/403 Response if not, or null if authorized.
*
* Usage:
* ```ts
* const denied = requireOwnerPerm(user, item.authorId, "content:edit_own", "content:edit_any");
* if (denied) return denied;
* ```
*/
function requireOwnerPerm(user, ownerId, ownPermission, anyPermission) {
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	if (!canActOnOwn(user, ownerId, ownPermission, anyPermission)) return apiError("FORBIDDEN", "Insufficient permissions", 403);
	return null;
}
/**
* How `user` may edit an entry: `"full"` through `content:edit_own` or
* `content:edit_any`, `"draft"` through `content:edit_own_drafts` only, or
* `null` when they can't edit it.
*
* A `"draft"` grant holds only while the entry is still a draft, so the caller
* must make its write fail if the entry changes after this check, for example
* by conditioning the update on the `_rev` it checked.
*/
function entryEditAccess(user, entry) {
	if (canActOnOwn(user, entry.authorId, "content:edit_own", "content:edit_any")) return "full";
	if (entry.status === "draft" && canActOnOwn(user, entry.authorId, "content:edit_own_drafts", "content:edit_any")) return "draft";
	return null;
}
/**
* Check if user can edit an entry, including an owner editing their own draft
* through `content:edit_own_drafts`. Returns a 401/403 Response if not, or null
* if authorized. See {@link entryEditAccess} for what a draft-only grant requires
* of the caller.
*/
function requireEntryEditPerm(user, entry) {
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	if (!entryEditAccess(user, entry)) return apiError("FORBIDDEN", "Insufficient permissions", 403);
	return null;
}
/**
* Like {@link requirePerm}, but authorized when the user has any of
* `permissions`.
*/
function requireAnyPerm(user, permissions) {
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	if (!permissions.some((permission) => hasPermission(user, permission))) return apiError("FORBIDDEN", "Insufficient permissions", 403);
	return null;
}
export { requireOwnerPerm as a, requireEntryEditPerm as i, entryEditAccess as n, requirePerm as o, requireAnyPerm as r, canReadMediaUsageCount as t };
