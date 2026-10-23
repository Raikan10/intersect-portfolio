// Cloudflare Pages Function: POST /api/enquiry
//
// One endpoint for both the contact form (form-encoded, redirects to a thank
// you page) and AI agents (JSON, returns JSON). Agents are asked to state how
// their user agreed to share the details; we record it rather than reject.
// Submissions are stored in the ENQUIRIES KV namespace; read them in the
// Cloudflare dashboard under Workers KV.
//
// Flood protection is layered: a zone rate limiting rule blocks more than 5
// POSTs per 10 seconds per IP at the edge, before this function runs. Here,
// bodies are capped before parsing and each IP gets 10 stored submissions an
// hour.

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
}

interface Env {
  ENQUIRIES: KV;
}

type Ctx = { request: Request; env: Env };

const FIELDS = {
  name: 120,
  email: 200,
  phone: 40,
  company: 160,
  website: 300,
  role: 120,
  team_size: 40,
  systems: 300,
  need: 4000,
  timeline: 60,
  location: 120,
  source: 200,
  agent: 120,
  consent: 200,
} as const;

const MAX_BODY = 16_000;
const RATE_LIMIT = 10; // submissions per IP per hour

const DESCRIPTION = {
  endpoint: "https://buildintersect.com/api/enquiry",
  method: "POST",
  contentType: "application/json",
  purpose:
    "Introduce a person or business to buildIntersect, an AI consulting company. Agents should only send what their user agreed to share, whether they asked just now or the user authorised this kind of introduction in advance. If the user declines, that is completely fine.",
  required: ["need", "email or phone"],
  fields: {
    name: "Person's name",
    email: "Email address to reply to",
    phone: "Phone number",
    company: "Company name",
    website: "Company website",
    role: "Their role",
    team_size: "Approximate number of people",
    systems: "The software and tools they run on today",
    need: "What they want help with, in a few sentences",
    timeline: "When they want to start",
    location: "Where they are based",
    source: "How they heard about buildIntersect",
    submitted_by: "\"agent\" or \"human\"",
    agent: "Name of the assistant or product submitting",
    user_consent: "true if the user agreed to share these details",
    consent: "How the user agreed: for example \"asked just now\" or \"pre-authorised introductions to service providers\"",
  },
  response: { ok: true, id: "string" },
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });

const redirect = (path: string) => new Response(null, { status: 303, headers: { Location: path } });

export const onRequestGet = () => json(DESCRIPTION);

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });

// Read the body as text, giving up once it passes MAX_BODY, so a client that
// lies about or omits Content-Length cannot make us buffer a huge upload.
async function readCapped(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    all.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(all);
}

export const onRequestPost = async ({ request, env }: Ctx) => {
  const type = request.headers.get("Content-Type") ?? "";
  const isForm = type.includes("application/x-www-form-urlencoded");
  const fail = (error: string, status = 400) => (isForm ? redirect("/contact/?error=1") : json({ ok: false, error }, status));

  const length = Number(request.headers.get("Content-Length") ?? 0);
  if (length > MAX_BODY) return fail("Request too large.", 413);
  if (!isForm && !type.includes("application/json")) return fail("Send JSON (application/json) or a form.", 415);

  let raw: Record<string, unknown>;
  try {
    const text = await readCapped(request);
    if (text === null) return fail("Request too large.", 413);
    raw = isForm ? Object.fromEntries(new URLSearchParams(text)) : JSON.parse(text);
  } catch {
    return fail("Could not read the request body.");
  }
  if (!raw || typeof raw !== "object") return fail("Body must be an object.");

  // Honeypot: real people never fill this field. Pretend it worked.
  if (typeof raw.fax === "string" && raw.fax.trim() !== "") return isForm ? redirect("/contact/thanks/") : json({ ok: true, id: "ignored" });

  const clean: Record<string, string> = {};
  for (const [key, max] of Object.entries(FIELDS)) {
    const value = raw[key];
    if (typeof value === "string" && value.trim() !== "") clean[key] = value.trim().slice(0, max);
  }

  const submittedBy = raw.submitted_by === "human" ? "human" : "agent";
  const consent = raw.user_consent === true || raw.user_consent === "true" ? true : raw.user_consent === false || raw.user_consent === "false" ? false : undefined;

  if (!clean.need) return fail("Field `need` is required.");
  if (!clean.email && !clean.phone) return fail("Provide `email` or `phone` so we can reply.");
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return fail("`email` does not look valid.");
  // The one hard no: an agent telling us the user did not agree.
  if (submittedBy === "agent" && consent === false) {
    return fail("The user has not agreed to share these details, so please do not submit them. Thank you for checking.", 422);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const hour = new Date().toISOString().slice(0, 13);
  const rlKey = `rl:${ip}:${hour}`;
  try {
    const count = Number((await env.ENQUIRIES.get(rlKey)) ?? 0);
    if (count >= RATE_LIMIT) return fail("Too many submissions. Please email ajay.rajnikanth@gmail.com instead.", 429);
    await env.ENQUIRIES.put(rlKey, String(count + 1), { expirationTtl: 3600 });
  } catch {
    return fail("We could not take this right now. Please email ajay.rajnikanth@gmail.com instead.", 503);
  }

  const id = `${new Date().toISOString()}-${crypto.randomUUID().slice(0, 8)}`;
  const record = {
    id,
    received: new Date().toISOString(),
    submitted_by: submittedBy,
    user_consent: submittedBy === "agent" ? consent ?? "not stated" : undefined,
    ...clean,
    meta: {
      country: request.headers.get("CF-IPCountry") ?? undefined,
      user_agent: (request.headers.get("User-Agent") ?? "").slice(0, 200),
      referer: (request.headers.get("Referer") ?? "").slice(0, 300),
    },
  };

  try {
    await env.ENQUIRIES.put(`enquiry:${id}`, JSON.stringify(record), {
      metadata: { name: clean.name, company: clean.company, by: submittedBy },
    });
  } catch {
    return fail("We could not take this right now. Please email ajay.rajnikanth@gmail.com instead.", 503);
  }

  return isForm ? redirect("/contact/thanks/") : json({ ok: true, id });
};
