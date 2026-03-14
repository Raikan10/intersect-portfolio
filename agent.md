# Agent Project Memory: Intersect Portfolio Redesign

This file serves as a persistent technical and creative summary of the work performed on Ajay Rajnikanth's portfolio.

## Project Vision
A premium, "digital installation" style portfolio characterized by a systems-driven design language, architectural minimalism, and a central "mind map" (interactive graph) representing the user's career and ideas.

## Technical Foundation
- **Framework**: Astro 
- **Graph Engine**: D3.js (Force-directed graph)
- **Styling**: Vanilla CSS with wide use of `backdrop-filter`, `radial-gradient`, and custom CSS variables.
- **Content**: Markdown-based content collections stored in `src/content/`.

## Key Accomplishments & Design Decisions

### 1. Logo & Splash Screen System (The "Architectural Assembly")
- **Conceptual Narrative**: The logo reveal is treated as a structural assembly sequence, not a simple "pop-in." It follows a strict 5-stage architectural timeline:
    1. **Stage 1 (Latent)**: Intelligent silence (300ms pure black).
    2. **Stage 2 (Origin)**: Center node activation (activation of theorigin).
    3. **Stage 3 (Primary Diagonals)**: Center-out vector extension (the backbone).
    4. **Stage 4 (Structural Arms)**: Secondary segments resolving/locking into place.
    5. **Stage 5 (Stabilization)**: Hold for registration followed by the final cross-fade.
- **Visual Principles**: 
    - **Restraint**: No particles, bounce, elastic overshoot, or liquid effects.
    - **Precision**: Thin white lines (#F5F5F5), sharp tips, miter joins, and perfectly centered symmetry.
    - **Lighting**: Extremely restrained glows only during "activation" moments to signify system initialization.
- **FLIP Transition (Logo Handoff)**:
    - **Mechanism**: Strictly moves the logo from viewport center to navbar position using `translate3d` and `scale`. 
    - **Measurement Robustness**: Forces a "shadow measure" state where the navbar is static and opacity is 1. This prevents jitter, ensures target rectangles are measured in their final layout, and handles scroll-width shifts by measuring before `overflow: hidden` is released.
    - **CSS Layering**: Uses separate groups for translation and opacity to ensure the "travel" and the "cross-fade" (into the navbar logo) happen cleanly.

### 2. Navigation Architecture (Floating "Island" Design)
- **Glassmorphic Navbar**: Replaced the full-width header with a floating, rounded navigation bar.
    - **Aesthetics**: Uses `backdrop-filter: blur(16px) saturate(180%)`, a 1px border (`rgba(255, 255, 255, 0.08)`), and dual-layer shadows.
    - **Interaction**: Features high-contrast "Get in touch" CTA and signature italic typography for the wordmark.

### 3. Branding & Typography (The Serif/Sans Split)
- **The Display Layer (Anton)**: Massive, high-impact "STRATEGY × AI" headlines with liquid-glass amber highlights.
- **The Brand Layer (Instrument Serif)**: Mixed-case italic signature ("Ajay Rajnikanth") used for personal branding to contrast with the technical UI.

## Technical Hard Rules & Lessons Learned (DO NOT BREAK)

### 1. CSS Transform Integrity
- **Layering Rule**: Never apply multiple independent animations (e.g., Rotation + 3D Tilt + Scaling) to the same element if they compete for the `transform` property. 
- **Solution**: Nest elements (e.g., `<g class="tilt"><g class="spin">...</g></g>`). If conflicting transforms are applied, the animation will break or override components, leading to a "frozen" or "broken" rotation.

### 2. Motion Easing
- **The "Architectural" Ease**: Avoid `ease-in-out` or spring physics for technical assembly. Use restrained, deliberate easing like `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.4, 0, 0.2, 1)` to maintain a sense of engineering precision.

### 3. Layout Stability (The Scrollbar Snap)
- **Constraint**: Viewport width changes when the scrollbar appears/disappears, causing the centered logo to "jump."
- **Solution**: Use `scrollbar-gutter: stable` on the HTML element or ensure FLIP measurement happens before the splash overlay is removed and the scrollbar returns.

### 4. Visual Avoidance List
- **No Gaming Intro Vibes**: Avoid heavy lens flares, chromatic aberration, or strobe effects.
- **No Generic Tech Tropes**: Avoid "neon cyberpunk" blue/pink glows, particle explosions, or liquid glass transitions.

## Project File Map
- `src/components/SplashScreen.astro`: Core architectural assembly logic and FLIP transition.
- `src/layouts/BaseLayout.astro`: Shell architecture, font loading, and layout stability.
- `src/styles/global.css`: Design system and typography.
- `src/pages/index.astro`: Page structure containing Hero and Graph.
