import { motion } from "framer-motion";

function Logo() {
  return (
    <motion.button
      className="rounded-none transition-all duration-200 bg-transparent border-2 border-transparent hover:cursor-pointer hover:border-white  h-16"
      whileHover="hover"
      initial="rest"
    >
      <h1 className="relative z-10 text-4xl text-center tracking-wider text-white px-4 ">
        <motion.span
          className="font-bold inline-block"
          variants={{
            rest: { x: 0, textShadow: "none" },
            hover: {
              x: [0, -2, 2, -2, 0],
              textShadow: [
                "none",
                "2px 0 #ff0000, -2px 0 #00ff00",
                "-2px 0 #ff0000, 2px 0 #00ff00",
                "2px 0 #ff0000, -2px 0 #00ff00",
                "none",
              ],
            },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          WORKSHOP
        </motion.span>{" "}
        <motion.span
          className="font-sans font-normal inline-block"
          variants={{
            rest: { x: 0, textShadow: "none" },
            hover: {
              x: [0, 2, -2, 2, 0],
              textShadow: [
                "none",
                "-2px 0 #ff0000, 2px 0 #00ff00",
                "2px 0 #ff0000, -2px 0 #00ff00",
                "-2px 0 #ff0000, 2px 0 #00ff00",
                "none",
              ],
            },
          }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
        >
          WAREHOUSE
        </motion.span>
      </h1>
    </motion.button>
  );
}
export default Logo;
