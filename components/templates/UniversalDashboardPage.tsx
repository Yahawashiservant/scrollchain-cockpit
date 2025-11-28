"use client";
import { useState, useEffect } from "react";

export default function UniversalDashboardPage({ title, category, color }: { title: string, category: string, color: string }) {
  const [activity, setActivity] = useState<number[]>(Array(20).fill(0));
  const [logs, setLogs] = useState<string[]>(["> System Initialized..."]);
  
  // Simulation of live data
  useEffect(() => {
    const interval = setInterval(() => {
      // Update graph data
      setActivity(prev => [...prev.slice(1), Math.random() * 100]);
      
      // Update mock logs
      const newLog = `[${new Date().toLocaleTimeString()}] ${category}_daemon: processed_packet_${Math.floor(Math.random() * 9999)}`;
      setLogs(prev => [...prev.slice(-8), newLog]);
    }, 1000);
    return () => clearInterval(interval);
  }, [category]);

  return (
    <div className="h-full w-full bg-black p-6 text-white flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`text-xs font-bold tracking-widest ${color} mb-1`}>{category.toUpperCase()}</div>
          <h1 className="text-3xl font-black text-white">{title.replace(/-/g, ' ').toUpperCase()}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="text-xs text-green-500 font-mono">LIVE</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Left: Activity Monitor */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col">
           <h3 className="text-sm font-bold text-gray-400 mb-4">ACTIVITY STREAM</h3>
           <div className="flex-1 flex items-end space-x-1 h-64">
              {activity.map((h, i) => (
                <div key={i} className={`flex-1 rounded-t transition-all duration-300 ${color.replace('text', 'bg')}`} style={{ height: `${h}%`, opacity: 0.5 + (i/40) }}></div>
              ))}
           </div>
        </div>

        {/* Right: Status & Logs */}
        <div className="flex flex-col gap-6">
           <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-400 mb-2">STATUS</h3>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-2">
                 <span className="text-xs text-gray-500">UPTIME</span>
                 <span className="font-mono">99.99%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-500">LATENCY</span>
                 <span className="font-mono text-green-400">12ms</span>
              </div>
           </div>

           <div className="flex-1 bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs overflow-hidden relative">
              <div className="absolute top-2 right-3 text-gray-600">CONSOLE</div>
              <div className="mt-4 space-y-1 text-gray-400">
                 {logs.map((l, i) => <div key={i}>{l}</div>)}
                 <div className={`animate-pulse ${color}`}>_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
