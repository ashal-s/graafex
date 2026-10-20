import { notFound } from "next/navigation";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import {
  DeleteUserForm,
  EditUserForm,
  ResetPasswordForm,
} from "@/components/admin/UserForms";
import { AdminNotice, AdminPageHeader, AdminSection } from "@/components/admin/ui";
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
    <div className="grid max-w-lg gap-6">
      <AdminPageHeader
        title={user.name || "User"}
        description={user.email}
        actions={
          <IconLink href="/admin/users" label="Back">
            <IconBack />
          </IconLink>
        }
      />

      {sp.saved ? <AdminNotice tone="success">Details saved.</AdminNotice> : null}
      {sp.password ? <AdminNotice tone="success">Password updated.</AdminNotice> : null}
      {sp.error === "self" ? (
        <AdminNotice tone="error">You can’t delete your own account.</AdminNotice>
      ) : null}
      {sp.error === "delete" ? (
        <AdminNotice tone="error">Could not delete this user.</AdminNotice>
      ) : null}

      <AdminSection title="Details" description="Name and email used for portal sign-in.">
        <EditUserForm id={user.id} name={user.name} email={user.email} />
      </AdminSection>

      <AdminSection title="Reset password" description="Set a new password for this account.">
        <ResetPasswordForm id={user.id} />
      </AdminSection>

      <AdminSection
        title="Danger zone"
        description="Permanently remove this portal account."
        tone="danger"
      >
        <DeleteUserForm id={user.id} />
      </AdminSection>
    </div>
  );
}
