"use client";
export default function SecurityLayout({ title }: { title: string }) {
  return (
    <div className="h-full w-full p-6 text-red-500 font-mono flex flex-col bg-black relative">
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,0,0,0.05)_2px)]"></div>
      
      <div className="border-b border-red-900/50 pb-4 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase glitch">{title}</h1>
        <div className="px-4 py-1 bg-red-900/20 border border-red-600 rounded text-xs animate-pulse">SECURE CONNECTION</div>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        <div className="border border-red-900/30 bg-red-950/5 p-4 rounded relative overflow-hidden">
           <div className="text-xs mb-2 text-red-700">THREAT MAP</div>
           {/* Mock Map Radar */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-64 h-64 border border-red-500 rounded-full animate-ping"></div>
           </div>
        </div>
        <div className="border border-red-900/30 bg-black p-4 rounded text-xs overflow-hidden">
           <div className="text-red-700 mb-2">SYSTEM LOGS</div>
           <div className="space-y-1 opacity-70">
             <div>[14:00:01] SCANNING PORTS...</div>
             <div>[14:00:02] FIREWALL: ACTIVE</div>
             <div>[14:00:05] <span className="text-white">NO THREATS DETECTED</span></div>
             <div className="animate-pulse">_</div>
           </div>
        </div>
      </div>
    </div>
  );
}
