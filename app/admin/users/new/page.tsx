"use client";

import { useActionState } from "react";
import { createUserAction } from "@/app/admin/users/actions";
import { IconLink, LabelButton } from "@/components/admin/IconButton";
import { IconBack, IconPlus } from "@/components/admin/icons";
import {
  AdminNotice,
  AdminPageHeader,
  AdminPanel,
  adminFieldClass,
  adminLabelClass,
} from "@/components/admin/ui";

export default function NewUserPage() {
  const [state, formAction, isPending] = useActionState(createUserAction, null);

  return (
    <div className="grid max-w-lg gap-8">
      <AdminPageHeader
        title="Add user"
        description="Create an admin portal login for a teammate."
        actions={
          <IconLink href="/admin/users" label="Back">
            <IconBack />
          </IconLink>
        }
      />

      <AdminPanel className="p-5">
        <form action={formAction} className="grid gap-4">
          <label className={adminLabelClass}>
            Name
            <input name="name" required className={adminFieldClass} />
          </label>
          <label className={adminLabelClass}>
            Email
            <input name="email" type="email" required className={adminFieldClass} />
          </label>
          <label className={adminLabelClass}>
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className={adminFieldClass}
            />
          </label>
          {state?.error ? <AdminNotice tone="error">{state.error}</AdminNotice> : null}
          <div className="pt-1">
            <LabelButton
              type="submit"
              disabled={isPending}
              label={isPending ? "Creating…" : "Create user"}
              variant="accent"
            >
              <IconPlus />
            </LabelButton>
          </div>
        </form>
      </AdminPanel>
    </div>
  );
}
