const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Architect: Restoring 400+ Modules...");

// ---------------------------------------------------------
// 1. THE FULL DATABASE (NOTHING REMOVED)
// ---------------------------------------------------------
const DATABASE = [
  { cat: "CORE", items: ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"] },
  { cat: "PROTECTION", items: ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Ice Monitor", "Legal Defense"] },
  { cat: "FINANCE", items: ["Billing", "Token Ledger", "Receipts Log", "Finance Rebalance", "Token Mint", "Marketplace", "DeFi Lending", "Liquidity Pools", "Payment Gateway", "Carbon Credits", "Tax Calc", "Exchange Rates", "Order Book", "Whale Watch", "DAO Treasury"] },
  { cat: "SECURITY", items: ["Vault", "Cyber Defense", "Pen Testing", "Access Control", "Contract Auditor", "Identity", "Quantum Keys", "Audit Logs", "Dark Web", "Root Key", "Backdoor", "Global Killswitch"] },
  { cat: "INFRA", items: ["Kernel State", "NATS Mesh", "Telemetry", "Edge Functions", "Server Mesh", "Load Balancer", "CDN Status", "IoT Mesh", "Multi-DB", "Streams", "K8s Pods"] },
  { cat: "AI", items: ["Intelligence", "Neural Shader", "Swarm Consensus", "Cognition Graph", "Neural Voice", "Code Synthesis", "Generative Art", "Autonomous DAO", "Singularity Index", "Model Registry", "Knowledge Base", "LLM Playground"] },
  { cat: "DEEP SYSTEM", items: ["Kernel Panic", "Stack Trace", "Heap Dump", "Memory Leak", "Buffer Overflow", "Race Condition", "Deadlock", "Segfault", "Blue Screen", "Red Ring", "404 Room", "Infinite Loop", "Recursion", "Fractal", "Noise", "Static", "Void", "Null", "Undefined"] },
  { cat: "UNDERGROUND", items: ["Black Market", "Safe House", "Dead Drop", "Smuggler Route", "Hacker Den", "Pirate Radio", "Data Haven", "Ghost Network", "Resistance HQ", "Graffiti Wall", "Glitch Zone", "Zero Day Market", "Clone Vat", "Memory Wiper", "Identity Forger", "Shadow Bank", "Fight Club", "The Undercity"] },
  { cat: "STRATEGIC", items: ["War Room", "Nuclear Silo", "Spec Ops", "Radar Array", "Bunker Status", "Bioweapon Labs", "PsyOps", "DEFCON", "Orbital Laser", "Submarine Fleet", "Air Traffic", "Encryption Breaker", "Spy Network", "Drone Command", "Cyber Warfare", "Emergency Broadcast", "Asset Recovery", "Doomsday Clock"] },
  { cat: "FRONTIER", items: ["Exoplanet Scanner", "Fusion Reactor", "Quantum Computer", "Warp Drive", "Dyson Sphere", "Antimatter", "Bio Lab", "Particle Collider", "Terraforming", "Space Elevator", "Time Dilation", "Dark Matter", "Multiverse", "Alien Signal", "Void Shield", "Omega Point"] },
  { cat: "SIMULATION", items: ["Life Game", "Gravity Sandbox", "Evolution", "Star Forge", "Erosion Sim", "Particle Storm", "Fluid Sim", "Planet Builder", "Traffic Flow", "Crowd Dynamics", "Orbit Plotter", "Ray Tracer", "Sound Scaper", "Voxel Editor", "Logic Sandbox", "Ecosystem Sim"] },
  { cat: "SPIRITUAL", items: ["Akashic Records", "Karma Tracker", "Meditation", "Chakra Alignment", "Astral Plane", "Tarot Reader", "Spirit Guide", "Past Lives", "Aura Scanner", "Sacred Geometry", "Nirvana Gauge", "Third Eye", "Telepathy Net", "Reincarnation", "Soul Ledger", "Enlightenment", "Vibration Tuner", "Oracle", "Zen Garden"] },
  { cat: "ABSTRACT", items: ["Chaos Engine", "Memory Palace", "Dream State", "Logic Core", "Pulse Monitor", "Frequency Tuner", "Crypto Graph", "Time Machine", "Glitch Art", "Holo Deck", "Sub Space", "Code Matrix", "Genome Editor", "Hive Mind", "Echo Chamber", "Mirror World", "Ghost in Shell", "Artifacts", "Registry Editor", "Terminal X"] },
  { cat: "CIVILIZATION", items: ["Urban Planner", "Digital Court", "Neo Bank", "Academy", "Medi Bay", "Estate Manager", "Grand Museum", "Archive", "Arena", "Comms Relay", "Fabricator", "Agri Dome", "Holo Theater", "Diplomacy", "Detention", "Probability Zone", "Ethics Council", "Mega Mall", "Spaceport", "The Void"] },
  { cat: "CREATIVE", items: ["Holo Canvas", "Beat Maker", "Voxel Sculptor", "Story Engine", "Texture Gen", "Rigging Bay", "Render Farm", "Color Grade", "Audio Master", "Script Editor", "Level Design", "Character Rigger", "Motion Capture", "Photogrammetry", "Synth Rack", "Sample Library", "Font Foundry", "Iconography", "Layout Tool", "Publish Hub"] },
  { cat: "OPS", items: ["Governance", "Supply Chain", "Global Trade", "Client Dashboards", "Lead Flows", "CRM", "HR Intelligence", "Talent Pipeline", "Payroll", "Secure Chat", "Town Hall", "Wiki"] },
  { cat: "ADMIN", items: ["Global Users", "Ban Hammer", "Feature Gates", "API Limits", "Webhook Logs", "OAuth Apps", "Session Manager", "2FA Settings", "Email Templates", "Push Notifs", "SMS Gateway", "CDN Config", "DNS Records", "SSL Certs", "DB Migrations", "Cache Purge", "Error Rate", "Latency Map", "Cost Analysis", "Support Tickets"] }
];

// --- 2. GENERATE SIDEBAR DATA ---
const sidebarItems = [];
DATABASE.forEach(group => {
    let color = "text-gray-400";
    // Logic to color-code the sidebar
    if(group.cat === "FINANCE") color = "text-green-400";
    else if(group.cat === "SECURITY" || group.cat === "STRATEGIC" || group.cat === "DEEP SYSTEM") color = "text-red-500";
    else if(group.cat === "AI" || group.cat === "PROTECTION" || group.cat === "ABSTRACT") color = "text-purple-400";
    else if(group.cat === "CORE" || group.cat === "FRONTIER") color = "text-cyan-400";
    else if(group.cat === "SIMULATION" || group.cat === "CREATIVE") color = "text-yellow-400";

    group.items.forEach(name => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        sidebarItems.push({ cat: group.cat, name, path: "/dashboard/" + slug, color });
    });
});

// Write the data file (Used by Sidebar.tsx and Page Generator)
fs.writeFileSync(path.join(root, 'components/sidebar/SidebarData.ts'), "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";");

// --- 3. GENERATE PAGE FILES WITH SMART ROUTER ---
console.log("Wiring Rooms...");
sidebarItems.forEach(item => {
    const folder = item.path.replace('/dashboard/', '');
    const dir = path.join(root, 'app/dashboard', folder);
    ensureDir(dir);
    const pageContent = 'import RouteDispatcher from "../../../components/templates/RouteDispatcher";\nexport default function P(){return <RouteDispatcher title="' + item.name + '" category="' + item.cat + '" />}';
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log("Database Restored.");
