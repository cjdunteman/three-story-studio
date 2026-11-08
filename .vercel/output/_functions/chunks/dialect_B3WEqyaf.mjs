import { SqliteDialect } from "kysely";
import { DatabaseSync } from "node:sqlite";
// node_modules/emdash/dist/node-sqlite-compat-CrKzRr0J.mjs
function openNodeSqliteDatabase(path, options = {}) {
	return new NodeSqliteCompatDatabase(path, options);
}
var NodeSqliteCompatDatabase = class {
	#database;
	constructor(path, options = {}) {
		const database = new DatabaseSync(path, { readOnly: options.readOnly });
		this.#database = database;
		try {
			database.exec("PRAGMA busy_timeout = 5000");
			database.exec("PRAGMA foreign_keys = ON");
			database.exec("PRAGMA cache_size = -16000");
			if (options.journalMode === "wal" && !options.readOnly) database.exec("PRAGMA journal_mode = WAL");
			if (database.prepare("PRAGMA journal_mode").get()?.["journal_mode"] === "wal") database.exec("PRAGMA synchronous = NORMAL");
		} catch (error) {
			try {
				database.close();
			} catch {
				throw new Error("SQLite setup failed and the connection could not be closed", { cause: error });
			}
			throw error;
		}
	}
	get open() {
		return this.#database.isOpen;
	}
	close() {
		if (this.#database.isOpen) this.#database.close();
	}
	exec(sql) {
		this.#database.exec(sql);
	}
	prepare(sql) {
		const statement = this.#database.prepare(sql);
		return {
			reader: statement.columns().length > 0,
			all: (...parameters) => statement.all(...toBindings(normalizeParameters(parameters))),
			get: (...parameters) => statement.get(...toBindings(normalizeParameters(parameters))),
			run: (...parameters) => statement.run(...toBindings(normalizeParameters(parameters))),
			iterate: (...parameters) => statement.iterate(...toBindings(normalizeParameters(parameters)))
		};
	}
};
function normalizeParameters(parameters) {
	return parameters.length === 1 && Array.isArray(parameters[0]) ? parameters[0] : parameters;
}
function toBindings(parameters) {
	return parameters.map((value) => {
		if (value === null || typeof value === "string" || typeof value === "number") return value;
		if (typeof value === "bigint") return value;
		if (typeof value === "boolean") return value ? 1 : 0;
		if (value === void 0) return null;
		if (value instanceof Uint8Array) return value;
		throw new TypeError(`Cannot bind ${Object.prototype.toString.call(value)} to SQLite`);
	});
}
// node_modules/emdash/dist/db/sqlite.mjs
/**
* SQLite runtime adapter
*
* Creates a Kysely dialect for Node's built-in SQLite driver.
* Loaded at runtime via virtual module.
*/
/**
* Create a SQLite dialect from config
*/
function createDialect$1(config) {
	const url = config.url;
	return new SqliteDialect({ database: openNodeSqliteDatabase(url.startsWith("file:") ? url.slice(5) : url, { journalMode: "wal" }) });
}
// \0virtual:emdash/dialect
var executeCollectionDeletionGuard = void 0;
var createDialect = createDialect$1;
var createRequestScopedDb = (_opts) => null;
export { createRequestScopedDb as n, executeCollectionDeletionGuard as r, createDialect as t };
