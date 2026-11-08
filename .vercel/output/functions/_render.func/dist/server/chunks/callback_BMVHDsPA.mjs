import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { i as encodeBase64 } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback.mjs
var callback_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, cookies, redirect }) => {
	const siteUrl = url.searchParams.get("site_url");
	const userLogin = url.searchParams.get("user_login");
	const password = url.searchParams.get("password");
	if (!siteUrl || !userLogin || !password) return redirect("/_emdash/admin/import/wordpress?error=auth_rejected");
	const token = encodeBase64(`${userLogin}:${password}`);
	const encodedAuth = encodeBase64(JSON.stringify({
		siteUrl,
		userLogin,
		token,
		timestamp: Date.now()
	}));
	cookies.set("emdash_wp_auth", encodedAuth, {
		path: "/_emdash/",
		maxAge: 300,
		httpOnly: false,
		secure: url.protocol === "https:",
		sameSite: "lax"
	});
	return redirect("/_emdash/admin/import/wordpress?auth=success");
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/callback@_@mjs
var page = () => callback_exports;
export { page };
