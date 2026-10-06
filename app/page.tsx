import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StickyStories from "@/components/StickyStories";
import WorkCards from "@/components/WorkCards";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StickyStories />
        <WorkCards />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
