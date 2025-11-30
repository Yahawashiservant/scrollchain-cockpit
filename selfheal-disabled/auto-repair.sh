#!/bin/bash
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"

echo "=== ScrollChainOS AUTO-REPAIR v2 ==="
cd "$ROOT" || exit 1

# --- Repair 1: dashboardManifest must default-export ---
mkdir -p app/config
cat << 'FEOF' > app/config/dashboardManifest.ts
const dashboardManifest = {
  panels: [
    "overview",
    "3d-frequency-ui",
    "aaa-assets",
    "ai-agents",
    "billing",
    "billing-mrr",
    "campaign",
    "campaign-intelligence",
    "client-dashboards",
    "client-logs",
    "compliance-layer",
    "crm",
    "data-lake",
    "edge-functions",
    "governance",
    "governance-engines",
    "hr-people-intelligence",
    "intelligence",
    "kernel-state-inspector",
    "lead-flows",
    "mrr",
    "nats",
    "nats-subjects",
    "neural-shader-engine",
    "provenance-graphs",
    "quantum-metrics",
    "receipts",
    "recursive-geometry",
    "repo-scanner",
    "repo-verticals",
    "rwa-asset-maps",
    "scrollkernel",
    "sovereign-settings",
    "streams",
    "telemetry-snapshot",
    "telemetry-state",
    "tokenization",
    "torus-engine",
    "vault",
    "vaultpolis",
    "verticals"
  ]
}
export default dashboardManifest;
FEOF

# --- Repair 2: sidebar must import DEFAULT export ---
mkdir -p lib
cat << 'FEOF' > lib/sidebar.ts
import dashboardManifest from "../app/config/dashboardManifest";

export function getSidebarItems(): string[] {
  if (!dashboardManifest?.panels) return [];
  return dashboardManifest.panels;
}
FEOF

# --- Repair 3: CockpitSidebar must call getSidebarItems() with no args ---
mkdir -p components
cat << 'FEOF' > components/CockpitSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarItems } from "../lib/sidebar";

export default function CockpitSidebar() {
  const pathname = usePathname();
  const items = getSidebarItems();

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-4">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = pathname.startsWith(\`/dashboard/\${item}\`);
          return (
            <li key={item}>
              <Link
                href={\`/dashboard/\${item}\`}
                className={\`block p-2 rounded \${active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:bg-neutral-800"}\`}
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
FEOF

# --- Repair 4: SovereignGeometry THREE namespace fix ---
cat << 'FEOF' > components/SovereignGeometry.tsx
"use client";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SovereignGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.0007;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}
FEOF

# --- Repair 5: NATS jetstream import fix ---
cat << 'FEOF' > server/nats.ts
import { connect, JetStreamClient } from "nats";

let jsPromise: Promise<JetStreamClient> | null = null;

export async function getConnection() {
  return await connect({ servers: process.env.NATS_URL });
}

export async function getJetStream(): Promise<JetStreamClient> {
  if (!jsPromise) {
    const nc = await getConnection();
    jsPromise = Promise.resolve(nc.jetstream());
  }
  return jsPromise!;
}
FEOF

echo "=== Auto-Repair COMPLETE ==="
