import { r as verifyPreviewToken, t as generatePreviewToken } from "./tokens-BnhSnGwJ_CaIsDsD0.mjs";
// node_modules/emdash/dist/action-token-SK8zyN7w.mjs
var VISUAL_ACTION_SECRET_DOMAIN = "emdash:visual-editing-action:v1:";
var VISUAL_ACTION_TOKEN_INVALID = "VISUAL_ACTION_TOKEN_INVALID";
function visualActionSecret(previewSecret) {
	return `${VISUAL_ACTION_SECRET_DOMAIN}${previewSecret}`;
}
function generateVisualEditingActionToken(previewSecret, userId) {
	return generatePreviewToken({
		contentId: `visual-editing:${userId}`,
		expiresIn: "5m",
		secret: visualActionSecret(previewSecret)
	});
}
async function verifyVisualEditingActionToken(token, previewSecret, userId) {
	const verification = await verifyPreviewToken({
		token,
		secret: visualActionSecret(previewSecret)
	});
	return verification.valid && verification.payload.cid === `visual-editing:${userId}`;
}
export { generateVisualEditingActionToken as n, verifyVisualEditingActionToken as r, VISUAL_ACTION_TOKEN_INVALID as t };
