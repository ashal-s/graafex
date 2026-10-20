import { redirect } from "next/navigation";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { IconLink } from "@/components/admin/IconButton";
import { IconBack } from "@/components/admin/icons";
import { AdminPageHeader } from "@/components/admin/ui";
import { getSessionUser } from "@/lib/admin/session";
import { mintSaveToken } from "@/lib/admin/save-token";

export const dynamic = "force-dynamic";

export default async function NewCaseStudyPage() {
  const user = await getSessionUser();
  if (!user?.email) redirect("/auth/sign-in");

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Add case study"
        description="Upload a hero film, reels, and photos for a client project."
        actions={
          <IconLink href="/admin/case-studies" label="Back">
            <IconBack />
          </IconLink>
        }
      />
      <CaseStudyForm saveToken={mintSaveToken(user.email)} />
    </div>
  );
}
