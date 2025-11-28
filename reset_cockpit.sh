#!/usr/bin/env bash
set -e

echo "────────── ScrollChainOS Cockpit Full Reset ──────────"

echo "[1] Killing ALL Next.js servers…"
pkill -f "next dev"       || true
pkill -f "next-server"    || true
pkill -f "jest-worker"    || true
pkill -f "dev -p 3000"    || true
pkill -f "dev -p 3033"    || true

echo "[2] Freeing port 3000 and 3033…"
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 3033/tcp 2>/dev/null || true

echo "[3] Cleaning build artifacts…"
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.pnpm/.cache || true

echo "[4] Reinstalling dependencies quietly…"
pnpm install --silent

echo "[5] Resetting Next.js dev port to 3033…"
cat > ./scripts/start_dev.sh << 'DEV'
#!/usr/bin/env bash
next dev -p 3033
DEV
chmod +x ./scripts/start_dev.sh

echo "[6] Starting Cockpit on port 3033…"
./scripts/start_dev.sh &
sleep 2

echo "────────── Reset Complete ──────────"
echo "[✓] Cockpit running on:  http://localhost:3033"
echo "[✓] All stale processes terminated"
echo "[✓] Fresh build, clean port, clean runtime"
