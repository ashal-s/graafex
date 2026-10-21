/**
 * Bootstrap the first admin (no CLI / Node 22 required).
 *
 * Usage:
 *   SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='...' SEED_ADMIN_NAME='Admin' npm run seed:admin
 */
import { auth, ensureAuthDb } from "../lib/auth/server";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) {
    console.error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (optional SEED_ADMIN_NAME).",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("SEED_ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET) {
    console.error("MONGODB_URI and BETTER_AUTH_SECRET must be set.");
    process.exit(1);
  }

  await ensureAuthDb();
  // Calling without headers/request allows bootstrap (no existing admin session).
  const result = await auth.api.createUser({
    body: {
      email: email.toLowerCase(),
      password,
      name,
      role: "admin",
    },
  });

  const user = (result as { user?: { id?: string; email?: string } }).user ?? result;
  console.log("Admin created:", {
    id: (user as { id?: string }).id,
    email: (user as { email?: string }).email ?? email,
    name,
  });
  process.exit(0);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
