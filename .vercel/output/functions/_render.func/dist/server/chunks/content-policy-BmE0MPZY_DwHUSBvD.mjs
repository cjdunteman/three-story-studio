// node_modules/emdash/dist/content-policy-BmE0MPZY.mjs
var MAX_CONTENT_POLICY_REASON_LENGTH = 500;
var SCHEDULED_POLICY_REJECTION_PREFIX = "emdash:scheduled-policy-rejection:";
function isScheduledPolicyRejection(value) {
	if (!isRecord(value)) return false;
	if (typeof value.collection !== "string" || typeof value.id !== "string" || typeof value.pluginId !== "string" || typeof value.rejectedAt !== "string") return false;
	return inspectContentPolicyDecision({
		cancel: true,
		reason: value.reason
	}).kind === "cancel";
}
function scheduledPolicyRejectionKey(collection, id) {
	return `${SCHEDULED_POLICY_REJECTION_PREFIX}${encodeURIComponent(collection)}:${encodeURIComponent(id)}`;
}
function containsForbiddenControlCharacter(value) {
	for (const character of value) {
		const code = character.codePointAt(0);
		if (code < 32 && code !== 9 && code !== 10 && code !== 13 || code === 127) return true;
	}
	return false;
}
function codePointLength(value) {
	let length = 0;
	for (const _character of value) length++;
	return length;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function inspectContentPolicyDecision(value) {
	if (value === void 0) return { kind: "allow" };
	if (!isRecord(value)) return { kind: "invalid" };
	if (Object.keys(value).length !== 2) return { kind: "invalid" };
	if (!Object.hasOwn(value, "cancel") || value.cancel !== true) return { kind: "invalid" };
	if (!Object.hasOwn(value, "reason") || typeof value.reason !== "string") return { kind: "invalid" };
	const reason = value.reason.trim();
	if (reason.length === 0 || codePointLength(reason) > MAX_CONTENT_POLICY_REASON_LENGTH || containsForbiddenControlCharacter(reason)) return { kind: "invalid" };
	return {
		kind: "cancel",
		reason
	};
}
export { scheduledPolicyRejectionKey as i, inspectContentPolicyDecision as n, isScheduledPolicyRejection as r, SCHEDULED_POLICY_REJECTION_PREFIX as t };
