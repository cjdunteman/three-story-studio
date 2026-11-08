import { t as OptionsRepository } from "./options-DhrI7eMv_DLdiwacl.mjs";
import { a as InvalidCursorError } from "./types-DwhEvIVb_72TX_YGi.mjs";
import { a as validateDestinationParams, o as validatePattern, r as isPattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
import { n as RedirectWriteBusyError, t as RedirectRepository } from "./redirect-DjLdw427_BDBqyEyI.mjs";
import { r as publishRedirectChanges } from "./artifacts-Dvdp2KK-_D_x8kJT9.mjs";
import { A as isTerminalStatus } from "./menus-uEAxWAm1_Ch7-np7t.mjs";
import { n as wouldCreateLoop, t as detectLoops } from "./loops-B2YS-Zzr_DzZyTeGu.mjs";
// node_modules/emdash/dist/redirects-Cpq1catN.mjs
async function withRedirectWriteLock(repo, action) {
	try {
		return await repo.withWriteLock(action);
	} catch (error) {
		if (error instanceof RedirectWriteBusyError) return {
			success: false,
			error: {
				code: "REDIRECT_BUSY",
				message: "Another redirect change is in progress"
			}
		};
		throw error;
	}
}
/**
* List redirects with cursor pagination and optional filters
*/
async function handleRedirectList(db, params) {
	try {
		const result = await new RedirectRepository(db).findMany(params);
		const loopRedirectIds = await getLoopRedirectIds(db);
		return {
			success: true,
			data: {
				...result,
				...loopRedirectIds.length > 0 ? { loopRedirectIds } : {}
			}
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "REDIRECT_LIST_ERROR",
				message: "Failed to fetch redirects"
			}
		};
	}
}
/**
* Create a redirect rule
*/
async function handleRedirectCreate(db, input) {
	try {
		const result = await withRedirectWriteLock(new RedirectRepository(db), async (fence, repo) => {
			const type = input.type ?? 301;
			const terminal = isTerminalStatus(type);
			const destination = terminal ? "" : input.destination ?? "";
			if (!terminal && input.source === destination) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Source and destination must be different"
				}
			};
			const sourceIsPattern = isPattern(input.source);
			if (sourceIsPattern) {
				const patternError = validatePattern(input.source);
				if (patternError) return {
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: `Invalid source pattern: ${patternError}`
					}
				};
				if (!terminal) {
					const destError = validateDestinationParams(input.source, destination);
					if (destError) return {
						success: false,
						error: {
							code: "VALIDATION_ERROR",
							message: destError
						}
					};
				}
			}
			if (await repo.findBySource(input.source)) return {
				success: false,
				error: {
					code: "CONFLICT",
					message: `A redirect from "${input.source}" already exists`
				}
			};
			if (!terminal && input.enabled !== false) {
				const edges = toEdges(await repo.findAllEnabled());
				const loopPath = wouldCreateLoop(input.source, destination, edges);
				if (loopPath) return loopError(loopPath);
			}
			return {
				success: true,
				data: await repo.create({
					source: input.source,
					destination,
					type,
					isPattern: sourceIsPattern,
					enabled: input.enabled ?? true,
					groupName: input.groupName ?? null
				}, fence)
			};
		});
		if (result.success) await publishRedirectChanges(db);
		return result;
	} catch {
		return {
			success: false,
			error: {
				code: "REDIRECT_CREATE_ERROR",
				message: "Failed to create redirect"
			}
		};
	}
}
/**
* Get a redirect by ID
*/
async function handleRedirectGet(db, id) {
	try {
		const redirect = await new RedirectRepository(db).findById(id);
		if (!redirect) return {
			success: false,
			error: {
				code: "NOT_FOUND",
				message: `Redirect "${id}" not found`
			}
		};
		return {
			success: true,
			data: redirect
		};
	} catch {
		return {
			success: false,
			error: {
				code: "REDIRECT_GET_ERROR",
				message: "Failed to fetch redirect"
			}
		};
	}
}
/**
* Update a redirect by ID
*/
async function handleRedirectUpdate(db, id, input, options) {
	try {
		const result = await withRedirectWriteLock(new RedirectRepository(db), async (fence, repo) => {
			const existing = await repo.findById(id);
			if (!existing) return {
				success: false,
				error: {
					code: "NOT_FOUND",
					message: `Redirect "${id}" not found`
				}
			};
			if (options?.expectedRevision !== void 0) {
				if (await repo.findConfigRevision(id) !== options.expectedRevision) return {
					success: false,
					error: {
						code: "CONFLICT",
						message: "Redirect changed since it was read"
					}
				};
			}
			const newSource = input.source ?? existing.source;
			const terminal = isTerminalStatus(input.type ?? existing.type);
			const newDest = terminal ? "" : input.destination ?? existing.destination;
			if (!terminal && !newDest) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "destination is required for redirect types (301, 302, 307, 308)"
				}
			};
			if (!terminal && newSource === newDest) return {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "Source and destination must be different"
				}
			};
			if (input.source !== void 0) {
				if (isPattern(input.source)) {
					const patternError = validatePattern(input.source);
					if (patternError) return {
						success: false,
						error: {
							code: "VALIDATION_ERROR",
							message: `Invalid source pattern: ${patternError}`
						}
					};
				}
				const dup = await repo.findBySource(input.source);
				if (dup && dup.id !== id) return {
					success: false,
					error: {
						code: "CONFLICT",
						message: `A redirect from "${input.source}" already exists`
					}
				};
			}
			if (isPattern(newSource) && !terminal) {
				const destError = validateDestinationParams(newSource, newDest);
				if (destError) return {
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: destError
					}
				};
			}
			const willBeEnabled = input.enabled ?? existing.enabled;
			if (!terminal && willBeEnabled && (input.source !== void 0 || input.destination !== void 0 || !existing.enabled)) {
				const loopPath = wouldCreateLoop(newSource, newDest, toEdges(await repo.findAllEnabled()), id);
				if (loopPath) return loopError(loopPath);
			}
			const updated = await repo.update(id, {
				source: input.source,
				destination: terminal ? "" : input.destination,
				type: input.type,
				enabled: input.enabled,
				groupName: input.groupName
			}, options?.expectedRevision, fence);
			if (!updated) return {
				success: false,
				error: options?.expectedRevision ? {
					code: "CONFLICT",
					message: "Redirect changed since it was read"
				} : {
					code: "REDIRECT_UPDATE_ERROR",
					message: "Failed to update redirect"
				}
			};
			await updateLoopCache(repo.db);
			return {
				success: true,
				data: updated
			};
		});
		if (result.success) await publishRedirectChanges(db);
		return result;
	} catch {
		return {
			success: false,
			error: {
				code: "REDIRECT_UPDATE_ERROR",
				message: "Failed to update redirect"
			}
		};
	}
}
/**
* Delete a redirect by ID
*/
async function handleRedirectDelete(db, id, options) {
	try {
		const result = await withRedirectWriteLock(new RedirectRepository(db), async (fence, repo) => {
			if (options?.expectedRevision !== void 0) {
				if (!await repo.findById(id)) return {
					success: false,
					error: {
						code: "NOT_FOUND",
						message: `Redirect "${id}" not found`
					}
				};
				if (await repo.findConfigRevision(id) !== options.expectedRevision) return {
					success: false,
					error: {
						code: "CONFLICT",
						message: "Redirect changed since it was read"
					}
				};
			}
			if (!await repo.delete(id, options?.expectedRevision, fence)) return {
				success: false,
				error: options?.expectedRevision ? {
					code: "CONFLICT",
					message: "Redirect changed since it was read"
				} : {
					code: "NOT_FOUND",
					message: `Redirect "${id}" not found`
				}
			};
			await updateLoopCache(repo.db);
			return {
				success: true,
				data: { deleted: true }
			};
		});
		if (result.success) await publishRedirectChanges(db);
		return result;
	} catch {
		return {
			success: false,
			error: {
				code: "REDIRECT_DELETE_ERROR",
				message: "Failed to delete redirect"
			}
		};
	}
}
function loopError(loopPath) {
	return {
		success: false,
		error: {
			code: "VALIDATION_ERROR",
			message: `This redirect would create a loop:\n${loopPath.slice(0, -1).map((p, i) => `${p} \u2192 ${loopPath[i + 1]}`).join("\n")}`
		}
	};
}
function toEdges(redirects) {
	return redirects.map((r) => ({
		id: r.id,
		source: r.source,
		destination: r.destination,
		enabled: r.enabled,
		isPattern: r.isPattern
	}));
}
var LOOP_CACHE_KEY = "_redirect_loop_ids";
/**
* Recompute loop redirect IDs and store in the options table.
*/
async function updateLoopCache(db) {
	try {
		const options = new OptionsRepository(db);
		const loopRedirectIds = detectLoops(toEdges(await new RedirectRepository(db).findAllEnabled()));
		await options.set(LOOP_CACHE_KEY, loopRedirectIds);
	} catch (error) {
		console.error("Failed to update redirect loop cache:", error);
	}
}
/**
* Get loop redirect IDs from cache, computing lazily on first access.
*/
async function getLoopRedirectIds(db) {
	try {
		const options = new OptionsRepository(db);
		const cached = await options.get(LOOP_CACHE_KEY);
		if (cached !== null) return cached;
		await updateLoopCache(db);
		return await options.get(LOOP_CACHE_KEY) ?? [];
	} catch {
		return [];
	}
}
/**
* List 404 log entries with cursor pagination
*/
async function handleNotFoundList(db, params) {
	try {
		return {
			success: true,
			data: await new RedirectRepository(db).find404s(params)
		};
	} catch (error) {
		if (error instanceof InvalidCursorError) return {
			success: false,
			error: {
				code: "INVALID_CURSOR",
				message: error.message
			}
		};
		return {
			success: false,
			error: {
				code: "NOT_FOUND_LIST_ERROR",
				message: "Failed to fetch 404 log"
			}
		};
	}
}
/**
* Get 404 summary (grouped by path, sorted by count)
*/
async function handleNotFoundSummary(db, limit) {
	try {
		return {
			success: true,
			data: { items: await new RedirectRepository(db).get404Summary(limit) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "NOT_FOUND_SUMMARY_ERROR",
				message: "Failed to fetch 404 summary"
			}
		};
	}
}
/**
* Clear all 404 log entries
*/
async function handleNotFoundClear(db) {
	try {
		return {
			success: true,
			data: { deleted: await new RedirectRepository(db).clear404s() }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "NOT_FOUND_CLEAR_ERROR",
				message: "Failed to clear 404 log"
			}
		};
	}
}
/**
* Prune 404 log entries older than a given date
*/
async function handleNotFoundPrune(db, olderThan) {
	try {
		return {
			success: true,
			data: { deleted: await new RedirectRepository(db).prune404s(olderThan) }
		};
	} catch {
		return {
			success: false,
			error: {
				code: "NOT_FOUND_PRUNE_ERROR",
				message: "Failed to prune 404 log"
			}
		};
	}
}
export { handleRedirectCreate as a, handleRedirectList as c, handleNotFoundSummary as i, handleRedirectUpdate as l, handleNotFoundList as n, handleRedirectDelete as o, handleNotFoundPrune as r, handleRedirectGet as s, handleNotFoundClear as t };
