// node_modules/astro/dist/assets/consts.js
var VALID_INPUT_FORMATS = [
	"jpeg",
	"jpg",
	"png",
	"apng",
	"tiff",
	"webp",
	"gif",
	"svg",
	"avif"
];
/**
* Valid formats that our base services support.
* Certain formats can be imported (namely SVGs) but will not be processed.
*/
var VALID_SUPPORTED_FORMATS = [
	"jpeg",
	"jpg",
	"png",
	"tiff",
	"webp",
	"gif",
	"svg",
	"avif"
];
var DEFAULT_OUTPUT_FORMAT = "webp";
var DEFAULT_HASH_PROPS = [
	"src",
	"width",
	"height",
	"format",
	"quality",
	"fit",
	"position",
	"background"
];
export { VALID_SUPPORTED_FORMATS as i, DEFAULT_OUTPUT_FORMAT as n, VALID_INPUT_FORMATS as r, DEFAULT_HASH_PROPS as t };
