import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Case studies. challenge / approach / result are the one-line "at a glance"
// version; the markdown body tells the full story.
const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    industry: z.enum(["distribution", "retail", "manufacturing", "owners-investors"]),
    summary: z.string(),
    challenge: z.string(),
    approach: z.string(),
    result: z.string(),
    status: z.string(),
    order: z.number().int(),
    published: z.coerce.date(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    services: z.array(z.string()).default([]),
    principles: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

// Insights: answer-first articles written as the questions people ask.
// `answer` is the short answer shown first and used by answer engines.
const insights = defineCollection({
  loader: glob({ base: "./src/content/insights", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    answer: z.string(),
    category: z.enum(["Strategy", "Productivity", "Automation", "Industries"]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, insights };
