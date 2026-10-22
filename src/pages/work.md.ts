import type { APIRoute } from "astro";
import { workIndexMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = async () => mdResponse(await workIndexMd());
