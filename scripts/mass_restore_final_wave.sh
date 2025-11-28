#!/bin/bash
set -e

echo "=== SCROLLCHAIN: FINAL WAVE HYDRATION (ADDING EVERYTHING) ==="
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
cd "$ROOT"

# --- STEP 1: KILL PORT ---
fuser -k 3000/tcp 2>/dev/null || true
lsof -t -i:3000 | xargs -r kill -9 2>/dev/null || true

# --- STEP 2: DEFINE GENERATOR FUNCTION ---
# (Re-defining here to ensure script is self-contained)
generate_page() {
  local folder="$1"
  local title="$2"
  local category="$3"
  local color="$4"
  
  mkdir -p "app/dashboard/$folder"
  if [ ! -s "app/dashboard/$folder/page.tsx" ] || grep -q "text-white" "app/dashboard/$folder/page.tsx"; then
    cat << EOF > "app/dashboard/$folder/page.tsx"
import UniversalDashboardPage from "../../../components/templates/UniversalDashboardPage";

export default function Page() {
  return <UniversalDashboardPage title="$title" category="$category" color="$color" />;
}
EOF
  fi
}

echo "[1/2] Generating remaining 160+ Rooms..."

# --- THE SIMULATION ---
items=("life-game" "fluid-sim" "gravity-sandbox" "planet-builder" "evolution" "traffic-flow" "crowd-dynamics" "star-forge" "tectonics" "atmosphere-mixer" "erosion-sim" "orbit-plotter" "particle-storm" "ray-tracer" "sound-scaper" "color-theory" "voxel-editor" "procedural-city" "logic-sandbox" "ecosystem-sim")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "THE SIMULATION" "text-blue-500"; done

# --- THE UNDERGROUND ---
items=("black-market" "safe-house" "dead-drop" "smuggler-route" "hacker-den" "pirate-radio" "data-haven" "ghost-network" "resistance-hq" "graffiti-wall" "glitch-zone" "zero-day-market" "clone-vat" "memory-wiper" "identity-forger" "shadow-bank" "underground-rail" "fight-club" "scrapyard" "the-undercity")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "THE UNDERGROUND" "text-gray-500"; done

# --- STRATEGIC DEFENSE ---
items=("war-room" "nuclear-silo" "spec-ops" "radar-array" "bunker-status" "bioweapon-labs" "psyops" "supply-lines" "defcon-status" "orbital-laser" "submarine-fleet" "air-traffic" "border-control" "encryption-breaker" "spy-network" "drone-command" "cyber-warfare" "emergency-broadcast" "asset-recovery" "doomsday-clock")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "STRATEGIC DEFENSE" "text-red-600"; done

# --- SPIRITUAL & ESOTERIC ---
items=("akashic-records" "karma-tracker" "meditation-chamber" "chakra-alignment" "astral-plane" "tarot-reader" "spirit-guide" "past-lives" "aura-scanner" "sacred-geometry" "nirvana-gauge" "third-eye" "telepathy-net" "reincarnation-queue" "soul-ledger" "enlightenment-path" "vibration-tuner" "oracle" "zen-garden" "collective-unconscious")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "SPIRITUAL & ESOTERIC" "text-purple-300"; done

# --- ABSTRACT & ARCANE ---
items=("chaos-engine" "memory-palace" "dream-state" "logic-core" "pulse-monitor" "frequency-tuner" "crypto-graph" "time-machine" "glitch-art" "holo-deck" "sub-space" "code-matrix" "genome-editor" "hive-mind" "echo-chamber" "mirror-world" "ghost-in-shell" "artifacts" "registry-editor" "terminal-x")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "ABSTRACT & ARCANE" "text-pink-500"; done

# --- CIVILIZATION ---
items=("urban-planner" "digital-court" "neo-bank" "academy" "medi-bay" "estate-manager" "grand-museum" "archive" "arena" "comms-relay" "fabricator" "agri-dome" "holo-theater" "diplomacy" "detention" "probability-zone" "ethics-council" "mega-mall" "spaceport" "the-void")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "CIVILIZATION" "text-yellow-500"; done

# --- EXPERIMENTAL ---
items=("mech-bay" "android-factory" "moon-base" "mars-colony" "titan-outpost" "asteroid-mining" "star-map" "nebula-scanner" "black-hole" "quasar" "pulsar" "supernova" "comet-tracker" "space-station" "deep-sleep-pods" "gene-splicer" "neural-link" "cybernetics" "exoskeleton" "cloning-facility")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "EXPERIMENTAL" "text-cyan-300"; done

# --- DEEP SYSTEM ---
items=("kernel-panic" "stack-trace" "heap-dump" "memory-leak" "buffer-overflow" "race-condition" "deadlock" "segfault" "blue-screen" "red-ring" "404-room" "500-room" "infinite-loop" "recursion" "fractal" "noise" "static" "void" "null" "undefined")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "DEEP SYSTEM" "text-red-800"; done

# --- CREATIVE STUDIO ---
items=("holo-canvas" "beat-maker" "voxel-sculptor" "story-engine" "texture-gen" "rigging-bay" "render-farm" "color-grade" "audio-master" "script-editor" "level-design" "character-rigger" "motion-capture" "photogrammetry" "synth-rack" "sample-library" "font-foundry" "iconography" "layout-tool" "publish-hub")
for i in "${items[@]}"; do generate_page "$i" "${i//-/ }" "CREATIVE STUDIO" "text-indigo-400"; done

# --- STEP 3: LAUNCH ---
echo "[2/2] All systems hydrated. Launching..."
rm -rf .next
pnpm run dev
