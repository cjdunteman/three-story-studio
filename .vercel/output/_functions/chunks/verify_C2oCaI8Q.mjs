import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as roleFromLevel } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { a as SignupError, b as validateSignupToken } from "./dist_BZHQodRU.mjs";
import { t as createKyselyAdapter } from "./kysely_DZ9NNnjR.mjs";
// node_modules/emdash/dist/astro/routes/api/auth/signup/verify.mjs
var verify_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const token = url.searchParams.get("token");
	if (!token) return apiError("MISSING_PARAM", "Token is required", 400);
	try {
		const result = await validateSignupToken(createKyselyAdapter(emdash.db), token);
		return apiSuccess({
			success: true,
			email: result.email,
			role: result.role,
			roleName: roleFromLevel(result.role)
		});
	} catch (error) {
		if (error instanceof SignupError) return apiError(error.code.toUpperCase(), error.message, {
			invalid_token: 404,
			token_expired: 410,
			user_exists: 409,
			domain_not_allowed: 403
		}[error.code] ?? 400);
		return handleError(error, "Failed to validate signup token", "SIGNUP_VERIFY_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/auth/signup/verify@_@mjs
var page = () => verify_exports;
export { page };
