import { redirect } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function NewPortfolioVideoPage() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Add Video</h1>
          <p className="mt-1 text-sm text-body">Upload a film for the portfolio grid.</p>
        </div>
        <IconLink href="/admin/portfolio" label="Back">
          <IconBack />
        </IconLink>
      </div>
      <PortfolioForm
        defaultSortOrder={videos.length}
        saveToken={mintSaveToken(user.email)}
      />
    </div>
  );
}
