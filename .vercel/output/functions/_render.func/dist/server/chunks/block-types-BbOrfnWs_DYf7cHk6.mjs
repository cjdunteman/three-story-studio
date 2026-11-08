import { a as __exportAll } from "./runner-Bkkfk4O8_Cwesf1ia.mjs";
import { l as invalidateCollectionCache } from "./object-cache-DmKr09La_Bod48Br5.mjs";
import { t as BlockTypeRegistry, u as SchemaError } from "./registry-B0-O575m_BFXFyFwY.mjs";
import { a as invalidateSchemaCache } from "./zod-generator--nlM0930_LkzcAVDd.mjs";
// node_modules/emdash/dist/block-types-BbOrfnWs.mjs
var block_types_exports = /* @__PURE__ */ __exportAll({
	handleBlockTypeCreate: () => handleBlockTypeCreate,
	handleBlockTypeGet: () => handleBlockTypeGet,
	handleBlockTypeList: () => handleBlockTypeList,
	handleBlockTypeUpdate: () => handleBlockTypeUpdate,
	handleBlockTypeVersionActivate: () => handleBlockTypeVersionActivate
});
function schemaError(error) {
	return {
		success: false,
		error: {
			code: error.code,
			message: error.message,
			details: error.details
		}
	};
}
async function invalidateConsumers(db, slug) {
	const collections = await new BlockTypeRegistry(db).listAffectedCollections(slug);
	for (const collection of collections) {
		invalidateCollectionCache(collection);
		invalidateSchemaCache(collection);
	}
}
async function handleBlockTypeList(db) {
	try {
		return {
			success: true,
			data: { items: await new BlockTypeRegistry(db).listBlockTypes() }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "SCHEMA_LIST_ERROR",
				message: "Failed to list block types"
			}
		};
	}
}
async function handleBlockTypeGet(db, slug) {
	try {
		const item = await new BlockTypeRegistry(db).getBlockType(slug);
		if (!item) return {
			success: false,
			error: {
				code: "BLOCK_TYPE_NOT_FOUND",
				message: `Block type '${slug}' not found`
			}
		};
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return schemaError(error);
		return {
			success: false,
			error: {
				code: "SCHEMA_GET_ERROR",
				message: "Failed to get block type"
			}
		};
	}
}
async function handleBlockTypeCreate(db, input) {
	try {
		const item = await new BlockTypeRegistry(db).createBlockType(input);
		await invalidateConsumers(db, input.slug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return schemaError(error);
		return {
			success: false,
			error: {
				code: "SCHEMA_CREATE_ERROR",
				message: "Failed to create block type"
			}
		};
	}
}
async function handleBlockTypeUpdate(db, slug, input) {
	try {
		const item = await new BlockTypeRegistry(db).updateBlockType(slug, input);
		await invalidateConsumers(db, slug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return schemaError(error);
		return {
			success: false,
			error: {
				code: "SCHEMA_UPDATE_ERROR",
				message: "Failed to update block type"
			}
		};
	}
}
async function handleBlockTypeVersionActivate(db, slug, version, expectedFingerprint) {
	try {
		const item = await new BlockTypeRegistry(db).activateVersion(slug, version, expectedFingerprint);
		await invalidateConsumers(db, slug);
		return {
			success: true,
			data: { item }
		};
	} catch (error) {
		if (error instanceof SchemaError) return schemaError(error);
		return {
			success: false,
			error: {
				code: "SCHEMA_UPDATE_ERROR",
				message: "Failed to activate block type version"
			}
		};
	}
}
export { handleBlockTypeUpdate as a, handleBlockTypeList as i, handleBlockTypeCreate as n, handleBlockTypeVersionActivate as o, handleBlockTypeGet as r, block_types_exports as t };
