import { t as createConsoleLogger } from "./console_Cc8F-PUH.mjs";
import { t as level } from "./_virtual_astro_logger_BFnT1nSb.mjs";
import { n as getImage$1 } from "./assets_Bmh5uWIC.mjs";
// \0virtual:astro:get-image
var imageConfig = {
	"endpoint": {
		"entrypoint": "emdash/internal/image-endpoint",
		"route": "/_image"
	},
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": [],
	"remotePatterns": [],
	"layout": "constrained",
	"responsiveStyles": true
};
Object.defineProperties(imageConfig, {
	assetQueryParams: {
		value: void 0,
		enumerable: false,
		configurable: true
	},
	staticImageConfig: {
		value: {
			"base": "/",
			"assetsDir": "_astro"
		},
		enumerable: false,
		configurable: true
	}
});
var _astroLogger = createConsoleLogger({ level });
var _runtimeLogger = {
	info: (message) => _astroLogger.info(null, message),
	warn: (message) => _astroLogger.warn(null, message),
	error: (message) => _astroLogger.error(null, message)
};
var getImage = async (options) => await getImage$1(options, imageConfig, _runtimeLogger);
export { getImage };
