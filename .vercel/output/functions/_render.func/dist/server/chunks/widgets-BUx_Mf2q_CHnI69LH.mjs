import { n as cachedQuery, t as CacheNamespace } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import { f as getDb } from "./loader-DhnedqY4_acPNZ9Ax.mjs";
// node_modules/emdash/dist/widgets-BUx_Mf2q.mjs
/**
* Areas left-joined with their widgets, so areas and widgets load in one
* round trip. An area with no widgets yields one row with null widget columns.
*/
function selectAreasWithWidgets(db) {
	return db.selectFrom("_emdash_widget_areas as a").leftJoin("_emdash_widgets as w", "w.area_id", "a.id").select([
		"a.id as a_id",
		"a.name as a_name",
		"a.label as a_label",
		"a.description as a_description",
		"w.id as w_id",
		"w.type as w_type",
		"w.title as w_title",
		"w.content as w_content",
		"w.menu_name as w_menu_name",
		"w.component_id as w_component_id",
		"w.component_props as w_component_props",
		"w.area_id as w_area_id",
		"w.sort_order as w_sort_order",
		"w.created_at as w_created_at"
	]);
}
/** Group joined rows into areas, keeping row order for areas and widgets. */
function groupAreaRows(rows) {
	const areas = /* @__PURE__ */ new Map();
	for (const row of rows) {
		let area = areas.get(row.a_id);
		if (!area) {
			area = {
				id: row.a_id,
				name: row.a_name,
				label: row.a_label,
				description: row.a_description ?? void 0,
				widgets: []
			};
			areas.set(row.a_id, area);
		}
		if (row.w_id === null) continue;
		const widgetRow = {
			id: row.w_id,
			type: row.w_type,
			title: row.w_title,
			content: row.w_content,
			menu_name: row.w_menu_name,
			component_id: row.w_component_id,
			component_props: row.w_component_props,
			area_id: row.w_area_id,
			sort_order: row.w_sort_order,
			created_at: row.w_created_at
		};
		area.widgets.push(rowToWidget(widgetRow));
	}
	return [...areas.values()];
}
/**
* Get all widget areas with their widgets
*/
async function getWidgetAreas() {
	return cachedQuery({
		namespace: CacheNamespace.WIDGETS,
		key: "areas",
		load: async () => {
			return groupAreaRows(await selectAreasWithWidgets(await getDb()).orderBy("a.created_at", "asc").orderBy("a.id", "asc").orderBy("w.sort_order", "asc").execute());
		}
	});
}
/**
* Convert a widget row to the API type
*/
function rowToWidget(row) {
	const widget = {
		id: row.id,
		type: row.type,
		title: row.title ?? void 0
	};
	if (row.type === "content" && row.content) try {
		widget.content = JSON.parse(row.content);
	} catch {}
	if (row.type === "menu" && row.menu_name) widget.menuName = row.menu_name;
	if (row.type === "component" && row.component_id) {
		widget.componentId = row.component_id;
		if (row.component_props) try {
			widget.componentProps = JSON.parse(row.component_props);
		} catch {}
	}
	return widget;
}
export { rowToWidget as n, getWidgetAreas as t };
