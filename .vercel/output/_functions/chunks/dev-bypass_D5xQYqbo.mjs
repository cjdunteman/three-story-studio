import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./redirect-DjLdw427_BDBqyEyI.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import "./byline-DHJS-GGb_D9_UHvtn.mjs";
import "./staged-ByBmPFtX_FQ60UOHq.mjs";
import "./dist-BUmWMTbN_CDkCCJct.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./media-usage-work-BCK2J-v__DZ7M6B_e.mjs";
import "./activation-CGlyigmg_D6-z5nIo.mjs";
import "./registry-B0-O575m_BFXFyFwY.mjs";
import "./zod-generator--nlM0930_LkzcAVDd.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import "./digest-DJ1tHCgy_DETKHxQ5.mjs";
import "./block-values-Dg0-8PPS_DG_24WSy.mjs";
import "./query-LmPY2y0C_b7pVy27b.mjs";
import "./schema-BqBlUZtb_YfhNDbeT.mjs";
import "./relations-WIOojTL4_CqEbuQSZ.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./content-repair-Ukdxoq-R_ntNtEF9u.mjs";
import "./schema-B-3rntlX_DyyWZ5SC.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import "./apply-DVnupNeS_yiF4h5Cb.mjs";
import "./validate-Dz-TIOFB_DkPy7aTs.mjs";
import "./load-D4xtzm6h_BOltS_BW.mjs";
import "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import "./api-tokens-GNCsIegW_CkRWJi4k.mjs";
import "ulidx";
// node_modules/emdash/dist/astro/routes/api/setup/dev-bypass.mjs
var dev_bypass_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
async function handleDevBypass(context) {
	return apiError("FORBIDDEN", "Dev bypass is only available in development mode", 403);
}
var GET = handleDevBypass;
var POST = handleDevBypass;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/dev-bypass@_@mjs
var page = () => dev_bypass_exports;
export { page };
