import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { t as ContentRepository } from "./content-BKHUVsE5_DfQPTkn2.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as chunks } from "./chunks-DiW8VMwz_VV2y92kU.mjs";
import "./slugify-BDEG9pLk_DVZhi-fy.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { t as TaxonomyRepository } from "./taxonomy-CMI5fczd_DYcrkAQn.mjs";
import "./resolve-DdNXBJSr_RO5X_pmi.mjs";
import { r as taxonomyTag } from "./chrome-tags-BIKBMZYO_BD7mldlb.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./collection-slugs-cache-DIrLjqH-_CMSyWs47.mjs";
import { f as invalidateTermCache } from "./taxonomies-B__VmCKQ_B0KbW8BP.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import "./settings-Dd1uivmQ_8f9uEka3.mjs";
import "./site-settings-DRHfX7bq_BNGJ-4Xq.mjs";
import { i as requireDb, n as apiSuccess, r as handleError, t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
import { n as parseBody, t as isParseError } from "./parse-B_b6gZxG_Bn1jZ3l7.mjs";
import "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { j as contentTermsBody } from "./entry-lock-CRVmruM0_6CQdq_uc.mjs";
import "./comments-yiRFx3w5_D_KnyClv.mjs";
import "./byline-fields-CiR8FvvF_C1YDvZd8.mjs";
import "./schemas_Ct6e_W-S.mjs";
import { i as requireEntryEditPerm, o as requirePerm, r as requireAnyPerm } from "./authorize-NJgp8kLI_CP_Uj0OQ.mjs";
import { t as invalidateRouteCache } from "./route-cache-QSOyDEw0_6FNnFER9.mjs";
import { h as hasPermission } from "./dist_BZHQodRU.mjs";
// node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_.mjs
var _taxonomy__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var MAX_CACHE_PURGE_TAGS = 100;
function assignmentResponse(assignments, entryLocale) {
	const config = getI18nConfig();
	const defaultLocale = config?.defaultLocale ?? "en";
	return {
		terms: assignments.flatMap(({ term }) => term ? [{
			id: term.id,
			name: term.name,
			slug: term.slug,
			label: term.label,
			parentId: term.parentId,
			locale: term.locale,
			translationGroup: term.translationGroup
		}] : []),
		unresolved: assignments.filter(({ term }) => term === null).map(({ translationGroup, availableLocales, translations }) => ({
			translationGroup,
			availableLocales,
			translations
		})),
		entryLocale,
		defaultLocale,
		implicitDefaultLocale: config === null
	};
}
/**
* Get terms assigned to an entry
*/
var GET = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requirePerm(user, "content:read");
	if (denied) return denied;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	try {
		const entry = await new ContentRepository(emdash.db).findByIdOrSlug(collection, id);
		if (!entry || entry.status !== "published" && !hasPermission(user, "content:read_drafts")) return apiError("NOT_FOUND", "Content not found", 404);
		const locale = entry.locale || getI18nConfig()?.defaultLocale || "en";
		const defaultLocale = getI18nConfig()?.defaultLocale ?? "en";
		return apiSuccess(assignmentResponse(await new TaxonomyRepository(emdash.db).getTermAssignmentsForEntry(collection, entry.id, taxonomy, locale, defaultLocale), locale));
	} catch (error) {
		return handleError(error, "Failed to get entry terms", "TERMS_GET_ERROR");
	}
};
/**
* Set terms for an entry (replaces existing)
*/
var POST = async ({ params, request, locals, cache }) => {
	const { emdash, user } = locals;
	const { collection, id, taxonomy } = params;
	if (!collection || !id || !taxonomy) return apiError("VALIDATION_ERROR", "Collection, id, and taxonomy required", 400);
	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;
	const denied = requireAnyPerm(user, ["content:edit_own", "content:edit_own_drafts"]);
	if (denied) return denied;
	if (!emdash.handleContentGet) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	const existing = await emdash.handleContentGet(collection, id);
	if (!existing.success) return apiError(existing.error?.code ?? "NOT_FOUND", existing.error?.message ?? "Content not found", existing.error?.code === "NOT_FOUND" ? 404 : 500);
	const existingData = existing.data && typeof existing.data === "object" ? existing.data : void 0;
	const existingItem = existingData?.item && typeof existingData.item === "object" ? existingData.item : existingData;
	const editDenied = requireEntryEditPerm(user, {
		authorId: typeof existingItem?.authorId === "string" ? existingItem.authorId : "",
		status: existingItem?.status
	});
	if (editDenied) return editDenied;
	const canonicalId = typeof existingItem?.id === "string" ? existingItem.id : id;
	const entryLocale = typeof existingItem?.locale === "string" ? existingItem.locale : getI18nConfig()?.defaultLocale ?? "en";
	try {
		const body = await parseBody(request, contentTermsBody);
		if (isParseError(body)) return body;
		const { termIds } = body;
		const repo = new TaxonomyRepository(emdash.db);
		for (const termId of termIds) {
			const term = await repo.findById(termId);
			if (!term) return apiError("NOT_FOUND", `Term ID '${termId}' not found`, 404);
			if (term.name !== taxonomy) return apiError("VALIDATION_ERROR", `Term ID '${termId}' does not belong to taxonomy '${taxonomy}'`, 400);
		}
		await repo.setTermsForEntry(collection, canonicalId, taxonomy, termIds);
		invalidateTermCache();
		if (cache?.enabled) {
			const translationGroup = existingItem?.translationGroup;
			const siblingIds = typeof translationGroup === "string" ? await new ContentRepository(emdash.db).findTranslationIds(collection, translationGroup) : [];
			const tags = [
				collection,
				.../* @__PURE__ */ new Set([canonicalId, ...siblingIds]),
				taxonomyTag(taxonomy)
			];
			for (const tagBatch of chunks(tags, MAX_CACHE_PURGE_TAGS)) await invalidateRouteCache(cache, tagBatch);
		}
		return apiSuccess(assignmentResponse(await repo.getTermAssignmentsForEntry(collection, canonicalId, taxonomy, entryLocale, getI18nConfig()?.defaultLocale ?? "en"), entryLocale));
	} catch (error) {
		return handleError(error, "Failed to set entry terms", "TERMS_SET_ERROR");
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/content/_collection_/_id_/terms/_taxonomy_@_@mjs
var page = () => _taxonomy__exports;
export { page };
