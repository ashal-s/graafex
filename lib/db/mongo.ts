import { MongoClient, type Db, type MongoClientOptions } from "mongodb";
import { COLLECTIONS } from "@/lib/db/types";

type MongoCache = {
  client: MongoClient;
  db: Db;
  indexesReady?: Promise<void>;
};

declare global {
  // eslint-disable-next-line no-var
  var __studiofexMongo: MongoCache | undefined;
}

type TopologyLike = {
  isConnected?: () => boolean;
  s?: { state?: string };
};

/** A failed connect() or client.close() must not be reused. */
function isClientClosed(client: MongoClient) {
  const internal = client as MongoClient & {
    topology?: TopologyLike;
    s?: { hasBeenClosed?: boolean };
  };
  if (internal.s?.hasBeenClosed) return true;
  const topology = internal.topology;
  if (!topology) return false;
  if (topology.isConnected?.()) return false;
  const state = topology.s?.state;
  return state === "closed" || state === "closing";
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

/**
 * Vercel (Node 24) races IPv6 first. Atlas rejects that handshake with TLS
 * alert 80, which breaks sign-in. Force IPv4 only there.
 * Set MONGODB_FORCE_IPV4=1 to force it anywhere, or =0 to keep the default
 * (needed if the database host is IPv6-only).
 */
function clientOptions(): MongoClientOptions {
  const options: MongoClientOptions = { serverMonitoringMode: "poll" };
  const forceIpv4 = process.env.MONGODB_FORCE_IPV4;
  const useIpv4 =
    forceIpv4 === "1" || (forceIpv4 !== "0" && process.env.VERCEL === "1");
  if (useIpv4) {
    options.autoSelectFamily = false;
    options.family = 4;
  }
  return options;
}

function createCache(): MongoCache {
  const uri = requireUri();
  const client = new MongoClient(uri, clientOptions());
  const db = client.db(dbNameFromUri(uri));
  const cache = { client, db };
  globalThis.__studiofexMongo = cache;
  return cache;
}

function dropCache(cache: MongoCache) {
  if (globalThis.__studiofexMongo === cache) {
    globalThis.__studiofexMongo = undefined;
  }
  void cache.client.close().catch(() => {});
}

export function getMongoClient() {
  const cached = globalThis.__studiofexMongo;
  if (cached && !isClientClosed(cached.client)) return cached.client;
  if (cached) dropCache(cached);
  return createCache().client;
}

/** Connect before auth queries so a closed topology is replaced, not reused. */
export async function connectMongo() {
  const cached = globalThis.__studiofexMongo;
  if (cached && isClientClosed(cached.client)) dropCache(cached);
  const cache = globalThis.__studiofexMongo ?? createCache();
  try {
    await cache.client.connect();
  } catch (err) {
    dropCache(cache);
    throw err;
  }
  if (!cache.indexesReady) {
    cache.indexesReady = ensureIndexes(cache.db).catch((err) => {
      console.error("[mongo] ensureIndexes failed", err);
      throw err;
    });
  }
  await cache.indexesReady;
  return cache.client;
}

export function getDb() {
  if (!globalThis.__studiofexMongo) {
    getMongoClient();
  }
  return globalThis.__studiofexMongo!.db;
}
