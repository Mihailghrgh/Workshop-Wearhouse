"use client";
import { ShoppingBag } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border border-black bg-[#F4F4F0] transition-all duration-200">
      {/* Top Ticker */}
      <div className="bg-black text-[10px] font-mono py-1 px-4 flex justify-between uppercase tracking-widest text-white">
        <span>System Status: Online</span>
        <span>Worldwide Shipping: Active</span>
        <span>Currency: GBP</span>
      </div>

      <div className="flex flex-col md:flex-row border-b border-black">
        {/* Logo Area */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-black w-full md:w-64 shrink-0 flex items-center justify-center hover:bg-[#3B82F6] hover:text-white transition-colors duration-300 cursor-pointer group">
          <div className="border-2 border-[#F4F4F0] flex items-center justify-center p-4">
            <h1 className="text-xs text-center tracking-wider">
              <span className="font-bold">WORKSHOP</span>{" "}
              <span className="font-sans font-normal">WAREHOUSE</span>
            </h1>
          </div>
        </div>

        {/* Navigation Grid */}
        <nav className="grow grid grid-cols-2 md:grid-cols-4 divide-x divide-black">
          <a
            className="p-6 flex items-center border border-black justify-center font-bold uppercase tracking-tight transition-all duration-300 hover:bg-black hover:text-white border-b md:border-b-0 md:border-none"
            href="#"
          >
            Power Tools
          </a>
          <a
            className="p-6 flex items-center justify-center font-bold uppercase tracking-tight transition-all duration-300 hover:bg-black hover:text-white border-b md:border-b-0  md:border-none"
            href="#"
          >
            Hand Tools
          </a>
          <a
            className="p-6 flex items-center justify-center font-bold uppercase tracking-tight transition-all duration-300 hover:bg-black hover:text-white border-b md:border-b-0 md:border-none"
            href="#"
          >
            Storage
          </a>
          <a
            className="p-6 flex border-black border-b sm:border-none items-center justify-center font-bold uppercase tracking-tight transition-all duration-300 hover:bg-black hover:text-white"
            href="#"
          >
            Safety
          </a>
        </nav>

        {/* Actions */}
        <div className="flex w-full sm:w-32 ">
          <Button
            variant="outline"
            className="
      flex-1
      bg-[#F4F4F0]
      rounded-none
      h-full
      flex items-center justify-center
      border-l border-black
      hover:bg-black hover:text-white
      transition-colors
      relative
    "
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="
      flex-1
      bg-[#F4F4F0]
      rounded-none
      h-full
      flex items-center justify-center
      border-l border-black
      hover:bg-black hover:text-white
      transition-colors
      relative
    "
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-2 right-2 text-[10px] font-mono font-bold">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
export default Header;
