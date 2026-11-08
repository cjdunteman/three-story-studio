import "./object-cache-DmKr09La_Bod48Br5.mjs";
import "./request-cache-5z2WzWmh_BCAj1LTl.mjs";
import "./loader-DhnedqY4_acPNZ9Ax.mjs";
import { d as SchemaRegistry } from "./registry-B0-O575m_BFXFyFwY.mjs";
// node_modules/emdash/dist/query-LmPY2y0C.mjs
/**
* Get collection metadata with an explicit db handle.
*
* @internal Use `getCollectionInfo()` in templates. This variant is for
* routes that already have a database handle.
*/
async function getCollectionInfoWithDb(db, slug) {
	return new SchemaRegistry(db).getCollection(slug);
}
export { getCollectionInfoWithDb as t };
