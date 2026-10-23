import type { APIRoute } from "astro";
import { contactPageMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = () => mdResponse(contactPageMd());
