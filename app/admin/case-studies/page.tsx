import Link from "next/link";
import { deleteCaseStudy } from "@/app/admin/actions";
import { listAllCaseStudies } from "@/lib/data/case-studies";

export default async function AdminCaseStudiesPage() {
  const studies = await listAllCaseStudies();

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Case studies</h1>
          <p className="mt-1 text-sm text-body">Hero films, reels, and photo galleries.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm underline">
            Back
          </Link>
          <Link
            href="/admin/case-studies/new"
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2"
          >
            Add case study
          </Link>
        </div>
      </div>

      {studies.length === 0 ? (
        <p className="text-sm text-body">No case studies yet.</p>
      ) : (
        <ul className="grid gap-4">
          {studies.map((s) => (
            <li
              key={s.id}
              className="grid gap-4 overflow-hidden rounded-[var(--radius-main)] border border-line bg-bg-2 sm:grid-cols-[minmax(0,14rem)_1fr]"
            >
              <div className="aspect-video bg-black sm:aspect-auto sm:min-h-[8rem]">
                {s.video ? (
                  <video src={s.video} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-body">No film</div>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-4 sm:pl-0">
                <div>
                  <p className="font-semibold text-heading">{s.name}</p>
                  <p className="text-xs text-body">/{s.slug}</p>
                  <p className="mt-2 text-xs text-body">{s.published ? "Published" : "Draft"} · {s.year}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Link href={`/admin/case-studies/${s.id}`} className="text-xs text-accent underline">
                    Edit
                  </Link>
                  <form action={deleteCaseStudy}>
                    <input type="hidden" name="id" value={s.id} />
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
