const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../');
const sidebarPath = path.join(rootDir, 'components/Sidebar.tsx');
const templatePath = path.join(rootDir, 'components/templates/UniversalPage.tsx');

// 1. DEFINE THE FULL MENU
const menu = [
  { cat: "CORE", items: [
    { name: "Overview", path: "/dashboard/overview", color: "text-cyan-400" },
    { name: "3D Frequency", path: "/dashboard/3d-frequency-ui", color: "text-cyan-400" },
    { name: "Quantum Metrics", path: "/dashboard/quantum-metrics", color: "text-cyan-400" },
    { name: "Repo Scanner", path: "/dashboard/repo-scanner", color: "text-green-400" }
  ]},
  { cat: "PROTECTION", items: [
    { name: "Architect Control", path: "/dashboard/god-mode", color: "text-yellow-500" },
    { name: "Law Bots", path: "/dashboard/law-bots", color: "text-blue-500" },
    { name: "Family Shield", path: "/dashboard/family-shield", color: "text-blue-400" },
    { name: "Ice Monitor", path: "/dashboard/ice-monitor", color: "text-red-400" },
    { name: "Legal Defense", path: "/dashboard/legal-defense", color: "text-blue-300" },
    { name: "Global Killswitch", path: "/dashboard/global-killswitch", color: "text-red-600" }
  ]},
  { cat: "INFRASTRUCTURE", items: [
    { name: "Kernel State", path: "/dashboard/kernel", color: "text-green-500" },
    { name: "NATS Mesh", path: "/dashboard/nats", color: "text-green-500" },
    { name: "Telemetry", path: "/dashboard/telemetry-state", color: "text-orange-400" },
    { name: "Edge Functions", path: "/dashboard/edge-functions", color: "text-pink-400" },
    { name: "K8s Pods", path: "/dashboard/k8s-pods", color: "text-blue-300" },
    { name: "Server Mesh", path: "/dashboard/server-mesh", color: "text-gray-500" },
    { name: "Load Balancer", path: "/dashboard/load-balancer", color: "text-yellow-400" },
    { name: "CDN Status", path: "/dashboard/cdn-status", color: "text-purple-400" },
    { name: "IoT Mesh", path: "/dashboard/iot-mesh", color: "text-green-600" }
  ]},
  { cat: "AI & INTEL", items: [
    { name: "Intelligence", path: "/dashboard/intelligence", color: "text-purple-400" },
    { name: "Neural Shader", path: "/dashboard/neural-shader-engine", color: "text-pink-400" },
    { name: "Swarm Consensus", path: "/dashboard/agent-swarm", color: "text-yellow-400" },
    { name: "Singularity Index", path: "/dashboard/singularity-watch", color: "text-purple-600" },
    { name: "Cognition Graph", path: "/dashboard/cognition", color: "text-blue-400" },
    { name: "Model Training", path: "/dashboard/neural-training", color: "text-green-300" },
    { name: "Code Synthesis", path: "/dashboard/code-synthesis", color: "text-cyan-300" },
    { name: "Generative Art", path: "/dashboard/generative-art", color: "text-pink-300" },
    { name: "Autonomous DAO", path: "/dashboard/autonomous-dao", color: "text-blue-500" },
    { name: "Neural Voice", path: "/dashboard/neural-voice", color: "text-purple-300" },
    { name: "Sentiment", path: "/dashboard/sentiment-analysis", color: "text-orange-400" },
    { name: "Model Registry", path: "/dashboard/model-registry", color: "text-yellow-300" },
    { name: "Knowledge Base", path: "/dashboard/knowledge-base", color: "text-blue-200" },
    { name: "LLM Playground", path: "/dashboard/llm-playground", color: "text-green-400" }
  ]},
  { cat: "FINANCE", items: [
    { name: "Billing (MRR)", path: "/dashboard/billing", color: "text-green-400" },
    { name: "Receipts", path: "/dashboard/receipts", color: "text-gray-400" },
    { name: "Tokenization", path: "/dashboard/tokenization", color: "text-yellow-400" },
    { name: "Marketplace", path: "/dashboard/marketplace", color: "text-purple-400" },
    { name: "DeFi Lending", path: "/dashboard/defi-lending", color: "text-blue-400" },
    { name: "Arbitrage Bot", path: "/dashboard/arbitrage-bot", color: "text-red-400" },
    { name: "Liquidity Pools", path: "/dashboard/liquidity-pools", color: "text-cyan-400" },
    { name: "Payment Gateway", path: "/dashboard/payment-gateway", color: "text-white" },
    { name: "Carbon Credits", path: "/dashboard/carbon-credits", color: "text-green-700" },
    { name: "Prediction", path: "/dashboard/prediction-markets", color: "text-purple-500" },
    { name: "Smart Wallets", path: "/dashboard/smart-wallets", color: "text-blue-300" },
    { name: "Tax Calc", path: "/dashboard/tax-calculator", color: "text-gray-400" },
    { name: "Exchange Rates", path: "/dashboard/exchange-rates", color: "text-green-300" },
    { name: "Order Book", path: "/dashboard/order-book", color: "text-red-300" },
    { name: "Whale Watch", path: "/dashboard/whale-watch", color: "text-blue-600" },
    { name: "DAO Treasury", path: "/dashboard/dao-treasury", color: "text-yellow-600" }
  ]},
  { cat: "OPS", items: [
    { name: "Governance", path: "/dashboard/governance", color: "text-blue-300" },
    { name: "Gov Engines", path: "/dashboard/governance-engines", color: "text-gray-400" },
    { name: "Supply Chain", path: "/dashboard/supply-chain", color: "text-orange-400" },
    { name: "Global Trade", path: "/dashboard/global-trade", color: "text-cyan-500" },
    { name: "Client Dashboards", path: "/dashboard/client-dashboards", color: "text-indigo-400" },
    { name: "Lead Flows", path: "/dashboard/lead-flows", color: "text-green-400" },
    { name: "CRM", path: "/dashboard/crm", color: "text-blue-500" },
    { name: "HR Intelligence", path: "/dashboard/hr-people-intelligence", color: "text-pink-400" },
    { name: "Talent", path: "/dashboard/talent-acquisition", color: "text-pink-300" },
    { name: "Payroll", path: "/dashboard/payroll", color: "text-green-600" },
    { name: "Pulse", path: "/dashboard/employee-pulse", color: "text-red-400" },
    { name: "Secure Chat", path: "/dashboard/secure-chat", color: "text-gray-200" },
    { name: "Town Hall", path: "/dashboard/town-hall", color: "text-purple-400" },
    { name: "Wiki", path: "/dashboard/wiki", color: "text-yellow-200" }
  ]},
  { cat: "SECURITY", items: [
    { name: "Vault", path: "/dashboard/vault", color: "text-red-400" },
    { name: "Compliance", path: "/dashboard/compliance-layer", color: "text-red-400" },
    { name: "Sovereign Settings", path: "/dashboard/sovereign-settings", color: "text-yellow-600" },
    { name: "Cyber Defense", path: "/dashboard/cyber-defense", color: "text-red-400" },
    { name: "Pen Testing", path: "/dashboard/pen-testing", color: "text-orange-500" },
    { name: "Access Control", path: "/dashboard/access-control", color: "text-blue-400" },
    { name: "Contract Auditor", path: "/dashboard/contract-auditor", color: "text-green-400" },
    { name: "Identity", path: "/dashboard/identity", color: "text-cyan-400" },
    { name: "Quantum Keys", path: "/dashboard/quantum-keys", color: "text-purple-500" },
    { name: "Audit Logs", path: "/dashboard/audit-logs", color: "text-gray-500" },
    { name: "Dark Web", path: "/dashboard/dark-web", color: "text-gray-800" }
  ]},
  { cat: "DATA", items: [
    { name: "Data Lake", path: "/dashboard/data-lake", color: "text-blue-600" },
    { name: "Enricher", path: "/dashboard/enricher", color: "text-purple-500" },
    { name: "File Ingesto", path: "/dashboard/file-ingesto", color: "text-cyan-500" },
    { name: "RWA Map", path: "/dashboard/rwa-asset-maps", color: "text-yellow-500" },
    { name: "Telemetry Snap", path: "/dashboard/telemetry-snapshot", color: "text-orange-500" },
    { name: "Recursive Geo", path: "/dashboard/recursive-geometry", color: "text-pink-500" },
    { name: "Provenance", path: "/dashboard/provenance-graphs", color: "text-gray-400" },
    { name: "Validators", path: "/dashboard/validators", color: "text-green-400" },
    { name: "Mempool", path: "/dashboard/mempool", color: "text-yellow-300" },
    { name: "Gas Oracle", path: "/dashboard/gas-oracle", color: "text-purple-300" },
    { name: "Entropy Budget", path: "/dashboard/entropy-budget", color: "text-red-400" },
    { name: "Quantum Bridge", path: "/dashboard/quantum-bridge", color: "text-cyan-300" },
    { name: "Predictive", path: "/dashboard/predictive-models", color: "text-blue-300" }
  ]},
  { cat: "FRONTIER", items: [
    { name: "Exoplanet Scanner", path: "/dashboard/exoplanet-scanner", color: "text-teal-400" },
    { name: "Bio Lab", path: "/dashboard/bio-lab", color: "text-green-500" },
    { name: "Particle Collider", path: "/dashboard/particle-collider", color: "text-orange-600" },
    { name: "Fusion Reactor", path: "/dashboard/fusion-reactor", color: "text-yellow-400" },
    { name: "Quantum Computer", path: "/dashboard/quantum-computer", color: "text-blue-300" },
    { name: "Nanobot Swarm", path: "/dashboard/nanobot-swarm", color: "text-gray-400" },
    { name: "Terraforming", path: "/dashboard/terraforming", color: "text-green-700" },
    { name: "Space Elevator", path: "/dashboard/space-elevator", color: "text-blue-600" },
    { name: "Dyson Sphere", path: "/dashboard/dyson-sphere", color: "text-orange-300" },
    { name: "Warp Drive", path: "/dashboard/warp-drive", color: "text-indigo-500" },
    { name: "Time Dilation", path: "/dashboard/time-dilation", color: "text-purple-400" },
    { name: "Dark Matter", path: "/dashboard/dark-matter", color: "text-gray-600" },
    { name: "String Theory", path: "/dashboard/string-theory", color: "text-pink-500" },
    { name: "Multiverse", path: "/dashboard/multiverse", color: "text-cyan-600" },
    { name: "Mind Upload", path: "/dashboard/mind-upload", color: "text-purple-300" },
    { name: "Cryogenics", path: "/dashboard/cryogenics", color: "text-blue-200" },
    { name: "Galactic Trade", path: "/dashboard/galactic-trade", color: "text-yellow-300" },
    { name: "Alien Signal", path: "/dashboard/alien-signal", color: "text-green-400" },
    { name: "Void Shield", path: "/dashboard/void-shield", color: "text-blue-800" },
    { name: "Omega Point", path: "/dashboard/omega-point", color: "text-white" }
  ]},
  { cat: "EDGE FUNCTIONS", items: [
    { name: "Mesh Ingest", path: "/dashboard/mesh-ingest", color: "text-cyan-400" },
    { name: "Mesh List", path: "/dashboard/mesh-list", color: "text-blue-400" },
    { name: "Mesh Sync", path: "/dashboard/mesh-sync", color: "text-green-400" },
    { name: "Partition Maint", path: "/dashboard/partition-maintenance", color: "text-orange-400" },
    { name: "Meta Index", path: "/dashboard/scrollchain-meta-index", color: "text-purple-400" },
    { name: "Solar Lead", path: "/dashboard/scrollchain-solar-lead", color: "text-yellow-400" },
    { name: "Events", path: "/dashboard/scrollchain-events", color: "text-pink-400" },
    { name: "Audit", path: "/dashboard/scrollchain-audit", color: "text-red-400" },
    { name: "Health Check", path: "/dashboard/scrollchain-health", color: "text-green-500" },
    { name: "Token Ledger", path: "/dashboard/token-ledger", color: "text-yellow-500" },
    { name: "Resolve Model", path: "/dashboard/resolve-model", color: "text-indigo-400" },
    { name: "Models API", path: "/dashboard/models-api", color: "text-pink-500" },
    { name: "Receipts Log", path: "/dashboard/receipts-log", color: "text-gray-400" },
    { name: "Finance Rebalance", path: "/dashboard/finance-rebalance", color: "text-green-500" },
    { name: "Stripe Webhook", path: "/dashboard/stripe-webhook", color: "text-blue-500" },
    { name: "Orphan Wallets", path: "/dashboard/monitor-orphan-wallets", color: "text-red-500" },
    { name: "Capability Issue", path: "/dashboard/capability-issue", color: "text-orange-500" },
    { name: "Leads Negotiate", path: "/dashboard/leads-negotiate", color: "text-blue-300" },
    { name: "Leads Purchase", path: "/dashboard/leads-purchase", color: "text-green-400" },
    { name: "Agent Orchestrator", path: "/dashboard/agent-orchestrator", color: "text-yellow-400" },
    { name: "Training Session", path: "/dashboard/training-session", color: "text-green-400" },
    { name: "Me Chat", path: "/dashboard/me-chat", color: "text-cyan-300" }
  ]}
];

// 2. GENERATE SIDEBAR COMPONENT
const sidebarContent = \`
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MENU_DATA = \${JSON.stringify(menu, null, 2)};

export default function Sidebar() {
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<string | null>("CORE");

  return (
    <div className="w-64 h-full flex flex-col text-xs overflow-hidden bg-black/95 backdrop-blur-xl border-r border-cyan-900/30">
      <div className="p-4 border-b border-cyan-900/30">
        <div className="font-black text-cyan-400 tracking-[0.2em] text-lg">SCROLLCHAIN</div>
        <div className="text-[10px] text-cyan-600 mt-1 font-mono">ARCHITECT OS v40.0</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-cyan-900/50">
        {MENU_DATA.map((section) => (
          <div key={section.cat} className="rounded bg-white/5 overflow-hidden">
            <button 
              onClick={() => setOpenCategory(openCategory === section.cat ? null : section.cat)}
              className="w-full px-3 py-3 text-[10px] font-bold text-gray-400 tracking-widest text-left hover:bg-white/10 transition-colors flex justify-between items-center"
            >
              {section.cat}
              <span className="text-cyan-600">{openCategory === section.cat ? '-' : '+'}</span>
            </button>
            
            {openCategory === section.cat && (
              <div className="pb-2 space-y-0.5">
                {section.items.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={\`flex items-center px-4 py-2 border-l-2 transition-all duration-200 \${pathname === item.path ? 'border-cyan-500 bg-cyan-500/10 text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'}\`}
                  >
                    <span className={\`w-1.5 h-1.5 rounded-full mr-3 \${item.color.replace('text-', 'bg-')}\`}></span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-cyan-900/30 bg-black/60 text-[10px] font-mono text-gray-500">
        <div className="flex justify-between"><span>STATUS</span><span className="text-green-400">ONLINE</span></div>
        <div className="flex justify-between mt-1"><span>LATENCY</span><span className="text-cyan-400">1ms</span></div>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync(sidebarPath, sidebarContent);
console.log("Sidebar generated.");

// 3. WRITE UNIVERSAL PAGE TEMPLATE (HYDRATION SAFE)
const pageTemplate = \`
"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";

export default function UniversalPage({ title, category = "CORE" }: { title: string, category?: string }) {
  // Hydration fix: Start with null/empty, populate in useEffect
  const [mounted, setMounted] = useState(false);
  const [load, setLoad] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    setLogs(["> Initializing Neural Link..."]);
    const i = setInterval(() => {
      setLoad(Math.random() * 100);
      setLogs(prev => [\`[\${new Date().toLocaleTimeString()}] \${title.toUpperCase()}_OP: sync_packet_\${Math.floor(Math.random()*999)}\`, ...prev.slice(0, 8)]);
    }, 1000);
    return () => clearInterval(i);
  }, [title]);

  if (!mounted) return <div className="h-full w-full bg-black"></div>; // Prevent flash

  let themeColor = "cyan";
  if (category.includes("SECURITY") || category.includes("DEFENSE")) themeColor = "red";
  if (category.includes("FINANCE")) themeColor = "green";
  if (category.includes("AI")) themeColor = "purple";
  if (category.includes("FRONTIER")) themeColor = "yellow";

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none"><CyberScene /></div>
      
      <div className="relative z-10 p-8 flex flex-col gap-8">
        <div className="flex justify-between items-end border-b border-white/10 pb-4 backdrop-blur-md bg-black/30 p-6 rounded-xl border border-white/5">
           <div>
             <div className={\`text-[10px] font-bold tracking-[0.4em] mb-2 text-\${themeColor}-400\`}>SCROLLCHAIN // SECURE</div>
             <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-500 tracking-tighter uppercase">{title}</h1>
           </div>
           <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">NODE STATUS</div>
              <div className="font-mono font-bold text-green-400 animate-pulse flex items-center justify-end gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> ONLINE</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="space-y-6">
              <div className="glass-panel p-6 rounded-xl">
                 <div className="text-xs text-gray-500 mb-4 font-bold tracking-widest">COMPUTE LOAD</div>
                 <div className="text-4xl font-mono text-white mb-2">{Math.floor(load)}%</div>
                 <div className="w-full bg-gray-800 h-1 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" style={{width: \`\${load}%\`}}></div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col min-h-[400px] relative overflow-hidden">
              <div className="text-xs text-gray-500 font-bold tracking-widest mb-4 border-b border-gray-800 pb-2">TERMINAL OUTPUT</div>
              <div className="flex-1 font-mono text-xs text-cyan-300/80 space-y-2 overflow-y-auto">
                 {logs.map((l, i) => (
                    <div key={i} className="hover:bg-white/5 p-1 rounded cursor-pointer transition-colors">
                       <span className="text-purple-400 mr-2">{'>'}</span> {l}
                    </div>
                 ))}
                 <div className="animate-pulse text-cyan-500 mt-2">_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
\`;

fs.writeFileSync(templatePath, pageTemplate);

// 4. GENERATE ALL PAGES
console.log("Generating rooms...");
menu.forEach(section => {
  section.items.forEach(item => {
    if (item.path.startsWith('/dashboard/')) {
       const folder = item.path.replace('/dashboard/', '');
       const dir = path.join(rootDir, 'app/dashboard', folder);
       if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
       
       const pagePath = path.join(dir, 'page.tsx');
       // Always overwrite to ensure update
       const content = \`import UniversalPage from "../../../components/templates/UniversalPage"; export default function P(){return <UniversalPage title="\${item.name}" category="\${section.cat}" />}\`;
       fs.writeFileSync(pagePath, content);
    }
  });
});
console.log("Build complete.");
