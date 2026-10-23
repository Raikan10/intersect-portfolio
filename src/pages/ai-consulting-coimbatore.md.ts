import type { APIRoute } from "astro";
import { coimbatoreMd, mdResponse } from "../lib/markdown";

export const GET: APIRoute = () => mdResponse(coimbatoreMd());
