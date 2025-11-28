#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
MANIFEST="$ROOT/dashboards.json"
DASH_DIR="$ROOT/pages/dashboard"

[ -f "$MANIFEST" ] || { echo "Manifest not found: $MANIFEST" >&2; exit 1; }

SLUGS=$(jq -r '.groups[].dashboards[].slug' "$MANIFEST")

for slug in $SLUGS; do
  file="$DASH_DIR/$slug.tsx"
  if [ -f "$file" ]; then
    echo "Keeping existing: $file"
    continue
  fi
  cat > "$file" << TSX
import React from 'react';
import QuantumTemplate from '../../components/QuantumTemplate';

export default function Page() {
  return (
    <QuantumTemplate title="${slug}">
      <div style={{ display: 'grid', gap: 12 }}>
        <div><strong>Label:</strong> ${slug}</div>
        <div><strong>Theme:</strong> Neon plasma gradient, glassmorphism, holographic grid, toroidal nodes.</div>
        <div><strong>Topology:</strong> Torus-node diagram overlays indicate system surfaces & flows.</div>
        <div><strong>Notes:</strong> This dashboard was regenerated in Phase M-7, Quantum UI standard.</div>
      </div>
    </QuantumTemplate>
  );
}
TSX
  echo "Generated: $file"
done

echo "Done generating dashboards from manifest."
