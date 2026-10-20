import { MongoClient, type Db } from "mongodb";
import { COLLECTIONS } from "@/lib/db/types";

declare global {
  // eslint-disable-next-line no-var
  var __graafexMongo:
    | { client: MongoClient; db: Db; indexesReady?: Promise<void> }
    | undefined;
}

function requireUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  return uri;
}

function dbNameFromUri(uri: string) {
  try {
    const path = new URL(uri).pathname.replace(/^\//, "");
    return path.split("/")[0] || "graafex";
  } catch {
    return "graafex";
  }
}

async function ensureIndexes(db: Db) {
  await db
    .collection(COLLECTIONS.caseStudies)
    .createIndex({ slug: 1 }, { unique: true });
}

export function getMongoClient() {
  if (!globalThis.__graafexMongo) {
    const uri = requireUri();
    const client = new MongoClient(uri);
    const db = client.db(dbNameFromUri(uri));
    globalThis.__graafexMongo = {
      client,
      db,
      indexesReady: ensureIndexes(db).catch((err) => {
        console.error("[mongo] ensureIndexes failed", err);
      }),
    };
  }
  return globalThis.__graafexMongo.client;
}

export function getDb() {
  if (!globalThis.__graafexMongo) {
    getMongoClient();
  }
  return globalThis.__graafexMongo!.db;
}
