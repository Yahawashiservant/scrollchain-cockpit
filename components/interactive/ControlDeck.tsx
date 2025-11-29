"use client";
import { useState } from "react";

export default function ControlDeck({ category }: { category: string }) {
  const [toggles, setToggles] = useState({ A: true, B: false, C: true, D: false });
  
  const controls = category.includes("DEFENSE") 
    ? ["SHIELDS", "WEAPONS", "RADAR", "LOCKDOWN"]
    : ["SYNC", "CACHE", "LOGGING", "DAEMON"];

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[10px] font-bold tracking-widest text-gray-500">MANUAL OVERRIDE</h3>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {controls.map((label, i) => {
           const key = Object.keys(toggles)[i];
           const isActive = toggles[key as keyof typeof toggles];
           return (
             <button 
               key={label}
               onClick={() => setToggles(p => ({...p, [key]: !isActive}))}
               className={`p-2 rounded border transition-all text-[10px] font-bold flex justify-between items-center ${
                 isActive 
                   ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                   : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30'
               }`}
             >
               {label}
               <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400' : 'bg-gray-700'}`}></div>
             </button>
           );
        })}
      </div>

      <button className="mt-1 w-full py-2 bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-all rounded text-[10px] font-bold tracking-wider">
        EMERGENCY STOP
      </button>
    </div>
  );
}
