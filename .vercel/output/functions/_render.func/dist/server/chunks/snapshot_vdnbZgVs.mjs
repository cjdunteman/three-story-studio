import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import { i as resolveSecretsCached } from "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { r as getPublicOrigin } from "./public-url-Bt98vysr_DeAQKu3O.mjs";
import { n as parsePreviewSignatureHeader, r as verifyPreviewSignature, t as generateSnapshot } from "./snapshot-BjaXDZQ5_Dup_vZ0x.mjs";
import { n as resolveSessionUser } from "./session-user-DiE4JKPP_DXJYGG4m.mjs";
import { o as requirePerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
// node_modules/emdash/dist/astro/routes/api/snapshot.mjs
var snapshot_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request, locals, url, session }) => {
	const { emdash } = locals;
	let user = locals.user;
	if (!user && session && emdash?.db) try {
		const { createKyselyAdapter } = await import("./kysely_JbPAu9XA.mjs");
		const sessionUser = await resolveSessionUser(session);
		if (sessionUser?.id) {
			const resolved = await createKyselyAdapter(emdash.db).getUserById(sessionUser.id);
			if (resolved && !resolved.disabled) user = resolved;
		}
	} catch {}
	if (!emdash?.db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const previewSig = request.headers.get("X-Preview-Signature");
	let authorized = false;
	if (previewSig) {
		const { previewSecret: secret, previewSecretSource } = await resolveSecretsCached(emdash.db);
		const parsed = parsePreviewSignatureHeader(previewSig);
		if (!parsed) console.warn("[snapshot] Failed to parse X-Preview-Signature header");
		else {
			authorized = await verifyPreviewSignature(parsed.source, parsed.exp, parsed.sig, secret);
			if (!authorized) {
				const fields = {
					source: parsed.source,
					exp: parsed.exp,
					expired: parsed.exp < Date.now() / 1e3,
					secretSource: previewSecretSource
				};
				if (previewSecretSource === "db") fields.hint = "Set EMDASH_PREVIEW_SECRET in both this process and the signing process to share secrets across deployments";
				console.warn("[snapshot] Preview signature verification failed", fields);
			}
		}
	}
	if (!authorized) {
		const contentDenied = requirePerm(user, "content:read");
		if (contentDenied) return contentDenied;
		const schemaDenied = requirePerm(user, "schema:read");
		if (schemaDenied) return schemaDenied;
	}
	try {
		const includeDrafts = !authorized && url.searchParams.get("drafts") === "true";
		return apiSuccess(await generateSnapshot(emdash.db, {
			includeDrafts,
			origin: getPublicOrigin(url, emdash.config)
		}));
	} catch (error) {
		return handleError(error, "Failed to generate snapshot", "SNAPSHOT_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/snapshot@_@mjs
var page = () => snapshot_exports;
export { page };
