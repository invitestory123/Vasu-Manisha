import { useEffect, useRef, useState } from "react";
import { couple } from "@/lib/wedding";
import ganeshBlessing from "@/assets/ganesh-blessing.png";
const poster =
  "https://media.invitestory.in/seashell-vows/src/assets/opener-frames/lantern-reveal-first.png";

const SESSION_KEY = "everlasting-vows-opened";

export function InvitationOpener({ onStartOpen }: { onStartOpen?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadyOpened) return;

    setVisible(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  async function openInvitation() {
    if (!videoRef.current || started) return;
    setStarted(true);
    onStartOpen?.();
    try {
      await videoRef.current.play();
    } catch {
      finishOpening();
    }
  }

  function finishOpening() {
    sessionStorage.setItem(SESSION_KEY, "true");
    window.setTimeout(() => setClosing(true), 180);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 1900);
  }

  if (!visible) return null;

  return (
    <div
      className={`invitation-opener fixed inset-0 z-[100] bg-background ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-label={`Open ${couple.groom} and ${couple.bride}'s wedding invitation`}
    >
      <video
        ref={videoRef}
        src="https://media.invitestory.in/seashell-vows/media/wedding-opener.mp4"
        poster={poster}
        preload="auto"
        playsInline
        muted
        onEnded={finishOpening}
        className="h-full w-full object-cover [transform:translateZ(0)]"
      />
      {!started && (
        <button
          type="button"
          onClick={openInvitation}
          className="absolute inset-0 flex w-full flex-col items-center justify-end bg-[linear-gradient(180deg,transparent_25%,rgba(20,23,32,0.65)_65%,rgba(15,18,25,0.92)_100%)] px-6 pb-12 sm:pb-14 text-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 cursor-pointer"
        >
          {/* Sacred God's Blessing */}
          <div className="mb-4 sm:mb-5 flex flex-col items-center">
            <div className="rounded-lg border border-[#f4d8a1]/40 bg-[#fdf8ee]/95 p-3 sm:p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md max-w-[200px] sm:max-w-[230px]">
              <img
                src={ganeshBlessing}
                alt="॥ श्री गणेशाय नमः ॥"
                width={400}
                height={313}
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <span className="script text-2xl sm:text-3xl text-[#f4d8a1] drop-shadow-md">
            {couple.groom} &amp; {couple.bride}
          </span>
          <span className="mt-3 border-b border-white/60 pb-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/95">
            Tap to open
          </span>
        </button>
      )}
    </div>
  );
}
