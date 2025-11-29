"use client";
import { useState } from "react";

export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: "Neural Link: " + title + " Active." }]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
       <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between">
          <h1 className="font-bold text-purple-400 tracking-widest">{title} // COGNITION</h1>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
       </div>
       <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
          {history.map((h, i) => (
             <div key={i} className={"flex " + (h.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={"max-w-[80%] p-3 rounded " + (h.role === 'user' ? 'bg-purple-900/40 border border-purple-500' : 'bg-gray-800 text-gray-300')}>
                   {h.text}
                </div>
             </div>
          ))}
       </div>
       <div className="p-3 border-t border-white/10 bg-black/40">
          <input 
            className="w-full bg-transparent outline-none text-white placeholder-gray-600" 
            placeholder="Query the model..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if(e.key === 'Enter' && input) {
                 setHistory(p => [...p, { role: 'user', text: input }, { role: 'sys', text: "Processing request..." }]);
                 setInput("");
              }
            }}
          />
       </div>
    </div>
  );
}
