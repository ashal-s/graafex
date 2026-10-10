// All copy is placeholder — swap in real Graafex content.

export const site = {
  name: "Graafex",
  email: "hello@graafex.com",
  phone: "+00 0000 000 000",
  address: ["123 Studio Street,", "Your City 0000"],
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

export const work = [
  { name: "Northwind Gallery", tagline: "A new home for modern art", palette: ["#ff4d00", "#5c1a00"] },
  { name: "Harbour Collective", tagline: "Telling a city's forgotten stories", palette: ["#ff7a33", "#3a1208"] },
  { name: "Atlas Athletics", tagline: "Performance with a purpose", palette: ["#ff9a5c", "#1a0c08"] },
];

export const services = [
  {
    title: "Strategy, sharpened",
    body: "We define what success looks like, who you need to reach and what will move them, then map the clearest path to get there.",
    items: ["Marketing Strategy", "Brand Strategy", "Campaign Planning", "Growth Strategy", "Content Strategy", "Social Strategy"],
  },
  {
    title: "Design with intent",
    body: "We build visual systems that make your organisation clear, consistent and memorable across every touchpoint.",
    items: ["Brand Identity", "Logo Design", "UI/UX Design", "Website Design", "Web Development", "Landing Pages", "Social Design"],
  },
  {
    title: "Film with feeling",
    body: "We pair storytelling with cinematic craft to produce content that holds attention and inspires action.",
    items: ["Brand Films", "Social Video", "2D & 3D Animation", "Cinematography", "Scriptwriting", "Storyboarding", "Documentaries"],
  },
];

export const testimonials = [
  {
    quote:
      "Graafex sharpened how we talk about who we are. The work is thoughtful, strategic and has genuinely moved our numbers.",
    name: "Alex Morgan",
    role: "Director, Placeholder Co.",
  },
  {
    quote:
      "From the first workshop they understood our audience better than we did. The new brand has given our team real confidence.",
    name: "Sam Rivera",
    role: "Head of Marketing, Sample Org",
  },
  {
    quote:
      "Their film work brought our story to life and reached people we'd never been able to reach before.",
    name: "Jordan Lee",
    role: "Founder, Example Foundation",
  },
  {
    quote:
      "A true extension of our team — fast, collaborative and always focused on the result that matters.",
    name: "Taylor Chen",
    role: "CMO, Demo Group",
  },
];

export const stickyWords = ["Ideas in", "Motion"];

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
  { title: "Northwind Gallery", src: HERO_VIDEO, palette: ["#5c4a78", "#8a74b0"] },
  { title: "Harbour Collective", src: HERO_VIDEO, palette: ["#8a74b0", "#30283c"] },
  { title: "Atlas Athletics", src: HERO_VIDEO, palette: ["#9b9bc8", "#3a2e52"] },
  { title: "Lumen Studio", src: HERO_VIDEO, palette: ["#6e5a94", "#241c32"] },
  { title: "Fieldhouse", src: HERO_VIDEO, palette: ["#7e6ea8", "#c6c6e2"] },
  { title: "Meridian Health", src: HERO_VIDEO, palette: ["#4a3a68", "#9b9bc8"] },
];

export const caseStudy = {
  client: "Northwind Gallery",
  title: "A new home for modern art",
  summary:
    "Northwind was opening its doors after a four-year redevelopment. We built the story of the building, the collection and the people behind it, then carried it across film, social and print.",
  palette: ["#5c4a78", "#8a74b0"] as Palette,
  video: { src: undefined as string | undefined, poster: undefined as string | undefined },
  meta: [
    { label: "Client", value: "Northwind Gallery" },
    { label: "Year", value: "2025" },
    { label: "Services", value: "Strategy, Film, Identity" },
    { label: "Deliverables", value: "Launch film, 12 reels, campaign kit" },
  ],
  narrative: [
    { label: "The brief", body: "Introduce a reimagined gallery to a younger, wider audience without losing the trust of long-time patrons." },
    { label: "The approach", body: "A documentary-led launch film, supported by short vertical stories that put curators and artists front and centre." },
    { label: "The result", body: "Opening-month attendance beat forecast by 38%, and the launch film was the most-watched piece in the gallery's history." },
  ],
  reels: [
    { title: "The curator", src: undefined as string | undefined, palette: ["#5c4a78", "#c6c6e2"] as Palette },
    { title: "Building the space", src: undefined as string | undefined, palette: ["#8a74b0", "#241c32"] as Palette },
    { title: "Opening night", src: undefined as string | undefined, palette: ["#9b9bc8", "#5c4a78"] as Palette },
    { title: "The collection", src: undefined as string | undefined, palette: ["#6e5a94", "#e2e2f0"] as Palette },
  ],
};

export const galleryFilters = ["All", "Photography", "Graphic design"] as const;

export const gallery: {
  title: string;
  kind: Exclude<(typeof galleryFilters)[number], "All">;
  ratio: "portrait" | "landscape" | "square";
  src?: string;
  palette: Palette;
}[] = [
  { title: "Gallery opening", kind: "Photography", ratio: "portrait", palette: ["#5c4a78", "#c6c6e2"] },
  { title: "Northwind identity", kind: "Graphic design", ratio: "landscape", palette: ["#8a74b0", "#241c32"] },
  { title: "Harbour at dusk", kind: "Photography", ratio: "landscape", palette: ["#6e5a94", "#9b9bc8"] },
  { title: "Atlas poster series", kind: "Graphic design", ratio: "portrait", palette: ["#9b9bc8", "#3a2e52"] },
  { title: "Studio portraits", kind: "Photography", ratio: "square", palette: ["#4a3a68", "#e2e2f0"] },
  { title: "Fieldhouse packaging", kind: "Graphic design", ratio: "square", palette: ["#7e6ea8", "#241c32"] },
  { title: "Craft in detail", kind: "Photography", ratio: "portrait", palette: ["#5c4a78", "#9b9bc8"] },
  { title: "Meridian brand system", kind: "Graphic design", ratio: "landscape", palette: ["#8a74b0", "#c6c6e2"] },
  { title: "Behind the scenes", kind: "Photography", ratio: "landscape", palette: ["#6e5a94", "#30283c"] },
];
