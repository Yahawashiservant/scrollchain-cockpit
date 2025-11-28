#!/bin/bash
set -e

echo "=== ScrollChainOS: Full Cockpit Repair Script Running ==="

### 1. REMOVE BROKEN .next AND NODE_MODULES
echo "[1] Cleaning .next and node_modules junk…"
rm -rf .next
rm -rf node_modules

### 2. FIX COCKPIT SIDEBAR
echo "[2] Repairing CockpitSidebar…"
cat << 'EOCS' > components/CockpitSidebar.tsx
"use client"
import { usePathname } from "next/navigation"
import { getSidebarItems } from "../lib/sidebar"

export default function CockpitSidebar() {
  const pathname = usePathname()
  const items = Array.isArray(getSidebarItems()) ? getSidebarItems() : []

  return (
    <aside className="w-64 h-screen border-r border-neutral-800 bg-neutral-900 p-4">
      <ul className="space-y-1">
        {items.map((item: string) => {
          const active = pathname.startsWith(\`/dashboard/\${item}\`)
          return (
            <li key={item}>
              <a
                href={\`/dashboard/\${item}\`}
                className={\`block p-2 rounded hover:bg-neutral-800 \${active ? "bg-neutral-800" : ""}\`}
              >
                {item}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
EOCS

### 3. FIX sidebar.ts IMPORT ERROR
echo "[3] Repairing sidebar.ts import…"
cat << 'EOSIDEBAR' > lib/sidebar.ts
import dashboardManifest from "../config/dashboardManifest"

export function getSidebarItems(): string[] {
  if (!dashboardManifest?.panels) return []
  return dashboardManifest.panels.map((p: any) => p.id || p.name || "unknown")
}
EOSIDEBAR

### 4. FIX ScrollEntropyShader MATERIAL REGISTRATION
echo "[4] Fixing ScrollEntropyShader…"
cat << 'EOSES' > components/ScrollEntropyShader.tsx
"use client"
import { extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro"
import { useRef } from "react"

const ScrollEntropyMaterial = shaderMaterial(
  { time: 0 },
  glsl\`
    void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  \`,
  glsl\`
    uniform float time;
    void main() { gl_FragColor = vec4(abs(sin(time)), 0.0, 1.0, 1.0); }
  \`
)

extend({ ScrollEntropyMaterial })

export default function ScrollEntropyShader() {
  const ref = useRef<any>(null)
  useFrame(({ clock }) => { if (ref.current) ref.current.time = clock.elapsedTime })

  return (
    <mesh>
      <planeGeometry args={[50, 50, 256, 256]} />
      <scrollEntropyMaterial ref={ref} />
    </mesh>
  )
}
EOSES

### 5. FIX MISSING THREE NAMESPACE
echo "[5] Fixing SovereignGeometry.tsx…"
cat << 'EOGEO' > components/SovereignGeometry.tsx
"use client"
import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function SovereignGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.001
    meshRef.current.rotation.y += 0.001
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial color="#ffaa00" wireframe />
    </mesh>
  )
}
EOGEO

### 6. REGENERATE cockpit.json
echo "[6] Regenerating cockpit.json…"
bash scripts/gen_cockpit_json.sh || true

### 7. REGENERATE ALL DASHBOARD PAGES
echo "[7] Regenerating dashboard pages…"
bash scripts/generate_dashboards.sh || true

### 8. REINSTALL DEPS
echo "[8] Reinstalling dependencies (pnpm)…"
pnpm install

### 9. FULL BUILD
echo "[9] Building Cockpit cleanly…"
pnpm build || { echo "❌ Build failed"; exit 1; }

echo "== ✅ ScrollChainOS Cockpit Fully Repaired =="
