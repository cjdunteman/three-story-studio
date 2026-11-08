import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./manifest-schema-DNb4XmTS_BtxTt78k.mjs";
import { i as fetchWithinOrigin, t as MarketplaceError } from "./marketplace-CqbgeIa7_JO1MG6HV.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon.mjs
var icon_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, url, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;
	const marketplaceUrl = emdash.config.marketplace;
	if (!marketplaceUrl || !id) return apiError("NOT_CONFIGURED", "Marketplace not configured", 400);
	const width = url.searchParams.get("w");
	const target = new URL(`/api/v1/plugins/${encodeURIComponent(id)}/icon`, marketplaceUrl);
	if (width) target.searchParams.set("w", width);
	try {
		const resp = await fetchWithinOrigin(target.href, "Icon fetch", "PROXY");
		if (!resp.ok) return new Response(resp.body, {
			status: resp.status,
			headers: {
				"Content-Type": resp.headers.get("Content-Type") ?? "application/octet-stream",
				"Cache-Control": "private, no-store"
			}
		});
		return new Response(resp.body, { headers: {
			"Content-Type": resp.headers.get("Content-Type") ?? "image/png",
			"Cache-Control": "private, no-store"
		} });
	} catch (error) {
		if (error instanceof MarketplaceError && error.code) return apiError(error.code, "Icon redirect was not followed", 502);
		return apiError("PROXY_ERROR", "Failed to fetch icon", 502);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/marketplace/_id_/icon@_@mjs
var page = () => icon_exports;
export { page };
