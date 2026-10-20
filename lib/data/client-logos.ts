import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db/mongo";
import { COLLECTIONS, type ClientLogoDoc } from "@/lib/db/types";

export const CLIENT_LOGOS_TAG = "client-logos";

export type ClientLogo = {
  id?: string;
  name: string;
  image?: string;
};

export type AdminClientLogo = {
  id: string;
  name: string;
  image: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function toAdmin(doc: ClientLogoDoc): AdminClientLogo {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    image: doc.image,
    sortOrder: doc.sortOrder,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function fetchClientLogos(): Promise<ClientLogo[]> {
  const rows = await getDb()
    .collection<ClientLogoDoc>(COLLECTIONS.clientLogos)
    .find({ published: true })
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  return rows.map((r) => ({
    id: r._id.toHexString(),
    name: r.name,
    image: r.image ?? undefined,
  }));
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return unstable_cache(fetchClientLogos, ["client-logos-list"], {
    tags: [CLIENT_LOGOS_TAG],
    revalidate: 60,
  })();
}

/** Uncached — for admin. */
export async function listAllClientLogos(): Promise<AdminClientLogo[]> {
  const rows = await getDb()
    .collection<ClientLogoDoc>(COLLECTIONS.clientLogos)
    .find({})
    .sort({ sortOrder: 1, name: 1 })
    .toArray();
  return rows.map(toAdmin);
}

export async function getClientLogoById(
  id: string,
): Promise<AdminClientLogo | null> {
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;
  const doc = await getDb()
    .collection<ClientLogoDoc>(COLLECTIONS.clientLogos)
    .findOne({ _id: new ObjectId(id) });
  return doc ? toAdmin(doc) : null;
}
