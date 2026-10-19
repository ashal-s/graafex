import { cache } from "react";
import { auth } from "@/lib/auth/server";
import { resolveAdminAccess, type AdminStatus } from "@/lib/admin/members";

/** One session lookup per request (layout + nested calls share this). */
export const getSessionUser = cache(async () => {
  const { data: session } = await auth.getSession();
  return session?.user ?? null;
});

/** Authenticated + approved for the CMS. */
export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user?.email) throw new Error("Unauthorized");

  const status = await resolveAdminAccess(user.email, user.name);
  if (status !== "approved") throw new Error("Unauthorized");

  return { user, status };
}

export const getAdminGate = cache(async (): Promise<
  | { kind: "anonymous" }
  | { kind: "pending"; email: string }
  | { kind: "rejected"; email: string }
  | { kind: "approved"; email: string; name?: string | null }
> => {
  const user = await getSessionUser();
  if (!user?.email) return { kind: "anonymous" };

  const status: AdminStatus = await resolveAdminAccess(user.email, user.name);
  if (status === "pending") return { kind: "pending", email: user.email };
  if (status === "rejected") return { kind: "rejected", email: user.email };
  return { kind: "approved", email: user.email, name: user.name };
});
