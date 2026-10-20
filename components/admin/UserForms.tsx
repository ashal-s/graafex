"use client";

import { useActionState } from "react";
import {
  deleteUserAction,
  resetPasswordAction,
  updateUserAction,
} from "@/app/admin/users/actions";
import { LabelButton } from "@/components/admin/IconButton";
import { IconSave, IconTrash } from "@/components/admin/icons";
import { AdminNotice, adminFieldClass, adminLabelClass } from "@/components/admin/ui";

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
      <label className={adminLabelClass}>
        Name
        <input name="name" defaultValue={name} required className={adminFieldClass} />
      </label>
      <label className={adminLabelClass}>
        Email
        <input
          name="email"
          type="email"
          defaultValue={email}
          required
          className={adminFieldClass}
        />
      </label>
      {state?.error ? <AdminNotice tone="error">{state.error}</AdminNotice> : null}
      <div>
        <LabelButton
          type="submit"
          disabled={pending}
          label={pending ? "Saving…" : "Save details"}
          variant="accent"
        >
          <IconSave />
        </LabelButton>
      </div>
    </form>
  );
}

export function ResetPasswordForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, null);
  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="id" value={id} />
      <label className={adminLabelClass}>
        New password
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className={adminFieldClass}
        />
      </label>
      {state?.error ? <AdminNotice tone="error">{state.error}</AdminNotice> : null}
      <div>
        <LabelButton
          type="submit"
          disabled={pending}
          label={pending ? "Updating…" : "Reset password"}
          variant="ghost"
        >
          <IconSave />
        </LabelButton>
      </div>
    </form>
  );
}

export function DeleteUserForm({ id }: { id: string }) {
  return (
    <form action={deleteUserAction}>
      <input type="hidden" name="id" value={id} />
      <LabelButton type="submit" label="Delete user" variant="danger">
        <IconTrash />
      </LabelButton>
    </form>
  );
}
