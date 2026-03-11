import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const graph = defineCollection({
  loader: glob({ base: "./src/content/graph", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    nodeType: z.enum(["project", "idea", "writing"]),
    status: z.enum(["draft", "placeholder", "published"]).default("placeholder"),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    related: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = {
  graph,
};
