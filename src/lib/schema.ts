// schema.org JSON-LD. Entities share stable @ids so search engines and
// answer engines can join them into one graph across pages.

import { site, founder, services, faqs } from "../data/site";
import type { CollectionEntry } from "astro:content";

const abs = (path: string) => new URL(path, site.url).href;

export const ids = {
  org: `${site.url}/#organization`,
  person: `${site.url}/#founder`,
  website: `${site.url}/#website`,
};

export function orgGraph() {
  return [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ids.org,
      name: site.name,
      url: abs("/"),
      logo: { "@type": "ImageObject", url: abs("/apple-touch-icon.png"), width: 180, height: 180 },
      image: abs("/og-image.jpg"),
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      founder: { "@id": ids.person },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      geo: { "@type": "GeoCoordinates", ...site.location.geo },
      areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        url: abs("/contact/"),
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "AI consulting",
        "AI strategy",
        "AI automation",
        "Business process automation",
        "Customer response automation",
        "Sales and operations reporting",
        "AI agents",
        "Management information systems",
        "Process redesign",
        "Knowledge management",
        "AI for manufacturing",
        "AI for distributors",
        "AI for retail",
      ],
      sameAs: [site.linkedin],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": abs(`/services/#${s.id}`),
            name: s.name,
            description: s.summary,
            provider: { "@id": ids.org },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": ids.person,
      name: founder.name,
      jobTitle: `${founder.role}, ${site.name}`,
      description: founder.summary,
      url: abs("/about/"),
      worksFor: { "@id": ids.org },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "IESE Business School" },
        { "@type": "CollegeOrUniversity", name: "City University of Hong Kong" },
      ],
      sameAs: [site.linkedin, site.github],
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: abs("/"),
      name: site.name,
      description: site.tagline,
      publisher: { "@id": ids.org },
      inLanguage: "en",
    },
  ];
}

export function faqGraph() {
  return faqPage(`${site.url}/#faq`, faqs);
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function caseStudy(opts: { title: string; summary: string; path: string; tags: string[]; published: Date }) {
  return {
    "@type": "Article",
    datePublished: opts.published.toISOString().slice(0, 10),
    "@id": `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.summary,
    url: abs(opts.path),
    keywords: opts.tags.join(", "),
    dateModified: site.updated,
    author: { "@id": ids.person },
    publisher: { "@id": ids.org },
    isPartOf: { "@id": ids.website },
    image: abs("/og-image.jpg"),
  };
}

export function blogPosting(entry: CollectionEntry<"insights">) {
  const d = entry.data;
  const url = abs(`/insights/${entry.id}/`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: d.title,
    description: d.description,
    abstract: d.answer,
    url,
    mainEntityOfPage: url,
    articleSection: d.category,
    keywords: d.tags.join(", "),
    datePublished: d.published.toISOString().slice(0, 10),
    dateModified: (d.updated ?? d.published).toISOString().slice(0, 10),
    author: { "@id": ids.person },
    publisher: { "@id": ids.org },
    isPartOf: { "@id": ids.website },
    image: abs("/og-image.jpg"),
    inLanguage: "en",
  };
}

export function faqPage(id: string, items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function toJsonLd(graph: object[]) {
  // Escape "<" so content can never close the script element.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
