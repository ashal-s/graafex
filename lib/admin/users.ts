import { auth } from "@/lib/auth/server";

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  role?: string | string[] | null;
  createdAt?: Date | string | null;
  banned?: boolean | null;
};

function asUser(raw: unknown): PortalUser | null {
  if (!raw || typeof raw !== "object") return null;
  const u = raw as Record<string, unknown>;
  if (typeof u.id !== "string" || typeof u.email !== "string") return null;
  return {
    id: u.id,
    name: typeof u.name === "string" ? u.name : "",
    email: u.email,
    role: (u.role as string | string[] | null | undefined) ?? null,
    createdAt: (u.createdAt as Date | string | null | undefined) ?? null,
    banned: typeof u.banned === "boolean" ? u.banned : null,
  };
}

export async function listPortalUsers(): Promise<PortalUser[]> {
  const { data, error } = await auth.admin.listUsers({
    query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
  });
  if (error) {
    console.error("[admin] listUsers", error);
    throw new Error(error.message || "Failed to list users");
  }
  const users = (data as { users?: unknown[] } | null)?.users ?? [];
  return users.map(asUser).filter(Boolean) as PortalUser[];
}

export async function getPortalUser(userId: string): Promise<PortalUser | null> {
  const users = await listPortalUsers();
  return users.find((u) => u.id === userId) ?? null;
}

export async function createPortalUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const { data, error } = await auth.admin.createUser({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    role: "admin",
  });
  if (error) throw new Error(error.message || "Failed to create user");
  return asUser((data as { user?: unknown } | null)?.user ?? data);
}

export async function updatePortalUser(
  userId: string,
  input: { name: string; email: string },
) {
  const { data, error } = await auth.admin.updateUser({
    userId,
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    },
  });
  if (error) throw new Error(error.message || "Failed to update user");
  return asUser((data as { user?: unknown } | null)?.user ?? data);
}

export async function resetPortalUserPassword(userId: string, newPassword: string) {
  const { error } = await auth.admin.setUserPassword({
    userId,
    newPassword,
  });
  if (error) throw new Error(error.message || "Failed to reset password");
}

export async function deletePortalUser(userId: string) {
  const { error } = await auth.admin.removeUser({ userId });
  if (error) throw new Error(error.message || "Failed to delete user");
}
