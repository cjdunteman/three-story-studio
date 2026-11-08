import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { r as mapErrorStatus } from "./errors-8gJqv-XV_DxVJguuk.mjs";
// node_modules/emdash/dist/error-BCMgPxdn.mjs
/**
* Standardized API error responses.
*
* All API routes should use these utilities instead of inline
* `new Response(JSON.stringify({ error: ... }), ...)` patterns.
*/
/**
* Standard cache headers for all API responses.
*
* Cache-Control: private, no-store -- prevents CDN/proxy caching of authenticated data.
* no-store already tells caches not to store the response, so Vary is unnecessary.
*/
var API_CACHE_HEADERS = { "Cache-Control": "private, no-store" };
/**
* Create a standardized error response.
*
* Always returns `{ success: false, error: { code, message } }` with correct
* Content-Type. Use this for all error responses in API routes.
*/
function apiError(code, message, status, details) {
	const error = {
		code,
		message
	};
	if (details !== void 0) error.details = details;
	return Response.json({
		success: false,
		error
	}, {
		status,
		headers: API_CACHE_HEADERS
	});
}
/**
* Create a standardized success response.
*
* Always returns `{ success: true, data: T }` with correct status code.
* Use this for all success responses in API routes.
*/
function apiSuccess(data, status = 200) {
	return Response.json({
		success: true,
		data
	}, {
		status,
		headers: API_CACHE_HEADERS
	});
}
/**
* Handle an unknown error in a catch block.
*
* - Logs the full error server-side
* - Returns a generic message to the client (never leaks error.message)
* - Use `fallbackMessage` for the public-facing message
* - Use `fallbackCode` for the error code
*/
function handleError(error, fallbackMessage, fallbackCode) {
	if (error instanceof InvalidCursorError) return apiError("INVALID_CURSOR", error.message, 400);
	console.error(`[${fallbackCode}]`, error);
	return apiError(fallbackCode, fallbackMessage, 500);
}
/**
* Standard database check.
*
* Returns an error response if the database is not available, or null if OK.
* Usage: `const err = requireDb(emdash?.db); if (err) return err;`
*/
function requireDb(db) {
	if (!db) return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	return null;
}
/**
* Convert an ApiResult into an HTTP Response.
*
* Collapses the handler-to-response boilerplate:
* - Success: returns `apiSuccess(result.data, successStatus)`
* - Error: returns `apiError(code, message, mapErrorStatus(code))`
*/
function unwrapResult(result, successStatus = 200) {
	if (!result.success) return apiError(result.error.code, result.error.message, mapErrorStatus(result.error.code), result.error.details);
	return apiSuccess(result.data, successStatus);
}
export { unwrapResult as a, requireDb as i, apiSuccess as n, handleError as r, apiError as t };
