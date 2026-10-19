import { saveCaseStudy } from "@/app/admin/actions";
import MediaField from "@/components/admin/MediaField";
import MediaListField from "@/components/admin/MediaListField";

export type CaseStudyFormDefaults = {
  name: string;
  slug: string;
  logo: string;
  description: string;
  services: string;
  year: string;
  video: string;
  poster: string;
  reels: string;
  photos: string;
  sortOrder: number;
  published: boolean;
};

export default function CaseStudyForm({
  id,
  defaults,
}: {
  id?: string;
  defaults?: Partial<CaseStudyFormDefaults>;
}) {
  const folder = `case-studies/${defaults?.slug || "new"}`;

  return (
    <form action={saveCaseStudy} className="grid max-w-3xl gap-5">
      {id && <input type="hidden" name="id" value={id} />}
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="name"
          defaultValue={defaults?.name}
          required
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Slug (optional)
        <input
          name="slug"
          defaultValue={defaults?.slug}
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <MediaField
        name="logo"
        label="Logo"
        folder={`${folder}/logo`}
        defaultValue={defaults?.logo ?? ""}
        accept="image/*"
        kind="image"
      />
      <label className="flex flex-col gap-1 text-sm">
        Description
        <textarea
          name="description"
          defaultValue={defaults?.description}
          required
          rows={3}
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Services (comma-separated)
        <input
          name="services"
          defaultValue={defaults?.services ?? "Videography, Photography"}
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Year
        <input
          name="year"
          defaultValue={defaults?.year ?? "2026"}
          required
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <MediaField
        name="video"
        label="Hero film"
        folder={`${folder}/hero`}
        defaultValue={defaults?.video ?? ""}
        accept="video/*"
        kind="video"
      />
      <MediaField
        name="poster"
        label="Poster"
        folder={`${folder}/poster`}
        defaultValue={defaults?.poster ?? ""}
        accept="image/*"
        kind="image"
      />
      <MediaListField
        name="reels"
        label="Reels"
        folder={`${folder}/reels`}
        defaultValue={defaults?.reels ?? ""}
        accept="video/*"
        kind="video"
      />
      <MediaListField
        name="photos"
        label="Photos"
        folder={`${folder}/photos`}
        defaultValue={defaults?.photos ?? ""}
        accept="image/*"
        kind="image"
      />
      <label className="flex flex-col gap-1 text-sm">
        Sort order
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaults?.sortOrder ?? 0}
          className="rounded border border-line bg-bg-2 px-3 py-2 text-heading"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input name="published" type="checkbox" defaultChecked={defaults?.published ?? true} />
        Published
      </label>
      <button type="submit" className="w-fit rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2">
        {id ? "Save changes" : "Create case study"}
      </button>
    </form>
  );
}
