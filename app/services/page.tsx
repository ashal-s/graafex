import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageStage from "@/components/PageStage";
import { Eyebrow, Reveal, SwooshButton } from "@/components/ui";
import {
  aboutServices,
  monthlyPackages,
  oneOffPackages,
  site,
  type PricingPackage,
} from "@/lib/content";

export const metadata = { title: "Services" };

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

function PricingCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  return (
    <Reveal delay={(index % 3) * 80}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-main)] bg-accent px-7 py-8 md:px-9 md:py-10">
        {/* Black sweep on hover — colour only, no scale or border change */}
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full bg-bg transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0"
        />

        <div className="relative font-[family-name:var(--font-body)] [font-variant-numeric:lining-nums_tabular-nums]">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[clamp(2rem,1.55rem+1.6vw,2.75rem)] font-semibold leading-none tracking-normal text-white">
              {pkg.price}
            </span>
            {pkg.period && (
              <span className="text-[0.95rem] font-medium leading-none tracking-normal text-white/70">
                {pkg.period}
              </span>
            )}
          </p>

          <h3 className="mt-8 max-w-[14ch] t-h4 font-semibold text-white">{pkg.name}</h3>

          <ul className="mt-8 flex flex-1 flex-col gap-0 border-t border-white/25 pt-2">
            {pkg.features.map((feature) => (
              <li
                key={feature}
                className="t-small flex gap-3 border-b border-white/20 py-3.5 text-white/90 last:border-b-0"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <>
      <Nav />
      <PageStage>
      <main id="main">
        <section className="relative z-[2] overflow-hidden">
          <div className="container-x relative pb-[clamp(3rem,6vw,5rem)] pt-[clamp(9rem,16vw,14rem)]">
            <Reveal className="max-w-[60rem]">
              <Eyebrow>Services</Eyebrow>
              <h1 className="t-h1 font-semibold text-heading">Made in-house, end to end.</h1>
              <p className="t-large mt-8 max-w-[36rem]">
                Four disciplines under one roof, plus clear packages for social, events and brand film, whether you
                need a one-off shoot or a monthly content engine.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Disciplines — dark theme */}
        <section className="relative z-[2] overflow-hidden" id="what-we-offer">
          <div className="container-x relative py-[clamp(4rem,8vw,7rem)]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
              <Reveal className="lg:sticky lg:top-32 lg:self-start">
                <Eyebrow>What we offer</Eyebrow>
                <h2 className="t-h2 max-w-[14ch] font-semibold text-heading">Four disciplines, one creative team.</h2>
                <p className="t-large mt-6 max-w-[28rem]">
                  From the first idea to the final cut, everything is made in-house, so your story stays consistent
                  wherever it appears.
                </p>
                <div className="mt-10">
                  <SwooshButton href={`mailto:${site.email}`} className="!text-white hover:!text-bg">
                    Start a project
                  </SwooshButton>
                </div>
              </Reveal>

              <ul className="grid gap-4 sm:grid-cols-2">
                {aboutServices.map((sv, i) => (
                  <li key={sv.title}>
                    <Reveal delay={(i % 2) * 90}>
                      <article className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[var(--radius-small)] border border-line p-6 font-[family-name:var(--font-body)] md:min-h-[19rem] md:p-8">
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
                          <span className="t-h5 font-semibold tabular-nums [font-variant-numeric:lining-nums_tabular-nums] text-accent transition-colors duration-500 group-hover:text-white">
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

        {/* Pricing — white band for both tiers */}
        <section className="section-white relative z-[2] overflow-hidden" id="packages">
          <div className="container-x relative py-[clamp(4rem,8vw,7rem)]">
            <Reveal className="mb-12 max-w-[40rem] md:mb-16">
              <Eyebrow>One-off packages</Eyebrow>
              <h2 className="t-h2 font-semibold text-heading">Shoot once. Deliver sharp.</h2>
              <p className="t-large mt-6">
                Clear scopes for social content, events and brand film. Pick a package or tell us what you need.
              </p>
            </Reveal>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {oneOffPackages.map((pkg, i) => (
                <li key={pkg.name}>
                  <PricingCard pkg={pkg} index={i} />
                </li>
              ))}
            </ul>

            <Reveal className="mb-12 mt-[clamp(4rem,8vw,7rem)] max-w-[40rem] md:mb-16">
              <Eyebrow>Monthly packages</Eyebrow>
              <h2 className="t-h2 font-semibold text-heading">A content engine on retainer.</h2>
              <p className="t-large mt-6">
                Ongoing reels, strategy and calendars so your channels stay consistent without the scramble.
              </p>
            </Reveal>
            <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {monthlyPackages.map((pkg, i) => (
                <li key={pkg.name}>
                  <PricingCard pkg={pkg} index={i} />
                </li>
              ))}
            </ul>

            <Reveal className="mt-14 md:mt-16">
              <p className="t-large max-w-[32rem]">
                Need something outside these packages? We build custom scopes around your brief.
              </p>
              <div className="mt-8">
                <SwooshButton href={`mailto:${site.email}`} className="!text-white hover:!text-white">
                  Talk to us
                </SwooshButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      </PageStage>
      <Footer />
    </>
  );
}
