import Link from "next/link";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function NewPortfolioVideoPage() {
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Add video</h1>
          <p className="mt-1 text-sm text-body">Upload a film for the portfolio grid.</p>
        </div>
        <Link href="/admin/portfolio" className="text-sm underline">
          Cancel
        </Link>
      </div>
      <PortfolioForm defaultSortOrder={videos.length} />
    </div>
  );
}
