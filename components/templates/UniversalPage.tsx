"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";

export default function UniversalPage({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  const [metric, setMetric] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => {
        setMetric(Math.random() * 100);
        const time = new Date().toLocaleTimeString();
        const id = Math.floor(Math.random() * 999);
        // SAFE TEMPLATE LITERALS
        const msg = `[${time}] ${title.toUpperCase()}: process_node_${id} > OK`;
        setLogs(prev => [msg, ...prev.slice(0, 12)]);
    }, 1000);
    return () => clearInterval(i);
  }, [title]);

  if (!mounted) return <div className="min-h-full w-full bg-black"></div>;

  return (
    <div className="min-h-full w-full relative flex flex-col text-white">
      <CyberScene category={category} />
      <div className="relative z-10 p-8 flex flex-col gap-8">
        <div className="border-b border-cyan-900/30 pb-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5">
           <div className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] mb-2">SCROLLCHAIN // {category}</div>
           <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500 tracking-tighter uppercase">{title}</h1>
        </div>
        
        <div className="glass-panel p-6 rounded-xl bg-black/60">
           <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">LIVE METRIC</div>
           <div className="text-4xl font-mono text-white mb-2">{Math.floor(metric)}%</div>
           <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" style={{width: `${metric}%`}}></div>
           </div>
        </div>

        <div className="glass-panel p-6 rounded-xl min-h-[400px]">
           <div className="text-xs text-gray-500 font-bold tracking-widest mb-4 border-b border-gray-800 pb-2">TERMINAL OUTPUT (SCROLL TEST)</div>
           <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-2 overflow-y-auto">
              {[...logs, ...logs, ...logs, ...logs, ...logs].map((l, i) => (
                 <div key={i} className="hover:bg-white/5 p-1 rounded cursor-pointer transition-colors border-l-2 border-transparent hover:border-cyan-500 pl-2">
                    {l}
                 </div>
              ))}
           </div>
           <div className="h-48 text-center text-gray-700">Content added to force scrollbar visibility.</div>
        </div>

      </div>
    </div>
  );
}
