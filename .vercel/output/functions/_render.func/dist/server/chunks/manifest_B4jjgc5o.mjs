import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { n as VERSION, t as COMMIT } from "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as getAuthMode } from "./mode-C-D3qICy_nfvaj2sm.mjs";
// node_modules/emdash/dist/astro/routes/api/manifest.mjs
var manifest_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	try {
		const emdashManifest = emdash ? await emdash.getManifest() : null;
		const authMode = getAuthMode(emdash?.config);
		const providerManagedName = authMode.type === "external" && !(typeof authMode.config === "object" && authMode.config !== null && "syncName" in authMode.config && authMode.config.syncName === false);
		let adminBranding = emdash?.config?.admin;
		let siteTimezone = "UTC";
		if (emdash?.db) try {
			const titles = await new OptionsRepository(emdash.db).getMany([
				"site:title",
				"emdash:site_title",
				"site:timezone"
			]);
			const siteTitle = titles.get("site:title") || titles.get("emdash:site_title");
			siteTimezone = titles.get("site:timezone") || "UTC";
			if (!adminBranding?.siteName && siteTitle) adminBranding = {
				...adminBranding,
				siteName: siteTitle
			};
		} catch {}
		let signupEnabled = false;
		if (emdash?.db && authMode.type === "passkey") try {
			const { sql } = await import("kysely");
			const result = await sql`
					SELECT COUNT(*) as cnt FROM allowed_domains WHERE enabled = 1
				`.execute(emdash.db);
			signupEnabled = Number(result.rows[0]?.cnt ?? 0) > 0;
		} catch {}
		return apiSuccess(emdashManifest ? {
			...emdashManifest,
			timezone: siteTimezone,
			authMode: authMode.type === "external" ? authMode.providerType : "passkey",
			providerManagedName,
			signupEnabled,
			admin: adminBranding
		} : {
			version: VERSION,
			commit: COMMIT,
			hash: "default",
			collections: {},
			plugins: {},
			timezone: siteTimezone,
			taxonomies: [],
			authMode: "passkey",
			providerManagedName,
			signupEnabled,
			admin: adminBranding
		});
	} catch (error) {
		return handleError(error, "Failed to build manifest", "MANIFEST_BUILD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/manifest@_@mjs
var page = () => manifest_exports;
export { page };
