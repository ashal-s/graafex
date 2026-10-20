import Link from "next/link";
import { AdminPageHeader, adminPanelClass } from "@/components/admin/ui";
import { listPortalUsers } from "@/lib/admin/users";
import { listAllCaseStudies } from "@/lib/data/case-studies";
import { listAllClientLogos } from "@/lib/data/client-logos";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashCard({
  href,
  eyebrow,
  count,
  label,
}: {
  href: string;
  eyebrow: string;
  count: number;
  label: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`group ${adminPanelClass} relative flex flex-col p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_16px_40px_rgb(0_0_0_/0.28)] sm:p-6`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <ArrowIcon />
      </div>
      <p className="mt-5 text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-heading">
        {count}
      </p>
      <p className="mt-2 text-sm text-body">{label}</p>
    </Link>
  );
}

export default async function AdminHome() {
  const [videos, studies, logos, users] = await Promise.all([
    listAllPortfolioVideos(),
    listAllCaseStudies(),
    listAllClientLogos(),
    listPortalUsers().catch(() => []),
  ]);

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Dashboard"
        description="Manage portfolio films, case studies, client logos, and admin accounts."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard
          href="/admin/portfolio"
          eyebrow="Videos"
          count={videos.length}
          label="Portfolio film tiles"
        />
        <DashCard
          href="/admin/case-studies"
          eyebrow="Case studies"
          count={studies.length}
          label="Client project pages"
        />
        <DashCard
          href="/admin/clients"
          eyebrow="Clients"
          count={logos.length}
          label="Portfolio logos"
        />
        <DashCard
          href="/admin/users"
          eyebrow="Users"
          count={users.length}
          label="Portal accounts"
        />
      </div>
    </div>
  );
}
