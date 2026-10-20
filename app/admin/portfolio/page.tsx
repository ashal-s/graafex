import { deletePortfolioVideo } from "@/app/admin/actions";
import { IconLink, IconButton } from "@/components/admin/IconButton";
import { IconBack, IconEdit, IconPlus, IconTrash } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";
import {
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
  adminPanelClass,
} from "@/components/admin/ui";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function AdminPortfolioPage() {
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Videos"
        description="Hover-play tiles shown on the public portfolio grid."
        actions={
          <>
            <IconLink href="/admin" label="Back">
              <IconBack />
            </IconLink>
            <IconLink href="/admin/portfolio/new" label="Add video" variant="accent">
              <IconPlus />
            </IconLink>
          </>
        }
      />

      {videos.length === 0 ? (
        <AdminEmptyState
          title="No videos yet"
          description="Add your first film to start building the portfolio grid."
          action={
            <IconLink href="/admin/portfolio/new" label="Add video" variant="accent">
              <IconPlus />
            </IconLink>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id} className={`${adminPanelClass} overflow-visible`}>
              <div className="overflow-hidden rounded-t-[calc(var(--radius-main)-0.3rem)]">
                {v.src ? (
                  <VideoThumb src={v.src} poster={v.poster} aspect="16 / 9" className="w-full" />
                ) : (
                  <div className="grid aspect-video place-items-center text-xs text-body">
                    No film
                  </div>
                )}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-2 overflow-visible p-3.5">
                <div className="min-w-0">
                  <p className="truncate font-medium tracking-[-0.01em] text-heading">{v.title}</p>
                  <div className="mt-1.5">
                    <AdminStatusBadge published={v.published} />
                  </div>
                </div>
                <div className="relative z-20 flex shrink-0 gap-1.5 overflow-visible">
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
