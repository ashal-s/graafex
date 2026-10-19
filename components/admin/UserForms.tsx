"use client";

import { useActionState } from "react";
import {
  deleteUserAction,
  resetPasswordAction,
  updateUserAction,
} from "@/app/admin/users/actions";

export function EditUserForm({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const [state, action, pending] = useActionState(updateUserAction, null);
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="id" value={id} />
      <label className="flex flex-col gap-1 text-sm text-body">
        Name
        <input
          name="name"
          defaultValue={name}
          required
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-body">
        Email
        <input
          name="email"
          type="email"
          defaultValue={email}
          required
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      {state?.error && <p className="text-sm text-accent">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="justify-self-start rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save details"}
      </button>
    </form>
  );
}

export function ResetPasswordForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, null);
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="id" value={id} />
      <label className="flex flex-col gap-1 text-sm text-body">
        New password
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
        disabled={pending}
        className="justify-self-start rounded border border-line px-4 py-2 text-sm font-semibold text-heading disabled:opacity-60"
      >
        {pending ? "Updating…" : "Reset password"}
      </button>
    </form>
  );
}

export function DeleteUserForm({ id }: { id: string }) {
  return (
    <form action={deleteUserAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded border border-accent px-4 py-2 text-sm font-semibold text-accent"
      >
        Delete user
      </button>
    </form>
  );
}
