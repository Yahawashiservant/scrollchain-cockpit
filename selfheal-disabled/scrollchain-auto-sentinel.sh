#!/bin/bash

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
LOG="$ROOT/status/sentinel.log"
ERROR_LOG="$ROOT/.next/error.log"

echo "=== ScrollChainOS AUTO-REPAIR SENTINEL ONLINE ==="
echo "$(date) :: SENTINEL START" >> "$LOG"

cd "$ROOT" || exit 1

# --- UTILITY -------------------------------------------------------------

function log_event() {
  echo "$(date) :: $1" | tee -a "$LOG"
}

function run_repair() {
  log_event "⚠️  ERROR DETECTED — running auto-repair"
  bash scripts/auto-repair.sh >> "$LOG" 2>&1
  log_event "♻️  Auto-repair completed; forcing rebuild"

  rm -rf .next
  pnpm build >> "$LOG" 2>&1

  log_event "🚀 Build finished"
}

# --- WATCH LOOP ----------------------------------------------------------

while true; do
  # Track changes in the core directories
  inotifywait -qq -e modify,create,delete,move \
    app components lib server scripts || continue

  # After any FS change, run a diagnostic build in dry mode
  pnpm -s tsc --noEmit >> "$LOG" 2>&1
  STATUS=$?

  if [ $STATUS -ne 0 ]; then
    log_event "❌ TypeScript failure detected (status $STATUS)"
    run_repair
    continue
  fi

  # Secondary: look at .next temporary logs
  if [ -f "$ERROR_LOG" ] && grep -qi "error" "$ERROR_LOG"; then
    log_event "❌ Next.js error logged in .next/error.log"
    run_repair
    rm -f "$ERROR_LOG"
    continue
  fi

  log_event "✓ No errors detected"
done
