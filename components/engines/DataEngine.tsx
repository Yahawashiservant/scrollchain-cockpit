"use client";
import { useState, useEffect } from "react";
export default function DataEngine({ title }: { title: string }) {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    const newRows = Array.from({ length: 50 }).map((_, i) => ({
      id: "TX-" + Math.floor(Math.random() * 100000),
      hash: "0x" + Math.random().toString(16).substring(2, 10),
      val: (Math.random() * 5000).toFixed(2),
      status: Math.random() > 0.1 ? "VERIFIED" : "PENDING"
    }));
    setRows(newRows);
  }, []);
  return (
    <div className="h-full glass-panel rounded-xl p-6 flex flex-col">
      <div className="border-b border-white/10 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-widest">{title.toUpperCase()}</h1>
        <div className="text-xs text-gray-500 font-mono">LIVE DATA GRID</div>
      </div>
      <div className="flex-1 overflow-auto font-mono text-xs text-gray-400">
        <table className="w-full text-left">
          <thead><tr><th className="p-2">ID</th><th className="p-2">HASH</th><th className="p-2">VALUE</th><th className="p-2">STATUS</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
                <tr key={i} className="hover:bg-white/5">
                    <td className="p-2 text-blue-400">{r.id}</td>
                    <td className="p-2">{r.hash}</td>
                    <td className="p-2 text-white">{r.val}</td>
                    <td className="p-2 text-green-400">{r.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
