import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import { r as resolveAndValidateExternalUrl, t as SsrfError } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { S as wpPluginAnalyzeBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { c as getSource, t as SiteChallengeError } from "./import-yVbfPyfd_CInIQiy6.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import "./dist_D1airXGO.mjs";
// node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze.mjs
var analyze_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;
	try {
		const body = await parseBody(request, wpPluginAnalyzeBody);
		if (isParseError(body)) return body;
		try {
			await resolveAndValidateExternalUrl(body.url);
		} catch (e) {
			return apiError("SSRF_BLOCKED", e instanceof SsrfError ? e.message : "Invalid URL", 400);
		}
		const source = getSource("wordpress-plugin");
		if (!source) return apiError("NOT_CONFIGURED", "WordPress plugin source not available", 500);
		const existingCollections = await fetchExistingCollections(emdash?.db);
		return apiSuccess({
			success: true,
			analysis: await source.analyze({
				type: "url",
				url: body.url,
				token: body.token
			}, {
				db: emdash?.db,
				getExistingCollections: async () => existingCollections
			})
		});
	} catch (error) {
		if (error instanceof SiteChallengeError) return apiError("WP_SITE_CHALLENGE", error.message, 502);
		return handleError(error, "Failed to analyze WordPress site", "WP_PLUGIN_ANALYZE_ERROR");
	}
};
/** Fetch collections and their fields from schema registry */
async function fetchExistingCollections(db) {
	const result = /* @__PURE__ */ new Map();
	if (!db) return result;
	try {
		const registry = new SchemaRegistry(db);
		const collections = await registry.listCollections();
		for (const collection of collections) {
			const fields = await registry.listFields(collection.id);
			const fieldMap = /* @__PURE__ */ new Map();
			for (const field of fields) fieldMap.set(field.slug, { type: field.type });
			result.set(collection.slug, {
				slug: collection.slug,
				fields: fieldMap
			});
		}
	} catch (error) {
		console.warn("Could not fetch schema registry:", error);
	}
	return result;
}
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/import/wordpress-plugin/analyze@_@mjs
var page = () => analyze_exports;
export { page };
