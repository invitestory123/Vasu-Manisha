import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Section";
import { SectionTitle, Divider } from "@/components/wedding/Ornaments";
import { WishLantern } from "@/components/wedding/WishLantern";
import { WeddingFooter } from "@/components/wedding/WeddingFooter";
import { InvitationOpener } from "@/components/wedding/InvitationOpener";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import {
  couple,
  brideDetails,
  groomDetails,
  coupleFusion,
  events,
  venues,
  downloadICS,
} from "@/lib/wedding";
import { useParallax } from "@/hooks/use-reveal";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
import mapImg from "@/assets/venue-map.jpg";
import brideImg from "@/assets/bride-ai.jpg";
import groomImg from "@/assets/groom-ai.jpg";
import coupleImg from "@/assets/couple-ai.jpg";
const ringsVignette =
  "https://media.invitestory.in/seashell-vows/src/assets/rings-seashell-vignette.png";
const floralDivider =
  "https://media.invitestory.in/seashell-vows/src/assets/bougainvillea-divider.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Joshua Vishal & Virgin Mary — Wedding Invitation | 20th November 2026" },
      {
        name: "description",
        content:
          "Together with our families, we invite you to celebrate the holy matrimony of Joshua Vishal & Virgin Mary on Friday, 20th November 2026 at Holy Ghost Church & CMA Royal Convention Hall, Bengaluru.",
      },
      { property: "og:site_name", content: "Joshua Vishal & Virgin Mary Wedding Invitation" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Joshua Vishal & Virgin Mary — Wedding Invitation | 20th November 2026",
      },
      {
        property: "og:description",
        content:
          "Together with our families, we invite you to celebrate the holy matrimony of Joshua Vishal & Virgin Mary on Friday, 20th November 2026 at Holy Ghost Church & CMA Royal Convention Hall, Bengaluru.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:secure_url", content: "/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Joshua Vishal & Virgin Mary — Wedding Invitation · 20th November 2026",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Joshua Vishal & Virgin Mary — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Together with our families, we invite you to celebrate the holy matrimony of Joshua Vishal & Virgin Mary on Friday, 20th November 2026 at Holy Ghost Church & CMA Royal Convention Hall, Bengaluru.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const drift = useParallax(0.18);
  const [musicStarted, setMusicStarted] = useState(false);

  return (
    <main className="paper overflow-x-hidden">
      {/* 1. Opening Screen with Video Opener */}
      <InvitationOpener onStartOpen={() => setMusicStarted(true)} />

      {/* Floating Background Music Player */}
      <MusicPlayer autoPlayTrigger={musicStarted} />

      {/* Hero Welcome Screen */}
      <Hero />

      {/* 2 & 3. Meet the Bride & Meet the Groom */}
      <section className="relative px-6 py-10">
        <Reveal>
          <SectionTitle overline="Together in Love" title="Bride & Groom" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {/* Meet the Bride */}
          <Reveal delay={60}>
            <article className="card-soft group overflow-hidden text-center h-full flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={brideImg}
                  alt={`${brideDetails.name} — ${brideDetails.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/45 px-3.5 py-1 text-[0.62rem] uppercase tracking-airy text-white backdrop-blur-md">
                  {brideDetails.role}
                </span>
              </div>
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                    {brideDetails.name}
                  </h3>
                  <p className="mt-1 script text-base text-primary">{brideDetails.tagline}</p>
                  <p className="mt-3 text-sm font-medium text-foreground/90 leading-snug">
                    {brideDetails.parents}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-primary/20">
                  <div className="rounded border border-primary/25 bg-secondary/50 p-3.5 text-center">
                    <span className="block text-[0.6rem] font-medium uppercase tracking-airy text-primary">
                      Cherished Blessings
                    </span>
                    <p className="mt-1 font-display text-sm leading-relaxed text-foreground/80 italic">
                      {brideDetails.grandparents}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Meet the Groom */}
          <Reveal delay={120}>
            <article className="card-soft group overflow-hidden text-center h-full flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={groomImg}
                  alt={`${groomDetails.name} — ${groomDetails.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/45 px-3.5 py-1 text-[0.62rem] uppercase tracking-airy text-white backdrop-blur-md">
                  {groomDetails.role}
                </span>
              </div>
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                    {groomDetails.name}
                  </h3>
                  <p className="mt-1 script text-base text-primary">{groomDetails.tagline}</p>
                  <p className="mt-3 text-sm font-medium text-foreground/90 leading-snug">
                    {groomDetails.parents}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-primary/20">
                  <div className="rounded border border-primary/25 bg-secondary/50 p-3.5 text-center">
                    <span className="block text-[0.6rem] font-medium uppercase tracking-airy text-primary">
                      Cherished Blessings
                    </span>
                    <p className="mt-1 font-display text-sm leading-relaxed text-foreground/80 italic">
                      {groomDetails.grandparents}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* 4. Meet the Couple */}
      <section className="relative px-6 pb-16">
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -left-12 -top-8 w-36 opacity-35"
          style={{ transform: `translate3d(0, ${drift * 0.3}px, 0)` }}
        />
        <Reveal>
          <SectionTitle overline="Two Hearts · One Vow" title="Meet the Couple" />
        </Reveal>

        <Reveal delay={60}>
          <div className="card-soft mx-auto max-w-xl overflow-hidden text-center">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden bg-muted">
              <img
                src={coupleImg}
                alt={`${couple.bride} & ${couple.groom} together`}
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
              <div className="absolute bottom-4 inset-x-0 text-center px-4">
                <span className="inline-block rounded-full border border-white/40 bg-black/45 px-4 py-1 text-[0.62rem] uppercase tracking-airy text-white backdrop-blur-md">
                  {coupleFusion.badge}
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl text-white drop-shadow-md">
                  {couple.bride} <span className="script text-2xl text-[#f4d8a1]">&amp;</span>{" "}
                  {couple.groom}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mx-auto mb-2 flex items-center justify-center text-primary/70">
                <span className="text-3xl font-display leading-none">“</span>
              </div>
              <blockquote className="font-display text-[1.12rem] sm:text-[1.28rem] leading-[1.8] text-foreground/90 italic">
                “{coupleFusion.quote}”
              </blockquote>
              <div className="my-4 flex items-center justify-center gap-3 text-primary/60">
                <span className="h-px w-10 bg-primary/30" />
                <span className="text-xs">✝</span>
                <span className="h-px w-10 bg-primary/30" />
              </div>
              <p className="script text-base sm:text-lg text-primary">
                {coupleFusion.wittyTagline}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5. Save the Date & Countdown */}
      <section className="px-6 pb-16">
        <Reveal>
          <SectionTitle overline="Save the Date" title="Counting Down to the Vows" />
          <div className="card-soft mx-auto max-w-lg p-6 text-center">
            <p className="text-[0.68rem] uppercase tracking-airy text-primary font-medium">
              {couple.dateLabel} · Bengaluru, Karnataka
            </p>
            <div className="mt-6">
              <Countdown iso={couple.weddingISO} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Order of Celebrations */}
      <section className="relative px-6 pb-16">
        <img
          src={floralDivider}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={2172}
          height={724}
          className="pointer-events-none mx-auto mb-8 w-full max-w-md opacity-80"
        />
        <Reveal>
          <div className="text-center">
            <div className="inline-block rounded-full border border-primary/45 bg-secondary/70 px-6 sm:px-10 py-2 sm:py-3 shadow-soft mb-2">
              <h2 className="font-display text-xl sm:text-3xl text-foreground font-normal tracking-wide">
                <span className="text-primary font-semibold">Friday</span> · 20 November 2026
              </h2>
            </div>
            <p className="mt-2.5 script text-2xl sm:text-3xl text-primary font-medium">
              Order of Celebrations
            </p>
            <Divider />
          </div>
        </Reveal>

        <ul className="space-y-6 max-w-2xl mx-auto">
          {events.map((ev, i) => (
            <li key={ev.name}>
              <Reveal delay={i * 80}>
                <article className="card-soft press p-5 sm:p-7 transition-all duration-300 hover:border-primary/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/20 pb-4">
                    <div className="flex items-center gap-3.5">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/35 bg-primary/10 text-primary text-xl font-serif">
                        {ev.glyph}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="font-display text-2xl sm:text-3xl">{ev.name}</h3>
                          {ev.subtitle && (
                            <span className="script text-base sm:text-lg text-primary">
                              — {ev.subtitle}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[0.68rem] uppercase tracking-airy font-semibold text-primary">
                          {ev.date} · {ev.time}
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto rounded-full border border-primary/30 bg-secondary/80 px-3.5 py-1 text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                      {ev.venue}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed font-normal">
                    {ev.note}
                  </p>

                  <div className="mt-3 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground/80">{ev.address}</p>
                  </div>

                  {ev.dressCode && (
                    <div className="mt-4 rounded border border-primary/20 bg-secondary/60 p-3.5 text-xs text-foreground/90">
                      <span className="mb-1 block text-[0.62rem] font-medium uppercase tracking-airy text-primary">
                        Dress Code
                      </span>
                      <p className="leading-relaxed">{ev.dressCode}</p>
                    </div>
                  )}

                  {ev.mapsUrl && (
                    <div className="mt-4 pt-3 border-t border-primary/15 flex justify-end">
                      <a
                        href={ev.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="press inline-flex items-center gap-1.5 text-[0.66rem] uppercase tracking-airy text-primary hover:underline font-medium"
                      >
                        <span>Directions to {ev.venue}</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The Sacred Vows Royal Highlight Card */}
      <section className="relative px-6 pb-20">
        <Reveal>
          <div className="card-soft relative mx-auto max-w-2xl overflow-hidden border-2 border-primary/50 p-7 sm:p-12 text-center shadow-[0_20px_50px_rgba(207,169,110,0.2)]">
            <div className="inline-block rounded-full border border-primary/45 bg-secondary/70 px-6 sm:px-10 py-2 sm:py-3 shadow-soft mb-3">
              <h2 className="font-display text-lg sm:text-2xl md:text-3xl text-foreground font-normal tracking-wide">
                <span className="text-primary font-semibold">The Sacred Vows</span>
                <span className="mx-2 hidden sm:inline text-primary/60">·</span>
                <span className="block sm:inline mt-0.5 sm:mt-0 text-foreground/90">
                  Friday, 20 November 2026
                </span>
              </h2>
            </div>

            <h3 className="mt-2 font-display text-[2.75rem] sm:text-[3.35rem] leading-[1.05] text-foreground font-light">
              Wedding &amp; Reception
            </h3>
            <p className="mt-2 script text-xl sm:text-2xl text-primary">So, Our Forever Begins</p>

            <div className="my-6 flex items-center justify-center gap-3 text-primary/60">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-sm">✝</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            {/* Schedule Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left my-6">
              <div className="rounded-sm border border-primary/35 bg-secondary/60 p-4 sm:p-5">
                <p className="text-[0.66rem] uppercase tracking-[0.2em] font-semibold text-primary">
                  Holy Matrimony · 2:30 PM
                </p>
                <p className="mt-1 font-display text-xl text-foreground">Holy Ghost Church</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Clarke Road, Richards Town, Bengaluru
                </p>
              </div>

              <div className="rounded-sm border border-primary/35 bg-secondary/60 p-4 sm:p-5">
                <p className="text-[0.66rem] uppercase tracking-[0.2em] font-semibold text-primary">
                  Reception · 6:30 PM
                </p>
                <p className="mt-1 font-display text-xl text-foreground">
                  CMA ROYAL CONVENTION HALL
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Thanisandra Main Road, Bengaluru
                </p>
              </div>
            </div>

            <p className="font-display text-base sm:text-lg leading-relaxed text-foreground/90 max-w-lg mx-auto">
              With the blessings of our parents, families, and Almighty God, we invite you to
              witness our vows and celebrate this unforgettable joyous day with us.
            </p>

            <img
              src={ringsVignette}
              alt="Watercolor wedding rings, flowers and gold leaves"
              loading="lazy"
              width={1536}
              height={1024}
              className="mx-auto mt-7 w-64 object-contain"
            />

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={downloadICS}
                className="press flex min-h-[46px] w-full sm:w-auto items-center justify-center rounded-sm bg-primary px-6 text-[0.66rem] uppercase tracking-airy text-primary-foreground font-medium"
              >
                Add to Calendar
              </button>
              <a
                href="https://maps.app.goo.gl/dnWydAZJLPWChWyt9?g_st=ic"
                target="_blank"
                rel="noreferrer"
                className="press flex min-h-[46px] w-full sm:w-auto items-center justify-center rounded-sm border border-primary/45 bg-secondary px-6 text-[0.66rem] uppercase tracking-airy text-foreground font-medium"
              >
                Church Map (2:30 PM)
              </a>
              <a
                href="https://maps.app.goo.gl/m5hpSKKpY2UnxJZp7?g_st=ic"
                target="_blank"
                rel="noreferrer"
                className="press flex min-h-[46px] w-full sm:w-auto items-center justify-center rounded-sm border border-primary/45 bg-secondary px-6 text-[0.66rem] uppercase tracking-airy text-foreground font-medium"
              >
                Reception Map (6:30 PM)
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive Wish Lantern */}
      <Reveal>
        <WishLantern />
      </Reveal>

      {/* Venues Section */}
      <section className="px-6 pb-16">
        <Reveal>
          <SectionTitle overline="Find your way" title="The Venues" />
          <div className="card-soft overflow-hidden max-w-3xl mx-auto">
            <img
              src={mapImg}
              alt="Illustrated map of venues"
              loading="lazy"
              width={1024}
              height={768}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {venues.map((v) => (
                  <div
                    key={v.name}
                    className="flex flex-col justify-between border-t md:border-t-0 md:first:border-none pt-4 md:pt-0 border-primary/20"
                  >
                    <div>
                      <span className="text-[0.64rem] uppercase tracking-airy font-semibold text-primary">
                        {v.title} · {v.time}
                      </span>
                      <h3 className="font-display text-2xl mt-1">{v.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{v.address}</p>
                    </div>
                    <a
                      href={v.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="press mt-4 flex min-h-[44px] items-center justify-center rounded-sm bg-primary px-4 text-[0.66rem] uppercase tracking-airy text-primary-foreground font-medium"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Calendar CTA */}
      <section className="px-6 pb-20">
        <Reveal>
          <div className="card-soft p-6 text-center max-w-md mx-auto">
            <p className="script text-lg text-primary">Save our date</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add every ceremony to your calendar in one tap.
            </p>
            <button
              type="button"
              onClick={downloadICS}
              className="press mt-5 flex min-h-[52px] w-full items-center justify-center rounded-sm border border-primary/45 bg-secondary text-[0.68rem] uppercase tracking-airy text-foreground font-medium"
            >
              Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <WeddingFooter />
    </main>
  );
}
