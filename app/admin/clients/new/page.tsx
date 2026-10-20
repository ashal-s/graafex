import { redirect } from "next/navigation";
import ClientLogoForm from "@/components/admin/ClientLogoForm";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import { AdminPageHeader } from "@/components/admin/ui";
import { listAllClientLogos } from "@/lib/data/client-logos";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function NewClientLogoPage() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");
  const logos = await listAllClientLogos();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Add client"
        description="Upload a logo for the portfolio Clients grid."
        actions={
          <IconLink href="/admin/clients" label="Back">
            <IconBack />
          </IconLink>
        }
      />
      <ClientLogoForm
        defaultSortOrder={logos.length}
        saveToken={mintSaveToken(user.email)}
      />
    </div>
  );
}
