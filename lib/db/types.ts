import type { ObjectId } from "mongodb";

export type PortfolioVideoDoc = {
  _id: ObjectId;
  title: string;
  src: string | null;
  poster: string | null;
  palette: [string, string];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientLogoDoc = {
  _id: ObjectId;
  name: string;
  image: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CaseStudyReel = {
  url: string;
  sortOrder: number;
};

export type CaseStudyPhoto = {
  url: string;
  alt?: string | null;
  sortOrder: number;
};

export type CaseStudyDoc = {
  _id: ObjectId;
  slug: string;
  name: string;
  logo: string | null;
  description: string;
  services: string[];
  year: string;
  video: string;
  poster: string | null;
  reels: CaseStudyReel[];
  photos: CaseStudyPhoto[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const COLLECTIONS = {
  portfolioVideos: "portfolio_videos",
  caseStudies: "case_studies",
  clientLogos: "client_logos",
} as const;
