import Link from "next/link";
import { eq, asc } from "drizzle-orm";
import { deleteCaseStudy, saveCaseStudy } from "@/app/admin/actions";
import UploadField from "@/components/admin/UploadField";
import { getDb } from "@/db";
import { caseStudyPhotos, caseStudyReels } from "@/db/schema";
import { listAllCaseStudies } from "@/lib/data/case-studies";

async function mediaFor(studyId: string) {
  const db = getDb();
  const [reels, photos] = await Promise.all([
    db
      .select()
      .from(caseStudyReels)
      .where(eq(caseStudyReels.caseStudyId, studyId))
      .orderBy(asc(caseStudyReels.sortOrder)),
    db
      .select()
      .from(caseStudyPhotos)
      .where(eq(caseStudyPhotos.caseStudyId, studyId))
      .orderBy(asc(caseStudyPhotos.sortOrder)),
  ]);
  return {
    reels: reels.map((r) => r.url).join("\n"),
    photos: photos.map((p) => p.url).join("\n"),
  };
}

export default async function AdminCaseStudiesPage() {
  const studies = await listAllCaseStudies();
  const media = await Promise.all(studies.map(async (s) => [s.id, await mediaFor(s.id)] as const));
  const mediaMap = new Map(media);

  return (
    <div className="grid gap-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Case studies</h1>
          <p className="mt-1 text-sm text-body">Hero film, reels, and photos. One URL per line for media lists.</p>
        </div>
        <Link href="/admin" className="text-sm underline">
          Back
        </Link>
      </div>

      <section className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6">
        <h2 className="mb-4 font-semibold text-heading">Add case study</h2>
        <CaseStudyForm />
      </section>

      <ul className="grid gap-6">
        {studies.map((s) => (
          <li key={s.id} className="rounded-[var(--radius-main)] border border-line p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-heading">{s.name}</p>
                <p className="text-xs text-body">/{s.slug}</p>
              </div>
              <form action={deleteCaseStudy}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="text-xs text-accent underline">
                  Delete
                </button>
              </form>
            </div>
            <CaseStudyForm
              id={s.id}
              defaults={{
                name: s.name,
                slug: s.slug,
                logo: s.logo ?? "",
                description: s.description,
                services: (s.services ?? []).join(", "),
                year: s.year,
                video: s.video,
                poster: s.poster ?? "",
                reels: mediaMap.get(s.id)?.reels ?? "",
                photos: mediaMap.get(s.id)?.photos ?? "",
                sortOrder: s.sortOrder,
                published: s.published,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudyForm({
  id,
  defaults,
}: {
  id?: string;
  defaults?: {
    name: string;
    slug: string;
    logo: string;
    description: string;
    services: string;
    year: string;
    video: string;
    poster: string;
    reels: string;
    photos: string;
    sortOrder: number;
    published: boolean;
  };
}) {
  const folder = `case-studies/${defaults?.slug || "new"}`;
  return (
    <form action={saveCaseStudy} className="grid gap-3">
      {id && <input type="hidden" name="id" value={id} />}
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input name="name" defaultValue={defaults?.name} required className="rounded border border-line bg-bg px-3 py-2 text-heading" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Slug (optional)
        <input name="slug" defaultValue={defaults?.slug} className="rounded border border-line bg-bg px-3 py-2 text-heading" />
      </label>
      <UploadField name="logo" label="Logo URL" folder={`${folder}/logo`} defaultValue={defaults?.logo ?? ""} accept="image/*" />
      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          defaultValue={defaults?.description}
          required
          rows={3}
          className="rounded border border-line bg-bg px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Services (comma-separated)
        <input
          name="services"
          defaultValue={defaults?.services ?? "Videography, Photography"}
          className="rounded border border-line bg-bg px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Year
        <input name="year" defaultValue={defaults?.year ?? "2026"} required className="rounded border border-line bg-bg px-3 py-2 text-heading" />
      </label>
      <UploadField name="video" label="Hero video URL" folder={`${folder}/hero`} defaultValue={defaults?.video ?? ""} accept="video/*" />
      <UploadField name="poster" label="Poster URL" folder={`${folder}/poster`} defaultValue={defaults?.poster ?? ""} accept="image/*" />
      <UploadField
        name="reels"
        label="Reel URLs (one per line)"
        folder={`${folder}/reels`}
        defaultValue={defaults?.reels ?? ""}
        accept="video/*"
        multiline
      />
      <UploadField
        name="photos"
        label="Photo URLs (one per line)"
        folder={`${folder}/photos`}
        defaultValue={defaults?.photos ?? ""}
        accept="image/*"
        multiline
      />
      <label className="flex flex-col gap-1 text-sm">
        Sort order
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaults?.sortOrder ?? 0}
          className="rounded border border-line bg-bg px-3 py-2 text-heading"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input name="published" type="checkbox" defaultChecked={defaults?.published ?? true} />
        Published
      </label>
      <button type="submit" className="w-fit rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2">
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
}
