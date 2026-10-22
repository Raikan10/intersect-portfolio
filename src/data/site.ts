// Single source of truth for the site's facts. The HTML pages, the markdown
// twins (/index.md etc.), llms.txt and the JSON-LD all read from here, so a
// human and an agent always get the same answer.

export const site = {
  name: "buildIntersect",
  url: "https://buildintersect.com",
  tagline: "AI strategy and builds for businesses that run on operations.",
  description:
    "buildIntersect is a small AI strategy and implementation practice led by Ajay Rajnikanth. We take one workflow apart, automate the parts that are completely standard, route the exceptions to people, and stay until the team actually uses it. Based in Coimbatore, India, working with owner-run and mid-size businesses.",
  location: { city: "Coimbatore", region: "Tamil Nadu", country: "IN" },
  email: "ajay.rajnikanth@gmail.com",
  linkedin: "https://www.linkedin.com/in/ajay-rajnikanth/",
  github: "https://github.com/raikan10",
  updated: "2026-10-22",
};

export const founder = {
  name: "Ajay Rajnikanth",
  role: "Founder",
  summary:
    "Software engineer, operator and MBA (IESE Business School). Runs operations and IT across a group of family businesses in distribution and retail in South India, and builds AI systems for other companies through buildIntersect.",
  background: [
    "Computer and Data Engineering, City University of Hong Kong (First Class Honours)",
    "MBA, IESE Business School",
    "Earlier work at Capgemini, Crypto.com and in Apple distribution",
    "Today: head of IT for a multi-brand electronics retail chain, proprietor of an HP and BenQ distribution business, and builder of AI systems for clients",
  ],
};

export const principles = [
  {
    title: "Most problems are messy workflows, not a lack of intelligence.",
    body: "Before anything gets built, we map how the work actually moves today: who asks, who answers, where it waits, and where it gets re-typed. The fix is usually in that map.",
  },
  {
    title: "Automate what is completely standard. People handle the exceptions.",
    body: "The boundary between the two is written down, so the system cannot quietly produce wrong output. When a case falls outside the rules, it goes to a person with the context attached.",
  },
  {
    title: "AI is worth it when it removes steps.",
    body: "Adding a chatbot on top of a broken process adds a step. We measure success in steps removed, hours returned and errors avoided, not in features shipped.",
  },
  {
    title: "Adoption is most of the work.",
    body: "Companies that scale AI spend more on workflow change and training than on the technology. We budget for that from the start and stay through the rollout.",
  },
  {
    title: "Fixed scope over open-ended retainers.",
    body: "Owners would rather pay once to get something done than pay forever. Each engagement has a defined output, a price and a payback case you can check.",
  },
  {
    title: "We will tell you when not to build.",
    body: "Sometimes the right answer is a spreadsheet, a policy change or a specialist vendor. Saying so early is cheaper for everyone.",
  },
];

export const services = [
  {
    id: "workflow-teardown",
    name: "Workflow teardown",
    duration: "Half a day on site",
    price: "No fee for the first one",
    summary:
      "Pick one workflow. We sit with the person who owns it and take it apart properly.",
    outputs: [
      "A map of the workflow as it runs today, including the waits and re-work",
      "Which steps are standard enough to automate, and which need a person",
      "A costed plan with the payback stated, which you keep whether or not you hire us",
    ],
  },
  {
    id: "fixed-scope-build",
    name: "Fixed-scope build",
    duration: "2 to 8 weeks",
    price: "Fixed price, agreed up front",
    summary:
      "We build the system from the plan: an agent, an automation, or a reporting layer over the systems you already run.",
    outputs: [
      "Working software connected to your existing tools (ERP, Tally, WhatsApp, email, spreadsheets)",
      "Written rules for what is automated and what is escalated",
      "A run-book your team can operate, plus a short handover period",
    ],
  },
  {
    id: "operating-layer",
    name: "Company brain and MIS",
    duration: "4 to 10 weeks, then light upkeep",
    price: "Fixed setup, small monthly maintenance",
    summary:
      "One place where the numbers, documents and commitments of the business live, readable by your team and by AI agents.",
    outputs: [
      "A data layer over sales, purchase and finance, with drill-downs owners actually use",
      "A chat interface that answers questions from your own data",
      "A written knowledge base that agents can read and keep current",
    ],
  },
  {
    id: "ai-advisory",
    name: "Advisory for owners and leadership teams",
    duration: "Monthly",
    price: "Monthly fee",
    summary:
      "A thinking partner for founders, family-business owners and search-fund operators deciding where AI fits and how to organise a team around it.",
    outputs: [
      "Where AI should and should not go in your business, in priority order",
      "Build, buy or partner calls on specific vendors",
      "How to structure roles and reviews so the team gets better, not just faster",
    ],
  },
];

export const audiences = [
  "Owner-run and family businesses with 20 to 500 people",
  "Distributors, retailers and manufacturers running on an ERP plus a lot of Excel and WhatsApp",
  "Search-fund operators who have just acquired a business",
  "Leadership teams that have tried AI tools and seen no change in output",
];

export const faqs = [
  {
    q: "What does buildIntersect do?",
    a: "buildIntersect is a small AI strategy and implementation practice. We find the workflows in a business where people are doing standard, repetitive work, automate those parts, route the exceptions to the right person, and build the reporting and knowledge layer that lets owners and AI agents see the business clearly.",
  },
  {
    q: "Who runs buildIntersect?",
    a: "Ajay Rajnikanth, a software engineer, operator and IESE MBA based in Coimbatore, India. He runs operations and IT across a group of family businesses in distribution and retail, which is where most of the methods on this site were first tested.",
  },
  {
    q: "What kind of companies do you work with?",
    a: "Mostly owner-run and mid-size businesses: distributors, retailers, manufacturers and service firms, typically 20 to 500 people, often running a legacy ERP or Tally alongside spreadsheets and WhatsApp. We also work with search-fund operators and founders.",
  },
  {
    q: "How does an engagement start?",
    a: "With one workflow. We spend half a day with whoever owns it and come back with a costed plan. The first session has no fee, and the plan is yours to keep whether or not you work with us.",
  },
  {
    q: "How do you price?",
    a: "Fixed price for a defined scope, agreed before work starts. Ongoing work, where it exists, is a small maintenance fee or a monthly advisory fee. We avoid open-ended retainers.",
  },
  {
    q: "Do you replace our ERP or existing software?",
    a: "Usually not. Most of the value is in making the systems you already have talk to each other and in removing the manual steps between them. If a replacement is the right call, we will say so and help you choose.",
  },
  {
    q: "Which AI models and tools do you use?",
    a: "Whatever fits the job and your data rules. Typical builds use Claude or other frontier models, open-source databases such as ClickHouse, Metabase for reporting, and integrations with WhatsApp, email, Tally and common ERPs. Sensitive data can stay in your own environment.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "Coimbatore, Tamil Nadu, India. We work on site in South India and remotely elsewhere, including the UAE and the UK.",
  },
  {
    q: "How do I get in touch?",
    a: "Email ajay.rajnikanth@gmail.com with one line on the workflow that bothers you most. You will get a reply from Ajay directly.",
  },
];

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
];
