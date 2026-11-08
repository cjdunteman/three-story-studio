// node_modules/emdash/dist/upload-attempts-DPFC4COv.mjs
async function removeUploadAttempt(storage, repo, storageKey, options = {}) {
	try {
		if (!await repo.claimUploadAttemptForCleanup(storageKey)) {
			if (await repo.hasUploadAttempt(storageKey) || !options.allowUntracked) return false;
		}
	} catch (error) {
		console.error("[media] upload cleanup claim failed:", error);
		return false;
	}
	try {
		await storage.delete(storageKey);
	} catch (error) {
		console.error("[media] upload cleanup failed:", error);
		try {
			await repo.deferUploadAttemptCleanup(storageKey);
		} catch (deferError) {
			console.error("[media] upload cleanup deferral failed:", deferError);
		}
		return false;
	}
	try {
		await repo.deleteUploadAttempt(storageKey);
	} catch (error) {
		console.error("[media] upload cleanup record deletion failed:", error);
	}
	return true;
}
export { removeUploadAttempt as t };
