const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');

// --- THE MASTER DATABASE ---
const DATABASE = [
  // 1. FINANCE (Data Engine - Spreadsheets)
  { cat: "FINANCE", items: ["Billing", "Token Ledger", "Receipts Log", "Finance Rebalance", "Token Mint", "Marketplace", "DeFi Lending", "Liquidity Pools", "Payment Gateway", "Carbon Credits", "Tax Calc", "Exchange Rates", "Order Book", "Whale Watch", "DAO Treasury"] },
  
  // 2. SECURITY & INFRA (Terminal Engine - Consoles)
  { cat: "SECURITY", items: ["Vault", "Cyber Defense", "Pen Testing", "Access Control", "Contract Auditor", "Identity", "Quantum Keys", "Audit Logs", "Dark Web", "Root Key", "Backdoor", "Global Killswitch"] },
  { cat: "INFRA", items: ["Kernel State", "NATS Mesh", "Telemetry", "Edge Functions", "Server Mesh", "Load Balancer", "CDN Status", "IoT Mesh", "Multi-DB", "Streams", "K8s Pods"] },
  { cat: "ADMIN", items: ["Global Users", "Ban Hammer", "Feature Gates", "API Limits", "Webhook Logs", "Session Manager", "System Logs", "Error Rate", "Latency Map"] },

  // 3. AI & INTELLIGENCE (Chat Engine - Neural Link)
  { cat: "AI", items: ["Intelligence", "Neural Shader", "Swarm Consensus", "Cognition Graph", "Neural Voice", "Code Synthesis", "Generative Art", "Autonomous DAO", "Singularity Index", "Model Registry", "Knowledge Base", "LLM Playground"] },
  { cat: "PROTECTION", items: ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Ice Monitor", "Legal Defense"] },

  // 4. FRONTIER & SIM (3D Engine - Holograms)
  { cat: "CORE", items: ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"] },
  { cat: "FRONTIER", items: ["Exoplanet Scanner", "Fusion Reactor", "Quantum Computer", "Warp Drive", "Dyson Sphere", "Antimatter", "Bio Lab", "Particle Collider", "Terraforming", "Space Elevator", "Time Dilation", "Dark Matter", "Multiverse", "Alien Signal"] },
  { cat: "SIM", items: ["Life Game", "Gravity Sandbox", "Evolution", "Star Forge", "Erosion Sim", "Particle Storm", "Fluid Sim", "Planet Builder", "Traffic Flow"] },
  { cat: "EXOTIC", items: ["Dimensional Rift", "Tesseract", "Non Euclidean", "Fractal Zoom", "Time Loop", "Entropy Counter", "Zero Point", "Event Horizon"] }
];

// --- GENERATE SIDEBAR DATA ---
console.log("Writing Sidebar Data...");
const sidebarItems = [];
DATABASE.forEach(group => {
    let color = "text-gray-400";
    if(group.cat === "FINANCE") color = "text-green-400";
    if(group.cat === "SECURITY" || group.cat === "ADMIN") color = "text-red-500";
    if(group.cat === "AI" || group.cat === "PROTECTION") color = "text-purple-400";
    if(group.cat === "CORE" || group.cat === "FRONTIER") color = "text-cyan-400";

    group.items.forEach(name => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        sidebarItems.push({ cat: group.cat, name, path: `/dashboard/${slug}`, color });
    });
});

fs.writeFileSync(
    path.join(root, 'components/sidebar/SidebarData.ts'), 
    `export const MENU_ITEMS = ${JSON.stringify(sidebarItems, null, 2)};`
);

// --- GENERATE PAGES ---
console.log("Generating Rooms with Correct Engines...");
sidebarItems.forEach(item => {
    const folder = item.path.replace('/dashboard/', '');
    const dir = path.join(root, 'app/dashboard', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const pageContent = `"use client";
import RouteDispatcher from "../../../components/templates/RouteDispatcher";
export default function Page() { 
  return <RouteDispatcher title="${item.name}" category="${item.cat}" />; 
}`;
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log("Done.");
