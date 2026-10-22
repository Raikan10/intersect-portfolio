import type { APIRoute } from "astro";
import { homeMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = async () => mdResponse(await homeMd());
