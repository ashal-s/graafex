import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { deleteCaseStudy } from "@/app/admin/actions";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { getDb } from "@/db";
import { caseStudies, caseStudyPhotos, caseStudyReels } from "@/db/schema";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const [s] = await db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
  if (!s) notFound();

  const [reels, photos] = await Promise.all([
    db
      .select()
      .from(caseStudyReels)
      .where(eq(caseStudyReels.caseStudyId, id))
      .orderBy(asc(caseStudyReels.sortOrder)),
    db
      .select()
      .from(caseStudyPhotos)
      .where(eq(caseStudyPhotos.caseStudyId, id))
      .orderBy(asc(caseStudyPhotos.sortOrder)),
  ]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Edit case study</h1>
          <p className="mt-1 text-sm text-body">{s.name}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/case-studies" className="text-sm underline">
            Back
          </Link>
          <form action={deleteCaseStudy}>
            <input type="hidden" name="id" value={s.id} />
            <button type="submit" className="text-sm text-accent underline">
              Delete
            </button>
          </form>
        </div>
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
          reels: reels.map((r) => r.url).join("\n"),
          photos: photos.map((p) => p.url).join("\n"),
          sortOrder: s.sortOrder,
          published: s.published,
        }}
      />
    </div>
  );
}
