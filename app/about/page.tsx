import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutTeam from "@/components/AboutTeam";
import ScrollParallax from "@/components/ScrollParallax";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { aboutServices, site } from "@/lib/content";

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
            </Reveal>
          </div>
        </section>

        {/* White band with orange elements */}
        <section className="section-white relative z-[2] overflow-hidden">
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -right-14 -top-16 h-[11rem] w-[11rem] text-accent md:-right-12 md:-top-28 md:h-[18rem] md:w-[18rem]"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="200" cy="200" r="190" strokeWidth="2" />
            <circle cx="200" cy="200" r="140" strokeWidth="2" opacity="0.6" />
            <circle cx="200" cy="200" r="90" strokeWidth="2" opacity="0.35" />
            <circle cx="200" cy="200" r="40" fill="currentColor" stroke="none" />
          </svg>
          <div className="container-x relative py-[clamp(4rem,8vw,7rem)]">
            <Reveal className="mb-10 md:mb-14">
              <Eyebrow>What we offer</Eyebrow>
            </Reveal>
            <ul className="border-t border-line">
              {aboutServices.map((sv, i) => (
                <li key={sv.title} className="border-b border-line">
                  <Reveal className="flex flex-col gap-3 py-8 md:flex-row md:items-baseline md:justify-between md:gap-10">
                    <h3
                      className="parallax t-h2 flex items-baseline gap-5 font-semibold text-heading"
                      style={{ "--x": `${i % 2 ? -24 : 24}px` } as React.CSSProperties}
                    >
                      <span className="t-h5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {sv.title}
                    </h3>
                    <p className="t-small max-w-[20rem] md:text-right">{sv.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-14 md:mt-16">
              <SwooshButton href={`mailto:${site.email}`}>Start a project</SwooshButton>
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
