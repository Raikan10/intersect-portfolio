import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  site: "https://ajraikan.pages.dev", // Replace with your actual domain when ready
  server: {
    host: true,
  },
  integrations: [sitemap(), react(), keystatic()],
  vite: {
    optimizeDeps: {
      exclude: ["virtual:keystatic-config"]
    },
    server: {
      fs: {
        allow: ["."],
      },
    },
  },
});