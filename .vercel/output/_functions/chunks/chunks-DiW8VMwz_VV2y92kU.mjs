import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
// node_modules/emdash/dist/chunks-DiW8VMwz.mjs
var chunks_exports = /* @__PURE__ */ __exportAll({
	SQL_BATCH_SIZE: () => 50,
	chunks: () => chunks
});
/**
* Split an array into chunks of at most `size` elements.
*
* Used to keep SQL `IN (?, ?, …)` clauses within Cloudflare D1's
* bound-parameter limit (~100 per statement).
*/
function chunks(arr, size) {
	if (arr.length === 0) return [];
	const result = [];
	for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
	return result;
}
export { chunks_exports as n, chunks as t };
