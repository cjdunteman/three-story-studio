import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { i as VALID_SCOPES } from "./passkey_CpIENnGH.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { t as config_default } from "./config_BfRzcu_C.mjs";
// node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource.mjs
var oauth_protected_resource_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const origin = getPublicOrigin(url, locals.emdash?.config ?? config_default);
	return Response.json({
		resource: `${origin}/_emdash/api/mcp`,
		authorization_servers: [`${origin}/_emdash`],
		scopes_supported: [...VALID_SCOPES],
		bearer_methods_supported: ["header"]
	}, { headers: {
		"Cache-Control": "public, max-age=3600",
		"Access-Control-Allow-Origin": "*"
	} });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/well-known/oauth-protected-resource@_@mjs
var page = () => oauth_protected_resource_exports;
export { page };
