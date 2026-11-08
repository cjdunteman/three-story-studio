// node_modules/emdash/dist/slug-aVnUV4SL.mjs
/**
* The collection and field slug rule.
*/
/** Lowercase letter first, then lowercase letters, digits, and underscores. */
var SCHEMA_SLUG_PATTERN = /^[a-z][a-z0-9_]*$/;
/** Whether `value` is a valid collection or field slug. */
function isValidSchemaSlug(value) {
	return typeof value === "string" && value.length > 0 && value.length <= 63 && SCHEMA_SLUG_PATTERN.test(value);
}
export { isValidSchemaSlug as n, SCHEMA_SLUG_PATTERN as t };
