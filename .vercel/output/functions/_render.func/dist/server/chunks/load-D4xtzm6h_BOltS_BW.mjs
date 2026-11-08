import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
// node_modules/emdash/dist/load-D4xtzm6h.mjs
var load_exports = /* @__PURE__ */ __exportAll({
	loadSeed: () => loadSeed,
	loadUserSeed: () => loadUserSeed
});
async function getSeedModule() {
	return import("./seed_CSu9JVUY.mjs");
}
/**
* Load the seed file (user seed or default).
*/
async function loadSeed() {
	const { seed } = await getSeedModule();
	return seed;
}
/**
* Load the user's seed file, or null if none exists.
*/
async function loadUserSeed() {
	const { userSeed } = await getSeedModule();
	return userSeed ?? null;
}
export { loadUserSeed as n, load_exports as r, loadSeed as t };
