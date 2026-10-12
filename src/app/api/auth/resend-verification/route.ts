import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/admin-client";
import { sendMail, verificationEmail, appOrigin, isEmailConfigured } from "@/lib/email";
import { issueToken, cooldownRemaining } from "@/lib/verification";

/**
 * Send the confirmation link again.
 *
 * The answer is the same whether or not the address has an account waiting. Saying "no such
 * account" here would turn this route into a way to find out who is registered, and the person who
 * really did sign up learns nothing extra from the vaguer wording — the mail either arrives or it
 * does not.
 */
export async function POST(request: Request) {
  const ok = NextResponse.json(
    { ok: true, message: "If that address is waiting to be confirmed, the link is on its way." },
    { status: 200 },
  );

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "This server cannot send email yet." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const admin = getAdminSupabase();

  // There is no "get user by email" in the admin API, so find the profile first.
  const { data: profile } = await admin
    .from("profiles")
    .select("id, first_name")
    .eq("email", email)
    .maybeSingle();

  if (!profile) return ok;

  const { data: existing } = await admin.auth.admin.getUserById(profile.id);
  if (!existing?.user || existing.user.email_confirmed_at) return ok;

  const wait = await cooldownRemaining(profile.id);
  if (wait > 0) {
    return NextResponse.json(
      { error: `Please wait ${wait} more second${wait === 1 ? "" : "s"} before asking again.`, retryAfter: wait },
      { status: 429 },
    );
  }

  try {
    const token = await issueToken(profile.id, email);
    const link = `${appOrigin(request)}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
    await sendMail({ to: email, ...verificationEmail({ firstName: profile.first_name ?? "", link }) });
  } catch (err) {
    console.error("Could not resend the confirmation email:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "We could not send that email. Please try again shortly." }, { status: 502 });
  }

  return ok;
}
