import Nav from "@/components/Nav";
import StickyStories from "@/components/StickyStories";
import WorkCards from "@/components/WorkCards";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <Nav />
      <main id="main">
        <StickyStories />
        <WorkCards />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
