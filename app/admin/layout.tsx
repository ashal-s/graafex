import Link from "next/link";
import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="min-h-screen bg-bg text-body">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-semibold text-heading">
              Graafex Admin
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/admin/portfolio" className="hover:text-accent">
                Portfolio
              </Link>
              <Link href="/admin/case-studies" className="hover:text-accent">
                Case studies
              </Link>
              <Link href="/portfolio" className="hover:text-accent">
                View site
              </Link>
            </nav>
          </div>
          <p className="text-xs text-body">{session.user.email}</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
