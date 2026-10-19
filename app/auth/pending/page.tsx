import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminGate } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function PendingApprovalPage() {
  const gate = await getAdminGate();
  if (gate.kind === "anonymous") redirect("/auth/sign-in");
  if (gate.kind === "approved") redirect("/admin");
  if (gate.kind === "rejected") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-4">
        <div className="max-w-md text-center">
          <h1 className="t-h3 font-semibold text-heading">Access declined</h1>
          <p className="mt-3 text-sm text-body">
            An admin declined the request for <span className="text-heading">{gate.email}</span>.
          </p>
          <Link href="/auth/sign-in" className="mt-6 inline-block text-sm text-accent underline">
            Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="t-h3 font-semibold text-heading">Waiting for approval</h1>
        <p className="mt-3 text-sm text-body">
          Your request for <span className="text-heading">{gate.email}</span> was sent to the admin
          portal. An existing admin must approve it before you can sign in.
        </p>
        <Link href="/auth/sign-in" className="mt-6 inline-block text-sm text-accent underline">
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
