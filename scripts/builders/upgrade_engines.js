const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');

const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };
ensureDir(path.join(root, 'components/engines'));
ensureDir(path.join(root, 'components/templates'));

console.log("Architect: Installing UI Engines...");

// --- 1. DATA ENGINE (The Spreadsheet) ---
const dataEngine = \`"use client";
import { useState, useEffect } from "react";

export default function DataEngine({ title }: { title: string }) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // Mock Data Stream
    const newRows = Array.from({ length: 30 }).map((_, i) => ({
      id: "TX-" + Math.floor(Math.random() * 100000),
      hash: "0x" + Math.random().toString(16).substring(2, 10),
      val: (Math.random() * 5000).toFixed(4),
      status: Math.random() > 0.1 ? "CONFIRMED" : "PENDING",
      gas: Math.floor(Math.random() * 50) + " gwei"
    }));
    setRows(newRows);
  }, []);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <div>
           <div className="text-[10px] font-bold text-cyan-500 tracking-widest mb-1">LEDGER SYSTEM</div>
           <h1 className="text-2xl font-black text-white tracking-tight">{title.toUpperCase()}</h1>
        </div>
        <div className="text-xs text-gray-500 font-mono text-right">
           <div>{rows.length} RECORDS</div>
           <div className="text-green-400">SYNCED</div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 sticky top-0 backdrop-blur-md z-10">
            <tr>
              <th className="p-3 text-gray-500 font-bold">ID</th>
              <th className="p-3 text-gray-500 font-bold">HASH</th>
              <th className="p-3 text-gray-500 font-bold">VALUE (ETH)</th>
              <th className="p-3 text-gray-500 font-bold">GAS</th>
              <th className="p-3 text-gray-500 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="p-3 text-blue-400 group-hover:text-blue-300">{r.id}</td>
                <td className="p-3 text-gray-500 group-hover:text-gray-300">{r.hash}</td>
                <td className="p-3 text-white font-bold">{r.val}</td>
                <td className="p-3 text-gray-400">{r.gas}</td>
                <td className="p-3">
                  <span className={\`px-2 py-0.5 rounded text-[9px] font-bold \${r.status === "CONFIRMED" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}\`}>
                    {r.status}
                  </span>
                </td>
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

// --- 2. TERMINAL ENGINE (The Console) ---
const terminalEngine = \`"use client";
import { useState, useEffect, useRef } from "react";

export default function TerminalEngine({ title }: { title: string }) {
  const [lines, setLines] = useState<string[]>(["> Initializing " + title + "...", "> Secure Connection Established."]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
       const cmds = ["checking_integrity", "sync_packet", "allocating_memory", "garbage_collect", "ping_node", "verifying_hash"];
       const cmd = cmds[Math.floor(Math.random() * cmds.length)];
       const status = Math.random() > 0.9 ? "[WARN]" : "[OK]";
       const newLine = \`[root@scrollchain] \${cmd} ... \${status} \${Math.floor(Math.random() * 20)}ms\`;
       setLines(prev => [...prev.slice(-24), newLine]);
    }, 600);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden bg-[#050505] font-mono text-xs text-green-500 p-6 border border-green-900/30 shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
       <div className="mb-4 border-b border-green-900/50 pb-2 text-green-700 font-bold flex justify-between items-center">
          <span>{title.toUpperCase()} // ROOT SHELL</span>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             <span>SECURE</span>
          </div>
       </div>
       <div className="flex-1 space-y-1 overflow-y-auto scrollbar-none">
          {lines.map((l, i) => (
            <div key={i} className={l.includes("WARN") ? "text-yellow-500" : "text-green-500/80"}>{l}</div>
          ))}
          <div ref={endRef} className="animate-pulse text-white mt-2 flex">
             <span className="mr-2 text-green-400">$</span>
             <span className="w-2 h-4 bg-green-500"></span>
          </div>
       </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/engines/TerminalEngine.tsx'), terminalEngine);

// --- 3. COGNITIVE ENGINE (Chat) ---
const aiEngine = \`"use client";
import { useState, useEffect, useRef } from "react";

export default function AIEngine({ title }: { title: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ role: "sys", text: "Neural Link: " + title + " Active. Awaiting Input." }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
       <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
          <div>
             <div className="text-[10px] font-bold text-purple-500 tracking-widest mb-1">COGNITIVE LAYER</div>
             <h1 className="font-bold text-white tracking-tight text-xl">{title}</h1>
          </div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
       </div>
       
       <div className="flex-1 p-6 overflow-y-auto space-y-6 font-mono text-sm bg-gradient-to-b from-transparent to-purple-900/5">
          {history.map((h, i) => (
             <div key={i} className={\`flex \${h.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                <div className={\`max-w-[80%] p-4 rounded-xl border \${h.role === 'user' ? 'bg-purple-600/20 border-purple-500/50 text-purple-100' : 'bg-gray-900/80 border-gray-700 text-gray-300'}\`}>
                   {h.text}
                </div>
             </div>
          ))}
          <div ref={endRef} />
       </div>
       
       <div className="p-4 border-t border-white/10 bg-black/60">
          <div className="relative">
            <input 
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-3 px-4 outline-none text-white placeholder-gray-500 focus:border-purple-500 transition-colors" 
              placeholder="Query the neural model..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if(e.key === 'Enter' && input) {
                   setHistory(p => [...p, { role: 'user', text: input }]);
                   setInput("");
                   setTimeout(() => {
                      setHistory(p => [...p, { role: 'sys', text: "Processing query... Accessing " + title + " vector database." }]);
                   }, 600);
                }
              }}
            />
            <div className="absolute right-3 top-3 text-xs text-gray-500 font-bold">ENTER</div>
          </div>
       </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/engines/AIEngine.tsx'), aiEngine);

// --- 4. THE ROUTER (Smart Switching) ---
const routerContent = \`"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";
import UniversalPage from "./UniversalPage"; // Fallback for 3D/Frontier

export default function RouteDispatcher({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black"></div>;

  // Determine which engine to load
  let content;
  
  if (category.includes("AI") || category.includes("COGNITION") || category.includes("INTEL")) {
      content = <AIEngine title={title} />;
  } 
  else if (category.includes("SECURITY") || category.includes("ADMIN") || category.includes("INFRA") || category.includes("DEEP") || category.includes("PROTECTION")) {
      content = <TerminalEngine title={title} />;
  } 
  else if (category.includes("FINANCE") || category.includes("OPS") || category.includes("DATA") || category.includes("EDGE")) {
      content = <DataEngine title={title} />;
  } 
  else {
      // Default to the 3D HUD for Frontier, Sim, Core, etc.
      return <UniversalPage title={title} category={category} />;
  }

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene category={category} />
      <div className="relative z-10 p-6 flex-1 h-full flex flex-col">
         {content}
      </div>
    </div>
  );
}
\`;
fs.writeFileSync(path.join(root, 'components/templates/RouteDispatcher.tsx'), routerContent);

// --- 5. REGENERATE PAGES ---
console.log("Rewiring 400+ Rooms...");
const sidebarPath = path.join(root, 'components/sidebar/SidebarData.ts');
const content = fs.readFileSync(sidebarPath, 'utf8');
// Robust Regex to parse the JS object structure
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
console.log("Specialization Complete.");
