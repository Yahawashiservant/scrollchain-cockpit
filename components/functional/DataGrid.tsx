"use client";
import { useState } from "react";

export default function DataGrid({ title, data, columns }: { title: string, data: any[], columns: string[] }) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-bold text-cyan-400 tracking-widest text-xs">{title.toUpperCase()}</h3>
        <div className="text-[10px] text-gray-500">{data.length} ENTRIES FOUND</div>
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-cyan-900/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              {columns.map((col) => (
                <th key={col} className="p-3 text-[10px] text-gray-400 font-mono border-b border-white/10 uppercase">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs font-mono">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-cyan-900/10 transition-colors border-b border-white/5">
                {columns.map((col) => (
                  <td key={col} className="p-3 text-gray-300 truncate max-w-[150px]" title={row[col]}>
                    {col === "status" ? (
                      <span className={\`px-2 py-1 rounded \${row[col] === "SUCCESS" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}\`}>
                        {row[col]}
                      </span>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
