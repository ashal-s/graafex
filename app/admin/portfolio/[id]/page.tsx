import { notFound, redirect } from "next/navigation";
import { deletePortfolioVideo } from "@/app/admin/actions";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconTrash } from "@/components/admin/icons";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";
import { getPortfolioVideoById } from "@/lib/data/portfolio";

export const dynamic = "force-dynamic";

export default async function EditPortfolioVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");

  const { id } = await params;
  const v = await getPortfolioVideoById(id);
  if (!v) notFound();

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Edit Video</h1>
          <p className="mt-1 text-sm text-body">{v.title}</p>
        </div>
        <div className="flex gap-2">
          <IconLink href="/admin/portfolio" label="Back">
            <IconBack />
          </IconLink>
          <form action={deletePortfolioVideo}>
            <input type="hidden" name="id" value={v.id} />
            <IconButton type="submit" label="Delete" variant="danger">
              <IconTrash />
            </IconButton>
          </form>
        </div>
      </div>
      <PortfolioForm
        id={v.id}
        saveToken={mintSaveToken(user.email)}
        defaults={{
          title: v.title,
          src: v.src ?? "",
          thumbnail: v.poster ?? "",
          paletteA: v.palette[0],
          paletteB: v.palette[1],
          sortOrder: v.sortOrder,
          published: v.published,
        }}
      />
    </div>
  );
}
