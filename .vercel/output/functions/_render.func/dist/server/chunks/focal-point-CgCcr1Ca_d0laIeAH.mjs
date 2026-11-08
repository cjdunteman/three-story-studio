// node_modules/emdash/dist/focal-point-CgCcr1Ca.mjs
function isFocalCoordinate(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}
function normalizeFocalPoint(focalX, focalY) {
	if (!isFocalCoordinate(focalX) || !isFocalCoordinate(focalY)) return null;
	return {
		focalX,
		focalY
	};
}
function isValidFocalPointUpdate(input) {
	const hasX = input.focalX !== void 0;
	const hasY = input.focalY !== void 0;
	if (!hasX && !hasY) return true;
	if (!hasX || !hasY) return false;
	if (input.focalX === null || input.focalY === null) return input.focalX === null && input.focalY === null;
	return normalizeFocalPoint(input.focalX, input.focalY) !== null;
}
export { normalizeFocalPoint as n, isValidFocalPointUpdate as t };
