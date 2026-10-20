import { notFound } from "next/navigation";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import {
  DeleteUserForm,
  EditUserForm,
  ResetPasswordForm,
} from "@/components/admin/UserForms";
import { getPortalUser } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  let user;
  try {
    user = await getPortalUser(id);
  } catch {
    user = null;
  }
  if (!user) notFound();

  return (
    <div className="grid max-w-md gap-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">{user.name || "User"}</h1>
          <p className="mt-1 text-sm text-body">{user.email}</p>
        </div>
        <IconLink href="/admin/users" label="Back">
          <IconBack />
        </IconLink>
      </div>

      {sp.saved && <p className="text-sm text-accent">Details saved.</p>}
      {sp.password && <p className="text-sm text-accent">Password updated.</p>}
      {sp.error === "self" && (
        <p className="text-sm text-accent">You can’t delete your own account.</p>
      )}
      {sp.error === "delete" && (
        <p className="text-sm text-accent">Could not delete this user.</p>
      )}

      <section className="grid gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
          Details
        </h2>
        <EditUserForm id={user.id} name={user.name} email={user.email} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
          Reset password
        </h2>
        <ResetPasswordForm id={user.id} />
      </section>

      <section className="grid gap-3 border-t border-line pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
          Danger zone
        </h2>
        <DeleteUserForm id={user.id} />
      </section>
    </div>
  );
}
