import { headers } from "next/headers";
import { auth, ensureAuthDb } from "@/lib/auth/server";

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

async function sessionHeaders() {
  await ensureAuthDb();
  return await headers();
}

export async function listPortalUsers(): Promise<PortalUser[]> {
  const data = await auth.api.listUsers({
    query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
    headers: await sessionHeaders(),
  });
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
  const data = await auth.api.createUser({
    body: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      role: "admin",
    },
    headers: await sessionHeaders(),
  });
  return asUser((data as { user?: unknown } | null)?.user ?? data);
}

export async function updatePortalUser(
  userId: string,
  input: { name: string; email: string },
) {
  const data = await auth.api.adminUpdateUser({
    body: {
      userId,
      data: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
      },
    },
    headers: await sessionHeaders(),
  });
  return asUser((data as { user?: unknown } | null)?.user ?? data);
}

export async function resetPortalUserPassword(userId: string, newPassword: string) {
  await auth.api.setUserPassword({
    body: {
      userId,
      newPassword,
    },
    headers: await sessionHeaders(),
  });
}

export async function deletePortalUser(userId: string) {
  await auth.api.removeUser({
    body: { userId },
    headers: await sessionHeaders(),
  });
}
