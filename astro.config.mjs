import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";
import emdash, { local, s3 } from "emdash/astro";
import { postgres, sqlite } from "emdash/db";

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URI || "";
const onVercel = process.env.VERCEL === "1";
const usePostgres = onVercel || connectionString.length > 0;

function publicSiteUrl() {
	if (process.env.EMDASH_SITE_URL) return process.env.EMDASH_SITE_URL;
	if (process.env.SITE_URL) return process.env.SITE_URL;
	if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return undefined;
}

function needsSsl(url) {
	if (process.env.DATABASE_SSL === "false") return false;
	if (process.env.DATABASE_SSL === "true") return true;
	return !/localhost|127\.0\.0\.1/.test(url);
}

const siteUrl = publicSiteUrl();
const redisUrl = process.env.REDIS_URL;

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: vercel(),
	// The Vercel adapter does not set up a session store. Admin login needs one.
	// Production uses Redis. Local dev falls back to an in-memory cache.
	session: redisUrl
		? { driver: sessionDrivers.redis({ url: redisUrl }) }
		: { driver: sessionDrivers.lruCache({ max: 500 }) },
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		emdash({
			database: usePostgres
				? postgres({
						connectionString,
						ssl: connectionString ? needsSsl(connectionString) : true,
						pool: onVercel ? { min: 0, max: 1 } : { max: 10 },
						migrationConnectionStringEnv: process.env.DATABASE_URL
							? "DATABASE_URL"
							: "DATABASE_URI",
					})
				: sqlite({ url: "file:./data.db" }),
			storage: usePostgres
				? s3()
				: local({
						directory: "./uploads",
						baseUrl: "/_emdash/api/media/file",
					}),
			...(siteUrl ? { siteUrl } : {}),
		}),
	],
	devToolbar: { enabled: false },
});
