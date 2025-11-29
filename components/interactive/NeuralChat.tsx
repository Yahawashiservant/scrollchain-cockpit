"use client";
import { useState, useRef, useEffect } from "react";

export default function NeuralChat({ context }: { context: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{role: 'user' | 'sys', msg: string}[]>([
    { role: 'sys', msg: `Connected to ${context}. Endpoint: https://yvxyxpqdzjwplztvmkxg.supabase.co/functions/v1/${context}` }
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMsg = input;
      setHistory(prev => [...prev, { role: 'user', msg: userMsg }]);
      setInput("");
      setIsSending(true);

      try {
        // REAL POST REQUEST TO YOUR FUNCTION
        const res = await fetch(`https://yvxyxpqdzjwplztvmkxg.supabase.co/functions/v1/me-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userMsg, context: context })
        });

        if (res.ok) {
            const data = await res.json();
            setHistory(prev => [...prev, { role: 'sys', msg: data.response || "Ack." }]);
        } else {
            // Fallback if no auth key provided yet
            setHistory(prev => [...prev, { role: 'sys', msg: `[401] Auth Required to access ${context}.` }]);
        }
      } catch (err) {
         setHistory(prev => [...prev, { role: 'sys', msg: "[ERR] Connection Failed." }]);
      } finally {
         setIsSending(false);
      }
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="flex flex-col h-full glass-panel rounded-xl overflow-hidden">
      <div className="p-3 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <span className="text-[10px] font-bold text-cyan-400 tracking-widest">EDGE LINK // {context.toUpperCase()}</span>
        <div className={`w-2 h-2 rounded-full ${isSending ? 'bg-yellow-500 animate-ping' : 'bg-green-500'}`}></div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
        {history.map((h, i) => (
          <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded ${h.role === 'user' ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-800' : 'bg-gray-900/60 text-gray-300 border border-gray-800'}`}>
              {h.msg}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 bg-black/60 border-t border-white/10">
        <input 
          className="w-full bg-transparent outline-none text-white placeholder-gray-600 font-mono text-sm"
          placeholder={isSending ? "Transmitting..." : `Message ${context}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSend}
          disabled={isSending}
        />
      </div>
    </div>
  );
}
