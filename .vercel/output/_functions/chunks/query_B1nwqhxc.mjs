import { n as getI18nConfig, r as getLocaleCandidates } from "./config_D2Z0BYnM.mjs";
import { sql } from "kysely";
// node_modules/emdash/src/database/validate.ts
/**
* SQL Identifier Validation
*
* Validates identifiers (table names, column names, index names) before
* they are used in raw SQL expressions. This is the primary defense against
* SQL injection via dynamic identifier interpolation.
*
* @see AGENTS.md § Database: Never Interpolate Into SQL
*/
/**
* Pattern for safe SQL identifiers.
* Must start with a lowercase letter, followed by lowercase letters, digits, or underscores.
*/
var IDENTIFIER_PATTERN = /^[a-z][a-z0-9_]*$/;
/**
* Maximum length for SQL identifiers.
* SQLite has no formal limit, but we cap at 128 for sanity.
*/
var MAX_IDENTIFIER_LENGTH = 128;
/**
* Error thrown when an identifier fails validation.
*/
var IdentifierError = class extends Error {
	identifier;
	constructor(message, identifier) {
		super(message);
		this.identifier = identifier;
		this.name = "IdentifierError";
	}
};
/**
* Validate that a string is a safe SQL identifier.
*
* Safe identifiers match `/^[a-z][a-z0-9_]*$/` and are at most 128 characters.
* This prevents SQL injection when identifiers must be interpolated into raw SQL
* (e.g., dynamic table names, column names in json_extract paths).
*
* @param value - The string to validate
* @param label - Human-readable label for error messages (e.g., "field name", "table name")
* @throws {IdentifierError} If the value is not a valid identifier
*
* @example
* ```typescript
* validateIdentifier(fieldName, "field name");
* // safe to use in: json_extract(data, '$.${fieldName}')
* ```
*/
function validateIdentifier(value, label = "identifier") {
	if (!value || typeof value !== "string") throw new IdentifierError(`${label} must be a non-empty string`, String(value));
	if (value.length > MAX_IDENTIFIER_LENGTH) throw new IdentifierError(`${label} must be ${MAX_IDENTIFIER_LENGTH} characters or less, got ${value.length}`, value);
	if (!IDENTIFIER_PATTERN.test(value)) throw new IdentifierError(`${label} must match /^[a-z][a-z0-9_]*$/ (got "${value}")`, value);
}
// node_modules/emdash/src/i18n/query.ts
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
export { validateIdentifier as a, storedLocaleOrder as i, localeMatches as n, localeOrder as r, canonicalLocaleColumn as t };
