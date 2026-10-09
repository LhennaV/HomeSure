import { getAuth } from "./supabase/server-client";

// Server-side guards for Server Components / actions (the API routes use guardApi in ./api).
// getUser() asks the Auth server to validate the token; getSession() alone only reads the cookie.

export async function requireAuth() {
  const { user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const { supabase, user } = await getAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !allowedRoles.includes(profile.role)) {
    throw new Error("Forbidden");
  }

  return { user, profile };
}
