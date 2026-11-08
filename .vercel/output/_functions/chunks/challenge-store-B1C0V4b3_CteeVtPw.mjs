// node_modules/emdash/dist/challenge-store-B1C0V4b3.mjs
function createChallengeStore(db) {
	return {
		async set(challenge, data) {
			const expiresAt = new Date(data.expiresAt).toISOString();
			await db.insertInto("auth_challenges").values({
				challenge,
				type: data.type,
				user_id: data.userId ?? null,
				data: data.context ?? null,
				expires_at: expiresAt
			}).onConflict((oc) => oc.column("challenge").doUpdateSet({
				type: data.type,
				user_id: data.userId ?? null,
				data: data.context ?? null,
				expires_at: expiresAt
			})).execute();
		},
		async get(challenge) {
			const row = await db.selectFrom("auth_challenges").selectAll().where("challenge", "=", challenge).executeTakeFirst();
			if (!row) return null;
			const expiresAt = new Date(row.expires_at).getTime();
			if (expiresAt < Date.now()) {
				await this.delete(challenge);
				return null;
			}
			return {
				type: row.type === "registration" ? "registration" : "authentication",
				userId: row.user_id ?? void 0,
				expiresAt,
				...row.data === null ? {} : { context: row.data }
			};
		},
		async delete(challenge) {
			await db.deleteFrom("auth_challenges").where("challenge", "=", challenge).execute();
		}
	};
}
/**
* Clean up expired challenges.
* Should be called periodically (e.g., on startup, or via cron).
*/
async function cleanupExpiredChallenges(db) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const result = await db.deleteFrom("auth_challenges").where("expires_at", "<", now).executeTakeFirst();
	return Number(result.numDeletedRows ?? 0);
}
export { createChallengeStore as n, cleanupExpiredChallenges as t };
