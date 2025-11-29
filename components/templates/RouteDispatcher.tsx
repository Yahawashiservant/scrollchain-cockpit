"use client";
import { useState, useEffect } from "react";
import CyberScene from "../visuals/CyberScene";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";

export default function RouteDispatcher({ title, category }: { title: string, category: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black"></div>;

  let Engine = DataEngine;
  
  // Logic to pick the right engine based on category
  if (category.includes("AI") || category.includes("COGNITION") || category.includes("INTEL")) {
      Engine = AIEngine;
  } else if (category.includes("SECURITY") || category.includes("ADMIN") || category.includes("INFRA") || category.includes("DEEP")) {
      Engine = TerminalEngine;
  }

  return (
    <div className="min-h-full w-full relative flex flex-col">
      <CyberScene category={category} />
      <div className="relative z-10 p-6 flex-1 h-full flex flex-col">
         <Engine title={title} />
      </div>
    </div>
  );
}
