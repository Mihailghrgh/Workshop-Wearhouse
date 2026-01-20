"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Carousel } from "../Carousel/Carousel";
import { ArrowRight } from "lucide-react";
function Footer() {
  return (
    <footer>
      <div className=" border border-black max-w-7xl mx-auto   grid md:grid-cols-4 ">
        <div className="border-r border-black py-15 px-10">
          <h4 className="font-black text-xl mb-4">WORKSHOP WAREHOUSE</h4>
          <p className="font-mono text-xs opacity-70">
            Workshop Warehouse is a trading name of Industrial Supplies Ltd.
            Registered in England No. 12345678
          </p>
        </div>
        <div className="border-r border-black py-15 px-10">
          <h4 className="font-mono text-xs opacity-70 uppercase">Directory</h4>
          <div className="space-x-0 space-y-0 py-0 pt-4">
            <Button
              variant="link"
              className="
                hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Power Tools
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Hand Tools
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Accessories
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              clearance
            </Button>
          </div>
        </div>
        <div className="border-r border-black py-15 px-10">
          <h4 className="font-mono text-xs opacity-70 uppercase">Support</h4>
          <div className="space-x-0 space-y-0 py-0 pt-4">
            <Button
              variant="link"
              className="
                hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Track Order
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Returns
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Trade Account
            </Button>
            <Button
              variant="link"
              className="
                 hover:cursor-pointer w-full text-left p-0 justify-start uppercase font-bold text-black
                transition-all duration-200
                hover:text-[#E63946] hover:pl-2
              "
            >
              Contact
            </Button>
          </div>
        </div>
        <div className="border-r border-black py-15 px-10">
          <h4 className="font-mono text-xs opacity-70 uppercase">Newsletter</h4>
          <div className="space-x-0 space-y-4 py-0 pt-4">
            <p className="font-mono text-xs opacity-100">
              Subscribe for technical updates and offers.
            </p>
            <div className="flex justify-center items-center">
              <Input className="rounded-none border border-black" />
              <Button className="rounded-none hover:bg-[#E63946]">
                {" "}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center font-mono text-[10px] py-4 border-t">
        © 2026 Workshop Warehouse
      </div>
    </footer>
  );
}
export default Footer;
