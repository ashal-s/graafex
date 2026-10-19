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
