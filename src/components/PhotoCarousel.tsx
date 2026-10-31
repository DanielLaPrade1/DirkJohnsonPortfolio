import { useState, useRef, useEffect, useCallback } from "react";
import type { TransitionEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../data/colors";

const ANIMATION_LOCK_MS = 700;

export default function PhotoCarousel({ photos }: { photos: { src: string; alt: string }[] }) {
  const count = photos.length;
  const extended = [photos[count - 1], ...photos, photos[0]];
  const trackLength = extended.length;

  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingRef = useRef(false);

  const activeDot = (trackIndex - 1 + count) % count;

  const releaseLock = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = null;
    isAnimatingRef.current = false;
  }, []);

  // Single lock timer: a new lock cancels the previous timer, so an old
  // timeout can never unlock a newer animation halfway through.
  const lockAnimation = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    isAnimatingRef.current = true;
    lockTimerRef.current = setTimeout(releaseLock, ANIMATION_LOCK_MS);
  }, [releaseLock]);

  const advance = useCallback(
    (direction: number) => {
      if (isAnimatingRef.current) return;
      lockAnimation();
      setTransitionEnabled(true);
      // Clamp so the index can never leave the clone-padded track.
      setTrackIndex((prev) => Math.min(Math.max(prev + direction, 0), trackLength - 1));
    },
    [lockAnimation, trackLength],
  );

  const goToDot = useCallback(
    (dotIndex: number) => {
      if (isAnimatingRef.current) return;
      if (dotIndex === activeDot) return;
      lockAnimation();
      setTransitionEnabled(true);
      setTrackIndex(dotIndex + 1);
    },
    [lockAnimation, activeDot],
  );

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    // Ignore bubbled events from children and non-slide properties.
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (trackIndex === 0 || trackIndex === trackLength - 1) {
      // Jump from a clone to the matching real slide with no animation,
      // and keep the lock for two frames so the jump is painted before
      // the next slide transition can start.
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = null;
      setTransitionEnabled(false);
      setTrackIndex(trackIndex === 0 ? count : 1);
      requestAnimationFrame(() => requestAnimationFrame(releaseLock));
    } else {
      releaseLock();
    }
  };

  // Autoplay
  useEffect(() => {
    if (isHovered || isFocused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    intervalRef.current = setInterval(() => advance(1), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, isFocused, advance]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  const goPrev = () => advance(-1);
  const goNext = () => advance(1);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="relative aspect-[5/5] w-full overflow-hidden rounded-sm" style={{ background: COLORS.mist }}>
        <div
          className="flex h-full"
          style={{
            width: `${trackLength * 100}%`,
            transform: `translateX(-${(100 / trackLength) * trackIndex}%)`,
            transition: transitionEnabled ? "transform 500ms ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((photo, i) => {
            // First and last slides are loop clones: hide them from crawlers and screen readers.
            const isClone = i === 0 || i === trackLength - 1;
            return (
              <img
                key={i}
                src={photo.src}
                alt={isClone ? "" : photo.alt}
                aria-hidden={isClone || undefined}
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
                className="h-full object-cover"
                style={{ width: `${100 / trackLength}%`, flexShrink: 0 }}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1.5"
          style={{ background: "rgba(35,45,75,.75)" }}
        >
          <ChevronLeft width={18} height={18} color={COLORS.ivory} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5"
          style={{ background: "rgba(35,45,75,.75)" }}
        >
          <ChevronRight width={18} height={18} color={COLORS.ivory} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goToDot(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === activeDot}
            className="h-2 w-2 rounded-full transition-colors"
            style={{ background: i === activeDot ? COLORS.uvaOrange : "#C8CFDA" }}
          />
        ))}
      </div>
    </div>
  );
}
