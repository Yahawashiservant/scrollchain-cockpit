#!/bin/bash
set -e

PAGES=(
  overview crm campaign campaign-intelligence kernel-state-inspector
  nats nats-subjects streams billing billing-mrr vault vaultpolis
  ai-agents client-logs client-dashboards tokenization quantum-metrics
  intelligence verticals recursive-geometry provenance-graphs compliance-layer
  governance governance-engines lead-flows edge-functions neural-shader-engine
  torus-engine data-lake scrollkernel mrr rwa-asset-maps sovereign-settings
  3d-frequency-ui aaa-assets repo-scanner repo-verticals telemetry-state
  telemetry-snapshot receipts
)

mkdir -p app/dashboard

for p in "${PAGES[@]}"; do
  mkdir -p "app/dashboard/$p"
  cat << PAGE > app/dashboard/$p/page.tsx
export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <h1>${p}</h1>
      <p>${p} panel operational.</p>
    </div>
  );
}
PAGE
done

echo "Rebuilt \${#PAGES[@]} dashboard panels."
