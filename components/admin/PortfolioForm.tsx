import { savePortfolioVideo } from "@/app/admin/actions";
import MediaField from "@/components/admin/MediaField";

export default function PortfolioForm({
  id,
  defaults,
  defaultSortOrder = 0,
}: {
  id?: string;
  defaults?: {
    title: string;
    src: string;
    poster: string;
    paletteA: string;
    paletteB: string;
    sortOrder: number;
    published: boolean;
  };
  defaultSortOrder?: number;
}) {
  return (
    <form action={savePortfolioVideo} className="grid max-w-xl gap-4">
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
      />
      <MediaField
        name="poster"
        label="Poster (optional)"
        folder="portfolio/posters"
        defaultValue={defaults?.poster ?? ""}
        accept="image/*"
        kind="image"
      />
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Palette A
          <input
            name="paletteA"
            defaultValue={defaults?.paletteA ?? "#ff4d00"}
            className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Palette B
          <input
            name="paletteB"
            defaultValue={defaults?.paletteB ?? "#7a2a0a"}
            className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
          />
        </label>
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
      <label className="flex items-center gap-2 text-sm">
        <input name="published" type="checkbox" defaultChecked={defaults?.published ?? true} />
        Published
      </label>
      <button type="submit" className="w-fit rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2">
        {id ? "Save changes" : "Create video"}
      </button>
    </form>
  );
}
