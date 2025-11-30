"use client";
import { useState } from "react";
export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: "Neural Link: " + title + " Active." }]);
  return (
    <div className="h-full glass-panel rounded-xl p-6 flex flex-col">
      <div className="border-b border-white/10 pb-4 mb-4"><h1 className="font-bold text-purple-400 tracking-widest">{title} // COGNITION</h1></div>
      <div className="flex-1 bg-black/20 rounded p-4 mb-4 font-mono text-xs text-gray-300 overflow-auto">
         {history.map((h, i) => <div key={i} className="mb-2">{h.role === "sys" ? "[SYS]: " : "[USR]: "}{h.text}</div>)}
      </div>
      <input 
        className="bg-gray-900/50 border border-gray-700 rounded p-3 text-white text-xs outline-none" 
        placeholder="Command..." 
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
             if(e.key === 'Enter') {
                 setHistory(prev => [...prev, { role: 'user', text: input }, { role: 'sys', text: "Processing..." }]);
                 setInput("");
             }
        }}
      />
    </div>
  );
}
