import { a as fileExtension, c as isRemotePath, d as removeBase, l as joinPaths, p as removeQueryString, u as prependForwardSlash } from "./path_jvl2hruy.mjs";
import { t as isRemoteAllowed } from "./remote_Z-Z8LuKO.mjs";
import { C as InvalidImageService, W as RemoteImageNotAllowed, c as ExpectedImageOptions, l as ExpectedNotESMImage, rt as AstroError, s as ExpectedImage } from "./errors-data_BZ8TGgRd.mjs";
import { i as recordStaticImage, n as isCollectingStaticImages } from "./_virtual_astro_logger_BFnT1nSb.mjs";
import { t as DEFAULT_HASH_PROPS } from "./consts_D_OkKG1J.mjs";
import { c as isESMImportedImage, i as inferRemoteSize, l as isRemoteImage, n as isLocalService, s as resolveDefaultOutputFormat, u as resolveSrc } from "./service_EhNdzXh1.mjs";
import { t as getAssetsPrefix } from "./getAssetsPrefix_Bl-SD0g7.mjs";
import { i as shorthash } from "./console_Cc8F-PUH.mjs";
// node_modules/astro/dist/assets/layout.js
var DEFAULT_RESOLUTIONS = [
	640,
	750,
	828,
	960,
	1080,
	1280,
	1668,
	1920,
	2048,
	2560,
	3200,
	3840,
	4480,
	5120,
	6016
];
var LIMITED_RESOLUTIONS = [
	640,
	750,
	828,
	1080,
	1280,
	1668,
	2048,
	2560
];
/**
* Gets the breakpoints for an image, based on the layout and width
*
* The rules are as follows:
*
* - For full-width layout we return all breakpoints smaller than the original image width
* - For fixed layout we return 1x and 2x the requested width, unless the original image is smaller than that.
* - For responsive layout we return all breakpoints smaller than 2x the requested width, unless the original image is smaller than that.
*/
var getWidths = ({ width, layout, breakpoints = DEFAULT_RESOLUTIONS, originalWidth }) => {
	const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
	if (layout === "full-width") return breakpoints.filter(smallerThanOriginal);
	if (!width) return [];
	const doubleWidth = width * 2;
	const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
	if (layout === "fixed") return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
	if (layout === "constrained") return [
		width,
		doubleWidth,
		...breakpoints
	].filter((w) => w <= maxSize).sort((a, b) => a - b);
	return [];
};
/**
* Gets the `sizes` attribute for an image, based on the layout and width
*/
var getSizesAttribute = ({ width, layout }) => {
	if (!width || !layout) return;
	switch (layout) {
		case "constrained": return `(min-width: ${width}px) ${width}px, 100vw`;
		case "fixed": return `${width}px`;
		case "full-width": return `100vw`;
		default: return;
	}
};
// node_modules/astro/dist/assets/types.js
function isImageMetadata(src) {
	return !!src.fsPath && !Object.prototype.propertyIsEnumerable.call(src, "fsPath");
}
// node_modules/astro/dist/assets/utils/image-asset.js
var RAW_SRC = Symbol.for("astro:image-asset:raw-src");
function getUntrackedImage(image) {
	if (typeof image !== "object" || image === null || !(RAW_SRC in image)) return image;
	const asset = image;
	const copy = {};
	for (const key of Object.keys(asset)) copy[key] = key === "src" ? asset[RAW_SRC] : asset[key];
	Object.defineProperty(copy, "fsPath", {
		value: asset.fsPath,
		enumerable: false
	});
	return copy;
}
// node_modules/astro/dist/assets/utils/deterministic-string.js
/**
* Vendored from deterministic-object-hash@2.0.2 (MIT)
* https://github.com/nicholasgasior/deterministic-object-hash
*
* Only `deterministicString` is needed - the async `deterministicHash` (which
* pulls in `node:crypto`) is intentionally excluded so this module stays
* runtime-agnostic (works in Node, workerd, browsers, etc.).
*/
var objConstructorString = Function.prototype.toString.call(Object);
function isPlainObject(value) {
	if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") return false;
	const proto = Object.getPrototypeOf(value);
	if (proto === null) return true;
	if (!Object.prototype.hasOwnProperty.call(proto, "constructor")) return false;
	return typeof proto.constructor === "function" && proto.constructor instanceof proto.constructor && Function.prototype.toString.call(proto.constructor) === objConstructorString;
}
/** Recursively serializes any JS value into a deterministic string. */
function deterministicString(input) {
	if (typeof input === "string") return JSON.stringify(input);
	else if (typeof input === "symbol" || typeof input === "function") return input.toString();
	else if (typeof input === "bigint") return `${input}n`;
	else if (input === globalThis || input === void 0 || input === null || typeof input === "boolean" || typeof input === "number" || typeof input !== "object") return `${input}`;
	else if (input instanceof Date) return `(${input.constructor.name}:${input.getTime()})`;
	else if (input instanceof RegExp || input instanceof Error || input instanceof WeakMap || input instanceof WeakSet) return `(${input.constructor.name}:${input.toString()})`;
	else if (input instanceof Set) {
		let ret = `(${input.constructor.name}:[`;
		for (const val of input.values()) ret += `${deterministicString(val)},`;
		ret += "])";
		return ret;
	} else if (Array.isArray(input) || input instanceof Int8Array || input instanceof Uint8Array || input instanceof Uint8ClampedArray || input instanceof Int16Array || input instanceof Uint16Array || input instanceof Int32Array || input instanceof Uint32Array || input instanceof Float32Array || input instanceof Float64Array || input instanceof BigInt64Array || input instanceof BigUint64Array) {
		let ret = `(${input.constructor.name}:[`;
		for (const [k, v] of input.entries()) ret += `(${k}:${deterministicString(v)}),`;
		ret += "])";
		return ret;
	} else if (input instanceof ArrayBuffer || input instanceof SharedArrayBuffer) {
		if (input.byteLength % 8 === 0) return deterministicString(new BigUint64Array(input));
		else if (input.byteLength % 4 === 0) return deterministicString(new Uint32Array(input));
		else if (input.byteLength % 2 === 0) return deterministicString(new Uint16Array(input));
		else {
			let ret = "(";
			for (let i = 0; i < input.byteLength; i++) ret += `${deterministicString(new Uint8Array(input.slice(i, i + 1)))},`;
			ret += ")";
			return ret;
		}
	} else if (input instanceof Map || isPlainObject(input)) {
		const sortable = [];
		const entries = input instanceof Map ? input.entries() : Object.entries(input);
		for (const [k, v] of entries) sortable.push([deterministicString(k), deterministicString(v)]);
		if (!(input instanceof Map)) {
			const symbolKeys = Object.getOwnPropertySymbols(input);
			for (let i = 0; i < symbolKeys.length; i++) sortable.push([deterministicString(symbolKeys[i]), deterministicString(input[symbolKeys[i]])]);
		}
		sortable.sort(([a], [b]) => a.localeCompare(b));
		let ret = `(${input.constructor.name}:[`;
		for (const [k, v] of sortable) ret += `(${k}:${v}),`;
		ret += "])";
		return ret;
	}
	const allEntries = [];
	for (const k in input) allEntries.push([deterministicString(k), deterministicString(input[k])]);
	const symbolKeys = Object.getOwnPropertySymbols(input);
	for (let i = 0; i < symbolKeys.length; i++) allEntries.push([deterministicString(symbolKeys[i]), deterministicString(input[symbolKeys[i]])]);
	allEntries.sort(([a], [b]) => a.localeCompare(b));
	let ret = `(${input.constructor.name}:[`;
	for (const [k, v] of allEntries) ret += `(${k}:${v}),`;
	ret += "])";
	return ret;
}
// node_modules/astro/dist/assets/utils/hash.js
var INVALID_CHAR_REGEX = /[\u0000-\u001F"#$%&*+,:;<=>?[\]^`{|}\u007F]/g;
/** Pure-string replacement for `path.posix.basename` (no node: import). */
function basename(filePath, ext) {
	let end = filePath.length;
	while (end > 0 && filePath[end - 1] === "/") end--;
	const stripped = filePath.slice(0, end);
	const lastSlash = stripped.lastIndexOf("/");
	const base = lastSlash === -1 ? stripped : stripped.slice(lastSlash + 1);
	if (ext && base.endsWith(ext)) return base.slice(0, base.length - ext.length);
	return base;
}
/** Pure-string replacement for `path.posix.dirname` (no node: import). */
function dirname(filePath) {
	const lastSlash = filePath.lastIndexOf("/");
	if (lastSlash === -1) return ".";
	if (lastSlash === 0) return "/";
	return filePath.slice(0, lastSlash);
}
/** Pure-string replacement for `path.posix.extname` (no node: import). */
function extname(filePath) {
	const base = basename(filePath);
	const dotIndex = base.lastIndexOf(".");
	if (dotIndex <= 0) return "";
	return base.slice(dotIndex);
}
/**
* Converts a file path and transformation properties into a formatted filename.
*
* `<prefixDirname>/<baseFilename>_<hash><outputExtension>`
*/
function propsToFilename(filePath, transform, hash) {
	let filename = decodeURIComponent(removeQueryString(filePath));
	const ext = extname(filename);
	if (filePath.startsWith("data:")) filename = shorthash(filePath);
	else filename = basename(filename, ext).replace(INVALID_CHAR_REGEX, "_");
	const prefixDirname = isESMImportedImage(transform.src) ? dirname(filePath) : "";
	let outputExt = transform.format ? `.${transform.format}` : ext;
	return `${prefixDirname}/${filename}_${hash}${outputExt}`;
}
/** Hashes the subset of transform properties that affect the output image. */
function hashTransform(transform, imageService, propertiesToHash) {
	const hashFields = propertiesToHash.reduce((acc, prop) => {
		acc[prop] = transform[prop];
		return acc;
	}, { imageService });
	return shorthash(deterministicString(hashFields));
}
// node_modules/astro/dist/assets/utils/url.js
/**
* Placeholder base URL used when creating URL objects from relative paths.
* This avoids collisions with actual URLs (e.g., absolute asset prefixes like 'http://localhost:4321')
*/
var PLACEHOLDER_BASE = "astro://placeholder";
/**
* Creates a URL object from a path or URL string, using a placeholder base for relative paths.
* This allows safe manipulation of URLs using the native URL API.
*
* @param pathOrUrl - A relative path (e.g., '/_astro/image.png') or absolute URL (e.g., 'https://cdn.example.com/...')
* @returns A URL object that can be safely manipulated
*/
function createPlaceholderURL(pathOrUrl) {
	return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
/**
* Extracts the pathname and search parameters from a URL created with `createPlaceholderURL`.
* Removes the placeholder base, returning just the path and query string.
*
* @param url - A URL object created with `createPlaceholderURL`
* @returns The URL string without the placeholder base
*/
function stringifyPlaceholderURL(url) {
	return url.href.replace(PLACEHOLDER_BASE, "");
}
// node_modules/astro/dist/assets/utils/static-image.js
function resolveStaticImage(options, hashProperties, originalFSPath, config) {
	const ESMImportedImageSrc = isESMImportedImage(options.src) ? options.src.src : options.src;
	const assetPrefix = getAssetsPrefix(fileExtension(ESMImportedImageSrc), config.assetsPrefix);
	const finalOriginalPath = removeBase(removeBase(ESMImportedImageSrc, config.base), assetPrefix);
	const hash = hashTransform(options, config.serviceEntrypoint, hashProperties);
	const finalFilePath = prependForwardSlash(joinPaths(isESMImportedImage(options.src) ? "" : config.assetsDir, prependForwardSlash(propsToFilename(finalOriginalPath, options, hash))));
	const url = createPlaceholderURL(config.assetsPrefix ? encodeURI(joinPaths(assetPrefix, finalFilePath)) : encodeURI(prependForwardSlash(joinPaths(config.base, finalFilePath))));
	if (config.assetQueryParams) config.assetQueryParams.forEach((value, key) => {
		url.searchParams.set(key, value);
	});
	return {
		url: stringifyPlaceholderURL(url),
		image: {
			originalPath: finalOriginalPath,
			hash,
			finalPath: finalFilePath,
			originalSrcPath: originalFSPath,
			transform: typeof options.src === "function" ? {
				...options,
				src: { ...options.src }
			} : options
		}
	};
}
// node_modules/astro/dist/assets/internal.js
var cssFitValues = [
	"fill",
	"contain",
	"cover",
	"scale-down"
];
var configuredImageService;
async function getConfiguredImageService() {
	if (!configuredImageService) {
		const { default: service } = await import("./sharp_DOaXOETN.mjs").catch((e) => {
			const error = new AstroError(InvalidImageService);
			error.cause = e;
			throw error;
		});
		configuredImageService = service;
	}
	return configuredImageService;
}
function getStaticImageConfig(imageConfig) {
	return isCollectingStaticImages() ? imageConfig.staticImageConfig : void 0;
}
async function getImage(options, imageConfig, logger) {
	if (!options || typeof options !== "object") throw new AstroError({
		...ExpectedImageOptions,
		message: ExpectedImageOptions.message(JSON.stringify(options))
	});
	if (typeof options.src === "undefined") throw new AstroError({
		...ExpectedImage,
		message: ExpectedImage.message(options.src, "undefined", JSON.stringify(options))
	});
	if (isImageMetadata(options)) throw new AstroError(ExpectedNotESMImage);
	const service = await getConfiguredImageService();
	const resolvedOptions = {
		...options,
		src: await resolveSrc(options.src)
	};
	let originalWidth;
	let originalHeight;
	if (resolvedOptions.inferSize) {
		delete resolvedOptions.inferSize;
		if (isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
			if (!isRemoteAllowed(resolvedOptions.src, imageConfig)) throw new AstroError({
				...RemoteImageNotAllowed,
				message: RemoteImageNotAllowed.message(resolvedOptions.src)
			});
			const getRemoteSize = (url) => service.getRemoteSize?.(url, imageConfig, logger) ?? inferRemoteSize(url, imageConfig);
			const result = await getRemoteSize(resolvedOptions.src);
			resolvedOptions.width ??= result.width;
			resolvedOptions.height ??= result.height;
			if (result.format) resolvedOptions.format ??= resolveDefaultOutputFormat(result.format);
			originalWidth = result.width;
			originalHeight = result.height;
		}
	}
	const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
	const clonedSrc = getUntrackedImage(resolvedOptions.src);
	if (isESMImportedImage(clonedSrc)) {
		originalWidth = clonedSrc.width;
		originalHeight = clonedSrc.height;
	}
	if (originalWidth && originalHeight) {
		const aspectRatio = originalWidth / originalHeight;
		if (resolvedOptions.height && !resolvedOptions.width) resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
		else if (resolvedOptions.width && !resolvedOptions.height) resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
		else if (!resolvedOptions.width && !resolvedOptions.height) {
			resolvedOptions.width = originalWidth;
			resolvedOptions.height = originalHeight;
		}
	}
	resolvedOptions.src = clonedSrc;
	const layout = options.layout ?? imageConfig.layout ?? "none";
	if (resolvedOptions.priority) {
		resolvedOptions.loading ??= "eager";
		resolvedOptions.decoding ??= "sync";
		resolvedOptions.fetchpriority ??= "high";
		delete resolvedOptions.priority;
	} else {
		resolvedOptions.loading ??= "lazy";
		resolvedOptions.decoding ??= "async";
		resolvedOptions.fetchpriority ??= void 0;
	}
	if (layout !== "none") {
		resolvedOptions.widths ||= getWidths({
			width: resolvedOptions.width,
			layout,
			originalWidth,
			breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
		});
		resolvedOptions.sizes ||= getSizesAttribute({
			width: resolvedOptions.width,
			layout
		});
		delete resolvedOptions.densities;
		resolvedOptions["data-astro-image"] = layout;
		if (resolvedOptions.fit && cssFitValues.includes(resolvedOptions.fit)) resolvedOptions["data-astro-image-fit"] = resolvedOptions.fit;
		resolvedOptions["data-astro-image-pos"] = (resolvedOptions.position || "center").replace(/\s+/g, "-");
	}
	const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig, logger) : resolvedOptions;
	validatedOptions.format ??= await peekRemoteFormatForStaticEmit(validatedOptions, imageConfig, service, logger);
	const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig, logger) : [];
	const lazyImageURLFactory = (getValue) => {
		let cached = null;
		return () => cached ??= getValue();
	};
	const initialImageURL = await service.getURL(validatedOptions, imageConfig, logger);
	let lazyImageURL = lazyImageURLFactory(() => initialImageURL);
	const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
	let srcSets = await Promise.all(srcSetTransforms.map(async (srcSet) => {
		return {
			transform: srcSet.transform,
			url: matchesValidatedTransform(srcSet.transform) ? initialImageURL : await service.getURL(srcSet.transform, imageConfig, logger),
			descriptor: srcSet.descriptor,
			attributes: srcSet.attributes
		};
	}));
	const staticImageConfig = getStaticImageConfig(imageConfig);
	if (isLocalService(service) && staticImageConfig && !(isRemoteImage(validatedOptions.src) && initialImageURL === validatedOptions.src)) {
		const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
		const addStaticImage = (transform) => {
			const { url, image } = resolveStaticImage(transform, propsToHash, originalFilePath, {
				...staticImageConfig,
				serviceEntrypoint: imageConfig.service.entrypoint,
				assetQueryParams: imageConfig.assetQueryParams
			});
			recordStaticImage(image);
			return url;
		};
		lazyImageURL = lazyImageURLFactory(() => addStaticImage(validatedOptions));
		srcSets = srcSetTransforms.map((srcSet) => {
			return {
				transform: srcSet.transform,
				url: matchesValidatedTransform(srcSet.transform) ? lazyImageURL() : addStaticImage(srcSet.transform),
				descriptor: srcSet.descriptor,
				attributes: srcSet.attributes
			};
		});
	} else if (imageConfig.assetQueryParams) {
		const imageURLObj = createPlaceholderURL(initialImageURL);
		imageConfig.assetQueryParams.forEach((value, key) => {
			imageURLObj.searchParams.set(key, value);
		});
		lazyImageURL = lazyImageURLFactory(() => stringifyPlaceholderURL(imageURLObj));
		srcSets = srcSets.map((srcSet) => {
			const urlObj = createPlaceholderURL(srcSet.url);
			imageConfig.assetQueryParams.forEach((value, key) => {
				urlObj.searchParams.set(key, value);
			});
			return {
				...srcSet,
				url: stringifyPlaceholderURL(urlObj)
			};
		});
	}
	return {
		rawOptions: resolvedOptions,
		options: validatedOptions,
		get src() {
			return lazyImageURL();
		},
		srcSet: {
			values: srcSets,
			attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
		},
		attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig, logger) : {}
	};
}
/**
* Build-time only: probes the remote URL via `getRemoteSize` so we can commit a real `format`
* before the filename is hashed. Returns undefined when no peek applies (SSR, non-remote,
* disallowed remote, external service, missing `getRemoteSize`, or probe failure) — the
* transform service handles those by detecting from the actual buffer.
*/
async function peekRemoteFormatForStaticEmit(options, imageConfig, service, logger) {
	if (!isRemoteImage(options.src) || !isRemoteAllowed(options.src, imageConfig) || !getStaticImageConfig(imageConfig) || !isLocalService(service) || !service.getRemoteSize) return;
	try {
		const probed = await service.getRemoteSize(options.src, imageConfig, logger);
		return resolveDefaultOutputFormat(probed.format);
	} catch {
		return;
	}
}
export { getImage as n, getConfiguredImageService as t };
