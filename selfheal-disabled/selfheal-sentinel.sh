#!/bin/bash
ROOT="$(pwd)"
ERROR_LOG="$ROOT/.next/error.log"
LOG="$ROOT/status/selfheal.log"

echo "$(date) :: [SENTINEL] ONLINE" >> "$LOG"

while true; do
  if [ -f "$ERROR_LOG" ]; then
    if grep -qiE "Type error|Cannot find module|Invalid character|Property .* does not exist" "$ERROR_LOG"; then
      echo "$(date) :: [SENTINEL] Detected error -> triggering selfheal-core" >> "$LOG"
      bash scripts/selfheal-core.sh
      rm -f "$ERROR_LOG"
      echo "$(date) :: [SENTINEL] Error log cleared" >> "$LOG"
    fi
  fi
  sleep 2
done
