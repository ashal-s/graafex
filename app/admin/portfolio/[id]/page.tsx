import { notFound, redirect } from "next/navigation";
import { deletePortfolioVideo } from "@/app/admin/actions";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconTrash } from "@/components/admin/icons";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { AdminPageHeader } from "@/components/admin/ui";
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
    <div className="grid gap-8">
      <AdminPageHeader
        title="Edit video"
        description={v.title}
        actions={
          <>
            <IconLink href="/admin/portfolio" label="Back">
              <IconBack />
            </IconLink>
            <form action={deletePortfolioVideo}>
              <input type="hidden" name="id" value={v.id} />
              <IconButton type="submit" label="Delete" variant="danger">
                <IconTrash />
              </IconButton>
            </form>
          </>
        }
      />
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
