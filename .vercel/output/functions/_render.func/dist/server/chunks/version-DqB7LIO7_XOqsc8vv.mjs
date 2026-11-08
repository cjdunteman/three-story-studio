import { u as isPostgres } from "./dialect-helpers-B1XN2HGB_BZ54-K-V.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/version-DqB7LIO7.mjs
var SITE_OPTION_PREFIX = "site:%";
/** Returns the canonical JSON representation of a site-settings revision fingerprint. */
function normalizeSiteSettingsVersion(input) {
	const decoded = JSON.parse(input);
	if (!Array.isArray(decoded)) throw new Error("Invalid site settings version");
	const entries = [];
	for (const entry of decoded) {
		if (!Array.isArray(entry)) throw new Error("Invalid site settings version entry");
		const name = entry[0];
		const revision = entry[1];
		if (typeof name !== "string" || typeof revision !== "string") throw new Error("Invalid site settings version entry");
		entries.push([name, revision]);
	}
	return JSON.stringify(entries.toSorted(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
}
/**
* Builds the scalar query used to observe site-setting revisions alongside an
* existing read. It deliberately does not read option values.
*/
function siteSettingsVersionQuery(db) {
	if (isPostgres(db)) return sql`(
			select coalesce(
				json_agg(json_build_array(name, revision) order by name)::text,
				'[]'
			)
			from options
			where name like ${SITE_OPTION_PREFIX}
		)`;
	return sql`(
		select coalesce(
			json_group_array(json_array(name, revision)),
			'[]'
		)
		from (
			select name, revision
			from options
			where name glob ${"site:*"}
			order by name
		)
	)`;
}
export { siteSettingsVersionQuery as n, normalizeSiteSettingsVersion as t };
