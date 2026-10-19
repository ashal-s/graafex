import ColorField from "@/components/admin/ColorField";
import { LabelButton } from "@/components/admin/IconButton";
import { IconSave } from "@/components/admin/icons";
import MediaField from "@/components/admin/MediaField";
import PublishToggle from "@/components/admin/PublishToggle";

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
    <form
      action="/api/admin/save-portfolio"
      method="post"
      className="grid max-w-xl gap-5"
    >
      <input type="hidden" name="saveToken" value={saveToken} />
      {id && <input type="hidden" name="id" value={id} />}
      <label className="flex flex-col gap-1 text-sm">
        Title
        <input
          name="title"
          defaultValue={defaults?.title}
          required
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
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
        <ColorField name="paletteA" label="Palette A" defaultValue={defaults?.paletteA ?? "#ff4d00"} />
        <ColorField name="paletteB" label="Palette B" defaultValue={defaults?.paletteB ?? "#7a2a0a"} />
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Sort order
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaults?.sortOrder ?? defaultSortOrder}
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <PublishToggle defaultChecked={defaults?.published ?? true} />
      <div className="flex justify-end">
        <LabelButton type="submit" label={id ? "Save" : "Create"} variant="accent">
          <IconSave />
        </LabelButton>
      </div>
    </form>
  );
}
