import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "../data/colors";

export default function PhotoCarousel({ photos }: { photos: { src: string; alt: string }[] }) {
  const count = photos.length;
  const extended = [photos[count - 1], ...photos, photos[0]];
  const trackLength = extended.length;

  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef(false);

  const activeDot = (trackIndex - 1 + count) % count;

  const advance = useCallback((direction: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setTransitionEnabled(true);
    setTrackIndex((prev) => prev + direction);
  }, []);

  const goToDot = useCallback((dotIndex: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setTransitionEnabled(true);
    setTrackIndex(dotIndex + 1);
  }, []);

  const handleTransitionEnd = () => {
    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(count);
    } else if (trackIndex === trackLength - 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    }
    isAnimatingRef.current = false;
  };

  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(() => advance(1), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, advance]);

  const goPrev = () => advance(-1);
  const goNext = () => advance(1);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Taller viewport now, no outer card border */}
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
          {extended.map((photo, i) => (
            <img
              key={i}
              src={photo.src}
              alt={photo.alt}
              className="h-full object-cover"
              style={{ width: `${100 / trackLength}%`, flexShrink: 0 }}
            />
          ))}
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