import Link from "next/link";
import { listPortalUsers } from "@/lib/admin/users";
import { listAllCaseStudies } from "@/lib/data/case-studies";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

export default async function AdminHome() {
  const [videos, studies, users] = await Promise.all([
    listAllPortfolioVideos(),
    listAllCaseStudies(),
    listPortalUsers().catch(() => []),
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="t-h3 font-semibold text-heading">Dashboard</h1>
        <p className="mt-2 text-sm text-body">
          Manage portfolio films, case studies, and admin users.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/portfolio"
          className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-wider text-accent">Videos</p>
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
          href="/admin/users"
          className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-wider text-accent">Users</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{users.length}</p>
          <p className="mt-1 text-sm text-body">registered</p>
        </Link>
      </div>
    </div>
  );
}
