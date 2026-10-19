"use client";

import { useActionState } from "react";
import { signInWithEmail } from "./actions";

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="t-h3 font-semibold text-heading">Admin sign in</h1>
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
            className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 text-heading outline-none focus:border-accent"
          />
        </label>
        {state?.error && <p className="text-sm text-accent">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-[var(--radius-small)] bg-accent px-4 py-2 text-sm font-semibold text-bg-2 disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
