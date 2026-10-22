import type { APIRoute } from "astro";
import { homeMd, servicesPageMd, aboutMd, workIndexMd, workEntryMd, getWork } from "../lib/markdown";

export const GET: APIRoute = async () => {
  const work = await getWork();
  const parts = [await homeMd(), servicesPageMd(), aboutMd(), await workIndexMd(), ...work.map(workEntryMd)];
  return new Response(parts.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
