#!/bin/bash

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
LOG="$ROOT/status/file-watch.log"

echo "📡 ScrollChainOS File Watchdog Active" | tee -a "$LOG"

inotifywait -m -r -e modify,create,delete "$ROOT/app" "$ROOT/components" "$ROOT/lib" |
while read path action file; do
  echo "$(date) :: Change -> $file" | tee -a "$LOG"
  bash scripts/auto-repair.sh >> "$LOG" 2>&1
done
