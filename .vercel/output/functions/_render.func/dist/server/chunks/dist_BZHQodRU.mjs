import { t as Role } from "./types-ndj-bYfi_AO2tfJCj.mjs";
import { d as generateTokenWithHash, m as hashToken } from "./passkey_CpIENnGH.mjs";
import { encodeBase64urlNoPadding } from "@oslojs/encoding";
import { z } from "zod";
import { sha256 } from "@oslojs/crypto/sha2";
import { createRemoteJWKSet, jwtVerify } from "jose";
// node_modules/@emdash-cms/auth/dist/oauth/providers/github.mjs
/**
* GitHub OAuth provider
*/
var gitHubUserSchema = z.object({
	id: z.number(),
	login: z.string(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	avatar_url: z.string()
});
var gitHubEmailSchema = z.object({
	email: z.string(),
	primary: z.boolean(),
	verified: z.boolean()
});
var github = {
	name: "github",
	authorizeUrl: "https://github.com/login/oauth/authorize",
	tokenUrl: "https://github.com/login/oauth/access_token",
	userInfoUrl: "https://api.github.com/user",
	scopes: ["read:user", "user:email"],
	parseProfile(data) {
		const user = gitHubUserSchema.parse(data);
		return {
			id: String(user.id),
			email: user.email || "",
			name: user.name,
			avatarUrl: user.avatar_url,
			emailVerified: true
		};
	}
};
/**
* Fetch the user's primary email from GitHub
* (needed because email may not be returned in the basic user endpoint)
*/
async function fetchGitHubEmail(accessToken) {
	const response = await fetch("https://api.github.com/user/emails", { headers: {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "emdash-cms"
	} });
	if (!response.ok) throw new Error(`Failed to fetch GitHub emails: ${response.status}`);
	const json = await response.json();
	const primary = z.array(gitHubEmailSchema).parse(json).find((e) => e.primary && e.verified);
	if (!primary) throw new Error("No verified primary email found on GitHub account");
	return primary.email;
}
// node_modules/@emdash-cms/auth/dist/oauth/providers/google.mjs
/**
* Google OAuth provider (using OIDC)
*/
var googleUserSchema = z.object({
	sub: z.string(),
	email: z.string(),
	email_verified: z.boolean(),
	name: z.string(),
	picture: z.string()
});
var google = {
	name: "google",
	authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
	tokenUrl: "https://oauth2.googleapis.com/token",
	userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
	scopes: [
		"openid",
		"email",
		"profile"
	],
	parseProfile(data) {
		const user = googleUserSchema.parse(data);
		return {
			id: user.sub,
			email: user.email,
			name: user.name,
			avatarUrl: user.picture,
			emailVerified: user.email_verified
		};
	}
};
// node_modules/@emdash-cms/auth/dist/index.mjs
/**
* Configuration schema for @emdash-cms/auth
*/
/** Matches http(s) scheme at start of URL */
var HTTP_SCHEME_RE = /^https?:\/\//i;
/** Validates that a URL string uses http or https scheme. Rejects javascript:/data: URI XSS vectors. */
var httpUrl = z.url().refine((url) => HTTP_SCHEME_RE.test(url), "URL must use http or https");
/**
* OAuth provider configuration
*/
var oauthProviderSchema = z.object({
	clientId: z.string(),
	clientSecret: z.string()
});
z.object({
	secret: z.string().min(32, "Auth secret must be at least 32 characters"),
	passkeys: z.object({
		rpName: z.string(),
		rpId: z.string().optional()
	}).optional(),
	selfSignup: z.object({
		domains: z.array(z.string()),
		defaultRole: z.enum([
			"subscriber",
			"contributor",
			"author"
		]).default("contributor")
	}).optional(),
	oauth: z.object({
		github: oauthProviderSchema.optional(),
		google: oauthProviderSchema.optional()
	}).optional(),
	provider: z.object({
		enabled: z.boolean(),
		issuer: httpUrl.optional()
	}).optional(),
	sso: z.object({ enabled: z.boolean() }).optional(),
	session: z.object({
		maxAge: z.number().default(2592e3),
		sliding: z.boolean().default(true)
	}).optional()
});
/**
* Permission definitions with minimum role required
*/
var Permissions = {
	"content:read": Role.SUBSCRIBER,
	"content:read_drafts": Role.CONTRIBUTOR,
	"content:create": Role.CONTRIBUTOR,
	"content:edit_own_drafts": Role.CONTRIBUTOR,
	"content:edit_own": Role.AUTHOR,
	"content:edit_any": Role.EDITOR,
	"content:delete_own": Role.AUTHOR,
	"content:delete_any": Role.EDITOR,
	"content:delete_permanent": Role.ADMIN,
	"content:publish_own": Role.AUTHOR,
	"content:publish_any": Role.EDITOR,
	"media:read": Role.SUBSCRIBER,
	"media:upload": Role.CONTRIBUTOR,
	"media:edit_own": Role.AUTHOR,
	"media:edit_any": Role.EDITOR,
	"media:delete_own": Role.AUTHOR,
	"media:delete_any": Role.EDITOR,
	"taxonomies:read": Role.SUBSCRIBER,
	"taxonomies:manage": Role.EDITOR,
	"comments:read": Role.SUBSCRIBER,
	"comments:moderate": Role.EDITOR,
	"comments:delete": Role.ADMIN,
	"comments:settings": Role.ADMIN,
	"menus:read": Role.SUBSCRIBER,
	"menus:manage": Role.EDITOR,
	"bylines:read": Role.SUBSCRIBER,
	"bylines:manage": Role.EDITOR,
	"widgets:read": Role.SUBSCRIBER,
	"widgets:manage": Role.EDITOR,
	"sections:read": Role.SUBSCRIBER,
	"sections:manage": Role.EDITOR,
	"redirects:read": Role.EDITOR,
	"redirects:manage": Role.ADMIN,
	"users:read": Role.ADMIN,
	"users:invite": Role.ADMIN,
	"users:manage": Role.ADMIN,
	"settings:read": Role.EDITOR,
	"settings:manage": Role.ADMIN,
	"schema:read": Role.EDITOR,
	"schema:manage": Role.ADMIN,
	"plugins:read": Role.EDITOR,
	"plugins:manage": Role.ADMIN,
	"import:execute": Role.ADMIN,
	"backups:manage": Role.ADMIN,
	"transfer:export": Role.ADMIN,
	"transfer:import": Role.ADMIN,
	"updates:read": Role.ADMIN,
	"search:read": Role.SUBSCRIBER,
	"search:manage": Role.ADMIN,
	"auth:manage_own_credentials": Role.SUBSCRIBER,
	"auth:manage_connections": Role.ADMIN
};
/**
* Check if a user has a specific permission
*/
function hasPermission(user, permission) {
	if (!user) return false;
	return user.role >= Permissions[permission];
}
/**
* Check if user can perform action on a resource they own
*/
function canActOnOwn(user, ownerId, ownPermission, anyPermission) {
	if (!user) return false;
	if (ownerId !== "" && user.id === ownerId) return hasPermission(user, ownPermission);
	return hasPermission(user, anyPermission);
}
/**
* Minimum role required for each API token scope.
*
* This is the authoritative mapping between the two authorization systems
* (RBAC roles and API token scopes). When issuing a token, the granted
* scopes must be intersected with the scopes allowed by the user's role.
*/
var SCOPE_MIN_ROLE = {
	"content:read": Role.SUBSCRIBER,
	"content:write": Role.CONTRIBUTOR,
	"media:read": Role.SUBSCRIBER,
	"media:write": Role.CONTRIBUTOR,
	"schema:read": Role.EDITOR,
	"schema:write": Role.ADMIN,
	"taxonomies:manage": Role.EDITOR,
	"menus:manage": Role.EDITOR,
	"settings:read": Role.EDITOR,
	"settings:manage": Role.ADMIN,
	"mcp:tools": Role.ADMIN,
	"transfer:export": Role.ADMIN,
	"transfer:analyze": Role.ADMIN,
	"transfer:execute": Role.ADMIN,
	admin: Role.ADMIN
};
/**
* Return the maximum set of API token scopes a given role level may hold.
*
* Used at token issuance time (device flow, authorization code exchange)
* to enforce: effective_scopes = requested_scopes ∩ scopesForRole(role).
*/
function scopesForRole(role) {
	return Object.entries(SCOPE_MIN_ROLE).reduce((acc, [scope, minRole]) => {
		if (role >= minRole) acc.push(scope);
		return acc;
	}, []);
}
/**
* Clamp a set of requested scopes to those permitted by a user's role.
*
* Returns the intersection of `requested` and the scopes the role allows.
* This is the central policy enforcement point: effective permissions =
* role permissions ∩ token scopes.
*/
function clampScopes(requested, role) {
	const allowed = new Set(scopesForRole(role));
	return requested.filter((scope) => allowed.has(scope) || scope.startsWith("mcp:tools:") && role >= Role.SUBSCRIBER);
}
/**
* Invite system for new users
*/
/** Escape HTML special characters to prevent injection in email templates */
function escapeHtml(s) {
	return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
/**
* RTL primary language subtags (BCP 47). Mirrors the admin's
* `getLocaleDir` without @emdash-cms/auth depending on the admin package.
*/
var RTL_SUBTAGS = /* @__PURE__ */ new Set([
	"ar",
	"fa",
	"he",
	"ur",
	"ps",
	"sd",
	"ug",
	"yi",
	"ckb",
	"dv"
]);
var SUBTAG_SPLIT_RE = /[-_]/;
/** Text direction for a BCP 47 locale code ("ltr" unless the primary subtag is RTL). */
function localeDir(locale) {
	const primary = locale.toLowerCase().split(SUBTAG_SPLIT_RE)[0] ?? "";
	return RTL_SUBTAGS.has(primary) ? "rtl" : "ltr";
}
var TOKEN_EXPIRY_MS$2 = 6048e5;
/**
* Create an invite token and URL without sending email.
*
* Validates the user doesn't already exist, generates a token, stores it,
* and returns the invite URL. Callers decide whether to send email or
* display the URL as a copy-link fallback.
*/
async function createInviteToken(config, adapter, email, role, invitedBy) {
	if (await adapter.getUserByEmail(email)) throw new InviteError("user_exists", "A user with this email already exists");
	const { token, hash } = generateTokenWithHash();
	await adapter.createToken({
		hash,
		email,
		type: "invite",
		role,
		invitedBy,
		expiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS$2)
	});
	const url = new URL(`${config.baseUrl}/admin/invite/accept`);
	url.searchParams.set("token", token);
	return {
		url: url.toString(),
		email
	};
}
/** English fallback copy for the invite email. */
function defaultInviteEmailStrings(siteName) {
	return {
		subject: `You've been invited to ${siteName}`,
		textIntro: `You've been invited to join ${siteName}.`,
		textLinkInstruction: "Click this link to create your account:",
		htmlInstruction: "Click the button below to create your account:",
		buttonLabel: "Accept Invite",
		expiryNote: "This link expires in 7 days."
	};
}
/**
* Build the invite email message.
*
* Exported for tests and for callers that render the message without
* sending (localized copy is injected via `strings`).
*/
function buildInviteEmail(inviteUrl, email, siteName, strings, locale) {
	const s = strings ?? defaultInviteEmailStrings(siteName);
	const langAttr = locale ? ` lang="${escapeHtml(locale)}" dir="${localeDir(locale)}"` : "";
	return {
		to: email,
		subject: s.subject,
		text: `${s.textIntro}\n\n${s.textLinkInstruction}\n${inviteUrl}\n\n${s.expiryNote}`,
		html: `
<!DOCTYPE html>
<html${langAttr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">${escapeHtml(s.subject)}</h1>
  <p>${escapeHtml(s.htmlInstruction)}</p>
  <p style="margin: 30px 0;">
    <a href="${inviteUrl}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">${escapeHtml(s.buttonLabel)}</a>
  </p>
  <p style="color: #666; font-size: 14px;">${escapeHtml(s.expiryNote)}</p>
</body>
</html>`
	};
}
/**
* Create and send an invite to a new user.
*
* When `config.email` is provided, sends the invite email.
* When omitted, creates the token and returns the invite URL
* without sending (for the copy-link fallback).
*/
async function createInvite(config, adapter, email, role, invitedBy) {
	const result = await createInviteToken(config, adapter, email, role, invitedBy);
	if (config.email) {
		const message = buildInviteEmail(result.url, email, config.siteName, config.emailStrings, config.emailLocale);
		await config.email(message);
	}
	return result;
}
/**
* Validate an invite token and return the invite data
*/
async function validateInvite(adapter, token) {
	const hash = hashToken(token);
	const authToken = await adapter.getToken(hash, "invite");
	if (!authToken) throw new InviteError("invalid_token", "Invalid or expired invite link");
	if (authToken.expiresAt < /* @__PURE__ */ new Date()) {
		await adapter.deleteToken(hash);
		throw new InviteError("token_expired", "This invite has expired");
	}
	if (!authToken.email || authToken.role === null) throw new InviteError("invalid_token", "Invalid invite data");
	return {
		email: authToken.email,
		role: authToken.role
	};
}
/**
* Complete the invite process (after passkey registration)
*/
async function completeInvite(adapter, token, userData) {
	const hash = hashToken(token);
	const authToken = await adapter.consumeToken(hash, "invite");
	if (!authToken || authToken.expiresAt < /* @__PURE__ */ new Date()) throw new InviteError("invalid_token", "Invalid or expired invite");
	if (!authToken.email || authToken.role === null) throw new InviteError("invalid_token", "Invalid invite data");
	return await adapter.createUser({
		email: authToken.email,
		name: userData.name,
		avatarUrl: userData.avatarUrl,
		role: authToken.role,
		emailVerified: true
	});
}
var InviteError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "InviteError";
	}
};
/**
* Magic link authentication
*/
var TOKEN_EXPIRY_MS$1 = 9e5;
/**
* Add artificial delay with jitter to prevent timing attacks.
* Range approximates the time for token creation + email send.
*/
async function timingDelay$1() {
	const delay = 100 + Math.random() * 150;
	await new Promise((resolve) => setTimeout(resolve, delay));
}
/**
* Send a magic link to a user's email.
*
* Requires `config.email` to be set. Throws if no email sender is configured.
*/
async function sendMagicLink(config, adapter, email, type = "magic_link") {
	if (!config.email) throw new MagicLinkError("email_not_configured", "Email is not configured");
	const user = await adapter.getUserByEmail(email);
	if (!user) {
		await timingDelay$1();
		return;
	}
	const message = buildMagicLinkEmail(await createMagicLinkUrl(adapter, user, config.baseUrl, { type }), user.email, config.siteName, config.emailStrings, config.emailLocale);
	await config.email(message);
}
/**
* Create a single-use sign-in link for `user` on `baseUrl`. The link opens
* the same confirmation page as an emailed sign-in link.
*/
async function createMagicLinkUrl(adapter, user, baseUrl, options = {}) {
	const { token, hash } = generateTokenWithHash();
	await adapter.createToken({
		hash,
		userId: user.id,
		email: user.email,
		type: options.type ?? "magic_link",
		expiresAt: new Date(Date.now() + (options.expiresInMs ?? TOKEN_EXPIRY_MS$1))
	});
	const url = new URL("/_emdash/api/auth/magic-link/verify", baseUrl);
	url.searchParams.set("token", token);
	if (options.redirect) url.searchParams.set("redirect", options.redirect);
	return url.toString();
}
/** English fallback copy for the sign-in email. */
function defaultMagicLinkEmailStrings(siteName) {
	return {
		subject: `Sign in to ${siteName}`,
		textLinkInstruction: `Click this link to sign in to ${siteName}:`,
		htmlInstruction: "Click the button below to sign in:",
		buttonLabel: "Sign in",
		expiryNote: "This link expires in 15 minutes.",
		ignoreNote: "If you didn't request this, you can safely ignore this email."
	};
}
/**
* Build the sign-in (magic link / recovery) email message.
*
* Exported for tests; localized copy is injected via `strings`.
*/
function buildMagicLinkEmail(linkUrl, email, siteName, strings, locale) {
	const s = strings ?? defaultMagicLinkEmailStrings(siteName);
	const langAttr = locale ? ` lang="${escapeHtml(locale)}" dir="${localeDir(locale)}"` : "";
	return {
		to: email,
		subject: s.subject,
		text: `${s.textLinkInstruction}\n\n${linkUrl}\n\n${s.expiryNote}\n\n${s.ignoreNote}`,
		html: `
<!DOCTYPE html>
<html${langAttr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">${escapeHtml(s.subject)}</h1>
  <p>${escapeHtml(s.htmlInstruction)}</p>
  <p style="margin: 30px 0;">
    <a href="${linkUrl}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">${escapeHtml(s.buttonLabel)}</a>
  </p>
  <p style="color: #666; font-size: 14px;">${escapeHtml(s.expiryNote)}</p>
  <p style="color: #666; font-size: 14px;">${escapeHtml(s.ignoreNote)}</p>
</body>
</html>`
	};
}
/**
* Verify a magic link token and return the user
*/
async function verifyMagicLink(adapter, token) {
	const hash = hashToken(token);
	const authToken = await adapter.consumeToken(hash, "magic_link") ?? await adapter.consumeToken(hash, "recovery");
	if (!authToken) throw new MagicLinkError("invalid_token", "Invalid or expired link");
	if (authToken.expiresAt < /* @__PURE__ */ new Date()) throw new MagicLinkError("token_expired", "This link has expired");
	if (!authToken.userId) throw new MagicLinkError("invalid_token", "Invalid token");
	const user = await adapter.getUserById(authToken.userId);
	if (!user) throw new MagicLinkError("user_not_found", "User not found");
	return user;
}
var MagicLinkError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "MagicLinkError";
	}
};
/**
* Self-signup for allowed email domains
*/
var TOKEN_EXPIRY_MS = 9e5;
/**
* Add artificial delay with jitter to prevent timing attacks.
* Range approximates the time for token creation + email send.
*/
async function timingDelay() {
	const delay = 100 + Math.random() * 150;
	await new Promise((resolve) => setTimeout(resolve, delay));
}
/**
* Check if an email domain is allowed for self-signup
*/
async function canSignup(adapter, email) {
	const domain = email.split("@")[1]?.toLowerCase();
	if (!domain) return null;
	const allowedDomain = await adapter.getAllowedDomain(domain);
	if (!allowedDomain || !allowedDomain.enabled) return null;
	return {
		allowed: true,
		role: allowedDomain.defaultRole
	};
}
/**
* Request self-signup (sends verification email).
*
* Requires `config.email` to be set. Throws if no email sender is configured.
*/
async function requestSignup(config, adapter, email) {
	if (!config.email) throw new SignupError("email_not_configured", "Email is not configured");
	if (await adapter.getUserByEmail(email)) {
		await timingDelay();
		return;
	}
	const signup = await canSignup(adapter, email);
	if (!signup) {
		await timingDelay();
		return;
	}
	const { token, hash } = generateTokenWithHash();
	await adapter.createToken({
		hash,
		email,
		type: "email_verify",
		role: signup.role,
		expiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS)
	});
	const url = new URL(`${config.baseUrl}/admin/signup`);
	url.searchParams.set("token", token);
	const safeName = escapeHtml(config.siteName);
	await config.email({
		to: email,
		subject: `Verify your email for ${config.siteName}`,
		text: `Click this link to verify your email and create your account:\n\n${url.toString()}\n\nThis link expires in 15 minutes.\n\nIf you didn't request this, you can safely ignore this email.`,
		html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-size: 24px; margin-bottom: 20px;">Verify your email</h1>
  <p>Click the button below to verify your email and create your ${safeName} account:</p>
  <p style="margin: 30px 0;">
    <a href="${url.toString()}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a>
  </p>
  <p style="color: #666; font-size: 14px;">This link expires in 15 minutes.</p>
  <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
</body>
</html>`
	});
}
/**
* Validate a signup verification token
*/
async function validateSignupToken(adapter, token) {
	const hash = hashToken(token);
	const authToken = await adapter.getToken(hash, "email_verify");
	if (!authToken) throw new SignupError("invalid_token", "Invalid or expired verification link");
	if (authToken.expiresAt < /* @__PURE__ */ new Date()) {
		await adapter.deleteToken(hash);
		throw new SignupError("token_expired", "This link has expired");
	}
	if (!authToken.email || authToken.role === null) throw new SignupError("invalid_token", "Invalid token data");
	return {
		email: authToken.email,
		role: authToken.role
	};
}
/**
* Complete signup process (after passkey registration)
*/
async function completeSignup(adapter, token, userData) {
	const hash = hashToken(token);
	const authToken = await adapter.consumeToken(hash, "email_verify");
	if (!authToken || authToken.expiresAt < /* @__PURE__ */ new Date()) throw new SignupError("invalid_token", "Invalid or expired verification");
	if (!authToken.email || authToken.role === null) throw new SignupError("invalid_token", "Invalid token data");
	if (await adapter.getUserByEmail(authToken.email)) throw new SignupError("user_exists", "An account with this email already exists");
	return await adapter.createUser({
		email: authToken.email,
		name: userData.name,
		avatarUrl: userData.avatarUrl,
		role: authToken.role,
		emailVerified: true
	});
}
var SignupError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "SignupError";
	}
};
/**
* Microsoft Entra ID OAuth provider (OIDC, v2.0 endpoints)
*/
var LOGIN_HOST = "https://login.microsoftonline.com";
/** Tenant ID of personal Microsoft accounts */
var CONSUMERS_TENANT_ID = "9188040d-6c67-4c5b-b112-36a304b66dad";
var MULTI_TENANT_SEGMENTS = /* @__PURE__ */ new Set([
	"common",
	"organizations",
	"consumers"
]);
var TENANT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/**
* Microsoft documents `xms_edov` as a boolean, but its encoding in tokens is
* reported inconsistently, so the string and number forms of true count too.
*/
var XMS_EDOV_TRUE = /* @__PURE__ */ new Set([
	true,
	"true",
	1,
	"1"
]);
var idTokenClaimsSchema = z.object({
	sub: z.string(),
	iss: z.string(),
	tid: z.string(),
	nonce: z.string(),
	idp: z.string().optional(),
	email: z.string().optional(),
	preferred_username: z.string().optional(),
	name: z.string().optional(),
	xms_edov: z.unknown().optional()
});
/**
* Whether `tenant` is a directory (tenant) ID or one of the multi-tenant
* segments. Domain names are rejected because the ID token identifies the
* tenant by ID only, so a domain could not be checked against it.
*/
function isValidMicrosoftTenant(tenant) {
	return TENANT_ID_PATTERN.test(tenant) || MULTI_TENANT_SEGMENTS.has(tenant);
}
function domainOf(address) {
	if (!address) return void 0;
	const at = address.lastIndexOf("@");
	return at === -1 ? void 0 : address.slice(at + 1).toLowerCase();
}
var JWKS_CACHE_KEY = Symbol.for("emdash:auth:microsoft-jwks");
function getTenantKeys(tenant) {
	const g = globalThis;
	let cache = g[JWKS_CACHE_KEY];
	if (!cache) {
		cache = /* @__PURE__ */ new Map();
		g[JWKS_CACHE_KEY] = cache;
	}
	let keys = cache.get(tenant);
	if (!keys) {
		keys = createRemoteJWKSet(new URL(`${LOGIN_HOST}/${tenant}/discovery/v2.0/keys`));
		cache.set(tenant, keys);
	}
	return keys;
}
function checkTenant(configured, tid) {
	const tenantId = tid.toLowerCase();
	if (configured === "common") return;
	if (configured === "organizations") {
		if (tenantId === CONSUMERS_TENANT_ID) throw new Error("Personal Microsoft accounts are not accepted");
		return;
	}
	if (tenantId !== (configured === "consumers" ? CONSUMERS_TENANT_ID : configured.toLowerCase())) throw new Error("ID token was issued for a different tenant");
}
/**
* Create the Microsoft provider for one app registration.
*
* @param keys - Signing key source; defaults to the tenant's published JWKS
*/
function createMicrosoftProvider(config, keys) {
	if (!isValidMicrosoftTenant(config.tenant)) throw new Error(`Invalid Microsoft tenant: ${config.tenant}`);
	const specificTenant = !MULTI_TENANT_SEGMENTS.has(config.tenant) && config.tenant.toLowerCase() !== CONSUMERS_TENANT_ID;
	const endpoint = `${LOGIN_HOST}/${config.tenant}/oauth2/v2.0`;
	return {
		name: "microsoft",
		authorizeUrl: `${endpoint}/authorize`,
		tokenUrl: `${endpoint}/token`,
		scopes: [
			"openid",
			"email",
			"profile"
		],
		requireVerifiedEmailForSignup: true,
		async verifyIdToken(idToken, nonce) {
			const { payload } = await jwtVerify(idToken, keys ?? getTenantKeys(config.tenant), {
				audience: config.clientId,
				algorithms: ["RS256"],
				requiredClaims: ["exp"]
			});
			const claims = idTokenClaimsSchema.parse(payload);
			if (claims.iss !== `${LOGIN_HOST}/${claims.tid}/v2.0`) throw new Error("ID token issuer does not match its tenant");
			checkTenant(config.tenant, claims.tid);
			if (claims.nonce !== nonce) throw new Error("ID token nonce does not match");
			return payload;
		},
		parseProfile(data) {
			const claims = idTokenClaimsSchema.parse(data);
			const email = claims.email ?? claims.preferred_username;
			if (!email?.includes("@")) throw new Error("ID token carries no email address");
			const guest = claims.idp !== void 0 && claims.idp !== claims.iss;
			const domainOwned = claims.email === void 0 || domainOf(claims.email) === domainOf(claims.preferred_username) || XMS_EDOV_TRUE.has(claims.xms_edov);
			return {
				id: claims.sub,
				email,
				name: claims.name ?? null,
				avatarUrl: null,
				emailVerified: config.emailVerified ?? (specificTenant && !guest && domainOwned)
			};
		}
	};
}
/**
* OAuth consumer - "Login with X" functionality
*/
/**
* Generate an OAuth authorization URL
*/
async function createAuthorizationUrl(config, providerName, stateStore, options) {
	const providerConfig = config.providers[providerName];
	if (!providerConfig) throw new Error(`OAuth provider ${providerName} not configured`);
	const provider = getProvider(providerName, config);
	const state = generateState();
	const nonce = provider.verifyIdToken ? generateState() : void 0;
	const redirectUri = new URL(`/_emdash/api/auth/oauth/${providerName}/callback`, config.baseUrl).toString();
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	await stateStore.set(state, {
		provider: providerName,
		redirectUri,
		codeVerifier,
		...nonce ? { nonce } : {},
		...options?.inviteToken ? { inviteToken: options.inviteToken } : {}
	});
	const url = new URL(provider.authorizeUrl);
	url.searchParams.set("client_id", providerConfig.clientId);
	url.searchParams.set("redirect_uri", redirectUri);
	url.searchParams.set("response_type", "code");
	url.searchParams.set("scope", provider.scopes.join(" "));
	url.searchParams.set("state", state);
	url.searchParams.set("code_challenge", codeChallenge);
	url.searchParams.set("code_challenge_method", "S256");
	if (nonce) url.searchParams.set("nonce", nonce);
	return {
		url: url.toString(),
		state
	};
}
/**
* Handle OAuth callback
*/
async function handleOAuthCallback(config, adapter, providerName, code, state, stateStore) {
	const providerConfig = config.providers[providerName];
	if (!providerConfig) throw new Error(`OAuth provider ${providerName} not configured`);
	const storedState = await stateStore.get(state);
	if (!storedState || storedState.provider !== providerName) throw new OAuthError("invalid_state", "Invalid OAuth state");
	await stateStore.delete(state);
	const provider = getProvider(providerName, config);
	const tokens = await exchangeCode(provider, providerConfig, code, storedState.redirectUri, storedState.codeVerifier);
	const profile = provider.verifyIdToken ? await profileFromIdToken(provider, tokens.idToken, storedState.nonce) : await fetchProfile(provider, tokens.accessToken, providerName);
	if (storedState.inviteToken) return acceptInviteViaOAuth(adapter, providerName, profile, storedState.inviteToken);
	return findOrCreateOAuthUser(adapter, providerName, profile, config.canSelfSignup, { requireVerifiedEmail: provider.requireVerifiedEmailForSignup });
}
/**
* Complete an invite using an OAuth identity.
*
* The invite is only accepted when the provider has verified the email AND it
* matches the invited address (case-insensitive), so a login for a different
* account cannot consume someone else's invite. On success the user is created
* with the invited role and the OAuth account is linked.
*/
async function acceptInviteViaOAuth(adapter, providerName, profile, inviteToken) {
	let invite;
	try {
		invite = await validateInvite(adapter, inviteToken);
	} catch (error) {
		if (error instanceof InviteError) throw new OAuthError("invite_invalid", error.message);
		throw error;
	}
	if (!profile.emailVerified) throw new OAuthError("invite_email_unverified", "Cannot accept invite: email not verified by provider");
	if (profile.email.toLowerCase() !== invite.email.toLowerCase()) throw new OAuthError("invite_email_mismatch", "This invite was sent to a different email address than your account.");
	const existingAccount = await adapter.getOAuthAccount(providerName, profile.id);
	if (existingAccount) {
		const user = await adapter.getUserById(existingAccount.userId);
		if (!user) throw new OAuthError("user_not_found", "Linked user not found");
		if (user.email.toLowerCase() !== invite.email.toLowerCase()) throw new OAuthError("invite_email_mismatch", "This invite was sent to a different email address than your account.");
		await adapter.deleteToken(hashToken(inviteToken));
		return user;
	}
	const existingUser = await adapter.getUserByEmail(profile.email);
	if (existingUser) {
		await adapter.createOAuthAccount({
			provider: providerName,
			providerAccountId: profile.id,
			userId: existingUser.id
		});
		await adapter.deleteToken(hashToken(inviteToken));
		return existingUser;
	}
	const user = await completeInvite(adapter, inviteToken, {
		name: profile.name ?? void 0,
		avatarUrl: profile.avatarUrl ?? void 0
	});
	await adapter.createOAuthAccount({
		provider: providerName,
		providerAccountId: profile.id,
		userId: user.id
	});
	return user;
}
/**
* Exchange authorization code for tokens
*/
async function exchangeCode(provider, config, code, redirectUri, codeVerifier) {
	const body = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: redirectUri,
		client_id: config.clientId,
		client_secret: config.clientSecret
	});
	if (codeVerifier) body.set("code_verifier", codeVerifier);
	const response = await fetch(provider.tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "application/json"
		},
		body
	});
	if (!response.ok) throw new OAuthError("token_exchange_failed", `Token exchange failed: ${await response.text()}`);
	const json = await response.json();
	const data = z.object({
		access_token: z.string(),
		id_token: z.string().optional()
	}).parse(json);
	return {
		accessToken: data.access_token,
		idToken: data.id_token
	};
}
/**
* Fetch user profile from OAuth provider
*/
async function fetchProfile(provider, accessToken, providerName) {
	if (!provider.userInfoUrl) throw new Error("Provider does not have userinfo URL");
	const response = await fetch(provider.userInfoUrl, { headers: {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/json",
		"User-Agent": "emdash-cms"
	} });
	if (!response.ok) throw new OAuthError("profile_fetch_failed", `Failed to fetch profile: ${response.status}`);
	const data = await response.json();
	const profile = provider.parseProfile(data);
	if (providerName === "github" && !profile.email) profile.email = await fetchGitHubEmail(accessToken);
	return profile;
}
/**
* Read the user profile from a verified ID token
*/
async function profileFromIdToken(provider, idToken, nonce) {
	if (!provider.verifyIdToken || !idToken || !nonce) throw new OAuthError("id_token_invalid", "Missing ID token or nonce");
	try {
		return provider.parseProfile(await provider.verifyIdToken(idToken, nonce));
	} catch (error) {
		throw new OAuthError("id_token_invalid", error instanceof Error ? error.message : "Invalid ID token");
	}
}
/**
* Find existing user or create new one (with auto-linking).
*
* Shared across all OAuth providers (GitHub, Google, AT Protocol, etc.).
* The provider-specific token exchange happens before this function is called;
* this function only deals with the EmDash user record.
*/
async function findOrCreateOAuthUser(adapter, providerName, profile, canSelfSignup, options) {
	const existingAccount = await adapter.getOAuthAccount(providerName, profile.id);
	if (existingAccount) {
		const user = await adapter.getUserById(existingAccount.userId);
		if (!user) throw new OAuthError("user_not_found", "Linked user not found");
		return user;
	}
	const existingUser = await adapter.getUserByEmail(profile.email);
	if (existingUser) {
		if (!profile.emailVerified) throw new OAuthError("signup_not_allowed", "Cannot link account: email not verified by provider");
		await adapter.createOAuthAccount({
			provider: providerName,
			providerAccountId: profile.id,
			userId: existingUser.id
		});
		return existingUser;
	}
	if (canSelfSignup) {
		const signup = await canSelfSignup(profile.email);
		if (signup?.allowed) {
			if (options?.requireVerifiedEmail && !profile.emailVerified) throw new OAuthError("signup_not_allowed", "Cannot sign up: email not verified by provider");
			const user = await adapter.createUser({
				email: profile.email,
				name: profile.name,
				avatarUrl: profile.avatarUrl,
				role: signup.role,
				emailVerified: profile.emailVerified
			});
			await adapter.createOAuthAccount({
				provider: providerName,
				providerAccountId: profile.id,
				userId: user.id
			});
			return user;
		}
	}
	throw new OAuthError("signup_not_allowed", "Self-signup not allowed for this email domain");
}
function getProvider(name, config) {
	switch (name) {
		case "github": return github;
		case "google": return google;
		case "microsoft": {
			const microsoftConfig = config.providers.microsoft;
			if (!microsoftConfig) throw new Error("OAuth provider microsoft not configured");
			return createMicrosoftProvider(microsoftConfig);
		}
	}
}
/**
* Generate a random state string for OAuth CSRF protection
*/
function generateState() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return encodeBase64urlNoPadding(bytes);
}
function generateCodeVerifier() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return encodeBase64urlNoPadding(bytes);
}
async function generateCodeChallenge(verifier) {
	return encodeBase64urlNoPadding(sha256(new TextEncoder().encode(verifier)));
}
var OAuthError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "OAuthError";
	}
};
export { requestSignup as _, SignupError as a, validateSignupToken as b, completeInvite as c, createInvite as d, createMagicLinkUrl as f, isValidMicrosoftTenant as g, hasPermission as h, Permissions as i, completeSignup as l, handleOAuthCallback as m, MagicLinkError as n, canActOnOwn as o, escapeHtml as p, OAuthError as r, clampScopes as s, InviteError as t, createAuthorizationUrl as u, sendMagicLink as v, verifyMagicLink as x, validateInvite as y };
