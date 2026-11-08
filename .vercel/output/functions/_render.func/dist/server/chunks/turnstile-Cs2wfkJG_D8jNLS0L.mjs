// node_modules/emdash/dist/turnstile-Cs2wfkJG.mjs
/**
* Server-side Turnstile verification for public comment submissions.
*
* The comment form widget (`CommentForm.astro`) submits a `turnstileToken`;
* this verifies it against Cloudflare's siteverify API. Enforcement is
* opt-in: it only runs when the operator configures the Turnstile secret
* key (`EMDASH_TURNSTILE_SECRET_KEY` or `TURNSTILE_SECRET_KEY`), so
* existing non-Turnstile sites are unaffected.
*
* Mirrors `verifyTurnstile` in `@emdash-cms/plugin-forms` (not imported —
* core doesn't depend on plugin packages).
*/
var SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
/**
* Resolve the configured Turnstile secret key, or `""` when Turnstile
* enforcement is not configured.
*
* Reads `process.env` only: Vite replaces `import.meta.env` at build time,
* which would bake a build-machine secret into the bundle and hide a secret
* set on the deployment platform.
*/
function getTurnstileSecretKey() {
	const env = typeof process !== "undefined" && process.env ? process.env : {};
	return env.EMDASH_TURNSTILE_SECRET_KEY || env.TURNSTILE_SECRET_KEY || "";
}
/**
* Verify a Turnstile response token via siteverify.
*
* Fails closed: a missing token, a failed verification, and a siteverify
* transport error all return `false` — when the operator has configured a
* secret, an unverifiable submission must not be persisted.
*/
async function verifyTurnstileToken(token, secretKey, remoteIp) {
	if (!token) return false;
	const body = {
		secret: secretKey,
		response: token
	};
	if (remoteIp) body.remoteip = remoteIp;
	try {
		const data = await (await fetch(SITEVERIFY_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(1e4)
		})).json();
		if (!data.success) console.warn("[comments] Turnstile verification failed:", data["error-codes"] ?? []);
		return data.success === true;
	} catch (error) {
		console.error("[comments] Turnstile siteverify request failed:", error instanceof Error ? error.message : error);
		return false;
	}
}
export { getTurnstileSecretKey, verifyTurnstileToken };
