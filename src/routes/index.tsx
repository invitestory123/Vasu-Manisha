import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Section";
import { SectionTitle } from "@/components/wedding/Ornaments";
import { WishLantern } from "@/components/wedding/WishLantern";
import { WeddingFooter } from "@/components/wedding/WeddingFooter";
import { InvitationOpener } from "@/components/wedding/InvitationOpener";
import { couple, events, venue, downloadICS } from "@/lib/wedding";
import { useParallax } from "@/hooks/use-reveal";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
import mapImg from "@/assets/venue-map.jpg";
import brideImg from "@/assets/bride-animated.jpg";
import groomImg from "@/assets/groom-animated.jpg";
const ringsVignette =
  "https://media.invitestory.in/seashell-vows/src/assets/rings-seashell-vignette.png";
const floralDivider =
  "https://media.invitestory.in/seashell-vows/src/assets/bougainvillea-divider.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vasu & Manisha — Wedding Invitation | 21–22 Nov 2026" },
      {
        name: "description",
        content:
          "Together with our families, join Vasu & Manisha at RPN Resort and cafe, Uttarakhand. Haldi, Mehendi, Sangeet, and Wedding celebrations.",
      },
      { property: "og:title", content: "Vasu & Manisha — Wedding Invitation | 21–22 Nov 2026" },
      {
        property: "og:description",
        content:
          "Together with our families, join Vasu & Manisha at RPN Resort and cafe, Uttarakhand. Haldi, Mehendi, Sangeet, and Wedding celebrations.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      {
        property: "og:image:alt",
        content: "Vasu & Manisha — Wedding Invitation · 21–22 November 2026",
      },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vasu & Manisha — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Together with our families, join Vasu & Manisha at RPN Resort and cafe, Uttarakhand on 21st – 22nd November 2026.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const drift = useParallax(0.18);

  return (
    <main className="paper overflow-x-hidden">
      <InvitationOpener />
      <Hero />

      {/* Countdown */}
      <section className="px-6 py-14">
        <Reveal>
          <p className="text-center text-[0.62rem] uppercase tracking-airy text-muted-foreground">
            Counting down to the vows
          </p>
          <div className="mt-6">
            <Countdown iso={couple.weddingISO} />
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="relative px-7 pb-16">
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-16 -top-6 w-40 opacity-40"
          style={{ transform: `translate3d(0, ${-drift * 0.4}px, 0)` }}
        />
        <Reveal>
          <SectionTitle overline="Our invitation" title="So, Our Forever Begins" />
          <p className="text-center font-display text-[1.18rem] leading-[1.85] text-foreground/90">
            With joyful hearts and the blessings of our families, we invite you to join us as we
            celebrate our love and embark on this sacred journey together amidst the serene hills of
            Uttarakhand.
          </p>
          <p className="mt-6 script text-center text-lg text-primary">{couple.tagline}</p>
          <img
            src={ringsVignette}
            alt="Watercolor wedding rings, flowers and gold leaves"
            loading="lazy"
            width={1536}
            height={1024}
            className="mx-auto mt-7 w-60 object-contain"
          />
        </Reveal>
      </section>

      {/* The Couple: Bride & Groom */}
      <section className="relative px-6 pb-16">
        <Reveal>
          <SectionTitle overline="Together in Love" title="Bride & Groom" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Bride Card */}
          <Reveal delay={60}>
            <article className="card-soft group overflow-hidden text-center">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={brideImg}
                  alt="Manisha — The Bride"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-[0.62rem] uppercase tracking-airy text-white backdrop-blur-md">
                  The Bride
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-foreground">Manisha</h3>
                <p className="mt-1 script text-base text-primary">Grace &amp; Radiance</p>
              </div>
            </article>
          </Reveal>

          {/* Groom Card */}
          <Reveal delay={120}>
            <article className="card-soft group overflow-hidden text-center">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={groomImg}
                  alt="Vasu — The Groom"
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 text-[0.62rem] uppercase tracking-airy text-white backdrop-blur-md">
                  The Groom
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-foreground">Vasu</h3>
                <p className="mt-1 script text-base text-primary">Charm &amp; Joy</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Events */}
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
          <SectionTitle overline="Two days of love & laughter" title="Celebrations" />
        </Reveal>
        <ul className="space-y-4">
          {events.map((ev, i) => (
            <li key={ev.name}>
              <Reveal delay={i * 60}>
                <article className="card-soft press p-5">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 text-primary">
                      {ev.glyph}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="font-display text-2xl">{ev.name}</h3>
                        {ev.subtitle && (
                          <span className="script text-base text-primary">— {ev.subtitle}</span>
                        )}
                      </div>
                      <p className="text-[0.62rem] uppercase tracking-airy text-muted-foreground">
                        {ev.date} · {ev.time}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80">{ev.venue}</p>
                  {ev.dressCode && (
                    <div className="mt-3 rounded border border-primary/20 bg-secondary/60 p-3 text-xs text-foreground/90">
                      <span className="mb-1 block text-[0.62rem] font-medium uppercase tracking-airy text-primary">
                        Dress Code
                      </span>
                      <p className="leading-relaxed">{ev.dressCode}</p>
                    </div>
                  )}
                  {ev.note && !ev.dressCode && (
                    <p className="mt-1 text-xs italic text-muted-foreground">{ev.note}</p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Reveal>
        <WishLantern />
      </Reveal>

      {/* Venue */}
      <section className="px-6 pb-16">
        <Reveal>
          <SectionTitle overline="Find your way" title="The venue" />
          <div className="card-soft overflow-hidden">
            <img
              src={mapImg}
              alt={`Illustrated map of ${venue.name}`}
              loading="lazy"
              width={1024}
              height={768}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-display text-2xl">{venue.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{venue.address}</p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="press mt-5 flex min-h-[48px] items-center justify-center rounded-sm bg-primary px-5 text-[0.68rem] uppercase tracking-airy text-primary-foreground"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Calendar CTA in the thumb zone */}
      <section className="px-6 pb-20">
        <Reveal>
          <div className="card-soft p-6 text-center">
            <p className="script text-lg text-primary">Save our date</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add every ceremony to your calendar in one tap.
            </p>
            <button
              type="button"
              onClick={downloadICS}
              className="press mt-5 flex min-h-[52px] w-full items-center justify-center rounded-sm border border-primary/45 bg-secondary text-[0.68rem] uppercase tracking-airy text-foreground"
            >
              Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      <WeddingFooter />
    </main>
  );
}
