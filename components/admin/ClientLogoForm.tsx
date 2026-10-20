import { LabelButton } from "@/components/admin/IconButton";
import { IconSave } from "@/components/admin/icons";
import MediaField from "@/components/admin/MediaField";
import PublishToggle from "@/components/admin/PublishToggle";
import { AdminPanel, adminFieldClass, adminLabelClass } from "@/components/admin/ui";

export default function ClientLogoForm({
  id,
  defaults,
  defaultSortOrder = 0,
  saveToken,
}: {
  id?: string;
  defaults?: {
    name: string;
    image: string;
    sortOrder: number;
    published: boolean;
  };
  defaultSortOrder?: number;
  saveToken: string;
}) {
  return (
    <AdminPanel className="max-w-xl p-5 sm:p-6">
      <form action="/api/admin/save-client-logo" method="post" className="grid gap-5">
        <input type="hidden" name="saveToken" value={saveToken} />
        {id ? <input type="hidden" name="id" value={id} /> : null}
        <label className={adminLabelClass}>
          Name
          <input
            name="name"
            defaultValue={defaults?.name}
            required
            className={adminFieldClass}
            placeholder="Client name"
          />
        </label>
        <MediaField
          name="image"
          label="Logo"
          folder="clients"
          defaultValue={defaults?.image ?? ""}
          accept="image/*"
          kind="image"
          hint="Prefer a transparent PNG or SVG. Shown in the Clients grid on /portfolio."
        />
        <label className={adminLabelClass}>
          Sort order
          <input
            name="sortOrder"
            type="number"
            defaultValue={defaults?.sortOrder ?? defaultSortOrder}
            className={adminFieldClass}
          />
        </label>
        <PublishToggle defaultChecked={defaults?.published ?? true} />
        <div className="flex justify-end border-t border-line pt-5">
          <LabelButton type="submit" label={id ? "Save" : "Create"} variant="accent">
            <IconSave />
          </LabelButton>
        </div>
      </form>
    </AdminPanel>
  );
}
