import { l as isStoragelessField } from "./types-C_asjp1J_CfydHSXi.mjs";
import { n as isSafeUrlFieldValue } from "./url-DTfGDJhI_CrwsbJIk.mjs";
import { z } from "zod";
// node_modules/emdash/dist/zod-generator--nlM0930.mjs
/** Pattern to split on underscores, hyphens, and spaces for PascalCase conversion */
var PASCAL_CASE_SPLIT_PATTERN = /[_\-\s]+/;
/**
* Generate a Zod schema from a collection's field definitions
*
* This allows runtime validation of content based on dynamically
* defined schemas stored in D1.
*/
function generateZodSchema(collection) {
	const shape = {};
	for (const field of collection.fields) {
		if (isStoragelessField(field)) continue;
		shape[field.slug] = generateFieldSchema(field);
	}
	return z.object(shape);
}
function generateFieldSchema(field) {
	let schema = getBaseSchema(field.type, field);
	if (field.validation) schema = applyValidation(schema, field);
	if (!field.required) schema = schema.nullish();
	if (field.defaultValue !== void 0) schema = schema.default(field.defaultValue);
	return schema;
}
function generateBlockFieldSchema(field) {
	return generateFieldSchema({
		type: field.type,
		validation: field.validation,
		required: field.required ?? false,
		defaultValue: field.defaultValue
	});
}
/**
* Get base Zod schema for a field type
*/
function getBaseSchema(type, field) {
	switch (type) {
		case "url": return z.string().check((ctx) => {
			if (isSafeUrlFieldValue(ctx.value)) return;
			ctx.issues.push({
				code: "invalid_format",
				format: "url",
				input: ctx.value,
				message: "URL must use http, https, mailto, or tel, or be a site-relative path"
			});
		});
		case "string":
		case "text":
		case "slug": return z.string();
		case "number": return z.number();
		case "integer": return z.number().int();
		case "boolean": return z.preprocess((v) => v === 0 || v === 1 ? Boolean(v) : v, z.boolean());
		case "datetime": return z.iso.datetime({ offset: true }).or(z.iso.datetime({
			offset: true,
			precision: -1
		}));
		case "select": {
			const options = field.validation?.options;
			if (options && options.length > 0) {
				const [first, ...rest] = options;
				return z.enum([first, ...rest]);
			}
			return z.string();
		}
		case "multiSelect": {
			const multiOptions = field.validation?.options;
			if (multiOptions && multiOptions.length > 0) {
				const [first, ...rest] = multiOptions;
				return z.array(z.enum([first, ...rest]));
			}
			return z.array(z.string());
		}
		case "repeater": return z.array(generateRepeaterRowSchema(field.validation?.subFields ?? []));
		case "blocks": return z.array(z.unknown());
		case "portableText": return z.array(z.object({
			_type: z.string(),
			_key: z.string().optional()
		}).loose());
		case "image": {
			const mediaSchema = z.object({
				id: z.string(),
				src: z.string().optional(),
				alt: z.string().optional(),
				caption: z.string().optional(),
				width: z.number().optional(),
				height: z.number().optional(),
				filename: z.string().optional(),
				mimeType: z.string().optional(),
				blurhash: z.string().optional(),
				dominantColor: z.string().optional(),
				focalX: z.number().optional(),
				focalY: z.number().optional(),
				provider: z.string().optional(),
				previewUrl: z.string().optional(),
				meta: z.record(z.string(), z.unknown()).optional()
			});
			return mediaSchema.extend({ darkVariant: mediaSchema.optional() });
		}
		case "file": return z.object({
			id: z.string(),
			url: z.string().optional(),
			src: z.string().optional(),
			filename: z.string().optional(),
			mimeType: z.string().optional(),
			size: z.number().optional(),
			provider: z.string().optional(),
			meta: z.record(z.string(), z.unknown()).optional()
		});
		case "reference": return z.string();
		case "json": return z.unknown();
		default: return z.unknown();
	}
}
function generateRepeaterRowSchema(subFields) {
	const shape = {};
	for (const subField of subFields) {
		let schema = getBaseSchema(subField.type, { validation: subField.options ? { options: subField.options } : void 0 });
		if (subField.required && schema instanceof z.ZodString) schema = schema.min(1, "required (empty value not allowed)");
		if (!subField.required) schema = schema.nullish();
		shape[subField.slug] = schema;
	}
	return z.object(shape).loose();
}
/**
* Apply validation rules to a schema
*/
function applyValidation(schema, field) {
	const validation = field.validation;
	if (!validation) return schema;
	if (schema instanceof z.ZodString) {
		let strSchema = schema;
		if (validation.minLength !== void 0) strSchema = strSchema.min(validation.minLength);
		if (validation.maxLength !== void 0) strSchema = strSchema.max(validation.maxLength);
		if (validation.pattern) strSchema = strSchema.regex(new RegExp(validation.pattern));
		return strSchema;
	}
	if (schema instanceof z.ZodNumber) {
		let numSchema = schema;
		if (validation.min !== void 0) numSchema = numSchema.min(validation.min);
		if (validation.max !== void 0) numSchema = numSchema.max(validation.max);
		return numSchema;
	}
	if ((field.type === "repeater" || field.type === "blocks") && schema instanceof z.ZodArray) {
		let arraySchema = schema;
		if (validation.minItems !== void 0) arraySchema = arraySchema.min(validation.minItems);
		if (validation.maxItems !== void 0) arraySchema = arraySchema.max(validation.maxItems);
		return arraySchema;
	}
	return schema;
}
/**
* Schema cache to avoid regenerating schemas on every request
*/
var schemaCache = /* @__PURE__ */ new Map();
/**
* Invalidate cached schema for a collection
*/
function invalidateSchemaCache(slug) {
	schemaCache.delete(slug);
}
/**
* Generate TypeScript interface from field definitions
* Used by CLI `emdash types` to generate types
*/
function generateTypeScript(collection, interfaceName = getInterfaceName(collection), blockFieldTypes = /* @__PURE__ */ new Map()) {
	const lines = [];
	lines.push(`export interface ${interfaceName} {`);
	lines.push(`  id: string;`);
	lines.push(`  slug: string | null;`);
	lines.push(`  status: string;`);
	for (const field of collection.fields) {
		if (isStoragelessField(field)) continue;
		const tsType = blockFieldTypes.get(field.slug) ?? fieldTypeToTypeScript(field);
		const optional = field.required ? "" : "?";
		lines.push(`  ${field.slug}${optional}: ${tsType};`);
	}
	lines.push(`  createdAt: Date;`);
	lines.push(`  updatedAt: Date;`);
	lines.push(`  publishedAt: Date | null;`);
	lines.push(`  byline?: BylineSummary | null;`);
	lines.push(`  bylines?: ContentBylineCredit[];`);
	lines.push(`  terms?: Record<string, TaxonomyTerm[]>;`);
	lines.push(`}`);
	return lines.join("\n");
}
/**
* Map field type to TypeScript type
*/
function fieldTypeToTypeScript(field) {
	switch (field.type) {
		case "string":
		case "text":
		case "slug":
		case "url":
		case "datetime": return "string";
		case "number":
		case "integer": return "number";
		case "boolean": return "boolean";
		case "select":
			const options = field.validation?.options;
			if (options && options.length > 0) return options.map((o) => `"${o}"`).join(" | ");
			return "string";
		case "multiSelect":
			const multiOptions = field.validation?.options;
			if (multiOptions && multiOptions.length > 0) return `(${multiOptions.map((o) => `"${o}"`).join(" | ")})[]`;
			return "string[]";
		case "repeater": {
			const subFields = field.validation?.subFields;
			if (!Array.isArray(subFields) || subFields.length === 0) return "unknown";
			const members = /* @__PURE__ */ new Map();
			for (const subField of subFields) {
				const type = fieldTypeToTypeScript({
					type: subField.type,
					validation: subField.options ? { options: subField.options } : void 0
				});
				const name = JSON.stringify(subField.slug);
				members.set(subField.slug, subField.required ? `${name}: ${type}` : `${name}?: ${type} | null`);
			}
			return `{ ${[...members.values()].join("; ")} }[]`;
		}
		case "portableText": return "PortableTextBlock[]";
		case "image": {
			const media = "{ id: string; src?: string; alt?: string; caption?: string; width?: number; height?: number; filename?: string; mimeType?: string; blurhash?: string; dominantColor?: string; focalX?: number; focalY?: number; provider?: string; previewUrl?: string; meta?: Record<string, unknown> }";
			return `${media.slice(0, -2)}; darkVariant?: ${media} }`;
		}
		case "file": return "{ id: string; url?: string; src?: string; filename?: string; mimeType?: string; size?: number; provider?: string; meta?: Record<string, unknown> }";
		case "reference": return "string";
		case "json": return "unknown";
		case "blocks": return "unknown[]";
		default: return "unknown";
	}
}
/**
* Convert string to PascalCase (handles slugs, spaces, etc.)
*/
function pascalCase(str) {
	return str.split(PASCAL_CASE_SPLIT_PATTERN).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}
/**
* Naive singularization for slug-derived interface names. Handles the common
* English plural endings; intentionally simple, not a full inflector.
*/
function singularize(str) {
	if (str.endsWith("ies")) return str.slice(0, -3) + "y";
	if (str.endsWith("es") && (str.endsWith("sses") || str.endsWith("xes") || str.endsWith("ches") || str.endsWith("shes"))) return str.slice(0, -2);
	if (str.endsWith("s") && !str.endsWith("ss")) return str.slice(0, -1);
	return str;
}
/**
* Get the interface name for a collection.
*
* Derived from the slug, not the human label. Slugs are constrained to
* `/^[a-z][a-z0-9_]*$/`, so PascalCasing one always yields a valid TS
* identifier; labels are arbitrary and user-controlled (punctuation, spaces,
* duplicates across collections), which produced syntactically invalid or
* duplicate interface names. The slug is singularized first because the
* interface describes a single entry, not the collection (`posts` -> `Post`).
*
* Singularization can map two distinct slugs onto the same name, so callers
* generating more than one interface must dedupe -- see `uniqueInterfaceNames`.
*/
function getInterfaceName(collection) {
	return pascalCase(singularize(collection.slug));
}
/**
* Resolve interface names for a set of collections, guaranteeing each is
* unique within the file. Collisions (from singularization or PascalCasing
* collapsing distinct slugs) get a numeric suffix in collection order, so the
* generated `.d.ts` never declares two interfaces with the same identifier.
*
* The suffix is chosen against the set of names already emitted, not a
* per-base counter, so a generated name can't collide with another slug's
* base name (e.g. slugs `book`, `books`, `book2`: `books` -> `Book2` would
* clash with `book2`, so it advances to `Book3`).
*/
function uniqueInterfaceNames(collections) {
	const used = /* @__PURE__ */ new Set();
	const names = /* @__PURE__ */ new Map();
	for (const collection of collections) {
		const base = getInterfaceName(collection);
		let name = base;
		let suffix = 2;
		while (used.has(name)) {
			name = `${base}${suffix}`;
			suffix++;
		}
		used.add(name);
		names.set(collection.slug, name);
	}
	return names;
}
export { invalidateSchemaCache as a, generateZodSchema as i, generateFieldSchema as n, uniqueInterfaceNames as o, generateTypeScript as r, generateBlockFieldSchema as t };
