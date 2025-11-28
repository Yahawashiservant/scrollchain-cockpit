import React, { useEffect, useState } from 'react';

type SidebarItem = { groupId: string; groupLabel: string; slug: string; title: string; href: string; };

export default function QuantumLayout({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SidebarItem[]>([]);
  useEffect(() => {
    fetch('/api/sidebar').then(r => r.json()).then(d => setItems(d.items));
  }, []);

  return (
    <div className="quantum-root">
      <aside className="quantum-sidebar">
        <div className="sidebar-title">ScrollChain Cockpit</div>
        <div className="sidebar-list">
          {items.map((it, idx) => (
            <a key={idx} href={it.href} className="sidebar-link" data-group={it.groupLabel}>
              <span className="link-dot" />
              <span className="link-title">{it.title}</span>
            </a>
          ))}
        </div>
      </aside>
      <main className="quantum-main">
        <div className="holo-grid" />
        <div className="scroll-dna-overlay" />
        {children}
      </main>
      <style jsx global>{`
        :root {
          --plasma-1: #00f5ff;
          --plasma-2: #b300ff;
          --glass-bg: rgba(255,255,255,0.06);
          --glass-border: rgba(255,255,255,0.18);
          --text: #e7eaf6;
          --accent: #8af3ff;
        }
        body { background: radial-gradient(1200px circle at 10% 10%, #0a0f1f 0%, #03060d 60%, #000 100%); color: var(--text); }
        .quantum-root { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
        .quantum-sidebar {
          backdrop-filter: blur(14px) saturate(120%); background: var(--glass-bg);
          border-right: 1px solid var(--glass-border); padding: 18px; position: relative;
        }
        .sidebar-title { font-weight: 700; letter-spacing: 0.8px; margin-bottom: 16px; }
        .sidebar-list { display: grid; gap: 8px; }
        .sidebar-link {
          display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 10px;
          background: linear-gradient(90deg, rgba(0,245,255,0.08), rgba(179,0,255,0.08));
          border: 1px solid rgba(255,255,255,0.08); text-decoration: none; color: var(--text);
        }
        .sidebar-link:hover { border-color: rgba(255,255,255,0.18); transform: translateX(2px); transition: transform 120ms ease; }
        .link-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
        .quantum-main { position: relative; padding: 24px; }
        .holo-grid {
          position: absolute; inset: 0; background-image:
            radial-gradient(circle at 10% 10%, rgba(0,245,255,0.07) 0%, transparent 50%),
            radial-gradient(circle at 90% 30%, rgba(179,0,255,0.07) 0%, transparent 50%),
            linear-gradient(transparent 98%, rgba(255,255,255,0.06) 100%),
            linear-gradient(90deg, transparent 98%, rgba(255,255,255,0.06) 100%);
          background-size: 100% 100%, 100% 100%, 20px 20px, 20px 20px;
          pointer-events: none;
        }
        .scroll-dna-overlay {
          position: absolute; inset: 0; background:
            conic-gradient(from 180deg at 50% 50%, rgba(0,245,255,0.06), rgba(179,0,255,0.06), rgba(0,245,255,0.06));
          mask-image: radial-gradient(600px circle at 50% 50%, black 40%, transparent 70%);
          pointer-events: none;
        }
        .panel {
          position: relative; border-radius: 16px; padding: 16px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          box-shadow: inset 0 0 40px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.35);
        }
        .panel-title { font-weight: 600; margin-bottom: 8px; }
      `}</style>
    </div>
  );
}
