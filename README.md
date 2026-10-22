# buildIntersect

Source for [buildintersect.com](https://buildintersect.com): a small AI strategy and implementation practice led by Ajay Rajnikanth.

The previous personal portfolio lives on the `personal-website` branch.

## Built for people and for agents

- **One source of truth.** Facts live in `src/data/site.ts` and case studies in `src/content/work/*.md`. The HTML pages, markdown twins, `llms.txt` and JSON-LD are all generated from them, so they cannot drift apart.
- **Markdown twins.** Every page has a plain markdown version: `/index.md`, `/services.md`, `/about.md`, `/work.md`, `/work/<slug>.md`.
- **llms.txt** (`/llms.txt`) and the full site in one file (`/llms-full.txt`).
- **Structured data.** Organization, ProfessionalService, Person, Service, FAQPage, Article and BreadcrumbList, linked by stable `@id`s.
- **AI crawlers are explicitly allowed** in `robots.txt`.
- **Zero client-side JavaScript.** Pages are static HTML and CSS.

## Security

- Strict CSP and security headers in `public/_headers` (no inline scripts or styles; keep it that way).
- Exact dependency versions, committed `bun.lock`.
- `bunfig.toml` refuses any package version published in the last 3 days (`minimumReleaseAge`).
- Dependabot proposes updates weekly with a 7-day cooldown.
- Cloudflare Pages build pins `NODE_VERSION` and `BUN_VERSION` (never `latest`).

## Develop

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # static output in dist/
```

Requires Node 22.22+ (pinned to 24 in `.node-version`) and Bun 1.4.3.

## Editing content

- Add a case study: create `src/content/work/<slug>.md` with the frontmatter used by the existing files. Keep client names out; state status honestly.
- Change services, principles, FAQs or contact details: edit `src/data/site.ts` and bump `updated`.
- Writing rules: concrete over impressive, short sentences, no hype words, no em dashes.

## Deploy

Pushing to `main` deploys to Cloudflare Pages (project `ajraikan`), served at buildintersect.com. Other branches get preview URLs.
