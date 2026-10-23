import type { APIRoute } from "astro";
import { insightsIndexMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = async () => mdResponse(await insightsIndexMd());
