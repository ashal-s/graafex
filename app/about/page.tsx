import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutTeam from "@/components/AboutTeam";
import ScrollParallax from "@/components/ScrollParallax";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { aboutServices, site } from "@/lib/content";

export const metadata = { title: "About" };

// One line icon per service, in the order of `aboutServices`.
const serviceIcons = [
  // Videography
  <g key="video">
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10.5 21 7v10l-5-3.5" />
  </g>,
  // Content creation
  <g key="content">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <circle cx="17" cy="17" r="4" />
  </g>,
  // Graphic design
  <g key="design">
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.6 7.6" />
    <circle cx="11" cy="11" r="1.5" />
  </g>,
  // Influencer marketing
  <g key="influencer">
    <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </g>,
];

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
        <section className="section-white relative z-[2] overflow-hidden" id="what-we-offer">
          <div className="container-x relative py-[clamp(4rem,8vw,7rem)]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
              {/* Intro — stays in view while the cards scroll past */}
              <Reveal className="lg:sticky lg:top-32 lg:self-start">
                <Eyebrow>What we offer</Eyebrow>
                <h2 className="t-h2 max-w-[14ch] font-semibold text-heading">Four disciplines, one creative team.</h2>
                <p className="t-large mt-6 max-w-[28rem]">
                  From the first idea to the final cut, everything is made in-house, so your story stays consistent
                  wherever it appears.
                </p>
                <div className="mt-10">
                  <SwooshButton href={`mailto:${site.email}`}>Start a project</SwooshButton>
                </div>
              </Reveal>

              {/* Service cards */}
              <ul className="grid gap-4 sm:grid-cols-2">
                {aboutServices.map((sv, i) => (
                  <li key={sv.title}>
                    <Reveal delay={(i % 2) * 90}>
                      <article className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[var(--radius-small)] border border-line p-6 md:min-h-[19rem] md:p-8">
                        {/* Orange fill sweeps up on hover */}
                        <span
                          aria-hidden
                          className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0"
                        />
                        <div className="relative flex items-start justify-between">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white transition-colors duration-500 group-hover:bg-white group-hover:text-accent">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              {serviceIcons[i % serviceIcons.length]}
                            </svg>
                          </span>
                          <span className="t-h5 font-semibold tabular-nums text-accent transition-colors duration-500 group-hover:text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="relative mt-10">
                          <h3 className="t-h4 font-semibold text-heading transition-colors duration-500 group-hover:text-white">
                            {sv.title}
                          </h3>
                          <p className="t-small mt-3 max-w-[18rem] transition-colors duration-500 group-hover:text-white/90">
                            {sv.body}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
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
