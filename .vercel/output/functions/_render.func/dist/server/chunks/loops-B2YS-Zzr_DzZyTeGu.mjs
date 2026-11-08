import { i as matchPattern, n as interpolateDestination, o as validatePattern, t as compilePattern } from "./patterns-CryGz_EV_DR-_pAth.mjs";
// node_modules/emdash/dist/loops-B2YS-Zzr.mjs
/**
* Redirect loop and chain detection utilities.
*
* Builds a directed graph from redirect rules and detects:
* - Cycles (loops): /a → /b → /c → /a
* - Long chains: /a → /b → /c → /d → /e (exceeding a warning threshold)
*
* Handles both exact and pattern redirects. When the walker encounters
* a path with no exact source match, it tests against compiled pattern
* sources and resolves the destination using captured parameters.
*/
/**
* Compile all enabled pattern redirects for matching during graph walks.
*/
function compilePatterns(edges) {
	const result = [];
	for (const edge of edges) if (edge.enabled && edge.isPattern && validatePattern(edge.source) === null) result.push({
		id: edge.id,
		compiled: compilePattern(edge.source),
		destination: edge.destination
	});
	return result;
}
/** Single-segment dummy value for representative path generation */
var DUMMY_SEGMENT = "__p__";
/** Splat pattern: [...paramName] */
var SPLAT_RE = /\[\.\.\.(\w+)\]/g;
/** Param pattern: [paramName] */
var PARAM_RE = /\[(\w+)\]/g;
/**
* Extract the literal prefix from a pattern source (everything before the
* first placeholder), stripped of leading segments shared with a base path.
* e.g., "/new/docs/[slug]" → "docs/__p__" (the part after "/new/")
*/
function extractPatternSuffix(patternSource) {
	let result = patternSource.replace(SPLAT_RE, DUMMY_SEGMENT);
	SPLAT_RE.lastIndex = 0;
	result = result.replace(PARAM_RE, DUMMY_SEGMENT);
	return result.split("/").filter(Boolean).slice(1).join("/");
}
/**
* Generate representative concrete paths from a template string.
* Replaces [param] with a dummy segment and [...rest] with multiple
* depth variants. For catch-alls, also generates representatives using
* literal prefixes from existing pattern sources to catch cross-pattern loops.
*/
function generateRepresentatives(template, existingEdges) {
	const hasSplat = SPLAT_RE.test(template);
	SPLAT_RE.lastIndex = 0;
	if (hasSplat) {
		const splatIndex = template.indexOf("[...");
		const prefix = template.slice(0, splatIndex);
		const reps = [
			template.replace(SPLAT_RE, DUMMY_SEGMENT).replace(PARAM_RE, DUMMY_SEGMENT),
			template.replace(SPLAT_RE, `${DUMMY_SEGMENT}/${DUMMY_SEGMENT}`).replace(PARAM_RE, DUMMY_SEGMENT),
			template.replace(SPLAT_RE, `${DUMMY_SEGMENT}/${DUMMY_SEGMENT}/${DUMMY_SEGMENT}`).replace(PARAM_RE, DUMMY_SEGMENT)
		];
		if (existingEdges) {
			for (const edge of existingEdges) if (edge.enabled && edge.isPattern && edge.source !== template) {
				const suffix = extractPatternSuffix(edge.source);
				if (suffix) reps.push(`${prefix}${suffix}`);
			}
		}
		return reps;
	}
	return [template.replace(PARAM_RE, DUMMY_SEGMENT)];
}
/**
* Resolve the next hop for a given path. Tries exact match first,
* then pattern matching with parameter interpolation for concrete paths,
* then representative-based matching for template strings.
*/
function resolveNext(path, graph, patterns, edges) {
	const exact = graph.get(path);
	if (exact) return exact;
	if (!path.includes("[")) for (const pr of patterns) {
		const params = matchPattern(pr.compiled, path);
		if (params) return {
			destination: interpolateDestination(pr.destination, params),
			id: pr.id
		};
	}
	else {
		const representatives = generateRepresentatives(path, edges);
		for (const pr of patterns) for (const rep of representatives) {
			const params = matchPattern(pr.compiled, rep);
			if (params) return {
				destination: interpolateDestination(pr.destination, params),
				id: pr.id
			};
		}
	}
	return null;
}
/**
* Build an adjacency map from redirect edges.
* Includes both exact and pattern redirects — pattern redirects use their
* template strings as literal graph edges, which works because EmDash
* patterns pass parameters through without transformation.
*/
function buildGraph(edges) {
	const graph = /* @__PURE__ */ new Map();
	for (const edge of edges) if (edge.enabled) graph.set(edge.source, {
		destination: edge.destination,
		id: edge.id
	});
	return graph;
}
/**
* Detect all redirect IDs that participate in cycles.
* Walks every node in the graph once, collecting IDs from any cycles found.
*
* @returns Array of redirect IDs that are part of a loop
*/
function detectLoops(edges) {
	const graph = buildGraph(edges);
	const patterns = compilePatterns(edges);
	const visited = /* @__PURE__ */ new Set();
	const loopRedirectIds = /* @__PURE__ */ new Set();
	for (const [startSource] of graph) {
		if (visited.has(startSource)) continue;
		const path = [];
		const pathSet = /* @__PURE__ */ new Set();
		const pathIds = [];
		let current = startSource;
		while (current) {
			if (pathSet.has(current)) {
				const loopStart = path.indexOf(current);
				for (const id of pathIds.slice(loopStart)) loopRedirectIds.add(id);
				break;
			}
			if (visited.has(current)) break;
			const next = resolveNext(current, graph, patterns, edges);
			if (!next) break;
			path.push(current);
			pathSet.add(current);
			pathIds.push(next.id);
			current = next.destination;
		}
		for (const node of path) visited.add(node);
	}
	return [...loopRedirectIds];
}
/**
* Find a compiled pattern redirect whose source matches the given resolved path,
* returning the source template string for display purposes.
*/
function findMatchingTemplate(resolvedPath, patterns) {
	for (const pr of patterns) if (matchPattern(pr.compiled, resolvedPath) !== null) return pr.compiled.source;
	return null;
}
/**
* Check if adding or updating a redirect would create a loop.
*
* Walks the chain from `destination` through existing redirects.
* If it reaches `source`, a cycle would form.
*
* @returns The loop path if a cycle would be created, or null if safe
*/
function wouldCreateLoop(source, destination, existingEdges, excludeId) {
	const filtered = excludeId ? existingEdges.filter((e) => e.id !== excludeId) : existingEdges;
	const graph = buildGraph(filtered);
	const patterns = compilePatterns(filtered);
	const compiledSource = source.includes("[") && validatePattern(source) === null ? compilePattern(source) : null;
	let startingPoints;
	if (destination.includes("[")) {
		const reps = generateRepresentatives(destination, filtered);
		if (validatePattern(destination) === null) {
			const compiled = compilePattern(destination);
			for (const [key] of graph) if (!key.includes("[") && matchPattern(compiled, key) !== null) reps.push(key);
		}
		reps.push(destination);
		startingPoints = reps;
	} else startingPoints = [destination];
	for (const start of startingPoints) {
		const path = [source, destination];
		let current = start;
		const seen = /* @__PURE__ */ new Set([
			source,
			destination,
			start
		]);
		while (true) {
			const next = resolveNext(current, graph, patterns, filtered);
			if (!next) break;
			if (seen.has(next.destination) || compiledSource !== null && matchPattern(compiledSource, next.destination) !== null) {
				const displayPath = !seen.has(next.destination) && compiledSource !== null ? source : next.destination;
				path.push(displayPath);
				return path;
			}
			const cleanDest = next.destination.includes(DUMMY_SEGMENT) ? findMatchingTemplate(next.destination, patterns) ?? next.destination : next.destination;
			path.push(cleanDest);
			seen.add(next.destination);
			current = next.destination;
		}
	}
	return null;
}
export { wouldCreateLoop as n, detectLoops as t };
