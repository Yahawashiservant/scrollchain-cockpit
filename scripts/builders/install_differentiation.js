const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Installing Distinct UI Engines...");

// --- 1. DATA ENGINE (Spreadsheet/Grid Look) ---
const dataEngine = \`"use client";
import { useState, useEffect } from "react";

export default function DataEngine({ title }: { title: string }) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // Mock Data
    const newRows = Array.from({ length: 25 }).map((_, i) => ({
      id: "TX-" + Math.floor(Math.random() * 100000),
      hash: "0x" + Math.random().toString(16).substring(2, 10),
      val: (Math.random() * 5000).toFixed(2),
      status: Math.random() > 0.1 ? "VERIFIED" : "PENDING"
    }));
    setRows(newRows);
  }, []);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <h1 className="text-xl font-bold text-cyan-400 tracking-widest">{title.toUpperCase()}</h1>
        <div className="text-xs text-gray-500 font-mono">LIVE LEDGER</div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 sticky top-0 backdrop-blur-md">
            <tr>
              <th className="p-3 text-gray-400">ID</th>
              <th className="p-3 text-gray-400">HASH</th>
              <th className="p-3 text-gray-400">VALUE</th>
              <th className="p-3 text-gray-400">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-3 text-blue-300">{r.id}</td>
                <td className="p-3 text-gray-500">{r.hash}</td>
                <td className="p-3 text-white">{r.val}</td>
                <td className="p-3 text-green-400">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/engines/DataEngine.tsx'), dataEngine);

// --- 2. TERMINAL ENGINE (Console Look) ---
const terminalEngine = \`"use client";
import { useState, useEffect, useRef } from "react";

export default function TerminalEngine({ title }: { title: string }) {
  const [lines, setLines] = useState<string[]>(["> Initializing " + title + "..."]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
       const cmds = ["checking_integrity", "sync_packet", "allocating_memory", "garbage_collect", "ping_node"];
       const cmd = cmds[Math.floor(Math.random() * cmds.length)];
       const newLine = "[root@scrollchain] " + cmd + " ... OK " + Math.floor(Math.random() * 20) + "ms";
       setLines(prev => [...prev.slice(-18), newLine]);
    }, 800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden bg-black/90 font-mono text-xs text-green-500 p-6 border border-green-900/30">
       <div className="mb-4 border-b border-green-900/50 pb-2 text-green-700 font-bold flex justify-between">
          <span>{title.toUpperCase()} // ROOT SHELL</span>
          <span className="animate-pulse">● SECURE</span>
       </div>
       <div className="flex-1 space-y-1 overflow-hidden">
          {lines.map((l, i) => <div key={i}>{l}</div>)}
          <div className="animate-pulse text-white">_</div>
       </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/engines/TerminalEngine.tsx'), terminalEngine);

// --- 3. AI ENGINE (Chat Look) ---
const aiEngine = \`"use client";
import { useState } from "react";

export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: "Neural Link: " + title + " Active." }]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
       <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between">
          <h1 className="font-bold text-purple-400 tracking-widest">{title} // COGNITION</h1>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
       </div>
       <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
          {history.map((h, i) => (
             <div key={i} className={"flex " + (h.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={"max-w-[80%] p-3 rounded " + (h.role === 'user' ? 'bg-purple-900/40 border border-purple-500' : 'bg-gray-800 text-gray-300')}>
                   {h.text}
                </div>
             </div>
          ))}
       </div>
       <div className="p-3 border-t border-white/10 bg-black/40">
          <input 
            className="w-full bg-transparent outline-none text-white placeholder-gray-600" 
            placeholder="Query the model..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if(e.key === 'Enter' && input) {
                 setHistory(p => [...p, { role: 'user', text: input }, { role: 'sys', text: "Processing request..." }]);
                 setInput("");
              }
            }}
          />
       </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/engines/AIEngine.tsx'), aiEngine);

// --- 4. ROUTE DISPATCHER (The Switcher) ---
const routerContent = \`"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";

export default function RouteDispatcher({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black"></div>;

  let Engine = DataEngine;
  // Logic to pick the right engine based on category
  if (category.includes("AI") || category.includes("COGNITION") || category.includes("INTEL")) Engine = AIEngine;
  if (category.includes("SECURITY") || category.includes("ADMIN") || category.includes("INFRA") || category.includes("DEEP")) Engine = TerminalEngine;

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene />
      <div className="relative z-10 p-6 flex-1 h-full flex flex-col">
         <Engine title={title} />
      </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/templates/RouteDispatcher.tsx'), routerContent);

// --- 5. REGENERATE ALL PAGES ---
console.log("Rewiring 400+ Rooms to Dynamic Engines...");
const sidebarPath = path.join(root, 'components/sidebar/SidebarData.ts');
if (fs.existsSync(sidebarPath)) {
  const content = fs.readFileSync(sidebarPath, 'utf8');
  const regex = /cat:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const [_, cat, name, rawPath] = match;
    if (rawPath.startsWith('/dashboard/')) {
        const folder = rawPath.replace('/dashboard/', '');
        const dir = path.join(root, 'app/dashboard', folder);
        ensureDir(dir);
        const pageContent = \`import RouteDispatcher from "../../../components/templates/RouteDispatcher";
export default function P(){return <RouteDispatcher title="\${name}" category="\${cat}" />}\`;
        fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
    }
  }
}
console.log("Complete.");
