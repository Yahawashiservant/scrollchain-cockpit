#!/bin/bash

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
LOG="$ROOT/status/ascii-guardian.log"

echo "=== ASCII GUARDIAN ACTIVE ===" | tee -a "$LOG"

find "$ROOT" \
  -type f \
  \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) | while read -r file; do
    echo "[CLEAN] $file" | tee -a "$LOG"

    # Normalize to pure ASCII, strip invalid UTF-8, replace weird quotes
    iconv -f utf-8 -t ascii//TRANSLIT "$file" > "$file.clean" 2>>"$LOG"

    # Fix escaped or broken template literals
    sed -i \
      -e "s/\\\`/`/g" \
      -e "s/’/'/g" \
      -e "s/‘/'/g" \
      -e "s/“/\"/g" \
      -e "s/”/\"/g" \
      "$file.clean"

    mv "$file.clean" "$file"
done

echo "=== ASCII GUARDIAN COMPLETE ===" | tee -a "$LOG"
