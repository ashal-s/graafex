import { and, count, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { adminMembers } from "@/db/schema";

export type AdminStatus = "pending" | "approved" | "rejected";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAllowlisted(email: string) {
  const allow = process.env.ADMIN_EMAIL_ALLOWLIST?.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!allow?.length) return false;
  return allow.includes(normalizeEmail(email));
}

export async function countApprovedAdmins() {
  const db = getDb();
  const [row] = await db
    .select({ n: count() })
    .from(adminMembers)
    .where(eq(adminMembers.status, "approved"));
  return Number(row?.n ?? 0);
}

export async function getMemberByEmail(email: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(adminMembers)
    .where(eq(adminMembers.email, normalizeEmail(email)))
    .limit(1);
  return row ?? null;
}

/** Create or refresh a member row after Neon Auth sign-up. */
export async function registerAdminRequest(email: string, name: string): Promise<AdminStatus> {
  const db = getDb();
  const normalized = normalizeEmail(email);
  const existing = await getMemberByEmail(normalized);
  if (existing) return existing.status as AdminStatus;

  const approvedCount = await countApprovedAdmins();
  const status: AdminStatus = approvedCount === 0 || isAllowlisted(normalized) ? "approved" : "pending";

  await db.insert(adminMembers).values({
    email: normalized,
    name: name.trim() || "Admin",
    status,
    reviewedAt: status === "approved" ? new Date() : null,
    reviewedByEmail: status === "approved" ? "system" : null,
  });

  return status;
}

/**
 * Ensure the signed-in user has a membership row.
 * Bootstraps the first admin (empty table) as approved so existing accounts keep working.
 */
export async function resolveAdminAccess(email: string, name?: string | null): Promise<AdminStatus> {
  const normalized = normalizeEmail(email);
  const existing = await getMemberByEmail(normalized);
  if (existing) return existing.status as AdminStatus;

  const approvedCount = await countApprovedAdmins();
  if (approvedCount === 0 || isAllowlisted(normalized)) {
    await getDb().insert(adminMembers).values({
      email: normalized,
      name: name?.trim() || "Admin",
      status: "approved",
      reviewedAt: new Date(),
      reviewedByEmail: "system",
    });
    return "approved";
  }

  await getDb().insert(adminMembers).values({
    email: normalized,
    name: name?.trim() || "Admin",
    status: "pending",
  });
  return "pending";
}

export async function listPendingAdmins() {
  return getDb()
    .select()
    .from(adminMembers)
    .where(eq(adminMembers.status, "pending"))
    .orderBy(desc(adminMembers.createdAt));
}

export async function listAllAdmins() {
  return getDb().select().from(adminMembers).orderBy(desc(adminMembers.createdAt));
}

export async function setAdminStatus(id: string, status: AdminStatus, reviewerEmail: string) {
  await getDb()
    .update(adminMembers)
    .set({
      status,
      reviewedAt: new Date(),
      reviewedByEmail: normalizeEmail(reviewerEmail),
    })
    .where(and(eq(adminMembers.id, id)));
}
