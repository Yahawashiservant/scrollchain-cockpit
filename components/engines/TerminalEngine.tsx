"use client";
import { useRef, useEffect } from "react";
import { useScrollFetch } from "../hooks/useScrollFetch";

export default function TerminalEngine({ title }: { title: string }) {
  const endpoint = title.toLowerCase().replace(/ /g, "-");
  const { data, status } = useScrollFetch(endpoint + "-logs");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [data]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden bg-[#0a0a0a] font-mono text-xs text-green-500 p-6 border border-green-900/30 shadow-[inset_0_0_50px_rgba(0,20,0,0.3)]">
       <div className="mb-4 border-b border-green-900/50 pb-2 text-green-700 font-bold flex justify-between items-center">
          <span>ROOT ACCESS // {title.toUpperCase()}</span>
          <div className="flex items-center gap-2">
             <span className={`w-2 h-2 rounded-full ${status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}></span>
             <span>{status}</span>
          </div>
       </div>
       <div className="flex-1 space-y-1 overflow-y-auto scroll-area">
          <div className="text-gray-500"># Handshake with {endpoint}... OK</div>
          <div className="text-gray-500"># Verifying Signature... OK</div>
          <br/>
          {data && Array.isArray(data) ? data.map((l: any, i: number) => (
             <div key={i} className="hover:bg-green-900/10 flex gap-2">
               <span className="text-green-700">[{l.timestamp}]</span>
               <span className={l.level === "WARN" ? "text-yellow-500" : "text-green-400"}>{l.msg}</span>
             </div>
          )) : (
             <div className="animate-pulse text-green-800">... AWAITING STREAM ...</div>
          )}
          <div ref={endRef} className="animate-pulse text-white mt-2 flex"><span className="mr-2 text-green-400">$</span><span className="w-2 h-4 bg-green-500"></span></div>
       </div>
    </div>
  );
}
