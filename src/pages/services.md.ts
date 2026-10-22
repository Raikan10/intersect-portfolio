import type { APIRoute } from "astro";
import { servicesPageMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = () => mdResponse(servicesPageMd());
