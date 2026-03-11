# Intersect Portfolio Handoff

## What This Project Is

This is the start of a portfolio site for **Ajay Rajnikanth**. The
intent is not a generic personal website. It should feel like a
**digital installation about systems, intersections, structure, and
ideas**.

The current implementation is an **Astro homepage concept** built with a
static-first approach and a strong emphasis on:

- speed
- web vitals
- SEO/GEO readiness
- premium visual craft
- minimal client-side JavaScript

## Current Stack Decision

### Chosen stack

- **Astro**
- **Bun** for package management and running scripts
- **TypeScript config support** through Astro
- **Scoped Astro components + global CSS**
- **IBM Plex Sans** and **IBM Plex Mono** via `@fontsource`

### Why Astro

Astro was chosen because the project needs:

- excellent performance
- mostly static rendering
- strong SEO fundamentals
- minimal client-side JS
- room for selective interactivity later

Astro is a better fit for this portfolio than plain React. It keeps the
site light while still allowing future islands or advanced interactive
geometry if needed.

### Why Bun

Bun is being used now as the package manager and script runner because
it is fast and works well for this static-first setup.

The project is intentionally kept **portable** so it can move to
**pnpm** later if future integrations require it. The architecture does
not depend on Bun-specific app patterns.

## Design Inputs Reviewed

The design direction came from these source files:

- `Design Doc.txt`
- `portfolio_design_system.md`
- `Logo.svg`

There is also a synthesized analysis document:

- `visual_system_understanding_brief.md`

## What We Learned From The Design Docs

### Core design thesis

The portfolio should feel like:

- a gallery
- a constructed system
- an idea forming in space

The main visual and conceptual themes are:

- systems thinking
- intersections of ideas
- structure and precision
- minimal but intentional design
- spatial navigation instead of normal menu-heavy browsing

### Visual system

The visual system is based on:

- thin vector lines
- nodes and intersections
- angular geometry
- structural symmetry
- dark backgrounds with light-revealed geometry
- restrained use of electric blue

### Motion direction

Motion should feel:

- slow
- smooth
- subtle
- precise

The first pass should never feel noisy or gimmicky.

### Typography direction

The docs describe the typography as:

- architectural
- editorial
- minimal
- high-hierarchy

The implementation uses IBM Plex as a practical first pass, not as a
final locked type choice.

## What We Learned From The Logo

The SVG mark is visually strong, but it is **not yet a full navigation
system**.

What it does well:

- reads as a constellation or intersection map
- provides structural DNA for the interface
- supports the systems/intersections concept

What it does not yet fully solve:

- explicit node logic
- precise navigation anchor behavior
- a complete grid system
- reusable geometry rules for the entire site

Conclusion:

The logo works well as a **motif and scaffold**, but not yet as a fully
resolved UI/navigation system without further parameterization.

## Current Homepage Implementation

The current Astro homepage is a **single-page concept** for the landing
screen only.

### Files

- `astro.config.mjs`
- `tsconfig.json`
- `package.json`
- `public/Logo.svg`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/styles/global.css`

### What the homepage currently includes

- semantic layout with metadata
- JSON-LD person schema for Ajay Rajnikanth
- dark, architectural visual treatment
- a large editorial hero
- a spatial hero composition using the geometric mark
- top-level navigation anchors for:
  - Projects
  - Ideas
  - Writing
  - About
- three profile/pillar cards
- supporting sections reinforcing geometry, lighting, and motion
- CSS-only motion
- reduced-motion support
- favicon using the logo SVG

### Current visual direction of the homepage

The page intentionally avoids:

- generic SaaS layouts
- heavy glassmorphism
- loud neon cyberpunk styling
- stock hero patterns
- overbuilt UI chrome

It aims for:

- dark atmosphere
- restrained blue accenting
- premium editorial typography
- geometric spatial composition
- minimal but deliberate surface design

## Implementation Notes

### Package scripts

The project uses Bun scripts in `package.json`.

Telemetry is disabled in the scripts because Astro otherwise attempts to
write preferences outside the project sandbox.

### Build/dev behavior

Astro and Vite write generated files and local cache data during build
and dev. That is normal.

### Important environment issue we hit

The original workspace path contained a literal backslash:

- `Intersect\Portfolio`

That broke Astro CLI resolution in Node/Bun ESM handling.

The project was renamed to:

- `Intersect-Portfolio`

That fixed the CLI/runtime issue.

## Verified Status

### Verified working

- Astro installed successfully
- Bun installed successfully
- homepage build completed successfully
- local dev server rendered successfully
- browser snapshot matched the intended structure

### Artifacts generated

- `visual_system_understanding_brief.md`
- `output/imagegen/home_screen_concept_prompt.txt`
- `tmp/astro-homepage-final.png`

## Image Generation Work Done

An image prompt was prepared for generating a homepage concept using the
`imagegen` skill.

File:

- `output/imagegen/home_screen_concept_prompt.txt`

Important note:

The actual live image generation was **not executed** because
`OPENAI_API_KEY` was not set in the shell at the time.

## Key Product/Technical Decisions Already Made

- Use **Astro** for the site
- Use **Bun** initially
- Keep the project easy to migrate to **pnpm** later if needed
- Keep the homepage **static-first**
- Avoid client-side JS unless it materially improves the experience
- Start with **CSS-only motion**
- Use the existing SVG mark as a visual scaffold, not as a fully solved
  navigation engine
- Prioritize performance, SEO, and craft over framework complexity

## What Is Still Missing

### Design-system level gaps

- exact geometry rules
- reusable node logic
- layout/grid system derived from the mark
- final typeface decision
- final motion thresholds and timing system
- accessibility rules for contrast and motion
- responsive interpretation of the spatial-navigation idea
- imagery/art direction rules for the rest of the site

### Product/site gaps

- actual project content
- ideas/writing/about content
- route structure beyond the homepage concept
- content model
- sitemap/robots/canonical setup
- OG image system
- analytics/search/GEO details if desired later

## Recommended Next Steps

### Best next move

Refine the homepage concept before expanding the whole site.

The current page is a strong first pass, but the biggest value now is in
making the visual language more distinctive and more systematized before
duplicating it across many pages.

### Suggested sequence

1. Refine the homepage visual system
2. Decide how the geometric mark translates into layout rules
3. Lock typography direction
4. Define section architecture and content model
5. Build secondary pages and section templates
6. Add selective interaction only where it meaningfully improves the
   experience

### Good future upgrades

- introduce Astro content collections
- add sitemap and robots configuration
- add canonical metadata and OG image handling
- create a proper project detail template
- add subtle SVG animation or lightweight canvas work only if it
  preserves performance
- switch to pnpm later only if a future dependency requires it

## Commands

### Install

```bash
bun install
```

### Run dev server

```bash
bun run dev
```

### Build

```bash
bun run build
```

### Preview production build

```bash
bun run preview
```

## Summary

The project now has:

- a documented visual-system understanding
- a working Astro/Bun setup
- a built homepage concept aligned with the design brief
- a clear direction for how to continue

The most important thing to preserve from here is the core principle:

This site should feel like a **space of ideas and systems**, not a
normal portfolio template.
