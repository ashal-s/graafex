import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { getDb, getMongoClient } from "@/lib/db/mongo";

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
  var __graafexAuth: Auth | undefined;
}

function getAuth(): Auth {
  if (!globalThis.__graafexAuth) {
    globalThis.__graafexAuth = createAuth();
  }
  return globalThis.__graafexAuth;
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
