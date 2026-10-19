import Link from "next/link";
import { IconLink } from "@/components/admin/IconButton";
import { IconPlus } from "@/components/admin/icons";
import { listPortalUsers } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  let users: Awaited<ReturnType<typeof listPortalUsers>> = [];
  let error: string | null = null;
  try {
    users = await listPortalUsers();
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Could not load users. Ensure your account has the Neon Auth admin role.";
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Users</h1>
          <p className="mt-1 text-sm text-body">
            Create and manage admin portal accounts.
          </p>
        </div>
        <IconLink href="/admin/users/new" label="Add user" variant="accent">
          <IconPlus />
        </IconLink>
      </div>

      {error && (
        <p className="rounded border border-line bg-bg-2 px-4 py-3 text-sm text-accent">
          {error} In the Neon Console, open Auth → Users, and use “Make admin” on your
          account.
        </p>
      )}

      <ul className="grid gap-2">
        {users.map((u) => (
          <li key={u.id}>
            <Link
              href={`/admin/users/${u.id}`}
              className="flex items-center justify-between gap-3 rounded-[var(--radius-small)] border border-line bg-bg-2 px-4 py-3 transition-colors hover:border-accent"
            >
              <div>
                <p className="font-medium text-heading">{u.name || "Admin"}</p>
                <p className="text-sm text-body">{u.email}</p>
              </div>
              <span className="text-xs text-body">View</span>
            </Link>
          </li>
        ))}
        {!error && users.length === 0 && (
          <p className="text-sm text-body">No users yet. Add the first admin profile.</p>
        )}
      </ul>
    </div>
  );
}
