import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const portfolioVideos = pgTable("portfolio_videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  src: text("src"),
  poster: text("poster"),
  palette: jsonb("palette").$type<[string, string]>().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const caseStudies = pgTable("case_studies", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  logo: text("logo"),
  description: text("description").notNull(),
  services: text("services").array().notNull().default([]),
  year: varchar("year", { length: 16 }).notNull(),
  video: text("video").notNull(),
  poster: text("poster"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const caseStudyReels = pgTable("case_study_reels", {
  id: uuid("id").defaultRandom().primaryKey(),
  caseStudyId: uuid("case_study_id")
    .notNull()
    .references(() => caseStudies.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const caseStudyPhotos = pgTable("case_study_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  caseStudyId: uuid("case_study_id")
    .notNull()
    .references(() => caseStudies.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Admin portal access requests — Neon Auth handles passwords; we gate the CMS. */
export const adminMembers = pgTable("admin_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull().default(""),
  status: varchar("status", { length: 32 }).notNull().default("pending"), // pending | approved | rejected
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  reviewedByEmail: varchar("reviewed_by_email", { length: 320 }),
});
