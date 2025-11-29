"use client";
import React, { useState, useEffect } from "react";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";

export default function RouteDispatcher({ title, category }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black"></div>;

  let Engine = DataEngine;
  if (category.includes("AI")) Engine = AIEngine;
  if (category.includes("SECURITY") || category.includes("INFRA") || category.includes("ADMIN")) Engine = TerminalEngine;
  
  return (
    <div className="min-h-full w-full relative z-10 p-8">
       <Engine title={title} />
    </div>
  );
}
