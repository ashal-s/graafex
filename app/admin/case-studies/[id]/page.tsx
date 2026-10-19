import { notFound, redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { deleteCaseStudy } from "@/app/admin/actions";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconTrash } from "@/components/admin/icons";
import { getDb } from "@/db";
import { caseStudies, caseStudyPhotos, caseStudyReels } from "@/db/schema";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");

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
          <h1 className="t-h3 font-semibold text-heading">Edit Case Study</h1>
          <p className="mt-1 text-sm text-body">{s.name}</p>
        </div>
        <div className="flex gap-2">
          <IconLink href="/admin/case-studies" label="Back">
            <IconBack />
          </IconLink>
          <form action={deleteCaseStudy}>
            <input type="hidden" name="id" value={s.id} />
            <IconButton type="submit" label="Delete" variant="danger">
              <IconTrash />
            </IconButton>
          </form>
        </div>
      </div>
      <CaseStudyForm
        id={s.id}
        saveToken={mintSaveToken(user.email)}
        defaults={{
          name: s.name,
          slug: s.slug,
          logo: s.logo ?? "",
          description: s.description,
          services: (s.services ?? []).join(", "),
          year: s.year,
          video: s.video,
          thumbnail: s.poster ?? "",
          reels: reels.map((r) => r.url).join("\n"),
          photos: photos.map((p) => p.url).join("\n"),
          sortOrder: s.sortOrder,
          published: s.published,
        }}
      />
    </div>
  );
}
