#!/bin/bash
ROOT="app/dashboard"
OUT="app/generated/cockpit.json"

mkdir -p app/generated

routes=$(find "$ROOT" -maxdepth 1 -mindepth 1 -type d -printf "\"%f\",\n" | sed '$ s/,$//')

cat << EOT > "$OUT"
{
  "updated": "$(date -Is)",
  "routes": [
    $routes
  ]
}
EOT

echo "[ScrollChainOS] cockpit.json regenerated"
