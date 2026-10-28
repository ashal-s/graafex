import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PageStage from "@/components/PageStage";

export default function Home() {
  return (
    <>
      <Nav />
      <PageStage>
        <main id="main">
          <Hero />
        </main>
      </PageStage>
      <Footer />
    </>
  );
}
