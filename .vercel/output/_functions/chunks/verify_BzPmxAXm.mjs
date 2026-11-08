import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import { u as magicLinkVerifyBody } from "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { r as sessionUnavailableError } from "./session-user-DiE4JKPP_DXJYGG4m.mjs";
import { n as MagicLinkError, x as verifyMagicLink } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async ({ url, redirect }) => {
	const token = url.searchParams.get("token");
	if (!token) return redirect("/_emdash/admin/login?error=missing_token");
	const confirmUrl = new URLSearchParams({ token });
	const rawRedirect = url.searchParams.get("redirect");
	if (rawRedirect) confirmUrl.set("redirect", rawRedirect);
	return redirect(`/_emdash/admin/login/magic-link?${confirmUrl.toString()}`);
};
var POST = async ({ request, locals, session }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	if (!session) return sessionUnavailableError();
	try {
		const body = await parseBody(request, magicLinkVerifyBody);
		if (isParseError(body)) return body;
		const adapter = createKyselyAdapter(emdash.db);
		const user = await verifyMagicLink(adapter, body.token);
		after(async () => {
			try {
				await adapter.deleteExpiredTokens();
			} catch (error) {
				console.error("[magic-link] failed to delete expired tokens:", error);
			}
		});
		session.set("user", { id: user.id });
		return apiSuccess({ success: true });
	} catch (error) {
		if (error instanceof MagicLinkError) return apiError(error.code.toUpperCase(), error.message, {
			invalid_token: 400,
			token_expired: 410,
			user_not_found: 404,
			email_not_configured: 500
		}[error.code]);
		return handleError(error, "Failed to verify magic link", "MAGIC_LINK_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/magic-link/verify@_@mjs
var page = () => verify_exports;
export { page };
