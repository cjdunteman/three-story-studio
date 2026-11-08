// node_modules/emdash/dist/settings-Dd1uivmQ.mjs
/**
* Classification of `options` rows for site transfer.
*
* - `portable`: exported as `setting` records (explicit allowlist, never a
*   prefix match).
* - `targetLocal`: belongs to the target installation and is never exported
*   or overwritten by an import.
* - `excluded`: everything else (secrets, runtime state, plugin options).
*/
var PORTABLE_SETTING_NAMES = [
	"emdash:locale",
	"emdash:site_tagline",
	"emdash:site_title",
	"site:dateFormat",
	"site:favicon",
	"site:logo",
	"site:postsPerPage",
	"site:seo",
	"site:social",
	"site:tagline",
	"site:timezone",
	"site:title"
];
var PORTABLE_SETTINGS = new Set(PORTABLE_SETTING_NAMES);
/** Settings whose value is a plan decision rather than always taken from the package. */
var DECIDED_SETTING_NAMES = {
	title: ["site:title", "emdash:site_title"],
	tagline: ["site:tagline", "emdash:site_tagline"]
};
/** Options the importer resets after writing settings. */
var POST_IMPORT_OPTION_RESETS = {
	bumpVersion: ["byline_fields_version"],
	delete: ["_redirect_loop_ids"]
};
function isPortableSettingName(name) {
	return PORTABLE_SETTINGS.has(name);
}
/** Settings whose stored value is a `{ mediaId, alt? }` media reference, and where. */
var SETTING_MEDIA_REFERENCE_PATHS = Object.freeze({
	"site:logo": [["mediaId"]],
	"site:favicon": [["mediaId"]],
	"site:seo": [["defaultOgImage", "mediaId"]]
});
/** Media ids referenced by a portable setting's value. */
function settingMediaIds(name, value) {
	if (!isPortableSettingName(name)) return [];
	const paths = SETTING_MEDIA_REFERENCE_PATHS[name];
	if (!paths) return [];
	const ids = [];
	for (const path of paths) {
		let current = value;
		for (const segment of path) current = current !== null && typeof current === "object" && !Array.isArray(current) && Object.hasOwn(current, segment) ? Reflect.get(current, segment) : void 0;
		if (typeof current === "string" && current.length > 0) ids.push(current);
	}
	return ids;
}
export { settingMediaIds as i, PORTABLE_SETTING_NAMES as n, POST_IMPORT_OPTION_RESETS as r, DECIDED_SETTING_NAMES as t };
