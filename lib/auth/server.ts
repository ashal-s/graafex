import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { connectMongo, getDb, getMongoClient } from "@/lib/db/mongo";

function createAuth() {
  const client = getMongoClient();
  const db = getDb();
  return betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    plugins: [
      admin({
        defaultRole: "admin",
      }),
      nextCookies(),
    ],
  });
}

type Auth = ReturnType<typeof createAuth>;

declare global {
  // eslint-disable-next-line no-var
  var __studiofexAuth: Auth | undefined;
}

let authClient: ReturnType<typeof getMongoClient> | undefined;

function getAuth(): Auth {
  const client = getMongoClient();
  // A replaced client (after "Topology is closed") must not keep the old adapter.
  if (!globalThis.__studiofexAuth || authClient !== client) {
    authClient = client;
    globalThis.__studiofexAuth = createAuth();
  }
  return globalThis.__studiofexAuth;
}

/** Open Mongo before an auth call so sign-in does not hit a closed topology. */
export async function ensureAuthDb() {
  const client = await connectMongo();
  if (authClient !== client) {
    authClient = client;
    globalThis.__studiofexAuth = createAuth();
  }
}

/**
 * Lazy proxy so importing this module during `next build` does not require
 * MONGODB_URI until auth is actually used at runtime.
 */
export const auth: Auth = new Proxy({} as Auth, {
  get(_target, prop, receiver) {
    const instance = getAuth();
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});
