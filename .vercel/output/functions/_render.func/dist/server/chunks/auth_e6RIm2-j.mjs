import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { t as getAuthMode } from "./mode-C-D3qICy_nfvaj2sm.mjs";
// node_modules/emdash/dist/astro/routes/api/well-known/auth.mjs
var auth_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash } = locals;
	const config = emdash?.config;
	const authMode = config ? getAuthMode(config) : null;
	const isExternal = authMode?.type === "external";
	let siteName = "EmDash";
	if (emdash?.db) try {
		siteName = await new OptionsRepository(emdash.db).get("emdash:site_title") || "EmDash";
	} catch {}
	const response = {
		instance: {
			name: siteName,
			version: "0.1.0"
		},
		auth: {
			mode: isExternal ? "external" : "passkey",
			...isExternal && authMode.type === "external" ? { external_provider: authMode.entrypoint } : {},
			methods: {
				device_flow: !isExternal ? {
					client_id: "emdash-cli",
					device_authorization_endpoint: "/_emdash/api/oauth/device/code",
					token_endpoint: "/_emdash/api/oauth/device/token"
				} : void 0,
				authorization_code: !isExternal ? {
					authorization_endpoint: "/_emdash/oauth/authorize",
					token_endpoint: "/_emdash/api/oauth/token"
				} : void 0,
				api_tokens: true
			}
		}
	};
	return Response.json(response, { headers: { "Cache-Control": "no-store" } });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/auth@_@mjs
var page = () => auth_exports;
export { page };
