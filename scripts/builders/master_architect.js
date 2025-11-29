const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');

const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Architect: Starting fabrication...");

// 1. GLOBAL STYLES
const cssContent = "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --bg-deep: #02040a; --neon-cyan: #06b6d4; }\n\nbody { background-color: var(--bg-deep); color: #e2e8f0; overflow: hidden; font-family: monospace; background-image: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1), transparent 70%); }\n.glass-panel { background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(56, 189, 248, 0.2); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); }\n.scroll-area::-webkit-scrollbar { width: 10px; }\n.scroll-area::-webkit-scrollbar-track { background: #0b1121; }\n.scroll-area::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 4px; border: 2px solid #0b1121; }";
fs.writeFileSync(path.join(root, 'app/globals.css'), cssContent);

// 2. LAYOUT
const layoutContent = 'import Sidebar from "../../components/Sidebar";\nexport default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className="flex h-screen w-full bg-[#02040a] text-white overflow-hidden">\n      <aside className="w-64 flex-shrink-0 h-full border-r border-cyan-900/30 bg-black/90 z-50"><Sidebar /></aside>\n      <main className="flex-1 flex flex-col h-full relative min-w-0">\n        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 shrink-0"></div>\n        <div className="flex-1 overflow-y-auto scroll-area p-0 relative z-10">\n           {children}\n           <div className="h-24"></div>\n        </div>\n      </main>\n    </div>\n  )\n}';
fs.writeFileSync(path.join(root, 'app/dashboard/layout.tsx'), layoutContent);

// 3. 3D SCENE
ensureDir(path.join(root, 'components/visuals'));
const sceneContent = '"use client";\nimport { Canvas } from "@react-three/fiber";\nimport { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";\n\nexport default function CyberScene() {\n  return (\n    <div className="fixed inset-0 z-0 pointer-events-none">\n      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>\n        <color attach="background" args={["#02040a"]} />\n        <fog attach="fog" args={["#02040a", 10, 50]} />\n        <Stars radius={80} depth={60} count={5000} factor={4} saturation={0} fade speed={1} />\n        <Sparkles count={300} scale={20} size={3} speed={0.4} opacity={0.5} color="#06b6d4" />\n        <ambientLight intensity={0.5} />\n        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>\n          <mesh rotation={[0.5, 0.5, 0]} position={[5, -2, -10]}>\n             <icosahedronGeometry args={[4, 0]} />\n             <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.08} />\n          </mesh>\n        </Float>\n      </Canvas>\n    </div>\n  );\n}';
fs.writeFileSync(path.join(root, 'components/visuals/CyberScene.tsx'), sceneContent);

// 4. UNIVERSAL TEMPLATE
ensureDir(path.join(root, 'components/templates'));
const pageTemplate = '"use client";\nimport { useState, useEffect } from "react";\nimport CyberScene from "../visuals/CyberScene";\n\nexport default function UniversalPage({ title, category }: { title: string, category: string }) {\n  const [mounted, setMounted] = useState(false);\n  const [metric, setMetric] = useState(0);\n  const [logs, setLogs] = useState([]);\n\n  useEffect(() => {\n    setMounted(true);\n    const i = setInterval(() => {\n      setMetric(Math.random() * 100);\n      const logMsg = "[" + new Date().toLocaleTimeString() + "] " + title.toUpperCase() + ": process_node_" + Math.floor(Math.random()*999) + " active";\n      setLogs(prev => [logMsg, ...prev.slice(0, 15)]);\n    }, 800);\n    return () => clearInterval(i);\n  }, [title]);\n\n  if (!mounted) return <div className="h-screen w-full bg-black"></div>;\n\n  return (\n    <div className="min-h-full w-full relative flex flex-col text-white">\n      <CyberScene />\n      <div className="relative z-10 p-8 flex flex-col gap-6">\n        <div className="border-b border-cyan-900/30 pb-4 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5">\n           <div className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] mb-2">SCROLLCHAIN // {category}</div>\n           <h1 className="text-5xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-500">{title}</h1>\n        </div>\n        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">\n           <div className="glass-panel p-6 rounded-xl bg-black/60">\n              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">LIVE METRIC</div>\n              <div className="text-4xl font-mono mb-2">{metric.toFixed(1)}%</div>\n              <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">\n                <div className="h-full bg-cyan-500 transition-all duration-500" style={{width: metric + "%"}}></div>\n              </div>\n           </div>\n           <div className="lg:col-span-2 glass-panel p-6 rounded-xl bg-black/60 min-h-[300px] flex flex-col">\n              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest border-b border-gray-800 pb-2">DATA STREAM</div>\n              <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-1 overflow-hidden">\n                {logs.map((l, i) => <div key={i} className="truncate hover:bg-white/5 p-1">{l}</div>)}\n              </div>\n           </div>\n        </div>\n      </div>\n    </div>\n  );\n}';
fs.writeFileSync(path.join(root, 'components/templates/UniversalPage.tsx'), pageTemplate);

// 5. GENERATE DATA
const BLUEPRINT = {
  "CORE": ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"],
  "PROTECTION": ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Ice Monitor", "Legal Defense", "Global Killswitch"],
  "INFRA": ["Kernel State", "NATS Mesh", "Telemetry", "Edge Functions", "Server Mesh", "Load Balancer", "CDN Status", "IoT Mesh", "Multi-DB", "Streams"],
  "AI": ["Intelligence", "Neural Shader", "Swarm Consensus", "Cognition Graph", "Neural Voice", "Code Synthesis", "Generative Art", "Autonomous DAO", "Singularity Index"],
  "FINANCE": ["Billing", "Tokenization", "DeFi Lending", "Marketplace", "Carbon Credits", "Arbitrage Bot", "Liquidity Pools", "Payment Gateway", "Tax Calc", "Whale Watch", "DAO Treasury"],
  "OPS": ["Governance", "Supply Chain", "Global Trade", "Client Dashboards", "Lead Flows", "CRM", "HR Intelligence", "Talent Pipeline", "Payroll", "Secure Chat", "Town Hall", "Wiki"],
  "SECURITY": ["Vault", "Compliance", "Cyber Defense", "Pen Testing", "Access Control", "Contract Auditor", "Identity", "Quantum Keys", "Audit Logs", "Dark Web"],
  "FRONTIER": ["Exoplanet Scanner", "Fusion Reactor", "Quantum Computer", "Warp Drive", "Dyson Sphere", "Antimatter", "Bio Lab", "Particle Collider", "Terraforming", "Space Elevator", "Time Dilation", "String Theory", "Multiverse", "Mind Upload", "Cryogenics", "Alien Signal", "Void Shield", "Omega Point"],
  "SIM": ["Life Game", "Gravity Sandbox", "Evolution", "Star Forge", "Erosion Sim", "Particle Storm", "Fluid Sim", "Planet Builder", "Traffic Flow", "Crowd Dynamics", "Orbit Plotter", "Ray Tracer", "Sound Scaper", "Voxel Editor", "Logic Sandbox", "Ecosystem Sim"],
  "UNDERGROUND": ["Black Market", "Safe House", "Dead Drop", "Smuggler Route", "Hacker Den", "Pirate Radio", "Data Haven", "Ghost Network", "Resistance HQ", "Graffiti Wall", "Glitch Zone", "Zero Day Market", "Clone Vat", "Memory Wiper", "Identity Forger", "Shadow Bank", "Fight Club", "The Undercity"],
  "STRATEGIC": ["War Room", "Nuclear Silo", "Spec Ops", "Radar Array", "Bunker Status", "Bioweapon Labs", "PsyOps", "DEFCON", "Orbital Laser", "Submarine Fleet", "Air Traffic", "Encryption Breaker", "Spy Network", "Drone Command", "Cyber Warfare", "Emergency Broadcast", "Asset Recovery", "Doomsday Clock"],
  "SPIRITUAL": ["Akashic Records", "Karma Tracker", "Meditation", "Chakra Alignment", "Astral Plane", "Tarot Reader", "Spirit Guide", "Past Lives", "Aura Scanner", "Sacred Geometry", "Nirvana Gauge", "Third Eye", "Telepathy Net", "Reincarnation", "Soul Ledger", "Enlightenment", "Vibration Tuner", "Oracle", "Zen Garden", "Collective Unconscious"],
  "ABSTRACT": ["Chaos Engine", "Memory Palace", "Dream State", "Logic Core", "Pulse Monitor", "Frequency Tuner", "Crypto Graph", "Time Machine", "Glitch Art", "Holo Deck", "Sub Space", "Code Matrix", "Genome Editor", "Hive Mind", "Echo Chamber", "Mirror World", "Ghost in Shell", "Artifacts", "Registry Editor", "Terminal X"],
  "CREATIVE": ["Holo Canvas", "Beat Maker", "Voxel Sculptor", "Story Engine", "Texture Gen", "Rigging Bay", "Render Farm", "Color Grade", "Audio Master", "Script Editor", "Level Design", "Character Rigger", "Motion Capture", "Photogrammetry", "Synth Rack", "Sample Library", "Font Foundry", "Iconography", "Layout Tool", "Publish Hub"],
  "ADMIN": ["Global Users", "Ban Hammer", "Feature Gates", "API Limits", "Webhook Logs", "OAuth Apps", "Session Manager", "2FA Settings", "Email Templates", "Push Notifs", "SMS Gateway", "CDN Config", "DNS Records", "SSL Certs", "DB Migrations", "Cache Purge", "Error Rate", "Latency Map", "Cost Analysis", "Support Tickets"]
};

let sidebarItems = [];
Object.keys(BLUEPRINT).forEach(cat => {
  BLUEPRINT[cat].forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let color = "text-gray-400";
    if (cat.includes("CORE")) color = "text-cyan-400";
    else if (cat.includes("FINANCE") || cat.includes("OPS")) color = "text-green-400";
    else if (cat.includes("SECURITY") || cat.includes("DEFENSE") || cat.includes("PROTECTION")) color = "text-red-500";
    else if (cat.includes("AI") || cat.includes("INTEL")) color = "text-purple-400";
    else if (cat.includes("FRONTIER") || cat.includes("SIM")) color = "text-yellow-400";
    
    // SAFE: String concatenation only
    sidebarItems.push({ cat: cat, name: name, path: "/dashboard/" + slug, color: color });
  });
});

ensureDir(path.join(root, 'components/sidebar'));
fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";");

// WRITE SIDEBAR COMPONENT
const sidebarContent = `"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MENU_ITEMS } from "./sidebar/SidebarData";

export default function Sidebar() {
  const pathname = usePathname();
  const [openCat, setOpenCat] = useState("CORE");

  const grouped = MENU_ITEMS.reduce((acc, item) => {
    if (!acc[item.cat]) acc[item.cat] = [];
    acc[item.cat].push(item);
    return acc;
  }, {});

  return (
    <div className="w-64 h-full flex flex-col bg-black/95 backdrop-blur-xl border-r border-cyan-900/30 text-xs">
      <div className="p-4 border-b border-cyan-900/30"><div className="font-black text-cyan-400 tracking-[0.2em] text-lg">SCROLLCHAIN</div></div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-cyan-900">
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
fs.writeFileSync(path.join(root, 'components/Sidebar.tsx'), sidebarContent);

// GENERATE PAGES
console.log("Generating Rooms...");
sidebarItems.forEach(item => {
  const folder = item.path.replace('/dashboard/', '');
  const dir = path.join(root, 'app/dashboard', folder);
  ensureDir(dir);
  
  const pageContent = 'import UniversalPage from "../../../components/templates/UniversalPage";\n' +
                      'export default function P() { return <UniversalPage title="' + item.name + '" category="' + item.cat + '" />; }';
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log("ARCHITECT BUILD COMPLETE.");
