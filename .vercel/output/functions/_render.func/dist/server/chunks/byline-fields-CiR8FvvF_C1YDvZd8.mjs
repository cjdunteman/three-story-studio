import { a as RESERVED_BYLINE_FIELD_SLUGS } from "./types-C_asjp1J_CfydHSXi.mjs";
import { E as roleLevel, m as httpUrl } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { z } from "zod";
// node_modules/emdash/dist/byline-fields-CiR8FvvF.mjs
var authenticatorTransport$1 = z.enum([
	"usb",
	"nfc",
	"ble",
	"internal",
	"hybrid"
]);
/** RegistrationResponse — sent by the browser after navigator.credentials.create() */
var registrationCredential$1 = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		attestationObject: z.string(),
		transports: z.array(authenticatorTransport$1).optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
/** AuthenticationResponse — sent by the browser after navigator.credentials.get() */
var authenticationCredential = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		authenticatorData: z.string(),
		signature: z.string(),
		userHandle: z.string().optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
var signupRequestBody = z.object({ email: z.email() }).meta({ id: "SignupRequestBody" });
var signupCompleteBody = z.object({
	token: z.string().min(1),
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "SignupCompleteBody" });
var inviteCreateBody = z.object({
	email: z.email(),
	role: roleLevel.optional()
}).meta({ id: "InviteCreateBody" });
var inviteRegisterOptionsBody = z.object({
	token: z.string().min(1),
	name: z.string().optional()
}).meta({ id: "InviteRegisterOptionsBody" });
var inviteCompleteBody = z.object({
	token: z.string().min(1),
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "InviteCompleteBody" });
var magicLinkSendBody = z.object({ email: z.email() }).meta({ id: "MagicLinkSendBody" });
var magicLinkVerifyBody = z.object({ token: z.string().min(1) }).meta({ id: "MagicLinkVerifyBody" });
var passkeyOptionsBody = z.object({ email: z.email().optional().describe("Ignored. Accepted for compatibility with older clients.") }).meta({ id: "PasskeyOptionsBody" });
var passkeyVerifyBody = z.object({ credential: authenticationCredential }).meta({ id: "PasskeyVerifyBody" });
var passkeyRegisterOptionsBody = z.object({ name: z.string().optional() }).meta({ id: "PasskeyRegisterOptionsBody" });
var passkeyRegisterVerifyBody = z.object({
	credential: registrationCredential$1,
	name: z.string().optional()
}).meta({ id: "PasskeyRegisterVerifyBody" });
var passkeyRenameBody = z.object({ name: z.string().min(1) }).meta({ id: "PasskeyRenameBody" });
var authMeActionBody = z.object({ action: z.string().min(1) }).meta({ id: "AuthMeActionBody" });
var importProbeBody = z.object({ url: httpUrl });
var wpPluginAnalyzeBody = z.object({
	url: httpUrl,
	token: z.string().min(1)
});
var wpPluginExecuteBody = z.object({
	url: httpUrl,
	token: z.string().min(1),
	config: z.record(z.string(), z.unknown()),
	phase: z.enum([
		"content",
		"comments",
		"finalize"
	]).optional(),
	cursor: z.object({
		postTypeIndex: z.number().int().min(0).default(0),
		page: z.number().int().min(1).default(1)
	}).optional(),
	idMap: z.record(z.string(), z.object({
		id: z.string().min(1),
		collection: z.string().min(1)
	})).optional(),
	translationGroups: z.record(z.string(), z.string().min(1)).optional(),
	commentRoots: z.record(z.string(), z.string().min(1)).optional()
});
var wxrImportConfig = z.object({
	postTypeMappings: z.record(z.string(), z.object({
		collection: z.string().min(1),
		enabled: z.boolean()
	})),
	skipExisting: z.boolean().default(false),
	importSections: z.boolean().optional(),
	authorMappings: z.record(z.string(), z.string().min(1).nullable()).optional(),
	locale: z.string().min(1).optional()
});
var wxrChunkCursor = z.object({
	offset: z.number().int().min(0).max(1e7),
	source: z.string().regex(/^[a-f0-9]{64}$/),
	taxonomiesReady: z.literal(true)
});
var wxrChunkState = z.object({ translationGroups: z.record(z.string().max(1024), z.string().min(1).max(256)).refine((groups) => Object.keys(groups).length <= 1e5, "Too many translation groups") });
var wpPrepareField = z.object({
	slug: z.string().min(1),
	label: z.string().min(1),
	type: z.string().min(1),
	required: z.boolean(),
	searchable: z.boolean().optional()
});
var wpPrepareBody = z.object({ postTypes: z.array(z.object({
	name: z.string().min(1),
	collection: z.string().min(1).optional(),
	suggestedCollection: z.string().min(1).optional(),
	fields: z.array(wpPrepareField).optional(),
	requiredFields: z.array(wpPrepareField).optional()
}).refine((pt) => pt.collection || pt.suggestedCollection, {
	message: "collection or suggestedCollection is required",
	path: ["collection"]
}).transform((pt) => ({
	name: pt.name,
	collection: pt.collection ?? pt.suggestedCollection,
	fields: pt.fields ?? pt.requiredFields ?? []
}))) });
var wpMediaImportBody = z.object({
	attachments: z.array(z.record(z.string(), z.unknown())),
	stream: z.boolean().optional()
});
var wpRewriteUrlsBody = z.object({
	urlMap: z.record(z.string(), z.string()),
	collections: z.array(z.string()).optional()
});
/** Registration credential — duplicated reference for setup flow.
*  The canonical definition lives in auth.ts but setup needs it independently
*  because setup runs before auth is configured. */
var authenticatorTransport = z.enum([
	"usb",
	"nfc",
	"ble",
	"internal",
	"hybrid"
]);
var registrationCredential = z.object({
	id: z.string(),
	rawId: z.string(),
	type: z.literal("public-key"),
	response: z.object({
		clientDataJSON: z.string(),
		attestationObject: z.string(),
		transports: z.array(authenticatorTransport).optional()
	}),
	authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional()
});
var setupBody = z.object({
	title: z.string().min(1),
	tagline: z.string().optional(),
	includeContent: z.boolean()
});
var setupAdminBody = z.object({
	email: z.email(),
	name: z.string().optional()
});
var setupAdminVerifyBody = z.object({ credential: registrationCredential });
z.object({ handle: z.string().trim().min(1) });
z.object({ handle: z.string().trim().min(1) });
/**
* Zod schemas for the byline-fields admin API (Discussion #1174, Phase 4).
*
* Reserved-slug + identifier validation runs at the zod layer so the
* route returns a clean 400 (`VALIDATION_ERROR` from `parseBody`) rather
* than bubbling a registry-level `BylineSchemaError` ("RESERVED_SLUG" /
* "INVALID_SLUG"). The registry repeats the same checks for non-HTTP
* callers (seeds, scripts) — see `BylineSchemaRegistry.validateSlug`.
*
* Field types are constrained to the v1 subset declared in
* `BYLINE_FIELD_TYPES`. Adding a type to the union there will require a
* corresponding update to this enum.
*/
/**
* Slug pattern for byline field definitions — matches the identifier rule
* used by `validateIdentifier` (and `slugPattern` in `common.ts`).
* Lowercase letters, digits, and underscores; must start with a letter.
*/
var bylineFieldSlugPattern = /^[a-z][a-z0-9_]*$/;
/** Hard cap on a slug — mirrors `BylineSchemaRegistry.MAX_SLUG_LENGTH`. */
var MAX_SLUG_LENGTH = 63;
/** Hard cap on a label — mirrors `BylineSchemaRegistry.MAX_LABEL_LENGTH`. */
var MAX_LABEL_LENGTH = 200;
/** Hard cap on a select field's `options` list. */
var MAX_SELECT_OPTIONS = 200;
var RESERVED_SET = new Set(RESERVED_BYLINE_FIELD_SLUGS);
var bylineFieldTypeValues = z.enum([
	"string",
	"text",
	"url",
	"boolean",
	"select"
]);
/**
* Validation payload for a byline custom field. v1 only exposes
* `options` (used by `select`-type fields). Empty/duplicate options are
* rejected at the registry layer; the zod layer only enforces shape and
* caps. Future field types may add keys here.
*/
var bylineFieldValidationSchema = z.object({ options: z.array(z.string().min(1)).min(1, "select options must contain at least one entry").max(MAX_SELECT_OPTIONS, `select options cannot exceed ${MAX_SELECT_OPTIONS} entries`).optional() }).strict().nullable();
/**
* Slug validation chain shared by create + reorder bodies. Centralised so
* the reserved-slug message and pattern are identical everywhere.
*/
var bylineFieldSlug = z.string().min(1, "Byline field slug is required").max(MAX_SLUG_LENGTH, `Byline field slug must be ${MAX_SLUG_LENGTH} characters or less`).regex(bylineFieldSlugPattern, "Byline field slug must contain only lowercase letters, digits, and underscores, and start with a letter").refine((slug) => !RESERVED_SET.has(slug), { message: "Byline field slug is reserved" });
var bylineFieldLabel = z.string().min(1, "Byline field label is required").max(MAX_LABEL_LENGTH, `Byline field label must be ${MAX_LABEL_LENGTH} characters or less`);
var bylineFieldCreateBody = z.object({
	slug: bylineFieldSlug,
	label: bylineFieldLabel,
	type: bylineFieldTypeValues,
	required: z.boolean().optional(),
	translatable: z.boolean().optional(),
	validation: bylineFieldValidationSchema.optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "BylineFieldCreateBody" });
/**
* Update body. `slug` and `type` are intentionally absent — both are
* immutable post-create (changing them would invalidate stored values).
* `translatable` flips are gated at the registry layer when value rows
* exist (`TRANSLATABLE_LOCKED`).
*/
var bylineFieldUpdateBody = z.object({
	label: bylineFieldLabel.optional(),
	required: z.boolean().optional(),
	translatable: z.boolean().optional(),
	validation: bylineFieldValidationSchema.optional(),
	sortOrder: z.number().int().min(0).optional()
}).strict().meta({ id: "BylineFieldUpdateBody" });
var bylineFieldReorderBody = z.object({ slugs: z.array(bylineFieldSlug) }).strict().meta({ id: "BylineFieldReorderBody" });
var bylineFieldDefinitionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	label: z.string(),
	type: bylineFieldTypeValues,
	required: z.boolean(),
	translatable: z.boolean(),
	validation: z.object({ options: z.array(z.string()).optional() }).nullable(),
	sortOrder: z.number().int(),
	createdAt: z.string(),
	updatedAt: z.string()
}).meta({ id: "BylineFieldDefinition" });
z.object({ items: z.array(bylineFieldDefinitionSchema) }).meta({ id: "BylineFieldListResponse" });
z.object({
	translatableValueCount: z.number().int().nonnegative(),
	groupValueCount: z.number().int().nonnegative(),
	totalAffectedRows: z.number().int().nonnegative()
}).meta({ id: "BylineFieldUsageResponse" });
export { wpPluginExecuteBody as C, wxrChunkState as D, wxrChunkCursor as E, wxrImportConfig as O, wpPluginAnalyzeBody as S, wpRewriteUrlsBody as T, setupAdminVerifyBody as _, importProbeBody as a, signupRequestBody as b, inviteRegisterOptionsBody as c, passkeyOptionsBody as d, passkeyRegisterOptionsBody as f, setupAdminBody as g, passkeyVerifyBody as h, bylineFieldUpdateBody as i, magicLinkSendBody as l, passkeyRenameBody as m, bylineFieldCreateBody as n, inviteCompleteBody as o, passkeyRegisterVerifyBody as p, bylineFieldReorderBody as r, inviteCreateBody as s, authMeActionBody as t, magicLinkVerifyBody as u, setupBody as v, wpPrepareBody as w, wpMediaImportBody as x, signupCompleteBody as y };
