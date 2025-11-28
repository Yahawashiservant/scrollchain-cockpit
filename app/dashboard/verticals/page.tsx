"use client";
export default function VerticalsPage() {
  const verticals = [
    { name: "DeFi", value: 45, color: "bg-green-500" },
    { name: "Gaming", value: 25, color: "bg-purple-500" },
    { name: "Supply Chain", value: 15, color: "bg-blue-500" },
    { name: "Social", value: 15, color: "bg-yellow-500" },
  ];
  return (
    <div className="h-full w-full bg-black p-6 text-white">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">VERTICAL PERFORMANCE</h1>
      <div className="flex h-64 items-end space-x-4 bg-gray-900/30 p-4 rounded border border-gray-800">
        {verticals.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center group">
            <div className="text-xs mb-2 opacity-0 group-hover:opacity-100 transition">{v.value}%</div>
            <div className={`w-full rounded-t ${v.color} transition-all duration-500 hover:opacity-80`} style={{ height: `${v.value}%` }}></div>
            <div className="mt-2 text-xs font-bold text-gray-400">{v.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
