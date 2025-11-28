#!/usr/bin/env bash
set -e

PANEL_DIR="components/panels"

for F in $PANEL_DIR/*Panel.tsx; do
  cat > "$F" << PANEL
"use client"
import { useEffect, useState } from "react";

export default function Panel() {
  const [msg, setMsg] = useState<any>(null);

  useEffect(() => {
    const name = "$(
      basename "$F" | sed 's/Panel.tsx//'
    )";
    const sse = new EventSource("/api/panels/" + name);

    sse.onmessage = (e) => {
      setMsg(JSON.parse(e.data));
    };

    return () => sse.close();
  }, []);

  return (
    <div className="border p-4 rounded">
      <h2>Panel: $(
        basename "$F" | sed 's/Panel.tsx//'
      )</h2>
      <pre>{JSON.stringify(msg, null, 2)}</pre>
    </div>
  );
}
PANEL

  echo "[✓] Patched SSE panel → $F"
done
