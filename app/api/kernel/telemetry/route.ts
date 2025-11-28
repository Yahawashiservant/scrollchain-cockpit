import { NextResponse } from "next/server";
import { connect, consumerOpts } from "nats";

export async function GET() {
  try {
    const nc = await connect({ servers: "nats://127.0.0.1:4222" });
    const js = nc.jetstream();

    const opts = consumerOpts();
    opts.ackExplicit();
    opts.deliverTo("kernel_metrics_r4");
    opts.filterSubject("kernel.metrics");

    const sub = await js.subscribe("kernel.metrics", opts);

    let data = null;
    for await (const m of sub) {
      data = JSON.parse(m.string());
      m.ack();
      break;
    }

    await nc.close();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
