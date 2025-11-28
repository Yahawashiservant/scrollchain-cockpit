import fs from "fs";
import path from "path";

export type CockpitMap = {
  coreOps: string[];
  intelligence: string[];
  governance: string[];
  campaign: string[];
  financial: string[];
  assets: string[];
  quantum: string[];
  verticals: string[];
};

const DOMAIN = {
  coreOps: [/overview/, /kernel/, /telemetry/, /^nats/, /streams/],
  intelligence: [/intelligence/, /agents/, /quantum/, /frequency/, /shader/],
  governance: [/governance/, /compliance/, /polis/],
  campaign: [/crm/, /campaign/, /client/, /lead/],
  financial: [/billing/, /^mrr$/, /receipts/],
  assets: [/repo/, /rwa/, /assets/],
  quantum: [/geometry/, /torus/, /scrollkernel/],
  verticals: [/verticals/, /vault/, /data/]
};

export function autonomousCockpitMap(dir = "app/dashboard"): CockpitMap {
  const abs = path.join(process.cwd(), dir);

  const cockpit: CockpitMap = {
    coreOps: [],
    intelligence: [],
    governance: [],
    campaign: [],
    financial: [],
    assets: [],
    quantum: [],
    verticals: []
  };

  const entries = fs.readdirSync(abs).filter((e) => {
    const full = path.join(abs, e);
    return fs.statSync(full).isDirectory();
  });

  for (const entry of entries) {
    const full = path.join(abs, entry);
    const page = path.join(full, "page.tsx");

    // Auto-generate page.tsx if missing
    if (!fs.existsSync(page)) {
      fs.writeFileSync(
        page,
        `
export default function Page() {
  return (
    <div style={{ padding: 20 }}>
      <h1>${entry}</h1>
      <p>${entry} panel operational (autonomous discovery).</p>
    </div>
  );
}
`.trim()
      );
    }

    // Classification
    let matched = false;
    for (const [domain, patterns] of Object.entries(DOMAIN)) {
      if (patterns.some((rx) => rx.test(entry))) {
        cockpit[domain as keyof CockpitMap].push(entry);
        matched = true;
        break;
      }
    }

    if (!matched) cockpit.verticals.push(entry);
  }

  // Sort order
  for (const k of Object.keys(cockpit)) {
    cockpit[k as keyof CockpitMap].sort();
  }

  return cockpit;
}
