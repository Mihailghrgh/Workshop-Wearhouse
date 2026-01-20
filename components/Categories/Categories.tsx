"use client";
import { Card } from "../ui/card";

const img5 =
  "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&q=80&w=800";

function Categories() {
  return (
    <section>
      <div className="w-full grid grid-cols-1 sm:grid-cols-4 min-h-[55vh]">
        <CategoryCard
          title="Power Tools"
          desc="Drills, Saws, Grinders"
          color="bg-black"
          background="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800"
        />
        <CategoryCard
          title="Hand Tools"
          desc="Torches, Hammers, Pliers"
          color="bg-black"
          background="img4.png"
        />
        <CategoryCard
          title="Storage"
          desc="Modular, Industrial, Secure"
          color="bg-black"
          background="img5.jpg"
        />
        <CategoryCard
          title="Hygiene & Safety"
          desc="Liquid, Janitorial, Spillage"
          color="bg-black"
          background={img5}
        />
      </div>
    </section>
  );
}

function CategoryCard({
  title,
  desc,
  color,
  background,
}: {
  title: string;
  desc: string;
  color: string;
  background?: string;
}) {
  return (
    <Card
      className={`
        group relative overflow-hidden rounded-none border border-black
        h-[66vh] flex flex-col justify-between
        bg-[#F4F4F0] text-black
        transition-all duration-300 
        hover:${color} hover:text-white
      `}
    >
      {/* Image slide-up */}
      {background && (
        <div
          className="
            absolute bottom-0 left-0 right-0
            h-[75%]
            bg-cover bg-center
            translate-y-full opacity-0
            transition-all duration-300 ease-out
            group-hover:translate-y-0 group-hover:opacity-100
          "
          style={{ backgroundImage: `url(${background})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-8 space-y-4 text-center ">
        <h1 className="text-3xl font-black uppercase ">{title}</h1>
        <p className="font-mono font-bold text-xs">{desc}</p>
      </div>

      <p className="relative z-10 p-6 font-mono [text-stroke:2px_black] text-[10px] text-right font-bold">
        CATEGORY
      </p>
    </Card>
  );
}
export default Categories;
