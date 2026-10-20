import { deleteClientLogo } from "@/app/admin/actions";
import { IconButton, IconLink } from "@/components/admin/IconButton";
import { IconBack, IconEdit, IconPlus, IconTrash } from "@/components/admin/icons";
import {
  AdminEmptyState,
  AdminNotice,
  AdminPageHeader,
  AdminStatusBadge,
  adminPanelClass,
} from "@/components/admin/ui";
import { listAllClientLogos } from "@/lib/data/client-logos";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const logos = await listAllClientLogos();

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        title="Clients"
        description="Logos shown in the Clients grid on the portfolio page."
        actions={
          <>
            <IconLink href="/admin" label="Back">
              <IconBack />
            </IconLink>
            <IconLink href="/admin/clients/new" label="Add client" variant="accent">
              <IconPlus />
            </IconLink>
          </>
        }
      />

      {sp.error === "save" ? (
        <AdminNotice tone="error">Could not save. Check name and logo image.</AdminNotice>
      ) : null}

      {logos.length === 0 ? (
        <AdminEmptyState
          title="No client logos yet"
          description="Add logos to populate the Clients section on /portfolio."
          action={
            <IconLink href="/admin/clients/new" label="Add client" variant="accent">
              <IconPlus />
            </IconLink>
          }
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <li key={logo.id} className={`${adminPanelClass} overflow-visible`}>
              <div className="grid aspect-[5/3] place-items-center overflow-hidden rounded-t-[calc(var(--radius-main)-0.3rem)] border-b border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-6">
                {logo.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="max-h-16 w-full object-contain"
                  />
                ) : (
                  <span className="text-sm font-medium text-heading">{logo.name}</span>
                )}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-2 overflow-visible p-3.5">
                <div className="min-w-0">
                  <p className="truncate font-medium tracking-[-0.01em] text-heading">
                    {logo.name}
                  </p>
                  <div className="mt-1.5">
                    <AdminStatusBadge published={logo.published} />
                  </div>
                </div>
                <div className="relative z-20 flex shrink-0 gap-1.5 overflow-visible">
                  <IconLink href={`/admin/clients/${logo.id}`} label="Edit">
                    <IconEdit />
                  </IconLink>
                  <form action={deleteClientLogo}>
                    <input type="hidden" name="id" value={logo.id} />
                    <IconButton type="submit" label="Delete" variant="danger">
                      <IconTrash />
                    </IconButton>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
