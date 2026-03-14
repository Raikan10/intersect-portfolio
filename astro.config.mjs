import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ajraikan.pages.dev", // Replace with your actual domain when ready
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
