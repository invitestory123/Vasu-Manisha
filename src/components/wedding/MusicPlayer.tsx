import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/wedding-music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Attempt autoplay when autoPlayTrigger fires (or on user gesture)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        })
        .catch(() => {
          // Browser prevented autoplay, wait for user click
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3500);
        })
        .catch((err) => console.log("Audio play prevented:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-center gap-2">
      {/* Toast Notification of playing track */}
      {showToast && (
        <div className="animate-fade-in pointer-events-none rounded-full border border-primary/40 bg-background/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
          <p className="font-display text-xs text-foreground/90">
            <span className="script text-primary mr-1">♫</span>
            I Think They Call This Love
          </p>
        </div>
      )}

      {/* Floating Gold Audio Button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        title={isPlaying ? "Pause music: I Think They Call This Love" : "Play music"}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-background/90 text-primary shadow-[0_8px_24px_rgba(207,169,110,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary active:scale-95"
      >
        {isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-4 w-4">
            <span className="w-0.5 bg-primary rounded-full animate-[musicBar_0.8s_ease-in-out_infinite] h-3" />
            <span className="w-0.5 bg-primary rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_0.2s] h-4" />
            <span className="w-0.5 bg-primary rounded-full animate-[musicBar_0.9s_ease-in-out_infinite_0.4s] h-2" />
          </div>
        ) : (
          <VolumeX className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        )}

        {/* Ambient Ring Glow */}
        {isPlaying && (
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20" />
        )}
      </button>
    </div>
  );
}
