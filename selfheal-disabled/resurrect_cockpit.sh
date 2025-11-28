#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
PAGES="$ROOT/pages"
DASH_DIR="$PAGES/dashboard"
API_DIR="$PAGES/api"
SERVER_DIR="$ROOT/server"
COMP_DIR="$ROOT/components"
STYLES_DIR="$ROOT/styles"
LIB_DIR="$ROOT/lib"
MANIFEST="$ROOT/dashboards.json"

echo "[Phase M-7] Cockpit Resurrection: starting at $(date -Is)"
echo "Root: $ROOT"

# 1) Delete incomplete 8-line stubs (JS/TS/TSX)
echo "Scanning for 8-line stubs..."
find "$PAGES" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \) -exec awk 'FNR==NR{a[ARGV[1]]=1;next} END{}' /dev/null {} \; >/dev/null
for f in $(find "$PAGES" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \)); do
  lines=$(wc -l < "$f" | tr -d ' ')
  if [ "$lines" -le 8 ]; then
    echo "Deleting stub: $f ($lines lines)"
    rm -f "$f"
  fi
done

# 2) Ensure required directories
mkdir -p "$DASH_DIR" "$API_DIR" "$SERVER_DIR" "$COMP_DIR" "$STYLES_DIR" "$LIB_DIR"

# 3) Write manifest if missing
if [ ! -f "$MANIFEST" ]; then
  echo "Writing dashboard manifest..."
  cat > "$MANIFEST" << 'JSON'
{
  "version": "m7.0.0",
  "groups": [
    {
      "id": "core-ops",
      "label": "Core Ops",
      "dashboards": [
        {"slug":"overview","title":"System Overview"},
        {"slug":"kernel-inspector","title":"Kernel Inspector"},
        {"slug":"nats-topology","title":"NATS Topology"},
        {"slug":"deploy-pipeline","title":"Deploy Pipeline"},
        {"slug":"repo-archeology","title":"Repo Archeology"},
        {"slug":"audit-ledger","title":"Audit Ledger"},
        {"slug":"edge-functions","title":"Edge Functions"},
        {"slug":"agents","title":"Agents & Workers"},
        {"slug":"billing","title":"Billing State"},
        {"slug":"provenance","title":"Provenance Signals"}
      ]
    },
    {
      "id": "quantum-ux",
      "label": "Quantum UX",
      "dashboards": [
        {"slug":"frequency-ui","title":"3D Frequency UI"},
        {"slug":"toroidal-grid","title":"Toroidal Grid"},
        {"slug":"scroll-dna","title":"ScrollDNA Overlay"},
        {"slug":"holographic-metrics","title":"Holographic Metrics"},
        {"slug":"glyph-signatures","title":"Quantum Glyph Signatures"},
        {"slug":"torus-topology","title":"Torus-node Topology"},
        {"slug":"plasma-themes","title":"Neon Plasma Themes"},
        {"slug":"glass-panels","title":"Glassmorphism Panels"},
        {"slug":"recursive-patterns","title":"Recursive Geometries"},
        {"slug":"telemetry-pulse","title":"Live Telemetry Pulse"}
      ]
    },
    {
      "id": "ops-intelligence",
      "label": "Ops Intelligence",
      "dashboards": [
        {"slug":"pipeline-sanity","title":"Pipeline Sanity"},
        {"slug":"release-cadence","title":"Release Cadence"},
        {"slug":"artifact-dignity","title":"Artifact Dignity"},
        {"slug":"error-constellation","title":"Error Constellation"},
        {"slug":"log-aurora","title":"Log Aurora"},
        {"slug":"uptime-rings","title":"Uptime Rings"},
        {"slug":"latency-field","title":"Latency Field"},
        {"slug":"throughput-vortex","title":"Throughput Vortex"},
        {"slug":"cache-echo","title":"Cache Echo"},
        {"slug":"state-tangles","title":"State Tangles"}
      ]
    },
    {
      "id": "collab-bridges",
      "label": "Collab Bridges",
      "dashboards": [
        {"slug":"endpoints","title":"CLI-ready Endpoints"},
        {"slug":"supabase-bridge","title":"Supabase Bridge"},
        {"slug":"vercel-liaison","title":"Vercel Liaison"},
        {"slug":"github-orbits","title":"GitHub Orbits"},
        {"slug":"collaborator-profiles","title":"Collaborator Profiles"},
        {"slug":"access-guard","title":"Access Guard"},
        {"slug":"copy-friendly","title":"Copy-friendly Payloads"},
        {"slug":"runtime-adapters","title":"Runtime Adapters"},
        {"slug":"contracts","title":"Contract-grade Ops"},
        {"slug":"handoff-rituals","title":"Handoff Rituals"}
      ]
    },
    {
      "id": "future-verticals",
      "label": "Future Verticals",
      "dashboards": [
        {"slug":"tokenization","title":"Tokenization"},
        {"slug":"rwa-bridge","title":"RWA Bridge"},
        {"slug":"matchmaker","title":"Autonomous Matchmaker"},
        {"slug":"multi-family","title":"Multi-family Office"},
        {"slug":"process-management","title":"Persistent Process Mgmt"},
        {"slug":"risk-radar","title":"Risk Radar"},
        {"slug":"compliance-veil","title":"Compliance Veil"},
        {"slug":"governance-weave","title":"Governance Weave"},
        {"slug":"learning-loops","title":"Learning Loops"},
        {"slug":"market-telemetry","title":"Market Telemetry"}
      ]
    }
  ]
}
JSON
fi

# 4) Generate sidebar config used by API
cat > "$LIB_DIR/sidebar.ts" << 'TS'
import fs from 'node:fs';
import path from 'node:path';

const MANIFEST_PATH = '/home/scrollchainos/scrollchain-cockpit/cockpit/dashboards.json';

export type SidebarItem = { groupId: string; groupLabel: string; slug: string; title: string; href: string; };
export type Sidebar = { items: SidebarItem[]; };

export function buildSidebar(): Sidebar {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const manifest = JSON.parse(raw);
  const items: SidebarItem[] = [];
  for (const group of manifest.groups) {
    for (const d of group.dashboards) {
      items.push({
        groupId: group.id,
        groupLabel: group.label,
        slug: d.slug,
        title: d.title,
        href: `/dashboard/${d.slug}`
      });
    }
  }
  return { items };
}
TS

# 5) API route: sidebar auto-discovery
cat > "$PAGES/api/sidebar.ts" << 'TS'
import type { NextApiRequest, NextApiResponse } from 'next';
import { buildSidebar } from '../../lib/sidebar';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sidebar = buildSidebar();
  res.status(200).json(sidebar);
}
TS

# 6) NATS JetStream durable consumer + lazy singleton
cat > "$SERVER_DIR/nats.ts" << 'TS'
import { connect, StringCodec, consumerOpts, JetStreamClient, NatsConnection } from 'nats';

const NATS_URL = 'localhost:4222';
const SUBJECT = 'kernel.metrics';
const DURABLE = 'cockpit-kernel-metrics';
const SCHEMA = 'v1';

let ncPromise: Promise<NatsConnection> | null = null;
let jsPromise: Promise<JetStreamClient> | null = null;

export async function getConnection(): Promise<NatsConnection> {
  if (!ncPromise) {
    ncPromise = connect({ servers: NATS_URL });
  }
  return ncPromise;
}

export async function getJetStream(): Promise<JetStreamClient> {
  if (!jsPromise) {
    const nc = await getConnection();
    jsPromise = Promise.resolve((await import('nats')).jetstream(nc));
  }
  return jsPromise!;
}

export async function *consumeKernelMetrics() {
  const js = await getJetStream();
  const sc = StringCodec();
  const opts = consumerOpts();
  opts.durable(DURABLE);
  opts.manualAck();
  opts.deliverAll();
  opts.filterSubject(SUBJECT);

  const sub = await js.subscribe(SUBJECT, opts);
  for await (const m of sub) {
    try {
      const data = sc.decode(m.data);
      let parsed: any = null;
      try { parsed = JSON.parse(data); } catch { parsed = { raw: data }; }
      const event = {
        schema: SCHEMA,
        receivedAt: new Date().toISOString(),
        subject: m.subject,
        seq: m.seq,
        headers: m.headers ? Object.fromEntries(m.headers) : undefined,
        payload: parsed
      };
      m.ack();
      yield event;
    } catch (err) {
      // nack on parse failure to re-deliver
      try { m.nak(); } catch {}
    }
  }
}
TS

# 7) API route: SSE stream of kernel telemetry
cat > "$PAGES/api/telemetry/stream.ts" << 'TS'
import type { NextApiRequest, NextApiResponse } from 'next';
import { consumeKernelMetrics } from '../../../server/nats';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  const encoder = (obj: any) => `data: ${JSON.stringify(obj)}\n\n`;
  res.write(encoder({ hello: 'cockpit-telemetry', startedAt: new Date().toISOString() }));

  try {
    for await (const evt of consumeKernelMetrics()) {
      res.write(encoder(evt));
    }
  } catch (err) {
    res.write(encoder({ error: 'stream_ended', detail: String(err) }));
  } finally {
    try { res.end(); } catch {}
  }
}
TS

# 8) Quantum layout (neon plasma, glassmorphism, holographic grids, torus)
cat > "$COMP_DIR/QuantumLayout.tsx" << 'TSX'
import React, { useEffect, useState } from 'react';

type SidebarItem = { groupId: string; groupLabel: string; slug: string; title: string; href: string; };

export default function QuantumLayout({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SidebarItem[]>([]);
  useEffect(() => {
    fetch('/api/sidebar').then(r => r.json()).then(d => setItems(d.items));
  }, []);

  return (
    <div className="quantum-root">
      <aside className="quantum-sidebar">
        <div className="sidebar-title">ScrollChain Cockpit</div>
        <div className="sidebar-list">
          {items.map((it, idx) => (
            <a key={idx} href={it.href} className="sidebar-link" data-group={it.groupLabel}>
              <span className="link-dot" />
              <span className="link-title">{it.title}</span>
            </a>
          ))}
        </div>
      </aside>
      <main className="quantum-main">
        <div className="holo-grid" />
        <div className="scroll-dna-overlay" />
        {children}
      </main>
      <style jsx global>{`
        :root {
          --plasma-1: #00f5ff;
          --plasma-2: #b300ff;
          --glass-bg: rgba(255,255,255,0.06);
          --glass-border: rgba(255,255,255,0.18);
          --text: #e7eaf6;
          --accent: #8af3ff;
        }
        body { background: radial-gradient(1200px circle at 10% 10%, #0a0f1f 0%, #03060d 60%, #000 100%); color: var(--text); }
        .quantum-root { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
        .quantum-sidebar {
          backdrop-filter: blur(14px) saturate(120%); background: var(--glass-bg);
          border-right: 1px solid var(--glass-border); padding: 18px; position: relative;
        }
        .sidebar-title { font-weight: 700; letter-spacing: 0.8px; margin-bottom: 16px; }
        .sidebar-list { display: grid; gap: 8px; }
        .sidebar-link {
          display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 10px;
          background: linear-gradient(90deg, rgba(0,245,255,0.08), rgba(179,0,255,0.08));
          border: 1px solid rgba(255,255,255,0.08); text-decoration: none; color: var(--text);
        }
        .sidebar-link:hover { border-color: rgba(255,255,255,0.18); transform: translateX(2px); transition: transform 120ms ease; }
        .link-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
        .quantum-main { position: relative; padding: 24px; }
        .holo-grid {
          position: absolute; inset: 0; background-image:
            radial-gradient(circle at 10% 10%, rgba(0,245,255,0.07) 0%, transparent 50%),
            radial-gradient(circle at 90% 30%, rgba(179,0,255,0.07) 0%, transparent 50%),
            linear-gradient(transparent 98%, rgba(255,255,255,0.06) 100%),
            linear-gradient(90deg, transparent 98%, rgba(255,255,255,0.06) 100%);
          background-size: 100% 100%, 100% 100%, 20px 20px, 20px 20px;
          pointer-events: none;
        }
        .scroll-dna-overlay {
          position: absolute; inset: 0; background:
            conic-gradient(from 180deg at 50% 50%, rgba(0,245,255,0.06), rgba(179,0,255,0.06), rgba(0,245,255,0.06));
          mask-image: radial-gradient(600px circle at 50% 50%, black 40%, transparent 70%);
          pointer-events: none;
        }
        .panel {
          position: relative; border-radius: 16px; padding: 16px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          box-shadow: inset 0 0 40px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.35);
        }
        .panel-title { font-weight: 600; margin-bottom: 8px; }
      `}</style>
    </div>
  );
}
TSX

# 9) Kernel Inspector dashboard (integrates NATS telemetry stream + 3D torus)
cat > "$DASH_DIR/kernel-inspector.tsx" << 'TSX'
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import QuantumLayout from '../../components/QuantumLayout';

const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false });
const Drei = dynamic(() => import('@react-three/drei'), { ssr: false });

type TelemetryEvt = {
  schema: string;
  receivedAt: string;
  subject: string;
  seq: number;
  headers?: Record<string,string>;
  payload: any;
};

function ToroidPulse({ intensity = 1 }) {
  // lightweight inlined torus to avoid SSR pitfalls
  return <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[1, 0.35, 64, 128]} />
    <meshStandardMaterial color={intensity > 1 ? '#00f5ff' : '#b300ff'} emissive="#00f5ff" emissiveIntensity={0.6} metalness={0.5} roughness={0.3} />
  </mesh>;
}

export default function KernelInspector() {
  const [events, setEvents] = useState<TelemetryEvt[]>([]);
  const [pulse, setPulse] = useState(0.8);
  const evtCount = useRef(0);

  useEffect(() => {
    const es = new EventSource('/api/telemetry/stream');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data && data.subject) {
          evtCount.current += 1;
          setPulse(0.8 + Math.min(1.2, Math.log10(evtCount.current + 10)));
          setEvents(prev => [data as TelemetryEvt, ...prev].slice(0, 200));
        }
      } catch {}
    };
    es.onerror = () => { /* keep alive */ };
    return () => es.close();
  }, []);

  return (
    <QuantumLayout>
      <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div>
          <div className="panel-title">Kernel Telemetry (NATS JetStream: kernel.metrics)</div>
          <div style={{ height: 420, borderRadius: 16, overflow: 'hidden' }} className="panel">
            <Canvas camera={{ position: [2.2, 2.2, 2.2] }}>
              {/* Minimal scene */}
              {/* @ts-ignore */}
              <ambientLight intensity={0.6} />
              {/* @ts-ignore */}
              <pointLight position={[3, 3, 3]} intensity={1.2} color="#00f5ff" />
              <ToroidPulse intensity={pulse} />
            </Canvas>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Recent Events</div>
          <div style={{ maxHeight: 420, overflow: 'auto', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
            {events.map((ev, idx) => (
              <div key={idx} style={{
                marginBottom: 8, padding: 8, borderRadius: 10,
                background: 'linear-gradient(90deg, rgba(0,245,255,0.10), rgba(179,0,255,0.10))',
                border: '1px solid rgba(255,255,255,0.10)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{ev.subject} • seq {ev.seq}</div>
                  <div style={{ opacity: 0.8 }}>{ev.receivedAt}</div>
                </div>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(ev.payload, null, 2)}</pre>
              </div>
            ))}
            {events.length === 0 && <div style={{ opacity: 0.7 }}>Awaiting kernel.metrics events…</div>}
          </div>
        </div>
      </div>
    </QuantumLayout>
  );
}
TSX

# 10) Universal 3D quantum dashboard template
cat > "$COMP_DIR/QuantumTemplate.tsx" << 'TSX'
import React from 'react';
import dynamic from 'next/dynamic';
import QuantumLayout from './QuantumLayout';

const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false });

function TorusNode({ color = '#00f5ff', radius = 1, tube = 0.32 }) {
  return <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[radius, tube, 64, 128]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.4} roughness={0.35} />
  </mesh>;
}

export default function QuantumTemplate({ title, children }: { title: string; children?: React.ReactNode; }) {
  return (
    <QuantumLayout>
      <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div className="panel-title">{title}</div>
          <div style={{ height: 440, borderRadius: 16, overflow: 'hidden' }}>
            <Canvas camera={{ position: [2.5, 2.2, 2.5] }}>
              {/* @ts-ignore */}
              <ambientLight intensity={0.55} />
              {/* @ts-ignore */}
              <pointLight position={[3, 3, 3]} intensity={1.1} color="#b300ff" />
              <TorusNode color="#00f5ff" radius={1.0} tube={0.32} />
              <TorusNode color="#b300ff" radius={1.8} tube={0.18} />
              <TorusNode color="#8af3ff" radius={2.6} tube={0.12} />
            </Canvas>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">Context</div>
          <div style={{ minHeight: 200 }}>{children ?? <div style={{ opacity: 0.75 }}>No context provided.</div>}</div>
        </div>
      </div>
    </QuantumLayout>
  );
}
TSX

# 11) Generate 50+ dashboards programmatically from manifest
cat > "$SCRIPTS_DIR"
