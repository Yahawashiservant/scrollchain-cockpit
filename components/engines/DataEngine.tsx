"use client";
import { useState, useEffect } from "react";

export default function DataEngine({ title }: { title: string }) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // Generate 100 rows to FORCE SCROLLING
    const newRows = Array.from({ length: 100 }).map((_, i) => ({
      id: `TX-${10000 + i}`,
      hash: "0x" + Math.random().toString(16).substring(2, 15),
      val: (Math.random() * 5000).toFixed(2),
      status: Math.random() > 0.1 ? "CONFIRMED" : "PENDING",
      time: new Date().toISOString()
    }));
    setRows(newRows);
  }, []);

  return (
    <div className="min-h-full w-full p-8">
      <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
          <div>
             <h1 className="text-3xl font-black text-cyan-400 tracking-widest">{title.toUpperCase()}</h1>
             <div className="text-xs text-gray-500 font-mono mt-1">LIVE DATAGRID // {rows.length} RECORDS</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-white/5 text-gray-400">
              <tr><th className="p-4">ID</th><th className="p-4">HASH</th><th className="p-4">VALUE</th><th className="p-4">TIMESTAMP</th><th className="p-4">STATUS</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-blue-300">{r.id}</td>
                  <td className="p-4 text-gray-500">{r.hash}</td>
                  <td className="p-4 text-white font-bold">{r.val}</td>
                  <td className="p-4 text-gray-500">{r.time}</td>
                  <td className="p-4"><span className="text-green-400">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
