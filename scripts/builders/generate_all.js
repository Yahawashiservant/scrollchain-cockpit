const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

// FULL DATA MAP
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
    else if (cat.includes("FRONTIER")) color = "text-yellow-400";
    
    sidebarItems.push({ cat, name, path: "/dashboard/" + slug, color });
  });
});

// 1. Write Sidebar Data
fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";");

// 2. Write Sidebar Component
const sidebarContent = \`"use client";
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
    <div className="w-full h-full flex flex-col text-xs overflow-hidden bg-black/90 backdrop-blur-md">
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
}\`;
fs.writeFileSync(path.join(root, 'components/Sidebar.tsx'), sidebarContent);

// 3. Generate Page Files
sidebarItems.forEach(item => {
  const folder = item.path.replace('/dashboard/', '');
  const dir = path.join(root, 'app/dashboard', folder);
  ensureDir(dir);
  // SAFE WRITE: Concatenation instead of template literals to avoid shell escaping issues
  const pageContent = 'import UniversalPage from "../../../components/templates/UniversalPage";\n' +
                      'export default function P() { return <UniversalPage title="' + item.name + '" category="' + item.cat + '" />; }';
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});
