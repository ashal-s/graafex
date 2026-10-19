import { auth } from "@/lib/auth/server";

export async function requireAdmin() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
