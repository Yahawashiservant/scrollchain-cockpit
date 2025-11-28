"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";

export default function UniversalPage({ title }: { title: string }) {
  const [logs, setLogs] = useState<string[]>(["> Initializing Neural Link..."]);
  const [metrics, setMetrics] = useState({ cpu: 0, mem: 0, latency: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.random() * 60 + 20,
        mem: Math.random() * 400 + 100,
        latency: Math.floor(Math.random() * 50 + 10)
      });
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] invoke: ${title.toLowerCase().replace(/ /g,'_')}... 200 OK`, ...prev.slice(0, 8)]);
    }, 1200);
    return () => clearInterval(interval);
  }, [title]);

  return (
    <div className="h-full w-full relative flex flex-col overflow-hidden">
      <CyberScene />
      
      <div className="relative z-10 p-8 flex flex-col h-full pointer-events-none">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-cyan-900/50 pb-4 mb-6 bg-black/40 backdrop-blur-sm rounded-t-xl p-4">
           <div>
             <div className="text-[10px] font-bold text-cyan-500 tracking-[0.3em] mb-1">SCROLLCHAIN // EDGE RUNTIME</div>
             <h1 className="text-4xl font-black text-white tracking-tight">{title.toUpperCase()}</h1>
           </div>
           <div className="text-right">
              <div className="text-xs text-gray-500">STATUS</div>
              <div className="font-mono font-bold text-green-400 animate-pulse">OPERATIONAL</div>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6 flex-1 pointer-events-auto">
           {/* Stats Column */}
           <div className="col-span-3 flex flex-col gap-4">
              <div className="glass-panel p-4 rounded-xl">
                 <div className="text-xs text-gray-500 mb-2">MEMORY USAGE</div>
                 <div className="text-3xl font-mono text-white">{metrics.mem.toFixed(0)} MB</div>
                 <div className="w-full bg-gray-800 h-1 mt-2 rounded"><div className="bg-purple-500 h-full transition-all duration-1000" style={{width: `${metrics.cpu}%`}}></div></div>
              </div>
              <div className="glass-panel p-4 rounded-xl">
                 <div className="text-xs text-gray-500 mb-2">AVG LATENCY</div>
                 <div className="text-3xl font-mono text-cyan-400">{metrics.latency} ms</div>
              </div>
           </div>

           {/* Center Visualizer (Empty for 3D view) */}
           <div className="col-span-6 flex items-center justify-center">
              <div className="text-cyan-900/30 font-black text-9xl opacity-50 select-none">{title.charAt(0)}</div>
           </div>

           {/* Terminal Column */}
           <div className="col-span-3 glass-panel rounded-xl p-4 flex flex-col font-mono text-[10px] text-gray-400">
              <div className="text-cyan-600 font-bold mb-2 border-b border-gray-800 pb-1">LIVE LOGS</div>
              <div className="flex-1 overflow-hidden space-y-1">
                 {logs.map((l, i) => <div key={i} className="truncate">{l}</div>)}
                 <div className="animate-pulse text-cyan-400">_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
