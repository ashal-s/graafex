import Link from "next/link";
import { listPendingAdmins } from "@/lib/admin/members";
import { listAllCaseStudies } from "@/lib/data/case-studies";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function AdminHome() {
  const [videos, studies, pending] = await Promise.all([
    listAllPortfolioVideos(),
    listAllCaseStudies(),
    listPendingAdmins(),
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="t-h3 font-semibold text-heading">Dashboard</h1>
        <p className="mt-2 text-sm text-body">Manage portfolio films, case studies, and admin access.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/portfolio"
          className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-wider text-accent">Portfolio</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{videos.length}</p>
          <p className="mt-1 text-sm text-body">film tiles</p>
        </Link>
        <Link
          href="/admin/case-studies"
          className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-wider text-accent">Case studies</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{studies.length}</p>
          <p className="mt-1 text-sm text-body">projects</p>
        </Link>
        <Link
          href="/admin/requests"
          className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-wider text-accent">Access requests</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{pending.length}</p>
          <p className="mt-1 text-sm text-body">awaiting approval</p>
        </Link>
      </div>
    </div>
  );
}
