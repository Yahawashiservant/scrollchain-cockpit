#!/bin/bash
set -e

BASE="/home/scrollchainos/scrollchain-cockpit/cockpit/app/dashboard"

mkdir -p "$BASE"

PAGES=(
  "crm"
  "vault"
  "followups"
  "repo-scanner"
  "verticals"
  "data-lake"
  "tokenization"
  "lead-flows"
  "nats-streams-monitor"
  "kernel-state-inspector"
  "autonomous-builder"
  "neural-shader-engine"
  "3d-frequency-ui"
  "campaign-intelligence"
  "client-dashboards"
  "client-logs"
  "scrollkernel"
  "rwa-asset-maps"
  "quantum-metrics"
  "governance-engines"
  "provenance-graphs"
  "ai-agents"
  "sovereign-settings"
)

for P in "${PAGES[@]}"; do
  mkdir -p "$BASE/$P"
  cat << EOT > "$BASE/$P/page.tsx"
export default function Page() {
  return (
    <div style={{ padding:"20px", color:"#fff" }}>
      <h1>${P}</h1>
      <p>Module loaded and listening for ScrollChainOS signals.</p>
    </div>
  );
}
EOT
done

echo "All dashboard pages generated."
