"use client";

import { motion } from "framer-motion";

function MotionDiv() {
   return (
     <div className="w-full flex justify-center items-center h-screen">
       <motion.div
         className="relative overflow-hidden w-64 h-96 bg-white border-2 border-black"
         initial="rest"
         whileHover="hover"
       >
         {/* Black overlay that swipes in diagonally */}
         <motion.div
           className="absolute inset-0 bg-black origin-bottom-right"
           style={{ rotate: 40, scale: 0 }}
           variants={{
             rest: {
               rotate: 0,
               scale: 0,
             },
             hover: {
               scale: 3,
             },
           }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
         />
       </motion.div>
     </div>
   );
}
export default MotionDiv;
