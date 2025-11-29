"use client";
import DataEngine from "../engines/DataEngine";
import AIEngine from "../engines/AIEngine";
import TerminalEngine from "../engines/TerminalEngine";

export default function RouteDispatcher({ title, category }: { title: string, category: string }) {
  let Engine = DataEngine;
  if (category.includes("AI")) Engine = AIEngine;
  if (category.includes("SECURITY") || category.includes("INFRA") || category.includes("ADMIN")) Engine = TerminalEngine;

  return (
    <div className="w-full h-full p-8">
      <Engine title={title} />
    </div>
  );
}
