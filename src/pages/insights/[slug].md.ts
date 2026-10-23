import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getInsights, insightEntryMd, mdResponse } from "../../lib/markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const insights = await getInsights();
  return insights.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) =>
  mdResponse(insightEntryMd((props as { entry: CollectionEntry<"insights"> }).entry));
