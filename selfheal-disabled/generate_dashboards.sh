#!/bin/bash
set -e

PAGES=(
  overview crm campaign kernel-state-inspector nats nats-subjects streams
  billing billing-mrr vault vaultpolis ai-agents client-logs client-dashboards
  tokenization quantum-metrics intelligence verticals recursive-geometry
  provenance-graphs compliance-layer sovereign-settings hr-people-intelligence
  3d-frequency-ui neural-shader-engine repo-scanner repo-verticals
  edge-functions aaa-assets torus-engine telemetry-state telemetry-snapshot
  receipts campaign-intelligence lead-flows scrollkernel data-lake
  governance governance-engines mrr rwa-asset-maps
)

mkdir -p app/dashboard

for p in "${PAGES[@]}"; do
  mkdir -p "app/dashboard/$p"
  cat << PAGE > "app/dashboard/$p/page.tsx"
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

echo "Generated \${#PAGES[@]} dashboard pages."
