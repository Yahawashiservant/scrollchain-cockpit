import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      start(controller) {
        function send(msg: string) {
          controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
        }

        send(JSON.stringify({ status: "telemetry online", t: Date.now() }));

        const interval = setInterval(() => {
          send(JSON.stringify({
            t: Date.now(),
            cpu: Math.random(),
            mem: Math.random(),
            freq: 110 + Math.random() * 20,
          }));
        }, 1500);

        req.signal.addEventListener("abort", () => {
          clearInterval(interval);
          controller.close();
        });
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
