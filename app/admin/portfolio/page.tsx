import { deletePortfolioVideo } from "@/app/admin/actions";
import { IconLink, IconButton } from "@/components/admin/IconButton";
import { IconBack, IconEdit, IconPlus, IconTrash } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function AdminPortfolioPage() {
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Videos</h1>
          <p className="mt-1 text-sm text-body">Hover-play tiles on /portfolio.</p>
        </div>
        <div className="flex gap-2">
          <IconLink href="/admin" label="Back">
            <IconBack />
          </IconLink>
          <IconLink href="/admin/portfolio/new" label="Add video" variant="accent">
            <IconPlus />
          </IconLink>
        </div>
      </div>

      {videos.length === 0 ? (
        <p className="text-sm text-body">No videos yet. Add your first film.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id} className="overflow-visible rounded-[var(--radius-main)] border border-line bg-bg-2">
              <div className="overflow-hidden rounded-t-[var(--radius-main)]">
                {v.src ? (
                  <VideoThumb src={v.src} poster={v.poster} aspect="16 / 9" className="w-full" />
                ) : (
                  <div className="grid aspect-video place-items-center text-xs text-body">No film</div>
                )}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-2 overflow-visible p-3">
                <div>
                  <p className="font-semibold text-heading">{v.title}</p>
                  <p className="text-xs text-body">{v.published ? "Published" : "Draft"}</p>
                </div>
                <div className="relative z-20 flex shrink-0 gap-1 overflow-visible">
                  <IconLink href={`/admin/portfolio/${v.id}`} label="Edit">
                    <IconEdit />
                  </IconLink>
                  <form action={deletePortfolioVideo}>
                    <input type="hidden" name="id" value={v.id} />
                    <IconButton type="submit" label="Delete" variant="danger">
                      <IconTrash />
                    </IconButton>
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
