import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

const lifecycle = process.env.npm_lifecycle_event ?? "";
const command = process.argv.find((arg) => ["dev", "build", "preview", "check"].includes(arg));

// Local `astro dev` keeps data.db and uploads/. Build, preview, and deploy
// run as a Cloudflare Worker with D1 and R2.
const cloudflareBuild =
	process.env.DEPLOY_TARGET === "cloudflare" ||
	lifecycle === "build" ||
	lifecycle === "preview" ||
	lifecycle === "deploy" ||
	command === "build" ||
	command === "preview";

function publicSiteUrl() {
	if (process.env.EMDASH_SITE_URL) return process.env.EMDASH_SITE_URL;
	if (process.env.SITE_URL) return process.env.SITE_URL;
	return undefined;
}

const siteUrl = publicSiteUrl();

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: cloudflareBuild ? cloudflare() : node({ mode: "standalone" }),
	// The Cloudflare adapter adds a Workers KV session store during the build.
	// Local dev has no KV binding, so it keeps sessions in memory.
	...(cloudflareBuild
		? {}
		: { session: { driver: sessionDrivers.lruCache({ max: 500 }) } }),
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
			database: cloudflareBuild
				? d1({ binding: "DB", session: "auto", coalesce: true })
				: sqlite({ url: "file:./data.db" }),
			storage: cloudflareBuild
				? r2({ binding: "MEDIA" })
				: local({
						directory: "./uploads",
						baseUrl: "/_emdash/api/media/file",
					}),
			// On Cloudflare, leave this unset so EMDASH_SITE_URL is read at runtime.
			...(!cloudflareBuild && siteUrl ? { siteUrl } : {}),
			// Local Node has no send_email binding. Production mail goes out
			// through Cloudflare Email Sending.
			...(cloudflareBuild
				? {
						plugins: [
							cloudflareEmail({
								binding: "EMAIL",
								from: {
									email: "noreply@mail.threestorystudio.com",
									name: "Three Story Studio",
								},
							}),
						],
					}
				: {}),
		}),
	],
	devToolbar: { enabled: false },
});
