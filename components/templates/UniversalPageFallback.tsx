"use client";
import { useState, useEffect } from "react";

export default function UniversalPageFallback({ title }: { title: string }) {
  const [load, setLoad] = useState(0);
  const [log, setLog] = useState("> System Ready");

  useEffect(() => {
    // Slow update (3 seconds) to save CPU
    const i = setInterval(() => {
       setLoad(Math.random() * 100);
       setLog(`> ${title} active: ${Math.floor(Math.random()*100)}%`);
    }, 3000);
    return () => clearInterval(i);
  }, [title]);

  return (
    <div className="flex flex-col gap-6 h-full">
        <div className="p-6 glass-panel rounded-xl border border-white/10 bg-black/40">
           <div className="text-xs font-bold text-cyan-500 mb-2 tracking-widest">MODULE ACTIVE</div>
           <h1 className="text-4xl font-black text-white tracking-tight uppercase">{title}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass-panel p-6 rounded-xl">
               <div className="text-xs text-gray-500 mb-2">METRIC</div>
               <div className="text-3xl font-mono text-white">{Math.floor(load)}%</div>
               <div className="w-full bg-gray-800 h-1 mt-2 rounded"><div className="bg-cyan-500 h-full transition-all duration-1000" style={{width: `${load}%`}}></div></div>
           </div>
           <div className="glass-panel p-6 rounded-xl font-mono text-xs text-green-400">
               {log}
           </div>
        </div>
    </div>
  );
}
