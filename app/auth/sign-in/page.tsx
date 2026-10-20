"use client";

import { useActionState } from "react";
import { signInWithEmail } from "./actions";

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <main className="admin-shell flex min-h-screen items-center justify-center px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-[calc(var(--radius-main)-0.25rem)] border border-line bg-[color-mix(in_srgb,var(--bg-2)_90%,black)] p-6 shadow-[0_24px_60px_rgb(0_0_0_/0.4),inset_0_1px_0_rgb(255_245_237_/0.04)] sm:p-7"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Graafex
        </p>
        <h1 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em] text-heading">
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Accounts are created by an existing admin in the portal.
        </p>
        <div className="mt-6 grid gap-4">
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-body">
            Email
            <input
              name="email"
              type="email"
              required
              className="rounded-[var(--radius-small)] border border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-3.5 py-2.5 text-sm text-heading outline-none transition-[border-color,box-shadow] focus:border-accent/50 focus:shadow-[0_0_0_3px_rgb(255_77_0_/0.12)]"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-body">
            Password
            <input
              name="password"
              type="password"
              required
              className="rounded-[var(--radius-small)] border border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-3.5 py-2.5 text-sm text-heading outline-none transition-[border-color,box-shadow] focus:border-accent/50 focus:shadow-[0_0_0_3px_rgb(255_77_0_/0.12)]"
            />
          </label>
          {state?.error ? (
            <p className="rounded-[var(--radius-small)] border border-accent/40 bg-[rgb(255_77_0_/0.1)] px-3.5 py-2.5 text-sm text-accent">
              {state.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="mt-1 inline-flex h-10 items-center justify-center rounded-full border border-accent/30 bg-accent px-5 text-sm font-semibold tracking-[-0.01em] text-[#1a0c06] shadow-[0_8px_20px_rgb(255_77_0_/0.25)] transition-all duration-200 hover:brightness-110 disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}
