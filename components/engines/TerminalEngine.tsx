"use client";
import { useState, useEffect, useRef } from "react";

export default function TerminalEngine({ title }: { title: string }) {
  const [lines, setLines] = useState<string[]>(["> System Boot..."]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
       const newLine = `[${new Date().toLocaleTimeString()}] ${title.toLowerCase()}: process_${Math.floor(Math.random()*9999)} OK`;
       setLines(prev => [...prev, newLine].slice(-50)); // Keep last 50 lines
    }, 200);
    return () => clearInterval(i);
  }, [title]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  return (
    <div className="h-screen w-full p-8 flex flex-col">
      <div className="glass-panel rounded-xl flex-1 bg-black/95 font-mono text-xs text-green-500 p-6 border border-green-900/50 shadow-[inset_0_0_50px_rgba(0,20,0,0.5)] flex flex-col overflow-hidden">
         <div className="mb-4 border-b border-green-900/50 pb-2 text-green-400 font-bold flex justify-between">
            <span>ROOT ACCESS // {title.toUpperCase()}</span>
            <span className="animate-pulse">● SECURE</span>
         </div>
         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-900">
            {lines.map((l, i) => <div key={i} className="mb-1">{l}</div>)}
            <div ref={endRef} className="animate-pulse text-white mt-2">_</div>
         </div>
      </div>
    </div>
  );
}
