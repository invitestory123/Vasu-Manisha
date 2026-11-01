import { useEffect, useRef, useState } from "react";
import { couple } from "@/lib/wedding";
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
          {/* Sacred God's Blessing Seal */}
          <div className="mb-4 sm:mb-5 flex flex-col items-center">
            <div className="rounded-full border border-[#f4d8a1]/50 bg-black/45 px-5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md flex items-center gap-2.5">
              <span className="font-serif text-lg text-[#f4d8a1]">✝</span>
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[#f4d8a1]/95 font-medium">
                The Holy Matrimony
              </span>
              <span className="font-serif text-lg text-[#f4d8a1]">✝</span>
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
