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

// Temporary: every tile uses the hero video (and its thumbnail for stills) until real media is supplied.
const HERO_VIDEO = "/videos/hero_video.mp4";
const HERO_THUMB = "/videos/hero-poster.jpg";

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

type Still = {
  title: string;
  ratio: "portrait" | "landscape" | "square";
  src?: string;
  palette: Palette;
};

export type CaseStudyData = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  palette: Palette;
  video: { src?: string; poster?: string };
  meta: { label: string; value: string }[];
  reels: { title: string; src?: string; palette: Palette }[];
  gallery: Still[];
};

// One entry per case study — each carries its own film, reels and a gallery of photography and graphic design.
export const caseStudies: CaseStudyData[] = [
  {
    slug: "pharmaceutical-development-conference",
    client: "Pharmaceutical Development Conference",
    title: "Pharmaceutical Development Conference",
    summary:
      "Placeholder: a short summary of what we made for the Pharmaceutical Development Conference and why it mattered.",
    palette: ["#5c4a78", "#8a74b0"],
    video: { src: HERO_VIDEO },
    meta: [
      { label: "Client", value: "Pharmaceutical Development Conference" },
      { label: "Year", value: "2025" },
      { label: "Services", value: "Videography, Content Creation" },
    ],
    reels: [
      { title: "Reel 1", src: HERO_VIDEO, palette: ["#5c4a78", "#c6c6e2"] },
      { title: "Reel 2", src: HERO_VIDEO, palette: ["#8a74b0", "#241c32"] },
      { title: "Reel 3", src: HERO_VIDEO, palette: ["#9b9bc8", "#5c4a78"] },
      { title: "Reel 4", src: HERO_VIDEO, palette: ["#6e5a94", "#e2e2f0"] },
    ],
    gallery: [
      { title: "Image 1", ratio: "portrait", src: HERO_THUMB, palette: ["#5c4a78", "#c6c6e2"] },
      { title: "Image 2", ratio: "landscape", src: HERO_THUMB, palette: ["#8a74b0", "#241c32"] },
      { title: "Image 3", ratio: "square", src: HERO_THUMB, palette: ["#4a3a68", "#e2e2f0"] },
      { title: "Image 4", ratio: "landscape", src: HERO_THUMB, palette: ["#6e5a94", "#9b9bc8"] },
      { title: "Image 5", ratio: "portrait", src: HERO_THUMB, palette: ["#9b9bc8", "#3a2e52"] },
      { title: "Image 6", ratio: "square", src: HERO_THUMB, palette: ["#7e6ea8", "#241c32"] },
      { title: "Image 7", ratio: "landscape", src: HERO_THUMB, palette: ["#6e5a94", "#30283c"] },
      { title: "Image 8", ratio: "portrait", src: HERO_THUMB, palette: ["#5c4a78", "#9b9bc8"] },
      { title: "Image 9", ratio: "square", src: HERO_THUMB, palette: ["#8a74b0", "#c6c6e2"] },
      { title: "Image 10", ratio: "landscape", src: HERO_THUMB, palette: ["#8a74b0", "#241c32"] },
    ],
  },
];
