import fs from "fs";
import path from "path";
import { autonomousCockpitMap } from "../lib/scroll-discovery";

const map = autonomousCockpitMap("app/dashboard");

const out = path.join(process.cwd(), "app/generated/cockpit.json");
fs.mkdirSync(path.dirname(out), { recursive: true });

fs.writeFileSync(out, JSON.stringify(map, null, 2));

console.log("[ADM] Autonomous Cockpit Map Generated.");
