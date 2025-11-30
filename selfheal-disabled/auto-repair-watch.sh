#!/bin/bash

LOG=".next/errors.log"

echo "=== ScrollChainOS Auto-Repair Watcher Active ==="

while true; do
  if [ -f "$LOG" ]; then
    if grep -qi "Type error" "$LOG"; then
      echo "=== ERROR DETECTED — triggering auto-repair ==="
      bash scripts/auto-repair.sh
      rm -f "$LOG"
    fi
  fi
  sleep 2
done
