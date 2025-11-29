"use client";
import { useState, useRef, useEffect } from "react";

export default function ActiveTerminal({ context }: { context: string }) {
  const [history, setHistory] = useState<string[]>([
    `> ScrollChain OS v40.0`,
    `> Connected to ${context.toUpperCase()}`,
    `> Awaiting input...`
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      
      let response = `[SYSTEM] Command '${cmd}' queued for execution.`;
      if (cmd === "help") response = "Available: scan, deploy, purge, status, reboot";
      if (cmd === "clear") { setHistory([]); setInput(""); return; }
      
      setHistory(prev => [...prev, `> ${cmd}`, response]);
      setInput("");
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden font-mono text-[10px]">
      <div className="bg-black/60 p-2 border-b border-white/5 flex justify-between items-center">
        <span className="text-gray-400 font-bold">TERMINAL_ACCESS</span>
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-yellow-500"></div><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-1 text-cyan-300/90">
        {history.map((line, i) => <div key={i}>{line}</div>)}
        <div ref={endRef} />
      </div>
      <div className="p-2 bg-black/80 border-t border-white/10 flex items-center">
        <span className="text-green-500 mr-2 font-bold">{'>'}</span>
        <input 
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Execute command..."
          autoFocus
        />
      </div>
    </div>
  );
}
