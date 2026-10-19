"use server";

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

function allowedEmail(email: string) {
  const allow = process.env.ADMIN_EMAIL_ALLOWLIST?.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!allow || allow.length === 0) return true;
  return allow.includes(email.trim().toLowerCase());
}

export async function signUpWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "");
  if (!allowedEmail(email)) {
    return { error: "This email is not allowed to create an admin account." };
  }

  const { error } = await auth.signUp.email({
    email,
    name: String(formData.get("name") ?? "Admin"),
    password: String(formData.get("password") ?? ""),
  });

  if (error) {
    return { error: error.message || "Failed to create account." };
  }

  redirect("/admin");
}
