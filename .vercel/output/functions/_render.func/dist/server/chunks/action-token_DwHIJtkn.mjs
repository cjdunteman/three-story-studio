import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./tokens-BnhSnGwJ_CaIsDsD0.mjs";
import { n as generateVisualEditingActionToken, r as verifyVisualEditingActionToken, t as VISUAL_ACTION_TOKEN_INVALID } from "./action-token-SK8zyN7w_CyZLcLzD.mjs";
// node_modules/emdash/dist/astro/routes/api/visual-editing/action-token.mjs
var action_token_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals, request }) => {
	const { emdash, user } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const token = request.headers.get("x-emdash-visual-action");
	if (!token) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is required", 403);
	const { previewSecret } = await resolveSecretsCached(emdash.db);
	if (!await verifyVisualEditingActionToken(token, previewSecret, user.id)) return apiError(VISUAL_ACTION_TOKEN_INVALID, "Visual editing action token is invalid or expired", 403);
	return apiSuccess({ token: await generateVisualEditingActionToken(previewSecret, user.id) });
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/visual-editing/action-token@_@mjs
var page = () => action_token_exports;
export { page };
