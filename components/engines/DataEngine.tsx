"use client";
import { useScrollFetch } from "../hooks/useScrollFetch";

export default function DataEngine({ title }: { title: string }) {
  const endpoint = title.toLowerCase().replace(/ /g, "-");
  const { data, loading, status } = useScrollFetch(endpoint);

  return (
    <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-cyan-400 tracking-widest">{title.toUpperCase()}</h1>
          <div className="text-[10px] text-cyan-600 font-mono mt-1">ENDPOINT: /v1/{endpoint}</div>
        </div>
        <div className="flex gap-3 items-center">
           <div className={`px-2 py-1 rounded text-[10px] font-bold ${status === "ACTIVE" ? "bg-green-900/20 text-green-400" : "bg-yellow-900/20 text-yellow-400"}`}>
             {status}
           </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto scroll-area bg-black/20">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-white/5 sticky top-0 backdrop-blur-md z-10 text-gray-500">
            <tr>
              <th className="p-3">ID</th><th className="p-3">HASH</th><th className="p-3">VALUE (ETH)</th><th className="p-3">LATENCY</th><th className="p-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data && Array.isArray(data) ? data.map((r: any, i: number) => (
              <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                <td className="p-3 text-blue-300">{r.id}</td>
                <td className="p-3 text-gray-400">{r.hash}</td>
                <td className="p-3 text-white font-bold">{r.val}</td>
                <td className="p-3 text-gray-500">{r.latency}</td>
                <td className="p-3"><span className="text-green-400">{r.status}</span></td>
              </tr>
            )) : (
              <tr><td className="p-8 text-center text-gray-500" colSpan={5}>{loading ? "ESTABLISHING UPLINK..." : "NO DATA"}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
