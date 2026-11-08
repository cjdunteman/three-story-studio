import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as unwrapResult, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
import { t as handleDomainProof } from "./site-domain-oRGS_JfA_1cPYEXHU.mjs";
// node_modules/emdash/dist/astro/routes/api/site/domain-proof.mjs
var domain_proof_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ locals }) => {
	const { emdash } = locals;
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	try {
		return unwrapResult(await handleDomainProof(emdash.db));
	} catch (error) {
		return handleError(error, "Failed to read domain proof", "DOMAIN_PROOF_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/site/domain-proof@_@mjs
var page = () => domain_proof_exports;
export { page };
