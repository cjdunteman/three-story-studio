import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { t as withTransaction } from "./transaction-CkoQ5wqQ_BXsTiEpV.mjs";
import { _ as secureCompare, c as generatePrefixedToken, h as isValidScope, n as TOKEN_PREFIXES, o as computeS256Challenge, p as hashPrefixedToken } from "./passkey_CpIENnGH.mjs";
import { t as ACCESS_TOKEN_TTL_SECONDS } from "./api-tokens-DqSlkDVI_T5D-FIqb.mjs";
import { c as validateRedirectUri, o as lookupOAuthClient, s as validateClientRedirectUri } from "./oauth-clients-BT0Pg-MO_C-JAktPh.mjs";
import { t as lookupUserRoleAndStatus } from "./oauth-user-lookup-BDgF6IVG_BQW973ok.mjs";
import { s as clampScopes } from "./dist_BZHQodRU.mjs";
import { generateCodeVerifier } from "arctic";
// node_modules/emdash/dist/oauth-authorization-CPLgBrdo.mjs
/**
* OAuth 2.1 Authorization Code + PKCE handlers.
*
* Implements the server side of the authorization code grant for MCP clients
* (Claude Desktop, VS Code, etc.) per the MCP authorization spec (draft).
*
* Uses arctic for PKCE challenge generation and @emdash-cms/auth for token
* utilities. Token infrastructure is shared with the device flow.
*/
var oauth_authorization_exports = /* @__PURE__ */ __exportAll({
	buildDeniedRedirect: () => buildDeniedRedirect,
	cleanupExpiredAuthorizationCodes: () => cleanupExpiredAuthorizationCodes,
	handleAuthorizationApproval: () => handleAuthorizationApproval,
	handleAuthorizationCodeExchange: () => handleAuthorizationCodeExchange,
	validateRedirectUri: () => validateRedirectUri
});
/** Authorization codes expire after 10 minutes (RFC 6749 §4.1.2 recommends short-lived) */
var AUTH_CODE_TTL_SECONDS = 600;
/** Refresh token TTL: 90 days */
var REFRESH_TOKEN_TTL_SECONDS = 7776e3;
function expiresAt(seconds) {
	return new Date(Date.now() + seconds * 1e3).toISOString();
}
/**
* Validate and normalize scopes. Returns validated scope list.
*/
function normalizeScopes(requested) {
	if (!requested) return [];
	return requested.split(" ").filter(Boolean).filter(isValidScope);
}
/**
* Process an authorization request after the user approves consent.
*
* Generates an authorization code, stores it with the PKCE challenge,
* and returns the redirect URL with the code appended.
*
* Scopes are clamped to the user's role to prevent scope escalation.
*/
async function handleAuthorizationApproval(db, userId, userRole, params) {
	try {
		if (params.response_type !== "code") return {
			success: false,
			error: {
				code: "UNSUPPORTED_RESPONSE_TYPE",
				message: "Only response_type=code is supported"
			}
		};
		const uriError = validateRedirectUri(params.redirect_uri);
		if (uriError) return {
			success: false,
			error: {
				code: "INVALID_REDIRECT_URI",
				message: uriError
			}
		};
		const client = await lookupOAuthClient(db, params.client_id);
		if (!client) return {
			success: false,
			error: {
				code: "INVALID_CLIENT",
				message: "Unknown client_id"
			}
		};
		const clientUriError = validateClientRedirectUri(params.redirect_uri, client.redirectUris);
		if (clientUriError) return {
			success: false,
			error: {
				code: "INVALID_REDIRECT_URI",
				message: clientUriError
			}
		};
		if (params.code_challenge_method !== "S256") return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Only S256 code_challenge_method is supported"
			}
		};
		if (!params.code_challenge) return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "code_challenge is required"
			}
		};
		const userScopes = clampScopes(normalizeScopes(params.scope), userRole);
		const clientScopes = client.scopes;
		const scopes = clientScopes?.length ? userScopes.filter((s) => clientScopes.includes(s)) : userScopes;
		if (scopes.length === 0) return {
			success: false,
			error: {
				code: "INVALID_SCOPE",
				message: "No valid scopes requested"
			}
		};
		const code = generateCodeVerifier();
		const codeHash = hashPrefixedToken(code);
		await db.insertInto("_emdash_authorization_codes").values({
			code_hash: codeHash,
			client_id: params.client_id,
			redirect_uri: params.redirect_uri,
			user_id: userId,
			scopes: JSON.stringify(scopes),
			code_challenge: params.code_challenge,
			code_challenge_method: params.code_challenge_method,
			resource: params.resource ?? null,
			expires_at: expiresAt(AUTH_CODE_TTL_SECONDS)
		}).execute();
		const redirectUrl = new URL(params.redirect_uri);
		redirectUrl.searchParams.set("code", code);
		if (params.state) redirectUrl.searchParams.set("state", params.state);
		return {
			success: true,
			data: { redirect_url: redirectUrl.toString() }
		};
	} catch (error) {
		console.error("Authorization error:", error);
		return {
			success: false,
			error: {
				code: "AUTHORIZATION_ERROR",
				message: "Failed to process authorization"
			}
		};
	}
}
/**
* Exchange an authorization code for access + refresh tokens.
*
* Validates the code, verifies PKCE, and issues tokens using the same
* infrastructure as the device flow (ec_oat_*, ec_ort_*).
*/
async function handleAuthorizationCodeExchange(db, params) {
	try {
		if (params.grant_type !== "authorization_code") return {
			success: false,
			error: {
				code: "unsupported_grant_type",
				message: "Invalid grant_type"
			}
		};
		const codeHash = hashPrefixedToken(params.code);
		const row = await db.deleteFrom("_emdash_authorization_codes").where("code_hash", "=", codeHash).returningAll().executeTakeFirst();
		if (!row) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "Invalid authorization code"
			}
		};
		if (new Date(row.expires_at) < /* @__PURE__ */ new Date()) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "Authorization code expired"
			}
		};
		if (row.redirect_uri !== params.redirect_uri) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "redirect_uri mismatch"
			}
		};
		if (row.client_id !== params.client_id) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "client_id mismatch"
			}
		};
		if (!secureCompare(computeS256Challenge(params.code_verifier), row.code_challenge)) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "PKCE verification failed"
			}
		};
		if (row.resource && params.resource && row.resource !== params.resource) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "resource mismatch"
			}
		};
		const userInfo = await lookupUserRoleAndStatus(db, row.user_id);
		if (!userInfo) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "User not found"
			}
		};
		if (userInfo.disabled) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "User account is disabled"
			}
		};
		let scopes = clampScopes(JSON.parse(row.scopes), userInfo.role);
		const client = await lookupOAuthClient(db, row.client_id);
		if (client?.scopes?.length) scopes = scopes.filter((s) => client.scopes.includes(s));
		if (scopes.length === 0) return {
			success: false,
			error: {
				code: "invalid_grant",
				message: "User role no longer supports any of the requested scopes"
			}
		};
		const accessToken = generatePrefixedToken(TOKEN_PREFIXES.OAUTH_ACCESS);
		const accessExpires = expiresAt(ACCESS_TOKEN_TTL_SECONDS);
		const refreshToken = generatePrefixedToken(TOKEN_PREFIXES.OAUTH_REFRESH);
		const refreshExpires = expiresAt(REFRESH_TOKEN_TTL_SECONDS);
		await withTransaction(db, async (trx) => {
			await trx.insertInto("_emdash_oauth_tokens").values({
				token_hash: accessToken.hash,
				token_type: "access",
				user_id: row.user_id,
				scopes: JSON.stringify(scopes),
				client_type: "mcp",
				expires_at: accessExpires,
				refresh_token_hash: refreshToken.hash,
				client_id: row.client_id
			}).execute();
			await trx.insertInto("_emdash_oauth_tokens").values({
				token_hash: refreshToken.hash,
				token_type: "refresh",
				user_id: row.user_id,
				scopes: JSON.stringify(scopes),
				client_type: "mcp",
				expires_at: refreshExpires,
				refresh_token_hash: null,
				client_id: row.client_id
			}).execute();
		});
		return {
			success: true,
			data: {
				access_token: accessToken.raw,
				refresh_token: refreshToken.raw,
				token_type: "Bearer",
				expires_in: ACCESS_TOKEN_TTL_SECONDS,
				scope: scopes.join(" ")
			}
		};
	} catch (error) {
		console.error("Token exchange error:", error);
		return {
			success: false,
			error: {
				code: "TOKEN_EXCHANGE_ERROR",
				message: "Failed to exchange authorization code"
			}
		};
	}
}
/**
* Build the authorization denied redirect URL.
*/
function buildDeniedRedirect(redirectUri, state) {
	const url = new URL(redirectUri);
	url.searchParams.set("error", "access_denied");
	url.searchParams.set("error_description", "The user denied the authorization request");
	if (state) url.searchParams.set("state", state);
	return url.toString();
}
/**
* Clean up expired authorization codes.
*/
async function cleanupExpiredAuthorizationCodes(db) {
	const result = await db.deleteFrom("_emdash_authorization_codes").where("expires_at", "<", (/* @__PURE__ */ new Date()).toISOString()).executeTakeFirst();
	return Number(result.numDeletedRows);
}
export { oauth_authorization_exports as i, handleAuthorizationApproval as n, handleAuthorizationCodeExchange as r, buildDeniedRedirect as t };
