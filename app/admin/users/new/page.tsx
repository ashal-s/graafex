"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createUserAction } from "@/app/admin/users/actions";

export default function NewUserPage() {
  const [state, formAction, isPending] = useActionState(createUserAction, null);

  return (
    <div className="grid max-w-md gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Add user</h1>
          <p className="mt-1 text-sm text-body">Create an admin portal login.</p>
        </div>
        <Link href="/admin/users" className="text-sm underline">
          Back
        </Link>
      </div>

      <form action={formAction} className="grid gap-4">
        <label className="flex flex-col gap-1 text-sm text-body">
          Name
          <input
            name="name"
            required
            className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-body">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-body">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
          />
        </label>
        {state?.error && <p className="text-sm text-accent">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2 disabled:opacity-60"
        >
          {isPending ? "Creating…" : "Create user"}
        </button>
      </form>
    </div>
  );
}
