const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

console.log("Initializing Architect...");

// --- DEFINITIONS ---
const ENDPOINTS = {
  "Mesh Ingest": "mesh-ingest", "Mesh List": "mesh-list", "Mesh Sync": "mesh-sync",
  "Partition Maint": "partition-maintenance", "Meta Index": "scrollchain-meta-index",
  "Solar Lead": "scrollchain-solar-lead", "Events": "scrollchain-events", "Audit": "scrollchain-audit",
  "Health": "scrollchain-health", "Token Ledger": "token-ledger", "Resolve Model": "resolve-model",
  "Models API": "models-api", "Models Registry": "models-registry", "Orphan Wallets": "monitor_orphan_wallets",
  "Capability Issue": "capability-issue", "Leads Negotiate": "leads-negotiate",
  "Leads Purchase": "leads-purchase", "Leads Advertise": "leads-advertise",
  "Rentals Start": "rentals-start", "Rentals Stop": "rentals-stop", "Receipts Log": "receipts-log",
  "Finance Rebalance": "finance-rebalance", "Farm Irrigate": "farm-irrigate",
  "Training Session": "training-session", "Logistics Dispatch": "logistics-dispatch",
  "Governance Vote": "governance-vote", "NATS Helper": "_shared_nats_helper",
  "Subscriber Poller": "mesh-subscriber-poller", "Proxy API": "meta-proxy-api",
  "Proxy Inject": "meta-proxy-inject", "HF Model Ingest": "hf_model_ingest",
  "Issue Lead": "issue-lead", "Process Job": "process-job", "Submit Lead": "submit-lead",
  "Deploy Helper": "deploy-all-helper", "Agent": "agent", "Index Corpus": "index_corpus",
  "Query Corpus": "query_corpus", "Embed Corpus": "embed_corpus", "Query Semantic": "query_semantic",
  "Enqueue Embed": "enqueue_embed_all", "Embed Worker": "embed_worker",
  "Fetch Bundle": "fetch_and_sign_bundle", "Fetch Ctrl": "fetch-sign-controller",
  "Invoke Ctrl": "invoke-fetch-sign-controller", "Receipt Signer": "receipt-signer",
  "Quotes Generate": "quotes-generate", "Receipts Verify": "receipts-verify",
  "Siber Roofing": "siber-roofing", "Booking Handler": "booking-handler",
  "Stripe Webhook": "stripe-webhook", "Nommoni Publish": "nommoni-publish-lead",
  "Nommoni Ingest": "nommoni-nats-ingest", "Laymens Submit": "laymens-submit-lead",
  "Laymens Donate": "laymens-donate", "Laymens Worker": "laymens-lead-worker",
  "Outbox Processor": "nats-outbox-processor", "Artifact Inspector": "artifact_inspector",
  "Leads Smoketest": "leads-smoketest", "Healthz": "healthz", "Me Chat": "me-chat",
  "Signals Intake": "signals-aggregate-intake", "Leads Intake": "solar-leads-intake",
  "Leads Deliver": "leads-deliver", "Me Chat Owner": "me-chat-owner", "Create DAO": "dao-create",
  "Proposals": "dao-proposals", "Results": "dao-results", "Live Results": "dao-live-results",
  "DAO Dashboard": "dao-dashboard", "DAO Summary": "dao-summary", "Agent Orchestrator": "agent-orchestrator",
  "Blueprint v0": "v0-scroll-chain-os-blueprint", "Mesh Telemetry": "mesh-telemetry",
  "Audit Trail": "dao-audit-trail", "Cockpit Console": "cockpit-console",
  "Register Agent": "dao-register-agent", "Lattice Entropy": "lattice-entropy",
  "Meshdot Compute": "meshdot-compute", "Entropy Analyzer": "entropy-analyzer",
  "PQC Signer": "pqc-signer", "PQC Verifier": "pqc-verifier", "Mesh Audit": "mesh-audit",
  "Repo Orchestrator": "repo-orchestrator", "NN Orchestrator": "nn-orchestrator",
  "Hydrator": "hydrator-orchestrator", "Disaster Relief": "disaster-relief-intake",
  "Lead Score": "lead-score", "Finance Ledger": "finance-ledger",
  "Artifact Provenance": "artifact-provenance", "Insurance Claims": "insurance-claims",
  "Lead Route": "lead-route", "Mesh Health": "mesh-healthcheck", "PQC Cockpit": "pqc-cockpit",
  "Audit Log": "audit-log", "Mesh Topology": "mesh-topology", "Utils": "utils",
  "Brains Loader": "brains-loader", "Embed Brains": "embed-brains", "Ingest Claim": "ingest-claim",
  "Claims API": "claims-api", "Ingest Scan": "ingest_scan", "Surplus Lookup": "surplus_lookup",
  "Token Mint": "token_mint", "Glyph Issue": "glyph_issue", "Brain Execute": "brain_execute",
  "Cron Reindex": "cron_reindex", "Ingest Emails": "ingest-emails-and-summaries",
  "Ecosystem Config": "ecosystem-config", "Content API": "content-api", "Shared Core": "shared-core",
  "Billing Intake": "billing-receipts-intake", "Policy Check": "mesh-policy-check",
  "Mesh Badge": "mesh-badge", "Site Score": "datacenter-site-score", "Resolve Str": "resolve-str"
};

const BLUEPRINT = {
  "CORE": ["Overview", "3D Frequency", "Quantum Metrics", "Repo Scanner"],
  "PROTECTION": ["D.i.T. (Architect)", "Law Bots", "Family Shield", "Ice Monitor", "Legal Defense", "Global Killswitch"],
  "MESH OPS": ["Mesh Ingest", "Mesh List", "Mesh Sync", "Partition Maint", "Meta Index", "Solar Lead", "Events", "Audit", "Health", "Topology", "Policy Check", "Badge", "Subscriber Poller", "NATS Helper", "Outbox Processor", "Mesh Telemetry", "Mesh Audit", "Mesh Health"],
  "FINANCE CORE": ["Token Ledger", "Finance Rebalance", "Receipts Log", "Receipts Verify", "Receipt Signer", "Quotes Generate", "Stripe Webhook", "Token Mint", "Finance Ledger", "Artifact Provenance", "Artifact Inspector", "Billing Intake", "Surplus Lookup", "Insurance Claims", "Claims API", "Ingest Claim"],
  "INTELLIGENCE": ["Resolve Model", "Models API", "Models Registry", "Orphan Wallets", "Capability Issue", "Agent Orchestrator", "Training Session", "Me Chat", "Me Chat Owner", "Embed Corpus", "Query Semantic", "Index Corpus", "Query Corpus", "Enqueue Embed", "Embed Worker", "HF Model Ingest", "Brains Loader", "Embed Brains", "Brain Execute", "Brain State", "PsyAlign Match", "Search Keywords", "Resolve Str", "Agent", "Exec Summaries"],
  "LEADS & OPS": ["Leads Negotiate", "Leads Purchase", "Leads Advertise", "Leads Deliver", "Submit Lead", "Issue Lead", "Process Job", "Lead Score", "Lead Route", "Leads Router", "Surplus Router", "Appraisal Router", "Smoketest", "Rentals Start", "Rentals Stop", "Farm Irrigate", "Logistics Dispatch", "Siber Roofing", "Booking Handler", "Disaster Relief", "Systemd Templates", "Healthz", "Debug Env", "Signals Intake", "Leads Intake", "Laymens Submit", "Laymens Donate", "Laymens Worker", "Nommoni Publish", "Nommoni Ingest"],
  "DAO & GOVERNANCE": ["Create DAO", "Proposals", "Results", "Live Results", "DAO Dashboard", "DAO Summary", "Register Agent", "Audit Trail", "Governance Vote"],
  "INFRA": ["Kernel State", "Edge Functions", "Server Mesh", "Load Balancer", "CDN Status", "IoT Mesh", "Multi-DB", "Streams", "K8s Pods", "Cockpit Console", "Lattice Entropy", "Meshdot Compute", "Entropy Analyzer", "Repo Orchestrator", "NN Orchestrator", "Hydrator"],
  "SECURITY": ["Vault", "Compliance", "Cyber Defense", "Pen Testing", "Access Control", "Contract Auditor", "Identity", "Quantum Keys", "Audit Logs", "Dark Web", "PQC Signer", "PQC Verifier", "PQC Cockpit", "Glyph Issue"],
  "FRONTIER": ["Exoplanet Scanner", "Fusion Reactor", "Quantum Computer", "Warp Drive", "Dyson Sphere", "Antimatter", "Bio Lab", "Particle Collider", "Terraforming", "Space Elevator", "Time Dilation", "String Theory", "Multiverse", "Mind Upload", "Cryogenics", "Alien Signal", "Void Shield", "Omega Point"],
  "SIM": ["Life Game", "Gravity Sandbox", "Evolution", "Star Forge", "Erosion Sim", "Particle Storm", "Fluid Sim", "Planet Builder", "Traffic Flow", "Crowd Dynamics", "Orbit Plotter", "Ray Tracer", "Sound Scaper", "Voxel Editor", "Procedural City", "Logic Sandbox", "Ecosystem Sim"],
  "UNDERGROUND": ["Black Market", "Safe House", "Dead Drop", "Smuggler Route", "Hacker Den", "Pirate Radio", "Data Haven", "Ghost Network", "Resistance HQ", "Graffiti Wall", "Glitch Zone", "Zero Day Market", "Clone Vat", "Memory Wiper", "Identity Forger", "Shadow Bank", "Fight Club", "The Undercity"],
  "STRATEGIC": ["War Room", "Nuclear Silo", "Spec Ops", "Radar Array", "Bunker Status", "Bioweapon Labs", "PsyOps", "DEFCON", "Orbital Laser", "Submarine Fleet", "Air Traffic", "Encryption Breaker", "Spy Network", "Drone Command", "Cyber Warfare", "Emergency Broadcast", "Asset Recovery", "Doomsday Clock"],
  "SPIRITUAL": ["Akashic Records", "Karma Tracker", "Meditation", "Chakra Alignment", "Astral Plane", "Tarot Reader", "Spirit Guide", "Past Lives", "Aura Scanner", "Sacred Geometry", "Nirvana Gauge", "Third Eye", "Telepathy Net", "Reincarnation", "Soul Ledger", "Enlightenment", "Vibration Tuner", "Oracle", "Zen Garden", "Collective Unconscious"],
  "ABSTRACT": ["Chaos Engine", "Memory Palace", "Dream State", "Logic Core", "Pulse Monitor", "Frequency Tuner", "Crypto Graph", "Time Machine", "Glitch Art", "Holo Deck", "Sub Space", "Code Matrix", "Genome Editor", "Hive Mind", "Echo Chamber", "Mirror World", "Ghost in Shell", "Artifacts", "Registry Editor", "Terminal X"],
  "CREATIVE": ["Holo Canvas", "Beat Maker", "Voxel Sculptor", "Story Engine", "Texture Gen", "Rigging Bay", "Render Farm", "Color Grade", "Audio Master", "Script Editor", "Level Design", "Character Rigger", "Motion Capture", "Photogrammetry", "Synth Rack", "Sample Library", "Font Foundry", "Iconography", "Layout Tool", "Publish Hub"],
  "ADMIN": ["Global Users", "Ban Hammer", "Feature Gates", "API Limits", "Webhook Logs", "OAuth Apps", "Session Manager", "2FA Settings", "Email Templates", "Push Notifs", "SMS Gateway", "CDN Config", "DNS Records", "SSL Certs", "DB Migrations", "Cache Purge", "Error Rate", "Latency Map", "Cost Analysis", "Support Tickets"]
};

// --- GENERATE SIDEBAR DATA ---
let sidebarItems = [];
Object.keys(BLUEPRINT).forEach(cat => {
  BLUEPRINT[cat].forEach(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let color = "text-gray-400";
    if (cat.includes("CORE")) color = "text-cyan-400";
    if (cat.includes("FINANCE") || cat.includes("OPS")) color = "text-green-400";
    if (cat.includes("SECURITY") || cat.includes("DEFENSE") || cat.includes("PROTECTION")) color = "text-red-500";
    if (cat.includes("AI") || cat.includes("INTEL")) color = "text-purple-400";
    if (cat.includes("FRONTIER") || cat.includes("SIM")) color = "text-yellow-400";

    // SAFE PUSH - NO BACKSLASHES
    sidebarItems.push({ cat: cat, name: name, path: "/dashboard/" + slug, color: color });
  });
});

// WRITE SIDEBAR DATA
const dataContent = "export const MENU_ITEMS = " + JSON.stringify(sidebarItems, null, 2) + ";";
fs.writeFileSync('components/sidebar/SidebarData.ts', dataContent);

// --- GENERATE PAGES ---
console.log("Generating Rooms...");
sidebarItems.forEach(item => {
  const folder = item.path.replace('/dashboard/', '');
  const dir = path.join(process.cwd(), 'app/dashboard', folder);
  ensureDir(dir);
  
  // Check for real endpoint
  const endpoint = ENDPOINTS[item.name] || "";
  
  // SAFE WRITE - NO BACKSLASHES
  const pageContent = 'import UniversalPage from "../../../components/templates/UniversalPage";\n' +
                      'export default function P() { return <UniversalPage title="' + item.name + '" category="' + item.cat + '" endpoint="' + endpoint + '" />; }';
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log("ARCHITECT BUILD COMPLETE.");
