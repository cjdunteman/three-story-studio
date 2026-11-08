import { i as settingMediaIds } from "./settings-Dd1uivmQ_8f9uEka3.mjs";
// node_modules/emdash/dist/site-settings-DRHfX7bq.mjs
/**
* Media references held by site settings.
*
* Usage reads parse these from the stored `site:*` options on every read, so
* a change through any writer of those options shows up on the next read.
*/
var MEDIA_USAGE_SITE_SETTINGS = [
	"logo",
	"favicon",
	"seo.defaultOgImage"
];
/**
* One setting per option, which holds while each option has a single path in
* `SETTING_MEDIA_REFERENCE_PATHS`. A second path needs a setting of its own.
*/
var SITE_SETTING_OPTIONS = [
	["site:logo", "logo"],
	["site:favicon", "favicon"],
	["site:seo", "seo.defaultOgImage"]
];
var MEDIA_USAGE_SITE_SETTING_OPTIONS = SITE_SETTING_OPTIONS.map(([option]) => option);
/**
* Group the site settings that select each media item, in settings order.
*
* @param options Raw JSON option values keyed by option name.
*/
function groupSiteSettingMediaUsage(options) {
	const usage = /* @__PURE__ */ new Map();
	for (const [option, setting] of SITE_SETTING_OPTIONS) for (const mediaId of settingMediaIds(option, parseOption(options.get(option)))) {
		const settings = usage.get(mediaId);
		if (settings) settings.push(setting);
		else usage.set(mediaId, [setting]);
	}
	return usage;
}
function parseOption(value) {
	if (value == null) return void 0;
	try {
		return JSON.parse(value);
	} catch {
		return;
	}
}
export { MEDIA_USAGE_SITE_SETTING_OPTIONS as n, groupSiteSettingMediaUsage as r, MEDIA_USAGE_SITE_SETTINGS as t };
