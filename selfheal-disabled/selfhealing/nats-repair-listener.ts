import { connect, StringCodec } from "nats";
import { exec } from "child_process";

const sc = StringCodec();

async function main() {
  const nc = await connect({ servers: process.env.NATS_URL });
  const sub = nc.subscribe("scroll.cockpit.repair");

  console.log("? NATS Self-Healing Cockpit v2 listening...");

  for await (const m of sub) {
    const msg = sc.decode(m.data);
    console.log("? Repair event received:", msg);

    exec("bash scripts/auto-repair.sh", (err, stdout, stderr) => {
      if (err) console.error("Repair error:", err);
      console.log(stdout);
      console.error(stderr);
    });
  }
}

main();
