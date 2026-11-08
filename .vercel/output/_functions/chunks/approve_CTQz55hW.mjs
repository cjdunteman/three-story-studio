import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./media-DepNLhPq_BjGTGeEe.mjs";
import "./audit-B8XE-0UV_BpitiP8H.mjs";
import "./byline-registry-BhzpO41z_BKQLJtvw.mjs";
import "./byline-DHJS-GGb_D9_UHvtn.mjs";
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
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { a as unwrapResult, i as requireDb, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { r as handleApprovalDecide } from "./transfer-DTGblAj2_HG67WowM.mjs";
import "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import "./keys-CifIkT0N_Cq2A0wmZ.mjs";
import "./plan-CCoqxNoU_DAWLQxcP.mjs";
import "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import "./stage-CZQnXM_G_B-A2wGAk.mjs";
import { r as requireAnyPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/approvals/_id_/approve.mjs
var prerender = false;
var POST = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	if (!user) return apiError("UNAUTHORIZED", "Authentication required", 401);
	const denied = requireAnyPerm(user, ["transfer:export", "transfer:import"]);
	if (denied) return denied;
	if (locals.tokenScopes !== void 0) return apiError("FORBIDDEN", "Transfer approvals require a signed-in session", 403);
	return unwrapResult(await handleApprovalDecide(emdash.db, {
		approvalId: params.id ?? "",
		decision: "approve",
		user
	}));
};
export { POST, prerender };
