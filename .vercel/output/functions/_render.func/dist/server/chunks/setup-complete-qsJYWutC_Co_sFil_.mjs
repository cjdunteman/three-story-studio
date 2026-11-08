import { u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import "./dist_BZHQodRU.mjs";
import { sql } from "kysely";
import { ulid } from "ulidx";
// node_modules/emdash/dist/setup-complete-qsJYWutC.mjs
/**
* Shared setup completion logic.
*
* Called by OAuth callbacks and the passkey verify step when the first user
* is created during setup. Persists site title/tagline from setup state
* and marks setup as complete.
*/
var FIRST_ADMIN_LOCK_KEY = 1168624764;
/**
* Create the first admin only while the users table is empty.
*
* Returns null when a user already exists, including one created by a
* concurrent call after the caller's own zero-users check. On Postgres the
* insert runs under an advisory lock, because `NOT EXISTS` alone doesn't see
* another transaction's uncommitted row under READ COMMITTED.
*/
async function createFirstAdmin(db, input) {
	const admin = {
		id: ulid(),
		email: input.email.toLowerCase(),
		name: input.name,
		role: Role.ADMIN
	};
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const insert = async (executor) => sql`
			INSERT INTO users (id, email, name, role, email_verified, created_at, updated_at)
			SELECT ${admin.id}, ${admin.email}, ${admin.name}, CAST(${admin.role} AS integer), 0, ${now}, ${now}
			WHERE NOT EXISTS (SELECT 1 FROM users)
			RETURNING id
		`.execute(executor);
	return (isPostgres(db) ? await db.transaction().execute(async (trx) => {
		await sql`SELECT pg_advisory_xact_lock(${FIRST_ADMIN_LOCK_KEY})`.execute(trx);
		return insert(trx);
	}) : await insert(db)).rows.length > 0 ? admin : null;
}
/**
* Finalize setup after the first admin user is created.
*
* Reads the setup_state option (written by the setup wizard's step 1),
* persists site_title and site_tagline, then marks setup complete.
*
* Safe to call multiple times — checks setup_complete first and no-ops
* if already done.
*/
async function finalizeSetup(db) {
	const options = new OptionsRepository(db);
	const setupComplete = await options.get("emdash:setup_complete");
	if (setupComplete === true || setupComplete === "true") return;
	const setupState = await options.get("emdash:setup_state");
	if (setupState?.title && typeof setupState.title === "string") await options.set("emdash:site_title", setupState.title);
	if (setupState?.tagline && typeof setupState.tagline === "string") await options.set("emdash:site_tagline", setupState.tagline);
	await options.set("emdash:setup_complete", true);
	await options.delete("emdash:setup_state");
}
export { finalizeSetup as n, createFirstAdmin as t };
