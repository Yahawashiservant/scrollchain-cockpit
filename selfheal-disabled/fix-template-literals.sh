#!/bin/bash
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"

echo "=== Restoring broken template literals ==="

find "$ROOT" -type f -name "*.tsx" -o -name "*.ts" | while read f; do
  sed -i 's/\\`/`/g' "$f"
done

echo "=== Done: template literals repaired ==="
