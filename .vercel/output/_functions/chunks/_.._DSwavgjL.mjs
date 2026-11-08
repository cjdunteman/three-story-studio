import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import "./base64-BQBZwXCx_BV9EFKF5.mjs";
import "./types-DwhEvIVb_72TX_YGi.mjs";
import "./errors-B4f4It-2_rwT1g5LA.mjs";
import "./errors-8gJqv-XV_DxVJguuk.mjs";
import { t as apiError } from "./error-BCMgPxdn_BlGqXbZb.mjs";
// node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_.mjs
var ____path__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	HEAD: () => HEAD,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var TRANSFER_ROUTES = [
	{
		pattern: /^capabilities$/,
		params: [],
		load: () => import("./capabilities_Dxyo8fSx.mjs")
	},
	{
		pattern: /^approvals$/,
		params: [],
		load: () => import("./approvals_D1Yw03Mk.mjs")
	},
	{
		pattern: /^approvals\/([^/]+)\/approve$/,
		params: ["id"],
		load: () => import("./approve_CTQz55hW.mjs")
	},
	{
		pattern: /^approvals\/([^/]+)\/deny$/,
		params: ["id"],
		load: () => import("./deny_BfTds2Vv.mjs")
	},
	{
		pattern: /^exports$/,
		params: [],
		load: () => import("./exports_BFpk-BvY.mjs")
	},
	{
		pattern: /^exports\/([^/]+)$/,
		params: ["id"],
		load: () => import("./_id__BdhP09gv.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/advance$/,
		params: ["id"],
		load: () => import("./advance_DxfSCio2.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/manifest$/,
		params: ["id"],
		load: () => import("./manifest_B2TE6LkF.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/archive$/,
		params: ["id"],
		load: () => import("./archive_CQNJzfmU.mjs")
	},
	{
		pattern: /^exports\/([^/]+)\/files\/(.+)$/,
		params: ["id", "path"],
		load: () => import("./_...path__Cr5Q0VjI.mjs")
	},
	{
		pattern: /^imports$/,
		params: [],
		load: () => import("./imports_D5W__2QW.mjs")
	},
	{
		pattern: /^imports\/([^/]+)$/,
		params: ["id"],
		load: () => import("./_id__ol1zqzZU.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/missing$/,
		params: ["id"],
		load: () => import("./missing_CON5d-XQ.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/files\/(.+)$/,
		params: ["id", "path"],
		load: () => import("./_...path__DTRwXtBk.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/analyze$/,
		params: ["id"],
		load: () => import("./analyze_rMsWDHQK.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/plan$/,
		params: ["id"],
		load: () => import("./plan_BAu0kXZI.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/cancel$/,
		params: ["id"],
		load: () => import("./cancel_DaVhRvjK.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/abandon$/,
		params: ["id"],
		load: () => import("./abandon_BfEJil_c.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/execute$/,
		params: ["id"],
		load: () => import("./execute_CD1x92MT.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/advance$/,
		params: ["id"],
		load: () => import("./advance_C502zgx3.mjs")
	},
	{
		pattern: /^imports\/([^/]+)\/receipt$/,
		params: ["id"],
		load: () => import("./receipt_Dnx9RNMX.mjs")
	}
];
function isRouteMethod(method) {
	return method === "GET" || method === "HEAD" || method === "POST" || method === "PUT" || method === "DELETE";
}
var handleRequest = async (context) => {
	const path = context.params.path ?? "";
	for (const route of TRANSFER_ROUTES) {
		const match = route.pattern.exec(path);
		if (!match) continue;
		const params = {};
		route.params.forEach((name, index) => {
			params[name] = match[index + 1] ?? "";
		});
		const module = await route.load();
		const method = context.request.method.toUpperCase();
		const handler = isRouteMethod(method) ? module[method] : void 0;
		if (!handler) return apiError("METHOD_NOT_ALLOWED", "Method not allowed", 405);
		return handler(new Proxy(context, { get: (target, property) => property === "params" ? params : Reflect.get(target, property, target) }));
	}
	return apiError("NOT_FOUND", "Not found", 404);
};
var GET = handleRequest;
var HEAD = handleRequest;
var POST = handleRequest;
var PUT = handleRequest;
var DELETE = handleRequest;
// \0virtual:astro:page:node_modules/emdash/dist/astro/routes/api/admin/transfer/_...path_@_@mjs
var page = () => ____path__exports;
export { page };
