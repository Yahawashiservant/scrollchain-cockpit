const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Architect: Generating System...");

// --- A. WRITE 3D ENGINE ---
const sceneCode = `
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";
import { useRef } from "react";

function ActiveMesh({ category }: { category: string }) {
  const mesh = useRef(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  if (category.includes("FINANCE")) return <Torus ref={mesh} args={[1.5, 0.4, 32, 100]}><meshStandardMaterial color="#eab308" wireframe transparent opacity={0.3} /></Torus>;
  if (category.includes("SECURITY")) return <Icosahedron ref={mesh} args={[2, 1]}><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.3} /></Icosahedron>;
  if (category.includes("AI")) return <points ref={mesh}><icosahedronGeometry args={[2, 4]} /><pointsMaterial color="#a855f7" size={0.05} transparent opacity={0.6} /></points>;
  return <Sphere ref={mesh} args={[1.8, 32, 32]}><meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.1} /></Sphere>;
}

export default function CyberScene({ category = "CORE" }: { category?: string }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 30]} />
        <Stars radius={80} depth={60} count={6000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={300} scale={12} size={3} speed={0.2} opacity={0.5} color="#ffffff" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
           <ActiveMesh category={category} />
        </Float>
      </Canvas>
    </div>
  );
}
`;
fs.writeFileSync(path.join(root, 'components/visuals/CyberScene.tsx'), sceneCode);

// --- B. WRITE UNIVERSAL TEMPLATE (HUD) ---
const templateCode = `
"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";

export default function UniversalPage({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  const [load, setLoad] = useState(0);
  const [logs, setLogs] = useState(["> Initializing Neural Link..."]);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => {
        setLoad(Math.random() * 100);
        const time = new Date().toLocaleTimeString();
        const msg = "[" + time + "] " + title.toUpperCase() + ": process_" + Math.floor(Math.random()*999) + " > OK";
        setLogs(prev => [msg, ...prev.slice(0, 12)]);
    }, 1000);
    return () => clearInterval(i);
  }, [title]);

  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  let themeColor = "cyan";
  if (category.includes("SECURITY")) themeColor = "red";
  else if (category.includes("FINANCE")) themeColor = "green";
  else if (category.includes("AI")) themeColor = "purple";
  else if (category.includes("FRONTIER")) themeColor = "yellow";

  return (
    <div className="min-h-full w-full relative flex flex-col text-white">
      <CyberScene category={category} />
      <div className="relative z-10 p-8 flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-white/10 pb-4 backdrop-blur-md bg-black/40 p-6 rounded-xl border border-white/5">
           <div>
             <div className={"text-[10px] font-bold tracking-[0.4em] mb-2 text-" + themeColor + "-400"}>SCROLLCHAIN // {category}</div>
             <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500 tracking-tighter uppercase">{title}</h1>
           </div>
           <div className="text-right">
              <div className="font-mono font-bold text-green-400 animate-pulse flex items-center justify-end gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span> ONLINE
              </div>
           </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="glass-panel p-6 rounded-xl bg-black/60">
              <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">COMPUTE LOAD</div>
              <div className="text-4xl font-mono text-white mb-2">{Math.floor(load)}%</div>
              <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" style={{width: load + "%"}}></div>
              </div>
           </div>
           <div className="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col min-h-[400px] relative overflow-hidden">
              <div className="text-xs text-gray-500 font-bold tracking-widest mb-4 border-b border-gray-800 pb-2">TERMINAL OUTPUT</div>
              <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-2 overflow-y-auto">
                 {logs.map((l, i) => (
                    <div key={i} className="hover:bg-white/5 p-1 rounded cursor-pointer transition-colors border-l-2 border-transparent hover:border-cyan-500 pl-2">{l}</div>
                 ))}
              </div>
           </div>
        </div>
        
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
fs.writeFileSync(path.join(root, 'components/templates/UniversalPage.tsx'), templateCode);

// --- C. DEFINE DATA (The 400+ Rooms) ---
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

// Generate Sidebar Data
let sidebarItems = [];
Object.keys(BLUEPRINT).forEach(cat => {
  BLUEPRINT[cat].forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let color = "text-gray-400";
    if (cat.includes("CORE")) color = "text-cyan-400";
    else if (cat.includes("FINANCE") || cat.includes("OPS")) color = "text-green-400";
    else if (cat.includes("SECURITY") || cat.includes("DEFENSE") || cat.includes("PROTECTION")) color = "text-red-500";
    else if (cat.includes("AI") || cat.includes("INTEL")) color = "text-purple-400";
    else if (cat.includes("FRONTIER")) color = "text-yellow-400";
    
    sidebarItems.push({ cat: cat, name: name, path: "/dashboard/" + slug, color: color });
  });
});

// Write Sidebar Data
ensureDir(path.join(root, 'components/sidebar'));
fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";");

// Write Sidebar Component
const sidebarComponent = \`"use client";
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
}
\`;
fs.writeFileSync(path.join(root, 'components/Sidebar.tsx'), sidebarComponent);

// Generate Page Files
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
