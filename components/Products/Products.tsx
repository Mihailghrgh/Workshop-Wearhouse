"use client";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
function Products() {
  return (
    <section className="max-w-7xl mx-auto  pb-32 py-24 bg-[#F4F4F0]">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-4xl font-black uppercase">Current Inventory</h2>
        <span className="font-mono text-xs">Sort: Relevance</span>
      </div>
      <Separator className="mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 ">
        <ProductCard
          sku="EHLW410"
          title="VISION Wireless Compact Spot Light"
          price="£59.99"
          img="img6.png"
        />
        <ProductCard
          sku="EHLW4110"
          title="VISION Wireless Compact Spot Light + Pad"
          price="£100.99"
          img="img7.png"
        />

        <ProductCard
          sku="EHLW430"
          title="VISION Wireless Adjust Beam Torch"
          price="£70.50"
          img="img8.jpg"
        />
        <ProductCard
          sku="EHLW431"
          title="VISION Wireless Adjust Beam Torch + Pad"
          price="£120.99"
          img="img9.png"
        />
      </div>
    </section>
  );
}

function ProductCard({
  sku,
  title,
  price,
  img,
}: {
  sku: string;
  title: string;
  price: string;
  img: string;
}) {
  return (
    <Card className="relative group p-0 rounded-none border-black">
      <CardContent className="p-6 space-y-4 shadow-xs group-hover:shadow-2xl bg-[#F4F4F0] hover:bg-white text-black transition-all duration-200">
        <div >
          <img
            width={100}
            height={100}
            src={`${img}`}
            alt={title}
            className="
              h-40 mx-auto object-contain bg-none
              grayscale transition-all duration-200
              group-hover:grayscale-0 group-hover:scale-110
              
            "
          />
        </div>

        <div className="border-b pb-2">
          <div className="flex justify-between items-center text-start">
            <p className="font-mono text-xs opacity-60">{sku}</p>
            <p className="font-mono font-bold text-[#E63946]">{price}</p>
          </div>
          <h4 className="font-bold uppercase">{title}</h4>
        </div>
        <div className="grid grid-cols-2">
          <p className="font-mono text-xs opacity-60">POWER:</p>
          <p className="font-mono text-xs opacity-100 text-end">1200W</p>
          <p className="font-mono text-xs opacity-60">CHUNK:</p>
          <p className="font-mono text-xs opacity-100 text-end">13mm Keyless</p>
          <p className="font-mono text-xs opacity-60">WEIGHT:</p>
          <p className="font-mono text-xs opacity-100 text-end">1.6kg</p>
        </div>
        <div className="flex justify-between items-center">
          <Button
            size="icon"
            variant="outline"
            className="rounded-none w-full text-black uppercase hover:text-white border-black bg-[#F4F4F0] group-hover:bg-white hover:bg-black"
          >
            Add to Cart <Plus className="w-3 h-3 " />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default Products;
