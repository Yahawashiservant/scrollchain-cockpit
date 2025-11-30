#!/bin/bash
set -e
echo "🛡 Guardian starting mesh & consensus..."
# start local NATS if not running
docker start scrollchain-nats 2>/dev/null || docker run -d --name scrollchain-nats -p 4222:4222 nats:latest
# publish system health beacon
npx nats pub "scroll.mesh.guardian.health" "{\"status\":\"ok\",\"ts\":\"$(date -Iseconds)\"}"
echo "✅ Guardian online."
