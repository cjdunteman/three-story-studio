import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
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
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import "./schema-B-3rntlX_DyyWZ5SC.mjs";
import { u as setSiteSettings } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { v as setupBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { n as applySeedWithinBudget } from "./apply-DVnupNeS_yiF4h5Cb.mjs";
import { n as validateSeed } from "./validate-Dz-TIOFB_DkPy7aTs.mjs";
import { t as loadSeed } from "./load-D4xtzm6h_BOltS_BW.mjs";
import { t as getConfiguredOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { t as getAuthMode } from "./mode-C-D3qICy_nfvaj2sm.mjs";
// node_modules/emdash/dist/astro/routes/api/setup/index.mjs
var setup_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
/**
* What one setup request may spend on the seed before the rest continues in
* the next request. Cloudflare Workers Free allows 1,000 calls to D1, KV and R2
* and 50 external fetches per request. A `$media` download takes at least three
* fetches (two DNS-over-HTTPS lookups in `ssrfSafeFetch`, then the file) and
* three more per redirect. The margin covers a redirect per download, the entry
* that crosses the budget with its images, the phases after content and the
* object-cache writes at the end.
*/
var SEED_BUDGET_PER_REQUEST = {
	queries: 500,
	mediaDownloads: 5
};
var POST = async ({ request, url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		try {
			const setupComplete = await new OptionsRepository(emdash.db).get("emdash:setup_complete");
			if (setupComplete === true || setupComplete === "true") return apiError("ALREADY_CONFIGURED", "Setup has already been completed", 409);
		} catch {}
		const configuredSiteUrl = getConfiguredOrigin(emdash.config);
		url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname;
		const onCloudflareWorkers = typeof navigator !== "undefined" && typeof navigator.userAgent === "string" && navigator.userAgent.includes("Cloudflare-Workers");
		let requestOrigin;
		if (onCloudflareWorkers) requestOrigin = `https://${url.hostname}`;
		const siteUrl = configuredSiteUrl ?? requestOrigin;
		if (!siteUrl) return apiError("SITE_URL_REQUIRED", "Set siteUrl or EMDASH_SITE_URL before running production setup", 500);
		const body = await parseBody(request, setupBody);
		if (isParseError(body)) return body;
		const seed = await loadSeed();
		seed.settings = {
			...seed.settings,
			title: body.title,
			tagline: body.tagline
		};
		const validation = validateSeed(seed);
		if (!validation.valid) return apiError("INVALID_SEED", `Invalid seed file: ${validation.errors.join(", ")}`, 400);
		let seeded;
		try {
			seeded = await applySeedWithinBudget(emdash.db, seed, {
				includeContent: body.includeContent,
				onConflict: "skip",
				storage: emdash.storage ?? void 0
			}, SEED_BUDGET_PER_REQUEST);
		} catch (error) {
			return handleError(error, "Failed to apply seed", "SEED_ERROR");
		}
		const { result, complete: seedComplete, progress: seedProgress } = seeded;
		if (seedComplete) await setSiteSettings({
			title: body.title,
			tagline: body.tagline
		}, emdash.db);
		const useExternalAuth = getAuthMode(emdash.config).type === "external";
		try {
			const options = new OptionsRepository(emdash.db);
			await options.setIfAbsent("emdash:site_url", siteUrl);
			if (seedComplete) if (useExternalAuth) {
				await options.set("emdash:setup_complete", true);
				await options.set("emdash:site_title", body.title);
				if (body.tagline) await options.set("emdash:site_tagline", body.tagline);
			} else await options.set("emdash:setup_state", {
				step: "site_complete",
				title: body.title,
				tagline: body.tagline
			});
		} catch (error) {
			console.error("Failed to save setup state:", error);
		}
		if (!seedComplete) return apiSuccess({
			success: true,
			setupComplete: false,
			seedComplete: false,
			seedProgress,
			result
		});
		return apiSuccess({
			success: true,
			setupComplete: useExternalAuth,
			seedComplete: true,
			result
		});
	} catch (error) {
		return handleError(error, "Setup failed", "SETUP_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/setup/index@_@mjs
var page = () => setup_exports;
export { page };
