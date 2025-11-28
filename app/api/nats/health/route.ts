import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      streams: ["scroll.kernel", "scroll.telemetry", "scroll.billing"],
      consumers: ["kernel-agent", "billing-watcher", "entropy-engine"],
      t: Date.now()
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message });
  }
}
