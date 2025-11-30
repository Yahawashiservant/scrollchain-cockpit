#!/bin/bash
ROOT="$(pwd)"
LOG="$ROOT/status/selfheal.log"

echo "$(date) :: [CORE] Starting self-repair" >> "$LOG"

# 1. Fix dashboardManifest default export
mkdir -p app/config
cat << 'FEOF' > app/config/dashboardManifest.ts
const dashboardManifest = {
  panels: [
    "overview","3d-frequency-ui","aaa-assets","ai-agents","billing","billing-mrr",
    "campaign","campaign-intelligence","client-dashboards","client-logs",
    "compliance-layer","crm","data-lake","edge-functions","governance",
    "governance-engines","hr-people-intelligence","intelligence",
    "kernel-state-inspector","lead-flows","mrr","nats","nats-subjects",
    "neural-shader-engine","provenance-graphs","quantum-metrics",
    "receipts","recursive-geometry","repo-scanner","repo-verticals",
    "rwa-asset-maps","scrollkernel","sovereign-settings","streams",
    "telemetry-snapshot","telemetry-state","tokenization",
    "torus-engine","vault","vaultpolis","verticals"
  ]
};
export default dashboardManifest;
FEOF

# 2. Fix sidebar import path
cat << 'FEOF' > lib/sidebar.ts
import dashboardManifest from "../app/config/dashboardManifest";

export function getSidebarItems(): string[] {
  if (!dashboardManifest?.panels) return [];
  return dashboardManifest.panels;
}
FEOF

# 3. Fix CockpitSidebar for valid JSX and no invalid chars
cat << 'FEOF' > components/CockpitSidebar.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getSidebarItems } from "@/lib/sidebar"

export default function CockpitSidebar() {
  const pathname = usePathname()
  const items = getSidebarItems()

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname.startsWith("/dashboard/" + item)
          return (
            <li key={item}>
              <Link
                href={"/dashboard/" + item}
                className={"block px-3 py-2 rounded " + 
                  (active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800")}
              >
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
FEOF

# 4. Fix SovereignGeometry THREE namespace
cat << 'FEOF' > components/SovereignGeometry.tsx
"use client"
import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function SovereignGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
FEOF

echo "$(date) :: [CORE] Repair tasks applied" >> "$LOG"

# 5. Wipe build + rebuild
rm -rf .next
pnpm build >> "$LOG" 2>&1

echo "$(date) :: [CORE] Build complete" >> "$LOG"
