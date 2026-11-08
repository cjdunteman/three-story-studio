import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { t as getAuthMode } from "./mode-C-D3qICy_nfvaj2sm.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/mode.mjs
var mode_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	const authMode = getAuthMode(emdash?.config);
	let signupEnabled = false;
	if (emdash?.db && authMode.type === "passkey") try {
		const { sql } = await import("kysely");
		const result = await sql`
				SELECT COUNT(*) as cnt FROM allowed_domains WHERE enabled = 1
			`.execute(emdash.db);
		signupEnabled = Number(result.rows[0]?.cnt ?? 0) > 0;
	} catch {}
	const providers = (emdash?.config?.authProviders ?? []).map((p) => ({
		id: p.id,
		label: p.label
	}));
	return apiSuccess({
		authMode: authMode.type === "external" ? authMode.providerType : "passkey",
		signupEnabled,
		providers
	});
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/mode@_@mjs
var page = () => mode_exports;
export { page };
