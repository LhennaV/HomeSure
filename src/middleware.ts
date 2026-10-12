import { NextResponse, type NextRequest } from "next/server";

// Origins of the front end that may call /api/*. With one server — the normal setup — the pages and
// the API share an origin and this never comes into play. Override with FRONTEND_ORIGINS
// (comma separated) only when the front end is hosted somewhere else.
const DEFAULT_FRONTEND_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:8080",
  "http://localhost:5173",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = process.env.FRONTEND_ORIGINS
    ? process.env.FRONTEND_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
    : DEFAULT_FRONTEND_ORIGINS;

  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

/**
 * The only job left here is CORS for the API.
 *
 * Routes authenticate themselves — guardApi() verifies the Bearer token the front end sends — and
 * answer 401 as JSON. They must never be redirected to an HTML login page, which is what a fetch()
 * caller would choke on.
 */
export function middleware(request: NextRequest) {
  const cors = corsHeaders(request.headers.get("origin"));

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: cors });
  }

  const response = NextResponse.next();
  Object.entries(cors).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}

export const config = {
  // Only the API needs this. The front end in public/ is served straight from disk, so no page or
  // asset request pays for middleware.
  matcher: ["/api/:path*"],
};
