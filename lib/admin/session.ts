import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, ensureAuthDb } from "@/lib/auth/server";

export type AuthUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: string | string[] | null;
};

function hasAdminRole(user: AuthUser) {
  const role = user.role;
  if (role === "admin") return true;
  if (Array.isArray(role) && role.includes("admin")) return true;
  const allow = process.env.ADMIN_EMAIL_ALLOWLIST?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allow?.length && user.email && allow.includes(user.email.trim().toLowerCase())) {
    return true;
  }
  // Portal is invite-only (no public sign-up). Any signed-in user may use it.
  return true;
}

/** Fresh session lookup — do not wrap in React cache. */
export async function getSessionUser(): Promise<AuthUser | null> {
  await ensureAuthDb();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.email) return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: (session.user as { role?: string | string[] | null }).role ?? null,
  };
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");
  if (!hasAdminRole(user)) redirect("/auth/sign-in");
  return { user };
}

export async function getAdminGate(): Promise<
  | { kind: "anonymous" }
  | { kind: "approved"; email: string; name?: string | null; id?: string }
> {
  const user = await getSessionUser();
  if (!user?.email || !hasAdminRole(user)) return { kind: "anonymous" };
  return { kind: "approved", email: user.email, name: user.name, id: user.id };
}
