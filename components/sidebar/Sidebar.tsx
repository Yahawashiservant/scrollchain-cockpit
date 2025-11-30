"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MENU_ITEMS from "../sidebar/SidebarData";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="p-2 space-y-2">
      {MENU_ITEMS.map((sec) => (
        <div key={sec.category}>
          <p className="text-sm uppercase text-gray-500 mb-1">{sec.category}</p>
          {sec.items.map((it) => (
            <Link 
              key={it.path} 
              href={it.path} 
              className={`block rounded-md px-2 py-1 ${
                pathname.startsWith(it.path) ? it.color : "text-gray-300"
              }`}>
              {it.name}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
