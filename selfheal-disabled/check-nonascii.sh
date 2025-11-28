#!/bin/bash
ROOT="/home/scrollchainos/scrollchain-cockpit/cockpit"

echo "=== Non-ASCII scan (app, components, lib) ==="

cd "$ROOT" || exit 1

grep -P -n "[^\x00-\x7F]" app components lib || echo "No non-ASCII characters found in source."
