import { decodeBase64urlIgnorePadding, encodeBase64urlNoPadding } from "@oslojs/encoding";
import { SHA256, sha256 } from "@oslojs/crypto/sha2";
import { hmac } from "@oslojs/crypto/hmac";
import { constantTimeEqual } from "@oslojs/crypto/subtle";
import { ECDSAPublicKey, decodePKIXECDSASignature, decodeSEC1PublicKey, p256, verifyECDSASignature } from "@oslojs/crypto/ecdsa";
import { RSAPublicKey, decodePKIXRSAPublicKey, sha256ObjectIdentifier, verifyRSASSAPKCS1v15Signature } from "@oslojs/crypto/rsa";
import { AttestationStatementFormat, COSEKeyType, ClientDataType, coseAlgorithmES256, coseAlgorithmRS256, coseEllipticCurveP256, createAssertionSignatureMessage, parseAttestationObject, parseAuthenticatorData, parseClientDataJSON } from "@oslojs/webauthn";
// node_modules/@emdash-cms/auth/dist/authenticate-DJrZRBu9.mjs
/**
* Secure token utilities
*
* Crypto via Oslo.js (@oslojs/crypto). Base64url via @oslojs/encoding.
*
* Tokens are opaque random values. We store only the SHA-256 hash in the database.
*/
var TOKEN_BYTES = 32;
/** Valid API token prefixes */
var TOKEN_PREFIXES = {
	PAT: "ec_pat_",
	OAUTH_ACCESS: "ec_oat_",
	OAUTH_REFRESH: "ec_ort_"
};
/**
* Site transfer scopes. `admin` grants all three; each transfer scope grants
* only itself, so a token can be limited to one transfer action.
*/
var TRANSFER_SCOPES = [
	"transfer:export",
	"transfer:analyze",
	"transfer:execute"
];
/** All valid API token scopes */
var VALID_SCOPES = [
	"content:read",
	"content:write",
	"media:read",
	"media:write",
	"schema:read",
	"schema:write",
	"taxonomies:manage",
	"menus:manage",
	"settings:read",
	"settings:manage",
	"mcp:tools",
	...TRANSFER_SCOPES,
	"admin"
];
var PLUGIN_MCP_SCOPE_PATTERN = /^mcp:tools:[a-z][a-z0-9_-]*$/;
function isValidScope(scope) {
	return VALID_SCOPES.includes(scope) || PLUGIN_MCP_SCOPE_PATTERN.test(scope);
}
/**
* Scope grants — when a token holds the key scope, it implicitly grants
* the listed scopes too. This keeps existing tokens working when more
* granular scopes are introduced.
*
* Specifically, `content:write` was historically the only scope we checked
* for menu and taxonomy mutations. After splitting those out into
* `menus:manage` and `taxonomies:manage`, existing PATs with `content:write`
* continue to work via this grant table.
*
* Lookup is one-hop — chaining (`A → B → C`) is NOT supported. If a chain
* is needed, expand the values explicitly. Backed by a `Map` rather than a
* plain object so prototype-chain keys (`__proto__`, `constructor`, etc.)
* can't smuggle non-array values through bracket access.
*/
var IMPLICIT_SCOPE_GRANTS = /* @__PURE__ */ new Map([["content:write", ["menus:manage", "taxonomies:manage"]]]);
/**
* Check if a set of scopes includes a required scope.
*
* The `admin` scope grants access to everything. `content:write` implicitly
* grants `menus:manage` and `taxonomies:manage` to preserve backwards
* compatibility with PATs issued before those scopes were split out.
*/
function hasScope(scopes, required) {
	if (required === "mcp:tools" || required.startsWith("mcp:tools:")) return scopes.includes("mcp:tools") || scopes.includes(required);
	if (scopes.includes("admin")) return true;
	if (scopes.includes(required)) return true;
	for (const held of scopes) if (IMPLICIT_SCOPE_GRANTS.get(held)?.includes(required)) return true;
	return false;
}
/**
* Generate a cryptographically secure random token
* Returns base64url-encoded string (URL-safe)
*/
function generateToken() {
	const bytes = new Uint8Array(TOKEN_BYTES);
	crypto.getRandomValues(bytes);
	return encodeBase64urlNoPadding(bytes);
}
/**
* Hash a token for storage
* We never store raw tokens - only their SHA-256 hash
*/
function hashToken(token) {
	let bytes;
	try {
		bytes = decodeBase64urlIgnorePadding(token);
	} catch {
		bytes = new TextEncoder().encode(token);
	}
	return encodeBase64urlNoPadding(sha256(bytes));
}
/**
* Generate a token and its hash together
*/
function generateTokenWithHash() {
	const token = generateToken();
	return {
		token,
		hash: hashToken(token)
	};
}
/**
* Generate a prefixed API token and its hash.
* Returns the raw token (shown once to the user), the hash (stored server-side),
* and a display prefix (for identification in UIs/logs).
*
* Uses oslo/crypto for SHA-256 hashing.
*/
function generatePrefixedToken(prefix) {
	const bytes = new Uint8Array(TOKEN_BYTES);
	crypto.getRandomValues(bytes);
	const raw = `${prefix}${encodeBase64urlNoPadding(bytes)}`;
	return {
		raw,
		hash: hashPrefixedToken(raw),
		prefix: raw.slice(0, prefix.length + 4)
	};
}
/**
* Hash a prefixed API token for storage/lookup.
* Hashes the full prefixed token string via SHA-256, returns base64url (no padding).
*/
function hashPrefixedToken(token) {
	return encodeBase64urlNoPadding(sha256(new TextEncoder().encode(token)));
}
/**
* Compute an S256 PKCE code challenge from a code verifier.
* Used server-side to verify that code_verifier matches the stored code_challenge.
*
* Equivalent to: BASE64URL(SHA256(ASCII(code_verifier)))
*/
function computeS256Challenge(codeVerifier) {
	return encodeBase64urlNoPadding(sha256(new TextEncoder().encode(codeVerifier)));
}
/**
* Constant-time comparison to prevent timing attacks
*/
function secureCompare(a, b) {
	const text = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(TOKEN_BYTES));
	const hash = (str) => hmac(SHA256, salt, text.encode(str));
	return constantTimeEqual(hash(a), hash(b));
}
var BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/;
var MAX_SERIALIZED_CONTEXT_LENGTH = 16384;
var CONTEXT_CHALLENGE_VERSION = 1;
var ChallengeContextError = class extends Error {
	constructor(code, message, options) {
		super(message, options);
		this.code = code;
		this.name = "ChallengeContextError";
	}
};
function canonicalize(value) {
	if (value === null || typeof value === "string" || typeof value === "boolean") return value;
	if (typeof value === "number") {
		if (!Number.isFinite(value)) throw new TypeError("Challenge context numbers must be finite");
		return value;
	}
	if (Array.isArray(value)) return value.map(canonicalize);
	if (typeof value === "object") {
		const prototype = Object.getPrototypeOf(value);
		if (prototype !== Object.prototype && prototype !== null) throw new TypeError("Challenge context must contain only plain objects");
		const result = Object.create(null);
		const entries = Object.entries(value).toSorted(([left], [right]) => left < right ? -1 : left > right ? 1 : 0);
		for (const [key, item] of entries) {
			if (item === void 0) throw new TypeError("Challenge context cannot contain undefined");
			result[key] = canonicalize(item);
		}
		return result;
	}
	throw new TypeError("Challenge context must be JSON-serializable");
}
function serializeEnvelope(type, version, context) {
	return JSON.stringify({
		context: canonicalize(context),
		type,
		version
	});
}
function encodeChallengeContext(codec, context) {
	const serialized = serializeEnvelope(codec.type, codec.version, context);
	const encoded = encodeBase64urlNoPadding(new TextEncoder().encode(serialized));
	if (encoded.length > MAX_SERIALIZED_CONTEXT_LENGTH) throw new TypeError("Challenge context exceeds the maximum serialized size");
	return encoded;
}
function createContextBoundChallenge(nonce, serializedContext) {
	const contextDigest = encodeBase64urlNoPadding(sha256(new TextEncoder().encode(serializedContext)));
	const serialized = JSON.stringify({
		contextDigest,
		nonce,
		version: CONTEXT_CHALLENGE_VERSION
	});
	return encodeBase64urlNoPadding(new TextEncoder().encode(serialized));
}
function verifyContextBoundChallenge(challenge, serializedContext) {
	let value;
	try {
		if (!BASE64URL_PATTERN.test(challenge)) throw malformedContext();
		const bytes = decodeBase64urlIgnorePadding(challenge);
		if (encodeBase64urlNoPadding(bytes) !== challenge) throw malformedContext();
		value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
	} catch (error) {
		if (error instanceof ChallengeContextError) throw error;
		throw malformedContext(error);
	}
	if (!isRecord(value)) throw malformedContext();
	const envelope = value;
	if (Object.keys(envelope).length !== 3 || typeof envelope.contextDigest !== "string" || typeof envelope.nonce !== "string" || envelope.nonce.length !== 43 || !BASE64URL_PATTERN.test(envelope.nonce) || envelope.version !== CONTEXT_CHALLENGE_VERSION) throw malformedContext();
	if (createContextBoundChallenge(envelope.nonce, serializedContext) !== challenge) throw new ChallengeContextError("context_binding_mismatch", "Challenge context does not match challenge");
}
function malformedContext(cause) {
	return new ChallengeContextError("malformed_context", "Malformed challenge context", { cause });
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function decodeChallengeContext(serialized, codec) {
	let value;
	try {
		if (serialized.length > MAX_SERIALIZED_CONTEXT_LENGTH || !BASE64URL_PATTERN.test(serialized)) throw malformedContext();
		const bytes = decodeBase64urlIgnorePadding(serialized);
		if (encodeBase64urlNoPadding(bytes) !== serialized) throw malformedContext();
		value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
	} catch (error) {
		if (error instanceof ChallengeContextError) throw error;
		throw malformedContext(error);
	}
	if (!isRecord(value)) throw malformedContext();
	const envelope = value;
	if (Object.keys(envelope).length !== 3 || !("context" in envelope) || typeof envelope.type !== "string" || typeof envelope.version !== "number") throw malformedContext();
	if (envelope.type !== codec.type) throw new ChallengeContextError("context_type_mismatch", `Challenge context type mismatch: expected ${codec.type}`);
	if (envelope.version !== codec.version) throw new ChallengeContextError("context_version_mismatch", `Challenge context version mismatch: expected ${codec.version}`);
	let canonical;
	try {
		canonical = encodeBase64urlNoPadding(new TextEncoder().encode(serializeEnvelope(envelope.type, envelope.version, envelope.context)));
	} catch (error) {
		throw malformedContext(error);
	}
	if (canonical !== serialized) throw malformedContext();
	return codec.parse(envelope.context);
}
/**
* Passkey registration (credential creation)
*
* Based on oslo webauthn documentation:
* https://webauthn.oslojs.dev/examples/registration
*/
var CHALLENGE_TTL$1 = 3e5;
/**
* Generate registration options for creating a new passkey
*/
async function generateRegistrationOptions(config, user, existingCredentials, challengeStore, challengeContext) {
	const serializedContext = challengeContext ? encodeChallengeContext(challengeContext.codec, challengeContext.value) : void 0;
	const nonce = generateToken();
	const challenge = serializedContext ? createContextBoundChallenge(nonce, serializedContext) : nonce;
	await challengeStore.set(challenge, {
		type: "registration",
		userId: user.id,
		expiresAt: Date.now() + CHALLENGE_TTL$1,
		...serializedContext ? { context: serializedContext } : {}
	});
	const userIdEncoded = encodeBase64urlNoPadding(new TextEncoder().encode(user.id));
	return {
		challenge,
		rp: {
			name: config.rpName,
			id: config.rpId
		},
		user: {
			id: userIdEncoded,
			name: user.email,
			displayName: user.name || user.email
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: coseAlgorithmES256
		}, {
			type: "public-key",
			alg: coseAlgorithmRS256
		}],
		timeout: 6e4,
		attestation: "none",
		authenticatorSelection: {
			residentKey: "preferred",
			userVerification: config.userVerification ?? "preferred"
		},
		excludeCredentials: existingCredentials.map((cred) => ({
			type: "public-key",
			id: cred.id,
			transports: cred.transports
		}))
	};
}
async function verifyRegistrationResponse(config, response, challengeStore, challengeContext) {
	const clientDataJSON = decodeBase64urlIgnorePadding(response.response.clientDataJSON);
	const attestationObject = decodeBase64urlIgnorePadding(response.response.attestationObject);
	const clientData = parseClientDataJSON(clientDataJSON);
	if (clientData.type !== ClientDataType.Create) throw new Error("Invalid client data type");
	const challengeString = encodeBase64urlNoPadding(clientData.challenge);
	const consumesAtomically = isAtomicChallengeStore$1(challengeStore);
	if (challengeContext && !consumesAtomically) throw new Error("Typed challenge context requires an atomic challenge store");
	const challengeData = consumesAtomically ? await challengeStore.consume(challengeString) : await challengeStore.get(challengeString);
	if (!challengeData) throw new Error("Challenge not found or expired");
	if (challengeData.type !== "registration") throw new Error("Invalid challenge type");
	if (challengeData.expiresAt < Date.now()) {
		if (!consumesAtomically) await challengeStore.delete(challengeString);
		throw new Error("Challenge expired");
	}
	if (!consumesAtomically) await challengeStore.delete(challengeString);
	let contextResult = { present: false };
	if (challengeData.context !== void 0) {
		if (!challengeContext) throw new Error("Challenge context decoder required");
		verifyContextBoundChallenge(challengeString, challengeData.context);
		contextResult = {
			present: true,
			value: decodeChallengeContext(challengeData.context, challengeContext)
		};
	} else if (challengeContext) throw new Error("Challenge context not found");
	if (!config.origins.includes(clientData.origin)) throw new Error(`Invalid origin: ${clientData.origin} not in [${config.origins.join(", ")}]`);
	const attestation = parseAttestationObject(attestationObject);
	if (attestation.attestationStatement.format !== AttestationStatementFormat.None) {}
	const { authenticatorData } = attestation;
	if (!authenticatorData.verifyRelyingPartyIdHash(config.rpId)) throw new Error("Invalid RP ID hash");
	if (!authenticatorData.userPresent) throw new Error("User presence not verified");
	if (config.userVerification === "required" && !authenticatorData.userVerified) throw new Error("User verification not verified");
	if (!authenticatorData.credential) throw new Error("No credential data in attestation");
	const { credential } = authenticatorData;
	const algorithm = credential.publicKey.algorithm();
	let encodedPublicKey;
	if (algorithm === coseAlgorithmES256) {
		if (credential.publicKey.type() !== COSEKeyType.EC2) throw new Error("Expected EC2 key type for ES256");
		const cosePublicKey = credential.publicKey.ec2();
		if (cosePublicKey.curve !== coseEllipticCurveP256) throw new Error("Expected P-256 curve for ES256");
		encodedPublicKey = new ECDSAPublicKey(p256, cosePublicKey.x, cosePublicKey.y).encodeSEC1Uncompressed();
	} else if (algorithm === coseAlgorithmRS256) {
		if (credential.publicKey.type() !== COSEKeyType.RSA) throw new Error("Expected RSA key type for RS256");
		const cosePublicKey = credential.publicKey.rsa();
		encodedPublicKey = new RSAPublicKey(cosePublicKey.n, cosePublicKey.e).encodePKIX();
	} else throw new Error(`Unsupported credential algorithm: ${algorithm}`);
	const verified = {
		credentialId: response.id,
		publicKey: encodedPublicKey,
		algorithm,
		counter: authenticatorData.signatureCounter,
		deviceType: "singleDevice",
		backedUp: false,
		transports: response.response.transports ?? []
	};
	return !contextResult.present ? verified : {
		...verified,
		challengeContext: contextResult.value
	};
}
function isAtomicChallengeStore$1(store) {
	return "atomic" in store && store.atomic === true && "consume" in store && typeof store.consume === "function";
}
/**
* Register a new passkey for a user
*/
async function registerPasskey(adapter, userId, verified, name) {
	if (await adapter.countCredentialsByUserId(userId) >= 10) throw new Error("Maximum number of passkeys reached (10)");
	if (await adapter.getCredentialById(verified.credentialId)) throw new Error("Credential already registered");
	const newCredential = {
		id: verified.credentialId,
		userId,
		publicKey: verified.publicKey,
		algorithm: verified.algorithm,
		counter: verified.counter,
		deviceType: verified.deviceType,
		backedUp: verified.backedUp,
		transports: verified.transports,
		name
	};
	return adapter.createCredential(newCredential);
}
/**
* Passkey authentication (credential assertion)
*
* Based on oslo webauthn documentation:
* https://webauthn.oslojs.dev/examples/authentication
*/
var CHALLENGE_TTL = 3e5;
var PasskeyAuthenticationError = class extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.name = "PasskeyAuthenticationError";
	}
};
function invalidPasskeyResponseError() {
	return new PasskeyAuthenticationError("invalid_response", "Invalid passkey response");
}
function decodeAuthenticationResponse(response) {
	try {
		const clientDataJSON = decodeBase64urlIgnorePadding(response.response.clientDataJSON);
		return {
			clientDataJSON,
			authenticatorData: decodeBase64urlIgnorePadding(response.response.authenticatorData),
			signature: decodeBase64urlIgnorePadding(response.response.signature),
			clientData: parseClientDataJSON(clientDataJSON)
		};
	} catch {
		throw invalidPasskeyResponseError();
	}
}
function parseAuthenticationData(authenticatorData) {
	try {
		return parseAuthenticatorData(authenticatorData);
	} catch {
		throw invalidPasskeyResponseError();
	}
}
function decodeAssertionSignature(signature) {
	try {
		return decodePKIXECDSASignature(signature);
	} catch {
		throw invalidPasskeyResponseError();
	}
}
/**
* Generate authentication options for signing in with a passkey
*/
async function generateAuthenticationOptions(config, credentials, challengeStore, challengeContext) {
	const serializedContext = challengeContext ? encodeChallengeContext(challengeContext.codec, challengeContext.value) : void 0;
	const nonce = generateToken();
	const challenge = serializedContext ? createContextBoundChallenge(nonce, serializedContext) : nonce;
	await challengeStore.set(challenge, {
		type: "authentication",
		expiresAt: Date.now() + CHALLENGE_TTL,
		...serializedContext ? { context: serializedContext } : {}
	});
	return {
		challenge,
		rpId: config.rpId,
		timeout: 6e4,
		userVerification: config.userVerification ?? "preferred",
		allowCredentials: credentials.length > 0 ? credentials.map((cred) => ({
			type: "public-key",
			id: cred.id,
			transports: cred.transports
		})) : void 0
	};
}
async function verifyAuthenticationResponse(config, response, credential, challengeStore, challengeContext) {
	const { clientDataJSON, authenticatorData, signature, clientData } = decodeAuthenticationResponse(response);
	if (clientData.type !== ClientDataType.Get) throw new PasskeyAuthenticationError("invalid_client_data_type", "Invalid client data type");
	const challengeString = encodeBase64urlNoPadding(clientData.challenge);
	const consumesAtomically = isAtomicChallengeStore(challengeStore);
	if (challengeContext && !consumesAtomically) throw new PasskeyAuthenticationError("invalid_response", "Typed challenge context requires an atomic challenge store");
	const challengeData = consumesAtomically ? await challengeStore.consume(challengeString) : await challengeStore.get(challengeString);
	if (!challengeData) throw new PasskeyAuthenticationError("challenge_not_found", "Challenge not found or expired");
	if (challengeData.type !== "authentication") throw new PasskeyAuthenticationError("invalid_challenge_type", "Invalid challenge type");
	if (challengeData.expiresAt < Date.now()) {
		if (!consumesAtomically) await challengeStore.delete(challengeString);
		throw new PasskeyAuthenticationError("challenge_expired", "Challenge expired");
	}
	if (!consumesAtomically) await challengeStore.delete(challengeString);
	let contextResult = { present: false };
	if (challengeData.context !== void 0) {
		if (!challengeContext) throw new PasskeyAuthenticationError("invalid_response", "Challenge context decoder required");
		verifyContextBoundChallenge(challengeString, challengeData.context);
		contextResult = {
			present: true,
			value: decodeChallengeContext(challengeData.context, challengeContext)
		};
	} else if (challengeContext) throw new PasskeyAuthenticationError("invalid_response", "Challenge context not found");
	if (!config.origins.includes(clientData.origin)) throw new PasskeyAuthenticationError("invalid_origin", `Invalid origin: ${clientData.origin} not in [${config.origins.join(", ")}]`);
	const authData = parseAuthenticationData(authenticatorData);
	if (!authData.verifyRelyingPartyIdHash(config.rpId)) throw new PasskeyAuthenticationError("invalid_rp_id_hash", "Invalid RP ID hash");
	if (!authData.userPresent) throw new PasskeyAuthenticationError("user_presence_not_verified", "User presence not verified");
	if (config.userVerification === "required" && !authData.userVerified) throw new PasskeyAuthenticationError("user_verification_not_verified", "User verification not verified");
	if ((authData.signatureCounter !== 0 || credential.counter !== 0) && authData.signatureCounter <= credential.counter) throw new PasskeyAuthenticationError("invalid_signature_counter", "Invalid signature counter - possible cloned authenticator");
	const signatureMessage = createAssertionSignatureMessage(authenticatorData, clientDataJSON);
	const publicKeyBytes = credential.publicKey instanceof Uint8Array ? credential.publicKey : new Uint8Array(credential.publicKey);
	let signatureValid = false;
	const hash = sha256(signatureMessage);
	if (credential.algorithm === coseAlgorithmES256) signatureValid = verifyECDSASignature(decodeSEC1PublicKey(p256, publicKeyBytes), hash, decodeAssertionSignature(signature));
	else if (credential.algorithm === coseAlgorithmRS256) signatureValid = verifyRSASSAPKCS1v15Signature(decodePKIXRSAPublicKey(publicKeyBytes), sha256ObjectIdentifier, hash, signature);
	else throw new PasskeyAuthenticationError("unsupported_algorithm", `Unsupported credential algorithm: ${credential.algorithm}`);
	if (!signatureValid) throw new PasskeyAuthenticationError("invalid_signature", "Invalid signature");
	const verified = {
		credentialId: response.id,
		newCounter: authData.signatureCounter
	};
	return !contextResult.present ? verified : {
		...verified,
		challengeContext: contextResult.value
	};
}
function isAtomicChallengeStore(store) {
	return "atomic" in store && store.atomic === true && "consume" in store && typeof store.consume === "function";
}
/**
* Authenticate a user with a passkey
*/
async function authenticateWithPasskey(config, adapter, response, challengeStore) {
	const credential = await adapter.getCredentialById(response.id);
	if (!credential) throw new PasskeyAuthenticationError("credential_not_found", "Credential not found");
	const verified = await verifyAuthenticationResponse(config, response, credential, challengeStore);
	await adapter.updateCredentialCounter(verified.credentialId, verified.newCounter);
	const user = await adapter.getUserById(credential.userId);
	if (!user) throw new PasskeyAuthenticationError("user_not_found", "User not found");
	return user;
}
export { secureCompare as _, authenticateWithPasskey as a, generatePrefixedToken as c, generateTokenWithHash as d, hasScope as f, registerPasskey as g, isValidScope as h, VALID_SCOPES as i, generateRegistrationOptions as l, hashToken as m, TOKEN_PREFIXES as n, computeS256Challenge as o, hashPrefixedToken as p, TRANSFER_SCOPES as r, generateAuthenticationOptions as s, PasskeyAuthenticationError as t, generateToken as u, verifyRegistrationResponse as v };
