// node_modules/emdash/dist/mode-C-D3qICy.mjs
/**
* Determine the active auth mode from config.
*
* Accepts `EmDashConfig` (or subtype) — checks for `auth` field via duck typing.
*
* @param config EmDash configuration
* @returns The active auth mode
*/
function getAuthMode(config) {
	const auth = config?.auth;
	if (auth && "entrypoint" in auth && auth.entrypoint) return {
		type: "external",
		providerType: auth.type,
		entrypoint: auth.entrypoint,
		config: auth.config
	};
	return { type: "passkey" };
}
export { getAuthMode as t };
