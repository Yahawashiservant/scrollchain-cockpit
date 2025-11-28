#!/bin/bash

ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"
LOG="$ROOT/status/nats-heal.log"

echo "=== [NATS] Self-Healing Listener Online ===" | tee -a "$LOG"

nats sub "scroll.cockpit.error.>" | while read -r line; do
  echo "$(date) [NATS] ERROR EVENT: $line" | tee -a "$LOG"
  bash "$ROOT/scripts/autoheal/engine.sh"
done
