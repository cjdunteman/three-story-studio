// node_modules/emdash/dist/ssrf-BcYjyM4M.mjs
/**
* SSRF protection for outbound HTTP requests.
*
* Validates that URLs do not target non-public network addresses.
*/
var IPV6_BRACKET_PATTERN = /^\[|\]$/g;
var IPV4_PART_PATTERN = /^(?:0|[1-9]\d{0,2})$/;
var IPV6_PART_PATTERN = /^[0-9a-f]{1,4}$/i;
/** Strip trailing dots from an FQDN-form hostname ("localhost." -> "localhost"). */
var TRAILING_DOT_PATTERN = /\.+$/;
/**
* IPv4 ranges that are not globally reachable unicast destinations.
*/
var BLOCKED_PATTERNS = [
	{
		start: ip4ToNum(0, 0, 0, 0),
		end: ip4ToNum(0, 255, 255, 255)
	},
	{
		start: ip4ToNum(10, 0, 0, 0),
		end: ip4ToNum(10, 255, 255, 255)
	},
	{
		start: ip4ToNum(100, 64, 0, 0),
		end: ip4ToNum(100, 127, 255, 255)
	},
	{
		start: ip4ToNum(127, 0, 0, 0),
		end: ip4ToNum(127, 255, 255, 255)
	},
	{
		start: ip4ToNum(169, 254, 0, 0),
		end: ip4ToNum(169, 254, 255, 255)
	},
	{
		start: ip4ToNum(172, 16, 0, 0),
		end: ip4ToNum(172, 31, 255, 255)
	},
	{
		start: ip4ToNum(192, 0, 0, 0),
		end: ip4ToNum(192, 0, 0, 255)
	},
	{
		start: ip4ToNum(192, 0, 2, 0),
		end: ip4ToNum(192, 0, 2, 255)
	},
	{
		start: ip4ToNum(192, 88, 99, 0),
		end: ip4ToNum(192, 88, 99, 255)
	},
	{
		start: ip4ToNum(192, 168, 0, 0),
		end: ip4ToNum(192, 168, 255, 255)
	},
	{
		start: ip4ToNum(198, 18, 0, 0),
		end: ip4ToNum(198, 19, 255, 255)
	},
	{
		start: ip4ToNum(198, 51, 100, 0),
		end: ip4ToNum(198, 51, 100, 255)
	},
	{
		start: ip4ToNum(203, 0, 113, 0),
		end: ip4ToNum(203, 0, 113, 255)
	},
	{
		start: ip4ToNum(224, 0, 0, 0),
		end: ip4ToNum(255, 255, 255, 255)
	}
];
var ALLOWED_IPV4_EXCEPTIONS = /* @__PURE__ */ new Set([ip4ToNum(192, 0, 0, 9), ip4ToNum(192, 0, 0, 10)]);
function ipv6Range(address, prefixLength) {
	const parsed = parseIpv6(address);
	if (parsed === null) throw new Error(`Invalid IPv6 range: ${address}/${prefixLength}`);
	return {
		address: parsed,
		prefixLength
	};
}
var IPV6_GLOBAL_UNICAST_RANGE = ipv6Range("2000::", 3);
var IPV4_COMPATIBLE_IPV6_RANGE = ipv6Range("::", 96);
var IPV4_EMBEDDED_IPV6_RANGES = [
	IPV4_COMPATIBLE_IPV6_RANGE,
	ipv6Range("::ffff:0:0", 96),
	ipv6Range("::ffff:0:0:0", 96),
	ipv6Range("64:ff9b::", 96)
];
/** Globally reachable allocations inside the otherwise reserved 2001::/23 block. */
var ALLOWED_IPV6_SPECIAL_RANGES = [
	ipv6Range("2001:1::1", 128),
	ipv6Range("2001:1::2", 128),
	ipv6Range("2001:1::3", 128),
	ipv6Range("2001:3::", 32),
	ipv6Range("2001:4:112::", 48),
	ipv6Range("2001:20::", 28),
	ipv6Range("2001:30::", 28)
];
/** Non-global allocations inside the ordinary IPv6 global-unicast range. */
var BLOCKED_IPV6_GLOBAL_UNICAST_RANGES = [
	ipv6Range("2001::", 23),
	ipv6Range("2001:db8::", 32),
	ipv6Range("2002::", 16),
	ipv6Range("3ffe::", 16),
	ipv6Range("3fff::", 20)
];
var BLOCKED_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"metadata.google.internal",
	"metadata.google",
	"::1"
]);
/**
* Wildcard DNS services that publicly resolve arbitrary IPs embedded in the
* hostname. Commonly used in local dev and by SSRF exploit tooling to bypass
* hostname-only blocklists (e.g. 127.0.0.1.nip.io -> 127.0.0.1).
*
* Matched case-insensitively as a suffix, so both the apex and any subdomain
* are blocked.
*/
var BLOCKED_HOSTNAME_SUFFIXES = [
	"nip.io",
	"sslip.io",
	"xip.io",
	"traefik.me",
	"lvh.me",
	"localtest.me"
];
/** Blocked URL schemes */
var ALLOWED_SCHEMES = /* @__PURE__ */ new Set(["http:", "https:"]);
function ip4ToNum(a, b, c, d) {
	return (a << 24 | b << 16 | c << 8 | d) >>> 0;
}
function parseIpv4(ip) {
	const parts = ip.split(".");
	if (parts.length !== 4) return null;
	const nums = parts.map((part) => IPV4_PART_PATTERN.test(part) ? Number(part) : NaN);
	if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
	return ip4ToNum(nums[0], nums[1], nums[2], nums[3]);
}
function parseIpv6(ip) {
	let address = ip;
	if (address.includes(".")) {
		const separator = address.lastIndexOf(":");
		if (separator === -1) return null;
		const ipv4 = parseIpv4(address.slice(separator + 1));
		if (ipv4 === null) return null;
		address = `${address.slice(0, separator + 1)}${(ipv4 >>> 16).toString(16)}:${(ipv4 & 65535).toString(16)}`;
	}
	if (address.includes(":::") || address.split("::").length > 2) return null;
	const [before = "", after = ""] = address.split("::");
	const head = before === "" ? [] : before.split(":");
	const tail = after === "" ? [] : after.split(":");
	const parts = [...head, ...tail];
	if (parts.some((part) => !IPV6_PART_PATTERN.test(part)) || parts.length > 8) return null;
	if (address.includes("::") ? parts.length >= 8 : parts.length !== 8) return null;
	const zeroCount = address.includes("::") ? 8 - parts.length : 0;
	return [
		...head,
		...Array.from({ length: zeroCount }).fill("0"),
		...tail
	].map((part) => Number.parseInt(part, 16));
}
function isIpv6InRange(address, range) {
	const completeParts = Math.floor(range.prefixLength / 16);
	for (let i = 0; i < completeParts; i++) if (address[i] !== range.address[i]) return false;
	const remainingBits = range.prefixLength % 16;
	if (remainingBits === 0) return true;
	const mask = 65535 << 16 - remainingBits & 65535;
	return (address[completeParts] & mask) === (range.address[completeParts] & mask);
}
function extractEmbeddedIpv4(address) {
	if (!IPV4_EMBEDDED_IPV6_RANGES.some((range) => isIpv6InRange(address, range))) return null;
	const ipv4 = (address[6] << 16 | address[7]) >>> 0;
	if (ipv4 <= 1 && isIpv6InRange(address, IPV4_COMPATIBLE_IPV6_RANGE)) return null;
	return ipv4;
}
function isNonPublicIp(ip) {
	const parsedIpv4 = parseIpv4(ip);
	const ipv6 = parsedIpv4 === null ? parseIpv6(ip) : null;
	const ipv4 = ipv6 === null ? parsedIpv4 : extractEmbeddedIpv4(ipv6);
	if (ipv4 !== null) {
		if (ALLOWED_IPV4_EXCEPTIONS.has(ipv4)) return false;
		return BLOCKED_PATTERNS.some((range) => ipv4 >= range.start && ipv4 <= range.end);
	}
	if (ipv6 === null) return true;
	if (ALLOWED_IPV6_SPECIAL_RANGES.some((range) => isIpv6InRange(ipv6, range))) return false;
	if (!isIpv6InRange(ipv6, IPV6_GLOBAL_UNICAST_RANGE)) return true;
	return BLOCKED_IPV6_GLOBAL_UNICAST_RANGES.some((range) => isIpv6InRange(ipv6, range));
}
/**
* Error thrown when SSRF protection blocks a URL.
*/
var SsrfError = class extends Error {
	code = "SSRF_BLOCKED";
	constructor(message) {
		super(message);
		this.name = "SsrfError";
	}
};
/**
* Validate a URL's scheme, hostname, and literal address.
*
* Checks:
* 1. URL is well-formed with http/https scheme
* 2. Hostname is not a known internal name (localhost, metadata endpoints)
* 3. If hostname is an IP literal, it is a public address
*
* Hostnames also need DNS validation before dispatch. Resolving and checking
* addresses does not bind an ordinary fetch() connection to those addresses.
*
* @throws SsrfError if the URL targets an internal address
*/
/** Maximum number of redirects to follow in ssrfSafeFetch */
var MAX_REDIRECTS = 5;
function validateExternalUrl(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		throw new SsrfError("Invalid URL");
	}
	if (!ALLOWED_SCHEMES.has(parsed.protocol)) throw new SsrfError(`Scheme '${parsed.protocol}' is not allowed`);
	const normalizedHost = parsed.hostname.replace(IPV6_BRACKET_PATTERN, "").toLowerCase().replace(TRAILING_DOT_PATTERN, "");
	if (BLOCKED_HOSTNAMES.has(normalizedHost)) throw new SsrfError("URLs targeting internal hosts are not allowed");
	for (const suffix of BLOCKED_HOSTNAME_SUFFIXES) if (normalizedHost === suffix || normalizedHost.endsWith(`.${suffix}`)) throw new SsrfError("URLs targeting wildcard DNS services are not allowed");
	if (isIpLiteral(normalizedHost) && isNonPublicIp(normalizedHost)) throw new SsrfError("URLs targeting non-public IP addresses are not allowed");
	return parsed;
}
/**
* Module-level default resolver. Tests can swap this with a stub so fetch
* mocks don't see unexpected DoH round-trips. Production code should leave
* it alone.
*/
var defaultResolver = null;
/** Timeout for a single DoH request, in milliseconds. */
var DOH_TIMEOUT_MS = 3e3;
/** Default DoH endpoint — Cloudflare's public resolver. */
var DEFAULT_DOH_URL = "https://cloudflare-dns.com/dns-query";
function hasProperty(obj, key) {
	return typeof obj === "object" && obj !== null && key in obj;
}
/**
* Narrow an unknown JSON body to a DohResponse shape we can read safely.
* Throws if the body doesn't look like a DoH response — a malformed body is
* indistinguishable from a failure and must not be silently treated as empty.
*/
function parseDohResponse(raw) {
	if (!hasProperty(raw, "Status") || typeof raw.Status !== "number") throw new Error("DoH response missing Status field");
	const answers = [];
	if (hasProperty(raw, "Answer") && Array.isArray(raw.Answer)) {
		for (const entry of raw.Answer) if (hasProperty(entry, "type") && typeof entry.type === "number" && Number.isInteger(entry.type) && hasProperty(entry, "data") && typeof entry.data === "string") answers.push({
			type: entry.type,
			data: entry.data
		});
	}
	return {
		Status: raw.Status,
		Answer: answers
	};
}
/**
* Resolve a hostname via DNS over HTTPS (Cloudflare). Returns all A and AAAA
* records. Works in both Workers and Node without requiring node:dns.
*
* Fails closed: any network error, non-2xx response, or DNS rcode != 0
* causes a rejected promise so the calling validator treats it as a block.
*/
var cloudflareDohResolver = async (hostname) => {
	async function query(type) {
		const expectedAnswerType = type === "A" ? 1 : 28;
		const params = new URLSearchParams({
			name: hostname,
			type
		});
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), DOH_TIMEOUT_MS);
		try {
			const response = await globalThis.fetch(`${DEFAULT_DOH_URL}?${params.toString()}`, {
				headers: { Accept: "application/dns-json" },
				signal: controller.signal
			});
			if (!response.ok) throw new Error(`DoH lookup failed: ${response.status}`);
			const body = parseDohResponse(await response.json());
			if (body.Status === 3) return [];
			if (body.Status !== 0) throw new Error(`DoH ${type} lookup failed: rcode=${body.Status}`);
			return body.Answer.filter((answer) => answer.type === expectedAnswerType).map((answer) => answer.data).filter(isIpLiteral);
		} finally {
			clearTimeout(timeout);
		}
	}
	const [a, aaaa] = await Promise.all([query("A"), query("AAAA")]);
	return [...a, ...aaaa];
};
/**
* Validate a URL and reject hostnames that resolve to non-public addresses,
* including wildcard DNS services like nip.io used by exploit tooling.
*
* Runs `validateExternalUrl` first for cheap pre-flight checks (scheme,
* literal IP, known-bad hostnames). Then resolves the hostname and rejects
* if ANY returned address is non-public.
*
* Fails closed: if resolution fails or returns no records, throws SsrfError.
*
* **Caveats.** This does NOT fully close the TOCTOU between check and
* connect. Attacks that still work against this layer include:
*
* - TTL=0 rebind: authoritative server returns public IP to the check, then
*   private IP to the subsequent fetch() a few milliseconds later.
* - Split-view via EDNS Client Subnet or source-IP inspection: the
*   authoritative server returns public IP to Cloudflare's DoH resolver and
*   private IP to the victim's own resolver (used by fetch()).
* - Host-file overrides or split-horizon corporate DNS on self-hosted Node.
* - Attacker-controlled rebinding services the caller has allowlisted.
*
* Connections must use the addresses from resolveAndValidateExternalUrlTarget
* to avoid a second lookup. Callers using ordinary fetch() need network-level
* egress controls to prevent these attacks.
*/
async function resolveAndValidateExternalUrl(url, options) {
	return (await resolveAndValidateExternalUrlTarget(url, options)).url;
}
/**
* Validate a URL and return the exact public addresses approved for the
* subsequent connection.
*/
async function resolveAndValidateExternalUrlTarget(url, options) {
	const parsed = validateExternalUrl(url);
	const hostname = parsed.hostname.replace(IPV6_BRACKET_PATTERN, "");
	if (isIpLiteral(hostname)) return {
		url: parsed,
		addresses: [hostname]
	};
	const resolver = options?.resolver ?? defaultResolver ?? cloudflareDohResolver;
	let addresses;
	try {
		addresses = await resolver(hostname);
	} catch (error) {
		throw new SsrfError(`Could not resolve hostname: ${error instanceof Error ? error.message : String(error)}`);
	}
	if (addresses.length === 0) throw new SsrfError("Hostname resolved to no addresses");
	for (const ip of addresses) {
		if (!isIpLiteral(ip)) throw new SsrfError("Hostname resolver returned a non-IP address");
		if (isNonPublicIp(ip)) throw new SsrfError("Hostname resolves to a non-public IP address");
	}
	return {
		url: parsed,
		addresses
	};
}
/** True when a string is a valid IPv4 or IPv6 literal. */
function isIpLiteral(host) {
	return parseIpv4(host) !== null || parseIpv6(host) !== null;
}
/**
* Fetch a URL with SSRF protection on redirects.
*
* Uses `redirect: "manual"` to intercept redirects and re-validate each
* redirect target against SSRF rules before following it. This prevents
* an attacker from setting up an allowed external URL that redirects to
* an internal IP (e.g. 169.254.169.254 for cloud metadata).
*
* @throws SsrfError if the initial URL or any redirect target is internal
*/
/** Headers that must be stripped when a redirect crosses origins */
var CREDENTIAL_HEADERS = [
	"authorization",
	"cookie",
	"proxy-authorization"
];
async function ssrfSafeFetch(url, init, options) {
	let currentUrl = url;
	let currentInit = init;
	for (let i = 0; i <= MAX_REDIRECTS; i++) {
		const validated = await resolveAndValidateExternalUrl(currentUrl, options);
		if (options?.httpsOnly === true && validated.protocol !== "https:") throw new SsrfError("Only HTTPS URLs are allowed");
		const response = await globalThis.fetch(currentUrl, {
			...currentInit,
			redirect: "manual"
		});
		if (response.status < 300 || response.status >= 400) return response;
		const location = response.headers.get("Location");
		if (!location) return response;
		const previousOrigin = new URL(currentUrl).origin;
		currentUrl = new URL(location, currentUrl).href;
		if (previousOrigin !== new URL(currentUrl).origin && currentInit) currentInit = stripCredentialHeaders(currentInit);
	}
	throw new SsrfError(`Too many redirects (max ${MAX_REDIRECTS})`);
}
/**
* Return a copy of init with credential headers removed.
*/
function stripCredentialHeaders(init) {
	if (!init.headers) return init;
	const headers = new Headers(init.headers);
	for (const name of CREDENTIAL_HEADERS) headers.delete(name);
	return {
		...init,
		headers
	};
}
export { ssrfSafeFetch as a, resolveAndValidateExternalUrlTarget as i, cloudflareDohResolver as n, stripCredentialHeaders as o, resolveAndValidateExternalUrl as r, validateExternalUrl as s, SsrfError as t };
