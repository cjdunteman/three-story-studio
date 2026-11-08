import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, i as requireDb, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { s as handleBylineFieldUsage } from "./byline-fields-D6KYsEa7_XYbp3npz.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage.mjs
var usage_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "schema:read");
	if (denied) return denied;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const slug = params.slug;
	if (!slug) return apiError("MISSING_PARAM", "Field slug is required", 400);
	return unwrapResult(await handleBylineFieldUsage(emdash.db, slug));
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/byline-fields/_slug_/usage@_@mjs
var page = () => usage_exports;
export { page };
