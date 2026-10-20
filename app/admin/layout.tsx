import Link from "next/link";
import { redirect } from "next/navigation";
import AdminAccountMenu from "@/components/admin/AdminAccountMenu";
import { getAdminGate } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gate = await getAdminGate();
  if (gate.kind === "anonymous") redirect("/auth/sign-in");

  return (
    <div className="admin-shell min-h-screen text-body">
      <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5">
          <Link
            href="/admin"
            className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-heading transition-colors hover:text-accent"
          >
            Graafex
            <span className="ml-1.5 font-normal text-body">Admin</span>
          </Link>
          <AdminAccountMenu name={gate.name} email={gate.email} userId={gate.id} />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10">{children}</main>
    </div>
  );
}
