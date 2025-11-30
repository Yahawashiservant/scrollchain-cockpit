"use client";
import { useState, useEffect, useRef } from "react";
export default function TerminalEngine({ title }: { title: string }) {
  const [lines, setLines] = useState<string[]>(["> Initializing " + title + "..."]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const i = setInterval(() => {
       const newLine = "[root@scrollchain] process_" + Math.floor(Math.random() * 999) + " ... OK";
       setLines(prev => [...prev.slice(-18), newLine]);
    }, 600);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="h-full glass-panel rounded-xl p-6 bg-black/90 font-mono text-xs text-green-500 border border-green-900/30 flex flex-col">
      <div className="mb-4 border-b border-green-900/50 pb-2 text-green-700 font-bold">{title.toUpperCase()} // SHELL</div>
      <div className="flex-1 overflow-hidden space-y-1">
         {lines.map((l, i) => <div key={i}>{l}</div>)}
         <div ref={endRef} className="animate-pulse text-white">_</div>
      </div>
    </div>
  );
}
