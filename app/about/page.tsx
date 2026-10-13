import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutTeam from "@/components/AboutTeam";
import ScrollParallax from "@/components/ScrollParallax";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <Nav />
      <ScrollParallax />
      <main id="main">
        {/* Dark start */}
        <section className="relative z-[2] overflow-hidden">
          <div className="parallax absolute inset-x-0 -inset-y-[20%]" style={{ "--y": "-140px" } as React.CSSProperties}>
            <Media seed={5} palette={["#ff4d00", "#7a2a0a"]} className="!absolute inset-0 opacity-50" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--bg)_70%)]" />
          <div className="container-x relative pb-[clamp(4rem,8vw,7rem)] pt-[clamp(9rem,16vw,14rem)]">
            <Reveal className="max-w-[60rem]">
              <Eyebrow>About us</Eyebrow>
              <h1 className="ink-fade parallax t-h1 font-semibold" style={{ "--y": "-24px" } as React.CSSProperties}>
                Brands built to stand out.
              </h1>
              <p className="t-large mt-8 max-w-[34rem]">
                Graafex is a creative studio blending strategy, design and film. We help organisations tell their
                story clearly and build brands that last.
              </p>
              <div className="mt-10">
                <SwooshButton href="/services" className="!text-white hover:!text-bg">
                  View services
                </SwooshButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Team */}
        <section className="relative z-[2] overflow-hidden">
          <div className="container-x relative py-[clamp(4rem,8vw,7rem)]">
            <Reveal className="mb-12">
              <Eyebrow>The team</Eyebrow>
            </Reveal>
            <AboutTeam />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
