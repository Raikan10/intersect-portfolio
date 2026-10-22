// llms.txt (https://llmstxt.org): a short, link-first map of the site for LLMs.
import type { APIRoute } from "astro";
import { site, services, faqs } from "../data/site";
import { getWork } from "../lib/markdown";

export const GET: APIRoute = async () => {
  const work = await getWork();
  const u = (p: string) => new URL(p, site.url).href;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Every page on this site has a plain markdown version at the same path with a .md suffix. The full site in one file is at /llms-full.txt. Facts here are kept in sync with the HTML pages.",
    "",
    "Key facts:",
    `- Founder: Ajay Rajnikanth (software engineer, operator, IESE MBA)`,
    `- Based in: ${site.location.city}, India. Works on site in South India and remotely in the UAE and UK.`,
    `- Clients: owner-run and mid-size businesses, distributors, retailers, manufacturers, search-fund operators`,
    `- Engagement model: free half-day workflow teardown, then fixed-price builds; no open-ended retainers`,
    `- Contact: ${site.email}`,
    "",
    "## Pages",
    "",
    `- [Home](${u("/index.md")}): what ${site.name} does, principles, services, FAQ`,
    `- [Services](${u("/services.md")}): ${services.map((s) => s.name.toLowerCase()).join(", ")}`,
    `- [About](${u("/about.md")}): the founder and how we decide what to build`,
    `- [Work](${u("/work.md")}): case studies with status and numbers`,
    "",
    "## Case studies",
    "",
    ...work.map((e) => `- [${e.data.title}](${u(`/work/${e.id}.md`)}): ${e.data.summary}`),
    "",
    "## Common questions",
    "",
    ...faqs.map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Optional",
    "",
    `- [Full site in one file](${u("/llms-full.txt")})`,
    `- [Sitemap](${u("/sitemap-index.xml")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
