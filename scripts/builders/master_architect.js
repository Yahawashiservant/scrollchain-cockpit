const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');

const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Architect: Initializing System...");

// --- DATA STRUCTURES (Simplified for stability) ---
const BLUEPRINT = {
  "CORE": ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"],
  "PROTECTION": ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Global Killswitch"],
  "INFRA": ["Kernel State", "NATS Mesh", "Telemetry", "Edge Functions", "Load Balancer", "CDN Status"],
  "AI": ["Intelligence", "Neural Shader", "Agent Swarm", "Me Chat", "Training Session"],
  "FINANCE": ["Billing", "Token Ledger", "DeFi Lending", "Marketplace", "Arbitrage Bot"],
  "SECURITY": ["Vault", "Cyber Defense", "Pen Testing", "Audit Logs", "Dark Web"],
  "FRONTIER": ["Exoplanet Scanner", "Warp Drive", "Dyson Sphere", "Quantum Computer"],
  "SIMULATION": ["Life Game", "Gravity Sandbox", "Evolution", "Fluid Sim"],
};

// --- WRITE CORE FILES ---

// 1. GLOBAL CSS (Scroll Fix)
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #02040a;
  color: #e2e8f0;
  overflow: hidden; /* Controlled by Layout */
  font-family: monospace;
}

.glass-panel {
  background: rgba(13, 17, 23, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.scroll-area::-webkit-scrollbar { width: 10px; }
.scroll-area::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; }
`;
fs.writeFileSync(path.join(root, 'app/globals.css'), cssContent);

// 2. LAYOUT (CRITICAL SCROLL FIX)
const layoutContent = `import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-[#02040a] overflow-hidden">
      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 shrink-0 z-20"></div>
        <div className="flex-1 overflow-y-auto scroll-area p-0 relative z-10">
           {children}
           <div className="h-24"></div>
        </div>
      </main>
    </div>
  )
}`;
fs.writeFileSync(path.join(root, 'app/dashboard/layout.tsx'), layoutContent);


// 3. WRITE SIDEBAR COMPONENT & DATA (SAFE GENERATION)
let sidebarItems = [];
Object.keys(BLUEPRINT).forEach(cat => {
  BLUEPRINT[cat].forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    sidebarItems.push({ cat: cat, name: name, path: "/dashboard/" + slug, color: "text-cyan-400" });
  });
});

fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";");

const sidebarCode = `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MENU_ITEMS } from "./sidebar/SidebarData";

export default function Sidebar() {
  const pathname = usePathname();
  const [openCat, setOpenCat] = useState("CORE");
  const grouped = MENU_ITEMS.reduce((acc, item) => { if (!acc[item.cat]) acc[item.cat] = []; acc[item.cat].push(item); return acc; }, {});

  return (
    <div className="w-full h-full flex flex-col bg-black/95 backdrop-blur-xl text-xs">
      <div className="p-4 border-b border-cyan-900/30"><div className="font-black text-cyan-400 tracking-[0.2em] text-lg">SCROLLCHAIN</div></div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-2">
            <button onClick={() => setOpenCat(openCat === cat ? null : cat)} className="w-full px-3 py-2 text-[10px] font-bold text-gray-500 tracking-widest text-left hover:text-white flex justify-between">{cat} <span>{openCat === cat ? '-' : '+'}</span></button>
            {openCat === cat && (
              <div className="pl-2 border-l border-gray-800 ml-2 space-y-0.5">
                {items.map(item => (
                  <Link key={item.path} href={item.path} className={"block px-3 py-1.5 rounded transition-colors " + (pathname === item.path ? "bg-cyan-900/20 text-white" : "text-gray-500 hover:text-gray-300")}>
                    <span className={"mr-2 " + item.color}>●</span> {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}`;
fs.writeFileSync(path.join(root, 'components/Sidebar.tsx'), sidebarCode);

// 4. GENERATE UNIVERSAL PAGE FILES
console.log("Generating Room Files...");
ensureDir(path.join(root, 'components/templates'));
fs.writeFileSync(path.join(root, 'components/templates/RouteDispatcher.tsx'), 'import UniversalPage from "./UniversalPage";\nexport default function RouteDispatcher({ title, category }) { return <UniversalPage title={title} category={category} />; }');
fs.writeFileSync(path.join(root, 'components/templates/UniversalPage.tsx'), 'export default function UniversalPage({ title, category }) { return <div className="p-8"><h1 className="text-4xl">{title}</h1><p className="glass-panel p-4 mt-4">Status: Active</p></div>;}');

// Create folders for all pages
sidebarItems.forEach(item => {
  const folder = item.path.replace('/dashboard/', '');
  const dir = path.join(root, 'app/dashboard', folder);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'page.tsx'), 'import RouteDispatcher from "../../../components/templates/RouteDispatcher"; export default function P(){return <RouteDispatcher title="' + item.name + '" category="' + item.cat + '" />}');
});

console.log("Build Complete. Ready for Launch.");
