import { p as getFallbackChain, v as isI18nEnabled } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./url-DTfGDJhI_CrwsbJIk.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { n as RevisionRepository } from "./revision-Dx7Uth1X_BtCIS0x4.mjs";
import { c as readStagedReferences, o as pageStagedGroups, t as RelationRepository } from "./staged-ByBmPFtX_FQ60UOHq.mjs";
import { f as getDb, m as loadEntriesByGroups } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { n as getReferenceFieldMap } from "./field-map-BSXdNGt5_DSyFhysB.mjs";
// node_modules/emdash/dist/resolve-BNnm8EkB.mjs
/**
* Resolve an entry's reference selections to loadable entries, for the public
* query path.
*
* The cost is bounded and predictable: one link read per selected field, then
* one entry read per *distinct* target collection — never one per link. A
* caller that selects no fields issues nothing at all, which is what keeps
* references off the logged-out hot path of every render that does not ask for
* them.
*/
function pageOptions(query) {
	if (query === true) return { limit: 50 };
	const requested = query.limit ?? 50;
	return {
		limit: Math.min(Math.max(requested, 1), 100),
		cursor: query.cursor
	};
}
function localeChainFor(locale) {
	if (locale === null) return [];
	return isI18nEnabled() ? getFallbackChain(locale) : [locale];
}
async function resolveReferencePages(options) {
	const fieldMap = await getReferenceFieldMap(options.collection);
	const requested = Object.entries(options.selection).filter((entry) => entry[1] !== void 0 && fieldMap.has(entry[0]));
	if (requested.length === 0) return {};
	const db = await getDb();
	const relations = new RelationRepository(db);
	const staged = options.serveDrafts && options.draftRevisionId ? readStagedReferences((await new RevisionRepository(db).findById(options.draftRevisionId))?.data) : void 0;
	const pages = new Map(await Promise.all(requested.map(async ([slug, query]) => {
		const binding = fieldMap.get(slug);
		const page = pageOptions(query);
		const stagedGroups = staged?.[slug];
		if (stagedGroups) return [slug, pageStagedGroups(stagedGroups, page)];
		const links = binding.side === "child" ? await relations.getParentsPageById(binding.relationId, options.entryGroup, page) : await relations.getChildrenPageById(binding.relationId, options.entryGroup, page);
		return [slug, {
			groups: links.items.map((link) => binding.side === "child" ? link.parentGroup : link.childGroup),
			nextCursor: links.nextCursor
		}];
	})));
	const groupsByCollection = /* @__PURE__ */ new Map();
	for (const [slug, page] of pages) {
		const target = fieldMap.get(slug).targetCollection;
		const groups = groupsByCollection.get(target) ?? /* @__PURE__ */ new Set();
		for (const group of page.groups) groups.add(group);
		groupsByCollection.set(target, groups);
	}
	const localeChain = localeChainFor(options.locale);
	const variantsByCollection = /* @__PURE__ */ new Map();
	await Promise.all(Array.from(groupsByCollection, async ([collection, groups]) => {
		const loaded = await loadEntriesByGroups(collection, [...groups], {
			publishedOnly: !options.serveDrafts,
			localeChain
		});
		const byGroup = /* @__PURE__ */ new Map();
		for (const entry of loaded) {
			const group = entry.data.translationGroup;
			if (typeof group === "string") byGroup.set(group, entry);
		}
		variantsByCollection.set(collection, byGroup);
	}));
	const resolved = {};
	for (const [slug, page] of pages) {
		const collection = fieldMap.get(slug).targetCollection;
		const byGroup = variantsByCollection.get(collection);
		const entries = [];
		for (const group of page.groups) {
			const variant = byGroup?.get(group);
			if (variant) entries.push(variant);
		}
		resolved[slug] = page.nextCursor ? {
			collection,
			entries,
			nextCursor: page.nextCursor
		} : {
			collection,
			entries
		};
	}
	return resolved;
}
export { resolveReferencePages };
