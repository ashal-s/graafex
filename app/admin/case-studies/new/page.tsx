import { redirect } from "next/navigation";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function NewCaseStudyPage() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Add Case Study</h1>
          <p className="mt-1 text-sm text-body">Upload hero film, reels, and photos.</p>
        </div>
        <IconLink href="/admin/case-studies" label="Back">
          <IconBack />
        </IconLink>
      </div>
      <CaseStudyForm saveToken={mintSaveToken(user.email)} />
    </div>
  );
}
