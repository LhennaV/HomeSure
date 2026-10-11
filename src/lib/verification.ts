import { createHash, randomBytes } from "node:crypto";
import { getAdminSupabase } from "./supabase/admin-client";

/** How long a confirmation link stays usable. */
export const TOKEN_TTL_HOURS = 24;

/** How long before the same address may ask for another mail. */
export const RESEND_COOLDOWN_SECONDS = 60;

/**
 * A new confirmation token. The caller puts `token` in the emailed link; only `hash` is stored, so
 * reading the table later does not hand anybody a working link.
 */
export function newToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString("base64url");
  return { token, hash: hashToken(token) };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Store a token for this user and return it. Any token issued earlier is spent first, so the most
 * recent email is the only one that works.
 */
export async function issueToken(userId: string, email: string): Promise<string> {
  const admin = getAdminSupabase();
  const { token, hash } = newToken();

  await admin
    .from("email_verifications")
    .update({ used_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("used_at", null);

  const { error } = await admin.from("email_verifications").insert({
    user_id: userId,
    email,
    token_hash: hash,
    expires_at: new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString(),
  });

  if (error) throw new Error(`Could not store the confirmation token: ${error.message}`);
  return token;
}

/** Seconds still to wait before this user may request another mail, or 0. */
export async function cooldownRemaining(userId: string): Promise<number> {
  const { data } = await getAdminSupabase()
    .from("email_verifications")
    .select("sent_at")
    .eq("user_id", userId)
    .order("sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data?.sent_at) return 0;
  const elapsed = (Date.now() - new Date(data.sent_at).getTime()) / 1000;
  return Math.max(0, Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed));
}
