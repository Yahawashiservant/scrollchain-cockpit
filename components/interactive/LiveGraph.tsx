"use client";
import { useEffect, useState } from "react";

export default function LiveGraph() {
  const [data, setData] = useState<number[]>(Array(30).fill(10));

  useEffect(() => {
    const i = setInterval(() => {
      setData(prev => [...prev.slice(1), Math.random() * 100]);
    }, 100);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col h-full">
       <div className="text-[10px] font-bold text-gray-500 mb-2 tracking-widest flex justify-between">
          <span>DATA STREAM</span>
          <span className="text-cyan-400">{Math.floor(data[data.length-1])} MB/s</span>
       </div>
       <div className="flex-1 flex items-end gap-0.5 opacity-90">
         {data.map((h, i) => (
           <div 
             key={i} 
             className="flex-1 rounded-t bg-gradient-to-t from-cyan-900 to-cyan-400 transition-all duration-100" 
             style={{ height: `${h}%`, opacity: 0.2 + (i/30) }}
           />
         ))}
       </div>
    </div>
  );
}
