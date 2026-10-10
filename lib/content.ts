// All copy is placeholder — swap in real Graafex content.

export const site = {
  name: "Graafex",
  email: "hello@graafex.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
];

export const hero = {
  loader: ["Every idea", "starts somewhere."],
  heading: "Brands built to stand out and strategy built to last.",
};

export const clientLogos = ["Lumen", "Orbitra", "Kestrel", "Nova&Co", "Fieldhouse", "Meridian", "Parallel", "Quarry", "Sable", "Tidewater"];

export const aboutServices = [
  { title: "Videography", body: "Brand films, social video and cinematic storytelling." },
  { title: "Content Creation", body: "Scroll-stopping content shaped around your audience." },
  { title: "Graphic Design", body: "Identities and visuals that look sharp everywhere." },
  { title: "Influencer Marketing", body: "The right voices, carrying your message further." },
];

// ---- Portfolio -------------------------------------------------------------
// Placeholder media: drop files in /public/videos/portfolio (or /public/portfolio)
// and set `src` / `poster` — items without one render an animated gradient.

type Palette = [string, string];

// Temporary: every tile uses the hero video until real films are supplied.
const HERO_VIDEO = "/videos/hero_video.mp4";

export const portfolioVideos: {
  title: string;
  src?: string;
  poster?: string;
  palette: Palette;
}[] = [
  { title: "Northwind Gallery", src: HERO_VIDEO, palette: ["#ff4d00", "#7a2a0a"] },
  { title: "Harbour Collective", src: HERO_VIDEO, palette: ["#ff7a33", "#3a1208"] },
  { title: "Atlas Athletics", src: HERO_VIDEO, palette: ["#ff9a5c", "#4a1a08"] },
  { title: "Lumen Studio", src: HERO_VIDEO, palette: ["#e03d00", "#2a0f06"] },
  { title: "Fieldhouse", src: HERO_VIDEO, palette: ["#ff7a33", "#ffd9bf"] },
  { title: "Meridian Health", src: HERO_VIDEO, palette: ["#c23a00", "#ff9a5c"] },
];
