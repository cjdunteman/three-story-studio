// node_modules/emdash/dist/transaction-CkoQ5wqQ.mjs
/**
* Run a callback inside a transaction if supported, or directly if not.
*
* Probes the database once on first call to determine if transactions work.
* The result is cached for the lifetime of the process/worker.
*/
var transactionsSupported = null;
var TRANSACTIONS_NOT_SUPPORTED_RE = /transactions are not supported/i;
async function withTransaction(db, fn) {
	if (db.isTransaction) return fn(db);
	if (transactionsSupported === true) return db.transaction().execute(fn);
	if (transactionsSupported === false) return fn(db);
	try {
		const result = await db.transaction().execute(fn);
		transactionsSupported = true;
		return result;
	} catch (error) {
		if (error instanceof Error && TRANSACTIONS_NOT_SUPPORTED_RE.test(error.message)) {
			transactionsSupported = false;
			return fn(db);
		}
		throw error;
	}
}
export { withTransaction as t };
