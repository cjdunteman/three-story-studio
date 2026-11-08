import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as UserRepository } from "./user-By8SzQxS_D4eC0D6b.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { t as authMeActionBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/me.mjs
var me_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ locals }) => {
	const { user, emdash } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	let userData = user.data;
	if (locals.__playgroundDb) {
		if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
		try {
			const persistedUser = await new UserRepository(emdash.db).findById(user.id);
			if (persistedUser) userData = persistedUser.data;
		} catch (error) {
			return handleError(error, "Failed to fetch current user", "CURRENT_USER_ERROR");
		}
	}
	const isFirstLogin = !userData?.welcomeDismissed;
	return apiSuccess({
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		avatarUrl: user.avatarUrl,
		isFirstLogin
	});
};
/**
* POST /_emdash/api/auth/me
*
* Mark that the user has seen the welcome modal.
*/
var POST = async ({ request, locals }) => {
	const { user, emdash } = locals;
	if (!user) return apiError("NOT_AUTHENTICATED", "Not authenticated", 401);
	if (!emdash) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const body = await parseBody(request, authMeActionBody);
	if (isParseError(body)) return body;
	if (body.action === "dismissWelcome") try {
		await new UserRepository(emdash.db).update(user.id, { data: {
			...user.data,
			welcomeDismissed: true
		} });
		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to dismiss welcome", "WELCOME_DISMISS_ERROR");
	}
	return apiError("UNKNOWN_ACTION", "Unknown action", 400);
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/me@_@mjs
var page = () => me_exports;
export { page };
