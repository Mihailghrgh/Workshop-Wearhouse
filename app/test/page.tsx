"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MotionDiv from "@/components/Testing/MotionDivTest";
import Hero from "@/components/Hero/Hero";
import {
  ShoppingBag,
  Search,
  ArrowRight,
  Plus,
  Settings,
  Zap,
  Hammer,
  Package,
} from "lucide-react";
import { Carousel } from "@/components/Carousel/Carousel";
import Categories from "@/components/Categories/Categories";
import Image from "next/image";
import Header from "@/components/Headers/Header";
import Products from "@/components/Products/Products";
import Logo from "@/components/Logo/Logo";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import CarouselLogos from "@/components/CarouseLogos/CarouseLogos";
export default function WorkshopWarehousePage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 font-sans">
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      <Carousel />
      <Categories />
      {/* Products */}
      <Products />
      {/* Banner */}
      <CarouselLogos />
      <Banner />
      {/* Footer */}
      <Footer />
    </main>
  );
}

