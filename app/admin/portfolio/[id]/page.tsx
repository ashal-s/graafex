import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { deletePortfolioVideo } from "@/app/admin/actions";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { getDb } from "@/db";
import { portfolioVideos } from "@/db/schema";

export default async function EditPortfolioVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [v] = await getDb().select().from(portfolioVideos).where(eq(portfolioVideos.id, id)).limit(1);
  if (!v) notFound();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Edit video</h1>
          <p className="mt-1 text-sm text-body">{v.title}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/portfolio" className="text-sm underline">
            Back
          </Link>
          <form action={deletePortfolioVideo}>
            <input type="hidden" name="id" value={v.id} />
            <button type="submit" className="text-sm text-accent underline">
              Delete
            </button>
          </form>
        </div>
      </div>
      <PortfolioForm
        id={v.id}
        defaults={{
          title: v.title,
          src: v.src ?? "",
          poster: v.poster ?? "",
          paletteA: v.palette[0],
          paletteB: v.palette[1],
          sortOrder: v.sortOrder,
          published: v.published,
        }}
      />
    </div>
  );
}
