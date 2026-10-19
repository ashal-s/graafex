import Link from "next/link";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Add case study</h1>
          <p className="mt-1 text-sm text-body">Upload hero film, reels, and photos.</p>
        </div>
        <Link href="/admin/case-studies" className="text-sm underline">
          Cancel
        </Link>
      </div>
      <CaseStudyForm />
    </div>
  );
}
