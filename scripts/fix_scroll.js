const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../');

console.log("Architect: Applying Scroll & Visual Fixes...");

// 1. GLOBAL CSS (High Fidelity + Scrollbar Support)
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-deep: #02040a;
  --neon-cyan: #06b6d4;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: var(--bg-deep);
  color: #e2e8f0;
  overflow: hidden; /* The Layout component handles the scroll */
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background-image: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1), transparent 70%);
}

.glass-panel {
  background: rgba(13, 17, 23, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Custom Scrollbar */
.scroll-area::-webkit-scrollbar { width: 10px; }
.scroll-area::-webkit-scrollbar-track { background: #0b1120; }
.scroll-area::-webkit-scrollbar-thumb { 
  background: #1e293b; 
  border-radius: 5px; 
  border: 1px solid #334155;
}
.scroll-area::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
`;
fs.writeFileSync(path.join(root, 'app/globals.css'), cssContent);

// 2. LAYOUT (Fixed Sidebar / Scrollable Main)
const layoutContent = `import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full bg-[#02040a] text-white overflow-hidden">
      
      {/* SIDEBAR: Fixed to left, Full Height */}
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 h-full relative flex flex-col min-w-0">
        
        {/* Header Decoration */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 shrink-0 z-20"></div>
        
        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto scroll-area relative z-10 p-0">
           {children}
           {/* Bottom Padding ensures content isn't cut off */}
           <div className="h-24"></div>
        </div>

        {/* BACKGROUND: Fixed behind the scroll area */}
        <div className="absolute inset-0 pointer-events-none z-0">
           {/* 3D Scene sits here visually via the Page component */}
        </div>
      </main>
    </div>
  )
}
`;
fs.writeFileSync(path.join(root, 'app/dashboard/layout.tsx'), layoutContent);

// 3. CYBER SCENE (3D Engine)
const sceneContent = `"use client";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";

export default function CyberScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 10, 40]} />
        <Stars radius={80} depth={60} count={6000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={300} scale={20} size={3} speed={0.2} opacity={0.5} color="#06b6d4" />
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[0.5, 0.5, 0]} position={[5, -2, -10]}>
             <icosahedronGeometry args={[4, 0]} />
             <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.08} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
`;
fs.writeFileSync(path.join(root, 'components/visuals/CyberScene.tsx'), sceneContent);

// 4. UNIVERSAL PAGE TEMPLATE (Fixed Structure)
const pageContent = `"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";
import ActiveTerminal from "../interactive/ActiveTerminal";
import ControlDeck from "../interactive/ControlDeck";
import LiveGraph from "../interactive/LiveGraph";

export default function UniversalPage({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  const [metric, setMetric] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => {
        setMetric(Math.random() * 100);
        // Simple string concatenation to avoid shell escape issues
        const time = new Date().toLocaleTimeString();
        const msg = "[" + time + "] " + title.toUpperCase() + ": active_signal > OK";
        setLogs(prev => [msg, ...prev.slice(0, 10)]);
    }, 1000);
    return () => clearInterval(i);
  }, [title]);

  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  let themeColor = "cyan";
  if (category.includes("SECURITY")) themeColor = "red";
  if (category.includes("FINANCE")) themeColor = "green";

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene />
      
      <div className="relative z-10 p-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4 backdrop-blur-md bg-black/40 p-6 rounded-xl border border-white/5">
           <div>
             <div className={"text-[10px] font-bold tracking-[0.4em] mb-2 text-" + themeColor + "-400"}>SCROLLCHAIN // {category}</div>
             <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500 tracking-tighter uppercase">{title}</h1>
           </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="glass-panel p-6 rounded-xl">
              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">LIVE LOAD</div>
              <div className="text-4xl font-mono text-white mb-2">{Math.floor(metric)}%</div>
              <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" style={{width: metric + "%"}}></div>
              </div>
              <div className="mt-6 h-32"><LiveGraph /></div>
           </div>

           <div className="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col min-h-[400px] relative overflow-hidden">
              <div className="text-xs text-gray-500 font-bold tracking-widest mb-4 border-b border-gray-800 pb-2">TERMINAL OUTPUT</div>
              <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-2 overflow-y-auto">
                 {logs.map((l, i) => (
                    <div key={i} className="hover:bg-white/5 p-1 rounded cursor-pointer border-l-2 border-transparent hover:border-cyan-500 pl-2">{l}</div>
                 ))}
              </div>
           </div>
        </div>
        
        {/* SCROLL TEST CONTENT */}
        <div className="glass-panel p-8 rounded-xl mt-4">
             <h3 className="text-sm font-bold text-gray-400 mb-4">DEEP ANALYTICS</h3>
             <div className="grid grid-cols-4 gap-4">
                 {[...Array(12)].map((_, i) => (
                     <div key={i} className="p-4 bg-black/40 rounded border border-white/5 text-center">
                         <div className="text-[10px] text-gray-600">METRIC_{i}</div>
                         <div className="text-xl text-gray-300 font-mono">{(Math.random() * 1000).toFixed(2)}</div>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(root, 'components/templates/UniversalPage.tsx'), pageContent);

console.log("Architect: Fix Applied.");
