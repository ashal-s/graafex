import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminGate } from "@/lib/admin/session";
import { listPendingAdmins } from "@/lib/admin/members";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gate = await getAdminGate();
  if (gate.kind === "anonymous") redirect("/auth/sign-in");
  if (gate.kind === "pending") redirect("/auth/pending");
  if (gate.kind === "rejected") redirect("/auth/pending");

  const pending = await listPendingAdmins();

  return (
    <div className="min-h-screen bg-bg text-body">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/admin" className="font-semibold text-heading">
              Graafex Admin
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              <Link href="/admin/portfolio" className="hover:text-accent">
                Portfolio
              </Link>
              <Link href="/admin/case-studies" className="hover:text-accent">
                Case studies
              </Link>
              <Link href="/admin/requests" className="hover:text-accent">
                Requests
                {pending.length > 0 && (
                  <span className="ml-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-bg-2">
                    {pending.length}
                  </span>
                )}
              </Link>
              <Link href="/portfolio" className="hover:text-accent">
                View site
              </Link>
            </nav>
          </div>
          <p className="text-xs text-body">{gate.email}</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
