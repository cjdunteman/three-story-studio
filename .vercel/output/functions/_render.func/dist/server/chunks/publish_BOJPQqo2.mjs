import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./tokens-BnhSnGwJ_CaIsDsD0.mjs";
import { r as verifyVisualEditingActionToken, t as VISUAL_ACTION_TOKEN_INVALID } from "./action-token-SK8zyN7w_CyZLcLzD.mjs";
import "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import "./entry-lock-D-zJQ4q6_CsU00yNa.mjs";
import { t as publishContent } from "./publish_CTaj0P03.mjs";
// node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish.mjs
var publish_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async (context) => {
	const { emdash, user } = context.locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const token = context.request.headers.get("x-emdash-visual-action");
	if (!token) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is required", 403);
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	if (!await verifyVisualEditingActionToken(token, previewSecret, user.id)) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is invalid or expired", 403);
	return publishContent(context, "visual-editor");
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/content/_collection_/_id_/publish@_@mjs
var page = () => publish_exports;
export { page };
