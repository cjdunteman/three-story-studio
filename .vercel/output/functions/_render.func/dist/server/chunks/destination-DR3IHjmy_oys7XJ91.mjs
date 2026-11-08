// node_modules/emdash/dist/destination-DR3IHjmy.mjs
/**
* Browsers strip tab/CR/LF anywhere in a URL, so `/\t/evil.example` resolves
* as `//evil.example`. Reject every C0 control and DEL rather than just those.
*/
var CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
/**
* Returns true if `destination` is a single-slash site-relative path, i.e. a
* browser resolves it on the current origin: no scheme, no `//` or `/\`
* prefix, and no control characters.
*/
function isSiteRelativeDestination(destination) {
	return destination.startsWith("/") && destination[1] !== "/" && destination[1] !== "\\" && !CONTROL_CHARS.test(destination);
}
export { isSiteRelativeDestination as t };
