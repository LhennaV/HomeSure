import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Origins of the static front end that may call /api/*. Override with FRONTEND_ORIGINS (comma separated).
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes authenticate themselves (Bearer token from the static front end, or cookies from the
  // Next dashboard) and answer 401 JSON. They must never be redirected to an HTML login page.
  if (pathname.startsWith("/api/")) {
    const cors = corsHeaders(request.headers.get("origin"));
    if (request.method === "OPTIONS") return new NextResponse(null, { status: 204, headers: cors });

    const response = NextResponse.next();
    Object.entries(cors).forEach(([key, value]) => response.headers.set(key, value));
    return response;
  }

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");
  if (!isProtected && !isAuthPage) return NextResponse.next();

  // Cookie session for the Next dashboard (standard @supabase/ssr middleware pattern).
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
