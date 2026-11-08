import { PLUGIN_ROUTE_DEFAULT_BODY_BYTES, PLUGIN_ROUTE_MAX_BODY_BYTES, PLUGIN_ROUTE_MAX_FILENAME_BYTES, PLUGIN_ROUTE_MAX_MULTIPART_PARTS, PLUGIN_ROUTE_MAX_MULTIPART_PART_BYTES } from "@emdash-cms/plugin-types";
// node_modules/emdash/dist/plugins/http-wire.mjs
var PLUGIN_HTTP_MAX_REQUEST_BYTES = 8388608;
var PLUGIN_HTTP_MAX_RESPONSE_BYTES = 8388608;
var REDIRECT_BODY_HEADERS = [
	"content-encoding",
	"content-language",
	"content-location",
	"content-type",
	"content-length",
	"transfer-encoding"
];
var PLUGIN_HTTP_REDIRECT_STATUSES = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
function createPluginHttpWireRuntime(maxRequestBytes) {
	async function readPluginHttpBytes(stream, limit, label) {
		if (!stream) return /* @__PURE__ */ new Uint8Array();
		const reader = stream.getReader();
		const chunks = [];
		let total = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				total += value.byteLength;
				if (total > limit) {
					try {
						await reader.cancel();
					} catch {}
					throw new Error(`Plugin HTTP ${label} body exceeds the ${limit} byte limit`);
				}
				chunks.push(value);
			}
		} finally {
			reader.releaseLock();
		}
		const bytes = new Uint8Array(total);
		let offset = 0;
		for (const chunk of chunks) {
			bytes.set(chunk, offset);
			offset += chunk.byteLength;
		}
		return bytes;
	}
	async function bufferPluginHttpRequest(init) {
		if (init?.body === void 0 || init.body === null) return init;
		const encoded = new Response(init.body);
		const body = await readPluginHttpBytes(encoded.body, maxRequestBytes, "request");
		const headers = new Headers(init.headers);
		if (!headers.has("content-type")) {
			const contentType = encoded.headers.get("content-type");
			if (contentType) headers.set("content-type", contentType);
		}
		const bufferedInit = { ...init };
		Reflect.deleteProperty(bufferedInit, "duplex");
		return {
			...bufferedInit,
			headers,
			body: new Uint8Array(body).buffer
		};
	}
	function decoratePluginHttpResponse(response, finalUrl, redirected) {
		const clone = response.clone.bind(response);
		Object.defineProperties(response, {
			url: {
				configurable: true,
				value: finalUrl
			},
			redirected: {
				configurable: true,
				value: redirected
			},
			clone: {
				configurable: true,
				value: () => decoratePluginHttpResponse(clone(), finalUrl, redirected)
			}
		});
		return response;
	}
	function pluginHttpResponseFromWire(wire) {
		const nullBodyStatus = wire.status === 101 || wire.status === 204 || wire.status === 205 || wire.status === 304;
		return decoratePluginHttpResponse(new Response(nullBodyStatus ? null : new Uint8Array(wire.body).buffer, {
			status: wire.status,
			statusText: wire.statusText,
			headers: wire.headers
		}), wire.finalUrl, wire.redirected);
	}
	return [
		readPluginHttpBytes,
		bufferPluginHttpRequest,
		decoratePluginHttpResponse,
		pluginHttpResponseFromWire
	];
}
var [readPluginHttpBytes, bufferPluginHttpRequest, decoratePluginHttpResponse, pluginHttpResponseFromWire] = createPluginHttpWireRuntime(PLUGIN_HTTP_MAX_REQUEST_BYTES);
function rewritePluginHttpRedirect(status, init) {
	if (!init) return init;
	const method = (init.method ?? "GET").toUpperCase();
	if (!((status === 301 || status === 302) && method === "POST" || status === 303 && method !== "GET" && method !== "HEAD")) return init;
	const headers = new Headers(init.headers);
	for (const name of REDIRECT_BODY_HEADERS) headers.delete(name);
	return {
		...init,
		method: "GET",
		headers,
		body: void 0
	};
}
function pluginHttpRedirectAction(status, hasLocation, init) {
	if (!PLUGIN_HTTP_REDIRECT_STATUSES.has(status) || !hasLocation) return "return";
	const mode = init?.redirect ?? "follow";
	if (mode === "manual") return "return";
	if (mode === "error") return "error";
	return "follow";
}
async function pluginHttpResponseToWire(response, finalUrl, redirected) {
	const headers = [];
	response.headers.forEach((value, key) => headers.push([key, value]));
	return {
		status: response.status,
		statusText: response.statusText,
		headers,
		finalUrl: response.url || finalUrl,
		redirected: response.redirected || redirected,
		body: await readPluginHttpBytes(response.body, PLUGIN_HTTP_MAX_RESPONSE_BYTES, "response")
	};
}
// node_modules/emdash/dist/route-wire-Ca_HWCZ5.mjs
var UTF8 = new TextEncoder();
var FILENAME_PATH_SEPARATOR_PATTERN = /[/\\]/;
var SCRIPT_MEDIA_TYPE_PATTERN = /(?:java|ecma)script/;
var ALLOWED_RESPONSE_HEADERS = /* @__PURE__ */ new Set([
	"accept-ranges",
	"content-disposition",
	"content-encoding",
	"content-language",
	"content-range",
	"content-type",
	"etag",
	"last-modified",
	"retry-after"
]);
var ACTIVE_RESPONSE_TYPES = /* @__PURE__ */ new Set([
	"application/ecmascript",
	"application/javascript",
	"application/wasm",
	"application/xhtml+xml",
	"application/xml",
	"image/svg+xml",
	"multipart/related",
	"multipart/x-mixed-replace",
	"text/css",
	"text/ecmascript",
	"text/html",
	"text/javascript",
	"text/jscript",
	"text/livescript",
	"text/xml"
]);
var PluginRouteRequestError = class extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
		this.name = "PluginRouteRequestError";
	}
};
function parseQuery(request) {
	const input = {};
	const params = new URL(request.url).searchParams;
	for (const key of new Set(params.keys())) {
		const values = params.getAll(key);
		input[key] = values.length > 1 ? values : values[0];
	}
	return input;
}
async function readRouteBody(request, limit) {
	const declaredLength = request.headers.get("content-length");
	if (declaredLength !== null) {
		const parsed = Number(declaredLength);
		if (Number.isFinite(parsed) && parsed > limit) throw new PluginRouteRequestError(`Plugin route request body exceeds ${limit} bytes`, 413);
	}
	try {
		return await readPluginHttpBytes(request.body, limit, "request");
	} catch (error) {
		if (!(error instanceof Error) || !error.message.includes("exceeds")) throw new PluginRouteRequestError("Plugin route request body could not be read", 400);
		throw new PluginRouteRequestError(`Plugin route request body exceeds ${limit} bytes`, 413);
	}
}
function decodeText(bytes) {
	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
	} catch {
		throw new PluginRouteRequestError("Plugin route request body is not valid UTF-8", 400);
	}
}
async function parseFormData(request, bytes) {
	const contentType = request.headers.get("content-type") ?? "";
	if (!contentType.toLowerCase().startsWith("multipart/form-data;") && !contentType.toLowerCase().startsWith("application/x-www-form-urlencoded")) throw new PluginRouteRequestError("Plugin route form-data requests require multipart/form-data or application/x-www-form-urlencoded", 415);
	let parsed;
	try {
		parsed = await new Request(request.url, {
			method: "POST",
			headers: { "content-type": contentType },
			body: new Uint8Array(bytes).buffer
		}).formData();
	} catch {
		throw new PluginRouteRequestError("Plugin route form-data body is malformed", 400);
	}
	const entries = [];
	for (const [name, value] of parsed.entries()) {
		if (entries.length >= PLUGIN_ROUTE_MAX_MULTIPART_PARTS) throw new PluginRouteRequestError(`Plugin route form-data exceeds ${PLUGIN_ROUTE_MAX_MULTIPART_PARTS} parts`, 413);
		if (typeof value === "string") {
			if (UTF8.encode(value).byteLength > PLUGIN_ROUTE_MAX_MULTIPART_PART_BYTES) throw new PluginRouteRequestError(`Plugin route form-data part exceeds ${PLUGIN_ROUTE_MAX_MULTIPART_PART_BYTES} bytes`, 413);
			entries.push({
				name,
				kind: "text",
				value
			});
			continue;
		}
		const filename = value.name;
		let hasControlCharacter = false;
		for (const character of filename) {
			const codePoint = character.codePointAt(0);
			if (codePoint !== void 0 && (codePoint < 32 || codePoint === 127)) {
				hasControlCharacter = true;
				break;
			}
		}
		if (UTF8.encode(filename).byteLength > PLUGIN_ROUTE_MAX_FILENAME_BYTES || hasControlCharacter || FILENAME_PATH_SEPARATOR_PATTERN.test(filename)) throw new PluginRouteRequestError("Plugin route form-data filename is invalid", 400);
		if (value.size > PLUGIN_ROUTE_MAX_MULTIPART_PART_BYTES) throw new PluginRouteRequestError(`Plugin route form-data part exceeds ${PLUGIN_ROUTE_MAX_MULTIPART_PART_BYTES} bytes`, 413);
		entries.push({
			name,
			kind: "file",
			filename,
			contentType: value.type || "application/octet-stream",
			bytes: new Uint8Array(await value.arrayBuffer())
		});
	}
	return { entries };
}
async function parseDeclaredPluginRouteInput(request, declaration) {
	if (declaration.body === "none") {
		await readRouteBody(request, 0);
		return parseQuery(request);
	}
	const limit = declaration.maxBytes ?? PLUGIN_ROUTE_DEFAULT_BODY_BYTES;
	const bytes = await readRouteBody(request, Math.min(limit, PLUGIN_ROUTE_MAX_BODY_BYTES));
	switch (declaration.body) {
		case "bytes": return bytes;
		case "text": return decodeText(bytes);
		case "json": try {
			return JSON.parse(decodeText(bytes));
		} catch (error) {
			if (error instanceof PluginRouteRequestError) throw error;
			throw new PluginRouteRequestError("Plugin route request body is not valid JSON", 400);
		}
		case "form-data": return parseFormData(request, bytes);
	}
}
function isPluginResponse(value) {
	return typeof value === "object" && value !== null && value.__emdashPluginResponse === true;
}
async function pluginRouteResponseToWire(value, options = {}) {
	if (!isPluginResponse(value)) throw new TypeError("Raw plugin routes must return pluginResponse()");
	if (!Number.isInteger(value.status) || value.status < 200 || value.status > 599) throw new TypeError("Raw plugin route status must be an integer from 200 to 599");
	if (!Array.isArray(value.headers)) throw new TypeError("Raw plugin route headers are invalid");
	const sourceHeaders = new Headers();
	for (const entry of value.headers) {
		if (!Array.isArray(entry) || entry.length !== 2 || typeof entry[0] !== "string" || typeof entry[1] !== "string") throw new TypeError("Raw plugin route headers are invalid");
		sourceHeaders.append(entry[0], entry[1]);
	}
	const headers = new Headers();
	sourceHeaders.forEach((headerValue, name) => {
		if (ALLOWED_RESPONSE_HEADERS.has(name)) {
			headers.set(name, headerValue);
			return;
		}
		if (name !== "location") return;
		if (options.allowExternalLocation) {
			headers.set(name, headerValue);
			return;
		}
		if (options.publicRequestUrl) try {
			const requestUrl = new URL(options.publicRequestUrl);
			if (new URL(headerValue, requestUrl).origin === requestUrl.origin) {
				headers.set(name, headerValue);
				return;
			}
		} catch {}
		throw new TypeError("Public raw plugin route redirects must stay on the site origin");
	});
	if (!headers.has("content-type")) headers.set("content-type", "application/octet-stream");
	const mediaType = (headers.get("content-type") ?? "application/octet-stream").split(";", 1)[0].trim().toLowerCase();
	if (ACTIVE_RESPONSE_TYPES.has(mediaType) || SCRIPT_MEDIA_TYPE_PATTERN.test(mediaType)) throw new TypeError(`Raw plugin route content type "${mediaType}" is not allowed`);
	headers.set("x-content-type-options", "nosniff");
	headers.set("content-security-policy", "sandbox; default-src 'none'");
	headers.set("referrer-policy", "no-referrer");
	let body = /* @__PURE__ */ new Uint8Array();
	if (value.body !== null) if (value.body.kind === "text" && typeof value.body.value === "string") body = UTF8.encode(value.body.value);
	else if (value.body.kind === "bytes" && value.body.value instanceof Uint8Array) body = new Uint8Array(value.body.value);
	else throw new TypeError("Raw plugin route body is invalid");
	if (body.byteLength > PLUGIN_ROUTE_MAX_BODY_BYTES) throw new TypeError(`Raw plugin route response body exceeds ${PLUGIN_ROUTE_MAX_BODY_BYTES} bytes`);
	return {
		status: value.status,
		headers: [...headers.entries()],
		body
	};
}
function pluginRouteResponseFromWire(wire, method) {
	const nullBodyStatus = wire.status === 204 || wire.status === 205 || wire.status === 304;
	const body = method === "HEAD" || nullBodyStatus ? null : new Uint8Array(wire.body).buffer;
	return new Response(body, {
		status: wire.status,
		headers: wire.headers
	});
}
export { bufferPluginHttpRequest as a, pluginHttpResponseToWire as c, pluginRouteResponseToWire as i, rewritePluginHttpRedirect as l, parseDeclaredPluginRouteInput as n, pluginHttpRedirectAction as o, pluginRouteResponseFromWire as r, pluginHttpResponseFromWire as s, PluginRouteRequestError as t };
