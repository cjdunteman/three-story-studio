import { a as __exportAll, b as resolveConfiguredLocale, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { c as isIndexableFieldType, n as FIELD_TYPES, o as RESERVED_COLLECTION_SLUGS, s as RESERVED_FIELD_SLUGS } from "./types-C_asjp1J_CfydHSXi.mjs";
import { t as isSiteRelativeDestination } from "./destination-DR3IHjmy_oys7XJ91.mjs";
import { a as validateDestinationParams, o as validatePattern, r as isPattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
import { U as validateBlockFields } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { t as compileUrlPattern } from "./url-pattern-QATUE_rv_BFzsd91X.mjs";
// node_modules/emdash/dist/validate-Dz-TIOFB.mjs
/**
* Seed file validation
*
* Validates a seed file structure before applying it.
*/
var validate_exports = /* @__PURE__ */ __exportAll({
	findTaxonomyStructureSource: () => findTaxonomyStructureSource,
	validateSeed: () => validateSeed
});
var COLLECTION_FIELD_SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
/** Matches `SchemaRegistry.validateSlug`, which collection and field slugs go through. */
var MAX_SLUG_LENGTH = 63;
var SLUG_PATTERN = /^[a-z0-9-]+$/;
var REDIRECT_TYPES = /* @__PURE__ */ new Set([
	301,
	302,
	307,
	308
]);
var CRLF_PATTERN = /[\r\n]/;
/** Type guard for Record<string, unknown> */
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isValidRedirectPath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || CRLF_PATTERN.test(path)) return false;
	try {
		return !decodeURIComponent(path).split("/").includes("..");
	} catch {
		return false;
	}
}
/**
* The entry that declares `taxonomy`'s `hierarchical` and `collections`: the last
* entry of its `translationOf` chain within the taxonomy's name, or undefined when
* the chain loops.
*/
function findTaxonomyStructureSource(taxonomy, taxonomiesById) {
	const visited = /* @__PURE__ */ new Set();
	let current = taxonomy;
	while (!visited.has(current)) {
		visited.add(current);
		const source = current.translationOf ? taxonomiesById.get(current.translationOf) : void 0;
		if (!source || source.name !== current.name) return current;
		current = source;
	}
}
/** Whether `a` and `b` disagree on `hierarchical` or `collections`, comparing only fields both declare. */
function declaresDifferentStructure(a, b) {
	if (a.hierarchical !== void 0 && b.hierarchical !== void 0 && a.hierarchical !== b.hierarchical) return true;
	if (!Array.isArray(a.collections) || !Array.isArray(b.collections)) return false;
	const own = new Set(a.collections);
	const other = new Set(b.collections);
	return own.size !== other.size || [...own].some((collection) => !other.has(collection));
}
/**
* Validate a seed file
*
* @param data - Unknown data to validate as a seed file
* @returns Validation result with errors and warnings
*/
function validateSeed(data) {
	const errors = [];
	const warnings = [];
	if (!data || typeof data !== "object") return {
		valid: false,
		errors: ["Seed must be an object"],
		warnings: []
	};
	const seed = data;
	const defaultLocale = getI18nConfig()?.defaultLocale ?? (typeof seed.defaultLocale === "string" ? seed.defaultLocale : "en");
	if (!seed.version) errors.push("Seed must have a version field");
	else if (seed.version !== "1") errors.push(`Unsupported seed version: ${String(seed.version)}`);
	if (seed.defaultLocale !== void 0) {
		if (typeof seed.defaultLocale !== "string" || seed.defaultLocale.length === 0 || seed.defaultLocale !== seed.defaultLocale.trim()) errors.push("defaultLocale: must be a non-empty string with no leading or trailing whitespace");
	}
	if (seed.blockTypes !== void 0) if (!Array.isArray(seed.blockTypes)) errors.push("blockTypes must be an array");
	else {
		const slugs = /* @__PURE__ */ new Set();
		for (const [index, blockType] of seed.blockTypes.entries()) {
			const prefix = `blockTypes[${index}]`;
			if (!blockType.slug || !COLLECTION_FIELD_SLUG_PATTERN.test(blockType.slug)) errors.push(`${prefix}.slug: must be a valid block type slug`);
			else if (slugs.has(blockType.slug)) errors.push(`${prefix}.slug: duplicate block type slug "${blockType.slug}"`);
			else slugs.add(blockType.slug);
			if (!blockType.label) errors.push(`${prefix}.label: is required`);
			if (!Array.isArray(blockType.versions) || blockType.versions.length === 0) {
				errors.push(`${prefix}.versions: must be a non-empty array`);
				continue;
			}
			const numbers = blockType.versions.map((version) => version.version);
			const sorted = [...numbers].toSorted((left, right) => left - right);
			if (sorted[0] !== 1 || sorted.some((version, versionIndex) => version !== versionIndex + 1)) errors.push(`${prefix}.versions: numbers must be contiguous and start at 1`);
			if (!numbers.includes(blockType.currentVersion)) errors.push(`${prefix}.currentVersion: must name a declared version`);
			for (const [versionIndex, version] of blockType.versions.entries()) try {
				validateBlockFields(version.fields);
			} catch (error) {
				errors.push(`${prefix}.versions[${versionIndex}].${error instanceof Error ? error.message : "invalid fields"}`);
			}
		}
	}
	if (seed.collections) if (!Array.isArray(seed.collections)) errors.push("collections must be an array");
	else {
		const collectionSlugs = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.collections.length; i++) {
			const collection = seed.collections[i];
			const prefix = `collections[${i}]`;
			if (!collection.slug) errors.push(`${prefix}: slug is required`);
			else {
				if (!COLLECTION_FIELD_SLUG_PATTERN.test(collection.slug)) errors.push(`${prefix}.slug: must start with a letter and contain only lowercase letters, numbers, and underscores`);
				if (RESERVED_COLLECTION_SLUGS.includes(collection.slug)) errors.push(`${prefix}.slug: collection slug "${collection.slug}" is reserved`);
				if (collectionSlugs.has(collection.slug)) errors.push(`${prefix}.slug: duplicate collection slug "${collection.slug}"`);
				collectionSlugs.add(collection.slug);
			}
			if (!collection.label) errors.push(`${prefix}: label is required`);
			if (collection.editLocking !== void 0 && typeof collection.editLocking !== "boolean") errors.push(`${prefix}.editLocking: must be a boolean`);
			if (collection.routable !== void 0 && typeof collection.routable !== "boolean") errors.push(`${prefix}.routable: must be a boolean`);
			if (collection.urlPattern !== void 0) {
				if (typeof collection.urlPattern !== "string") errors.push(`${prefix}.urlPattern: must be a string`);
				else if (collection.urlPattern) try {
					compileUrlPattern(collection.urlPattern);
				} catch (error) {
					errors.push(`${prefix}.urlPattern: ${error instanceof Error ? error.message : "invalid URL pattern"}`);
				}
			}
			if (collection.group !== void 0) {
				if (typeof collection.group !== "string") errors.push(`${prefix}.group: must be a string`);
				else if (collection.group.trim().length > 100) errors.push(`${prefix}.group: must be at most 100 characters`);
			}
			if (collection.icon !== void 0) {
				if (typeof collection.icon !== "string") errors.push(`${prefix}.icon: must be a string`);
				else if (collection.icon.trim().length > 64) errors.push(`${prefix}.icon: must be at most 64 characters`);
			}
			const declaredFieldSlugs = new Set(Array.isArray(collection.fields) ? collection.fields.flatMap((field) => isRecord(field) && typeof field.slug === "string" ? [field.slug] : []) : []);
			if (collection.admin !== void 0) {
				if (!isRecord(collection.admin)) errors.push(`${prefix}.admin: must be an object`);
				else if (collection.admin.listColumns !== void 0) if (!Array.isArray(collection.admin.listColumns)) errors.push(`${prefix}.admin.listColumns: must be an array`);
				else {
					if (collection.admin.listColumns.length > 4) errors.push(`${prefix}.admin.listColumns: must contain at most 4 items`);
					for (let j = 0; j < collection.admin.listColumns.length; j++) {
						const slug = collection.admin.listColumns[j];
						if (typeof slug !== "string" || !COLLECTION_FIELD_SLUG_PATTERN.test(slug)) errors.push(`${prefix}.admin.listColumns[${j}]: must be a valid field slug`);
						else if (!declaredFieldSlugs.has(slug)) errors.push(`${prefix}.admin.listColumns[${j}]: references unknown field "${slug}"`);
					}
				}
				if (isRecord(collection.admin) && collection.admin.quickCreate !== void 0 && typeof collection.admin.quickCreate !== "boolean") errors.push(`${prefix}.admin.quickCreate: must be a boolean`);
			}
			if (!Array.isArray(collection.fields)) errors.push(`${prefix}.fields: must be an array`);
			else {
				const fieldSlugs = /* @__PURE__ */ new Set();
				for (let j = 0; j < collection.fields.length; j++) {
					const field = collection.fields[j];
					const fieldPrefix = `${prefix}.fields[${j}]`;
					if (!field.slug) errors.push(`${fieldPrefix}: slug is required`);
					else {
						if (!COLLECTION_FIELD_SLUG_PATTERN.test(field.slug)) errors.push(`${fieldPrefix}.slug: must start with a letter and contain only lowercase letters, numbers, and underscores`);
						if (RESERVED_FIELD_SLUGS.includes(field.slug)) errors.push(`${fieldPrefix}.slug: field slug "${field.slug}" is reserved`);
						if (fieldSlugs.has(field.slug)) errors.push(`${fieldPrefix}.slug: duplicate field slug "${field.slug}" in collection "${collection.slug}"`);
						fieldSlugs.add(field.slug);
					}
					if (!field.label) errors.push(`${fieldPrefix}: label is required`);
					if (field.indexed !== void 0 && typeof field.indexed !== "boolean") errors.push(`${fieldPrefix}.indexed: must be a boolean`);
					if (field.translatable !== void 0 && typeof field.translatable !== "boolean") errors.push(`${fieldPrefix}.translatable: must be a boolean`);
					if (!field.type) errors.push(`${fieldPrefix}: type is required`);
					else if (!FIELD_TYPES.includes(field.type)) errors.push(`${fieldPrefix}.type: unsupported field type "${field.type}"`);
					else if (field.indexed === true && !isIndexableFieldType(field.type)) errors.push(`${fieldPrefix}.indexed: type "${field.type}" cannot be indexed`);
					else if (field.indexed === true && field.type === "reference" && typeof field.validation?.targetCollection === "string") errors.push(`${fieldPrefix}.indexed: a reference field with a targetCollection stores no column to index`);
					if (field.type === "repeater") {
						const subFields = field.validation?.subFields;
						if ("fields" in field) warnings.push(`${fieldPrefix}.fields: repeater sub-fields must be defined in validation.subFields; these fields are ignored`);
						else if (!Array.isArray(subFields) || subFields.length === 0) warnings.push(`${fieldPrefix}.validation.subFields: repeater needs a non-empty array of sub-fields, so its rows have nothing to edit`);
					}
				}
			}
		}
	}
	if (seed.relations) if (!Array.isArray(seed.relations)) errors.push("relations must be an array");
	else {
		const relationSlugs = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.relations.length; i++) {
			const relation = seed.relations[i];
			const prefix = `relations[${i}]`;
			if (!relation) continue;
			if (!relation.slug) errors.push(`${prefix}: slug is required`);
			else {
				if (!COLLECTION_FIELD_SLUG_PATTERN.test(relation.slug)) errors.push(`${prefix}.slug: must start with a letter and contain only lowercase letters, numbers, and underscores`);
				if (relation.slug.length > MAX_SLUG_LENGTH) errors.push(`${prefix}.slug: must be ${MAX_SLUG_LENGTH} characters or fewer`);
				if (relationSlugs.has(relation.slug)) errors.push(`${prefix}.slug: duplicate relation slug "${relation.slug}"`);
				relationSlugs.add(relation.slug);
			}
			for (const end of ["parentCollection", "childCollection"]) {
				const value = relation[end];
				if (!value) errors.push(`${prefix}: ${end} is required`);
				else if (!COLLECTION_FIELD_SLUG_PATTERN.test(value)) errors.push(`${prefix}.${end}: "${value}" is not a valid collection slug`);
			}
			for (const label of ["parentLabel", "childLabel"]) if (!relation[label]) errors.push(`${prefix}: ${label} is required`);
			for (const label of ["parentLabelSingular", "childLabelSingular"]) {
				const value = relation[label];
				if (value !== void 0 && typeof value !== "string") errors.push(`${prefix}.${label}: must be a string`);
			}
			for (const limit of ["maxChildrenPerParent", "maxParentsPerChild"]) {
				const value = relation[limit];
				if (value === void 0 || value === null) continue;
				if (!Number.isInteger(value) || value < 1) errors.push(`${prefix}.${limit}: must be a positive integer, or null for unlimited`);
			}
		}
	}
	if (seed.taxonomies) if (!Array.isArray(seed.taxonomies)) errors.push("taxonomies must be an array");
	else {
		const taxonomyNames = /* @__PURE__ */ new Set();
		const taxonomiesById = /* @__PURE__ */ new Map();
		for (const taxonomy of seed.taxonomies) if (taxonomy.id) taxonomiesById.set(taxonomy.id, taxonomy);
		const structureDeclarations = /* @__PURE__ */ new Map();
		for (let i = 0; i < seed.taxonomies.length; i++) {
			const taxonomy = seed.taxonomies[i];
			const prefix = `taxonomies[${i}]`;
			if (!taxonomy.name) errors.push(`${prefix}: name is required`);
			else {
				const locale = resolveConfiguredLocale(taxonomy.locale ?? defaultLocale);
				const key = `${taxonomy.name}::${locale}`;
				if (taxonomyNames.has(key)) errors.push(taxonomy.locale ? `${prefix}.name: duplicate taxonomy "${taxonomy.name}" in locale "${taxonomy.locale}"` : `${prefix}.name: duplicate taxonomy name "${taxonomy.name}"`);
				taxonomyNames.add(key);
			}
			if (!taxonomy.label) errors.push(`${prefix}: label is required`);
			const structureSource = findTaxonomyStructureSource(taxonomy, taxonomiesById);
			if (taxonomy.translationOf && (taxonomy.hierarchical === void 0 || taxonomy.collections === void 0)) {
				if (!structureSource) errors.push(`${prefix}.translationOf: the translationOf chain from "${taxonomy.translationOf}" loops, so hierarchical and collections are required`);
				else if (structureSource === taxonomy) errors.push(`${prefix}.translationOf: "${taxonomy.translationOf}" is not an entry of taxonomy "${taxonomy.name}", so hierarchical and collections are required`);
			}
			if (taxonomy.hierarchical === void 0 && !taxonomy.translationOf) errors.push(`${prefix}: hierarchical is required`);
			if (taxonomy.collections === void 0) {
				if (!taxonomy.translationOf) errors.push(`${prefix}.collections: must be an array`);
			} else if (!Array.isArray(taxonomy.collections)) errors.push(`${prefix}.collections: must be an array`);
			else if (taxonomy.collections.length === 0 && !taxonomy.translationOf) warnings.push(`${prefix}.collections: taxonomy "${taxonomy.name}" is not assigned to any collections`);
			if (structureSource && structureSource !== taxonomy) {
				if (declaresDifferentStructure(taxonomy, structureSource)) warnings.push(`${prefix}: hierarchical and collections come from taxonomies[${seed.taxonomies.indexOf(structureSource)}], so the values declared here are ignored`);
			} else if (structureSource && taxonomy.name) {
				const declaring = structureDeclarations.get(taxonomy.name);
				if (!declaring) structureDeclarations.set(taxonomy.name, taxonomy);
				else if (declaresDifferentStructure(taxonomy, declaring)) warnings.push(`${prefix}: hierarchical and collections differ from taxonomies[${seed.taxonomies.indexOf(declaring)}]; every locale of taxonomy "${taxonomy.name}" shares them, so only one entry's values apply`);
			}
			const hierarchical = (structureSource ?? taxonomy).hierarchical;
			if (taxonomy.terms) if (!Array.isArray(taxonomy.terms)) errors.push(`${prefix}.terms: must be an array`);
			else {
				const termSlugs = /* @__PURE__ */ new Set();
				for (let j = 0; j < taxonomy.terms.length; j++) {
					const term = taxonomy.terms[j];
					const termPrefix = `${prefix}.terms[${j}]`;
					if (!term.slug) errors.push(`${termPrefix}: slug is required`);
					else {
						const locale = resolveConfiguredLocale(term.locale ?? taxonomy.locale ?? defaultLocale);
						const key = `${term.slug}::${locale}`;
						if (termSlugs.has(key)) errors.push(`${termPrefix}.slug: duplicate term slug "${term.slug}" in taxonomy "${taxonomy.name}"`);
						termSlugs.add(key);
					}
					if (!term.label) errors.push(`${termPrefix}: label is required`);
					if (term.parent && hierarchical) {} else if (term.parent && !hierarchical) warnings.push(`${termPrefix}.parent: taxonomy "${taxonomy.name}" is not hierarchical, parent will be ignored`);
				}
				if (hierarchical && taxonomy.terms) for (let j = 0; j < taxonomy.terms.length; j++) {
					const term = taxonomy.terms[j];
					const termLocale = resolveConfiguredLocale(term.locale ?? taxonomy.locale ?? defaultLocale);
					if (term.parent && !termSlugs.has(`${term.parent}::${termLocale}`)) errors.push(`${prefix}.terms[${j}].parent: parent term "${term.parent}" not found in taxonomy`);
					if (term.parent === term.slug) errors.push(`${prefix}.terms[${j}].parent: term cannot be its own parent`);
				}
			}
		}
	}
	if (seed.menus) if (!Array.isArray(seed.menus)) errors.push("menus must be an array");
	else {
		const menuNames = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.menus.length; i++) {
			const menu = seed.menus[i];
			const prefix = `menus[${i}]`;
			if (!menu.name) errors.push(`${prefix}: name is required`);
			else {
				const locale = resolveConfiguredLocale(menu.locale ?? defaultLocale);
				const key = `${menu.name}::${locale}`;
				if (menuNames.has(key)) errors.push(menu.locale ? `${prefix}.name: duplicate menu "${menu.name}" in locale "${menu.locale}"` : `${prefix}.name: duplicate menu name "${menu.name}"`);
				menuNames.add(key);
			}
			if (!menu.label) errors.push(`${prefix}: label is required`);
			if (!Array.isArray(menu.items)) errors.push(`${prefix}.items: must be an array`);
			else validateMenuItems(menu.items, prefix, errors, warnings);
		}
	}
	if (seed.redirects) if (!Array.isArray(seed.redirects)) errors.push("redirects must be an array");
	else {
		const redirectSources = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.redirects.length; i++) {
			const redirect = seed.redirects[i];
			const prefix = `redirects[${i}]`;
			if (!isRecord(redirect)) {
				errors.push(`${prefix}: must be an object`);
				continue;
			}
			const source = typeof redirect.source === "string" ? redirect.source : void 0;
			const destination = typeof redirect.destination === "string" ? redirect.destination : void 0;
			if (!source) errors.push(`${prefix}: source is required`);
			else {
				if (!isValidRedirectPath(source)) errors.push(`${prefix}.source: must be a path starting with / (no protocol-relative URLs, path traversal, or newlines)`);
				if (redirectSources.has(source)) errors.push(`${prefix}.source: duplicate redirect source "${source}"`);
				redirectSources.add(source);
			}
			if (!destination) errors.push(`${prefix}: destination is required`);
			else if (!isValidRedirectPath(destination) || !isSiteRelativeDestination(destination)) errors.push(`${prefix}.destination: must be a path starting with / (no protocol-relative URLs, backslash prefixes, path traversal, or control characters)`);
			if (source && isPattern(source)) {
				const patternError = validatePattern(source);
				if (patternError) errors.push(`${prefix}.source: invalid pattern: ${patternError}`);
				else if (destination) {
					const destinationError = validateDestinationParams(source, destination);
					if (destinationError) errors.push(`${prefix}.destination: ${destinationError}`);
				}
			}
			if (redirect.type !== void 0) {
				if (typeof redirect.type !== "number" || !REDIRECT_TYPES.has(redirect.type)) errors.push(`${prefix}.type: must be 301, 302, 307, or 308`);
			}
			if (redirect.enabled !== void 0 && typeof redirect.enabled !== "boolean") errors.push(`${prefix}.enabled: must be a boolean`);
			if (redirect.groupName !== void 0 && typeof redirect.groupName !== "string" && redirect.groupName !== null) errors.push(`${prefix}.groupName: must be a string or null`);
		}
	}
	if (seed.widgetAreas) if (!Array.isArray(seed.widgetAreas)) errors.push("widgetAreas must be an array");
	else {
		const areaNames = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.widgetAreas.length; i++) {
			const area = seed.widgetAreas[i];
			const prefix = `widgetAreas[${i}]`;
			if (!area.name) errors.push(`${prefix}: name is required`);
			else {
				if (areaNames.has(area.name)) errors.push(`${prefix}.name: duplicate widget area name "${area.name}"`);
				areaNames.add(area.name);
			}
			if (!area.label) errors.push(`${prefix}: label is required`);
			if (!Array.isArray(area.widgets)) errors.push(`${prefix}.widgets: must be an array`);
			else for (let j = 0; j < area.widgets.length; j++) {
				const widget = area.widgets[j];
				const widgetPrefix = `${prefix}.widgets[${j}]`;
				if (!widget.type) errors.push(`${widgetPrefix}: type is required`);
				else if (![
					"content",
					"menu",
					"component"
				].includes(widget.type)) errors.push(`${widgetPrefix}.type: must be "content", "menu", or "component"`);
				if (widget.type === "menu" && !widget.menuName) errors.push(`${widgetPrefix}: menuName is required for menu widgets`);
				if (widget.type === "component" && !widget.componentId) errors.push(`${widgetPrefix}: componentId is required for component widgets`);
				if ("settings" in widget) warnings.push(`${widgetPrefix}.settings: not applied; widget options belong in "props"`);
			}
		}
	}
	if (seed.sections) if (!Array.isArray(seed.sections)) errors.push("sections must be an array");
	else {
		const sectionSlugs = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.sections.length; i++) {
			const section = seed.sections[i];
			const prefix = `sections[${i}]`;
			if (!section.slug) errors.push(`${prefix}: slug is required`);
			else {
				if (!SLUG_PATTERN.test(section.slug)) errors.push(`${prefix}.slug: must contain only lowercase letters, numbers, and hyphens`);
				if (sectionSlugs.has(section.slug)) errors.push(`${prefix}.slug: duplicate section slug "${section.slug}"`);
				sectionSlugs.add(section.slug);
			}
			if (!section.title) errors.push(`${prefix}: title is required`);
			if (!Array.isArray(section.content)) errors.push(`${prefix}.content: must be an array`);
			if (section.source && ![
				"theme",
				"user",
				"import"
			].includes(section.source)) errors.push(`${prefix}.source: must be "theme", "user", or "import"`);
		}
	}
	if (seed.bylines) if (!Array.isArray(seed.bylines)) errors.push("bylines must be an array");
	else {
		const bylineIds = /* @__PURE__ */ new Set();
		const bylineSlugs = /* @__PURE__ */ new Set();
		for (let i = 0; i < seed.bylines.length; i++) {
			const byline = seed.bylines[i];
			const prefix = `bylines[${i}]`;
			if (!byline.id) errors.push(`${prefix}: id is required`);
			else {
				if (bylineIds.has(byline.id)) errors.push(`${prefix}.id: duplicate byline id "${byline.id}"`);
				bylineIds.add(byline.id);
			}
			if (!byline.slug) errors.push(`${prefix}: slug is required`);
			else {
				if (!SLUG_PATTERN.test(byline.slug)) errors.push(`${prefix}.slug: must contain only lowercase letters, numbers, and hyphens`);
				if (bylineSlugs.has(byline.slug)) errors.push(`${prefix}.slug: duplicate byline slug "${byline.slug}"`);
				bylineSlugs.add(byline.slug);
			}
			if (!byline.displayName) errors.push(`${prefix}: displayName is required`);
			if (byline.avatar !== void 0) {
				const avatar = byline.avatar;
				if (!isRecord(avatar)) errors.push(`${prefix}.avatar: must be an object`);
				else {
					if (typeof avatar.storageKey !== "string" || avatar.storageKey.length === 0 || avatar.storageKey !== avatar.storageKey.trim()) errors.push(`${prefix}.avatar.storageKey: must be a non-empty string with no leading or trailing whitespace`);
					for (const key of [
						"alt",
						"filename",
						"mimeType"
					]) if (avatar[key] !== void 0 && typeof avatar[key] !== "string") errors.push(`${prefix}.avatar.${key}: must be a string`);
					for (const key of ["filename", "mimeType"]) {
						const v = avatar[key];
						if (typeof v === "string" && (v.length === 0 || v !== v.trim())) errors.push(`${prefix}.avatar.${key}: must not be empty or whitespace-padded`);
					}
					for (const key of ["width", "height"]) {
						const v = avatar[key];
						if (v !== void 0 && (typeof v !== "number" || !Number.isFinite(v) || v < 0)) errors.push(`${prefix}.avatar.${key}: must be a non-negative number`);
					}
				}
			}
		}
	}
	if (seed.content) if (typeof seed.content !== "object" || Array.isArray(seed.content)) errors.push("content must be an object (collection -> entries)");
	else for (const [collectionSlug, entries] of Object.entries(seed.content)) {
		if (!Array.isArray(entries)) {
			errors.push(`content.${collectionSlug}: must be an array`);
			continue;
		}
		const collectionRoutable = seed.collections?.find((collection) => collection.slug === collectionSlug)?.routable !== false;
		const entryIds = /* @__PURE__ */ new Set();
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			const prefix = `content.${collectionSlug}[${i}]`;
			if (!entry.id) errors.push(`${prefix}: id is required`);
			else {
				if (entryIds.has(entry.id)) errors.push(`${prefix}.id: duplicate entry id "${entry.id}" in collection "${collectionSlug}"`);
				entryIds.add(entry.id);
			}
			const hasSlug = typeof entry.slug === "string" && entry.slug.trim().length > 0;
			if (entry.slug !== void 0 && entry.slug !== null && typeof entry.slug !== "string") errors.push(`${prefix}.slug: must be a string`);
			if (collectionRoutable && !hasSlug) errors.push(`${prefix}: slug is required`);
			if (!entry.data || typeof entry.data !== "object") errors.push(`${prefix}: data must be an object`);
			if (entry.translationOf) {
				if (!entry.locale) errors.push(`${prefix}: locale is required when translationOf is set`);
			}
		}
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			if (entry.translationOf && !entryIds.has(entry.translationOf)) errors.push(`content.${collectionSlug}[${i}].translationOf: references "${entry.translationOf}" which is not in this collection`);
		}
	}
	if (seed.menus && seed.content) {
		const allContentIds = /* @__PURE__ */ new Set();
		for (const entries of Object.values(seed.content)) if (Array.isArray(entries)) {
			for (const entry of entries) if (entry.id) allContentIds.add(entry.id);
		}
		for (const menu of seed.menus) if (Array.isArray(menu.items)) validateMenuItemRefs(menu.items, allContentIds, warnings);
	}
	if (seed.content) {
		const seedBylineIds = new Set((seed.bylines ?? []).map((byline) => byline.id));
		for (const [collectionSlug, entries] of Object.entries(seed.content)) {
			if (!Array.isArray(entries)) continue;
			for (let i = 0; i < entries.length; i++) {
				const entry = entries[i];
				if (!entry.bylines) continue;
				if (!Array.isArray(entry.bylines)) {
					errors.push(`content.${collectionSlug}[${i}].bylines: must be an array`);
					continue;
				}
				for (let j = 0; j < entry.bylines.length; j++) {
					const credit = entry.bylines[j];
					const prefix = `content.${collectionSlug}[${i}].bylines[${j}]`;
					if (!credit.byline) {
						errors.push(`${prefix}.byline: is required`);
						continue;
					}
					if (!seedBylineIds.has(credit.byline)) errors.push(`${prefix}.byline: references unknown byline "${credit.byline}"`);
				}
			}
		}
	}
	return {
		valid: errors.length === 0,
		errors,
		warnings
	};
}
/**
* Validate menu items recursively
*/
function validateMenuItems(items, prefix, errors, warnings) {
	for (let i = 0; i < items.length; i++) {
		const raw = items[i];
		const itemPrefix = `${prefix}.items[${i}]`;
		if (!isRecord(raw)) {
			errors.push(`${itemPrefix}: must be an object`);
			continue;
		}
		const item = raw;
		const itemType = typeof item.type === "string" ? item.type : void 0;
		if (!itemType) errors.push(`${itemPrefix}: type is required`);
		else if (![
			"custom",
			"page",
			"post",
			"taxonomy",
			"collection"
		].includes(itemType)) errors.push(`${itemPrefix}.type: must be "custom", "page", "post", "taxonomy", or "collection"`);
		if (itemType === "custom" && !item.url) errors.push(`${itemPrefix}: url is required for custom menu items`);
		if ((itemType === "page" || itemType === "post") && !item.ref) errors.push(`${itemPrefix}: ref is required for page/post menu items`);
		if (Array.isArray(item.children)) validateMenuItems(item.children, itemPrefix, errors, warnings);
	}
}
/**
* Validate menu item references exist in content
*/
function validateMenuItemRefs(items, contentIds, warnings) {
	for (const item of items) {
		if ((item.type === "page" || item.type === "post") && item.ref) {
			if (!contentIds.has(item.ref)) warnings.push(`Menu item references content "${item.ref}" which is not in the seed file`);
		}
		if (item.children) validateMenuItemRefs(item.children, contentIds, warnings);
	}
}
export { validateSeed as n, validate_exports as r, findTaxonomyStructureSource as t };
