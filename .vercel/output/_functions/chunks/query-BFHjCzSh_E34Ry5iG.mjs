import { h as getLocaleCandidates, m as getI18nConfig } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { sql } from "kysely";
// node_modules/emdash/dist/query-BFHjCzSh.mjs
/** Match both canonical paths and code-stamped rows written by older versions. */
function localeMatches(column, locale) {
	const candidates = getLocaleCandidates(locale);
	if (candidates.length === 1) return sql`${sql.ref(column)} = ${candidates[0]}`;
	return sql`${sql.ref(column)} IN (${sql.join(candidates)})`;
}
/** Prefer the configured path, then its Astro codes in configuration order. */
function localeOrder(column, locale) {
	const candidates = getLocaleCandidates(locale);
	return sql`CASE lower(${sql.ref(column)}) ${sql.join(candidates.map((candidate, rank) => sql`WHEN ${candidate.toLowerCase()} THEN ${sql.lit(rank)}`), sql` `)} ELSE ${sql.lit(candidates.length)} END`;
}
/** Compare locale columns without losing rows stored under an Astro code. */
function canonicalLocaleColumn(column) {
	const aliases = (getI18nConfig()?.locales ?? []).flatMap((locale) => getLocaleCandidates(locale).slice(1).map((code) => ({
		code,
		locale
	})));
	if (aliases.length === 0) return sql`${sql.ref(column)}`;
	return sql`CASE lower(${sql.ref(column)}) ${sql.join(aliases.map(({ code, locale }) => sql`WHEN ${code.toLowerCase()} THEN ${locale.toLowerCase()}`), sql` `)} ELSE lower(${sql.ref(column)}) END`;
}
/** Rank a row's code within its own configured locale; paths always rank first. */
function storedLocaleOrder(column) {
	const aliases = (getI18nConfig()?.locales ?? []).flatMap((locale) => getLocaleCandidates(locale).slice(1).map((code, index) => ({
		code,
		rank: index + 1
	})));
	if (aliases.length === 0) return sql`0`;
	return sql`CASE lower(${sql.ref(column)}) ${sql.join(aliases.map(({ code, rank }) => sql`WHEN ${code.toLowerCase()} THEN ${sql.lit(rank)}`), sql` `)} ELSE 0 END`;
}
export { storedLocaleOrder as i, localeMatches as n, localeOrder as r, canonicalLocaleColumn as t };
