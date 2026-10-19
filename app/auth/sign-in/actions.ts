"use server";

import { auth } from "@/lib/auth/server";
import { resolveAdminAccess } from "@/lib/admin/members";
import { redirect } from "next/navigation";

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "");
  const { error } = await auth.signIn.email({
    email,
    password: String(formData.get("password") ?? ""),
  });

  if (error) {
    return { error: error.message || "Failed to sign in. Try again." };
  }

  const status = await resolveAdminAccess(email);
  if (status === "pending") redirect("/auth/pending");
  if (status === "rejected") {
    return { error: "Your admin access was declined. Contact an existing admin." };
  }
  redirect("/admin");
}
