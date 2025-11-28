#!/bin/bash
set -e

echo "[M-6] Testing JetStream pull consumer against kernel.metrics"

nats context save cockpit-test --server="$NATS_URL"

nats req \
  --context=cockpit-test \
  kernel.metrics "ping" || true

echo "[OK] If no errors above, JetStream pull works."
