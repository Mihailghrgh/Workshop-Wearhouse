"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CarouselLogos() {
  // Add your logo image paths here
  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
    "/logo6.png",
    "/logo7.png",
    "/logo8.png",
  ];

  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="bg-[#F4F4F0]  py-16 overflow-hidden">
      <div className="relative">
        <motion.div
          ref={containerRef}
          className="flex gap-12"
          animate={{
            x: [0, -width],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-[#F4F4F0]  rounded-lg p-4 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="max-w-full h-100 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-[#F4F4F0]rounded-lg p-4 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="max-w-full h-100max-w-full h-100 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
