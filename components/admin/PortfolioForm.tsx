import ColorField from "@/components/admin/ColorField";
import { LabelButton } from "@/components/admin/IconButton";
import { IconSave } from "@/components/admin/icons";
import MediaField from "@/components/admin/MediaField";
import PublishToggle from "@/components/admin/PublishToggle";
import { AdminPanel, adminFieldClass, adminLabelClass } from "@/components/admin/ui";

export default function PortfolioForm({
  id,
  defaults,
  defaultSortOrder = 0,
  saveToken,
}: {
  id?: string;
  defaults?: {
    title: string;
    src: string;
    thumbnail: string;
    paletteA: string;
    paletteB: string;
    sortOrder: number;
    published: boolean;
  };
  defaultSortOrder?: number;
  saveToken: string;
}) {
  return (
    <AdminPanel className="max-w-xl p-5 sm:p-6">
      <form action="/api/admin/save-portfolio" method="post" className="grid gap-5">
        <input type="hidden" name="saveToken" value={saveToken} />
        {id && <input type="hidden" name="id" value={id} />}
        <label className={adminLabelClass}>
          Title
          <input
            name="title"
            defaultValue={defaults?.title}
            required
            className={adminFieldClass}
          />
        </label>
        <MediaField
          name="src"
          label="Film"
          folder="portfolio"
          defaultValue={defaults?.src ?? ""}
          accept="video/*"
          kind="video"
          fitAspect
        />
        <MediaField
          name="thumbnail"
          label="Thumbnail"
          folder="portfolio/thumbnails"
          defaultValue={defaults?.thumbnail ?? ""}
          accept="image/*"
          kind="image"
          hint="Optional still shown on the site before the film starts playing. If empty, the first video frame is used."
        />
        <div className="grid grid-cols-2 gap-3">
          <ColorField
            name="paletteA"
            label="Palette A"
            defaultValue={defaults?.paletteA ?? "#ff4d00"}
          />
          <ColorField
            name="paletteB"
            label="Palette B"
            defaultValue={defaults?.paletteB ?? "#7a2a0a"}
          />
        </div>
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
