import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { l as emdashLoader } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { rt as AstroError, w as LiveContentConfigError } from "./errors-data_BZ8TGgRd.mjs";
import { r as LIVE_CONTENT_TYPE } from "./consts_BJI_5Esz.mjs";
// node_modules/astro/dist/content/config.js
function getImporterFilename() {
	const stackLine = (/* @__PURE__ */ new Error()).stack?.split("\n").find((line) => !line.includes("defineCollection") && !line.includes("defineLiveCollection") && !line.includes("getImporterFilename") && !line.startsWith("Error"));
	if (!stackLine) return;
	return /\/((?:src|chunks)\/.*?):\d+:\d+/.exec(stackLine)?.[1] ?? void 0;
}
function defineLiveCollection(config) {
	const importerFilename = getImporterFilename();
	if (importerFilename && !importerFilename.includes("live.config")) throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Live collections must be defined in a `src/live.config.ts` file.", importerFilename ?? "your content config file")
	});
	config.type ??= LIVE_CONTENT_TYPE;
	if (config.type !== "live") throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Collections in a live config file must have a type of `live`.", importerFilename)
	});
	if (!config.loader) throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Live collections must have a `loader` defined.", importerFilename)
	});
	if (!config.loader.loadCollection || !config.loader.loadEntry) throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("Live collection loaders must have `loadCollection()` and `loadEntry()` methods. Please check that you are not using a loader intended for build-time collections", importerFilename)
	});
	if (typeof config.schema === "function") throw new AstroError({
		...LiveContentConfigError,
		message: LiveContentConfigError.message("The schema cannot be a function for live collections. Please use a schema object instead.", importerFilename)
	});
	return config;
}
// src/live.config.ts
var collections = { _emdash: defineLiveCollection({ loader: emdashLoader() }) };
export { collections };
