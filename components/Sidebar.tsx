"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "./sidebar/SidebarData";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openCat, setOpenCat] = useState<string | null>("MESH OPS");
  
  const grouped = MENU_ITEMS.reduce((acc, item) => {
    if (!acc[item.cat]) acc[item.cat] = [];
    acc[item.cat].push(item);
    return acc;
  }, {} as Record<string, typeof MENU_ITEMS>);

  return (
    <div className="w-64 h-full flex flex-col text-xs overflow-hidden border-r border-cyan-900/30 bg-black/90 backdrop-blur-md">
      <div className="p-4 border-b border-cyan-900/30 font-black text-cyan-400 tracking-widest text-lg">
        SCROLLCHAIN
        <span className="block text-[9px] text-cyan-600 font-normal mt-1">OS v43.0 // EDGE ACTIVE</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-cyan-900/50">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="rounded bg-white/5 overflow-hidden">
            <button 
              onClick={() => setOpenCat(openCat === cat ? null : cat)}
              className="w-full px-3 py-2 text-[10px] font-bold text-gray-400 tracking-widest text-left hover:bg-white/10 transition-colors flex justify-between"
            >
              {cat}
              <span>{openCat === cat ? '-' : '+'}</span>
            </button>
            {openCat === cat && (
              <div className="space-y-1 pb-2">
                {items.map((item) => (
                  <Link key={item.path} href={item.path} className={`flex items-center px-3 py-2 border-l-2 transition-all ${pathname === item.path ? 'border-cyan-500 bg-cyan-500/10 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.color.replace('text-', 'bg-')}`}></span>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
