#!/bin/bash
set -e

echo "=== SCROLLCHAIN: STOP, FIX, POPULATE, START ==="
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
cd "$ROOT"

# --- STEP 1: KILL ZOMBIE PROCESSES (Prioritize Clean Slate) ---
echo "[1/6] Killing any process on port 3000..."
fuser -k 3000/tcp 2>/dev/null || true
lsof -t -i:3000 | xargs -r kill -9 2>/dev/null || true

# --- STEP 2: HYDRATE CORE COMPONENTS (The "Engine") ---
echo "[2/6] Hydrating Core Quantum Components..."
mkdir -p components/quantum

# QuantumTorus (Visual Anchor)
cat << 'TORUS' > components/QuantumTorus.tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
    </mesh>
  );
}
TORUS

# QuantumStage (Safe Container)
cat << 'STAGE' > components/quantum/QuantumStage.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { ReactNode } from "react";

interface QuantumStageProps {
  children?: ReactNode;
}

export default function QuantumStage({ children }: QuantumStageProps) {
  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden bg-black relative shadow-lg shadow-cyan-900/20">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000"]} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan={false} />
        {children}
      </Canvas>
    </div>
  );
}
STAGE

# --- STEP 3: HYDRATE PAGES (The "Features") ---
echo "[3/6] Populating Dashboard Rooms..."

# Overview
mkdir -p app/dashboard/overview
cat << 'PAGE_OV' > app/dashboard/overview/page.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import QuantumTorus from "../../../components/QuantumTorus"; 

export default function OverviewPage() {
  return (
    <div className="h-full w-full bg-black relative rounded-xl overflow-hidden border border-cyan-900/30">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-2xl font-bold text-cyan-400">SYSTEM OVERVIEW</h1>
        <div className="text-xs text-cyan-600 font-mono">QUANTUM_ENGINE: ONLINE</div>
      </div>
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <QuantumTorus />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}
PAGE_OV

# Repo Scanner (Terminal UI)
mkdir -p app/dashboard/repo-scanner
cat << 'PAGE_RS' > app/dashboard/repo-scanner/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function RepoScannerPage() {
  const [logs, setLogs] = useState<string[]>(["> Initializing Git LFS hooks..."]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msgs = ["> Scanning commit 7b0b8ff...", "> Indexing refs/heads/main...", "> Delta compression: 44%...", "> Object enumeration complete."];
      setLogs(prev => [...prev, msgs[Math.floor(Math.random() * msgs.length)]].slice(-10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-black p-6 font-mono">
      <h1 className="text-2xl font-bold text-green-500 mb-4">REPOSITORY SCANNER</h1>
      <div className="bg-gray-900 border border-green-800 rounded p-4 h-96 overflow-hidden relative">
        <div className="absolute top-2 right-2 text-xs text-green-700">LIVE_FEED</div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="text-green-400 text-sm border-l-2 border-green-600 pl-2">{log}</div>
          ))}
          <div className="animate-pulse text-green-500">_</div>
        </div>
      </div>
    </div>
  );
}
PAGE_RS

# Intelligence (Agent Grid)
mkdir -p app/dashboard/intelligence
cat << 'PAGE_INT' > app/dashboard/intelligence/page.tsx
"use client";
export default function IntelligencePage() {
  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-purple-400 mb-6">INTELLIGENCE GRID</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["PatternRecog", "AnomalyDetect", "PredictiveOps"].map((agent, i) => (
          <div key={i} className="bg-gray-900/50 border border-purple-900/50 rounded-lg p-4 flex justify-between items-center">
            <div><div className="font-bold text-purple-300">{agent}</div><div className="text-xs text-gray-500">ID: AGT-0{i+1}</div></div>
            <div className="text-right"><div className="text-xs font-mono text-green-400">ACTIVE</div><div className="w-24 h-1 bg-gray-800 mt-1 rounded-full"><div className="h-full bg-purple-500 w-2/3"></div></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
PAGE_INT

# NATS (Network Mesh)
mkdir -p app/dashboard/nats
cat << 'PAGE_NATS' > app/dashboard/nats/page.tsx
"use client";
export default function NatsPage() {
  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-green-400 mb-6">NATS MESSAGING MESH</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 border border-green-900/30 p-4 rounded text-center"><div className="text-2xl font-bold">4.2M</div><div className="text-xs text-gray-500">MSGS/SEC</div></div>
        <div className="bg-gray-900/50 border border-green-900/30 p-4 rounded text-center"><div className="text-2xl font-bold text-green-400">CONNECTED</div><div className="text-xs text-gray-500">STATUS</div></div>
        <div className="bg-gray-900/50 border border-green-900/30 p-4 rounded text-center"><div className="text-2xl font-bold">12ms</div><div className="text-xs text-gray-500">LATENCY</div></div>
      </div>
    </div>
  );
}
PAGE_NATS

# Kernel (Process List)
mkdir -p app/dashboard/kernel
cat << 'PAGE_KERN' > app/dashboard/kernel/page.tsx
"use client";
export default function KernelPage() {
  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">SCROLLCHAIN KERNEL</h1>
      <div className="bg-gray-900/80 border border-cyan-900/50 rounded-lg p-6">
        <h3 className="text-sm font-bold text-gray-400 mb-4">CORE PROCESSES</h3>
        <ul className="space-y-2 text-sm font-mono">
          <li className="flex justify-between"><span className="text-cyan-300">init_d</span> <span className="text-green-500">RUNNING</span></li>
          <li className="flex justify-between"><span className="text-cyan-300">quantum_scheduler</span> <span className="text-green-500">RUNNING</span></li>
          <li className="flex justify-between"><span className="text-cyan-300">fs_watcher</span> <span className="text-green-500">RUNNING</span></li>
        </ul>
      </div>
    </div>
  );
}
PAGE_KERN

# --- STEP 4: CLEANUP ---
echo "[4/6] Clearing cache..."
rm -rf .next

# --- STEP 5: LAUNCH ---
echo "[5/6] Starting Cockpit Server..."
echo "NOTE: Terminal will capture logs now. The app is running."
exec pnpm run dev
