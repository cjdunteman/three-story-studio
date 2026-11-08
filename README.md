# Three Story Studio

The site for [threestorystudio.com](https://www.threestorystudio.com).

The public pages are Astro. Content is edited in [EmDash](https://emdashcms.com) at `/_emdash/admin`. Production runs on Cloudflare Workers. Content is stored in D1, and images are stored in R2.

## Local development

```bash
npm install
npm run dev
```

`npm run dev` uses a SQLite file at `data.db` and stores uploads in `uploads/`. The admin is at [http://localhost:4321/_emdash/admin](http://localhost:4321/_emdash/admin). The first visit walks through setup and creates the admin account.

That local database is not the production D1 database. Pieces created here do not appear on Cloudflare until they are created again there, or copied over with an EmDash site export and import.

## Content

- **Projects** have a name. **Previous project id** keeps an old numeric `/projects/123` address working. The site redirects that address to the project's slug.
- **Pieces** are the photos. **Showcase** is the image shown on the gallery. A published piece with a showcase image appears on the gallery. Check **Home page slideshow** to include it on the home page, and set **Project slug** to the project's URL slug (the last part of `/projects/that-slug`) when the gallery image should open a project.

New projects and pieces are drafts. Publish them before they appear on the site.

Home, gallery, and about copy stays in the page templates.

## Cloudflare

The production build uses `@astrojs/cloudflare`. `wrangler.jsonc` names the D1 database `three-story-studio` (binding `DB`) and the R2 bucket `three-story-studio-media` (binding `MEDIA`). The first deploy creates either resource if it does not already exist. Admin sessions use a Workers KV namespace that the Cloudflare adapter adds during the build. A cron trigger runs scheduled publishing.

Node.js 22.23.4 or later is required. Log in once, then build and deploy:

```bash
npx wrangler login
npm run deploy
```

Open the `workers.dev` URL Wrangler prints and finish setup at `/_emdash/admin`. The first person to finish setup is the administrator. Passkeys only work on the hostname where they are created, so run setup on the production domain, or set `EMDASH_SITE_URL` to that origin before setup:

```bash
npx wrangler secret put EMDASH_SITE_URL
npx wrangler secret put EMDASH_ENCRYPTION_KEY
```

`EMDASH_ENCRYPTION_KEY` encrypts plugin settings. Generate one with `npx emdash secrets generate`. Do not commit it.

After the Worker responds on `workers.dev`, attach the production domain by adding this to `wrangler.jsonc` and deploying again:

```jsonc
"routes": [{ "pattern": "www.threestorystudio.com", "custom_domain": true }]
```

The domain has to be an active domain in the same Cloudflare account.

After setup, the site starts hidden from search engines. Turn that off in the EmDash admin when the new site should be indexed.

## Scripts

- `npm run dev` starts the local site on SQLite.
- `npm run build` builds the Cloudflare Worker.
- `npm run preview` serves that build in the Workers runtime.
- `npm run deploy` builds and runs `wrangler deploy`.
- `npm run typecheck` runs `astro check`.
- `npx emdash seed seed/seed.json --validate` checks the schema file.
