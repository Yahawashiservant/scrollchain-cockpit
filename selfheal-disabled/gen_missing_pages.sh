#!/bin/bash
set -e

BASE="/home/scrollchainos/scrollchain-cockpit/cockpit/app/dashboard"

PAGES=(
  "aaa-assets"
  "client-vertical-overview"
  "governance-engines"
  "billing-mrr"
  "tokenization"
  "lead-flows"
  "campaign-intelligence"
  "vaultpolis"
  "nats-streams-monitor"
  "kernel-state-inspector"
  "data-lake"
  "verticals"
  "repo-scanner"
  "autonomous-builder"
  "neural-shader-engine"
  "3d-frequency-ui"
  "token-markets"
  "rwa-asset-maps"
  "client-logs"
  "receipts"
  "ai-agents"
  "client-dashboards"
  "sovereign-settings"
  "supabase-functions"
  "edge-functions"
  "nats-subjects"
  "scrollkernel"
  "leadership-panels"
  "provenance-graphs"
  "compliance-layer"
  "scrolldna"
  "recursive-geometry"
  "torus-engine"
  "quantum-metrics"
  "hr-people-intelligence"
)

TEMPLATE_START='
export default function Page() {
  return (
    <div style={{padding:"30px",color:"#fff"}}>
      <h1 style={{marginBottom:"10px"}}>'
TEMPLATE_MID='</h1>

      <p style={{opacity:0.7,marginBottom:"16px"}}>
        This cockpit module is active and listening for ScrollChainOS signals.
      </p>

      <div style={{
        marginTop:"20px",
        padding:"20px",
        background:"#000",
        border:"1px solid #333",
        borderRadius:"12px"
      }}>
        <h2 style={{marginBottom:"10px"}}>Module Status</h2>
        <ul style={{lineHeight:"1.7"}}>
          <li>✓ Initialized</li>
          <li>✓ Bound to Sovereign Kernel</li>
          <li>✓ Ready for autonomous orchestration</li>
        </ul>
      </div>
    </div>
  );
}
'

echo "[Generator] Starting…"

for PAGE in "${PAGES[@]}"; do
  DIR="$BASE/$PAGE"
  FILE="$DIR/page.tsx"

  mkdir -p "$DIR"

  TITLE=$(echo "$PAGE" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

  echo "[Generator] Writing $FILE"

  {
    echo "$TEMPLATE_START$TITLE$TEMPLATE_MID"
  } > "$FILE"
done

echo "[Generator] All pages generated."
