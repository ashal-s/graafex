import Link from "next/link";
import { deletePortfolioVideo } from "@/app/admin/actions";
import UploadField from "@/components/admin/UploadField";
import { listAllPortfolioVideos } from "@/lib/data/portfolio";
import { savePortfolioVideo } from "@/app/admin/actions";

export default async function AdminPortfolioPage() {
  const videos = await listAllPortfolioVideos();

  return (
    <div className="grid gap-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="t-h3 font-semibold text-heading">Portfolio videos</h1>
          <p className="mt-1 text-sm text-body">Hover-play tiles on /portfolio.</p>
        </div>
        <Link href="/admin" className="text-sm underline">
          Back
        </Link>
      </div>

      <section className="rounded-[var(--radius-main)] border border-line bg-bg-2 p-6">
        <h2 className="mb-4 font-semibold text-heading">Add video</h2>
        <form action={savePortfolioVideo} className="grid gap-3">
          <label className="flex flex-col gap-1 text-sm">
            Title
            <input name="title" required className="rounded border border-line bg-bg px-3 py-2 text-heading" />
          </label>
          <UploadField name="src" label="Video URL" folder="portfolio" accept="video/*" />
          <UploadField name="poster" label="Poster URL (optional)" folder="portfolio/posters" accept="image/*" />
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Palette A
              <input name="paletteA" defaultValue="#ff4d00" className="rounded border border-line bg-bg px-3 py-2 text-heading" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Palette B
              <input name="paletteB" defaultValue="#7a2a0a" className="rounded border border-line bg-bg px-3 py-2 text-heading" />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            Sort order
            <input name="sortOrder" type="number" defaultValue={videos.length} className="rounded border border-line bg-bg px-3 py-2 text-heading" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="published" type="checkbox" defaultChecked />
            Published
          </label>
          <button type="submit" className="rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2">
            Save
          </button>
        </form>
      </section>

      <ul className="grid gap-4">
        {videos.map((v) => (
          <li key={v.id} className="rounded-[var(--radius-main)] border border-line p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-heading">{v.title}</p>
                <p className="mt-1 break-all font-mono text-xs text-body">{v.src ?? "(no src)"}</p>
              </div>
              <form action={deletePortfolioVideo}>
                <input type="hidden" name="id" value={v.id} />
                <button type="submit" className="text-xs text-accent underline">
                  Delete
                </button>
              </form>
            </div>
            <form action={savePortfolioVideo} className="grid gap-3">
              <input type="hidden" name="id" value={v.id} />
              <label className="flex flex-col gap-1 text-sm">
                Title
                <input name="title" defaultValue={v.title} required className="rounded border border-line bg-bg-2 px-3 py-2 text-heading" />
              </label>
              <UploadField name="src" label="Video URL" folder="portfolio" defaultValue={v.src ?? ""} accept="video/*" />
              <UploadField name="poster" label="Poster URL" folder="portfolio/posters" defaultValue={v.poster ?? ""} accept="image/*" />
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-sm">
                  Palette A
                  <input name="paletteA" defaultValue={v.palette[0]} className="rounded border border-line bg-bg-2 px-3 py-2 text-heading" />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Palette B
                  <input name="paletteB" defaultValue={v.palette[1]} className="rounded border border-line bg-bg-2 px-3 py-2 text-heading" />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm">
                Sort order
                <input name="sortOrder" type="number" defaultValue={v.sortOrder} className="rounded border border-line bg-bg-2 px-3 py-2 text-heading" />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input name="published" type="checkbox" defaultChecked={v.published} />
                Published
              </label>
              <button type="submit" className="w-fit rounded bg-accent px-4 py-2 text-sm font-semibold text-bg-2">
                Update
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
