import { t as generatePreviewToken } from "./tokens-BnhSnGwJ_CaIsDsD0.mjs";
// node_modules/emdash/dist/preview-DLexxwp3.mjs
/**
* Preview URL generation
*
* Creates preview URLs that include a signed token for accessing draft content.
*/
var REPEATED_SLASHES = /\/{2,}/g;
/**
* Generate a preview URL for content
*
* The URL includes a `_preview` query parameter with a signed token.
*
* @example
* ```ts
* const url = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
* });
* // Returns: /posts/hello-world?_preview=eyJj...
*
* // With base URL:
* const fullUrl = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
*   baseUrl: "https://example.com",
* });
* // Returns: https://example.com/posts/hello-world?_preview=eyJj...
*
* // Custom path pattern:
* const customUrl = await getPreviewUrl({
*   collection: "posts",
*   id: "hello-world",
*   secret: process.env.PREVIEW_SECRET!,
*   pathPattern: "/blog/{id}",
* });
* // Returns: /blog/hello-world?_preview=eyJj...
* ```
*/
async function getPreviewUrl(options) {
	const { collection, id, secret, expiresIn = "1h", baseUrl, pathPattern = "/{collection}/{id}", locale = "" } = options;
	const token = await generatePreviewToken({
		contentId: `${collection}:${id}`,
		expiresIn,
		secret
	});
	let path = pathPattern.replace("{collection}", collection).replace("{id}", id).replace("{locale}", locale);
	path = path.replace(REPEATED_SLASHES, "/");
	if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
	const url = new URL(path, baseUrl || "http://placeholder");
	url.searchParams.set("_preview", token);
	if (!baseUrl) return `${url.pathname}${url.search}`;
	return url.toString();
}
/**
* Build a preview URL from a token (when you already have the token)
*
* @example
* ```ts
* const url = buildPreviewUrl({
*   path: "/posts/hello-world",
*   token: existingToken,
* });
* ```
*/
function buildPreviewUrl(options) {
	const { path, token, baseUrl } = options;
	const url = new URL(path, baseUrl || "http://placeholder");
	url.searchParams.set("_preview", token);
	if (!baseUrl) return `${url.pathname}${url.search}`;
	return url.toString();
}
export { getPreviewUrl as n, buildPreviewUrl as t };
