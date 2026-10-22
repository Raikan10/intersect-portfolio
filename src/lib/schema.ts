// schema.org JSON-LD. Entities share stable @ids so search engines and
// answer engines can join them into one graph across pages.

import { site, founder, services, faqs } from "../data/site";

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
      logo: abs("/logo.png"),
      image: abs("/og-image.png"),
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
      areaServed: ["India", "United Arab Emirates", "United Kingdom"],
      knowsAbout: [
        "AI strategy",
        "Business process automation",
        "AI agents",
        "Management information systems",
        "Workflow redesign",
        "ERP readiness",
        "Knowledge management",
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
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
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

export function caseStudy(opts: { title: string; summary: string; path: string; tags: string[] }) {
  return {
    "@type": "Article",
    "@id": `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.summary,
    url: abs(opts.path),
    keywords: opts.tags.join(", "),
    dateModified: site.updated,
    author: { "@id": ids.person },
    publisher: { "@id": ids.org },
    isPartOf: { "@id": ids.website },
    image: abs("/og-image.png"),
  };
}

export function toJsonLd(graph: object[]) {
  // Escape "<" so content can never close the script element.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
