// node_modules/emdash/dist/transfer-download-D9LQEDX0.mjs
var DOWNLOAD_HEADERS = {
	"Cache-Control": "private, no-store",
	"X-Content-Type-Options": "nosniff"
};
/** A downloaded package file: raw bytes with their size and SHA-256 ETag. */
function exportFileResponse(file) {
	return new Response(file.body, {
		status: 200,
		headers: {
			...DOWNLOAD_HEADERS,
			"Content-Type": file.path === "manifest.json" ? "application/json" : "application/octet-stream",
			"Content-Length": String(file.bytes),
			"Content-Disposition": "attachment",
			ETag: `"${file.sha256}"`
		}
	});
}
/** A streamed `.emdash` archive of an export. */
function exportArchiveResponse(operationId, body) {
	return new Response(body, {
		status: 200,
		headers: {
			...DOWNLOAD_HEADERS,
			"Content-Type": "application/x-tar",
			"Content-Disposition": `attachment; filename="emdash-site-${operationId}.emdash"`
		}
	});
}
export { exportFileResponse as n, exportArchiveResponse as t };
