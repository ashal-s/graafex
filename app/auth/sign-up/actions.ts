"use server";

import { auth } from "@/lib/auth/server";
import { registerAdminRequest } from "@/lib/admin/members";
import { redirect } from "next/navigation";

export async function signUpWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "");
  const name = String(formData.get("name") ?? "Admin");

  const { error } = await auth.signUp.email({
    email,
    name,
    password: String(formData.get("password") ?? ""),
  });

  if (error) {
    return { error: error.message || "Failed to create account." };
  }

  const status = await registerAdminRequest(email, name);
  redirect(status === "approved" ? "/admin" : "/auth/pending");
}
