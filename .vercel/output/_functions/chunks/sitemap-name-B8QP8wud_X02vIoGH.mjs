import { n as isValidSchemaSlug } from "./slug-aVnUV4SL_BsIV7CXs.mjs";
// node_modules/emdash/dist/sitemap-name-B8QP8wud.mjs
/**
* The `{name}` in a per-collection sitemap path, `/sitemap-{name}.xml`.
*/
/** `{collection}` for page 1, `{collection}-{n}` for page n from 2 up. */
var SITEMAP_NAME_RE = /^([a-z][a-z0-9_]*)(?:-([2-9]|[1-9]\d{1,5}))?$/;
/**
* The collection and page a sitemap name refers to, or null when the name
* can't belong to any collection (its collection part must be a valid
* collection slug).
*/
function parseCollectionSitemapName(name) {
	const match = SITEMAP_NAME_RE.exec(name);
	const collection = match?.[1];
	if (!match || !isValidSchemaSlug(collection)) return null;
	return {
		collection,
		page: match[2] ? Number(match[2]) : 1
	};
}
export { parseCollectionSitemapName as t };
