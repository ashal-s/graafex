import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { getDb, getMongoClient } from "@/lib/db/mongo";

const client = getMongoClient();
const db = getDb();

export const auth = betterAuth({
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
