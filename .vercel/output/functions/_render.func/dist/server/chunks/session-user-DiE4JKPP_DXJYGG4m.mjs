import { t as after } from "./after-32yNRvd2_BC9LTfYL.mjs";
import { t as ErrorCode } from "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
// node_modules/emdash/dist/session-user-DiE4JKPP.mjs
/**
* Backstop timeout for resolving the session user. A live session-store read
* settles in a few ms, so this only ever fires on a genuinely stalled read.
*/
var SESSION_GET_TIMEOUT_MS = 3e3;
/**
* Resolve the Astro session user without risking an isolate-wide hang.
*
* On Cloudflare Workers, a request cancelled mid-`session.get()` (client
* disconnect, context teardown) can leave the underlying session-store read as
* a promise that never settles — neither resolving nor rejecting. Awaiting it
* directly hangs the request, and because the stalled promise is shared at the
* isolate level, every later session-bearing request hangs too (observed as
* 0-CPU, multi-minute, `canceled` responses; see #1274). A surrounding
* try/catch cannot help: the promise never rejects.
*
* Two layers, mirroring the reclaimable-cache pattern used elsewhere in core:
*  1. `after()` anchors the read so a cancelled request still drives it to
*     completion — the promise settles and the isolate is not poisoned for
*     subsequent requests (prevents the hang rather than merely surviving it).
*  2. A timeout is a fail-closed backstop: a still-stalled (or rejecting) read
*     resolves to `undefined`, and every caller treats the absence of a session
*     user as unauthenticated (anonymous on public routes, 401/redirect on
*     protected ones). It can only ever drop privileges for that one request,
*     never grant them.
*
* Used by every session read on the request path: the main middleware (the
* first read on a session-bearing request), the auth middleware, and the
* preview-snapshot route (which bypasses the auth middleware).
*/
async function resolveSessionUser(session, timeoutMs = SESSION_GET_TIMEOUT_MS) {
	if (!session) return void 0;
	const read = Promise.resolve(session.get("user")).catch(() => void 0);
	after(() => read.then(() => void 0, () => void 0));
	let timer;
	const timeout = new Promise((resolve) => {
		timer = setTimeout(resolve, timeoutMs, void 0);
	});
	try {
		return await Promise.race([read, timeout]);
	} finally {
		clearTimeout(timer);
	}
}
var SESSION_UNAVAILABLE_MESSAGE = "Sign-in needs an Astro session driver. Configure session.driver in astro.config.mjs.";
/**
* Error for sign-in routes when Astro has no session to store the user in.
* Check before consuming tokens so a failed sign-in can be retried.
*/
function sessionUnavailableError() {
	return apiError(ErrorCode.SESSION_UNAVAILABLE, SESSION_UNAVAILABLE_MESSAGE, 500);
}
export { resolveSessionUser as n, sessionUnavailableError as r, SESSION_UNAVAILABLE_MESSAGE as t };
