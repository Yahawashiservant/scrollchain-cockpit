"use client";
import { useState, useEffect, useRef } from "react";

export default function NeuralChat({ context }: { context: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{role: 'user' | 'sys', msg: string}[]>([
    { role: 'sys', msg: `Neural Link established with ${context.toUpperCase()}. Awaiting natural language input.` }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMsg = input;
      setHistory(prev => [...prev, { role: 'user', msg: userMsg }]);
      setInput("");

      // Simulate AI Processing & Response
      setTimeout(() => {
        let response = `Processing query regarding ${context}... Data correlator active.`;
        if (userMsg.includes("status")) response = `Current status of ${context} is OPTIMAL. Efficiency at 98%.`;
        if (userMsg.includes("deploy")) response = `Authorization required. Initiating deployment sequence for ${context}.`;
        if (userMsg.includes("scan")) response = `Scanning sector... Anomalies: 0.`;
        
        setHistory(prev => [...prev, { role: 'sys', msg: response }]);
      }, 600);
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="flex flex-col h-full glass-panel rounded-xl overflow-hidden">
      <div className="p-3 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <span className="text-[10px] font-bold text-purple-400 tracking-widest">NEURAL LINK // {context}</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
        {history.map((h, i) => (
          <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded ${h.role === 'user' ? 'bg-cyan-900/30 text-cyan-100 border border-cyan-800' : 'bg-gray-900/50 text-gray-300 border border-gray-800'}`}>
              {h.msg}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 bg-black/60 border-t border-white/10">
        <input 
          className="w-full bg-transparent outline-none text-white placeholder-gray-600 font-mono text-sm"
          placeholder={`Talk to ${context}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSend}
        />
      </div>
    </div>
  );
}
