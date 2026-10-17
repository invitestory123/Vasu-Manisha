const heroArch = "https://media.invitestory.in/seashell-vows/src/assets/hero-arch.jpg";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
const coupleImg = "https://media.invitestory.in/seashell-vows/src/assets/couple-walking.png";
import ganeshBlessing from "@/assets/ganesh-blessing-transparent.png";
import { PetalTap } from "./PetalTap";
import { useParallax } from "@/hooks/use-reveal";
import { couple } from "@/lib/wedding";

export function Hero() {
  const bg = useParallax(0.35);
  const fg = useParallax(0.12);

  return (
    <PetalTap>
      <header className="relative min-h-[100svh] overflow-hidden paper flex flex-col justify-between">
        <div
          className="absolute inset-x-0 top-0 h-[82svh]"
          style={{ transform: `translate3d(0, ${bg}px, 0)`, willChange: "transform" }}
        >
          <img
            src={heroArch}
            alt="Watercolor beach wedding arch at sunset"
            width={1024}
            height={1536}
            className="h-full w-full object-cover object-top animate-bloom"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        </div>

        <img
          src={floral}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -left-10 top-6 w-36 opacity-70 animate-float-soft"
          style={{ transform: `translate3d(0, ${bg * 0.5}px, 0)` }}
        />
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-12 top-24 w-32 -scale-x-100 opacity-60 animate-float-soft"
          style={{ animationDelay: "1.4s", transform: `translate3d(0, ${bg * 0.35}px, 0)` }}
        />

        {/* Full Couple walking down the sandy path inside the arch */}
        <div
          className="pointer-events-none relative z-10 flex flex-1 items-end justify-center pt-6 sm:pt-10 pb-1"
          style={{
            transform: `translate3d(0, ${-fg * 0.4}px, 0)`,
          }}
        >
          <img
            src={coupleImg}
            alt="Bride and groom walking hand in hand"
            width={1024}
            height={1536}
            className="h-[38svh] sm:h-[44svh] max-h-[420px] min-h-[230px] w-auto max-w-[85vw] object-contain animate-bloom drop-shadow-[0_16px_28px_rgba(92,80,68,0.22)]"
          />
        </div>

        {/* Soft bottom veil to ensure 100% contrast & readability */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38svh] bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent"
          aria-hidden="true"
        />

        <div
          className="relative z-10 flex flex-col items-center justify-end px-6 pb-10 text-center"
          style={{ transform: `translate3d(0, ${-fg}px, 0)` }}
        >
          {/* Sacred God's Blessing - Om Shri Ganeshaya Namah */}
          <div
            className="mb-2 sm:mb-3 flex flex-col items-center animate-ink"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src={ganeshBlessing}
              alt="॥ श्री गणेशाय नमः ॥"
              width={400}
              height={313}
              className="w-40 sm:w-52 max-w-[72vw] h-auto object-contain drop-shadow-[0_2px_10px_rgba(180,135,70,0.18)]"
            />
          </div>

          <p
            className="font-script text-xl sm:text-2xl text-foreground/95 font-medium tracking-wide animate-ink drop-shadow-sm"
            style={{ animationDelay: "0.4s" }}
          >
            Together with our families
          </p>
          <p
            className="mt-1 font-script text-lg sm:text-xl text-primary font-medium tracking-wide animate-ink drop-shadow-sm"
            style={{ animationDelay: "0.55s" }}
          >
            We invite you to the union of
          </p>
          <h1
            className="mt-2 font-display text-[2.9rem] sm:text-[3.15rem] leading-[1.02] text-foreground animate-ink"
            style={{ animationDelay: "0.7s" }}
          >
            {couple.groom}
            <span className="script mx-2 block text-2xl text-primary">&amp;</span>
            {couple.bride}
          </h1>
          <p
            className="mt-4 text-[0.66rem] uppercase tracking-airy text-muted-foreground animate-ink"
            style={{ animationDelay: "1s" }}
          >
            {couple.dateLabel}
          </p>
          <p
            className="mt-2 text-[0.66rem] uppercase tracking-airy text-muted-foreground animate-ink"
            style={{ animationDelay: "1.15s" }}
          >
            RPN Resort &amp; Cafe · Dehradun, Uttarakhand
          </p>
        </div>
      </header>
    </PetalTap>
  );
}
