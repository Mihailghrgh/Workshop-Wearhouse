"use client";
import React from "react";
import { motion } from "framer-motion";

const IMAGES = ["1.png", "2.png", "3.PNG", "7.png",  "6.png", "8.png"];

const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;
const BUFFER_SIZE = 8;

const clamp = (value: number, [min, max]: [number, number]) => {
  return Math.max(min, Math.min(max, value));
};

export default function AutoScrollTimeMachine() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate which cards should be rendered
  const getVisibleCards = React.useCallback(() => {
    const start = currentIndex - BUFFER_SIZE;
    const end = currentIndex + FRAMES_VISIBLE_LENGTH + BUFFER_SIZE;
    const cards = [];

    for (let i = start; i <= end; i++) {
      cards.push({
        index: i,
        imageIndex: ((i % IMAGES.length) + IMAGES.length) % IMAGES.length,
      });
    }

    return cards;
  }, [currentIndex]);

  const visibleCards = getVisibleCards();

  return (
    <div
      ref={containerRef}
      className="relative bg-transparent z-10 w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-transparent w-full h-full flex items-center justify-center">
        {visibleCards.map((card) => {
          const offsetIndex = card.index - currentIndex;
          const blur = currentIndex > card.index ? 2 : 0;
          const opacity = currentIndex > card.index ? 0 : 1;
          const scale = clamp(1 - offsetIndex * 0.08, [0.08, 2]);
          const y = clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

          const src = IMAGES[card.imageIndex];

          return (
            <motion.div
              key={card.index}
              className="absolute w-[100%] max-w-[800px] aspect-[16/9] bg-black bg-transparent rounded-none overflow-hidden"
              initial={false}
              animate={{
                y,
                scale,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                  mass: 0.5,
                },
              }}
              style={{
                willChange: "opacity, filter, transform",
                filter: `blur(${blur}px)`,
                opacity,
                transitionProperty: "opacity, filter",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-in-out",
                zIndex: 1000 - card.index,
              }}
            >
              <img
                alt={`Image ${card.imageIndex + 1}`}
                src={src}
                className="object-contain bg-transparent bg-[#F4F4F0] w-full h-full"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-mono">
          Paused - Hover away to continue
        </div>
      )}
    </div>
  );
}
