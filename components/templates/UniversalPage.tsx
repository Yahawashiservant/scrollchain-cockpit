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
      const logMsg = "[" + new Date().toLocaleTimeString() + "] " + title.toUpperCase() + ": process_node_" + Math.floor(Math.random()*999) + " active";
      setLogs(prev => [logMsg, ...prev.slice(0, 15)]);
    }, 800);
    return () => clearInterval(i);
  }, [title]);

  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  return (
    <div className="min-h-full w-full relative flex flex-col text-white">
      <CyberScene />
      <div className="relative z-10 p-8 flex flex-col gap-6">
        <div className="border-b border-cyan-900/30 pb-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5">
           <div className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] mb-2">SCROLLCHAIN // {category}</div>
           <h1 className="text-5xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-500">{title}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="glass-panel p-6 rounded-xl bg-black/60">
              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">LIVE METRIC</div>
              <div className="text-4xl font-mono mb-2">{metric.toFixed(1)}%</div>
              <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-500" style={{width: metric + "%"}}></div>
              </div>
           </div>
           <div className="lg:col-span-2 glass-panel p-6 rounded-xl bg-black/60 min-h-[300px] flex flex-col">
              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest border-b border-gray-800 pb-2">DATA STREAM</div>
              <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-1 overflow-hidden">
                {logs.map((l, i) => <div key={i} className="truncate hover:bg-white/5 p-1">{l}</div>)}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}