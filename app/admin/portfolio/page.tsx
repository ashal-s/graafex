import Link from "next/link";
import { deletePortfolioVideo } from "@/app/admin/actions";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function AdminPortfolioPage() {
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Portfolio videos</h1>
          <p className="mt-1 text-sm text-body">Hover-play tiles on /portfolio.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm underline">
            Back
          </Link>
          <Link
            href="/admin/portfolio/new"
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2"
          >
            Add video
          </Link>
        </div>
      </div>

      {videos.length === 0 ? (
        <p className="text-sm text-body">No videos yet. Add your first film.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id} className="overflow-hidden rounded-[var(--radius-main)] border border-line bg-bg-2">
              <div className="aspect-video bg-black">
                {v.src ? (
                  <video src={v.src} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-body">No film</div>
                )}
              </div>
              <div className="flex items-start justify-between gap-2 p-3">
                <div>
                  <p className="font-semibold text-heading">{v.title}</p>
                  <p className="text-xs text-body">{v.published ? "Published" : "Draft"}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Link href={`/admin/portfolio/${v.id}`} className="text-xs text-accent underline">
                    Edit
                  </Link>
                  <form action={deletePortfolioVideo}>
                    <input type="hidden" name="id" value={v.id} />
                    <button type="submit" className="text-xs text-body underline">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
