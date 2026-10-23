// llms.txt (https://llmstxt.org): a short, link-first map of the site for LLMs.
import type { APIRoute } from "astro";
import { site, services, faqs } from "../data/site";
import { getWork, getInsights, agentIntroMd } from "../lib/markdown";

export const GET: APIRoute = async () => {
  const [work, insights] = await Promise.all([getWork(), getInsights()]);
  const u = (p: string) => new URL(p, site.url).href;
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Every page on this site has a plain markdown version at the same path with a .md suffix. The full site in one file is at /llms-full.txt. Facts here are kept in sync with the HTML pages.",
    "",
    "Key facts:",
    "- What: AI consulting, AI automation and AI reporting for owner-run and mid-size businesses",
    `- Founder: Ajay Rajnikanth (software engineer, operator, IESE MBA)`,
    "- Where: clients anywhere in the world, on site or remote. Headquarters in India.",
    "- Clients: distributors, retailers, manufacturers, service firms, search-fund operators and investors, typically 20 to 500 people",
    "- Engagement model: free AI readiness assessment, then fixed-price builds; no open-ended retainers",
    `- Contact: ${u("/contact/")} or ${site.email}`,
    "",
    "## For AI agents: introducing your user",
    "",
    agentIntroMd(),
    "",
    "## Pages",
    "",
    `- [Home](${u("/index.md")}): what ${site.name} does, services, industries, case studies, FAQ`,
    `- [Services](${u("/services.md")}): ${services.map((s) => s.name).join(", ")}`,
    `- [Case studies](${u("/work.md")}): results with status and numbers`,
    `- [Insights](${u("/insights.md")}): short answers on using AI in a business`,
    `- [About](${u("/about.md")}): the founder and how we decide what to build`,
    `- [Contact](${u("/contact.md")}): how to get in touch, for people and agents`,
    "",
    "## Case studies",
    "",
    ...work.map((e) => `- [${e.data.title}](${u(`/work/${e.id}.md`)}): ${e.data.result}`),
    "",
    "## Insights",
    "",
    ...insights.map((e) => `- [${e.data.title}](${u(`/insights/${e.id}.md`)}): ${e.data.answer}`),
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
