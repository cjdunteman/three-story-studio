import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { i as getSiteSettingWithDb, o as getSiteSettingsWithDb, u as setSiteSettings } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
// node_modules/emdash/dist/settings--XlUdUaI.mjs
var settings_exports = /* @__PURE__ */ __exportAll({
	handleSettingsGet: () => handleSettingsGet,
	handleSettingsUpdate: () => handleSettingsUpdate
});
/**
* Get all site settings
*/
async function handleSettingsGet(db, storage) {
	try {
		return {
			success: true,
			data: await getSiteSettingsWithDb(db, storage)
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SETTINGS_READ_ERROR",
				message: "Failed to get settings"
			}
		};
	}
}
/**
* Update site settings
*/
async function handleSettingsUpdate(db, storage, input) {
	try {
		const { timezone } = input;
		if (typeof timezone === "string" && !isValidTimeZone(timezone) && timezone !== await getSiteSettingWithDb("timezone", db)) return {
			success: false,
			error: {
				code: "VALIDATION_ERROR",
				message: `timezone: "${timezone}" is not an IANA timezone (for example "Europe/Lisbon" or "UTC")`
			}
		};
		await setSiteSettings(input, db);
		return {
			success: true,
			data: await getSiteSettingsWithDb(db, storage)
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SETTINGS_UPDATE_ERROR",
				message: "Failed to update settings"
			}
		};
	}
}
function isValidTimeZone(timezone) {
	try {
		return Boolean(new Intl.DateTimeFormat("en", { timeZone: timezone }).resolvedOptions().timeZone);
	} catch {
		return false;
	}
}
export { handleSettingsUpdate as n, settings_exports as r, handleSettingsGet as t };
