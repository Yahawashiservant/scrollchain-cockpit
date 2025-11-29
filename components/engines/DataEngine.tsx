"use client";
import React, { useState, useEffect } from "react";

export default function DataEngine({ title }) {
  const [rows, setRows] = useState([]);
  // Simplified generation to ensure component stability
  useEffect(() => {
    const newRows = Array.from({ length: 40 }).map((_, i) => ({
      id: "TX-" + Math.floor(Math.random() * 100000),
      val: (Math.random() * 5000).toFixed(2),
      status: Math.random() > 0.1 ? "VERIFIED" : "PENDING"
    }));
    setRows(newRows);
  }, []);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/40"><h1 className="text-xl font-bold text-cyan-400">{title.toUpperCase()}</h1></div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 sticky top-0 backdrop-blur-md">
            <tr><th className="p-3">ID</th><th className="p-3">VALUE</th><th className="p-3">STATUS</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-white/5">
                <td className="p-3 text-blue-300">{r.id}</td><td className="p-3 text-white">{r.val}</td><td className="p-3 text-green-400">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
