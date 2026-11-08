# Three Story Studio

The site for [threestorystudio.com](https://www.threestorystudio.com).

The public pages are Astro. Content is edited in [EmDash](https://emdashcms.com) at `/_emdash/admin`. Production is meant to run on Vercel, with Postgres for content and S3-compatible storage for images.

## Local development

```bash
npm install
npm run dev
```

Without `DATABASE_URL`, the dev server uses a SQLite file at `data.db` and stores uploads in `uploads/`. The admin is at [http://localhost:4321/_emdash/admin](http://localhost:4321/_emdash/admin). The first visit walks through setup and creates the admin account.

Copy `.env.example` when you want the dev server to use the hosted database and bucket instead.

## Content

Two collections replace the Payload model:

- **Projects** have a name. Paste the old numeric Payload id into **Previous Payload id** if an existing `/projects/123` URL should keep working. EmDash redirects that address to the new slug.
- **Pieces** are the photos. **Showcase** is the image shown on the gallery. A published piece with a showcase image appears on the gallery. Check **Home page slideshow** to include it on the home page, and set **Project slug** to the project's URL slug (the last part of `/projects/that-slug`) when the gallery image should open a project.

New projects and pieces are drafts. Publish them before they appear on the site.

Home, gallery, and about copy stays in the page templates, the same way it lived in the Next.js pages.

The old Payload tables are not deleted. EmDash creates its own tables. Photos already in the bucket are not imported automatically, so add the pieces again in the new admin.

## Vercel

The Astro config uses `@astrojs/vercel`. Set these environment variables for Production and Preview, then redeploy:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Public origin, such as `https://www.threestorystudio.com`. Passkeys and login redirects use it. |
| `DATABASE_URL` | Postgres connection string. `DATABASE_URI` still works. Use the Supabase pooler on port 6543. |
| `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Same media bucket the Payload site used. `S3_REGION` and `S3_PUBLIC_URL` are optional. |
| `REDIS_URL` | Required for admin login. The Vercel adapter does not store sessions on its own. Upstash Redis is a fit. |

These values are read when Vercel builds the project, so set them before deploying. Vercel runs the built site on Node.js 24.

After setup, the site starts hidden from search engines. Turn that off in the EmDash admin when the new site should be indexed.

Scheduled publishing needs a long-running process. This site does not use it. A Vercel function will not run EmDash's background scheduler between requests.

## Scripts

- `npm run dev` starts the site.
- `npm run build` builds the Vercel output.
- `npm run typecheck` runs `astro check`.
- `npx emdash seed seed/seed.json --validate` checks the schema file.
