// node_modules/emdash/dist/escape-lsNq38PP.mjs
/** HTML-escape a string to prevent XSS when interpolated into HTML/JS */
function escapeHtml(str) {
	return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#x27;");
}
export { escapeHtml as t };
