import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { a as matchInternalMediaKey, i as isNotModified, n as MUTABLE_MEDIA_CACHE_CONTROL, o as originalMediaHeaders, r as getTransformFingerprint, s as validatorHeaders } from "./image-endpoint_Dg3VHZtz.mjs";
import { r as imageConfig, t as getConfiguredImageService } from "./_astro_assets_CXULl6hB.mjs";
import { c as isRemotePath } from "./path_jvl2hruy.mjs";
import { t as isRemoteAllowed } from "./remote_Z-Z8LuKO.mjs";
import { t as getConfiguredImageService$1 } from "./assets_Bmh5uWIC.mjs";
import { a as fetchWithRedirects } from "./service_EhNdzXh1.mjs";
import * as mime from "mrmime";
// node_modules/astro/dist/assets/utils/etag.js
/**
* FNV-1a Hash implementation
* @author Travis Webb (tjwebb) <me@traviswebb.com>
*
* Ported from https://github.com/tjwebb/fnv-plus/blob/master/index.js
* License https://github.com/tjwebb/fnv-plus#license
*
* Simplified, optimized and add modified for 52 bit, which provides a larger hash space
* and still making use of JavaScript's 53-bit integer space.
*/
var fnv1a52 = (str) => {
	const len = str.length;
	let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
var etag = (payload, weak = false) => {
	return (weak ? "W/\"" : "\"") + fnv1a52(payload).toString(36) + payload.length.toString(36) + "\"";
};
// node_modules/astro/dist/assets/endpoint/loadImage.js
/**
* Fetches an image by URL. Used by the generic image endpoint for both
* remote images and local images (self-fetched from the same origin).
*
* For remote images, the final URL (after any redirects) is validated
* against `imageConfig.domains` and `imageConfig.remotePatterns`.
* Local images skip this check — they are already guarded by the
* same-origin check in the caller.
*/
async function loadImage(src, headers, imageConfig, isRemote, fetchFn) {
	try {
		const res = await fetchWithRedirects({
			url: src,
			headers,
			imageConfig,
			fetchFn
		});
		if (isRemote && !isRemoteAllowed(res.url, imageConfig)) return;
		if (!res.ok) return;
		return await res.arrayBuffer();
	} catch {
		return;
	}
}
// node_modules/astro/dist/assets/endpoint/generic.js
/**
* Endpoint used in dev and SSR to serve optimized images by the base image services
*/
var GET$1 = async ({ request, logger }) => {
	try {
		const imageService = await getConfiguredImageService$1();
		if (!("transform" in imageService)) throw new Error("Configured image service is not a local service");
		const url = new URL(request.url);
		const transform = await imageService.parseURL(url, imageConfig, logger);
		if (!transform?.src) throw new Error("Incorrect transform returned by `parseURL`");
		let inputBuffer = void 0;
		const isRemoteImage = isRemotePath(transform.src);
		if (isRemoteImage && isRemoteAllowed(transform.src, imageConfig) === false) return new Response("Forbidden", { status: 403 });
		const sourceUrl = new URL(transform.src, url.origin);
		if (!isRemoteImage && sourceUrl.origin !== url.origin) return new Response("Forbidden", { status: 403 });
		inputBuffer = await loadImage(sourceUrl, isRemoteImage ? new Headers() : request.headers, imageConfig, isRemoteImage);
		if (!inputBuffer) return new Response("Not Found", { status: 404 });
		const { data, format } = await imageService.transform(new Uint8Array(inputBuffer), transform, imageConfig, logger);
		return new Response(data, {
			status: 200,
			headers: {
				"Content-Type": mime.lookup(format) ?? `image/${format}`,
				"Cache-Control": "public, max-age=31536000",
				ETag: etag(data.toString()),
				Date: (/* @__PURE__ */ new Date()).toUTCString()
			}
		});
	} catch (err) {
		logger.error(`Could not process image request: ${err}`);
		return new Response("Internal Server Error", { status: 500 });
	}
};
// node_modules/emdash/dist/astro/image-endpoint.mjs
var image_endpoint_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var FORMAT_MIME = {
	webp: "image/webp",
	avif: "image/avif",
	png: "image/png",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	gif: "image/gif"
};
function isNotFound(error) {
	return error instanceof Error && (error.message.includes("not found") || error.message.includes("NOT_FOUND"));
}
function streamOriginal(body, contentType, size, lastModified) {
	return new Response(body, {
		status: 200,
		headers: originalMediaHeaders(contentType, size, lastModified)
	});
}
function notModifiedResponse(contentType, size, lastModified, suffix) {
	return new Response(null, {
		status: 304,
		headers: {
			"Content-Type": contentType,
			"Cache-Control": MUTABLE_MEDIA_CACHE_CONTROL,
			"X-Content-Type-Options": "nosniff",
			...validatorHeaders(size, lastModified, suffix)
		}
	});
}
var GET = async (ctx) => {
	const url = new URL(ctx.request.url);
	const key = matchInternalMediaKey(url.searchParams.get("href"));
	const storage = ctx.locals.emdash?.storage;
	if (!key || !storage) return GET$1(ctx);
	const service = await getConfiguredImageService();
	if (!("transform" in service)) return GET$1(ctx);
	let unusedBody;
	try {
		const source = await storage.download(key);
		unusedBody = source.body;
		if (!source.contentType.startsWith("image/")) {
			if (isNotModified(ctx.request, source.size, source.lastModified)) return notModifiedResponse(source.contentType, source.size, source.lastModified);
			const response = streamOriginal(source.body, source.contentType, source.size, source.lastModified);
			if (ctx.request.method === "HEAD") return new Response(null, response);
			unusedBody = void 0;
			return response;
		}
		const transform = await service.parseURL(url, imageConfig);
		if (!transform) {
			if (isNotModified(ctx.request, source.size, source.lastModified)) return notModifiedResponse(source.contentType, source.size, source.lastModified);
			const response = streamOriginal(source.body, source.contentType, source.size, source.lastModified);
			if (ctx.request.method === "HEAD") return new Response(null, response);
			unusedBody = void 0;
			return response;
		}
		const fingerprint = getTransformFingerprint(url.searchParams);
		if (isNotModified(ctx.request, source.size, source.lastModified, fingerprint)) return notModifiedResponse(source.contentType, source.size, source.lastModified, fingerprint);
		const inputBuffer = new Uint8Array(await new Response(source.body).arrayBuffer());
		const { data, format } = await service.transform(inputBuffer, transform, imageConfig);
		return new Response(data, {
			status: 200,
			headers: {
				"Content-Type": FORMAT_MIME[format] ?? source.contentType,
				"Cache-Control": MUTABLE_MEDIA_CACHE_CONTROL,
				"X-Content-Type-Options": "nosniff",
				...validatorHeaders(source.size, source.lastModified, fingerprint)
			}
		});
	} catch (error) {
		if (isNotFound(error)) return new Response("Not Found", { status: 404 });
		console.error("[emdash] image transform failed:", error);
		return new Response("Internal Server Error", { status: 500 });
	} finally {
		if (unusedBody && !unusedBody.locked) await unusedBody.cancel().catch(() => void 0);
	}
};
// \0virtual:astro:page:node_modules/emdash/dist/astro/image-endpoint@_@mjs
var page = () => image_endpoint_exports;
export { page };
