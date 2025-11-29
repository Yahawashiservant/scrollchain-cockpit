"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";

export default function UniversalPage({ title, category }: { title: string, category: string }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  // Determine Page Type based on Title/Category
  const isLedger = title.toLowerCase().includes("ledger") || title.includes("List") || title.includes("Log");
  const isMap = title.toLowerCase().includes("map") || title.includes("Topology") || title.includes("World");
  const isTerminal = !isLedger && !isMap;

  useEffect(() => {
    // Simulate Real Data Stream
    const i = setInterval(() => {
      const id = Math.floor(Math.random() * 99999);
      const val = (Math.random() * 1000).toFixed(2);
      
      if (isLedger) {
        setData(prev => [{ id: \`TX-\${id}\`, type: "INGEST", val: \`\${val} ETH\`, status: "CONFIRMED" }, ...prev.slice(0, 14)]);
      } else {
        setLogs(prev => [\`[\${new Date().toLocaleTimeString()}] \${title.toUpperCase()}: processed_signal_\${id} > OK\`, ...prev.slice(0, 12)]);
      }
    }, 1200);
    return () => clearInterval(i);
  }, [title, isLedger]);

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene />
      <div className="relative z-10 p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4 backdrop-blur-md bg-black/40 p-6 rounded-xl border border-white/5">
           <div>
             <div className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] mb-2">SCROLLCHAIN // {category}</div>
             <h1 className="text-4xl font-black text-white tracking-tighter uppercase">{title}</h1>
           </div>
           <div className="text-right">
              <div className="font-mono font-bold text-green-400 animate-pulse flex items-center justify-end gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> LIVE</div>
           </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* WIDGET: LEDGER TABLE */}
           {isLedger && (
             <div className="lg:col-span-3 glass-panel p-6 rounded-xl">
                <div className="text-xs font-bold text-gray-500 mb-4 tracking-widest border-b border-gray-700 pb-2">IMMUTABLE RECORD</div>
                <table className="w-full text-xs font-mono text-left">
                   <thead><tr className="text-gray-500"><th>ID</th><th>TYPE</th><th>VALUE</th><th>STATUS</th></tr></thead>
                   <tbody className="divide-y divide-gray-800">
                      {data.map((row: any, i) => (
                        <tr key={i} className="hover:bg-white/5">
                           <td className="py-2 text-cyan-300">{row.id}</td>
                           <td>{row.type}</td>
                           <td>{row.val}</td>
                           <td className="text-green-400">{row.status}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}

           {/* WIDGET: TERMINAL / MAP */}
           {isTerminal && (
             <>
               <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
                  <div className="text-xs text-gray-500 tracking-widest mb-2">ACTIVE FUNCTION</div>
                  <div className="text-3xl font-mono text-white">{data.length * 42} <span className="text-sm text-cyan-500">OPS/SEC</span></div>
                  <div className="w-full bg-gray-800 h-1 mt-2 rounded"><div className="h-full bg-cyan-500 w-2/3"></div></div>
               </div>
               <div className="lg:col-span-2 glass-panel p-6 rounded-xl font-mono text-xs text-cyan-300/80 flex flex-col">
                  <div className="border-b border-white/10 pb-2 mb-2 text-gray-500 font-bold">FUNCTION LOGS</div>
                  <div className="flex-1 space-y-1">
                     {logs.map((l, i) => <div key={i} className="hover:bg-white/5 p-1 rounded">{l}</div>)}
                  </div>
               </div>
             </>
           )}

           {isMap && (
              <div className="lg:col-span-3 glass-panel h-96 rounded-xl relative flex items-center justify-center">
                 <div className="text-cyan-500/20 text-6xl font-black tracking-[1em]">GEOSPATIAL VISUALIZER</div>
                 <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-xl m-4"></div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
}
