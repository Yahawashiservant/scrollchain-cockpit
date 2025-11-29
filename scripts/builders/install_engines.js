const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

// --- 1. WRITE GLOBAL CSS (HIGH FIDELITY) ---
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-deep: #02040a;
  --neon-cyan: #06b6d4;
}

body {
  background-color: var(--bg-deep);
  color: #e2e8f0;
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background-image: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%);
}

.glass-panel {
  background: rgba(13, 17, 23, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #02040a; }
::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; }
`;
fs.writeFileSync(path.join(root, 'app/globals.css'), cssContent);

// --- 2. WRITE 3D SCENE (VISUALS) ---
ensureDir(path.join(root, 'components/visuals'));
const sceneContent = `"use client";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";

export default function CyberScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 10, 40]} />
        <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={1} />
        <Sparkles count={300} scale={20} size={4} speed={0.3} opacity={0.6} color="#00ffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[0.5, 0.5, 0]} position={[5, -2, -10]}>
             <icosahedronGeometry args={[4, 0]} />
             <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.08} />
          </mesh>
        </Float>
        <ambientLight intensity={1.5} />
      </Canvas>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/visuals/CyberScene.tsx'), sceneContent);

// --- 3. WRITE UI ENGINES (LOGIC) ---
ensureDir(path.join(root, 'components/engines'));

// ENGINE A: DATA GRID (Finance/Ops)
const dataEngineContent = `"use client";
export default function DataEngine({ title }: { title: string }) {
  const data = Array.from({ length: 20 }).map((_, i) => ({
    id: \`TX-\${Math.floor(Math.random() * 99999)}\`,
    val: (Math.random() * 1000).toFixed(2),
    status: Math.random() > 0.1 ? "CONFIRMED" : "PENDING"
  }));

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
        <h3 className="font-bold text-cyan-400 tracking-widest text-lg">{title}</h3>
        <div className="text-xs text-gray-500">{data.length} RECORDS</div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
             <tr><th className="p-3">ID</th><th className="p-3">VALUE (ETH)</th><th className="p-3">STATUS</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {data.map((row, i) => (
               <tr key={i} className="hover:bg-white/5 transition-colors">
                 <td className="p-3 text-cyan-300">{row.id}</td>
                 <td className="p-3 text-white">{row.val}</td>
                 <td className="p-3 text-green-400">{row.status}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/engines/DataEngine.tsx'), dataEngineContent);

// ENGINE B: AI CHAT (Intelligence/Cognition)
const aiEngineContent = `"use client";
import { useState } from "react";

export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: \`Connected to \${title}. Ready.\` }]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl">
       <div className="p-4 border-b border-white/10 bg-black/40">
          <h1 className="font-bold text-purple-400 tracking-widest">{title} // NEURAL LINK</h1>
       </div>
       <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs">
          {history.map((h, i) => (
             <div key={i} className={\`p-2 rounded \${h.role === 'user' ? 'bg-purple-900/30 ml-auto' : 'bg-gray-800/50'}\`}>{h.text}</div>
          ))}
       </div>
       <div className="p-3 border-t border-white/10">
          <input 
            className="w-full bg-transparent outline-none text-white" 
            placeholder="Send command..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if(e.key === 'Enter') {
                 setHistory(p => [...p, { role: 'user', text: input }, { role: 'sys', text: "Processing..." }]);
                 setInput("");
              }
            }}
          />
       </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/engines/AIEngine.tsx'), aiEngineContent);

// ENGINE C: TERMINAL (Security/Admin)
const terminalEngineContent = `"use client";
export default function TerminalEngine({ title }: { title: string }) {
  const lines = Array.from({length: 15}).map(() => \`[root@scrollchain] process_\${Math.floor(Math.random()*999)} ... OK\`);
  return (
    <div className="h-full glass-panel rounded-xl p-6 font-mono text-xs text-red-400 bg-black/90 flex flex-col">
       <div className="mb-4 border-b border-red-900/50 pb-2 font-bold text-red-500">ROOT TERMINAL // {title}</div>
       <div className="flex-1 space-y-1">
          {lines.map((l, i) => <div key={i}>{l}</div>)}
          <div className="animate-pulse text-white">_</div>
       </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/engines/TerminalEngine.tsx'), terminalEngineContent);

// --- 4. WRITE ROUTER ---
ensureDir(path.join(root, 'components/templates'));
const routerContent = `"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";

export default function RouteDispatcher({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black"></div>;

  let Engine = DataEngine; // Default
  if (category.includes("AI") || category.includes("COGNITION")) Engine = AIEngine;
  if (category.includes("SECURITY") || category.includes("ADMIN")) Engine = TerminalEngine;

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene />
      <div className="relative z-10 p-8 flex-1 flex flex-col h-full">
         <Engine title={title} />
      </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/templates/RouteDispatcher.tsx'), routerContent);

// --- 5. RE-WIRE ALL PAGES ---
console.log("Re-wiring pages to use RouteDispatcher...");
const sidebarPath = path.join(root, 'components/sidebar/SidebarData.ts');
const sidebarFile = fs.readFileSync(sidebarPath, 'utf8');

// Simple regex to extract path, name, and category
const regex = /cat:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(sidebarFile)) !== null) {
  const [_, cat, name, rawPath] = match;
  if (rawPath.startsWith('/dashboard/')) {
      const folder = rawPath.replace('/dashboard/', '');
      const dir = path.join(root, 'app/dashboard', folder);
      ensureDir(dir);
      const pageContent = \`import RouteDispatcher from "../../../components/templates/RouteDispatcher";
export default function Page() { return <RouteDispatcher title="\${name}" category="\${cat}" />; }\`;
      fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
  }
}

console.log("Installation Complete.");
