import { redirect } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import { AdminPageHeader } from "@/components/admin/ui";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function NewPortfolioVideoPage() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Add video"
        description="Upload a film for the portfolio grid."
        actions={
          <IconLink href="/admin/portfolio" label="Back">
            <IconBack />
          </IconLink>
        }
      />
      <PortfolioForm
        defaultSortOrder={videos.length}
        saveToken={mintSaveToken(user.email)}
      />
    </div>
  );
}
