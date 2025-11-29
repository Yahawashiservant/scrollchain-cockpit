const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');

// 1. DEFINE THE MASTER DATA INTERNALLY (No Imports)
const BLUEPRINT = {
  "CORE": ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"],
  "PROTECTION": ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Ice Monitor", "Legal Defense", "Global Killswitch"],
  "MESH OPS": ["Mesh Ingest", "Mesh List", "Mesh Sync", "Partition Maint", "Meta Index", "Solar Lead", "Events", "Audit", "Health"],
  "FINANCE": ["Token Ledger", "Receipts Log", "Finance Rebalance", "Stripe Webhook", "Token Mint", "Billing", "Tokenization", "DeFi Lending", "Marketplace"],
  "AI": ["Intelligence", "Neural Shader", "Swarm Consensus", "Cognition Graph", "Neural Voice", "Code Synthesis", "Generative Art", "Autonomous DAO", "Singularity Index"],
  "INFRA": ["Kernel State", "NATS Mesh", "Telemetry", "Edge Functions", "Server Mesh", "Load Balancer", "CDN Status", "IoT Mesh", "Multi-DB", "Streams"],
  "SECURITY": ["Vault", "Compliance", "Cyber Defense", "Pen Testing", "Access Control", "Contract Auditor", "Identity", "Quantum Keys", "Audit Logs", "Dark Web"],
  "FRONTIER": ["Exoplanet Scanner", "Fusion Reactor", "Quantum Computer", "Warp Drive", "Dyson Sphere", "Antimatter", "Bio Lab", "Particle Collider"],
  "SIMULATION": ["Life Game", "Gravity Sandbox", "Evolution", "Star Forge", "Erosion Sim", "Particle Storm", "Fluid Sim", "Planet Builder"],
  "UNDERGROUND": ["Black Market", "Safe House", "Dead Drop", "Smuggler Route", "Hacker Den", "Pirate Radio", "Data Haven", "Ghost Network"],
  "STRATEGIC": ["War Room", "Nuclear Silo", "Spec Ops", "Radar Array", "Bunker Status", "Bioweapon Labs", "PsyOps", "DEFCON"],
  "SPIRITUAL": ["Akashic Records", "Karma Tracker", "Meditation", "Chakra Alignment", "Astral Plane", "Tarot Reader", "Spirit Guide", "Past Lives"],
  "ABSTRACT": ["Chaos Engine", "Memory Palace", "Dream State", "Logic Core", "Pulse Monitor", "Frequency Tuner", "Crypto Graph", "Time Machine"],
  "CREATIVE": ["Holo Canvas", "Beat Maker", "Voxel Sculptor", "Story Engine", "Texture Gen", "Rigging Bay", "Render Farm", "Color Grade"],
  "ADMIN": ["Global Users", "Ban Hammer", "Feature Gates", "API Limits", "Webhook Logs", "OAuth Apps", "Session Manager", "2FA Settings"]
};

let sidebarItems = [];
Object.keys(BLUEPRINT).forEach(cat => {
  BLUEPRINT[cat].forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let color = "text-gray-400";
    if (cat === "CORE") color = "text-cyan-400";
    else if (cat === "FINANCE") color = "text-green-400";
    else if (cat === "SECURITY") color = "text-red-500";
    else if (cat === "AI") color = "text-purple-400";
    
    sidebarItems.push({ cat: cat, name: name, path: "/dashboard/" + slug, color: color });
  });
});

// 2. WRITE SIDEBAR DATA (So components can use it)
const dataContent = "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";";
fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), dataContent);

// 3. WRITE SIDEBAR COMPONENT
// We use simple string concatenation for the React code to avoid backtick issues in the shell heredoc
const sidebarCode = '"use client";\n' +
'import Link from "next/link";\n' +
'import { usePathname } from "next/navigation";\n' +
'import { useState } from "react";\n' +
'import { MENU_ITEMS } from "./sidebar/SidebarData";\n\n' +
'export default function Sidebar() {\n' +
'  const pathname = usePathname();\n' +
'  const [openCat, setOpenCat] = useState("CORE");\n' +
'  const grouped = MENU_ITEMS.reduce((acc, item) => {\n' +
'    if (!acc[item.cat]) acc[item.cat] = [];\n' +
'    acc[item.cat].push(item);\n' +
'    return acc;\n' +
'  }, {});\n' +
'  return (\n' +
'    <div className="w-64 h-full flex flex-col bg-black/95 backdrop-blur-xl border-r border-cyan-900/30 text-xs">\n' +
'      <div className="p-4 border-b border-cyan-900/30"><div className="font-black text-cyan-400 tracking-[0.2em] text-lg">SCROLLCHAIN</div></div>\n' +
'      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-cyan-900">\n' +
'        {Object.entries(grouped).map(([cat, items]) => (\n' +
'          <div key={cat} className="mb-2">\n' +
'            <button onClick={() => setOpenCat(openCat === cat ? null : cat)} className="w-full px-3 py-2 text-[10px] font-bold text-gray-500 tracking-widest text-left hover:text-white flex justify-between">{cat} <span>{openCat === cat ? "-" : "+"}</span></button>\n' +
'            {openCat === cat && (\n' +
'              <div className="pl-2 border-l border-gray-800 ml-2 space-y-0.5">\n' +
'                {items.map(item => (\n' +
'                  <Link key={item.path} href={item.path} className={"block px-3 py-1.5 rounded transition-colors " + (pathname === item.path ? "bg-cyan-900/20 text-white" : "text-gray-500 hover:text-gray-300")}>\n' +
'                    <span className={"mr-2 " + item.color}>●</span> {item.name}\n' +
'                  </Link>\n' +
'                ))}\n' +
'              </div>\n' +
'            )}\n' +
'          </div>\n' +
'        ))}\n' +
'      </div>\n' +
'    </div>\n' +
'  );\n' +
'}\n';
fs.writeFileSync(path.join(root, 'components/Sidebar.tsx'), sidebarCode);

// 4. GENERATE PAGES
sidebarItems.forEach(item => {
  const folder = item.path.replace('/dashboard/', '');
  const dir = path.join(root, 'app/dashboard', folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const pageContent = 'import RouteDispatcher from "../../../components/templates/RouteDispatcher";\n' +
                      'export default function P() { return <RouteDispatcher title="' + item.name + '" category="' + item.cat + '" />; }';
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log("BUILD COMPLETE.");
