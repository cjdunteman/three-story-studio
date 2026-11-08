import { h as portableIdSchema, i as RECORD_KINDS } from "./kinds-B_Qcl5pz_DFnbzwyn.mjs";
import "./approvals-DTtYSB27_Fdi8vIG0.mjs";
import { z } from "zod";
// node_modules/emdash/dist/transformations-Bx4lYY0Y.mjs
/**
* Declared transformations: every way the target state may legitimately
* differ from the package's records.
*
* Two families exist:
* - Export transformations are applied by the exporter and declared in
*   `manifest.transformations` (the package already reflects them).
* - Import transformations are decided during analysis, declared in the plan
*   (and therefore covered by the plan digest), applied by the importer, and
*   predicted by verification with {@link applyTransformations}.
*
* A plan lists the package's export transformations ahead of its import
* transformations, so it declares every difference from the origin site.
* Plan warnings never repeat a transformation.
*
* Storage-key placeholders are not a transformation: verification converts
* target keys back to placeholders with `rewriteMediaRefs(…, { mode: "verify" })`.
*/
var EXPORT_TRANSFORMATION_CODES = [
	"soft_orphan_dropped",
	"avatar_nulled",
	"redirect_duplicate_dropped",
	"media_not_ready_dropped",
	"media_url_relativized",
	"orphan_dropped",
	"orphan_reference_nulled",
	"media_ref_unlinked",
	"unknown_storage_key"
];
var IMPORT_TRANSFORMATION_CODES = [
	"principal_mapped",
	"principal_unmapped",
	"seeded_scaffold_removed",
	"redirect_loop_disabled",
	"search_unsupported",
	"float4_rounded",
	"locale_recased"
];
var recordKindSchema = z.enum(RECORD_KINDS);
var count = z.number().int().nonnegative();
var MAX_LISTED_IDS = 1e4;
var MAX_LISTED_LOCALES = 1e3;
var localeSchema = z.string().min(1).max(64);
/**
* Declared in `manifest.transformations`, sorted by `(code, kind)`.
* `unknown_storage_key` counts records that refer to a media file URL or
* storage key the origin media table does not know; those references are
* exported unchanged and will not resolve on the target.
*/
var exportTransformationSchema = z.strictObject({
	code: z.enum(EXPORT_TRANSFORMATION_CODES),
	kind: recordKindSchema,
	count
});
var importTransformationSchema = z.discriminatedUnion("code", [
	z.strictObject({
		code: z.literal("principal_mapped"),
		count
	}),
	z.strictObject({
		code: z.literal("principal_unmapped"),
		count
	}),
	z.strictObject({
		code: z.literal("seeded_scaffold_removed"),
		count,
		items: z.array(z.strictObject({
			type: z.string().max(64),
			id: portableIdSchema
		})).max(MAX_LISTED_IDS)
	}),
	z.strictObject({
		code: z.literal("redirect_loop_disabled"),
		kind: z.literal("redirect"),
		ids: z.array(portableIdSchema).max(MAX_LISTED_IDS)
	}),
	z.strictObject({
		code: z.literal("search_unsupported"),
		kind: z.literal("collection"),
		ids: z.array(portableIdSchema).max(MAX_LISTED_IDS)
	}),
	z.strictObject({
		code: z.literal("float4_rounded"),
		count
	}),
	z.strictObject({
		code: z.literal("locale_recased"),
		locales: z.array(z.strictObject({
			from: localeSchema,
			to: localeSchema
		})).max(MAX_LISTED_LOCALES)
	})
]);
var planTransformationSchema = z.union([exportTransformationSchema, importTransformationSchema]);
var compiled = /* @__PURE__ */ new WeakMap();
function compile(plan, context) {
	const cached = compiled.get(plan);
	if (cached && cached.fieldColumnTypes === context.fieldColumnTypes) return cached;
	const disabledRedirects = /* @__PURE__ */ new Set();
	const searchDisabled = /* @__PURE__ */ new Set();
	const locales = /* @__PURE__ */ new Map();
	let float4 = false;
	for (const transformation of plan.transformations) switch (transformation.code) {
		case "redirect_loop_disabled":
			for (const id of transformation.ids) disabledRedirects.add(id);
			break;
		case "search_unsupported":
			for (const id of transformation.ids) searchDisabled.add(id);
			break;
		case "float4_rounded":
			float4 = true;
			break;
		case "locale_recased": for (const { from, to } of transformation.locales) locales.set(from, to);
	}
	const result = {
		principalMappings: plan.decisions.principalMappings,
		disabledRedirects,
		searchDisabled,
		float4,
		locales,
		fieldColumnTypes: context.fieldColumnTypes
	};
	compiled.set(plan, result);
	return result;
}
function mapPrincipal(record, property, mappings) {
	const principal = record[property];
	if (typeof principal !== "string") return;
	const target = Object.hasOwn(mappings, principal) ? mappings[principal] : null;
	if (target === null || target === void 0) delete record[property];
	else record[property] = target;
}
function fround(value) {
	return typeof value === "number" ? Math.fround(value) : value;
}
/**
* Predict the target form of a package record: the record as the exporter's
* reader would produce it from the target, minus storage-key placeholder
* resolution. Returns a new object; never mutates `record`. `principal`
* records are returned unchanged (they are never written to the target).
*/
function applyTransformations(record, plan, context) {
	const rules = compile(plan, context);
	const next = { ...record };
	switch (record.kind) {
		case "media":
			mapPrincipal(next, "authorPrincipal", rules.principalMappings);
			if (rules.float4) {
				if (next.focalX !== void 0) next.focalX = fround(next.focalX);
				if (next.focalY !== void 0) next.focalY = fround(next.focalY);
			}
			break;
		case "revision":
		case "comment":
			mapPrincipal(next, "authorPrincipal", rules.principalMappings);
			break;
		case "byline":
			mapPrincipal(next, "userPrincipal", rules.principalMappings);
			break;
		case "entry":
			mapPrincipal(next, "authorPrincipal", rules.principalMappings);
			if (rules.float4) {
				const fields = { ...record.fields };
				const types = rules.fieldColumnTypes.get(record.collection);
				for (const [slug, value] of Object.entries(fields)) if (types?.get(slug) === "REAL") fields[slug] = fround(value);
				next.fields = fields;
			}
			break;
		case "redirect":
			if (rules.disabledRedirects.has(record.id)) next.enabled = false;
			break;
		case "collection": {
			const config = record.searchConfig;
			if (rules.searchDisabled.has(record.id) && config !== null && typeof config === "object" && !Array.isArray(config) && config.enabled === true) next.searchConfig = {
				...config,
				enabled: false
			};
			break;
		}
	}
	const recased = typeof next.locale === "string" ? rules.locales.get(next.locale) : void 0;
	if (recased !== void 0) next.locale = recased;
	return next;
}
// node_modules/emdash/dist/plan-CCoqxNoU.mjs
/**
* Import plans, decisions, and the warning/blocker vocabulary.
*
* Analysis produces a {@link SiteImportPlan} with default decisions; the
* caller may resubmit different decisions, which produces a new plan (and a
* new plan digest). Execution requires the exact `{ packageDigest,
* planDigest }` pair. The plan digest covers the whole plan object
* (see `format/digest.ts`).
*/
var PLAN_BLOCKER_CODES = [
	"package_invalid",
	"unsupported_format",
	"unsupported_feature",
	"limit_exceeded",
	"file_missing",
	"file_mismatch",
	"record_invalid",
	"record_count_mismatch",
	"record_order_invalid",
	"duplicate_id",
	"dangling_reference",
	"reference_cycle",
	"media_ref_invalid",
	"media_blob_missing",
	"media_blob_too_large",
	"target_not_empty",
	"locale_not_configured",
	"field_type_unknown",
	"principal_conflict",
	"integer_out_of_range",
	"value_constraint_violation",
	"unique_violation"
];
var PLAN_WARNING_CODES = [
	"media_row_missing",
	"media_provider_external",
	"soft_reference_dangling",
	"redirect_loops_unchecked",
	"issues_truncated"
];
var issueDetail = z.record(z.string().max(64), z.union([
	z.string().max(1024),
	z.number(),
	z.boolean(),
	z.null()
]));
function planIssueSchema(codes) {
	return z.strictObject({
		code: z.enum(codes),
		message: z.string().max(1024),
		kind: z.enum(RECORD_KINDS).optional(),
		id: portableIdSchema.optional(),
		count: z.number().int().nonnegative().optional(),
		detail: issueDetail.optional()
	});
}
var planBlockerSchema = planIssueSchema(PLAN_BLOCKER_CODES);
var planWarningSchema = planIssueSchema(PLAN_WARNING_CODES);
var SETTING_CHOICES = ["package", "target"];
var siteImportDecisionsSchema = z.strictObject({
	principalMappings: z.record(portableIdSchema, portableIdSchema.nullable()),
	siteTitle: z.enum(SETTING_CHOICES),
	siteTagline: z.enum(SETTING_CHOICES)
});
/** Decisions a caller may submit; omitted values keep the plan defaults. */
var siteImportDecisionsInputSchema = z.strictObject({
	principalMappings: z.record(portableIdSchema, portableIdSchema.nullable()).optional(),
	siteTitle: z.enum(SETTING_CHOICES).optional(),
	siteTagline: z.enum(SETTING_CHOICES).optional()
});
var planPrincipalSchema = z.strictObject({
	id: portableIdSchema,
	displayName: z.string().max(4096),
	email: z.string().max(4096).optional(),
	references: z.number().int().nonnegative(),
	suggestedUserId: portableIdSchema.optional()
});
var settingValueSummary = z.strictObject({
	package: z.string().max(4096).optional(),
	target: z.string().max(4096).optional()
});
var siteImportPlanSchema = z.strictObject({
	formatVersion: z.literal("1"),
	packageDigest: z.string().regex(/^sha256:[0-9a-f]{64}$/),
	origin: z.strictObject({
		siteId: portableIdSchema,
		packageId: portableIdSchema,
		createdAt: z.string().max(64),
		createdByEmDashVersion: z.string().max(128)
	}),
	target: z.strictObject({
		siteId: portableIdSchema,
		dialect: z.enum(["sqlite", "postgres"]),
		emdashVersion: z.string().max(128)
	}),
	counts: z.partialRecord(z.enum(RECORD_KINDS), z.number().int().nonnegative()),
	bytes: z.strictObject({
		records: z.number().int().nonnegative(),
		media: z.number().int().nonnegative()
	}),
	principals: z.array(planPrincipalSchema),
	settings: z.strictObject({
		title: settingValueSummary,
		tagline: settingValueSummary
	}),
	decisions: siteImportDecisionsSchema,
	transformations: z.array(planTransformationSchema),
	warnings: z.array(planWarningSchema),
	blockers: z.array(planBlockerSchema),
	estimatedSteps: z.number().int().nonnegative()
});
/** Merge submitted decisions over a plan's defaults. Unknown principal ids are ignored. */
function mergeDecisions(defaults, input) {
	if (!input) return defaults;
	const principalMappings = { ...defaults.principalMappings };
	for (const [principalId, userId] of Object.entries(input.principalMappings ?? {})) if (Object.hasOwn(principalMappings, principalId)) principalMappings[principalId] = userId;
	return {
		principalMappings,
		siteTitle: input.siteTitle ?? defaults.siteTitle,
		siteTagline: input.siteTagline ?? defaults.siteTagline
	};
}
function isPlanExecutable(plan) {
	return plan.blockers.length === 0;
}
export { siteImportDecisionsInputSchema as a, IMPORT_TRANSFORMATION_CODES as c, planWarningSchema as i, applyTransformations as l, mergeDecisions as n, siteImportPlanSchema as o, planBlockerSchema as r, EXPORT_TRANSFORMATION_CODES as s, isPlanExecutable as t, exportTransformationSchema as u };
