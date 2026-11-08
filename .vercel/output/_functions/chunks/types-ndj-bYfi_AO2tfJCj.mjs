// node_modules/@emdash-cms/auth/dist/types-ndj-bYfi.mjs
/**
* Core types for @emdash-cms/auth
*/
var Role = {
	SUBSCRIBER: 10,
	CONTRIBUTOR: 20,
	AUTHOR: 30,
	EDITOR: 40,
	ADMIN: 50
};
function roleFromLevel(level) {
	const entry = Object.entries(Role).find(([, v]) => v === level);
	if (!entry) return void 0;
	const name = entry[0];
	if (isRoleName(name)) return name;
}
function isRoleName(value) {
	return value in Role;
}
var ROLE_LEVEL_MAP = new Map(Object.values(Role).map((v) => [v, v]));
function toRoleLevel(value) {
	const level = ROLE_LEVEL_MAP.get(value);
	if (level !== void 0) return level;
	throw new Error(`Invalid role level: ${value}`);
}
var DEVICE_TYPE_MAP = {
	singleDevice: "singleDevice",
	multiDevice: "multiDevice"
};
function toDeviceType(value) {
	const dt = DEVICE_TYPE_MAP[value];
	if (dt !== void 0) return dt;
	throw new Error(`Invalid device type: ${value}`);
}
var TOKEN_TYPE_MAP = {
	magic_link: "magic_link",
	email_verify: "email_verify",
	invite: "invite",
	recovery: "recovery"
};
function toTokenType(value) {
	const tt = TOKEN_TYPE_MAP[value];
	if (tt !== void 0) return tt;
	throw new Error(`Invalid token type: ${value}`);
}
export { toTokenType as a, toRoleLevel as i, roleFromLevel as n, toDeviceType as r, Role as t };
