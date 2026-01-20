"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "./HeroAnimation";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import AutoScrollTimeMachine from "./HeroCarousel";
export default function Hero() {
 

  return (
    <section className="relative min-h-screen w-full overflow-hidden border-b border-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center pointer-events-none">
        <div className="space-y-8">
          <div className="inline-block px-3 py-1 bg-[#F4F4F0] border border-black font-mono text-xs">
            Spec Sheet · 2026
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase">
            Master
            <br />
            Your
            <br />
            Craft
          </h1>

          <p className="font-mono text-sm max-w-md border-l-4 border-black pl-4">
            Industrial-grade tools engineered for precision, durability, and
            serious work.
          </p>

          <div className="flex gap-4 relative z-50 pointer-events-auto">
            <Button className="group rounded-none px-6 py-3 bg-black text-white uppercase tracking-widest text-sm font-bold hover:bg-[#E63946] transition-colors">
              Start Order{" "}
              <ArrowRight className="ml-2 w-4 h-4  group=hover:w-4 group=hover:h-4 group-hover:translate-x-1 transition-all duration-200" />
            </Button>

            <Button className="rounded-none px-6 py-3 border-2 text-black border-black bg-[#F4F4F0] uppercase tracking-widest text-sm font-bold hover:bg-black hover:text-white transition-colors">
              View Catalog
            </Button>
          </div>
        </div>
        <div className="z-10 h-[600px] ">
          <AutoScrollTimeMachine />
        </div>
      </div>
    </section>
  );
}
