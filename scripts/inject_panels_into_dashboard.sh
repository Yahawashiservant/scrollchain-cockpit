#!/usr/bin/env bash
set -e

DASH="app/dashboard/page.tsx"

cat > $DASH << 'PAGE'
import FileIng from "@/components/panels/file-ingestoPanel";
import Cog from "@/components/panels/cognitionPanel";
import En from "@/components/panels/enricherPanel";
import Ker from "@/components/panels/kernelPanel";
import LLM from "@/components/panels/llm-enricherPanel";
import Intel from "@/components/panels/intelligencePanel";
import Health from "@/components/panels/healthPanel";
import MDB from "@/components/panels/multi-dbPanel";
import NFT from "@/components/panels/nft-orchestratorPanel";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>ScrollChainOS Live Panels</h1>
      <div className="grid grid-cols-2 gap-4">
        <FileIng />
        <Cog />
        <En />
        <Ker />
        <LLM />
        <Intel />
        <Health />
        <MDB />
        <NFT />
      </div>
    </div>
  );
}
PAGE

echo "[✓] Panels injected into dashboard"
