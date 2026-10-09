import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const supabase = await getServerSupabase();
  const code = new URL(request.url).searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=no_code", request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/auth/login?error=exchange_failed", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
