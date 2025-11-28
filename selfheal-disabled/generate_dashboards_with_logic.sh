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

  case "$slug" in
    kernel-inspector)
      cat > "$file" << TSX
import React from 'react';
import KernelInspector from '../../components/KernelInspector';
export default function Page() { return <KernelInspector />; }
TSX
      ;;
    repo-archeology)
      cat > "$file" << TSX
import React, { useEffect, useState } from 'react';
import QuantumTemplate from '../../components/QuantumTemplate';

export default function RepoArcheology() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('/api/repo-scanner').then(r => r.json()).then(setData).catch(() => setData({ error: 'failed' }));
  }, []);
  return (
    <QuantumTemplate title="Repo Archeology">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </QuantumTemplate>
  );
}
TSX
      ;;
    billing)
      cat > "$file" << TSX
import React, { useEffect, useState } from 'react';
import QuantumTemplate from '../../components/QuantumTemplate';

export default function Billing() {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    fetch('/api/billing').then(r => r.json()).then(setState).catch(() => setState({ error: 'failed' }));
  }, []);
  return (
    <QuantumTemplate title="Billing State">
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </QuantumTemplate>
  );
}
TSX
      ;;
    edge-functions)
      cat > "$file" << TSX
import React, { useEffect, useState } from 'react';
import QuantumTemplate from '../../components/QuantumTemplate';

export default function EdgeFunctions() {
  const [fns, setFns] = useState<any>([]);
  useEffect(() => {
    fetch('/api/edge-functions').then(r => r.json()).then(setFns).catch(() => setFns([{ error: 'failed' }]));
  }, []);
  return (
    <QuantumTemplate title="Edge Functions">
      <pre>{JSON.stringify(fns, null, 2)}</pre>
    </QuantumTemplate>
  );
}
TSX
      ;;
    *)
      cat > "$file" << TSX
import React from 'react';
import QuantumTemplate from '../../components/QuantumTemplate';

export default function Page() {
  return (
    <QuantumTemplate title="${slug}">
      <div>Logic stub: wire this dashboard to its API endpoint.</div>
    </QuantumTemplate>
  );
}
TSX
      ;;
  esac

  echo "Generated: $file"
done

echo "Done generating dashboards with logic stubs."
