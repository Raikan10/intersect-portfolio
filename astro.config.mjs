import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://intersect-portfolio.com", // Replace with your actual domain
  server: {
    host: true,
  },
  integrations: [sitemap()],
  vite: {
    server: {
      fs: {
        allow: ["."],
      },
    },
  },
});
