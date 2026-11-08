import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as BlockTypeRegistry, u as SchemaError } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { t as generateBlockFieldSchema } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
import { z } from "zod";
import { ulid } from "ulidx";
// node_modules/emdash/dist/block-values-Dg0-8PPS.mjs
var block_values_exports = /* @__PURE__ */ __exportAll({
	expandCollectionBlockFields: () => expandCollectionBlockFields,
	inferBlockTypes: () => inferBlockTypes,
	normalizeBlocksData: () => normalizeBlocksData,
	resolveBlockTypes: () => resolveBlockTypes
});
async function resolveBlockTypes(db) {
	const blockTypes = await new BlockTypeRegistry(db).listBlockTypes();
	return new Map(blockTypes.map((type) => [type.slug, type]));
}
async function fingerprintResolvedTypes(allowedTypes, retiredTypes, types) {
	const payload = JSON.stringify({
		allowedTypes,
		retiredTypes,
		types: types.map((type) => ({
			slug: type.slug,
			currentVersion: type.currentVersion,
			versions: type.versions.map((version) => ({
				version: version.version,
				fingerprint: version.fingerprint
			}))
		}))
	});
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
	return `blocks-field:v1:sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
async function expandCollectionBlockFields(db, collection) {
	if (collection.fields.filter((field) => field.type === "blocks").length === 0) return collection;
	const resolved = await resolveBlockTypes(db);
	const fields = await Promise.all(collection.fields.map(async (field) => {
		if (field.type !== "blocks") return field;
		const allowedTypes = field.validation?.allowedTypes ?? [];
		const retiredTypes = field.validation?.retiredTypes ?? [];
		const blockTypes = [...allowedTypes, ...retiredTypes.filter((slug) => !allowedTypes.includes(slug))].map((slug) => {
			const type = resolved.get(slug);
			if (!type) unsupported(field.slug, `block type "${slug}" is unavailable`);
			return type;
		});
		return {
			...field,
			blockTypes,
			blockTypeFingerprint: await fingerprintResolvedTypes(allowedTypes, retiredTypes, blockTypes)
		};
	}));
	return {
		...collection,
		fields
	};
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function validationError(path, message) {
	throw new SchemaError(`${path}: ${message}`, "VALIDATION_ERROR", { issues: [{
		path,
		code: "custom",
		message
	}] });
}
function unsupported(path, message) {
	throw new SchemaError(`${path}: ${message}`, "UNSUPPORTED_FIELD_TYPE", { path });
}
function versionFor(type, version, path) {
	const definition = type.versions.find((candidate) => candidate.version === version);
	if (!definition) unsupported(path, `block type "${type.slug}" has no retained version ${version}`);
	if (definition.unsupportedTypes?.length) unsupported(path, `block type "${type.slug}" version ${version} uses unsupported field types`);
	return definition;
}
function blockSchema(typeSlug, definition) {
	const shape = {
		_type: z.literal(typeSlug),
		_version: z.literal(definition.version),
		_key: z.string().min(1)
	};
	for (const field of definition.fields) shape[field.slug] = generateBlockFieldSchema(field);
	return z.object(shape).strict();
}
function existingByKey(value, path) {
	if (value === void 0 || value === null) return /* @__PURE__ */ new Map();
	if (!Array.isArray(value)) validationError(path, "stored blocks value is not an array");
	const result = /* @__PURE__ */ new Map();
	for (const [index, block] of value.entries()) {
		if (!isRecord(block)) validationError(`${path}[${index}]`, "stored block is not an object");
		if (typeof block._key !== "string" || block._key.length === 0) validationError(`${path}[${index}]._key`, "stored block key is missing");
		if (result.has(block._key)) validationError(`${path}[${index}]._key`, "stored block key is duplicated");
		result.set(block._key, block);
	}
	return result;
}
function inferredBlockType(field, block, previous, options) {
	const allowedTypes = field.validation?.allowedTypes ?? [];
	return block._type === void 0 && !options.restoreBlocks && allowedTypes.length === 1 && (!previous || previous._type === allowedTypes[0]) ? allowedTypes[0] : block._type;
}
function normalizeBlockArray(field, value, existingValue, types, options) {
	const path = field.slug;
	if (!Array.isArray(value)) validationError(path, "must be an array");
	const minItems = field.validation?.minItems ?? 0;
	const maxItems = field.validation?.maxItems;
	if (value.length < minItems) validationError(path, `must contain at least ${minItems} blocks`);
	if (maxItems !== void 0 && value.length > maxItems) validationError(path, `must contain at most ${maxItems} blocks`);
	const allowed = new Set(field.validation?.allowedTypes ?? []);
	const retired = new Set(field.validation?.retiredTypes ?? []);
	const existing = existingByKey(existingValue, path);
	const incomingKeyCount = value.filter((block) => isRecord(block) && block._key !== void 0).length;
	if (options.replaceBlocks && incomingKeyCount > 0) validationError(path, "replaceBlocks requires an entirely keyless replacement array");
	if (!options.replaceBlocks && existing.size > 0 && value.length > 0 && incomingKeyCount === 0) validationError(path, "updating an existing blocks field requires keys or replaceBlocks");
	const seen = /* @__PURE__ */ new Set();
	return value.map((rawBlock, index) => {
		const blockPath = `${path}[${index}]`;
		if (!isRecord(rawBlock)) validationError(blockPath, "must be an object");
		const previous = typeof rawBlock._key === "string" ? existing.get(rawBlock._key) : void 0;
		const blockTypeSlug = inferredBlockType(field, rawBlock, previous, options);
		if (typeof blockTypeSlug !== "string" || blockTypeSlug.length === 0) validationError(`${blockPath}._type`, "must be a block type slug");
		if (rawBlock._version !== void 0 && (typeof rawBlock._version !== "number" || !Number.isInteger(rawBlock._version) || rawBlock._version < 1)) validationError(`${blockPath}._version`, "must be a positive integer");
		if (rawBlock._key !== void 0 && (typeof rawBlock._key !== "string" || rawBlock._key.length === 0)) validationError(`${blockPath}._key`, "must be a non-empty string");
		const type = types.get(blockTypeSlug);
		if (!type) unsupported(`${blockPath}._type`, `block type "${blockTypeSlug}" is unavailable`);
		if (previous) {
			if (previous._type !== blockTypeSlug) validationError(`${blockPath}._type`, "cannot change an existing block's type");
		} else if (!allowed.has(blockTypeSlug) && !(options.restoreBlocks && retired.has(blockTypeSlug))) {
			const reason = retired.has(blockTypeSlug) ? "is retired" : "is not allowed by this field";
			validationError(`${blockPath}._type`, `block type "${blockTypeSlug}" ${reason}`);
		}
		let version;
		if (previous) {
			if (typeof previous._version !== "number" || !Number.isInteger(previous._version)) validationError(`${blockPath}._version`, "stored block version is invalid");
			version = rawBlock._version === void 0 ? previous._version : rawBlock._version;
			if (version !== previous._version) {
				if (!options.migrateBlocks) validationError(`${blockPath}._version`, "cannot change without migrateBlocks");
				if (version !== type.currentVersion) validationError(`${blockPath}._version`, "migration target must be the active version");
			}
		} else {
			version = rawBlock._version === void 0 ? type.currentVersion : rawBlock._version;
			if (version !== type.currentVersion && !options.restoreBlocks) validationError(`${blockPath}._version`, "new blocks must use the active version");
		}
		const key = options.replaceBlocks ? ulid() : rawBlock._key ?? ulid();
		if (seen.has(key)) validationError(`${blockPath}._key`, "must be unique within the field");
		seen.add(key);
		const definition = versionFor(type, version, `${blockPath}._version`);
		const normalized = {
			...rawBlock,
			_type: blockTypeSlug,
			_version: version,
			_key: key
		};
		if (!previous) {
			for (const nestedField of definition.fields) if (normalized[nestedField.slug] === void 0 && nestedField.defaultValue !== void 0) normalized[nestedField.slug] = structuredClone(nestedField.defaultValue);
		}
		for (const nestedField of definition.fields) if (nestedField.required && normalized[nestedField.slug] === "") validationError(`${blockPath}.${nestedField.slug}`, "required field cannot be empty");
		const parsed = blockSchema(type.slug, definition).safeParse(normalized);
		if (!parsed.success) {
			const issue = parsed.error.issues[0];
			validationError(`${blockPath}${issue?.path.length ? `.${issue.path.map(String).join(".")}` : ""}`, issue?.message ?? "invalid block value");
		}
		return {
			...normalized,
			_type: blockTypeSlug,
			_version: version,
			_key: key
		};
	});
}
async function normalizeBlocksData(db, collection, data, existingData = {}, options = {}, partial = true, resolvedTypes) {
	const normalized = { ...data };
	const blockFields = [];
	for (const field of collection.fields) {
		if (field.type !== "blocks") continue;
		if (partial && data[field.slug] === void 0) delete normalized[field.slug];
		else blockFields.push(field);
	}
	if (blockFields.length === 0) return normalized;
	const types = resolvedTypes ?? await resolveBlockTypes(db);
	for (const field of blockFields) normalized[field.slug] = normalizeBlockArray(field, data[field.slug] === void 0 ? [] : data[field.slug], existingData[field.slug], types, options);
	return normalized;
}
/**
* Fill in the `_type` an ordinary write infers for blocks that omit it, so
* `content:beforeSave` hooks see the type the block will be stored with.
* `loadExistingData` is only called when some block omits `_type`.
*/
async function inferBlockTypes(collection, data, loadExistingData) {
	const untyped = collection.fields.flatMap((field) => {
		const value = data[field.slug];
		return field.type === "blocks" && Array.isArray(value) && value.some((block) => isRecord(block) && block._type === void 0) ? [{
			field,
			value
		}] : [];
	});
	if (untyped.length === 0) return data;
	const existingData = await loadExistingData() ?? {};
	const inferred = { ...data };
	for (const { field, value } of untyped) {
		const stored = existingData[field.slug];
		inferred[field.slug] = value.map((block) => {
			if (!isRecord(block)) return block;
			const type = inferredBlockType(field, block, Array.isArray(stored) && typeof block._key === "string" ? stored.find((candidate) => isRecord(candidate) && candidate._key === block._key) : void 0, {});
			return type === block._type ? block : {
				...block,
				_type: type
			};
		});
	}
	return inferred;
}
export { resolveBlockTypes as a, normalizeBlocksData as i, expandCollectionBlockFields as n, inferBlockTypes as r, block_values_exports as t };
