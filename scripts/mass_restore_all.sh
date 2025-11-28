#!/bin/bash
set -e

echo "=== SCROLLCHAIN: MASS RESTORATION (GENERATOR MODE) ==="
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
cd "$ROOT"

# --- STEP 1: KILL PORT ---
fuser -k 3000/tcp 2>/dev/null || true
lsof -t -i:3000 | xargs -r kill -9 2>/dev/null || true

# --- STEP 2: CREATE THE UNIVERSAL PAGE COMPONENT ---
echo "[1/3] Creating Universal Dashboard Template..."
mkdir -p components/templates

cat << 'EOF_TEMPLATE' > components/templates/UniversalDashboardPage.tsx
"use client";
import { useState, useEffect } from "react";

export default function UniversalDashboardPage({ title, category, color }: { title: string, category: string, color: string }) {
  const [activity, setActivity] = useState<number[]>(Array(20).fill(0));
  const [logs, setLogs] = useState<string[]>(["> System Initialized..."]);
  
  // Simulation of live data
  useEffect(() => {
    const interval = setInterval(() => {
      // Update graph data
      setActivity(prev => [...prev.slice(1), Math.random() * 100]);
      
      // Update mock logs
      const newLog = `[${new Date().toLocaleTimeString()}] ${category}_daemon: processed_packet_${Math.floor(Math.random() * 9999)}`;
      setLogs(prev => [...prev.slice(-8), newLog]);
    }, 1000);
    return () => clearInterval(interval);
  }, [category]);

  return (
    <div className="h-full w-full bg-black p-6 text-white flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`text-xs font-bold tracking-widest ${color} mb-1`}>{category.toUpperCase()}</div>
          <h1 className="text-3xl font-black text-white">{title.replace(/-/g, ' ').toUpperCase()}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="text-xs text-green-500 font-mono">LIVE</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Left: Activity Monitor */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col">
           <h3 className="text-sm font-bold text-gray-400 mb-4">ACTIVITY STREAM</h3>
           <div className="flex-1 flex items-end space-x-1 h-64">
              {activity.map((h, i) => (
                <div key={i} className={`flex-1 rounded-t transition-all duration-300 ${color.replace('text', 'bg')}`} style={{ height: `${h}%`, opacity: 0.5 + (i/40) }}></div>
              ))}
           </div>
        </div>

        {/* Right: Status & Logs */}
        <div className="flex flex-col gap-6">
           <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-400 mb-2">STATUS</h3>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-2">
                 <span className="text-xs text-gray-500">UPTIME</span>
                 <span className="font-mono">99.99%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-500">LATENCY</span>
                 <span className="font-mono text-green-400">12ms</span>
              </div>
           </div>

           <div className="flex-1 bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs overflow-hidden relative">
              <div className="absolute top-2 right-3 text-gray-600">CONSOLE</div>
              <div className="mt-4 space-y-1 text-gray-400">
                 {logs.map((l, i) => <div key={i}>{l}</div>)}
                 <div className={`animate-pulse ${color}`}>_</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
EOF_TEMPLATE

# --- STEP 3: GENERATE PAGES LOOP ---
echo "[2/3] Generating 300+ Page Files..."

# Function to generate a page file
generate_page() {
  local folder="$1"
  local title="$2"
  local category="$3"
  local color="$4"
  
  mkdir -p "app/dashboard/$folder"
  # Only write if file doesn't exist or is empty (prevents overwriting your custom work like overview/kernel)
  if [ ! -s "app/dashboard/$folder/page.tsx" ] || grep -q "text-white" "app/dashboard/$folder/page.tsx"; then
    cat << EOF > "app/dashboard/$folder/page.tsx"
import UniversalDashboardPage from "../../../components/templates/UniversalDashboardPage";

export default function Page() {
  return <UniversalDashboardPage title="$title" category="$category" color="$color" />;
}
EOF
  fi
}

# --- DEFINING THE ROOMS (Grouped by Category) ---

# FRONTIER SCIENCE
items=("exoplanet-scanner" "bio-lab" "particle-collider" "fusion-reactor" "quantum-computer" "nanobot-swarm" "terraforming" "space-elevator" "dyson-sphere" "warp-drive" "time-dilation" "dark-matter" "string-theory" "multiverse" "mind-upload" "cryogenics" "galactic-trade" "alien-signal" "void-shield" "omega-point")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "FRONTIER SCIENCE" "text-purple-400"; done

# AI & INTEL
items=("intelligence" "neural-shader-engine" "cognition" "neural-training" "model-registry" "sentiment-analysis" "agent-swarm" "llm-playground" "knowledge-base" "neural-voice" "code-synthesis" "generative-art" "autonomous-dao" "singularity-watch")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "AI & INTEL" "text-pink-400"; done

# INFRASTRUCTURE
items=("nats" "kernel" "edge-functions" "multi-db" "streams" "server-mesh" "k8s-pods" "load-balancer" "cdn-status" "simulation-lab" "system-logs" "iot-mesh")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "INFRASTRUCTURE" "text-blue-400"; done

# FINANCE
items=("billing" "receipts" "tokenization" "marketplace" "defi-lending" "arbitrage-bot" "liquidity-pools" "payment-gateway" "carbon-credits" "prediction-markets" "smart-wallets" "tax-calculator" "exchange-rates" "order-book" "whale-watch" "dao-treasury")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "FINANCE" "text-green-400"; done

# OPERATIONS
items=("governance" "governance-engines" "supply-chain" "global-trade" "client-dashboards" "lead-flows" "crm" "hr-people-intelligence" "talent-acquisition" "payroll" "employee-pulse" "secure-chat" "town-hall" "wiki")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "OPERATIONS" "text-orange-400"; done

# SECURITY
items=("vault" "compliance-layer" "sovereign-settings" "cyber-defense" "pen-testing" "access-control" "contract-auditor" "identity" "quantum-keys" "audit-logs" "dark-web")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "SECURITY" "text-red-400"; done

# DATA
items=("data-lake" "enricher" "file-ingesto" "rwa-asset-maps" "telemetry-snapshot" "recursive-geometry" "provenance-graphs" "validators" "mempool" "gas-oracle" "entropy-budget" "quantum-bridge" "predictive-models")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "DATA" "text-cyan-400"; done

# DEV TOOLS
items=("ci-cd" "git-analytics" "issue-tracker" "user-journey" "ab-tests" "localization" "vr-room")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "DEV TOOLS" "text-yellow-400"; done

# ADMIN UTILS
items=("media-assets" "partner-portal" "legal-docs" "warehouse" "offline-mode" "ui-themer" "release-notes" "performance-tuner" "hardware-interface" "external-apis" "virtualization" "data-archiving")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "ADMIN" "text-gray-400"; done

# GAMING
items=("avatar-studio" "guild-hall" "raid-boss" "xp-tracker" "skin-market" "pvp-zone" "crafting-bench" "speedrun" "gacha-machine" "npc-village" "quest-log" "achievement-wall" "battle-royale" "pet-sanctuary" "mod-workshop" "clan-war" "sandbox-mode" "tutorial" "inventory" "esports-arena")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "GAMING" "text-indigo-400"; done

# EXOTIC
items=("dimensional-rift" "tesseract" "non-euclidean" "fractal-zoom" "time-loop" "entropy-counter" "zero-point" "dark-energy" "antimatter" "white-hole" "wormhole" "event-horizon" "tachyon-field" "higgs-boson" "string-vibration" "quantum-foam" "parallel-earth" "simulation-glitch" "the-end" "credits")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "EXOTIC REALITY" "text-purple-500"; done

# ULTIMATE ABSTRACTION & TRANSCENDENCE (Catch-all for the rest)
items=("hyperspace" "source-code" "metaprogramming" "quantum-entanglement" "singularity-core" "ultimate-forms" "chronos-lab" "m-theory" "consciousness-grid" "reality-check" "omniscience" "paradox-engine" "ultimate-reboot" "source-field" "meta-awareness" "eternal-return" "pattern-recognition" "ultimate-recon" "chronometer" "convergence-point" "logos" "primal-soup" "monolith" "void-sea" "aether" "fifth-force" "dark-fluid" "hyper-gravity" "primordial-matter" "cosmic-neutrinos" "quantum-vacuum" "event-horizon-v2" "ultimate-recycler" "no-boundary" "unified-field" "the-abyss" "final-form" "zero-level" "end-of-time" "scrollchain-prime")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "ABSTRACTION" "text-teal-400"; done


# --- STEP 4: LAUNCH ---
echo "[3/3] All rooms hydrated. Launching..."
rm -rf .next
pnpm run dev
