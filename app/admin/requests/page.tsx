import Link from "next/link";
import { approveAdminRequest, rejectAdminRequest } from "@/app/admin/actions";
import { listAllAdmins, listPendingAdmins } from "@/lib/admin/members";

export default async function AdminRequestsPage() {
  const [pending, all] = await Promise.all([listPendingAdmins(), listAllAdmins()]);

  return (
    <div className="grid gap-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Access requests</h1>
          <p className="mt-1 text-sm text-body">Approve new admins before they can use the portal.</p>
        </div>
        <Link href="/admin" className="text-sm underline">
          Back
        </Link>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Pending</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-body">No pending requests.</p>
        ) : (
          <ul className="grid gap-3">
            {pending.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-main)] border border-line bg-bg-2 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-heading">{m.name || "Admin"}</p>
                  <p className="text-sm text-body">{m.email}</p>
                  <p className="mt-1 text-xs text-body">
                    Requested {m.createdAt ? new Date(m.createdAt).toLocaleString() : "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <form action={approveAdminRequest}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="rounded bg-accent px-3 py-1.5 text-xs font-semibold text-bg-2">
                      Approve
                    </button>
                  </form>
                  <form action={rejectAdminRequest}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="rounded border border-line px-3 py-1.5 text-xs text-heading">
                      Decline
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">All members</h2>
        <ul className="grid gap-2">
          {all.map((m) => (
            <li key={m.id} className="flex items-center justify-between gap-3 border-b border-line py-2 text-sm">
              <div>
                <span className="text-heading">{m.name || "Admin"}</span>
                <span className="ml-2 text-body">{m.email}</span>
              </div>
              <span
                className={
                  m.status === "approved"
                    ? "text-xs text-accent"
                    : m.status === "rejected"
                      ? "text-xs text-body"
                      : "text-xs text-heading"
                }
              >
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
