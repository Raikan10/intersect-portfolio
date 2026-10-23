// Single source of truth for the site's facts. The HTML pages, the markdown
// twins (/index.md etc.), llms.txt and the JSON-LD all read from here, so a
// human and an agent always get the same answer.

export const site = {
  name: "buildIntersect",
  url: "https://buildintersect.com",
  tagline: "AI consulting and automation for growing businesses.",
  description:
    "buildIntersect is an AI consulting company in Coimbatore, India. We help owner-run and mid-size businesses use AI to automate repetitive work, see their numbers clearly and grow without adding headcount. We work on site across Tamil Nadu and South India, and remotely with clients across India, the UAE and the UK.",
  location: {
    city: "Coimbatore",
    region: "Tamil Nadu",
    country: "IN",
    countryName: "India",
    geo: { latitude: 11.0168, longitude: 76.9558 },
  },
  areaServed: ["Coimbatore", "Tamil Nadu", "India", "United Arab Emirates", "United Kingdom"],
  email: "ajay.rajnikanth@gmail.com",
  linkedin: "https://www.linkedin.com/in/ajay-rajnikanth/",
  github: "https://github.com/raikan10",
  updated: "2026-10-23",
};

export const founder = {
  name: "Ajay Rajnikanth",
  role: "Founder",
  summary:
    "Software engineer, operator and MBA (IESE Business School), based in Coimbatore. Runs operations and IT across a group of family businesses in distribution and retail in South India, and builds AI systems for other companies through buildIntersect.",
  background: [
    "Computer and Data Engineering, City University of Hong Kong (First Class Honours)",
    "MBA, IESE Business School",
    "Earlier work at Capgemini, Crypto.com and in Apple distribution",
    "Today: head of IT for a multi-brand electronics retail chain, proprietor of an HP and BenQ distribution business, and builder of AI systems for clients",
  ],
};

export const principles = [
  {
    id: "messy-processes",
    title: "Most problems are messy processes, not a lack of intelligence.",
    body: "Before anything gets built, we map how the work actually moves today: who asks, who answers, where it waits, and where it gets re-typed. The fix is usually in that map.",
  },
  {
    id: "standard-vs-exceptions",
    title: "Automate what is completely standard. People handle the exceptions.",
    body: "The boundary between the two is written down, so the system cannot quietly produce wrong output. When a case falls outside the rules, it goes to a person with the context attached.",
  },
  {
    id: "removes-steps",
    title: "AI is worth it when it removes steps.",
    body: "Adding a chatbot on top of a broken process adds a step. We measure success in steps removed, hours returned and errors avoided, not in features shipped.",
  },
  {
    id: "adoption",
    title: "Adoption is most of the work.",
    body: "Companies that get value from AI spend more on changing how people work than on the technology. We budget for that from the start and stay through the rollout.",
  },
  {
    id: "fixed-scope",
    title: "Fixed scope over open-ended retainers.",
    body: "Owners would rather pay once to get something done than pay forever. Each engagement has a defined output, a price and a payback case you can check.",
  },
  {
    id: "when-not-to-build",
    title: "We will tell you when not to build.",
    body: "Sometimes the right answer is a spreadsheet, a policy change or a specialist vendor. Saying so early is cheaper for everyone.",
  },
];

export const services = [
  {
    id: "ai-readiness-assessment",
    name: "AI readiness assessment",
    short: "Find out where AI will pay off in your business, and where it will not.",
    duration: "Half a day, on site or on a call",
    price: "No fee for the first one",
    summary:
      "We pick one part of the business that eats the most hours, sit with the person who owns it, and take it apart properly.",
    outputs: [
      "A map of how the work runs today, including the waits and the re-work",
      "Which steps are standard enough to automate, and which need a person",
      "A costed plan with the payback stated, which you keep whether or not you hire us",
    ],
  },
  {
    id: "ai-automation",
    name: "AI automation",
    short: "Agents and automations that remove manual steps from sales, operations and finance.",
    duration: "2 to 8 weeks",
    price: "Fixed price, agreed up front",
    summary:
      "We build from the plan: an AI agent, an automation, or a connection between the systems you already run, so people stop re-typing and chasing.",
    outputs: [
      "Working software connected to your existing tools: Tally, your ERP, WhatsApp, email and spreadsheets",
      "Written rules for what is automated and what goes to a person",
      "A run-book your team can operate, plus a short handover period",
    ],
  },
  {
    id: "ai-reporting",
    name: "AI reporting and company knowledge base",
    short: "One place for your numbers and know-how, that your team and AI can both read.",
    duration: "4 to 10 weeks, then light upkeep",
    price: "Fixed setup, small monthly maintenance",
    summary:
      "Sales, purchase and finance numbers you can drill into, plus a written knowledge base of how the business runs, so owners stop waiting on reports.",
    outputs: [
      "A reporting layer over sales, purchase and finance, with drill-downs owners actually use",
      "A chat interface that answers questions from your own data, including on mobile",
      "A written knowledge base that AI agents can read and keep current",
    ],
  },
  {
    id: "ai-advisory",
    name: "AI advisory for owners and investors",
    short: "A thinking partner for deciding where AI fits and how to organise around it.",
    duration: "Monthly",
    price: "Monthly fee",
    summary:
      "For founders, family-business owners, search-fund operators and investors deciding where AI fits, which vendors to trust, and how to set up the team.",
    outputs: [
      "Where AI should and should not go in the business, in priority order",
      "Build, buy or partner calls on specific vendors",
      "How to structure roles and reviews so the team gets better, not just faster",
    ],
  },
];

export const industries = [
  {
    id: "distribution",
    name: "Distributors and wholesalers",
    pain: "Price and stock queries on WhatsApp, collections that slip past 45 days, schemes tracked in spreadsheets.",
    firstProjects: ["A sales copilot that drafts price and stock replies", "Collections and overdue alerts from Tally", "Scheme and target tracking without manual reports"],
    insight: "ai-for-distributors",
  },
  {
    id: "retail",
    name: "Retail chains",
    pain: "Several systems that do not share data, daily re-keying into brand portals, and store staff working around the software.",
    firstProjects: ["A data layer across POS, finance and brand portals", "Store-facing tools in the language staff use", "Process design before an ERP purchase"],
    insight: "how-to-improve-productivity-with-ai",
  },
  {
    id: "manufacturing",
    name: "Manufacturers",
    pain: "Sales and production data locked in legacy software, export paperwork done by hand, and reports that arrive after the decision.",
    firstProjects: ["Sales MIS with drill-down by unit, product and customer", "An export documentation agent", "Daily alerts on what was missed in email"],
    insight: "ai-in-manufacturing-india",
  },
  {
    id: "owners-investors",
    name: "Owners, search funds and investors",
    pain: "A newly acquired or inherited business where the knowledge sits in a few people's heads and nobody trusts the numbers yet.",
    firstProjects: ["A company knowledge base of people, commitments and decisions", "An AI readiness review across the business", "A 100-day plan for where AI goes first"],
    insight: "is-my-business-ready-for-ai",
  },
];

// The order an engagement runs in. This one really is a sequence.
export const process = [
  { name: "Assess", body: "Half a day with the person who owns the problem. You leave with a costed plan and the payback stated." },
  { name: "Build", body: "A fixed-scope build connected to the systems you already run, with the rules for exceptions written down." },
  { name: "Run", body: "We stay through rollout and training until your team uses it without us, then hand over a run-book." },
];

export const audiences = [
  "Owner-run and family businesses with 20 to 500 people",
  "Distributors, retailers and manufacturers running on Tally or an ERP plus a lot of Excel and WhatsApp",
  "Search-fund operators and investors who have just acquired a business",
  "Leadership teams that have tried AI tools and seen no change in output",
];

export const faqs = [
  {
    q: "What does buildIntersect do?",
    a: "buildIntersect is an AI consulting company based in Coimbatore, India. We find the parts of a business where people spend hours on standard, repetitive work, automate those parts with AI, route the exceptions to the right person, and build the reporting and knowledge layer that lets owners see the business clearly. Then we stay until the team actually uses it.",
  },
  {
    q: "How can AI help my business grow?",
    a: "Mostly by giving your people their hours back and by making the numbers visible sooner. In owner-run businesses the biggest wins are usually unglamorous: answering routine customer queries faster, chasing collections on time, removing re-typing between systems, and getting owners the report before the decision instead of after it. Growth comes from what the team does with the time.",
  },
  {
    q: "What kind of companies do you work with?",
    a: "Mostly owner-run and mid-size businesses with 20 to 500 people: distributors, retailers, manufacturers and service firms, often running Tally or a legacy ERP alongside spreadsheets and WhatsApp. We also work with search-fund operators and investors after an acquisition.",
  },
  {
    q: "Is my business ready for AI?",
    a: "If your team re-types the same information between systems, answers the same questions every day, or waits on someone to compile a report, there is something worth automating. You do not need clean data or a new ERP to start. The free AI readiness assessment tells you where it will pay off and where it will not.",
  },
  {
    q: "Do we need to replace Tally or our ERP?",
    a: "Usually not. Most of the value is in making the systems you already have talk to each other and in removing the manual steps between them. If a replacement is the right call, we will say so and help you choose.",
  },
  {
    q: "How much does AI consulting cost?",
    a: "The first AI readiness assessment has no fee. Builds are a fixed price for a defined scope, agreed before work starts, with the payback stated in the plan. Ongoing work is a small maintenance fee or a monthly advisory fee. We avoid open-ended retainers.",
  },
  {
    q: "How are you different from an AI agency or a large IT services firm?",
    a: "We are small, and we run businesses ourselves. Most of what we build was tested first in our own distribution and retail operations in South India. We work on one problem at a time, at a fixed price, and the person you first speak to is the person who does the work.",
  },
  {
    q: "What happens to our data?",
    a: "Your data stays yours. Where it is sensitive, systems run in your own environment and accounts. We use frontier models such as Claude where they fit, and we write down what data each tool can see before it goes live.",
  },
  {
    q: "Where are you based, and do you work outside Coimbatore?",
    a: "We are based in Coimbatore, Tamil Nadu. We work on site across Tamil Nadu and South India, including Tiruppur, Erode, Salem, Chennai and Bengaluru, and remotely with clients elsewhere in India, the UAE and the UK.",
  },
  {
    q: "How do I get started?",
    a: "Send a short note through the contact page, or email ajay.rajnikanth@gmail.com, with the one task that costs your team the most hours. You will get a reply from Ajay directly.",
  },
];

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/insights/", label: "Insights" },
  { href: "/about/", label: "About" },
];

// Categories for the insights collection, in display order.
export const insightCategories = ["Strategy", "Productivity", "Automation", "Industries"] as const;

// The Coimbatore page and its markdown twin.
export const coimbatore = {
  description:
    "buildIntersect is an AI consulting company in Coimbatore, Tamil Nadu. We help manufacturers, distributors and retailers across Coimbatore, Tiruppur, Erode and South India automate repetitive work and get clear numbers with AI.",
  intro: [
    "buildIntersect is based in Coimbatore. We work on site with businesses across Coimbatore, Tiruppur, Erode, Salem and the rest of Tamil Nadu, travel to Chennai and Bengaluru, and work remotely with clients elsewhere in India, the UAE and the UK.",
    "The region runs on mid-size, owner-led companies: pump and motor makers, textile and garment exporters, foundries and engineering firms, distributors and retail chains. Most run on Tally or an older ERP, a lot of Excel, and WhatsApp. That is exactly the setup we build for, because it is the setup our own businesses run on.",
  ],
  offers: [
    { name: "AI readiness assessment", body: "Half a day on site, a costed plan, and no fee for the first one.", href: "/services/#ai-readiness-assessment" },
    { name: "AI automation", body: "WhatsApp enquiries, Tally and ERP data entry, export paperwork and collections alerts.", href: "/services/#ai-automation" },
    { name: "AI reporting", body: "Sales, production and finance numbers you can drill into and question in plain language.", href: "/services/#ai-reporting" },
    { name: "Advisory for owners", body: "For founders and the next generation taking over a family business, deciding where AI fits.", href: "/services/#ai-advisory" },
  ],
};
