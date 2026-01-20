"use client";
import Logo from "../Logo/Logo";

function Banner() {
  return (
    <section className="bg-black items-center flex flex-col justify-center text-white space-y-6 sm:space-y-4 py-32 text-center">
      <Logo />
      <h2 className="text-6xl font-black uppercase mb-6">Built To Last</h2>
      <p className="font-mono text-sm max-w-xl mx-auto mb-12">
        Infrastructure for professionals. No compromises.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <Stat label="Products" value="15k+" />
        <Stat label="Dispatch" value="24h" />
        <Stat label="Warranty" value="3yr" />
        <Stat label="Secure" value="100%" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-3xl font-bold text-[#E63946]">{value}</span>
      <span className="font-mono text-xs uppercase opacity-60">{label}</span>
    </div>
  );
}
export default Banner;
