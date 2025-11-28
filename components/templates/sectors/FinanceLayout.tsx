"use client";
import { useState, useEffect } from "react";

export default function FinanceLayout({ title }: { title: string }) {
  const [price, setPrice] = useState(1240.50);
  
  useEffect(() => {
    const i = setInterval(() => setPrice(p => p + (Math.random() - 0.5) * 10), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="h-full w-full p-6 text-white flex flex-col">
      <div className="flex justify-between items-center border-b border-green-900/50 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-green-400 tracking-tighter uppercase">{title}</h1>
        <div className="text-right">
          <div className="text-xs text-gray-500">LIVE INDEX</div>
          <div className="font-mono text-xl text-green-300">${price.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 flex-1">
        <div className="col-span-3 glass-panel rounded-xl p-4 border-green-500/20 relative overflow-hidden">
           <div className="absolute inset-0 flex items-end justify-around px-4 pb-0 opacity-50">
              {[...Array(20)].map((_,i) => (
                <div key={i} className="w-full bg-green-500/20 mx-1 transition-all duration-500" style={{height: `${Math.random()*80}%`}}></div>
              ))}
           </div>
           <div className="absolute top-4 left-4 text-xs text-green-600">MARKET DEPTH VISUALIZER</div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
           <div className="glass-panel p-4 rounded-xl flex-1 border-green-500/20">
              <div className="text-xs text-gray-500 mb-2">ORDER BOOK</div>
              {[...Array(8)].map((_,i) => (
                 <div key={i} className="flex justify-between text-xs font-mono my-1">
                   <span className="text-red-400">{(1250 - i*2).toFixed(2)}</span>
                   <span className="text-gray-400">{(Math.random()*5).toFixed(4)}</span>
                 </div>
              ))}
           </div>
           <div className="glass-panel p-4 rounded-xl flex-1 border-green-500/20">
              <div className="text-xs text-gray-500 mb-2">RECENT TRADES</div>
              <div className="space-y-1">
                 <div className="text-xs text-green-400">BUY 0.42 ETH</div>
                 <div className="text-xs text-red-400">SELL 1.20 BTC</div>
                 <div className="text-xs text-green-400">BUY 4000 SCR</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
