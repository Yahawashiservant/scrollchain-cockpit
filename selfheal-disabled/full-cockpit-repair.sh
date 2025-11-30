#!/bin/bash
set -e

echo "=== ScrollChainOS Cockpit Repair ==="

# ENSURE we run from cockpit root
if [ ! -d "components" ] || [ ! -d "app" ]; then
  echo "❌ ERROR: You must run this from: ~/scrollchain-cockpit/cockpit"
  exit 1
fi

echo "[1] Cleaning build artefacts…"
rm -rf .next node_modules

echo "[2] Fixing dashboardManifest import path…"
# Ensure config exists
mkdir -p app/config
if [ ! -f app/config/dashboardManifest.ts ]; then
cat << 'MANIFEST' > app/config/dashboardManifest.ts
export default {
  panels: [
    "overview",
    "nats",
    "streams",
    "telemetry-state",
    "telemetry-snapshot",
    "repo-scanner",
    "intelligence",
    "quantum-metrics",
    "rwa-asset-maps",
    "crm",
    "governance",
    "vault",
    "vaultpolis"
  ]
}
MANIFEST
fi

# Fix sidebar.ts
cat << 'SIDEBAR' > lib/sidebar.ts
import dashboardManifest from "../app/config/dashboardManifest";

export function getSidebarItems(): string[] {
  if (!dashboardManifest || !Array.isArray(dashboardManifest.panels)) {
    return [];
  }
  return dashboardManifest.panels;
}
SIDEBAR

echo "[3] Repairing CockpitSidebar…"
cat << 'SIDEBARFIX' > components/CockpitSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarItems } from "../lib/sidebar";

export default function CockpitSidebar() {
  const pathname = usePathname();
  const items = getSidebarItems();

  return (
    <aside className="w-64 p-4 border-r border-neutral-800">
      <ul className="space-y-1">
        {items.map((item: string) => {
          const active = pathname.startsWith(`/dashboard/${item}`);
          return (
            <li key={item}>
              <Link
                href={`/dashboard/${item}`}
                className={`block px-3 py-2 rounded ${active ? "bg-neutral-800" : "hover:bg-neutral-900"}`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
SIDEBARFIX

echo "[4] Fixing SovereignGeometry THREE namespace…"
cat << 'GEOMETRY' > components/SovereignGeometry.tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SovereignGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.5, 200, 32]} />
      <meshStandardMaterial color="#ffaa00" />
    </mesh>
  );
}
GEOMETRY

echo "[5] Fixing ScrollEntropyShader material registration…"
cat << 'ENTROPY' > components/ScrollEntropyShader.tsx
"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const ScrollEntropyMaterial = shaderMaterial(
  { time: 0 },
  `
    uniform float time;
    void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  `
    uniform float time;
    void main() { gl_FragColor = vec4(abs(sin(time)), 0.1, 0.5, 1.0); }
  `
);

extend({ ScrollEntropyMaterial });

export default function ScrollEntropyShader() {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) ref.current.time = clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 128, 128]} />
      <scrollEntropyMaterial ref={ref} />
    </mesh>
  );
}
ENTROPY

echo "[6] Installing dependencies clean…"
pnpm install --force

echo "[7] Building clean…"
pnpm build

echo "== ✅ ScrollChainOS Cockpit Fully Repaired =="
