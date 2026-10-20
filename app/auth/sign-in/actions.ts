"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export async function signInWithEmail(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  try {
    await auth.api.signInEmail({
      body: {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
      headers: await headers(),
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Failed to sign in. Try again.";
    return { error: message };
  }

  redirect("/admin");
}
