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
import "./user-By8SzQxS_D4eC0D6b.mjs";
import "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./comment-DB74Zpa4_Ce41HKnk.mjs";
import "./menus-B0Qqv_cS_yKxfszRW.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import "./redirect-DjLdw427_BDBqyEyI.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import "./byline-DHJS-GGb_D9_UHvtn.mjs";
import "./staged-ByBmPFtX_FQ60UOHq.mjs";
import { M as handleRegistryInstall } from "./api--PYoyeTo_B51u3ELz.mjs";
import "./cache-5DHbpEWu_CTsWW_zV.mjs";
import "./artifacts-Dvdp2KK-_D_x8kJT9.mjs";
import "./fts-manager-6861qcwk_6bKjovHG.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
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
import "./dashboard-ynr1qJWM_BCy26U8t.mjs";
import { r as getRegistryConfigInput } from "./config-DBU6iUQB_Bty3XG_e.mjs";
import { n as VERSION } from "./version-Bu6Nlbb5_BDBEYfZW.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./update-check-ABBJgg6M_Cz1yLTWZ.mjs";
import "./media-CikS-q6E_DwICdYDo.mjs";
import "./media-folders-CI0Wydfo_BhHIM6yh.mjs";
import "./content-repair-Ukdxoq-R_ntNtEF9u.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import "./media-usage-X1_20MY-_vcTBPz4d.mjs";
import "./media-usage-activation-bWusy3M2_UQZMHeM7.mjs";
import "./media-usage-work-B2RaoJIa_URCW5K2T.mjs";
import "./schema-B-3rntlX_DyyWZ5SC.mjs";
import "./block-types-BbOrfnWs_DYf7cHk6.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import "./sections-rSao6rBG_Z2fFqseI.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./settings--XlUdUaI_Q75SnPNm.mjs";
import "./taxonomies-5SR76j11_BpsROtKh.mjs";
import "./manifest-schema-DNb4XmTS_BtxTt78k.mjs";
import "./marketplace-CqbgeIa7_JO1MG6HV.mjs";
import "./types-sUHaH7lC_BupjCGRq.mjs";
import "./artifact-fetch-DIh7iyOV_BxFcsue5.mjs";
import "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { z } from "zod";
import { hostEnvFromVersions } from "@emdash-cms/registry-client/env";
// node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var verifyBodySchema = z.object({
	did: z.string().min(1).max(2048).regex(/^did:[a-z]+:/, "Invalid DID"),
	slug: z.string().min(1).max(64).regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid slug"),
	version: z.string().min(1).max(64).optional()
});
var POST = async ({ request, locals }) => {
	try {
		const { emdash, user } = locals;
		if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		const denied = requirePerm(user, "plugins:manage");
		if (denied) return denied;
		const body = await parseBody(request, verifyBodySchema);
		if (isParseError(body)) return body;
		const reservedPluginIds = /* @__PURE__ */ new Set([...emdash.configuredPlugins.map((plugin) => plugin.id), ...(emdash.config.sandboxed ?? []).map((plugin) => plugin.id)]);
		return unwrapResult(await handleRegistryInstall(emdash.db, emdash.storage, emdash.getSandboxRunner(), getRegistryConfigInput(emdash.config.registry), body, {
			configuredPluginIds: reservedPluginIds,
			hostEnv: hostEnvFromVersions(VERSION, emdash.config.astroVersion),
			verifyOnly: true
		}));
	} catch (error) {
		console.error("[registry-verify] Unhandled error:", error);
		return handleError(error, "Failed to verify registry plugin", "VERIFICATION_FAILED");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/plugins/registry/verify@_@mjs
var page = () => verify_exports;
export { page };
