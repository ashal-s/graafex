import { deleteCaseStudy } from "@/app/admin/actions";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconEdit, IconPlus, IconTrash } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";
import { listAllCaseStudies } from "@/lib/data/case-studies";

export default async function AdminCaseStudiesPage() {
  const studies = await listAllCaseStudies();

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Case Studies</h1>
          <p className="mt-1 text-sm text-body">Hero films, reels, and photo galleries.</p>
        </div>
        <div className="flex gap-2">
          <IconLink href="/admin" label="Back">
            <IconBack />
          </IconLink>
          <IconLink href="/admin/case-studies/new" label="Add case study" variant="accent">
            <IconPlus />
          </IconLink>
        </div>
      </div>

      {studies.length === 0 ? (
        <p className="text-sm text-body">No case studies yet.</p>
      ) : (
        <ul className="grid gap-4 overflow-visible">
          {studies.map((s) => (
            <li
              key={s.id}
              className="grid gap-0 overflow-visible rounded-[var(--radius-main)] border border-line bg-bg-2 sm:grid-cols-[minmax(0,16rem)_1fr]"
            >
              <div className="overflow-hidden rounded-t-[var(--radius-main)] sm:rounded-l-[var(--radius-main)] sm:rounded-tr-none">
                {s.video ? (
                  <VideoThumb src={s.video} poster={s.poster} aspect="16 / 9" className="w-full sm:h-full sm:min-h-[9rem]" />
                ) : (
                  <div className="grid aspect-video place-items-center text-xs text-body sm:min-h-[9rem]">No film</div>
                )}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-3 overflow-visible p-4">
                <div>
                  <p className="font-semibold text-heading">{s.name}</p>
                  <p className="text-xs text-body">/{s.slug}</p>
                  <p className="mt-2 text-xs text-body">
                    {s.published ? "Published" : "Draft"} · {s.year}
                  </p>
                </div>
                <div className="relative z-20 flex shrink-0 gap-1 overflow-visible">
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
