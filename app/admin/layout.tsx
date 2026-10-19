import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminGate } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gate = await getAdminGate();
  if (gate.kind === "anonymous") redirect("/auth/sign-in");

  return (
    <div className="min-h-screen bg-bg text-body">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/admin" className="font-semibold text-heading">
            Graafex Admin
          </Link>
          <p className="text-xs text-body">{gate.email}</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
