import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as loadUserSeed } from "./load-D4xtzm6h_BOltS_BW.mjs";
import { t as getAuthMode } from "./mode-C-D3qICy_nfvaj2sm.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/status.mjs
var status_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		const setupComplete = await emdash.db.selectFrom("options").select("value").where("name", "=", "emdash:setup_complete").executeTakeFirst();
		const isComplete = setupComplete && (() => {
			try {
				const parsed = JSON.parse(setupComplete.value);
				return parsed === true || parsed === "true";
			} catch {
				return false;
			}
		})();
		let hasUsers = false;
		try {
			hasUsers = (await emdash.db.selectFrom("users").select((eb) => eb.fn.countAll().as("count")).executeTakeFirstOrThrow()).count > 0;
		} catch {}
		if (isComplete && hasUsers) return apiSuccess({ needsSetup: false });
		let step = "start";
		const setupState = await emdash.db.selectFrom("options").select("value").where("name", "=", "emdash:setup_state").executeTakeFirst();
		if (setupState) try {
			const state = JSON.parse(setupState.value);
			if (state.step === "admin") step = "admin";
			else if (state.step === "site") step = "site";
		} catch {}
		if (isComplete && !hasUsers) step = "admin";
		const authMode = getAuthMode(emdash.config);
		const useExternalAuth = authMode.type === "external";
		if (useExternalAuth && isComplete) return apiSuccess({ needsSetup: false });
		const seed = await loadUserSeed();
		const seedInfo = seed ? {
			name: seed.meta?.name || "Unknown Template",
			description: seed.meta?.description || "",
			collections: seed.collections?.length || 0,
			hasContent: !!(seed.content && Object.keys(seed.content).length > 0),
			title: seed.settings?.title,
			tagline: seed.settings?.tagline
		} : null;
		return apiSuccess({
			needsSetup: true,
			step,
			seedInfo,
			authMode: useExternalAuth ? authMode.providerType : "passkey"
		});
	} catch (error) {
		return handleError(error, "Failed to check setup status", "SETUP_STATUS_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/status@_@mjs
var page = () => status_exports;
export { page };
