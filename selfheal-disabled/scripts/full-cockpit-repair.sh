#!/bin/bash
set -e

echo "== 🧹 ScrollChainOS Cockpit — Full Repair =="
cd "$(dirname "$0")/.."
ROOT=$(pwd)

echo "== Cleaning .next =="
rm -rf "$ROOT/.next" "$ROOT/cockpit/.next" 2>/dev/null || true

echo "== Reinstalling dependencies =="
pnpm install --force

echo "== Fixing CockpitSidebar =="
SIDEBAR_FILE="$ROOT/cockpit/components/CockpitSidebar.tsx"
cat << 'EOF_SIDEBAR' > "$SIDEBAR_FILE"
"use client";

import { usePathname } from "next/navigation";
import { getSidebarItems } from "../lib/sidebar";

export default function CockpitSidebar() {
  const pathname = usePathname();
  const items = getSidebarItems();

  return (
    <aside className="w-64 border-r border-neutral-800 p-4">
      <ul className="space-y-1">
        {items.map((item: string) => {
          const active = pathname.startsWith(`/dashboard/${item}`);
          return (
            <li key={item}>
              <a
                href={`/dashboard/${item}`}
                className={active ? "text-amber-400" : "text-neutral-300"}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
EOF_SIDEBAR

echo "== Fixing sidebar.ts =="
cat << 'EOF_SIDEBARLIB' > "$ROOT/cockpit/lib/sidebar.ts"
import dashboardManifest from "../app/config/dashboardManifest";

export function getSidebarItems(): string[] {
  if (!dashboardManifest?.panels) return [];
  return dashboardManifest.panels.map((p: any) => p.id);
}
EOF_SIDEBARLIB

echo "== Fixing ScrollEntropyShader intrinsic element =="
cat << 'EOF_ENTROPY' > "$ROOT/cockpit/components/ScrollEntropyShader.tsx"
"use client";

import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const ScrollEntropyMaterial = shaderMaterial(
  { time: 0 },
  `
    uniform float time;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  `
    uniform float time;
    void main() {
      gl_FragColor = vec4(abs(sin(time)), 0.3, 0.6, 1.0);
    }
  `
);

extend({ ScrollEntropyMaterial });

export default function ScrollEntropyShader() {
  const ref = useRef<any>();
  useFrame((_, delta) => {
    if (ref.current) ref.current.time += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[50, 50, 256, 256]} />
      <scrollEntropyMaterial ref={ref} />
    </mesh>
  );
}
EOF_ENTROPY

echo "== Fixing SovereignGeometry THREE namespace =="
cat << 'EOF_SOVEREIGN' > "$ROOT/cockpit/components/SovereignGeometry.tsx"
"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SovereignGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.0007;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}
EOF_SOVEREIGN

echo "== Rebuilding cockpit.json =="
bash "$ROOT/cockpit/scripts/gen_cockpit_json.sh" || true

echo "== Regenerating dashboard pages =="
bash "$ROOT/cockpit/scripts/generate_dashboards.sh" || true

echo "== Enforcing page layout =="
bash "$ROOT/cockpit/scripts/router_reconciler.sh" || true

echo "== Final build =="
pnpm build

echo "== ✅ ScrollChainOS Cockpit Fully Repaired =="
