"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [];

export default function Sidebar() {
  const pathname = usePathname();
  const [openCat, setOpenCat] = useState<string | undefined>("CORE");
  const grouped: Record<string, any[]> = {};

  return (
    <aside className="w-full h-full text-[10px]">
      {MENU_ITEMS.map(item => (
        <Link key={item.path} href={item.path} className={pathname === item.path ? "text-white" : "text-gray-500"}>
          {item.name}
        </Link>
      ))}
    </aside>
  );
}
