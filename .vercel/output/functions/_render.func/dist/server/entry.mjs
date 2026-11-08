import { n as DefaultFetchHandler, r as manifest, t as App } from "./chunks/app_CtIBKZHm.mjs";
// node_modules/@astrojs/vercel/dist/serverless/constants.js
/**
* The edge function calls the node server at /_render,
* with the original path as the value of this header.
*/
var ASTRO_PATH_HEADER = "x-astro-path";
var ASTRO_PATH_PARAM = "x_astro_path";
/**
* ISR functions receive the target path through the `x_astro_path` query
* parameter instead of a header. Because that parameter travels on the URL, it
* is accompanied by this token so the entrypoint can confirm the path override
* came from Astro's own build-time route rewrite rather than from an arbitrary
* caller. The value is the per-build `middlewareSecret`.
*/
var ASTRO_PATH_TOKEN_PARAM = "x_astro_path_token";
/**
* The edge function calls the node server at /_render,
* with the locals serialized into this header.
*/
var ASTRO_LOCALS_HEADER = "x-astro-locals";
var ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";
// \0virtual:astro-vercel:config
var middlewareSecret = "eba4c5f3-6489-4c20-b753-105d6c95997f";
// \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
// node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
// node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
// node_modules/@astrojs/internal-helpers/dist/request.js
/**
* Utilities for extracting information from `Request`
*/
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
/**
* Checks whether a string looks like an IP address (contains only characters
* that can appear in IPv4/IPv6 addresses and is within a reasonable length).
*
* This is a permissive allowlist — it won't catch every malformed IP, but it
* reliably rejects injection payloads. Does NOT use Node.js APIs so it works
* in all runtimes (Workers, Deno, etc.).
*/
function isValidIpAddress(value) {
	return IP_RE.test(value);
}
/**
* Extracts the first value from a potentially multi-value header and validates
* that it is a syntactically valid IP address.
*
* Useful for adapters that read client IP from a platform-specific header
*/
function getValidatedIpFromHeader(headerValue) {
	const raw = getFirstForwardedValue(headerValue);
	if (raw && isValidIpAddress(raw)) return raw;
}
/**
* Returns the first value associated to the `x-forwarded-for` header,
* but only if it is a valid IP address. Returns `undefined` otherwise.
*
* @param {Request} request
*/
function getClientIpAddress(request) {
	return getValidatedIpFromHeader(request.headers.get("x-forwarded-for"));
}
var app = createApp();
var entrypoint_default = { async fetch(request) {
	const url = new URL(request.url);
	const hasValidMiddlewareSecret = request.headers.get(ASTRO_MIDDLEWARE_SECRET_HEADER) === middlewareSecret;
	let realPath = null;
	let overrideTrusted = false;
	if (hasValidMiddlewareSecret) {
		overrideTrusted = true;
		realPath = request.headers.get(ASTRO_PATH_HEADER);
	} else if (url.searchParams.get("x_astro_path_token") === "eba4c5f3-6489-4c20-b753-105d6c95997f") {
		overrideTrusted = true;
		realPath = url.searchParams.get(ASTRO_PATH_PARAM);
	}
	if (overrideTrusted && (realPath === null || !realPath.startsWith("/"))) return new Response("Not Found", { status: 404 });
	if (typeof realPath === "string") {
		const target = new URL(realPath, url);
		const search = target.search || url.search;
		url.pathname = target.pathname;
		url.search = search;
		url.searchParams.delete(ASTRO_PATH_PARAM);
		url.searchParams.delete(ASTRO_PATH_TOKEN_PARAM);
		request = new Request(url.toString(), {
			method: request.method,
			headers: request.headers,
			...request.body ? {
				body: request.body,
				duplex: "half"
			} : {}
		});
	}
	const routeData = app.match(request);
	let locals = {};
	const astroLocalsHeader = request.headers.get(ASTRO_LOCALS_HEADER);
	if (astroLocalsHeader) {
		if (!hasValidMiddlewareSecret) return new Response("Forbidden", { status: 403 });
		locals = JSON.parse(astroLocalsHeader);
	}
	if (hasValidMiddlewareSecret) request.headers.delete(ASTRO_MIDDLEWARE_SECRET_HEADER);
	const response = await app.render(request, {
		routeData,
		clientAddress: getClientIpAddress(request),
		locals
	});
	if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
	return response;
} };
export { entrypoint_default as default };
