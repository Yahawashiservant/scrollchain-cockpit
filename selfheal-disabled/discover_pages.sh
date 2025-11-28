#!/bin/bash
set -e

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit/app/dashboard"
OUTPUT="$ROOT/.generated_index.json"

echo "[AutoDiscovery] Scanning cockpit modules…"

# Find all page.tsx files under dashboard
PAGES=$(find "$ROOT" -mindepth 2 -maxdepth 3 -name "page.tsx")

echo "[" > "$OUTPUT"

FIRST=1
for FILE in $PAGES; do
  # folder name = module name
  MODULE=$(basename "$(dirname "$FILE")")

  # human-readable title
  TITLE=$(echo "$MODULE" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')

  if [ $FIRST -eq 0 ]; then
    echo "," >> "$OUTPUT"
  fi
  FIRST=0

  cat <<JSON >> "$OUTPUT"
  {
    "module": "$MODULE",
    "title": "$TITLE",
    "path": "/dashboard/$MODULE"
  }
JSON

done

echo "]" >> "$OUTPUT"

echo "[AutoDiscovery] Completed: $OUTPUT"
