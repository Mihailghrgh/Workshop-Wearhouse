import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const text1 = `/// FREE NEXT DAY DELIVERY ON ORDERS OVER £50 /// LIFETIME WARRANTY ON HAND TOOLS /// PRICE MATCH GUARANTEE /// TRADE ACCOUNTS AVAILABLE `;

export function Carousel() {
  const [width, setWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className=" bg-[#E63946] text-white py-3 overflow-hidden font-mono text-sm font-bold uppercase">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["100%", "-100%"],
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
        <span ref={textRef} className="inline-block">
          {text1}
        </span>
      </motion.div>
    </div>
  );
}
