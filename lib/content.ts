// All copy is placeholder — swap in real Studiofex content.

export const site = {
  name: "Studiofex",
  email: "hello@studiofex.com",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

export const hero = {
  loader: ["Strategy, design", "& film."],
  heading: "Studiofex has helped brands 10× their social media reach in 60 days.",
};

/** Fallback names if no logos are published in the admin CMS yet. */
export const clientLogos = ["Lumen", "Orbitra", "Kestrel", "Nova&Co", "Fieldhouse", "Meridian", "Parallel", "Quarry", "Sable", "Tidewater"];

export const aboutServices = [
  { title: "Videography", body: "Brand films, social video and cinematic storytelling." },
  { title: "Content Creation", body: "Scroll-stopping content shaped around your audience." },
  { title: "Graphic Design", body: "Identities and visuals that look sharp everywhere." },
  { title: "Influencer Marketing", body: "The right voices, carrying your message further." },
];

export type PricingPackage = {
  name: string;
  price: string;
  period?: string;
  features: string[];
};

export const oneOffPackages: PricingPackage[] = [
  {
    name: "Social Content package",
    price: "$1,200",
    features: [
      "2 reels (40–60 seconds)",
      "3 short reels (7–10 seconds)",
      "2–4 hours shoot",
    ],
  },
  {
    name: "Event Coverage",
    price: "$1,800",
    features: [
      "Up to 8 hours of event coverage",
      "Up to 250 photos",
      "1 event highlight film (2–4 mins)",
      "2 teaser reels (10–15 seconds)",
    ],
  },
  {
    name: "Brand Story Film",
    price: "$2,500",
    features: [
      "Creative direction and storytelling",
      "1 brand documentary (3–5 mins)",
      "3 reels for build-up (10–15 seconds)",
      "Up to 50 photos",
    ],
  },
];

export const monthlyPackages: PricingPackage[] = [
  {
    name: "Social Essentials",
    price: "$2,000",
    period: "/month",
    features: [
      "2 reels a week (40–60 seconds)",
      "Content strategy and planning",
      "Monthly content calendar",
    ],
  },
  {
    name: "Social Growth",
    price: "$3,200",
    period: "/month",
    features: [
      "5 reels a week (40–60 seconds)",
      "Monthly photoshoot",
      "Content strategy and planning",
      "Monthly content calendar",
    ],
  },
];

// Portfolio films and case studies are stored in MongoDB + R2.
// Manage them at /admin (see README).
