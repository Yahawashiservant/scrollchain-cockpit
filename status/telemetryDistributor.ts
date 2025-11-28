import fs from "fs";
import path from "path";

export type KernelTelemetry = {
  ts: number;
  data: any;
};

const STATE_PATH = path.join(process.cwd(), "status", "telemetry.json");

export function writeTelemetry(data: any) {
  const snapshot: KernelTelemetry = {
    ts: Date.now(),
    data,
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(snapshot, null, 2));
  return snapshot;
}

export function readTelemetry(): KernelTelemetry | null {
  try {
    const raw = fs.readFileSync(STATE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
