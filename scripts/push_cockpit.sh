#!/bin/bash
set -e

cd ~/scrollchain-cockpit/cockpit

# Ensure branch and remote are correct
git branch -M main
git remote set-url origin git@github.com:Yahawashiservant/scrollchain-cockpit.git

# Nano-shell commits
echo "Pushing shaders..."
git add components/shaders
git commit -m "Cockpit shaders: EntropyGrid, PhotonMaterial, ScrollEntropy" || echo "No shader changes"
git push origin main

echo "Pushing scripts..."
git add scripts
git commit -m "Cockpit scripts: shader cleanup + resurrection routines" || echo "No script changes"
git push origin main

echo "Pushing types + context..."
git add types system_context.txt
git commit -m "Cockpit types + system context" || echo "No type/context changes"
git push origin main

echo "Pushing visuals..."
git add components/visuals
git commit -m "Cockpit visuals: ActiveGraph + Vortex" || echo "No visuals changes"
git push origin main

echo "All nano-shell pushes complete."
