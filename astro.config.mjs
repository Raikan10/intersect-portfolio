import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://buildintersect.com",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    // Keep all CSS in files so the CSP can stay at style-src 'self'.
    inlineStylesheets: "never",
  },
  integrations: [sitemap()],
});
