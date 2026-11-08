import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./user-By8SzQxS_D4eC0D6b.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import { t as handleDashboardStats } from "./dashboard-ynr1qJWM_BCy26U8t.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/dashboard.mjs
var dashboard_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { emdash, user } = locals;
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		return unwrapResult(await handleDashboardStats(emdash.db, {
			includeDrafts: hasPermission(user, "content:read_drafts"),
			includeMediaCount: hasPermission(user, "media:read"),
			includeUserCount: hasPermission(user, "users:read")
		}));
	} catch (error) {
		return handleError(error, "Failed to load dashboard", "DASHBOARD_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/dashboard@_@mjs
var page = () => dashboard_exports;
export { page };
