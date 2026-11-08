// node_modules/emdash/dist/init-lock-BGmew3r1.mjs
function createInitLock() {
	return {
		ownerStartedAt: null,
		generation: 0
	};
}
var DEFAULT_DEADLINE_MS = 15e3;
var DEFAULT_POLL_MS = 50;
var MAX_WAIT_HEADROOM_MS = 15e3;
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
* Return the cached value if present, otherwise initialize it under the
* lock. `init` is responsible for storing the value so that `getCached`
* returns it on subsequent calls — waiters re-check `getCached` after the
* owner finishes rather than sharing the owner's promise.
*
* `init` receives an `isCurrentClaim` predicate and must gate its cache
* publication on it: a slow init that was reclaimed past the deadline
* must not overwrite the value published by the reclaimer (for the
* runtime singleton that would orphan the reclaimer's active cron
* scheduler). A losing init should also tear down any side resources it
* started, since its result will never be published.
*/
async function initWithLock(lock, getCached, init, options) {
	const deadlineMs = options?.deadlineMs ?? DEFAULT_DEADLINE_MS;
	const pollMs = options?.pollMs ?? DEFAULT_POLL_MS;
	const maxWaitMs = options?.maxWaitMs ?? deadlineMs + MAX_WAIT_HEADROOM_MS;
	const waitStart = Date.now();
	for (;;) {
		const cached = getCached();
		if (cached !== null && cached !== void 0) return cached;
		const ownerStartedAt = lock.ownerStartedAt;
		if (ownerStartedAt === null || Date.now() - ownerStartedAt > deadlineMs) {
			lock.generation += 1;
			const claim = lock.generation;
			lock.ownerStartedAt = Date.now();
			try {
				const isCurrentClaim = () => lock.generation === claim;
				const initPromise = Promise.resolve().then(() => init(isCurrentClaim));
				options?.anchor?.(initPromise.then(() => void 0, () => void 0));
				return await initPromise;
			} finally {
				if (lock.generation === claim) lock.ownerStartedAt = null;
			}
		}
		if (Date.now() - waitStart > maxWaitMs) throw new Error(`initWithLock: timed out after ${maxWaitMs}ms waiting for initialization`);
		await sleep(pollMs);
	}
}
export { initWithLock as n, createInitLock as t };
