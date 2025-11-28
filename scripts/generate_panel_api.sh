#!/usr/bin/env bash
set -e

API_ROOT="app/api/panels"

mkdir -p $API_ROOT

PANELS=(
  file-ingesto
  cognition
  enricher
  kernel
  llm-enricher
  intelligence
  health
  multi-db
  nft-orchestrator
)

for P in "${PANELS[@]}"; do
  mkdir -p "$API_ROOT/$P"

  cat > "$API_ROOT/$P/route.ts" << ROUTE
import { NextResponse } from "next/server";
import { connect } from "nats";

export async function GET() {
  const encoder = new TextEncoder();
  const nc = await connect({ servers: "127.0.0.1:4222" });
  const sub = nc.subscribe("panels.${P}");

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const m of sub) {
          controller.enqueue(
            encoder.encode("data: " + new TextDecoder().decode(m.data) + "\n\n")
          );
        }
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    }
  );
}
ROUTE

  echo "[✓] API route created → $API_ROOT/$P/route.ts"
done
