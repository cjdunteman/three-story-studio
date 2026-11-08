// node_modules/emdash/dist/chrome-tags-BIKBMZYO.mjs
/**
* Stable cache tags for EmDash chrome (settings, menus, taxonomies, widget areas).
*
* These tags are used by both the public read helpers (cacheHint) and the
* admin write routes (cache.invalidate), closing the Workers edge cache loop.
*/
var PREFIX = "emdash";
function siteSettingsTag() {
	return `${PREFIX}:settings`;
}
function menuTag(name) {
	return `${PREFIX}:menu:${name}`;
}
function taxonomyTag(name) {
	return `${PREFIX}:taxonomy:${name}`;
}
function widgetAreaTag(name) {
	return `${PREFIX}:widget-area:${name}`;
}
export { widgetAreaTag as i, siteSettingsTag as n, taxonomyTag as r, menuTag as t };
