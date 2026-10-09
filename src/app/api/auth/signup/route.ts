import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server-client";

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

// Public endpoint: signing up must not require an existing session.
// The front end signs up with supabase-js directly; this route is for server-side callers.
export async function POST(request: Request) {
  const supabase = await getServerSupabase();

  const body = await request.json().catch(() => null);
  const { email, password, fullName, firstName, lastName, phone, role } = body ?? {};

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // Only buyer/seller can be self-selected. Elevated roles are granted by an admin.
  const safeRole = role === "seller" ? "seller" : "buyer";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName ?? [firstName, lastName].filter(Boolean).join(" "),
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        role: safeRole,
      },
    },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ user: data.user }, { status: 200 });
}
