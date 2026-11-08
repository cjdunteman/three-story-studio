import { i as compareUtf16, n as TRANSFER_LIMITS } from "./canonical-BudtH-Fx_DCTHtJBj.mjs";
import { n as PORTABLE_SETTING_NAMES } from "./settings-Dd1uivmQ_8f9uEka3.mjs";
import { z } from "zod";
// node_modules/emdash/dist/kinds-B_Qcl5pz.mjs
var ISSUE_MESSAGES = {
	invalid_type: "Wrong type",
	unrecognized_keys: "Unknown property",
	invalid_key: "Invalid key",
	invalid_element: "Invalid element",
	invalid_union: "Matches no allowed shape",
	invalid_value: "Value is not allowed",
	invalid_format: "Invalid format",
	too_big: "Too large",
	too_small: "Too small",
	not_multiple_of: "Not an allowed multiple"
};
function summarizeSchemaIssue(issue, shape) {
	const first = issue.path[0];
	return {
		path: typeof first === "string" && Object.hasOwn(shape, first) ? first : "",
		message: ISSUE_MESSAGES[issue.code] ?? "Failed validation"
	};
}
/**
* Record kinds of a site package and their strict schemas.
*
* Every record is `{ kind, id, ...fields }`. Column names become camelCase
* properties. A nullable column whose value is SQL `NULL` is represented by
* omitting the property (never by `null`); `null` inside a JSON value is JSON
* `null`. Integer 0/1 flag columns become booleans. JSON columns hold the
* parsed JSON value; TEXT columns hold the stored string verbatim, even when
* that string is itself JSON (image and file field values).
*
* Portable references are the origin's own ids. Columns that store a
* translation group rather than a row id are named `…Group`. Columns holding
* an origin user id are `…Principal` and refer to a `principal` record.
*
* Stream order: records of a kind appear in ascending `id` order
* ({@link compareIds}) except the topological kinds (`term`, `comment`,
* `menu_item`), which are ordered by `(depth, id)` where a root has depth 0
* and a child's depth is its parent's plus one — so every parent precedes its
* children and the order is still unique and reproducible.
*/
var RECORD_KINDS = [
	"principal",
	"block_type",
	"block_type_version",
	"collection",
	"field",
	"taxonomy_def",
	"relation",
	"byline_field",
	"media_folder",
	"media",
	"term",
	"byline",
	"byline_field_value",
	"byline_field_group_value",
	"revision",
	"entry",
	"content_term",
	"content_byline",
	"content_reference",
	"seo",
	"menu",
	"menu_item",
	"widget_area",
	"widget",
	"section",
	"redirect",
	"comment",
	"comment_reaction",
	"setting"
];
var RECORD_KIND_SET = new Set(RECORD_KINDS);
function isRecordKind(value) {
	return RECORD_KIND_SET.has(value);
}
/** UTF-16 code unit comparison — the only id ordering the format uses. */
function compareIds(a, b) {
	return compareUtf16(a, b);
}
var TOPOLOGICAL_PARENT_PROPERTY = Object.freeze({
	term: "parentId",
	comment: "parentId",
	menu_item: "parentId"
});
function streamOrderOf(kind) {
	return Object.hasOwn(TOPOLOGICAL_PARENT_PROPERTY, kind) ? "topological" : "id";
}
/** Stream-order comparison within one kind. */
function compareStreamOrder(kind, a, b) {
	if (streamOrderOf(kind) === "topological") {
		const depthA = a.depth ?? 0;
		const depthB = b.depth ?? 0;
		if (depthA !== depthB) return depthA < depthB ? -1 : 1;
	}
	return compareIds(a.id, b.id);
}
/**
* Portable ids are printable ASCII without spaces. This keeps UTF-16, UTF-8
* byte, SQLite BINARY, and Postgres `COLLATE "C"` orderings identical.
*/
var PORTABLE_ID_PATTERN = /^[\x21-\x7e]+$/;
var IDENTIFIER_PATTERN = /^[a-z][a-z0-9_]*$/;
var SHA256_HEX_PATTERN = /^[0-9a-f]{64}$/;
var portableIdSchema = z.string().min(1).max(TRANSFER_LIMITS.idLength).regex(PORTABLE_ID_PATTERN, "Invalid portable id");
/** Collection and field slugs become SQL identifiers on the target. */
var identifierSchema = z.string().min(1).max(63).regex(IDENTIFIER_PATTERN);
var shortString = z.string().max(TRANSFER_LIMITS.shortString);
var longText = z.string();
var timestamp = z.string().min(1).max(64);
var localeSchema = z.string().min(1).max(64);
var integer = z.number().int();
var real = z.number();
var jsonValue = z.json();
var sha256Hex = z.string().regex(SHA256_HEX_PATTERN);
var principalRecordSchema = z.strictObject({
	kind: z.literal("principal"),
	id: portableIdSchema,
	displayName: shortString,
	email: shortString.optional()
});
var blockTypeRecordSchema = z.strictObject({
	kind: z.literal("block_type"),
	id: portableIdSchema,
	slug: identifierSchema,
	label: shortString,
	description: longText.optional(),
	icon: shortString.optional(),
	category: shortString.optional(),
	currentVersion: integer,
	source: shortString,
	createdAt: timestamp,
	updatedAt: timestamp
});
/** The version's `fingerprint` is derived from `fields` and recomputed by the importer. */
var blockTypeVersionRecordSchema = z.strictObject({
	kind: z.literal("block_type_version"),
	id: portableIdSchema,
	blockTypeId: portableIdSchema,
	version: integer,
	fields: z.array(jsonValue),
	createdAt: timestamp,
	updatedAt: timestamp
});
var collectionRecordSchema = z.strictObject({
	kind: z.literal("collection"),
	id: portableIdSchema,
	slug: identifierSchema,
	label: shortString,
	labelSingular: shortString.optional(),
	description: longText.optional(),
	icon: shortString.optional(),
	supports: z.array(shortString).optional(),
	source: shortString.optional(),
	searchConfig: jsonValue.optional(),
	hasSeo: z.boolean(),
	urlPattern: shortString.optional(),
	commentsEnabled: z.boolean().optional(),
	commentsModeration: shortString.optional(),
	commentsClosedAfterDays: integer.optional(),
	commentsAutoApproveUsers: z.boolean().optional(),
	hidden: z.boolean(),
	sortOrder: integer.optional(),
	adminConfig: jsonValue.optional(),
	titleField: shortString.optional(),
	dateField: shortString.optional(),
	routable: z.boolean(),
	editLocking: z.boolean(),
	navGroup: shortString.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var fieldRecordSchema = z.strictObject({
	kind: z.literal("field"),
	id: portableIdSchema,
	collectionId: portableIdSchema,
	slug: identifierSchema,
	label: shortString,
	type: shortString,
	columnType: z.enum([
		"TEXT",
		"REAL",
		"INTEGER",
		"JSON"
	]),
	required: z.boolean().optional(),
	unique: z.boolean().optional(),
	defaultValue: jsonValue.optional(),
	validation: jsonValue.optional(),
	widget: shortString.optional(),
	options: jsonValue.optional(),
	sortOrder: integer.optional(),
	searchable: z.boolean().optional(),
	translatable: z.boolean(),
	indexed: z.boolean(),
	createdAt: timestamp.optional()
});
var taxonomyDefRecordSchema = z.strictObject({
	kind: z.literal("taxonomy_def"),
	id: portableIdSchema,
	name: shortString.min(1),
	label: shortString,
	labelSingular: shortString.optional(),
	hierarchical: z.boolean().optional(),
	collections: z.array(shortString).optional(),
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	createdAt: timestamp.optional()
});
var relationRecordSchema = z.strictObject({
	kind: z.literal("relation"),
	id: portableIdSchema,
	slug: shortString.min(1),
	parentCollection: identifierSchema,
	childCollection: identifierSchema,
	parentLabel: shortString,
	childLabel: shortString,
	parentLabelSingular: shortString.optional(),
	childLabelSingular: shortString.optional(),
	maxChildrenPerParent: integer.optional(),
	maxParentsPerChild: integer.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var bylineFieldRecordSchema = z.strictObject({
	kind: z.literal("byline_field"),
	id: portableIdSchema,
	slug: shortString.min(1),
	label: shortString,
	type: shortString,
	required: z.boolean(),
	translatable: z.boolean(),
	validation: jsonValue.optional(),
	sortOrder: integer,
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var mediaFolderRecordSchema = z.strictObject({
	kind: z.literal("media_folder"),
	id: portableIdSchema,
	name: shortString,
	nameKey: shortString
});
var mediaRecordSchema = z.strictObject({
	kind: z.literal("media"),
	id: portableIdSchema,
	filename: shortString,
	mimeType: shortString,
	size: integer.optional(),
	width: integer.optional(),
	height: integer.optional(),
	focalX: real.optional(),
	focalY: real.optional(),
	alt: longText.optional(),
	caption: longText.optional(),
	blurhash: shortString.optional(),
	dominantColor: shortString.optional(),
	authorPrincipal: portableIdSchema.optional(),
	folderId: portableIdSchema.optional(),
	createdAt: timestamp.optional(),
	blob: sha256Hex
});
var termRecordSchema = z.strictObject({
	kind: z.literal("term"),
	id: portableIdSchema,
	name: shortString.min(1),
	slug: shortString.min(1),
	label: shortString,
	parentId: portableIdSchema.optional(),
	data: jsonValue.optional(),
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	sortOrder: integer
});
var bylineRecordSchema = z.strictObject({
	kind: z.literal("byline"),
	id: portableIdSchema,
	slug: shortString.min(1),
	displayName: shortString,
	bio: longText.optional(),
	avatarMediaId: portableIdSchema.optional(),
	websiteUrl: shortString.optional(),
	userPrincipal: portableIdSchema.optional(),
	isGuest: z.boolean(),
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var bylineFieldValueRecordSchema = z.strictObject({
	kind: z.literal("byline_field_value"),
	id: portableIdSchema,
	bylineId: portableIdSchema,
	fieldId: portableIdSchema,
	value: jsonValue.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var bylineFieldGroupValueRecordSchema = z.strictObject({
	kind: z.literal("byline_field_group_value"),
	id: portableIdSchema,
	bylineGroup: portableIdSchema,
	fieldId: portableIdSchema,
	value: jsonValue.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var revisionRecordSchema = z.strictObject({
	kind: z.literal("revision"),
	id: portableIdSchema,
	collection: identifierSchema,
	entryId: portableIdSchema,
	data: jsonValue,
	authorPrincipal: portableIdSchema.optional(),
	createdAt: timestamp.optional()
});
var entryRecordSchema = z.strictObject({
	kind: z.literal("entry"),
	id: portableIdSchema,
	collection: identifierSchema,
	slug: shortString.optional(),
	status: shortString.optional(),
	authorPrincipal: portableIdSchema.optional(),
	primaryBylineGroup: portableIdSchema.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional(),
	publishedAt: timestamp.optional(),
	scheduledAt: timestamp.optional(),
	deletedAt: timestamp.optional(),
	version: integer.optional(),
	liveRevisionId: portableIdSchema.optional(),
	draftRevisionId: portableIdSchema.optional(),
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	fields: z.record(identifierSchema, jsonValue)
});
var contentTermRecordSchema = z.strictObject({
	kind: z.literal("content_term"),
	id: portableIdSchema,
	collection: identifierSchema,
	entryGroup: portableIdSchema,
	termGroup: portableIdSchema
});
var contentBylineRecordSchema = z.strictObject({
	kind: z.literal("content_byline"),
	id: portableIdSchema,
	collection: identifierSchema,
	entryId: portableIdSchema,
	bylineGroup: portableIdSchema,
	sortOrder: integer,
	roleLabel: shortString.optional(),
	createdAt: timestamp.optional()
});
var contentReferenceRecordSchema = z.strictObject({
	kind: z.literal("content_reference"),
	id: portableIdSchema,
	relationId: portableIdSchema,
	parentGroup: portableIdSchema,
	childGroup: portableIdSchema,
	sortOrder: integer,
	createdAt: timestamp.optional()
});
var seoRecordSchema = z.strictObject({
	kind: z.literal("seo"),
	id: portableIdSchema,
	collection: identifierSchema,
	entryId: portableIdSchema,
	seoTitle: longText.optional(),
	seoDescription: longText.optional(),
	seoImage: longText.optional(),
	seoCanonical: longText.optional(),
	seoNoIndex: z.boolean(),
	createdAt: timestamp,
	updatedAt: timestamp
});
var menuRecordSchema = z.strictObject({
	kind: z.literal("menu"),
	id: portableIdSchema,
	name: shortString.min(1),
	label: shortString,
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var menuItemRecordSchema = z.strictObject({
	kind: z.literal("menu_item"),
	id: portableIdSchema,
	menuId: portableIdSchema,
	parentId: portableIdSchema.optional(),
	sortOrder: integer,
	type: shortString,
	referenceCollection: shortString.optional(),
	referenceGroup: portableIdSchema.optional(),
	customUrl: longText.optional(),
	label: shortString,
	titleAttr: shortString.optional(),
	target: shortString.optional(),
	cssClasses: shortString.optional(),
	locale: localeSchema,
	translationGroup: portableIdSchema.optional(),
	createdAt: timestamp.optional()
});
var widgetAreaRecordSchema = z.strictObject({
	kind: z.literal("widget_area"),
	id: portableIdSchema,
	name: shortString.min(1),
	label: shortString,
	description: longText.optional(),
	createdAt: timestamp.optional()
});
var widgetRecordSchema = z.strictObject({
	kind: z.literal("widget"),
	id: portableIdSchema,
	areaId: portableIdSchema,
	sortOrder: integer,
	type: shortString,
	title: shortString.optional(),
	content: jsonValue.optional(),
	menuName: shortString.optional(),
	componentId: shortString.optional(),
	componentProps: jsonValue.optional(),
	createdAt: timestamp.optional()
});
var sectionRecordSchema = z.strictObject({
	kind: z.literal("section"),
	id: portableIdSchema,
	slug: shortString.min(1),
	title: shortString,
	description: longText.optional(),
	keywords: jsonValue.optional(),
	content: jsonValue,
	previewMediaId: portableIdSchema.optional(),
	source: shortString,
	themeId: shortString.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var redirectRecordSchema = z.strictObject({
	kind: z.literal("redirect"),
	id: portableIdSchema,
	source: longText.min(1),
	destination: longText,
	type: integer,
	isPattern: z.boolean(),
	enabled: z.boolean(),
	groupName: shortString.optional(),
	auto: z.boolean(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var commentRecordSchema = z.strictObject({
	kind: z.literal("comment"),
	id: portableIdSchema,
	collection: identifierSchema,
	entryId: portableIdSchema,
	parentId: portableIdSchema.optional(),
	authorName: shortString,
	authorEmail: shortString,
	authorPrincipal: portableIdSchema.optional(),
	body: longText,
	status: shortString,
	moderationMetadata: jsonValue.optional(),
	createdAt: timestamp.optional(),
	updatedAt: timestamp.optional()
});
var commentReactionRecordSchema = z.strictObject({
	kind: z.literal("comment_reaction"),
	id: portableIdSchema,
	commentId: portableIdSchema,
	reaction: shortString.min(1),
	createdAt: timestamp.optional()
});
var settingRecordSchema = z.strictObject({
	kind: z.literal("setting"),
	id: z.enum(PORTABLE_SETTING_NAMES),
	value: jsonValue
});
var RECORD_SCHEMAS = Object.freeze({
	principal: principalRecordSchema,
	block_type: blockTypeRecordSchema,
	block_type_version: blockTypeVersionRecordSchema,
	collection: collectionRecordSchema,
	field: fieldRecordSchema,
	taxonomy_def: taxonomyDefRecordSchema,
	relation: relationRecordSchema,
	byline_field: bylineFieldRecordSchema,
	media_folder: mediaFolderRecordSchema,
	media: mediaRecordSchema,
	term: termRecordSchema,
	byline: bylineRecordSchema,
	byline_field_value: bylineFieldValueRecordSchema,
	byline_field_group_value: bylineFieldGroupValueRecordSchema,
	revision: revisionRecordSchema,
	entry: entryRecordSchema,
	content_term: contentTermRecordSchema,
	content_byline: contentBylineRecordSchema,
	content_reference: contentReferenceRecordSchema,
	seo: seoRecordSchema,
	menu: menuRecordSchema,
	menu_item: menuItemRecordSchema,
	widget_area: widgetAreaRecordSchema,
	widget: widgetRecordSchema,
	section: sectionRecordSchema,
	redirect: redirectRecordSchema,
	comment: commentRecordSchema,
	comment_reaction: commentReactionRecordSchema,
	setting: settingRecordSchema
});
/** Kinds whose `id` is derived from other properties rather than a row id. */
var SYNTHETIC_ID_KINDS = [
	"content_term",
	"seo",
	"byline_field_value",
	"byline_field_group_value"
];
/**
* The deterministic id of a synthetic-id record. `setting` ids are the option
* name and every other kind uses the origin row id.
*/
function syntheticId(record) {
	switch (record.kind) {
		case "content_term": return `${record.collection}:${record.entryGroup}:${record.termGroup}`;
		case "seo": return `${record.collection}:${record.entryId}`;
		case "byline_field_value": return `${record.bylineId}:${record.fieldId}`;
		case "byline_field_group_value": return `${record.bylineGroup}:${record.fieldId}`;
	}
}
/** Id of the `content_byline` row the importer materializes for an inferred author credit. */
function inferredCreditId(collection, entryId) {
	return `inferred:${collection}:${entryId}`;
}
var KIND_REFERENCES = Object.freeze({
	principal: [],
	block_type: [],
	block_type_version: [{
		property: "blockTypeId",
		targets: ["block_type"],
		by: "id"
	}],
	collection: [],
	field: [{
		property: "collectionId",
		targets: ["collection"],
		by: "id"
	}],
	taxonomy_def: [{
		property: "collections",
		targets: ["collection"],
		by: "slug",
		many: true,
		soft: true
	}],
	relation: [{
		property: "parentCollection",
		targets: ["collection"],
		by: "slug"
	}, {
		property: "childCollection",
		targets: ["collection"],
		by: "slug"
	}],
	byline_field: [],
	media_folder: [],
	media: [{
		property: "authorPrincipal",
		targets: ["principal"],
		by: "id"
	}, {
		property: "folderId",
		targets: ["media_folder"],
		by: "id"
	}],
	term: [{
		property: "parentId",
		targets: ["term"],
		by: "id"
	}],
	byline: [{
		property: "avatarMediaId",
		targets: ["media"],
		by: "id"
	}, {
		property: "userPrincipal",
		targets: ["principal"],
		by: "id"
	}],
	byline_field_value: [{
		property: "bylineId",
		targets: ["byline"],
		by: "id"
	}, {
		property: "fieldId",
		targets: ["byline_field"],
		by: "id"
	}],
	byline_field_group_value: [{
		property: "bylineGroup",
		targets: ["byline"],
		by: "group"
	}, {
		property: "fieldId",
		targets: ["byline_field"],
		by: "id"
	}],
	revision: [
		{
			property: "collection",
			targets: ["collection"],
			by: "slug"
		},
		{
			property: "entryId",
			targets: ["entry"],
			by: "id"
		},
		{
			property: "authorPrincipal",
			targets: ["principal"],
			by: "id"
		}
	],
	entry: [
		{
			property: "collection",
			targets: ["collection"],
			by: "slug"
		},
		{
			property: "authorPrincipal",
			targets: ["principal"],
			by: "id"
		},
		{
			property: "primaryBylineGroup",
			targets: ["byline"],
			by: "group"
		},
		{
			property: "liveRevisionId",
			targets: ["revision"],
			by: "id"
		},
		{
			property: "draftRevisionId",
			targets: ["revision"],
			by: "id"
		}
	],
	content_term: [
		{
			property: "collection",
			targets: ["collection"],
			by: "slug"
		},
		{
			property: "entryGroup",
			targets: ["entry"],
			by: "group",
			soft: true
		},
		{
			property: "termGroup",
			targets: ["term"],
			by: "group",
			soft: true
		}
	],
	content_byline: [
		{
			property: "collection",
			targets: ["collection"],
			by: "slug"
		},
		{
			property: "entryId",
			targets: ["entry"],
			by: "id"
		},
		{
			property: "bylineGroup",
			targets: ["byline"],
			by: "group"
		}
	],
	content_reference: [
		{
			property: "relationId",
			targets: ["relation"],
			by: "id",
			soft: true
		},
		{
			property: "parentGroup",
			targets: ["entry"],
			by: "group",
			soft: true
		},
		{
			property: "childGroup",
			targets: ["entry"],
			by: "group",
			soft: true
		}
	],
	seo: [{
		property: "collection",
		targets: ["collection"],
		by: "slug"
	}, {
		property: "entryId",
		targets: ["entry"],
		by: "id"
	}],
	menu: [],
	menu_item: [
		{
			property: "menuId",
			targets: ["menu"],
			by: "id"
		},
		{
			property: "parentId",
			targets: ["menu_item"],
			by: "id"
		},
		{
			property: "referenceGroup",
			targets: ["entry", "term"],
			by: "group",
			soft: true
		}
	],
	widget_area: [],
	widget: [{
		property: "areaId",
		targets: ["widget_area"],
		by: "id"
	}, {
		property: "menuName",
		targets: ["menu"],
		by: "name",
		soft: true
	}],
	section: [{
		property: "previewMediaId",
		targets: ["media"],
		by: "id"
	}],
	redirect: [],
	comment: [
		{
			property: "collection",
			targets: ["collection"],
			by: "slug"
		},
		{
			property: "entryId",
			targets: ["entry"],
			by: "id"
		},
		{
			property: "parentId",
			targets: ["comment"],
			by: "id"
		},
		{
			property: "authorPrincipal",
			targets: ["principal"],
			by: "id"
		}
	],
	comment_reaction: [{
		property: "commentId",
		targets: ["comment"],
		by: "id"
	}],
	setting: []
});
/**
* Block type slugs a `blocks` field refers to in `validation.allowedTypes`
* and `validation.retiredTypes`. Each must name a `block_type` record: the
* target resolves them whenever it reads the field.
*/
function blocksFieldTypeSlugs(record) {
	const validation = record.validation;
	if (record.type !== "blocks" || typeof validation !== "object" || validation === null) return [];
	if (Array.isArray(validation)) return [];
	const slugs = /* @__PURE__ */ new Set();
	for (const list of [validation.allowedTypes, validation.retiredTypes]) {
		if (!Array.isArray(list)) continue;
		for (const slug of list) if (typeof slug === "string") slugs.add(slug);
	}
	return [...slugs];
}
/**
* The relation slug a bound `reference` field names in `validation.relation`.
* An unbound reference field keeps a column and names no relation.
*/
function referenceFieldRelationSlugs(record) {
	const validation = record.validation;
	if (record.type !== "reference" || typeof validation !== "object" || validation === null) return [];
	if (Array.isArray(validation)) return [];
	const relation = validation.relation;
	return typeof relation === "string" && relation.length > 0 ? [relation] : [];
}
/**
* Key of a block type's version: a `block_type`'s `currentVersion` must name
* the `block_type_version` record with the same key.
*/
function blockTypeVersionKey(blockTypeId, version) {
	return `${blockTypeId}:${version}`;
}
/**
* Top-level properties that carry identity rather than content. The media
* reference walker never rewrites them.
*/
function identityProperties(kind) {
	let properties = IDENTITY_PROPERTIES.get(kind);
	if (!properties) {
		const set = /* @__PURE__ */ new Set([
			"kind",
			"id",
			"translationGroup"
		]);
		for (const reference of KIND_REFERENCES[kind]) set.add(reference.property);
		if (kind === "media") set.add("blob");
		properties = set;
		IDENTITY_PROPERTIES.set(kind, properties);
	}
	return properties;
}
var IDENTITY_PROPERTIES = /* @__PURE__ */ new Map();
var IMPORT_RECORD_STAGES = [
	"schema",
	"media",
	"terms_bylines",
	"content",
	"relations",
	"presentation"
];
/**
* Kinds written by each import stage, in write order. `principal` is never
* written: principals only feed the plan's principal mappings.
*/
var IMPORT_STAGE_KINDS = Object.freeze({
	schema: [
		"block_type",
		"block_type_version",
		"collection",
		"field",
		"taxonomy_def",
		"relation",
		"byline_field"
	],
	media: ["media_folder", "media"],
	terms_bylines: [
		"term",
		"byline",
		"byline_field_value",
		"byline_field_group_value"
	],
	content: ["revision", "entry"],
	relations: [
		"content_term",
		"content_byline",
		"content_reference",
		"seo"
	],
	presentation: [
		"menu",
		"menu_item",
		"widget_area",
		"widget",
		"section",
		"redirect",
		"comment",
		"comment_reaction",
		"setting"
	]
});
Object.freeze(["principal"]);
var sitePackageRecordSchema = z.discriminatedUnion("kind", [
	principalRecordSchema,
	blockTypeRecordSchema,
	blockTypeVersionRecordSchema,
	collectionRecordSchema,
	fieldRecordSchema,
	taxonomyDefRecordSchema,
	relationRecordSchema,
	bylineFieldRecordSchema,
	mediaFolderRecordSchema,
	mediaRecordSchema,
	termRecordSchema,
	bylineRecordSchema,
	bylineFieldValueRecordSchema,
	bylineFieldGroupValueRecordSchema,
	revisionRecordSchema,
	entryRecordSchema,
	contentTermRecordSchema,
	contentBylineRecordSchema,
	contentReferenceRecordSchema,
	seoRecordSchema,
	menuRecordSchema,
	menuItemRecordSchema,
	widgetAreaRecordSchema,
	widgetRecordSchema,
	sectionRecordSchema,
	redirectRecordSchema,
	commentRecordSchema,
	commentReactionRecordSchema,
	settingRecordSchema
]);
/**
* Validate a parsed record against the strict schema for `kind`, including
* the synthetic-id rule for synthetic-id kinds. Issues carry fixed messages
* and at most a top-level property name, never package content.
*/
function validateRecord(kind, value) {
	if ((typeof value === "object" && value !== null ? Reflect.get(value, "kind") : void 0) !== kind) return {
		success: false,
		issues: [{
			path: "kind",
			message: `Expected kind ${kind}`
		}]
	};
	const result = sitePackageRecordSchema.safeParse(value);
	if (!result.success) return {
		success: false,
		issues: result.error.issues.slice(0, 20).map((issue) => summarizeSchemaIssue(issue, RECORD_SCHEMAS[kind].shape))
	};
	const record = result.data;
	const expected = expectedSyntheticId(record);
	if (expected !== null && record.id !== expected) return {
		success: false,
		issues: [{
			path: "id",
			message: "Synthetic id does not match its components"
		}]
	};
	if (!isRecordOfKind(record, kind)) return {
		success: false,
		issues: [{
			path: "kind",
			message: `Expected kind ${kind}`
		}]
	};
	return {
		success: true,
		record
	};
}
function isRecordOfKind(record, kind) {
	return record.kind === kind;
}
function expectedSyntheticId(record) {
	switch (record.kind) {
		case "content_term":
		case "seo":
		case "byline_field_value":
		case "byline_field_group_value": return syntheticId(record);
		default: return null;
	}
}
export { streamOrderOf as _, SYNTHETIC_ID_KINDS as a, validateRecord as b, blocksFieldTypeSlugs as c, identityProperties as d, inferredCreditId as f, referenceFieldRelationSlugs as g, portableIdSchema as h, RECORD_KINDS as i, compareIds as l, isRecordOfKind as m, IMPORT_STAGE_KINDS as n, TOPOLOGICAL_PARENT_PROPERTY as o, isRecordKind as p, KIND_REFERENCES as r, blockTypeVersionKey as s, IMPORT_RECORD_STAGES as t, compareStreamOrder as u, summarizeSchemaIssue as v, syntheticId as y };
