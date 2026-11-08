import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { a as encodeBase64url } from "./base64-BQBZwXCx_BV9EFKF5.mjs";
import { u as setSiteSettings } from "./settings-D932YP2-_BU_Wi7Ze.mjs";
import { r as resolveAndValidateExternalUrl } from "./ssrf-BcYjyM4M_6zKEMOUH.mjs";
// node_modules/emdash/dist/site-domain-oRGS_JfA.mjs
var DOMAIN_PROOF_PATH = "/_emdash/api/site/domain-proof";
var PROOF_OPTION = "emdash:domain_proof";
var PROOF_TTL_MS = 6e4;
var CHECK_TIMEOUT_MS = 1e4;
var IPV4_RE = /^\d{1,3}(\.\d{1,3}){3}$/;
/**
* Parse a bare hostname or an `https://` origin into an origin. Paths,
* ports, credentials, IP addresses, and single-label hosts are rejected.
*/
function parseSiteDomain(input) {
	const trimmed = input.trim();
	const candidate = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
	if (!URL.canParse(candidate)) return void 0;
	const url = new URL(candidate);
	if (url.protocol !== "https:") return void 0;
	if (url.username || url.password || url.port || url.search || url.hash) return void 0;
	if (url.pathname !== "/") return void 0;
	const host = url.hostname;
	if (!host.includes(".") || host.endsWith(".") || host.startsWith("[") || IPV4_RE.test(host)) return;
	return url.origin;
}
function checkFailed(message, details) {
	return {
		success: false,
		error: {
			code: "DOMAIN_CHECK_FAILED",
			message,
			details
		}
	};
}
/**
* Verify that `input` serves this site and store it as the Site URL.
*/
async function handleSiteDomainChange(db, input) {
	const origin = parseSiteDomain(input);
	if (!origin) return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: "Enter a domain such as example.com, without a path or port"
		}
	};
	const options = new OptionsRepository(db);
	const token = encodeBase64url(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(24)));
	const proof = {
		token,
		expiresAt: Date.now() + PROOF_TTL_MS
	};
	const revision = await options.setVersioned(PROOF_OPTION, proof);
	try {
		const proofUrl = `${origin}${DOMAIN_PROOF_PATH}`;
		try {
			await resolveAndValidateExternalUrl(proofUrl);
		} catch {
			const host = new URL(origin).hostname;
			return checkFailed(`${host} does not resolve to a public address`, {
				reason: "NO_PUBLIC_ADDRESS",
				host
			});
		}
		let response;
		try {
			response = await fetch(proofUrl, {
				method: "POST",
				redirect: "manual",
				headers: {
					Accept: "application/json",
					"X-EmDash-Request": "1"
				},
				signal: AbortSignal.timeout(CHECK_TIMEOUT_MS)
			});
		} catch {
			return checkFailed(`Could not reach ${origin}`, {
				reason: "UNREACHABLE",
				origin
			});
		}
		if (response.status >= 300 && response.status < 400) {
			const location = response.headers.get("Location");
			const target = location && URL.canParse(location, proofUrl) ? new URL(location, proofUrl) : null;
			return target ? checkFailed(`${origin} redirects to ${target.origin}. Enter that address instead.`, {
				reason: "REDIRECT",
				origin,
				target: target.origin
			}) : checkFailed(`${origin} redirects elsewhere`, {
				reason: "REDIRECT",
				origin
			});
		}
		const body = response.ok ? await response.json().catch(() => null) : null;
		if ((body && typeof body === "object" && "data" in body && body.data && typeof body.data === "object" ? body.data.token : void 0) !== token) return checkFailed(`${origin} does not serve this site yet`, {
			reason: "NOT_SERVING",
			origin
		});
		await setSiteSettings({ url: origin }, db);
		return {
			success: true,
			data: { url: origin }
		};
	} finally {
		await db.deleteFrom("options").where("name", "=", PROOF_OPTION).where("revision", "=", revision).execute();
	}
}
/**
* Return the pending domain proof token, if a check is in progress.
*/
async function handleDomainProof(db) {
	const proof = await new OptionsRepository(db).get(PROOF_OPTION);
	if (!proof || typeof proof.token !== "string" || proof.expiresAt < Date.now()) return {
		success: false,
		error: {
			code: "NOT_FOUND",
			message: "No domain check in progress"
		}
	};
	return {
		success: true,
		data: { token: proof.token }
	};
}
export { handleSiteDomainChange as n, handleDomainProof as t };
