#!/usr/bin/env bash
set -e

PANEL="$1"
if [ -z "$PANEL" ]; then
  echo "Usage: regenerate_panel.sh <panel-name>"
  exit 1
fi

AGENTS_ROOT="/home/scrollchainos/scrollchainos/agents"
COCKPIT_ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"

TEMPLATE="$AGENTS_ROOT/templates/panels/default_panel.tsx"
TARGET="$COCKPIT_ROOT/components/panels/${PANEL}Panel.tsx"

mkdir -p "$COCKPIT_ROOT/components/panels"

cp "$TEMPLATE" "$TARGET"

echo "[✓] Regenerated panel → $TARGET"
