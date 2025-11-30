"use client";
import CyberScene from "../visuals/CyberScene";
export default function UniversalPage({ title, category }: { title: string, category: string }) {
  return (
    <div className="min-h-full w-full relative flex flex-col text-white">
      <CyberScene category={category} />
      <div className="relative z-10 p-8 flex flex-col gap-8">
        <div className="p-6 glass-panel rounded-xl border border-white/10">
           <div className="text-xs font-bold text-cyan-500 mb-2 tracking-widest">{category}</div>
           <h1 className="text-5xl font-black">{title}</h1>
        </div>
      </div>
    </div>
  );
}
