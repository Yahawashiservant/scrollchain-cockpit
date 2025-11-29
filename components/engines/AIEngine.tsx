"use client";
import { useState } from "react";

export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: `Neural Link established with ${title}.` }]);

  return (
    <div className="h-screen w-full p-8 flex flex-col">
      <div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between">
            <h1 className="font-bold text-purple-400 tracking-widest text-xl">{title} // COGNITION</h1>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
         </div>
         <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {history.map((h, i) => (
               <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-xl ${h.role === 'user' ? 'bg-purple-900/40 border border-purple-500 text-white' : 'bg-gray-800/50 text-gray-300'}`}>
                     {h.text}
                  </div>
               </div>
            ))}
         </div>
         <div className="p-6 border-t border-white/10 bg-black/60">
            <input 
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-4 px-6 outline-none text-white focus:border-purple-500 transition-all"
              placeholder="Enter query..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if(e.key === 'Enter' && input) {
                   setHistory(p => [...p, { role: 'user', text: input }, { role: 'sys', text: "Processing query..." }]);
                   setInput("");
                }
              }}
            />
         </div>
      </div>
    </div>
  );
}
