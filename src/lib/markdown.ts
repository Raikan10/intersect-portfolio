// Plain-markdown versions of every page, for agents and LLM crawlers.
// Served at /index.md, /services.md, /about.md, /work.md, /work/<slug>.md
// and concatenated into /llms-full.txt.

import { getCollection, type CollectionEntry } from "astro:content";
import { site, founder, principles, services, audiences, faqs } from "../data/site";

const abs = (path: string) => new URL(path, site.url).href;

export async function getWork() {
  const entries = await getCollection("work");
  return entries.sort((a, b) => a.data.order - b.data.order);
}

function frontmatter(title: string, path: string, description: string) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `url: ${abs(path)}`,
    `description: ${JSON.stringify(description)}`,
    `updated: ${site.updated}`,
    "---",
    "",
  ].join("\n");
}

export function principlesMd() {
  return principles.map((p, i) => `${i + 1}. **${p.title}** ${p.body}`).join("\n");
}

export function servicesMd() {
  return services
    .map((s) =>
      [
        `### ${s.name}`,
        "",
        s.summary,
        "",
        `- Duration: ${s.duration}`,
        `- Pricing: ${s.price}`,
        "- What you get:",
        ...s.outputs.map((o) => `  - ${o}`),
      ].join("\n"),
    )
    .join("\n\n");
}

export function faqMd() {
  return faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");
}

export function contactMd() {
  return [
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.linkedin}`,
    `- Location: ${site.location.city}, India`,
    "",
    "Start with one line on the workflow that bothers you most.",
  ].join("\n");
}

function workSummaryMd(entry: CollectionEntry<"work">) {
  const d = entry.data;
  const metrics = d.metrics.map((m) => `${m.value} ${m.label}`).join("; ");
  return `- [${d.title}](${abs(`/work/${entry.id}.md`)}): ${d.summary} (${d.client}. Status: ${d.status}. ${metrics}.)`;
}

export async function homeMd() {
  const work = await getWork();
  return [
    frontmatter(site.name, "/", site.description),
    `# ${site.name}`,
    "",
    `> ${site.tagline}`,
    "",
    site.description,
    "",
    "## Who we work with",
    "",
    ...audiences.map((a) => `- ${a}`),
    "",
    "## How we work",
    "",
    principlesMd(),
    "",
    "## Services",
    "",
    servicesMd(),
    "",
    "## Selected work",
    "",
    ...work.map(workSummaryMd),
    "",
    "## Frequently asked questions",
    "",
    faqMd(),
    "",
    contactMd(),
    "",
  ].join("\n");
}

export function servicesPageMd() {
  return [
    frontmatter(`Services | ${site.name}`, "/services/", "How buildIntersect engagements work: a free workflow teardown, fixed-scope builds, a company brain and MIS, and advisory for owners."),
    "# Services",
    "",
    "Every engagement starts with one workflow and ends with something your team runs without us.",
    "",
    servicesMd(),
    "",
    "## Principles behind every engagement",
    "",
    principlesMd(),
    "",
    contactMd(),
    "",
  ].join("\n");
}

export function aboutMd() {
  return [
    frontmatter(`About | ${site.name}`, "/about/", `About ${founder.name}, founder of ${site.name}.`),
    `# About ${site.name}`,
    "",
    `${site.name} is a small practice. ${founder.name} leads every engagement and brings in specialists where a job needs them.`,
    "",
    `## ${founder.name}, ${founder.role}`,
    "",
    founder.summary,
    "",
    ...founder.background.map((b) => `- ${b}`),
    "",
    "## Why the name",
    "",
    "Most of the useful work in a business happens where two things meet: operations and technology, a process and the person who owns it, a rule and its exception. That intersection is where we build.",
    "",
    contactMd(),
    "",
  ].join("\n");
}

export async function workIndexMd() {
  const work = await getWork();
  return [
    frontmatter(`Work | ${site.name}`, "/work/", "Case studies from buildIntersect. Client names are withheld. Statuses and numbers are stated as they are, including work still in progress."),
    "# Work",
    "",
    "Client names are withheld. Where work is still in progress, the page says so, and numbers describe scope rather than results until outcomes are measured.",
    "",
    ...work.map(workSummaryMd),
    "",
  ].join("\n");
}

export function workEntryMd(entry: CollectionEntry<"work">) {
  const d = entry.data;
  return [
    frontmatter(d.title, `/work/${entry.id}/`, d.summary),
    `# ${d.title}`,
    "",
    `- Client: ${d.client}`,
    `- Sector: ${d.sector}`,
    `- Status: ${d.status}`,
    ...d.metrics.map((m) => `- ${m.value}: ${m.label}`),
    "",
    d.summary,
    "",
    (entry.body ?? "").trim(),
    "",
  ].join("\n");
}

export function mdResponse(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
