// node_modules/emdash/dist/install-finalization-RU6VrHOX.mjs
async function finalizePluginInstall(options) {
	try {
		await options.syncRuntime();
		await options.runLifecycle();
	} catch (installError) {
		const failures = [installError];
		try {
			const rollback = await options.rollback();
			if (!rollback.success) failures.push(new Error(rollback.error.message));
		} catch (rollbackError) {
			failures.push(rollbackError);
		}
		try {
			await options.syncRuntime();
		} catch (syncError) {
			failures.push(syncError);
		}
		if (failures.length > 1) {
			const rollbackError = new Error(`Plugin ${options.pluginId} installation failed and rollback did not complete`, { cause: installError });
			Object.defineProperty(rollbackError, "errors", { value: failures });
			throw rollbackError;
		}
		throw installError;
	}
}
async function finalizePluginUpdate(options) {
	try {
		await options.syncRuntime();
		await options.runLifecycle();
	} catch (updateError) {
		const failures = [updateError];
		let rollbackSucceeded = false;
		try {
			const rollback = await options.rollback();
			rollbackSucceeded = rollback.success;
			if (!rollback.success) failures.push(new Error(rollback.error.message));
		} catch (rollbackError) {
			failures.push(rollbackError);
		}
		try {
			await options.syncRuntime();
			if (rollbackSucceeded) await options.runRollbackLifecycle();
		} catch (syncError) {
			failures.push(syncError);
		}
		if (failures.length > 1) {
			const rollbackError = new Error(`Plugin ${options.pluginId} update failed and rollback did not complete`, { cause: updateError });
			Object.defineProperty(rollbackError, "errors", { value: failures });
			throw rollbackError;
		}
		throw updateError;
	}
}
export { finalizePluginUpdate as n, finalizePluginInstall as t };
