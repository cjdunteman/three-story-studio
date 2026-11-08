// node_modules/emdash/src/i18n/config.ts
var I18N_CONFIG_KEY = Symbol.for("emdash:i18n-config");
function configStore() {
	return globalThis;
}
/**
* Get the current i18n config.
* Returns null if i18n is not configured.
*/
function getI18nConfig() {
	return configStore()[I18N_CONFIG_KEY] ?? null;
}
/** Match a locale path or Astro code to the canonical content locale. */
function resolveConfiguredLocale(locale, config = getI18nConfig()) {
	const configured = config?.locales.find((candidate) => candidate.toLowerCase() === locale.toLowerCase());
	if (configured) return configured;
	const aliased = Object.entries(config?.localeAliases ?? {}).find(([code]) => code.toLowerCase() === locale.toLowerCase())?.[1];
	if (aliased === void 0) return locale;
	return config?.locales.find((candidate) => candidate.toLowerCase() === aliased.toLowerCase()) ?? aliased;
}
/** Stored locale spellings for one configured locale, in read-preference order. */
function getLocaleCandidates(locale) {
	const canonical = resolveConfiguredLocale(locale);
	const candidates = [canonical];
	const seen = /* @__PURE__ */ new Set([canonical.toLowerCase()]);
	for (const code of Object.keys(getI18nConfig()?.localeAliases ?? {})) if (resolveConfiguredLocale(code) === canonical && !seen.has(code.toLowerCase())) {
		candidates.push(code);
		seen.add(code.toLowerCase());
	}
	return candidates;
}
/** Rank a stored row's locale for a lookup by path or code. */
function getLocaleRank(stored, requested) {
	const candidates = getLocaleCandidates(requested);
	const rank = candidates.findIndex((candidate) => candidate.toLowerCase() === stored.toLowerCase());
	return rank === -1 ? candidates.length : rank;
}
/** Rank stored locale variants before moving to the next fallback locale. */
function getLocaleChainRank(stored, chain) {
	let offset = 0;
	for (const locale of chain) {
		const candidates = getLocaleCandidates(locale);
		const rank = getLocaleRank(stored, locale);
		if (rank < candidates.length) return offset + rank;
		offset += candidates.length;
	}
	return offset;
}
/**
* Check if i18n is enabled.
* Returns true when multiple locales are configured.
*/
function isI18nEnabled() {
	const config = getI18nConfig();
	return config != null && config.locales.length > 1;
}
/**
* Resolve fallback locale chain for a given locale.
* Returns array of locales to try, from most preferred to least.
* Always ends with defaultLocale.
*/
function getFallbackChain(locale) {
	const config = getI18nConfig();
	if (!config) return [locale];
	locale = resolveConfiguredLocale(locale, config);
	const chain = [locale];
	let current = locale;
	const visited = /* @__PURE__ */ new Set([locale]);
	while (config.fallback?.[current]) {
		const next = resolveConfiguredLocale(config.fallback[current], config);
		if (visited.has(next)) break;
		chain.push(next);
		visited.add(next);
		current = next;
	}
	if (!visited.has(config.defaultLocale)) chain.push(config.defaultLocale);
	return chain;
}
export { getLocaleRank as a, getLocaleChainRank as i, getI18nConfig as n, isI18nEnabled as o, getLocaleCandidates as r, resolveConfiguredLocale as s, getFallbackChain as t };
