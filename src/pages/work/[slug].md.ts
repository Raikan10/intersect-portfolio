import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getWork, workEntryMd, mdResponse } from "../../lib/markdown";

export const getStaticPaths: GetStaticPaths = async () => {
  const work = await getWork();
  return work.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) =>
  mdResponse(workEntryMd((props as { entry: CollectionEntry<"work"> }).entry));
