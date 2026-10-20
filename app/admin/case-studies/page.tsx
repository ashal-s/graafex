import { deleteCaseStudy } from "@/app/admin/actions";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconEdit, IconPlus, IconTrash } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";
import {
  AdminEmptyState,
  AdminPageHeader,
  AdminStatusBadge,
  adminPanelClass,
} from "@/components/admin/ui";
import { listAllCaseStudies } from "@/lib/data/case-studies";

export default async function AdminCaseStudiesPage() {
  const studies = await listAllCaseStudies();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Case studies"
        description="Hero films, reels, and photo galleries for client projects."
        actions={
          <>
            <IconLink href="/admin" label="Back">
              <IconBack />
            </IconLink>
            <IconLink href="/admin/case-studies/new" label="Add case study" variant="accent">
              <IconPlus />
            </IconLink>
          </>
        }
      />

      {studies.length === 0 ? (
        <AdminEmptyState
          title="No case studies yet"
          description="Create a project page with a hero film, reels, and stills."
          action={
            <IconLink href="/admin/case-studies/new" label="Add case study" variant="accent">
              <IconPlus />
            </IconLink>
          }
        />
      ) : (
        <ul className="grid gap-3 overflow-visible">
          {studies.map((s) => (
            <li
              key={s.id}
              className={`${adminPanelClass} grid gap-0 overflow-visible sm:grid-cols-[minmax(0,15rem)_1fr]`}
            >
              <div className="overflow-hidden rounded-t-[calc(var(--radius-main)-0.3rem)] sm:rounded-l-[calc(var(--radius-main)-0.3rem)] sm:rounded-tr-none">
                {s.video ? (
                  <VideoThumb
                    src={s.video}
                    poster={s.poster}
                    aspect="16 / 9"
                    className="w-full sm:h-full sm:min-h-[9rem]"
                  />
                ) : (
                  <div className="grid aspect-video place-items-center text-xs text-body sm:min-h-[9rem]">
                    No film
                  </div>
                )}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-3 overflow-visible p-4">
                <div className="min-w-0">
                  <p className="font-medium tracking-[-0.01em] text-heading">{s.name}</p>
                  <p className="mt-0.5 truncate text-xs text-body">/{s.slug}</p>
                  <div className="mt-2.5">
                    <AdminStatusBadge published={s.published} extra={s.year} />
                  </div>
                </div>
                <div className="relative z-20 flex shrink-0 gap-1.5 overflow-visible">
                  <IconLink href={`/admin/case-studies/${s.id}`} label="Edit">
                    <IconEdit />
                  </IconLink>
                  <form action={deleteCaseStudy}>
                    <input type="hidden" name="id" value={s.id} />
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
