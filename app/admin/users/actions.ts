"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/session";
import {
  createPortalUser,
  deletePortalUser,
  resetPortalUserPassword,
  updatePortalUser,
} from "@/lib/admin/users";

function isRedirectError(e: unknown) {
  return (
    typeof e === "object" &&
    e !== null &&
    "digest" in e &&
    typeof (e as { digest?: unknown }).digest === "string" &&
    String((e as { digest: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

export async function createUserAction(
  _prev: { error: string } | null,
  formData: FormData,
) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || password.length < 8) {
    return { error: "Name, email, and a password of at least 8 characters are required." };
  }
  try {
    const user = await createPortalUser({ name, email, password });
    if (!user) return { error: "User created but could not load profile." };
    redirect(`/admin/users/${user.id}`);
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { error: e instanceof Error ? e.message : "Failed to create user" };
  }
}

export async function updateUserAction(
  _prev: { error: string } | null,
  formData: FormData,
) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!id || !name || !email) return { error: "Name and email are required." };
  try {
    await updatePortalUser(id, { name, email });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update user" };
  }
  redirect(`/admin/users/${id}?saved=1`);
}

export async function resetPasswordAction(
  _prev: { error: string } | null,
  formData: FormData,
) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!id || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  try {
    await resetPortalUserPassword(id, password);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to reset password" };
  }
  redirect(`/admin/users/${id}?password=1`);
}

export async function deleteUserAction(formData: FormData) {
  const { user } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  if (user.id && user.id === id) {
    redirect(`/admin/users/${id}?error=self`);
  }
  try {
    await deletePortalUser(id);
  } catch (e) {
    console.error("[admin] delete user", e);
    redirect(`/admin/users/${id}?error=delete`);
  }
  redirect("/admin/users");
}
