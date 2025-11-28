const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../../components/Sidebar.tsx');

const categories = {
  "CORE": [
    { name: "Overview", path: "/dashboard/overview", color: "text-cyan-400" },
    { name: "3D Frequency", path: "/dashboard/3d-frequency-ui", color: "text-cyan-400" },
    { name: "Quantum Metrics", path: "/dashboard/quantum-metrics", color: "text-cyan-400" },
    { name: "Repo Scanner", path: "/dashboard/repo-scanner", color: "text-green-400" },
  ],
  "PROTECTION": [
    { name: "D.i.T. (God Mode)", path: "/dashboard/god-mode", color: "text-cyan-400" },
    { name: "Conduit Protection", path: "/dashboard/law-bots", color: "text-blue-400" },
    { name: "Global Killswitch", path: "/dashboard/global-killswitch", color: "text-red-400" },
    { name: "Vault", path: "/dashboard/vault", color: "text-red-400" },
  ],
  "INFRASTRUCTURE": [
    { name: "Kernel State", path: "/dashboard/kernel", color: "text-green-400" },
    { name: "NATS Mesh", path: "/dashboard/nats", color: "text-green-400" },
    { name: "Telemetry", path: "/dashboard/telemetry-state", color: "text-orange-400" },
    { name: "Edge Functions", path: "/dashboard/edge-functions", color: "text-pink-400" },
    { name: "Multi-DB", path: "/dashboard/multi-db", color: "text-blue-400" },
    { name: "Server Mesh", path: "/dashboard/server-mesh", color: "text-gray-400" },
    { name: "K8s Pods", path: "/dashboard/k8s-pods", color: "text-blue-300" },
    { name: "Load Balancer", path: "/dashboard/load-balancer", color: "text-yellow-400" },
    { name: "CDN Status", path: "/dashboard/cdn-status", color: "text-purple-400" },
    { name: "IoT Mesh", path: "/dashboard/iot-mesh", color: "text-green-600" },
  ],
  "AI & INTEL": [
    { name: "Intelligence", path: "/dashboard/intelligence", color: "text-purple-400" },
    { name: "Neural Shader", path: "/dashboard/neural-shader-engine", color: "text-pink-400" },
    { name: "Cognition", path: "/dashboard/cognition", color: "text-blue-400" },
    { name: "Neural Training", path: "/dashboard/neural-training", color: "text-green-400" },
    { name: "Model Registry", path: "/dashboard/model-registry", color: "text-yellow-400" },
    { name: "Sentiment", path: "/dashboard/sentiment-analysis", color: "text-orange-400" },
    { name: "Agent Swarm", path: "/dashboard/agent-swarm", color: "text-red-400" },
    { name: "LLM Playground", path: "/dashboard/llm-playground", color: "text-green-300" },
    { name: "Neural Voice", path: "/dashboard/neural-voice", color: "text-purple-300" },
    { name: "Code Synth", path: "/dashboard/code-synthesis", color: "text-cyan-300" },
    { name: "Generative Art", path: "/dashboard/generative-art", color: "text-pink-300" },
    { name: "Autonomous DAO", path: "/dashboard/autonomous-dao", color: "text-blue-500" },
    { name: "Singularity Watch", path: "/dashboard/singularity-watch", color: "text-red-600" },
  ],
  "THE SIMULATION": [
    { name: "Life Game", path: "/dashboard/life-game", color: "text-green-500" },
    { name: "Fluid Sim", path: "/dashboard/fluid-sim", color: "text-blue-500" },
    { name: "Gravity Sandbox", path: "/dashboard/gravity-sandbox", color: "text-purple-500" },
    { name: "Planet Builder", path: "/dashboard/planet-builder", color: "text-orange-500" },
    { name: "Evolution", path: "/dashboard/evolution", color: "text-green-300" },
    { name: "Traffic Flow", path: "/dashboard/traffic-flow", color: "text-red-400" },
    { name: "Crowd Dynamics", path: "/dashboard/crowd-dynamics", color: "text-yellow-500" },
    { name: "Star Forge", path: "/dashboard/star-forge", color: "text-white" },
    { name: "Tectonics", path: "/dashboard/tectonics", color: "text-orange-700" },
    { name: "Atmosphere", path: "/dashboard/atmosphere-mixer", color: "text-cyan-200" },
    { name: "Orbit Plotter", path: "/dashboard/orbit-plotter", color: "text-blue-300" },
    { name: "Particle Storm", path: "/dashboard/particle-storm", color: "text-pink-500" },
    { name: "Ray Tracer", path: "/dashboard/ray-tracer", color: "text-gray-200" },
    { name: "Sound Scaper", path: "/dashboard/sound-scaper", color: "text-purple-400" },
    { name: "Voxel Editor", path: "/dashboard/voxel-editor", color: "text-green-500" },
    { name: "Procedural City", path: "/dashboard/procedural-city", color: "text-cyan-600" },
    { name: "Logic Sandbox", path: "/dashboard/logic-sandbox", color: "text-yellow-300" },
    { name: "Ecosystem Sim", path: "/dashboard/ecosystem-sim", color: "text-green-600" },
  ],
  "THE UNDERGROUND": [
    { name: "Black Market", path: "/dashboard/black-market", color: "text-gray-500" },
    { name: "Safe House", path: "/dashboard/safe-house", color: "text-green-800" },
    { name: "Dead Drop", path: "/dashboard/dead-drop", color: "text-gray-400" },
    { name: "Smuggler Route", path: "/dashboard/smuggler-route", color: "text-yellow-700" },
    { name: "Hacker Den", path: "/dashboard/hacker-den", color: "text-green-500" },
    { name: "Pirate Radio", path: "/dashboard/pirate-radio", color: "text-pink-600" },
    { name: "Data Haven", path: "/dashboard/data-haven", color: "text-blue-800" },
    { name: "Ghost Network", path: "/dashboard/ghost-network", color: "text-gray-600" },
    { name: "Resistance HQ", path: "/dashboard/resistance-hq", color: "text-orange-600" },
    { name: "Graffiti Wall", path: "/dashboard/graffiti-wall", color: "text-yellow-400" },
    { name: "Glitch Zone", path: "/dashboard/glitch-zone", color: "text-red-500" },
    { name: "Zero Day Market", path: "/dashboard/zero-day-market", color: "text-green-900" },
    { name: "Clone Vat", path: "/dashboard/clone-vat", color: "text-cyan-700" },
    { name: "Memory Wiper", path: "/dashboard/memory-wiper", color: "text-gray-400" },
    { name: "Identity Forger", path: "/dashboard/identity-forger", color: "text-purple-500" },
    { name: "Shadow Bank", path: "/dashboard/shadow-bank", color: "text-gray-600" },
    { name: "Fight Club", path: "/dashboard/fight-club", color: "text-red-500" },
    { name: "The Undercity", path: "/dashboard/the-undercity", color: "text-purple-900" },
  ],
  "STRATEGIC DEFENSE": [
    { name: "War Room", path: "/dashboard/war-room", color: "text-red-600" },
    { name: "Nuclear Silo", path: "/dashboard/nuclear-silo", color: "text-yellow-600" },
    { name: "Spec Ops", path: "/dashboard/spec-ops", color: "text-green-700" },
    { name: "Radar Array", path: "/dashboard/radar-array", color: "text-green-400" },
    { name: "Bunker Status", path: "/dashboard/bunker-status", color: "text-gray-400" },
    { name: "Bioweapon Labs", path: "/dashboard/bioweapon-labs", color: "text-purple-600" },
    { name: "PsyOps", path: "/dashboard/psyops", color: "text-pink-700" },
    { name: "DEFCON", path: "/dashboard/defcon-status", color: "text-red-500" },
    { name: "Orbital Laser", path: "/dashboard/orbital-laser", color: "text-red-500" },
    { name: "Submarine Fleet", path: "/dashboard/submarine-fleet", color: "text-blue-800" },
    { name: "Air Traffic", path: "/dashboard/air-traffic", color: "text-cyan-500" },
    { name: "Encryption Breaker", path: "/dashboard/encryption-breaker", color: "text-green-500" },
    { name: "Spy Network", path: "/dashboard/spy-network", color: "text-gray-200" },
    { name: "Drone Command", path: "/dashboard/drone-command", color: "text-yellow-500" },
    { name: "Cyber Warfare", path: "/dashboard/cyber-warfare", color: "text-blue-600" },
    { name: "Emergency Broadcast", path: "/dashboard/emergency-broadcast", color: "text-red-500" },
  ],
  "CIVILIZATION": [
    { name: "Urban Planner", path: "/dashboard/urban-planner", color: "text-yellow-600" },
    { name: "Digital Court", path: "/dashboard/digital-court", color: "text-gray-300" },
    { name: "Neo Bank", path: "/dashboard/neo-bank", color: "text-green-300" },
    { name: "Academy", path: "/dashboard/academy", color: "text-blue-400" },
    { name: "Medi-Bay", path: "/dashboard/medi-bay", color: "text-red-400" },
    { name: "Estate Manager", path: "/dashboard/estate-manager", color: "text-green-500" },
    { name: "Grand Museum", path: "/dashboard/grand-museum", color: "text-purple-400" },
    { name: "Archive", path: "/dashboard/archive", color: "text-gray-400" },
    { name: "Arena", path: "/dashboard/arena", color: "text-orange-500" },
    { name: "Comms Relay", path: "/dashboard/comms-relay", color: "text-cyan-500" },
    { name: "Fabricator", path: "/dashboard/fabricator", color: "text-orange-600" },
    { name: "Agri-Dome", path: "/dashboard/agri-dome", color: "text-green-600" },
    { name: "Diplomacy", path: "/dashboard/diplomacy", color: "text-blue-200" },
    { name: "Mega Mall", path: "/dashboard/mega-mall", color: "text-pink-300" },
    { name: "Spaceport", path: "/dashboard/spaceport", color: "text-cyan-400" },
  ],
  "FRONTIER SCIENCE": [
    { name: "Exoplanet Scanner", path: "/dashboard/exoplanet-scanner", color: "text-teal-400" },
    { name: "Bio-Lab", path: "/dashboard/bio-lab", color: "text-green-500" },
    { name: "Particle Collider", path: "/dashboard/particle-collider", color: "text-orange-500" },
    { name: "Fusion Reactor", path: "/dashboard/fusion-reactor", color: "text-yellow-400" },
    { name: "Quantum Computer", path: "/dashboard/quantum-computer", color: "text-blue-300" },
    { name: "Nanobot Swarm", path: "/dashboard/nanobot-swarm", color: "text-gray-300" },
    { name: "Terraforming", path: "/dashboard/terraforming", color: "text-green-700" },
    { name: "Space Elevator", path: "/dashboard/space-elevator", color: "text-blue-500" },
    { name: "Dyson Sphere", path: "/dashboard/dyson-sphere", color: "text-yellow-600" },
    { name: "Warp Drive", path: "/dashboard/warp-drive", color: "text-purple-500" },
    { name: "Time Dilation", path: "/dashboard/time-dilation", color: "text-red-400" },
    { name: "Dark Matter", path: "/dashboard/dark-matter", color: "text-gray-500" },
    { name: "String Theory", path: "/dashboard/string-theory", color: "text-pink-600" },
    { name: "Multiverse", path: "/dashboard/multiverse", color: "text-cyan-500" },
    { name: "Mind Upload", path: "/dashboard/mind-upload", color: "text-purple-400" },
    { name: "Cryogenics", path: "/dashboard/cryogenics", color: "text-cyan-300" },
  ],
  "FINANCE": [
    { name: "Billing (MRR)", path: "/dashboard/billing", color: "text-green-500" },
    { name: "Receipts", path: "/dashboard/receipts", color: "text-gray-400" },
    { name: "Tokenization", path: "/dashboard/tokenization", color: "text-yellow-400" },
    { name: "Marketplace", path: "/dashboard/marketplace", color: "text-purple-400" },
    { name: "DeFi Lending", path: "/dashboard/defi-lending", color: "text-green-400" },
    { name: "Arbitrage Bot", path: "/dashboard/arbitrage-bot", color: "text-red-500" },
    { name: "Liquidity Pools", path: "/dashboard/liquidity-pools", color: "text-cyan-400" },
    { name: "Payment Gateway", path: "/dashboard/payment-gateway", color: "text-white" },
    { name: "Carbon Credits", path: "/dashboard/carbon-credits", color: "text-green-600" },
    { name: "Prediction", path: "/dashboard/prediction-markets", color: "text-purple-400" },
    { name: "Smart Wallets", path: "/dashboard/smart-wallets", color: "text-blue-300" },
    { name: "Tax Calc", path: "/dashboard/tax-calculator", color: "text-gray-300" },
    { name: "Exchange Rates", path: "/dashboard/exchange-rates", color: "text-green-300" },
    { name: "Whale Watch", path: "/dashboard/whale-watch", color: "text-blue-500" },
    { name: "DAO Treasury", path: "/dashboard/dao-treasury", color: "text-green-400" },
  ],
  "CREATIVE STUDIO": [
    { name: "Holo-Canvas", path: "/dashboard/holo-canvas", color: "text-pink-400" },
    { name: "Beat Maker", path: "/dashboard/beat-maker", color: "text-purple-400" },
    { name: "Voxel Sculptor", path: "/dashboard/voxel-sculptor", color: "text-green-400" },
    { name: "Story Engine", path: "/dashboard/story-engine", color: "text-yellow-500" },
    { name: "Texture Gen", path: "/dashboard/texture-gen", color: "text-cyan-400" },
    { name: "Rigging Bay", path: "/dashboard/rigging-bay", color: "text-orange-400" },
    { name: "Render Farm", path: "/dashboard/render-farm", color: "text-blue-500" },
    { name: "Color Grade", path: "/dashboard/color-grade", color: "text-purple-300" },
    { name: "Audio Master", path: "/dashboard/audio-master", color: "text-yellow-400" },
    { name: "Script Editor", path: "/dashboard/script-editor", color: "text-green-500" },
    { name: "Level Design", path: "/dashboard/level-design", color: "text-gray-200" },
  ],
  "ADMIN UTILS": [
    { name: "User Audit", path: "/dashboard/user-audit-trail", color: "text-gray-400" },
    { name: "System Logs", path: "/dashboard/system-logs", color: "text-gray-500" },
    { name: "Final Log", path: "/dashboard/final-log", color: "text-green-500" },
  ]
};

// Flatten the MENU object into the sidebarItems array structure
const sidebarItems = [];
for (const [cat, items] of Object.entries(MENU)) {
    items.forEach(item => {
        sidebarItems.push({ ...item, cat });
    });
}

const fileContent = \`"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = \${JSON.stringify(sidebarItems, null, 2)};

const getCategoryName = (item, currentCat) => {
    if (item.cat !== currentCat) {
        return (
            <div key={item.cat} className="w-full text-left p-3 bg-gray-950 hover:bg-gray-900 font-bold text-gray-400 flex justify-between border-t border-gray-700 mt-2">
                {item.cat}
            </div>
        );
    }
    return null;
};

export default function Sidebar() {
    const pathname = usePathname();
    let currentCategory = "";

    return (
        <div className="w-64 h-full bg-black border-r border-gray-800 flex flex-col text-white font-mono text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
            <div className="p-4 border-b border-gray-800 font-bold text-cyan-400">SCROLLCHAIN v35.0</div>
            
            <div className="flex-1 overflow-y-auto">
                {sidebarItems.map((item, index) => {
                    const categoryHeader = getCategoryName(item, currentCategory);
                    if (categoryHeader) { currentCategory = item.cat; }
                    
                    const isCurrent = pathname === item.path;
                    
                    return (
                        <div key={index}>
                            {categoryHeader}
                            <Link 
                                href={item.path}
                                className={\`block px-6 py-2 hover:text-cyan-400 transition-colors \${isCurrent ? 'text-cyan-400 border-l-2 border-cyan-400' : 'text-gray-500'}\`}
                            >
                                <span className="mr-2" style={{ color: item.color }}>●</span> {item.name}
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-800 text-gray-600 text-[10px]">
                SYSTEM ONLINE<br/>Latency: <1ms (Functional)
            </div>
        </div>
    );
}
\`;

fs.writeFileSync(targetPath, fileContent);
console.log("Sidebar.tsx successfully generated via Node.js");
