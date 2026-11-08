import "./after-32yNRvd2_BC9LTfYL.mjs";
import "./secrets-Dswzrz3k_BaGY_281.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import { t as MediaRepository } from "./media-DepNLhPq_BjGTGeEe.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { n as handleMediaDelete } from "./media-CikS-q6E_DwICdYDo.mjs";
import { s as invalidateSiteSettingsCache } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import "./error-BCMgPxdn_BlGqXbZb.mjs";
import "./fence-Dagicj14_KC___fhN.mjs";
// node_modules/emdash/dist/media/local-runtime.mjs
/**
* Create the local media provider
*/
var createMediaProvider = (config) => {
	const { db, storage } = config;
	if (!db) throw new Error("Local media provider requires database connection");
	const resolveDb = config.getDb ?? (() => db);
	const repo = () => new MediaRepository(resolveDb());
	return {
		async list(options) {
			const result = await repo().findMany({
				cursor: options.cursor,
				limit: options.limit,
				mimeType: options.mimeType
			});
			return {
				items: result.items.map((item) => ({
					id: item.id,
					filename: item.filename,
					mimeType: item.mimeType,
					size: item.size ?? void 0,
					width: item.width ?? void 0,
					height: item.height ?? void 0,
					focalX: item.focalX ?? void 0,
					focalY: item.focalY ?? void 0,
					blurhash: item.blurhash ?? void 0,
					dominantColor: item.dominantColor ?? void 0,
					alt: item.alt ?? void 0,
					caption: item.caption ?? void 0,
					previewUrl: `/_emdash/api/media/file/${item.storageKey}`,
					meta: {
						storageKey: item.storageKey,
						caption: item.caption,
						blurhash: item.blurhash,
						dominantColor: item.dominantColor
					}
				})),
				nextCursor: result.nextCursor
			};
		},
		async get(id) {
			const item = await repo().findById(id);
			if (!item) return null;
			return {
				id: item.id,
				filename: item.filename,
				mimeType: item.mimeType,
				size: item.size ?? void 0,
				width: item.width ?? void 0,
				height: item.height ?? void 0,
				focalX: item.focalX ?? void 0,
				focalY: item.focalY ?? void 0,
				blurhash: item.blurhash ?? void 0,
				dominantColor: item.dominantColor ?? void 0,
				alt: item.alt ?? void 0,
				caption: item.caption ?? void 0,
				previewUrl: `/_emdash/api/media/file/${item.storageKey}`,
				meta: {
					storageKey: item.storageKey,
					caption: item.caption,
					blurhash: item.blurhash,
					dominantColor: item.dominantColor
				}
			};
		},
		async upload(_input) {
			if (!storage) throw new Error("Storage not configured for local media provider");
			throw new Error("Local upload should use /_emdash/api/media endpoint");
		},
		async delete(id) {
			const result = await handleMediaDelete(resolveDb(), id, storage);
			if (!result.success) {
				if (result.error.code === "NOT_FOUND") return;
				throw new Error(result.error.message);
			}
			invalidateSiteSettingsCache();
		},
		getEmbed(value, _options) {
			const src = `/_emdash/api/media/file/${typeof value.meta?.storageKey === "string" ? value.meta.storageKey : value.id}`;
			const mimeType = value.mimeType || "";
			const blurhash = value.blurhash ?? (typeof value.meta?.blurhash === "string" ? value.meta.blurhash : void 0);
			const dominantColor = value.dominantColor ?? (typeof value.meta?.dominantColor === "string" ? value.meta.dominantColor : void 0);
			if (mimeType.startsWith("image/")) return {
				type: "image",
				src,
				width: value.width,
				height: value.height,
				blurhash,
				dominantColor,
				alt: value.alt
			};
			if (mimeType.startsWith("video/")) return {
				type: "video",
				src,
				width: value.width,
				height: value.height,
				controls: true,
				preload: "metadata"
			};
			if (mimeType.startsWith("audio/")) return {
				type: "audio",
				src,
				controls: true,
				preload: "metadata"
			};
			return {
				type: "image",
				src,
				width: value.width,
				height: value.height,
				blurhash,
				dominantColor,
				alt: value.alt
			};
		},
		getThumbnailUrl(id, _mimeType) {
			return `/_emdash/api/media/file/${id}`;
		}
	};
};
// \0virtual:emdash/media-providers
/** Media provider descriptors with factory functions */
var mediaProviders = [{
	id: "local",
	name: "Library",
	icon: "folder",
	capabilities: {
		browse: true,
		search: false,
		upload: true,
		delete: true
	},
	createProvider: (ctx) => createMediaProvider({
		...ctx,
		enabled: true
	})
}];
export { mediaProviders as t };
