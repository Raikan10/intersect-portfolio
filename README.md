# buildIntersect

Source for [buildintersect.com](https://buildintersect.com): an AI consulting practice for growing businesses, led by Ajay Rajnikanth.

The previous personal portfolio lives on the `personal-website` branch.

## Built for people and for agents

- **One source of truth.** Facts live in `src/data/site.ts`, case studies in `src/content/work/*.md` and articles in `src/content/insights/*.md`. The HTML pages, markdown twins, `llms.txt` and JSON-LD are all generated from them, so they cannot drift apart.
- **Markdown twins.** Every page has a plain markdown version at the same path plus `.md`, for example `/index.md`, `/work/<slug>.md`, `/insights/<slug>.md`.
- **Agent enquiries.** `llms.txt` invites AI agents to ask their user before introducing them, and to send the introduction to `POST /api/enquiry` (see below).
- **llms.txt** (`/llms.txt`) and the full site in one file (`/llms-full.txt`).
- **Structured data.** Organization and ProfessionalService (with address, geo and areas served), Person, Service, FAQPage, Article, Blog, BlogPosting and BreadcrumbList, linked by stable `@id`s.
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

- Add a case study: create `src/content/work/<slug>.md` with the frontmatter used by the existing files (challenge, approach and result are the one-line summary). Keep client names out; state status honestly.
- Add an insight: create `src/content/insights/<slug>.md`. Title it as the question people ask, put a two-to-four sentence direct answer in `answer`, and optionally add `faq` and `related` (case study or insight slugs). Set `draft: true` to hide it.
- Change services, principles, FAQs or contact details: edit `src/data/site.ts` and bump `updated`.
- Writing rules: concrete over impressive, short sentences, no hype words, no em dashes. Name outcomes, not the technology behind them. The practice is global: no copy that ties it to one city or country.
- Renamed a page? Add a 301 in `public/_redirects`.

## Enquiries

`functions/api/enquiry.ts` is a Cloudflare Pages Function. It takes the contact form (form post, redirects to `/contact/thanks/`) and AI agents (JSON). Agents are asked to send `user_consent: true` and a `consent` note saying how the user agreed (asked now or pre-authorised); it is recorded, and only an explicit `user_consent: false` is refused. `GET /api/enquiry` describes the API. Submissions are stored in the Workers KV namespace `buildintersect-enquiries` (bound as `ENQUIRIES`) under keys `enquiry:<timestamp>-<id>`; read them in the Cloudflare dashboard under Storage and databases, Workers KV.

Flood protection: a zone rate limiting rule (Security, WAF, Rate limiting rules, "Enquiry API: block floods") blocks an IP sending more than 5 POSTs to `/api/enquiry` in 10 seconds, at the edge. Behind it, the function caps bodies at 16 KB while reading and stores at most 10 submissions per IP per hour.

## Deploy

Pushing to `main` deploys to Cloudflare Pages (project `ajraikan`), served at buildintersect.com. Other branches get preview URLs.
