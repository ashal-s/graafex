import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  NEON_AUTH_COOKIE_PREFIX,
  NEON_AUTH_SESSION_DATA_COOKIE_NAME,
  validateSessionData,
} from "@neondatabase/auth/server";
import { auth } from "@/lib/auth/server";

export type AuthUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: string | string[] | null;
};

function extractUser(data: unknown): AuthUser | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (d.user && typeof d.user === "object") return d.user as AuthUser;
  if (d.session && typeof d.session === "object") {
    const s = d.session as Record<string, unknown>;
    if (s.user && typeof s.user === "object") return s.user as AuthUser;
  }
  if (typeof d.email === "string") return d as AuthUser;
  return null;
}

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

async function userFromSessionDataCookie(): Promise<AuthUser | null> {
  const store = await cookies();
  const sessionData = store.get(NEON_AUTH_SESSION_DATA_COOKIE_NAME)?.value;
  if (!sessionData || !process.env.NEON_AUTH_COOKIE_SECRET) return null;
  const result = await validateSessionData(sessionData, process.env.NEON_AUTH_COOKIE_SECRET);
  if (!result.valid || !result.payload) return null;
  return extractUser(result.payload);
}

/** Fresh session lookup — do not wrap in React cache. */
export async function getSessionUser() {
  const cached = await userFromSessionDataCookie();
  if (cached?.email) return cached;

  const store = await cookies();
  const cookieHeader = store
    .getAll()
    .filter((c) => c.name.startsWith(NEON_AUTH_COOKIE_PREFIX))
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (cookieHeader.includes("session_token") && process.env.NEON_AUTH_BASE_URL) {
    try {
      const res = await fetch(
        `${process.env.NEON_AUTH_BASE_URL.replace(/\/$/, "")}/get-session`,
        {
          method: "GET",
          headers: { Cookie: cookieHeader },
          cache: "no-store",
        },
      );
      if (res.ok) {
        const user = extractUser(await res.json());
        if (user?.email) return user;
      }
    } catch (err) {
      console.error("[admin] get-session failed", err);
    }
  }

  const result = await auth.getSession();
  const user = extractUser(result.data);
  if (!user?.email && result.error) {
    console.error("[admin] getSession error", result.error);
  }
  return user?.email ? user : null;
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
