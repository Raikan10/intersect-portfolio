# Glassy Liquid-Light Hero Shader

This document outlines the architecture and math behind the dynamic, interactive hero background we built. It’s designed to be a premium, performant WebGL "liquid light" effect interacting with static glassy bars, heavily inspired by modern design trends.

You can adapt this implementation for other landing pages or sections.

## 1. Core Architecture

The effect is built inside an Astro component (`GlowShader.astro`), but the core logic relies on **Three.js** and **Custom WebGL Shaders (GLSL)**.

- **Scene Setup**: We use a `WebGLRenderer` and an `OrthographicCamera`. Since we are just drawing a flat 2D shader, an orthographic camera looking at a 2x2 `PlaneGeometry` that fills the screen is the most efficient setup.
- **ShaderMaterial**: The magic happens in a `ShaderMaterial`, which takes our custom Fragment Shader and Vertex Shader, along with "uniforms" (variables passed from JavaScript to the shader, like time, resolution, light colors, and mouse position).

## 2. The Fragment Shader (GLSL) Breakdown

The Fragment Shader runs for every single pixel on the canvas. Here is how we build the visual layers:

### A. Static Diagonal "Glass" Bars
1. **Coordinate Rotation**: We take the pixel coordinates `(x, y)` and rotate them by an angle (`-0.65` radians) to create a diagonal space.
2. **Repeating Slats**: We use `fract()` and division by a `spacing` variable (`0.28`) to divide the screen into repeating slices.
3. **Glassy Shape**: Using `smoothstep()`, we model a physical bar:
   - Make a sharp edge on the left (`smoothstep(0.0, 0.02)`).
   - Create a soft fade on the right (`1.0 - smoothstep(0.7, 0.9)`) to imply depth/thickness.
4. **Bevel/Edge Catch**: We create a very thin, highly concentrated highlight strip on the leading edge (`smoothstep(0.01, 0.04)`) that will later intensely catch the light.

### B. "Liquid" Light & Mouse Interaction
Instead of a simple spotlight following the mouse, we use **Simplex 2D Noise**:
1. **Noise Generation**: We generate two overlapping octaves of noise (`snoise`).
2. **Mouse Warping**: Instead of just moving the light to the mouse, we use the distance from the mouse to *shift the coordinates of the noise function*. This causes the noise to "swirl" and pool around the cursor like a viscous liquid being stirred.
3. **Combined Illumination**: A soft spotlight centered on the mouse is mixed with the noise output to ensure the cursor area is always adequately lit, but with organic, moving hot-spots (the "liquid" effect).

### C. Shading & Color Application
1. **Base Value**: Each bar has a slightly varied dark brown base color based on a pseudo-random hash of its `barIndex`.
2. **Additive Light**: We take the liquid light intensity and use `mix()` to apply our "Glow" (warm amber) and "Light Core" (vivid gold). 
3. **Bevel Highlights**: We exponentially increase the light intensity explicitly on the calculated `bevelEdge` to make it look like thick glass catching direct illumination.

### D. Post-Processing & Polish
- **Noise / Grain**: A high-frequency hash function generates per-pixel, per-frame static noise. We add this on top to give it a raw, tactile digital film-grain feel.
- **Vignette**: We slowly darken the edges of the canvas based on the distance from the center (`length(p)`).

## 3. Performance Optimizations

Running complex fragment shaders on full-screen canvases is expensive. We built in strict performance protections:

1. **Resolution Limiting**: We clamp the pixel ratio (`Math.min(window.devicePixelRatio, 2)`) so ultra-high-density displays (like 4K MacBooks) don't try to calculate 4x the pixels unnecessarily.
2. **IntersectionObserver Freezing**: 
   - We attached an `IntersectionObserver` to the canvas element. 
   - When the user scrolls down and the hero section leaves the viewport (even by 1 pixel, `threshold: 0`), we call `cancelAnimationFrame()`.
   - This completely stops the CPU loop and WebGL rendering. The page becomes entirely static, saving battery and CPU/GPU cycles for the rest of the site. When scrolled back into view, it instantly resumes.
3. **Initial Frame Safety**: We initialize `this.targetMouse` immediately so the `lerp` mathematical operation on the first frame doesn't crash the JS thread if the user hasn't moved their mouse yet.

## 4. Integration & Layout

To keep it contained to the hero section:
1. The canvas is inside an `.absolute` container spanning `width: 100%; height: 100%; top: 0; left: 0;`.
2. It has a `z-index: -1;` to sit strictly behind the text.
3. The parent Hero section is `position: relative; width: 100%; min-height: 100vh;`. This ensures the shader stays firmly anchored in the top section and scrolls away naturally with the page layout.
