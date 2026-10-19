"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpWithEmail } from "./actions";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="t-h3 font-semibold text-heading">Create admin account</h1>
        <p className="text-sm text-body">
          One-time setup. Prefer setting <code className="text-heading">ADMIN_EMAIL_ALLOWLIST</code> in env.
        </p>
        <label className="flex flex-col gap-1 text-sm text-body">
          Name
          <input
            name="name"
            type="text"
            required
            className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 text-heading outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-body">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 text-heading outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-body">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 text-heading outline-none focus:border-accent"
          />
        </label>
        {state?.error && <p className="text-sm text-accent">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-[var(--radius-small)] bg-accent px-4 py-2 text-sm font-semibold text-bg-2 disabled:opacity-60"
        >
          {isPending ? "Creating…" : "Create account"}
        </button>
        <Link href="/auth/sign-in" className="text-sm text-body underline">
          Already have an account? Sign in
        </Link>
      </form>
    </main>
  );
}
