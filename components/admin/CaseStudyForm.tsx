import { LabelButton } from "@/components/admin/IconButton";
import { IconSave } from "@/components/admin/icons";
import MediaField from "@/components/admin/MediaField";
import MediaListField from "@/components/admin/MediaListField";
import PublishToggle from "@/components/admin/PublishToggle";
import { AdminPanel, adminFieldClass, adminLabelClass } from "@/components/admin/ui";

export type CaseStudyFormDefaults = {
  name: string;
  slug: string;
  logo: string;
  description: string;
  services: string;
  year: string;
  video: string;
  thumbnail: string;
  reels: string;
  photos: string;
  sortOrder: number;
  published: boolean;
};

export default function CaseStudyForm({
  id,
  defaults,
  saveToken,
}: {
  id?: string;
  defaults?: Partial<CaseStudyFormDefaults>;
  saveToken: string;
}) {
  const folder = `case-studies/${defaults?.slug || "new"}`;

  return (
    <AdminPanel className="max-w-3xl p-5 sm:p-6">
      <form action="/api/admin/save-case-study" method="post" className="grid gap-5">
        <input type="hidden" name="saveToken" value={saveToken} />
        {id && <input type="hidden" name="id" value={id} />}
        <label className={adminLabelClass}>
          Name
          <input
            name="name"
            defaultValue={defaults?.name}
            required
            className={adminFieldClass}
          />
        </label>
        <label className={adminLabelClass}>
          Slug (optional)
          <input
            name="slug"
            defaultValue={defaults?.slug}
            className={adminFieldClass}
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
        <label className={adminLabelClass}>
          Description
          <textarea
            name="description"
            defaultValue={defaults?.description}
            required
            rows={3}
            className={adminFieldClass}
          />
        </label>
        <label className={adminLabelClass}>
          Services (comma-separated)
          <input
            name="services"
            defaultValue={defaults?.services ?? "Videography, Photography"}
            className={adminFieldClass}
          />
        </label>
        <label className={adminLabelClass}>
          Year
          <input
            name="year"
            defaultValue={defaults?.year ?? "2026"}
            required
            className={adminFieldClass}
          />
        </label>
        <MediaField
          name="video"
          label="Hero film"
          folder={`${folder}/hero`}
          defaultValue={defaults?.video ?? ""}
          accept="video/*"
          kind="video"
          fitAspect
        />
        <MediaField
          name="thumbnail"
          label="Thumbnail"
          folder={`${folder}/thumbnails`}
          defaultValue={defaults?.thumbnail ?? ""}
          accept="image/*"
          kind="image"
          hint="Optional still shown before the hero film plays on the case study page."
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
        <label className={adminLabelClass}>
          Sort order
          <input
            name="sortOrder"
            type="number"
            defaultValue={defaults?.sortOrder ?? 0}
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
