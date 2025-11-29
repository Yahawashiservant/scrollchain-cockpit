"use client";
import { useEffect, useRef } from "react";

export default function MeshNetwork({ nodes }: { nodes: any[] }) {
  return (
    <div className="glass-panel rounded-xl p-6 h-full relative overflow-hidden">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="font-bold text-green-400 tracking-widest text-xs">MESH TOPOLOGY</h3>
        <div className="text-[10px] text-gray-500">ACTIVE NODES: {nodes.length}</div>
      </div>
      
      {/* Simulated Node Grid */}
      <div className="grid grid-cols-4 gap-4 mt-8 h-full overflow-y-auto">
        {nodes.map((node, i) => (
          <div key={i} className="bg-black/40 border border-green-900/30 p-3 rounded flex flex-col gap-2 hover:border-green-500/50 transition-all">
            <div className="flex justify-between items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-gray-500 font-mono">{node.id}</span>
            </div>
            <div className="text-xs text-white font-bold">{node.region}</div>
            <div className="w-full bg-gray-800 h-1 rounded"><div className="bg-green-600 h-full" style={{width: \`\${node.load}%\`}}></div></div>
            <div className="text-[9px] text-green-300/70 text-right">{node.latency}ms</div>
          </div>
        ))}
      </div>
    </div>
  );
}
