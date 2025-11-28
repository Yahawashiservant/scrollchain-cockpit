#!/bin/bash

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
LOG="$ROOT/status/autoheal.log"

echo "=== [ENGINE] ScrollChainOS v5 Structural AI Engine ===" | tee -a "$LOG"

# Re-run core repair
bash "$ROOT/scripts/auto-repair.sh" >> "$LOG" 2>&1

# Rebuild
rm -rf "$ROOT/.next"
pnpm build >> "$LOG" 2>&1

echo "=== [ENGINE] Cycle complete. ===" | tee -a "$LOG"
