import { IconLink } from "@/components/admin/IconButton";
import { IconBack, IconPlus, IconView } from "@/components/admin/icons";
import {
  AdminEmptyState,
  AdminNotice,
  AdminPageHeader,
  adminPanelClass,
} from "@/components/admin/ui";
import { listPortalUsers } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

function initials(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  if (parts[0]) return parts[0].slice(0, 2).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

export default async function AdminUsersPage() {
  let users: Awaited<ReturnType<typeof listPortalUsers>> = [];
  let error: string | null = null;
  try {
    users = await listPortalUsers();
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Could not load users. Ensure your account has the admin role.";
  }

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Users"
        description="Create and manage admin portal accounts."
        actions={
          <>
            <IconLink href="/admin" label="Back">
              <IconBack />
            </IconLink>
            <IconLink href="/admin/users/new" label="Add user" variant="accent">
              <IconPlus />
            </IconLink>
          </>
        }
      />

      {error ? (
        <AdminNotice tone="error">
          {error} Seed the first admin with{" "}
          <code className="text-heading">npm run seed:admin</code>, then sign in again.
        </AdminNotice>
      ) : null}

      {!error && users.length === 0 ? (
        <AdminEmptyState
          title="No users yet"
          description="Add the first admin profile so your team can sign in."
          action={
            <IconLink href="/admin/users/new" label="Add user" variant="accent">
              <IconPlus />
            </IconLink>
          }
        />
      ) : (
        <ul className="grid gap-2">
          {users.map((u) => (
            <li
              key={u.id}
              className={`${adminPanelClass} relative z-10 flex items-center justify-between gap-3 overflow-visible px-3.5 py-3`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,rgb(255_77_0_/0.95),rgb(255_122_51_/0.55))] text-[11px] font-semibold tracking-wide text-heading"
                  aria-hidden
                >
                  {initials(u.name || "", u.email)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium tracking-[-0.01em] text-heading">
                    {u.name || "Admin"}
                  </p>
                  <p className="truncate text-sm text-body">{u.email}</p>
                </div>
              </div>
              <div className="relative z-20 shrink-0 overflow-visible">
                <IconLink href={`/admin/users/${u.id}`} label="View">
                  <IconView />
                </IconLink>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
