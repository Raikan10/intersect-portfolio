# buildIntersect

Source for [buildintersect.com](https://buildintersect.com): a small AI strategy and implementation practice led by Ajay Rajnikanth.

The previous personal portfolio lives on the `personal-website` branch.

## Built for people and for agents

- **One source of truth.** Facts live in `src/data/site.ts` and case studies in `src/content/work/*.md`. The HTML pages, markdown twins, `llms.txt` and JSON-LD are all generated from them, so they cannot drift apart.
- **Markdown twins.** Every page has a plain markdown version: `/index.md`, `/services.md`, `/about.md`, `/work.md`, `/work/<slug>.md`.
- **llms.txt** (`/llms.txt`) and the full site in one file (`/llms-full.txt`).
- **Structured data.** Organization, ProfessionalService, Person, Service, FAQPage, Article and BreadcrumbList, linked by stable `@id`s.
- **AI crawlers are explicitly allowed** in `robots.txt`.
- **Content is static HTML.** JavaScript only drives the design (slat shader, logo assembly, graph); every word is readable without it.

## Design system (do not replace)

The visual identity is hand-built and carried over from the original portfolio:

- `GlowShader.astro`: the glass slats hero (three.js shader)
- `SplashScreen.astro`: the five-stage logo assembly and FLIP handoff into the navbar
- The `STRATEGY × AI` glass lockup with the Intersect mark, the floating island navbar, `About`, `Contact`, `Sitemap`
- Tokens in `src/styles/tokens.css`; Anton, Instrument Serif, IBM Plex Sans and Mono

Change content, not the design language.

## Security

- Strict CSP and security headers in `public/_headers`. No inline scripts or `style=` attributes: Vite's `assetsInlineLimit: 0` keeps every script in a file.
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
