#!/bin/bash
echo "🤖 ScrollChain Autopilot initializing..."
npx nats pub "scroll.autopilot.init" "{\"mode\":\"sovereign\",\"ts\":\"$(date -Iseconds)\"}"
echo "✅ Autopilot running."
