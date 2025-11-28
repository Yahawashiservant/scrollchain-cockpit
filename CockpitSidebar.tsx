"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const panels = [
  "file-ingesto", 
  "cognition",
  "enricher",
  "kernel",
  "llm-enricher",
  "intelligence",
  "health",
  "multi-db",
  "nft-orchestrator"
];

export default function CockpitSidebar() {
  const path = usePathname();
  
  return (
    <aside className="w-60 bg-neutral-900 h-screen p-4 border-r border-neutral-800">
      <h2 className="text-lg font-bold mb-4">ScrollChainOS</h2>
      <ul className="space-y-2">
        {panels.map((p) => (
          <li key={p}>
            <Link 
              href={`/dashboard/${p}`}
              className={`block px-3 py-2 rounded ${
                path.startsWith(`/dashboard/${p}`)
                  ? "bg-neutral-800"
                  : "hover:bg-neutral-800"
              }`}
            >
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
