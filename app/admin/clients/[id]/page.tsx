import { notFound, redirect } from "next/navigation";
import { deleteClientLogo } from "@/app/admin/actions";
import ClientLogoForm from "@/components/admin/ClientLogoForm";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconTrash } from "@/components/admin/icons";
import { AdminPageHeader } from "@/components/admin/ui";
import { getClientLogoById } from "@/lib/data/client-logos";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function EditClientLogoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");

  const { id } = await params;
  const logo = await getClientLogoById(id);
  if (!logo) notFound();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Edit client"
        description={logo.name}
        actions={
          <>
            <IconLink href="/admin/clients" label="Back">
              <IconBack />
            </IconLink>
            <form action={deleteClientLogo}>
              <input type="hidden" name="id" value={logo.id} />
              <IconButton type="submit" label="Delete" variant="danger">
                <IconTrash />
              </IconButton>
            </form>
          </>
        }
      />
      <ClientLogoForm
        id={logo.id}
        saveToken={mintSaveToken(user.email)}
        defaults={{
          name: logo.name,
          image: logo.image ?? "",
          sortOrder: logo.sortOrder,
          published: logo.published,
        }}
      />
    </div>
  );
}
