import type { APIRoute } from "astro";
import {
  homeMd, servicesPageMd, aboutMd, contactPageMd, workIndexMd, workEntryMd,
  insightsIndexMd, insightEntryMd, getWork, getInsights,
} from "../lib/markdown";

export const GET: APIRoute = async () => {
  const [work, insights] = await Promise.all([getWork(), getInsights()]);
  const parts = [
    await homeMd(), servicesPageMd(), aboutMd(), contactPageMd(),
    await workIndexMd(), ...work.map(workEntryMd),
    await insightsIndexMd(), ...insights.map(insightEntryMd),
  ];
  return new Response(parts.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
